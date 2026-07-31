# 2026-07-31 · Entorns de programació i itineraris coherents (SA5-SA9)

Segona tanda del dia (la primera: rampa analogia→codi a SA4). Origen: el docent
comença a repassar SA5+ i detecta que «en cap moment diu amb quina plataforma
treballar».

## 1. Entorn de programació visible (SA5-SA8)

L'entorn només constava a `SAn_connexions.md` i a les guies docents. Ara el camí
de l'alumne el troba:

- **SA5**: callout «💻 On programo?» a la fitxa (python.microbit.org, `main.py`,
  *Send to micro:bit*), editor explícit a la S1 del README i a les capçaleres de
  les 4 pàgines de pràctica.
- **SA6**: callout del retorn a **Arduino IDE/C++** després del parèntesi Python
  (fitxa + S1 de l'itinerari).
- **SA7**: mitja línia a la fitxa (Arduino IDE, com a la SA6).
- **SA8**: callout del retorn a micro:bit/MicroPython; ESP32 amb Arduino IDE.

## 2. Itineraris amb el material de cada sessió (SA6-SA9)

Regla: cada sessió de l'itinerari enllaça exactament el que cal en aquell moment.

- **SA6**: S1 esquemes+codi; proporcional reubicat a S2-S3 com a repte + (no
  entra a la prova); S4 avisa de la Part B en MicroPython amb la targeta
  `00_Repas_expres_MicroPython.md`.
- **SA7**: S1 esquemes+codi, S2 codi, S4 recorda el repte ✏️ a full en blanc.
- **SA8**: S1 enllaça emissor/receptor + meitat a full en blanc; S3 enllaça el
  classificador de gestos.
- **SA9**: diagrama del mètode a la capçalera, exemple resolt a la S1, esquelet
  `Codi_base_PLANTILLA` a la S2, S5 avisa que la prova T3 comença per la Part B
  (micro:bit) amb la targeta de repàs.

## 3. Altres

- Captures Tinkercad P4 i P5 de SA4 (SA4 completa: 5/5 amb captura + sharecode).
- Secció «🧗 Si t'encalles» a la P4 de SA4: versió completa amb `millis()`
  (taula de traducció P5→barrera + `loop()` desplegable).
- Exemple resolt SA5: mitja línia justificant `show(graus % 10)` vs `scroll`.
- Preferència d'idioma: respostes de l'assistent **sempre en català** (desat a
  la memòria persistent).

## Estat

Tot commitejat i pushat (e64f0d9..802cffa, 9 commits). QA net a cada pas.
Valoració pedagògica feta: nivell de la S1 de SA5 i de l'exemple resolt,
adequats; l'ordre exemple→pràctica és PRIMM + alliberament gradual, amb
retirada de bastida a SA7-SA9 (full en blanc).
