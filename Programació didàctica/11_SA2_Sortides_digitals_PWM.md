# SA2 · Sortides digitals i PWM (*Pulse Width Modulation*): dona vida als actuadors

| | |
|---|---|
| **Trimestre** | 1r |
| **Durada** | 6 h (3 sessions) |
| **Maquinari** | Arduino UNO + kit Keyestudio/BQ (LED, RGB, piezo, relé) |
| **Llenguatge** | C/C++ |

## Vincle competencial
- **Competències específiques:** CE-R1, CE-R2 (principals).
- **Criteris d'avaluació:** CA1.1, CA2.1, CA2.2.
- **Competències clau:** STEM, CD.

## Sabers (Blocs B i C)
Estructura del sketch; variables, constants i operadors; `pinMode`, `digitalWrite`, `delay`; **PWM** (`analogWrite`); estructures de control (`for`, `if`, `switch`); llei d'Ohm aplicada (càlcul de la resistència limitadora); LED, LED RGB, piezo, relé; protoboard i esquemes.

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
| **1** | **LED extern** amb resistència: **càlcul amb la llei d'Ohm** (R = (5−2) V / 20 mA → 220 Ω comercial) i **mesura amb el multímetre**. Estructures de control: `if` i **`switch`** (semàfor com a variable de fase — llavor de les màquines d'estats de la SA6). Repte **semàfor** (3 LED) amb temporització i fase nocturna. Antipatró `delay` vs `millis()` (introducció). |
| **2** | **PWM** amb `analogWrite`: efecte *fade* i LED RGB (barreja de colors). Funció `map()` aplicada a nivells. |
| **3** | Repte integrador: **"panell de senyalització"** (LED RGB + piezo + relé per a una càrrega). Documentació i mini-defensa. |

> 📝 **Per què 3 sessions (18-10-2026):** l'antiga sessió 1 (`Blink` amb constants i variables) repetia la S3 de la SA1. El que tenia de nou (LED extern, llei d'Ohm, multímetre) passa a la sessió 1, i la **Prova SA1** es fa a la **sessió de marge** entre la SA1 i la SA2 (vegeu [`08_Sequenciacio_temporal_anual.md`](08_Sequenciacio_temporal_anual.md)). El sketch `01_led_basic` queda com a bastida «comença per un sol LED».

> 🤖 **Fil conductor de robots:** amb el fil conductor actiu
> ([`Classes/00_General/00_Fil_conductor_robots.md`](../Classes/00_General/00_Fil_conductor_robots.md)),
> la sessió 3 és també la **sessió de fabricació de la mascota** (tall làser
> i muntatge, [dossier](../Classes/00_General/00_Projecte_T1_Mascota.md)):
> el repte de la sessió 2 fa de producte. Cada alumne/a porta l'esborrany de la
> cara fet (de casa o del tancament de la sessió 2); a la sessió 3 s'ajusta,
> el docent el valida i es talla per rotacions.

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
