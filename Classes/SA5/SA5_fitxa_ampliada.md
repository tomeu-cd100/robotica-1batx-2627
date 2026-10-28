# SA5 · Fitxa ampliada (aprofundiment) — micro:bit i MicroPython

> 📄 **Versió ampliada**: conté totes les activitats, rutines (revisió creuada, exit ticket, ODS…) i ampliacions. La fitxa que fa **tot l'alumnat** és la base: **[SA5_fitxa_alumnat.md](SA5_fitxa_alumnat.md)**.

> 🧑‍🎓 **Quan toca obrir-la?** És **opcional**: quan portis la **fitxa base al dia** i vulguis més (ampliacions, revisió creuada, pensament computacional). Algunes rutines (revisió creuada, exit ticket) les activarà el **docent** a l'aula quan toqui.

> 🗺️ **Quan s'usa cada apartat:** les **Activitats 1–3** segueixen les mateixes sessions que la fitxa base i la **4 (comparació C++ ↔ Python)** es tanca dins la S3 (aquí amb més detall i ampliacions) · **Si t'encalles** i **Pensament computacional**: durant el treball · **Vols més?**: amb el nucli al dia · **Exit ticket**: els últims 2' de cada sessió · **Diana**, **Revisió creuada** i **Quadern tècnic**: en tancar la SA · **Context real i ODS**: quan el docent l'activi.

**Nom:** ______________________  **Data:** __________

> Canvies de llenguatge: ara **Python** sobre micro:bit, per construir el **comandament sense fils del teu braç MeArm**. Atenció a la **indentació** (en Python és obligatòria!).

---

## Activitat 1 · El selector del comandament (S1)
0. **PREDIU** (abans d'executar): mirant [`01_selector_articulacio.py`](codi/01_selector_articulacio.py), quina lletra surt en engegar? I si prems A just en engegar? ____________________
1. Carrega'l i **comprova** la predicció. Diferència entre `display.show()` i `display.scroll()`: ________________
2. Diferència entre `was_pressed()` i `is_pressed()`: ________________
3. **Repte:** una imatge pròpia per articulació. **+ Repte:** que recordi l'última tria en engegar.

## Activitat 2 · La inclinació com a gest (S2)
1. Carrega [`02_inclinacio.py`](codi/02_inclinacio.py) i apunta `x` i `y` en quatre postures (plana, dreta, inclinada, sacsejant): ______________________
2. Quin llindar has triat? ____ Per què? ______________________
3. **Taller:** prova el braç amb [`04_brac_ordres`](codi/04_brac_ordres/EXPLICACIO.md) des del Monitor sèrie. Quina ordre has provat primer i què ha fet? ______________________
4. **Repte:** zona morta proporcional (fletxa petita / gran). **+ Repte:** que el sacseig mostri un compte de punts «gravats».

## Activitat 3 · Ràdio: el comandament del braç (S3)
1. Carrega [`03_radio_comandament.py`](codi/03_radio_comandament.py) al comandament i el receptor de prova a l'altra placa. Què han de compartir per comunicar-se? __________
2. Quina instrucció envia? `__________` Quina rep? `__________`
3. Dibuixa la cadena sencera: comandament → … → servos. ______________________
4. **Repte:** el servo esquerre amb els botons (`E+` / `E-`). **+ Repte:** el selector de la S1 dins del comandament.

## Activitat 4 · Comparació C++ ↔ Python
Completa comparant el **comandament** (Python) amb l'**Arduino que obeeix** (`04_brac_ordres`, C++):

| Aspecte | Arduino (C/C++) | micro:bit (Python) |
|---|---|---|
| Estructura del programa | `setup()` / `loop()` | |
| Final d'instrucció | `;` | |
| Blocs de codi | `{ }` | |
| Declaració de variable | `int x = 0;` | |
| Comparar un text | `if (ordre == "B+")` | |
| Mostrar un valor | `Serial.println(x)` | |

**Reflexió:** quin t'ha semblat més fàcil de llegir i per què? ________________

**Autoavaluació** (situa't; la nota és 0-10):
| Criteri | Nivell |
|---|---|
| El programa Python funciona i està ben indentat (R1) | ☐ NA ☐ AS ☐ AN ☐ AE |
| La taula comparativa C++/Python és clara i correcta (R4) | ☐ NA ☐ AS ☐ AN ☐ AE |

---

## Treballes sol/a… però no aïllat/da

El programa i el producte són **teus**: els fas i els lliures tu. Això no vol dir treballar en silenci:

- apunta al quadern **qui t'ha ajudat i a qui has ajudat** (i com);
- abans de tancar el producte, fes la **revisió creuada de codi** de més avall.

> Si el professor t'ajunta puntualment amb algú (la **prova de ràdio**, material que falla), repartiu-vos només dos papers: **qui escriu** i **qui verifica**, i intercanvieu-los a mitja sessió. Cadascú documenta el seu al quadern.

---

## Si t'encalles

1. **Pista 1:** revisa la **indentació** (en Python els blocs es marquen amb espais, no amb `{ }`).
2. **Pista 2:** comprova que el codi és al fitxer `main.py` i que la placa està ben connectada.
3. **Pista 3:** aplica la **rutina DEPURA** i demana ajuda **explicant què ja has provat**.

> **DEPURA:** **D**escriu · **E**xamina (errors de Python, indentació) · **P**rova una hipòtesi cada cop · **U**bica · **R**epara · **A**punta-ho.

## Vols més?

- **Reptes ⭐:** [`Reptes/Reptes_SA5.md`](../../Reptes/Reptes_SA5.md) (selector per ràdio, zona morta proporcional, gravació amb sacseig).
- **Simulador:** prova el codi a **python.microbit.org** (sense maquinari).

---

## Pensament computacional d'aquesta SA

Treballes la programació **per esdeveniments** (reaccionar a botons, sacsejades, ràdio), l'**ABSTRACCIÓ** (els sensors integrats amaguen la complexitat) i els **PROTOCOLS** (un acord de missatges entre dues màquines). Quines ordres té el protocol del teu braç i qui les entén? ______________________

## Diana d'autoavaluació

Situa't (0-10):

| Criteri | Insuficient | Suficient/Bé | Notable | Excel·lent |
|---|---|---|---|---|
| Escric Python ben indentat que funciona | ☐ | ☐ | ☐ | ☐ |
| Faig servir l'acceleròmetre amb un llindar | ☐ | ☐ | ☐ | ☐ |
| Comunico dues plaques per ràdio i moc el braç a distància | ☐ | ☐ | ☐ | ☐ |

## Revisió creuada de codi

Prova el comandament d'un company sobre el seu braç i llegeix-ne el codi (i ell/a farà el mateix amb el teu). **Primer mira'l amb criteris de les rúbriques R1 i R4** (marca ✓ o ✗):

| Criteri | ✓/✗ |
|---|---|
| El programa funciona i està **ben indentat** (Python llegible) — R1 | |
| La **taula comparativa C++↔Python** és completa i correcta — R4 | |
| El comandament mou el braç **sense moviments sols** (llindar ben triat, grup propi) — R1 | |

Ara escriu-li el retorn — **ha de sortir de la taula**:
- Codi revisat de: ______________________
- 💡 Una millora concreta: ______________________
- ❓ Un dubte (què no has entès o li preguntaries): ______________________

## Exit ticket (abans de marxar)

1. Una cosa que he après avui: ______________________
2. Una cosa que encara no tinc clara: ______________________
3. On ho faria servir al món real: ______________________

## Context real i ODS

Els comandaments sense fils mouen grues, robots d'artificiers i braços de cirurgia a distància. **ODS 3** (salut: telecirurgia, robots que ajuden persones amb mobilitat reduïda) i **ODS 4** (educació: la micro:bit acosta la programació a tothom). Quina tasca perillosa o difícil faries fer a un braç teledirigit? ______________________

---

## Quadern tècnic (SA5)
- **Per què la indentació és important en Python?** ______________________
- **Avantatge d'usar sensors integrats:** ________________________________
- **Error trobat i solució:** ___________________________________________
