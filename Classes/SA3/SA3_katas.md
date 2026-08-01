# SA3 · Katas de programació (10 minuts)

> **Per a qui és?** Per al **docent**. Un **kata d'escriptura** per a cada pràctica de la SA: després del modelatge i **abans d'obrir el sketch donat**, projecta l'enunciat i l'alumnat escriu **el bloc central de zero**, individualment i **amb apunts permesos** (paper o editor). Passats 10', obren el sketch de la pràctica i **comparen** amb el que han escrit (2'). **No es recull ni es qualifica.**
>
> No és el [mini-check](../00_General/00_Mini_checks_individuals.md) (allò és de memòria, sense apunts, 1 per SA) ni un [repte](../../Reptes/Reptes_SA3.md) (allò és ampliació ⭐): és entrenament d'escriptura, cada sessió de codi.

## Kata · `01_polsador_debounce` (Sessió 1)

**Projecta (enunciat):**
> Tens ja declarades les constants `POLSADOR` (pin 2) i `LED` (pin 8), i les variables `comptador = 0`, `estatAnterior = HIGH` i `ultimCanvi = 0`, més la constant `ANTIREBOT = 40` (ms). Escriu de zero el `loop()` complet: llegeix l'estat del polsador, detecta cada canvi real filtrant els rebots (només compta si han passat més de 40 ms des de l'últim canvi vàlid), i quan el canvi sigui cap a prémer (LOW), incrementa `comptador`, mostra'l pel Monitor sèrie i alterna el LED.

**Practica:** `digitalRead` amb `INPUT_PULLUP` (lògica invertida) · antirebot amb `millis()` · filtrar dins d'un filtre · toggle amb `!digitalRead(...)`.
**Pista (per a qui es bloqueja):** dues comprovacions imbricades: primer si el canvi és "vàlid" (ha canviat i ha passat prou temps), i només dins d'aquesta, si el canvi és concretament cap a prémer.
**En comparar amb el sketch, mireu:** ① l'`estatAnterior` s'actualitza sempre que el canvi és vàlid, o només quan es prem? ② el toggle del LED llegeix l'estat actual del LED (`digitalRead(LED)`) o feu servir una variable pròpia per recordar-lo? ③ on es guarda el moment del canvi (`ultimCanvi = millis()`): dins del filtre d'antirebot o dins del filtre de "és una premuda"?

## Kata · `02_potenciometre_ldr` (Sessió 2)

**Projecta (enunciat):**
> Tens ja declarades les constants `POT` (A0), `LDR` (A1) i `LED` (pin 9, PWM). Escriu de zero el `loop()`: llegeix els dos sensors, tradueix la lectura del potenciòmetre (0–1023) a una escala 0–255 i escriu-la al LED amb PWM, mostra totes dues lectures pel Monitor sèrie a la mateixa línia (`POT: ... LDR: ...`) i espera 100 ms abans de tornar a començar.

**Practica:** `analogRead` de dos sensors · `map()` per canviar d'escala · `analogWrite` (PWM) · `Serial.print`/`println` combinats.
**Pista (per a qui es bloqueja):** primer llegeix els dos sensors i guarda'ls en dues variables; després només el valor que has d'escriure al LED necessita passar per `map()` abans de sortir.
**En comparar amb el sketch, mireu:** ① quina de les dues lectures imprimiu amb `print()` (sense salt de línia) i quina amb `println()`? ② els cinc paràmetres del `map()` són en l'ordre (valor, mínim d'entrada, màxim d'entrada, mínim de sortida, màxim de sortida), o n'heu invertit algun? ③ la variable que guarda el resultat del `map()` és un `int`, com espera `analogWrite`?

## Kata · `03_ultrasons_funcio` (Sessió 3, modelatge)

**Projecta (enunciat):**
> Tens ja declarades les constants `TRIG` (pin 12) i `ECHO` (pin 11), configurades a `setup()` com a sortida i entrada respectivament. Escriu de zero la funció `float mesuraDistancia()`: dispara el pols del sensor pel TRIG (deixa'l LOW un instant i puja'l a HIGH exactament 10 µs abans de tornar-lo a baixar), cronometra l'eco amb `pulseIn(ECHO, HIGH, 30000)` i retorna la distància en cm (velocitat del so ≈0,034 cm/µs, tenint en compte que el temps mesurat és d'anada **i** tornada), tractant especialment el cas que no torni cap eco: en lloc de dir "0 cm", la funció ha de retornar 400.

**Practica:** funció amb tipus de retorn `float` (no `void`) · `delayMicroseconds` vs. `delay` · `pulseIn` amb *timeout* · dos punts de sortida (`return`) dins la mateixa funció.
**Pista (per a qui es bloqueja):** la funció té dues fases clarament separades: primer el protocol de disparament del TRIG (tres canvis de pin seguits), després el cronometratge de l'ECHO i la decisió de què retornar — compte, aquí hi ha **dos** `return`, no un.
**En comparar amb el sketch, mireu:** ① abans de pujar el TRIG a HIGH, el deixeu LOW un moment breu (2 µs) per garantir un flanc net, o pugeu directament? ② el `return` del cas "sense eco" és una instrucció independent que talla la funció abans de calcular `dist`, o l'heu ficat dins d'un `else`? ③ en la fórmula final, dividiu per 2 el resultat de multiplicar el temps pel factor 0,034, o ho feu en un altre ordre?

## Kata · `04_alarma_aparcament` (Sessió 3, producte)

**Projecta (enunciat):**
> Tens ja `mesuraDistancia()` (idèntica a la pràctica 3) i les constants `LLUNY = 30` i `PROP = 10` (cm), `LED` (pin 8) i `PIEZO` (pin 6). Escriu de zero el `loop()` que decideixi per trams: si la distància és més gran que `LLUNY`, tot apagat i en silenci; si és més gran que `PROP` (zona intermèdia), fes bips espaiats amb un interval proporcional a la distància (600 ms a 30 cm, fins a 100 ms a 10 cm) fent parpellejar el LED al mateix ritme i un `tone(PIEZO, 1500, 60)` a cada bip; en cas contrari (a 10 cm o menys), LED fix i un `tone(PIEZO, 2500)` continu.

**Practica:** `if` / `else if` / `else` de tres trams · `map()` amb el rang de sortida invertit (a més distància, més interval) · `tone()` amb durada vs. sense durada · `noTone()`.
**Pista (per a qui es bloqueja):** pensa-ho com tres blocs independents, un per tram; només el del mig necessita calcular alguna cosa (l'interval) abans d'actuar.
**En comparar amb el sketch, mireu:** ① el tram "lluny" crida `noTone(PIEZO)` explícitament, o assumiu que el piezo ja estarà callat? ② en el `map()` del tram intermedi, quin dels dos llindars (`PROP` o `LLUNY`) hi poseu com a valor mínim de l'escala d'entrada? ③ heu afegit un `delay(20)` final comú a totes les branques (fora de l'`if`/`else if`/`else`), o el delay només apareix dins la branca intermèdia?
