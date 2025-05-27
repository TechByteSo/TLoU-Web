document.addEventListener("DOMContentLoaded", function() {
  // Данные скриншотов
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

  // Элементы модального окна
  const modal = document.getElementById("screenshotModal");
  const modalImg = document.getElementById("modalScreenshot");
  const currentSpan = document.getElementById("currentImage");
  const totalSpan = document.getElementById("totalImages");
  const closeBtn = document.querySelector(".close");
  const prevBtn = document.querySelector(".prev-btn");
  const nextBtn = document.querySelector(".next-btn");
  const galleryCards = document.querySelectorAll(".gallery-card");

  let currentIndex = 0;

  // Инициализация
  totalSpan.textContent = screenshots.length;

  // Открытие модального окна
  function openModal(index) {
    currentIndex = index;
    modalImg.src = screenshots[currentIndex];
    currentSpan.textContent = currentIndex + 1;
    modal.style.display = "block";
    document.body.style.overflow = "hidden";
  }

  // Навигация
  function navigate(direction) {
    currentIndex += direction;
    if (currentIndex >= screenshots.length) currentIndex = 0;
    if (currentIndex < 0) currentIndex = screenshots.length - 1;
    
    modalImg.src = screenshots[currentIndex];
    currentSpan.textContent = currentIndex + 1;
  }

  // Клик по карточке галереи
  galleryCards.forEach((card, index) => {
    card.addEventListener("click", () => openModal(index));
  });

  // Кнопки навигации
  prevBtn.addEventListener("click", () => navigate(-1));
  nextBtn.addEventListener("click", () => navigate(1));

  // Закрытие модального окна
  closeBtn.addEventListener("click", () => {
    modal.style.display = "none";
    document.body.style.overflow = "auto";
  });

  // Закрытие по клику вне изображения
  window.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.style.display = "none";
      document.body.style.overflow = "auto";
    }
  });

  // Навигация клавиатурой
  document.addEventListener("keydown", (e) => {
    if (modal.style.display === "block") {
      if (e.key === "ArrowLeft") navigate(-1);
      else if (e.key === "ArrowRight") navigate(1);
      else if (e.key === "Escape") {
        modal.style.display = "none";
        document.body.style.overflow = "auto";
      }
    }
  });

  // Анимация появления элементов
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

  // Прокрутка вверх при загрузке
  window.scrollTo(0, 0);
});