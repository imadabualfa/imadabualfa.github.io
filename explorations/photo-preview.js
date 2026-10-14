(function () {
  const gallery = document.querySelector('.photo-gallery');
  const preview = document.getElementById('photo-preview');
  if (!gallery || !preview) return;

  const photos = [...gallery.querySelectorAll('img')];
  const previewImage = preview.querySelector('.photo-preview-image');
  const closeButton = preview.querySelector('.photo-preview-close');
  const previousButton = preview.querySelector('.photo-preview-prev');
  const nextButton = preview.querySelector('.photo-preview-next');

  let currentIndex = 0;
  let previewLoadId = 0;
  let previousOverflow;
  let selectedPhoto;
  let cursor;
  let cursorParent;

  function showPhoto(index) {
    const navigating = preview.open;
    const direction = index > currentIndex ? 1 : -1;
    
    previewImage.getAnimations().forEach(function (animation) {
      animation.cancel();
    });
    currentIndex = (index + photos.length) % photos.length;

    const photo = photos[currentIndex];
    const loadId = ++previewLoadId;

    previewImage.style.opacity = '0';
    previewImage.src = photo.currentSrc || photo.src;
    previewImage.alt = photo.alt;

    if (!preview.open) {
      selectedPhoto = photo.closest('.photo-item');
      previousOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';

      preview.showModal();

      cursor = document.getElementById('custom-cursor');
      cursorParent = cursor ? cursor.parentNode : null;

      if (cursor) preview.appendChild(cursor);
    }

    previewImage.decode().then(function () {
      if (loadId !== previewLoadId || !preview.open) return;
    
      previewImage.style.opacity = '1';
    
      if (
        navigating &&
        !window.matchMedia('(prefers-reduced-motion: reduce)').matches
      ) {
        previewImage.animate(
          [
            {
              opacity: 0,
              transform: `translateX(${direction * 24}px)`
            },
            {
              opacity: 1,
              transform: 'translateX(0)'
            }
          ],
          {
            duration: 220,
            easing: 'cubic-bezier(0.16, 1, 0.3, 1)'
          }
        );
      }
    }).catch(function () {});

    }

  gallery.addEventListener('click', function (event) {
    const item = event.target.closest('.photo-item');
    if (!item) return;

    const photo = item.querySelector('img');
    const index = photos.indexOf(photo);

    if (index !== -1 && photo.naturalWidth > 0) {
      showPhoto(index);
    }
  });

  previousButton.addEventListener('click', function () {
    showPhoto(currentIndex - 1);
  });

  nextButton.addEventListener('click', function () {
    showPhoto(currentIndex + 1);
  });

  preview.addEventListener('keydown', function (event) {
    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      showPhoto(currentIndex - 1);
    }

    if (event.key === 'ArrowRight') {
      event.preventDefault();
      showPhoto(currentIndex + 1);
    }
  });

  closeButton.addEventListener('click', function () {
    preview.close();
  });

  preview.addEventListener('click', function (event) {
    if (event.target === preview) preview.close();
  });

  preview.addEventListener('close', function () {
    previewLoadId++;
    document.body.style.overflow = previousOverflow;

    if (cursor && cursorParent) {
      cursorParent.appendChild(cursor);
    }

    if (selectedPhoto) {
      selectedPhoto.focus({ preventScroll: true });
    }
  });

  let touchStartX = 0;
  let touchStartY = 0;
  
  previewImage.addEventListener('touchstart', function (event) {
    if (event.touches.length !== 1) {
      touchStartX = null;
      return;
    }
  
    touchStartX = event.touches[0].clientX;
    touchStartY = event.touches[0].clientY;
  }, { passive: true });
  
  previewImage.addEventListener('touchend', function (event) {
    if (touchStartX === null || !event.changedTouches.length) return;
  
    const dx = event.changedTouches[0].clientX - touchStartX;
    const dy = event.changedTouches[0].clientY - touchStartY;
  
    touchStartX = null;
  
    if (Math.abs(dx) < 50 || Math.abs(dx) < Math.abs(dy) * 1.5) return;
  
    showPhoto(currentIndex + (dx < 0 ? 1 : -1));
  }, { passive: true });
  
  previewImage.addEventListener('touchcancel', function () {
    touchStartX = null;
  });

})();