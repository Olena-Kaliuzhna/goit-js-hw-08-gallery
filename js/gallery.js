import galleryItems from '../data/gallery-items.js';

const galleryContainerEl = document.querySelector('.js-gallery');
const lightboxEl = document.querySelector('.js-lightbox');
const lightboxOverlayEl = document.querySelector('.lightbox__overlay');
const lightboxImageEl = document.querySelector('.lightbox__image');
const closeModalBtn = document.querySelector('button[data-action="close-lightbox"]');
const gallerysMarkup = createGallery(galleryItems);
let activeIndex;

galleryContainerEl.insertAdjacentHTML('beforeend', gallerysMarkup);

galleryContainerEl.addEventListener('click', onGalleryClick);

function createGallery(galleryItems) {
  return galleryItems
    .map(({ preview, original, description }, index) => {
      return `
    <li class="gallery__item">
  <a
    class="gallery__link"
    href="${original}"
  >
    <img
      class="gallery__image"
      src="${preview}"
      data-source="${original}"
      data-index="${index}"
      alt="${description}"
    />
  </a>
</li>
    `;
    })
    .join('');
}

function onGalleryClick(event) {
  event.preventDefault();
  activeIndex = Number(event.target.dataset.index);

  if (event.target.nodeName !== 'IMG') {
    return;
  }
  window.addEventListener('keydown', onPressEscape);
  window.addEventListener('keydown', onPressArrow);
  closeModalBtn.addEventListener('click', onCloseModal);
  lightboxOverlayEl.addEventListener('click', onlightboxOverlayClick);

  lightboxEl.classList.add('is-open');
  lightboxImageEl.src = event.target.dataset.source;
  lightboxImageEl.alt = event.target.alt;
}

function onCloseModal() {
  window.removeEventListener('keydown', onPressEscape);
  window.removeEventListener('keydown', onPressArrow);
  closeModalBtn.removeEventListener('click', onCloseModal);
  lightboxOverlayEl.removeEventListener('click', onlightboxOverlayClick);

  lightboxEl.classList.remove('is-open');
  lightboxImageEl.src = '';
  lightboxImageEl.alt = '';
}

function onlightboxOverlayClick(event) {
  if (event.currentTarget === event.target) {
    onCloseModal();
  }
}

function onPressEscape(event) {
  if (event.code === 'Escape') {
    onCloseModal();
  }
}

function onPressArrow(event) {
  if (activeIndex === null) {
    return;
  }

  if (event.code === 'ArrowLeft') {
    if (activeIndex > 0) {
      activeIndex -= 1;
      lightboxImageEl.src = galleryItems[activeIndex].original;
    }
  }

  if (event.code === 'ArrowRight') {
    if (activeIndex < galleryItems.length - 1) {
      activeIndex += 1;
      lightboxImageEl.src = galleryItems[activeIndex].original;
    }
  }
}
