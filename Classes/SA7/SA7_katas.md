# SA7 · Katas de programació (10 minuts)

> **Per a qui és?** Per al **docent** (que el projecta) **i per a l'alumnat**: si ningú no el projecta, obre'l tu mateix ABANS de mirar el codi de la pràctica. Un **kata d'escriptura** per a cada pràctica de la SA: després del modelatge i **abans d'obrir el sketch donat**, projecta l'enunciat i l'alumnat escriu **el bloc central de zero**, individualment i **amb apunts permesos** (paper o editor). Passats 10', obren el sketch de la pràctica i **comparen** amb el que han escrit (2'). **No es recull ni es qualifica.**
>
> No és el [mini-check](../00_General/00_Mini_checks_individuals.md) (allò és de memòria, sense apunts, 1 per SA) ni un [repte](../../Reptes/Reptes_SA7.md) (allò és ampliació ⭐): és entrenament d'escriptura, cada sessió de codi.

## Kata · `01_moviment_basic` (Sessió 1, modelatge)

**Projecta (enunciat):**
> Tens ja declarades les constants `ESQ_DIR` (pin 4), `ESQ_VEL` (pin 5), `DRET_DIR` (pin 7), `DRET_VEL` (pin 6) i `VEL = 180`, i la funció `motors(dirEsq, velEsq, dirDret, velDret)` ja escrita (fa `digitalWrite`/`analogWrite` als quatre pins). Escriu de zero cinc funcions de moviment: `endavant()` (les dues rodes en el mateix sentit), `enrere()` (les dues rodes en el sentit contrari) i `gira_dreta()`/`gira_esquerra()` (una roda en cada sentit) — cridant `motors()` amb la combinació que correspongui — i `atura()`, que fa que els motors deixin de girar.

**Practica:** definir funcions `void` sense paràmetres · cridar una funció amb quatre arguments · cinemàtica diferencial (mateix sentit = recte, sentit oposat = gir).
**Pista (per a qui es bloqueja):** pensa primer, per a cada moviment, si les dues rodes han d'anar en el **mateix** sentit o en sentits **contraris**, i quins quatre valors li passaries a `motors()` en cada cas; pensa a part què han de fer les dues rodes per aturar-se.
**En comparar amb el sketch, mireu:** ① `atura()` crida `motors()` passant les velocitats a 0, o fa un `analogWrite` directe a `ESQ_VEL` i `DRET_VEL` sense passar per `motors()`? ② `gira_dreta()` i `gira_esquerra()` fan servir la mateixa `VEL` que `endavant()`/`enrere()`, o n'heu reduït el valor per girar? ③ a `gira_dreta()`, la roda **esquerra** és la que va `HIGH` i la **dreta** la que va `LOW` — ho teniu així o al revés?

## Kata · `02_trajectoria_quadrat` (Sessió 2, modelatge)

**Projecta (enunciat):**
> Tens ja escrites les funcions `endavant()`, `gira_dreta()` i `atura()` (control diferencial ja fet) i les constants `T_RECTE = 1200` i `T_GIR_90 = 600` (ms). Escriu de zero el codi que fa recórrer un quadrat: repeteix 4 vegades «avança un costat i gira 90°», de manera que el robot dibuixi les quatre cantonades, i en acabar les 4 repeticions atura el robot. Decideix tu on ha d'anar aquest codi (`setup()` o `loop()`) perquè el quadrat es faci **una sola vegada** i el robot no en faci més.

**Practica:** bucle de repetició amb un nombre fix de voltes (`for`, SA2) · decidir en quina funció (`setup()` o `loop()`) viu un codi que s'ha d'executar un sol cop.
**Pista (per a qui es bloqueja):** pensa-ho com un patró que es repeteix exactament 4 vegades: quin bucle de la SA2 serveix per repetir un nombre fix de voltes? I un cop tinguis el patró escrit, pregunta't: si aquest codi visqués al `loop()`, què passaria en acabar la quarta volta?
**En comparar amb el sketch, mireu:** ① el patró es repeteix amb un `for` (variable de comptatge de 0 a 3), o l'heu escrit quatre vegades seguides sense bucle? ② el codi del quadrat és dins `setup()` (s'executa un cop) o dins `loop()` (es repetiria sense parar)? ③ entre cada `endavant()` i el `gira_dreta()` que el segueix (i després del gir), hi ha un `atura(); delay(300);`, o heu encadenat els moviments sense aquesta pausa?

## Kata · `03_evita_obstacles` (Sessió 3, modelatge)

**Projecta (enunciat):**
> Tens ja escrites les funcions `endavant()`, `enrere()`, `gira_dreta()`, `atura()` i la funció `float distancia()` (retorna la distància en cm mesurada amb l'ultrasons, o 400 si no hi ha eco), més la constant `DIST_MIN = 15` (cm). Escriu de zero el `loop()` complet: cada volta, mesura la distància; si és inferior a `DIST_MIN`, fes una maniobra d'evasió que faci recular el robot 400 ms i després girar a la dreta 450 ms per buscar via lliure, deixant una pausa de 150 ms entre moviments perquè el robot s'aturi del tot abans de canviar de sentit; si no, continua endavant. Acaba el `loop()` amb una pausa curta de 30 ms.

**Practica:** cicle percepció → decisió → acció · `if`/`else` amb una única condició · seqüència de moviments amb pauses intercalades dins d'una branca.
**Pista (per a qui es bloqueja):** pensa-ho en tres passos ordenats: primer percep, després decideix amb un `if`, i només dins la branca «a prop» hi ha una seqüència més llarga de passos amb pauses intercalades.
**En comparar amb el sketch, mireu:** ① la distància es llegeix amb una sola crida a `distancia()` per volta i es reutilitza, o l'heu cridada més d'una vegada dins del mateix cicle? ② dins la maniobra d'evasió, quants `atura();` hi ha intercalats entre `enrere()` i `gira_dreta()` — un abans i un després de cada moviment, o només al principi i al final del bloc? ③ la branca «via lliure» porta algun `delay` propi, o només crida `endavant()` i deixa que el `delay(30)` final (comú a totes dues branques) marqui el ritme del cicle?

## Kata · `04_seguidor_linia` (Sessió 4, modelatge i repte de pista)

**Projecta (enunciat):**
> Tens ja escrites les funcions `endavant()`, `corregeix_esq()` i `corregeix_dreta()` (control diferencial ja fet) i les constants `S_ESQ` (pin 2) i `S_DRET` (pin 3) — sensors IR que donen `LOW` quan veuen la línia negra i `HIGH` quan veuen el fons. Escriu de zero el `loop()` complet: segons el que llegeixin els dos sensors, decideix: si tots dos veuen la línia, `endavant()`; si només la veu l'esquerre, corregeix cap a l'esquerra; si només el dret, corregeix cap a la dreta; si cap dels dos, continua `endavant()`. Acaba amb una pausa de 10 ms.

**Practica:** `digitalRead` traduït a `bool` amb una comparació · cadena `if`/`else if`/`else` de quatre combinacions · variables booleanes amb nom descriptiu.
**Pista (per a qui es bloqueja):** pensa-ho com traduir cada sensor a una pregunta de sí/no, i després recórrer totes les combinacions possibles de dues respostes sí/no: quantes n'hi ha, i què ha de fer el robot a cadascuna?
**En comparar amb el sketch, mireu:** ① les dues lectures es guarden en variables `bool` abans de decidir, o criden `digitalRead()` directament dins de cada condició? ② heu encadenat els quatre casos amb un sol `if`/`else if`/…/`else`, o heu escrit quatre `if` independents (que podrien avaluar-se tots dins la mateixa volta)? ③ `liniaEsq` i `liniaDret` es declaren dins del `loop()` (es recalculen cada volta), o les heu declarat com a variables globals fora del `loop()`?
