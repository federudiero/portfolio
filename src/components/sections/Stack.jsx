import { SKILL_GROUPS } from '../../config/profile';
import SectionHeader from '../ui/SectionHeader';

export default function Stack() {
  return (
    <section id="skills" className="stack-section section-shell section-reveal" data-section-motion="from-right">
      <SectionHeader
        eyebrow="Stack técnico"
        title="Tecnologías para integrarme rápido a equipos y productos web"
        description="Trabajo con herramientas modernas de frontend, backend, datos e integraciones. El foco es escribir código mantenible, resolver problemas de producción y entregar funcionalidades útiles para el negocio."
      />

      <div className="skills-grid">
        {SKILL_GROUPS.map((group) => (
          <article key={group.title} className="skill-group-card reveal-on-scroll interactive-lift tilt-card" data-scroll-motion="card-up">
            <h3>{group.title}</h3>
            <p>{group.description}</p>
            <div className="skill-list">
              {group.skills.map((skill) => (
                <span key={skill}>{skill}</span>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
