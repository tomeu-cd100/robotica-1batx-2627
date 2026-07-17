# SA4 · Solucions del qüestionari de conceptes

> **Material del docent.** Clau de correcció i versió Google Forms de
> «SA4 · Qüestionari de conceptes (moviment: servos, motors i ponts H)»
> ([qüestionari](SA4_questionari_conceptes.md)). La tasca autocorrectiva ja és publicada:
> [«SA4 · Qüestionari de conceptes» al Classroom](https://classroom.google.com/c/ODY4ODU4Njk0NTEy/a/ODcwNzE3NjQzMTUw/details).

---

## Clau de correcció (ús del professorat)

| Pregunta | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 |
|---|---|---|---|---|---|---|---|---|---|---|
| **Resposta** | c | a | d | b | c | a | b | d | a | c |

> **Barem orientatiu:** 10 preguntes × 1 punt = 10. La pregunta 11 pot pujar nota
> (aplicació) o quedar fora del còmput.

---

## Versió Google Forms (llesta per copiar)

> Crea un formulari nou a **Google Forms**, activa **"Convertir en qüestionari"** i marca
> la resposta correcta de cada pregunta. Assigna **1 punt** a les preguntes 1-10.

**Títol:** `SA4 · Conceptes — Moviment: servos, motors i ponts H`
**Descripció:** `Comprovació dels conceptes de moviment de la SA4 (servo, motor DC, pont H).`

**Camps inicials**
- Nom i cognoms — *Resposta curta* (obligatori).
- Grup/classe — *Resposta curta*.

**Preguntes 1-10** (tipus: *Opció múltiple*; **1 punt** cadascuna; correcta en **negreta**)
1. Servo vs motor DC → Són el mateix / El motor controla l'angle / **El servo controla la posició (0-180°); el motor DC gira continu** / El servo va amb piles i el motor amb USB.
2. Llibreria per al servo → **`Servo.h`** / `Ultrasonic.h` / `Wire.h` / Cap.
3. `servo.write(90)` → Gira 90 voltes / Espera 90 ms / Llegeix el pin 90 / **Es col·loca a 90 graus**.
4. Rang de `write()` del servo → 0-90 / **0-180** / 0-255 / 0-1023.
5. Servo amb potenciòmetre → `delay(1023)` / `digitalWrite` / **`map(valor, 0, 1023, 0, 180)`** / `Serial.begin(180)`.
6. Per què cal un pont H → **Un pin dona poc corrent; el driver l'amplifica des d'alimentació externa** / El pin cremaria l'USB / El motor només entén analògic / No cal.
7. Velocitat al L298N → `IN1` en HIGH / **`ENA` amb PWM (`analogWrite`)** / El pin GND / La tensió de les piles fixa.
8. `IN1` i `IN2` → Regulen la velocitat / Alimenten l'Arduino / Llegeixen l'ultrasons / **Determinen el sentit de gir**.
9. `IN1` i `IN2` tots dos LOW → **S'atura** / Endavant màxim / Enrere / Fa un pols i es reinicia.
10. La massa comuna → Cable de dades / Distància de seguretat / **Unir el GND de l'Arduino amb el GND de l'alimentació del motor** / El pin de 5V.

**Pregunta 11** (tipus: *Paràgraf*; sense puntuació) — descriure les funcions `endavant(vel)`, `enrere(vel)` i `atura()` amb els valors d'`IN1`, `IN2` i `ENA`.

> **Recollida:** Respostes → full de càlcul vinculat, amb la nota de l'1 al 10 autocalculada.

---
