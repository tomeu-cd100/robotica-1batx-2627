# SA6 · Guia docent — Sistemes de control: llaç obert/tancat i màquines d'estats

**Durada:** 7-8 h (4 sessions; la 4a amb ampliacions opcionals) · **Maquinari:** Arduino UNO + NTC, LDR, LED/ventilador, polsador, (ultrasons) · **Llenguatge:** C/C++
**Referència:** `Programació didàctica/15_SA6_Sistemes_control.md` · **Esquemes:** `SA6_esquemes_connexions.md`

## Objectius de la SA
1. Distingir i implementar **control en llaç obert i en llaç tancat**.
2. Dissenyar una **màquina d'estats** per a un comportament seqüencial.
3. Implementar una regulació **tot/res (histèresi)** i una **proporcional** bàsica.
4. Representar el sistema amb un **diagrama de blocs**.

## Material per parella
- Arduino UNO + USB, protoboard, cables.
- NTC + resistència 10 kΩ, LDR + 10 kΩ, LED (o petit ventilador via transistor/relé), polsador.

## Codi de suport (`codi/`)
| Fitxer | Contingut |
|---|---|
| `01_llac_obert_vs_tancat.ino` | Comparació dels dos tipus de control. |
| `02_termostat_histeresi.ino` | Control tot/res amb histèresi. |
| `03_maquina_estats.ino` | Màquina d'estats amb `enum`/`switch`. |
| `04_control_proporcional.ino` | Regulació proporcional bàsica. |

## Mètode de projecte i continuïtat
- **Cicle de treball** (com a tot el curs): *analitzar → dissenyar → prototipar → provar → millorar* (vegeu SA1). El **producte** n'és el recorregut complet i el **quadern tècnic** el documenta.
- **Lectura de codi amb PRIMM:** a cada *modelatge* l'alumnat **prediu** què farà el sketch **abans** d'executar-lo, després l'**investiga**, el **modifica** i en **crea** un de nou.
- **Pont (d'on venim / on anem):** ve de la **SA5** (paradigmes de programació) → portem a la **SA7** (robòtica mòbil). El **llaç tancat** i les **màquines d'estats** d'aquí són la base dels **comportaments autònoms** del robot (evitar obstacles, seguir línia).

---

## SESSIÓ 1 (2 h) — Què és un sistema de control?
- **Activació (10'):** *"Per què un aire condicionat no encén i apaga sense parar?"*
- **Modelatge (25'):** conceptes: **consigna, sensor (realimentació), error, actuador**. **Llaç obert** (sense sensor, temporitzat) vs **llaç tancat** (amb sensor). **Diagrama de blocs**.
- **Pràctica guiada (35'):** `01_llac_obert_vs_tancat.ino`; comparen el comportament dels dos modes amb el mateix muntatge.
- **Repte (40'):** dibuixar el diagrama de blocs del seu sistema; identificar entrada/sortida/realimentació; **+ repte:** pensar 3 exemples reals de cada tipus.
- **Tancament (10'):** quadern (diagrama).

**Punt clau:** el **llaç tancat** corregeix segons el que mesura (realimentació); el **llaç obert** "confia" que tot anirà bé.

---

## SESSIÓ 2 (2 h) — Control tot/res i histèresi
- **Activació (10'):** *"Si encenc el ventilador a 25°C i l'apago a 25°C, què passa al voltant de 25°?"* → oscil·lació.
- **Modelatge (25'):** `02_termostat_histeresi.ino`. Control **tot/res** amb dos llindars (**histèresi**) per evitar el parpelleig.
- **Pràctica guiada (35'):** termòstat amb NTC + LED/ventilador i histèresi.
- **Repte (40'):** ajustar la finestra d'histèresi i observar l'efecte; **+ repte:** afegir indicador d'estat (verd/vermell).
- **Tancament (10'):** quadern (gràfic del comportament).

**Punt clau:** la **histèresi** (encendre a un llindar i apagar a un altre) evita commutacions ràpides al voltant de la consigna.

---

## SESSIÓ 3 (2 h) — Màquines d'estats
- **Activació (10'):** *"Com es programa una seqüència amb diversos passos i condicions?"*
- **Modelatge (30'):** `03_maquina_estats.ino`. `enum` d'estats + `switch`; transicions per **temps** o per **esdeveniment** (polsador). Exemple: procés (espera → fase 1 → fase 2 → fet).
- **Pràctica guiada (30'):** implementen la màquina d'estats i la proven.
- **Repte (40'):** afegir un estat nou o una transició condicional; **+ repte:** semàfor adaptatiu (canvia segons polsador de vianant).
- **Tancament (10'):** quadern (diagrama d'estats).

**Punt clau:** una **màquina d'estats** organitza comportaments complexos en estats clars i transicions; evita el codi espagueti i no bloqueja (s'usa amb `millis()`).

---

## SESSIÓ 4 (2 h) — Control proporcional
- **Activació (10'):** *"I si la resposta fos més suau, proporcional a com de lluny estem de l'objectiu?"*
- **Modelatge (25'):** `04_control_proporcional.ino`. Concepte d'**error** i de **sortida proporcional** (P): com més gran l'error, més actuació. Introducció a l'estabilitat.
- **Pràctica guiada (35'):** regulació proporcional (p. ex. velocitat del ventilador segons la temperatura).
- **Repte (40'):** comparar **tot/res vs proporcional** amb el Serial Plotter; ajustar la constant `Kp`; **+ repte:** discutir què passa si `Kp` és massa gran.
- **Tancament (15'):** quadern + autoavaluació.

**Punt clau:** el control **proporcional** dosifica l'actuació segons l'error → resposta més suau i estable que el tot/res. (És la base del control **PID**, que es veurà en cursos superiors.)

**Producte:** sistema de control documentat (termòstat amb histèresi o procés amb màquina d'estats) amb **diagrama de blocs** i anàlisi de la resposta.
**Avaluació:** rúbriques **R1** (codi), **R3** (control), **R4** (documentació).

### Mapa d'avaluació (traçabilitat)
| Instrument | Què evidencia | Criteri | Rúbrica |
|---|---|---|---|
| Producte (termòstat / màquina d'estats) | Implementar un sistema de control i explicar-lo | CA3.1 | R3 |
| Repte (dissenyar una màquina d'estats) | `enum`/`switch`, transicions, no bloqueig (`millis()`) | CA1.1, CA3.1 | R1, R3 |
| Quadern (diagrama de blocs + anàlisi) | Consigna, error, realimentació; anàlisi de la resposta | CA3.1 | R4 |
| Observació + Serial Plotter | Histèresi, ajust de `Kp`, comparació tot/res vs proporcional | CA3.1 | R3 |

*(CA1.1 = programar en C/C++; CA3.1 = implementar sistemes de control (llaç obert/tancat, màquines d'estats) i explicar-ne el funcionament. Vegeu `Programació didàctica/06_Avaluacio_criteris_qualificacio.md`. Comparteix R1, R3 i R4 **abans** de començar.)*

## Errors freqüents
| Error | Causa | Solució |
|---|---|---|
| El ventilador parpelleja sense parar | Sense histèresi | Usar dos llindars (encendre/apagar). |
| La màquina d'estats es "queda penjada" | Transició mal definida | Revisar condicions de cada `case`. |
| Lectura de temperatura inestable | Soroll del sensor | Mitjana de diverses lectures. |
| El control P oscil·la molt | `Kp` massa gran | Reduir `Kp`; limitar la sortida amb `constrain`. |

---

## Atenció a la diversitat (DUA)

| Via | Mesura |
|---|---|
| **Bastida** (qui s'encalla) | Donar el **diagrama de blocs** parcialment fet; començar amb el termòstat tot/res abans del proporcional; parella heterogènia. |
| **+ Ampliació** (qui va sobrat) | Afegir estats, comparar tot/res vs P, ajustar `Kp`; reptes ⭐ de `Reptes/Reptes_SA6.md`. |
| **Representació múltiple** | Diagrama de blocs i d'estats, **Serial Plotter** (resposta visual), simulació Wokwi. |
| **Implicació** | Cada parella tria el procés a controlar i la finestra d'histèresi. |

## Treball cooperatiu amb rols

Parelles amb **rols rotatius**: Coordinador/a · Programador/a · Enginyer/a de maquinari (sensor/actuador, seguretat) · Provador/a–Documentador/a (Serial Plotter + quadern). Quadre per rotar a la fitxa.

## Pensament computacional i depuració

- **PC d'aquesta SA:** **màquina d'estats** (estats + transicions) i **bucle de control** (mesurar → comparar → corregir).
- **Depuració:** rutina **DEPURA** amb el **Serial Plotter** per visualitzar si el sistema oscil·la o s'estabilitza.

## Avaluació formativa (instruments)

- **Diana d'autoavaluació** (fitxa) · **Coavaluació** "2 estrelles i un desig" · **Exit ticket** de tancament.

## Context real i ODS

- **Context:** termòstats, climatització, control de processos industrials.
- **ODS 7** (energia: el bon control estalvia) i **ODS 11** (edificis i ciutats sostenibles).
