# SA3 · Guia docent — Entrades i sensors: el robot percep

**Durada:** 8 h (4 sessions) · **Maquinari:** Arduino UNO + Keyestudio (polsador, potenciòmetre, LDR, NTC, ultrasons HC-SR04) · **Llenguatge:** C/C++
**Referència:** [`Programació didàctica/12_SA3_Entrades_sensors.md`](../../Programació%20didàctica/12_SA3_Entrades_sensors.md) · **Esquemes:** [`SA3_esquemes_connexions.md`](SA3_esquemes_connexions.md)

> 🧭 **Com s'usa aquesta guia.** **Abans de la SA:** objectius, material i codi de suport (la logística, al checklist docent). **A cada sessió:** la secció «SESSIÓ n» corresponent, amb el «Guió de modelatge» i els «Errors freqüents» a mà. **Durant tota la SA:** diversitat (DUA), rols cooperatius i pensament computacional. **En avaluar:** «Avaluació formativa (instruments)». **Per contextualitzar:** context real i ODS.

## Objectius de la SA
1. Llegir entrades digitals (`digitalRead`) i analògiques (`analogRead`) i interpretar-ne els valors.
2. Aplicar **funcions** definides per l'usuari per modularitzar.
3. Usar el **monitor/traçador sèrie** per depurar i visualitzar dades.
4. Connectar percepció (sensor) amb acció (actuador).

## Material per parella
- Arduino UNO + USB, protoboard, cables.
- Polsador, potenciòmetre, LDR + resistència 10 kΩ, NTC + 10 kΩ, sensor d'ultrasons HC-SR04, LED, brunzidor piezo.

## Codi de suport (carpeta `codi/`)

> Cada sketch té la seva **pàgina de pràctica** (per què es fa + codi explicat per blocs, l'`EXPLICACIO.md` de la seva carpeta): és el text que l'alumnat pot rellegir si falta a classe o repassa a casa. El guió oral de sota continua sent teu.

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
- 🔭 **Referent (1', dins l'activació):** **Marie Van Brittan Brown**, inventora del primer sistema de videovigilància domèstica (1966) — l'avantpassat de l'alarma d'aquesta SA ([guió](../00_General/00_Referents_tecnologia.md)).
- **Modelatge (25'):** `01_polsador_debounce.ino`. `INPUT_PULLUP` (per què evita el cable extra), `digitalRead`, **antirebot** (*debounce*) i **Serial Monitor**.
- **Pràctica guiada (35'):** munten el polsador al pin 2; obren el monitor sèrie i compten premudes.
- **Repte (40'):** el polsador encén/apaga un LED a cada premuda (mode *toggle*); **+ repte:** comptar fins a 5 i reiniciar.
- **Tancament (10'):** quadern.

> ⏱️ **Marge:** el temps efectiu real és ~100' (arrencada + recollida), no 120'. Si vas just, retalla primer: **el «+ repte» (comptar fins a 5 i reiniciar)**.

**Punt clau:** amb `INPUT_PULLUP` el pin llegeix **HIGH en repòs** i **LOW en prémer** (lògica invertida). El *debounce* evita lectures múltiples per un sol clic.

---

## SESSIÓ 2 (2 h) — Entrades analògiques
- **Activació (10'):** *"Quants valors pot tenir una entrada analògica?"* → 0-1023.
- **Modelatge (25'):** `02_potenciometre_ldr.ino`. `analogRead` (conversió A/D 10 bits), **`map()`** per reescalar, divisor de tensió per a la LDR.
- **Pràctica guiada (35'):** llegeixen potenciòmetre (A0) i LDR (A1) al monitor; regulen la intensitat d'un LED amb el potenciòmetre (PWM).
- **Repte (40'):** **llum automàtic** (LDR → LED s'encén si fa fosc) amb llindar; **+ repte:** llindar ajustable amb el potenciòmetre.
- **Tancament (10'):** quadern (taula de lectures).

> ⏱️ **Marge:** el temps efectiu real és ~100' (arrencada + recollida), no 120'. Si vas just, retalla primer: **el «+ repte» (llindar ajustable amb el potenciòmetre)**.

**Punt clau:** `analogRead` retorna 0-1023; `analogWrite` necessita 0-255 → cal **`map()`**. El divisor de tensió converteix la resistència variable (LDR/NTC) en tensió mesurable.

> 🔌 **Racó de mesura (dins la pràctica guiada, ~5' per parella):** amb el **multímetre** al punt mig del divisor LDR–10 kΩ, comparar la **tensió real** amb la lectura del programa: `lectura/1023 · 5 V ≈ V mesurada` (p. ex. 512 → ~2,5 V). Tapar la LDR i veure com **totes dues** baixen alhora. Fa tangible què fa l'ADC (converteix tensió en nombre) i tanca el cicle de la **CA2.2**: mesurar amb instrument + interpretar amb software. El multímetre passa a ser eina oficial de la fase *Examina* de DEPURA per al maquinari.

---

## SESSIÓ 3 (2 h) — Funcions + PRODUCTE: alarma/aparcament

> El producte de la SA **es tanca en aquesta sessió** (la S4 és, sencera, la prova T1). El repte de la sessió **és** el producte.

- **Mini-check individual (10', a l'inici, substitueix la graella):** `if/else` sobre una lectura analògica ([banc](../00_General/00_Mini_checks_individuals.md)).
- **Modelatge (25'):** `03_ultrasons_funcio.ino`. Principi de l'eco (`pulseIn`), càlcul de distància, i sobretot **escriure una funció** `mesuraDistancia()` que retorna un valor.
- **Pràctica guiada (25'):** munten l'HC-SR04; visualitzen la distància amb **Serial Plotter**.
- **Repte-PRODUCTE (45'):** `04_alarma_aparcament.ino` com a referència. **Pseudocodi primer** (3-5 línies al quadern), després integren ultrasons + LED/piezo amb **avís per trams o proporcional a la distància**; cada parella personalitza llindars. **Mini-defensa d'1' a peu de taula:** mentre treballen, passa per cada parella i fes-los explicar sistema + una aplicació real (és la defensa de nivell T1).
- **Tancament (15'):** documentar esquema i codi al quadern; autoavaluació amb rúbriques.

> ⏱️ **Marge:** el temps efectiu real és ~100', i aquesta sessió és la més carregada del trimestre. Retalla d'entrada: **les ampliacions (mitjana de 3 mesures / detectar acostament-allunyament)** (i si cal, **la visualització amb Serial Plotter de la pràctica guiada — redueix-la a una comprovació ràpida al Monitor Sèrie**).

**Punt clau:** una **funció** encapsula una tasca i en retorna un resultat. `pulseIn` mesura el temps de l'eco; distància (cm) = temps · 0,034 / 2. *(+ Ampliació per a qui va sobrat: funció que retorna la mitjana de 3 mesures; detectar si l'objecte s'acosta o s'allunya.)*

**Producte:** sistema sensor→actuador (alarma de proximitat o llum automàtic) amb codi modular (funcions).
**Avaluació del producte:** rúbriques **R1** (codi) i **R2** (circuit).

---

## SESSIÓ 4 (2 h) — PROVA PRÀCTICA T1 (individual)

> 📋 **Aquesta sessió és, sencera, la prova trimestral T1** ([`Avaluació/Prova_practica_T1.md`](../../Avaluació/Prova_practica_T1.md)): individual, amb kit propi (n'hi ha un per alumne/a), quadern i esquemes consultables. **No s'hi programa cap altra activitat** — una prova individual de ~100' i una sessió de producte no caben juntes ([`08_Sequenciacio`](../../Programació%20didàctica/08_Sequenciacio_temporal_anual.md)).

- **Instruccions (5-10'):** repartir material, recordar què es pot consultar (quadern, esquemes) i l'estructura per nivells (nucli = 5-6; ampliacions = 7-10).
- **Prova (95-100'):** cada alumne/a munta i programa la "llum de seguretat intel·ligent". El docent només resol incidències de material (placa/cable espatllats), no dubtes de contingut.
- **Tancament (10'):** recollida ordenada; recordar el **pla de millora personal** (3 línies al quadern quan rebin el retorn — es reprèn a l'inici de la SA4).

**Sense graella d'activació ni mini-check** (el mini-check va ser a la S3). Qui acabi abans: ampliacions de la mateixa prova o reptes ⭐ de la SA.

### Mapa d'avaluació (traçabilitat)
| Instrument | Què evidencia | Criteri | Rúbrica |
|---|---|---|---|
| Producte (alarma/llum automàtic, **S3**) | Percepció → acció amb codi modular | CA2.1, CA2.2 | R1, R2 |
| **Prova T1 (S4, individual)** | Circuit + codi + documentació en solitari | CA1.1, CA2.1, CA2.2 | R1, R2, R4 |
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

> ✍️ **Katas:** en acabar el modelatge de cada sessió, projecta el kata de la pràctica del dia ([SA3_katas.md](SA3_katas.md)): 10' d'escriptura individual **abans** de repartir/obrir el sketch.

- **S1 · `01_polsador_debounce` (`INPUT_PULLUP`):** analogia — *el pin està "agafat" a HIGH i prémer l'estira a LOW* (lògica invertida). Pregunta: *"per què, sense antirebot, una sola premuda en compta diverses?"* *Error a anticipar:* sorpresa per la lògica invertida.
- **S2 · `02_potenciometre_ldr` (`analogRead`, `map()`):** obre el **Monitor Sèrie** i mou el potenciòmetre **en directe** perquè vegin els 0–1023. Pregunta: *"com passo de 0–1023 a 0–255?"* → `map()`. *Error a anticipar:* divisor de tensió de la LDR mal connectat (lectures 0 o 1023).
- **S3 · `03_ultrasons_funcio` + `04_alarma` (funcions i integració):** modela **escriure una funció** `mesuraDistancia()` i com **retorna** un valor. Pregunta: *"quin avantatge té encapsular-ho en una funció?"* Per al producte, mostra el `04` com a integració sensor→actuador i pregunta com fer l'**avís proporcional**. *Error a anticipar:* TRIG i ECHO intercanviats.
- **S4 (prova T1):** cap modelatge — sessió de prova individual.

## Atenció a la diversitat (DUA)

| Via | Mesura |
|---|---|
| **Bastida** (qui s'encalla) | Començar amb el **polsador** (digital) abans de l'analògic; donar la funció `mesuraDistancia()` ja escrita per llegir-la i usar-la; l'**esquelet amb `// TODO`** del llum automàtic a la secció «Si t'encalles» de la [pàgina de la pràctica d'entrades analògiques](codi/02_potenciometre_ldr/EXPLICACIO.md); parella heterogènia. |
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
- **Mini-check individual** (10', **inici de la S3** — la S4 és la prova T1 —, no qualifica): `if/else` sobre una lectura analògica. Detecta qui encara no programa sol abans de la prova. Vegeu [`../00_General/00_Mini_checks_individuals.md`](../00_General/00_Mini_checks_individuals.md).

## Connexió amb la IA (llavor)

> Llavor conceptual de **2–3'** (eix A del curs; vegeu `../00_IA_a_la_materia.md`). No consumeix sessió.

Aquí l'alumnat escriu **regles fetes a mà** sobre dades de sensor: `if distancia < 20: alarma`. **Això és la base de la IA per classificació.** Pregunta per plantar la llavor:

> *"I si en lloc d'escriure tu el llindar, el sistema l'aprengués sol mirant molts exemples? Això és l'**aprenentatge automàtic**, i ho veurem a la SA8."*

**Idea clau:** un **llindar** és una **regla** que decideix una categoria a partir d'un valor → és el precursor d'un **classificador**. Connecta el `analogRead`/`if` d'avui amb el *"dades → decisió"* de la IA.

## Context real i ODS

- **Context:** llum automàtica, sensors d'estalvi, aparcaments intel·ligents.
- **ODS 7** (energia) i **ODS 12** (consum responsable): els sensors redueixen el malbaratament.
