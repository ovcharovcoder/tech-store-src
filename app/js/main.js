// Десктопні дропдауни
document.querySelectorAll('[data-dropdown]').forEach(dropdownItem => {
  const btn = dropdownItem.querySelector('.nav__dropdown-btn');
  if (!btn) return;

  btn.addEventListener('click', e => {
    e.preventDefault();
    e.stopPropagation();

    document.querySelectorAll('.nav__item--open').forEach(openItem => {
      if (openItem !== dropdownItem) {
        openItem.classList.remove('nav__item--open');
        const openBtn = openItem.querySelector('.nav__dropdown-btn');
        if (openBtn) openBtn.setAttribute('aria-expanded', 'false');
      }
    });

    const isOpen = dropdownItem.classList.contains('nav__item--open');
    dropdownItem.classList.toggle('nav__item--open', !isOpen);
    btn.setAttribute('aria-expanded', !isOpen);
  });
});

document.addEventListener('click', e => {
  if (!e.target.closest('.header')) {
    document.querySelectorAll('.nav__item--open').forEach(openItem => {
      openItem.classList.remove('nav__item--open');
      const btn = openItem.querySelector('.nav__dropdown-btn');
      if (btn) btn.setAttribute('aria-expanded', 'false');
    });
  }
});

// Мобільний бургер меню
const burgerBtn = document.getElementById('burgerBtn');
const mobileMenu = document.getElementById('mobileMenu');
const overlay = document.getElementById('overlay');

function openMobileMenu() {
  mobileMenu.classList.add('mobile-menu--open');
  overlay.classList.add('overlay--active');
  document.body.style.overflow = 'hidden';
  burgerBtn.classList.add('burger--active');
}

function closeMobileMenu() {
  mobileMenu.classList.remove('mobile-menu--open');
  overlay.classList.remove('overlay--active');
  document.body.style.overflow = '';
  burgerBtn.classList.remove('burger--active');
}

burgerBtn.addEventListener('click', () => {
  if (mobileMenu.classList.contains('mobile-menu--open')) {
    closeMobileMenu();
  } else {
    openMobileMenu();
  }
});

overlay.addEventListener('click', closeMobileMenu);

// Мобільні дропдауни
document.querySelectorAll('[data-mobile-dropdown]').forEach(item => {
  const btn = item.querySelector('.mobile-menu__dropdown-btn');
  if (!btn) return;

  btn.addEventListener('click', e => {
    e.preventDefault();
    item.classList.toggle('mobile-menu__item--open');
  });
});

// Закриття меню при ресайзі вікна більше 850px
window.addEventListener('resize', () => {
  if (window.innerWidth > 850) {
    closeMobileMenu();
  }
});

// Слайдер для секції projects
document.addEventListener('DOMContentLoaded', function () {
  const sliderTrack = document.getElementById('sliderTrack');
  const prevBtn = document.getElementById('sliderPrev');
  const nextBtn = document.getElementById('sliderNext');
  const dotsContainer = document.getElementById('sliderDots');

  if (!sliderTrack || !prevBtn || !nextBtn || !dotsContainer) return;

  let currentIndex = 0;
  const slides = sliderTrack.querySelectorAll('.projects__slider-item');
  const totalSlides = slides.length;

  // Створюємо dots
  function createDots() {
    dotsContainer.innerHTML = '';
    for (let i = 0; i < totalSlides; i++) {
      const dot = document.createElement('button');
      dot.classList.add('projects__dot');
      if (i === currentIndex) dot.classList.add('projects__dot--active');
      dot.addEventListener('click', () => goToSlide(i));
      dotsContainer.appendChild(dot);
    }
  }

  // Оновлюємо активний dot
  function updateDots() {
    const dots = dotsContainer.querySelectorAll('.projects__dot');
    dots.forEach((dot, index) => {
      if (index === currentIndex) {
        dot.classList.add('projects__dot--active');
      } else {
        dot.classList.remove('projects__dot--active');
      }
    });
  }

  // Перехід до слайду
  function goToSlide(index) {
    if (index < 0) index = 0;
    if (index >= totalSlides) index = totalSlides - 1;
    currentIndex = index;

    const slideWidth = slides[0].offsetWidth;
    const gap = 20; // gap між слайдами
    const scrollPosition = currentIndex * (slideWidth + gap);
    sliderTrack.scrollTo({
      left: scrollPosition,
      behavior: 'smooth',
    });

    updateDots();
    updateButtons();
  }

  // Оновлюємо стан кнопок (disabled на краях)
  function updateButtons() {
    prevBtn.disabled = currentIndex === 0;
    nextBtn.disabled = currentIndex === totalSlides - 1;
  }

  // Слідкуємо за скролом (оновлюємо currentIndex)
  function handleScroll() {
    const slideWidth = slides[0].offsetWidth;
    const gap = 20;
    const scrollPosition = sliderTrack.scrollLeft;
    const newIndex = Math.round(scrollPosition / (slideWidth + gap));

    if (newIndex !== currentIndex && newIndex >= 0 && newIndex < totalSlides) {
      currentIndex = newIndex;
      updateDots();
      updateButtons();
    }
  }

  // Події
  prevBtn.addEventListener('click', () => goToSlide(currentIndex - 1));
  nextBtn.addEventListener('click', () => goToSlide(currentIndex + 1));
  sliderTrack.addEventListener('scroll', handleScroll);

  // Оновлюємо при ресайзі
  window.addEventListener('resize', () => {
    goToSlide(currentIndex);
  });

  // Ініціалізація
  createDots();
  updateButtons();

  // Встановлюємо початкову позицію
  setTimeout(() => {
    goToSlide(0);
  }, 100);
});

// Слайдер для You May Also Like секції
document.addEventListener('DOMContentLoaded', function () {
  const sliderTrack = document.getElementById('productsSliderTrack');
  const dotsContainer = document.getElementById('productsSliderDots');

  if (!sliderTrack || !dotsContainer) return;

  let currentIndex = 0;
  const slides = sliderTrack.querySelectorAll('.product-card');
  const totalSlides = slides.length;

  // Перевіряємо чи ми на мобільному пристрої (ширина <= 768px)
  function isMobile() {
    return window.innerWidth <= 768;
  }

  // Створюємо dots тільки на мобільному
  function createDots() {
    if (!isMobile()) {
      dotsContainer.innerHTML = '';
      return;
    }

    dotsContainer.innerHTML = '';
    for (let i = 0; i < totalSlides; i++) {
      const dot = document.createElement('button');
      dot.classList.add('you-may-like__dot');
      if (i === currentIndex) dot.classList.add('you-may-like__dot--active');
      dot.addEventListener('click', () => goToSlide(i));
      dotsContainer.appendChild(dot);
    }
  }

  // Оновлюємо активний dot
  function updateDots() {
    if (!isMobile()) return;

    const dots = dotsContainer.querySelectorAll('.you-may-like__dot');
    dots.forEach((dot, index) => {
      if (index === currentIndex) {
        dot.classList.add('you-may-like__dot--active');
      } else {
        dot.classList.remove('you-may-like__dot--active');
      }
    });
  }

  // Перехід до слайду
  function goToSlide(index) {
    if (index < 0) index = 0;
    if (index >= totalSlides) index = totalSlides - 1;
    currentIndex = index;

    const slideWidth = slides[0].offsetWidth;
    const gap = 16; // gap між слайдами
    const scrollPosition = currentIndex * (slideWidth + gap);
    sliderTrack.scrollTo({
      left: scrollPosition,
      behavior: 'smooth',
    });

    updateDots();
  }

  // Слідкуємо за скролом
  function handleScroll() {
    if (!isMobile()) return;

    const slideWidth = slides[0].offsetWidth;
    const gap = 16;
    const scrollPosition = sliderTrack.scrollLeft;
    const newIndex = Math.round(scrollPosition / (slideWidth + gap));

    if (newIndex !== currentIndex && newIndex >= 0 && newIndex < totalSlides) {
      currentIndex = newIndex;
      updateDots();
    }
  }

  // Оновлення при ресайзі
  function handleResize() {
    createDots();
    goToSlide(0);
  }

  // Події
  sliderTrack.addEventListener('scroll', handleScroll);
  window.addEventListener('resize', handleResize);

  // Ініціалізація
  createDots();

  // Невелика затримка для коректного розрахунку
  setTimeout(() => {
    if (isMobile()) {
      goToSlide(0);
    }
  }, 100);
});

// Валідація форми
document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('contactForm');

  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();

      // Отримуємо значення полів
      const name = document.getElementById('name').value.trim();
      const email = document.getElementById('email').value.trim();
      const message = document.getElementById('message').value.trim();

      // Проста валідація
      if (!name) {
        alert('Please enter your name');
        return;
      }

      if (!email) {
        alert('Please enter your email');
        return;
      }

      if (!isValidEmail(email)) {
        alert('Please enter a valid email address');
        return;
      }

      if (!message) {
        alert('Please enter your message');
        return;
      }

      // Тут можна додати відправку форми на сервер
      console.log('Form submitted:', { name, email, message });
      alert('Thank you for your message! We will get back to you soon.');
      form.reset();
    });
  }

  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
});

// Мобільна нижня навігація
document.addEventListener('DOMContentLoaded', function () {
  // Кнопка сортування/фільтрації
  const sortBtn = document.getElementById('sortBtn');
  if (sortBtn) {
    sortBtn.addEventListener('click', function (e) {
      e.preventDefault();
      // Тут можна відкрити модальне вікно з сортуванням
      console.log('Open sort/filter modal');
      alert('Sorting options coming soon!');
    });
  }

  // Кнопка вподобань
  const wishlistBtn = document.getElementById('wishlistBtn');
  if (wishlistBtn) {
    wishlistBtn.addEventListener('click', function (e) {
      e.preventDefault();
      // Тут можна перейти на сторінку вподобань
      console.log('Navigate to wishlist');
      window.location.href = '/wishlist';
    });
  }

  // Кнопка кошика
  const cartBtn = document.getElementById('cartBtn');
  if (cartBtn) {
    cartBtn.addEventListener('click', function (e) {
      e.preventDefault();
      // Тут можна відкрити кошик
      console.log('Open cart');
      window.location.href = '/cart';
    });
  }
});
