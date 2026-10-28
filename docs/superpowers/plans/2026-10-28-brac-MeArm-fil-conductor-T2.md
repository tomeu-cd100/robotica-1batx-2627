# Braç MeArm, fil conductor del T2 · Pla d'implementació

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Reorientar totes les pràctiques, explicacions, reptes i la prova de SA4-SA6 cap a construir i programar el MeArm.

**Architecture:** Material markdown + sketches `.ino`/`.py` font; `web/_generador/generar.py` genera la web i `generar_pdf.py` els PDFs. Primer es fixa el contracte comú (pins, dossier, codi de referència); després cada SA (codi → documents); al final, els transversals i la verificació global.

**Tech Stack:** Arduino C++ (`Servo.h`, UNO), MicroPython micro:bit V2, Markdown, SVG a mà, Python (generador i `tools/qa.py`), Node (Classroom).

**Spec:** `docs/superpowers/specs/2026-10-28-brac-MeArm-fil-conductor-T2-design.md`

## Global Constraints

- Pins MeArm: base D9 · esquerre D6 · dret D10 · pinça D11 · pots A0 base / A1 dret / A2 pinça / A3 esquerre · col·lisió D2 (`INPUT_PULLUP`, LOW = xoc) · polsadors A/B D3/D4 (`INPUT_PULLUP`) · ultrasons TRIG D7 / ECHO D8 · pont P1 → D0.
- Motor DC (SA4-S2) fora del braç: ENA 5, IN1 7, IN2 8.
- Ordres de ràdio/sèrie: `B+ B- D+ D- E+ E- P G` (comandament) i `A R` (pont).
- Hores sense canvis: SA4 8 h, SA5 6 h, SA6 8 h; S4 de SA6 = prova T2.
- Comentaris de codi d'alumnat en català **sense accents**; documents en català correcte.
- Cada sketch de `Classes/SAn/codi/` té `EXPLICACIO.md` (o `<nom>_EXPLICACIO.md` si és solt) amb seccions: 🎯 Per què · 🔮 Prediu · 🧠 Codi per blocs · ⚠️ Errors · 🔗 On ho aplicaràs.
- Cap pràctica no depèn del braç per funcionar (sempre es pot fer amb servos solts a la breadboard).
- `web/` no s'edita a mà; commits en català, Conventional Commits, amb la línia `Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>`.

## Review Focus

1. **Referències penjades** a sketches eliminats (`03_sensor_velocitat`, `04_barrera_automatica`, `05_dos_leds_millis`, `01_name_badge`, `02_passes`, `03_nightlight`, `04_radio_dau`, `02_termostat_histeresi`) en qualsevol `.md/.js/.py/.yml` fora de `Memòria treball/` i `docs/`: han de quedar a 0. Ho comprova la tasca 9.
2. **Conflicte de pins**: cap sketch del braç fa servir D11 per a l'ultrasons ni `analogWrite` a D9/D10 (Timer1 de `Servo`). Ho comprova la tasca 9 amb un grep de `ECHO = 11` i `analogWrite(9|10`.
3. **Servos des de l'USB**: cada esquema i cada EXPLICACIO amb 2+ servos porta l'avís de piles + GND comú. Grep a la tasca 9.
4. **Pla B de 3 servos**: el dossier explica com treure el D6; el codi de referència compila igual si el servo esquerre no hi és. Ho revisa la tasca 1.
5. **PDFs i Classroom desfasats**: `qa.py` punt 8 (PDF versionats) a 0 desfasats; `sa_definicions.js` sense noms antics.

---

### Task 0: Entorn de verificació local

**Files:** cap del repo (tot al scratchpad).

- [ ] **Step 1:** Crear `arduino-cli.yaml` al scratchpad amb `directories.data`, `directories.downloads` i `directories.user` dins del scratchpad (no toca la instal·lació de l'usuari).
- [ ] **Step 2:** `arduino-cli --config-file <yaml> core install arduino:avr` i `lib install Servo`.
- [ ] **Step 3:** Compilar `Classes/Solucionari/codi/T2_mearm_arduino` amb `--fqbn arduino:avr:uno`. Esperat: `Sketch uses … bytes`.
- [ ] **Step 4:** `py -3 tools/qa.py` de referència → `✅ QA net.`

### Task 1: Contracte comú del braç (dossier, muntatge, codi de referència)

**Files:**
- Modify: `Classes/00_General/00_Projecte_T2_Brac.md` (reescriure per al MeArm: peces, taller per sessions segons el recorregut del spec, cablatge amb el mapa de pins, màquina d'estats, rúbrica «4 articulacions», problemes; `brac.svg` passa a nota docent «Pla B», i la micro:bit governant passa a contingència)
- Modify: `Classes/00_General/00_Muntatge_brac_MeArm.md` (treure «en prova» de l'alumnat i mantenir-lo en nota docent; afegir taula «quin bloc a quina sessió»)
- Create: `Classes/00_General/img/mearm-estructura.svg` (base, laterals esquerre/dret, pinça, sensor de col·lisió i ultrasons a l'estació de recollida)
- Modify: `Classes/00_General/img/mearm-connexions-arduino.svg` + script de generació (afegir col·lisió D2, polsadors D3/D4, ultrasons D7/D8 i pont D0 en un 2n esquema `mearm-connexions-complet.svg`)
- Modify: `Classes/Solucionari/codi/T2_brac_estats/T2_brac_estats.ino`, `T2_brac/T2_brac.ino`, `T2_brac_microbit_comandament.py`, `T2_brac_microbit_pont.py` → 4 servos i ordres `E+`/`E-`
- Modify: `Classes/Solucionari/Solucionari_T2_SA4-SA6.md`, `Classes/00_General/00_Fil_conductor_robots.md`, `Classes/00_General/00_Projecte_T2_portada.md`

**Interfaces — Produces:** el mapa de pins i el protocol d'ordres dels Global Constraints, ja escrits al dossier (§Cablatge), que totes les tasques enllacen amb `00_Projecte_T2_Brac.md#cablatge`.

- [ ] **Step 1:** Reescriure el dossier i la guia de muntatge.
- [ ] **Step 2:** Generar els SVG i revisar-los en PNG (Inkscape).
- [ ] **Step 3:** Actualitzar el codi de referència a 4 servos; compilar-lo (Task 0) i fer `py_compile` dels `.py`.
- [ ] **Step 4:** `py -3 tools/qa.py` → net (inclòs el punt 15, codi incrustat).
- [ ] **Step 5:** Commit `feat: dossier del braç T2 per al MeArm de 4 servos`.

### Task 2: SA4 · codi i esquemes

**Files:**
- Modify: `Classes/SA4/codi/01_servo_potenciometre/{.ino,EXPLICACIO.md}` (servo de base D9, pot A0; afegir el pas 0 amb `write(90)` als 4 servos)
- Modify: `Classes/SA4/codi/02_motor_pont_h/EXPLICACIO.md` (versió reduïda ~40', «fora del braç», sense rampa; l'«On ho aplicaràs» apunta al rover T3)
- Delete: `Classes/SA4/codi/03_sensor_velocitat/`, `04_barrera_automatica/`, `05_dos_leds_millis/`, i els PNG Tinkercad corresponents de `Classes/SA4/img/`
- Create: `Classes/SA4/codi/03_ultrasons_brac/{03_ultrasons_brac.ino,EXPLICACIO.md}`: `long distanciaCm()` (TRIG 7, ECHO 8, `pulseIn` amb timeout 30000) → objecte < 15 cm: la base gira cap a 45° i la pinça s'obre; si no, la base torna a 90° i la pinça es tanca
- Create: `Classes/SA4/codi/04_brac_potenciometres/{.ino,EXPLICACIO.md}`: el contingut de `T2_mearm_arduino.ino` com a producte d'alumnat (funcions `int llegeixAngle(int pinPot, int minim, int maxim)` i `void mouSiCal(Servo &servo, int &actual, int nou)`)
- Create: `Classes/SA4/codi/05_dos_servos_millis/{.ino,EXPLICACIO.md}`: base escombra 60↔120 cada 20 ms d'1°, pinça alterna 60/120 cada 1000 ms, tot amb `millis()`; bastida «🧗 Si t'encalles» amb esquelet `// TODO`
- Create: `Classes/SA4/img/sa4-ultrasons-brac.svg`, `sa4-brac-potenciometres.svg` (o reutilitzar `mearm-connexions-arduino.svg`), `sa4-dos-servos-millis.svg`
- Modify: `Classes/SA4/SA4_esquemes_connexions.md`

- [ ] **Step 1:** Escriure els sketches i compilar-los tots (Task 0). Esperat: 0 errors.
- [ ] **Step 2:** Escriure les EXPLICACIO i els SVG; revisar els SVG en PNG.
- [ ] **Step 3:** `py -3 tools/qa.py` → punt 13 sense sketches sense explicació.

### Task 3: SA4 · documents, reptes i solucionari

**Files:** `Classes/SA4/{README,SA4_guia_docent,SA4_fitxa_alumnat,SA4_fitxa_ampliada,SA4_checklist_alumnat,SA4_checklist_docent,SA4_exemple_resolt,SA4_diagrama_flux,SA4_katas,SA4_katas_solucions,SA4_questionari_conceptes,SA4_questionari_conceptes_solucions}.md`, `Classes/SA4/img/sa4-flux.svg`, `Reptes/Reptes_SA4.md`, `Reptes/Solucionari/SA4/{A_brac_limits,B_brac_dispensador,C_brac_replay}/` (substitueixen `A_barrera`, `B_ventilador`, `C_brac_dispensador`), `Programació didàctica/13_SA4_Moviment_servos_motors.md`.

- [ ] **Step 1:** Guia docent amb les sessions i els tallers del spec (S1 pas 0 + A-B ~35' · S2 C-D ~40' · S3 E ~45' · S4 producte + cablatge). Producte: «MeArm amb 4 potenciòmetres».
- [ ] **Step 2:** Fitxes, checklists, exemple resolt, flux, katas (un per sketch nou), qüestionari: coherents amb la guia.
- [ ] **Step 3:** Reptes A/B/C del spec + solucionaris; compilar-los.
- [ ] **Step 4:** `qa.py` net; grep dels noms antics de SA4 = 0 dins `Classes/SA4` i `Reptes`.
- [ ] **Step 5:** Commit `feat: SA4 orientada al braç MeArm` (inclou la Task 2).

### Task 4: SA5 · codi i connexions

**Files:**
- Delete: `Classes/SA5/codi/{01_name_badge,02_passes,03_nightlight,04_radio_dau}.py` + `_EXPLICACIO.md`, i les fotos que només hi feien servei (`sa5-foto-*.jpg`, `sa5-simulador-name-badge.png`) si no s'enllacen enlloc més
- Create: `Classes/SA5/codi/01_selector_articulacio.py` + `_EXPLICACIO.md`: llista `ARTICULACIONS = ["B", "E", "D", "P"]`, A = anterior, B = següent, `display.show(lletra)`
- Create: `Classes/SA5/codi/02_inclinacio.py` + `_EXPLICACIO.md`: `LLINDAR = 300`, x/y → `Image.ARROW_W/E/N/S` o `Image.DIAMOND_SMALL`; `was_gesture("shake")` → mostra `G`
- Create: `Classes/SA5/codi/03_radio_comandament.py` + `_EXPLICACIO.md`: emissor (ordres del protocol) i, a la mateixa pàgina, el receptor que les mostra; secció final «del receptor al pont» que enllaça `T2_brac_microbit_pont.py` del dossier
- Create: `Classes/SA5/img/sa5-pont-arduino.svg` (micro:bit P1/GND → UNO D0/GND, fletxa d'un sol sentit, avís 3,3 V/5 V)
- Modify: `Classes/SA5/SA5_connexions.md`

- [ ] **Step 1:** Codi + `py -3 -m py_compile` de cada `.py`.
- [ ] **Step 2:** Explicacions + SVG; `qa.py` punts 4 i 13 nets.

### Task 5: SA5 · documents, reptes i solucionari

**Files:** `Classes/SA5/{README,SA5_guia_docent,SA5_fitxa_alumnat,SA5_fitxa_ampliada,SA5_checklist_alumnat,SA5_checklist_docent,SA5_exemple_resolt,SA5_diagrama_flux,SA5_katas,SA5_katas_solucions,SA5_questionari_conceptes,SA5_questionari_conceptes_solucions}.md`, `Classes/SA5/img/sa5-flux.svg`, `Reptes/Reptes_SA5.md`, `Reptes/Solucionari/SA5/{A_selector,B_inclinacio,C_gravacio}_{minim,ampliat}.py`, `Programació didàctica/14_SA5_microbit_micropython.md`.

- [ ] **Step 1:** Guia: S1 selector · S2 inclinació + taller del cable del pont (~20') · S3 ràdio + comandament sobre el braç (~20'); es mantenen la sembra SA8 i la taula comparativa C++/Python.
- [ ] **Step 2:** Resta de documents i reptes; `py_compile`.
- [ ] **Step 3:** `qa.py` net; grep noms antics de SA5 = 0.
- [ ] **Step 4:** Commit `feat: SA5 orientada al comandament del braç` (inclou la Task 4).

### Task 6: SA6 · codi i esquemes

**Files:**
- Modify: `Classes/SA6/codi/01_llac_obert_vs_tancat/{.ino,EXPLICACIO.md}`: mode obert = `base.write(ANGLE_OBJECTIU)` i confiar; mode tancat = homing, la base baixa 1° cada 30 ms fins que D2 llegeix LOW, i aquest angle és el zero
- Delete: `Classes/SA6/codi/02_termostat_histeresi/`
- Create: `Classes/SA6/codi/02_pinca_histeresi/{.ino,EXPLICACIO.md}`: `TANCA_CM = 6`, `OBRE_CM = 10`, `bool pincaTancada`; LED d'estat opcional al + repte
- Modify: `Classes/SA6/codi/03_maquina_estats/{.ino,EXPLICACIO.md}`: `enum Estat { REPOS, MANUAL, REPLAY, EMERGENCIA };` amb polsadors D3/D4 + col·lisió D2 i pots A0-A3 en MANUAL; replay de fins a 10 punts amb `millis()`; esquelet «Si t'encalles»
- Modify: `Classes/SA6/codi/04_control_proporcional/{.ino,EXPLICACIO.md}`: `float angle += K * (consigna - angle)` amb `K = 0.1`, consigna des del pot A0, Serial Plotter consigna/angle
- Create/Modify: `Classes/SA6/img/sa6-homing.svg`, `sa6-histeresi.svg` (eixos distància/estat pinça), `sa6-llac-tancat.svg` (diagrama de blocs del braç)
- Modify: `Classes/SA6/SA6_esquemes_connexions.md`

- [ ] **Step 1:** Sketches + compilació. Esperat: 0 errors.
- [ ] **Step 2:** Explicacions + SVG revisats en PNG; `qa.py` punt 13 net.

### Task 7: SA6 · documents, reptes, solucionari i prova T2

**Files:** `Classes/SA6/{README,SA6_guia_docent,SA6_fitxa_alumnat,SA6_fitxa_ampliada,SA6_checklist_alumnat,SA6_checklist_docent,SA6_exemple_resolt,SA6_diagrama_flux,SA6_katas,SA6_katas_solucions,SA6_questionari_conceptes,SA6_questionari_conceptes_solucions}.md`, `Classes/SA6/img/sa6-flux.svg`, `Reptes/Reptes_SA6.md`, `Reptes/Solucionari/SA6/{A_pinca_histeresi,B_homing_sequencia,C_proporcional_4}/` (substitueixen A/B/C actuals), `Avaluació/Prova_practica_T2.md`, `Programació didàctica/15_SA6_Sistemes_control.md`.

- [ ] **Step 1:** Guia: S1 homing + taller de col·lisió · S2 pinça amb histèresi + angles límit i cablatge · S3 màquina d'estats del braç (producte) · S4 prova.
- [ ] **Step 2:** Prova T2 segons el spec (mateixa graella de 10 punts i pesos); solució orientativa compilada en un fitxer temporal del scratchpad.
- [ ] **Step 3:** Resta de documents, reptes i solucionaris; compilació.
- [ ] **Step 4:** `qa.py` net; grep noms antics de SA6 = 0.
- [ ] **Step 5:** Commit `feat: SA6 i prova T2 orientades al braç`.

### Task 8: Transversals

**Files:** `Classes/00_General/{00_Mini_checks_individuals,00_Banc_activacio_repas,00_Galeria_exemples_objectes,00_Mapa_SA_objectes,00_Targetes_rescat,00_Tauler_reptes}.md` (on calgui), `Classes/SA2/SA2_guia_docent.md`, `Classes/SA7/SA7_guia_docent.md` (referències a pràctiques eliminades), `web/_generador/quadern_sessions.py` (títols de sessió T2), `Material Classroom/sa_definicions.js`, `Programació didàctica/{08_Sequenciacio_temporal_anual,09_Materials_recursos_per_unitat,09b_Guia_compra_pressupost,09c_Inventari_kits_disponibles}.md`, `Recursos/plantilles_laser/LLEGEIX-ME.md` (MeArm passa a principal).

- [ ] **Step 1:** Actualitzar els títols de sessió al quadern i a Classroom (només fitxers; **no s'executa cap script contra Classroom**).
- [ ] **Step 2:** Material/compra: +1 servo MG90S, +1 potenciòmetre i suport d'ultrasons per alumne/a.
- [ ] **Step 3:** Commit `docs: transversals del T2 alineats amb el braç`.

### Task 9: Verificació global, PDFs i publicació

- [ ] **Step 1:** Regenerar la web (`py -3 web/_generador/generar.py`) i els PDFs (`py -3 web/_generador/generar_pdf.py`, o el procediment del repo).
- [ ] **Step 2:** Grep Review Focus 1-3: 0 coincidències.
- [ ] **Step 3:** Compilar tots els `.ino` de `Classes/SA4`, `Classes/SA6`, `Reptes/Solucionari/SA4`, `Reptes/Solucionari/SA6`, `Classes/Solucionari/codi`. Esperat: 0 errors.
- [ ] **Step 4:** `py -3 tools/qa.py` → `✅ QA net.`, punt 8 sense PDFs desfasats.
- [ ] **Step 5:** Commit dels PDFs, push i `gh run watch` dels dos workflows → success.
