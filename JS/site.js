/* ============================================================
   CANRISK — site.js
   Funciones compartidas por todas las páginas informativas:
   - Resalta la página actual en la navbar y en el sidebar.
   - Muestra un texto junto a la foto de perfil cuando el
     usuario ya inició sesión (lee "userSession" de localStorage).
   - Configura el botón de cambio de idioma (ES <-> EN).
   ============================================================ */

(function () {
  "use strict";

  // Mapa ES <-> EN. Las rutas son relativas a la raíz del proyecto.
  var LANG_MAP = {
    // Páginas en español -> inglés
    "principal.html": "HTML/INGLES/PrincipalING.html",
    "aboutus.html": "HTML/INGLES/aboutusENG.html",
    "contacto.html": "HTML/INGLES/ContactoING.html",
    "contacto-detalle.html": "HTML/INGLES/Contacto-detalleING.html",
    "cancer-intro.html": "HTML/INGLES/cancer-introING.html",
    "cancer.html": "HTML/INGLES/CancerING.html",
    "psycho-help.html": "HTML/INGLES/psycho-helpING.html",
    "help.html": "HTML/INGLES/helpING.html",
    "help-detalle.html": "HTML/INGLES/helpING.html",
    "ficha1.html": "HTML/INGLES/helpING.html",
    "quizz.html": "HTML/INGLES/quizzING.html",
    "faq.html": "HTML/INGLES/faqING.html",
    "index.html": "INICIO/IndexING.html",
    "faq.n.html": "INICIO/Faq.N-ING.html",

    // Páginas en inglés -> español
    "principaling.html": "HTML/ESPANOL/Principal.html",
    "aboutuseng.html": "HTML/ESPANOL/aboutus.html",
    "contactoing.html": "HTML/ESPANOL/Contacto.html",
    "contacto-detalleing.html": "HTML/ESPANOL/Contacto-Detalle.html",
    "cancer-introing.html": "HTML/ESPANOL/cancer-intro.html",
    "cancering.html": "HTML/ESPANOL/cancer.html",
    "psycho-helping.html": "HTML/ESPANOL/psycho-help.html",
    "helping.html": "HTML/ESPANOL/help.html",
    "quizzing.html": "HTML/ESPANOL/quizz.html",
    "faqing.html": "HTML/ESPANOL/faq.html",
    "indexing.html": "INICIO/Index.html",
    "faq.n-ing.html": "INICIO/Faq.N.html"
  };

  function currentBasename() {
    var path = window.location.pathname;
    var last = path.substring(path.lastIndexOf("/") + 1);
    try { last = decodeURIComponent(last); } catch (e) { /* noop */ }
    return last.toLowerCase() || "index.html";
  }

  function rootPrefix() {
    var path = window.location.pathname;
    if (/\/HTML\/(ESPANOL|INGLES)\//i.test(path)) return "../../";
    if (/\/INICIO\//i.test(path)) return "../";
    return "";
  }

  function currentIsEnglish() {
    return (document.documentElement.lang || "es").toLowerCase().indexOf("en") === 0;
  }

  /* ---------- 1. Resaltar la página actual (navbar + sidebar) ---------- */
  function highlightActivePage() {
    var current = currentBasename();

    document.querySelectorAll(".Info-nav a, .sidebar-list a").forEach(function (a) {
      var href = a.getAttribute("href");
      if (!href) return;
      var base = href.substring(href.lastIndexOf("/") + 1).toLowerCase();
      if (base === current) {
        a.classList.add("active");
        var boxII = a.closest(".box-II");
        if (boxII) boxII.classList.add("active");
      }
    });
  }

  /* ---------- 2. Texto de sesión junto a la foto de perfil ---------- */
  function setupSessionIndicator() {
    var photo = document.querySelector(".Photo");
    if (!photo) return;

    var session = null;
    try { session = JSON.parse(localStorage.getItem("userSession")); } catch (e) { /* noop */ }
    if (!session || !session.username) return;

    var isEnglish = currentIsEnglish();

    var wrapper = document.createElement("button");
    wrapper.type = "button";
    wrapper.className = "session-text show";
    wrapper.title = isEnglish ? "Click to log out" : "Haz clic para cerrar sesión";

    var greeting = document.createElement("span");
    greeting.className = "session-greeting";
    greeting.textContent = isEnglish ? "Signed in as" : "Sesión iniciada como";

    var user = document.createElement("span");
    user.className = "session-user";
    user.textContent = session.username;

    var logout = document.createElement("span");
    logout.className = "session-logout";
    logout.textContent = isEnglish ? "Log out" : "Cerrar sesión";

    wrapper.appendChild(greeting);
    wrapper.appendChild(user);
    wrapper.appendChild(logout);

    wrapper.addEventListener("click", function () {
      localStorage.removeItem("userSession");
      window.location.reload();
    });

    photo.appendChild(wrapper);
  }

  /* ---------- 3. Botón de cambio de idioma ---------- */
  function setupLangSwitch() {
    var btn = document.getElementById("langSwitch") || document.getElementById("langSwitchNL");
    if (!btn) return;

    var current = currentBasename();
    var target = LANG_MAP[current];

    if (!target) {
      var isEnglish = currentIsEnglish();
      target = isEnglish ? "HTML/ESPANOL/Principal.html" : "HTML/INGLES/PrincipalING.html";
    }

    btn.setAttribute("href", rootPrefix() + target);
    btn.textContent = currentIsEnglish() ? "ES" : "EN";
  }

  document.addEventListener("DOMContentLoaded", function () {
    highlightActivePage();
    setupSessionIndicator();
    setupLangSwitch();
  });
})();
