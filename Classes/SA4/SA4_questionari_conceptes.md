# SA4 · Qüestionari de conceptes (moviment: servos, motors i ponts H)

> **Ús.** Comprovació breu dels conceptes de moviment de la SA4 (servo, motor DC, pont H).
> Es pot fer servir com a **repàs formatiu** o com a **prova curta qualificable**
> (10 preguntes × 1 punt = **nota 0-10**). Durada orientativa: **15-20 min**, individual.

> **📲 Fes-lo al Classroom.** Aquest qüestionari és una **tasca
> autocorrectiva** al Google Classroom del curs:
> **[obre «SA4 · Qüestionari de conceptes»](https://classroom.google.com/c/ODY4ODU4Njk0NTEy/a/ODcwNzE3NjQzMTUw/details)**
> (cal el compte del centre). Aquesta pàgina és la versió per repassar
> o fer en paper; les solucions són al full del docent.

**Nom:** ______________________  **Grup:** __________  **Data:** __________

---

![Servo controlat amb un potenciòmetre](img/sa4-servo-potenciometre.svg)

## Preguntes (tria una resposta)

1. Quina és la diferència principal entre un **servomotor** i un **motor DC**?
   - a) No n'hi ha cap, són el mateix.
   - b) El motor DC controla l'angle exacte i el servo gira sense parar.
   - c) El servo controla la *posició* (angle 0-180°); el motor DC fa un gir continu.
   - d) El servo només funciona amb piles i el motor DC amb USB.

2. Quina **llibreria** cal incloure per controlar un servo a l'Arduino?
   - a) `Servo.h`
   - b) `Ultrasonic.h`
   - c) `Wire.h`
   - d) No cal cap llibreria.

3. Amb un objecte servo ja creat, la instrucció `servo.write(90);` fa que el servo…
   - a) Giri 90 voltes.
   - b) Esperi 90 mil·lisegons.
   - c) Llegeixi el valor del pin 90.
   - d) Es col·loqui a la posició de 90 graus.

4. Quin és el rang d'angles habitual de `write()` en un servo estàndard?
   - a) 0 a 90 graus.
   - b) 0 a 180 graus.
   - c) 0 a 255 graus.
   - d) 0 a 1023 graus.

5. Per controlar el servo amb un potenciòmetre (`analogRead` dona 0-1023) fem servir…
   - a) `delay(1023);`
   - b) `digitalWrite(valor, HIGH);`
   - c) `map(valor, 0, 1023, 0, 180)` per reescalar la lectura a graus.
   - d) `Serial.begin(180);`

6. Per què **no** es connecta un motor DC directament a un pin de l'Arduino i cal un **driver (pont H)**?
   - a) Perquè un pin dona molt poc corrent; el driver l'amplifica des d'una alimentació externa.
   - b) Perquè el pin no té prou tensió i el motor cremaria l'USB.
   - c) Perquè el motor només entén senyals analògics.
   - d) No cal driver, es pot connectar directament sense problema.

7. Al pont H **L298N**, quin senyal regula la **velocitat** del motor?
   - a) `IN1` en HIGH.
   - b) `ENA` amb un valor PWM (`analogWrite`).
   - c) El pin GND.
   - d) La tensió de les piles, que no es pot canviar.

8. Al L298N, els pins **`IN1`** i **`IN2`** serveixen per…
   - a) Regular la velocitat.
   - b) Alimentar l'Arduino.
   - c) Llegir la distància de l'ultrasons.
   - d) Determinar el *sentit* de gir del motor.

9. Segons la lògica del pont H, si `IN1` i `IN2` estan **tots dos a LOW**, el motor…
   - a) S'atura (no gira).
   - b) Gira endavant a màxima velocitat.
   - c) Gira enrere.
   - d) Fa un pols i es reinicia.

10. Què és la **massa comuna** i per què és imprescindible?
    - a) Un cable de dades entre l'Arduino i el motor.
    - b) La distància mínima de seguretat de l'ultrasons.
    - c) Unir el GND de l'Arduino amb el GND de l'alimentació del motor perquè comparteixin la mateixa referència.
    - d) El pin de 5V de l'Arduino.

---

## Pregunta oberta (opcional)

11. Explica (en paraules o amb pseudocodi) com faries **tres funcions** per al motor DC amb el
    pont H: `endavant(vel)`, `enrere(vel)` i `atura()`. Indica quins valors donaries a `IN1`,
    `IN2` i `ENA` en cada cas:

___________________________________________________________________

___________________________________________________________________

---

*Qüestionari de conceptes de la SA4. Es recolza en `SA4_fitxa_alumnat.md`,
`SA4_guia_docent.md` i `SA4_esquemes_connexions.md` (servo, motor DC, pont H L298N).
Llicència CC BY-SA 4.0.*
