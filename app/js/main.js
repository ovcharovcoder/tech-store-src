document.addEventListener('DOMContentLoaded', function () {
  // ===== ДЕСКТОПНІ ДРОПДАУНИ =====
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

  // Закриття дропдаунів при кліку поза хедером
  document.addEventListener('click', e => {
    if (!e.target.closest('.header')) {
      document.querySelectorAll('.nav__item--open').forEach(openItem => {
        openItem.classList.remove('nav__item--open');
        const btn = openItem.querySelector('.nav__dropdown-btn');
        if (btn) btn.setAttribute('aria-expanded', 'false');
      });
    }
  });

  // ===== МОБІЛЬНИЙ БУРГЕР МЕНЮ =====
  const burgerBtn = document.getElementById('burgerBtn');
  const mobileMenu = document.getElementById('mobileMenu');
  const overlay = document.getElementById('overlay');

  if (burgerBtn && mobileMenu && overlay) {
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

    window.addEventListener('resize', () => {
      if (window.innerWidth > 850) {
        closeMobileMenu();
      }
    });
  }

  // ===== МОБІЛЬНІ ДРОПДАУНИ В МЕНЮ =====
  document.querySelectorAll('[data-mobile-dropdown]').forEach(item => {
    const btn = item.querySelector('.mobile-menu__dropdown-btn');
    if (!btn) return;

    btn.addEventListener('click', e => {
      e.preventDefault();
      item.classList.toggle('mobile-menu__item--open');
    });
  });

  // ===== СЛАЙДЕР ДЛЯ СЕКЦІЇ PROJECTS (ТІЛЬКИ DOTS) =====
  const projectsSliderTrack = document.getElementById('sliderTrack');
  const projectsDotsContainer = document.getElementById('sliderDots');

  if (projectsSliderTrack && projectsDotsContainer) {
    let projectsCurrentIndex = 0;
    const projectsSlides = projectsSliderTrack.querySelectorAll(
      '.projects__slider-item',
    );
    const projectsTotalSlides = projectsSlides.length;

    if (projectsTotalSlides === 0) return;

    // Перевірка чи на мобільному (до 768px)
    function isProjectsMobile() {
      return window.innerWidth <= 768;
    }

    // Створення dots
    function projectsCreateDots() {
      if (!isProjectsMobile()) {
        projectsDotsContainer.innerHTML = '';
        return;
      }

      projectsDotsContainer.innerHTML = '';
      for (let i = 0; i < projectsTotalSlides; i++) {
        const dot = document.createElement('button');
        dot.classList.add('projects__dot');
        if (i === projectsCurrentIndex)
          dot.classList.add('projects__dot--active');
        dot.addEventListener('click', () => projectsGoToSlide(i));
        projectsDotsContainer.appendChild(dot);
      }
    }

    // Оновлення активного dot
    function projectsUpdateDots() {
      if (!isProjectsMobile()) return;
      const dots = projectsDotsContainer.querySelectorAll('.projects__dot');
      dots.forEach((dot, index) => {
        if (index === projectsCurrentIndex) {
          dot.classList.add('projects__dot--active');
        } else {
          dot.classList.remove('projects__dot--active');
        }
      });
    }

    // Перехід до слайду
    function projectsGoToSlide(index) {
      if (index < 0) index = 0;
      if (index >= projectsTotalSlides) index = projectsTotalSlides - 1;
      projectsCurrentIndex = index;

      const slideWidth = projectsSlides[0].offsetWidth;
      const gap = 20;
      const scrollPosition = projectsCurrentIndex * (slideWidth + gap);
      projectsSliderTrack.scrollTo({
        left: scrollPosition,
        behavior: 'smooth',
      });

      projectsUpdateDots();
    }

    // Слідкуємо за скролом
    function projectsHandleScroll() {
      if (!isProjectsMobile()) return;

      const slideWidth = projectsSlides[0].offsetWidth;
      const gap = 20;
      const scrollPosition = projectsSliderTrack.scrollLeft;
      const newIndex = Math.round(scrollPosition / (slideWidth + gap));

      if (
        newIndex !== projectsCurrentIndex &&
        newIndex >= 0 &&
        newIndex < projectsTotalSlides
      ) {
        projectsCurrentIndex = newIndex;
        projectsUpdateDots();
      }
    }

    // Оновлення при ресайзі
    function projectsHandleResize() {
      projectsCreateDots();
      if (isProjectsMobile()) {
        projectsGoToSlide(0);
      }
    }

    // Підписуємось на події
    projectsSliderTrack.addEventListener('scroll', projectsHandleScroll);
    window.addEventListener('resize', projectsHandleResize);

    // Ініціалізація
    projectsCreateDots();
    setTimeout(() => {
      if (isProjectsMobile()) {
        projectsGoToSlide(0);
      }
    }, 100);
  }

  // ===== СЛАЙДЕР ДЛЯ YOU MAY ALSO LIKE =====
  const productsSliderTrack = document.getElementById('productsSliderTrack');
  const productsDotsContainer = document.getElementById('productsSliderDots');

  if (productsSliderTrack && productsDotsContainer) {
    let productsCurrentIndex = 0;
    const productsSlides =
      productsSliderTrack.querySelectorAll('.product-card');
    const productsTotalSlides = productsSlides.length;

    if (productsTotalSlides === 0) return;

    function isMobile() {
      return window.innerWidth <= 768;
    }

    function productsCreateDots() {
      if (!isMobile()) {
        productsDotsContainer.innerHTML = '';
        return;
      }

      productsDotsContainer.innerHTML = '';
      for (let i = 0; i < productsTotalSlides; i++) {
        const dot = document.createElement('button');
        dot.classList.add('you-may-like__dot');
        if (i === productsCurrentIndex)
          dot.classList.add('you-may-like__dot--active');
        dot.addEventListener('click', () => productsGoToSlide(i));
        productsDotsContainer.appendChild(dot);
      }
    }

    function productsUpdateDots() {
      if (!isMobile()) return;
      const dots = productsDotsContainer.querySelectorAll('.you-may-like__dot');
      dots.forEach((dot, index) => {
        if (index === productsCurrentIndex) {
          dot.classList.add('you-may-like__dot--active');
        } else {
          dot.classList.remove('you-may-like__dot--active');
        }
      });
    }

    function productsGoToSlide(index) {
      if (index < 0) index = 0;
      if (index >= productsTotalSlides) index = productsTotalSlides - 1;
      productsCurrentIndex = index;

      const slideWidth = productsSlides[0].offsetWidth;
      const gap = 16;
      const scrollPosition = productsCurrentIndex * (slideWidth + gap);
      productsSliderTrack.scrollTo({
        left: scrollPosition,
        behavior: 'smooth',
      });

      productsUpdateDots();
    }

    function productsHandleScroll() {
      if (!isMobile()) return;
      const slideWidth = productsSlides[0].offsetWidth;
      const gap = 16;
      const scrollPosition = productsSliderTrack.scrollLeft;
      const newIndex = Math.round(scrollPosition / (slideWidth + gap));

      if (
        newIndex !== productsCurrentIndex &&
        newIndex >= 0 &&
        newIndex < productsTotalSlides
      ) {
        productsCurrentIndex = newIndex;
        productsUpdateDots();
      }
    }

    function productsHandleResize() {
      productsCreateDots();
      if (isMobile()) {
        productsGoToSlide(0);
      }
    }

    productsSliderTrack.addEventListener('scroll', productsHandleScroll);
    window.addEventListener('resize', productsHandleResize);

    productsCreateDots();
    setTimeout(() => {
      if (isMobile()) productsGoToSlide(0);
    }, 100);
  }

  // ===== ВАЛІДАЦІЯ ФОРМИ З ПОМАРАНЧЕВИМ БОРДЕРОМ =====
  const form = document.getElementById('contactForm');

  if (form) {
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const subjectSelect = document.getElementById('subject');
    const messageTextarea = document.getElementById('message');

    const nameError = document.getElementById('nameError');
    const emailError = document.getElementById('emailError');
    const subjectError = document.getElementById('subjectError');
    const messageError = document.getElementById('messageError');

    function isValidEmail(email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    }

    function showError(input, errorElement, errorClass) {
      if (input) input.classList.add(errorClass);
      if (errorElement) {
        errorElement.style.display = 'block';
      }
    }

    function hideError(input, errorElement, errorClass) {
      if (input) input.classList.remove(errorClass);
      if (errorElement) {
        errorElement.style.display = 'none';
      }
    }

    function validateName() {
      const isValid = nameInput && nameInput.value.trim() !== '';
      if (!isValid) {
        showError(nameInput, nameError, 'contact__input--error');
        return false;
      } else {
        hideError(nameInput, nameError, 'contact__input--error');
        return true;
      }
    }

    function validateEmail() {
      const value = emailInput ? emailInput.value.trim() : '';
      const isValid = value !== '' && isValidEmail(value);
      if (!isValid) {
        showError(emailInput, emailError, 'contact__input--error');
        return false;
      } else {
        hideError(emailInput, emailError, 'contact__input--error');
        return true;
      }
    }

    function validateSubject() {
      const isValid =
        subjectSelect &&
        subjectSelect.value !== '' &&
        subjectSelect.value !== null;
      if (!isValid) {
        showError(subjectSelect, subjectError, 'contact__select--error');
        return false;
      } else {
        hideError(subjectSelect, subjectError, 'contact__select--error');
        return true;
      }
    }

    function validateMessage() {
      const isValid = messageTextarea && messageTextarea.value.trim() !== '';
      if (!isValid) {
        showError(messageTextarea, messageError, 'contact__textarea--error');
        return false;
      } else {
        hideError(messageTextarea, messageError, 'contact__textarea--error');
        return true;
      }
    }

    function validateForm() {
      const isNameValid = validateName();
      const isEmailValid = validateEmail();
      const isSubjectValid = validateSubject();
      const isMessageValid = validateMessage();
      return isNameValid && isEmailValid && isSubjectValid && isMessageValid;
    }

    if (nameInput) {
      nameInput.addEventListener('input', function () {
        if (this.value.trim() !== '') {
          hideError(this, nameError, 'contact__input--error');
        }
      });
    }

    if (emailInput) {
      emailInput.addEventListener('input', function () {
        if (this.value.trim() !== '' && isValidEmail(this.value.trim())) {
          hideError(this, emailError, 'contact__input--error');
        }
      });
    }

    if (subjectSelect) {
      subjectSelect.addEventListener('change', function () {
        if (this.value !== '' && this.value !== null) {
          hideError(this, subjectError, 'contact__select--error');
        }
      });
    }

    if (messageTextarea) {
      messageTextarea.addEventListener('input', function () {
        if (this.value.trim() !== '') {
          hideError(this, messageError, 'contact__textarea--error');
        }
      });
    }

    form.addEventListener('submit', function (e) {
      e.preventDefault();

      if (validateForm()) {
        console.log('Form submitted successfully!');
        alert('Thank you for your message! We will get back to you soon.');
        form.reset();

        document
          .querySelectorAll(
            '.contact__input--error, .contact__select--error, .contact__textarea--error',
          )
          .forEach(el => {
            el.classList.remove(
              'contact__input--error',
              'contact__select--error',
              'contact__textarea--error',
            );
          });
        document.querySelectorAll('.contact__error-message').forEach(el => {
          el.style.display = 'none';
        });
      }
    });
  }

  // ===== МОБІЛЬНА НИЖНЯ НАВІГАЦІЯ =====
  const sortBtn = document.getElementById('sortBtn');
  const wishlistBtn = document.getElementById('wishlistBtn');
  const cartBtn = document.getElementById('cartBtn');

  if (sortBtn) {
    sortBtn.addEventListener('click', function (e) {
      e.preventDefault();
      console.log('Open sort/filter modal');
      alert('Sorting options coming soon!');
    });
  }

  if (wishlistBtn) {
    wishlistBtn.addEventListener('click', function (e) {
      e.preventDefault();
      console.log('Navigate to wishlist');
    });
  }

  if (cartBtn) {
    cartBtn.addEventListener('click', function (e) {
      e.preventDefault();
      console.log('Open cart');
    });
  }
});
