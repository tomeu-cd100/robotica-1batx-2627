# SA4 · Moviment: servos, motors i ponts H

| | |
|---|---|
| **Trimestre** | 2n |
| **Durada** | 8 h (4 sessions) |
| **Maquinari** | Arduino UNO + braç MeArm (4 servos), potenciòmetres, ultrasons; motor DC i driver/pont H (L298N o similar del kit) |
| **Llenguatge** | C/C++ |

## Vincle competencial
- **Competències específiques:** CE-R1, CE-R2, CE-R3 (principals).
- **Criteris d'avaluació:** CA1.1, CA2.1, CA3.1.
- **Competències clau:** STEM, CD.

## Sabers (Blocs C i E)
Actuadors de moviment: servomotor (PWM, llibreria `Servo`, rang segur), motor DC, **driver/pont H** (direcció i velocitat); alimentació externa; integració sensor → actuador; temporització no bloquejant (`millis()`). Muntatge mecànic d'un braç robòtic seguint documentació tècnica.

## Objectius d'aprenentatge
1. Controlar la posició d'un **servo** dins del seu rang segur i la velocitat/direcció d'un **motor DC**.
2. Comprendre per què cal un **driver** i una alimentació adequada.
3. Usar llibreries (`Servo.h`) i estructurar el control en funcions amb paràmetres.
4. Relacionar entrada (sensor/potenciòmetre) amb el moviment del braç (control).
5. Muntar i cablejar el braç MeArm seguint una guia tècnica.

## Repte/pregunta inicial
> *"Com controles l'angle exacte d'un braç robòtic sense que es trenqui ni cremi la placa?"*

## Seqüència de sessions

| Sessió | Activitats |
|---|---|
| **1** | Servo amb llibreria `Servo`: el servo de la base del braç controlat per potenciòmetre. Taller: pas 0 (servos centrats) i blocs A-B del MeArm. |
| **2** | Motor DC + **pont H** (pràctica curta, fora del braç): gir endavant/enrere i velocitat amb PWM; alimentació externa i massa comuna. Taller: blocs C-D (pinça i calibratge). |
| **3** | Integració sensor→actuador: l'ultrasons de l'estació de recollida fa girar la base i obrir la pinça. **Bastida `millis()`** (dues articulacions alhora, prepara la màquina d'estats de la SA6). Taller: bloc E (estructura central). |
| **4** | Producte: **el braç amb quatre potenciòmetres** (rang segur, zona morta, funcions amb paràmetres). Cablatge definitiu, documentació i defensa. |

> 🤖 **Fil conductor de robots (des del 28-10-2026):** el braç MeArm és el
> **fil conductor de totes les pràctiques** de la SA
> ([`Classes/00_General/00_Fil_conductor_robots.md`](../Classes/00_General/00_Fil_conductor_robots.md)).
> Es munta en **torns de taller** de 35-45' a les sessions 1-3 (el temps
> surt d'haver escurçat el motor DC i retirat la barrera, el sensor de
> velocitat i els LED amb `millis()`), i la **sessió 4 n'és el producte**,
> comprimible com a marge ([dossier](../Classes/00_General/00_Projecte_T2_Brac.md)).
> *Contingència:* si les peces no són tallades a l'inici del trimestre, les
> pràctiques es fan amb servos solts i la sessió 4 es dedica al muntatge.

## Producte
El braç MeArm muntat i controlat amb quatre potenciòmetres, dins dels seus angles límit, amb codi modular (funcions amb paràmetres).

## Avaluació
- Instruments: producte + quadern + observació de muntatge segur.
- Rúbriques: **R1**, **R2**, **R3** (parcial: control).

## Atenció a la diversitat
- **Bastida:** esquema de connexió del pont H pas a pas; codi base de `Servo`.
- **+ Ampliació:** pinça proporcional a la distància; reptes del braç (botó de casa, dispensador, registre i replay).

## Recursos
Aprendiendo Arduino; Arduino Student Kit / CTC 101; Luis Llamas.
