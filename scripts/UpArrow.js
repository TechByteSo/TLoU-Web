/**
 * Управление кнопкой "Наверх"
 * 
 * 1. Показывает/скрывает кнопку при скролле
 * 2. Обеспечивает плавную прокрутку вверх
 */

const scrollToTopBtn = document.getElementById("scrollToTopBtn");

// Функция показа/скрытия кнопки
function toggleScrollToTopButton() {
  const scrollPosition = window.pageYOffset || document.documentElement.scrollTop;
  
  if (scrollPosition > 600) {
    scrollToTopBtn.style.display = "flex";
  } else {
    scrollToTopBtn.style.display = "none";
  }
}

// Инициализация при загрузке
toggleScrollToTopButton();

// Обработчик скролла
window.onscroll = toggleScrollToTopButton;

// Обработчик клика
scrollToTopBtn.addEventListener("click", function() {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
});