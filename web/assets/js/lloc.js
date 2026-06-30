/* Robòtica · 1r Batx — interacció del web (sense dependències) */
(function () {
  "use strict";
  var doc = document.documentElement;

  /* ---------- Tema clar / fosc ---------- */
  var temaBtn = document.querySelector(".tema-btn");
  if (temaBtn) {
    temaBtn.addEventListener("click", function () {
      var fosc = doc.getAttribute("data-tema") === "fosc";
      if (fosc) { doc.removeAttribute("data-tema"); }
      else { doc.setAttribute("data-tema", "fosc"); }
      try { localStorage.setItem("tema", fosc ? "clar" : "fosc"); } catch (e) {}
    });
  }

  /* ---------- Menú lateral (mòbil) ---------- */
  var menuBtn = document.querySelector(".menu-btn");
  if (menuBtn) {
    menuBtn.addEventListener("click", function () {
      var obert = document.body.classList.toggle("menu-obert");
      menuBtn.setAttribute("aria-expanded", obert ? "true" : "false");
    });
  }

  /* ---------- Botons de copiar codi ---------- */
  document.querySelectorAll(".copia-btn").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var bloc = btn.closest(".codi-bloc");
      var pre = bloc ? bloc.querySelector("pre") : null;
      if (!pre) return;
      var text = pre.innerText;
      var ok = function () {
        var orig = btn.textContent;
        btn.textContent = "Copiat ✓";
        btn.classList.add("fet");
        setTimeout(function () { btn.textContent = orig; btn.classList.remove("fet"); }, 1600);
      };
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(ok, fallback);
      } else { fallback(); }
      function fallback() {
        var ta = document.createElement("textarea");
        ta.value = text; document.body.appendChild(ta); ta.select();
        try { document.execCommand("copy"); ok(); } catch (e) {}
        document.body.removeChild(ta);
      }
    });
  });

  /* ---------- Cercador ---------- */
  var input = document.getElementById("cerca");
  var caixa = document.getElementById("cerca-resultats");
  var index = window.INDEX_CERCA || [];
  if (input && caixa) {
    var prefix = (function () {
      // calcula el prefix relatiu a l'arrel a partir de la URL de full.css
      var l = document.querySelector('link[href*="assets/css/estil.css"]');
      if (!l) return "";
      var h = l.getAttribute("href");
      return h.slice(0, h.indexOf("assets/css/estil.css"));
    })();

    function normalitza(s) {
      return s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");
    }

    var resultats = [], selIdx = -1;

    function cerca(q) {
      q = normalitza(q.trim());
      if (!q) { tanca(); return; }
      var termes = q.split(/\s+/);
      resultats = index.filter(function (it) {
        var heu = normalitza(it.t + " " + it.s);
        return termes.every(function (t) { return heu.indexOf(t) !== -1; });
      }).slice(0, 12);
      pinta();
    }

    function pinta() {
      selIdx = -1;
      if (!resultats.length) {
        caixa.innerHTML = '<div class="cerca-buit">Cap resultat.</div>';
        caixa.hidden = false; return;
      }
      caixa.innerHTML = resultats.map(function (it) {
        return '<a href="' + prefix + it.u + '"><strong>' +
          escapa(it.t) + '</strong><span class="r-sec">' + escapa(it.s) + '</span></a>';
      }).join("");
      caixa.hidden = false;
    }

    function tanca() { caixa.hidden = true; caixa.innerHTML = ""; resultats = []; selIdx = -1; }
    function escapa(s) { return s.replace(/[&<>]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;" }[c]; }); }

    input.addEventListener("input", function () { cerca(input.value); });
    input.addEventListener("focus", function () { if (input.value) cerca(input.value); });
    input.addEventListener("keydown", function (e) {
      var enllacos = caixa.querySelectorAll("a");
      if (e.key === "ArrowDown") { e.preventDefault(); selIdx = Math.min(selIdx + 1, enllacos.length - 1); marca(enllacos); }
      else if (e.key === "ArrowUp") { e.preventDefault(); selIdx = Math.max(selIdx - 1, 0); marca(enllacos); }
      else if (e.key === "Enter") { if (enllacos[selIdx]) { e.preventDefault(); window.location.href = enllacos[selIdx].href; } }
      else if (e.key === "Escape") { tanca(); input.blur(); }
    });
    function marca(enllacos) {
      enllacos.forEach(function (a, i) { a.classList.toggle("sel", i === selIdx); });
      if (enllacos[selIdx]) enllacos[selIdx].scrollIntoView({ block: "nearest" });
    }
    document.addEventListener("click", function (e) {
      if (!input.contains(e.target) && !caixa.contains(e.target)) tanca();
    });
  }
})();
