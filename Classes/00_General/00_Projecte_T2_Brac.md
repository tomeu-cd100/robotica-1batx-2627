# 🦾 Projecte T2 · El braç robòtic

> **Per a qui és?** Per a cada alumne/a durant el 2n trimestre. És el dossier
> del segon robot del curs: peces, muntatge, cablatge i rúbrica. Els reptes
> de SA4, SA5 i SA6 hi van sumant capacitats; aquí es veu el conjunt.

**Durada:** 2n trimestre (SA4-SA6) · **Maquinari:** UNO + breadboard, servo Starter, 2 micro servo KS0194, 3 potenciòmetres, sensor de col·lisió KS0021, 2 micro:bit (comandament i pont), caixa/estructura DM 3 mm

## El robot

El braç és una estructura de DM 3 mm de **3 graus de llibertat**: una **base**
que gira, un **colze** que aixeca l'avantbraç i una **pinça** de dos dits
impresos en 3D que obre i tanca. El seu cervell és el mateix **Arduino UNO**
de sempre durant **tot el trimestre**: cada SA hi afegeix una capa nova
sense desfer la de l'anterior. La SA4 li dona el cos i el moviment, la SA5
li dona un **canal sense fils** (dues micro:bit) i la SA6 li dona el
**control** (una màquina d'estats en C++).

![Estructura del braç: base giratòria (servo de gir) entre dues torres de suport lateral, segment 1 fins al colze (servo de l'articulació), segment 2 fins a la pinça de dos dits impresos en 3D (servo de pinça), i el sensor de col·lisió a l'abast de la pinça per a l'emergència](img/brac-estructura.svg)

Què fa: a **SA4** es controla amb **potenciòmetres** com un mini comandament
de sobretaula i pot **registrar i repetir** una seqüència de moviments; a
**SA5** s'hi afegeix un **comandament sense fils**: una micro:bit a la mà
envia ordres per ràdio a una segona micro:bit, el **pont**, que les passa a
l'Arduino per un cable; a **SA6** guanya una **màquina d'estats** amb repòs,
manual, replay i una **emergència** real —el sensor de col·lisió atura els
servos si la pinça topa amb res. El producte final és el mateix braç, però
amb un control cada cop més intel·ligent.

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
| micro:bit pont (rep la ràdio i la passa a l'Arduino, SA5) | Kit d'aula | 1 |
| Segona micro:bit (comandament per ràdio, a la mà) | Kit d'aula | 1 |
| Cables de pinça de cocodril a mascle (pont → Arduino) | Material del centre | 2 |
| Cargols M3 i M2 | Material del centre | segons muntatge |

<!-- web:only-github -->
Plantilla de tall làser: [`../../Recursos/plantilles_laser/brac.svg`](../../Recursos/plantilles_laser/brac.svg).
Peça impresa en 3D: [`../../Recursos/peces_3d/dit_pinca.scad`](../../Recursos/peces_3d/dit_pinca.scad).
<!-- /web:only-github -->

## Fabricació i personalització

A diferència de la mascota, el `brac.svg` **no té zona de gravat
personalitzable**: és una estructura funcional (base, dues torres, dos
segments i el suport de la pinça) i tothom la talla igual.
El que cadascú pot personalitzar és **després del tall**: pintar o
etiquetar les seves peces per distingir-les de les dels altres durant
l'emmagatzematge entre sessions.

### El braç es construeix al llarg de tot el trimestre

El braç no es munta en un sol dia: **creix sessió a sessió**. Quan arribes a
la SA4 tens una **caixa amb el teu nom** amb les peces ja tallades i els
dits de la pinça impresos. A cada sessió hi ha un **torn de taller** de
15-25 minuts en què hi afegeixes **la peça que la sessió t'acaba
d'ensenyar**. Així, el servo l'aprens movent la base del teu braç, i la ràdio
l'aprens movent-lo des del comandament.

| Sessió | Què aprens | Què hi afegeixes al braç (torn de taller) |
|---|---|---|
| SA4 · S1 | Servo + potenciòmetre | 25': base, torres i **servo de base**. La pràctica servo-potenciòmetre la fas directament sobre la base. |
| SA4 · S2 | Motor DC + pont H | 20': **segment 1 i servo del colze** (el motor DC no és del braç, el torn és curt). |
| SA4 · S3 | Del sensor al moviment | 25': **suport de la pinça, dits i servo de la pinça**, amb l'alimentació externa comuna. Acabes amb el braç sencer controlat amb 3 potenciòmetres. |
| SA4 · S4 | Producte de SA4 | Cap torn: és la sessió del producte de la SA (barrera o ventilador). Si vols, el registre/replay del braç pot ser el teu producte. |
| SA5 · S1-S2 | MicroPython, sensors | Cap torn. La inclinació que aprens a la S2 serà el gest del comandament. |
| SA5 · S3 | Ràdio | 20': **micro:bit pont** (P1 → D0 i GND) i **comandament per ràdio** del braç. |
| SA6 · S1 | Llaç obert/tancat | 20': **sensor de col·lisió** com a final de carrera, i el diagrama de blocs del braç (el replay és llaç obert; l'emergència, llaç tancat). |
| SA6 · S2 | Termòstat i histèresi | 15': **angles límit** de cada servo (anota'ls al quadern) i cablatge **endreçat i etiquetat** (criteri R1). |
| SA6 · S3 | Màquina d'estats | **Producte:** la màquina d'estats del braç. Ja no cal muntar res. |
| SA6 · S4 | — | Prova T2 (el braç ja és tancat). |

> 📦 **Entre sessions, el braç viu a la seva caixa.** Si un dia et falta
> una peça, fas la pràctica de la sessió a la breadboard com sempre:
> **cap pràctica depèn del braç per funcionar**. El torn de taller es
> recupera a la sessió següent.

<div class="nomes-docent" markdown="1">

> 🧑‍🏫 **Per al docent: com funcionen els torns (des del 24-10-2026).**
> - **Tall abans de la s13, fora d'horari:** com que el braç no té zona
>   personalitzable, es pot tallar per **lots** (diversos jocs de peces per
>   tauler) durant les vacances de Nadal, i els dits de pinça s'imprimeixen
>   igual que la resta de peces 3D. Prepara una caixa etiquetada per alumne/a.
> - **D'on surten els minuts:** el torn ocupa el lloc del **«+ repte»** de la
>   sessió, que és el primer que les guies ja diuen de retallar. A la SA4 S2 i
>   la SA6 S2 també retalla una mica de pràctica pròpia (motor DC i
>   termòstat). Amb un grup de 5 hi cap.
> - **Què es guanya:** la **S4 de SA4 torna a ser la sessió de producte**, i
>   la primera retallada del pla de contingència del T2 queda lliure com a
>   **marge real (~2 h)**. Vegeu el doc 08.
> - **Contingència:** si el tall no és a punt per a la s13, o el muntatge
>   s'endarrereix més d'una sessió, torna al flux de sota (fabricació
>   concentrada a la S4 de SA4). El repte de la S3 fa de producte i es gasta
>   la primera retallada.
>
> **Flux anterior (contingència): fabricació en una sola sessió.**
> 1. El docent llança el tall de `brac.svg` per **lots** (nesting de diversos
>    jocs de peces per tauler) durant la sessió dedicada (S4 de SA4).
> 2. Cada alumne/a recull el seu joc de peces i les **dents de pinça**
>    impreses prèviament.
> 3. Muntatge inicial a la mateixa sessió (encaixos, sense encolar).
> 4. El full de cua públic per màquina (alumne/a · fitxer · estat) es manté
>    igual que per als altres robots del curs.

</div>

<div class="nomes-docent" markdown="1">

> 🧑‍🏫 **En prova (24-10-2026): el MeArm com a estructura del braç.**
> `brac.svg` és un esquema propi **sense encaixos i mai tallat**. L'alternativa
> en avaluació és el **MeArm V1.1** (Ben Gray, CC BY-SA 3.0), un disseny
> obert de tall làser en 3 mm construït a molts centres:
> `Recursos/plantilles_laser/brac_MeArm_v1.1.svg` (crèdit i mides al
> `LLEGEIX-ME.md` de la carpeta). Té **4 graus de llibertat** (un servo més
> que el kit) i les ranures fan 3,0 mm justos. **Abans de Nadal:** tallar i
> muntar un prototip amb el nostre DM i els nostres servos, cronometrant-ne
> el muntatge. Si el prototip funciona, s'adapten el dossier, el codi (4
> servos) i la rúbrica; si no, es manté aquest dossier tal com és.
> Guia de muntatge del prototip: [Muntatge del braç MeArm](00_Muntatge_brac_MeArm.md).

</div>

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
7. Cablatge complet segons la taula corresponent (Arduino a SA4; a SA5
   s'hi suma el pont); comprova totes les connexions **abans** d'alimentar
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

**Fase comandament (SA5-SA6): s'hi afegeix el pont.** Tot el que hi ha a
la taula de dalt **es queda igual**; només hi sumes dos cables:

| Des de (micro:bit pont) | Cap a (Arduino UNO) | Notes |
|---|---|---|
| P1 | D0 (RX) | Per aquí arriben les ordres, una per línia. **Desconnecta'l per pujar el programa** (l'USB fa servir el mateix pin) i torna'l a connectar després. |
| GND | GND | GND comú: sense ell l'Arduino no entén res. |
| Ràdio (comandament, 2a micro:bit) | — | Mateix **grup de ràdio** al comandament i al pont (fes servir el teu número de llista). |

> ⚠️ **Els cables van només de la micro:bit cap a l'Arduino.** Mai
> connectis cap pin de l'Arduino (5 V) a la micro:bit (3,3 V): la
> cremaries. La micro:bit pont s'alimenta pel seu USB o amb el seu
> portapiles.

> 🔑 **Per al docent:** implementació completa de referència al
> [solucionari del trimestre](../Solucionari/Solucionari_T2_SA4-SA6.md) (secció «Codi de referència»).

## Què hi aporta cada SA

| SA | Sessions | Què s'hi construeix | Repte relacionat |
|---|---|---|---|
| SA4 | S1-S3 (torns de taller) | Muntatge articulació a articulació i control per potenciòmetre de cada una; registre/replay d'una seqüència de moviments. | `Reptes_SA4.md` |
| SA5 | S3 (torn de taller) | Comandament per ràdio (inclinació/botons) i micro:bit pont que passa les ordres a l'Arduino del braç. | `Reptes_SA5.md` |
| SA6 | S1-S3 (torns S1-S2) | Sensor de col·lisió, angles límit i cablatge endreçat; màquina d'estats del braç (repòs/manual/replay/emergència) com a producte a la S3. | `Reptes_SA6.md` |

**Nota:** la histèresi de SA6 es treballa al termòstat de les sessions de
SA6, no al braç; el braç aporta la màquina d'estats i l'emergència.

### La màquina d'estats del braç

És **exactament** el patró que aprens a la SA6 amb
`03_maquina_estats.ino`: un `enum` amb els estats, una variable `estat` i
un `switch` amb un `case` per estat. Com que el braç continua amb
l'Arduino, el programes en el mateix **C++** de la sessió, sense traduir
res. L'única novetat és d'on surten les ordres: en lloc de llegir
polsadors, el braç llegeix les **ordres de text** que li passa el pont
(`Serial`), una per línia.

Els **quatre estats** del braç i què els fa canviar:

| Estat | Què fa el braç | En surt quan… |
|---|---|---|
| **Repòs** | Quiet, servos a la posició actual. | Botó A del pont → manual · botó B del pont → replay (si hi ha seqüència gravada). |
| **Manual** | Obeeix les ordres de ràdio del comandament; sacsejant el comandament es **grava** el punt actual. | Botó A → repòs · botó B → replay. |
| **Replay** | Reprodueix sola la seqüència gravada, punt a punt (amb `millis()`, sense `delay()`). | En acabar torna a repòs (o salta a emergència si xoca). |
| **Emergència** | No mou res. Mana per damunt de qualsevol altre estat. | Rearmament **manual**: sensor alliberat **i** botó A. |

> 💡 **Prova la màquina d'estats sense ràdio.** Desconnecta el cable del
> pont, obre el **Monitor sèrie** (9600, «Nova línia») i escriu les ordres
> a mà: `A`, `B+`, `G`, `R`… Si el braç obeeix el teclat, obeirà el
> comandament.

> 🔑 **Per al docent:** implementació completa dels quatre estats al
> [solucionari del trimestre](../Solucionari/Solucionari_T2_SA4-SA6.md)
> (secció «Codi de referència del robot del trimestre: el braç»,
> `T2_brac_estats.ino` + `T2_brac_microbit_pont.py`), amb el protocol de
> ràdio ampliat amb `"G"` de gravar al comandament. Que
> l'emergència es comprovi **abans** del bloc d'estats, i no dins de cap
> d'ells, és la mateixa idea de prioritat que la guarda de seguretat del
> `03_sensor_velocitat` de la SA4.

**Producte final (SA6-S3):** el braç muntat amb la seva **màquina
d'estats** (repòs/manual/replay/emergència) i el **comandament per
ràdio**, capaç d'agafar i moure un objecte. La S4 de SA6 és la prova
pràctica **T2**, amb el braç ja tancat.

<div class="nomes-docent" markdown="1">

## Pla B (contingència): el braç governat per la micro:bit

> 🧑‍🏫 **Per al docent.** Fins al 24-10-2026 aquest era el pla per defecte:
> a la SA5 el braç es re-cablejava sencer a una micro:bit amb Micro:shield.
> Es va canviar perquè la SA5 no ensenya enlloc a moure servos amb la
> micro:bit i perquè la SA6 torna al C++, de manera que la màquina d'estats
> s'havia de traduir a Python. Es conserva per si el **pont sèrie falla amb
> el maquinari real** (validar-ho **abans de Nadal**, abans que comenci el T2). Si s'activa, cal afegir a la
> SA5 una mini-pràctica de servo amb `write_analog` (període de 20 ms) i
> projectar la taula de traducció de sota abans de la SA6-S3.

**Cablatge de la fase micro:bit (pla B):**

| Component | Pin (Micro:shield) | Notes |
|---|---|---|
| Servo base (Starter) | P0 | Alimentació externa del shield. |
| Servo colze (KS0194) | P1 | Alimentació externa del shield. |
| Servo pinça (KS0194) | P2 | Alimentació externa del shield. |
| Sensor de col·lisió (KS0021) | P8 | Digital (re-cablejat de la fase Arduino al shield). Atura els servos en cas de xoc (emergència, SA6). |
| Ràdio (comandament, 2a micro:bit) | — | Mateix **grup de ràdio** a les dues plaques (fes servir el teu número de llista). |

> ⚠️ **Mai alimentar 3 servos des de l'USB.** Igual que a la fase Arduino,
> els tres servos necessiten **alimentació externa del Micro:shield**, no
> el 3V del connector d'edge de la micro:bit.

**La màquina d'estats en Python (pla B).** A la SA6 la màquina d'estats
s'ensenya **en C++** (`enum` + `switch`), però amb el pla B el braç ja va amb
**MicroPython**, que no té cap de les dues coses. El patró és idèntic i
només canvien les eines:

| A la SA6 (C++, `03_maquina_estats.ino`) | Al braç (MicroPython) |
|---|---|
| `enum Estat { REPOS, MANUAL, ... };` | `REPOS = "REPOS"`, `MANUAL = "MANUAL"`… (constants de text) |
| `Estat estat = REPOS;` | `estat = REPOS` |
| `switch (estat) { case REPOS: … }` | `if estat == REPOS: …` / `elif estat == MANUAL: …` |
| `canviaEstat(FASE1);` | `canvia_estat(MANUAL)` (una funció, igual que en C++) |
| `break;` al final de cada `case` | *(no cal: l'`elif` ja és excloent)* |

Codi de referència del pla B: `T2_brac_microbit_receptor.py` al
[solucionari del trimestre](../Solucionari/Solucionari_T2_SA4-SA6.md) (el
comandament és el mateix en tots dos plans). Els botons d'estat són els de
la micro:bit del braç.

</div>

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
| La ràdio no arriba | Les dues micro:bit tenen **grups diferents**. | Comprova que el `group` sigui **el mateix número** a totes dues plaques. |
| L'Arduino no es deixa programar (error en pujar) | El cable del pont és connectat al **D0**, que l'USB també fa servir. | Desconnecta el cable del D0, puja el programa i torna'l a connectar. |
| El pont rep però el braç no obeeix | Falta el **GND comú** entre el pont i l'Arduino, o el cable va al pin que no toca. | GND del pont al GND de l'Arduino; P1 del pont al D0. Prova les ordres des del Monitor sèrie per saber de quina banda és el problema. |
| El braç cau | Parell insuficient per al pes que aixeca. | Escurça els segments o limita la càrrega que agafa la pinça. |
| La micro:bit es reinicia en moure servos *(només pla B)* | Servos alimentats pel USB de la micro:bit en lloc del Micro:shield. | Alimentació externa del shield, mai el connector USB. |

---

⬅️ Torna al teu camí: [Reptes de la SA4](../../Reptes/Reptes_SA4.md) · [Reptes de la SA5](../../Reptes/Reptes_SA5.md) · [Reptes de la SA6](../../Reptes/Reptes_SA6.md) · [El fil conductor dels tres robots](00_Fil_conductor_robots.md)
