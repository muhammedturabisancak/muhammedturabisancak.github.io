// Sitenin tek betiği. Global değişken yok.
(function () {
  "use strict";

  // ---------- Tema: Koyu ↔ Açık ----------
  // Düğme, görünen temanın tersine tek tıkla geçer. Seçim localStorage'da "theme" ("dark" | "light");
  // hiç seçilmediyse sistem teması geçerlidir. İlk boyama için aynı okuma <head> içindeki satır içi betikte de var.
  var THEME_KEY = "theme";
  var LABELS = {
    tr: { toLight: "Açık temaya geç", toDark: "Koyu temaya geç" },
    en: { toLight: "Switch to light theme", toDark: "Switch to dark theme" }
  };
  var root = document.documentElement;
  var labels = LABELS[root.lang === "en" ? "en" : "tr"];
  var systemLight = window.matchMedia("(prefers-color-scheme: light)");
  var chosen = null;

  try {
    var saved = localStorage.getItem(THEME_KEY);
    if (saved === "dark" || saved === "light") chosen = saved;
  } catch (e) {
    // Depolama kapalıysa seçim yalnız bu sayfada geçerli kalır.
  }

  function shownTheme() {
    return chosen || (systemLight.matches ? "light" : "dark");
  }

  function updateThemeButtons() {
    var label = shownTheme() === "dark" ? labels.toLight : labels.toDark;
    document.querySelectorAll("[data-theme-toggle]").forEach(function (button) {
      button.setAttribute("aria-label", label);
      button.title = label;
    });
  }

  document.querySelectorAll("[data-theme-toggle]").forEach(function (button) {
    button.addEventListener("click", function () {
      chosen = shownTheme() === "dark" ? "light" : "dark";
      root.setAttribute("data-theme", chosen);
      try {
        localStorage.setItem(THEME_KEY, chosen);
      } catch (e) {
        // Depolama kapalıysa seçim yalnız bu sayfada geçerli kalır.
      }
      updateThemeButtons();
    });
  });
  systemLight.addEventListener("change", updateThemeButtons);
  updateThemeButtons();

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

  // ---------- Canlı saat ve vakit (İstanbul) ----------
  // Saat Intl ile, sıradaki vakit adhan-js (Diyanet yöntemi, İstanbul koordinatı) ile tarayıcıda hesaplanır.
  // Hesap yapılamazsa sayfadaki hazır metin kalır.
  var PRAYERS = {
    tr: { fajr: ["İmsak", "İmsak'a"], sunrise: ["Güneş", "Güneş'e"], dhuhr: ["Öğle", "Öğle'ye"], asr: ["İkindi", "İkindi'ye"], maghrib: ["Akşam", "Akşam'a"], isha: ["Yatsı", "Yatsı'ya"] },
    en: { fajr: ["Fajr"], sunrise: ["Sunrise"], dhuhr: ["Dhuhr"], asr: ["Asr"], maghrib: ["Maghrib"], isha: ["Isha"] }
  }[lang];
  var PRAYER_ORDER = ["fajr", "sunrise", "dhuhr", "asr", "maghrib", "isha"];
  var timeFormat = new Intl.DateTimeFormat(lang === "en" ? "en-GB" : "tr-TR", { timeZone: "Europe/Istanbul", hour: "2-digit", minute: "2-digit", hourCycle: "h23" });
  var dayFormat = new Intl.DateTimeFormat("en-CA", { timeZone: "Europe/Istanbul", year: "numeric", month: "2-digit", day: "2-digit" });
  var timesCache = {};

  function pad(number) {
    return (number < 10 ? "0" : "") + number;
  }

  // adhan günü bilgisayarın yerel takvim günü olarak okur; İstanbul'un gününü o biçimde veriyoruz.
  function prayerTimes(dayOffset) {
    var p = dayFormat.format(new Date()).split("-");
    var day = new Date(+p[0], p[1] - 1, +p[2] + dayOffset);
    var key = day.getTime();
    if (!timesCache[key]) {
      timesCache[key] = new adhan.PrayerTimes(new adhan.Coordinates(41.0082, 28.9784), day, adhan.CalculationMethod.Turkey());
    }
    return timesCache[key];
  }

  function nextPrayer(now) {
    for (var offset = 0; offset < 2; offset++) {
      var times = prayerTimes(offset);
      for (var i = 0; i < PRAYER_ORDER.length; i++) {
        if (times[PRAYER_ORDER[i]] > now) return { key: PRAYER_ORDER[i], at: times[PRAYER_ORDER[i]] };
      }
    }
  }

  function tickClock() {
    try {
      var now = new Date();
      setText("[data-clock]", timeFormat.format(now));
      if (!window.adhan) return;
      var next = nextPrayer(now);
      var minutes = Math.ceil((next.at - now) / 60000);
      var countdown = pad(Math.floor(minutes / 60)) + ":" + pad(minutes % 60);
      var names = PRAYERS[next.key];
      setText("[data-prayer-name]", lang === "en" ? "Until " + names[0] : names[1]);
      setText("[data-prayer-countdown]", countdown);
      setText("[data-prayer-meta]", (lang === "en" ? "Istanbul" : "İstanbul") + " · " + timeFormat.format(next.at));
    } catch (e) {
      // Hesap olmazsa sayfadaki hazır metin kalır.
    }
  }

  if (document.querySelector("[data-clock]")) {
    tickClock();
    setInterval(tickClock, 1000);
  }

  // ---------- Hareket: imleç hâlesi (C3), paralaks (E2), sayfa geçişi (F1) ----------
  // Hepsi "hareketi azalt" açıkken kapalı; imleç hâlesi yalnız fareli cihazlarda.
  var motionOk = window.matchMedia("(prefers-reduced-motion: no-preference)").matches;

  // C3: ana ışık imleci her karede %5 yaklaşarak izler. Işığın durağan yeri CSS'te; fark --fx / --fy ile eklenir.
  var halo = document.querySelector("[data-follow]");
  if (halo && motionOk && window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
    var haloHost = halo.parentNode;
    var targetX = 0;
    var targetY = 0;
    var haloX = 0;
    var haloY = 0;
    var haloFrame = 0;

    var followHalo = function () {
      haloX += (targetX - haloX) * 0.05;
      haloY += (targetY - haloY) * 0.05;
      halo.style.setProperty("--fx", haloX.toFixed(1) + "px");
      halo.style.setProperty("--fy", haloY.toFixed(1) + "px");
      haloFrame = Math.abs(targetX - haloX) > 0.2 || Math.abs(targetY - haloY) > 0.2 ? requestAnimationFrame(followHalo) : 0;
    };

    window.addEventListener("pointermove", function (event) {
      // Işığın merkezi ışık alanının (sayfanın üst kısmı) dışına çıkmaz.
      var rect = haloHost.getBoundingClientRect();
      var pointerX = Math.max(0, Math.min(haloHost.offsetWidth, event.clientX - rect.left));
      var pointerY = Math.max(0, Math.min(haloHost.offsetHeight, event.clientY - rect.top));
      targetX = pointerX - (halo.offsetLeft + halo.offsetWidth / 2);
      targetY = pointerY - (halo.offsetTop + halo.offsetHeight / 2);
      if (!haloFrame) haloFrame = requestAnimationFrame(followHalo);
    });
  }

  // E2: Levh satırlarında telefon, satırın ekrandaki konumuna (--p: -1…1) göre kayar ve eğimini değiştirir.
  var featureRows = document.querySelectorAll(".feature-row");
  if (featureRows.length && motionOk) {
    var parallaxQueued = false;

    var updateParallax = function () {
      parallaxQueued = false;
      featureRows.forEach(function (row) {
        var rect = row.getBoundingClientRect();
        var p = (rect.top + rect.height / 2 - window.innerHeight / 2) / window.innerHeight;
        row.style.setProperty("--p", Math.max(-1, Math.min(1, p)).toFixed(3));
      });
    };

    var queueParallax = function () {
      if (!parallaxQueued) {
        parallaxQueued = true;
        requestAnimationFrame(updateParallax);
      }
    };

    window.addEventListener("scroll", queueParallax, { passive: true });
    window.addEventListener("resize", queueParallax);
    updateParallax();
  }

  // F1: Levh kutucuğuna basılınca kutucuk, Levh sayfasının girişiyle aynı adı alır (çapraz belge View Transitions).
  document.querySelectorAll("[data-vt]").forEach(function (link) {
    link.addEventListener("click", function () {
      link.style.viewTransitionName = link.getAttribute("data-vt");
    });
  });

  // ---------- İletişim formu ----------
  // Mesaj FormSubmit (form servisi) üzerinden gmail'e gider. Gönderilemezse ziyaretçiye, aynı metinle
  // mail uygulamasını açan bir bağlantı gösterilir (mesaj kaybolmaz). Betik çalışmazsa form doğrudan servise gönderilir.
  document.querySelectorAll("[data-mail-form]").forEach(function (form) {
    var status = form.querySelector("[data-mail-status]");
    var button = form.querySelector("[type=submit]");
    var hint = status.textContent;

    function value(name) {
      return form.elements[name].value.trim();
    }

    function labelOf(name) {
      return form.elements[name].closest(".field").querySelector(".field__label").textContent;
    }

    // Konu satırı: ilk uygulama seçeneği "Genel" ise sayfanın adı, değilse seçilen uygulamanın adı
    function subject() {
      var prefix = form.elements.app.selectedIndex === 0 ? form.getAttribute("data-subject") : value("app");
      return prefix + " · " + value("topic");
    }

    // Servis çalışmazsa: aynı metinle mail uygulamasını açan bağlantı (çok uzunsa null)
    function mailtoLink() {
      var lines = ["email"].filter(function (name) {
        return value(name) !== "";
      }).map(function (name) {
        return labelOf(name) + ": " + value(name);
      });
      var body = value("message").replace(/\r?\n/g, "\r\n");
      if (lines.length) body += "\r\n\r\n—\r\n" + lines.join("\r\n");
      var href = "mailto:" + form.getAttribute("data-to") + "?subject=" + encodeURIComponent(subject()) + "&body=" + encodeURIComponent(body);
      return href.length > 1800 ? null : href;
    }

    // /contact/?app=levh bağlantısı uygulamayı hazır seçer
    var wanted = new URLSearchParams(window.location.search).get("app");
    if (wanted) {
      Array.prototype.forEach.call(form.elements.app.options, function (option) {
        if (option.value.toLowerCase() === wanted.toLowerCase()) form.elements.app.value = option.value;
      });
    }

    function fail() {
      status.textContent = form.getAttribute("data-failed") + " ";
      var href = mailtoLink();
      if (href) {
        var link = document.createElement("a");
        link.href = href;
        link.textContent = form.getAttribute("data-fallback");
        status.appendChild(link);
      } else {
        status.textContent += form.getAttribute("data-too-long");
      }
    }

    form.addEventListener("submit", function (event) {
      event.preventDefault();
      // Gizli tuzak alanı dolduran bir bottur: sessizce yutulur.
      if (form.elements._honey.value) return;
      var data = new URLSearchParams();
      data.append("_subject", subject());
      data.append("_replyto", value("email"));
      data.append("_captcha", "false");
      data.append("_template", "table");
      ["topic", "app", "email", "message"].forEach(function (name) {
        if (value(name) !== "") data.append(labelOf(name), value(name));
      });
      button.disabled = true;
      status.textContent = form.getAttribute("data-sending");
      var controller = new AbortController();
      var timer = setTimeout(function () {
        controller.abort();
      }, 15000);
      fetch(form.getAttribute("data-endpoint"), { method: "POST", headers: { Accept: "application/json" }, body: data, signal: controller.signal })
        .then(function (response) {
          return response.json().catch(function () {
            return {};
          }).then(function (result) {
            if (!response.ok || result.success === false || result.success === "false") throw new Error("gönderilemedi");
          });
        })
        .then(function () {
          form.reset();
          status.textContent = form.getAttribute("data-done");
        })
        .catch(fail)
        .then(function () {
          clearTimeout(timer);
          button.disabled = false;
        });
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
