// Ждем полной загрузки DOM-дерева перед выполнением кода
document.addEventListener("DOMContentLoaded", function () {
  // Отключаем автоматическое восстановление позиции скролла браузером
  if (history.scrollRestoration) {
    history.scrollRestoration = "manual"; // Устанавливаем ручное управление скроллом
  }

  // Прокручиваем страницу вверх при полной загрузке страницы
  window.onload = function () {
    window.scrollTo(0, 0); // Позиция X=0, Y=0 (левый верхний угол)
  };

  // Находим все контейнеры с классами containerL и containerR
  const containers = document.querySelectorAll(".containerL, .containerR");

  // Создаем Intersection Observer для отслеживания появления элементов в viewport
  const observer = new IntersectionObserver(
    (entries) => {
      // Для каждого наблюдаемого элемента
      entries.forEach((entry) => {
        // Если элемент стал видимым
        if (entry.isIntersecting) {
          entry.target.classList.add("visible"); // Добавляем класс для анимации
          observer.unobserve(entry.target); // Прекращаем наблюдение за элементом
        }
      });
    },
    {
      threshold: 0.1, // Элемент считается видимым, когда 10% его площади в viewport
    }
  );

  // Начинаем наблюдение за каждым контейнером
  containers.forEach((container) => {
    observer.observe(container);
  });
});