// Получаем элемент кнопки "Наверх" по ID
const scrollToTopBtn = document.getElementById("scrollToTopBtn");

// Функция для показа/скрытия кнопки при скролле
function toggleScrollToTopButton() {
  // Проверяем положение скролла (для старых и новых браузеров)
  if (
    document.body.scrollTop > 600 ||
    document.documentElement.scrollTop > 600
  ) {
    // Если прокрутили больше 600px - показываем кнопку
    scrollToTopBtn.style.display = "flex"; // Используем flex для центрирования
  } else {
    // Если меньше 600px - скрываем кнопку
    scrollToTopBtn.style.display = "none";
  }
}

// Проверяем положение при загрузке страницы (на случай если страница загрузилась прокрученной)
toggleScrollToTopButton();

// Вешаем обработчик скролла на окно браузера
window.onscroll = toggleScrollToTopButton;

// Добавляем обработчик клика на кнопку
scrollToTopBtn.addEventListener("click", function () {
  // Плавно прокручиваем страницу вверх
  window.scrollTo({
    top: 0, // В самое начало (координата Y = 0)
    behavior: "smooth", // Плавная анимация прокрутки
  });
});