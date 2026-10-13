(function () {
  const gallery = document.querySelector('.photo-gallery');
  if (!gallery) return;

  const photos = [...gallery.querySelectorAll('img')];
  if (!photos.length) return;

  let scheduled = false;

  function arrangePhotos() {
    scheduled = false;

    const styles = getComputedStyle(gallery);
    const requestedColumns =
      parseInt(styles.getPropertyValue('--columns'), 10) || 2;

    const columns = Math.min(requestedColumns, photos.length);
    const gap =
      parseFloat(styles.getPropertyValue('--gap')) || 0;

    const width = gallery.clientWidth;
    if (!width) return;

    const photoWidth = (width - gap * (columns - 1)) / columns;
    const heights = Array(columns).fill(0);

    photos.forEach(function (photo) {
      photo.style.width = `${photoWidth}px`;
    });

    photos.forEach(function (photo) {
      const minimumHeight = Math.min(...heights);
      const shortestColumn = heights.findIndex(function (height) {
        return height <= minimumHeight + 2;
      });
      const x = shortestColumn * (photoWidth + gap);
      const y = heights[shortestColumn];

      photo.style.transform = `translate(${x}px, ${y}px)`;

      heights[shortestColumn] +=
        photo.getBoundingClientRect().height + gap;
    });

    gallery.style.height =
      `${Math.max(0, Math.max(...heights) - gap)}px`;
  }

  function scheduleLayout() {
    if (scheduled) return;

    scheduled = true;
    requestAnimationFrame(arrangePhotos);
  }

  photos.forEach(function (photo) {
    photo.addEventListener('load', scheduleLayout);
    photo.addEventListener('error', scheduleLayout);
  });

  window.addEventListener('resize', scheduleLayout);
  window.addEventListener('load', scheduleLayout);

  scheduleLayout();
})();