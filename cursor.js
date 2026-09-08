(function () {
  if (!window.matchMedia('(pointer: fine)').matches) return;

  const cursor = document.createElement('div');
  cursor.id = 'custom-cursor';
  document.body.appendChild(cursor);

  const interactiveSelector =
    'a, button, .card, .tag, input, textarea, select, [onclick]';

  // Start hidden until the mouse actually enters/moves on the page
  cursor.classList.add('cursor-hidden');


  function showCursor() {
    cursor.classList.remove('cursor-hidden');
  }
  
  function hideCursor() {
    cursor.classList.add('cursor-hidden');
    cursor.classList.remove('cursor-hover');
  }


  document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';

    showCursor();
  });


  document.addEventListener('mouseover', (e) => {
    if (e.target.closest(interactiveSelector)) {
      cursor.classList.add('cursor-hover');
    }
  });


  document.addEventListener('mouseout', (e) => {
    if (
      e.target.closest(interactiveSelector) &&
      !e.relatedTarget?.closest(interactiveSelector)
    ) {
      cursor.classList.remove('cursor-hover');
    }
  });


  // Hide when mouse leaves the browser page
  window.addEventListener('mouseout', (e) => {
    if (!e.relatedTarget && !e.toElement) {
      hideCursor();
    }
  });


  // Hide when browser/tab loses focus
  window.addEventListener('blur', hideCursor);


  // Hide when switching tabs
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      hideCursor();
    }
  });

})();