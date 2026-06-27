# SA4 · Moviment: servos, motors i ponts H

Quarta situació d'aprenentatge (**8 h · 4 sessions**, 2n trimestre). El sistema **es mou**: control de posició amb **servomotor**, control de velocitat i direcció d'un **motor DC** amb **driver/pont H** i alimentació externa, i integració sensor → moviment. Maquinari: Arduino UNO + servo SG90 + motor DC + L298N. Programació oficial: `Programació didàctica/13_SA4_Moviment_servos_motors.md`.

## Contingut

| Fitxer | Descripció |
|---|---|
| `SA4_guia_docent.md` | Guia del professorat: objectius, 4 sessions, mètode de projecte, mapa d'avaluació i errors freqüents. |
| `SA4_fitxa_alumnat.md` | Fitxa de treball de l'alumnat (Activitats 1-4 + quadern). |
| `SA4_esquemes_connexions.md` | Esquemes i connexions (servo, L298N, massa comuna, alimentació externa). |
| `codi/` | Sketches d'Arduino (vegeu la taula següent). |

### Codi (`codi/`)

| Sketch | Què mostra |
|---|---|
| `01_servo_potenciometre.ino` | Llibreria `Servo.h`; posició 0-180° controlada per potenciòmetre. |
| `02_motor_pont_h.ino` | Motor DC: direcció (`IN1`/`IN2`) i velocitat (PWM a `ENA`). |
| `03_sensor_velocitat.ino` | Ultrasons regula la velocitat del motor (percepció → moviment). |
| `04_barrera_automatica.ino` | Producte: barrera amb servo activada per sensor. |

## Producte i avaluació

- **Producte:** mecanisme motoritzat controlat per sensor (barrera, braç o ventilador regulable).
- **Criteris:** CA1.1, CA2.1, CA3.1 · **Rúbriques:** **R1** (codi), **R2** (circuit), **R3** parcial (control).

## Continuïtat

Ve de la **SA3** (sensors) i porta a la **SA5** (micro:bit i MicroPython, **canvi de plataforma i llenguatge**). El control sensor → moviment d'aquí és la llavor del **control** (SA6) i de la **robòtica mòbil** (SA7).
