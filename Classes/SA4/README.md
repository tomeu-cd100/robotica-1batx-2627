# SA4 · Moviment: servos, motors i ponts H

Quarta situació d'aprenentatge (**8 h · 4 sessions**, 2n trimestre). El sistema **es mou**, i el que es mou és el **teu braç robòtic MeArm**: cada pràctica de la SA s'hi fa a sobre i, al final de cada sessió, hi afegeixes un tros en el **torn de taller**. Aprens el **servomotor** (posició), el **motor DC amb pont H** (pràctica curta, per al rover del T3), l'**ultrasons → moviment** i `millis()`. En acabar, el braç es mou amb **quatre potenciòmetres**. Maquinari: Arduino UNO + 4 servos + potenciòmetres + ultrasons + MeArm ([dossier del braç](../00_General/00_Projecte_T2_Brac.md)). Programació oficial: [`Programació didàctica/13_SA4_Moviment_servos_motors.md`](../../Programació%20didàctica/13_SA4_Moviment_servos_motors.md).

![Servo controlat amb un potenciòmetre: la posició del comandament fixa l'angle del servo](img/sa4-servo-potenciometre.svg)

## 📦 Què has d'entregar

| Quan | Lliurable | On es lliura |
|---|---|---|
| S1 | [Activitat 1 · Servomotor](SA4_fitxa_alumnat.md#1-servomotor-s1) | [Tasca de Classroom](https://classroom.google.com/c/ODY4ODU4Njk0NTEy/a/ODcwNTEzNjkxNjIy/details) |
| S2 | [Activitat 2 · Motor DC i pont H](SA4_fitxa_alumnat.md#2-motor-dc-i-pont-h-s2) | Mateixa tasca de Classroom |
| S3 | [Activitat 3 · Del sensor al braç](SA4_fitxa_alumnat.md#3-del-sensor-al-brac-s3) | Mateixa tasca de Classroom |
| S4 | [Activitat 4 · Producte: el braç amb potenciòmetres](SA4_fitxa_alumnat.md#4-producte-el-brac-amb-potenciometres-s4) | Mateixa tasca de Classroom |
| ⭐ | [Repte triat (A, B o C)](../../Reptes/Reptes_SA4.md) | El docent el valida i pinteu l'estrella al [tauler de reptes](../00_General/00_Tauler_reptes.md) |
| 📓 | Full del quadern tècnic de cada sessió | En paper, en acabar la sessió |
| 🤖 | El MeArm muntat (blocs A-E) i cablejat amb els seus angles límit | Torns de taller de les S1-S4: [guia de muntatge](../00_General/00_Muntatge_brac_MeArm.md) i [dossier del braç](../00_General/00_Projecte_T2_Brac.md) |

## Itinerari per sessions

> La teva feina és a la **[fitxa base](SA4_fitxa_alumnat.md)**. Aquesta ruta et diu què toca fer a cada sessió i què necessites en aquell moment. Les respostes de la fitxa es lliuren a la **[tasca de Classroom](https://classroom.google.com/c/ODY4ODU4Njk0NTEy/a/ODcwNTEzNjkxNjIy/details)**.

1. **Sessió 1 · El servomotor (la base del braç)** — fes l'[Activitat 1 de la fitxa](SA4_fitxa_alumnat.md#1-servomotor-s1). **Taller (35'):** pas 0 i blocs A-B de la [guia de muntatge](../00_General/00_Muntatge_brac_MeArm.md).
2. **Sessió 2 · Motor DC i pont H** — fes l'[Activitat 2](SA4_fitxa_alumnat.md#2-motor-dc-i-pont-h-s2), amb els [esquemes de connexió](SA4_esquemes_connexions.md) (compte amb la massa comuna!). És una pràctica curta, fora del braç. **Taller (40'):** blocs C-D (pinça i calibratge).
3. **Sessió 3 · Del sensor al braç** — fes l'[Activitat 3](SA4_fitxa_alumnat.md#3-del-sensor-al-brac-s3), amb el [codi](codi/). **Taller (45'):** bloc E, l'estructura central.
4. **Sessió 4 · Producte: el braç amb potenciòmetres** — fes l'[Activitat 4](SA4_fitxa_alumnat.md#4-producte-el-brac-amb-potenciometres-s4), amb el [diagrama de flux](SA4_diagrama_flux.md) (s'avalua amb R1, R2, R3 parcial). **Taller:** cablatge definitiu.
5. **Abans d'entregar** — repassa [el meu checklist](SA4_checklist_alumnat.md).

### Si vols més

- [Fitxa ampliada](SA4_fitxa_ampliada.md) — aprofundiment i ampliacions.
- [Reptes de la SA4](../../Reptes/Reptes_SA4.md) — tria el teu context.

<!-- web:only-github -->
## Contingut

| Fitxer | Descripció |
|---|---|
| [`SA4_guia_docent.md`](SA4_guia_docent.md) | Guia del professorat: objectius, 4 sessions, mètode de projecte, mapa d'avaluació i errors freqüents. |
| [`SA4_fitxa_alumnat.md`](SA4_fitxa_alumnat.md) | **Fitxa base** (nucli d'una cara, per a tot l'alumnat): Activitats 1-4 + quadern. |
| [`SA4_fitxa_ampliada.md`](SA4_fitxa_ampliada.md) | **Versió ampliada** (aprofundiment): totes les rutines (revisió creuada de codi, exit ticket, ODS, PC) i ampliacions. |
| [`SA4_checklist_docent.md`](SA4_checklist_docent.md) | **Checklist docent** (una cara): logística prèvia, punts de control per sessió, avaluació i diversitat. |
| [`SA4_checklist_alumnat.md`](SA4_checklist_alumnat.md) | **Checklist alumnat** (una cara): què he de fer/lliurar + autoavaluació amb semàfor. |
| [`SA4_katas.md`](SA4_katas.md) | Katas d'escriptura (10'): un per sessió de codi, abans d'obrir el sketch; si ningú no el projecta, l'alumnat l'obre sol. |
| [`SA4_katas_solucions.md`](SA4_katas_solucions.md) | **Solucions dels katas** (docent): codi resolt amb els valors de la variació + comentaris per a la posada en comú. |
| [`SA4_esquemes_connexions.md`](SA4_esquemes_connexions.md) | Esquemes i connexions (servo, L298N, ultrasons al braç, braç amb 4 potenciòmetres, massa comuna, piles). |
| `codi/` | Sketches d'Arduino (vegeu la taula següent). |

### Codi (`codi/`)

| Sketch | Què mostra |
|---|---|
| `01_servo_potenciometre.ino` | Llibreria `Servo.h`; el servo de la base del braç controlat per potenciòmetre (i el pas 0: centrar els servos). |
| `02_motor_pont_h.ino` | Motor DC (fora del braç): direcció (`IN1`/`IN2`) i velocitat (PWM a `ENA`), amb funcions pròpies (amb esquelet «Si t'encalles» a la seva pàgina). |
| `03_ultrasons_brac.ino` | L'ultrasons de l'estació de recollida fa girar la base i obrir la pinça (percepció → moviment). |
| `04_brac_potenciometres.ino` | **Producte:** el MeArm amb 4 potenciòmetres, rang segur per servo i zona morta. |
| `05_dos_servos_millis.ino` | **Bastida (opcional, 10')**: base i pinça a ritmes diferents **sense `delay()`** (patró `millis()`). Prepara la **màquina d'estats de la SA6**. |

Cada sketch té la seva **pàgina de pràctica** a la web (per què es fa + codi explicat per blocs); a GitHub, l'explicació és a l'`EXPLICACIO.md` de la carpeta del sketch.

<!-- /web:only-github -->

## Producte i avaluació

- **Producte:** el braç MeArm muntat i controlat amb quatre potenciòmetres, dins dels seus angles límit.
- **Criteris:** CA1.1, CA2.1, CA3.1 · **Rúbriques:** **R1** (codi), **R2** (circuit), **R3** parcial (control).

## Continuïtat

Ve de la **SA3** (sensors) i porta a la **SA5** (micro:bit i MicroPython, **canvi de plataforma i llenguatge**), on el braç guanya un **comandament per ràdio**. El control sensor → moviment d'aquí és la llavor del **control** del braç (SA6); el pont H, de la **robòtica mòbil** (SA7).

> 🧩 **Pont cap a SA6 (recomanat):** si queda marge, fes la bastida [`05_dos_servos_millis`](codi/05_dos_servos_millis/EXPLICACIO.md) (10') per **practicar `millis()` no bloquejant abans** de la màquina d'estats del braç.
