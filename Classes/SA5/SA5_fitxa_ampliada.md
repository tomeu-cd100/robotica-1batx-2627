# SA5 · Fitxa ampliada (aprofundiment) — micro:bit i MicroPython

> 📄 **Versió ampliada**: conté totes les activitats, rutines (coavaluació, exit ticket, ODS…) i ampliacions. La fitxa que fa **tot l'alumnat** és la base: **[SA5_fitxa_alumnat.md](SA5_fitxa_alumnat.md)**.

**Nom:** ______________________  **Parella:** ______________________  **Data:** __________

> Canvies de llenguatge: ara **Python** sobre micro:bit. Atenció a la **indentació** (en Python és obligatòria!).

---

## Activitat 1 · Name badge (S1)
0. **PREDIU** (abans d'executar): mirant `01_name_badge.py`, què creus que farà la matriu de LED i els botons? ____________________
1. Carrega `01_name_badge.py` i **comprova** la predicció. Quina instrucció mostra text que es desplaça? `__________`
2. Diferència entre `display.show()` i `display.scroll()`: ________________
3. **Repte:** badge d'emocions (A: contenta / B: trista). **+ Repte:** animació pròpia.

## Activitat 2 · Sensors integrats (S2)
1. Comptapassos (`02_passes.py`): quin sensor s'usa? __________ Quin llindar has posat? ____
2. Llum automàtic (`03_nightlight.py`): rang de `read_light_level()` = de ____ a ____
3. **Repte:** detector d'inclinació o termòmetre amb avís. **+ Repte:** guardar màx/mín.

## Activitat 3 · Ràdio (S3)
1. Carrega `04_radio_dau.py` en **dues** plaques. Què han de compartir per comunicar-se? __________
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

**Autoavaluació** (marca el teu nivell — NA/AS/AN/AE):
| Criteri | Nivell |
|---|---|
| El programa Python funciona i està ben indentat (R1) | ☐ NA ☐ AS ☐ AN ☐ AE |
| La taula comparativa C++/Python és clara i correcta (R4) | ☐ NA ☐ AS ☐ AN ☐ AE |

---

## Treball en equip · rols de la parella

Repartiu-vos els rols i **roteu-los** a cada sessió:

| Rol | S1 | S2 | S3 |
|---|---|---|---|
| Coordinador/a (temps, enunciat) | | | |
| Programador/a (codi Python) | | | |
| Enginyer/a de maquinari (prepara la micro:bit i prova els sensors) | | | |
| Provador/a–Documentador/a (prova + quadern) | | | |

---

## Si t'encalles

1. **Pista 1:** revisa la **indentació** (en Python els blocs es marquen amb espais, no amb `{ }`).
2. **Pista 2:** comprova que el codi és al fitxer `main.py` i que la placa està ben connectada.
3. **Pista 3:** aplica la **rutina DEPURA** i demana ajuda **explicant què ja has provat**.

> **DEPURA:** **D**escriu · **E**xamina (errors de Python, indentació) · **P**rova una hipòtesi cada cop · **U**bica · **R**epara · **A**punta-ho.

## Vols més?

- **Reptes ⭐:** `Reptes/Reptes_SA5.md` (comptapassos, llum de nit, joc per ràdio).
- **Simulador:** prova el codi a **python.microbit.org** (sense maquinari).

---

## Pensament computacional d'aquesta SA

Treballes la programació **per esdeveniments** (reaccionar a botons, sacsejades, ràdio) i l'**ABSTRACCIÓ** (els sensors integrats amaguen la complexitat). Quin esdeveniment dispara una acció al teu programa? ______________________

## Diana d'autoavaluació

Marca el teu nivell (NA/AS/AN/AE):

| Criteri | NA | AS | AN | AE |
|---|---|---|---|---|
| Escric Python ben indentat que funciona | ☐ | ☐ | ☐ | ☐ |
| Faig servir sensors integrats (acceleròmetre, llum…) | ☐ | ☐ | ☐ | ☐ |
| Comunico dues plaques per ràdio | ☐ | ☐ | ☐ | ☐ |

## Coavaluació (2 estrelles i un desig)

Intercanvieu el projecte micro:bit amb una altra parella:
- ⭐ Una cosa ben feta: ______________________
- ⭐ Una altra cosa ben feta: ______________________
- 💡 Una millora (desig): ______________________

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
