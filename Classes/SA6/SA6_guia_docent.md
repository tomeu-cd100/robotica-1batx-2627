# SA6 · Guia docent — Sistemes de control: llaç obert/tancat i màquines d'estats

**Durada:** 8 h (4 sessions; la 4a amb ampliacions opcionals) · **Maquinari:** Arduino UNO + NTC, LDR, LED/ventilador, polsador, (ultrasons) · **Llenguatge:** C/C++
**Referència:** [`Programació didàctica/15_SA6_Sistemes_control.md`](../../Programació%20didàctica/15_SA6_Sistemes_control.md) · **Esquemes:** [`SA6_esquemes_connexions.md`](SA6_esquemes_connexions.md)

> 🧭 **Com s'usa aquesta guia.** **Abans de la SA:** objectius, material i codi de suport (la logística, al checklist docent). **A cada sessió:** la secció «SESSIÓ n» corresponent, amb el «Guió de modelatge» i els «Errors freqüents» a mà. **Durant tota la SA:** diversitat (DUA), rols cooperatius i pensament computacional. **En avaluar:** «Avaluació formativa (instruments)». **Per contextualitzar:** context real i ODS.

## Objectius de la SA
1. Distingir i implementar **control en llaç obert i en llaç tancat**.
2. Dissenyar una **màquina d'estats** per a un comportament seqüencial.
3. Implementar una regulació **tot/res (histèresi)** i una **proporcional** bàsica.
4. Representar el sistema amb un **diagrama de blocs**.

## Material per parella
- Arduino UNO + USB, protoboard, cables.
- NTC + resistència 10 kΩ, LDR + 10 kΩ, LED (o petit ventilador via transistor/relé), polsador.

## Codi de suport (`codi/`)

> Cada sketch té la seva **pàgina de pràctica** (per què es fa + codi explicat per blocs, l'`EXPLICACIO.md` de la seva carpeta): és el text que l'alumnat pot rellegir si falta a classe o repassa a casa. El guió oral de sota continua sent teu.

| Fitxer | Contingut |
|---|---|
| `01_llac_obert_vs_tancat.ino` | Comparació dels dos tipus de control. |
| `02_termostat_histeresi.ino` | Control tot/res amb histèresi. |
| `03_maquina_estats.ino` | Màquina d'estats amb `enum`/`switch`. La seva pàgina inclou l'**esquelet «Si t'encalles»** (el patró `enum`/`switch` + `millis()` ja muntat; l'alumnat només omple els `// TODO`). |
| `04_control_proporcional.ino` | Regulació proporcional bàsica **(+ampliació, no nucli)**. |

## Mètode de projecte i continuïtat
- **Cicle de treball** (com a tot el curs): *analitzar → dissenyar → prototipar → provar → millorar* (vegeu SA1). El **producte** n'és el recorregut complet i el **quadern tècnic** el documenta.
- **Lectura de codi amb PRIMM:** a cada *modelatge* l'alumnat **prediu** què farà el sketch **abans** d'executar-lo, després l'**investiga**, el **modifica** i en **crea** un de nou. **Operativa (val per a totes les sessions amb codi):** dedica els primers ~5' del Modelatge a projectar el codi nou **sense executar-lo** i recollir prediccions; només després, executa i investiga.
- **Pont (d'on venim / on anem):** ve de la **SA5** (paradigmes de programació) → portem a la **SA7** (robòtica mòbil). El **llaç tancat** i les **màquines d'estats** d'aquí són la base dels **comportaments autònoms** del robot (evitar obstacles, seguir línia).

---

## SESSIÓ 1 (2 h) — Què és un sistema de control?

> 🔄 **Reentrada a C++ (abans de la sessió):** l'alumnat porta 3 setmanes en Python (SA5) i avui torna a C++. La targeta [`00_Repas_expres_Cpp.md`](../00_General/00_Repas_expres_Cpp.md) s'ha repartit com a deures al tancament de la SA5 S3. Dedica **5' de l'activació** al «C++ flash» de sota. Qui falli l'autotest de la targeta: derivar a `SA0_guia_programacio.md` Part A abans de la S2.
>
> **Guió del «C++ flash» (5', oral i col·lectiu).** Projecta el nucli del llum de nit de la SA5 ([`03_nightlight.py`](../SA5/codi/03_nightlight.py)) — l'han escrit ells fa dues setmanes — i demana traduir-lo **en veu alta** a C++ d'Arduino, línia a línia. No cal executar res: és gimnàstica de sintaxi.
>
> ```python
> llum = display.read_light_level()
> if llum < LLINDAR:
>     display.show(Image.SQUARE)
> else:
>     display.clear()
> sleep(100)
> ```
>
> Preguntes en cadena (una per mà alçada): *com es declara `llum` a C++?* (tipus davant: `int`) → *d'on surt la lectura amb Arduino?* (`analogRead(A0)`) → *què li falta a l'`if` de Python perquè compili a C++?* (parèntesis, claus, i `;` a cada instrucció) → *i el `sleep(100)`?* (`delay(100)`). Resultat esperat a la pissarra:
>
> ```cpp
> int llum = analogRead(A0);
> if (llum < LLINDAR) {
>   digitalWrite(8, HIGH);
> } else {
>   digitalWrite(8, LOW);
> }
> delay(100);
> ```
>
> Remata amb la pregunta pont: *"i el `while True:` de MicroPython, on és a Arduino?"* → **és el `loop()`**: Arduino te'l dona fet. Aquest mateix patró llindar+actuador és, exactament, el termòstat que construiran a la S2 — digues-ho en veu alta: la SA6 no comença de zero, comença del llum de nit.

- **Activació (10'):** *"Per què un aire condicionat no encén i apaga sense parar?"*
- 🔭 **Referent (1', dins l'activació):** **Irmgard Flügge-Lotz**, teòrica del control discontinu (tot/res) — exactament la histèresi d'aquesta SA ([guió](../00_General/00_Referents_tecnologia.md)).
- **Modelatge (25'):** conceptes: **consigna, sensor (realimentació), error, actuador**. **Llaç obert** (sense sensor, temporitzat) vs **llaç tancat** (amb sensor). **Diagrama de blocs**.
- **Pràctica guiada (35'):** `01_llac_obert_vs_tancat.ino`; comparen el comportament dels dos modes amb el mateix muntatge.
- **Repte (40'):** dibuixar el diagrama de blocs del seu sistema; identificar entrada/sortida/realimentació; **+ repte:** pensar 3 exemples reals de cada tipus.
- **Tancament (10'):** quadern (diagrama).

> ⏱️ **Marge:** el temps efectiu real és ~100' (arrencada + recollida), no 120'. Si vas just, retalla primer: **el «+ repte» (3 exemples reals de cada tipus)**.

**Punt clau:** el **llaç tancat** corregeix segons el que mesura (realimentació); el **llaç obert** "confia" que tot anirà bé.

---

## SESSIÓ 2 (2 h) — Control tot/res i histèresi
- **Activació (10'):** *"Si encenc el ventilador a 25°C i l'apago a 25°C, què passa al voltant de 25°?"* → oscil·lació.
- **Modelatge (25'):** `02_termostat_histeresi.ino`. Control **tot/res** amb dos llindars (**histèresi**) per evitar el parpelleig.
- **Pràctica guiada (35'):** termòstat amb NTC + LED/ventilador i histèresi.
- **Repte (40'):** ajustar la finestra d'histèresi i observar l'efecte; **+ repte:** afegir indicador d'estat (verd/vermell).
- **Tancament (10'):** quadern (gràfic del comportament).

> ⏱️ **Marge:** el temps efectiu real és ~100' (arrencada + recollida), no 120'. Si vas just, retalla primer: **el «+ repte» (indicador verd/vermell)**. Recorda repartir la **targeta de represa de MicroPython** com a deures (vegeu més avall).

**Punt clau:** la **histèresi** (encendre a un llindar i apagar a un altre) evita commutacions ràpides al voltant de la consigna.

---

## SESSIÓ 3 (2 h) — Màquines d'estats + tancament del producte

> El producte de la SA **es tanca en aquesta sessió** (la S4 és, sencera, la prova T2).

- **Mini-check individual (10', a l'inici, substitueix la graella):** diagnosticar el "clic-clic" del termòstat i escriure els dos llindars ([banc](../00_General/00_Mini_checks_individuals.md)).
- **Modelatge (25'):** `03_maquina_estats.ino`. `enum` d'estats + `switch`; transicions per **temps** o per **esdeveniment** (polsador). Exemple: procés (espera → fase 1 → fase 2 → fet).
- **Pràctica guiada (30'):** implementen la màquina d'estats i la proven.
- **Repte (40'):** afegir un estat nou o una transició condicional; **+ repte:** semàfor adaptatiu (canvia segons polsador de vianant). **Defenses de 2-3' a peu de taula:** mentre treballen, passa per les parelles i escolta la defensa del producte (problema → solució → **una decisió tècnica justificada**: per què aquests llindars? per què aquests estats?). Valora amb els 3 indicadors de la **mini-rúbrica R4·DO** ([`07_Rubriques.md`](../../Programació%20didàctica/07_Rubriques.md)) — a aquestes altures del curs ja s'esperen tots tres.
- **Tancament (15'):** quadern (diagrama d'estats + diagrama de blocs); autoavaluació amb rúbriques.

> ⏱️ **Marge:** el temps efectiu real és ~100', i **aquesta és la sessió més carregada del trimestre** (mini-check + concepte nou + producte + defenses). Retalla d'entrada: **el «+ repte» (semàfor adaptatiu)** i, si cal, redueix el Repte a **una sola transició nova**. El mini-check, la màquina d'estats i les defenses a peu de taula **no es toquen**.

**Punt clau:** una **màquina d'estats** organitza comportaments complexos en estats clars i transicions; evita el codi espagueti i no bloqueja (s'usa amb `millis()`).

> 🧩 **Bastida `millis()` (clau per a aquesta sessió):** el patró no bloquejant amb `millis()` es **practica a la SA4** amb [`05_dos_leds_millis`](../SA4/codi/05_dos_leds_millis/05_dos_leds_millis.ino) (dos LED a ritmes diferents sense `delay()`). Si no s'ha fet, dedica-hi **~10'** ara com a escalfament. Per a qui s'encalli, reparteix l'esquelet de la secció «Si t'encalles» de la [pàgina de la pràctica de la màquina d'estats](codi/03_maquina_estats/EXPLICACIO.md): té el patró (`enum`/`switch` + `millis()`) ja muntat i només cal omplir els `// TODO` (comportament i transicions de cada estat).

---

## 🐍 Represa de MicroPython (entre la S2 i la prova T2)

> **Per què:** des de la SA5 no s'ha tocat Python (la SA6 és C++), però la **Part B de la prova T2 és en MicroPython**. Sense una represa explícita, l'alumnat arriba a la prova amb 4 setmanes de C++ al cap i la sintaxi de Python rovellada.

- **S2 (deures):** reparteix la targeta [`00_Repas_expres_MicroPython.md`](../00_General/00_Repas_expres_MicroPython.md) (taula C++↔Python + els 5 patrons de la prova + autotest amb solucions). 10-15' a casa, amb el simulador si no tenen placa.
- **S3 (5', després del mini-check):** «Python flash» col·lectiu — projecta la targeta i demana en veu alta: *com s'escriu aquest `if` en Python? què retorna `radio.receive()` si no hi ha res?* Dos o tres ping-pongs en tenen prou per reactivar-ho.
- **Qui suspèn l'autotest** (no sap fer el patró llindar+alerta sense mirar): que refaci les activitats 1-2 de la fitxa de SA5 abans de la prova.

---

## SESSIÓ 4 (2 h) — PROVA PRÀCTICA T2 (individual)

> 📋 **Aquesta sessió és, sencera, la prova trimestral T2** ([`Avaluació/Prova_practica_T2.md`](../../Avaluació/Prova_practica_T2.md)): individual, dues parts (control Arduino + micro:bit), quadern i esquemes consultables. **No s'hi programa cap altra activitat** ([`08_Sequenciacio`](../../Programació%20didàctica/08_Sequenciacio_temporal_anual.md)).

- **Instruccions (5-10'):** material (kit + 2 micro:bit per alumne/a segons dotació), què es pot consultar, estructura per nivells (nucli = histèresi; ampliacions = indicador, proporcional, ràdio).
- **Prova (95-100'):** Part A (control de temperatura amb histèresi) + Part B (estació remota micro:bit). El docent només resol incidències de material.
- **Tancament (10'):** recollida; recordar el **pla de millora personal** (es reprèn a l'inici de la SA7).

### +Ampliació: control proporcional (fora de sessió)

> ⚖️ **Nivell exigible:** el **nucli** d'aquesta SA és **llaç obert/tancat + histèresi + màquina d'estats**. El **control proporcional és +ampliació** (notable/excel·lent), coherent amb la graella de la prova T2. **Ja no té sessió pròpia:** és material per a qui va sobrat.

- **Material:** `04_control_proporcional.ino` + simulació Wokwi + repte ⭐ SA6_C (regulador proporcional) de [`Reptes/Reptes_SA6.md`](../../Reptes/Reptes_SA6.md).
- **Quan:** dins la S2/S3 per a parelles que acaben aviat; a casa amb Wokwi; o com a ampliació de la prova T2 (l'enunciat ja la preveu al nivell excel·lent).
- **Idea clau a transmetre:** el control **proporcional** dosifica l'actuació segons l'**error** → resposta més suau que el tot/res; si `Kp` és massa gran, oscil·la (limitar amb `constrain`). És la base del **PID** (cursos superiors).

**Producte:** sistema de control documentat (termòstat amb histèresi o procés amb màquina d'estats) amb **diagrama de blocs** i anàlisi de la resposta.
**Avaluació:** rúbriques **R1** (codi), **R3** (control), **R4** (documentació).

### Mapa d'avaluació (traçabilitat)
| Instrument | Què evidencia | Criteri | Rúbrica |
|---|---|---|---|
| Producte (termòstat / màquina d'estats, **S3**) + defensa 2-3' | Implementar un sistema de control i explicar-lo | CA3.1 | R3 |
| **Prova T2 (S4, individual)** | Control amb histèresi + programa micro:bit en solitari | CA1.1, CA1.2, CA3.1 | R1, R3, R4 |
| Quadern (diagrama de blocs + anàlisi) | Consigna, error, realimentació; anàlisi de la resposta | CA3.1 | R4 |
| Observació + Serial Plotter | Histèresi; (+ampliació) ajust de `Kp`, tot/res vs proporcional | CA3.1 | R3 |

*(CA1.1 = programar en C/C++; CA3.1 = implementar sistemes de control (llaç obert/tancat, màquines d'estats) i explicar-ne el funcionament. Vegeu [`Programació didàctica/06_Avaluacio_criteris_qualificacio.md`](../../Programació%20didàctica/06_Avaluacio_criteris_qualificacio.md). Comparteix R1, R3 i R4 **abans** de començar.)*

## Errors freqüents
| Error | Causa | Solució |
|---|---|---|
| El ventilador parpelleja sense parar | Sense histèresi | Usar dos llindars (encendre/apagar). |
| La màquina d'estats es "queda penjada" | Transició mal definida | Revisar condicions de cada `case`. |
| Lectura de temperatura inestable | Soroll del sensor | Mitjana de diverses lectures. |
| El control P oscil·la molt | `Kp` massa gran | Reduir `Kp`; limitar la sortida amb `constrain`. |

---

## Guió de modelatge (què verbalitzar)

> Frases i preguntes clau per al **Modelatge** de cada sessió (què mirar, què preguntar abans d'executar, error a anticipar).

> ✍️ **Katas:** en acabar el modelatge de cada sessió, projecta el kata de la pràctica del dia ([SA6_katas.md](SA6_katas.md)): 10' d'escriptura individual **abans** de repartir/obrir el sketch.

- **S1 · `01_llac_obert_vs_tancat`:** dibuixa el **diagrama de blocs** (consigna → error → actuador → sensor/realimentació). Pregunta: *"què passa si trec el sensor?"* → llaç obert ("confia" que tot anirà bé). *Error a anticipar:* confondre realimentació amb la sortida.
- **S2 · `02_termostat_histeresi`:** mostra l'**oscil·lació** amb un sol llindar i com **dos llindars** la maten. Demana predir el comportament a prop de la consigna. *Error a anticipar:* parpelleig per no posar histèresi.
- **S3 · `03_maquina_estats` (`enum`/`switch`):** recorre cada **estat** (què fa) i les seves **transicions** (quan canvia). Recorda la **bastida `millis()`** (no bloquejar). *Error a anticipar:* un `case` sense transició → la màquina es "penja".
- **S4 (prova T2):** cap modelatge — sessió de prova individual. *(Si algú fa l'ampliació del proporcional: al **Serial Plotter**, comparar tot/res vs proporcional; predir què passa si `Kp` és enorme; limitar amb `constrain`.)*

## Atenció a la diversitat (DUA)

| Via | Mesura |
|---|---|
| **Bastida** (qui s'encalla) | Donar el **diagrama de blocs** parcialment fet; començar amb el termòstat tot/res abans del proporcional; l'**esquelet amb `// TODO`** de la secció «Si t'encalles» de la [pàgina de la pràctica de la màquina d'estats](codi/03_maquina_estats/EXPLICACIO.md); parella heterogènia. |
| **+ Ampliació** (qui va sobrat) | Afegir estats, comparar tot/res vs P, ajustar `Kp`; reptes ⭐ de [`Reptes/Reptes_SA6.md`](../../Reptes/Reptes_SA6.md). |
| **Representació múltiple** | Diagrama de blocs i d'estats, **Serial Plotter** (resposta visual), simulació Wokwi. |
| **Implicació** | Cada parella tria el procés a controlar i la finestra d'histèresi. |

> ♿ **Accessibilitat (daltonisme):** si uses l'indicador **verd/vermell** d'estat, acompanya'l d'una **pista no cromàtica** (posició, etiqueta ON/OFF, o parpelleig) perquè l'estat no depengui només del color.

## Treball cooperatiu amb rols

Parelles amb **rols rotatius**: Coordinador/a · Programador/a · Enginyer/a de maquinari (sensor/actuador, seguretat) · Provador/a–Documentador/a (Serial Plotter + quadern). Quadre per rotar a la fitxa.

## Pensament computacional i depuració

- **PC d'aquesta SA:** **màquina d'estats** (estats + transicions) i **bucle de control** (mesurar → comparar → corregir).
- **Depuració:** rutina **DEPURA** amb el **Serial Plotter** per visualitzar si el sistema oscil·la o s'estabilitza.

## Avaluació formativa (instruments)

- **Diana d'autoavaluació** (fitxa) · **Coavaluació** "2 estrelles i un desig" · **Exit ticket** de tancament.
- **Mini-check individual** (10', **inici de la S3** — la S4 és la prova T2 —, no qualifica): diagnosticar el "clic-clic" del termòstat i escriure els dos llindars (histèresi). Vegeu [`../00_General/00_Mini_checks_individuals.md`](../00_General/00_Mini_checks_individuals.md).

## Connexió amb la IA (llavor)

> Llavor conceptual de **2–3'** (eix A del curs; vegeu `../00_IA_a_la_materia.md`). **És el saber literal del currículum:** *"Intel·ligència artificial aplicada als sistemes de control."*

Avui l'alumnat dissenya el control **a mà**: la histèresi, la màquina d'estats i la constant del proporcional les fixa **la persona**. Pregunta per plantar la llavor:

> *"I si el sistema **aprengués sol** la millor resposta a partir d'exemples, en lloc que tu n'ajustis les constants? Això és la **IA aplicada al control**."*

**Idea clau:** el control clàssic (tot/res, proporcional/PID) usa **regles i constants fixades per l'enginyer/a**; un controlador **basat en IA** **aprèn** la política de control de **dades**. Avantatge: serveix per a sistemes massa complexos per modelar a mà. Risc: depèn de les dades i és menys **explicable**. Ho aprofundirem a la SA8.

## Context real i ODS

- **Context:** termòstats, climatització, control de processos industrials.
- **ODS 7** (energia: el bon control estalvia) i **ODS 11** (edificis i ciutats sostenibles).
