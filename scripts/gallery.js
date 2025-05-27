document.addEventListener("DOMContentLoaded", function() {
  // Анимация заголовка
  const galleryIntro = document.querySelector(".gallery-intro");
  const galleryContainer = document.querySelector(".gallery-container");
  const cards = document.querySelectorAll(".gallery-card");

  // Показываем заголовок
  setTimeout(() => {
    galleryIntro.classList.add("visible");
  }, 100);

  // Затем контейнер и карточки
  setTimeout(() => {
    galleryContainer.classList.add("visible");

    cards.forEach((card, index) => {
      setTimeout(() => {
        card.style.opacity = "1";
        card.style.transform = "translateY(0)";
      }, 150 * index);
    });
  }, 300);

  // Прокрутка вверх при загрузке
  window.scrollTo(0, 0);
});