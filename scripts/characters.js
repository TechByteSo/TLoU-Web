/**
 * Модуль работы с персонажами
 *
 * 1. Управление карточками персонажей
 * 2. Работа с модальным окном
 * 3. Слайдер изображений
 */

// Данные персонажей
const charactersData = {
  Джоэл: {
    images: [
      "images/characters/Webp/Joel1.webp",
      "images/characters/Webp/Joel2.webp",
      "images/characters/Webp/Joel3.webp",
      "images/characters/Webp/Joel4.webp",
      "images/characters/Webp/Joel5.webp",
    ],
    fullName: "Джоэл Миллер",
    description:
      "Суровый и закалённый в жестоком мире после пандемии, Джоэл давно усвоил простое правило: доверять нельзя никому. За его грубой оболочкой скрывается человек, переживший слишком много потерь, из-за чего он предпочитает держать дистанцию. Однако за цинизмом и холодной расчётливостью прячется способность к глубокой привязанности — просто он уже не верит, что это того стоит.",
  },
  Элли: {
    images: [
      "images/characters/Webp/Ellie1.webp",
      "images/characters/Webp/Ellie2.webp",
      "images/characters/Webp/Ellie3.webp",
      "images/characters/Webp/Ellie4.webp",
    ],
    fullName: "Элли Уильямс",
    description:
      "Острая на язык, дерзкая и невероятно сообразительная, Элли выросла в мире, где слабые не выживают. Её юмор и сарказм — броня против жестокости реальности, но за этим скрывается любопытство и даже наивность, которые она тщательно маскирует. Она не боится спорить, бунтовать и идти против правил, но в глубине души остаётся ребёнком, который ищет своё место в этом мрачном мире.",
  },
  Томми: {
    images: ["images/characters/Webp/Tommy1.webp", "images/characters/Webp/Tommy2.webp"],
    fullName: "Томми Миллер",
    description:
      "Более мягкий и открытый, чем Джоэл, Томми не растерял веру в людей, несмотря на все ужасы, которые им пришлось пережить. Он старается видеть в других лучшее и верит, что сообщество и взаимовыручка — единственный способ не просто выжить, но и начать жить снова. Его харизма и умение находить общий язык с разными людьми делают его тем, за кем другие готовы идти.",
  },
};

// Основная функция инициализации
document.addEventListener("DOMContentLoaded", function () {
  // Элементы модального окна
  const modal = document.getElementById("characterModal");
  const modalName = document.getElementById("modalCharacterName");
  const modalFullName = document.getElementById("modalCharacterFullName");
  const modalDescription = document.getElementById("modalCharacterDescription");
  const closeBtn = document.querySelector(".close");
  const characterCards = document.querySelectorAll(".character-card");
  const imageContainer = document.querySelector(".image-container");

  // Проверка существования элементов
  if (!modal || !modalName || !modalFullName || !modalDescription || !closeBtn || characterCards.length === 0 || !imageContainer) {
    return;
  }

  // Переменные состояния
  let currentCharacter = null;
  let currentImageIndex = 0;
  let isAnimating = false;
  let sliderInitialized = false;
  let prevBtnHandler = null;
  let nextBtnHandler = null;

  // Инициализация анимации карточек
  initCardsAnimation();

  // Обработчики событий карточек
  characterCards.forEach((card) => {
    card.addEventListener("click", function () {
      const characterName =
        this.querySelector(".character-name").textContent.trim();
      if (charactersData[characterName]) {
        openModal(charactersData[characterName], characterName);
      }
    });
  });

  // Функция инициализации анимации карточек
  function initCardsAnimation() {
    window.onload = function () {
      window.scrollTo(0, 0);
    };

    const cardsObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");

            const cards = entry.target.querySelectorAll(".character-card");
            cards.forEach((card, index) => {
              setTimeout(() => {
                card.style.opacity = "1";
                card.style.transform = "translateY(0)";
              }, 150 * index);
            });

            cardsObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    const cardsContainer = document.querySelector(".characters-container");
    if (cardsContainer) {
      document.querySelectorAll(".character-card").forEach((card) => {
        card.style.opacity = "0";
        card.style.transform = "translateY(20px)";
        card.style.transition = "opacity 0.5s ease, transform 0.5s ease";
      });

      cardsObserver.observe(cardsContainer);
    }
  }

  // Функция открытия модального окна
  function openModal(characterData, characterName) {
    currentCharacter = characterData;
    currentImageIndex = 0;
    sliderInitialized = false;

    // Удаляем старые обработчики если они есть
    if (prevBtnHandler) {
      const oldPrevBtn = document.querySelector(".prev-btn");
      if (oldPrevBtn) {
        oldPrevBtn.removeEventListener("click", prevBtnHandler);
      }
    }
    if (nextBtnHandler) {
      const oldNextBtn = document.querySelector(".next-btn");
      if (oldNextBtn) {
        oldNextBtn.removeEventListener("click", nextBtnHandler);
      }
    }

    // Создаем структуру слайдера
    imageContainer.innerHTML = `
      <button class="nav-btn prev-btn" aria-label="Предыдущее изображение">⬅</button>
      <div class="image-slider">
        <div class="slide-container">
          ${characterData.images
            .map(
              (img, index) => {
                const fallbackSrc = img.replace('/Webp/', '/fallback/').replace('.webp', '.png');
                return `<picture data-index="${index}" class="slide-picture">
                  <source srcset="${img}" type="image/webp">
                  <img src="${fallbackSrc}" alt="${characterName}" class="modal-image">
                </picture>`;
              }
            )
            .join("")}
        </div>
      </div>
      <button class="nav-btn next-btn" aria-label="Следующее изображение">➡</button>
      <div class="image-counter">
        <span class="current-image">1</span>/<span class="total-images">${
          characterData.images.length
        }</span>
      </div>
    `;

    // Обновляем текст
    modalName.textContent = characterName;
    modalFullName.textContent = characterData.fullName;
    modalDescription.textContent = characterData.description;

    // Показываем модальное окно
    modal.style.display = "block";
    document.body.style.overflow = "hidden";
    
    setTimeout(() => {
      modal.classList.add("show");
    }, 10);

    // Добавляем обработчики ошибок загрузки изображений
    const pictures = imageContainer.querySelectorAll('.slide-picture');
    pictures.forEach((picture, index) => {
      const img = picture.querySelector('img');
      if (img) {
        img.addEventListener('error', function() {
          console.error(`Ошибка загрузки изображения ${index + 1} для ${characterName}:`, this.src);
          // Пытаемся загрузить fallback напрямую
          const fallbackSrc = characterData.images[index].replace('/Webp/', '/fallback/').replace('.webp', '.png');
          if (!this.src.includes('fallback')) {
            this.src = fallbackSrc;
          }
        });
      }
    });

    // Инициализируем слайдер после небольшой задержки для рендеринга DOM
    requestAnimationFrame(() => {
      setTimeout(() => {
        initSlider();
        setupEventHandlers();
      }, 50);
    });
  }

  // Функция инициализации слайдера
  function initSlider() {
    const slider = document.querySelector(".image-slider");
    const slideContainer = document.querySelector(".slide-container");
    
    if (!slider || !slideContainer) {
      console.error("Элементы слайдера не найдены");
      return;
    }

    const slides = slideContainer.querySelectorAll(".slide-picture");
    if (slides.length === 0) {
      console.error("Слайды не найдены");
      return;
    }

    // Получаем ширину слайдера
    const sliderWidth = slider.offsetWidth || slider.clientWidth;
    
    if (sliderWidth === 0) {
      // Если размер еще не определен, повторяем попытку
      setTimeout(() => initSlider(), 100);
      return;
    }

    // Устанавливаем стили для контейнера слайдов
    slideContainer.style.display = 'flex';
    slideContainer.style.width = `${slides.length * sliderWidth}px`;
    slideContainer.style.height = '100%';
    slideContainer.style.transform = `translateX(0)`;

    // Устанавливаем стили для каждого слайда
    slides.forEach((slide, index) => {
      slide.style.width = `${sliderWidth}px`;
      slide.style.minWidth = `${sliderWidth}px`;
      slide.style.maxWidth = `${sliderWidth}px`;
      slide.style.height = '100%';
      slide.style.flexShrink = '0';
      slide.style.flexBasis = `${sliderWidth}px`;
      slide.style.display = 'block';
      slide.style.position = 'relative';
      slide.style.overflow = 'hidden';
      
      // Устанавливаем стили для изображения внутри слайда
      const img = slide.querySelector('.modal-image');
      if (img) {
        img.style.width = '100%';
        img.style.height = '100%';
        img.style.objectFit = 'cover';
        img.style.display = 'block';
      }
    });

    // Устанавливаем начальную позицию
    currentImageIndex = 0;
    updateSliderPosition();
    updateCounter();
    
    sliderInitialized = true;
  }

  // Функция обновления позиции слайдера
  function updateSliderPosition() {
    const slider = document.querySelector(".image-slider");
    const slideContainer = document.querySelector(".slide-container");
    
    if (!slider || !slideContainer) return;
    
    const sliderWidth = slider.offsetWidth || slider.clientWidth;
    if (sliderWidth === 0) return;
    
    slideContainer.style.transition = "transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)";
    slideContainer.style.transform = `translateX(-${currentImageIndex * sliderWidth}px)`;
  }

  // Функция обновления счетчика
  function updateCounter() {
    const counter = document.querySelector(".image-counter");
    if (counter && currentCharacter) {
      const currentSpan = counter.querySelector(".current-image");
      const totalSpan = counter.querySelector(".total-images");
      if (currentSpan) {
        currentSpan.textContent = currentImageIndex + 1;
      }
      if (totalSpan) {
        totalSpan.textContent = currentCharacter.images.length;
      }
    }
  }

  // Функция настройки обработчиков событий
  function setupEventHandlers() {
    const prevBtn = document.querySelector(".prev-btn");
    const nextBtn = document.querySelector(".next-btn");
    
    if (prevBtn) {
      prevBtnHandler = () => changeImage("prev");
      prevBtn.addEventListener("click", prevBtnHandler);
    }
    
    if (nextBtn) {
      nextBtnHandler = () => changeImage("next");
      nextBtn.addEventListener("click", nextBtnHandler);
    }
  }

  // Функция смены изображения
  function changeImage(direction) {
    if (!currentCharacter || isAnimating || !sliderInitialized) return;
    
    isAnimating = true;

    // Изменяем индекс
    if (direction === "next") {
      currentImageIndex = (currentImageIndex + 1) % currentCharacter.images.length;
    } else {
      currentImageIndex = (currentImageIndex - 1 + currentCharacter.images.length) % currentCharacter.images.length;
    }

    // Обновляем позицию и счетчик
    updateSliderPosition();
    updateCounter();

    // Сбрасываем флаг анимации после завершения перехода
    const slideContainer = document.querySelector(".slide-container");
    if (slideContainer) {
      const handleTransitionEnd = () => {
        slideContainer.removeEventListener("transitionend", handleTransitionEnd);
        isAnimating = false;
      };
      slideContainer.addEventListener("transitionend", handleTransitionEnd, { once: true });
    } else {
      isAnimating = false;
    }
  }

  // Функция закрытия модального окна
  function closeModal() {
    modal.classList.remove("show");
    setTimeout(() => {
      modal.style.display = "none";
      document.body.style.overflow = "auto";
      // Очищаем содержимое слайдера
      if (imageContainer) {
        imageContainer.innerHTML = '';
      }
      sliderInitialized = false;
    }, 300);
  }

  // Обработчики событий закрытия
  closeBtn.addEventListener("click", closeModal);

  window.addEventListener("click", function (event) {
    if (event.target === modal) {
      closeModal();
    }
  });

  document.addEventListener("keydown", function (event) {
    if (modal.style.display === "block" && !isAnimating && sliderInitialized) {
      if (event.key === "ArrowLeft") {
        changeImage("prev");
      } else if (event.key === "ArrowRight") {
        changeImage("next");
      } else if (event.key === "Escape") {
        closeModal();
      }
    }
  });

  // Обработчик изменения размера окна для пересчета ширины слайдов
  let resizeTimeout;
  window.addEventListener("resize", function() {
    if (modal.style.display === "block" && sliderInitialized) {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        initSlider();
        updateSliderPosition();
      }, 150);
    }
  });
});
