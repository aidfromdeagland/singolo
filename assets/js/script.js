function shuffle(array) {
  let m = array.length, t, i;

  // While there remain elements to shuffle…
  while (m) {

    // Pick a remaining element…
    i = Math.floor(Math.random() * m--);

    // And swap it with the current element.
    t = array[m];
    array[m] = array[i];
    array[i] = t;
  }

  return array;
}

const navItems = document.querySelectorAll('.nav-list__item');
const slider = document.querySelector('.slider');
const sliderControls = slider.querySelectorAll('.slider-control');
const slides = slider.querySelectorAll('.slide');
const iphones = document.querySelectorAll('.iphone');
const filterButtons = document.querySelectorAll('.filter__button');
const galleryBlock = document.querySelector('.gallery');
const galleryImages = document.querySelectorAll('.gallery__image');
const feedbackForm = document.querySelector('.feedback');
const modalForm = document.querySelector('.modal_form');

const modalResolveButtonHandler = function () {
  this.closest('.modal_active').classList.remove('modal_active');
  feedbackForm.reset();
  this.removeEventListener('click', modalResolveButtonHandler);
};

const modalOnEscapeHandler = function (evt) {
  if (evt.code === 'Escape') {
    if (modalForm.classList.contains('modal_active')) {
      modalForm.classList.remove('modal_active');
      feedbackForm.reset();
      window.removeEventListener('keydown', modalOnEscapeHandler)
    }
  }
};

navItems.forEach(x => x.addEventListener('click', () => {
  const currentActive = document.querySelector('.nav-list__item_active');
  currentActive.classList.toggle('nav-list__item_active');
  x.classList.toggle('nav-list__item_active');
}));

sliderControls.forEach(x => x.addEventListener('click', () => {
  slides.forEach(x => x.classList.toggle('slide_active'));
  iphones.forEach(x => {
    if (x.classList.contains('iphone_disassembled')) {
      x.classList.remove('iphone_disassembled');
    }
  })
}));

iphones.forEach(x => x.addEventListener('click', () => {
  x.classList.toggle('iphone_disassembled');
}));

filterButtons.forEach(x => x.addEventListener('click', () => {
  const currentActive = document.querySelector('.filter__button_active');

  if (x !== currentActive) {
    currentActive.classList.toggle('filter__button_active');
    x.classList.toggle('filter__button_active');

    let flexOrders = [];
    for (let i = 0; i < galleryImages.length; i++) {
      flexOrders.push(`${i}`);
    }
    flexOrders = shuffle(flexOrders);

    galleryImages.forEach((x, index) => x.style.order = flexOrders[index]);
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
    window.addEventListener('keydown', modalOnEscapeHandler);
  }

  const modalResolveButton = document.querySelector('.form-modal__button');
  modalResolveButton.addEventListener('click', modalResolveButtonHandler);

});

