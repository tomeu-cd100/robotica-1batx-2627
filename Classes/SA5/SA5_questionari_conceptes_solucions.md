# SA5 · Solucions del qüestionari de conceptes

> **Material del docent.** Clau de correcció i versió Google Forms de
> «SA5 · Qüestionari de conceptes (micro:bit i MicroPython)»
> ([qüestionari](SA5_questionari_conceptes.md)). La tasca autocorrectiva ja és publicada:
> [«SA5 · Qüestionari de conceptes» al Classroom](https://classroom.google.com/c/ODY4ODU4Njk0NTEy/a/ODcwNzE3NDgzMjE2/details).

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

**Títol:** `SA5 · Conceptes — micro:bit i MicroPython`
**Descripció:** `Comprovació dels conceptes de MicroPython, sensors integrats i ràdio de la SA5.`

**Camps inicials**
- Nom i cognoms — *Resposta curta* (obligatori).
- Grup/classe — *Resposta curta*.

**Preguntes 1-10** (tipus: *Opció múltiple*; **1 punt** cadascuna; correcta en **negreta**)
1. Accés a LED/botons/sensors → **`from microbit import *`** / `#include <microbit.h>` / `import Arduino` / `void setup()`.
2. La indentació en Python… → És estètica / Substitueix el `;` / **És sintaxi i obligatòria** / Només dins `setup()`.
3. Error per sagnar malament → `digitalWrite error` / `radio not found` / `SyntaxError: missing ;` / **`IndentationError`**.
4. `show()` vs `scroll()` → Són iguals / **`show()` fix i `scroll()` desplaça** / Un per números i l'altre per lletres / `scroll()` apaga la placa.
5. Codi que es repeteix sempre → **`while True:`** / `void loop()` / `setup()` / `if button_a:`.
6. Sensor per comptapassos/sacsejar → Llum / Ràdio / **Acceleròmetre** / Termòmetre.
7. Rang de `read_light_level()` → 0-1023 / **0-255** / 0-5 / `HIGH`/`LOW`.
8. Condició per a la ràdio → Cable USB / `Serial.begin()` / Mateix nom d'alumne / **Mateix `group`**.
9. Enviar i rebre per ràdio → `show()`/`scroll()` / `radio.on()`/`radio.off()` / **`radio.send()`/`radio.receive()`** / `send()`/`print()`.
10. Equivalència C++ ↔ Python → Python acaba amb `;` / **`{ }` de C++ ↔ indentació de Python** / `while True:` ↔ `setup()` / Python tanca amb `END`.

**Pregunta 11** (tipus: *Paràgraf*; sense puntuació) — descriure un `while True:` amb cor + desplaçar el nom amb el botó A.

> **Recollida:** Respostes → full de càlcul vinculat, amb la nota de l'1 al 10 autocalculada.

---
