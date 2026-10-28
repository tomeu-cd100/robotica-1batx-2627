# SA4 · Solucions del qüestionari de conceptes

> **Material del docent.** Clau de correcció i versió Google Forms de
> «SA4 · Qüestionari de conceptes (MeArm: servos, sensors i moviment)»
> ([qüestionari](SA4_questionari_conceptes.md)). La tasca autocorrectiva és al tema **MeArm** del Classroom:
> [«SA4 · Qüestionari de conceptes (MeArm)»](https://classroom.google.com/c/ODY4ODU4Njk0NTEy).

> 🦾 **Versió del 28-10-2026, orientada al braç.** La versió anterior (sense el braç) es
> manté al Classroom, al tema de la SA; no s'ha esborrat.

---

## Clau de correcció (ús del professorat)

| Pregunta | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 |
|---|---|---|---|---|---|---|---|---|---|---|
| **Resposta** | c | a | d | b | c | a | b | d | a | c |

> **Barem orientatiu:** 10 preguntes × 1 punt = 10. La pregunta 11 pot pujar nota
> (aplicació) o quedar fora del còmput.

---

## Versió Google Forms

> Creada automàticament per `Material Classroom/crear_mearm_classroom.js` a partir
> del qüestionari i d'aquesta clau: mode qüestionari, **1 punt** per pregunta.

**Títol:** `SA4 · Qüestionari de conceptes (MeArm)`

**Preguntes 1-10** (opció múltiple; correcta en **negreta**)
1. Quina és la diferència principal entre un **servomotor** (les articulacions del braç) i un **motor DC**? → No n'hi ha cap, són el mateix. / El motor DC controla l'angle exacte i el servo gira sense parar. / **El servo controla la *posició* (angle 0-180°); el motor DC fa un gir continu.** / El servo només funciona amb piles i el motor DC amb USB.
2. Quina **llibreria** cal incloure per controlar els servos del braç a l'Arduino? → **`Servo.h`** / `Ultrasonic.h` / `Wire.h` / No cal cap llibreria.
3. Al **pas 0** del muntatge, la instrucció `servo.write(90);` serveix per… → Fer girar el servo 90 voltes. / Esperar 90 mil·lisegons. / Llegir el valor del pin 90. / **Deixar el servo al centre del recorregut abans de posar-hi la banya.**
4. Per què els **quatre servos** del braç van a les **piles** i no al pin 5V de l'Arduino? → Perquè els servos només funcionen amb 6 V exactes. / **Perquè junts demanen més corrent del que l'USB i el 5V de l'UNO poden donar; el − de les piles s'uneix al GND de l'Arduino.** / Perquè així no cal connectar cap GND. / Perquè el pin 5V només serveix per als LEDs.
5. Al braç, `map(analogRead(A0), 0, 1023, BASE_MIN, BASE_MAX)` converteix al **rang segur** i no a 0-180. Per què? → Perquè `map()` no accepta el número 180. / Perquè així el servo va més ràpid. / **Perquè el servo no arribi mai al topall de la peça, on faria força i s'escalfaria.** / Perquè el potenciòmetre només dona valors fins a 150.
6. Què aconsegueix la **zona morta** del producte de la SA4 (`abs(nou - actual) > ZONA_MORTA`)? → **Que el braç no tremoli pel soroll del potenciòmetre.** / Que el braç vagi el doble de ràpid. / Que el servo no necessiti alimentació. / Que el potenciòmetre llegeixi de 0 a 180.
7. Per què el motor DC necessita un **pont H** (L298N) i no es connecta directament a un pin? → Perquè el pin cremaria l'USB. / **Un pin dona poc corrent; el driver l'amplifica amb una alimentació externa i permet invertir el sentit.** / Perquè el motor només entén senyals analògics. / No cal: es pot connectar directament.
8. Al pont H, què decideixen els senyals `IN1` i `IN2`? → La velocitat del motor. / L'alimentació de l'Arduino. / La distància de l'ultrasons. / **El sentit de gir del motor.**
9. A la SA3 l'ultrasons anava als pins 12/11. Per què al braç passa al **D7/D8**? → **Perquè el D11 és ara el servo de la pinça.** / Perquè el 12 i l'11 no funcionen amb servos. / Perquè el D7 i el D8 són més ràpids. / Perquè l'ultrasons necessita pins PWM.
10. Per què `05_dos_servos_millis` fa servir `millis()` en lloc de `delay()`? → Perquè `delay()` no existeix a l'Arduino UNO. / Perquè `millis()` mou els servos més lluny. / **Perquè `delay()` atura tot el programa i les dues articulacions no es podrien moure alhora.** / Perquè `millis()` estalvia piles.

**Pregunta 11** (paràgraf, sense puntuació) — Explica què fa la funció `mouSiCal(Servo &servo, int &actual, int nou)` del producte de la SA4 i per què porta el símbol `&` als paràmetres.
