# Reptes SA4 · Moviment: servos, motors i ponts H

**Tria UN dels tres reptes.** Tots **controlen un actuador de moviment** (servo o motor DC) **segons una entrada**. Mateix requisit mínim, ampliacions graduades. Atenció: els motors necessiten **alimentació externa** i seguretat.

> **Continguts SA4:** servomotor (llibreria `Servo.h`), motor DC, pont H (sentit i velocitat), `analogWrite`. · **Codi base:** `Classes/SA4/codi/`.

---

## 🚧 Repte A · Barrera automàtica

**Context.** La barrera d'un pàrquing o pas a nivell que **s'obre i es tanca** quan ho demana un sensor o polsador.

**Què treballa.** Control d'un **servo** (angles 0°–180°) amb la llibreria `Servo.h`, activat per una entrada.

**Requisit mínim.**
- Un **servo** que passa de **tancat (0°)** a **obert (90°/180°)** quan s'activa un **polsador** (o sensor), i torna.
- Codi comentat amb la llibreria inclosa.

**Ampliacions graduades.**
1. *(bàsica)* Fes el moviment **suau** (graus de mica en mica amb un `for`).
2. *(notable)* Obre amb **ultrasons** (detecta el cotxe) i tanca sol passat un temps.
3. *(⭐⭐⭐)* Afegeix un **LED/semàfor** coordinat (vermell tancada, verd oberta).

---

## 🌬️ Repte B · Ventilador o vehicle amb motor

**Context.** Controla un **motor DC** (un ventilador o les rodes d'un vehicle): engegar, parar, canviar de velocitat i de sentit.

**Què treballa.** Motor DC amb **pont H**: control de sentit i de velocitat (PWM).

**Requisit mínim.**
- Engegar i parar un **motor DC** mitjançant un **pont H**, controlat per una entrada (polsador/potenciòmetre).
- Codi comentat; alimentació externa connectada amb seguretat.

**Ampliacions graduades.**
1. *(bàsica)* Regula la **velocitat** amb PWM des d'un potenciòmetre.
2. *(notable)* Afegeix **canvi de sentit** (endavant/enrere) amb el pont H.
3. *(⭐⭐⭐)* Programa una **seqüència** (accelera, manté, frena) amb funcions.

---

## 🤖 Repte C · Braç o dispensador amb servo

**Context.** Un mecanisme que **fa una tasca** amb un servo: dispensar (pinso, gel hidroalcohòlic), saludar, o classificar.

**Què treballa.** Control precís d'un servo per a una acció útil, activat per una entrada.

**Requisit mínim.**
- Un **servo** que executa un **moviment de tasca** (p. ex. 0°→120°→0°) quan es detecta una entrada.
- Codi comentat.

**Ampliacions graduades.**
1. *(bàsica)* Controla l'angle directament amb un **potenciòmetre**.
2. *(notable)* Dispensa **una dosi** per activació (un sol cicle, evita repeticions amb *debounce*).
3. *(⭐⭐⭐)* Coordina **dos servos** (p. ex. base + pinça) per a una tasca completa.

---

## Material necessari (segons repte)
- Arduino UNO + USB · servo SG90 / motor DC + **pont H** (L298N o similar) · **font d'alimentació externa** per als motors · polsador/potenciòmetre/ultrasons segons repte · o **Tinkercad/Wokwi**.

## Per on començar (mètode de projecte + PRIMM)
1. **Analitzar:** quin moviment necessito i què el dispara?
2. **Dissenyar (Predir):** angles/velocitats i diagrama de connexió (compte amb l'alimentació).
3. **Prototipar:** parteix de `Classes/SA4/codi/` (`01_servo_potenciometre`, `02_motor_pont_h`, `04_barrera_automatica`).
4. **Provar:** prova **sense càrrega** primer; comprova sentits i angles.
5. **Millorar:** suavitza moviments, afegeix sensor o segon actuador.

## Com s'avalua
| Rúbrica | Per què |
|---|---|
| **R1** (codi) | Ús de llibreries i funcions, lògica de control. |
| **R2** (circuit) | Connexió i **seguretat** amb motors i alimentació externa. |
| **R3** (projecte) | Integració actuador + entrada, control fiable. |

## Producte / entrega
- Codi `.ino` comentat + esquema (amb alimentació) + quadern tècnic.

---

## Orientació docent
- **Seguretat (clau):** alimentar motors amb **font externa**, mai des del pin de 5 V; **GND comú**; muntar amb la placa desconnectada. Insistir en R2 (seguretat).
- **Errors freqüents:** oblidar `#include <Servo.h>` i `attach()`; motor que no gira per manca de pont H/alimentació; sentit invertit (intercanviar sortides del pont H).
- **Diferenciació:** el mínim és mou-un-actuador-amb-una-entrada; les ampliacions porten a PWM, sentit, *debounce* i coordinació de dos actuadors.
- **Gestió d'aula:** si no hi ha ponts H per a tothom, simular a Tinkercad o compartir per torns; el repte A enllaça amb `04_barrera_automatica`.
