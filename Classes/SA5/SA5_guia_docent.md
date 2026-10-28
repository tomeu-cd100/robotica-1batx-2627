# SA5 · Guia docent — micro:bit i MicroPython: un altre paradigma

**Durada:** 6 h (3 sessions; la comparativa C++↔Python es tanca dins la S3 o com a 4a sessió opcional d'ampliació) · **Maquinari:** 2 micro:bit + el braç MeArm amb el seu Arduino · **Llenguatge:** MicroPython (i una mica de C++ al costat del braç)
**Referència:** [`Programació didàctica/14_SA5_microbit_micropython.md`](../../Programació%20didàctica/14_SA5_microbit_micropython.md) · **Connexions:** [`SA5_connexions.md`](SA5_connexions.md)

> 🧭 **Com s'usa aquesta guia.** **Abans de la SA:** objectius, material i codi de suport (la logística, al checklist docent). **A cada sessió:** la secció «SESSIÓ n» corresponent, amb el «Guió de modelatge» i els «Errors freqüents» a mà. **Durant tota la SA:** diversitat (DUA), ajuda i revisió entre iguals, i pensament computacional. **En avaluar:** «Avaluació formativa (instruments)». **Per contextualitzar:** context real i ODS.

> 🦾 **Fil conductor (des del 28-10-2026):** en aquesta SA es construeix el
> **comandament sense fils del braç MeArm**. Cada pràctica n'és una peça:
> selector (S1), gest d'inclinació (S2) i ràdio (S3). Una micro:bit **pont**
> passa les ordres a l'Arduino del braç, que les obeeix amb `04_brac_ordres`.
> El name badge, el comptapassos, el llum de nit i el dau s'han retirat.

## Objectius de la SA
1. Escriure programes en **MicroPython** amb la sintaxi correcta (**indentació!**).
2. Usar els **sensors integrats** de la micro:bit (acceleròmetre) i la comunicació per **ràdio**.
3. **Comparar** la mateixa solució en C/C++ (Arduino) i Python (micro:bit): el protocol d'ordres del braç existeix en tots dos llenguatges.
4. Dissenyar i fer servir un **protocol de comunicació** senzill (ordres de text).

## Material per alumne/a
- **2 micro:bit + cables USB per alumne/a** (emissora i receptora). La ràdio de la S3 necessita totes dues, i la dotació del centre hi arriba: **la prova és individual de cap a peus** — cadascú programa les seves dues plaques i les fa parlar entre elles.
- El **braç MeArm** amb l'Arduino (producte de la SA4) i **2 cables** (P1 → D0 i GND) per al pont.
- Entorn: **editor Python de micro:bit** (python.microbit.org) o **Thonny**. MakeCode com a pont.

> 🆘 **Pla B sense maquinari (Wokwi no simula micro:bit):** el **simulador integrat de python.microbit.org** cobreix matriu LED, botons, acceleròmetre (gestos), llum i temperatura — S1 i S2 senceres es poden fer sense placa. El que **no** cobreix és la **ràdio entre dues plaques** (S3): si falten micro:bit, fes la ràdio com a **demo projectada del docent** amb 2 plaques i que cadascú programi l'emissor/receptor al simulador (el codi es verifica igual; només la transmissió és a la demo).

## Codi de suport (`codi/`)

> Cada programa té la seva **pàgina de pràctica** (per què es fa + codi explicat per blocs, el `<nom>_EXPLICACIO.md` del costat de cada `.py`): és el text que l'alumnat pot rellegir si falta a classe o repassa a casa. El guió oral de sota continua sent teu.

| Fitxer | Contingut |
|---|---|
| [`01_selector_articulacio.py`](codi/01_selector_articulacio.py) | Matriu LED, botons, llista: el selector d'articulació del comandament. |
| [`02_inclinacio.py`](codi/02_inclinacio.py) | Acceleròmetre amb llindars: la inclinació com a gest (fletxes) i el sacseig. |
| [`03_radio_comandament.py`](codi/03_radio_comandament.py) | El comandament: envia ordres per ràdio. La seva pàgina inclou el receptor de prova i el **pont**. |
| [`04_brac_ordres.ino`](codi/04_brac_ordres/04_brac_ordres.ino) | **Arduino:** el braç obeeix ordres de text pel Serial (Monitor sèrie o pont). |

## Mètode de projecte i continuïtat
- **Cicle de treball** (com a tot el curs): *analitzar → dissenyar → prototipar → provar → millorar* (vegeu SA1). El **producte** n'és el recorregut complet i el **quadern tècnic** el documenta.
- **Lectura de codi amb PRIMM:** també en Python. A cada *modelatge* l'alumnat **prediu** què farà el programa **abans** d'executar-lo (al simulador o a la placa), després l'**investiga**, el **modifica** i en **crea** un de nou. **Operativa (val per a totes les sessions amb codi):** dedica els primers ~5' del Modelatge a projectar el codi nou **sense executar-lo** i recollir prediccions; només després, executa i investiga.
- **Pont (d'on venim / on anem):** ve de la **SA4** (el braç amb potenciòmetres) → portem a la **SA6** (la màquina d'estats del braç, torna a Arduino). Aquí s'obre el **fil dels dos llenguatges** (C/C++ ↔ Python, criteri **CA1.2**): els mateixos conceptes en dos paradigmes. Es reprendrà a la **SA8**.
- **Activació de cada sessió (rutina #1 del curs):** els primers **5'** dels 10' d'activació són la **graella de repàs espaiat** — 3 preguntes projectades, tothom escriu, no qualifica. Les graelles d'aquesta SA, llestes per projectar, són al [banc](../00_General/00_Banc_activacio_repas.md); la pregunta ganxo que obre cada sessió, aquí sota, ocupa la resta. *(El dia del mini-check, el mini-check les substitueix totes dues.)*
- **Bastida de transició:** **MakeCode** (blocs) com a pont abans del codi Python per a qui ho necessiti.

---

## SESSIÓ 1 (2 h) — Primers passos amb MicroPython

> 🔗 **Bastida prèvia (SA0):** abans de començar, deriva l'alumnat que ho necessiti a [`Classes/SA0/SA0_guia_programacio.md`](../SA0/SA0_guia_programacio.md), **Part B (MicroPython)** i **Part C (comparativa C++↔Python)**, per amortir el canvi de llenguatge.

- **Activació (10'):** *"La mateixa idea, dos llenguatges: què canviarà respecte d'Arduino?"*
- 🔭 **Referent (1', dins l'activació):** **Sophie Wilson**, dissenyadora del conjunt d'instruccions ARM — el processador de la micro:bit i del mòbil ([guió](../00_General/00_Referents_tecnologia.md)).
- **Modelatge (25'):** editor Python de micro:bit. `from microbit import *`, `display.scroll()`, `display.show()`, botons (`was_pressed()`), **llistes**. **Indentació** com a estructura (vs claus `{}` de C++).
- **Pràctica guiada (35'):** [`01_selector_articulacio.py`](codi/01_selector_articulacio.py); el selector B → E → D → P amb els botons, circular.
- **Repte (40'):** una imatge pròpia per a cada articulació (`Image("...")`); **+ repte:** que el selector recordi l'última tria mostrant-la en engegar.
- **Tancament (10'):** quadern; primera fila de la **taula comparativa** C++/Python.

> ⏱️ **Marge:** el temps efectiu real és ~100' (arrencada + recollida), no 120'. Si vas just, retalla primer: **+ repte**.

**Punt clau:** en Python la **indentació no és estètica, és sintaxi**. No hi ha `;` ni `{}`. El simulador integrat permet provar sense placa.

---

## SESSIÓ 2 (2 h) — La inclinació com a gest
- **Activació (10'):** *"Com sap el mòbil que l'has girat?"* → acceleròmetre (la micro:bit en porta un; també temperatura, llum i brúixola, que no treballem).
- **Modelatge (20'):** [`02_inclinacio.py`](codi/02_inclinacio.py): `get_x()`, `get_y()`, llindar i `was_gesture("shake")`; el `print((x, y))` amb **Show data** com a Serial Plotter.
- **Pràctica guiada (25'):** les fletxes segons la inclinació; ajusten el llindar mirant el gràfic.
- **Repte (15'):** una **zona morta** proporcional: fletxa petita a poca inclinació, gran a molta.
- 🔧 **Torn de taller del braç (20'):** carreguen [`04_brac_ordres`](codi/04_brac_ordres/EXPLICACIO.md) a l'Arduino del braç i el proven **escrivint ordres al Monitor sèrie** (`B+`, `P`…). Connecten el **cable del pont** (P1 → D0, GND → GND) amb el braç apagat. Qui no hagi acabat el cablatge de la SA4-S4, l'acaba ara.
- **Tancament (10'):** quadern. **Sembra per a la SA8:** cada alumne/a anota al quadern els **valors reals de l'acceleròmetre** en 3-4 postures (pla, dret, inclinat, sacseig — `x`, `y`): a la S3 de la SA8 seran el punt de partida del classificador de gestos, i estalvien fixar llindars «a ull».

> ⏱️ **Marge:** el temps efectiu real és ~100' (arrencada + recollida), no 120'. Si vas just, retalla primer: **el repte**. El taller no es retalla: la S3 necessita el braç obeint ordres.

**Punt clau:** el sensor dona un número; el **llindar** el converteix en una decisió (com a la SA3 i la SA4). I el braç es pot provar **sense ràdio** des del Monitor sèrie: així, a la S3, si falla, se sap de quina banda.

---

## SESSIÓ 3 (2 h) — Ràdio: el comandament del braç
- **Mini-check individual (10', substitueix l'activació):** [`00_Mini_checks_individuals.md`](../00_General/00_Mini_checks_individuals.md). Aprofita el canvi de full per presentar en 1' com es comuniquen dues plaques sense cables → ràdio.
- **Modelatge (20'):** [`03_radio_comandament.py`](codi/03_radio_comandament.py). Mòdul `radio`: `radio.on()`, `radio.config(group=...)`, `send()`, `receive()`. El **protocol d'ordres** (`B+`, `D-`, `P`…) com a acord entre les dues bandes.
- **Pràctica guiada (25'):** comandament + **receptor de prova** a la segona micro:bit (codi a la pàgina de la pràctica). ⚠️ Recorda't de repartir **grups de ràdio diferents** (el número de llista): amb tothom transmetent alhora, el mateix `group` faria que cada braç obeís el comandament d'un altre.
- 🔧 **Torn de taller del braç (20'):** la segona micro:bit passa a ser el **pont** (codi a la pàgina) i el comandament mou el braç. **Mai** cap pin de l'Arduino cap a la micro:bit; per pujar programa a l'UNO cal desconnectar el D0 ([dossier](../00_General/00_Projecte_T2_Brac.md)).
- **Repte (10', per a qui acabi):** afegir el servo esquerre amb els botons A i B (`E+` / `E-`).
- **Comparació + tancament (15'):** completar la **taula comparativa C++ ↔ Python** amb el protocol d'ordres (el comandament en Python, `04_brac_ordres` en C++) i reflexionar sobre els dos paradigmes. **Deures de represa (2'):** reparteix (o envia pel Classroom) la targeta [`00_Repas_expres_Cpp.md`](../00_General/00_Repas_expres_Cpp.md) — després de 3 setmanes de Python, la SA6 torna a C++ i la sintaxi (`;`, claus, tipus) arriba rovellada. És la targeta bessona de la de MicroPython que es reparteix abans de la prova T2.

> ⏱️ **Marge:** el temps efectiu real és ~100' (arrencada + recollida), no 120'. Si vas just, retalla primer: **el repte**; després, el receptor de prova (es pot anar directament al pont si la ràdio ja funciona a la primera).

**Punt clau:** dues plaques han de compartir el **mateix `group`** per comunicar-se. Comparació: Python (sintaxi neta, sense tipus explícits, ràpid de prototipar) vs C/C++ (més control del maquinari, tipat, eficiència).

## Errors freqüents
| Error | Causa | Solució |
|---|---|---|
| `IndentationError` | Indentació incorrecta | Usar 4 espais coherents; no barrejar tabs/espais. |
| El programa no reacciona als botons | Lògica fora del `while True` | Posar la lectura dins del bucle. |
| La ràdio no rep res | `group` diferent o `radio.off()` | Mateix `group`; `radio.on()` a l'inici. |
| El braç no obeeix el pont | Falta el GND comú, o el cable no és al P1 / D0 | GND a GND; provar les ordres pel Monitor sèrie per aïllar la banda. |
| L'UNO no es deixa programar | El cable del pont és al D0 | Desconnectar-lo per pujar. |

**Producte:** el **comandament per ràdio del braç** (comandament + pont, el braç obeint-lo) + **taula comparativa** C++/Python.
**Avaluació:** rúbriques **R1** (codi) i **R4** (documentació/comparativa).

### Mapa d'avaluació (traçabilitat)
| Instrument | Què evidencia | Criteri | Rúbrica |
|---|---|---|---|
| Producte (comandament del braç) | Programa en MicroPython amb acceleròmetre i ràdio que mou el braç | CA1.2 | R1 |
| Taula comparativa C++ ↔ Python | Comparar la mateixa solució en dos llenguatges | CA1.2 | R4 |
| Repte de codi Python | Sintaxi (indentació), funcions, lectura de sensor | CA1.2 | R1 |
| Quadern tècnic | Comparativa, errors i millores; decisió de disseny | CA1.2, CA3.1 | R4 |
| Ajuda entre iguals i **revisió creuada** de codi | Cooperació sense producte compartit: línia d'ajuda del quadern + una millora concreta i un dubte al company | CA5.3 | **R5** |

*(CA1.2 = programar en MicroPython i comparar-ho amb C/C++; CA3.1 = implementar/explicar control bàsic. Vegeu [`Programació didàctica/06_Avaluacio_criteris_qualificacio.md`](../../Programació%20didàctica/06_Avaluacio_criteris_qualificacio.md). Comparteix R1 i R4 **abans** de començar.)*

---

## Guió de modelatge (què verbalitzar)

> Frases i preguntes clau per al **Modelatge** de cada sessió (què mirar, què preguntar abans d'executar, error a anticipar).

> ✍️ **Katas:** en acabar el modelatge de cada sessió amb pràctica de codi, projecta el kata del sketch del dia ([SA5_katas.md](SA5_katas.md)): 10' d'escriptura individual **abans** de repartir/obrir el sketch. **Un sol kata per sessió**; el dia del mini-check (**S3** en aquesta SA) el mini-check el substitueix, i el kata `03_radio_comandament` queda com a **repàs autònom** (marcat amb 🔁 al fitxer): recomana'l com a deures abans de tancar la SA. Per a la posada en comú, tens la solució comentada de cada kata (amb els valors de la variació) a [SA5_katas_solucions.md](SA5_katas_solucions.md).

- **S1 · `01_selector_articulacio` (sintaxi Python):** èmfasi clau — *en Python la **indentació és sintaxi**, no estètica; no hi ha `;` ni `{}`*. Compara visualment amb un sketch d'Arduino. Presenta la **llista** com a calaixos numerats des del 0. Usa el **simulador** per provar sense placa. *Error a anticipar:* `IndentationError` per barrejar tabs i espais; `IndexError` si el selector no és circular.
- **S2 · `02_inclinacio` (acceleròmetre):** fes que prediguin `x` i `y` amb la placa plana i de cantell; mostra el gràfic (**Show data**). Recalca que cal **llindar** a les lectures, igual que a Arduino. Al taller, `04_brac_ordres`: *si el braç obeeix el teclat, obeirà el comandament*. *Error a anticipar:* fletxes al revés (placa girada).
- **S3 · `03_radio_comandament` (ràdio):** les dues plaques han de compartir el **mateix `group`**. Demana predir què passa si una placa té un `group` diferent. Dibuixa la cadena **comandament → ràdio → pont → cable → Arduino → servos**. Tanca completant la **taula comparativa C++↔Python**. *Error a anticipar:* oblidar `radio.on()`; al pont, oblidar el GND comú.

## Atenció a la diversitat (DUA)

| Via | Mesura |
|---|---|
| **Bastida** (qui s'encalla) | **MakeCode (blocs)** com a pont abans del Python; **simulador** (python.microbit.org) per provar sense placa; el **receptor de prova** abans del pont; el braç provat des del **Monitor sèrie** abans de la ràdio. |
| **+ Ampliació** (qui va sobrat) | Servo esquerre amb els botons, zona morta proporcional, gravació amb sacseig; reptes ⭐ de [`Reptes/Reptes_SA5.md`](../../Reptes/Reptes_SA5.md). |
| **Representació múltiple** | Blocs ↔ codi, simulador visual, taula comparativa C++/Python. |
| **Implicació** | Cada alumne/a dissenya els gestos del seu comandament (quin gest mou quina articulació) i les imatges de la pantalla. |

## Cooperació (amb treball individual)

El treball és **individual**: cadascú programa la seva micro:bit i lliura el seu producte ([`04_Metodologia.md` §4.3](../../Programació%20didàctica/04_Metodologia.md)). La cooperació —el **CA5.3** i la **R5**— s'evidencia en la **revisió creuada de codi** (cadascú llegeix el programa d'un company i li retorna **una millora concreta i un dubte**) i en l'**ajuda documentada** al quadern.

> Excepció pràctica d'aquesta SA: la **prova de ràdio** demana dues plaques. Si cal ajuntar dues persones per a aquell moment, reparteix només **qui escriu** i **qui verifica** i intercanvieu-los; cadascú manté el seu codi d'emissor i de receptor.

## Pensament computacional i depuració

- **PC d'aquesta SA:** programació **per esdeveniments** (botons, gestos, ràdio), **abstracció** (sensors integrats) i **protocols** (un acord de missatges entre dues màquines).
- **Depuració:** rutina **DEPURA**; l'error més típic és l'**indentació** (`IndentationError`) → la U d'*Ubica* sovint és una línia mal sagnada.

## Avaluació formativa (instruments)

- **Diana d'autoavaluació** (fitxa) · **Revisió creuada de codi** (una millora concreta i un dubte sobre el programa d'un company) · **Exit ticket** de tancament.
- **Mini-check individual** (10', **inici de la S3**, no qualifica): programa MicroPython de memòria (cor intermitent) — comprova sobretot la **indentació**. Vegeu [`../00_General/00_Mini_checks_individuals.md`](../00_General/00_Mini_checks_individuals.md).

## Context real i ODS

- **Context:** *wearables*, dispositius de salut, joguines i material educatiu programable.
- **ODS 3** (salut i benestar: braços teledirigits per a persones amb mobilitat reduïda, telecirurgia) i **ODS 4** (educació de qualitat: la micro:bit democratitza la programació).
