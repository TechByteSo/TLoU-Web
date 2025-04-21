// Данные персонажей
const charactersData = {
  "Джоэл": {
      images: [
          "/images/characters/Joel1.png",
          "/images/characters/Joel2.png",
          "/images/characters/Joel3.png",
          "/images/characters/Joel4.png",
          "/images/characters/Joel5.png"
      ],
      fullName: "Джоэл Миллер",
      description: "Суровый и закалённый в жестоком мире после пандемии, Джоэл давно усвоил простое правило: доверять нельзя никому. За его грубой оболочкой скрывается человек, переживший слишком много потерь, из-за чего он предпочитает держать дистанцию. Однако за цинизмом и холодной расчётливостью прячется способность к глубокой привязанности — просто он уже не верит, что это того стоит."
  },
  "Элли": {
      images: [
          "/images/characters/Ellie1.png",
          "/images/characters/Ellie2.png",
          "/images/characters/Ellie3.png",
          "/images/characters/Ellie4.png"
      ],
      fullName: "Элли Уильямс",
      description: "Острая на язык, дерзкая и невероятно сообразительная, Элли выросла в мире, где слабые не выживают. Её юмор и сарказм — броня против жестокости реальности, но за этим скрывается любопытство и даже наивность, которые она тщательно маскирует. Она не боится спорить, бунтовать и идти против правил, но в глубине души остаётся ребёнком, который ищет своё место в этом мрачном мире."
  },
  "Томми": {
      images: [
          "/images/characters/Tommy1.png",
          "/images/characters/Tommy2.png"
      ],
      fullName: "Томми Миллер",
      description: "Более мягкий и открытый, чем Джоэл, Томми не растерял веру в людей, несмотря на все ужасы, которые им пришлось пережить. Он старается видеть в других лучшее и верит, что сообщество и взаимовыручка — единственный способ не просто выжить, но и начать жить снова. Его харизма и умение находить общий язык с разными людьми делают его тем, за кем другие готовы идти."
  }
};

document.addEventListener("DOMContentLoaded", function() {
  // Получаем элементы DOM
  const modal = document.getElementById("characterModal");
  const modalImage = document.getElementById("modalCharacterImage");
  const modalName = document.getElementById("modalCharacterName");
  const modalFullName = document.getElementById("modalCharacterFullName");
  const modalDescription = document.getElementById("modalCharacterDescription");
  const closeBtn = document.querySelector(".close");
  const characterCards = document.querySelectorAll(".character-card");
  const prevBtn = document.querySelector(".prev-btn");
  const nextBtn = document.querySelector(".next-btn");
  const currentImageSpan = document.getElementById("currentImage");
  const totalImagesSpan = document.getElementById("totalImages");

  let currentCharacter = null;
  let currentImageIndex = 0;

  // Функция открытия модального окна
  function openModal(characterData, characterName) {
      currentCharacter = characterData;
      currentImageIndex = 0;
      
      updateImage();
      modalName.textContent = characterName;
      modalFullName.textContent = characterData.fullName;
      modalDescription.textContent = characterData.description;
      totalImagesSpan.textContent = characterData.images.length;
      
      modal.style.display = "block";
      setTimeout(() => {
          modal.classList.add("show");
      }, 10);
      document.body.style.overflow = "hidden";
  }

  // Функция обновления изображения
  function updateImage() {
      modalImage.classList.add("fade");
      setTimeout(() => {
          modalImage.src = currentCharacter.images[currentImageIndex];
          currentImageSpan.textContent = currentImageIndex + 1;
          modalImage.classList.remove("fade");
      }, 150);
  }

  // Функция закрытия модального окна
  function closeModal() {
      modal.classList.remove("show");
      setTimeout(() => {
          modal.style.display = "none";
      }, 300);
      document.body.style.overflow = "auto";
  }

  // Переключение изображений
  function changeImage(direction) {
      if (!currentCharacter) return;
      
      if (direction === 'next') {
          currentImageIndex = (currentImageIndex + 1) % currentCharacter.images.length;
      } else {
          currentImageIndex = (currentImageIndex - 1 + currentCharacter.images.length) % currentCharacter.images.length;
      }
      
      updateImage();
  }

  // Обработчики событий
  characterCards.forEach(card => {
      card.addEventListener("click", function() {
          const characterName = this.querySelector(".character-name").textContent.trim();
          const characterData = charactersData[characterName];
          if (characterData) openModal(characterData, characterName);
      });
  });

  closeBtn.addEventListener("click", closeModal);
  prevBtn.addEventListener("click", () => changeImage('prev'));
  nextBtn.addEventListener("click", () => changeImage('next'));
  
  window.addEventListener("click", function(event) {
      if (event.target === modal) {
          closeModal();
      }
  });

  // Переключение по клавиатуре
  document.addEventListener("keydown", function(event) {
      if (modal.style.display === "block") {
          if (event.key === "ArrowLeft") {
              changeImage('prev');
          } else if (event.key === "ArrowRight") {
              changeImage('next');
          } else if (event.key === "Escape") {
              closeModal();
          }
      }
  });
});