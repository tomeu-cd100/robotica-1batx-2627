# SA3 · Guia docent — Entrades i sensors: el robot percep

**Durada:** 8 h (4 sessions) · **Maquinari:** Arduino UNO + Keyestudio (polsador, potenciòmetre, LDR, NTC) + pantalla OLED SSD1306 0,96" i 3 polsadors per al tamagotchi · **Llenguatge:** C/C++
**Referència:** [`Programació didàctica/12_SA3_Entrades_sensors.md`](../../Programació%20didàctica/12_SA3_Entrades_sensors.md) · **Esquemes:** [`SA3_esquemes_connexions.md`](SA3_esquemes_connexions.md)

## ⚡ Xuleta de sessió (si només llegeixes una cosa, que sigui això)

> L'alumnat segueix la **ruta de pràctiques de la [portada de la SA3](README.md)** al seu ritme: cada pràctica és una pàgina de passos que acaba enviant el seu formulari, i les 🚩 marquen on hauria de ser cadascú al final de cada sessió. Tu fas una **arrencada de 5-10'** i després **circules** per les taules. La resta de la guia és el detall per si el necessites.

> 🚩 **L'arrencada explica la pràctica de la fita del dia** (S1: la ①; S2: la ②; S3: la ④ tamagotchi, després del mini-check i dels 25' de la ③ OLED), no la SA sencera. Qui va endarrerit té el mateix contingut al «🧠 Vols saber per què funciona?» de cada pràctica.

| | 🗣️ Arrencada (5-10': només això) | 👀 Mentre treballen, vigila | ✅ Abans que marxin, comprova |
|---|---|---|---|
| **S1** · Polsador | Amb `INPUT_PULLUP` el pin està «agafat» a HIGH i prémer l'estira a LOW: **al revés del que esperen**. Obre el **Monitor sèrie** (9600) en directe. | Polsador mal punxat (potes de dos en dos) · Monitor amb un *baud* diferent de 9600 | Comptador funcionant al Monitor · formulari de la ① enviat |
| **S2** · Analògiques | `analogRead` dona **0 a 1023**; `analogWrite` vol **0 a 255** → `map()`. Mou el potenciòmetre en directe amb el Monitor obert. | LDR sense la resistència de 10 kΩ (llegeix sempre 0 o 1023) · llindar comparat amb 255 | Llum automàtic funcionant · Racó de mesura fet · formulari de la ② enviat. **Deures:** nom i caràcter de la mascota |
| **S3** · Tamagotchi | Mini-check (10'). Després, en 5': la pantalla és una quadrícula de 128×64 punts i es dibuixa **a trossos** (`firstPage`/`nextPage`); al tamagotchi, el temps es controla amb `millis()`, no amb `delay()`. | SDA/SCL intercanviats · botons que sumen mentre estan premuts (falta comparar amb l'estat anterior) · restar necessitats a cada volta del `loop()` · tamagotchis sense fitxa de personalitat | Tamagotchi amb la **versió nucli** com a mínim · fitxa de personalitat · defensa d'1' a peu de taula · formularis de la ③ i la ④ i **Entrega final** enviats · **full resum** per a la prova fet |
| **S4** · Prova T1 | Res: només les instruccions de la prova. | Incidències de material (no dubtes de contingut) | Proves recollides |

> 🎯 **Prioritat si vas just de temps:** a la S3, el tamagotchi passa per davant de tot. Si l'OLED s'allarga, talla-la quan tothom vegi la cara a la pantalla. Els **ultrasons** ja no són a la SA3: es treballen a la SA4 (arxiu a [`docs/arxiu/SA3_ultrasons/`](../../docs/arxiu/SA3_ultrasons/README.md)). Els **katas** d'aquesta SA estan arxivats (18-10-2026, [`docs/arxiu/SA3_katas/`](../../docs/arxiu/SA3_katas/README.md)).

---

> 🧭 **Com s'usa aquesta guia.** **Abans de la SA:** objectius, material i codi de suport (la logística, al checklist docent). **A cada sessió:** la secció «SESSIÓ n» corresponent, amb el «Guió de modelatge» i els «Errors freqüents» a mà. **Durant tota la SA:** diversitat (DUA), treball individual amb ajuda entre iguals i pensament computacional. **En avaluar:** «Avaluació formativa (instruments)». **Per contextualitzar:** context real i ODS.

## Objectius de la SA
1. Llegir entrades digitals (`digitalRead`) i analògiques (`analogRead`) i interpretar-ne els valors.
2. Aplicar **funcions** definides per l'usuari per modularitzar.
3. Usar el **monitor/traçador sèrie** per depurar i visualitzar dades.
4. Connectar percepció (sensor) amb acció (actuador).

## Material per alumne/a
- Arduino UNO + USB, protoboard, cables.
- Polsador, potenciòmetre, LDR + resistència 10 kΩ, NTC + 10 kΩ, LED, brunzidor piezo.
- **Tamagotchi (S3):** pantalla **OLED SSD1306 0,96" I²C**, **3 polsadors**, LED RGB, micròfon, PIR i la **carcassa en forma d'ou** fabricada a la SA2 S3 ([dossier](../00_General/00_Projecte_T1_Mascota.md)).

## Codi de suport (carpeta `codi/`)

> Cada sketch té la seva **pàgina de pràctica** (per què es fa + codi explicat per blocs, l'`EXPLICACIO.md` de la seva carpeta): és el text que l'alumnat pot rellegir si falta a classe o repassa a casa. El guió oral de sota continua sent teu.

| Fitxer | Contingut |
|---|---|
| `01_polsador_debounce.ino` | Entrada digital amb *pull-up* i antirebot; comptador. |
| `02_potenciometre_ldr.ino` | Entrades analògiques; `map()`; llum automàtic. |
| `03_pantalla_oled.ino` | Pantalla OLED amb U8g2 en mode pàgina: text, barra i cara segons la llum. |
| `05_mascota.ino` | **Esquelet del tamagotchi** (producte): pantalla i baixada de les necessitats fetes; `// TODO` de botons, sensors i estats. |

## Mètode de projecte i continuïtat
- **Cicle de treball** (com a tot el curs): *analitzar → dissenyar → prototipar → provar → millorar* (vegeu SA1). El **producte** n'és el recorregut complet i el **quadern tècnic** el documenta.
- **Lectura de codi amb PRIMM:** a cada *modelatge* l'alumnat **prediu** què farà el sketch **abans** d'executar-lo, després l'**investiga**, el **modifica** i en **crea** un de nou. **Operativa (val per a totes les sessions amb codi):** dedica els primers ~5' del Modelatge a projectar el codi nou **sense executar-lo** i recollir prediccions; només després, executa i investiga.
- **Pont (d'on venim / on anem):** ve de la **SA2** (sortides/actuadors) → portem a la **SA4** (moviment). Aquí el sistema aprèn a **percebre** (sensors); a la SA4 la percepció **mourà** servos i motors.
- **Activació de cada sessió (rutina #1 del curs):** els primers **5'** dels 10' d'activació són la **graella de repàs espaiat** — 3 preguntes projectades, tothom escriu, no qualifica. Les graelles d'aquesta SA, llestes per projectar, són al [banc](../00_General/00_Banc_activacio_repas.md); la pregunta ganxo que obre cada sessió, aquí sota, ocupa la resta. *(El dia del mini-check, el mini-check les substitueix totes dues.)*

---

## SESSIÓ 1 (2 h) — Entrades digitals i monitor sèrie
- **Activació (10'):** *"Com sap la placa que has premut un botó?"*
- 🔭 **Referent (1', dins l'activació):** **Marie Van Brittan Brown**, inventora del primer sistema de videovigilància domèstica (1966) — l'avantpassat dels sistemes que «noten» i reaccionen d'aquesta SA ([guió](../00_General/00_Referents_tecnologia.md)).
- **Modelatge (25'):** `01_polsador_debounce.ino`. `INPUT_PULLUP` (per què evita el cable extra), `digitalRead`, **antirebot** (*debounce*) i **Serial Monitor**.
  - **`millis()` en 2':** és el primer cop que el fan servir de debò (a la SA2 només es va presentar). Digues-ho amb el rellotge de la paret: `millis()` no espera res, es *consulta*, i el temps que ha passat sempre es calcula **restant** (`millis() - ultimCanvi`).
- **Pràctica guiada (35'):** munten el polsador al pin 2; obren el monitor sèrie i compten premudes. El LED del pin 8 ja canvia a cada premuda (*toggle*).
- **Repte (30'):** comptar fins a 5 i tornar a 0; **+ repte:** que el LED només s'encengui a la 5a premuda.
- **Tancament (10'):** envien el formulari de la Pràctica 1 (🚩 de la S1).

> ⏱️ **Marge:** 10+25+2+35+30+10 = **112'** sobre ~100' efectius. Si vas just, retalla primer: ① el **«+ repte»** · ② el **repte a 20'**. Amb els katas arxivats, la sessió ja no va tan justa com abans.
>
> 👥 **Amb grup petit no cal retallar**: la pràctica guiada va sola quan no hi ha cua per muntar el polsador (vegeu `04_Metodologia.md` §4.2).

**Punt clau:** amb `INPUT_PULLUP` el pin llegeix **HIGH en repòs** i **LOW en prémer** (lògica invertida). El *debounce* evita lectures múltiples per un sol clic.

---

## SESSIÓ 2 (2 h) — Entrades analògiques
- **Activació (10'):** *"Quants valors pot tenir una entrada analògica?"* → 0-1023.
- **Modelatge (25'):** `02_potenciometre_ldr.ino`. `analogRead` (conversió A/D 10 bits), **`map()`** per reescalar, divisor de tensió per a la LDR.
- **Pràctica guiada (35'):** llegeixen potenciòmetre (A0) i LDR (A1) al monitor; regulen la intensitat d'un LED amb el potenciòmetre (PWM).
- **Repte (40'):** **llum automàtic** (LDR → LED s'encén si fa fosc) amb llindar; **+ repte:** llindar ajustable amb el potenciòmetre.
- **Tancament (10'):** envien el formulari de la Pràctica 2 (la taula de lectures hi és); recorda els deures del tamagotchi (nom i caràcter).

> ⏱️ **Marge:** el temps efectiu real és ~100' (arrencada + recollida), no 120'. Si vas just, retalla primer: **el «+ repte» (llindar ajustable amb el potenciòmetre)**.

**Punt clau:** `analogRead` retorna 0-1023; `analogWrite` necessita 0-255 → cal **`map()`**. El divisor de tensió converteix la resistència variable (LDR/NTC) en tensió mesurable.

> 🔌 **Racó de mesura (dins la pràctica guiada, ~5' per alumne/a):** amb el **multímetre** al punt mig del divisor LDR–10 kΩ, comparar la **tensió real** amb la lectura del programa: `lectura/1023 · 5 V ≈ V mesurada` (p. ex. 512 → ~2,5 V). Tapar la LDR i veure com **totes dues** baixen alhora. Fa tangible què fa l'ADC (converteix tensió en nombre) i tanca el cicle de la **CA2.2**: mesurar amb instrument + interpretar amb software. El multímetre passa a ser eina oficial de la fase *Examina* de DEPURA per al maquinari.

---

## SESSIÓ 3 (2 h) — Pantalla OLED + PRODUCTE: el tamagotchi

> El producte de la SA **es tanca en aquesta sessió** (la S4 és, sencera, la prova T1), i el producte és **el tamagotchi** del fil conductor ([`00_Fil_conductor_robots.md`](../00_General/00_Fil_conductor_robots.md) · [dossier](../00_General/00_Projecte_T1_Mascota.md)): la carcassa en forma d'ou fabricada a la SA2 S3 amb l'OLED, 3 botons i els sensors, i una mascota virtual que **es cuida**: necessitats que baixen amb el temps i amb els sensors, i estats contenta, trista i malalta (mai no es mor). Els **ultrasons** ja no són aquí: passen a la SA4.

- **Mini-check individual (10', a l'inici, substitueix la graella):** `if/else` sobre una lectura analògica ([banc](../00_General/00_Mini_checks_individuals.md)).
- **③ La pantalla OLED (25'):** [`03_pantalla_oled.ino`](codi/03_pantalla_oled/EXPLICACIO.md). La pantalla com a quadrícula de punts, `drawStr`, `drawCircle`, `drawBox` i el dibuix per pàgines (`firstPage`/`nextPage`, per la RAM del UNO). Talla quan tothom vegi la cara canviar amb la llum.
- **④ PRODUCTE: el tamagotchi (55'):**
  1. **Fitxa de personalitat (10'):** nom, caràcter i què fa cada botó i cada sensor. Si ho porten pensat de casa (deures de la S2), van més ràpid.
  2. **Muntatge i codi (45'):** [`05_mascota.ino`](codi/05_mascota/EXPLICACIO.md) a la carcassa. L'esquelet ja dibuixa la cara i les barres i fa baixar les necessitats amb `millis()`; el botó MENJAR és l'exemple resolt. Omplen JUGAR i DORMIR, la llum (`esFosc`), el soroll (amb temps d'espera) i `calculaEstat()`.
  3. **Mini-defensa individual d'1' a peu de taula**, mentre treballen: presenta el tamagotchi, què fa cada botó i com l'afecten els sensors.
- **Tancament (10'):** **full resum** en paper per a la prova (pas «Omple el full resum» de la Pràctica 4), formularis de la ③ i la ④, **Entrega final** (autoavaluació + checklist) i desar el codi.

> ⏱️ **Marge:** 10+25+55+10 = **100'**, just el temps efectiu. Si vas just: ① a la ③ n'hi ha prou amb veure la cara i la barra · ② la **versió nucli** (3 necessitats amb els 3 botons, la llum, contenta/trista) és el mínim; el micròfon i l'estat malalta són la versió completa. DORMIR ha de ser al nucli: la son baixa sola i, sense DORMIR, quedaria trista per sempre. **No retallis la fitxa de personalitat**: és la meitat de la R4 del robot.
>
> 🔧 **Logística:** la llibreria **U8g2** ha d'estar instal·lada als ordinadors **abans** de la sessió (si no, ni la ③ ni el tamagotchi compilen). Les carcasses (làser o 3D, una per alumne) han d'estar fetes de la SA2 S3; qui no la tingui, munta a la protoboard i hi passa el muntatge després.

**Punt clau:** al tamagotchi, el temps es controla amb **`millis()`** (com l'antirebot), mai amb `delay()` llargs: així continua atent als botons. Cada sensor fa el mateix patró de la SA: **llegir → comparar amb un llindar → decidir**, i els estats són `const int` com a la SA2.

**Producte:** el tamagotchi (necessitats + botons + sensors + estats) dins de la carcassa + fitxa de personalitat.
**Avaluació del producte:** la [rúbrica del robot](../00_General/00_Projecte_T1_Mascota.md) del dossier (carcassa i muntatge, funcionament, necessitats i estats, fitxa i demostració).

---

## SESSIÓ 4 (2 h) — PROVA PRÀCTICA T1 (individual)

> 📋 **Aquesta sessió és, sencera, la prova trimestral T1** ([`Avaluació/Prova_practica_T1.md`](../../Avaluació/Prova_practica_T1.md)): individual, amb kit propi (n'hi ha un per alumne/a), **full resum en paper** (el que van omplir al pas «Omple el full resum» de la Pràctica 4) i esquemes consultables. **No s'hi programa cap altra activitat** — una prova individual (~80-85' reals) i una sessió de producte no caben juntes ([`08_Sequenciacio`](../../Programació%20didàctica/08_Sequenciacio_temporal_anual.md)).

- **Instruccions (5-10'):** repartir material, recordar què es pot consultar (el seu full resum, esquemes) i l'estructura per nivells (nucli = 5-6; ampliacions = 7-10).
- **Prova (~80-85'):** cada alumne/a munta i programa la "llum de seguretat intel·ligent". El docent només resol incidències de material (placa/cable espatllats), no dubtes de contingut.
- **Tancament (10'):** recollida ordenada; recordar el **pla de millora personal** (3 línies al dors del full resum quan rebin el retorn — es reprèn a l'inici de la SA4).

> ⏱️ **Marge:** ~95-105' efectius, no 120'. Instruccions + recollida se'n mengen 15-20', així que la prova real són **~80-85'**, i el **nucli està calibrat per a ~60'**. Si el grup arrenca tard, retalla **les instruccions** (projecta l'enunciat i deixa'ls començar), mai el temps de prova. Avisa a la meitat i a manca de 10'.

**Sense graella d'activació ni mini-check** (el mini-check va ser a la S3). Qui acabi abans: ampliacions de la mateixa prova o reptes ⭐ de la SA.

### Mapa d'avaluació (traçabilitat)
| Instrument | Què evidencia | Criteri | Rúbrica |
|---|---|---|---|
| Producte: **el tamagotchi** (**S3**) | Necessitats, botons, sensors i estats + fitxa de personalitat | CA1.1, CA2.1, CA2.2 | Rúbrica del robot (dossier) |
| **Prova T1 (S4, individual)** | Circuit + codi + documentació en solitari | CA1.1, CA2.1, CA2.2 | R1, R2, R4 |
| Quadern tècnic (25 %) = **mitjana dels formularis de pràctica** (P1, P2, P3, P4), cadascun sobre 33 punts a Classroom | Respostes ✍️ de cada pràctica (taula de lectures, funció, mascota) + pregunta de reflexió | CA1.1, CA2.2 | **R4** |
| Observació + depuració sèrie | Ús del monitor/traçador, divisor de tensió | CA2.2 | R2 |
| Ajuda entre iguals i **revisió creuada** de codi | Cooperació sense producte compartit: línia d'ajuda del quadern + una millora concreta i un dubte al company | CA5.3 | **R5** |

*(CA1.1 = programar en C/C++; CA2.1 = dissenyar/muntar circuits amb seguretat; CA2.2 = mesurar/interpretar senyals. Vegeu [`Programació didàctica/06_Avaluacio_criteris_qualificacio.md`](../../Programació%20didàctica/06_Avaluacio_criteris_qualificacio.md). Comparteix R1 i R2 **abans** de començar.)*

## Errors freqüents
| Error | Causa | Solució |
|---|---|---|
| El polsador "salta" sol | Sense *debounce* o sense *pull-up* | Usar `INPUT_PULLUP` i antirebot. |
| Lectura analògica sempre 0 o 1023 | Divisor mal connectat | Revisar la resistència de 10 kΩ i el punt mig al pin analògic. |
| Distància sempre 0 o molt gran | TRIG/ECHO intercanviats | Verificar TRIG (sortida) i ECHO (entrada). |
| El LED no regula amb el potenciòmetre | Pin de sortida sense PWM | LED en pin `~` i usar `map()` a 0-255. |
| Al tamagotchi, una necessitat cau a 0 de cop | Es resta a cada volta del `loop()` (centenars de vegades per segon) | Restar només dins de `baixaAmbElTemps()` (amb `millis()`), o amb un temps d'espera com l'espant del soroll. |

---

## Guió de modelatge (què verbalitzar)

> Frases i preguntes clau per al **Modelatge** de cada sessió (què mirar, què preguntar abans d'executar, error a anticipar).

- **S1 · `01_polsador_debounce` (`INPUT_PULLUP`):** analogia — *el pin està "agafat" a HIGH i prémer l'estira a LOW* (lògica invertida). Pregunta: *"per què, sense antirebot, una sola premuda en compta diverses?"* *Error a anticipar:* sorpresa per la lògica invertida.
- **S2 · `02_potenciometre_ldr` (`analogRead`, `map()`):** obre el **Monitor Sèrie** i mou el potenciòmetre **en directe** perquè vegin els 0–1023. Pregunta: *"com passo de 0–1023 a 0–255?"* → `map()`. *Error a anticipar:* divisor de tensió de la LDR mal connectat (lectures 0 o 1023).
- **S3 · `03_pantalla_oled` + tamagotchi:** modela la pantalla com una quadrícula (on és el punt (0, 0)?) i per què tot el dibuix va dins del `do { } while (nextPage())`. Al tamagotchi, llegeix el `loop()` en veu alta com una llista de feines (funcions) i mostra com el botó MENJAR (ja fet) és el patró que copiaran per a JUGAR i DORMIR. *Error a anticipar:* restar una necessitat a cada volta del `loop()`.
- **S4 (prova T1):** cap modelatge — sessió de prova individual.

## Atenció a la diversitat (DUA)

| Via | Mesura |
|---|---|
| **Bastida** (qui s'encalla) | Començar amb el **polsador** (digital) abans de l'analògic; al tamagotchi, començar per la versió nucli (MENJAR ja fet + JUGAR + la llum); l'**esquelet amb `// TODO`** del llum automàtic a la secció «Si t'encalles» de la [pàgina de la pràctica d'entrades analògiques](codi/02_potenciometre_ldr/EXPLICACIO.md); ajuda puntual d'un company que ja ho tingui resolt. |
| **+ Ampliació** (qui va sobrat) | Mitjana de 3 mesures, detectar acostament/allunyament; reptes ⭐ de [`Reptes/Reptes_SA3.md`](../../Reptes/Reptes_SA3.md). |
| **Representació múltiple** | Esquema, **Serial Plotter** (dada visual), simulació Wokwi, codi comentat. |
| **Implicació** | Cada alumne/a tria llindars i el tipus d'avís del seu producte. |

## Treball individual i cooperació entre iguals

El treball és **individual** ([`04_Metodologia.md` §4.3](../../Programació%20didàctica/04_Metodologia.md)): cada alumne/a munta els seus sensors, escriu el seu codi i defensa el seu tamagotchi. La cooperació s'evidencia (CA5.3 → **R5**) en la **revisió creuada de codi** abans de tancar el producte (una millora concreta i un dubte), la **línia d'ajuda del quadern** i la **depuració a dues veus** amb el Monitor sèrie. Si cal ajuntar dues persones puntualment, separa només **qui escriu** i **qui verifica** i fes-los intercanviar a mitja sessió; el lliurable continua sent individual.

## Pensament computacional i depuració

- **PC d'aquesta SA:** **abstracció** (encapsular la lectura en una funció) i **condicionals** (decidir per llindar).
- **Depuració:** la **rutina DEPURA** amb el **Monitor sèrie** com a eina central (la E d'*Examina*).

## Avaluació formativa (instruments)

- **Diana d'autoavaluació** (fitxa) sobre 3 criteris clau · **Revisió creuada de codi** "2 estrelles i un desig" (una millora concreta i un dubte) · **Exit ticket** de tancament.
- **Mini-check individual** (10', **inici de la S3** — la S4 és la prova T1 —, no qualifica): `if/else` sobre una lectura analògica. Detecta qui encara no programa sol abans de la prova. Vegeu [`../00_General/00_Mini_checks_individuals.md`](../00_General/00_Mini_checks_individuals.md).

## Connexió amb la IA (llavor)

> Llavor conceptual de **2–3'** (eix A del curs; vegeu `../00_IA_a_la_materia.md`). No consumeix sessió.

Aquí l'alumnat escriu **regles fetes a mà** sobre dades de sensor: `if (llum < LLINDAR_FOSC) esFosc = true;`. **Això és la base de la IA per classificació.** Pregunta per plantar la llavor:

> *"I si en lloc d'escriure tu el llindar, el sistema l'aprengués sol mirant molts exemples? Això és l'**aprenentatge automàtic**, i ho veurem a la SA8."*

**Idea clau:** un **llindar** és una **regla** que decideix una categoria a partir d'un valor → és el precursor d'un **classificador**. Connecta el `analogRead`/`if` d'avui amb el *"dades → decisió"* de la IA.

## Context real i ODS

- **Context:** llum automàtica, sensors d'estalvi, aparcaments intel·ligents.
- **ODS 7** (energia) i **ODS 12** (consum responsable): els sensors redueixen el malbaratament.
