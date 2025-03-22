const scrollToTopBtn = document.getElementById("scrollToTopBtn");

// Функция для проверки видимости кнопки
function toggleScrollToTopButton() {
    if (document.body.scrollTop > 600|| document.documentElement.scrollTop > 600) {
        scrollToTopBtn.style.display = "flex";
    } else {
        scrollToTopBtn.style.display = "none";
    }
}

// Проверяем видимость кнопки при загрузке страницы
toggleScrollToTopButton();

// Проверяем видимость кнопки при скролле
window.onscroll = toggleScrollToTopButton;

// Плавная прокрутка вверх
scrollToTopBtn.addEventListener("click", function() {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});