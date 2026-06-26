import { useEffect } from 'react';

const clamp = (value, min = 0, max = 1) => Math.min(Math.max(value, min), max);

export function useScrollMotion() {
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let frameId = 0;

    const motionElements = Array.from(document.querySelectorAll('[data-scroll-motion]'));
    const tiltCards = Array.from(document.querySelectorAll('.tilt-card'));

    const update = () => {
      const maxScroll = Math.max(document.documentElement.scrollHeight - window.innerHeight, 1);
      const progress = clamp(window.scrollY / maxScroll);

      document.documentElement.style.setProperty('--scroll-progress', progress.toFixed(4));
      document.documentElement.style.setProperty('--scroll-y', `${Math.round(window.scrollY)}px`);

      if (!prefersReducedMotion) {
        motionElements.forEach((element) => {
          const rect = element.getBoundingClientRect();
          const viewport = window.innerHeight || 1;
          const localProgress = clamp((viewport - rect.top) / (viewport + rect.height));
          const centerOffset = clamp((rect.top + rect.height / 2 - viewport / 2) / viewport, -1, 1);

          element.style.setProperty('--motion-progress', localProgress.toFixed(4));
          element.style.setProperty('--motion-offset', centerOffset.toFixed(4));

          if (localProgress > 0.08 && localProgress < 0.92) {
            element.classList.add('is-scroll-active');
          } else {
            element.classList.remove('is-scroll-active');
          }
        });
      }

      frameId = 0;
    };

    const requestUpdate = () => {
      if (!frameId) frameId = window.requestAnimationFrame(update);
    };

    const handlePointerMove = (event) => {
      if (prefersReducedMotion || window.innerWidth < 900) return;

      const card = event.currentTarget;
      const rect = card.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;

      card.style.setProperty('--tilt-x', `${(-y * 4).toFixed(2)}deg`);
      card.style.setProperty('--tilt-y', `${(x * 5).toFixed(2)}deg`);
      card.style.setProperty('--tilt-glow-x', `${Math.round((x + 0.5) * 100)}%`);
      card.style.setProperty('--tilt-glow-y', `${Math.round((y + 0.5) * 100)}%`);
    };

    const handlePointerLeave = (event) => {
      event.currentTarget.style.setProperty('--tilt-x', '0deg');
      event.currentTarget.style.setProperty('--tilt-y', '0deg');
      event.currentTarget.style.setProperty('--tilt-glow-x', '50%');
      event.currentTarget.style.setProperty('--tilt-glow-y', '0%');
    };

    update();
    window.addEventListener('scroll', requestUpdate, { passive: true });
    window.addEventListener('resize', requestUpdate);

    tiltCards.forEach((card) => {
      card.addEventListener('pointermove', handlePointerMove);
      card.addEventListener('pointerleave', handlePointerLeave);
    });

    return () => {
      window.removeEventListener('scroll', requestUpdate);
      window.removeEventListener('resize', requestUpdate);
      tiltCards.forEach((card) => {
        card.removeEventListener('pointermove', handlePointerMove);
        card.removeEventListener('pointerleave', handlePointerLeave);
      });
      if (frameId) window.cancelAnimationFrame(frameId);
    };
  }, []);
}
