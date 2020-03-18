const slide = function (wrapper, items, prev, next) {
  let posX1 = 0,
    posX2 = 0,
    posInitial,
    posFinal,
    threshold = 100,
    slides = items.getElementsByClassName('slide'),
    slidesLength = slides.length,
    slideSize = items.getElementsByClassName('slide')[0].offsetWidth,
    firstSlide = slides[0],
    lastSlide = slides[slidesLength - 1],
    cloneFirst = firstSlide.cloneNode(true),
    cloneLast = lastSlide.cloneNode(true),
    index = 0,
    allowShift = true;

  // Clone first and last slide
  items.appendChild(cloneFirst);
  items.insertBefore(cloneLast, firstSlide);
  wrapper.classList.add('loaded');

  // Mouse events
  items.onmousedown = dragStart;

  // Touch events
  items.addEventListener('touchstart', dragStart);
  items.addEventListener('touchend', dragEnd);
  items.addEventListener('touchmove', dragAction);

  // Click events
  prev.addEventListener('click', function () {
    shiftSlide(-1)
  });
  next.addEventListener('click', function () {
    shiftSlide(1)
  });

  // Transition events
  items.addEventListener('transitionend', checkIndex);

  function dragStart(e) {
    e = e || window.event;
    e.preventDefault();
    posInitial = items.offsetLeft;

    if (e.type == 'touchstart') {
      posX1 = e.touches[0].clientX;
    } else {
      posX1 = e.clientX;
      document.onmouseup = dragEnd;
      document.onmousemove = dragAction;
    }
  }

  function dragAction(e) {
    e = e || window.event;

    if (e.type == 'touchmove') {
      posX2 = posX1 - e.touches[0].clientX;
      posX1 = e.touches[0].clientX;
    } else {
      posX2 = posX1 - e.clientX;
      posX1 = e.clientX;
    }
    items.style.left = (items.offsetLeft - posX2) + "px";
  }

  function dragEnd(e) {
    posFinal = items.offsetLeft;
    if (posFinal - posInitial < -threshold) {
      shiftSlide(1, 'drag');
    } else if (posFinal - posInitial > threshold) {
      shiftSlide(-1, 'drag');
    } else {
      items.style.left = (posInitial) + "px";
    }

    document.onmouseup = null;
    document.onmousemove = null;
  }

  function shiftSlide(dir, action) {
    items.classList.add('shifting');

    if (allowShift) {
      if (!action) {
        posInitial = items.offsetLeft;
      }
      if (dir == 1) {
        items.style.left = (posInitial - slideSize) + "px";
        index++;
      } else if (dir == -1) {
        items.style.left = (posInitial + slideSize) + "px";
        index--;
      }
    }

    allowShift = false;
  }

  function checkIndex() {
    items.classList.remove('shifting');

    if (index == -1) {
      items.style.left = -(slidesLength * slideSize) + "px";
      index = slidesLength - 1;
    }

    if (index == slidesLength) {
      items.style.left = -(1 * slideSize) + "px";
      index = 0;
    }

    allowShift = true;
  }
};

const shuffle = function (array) {
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
};


const navItems = document.querySelectorAll('.nav-list__item');
const slider = document.querySelector('.slider');
const sliderControlPrev = slider.querySelector('.slider__control_prev');
const sliderControlNext = slider.querySelector('.slider__control_next');
const slidesContainer = slider.querySelector('.slider__slides');
const iphones = document.querySelectorAll('.iphone');
const filterButtons = document.querySelectorAll('.filter__button');
const galleryBlock = document.querySelector('.gallery');
let galleryImages = document.querySelectorAll('.gallery__image');
const feedbackForm = document.querySelector('.feedback');
const modalForm = document.querySelector('.modal_form');


slide(slider, slidesContainer, sliderControlPrev, sliderControlNext);


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

iphones.forEach(x => x.addEventListener('click', () => {
  x.classList.toggle('iphone_disassembled');
}));
iphones.forEach(x => x.addEventListener('touchend', () => {
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
    galleryImages = document.querySelectorAll('.gallery__image');
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

