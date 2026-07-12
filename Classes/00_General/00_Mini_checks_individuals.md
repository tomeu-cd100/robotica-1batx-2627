# 00 · Mini-checks individuals (detecció precoç de l'«efecte passatger»)

> **Per a qui és?** Per al **docent**. Un **micro-repte individual de 10 minuts** per SA (SA2–SA8), a fer **en solitari i sense apunts**. **No qualifica**: és un radar formatiu.

## El problema que resol

El curs treballa en parelles i equips, i gairebé tots els productes són col·lectius. Això és bo per aprendre, però pot **amagar** l'alumne que "acompanya" sense programar mai tot sol (*efecte passatger*): sense aquest radar, el primer moment en què se'l veuria seria la prova trimestral — massa tard per reaccionar.

## Rutina (10 minuts)

1. **Quan:** a l'**inici de la sessió indicada** de cada SA (normalment la darrera; a SA3 i SA6, la penúltima, perquè la darrera **és, sencera, la prova trimestral**). **Aquell dia el mini-check substitueix la graella d'activació** (`00_Banc_activacio_repas.md`): també és recuperació.
2. **Com:** individual, **sense apunts ni parella**, en paper o a l'editor amb el projector apagat. 10' clavats.
3. **Correcció:** no es puntua. El docent fa una passada ràpida amb **semàfor**:
   - 🟢 **Ho fa sol** (errors de detall com a molt).
   - 🟡 **Se'n surt amb dubtes** (estructura bé, sintaxi o conceptes coixos).
   - 🟠🔴 **No se'n surt sol** (no distingeix les estructures bàsiques).
4. **Acció amb els 🔴 (el sentit de tot plegat):**
   - Deriva a la secció de **`SA0/SA0_guia_programacio.md`** indicada a cada check.
   - A la sessió següent, assigna-li el rol de **Programador/a** (que escrigui ell/a, amb la parella de suport — no a l'inrevés).
   - Si es repeteix dues SA seguides, activa mesures addicionals (`Programació didàctica/05_Atencio_a_la_diversitat.md` §5.2).
5. **Registre:** un semàfor per alumne/a al full de seguiment (`Avaluació/Full_qualificacio_competencies.md`). En acabar el trimestre, la sèrie de semàfors és evidència d'evolució (no de nota).

> ⚖️ **No qualifica, i s'ha de dir explícitament a l'alumnat.** L'objectiu és que escriguin sense por: el mini-check només funciona com a radar si ningú no té incentius per dissimular.

---

## SA2 · Mini-check (inici de la Sessió 4)

**Enunciat (projectar):**
> Escriu **de memòria** un programa d'Arduino complet que faci parpellejar un LED connectat al **pin 8**: mig segon encès, mig segon apagat.

**Què mires:** `pinMode` dins `setup()` · `digitalWrite` + `delay(500)` dins `loop()` · punts i coma.
**🟢** estructura completa i correcta · **🟡** estructura bé, errors de sintaxi · **🔴** barreja `setup()`/`loop()` o no arrenca.
**Reforç 🔴:** `SA0_guia_programacio.md` A1–A4 (esquelet, sortides digitals).

## SA3 · Mini-check (inici de la Sessió 3 — la S4 és, sencera, la prova T1)

**Enunciat (projectar):**
> Tens `int llum = analogRead(A1);` dins del `loop()`. **(a)** Escriu l'`if/else` perquè el LED del pin 9 s'encengui quan `llum` sigui **més petit que 300** i s'apagui altrament. **(b)** Entre quins valors es mou `llum`?

**Què mires:** condició amb `<` ben escrita · les dues branques actuen sobre el LED · resposta (b): 0–1023.
**🟢** tot correcte · **🟡** if bé però rang confós amb 0–255 · **🔴** no sap escriure la condició.
**Reforç 🔴:** `SA0_guia_programacio.md` A6 (`if/else`) i A7 (entrades analògiques).

## SA4 · Mini-check (inici de la Sessió 4)

**Enunciat (projectar):**
> **(a)** Escriu les **tres línies** mínimes perquè un servo connectat al pin 9 es posi a **90°** (pensa què va fora, què a `setup()` i què a `loop()`). **(b)** En una frase: per què el motor DC **no** es pot alimentar del pin 5 V de la placa?

**Què mires:** `#include <Servo.h>` + objecte · `attach(9)` a `setup()` · `write(90)` · (b) consum de corrent superior al que la placa pot donar → alimentació externa amb massa comuna.
**🟢** tot · **🟡** ordre/ubicació confosos · **🔴** no recorda el patró de la llibreria.
**Reforç 🔴:** `SA0_guia_programacio.md` A8 (funcions/llibreries) + repassar `01_servo_potenciometre.ino`.

## SA5 · Mini-check (inici de la Sessió 3)

**Enunciat (projectar):**
> Escriu **de memòria** un programa MicroPython per a micro:bit que mostri un **cor** mig segon i l'esborri mig segon, per sempre.

**Què mires:** `from microbit import *` · `while True:` · **indentació correcta** del cos · `display.show(Image.HEART)` / `sleep(500)` / `display.clear()`.
**🟢** funciona tal qual · **🟡** oblida l'import o un `sleep` · **🔴** indentació incoherent (no ha interioritzat que és sintaxi).
**Reforç 🔴:** `SA0_guia_programacio.md` Part B (MicroPython) + simulador de python.microbit.org.

## SA6 · Mini-check (inici de la Sessió 3 — la S4 és, sencera, la prova T2)

**Enunciat (projectar):**
> Un termòstat encén la calefacció quan `temp < 25` i l'apaga quan `temp >= 25`. A la pràctica, el relé fa **clic-clic sense parar** al voltant de 25 °C. **(a)** Per què passa? **(b)** Reescriu les condicions perquè no passi (pista: dos llindars).

**Què mires:** (a) la lectura balla al voltant de la consigna → commutació contínua · (b) histèresi: `if (temp < 24) encén;` / `if (temp > 26) apaga;` (valors raonables).
**🟢** explica i escriu els dos llindars · **🟡** intueix el problema però només mou el llindar · **🔴** no veu el problema.
**Reforç 🔴:** repassar `02_termostat_histeresi.ino` amb la bastida de la fitxa SA6.

## SA7 · Mini-check (inici de la Sessió 4)

**Enunciat (projectar):**
> El robot té les funcions fetes: `dist()` (cm), `endavant()`, `atura()` i `gira()`. Escriu el **`loop()` complet** del comportament *evita-obstacles*: si hi ha res a menys de 15 cm, atura't i gira; si no, endavant.

**Què mires:** `if (dist() < 15) { atura(); gira(); } else { endavant(); }` (amb pauses opcionals) · que la lectura es faci **a cada volta**.
**🟢** estructura reactiva correcta · **🟡** lògica bé però llegeix el sensor un sol cop · **🔴** no lliga sensor→decisió→acció.
**Reforç 🔴:** repassar `03_evita_obstacles.ino` i el cicle "llegir → decidir → actuar".

## SA8 · Mini-check (inici de la Sessió 3)

**Enunciat (projectar):**
> Anota què fa **cada línia** d'aquest emissor de telemetria:
> ```python
> import radio
> radio.config(group=10)
> radio.on()
> while True:
>     radio.send(str(temperature()))
>     sleep(2000)
> ```

**Què mires:** `group` = canal compartit (el receptor ha de tenir el mateix) · `radio.on()` obligatori · `send(str(...))` envia text · `sleep` marca la cadència de mostreig.
**🟢** explica `group` i `send` · **🟡** descriu línies però no el paper del `group` · **🔴** no distingeix emissor de receptor.
**Reforç 🔴:** repassar `01_telemetria_emissor.py`/`02_telemetria_receptor.py` en parella, rol de Programador/a.

---

> **SA9:** no té mini-check — la prova T3 i la defensa individualitzada del projecte ja fan aquesta funció. **SA1** tampoc: la prova diagnòstica cobreix el punt de partida.
