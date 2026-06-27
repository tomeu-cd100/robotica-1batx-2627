# SA2 · Sortides digitals i PWM: dona vida als actuadors

| | |
|---|---|
| **Trimestre** | 1r |
| **Durada** | 8 h (4 sessions) |
| **Maquinari** | Arduino UNO + kit Keyestudio/BQ (LED, RGB, piezo, relé) |
| **Llenguatge** | C/C++ |

## Vincle competencial
- **Competències específiques:** CE-R1, CE-R2 (principals).
- **Criteris d'avaluació:** CA1.1, CA2.1, CA2.2.
- **Competències clau:** STEM, CD.

## Sabers (Blocs B i C)
Estructura del sketch; variables, constants i operadors; `pinMode`, `digitalWrite`, `delay`; **PWM** (`analogWrite`); estructures de control; LED, LED RGB, piezo, relé; protoboard i esquemes.

## Objectius d'aprenentatge
1. Escriure programes amb variables, constants i estructures de control.
2. Controlar sortides digitals i regular intensitat/to amb **PWM**.
3. Muntar circuits de sortida segurs (resistència limitadora, polaritat).
4. Documentar el codi i l'esquema al quadern tècnic.

## Repte/pregunta inicial
> *"Com faries un semàfor intel·ligent i un llum que respira (efecte *fade*)?"*

## Seqüència de sessions

| Sessió | Activitats |
|---|---|
| **1** | `Blink` real amb LED + resistència. Variables i constants (`const int LED = 13;`). Esquema al quadern. **+ repte:** parpelleig variable. |
| **2** | Estructures de control: `for` i `if`. Repte **semàfor** (3 LED) amb temporització. Antipatró `delay` vs `millis()` (introducció). |
| **3** | **PWM** amb `analogWrite`: efecte *fade* i LED RGB (barreja de colors). Funció `map()` aplicada a nivells. |
| **4** | Repte integrador: **"panell de senyalització"** (LED RGB + piezo + relé per a una càrrega). Documentació i mini-defensa. |

## Producte
Un dispositiu de senyalització programable (p. ex. semàfor amb fase nocturna intermitent o llum d'estat RGB) amb codi comentat i esquema.

## Avaluació
- Instruments: producte + quadern tècnic + repte curt de codi.
- Rúbriques: **R1** (codi), **R2** (circuit).

## Atenció a la diversitat
- **Bastida:** codi base amb buits a completar; esquema imprès.
- **+ Ampliació:** controlar el panell amb seqüències definides en un array; afegir un segon mode.

## Recursos
Servei Educatiu Segrià (miniprojectes); ArduinoBlocks; Luis Llamas; Tinkercad.
