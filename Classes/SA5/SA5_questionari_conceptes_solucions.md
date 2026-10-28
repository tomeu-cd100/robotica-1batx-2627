# SA5 · Solucions del qüestionari de conceptes

> **Material del docent.** Clau de correcció i versió Google Forms de
> «SA5 · Qüestionari de conceptes (MeArm: el comandament amb micro:bit)»
> ([qüestionari](SA5_questionari_conceptes.md)). La tasca autocorrectiva és al tema **MeArm** del Classroom:
> [«SA5 · Qüestionari de conceptes (MeArm)»](https://classroom.google.com/c/ODY4ODU4Njk0NTEy).

> 🦾 **Versió del 28-10-2026, orientada al braç.** La versió anterior (sense el braç) es
> manté al Classroom, al tema de la SA; no s'ha esborrat.

---

## Clau de correcció (ús del professorat)

| Pregunta | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 |
|---|---|---|---|---|---|---|---|---|---|---|
| **Resposta** | c | a | d | b | a | a | c | d | b | b |

> **Barem orientatiu:** 10 preguntes × 1 punt = 10. La pregunta 11 pot pujar nota
> (aplicació) o quedar fora del còmput.

---

## Versió Google Forms

> Creada automàticament per `Material Classroom/crear_mearm_classroom.js` a partir
> del qüestionari i d'aquesta clau: mode qüestionari, **1 punt** per pregunta.

**Títol:** `SA5 · Qüestionari de conceptes (MeArm)`

**Preguntes 1-10** (opció múltiple; correcta en **negreta**)
1. En Python, què marca quines línies són **dins** d'un `while True:` o d'un `if`? → Les claus `{ }`. / El punt i coma `;` al final. / **La indentació (els espais del principi de la línia).** / Una línia en blanc.
2. Quina línia importa a dalt de tot la pantalla, els botons i els sensors de la micro:bit? → **`from microbit import *`** / `#include <microbit.h>` / `import Servo` / `void setup()`
3. Al selector, `ARTICULACIONS = ["B", "E", "D", "P"]`. Què val `ARTICULACIONS[0]`? → `"E"` / `"P"` / Dona error: les llistes comencen per 1. / **`"B"`**
4. Quina diferència hi ha entre `button_a.was_pressed()` i `button_a.is_pressed()`? → Cap: són el mateix. / **`was_pressed()` diu si s'ha premut des de l'última vegada (una premuda = un pas); `is_pressed()` diu si està premut ara.** / `is_pressed()` només funciona amb el botó B. / `was_pressed()` esborra el programa.
5. Al comandament, per què la inclinació compta a partir de `LLINDAR = 300` i no de 0? → **Perquè la placa mai és perfectament plana i la mà tremola: sense marge, el braç no pararia mai quiet.** / Perquè l'acceleròmetre no mesura valors menors de 300. / Perquè 300 és el màxim de l'acceleròmetre. / Perquè la ràdio només envia números majors de 300.
6. Perquè el comandament mogui **el teu** braç i no el d'un company, les dues micro:bit… → **Han de tenir el mateix `group`, diferent del dels companys (el teu número de llista).** / Han d'estar connectades per cable. / Han de tenir `group` diferents entre elles. / No cal configurar res.
7. Què retorna `radio.receive()` si no ha arribat cap missatge? → `0` / `""` (text buit) / **`None`** / Un error que atura el programa.
8. Com es connecta la **micro:bit pont** a l'Arduino del braç? → 5V de l'Arduino al 3V de la micro:bit. / D0 de l'Arduino al P1 de la micro:bit i res més. / Amb un cable USB entre les dues plaques. / **P1 de la micro:bit al D0 de l'Arduino, i GND a GND; mai un pin de l'Arduino cap a la micro:bit.**
9. Per què cal **desconnectar el cable del D0** abans de pujar un programa a l'Arduino? → Perquè el D0 crema la micro:bit en pujar. / **Perquè l'USB fa servir el mateix pin per carregar el programa.** / Perquè el programa s'esborra si el D0 hi és. / No cal desconnectar-lo.
10. El comandament (Python) i `04_brac_ordres` (C++) parlen el mateix **protocol** (`B+`, `D-`, `P`…). Quina equivalència és correcta? → En Python cada instrucció acaba amb `;` com en C++. / **On C++ delimita els blocs amb `{ }`, Python ho fa amb la indentació.** / `while True:` de Python equival a `setup()` de C++. / En Python cal declarar el tipus: `int x = 0`.

**Pregunta 11** (paràgraf, sense puntuació) — Explica el **protocol d'ordres** del braç: quines ordres envia el comandament, qui les rep i què fa l'Arduino amb cadascuna. Per què ha de ser el mateix a les dues bandes?
