// Данные персонажей
const charactersData = {
    "Джоэл": {
        image: "/images/characters/Joel1.png",
        description: "Суровый и закалённый в жестоком мире после пандемии, Джоэл давно усвоил простое правило: доверять нельзя никому. За его грубой оболочкой скрывается человек, переживший слишком много потерь, из-за чего он предпочитает держать дистанцию. Однако за цинизмом и холодной расчётливостью прячется способность к глубокой привязанности — просто он уже не верит, что это того стоит."
    },
    "Элли": {
        image: "/images/characters/Ellie1.png",
        description: "Острая на язык, дерзкая и невероятно сообразительная, Элли выросла в мире, где слабые не выживают. Её юмор и сарказм — броня против жестокости реальности, но за этим скрывается любопытство и даже наивность, которые она тщательно маскирует. Она не боится спорить, бунтовать и идти против правил, но в глубине души остаётся ребёнком, который ищет своё место в этом мрачном мире."
    },
    "Томми": {
        image: "/images/characters/Tommy1.png",
        description: "Более мягкий и открытый, чем Джоэл, Томми не растерял веру в людей, несмотря на все ужасы, которые им пришлось пережить. Он старается видеть в других лучшее и верит, что сообщество и взаимовыручка — единственный способ не просто выжить, но и начать жить снова. Его харизма и умение находить общий язык с разными людьми делают его тем, за кем другие готовы идти."
    }
};

document.addEventListener("DOMContentLoaded", function() {
    // Получаем элементы DOM
    const modal = document.getElementById("characterModal");
    const modalImage = document.getElementById("modalCharacterImage");
    const modalName = document.getElementById("modalCharacterName");
    const modalDescription = document.getElementById("modalCharacterDescription");
    const closeBtn = document.querySelector(".close");
    const characterCards = document.querySelectorAll(".character-card");

    // Функция открытия модального окна
    const openModal = (characterData, characterName) => {
        modalImage.src = characterData.image;
        modalImage.alt = characterName;
        modalName.textContent = characterName;
        modalDescription.textContent = characterData.description;
        
        modal.style.display = "block";
        setTimeout(() => {
            modal.classList.add("show");
        }, 10);
        document.body.style.overflow = "hidden";
    };

    // Функция закрытия модального окна
    const closeModal = () => {
        modal.classList.remove("show");
        setTimeout(() => {
            modal.style.display = "none";
        }, 300);
        document.body.style.overflow = "auto";
    };

    // Обработчики для карточек персонажей
    characterCards.forEach(card => {
        card.addEventListener("click", function() {
            const characterName = this.querySelector(".character-name").textContent.trim();
            const characterData = charactersData[characterName];
            
            if (characterData) {
                openModal(characterData, characterName);
            }
        });
    });

    // Обработчики закрытия
    closeBtn.addEventListener("click", closeModal);
    window.addEventListener("click", (event) => {
        if (event.target === modal) {
            closeModal();
        }
    });
});