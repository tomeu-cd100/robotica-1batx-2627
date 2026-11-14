# Disseny · La web del T2 i el T3 com a atles del robot del trimestre

**Data:** 2026-11-14 · **Estat:** aprovat pel docent («m'agrada, fes-ho per a tot el T2»)

## Per què

El docent vol que la web del 2n trimestre (SA4, SA5, SA6 i el projecte del braç) s'assembli a [La Revolució Industrial](https://felipsarroca.github.io/web/RevolucioIndustrial/index.html) d'en Felip Sarroca. L'objectiu és que l'alumnat **sàpiga on és** dins del trimestre i que li faci **més ganes treballar**. Propostes visuals: artifact «Atles del braç MeArm».

## Què s'ha triat

- **A · El braç és el mapa.** Un plànol del MeArm sobre el banc on cada pràctica és un **globus numerat** amb línia de referència, com en un dibuix de conjunt. Les targetes fan de **llista de peces**, agrupades per SA, cadascuna amb la seva pregunta guia.
- **B · Escenari + passos** (el concepte). En pantalles amples (≥ 1100 px), a l'esquerra hi ha el plànol amb el dibuix o el codi del pas que es llegeix, i a la dreta els passos.
- **E · Estil «plànol tècnic».** Blau tinta amb graella, traç blanc, cotes grogues, caixetí i lletra monoespaiada als títols.

Descartades: la vista explotada (C) i el commutador Nucli / + Ampliació (D). Tampoc es fan il·lustracions realistes ni 3D.

## Objectius, no-objectius i anti-objectius

- Una sola font: el markdown. Cap pàgina de `web/` feta a mà.
- Al mòbil no canvia res: la pàgina de pràctica és d'una columna, com ara.
- No s'afegeixen pàgines noves. El mapa va dins les portades que ja existeixen.
- **Anti-objectiu:** que l'escenari amagui alguna cosa que l'alumnat necessita, com el codi que no es pot copiar o un pas que no es veu.

## Approaches considerats

1. **Pàgines fetes a mà en JavaScript, com en Felip.** Descartat: trenca la regla de la font única i duplica el contingut.
2. **Escenari generat al servidor**, amb el generador separant la imatge i el codi de cada pas. Descartat: el markdown hauria de marcar què va a l'escenari.
3. **Triat: classe `t2` al generador + CSS/JS a `web/assets/`.** El JS llegeix les `section.pas` que ja genera `marca_passos` i mostra a l'escenari la primera imatge o el `#codi-complet` de cada pas. No cal cap marca nova al markdown, a part de la pregunta guia.

## Com està fet

- `web/_generador/generador/atles_t2.py`: els 11 capítols (pràctica, SA, sessió, posició del globus), `pregunta()`, `mapa_html()` i `llista_peces_html()`. Té tests a `tests/test_atles_t2.py`.
- `generar.py`:
  - `page_shell()` afegeix `body.t2`, `assets/css/t2.css` i `assets/js/t2.js` quan `tri == 2`.
  - `atles_t2_portada()` posa el plànol després del H1 de la portada del projecte T2, amb la llista de peces, i de la portada de SA4-SA6, amb la seva SA ressaltada.
  - `atles_t2_practica()` deixa el plànol amb «Ets aquí» en un `<template>` a cada pràctica.
- **Pregunta guia:** una línia `❓ **La pregunta:** …` a la capçalera `cap-practica` de cada pràctica.
- **Escenari (`t2.js`):**
  - Les imatges es copien a l'escenari.
  - El codi s'hi **mou**, no es copia, i així conserva els colors i el botó Copia. Al panell hi queda un avís.
  - Un pas sense dibuix hereta el de l'anterior. Si encara no n'hi ha cap, mostra el plànol amb «Ets aquí».
  - Els enllaços `#pas-…` porten directament al pas.

## Què queda obert

- Les pràctiques en format antic (`05_dos_servos_millis`, `04_control_proporcional`) no tenen passos ni escenari. Només hi arriba l'estil.
- Si un dia es vol per al T1 o el T3, cal un altre dibuix i un altre `atles_tN.py`.

## Ampliació (2026-11-14, tarda): tot el T2 amb el format nou

El docent va veure que la portada de la SA4 barrejava el format nou amb l'antic (barra lateral, índex a la dreta). Ara **totes** les pàgines del T2 (portades, teoria, pràctiques, lliurament, reptes i programació de SA4-SA6) tenen el **panell de plànol** a l'esquerra, generat al servidor per `atles_t2.panell_html()`:

- el plànol del braç (SA ressaltada; «Ets aquí» a les pràctiques) i pestanyes SA4 · SA5 · SA6 · El braç;
- l'índex de la SA en blocs: 🧭 Ruta, 📚 Teoria, 🏁 Lliurament, 👩‍🏫 Docent (només vista docent) i 📄 En aquesta pàgina;
- en pantalla ampla, la barra lateral i l'índex de la dreta s'amaguen; al mòbil, el panell queda a dalt amb l'índex plegat (el menú ☰ continua).

A les pràctiques, `t2.js` substitueix el plànol pel dibuix o el codi del pas actiu, i l'índex hi queda plegat.

**Tasques «Foto»:** `Material Classroom/crear_tasques_foto.mjs` crea per a cada pràctica una tasca «Foto · SAn · Pràctica N · …» (sense formulari ni nota, en DRAFT) per penjar una foto de la pràctica funcionant. El pas «Respon i envia» de cada pràctica hi enllaça (📷).

## Ampliació (2026-11-14, vespre): el T3, el rover

El docent demana «el mateix» per al T3. Decisions seves (preguntades): els **katas de SA7-SA8 s'arxiven** com els del T2 (ara tots, SA2-SA8, són a `docs/arxiu/`), i a la **SA9 cada fase del projecte és una pràctica**.

- **SA7-SA9 en passos autònoms:** SA7 ① moviment (amb el pas «Adapta'l al teu rover», el bloc `motors()` del L298N dins del pas) ② quadrat ③ evita-obstacles ④ seguidor de línia (producte); SA8 ① emissor ② receptor ③ auditoria IoT ④ gestos ⑤ Teachable Machine (producte), ⭐ ESP32; SA9 ① Idear ② Prototipar ③ Provar ④ Comunicar (producte), S5 prova T3.
- **Pràctiques sense programa** (`SA8_auditoria_iot.md`, `SA8_practica_teachable_machine.md`, `SA9_practica_*.md`): el generador hi aplica `marca_passos` quan la pàgina comença amb la capçalera `cap-practica`.
- **Atles genèric:** `generador/atles.py` (classe `Atles`) amb les dades de cada trimestre a `atles_t2.py` (braç) i `atles_t3.py` (pista vista de dalt amb el rover, la base de telemetria, el núvol IoT, l'ordinador de la IA i les quatre fases de la SA9). `page_shell()` hi posa `body.atles tN` i carrega `assets/css/atles.css` i `assets/js/atles.js` (abans `t2.*`).
- **Classroom:** 16 formularis nous (13 pràctiques + 3 Entregues finals) i 13 tasques «Foto», tot en DRAFT.
