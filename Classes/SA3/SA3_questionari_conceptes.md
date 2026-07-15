# SA3 · Qüestionari de conceptes (entrades i sensors)

> **Ús.** Comprovació breu dels conceptes d'entrades digitals i analògiques, sensors i
> funcions de la SA3. Es pot fer servir com a **repàs formatiu** o com a **prova curta
> qualificable** (10 preguntes × 1 punt = **nota 0-10**). Durada orientativa: **15-20 min**,
> individual.

**Nom:** ______________________  **Grup:** __________  **Data:** __________

---

## Preguntes (tria una resposta)

1. Per llegir l'estat d'una **entrada digital** (un polsador) s'escriu…
   - a) **`digitalRead(PIN);`**
   - b) `digitalWrite(PIN, HIGH);`
   - c) `analogWrite(PIN, 255);`
   - d) `pinMode(PIN, OUTPUT);`

2. Per llegir un **sensor analògic** (potenciòmetre, LDR) s'escriu…
   - a) `digitalRead(PIN);`
   - b) `Serial.begin(PIN);`
   - c) **`analogRead(PIN);`**
   - d) `delay(PIN);`

3. La funció `analogRead()` en un Arduino UNO retorna un valor dins del rang…
   - a) 0 a 255.
   - b) 0 a 100.
   - c) 0 a 5.
   - d) **0 a 1023.**

4. Amb `pinMode(2, INPUT_PULLUP);`, quan el polsador **NO** està premut, el pin llegeix…
   - a) `LOW` (en repòs).
   - b) **`HIGH` (en repòs).**
   - c) Un valor entre 0 i 1023.
   - d) Res, cal esperar a prémer.

5. Quin avantatge té fer servir `INPUT_PULLUP`?
   - a) **Estalvia haver de posar una resistència externa al polsador.**
   - b) Fa que el LED brilli més.
   - c) Converteix el pin en una sortida PWM.
   - d) Accelera el `loop()`.

6. Per què cal l'**antirebot** (*debounce*) en un polsador?
   - a) Perquè el polsador consumeixi menys corrent.
   - b) Perquè el pin passi a analògic.
   - c) **Perquè una sola premuda no es compti diverses vegades** (el contacte "rebota").
   - d) No serveix per a res.

7. La LDR es connecta en un **divisor de tensió** amb una resistència de 10 kΩ. Per què?
   - a) Per limitar el corrent i que no es cremi.
   - b) **Per convertir la resistència variable de la LDR en una tensió que el pin analògic pot mesurar.**
   - c) Per augmentar la brillantor del LED.
   - d) Perquè la LDR necessita 10 kΩ per encendre's.

8. Vols passar una lectura de `analogRead` (0-1023) al rang de `analogWrite` (0-255). Quina funció ho fa?
   - a) `delay()`
   - b) `Serial.begin()`
   - c) `pinMode()`
   - d) **`map()`**

9. En un sensor d'ultrasons HC-SR04, si intercanvies els pins **TRIG** i **ECHO**…
   - a) El sensor mesura amb més precisió.
   - b) El LED s'encén sol.
   - c) **La distància surt sempre 0 o un valor molt gran** (no funciona bé).
   - d) No passa res, són intercanviables.

10. Què vol dir que una **funció** com `mesuraDistancia()` **retorna** un valor?
    - a) Que apaga la placa en acabar.
    - b) **Que en acabar dona un resultat que el programa pot fer servir** (p. ex. la distància en cm).
    - c) Que es repeteix infinitament.
    - d) Que només es pot cridar una vegada.

---

## Pregunta oberta (opcional)

11. Explica (en paraules o amb pseudocodi) com faries un **llum automàtic**: llegir la LDR i,
    segons un **llindar**, encendre o apagar un LED. Indica quines instruccions faries servir:

___________________________________________________________________

___________________________________________________________________

---

## Clau de correcció (ús del professorat)

| Pregunta | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 |
|---|---|---|---|---|---|---|---|---|---|---|
| **Resposta** | a | c | d | b | a | c | b | d | c | b |

> **Barem orientatiu:** 10 preguntes × 1 punt = 10. La pregunta 11 pot pujar nota
> (aplicació) o quedar fora del còmput.

---

## Versió Google Forms (llesta per copiar)

> Crea un formulari nou a **Google Forms**, activa **"Convertir en qüestionari"** i marca
> la resposta correcta de cada pregunta. Assigna **1 punt** a les preguntes 1-10.

**Títol:** `SA3 · Conceptes — Entrades i sensors`
**Descripció:** `Comprovació dels conceptes d'entrades digitals/analògiques, sensors i funcions de la SA3.`

**Camps inicials**
- Nom i cognoms — *Resposta curta* (obligatori).
- Grup/classe — *Resposta curta*.

**Preguntes 1-10** (tipus: *Opció múltiple*; **1 punt** cadascuna; correcta en **negreta**)
1. Llegir una entrada digital → **`digitalRead`** / `digitalWrite` / `analogWrite` / `pinMode`.
2. Llegir un sensor analògic → `digitalRead` / `Serial.begin` / **`analogRead`** / `delay`.
3. Rang de `analogRead` (UNO) → 0-255 / 0-100 / 0-5 / **0-1023**.
4. Amb `INPUT_PULLUP` en repòs el pin llegeix → `LOW` / **`HIGH`** / valor 0-1023 / res.
5. Avantatge de `INPUT_PULLUP` → **estalvia una resistència externa** / LED més brillant / pin PWM / accelera el loop.
6. Per què l'antirebot → menys corrent / passa a analògic / **una premuda no compti diverses vegades** / no serveix.
7. Per què divisor de tensió amb la LDR → limitar corrent / **convertir resistència variable en tensió mesurable** / més brillantor / la LDR ho necessita.
8. Passar 0-1023 a 0-255 → `delay` / `Serial.begin` / `pinMode` / **`map`**.
9. TRIG i ECHO intercanviats a l'HC-SR04 → més precisió / LED s'encén sol / **distància sempre 0 o molt gran** / són intercanviables.
10. Que una funció "retorna" un valor → apaga la placa / **dona un resultat que el programa pot fer servir** / es repeteix sempre / només es crida un cop.

**Pregunta 11** (tipus: *Paràgraf*; sense puntuació) — descriure un llum automàtic amb LDR i llindar.

> **Recollida:** Respostes → full de càlcul vinculat, amb la nota de l'1 al 10 autocalculada.

---

*Qüestionari de conceptes de la SA3. Es recolza en el material d'entrades i sensors de la SA3
(`SA3_fitxa_alumnat.md`, `SA3_esquemes_connexions.md`) i en `../SA0/SA0_guia_programacio.md`.
Llicència CC BY-SA 4.0.*
