# SA8 · Katas de programació (10 minuts)

> **Per a qui és?** Per al **docent** (que el projecta) **i per a l'alumnat**: si ningú no el projecta, obre'l tu mateix ABANS de mirar el codi de la pràctica. Un **kata d'escriptura** per a cada pràctica de la SA: **abans que el docent modeli el bloc**, projecta l'enunciat i l'alumnat escriu **el bloc central de zero**, individualment i **amb la xuleta i els apunts permesos** (paper o editor) — encara no ha vist el sketch ni el modelatge d'avui. Passats 10', el docent fa el modelatge i **després** s'obre el sketch de la pràctica per **comparar**-hi (2'). **No es recull ni es qualifica.**
>
> No és el [mini-check](../00_General/00_Mini_checks_individuals.md) (allò és de memòria, sense apunts, 1 per SA) ni un [repte](../../Reptes/Reptes_SA8.md) (allò és ampliació ⭐): és entrenament d'escriptura, cada sessió de codi.
>
> **En aquesta SA el kata va *abans* del modelatge:** primer escriu amb la xuleta i els apunts; el modelatge del docent tanca després.

## Kata · `01_telemetria_emissor` (Sessió 1, abans del modelatge)

**Projecta (enunciat):**
> Tens ja fets, abans del bucle, `radio.on()` i `radio.config(group=10)`. Escriu de zero el `while True:` complet: mesura la temperatura amb `temperature()` i la llum amb `display.read_light_level()`, envia totes dues per ràdio, cadascuna amb la seva etiqueta (`T:` per a la temperatura, `L:` per a la llum) separades per `;` dins d'un mateix enviament, i mostra `Image.ARROW_N` com a indicador d'enviament; el ritme ha de ser d'una mesura cada 2000 ms.

**Practica:** concatenació de text amb `str()` · missatges etiquetats separats per `;` · `radio.send()` · `sleep()` com a ritme del bucle.
**Pista (per a qui es bloqueja):** primer guarda cada mesura en una variable pròpia (com fas amb dos sensors); després decideix com ajuntar-les en un únic enviament amb les etiquetes correctes.
**En comparar amb el sketch, mireu:** ① cada valor numèric passa per `str(...)` abans de concatenar-se, o l'heu enviat directament (error de tipus)? ② l'etiqueta de cada magnitud (`"T:"`, `"L:"`) és literal dins la mateixa cadena que passeu a `radio.send()`, o l'heu construït en una variable a part abans d'enviar-la? ③ el `sleep(2000)` és l'última instrucció del bucle, després de mostrar la fletxa, o l'heu posat en un altre punt (p. ex. abans d'enviar la dada)?

## Kata · `02_telemetria_receptor` (Sessió 1, abans del modelatge)

**Projecta (enunciat):**
> Tens ja fets, abans del bucle, `radio.on()`, `radio.config(group=10)` i la constant `LLINDAR_TEMP = 28`. Tens també ja muntat aquest esquelet per al `while True:`, amb la recepció i el control d'errors ja escrits (el `try`/`except` no s'ha vist encara: se't dona fet — si el missatge no té el format esperat, l'`except` mostra `Image.CONFUSED`):
> ```python
> missatge = radio.receive()
> if missatge is not None:
>     print(missatge)
>     try:
>         ...
>     except:
>         display.show(Image.CONFUSED)
> sleep(50)
> ```
> Omple només allà on hi ha els `...`: separa el missatge (rebut com `"T:23;L:120"`) pel `;` i pel `:` per extreure la temperatura com a número enter, i mostra `Image.NO` si supera `LLINDAR_TEMP` o `Image.YES` si no.

**Practica:** `split(";")` i `split(":")` encadenats per desfer l'etiquetatge de l'emissora · `int(...)` per desfer l'`str()` de l'emissora · decidir entre dues imatges comparant amb un llindar.
**Pista (per a qui es bloqueja):** dins del `try` només calen tres passos: separa el missatge (dos `split` encadenats), converteix la part de la temperatura a `int`, i compara amb `LLINDAR_TEMP` per triar la imatge.
**En comparar amb el sketch, mireu:** ① heu fet primer `missatge.split(";")` i després `[0].split(":")` sobre la primera part, o heu invertit l'ordre dels dos separadors? ② heu convertit el resultat a `int(...)` abans de comparar-lo amb `LLINDAR_TEMP`, o heu comparat directament el text (número i cadena no es comparen igual)? ③ la decisió `Image.NO`/`Image.YES` és dins del mateix bloc `try` que heu omplert, o l'heu tret fora (trencant l'esquelet donat)?

## Kata · `03_ia_gestos` (Sessió 3, abans del modelatge)

**Projecta (enunciat):**
> Escriu de zero la capçalera de la funció `classifica(x, y, z)` i **només** les seves 4 primeres regles: si `accelerometer.was_gesture("shake")` és cert, retorna `"SACSEIG"`; si no, i `z < -700`, retorna `"PLA (cara amunt)"`; si no, i `z > 700`, retorna `"CAP PER AVALL"`; si no, i `y > 600`, retorna `"INCLINAT ENDAVANT"`; i acaba amb el cas per defecte, `"DRET"`, per a quan cap de les regles anteriors no s'ha complert. El sketch complet en té 3 regles més (inclinada enrere i als dos costats, amb `y` i `x` negatius/positius) que trobaràs en comparar.

**Practica:** funció que **retorna** un text de classe en lloc d'executar accions · `if` que acaben en `return` (el `return` talla la funció allà mateix) · ordre de les regles com a decisió de disseny · cas per defecte al final.
**Pista (per a qui es bloqueja):** cada regla és una línia sola: «si passa X, `return` la classe corresponent»; el truc és decidir en quin ordre les poses, perquè només guanya la primera que es dispara.
**En comparar amb el sketch, mireu:** ① la comprovació del `shake` fa servir el seu propi `if` amb `return` immediat, o n'heu guardat el resultat en una variable booleana per decidir-ho més tard? ② cada regla posterior és un `if` independent, o les heu encadenat totes amb `elif`? ③ el cas per defecte `"DRET"` és un `return` solt al final, sense cap condició davant, o l'heu ficat dins d'un `else` addicional? (Les 3 regles que no heu escrit segueixen exactament el mateix patró que les 4 primeres — no calen comprovar aquí.)

## Kata · `04_esp32_telemetria` (Sessió 2, demo opcional)

**Projecta (enunciat):**
> Tens ja declarades `const char* SSID` i `const char* CLAU`, i la constant `SENSOR = 34`. Escriu de zero el `setup()`: inicia el port sèrie a `115200`, demana la connexió amb `WiFi.begin(SSID, CLAU)`, imprimeix el missatge `"Connectant al WiFi"` i queda't esperant-la mentre encara no hi és, informant-ne cada 500 ms amb un punt; un cop connectat, imprimeix `"Connectat! IP: "` seguit de la IP obtinguda amb `WiFi.localIP().toString()`.

**Practica:** `while` com a espera bloquejant d'un esdeveniment extern (la connexió) · `WiFi.status()` comparat amb `WL_CONNECTED` · `delay()` dins del `while` per no saturar el sèrie · concatenació de text amb `+` en C++ (`String`).
**Pista (per a qui es bloqueja):** el `setup()` té dues fases seguides: primer demanar la connexió i anunciar-ho per pantalla (una línia cadascuna), després un bucle que es repeteix mentre encara no hi ha connexió.
**En comparar amb el sketch, mireu:** ① la condició del `while` és `WiFi.status() != WL_CONNECTED` (seguiu esperant mentre NO estigui connectat), o l'heu escrit amb `==` (que sortiria del bucle sense esperar mai)? ② dins del bucle d'espera, quin va primer, el `delay(500)` o el `Serial.print(".")`? ③ el missatge final comença amb un salt de línia (`"\nConnectat!..."`) per separar-lo visualment dels punts anteriors, o l'heu enganxat tot seguit sense salt?
