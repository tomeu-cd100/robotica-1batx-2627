# SA6 · Qüestionari de conceptes (sistemes de control: llaç obert/tancat, histèresi i màquines d'estats)

> **Ús.** Comprovació breu dels conceptes de sistemes de control de la SA6.
> Es pot fer servir com a **repàs formatiu** o com a **prova curta qualificable**
> (10 preguntes × 1 punt = **nota 0-10**). Durada orientativa: **15-20 min**, individual.

**Nom:** ______________________  **Grup:** __________  **Data:** __________

---

## Preguntes (tria una resposta)

1. Quina és la diferència principal entre **llaç obert** i **llaç tancat**?
   - a) **El llaç tancat mesura la sortida i corregeix segons l'error; el llaç obert no.**
   - b) El llaç obert fa servir un sensor per corregir i el tancat no.
   - c) Són exactament el mateix.
   - d) El llaç tancat no fa servir cap sensor.

2. La **realimentació** (*feedback*) en un sistema de control consisteix a…
   - a) Un tipus de sensor de temperatura.
   - b) Apagar el sistema quan hi ha un error.
   - c) **Mesurar la sortida real i tornar-la a l'entrada per comparar-la amb la consigna.**
   - d) Augmentar la velocitat del programa.

3. La **consigna** (*setpoint*) és…
   - a) El valor que mesura el sensor en cada moment.
   - b) L'error del sistema.
   - c) La sortida de l'actuador.
   - d) **El valor desitjat que volem que el sistema assoleixi.**

4. En un llaç tancat, l'**error** es calcula normalment com…
   - a) `error = consigna * mesura`
   - b) **`error = consigna - mesura`**
   - c) `error = mesura + actuador`
   - d) `error = sensor / consigna`

5. La **histèresi** en un termòstat consisteix a…
   - a) **Usar dos llindars diferents: un per encendre i un altre per apagar.**
   - b) Encendre i apagar amb un únic llindar.
   - c) No fer servir cap sensor.
   - d) Augmentar la temperatura sense límit.

6. Si controlem un ventilador amb **un sol llindar** (sense histèresi), a prop de la consigna…
   - a) El ventilador queda apagat per sempre.
   - b) El sensor deixa de funcionar.
   - c) És el comportament ideal, no passa res.
   - d) **El ventilador s'encén i s'apaga contínuament (parpelleig/oscil·lació).**

7. Una **màquina d'estats** a Arduino s'implementa habitualment amb…
   - a) Només amb `delay()`.
   - b) **Un `enum` per als estats i un `switch` per decidir què fer a cada estat.**
   - c) Amb `analogRead()` únicament.
   - d) Amb `Serial.begin()`.

8. Per fer una màquina d'estats que **no es bloquegi** (que segueixi atenta als sensors) fem servir…
   - a) `delay()` a cada estat.
   - b) Apagar la placa entre estats.
   - c) **`millis()` per controlar el temps sense aturar el programa.**
   - d) `pinMode()`.

9. En el **control proporcional**, l'actuació sobre l'actuador…
   - a) **És proporcional a l'error: com més gran l'error, més forta la correcció.**
   - b) És sempre màxima o mínima (tot o res).
   - c) No depèn de l'error.
   - d) Depèn només del temps transcorregut.

10. Si en un control proporcional la constant `Kp` és **massa gran**, el sistema…
    - a) Es queda sempre apagat.
    - b) Deixa de necessitar el sensor.
    - c) Es converteix en un llaç obert.
    - d) **Tendeix a oscil·lar (es pot limitar la sortida amb `constrain`).**

---

## Pregunta oberta (opcional)

11. Dibuixa o descriu en paraules el **diagrama de blocs d'un llaç tancat**, i identifica-hi
    la **consigna**, l'**error**, l'**actuador**, el **sensor** i la **realimentació**:

___________________________________________________________________

___________________________________________________________________

---

## Clau de correcció (ús del professorat)

| Pregunta | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 |
|---|---|---|---|---|---|---|---|---|---|---|
| **Resposta** | a | c | d | b | a | d | b | c | a | d |

> **Barem orientatiu:** 10 preguntes × 1 punt = 10. La pregunta 11 pot pujar nota
> (aplicació) o quedar fora del còmput.

---

## Versió Google Forms (llesta per copiar)

> Crea un formulari nou a **Google Forms**, activa **"Convertir en qüestionari"** i marca
> la resposta correcta de cada pregunta. Assigna **1 punt** a les preguntes 1-10.

**Títol:** `SA6 · Conceptes — Sistemes de control (llaç obert/tancat, histèresi, màquines d'estats)`
**Descripció:** `Comprovació dels conceptes de sistemes de control de la SA6.`

**Camps inicials**
- Nom i cognoms — *Resposta curta* (obligatori).
- Grup/classe — *Resposta curta*.

**Preguntes 1-10** (tipus: *Opció múltiple*; **1 punt** cadascuna; correcta en **negreta**)
1. Diferència llaç obert/tancat → **El tancat mesura la sortida i corregeix segons l'error; l'obert no** / L'obert usa sensor i el tancat no / Són el mateix / El tancat no usa sensor.
2. La realimentació és… → Un sensor de temperatura / Apagar el sistema en error / **Mesurar la sortida i tornar-la a l'entrada per comparar-la amb la consigna** / Accelerar el programa.
3. La consigna (setpoint) és… → El valor que mesura el sensor / L'error / La sortida de l'actuador / **El valor desitjat que volem assolir**.
4. L'error es calcula com… → `consigna * mesura` / **`consigna - mesura`** / `mesura + actuador` / `sensor / consigna`.
5. La histèresi consisteix a… → **Dos llindars: un per encendre i un per apagar** / Un únic llindar / No usar sensor / Pujar la temperatura sense límit.
6. Un sol llindar (sense histèresi) → Queda apagat sempre / El sensor deixa de funcionar / És l'ideal / **S'encén i s'apaga contínuament (oscil·lació)**.
7. Una màquina d'estats s'implementa amb… → Només `delay()` / **`enum` + `switch`** / Només `analogRead()` / `Serial.begin()`.
8. Perquè no es bloquegi fem servir… → `delay()` a cada estat / Apagar la placa / **`millis()`** / `pinMode()`.
9. En el control proporcional l'actuació… → **És proporcional a l'error** / És sempre tot/res / No depèn de l'error / Depèn només del temps.
10. Si `Kp` és massa gran… → Es queda apagat / No cal sensor / Es torna llaç obert / **Tendeix a oscil·lar (limitar amb `constrain`)**.

**Pregunta 11** (tipus: *Paràgraf*; sense puntuació) — descriure el diagrama de blocs d'un llaç tancat.

> **Recollida:** Respostes → full de càlcul vinculat, amb la nota de l'1 al 10 autocalculada.

---

*Qüestionari de conceptes de la SA6. Es recolza en `SA6_fitxa_alumnat.md`, `SA6_guia_docent.md`
i `SA6_esquemes_connexions.md` (sistemes de control). Llicència CC BY-SA 4.0.*
