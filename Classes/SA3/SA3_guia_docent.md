# SA3 · Guia docent — Entrades i sensors: el robot percep

**Durada:** 8 h (4 sessions) · **Maquinari:** Arduino UNO + Keyestudio (polsador, potenciòmetre, LDR, NTC, ultrasons HC-SR04) · **Llenguatge:** C/C++
**Referència:** [`Programació didàctica/12_SA3_Entrades_sensors.md`](../../Programació%20didàctica/12_SA3_Entrades_sensors.md) · **Esquemes:** [`SA3_esquemes_connexions.md`](SA3_esquemes_connexions.md)

## Objectius de la SA
1. Llegir entrades digitals (`digitalRead`) i analògiques (`analogRead`) i interpretar-ne els valors.
2. Aplicar **funcions** definides per l'usuari per modularitzar.
3. Usar el **monitor/traçador sèrie** per depurar i visualitzar dades.
4. Connectar percepció (sensor) amb acció (actuador).

## Material per parella
- Arduino UNO + USB, protoboard, cables.
- Polsador, potenciòmetre, LDR + resistència 10 kΩ, NTC + 10 kΩ, sensor d'ultrasons HC-SR04, LED, brunzidor piezo.

## Codi de suport (carpeta `codi/`)
| Fitxer | Contingut |
|---|---|
| `01_polsador_debounce.ino` | Entrada digital amb *pull-up* i antirebot; comptador. |
| `02_potenciometre_ldr.ino` | Entrades analògiques; `map()`; llum automàtic. |
| `03_ultrasons_funcio.ino` | Funció `mesuraDistancia()`; Serial Plotter. |
| `04_alarma_aparcament.ino` | Producte: sensor→actuador segons distància. |

## Mètode de projecte i continuïtat
- **Cicle de treball** (com a tot el curs): *analitzar → dissenyar → prototipar → provar → millorar* (vegeu SA1). El **producte** n'és el recorregut complet i el **quadern tècnic** el documenta.
- **Lectura de codi amb PRIMM:** a cada *modelatge* l'alumnat **prediu** què farà el sketch **abans** d'executar-lo, després l'**investiga**, el **modifica** i en **crea** un de nou. **Operativa (val per a totes les sessions amb codi):** dedica els primers ~5' del Modelatge a projectar el codi nou **sense executar-lo** i recollir prediccions; només després, executa i investiga.
- **Pont (d'on venim / on anem):** ve de la **SA2** (sortides/actuadors) → portem a la **SA4** (moviment). Aquí el sistema aprèn a **percebre** (sensors); a la SA4 la percepció **mourà** servos i motors.

---

## SESSIÓ 1 (2 h) — Entrades digitals i monitor sèrie
- **Activació (10'):** *"Com sap la placa que has premut un botó?"*
- **Modelatge (25'):** `01_polsador_debounce.ino`. `INPUT_PULLUP` (per què evita el cable extra), `digitalRead`, **antirebot** (*debounce*) i **Serial Monitor**.
- **Pràctica guiada (35'):** munten el polsador al pin 2; obren el monitor sèrie i compten premudes.
- **Repte (40'):** el polsador encén/apaga un LED a cada premuda (mode *toggle*); **+ repte:** comptar fins a 5 i reiniciar.
- **Tancament (10'):** quadern.

**Punt clau:** amb `INPUT_PULLUP` el pin llegeix **HIGH en repòs** i **LOW en prémer** (lògica invertida). El *debounce* evita lectures múltiples per un sol clic.

---

## SESSIÓ 2 (2 h) — Entrades analògiques
- **Activació (10'):** *"Quants valors pot tenir una entrada analògica?"* → 0-1023.
- **Modelatge (25'):** `02_potenciometre_ldr.ino`. `analogRead` (conversió A/D 10 bits), **`map()`** per reescalar, divisor de tensió per a la LDR.
- **Pràctica guiada (35'):** llegeixen potenciòmetre (A0) i LDR (A1) al monitor; regulen la intensitat d'un LED amb el potenciòmetre (PWM).
- **Repte (40'):** **llum automàtic** (LDR → LED s'encén si fa fosc) amb llindar; **+ repte:** llindar ajustable amb el potenciòmetre.
- **Tancament (10'):** quadern (taula de lectures).

**Punt clau:** `analogRead` retorna 0-1023; `analogWrite` necessita 0-255 → cal **`map()`**. El divisor de tensió converteix la resistència variable (LDR/NTC) en tensió mesurable.

---

## SESSIÓ 3 (2 h) — Sensor de distància i funcions
- **Activació (10'):** *"Com mesura distàncies un cotxe en aparcar?"* → ultrasons.
- **Modelatge (30'):** `03_ultrasons_funcio.ino`. Principi de l'eco (`pulseIn`), càlcul de distància, i sobretot **escriure una funció** `mesuraDistancia()` que retorna un valor.
- **Pràctica guiada (30'):** munten l'HC-SR04; visualitzen la distància amb **Serial Plotter**.
- **Repte (40'):** funció que retorna la distància mitjana de 3 mesures (filtre); **+ repte:** detectar si un objecte s'acosta o s'allunya.
- **Tancament (10'):** quadern (codi de la funció).

**Punt clau:** una **funció** encapsula una tasca i en retorna un resultat → codi més net i reutilitzable. `pulseIn` mesura el temps de l'eco; distància (cm) = temps · 0,034 / 2.

---

## SESSIÓ 4 (2 h) — Producte: alarma/aparcament

> 📋 **Aquesta sessió allotja la prova pràctica trimestral T1** (vegeu [`Avaluació/Prova_practica_T1.md`](../../Avaluació/Prova_practica_T1.md) i [`Programació didàctica/08_Sequenciacio_temporal_anual.md`](../../Programació%20didàctica/08_Sequenciacio_temporal_anual.md)): el producte/repte d'aquesta sessió **fa de prova T1** i no afegeix hores extra.

- **Activació (10'):** presentació del repte.
- **Pràctica (70'):** `04_alarma_aparcament.ino`. Integren ultrasons + LED/piezo amb **avís proporcional a la distància** (com més a prop, més ràpid el so). Cada parella personalitza llindars.
- **Documentació + defensa (30'):** esquema, codi comentat, mini-defensa.
- **Tancament (10'):** autoavaluació.

**Producte:** sistema sensor→actuador (alarma de proximitat o llum automàtic) amb codi modular (funcions).
**Avaluació:** rúbriques **R1** (codi) i **R2** (circuit). Repte individual: escriure una funció de lectura.

### Mapa d'avaluació (traçabilitat)
| Instrument | Què evidencia | Criteri | Rúbrica |
|---|---|---|---|
| Producte (alarma/llum automàtic) | Percepció → acció amb codi modular | CA2.1, CA2.2 | R1, R2 |
| Repte de codi (funció de lectura) | Funcions, `digitalRead`/`analogRead`, `map()` | CA1.1 | R1 |
| Quadern tècnic | Taula de lectures, codi de la funció, errors | CA1.1, CA2.2 | R1 |
| Observació + depuració sèrie | Ús del monitor/traçador, divisor de tensió | CA2.2 | R2 |

*(CA1.1 = programar en C/C++; CA2.1 = dissenyar/muntar circuits amb seguretat; CA2.2 = mesurar/interpretar senyals. Vegeu [`Programació didàctica/06_Avaluacio_criteris_qualificacio.md`](../../Programació%20didàctica/06_Avaluacio_criteris_qualificacio.md). Comparteix R1 i R2 **abans** de començar.)*

## Errors freqüents
| Error | Causa | Solució |
|---|---|---|
| El polsador "salta" sol | Sense *debounce* o sense *pull-up* | Usar `INPUT_PULLUP` i antirebot. |
| Lectura analògica sempre 0 o 1023 | Divisor mal connectat | Revisar la resistència de 10 kΩ i el punt mig al pin analògic. |
| Distància sempre 0 o molt gran | TRIG/ECHO intercanviats | Verificar TRIG (sortida) i ECHO (entrada). |
| El LED no regula amb el potenciòmetre | Pin de sortida sense PWM | LED en pin `~` i usar `map()` a 0-255. |
| L'alarma/avís es dispara sol sense cap objecte | `pulseIn` retorna `0` quan no hi ha eco (objecte fora de rang) i `0` cm es llegeix com "molt a prop" | Posar *timeout* a `pulseIn(ECHO, HIGH, 30000)` i tractar el `0` com a "molt lluny" (p. ex. retornar 400). |

---

## Guió de modelatge (què verbalitzar)

> Frases i preguntes clau per al **Modelatge** de cada sessió (què mirar, què preguntar abans d'executar, error a anticipar).

- **S1 · `01_polsador_debounce` (`INPUT_PULLUP`):** analogia — *el pin està "agafat" a HIGH i prémer l'estira a LOW* (lògica invertida). Pregunta: *"per què, sense antirebot, una sola premuda en compta diverses?"* *Error a anticipar:* sorpresa per la lògica invertida.
- **S2 · `02_potenciometre_ldr` (`analogRead`, `map()`):** obre el **Monitor Sèrie** i mou el potenciòmetre **en directe** perquè vegin els 0–1023. Pregunta: *"com passo de 0–1023 a 0–255?"* → `map()`. *Error a anticipar:* divisor de tensió de la LDR mal connectat (lectures 0 o 1023).
- **S3 · `03_ultrasons_funcio` (funcions):** modela **escriure una funció** `mesuraDistancia()` i com **retorna** un valor. Pregunta: *"quin avantatge té encapsular-ho en una funció?"* *Error a anticipar:* TRIG i ECHO intercanviats.
- **S4 · `04_alarma_aparcament` (integració):** mostra'l com a integració sensor→actuador; pregunta com fer l'**avís proporcional** a la distància.

## Atenció a la diversitat (DUA)

| Via | Mesura |
|---|---|
| **Bastida** (qui s'encalla) | Començar amb el **polsador** (digital) abans de l'analògic; donar la funció `mesuraDistancia()` ja escrita per llegir-la i usar-la; parella heterogènia. |
| **+ Ampliació** (qui va sobrat) | Mitjana de 3 mesures, detectar acostament/allunyament; reptes ⭐ de [`Reptes/Reptes_SA3.md`](../../Reptes/Reptes_SA3.md). |
| **Representació múltiple** | Esquema, **Serial Plotter** (dada visual), simulació Wokwi, codi comentat. |
| **Implicació** | Cada parella tria llindars i el tipus d'avís del seu producte. |

## Treball cooperatiu amb rols

Parelles amb **rols rotatius** (un canvi per sessió): Coordinador/a · Programador/a · Enginyer/a de maquinari (sensor, connexions, seguretat) · Provador/a–Documentador/a (monitor sèrie + quadern). Quadre per rotar a la fitxa.

## Pensament computacional i depuració

- **PC d'aquesta SA:** **abstracció** (encapsular la lectura en una funció) i **condicionals** (decidir per llindar).
- **Depuració:** la **rutina DEPURA** amb el **Monitor sèrie** com a eina central (la E d'*Examina*).

## Avaluació formativa (instruments)

- **Diana d'autoavaluació** (fitxa) sobre 3 criteris clau · **Coavaluació** "2 estrelles i un desig" · **Exit ticket** de tancament.

## Connexió amb la IA (llavor)

> Llavor conceptual de **2–3'** (eix A del curs; vegeu `../00_IA_a_la_materia.md`). No consumeix sessió.

Aquí l'alumnat escriu **regles fetes a mà** sobre dades de sensor: `if distancia < 20: alarma`. **Això és la base de la IA per classificació.** Pregunta per plantar la llavor:

> *"I si en lloc d'escriure tu el llindar, el sistema l'aprengués sol mirant molts exemples? Això és l'**aprenentatge automàtic**, i ho veurem a la SA8."*

**Idea clau:** un **llindar** és una **regla** que decideix una categoria a partir d'un valor → és el precursor d'un **classificador**. Connecta el `analogRead`/`if` d'avui amb el *"dades → decisió"* de la IA.

## Context real i ODS

- **Context:** llum automàtica, sensors d'estalvi, aparcaments intel·ligents.
- **ODS 7** (energia) i **ODS 12** (consum responsable): els sensors redueixen el malbaratament.
