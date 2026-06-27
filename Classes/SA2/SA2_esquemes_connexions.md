# SA2 · Esquemes i connexions

> Reproduïbles a **Tinkercad Circuits** o **Wokwi**. Tots els LED porten **resistència de 220 Ω** en sèrie; el càtode (pota curta) va a **GND**.

## Llegenda dels diagrames
```
--[ 220R ]--   resistencia (el numero indica el valor en ohms)
|>|            LED ( |> = anode/pota llarga , | = catode/pota curta )
+              nus de connexio comu (p. ex. la linia de GND)
~              pin amb PWM (sortida analogica)
(+)/(-)        terminal positiu / negatiu d'un component
```

---

## 1. LED bàsic (`01_led_basic.ino`)

| Pin | Component | Via | Cap a |
|---|---|---|---|
| 8 | LED | 220 Ω | GND |

```
Pin 8 --[ 220R ]--|>|-- GND
```

---

## 2. Semàfor (`02_semafor.ino`)

| Pin | Component | Via | Cap a |
|---|---|---|---|
| 8 | LED vermell | 220 Ω | GND |
| 9 | LED groc | 220 Ω | GND |
| 10 | LED verd | 220 Ω | GND |

```
Pin  8 --[ 220R ]--|>|--+   LED vermell
Pin  9 --[ 220R ]--|>|--+   LED groc
Pin 10 --[ 220R ]--|>|--+   LED verd
GND --------------------+
```

---

## 3. Fade PWM (`03_fade_pwm.ino`)

| Pin | Component | Via | Cap a |
|---|---|---|---|
| 9 ~ | LED | 220 Ω | GND |

```
Pin 9~ --[ 220R ]--|>|-- GND      (cal pin amb ~ per al PWM)
```

---

## 4. LED RGB — càtode comú (`04_rgb.ino`)

| Pin (PWM) | Canal | Via | Cap a |
|---|---|---|---|
| 9 | Vermell (R) | 220 Ω | càtode comú |
| 10 | Verd (G) | 220 Ω | càtode comú |
| 11 | Blau (B) | 220 Ω | càtode comú |

```
Pin  9~ --[ 220R ]-- R --+
Pin 10~ --[ 220R ]-- G --+--(catode comu)-- GND
Pin 11~ --[ 220R ]-- B --+
```
> Si el teu LED RGB és d'**ànode comú**, el comú va a **5 V** i els valors PWM s'inverteixen (255 = apagat).

---

## 5. Panell de senyalització (`05_panell_senyalitzacio.ino`)

| Pin | Component | Via | Cap a |
|---|---|---|---|
| 9 / 10 / 11 | LED RGB (R/G/B) | 220 Ω c/u | càtode comú a GND |
| 6 | Brunzidor piezo (+) | — | (−) a GND |
| 7 | Mòdul relé (IN) | — | VCC=5 V, GND=GND del mòdul |

```
Pin 9~,10~,11~ --[ 220R ]-- (R,G,B) --+--(catode comu)-- GND
Pin 6 ---------- piezo(+) ... piezo(-) -- GND
Pin 7 ---------- IN (rele)   |   VCC=5V   GND=GND
```
> ⚠️ El relé permet controlar càrregues; a l'aula es connecta a **baixa tensió** (LED de 5 V, petit motor). **No** connectar 230 V.
