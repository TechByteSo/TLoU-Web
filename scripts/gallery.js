document.addEventListener("DOMContentLoaded", function() {
  // 1. Подготовка данных и элементов
  const screenshots = [
    "images/Gallery/Webp/1.webp",
    "images/Gallery/Webp/2.webp",
    "images/Gallery/Webp/3.webp",
    "images/Gallery/Webp/4.webp",
    "images/Gallery/Webp/5.webp",
    "images/Gallery/Webp/6.webp",
    "images/Gallery/Webp/7.webp",
    "images/Gallery/Webp/8.webp",
    "images/Gallery/Webp/9.webp",
    "images/Gallery/Webp/10.webp",
    "images/Gallery/Webp/11.webp",
    "images/Gallery/Webp/12.webp",
    "images/Gallery/Webp/13.webp",
    "images/Gallery/Webp/14.webp",
    "images/Gallery/Webp/15.webp",
  ];

  // Получаем элементы DOM
  const modal = document.getElementById("screenshotModal");
  const sliderContainer = document.querySelector(".slider-container");
  const currentSpan = document.getElementById("currentImage");
  const totalSpan = document.getElementById("totalImages");
  const closeBtn = document.querySelector(".close-btn");
  const prevBtn = document.querySelector(".prev-btn");
  const nextBtn = document.querySelector(".next-btn");
  const galleryCards = document.querySelectorAll(".gallery-card");

  // Проверка существования элементов
  if (!modal || !sliderContainer || !currentSpan || !totalSpan || !closeBtn || !prevBtn || !nextBtn) {
    return;
  }

  // Переменные состояния
  let currentIndex = 0;
  let modalImages = [];
  let hideControlsTimeout = null;
  const HIDE_CONTROLS_DELAY = 3000; // 3 секунды до скрытия кнопок

  // 2. Инициализация слайдера
  function initSlider() {
    sliderContainer.innerHTML = '';
    modalImages = [];
    
    // Создаем элементы изображений для слайдера с picture и fallback
    screenshots.forEach((src, index) => {
      const picture = document.createElement('picture');
      const source = document.createElement('source');
      source.srcset = src;
      source.type = 'image/webp';
      
      const img = document.createElement('img');
      img.src = `images/Gallery/fallback/${index + 1}.png`;
      img.alt = `Скриншот ${index + 1}`;
      img.style.width = 'auto';
      img.style.height = 'auto';
      img.style.maxWidth = '100%';
      img.style.maxHeight = '80vh';
      img.style.objectFit = 'contain';
      img.style.display = 'block';
      
      // Обработка ошибок загрузки изображений
      img.addEventListener('error', function() {
        console.error(`Ошибка загрузки изображения ${index + 1}:`, this.src);
        // Если fallback тоже не загрузился, показываем placeholder
        this.onerror = null;
        this.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="800" height="600"%3E%3Crect fill="%23333" width="800" height="600"/%3E%3Ctext fill="%23999" x="50%25" y="50%25" text-anchor="middle" dy=".3em" font-size="24"%3EИзображение не загружено%3C/text%3E%3C/svg%3E';
        this.alt = `Ошибка загрузки скриншота ${index + 1}`;
      });
      
      picture.appendChild(source);
      picture.appendChild(img);
      sliderContainer.appendChild(picture);
      modalImages.push({ picture, img });
    });
    
    // Показываем первое изображение
    updateSlider();
  }

  // Функция показа кнопок управления
  function showControls() {
    modal.classList.remove("hide-controls");
    resetHideControlsTimer();
  }
  
  // Функция скрытия кнопок управления
  function hideControls() {
    modal.classList.add("hide-controls");
  }
  
  // Сброс таймера скрытия кнопок
  function resetHideControlsTimer() {
    if (hideControlsTimeout) {
      clearTimeout(hideControlsTimeout);
    }
    hideControlsTimeout = setTimeout(() => {
      hideControls();
    }, HIDE_CONTROLS_DELAY);
  }
  
  // 3. Функция открытия модального окна
  function openModal(index) {
    if (index < 0 || index >= screenshots.length) return;
    
    currentIndex = index;
    
    // Инициализируем слайдер если еще не инициализирован
    if (modalImages.length === 0) {
      initSlider();
    } else {
      updateSlider();
    }
    
    modal.style.display = "block";
    document.body.style.overflow = "hidden";
    
    setTimeout(() => {
      modal.classList.add("show");
      showControls();
    }, 10);
  }

  // Функция предзагрузки изображений
  function preloadImage(src) {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = src;
    document.head.appendChild(link);
  }
  
  // Предзагрузка следующего и предыдущего изображения
  function preloadAdjacentImages() {
    const nextIndex = (currentIndex + 1) % screenshots.length;
    const prevIndex = (currentIndex - 1 + screenshots.length) % screenshots.length;
    
    // Предзагружаем следующее изображение
    if (screenshots[nextIndex]) {
      preloadImage(screenshots[nextIndex]);
    }
    
    // Предзагружаем предыдущее изображение
    if (screenshots[prevIndex]) {
      preloadImage(screenshots[prevIndex]);
    }
  }

  // 4. Обновление состояния слайдера с анимацией
  function updateSlider() {
    const pictures = sliderContainer.querySelectorAll('picture');
    if (pictures.length === 0) return;
    
    // Определяем направление смены для анимации
    const prevActiveIndex = Array.from(pictures).findIndex(p => p.classList.contains('active'));
    const direction = currentIndex > prevActiveIndex ? 1 : -1;
    
    pictures.forEach((picture, index) => {
      if (index === currentIndex) {
        // Убираем inline стили, чтобы работали CSS transitions
        picture.style.opacity = '';
        picture.style.visibility = '';
        picture.style.zIndex = '';
        picture.style.transform = '';
        picture.classList.add('active');
      } else {
        // Убираем inline стили для плавной анимации
        picture.style.opacity = '';
        picture.style.visibility = '';
        picture.style.zIndex = '';
        picture.style.transform = '';
        picture.classList.remove('active');
      }
    });
    
    if (currentSpan) {
      currentSpan.textContent = currentIndex + 1;
    }
    
    // Предзагружаем соседние изображения
    preloadAdjacentImages();
    
    // Показываем кнопки при смене изображения
    showControls();
  }

  // 5. Навигация между изображениями
  function navigate(direction) {
    currentIndex = (currentIndex + direction + screenshots.length) % screenshots.length;
    updateSlider();
  }

  // 6. Обработчики событий для карточек галереи
  galleryCards.forEach((card, index) => {
    card.setAttribute('data-index', index);
    card.addEventListener("click", function() {
      const cardIndex = parseInt(this.getAttribute('data-index'));
      if (!isNaN(cardIndex)) {
        openModal(cardIndex);
      }
    });
  });

  // 7. Обработчики для кнопок навигации
  prevBtn.addEventListener("click", () => {
    navigate(-1);
    showControls();
  });
  nextBtn.addEventListener("click", () => {
    navigate(1);
    showControls();
  });
  
  // Добавляем свайп функциональность для галереи
  setupGallerySwipe();
  
  // Обработчики для показа кнопок при взаимодействии (только на мобилках)
  function setupMobileControls() {
    // При touch показываем кнопки
    modal.addEventListener('touchstart', function(e) {
      if (modal.style.display === "block") {
        showControls();
      }
    }, { passive: true });
    
    modal.addEventListener('touchmove', function(e) {
      if (modal.style.display === "block") {
        showControls();
      }
    }, { passive: true });
    
    modal.addEventListener('touchend', function(e) {
      if (modal.style.display === "block") {
        showControls();
      }
    }, { passive: true });
    
    // При движении мыши показываем кнопки (для устройств с мышью)
    modal.addEventListener('mousemove', function(e) {
      if (modal.style.display === "block") {
        showControls();
      }
    });
    
    // При клике на модальное окно показываем кнопки
    modal.addEventListener('click', function(e) {
      if (modal.style.display === "block" && (e.target === modal || e.target === sliderContainer)) {
        showControls();
      }
    });
  }
  
  // Инициализируем обработчики для мобилок
  if (window.innerWidth <= 768) {
    setupMobileControls();
  }
  
  // Также проверяем при изменении размера окна
  window.addEventListener('resize', function() {
    if (window.innerWidth <= 768 && !modal.hasAttribute('data-mobile-controls-setup')) {
      setupMobileControls();
      modal.setAttribute('data-mobile-controls-setup', 'true');
    }
  });

  // 8. Функция закрытия модального окна
  function closeModal() {
    if (hideControlsTimeout) {
      clearTimeout(hideControlsTimeout);
      hideControlsTimeout = null;
    }
    modal.classList.remove("show");
    modal.classList.remove("hide-controls");
    setTimeout(() => {
      modal.style.display = "none";
      document.body.style.overflow = "auto";
    }, 300);
  }

  // 10. Закрытие модального окна
  closeBtn.addEventListener("click", closeModal);

  // 11. Закрытие по клику вне изображения
  window.addEventListener("click", function(e) {
    if (e.target === modal) {
      closeModal();
    }
  });

  // 12. Навигация с клавиатуры
  document.addEventListener("keydown", function(e) {
    if (modal.style.display === "block") {
      if (e.key === "ArrowLeft") {
        navigate(-1);
      } else if (e.key === "ArrowRight") {
        navigate(1);
      } else if (e.key === "Escape") {
        closeModal();
      }
    }
  });

  // Функция настройки свайпа для галереи
  function setupGallerySwipe() {
    const sliderContainer = document.querySelector('.slider-container');
    if (!sliderContainer) return;
    
    let touchStartX = 0;
    let touchEndX = 0;
    let isSwiping = false;
    
    sliderContainer.addEventListener('touchstart', function(e) {
      touchStartX = e.changedTouches[0].screenX;
      isSwiping = true;
      showControls(); // Показываем кнопки при начале свайпа
    }, { passive: true });
    
    sliderContainer.addEventListener('touchmove', function(e) {
      if (isSwiping) {
        touchEndX = e.changedTouches[0].screenX;
        showControls(); // Показываем кнопки при движении
      }
    }, { passive: true });
    
    sliderContainer.addEventListener('touchend', function(e) {
      if (!isSwiping) return;
      
      const swipeDistance = touchStartX - touchEndX;
      const minSwipeDistance = 50;
      
      if (Math.abs(swipeDistance) > minSwipeDistance) {
        if (swipeDistance > 0) {
          navigate(1); // Свайп влево - следующее
        } else {
          navigate(-1); // Свайп вправо - предыдущее
        }
      }
      
      showControls(); // Показываем кнопки после свайпа
      isSwiping = false;
      touchStartX = 0;
      touchEndX = 0;
    }, { passive: true });
  }

  // 12. Простая анимация появления карточек
  function animateCards() {
    galleryCards.forEach((card, index) => {
      card.style.opacity = '0';
      card.style.transform = 'translateY(20px)';
      card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
      
      setTimeout(() => {
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
      }, 100 + index * 100);
    });
  }

  // 13. Инициализация
  totalSpan.textContent = screenshots.length;
  
  // Анимация появления контейнера галереи
  const galleryContainer = document.querySelector('.gallery-container');
  if (galleryContainer) {
    setTimeout(() => {
      galleryContainer.classList.add('visible');
    }, 100);
  }
  
  // Анимация заголовка
  const galleryIntro = document.querySelector('.gallery-intro');
  if (galleryIntro) {
    galleryIntro.classList.add('visible');
  }
  
  window.scrollTo(0, 0);
});