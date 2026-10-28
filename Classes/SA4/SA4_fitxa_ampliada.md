# SA4 · Fitxa ampliada (aprofundiment) — Moviment: servos, motors i ponts H

> 📄 **Versió ampliada**: conté totes les activitats, rutines (revisió creuada, exit ticket, ODS…) i ampliacions. La fitxa que fa **tot l'alumnat** és la base: **[SA4_fitxa_alumnat.md](SA4_fitxa_alumnat.md)**.

> 🧑‍🎓 **Quan toca obrir-la?** És **opcional**: quan portis la **fitxa base al dia** i vulguis més (ampliacions, revisió creuada, pensament computacional). Algunes rutines (revisió creuada, exit ticket) les activarà el **docent** a l'aula quan toqui.

> 🗺️ **Quan s'usa cada apartat:** les **Activitats 1–4** segueixen les mateixes sessions que la fitxa base (aquí amb més detall i ampliacions) · **Si t'encalles** i **Pensament computacional**: durant el treball · **Vols més?**: amb el nucli al dia · **Exit ticket**: els últims 2' de cada sessió · **Diana**, **Revisió creuada** i **Quadern tècnic**: en tancar la SA · **Context real i ODS**: quan el docent l'activi.

**Nom:** ______________________  **Data:** __________

> Faràs moure el **teu braç MeArm**: cada activitat s'hi fa a sobre i, en el torn de taller, hi afegeixes un bloc. També faràs girar un motor DC amb pont H (per al rover del T3). Recorda la **massa comuna** i **no alimentar servos ni motors des de l'Arduino**.

---

## Activitat 1 · Servomotor (S1)
0. **PREDIU** (abans d'executar): mirant `01_servo_potenciometre.ino`, què creus que farà el servo de la base en girar el potenciòmetre? ____________________
1. Munta el servo de la base (senyal al pin 9). Carrega `01_servo_potenciometre.ino` i **comprova** la predicció.
2. Quin rang d'angles accepta `write()`? de ____ a ____ graus.
3. Controla l'angle amb el potenciòmetre. Quina funció reescala 0-1023 → 0-180? `__________`
4. **Repte:** vaivé automàtic (escombrada). **+ Repte:** dos servos coordinats (base i pinça).
5. **Taller:** pas 0 (els 4 servos a 90°) i blocs A-B del MeArm. Per què cal centrar els servos **abans** de posar les banyes? ______________________

## Activitat 2 · Motor DC i pont H (S2)
1. Munta el motor amb el L298N (ENA=5, IN1=7, IN2=8) i **alimentació externa**.
2. Completa la taula de la lògica del pont H:

| IN1 | IN2 | Resultat |
|---|---|---|
| HIGH | LOW | |
| LOW | HIGH | |
| LOW | LOW | |

3. Com es regula la **velocitat**? Per quin pin? __________________________
4. **Repte:** funcions `endavant(vel)`, `enrere(vel)`, `atura()`.
5. **Taller:** blocs C-D del MeArm. Pinça tancada a ____° i oberta a ____°. Quina dent has hagut de girar la banya? ______

## Activitat 3 · Del sensor al braç (S3)
1. Connecta l'ultrasons de l'estació de recollida (TRIG=7, ECHO=8) i carrega `03_ultrasons_brac.ino`.
2. Completa mirant el Serial Plotter:

| Objecte a… | Distància mesurada (cm) | Què fa el braç |
|---|---|---|
| 5 cm | | |
| 15 cm (just al llindar) | | |
| 30 cm | | |

3. Què passa quan l'objecte és **just al llindar**? Per què? ______________________
4. **Repte:** obertura de la pinça proporcional a la distància (`map()`) + guarda de seguretat a ____ cm. **+ Repte:** la bastida [`05_dos_servos_millis`](codi/05_dos_servos_millis/EXPLICACIO.md) (dues articulacions alhora amb `millis()`).

## Activitat 4 · Producte: el braç amb potenciòmetres (S4)
El MeArm amb quatre potenciòmetres, cada servo dins del seu rang segur.

| Servo | Pin | Angle mínim | Angle màxim | Com l'he trobat |
|---|---|---|---|---|
| Base | D9 | ____° | ____° | |
| Esquerre | D6 | ____° | ____° | |
| Dret | D10 | ____° | ____° | |
| Pinça | D11 | ____° | ____° | |

- Zona morta: ____° · Què passa amb 0? I amb 10? ______________________
- **Esquema** (dibuixa o enganxa): ______________________
- **Defensa (1'):** explica el funcionament i una decisió tècnica (per què aquests angles límit).

**Autoavaluació** (situa't; la nota és 0-10):
| Criteri | Nivell |
|---|---|
| El codi de control és modular i comentat (R1) | ☐ NA ☐ AS ☐ AN ☐ AE |
| El muntatge és segur (massa comuna, alimentació externa) (R2) | ☐ NA ☐ AS ☐ AN ☐ AE |
| El braç es mou suau i dins dels angles límit (control) (R3) | ☐ NA ☐ AS ☐ AN ☐ AE |

---

## Treballes sol/a… però no aïllat/da

El muntatge, el codi i el producte són **teus**: els fas i els lliures tu. Això no vol dir treballar en silenci:

- apunta al quadern **qui t'ha ajudat i a qui has ajudat** (i com);
- abans de tancar el producte, fes la **revisió creuada de codi** de més avall.

> Si el professor t'ajunta puntualment amb algú (material que falla, un repte massa gros), repartiu-vos només dos papers: **qui escriu** i **qui verifica**, i intercanvieu-los a mitja sessió. Cadascú documenta el seu al quadern.

---

## Si t'encalles

1. **Pista 1:** comprova la **massa comuna** (GND de l'Arduino unit al − de les piles).
2. **Pista 2:** verifica que els servos i el motor **no** s'alimenten des del pin 5V de l'Arduino; revisa els pins amb el [mapa del braç](../00_General/00_Projecte_T2_Brac.md#cablatge).
3. **Pista 3:** aplica la **rutina DEPURA** i demana ajuda **explicant què ja has provat**.

> **DEPURA:** **D**escriu · **E**xamina · **P**rova una hipòtesi cada cop · **U**bica · **R**epara · **A**punta-ho.

## Vols més?

- **Reptes ⭐:** [`Reptes/Reptes_SA4.md`](../../Reptes/Reptes_SA4.md) (braç amb límits, braç dispensador, registre i replay).
- **Simulació interactiva (Wokwi):** servo a [`SA4_esquemes_connexions.md`](SA4_esquemes_connexions.md) (el motor/pont H va amb maquinari real).

---

## Pensament computacional d'aquesta SA

Treballes la **DESCOMPOSICIÓ del moviment** (partir una tasca en passos: girar → baixar → tancar la pinça → pujar) i l'**ABSTRACCIÓ** amb funcions (`llegeixAngle()`, `mouSiCal()`, `endavant()`…): una funció, quatre articulacions. Quina tasca del braç has dividit en passos? ______________________

## Diana d'autoavaluació

Situa't (0-10):

| Criteri | Insuficient | Suficient/Bé | Notable | Excel·lent |
|---|---|---|---|---|
| Controlo la posició d'un servo i la velocitat d'un motor | ☐ | ☐ | ☐ | ☐ |
| Munto el circuit amb seguretat (massa comuna, alimentació externa) | ☐ | ☐ | ☐ | ☐ |
| Faig que el braç respongui a un sensor | ☐ | ☐ | ☐ | ☐ |
| He muntat i cablejat el meu MeArm | ☐ | ☐ | ☐ | ☐ |

## Revisió creuada de codi

Prova el braç i llegeix el codi d'un company (i ell/a farà el mateix amb el teu). **Primer mira'ls amb criteris de les rúbriques R1, R2 i R3** (marca ✓ o ✗):

| Criteri | ✓/✗ |
|---|---|
| Cap servo **força el topall** i el braç no tremola — R3 | |
| Els servos van a les **piles** amb **massa comuna** — R2 | |
| El control d'una articulació està **encapsulat en funcions** amb nom clar — R1 | |

Ara escriu-li el retorn — **ha de sortir de la taula**:
- Codi revisat de: ______________________
- 💡 Una millora concreta: ______________________
- ❓ Un dubte (què no has entès o li preguntaries): ______________________

## Exit ticket (abans de marxar)

1. Una cosa que he après avui: ______________________
2. Una cosa que encara no tinc clara: ______________________
3. On ho faria servir al món real: ______________________

## Context real i ODS

Els braços robòtics mouen el món físic: cadenes de muntatge, cirurgia, pròtesis de mà, robots que ajuden a menjar persones amb mobilitat reduïda. **ODS 9** (indústria i innovació) i **ODS 10** (reduir desigualtats: robòtica assistencial i accessibilitat). Quina tasca podria fer el teu braç per ajudar una persona amb mobilitat reduïda? ______________________

---

## Quadern tècnic (SA4)
- **Per què cal un pont H / driver?** ____________________________________
- **Què és la massa comuna i per què és important?** ____________________
- **Els angles límit del meu braç i com els he trobat:** _________________
- **Error trobat i solució:** ___________________________________________
