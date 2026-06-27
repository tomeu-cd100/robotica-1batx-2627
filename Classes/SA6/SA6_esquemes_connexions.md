# SA6 · Esquemes i connexions

> Reproduïbles a **Tinkercad** o **Wokwi**. La "temperatura" es llegeix amb una **NTC** en divisor de tensió (es pot substituir per un potenciòmetre per simular).

## Sensor de temperatura NTC (divisor de tensió)

```
5V ──[ NTC ]──┬──[ 10kΩ ]── GND
              │
             A0   (punt mig: lectura analògica)
```
> Alternativa per a proves: un **potenciòmetre** al pin A0 simula el canvi de "temperatura".

## Actuador (LED o ventilador)

| Component | Pin Arduino | Notes |
|---|---|---|
| LED indicador / sortida | 9 (~PWM) → 220 Ω → GND | Per a control proporcional cal PWM |
| Ventilador petit (opcional) | via **transistor/relé** | No connectar el motor directament al pin |

## Entrades addicionals

| Component | Pin |
|---|---|
| Polsador (esdeveniments màquina d'estats) | 2 (`INPUT_PULLUP`) |
| LDR (alternativa de sensor) | A1 (divisor amb 10 kΩ) |
| LED estat verd / vermell (opcional) | 7 / 8 |

## Resum de pins (per a tots els sketches de SA6)
| Senyal | Pin |
|---|---|
| Sensor NTC / pot | A0 |
| Sensor LDR | A1 |
| Sortida PWM (LED/ventilador) | 9 |
| Polsador | 2 |
| LED verd / vermell | 7 / 8 |

```
A0 = NTC/pot   A1 = LDR
Pin 9 = sortida PWM (--[220Ω]--|>-- GND)
Pin 2 = polsador (a GND, INPUT_PULLUP)
Pin 7/8 = LEDs d'estat (--[220Ω]--|>-- GND)
```
