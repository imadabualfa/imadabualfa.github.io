(function () {
  const gallery = document.querySelector('.photo-gallery');
  const preview = document.getElementById('photo-preview');
  const previewImage = preview.querySelector('.photo-preview-image');
  const closeButton = preview.querySelector('.photo-preview-close');

  let previousOverflow;
  let selectedPhoto;
  let cursor;
  let cursorParent;
  let previewLoadId = 0;

  gallery.addEventListener('click', function (event) {
    const item = event.target.closest('.photo-item');
    if (!item) return;

    const photo = item.querySelector('img');
    if (!photo || !photo.naturalWidth) return;

    selectedPhoto = item;
    const loadId = ++previewLoadId;

    previewImage.style.opacity = '0';
    previewImage.src = photo.currentSrc || photo.src;
    previewImage.alt = photo.alt;
    
    previewImage.decode().then(function () {
      if (loadId === previewLoadId && preview.open) {
        previewImage.style.opacity = '1';
      }
    }).catch(function () {});

    previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    preview.showModal();

    // Keep your custom cursor visible above the dialog.
    cursor = document.getElementById('custom-cursor');
    cursorParent = cursor ? cursor.parentNode : null;

    if (cursor) preview.appendChild(cursor);
  });

  closeButton.addEventListener('click', function () {
    preview.close();
  });

  preview.addEventListener('click', function (event) {
    if (event.target === preview) preview.close();
  });

  preview.addEventListener('close', function () {
    document.body.style.overflow = previousOverflow;

    if (cursor && cursorParent) {
      cursorParent.appendChild(cursor);
    }

    if (selectedPhoto) selectedPhoto.focus({ preventScroll: true });
  });
})();