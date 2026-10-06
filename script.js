(() => {
  const panels = document.querySelectorAll('.panel');

  panels.forEach((panel) => {
    panel.addEventListener('pointermove', (event) => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
      if (!window.matchMedia('(hover:hover) and (pointer:fine)').matches) return;

      const rect = panel.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;
      const image = panel.querySelector('.panel-visual img');
      if (!image) return;

      image.style.transform = `translate(${x * 8}px, ${y * 8 - 10}px) scale(1.045)`;
    });

    panel.addEventListener('pointerleave', () => {
      const image = panel.querySelector('.panel-visual img');
      if (image) image.style.transform = '';
    });
  });
})();