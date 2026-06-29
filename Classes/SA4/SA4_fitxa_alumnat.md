# SA4 · Fitxa base — Moviment: servos, motors i ponts H

**Nom:** ______________________  **Parella:** ______________________  **Data:** __________

> Faràs moure el sistema: posició amb servo i velocitat/direcció amb motor DC. Recorda la **massa comuna** i **no alimentar motors des de l'Arduino**.

---

## El que has de fer

### 1 · Servomotor (S1)
0. **PREDIU:** mirant `01_servo_potenciometre.ino`, què farà el servo en girar el potenciòmetre? ______________________
1. Munta el servo (senyal al pin 9). Carrega i comprova la predicció.
2. Rang d'angles de `write()`: de ____ a ____ graus.
3. Funció que reescala 0-1023 → 0-180: `__________`
4. **Repte:** vaivé automàtic 0↔180.

### 2 · Motor DC i pont H (S2)
1. Munta el motor amb el L298N (ENA=5, IN1=7, IN2=8) i **alimentació externa**.
2. Completa la lògica del pont H:

| IN1 | IN2 | Resultat |
|---|---|---|
| HIGH | LOW | |
| LOW | HIGH | |
| LOW | LOW | |

3. Com es regula la **velocitat**? Per quin pin? ______________________
4. **Repte:** funcions `endavant(vel)`, `enrere(vel)`, `atura()`.

### 3 · Del sensor al moviment (S3)
1. Connecta l'ultrasons i fes que la **velocitat depengui de la distància**:

| Distància | Velocitat (0-255) |
|---|---|
| > 30 cm | |
| 15-30 cm | |
| < 15 cm | |

2. **Repte:** atura el motor sota un llindar de seguretat: ____ cm.

### 4 · Producte: barrera automàtica (S4)
Barrera que s'obre quan arriba un vehicle i es tanca sola.
- Angle tancat: ____° · obert: ____° · temps obert: ____ s · detecció: ____ cm
- **Defensa (1'):** funcionament + una aplicació real. S'avalua amb **R1**, **R2** i **R3**.

## Si t'encalles (DEPURA)
> **D**escriu · **E**xamina · **P**rova una hipòtesi cada cop · **U**bica · **R**epara · **A**punta-ho. Comprova la **massa comuna** i que el motor **no** s'alimenta del 5V de l'Arduino.

## M'autoavaluo (NA/AS/AN/AE)
| Criteri | NA | AS | AN | AE |
|---|---|---|---|---|
| Controlo la posició d'un servo i la velocitat d'un motor | ☐ | ☐ | ☐ | ☐ |
| Munto el circuit amb seguretat (massa comuna, alimentació externa) | ☐ | ☐ | ☐ | ☐ |
| Faig que el moviment respongui a un sensor | ☐ | ☐ | ☐ | ☐ |

## Quadern tècnic
- **Per què cal un pont H / driver?** _________________________________
- **Què és la massa comuna i per què és important?** ___________________
- **Un error i com l'he resolt:** _____________________________________

> 📌 **Vols més?** +Reptes (ventilador, braç dispensador, rampa d'acceleració), rols, coavaluació, exit ticket, pensament computacional i ODS → **[SA4_fitxa_ampliada.md](SA4_fitxa_ampliada.md)**
