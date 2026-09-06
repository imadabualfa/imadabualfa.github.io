(function () {
  const EMAIL = 'imad.abualfa.apps@gmail.com';
  const targets = document.querySelectorAll('.email-link, .nav-cta, .drawer-cta');
  if (!targets.length) return;

  const toast = document.createElement('div');
  toast.id = 'copy-toast';
  toast.textContent = '✓ Email copied';
  document.body.appendChild(toast);
  let toastTimer = null;

  function showToast() {
    toast.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove('show'), 2200);
  }

  function copyEmail() {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(EMAIL).catch(() => fallbackCopy());
    } else {
      fallbackCopy();
    }
    showToast();
  }

  function fallbackCopy() {
    const temp = document.createElement('textarea');
    temp.value = EMAIL;
    temp.style.position = 'fixed';
    temp.style.opacity = '0';
    document.body.appendChild(temp);
    temp.select();
    document.execCommand('copy');
    document.body.removeChild(temp);
  }

  let tooltip = null;
  if (window.matchMedia('(pointer: fine)').matches) {
    tooltip = document.createElement('div');
    tooltip.id = 'copy-tooltip';
    tooltip.textContent = 'Copy my email';
    document.body.appendChild(tooltip);
  }

  targets.forEach((el) => {
    el.addEventListener('click', (e) => {
      e.preventDefault();
      copyEmail();
    });

    if (tooltip) {
      el.addEventListener('mousemove', (e) => {
        tooltip.style.left = e.clientX + 'px';
        tooltip.style.top = e.clientY + 'px';
      });
      el.addEventListener('mouseenter', () => {
        tooltip.classList.add('visible');
      });
      el.addEventListener('mouseleave', () => {
        tooltip.classList.remove('visible');
      });
    }
  });
})();
