# Programació didàctica — Robòtica · 1r de Batxillerat (científic i tecnològic)
### Curs 2026-2027 · LOMLOE · Catalunya (Decret 171/2022)

> Conjunt de documents Markdown que conformen la programació didàctica completa de la matèria.
> **Hores:** 2 h setmanals · **Modalitat:** anual (≈ 70 h) · **Llengua:** català.
> **Referent curricular:** *Tecnologia i Enginyeria I* (Ciències i Tecnologia), especialment la **Competència específica 5** (control programat i robòtica) i el bloc de sabers **Automatització**. Vegeu la carpeta `Normativa`.

---

## 📑 Índex de documents

| # | Document | Contingut |
|---|---|---|
| 00 | `00_Index_general.md` | Aquest índex, decisions clau i com navegar. |
| 01 | `01_Introduccio_context_justificacio.md` | Context, justificació, alumnat, marc normatiu. |
| 02 | `02_Objectius_competencies.md` | Competències clau, competències específiques de la matèria i objectius. |
| 03 | `03_Sabers_i_continguts.md` | Sabers organitzats en blocs i la seva distribució. |
| 04 | `04_Metodologia.md` | Enfocament competencial, ABP, eines, espais. |
| 05 | `05_Atencio_a_la_diversitat.md` | Mesures universals, addicionals i intensives. |
| 06 | `06_Avaluacio_criteris_qualificacio.md` | Criteris d'avaluació, instruments i ponderació. |
| 07 | `07_Rubriques.md` | Rúbriques d'avaluació reutilitzables. |
| 08 | `08_Sequenciacio_temporal_anual.md` | Seqüenciació de les 9 situacions d'aprenentatge. |
| 09 | `09_Materials_recursos_per_unitat.md` | Mapatge del maquinari disponible a cada unitat. |
| 10-18 | `10_SA1...` → `18_SA9...` | Les 9 situacions d'aprenentatge (unitats) desenvolupades. |

---

## 🧭 Fil conductor de la matèria

> **"Del component al sistema autònom"**: l'alumnat avança del control d'un component electrònic fins al disseny, la programació i la documentació d'un sistema robòtic autònom que resol un repte real.

**Tres etapes (una per trimestre):**

1. **Fonaments** — Electrònica + programació estructurada amb **Arduino (C/C++)**.
2. **Control i sensors** — **micro:bit + MicroPython**, actuadors i sistemes de control.
3. **Robòtica i integració** — Robòtica mòbil, IoT/IA i **projecte/repte final**.

---

## ⚙️ Decisions de disseny preses (ajustables)

1. **Seqüència de llenguatges: Arduino C/C++ primer, Python (micro:bit) després.**
   *Justificació:* es comença pel maquinari concret i la programació estructurada de baix nivell (sabers d'electrònica i automatització), i s'introdueix Python quan ja hi ha base, per fer transferència i comparació de paradigmes. *(Si prefereixes Python-primer, es reordenen SA2-SA5.)*
2. **2 h setmanals anuals (≈ 70 h).** Si finalment són 3 h, cada SA s'amplia amb les activitats marcades com a *"+ ampliació"*.
3. **Avaluació per projectes/situacions d'aprenentatge** amb quadern tècnic (*logbook*) i defenses orals.
4. **Maquinari prioritari:** Arduino UNO + kit Keyestudio KS0011/bàsic; micro:bit + Micro:shield; placa **Imagina 3dBot (Arduino)** per a robòtica mòbil. *(LEGO/mBot descartats per nivell.)*
5. **Simuladors** (Tinkercad Circuits, Wokwi) com a suport per a aules nombroses o treball previ.

> ⚠️ **A confirmar amb el centre** (heretat de la fase de normativa): optativa oficial vs pròpia, hores exactes (2/3 h) i continuïtat a 2n. Vegeu `Normativa/01_Normativa_LOMLOE_Robotica_1Batx_Catalunya.md`.

---

## 🗺️ Mapa de seqüenciació (resum)

| Trim. | SA | Títol | Hores | Maquinari | Llenguatge |
|---|---|---|---|---|---|
| 1r | SA1 | Què és un robot? Sistemes embeguts i mètode de projecte | 6 | Arduino / simulador | — / C++ |
| 1r | SA2 | Sortides digitals i PWM: dona vida als actuadors | 8 | Arduino + KS0011 | C/C++ |
| 1r | SA3 | Entrades i sensors: el robot percep | 8 | Arduino + KS0011 | C/C++ |
| 2n | SA4 | Moviment: servos, motors i ponts H | 8 | Arduino + KS0011 | C/C++ |
| 2n | SA5 | micro:bit i MicroPython: un altre paradigma | 7 | micro:bit + Micro:shield | Python |
| 2n | SA6 | Sistemes de control: llaç obert/tancat i màquines d'estats | 8 | Arduino / micro:bit | C++ / Python |
| 3r | SA7 | Robòtica mòbil: cinemàtica i trajectòries | 8 | Imagina 3dBot | C/C++ |
| 3r | SA8 | IoT i IA: el robot connectat i intel·ligent | 6 | micro:bit ràdio / ESP32* | Python / C++ |
| 3r | SA9 | Repte final integrador (opció competició) | 10 | Lliure | Lliure |

*ESP32 opcional segons disponibilitat.*

**Total: ≈ 69 h** (+ marge per a avaluacions i imprevistos fins a ~70 h).
