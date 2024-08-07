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
const logo = document.querySelector('.nav__logo');
const operationsContainer = document.querySelector('.operations');
const header = document.querySelector('header');
const sections = document.querySelectorAll('.section');
const featuresImages = document.querySelectorAll('.features__img');
const slides = document.querySelectorAll('.slide');
const btnLeft = document.querySelector('.slider__btn--left');
const btnRight = document.querySelector('.slider__btn--right');
const slider = document.querySelector('.slider');
const dotContainer = document.querySelector('.dots');
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

/////////////////////////////////////////////////
// Tabbed Component

operationsContainer.addEventListener('click', function (e) {
  const targetElement = e.target;
  /* We do this if an event might happen on a child element (span)
  of the element we want to work on (The button that enclosed the span). 
  But since we want to get the element that we want, we'll apply the
  closest method to get the element that we want (have the specific class)*/
  const parentThatWeWant = targetElement.closest('.operations__tab');
  if (parentThatWeWant) {
    [...document.getElementsByClassName('operations__tab')].forEach(function (
      item
    ) {
      item.classList.remove('operations__tab--active');
    });

    parentThatWeWant.classList.add('operations__tab--active');
    [...document.getElementsByClassName('operations__content')].forEach(
      function (element) {
        element.classList.remove('operations__content--active');
      }
    );
    const str = parentThatWeWant.getAttribute('data-tab');
    document
      .querySelector(`.operations__content--${str}`)
      .classList.add('operations__content--active');
  }
});

/////////////////////////////////////////////////
// NavBar

// Mouseenter does not bubble
const handleHover = function (e, bool) {
  const targetElement = e.target;
  const logo = targetElement.closest('.nav').querySelector('img');
  const parentThatWeWant = targetElement.closest('.nav__link');
  if (parentThatWeWant) {
    bool && logo.style.setProperty('opacity', '0.5');
    !bool && logo.style.setProperty('opacity', '1');
    targetElement
      .closest('.nav')
      .querySelectorAll('.nav__link')
      .forEach(function (child) {
        bool && child.style.setProperty('opacity', '0.5');
        !bool && child.style.setProperty('opacity', '1');
      });
    bool && parentThatWeWant.style.setProperty('opacity', '100');
  }
};
nav.addEventListener('mouseover', e => handleHover(e, true));

nav.addEventListener('mouseout', e => handleHover(e, false));

/////////////////////////////////////////////////
// NavBar

// document.addEventListener('scroll', function (e) {
//   const distanceScrolledY = window.scrollY;
//   const heightOfViewPort = document.documentElement.clientHeight;

//   if (distanceScrolledY > heightOfViewPort) {
//     nav.classList.add('sticky');
//   } else {
//     nav.classList.remove('sticky');
//   }
// });

const stickyCallback = function (entries) {
  entries.forEach(function (entry) {
    !entry.isIntersecting && nav.classList.add('sticky');
    entry.isIntersecting && nav.classList.remove('sticky');
  });
};

const stickyOptions = {
  root: null,
  threshold: [0],
  rootMargin: `-${nav.getBoundingClientRect().height}px`, //Help to execute the callback 90px before the threshold appeared
};

const headerObserver = new IntersectionObserver(stickyCallback, stickyOptions);
headerObserver.observe(header);

/////////////////////////////////////////////////
//Reveal Sections

const revealSection = function (entries) {
  entries.forEach(function (entry) {
    entry.isIntersecting && entry.target.classList.remove('section--hidden');
    sectionObserver.unobserve(entry.target);
  });
};

const revealOptions = {
  root: null,
  threshold: [0.2],
};

const sectionObserver = new IntersectionObserver(revealSection, revealOptions);

sections.forEach(function (section) {
  // section.classList.add('section--hidden');
  sectionObserver.observe(section);
});

/////////////////////////////////////////////////
//Lazy loading images

const imageCallback = function (entries) {
  entries.forEach(function (entry) {
    if (!entry.isIntersecting) return;
    entry.target.src = entry.target.getAttribute('data-src');
    // When the image finish loading, remove the blur
    entry.target.addEventListener('load', function (e) {
      entry.target.classList.remove('lazy-img');
    });
    observer.unobserve(entry.target);
  });
};

const imageOptions = {
  root: null,
  threshold: [0], // Any part of the target element is intersects the root element
  rootMargin: '200px',
};

const imgObserver = new IntersectionObserver(imageCallback, imageOptions);

featuresImages.forEach(function (featuresImage) {
  imgObserver.observe(featuresImage);
});

/////////////////////////////////////////////////
//Slider
let currentSlide = 0;
// slider.style.overflow = 'visible';
const maxSlide = slides.length;

const goToSlide = function (s) {
  slides.forEach(function (slide, index) {
    slide.style.transform = `translateX(${100 * (index - s)}%)`;
  });
};

const nextSlide = function () {
  if (currentSlide === maxSlide - 1) {
    currentSlide = 0;
  } else {
    currentSlide++;
  }
  goToSlide(currentSlide);
};

const prevSlide = function () {
  if (currentSlide === 0) {
    currentSlide = maxSlide - 1;
  } else {
    currentSlide--;
  }
  goToSlide(currentSlide);
};

goToSlide(0);

btnRight.addEventListener('click', nextSlide);

btnLeft.addEventListener('click', prevSlide);

document.addEventListener('keydown', function (e) {
  if (e.key === 'ArrowRight') nextSlide();
  else if (e.key === 'ArrowLeft') prevSlide();
});

/////////////////////////////////////////////////
//Slider

const createDots = function () {
  for (let i = 0; i < 3; i++) {
    let but = document.createElement('button');
    but.classList.add('dots__dot');
    if (i === 0) but.classList.add('dots__dot--active');
    but.setAttribute('data-slide', `${i}`);
    dotContainer.append(but);
  }
};

createDots();

const dots = document.querySelectorAll('.dots__dot');

const clearActiveDotState = function () {
  dots.forEach(function (eachDots) {
    eachDots.classList.remove('dots__dot--active');
  });
};

dots.forEach(function (dot) {
  dot.addEventListener('click', function (e) {
    clearActiveDotState();
    const index = e.target.getAttribute('data-slide');
    e.target.classList.add('dots__dot--active');
    goToSlide(Number(index));
  });
});
////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////

// This callback function will be called each time that
//the observed (target) element is intersecting the root element
// at the threshold we defined
// const obsCallback = function (entries, observer) {
//   entries.forEach(entry => {
//     alert('🎉🎉🎉🎉 Yay');
//   });
// };

// const obsOptions = {
//   root: null, // The element we want our target element to intersect
//   threshold: [0, 0.2], // The percentage of intersection in which
//   // the callback function will be called
// };

// const observer = new IntersectionObserver(obsCallback, obsOptions);
// observer.observe(section1); // We observe our target element

/* When {threshold} amount of my targeted part 
of the website {section1} becomes visible in or Intersects {root}, 
execute the callback function */
