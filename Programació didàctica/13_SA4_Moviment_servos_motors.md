# SA4 · Moviment: servos, motors i ponts H

| | |
|---|---|
| **Trimestre** | 2n |
| **Durada** | 8 h (4 sessions) |
| **Maquinari** | Arduino UNO + servo SG90, motor DC, driver/pont H (L298N o similar del kit) |
| **Llenguatge** | C/C++ |

## Vincle competencial
- **Competències específiques:** CE-R1, CE-R2, CE-R3 (principals).
- **Criteris d'avaluació:** CA1.1, CA2.1, CA3.1.
- **Competències clau:** STEM, CD.

## Sabers (Blocs C i E)
Actuadors de moviment: servomotor (PWM, llibreria `Servo`), motor DC, **driver/pont H** (direcció i velocitat); alimentació externa; introducció al control de velocitat.

## Objectius d'aprenentatge
1. Controlar la posició d'un **servo** i la velocitat/direcció d'un **motor DC**.
2. Comprendre per què cal un **driver** i una alimentació adequada.
3. Usar llibreries (`Servo.h`) i estructurar el control en funcions.
4. Relacionar entrada (sensor/potenciòmetre) amb moviment (control).

## Repte/pregunta inicial
> *"Com controles la força i la direcció d'un motor sense cremar la placa?"*

## Seqüència de sessions

| Sessió | Activitats |
|---|---|
| **1** | Servo amb llibreria `Servo`: posicionament 0-180°. Barrera/braç controlat per potenciòmetre. |
| **2** | Motor DC + **pont H**: gir endavant/enrere; control de velocitat amb PWM. Seguretat amb alimentació externa. |
| **3** | Integració sensor→actuador: potenciòmetre/ultrasons que regula velocitat o posició. |
| **4** | Repte: **"barrera automàtica"** o **"ventilador regulable"** (sensor + actuador + indicador). Documentació. |

## Producte
Mecanisme motoritzat controlat per sensor (barrera, braç o ventilador) amb control de direcció/velocitat i codi modular.

## Avaluació
- Instruments: producte + quadern + observació de muntatge segur.
- Rúbriques: **R1**, **R2**, **R3** (parcial: control).

## Atenció a la diversitat
- **Bastida:** esquema de connexió del pont H pas a pas; codi base de `Servo`.
- **+ Ampliació:** dos motors coordinats; rampa d'acceleració; control per dos sensors.

## Recursos
Aprendiendo Arduino; Arduino Student Kit / CTC 101; Luis Llamas.
