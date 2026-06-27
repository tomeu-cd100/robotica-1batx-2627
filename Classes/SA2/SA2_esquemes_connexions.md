# SA2 · Esquemes i connexions

> Reproduïbles a **Tinkercad Circuits** o **Wokwi**. Tots els LED porten **resistència de 220 Ω** en sèrie. El càtode (pota curta / costat pla) va a **GND**.

## 1. LED bàsic (`01_led_basic.ino`)

| Component | Pin Arduino | Notes |
|---|---|---|
| LED (ànode +) | Pin 8 → 220 Ω → ànode | Pota llarga = + |
| LED (càtode −) | GND | Pota curta |

```
Pin 8 ──[220Ω]──►|── GND
                 LED
```

## 2. Semàfor (`02_semafor.ino`)

| LED | Pin Arduino | Resistència |
|---|---|---|
| Vermell | 8 | 220 Ω |
| Groc | 9 | 220 Ω |
| Verd | 10 | 220 Ω |

Tots els càtodes a una línia comuna de **GND**.

```
Pin 8 ──[220Ω]──►|(vermell)── GND
Pin 9 ──[220Ω]──►|(groc)──── GND
Pin 10──[220Ω]──►|(verd)──── GND
```

## 3. Fade PWM (`03_fade_pwm.ino`)

| Component | Pin Arduino | Notes |
|---|---|---|
| LED | **9 (~PWM)** → 220 Ω | Cal pin amb `~` |
| Càtode | GND | |

## 4. LED RGB — càtode comú (`04_rgb.ino`)

| Color | Pin Arduino (PWM) | Resistència |
|---|---|---|
| Vermell (R) | 9 | 220 Ω |
| Verd (G) | 10 | 220 Ω |
| Blau (B) | 11 | 220 Ω |
| Comú (−) | GND | pota més llarga |

```
Pin 9 ──[220Ω]── R \
Pin 10──[220Ω]── G  >── (càtode comú) ── GND
Pin 11──[220Ω]── B /
```
> Si el teu LED RGB és d'**ànode comú**, el comú va a 5 V i els valors PWM s'inverteixen (255 = apagat).

## 5. Panell de senyalització (`05_panell_senyalitzacio.ino`)

| Component | Pin Arduino | Notes |
|---|---|---|
| LED RGB (R/G/B) | 9 / 10 / 11 | 220 Ω cadascun, càtode comú a GND |
| Brunzidor piezo (+) | 6 | (−) a GND |
| Mòdul relé (senyal IN) | 7 | VCC i GND del mòdul a 5 V/GND |

```
RGB:  9,10,11 ──[220Ω]── (R,G,B) ── GND
Piezo: Pin 6 ──(+) piezo (−)── GND
Relé:  Pin 7 ── IN | VCC=5V | GND=GND
```
> ⚠️ El relé permet controlar càrregues; en l'àmbit escolar es connecta a càrregues de **baixa tensió** (LED de 5 V, petit motor). **No** connectar 230 V.
