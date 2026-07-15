# SA4 · Qüestionari de conceptes (moviment: servos, motors i ponts H)

> **Ús.** Comprovació breu dels conceptes de moviment de la SA4 (servo, motor DC, pont H).
> Es pot fer servir com a **repàs formatiu** o com a **prova curta qualificable**
> (10 preguntes × 1 punt = **nota 0-10**). Durada orientativa: **15-20 min**, individual.

**Nom:** ______________________  **Grup:** __________  **Data:** __________

---

## Preguntes (tria una resposta)

1. Quina és la diferència principal entre un **servomotor** i un **motor DC**?
   - a) No n'hi ha cap, són el mateix.
   - b) **El servo controla la *posició* (angle 0-180°); el motor DC fa un gir continu.**
   - c) El motor DC controla l'angle exacte i el servo gira sense parar.
   - d) El servo només funciona amb piles i el motor DC amb USB.

2. Quina **llibreria** cal incloure per controlar un servo a l'Arduino?
   - a) `Ultrasonic.h`
   - b) **`Servo.h`**
   - c) `Wire.h`
   - d) No cal cap llibreria.

3. Amb un objecte servo ja creat, la instrucció `servo.write(90);` fa que el servo…
   - a) Giri 90 voltes.
   - b) **Es col·loqui a la posició de 90 graus.**
   - c) Esperi 90 mil·lisegons.
   - d) Llegeixi el valor del pin 90.

4. Quin és el rang d'angles habitual de `write()` en un servo estàndard?
   - a) 0 a 90 graus.
   - b) **0 a 180 graus.**
   - c) 0 a 255 graus.
   - d) 0 a 1023 graus.

5. Per controlar el servo amb un potenciòmetre (`analogRead` dona 0-1023) fem servir…
   - a) `delay(1023);`
   - b) **`map(valor, 0, 1023, 0, 180)` per reescalar la lectura a graus.**
   - c) `digitalWrite(valor, HIGH);`
   - d) `Serial.begin(180);`

6. Per què **no** es connecta un motor DC directament a un pin de l'Arduino i cal un **driver (pont H)**?
   - a) Perquè el pin no té prou tensió i el motor cremaria l'USB.
   - b) **Perquè un pin dona molt poc corrent; el driver l'amplifica des d'una alimentació externa.**
   - c) Perquè el motor només entén senyals analògics.
   - d) No cal driver, es pot connectar directament sense problema.

7. Al pont H **L298N**, quin senyal regula la **velocitat** del motor?
   - a) `IN1` en HIGH.
   - b) **`ENA` amb un valor PWM (`analogWrite`).**
   - c) El pin GND.
   - d) La tensió de les piles, que no es pot canviar.

8. Al L298N, els pins **`IN1`** i **`IN2`** serveixen per…
   - a) Regular la velocitat.
   - b) **Determinar el *sentit* de gir del motor.**
   - c) Alimentar l'Arduino.
   - d) Llegir la distància de l'ultrasons.

9. Segons la lògica del pont H, si `IN1` i `IN2` estan **tots dos a LOW**, el motor…
   - a) Gira endavant a màxima velocitat.
   - b) Gira enrere.
   - c) **S'atura (no gira).**
   - d) Fa un pols i es reinicia.

10. Què és la **massa comuna** i per què és imprescindible?
    - a) Un cable de dades entre l'Arduino i el motor.
    - b) **Unir el GND de l'Arduino amb el GND de l'alimentació del motor perquè comparteixin la mateixa referència.**
    - c) La distància mínima de seguretat de l'ultrasons.
    - d) El pin de 5V de l'Arduino.

---

## Pregunta oberta (opcional)

11. Explica (en paraules o amb pseudocodi) com faries **tres funcions** per al motor DC amb el
    pont H: `endavant(vel)`, `enrere(vel)` i `atura()`. Indica quins valors donaries a `IN1`,
    `IN2` i `ENA` en cada cas:

___________________________________________________________________

___________________________________________________________________

---

## Clau de correcció (ús del professorat)

| Pregunta | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 |
|---|---|---|---|---|---|---|---|---|---|---|
| **Resposta** | b | b | b | b | b | b | b | b | c | b |

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
1. Servo vs motor DC → Són el mateix / **El servo controla la posició (0-180°); el motor DC gira continu** / El motor controla l'angle / El servo va amb piles i el motor amb USB.
2. Llibreria per al servo → `Ultrasonic.h` / **`Servo.h`** / `Wire.h` / Cap.
3. `servo.write(90)` → Gira 90 voltes / **Es col·loca a 90 graus** / Espera 90 ms / Llegeix el pin 90.
4. Rang de `write()` del servo → 0-90 / **0-180** / 0-255 / 0-1023.
5. Servo amb potenciòmetre → `delay(1023)` / **`map(valor, 0, 1023, 0, 180)`** / `digitalWrite` / `Serial.begin(180)`.
6. Per què cal un pont H → El pin cremaria l'USB / **Un pin dona poc corrent; el driver l'amplifica des d'alimentació externa** / El motor només entén analògic / No cal.
7. Velocitat al L298N → `IN1` en HIGH / **`ENA` amb PWM (`analogWrite`)** / El pin GND / La tensió de les piles fixa.
8. `IN1` i `IN2` → Regulen la velocitat / **Determinen el sentit de gir** / Alimenten l'Arduino / Llegeixen l'ultrasons.
9. `IN1` i `IN2` tots dos LOW → Endavant màxim / Enrere / **S'atura** / Fa un pols i es reinicia.
10. La massa comuna → Cable de dades / **Unir el GND de l'Arduino amb el GND de l'alimentació del motor** / Distància de seguretat / El pin de 5V.

**Pregunta 11** (tipus: *Paràgraf*; sense puntuació) — descriure les funcions `endavant(vel)`, `enrere(vel)` i `atura()` amb els valors d'`IN1`, `IN2` i `ENA`.

> **Recollida:** Respostes → full de càlcul vinculat, amb la nota de l'1 al 10 autocalculada.

---

*Qüestionari de conceptes de la SA4. Es recolza en `SA4_fitxa_alumnat.md`,
`SA4_guia_docent.md` i `SA4_esquemes_connexions.md` (servo, motor DC, pont H L298N).
Llicència CC BY-SA 4.0.*
