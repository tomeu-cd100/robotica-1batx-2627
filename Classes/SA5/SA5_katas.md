# SA5 · Katas de programació (10 minuts)

> **Per a qui és?** Per al **docent** (que el projecta) **i per a l'alumnat**: si ningú no el projecta, obre'l tu mateix ABANS de mirar el codi de la pràctica. Un **kata d'escriptura** per a cada pràctica de la SA: després del modelatge i **abans d'obrir el sketch donat**, projecta l'enunciat i l'alumnat escriu **el bloc central de zero**, individualment i **amb apunts permesos** (paper o editor). Passats 10', obren el sketch de la pràctica i **comparen** amb el que han escrit (2'). **No es recull ni es qualifica.**
>
> No és el [mini-check](../00_General/00_Mini_checks_individuals.md) (allò és de memòria, sense apunts, 1 per SA) ni un [repte](../../Reptes/Reptes_SA5.md) (allò és ampliació ⭐): és entrenament d'escriptura, cada sessió de codi. El dia del **mini-check** de la SA, el mini-check el substitueix (ho marca el kata afectat amb 🔁).
>
> **En aquesta SA el kata és una *variació*:** els valors de l'enunciat són diferents dels del sketch expressament — en comparar, mira l'estructura, no els números.

## Kata · `01_selector_articulacio` (Sessió 1)

**Projecta (enunciat):**
> Tens ja `from microbit import *` i la llista `ARTICULACIONS = ["P", "D", "E", "B"]` *(ordre diferent del programa, expressament)*. Escriu de zero la resta: una variable `triada` que comenci a 0 i un `while True:` que, si es prem B, passi a la següent articulació (i de l'última torni a la primera); si es prem A, a l'anterior (i de la primera salti a l'última); i que mostri sempre la lletra triada, amb una pausa de 100 ms.

**Practica:** llistes i índexs des del 0 · `len()` · `was_pressed()` · `if`/`elif` indentat dins del `while True:`.
**Pista (per a qui es bloqueja):** fes primer només el botó B (sumar 1 i tornar a 0); quan funcioni, el botó A és el mateix al revés.
**En comparar amb el programa, mireu:** ① heu fet servir `was_pressed()` o `is_pressed()`? (amb `is_pressed()` una premuda salta diverses lletres); ② el límit de la llista és `len(ARTICULACIONS)` o un 4 escrit a mà? (amb `len()`, si afegiu una articulació el codi no es trenca); ③ el `display.show(...)` és dins del `while True:` però **fora** dels `if` (s'ha de mostrar sempre)?

## Kata · `02_inclinacio` (Sessió 2)

**Projecta (enunciat):**
> Tens ja `from microbit import *` i `LLINDAR = 400` *(valor diferent del programa, expressament)*. Escriu de zero el `while True:`: llegeix `x` i `y` de l'acceleròmetre i envia'ls al gràfic amb `print((x, y))`; si `x` supera el llindar mostra `Image.ARROW_E`, si és menor que `-LLINDAR` mostra `Image.ARROW_W`, i si no, `Image.DIAMOND_SMALL`. Pausa de 100 ms.

**Practica:** lectura d'un sensor integrat · llindar positiu i negatiu · cadena `if`/`elif`/`else` · `print()` d'una tupla.
**Pista (per a qui es bloqueja):** primer guarda `x` en una variable; després tres branques: més gran que `LLINDAR`, més petit que `-LLINDAR`, i la resta.
**En comparar amb el programa, mireu:** ① el costat esquerre compara amb `-LLINDAR` (negatiu) o amb `LLINDAR`? ② les lectures `get_x()` són **dins** del bucle (a cada volta) o a dalt, un sol cop? ③ el `print((x, y))` porta **dobles parèntesis** (una tupla) o n'heu posat uns de sols (i aleshores el gràfic no dibuixa dues línies)?

## Kata · `04_brac_ordres` (Sessió 2, taller)

**Projecta (enunciat):**
> Tens ja els quatre servos amb `attach()`, les variables `aBase`, `aEsquerre`, `aDret`, `aPinca`, les constants de límits, `PAS = 5` *(valor diferent del programa, expressament)* i la funció `escriu()`. Escriu de zero el `loop()`: si hi ha dades al Serial, llegeix una línia sencera, neteja-la amb `trim()` i, segons l'ordre (`B+`, `B-`, `P`), mou la base un `PAS` sense sortir del rang o commuta la pinça. Després crida `escriu()`.

**Practica:** `Serial.available()` · `readStringUntil('\n')` · comparar `String` · `min()`/`max()` com a rang segur · commutador.
**Pista (per a qui es bloqueja):** tot va dins d'un `if (Serial.available() > 0)`: llegeix, neteja, i després una cadena d'`if`/`else if` amb una branca per ordre.
**En comparar amb el programa, mireu:** ① heu fet `trim()`? Sense ell, el `"\r"` del Monitor sèrie fa que `"B+"` no sigui mai igual a l'ordre; ② `B+` fa servir `min()` i `B-` `max()` (i no al revés)? ③ l'`escriu()` és dins de l'`if` d'`available()` o fora (s'escriuria a cada volta sense motiu)?

## Kata · `03_radio_comandament` (Sessió 3)

> 🔁 **Aquest dia hi ha mini-check** (inici de la S3): el mini-check **substitueix el kata** a l'aula — no es fan tots dos, són el mateix múscul (escriptura individual de 10'). Aquest kata queda com a **repàs per fer pel teu compte** abans de tancar la SA.

**Projecta (enunciat):**
> Tens ja `from microbit import *`, `import radio`, `GRUP = 7` i `LLINDAR = 350` *(valors diferents del programa, expressament)*. Escriu de zero: encén la ràdio al grup `GRUP` (fora del bucle) i un `while True:` que llegeixi `x`; si supera el llindar envia `"B+"`, si és menor que `-LLINDAR` envia `"B-"`; mostra la primera lletra de l'ordre enviada o `Image.DIAMOND_SMALL` si no n'hi ha cap. Pausa de 150 ms.

**Practica:** `radio.on()` i `radio.config(group=...)` · una variable `ordre` que comença buida · `radio.send()` · indexar un text (`ordre[0]`).
**Pista (per a qui es bloqueja):** a cada volta, `ordre = ""`; els `if` només li posen valor; al final, *si l'ordre no és buida, envia-la*.
**En comparar amb el programa, mireu:** ① `radio.on()` i `radio.config()` són **fora** del bucle (un sol cop)? ② heu reiniciat `ordre = ""` a **cada** volta, o es repeteix l'última ordre per sempre? ③ envieu text (`"B+"`) i no un número?
