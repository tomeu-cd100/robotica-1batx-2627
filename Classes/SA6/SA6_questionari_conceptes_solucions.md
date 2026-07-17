# SA6 · Solucions del qüestionari de conceptes

> **Material del docent.** Clau de correcció i versió Google Forms de
> «SA6 · Qüestionari de conceptes (sistemes de control: llaç obert/tancat, histèresi i màquines d'estats)»
> ([qüestionari](SA6_questionari_conceptes.md)). La tasca autocorrectiva ja és publicada:
> [«SA6 · Qüestionari de conceptes» al Classroom](https://classroom.google.com/c/ODY4ODU4Njk0NTEy/a/ODcwNzAwNjYxNTc5/details).

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
