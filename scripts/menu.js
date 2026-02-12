/**
 * Активный пункт меню и открытие/закрытие бургер-меню
 */
document.addEventListener("DOMContentLoaded", function () {
  const currentPage = window.location.pathname.split("/").pop() || "index.html";
  const menuLinks = document.querySelectorAll(".mainMenu a[href]");
  const burgerBtn = document.querySelector(".burger-btn");
  const nav = document.querySelector(".mainMenu");
  const overlay = document.querySelector(".burger-overlay");

  // Активная страница
  menuLinks.forEach(function (link) {
    const href = link.getAttribute("href");
    if (href === currentPage || (currentPage === "" && href === "index.html")) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });

  function openBurger() {
    if (!burgerBtn || !nav) return;
    burgerBtn.classList.add("is-open");
    burgerBtn.setAttribute("aria-expanded", "true");
    nav.classList.add("is-open");
    if (overlay) overlay.classList.add("is-open");
    document.body.style.overflow = "hidden";
  }

  function closeBurger() {
    if (!burgerBtn || !nav) return;
    burgerBtn.classList.remove("is-open");
    burgerBtn.setAttribute("aria-expanded", "false");
    nav.classList.remove("is-open");
    if (overlay) overlay.classList.remove("is-open");
    document.body.style.overflow = "";
  }

  if (burgerBtn && nav) {
    burgerBtn.addEventListener("click", function () {
      if (burgerBtn.classList.contains("is-open")) {
        closeBurger();
      } else {
        openBurger();
      }
    });

    if (overlay) {
      overlay.addEventListener("click", closeBurger);
    }

    // Закрытие по клику/тапу в любом месте вне меню (в т.ч. левая затемнённая область)
    document.addEventListener("click", function (e) {
      if (!nav.classList.contains("is-open")) return;
      if (nav.contains(e.target) || (burgerBtn && burgerBtn.contains(e.target))) return;
      closeBurger();
    });

    menuLinks.forEach(function (link) {
      link.addEventListener("click", closeBurger);
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && nav.classList.contains("is-open")) {
        closeBurger();
      }
    });
  }
});
