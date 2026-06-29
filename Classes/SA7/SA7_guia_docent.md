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

## Mètode de projecte i continuïtat
- **Cicle de treball** (com a tot el curs): *analitzar → dissenyar → prototipar → provar → millorar* (vegeu SA1). Aquí la fase **provar → millorar** és central: el repte de pista s'**itera** mesurant temps i errors.
- **Lectura de codi amb PRIMM:** a cada *modelatge* l'alumnat **prediu** què farà el robot **abans** d'executar-lo, després l'**investiga**, el **modifica** i en **crea** un de nou. **Operativa (val per a totes les sessions amb codi):** dedica els primers ~5' del Modelatge a projectar/llegir el codi nou **sense executar-lo** i recollir prediccions del comportament del robot; només després, executa i investiga.
- **Pont (d'on venim / on anem):** ve de la **SA6** (control: llaç tancat i màquines d'estats) → portem a la **SA8** (IoT i IA). L'evita-obstacles i el seguidor de línia són **control en llaç tancat** (SA6) aplicat al moviment.

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

### Mapa d'avaluació (traçabilitat)
| Instrument | Què evidencia | Criteri | Rúbrica |
|---|---|---|---|
| Demostració a la pista | Comportament autònom (trajectòria/línia/obstacles) | CA4.1 | R3 |
| Codi del robot | Funcions de moviment, lògica de comportament | CA1.1, CA3.1 | R1, R3 |
| Quadern (proves i iteracions) | Calibratge, mesura d'errors i millores documentades | CA4.1 | R4 |
| Observació del procés | Treball d'equip, ús segur del robot a la pista | CA4.1 | R4 |

*(CA1.1 = programar en C/C++; CA3.1 = control (llaç tancat); CA4.1 = programar un robot mòbil amb trajectòries i comportaments autònoms. Vegeu `Programació didàctica/06_Avaluacio_criteris_qualificacio.md`. Comparteix R1, R3 i R4 **abans** de començar.)*

## Errors freqüents
| Error | Causa | Solució |
|---|---|---|
| El robot no va recte | Motors desiguals | Compensar velocitats; calibrar. |
| Gira més/menys de 90° | Temps de gir no calibrat | Ajustar el temps; superfície i bateria afecten. |
| No detecta la línia | Sensors IR sense calibrar / alçada | Ajustar llindar i distància al terra. |
| Es queda encallat amb l'obstacle | Estratègia massa simple | Retrocedir abans de girar; gir més ampli. |

---

## Guió de modelatge (què verbalitzar)

> Frases i preguntes clau per al **Modelatge** de cada sessió (què mirar, què preguntar abans d'executar, error a anticipar).

- **S1 · `01_moviment_basic` (cinemàtica diferencial):** **AVÍS previ:** ajusta els **pins del model** abans de pujar res. Explica el gir amb les mans (dues rodes): *mateixa velocitat = recte; diferent = gir*. Demana predir què fa amb una roda més ràpida. *Error a anticipar:* no va recte per motors desiguals (cal calibrar).
- **S2 · `02_trajectoria_quadrat`:** el gir **per temps** és imprecís (depèn de bateria i superfície). Demana **mesurar l'error** del gir de 90° i calibrar. *Error a anticipar:* esperar precisió del control per temps.
- **S3 · `03_evita_obstacles`:** és **percepció → decisió → acció** (llaç tancat, SA6). Demana predir l'estratègia quan detecta un obstacle. *Error a anticipar:* estratègia massa simple → es queda encallat.
- **S4 · `04_seguidor_linia`:** calibra el **llindar dels sensors IR** segons la pista. Demana **iterar mesurant el temps** de volta. *Error a anticipar:* no detecta la línia per alçada/llindar mal ajustats.

## Atenció a la diversitat (DUA)

| Via | Mesura |
|---|---|
| **Bastida** (qui s'encalla) | Provar **una funció de moviment cada cop** abans de la trajectòria; donar el bloc de pins ja ajustat; equips heterogenis amb rols clars. |
| **+ Ampliació** (qui va sobrat) | Gir proporcional a la proximitat, correcció suau del seguidor, tornar al punt de sortida; reptes ⭐ de `Reptes/Reptes_SA7.md`. |
| **Representació múltiple** | Diagrama de decisió (percepció→acció), demostració física, vídeo de les iteracions. |
| **Implicació** | Cada equip tria l'estratègia i el repte de pista; competició amistosa per temps. |

## Treball cooperatiu amb rols

Equips amb **rols rotatius**: Coordinador/a (estratègia) · Programador/a · Enginyer/a de maquinari (pins, robot, sensors) · Pilot/a–Documentador/a (prova a la pista, cronometra, quadern). Quadre per rotar a la fitxa.

## Pensament computacional i depuració

- **PC d'aquesta SA:** **algorismes** (lògica del seguidor/evita-obstacles) i **descomposició** (moviment en funcions).
- **Depuració:** rutina **DEPURA**; com que el robot és físic, l'*Examina* és **observar el comportament real** i el calibratge (temps de gir, llindar IR).

## Avaluació formativa (instruments)

- **Diana d'autoavaluació** (fitxa) · **Coavaluació** entre equips (demostració) · **Exit ticket** de tancament.
- El **registre d'iteracions** (temps de volta per intent) és en si mateix avaluació formativa del cicle provar→millorar.

## Referent (coeducació)

> **Daniela Rus** — directora del CSAIL del MIT, referent mundial en **robòtica mòbil i autònoma** i sistemes distribuïts (eixams de robots, vehicles autònoms).
>
> *Connexió amb la SA:* és exactament el que feu aquí —fer que un robot es mogui i **decideixi sol**—, a escala de recerca. Pregunta: *quins reptes té un vehicle autònom que el vostre seguidor de línia ja insinua?*

## Connexió amb la IA (llavor)

> Llavor conceptual de **2–3'** (eix A del curs; vegeu `../00_IA_a_la_materia.md`). Lliga directament amb el referent (Daniela Rus, vehicles autònoms).

El vostre robot evita obstacles i segueix línia amb **regles programades** (`if` sobre sensors IR/ultrasons). Un cotxe autònom real fa el mateix tipus de decisions, però amb **IA**: **aprèn** a reconèixer vianants, senyals i carrils a partir de **milions d'exemples** (visió per computador).

> *"El vostre seguidor de línia segueix una regla. Un Tesla **aprèn** a veure la carretera. Quina diferència hi ha? Què passa si apareix una situació que **no** era a les dades d'entrenament?"*

**Idea clau:** comportament **programat** (regles que escrivim) vs **après** (patrons que el model dedueix de dades). Bo per debatre límits i seguretat. *(Suport: vídeo curt descarregat de conducció autònoma — vegeu Pla B a `Simulacions/Wokwi/README.md`.)*

## Context real i ODS

- **Context:** vehicles autònoms, AGV de logística, robots de repartiment.
- **ODS 9** (indústria i innovació) i **ODS 11** (mobilitat urbana sostenible).
