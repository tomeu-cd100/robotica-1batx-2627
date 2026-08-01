# SA4 · Katas de programació (10 minuts)

> **Per a qui és?** Per al **docent** (que el projecta) **i per a l'alumnat**: si ningú no el projecta, obre'l tu mateix ABANS de mirar el codi de la pràctica. Un **kata d'escriptura** per a cada pràctica de la SA: després del modelatge i **abans d'obrir el sketch donat**, projecta l'enunciat i l'alumnat escriu **el bloc central de zero**, individualment i **amb apunts permesos** (paper o editor). Passats 10', obren el sketch de la pràctica i **comparen** amb el que han escrit (2'). **No es recull ni es qualifica.**
>
> No és el [mini-check](../00_General/00_Mini_checks_individuals.md) (allò és de memòria, sense apunts, 1 per SA) ni un [repte](../../Reptes/Reptes_SA4.md) (allò és ampliació ⭐): és entrenament d'escriptura, cada sessió de codi.

## Kata · `01_servo_potenciometre` (Sessió 1)

**Projecta (enunciat):**
> Tens ja declarat l'objecte `servo`, la constant `POT` (A0) i el `servo.attach(9)` al `setup()`. Escriu de zero el `loop()` complet: llegeix el potenciòmetre, tradueix la lectura (0–1023) a un angle (0–180°) i mou-hi el servo, amb una pausa de 15 ms perquè hi arribi.

**Practica:** `analogRead` d'un potenciòmetre · `map()` d'escala 0–1023 a 0–180 · `servo.write(angle)` · pausa amb `delay`.
**Pista (per a qui es bloqueja):** tres línies i prou: llegeix, tradueix, mou; la quarta és només l'espera.
**En comparar amb el sketch, mireu:** ① heu tornat a escriure `servo.attach(9)` dins del `loop()` (no cal, ja és fet a `setup()`), o heu confiat que ja hi és i heu escrit només les quatre línies de lectura, traducció, moviment i pausa? ② els cinc paràmetres de `map()` respecten l'ordre (valor, mínim d'entrada, màxim d'entrada, mínim de sortida, màxim de sortida)? ③ la pausa final és de 15 ms, o n'hi heu posat una altra a ull?

## Kata · `02_motor_pont_h` (Sessió 2)

**Projecta (enunciat):**
> Tens ja declarades les constants `ENA` (5, PWM), `IN1` (7) i `IN2` (8), i el `setup()` amb els tres `pinMode(..., OUTPUT)`. Escriu de zero les tres funcions de moviment: `endavant(int velocitat)` i `enrere(int velocitat)` (cadascuna posa `IN1`/`IN2` en el sentit que toca i aplica la velocitat amb `analogWrite(ENA, velocitat)`) i `atura()` (sense paràmetre: els dos `IN` a `LOW` i velocitat 0).

**Practica:** funció amb paràmetre (`velocitat`) · `digitalWrite` per triar sentit · `analogWrite` (PWM) per la velocitat · funció sense paràmetre.
**Pista (per a qui es bloqueja):** cada funció són tres línies: dos `digitalWrite` (un `HIGH`, un `LOW`) i un `analogWrite`; només canvia quins pins reben què.
**En comparar amb el sketch, mireu:** ① a `enrere()`, heu intercanviat `IN1` i `IN2` respecte a `endavant()`, o hi heu repetit el mateix patró (que giraria sempre en el mateix sentit)? ② dins d'`atura()`, poseu `IN1` i `IN2` a `LOW` a més de tallar el PWM, o l'atureu només amb `analogWrite(ENA, 0)` sense tocar els pins de direcció? ③ a `analogWrite(ENA, velocitat)`, l'ordre és sempre (pin, valor), o en alguna de les tres funcions heu invertit `ENA` i la velocitat?

## Kata · `03_sensor_velocitat` (Sessió 3, modelatge)

**Projecta (enunciat):**
> Tens ja fetes `mesuraDistancia()` (com a la SA3, retorna cm o 400 si no hi ha eco) i les funcions de moviment `endavant(int vel)` i `atura()`, i la constant `SEGURETAT = 10` (cm). Escriu de zero el `loop()`: mesura la distància i mostra-la pel Monitor sèrie; si és menor que `SEGURETAT`, atura el motor; si no, reescala la distància (10–50 cm) a velocitat (80–255) amb `map()` i `constrain()`, i posa el motor endavant a aquesta velocitat. Acaba amb una pausa de 50 ms.

**Practica:** prioritat de seguretat amb `if`/`else` · `map()` aparellat amb `constrain()` · reutilitzar funcions pròpies ja escrites · `Serial.println` per depurar.
**Pista (per a qui es bloqueja):** primer decideix "és segur moure's?"; només dins la branca del "sí" cal calcular res més.
**En comparar amb el sketch, mireu:** ① la conversió `(int)d` abans de passar la distància al `map()`, l'heu inclosa, o hi passeu directament el `float`? ② el `constrain()` va després del `map()`, o heu confiat que `map()` ja limitava el resultat dins del rang 80–255? ③ el `Serial.println(d)` és abans de decidir si atura o mou, o només l'imprimiu dins d'una de les dues branques?

## Kata · `05_dos_leds_millis` (Sessió 3, repte +)

**Projecta (enunciat):**
> Tens ja declarades `LED_A` (7), `LED_B` (8), les constants `PERIODE_A = 250` i `PERIODE_B = 1000` (ms), i les variables `tA = 0`, `tB = 0`, `encesA = false`, `encesB = false`. Escriu de zero el `loop()` sense cap `delay()`: llegeix `millis()` una vegada, i per a cada LED per separat, si ha passat el seu període des de l'últim canvi, actualitza la seva marca de temps, inverteix el seu estat i escriu-lo al pin.

**Practica:** temporització no bloquejant amb `millis()` · comparació `ara - tX >= PERIODE_X` · actualitzar la marca de temps · operador `!` per invertir un booleà.
**Pista (per a qui es bloqueja):** resol el raonament sencer per a un LED (comprova, actualitza, inverteix, escriu) i després aplica exactament el mateix raonament a l'altre, amb les seves pròpies variables.
**En comparar amb el sketch, mireu:** ① dins de cada `if`, l'assignació `tA = ara` (o `tB = ara`) és abans o després d'invertir `encesA`? ② heu escrit un sol `if` que mira els dos LEDs alhora, o dos `if` independents, un per LED? ③ `digitalWrite(LED_A, encesA)` passa el booleà directament, o l'heu convertit a `HIGH`/`LOW` amb un `if` extra?

## Kata · `04_barrera_automatica` (Sessió 4, producte)

**Projecta (enunciat):**
> Tens ja `mesuraDistancia()`, les constants `ANGLE_TANCAT = 0`, `ANGLE_OBERT = 90`, `DIST_DETECCIO = 15` (cm) i `TEMPS_OBERT = 3000` (ms), i el `setup()` que deixa la barrera tancada. Escriu de zero el `loop()`: mesura la distància, i si és més gran que 0 **i** menor que `DIST_DETECCIO`, encén el LED, obre la barrera, espera `TEMPS_OBERT`, torna a tancar-la i apaga el LED. Acaba amb una pausa de 60 ms a cada volta.

**Practica:** guarda amb `&&` per descartar lectures invàlides · seqüència obrir–esperar–tancar amb `delay()` dins d'un `if` · `servo.write()` amb constants d'angle · disseny amb constants (no valors "clavats" al codi).
**Pista (per a qui es bloqueja):** primer decideix si hi ha vehicle; només si la resposta és sí, encadena les cinc accions (LED, obre, espera, tanca, LED) una darrere l'altra.
**En comparar amb el sketch, mireu:** ① la guarda porta `d > 0 && d < DIST_DETECCIO`, o només heu comprovat un dels dos costats? ② el LED s'apaga abans o després de tancar la barrera (`barrera.write(ANGLE_TANCAT)`)? ③ la pausa de 60 ms final és dins o fora de l'`if` de detecció (és a dir, s'executa a totes les voltes o només quan hi ha vehicle)?
