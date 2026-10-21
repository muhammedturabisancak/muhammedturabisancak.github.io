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

  // ---------- Mobil menü: sağdan panel ----------
  // Açılış: hidden kalkar, sonra .is-open ile panel kayar. Kapanış: kayma bitince hidden.
  var menu = document.getElementById("site-menu");
  var panel = menu && menu.querySelector(".site-menu__panel");
  var menuOpeners = document.querySelectorAll("[data-menu-open]");
  var menuOpen = false;

  function hideWhenClosed() {
    if (parseFloat(getComputedStyle(panel).transitionDuration) === 0) {
      menu.hidden = true;
      return;
    }
    panel.addEventListener("transitionend", function onEnd(event) {
      if (event.target !== panel) return;
      panel.removeEventListener("transitionend", onEnd);
      if (!menuOpen) menu.hidden = true;
    });
  }

  function setMenu(open) {
    if (!menu || open === menuOpen) return;
    menuOpen = open;
    // Menü açıkken arkadaki sayfa klavye ve dokunuşa kapalı.
    document.querySelectorAll(".site-nav, main, .site-footer").forEach(function (el) {
      el.inert = open;
    });
    document.body.style.overflow = open ? "hidden" : "";
    menuOpeners.forEach(function (button) {
      button.setAttribute("aria-expanded", String(open));
    });
    if (open) {
      menu.hidden = false;
      void menu.offsetWidth; // kayma animasyonu için ilk durumu çizdir
      menu.classList.add("is-open");
      root.classList.add("menu-open");
      menu.querySelector(".site-menu__top [data-menu-close]").focus();
    } else {
      menu.classList.remove("is-open");
      root.classList.remove("menu-open");
      hideWhenClosed();
      if (menuOpeners[0]) menuOpeners[0].focus();
    }
  }

  menuOpeners.forEach(function (button) {
    button.addEventListener("click", function () {
      setMenu(true);
    });
  });
  document.querySelectorAll("[data-menu-close]").forEach(function (el) {
    el.addEventListener("click", function () {
      setMenu(false);
    });
  });
  // Aynı sayfadaki bir bölüme (ör. /#hakkimda) gidilirse menü kapanır.
  if (menu) {
    menu.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        setMenu(false);
      });
    });
  }
  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && menuOpen) setMenu(false);
  });
  // Masaüstü genişliğe geçilirse menü kapanır.
  window.matchMedia("(min-width: 721px)").addEventListener("change", function (event) {
    if (event.matches && menuOpen) setMenu(false);
  });

  // ---------- Uygulama filtreleri (FilterChip) ----------
  // Seçilen etiketi taşımayan [data-tags] öğeleri gizlenir; "Hepsi" (boş) hepsini gösterir.
  var filters = document.querySelectorAll("[data-filter]");
  filters.forEach(function (button) {
    button.addEventListener("click", function () {
      var tag = button.getAttribute("data-filter");
      filters.forEach(function (other) {
        other.setAttribute("aria-pressed", String(other === button));
      });
      document.querySelectorAll("[data-tags]").forEach(function (item) {
        var tags = item.getAttribute("data-tags").split(" ");
        item.hidden = tag !== "" && tags.indexOf(tag) === -1;
      });
    });
  });

  // ---------- Şu an verisi (now/data.json) ----------
  // Şu an sayfası ve ana sayfadaki widget aynı dosyadan okur. Dosya okunamazsa sayfadaki hazır metin kalır.
  var lang = root.lang === "en" ? "en" : "tr";
  var NOW_TEXT = {
    tr: { updated: "son güncelleme", kinds: { update: "Güncelleme", video: "Video", post: "Yazı" } },
    en: { updated: "updated", kinds: { update: "Update", video: "Video", post: "Post" } }
  }[lang];
  var APPS = {
    levh: { name: "Levh", icon: "/assets/img/levh-icon-192.png" },
    site: { name: lang === "en" ? "Site" : "Site", icon: "/assets/img/avatar-256.jpg" }
  };

  function el(tag, className, text) {
    var node = document.createElement(tag);
    if (className) node.className = className;
    if (text) node.textContent = text;
    return node;
  }

  function localized(item, key) {
    return (lang === "en" && item[key + "_en"]) || item[key];
  }

  function parseDay(value) {
    var parts = value.split("-");
    return new Date(Date.UTC(+parts[0], parts[1] - 1, +parts[2]));
  }

  function formatDay(date, options) {
    return new Intl.DateTimeFormat(lang === "en" ? "en-GB" : "tr-TR", Object.assign({ timeZone: "UTC" }, options)).format(date);
  }

  function percent(value) {
    return lang === "en" ? value + "%" : "%" + value;
  }

  function setText(selector, text) {
    document.querySelectorAll(selector).forEach(function (node) {
      node.textContent = text;
    });
  }

  function renderStatus(status) {
    setText("[data-now-title]", localized(status, "title"));
    setText("[data-now-percent]", percent(status.progress));
    setText("[data-now-meta]", percent(status.progress) + " · " + NOW_TEXT.updated + " " + formatDay(parseDay(status.updated), { day: "numeric", month: "long" }));
    document.querySelectorAll("[data-now-progress]").forEach(function (fill) {
      fill.style.setProperty("--value", status.progress + "%");
      fill.parentNode.setAttribute("aria-valuenow", status.progress);
    });
    var todo = document.querySelector("[data-now-todo]");
    if (!todo) return;
    todo.textContent = "";
    status.todo.forEach(function (item) {
      var li = el("li", item.done ? "is-done" : "", localized(item, "text"));
      todo.appendChild(li);
    });
  }

  function renderItem(item) {
    var li = el("li", "timeline-item timeline-item--" + item.kind);
    li.setAttribute("data-kind", item.kind);
    var card = el(item.url ? "a" : "div", "timeline-item__card");
    if (item.url) {
      card.href = item.url;
      card.rel = "noopener";
    }
    if (item.kind === "update") {
      var app = APPS[item.app] || APPS.site;
      var icon = el("img", "timeline-item__icon");
      icon.src = app.icon;
      icon.alt = "";
      icon.width = 52;
      icon.height = 52;
      icon.loading = "lazy";
      card.appendChild(icon);
    } else {
      var thumb = el("span", "timeline-item__thumb");
      var glow = el("span", "glow");
      glow.style.setProperty("--c", item.kind === "video" ? "var(--color-glow-a)" : "var(--color-glow-c)");
      thumb.appendChild(glow);
      card.appendChild(thumb);
    }
    var text = el("span", "timeline-item__text");
    var kind = NOW_TEXT.kinds[item.kind] + (item.kind === "update" ? " · " + (APPS[item.app] || APPS.site).name : "");
    text.appendChild(el("span", "timeline-item__kind", kind));
    text.appendChild(el("span", "timeline-item__title", localized(item, "title")));
    text.appendChild(el("span", "timeline-item__meta", item.kind === "update" ? localized(item, "text") : localized(item, "meta")));
    card.appendChild(text);
    li.appendChild(card);
    return li;
  }

  function renderTimeline(items) {
    var host = document.querySelector("[data-now-timeline]");
    if (!host) return;
    host.textContent = "";
    var sorted = items.slice().sort(function (a, b) {
      return a.date < b.date ? 1 : a.date > b.date ? -1 : 0;
    });
    var list;
    sorted.forEach(function (item, index) {
      if (index === 0 || item.date !== sorted[index - 1].date) {
        var date = parseDay(item.date);
        var head = el("h2", "timeline__date");
        head.appendChild(el("strong", "", formatDay(date, { day: "numeric", month: "long" })));
        head.appendChild(el("span", "", formatDay(date, { weekday: "long" })));
        list = el("ul", "timeline");
        host.appendChild(head);
        host.appendChild(list);
      }
      list.appendChild(renderItem(item));
    });
  }

  function filterTimeline(kind) {
    var host = document.querySelector("[data-now-timeline]");
    var visible = 0;
    host.querySelectorAll(".timeline").forEach(function (list) {
      var shown = 0;
      list.querySelectorAll(".timeline-item").forEach(function (item) {
        item.hidden = kind !== "" && item.getAttribute("data-kind") !== kind;
        if (!item.hidden) shown++;
      });
      list.hidden = shown === 0;
      list.previousElementSibling.hidden = shown === 0;
      visible += shown;
    });
    var empty = document.querySelector("[data-now-empty]");
    if (empty) empty.hidden = visible > 0;
  }

  var today = document.querySelector("[data-today]");
  if (today) {
    var parts = new Intl.DateTimeFormat(lang === "en" ? "en-GB" : "tr-TR", { timeZone: "Europe/Istanbul", weekday: "long", day: "numeric", month: "long" }).formatToParts(new Date());
    var pick = function (type) {
      return parts.filter(function (p) { return p.type === type; }).map(function (p) { return p.value; })[0];
    };
    today.textContent = pick("weekday") + ", " + pick("day") + " " + pick("month");
  }

  if (document.querySelector("[data-now], [data-now-title]")) {
    fetch("/now/data.json")
      .then(function (response) {
        return response.ok ? response.json() : null;
      })
      .then(function (data) {
        if (!data) return;
        renderStatus(data.status);
        renderTimeline(data.timeline);
      })
      .catch(function () {
        // Veri okunamazsa sayfadaki hazır metin kalır.
      });
  }

  var kindButtons = document.querySelectorAll("[data-kind]");
  kindButtons.forEach(function (button) {
    if (button.tagName !== "BUTTON") return;
    button.addEventListener("click", function () {
      kindButtons.forEach(function (other) {
        if (other.tagName === "BUTTON") other.setAttribute("aria-pressed", String(other === button));
      });
      filterTimeline(button.getAttribute("data-kind"));
    });
  });

  // ---------- Kopyala (ör. "Bana yaz" → e-posta adresi) ----------
  // Pano kullanılamazsa bağlantı normal çalışır (mailto).
  document.querySelectorAll("[data-copy]").forEach(function (el) {
    var label = el.textContent;
    var timer;
    el.addEventListener("click", function (event) {
      if (!navigator.clipboard) return;
      event.preventDefault();
      navigator.clipboard.writeText(el.getAttribute("data-copy")).then(function () {
        el.textContent = el.getAttribute("data-copied") || label;
        clearTimeout(timer);
        timer = setTimeout(function () {
          el.textContent = label;
        }, 2000);
      }, function () {
        if (el.href) window.location.href = el.href;
      });
    });
  });
})();
