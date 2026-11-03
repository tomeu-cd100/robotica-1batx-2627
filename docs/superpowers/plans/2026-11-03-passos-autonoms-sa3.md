# Passos autònoms · Pla 2: SA3

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** La SA3 en el format «passos autònoms», igual que la SA2. Les pràctiques ① Polsador, ② Potenciòmetre i llum, ③ Ultrasons i ④ La mascota (pràctica nova, amb l'esquelet com a sketch) tenen un formulari per pràctica. Hi ha una Entrega final, i la prova T1 es fa amb un **full resum en paper**.

**Architecture:** Reutilitza tot el que va fer el Pla 1: `marca_passos`, el check 18 de `qa.py`, `docs/plantilles/`, `practiques_definicions.js`, `crear_forms_practiques.mjs` i el guard `SA_MIGRADES`. Aquí no hi ha codi d'eina nou, llevat de l'entrada `sa3` a les definicions.

**Tech Stack:** el del Pla 1, més `arduino-cli` local per compilar el sketch nou (el CI fa servir `arduino/compile-sketches`, amb NeoPixel i DHT).

**Spec:** `docs/superpowers/specs/2026-11-03-passos-autonoms-design.md` · **Precedent:** `docs/superpowers/plans/2026-11-03-passos-autonoms-sa2.md`

## Global Constraints

Les del Pla 1, més aquestes decisions del docent (2026-11-03):
- Tasques **publicades** directament (`--publica`, així la categoria T1 s'hi posa sola), a **33 punts** les de pràctica. L'Entrega final, sense nota.
- La tasca vella «SA3 · Fitxa base — Entrades i sensors» s'esborra, perquè no serveix (0 lliuraments). Si l'API no ho permet perquè és del client vell, s'indica al docent.
- Prova T1 (S4): s'hi pot consultar un **full resum en paper** que cadascú omple al final de la pràctica de la mascota, a més dels esquemes. Ja no s'hi consulta «el quadern».
- Les tasques «Producte T1 · La mascota reactiva», «SA3 · Pràctica avaluable…», els qüestionaris i la «Prova pràctica T1» **no es toquen**.

## Review Focus

1. El sketch `05_mascota.ino` ha de compilar per a `arduino:avr:uno` amb NeoPixel i DHT, igual que al CI.
2. Les preguntes de cada formulari han de coincidir 1:1 amb els ✍️ de la seva pàgina.
3. Cap pàgina de la SA3 pot dir encara «quadern», «No premis Envia» o «una sola tasca».
4. El dossier de la mascota no ha de quedar amb dues còpies de l'esquelet.
5. A la fila S4 de «📦 Què has d'entregar», «Prova pràctica» s'ha de mantenir (ho exigeix `comprova_lliurables`).

---

### Task 1: Pràctica 4 · La mascota (sketch + pàgina) i dossier

**Files:** Create `Classes/SA3/codi/05_mascota/05_mascota.ino` and `Classes/SA3/codi/05_mascota/EXPLICACIO.md` · Modify `Classes/00_General/00_Projecte_T1_Mascota.md` (secció «🧗 Si t'encalles: l'esquelet del programa»)

- [ ] **Step 1:** El `.ino` és una còpia literal de l'esquelet del dossier, amb la capçalera `Quan: S3 - producte` perquè `capcalera_codi` la mostri. Compila'l amb `arduino-cli compile -b arduino:avr:uno Classes/SA3/codi/05_mascota` (instal·la `Adafruit NeoPixel` i `DHT sensor library` si falten) → ha de compilar.
- [ ] **Step 2:** `EXPLICACIO.md` segons `docs/plantilles/PRACTICA_PLANTILLA.md`.
  - Capçalera: 🎯 «la teva mascota reacciona a 3 coses de l'entorn, d'acord amb el seu caràcter» · ⏱️ la resta de la S3 · 📦 el material del dossier.
  - Passos:
    1. Dissenya: ✍️ nom i caràcter; ✍️ reaccions 1, 2 i 3 (la 3a, opcional).
    2. Munta: la taula de cablatge del dossier i la imatge, si n'hi ha.
    3. Carrega l'esquelet: `codi-complet`; ✅ «al Monitor sèrie surten `soroll=` i `llum=`».
    4. Fes la reacció de la foscor.
    5. Fes la del PIR: **llegeix → compara → reacciona**, amb ✅.
    6. Calibra els llindars.
    7. 📝 **Omple el full resum per a la prova** (paper): pins dels sensors, `digitalRead`, `analogRead`, `map`, `if` amb llindar, la funció de l'ultrasons i un error resolt. ✅ «el guardes per a la S4».
    8. ✍️ Un error i com l'has resolt.
    9. 📤 Respon i envia, amb l'enllaç a `sa3-p4` i després a l'Entrega final.
  - ⭐: l'alarma d'aparcament (`04_alarma_aparcament`) o una 4a reacció.
  - Plegats: 🧗 (els TODO i les pistes del dossier) i 🧠.
- [ ] **Step 3:** Al dossier, el bloc `<details>` de l'esquelet es substitueix per un enllaç a la pràctica: «l'esquelet, amb els passos, és a la Pràctica 4 de la SA3». Així només hi ha una còpia.
- [ ] **Step 4:** `py -3.11 web/_generador/generar.py` + `py -3.11 tools/qa.py` → només poden fallar els enllaços de Classroom que encara no existeixen. Sense commit fins a la Tasca 3.

### Task 2: Classroom · formularis de la SA3

**Files:** Modify `Material Classroom/practiques_definicions.js` (claus `sa3-p1`, `sa3-p2`, `sa3-p3`, `sa3-p4` i `sa3-final`), `Material Classroom/sa_definicions.js` (comentari a `sa3`: substituïda), `Material Classroom/actualitzar_form_fitxa_sa.mjs` (`SA_MIGRADES` += `'sa3'`)

- [ ] **Step 1: Definicions** (33 punts, `topicName: 'SA3 · Entrades i sensors'`, `T1`, materials amb la pàgina web de cada pràctica). Les preguntes surten de l'entrada `sa3` actual.
  - **p1:** PREDIU · HIGH/LOW · antirebot · `pOpt` repte del 5 · reflexió «El concepte nou més important».
  - **p2:** rang 0-1023 · instrucció de 0-1023 a 0-255 · número LDR amb llum i tapat (abans anava al quadern) · Racó de mesura (mateix format) · llum automàtic · reflexió «Diferència entre entrada digital i analògica».
  - **p3:** fórmula · què retorna `mesuraDistancia()` · reflexió «Per a què serveix una funció?».
  - **p4:** nom i caràcter · reaccions 1, 2 i `pOpt` 3 · «Un error i com l'he resolt».
  - **final:** `t` versió nucli («una mascota amb 2 reaccions que funcionin bé») · `autoaval` amb les files actuals de la SA3 · `check` amb `SA3_checklist_alumnat.md`.
- [ ] **Step 2:** `node crear_forms_practiques.mjs sa3` (simulació) → 5 tasques amb aquestes preguntes. **Confirmat pel docent per endavant** (publicades, i esborrar la vella): `node crear_forms_practiques.mjs sa3 --aplica --publica`. Comprova `resultats_forms_practiques.json`.
- [ ] **Step 3:** Esborra la tasca vella «SA3 · Fitxa base — Entrades i sensors» (id per títol, `courseWork.delete`). Si dona `ProjectPermissionDenied`, apunta-ho per al docent.
- [ ] **Step 4:** Commit `feat(classroom): formularis per pràctica de la SA3`.

### Task 3: Contingut · Pràctiques 1-3, portada i documents de la SA3

**Files:** Modify `Classes/SA3/codi/0{1,2,3}_*/EXPLICACIO.md`, `Classes/SA3/codi/05_mascota/EXPLICACIO.md` (enllaç), `Classes/SA3/README.md`, `Classes/SA3/SA3_guia_docent.md`, `Classes/SA3/SA3_fitxa_alumnat.md`, `Classes/SA3/SA3_checklist_alumnat.md` (+ el seu PDF amb `generar_fulls_imprimibles.py`, restaurant els altres PDF), `Programació didàctica/12_SA3_Entrades_sensors.md`, `Avaluació/Prova_practica_T1.md` (què es pot consultar), `tools/qa.py` (`PRACTIQUES_NOU_FORMAT` += 4 i `SA_NOU_FORMAT = {2, 3}`)

- [ ] **Step 1: P1-P3 amb la plantilla**, conservant el text del «Pas a pas» actual com a passos amb verb. Imatges: `sa3-tinkercad-polsador-pin2.png`, `sa3-tinkercad-pot-ldr.png` i `sa3-tinkercad-ultrasons.png`.
  - **P1:** «Llegeix i endevina» és un ✍️ abans de carregar.
  - **P2:** el pas del quadern es converteix en ✍️. El Racó de mesura és un pas «Mesura».
  - **P3:** l'últim pas abans d'enviar és «Desmunta el sensor (el pin 11 és per a la mascota)», amb ✅.
  - Teoria, errors i «On ho aplicaràs» van als plegats. Cal conservar l'enllaç `Reptes_SA3.md`.
- [ ] **Step 2: Portada** amb `PORTADA_SA_PLANTILLA.md`.
  - Es mantenen la foto, el bloc del Monitor sèrie i el «💻».
  - Ruta: ① P1 · 🚩 S1 · ② P2 · 🚩 S2 · ③ P3 · ④ Mascota · 🚩 S3 · 🏁 Entrega final (defensa d'1', més checklist).
  - Bloc «📝 Sessió 4 · Prova pràctica T1»: individual, i s'hi pot consultar el full resum i els esquemes.
  - «📦»: files S1-S4 (S4: «Prova pràctica T1»), ⭐ i 🤖, sense 📓.
  - A baix, «📚 Per repassar».
- [ ] **Step 3: Guia docent.**
  - Xuleta: arrencada per fita.
  - Tancaments S1-S3: formularis, no quadern.
  - S4: «quadern i esquemes consultables» passa a «full resum i esquemes».
  - Mapa: fila del quadern (25 %) = mitjana dels formularis P1-P4, 33 punts, R4.
- [ ] **Step 4: Altres documents.**
  - Programació didàctica: instruments.
  - `Prova_practica_T1.md`: què es pot consultar.
  - Fitxa base: «On responc» passa a ser un formulari per pràctica, i les mencions del quadern s'actualitzen.
  - Checklist d'alumnat: formularis, Entrega final i full resum.
- [ ] **Step 5:** Afegeix les 4 pràctiques i la SA3 al QA. Regenera la web, el PDF de la checklist i els tests, i passa el QA: tot net. Fes un `grep` de «quadern» a `Classes/SA3/` i revisa cada coincidència.
- [ ] **Step 6:** Commits (`feat(sa3): pràctiques en passos autònoms i mascota` i `feat(sa3): portada en ruta amb fites, entrega final i full resum de la prova`), push i CI verd (`gh run watch`).
- [ ] **Step 7:** Revisió final de la feina amb un revisor nou. Correccions dels punts importants, amb el seu test.
