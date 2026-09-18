/**
 * THEME CONTROLLER
 * Seamless Light / Dark mode switcher with persistent storage and system sync.
 */

(function () {
  const THEME_STORAGE_KEY = "editorial_portfolio_theme";
  const htmlElement = document.documentElement;

  function getPreferredTheme() {
    const savedTheme = localStorage.getItem(THEME_STORAGE_KEY);
    if (savedTheme === "dark" || savedTheme === "light") {
      return savedTheme;
    }
    // Default to clean light warm editorial
    return window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  }

  function applyTheme(theme) {
    if (theme === "dark") {
      htmlElement.setAttribute("data-theme", "dark");
    } else {
      htmlElement.removeAttribute("data-theme");
    }
    localStorage.setItem(THEME_STORAGE_KEY, theme);
    updateToggleButtons(theme);
  }

  function updateToggleButtons(theme) {
    const toggleBtns = document.querySelectorAll(".theme-toggle-btn");
    toggleBtns.forEach((btn) => {
      btn.setAttribute(
        "aria-label",
        theme === "dark" ? "Switch to light theme" : "Switch to dark theme"
      );
      btn.setAttribute("title", theme === "dark" ? "Switch to light theme" : "Switch to dark theme");
    });
  }

  // Initial apply before page render to prevent flash of incorrect theme
  const initialTheme = getPreferredTheme();
  applyTheme(initialTheme);

  document.addEventListener("DOMContentLoaded", () => {
    updateToggleButtons(getPreferredTheme());

    const toggleBtns = document.querySelectorAll(".theme-toggle-btn");
    toggleBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        const currentTheme = htmlElement.getAttribute("data-theme") === "dark" ? "dark" : "light";
        const newTheme = currentTheme === "dark" ? "light" : "dark";
        applyTheme(newTheme);
      });
    });

    // Listen for OS preference changes if user has not explicitly chosen
    if (window.matchMedia) {
      window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", (e) => {
        if (!localStorage.getItem(THEME_STORAGE_KEY)) {
          applyTheme(e.matches ? "dark" : "light");
        }
      });
    }
  });
})();
