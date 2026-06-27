# SA4 · Guia docent — Moviment: servos, motors i ponts H

**Durada:** 7-8 h (4 sessions; la 4a amb ampliacions opcionals) · **Maquinari:** Arduino UNO + servo SG90 + motor DC + driver/pont H (L298N) · **Llenguatge:** C/C++
**Referència:** `Programació didàctica/13_SA4_Moviment_servos_motors.md` · **Esquemes:** `SA4_esquemes_connexions.md`

## Objectius de la SA
1. Controlar la **posició** d'un servo i la **velocitat/direcció** d'un motor DC.
2. Comprendre per què cal un **driver (pont H)** i una **alimentació externa**.
3. Usar llibreries (`Servo.h`) i estructurar el control en **funcions**.
4. Relacionar entrada (sensor/potenciòmetre) amb moviment (control).

## Material per parella
- Arduino UNO + USB, protoboard, cables.
- Servo SG90, motor DC, mòdul driver **L298N** (o pont H del kit), portapiles/alimentació externa (4×AA o font), potenciòmetre, sensor d'ultrasons.

## Codi de suport (`codi/`)
| Fitxer | Contingut |
|---|---|
| `01_servo_potenciometre.ino` | Servo controlat per potenciòmetre. |
| `02_motor_pont_h.ino` | Motor DC: direcció + velocitat (PWM) amb L298N. |
| `03_sensor_velocitat.ino` | Ultrasons regula la velocitat del motor. |
| `04_barrera_automatica.ino` | Producte: barrera amb servo activada per sensor. |

## Mètode de projecte i continuïtat
- **Cicle de treball** (com a tot el curs): *analitzar → dissenyar → prototipar → provar → millorar* (vegeu SA1). El **producte** n'és el recorregut complet i el **quadern tècnic** el documenta.
- **Lectura de codi amb PRIMM:** a cada *modelatge* l'alumnat **prediu** què farà el sketch **abans** d'executar-lo, després l'**investiga**, el **modifica** i en **crea** un de nou.
- **Pont (d'on venim / on anem):** ve de la **SA3** (sensors) → portem a la **SA5** (micro:bit + MicroPython, **canvi de plataforma i llenguatge**). El control sensor→moviment d'aquí és la llavor del **control** (SA6) i la **robòtica mòbil** (SA7).

---

## SESSIÓ 1 (2 h) — El servomotor
- **Activació (10'):** *"Com es controla l'angle exacte d'un braç robòtic?"*
- **Modelatge (25'):** `01_servo_potenciometre.ino`. Llibreria `Servo.h`, `attach()`, `write(angle)` (0-180°). Diferència servo ↔ motor DC.
- **Pràctica guiada (35'):** munten el servo; el mouen a angles fixos; després el controlen amb el potenciòmetre (`map(0-1023 → 0-180)`).
- **Repte (40'):** "escombrada" automàtica (vaivé 0↔180) suau; **+ repte:** dos servos coordinats.
- **Tancament (10'):** quadern (esquema + codi).

**Punt clau:** el servo es controla per posició (angle); s'alimenta a 5 V però si en mous diversos cal **alimentació externa** (no des del pin 5V de l'Arduino).

---

## SESSIÓ 2 (2 h) — Motor DC i pont H
- **Activació (10'):** *"Per què no puc connectar un motor directament a un pin?"* → corrent i protecció.
- **Modelatge (30'):** `02_motor_pont_h.ino`. Funcionament del **pont H** (L298N): `IN1`/`IN2` (direcció), `ENA` (velocitat per PWM). **Massa comuna** entre Arduino i alimentació del motor.
- **Pràctica guiada (30'):** munten el motor amb L298N i alimentació externa; gir endavant/enrere; control de velocitat.
- **Repte (40'):** funcions `endavant(vel)`, `enrere(vel)`, `atura()`; seqüència de moviments; **+ repte:** rampa d'acceleració.
- **Tancament (10'):** quadern.

**Punt clau:** un pin d'Arduino dona poc corrent → el **driver** amplifica. **Sempre** unir el GND de l'Arduino amb el GND de l'alimentació del motor (massa comuna). Mai alimentar el motor des del pin 5V.

---

## SESSIÓ 3 (2 h) — Del sensor al moviment
- **Activació (10'):** *"Com fa un robot per frenar quan s'acosta a una paret?"*
- **Modelatge (25'):** `03_sensor_velocitat.ino`. Integració: l'ultrasons mesura distància → `map()` → velocitat del motor (percepció→acció).
- **Pràctica guiada (35'):** connecten ultrasons + motor; com més a prop, més lent.
- **Repte (40'):** aturar el motor per sota d'un llindar de seguretat; **+ repte:** invertir el sentit segons distància.
- **Tancament (10'):** quadern (taula distància→velocitat).

**Punt clau:** la sortida (moviment) depèn de l'entrada (sensor) → primer pas cap al **control** (SA6) i la robòtica mòbil (SA7).

---

## SESSIÓ 4 (2 h) — Producte: barrera automàtica
- **Activació (10'):** presentació del repte.
- **Pràctica (70'):** `04_barrera_automatica.ino`. Barrera amb **servo** que s'obre quan l'ultrasons detecta un vehicle a prop i es tanca passat un temps, amb LED indicador. Cada parella personalitza temps i angles.
- **Documentació + defensa (30'):** esquema, codi comentat, mini-defensa.
- **Tancament (10'):** autoavaluació.

**Producte:** mecanisme motoritzat controlat per sensor (barrera, braç o ventilador regulable).
**Avaluació:** rúbriques **R1** (codi), **R2** (circuit), **R3** parcial (control).

### Mapa d'avaluació (traçabilitat)
| Instrument | Què evidencia | Criteri | Rúbrica |
|---|---|---|---|
| Producte (barrera/braç/ventilador) | Control de posició i velocitat sensor→actuador | CA3.1 | R3 (parcial), R1 |
| Repte de codi (funcions de moviment) | `Servo.h`, lògica del pont H, `map()`, funcions | CA1.1 | R1 |
| Quadern tècnic | Esquema del pont H, taula distància→velocitat, errors | CA1.1 | R1 |
| Observació de muntatge segur | Massa comuna, alimentació externa, no alimentar motors des de l'Arduino | CA2.1 | R2 |

*(CA1.1 = programar en C/C++; CA2.1 = dissenyar/muntar circuits amb seguretat; CA3.1 = implementar sistemes de control. Vegeu `Programació didàctica/06_Avaluacio_criteris_qualificacio.md`. Comparteix R1, R2 i R3 **abans** de començar.)*

## Errors freqüents
| Error | Causa | Solució |
|---|---|---|
| El servo vibra/no arriba a l'angle | Alimentació insuficient | Alimentació externa de 5 V; massa comuna. |
| El motor no gira | Falta `ENA` en HIGH/PWM o massa no comuna | Activar `ENA`; unir GND Arduino–driver–piles. |
| L'Arduino es reinicia en moure el motor | Pic de corrent des del 5V | Mai alimentar el motor des de l'Arduino. |
| Gira sempre en el mateix sentit | `IN1`/`IN2` mal posats | Revisar la lògica IN1≠IN2 per a cada sentit. |
