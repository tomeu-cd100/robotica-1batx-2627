# SA4 · Esquemes i connexions

> ⚠️ **Regla d'or:** **massa comuna** (uneix el GND de l'Arduino amb el GND de l'alimentació del motor) i **mai** alimentis motors/servos des del pin 5V de l'Arduino si en mous més d'un.

## Llegenda dels diagrames
```
--[ 220R ]--   resistencia
|>|            LED ( |> = anode , | = catode )
-->            senyal / cap a
+              nus de connexio comu (massa comuna GND)
~              pin amb PWM
```

---

## 1. Servo controlat per potenciòmetre (`01_servo_potenciometre.ino`)

**Servo SG90:**
| Cable servo | Cap a |
|---|---|
| Marró/negre (GND) | GND |
| Vermell (V+) | 5 V (o alimentació externa) |
| Taronja/groc (senyal) | Pin 9 |

**Potenciòmetre:** extrems a 5 V i GND; cursor a **A0**.

```
Servo:  senyal --> Pin 9     V+ --> 5V     GND --> GND
Pot:    5V -- [ pot ] -- GND     cursor --> [A0]
```

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

```
Arduino:  Pin 5~ --> ENA    Pin 7 --> IN1    Pin 8 --> IN2    GND --+
Piles:    (+) --> VS(+12V)        (-) --> GND -------------------+--(massa comuna)
Motor:    OUT1 -- motor -- OUT2
```

---

## 3. Sensor regula velocitat (`03_sensor_velocitat.ino`)

Igual que el muntatge 2 **+** sensor d'ultrasons:

| HC-SR04 | Cap a |
|---|---|
| TRIG / ECHO | Pin 12 / Pin 11 |
| VCC / GND | 5V / GND |

```
HC-SR04:  TRIG --> Pin 12    ECHO --> Pin 11    VCC=5V  GND=GND
(la resta, com el muntatge 2: pont H + motor + massa comuna)
```

---

## 4. Barrera automàtica (`04_barrera_automatica.ino`)

| Pin | Component | Via | Cap a |
|---|---|---|---|
| 9 | Servo (senyal) | — | (V+ i GND amb alimentació adequada) |
| 12 / 11 | HC-SR04 TRIG / ECHO | — | VCC=5V, GND=GND |
| 8 | LED indicador | 220 Ω | GND |

```
Servo:    senyal --> Pin 9     (V+ i GND segons alimentacio)
HC-SR04:  TRIG --> Pin 12    ECHO --> Pin 11
Pin 8 --[ 220R ]--|>|-- GND          (LED)
```
