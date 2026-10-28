# SA6 · Katas de programació (10 minuts)

> **Per a qui és?** Per al **docent** (que el projecta) **i per a l'alumnat**: si ningú no el projecta, obre'l tu mateix ABANS de mirar el codi de la pràctica. Un **kata d'escriptura** per a cada pràctica de la SA: després del modelatge i **abans d'obrir el sketch donat**, projecta l'enunciat i l'alumnat escriu **el bloc central de zero**, individualment i **amb apunts permesos** (paper o editor). Passats 10', obren el sketch de la pràctica i **comparen** amb el que han escrit (2'). **No es recull ni es qualifica.**
>
> No és el [mini-check](../00_General/00_Mini_checks_individuals.md) (allò és de memòria, sense apunts, 1 per SA) ni un [repte](../../Reptes/Reptes_SA6.md) (allò és ampliació ⭐): és entrenament d'escriptura, cada sessió de codi. El dia del **mini-check** de la SA, el mini-check el substitueix (ho marca el kata afectat amb 🔁).
>
> **En aquesta SA el kata és una *variació*:** els valors de l'enunciat són diferents dels del sketch expressament — en comparar, mira l'estructura, no els números.

## Kata · `01_llac_obert_vs_tancat` (Sessió 1)

**Projecta (enunciat):**
> Tens ja l'objecte `base`, les constants `PIN_COLLISIO` (2) i `PAS_HOMING` (40 ms) *(valor diferent del sketch, expressament)*, i les variables `angle = 90` i `acabat = false`. Escriu de zero el bloc del **homing** (llaç tancat) que va dins del `loop()`: si encara no ha acabat, mira el sensor; si toca (`LOW`), escriu per Serial l'angle on ha tocat i marca `acabat`; si no toca i l'angle ja és 0, avisa que no l'ha trobat i marca `acabat`; si no, baixa un grau, escriu-lo al servo i espera `PAS_HOMING`.

**Practica:** llaç tancat (llegir el sensor a cada pas) · `if`/`else if`/`else` amb una guarda · `digitalRead` amb `INPUT_PULLUP` (`LOW` = toca).
**Pista (per a qui es bloqueja):** tres preguntes en ordre: *ja toca?* → *ja no puc baixar més?* → *si no, un pas més*.
**En comparar amb el sketch, mireu:** ① la comprovació del sensor va **abans** de moure el servo, o mou i després pregunta? ② heu inclòs la **guarda** de l'angle 0 (sense ella, si el sensor falla, el braç empeny per sempre)? ③ el sensor es compara amb `LOW` (tocat) o amb `HIGH`?

## Kata · `02_pinca_histeresi` (Sessió 2)

**Projecta (enunciat):**
> Tens ja `mesuraDistancia()`, l'objecte `pinca`, les constants `TANCA_CM = 5` i `OBRE_CM = 12` *(valors diferents del sketch, expressament)*, `PINCA_TANCADA`, `PINCA_OBERTA` i la variable `bool pincaTancada = false`. Escriu de zero el `loop()`: mesura la distància; si la pinça és oberta i la distància baixa de `TANCA_CM`, tanca-la i actualitza l'estat; si és tancada i la distància supera `OBRE_CM`, obre-la i actualitza l'estat. Pausa de 60 ms.

**Practica:** condició amb dos requisits combinats (`&&`) · memòria d'estat amb un `bool` · `if` / `else if` sense `else` final.
**Pista (per a qui es bloqueja):** pensa en dos moments diferents, no en un únic número: quin és el moment de tancar i quin el d'obrir; si no és cap dels dos, no toquis res.
**En comparar amb el sketch, mireu:** ① cada condició mira **la distància i l'estat** (`!pincaTancada && d < TANCA_CM`), o només la distància (i torna el clic-clic)? ② heu fet servir `if` / `else if` excloent, o dos `if` independents que es podrien complir tots dos a la mateixa volta? ③ heu posat un `else` final que obre o tanca? (no ha d'existir: entre llindars, no es fa res)

## Kata · `04_control_proporcional` (Sessions 2-3, repte +)

> 🔁 **Si el fas a la S3, hi ha mini-check** i el mini-check substitueix el kata a l'aula (i, aquell dia, el kata de la sessió és el de la màquina d'estats). Aquest és un kata de **+ampliació**: fes-lo a la S2 si ja tens la pinça enllestida, o pel teu compte com a repàs.

**Projecta (enunciat):**
> Tens ja l'objecte `base` connectat, `const float K = 0.05` i `float angle = 90` *(valor diferent del sketch, expressament)*. Escriu de zero el `loop()`: llegeix la consigna del potenciòmetre A0 convertida a graus (0-180), calcula l'`error`, acosta `angle` a la consigna una fracció `K` de l'error, escriu-lo al servo arrodonit i mostra consigna i angle al Serial Plotter. Pausa de 20 ms.

**Practica:** `map()` · `error = consigna - angle` · acumular en un `float` · arrodonir en convertir a `int`.
**Pista (per a qui es bloqueja):** tres magnituds encadenades: on vull anar, quant em falta, i quin tros d'això faig ara.
**En comparar amb el sketch, mireu:** ① `angle` és `float`? (amb `int`, els passos petits s'arrodoneixen a 0 i el braç s'encalla) ② l'error és `consigna - angle` (i no al revés, que l'allunyaria)? ③ el valor que s'escriu al servo s'arrodoneix (`+ 0.5`) o es trunca?

## Kata · `03_maquina_estats` (Sessió 3, modelatge)

> 🔁 **Aquest dia hi ha mini-check** (inici de la S3): el mini-check **substitueix el kata** a l'aula — no es fan tots dos, són el mateix múscul (escriptura individual de 10'). Aquest kata queda com a **repàs per fer pel teu compte abans de la prova T2**: la màquina d'estats és el patró més nou de la SA i el que menys has escrit a mà.

**Projecta (enunciat):**
> Tens ja l'`enum Estat { REPOS, MANUAL, EMERGENCIA }`, la variable `estat = REPOS`, la funció `canviaEstat(Estat nou)`, la funció `segueixPots()` i, al principi del `loop()`, les variables `xoc`, `a` i `b` ja llegides. Escriu de zero la resta del `loop()`: la **prioritat de l'emergència** (si hi ha xoc i no hi som, cap a EMERGENCIA) i un `switch(estat)` amb tres `case`: a REPOS, si `a` → MANUAL; a MANUAL, `segueixPots()` i si `a` → REPOS; a EMERGENCIA, si **no** hi ha xoc **i** `a` → REPOS.

**Practica:** `switch`/`case` amb un `case` per estat · `canviaEstat()` per centralitzar el canvi · prioritat d'una condició de seguretat · condició composta amb `&&` i `!`.
**Pista (per a qui es bloqueja):** cada `case` respon dues preguntes: què fa el braç aquí i quan en surt. L'emergència no és un `case` més: va abans del `switch`.
