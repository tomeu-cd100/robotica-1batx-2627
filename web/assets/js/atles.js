/* Atles · Panell de plànol de les pàgines del T2 i el T3.
   El panell (aside.escenari) ja ve generat: plànol del braç + índex de la SA.
   Aquest script:
   - a les pàgines de teoria, en pantalla ampla, obre els blocs de l'índex;
   - a les pràctiques, en pantalla ampla, mostra al plànol el dibuix o el codi
     del pas que llegeixes. Un pas sense dibuix hereta el de l'anterior; si
     encara no n'hi ha cap, s'hi veu el plànol amb «Ets aquí».
   Al mòbil el panell queda a dalt, amb l'índex plegat.
   Fitxer mantingut a mà; el carrega page_shell() a les pàgines dels trimestres amb atles. */
(function () {
  "use strict";
  var esc = document.querySelector("aside.escenari");
  if (!esc || !window.matchMedia) return;
  var ample = window.matchMedia("(min-width: 1100px)");
  var esPractica = esc.hasAttribute("data-practica");
  var blocs = Array.prototype.slice.call(esc.querySelectorAll(".atles-bloc"));

  // Teoria: índex obert en pantalla ampla (a les pràctiques, plegat: el lloc és pel dibuix)
  function obreIndex() {
    blocs.forEach(function (d) {
      d.open = ample.matches && !esPractica && !d.classList.contains("atles-toc");
    });
  }

  var passos = Array.prototype.slice.call(document.querySelectorAll("article.prose section.pas"));
  if (!esPractica || !passos.length) {
    obreIndex();
    if (ample.addEventListener) ample.addEventListener("change", obreIndex);
    return;
  }

  var vista = esc.querySelector(".esc-vista");
  var planol = vista.firstElementChild;          // el plànol amb «Ets aquí»
  var etPas = esc.querySelector(".esc-pas");
  var etPasInicial = etPas.textContent;
  var etFull = esc.querySelector(".esc-full");
  var etFullInicial = etFull.textContent;

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
    etPas.textContent = h ? h.textContent.trim() : etPasInicial;
    etFull.textContent = (i + 1) + " / " + passos.length;
    tornaCodi();
    while (vista.firstChild) vista.removeChild(vista.firstChild);
    var m = media[i];
    if (m && m.id === "codi-complet") {
      marca = document.createElement("p");
      marca.className = "codi-a-escenari";
      marca.textContent = "← El codi és al plànol, a l'esquerra.";
      m.parentNode.insertBefore(marca, m);
      vista.appendChild(m);
      codiMogut = m;
      var d = m.querySelector("details");
      if (d) d.open = true;
    } else if (m) {
      var img = m.cloneNode(true);
      img.classList.remove("a-escenari");
      vista.appendChild(img);
    } else if (planol) {
      vista.appendChild(planol);
    }
  }

  // El pas actiu és el que travessa la franja del 30-35 % superior de la finestra
  var io = new IntersectionObserver(function (entrades) {
    var vis = entrades.filter(function (e) { return e.isIntersecting; });
    if (vis.length && ample.matches) mostra(passos.indexOf(vis[0].target));
  }, { rootMargin: "-30% 0px -65% 0px" });

  function activa() {
    obreIndex();
    if (ample.matches) {
      document.body.classList.add("amb-passos");
      passos.forEach(function (p) { io.observe(p); });
      var desti = location.hash && document.getElementById(decodeURIComponent(location.hash.slice(1)));
      var iDesti = -1;
      passos.forEach(function (p, j) { if (desti && p.contains(desti)) iDesti = j; });
      actual = -1;
      mostra(iDesti >= 0 ? iDesti : 0);
      if (iDesti >= 0) desti.scrollIntoView({ block: "start" });
    } else {
      document.body.classList.remove("amb-passos");
      passos.forEach(function (p) { io.unobserve(p); p.classList.remove("actiu"); });
      tornaCodi();
      while (vista.firstChild) vista.removeChild(vista.firstChild);
      if (planol) vista.appendChild(planol);
      etPas.textContent = etPasInicial;
      etFull.textContent = etFullInicial;
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
