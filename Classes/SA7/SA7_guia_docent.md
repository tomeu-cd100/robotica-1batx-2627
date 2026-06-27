# SA7 · Guia docent — Robòtica mòbil: cinemàtica i trajectòries

**Durada:** 8 h (4 sessions) · **Maquinari:** Placa **Imagina 3dBot (Arduino)** + sensors de línia (IR) i de distància (ultrasons) · **Llenguatge:** C/C++
**Referència:** `Programació didàctica/16_SA7_Robotica_mobil.md` · **Esquemes:** `SA7_esquemes_connexions.md`

## Objectius de la SA
1. Programar el moviment d'un robot mòbil (endavant, gir, aturada) amb **control diferencial**.
2. Dissenyar i programar **trajectòries** (quadrat, recorregut definit).
3. Implementar un **comportament autònom** (seguir línia o evitar obstacles).
4. **Provar, mesurar i iterar** per millorar la fiabilitat.

## ⚙️ Abans de començar (important)
La **Imagina 3dBot** és Arduino-compatible, però **els pins dels motors depenen del model**. A l'inici de cada `.ino` hi ha un bloc `// === PINS (AJUSTAR) ===` amb constants per als motors esquerre/dret. **Cal posar-hi els pins reals segons el manual de la placa** abans de pujar el codi. La **lògica no s'ha de tocar**.

## Material per parella/equip
- Imagina 3dBot muntat (motors, rodes, bateria), cable de programació.
- Sensors de línia IR i sensor d'ultrasons (segons dotació de la placa).
- **Circuit de proves** a terra: pista amb línia negra i recorregut amb obstacles.

## Codi de suport (`codi/`)
| Fitxer | Contingut |
|---|---|
| `01_moviment_basic.ino` | Funcions `endavant`, `enrere`, `gira_dreta`, `gira_esquerra`, `atura`. |
| `02_trajectoria_quadrat.ino` | Recórrer un quadrat (calibratge de gir). |
| `03_evita_obstacles.ino` | Comportament reactiu amb ultrasons. |
| `04_seguidor_linia.ino` | Seguidor de línia amb sensors IR. |

---

## SESSIÓ 1 (2 h) — Moviment i cinemàtica diferencial
- **Activació (10'):** *"Com gira un robot que no té volant?"* → **cinemàtica diferencial** (velocitat de cada roda).
- **Modelatge (25'):** `01_moviment_basic.ino`. Ajust dels pins; funcions de moviment; per què girar = rodes a velocitats/sentits diferents.
- **Pràctica guiada (35'):** ajusten els pins, proven endavant/enrere/girs.
- **Repte (40'):** seqüència de moviments (p. ex. "balla"); **+ repte:** ajustar velocitats per anar recte (compensar desviació).
- **Tancament (10'):** quadern (taula de funcions i efecte).

**Punt clau:** en un robot diferencial, **les dues rodes a la mateixa velocitat = recte**; **velocitats/sentits diferents = gir**. Cal calibrar perquè vagi recte de debò.

---

## SESSIÓ 2 (2 h) — Trajectòries programades
- **Activació (10'):** *"Com fa per girar exactament 90°?"*
- **Modelatge (25'):** `02_trajectoria_quadrat.ino`. Trajectòria = seqüència de moviments + temps; **calibratge** del temps de gir de 90°.
- **Pràctica guiada (35'):** recorren un quadrat; mesuren l'error i ajusten el temps de gir.
- **Repte (40'):** recorregut amb forma definida (triangle, "L"); **+ repte:** tornar al punt de sortida.
- **Tancament (10'):** quadern (temps de gir calibrat).

**Punt clau:** el control per **temps** és senzill però poc precís (depèn de bateria/superfície). Per això més endavant s'usa **realimentació** (sensors) → connexió amb SA6.

---

## SESSIÓ 3 (2 h) — Evitar obstacles (comportament reactiu)
- **Activació (10'):** *"Com sobreviu un robot en un entorn desconegut?"*
- **Modelatge (25'):** `03_evita_obstacles.ino`. Bucle percepció→decisió→acció amb ultrasons; estratègia (si a prop → girar).
- **Pràctica guiada (35'):** proven el robot en un recorregut amb obstacles.
- **Repte (40'):** millorar l'estratègia (girar a un costat aleatori, retrocedir abans de girar); **+ repte:** combinar amb la distància (com més a prop, gir més tancat).
- **Tancament (10'):** quadern (diagrama de la decisió).

**Punt clau:** és un **control en llaç tancat** (el sensor decideix l'acció). L'estratègia es pot modelar com una **màquina d'estats** (SA6).

---

## SESSIÓ 4 (2 h) — Seguidor de línia + repte de pista
- **Activació (10'):** *"Com segueix una línia un robot industrial (AGV)?"*
- **Modelatge (25'):** `04_seguidor_linia.ino`. Lectura dels sensors IR; lògica de correcció (si es desvia, corregir cap a la línia).
- **Pràctica guiada (35'):** calibren i proven el seguidor a la pista.
- **Repte de pista (40'):** completar el recorregut autònom; **mesurar temps**; iterar per millorar; **+ repte:** correcció proporcional (suau).
- **Tancament + autoavaluació (10').**

**Producte:** robot mòbil que completa un repte autònom (seguir línia o evitar obstacles) amb codi modular i **registre d'iteracions de millora**.
**Avaluació:** rúbriques **R1** (codi), **R3** (robot/control), **R4** (documentació).

## Errors freqüents
| Error | Causa | Solució |
|---|---|---|
| El robot no va recte | Motors desiguals | Compensar velocitats; calibrar. |
| Gira més/menys de 90° | Temps de gir no calibrat | Ajustar el temps; superfície i bateria afecten. |
| No detecta la línia | Sensors IR sense calibrar / alçada | Ajustar llindar i distància al terra. |
| Es queda encallat amb l'obstacle | Estratègia massa simple | Retrocedir abans de girar; gir més ampli. |
