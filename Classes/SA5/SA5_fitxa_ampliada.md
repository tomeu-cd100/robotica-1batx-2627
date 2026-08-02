# SA5 · Fitxa ampliada (aprofundiment) — micro:bit i MicroPython

> 📄 **Versió ampliada**: conté totes les activitats, rutines (revisió creuada, exit ticket, ODS…) i ampliacions. La fitxa que fa **tot l'alumnat** és la base: **[SA5_fitxa_alumnat.md](SA5_fitxa_alumnat.md)**.

> 🧑‍🎓 **Quan toca obrir-la?** És **opcional**: quan portis la **fitxa base al dia** i vulguis més (ampliacions, revisió creuada, pensament computacional). Algunes rutines (revisió creuada, exit ticket) les activarà el **docent** a l'aula quan toqui.

> 🗺️ **Quan s'usa cada apartat:** les **Activitats 1–3** segueixen les mateixes sessions que la fitxa base i la **4 (comparació C++ ↔ Python)** es tanca dins la S3 (aquí amb més detall i ampliacions) · **Si t'encalles** i **Pensament computacional**: durant el treball · **Vols més?**: amb el nucli al dia · **Exit ticket**: els últims 2' de cada sessió · **Diana**, **Revisió creuada** i **Quadern tècnic**: en tancar la SA · **Context real i ODS**: quan el docent l'activi.

**Nom:** ______________________  **Data:** __________

> Canvies de llenguatge: ara **Python** sobre micro:bit. Atenció a la **indentació** (en Python és obligatòria!).

---

## Activitat 1 · Name badge (S1)
0. **PREDIU** (abans d'executar): mirant [`01_name_badge.py`](codi/01_name_badge.py), què creus que farà la matriu de LED i els botons? ____________________
1. Carrega [`01_name_badge.py`](codi/01_name_badge.py) i **comprova** la predicció. Quina instrucció mostra text que es desplaça? `__________`
2. Diferència entre `display.show()` i `display.scroll()`: ________________
3. **Repte:** badge d'emocions (A: contenta / B: trista). **+ Repte:** animació pròpia.

## Activitat 2 · Sensors integrats (S2)
1. Comptapassos ([`02_passes.py`](codi/02_passes.py)): quin sensor s'usa? __________ Quin llindar has posat? ____
2. Llum automàtic ([`03_nightlight.py`](codi/03_nightlight.py)): rang de `read_light_level()` = de ____ a ____
3. **Repte:** detector d'inclinació o termòmetre amb avís. **+ Repte:** guardar màx/mín.

## Activitat 3 · Ràdio (S3)
1. Carrega [`04_radio_dau.py`](codi/04_radio_dau.py) en **dues** plaques (si només en tens una, el professor t'ajuntarà un moment amb un company per fer la prova d'emissió-recepció; el codi l'escrius tu). Què han de compartir per comunicar-se? __________
2. Quina instrucció envia? `__________` Quina rep? `__________`
3. **Repte:** "pedra-paper-tisora" o comandament. **+ Repte:** xarxa de 3+ plaques.

## Activitat 4 · Comparació C++ ↔ Python
Completa amb un mateix programa senzill (p. ex. un comptador):

| Aspecte | Arduino (C/C++) | micro:bit (Python) |
|---|---|---|
| Estructura del programa | `setup()` / `loop()` | |
| Final d'instrucció | `;` | |
| Blocs de codi | `{ }` | |
| Declaració de variable | `int x = 0;` | |
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

- **Reptes ⭐:** [`Reptes/Reptes_SA5.md`](../../Reptes/Reptes_SA5.md) (comptapassos, llum de nit, joc per ràdio).
- **Simulador:** prova el codi a **python.microbit.org** (sense maquinari).

---

## Pensament computacional d'aquesta SA

Treballes la programació **per esdeveniments** (reaccionar a botons, sacsejades, ràdio) i l'**ABSTRACCIÓ** (els sensors integrats amaguen la complexitat). Quin esdeveniment dispara una acció al teu programa? ______________________

## Diana d'autoavaluació

Situa't (0-10):

| Criteri | Insuficient | Suficient/Bé | Notable | Excel·lent |
|---|---|---|---|---|
| Escric Python ben indentat que funciona | ☐ | ☐ | ☐ | ☐ |
| Faig servir sensors integrats (acceleròmetre, llum…) | ☐ | ☐ | ☐ | ☐ |
| Comunico dues plaques per ràdio | ☐ | ☐ | ☐ | ☐ |

## Revisió creuada de codi

Llegeix el projecte micro:bit d'un company (i ell/a llegirà el teu). **Primer mira'l amb criteris de les rúbriques R1 i R4** (marca ✓ o ✗):

| Criteri | ✓/✗ |
|---|---|
| El programa funciona i està **ben indentat** (Python llegible) — R1 | |
| La **taula comparativa C++↔Python** és completa i correcta — R4 | |
| El **sensor o la ràdio** hi aporten funció real (no decoració) — R1 | |

Ara escriu-li el retorn — **ha de sortir de la taula**:
- Codi revisat de: ______________________
- 💡 Una millora concreta: ______________________
- ❓ Un dubte (què no has entès o li preguntaries): ______________________

## Exit ticket (abans de marxar)

1. Una cosa que he après avui: ______________________
2. Una cosa que encara no tinc clara: ______________________
3. On ho faria servir al món real: ______________________

## Context real i ODS

Els microcontroladors portables són la base dels *wearables*. **ODS 3** (salut i benestar: comptapassos, alertes) i **ODS 4** (educació: la micro:bit acosta la programació a tothom). Quin *wearable* útil dissenyaries? ______________________

---

## Quadern tècnic (SA5)
- **Per què la indentació és important en Python?** ______________________
- **Avantatge d'usar sensors integrats:** ________________________________
- **Error trobat i solució:** ___________________________________________
