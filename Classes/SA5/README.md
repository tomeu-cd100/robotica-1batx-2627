# SA5 · micro:bit i MicroPython: un altre paradigma

Cinquena situació d'aprenentatge (**7 h · 3-4 sessions**, 2n trimestre). **Canvi de plataforma i de llenguatge**: de l'Arduino (C/C++) a la **micro:bit** amb **MicroPython**. Es treballen la matriu LED i els botons, els sensors integrats (acceleròmetre, llum), la **comunicació per ràdio** entre plaques i una **comparació explícita C/C++ ↔ Python**. Programació oficial: `Programació didàctica/14_SA5_microbit_micropython.md`.

## Contingut

| Fitxer | Descripció |
|---|---|
| `SA5_guia_docent.md` | Guia del professorat: objectius, sessions, mètode de projecte, mapa d'avaluació i errors freqüents. |
| `SA5_fitxa_alumnat.md` | **Fitxa base** (nucli d'una cara, per a tot l'alumnat): Activitats 1-4 + quadern. |
| `SA5_fitxa_ampliada.md` | **Versió ampliada** (aprofundiment): totes les rutines (rols, coavaluació, exit ticket, ODS, PC) i ampliacions. |
| `SA5_connexions.md` | Connexions de la micro:bit i perifèrics via Micro:shield. |
| `codi/` | Programes MicroPython (vegeu la taula següent). |

### Codi (`codi/`)

| Programa | Què mostra |
|---|---|
| `01_name_badge.py` | Matriu LED, botons i imatges; indentació de Python. |
| `02_passes.py` | Comptapassos amb l'acceleròmetre (llindar + antirebot). |
| `03_nightlight.py` | Llum automàtic amb el sensor de llum. |
| `04_radio_dau.py` | Dau digital + comunicació per ràdio entre dues plaques. |

## Producte i avaluació

- **Producte:** aplicació amb micro:bit (comptapassos, nightlight o joc per ràdio) + **taula comparativa C++/Python**.
- **Criteris:** CA1.2 (MicroPython i comparació amb C/C++), CA3.1 · **Rúbriques:** **R1** (codi) i **R4** (documentació/comparativa).

## Continuïtat

Ve de la **SA4** (Arduino/C++, moviment) i porta a la **SA6** (control, torna a Arduino). Aquí s'obre el **fil dels dos llenguatges**: els mateixos conceptes (variables, funcions, sensors, bucles) en **dos paradigmes**. Aquest fil es reprendrà a la **SA8** (telemetria i IA amb micro:bit/Python).
