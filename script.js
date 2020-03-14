let navItems = document.querySelectorAll('.nav-list__item');

navItems.forEach(x => x.addEventListener('click', (evt) => {
  let currentActive = document.querySelector('.nav-list__item_active');
  currentActive.classList.toggle('nav-list__item_active');
  evt.currentTarget.classList.toggle('nav-list__item_active');
}));

