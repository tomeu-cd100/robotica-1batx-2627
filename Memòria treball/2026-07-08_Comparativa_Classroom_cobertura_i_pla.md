# 2026-07-08 · Comparativa Classroom ↔ repositori: cobertura i pla

## Context

El **repositori és la font de veritat** («la mare») del material que s'impartirà.
El **Google Classroom «Robòtica 1r Batx Curs 26/27»** (id `ODY4ODU4Njk0NTEy`)
és l'aula real on es publicarà. Aquest document compara tots dos, identifica
**què ja està materialitzat a cada banda**, **què falta muntar** i **què val la
pena rescatar del Classroom cap al repo**.

> **Estat del Classroom (08-07-2026):** 2 temes (**Arduino**, **Programació**),
> **56 elements, tots en esborrany** (cap publicat encara).

---

## 1. Inventari del Classroom (resum)

### Tema «Arduino» (36 ítems) — curs basat en l'*Arduino Starter Kit*, sobre Chromebooks
- **Onboarding:** Taller inventari kit · Instal·lar extensió Arduino (Chromebooks) · App Arduino Chromebooks · Arduino web editor · Creació web al Portafoli
- **Teoria + qüestionaris:** Cap.1 Introducció (+Q1) · Cap.2 Placa UNO (+Q2 + presentació placa) · Cap.3 Programar (+Q3) · Cap.4-7 IN/OUT digitals · Cap.8-9 analògics
- **Pràctiques 1→9:** LED onboard · LED extern D13 · sortides digitals D10 · 3 LED seqüencial/simultani (P4/P4v2) · LED per polsador · alarma 2 polsadors · potenciòmetre · LED analògic (pot.+LDR) · PWM
- **Referència:** Tipus de sensors · Biosensors · Optoacoblador · PINs analògics · PINs digitals
- **Projectes:** domòtica · mesurador nivell d'aigua · alarma ultrasons · llums d'escala · obertura de portes · propostes de projectes

### Tema «Programació» (20 ítems) — íntegrament Scratch (pont inicial)
- Línia de temps dels llenguatges · 12 reptes bàsics (1→12) · Tangram · Rètol bústia · Joc d'Asteroides · Joc d'Obstacles · Com entregar tasques Scratch · Actualitzar imatge de perfil Scratch

---

## 2. Mapa de cobertura SA (repo) ↔ Classroom

> ⚠️ **Precisió important:** el repo **ja té material d'alumnat complet per a les 9 SA**
> (`guia_docent` + `fitxa_alumnat` + `fitxa_ampliada` + esquemes + reptes + solucionaris
> dels 3 trimestres). Per tant el «buit» **no és al repo**: és al **Classroom**, on encara
> no s'ha publicat res de T2-T3. La columna «Estat al Classroom» ho indica.

| SA (repo) | Repo | Estat al Classroom | Material del Classroom aprofitable |
|---|---|---|---|
| **SA0** Pont programació | ✅ complet | 🟢 cobert (complementari) | Tot el bloc **Scratch** → pont **visual** previ al C/C++ |
| **SA1** Introducció | ✅ complet | 🟢 molt cobert | Cap.1-3 + Q1-Q3 + presentació placa + P1 + onboarding kit/IDE |
| **SA2** Sortides / PWM | ✅ complet | 🟢 ben cobert | Cap.4-7 · P2 · P3 · P4/P4v2 · P9 (PWM) |
| **SA3** Entrades / sensors | ✅ complet | 🟢 ben cobert | Cap.8-9 · P5-P8 · sensors/biosensors/PINs · alarma ultrasons |
| **SA4** Moviment (servos/motor/pont H) | ✅ complet | 🔴 **buit** | — (només `optoacoblador`, tangencial) |
| **SA5** micro:bit / MicroPython | ✅ complet | 🔴 **buit total** | — |
| **SA6** Sistemes de control | ✅ complet | 🟡 parcial | Projectes aplicats (domòtica, nivell d'aigua, llums escala, portes) **sense la teoria** de llaç obert/tancat ni màquines d'estats |
| **SA7** Robòtica mòbil | ✅ complet | 🔴 **buit** | — |
| **SA8** IoT / IA | ✅ complet | 🔴 **buit** | — |
| **SA9** Projecte final | ✅ complet | 🟡 parcial | `Propostes de projectes` → banc de reptes (sense estructura àgil/dossier) |

**Lectura ràpida:** el Classroom materialitza, de fet, **el 1r trimestre** (fonaments
Arduino + pont Scratch). **T2-T3 (SA4-SA9)** és tot per muntar-hi — però el repo
**ja ho té fet**, així que és feina de **publicació**, no de creació.

---

## 3. Bloc A — Ja fet i publicable (T1)

El Classroom aporta per a SA0-SA3 material **provat a l'aula** que es pot reordenar
sota l'estructura de SA:

- **SA1** ← Cap.1-3 + Q1-Q3 + presentació placa + P1 + onboarding.
- **SA2** ← Cap.4-7 + P2, P3, P4/P4v2, P9.
- **SA3** ← Cap.8-9 + P5-P8 + fitxes de sensors + alarma ultrasons.
- **SA0** ← bloc Scratch com a rampa visual (mantenir com a **pont inicial**).

> El repo hi posa el marc competencial que al Classroom no hi és: CE/CA, reptes,
> productes, rúbriques (R1-R5), seguretat i prova diagnòstica.

---

## 4. Bloc B — Pla de muntatge T2-T3 al Classroom (SA4-SA9)

El material existeix al repo; la tasca és **publicar-lo** i crear les poques peces
natives del Classroom. Ordre proposat (per calendari i dependències):

| Ordre | SA | Font al repo (ja feta) | Peces natives a crear al Classroom |
|---|---|---|---|
| 1 | **SA4** Moviment | `13_SA4…`, `Classes/SA4/*`, `SA4_esquemes_connexions` | tasques servo/motor DC/pont H; ⚠️ **comprar L298N** (vegeu `09c`) |
| 2 | **SA5** micro:bit | `14_SA5…`, `Classes/SA5/*`, `SA5_connexions` | bloc nou de plataforma (MicroPython) |
| 3 | **SA6** Control | `15_SA6…`, `Classes/SA6/*` | **teoria** llaç obert/tancat + màquines d'estats (els projectes ja hi són) |
| 4 | **SA7** Robòtica mòbil | `16_SA7…`, `Classes/SA7/*`, `SA7_recursos_video_IA` | bloc Imagina 3dBot |
| 5 | **SA8** IoT / IA | `17_SA8…`, `Classes/SA8/*`, `SA8_practica_teachable_machine` | bloc telemetria + IA |
| 6 | **SA9** Projecte final | `18_SA9…`, `Classes/SA9/plantilles/*` | estructura àgil + dossier (integrar propostes del Classroom) |

**Acció estructural recomanada:** reorganitzar el Classroom de 2 temes (Arduino/Programació)
a **10 temes = SA0…SA9** (o agrupats per trimestre), per alinear l'aula amb el repo.

---

## 5. Bloc C — Pla de rescat Classroom → repo

Peces que ja tens fetes al Classroom i que el repo **no incorpora encara**:

| Del Classroom | Cap a on (repo) | Nota |
|---|---|---|
| **Qüestionaris Cap.1-3** | `Classes/SA1/` i `Classes/SA2/` (nou fitxer tipus test) | El repo té solucionaris/proves però no aquests tests curts |
| **Fitxes referència** (optoacoblador, PINs analògics/digitals, biosensors) | `Recursos/` o `Classes/00_General/` | Annexos de consulta |
| **Guia web editor** (extensió + app Chromebook) | `Classes/SA0/` o `Recursos/` | Plataforma **mixta**: cal la via web editor **a més** de l'IDE |
| **Propostes de projecte** (nivell d'aigua, llums escala, portes) | `Classes/SA9/plantilles/Banc_de_reptes.md` i SA6 | Ampliar el banc existent |

---

## 6. Decisions i notes obertes

- **Plataforma mixta** (Chromebook web editor **+** Arduino IDE): `SA0_guia_programacio`
  assumeix l'IDE d'escriptori; convé afegir-hi la via **web editor** en paral·lel.
- **Pont Scratch:** es manté com a rampa inicial → afegir a SA0 una passarel·la
  explícita **Scratch → C/C++** (pendent; no seleccionat en aquesta ronda).
- **Nivelació:** els «capítols» del Classroom són d'estil introductori (Starter Kit);
  serveixen de **base**, no de sostre, respecte al nivell Batx del repo.

---

## 7. Propers passos

1. [ ] Reorganitzar el Classroom en temes = SA (estructura).
2. [ ] Publicar T1 (SA0-SA3) reordenant el material existent sota les SA.
3. [ ] Muntar T2-T3 (SA4-SA9) publicant el material del repo (ordre del §4).
4. [x] **Rescatar al repo les 4 peces del §5** — fet (vegeu «Execució» a sota).
5. [ ] (Opcional) Passarel·la Scratch→C/C++ a SA0 (la via web editor ja s'ha creat).

---

## 8. Execució del rescat (08-07-2026)

Fitxers creats/ampliats al repo a partir del material del Classroom:

| Peça (§5) | Fitxer |
|---|---|
| Guia web editor (Chromebook) | `Classes/SA0/SA0_guia_web_editor_chromebook.md` (nou) |
| Fitxes de referència (PINs, optoacoblador, sensors, biosensors) | `Classes/00_General/00_Fitxes_referencia_tecnica.md` (nou) |
| Qüestionari conceptes SA1 (Cap.1-2) | `Classes/SA1/SA1_questionari_conceptes.md` (nou) |
| Qüestionari conceptes SA2 (Cap.3 + sortides/PWM) | `Classes/SA2/SA2_questionari_conceptes.md` (nou) |
| Propostes de projecte | `Classes/SA9/plantilles/Banc_de_reptes.md` (ampliat) |

> **Nota:** els qüestionaris s'han **redactat de nou** alineats amb el material del repo
> (no s'ha extret el contingut literal dels formularis del Classroom). Segueixen el patró
> dual **paper + Google Forms autocorregible** de `SA1_prova_diagnostica.md`.

---

*Document de treball datat. Comparació feta a partir dels títols i l'estructura del
Classroom (56 ítems, tots dos temes desplegats) i del material del repositori.
Llicència CC BY-SA 4.0.*
