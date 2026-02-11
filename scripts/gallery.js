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
  const downloadBtn = document.querySelector(".download-btn");
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
      img.style.width = 'auto';
      img.style.height = 'auto';
      img.style.maxWidth = '100%';
      img.style.maxHeight = '80vh';
      img.style.objectFit = 'contain';
      img.style.display = 'block';
      
      picture.appendChild(source);
      picture.appendChild(img);
      sliderContainer.appendChild(picture);
      modalImages.push({ picture, img });
    });
    
    // Показываем первое изображение
    updateSlider();
  }

  // 3. Функция открытия модального окна
  function openModal(index) {
    if (index < 0 || index >= screenshots.length) return;
    
    currentIndex = index;
    
    // Инициализируем слайдер если еще не инициализирован
    if (modalImages.length === 0) {
      initSlider();
    } else {
      updateSlider();
    }
    
    modal.style.display = "block";
    document.body.style.overflow = "hidden";
  }

  // 4. Обновление состояния слайдера
  function updateSlider() {
    const pictures = sliderContainer.querySelectorAll('picture');
    if (pictures.length === 0) return;
    
    pictures.forEach((picture, index) => {
      if (index === currentIndex) {
        picture.classList.add('active');
        picture.style.opacity = '1';
        picture.style.visibility = 'visible';
        picture.style.zIndex = '1';
      } else {
        picture.classList.remove('active');
        picture.style.opacity = '0';
        picture.style.visibility = 'hidden';
        picture.style.zIndex = '0';
      }
    });
    
    if (currentSpan) {
      currentSpan.textContent = currentIndex + 1;
    }
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

  // 8. Функция скачивания изображения
  function downloadImage() {
    const activePicture = sliderContainer.querySelector('picture.active');
    if (!activePicture) return;
    
    const img = activePicture.querySelector('img');
    if (!img) return;
    
    // Получаем URL изображения (приоритет WebP, fallback PNG)
    const source = activePicture.querySelector('source');
    let imageUrl = source ? source.srcset : img.src;
    
    // Определяем расширение файла
    const isWebP = imageUrl.includes('.webp');
    const extension = isWebP ? 'webp' : 'png';
    const fileName = `screenshot-${currentIndex + 1}.${extension}`;
    
    // Если изображение уже загружено, используем canvas для гарантированного скачивания
    if (img.complete && img.naturalWidth > 0) {
      try {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        canvas.width = img.naturalWidth;
        canvas.height = img.naturalHeight;
        ctx.drawImage(img, 0, 0);
        
        canvas.toBlob((blob) => {
          if (blob) {
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = fileName;
            link.style.display = 'none';
            document.body.appendChild(link);
            link.click();
            setTimeout(() => {
              document.body.removeChild(link);
              window.URL.revokeObjectURL(url);
            }, 100);
          } else {
            // Fallback на прямую ссылку
            downloadDirectLink(imageUrl, fileName);
          }
        }, `image/${extension}`, 1.0);
      } catch (error) {
        console.error('Ошибка при создании canvas:', error);
        downloadDirectLink(imageUrl, fileName);
      }
    } else {
      // Если изображение еще не загружено, используем fetch
      fetch(imageUrl)
        .then(response => {
          if (!response.ok) throw new Error('Network response was not ok');
          return response.blob();
        })
        .then(blob => {
          const url = window.URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.href = url;
          link.download = fileName;
          link.style.display = 'none';
          document.body.appendChild(link);
          link.click();
          setTimeout(() => {
            document.body.removeChild(link);
            window.URL.revokeObjectURL(url);
          }, 100);
        })
        .catch(error => {
          console.error('Ошибка при скачивании через fetch:', error);
          downloadDirectLink(imageUrl, fileName);
        });
    }
  }
  
  // Вспомогательная функция для прямого скачивания
  function downloadDirectLink(imageUrl, fileName) {
    const link = document.createElement('a');
    link.href = imageUrl;
    link.download = fileName;
    link.style.display = 'none';
    document.body.appendChild(link);
    link.click();
    setTimeout(() => {
      document.body.removeChild(link);
    }, 100);
  }

  // Обработчик кнопки скачивания
  if (downloadBtn) {
    downloadBtn.addEventListener("click", downloadImage);
  }

  // 9. Закрытие модального окна
  closeBtn.addEventListener("click", function() {
    modal.style.display = "none";
    document.body.style.overflow = "auto";
  });

  // 10. Закрытие по клику вне изображения
  window.addEventListener("click", function(e) {
    if (e.target === modal) {
      modal.style.display = "none";
      document.body.style.overflow = "auto";
    }
  });

  // 11. Навигация с клавиатуры
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

  // 12. Простая анимация появления карточек
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

  // 13. Инициализация
  totalSpan.textContent = screenshots.length;
  
  // Анимация появления контейнера галереи
  const galleryContainer = document.querySelector('.gallery-container');
  if (galleryContainer) {
    setTimeout(() => {
      galleryContainer.classList.add('visible');
    }, 100);
  }
  
  // Анимация заголовка
  const galleryIntro = document.querySelector('.gallery-intro');
  if (galleryIntro) {
    galleryIntro.classList.add('visible');
  }
  
  window.scrollTo(0, 0);
});