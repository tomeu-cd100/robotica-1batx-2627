# SA4 · Fitxa ampliada (aprofundiment) — Moviment: servos, motors i ponts H

> 📄 **Versió ampliada**: conté totes les activitats, rutines (coavaluació, exit ticket, ODS…) i ampliacions. La fitxa que fa **tot l'alumnat** és la base: **[SA4_fitxa_alumnat.md](SA4_fitxa_alumnat.md)**.

**Nom:** ______________________  **Parella:** ______________________  **Data:** __________

> Faràs moure el sistema: posició amb servo i velocitat/direcció amb motor DC. Recorda la **massa comuna** i **no alimentar motors des de l'Arduino**.

---

## Activitat 1 · Servomotor (S1)
0. **PREDIU** (abans d'executar): mirant `01_servo_potenciometre.ino`, què creus que farà el servo en girar el potenciòmetre? ____________________
1. Munta el servo (senyal al pin 9). Carrega `01_servo_potenciometre.ino` i **comprova** la predicció.
2. Quin rang d'angles accepta `write()`? de ____ a ____ graus.
3. Controla l'angle amb el potenciòmetre. Quina funció reescala 0-1023 → 0-180? `__________`
4. **Repte:** vaivé automàtic 0↔180. **+ Repte:** dos servos coordinats.

## Activitat 2 · Motor DC i pont H (S2)
1. Munta el motor amb el L298N (ENA=5, IN1=7, IN2=8) i **alimentació externa**.
2. Completa la taula de la lògica del pont H:

| IN1 | IN2 | Resultat |
|---|---|---|
| HIGH | LOW | |
| LOW | HIGH | |
| LOW | LOW | |

3. Com es regula la **velocitat**? Per quin pin? __________________________
4. **Repte:** funcions `endavant(vel)`, `enrere(vel)`, `atura()`. **+ Repte:** rampa d'acceleració.

## Activitat 3 · Del sensor al moviment (S3)
1. Connecta l'ultrasons i fes que la **velocitat depengui de la distància**.
2. Completa:

| Distància | Velocitat (0-255) |
|---|---|
| > 30 cm | |
| 15-30 cm | |
| < 15 cm | |

3. **Repte:** atura el motor per sota d'un llindar de seguretat. Llindar: ____ cm.

## Activitat 4 · Producte: barrera automàtica (S4)
Dissenya una barrera que s'obre quan arriba un vehicle i es tanca sola.

- Angle tancat: ____° · Angle obert: ____° · Temps obert: ____ s
- Distància de detecció: ____ cm
- **Esquema** (dibuixa o enganxa): ______________________
- **Defensa (1'):** explica el funcionament i una aplicació real.

**Autoavaluació** (marca el teu nivell — NA/AS/AN/AE):
| Criteri | Nivell |
|---|---|
| El codi de control és modular i comentat (R1) | ☐ NA ☐ AS ☐ AN ☐ AE |
| El muntatge és segur (massa comuna, alimentació externa) (R2) | ☐ NA ☐ AS ☐ AN ☐ AE |
| El sistema respon bé al sensor (control) (R3) | ☐ NA ☐ AS ☐ AN ☐ AE |

---

## Treball en equip · rols de la parella

Repartiu-vos els rols i **roteu-los** a cada sessió:

| Rol | S1 | S2 | S3 | S4 |
|---|---|---|---|---|
| Coordinador/a (temps, enunciat) | | | | |
| Programador/a (codi) | | | | |
| Enginyer/a de maquinari (motor/servo, **massa comuna**, seguretat) | | | | |
| Provador/a–Documentador/a (prova + quadern) | | | | |

---

## Si t'encalles

1. **Pista 1:** comprova la **massa comuna** (GND de l'Arduino unit al GND de l'alimentació del motor).
2. **Pista 2:** verifica que el motor **no** s'alimenta des del pin 5V de l'Arduino; revisa ENA/IN1/IN2.
3. **Pista 3:** aplica la **rutina DEPURA** i demana ajuda **explicant què ja has provat**.

> **DEPURA:** **D**escriu · **E**xamina · **P**rova una hipòtesi cada cop · **U**bica · **R**epara · **A**punta-ho.

## Vols més?

- **Reptes ⭐:** `Reptes/Reptes_SA4.md` (barrera, ventilador, braç dispensador).
- **Simulació interactiva (Wokwi):** servo a `SA4_esquemes_connexions.md` (el motor/pont H va amb maquinari real).

---

## Pensament computacional d'aquesta SA

Treballes la **DESCOMPOSICIÓ del moviment** (partir una tasca en passos: obrir → esperar → tancar) i l'**ABSTRACCIÓ** amb funcions (`endavant()`, `atura()`…). Quina tasca has dividit en passos? ______________________

## Diana d'autoavaluació

Marca el teu nivell (NA/AS/AN/AE):

| Criteri | NA | AS | AN | AE |
|---|---|---|---|---|
| Controlo la posició d'un servo i la velocitat d'un motor | ☐ | ☐ | ☐ | ☐ |
| Munto el circuit amb seguretat (massa comuna, alimentació externa) | ☐ | ☐ | ☐ | ☐ |
| Faig que el moviment respongui a un sensor | ☐ | ☐ | ☐ | ☐ |

## Coavaluació (2 estrelles i un desig)

Intercanvieu la barrera amb una altra parella:
- ⭐ Una cosa ben feta: ______________________
- ⭐ Una altra cosa ben feta: ______________________
- 💡 Una millora (desig): ______________________

## Exit ticket (abans de marxar)

1. Una cosa que he après avui: ______________________
2. Una cosa que encara no tinc clara: ______________________
3. On ho faria servir al món real: ______________________

## Context real i ODS

Els actuadors mouen el món físic: barreres, ascensors, pròtesis, braços robòtics. **ODS 9** (indústria i innovació) i **ODS 10** (reduir desigualtats: robòtica assistencial i accessibilitat). Quin sistema de moviment ajudaria una persona amb mobilitat reduïda? ______________________

---

## Quadern tècnic (SA4)
- **Per què cal un pont H / driver?** ____________________________________
- **Què és la massa comuna i per què és important?** ____________________
- **Error trobat i solució:** ___________________________________________
