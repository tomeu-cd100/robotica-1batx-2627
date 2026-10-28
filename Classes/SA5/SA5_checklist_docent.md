# SA5 · Checklist docent — micro:bit i MicroPython

**6 h (3 sessions + 4a opcional d'ampliació) · micro:bit + Micro:shield · Llenguatge MicroPython · Criteris CA1.2, CA3.1 · Rúbriques R1 (codi), R4 (documentació/comparativa)**

> Eina d'acció d'una cara. Condensa la [`SA5_guia_docent.md`](SA5_guia_docent.md). Marca `[x]` a mesura que ho tinguis fet.
 **Quan s'usa:** imprimeix-lo en **preparar la SA** (§1) i tingues-lo **a taula a cada sessió** (§2–§4).

## 🧰 1. Logística prèvia (preparar abans de començar la SA)
- [ ] **2 micro:bit + cables USB per alumne/a** (emissora i receptora): la ràdio de la S3 les demana totes dues i la dotació del centre hi arriba
- [ ] El **braç MeArm** de cada alumne/a amb l'Arduino (producte de SA4) i **2 cables** per al pont (P1 → D0, GND)
- [ ] Entorn provat: **python.microbit.org** o **Thonny**; MakeCode com a pont (bastida)
- [ ] Programes provats: `01_selector_articulacio` · `02_inclinacio` · `03_radio_comandament` (+ receptor i pont de la seva pàgina) · `04_brac_ordres` (Arduino)
- [ ] Llista de **grups de ràdio** (= número de llista) a la pissarra
- [ ] 🔗 **Bastida SA0:** tenir a mà [`SA0_guia_programacio.md`](../SA0/SA0_guia_programacio.md) Part B (MicroPython) + Part C (comparativa) per amortir el canvi de llenguatge
- [ ] Compartir rúbriques **R1 i R4** amb l'alumnat *abans* del producte

## ⏱️ 2. Moments (punts de control per sessió)

**Sessió 1 — Primers passos amb MicroPython**
- [ ] Referent (1') Sophie Wilson · `01_selector_articulacio` (`from microbit import *`, `display`, botons, llistes)
- [ ] ✍️ **Kata** `01_selector_articulacio` (10', abans de repartir el programa) → [SA5_katas.md](SA5_katas.md)
- [ ] Iniciar la **taula comparativa C++/Python** (1a fila)
- ⚠️ *Clau:* en Python la **indentació és sintaxi** (no `;` ni `{}`) · *Error:* `IndentationError` (tabs vs espais)

**Sessió 2 — La inclinació com a gest**
- [ ] ✍️ **Kata** `02_inclinacio` (10', abans de repartir el programa) → [SA5_katas.md](SA5_katas.md)
- [ ] `02_inclinacio` (`get_x`, `get_y`, llindar, `was_gesture`, gràfic amb **Show data**)
- [ ] 🔧 **Taller (20'):** `04_brac_ordres` a l'Arduino, prova amb el **Monitor sèrie**, cable del pont (P1 → D0, GND)
- ⚠️ *Error:* fletxes al revés (placa girada) · llindar massa baix (fletxes amb la placa plana)

**Sessió 3 — Ràdio: el comandament del braç**
- [ ] **Mini-check individual** a l'inici (10', no qualifica): programa MicroPython de memòria (vigilar indentació) (substitueix la graella d'activació i el kata del dia)
- [ ] `03_radio_comandament` + receptor de prova: `radio.on()`, `radio.config(group=...)`, `send()`/`receive()`, protocol d'ordres
- [ ] 🔧 **Taller (20'):** el receptor passa a ser el **pont** i el comandament mou el braç
- [ ] Completar la **taula comparativa C++ ↔ Python** i reflexionar sobre els dos paradigmes
- [ ] **Deures de represa:** repartir la targeta [`00_Repas_expres_Cpp.md`](../00_General/00_Repas_expres_Cpp.md) (la SA6 torna a C++)
- ⚠️ *Clau:* dues plaques han de compartir el **mateix `group`** (i diferent de la resta) · *Error:* oblidar `radio.on()`; al pont, oblidar el GND comú

## 📊 3. Avaluació i evidències (a recollir)
- [ ] **Comandament del braç** (comandament + pont, el braç obeint) → **R1**, Projectes 45 %
- [ ] **Taula comparativa C++ ↔ Python** completa → **R4**, Projectes 45 %
- [ ] **Quadern tècnic** (comparativa, errors d'indentació, decisió de disseny) → **R4**, Quadern tècnic i pràctiques 25 %
- [ ] Revisió creuada de codi (una millora concreta i un dubte) → **R5** + **exit tickets** + registre **0–10**

## 🪜 4. Atenció a la diversitat (previst per aquesta SA)
- [ ] **Bastida:** **MakeCode (blocs)** com a pont abans del Python · **simulador** per provar sense placa · receptor de prova abans del pont · el braç provat pel Monitor sèrie abans de la ràdio
- [ ] **+ Ampliació:** servo esquerre amb els botons · zona morta proporcional · gravació amb sacseig · [reptes ⭐ SA5](../../Reptes/Reptes_SA5.md)
- [ ] **Representació múltiple:** blocs ↔ codi · simulador visual · taula comparativa
- [ ] **Rescat:** [targetes de rescat](../00_General/00_Targetes_rescat.md) 🟢🟡🔴 a qui s'encalli
