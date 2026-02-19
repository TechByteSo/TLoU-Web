/**
 * Плавные переходы между страницами
 */
document.addEventListener("DOMContentLoaded", function() {
  // Добавляем класс для плавного появления страницы
  document.body.classList.add('page-loaded');
  
  // Обработка переходов при клике на ссылки
  const links = document.querySelectorAll('a[href]:not([href^="#"]):not([href^="http"]):not([href^="//"])');
  
  links.forEach(link => {
    link.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      
      // Пропускаем внешние ссылки и якоря
      if (!href || href.startsWith('#') || href.startsWith('http') || href.startsWith('//')) {
        return;
      }
      
      // Добавляем класс для анимации выхода
      document.body.classList.add('page-exiting');
      
      // Небольшая задержка для анимации перед переходом
      setTimeout(() => {
        window.location.href = href;
      }, 200);
    });
  });
});
