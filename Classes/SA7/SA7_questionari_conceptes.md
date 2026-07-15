# SA7 · Qüestionari de conceptes (robòtica mòbil: moviment i comportaments autònoms)

> **Ús.** Comprovació breu dels conceptes de robòtica mòbil de la SA7 (cinemàtica
> diferencial, trajectòries, evita-obstacles i seguidor de línia). Es pot fer servir com a
> **repàs formatiu** o com a **prova curta qualificable** (10 preguntes × 1 punt = **nota
> 0-10**). Durada orientativa: **15-20 min**, individual.

**Nom:** ______________________  **Grup:** __________  **Data:** __________

---

## Preguntes (tria una resposta)

1. La **cinemàtica diferencial** d'un robot de dues rodes vol dir que…
   - a) Totes les rodes es mouen amb un únic motor central.
   - b) **Es controla el moviment variant la velocitat de cada roda per separat.**
   - c) El robot gira amb un volant, com un cotxe.
   - d) Les rodes sempre han d'anar exactament igual.

2. Perquè el robot vagi **recte**, les dues rodes han d'anar…
   - a) **A la mateixa velocitat i en el mateix sentit.**
   - b) A velocitats ben diferents.
   - c) Una aturada i l'altra en marxa.
   - d) En sentits oposats.

3. Per **girar cap a la dreta** (sense aturar-se), la roda esquerra ha d'anar…
   - a) Més lenta que la dreta.
   - b) **Més ràpida que la dreta.**
   - c) Igual que la dreta.
   - d) Cap enrere sempre.

4. Escrivim funcions com `endavant()`, `gira_dreta()` o `atura()`. Descompondre el moviment
   en **funcions** fa que el codi…
   - a) Sigui més lent d'executar.
   - b) **Sigui més clar i fàcil de reutilitzar i corregir.**
   - c) Ja no necessiti motors.
   - d) No es pugui modificar.

5. Fer un gir de 90° **per temps** (p. ex. girar durant 400 ms)…
   - a) És sempre exacte.
   - b) **És senzill però poc precís: depèn de la bateria i de la superfície.**
   - c) No cal calibrar-lo mai.
   - d) Funciona sense motors.

6. Al codi de cada `.ino`, el bloc `// === PINS (AJUSTAR) ===`…
   - a) Conté la lògica del comportament i no s'ha de mirar.
   - b) Esborra el programa en pujar-lo.
   - c) **És on cal posar els pins reals dels motors i sensors segons el model de placa.**
   - d) Serveix per apagar el robot.

7. En l'**evita-obstacles**, el sensor d'**ultrasons** serveix per…
   - a) Seguir una línia negra.
   - b) **Mesurar la distància fins a un obstacle.**
   - c) Regular la velocitat dels motors.
   - d) Llegir la temperatura ambient.

8. Els **sensors de línia (IR)** es col·loquen sota el robot mirant el terra. Sobre una
   línia negra i un fons blanc…
   - a) Tots dos punts donen el mateix valor.
   - b) **El fons blanc reflecteix molt i la línia negra poc; comparant els sensors, el robot corregeix la direcció.**
   - c) El sensor mesura la distància en centímetres.
   - d) La línia negra reflecteix més llum que el fons blanc.

9. **Calibrar el llindar** dels sensors IR vol dir…
   - a) Canviar els pins dels motors.
   - b) **Ajustar el valor que separa "línia" de "fons" segons la pista i l'alçada al terra.**
   - c) Apagar els sensors.
   - d) Augmentar la velocitat del robot.

10. Un **comportament reactiu** (evita-obstacles o seguidor) es programa dins del `loop()`
    seguint el cicle…
    - a) Acció → percepció → decisió, un sol cop.
    - b) **Percepció (llegir sensors) → decisió → acció (moure motors), repetit contínuament.**
    - c) Una única lectura a l'inici i prou.
    - d) Només decisió, sense llegir cap sensor.

---

## Pregunta oberta (opcional)

11. Escriu (o explica en paraules o pseudocodi) el `loop()` d'un robot que **evita
    obstacles** amb l'ultrasons: llegir la distància i, si hi ha un obstacle a prop, decidir
    què fa. Indica quines funcions faries servir (p. ex. `dist()`, `endavant()`,
    `gira_dreta()`, `atura()`):

___________________________________________________________________

___________________________________________________________________

---

## Clau de correcció (ús del professorat)

| Pregunta | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 |
|---|---|---|---|---|---|---|---|---|---|---|
| **Resposta** | b | a | b | b | b | c | b | b | b | b |

> **Barem orientatiu:** 10 preguntes × 1 punt = 10. La pregunta 11 pot pujar nota
> (aplicació) o quedar fora del còmput.

---

## Versió Google Forms (llesta per copiar)

> Crea un formulari nou a **Google Forms**, activa **"Convertir en qüestionari"** i marca
> la resposta correcta de cada pregunta. Assigna **1 punt** a les preguntes 1-10.

**Títol:** `SA7 · Conceptes — Robòtica mòbil (moviment i comportaments autònoms)`
**Descripció:** `Comprovació dels conceptes de robòtica mòbil de la SA7: cinemàtica diferencial, trajectòries, evita-obstacles i seguidor de línia.`

**Camps inicials**
- Nom i cognoms — *Resposta curta* (obligatori).
- Grup/classe — *Resposta curta*.

**Preguntes 1-10** (tipus: *Opció múltiple*; **1 punt** cadascuna; correcta en **negreta**)
1. La cinemàtica diferencial vol dir… → Un motor central / **Variar la velocitat de cada roda per separat** / Gira amb volant / Rodes sempre iguals.
2. Perquè vagi recte, les rodes han d'anar… → **Mateixa velocitat i sentit** / Velocitats diferents / Una aturada / Sentits oposats.
3. Per girar a la dreta, la roda esquerra ha d'anar… → Més lenta / **Més ràpida que la dreta** / Igual / Cap enrere.
4. Descompondre el moviment en funcions fa que el codi… → Més lent / **Més clar i reutilitzable** / Sense motors / No modificable.
5. Un gir de 90° per temps… → Sempre exacte / **Senzill però poc precís (bateria/superfície)** / No cal calibrar / Sense motors.
6. El bloc `// === PINS (AJUSTAR) ===`… → Lògica que no es mira / Esborra el programa / **On es posen els pins reals de motors i sensors** / Apaga el robot.
7. L'ultrasons de l'evita-obstacles serveix per… → Seguir línia / **Mesurar la distància a un obstacle** / Regular velocitat / Llegir temperatura.
8. Els sensors IR sobre línia negra i fons blanc… → Mateix valor / **El blanc reflecteix molt i el negre poc; es compara i corregeix** / Mesuren cm / El negre reflecteix més.
9. Calibrar el llindar dels IR vol dir… → Canviar pins de motors / **Ajustar el valor que separa línia de fons** / Apagar sensors / Pujar velocitat.
10. El comportament reactiu al `loop()` segueix… → Acció→percepció→decisió un cop / **Percepció→decisió→acció, repetit contínuament** / Una lectura a l'inici / Només decisió.

**Pregunta 11** (tipus: *Paràgraf*; sense puntuació) — descriure el `loop()` d'un evita-obstacles amb l'ultrasons.

> **Recollida:** Respostes → full de càlcul vinculat, amb la nota de l'1 al 10 autocalculada.

---

*Qüestionari de conceptes de la SA7. Es recolza en `SA7_fitxa_alumnat.md`,
`SA7_esquemes_connexions.md` i el codi de `codi/` (moviment, trajectòries, evita-obstacles i
seguidor de línia). Llicència CC BY-SA 4.0.*
