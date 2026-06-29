# SA5 · Fitxa base — micro:bit i MicroPython

**Nom:** ______________________  **Parella:** ______________________  **Data:** __________

> Canvies de llenguatge: ara **Python** sobre micro:bit. Atenció a la **indentació** (en Python és obligatòria!).

---

## El que has de fer

### 1 · Name badge (S1)
0. **PREDIU:** mirant `01_name_badge.py`, què farà la matriu de LED i els botons? ______________________
1. Carrega `01_name_badge.py` i comprova. Instrucció que desplaça text: `__________`
2. Diferència entre `display.show()` i `display.scroll()`: ______________________
3. **Repte:** badge d'emocions (A: contenta / B: trista).

### 2 · Sensors integrats (S2)
1. Comptapassos (`02_passes.py`): quin sensor s'usa? __________ Llindar: ____
2. Llum automàtic (`03_nightlight.py`): rang de `read_light_level()` = ____ a ____
3. **Repte:** detector d'inclinació o termòmetre amb avís.

### 3 · Ràdio (S3)
1. Carrega `04_radio_dau.py` en **dues** plaques. Què han de compartir? __________
2. Instrucció que envia: `__________` · que rep: `__________`
3. **Repte:** "pedra-paper-tisora" o comandament per ràdio.

### 4 · Producte + comparació C++ ↔ Python
Tria un dels reptes com a producte i completa la comparació amb un programa senzill:

| Aspecte | Arduino (C/C++) | micro:bit (Python) |
|---|---|---|
| Estructura | `setup()` / `loop()` | |
| Final d'instrucció | `;` | |
| Blocs de codi | `{ }` | |
| Mostrar un valor | `Serial.println(x)` | |

S'avalua amb **R1** (codi) i **R4** (comparació).

## Si t'encalles (DEPURA)
> **D**escriu · **E**xamina (errors de Python, **indentació**) · **P**rova una hipòtesi cada cop · **U**bica · **R**epara · **A**punta-ho. Comprova que el codi és a `main.py`.

## M'autoavaluo (NA/AS/AN/AE)
| Criteri | NA | AS | AN | AE |
|---|---|---|---|---|
| Escric Python ben indentat que funciona | ☐ | ☐ | ☐ | ☐ |
| Faig servir sensors integrats (acceleròmetre, llum…) | ☐ | ☐ | ☐ | ☐ |
| Comunico dues plaques per ràdio | ☐ | ☐ | ☐ | ☐ |

## Quadern tècnic
- **Per què la indentació és important en Python?** ____________________
- **Avantatge d'usar sensors integrats:** _____________________________
- **Un error i com l'he resolt:** _____________________________________

> 💻 **Sense placa?** Prova el codi al **simulador** [python.microbit.org](https://python.microbit.org).
> 📌 **Vols més?** +Reptes (wearable, xarxa de 3+ plaques), rols, coavaluació, exit ticket, pensament computacional i ODS → **[SA5_fitxa_ampliada.md](SA5_fitxa_ampliada.md)**
