# SA2 · Solucions del qüestionari de conceptes

> **Material del docent.** Clau de correcció i versió Google Forms de
> «SA2 · Qüestionari de conceptes (programar la placa i sortides digitals/PWM)»
> ([qüestionari](SA2_questionari_conceptes.md)). La tasca autocorrectiva ja és publicada:
> [«SA2 · Qüestionari de conceptes» al Classroom](https://classroom.google.com/c/ODY4ODU4Njk0NTEy/a/ODcwNzE2NzE2MTkw/details).

---

## Clau de correcció (ús del professorat)

| Pregunta | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 |
|---|---|---|---|---|---|---|---|---|---|---|
| **Resposta** | b | b | b | a | b | b | b | a | b | b |

> **Barem orientatiu:** 10 preguntes × 1 punt = 10. La pregunta 11 pot pujar nota
> (aplicació) o quedar fora del còmput.

---

## Versió Google Forms (llesta per copiar)

> Crea un formulari nou a **Google Forms**, activa **"Convertir en qüestionari"** i marca
> la resposta correcta de cada pregunta. Assigna **1 punt** a les preguntes 1-10.

**Títol:** `SA2 · Conceptes — Programar la placa i sortides (digital/PWM)`
**Descripció:** `Comprovació dels conceptes de programació bàsica i sortides de la SA2.`

**Camps inicials**
- Nom i cognoms — *Resposta curta* (obligatori).
- Grup/classe — *Resposta curta*.

**Preguntes 1-10** (tipus: *Opció múltiple*; **1 punt** cadascuna; correcta en **negreta**)
1. `setup()`… → Es repeteix sempre / **S'executa un sol cop en engegar** / No serveix / Apaga la placa.
2. `loop()`… → Un sol cop / **Es repeteix infinitament** / Només amb error / Configura pins.
3. Configurar un pin com a sortida → `digitalRead` / **`pinMode(PIN, OUTPUT)`** / `analogRead` / `Serial.begin`.
4. Encendre un LED → **`digitalWrite(PIN, HIGH)`** / `digitalWrite(PIN, LOW)` / `pinMode(PIN, INPUT)` / `delay(PIN)`.
5. `delay(1000)`… → S'apaga / **Espera 1 segon** / Repeteix 1000 cops / Encén 1000 LED.
6. El PWM serveix per… → Llegir un sensor / **Regular la intensitat d'una sortida** / Internet / Port sèrie.
7. Rang de `analogWrite` → 0-1023 / **0-255** / 0-5 / 0-100.
8. El PWM va als pins amb… → **`~` (titlla)** / lletra A / `+` / cap marca.
9. Per què resistència amb un LED → Més brillant / **Limitar el corrent i no cremar-lo** / Canviar de color / No cal.
10. Una constant serveix per… → Valor que canvia / **Valor fix que no canvia** / Esborrar variables / Aturar el loop.

**Pregunta 11** (tipus: *Paràgraf*; sense puntuació) — descriure un `loop()` de parpelleig.

> **Recollida:** Respostes → full de càlcul vinculat, amb la nota de l'1 al 10 autocalculada.

---
