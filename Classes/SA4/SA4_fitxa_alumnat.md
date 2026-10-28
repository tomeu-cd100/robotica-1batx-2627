# SA4 · Fitxa base — Moviment: servos, motors i ponts H · *fes que les coses es moguin*

<!-- web:only-github -->

**Nom:** ______________________  **Data:** __________

<!-- /web:only-github -->

> Faràs moure el **teu braç robòtic MeArm**: el muntaràs bloc a bloc i cada pràctica s'hi farà a sobre. També faràs girar un motor DC amb pont H (per al rover del T3). Recorda la **massa comuna** i **no alimentar servos ni motors des de l'Arduino**.

## 🎯 Objectius i avaluació

**En acabar aquesta SA podré:**
1. Controlar la **posició d'un servo** fent servir una **llibreria** (`Servo.h`), dins del seu **rang segur**.
2. Moure un **motor DC** en els dos sentits amb **pont H** i alimentació segura (font externa + massa comuna).
3. Fer que el **braç respongui a un sensor** (l'ultrasons).
4. **Muntar i cablejar** el MeArm i controlar-ne les quatre articulacions.

| Què lliuro | Rúbrica | On compta |
|---|---|---|
| **El braç amb potenciòmetres** (producte, S4) + defensa d'1' | **R1**, **R2** i **R3** | Projectes (45 %) |
| **Quadern tècnic** (pseudocodi, lògica del pont H, angles límit, errors) | **R4** | Quadern tècnic i pràctiques (25 %) |
| Mini-check individual (inici S4) | semàfor | **No qualifica** (em situa) |

> 🪜 **Versió nucli (ja és assoliment satisfactori):** les quatre articulacions es mouen amb els seus potenciòmetres sense forçar cap topall. **Versió completa:** angles límit mesurats i anotats, zona morta ajustada (el braç no tremola) i el braç agafa un objecte i el deixa en un altre lloc.

> Escala de nota 0-10, rúbriques i tot el sistema: **[Com s'avalua la matèria](../00_General/00_Avaluacio_per_alumnat.md)**.

> ✍️ **Rutina de la SA:** cada sessió amb pràctica comença amb un **kata de 10 minuts**: escriure de zero (individual, amb apunts) el bloc central del programa del dia, ABANS d'obrir el codi donat. Si ningú no el projecta, reclameu-lo! El dia del mini-check, el mini-check fa de kata.

---

## Les activitats · al Google Classroom

Aquesta fitxa es respon **en línia**, a la tasca de Google Classroom (val **10 punts**). **No cal que la responguis d'entrada**: cada activitat porta el seu **enunciat dins de la tasca**, i l'**itinerari de la portada de la SA** et diu quina toca a cada sessió. Obre-la quan comencis a treballar-hi i ves-la responent a mesura que avances:

> 👉 **[Obre la tasca: SA4 · Fitxa base (Google Classroom)](https://classroom.google.com/c/ODY4ODU4Njk0NTEy/a/ODcwNTEzNjkxNjIy/details)**

Si la tasca encara no t'apareix al Classroom, és que la SA encara no ha començat. En aquesta pàgina hi tens els **objectius i l'avaluació** (a dalt) i la rutina **DEPURA** (a sota).

<!-- web:only-github -->

## El que has de fer

### 1 · Servomotor (S1)
0. **PREDIU:** mirant `01_servo_potenciometre.ino`, què farà el servo de la base en girar el potenciòmetre? ______________________
1. Munta el servo de la base (senyal al pin 9). Carrega i comprova la predicció.
2. Rang d'angles de `write()`: de ____ a ____ graus.
3. Funció que reescala 0-1023 → 0-180: `__________`
4. **Repte:** vaivé automàtic (escombrada). Guarda'l: el faràs servir per calibrar la pinça.
5. **Taller:** pas 0 (els 4 servos a 90°, etiquetats) i blocs A-B del MeArm.

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
5. **Taller:** blocs C-D del MeArm (pinça + calibratge amb l'escombrada de la S1). Angles on la pinça és **tancada** ____° i **oberta** ____°.

> 💡 Si t'encalles amb les funcions, parteix de l'**esquelet** de la secció «Si t'encalles» de la [pàgina de la pràctica del motor](codi/02_motor_pont_h/EXPLICACIO.md): el `loop()` ja les crida en ordre; tu omples cada funció amb els `digitalWrite` (sentit) i `analogWrite` (velocitat).

### 3 · Del sensor al braç (S3)
0. **PREDIU:** amb `03_ultrasons_brac.ino`, què farà el braç amb la mà a 10 cm? I a 30 cm? ______________________
1. Connecta l'ultrasons al **D7/D8** (TRIG/ECHO) i omple la taula mirant el Serial Plotter:

| Objecte a… | Distància mesurada (cm) | Què fa el braç |
|---|---|---|
| 5 cm | | |
| 15 cm (just al llindar) | | |
| 30 cm | | |

2. **Repte:** obertura de la pinça **proporcional** a la distància amb `map()` + guarda de seguretat a ____ cm.
3. **Taller:** bloc E del MeArm (estructura central; el pas 15, en parella).

### 4 · Producte: el braç amb potenciòmetres (S4)

> ✏️ **Dissenya abans de codificar:** pseudocodi del control d'una articulació al quadern (3–5 línies) **abans** d'obrir l'editor. El codi de les sessions és **referència de consulta**, no plantilla per retocar: escriu el teu a partir del pseudocodi i el [diagrama de flux](SA4_diagrama_flux.md).

El MeArm amb quatre potenciòmetres, cada servo dins del seu rang segur.

| Servo | Pin | Angle mínim | Angle màxim |
|---|---|---|---|
| Base | D9 | ____° | ____° |
| Esquerre | D6 | ____° | ____° |
| Dret | D10 | ____° | ____° |
| Pinça | D11 | ____° (tancada) | ____° (oberta) |

- Zona morta triada: ____° · Per què? ______________________
- **Defensa (1'):** funcionament + una decisió tècnica (per què aquests angles límit). S'avalua amb **R1**, **R2** i **R3**.

<!-- /web:only-github -->

## Producte · El braç amb potenciòmetres
Es fa a la **S4**: el teu MeArm, muntat, cablejat i controlat amb **quatre potenciòmetres**, sense que cap servo forci el topall. Escriu primer el **pseudocodi** al quadern (3–5 línies). **Defensa d'1'**: funcionament + per què has triat aquests angles límit. S'avalua amb **R1**, **R2** i **R3**.

## Si t'encalles (DEPURA)
> **D**escriu · **E**xamina · **P**rova una hipòtesi cada cop · **U**bica · **R**epara · **A**punta-ho. Comprova la **massa comuna** i que els servos i el motor **no** s'alimenten del 5V de l'Arduino. Encara encallat? **[Targeta de rescat](../00_General/00_Targetes_rescat.md)** (comença per la 🟢).

<!-- web:only-github -->

## M'autoavaluo (Insuficient · Suficient/Bé · Notable · Excel·lent — la nota és 0-10)
| Criteri | Insuficient | Suficient/Bé | Notable | Excel·lent |
|---|---|---|---|---|
| Controlo la posició d'un servo dins del seu rang segur i la velocitat d'un motor | ☐ | ☐ | ☐ | ☐ |
| Munto el circuit amb seguretat (massa comuna, alimentació externa) | ☐ | ☐ | ☐ | ☐ |
| Faig que el braç respongui a un sensor | ☐ | ☐ | ☐ | ☐ |
| He muntat i cablejat el meu MeArm | ☐ | ☐ | ☐ | ☐ |

## Quadern tècnic

> 📓 Escriu-ho a la teva entrada del **[quadern tècnic](../00_General/00_Quadern_tecnic.md)** (guia + plantilla; compta el 25 %).
- **Per què cal un pont H / driver?** _________________________________
- **Què és la massa comuna i per què és important?** ___________________
- **Els angles límit del meu braç i com els he trobat:** _______________
- **Un error i com l'he resolt:** _____________________________________

<!-- /web:only-github -->

> 📌 **Vols més?** +[Reptes ⭐](../../Reptes/Reptes_SA4.md) (botó de casa, braç dispensador, registre i replay), revisió creuada de codi, exit ticket, pensament computacional i ODS → **[SA4_fitxa_ampliada.md](SA4_fitxa_ampliada.md)**

> 🤖 **El robot del trimestre:** tot el que fas en aquesta SA és el teu **braç MeArm**. Calendari de muntatge, mapa de pins i rúbrica: **[dossier del braç](../00_General/00_Projecte_T2_Brac.md)** · pas a pas: **[guia de muntatge](../00_General/00_Muntatge_brac_MeArm.md)**.
