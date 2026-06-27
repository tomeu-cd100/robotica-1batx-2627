# SA4 · Esquemes i connexions

> ⚠️ Regla d'or: **massa comuna** (unir GND de l'Arduino amb el GND de l'alimentació del motor) i **mai** alimentar motors/servos des del pin 5V de l'Arduino si en mous més d'un.

## 1. Servo controlat per potenciòmetre (`01_servo_potenciometre.ino`)

**Servo SG90:**
| Cable servo | Connexió |
|---|---|
| Marró/negre (GND) | GND |
| Vermell (V+) | 5 V (o alimentació externa) |
| Taronja/groc (senyal) | Pin 9 |

**Potenciòmetre:** extrems a 5 V i GND; cursor a **A0**.

```
Servo:  senyal=Pin 9   V+=5V   GND=GND
Pot:    5V --[ pot ]-- GND ;  cursor --> A0
```

## 2. Motor DC amb pont H L298N (`02_motor_pont_h.ino`)

| L298N | Arduino / Alimentació |
|---|---|
| ENA | Pin 5 (~PWM) |
| IN1 | Pin 7 |
| IN2 | Pin 8 |
| OUT1 / OUT2 | Bornes del motor DC |
| +12V (VS) | + alimentació externa (piles) |
| GND | GND alimentació **i** GND Arduino (massa comuna) |
| +5V | (deixar segons jumper del mòdul) |

```
Arduino:  Pin5->ENA   Pin7->IN1   Pin8->IN2   GND---+
Piles:    (+)->VS(+12V)        (-)->GND ------------+--(massa comuna)
Motor:    OUT1, OUT2
```

## 3. Sensor regula velocitat (`03_sensor_velocitat.ino`)
Igual que el muntatge 2 + sensor d'ultrasons:
| HC-SR04 | Arduino |
|---|---|
| TRIG / ECHO | 12 / 11 |
| VCC / GND | 5V / GND |

## 4. Barrera automàtica (`04_barrera_automatica.ino`)

| Component | Pin Arduino |
|---|---|
| Servo (senyal) | 9 |
| HC-SR04 TRIG / ECHO | 12 / 11 |
| LED indicador | 8 → 220 Ω → GND |

```
Servo: senyal=9 (V+ i GND amb alimentacio adequada)
Ultrasons: TRIG=12 ECHO=11
LED: Pin 8 --[220Ω]--|>-- GND
```
