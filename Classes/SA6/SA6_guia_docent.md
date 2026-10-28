# SA6 · Guia docent — Sistemes de control: llaç obert/tancat i màquines d'estats

**Durada:** 8 h (4 sessions; la 4a amb ampliacions opcionals) · **Maquinari:** el braç MeArm amb l'Arduino + sensor de col·lisió, ultrasons, 2 polsadors i el pont micro:bit · **Llenguatge:** C/C++
**Referència:** [`Programació didàctica/15_SA6_Sistemes_control.md`](../../Programació%20didàctica/15_SA6_Sistemes_control.md) · **Esquemes:** [`SA6_esquemes_connexions.md`](SA6_esquemes_connexions.md)

> 🧭 **Com s'usa aquesta guia.** **Abans de la SA:** objectius, material i codi de suport (la logística, al checklist docent). **A cada sessió:** la secció «SESSIÓ n» corresponent, amb el «Guió de modelatge» i els «Errors freqüents» a mà. **Durant tota la SA:** diversitat (DUA), ajuda i revisió entre iguals, i pensament computacional. **En avaluar:** «Avaluació formativa (instruments)». **Per contextualitzar:** context real i ODS.

> 🦾 **Fil conductor (des del 28-10-2026):** tots els sistemes de control de
> la SA són **del braç MeArm**: el llaç tancat és el **homing** amb el final de
> carrera, la histèresi és la **pinça automàtica** i la màquina d'estats és el
> **producte del braç** (repòs, manual, replay, emergència). El termòstat i el
> semàfor s'han retirat.

## Objectius de la SA
1. Distingir i implementar **control en llaç obert i en llaç tancat**.
2. Dissenyar una **màquina d'estats** per a un comportament seqüencial.
3. Implementar una regulació **tot/res (histèresi)** i una **proporcional** bàsica.
4. Representar el sistema amb un **diagrama de blocs**.

## Material per alumne/a
- Arduino UNO + USB, protoboard, cables.
- El **braç MeArm** cablejat (SA4) amb el pont micro:bit (SA5).
- Sensor de col·lisió KS0021, ultrasons HC-SR04 amb suport, 2 polsadors.

## Codi de suport (`codi/`)

> Cada sketch té la seva **pàgina de pràctica** (per què es fa + codi explicat per blocs, l'`EXPLICACIO.md` de la seva carpeta): és el text que l'alumnat pot rellegir si falta a classe o repassa a casa. El guió oral de sota continua sent teu.

| Fitxer | Contingut |
|---|---|
| `01_llac_obert_vs_tancat.ino` | La base del braç en llaç obert (confia) vs **homing** amb el final de carrera (llaç tancat). |
| `02_pinca_histeresi.ino` | Control tot/res amb histèresi: la **pinça automàtica** amb l'ultrasons (tanca < 6 cm, obre > 10 cm). |
| `03_maquina_estats.ino` | La **màquina d'estats del braç** (`enum`/`switch` + `millis()`): repòs, manual, replay i emergència, amb polsadors. La seva pàgina inclou l'**esquelet «Si t'encalles»**. |
| `04_control_proporcional.ino` | Moviment **proporcional** de la base (frena sol en arribar) **(+ampliació, no nucli)**. |

## Mètode de projecte i continuïtat
- **Cicle de treball** (com a tot el curs): *analitzar → dissenyar → prototipar → provar → millorar* (vegeu SA1). El **producte** n'és el recorregut complet i el **quadern tècnic** el documenta.
- **Lectura de codi amb PRIMM:** a cada *modelatge* l'alumnat **prediu** què farà el sketch **abans** d'executar-lo, després l'**investiga**, el **modifica** i en **crea** un de nou. **Operativa (val per a totes les sessions amb codi):** dedica els primers ~5' del Modelatge a projectar el codi nou **sense executar-lo** i recollir prediccions; només després, executa i investiga.
- **Pont (d'on venim / on anem):** ve de la **SA5** (el comandament del braç) → portem a la **SA7** (robòtica mòbil). El **llaç tancat** i les **màquines d'estats** d'aquí són la base dels **comportaments autònoms** del robot (evitar obstacles, seguir línia).
- **Activació de cada sessió (rutina #1 del curs):** els primers **5'** dels 10' d'activació són la **graella de repàs espaiat** — 3 preguntes projectades, tothom escriu, no qualifica. Les graelles d'aquesta SA, llestes per projectar, són al [banc](../00_General/00_Banc_activacio_repas.md); la pregunta ganxo que obre cada sessió, aquí sota, ocupa la resta. *(El dia del mini-check, el mini-check les substitueix totes dues.)*

---

## SESSIÓ 1 (2 h) — Llaç obert, llaç tancat i homing

> 🔄 **Reentrada a C++ (abans de la sessió):** l'alumnat porta 3 setmanes en Python (SA5) i avui torna a C++. La targeta [`00_Repas_expres_Cpp.md`](../00_General/00_Repas_expres_Cpp.md) s'ha repartit com a deures al tancament de la SA5 S3. Dedica **5' de l'activació** al «C++ flash» de sota. ⏱️ **Aquell dia l'activació no hi cap sencera**: el flash **substitueix la graella de repàs** (`00_Banc_activacio_repas.md`) — 5' de flash + 4' de pregunta ganxo + 1' de referent. No els sumis. Qui falli l'autotest de la targeta: derivar a `SA0_guia_programacio.md` Part A abans de la S2.
>
> **Guió del «C++ flash» (5', oral i col·lectiu).** Projecta el nucli de la inclinació de la SA5 ([`02_inclinacio.py`](../SA5/codi/02_inclinacio.py)) — l'han escrit ells fa dues setmanes — i demana traduir-lo **en veu alta** a C++ d'Arduino, imaginant que la inclinació fos un potenciòmetre. No cal executar res: és gimnàstica de sintaxi.
>
> ```python
> x = accelerometer.get_x()
> if x > LLINDAR:
>     display.show(Image.ARROW_E)
> else:
>     display.show(Image.DIAMOND_SMALL)
> sleep(100)
> ```
>
> Preguntes en cadena (una per mà alçada): *com es declara `x` a C++?* (tipus davant: `int`) → *d'on surt la lectura amb Arduino?* (`analogRead(A0)`) → *què li falta a l'`if` de Python perquè compili a C++?* (parèntesis, claus, i `;` a cada instrucció) → *i el `sleep(100)`?* (`delay(100)`). Resultat esperat a la pissarra:
>
> ```cpp
> int x = analogRead(A0);
> if (x > LLINDAR) {
>   base.write(135);
> } else {
>   base.write(90);
> }
> delay(100);
> ```
>
> Remata amb la pregunta pont: *"i el `while True:` de MicroPython, on és a Arduino?"* → **és el `loop()`**: Arduino te'l dona fet. Aquest mateix patró llindar+actuador és, exactament, la pinça automàtica que construiran a la S2 (amb un llindar més: la histèresi).

- **Activació (10'):** *"Com sap un braç industrial on és quan s'engega?"* → busca el seu zero (homing).
- 🔭 **Referent (1', dins l'activació):** **Irmgard Flügge-Lotz**, teòrica del control discontinu (tot/res) — exactament la histèresi d'aquesta SA ([guió](../00_General/00_Referents_tecnologia.md)).
- 🔧 **Torn de taller del braç (20', al principi):** muntar el **sensor de col·lisió** a la base (D2), on la palanca de la base el toca en girar del tot: és el final de carrera de la pràctica d'avui i l'emergència de la S3 ([dossier](../00_General/00_Projecte_T2_Brac.md)).
- **Modelatge (20'):** conceptes: **consigna, sensor (realimentació), error, actuador**. **Llaç obert** (envia i confia) vs **llaç tancat** (comprova amb un sensor). **Diagrama de blocs**.
- **Pràctica guiada (25'):** `01_llac_obert_vs_tancat.ino`: la base en mode obert vs **homing**; mouen el sensor de lloc i comparen què passa en cada mode.
- **Repte (25'):** dibuixar el diagrama de blocs del braç (el replay és llaç obert, l'emergència i el homing són llaç tancat); identificar entrada/sortida/realimentació.
- **Tancament (10'):** quadern (diagrama).

> ⏱️ **Marge:** el temps efectiu real és ~100' (arrencada + recollida), no 120'. Si vas just, retalla primer: **el repte** (el diagrama de blocs passa a deures). El taller no es retalla: la pràctica el necessita.

**Punt clau:** el **llaç tancat** corregeix segons el que mesura (realimentació); el **llaç obert** "confia" que tot anirà bé.

---

## SESSIÓ 2 (2 h) — Histèresi: la pinça automàtica
- **Activació (10'):** *"Recordeu el «ball» del braç a la SA4 amb l'objecte just al llindar? Si la pinça es tanca a 8 cm i s'obre a 8 cm, què passa a 8 cm?"* → clic-clic.
- **Modelatge (20'):** `02_pinca_histeresi.ino`. Control **tot/res** amb dos llindars (**histèresi**) i una variable d'**estat** (la memòria). Serial Plotter amb la distància i els dos llindars.
- **Pràctica guiada (25'):** la pinça automàtica a l'estació de recollida; primer amb un sol llindar (veuen el clic-clic), després amb dos.
- **Repte (20'):** ajustar la finestra d'histèresi i observar l'efecte; **+ repte:** indicador d'estat amb un LED.
- 🔧 **Torn de taller del braç (20'):** trobar i anotar al quadern els **angles límit** definitius de cada servo, i deixar el cablatge **endreçat i etiquetat** (criteri R1 de la rúbrica del braç). Així la S3 queda només per a la màquina d'estats.
- **Tancament (10'):** quadern (gràfic del comportament).

> ⏱️ **Marge:** el temps efectiu real és ~100' (arrencada + recollida), no 120'. Si vas just, retalla primer: **el «+ repte» (LED d'estat)**. Recorda repartir la **targeta de represa de MicroPython** com a deures (vegeu més avall).

**Punt clau:** la **histèresi** (tancar a un llindar i obrir a un altre) evita commutacions ràpides al voltant de la frontera. El sistema necessita **memòria** (l'estat de la pinça) per decidir.

---

## SESSIÓ 3 (2 h) — Màquina d'estats del braç + tancament del producte

> El producte de la SA **es tanca en aquesta sessió** (la S4 és, sencera, la prova T2).

- **Mini-check individual (10', a l'inici, substitueix la graella i el kata):** diagnosticar el "clic-clic" de la pinça i escriure els dos llindars ([banc](../00_General/00_Mini_checks_individuals.md)).
- **«Python flash» (5', enganxat al mini-check):** els ping-pongs orals de la represa de MicroPython (secció de sota). Compta'ls: **van dins d'aquests 100'**, no a sobre.
- **Modelatge (25'):** `03_maquina_estats.ino`. `enum` d'estats + `switch`; transicions per **esdeveniment** (polsadors, col·lisió) i per **temps** (`millis()` al replay); l'**emergència abans del `switch`**. Dibuixa el diagrama d'estats del braç.
- **Pràctica guiada (30'):** carreguen la màquina d'estats al braç i la proven: gravar tres punts, reproduir-los, provocar l'emergència amb el dit.
- **Producte (40'):** la mateixa màquina amb el **comandament per ràdio**: les ordres `A`, `R` i `G` arriben pel pont (codi de referència al [dossier](../00_General/00_Projecte_T2_Brac.md#la-màquina-destats-del-braç)); prova final: agafar un objecte i deixar-lo en un altre lloc. **Defenses individuals de 2-3' a peu de taula (amb 5 alumnes, ~15' en total, repartits mentre la resta treballa):** passa per cada lloc i escolta la defensa del seu producte (problema → solució → **una decisió tècnica justificada**: per què aquests llindars? per què aquests estats?). Valora amb els 3 indicadors de la **mini-rúbrica R4·DO** ([`07_Rubriques.md`](../../Programació%20didàctica/07_Rubriques.md)) — a aquestes altures del curs ja s'esperen tots tres.
- **Tancament (10'):** quadern (diagrama d'estats + diagrama de blocs); autoavaluació amb rúbriques.

> ⏱️ **Marge: aquesta sessió no hi cap sencera i cal decidir-ho abans d'entrar.** Sumada tal com està (10+5+25+30+40+10) fa 120' i el temps efectiu real és ~100': **és la sessió més carregada del trimestre** (mini-check + represa de Python + concepte nou + producte + defenses). Retalla **d'entrada, no sobre la marxa**: ① la integració amb la ràdio (el producte es pot defensar amb els polsadors) i ② la prova final d'agafar l'objecte (40' → 25'). Amb això queda en ~105' i és fer-ho. El mini-check, el modelatge de la màquina d'estats i les defenses a peu de taula **no es toquen**; el «Python flash» tampoc (la Part B de la prova T2 hi depèn).
>
> 👥 **Amb grup petit la sessió hi cap sencera** i aquestes retallades passen a ser opcionals: les defenses de 2-3' costen ~15' en lloc de 30, i la pràctica guiada va sola (vegeu `04_Metodologia.md` §4.2).

**Punt clau:** una **màquina d'estats** organitza comportaments complexos en estats clars i transicions; evita el codi espagueti i no bloqueja (s'usa amb `millis()`).

> 🧩 **Bastida `millis()` (clau per a aquesta sessió):** el patró no bloquejant amb `millis()` es **practica a la SA4** amb [`05_dos_servos_millis`](../SA4/codi/05_dos_servos_millis/EXPLICACIO.md) (base i pinça a ritmes diferents sense `delay()`). Si no s'ha fet, dedica-hi **~10'** ara com a escalfament. Per a qui s'encalli, reparteix l'esquelet de la secció «Si t'encalles» de la [pàgina de la pràctica de la màquina d'estats](codi/03_maquina_estats/EXPLICACIO.md): té el patró (`enum`/`switch` + `millis()`) ja muntat i només cal omplir els `// TODO` (comportament i transicions de cada estat).

---

## 🐍 Represa de MicroPython (entre la S2 i la prova T2)

> **Per què:** des de la SA5 no s'ha tocat Python (la SA6 és C++), però la **Part B de la prova T2 és en MicroPython**. Sense una represa explícita, l'alumnat arriba a la prova amb 4 setmanes de C++ al cap i la sintaxi de Python rovellada.

- **S2 (deures):** reparteix la targeta [`00_Repas_expres_MicroPython.md`](../00_General/00_Repas_expres_MicroPython.md) (taula C++↔Python + els 5 patrons de la prova + autotest amb solucions). 10-15' a casa, amb el simulador si no tenen placa.
- **S3 (5', després del mini-check):** «Python flash» col·lectiu — projecta la targeta i demana en veu alta: *com s'escriu aquest `if` en Python? què retorna `radio.receive()` si no hi ha res?* Dos o tres ping-pongs en tenen prou per reactivar-ho.
- **Qui suspèn l'autotest** (no sap fer el patró llindar+alerta sense mirar): que refaci les activitats 1-2 de la fitxa de SA5 abans de la prova.

---

## SESSIÓ 4 (2 h) — PROVA PRÀCTICA T2 (individual)

> 📋 **Aquesta sessió és, sencera, la prova trimestral T2** ([`Avaluació/Prova_practica_T2.md`](../../Avaluació/Prova_practica_T2.md)): individual, dues parts (control Arduino + micro:bit), quadern i esquemes consultables. **No s'hi programa cap altra activitat** ([`08_Sequenciacio`](../../Programació%20didàctica/08_Sequenciacio_temporal_anual.md)).

- **Instruccions (5-10'):** material (el braç o un servo solt + ultrasons, i 2 micro:bit), què es pot consultar, estructura per nivells (nucli = histèresi; ampliacions = indicador, proporcional, ràdio).
- **Prova (~80-85'):** Part A (pinça automàtica amb histèresi) + Part B (comandament micro:bit). El docent només resol incidències de material.
- **Tancament (10'):** recollida; recordar el **pla de millora personal** (es reprèn a l'inici de la SA7).

> ⏱️ **Marge:** ~95-105' efectius, no 120'. Instruccions + recollida se'n mengen 15-20', així que la prova real són **~80-85'**, i el **nucli (Part A, histèresi) està calibrat per a ~60'**. Si el grup arrenca tard, retalla **les instruccions**, mai el temps de prova; la Part B (micro:bit) es pot valorar amb el que hi hagi fet al minut de tancar.

### +Ampliació: control proporcional (fora de sessió)

> ⚖️ **Nivell exigible:** el **nucli** d'aquesta SA és **llaç obert/tancat + histèresi + màquina d'estats**. El **control proporcional és +ampliació** (notable/excel·lent), coherent amb la graella de la prova T2. **Ja no té sessió pròpia:** és material per a qui va sobrat.

- **Material:** `04_control_proporcional.ino` + simulació Wokwi + repte ⭐ SA6_C (regulador proporcional) de [`Reptes/Reptes_SA6.md`](../../Reptes/Reptes_SA6.md).
- **Quan:** dins la S2/S3 per a qui acaba aviat; a casa amb Wokwi; o com a ampliació de la prova T2 (l'enunciat ja la preveu al nivell excel·lent).
- **Idea clau a transmetre:** el control **proporcional** dosifica l'actuació segons l'**error** → el braç arrenca ràpid i frena sol en arribar, en lloc de saltar; si `K` és massa petit, va lentíssim, i si és 1, torna a saltar. És la base del **PID** (cursos superiors).

**Producte:** el **braç MeArm amb la seva màquina d'estats** (repòs, manual, replay, emergència) i el comandament per ràdio, documentat amb **diagrama d'estats** i **diagrama de blocs**.
**Avaluació:** rúbriques **R1** (codi), **R3** (control), **R4** (documentació).

### Mapa d'avaluació (traçabilitat)
| Instrument | Què evidencia | Criteri | Rúbrica |
|---|---|---|---|
| Producte (màquina d'estats del braç, **S3**) + defensa individual de 2-3' | Implementar un sistema de control i explicar-lo | CA3.1 | R3 |
| **Prova T2 (S4, individual)** | Control amb histèresi + programa micro:bit en solitari | CA1.1, CA1.2, CA3.1 | R1, R3, R4 |
| Quadern (diagrama de blocs + anàlisi) | Consigna, error, realimentació; anàlisi de la resposta | CA3.1 | R4 |
| Observació + Serial Plotter | Histèresi de la pinça; (+ampliació) ajust de `K`, salt vs moviment proporcional | CA3.1 | R3 |
| Ajuda entre iguals i **revisió creuada** de codi | Cooperació sense producte compartit: línia d'ajuda del quadern + una millora concreta i un dubte al company | CA5.3 | **R5** |

*(CA1.1 = programar en C/C++; CA3.1 = implementar sistemes de control (llaç obert/tancat, màquines d'estats) i explicar-ne el funcionament. Vegeu [`Programació didàctica/06_Avaluacio_criteris_qualificacio.md`](../../Programació%20didàctica/06_Avaluacio_criteris_qualificacio.md). Comparteix R1, R3 i R4 **abans** de començar.)*

## Errors freqüents
| Error | Causa | Solució |
|---|---|---|
| La pinça fa clic-clic | Sense histèresi (un sol llindar) | Usar dos llindars (tancar/obrir) i una variable d'estat. |
| La màquina d'estats es "queda penjada" | Transició mal definida | Revisar condicions de cada `case`. |
| La distància salta a l'atzar | Soroll o eco de la taula | Mitjana de diverses lectures; apuntar l'ultrasons més amunt. |
| L'emergència no salta durant el replay | `delay()` al replay o comprovació dins d'un `case` | `millis()` i la comprovació abans del `switch`. |
| El moviment proporcional no arriba mai a la consigna | `angle` declarat `int` (els passos petits es perden) | Declarar `angle` com a `float` i arrodonir en escriure. |

---

## Guió de modelatge (què verbalitzar)

> Frases i preguntes clau per al **Modelatge** de cada sessió (què mirar, què preguntar abans d'executar, error a anticipar).

> ✍️ **Katas:** en acabar el modelatge de cada sessió amb pràctica de codi, projecta el kata del sketch del dia ([SA6_katas.md](SA6_katas.md)): 10' d'escriptura individual **abans** de repartir/obrir el sketch. **Un sol kata per sessió**; el dia del mini-check (**S3** en aquesta SA) el mini-check el substitueix, i el kata `03_maquina_estats` queda com a **repàs autònom** (marcat amb 🔁 al fitxer): recomana'l com a deures abans de tancar la SA. Per a la posada en comú, tens la solució comentada de cada kata (amb els valors de la variació) a [SA6_katas_solucions.md](SA6_katas_solucions.md).

- **S1 · `01_llac_obert_vs_tancat`:** dibuixa el **diagrama de blocs** del braç (consigna → controlador → servo → base, i el final de carrera tancant el llaç). Pregunta: *"què passa si el sensor no és on creiem?"* → el llaç obert no se n'assabenta; el homing el troba. *Error a anticipar:* confondre realimentació amb la sortida.
- **S2 · `02_pinca_histeresi`:** mostra el **clic-clic** amb un sol llindar i com **dos llindars** el maten. Demana predir a quina distància es tanca i a quina s'obre (no és la mateixa!). *Error a anticipar:* condicions sense l'estat (`pincaTancada`) i la pinça torna a fer clic-clic.
- **S3 · `03_maquina_estats` (`enum`/`switch`):** recorre cada **estat** del braç (què fa) i les seves **transicions** (quan canvia); insisteix en l'**emergència abans del `switch`**. Recorda la **bastida `millis()`** (no bloquejar el replay). *Error a anticipar:* un `case` sense transició → la màquina es "penja"; botons llegits sense flanc → una premuda fa dues coses.
- **S4 (prova T2):** cap modelatge — sessió de prova individual. *(Si algú fa l'ampliació del proporcional: al **Serial Plotter**, comparar el salt (`K = 1`) amb el moviment proporcional; predir què passa amb `K = 0.02`.)*

## Atenció a la diversitat (DUA)

| Via | Mesura |
|---|---|
| **Bastida** (qui s'encalla) | Donar el **diagrama de blocs** i el **diagrama d'estats** parcialment fets; provar la pinça amb un sol llindar abans dels dos; l'**esquelet amb `// TODO`** de la secció «Si t'encalles» de la [pàgina de la pràctica de la màquina d'estats](codi/03_maquina_estats/EXPLICACIO.md); si cal, agrupament puntual amb un company/a que ja ho tingui resolt (qui escriu / qui verifica). |
| **+ Ampliació** (qui va sobrat) | Afegir estats al braç (p. ex. CASA), moviment proporcional, ajustar `K`; reptes ⭐ de [`Reptes/Reptes_SA6.md`](../../Reptes/Reptes_SA6.md). |
| **Representació múltiple** | Diagrama de blocs i d'estats, **Serial Plotter** (resposta visual), simulació Wokwi. |
| **Implicació** | Cada alumne/a tria la tasca que el seu braç grava i reprodueix, i la finestra d'histèresi de la seva pinça. |

> ♿ **Accessibilitat (daltonisme):** si uses l'indicador **verd/vermell** d'estat, acompanya'l d'una **pista no cromàtica** (posició, etiqueta ON/OFF, o parpelleig) perquè l'estat no depengui només del color.

## Cooperació (amb treball individual)

El treball és **individual**: cadascú munta el seu sistema de control, escriu el seu codi i el defensa ([`04_Metodologia.md` §4.3](../../Programació%20didàctica/04_Metodologia.md)). La cooperació —el **CA5.3** i la **R5**— s'evidencia en la **revisió creuada de codi** (cadascú llegeix el codi d'un company i li retorna **una millora concreta i un dubte**) i en l'**ajuda documentada** al quadern.

> Si en algun moment ajuntes dues persones (material que falla, una absència, un repte massa gros), reparteix només **qui escriu** i **qui verifica**, i fes que s'intercanviïn a mitja sessió; el producte i la defensa continuen sent de cadascú.

## Pensament computacional i depuració

- **PC d'aquesta SA:** **màquina d'estats** (estats + transicions) i **bucle de control** (mesurar → comparar → corregir).
- **Depuració:** rutina **DEPURA** amb el **Serial Plotter** per visualitzar si el sistema oscil·la o s'estabilitza.

## Avaluació formativa (instruments)

- **Diana d'autoavaluació** (fitxa) · **Revisió creuada de codi** (una millora concreta i un dubte sobre el codi d'un company) · **Exit ticket** de tancament.
- **Mini-check individual** (10', **inici de la S3** — la S4 és la prova T2 —, no qualifica): diagnosticar el "clic-clic" de la pinça i escriure els dos llindars (histèresi). Vegeu [`../00_General/00_Mini_checks_individuals.md`](../00_General/00_Mini_checks_individuals.md).

## Connexió amb la IA (llavor)

> Llavor conceptual de **2–3'** (eix A del curs; vegeu `../00_IA_a_la_materia.md`). **És el saber literal del currículum:** *"Intel·ligència artificial aplicada als sistemes de control."*

Avui l'alumnat dissenya el control del braç **a mà**: la histèresi de la pinça, la màquina d'estats i la constant del proporcional les fixa **la persona**. Pregunta per plantar la llavor:

> *"I si el sistema **aprengués sol** la millor resposta a partir d'exemples, en lloc que tu n'ajustis les constants? Això és la **IA aplicada al control**."*

**Idea clau:** el control clàssic (tot/res, proporcional/PID) usa **regles i constants fixades per l'enginyer/a**; un controlador **basat en IA** **aprèn** la política de control de **dades**. Avantatge: serveix per a sistemes massa complexos per modelar a mà. Risc: depèn de les dades i és menys **explicable**. Ho aprofundirem a la SA8.

## Context real i ODS

- **Context:** braços industrials (homing, finals de carrera, aturades d'emergència), pinces automàtiques, termòstats i climatització (la mateixa histèresi), control de processos.
- **ODS 7** (energia: el bon control estalvia) i **ODS 11** (edificis i ciutats sostenibles).
