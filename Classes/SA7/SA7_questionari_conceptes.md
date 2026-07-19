# SA7 · Qüestionari de conceptes (robòtica mòbil: moviment i comportaments autònoms)

> 🧑‍🎓 **Quan toca fer-lo?** En acabar les activitats de la SA, com a **consolidació** abans de repassar el checklist d'entrega — i torna-hi com a **repàs** abans de la prova T3. Si es fa com a prova curta qualificable, el docent anunciarà el dia.

> **Ús.** Comprovació breu dels conceptes de robòtica mòbil de la SA7 (cinemàtica
> diferencial, trajectòries, evita-obstacles i seguidor de línia). Es pot fer servir com a
> **repàs formatiu** o com a **prova curta qualificable** (10 preguntes × 1 punt = **nota
> 0-10**). Durada orientativa: **15-20 min**, individual.

> **📲 Fes-lo al Classroom.** Aquest qüestionari és una **tasca
> autocorrectiva** al Google Classroom del curs:
> **[obre «SA7 · Qüestionari de conceptes»](https://classroom.google.com/c/ODY4ODU4Njk0NTEy/a/ODU1NTU1MTE5NTA1/details)**
> (cal el compte del centre). Aquesta pàgina és la versió per repassar
> o fer en paper; les solucions són al full del docent.

**Nom:** ______________________  **Grup:** __________  **Data:** __________

---

![Cinemàtica diferencial d'un robot de dues rodes](img/sa7-cinematica-diferencial.svg)

## Preguntes (tria una resposta)

1. La **cinemàtica diferencial** d'un robot de dues rodes vol dir que…
   - a) Totes les rodes es mouen amb un únic motor central.
   - b) El robot gira amb un volant, com un cotxe.
   - c) Es controla el moviment variant la velocitat de cada roda per separat.
   - d) Les rodes sempre han d'anar exactament igual.

2. Perquè el robot vagi **recte**, les dues rodes han d'anar…
   - a) A la mateixa velocitat i en el mateix sentit.
   - b) A velocitats ben diferents.
   - c) Una aturada i l'altra en marxa.
   - d) En sentits oposats.

3. Per **girar cap a la dreta** (sense aturar-se), la roda esquerra ha d'anar…
   - a) Més lenta que la dreta.
   - b) Igual que la dreta.
   - c) Cap enrere sempre.
   - d) Més ràpida que la dreta.

4. Escrivim funcions com `endavant()`, `gira_dreta()` o `atura()`. Descompondre el moviment
   en **funcions** fa que el codi…
   - a) Sigui més lent d'executar.
   - b) Sigui més clar i fàcil de reutilitzar i corregir.
   - c) Ja no necessiti motors.
   - d) No es pugui modificar.

5. Fer un gir de 90° **per temps** (p. ex. girar durant 400 ms)…
   - a) És senzill però poc precís: depèn de la bateria i de la superfície.
   - b) És sempre exacte.
   - c) No cal calibrar-lo mai.
   - d) Funciona sense motors.

6. Al codi de cada `.ino`, el bloc `// === PINS (AJUSTAR) ===`…
   - a) Conté la lògica del comportament i no s'ha de mirar.
   - b) Esborra el programa en pujar-lo.
   - c) És on cal posar els pins reals dels motors i sensors segons el model de placa.
   - d) Serveix per apagar el robot.

7. En l'**evita-obstacles**, el sensor d'**ultrasons** serveix per…
   - a) Seguir una línia negra.
   - b) Mesurar la distància fins a un obstacle.
   - c) Regular la velocitat dels motors.
   - d) Llegir la temperatura ambient.

8. Els **sensors de línia (IR)** es col·loquen sota el robot mirant el terra. Sobre una
   línia negra i un fons blanc…
   - a) Tots dos punts donen el mateix valor.
   - b) El sensor mesura la distància en centímetres.
   - c) La línia negra reflecteix més llum que el fons blanc.
   - d) El fons blanc reflecteix molt i la línia negra poc; comparant els sensors, el robot corregeix la direcció.

9. **Calibrar el llindar** dels sensors IR vol dir…
   - a) Canviar els pins dels motors.
   - b) Apagar els sensors.
   - c) Ajustar el valor que separa "línia" de "fons" segons la pista i l'alçada al terra.
   - d) Augmentar la velocitat del robot.

10. Un **comportament reactiu** (evita-obstacles o seguidor) es programa dins del `loop()`
    seguint el cicle…
    - a) Percepció (llegir sensors) → decisió → acció (moure motors), repetit contínuament.
    - b) Acció → percepció → decisió, un sol cop.
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

*Qüestionari de conceptes de la SA7. Es recolza en `SA7_fitxa_alumnat.md`,
`SA7_esquemes_connexions.md` i el codi de `codi/` (moviment, trajectòries, evita-obstacles i
seguidor de línia). Llicència CC BY-SA 4.0.*
