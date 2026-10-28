# SA6 · Solucions del qüestionari de conceptes

> **Material del docent.** Clau de correcció i versió Google Forms de
> «SA6 · Qüestionari de conceptes (MeArm: homing, histèresi i màquina d'estats)»
> ([qüestionari](SA6_questionari_conceptes.md)). La tasca autocorrectiva és al tema **MeArm** del Classroom:
> [«SA6 · Qüestionari de conceptes (MeArm)»](https://classroom.google.com/c/ODY4ODU4Njk0NTEy).

> 🦾 **Versió del 28-10-2026, orientada al braç.** La versió anterior (sense el braç) es
> manté al Classroom, al tema de la SA; no s'ha esborrat.

---

## Clau de correcció (ús del professorat)

| Pregunta | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 |
|---|---|---|---|---|---|---|---|---|---|---|
| **Resposta** | c | a | b | d | b | a | c | d | b | a |

> **Barem orientatiu:** 10 preguntes × 1 punt = 10. La pregunta 11 pot pujar nota
> (aplicació) o quedar fora del còmput.

---

## Versió Google Forms

> Creada automàticament per `Material Classroom/crear_mearm_classroom.js` a partir
> del qüestionari i d'aquesta clau: mode qüestionari, **1 punt** per pregunta.

**Títol:** `SA6 · Qüestionari de conceptes (MeArm)`

**Preguntes 1-10** (opció múltiple; correcta en **negreta**)
1. Quina diferència hi ha entre moure la base «a cegues» a 20° i fer el **homing** amb el final de carrera? → Cap: tots dos són llaç tancat. / El primer és llaç tancat i el homing, llaç obert. / **El primer és llaç obert (confia que hi ha arribat); el homing és llaç tancat (el sensor diu quan hi és).** / El homing no fa servir cap sensor.
2. En un sistema de control, la **realimentació** és… → **Mesurar la sortida i tornar-la a l'entrada per comparar-la amb la consigna.** / Apagar el sistema quan hi ha un error. / Un tipus de sensor de temperatura. / Fer que el servo vagi més ràpid.
3. Per què el homing porta la guarda `else if (angle <= 0)`? → Perquè el servo no admet angles negatius al `write()`. / **Perquè si el sensor falla o s'ha desconnectat, el braç no es quedi empenyent per sempre.** / Perquè així el homing va més ràpid. / Perquè el zero sempre és a 0°.
4. La **histèresi** de la pinça automàtica consisteix a… → Fer servir un sol llindar de distància. / Tancar la pinça només amb un botó. / Mesurar la distància dues vegades. / **Fer servir dos llindars: tancar per sota d'un i obrir només per sobre d'un altre.**
5. Si la pinça es tanca a `d < 8` i s'obre a `d >= 8`, què passa amb l'objecte just a uns 8 cm? → La pinça es queda oberta per sempre. / **La pinça fa clic-clic: es tanca i s'obre contínuament pel soroll de la mesura.** / La pinça es tanca i no s'obre mai. / L'ultrasons deixa de funcionar.
6. Amb `TANCA_CM = 6` i `OBRE_CM = 10`, l'objecte és a 8 cm. Què fa la pinça? → **Manté l'estat que tenia (oberta o tancada).** / Sempre es tanca. / Sempre s'obre. / S'obre i es tanca cada 60 ms.
7. A la màquina d'estats del braç, per a què serveix el `break` al final de cada `case`? → Per aturar el braç. / Per sortir del `loop()`. / **Perquè el programa no continuï executant el `case` següent.** / Per esperar 20 ms.
8. Per què l'**emergència** es comprova **abans** del `switch` i no dins d'un `case`? → Perquè així el codi és més curt. / Perquè el `switch` no admet sensors. / Perquè només es pot comprovar un cop. / **Perquè així mana per damunt de tot: un xoc porta a EMERGÈNCIA estigui on estigui el braç.**
9. Com se surt de l'estat EMERGÈNCIA? → Sol, passats 2 segons. / **Amb el sensor alliberat **i** prement el polsador A (rearmament manual).** / Prement el polsador B. / Desendollant les piles.
10. Amb el moviment proporcional `angle = angle + K * (consigna - angle)`, què passa amb `K = 1`? → **El servo salta directament a la consigna, sense suavitat.** / El servo no es mou mai. / El servo va més lent que amb `K = 0.1`. / El servo oscil·la sense parar.

**Pregunta 11** (paràgraf, sense puntuació) — Dibuixa o descriu el **diagrama d'estats** del teu braç: els quatre estats (repòs, manual, replay, emergència) i què fa passar d'un a l'altre.
