# SA7 · Fitxa base — Robòtica mòbil · *com es mou i gira un robot*

<!-- web:only-github -->

**Nom:** ______________________  **Equip:** ______________________  **Data:** __________

<!-- /web:only-github -->

> Ara el robot es mou sol! Programaràs moviment, trajectòries i comportaments autònoms. Recorda **ajustar els pins** segons la teva placa.

## 🎯 Objectius i avaluació

**En acabar aquesta SA podré:**
1. Programar **moviments i trajectòries** d'un robot (girar = rodes a velocitats diferents).
2. Aconseguir un **comportament autònom**: evitar obstacles o seguir una línia.
3. **Calibrar i millorar iterant**, registrant cada intent (temps, canvis, resultat).

| Què lliuro | Rúbrica | On compta |
|---|---|---|
| **Comportament autònom** demostrat a la pista | **R1** i **R3** | Projectes (45 %) |
| **Registre d'iteracions** (intents, millores) | **R3** i **R4** | Projectes (45 %) |
| **Quadern tècnic** (calibratges, decisions, errors) | **R4** | Quadern tècnic i pràctiques (25 %) |
| Mini-check individual (inici S4) | semàfor | **No qualifica** (em situa) |

> 🪜 **Versió nucli (ja és assoliment satisfactori):** el robot completa **un** comportament autònom (evitar obstacles **o** seguir la línia), encara que lent, amb el registre d'almenys 2 iteracions. **Versió completa:** comportament robust i calibrat, amb 3+ iteracions documentades i millores mesurades.

> Escala de nota 0-10, rúbriques i tot el sistema: **[Com s'avalua la matèria](../00_General/00_Avaluacio_per_alumnat.md)**.

---

## Les activitats · al Google Classroom

Aquesta fitxa es respon **en línia**, a la tasca de Google Classroom (val **10 punts**). **No cal que la responguis d'entrada**: cada activitat porta el seu **enunciat dins de la tasca**, i l'**itinerari de la portada de la SA** et diu quina toca a cada sessió. Obre-la quan comencis a treballar-hi i ves-la responent a mesura que avances:

> 👉 **[Obre la tasca: SA7 · Fitxa base (Google Classroom)](https://classroom.google.com/c/ODY4ODU4Njk0NTEy/a/ODcwNTE4MDMwMTA4/details)**

Si la tasca encara no t'apareix al Classroom, és que la SA encara no ha començat. En aquesta pàgina hi tens els **objectius i l'avaluació** (a dalt) i la rutina **DEPURA** (a sota).

<!-- web:only-github -->

## El que has de fer

### 1 · Moviment i cinemàtica (S1)
0. **PREDIU:** mirant les funcions de `01_moviment_basic.ino`, què farà `gira_dreta()`? ______________________
1. Ajusta el bloc de pins i comprova. Pins:

| Motor esq. dir/vel | Motor dret dir/vel |
|---|---|
| | |

2. Per girar a la dreta, la roda esquerra ha d'anar __________ que la dreta.
3. **Repte:** seqüència de "ball".

### 2 · Trajectòries (S2)
1. **Full de càlcul previ** (abans de provar res!):
   - Diàmetre de la roda D = ____ cm → perímetre = π·D = ____ cm/volta.
   - El robot recorre 1 m en ____ s → velocitat = ____ cm/s.
   - Gir de 90° sobre si mateix: cada roda fa un arc = (π·L)/4 (L = distància entre rodes = ____ cm) → temps **teòric** de gir = ____ s.
2. Recorre un **quadrat** amb `02_trajectoria_quadrat.ino`. Gir de 90° **calibrat** = ______ ms. Diferència amb el teòric = ______ ms. A què creus que es deu? ____________
3. Quant s'allunya del punt inicial després d'una volta? ______ cm. Per què? ____
4. **Repte:** triangle o forma "L".

### 3 · Evita-obstacles (S3)
1. Carrega `03_evita_obstacles.ino`. A quina distància gira? ______ cm.
2. Dibuixa la **decisió** (percepció → acció).
3. **Repte:** millora l'estratègia (retrocedir, gir aleatori).

> 💡 Si t'encalles amb el cicle, parteix de l'**esquelet** de la secció «Si t'encalles» de la [pàgina de la pràctica de l'evita-obstacles](codi/03_evita_obstacles/EXPLICACIO.md): les funcions de moviment i `distancia()` ja estan fetes i provades; tu omples el `loop()` amb percepció → decisió → acció.

### 4 · Seguidor de línia + repte de pista (S4)
1. Calibra els sensors: valor "línia" = ______ / "fons" = ______
2. Temps de volta — intent 1: ____ s · 2: ____ s · 3: ____ s
3. Quines **millores** has fet entre intents? ______________________

> ✏️ **Un repte a full en blanc:** tria **un** dels reptes d'aquesta SA i escriu-lo amb l'**editor buit**: només el teu pseudocodi i el full-xuleta de crides (`motors()`, `dist()`…). Sense obrir cap sketch fet. És l'entrenament directe per a la SA9.

**Producte:** comportament autònom + registre d'iteracions. S'avalua amb **R1**, **R3** i **R4**.

<!-- /web:only-github -->

## Producte · Comportament autònom del rover
Es demostra **a la pista (S4)**: un comportament autònom + el **registre d'iteracions** (temps de volta i millores entre intents). S'avalua amb **R1**, **R3** i **R4**.

## Si t'encalles (DEPURA)
> **D**escriu · **E**xamina (què fa el robot de debò) · **P**rova una hipòtesi cada cop · **U**bica · **R**epara · **A**punta-ho. Comprova el bloc `// === PINS (AJUSTAR) ===` i prova **una funció de moviment cada cop**. Encara encallat? **[Targeta de rescat](../00_General/00_Targetes_rescat.md)** (comença per la 🟢).

<!-- web:only-github -->

## M'autoavaluo (Insuficient · Suficient/Bé · Notable · Excel·lent — la nota és 0-10)
| Criteri | Insuficient | Suficient/Bé | Notable | Excel·lent |
|---|---|---|---|---|
| Programo moviment amb funcions (control diferencial) | ☐ | ☐ | ☐ | ☐ |
| El robot completa un comportament autònom | ☐ | ☐ | ☐ | ☐ |
| Registro proves i itero per millorar | ☐ | ☐ | ☐ | ☐ |

## Quadern tècnic

> 📓 Escriu-ho a la teva entrada del **[quadern tècnic](../00_General/00_Quadern_tecnic.md)** (guia + plantilla; compta el 25 %).
- **Què és la cinemàtica diferencial?** _______________________________
- **Per què el control per temps no és precís?** ______________________
- **Una millora que ha funcionat:** ___________________________________

<!-- /web:only-github -->

> 📌 **Vols més?** +Reptes (repartidor, explorador, gir proporcional), rols, coavaluació, exit ticket, pensament computacional i ODS → **[SA7_fitxa_ampliada.md](SA7_fitxa_ampliada.md)**

> 🤖 **Cap al robot del trimestre:** tota aquesta SA la treballes sobre el teu **rover**, muntat a la sessió 0. Cinemàtica, trajectòries i comportaments autònoms són el control del robot del trimestre — consulta el **[dossier del rover](../00_General/00_Projecte_T3_Rover.md)** per a pins i cablatge.
