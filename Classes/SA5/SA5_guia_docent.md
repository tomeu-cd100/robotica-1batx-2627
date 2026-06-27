# SA5 · Guia docent — micro:bit i MicroPython: un altre paradigma

**Durada:** 7 h (3-4 sessions) · **Maquinari:** micro:bit + Micro:shield · **Llenguatge:** MicroPython
**Referència:** `Programació didàctica/14_SA5_microbit_micropython.md` · **Connexions:** `SA5_connexions.md`

## Objectius de la SA
1. Escriure programes en **MicroPython** amb la sintaxi correcta (**indentació!**).
2. Usar els **sensors integrats** de la micro:bit i la comunicació per **ràdio**.
3. **Comparar** la mateixa solució en C/C++ (Arduino) i Python (micro:bit).

## Material per parella
- 2 plaques **micro:bit** (per practicar la ràdio) + cables USB.
- Micro:shield (per a perifèrics externs, opcional).
- Entorn: **editor Python de micro:bit** (python.microbit.org) o **Thonny**. MakeCode com a pont.

## Codi de suport (`codi/`)
| Fitxer | Contingut |
|---|---|
| `01_name_badge.py` | Matriu LED, botons, imatges. |
| `02_passes.py` | Comptapassos amb l'acceleròmetre. |
| `03_nightlight.py` | Llum automàtic amb el sensor de llum. |
| `04_radio_dau.py` | Dau digital + comunicació per ràdio. |

---

## SESSIÓ 1 (2 h) — Primers passos amb MicroPython
- **Activació (10'):** *"La mateixa idea, dos llenguatges: què canviarà respecte d'Arduino?"*
- **Modelatge (25'):** editor Python de micro:bit. `from microbit import *`, `display.scroll()`, `display.show(Image...)`, botons. **Indentació** com a estructura (vs claus `{}` de C++).
- **Pràctica guiada (35'):** `01_name_badge.py`; mostren el nom i reaccionen als botons A/B.
- **Repte (40'):** badge d'emocions (botó A: contenta, botó B: trista); **+ repte:** animació pròpia amb diverses imatges.
- **Tancament (10'):** quadern; primera fila de la **taula comparativa** C++/Python.

**Punt clau:** en Python la **indentació no és estètica, és sintaxi**. No hi ha `;` ni `{}`. El simulador integrat permet provar sense placa.

---

## SESSIÓ 2 (2 h) — Sensors integrats
- **Activació (10'):** *"Quins sensors porta de sèrie la micro:bit?"* (acceleròmetre, brúixola, temperatura, llum).
- **Modelatge (25'):** `02_passes.py` (acceleròmetre, `get_strength`, llindar i antirebot) i `03_nightlight.py` (`display.read_light_level()`).
- **Pràctica guiada (35'):** comptapassos i llum automàtic.
- **Repte (40'):** detector d'inclinació (nivell) o termòmetre amb avís; **+ repte:** registrar dades i mostrar màxim/mínim.
- **Tancament (10'):** quadern.

**Punt clau:** els sensors integrats permeten projectes sense electrònica externa → ràpid prototipatge. Cal **filtrar/llindar** les lectures (com a Arduino).

---

## SESSIÓ 3 (2 h) — Ràdio i comparació de paradigmes
- **Activació (10'):** *"Com es comuniquen dues plaques sense cables?"* → ràdio.
- **Modelatge (25'):** `04_radio_dau.py`. Mòdul `radio`: `radio.on()`, `radio.config(group=...)`, `send()`, `receive()`. Gestos (`was_gesture("shake")`) i `random`.
- **Pràctica guiada (35'):** dau digital que es comparteix per ràdio entre dues plaques.
- **Repte (40'):** "pedra-paper-tisora" per ràdio o comandament a distància; **+ repte:** xarxa de 3+ plaques.
- **Comparació + tancament (15'):** completar la **taula comparativa C++ ↔ Python** d'un mateix programa (p. ex. comptador) i reflexionar sobre els dos paradigmes.

**Punt clau:** dues plaques han de compartir el **mateix `group`** per comunicar-se. Comparació: Python (sintaxi neta, sense tipus explícits, ràpid de prototipar) vs C/C++ (més control del maquinari, tipat, eficiència).

## Errors freqüents
| Error | Causa | Solució |
|---|---|---|
| `IndentationError` | Indentació incorrecta | Usar 4 espais coherents; no barrejar tabs/espais. |
| El programa no reacciona als botons | Lògica fora del `while True` | Posar la lectura dins del bucle. |
| La ràdio no rep res | `group` diferent o `radio.off()` | Mateix `group`; `radio.on()` a l'inici. |
| Comptapassos compta de més | Sense antirebot | Afegir `sleep()` després de detectar. |

**Producte:** aplicació amb micro:bit (comptapassos, nightlight o joc per ràdio) + **taula comparativa** C++/Python.
**Avaluació:** rúbriques **R1** (codi) i **R4** (documentació/comparativa).
