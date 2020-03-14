function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}

let navItems = document.querySelectorAll('.nav-list__item');
let slider = document.querySelector('.slider');
let sliderControls = slider.querySelectorAll('.slider-control');
let slides = slider.querySelectorAll('.slide');
let iphones = document.querySelectorAll('.iphone');
let filterButtons = document.querySelectorAll('.filter__button');
let galleryImages = document.querySelectorAll('.gallery__image');

navItems.forEach(x => x.addEventListener('click', () => {
  let currentActive = document.querySelector('.nav-list__item_active');
  currentActive.classList.toggle('nav-list__item_active');
  x.classList.toggle('nav-list__item_active');
}));

sliderControls.forEach(x => x.addEventListener('click', () => {
  slides.forEach(x => x.classList.toggle('slide_active'))
}));

iphones.forEach(x => x.addEventListener('click', () => {
  x.classList.toggle('iphone_disassembled');
}));

filterButtons.forEach(x => x.addEventListener('click', () => {
  let currentActive = document.querySelector('.filter__button_active');

  if (x !== currentActive) {
    currentActive.classList.toggle('filter__button_active');
    x.classList.toggle('filter__button_active');

    let flexOrders = [];
    for (let i = 0; i < galleryImages.length; i++) {
      flexOrders.push(`${i}`);
    }
    flexOrders
      .sort((a, b) => 0.5 - Math.random())
      .sort((a, b) => Math.random() - Math.random())
      .sort((a, b) => Math.random() - Math.random());

    galleryImages.forEach((x, index) => x.style.order = flexOrders[index]);
  }

}));

