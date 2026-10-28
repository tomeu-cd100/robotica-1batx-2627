# SA4 · Esquemes i connexions

> 🧑‍🎓 **Quan toca?** Tingues aquesta pàgina oberta **mentre muntes** cada circuit. Correspondència amb la fitxa: **§1** → Activitat 1 (S1) · **§2** → Activitat 2 (S2) · **§3** → Activitat 3 (S3) · **§4** → Activitat 4, el producte (S4) · **§5** → bastida de la S3.

> ⚠️ **Regla d'or:** **massa comuna** (uneix el GND de l'Arduino amb el GND de l'alimentació del motor) i **mai** alimentis motors/servos des del pin 5V de l'Arduino si en mous més d'un.

---

## 1. Servo controlat per potenciòmetre (`01_servo_potenciometre.ino`)

**Servo de la base del braç** (amb un sol servo, pot anar al 5V de l'Arduino):

| Cable servo | Cap a |
|---|---|
| Marró/negre (GND) | GND |
| Vermell (V+) | 5 V (o alimentació externa) |
| Taronja/groc (senyal) | Pin 9 |

**Potenciòmetre:** extrems a 5 V i GND; cursor a **A0**.

![El potenciòmetre (entrada, cursor a A0) marca la posició; l'Arduino la converteix i envia el senyal pel pin 9 al servo, que gira de 0 a 180 graus](img/sa4-servo-potenciometre.svg)

![Captura de Tinkercad: Arduino UNO amb el potenciòmetre a la protoboard (extrems als carrils de 5 V i GND, cursor a A0) i el microservo SG90 connectat fora de la placa: senyal taronja al pin 9~, alimentació vermella i negra als carrils de 5 V i GND](img/sa4-tinkercad-servo-potenciometre.png)

▶ **Obre la simulació a Tinkercad** (pots fer *Copy and Tinker* per modificar-la): <https://www.tinkercad.com/things/dVZLRyR1UDN-sa4-servo-amb-potenciometre-posicio-amb-una-llibreria?sharecode=5KXEzbtaibn7wJtSscbtm_MyxRrX9pmtmsQFqcmA0YY>

---

## 2. Motor DC amb pont H L298N (`02_motor_pont_h.ino`, fora del braç)

| L298N | Cap a |
|---|---|
| ENA | Pin 5 ~ (PWM, velocitat) |
| IN1 | Pin 7 (direcció) |
| IN2 | Pin 8 (direcció) |
| OUT1 / OUT2 | Bornes del motor DC |
| +12V (VS) | + alimentació externa (piles) |
| GND | GND piles **i** GND Arduino (massa comuna) |

![Motor DC amb pont H L298N: l'Arduino controla ENA (pin 5, velocitat PWM), IN1 (pin 7) i IN2 (pin 8, direcció); el motor va a OUT1 i OUT2; les piles alimenten +12V; i el GND de l'Arduino, el de les piles i el del L298N s'uneixen en una massa comuna](img/sa4-pont-h-l298n.svg)

**Variant Tinkercad (xip L293D):** Tinkercad no té el mòdul L298N; fes servir el xip **L293D** (encapsulat de 16 potes). El codi és exactament el mateix — només canvia on van a parar els cables:

| L293D (pota) | Cap a |
|---|---|
| 1 · EN1,2 | Pin 5 ~ Arduino (velocitat PWM, fa el paper d'ENA) |
| 2 · IN1 | Pin 7 |
| 7 · IN2 | Pin 8 |
| 3 · OUT1 i 6 · OUT2 | Bornes del motor |
| 8 · VCC2 (potència del motor) | + de la pila de 9 V |
| 16 · VCC1 (lògica) | **5 V de l'Arduino** (sense això el xip no fa res!) |
| 4, 5, 12, 13 · GND | − de la pila **i** GND de l'Arduino (massa comuna) |

> ⚠️ Tres errors típics amb el L293D: (1) oblidar el **5 V a la pota 16** — el xip té dues alimentacions, no una; (2) punxar el motor a OUT3/OUT4 (costat dret) mentre controles IN1/IN2 (costat esquerre) — motor i senyals han d'anar al **mateix costat** del xip; (3) comptar les potes amb el xip girat — l'**osca** (mitja lluna) marca on és la pota 1. A Tinkercad, passa el ratolí per sobre de cada pota per veure'n el nom.

![Captura de Tinkercad: Arduino UNO amb el xip L293D; senyals als pins 8 (taronja), 7 (verd) i 5~ (cian), cable vermell del 5 V de la placa a VCC1, motor DC a les sortides del xip i pila de 9 V amb el positiu a VCC2 i el negatiu unit al GND de l'Arduino (massa comuna)](img/sa4-tinkercad-motor-pont-h.png)

▶ **Obre la simulació a Tinkercad** (pots fer *Copy and Tinker* per modificar-la): <https://www.tinkercad.com/things/1YK0190RWyx-sa4-practica-2-motor-dc-i-pont-h?sharecode=cOGf37CfyJpL0QQMgr96N_um7FE44uY_b6kexNjqEOI>

---

## 3. Ultrasons → braç (`03_ultrasons_brac.ino`)

Dos servos del braç (base i pinça) i l'ultrasons de l'**estació de recollida**.
Són els pins definitius del braç: el que connectes avui ja no es mou
([mapa de pins](../00_General/00_Projecte_T2_Brac.md#cablatge)).

| Component | Pin | Notes |
|---|---|---|
| Servo base (senyal) | 9 | + i − a les **piles**, − també al GND de l'Arduino |
| Servo pinça (senyal) | 11 | igual |
| HC-SR04 TRIG / ECHO | 7 / 8 | VCC=5V, GND=GND de l'Arduino |

> 🔌 A la SA3 l'ultrasons anava al 12/11. Al braç, el **D11 és la pinça**:
> l'ultrasons passa al **D7/D8**.

![Esquema: Arduino UNO amb el servo de la base al pin 9 i el de la pinça al pin 11, alimentats per piles amb GND comú, i l'ultrasons amb TRIG al pin 7 i ECHO al pin 8](img/sa4-ultrasons-brac.svg)

---

## 4. Producte: el braç amb quatre potenciòmetres (`04_brac_potenciometres.ino`)

| Component | Pin | Notes |
|---|---|---|
| Servo base / esquerre / dret / pinça | 9 / 6 / 10 / 11 | Tots quatre a les **piles**, amb GND comú |
| Potenciòmetre base / dret / pinça / esquerre | A0 / A1 / A2 / A3 | Extrems a 5V i GND de l'Arduino |

> ⚠️ **Quatre servos mai des de l'USB ni des del pin 5V de l'UNO.** Les
> piles (4 × AA) només alimenten els servos; el seu − va també al GND de
> l'Arduino.

![Esquema de connexions del MeArm amb Arduino: les piles alimenten els quatre servos per una línia + i una de GND, amb el GND de les piles unit al GND de l'Arduino; senyals a D6 (esquerre), D9 (base), D10 (dret) i D11 (pinça); quatre potenciòmetres alimentats pel 5V de l'Arduino amb el cursor a A0, A1, A2 i A3](../00_General/img/mearm-connexions-arduino.svg)

---

## 5. Dues articulacions amb `millis()` (`05_dos_servos_millis.ino`)

El mateix muntatge de base i pinça de l'apartat 3, sense l'ultrasons. Tota la
gràcia d'aquesta pràctica és al codi.

![Esquema: Arduino UNO amb el servo de la base al pin 9 i el de la pinça al pin 11, alimentats per piles amb GND comú](img/sa4-dos-servos-millis.svg)

---

## Simulació interactiva (Wokwi)

- ▶ **Simulació (Servo controlat amb potenciòmetre):** <https://wokwi.com/projects/468088128427008001>
- **Projecte al repositori:** [`Simulacions/Wokwi/SA4_servo_potenciometre/`](../../Simulacions/Wokwi/SA4_servo_potenciometre/) (`diagram.json` + `sketch.ino` + `libraries.txt`).

> Obre l'enllaç i prem **▶**. Gira el **potenciòmetre** per moure el servo de 0 a 180°. La llibreria **Servo** s'instal·la sola amb el botó *Install "Servo" library* que apareix en compilar (pont H i motors DC no es porten a Wokwi).
