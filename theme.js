(function () {
  const root = document.documentElement;
  let theme = 'dark';

  try {
    const savedTheme = localStorage.getItem('theme');

    if (savedTheme === 'light' || savedTheme === 'dark') {
      theme = savedTheme;
    }
  } catch {}

  root.dataset.theme = theme;

  document.addEventListener('DOMContentLoaded', function () {
    const button = document.querySelector('.theme-toggle');
    if (!button) return;

    function updateButton() {
      const dark = root.dataset.theme === 'dark';
      const label = dark
        ? 'Switch to light mode'
        : 'Switch to dark mode';

      button.setAttribute('aria-pressed', String(dark));
      button.setAttribute('aria-label', label);
      button.setAttribute('data-tooltip', label);
      button.removeAttribute('title');
    }

    button.addEventListener('click', function () {
      root.dataset.theme =
        root.dataset.theme === 'dark' ? 'light' : 'dark';

      try {
        localStorage.setItem('theme', root.dataset.theme);
      } catch {}

      button.classList.add('tooltip-dismissed');

      updateButton();
    });

    button.addEventListener('mouseleave', function () {
      button.classList.remove('tooltip-dismissed');
    });
    
    button.addEventListener('blur', function () {
      button.classList.remove('tooltip-dismissed');
    });

    updateButton();
  });
})();