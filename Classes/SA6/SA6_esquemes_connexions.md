# SA6 · Esquemes i connexions

> Reproduïbles a **Tinkercad** o **Wokwi**. La "temperatura" es llegeix amb una **NTC** en divisor de tensió (es pot substituir per un **potenciòmetre** per simular-la). Els conceptes de control (llaç tancat, histèresi) són a la **[fitxa base](SA6_fitxa_alumnat.md)**.

---

## 1. Sensor de temperatura NTC (divisor de tensió)

**Mateix divisor de tensió que la LDR de la SA3**, però amb una **NTC**: `5V → NTC → punt mig (A0) → 10 kΩ → GND`. El punt mig es llegeix per **A0**.

> **Alternativa per a proves:** un **potenciòmetre** al pin A0 simula el canvi de "temperatura".

---

## 2. Actuador (LED o ventilador)

| Pin | Component | Via | Cap a |
|---|---|---|---|
| 9 ~ | LED indicador / sortida | 220 Ω | GND |
| — | Ventilador petit (opcional) | via **transistor/relé** | no directament al pin |

> LED bàsic al pin **9~** (com el de la SA1); per al **control proporcional** cal que el pin tingui `~` (PWM).
> ⚠️ No connectis un motor/ventilador **directament** al pin: usa transistor o relé.

---

## 3. Entrades i LEDs d'estat addicionals

| Pin | Component | Via | Cap a |
|---|---|---|---|
| 2 | Polsador (màquina d'estats) | — | GND (`INPUT_PULLUP`) |
| A1 | LDR (alternativa de sensor) | divisor 10 kΩ | — |
| 7 / 8 | LED estat verd / vermell | 220 Ω c/u | GND |

> Polsador amb `INPUT_PULLUP` (com el de la SA3) i dos LED d'estat bàsics (pins 7 i 8).

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
