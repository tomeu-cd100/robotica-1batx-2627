# SA3 · Esquemes i connexions

> Reproduïbles a **Tinkercad** o **Wokwi**.

## Llegenda dels diagrames
```
--[ 10k ]--    resistencia (el numero indica el valor)
|>|            LED ( |> = anode , | = catode )
+              nus de connexio comu
-->            senyal / cap a
[A0]           pin analogic (lectura 0..1023)
```

---

## 1. Polsador amb pull-up intern (`01_polsador_debounce.ino`)

| Pin | Component | Cap a | Notes |
|---|---|---|---|
| 2 | Polsador (pota A) | — | configurat `INPUT_PULLUP` |
| GND | Polsador (pota B) | — | |
| 8 | LED (opcional) | 220 Ω → GND | feedback |

```
Pin 2 ---- polsador ---- GND
Pin 8 --[ 220R ]--|>|-- GND      (LED opcional de feedback)
```
> Amb `INPUT_PULLUP` no cal resistència externa: el pin està a **HIGH** en repòs i passa a **LOW** en prémer.

---

## 2. Potenciòmetre + LDR (`02_potenciometre_ldr.ino`)

**Potenciòmetre** (3 potes):
| Pota | Cap a |
|---|---|
| Extrem 1 | 5 V |
| Extrem 2 | GND |
| Central (cursor) | A0 |

**LDR** (divisor de tensió amb 10 kΩ):
```
5V ---- LDR ----+---- [A1]      (punt mig: el llegim)
                |
              --[ 10k ]--
                |
               GND
```
**Sortida:** LED al pin **9~** per regular intensitat:
```
Pin 9~ --[ 220R ]--|>|-- GND
```

---

## 3. Sensor d'ultrasons HC-SR04 (`03_ultrasons_funcio.ino`)

| Pin sensor | Pin Arduino |
|---|---|
| VCC | 5 V |
| GND | GND |
| TRIG | 12 (sortida) |
| ECHO | 11 (entrada) |

```
HC-SR04:  VCC --> 5V    GND --> GND
          TRIG --> Pin 12     ECHO --> Pin 11
```

---

## 4. Alarma / aparcament (`04_alarma_aparcament.ino`)

| Pin | Component | Via | Cap a |
|---|---|---|---|
| 12 / 11 | HC-SR04 TRIG / ECHO | — | (VCC=5V, GND=GND) |
| 8 | LED indicador | 220 Ω | GND |
| 6 | Brunzidor piezo (+) | — | (−) a GND |

```
HC-SR04:  TRIG --> Pin 12    ECHO --> Pin 11    VCC=5V  GND=GND
Pin 8 --[ 220R ]--|>|-- GND          (LED)
Pin 6 -- piezo(+) ... piezo(-) -- GND
```
> El codi tracta la lectura **0** (sense eco) com a "molt lluny" (retorna 400) per evitar falses alarmes.
