const menuButton = document.querySelector(".menu");
const navigationMenu = document.querySelector(".navigation-menu");

menuButton.addEventListener("click", () => {
  navigationMenu.showModal();
  menuButton.setAttribute("aria-expanded", "true");
});

navigationMenu.querySelector(".navigation-close").addEventListener("click", () => {
  navigationMenu.close();
});

navigationMenu.addEventListener("close", () => {
  menuButton.setAttribute("aria-expanded", "false");
});

// Close before the browser follows the section link and scrolls smoothly.
navigationMenu.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", () => {
    navigationMenu.close();
    const target = document.querySelector(link.hash);
    target.setAttribute("tabindex", "-1");
    target.focus({ preventScroll: true });
  });
});
