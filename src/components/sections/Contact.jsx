import { useEffect, useMemo, useState } from 'react';
import { PROFILE } from '../../config/profile';
import ExternalLink from '../ui/ExternalLink';
import SectionHeader from '../ui/SectionHeader';

export default function Contact() {
  const [isWhatsappModalOpen, setIsWhatsappModalOpen] = useState(false);
  const [whatsappMessage, setWhatsappMessage] = useState(PROFILE.whatsappDefaultMessage);

  const whatsappUrl = useMemo(() => {
    const cleanPhone = PROFILE.whatsappPhone.replace(/\D/g, '');
    const encodedMessage = encodeURIComponent(whatsappMessage.trim() || PROFILE.whatsappDefaultMessage);

    return `https://wa.me/${cleanPhone}?text=${encodedMessage}`;
  }, [whatsappMessage]);

  function closeWhatsappModal() {
    setIsWhatsappModalOpen(false);
  }


  useEffect(() => {
    if (!isWhatsappModalOpen) return undefined;

    const originalOverflow = document.body.style.overflow;

    function handleKeyDown(event) {
      if (event.key === 'Escape') {
        closeWhatsappModal();
      }
    }

    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isWhatsappModalOpen]);

  function handleWhatsappSubmit() {
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
    closeWhatsappModal();
  }

  return (
    <section id="contacto" className="contact-section section-shell section-reveal" data-section-motion="from-left">
      <SectionHeader
        eyebrow="Contacto para empresas"
        title="Podés contactarme para contratarme como Full Stack Developer"
        description="Estoy abierto a oportunidades laborales, proyectos freelance, mantenimiento de sistemas, desarrollo de features, integraciones y soporte técnico sobre productos web en producción."
      />

      <div className="contact-card reveal-on-scroll tilt-card" data-scroll-motion="zoom-in">
        <div className="contact-copy">
          <h3>Empresas, startups o equipos técnicos: hablemos</h3>
          <p>
            Puedo sumarme para desarrollar funcionalidades, mantener código existente, resolver bugs, integrar APIs, mejorar performance o construir sistemas internos completos.
          </p>
        </div>

        <div className="contact-data-grid">
          <div>
            <p>Email</p>
            <a href={`mailto:${PROFILE.email}`}>{PROFILE.email}</a>
          </div>
          <div>
            <p>LinkedIn</p>
            <a href={PROFILE.linkedinUrl} target="_blank" rel="noreferrer">
              linkedin.com/in/federico-rudiero
            </a>
          </div>
          <div>
            <p>GitHub</p>
            <a href={PROFILE.githubUrl} target="_blank" rel="noreferrer">
              github.com/{PROFILE.githubUsername}
            </a>
          </div>
        </div>

        <div className="contact-actions">
          <button
            type="button"
            className="button button-primary"
            onClick={() => setIsWhatsappModalOpen(true)}
          >
            Contactarme por WhatsApp
          </button>
          <ExternalLink href={PROFILE.cvPath} variant="secondary">
            Descargar CV
          </ExternalLink>
          <ExternalLink href={PROFILE.linkedinUrl} variant="ghost">
            Ver LinkedIn
          </ExternalLink>
        </div>
      </div>

      {isWhatsappModalOpen && (
        <div className="whatsapp-modal-backdrop" role="presentation" onClick={closeWhatsappModal}>
          <div
            className="whatsapp-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="whatsapp-modal-title"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              className="whatsapp-modal-close"
              onClick={closeWhatsappModal}
              aria-label="Cerrar consulta de WhatsApp"
            >
              ×
            </button>

            <span className="whatsapp-modal-eyebrow">Contacto laboral</span>
            <h3 id="whatsapp-modal-title">Enviar consulta por WhatsApp</h3>
            <p>
              El mensaje está orientado a empresas que quieran contactarme como desarrollador full stack. Podés editarlo antes de abrir WhatsApp.
            </p>

            <label htmlFor="whatsapp-message">Mensaje</label>
            <textarea
              id="whatsapp-message"
              value={whatsappMessage}
              onChange={(event) => setWhatsappMessage(event.target.value)}
              rows="5"
            />

            <div className="whatsapp-modal-actions">
              <button type="button" className="button button-ghost" onClick={closeWhatsappModal}>
                Cancelar
              </button>
              <button type="button" className="button button-primary" onClick={handleWhatsappSubmit}>
                Abrir WhatsApp
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
