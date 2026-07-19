# SA2 · Qüestionari de conceptes (programar la placa i sortides digitals/PWM)

> 🧑‍🎓 **Quan toca fer-lo?** En acabar les activitats de la SA, com a **consolidació** abans de repassar el checklist d'entrega — i torna-hi com a **repàs** abans de la prova T1 (la sessió 4 de la SA3). Si es fa com a prova curta qualificable, el docent anunciarà el dia.

> **Ús.** Comprovació breu dels conceptes de programació bàsica i de sortides de la SA2.
> Es pot fer servir com a **repàs formatiu** o com a **prova curta qualificable**
> (10 preguntes × 1 punt = **nota 0-10**). Durada orientativa: **15-20 min**, individual.

> **📲 Fes-lo al Classroom.** Aquest qüestionari és una **tasca
> autocorrectiva** al Google Classroom del curs:
> **[obre «SA2 · Qüestionari de conceptes»](https://classroom.google.com/c/ODY4ODU4Njk0NTEy/a/ODcwNzE2NzE2MTkw/details)**
> (cal el compte del centre). Aquesta pàgina és la versió per repassar
> o fer en paper; les solucions són al full del docent.

**Nom:** ______________________  **Grup:** __________  **Data:** __________

---

![LED RGB: barrejant vermell, verd i blau s'obté qualsevol color](img/sa2-rgb.svg)

## Preguntes (tria una resposta)

1. En un *sketch* d'Arduino, el bloc `setup()`…
   - a) Es repeteix infinitament.
   - b) S'executa una sola vegada en engegar la placa.
   - c) No serveix per a res.
   - d) Apaga la placa.

2. El bloc `loop()`…
   - a) S'executa un sol cop.
   - b) Es repeteix infinitament mentre la placa està encesa.
   - c) Només s'executa si hi ha error.
   - d) Configura els pins.

3. Per configurar un pin com a sortida s'escriu…
   - a) `digitalRead(PIN);`
   - b) `pinMode(PIN, OUTPUT);`
   - c) `analogRead(PIN);`
   - d) `Serial.begin(PIN);`

4. Per encendre un LED connectat a un pin digital s'escriu…
   - a) `digitalWrite(PIN, HIGH);`
   - b) `digitalWrite(PIN, LOW);`
   - c) `pinMode(PIN, INPUT);`
   - d) `delay(PIN);`

5. La instrucció `delay(1000);` fa que la placa…
   - a) S'apagui.
   - b) Esperi 1000 mil·lisegons (1 segon).
   - c) Repeteixi 1000 vegades.
   - d) Encengui 1000 LED.

6. El **PWM** (`analogWrite`) serveix per…
   - a) Llegir un sensor.
   - b) Regular la "intensitat" d'una sortida (brillantor d'un LED, velocitat d'un motor).
   - c) Connectar-se a internet.
   - d) Configurar el port sèrie.

7. El rang de valors de `analogWrite()` (PWM) és…
   - a) 0 a 1023.
   - b) 0 a 255.
   - c) 0 a 5.
   - d) 0 a 100.

8. El PWM només funciona en els pins marcats amb…
   - a) El símbol `~` (titlla).
   - b) La lletra A.
   - c) El símbol `+`.
   - d) Cap marca especial.

9. Per què es posa una **resistència** en sèrie amb un LED?
   - a) Per fer-lo més brillant.
   - b) Per limitar el corrent i evitar que es cremi.
   - c) Perquè canviï de color.
   - d) No cal mai posar-ne.

10. Una **constant** (`const int LED = 13;`) es fa servir per…
    - a) Un valor que anirà **canviant** durant el programa.
    - b) Un valor fix que no canviarà (p. ex. el número de pin).
    - c) Esborrar variables.
    - d) Aturar el `loop()`.

---

## Pregunta oberta (opcional)

11. Escriu (o explica en paraules) un `loop()` que faci **parpellejar un LED**: encendre,
    esperar, apagar, esperar. Indica quines instruccions faries servir:

___________________________________________________________________

___________________________________________________________________

---

*Qüestionari de conceptes de la SA2. Es recolza en `../SA0/SA0_guia_programacio.md` i el
material de sortides digitals/PWM de la SA2. Llicència CC BY-SA 4.0.*
