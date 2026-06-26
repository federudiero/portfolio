import profileImage from '../../img/fede.jpeg';
import { HERO_METRICS, PROFILE } from '../../config/profile';
import ExternalLink from '../ui/ExternalLink';

export default function Hero({ githubProfile }) {
  const avatar = githubProfile?.avatarUrl || profileImage;

  return (
    <section id="inicio" className="hero-section section-shell section-reveal" data-section-motion="from-left">
      <div className="hero-content hero-entrance" data-scroll-motion="hero-copy">
        <span className="eyebrow">{PROFILE.location} · {PROFILE.role}</span>
        <h1>Full Stack Developer para empresas que necesitan software real.</h1>
        <p className="hero-summary">{PROFILE.summary}</p>

        <div className="hero-highlights" aria-label="Especialidades principales">
          {PROFILE.highlights.map((highlight) => (
            <span key={highlight}>{highlight}</span>
          ))}
        </div>

        <div className="hero-process-strip" aria-label="Flujo de trabajo principal">
          <span>Requerimiento</span>
          <i aria-hidden="true" />
          <span>Frontend</span>
          <i aria-hidden="true" />
          <span>Backend</span>
          <i aria-hidden="true" />
          <span>Deploy</span>
        </div>

        <div className="hero-actions">
          <ExternalLink href="#contacto" variant="primary">
            Contactarme para contratación
          </ExternalLink>
          <ExternalLink href="#proyectos" variant="secondary">
            Ver experiencia
          </ExternalLink>
          <ExternalLink href={PROFILE.cvPath} variant="secondary">
            Descargar CV
          </ExternalLink>
          <ExternalLink href={PROFILE.linkedinUrl} variant="ghost">
            LinkedIn
          </ExternalLink>
        </div>

        <a className="scroll-cue" href="#perfil" aria-label="Bajar a la sección de perfil profesional">
          <span />
          Scroll para ver mi perfil
        </a>
      </div>

      <aside className="hero-card hero-entrance-card tilt-card" data-scroll-motion="hero-card" aria-label="Resumen profesional">
        <div className="profile-card-top">
          <div className="profile-image-wrap">
            <img src={avatar} alt="Federico Rudiero" className="profile-image" />
          </div>
          <div>
            <p className="profile-role">{PROFILE.role}</p>
            <h2>{githubProfile?.name || PROFILE.name}</h2>
            <p className="profile-bio">
              Construyo y mantengo aplicaciones web empresariales con foco en estabilidad, datos, integraciones y experiencia de usuario.
            </p>
          </div>
        </div>

        <div className="hero-metric-list">
          {HERO_METRICS.map((metric) => (
            <div key={metric.label} className="hero-metric-card metric-animate">
              <strong>{metric.value}</strong>
              <span>{metric.label}</span>
              <p>{metric.detail}</p>
            </div>
          ))}
        </div>
      </aside>
    </section>
  );
}
