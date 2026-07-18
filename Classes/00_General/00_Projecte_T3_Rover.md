# 🚗 Projecte T3 · El rover autònom

> **Per a qui és?** Per a cada parella durant el 3r trimestre. És el dossier
> del tercer robot del curs: peces, muntatge, cablatge i rúbrica. Els reptes
> de SA7, SA8 i SA9 hi van sumant capacitats; aquí es veu el conjunt.

**Durada:** 3r trimestre (SA7-SA9) · **Maquinari:** UNO + breadboard, L298N, 2 motoreductors + rodes KS9008, roda boja, HC-SR04, 2 seguidors de línia KS0050, sensor de col·lisió KS0021, micro:bit + OLED KS0271, portapiles 6×AA, caixa DM 3 mm de 2 pisos

## El robot

El rover és un xassís de DM 3 mm amb **encaixos tallats a làser** (disseny
d'Antonio Romero, provat en tall real — vegeu el crèdit a la llista de
peces): el cos porta els dos **motoreductors** amb rodes als suports
d'encaix, la **roda boja** de suport darrere i, fixats amb brides o velcro,
el pont H **L298N**, l'Arduino **UNO** amb la breadboard i el **portapiles**.
L'**HC-SR04** mira endavant al seu suport imprès i, a SA8, s'hi afegeix la
**micro:bit**. És el mateix comportament autònom que ja feia la Imagina
3dBot a SA7 —seguir línia, evitar obstacles—, però ara **construït i conegut
per dins**: cada parella sap exactament on va cada cable perquè l'ha
cablejat ella mateixa.

L'avantatge clau de tenir un rover propi és que els **pins són idèntics per
a tota l'aula**: el bloc `// === PINS (AJUSTAR) ===` que porten tots els
`.ino` de SA7 es fixa **una sola vegada** amb la taula de cablatge d'aquest
dossier, i ja no es torna a tocar en tot el trimestre.

```
              XASSÍS (vista de dalt)
  ┌────────────────────────────────────┐
  │ [HC-SR04] ← davant                 │
  │  motor·L ═╣          ╠═ motor·R    │   ← suports de motor amb ENCAIXOS
  │   [ UNO+breadboard ]  [L298N]      │   ← fixats amb brides/velcro
  │   [ portapiles 6xAA ]              │
  │        (micro:bit, SA8)            │
  │            [roda boja] ← darrere   │
  └────────────────────────────────────┘
   sota: 2 seguidors de línia KS0050 mirant a terra
```

Què fa: a **SA7** és la **plataforma** dels reptes de trajectòria, evitar
obstacles i seguidor de línia (els mateixos tres reptes que abans es feien
amb la Imagina 3dBot, ara amb el rover propi); a **SA8** guanya
**telemetria per ràdio** des d'una micro:bit al pis superior cap a una
micro:bit base amb pantalla OLED; a **SA9** el rover és la plataforma del
**repte final i la competició** de fi de curs.

## Llista de peces

| Peça | Origen | Quantitat |
|---|---|---|
| Xassís de DM amb encaixos (disseny d'**Antonio Romero**, geometria provada) | Plantilla `xassis_rover_ARomero.svg`, tall làser | 1 planxa |
| Roda boja (per a canica 16 mm) | `roda_boja.scad`, impressió 3D | 1 |
| Suport frontal HC-SR04 | `suport_hcsr04.scad`, impressió 3D | 1 |
| Canica de 16 mm (per a la roda boja) | Material del centre | 1 |
| Motoreductor + roda KS9008 | Kit 2 | 2 |
| Pont H L298N | Compra de centre | 1 |
| Sensor d'ultrasons HC-SR04 | Kit 2 | 1 |
| Seguidor de línia KS0050 | Kit 2 (un per alumne de la parella) | 2 |
| Sensor de col·lisió KS0021 (para-xocs) | Kit 2 | 1 |
| Portapiles 6×AA | Material del centre | 1 |
| Arduino UNO + breadboard petita | Kit 1 | 1 |
| Brides i velcro (fixació de l'electrònica al xassís) | Material del centre | segons muntatge |
| Cargols M3 | Material del centre | segons muntatge |

<!-- web:only-github -->
Plantilla de tall làser (xassís oficial): [`../../Recursos/plantilles_laser/xassis_rover_ARomero.svg`](../../Recursos/plantilles_laser/xassis_rover_ARomero.svg)
(alternativa de 2 pisos, no provada: [`../../Recursos/plantilles_laser/rover.svg`](../../Recursos/plantilles_laser/rover.svg)).
Peces impreses en 3D: [`../../Recursos/peces_3d/roda_boja.scad`](../../Recursos/peces_3d/roda_boja.scad),
[`../../Recursos/peces_3d/suport_hcsr04.scad`](../../Recursos/peces_3d/suport_hcsr04.scad).
<!-- /web:only-github -->

> 🏅 **Crèdit del xassís:** disseny d'**Antonio Romero** (2026), del material
> «Vehicle amb micro:bit (II)», derivat del Taller 8 «Prepara't per construir
> el vehicle del futur» del programa **Connectem amb les plaques** (XTEC).
> Llicència del fitxer del xassís: **CC BY-NC-SA 4.0**. És un disseny amb
> **encaixos ja provats en un tall real** — per això el fem servir.

## Fabricació i personalització

El xassís del rover és el disseny **provat** d'Antonio Romero (vegeu el
crèdit de dalt): una planxa de ~132 × 138 mm amb el cos i els **suports de
motor amb encaixos** que es munten sense cola. Les línies de tall **no es
toquen** (els encaixos estan calibrats); la personalització del rover és el
**nom de l'equip**, que es pot gravar en una zona lliure del cos o
retolar-hi després del tall.

L'electrònica del curs (UNO + breadboard petita, L298N i portapiles) **no va
cargolada**: es fixa amb **brides i velcro** sobre el xassís — les posicions
definitives es decideixen amb el xassís tallat a la mà (l'espai és just i
val més adaptar-se al muntatge real que fixar forats a cegues).

Flux de fabricació:
1. Cada parella prepara el gravat o retolació del nom al **tancament del 2n
   trimestre** (~20 min) o de casa, i el docent el valida **abans de la
   sessió 0**.
2. El docent llança el tall de `xassis_rover_ARomero.svg` per **lots**
   durant la sessió 0 del trimestre (nesting de diverses parelles per
   tauler).
3. Cada parella recull el seu xassís i la roda boja i el suport de
   l'HC-SR04 impresos prèviament.
4. Muntatge sencer a la mateixa sessió (sessió 0, vegeu més avall).
5. El full de cua públic per màquina (parella · fitxer · estat) es manté
   igual que per als altres robots del curs.

## Muntatge

1. Encaixa el **xassís** seguint la guia de muntatge del disseny original
   (els suports de motor s'encaixen al cos, sense cola).
2. Munta els **dos motoreductors** amb les rodes KS9008 als suports
   d'encaix, i la **roda boja** (`roda_boja.scad` + canica de 16 mm) al
   darrere, com a tercer punt de suport.
3. Fixa el **L298N** amb brida o velcro, a prop dels motors.
4. Fixa la **breadboard amb l'Arduino UNO** i el **portapiles 6×AA** amb
   brides o velcro, amb els ports de la UNO accessibles i els cables de
   piles arribant al L298N.
5. Munta el **suport de l'HC-SR04** (`suport_hcsr04.scad`) al davant, amb
   el sensor mirant endavant.
6. Enganxa els **dos seguidors de línia KS0050** sota el xassís, mirant a
   terra, un a l'esquerra i un a la dreta del centre.
7. Munta el **sensor de col·lisió** (para-xocs) al davant, per sobre de
   l'HC-SR04, orientat perquè detecti un xoc frontal.
8. Cablatge complet segons la taula de baix; comprova totes les connexions
   **abans** d'alimentar els motors.

> ⚠️ **GND comú:** és l'error més freqüent del rover. Les piles alimenten
> el L298N i el L298N alimenta la UNO (5 V); si el **GND** de les piles, el
> L298N, la UNO i els sensors no estan tots units, els motors o les
> lectures d'ultrasons fallen de manera intermitent i difícil de diagnosticar.

## Cablatge

| Component | Pin | Notes |
|---|---|---|
| L298N ENA (velocitat motor esquerre) | D5 | PWM (`~`). |
| L298N IN1 (direcció motor esquerre) | D4 | Digital. |
| L298N IN2 (direcció motor esquerre) | D3 | Digital. |
| L298N ENB (velocitat motor dret) | D6 | PWM (`~`). |
| L298N IN3 (direcció motor dret) | D7 | Digital. |
| L298N IN4 (direcció motor dret) | D8 | Digital. |
| HC-SR04 TRIG | D12 | Digital, sortida. |
| HC-SR04 ECHO | D11 | Digital, entrada. |
| Seguidor de línia esquerre (KS0050) | A0 | Entrada analògica/digital segons mòdul. |
| Seguidor de línia dret (KS0050) | A1 | Entrada analògica/digital segons mòdul. |
| Sensor de col·lisió (para-xocs, KS0021) | D2 | Digital. |

**Alimentació:** portapiles **6×AA** al L298N (motors) · sortida de **5 V**
del L298N a l'Arduino UNO (no alimentar la UNO per USB quan els motors van)
· **GND comú** entre piles, L298N, UNO i tots els sensors.

## Sessió 0 de muntatge (2 h)

Sessió prèvia a l'inici de SA7, dedicada íntegrament a construir el rover
abans de programar-lo:

| Temps | Què es fa |
|---|---|
| 0-15' | Repartiment de peces per parella i comprovació que hi és tot (llista de peces de dalt). |
| 15-60' | Xassís: encaixos del cos, motors, roda boja i fixació de l'electrònica amb brides/velcro. |
| 60-90' | Cablatge complet amb la taula d'aquest dossier (L298N, HC-SR04, seguidors, para-xocs, alimentació amb GND comú). |
| 90-120' | Test de fum: puja un sketch de prova (motors endavant/enrere + lectura d'ultrasons per Serial) i comprova que respon abans de tancar la sessió. |

El sketch de prova és el mateix `01_moviment_basic.ino` de SA7
(`Classes/SA7/codi/01_moviment_basic/`), amb el bloc
`// === PINS (AJUSTAR) ===` ja fixat amb els pins d'aquest dossier: aquesta
sessió és quan cada parella ajusta aquest bloc **una sola vegada** i no el
torna a tocar en tot el trimestre.

## Què hi aporta cada SA

| SA | Sessions | Què s'hi construeix | Repte relacionat |
|---|---|---|---|
| SA7 | S1-S4 | Cinemàtica diferencial, trajectòries, evitar obstacles (ultrasons) i seguidor de línia (IR): el rover **és** la plataforma de la SA. | `Reptes_SA7.md` |
| SA8 | S1-S4 | Micro:bit al pis superior: telemetria per ràdio (distància, estat del rover) cap a una micro:bit base amb pantalla OLED KS0271; MPU6050 opcional com a ampliació. | `Reptes_SA8.md` |
| SA9 | — | Repte final i competició amb el mateix rover; al juny, desmuntatge i retorn de l'electrònica als kits. | [`README de la SA9`](../SA9/README.md) |

**Producte final (SA9):** el rover autònom capaç de completar el repte final
i la competició de fi de curs, amb telemetria per ràdio funcionant.

## Rúbrica del robot (avaluada dins el producte de SA9, dimensió «Projectes i productes»)

| Criteri | Insuficient (0-4) | Suficient/Bé (5-6) | Notable (7-8) | Excel·lent (9-10) |
|---|---|---|---|---|
| **R1 · Fabricació i robustesa** | El rover no aguanta la competició (es desmunta o deixa de respondre). | Aguanta la competició amb algun retoc d'última hora. | Aguanta la competició sense retocs, cablatge endreçat. | Aguanta la competició sense retocs, cablatge endreçat i etiquetat, res solt. |
| **R2 · Comportaments autònoms** | No segueix línia ni evita obstacles de manera fiable. | Segueix línia **o** evita obstacles, amb errors freqüents. | Segueix línia **i** evita obstacles, amb algun error puntual. | Segueix línia i evita obstacles de manera fiable i fluida. |
| **R3 · Telemetria** | No arriben dades per ràdio a la base. | Arriben dades bàsiques, de manera intermitent. | Arriben dades de manera fiable i es mostren a l'OLED. | Telemetria fiable, ben etiquetada i útil per seguir l'estat del rover en directe. |
| **R4 · Documentació tècnica** | Sense esquema ni codi comentat. | Esquema o codi comentat, no els dos. | Esquema i codi comentat, sense diari de proves. | Esquema, codi comentat i diari de proves que explica el procés de calibratge. |

## Problemes freqüents

| Símptoma | Causa probable | Solució |
|---|---|---|
| Un motor gira al revés | IN1/IN2 (o IN3/IN4) invertits al cablatge o al codi. | Inverteix el parell de pins de direcció corresponent al motor afectat. |
| El rover no avança recte | PWM desigual entre ENA i ENB (els dos motors no reben la mateixa velocitat). | Calibra els valors de PWM de cada motor per compensar la diferència. |
| El L298N s'escalfa | Normal amb moderació sota càrrega; si és excessiu, piles fluixes. | Comprova el nivell de les piles 6×AA; deixa refredar entre proves llargues. |
| Lectures d'ultrasons erràtiques | GND no comú entre HC-SR04, UNO i L298N, o cable massa llarg. | Uneix tots els GND i escurça el cablatge del sensor si cal. |
| La UNO es reinicia en moure els motors | Alimentada per USB en lloc dels 5 V del L298N. | Alimenta la UNO des del L298N, mai per USB, quan els motors funcionen. |

> **Pla B:** si un rover no arriba muntat a temps per a la SA7 (fabricació
> endarrerida) o no arriba viu a SA9 (avaria), la parella passa a la Imagina
> 3dBot o al xassís de reserva del Kit 2; els `.ino` són els mateixos
> canviant només el bloc `// === PINS (AJUSTAR) ===`. Si el xassís
> d'encaixos no anés bé amb la nostra electrònica, hi ha l'alternativa de
> **2 pisos** (`rover.svg`, del generador propi, pendent de tall de prova).

---

⬅️ Torna al teu camí: [SA7 (itinerari per sessions)](../SA7/README.md) · [Reptes de la SA7](../../Reptes/Reptes_SA7.md) · [Reptes de la SA8](../../Reptes/Reptes_SA8.md) · [El fil conductor dels tres robots](00_Fil_conductor_robots.md)
