# SA5 · micro:bit i MicroPython: un altre paradigma

Cinquena situació d'aprenentatge (**6 h · 3 sessions** + 4a opcional d'ampliació, 2n trimestre). **Canvi de plataforma i de llenguatge**: de l'Arduino (C/C++) a la **micro:bit** amb **MicroPython**. I tot serveix per a una cosa: el **comandament sense fils del teu braç MeArm**. Es treballen la matriu LED i els botons (el selector), l'**acceleròmetre** (la inclinació com a gest), la **comunicació per ràdio** (el comandament i el pont cap a l'Arduino del braç) i una **comparació explícita C/C++ ↔ Python** (el mateix protocol d'ordres en tots dos llenguatges). Programació oficial: [`Programació didàctica/14_SA5_microbit_micropython.md`](../../Programació%20didàctica/14_SA5_microbit_micropython.md).

![Fotografia d'una placa micro:bit real (v2)](img/microbit-foto.jpg)

> *Fotografia: micro:bit, per [SimonWaldherr](https://commons.wikimedia.org/wiki/File:Bbc_micro_bit.jpg) — llicència [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/).*

## 📦 Què has d'entregar

| Quan | Lliurable | On es lliura |
|---|---|---|
| S1 | [Activitat 1 · El selector del comandament](SA5_fitxa_alumnat.md#1-el-selector-del-comandament-s1) | [Tasca de Classroom](https://classroom.google.com/c/ODY4ODU4Njk0NTEy/a/ODcwNTE3NDYxNTQy/details) |
| S2 | [Activitat 2 · La inclinació com a gest](SA5_fitxa_alumnat.md#2-la-inclinacio-com-a-gest-s2) | Mateixa tasca de Classroom |
| S3 | [Activitat 3 · Ràdio](SA5_fitxa_alumnat.md#3-radio-s3) i [Activitat 4 · Producte: comparació C++/Python](SA5_fitxa_alumnat.md#4-producte-comparacio-c-python) (es tanca dins la S3) | Mateixa tasca de Classroom |
| ⭐ | [Repte triat (A, B o C)](../../Reptes/Reptes_SA5.md) | El docent el valida i pinteu l'estrella al [tauler de reptes](../00_General/00_Tauler_reptes.md) |
| 📓 | Full del quadern tècnic de cada sessió | En paper, en acabar la sessió |
| 🤖 | El braç obeint ordres (S2) i movent-se amb el comandament per ràdio a través del pont (S3) | Torns de taller de les S2-S3: [dossier del braç](../00_General/00_Projecte_T2_Brac.md) |

## Itinerari per sessions

> La teva feina és a la **[fitxa base](SA5_fitxa_alumnat.md)**. Aquesta ruta et diu què toca fer a cada sessió i què necessites en aquell moment. Les respostes de la fitxa es lliuren a la **[tasca de Classroom](https://classroom.google.com/c/ODY4ODU4Njk0NTEy/a/ODcwNTE3NDYxNTQy/details)**.

1. **Sessió 1 · Primers passos amb MicroPython** — obre l'editor **[python.microbit.org](https://python.microbit.org)** (en línia, amb simulador; tot el detall a [connexions i entorn](SA5_connexions.md)) i fes l'[Activitat 1 de la fitxa](SA5_fitxa_alumnat.md#1-el-selector-del-comandament-s1).
2. **Sessió 2 · La inclinació com a gest** — fes l'[Activitat 2](SA5_fitxa_alumnat.md#2-la-inclinacio-com-a-gest-s2). **Taller (20'):** el braç obeeix ordres del Monitor sèrie i hi connectes el cable del pont.
3. **Sessió 3 · Ràdio: el comandament del braç** — fes l'[Activitat 3](SA5_fitxa_alumnat.md#3-radio-s3), amb el [diagrama de flux del comandament](SA5_diagrama_flux.md) i el [codi](codi/). **Taller (20'):** el pont i el braç movent-se amb el comandament.
4. **Producte · comparació C++/Python** — fes l'[Activitat 4](SA5_fitxa_alumnat.md#4-producte-comparacio-c-python) (s'avalua amb R1 codi + R4 documentació).
5. **Abans d'entregar** — repassa [el meu checklist](SA5_checklist_alumnat.md).

### Si vols més

- [Fitxa ampliada](SA5_fitxa_ampliada.md) — aprofundiment i ampliacions.
- [Reptes de la SA5](../../Reptes/Reptes_SA5.md) — tria el teu context.

<!-- web:only-github -->
## Contingut

| Fitxer | Descripció |
|---|---|
| [`SA5_guia_docent.md`](SA5_guia_docent.md) | Guia del professorat: objectius, sessions, mètode de projecte, mapa d'avaluació i errors freqüents. |
| [`SA5_fitxa_alumnat.md`](SA5_fitxa_alumnat.md) | **Fitxa base** (nucli d'una cara, per a tot l'alumnat): Activitats 1-4 + quadern. |
| [`SA5_fitxa_ampliada.md`](SA5_fitxa_ampliada.md) | **Versió ampliada** (aprofundiment): totes les rutines (revisió creuada de codi, exit ticket, ODS, PC) i ampliacions. |
| [`SA5_checklist_docent.md`](SA5_checklist_docent.md) | **Checklist docent** (una cara): logística prèvia, punts de control per sessió, avaluació i diversitat. |
| [`SA5_checklist_alumnat.md`](SA5_checklist_alumnat.md) | **Checklist alumnat** (una cara): què he de fer/lliurar + autoavaluació amb semàfor. |
| [`SA5_katas.md`](SA5_katas.md) | Katas d'escriptura (10'): un per sessió de codi, abans d'obrir el sketch; si ningú no el projecta, l'alumnat l'obre sol. |
| [`SA5_katas_solucions.md`](SA5_katas_solucions.md) | **Solucions dels katas** (docent): codi resolt amb els valors de la variació + comentaris per a la posada en comú. |
| [`SA5_connexions.md`](SA5_connexions.md) | Entorn de la micro:bit i el cable del pont cap a l'Arduino del braç. |
| `codi/` | Programes MicroPython (vegeu la taula següent). |

### Codi (`codi/`)

| Programa | Què mostra |
|---|---|
| [`01_selector_articulacio.py`](codi/01_selector_articulacio.py) | Matriu LED, botons i llistes; indentació de Python. El selector del comandament. |
| [`02_inclinacio.py`](codi/02_inclinacio.py) | Acceleròmetre amb llindars: la inclinació com a gest (i el sacseig). |
| [`03_radio_comandament.py`](codi/03_radio_comandament.py) | El comandament per ràdio. La seva pàgina inclou el receptor de prova i el **pont** cap a l'Arduino. |
| [`04_brac_ordres.ino`](codi/04_brac_ordres/04_brac_ordres.ino) | **Arduino (C++):** el braç obeeix les ordres de text que li arriben pel Serial. |

Cada programa té la seva **pàgina de pràctica** a la web (per què es fa + codi explicat per blocs); a GitHub, l'explicació és al `<nom>_EXPLICACIO.md` del costat de cada `.py` (i a l'`EXPLICACIO.md` de la carpeta del `.ino`).

<!-- /web:only-github -->

## Producte i avaluació

- **Producte:** el **comandament per ràdio del braç** (comandament + pont, el braç obeint) + **taula comparativa C++/Python**.
- **Criteris:** CA1.2 (MicroPython i comparació amb C/C++), CA3.1 · **Rúbriques:** **R1** (codi) i **R4** (documentació/comparativa).

## Continuïtat

Ve de la **SA4** (el braç amb potenciòmetres) i porta a la **SA6** (la màquina d'estats del braç, torna a Arduino). Aquí s'obre el **fil dels dos llenguatges**: els mateixos conceptes (variables, funcions, sensors, bucles) en **dos paradigmes**. Aquest fil es reprendrà a la **SA8** (telemetria i IA amb micro:bit/Python).
