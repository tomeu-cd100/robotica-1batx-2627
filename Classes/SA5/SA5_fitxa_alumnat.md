# SA5 · Fitxa base — micro:bit i MicroPython · *els mateixos conceptes, un altre llenguatge*

<!-- web:only-github -->

**Nom:** ______________________  **Data:** __________

<!-- /web:only-github -->

> Canvies de llenguatge: ara **Python** sobre micro:bit. Però el robot no canvia: construiràs el **comandament sense fils del teu braç MeArm**. Atenció a la **indentació** (en Python és obligatòria!).

> 💻 **On programo?** A l'editor en línia **<https://python.microbit.org>** (té **simulador**: pots provar-ho tot sense placa). Escrius el codi a `main.py` i el passes a la placa amb **Send to micro:bit** (cable USB). Alternatives i detalls: [connexions i entorn](SA5_connexions.md).

## 🎯 Objectius i avaluació

**En acabar aquesta SA podré:**
1. Escriure programes **MicroPython** ben indentats que funcionen.
2. Fer servir l'**acceleròmetre** i la **ràdio** de la micro:bit per controlar el braç a distància.
3. **Comparar** la mateixa solució en C++ (Arduino) i en Python (micro:bit).

| Què lliuro | Rúbrica | On compta |
|---|---|---|
| **Comandament per ràdio del braç** (comandament + pont) | **R1** | Projectes (45 %) |
| **Taula comparativa C++ ↔ Python** completa | **R4** | Projectes (45 %) |
| **Quadern tècnic** (pseudocodi, errors d'indentació resolts) | **R4** | Quadern tècnic i pràctiques (25 %) |
| Mini-check individual (inici S3) | semàfor | **No qualifica** (em situa) |

> 🪜 **Versió nucli (ja és assoliment satisfactori):** inclinant el comandament, la base del braç gira (ràdio + pont funcionant) + taula comparativa completa. **Versió completa:** les quatre articulacions es mouen des del comandament i la comparació està comentada amb frases pròpies.

> Escala de nota 0-10, rúbriques i tot el sistema: **[Com s'avalua la matèria](../00_General/00_Avaluacio_per_alumnat.md)**.

> ✍️ **Rutina de la SA:** cada sessió amb pràctica comença amb un **kata de 10 minuts**: escriure de zero (individual, amb apunts) el bloc central del programa del dia, ABANS d'obrir el codi donat. Si ningú no el projecta, reclameu-lo! El dia del mini-check, el mini-check fa de kata.

---

## Les activitats · al Google Classroom

Aquesta fitxa es respon **en línia**, a la tasca de Google Classroom (val **10 punts**). **No cal que la responguis d'entrada**: cada activitat porta el seu **enunciat dins de la tasca**, i l'**itinerari de la portada de la SA** et diu quina toca a cada sessió. Obre-la quan comencis a treballar-hi i ves-la responent a mesura que avances:

> 👉 **[Obre la tasca: SA5 · Fitxa base (Google Classroom)](https://classroom.google.com/c/ODY4ODU4Njk0NTEy/a/ODcwNTE3NDYxNTQy/details)**

Si la tasca encara no t'apareix al Classroom, és que la SA encara no ha començat. En aquesta pàgina hi tens els **objectius i l'avaluació** (a dalt) i la rutina **DEPURA** (a sota).

<!-- web:only-github -->

## El que has de fer

### 1 · El selector del comandament (S1)
0. **PREDIU:** mirant [`01_selector_articulacio.py`](codi/01_selector_articulacio.py), quina lletra surt en engegar? I si prems B cinc vegades? ______________________
1. Carrega'l i comprova. Diferència entre `display.show()` i `display.scroll()`: ______________________
2. Per què `ARTICULACIONS[0]` és `"B"` i no `"E"`? ______________________
3. **Repte:** una imatge pròpia per a cada articulació.

### 2 · La inclinació com a gest (S2)
0. **PREDIU:** amb la placa plana, quant valdran `x` i `y`? ________ I de cantell? ________
1. Carrega [`02_inclinacio.py`](codi/02_inclinacio.py) i omple la taula mirant el gràfic (**Show data**):

| Postura | `x` | `y` | Què mostra |
|---|---|---|---|
| Plana | | | |
| Inclinada a la dreta | | | |
| Inclinada endavant | | | |

2. Llindar triat: ____ · Per què no 0? ______________________
3. **Taller:** carrega [`04_brac_ordres`](codi/04_brac_ordres/EXPLICACIO.md) a l'Arduino del braç i prova-ho escrivint al Monitor sèrie. Què fa `B+`? ________ I `P`? ________

### 3 · Ràdio (S3)
1. Carrega [`03_radio_comandament.py`](codi/03_radio_comandament.py) al comandament i el **receptor de prova** a l'altra placa. Què han de compartir perquè es parlin? __________ ⚠️ I què ha de ser **diferent** del dels teus companys, perquè el teu braç no obeeixi el seu comandament? __________
2. Instrucció que envia: `__________` · que rep: `__________`
3. **Taller:** converteix el receptor en **pont** (P1 → D0, GND → GND) i mou el braç amb el comandament.
4. **Repte:** el servo esquerre amb els botons A i B (`E+` / `E-`).

### 4 · Producte + comparació C++ ↔ Python

> ✏️ **Dissenya abans de codificar:** pseudocodi del producte al quadern (3–5 línies). Fixa't que el pseudocodi és **el mateix** en C++ i en Python: el que canvia és la sintaxi — aquesta és la gràcia de la comparació.

El producte és el **comandament del braç**. Compara'l amb la seva altra meitat, l'Arduino que obeeix les ordres (`04_brac_ordres`):

| Aspecte | Arduino (C/C++) | micro:bit (Python) |
|---|---|---|
| Estructura | `setup()` / `loop()` | |
| Final d'instrucció | `;` | |
| Blocs de codi | `{ }` | |
| Declarar una variable | `int aBase = 90;` | |
| Comparar un text | `if (ordre == "B+")` | |
| Mostrar un valor | `Serial.println(x)` | |

S'avalua amb **R1** (codi) i **R4** (comparació).

<!-- /web:only-github -->

## Producte · El comandament del braç
El teu **comandament per ràdio** (comandament + pont) movent el MeArm, i la **comparació C++ ↔ Python** entre el comandament i l'Arduino que obeeix les ordres. El protocol és el mateix en els dos llenguatges: només canvia la sintaxi. S'avalua amb **R1** (codi) i **R4** (comparació).

## Si t'encalles (DEPURA)
> **D**escriu · **E**xamina (errors de Python, **indentació**) · **P**rova una hipòtesi cada cop · **U**bica · **R**epara · **A**punta-ho. Comprova que el codi és a `main.py`. Encara encallat? **[Targeta de rescat](../00_General/00_Targetes_rescat.md)** (comença per la 🟢).

<!-- web:only-github -->

## M'autoavaluo (Insuficient · Suficient/Bé · Notable · Excel·lent — la nota és 0-10)
| Criteri | Insuficient | Suficient/Bé | Notable | Excel·lent |
|---|---|---|---|---|
| Escric Python ben indentat que funciona | ☐ | ☐ | ☐ | ☐ |
| Faig servir l'acceleròmetre amb un llindar | ☐ | ☐ | ☐ | ☐ |
| Comunico dues plaques per ràdio i moc el braç a distància | ☐ | ☐ | ☐ | ☐ |

## Quadern tècnic

> 📓 Escriu-ho a la teva entrada del **[quadern tècnic](../00_General/00_Quadern_tecnic.md)** (guia + plantilla; compta el 25 %).
- **Per què la indentació és important en Python?** ____________________
- **Què és el protocol d'ordres del braç i per què cal que sigui el mateix a les dues bandes?** ____________
- **Un error i com l'he resolt:** _____________________________________

<!-- /web:only-github -->

> 💻 **Sense placa?** Prova el codi al **simulador** [python.microbit.org](https://python.microbit.org).
> 📌 **Vols més?** +[Reptes ⭐](../../Reptes/Reptes_SA5.md) (selector per ràdio, zona morta proporcional, gravació amb sacseig), revisió creuada de codi, exit ticket, pensament computacional i ODS → **[SA5_fitxa_ampliada.md](SA5_fitxa_ampliada.md)**

> 🤖 **El robot del trimestre:** tot el que fas en aquesta SA és el **comandament del teu braç MeArm**. A la SA6, el pont també portarà les ordres d'estat (A i R) de la màquina d'estats. Pins i protocol: **[dossier del braç](../00_General/00_Projecte_T2_Brac.md)**.
