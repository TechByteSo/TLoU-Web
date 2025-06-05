document.addEventListener("DOMContentLoaded", function() {
  // 1. Подготовка данных и элементов
  const screenshots = [
    "images/Gallery/1.png",
    "images/Gallery/2.png",
    "images/Gallery/3.png",
    "images/Gallery/4.png",
    "images/Gallery/5.png",
    "images/Gallery/6.png",
    "images/Gallery/7.png",
    "images/Gallery/8.png",
    "images/Gallery/9.png",
    "images/Gallery/10.png",
    "images/Gallery/11.png",
    "images/Gallery/12.png",
    "images/Gallery/13.png",
    "images/Gallery/14.png",
    "images/Gallery/15.png"
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

  // Переменные состояния
  let currentIndex = 0;
  let isAnimating = false;
  let modalImages = [];

  // 2. Инициализация слайдера
  function initSlider() {
    sliderContainer.innerHTML = '';
    modalImages = [];
    
    // Создаем элементы изображений для слайдера
    screenshots.forEach((src, index) => {
      const img = document.createElement('img');
      img.src = src;
      img.alt = `Скриншот ${index + 1}`;
      
      // Первое изображение делаем видимым
      if (index === 0) {
        img.classList.add('active');
      }
      
      sliderContainer.appendChild(img);
      modalImages.push(img);
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
    modalImages.forEach((img, index) => {
      img.classList.toggle('active', index === currentIndex);
    });
    
    currentSpan.textContent = currentIndex + 1;
  }

  // 5. Навигация между изображениями
  function navigate(direction) {
    if (isAnimating) return;
    
    isAnimating = true;
    const oldIndex = currentIndex;
    currentIndex = (currentIndex + direction + screenshots.length) % screenshots.length;
    
    // Прячем старое изображение
    modalImages[oldIndex].classList.remove('active');
    
    // Показываем новое с анимацией
    setTimeout(() => {
      modalImages[currentIndex].classList.add('active');
      isAnimating = false;
      currentSpan.textContent = currentIndex + 1;
    }, 100);
  }

  // 6. Обработчики событий для карточек галереи
  galleryCards.forEach((card) => {
    card.addEventListener("click", function() {
      const cardIndex = parseInt(this.getAttribute('data-index'));
      if (!isNaN(cardIndex) && cardIndex >= 0 && cardIndex < screenshots.length) {
        openModal(cardIndex);
      }
    });
  });

  // 7. Обработчики для кнопок навигации
  prevBtn.addEventListener("click", () => navigate(-1));
  nextBtn.addEventListener("click", () => navigate(1));

  // 8. Закрытие модального окна
  closeBtn.addEventListener("click", () => {
    modal.style.display = "none";
    document.body.style.overflow = "auto";
  });

  // 9. Закрытие по клику вне изображения
  window.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.style.display = "none";
      document.body.style.overflow = "auto";
    }
  });

  // 10. Навигация с клавиатуры
  document.addEventListener("keydown", (e) => {
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

  // 11. Анимация появления элементов при загрузке
  const galleryIntro = document.querySelector(".gallery-intro");
  const galleryContainer = document.querySelector(".gallery-container");
  
  setTimeout(() => {
    galleryIntro.classList.add("visible");
  }, 100);

  setTimeout(() => {
    galleryContainer.classList.add("visible");
    
    galleryCards.forEach((card, index) => {
      setTimeout(() => {
        card.style.opacity = "1";
        card.style.transform = "translateY(0)";
      }, 150 * index);
    });
  }, 300);

  // 12. Инициализация
  totalSpan.textContent = screenshots.length;
  initSlider();
  window.scrollTo(0, 0);
});