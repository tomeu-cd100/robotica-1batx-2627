# SA4 · El meu checklist — Moviment: servos, motors i ponts H

**Nom:** ______________________  **Data:** __________

> 📄 **[Versió PDF per imprimir i omplir a mà](pdf/SA4_checklist_alumnat.pdf)**

> 🧑‍🎓 **Quan toca?** Tingues-lo obert **durant tota la SA** (marca a mesura que avances) i repassa'l **sencer abans d'entregar** — és l'últim pas de l'itinerari.

> Faràs moure el **teu braç MeArm**. ⚠️ Recorda la **massa comuna** i **no alimentis servos ni motors des de l'Arduino**.

## ✅ Abans d'acabar aquesta SA he de…
- [ ] Controlar el **servo de la base** amb `Servo.h` i un potenciòmetre, i **centrar els 4 servos** (pas 0) (S1)
- [ ] Moure un **motor DC** endavant/enrere amb el **pont H** (L298N) i alimentació externa (S2)
- [ ] Completar la **taula de lògica IN1/IN2** i regular la velocitat amb ENA (PWM)
- [ ] Fer que el **braç respongui a l'ultrasons** (objecte a prop → gira i obre) (S3)
- [ ] 🤖 **Muntar el MeArm** als torns de taller: blocs A-B (S1), C-D (S2), E (S3) → [guia de muntatge](../00_General/00_Muntatge_brac_MeArm.md)
- [ ] Trobar i anotar els **angles límit** de cada servo
- [ ] **Dissenyar abans de codificar:** pseudocodi del control d'una articulació al quadern
- [ ] Lliurar **el braç amb potenciòmetres** i defensar-lo 1' → *R1, R2 i R3* (S4)
- [ ] Tenir el **quadern tècnic** al dia (per què cal un pont H, què és la massa comuna, angles límit, un error resolt)

## 🚦 Com vaig? (pinta el teu nivell)
| Ja sé… | 🔴 Encara no | 🟡 A mitges | 🟢 Sí |
|---|---|---|---|
| Controlar la posició d'un servo dins del seu rang segur i la velocitat d'un motor | | | |
| Muntar el circuit amb seguretat (massa comuna, alimentació externa) | | | |
| Fer que el braç respongui a un sensor | | | |
| Muntar i cablejar el meu MeArm | | | |

## 🆘 Si m'encallo
Segueixo **DEPURA**: **D**escriu · **E**xamina · **P**rova una hipòtesi cada cop · **U**bica · **R**epara · **A**punta. Comprovo la **massa comuna** i que els servos i el motor **no** s'alimenten del 5V de l'Arduino. Encara encallat? **[Targeta de rescat](../00_General/00_Targetes_rescat.md)** (començo per la 🟢).

> Tens dos o més 🔴? Repassa el material i demana ajuda. La **versió nucli** (les quatre articulacions es mouen sense forçar cap topall) ja és assoliment satisfactori.
