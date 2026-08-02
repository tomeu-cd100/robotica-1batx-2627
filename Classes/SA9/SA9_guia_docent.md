# SA9 · Guia docent — Repte final integrador (opció competició)

**Durada:** 10 h (5 sessions) · **Maquinari:** lliure (Arduino / micro:bit / Imagina 3dBot) · **Llenguatge:** lliure (C/C++ i/o Python)
**Referència:** [`Programació didàctica/18_SA9_Projecte_final.md`](../../Programació%20didàctica/18_SA9_Projecte_final.md)

> 🧭 **Com s'usa aquesta guia.** **Abans de la SA:** sentit, objectius i materials/plantilles. **A cada sessió:** la seqüència (5 × 2 h) i les orientacions per al docent. **En avaluar:** «Avaluació». **Durant tot el projecte:** pensament computacional i els errors freqüents de gestió.

## Sentit de la SA
Projecte de **síntesi** del curs: **cada alumne/a** dissenya, construeix, programa, documenta i defensa un **sistema robòtic autònom** que resol un repte real. Integra tot l'après (SA1-SA8). Opció de vincular-lo a una **competició** (WRO, RoboCup Junior, FTC) o al futur **Treball de Recerca**.

> 👤 **El projecte final és individual** ([`04_Metodologia.md` §4.3](../../Programació%20didàctica/04_Metodologia.md)): cada alumne/a té **el seu repte, el seu dossier i la seva defensa**. Si dues persones volen ajuntar-se per a un repte **més ambiciós**, ho poden fer amb dues condicions: al dossier ha de quedar escrit **qui ha fet què** (mòdul a mòdul, no «tots dos plegats») i la **defensa continua sent individual** — cadascú defensa el sistema sencer, també la part que no ha programat.

## Objectius
1. Gestionar un **projecte complet** (anàlisi → prototip → proves → millora).
2. **Integrar** electrònica, programació, control i robòtica.
3. Elaborar **documentació tècnica** i fer-ne una **defensa oral**.
4. **Cooperar** —ajudar i revisar la feina dels altres— i valorar l'impacte ètic i de sostenibilitat.

## Materials i plantilles (`plantilles/`)
| Fitxer | Ús |
|---|---|
| `Banc_de_reptes.md` | Llista de reptes amb nivells de dificultat. |
| `Planificacio_agile_PLANTILLA.md` | Taulell de tasques personal (To Do / Fent / Fet) i fites per sessió. |
| `Dossier_tecnic_PLANTILLA.md` | Estructura del dossier a lliurar. |
| `Codi_base_PLANTILLA/` | Esquelet de codi modular per començar (sketch en carpeta pròpia, llest per a l'Arduino IDE). |

## Mètode de projecte (culminació del curs)
Aquesta SA **tanca el mètode de projecte** introduït a la **SA1** i practicat a totes les SA: *analitzar → dissenyar → prototipar → provar → millorar* — el nom formal, **design thinking**, ja es va presentar a la SA1 S1 amb el pòster del mètode, de manera que aquí és **repesca**, no estrena. Les cinc fases de la seqüència s'hi corresponen directament:

| Fase del cicle (SA1) | Sessió SA9 |
|---|---|
| Analitzar | S1 (Idear): repte, requisits, esbós |
| Dissenyar | S1 (Idear): planificació individual |
| Prototipar | S2 (Prototipar): MVP i primer codi |
| Provar | S3 (Provar i millorar): proves + iteracions |
| Millorar | S3-S4: 2a iteració + dossier |
| *(Comunicar)* | S4 (Comunicar): defensa oral |

> La **S5 no és de projecte**: és, sencera, la **prova pràctica T3** (individual), vegeu `Avaluació/Prova_practica_T3.md` i el quadre de la seqüenciació anual.

> A diferència de les altres SA, aquí l'alumnat **no llegeix codi donat** (no hi ha PRIMM): **escriu el seu propi codi** a partir de `Codi_base_PLANTILLA/`, aplicant de forma autònoma tot el que ha après.

---

## Seqüència de sessions (5 × 2 h: 4 de projecte + prova T3)

> 🔁 **Activació de cada sessió (rutina #1 del curs):** els primers **5'** dels 10' d'activació són la **graella de repàs espaiat** ([banc](../00_General/00_Banc_activacio_repas.md)). ⚠️ **La S5 no en té**: és, sencera, la prova pràctica T3.


| Sessió | Fase | Activitat docent | Activitat alumnat |
|---|---|---|---|
| **1** | **Idear** | Presenta el repte i el `Banc_de_reptes`. Valida que cada tria sigui abastable. | Cadascú tria el seu repte, defineix requisits, esbós i planificació (taulell àgil personal). |
| **2** | **Prototipar** | Acompanya el muntatge i el primer codi. | Cadascú munta el seu prototip mínim viable; primer codi (esquelet). |
| **3** | **Provar i millorar** | Fomenta proves sistemàtiques i registre d'errors; **revisió creuada de codi**. Primeres defenses esglaonades de qui ja té prototip llest. | Proven, detecten errors, **primera iteració** de millora i inici de la segona; avancen el dossier. |
| **4** | **Comunicar** *(i tancament del curs)* | Organitza i modera les defenses **com a mostra** (els tres robots del curs a la vista) i tanca amb la **retrospectiva de curs** (10'). Recull els dossiers. La defensa es valora amb la **mini-rúbrica R4·DO** ([`07_Rubriques.md`](../../Programació%20didàctica/07_Rubriques.md)) — la mateixa des de la SA2, ara al nivell alt (decisions **i alternatives descartades**, reconèixer límits) — i el públic la fa servir per preparar **una pregunta** a qui defensa. | Tanquen el **dossier tècnic**; **defensa oral individual** + demostració; autoavaluació; reflexió final. |
| **5** | **PROVA PRÀCTICA T3** *(i tancament material)* | Munta les **estacions** (pistes + robots) i gestiona els torns. **Darrers 15':** desmuntatge i retorn de l'electrònica als kits, amb inventari. | **Prova individual** (`Avaluació/Prova_practica_T3.md`): part micro:bit a la taula, part de robot per torns a la pista. Després, desmunten i retornen el material. |

### 🎓 Tancar el curs (no deixis que s'acabi de cop)

El curs acaba amb una prova individual, i això, sol, és un mal final per a un any que ha construït tres robots. Sense afegir cap sessió, la **S4 fa de tancament** si la muntes així:

- **Mostra, no examen oral.** Les defenses de la S4 es fan amb els **tres robots del curs a la vista** (mascota del T1, braç del T2, rover del T3, els que s'hagin conservat): que vegin d'on van sortir al setembre i on han arribat al juny. Si es pot, obre-la a un altre grup o a les famílies l'última mitja hora.
- **Retrospectiva de curs (10', al tancament de la S4).** Tres preguntes al quadern, i dues o tres en veu alta: *què sé fer al juny que no sabia al setembre?* · *quin error m'ha ensenyat més?* · *què m'enduc d'aquesta matèria encara que no em dediqui a la tecnologia?* És l'última entrada del quadern tècnic i el tanca com a **portfolio** de l'any.
- **Difusió (cost zero).** Fotos i un vídeo curt de cada robot en marxa durant la mostra → web del centre o Classroom. Serveix per al curs vinent: és el millor material de presentació que tindràs a la SA1.
- **Desmuntatge amb sentit (S5, 15' finals).** Retornar l'electrònica als kits amb l'inventari és part de la feina d'un taller, no una tasca administrativa: es fa amb l'alumnat, no després que marxi. Els quaderns tècnics es tornen a l'alumnat — són seus.

> ⚠️ La 2a iteració «formal» de l'antiga S4 queda repartida entre la S3 (fer-la) i la feina fora d'aula (documentar-la). Si algú no hi arriba, la **versió nucli** (requisits mínims demostrables) segueix sent assoliment satisfactori — vegeu la fitxa.

> ⏱️ **Marge:** compta ~100' efectius per sessió, no 120'. Al projecte, el que cau primer si es va just és sempre l'**abast del repte** (targeta T9.2, versió nucli), mai les proves per parts ni el dossier.

> 🔭 **Referent (1', a l'inici de la S1):** **Cynthia Breazeal**, fundadora de la robòtica social — el destinatari del vostre sistema és sempre una persona. Tanca la galeria del curs; si voleu, afegiu-hi el referent de proximitat (**Núria Salán**, UPC). Guió: [`../00_General/00_Referents_tecnologia.md`](../00_General/00_Referents_tecnologia.md).

## 🐍 Represa de MicroPython (entre la S4 i la prova T3)

> **Per què:** a la prova T3 (S5) **tothom comença per la Part B (micro:bit, MicroPython)** — també qui hagi fet tot el projecte en C++. Per a aquests, l'últim MicroPython escrit pot ser de la prova T2 (fa mesos). El README de la SA ja avisa l'alumnat; aquest bloc és la teva part.

- **S4 (deures, en recollir els dossiers):** reparteix (o envia pel Classroom) les dues targetes — [`00_Repas_expres_MicroPython.md`](../00_General/00_Repas_expres_MicroPython.md) (sintaxi + els 5 patrons) i [`00_Repas_expres_Radio.md`](../00_General/00_Repas_expres_Radio.md) (la Part B és, exactament, el patró ràdio: `radio.send("STOP")` en prémer un botó). 10-15' a casa, amb simulador si no tenen placa. **Prioritat:** qui hagi fet el projecte en C++; qui l'ha fet en MicroPython en té prou amb la targeta de ràdio.
- **S4 (5', dins el tancament, tothom assegut):** «Python flash» col·lectiu — projecta la targeta de ràdio i demana en veu alta: *quines són les tres línies que preparen la ràdio?* (`import radio` · `radio.on()` · `radio.config(group=...)`) → *què retorna `radio.receive()` si no hi ha res?* (`None` — i per això es comprova amb `if msg:`) → *i el `while True:`, hi ha de ser?* (sí: a MicroPython el bucle l'escrius tu, no hi ha `loop()`). Dos o tres ping-pongs reactiven el que la Part B demana.
- **Qui suspèn l'autotest** de les targetes: que refaci l'activitat 3 de la fitxa de la SA5 (ràdio: dau per ràdio) al simulador abans de la prova.

## Planificació individual (el que abans eren els rols)

Amb el projecte individual **no hi ha rols a repartir**: els quatre antics rols passen a ser **les quatre feines que cadascú s'ha de planificar** al seu taulell, i el risc ja no és que algú no en faci cap, sinó que se n'oblidi una (típicament, la documentació). Fes-les visibles com a **etiquetes de les targetes** del taulell:

- **Planificació** — mantenir el taulell i les fites de cada sessió.
- **Maquinari/electrònica** — muntatge i esquemes.
- **Programació** — codi, depuració, còpies de seguretat.
- **Documentació/comunicació** — dossier i defensa (**anotar i fotografiar des de la S1**).

A la S1, en validar cada planificació, comprova que hi hagi **almenys una targeta de cada etiqueta**: és el control que substitueix el «repartiment de rols».

## Avaluació
- **Totes les rúbriques** (R1-R5). Pes destacat dins de la dimensió "Projectes i productes" del trimestre.
- Inclou **autoavaluació** del propi procés i **revisió creuada de codi** amb un company (una millora concreta i un dubte), que és on s'evidencia el **CA5.3** amb treball individual.
- Lliurables: **sistema funcional + dossier tècnic + defensa oral**.
- La **prova T3 (S5) és un instrument a part**: individual, puntua a la dimensió «Proves pràctiques» (20 %) i **no reavalua el projecte** — comprova destreses de SA7-SA8 (robot mòbil + integració micro:bit).

### Mapa d'avaluació (traçabilitat)
| Instrument | Què evidencia | Criteri | Rúbrica |
|---|---|---|---|
| Sistema funcional | Integració d'electrònica, control i robòtica | CA2.1, CA3.1, CA4.1 | R1, R2, R3 |
| Dossier tècnic | Documentació completa i rigorosa del projecte | CA5.1, CA5.2 | R4 |
| Defensa oral + demostració | Comunicar i defensar la solució | CA5.2 | R4 |
| Procés (taulell, iteracions) | Gestió del projecte (anàlisi → prototip → millora) | CA5.1 | R5 |
| Autoavaluació + revisió creuada de codi + reflexió ètica | Ajuda entre iguals i impacte ètic/sostenibilitat (ODS) | CA5.3 | R5 |

*(CA5.1 = gestionar un projecte complet; CA5.2 = documentar i defensar; CA5.3 = valorar impacte ètic i cooperar. Vegeu [`Programació didàctica/06_Avaluacio_criteris_qualificacio.md`](../../Programació%20didàctica/06_Avaluacio_criteris_qualificacio.md). Comparteix **totes** les rúbriques **abans** de començar.)*

## Orientacions per al docent
- Tenir el **banc de reptes amb nivells** perquè cada alumne/a triï segons ambició (atenció a la diversitat). Amb 5 projectes, vigila que **no es repeteixin els reptes**: fa la mostra més rica i evita el copiar-se.
- Oferir el **[`00_Banc_objectes_disseny.md`](../00_General/00_Banc_objectes_disseny.md)** com a font d'idees: el projecte final pot ser un **objecte real amb carcassa/maqueta** (disseny de producte), no només un muntatge. Inclou rúbrica de producte i pautes de fabricació (cartró/impressió 3D, ecodisseny ODS 12).
- Fixar **fites parcials** (checklist) a cada sessió per evitar deixar-ho tot per al final.
- **Defenses esglaonades — el compte, fet (grup de 5):** amb projecte individual hi ha **5 defenses**, una per alumne/a, de **10-12'** cadascuna (5' de presentació + 3-4' de preguntes + 2-3' de canvi de muntatge) → **50-60'**. La S4 no és només de defenses: hi van també la **retrospectiva de curs** (10'), el **«Python flash»** (5') i el tancament del dossier amb l'autoavaluació i el muntatge de la mostra (~20'). Total: **85-95' dels ~100' efectius** — hi cap, però **sense marge** per a una demostració que no arrenca.
  **Recomanació:** avança **1-2 defenses al final de la S3** (qui tingui el prototip llest; digues-los que hi guanyen, perquè defensen amb menys pressió). Amb 3-4 defenses a la S4, baixa a **30-48'** i queda mitja hora de marge per a la mostra i el tancament del curs. Escala, guió i errors típics de la defensa: [`../00_General/00_Guia_defensa_oral.md`](../00_General/00_Guia_defensa_oral.md).
- Recordar criteris d'**ètica i sostenibilitat** (reutilització de components, impacte).
- Si s'opta per **competició**, alinear el repte amb el reglament corresponent.

## Pensament computacional i depuració

- **PC d'aquesta SA:** **integració** de tot el pensament computacional del curs (descomposició, abstracció, patrons, algorismes) aplicat de forma autònoma a un sistema propi.
- **Depuració:** l'alumnat aplica la **rutina DEPURA** i prova **per parts** (cada mòdul per separat) — clau per no quedar encallat (vegeu errors freqüents).

> **Síntesi de les 4 dimensions a la SA9:** la diversitat es cobreix amb el **banc de reptes amb nivells**; el cooperatiu, amb la **revisió creuada de codi** i l'ajuda documentada al quadern; l'avaluació formativa, amb **diana, autoavaluació i exit ticket final** (fitxa) a més de les rúbriques R1-R5; i el context real/ODS, amb la **tria d'un repte amb impacte** i la reflexió ètica de la defensa.

## Errors freqüents (gestió de projecte)
| Símptoma | Causa | Acció |
|---|---|---|
| Algú encallat el dia 1 | Repte massa ambiciós | Reduir abast; triar repte de nivell inferior. |
| Tot per fer l'últim dia | Sense fites parcials | Imposar lliuraments per sessió. |
| "No funciona i no sé per què" | Sense proves incrementals | Provar per parts (cada mòdul per separat). |
| Dossier buit el darrer dia | La documentació no és a cap targeta del taulell | Exigir una targeta amb etiqueta «documentació» per sessió (fotos i decisions **mentre passen**). |
| Dos que s'ajunten i un no toca res | Feina no traçada al dossier | Exigir el «qui ha fet què» mòdul a mòdul; la defensa és individual i pregunta per la part que no ha programat. |
