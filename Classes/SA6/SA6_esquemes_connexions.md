# SA6 · Esquemes i connexions

> Reproduïbles a **Tinkercad** o **Wokwi**. La "temperatura" es llegeix amb una **NTC** en divisor de tensió (es pot substituir per un **potenciòmetre** per simular-la).

## Llegenda dels diagrames
```
--[ 10k ]--    resistencia (el numero indica el valor)
|>|            LED ( |> = anode , | = catode )
+              nus de connexio comu
[A0]           pin analogic (lectura 0..1023)
~              pin amb PWM
```

---

## 1. Sensor de temperatura NTC (divisor de tensió)

```
5V ---- NTC ----+---- [A0]      (punt mig: lectura analogica)
                |
              --[ 10k ]--
                |
               GND
```
> **Alternativa per a proves:** un **potenciòmetre** al pin A0 simula el canvi de "temperatura".

---

## 2. Actuador (LED o ventilador)

| Pin | Component | Via | Cap a |
|---|---|---|---|
| 9 ~ | LED indicador / sortida | 220 Ω | GND |
| — | Ventilador petit (opcional) | via **transistor/relé** | no directament al pin |

```
Pin 9~ --[ 220R ]--|>|-- GND      (per a control proporcional cal PWM)
```
> ⚠️ No connectis un motor/ventilador **directament** al pin: usa transistor o relé.

---

## 3. Entrades i LEDs d'estat addicionals

| Pin | Component | Via | Cap a |
|---|---|---|---|
| 2 | Polsador (màquina d'estats) | — | GND (`INPUT_PULLUP`) |
| A1 | LDR (alternativa de sensor) | divisor 10 kΩ | — |
| 7 / 8 | LED estat verd / vermell | 220 Ω c/u | GND |

```
Pin 2 ---- polsador ---- GND          (INPUT_PULLUP)
Pin 7 --[ 220R ]--|>|-- GND           (LED verd)
Pin 8 --[ 220R ]--|>|-- GND           (LED vermell)
```

---

## Resum de pins (per a tots els sketches de SA6)

| Senyal | Pin |
|---|---|
| Sensor NTC / potenciòmetre | A0 |
| Sensor LDR | A1 |
| Sortida PWM (LED/ventilador) | 9 ~ |
| Polsador | 2 |
| LED verd / vermell | 7 / 8 |

---

## Simulació interactiva (Wokwi)

- ▶ **Simulació (Termòstat amb histèresi):** <https://wokwi.com/projects/468088291274023937>
- **Projecte al repositori:** [`Simulacions/Wokwi/SA6_termostat_histeresi/`](../../Simulacions/Wokwi/SA6_termostat_histeresi/) (`diagram.json` + `sketch.ino`).

> Obre l'enllaç i prem **▶**. El **potenciòmetre** (A0) fa de "temperatura": gira'l lentament i comprova que el LED (sortida) **no vibra** a la zona morta entre els dos llindars — això és la histèresi.
