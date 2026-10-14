(function () {
  const EMAIL = 'imad.abualfa.apps@gmail.com';
  const targets = document.querySelectorAll('.email-link, .nav-cta, .drawer-cta');
  if (!targets.length) return;

  const toast = document.createElement('div');
  toast.id = 'copy-toast';
  toast.innerHTML = `
    <svg width="16" height="16" viewBox="0 0 24 24"
         fill="none" stroke="currentColor" stroke-width="2"
         stroke-linecap="round" stroke-linejoin="round"
         aria-hidden="true">
      <rect x="8" y="8" width="12" height="12" rx="2"/>
      <path d="M16 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2"/>
    </svg>
    <span>Email copied</span>
  `;
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
      const gap = 16;
      const edge = 12;
      const width = tooltip.offsetWidth;
      const height = tooltip.offsetHeight;
      
      const left = Math.max(
        edge,
        Math.min(
          e.clientX - width / 2,
          window.innerWidth - width - edge
        )
      );
      
      const top =
        e.clientY + gap + height > window.innerHeight - edge
          ? e.clientY - height - gap
          : e.clientY + gap;
      
      tooltip.style.left = left + 'px';
      tooltip.style.top = Math.max(edge, top) + 'px';
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
