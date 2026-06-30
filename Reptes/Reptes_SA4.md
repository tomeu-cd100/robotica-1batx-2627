# Reptes SA4 · Moviment: servos, motors i ponts H

**Tria UN dels tres reptes.** Tots **controlen un actuador de moviment** (servo o motor DC) **segons una entrada**. Mateix requisit mínim, ampliacions graduades. Atenció: els motors necessiten **alimentació externa** i seguretat.

> **Format "producte real":** cada repte simula un **encàrrec professional**. Hi trobaràs **qui** us el demana (client), **quin producte** heu de lliurar i **per a què** serveix al món real. El requisit tècnic és el mateix d'abans; el marc us ajuda a decidir disseny i prioritats com ho faria un equip d'enginyeria.

> **Continguts SA4:** servomotor (llibreria `Servo.h`), motor DC, pont H (sentit i velocitat), `analogWrite`. · **Codi base:** `Classes/SA4/codi/`.

> 🌟 **Producte estrella del trimestre:** el **Repte C (braç robòtic)** és la peça central del 2n trimestre. A SA5 hi afegireu un **comandament micro:bit** i a SA6 el dotareu de **moviment intel·ligent i precís**. Si el vostre equip vol acumular cap al projecte final (SA9), comenceu per aquí. Vegeu `Programació didàctica/08c_Projectes_vida_real.md`.

---

## 🤖 Repte C · Braç robòtic ⭐ *(producte estrella)*

**Client.** Un **petit taller d'automatització** vol un **braç robòtic econòmic** per a tasques repetitives: dispensar una dosi, classificar peces per mida/color o desplaçar objectes lleugers d'un punt a un altre.

**Producte a lliurar.** Un **braç robòtic d'un o més servos** que executa una **tasca útil** quan rep una ordre (sensor, polsador o, més endavant, comandament).

**Per a què serveix al món real.** Robòtica industrial col·laborativa, automatització de laboratori, accessibilitat (braços assistencials), línies de muntatge.

**Què treballa.** Control precís d'un **servo** (`Servo.h`) per a una acció útil, activat per una entrada.

**Requisit mínim.**
- Un **servo** que executa un **moviment de tasca** (p. ex. 0°→120°→0°) quan es detecta una entrada.
- Codi comentat.

**Ampliacions graduades.**
1. *(bàsica)* Controla l'angle directament amb un **potenciòmetre** (mode manual).
2. *(notable)* Dispensa **una dosi** per activació (un sol cicle, evita repeticions amb *debounce*).
3. *(⭐⭐⭐)* Coordina **dos servos** (p. ex. base + pinça) per a una tasca completa de "agafa i deixa".

> **Cap a SA5/SA6:** el moviment manual amb potenciòmetre evolucionarà cap a **moviment suau amb control proporcional / màquina d'estats** (SA6). El **comandament per micro:bit** (SA5) és una **via avançada i opcional**: cal un pont de comunicació (vegeu la nota tècnica a `Programació didàctica/08c_Projectes_vida_real.md`). La via recomanada manté el control al mateix Arduino (potenciòmetre/joystick).

---

## 🚧 Repte A · Barrera automàtica

**Client.** La gestió d'un **pàrquing o pas a nivell** necessita una **barrera automàtica** que s'obri només quan arriba un vehicle autoritzat i es tanqui sola.

**Producte a lliurar.** Una **barrera motoritzada** que s'obre i es tanca segons una entrada (sensor o polsador), amb senyalització d'estat.

**Per a què serveix al món real.** Control d'accessos, seguretat viària, regulació d'aparcaments.

**Què treballa.** Control d'un **servo** (angles 0°–180°) amb la llibreria `Servo.h`, activat per una entrada.

**Requisit mínim.**
- Un **servo** que passa de **tancat (0°)** a **obert (90°/180°)** quan s'activa un **polsador** (o sensor), i torna.
- Codi comentat amb la llibreria inclosa.

**Ampliacions graduades.**
1. *(bàsica)* Fes el moviment **suau** (graus de mica en mica amb un `for`).
2. *(notable)* Obre amb **ultrasons** (detecta el cotxe) i tanca sol passat un temps.
3. *(⭐⭐⭐)* Afegeix un **LED/semàfor** coordinat (vermell tancada, verd oberta).

> **Continuïtat de trimestre:** aquesta barrera reaprofita la senyalització de SA2 i la detecció de SA3; és la versió "amb moviment" del peatge intel·ligent del 1r trimestre.

---

## 🌬️ Repte B · Ventilador o vehicle amb motor

**Client.** Un fabricant de **petits electrodomèstics o vehicles** vol un prototip que controli un **motor DC**: engegar, parar, regular velocitat i invertir el sentit.

**Producte a lliurar.** Un **dispositiu motoritzat** (ventilador regulable o vehicle) governat per una entrada, amb alimentació segura.

**Per a què serveix al món real.** Climatització, mobilitat elèctrica, automoció, electrodomèstics.

**Què treballa.** Motor DC amb **pont H**: control de sentit i de velocitat (PWM).

**Requisit mínim.**
- Engegar i parar un **motor DC** mitjançant un **pont H**, controlat per una entrada (polsador/potenciòmetre).
- Codi comentat; alimentació externa connectada amb seguretat.

**Ampliacions graduades.**
1. *(bàsica)* Regula la **velocitat** amb PWM des d'un potenciòmetre.
2. *(notable)* Afegeix **canvi de sentit** (endavant/enrere) amb el pont H.
3. *(⭐⭐⭐)* Programa una **seqüència** (accelera, manté, frena) amb funcions.

> **Cap a SA7:** el control de motor DC amb pont H és la base de la **locomoció del robot mòbil** del 3r trimestre.

---

## Material necessari (segons repte)
- Arduino UNO + USB · servo SG90 / motor DC + **pont H** (L298N o similar) · **font d'alimentació externa** per als motors · polsador/potenciòmetre/ultrasons segons repte · o **Tinkercad/Wokwi**.
- **Repte C (braç):** preveure **2 servos** i una **estructura** (cartró, fusta o impressió 3D) per equip.

## Per on començar (mètode de projecte + PRIMM)
1. **Analitzar:** quin moviment necessito i què el dispara? Qui és el client i què valora?
2. **Dissenyar (Predir):** angles/velocitats i diagrama de connexió (compte amb l'alimentació).
3. **Prototipar:** parteix de `Classes/SA4/codi/` (`01_servo_potenciometre`, `02_motor_pont_h`, `04_barrera_automatica`).
4. **Provar:** prova **sense càrrega** primer; comprova sentits i angles.
5. **Millorar:** suavitza moviments, afegeix sensor o segon actuador.

## Com s'avalua
| Rúbrica | Per què |
|---|---|
| **R1** (codi) | Ús de llibreries i funcions, lògica de control. |
| **R2** (circuit) | Connexió i **seguretat** amb motors i alimentació externa. |
| **R3** (projecte) | Integració actuador + entrada, control fiable, **adequació al producte demanat**. |

## Producte / entrega
- Codi `.ino` comentat + esquema (amb alimentació) + quadern tècnic.
- **Full de producte** (1 cara): qui és el client, què fa el producte i una millora futura.

---

## Orientació docent
- **Marc "producte real":** el client i el lliurable són una **capa de sentit**, no afegeixen requisit tècnic. Ajuden a prioritzar disseny i a connectar amb SA5/SA6 i el projecte final. El **Repte C** és el recomanat si l'equip vol construir cap a SA9.
- **Seguretat (clau):** alimentar motors amb **font externa**, mai des del pin de 5 V; **GND comú**; muntar amb la placa desconnectada. Insistir en R2 (seguretat).
- **Errors freqüents:** oblidar `#include <Servo.h>` i `attach()`; motor que no gira per manca de pont H/alimentació; sentit invertit (intercanviar sortides del pont H).
- **Diferenciació:** el mínim és mou-un-actuador-amb-una-entrada; les ampliacions porten a PWM, sentit, *debounce* i coordinació de dos actuadors.
- **Gestió d'aula:** si no hi ha ponts H per a tothom, simular a Tinkercad o compartir per torns; el repte A enllaça amb `04_barrera_automatica`. Per al braç (C), una estructura comuna impresa en 3D estalvia temps de muntatge.
