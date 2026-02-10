/**
 * Обработчик прокрутки страницы и анимации контейнеров
 * 
 * 1. Отключает автоматическое восстановление позиции скролла
 * 2. Прокручивает страницу вверх при загрузке
 * 3. Анимирует появление контейнеров при скролле
 */

// Ждем полной загрузки DOM
document.addEventListener("DOMContentLoaded", function() {
  // 1. Отключаем автоматическое восстановление позиции скролла
  if (history.scrollRestoration) {
    history.scrollRestoration = "manual";
  }

  // 2. Прокрутка вверх при загрузке страницы
  window.onload = function() {
    window.scrollTo(0, 0);
  };

  // 3. Анимация контейнеров при скролле
  const containers = document.querySelectorAll(".containerL, .containerR");
  
  if (containers.length > 0 && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    containers.forEach(container => {
      observer.observe(container);
    });
  }
});