# 2026-10-24 · Alternativa: construir el braç durant tot el 2n trimestre

**Estat:** proposta pendent de validar pel docent. No s'ha tocat cap document
del curs fora de la correcció de «parella» a `08_Sequenciacio_temporal_anual.md`.

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

**Pendent per al setembre (maquinari real):** validar el pont. La micro:bit
treu 3,3 V i l'UNO llegeix un HIGH a partir de 3 V, així que el marge és
just. Si falla, el **pla B** és tornar a cablejar a la micro:bit, i el
**pla C** és el braç amb potenciòmetres per cable, sense ràdio.

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
