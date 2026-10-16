(function () {
  const buttons = document.querySelectorAll(
    '.black-mid, .light-mid, .black-mid-outline'
  );

  const mouse = window.matchMedia(
    '(hover: hover) and (pointer: fine)'
  );

  const proximity = 60;

  function clearGrain() {
    buttons.forEach(function (button) {
      button.style.setProperty('--grain-opacity', '0');
    });
  }

  document.addEventListener('pointermove', function (event) {
    if (!mouse.matches || event.pointerType !== 'mouse') return;

    buttons.forEach(function (button) {
      if (button.disabled) {
        button.style.setProperty('--grain-opacity', '0');
        return;
      }

      const bounds = button.getBoundingClientRect();

      const dx = Math.max(
        bounds.left - event.clientX,
        0,
        event.clientX - bounds.right
      );

      const dy = Math.max(
        bounds.top - event.clientY,
        0,
        event.clientY - bounds.bottom
      );

      const distance = Math.hypot(dx, dy);
      const strength = Math.max(0, 1 - distance / proximity);

      button.style.setProperty(
        '--pointer-x',
        `${event.clientX - bounds.left}px`
      );

      button.style.setProperty(
        '--pointer-y',
        `${event.clientY - bounds.top}px`
      );

      button.style.setProperty(
        '--grain-opacity',
        strength * 0.64
      );
    });
  });

  document.documentElement.addEventListener('pointerleave', clearGrain);
  window.addEventListener('blur', clearGrain);
  window.addEventListener('scroll', clearGrain, { passive: true });
})();