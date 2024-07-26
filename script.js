'use strict';

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const section1 = document.querySelector('#section--1');
const btnScrollTo = document.querySelector('.btn--scroll-to');
const navLinks = document.querySelector('.nav__links');
const navLink = document.querySelectorAll('.nav__link');
const nav = document.querySelector('.nav');

///////////////////////////////////////
// Modal window
const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

[...btnsOpenModal].forEach(btnOpenModal =>
  btnOpenModal.addEventListener('click', openModal)
);

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

/////////////////////////////////////////////
// Button Scrolling

btnScrollTo.addEventListener('click', e => {
  // const scrolledDistanceX = window.scrollX;
  // const scrolledDistanceY = window.scrollY;

  // const elementInfo = section1.getBoundingClientRect();

  // const viewportToElementX = elementInfo.x;
  // const viewportToElementY = elementInfo.y;

  // const xCoordinate = scrolledDistanceX + viewportToElementX;
  // const yCoordinate = scrolledDistanceY + viewportToElementY;

  // window.scrollTo({ left: xCoordinate, top: yCoordinate, behavior: 'smooth' });

  section1.scrollIntoView({ behavior: 'smooth' });
});

/////////////////////////////////////////////////
// Page Navigation

navLinks.addEventListener('click', function (e) {
  e.preventDefault();
  const targetElement = e.target;
  if (targetElement.classList.contains('nav__link')) {
    const id = targetElement.getAttribute('href');
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
});

/*
------.getBoundingClientRect()
X - from the left view port to that specific element 
Y - from the top view port to that specific element
window.scrollX - from the left start of the page to the beginning of the view port
window.scrollY - from the start of the page the beginning of the view port
document.documentElement.clientHeight - Height of the view port
document.documentElement.clientWidth - width of the view port
*/
////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////
