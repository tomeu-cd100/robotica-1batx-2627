# Prova SA2-SA3 · Guia de correcció (docent)

**Durada:** 60 min · **Individual**, en paper, amb el quadern de treball i calculadora · **Models:** A i B (mateixa estructura, dades diferents) · **Dificultat:** alta, amb preguntes de transferència i trampes conegudes

> Enunciat per imprimir: [`Prova_SA2_SA3.md`](Prova_SA2_SA3.md). **Solucions explicades dels dos models:** [`Prova_SA2_SA3_correccio_comentada.md`](Prova_SA2_SA3_correccio_comentada.md), que és el full que es lliura a l'alumnat **en retornar la prova** (no abans).

---

## Per què aquesta prova

La Prova SA1 certificava conceptes de base i la lectura del `Blink`. La **Prova pràctica T1** comprova que l'alumnat sap **muntar i programar** amb el quadern al davant. Aquesta prova cobreix el que no mira cap de les dues: si cada alumne/a **entén per dins** el que ha fet a la SA2 i la SA3. Per exemple, per què una resistència fa 220 Ω, què mesura el multímetre en un pin PWM, què passa quan falta un `break` o per què «s'acaba de prémer» no és el mateix que «està premut».

Té la mateixa estructura que la SA1, però amb més nivell. Hi ha **15 preguntes en 3 blocs** que segueixen l'ordre «entendre → llegir → fer»: circuits i mesures, lectura i predicció de codi, i depuració i creació. Moltes preguntes porten una **trampa coneguda**, com el límit `<` vs `<=`, el `map` que talla decimals, el `for` que no arriba a 0, el `=` que assigna o la premuda llarga que compta una vegada. Són els errors reals de l'aula, i la correcció comentada els explica un per un.

## Logística

- **Impressió:** obre la pàgina de la prova a la web (vista docent) i imprimeix-la amb el navegador (Ctrl+P, A4). El model B comença sempre en **pàgina nova**. Comprova el rang de pàgines a la previsualització i imprimeix la meitat de còpies de cada model.
- **Models A/B:** reparteix-los **alternats per taules**.
- **Quadern de treball i calculadora, sí; ordinador i mòbil, no.** El quadern serveix per consultar, però no resol res: la prova demana **aplicar** (calcular, traçar, depurar, crear), i qui no ho entén no té temps de buscar-ho tot. Amb calculadora, el temps es gasta pensant i no multiplicant.
- **Temps:** 60' justos per a una prova de nivell alt. Avisa als 15' («hauríeu de ser al Bloc 2») i als 40' («Bloc 3»).
- **Retorn:** lliura la prova corregida **amb la correcció comentada** i deixa 20-30' de classe perquè cadascú la treballi i escrigui el pla de millora. Si es dona la correcció sense temps per fer-la servir, l'alumnat no l'aprofita.

## Avaluació

| Bloc | Què evidencia | Criteri | Rúbrica |
|---|---|---|---|
| **1 · Circuits i mesures** (3 p) | Llei d'Ohm, circuit tancat i polaritat, divisor de tensió, *pull-up*, PWM i multímetre | **CA2.1**, **CA2.2** | R2 (orientativa) |
| **2 · Llegeix i prediu** (4 p) | Traçar codi: `switch`, `for`, `map`, llindars, detecció de flanc, pantalla | **CA1.1** | R1 (orientativa) |
| **3 · Depura i crea** (3 p) | Depurar errors de sintaxi, lògica i maquinari; explicar avaries; escriure funcions i programes | **CA1.1**, **CA2.2** | R1 (orientativa) |

**Orientació de nota:** el Bloc 1 i les P6-P9 ben fets donen ≈ 5 (entén el circuit i sap llegir codi senzill). Amb les P10, P11, P12 i P14 s'arriba a ≈ 7-8. La P13 i la P15 sense errors porten al 9-10: és on es veu si s'entén la **detecció de canvis**.

**Recuperació:** l'alumnat que no arribi a 5 la repeteix amb **l'altre model** (A ↔ B). Com que la correcció comentada explica tots dos models, abans de la recuperació la versió de l'altre model s'ha de fer **sense** la correcció al davant.

**Pla de millora:** com a les altres proves, cadascú escriu al quadern les 3 línies (què m'ha fallat · què practicaré · com ho comprovaré). La correcció comentada acaba amb la taula que els orienta.

---

## Graella de correcció (10 punts)

| Pregunta | Punts | Com es puntua |
|---|---|---|
| **P1** · Resistència | 0,5 | a) 0,25: 0,15 la fórmula amb la **resta** (5 − V_LED) + 0,1 el resultat. Si posa 5 / I sense restar, 0. · b) 0,25: 0,1 la tria (220 Ω) + 0,15 per què no les altres (una massa corrent, l'altra massa poca llum). |
| **P2** · Errors del muntatge | 0,75 | 0,25 per error: 0,15 identificar-lo + 0,1 el símptoma. Un «error» inventat no resta. |
| **P3** · Divisor | 0,75 | 0,25 per fila (0,15 la tensió + 0,1 la lectura; s'accepten ±3 unitats). · c) 0,25: A, «baixa» + `<`; B, `<` + llindar entre 102 i 409 justificat. |
| **P4** · V/F *pull-up* | 0,5 | 0,125 per afirmació. Les falses sense correcció compten la meitat. |
| **P5** · PWM | 0,5 | a) 0,2 (0,1 el càlcul + 0,1 el %) · b) 0,15 · c) 0,15. Si a l'a) divideix per 1023, màxim 0,1. |
| **P6** · `switch` | 0,75 | a) 0,15 per casella · b) 0,3: 0,15 el perquè (no hi ha `break`, s'executa el `case` següent) + 0,15 on va el `break`. |
| **P7** · `for` | 0,75 | 0,25 per apartat. Al B, l'apartat c) només val si diu que **no s'apaga del tot**. Si ha comptat 51 o 16 (s'ha deixat el primer valor) i la resta és coherent, 0,1 a l'a) i el b) sencer. |
| **P8** · RGB | 0,5 | 0,1 per lletra + 0,1 l'apartat e). |
| **P9** · Traça | 0,75 | 8 caselles × ≈0,09. S'accepta 128/64 en lloc de 127/63. Les dues caselles trampa (límit del llindar i fosc amb el potenciòmetre a 0) són les que separen el notable. |
| **P10** · Polsador | 0,5 | a) 0,25 · b) 0,25 (0,1 el què + 0,15 el perquè). |
| **P11** · Pantalla | 0,75 | a) 0,15 · b) 0,4: 0,1 per element ben situat (es tolera ±4 punts) · c) 0,2. |
| **P12** · Depura | 1 | 0,25 per error: 0,15 trobar-lo (línia + què falla) + 0,1 corregir-lo. Al B, la línia que falta val igual si diu «entre 13 i 15». |
| **P13** · Explica | 0,5 | a) 0,25 només si dona el **mecanisme** (rellotge compartit · el passiu necessita un senyal que oscil·li). «Està mal connectat» = 0. · b) 0,25. |
| **P14** · Funció | 0,5 | Signatura i `return` 0,2 · ordre correcte de les comparacions 0,2 · sintaxi 0,1. Si mostra el valor amb `Serial` en lloc de retornar-lo, màxim 0,2. |
| **P15** · Crea | 1 | Variables globals que recorden la volta anterior 0,2 · **detecció del canvi** (A: `LOW` i abans `HIGH`; B: fosc ara i abans no) 0,4 · cicle de modes o acció correcta (A: torna a 0; B: un bip i el color) 0,3 · sintaxi 0,1. Sense detecció del canvi, màxim 0,5. |

## Solucions ràpides (per corregir de pressa)

| | A | B |
|---|---|---|
| **P1** | 200 Ω → 220 Ω | 200 Ω → 220 Ω |
| **P2** | vermell a 5V · groc invertit · verd sense R | vermell invertit · groc sense R · verd sense GND |
| **P3** | 2,5 V / 512 · 1 V / 205 · baixa, `<` | 2 V / 409 · 0,5 V / 102 · `<`, llindar ≈ 250 |
| **P4** | V · F · V · F | F · V · V · F |
| **P5** | 25 % · 1,25 V · 490 Hz | 75 % · 3,75 V · pin 7 sense PWM → `HIGH` |
| **P6** | verd · verd · blau | vermell · blau · blau |
| **P7** | 52 · 1,04 s · 255 | 17 · 0,51 s · 15 (no s'apaga) |
| **P8** | C A D E · vermell | B F D C · blau |
| **P9** | 255/255 · 0/0 · 127/127 · 255/**0** | 63/63 · 255/**0** · 191/191 · 0/0 |
| **P10** | 1, 2, 3 · rebots, compta de més | 1, 2, 3 · compta ≈ 25/s |
| **P11** | 50 · dibuix · pantalla negra | 25 · dibuix · la barra no baixa |
| **P12** | L2 pin 9 · `Serial.begin` · L12 `<` · L13 128 | L6 `INPUT_PULLUP` · L12 `LOW` · falta `anterior = ara;` · L15 `;` |
| **P13** | Timer2 compartit amb el pin 11 | el passiu necessita `tone()`, el relé dona 5 V fixos |

El detall i el codi de la P14 i la P15 són a la [correcció comentada](Prova_SA2_SA3_correccio_comentada.md).
