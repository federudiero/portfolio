import { useEffect } from 'react';

const clamp = (value, min = 0, max = 1) => Math.min(Math.max(value, min), max);
const easeOutExpo = (value) => (value === 1 ? 1 : 1 - Math.pow(2, -10 * value));

const MOTION_PRESETS = {
  'hero-copy': { x: -54, y: 34, scale: 0.97, rotate: -1.4, parallax: -20 },
  'hero-card': { x: 64, y: 46, scale: 0.94, rotate: 2, parallax: 28 },
  section: { x: 0, y: 70, scale: 0.96, rotate: 0, parallax: -14 },
  'card-up': { x: 0, y: 92, scale: 0.93, rotate: 0, parallax: -18 },
  'from-left': { x: -126, y: 72, scale: 0.94, rotate: -2.2, parallax: -20 },
  'from-right': { x: 126, y: 72, scale: 0.94, rotate: 2.2, parallax: -20 },
  'project-left': { x: -164, y: 96, scale: 0.92, rotate: -2.8, parallax: -24 },
  'project-right': { x: 164, y: 96, scale: 0.92, rotate: 2.8, parallax: -24 },
  'zoom-in': { x: 0, y: 82, scale: 0.88, rotate: 0, parallax: -16 },
};

function getMotionElements() {
  const selector = [
    '[data-scroll-motion]',
    '.reveal-on-scroll',
    '.value-card',
    '.specialty-panel',
    '.workflow-panel',
    '.case-card',
    '.skill-group-card',
    '.contact-card',
  ].join(', ');

  return Array.from(new Set(document.querySelectorAll(selector)));
}

function resolvePreset(element, index) {
  const requested = element.dataset.scrollMotion;
  if (requested && MOTION_PRESETS[requested]) return MOTION_PRESETS[requested];

  if (element.classList.contains('case-card')) {
    return index % 2 === 0 ? MOTION_PRESETS['project-left'] : MOTION_PRESETS['project-right'];
  }

  if (element.classList.contains('section-header')) return MOTION_PRESETS.section;
  if (element.classList.contains('contact-card')) return MOTION_PRESETS['zoom-in'];

  return index % 2 === 0 ? MOTION_PRESETS['from-left'] : MOTION_PRESETS['from-right'];
}

function makeStatic(element) {
  element.classList.add('is-visible', 'is-in-view', 'scroll-active');
  element.style.setProperty('--sa-opacity', '1');
  element.style.setProperty('--sa-blur', '0px');
  element.style.setProperty('--sa-x', '0px');
  element.style.setProperty('--sa-y', '0px');
  element.style.setProperty('--sa-scale', '1');
  element.style.setProperty('--sa-rotate-x', '0deg');
  element.style.setProperty('--sa-rotate-y', '0deg');
}

export function useScrollAnimations() {
  useEffect(() => {
    const root = document.documentElement;
    const reducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false;
    const elements = getMotionElements();
    const sections = Array.from(document.querySelectorAll('[data-section-motion]'));
    const tiltCards = Array.from(document.querySelectorAll('.tilt-card'));
    let frameId = 0;
    let sectionObserver = null;

    const revealVisibleSections = () => {
      const viewportHeight = window.innerHeight || 1;

      sections.forEach((section) => {
        if (section.classList.contains('section-visible')) return;

        const rect = section.getBoundingClientRect();
        const enteredViewport = rect.top < viewportHeight * 0.88 && rect.bottom > viewportHeight * 0.04;

        if (!enteredViewport) return;

        section.classList.add('section-visible');
        sectionObserver?.unobserve(section);
      });
    };

    root.classList.remove('scroll-engine', 'scroll-engine-reduced');
    root.classList.add('scroll-engine');

    sections.forEach((section, index) => {
      section.classList.add('section-reveal');
      section.style.setProperty('--section-delay', `${Math.min(index * 90, 360)}ms`);
    });

    elements.forEach((element, index) => {
      element.classList.add('scroll-animate');
      element._scrollPreset = resolvePreset(element, index);
      element.style.setProperty('--tilt-x', '0deg');
      element.style.setProperty('--tilt-y', '0deg');
      element.style.setProperty('--tilt-glow-x', '50%');
      element.style.setProperty('--tilt-glow-y', '0%');
    });

    if (reducedMotion) {
      root.classList.add('scroll-engine-reduced');
      sections.forEach((section) => section.classList.add('section-visible'));
      elements.forEach(makeStatic);
      return () => root.classList.remove('scroll-engine', 'scroll-engine-reduced');
    }

    if (sections.length) {
      sectionObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add('section-visible');
            sectionObserver?.unobserve(entry.target);
          });
        },
        {
          threshold: 0.01,
          rootMargin: '0px 0px -8% 0px',
        },
      );

      sections.forEach((section) => sectionObserver.observe(section));
    }

    const update = () => {
      const viewportHeight = window.innerHeight || 1;
      const scrollTop = window.scrollY || document.documentElement.scrollTop || 0;
      const maxScroll = Math.max(document.documentElement.scrollHeight - viewportHeight, 1);
      const pageProgress = clamp(scrollTop / maxScroll);
      const isMobile = window.innerWidth < 760;
      const motionFactor = isMobile ? 0.72 : 1;

      root.style.setProperty('--scroll-progress', pageProgress.toFixed(5));
      root.style.setProperty('--scroll-drift-x', `${Math.round(pageProgress * 150)}px`);
      root.style.setProperty('--scroll-drift-y', `${Math.round(pageProgress * -110)}px`);

      revealVisibleSections();

      elements.forEach((element) => {
        const rect = element.getBoundingClientRect();
        const preset = element._scrollPreset || MOTION_PRESETS['card-up'];
        const entryLine = viewportHeight * 0.95;
        const doneLine = viewportHeight * 0.48;
        const rawProgress = (entryLine - rect.top) / Math.max(entryLine - doneLine, 1);
        const progress = easeOutExpo(clamp(rawProgress));
        const center = rect.top + rect.height / 2;
        const centerDistance = clamp((center - viewportHeight / 2) / viewportHeight, -1, 1);
        const active = rect.bottom > viewportHeight * 0.18 && rect.top < viewportHeight * 0.76;
        const inView = rect.bottom > viewportHeight * 0.04 && rect.top < viewportHeight * 0.98;

        const x = preset.x * (1 - progress) * motionFactor;
        const entryY = preset.y * (1 - progress) * motionFactor;
        const parallaxY = centerDistance * preset.parallax * progress * motionFactor;
        const y = entryY + parallaxY;
        const scale = preset.scale + (1 - preset.scale) * progress;
        const blur = (1 - progress) * (isMobile ? 7 : 14);
        const rotateY = preset.rotate * (1 - progress) * motionFactor;
        const rotateX = -centerDistance * 2.4 * progress * motionFactor;

        element.style.setProperty('--sa-opacity', clamp(progress * 1.1).toFixed(4));
        element.style.setProperty('--sa-blur', `${blur.toFixed(2)}px`);
        element.style.setProperty('--sa-x', `${x.toFixed(2)}px`);
        element.style.setProperty('--sa-y', `${y.toFixed(2)}px`);
        element.style.setProperty('--sa-scale', scale.toFixed(4));
        element.style.setProperty('--sa-rotate-x', `${rotateX.toFixed(3)}deg`);
        element.style.setProperty('--sa-rotate-y', `${rotateY.toFixed(3)}deg`);
        element.style.setProperty('--sa-progress', progress.toFixed(4));
        element.style.setProperty('--sa-center', centerDistance.toFixed(4));

        element.classList.toggle('is-visible', progress > 0.12);
        element.classList.toggle('is-in-view', inView);
        element.classList.toggle('scroll-active', active);
      });

      frameId = 0;
    };

    const requestUpdate = () => {
      if (frameId) return;
      frameId = window.requestAnimationFrame(update);
    };

    const handlePointerMove = (event) => {
      if (window.innerWidth < 920) return;

      const card = event.currentTarget;
      const rect = card.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;

      card.style.setProperty('--tilt-x', `${(-y * 6).toFixed(2)}deg`);
      card.style.setProperty('--tilt-y', `${(x * 7).toFixed(2)}deg`);
      card.style.setProperty('--tilt-glow-x', `${Math.round((x + 0.5) * 100)}%`);
      card.style.setProperty('--tilt-glow-y', `${Math.round((y + 0.5) * 100)}%`);
    };

    const handlePointerLeave = (event) => {
      const card = event.currentTarget;
      card.style.setProperty('--tilt-x', '0deg');
      card.style.setProperty('--tilt-y', '0deg');
      card.style.setProperty('--tilt-glow-x', '50%');
      card.style.setProperty('--tilt-glow-y', '0%');
    };

    update();
    requestAnimationFrame(revealVisibleSections);
    window.setTimeout(revealVisibleSections, 220);

    window.addEventListener('scroll', requestUpdate, { passive: true });
    window.addEventListener('resize', requestUpdate);
    tiltCards.forEach((card) => {
      card.addEventListener('pointermove', handlePointerMove);
      card.addEventListener('pointerleave', handlePointerLeave);
    });

    return () => {
      root.classList.remove('scroll-engine', 'scroll-engine-reduced');
      window.removeEventListener('scroll', requestUpdate);
      window.removeEventListener('resize', requestUpdate);
      sectionObserver?.disconnect();
      tiltCards.forEach((card) => {
        card.removeEventListener('pointermove', handlePointerMove);
        card.removeEventListener('pointerleave', handlePointerLeave);
      });
      if (frameId) window.cancelAnimationFrame(frameId);
    };
  }, []);
}
