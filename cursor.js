(function () {
  if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
    return;
  }

  const cursor = document.createElement('div');
  cursor.id = 'custom-cursor';
  cursor.classList.add('cursor-hidden');
  document.body.appendChild(cursor);

  const clickableSelector =
    'a[href], button, .card, select, summary, [onclick], [role="button"]';

  const textInputSelector =
    'textarea, [contenteditable="true"], ' +
    'input:not([type="button"]):not([type="submit"]):not([type="reset"])' +
    ':not([type="checkbox"]):not([type="radio"]):not([type="range"])' +
    ':not([type="color"]):not([type="file"]):not([type="image"])';

  function isOverText(event) {
    let node;
  
    if (document.caretPositionFromPoint) {
      node = document.caretPositionFromPoint(
        event.clientX,
        event.clientY
      )?.offsetNode;
    } else if (document.caretRangeFromPoint) {
      node = document.caretRangeFromPoint(
        event.clientX,
        event.clientY
      )?.startContainer;
    }
  
    if (
      !node ||
      node.nodeType !== Node.TEXT_NODE ||
      !node.textContent.trim()
    ) {
      return false;
    }
  
    const range = document.createRange();
  
    // Check the entire text, rather than one character.
    range.selectNodeContents(node);
  
    return Array.from(range.getClientRects()).some(rect =>
      event.clientX >= rect.left &&
      event.clientX <= rect.right &&
      event.clientY >= rect.top &&
      event.clientY <= rect.bottom
    );
  }

  function hideCursor() {
    cursor.classList.add('cursor-hidden');
    cursor.classList.remove('cursor-hover', 'cursor-text');
  }

  document.addEventListener('mousemove', event => {
    cursor.style.left = event.clientX + 'px';
    cursor.style.top = event.clientY + 'px';
    cursor.classList.remove('cursor-hidden');

    const target = event.target;
    const textInput = !!target.closest(textInputSelector);
    const clickable = !textInput && !!target.closest(clickableSelector);
    const text = textInput || isOverText(event);
    
    cursor.classList.toggle('cursor-hover', clickable);
    cursor.classList.toggle('cursor-text', !clickable && text);
  });

  document.documentElement.addEventListener('mouseleave', hideCursor);
  window.addEventListener('blur', hideCursor);

  document.addEventListener('visibilitychange', () => {
    if (document.hidden) hideCursor();
  });
})();