# SA3 · Esquemes i connexions

> Reproduïbles a **Tinkercad** o **Wokwi**.

## 1. Polsador amb pull-up intern (`01_polsador_debounce.ino`)

| Component | Pin Arduino | Notes |
|---|---|---|
| Polsador (pota A) | Pin 2 | Configurat com `INPUT_PULLUP` |
| Polsador (pota B) | GND | |
| LED (opcional, feedback) | 8 → 220 Ω → GND | |

```
Pin 2 ──┐
        [ polsador ]
GND ────┘
```
> Amb `INPUT_PULLUP` no cal resistència externa: el pin està a HIGH en repòs i passa a LOW en prémer.

## 2. Potenciòmetre + LDR (`02_potenciometre_ldr.ino`)

**Potenciòmetre** (3 potes):
| Pota | Connexió |
|---|---|
| Extrem 1 | 5 V |
| Extrem 2 | GND |
| Central (cursor) | A0 |

**LDR** (divisor de tensió amb 10 kΩ):
```
5V ──[ LDR ]──┬──[ 10kΩ ]── GND
              │
             A1   (punt mig: el llegim)
```
**Sortida:** LED al pin **9 (~PWM)** → 220 Ω → GND (per regular intensitat).

## 3. Sensor d'ultrasons HC-SR04 (`03_ultrasons_funcio.ino`)

| Pin sensor | Pin Arduino |
|---|---|
| VCC | 5 V |
| GND | GND |
| TRIG | 12 |
| ECHO | 11 |

```
HC-SR04:  VCC=5V  GND=GND  TRIG=12(sortida)  ECHO=11(entrada)
```

## 4. Alarma / aparcament (`04_alarma_aparcament.ino`)

| Component | Pin Arduino |
|---|---|
| HC-SR04 TRIG / ECHO | 12 / 11 |
| LED indicador | 8 → 220 Ω → GND |
| Brunzidor piezo (+) | 6 (− a GND) |

```
Ultrasons: TRIG=12  ECHO=11
LED:  Pin 8 ──[220Ω]──►|── GND
Piezo: Pin 6 ──(+) piezo (−)── GND
```
> Comportament: com més a prop l'objecte, més curt l'interval entre bips (avís proporcional).
