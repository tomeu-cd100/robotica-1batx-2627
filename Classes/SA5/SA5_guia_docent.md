# SA5 · Guia docent — micro:bit i MicroPython: un altre paradigma

**Durada:** 7 h (3-4 sessions) · **Maquinari:** micro:bit + Micro:shield · **Llenguatge:** MicroPython
**Referència:** [`Programació didàctica/14_SA5_microbit_micropython.md`](../../Programació%20didàctica/14_SA5_microbit_micropython.md) · **Connexions:** [`SA5_connexions.md`](SA5_connexions.md)

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
| [`01_name_badge.py`](codi/01_name_badge.py) | Matriu LED, botons, imatges. |
| [`02_passes.py`](codi/02_passes.py) | Comptapassos amb l'acceleròmetre. |
| [`03_nightlight.py`](codi/03_nightlight.py) | Llum automàtic amb el sensor de llum. |
| [`04_radio_dau.py`](codi/04_radio_dau.py) | Dau digital + comunicació per ràdio. |

## Mètode de projecte i continuïtat
- **Cicle de treball** (com a tot el curs): *analitzar → dissenyar → prototipar → provar → millorar* (vegeu SA1). El **producte** n'és el recorregut complet i el **quadern tècnic** el documenta.
- **Lectura de codi amb PRIMM:** també en Python. A cada *modelatge* l'alumnat **prediu** què farà el programa **abans** d'executar-lo (al simulador o a la placa), després l'**investiga**, el **modifica** i en **crea** un de nou. **Operativa (val per a totes les sessions amb codi):** dedica els primers ~5' del Modelatge a projectar el codi nou **sense executar-lo** i recollir prediccions; només després, executa i investiga.
- **Pont (d'on venim / on anem):** ve de la **SA4** (Arduino/C++) → portem a la **SA6** (control, torna a Arduino). Aquí s'obre el **fil dels dos llenguatges** (C/C++ ↔ Python, criteri **CA1.2**): els mateixos conceptes en dos paradigmes. Es reprendrà a la **SA8**.
- **Bastida de transició:** **MakeCode** (blocs) com a pont abans del codi Python per a qui ho necessiti.

---

## SESSIÓ 1 (2 h) — Primers passos amb MicroPython

> 🔗 **Bastida prèvia (SA0):** abans de començar, deriva l'alumnat que ho necessiti a [`Classes/SA0/SA0_guia_programacio.md`](../SA0/SA0_guia_programacio.md), **Part B (MicroPython)** i **Part C (comparativa C++↔Python)**, per amortir el canvi de llenguatge.

- **Activació (10'):** *"La mateixa idea, dos llenguatges: què canviarà respecte d'Arduino?"*
- **Modelatge (25'):** editor Python de micro:bit. `from microbit import *`, `display.scroll()`, `display.show(Image...)`, botons. **Indentació** com a estructura (vs claus `{}` de C++).
- **Pràctica guiada (35'):** [`01_name_badge.py`](codi/01_name_badge.py); mostren el nom i reaccionen als botons A/B.
- **Repte (40'):** badge d'emocions (botó A: contenta, botó B: trista); **+ repte:** animació pròpia amb diverses imatges.
- **Tancament (10'):** quadern; primera fila de la **taula comparativa** C++/Python.

**Punt clau:** en Python la **indentació no és estètica, és sintaxi**. No hi ha `;` ni `{}`. El simulador integrat permet provar sense placa.

---

## SESSIÓ 2 (2 h) — Sensors integrats
- **Activació (10'):** *"Quins sensors porta de sèrie la micro:bit?"* (acceleròmetre, brúixola, temperatura, llum).
- **Modelatge (25'):** [`02_passes.py`](codi/02_passes.py) (acceleròmetre, `get_strength`, llindar i antirebot) i [`03_nightlight.py`](codi/03_nightlight.py) (`display.read_light_level()`).
- **Pràctica guiada (35'):** comptapassos i llum automàtic.
- **Repte (40'):** detector d'inclinació (nivell) o termòmetre amb avís; **+ repte:** registrar dades i mostrar màxim/mínim.
- **Tancament (10'):** quadern.

**Punt clau:** els sensors integrats permeten projectes sense electrònica externa → ràpid prototipatge. Cal **filtrar/llindar** les lectures (com a Arduino).

---

## SESSIÓ 3 (2 h) — Ràdio i comparació de paradigmes
- **Activació (10'):** *"Com es comuniquen dues plaques sense cables?"* → ràdio.
- **Modelatge (25'):** [`04_radio_dau.py`](codi/04_radio_dau.py). Mòdul `radio`: `radio.on()`, `radio.config(group=...)`, `send()`, `receive()`. Gestos (`was_gesture("shake")`) i `random`.
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

### Mapa d'avaluació (traçabilitat)
| Instrument | Què evidencia | Criteri | Rúbrica |
|---|---|---|---|
| Producte (app micro:bit) | Programa en MicroPython amb sensors i/o ràdio | CA1.2 | R1 |
| Taula comparativa C++ ↔ Python | Comparar la mateixa solució en dos llenguatges | CA1.2 | R4 |
| Repte de codi Python | Sintaxi (indentació), funcions, lectura de sensor | CA1.2 | R1 |
| Quadern tècnic | Comparativa, errors i millores; decisió de disseny | CA1.2, CA3.1 | R4 |

*(CA1.2 = programar en MicroPython i comparar-ho amb C/C++; CA3.1 = implementar/explicar control bàsic. Vegeu [`Programació didàctica/06_Avaluacio_criteris_qualificacio.md`](../../Programació%20didàctica/06_Avaluacio_criteris_qualificacio.md). Comparteix R1 i R4 **abans** de començar.)*

---

## Guió de modelatge (què verbalitzar)

> Frases i preguntes clau per al **Modelatge** de cada sessió (què mirar, què preguntar abans d'executar, error a anticipar).

- **S1 · `01_name_badge` (sintaxi Python):** èmfasi clau — *en Python la **indentació és sintaxi**, no estètica; no hi ha `;` ni `{}`*. Compara visualment amb un sketch d'Arduino. Usa el **simulador** per provar sense placa. *Error a anticipar:* `IndentationError` per barrejar tabs i espais.
- **S2 · `02_passes` / `03_nightlight` (sensors integrats):** mostra `display.read_light_level()` i l'acceleròmetre; recalca que cal **filtrar/posar llindar** a les lectures, igual que a Arduino. *Error a anticipar:* el comptapassos compta de més sense antirebot.
- **S3 · `04_radio_dau` (ràdio):** les dues plaques han de compartir el **mateix `group`**. Demana predir què passa si una placa té un `group` diferent. Tanca completant la **taula comparativa C++↔Python**. *Error a anticipar:* oblidar `radio.on()`.

## Atenció a la diversitat (DUA)

| Via | Mesura |
|---|---|
| **Bastida** (qui s'encalla) | **MakeCode (blocs)** com a pont abans del Python; **simulador** (python.microbit.org) per provar sense placa; donar l'esquelet `while True:` indentat. |
| **+ Ampliació** (qui va sobrat) | Xarxa de 3+ plaques per ràdio, registre de màx/mín, animacions pròpies; reptes ⭐ de [`Reptes/Reptes_SA5.md`](../../Reptes/Reptes_SA5.md). |
| **Representació múltiple** | Blocs ↔ codi, simulador visual, taula comparativa C++/Python. |
| **Implicació** | Cada parella tria el projecte (badge, comptapassos, nightlight o joc per ràdio). |

## Treball cooperatiu amb rols

Parelles amb **rols rotatius**: Coordinador/a · Programador/a (Python) · Enginyer/a de maquinari (prepara la micro:bit i prova els sensors/ràdio) · Provador/a–Documentador/a. Quadre per rotar a la fitxa.

## Pensament computacional i depuració

- **PC d'aquesta SA:** programació **per esdeveniments** (botons, gestos, ràdio) i **abstracció** (sensors integrats).
- **Depuració:** rutina **DEPURA**; l'error més típic és l'**indentació** (`IndentationError`) → la U d'*Ubica* sovint és una línia mal sagnada.

## Avaluació formativa (instruments)

- **Diana d'autoavaluació** (fitxa) · **Coavaluació** "2 estrelles i un desig" · **Exit ticket** de tancament.

## Context real i ODS

- **Context:** *wearables*, dispositius de salut, joguines i material educatiu programable.
- **ODS 3** (salut i benestar: comptapassos, alertes) i **ODS 4** (educació de qualitat: la micro:bit democratitza la programació).
