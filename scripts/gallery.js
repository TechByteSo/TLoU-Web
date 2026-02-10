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
      img.style.width = '100%';
      img.style.height = '100%';
      img.style.objectFit = 'contain';
      img.style.position = 'absolute';
      img.style.top = '0';
      img.style.left = '0';
      
      // Скрываем все кроме первого
      if (index !== 0) {
        img.style.opacity = '0';
        img.style.visibility = 'hidden';
      } else {
        img.style.opacity = '1';
        img.style.visibility = 'visible';
      }
      
      img.style.transition = 'opacity 0.3s ease';
      
      picture.appendChild(source);
      picture.appendChild(img);
      sliderContainer.appendChild(picture);
      modalImages.push({ picture, img });
    });
  }

  // 3. Функция открытия модального окна
  function openModal(index) {
    if (index < 0 || index >= screenshots.length) return;
    
    currentIndex = index;
    updateSlider();
    modal.style.display = "block";
    document.body.style.overflow = "hidden";
  }

  // 4. Обновление состояния слайдера
  function updateSlider() {
    modalImages.forEach((item, index) => {
      if (item && item.img) {
        if (index === currentIndex) {
          item.img.style.opacity = '1';
          item.img.style.visibility = 'visible';
          if (item.picture) {
            item.picture.style.display = 'flex';
          }
        } else {
          item.img.style.opacity = '0';
          item.img.style.visibility = 'hidden';
          if (item.picture) {
            item.picture.style.display = 'none';
          }
        }
      }
    });
    
    currentSpan.textContent = currentIndex + 1;
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
  prevBtn.addEventListener("click", () => navigate(-1));
  nextBtn.addEventListener("click", () => navigate(1));

  // 8. Закрытие модального окна
  closeBtn.addEventListener("click", function() {
    modal.style.display = "none";
    document.body.style.overflow = "auto";
  });

  // 9. Закрытие по клику вне изображения
  window.addEventListener("click", function(e) {
    if (e.target === modal) {
      modal.style.display = "none";
      document.body.style.overflow = "auto";
    }
  });

  // 10. Навигация с клавиатуры
  document.addEventListener("keydown", function(e) {
    if (modal.style.display === "block") {
      if (e.key === "ArrowLeft") {
        navigate(-1);
      } else if (e.key === "ArrowRight") {
        navigate(1);
      } else if (e.key === "Escape") {
        modal.style.display = "none";
        document.body.style.overflow = "auto";
      }
    }
  });

  // 11. Простая анимация появления карточек
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

  // 12. Инициализация
  totalSpan.textContent = screenshots.length;
  initSlider();
  
  // Запускаем анимацию после небольшой задержки
  setTimeout(animateCards, 300);
  window.scrollTo(0, 0);
});