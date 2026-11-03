# Passos autònoms · Pla 4: SA4

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans. Steps use checkbox (`- [ ]`) syntax.

**Goal:** La SA4 (servos, motors, MeArm) en el format de passos autònoms: les pràctiques ① Servo, ② Motor DC i pont H, ③ Ultrasons → braç i ④ El braç amb potenciòmetres (producte), cadascuna amb el seu formulari, i una Entrega final. Els torns de taller del MeArm són dins de les pràctiques i a les fites.

**Spec:** `docs/superpowers/specs/2026-11-03-passos-autonoms-design.md` · **Precedents:** Plans 1 i 2 (SA2, SA3).

## Global Constraints

Les dels Plans 1 i 2, més aquestes decisions del docent (2026-11-03):
- **El quadern tècnic imprès del T2 i el T3 es MANTÉ.** A les SA4-SA9, la fila 📓 de «Què has d'entregar» continua, i cada fita 🚩 recorda omplir el full del quadern de la sessió. El `qa.py` només exigeix l'absència de 📓 a les SA2 i SA3.
- Tasques en **DRAFT** (la SA4 és al gener), a 33 punts, `gradeCategory: T2` (es posa a mà en publicar). L'Entrega final, sense nota.
- Els katas de la SA4 continuen actius: cada pràctica comença amb el pas «Kata primer», amb el ganxo literal `✍️ **Kata primer!**` que exigeix `comprova_katas`.
- La `05_dos_servos_millis` queda com a ⭐ (format antic, fora de la ruta).
- Les tasques velles de la SA4 a Classroom (dues «Fitxa base» en DRAFT, el qüestionari i la «Pràctica avaluable: Barrera automàtica») no es toquen. Les dues «Fitxa base» les esborra el docent.

## Tasks

### Task 1: QA i Classroom
- [ ] `qa.py`: constant `SA_SENSE_QUADERN_PAPER = {2, 3}`; la fila 📓 només deixa de ser obligatòria (i passa a ser error) a aquestes. Afegeix-hi un test a `tools/tests` que cobreixi les dues SA.
- [ ] `practiques_definicions.js`: claus `sa4-p1`, `sa4-p2`, `sa4-p3`, `sa4-p4` i `sa4-final` (topic «SA4 · Moviment: servos, motors i ponts H», T2). Les preguntes surten de l'entrada `sa4` actual:
  - **p1:** PREDIU · rang de `write()` · `map()` · `pOpt` escombrada · reflexió «El concepte nou més important».
  - **p2:** taula del pont H · velocitat i pin · `pOpt` funcions · angles de la pinça (taller) · reflexió «Per què cal un pont H?».
  - **p3:** PREDIU · taula de 5, 15 i 30 cm · `pOpt` guarda · reflexió «Massa comuna».
  - **p4:** pseudocodi · angles límit · zona morta · reflexió «Els angles límit del meu braç i com els he trobat» · «Un error».
  - **final:** autoavaluació actual + checklist.
- [ ] Simulació i `--aplica` (DRAFT). `SA_MIGRADES` += `'sa4'`.

### Task 2: Pràctiques P1-P4 i portada
- [ ] P1-P4 amb la plantilla. El primer pas és sempre «Kata primer»; els blocs de codi, «Errors» i «On ho aplicaràs» van als plegats; el «🔧 Al taller d'avui» passa a ser un pas «Torn de taller» abans de «Respon i envia». Imatges: `sa4-tinkercad-servo-potenciometre.png`, `sa4-tinkercad-motor-pont-h.png`, `sa4-ultrasons-brac.svg` i `sa4-flux.svg`.
- [ ] Portada:
  - ruta ①-④ amb 🚩 (S1-S4: el taller del dia i el full del quadern);
  - ⭐ `05_dos_servos_millis`;
  - 🏁 Entrega final (defensa d'1': R1, R2 i R3);
  - «📦» amb S1-S4, ⭐, 📓 i 🤖.
- [ ] Guia docent (xuleta d'arrencada, tancaments, mapa del quadern = formularis + quadern imprès), fitxa base («On responc») i checklist d'alumnat (+ PDF). Programació didàctica 13 (instruments).
- [ ] `PRACTIQUES_NOU_FORMAT` += 4 i `SA_NOU_FORMAT` += 4. Regenera la web, fes els tests i el QA → net. Commits, push, CI verd, revisió final amb un revisor nou i correccions, sincronització del Drive.
