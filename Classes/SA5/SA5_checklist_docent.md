# SA5 · Checklist docent — micro:bit i MicroPython

**6 h (3 sessions + 4a opcional d'ampliació) · micro:bit + Micro:shield · Llenguatge MicroPython · Criteris CA1.2, CA3.1 · Rúbriques R1 (codi), R4 (documentació/comparativa)**

> Eina d'acció d'una cara. Condensa la [`SA5_guia_docent.md`](SA5_guia_docent.md). Marca `[x]` a mesura que ho tinguis fet.

## 🧰 1. Logística prèvia (preparar abans de començar la SA)
- [ ] **2 plaques micro:bit per parella** (calen per practicar la ràdio) + cables USB
- [ ] Micro:shield (perifèrics externs, opcional)
- [ ] Entorn provat: **python.microbit.org** o **Thonny**; MakeCode com a pont (bastida)
- [ ] Sketches provats: `01_name_badge` · `02_passes` · `03_nightlight` · `04_radio_dau`
- [ ] 🔗 **Bastida SA0:** tenir a mà [`SA0_guia_programacio.md`](../SA0/SA0_guia_programacio.md) Part B (MicroPython) + Part C (comparativa) per amortir el canvi de llenguatge
- [ ] Compartir rúbriques **R1 i R4** amb l'alumnat *abans* del producte

## ⏱️ 2. Moments (punts de control per sessió)

**Sessió 1 — Primers passos amb MicroPython**
- [ ] Referent (1') Sophie Wilson · `01_name_badge` (`from microbit import *`, `display`, botons)
- [ ] Iniciar la **taula comparativa C++/Python** (1a fila)
- ⚠️ *Clau:* en Python la **indentació és sintaxi** (no `;` ni `{}`) · *Error:* `IndentationError` (tabs vs espais)

**Sessió 2 — Sensors integrats**
- [ ] `02_passes` (acceleròmetre, llindar, antirebot) + `03_nightlight` (`read_light_level()`)
- [ ] Filtrar/posar llindar a les lectures
- ⚠️ *Error:* comptapassos compta de més sense antirebot

**Sessió 3 — Ràdio i comparació de paradigmes**
- [ ] `04_radio_dau`: `radio.on()`, `radio.config(group=...)`, `send()`/`receive()`, gestos
- [ ] **Mini-check individual** a l'inici (10', no qualifica): programa MicroPython de memòria (vigilar indentació)
- [ ] Completar la **taula comparativa C++ ↔ Python** i reflexionar sobre els dos paradigmes
- ⚠️ *Clau:* dues plaques han de compartir el **mateix `group`** · *Error:* oblidar `radio.on()`

## 📊 3. Avaluació i evidències (a recollir)
- [ ] **App micro:bit** (comptapassos, nightlight o joc per ràdio) → **R1**, Projectes 45 %
- [ ] **Taula comparativa C++ ↔ Python** completa → **R4**, Projectes 45 %
- [ ] **Quadern tècnic** (comparativa, errors d'indentació, decisió de disseny) → **R4**, Quadern tècnic i pràctiques 25 %
- [ ] Coavaluació + **exit tickets** + registre **0–10**

## 🪜 4. Atenció a la diversitat (previst per aquesta SA)
- [ ] **Bastida:** **MakeCode (blocs)** com a pont abans del Python · **simulador** per provar sense placa · donar l'esquelet `while True:` indentat
- [ ] **+ Ampliació:** xarxa de 3+ plaques per ràdio · registre de màx/mín · animacions pròpies · [reptes ⭐ SA5](../../Reptes/Reptes_SA5.md)
- [ ] **Representació múltiple:** blocs ↔ codi · simulador visual · taula comparativa
- [ ] **Rescat:** [targetes de rescat](../00_General/00_Targetes_rescat.md) 🟢🟡🔴 a qui s'encalli
