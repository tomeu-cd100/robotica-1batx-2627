# 🚗 Projecte T3 · El rover autònom

> **Per a qui és?** Per a cada parella durant el 3r trimestre. És el dossier
> del tercer robot del curs: peces, muntatge, cablatge i rúbrica. Els reptes
> de SA7, SA8 i SA9 hi van sumant capacitats; aquí es veu el conjunt.

**Durada:** 3r trimestre (SA7-SA9) · **Maquinari:** UNO + breadboard, L298N, 2 motoreductors + rodes KS9008, roda boja, HC-SR04, 2 seguidors de línia KS0050, sensor de col·lisió KS0021, micro:bit + OLED KS0271, portapiles 6×AA, caixa DM 3 mm de 2 pisos

## El robot

El rover és un xassís de DM 3 mm de **dos pisos**: al **pis inferior** hi ha
els dos **motoreductors** amb rodes, la **roda boja** de suport i el pont H
**L298N**; al **pis superior** hi ha l'Arduino **UNO**, el sensor
d'ultrasons **HC-SR04** mirant endavant i, a SA8, la **micro:bit**. És el
mateix comportament autònom que ja feia la Imagina 3dBot a SA7 —seguir línia,
evitar obstacles—, però ara **construït i conegut per dins**: cada parella
sap exactament on va cada cable perquè l'ha cablejat ella mateixa.

L'avantatge clau de tenir un rover propi és que els **pins són idèntics per
a tota l'aula**: el bloc `// === PINS (AJUSTAR) ===` que porten tots els
`.ino` de SA7 es fixa **una sola vegada** amb la taula de cablatge d'aquest
dossier, i ja no es torna a tocar en tot el trimestre.

```
   PIS SUPERIOR                    PIS INFERIOR
  ┌───────────────────┐           ┌───────────────────┐
  │  [ UNO+breadboard ]│           │  motor·L   ...  motor·R
  │  (micro:bit, SA8)  │           │     (KS9008, dos costats)
  │                    │           │                    │
  │ [HC-SR04] ← davant │           │   [L298N]  [roda boja]
  └───────────────────┘           └───────────────────┘
        ↑ separadors M3 uneixen els dos pisos
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
| Plaques de DM (pis inferior + pis superior) | Plantilla `rover.svg`, tall làser | 2 |
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
| Brides | Material del centre | segons muntatge |
| Separadors M3 (uneixen els dos pisos) | Material del centre | 4 |
| Cargols M3 | Material del centre | segons muntatge |

<!-- web:only-github -->
Plantilla de tall làser: [`../../Recursos/plantilles_laser/rover.svg`](../../Recursos/plantilles_laser/rover.svg).
Peces impreses en 3D: [`../../Recursos/peces_3d/roda_boja.scad`](../../Recursos/peces_3d/roda_boja.scad),
[`../../Recursos/peces_3d/suport_hcsr04.scad`](../../Recursos/peces_3d/suport_hcsr04.scad).
<!-- /web:only-github -->

## Fabricació i personalització

A diferència de la mascota, el `rover.svg` **no té zona de gravat lliure**:
són dues plaques funcionals (pis inferior amb forats per als motors i la
roda boja, pis superior amb forat per al suport de l'HC-SR04) que totes les
parelles tallen igual. El **pis superior** porta una zona vermella reservada
perquè cada parella hi **gravi el nom** del seu rover; res més es toca.

Flux de fabricació:
1. Cada parella prepara el nom del seu rover (la zona de gravat del pis
   superior) al **tancament del 2n trimestre** (~20 min) o de casa, i el
   docent el valida **abans de la sessió 0**.
2. El docent llança el tall de `rover.svg` per **lots** durant la sessió 0
   del trimestre (nesting de diverses parelles per tauler).
3. Cada parella recull el seu joc de dues plaques i la roda boja i el
   suport de l'HC-SR04 impresos prèviament.
4. Muntatge sencer a la mateixa sessió (sessió 0, vegeu més avall).
5. El full de cua públic per màquina (parella · fitxer · estat) es manté
   igual que per als altres robots del curs.

## Muntatge

1. Munta els **dos motoreductors** amb les rodes KS9008 als laterals del
   **pis inferior**, i la **roda boja** (`roda_boja.scad` + canica de
   16 mm) al centre-davant, com a tercer punt de suport.
2. Cargola el **L298N** al pis inferior, a prop dels motors, amb els
   cables prou llargs per arribar als separadors.
3. Uneix el **pis superior** al pis inferior amb els **4 separadors M3**,
   deixant espai per passar els cables entre pisos.
4. Fixa la **breadboard amb l'Arduino UNO** al pis superior, amb els ports
   accessibles per una obertura lateral.
5. Cargola el **suport de l'HC-SR04** (`suport_hcsr04.scad`) al davant del
   pis superior, amb el sensor mirant endavant.
6. Enganxa els **dos seguidors de línia KS0050** sota el pis inferior,
   mirant a terra, un a l'esquerra i un a la dreta del centre.
7. Munta el **sensor de col·lisió** (para-xocs) al davant, per sobre de
   l'HC-SR04, orientat perquè detecti un xoc frontal.
8. Cablatge complet segons la taula de baix; comprova totes les connexions
   **abans** d'alimentar els motors.
9. Fixa el **portapiles 6×AA** al pis inferior amb brides, amb els cables
   accessibles cap al L298N.

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
| 15-60' | Xassís: motors, roda boja i unió dels dos pisos amb els separadors. |
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
> canviant només el bloc `// === PINS (AJUSTAR) ===`.
