# SA4 · Katas de programació (10 minuts)

> **Per a qui és?** Per al **docent** (que el projecta) **i per a l'alumnat**: si ningú no el projecta, obre'l tu mateix ABANS de mirar el codi de la pràctica. Un **kata d'escriptura** per a cada pràctica de la SA: després del modelatge i **abans d'obrir el sketch donat**, projecta l'enunciat i l'alumnat escriu **el bloc central de zero**, individualment i **amb apunts permesos** (paper o editor). Passats 10', obren el sketch de la pràctica i **comparen** amb el que han escrit (2'). **No es recull ni es qualifica.**
>
> No és el [mini-check](../00_General/00_Mini_checks_individuals.md) (allò és de memòria, sense apunts, 1 per SA) ni un [repte](../../Reptes/Reptes_SA4.md) (allò és ampliació ⭐): és entrenament d'escriptura, cada sessió de codi. El dia del **mini-check** de la SA, el mini-check el substitueix (ho marca el kata afectat amb 🔁).
>
> **En aquesta SA el kata és una *variació*:** els valors de l'enunciat són diferents dels del sketch expressament — en comparar, mira l'estructura, no els números.

## Kata · `01_servo_potenciometre` (Sessió 1)

**Projecta (enunciat):**
> Tens ja declarat l'objecte `servo`, la constant `POT` (A0) i el `servo.attach(9)` al `setup()`. Escriu de zero el `loop()` complet: llegeix el potenciòmetre, tradueix la lectura (0–1023) a un angle (0–180°) i mou-hi el servo, amb una pausa de 20 ms perquè hi arribi *(valor diferent del sketch, expressament)*.

**Practica:** `analogRead` d'un potenciòmetre · `map()` d'escala 0–1023 a 0–180 · `servo.write(angle)` · pausa amb `delay`.
**Pista (per a qui es bloqueja):** tres línies i prou: llegeix, tradueix, mou; la quarta és només l'espera.
**En comparar amb el sketch, mireu:** ① heu tornat a escriure `servo.attach(9)` dins del `loop()` (no cal, ja és fet a `setup()`), o heu confiat que ja hi és i heu escrit només les quatre línies de lectura, traducció, moviment i pausa? ② els cinc paràmetres de `map()` respecten l'ordre (valor, mínim d'entrada, màxim d'entrada, mínim de sortida, màxim de sortida)? ③ la pausa és una única línia situada al final del `loop()`, després de moure el servo, o l'heu situada abans o repetida enmig (el valor en si no compta: aquí és expressament diferent del sketch)?

## Kata · `02_motor_pont_h` (Sessió 2)

**Projecta (enunciat):**
> Tens ja declarades les constants `ENA` (6, PWM), `IN1` (9) i `IN2` (10) *(pins diferents dels del sketch, expressament)*, i el `setup()` amb els tres `pinMode(..., OUTPUT)`. Escriu de zero les tres funcions de moviment: `endavant(int velocitat)` i `enrere(int velocitat)` (cadascuna posa `IN1`/`IN2` en el sentit que toca i aplica la velocitat amb `analogWrite(ENA, velocitat)`) i `atura()` (sense paràmetre: els dos `IN` a `LOW` i velocitat 0).

**Practica:** funció amb paràmetre (`velocitat`) · `digitalWrite` per triar sentit · `analogWrite` (PWM) per la velocitat · funció sense paràmetre.
**Pista (per a qui es bloqueja):** cada funció són tres línies: dos `digitalWrite` (un `HIGH`, un `LOW`) i un `analogWrite`; només canvia quins pins reben què.
**En comparar amb el sketch, mireu:** ① a `enrere()`, heu intercanviat `IN1` i `IN2` respecte a `endavant()`, o hi heu repetit el mateix patró (que giraria sempre en el mateix sentit)? ② dins d'`atura()`, poseu `IN1` i `IN2` a `LOW` a més de tallar el PWM, o l'atureu només amb `analogWrite(ENA, 0)` sense tocar els pins de direcció? ③ a `analogWrite(ENA, velocitat)`, l'ordre és sempre (pin, valor), o en alguna de les tres funcions heu invertit `ENA` i la velocitat?

## Kata · `03_ultrasons_brac` (Sessió 3, modelatge)

**Projecta (enunciat):**
> Tens ja fetes `mesuraDistancia()` (com a la SA3, retorna cm o 400 si no hi ha eco), els objectes `base` i `pinca` connectats i les constants `DIST_OBJECTE = 12` (cm), `BASE_REPOS = 90`, `BASE_ESTACIO = 30`, `PINCA_TANCADA = 50` i `PINCA_OBERTA = 110` *(valors diferents del sketch, expressament)*. Escriu de zero el `loop()`: mesura la distància i mostra-la pel Monitor sèrie; si és menor que `DIST_OBJECTE`, gira la base cap a l'estació i obre la pinça; si no, torna la base a repòs i tanca la pinça. Acaba amb una pausa de 100 ms.

**Practica:** cadena percepció → decisió → acció · `if`/`else` amb dues accions per branca · reutilitzar una funció pròpia ja escrita · `Serial.println` per depurar.
**Pista (per a qui es bloqueja):** primer guarda la distància en una variable; després una sola pregunta (`d < DIST_OBJECTE`) i, a cada branca, dos `write()`.
**En comparar amb el sketch, mireu:** ① heu cridat `mesuraDistancia()` **una sola vegada** i heu guardat el resultat en una variable, o l'heu cridat dins de l'`if` (i potser una altra vegada al `Serial.println`)? ② cada branca mou **els dos** servos, o alguna branca s'ha oblidat de la pinça (i es quedaria oberta)? ③ el `Serial.println(d)` és abans de decidir, o només l'imprimiu dins d'una de les dues branques?

## Kata · `05_dos_servos_millis` (Sessió 3, bastida)

**Projecta (enunciat):**
> Tens ja els objectes `base` i `pinca`, les constants `BASE_MIN = 70`, `BASE_MAX = 110`, `PINCA_TANCADA`, `PINCA_OBERTA`, `PERIODE_BASE = 30` i `PERIODE_PINCA = 700` (ms) *(valors diferents del sketch, expressament)*, i les variables `angleBase = 90`, `pas = 1`, `pincaOberta = false`, `tBase = 0` i `tPinca = 0`. Escriu de zero el `loop()` sense cap `delay()`: llegeix `millis()` una vegada; si ha passat `PERIODE_BASE`, mou la base un `pas` i canvia el sentit als extrems; si ha passat `PERIODE_PINCA`, capgira la pinça.

**Practica:** temporització no bloquejant amb `millis()` · comparació `ara - tX >= PERIODE_X` · actualitzar la marca de temps · operador `!` per invertir un booleà · canvi de signe d'una variable (`pas = -pas`).
**Pista (per a qui es bloqueja):** fes primer la pinça sencera (comprova, apunta l'hora, capgira, escriu) i després aplica el mateix patró a la base, amb les seves pròpies variables.
**En comparar amb el sketch, mireu:** ① dins de cada `if`, heu actualitzat la marca de temps (`tBase = ara`, `tPinca = ara`)? Sense això, la condició és certa a totes les voltes. ② heu escrit dos `if` independents, un per articulació, o un sol `if` que mira les dues coses alhora? ③ el canvi de sentit de la base (`pas = -pas`) es fa quan arriba a **qualsevol** dels dos extrems, o només a un?

## Kata · `04_brac_potenciometres` (Sessió 4, producte)

> 🔁 **Aquest dia hi ha mini-check** (inici de la S4): el mini-check **substitueix el kata** a l'aula — no es fan tots dos, són el mateix múscul (escriptura individual de 10'). Aquest kata queda com a **repàs per fer pel teu compte** abans de tancar la SA.

**Projecta (enunciat):**
> Tens ja els quatre objectes `Servo`, les constants de pins i de rangs, i la constant `ZONA_MORTA = 3` *(valor diferent del sketch, expressament)*. Escriu de zero les dues funcions del braç: `int llegeixAngle(int pinPot, int minim, int maxim)`, que llegeix el potenciòmetre i retorna l'angle dins del rang; i `void mouSiCal(Servo &servo, int &actual, int nou)`, que només mou el servo (i actualitza `actual`) si el canvi supera la zona morta. Després, escriu la línia del `loop()` que mou la **pinça** fent servir totes dues funcions.

**Practica:** funcions amb paràmetres i amb valor de retorn · `map()` cap a un rang segur · `abs()` per mesurar una diferència · pas per referència (`&`).
**Pista (per a qui es bloqueja):** `llegeixAngle()` és una sola línia (`return map(...)`). `mouSiCal()` és un `if` amb dues línies a dins.
**En comparar amb el sketch, mireu:** ① el `map()` va a `minim, maxim` (els paràmetres) o a `0, 180`? ② heu fet servir `abs()`, o la vostra condició només funciona quan el potenciòmetre puja (i no quan baixa)? ③ a `mouSiCal()`, heu actualitzat `actual = nou` **abans** del `write()`, i amb el `&` a la capçalera? Sense el `&`, la funció canvia una còpia i la zona morta no funciona mai.
