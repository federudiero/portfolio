import { useEffect, useState } from 'react';
import { FEATURED_PROJECTS } from '../../config/profile';
import { getRepositoryLanguages } from '../../services/githubApi';
import SectionHeader from '../ui/SectionHeader';

function normalizeText(value) {
  return String(value || '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
}

function findRepositoryByHints(repositories, hints = []) {
  if (!repositories?.length || !hints.length) return null;

  const normalizedHints = hints.map(normalizeText);

  return repositories.find((repo) => {
    const searchable = normalizeText(
      `${repo.name} ${repo.fullName || ''} ${repo.description || ''} ${(repo.topics || []).join(' ')}`
    );

    return normalizedHints.some((hint) => searchable.includes(hint));
  });
}

function normalizeFallbackStats(project) {
  const stats = project.languageStats || [];
  const total = stats.reduce((sum, item) => sum + Number(item.value || 0), 0);

  if (!total) return [];

  return stats.map((item) => ({
    name: item.name,
    percentage: Math.round((Number(item.value || 0) / total) * 100),
  }));
}

function ProjectLinks({ project, repository }) {
  return (
    <div className="project-action-links">
      {project.demoUrl && (
        <a href={project.demoUrl} target="_blank" rel="noreferrer">
          Ver sistema
        </a>
      )}
      {repository?.htmlUrl && (
        <a href={repository.htmlUrl} target="_blank" rel="noreferrer" className="secondary-link">
          Código
        </a>
      )}
    </div>
  );
}

function ProjectLanguageStats({ project, repository }) {
  const [languages, setLanguages] = useState(() => normalizeFallbackStats(project));
  const [source, setSource] = useState('stack');
  const [status, setStatus] = useState(repository?.fullName ? 'loading' : 'fallback');

  useEffect(() => {
    if (!repository?.fullName) {
      setLanguages(normalizeFallbackStats(project));
      setSource('stack');
      setStatus('fallback');
      return undefined;
    }

    const controller = new AbortController();

    async function loadLanguages() {
      try {
        setStatus('loading');
        const githubLanguages = await getRepositoryLanguages(repository.fullName, controller.signal);

        if (githubLanguages.length) {
          setLanguages(githubLanguages);
          setSource('github');
        } else {
          setLanguages(normalizeFallbackStats(project));
          setSource('stack');
        }

        setStatus('success');
      } catch (requestError) {
        if (requestError.name === 'AbortError') return;

        setLanguages(normalizeFallbackStats(project));
        setSource('stack');
        setStatus('fallback');
      }
    }

    loadLanguages();

    return () => controller.abort();
  }, [project, repository?.fullName]);

  if (!languages.length) return null;

  return (
    <div className="project-language-stats" aria-label={`Lenguajes utilizados en ${project.title}`}>
      <div className="project-language-header">
        <span>Lenguajes / stack usado</span>
        <small>
          {status === 'loading'
            ? 'Consultando GitHub'
            : source === 'github'
              ? 'Datos públicos del repositorio'
              : 'Referencia del proyecto'}
        </small>
      </div>

      <div className="language-bars">
        {languages.map((language) => (
          <div className="language-bar-row" key={language.name}>
            <div className="language-bar-label">
              <strong>{language.name}</strong>
              <span>{language.percentage}%</span>
            </div>
            <div className="language-bar-track" aria-hidden="true">
              <div
                className="language-bar-fill"
                style={{ width: `${Math.max(language.percentage, 4)}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ProjectPreview({ project }) {
  return (
    <div className="project-preview preview-animate" aria-hidden="true">
      <div className="preview-window-bar">
        <span />
        <span />
        <span />
      </div>
      <div className="preview-content">
        <div className="preview-title-row">
          <strong>{project.category}</strong>
          <em>{project.status}</em>
        </div>
        <div className="preview-columns">
          {project.indicators.map((indicator) => (
            <div key={indicator} className="preview-module">
              <span />
              <p>{indicator}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function FeaturedProjectCard({ project, repositories, index }) {
  const repository = findRepositoryByHints(repositories, project.repositoryHints);
  const motion = index % 2 === 0 ? 'project-left' : 'project-right';

  return (
    <article className="case-card reveal-on-scroll interactive-lift tilt-card" data-scroll-motion={motion}>
      <div className="case-number">{String(index + 1).padStart(2, '0')}</div>

      <div className="case-main">
        <div className="featured-project-topline">
          <span>{project.eyebrow}</span>
          <strong>{project.status}</strong>
        </div>

        <div className="featured-project-heading">
          <div>
            <p>{project.category}</p>
            <h3>{project.title}</h3>
          </div>
          <ProjectLinks project={project} repository={repository} />
        </div>

        <p className="featured-description">{project.description}</p>

        <div className="project-story-grid">
          <div className="project-story-block">
            <span>Contexto</span>
            <p>{project.problem}</p>
          </div>
          <div className="project-story-block">
            <span>Mi intervención</span>
            <p>{project.myWork}</p>
          </div>
          <div className="project-story-block project-story-result">
            <span>Resultado</span>
            <p>{project.impact}</p>
          </div>
        </div>

        <div className="project-role-box">
          <span>Mi rol</span>
          <p>{project.role}</p>
        </div>
      </div>

      <aside className="case-side">
        <ProjectPreview project={project} />
        <ProjectLanguageStats project={project} repository={repository} />
        <div className="tech-list">
          {project.stack.map((tech) => (
            <span key={tech}>{tech}</span>
          ))}
        </div>
      </aside>
    </article>
  );
}

export default function Projects({ repositories }) {
  return (
    <section id="proyectos" className="projects-section section-shell section-reveal" data-section-motion="from-left">
      <SectionHeader
        eyebrow="Experiencia demostrable"
        title="Proyectos que muestran capacidad full stack aplicada a negocio"
        description="Cada caso está presentado con el criterio que evalúa una empresa: problema, intervención técnica, resultado, rol asumido, stack usado y capacidad para trabajar sobre sistemas reales."
      />

      <div className="featured-project-grid only-featured-projects">
        {FEATURED_PROJECTS.map((project, index) => (
          <FeaturedProjectCard
            key={project.id}
            project={project}
            repositories={repositories}
            index={index}
          />
        ))}
      </div>
    </section>
  );
}
