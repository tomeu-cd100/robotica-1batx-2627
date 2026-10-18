# SA2 · Qüestionari de conceptes (programar la placa i sortides digitals/PWM)

> 🧑‍🎓 **Quan toca fer-lo?** Quan acabis les pràctiques de la SA2, abans de repassar el checklist. Torna-hi abans de la **prova del 1r trimestre** (l'última sessió de la SA3), per repassar.

> **Què és?** 10 preguntes curtes sobre el que has fet a la SA2. Tries una resposta a cada una. Es triga uns 15 minuts. Si el docent el fa servir com a prova, t'avisarà del dia.

> **📲 Fes-lo al Classroom.** És una tasca que **es corregeix sola**:
> **[obre «SA2 · Qüestionari de conceptes»](https://classroom.google.com/c/ODY4ODU4Njk0NTEy/a/ODcwNzE2NzE2MTkw/details)**
> (amb el compte de l'escola). Aquesta pàgina és per repassar-lo o fer-lo en paper.

**Nom:** ______________________  **Grup:** __________  **Data:** __________

---

![LED RGB: barrejant vermell, verd i blau s'obté qualsevol color](img/sa2-rgb.svg)

## Preguntes (tria una resposta)

1. En un programa d'Arduino, el bloc `setup()`…
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
   - b) Fer que una sortida vagi «més o menys» (que un LED brilli més o menys, o que un motor vagi més o menys ràpid).
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

9. Per què es posa una **resistència** al costat de cada LED?
   - a) Per fer-lo més brillant.
   - b) Perquè no hi passi massa corrent i el LED no es cremi.
   - c) Perquè canviï de color.
   - d) No cal mai posar-ne.

10. Una **constant** (`const int LED = 13;`) es fa servir per…
    - a) Un valor que anirà **canviant** durant el programa.
    - b) Un valor fix que no canviarà (per exemple, el número de pin).
    - c) Esborrar variables.
    - d) Aturar el `loop()`.

---

## Pregunta oberta (opcional)

11. Escriu (o explica amb paraules) un `loop()` que faci **parpellejar un LED**: encendre,
    esperar, apagar, esperar. Quines instruccions faries servir?

___________________________________________________________________

___________________________________________________________________

---

*Qüestionari de conceptes de la SA2. Es recolza en `../SA0/SA0_guia_programacio.md` i el
material de sortides digitals/PWM de la SA2. Llicència CC BY-SA 4.0.*
