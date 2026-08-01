# SA6 · Katas de programació (10 minuts)

> **Per a qui és?** Per al **docent**. Un **kata d'escriptura** per a cada pràctica de la SA: després del modelatge i **abans d'obrir el sketch donat**, projecta l'enunciat i l'alumnat escriu **el bloc central de zero**, individualment i **amb apunts permesos** (paper o editor). Passats 10', obren el sketch de la pràctica i **comparen** amb el que han escrit (2'). **No es recull ni es qualifica.**
>
> No és el [mini-check](../00_General/00_Mini_checks_individuals.md) (allò és de memòria, sense apunts, 1 per SA) ni un [repte](../../Reptes/Reptes_SA6.md) (allò és ampliació ⭐): és entrenament d'escriptura, cada sessió de codi.

## Kata · `01_llac_obert_vs_tancat` (Sessió 1)

**Projecta (enunciat):**
> Tens ja declarades les constants `SENSOR` (A0), `SORTIDA` (pin 9) i `CONSIGNA` (500), i el `setup()` que configura `SORTIDA` com a `OUTPUT` i engega el Serial. Escriu de zero el bloc del **llaç tancat**: llegeix el sensor, mostra la lectura pel Monitor sèrie, encén la sortida si supera la consigna i apaga-la en cas contrari, i acaba amb una pausa de 100 ms.

**Practica:** `analogRead` · `Serial.println` · comparació amb una consigna · `digitalWrite` condicional.
**Pista (per a qui es bloqueja):** pensa-ho en tres passos seguits: mesura, ensenya el valor, i decideix la sortida comparant-la amb la consigna.
**En comparar amb el sketch, mireu:** ① la comparació és `lectura > CONSIGNA` (estricta), o hi heu posat `>=`? ② heu fet servir un únic `if`/`else`, o dos `if` independents (un que encén, un que apaga)? ③ el `delay(100)` és una única línia final, fora de la decisió, o l'heu duplicat dins de cada branca?

## Kata · `02_termostat_histeresi` (Sessió 2)

**Projecta (enunciat):**
> Tens ja declarades les constants `LLINDAR_ALT` (600) i `LLINDAR_BAIX` (500), la variable `bool actiu = false`, i el `setup()` que configura `SORTIDA` com a `OUTPUT`. Escriu de zero el `loop()`: llegeix el sensor a una variable `t`; decideix si cal engegar (quan estava aturat i `t` supera `LLINDAR_ALT`) o aturar (quan estava en marxa i `t` baixa de `LLINDAR_BAIX`) actualitzant `actiu`; aplica `actiu` a la sortida; i mostra per Serial la lectura i l'estat, amb una pausa de 100 ms.

**Practica:** `analogRead` · condició amb dos requisits combinats · memòria d'estat amb un `bool` · traduir un booleà a `HIGH`/`LOW`.
**Pista (per a qui es bloqueja):** pensa en dos moments diferents, no en un únic número: quin és el moment d'engegar, i quin el d'aturar; si no és cap dels dos, no toquis `actiu`.
**En comparar amb el sketch, mireu:** ① heu fet servir `if` / `else if` (una sola decisió, excloent), o dos `if` independents que es podrien avaluar tots dos a la mateixa volta? ② cada condició uneix els seus dos requisits amb `&&`, o els heu separat en `if` imbricats? ③ el `digitalWrite` final l'heu escrit amb l'operador ternari (`actiu ? HIGH : LOW`), o amb un `if`/`else` explícit?

## Kata · `04_control_proporcional` (Sessions 2-3, repte +)

**Projecta (enunciat):**
> Tens ja declarades les constants `SENSOR` (A0), `SORTIDA` (pin 9, PWM), `CONSIGNA` (500) i `Kp` (0.8, `float`), i el `setup()` que configura `SORTIDA` com a `OUTPUT`. Escriu de zero el `loop()`: llegeix el sensor, calcula l'`error` respecte a la consigna, calcula la sortida proporcional a l'error (`Kp` per l'error), limita el resultat al rang vàlid de PWM (0-255) i aplica'l a la sortida, amb una pausa de 50 ms.

**Practica:** `analogRead` · `error = lectura - consigna` · multiplicació d'un `float` per un `int` amb conversió a enter · `constrain()` per limitar un rang · `analogWrite`.
**Pista (per a qui es bloqueja):** pensa en tres magnituds encadenades: com de lluny ets de la consigna, quanta resposta hi apliques, i si aquesta resposta és un valor vàlid per al PWM.
**En comparar amb el sketch, mireu:** ① la conversió a enter `(int)` l'apliqueu al resultat de `Kp * error` abans de guardar-lo, o guardeu `Kp * error` en una variable pròpia i la convertiu més tard? ② el `constrain()` actua sobre la variable `sortida` un cop calculada, o l'heu aplicat directament dins de l'`analogWrite`? ③ els dos límits de `constrain()` són `(0, 255)` en aquest ordre, o hi heu posat primer el màxim?

## Kata · `03_maquina_estats` (Sessió 3, modelatge)

**Projecta (enunciat):**
> Tens ja declarat l'`enum Estat { ESPERA, FASE1, FASE2, FET }`, la variable `estat = ESPERA`, la funció `canviaEstat(Estat nou)` (canvia `estat` i actualitza `tEstat` amb `millis()`), la funció `bool polsat()` i els pins configurats a `setup()`. Escriu de zero un `loop()` amb un `switch(estat)` que inclogui **només** els casos `ESPERA` i `FASE1`: a `ESPERA`, `LED_VERMELL` encès i `LED_VERD` apagat, sortida a 0, i si es polsa, passa a `FASE1` (amb un petit `delay(250)` d'antirebots); a `FASE1`, `LED_VERMELL` apagat i `LED_VERD` encès, sortida PWM a 120, i si han passat més de 3000 ms des que hi vau entrar, passa a `FASE2`.

**Practica:** `switch`/`case` amb un `case` per estat · `canviaEstat()` per centralitzar el canvi · transició per esdeveniment (`polsat()`) enfront de transició per temps (`millis() - tEstat`).
**Pista (per a qui es bloqueja):** cada `case` respon dues preguntes, què fa el sistema aquí i quan en surt; un dels dos casos ho decideix amb el polsador, l'altre amb el rellotge.
**En comparar amb el sketch, mireu:** ① cada `case` acaba amb un `break`, o els heu deixat encadenats? ② a `ESPERA`, el `delay(250)` és dins del mateix `if` que crida `canviaEstat(FASE1)`, o l'heu tret com a instrucció separada del `case`? ③ a `FASE1`, la condició de temps resta `millis() - tEstat`, o ho heu escrit a l'inrevés (`tEstat - millis()`)?
