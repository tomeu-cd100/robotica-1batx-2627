# SA2 · Katas de programació (10 minuts)

> **Per a qui és?** Per al **docent**. Un **kata d'escriptura** per a cada pràctica de la SA: després del modelatge i **abans d'obrir el sketch donat**, projecta l'enunciat i l'alumnat escriu **el bloc central de zero**, individualment i **amb apunts permesos** (paper o editor). Passats 10', obren el sketch de la pràctica i **comparen** amb el que han escrit (2'). **No es recull ni es qualifica.**
>
> No és el [mini-check](../00_General/00_Mini_checks_individuals.md) (allò és de memòria, sense apunts, 1 per SA) ni un [repte](../../Reptes/Reptes_SA2.md) (allò és ampliació ⭐): és entrenament d'escriptura, cada sessió de codi.

## Kata · `01_led_basic` (Sessió 1)

**Projecta (enunciat):**
> Escriu de zero un programa complet que faci parpellejar un LED connectat al **pin 8**: mig segon encès, mig segon apagat. Fes servir una **constant** per al pin i una **variable** `temps` per a la durada.

**Practica:** esquelet `setup()`/`loop()` · `const` vs. variable · `digitalWrite` + `delay`.
**Pista (per a qui es bloqueja):** quatre línies al `loop()`: encén, espera, apaga, espera… quin valor hi va a cada `delay`?
**En comparar amb el sketch, mireu:** ① `pinMode(LED, OUTPUT)` és a `setup()`? ② el pin només apareix com a `LED` (mai com a `8` solt)? ③ la variable `temps` es fa servir als dos `delay()`?

## Kata · `02_semafor` (Sessió 2)

**Projecta (enunciat):**
> Escriu de zero el `loop()` d'un semàfor de 3 LED (vermell=8, groc=9, verd=10): vermell 4000 ms, verd 4000 ms, groc 1500 ms, i torna a començar. Declara abans les constants de pins i de temps.

**Practica:** constants múltiples · seqüència encén–espera–apaga repetida · `delay()` bloquejant.
**Pista (per a qui es bloqueja):** és el mateix trio de 3 línies (`digitalWrite` HIGH, `delay`, `digitalWrite` LOW) tres vegades seguides, cada cop amb un altre pin i un altre temps.
**En comparar amb el sketch, mireu:** ① cada `delay()` fa servir la constant `T_...` corresponent (no un número solt)? ② els tres LED s'apaguen abans d'encendre el següent? ③ l'ordre és vermell → verd → groc?

## Kata · `02b_semafor_switch` (Sessió 2)

**Projecta (enunciat):**
> Reescriu el mateix semàfor (vermell=8, groc=9, verd=10; temps 4000/4000/1500 ms) amb una variable `int fase = 0;` i un `switch (fase)` de tres `case` (0=vermell, 1=verd, 2=groc): cada `case` encén el seu LED, espera, l'apaga i actualitza `fase` a la fase següent.

**Practica:** variable d'estat · `switch`/`case` · `break` i la transició d'estat.
**Pista (per a qui es bloqueja):** cada `case` té 4 línies: encén, espera, apaga, `fase = ...;`.
**En comparar amb el sketch, mireu:** ① els tres `case` acaben en `break`? ② el `case 2` torna `fase` a `0` (tanca el cicle)? ③ el valor inicial de `fase` és `0`?

## Kata · `03_fade_pwm` (Sessió 3)

**Projecta (enunciat):**
> Escriu de zero un `loop()` que faci «respirar» un LED al pin 9 (PWM): puja la intensitat de 0 a 255 d'1 en 1 amb `analogWrite`, esperant 8 ms a cada pas, i després la baixa de 255 a 0 igual.

**Practica:** `analogWrite(pin, 0..255)` · `for` ascendent i descendent · pins amb `~`.
**Pista (per a qui es bloqueja):** dues fases, una que apuja i una que abaixa; pensa què ha de canviar a cada volta i quant temps ha de passar entre voltes.
**En comparar amb el sketch, mireu:** ① el pin declarat és un pin PWM (`~`)? ② el primer `for` puja i el segon baixa (condicions i pas invertits)? ③ el `delay` és el mateix (8 ms) als dos bucles?

## Kata · `04_rgb` (Sessió 3)

**Projecta (enunciat):**
> Escriu de zero una funció `void color(int r, int g, int b)` que apliqui `analogWrite` als pins R=9, G=10, B=11, i un `loop()` que la cridi per mostrar vermell (255,0,0), verd (0,255,0) i blau (0,0,255), 1 segon cada un.

**Practica:** definició de funció amb paràmetres · crida de funció · `analogWrite` × 3.
**Pista (per a qui es bloqueja):** dins de `color()` hi ha exactament tres `analogWrite`, un per canal, fent servir `r`, `g` i `b` (no `R`, `G`, `B`).
**En comparar amb el sketch, mireu:** ① la funció és `void` i no `int`? ② dins seu s'usen els paràmetres (minúscules) i no les constants de pin? ③ el `loop()` crida `color(...)` seguit d'un `delay(1000)` per a cada color?

## Kata · `05_panell_senyalitzacio` (Sessió 4)

**Projecta (enunciat):**
> Tens ja `color(r, g, b)` declarada i les constants `PIEZO` (pin 6) i `RELE` (pin 7). Escriu de zero la funció `void estatAvis()` que representi l'estat d'avís: llum **groga fixa**, un **bip curt** (1000 Hz, 150 ms) i la càrrega del relé **desconnectada**.

**Practica:** funció sense paràmetres que agrupa diverses accions · `tone()` · un estat = una funció.
**Pista (per a qui es bloqueja):** quines tres coses ha de deixar fetes la funció en sortir? Una per cada actuador (RGB, piezo, relé).
**En comparar amb el sketch, mireu:** ① has cridat `color(...)` en lloc de repetir els tres `analogWrite`? ② quins valors exactes de R,G,B has triat per al groc, i coincideixen amb el sketch (255, 180, 0)? ③ heu cobert els tres actuadors (`color(...)` per al RGB, `tone(PIEZO, ...)` per al piezo i `digitalWrite(RELE, LOW)` per al relé), o us n'heu deixat algun sense tocar?
