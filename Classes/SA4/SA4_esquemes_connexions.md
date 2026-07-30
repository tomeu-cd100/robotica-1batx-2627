# SA4 · Esquemes i connexions

> 🧑‍🎓 **Quan toca?** Tingues aquesta pàgina oberta **mentre muntes** cada circuit. Correspondència amb la fitxa: **§1** → Activitat 1 (S1) · **§2** → Activitat 2 (S2) · **§3** → Activitat 3 (S3) · **§4** → Activitat 4, el producte (S4).

> ⚠️ **Regla d'or:** **massa comuna** (uneix el GND de l'Arduino amb el GND de l'alimentació del motor) i **mai** alimentis motors/servos des del pin 5V de l'Arduino si en mous més d'un.

---

## 1. Servo controlat per potenciòmetre (`01_servo_potenciometre.ino`)

**Servo SG90:**

| Cable servo | Cap a |
|---|---|
| Marró/negre (GND) | GND |
| Vermell (V+) | 5 V (o alimentació externa) |
| Taronja/groc (senyal) | Pin 9 |

**Potenciòmetre:** extrems a 5 V i GND; cursor a **A0**.

![El potenciòmetre (entrada, cursor a A0) marca la posició; l'Arduino la converteix i envia el senyal pel pin 9 al servo, que gira de 0 a 180 graus](img/sa4-servo-potenciometre.svg)

![Captura de Tinkercad: Arduino UNO amb el potenciòmetre a la protoboard (extrems als carrils de 5 V i GND, cursor a A0) i el microservo SG90 connectat fora de la placa: senyal taronja al pin 9~, alimentació vermella i negra als carrils de 5 V i GND](img/sa4-tinkercad-servo-potenciometre.png)

▶ **Obre la simulació a Tinkercad** (pots fer *Copy and Tinker* per modificar-la): <https://www.tinkercad.com/things/dVZLRyR1UDN-sa4-servo-amb-potenciometre-posicio-amb-una-llibreria?sharecode=5KXEzbtaibn7wJtSscbtm_MyxRrX9pmtmsQFqcmA0YY>

---

## 2. Motor DC amb pont H L298N (`02_motor_pont_h.ino`)

| L298N | Cap a |
|---|---|
| ENA | Pin 5 ~ (PWM, velocitat) |
| IN1 | Pin 7 (direcció) |
| IN2 | Pin 8 (direcció) |
| OUT1 / OUT2 | Bornes del motor DC |
| +12V (VS) | + alimentació externa (piles) |
| GND | GND piles **i** GND Arduino (massa comuna) |

![Motor DC amb pont H L298N: l'Arduino controla ENA (pin 5, velocitat PWM), IN1 (pin 7) i IN2 (pin 8, direcció); el motor va a OUT1 i OUT2; les piles alimenten +12V; i el GND de l'Arduino, el de les piles i el del L298N s'uneixen en una massa comuna](img/sa4-pont-h-l298n.svg)

---

## 3. Sensor regula velocitat (`03_sensor_velocitat.ino`)

Igual que el muntatge 2 **+** sensor d'ultrasons:

| HC-SR04 | Cap a |
|---|---|
| TRIG / ECHO | Pin 12 / Pin 11 |
| VCC / GND | 5V / GND |

> La resta és com el muntatge 2 (pont H + motor + massa comuna). El sensor d'ultrasons es connecta com a la SA3.

---

## 4. Barrera automàtica (`04_barrera_automatica.ino`)

| Pin | Component | Via | Cap a |
|---|---|---|---|
| 9 | Servo (senyal) | — | (V+ i GND amb alimentació adequada) |
| 12 / 11 | HC-SR04 TRIG / ECHO | — | VCC=5V, GND=GND |
| 8 | LED indicador | 220 Ω | GND |

> Combina el servo (apartat 1) amb el sensor d'ultrasons (pin 12/11) i un LED indicador bàsic (pin 8).

---

## Simulació interactiva (Wokwi)

- ▶ **Simulació (Servo controlat amb potenciòmetre):** <https://wokwi.com/projects/468088128427008001>
- **Projecte al repositori:** [`Simulacions/Wokwi/SA4_servo_potenciometre/`](../../Simulacions/Wokwi/SA4_servo_potenciometre/) (`diagram.json` + `sketch.ino` + `libraries.txt`).

> Obre l'enllaç i prem **▶**. Gira el **potenciòmetre** per moure el servo de 0 a 180°. La llibreria **Servo** s'instal·la sola amb el botó *Install "Servo" library* que apareix en compilar (pont H i motors DC no es porten a Wokwi).
