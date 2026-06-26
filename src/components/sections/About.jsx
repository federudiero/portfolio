import { SPECIALTY_AREAS, VALUE_AREAS, WORKFLOW_STEPS } from '../../config/profile';
import SectionHeader from '../ui/SectionHeader';

export default function About() {
  return (
    <section id="perfil" className="about-section section-shell section-reveal" data-section-motion="from-right" aria-labelledby="about-title">
      <SectionHeader
        eyebrow="Perfil profesional"
        title="Full stack developer para equipos, empresas y productos en producción"
        description="Mi perfil está orientado a empresas que necesitan un desarrollador capaz de entender el negocio, tomar requerimientos, escribir código mantenible, resolver problemas reales y acompañar la evolución de un sistema."
      />


      <div className="hire-fit-panel reveal-on-scroll" data-scroll-motion="zoom-in">
        <div>
          <span className="eyebrow">Contratación</span>
          <h3>Puedo aportar como desarrollador full stack en empresas que necesitan ejecución técnica y criterio de producto.</h3>
        </div>
        <div className="hire-fit-grid">
          <article>
            <strong>Incorporación a equipo</strong>
            <p>Desarrollo de features, mantenimiento, debugging, mejoras de performance y soporte sobre proyectos existentes.</p>
          </article>
          <article>
            <strong>Proyecto completo</strong>
            <p>Construcción de sistemas internos, paneles administrativos, CRM, pedidos, stock, reportes e integraciones.</p>
          </article>
          <article>
            <strong>Refuerzo técnico</strong>
            <p>Resolución de bugs complejos, orden de código, Firebase, APIs, permisos, deploy y revisión de lógica crítica.</p>
          </article>
        </div>
      </div>

      <div className="value-grid">
        {VALUE_AREAS.map((point) => (
          <article key={point.title} className="value-card reveal-on-scroll interactive-lift tilt-card" data-scroll-motion="card-up">
            <h3>{point.title}</h3>
            <p>{point.description}</p>
          </article>
        ))}
      </div>

      <div className="specialty-panel reveal-on-scroll" data-scroll-motion="from-left">
        <div className="specialty-heading">
          <span className="eyebrow">Especialidad</span>
          <h3>Áreas donde puedo aportar valor dentro de una empresa</h3>
          <p>
            Estos son los tipos de tareas donde puedo incorporarme con rapidez porque ya trabajé sistemas reales con usuarios, roles, datos e integraciones.
          </p>
        </div>
        <div className="specialty-grid">
          {SPECIALTY_AREAS.map((area) => (
            <article key={area.title} className="specialty-card interactive-lift">
              <h4>{area.title}</h4>
              <p>{area.description}</p>
            </article>
          ))}
        </div>
      </div>

      <div className="workflow-panel reveal-on-scroll" data-scroll-motion="from-right">
        <div>
          <span className="eyebrow">Cómo trabajo</span>
          <h3>Proceso simple, técnico y orientado a producción</h3>
        </div>
        <div className="workflow-steps">
          {WORKFLOW_STEPS.map((item) => (
            <article key={item.step} className="workflow-card interactive-lift">
              <strong>{item.step}</strong>
              <h4>{item.title}</h4>
              <p>{item.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
