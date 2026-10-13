(function () {
  const gallery = document.querySelector('.photo-gallery');
  if (!gallery) return;

  const photos = [...gallery.querySelectorAll('img')];
  if (!photos.length) return;

  const items = photos.map(function (photo) {
    const item = document.createElement('div');
    item.className = 'photo-item';

    const width = Number(photo.getAttribute('width'));
    const height = Number(photo.getAttribute('height'));

    photo.replaceWith(item);
    item.appendChild(photo);

    function revealPhoto() {
      item.classList.add('is-loaded');
    }

    function showError() {
      item.classList.add('is-error');
    }

    photo.addEventListener('load', revealPhoto, { once: true });
    photo.addEventListener('error', showError, { once: true });

    if (photo.complete) {
      photo.naturalWidth > 0 ? revealPhoto() : showError();
    }

    return {
      element: item,
      ratio: width > 0 && height > 0 ? height / width : 1
    };
  });

  let scheduled = false;

  function arrangePhotos() {
    scheduled = false;

    const styles = getComputedStyle(gallery);
    const requestedColumns =
      parseInt(styles.getPropertyValue('--columns'), 10) || 2;

    const columns = Math.min(requestedColumns, items.length);
    const gap =
      parseFloat(styles.getPropertyValue('--gap')) || 0;

    const width = gallery.clientWidth;
    if (!width) return;

    const photoWidth = (width - gap * (columns - 1)) / columns;
    const heights = Array(columns).fill(0);

    items.forEach(function (item) {
      const minimumHeight = Math.min(...heights);
      const column = heights.findIndex(function (height) {
        return height <= minimumHeight + 2;
      });

      const photoHeight = photoWidth * item.ratio;
      const x = column * (photoWidth + gap);
      const y = heights[column];

      item.element.style.width = `${photoWidth}px`;
      item.element.style.height = `${photoHeight}px`;
      item.element.style.transform = `translate(${x}px, ${y}px)`;

      heights[column] += photoHeight + gap;
    });

    gallery.style.height =
      `${Math.max(0, Math.max(...heights) - gap)}px`;
  }

  function scheduleLayout() {
    if (scheduled) return;

    scheduled = true;
    requestAnimationFrame(arrangePhotos);
  }

  window.addEventListener('resize', scheduleLayout);

  arrangePhotos();
})();