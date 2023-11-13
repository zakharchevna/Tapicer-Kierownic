function Gallery(gallery) {
  if (!gallery) {
    throw new Error('No Gallery Found!');
  }
  
  const images = Array.from(gallery.querySelectorAll('img'));
  const modal = document.querySelector('.modal');
  const prevButton = modal.querySelector('.prev');
  const nextButton = modal.querySelector('.next');
  let currentImage;
  let nextImage;
  let previousImage;

  function openModal() {
    if (modal.matches('.open')) {
      console.info('Madal already open');
      return;
    }
    modal.classList.add('open');

    window.addEventListener('keyup', handleKeyUp);
    nextButton.addEventListener('click', showNextImage);
    prevButton.addEventListener('click', showPrevImage);
  }

  function closeModal() {
    modal.classList.remove('open');
    // TODO: add event listeners for clicks and keyboard..
    window.removeEventListener('keyup', handleKeyUp);
    nextButton.removeEventListener('click', showNextImage);
    prevButton.removeEventListener('click', showPrevImage);
  }

  function handleClickOutside(e) {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  }

  function handleKeyUp(event) {
    if (event.key === 'Escape') return closeModal();
    if (event.key === 'ArrowRight') return showNextImage();
    if (event.key === 'ArrowLeft') return showPrevImage();
  }

  function showNextImage() {
    const index = images.findIndex(img => img === currentImage);
    const nextIndex = (index + 1) % images.length;
    showImage(images[nextIndex]);
  }

  function showPrevImage() {
    const index = images.findIndex(img => img === currentImage);
    const prevIndex = (index - 1 + images.length) % images.length;
    showImage(images[prevIndex]);
  }


  function showImage(el) {
    if (!el) {
      console.info('no image to show');
      return;
    }
    modal.querySelector('img').src = el.src;
    currentImage = el;
    nextImage = images[(images.indexOf(currentImage) + 1) % images.length];
    previousImage = images[(images.indexOf(currentImage) - 1 + images.length) % images.length];
    openModal();
  }

  images.forEach(image =>
    image.addEventListener('click', e => showImage(e.currentTarget))
  );

  images.forEach(image => {
    image.addEventListener('keyup', e => {
      if (e.key === 'Enter') {
        showImage(e.currentTarget);
      }
    });
  });

  modal.addEventListener('click', handleClickOutside);
}


const gallery = Gallery(document.querySelector('.gallery__images'));
