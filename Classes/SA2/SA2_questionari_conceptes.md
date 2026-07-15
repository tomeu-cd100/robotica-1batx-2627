# SA2 · Qüestionari de conceptes (programar la placa i sortides digitals/PWM)

> **Ús.** Comprovació breu dels conceptes de programació bàsica i de sortides de la SA2.
> Es pot fer servir com a **repàs formatiu** o com a **prova curta qualificable**
> (10 preguntes × 1 punt = **nota 0-10**). Durada orientativa: **15-20 min**, individual.

**Nom:** ______________________  **Grup:** __________  **Data:** __________

---

## Preguntes (tria una resposta)

1. En un *sketch* d'Arduino, el bloc `setup()`…
   - a) Es repeteix infinitament.
   - b) **S'executa una sola vegada en engegar la placa.**
   - c) No serveix per a res.
   - d) Apaga la placa.

2. El bloc `loop()`…
   - a) S'executa un sol cop.
   - b) **Es repeteix infinitament mentre la placa està encesa.**
   - c) Només s'executa si hi ha error.
   - d) Configura els pins.

3. Per configurar un pin com a sortida s'escriu…
   - a) `digitalRead(PIN);`
   - b) **`pinMode(PIN, OUTPUT);`**
   - c) `analogRead(PIN);`
   - d) `Serial.begin(PIN);`

4. Per encendre un LED connectat a un pin digital s'escriu…
   - a) **`digitalWrite(PIN, HIGH);`**
   - b) `digitalWrite(PIN, LOW);`
   - c) `pinMode(PIN, INPUT);`
   - d) `delay(PIN);`

5. La instrucció `delay(1000);` fa que la placa…
   - a) S'apagui.
   - b) **Esperi 1000 mil·lisegons (1 segon).**
   - c) Repeteixi 1000 vegades.
   - d) Encengui 1000 LED.

6. El **PWM** (`analogWrite`) serveix per…
   - a) Llegir un sensor.
   - b) **Regular la "intensitat" d'una sortida** (brillantor d'un LED, velocitat d'un motor).
   - c) Connectar-se a internet.
   - d) Configurar el port sèrie.

7. El rang de valors de `analogWrite()` (PWM) és…
   - a) 0 a 1023.
   - b) **0 a 255.**
   - c) 0 a 5.
   - d) 0 a 100.

8. El PWM només funciona en els pins marcats amb…
   - a) El símbol **`~`** (titlla).
   - b) La lletra A.
   - c) El símbol `+`.
   - d) Cap marca especial.

9. Per què es posa una **resistència** en sèrie amb un LED?
   - a) Per fer-lo més brillant.
   - b) **Per limitar el corrent i evitar que es cremi.**
   - c) Perquè canviï de color.
   - d) No cal mai posar-ne.

10. Una **constant** (`const int LED = 13;`) es fa servir per…
    - a) Un valor que anirà **canviant** durant el programa.
    - b) **Un valor fix que no canviarà** (p. ex. el número de pin).
    - c) Esborrar variables.
    - d) Aturar el `loop()`.

---

## Pregunta oberta (opcional)

11. Escriu (o explica en paraules) un `loop()` que faci **parpellejar un LED**: encendre,
    esperar, apagar, esperar. Indica quines instruccions faries servir:

___________________________________________________________________

___________________________________________________________________

---

## Clau de correcció (ús del professorat)

| Pregunta | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 |
|---|---|---|---|---|---|---|---|---|---|---|
| **Resposta** | b | b | b | a | b | b | b | a | b | b |

> **Barem orientatiu:** 10 preguntes × 1 punt = 10. La pregunta 11 pot pujar nota
> (aplicació) o quedar fora del còmput.

---

## Versió Google Forms (llesta per copiar)

> Crea un formulari nou a **Google Forms**, activa **"Convertir en qüestionari"** i marca
> la resposta correcta de cada pregunta. Assigna **1 punt** a les preguntes 1-10.

**Títol:** `SA2 · Conceptes — Programar la placa i sortides (digital/PWM)`
**Descripció:** `Comprovació dels conceptes de programació bàsica i sortides de la SA2.`

**Camps inicials**
- Nom i cognoms — *Resposta curta* (obligatori).
- Grup/classe — *Resposta curta*.

**Preguntes 1-10** (tipus: *Opció múltiple*; **1 punt** cadascuna; correcta en **negreta**)
1. `setup()`… → Es repeteix sempre / **S'executa un sol cop en engegar** / No serveix / Apaga la placa.
2. `loop()`… → Un sol cop / **Es repeteix infinitament** / Només amb error / Configura pins.
3. Configurar un pin com a sortida → `digitalRead` / **`pinMode(PIN, OUTPUT)`** / `analogRead` / `Serial.begin`.
4. Encendre un LED → **`digitalWrite(PIN, HIGH)`** / `digitalWrite(PIN, LOW)` / `pinMode(PIN, INPUT)` / `delay(PIN)`.
5. `delay(1000)`… → S'apaga / **Espera 1 segon** / Repeteix 1000 cops / Encén 1000 LED.
6. El PWM serveix per… → Llegir un sensor / **Regular la intensitat d'una sortida** / Internet / Port sèrie.
7. Rang de `analogWrite` → 0-1023 / **0-255** / 0-5 / 0-100.
8. El PWM va als pins amb… → **`~` (titlla)** / lletra A / `+` / cap marca.
9. Per què resistència amb un LED → Més brillant / **Limitar el corrent i no cremar-lo** / Canviar de color / No cal.
10. Una constant serveix per… → Valor que canvia / **Valor fix que no canvia** / Esborrar variables / Aturar el loop.

**Pregunta 11** (tipus: *Paràgraf*; sense puntuació) — descriure un `loop()` de parpelleig.

> **Recollida:** Respostes → full de càlcul vinculat, amb la nota de l'1 al 10 autocalculada.

---

*Qüestionari de conceptes de la SA2. Es recolza en `../SA0/SA0_guia_programacio.md` i el
material de sortides digitals/PWM de la SA2. Llicència CC BY-SA 4.0.*
