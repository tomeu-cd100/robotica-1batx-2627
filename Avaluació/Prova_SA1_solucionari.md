# Prova SA1 · Guia de correcció i solucionari (docent)

**Durada:** 50 min · **Quan:** primers 50' de la **S1 de la SA2** · **Individual**, en paper, sense apunts · **Models:** A i B (mateixa estructura, dades diferents)

> Enunciat per imprimir: [`Prova_SA1.md`](Prova_SA1.md). **Aquest document no es lliura a l'alumnat.**

---

## Per què aquesta prova

La SA1 es qualificava només amb el pòster, el quadern i l'observació: cap instrument individual certificava els conceptes de base, i l'alumnat la vivia com una unitat «de presentació». Aquesta prova **tanca la SA1 amb una nota individual** i fa explícit que els conceptes (E-P-S, placa, seguretat, lectura de `Blink`) entren a l'avaluació. Com que la Part B és una **seqüència PRIMM en paper** (predir → investigar → depurar → crear), també serveix de pont cap a la SA2, on comencen a programar al seu kit.

## Logística

- **Quan:** a l'inici de la **S1 de la SA2**, abans de repartir cap kit. No retalla la SA1 (que no es retalla mai, vegeu [`08_Sequenciacio`](../Programació%20didàctica/08_Sequenciacio_temporal_anual.md)); el temps surt de la S1 de la SA2, que es reorganitza a la seva [guia docent](../Classes/SA2/SA2_guia_docent.md).
- **Avisa'l a la S3 de la SA1** (data i què entra): la prova només fa efecte si se sap que arriba.
- **Impressió:** obre la pàgina de la prova a la web (vista docent) i imprimeix-la amb el navegador (Ctrl+P, A4). Cada model ocupa **5 pàgines**: **model A = pàgines 1-5**, **model B = pàgines 6-10** (el B comença sempre en pàgina nova). Imprimeix la meitat de còpies de cada rang.
- **Models A/B:** reparteix-los **alternats per taules**, de manera que dos companys de costat mai no tinguin el mateix model.
- **Sense apunts ni dispositius.** A diferència de les proves trimestrals (T1-T3, amb quadern consultable), aquí s'avaluen conceptes de base que s'han de saber sense consultar.
- **Temps:** 5' de repartiment i instruccions dins dels 50'. Avisa a mitja prova («hauríeu de començar la Part B»).

## Avaluació

| Part | Què evidencia | Criteri | Rúbrica |
|---|---|---|---|
| **A · Teoria** (5 p) | Model E-P-S, sistema embegut, placa UNO, seguretat, mètode de projecte | **CA5.1** | — (graella) |
| **B · Pràctica en paper** (5 p) | Llegir, predir, depurar i escriure un sketch senzill | **CA1.1** | R1 (orientativa) |

**On compta:** dimensió **«Proves pràctiques» (20 %)** del 1r trimestre, juntament amb la [Prova T1](Prova_practica_T1.md): **Prova SA1 = 30 %** i **T1 = 70 %** de la dimensió.

**Orientació:** A1 + A3 + B1 ben fets ≈ 5 (nucli: entén el model E-P-S i sap llegir un `Blink`). Amb A2, A4 i B2 ≈ 7-8. Depurar (B3) i crear (B4) sense errors porta al 9-10.

**Recuperació:** l'alumnat que no arribi a 5 la repeteix amb **l'altre model** (A ↔ B) en una sessió acordada. La nota nova substitueix la vella (com a la resta de proves).

**Pla de millora:** igual que a les proves trimestrals, en retornar-la cadascú escriu al quadern les 3 línies (què m'ha fallat · què practicaré · com ho comprovaré).

---

## Graella de correcció (10 punts)

| Exercici | Punts | Com es puntua |
|---|---|---|
| A1 · Test | 1,5 | 0,25 per encert; els errors no resten. |
| A2 · Seguretat | 1 | 0,5 per infracció: 0,25 identificar-la + 0,25 explicar el perill. |
| A3 · E-P-S | 1,5 | a) taula 1 p (0,25 per columna: cal dir el **sensor/actuador concret**, no només «detecta»/«actua») · b) 0,5 p (sí + per què). |
| A4 · Placa muda | 1 | 0,2 per requadre. S'accepta el nom sense el model del xip (`ATmega328P`). |
| B1 · Prediu | 1,5 | a) 0,5 · b) 0,5 (es tolera 1 casella d'error) · c) 0,5 (0,25 el resultat + 0,25 el càlcul). |
| B2 · Investiga | 1 | 0,2 per parella correcta. |
| B3 · Depura | 1,5 | 0,5 per error: 0,25 trobar-lo (línia + què falla) + 0,25 corregir-lo. |
| B4 · Crea | 1 | Seqüència correcta 0,5 · temps en ms correctes 0,3 · sintaxi (`;`, `HIGH`/`LOW`) 0,2. |

---

## Solucions · Model A

### A1
1 **b** · 2 **c** · 3 **d** · 4 **a** · 5 **c** · 6 **b**

### A2 · Seguretat · En Pau (qualsevol dues)
- **Canvia el muntatge amb la placa connectada** (norma 1): un cable mal posat pot fer un curtcircuit i espatllar la placa o el port USB.
- **LED sense resistència** (norma 6): passa massa corrent; el LED es crema i el pin de la placa es pot fer malbé.
- **Beguda al costat del circuit** (norma 2): si es vessa, curtcircuit sobre la placa.

### A3 · Porta automàtica
| Entrada | Procés | Sortida | Alimentació |
|---|---|---|---|
| Presència d'una persona: **sensor de presència** (infraroig/radar). Opcional: finals de cursa de porta oberta/tancada. | Si detecta algú → obrir; si fa uns segons que no detecta ningú → tancar (temporitzador). | **Motor** que obre/tanca les fulles. Opcional: llum o avís. | Xarxa elèctrica (230 V) a través d'una font. |

**b)** Sí: un **microcontrolador integrat dins la porta** controla una única tasca (obrir/tancar), sense pantalla ni teclat.

### A4 · Placa muda
1 · **Connector USB** · 3 · **Pins digitals 0-13** (`~` = PWM) · 5 · **Microcontrolador** (`ATmega328P`) · 6 · **Pins d'alimentació** (5V, 3V3, GND, Vin) · 7 · **Entrades analògiques** (A0-A5)

### B1
**a)** S'encén un moment curt (0,25 s) i s'apaga més estona (0,75 s), i es repeteix sempre: un «flaix» per segon.

**b)** X a **0 · 1 · 2** (la resta, buides).

**c)** Un cicle = 250 + 750 = 1000 ms = 1 s → 60 s / 1 s = **60 vegades**.

### B2
`setup` **F** · `loop` **C** · `pinMode` **E** · `digitalWrite(HIGH)` **A** · `delay(500)` **B** (sobra la D)

### B3
| Línia | Què falla | Correcció |
|---|---|---|
| 3-4 | Falta configurar el pin com a sortida: el LED no s'encén bé (fa una llum molt feble o res). | `pinMode(LED, OUTPUT);` dins el `setup()` |
| 7 | Falta el `;` al final: no compila. | `digitalWrite(LED, HIGH);` |
| 8 | `delay` va en **mil·lisegons**: 1 ms, el parpelleig no es veu. | `delay(1000);` |

### B4
```cpp
void loop() {
  digitalWrite(LED, HIGH);   // curt 1
  delay(200);
  digitalWrite(LED, LOW);
  delay(200);
  digitalWrite(LED, HIGH);   // curt 2
  delay(200);
  digitalWrite(LED, LOW);
  delay(200);
  digitalWrite(LED, HIGH);   // llarg
  delay(1000);
  digitalWrite(LED, LOW);    // pausa
  delay(1000);
}
```
> També és correcte amb un bucle `for` per als dos curts (és ampliació de la SA1, no s'exigeix).

---

## Solucions · Model B

### A1
1 **c** · 2 **a** · 3 **b** · 4 **c** · 5 **b** · 6 **a**

### A2 · Seguretat · La Laia (qualsevol dues)
- **Cable directe entre 5V i GND** (norma 4): és un curtcircuit; la placa s'escalfa i es pot fer malbé.
- **LED amb la polaritat invertida** (norma 5): no s'encén i, en altres components, invertir la polaritat els espatlla.
- **Continua amb escalfor i olor estranya** (norma 8): cal desconnectar immediatament i avisar; hi ha risc de cremada o de foc.

### A3 · Assecador de mans
| Entrada | Procés | Sortida | Alimentació |
|---|---|---|---|
| Mans a sota: **sensor d'infraroig** (presència/proximitat). | Si detecta mans → engegar; si deixa de detectar-ne → aturar. | **Motor** del ventilador + **resistència calefactora** (aire calent). | Xarxa elèctrica (230 V). |

**b)** Sí: un **microcontrolador integrat dins l'aparell** controla una única tasca, sense pantalla ni teclat.

### A4 · Placa muda
2 · **Connector d'alimentació** (jack, 7-12 V) · 3 · **Pins digitals 0-13** (`~` = PWM) · 4 · **LED intern «L»** (pin 13) · 5 · **Microcontrolador** (`ATmega328P`) · 7 · **Entrades analògiques** (A0-A5)

### B1
**a)** Està encès molta estona (1,5 s) i s'apaga poc (0,5 s), i es repeteix sempre.

**b)** X a **0 · 0,25 · 0,5 · 0,75 · 1 · 1,25** i a **2 · 2,25 · 2,5 · 2,75** (buides: 1,5 i 1,75).

**c)** Un cicle = 1500 + 500 = 2000 ms = 2 s → 60 s / 2 s = **30 vegades**.

### B2
`const int` **E** · `setup` **D** · `loop` **F** · `digitalWrite(LOW)` **C** · `delay(2000)` **A** (sobra la B)

### B3
| Línia | Què falla | Correcció |
|---|---|---|
| 1 | Falta el `;` al final: no compila. | `const int LED = 8;` |
| 4 | El pin s'ha de configurar com a **sortida**, no com a entrada. | `pinMode(LED, OUTPUT);` |
| 9 | `delay` va en **mil·lisegons** enters: `0.5` queda en 0 ms. Mig segon = 500 ms. | `delay(500);` |

### B4
```cpp
void loop() {
  digitalWrite(LED, HIGH);   // llarg
  delay(1000);
  digitalWrite(LED, LOW);
  delay(300);
  digitalWrite(LED, HIGH);   // curt 1
  delay(300);
  digitalWrite(LED, LOW);
  delay(300);
  digitalWrite(LED, HIGH);   // curt 2
  delay(300);
  digitalWrite(LED, LOW);
  delay(300);
  delay(2000);               // pausa
}
```
> Variant acceptada: els dos últims `delay` fusionats en `delay(2300)`; és el mateix temps apagat. Si oblida el 0,3 s apagat del curt 2 i posa només `delay(2000)`, es perden 0,1 p (temps).
