// Sitenin tek betiği. Global değişken yok.
(function () {
  "use strict";

  // ---------- Tema: Sistem → Koyu → Açık ----------
  // Seçim localStorage'da "theme" ("dark" | "light"); yoksa sistem.
  // İlk boyama için aynı okuma <head> içindeki satır içi betikte de var.
  var THEME_KEY = "theme";
  var MODES = ["system", "dark", "light"];
  var LABELS = {
    tr: { system: "Tema: sistem", dark: "Tema: koyu", light: "Tema: açık" },
    en: { system: "Theme: system", dark: "Theme: dark", light: "Theme: light" }
  };
  var root = document.documentElement;
  var labels = LABELS[root.lang === "en" ? "en" : "tr"];

  function readTheme() {
    try {
      var saved = localStorage.getItem(THEME_KEY);
      return saved === "dark" || saved === "light" ? saved : "system";
    } catch (e) {
      return "system";
    }
  }

  var current = readTheme();

  function applyTheme(mode) {
    current = mode;
    if (mode === "system") {
      root.removeAttribute("data-theme");
    } else {
      root.setAttribute("data-theme", mode);
    }
    try {
      if (mode === "system") {
        localStorage.removeItem(THEME_KEY);
      } else {
        localStorage.setItem(THEME_KEY, mode);
      }
    } catch (e) {
      // Depolama kapalıysa seçim yalnız bu sayfada geçerli kalır.
    }
    document.querySelectorAll("[data-theme-toggle]").forEach(function (button) {
      button.setAttribute("data-mode", mode);
      button.setAttribute("aria-label", labels[mode]);
      button.title = labels[mode];
    });
  }

  document.querySelectorAll("[data-theme-toggle]").forEach(function (button) {
    button.addEventListener("click", function () {
      applyTheme(MODES[(MODES.indexOf(current) + 1) % MODES.length]);
    });
  });
  applyTheme(current);

  // ---------- Mobil menü ----------
  var menu = document.getElementById("site-menu");
  var menuOpeners = document.querySelectorAll("[data-menu-open]");

  function setMenu(open) {
    if (!menu) return;
    menu.hidden = !open;
    document.body.style.overflow = open ? "hidden" : "";
    menuOpeners.forEach(function (button) {
      button.setAttribute("aria-expanded", String(open));
    });
    if (open) {
      menu.querySelector("[data-menu-close]").focus();
    } else if (menuOpeners[0]) {
      menuOpeners[0].focus();
    }
  }

  menuOpeners.forEach(function (button) {
    button.addEventListener("click", function () {
      setMenu(true);
    });
  });
  document.querySelectorAll("[data-menu-close]").forEach(function (button) {
    button.addEventListener("click", function () {
      setMenu(false);
    });
  });
  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && menu && !menu.hidden) setMenu(false);
  });
  // Masaüstü genişliğe geçilirse menü kapanır.
  window.matchMedia("(min-width: 721px)").addEventListener("change", function (event) {
    if (event.matches && menu && !menu.hidden) setMenu(false);
  });
})();
