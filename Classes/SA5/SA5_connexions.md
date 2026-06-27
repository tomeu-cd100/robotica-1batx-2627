# SA5 · Connexions i entorn

> La micro:bit porta molts sensors **integrats**, així que la majoria d'activitats **no necessiten muntatge**. El Micro:shield s'usa per a perifèrics externs.

## Entorn de programació
- **Editor Python micro:bit:** https://python.microbit.org (recomanat; té simulador).
- **Thonny:** opció d'escriptori (mode "BBC micro:bit").
- **MakeCode** (https://makecode.microbit.org): pont blocs→Python.
- Connexió: cable **USB**; la placa apareix com una unitat; "Flash" per carregar.

## Sensors integrats usats
| Sensor | Funció MicroPython | SA |
|---|---|---|
| Matriu LED 5×5 | `display.show()`, `display.scroll()` | 01 |
| Botons A/B | `button_a.is_pressed()` | 01 |
| Acceleròmetre | `accelerometer.get_strength()`, `was_gesture()` | 02, 04 |
| Sensor de llum (matriu) | `display.read_light_level()` | 03 |
| Temperatura | `temperature()` | (repte) |
| Ràdio | mòdul `radio` | 04 |

## Perifèrics externs amb Micro:shield (opcional)
Els pins **0, 1, 2** són d'E/S de propòsit general (cocodril o shield):
| Ús | Pin |
|---|---|
| LED/actuador extern | P0 |
| Potenciòmetre/sensor analògic | P1 (`pin1.read_analog()` → 0-1023) |
| Polsador extern | P2 (`pin2.read_digital()`) |

```
micro:bit:  P0, P1, P2  +  3V  +  GND   (via pinces de cocodril o Micro:shield)
```

## Per a la ràdio (SA5 · activitat 4)
Calen **2 micro:bit** amb el **mateix `group`** (p. ex. `radio.config(group=10)`). Cada placa pot enviar i rebre.
