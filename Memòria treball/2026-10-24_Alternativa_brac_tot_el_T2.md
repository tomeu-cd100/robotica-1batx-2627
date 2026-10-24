# 2026-10-24 · Alternativa: construir el braç durant tot el 2n trimestre

**Estat:** **APLICADA al material el 24-10-2026** (a petició del docent). El pla
anterior (fabricació concentrada a la S4 de SA4) es conserva com a
contingència a tots els documents on apareixia.

Aplicació: dossier del braç (secció «El braç es construeix al llarg de tot el
trimestre», amb la taula per sessions, la nota docent i el flux anterior com a
contingència), fil conductor (calendari i nota d'hores), doc 08 (taula de
retallades i actualització del marge), docs 13/14/15 de la programació, guies
docents de SA4 (S1-S3 i nota de la S4), SA5 (S3) i SA6 (S1-S2), portada T2 i
`Reptes_SA4.md`. **No tocats:** fitxes i checklists d'alumnat (tenen PDF
versionats; el seu bloc «Cap al robot» continua sent vàlid).

## Punt de partida (pla actual, es conserva com a contingència)

- El braç es talla i es munta **de cop a la S4 de SA4** (sessió de fabricació).
- Per fer-hi lloc, la S4 de SA4 (producte «barrera automàtica / ventilador»)
  queda substituïda: **el repte de la S3 fa de producte**. Això gasta per
  endavant la **primera retallada** del pla de contingència.
- Després, SA5 i SA6 només hi afegeixen cervell (re-cablatge, ràdio, estats).

## Proposta: «torn de taller» a cada sessió

La idea: el docent **talla el `brac.svg` per lots fora d'horari abans de la
s13** (el braç no té zona personalitzable, així que es pot pretallar) i
imprimeix els dits de pinça. A classe, cada sessió té un **torn de taller de
15-25'** on s'afegeix al braç **la peça que la sessió acaba d'ensenyar**. El
robot creix al ritme dels sabers.

| Sessió | Saber de la sessió | Torn de taller del braç |
|---|---|---|
| SA4 S1 | Servo + potenciòmetre | 25': base + torres + **servo de base**. La pràctica servo-pot es fa directament sobre la base del braç. |
| SA4 S2 | Motor DC + pont H | 20': **segment 1 + servo de colze** (el motor DC no és del braç; el taller és curt). |
| SA4 S3 | Integració + `millis()` | 25': **suport de pinça + dits 3D + servo de pinça**, alimentació externa comuna. Tancament: braç sencer amb 3 pots (fase Arduino completa). |
| SA4 S4 | Producte de SA4 | **Es recupera la sessió de producte** (barrera/ventilador). El registre/replay del braç passa a ser una opció del repte. |
| SA5 S1 | Matriu LED i botons | Sense taller (dia de canvi de paradigma). |
| SA5 S2 | Sensors integrats | Sense taller: la inclinació de l'acceleròmetre que s'aprèn avui serà el gest del comandament. *(Abans hi havia el re-cablatge al Micro:shield; vegeu «Decisió del 24-10: opció A».)* |
| SA5 S3 | Ràdio | 20': **micro:bit pont** (P1 → D0 + GND) i **comandament per ràdio** del braç, que continua amb l'Arduino. |
| SA6 S1 | Llaç obert/tancat | 20': **sensor de col·lisió** com a final de carrera + diagrama de blocs del braç (replay = llaç obert; emergència = llaç tancat). |
| SA6 S2 | Termòstat i histèresi | 15': **calibratge d'angles límit** i cablatge endreçat i etiquetat (criteri R1). |
| SA6 S3 | Màquina d'estats | **Producte del braç** (repòs/manual/replay/emergència), com ara. |
| SA6 S4 | — | **Prova T2**, intacta. |

Taller total ≈ 130' repartits, i bona part coincideix amb la pràctica de la
mateixa sessió (SA4 S1, SA5 S3, SA6 S3).

## Què es guanya

1. **Es recupera la primera retallada del T2** (la S4 de SA4 torna a ser
   sessió de producte o, si cal, es pot comprimir com a marge real). Aquestes
   ~2 h poden ajudar a resoldre el **dèficit de 2 h del T3** (decisió prevista
   abans de Setmana Santa).
2. El braç deixa de ser un afegit i es converteix en el **banc de proves** de
   cada saber: el servo s'aprèn movent la base, la ràdio s'aprèn movent el braç.
3. Els errors mecànics (parell insuficient, topalls) surten a poc a poc, no tots
   el mateix dia.

## Què costa / riscos

- **SA4 S2 i SA6 S2** perden 15-20' de pràctica pròpia (motor DC i termòstat).
  Mitigació: a qui vagi just, el taller d'aquestes dues sessions passa a casa
  del «+ repte» o a la sessió següent.
- Cal **pretallar abans de la s13** (vacances de Nadal) i **guardar el braç
  entre sessions**: una caixa etiquetada per robot.
- Si un dia falta una peça, la pràctica de la sessió es fa a la breadboard com
  sempre: cap pràctica **depèn** del braç per funcionar.

## Decisió del 24-10: opció A (APLICADA al material)

**Diagnòstic.** El re-cablatge del braç a la micro:bit de la SA5 era un bolet:
- la SA5 no ensenya enlloc a moure servos amb la micro:bit, i el Micro:shield
  hi surt com a opcional;
- `Reptes_SA5.md` deia que el comandament era una «via avançada i opcional
  amb pont micro:bit↔Arduino», cosa que contradeia el dossier;
- la SA6 torna al C++, i el braç havia de traduir la màquina d'estats a Python.

**Opció A (triada pel docent):** el braç es queda **tot el trimestre amb
l'Arduino**. La SA5 hi aporta el comandament: la micro:bit de la mà envia per
ràdio i una micro:bit **pont** ho passa per cable a l'UNO. La SA6 hi aporta
la màquina d'estats en C++, `enum` + `switch` tal qual.

**Decisió tècnica:** el pont arriba pel **D0 (Serial de maquinari)** i no per
`SoftwareSerial`. `SoftwareSerial` bloqueja les interrupcions mentre rep i
la llibreria `Servo` les necessita, així que els servos pegarien sotragades.
El cost és desconnectar el cable del D0 per pujar el programa. Té un avantatge:
la màquina d'estats es pot provar sense ràdio des del Monitor sèrie.

**Canvis fets:**
- Codi nou: `Classes/Solucionari/codi/T2_brac_estats/T2_brac_estats.ino`
  (compila per a `arduino:avr:uno`: 19 % de flaix, 28 % de RAM) i
  `T2_brac_microbit_pont.py`.
- `T2_brac_microbit_comandament.py`: comentaris (els botons d'estat són els
  del pont; «parella» → número de llista).
- `T2_brac_microbit_receptor.py`: marcat com a **pla B**.
- Dossier `00_Projecte_T2_Brac.md`: el robot, les peces, el cablatge (taula
  del pont), la màquina d'estats en C++ i els problemes freqüents. La fase
  micro:bit i la taula de traducció C++→Python passen a la secció **«Pla B
  (contingència)»**, només docent.
- `Solucionari_T2_SA4-SA6.md`: seccions del pont i de la màquina d'estats en
  C++; les de MicroPython queden com a «Pla B».
- `Reptes_SA4/5/6.md` i `08c_Projectes_vida_real.md` (nota datada).

**Pendent abans de Nadal (maquinari real, abans que comenci el T2):** validar el pont. La micro:bit
treu 3,3 V i l'UNO llegeix un HIGH a partir de 3 V, així que el marge és
just. Si falla, el **pla B** és tornar a cablejar a la micro:bit, i el
**pla C** és el braç amb potenciòmetres per cable, sense ràdio.

## Estructura del braç: el MeArm V1.1 (en prova)

**Problema detectat:** `brac.svg` no surt de cap disseny extern. El va generar
Claude el 18-07 amb `tools/genera_plantilles_laser.py`, i és un esquema de
plaques planes **sense encaixos** (el dossier deia «encaixa la base amb les
torres», però no hi ha ranures) que no s'ha tallat mai.

**Alternativa:** el **MeArm**, de Ben Gray (phenoptix), un braç obert de 4 GDL
per a tall làser en 3 mm. Maquinari amb llicència **CC BY-SA 3.0**, verificada
al README del repositori `github.com/phenoptix/MeArm`; les imatges són NC i no
es fan servir. S'ha triat la **V1.1** (la V1 és l'única que no necessita
placa; la V2 i la V3 sí).

**Fet:**
- DXF descarregat i analitzat. És en **cm**, té 4 capes (contorns, forats
  interiors, placa de base i gravat) i ocupa 18,5 × 28,9 cm per braç.
- Convertit amb `tools/converteix_dxf_mearm.py` →
  `Recursos/plantilles_laser/brac_MeArm_v1.1.svg` (189 × 293 mm, 1:1, negre =
  tall, vermell = gravat). Comprovat visualment que coincideix amb el DXF
  original: 30 peces, sense miralls.
- Crèdit al `LLEGEIX-ME.md` de les plantilles, enllaç al fil conductor i
  nota docent «en prova» al dossier del braç. `brac.svg` es conserva.

**Mesures clau (del DXF):**

| Element | MeArm | Els nostres | Veredicte |
|---|---|---|---|
| Finestra de servo | 23,0 × 12,4 mm (×2) · 25,2 × 13,0 (×3) | KS0194 22,9 × 12,2 · Starter 22,9 × 12,3 | Hi entren; cal comprovar els forats de les pestanyes |
| Ranura d'encaix | 3,0 mm | DM «3 mm» (2,7-3,2 reals) | **Crític**: decideix el tall de prova |
| Servos | 4 (base, espatlla, colze, pinça) | 3 per alumne/a | Cal comprar-ne (recomanat: 2 MG90S per alumne/a) |
| Força | Kits amb MG90S (≈ 2,2 kg·cm) | KS0194 1,3 · Starter 1,0 kg·cm | Espatlla i colze justos sense MG90S |

**Calendari:** novembre, comprar els MG90S → desembre, prototip (tall,
muntatge cronometrat i prova del pont) → vacances de Nadal, tall per lots
→ s13, inici del T2. Si el prototip no funciona, es manté `brac.svg` i el
dossier actual.

**Si s'adopta, caldrà adaptar:** el dossier (peces, muntatge, cablatge de 4
servos i rúbrica de «3 articulacions»), `T2_brac.ino` i `T2_brac_estats.ino`
(4t servo, p. ex. al D6, i ordres per a l'espatlla), la llista de compra
(09c) i la fabricació del fil conductor.

## Contingència (el pla actual, sense esborrar res)

Si el tall no és a punt per a la s13 o el muntatge gradual s'endarrereix més
d'una sessió → es torna al **pla actual**: fabricació concentrada a la S4 de
SA4, gastant la primera retallada. Tot el que hi ha documentat ara es manté
com a «Pla B».

## Decisió oberta: individual o per parella

| | Individual (5 braços) | Per parella (2-3 braços) |
|---|---|---|
| Material | 5 jocs de servos (els kits ja són per alumne/a), ~5 taulers | Meitat de tall i taulers |
| Codi i avaluació | Cadascú programa el seu braç; R1-R4 individuals | Codi individual sobre un braç compartit: cal torns per provar-lo i el criteri **R1 (fabricació)** passa a ser compartit |
| Encaix amb el curs | Coherent amb «cap lliurable compartit» (decisió del 02-08) | Excepció explícita: caldria dir-ho a la R5 i a la rúbrica del braç |

Recomanació: **individual**. Amb 5 alumnes el cost extra és petit i s'evita
haver de qualificar una peça compartida. Si s'opta per parella, només s'ha de
compartir l'estructura física; el codi, el producte i la prova continuen sent
individuals.

## Fitxers a tocar si s'aprova

`Classes/00_General/00_Fil_conductor_robots.md` (calendari de fabricació),
`Classes/00_General/00_Projecte_T2_Brac.md` (flux de fabricació i taula «Què
hi aporta cada SA»), `Programació didàctica/08_Sequenciacio_temporal_anual.md`
(taula de retallades), `13_SA4`, `14_SA5` i `15_SA6` (nota del fil conductor),
les guies docents de SA4-SA6 i, si cal, la tasca de Classroom del braç.
