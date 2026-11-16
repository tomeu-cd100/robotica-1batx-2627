# Prova SA2-SA3 · Guia de correcció (docent)

**Durada:** 60 min · **Individual**, en paper, amb el quadern de treball · **Models:** A i B (mateixa estructura, dades diferents) · **Dificultat:** mitjana (sense càlculs; les preguntes de codi porten esquelet o pista)

> Enunciat per imprimir: [`Prova_SA2_SA3.md`](Prova_SA2_SA3.md). **Solucions explicades dels dos models:** [`Prova_SA2_SA3_correccio_comentada.md`](Prova_SA2_SA3_correccio_comentada.md), que és el full que es lliura a l'alumnat **en retornar la prova** (no abans).

---

## Per què aquesta prova

La Prova SA1 certificava conceptes de base i la lectura del `Blink`. La **Prova pràctica T1** comprova que l'alumnat sap **muntar i programar**. Aquesta prova mira si cada alumne/a **entén** el que ha fet a la SA2 i la SA3: per què el LED porta resistència, què fa el PWM, què passa quan falta un `break` o per què «s'acaba de prémer» no és el mateix que «està premut».

**Sense càlculs.** A l'aula no s'han fet càlculs de resistències ni de mesures, i per això la prova no en demana. Tot és reconèixer, llegir, predir, depurar i completar.

Té **14 preguntes en 3 blocs**, en l'ordre «entendre → llegir → fer»: circuits, lectura i predicció de codi, i depuració i creació. Les dues preguntes de crear (P13 i P14) porten **esquelet**, i la detecció de canvis ja els la donem feta. Algunes preguntes porten una trampa coneguda, com el límit `<` vs `<=`, el `break` que falta o el `=` que assigna. La correcció comentada les explica.

## Logística

- **Impressió:** obre la pàgina de la prova a la web (vista docent) i imprimeix-la amb el navegador (Ctrl+P, A4). El model B comença sempre en **pàgina nova**. Comprova el rang de pàgines a la previsualització i imprimeix la meitat de còpies de cada model.
- **Models A/B:** reparteix-los **alternats per taules**.
- **Quadern de treball, sí; ordinador i mòbil, no.** El quadern serveix per consultar, però no resol la prova: gairebé totes les preguntes demanen aplicar (predir, depurar, completar codi).
- **Temps:** 60'. Avisa als 12' («hauríeu de ser al Bloc 2») i als 37' («Bloc 3»).
- **Retorn:** lliura la prova corregida **amb la correcció comentada** i deixa 20-30' de classe perquè cadascú la treballi i escrigui el pla de millora.

## Avaluació

| Bloc | Què evidencia | Criteri | Rúbrica |
|---|---|---|---|
| **1 · Circuits** (2,5 p) | Resistència i polaritat del LED, circuit tancat, *pull-up*, PWM | **CA2.1**, **CA2.2** | R2 (orientativa) |
| **2 · Llegeix i prediu** (4 p) | Traçar codi: `switch`, `for`, RGB, llindars, polsador, pantalla | **CA1.1** | R1 (orientativa) |
| **3 · Depura i crea** (3,5 p) | Depurar errors, explicar avaries, completar una funció i un programa | **CA1.1**, **CA2.2** | R1 (orientativa) |

**Orientació de nota:** el Bloc 1 i les P5-P8 ben fets donen ≈ 5. Amb les P9-P11 s'arriba a ≈ 7. La P12-P14 sense errors porta al 9-10.

**Recuperació:** l'alumnat que no arribi a 5 la repeteix amb **l'altre model** (A ↔ B). Abans de la recuperació, la versió de l'altre model s'ha de fer **sense** la correcció comentada al davant, perquè la correcció explica tots dos models.

**Pla de millora:** com a les altres proves, cadascú escriu al quadern les 3 línies (què m'ha fallat · què practicaré · com ho comprovaré). La correcció comentada acaba amb la taula que els orienta.

---

## Graella de correcció (10 punts)

| Pregunta | Punts | Com es puntua |
|---|---|---|
| **P1** · LED i resistència | 0,5 | a) 0,25 · b) 0,25: 0,1 el nom (ànode/càtode o +/−) + 0,15 cap a on va. |
| **P2** · Errors del muntatge | 0,75 | 0,25 per error: 0,15 identificar-lo + 0,1 el símptoma. Un «error» inventat no resta. |
| **P3** · V/F *pull-up* | 0,5 | 0,125 per afirmació. Les falses sense correcció compten la meitat. |
| **P4** · PWM | 0,75 | a) 0,1 per casella. S'accepta «molt fluix» per a 30 i «fort» o «molta» per a 191. · b) 0,2 · c) 0,15. |
| **P5** · `switch` | 0,75 | a) 0,15 per casella · b) 0,3: 0,15 el `break` + 0,15 què provoca (s'executa també el `case` següent). |
| **P6** · `for` | 0,75 | 0,25 per apartat. A la b), 0,125 per valor. A la c), s'accepta canviar el `delay` o el salt. |
| **P7** · RGB | 0,5 | 0,1 per lletra + 0,1 la crida de l'e). |
| **P8** · Traça | 0,75 | ≈0,19 per columna (estat del LED i text del Monitor). La columna del límit (400 / 250) és la que separa el notable. |
| **P9** · Polsador | 0,5 | a) 0,25 · b) 0,25 (0,1 el què + 0,15 el perquè). |
| **P10** · Pantalla | 0,75 | a) 0,5: A, 0,125 per element; B, 0,1 per element (es tolera ±4 punts) · b) 0,25. |
| **P11** · Depura | 1 | 0,25 per error: 0,15 trobar-lo (línia + què falla) + 0,1 corregir-lo. Al B, la línia que falta val igual si diu «entre 13 i 15». |
| **P12** · Explica | 0,5 | a) 0,25 (test) · b) 0,25. |
| **P13** · Funció | 0,75 | a) 0,1 per buit · b) 0,25: 0,15 la crida amb la lectura + 0,1 guardar-ho a `nivell`. |
| **P14** · Crea | 1,25 | TODO (1) 0,5: A, sumar 1 i tornar a 0 després del 2; B, `if` amb `esFosc && !eraFosc` i el `tone`. · TODO (2) 0,6: els colors segons el mode o segons si és fosc. · Sintaxi 0,15. |

## Solucions ràpides (per corregir de pressa)

| | A | B |
|---|---|---|
| **P1** | b · ànode (+), cap al pin | b · càtode (−), cap a GND |
| **P2** | vermell a 5V · groc invertit · verd sense R | vermell invertit · groc sense R · verd sense GND |
| **P3** | V · F · V · F | F · V · V · F |
| **P4** | apagat · màxim · a mitges · fluix · pins `~` · massa ràpid per a l'ull | màxim · apagat · fluix · fort · pin 7 sense `~` → s'encén del tot · 0-255 |
| **P5** | verd · verd · blau · falta `break` al `case 0` | vermell · blau · blau · falta `break` al `case 1` |
| **P6** | s'encén · 0 i 255 · `delay` més gran | s'apaga · 255 i 0 · `delay` més petit |
| **P7** | E B A F · `color(0, 255, 0)` | E C F B · `color(255, 255, 255)` |
| **P8** | encès/Fosc · apagat/Llum · encès/Fosc · **apagat/Llum** | apagat/Llum · encès/Fosc · **apagat/Llum** · encès/Fosc |
| **P9** | 1, 2, 3 · una sola (compta el canvi) | 1, 2 · evita els rebots |
| **P10** | dibuix · pantalla negra | dibuix · esborra el dibuix anterior |
| **P11** | L2 pin 9 · `Serial.begin` · L10 `;` · L12 `<` | L6 `INPUT_PULLUP` · L12 `LOW` · falta `anterior = ara;` · L15 `;` |
| **P12** | b · blau només 0/255 o un altre pin | b · directe al pin amb `tone()` |
| **P13** | 300 · `return` · 700 · 1 · 2 · `int nivell = nivellLlum(analogRead(A1));` | 200 · `return` · 600 · 1 · 2 · `int nivell = nivellSoroll(analogRead(A0));` |

El codi de la P14 és a la [correcció comentada](Prova_SA2_SA3_correccio_comentada.md).
