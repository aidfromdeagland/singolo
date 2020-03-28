const header = document.querySelector('header');
const headerButtonBurger = header.querySelector('.header__button_burger');
const navLinks = header.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section');
const navItems = document.querySelectorAll('.nav-list__item');
const slider = document.querySelector('.slider');
const sliderControlPrev = slider.querySelector('.slider__control_prev');
const sliderControlNext = slider.querySelector('.slider__control_next');
const slidesContainer = slider.querySelector('.slider__slides');
const iphones = document.querySelectorAll('.iphone');
const filterButtons = document.querySelectorAll('.filter__button');
const galleryBlock = document.querySelector('.gallery');
const galleryImages = document.querySelectorAll('.gallery__image');
const feedbackForm = document.querySelector('.feedback');
const modalForm = document.querySelector('.modal_form');
const modalResolveButton = document.querySelector('.form-modal__button');


const windowScrollHandler = function () {
  const currentPos = window.scrollY;

  sections.forEach((x, xIndex) => {
    if (x.offsetTop - header.offsetHeight <= currentPos && x.offsetTop + x.offsetHeight > currentPos) {
      navItems.forEach((y, yIndex) => {
        if (y.classList.contains('nav-list__item_active')) {
          y.classList.remove('nav-list__item_active');
        }
        if (yIndex === xIndex) {
          y.classList.add('nav-list__item_active');
        }
      });
    }
  });
};

const modalResolveButtonHandler = function () {
  this.closest('.modal_active').classList.remove('modal_active');
  feedbackForm.reset();
  this.removeEventListener('click', modalResolveButtonHandler);
};

const modalEscapeKeydownHandler = function (evt) {
  if (evt.code === 'Escape') {
    if (modalForm.classList.contains('modal_active')) {
      modalForm.classList.remove('modal_active');
      feedbackForm.reset();
      window.removeEventListener('keydown', modalEscapeKeydownHandler)
    }
  }
};

slide(slider, slidesContainer, sliderControlPrev, sliderControlNext);
windowScrollHandler();

window.addEventListener('scroll', windowScrollHandler);

headerButtonBurger.addEventListener('click', () => {
  headerButtonBurger.classList.toggle('header__button_burger_active');
});

window.addEventListener('click', evt => {
  if (!evt.target.closest('header') || Array.prototype.includes.call(navLinks, evt.target)) {
    if (headerButtonBurger.classList.contains('header__button_burger_active')) {
      headerButtonBurger.classList.remove('header__button_burger_active');
    }
  }
});

iphones.forEach(x => x.addEventListener('click', () => {
  x.classList.toggle('iphone_disassembled');
}));
iphones.forEach(x => x.addEventListener('touchstart', () => {
  x.classList.toggle('iphone_disassembled');
}));

filterButtons.forEach(x => x.addEventListener('click', () => {
  const currentActive = document.querySelector('.filter__button_active');

  if (x !== currentActive) {
    currentActive.classList.toggle('filter__button_active');
    x.classList.toggle('filter__button_active');
    let galleryImages = document.querySelectorAll('.gallery__image');
    let shuffledImages = shuffle(Array.from(galleryImages));
    galleryImages.forEach(x => galleryBlock.removeChild(x));
    shuffledImages.forEach(x => galleryBlock.appendChild(x));
  }
}));

galleryImages.forEach(x => x.addEventListener('click', () => {
  const currentSelected = galleryBlock.querySelector('.gallery__image_selected');
  if (currentSelected) {
    currentSelected.classList.toggle('gallery__image_selected');
    x.classList.toggle('gallery__image_selected');
  } else {
    x.classList.toggle('gallery__image_selected');
  }
}));

feedbackForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  if (!modalForm.classList.contains('modal_active')) {
    const modalFormStatus = modalForm.querySelector('.form-modal__status');
    const modalFormSubject = modalForm.querySelector('.form-modal__subject');
    const modalFormDescription = modalForm.querySelector('.form-modal__description');

    const subjectText = feedbackForm.querySelector('.feedback__input_subject').value;
    const descriptionText = feedbackForm.querySelector('.feedback__textarea').value;

    modalFormStatus.textContent = 'Письмо отправлено';
    modalFormSubject.textContent = subjectText.trim() ? `Тема: ${subjectText.trim()}` : 'Без темы';
    modalFormDescription.textContent = descriptionText.trim() ? `Описание: ${descriptionText.trim()}` : 'Без описания';

    modalForm.classList.add('modal_active');
    window.addEventListener('keydown', modalEscapeKeydownHandler);
  }

  modalResolveButton.addEventListener('click', modalResolveButtonHandler);
});

