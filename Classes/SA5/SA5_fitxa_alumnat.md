# SA5 · Fitxa base — micro:bit i MicroPython · *els mateixos conceptes, un altre llenguatge*

<!-- web:only-github -->

**Nom:** ______________________  **Parella:** ______________________  **Data:** __________

<!-- /web:only-github -->

> Canvies de llenguatge: ara **Python** sobre micro:bit. Atenció a la **indentació** (en Python és obligatòria!).

## 🎯 Objectius i avaluació

**En acabar aquesta SA podré:**
1. Escriure programes **MicroPython** ben indentats que funcionen.
2. Fer servir els **sensors integrats** (acceleròmetre, llum) i la **ràdio** de la micro:bit.
3. **Comparar** la mateixa solució en C++ (Arduino) i en Python (micro:bit).

| Què lliuro | Rúbrica | On compta |
|---|---|---|
| **App micro:bit** (comptapassos, llum de nit o joc per ràdio) | **R1** | Projectes (45 %) |
| **Taula comparativa C++ ↔ Python** completa | **R4** | Projectes (45 %) |
| **Quadern tècnic** (pseudocodi, errors d'indentació resolts) | **R4** | Quadern tècnic i pràctiques (25 %) |
| Mini-check individual (inici S3) | semàfor | **No qualifica** (em situa) |

> 🪜 **Versió nucli (ja és assoliment satisfactori):** app que fa servir **un** sensor integrat o la ràdio i funciona + taula comparativa completa. **Versió completa:** app amb dues funcions o més (sensor + ràdio, registre de màxims…) i comparació comentada amb frases pròpies.

> Escala de nota 0-10, rúbriques i tot el sistema: **[Com s'avalua la matèria](../00_General/00_Avaluacio_per_alumnat.md)**.

---

## Les activitats · al Google Classroom

Aquesta fitxa es respon **en línia**, a la tasca de Google Classroom (val **10 punts**). **No cal que la responguis d'entrada**: cada activitat porta el seu **enunciat dins de la tasca**, i l'**itinerari de la portada de la SA** et diu quina toca a cada sessió. Obre-la quan comencis a treballar-hi i ves-la responent a mesura que avances:

> 👉 **[Obre la tasca: SA5 · Fitxa base (Google Classroom)](https://classroom.google.com/c/ODY4ODU4Njk0NTEy/a/ODcwNTE3NDYxNTQy/details)**

Si la tasca encara no t'apareix al Classroom, és que la SA encara no ha començat. En aquesta pàgina hi tens els **objectius i l'avaluació** (a dalt) i la rutina **DEPURA** (a sota).

<!-- web:only-github -->

## El que has de fer

### 1 · Name badge (S1)
0. **PREDIU:** mirant [`01_name_badge.py`](codi/01_name_badge.py), què farà la matriu de LED i els botons? ______________________
1. Carrega [`01_name_badge.py`](codi/01_name_badge.py) i comprova. Instrucció que desplaça text: `__________`
2. Diferència entre `display.show()` i `display.scroll()`: ______________________
3. **Repte:** badge d'emocions (A: contenta / B: trista).

### 2 · Sensors integrats (S2)
1. Comptapassos ([`02_passes.py`](codi/02_passes.py)): quin sensor s'usa? __________ Llindar: ____
2. Llum automàtic ([`03_nightlight.py`](codi/03_nightlight.py)): rang de `read_light_level()` = ____ a ____
3. **Repte:** detector d'inclinació o termòmetre amb avís.

### 3 · Ràdio (S3)
1. Carrega [`04_radio_dau.py`](codi/04_radio_dau.py) en **dues** plaques. Què han de compartir? __________
2. Instrucció que envia: `__________` · que rep: `__________`
3. **Repte:** "pedra-paper-tisora" o comandament per ràdio.

### 4 · Producte + comparació C++ ↔ Python

> ✏️ **Dissenya abans de codificar:** pseudocodi del producte al quadern (3–5 línies). Fixa't que el pseudocodi és **el mateix** en C++ i en Python: el que canvia és la sintaxi — aquesta és la gràcia de la comparació.

Tria un dels reptes com a producte i completa la comparació amb un programa senzill:

| Aspecte | Arduino (C/C++) | micro:bit (Python) |
|---|---|---|
| Estructura | `setup()` / `loop()` | |
| Final d'instrucció | `;` | |
| Blocs de codi | `{ }` | |
| Mostrar un valor | `Serial.println(x)` | |

S'avalua amb **R1** (codi) i **R4** (comparació).

<!-- /web:only-github -->

## Producte · La teva app micro:bit
Tria **un dels reptes** de la SA com a producte i completa la **comparació C++ ↔ Python** amb el teu programa. El pseudocodi és el mateix en els dos llenguatges: només canvia la sintaxi. S'avalua amb **R1** (codi) i **R4** (comparació).

## Si t'encalles (DEPURA)
> **D**escriu · **E**xamina (errors de Python, **indentació**) · **P**rova una hipòtesi cada cop · **U**bica · **R**epara · **A**punta-ho. Comprova que el codi és a `main.py`. Encara encallat? **[Targeta de rescat](../00_General/00_Targetes_rescat.md)** (comença per la 🟢).

<!-- web:only-github -->

## M'autoavaluo (Insuficient · Suficient/Bé · Notable · Excel·lent — la nota és 0-10)
| Criteri | Insuficient | Suficient/Bé | Notable | Excel·lent |
|---|---|---|---|---|
| Escric Python ben indentat que funciona | ☐ | ☐ | ☐ | ☐ |
| Faig servir sensors integrats (acceleròmetre, llum…) | ☐ | ☐ | ☐ | ☐ |
| Comunico dues plaques per ràdio | ☐ | ☐ | ☐ | ☐ |

## Quadern tècnic

> 📓 Escriu-ho a la teva entrada del **[quadern tècnic](../00_General/00_Quadern_tecnic.md)** (guia + plantilla; compta el 25 %).
- **Per què la indentació és important en Python?** ____________________
- **Avantatge d'usar sensors integrats:** _____________________________
- **Un error i com l'he resolt:** _____________________________________

<!-- /web:only-github -->

> 💻 **Sense placa?** Prova el codi al **simulador** [python.microbit.org](https://python.microbit.org).
> 📌 **Vols més?** +Reptes (wearable, xarxa de 3+ plaques), rols, coavaluació, exit ticket, pensament computacional i ODS → **[SA5_fitxa_ampliada.md](SA5_fitxa_ampliada.md)**

> 🤖 **Cap al robot del trimestre:** la comunicació per ràdio entre les dues micro:bit de la parella serà el **comandament del braç**. Guarda el codi de l'Activitat 3: el reaprofitaràs. Muntatge i integració: **[dossier del braç](../00_General/00_Projecte_T2_Brac.md)**.
