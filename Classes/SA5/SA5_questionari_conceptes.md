# SA5 · Qüestionari de conceptes (micro:bit i MicroPython)

> 🧑‍🎓 **Quan toca fer-lo?** En acabar les activitats de la SA, com a **consolidació** abans de repassar el checklist d'entrega — i torna-hi com a **repàs** abans de la prova T2 (la sessió 4 de la SA6). Si es fa com a prova curta qualificable, el docent anunciarà el dia.

> **Ús.** Comprovació breu dels conceptes de MicroPython, sensors integrats i ràdio de la SA5.
> Es pot fer servir com a **repàs formatiu** o com a **prova curta qualificable**
> (10 preguntes × 1 punt = **nota 0-10**). Durada orientativa: **15-20 min**, individual.

> **📲 Fes-lo al Classroom.** Aquest qüestionari és una **tasca
> autocorrectiva** al Google Classroom del curs:
> **[obre «SA5 · Qüestionari de conceptes»](https://classroom.google.com/c/ODY4ODU4Njk0NTEy/a/ODcwNzE3NDgzMjE2/details)**
> (cal el compte del centre). Aquesta pàgina és la versió per repassar
> o fer en paper; les solucions són al full del docent.

**Nom:** ______________________  **Grup:** __________  **Data:** __________

---

![Components de la placa micro:bit: matriu de LED, botons i sensors](img/sa5-microbit-features.svg)

## Preguntes (tria una resposta)

1. En MicroPython, la línia que dona accés a la matriu de LED, els botons i els sensors de la micro:bit és…
   - a) `from microbit import *`
   - b) `#include <microbit.h>`
   - c) `import Arduino`
   - d) `void setup()`

2. En Python, la **indentació** (els espais al principi de línia)…
   - a) És només estètica i es pot ometre.
   - b) Substitueix el punt i coma `;`.
   - c) És sintaxi: marca quins blocs de codi van junts i és obligatòria.
   - d) Només cal dins de `setup()`.

3. Si barreges tabuladors i espais o sagnes malament una línia, l'error típic de Python és…
   - a) `digitalWrite error`
   - b) `radio not found`
   - c) `SyntaxError: missing ;`
   - d) `IndentationError`

4. Quina diferència hi ha entre `display.show("Hola")` i `display.scroll("Hola")`?
   - a) Cap, són sinònims.
   - b) `show()` mostra el contingut fix i `scroll()` el fa desplaçar per la matriu.
   - c) `show()` només val per a números i `scroll()` per a lletres.
   - d) `scroll()` apaga la placa.

5. En un programa de MicroPython per a la micro:bit, el codi que s'ha de repetir contínuament es posa dins de…
   - a) `while True:`
   - b) `void loop()`
   - c) `setup()`
   - d) `if button_a:`

6. Per fer un **comptapassos** o detectar que sacsegem la placa, quin sensor integrat s'utilitza?
   - a) El sensor de llum.
   - b) La ràdio.
   - c) L'acceleròmetre (p. ex. `accelerometer.was_gesture("shake")`).
   - d) El termòmetre.

7. La instrucció `display.read_light_level()` retorna un valor dins del rang…
   - a) 0 a 1023.
   - b) 0 a 255.
   - c) 0 a 5.
   - d) `HIGH` o `LOW`.

8. Perquè dues micro:bit es comuniquin per **ràdio**, la condició imprescindible és que…
   - a) Estiguin connectades pel cable USB.
   - b) Facin servir `Serial.begin()`.
   - c) Tinguin el mateix nom d'alumne.
   - d) Comparteixin el mateix `group` (p. ex. `radio.config(group=10)` a totes dues).

9. En el codi de la ràdio, quines instruccions **envien** i **reben** un missatge, respectivament?
   - a) `display.show()` i `display.scroll()`
   - b) `radio.on()` i `radio.off()`
   - c) `radio.send()` i `radio.receive()`
   - d) `send()` i `print()`

10. Comparant Arduino (C/C++) i micro:bit (Python), quina equivalència és **correcta**?
    - a) En Python cada instrucció acaba amb `;` com en C++.
    - b) On C++ delimita els blocs amb `{ }`, Python els delimita amb la indentació.
    - c) `while True:` de Python equival a `setup()` de C++.
    - d) En Python els blocs es tanquen amb `END`.

---

## Pregunta oberta (opcional)

11. Explica (o escriu) un programa senzill de MicroPython que, dins d'un `while True:`, **mostri un cor**
    a la matriu de LED i, quan es premi el botó A, **desplaci el teu nom**. Indica quines instruccions
    faries servir:

___________________________________________________________________

___________________________________________________________________

---

*Qüestionari de conceptes de la SA5. Es recolza en `../SA0/SA0_guia_programacio.md` (Part B i C) i el
material de MicroPython, sensors i ràdio de la SA5. Llicència CC BY-SA 4.0.*
