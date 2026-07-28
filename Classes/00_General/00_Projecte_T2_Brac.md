# 🦾 Projecte T2 · El braç robòtic

> **Per a qui és?** Per a cada parella durant el 2n trimestre. És el dossier
> del segon robot del curs: peces, muntatge, cablatge i rúbrica. Els reptes
> de SA4, SA5 i SA6 hi van sumant capacitats; aquí es veu el conjunt.

**Durada:** 2n trimestre (SA4-SA6) · **Maquinari:** UNO + breadboard, servo Starter, 2 micro servo KS0194, 3 potenciòmetres, sensor de col·lisió KS0021, micro:bit + Micro:shield, segona micro:bit, caixa/estructura DM 3 mm

## El robot

El braç és una estructura de DM 3 mm de **3 graus de llibertat**: una **base**
que gira, un **colze** que aixeca l'avantbraç i una **pinça** de dos dits
impresos en 3D que obre i tanca. El que el fa especial és que té **DOS
cervells** al llarg del trimestre: primer el mateix **Arduino UNO** de
sempre (SA4), després es re-cableja sencer a una **micro:bit amb
Micro:shield** (SA5-SA6). El braç no canvia; el que canvia és qui el
governa i com.

![Estructura del braç: base giratòria (servo de gir) entre dues torres de suport lateral, segment 1 fins al colze (servo de l'articulació), segment 2 fins a la pinça de dos dits impresos en 3D (servo de pinça), i el sensor de col·lisió a l'abast de la pinça per a l'emergència](img/brac-estructura.svg)

Què fa: a **SA4** es controla amb **potenciòmetres** com un mini comandament
de sobretaula i pot **registrar i repetir** una seqüència de moviments; a
**SA5** es re-cableja al **micro:bit** i s'hi afegeix un **comandament sense
fils** (la segona micro:bit de la parella, per ràdio); a **SA6** guanya una
**màquina d'estats** amb repòs, manual, replay i una **emergència** real
—el sensor de col·lisió atura els servos si la pinça topa amb res. El
producte final és el mateix braç, però amb un control cada cop més
intel·ligent.

## Llista de peces

| Peça | Origen | Quantitat |
|---|---|---|
| Peces de DM 3 mm (base, torres, segments, suport pinça) | Plantilla `brac.svg`, tall làser | 6 |
| Dits de pinça | `dit_pinca.scad`, impressió 3D | 2 |
| Servo Starter (articulació de base) | Kit 1 | 1 |
| Micro servo KS0194 (colze i pinça) | Kit 2 | 2 |
| Potenciòmetres (control manual, SA4) | Kit 1 | 3 |
| Sensor de col·lisió KS0021 (emergència) | Kit 2 | 1 |
| Arduino UNO + breadboard | Kit 1 | 1 |
| micro:bit + Micro:shield (re-cablatge SA5) | Kit d'aula | 1 |
| Segona micro:bit (comandament per ràdio) | Kit d'aula | 1 |
| Cargols M3 i M2 | Material del centre | segons muntatge |

<!-- web:only-github -->
Plantilla de tall làser: [`../../Recursos/plantilles_laser/brac.svg`](../../Recursos/plantilles_laser/brac.svg).
Peça impresa en 3D: [`../../Recursos/peces_3d/dit_pinca.scad`](../../Recursos/peces_3d/dit_pinca.scad).
<!-- /web:only-github -->

## Fabricació i personalització

A diferència de la mascota, el `brac.svg` **no té zona de gravat
personalitzable**: és una estructura funcional (base, dues torres, dos
segments i el suport de la pinça) i totes les parelles la tallen igual.
El que cada equip pot personalitzar és **després del tall**: pintar o
etiquetar les seves peces per distingir-les de les d'altres equips durant
l'emmagatzematge entre sessions.

Flux de fabricació:
1. El docent llança el tall de `brac.svg` per **lots** (nesting de diverses
   parelles per tauler) durant la sessió dedicada (S4 de SA4).
2. Cada parella recull el seu joc de peces i les **dents de pinça**
   impreses prèviament.
3. Muntatge inicial a la mateixa sessió (encaixos, sense encolar).
4. El full de cua públic per màquina (parella · fitxer · estat) es manté
   igual que per als altres robots del curs.

## Muntatge

1. Encaixa la **base** amb les **dues torres** laterals, sense encolar
   encara: la base ha de poder **girar lliurement** un cop hi hagi el servo.
2. Cargola el **servo Starter** a la base (articulació de gir) i el primer
   **segment 1** al seu casquet.
3. Cargola el **micro servo KS0194** (colze) entre el segment 1 i el
   **segment 2**.
4. Munta el **suport de la pinça** a l'extrem del segment 2 i cargola el
   segon **micro servo KS0194** (pinça) amb els **dos dits impresos**
   (`dit_pinca.scad`) al seu casquet, un a cada banda.
5. Fixa la **breadboard amb l'Arduino UNO** (fase SA4) a la base o al
   costat de l'estructura, amb els ports accessibles.
6. Munta el **sensor de col·lisió** a l'abast de la pinça (p. ex. al
   suport de la pinça o davant seu), de manera que detecti un xoc abans
   que forci l'estructura.
7. Cablatge complet segons la taula corresponent (Arduino a SA4,
   micro:bit a SA5-SA6); comprova totes les connexions **abans** d'alimentar
   els servos.
8. Prova de moviment: comprova que els **tres servos** arriben als seus
   angles límit **sense forçar el topall** abans de donar el braç per
   muntat (anota els angles límit al quadern).

> ⚠️ **Parell insuficient:** si el braç es doblega o cau amb la pinça
> carregada, escurça els segments o limita la càrrega que aixeca; no és un
> problema de codi.

## Cablatge

**Fase Arduino (SA4):**

| Component | Pin | Notes |
|---|---|---|
| Servo base (Starter) | D9 | PWM (`~`); alimentació externa (piles AA). |
| Servo colze (KS0194) | D10 | PWM (`~`); alimentació externa (piles AA). |
| Servo pinça (KS0194) | D11 | PWM (`~`); alimentació externa (piles AA). |
| Potenciòmetre base | A0 | Entrada analògica; `map(0-1023 → 0-180)`. |
| Potenciòmetre colze | A1 | Entrada analògica; `map(0-1023 → 0-180)`. |
| Potenciòmetre pinça | A2 | Entrada analògica; `map(0-1023 → 0-180)`. |
| Sensor de col·lisió (KS0021) | D2 | Digital; atura els servos en cas de xoc (emergència, SA6). |

> ⚠️ **Mai alimentar 3 servos des de l'USB.** Els tres servos comparteixen
> **alimentació externa** (piles AA) amb **GND comú** entre les piles i
> l'Arduino; el pin 5V del UNO no aguanta els tres alhora.

**Fase micro:bit (SA5-SA6):**

| Component | Pin (Micro:shield) | Notes |
|---|---|---|
| Servo base (Starter) | P0 | Alimentació externa del shield. |
| Servo colze (KS0194) | P1 | Alimentació externa del shield. |
| Servo pinça (KS0194) | P2 | Alimentació externa del shield. |
| Sensor de col·lisió (KS0021) | (manté digital, re-cablejat al shield) | Atura els servos en cas de xoc (emergència, SA6). |
| Ràdio (comandament, 2a micro:bit) | — | Mateix **grup de ràdio = número de parella** a les dues plaques. |

> ⚠️ **Mai alimentar 3 servos des de l'USB.** Igual que a la fase Arduino,
> els tres servos necessiten **alimentació externa del Micro:shield**, no
> el 3V del connector d'edge de la micro:bit.

> 🔑 **Per al docent:** implementació completa de referència al
> [solucionari del trimestre](../Solucionari/Solucionari_T2_SA4-SA6.md) (secció «Codi de referència»).

## Què hi aporta cada SA

| SA | Sessions | Què s'hi construeix | Repte relacionat |
|---|---|---|---|
| SA4 | S1-S4 (S4 = fabricació) | Control per potenciòmetre de cada articulació i registre/replay d'una seqüència de moviments. | `Reptes_SA4.md` |
| SA5 | S1-S4 | Re-cablatge del braç al micro:bit i comandament per ràdio amb la segona micro:bit (inclinació/botons). | `Reptes_SA5.md` |
| SA6 | S1-S4 | Màquina d'estats del braç (repòs/manual/replay/emergència); el sensor de col·lisió atura els servos. | `Reptes_SA6.md` |

**Nota:** la histèresi de SA6 es treballa al termòstat de les sessions de
SA6, no al braç; el braç aporta la màquina d'estats i l'emergència.

**Producte final (SA6-S3):** el braç muntat amb la seva **màquina
d'estats** (repòs/manual/replay/emergència) i el **comandament per
ràdio**, capaç d'agafar i moure un objecte. La S4 de SA6 és la prova
pràctica **T2**, amb el braç ja tancat.

## Rúbrica del robot (producte SA6)

| Criteri | Insuficient (0-4) | Suficient/Bé (5-6) | Notable (7-8) | Excel·lent (9-10) |
|---|---|---|---|---|
| **R1 · Fabricació i muntatge** | Estructura inestable o cablejat insegur. | Braç funcional però amb algun cable fluix o desordenat. | Braç ferm i cablejat endreçat, sense etiquetar. | Braç ferm, cablejat endreçat i etiquetat, res solt ni curtcircuitat. |
| **R2 · Moviment** | Alguna articulació no es mou o força el topall. | Les 3 articulacions es mouen, amb algun tremolor. | Les 3 articulacions es mouen de manera suau i fiable. | Moviment suau, precís i sense tremolor a les 3 articulacions. |
| **R3 · Modes i màquina d'estats** | Sense estats definits o el braç queda penjat en algun mode. | Alguns modes funcionen, sense diagrama d'estats. | Tots els modes (repòs/manual/replay/emergència) funcionen, amb diagrama d'estats inclòs. | Tots els modes funcionen de manera fiable, amb diagrama d'estats clar i emergència provada. |
| **R4 · Comandament per ràdio i demostració** | Sense comandament o no arriba a agafar cap objecte. | Comandament bàsic; agafa l'objecte amb ajuda. | Comandament fiable; agafa i mou un objecte amb èxit. | Comandament fiable i demostració fluida: agafa i mou l'objecte a la primera. |

## Problemes freqüents

| Símptoma | Causa probable | Solució |
|---|---|---|
| El servo tremola | Alimentació insuficient (des de l'USB en lloc d'externa). | Alimentació externa (piles AA) amb GND comú a totes les fases. |
| El servo força el topall | Recorregut 0-180° mal limitat al codi. | Troba i anota els angles límit reals de cada servo abans de programar-hi res més. |
| La ràdio no arriba | Les dues micro:bit tenen **grups diferents**. | Comprova que el `group` sigui **el número de la parella** a totes dues plaques. |
| El braç cau | Parell insuficient per al pes que aixeca. | Escurça els segments o limita la càrrega que agafa la pinça. |
| La micro:bit es reinicia en moure servos | Servos alimentats pel USB de la micro:bit en lloc del Micro:shield. | Alimentació externa del shield, mai el connector USB. |

---

⬅️ Torna al teu camí: [Reptes de la SA4](../../Reptes/Reptes_SA4.md) · [Reptes de la SA5](../../Reptes/Reptes_SA5.md) · [Reptes de la SA6](../../Reptes/Reptes_SA6.md) · [El fil conductor dels tres robots](00_Fil_conductor_robots.md)
