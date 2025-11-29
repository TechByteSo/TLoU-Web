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

  // Переменные состояния
  let currentCharacter = null;
  let currentImageIndex = 0;
  let isAnimating = false;

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

    const imageContainer = document.querySelector(".image-container");
    imageContainer.innerHTML = `
      <button class="nav-btn prev-btn">⬅</button>
      <div class="image-slider">
        <div class="slide-container">
          ${characterData.images
            .map(
              (img, index) =>
                `<img src="${img}" alt="${characterName}" class="modal-image ${
                  index === 0 ? "active" : ""
                }">`
            )
            .join("")}
        </div>
      </div>
      <button class="nav-btn next-btn">➡</button>
      <div class="image-counter">
        <span class="current-image">1</span>/<span class="total-images">${
          characterData.images.length
        }</span>
      </div>
    `;

    updateCounter();

    modalName.textContent = characterName;
    modalFullName.textContent = characterData.fullName;
    modalDescription.textContent = characterData.description;

    modal.style.display = "block";
    setTimeout(() => {
      modal.classList.add("show");
    }, 10);
    document.body.style.overflow = "hidden";

    // Назначение обработчиков кнопок
    document
      .querySelector(".prev-btn")
      .addEventListener("click", () => changeImage("prev"));
    document
      .querySelector(".next-btn")
      .addEventListener("click", () => changeImage("next"));

    initSlider();
  }

  // Функция инициализации слайдера
  function initSlider() {
    const slider = document.querySelector(".image-slider");
    const slideContainer = slider.querySelector(".slide-container");
    const slides = slideContainer.querySelectorAll(".modal-image");
    const slideWidth = slider.offsetWidth;

    slideContainer.style.width = `${slides.length * 100}%`;
    slides.forEach((slide) => {
      slide.style.width = `${slideWidth}px`;
    });
  }

  // Функция обновления счетчика
  function updateCounter() {
    const counter = document.querySelector(".image-counter");
    if (counter) {
      counter.querySelector(".current-image").textContent =
        currentImageIndex + 1;
      counter.querySelector(".total-images").textContent =
        currentCharacter.images.length;
    }
  }

  // Функция смены изображения
  function changeImage(direction) {
    if (!currentCharacter || isAnimating) return;
    isAnimating = true;

    const oldIndex = currentImageIndex;
    if (direction === "next") {
      currentImageIndex =
        (currentImageIndex + 1) % currentCharacter.images.length;
    } else {
      currentImageIndex =
        (currentImageIndex - 1 + currentCharacter.images.length) %
        currentCharacter.images.length;
    }

    const slider = document.querySelector(".image-slider");
    const slideContainer = slider.querySelector(".slide-container");
    const slideWidth = slider.offsetWidth;

    slideContainer.style.transition = "transform 0.5s ease";
    slideContainer.style.transform = `translateX(-${
      currentImageIndex * slideWidth
    }px)`;

    updateCounter();

    slideContainer.addEventListener("transitionend", function handler() {
      slideContainer.removeEventListener("transitionend", handler);
      isAnimating = false;
    });
  }

  // Функция закрытия модального окна
  function closeModal() {
    modal.classList.remove("show");
    setTimeout(() => {
      modal.style.display = "none";
    }, 300);
    document.body.style.overflow = "auto";
  }

  // Обработчики событий закрытия
  closeBtn.addEventListener("click", closeModal);

  window.addEventListener("click", function (event) {
    if (event.target === modal) {
      closeModal();
    }
  });

  document.addEventListener("keydown", function (event) {
    if (modal.style.display === "block" && !isAnimating) {
      if (event.key === "ArrowLeft") changeImage("prev");
      else if (event.key === "ArrowRight") changeImage("next");
      else if (event.key === "Escape") closeModal();
    }
  });
});
