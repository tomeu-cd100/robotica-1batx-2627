# SA5 · Katas de programació (10 minuts)

> **Per a qui és?** Per al **docent**. Un **kata d'escriptura** per a cada pràctica de la SA: després del modelatge i **abans d'obrir el sketch donat**, projecta l'enunciat i l'alumnat escriu **el bloc central de zero**, individualment i **amb apunts permesos** (paper o editor). Passats 10', obren el sketch de la pràctica i **comparen** amb el que han escrit (2'). **No es recull ni es qualifica.**
>
> No és el [mini-check](../00_General/00_Mini_checks_individuals.md) (allò és de memòria, sense apunts, 1 per SA) ni un [repte](../../Reptes/Reptes_SA5.md) (allò és ampliació ⭐): és entrenament d'escriptura, cada sessió de codi.

## Kata · `01_name_badge` (Sessió 1)

**Projecta (enunciat):**
> Tens ja fet `from microbit import *`. Escriu de zero el `while True:` complet: si es prem el botó A, desplaça pel `scroll` el text `"Hola!"`; si no es prem l'A però sí el B, mostra la imatge `Image.HAPPY`; si no es prem cap dels dos, mostra `Image.HEART`. Acaba cada volta amb una pausa de 100 ms.

**Practica:** `while True:` amb indentació de 4 espais · `if`/`elif`/`else` sense parèntesis · `display.scroll()` vs. `display.show()` · `sleep()`.
**Pista (per a qui es bloqueja):** és una única cadena de decisió de tres branques, exactament una s'executa a cada volta: comença pel botó A, i encadena la resta amb `elif`/`else`.
**En comparar amb el sketch, mireu:** ① heu fet servir `elif` per al botó B, o un segon `if` independent que es podria arribar a executar alhora amb el primer? ② la branca "cap botó premut" és un `else` final, o l'heu deixat com un tercer `if` que podria no executar-se mai? ③ les tres branques estan indentades exactament al mateix nivell (dins del `while`), o alguna ha quedat arran de marge?

## Kata · `02_passes` (Sessió 2 · comptapassos)

**Projecta (enunciat):**
> Tens ja declarades `passes = 0` i `LLINDAR = 1500`. Escriu de zero el `while True:` complet: llegeix la força de l'acceleròmetre amb `accelerometer.get_strength()`; si supera `LLINDAR`, incrementa `passes`, mostra'n l'última xifra a la matriu (`str(passes % 10)`) i fes una pausa de 300 ms; en un `if` a part (no lligat a l'anterior), si es prem el botó B, reinicia `passes` a 0 i fes un `scroll` de `"0"`. Acaba cada volta amb una pausa de 20 ms.

**Practica:** `accelerometer.get_strength()` · llindar amb antirebot via `sleep()` · `str(... % 10)` per mostrar un sol dígit · dos `if` independents dins del mateix bucle.
**Pista (per a qui es bloqueja):** són dos blocs independents dins del `while`, sense cap relació entre ells: un gestiona el pas (llegir, comparar, comptar), l'altre gestiona el reset del botó.
**En comparar amb el sketch, mireu:** ① el `sleep(300)` de l'antirebot és dins de l'`if` del llindar, o l'heu posat com a pausa general de tot el bucle (que també alentiria la lectura del botó)? ② el reset del botó B és un `if` nou i separat, o l'heu encadenat amb `elif` al del llindar (de manera que mai es podrien activar els dos en el mateix cicle)? ③ el `sleep(20)` final s'executa sempre, a totes les voltes, o només quan es compleix algun dels `if` anteriors?

## Kata · `03_nightlight` (Sessió 2 · llum de nit)

**Projecta (enunciat):**
> Tens ja declarada `LLINDAR = 50`. Escriu de zero el `while True:` complet: llegeix el nivell de llum amb `display.read_light_level()`; si el valor és per sota de `LLINDAR`, mostra `Image.SQUARE`; en cas contrari, neteja la matriu amb `display.clear()`. Acaba cada volta amb una pausa de 100 ms.

**Practica:** `display.read_light_level()` · `if`/`else` de dues branques · `display.clear()` · `sleep()`.
**Pista (per a qui es bloqueja):** és el patró més curt de la sessió, tres passos i prou: llegeix, compara, respon; no cal res més abans ni després del `while`.
**En comparar amb el sketch, mireu:** ① la comparació és `llum < LLINDAR` (per sota és fosc), o l'heu escrit al revés? ② la lectura de `display.read_light_level()` és dins del `while True:` a cada volta, o l'heu tret fora i guardat en una variable que ja no s'actualitza mai més? ③ quan hi ha llum, heu fet `display.clear()`, o heu deixat aquesta branca sense cap instrucció que apagui el quadrat?

## Kata · `04_radio_dau` (Sessió 3)

**Projecta (enunciat):**
> Tens ja fetes, abans del bucle, `radio.on()` i `radio.config(group=10)`. Escriu de zero el `while True:` complet: si `accelerometer.was_gesture("shake")` és cert, genera un número a l'atzar entre 1 i 6 amb `random.randint`, mostra'l a la matriu i envia'l per ràdio; a continuació, comprova si ha arribat algun missatge amb `radio.receive()` i, si n'ha arribat, mostra'l per `scroll` precedit de la lletra `"R"`. Acaba cada volta amb una pausa de 50 ms.

**Practica:** `was_gesture()` com a detector d'esdeveniment ja fet · `random.randint(1, 6)` · `radio.send()`/`radio.receive()` amb text · comprovació `is not None`.
**Pista (per a qui es bloqueja):** són dos blocs independents dins del `while`, sense `if`/`elif` entre ells ni un dins de l'altre: un envia (només quan hi ha hagut sacseig), l'altre sempre comprova si ha arribat res.
**En comparar amb el sketch, mireu:** ① el `radio.send(...)` envia el número convertit amb `str()`, o l'heu enviat tal qual com a `int`? ② la comprovació de recepció és `if missatge is not None:`, o heu escrit `if missatge:` (que fallaria si algun dia arribés un text buit)? ③ el bloc de recepció s'executa a cada volta del bucle, o l'heu ficat dins de l'`if` del sacseig, de manera que només s'escolta quan es llança el dau?
