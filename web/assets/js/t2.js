/* T2 · Escenari de pràctica (pàgines de pràctica del 2n trimestre).
   En pantalles amples, el que hi ha dins del pas que llegeixes (l'esquema o el
   codi) es mostra a l'esquerra, al plànol. Un pas sense dibuix hereta el de
   l'anterior; si encara no n'hi ha cap, s'hi veu el plànol del braç amb
   «Ets aquí». Al mòbil no canvia res: la pàgina és d'una columna.
   Fitxer mantingut a mà; el carrega page_shell() només a les pàgines del T2. */
(function () {
  "use strict";
  var passos = Array.prototype.slice.call(document.querySelectorAll("article.prose section.pas"));
  if (!passos.length || !window.matchMedia) return;
  var ample = window.matchMedia("(min-width: 1100px)");
  var main = document.querySelector("main#contingut");
  var article = document.querySelector("article.prose");
  if (!main || !article) return;

  // Pregunta guia (línia ❓ de la capçalera) i títol curt de la pràctica
  var pregunta = "";
  var cap = article.querySelector(".cap-practica");
  if (cap) {
    Array.prototype.forEach.call(cap.querySelectorAll("p"), function (p) {
      var t = p.textContent.trim();
      if (t.indexOf("❓") === 0) pregunta = t.replace(/^❓\s*La pregunta:\s*/, "");
    });
  }
  var h1 = article.querySelector("h1");
  var titol = h1 ? h1.textContent.split(":")[0].trim() : "";
  var plantilla = document.getElementById("t2-mapa");

  // L'escenari
  var esc = document.createElement("aside");
  esc.className = "escenari";
  esc.setAttribute("aria-label", "Escenari: l'esquema o el codi del pas que llegeixes");
  esc.innerHTML =
    '<div class="esc-cap"><span class="esc-pas"></span><span class="esc-q"></span></div>' +
    '<div class="esc-vista"></div>' +
    '<div class="caixeti"><span>Plànol</span><span class="esc-tit"></span><span>Full</span><span class="esc-full"></span></div>';
  main.insertBefore(esc, article);
  esc.querySelector(".esc-q").textContent = pregunta;
  esc.querySelector(".esc-tit").textContent = titol;
  var vista = esc.querySelector(".esc-vista");

  // El dibuix de cada pas: la primera imatge o el codi complet. Sense, hereta.
  var darrer = null;
  var media = passos.map(function (p) {
    var m = p.querySelector("img") || p.querySelector("#codi-complet");
    if (m) darrer = m;
    if (m && m.tagName === "IMG") m.classList.add("a-escenari");
    return m || darrer;
  });

  // El codi es MOU (no es copia): conserva els colors i el botó Copia.
  var codiMogut = null, marca = null;
  function tornaCodi() {
    if (codiMogut && marca && marca.parentNode) {
      marca.parentNode.insertBefore(codiMogut, marca);
      marca.parentNode.removeChild(marca);
    }
    codiMogut = null; marca = null;
  }

  var actual = -1;
  function mostra(i) {
    if (i === actual) return;
    actual = i;
    passos.forEach(function (p, j) { p.classList.toggle("actiu", i === j); });
    var h = passos[i].querySelector("h3");
    esc.querySelector(".esc-pas").textContent = h ? h.textContent.trim() : "";
    esc.querySelector(".esc-full").textContent = (i + 1) + " / " + passos.length;
    tornaCodi();
    vista.innerHTML = "";
    var m = media[i];
    if (m && m.id === "codi-complet") {
      marca = document.createElement("p");
      marca.className = "codi-a-escenari";
      marca.textContent = "← El codi és a l'escenari, a l'esquerra.";
      m.parentNode.insertBefore(marca, m);
      vista.appendChild(m);
      codiMogut = m;
      var d = m.querySelector("details");
      if (d) d.open = true;
    } else if (m) {
      var img = m.cloneNode(true);
      img.classList.remove("a-escenari");
      vista.appendChild(img);
    } else if (plantilla) {
      vista.appendChild(plantilla.content.cloneNode(true));
    }
  }

  // El pas actiu és el que travessa la franja del 30-35 % superior de la finestra
  var io = new IntersectionObserver(function (entrades) {
    var vis = entrades.filter(function (e) { return e.isIntersecting; });
    if (vis.length && ample.matches) mostra(passos.indexOf(vis[0].target));
  }, { rootMargin: "-30% 0px -65% 0px" });

  function activa() {
    if (ample.matches) {
      document.body.classList.add("amb-escenari");
      passos.forEach(function (p) { io.observe(p); });
      var desti = location.hash && document.getElementById(decodeURIComponent(location.hash.slice(1)));
      var iDesti = -1;
      passos.forEach(function (p, j) { if (desti && p.contains(desti)) iDesti = j; });
      actual = -1;
      mostra(iDesti >= 0 ? iDesti : 0);
      if (iDesti >= 0) desti.scrollIntoView({ block: "start" });
    } else {
      document.body.classList.remove("amb-escenari");
      passos.forEach(function (p) { io.unobserve(p); p.classList.remove("actiu"); });
      tornaCodi();
      actual = -1;
    }
  }
  passos.forEach(function (p, i) {
    p.addEventListener("click", function () { if (ample.matches) mostra(i); });
  });
  if (ample.addEventListener) ample.addEventListener("change", activa);
  else if (ample.addListener) ample.addListener(activa);
  activa();
})();
