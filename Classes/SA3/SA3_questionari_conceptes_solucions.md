# SA3 · Solucions del qüestionari de conceptes

> **Material del docent.** Clau de correcció i versió Google Forms de
> «SA3 · Qüestionari de conceptes (entrades i sensors)»
> ([qüestionari](SA3_questionari_conceptes.md)). La tasca autocorrectiva ja és publicada:
> [«SA3 · Qüestionari de conceptes» al Classroom](https://classroom.google.com/c/ODY4ODU4Njk0NTEy/a/ODcwNzE4MzAzMDM1/details).

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
