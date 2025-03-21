document.addEventListener("DOMContentLoaded", function () {
  // Отключаем восстановление позиции скролла браузером
  if (history.scrollRestoration) {
    history.scrollRestoration = "manual";
  }
  // Прокручиваем страницу вверх при загрузке
  window.onload = function () {
    window.scrollTo(0, 0);
  };
  const containers = document.querySelectorAll(".containerL, .containerR");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target); // Отключение наблюдения после появления
        }
      });
    },
    {
      threshold: 0.1, // Настройка порога видимости
    }
  );

  containers.forEach((container) => {
    observer.observe(container);
  });
});
