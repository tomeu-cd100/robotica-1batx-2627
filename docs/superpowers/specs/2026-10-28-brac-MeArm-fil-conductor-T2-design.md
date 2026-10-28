# Disseny · El braç MeArm com a fil conductor del 2n trimestre

**Data:** 28-10-2026 · **Estat:** aprovat pel docent (28-10-2026) · **Abast:** SA4, SA5, SA6, prova T2

## Intenció

El docent vol que el **braç robòtic sigui el fil conductor del T2**: totes les
pràctiques i explicacions de SA4-SA6 han d'anar a construir, programar i
controlar el braç. Ara el braç només creix en «torns de taller» de 15-25' i
les pràctiques principals són d'altres coses (barrera, ventilador, termòstat,
comptapassos, llum de nit, dau). Si cal, es retallen pràctiques per guanyar
temps de taller. Si cal, es fan esquemes i explicacions nous.

## Decisions del docent (28-10-2026)

1. **Estructura: només MeArm V1.1** (4 servos). Tot s'escriu per al MeArm.
2. **Pla B si el prototip falla abans de Nadal: `brac.svg`** (3 servos). Una
   nota docent explica l'adaptació: el servo esquerre (D6) no hi és.
3. **Motor DC + pont H: es manté, reduït, a la SA4.** Sense el sensor de
   velocitat.
4. **Pràctiques alienes al braç: es reconverteixen al braç** (mateix saber,
   context del braç).
5. **Reptes A/B/C de cada SA: tots són missions del braç.**
6. **micro:bit a la SA5: comandament + pont** (el braç es queda amb l'UNO tot
   el trimestre; pla actual del 24-10).
7. **El temps alliberat va a més taller de braç.**
8. **Abast:** Classes SA4-SA6 senceres, Reptes i solucionaris, Programació
   didàctica (08, 09/09b/09c, 13, 14, 15), Material Classroom.

## Objectius / no-objectius / anti-objectius

- **Objectiu:** que a cada sessió del T2 l'alumne/a aprengui el saber del dia
  fent-lo sobre el seu MeArm, i que el braç acabi muntat, cablejat i amb la
  màquina d'estats i el comandament per ràdio a la SA6-S3.
- **No objectiu:** canviar les hores (SA4 8 h, SA5 6 h, SA6 8 h), els criteris
  d'avaluació (CA), les rúbriques R1-R5 ni el model d'avaluació del curs.
- **Anti-objectius:**
  - Que una pràctica **depengui** del braç per funcionar: si un dia el braç no
    hi és, la pràctica es fa a la breadboard amb servos solts (regla vigent).
  - Perdre sabers del currículum (servo, motor DC/pont H, sensor→actuador,
    `millis()`, MicroPython, sensors integrats, ràdio, llaç obert/tancat,
    histèresi, màquina d'estats, control proporcional com a ampliació).
  - Deixar el material incoherent (fitxes, PDFs, katas, qüestionaris,
    Classroom, quadern) amb pràctiques que ja no existeixen.

## Mapa de pins del MeArm (fix per a tot el T2)

| Element | Pin | Origen |
|---|---|---|
| Servo base | D9 | dossier actual |
| Servo esquerre | D6 | guia MeArm (servo nou) |
| Servo dret | D10 | dossier (antic colze) |
| Servo pinça | D11 | dossier |
| Pot base / dret / pinça / esquerre | A0 / A1 / A2 / A3 | guia MeArm |
| Sensor de col·lisió KS0021 | D2 (`INPUT_PULLUP`, LOW = xoc) | dossier |
| Polsadors A / B (SA6, abans del pont) | D3 / D4 (`INPUT_PULLUP`) | **nou** |
| Ultrasons HC-SR04 TRIG / ECHO | D7 / D8 | **nou** (l'actual 12/11 xoca amb la pinça a D11) |
| micro:bit pont P1 → | D0 (RX) | dossier |

Servos sempre amb **piles + GND comú**. Les pràctiques de motor DC
(SA4-S2) són **fora del braç**, a la breadboard, amb els pins actuals
(ENA 5, IN1 7, IN2 8): ho diu explícitament la seva pàgina.

## Recorregut per sessions

Els torns de taller segueixen els blocs de `00_Muntatge_brac_MeArm.md`
(pas 0, blocs A-E, ~2 h en total + cablatge).

| Sessió | Pràctica (sketch nou o reconvertit) | Saber | Taller MeArm |
|---|---|---|---|
| SA4 S1 | `01_servo_potenciometre` sobre el servo de base; repte: escombrada. El pas 0 (centrar els 4 servos a 90°) es fa amb `write(90)` del mateix sketch | Servo, `Servo.h`, `map()` | Pas 0 + blocs A-B (~35') |
| SA4 S2 | `02_motor_pont_h` **reduït** (~40', fora del braç). Es treu el + repte de rampa | Motor DC, pont H, massa comuna | Blocs C-D: pinça + calibratge amb l'escombrada de la S1 (~40') |
| SA4 S3 | `03_ultrasons_brac` (**nou**, substitueix `03_sensor_velocitat`): la distància d'un objecte fa girar la base / obrir la pinça. Bastida `05_dos_servos_millis` (**reconverteix** `05_dos_leds_millis`): base escombrant + pinça obrint/tancant a ritmes diferents sense `delay()` | Sensor→actuador, `millis()` | Bloc E (estructura central, ~45', 2 persones al pas 15) |
| SA4 S4 | **Producte:** `04_brac_potenciometres` (**substitueix** `04_barrera_automatica`): MeArm amb 4 pots, rang segur per servo, zona morta | Integració | Cablatge definitiu de 4 servos + 4 pots |
| SA5 S1 | `01_selector_articulacio` (**substitueix** `01_name_badge`): A/B canvien l'articulació seleccionada (B, E, D, P) i la pantalla la mostra | `display`, botons, indentació | — |
| SA5 S2 | `02_inclinacio` (**substitueix** `02_passes` i `03_nightlight`): l'acceleròmetre dona la direcció (fletxa) amb llindars; sacsejar = «grava». Es manté la sembra SA8 (valors reals de l'acceleròmetre) | Sensors integrats, llindars | Cable del pont (P1→D0, GND) i prova d'ordres pel Monitor sèrie (~20') |
| SA5 S3 | `03_radio_comandament` (**substitueix** `04_radio_dau`): comandament que envia ordres i receptor que les mostra; després el receptor fa de pont i el MeArm es mou | Ràdio, protocol de text | Comandament sobre el braç (~20') |
| SA6 S1 | `01_llac_obert_vs_tancat` reconvertit: base cap a un angle «a cegues» (obert) vs **homing** fins al final de carrera (tancat) | Llaç obert/tancat, diagrama de blocs | Sensor de col·lisió (~20') |
| SA6 S2 | `02_pinca_histeresi` (**substitueix** `02_termostat_histeresi`): pinça automàtica amb ultrasons, tanca < 6 cm, obre > 10 cm | Tot/res, histèresi | Angles límit + cablatge endreçat i etiquetat (~20') |
| SA6 S3 | `03_maquina_estats` reconvertit: braç amb repòs/manual/replay/emergència amb polsadors D3/D4 + col·lisió. Producte final: la mateixa màquina amb les ordres del pont. Ampliació `04_control_proporcional` reconvertit: moviment suau cap a la consigna (`angle += K·error`) | `enum`/`switch`, control P | — |
| SA6 S4 | **Prova T2 reorientada** al braç | — | — |

Valors com 6/10 cm, minuts de taller i angles de prova són **crida del
dissenyador**; es poden retocar sense tocar el disseny.

## Reptes A/B/C (missions del braç)

- **SA4:** A · braç amb 4 pots i límits propis · B · dispensador: seqüència
  temporitzada agafa→porta→deixa amb un polsador · C · registre/replay amb
  arrays (grava punts amb un polsador i els reprodueix).
- **SA5:** A · comandament amb selector d'articulació (botons) · B ·
  comandament per inclinació amb zona morta · C · comandament amb gravació
  (sacseig) i retorn d'estat al comandament.
- **SA6:** A · pinça automàtica amb histèresi i LED d'estat · B · homing +
  seqüència en llaç tancat (para si hi ha xoc) · C · moviment proporcional
  suau a les 4 articulacions.

Els solucionaris de `Reptes/Solucionari/SA4-SA6` es reescriuen amb aquests
reptes (carpeta per sketch `.ino`, compilats al CI; `.py` amb py_compile).

## Prova T2 (reorientada)

- **Part A (Arduino, 6 p):** pinça automàtica amb ultrasons i **histèresi**
  (nucli) · ampliació: LED d'estat · ampliació: apropament **proporcional**
  del servo i Serial Plotter. (Mateixa graella i pesos que ara.)
- **Part B (micro:bit, 4 p):** comandament que mostra l'ordre segons la
  inclinació · ampliació: envia l'ordre per ràdio i una 2a placa la mostra.
- Material: MeArm (o servo solt + ultrasons) i 2 micro:bit.

## Materials que cal tocar

- **Classes/SA4, SA5, SA6:** sketches i `EXPLICACIO.md` (nous/reconvertits;
  els eliminats s'esborren), README, guies docents, fitxes alumnat i
  ampliada, checklists, exemple resolt, diagrama de flux, esquemes de
  connexions (**SVG nous** per a cada pràctica del braç), katas i
  solucions, qüestionaris i solucions, PDFs regenerats.
- **00_General:** dossier `00_Projecte_T2_Brac.md` reescrit per al MeArm
  (`brac.svg` → pla B), guia de muntatge (taller per sessions), fil
  conductor, portada T2, mini-checks, banc d'activació, targetes, mapa
  SA-objectes si cal.
- **Solucionari T2:** `T2_brac.ino`/`T2_brac_estats.ino` passen a 4 servos
  (o es substitueixen pels de MeArm), pont i comandament amb les ordres de
  l'esquerre (`E+`/`E-`).
- **Reptes:** `Reptes_SA4-6.md` + solucionaris + rutes del CI si canvien.
- **Programació didàctica:** 08 (sense canvi d'hores; nota), 09/09b/09c
  (4t servo MG90S, 4t potenciòmetre, ultrasons per alumne/a), 13, 14, 15.
- **Avaluació:** `Prova_practica_T2.md`.
- **Generador:** `web/_generador/quadern_sessions.py` (títols de sessió).
- **Material Classroom:** `sa_definicions.js` (títols i descripcions T2).

## Restriccions

- Comentaris de codi d'alumnat en català **sense accents**.
- Cada sketch d'alumnat amb la seva `EXPLICACIO.md` (format actual:
  per què, prediu, codi per blocs, errors, on ho aplicaràs).
- `tools/qa.py` ha de passar; el CI compila tots els `.ino`.
- `web/` és generat: no s'edita.
- Commits en català, Conventional Commits.

## Què queda al criteri del constructor

- Redacció de les explicacions, analogies, preguntes de predicció i katas.
- Disseny visual dels SVG (estil dels existents).
- Ordre exacte dels commits (recomanat: un per SA + un de transversals).
