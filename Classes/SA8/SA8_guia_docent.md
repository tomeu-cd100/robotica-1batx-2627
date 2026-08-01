# SA8 · Guia docent — IoT i IA: el robot connectat i intel·ligent

**Durada:** 6 h (3 sessions) · **Maquinari:** micro:bit (ràdio) + Micro:shield · **ESP32 (WiFi) opcional** · **Llenguatge:** MicroPython (Python) / C++ (ESP32)
**Referència:** [`Programació didàctica/17_SA8_IoT_IA.md`](../../Programació%20didàctica/17_SA8_IoT_IA.md) · **Connexions:** [`SA8_connexions.md`](SA8_connexions.md) · **Marc d'IA del curs:** `../00_IA_a_la_materia.md`

> 🤖 **Aquesta és la SA on culmina la IA.** Arriba aquí com a **pas natural** (el sistema ja percep i actua → ara **decideix amb dades**), després de les llavors sembrades a SA1/SA3/SA6/SA7. Repassa el marc de conjunt a **`../00_IA_a_la_materia.md`** (espiral, marc conceptual mínim i ús d'assistents d'IA amb integritat).

> 🧭 **Com s'usa aquesta guia.** **Abans de la SA:** objectius, material i codi de suport (la logística, al checklist docent). **A cada sessió:** la secció «SESSIÓ n» corresponent, amb el «Guió de modelatge» i els «Errors freqüents» a mà. **Durant tota la SA:** diversitat (DUA), rols cooperatius i pensament computacional. **En avaluar:** «Avaluació formativa (instruments)». **Per contextualitzar:** context real i ODS.

## Objectius de la SA
1. Enviar i monitorar **dades de sensors** entre dispositius (telemetria).
2. Comprendre el concepte d'**Internet de les coses** i les seves aplicacions/riscos.
3. Introduir-se a la **IA**: distingir **regles fetes a mà** d'**aprenentatge automàtic (ML)** i **entrenar** un classificador amb exemples.
4. Valorar **privacitat, seguretat, biaix i ètica** de les dades (ODS) i fer un **ús responsable** d'assistents d'IA.

## Material per parella/equip
- 2 micro:bit (emissor i receptor) + cables USB.
- (Opcional) ESP32 per a la demostració WiFi/MQTT.
- Editor Python de micro:bit / Thonny.
- **Sessió 3 (ML):** 1 ordinador/tauleta amb **navegador i càmera/micròfon** per parella (Teachable Machine). *Pla B: demostració projectada del docent.*

> 🆘 **Pla B sense maquinari (Wokwi no simula micro:bit):** el **simulador de python.microbit.org** cobreix sensors i pantalla (l'`03_ia_gestos.py` s'hi pot provar amb els gestos simulats), però **no la ràdio entre plaques**: si falten micro:bit a la S1, les parelles programen emissor i receptor al simulador i la transmissió real es fa com a **demo projectada del docent** amb 2 plaques. La S2 (disseny IoT) i la S3 (Teachable Machine) no necessiten placa.

## Codi de suport (`codi/`)

> Cada sketch té la seva **pàgina de pràctica** (per què es fa + codi explicat per blocs, el `*_EXPLICACIO.md` del costat de cada `.py` i l'`EXPLICACIO.md` de la carpeta de l'ESP32): és el text que l'alumnat pot rellegir si falta a classe o repassa a casa. El guió oral de sota continua sent teu.

| Fitxer | Contingut |
|---|---|
| [`01_telemetria_emissor.py`](codi/01_telemetria_emissor.py) | micro:bit que envia dades de sensors per ràdio. |
| [`02_telemetria_receptor.py`](codi/02_telemetria_receptor.py) | micro:bit que rep, mostra i registra (sèrie). |
| [`03_ia_gestos.py`](codi/03_ia_gestos.py) | Classificació de gestos amb l'acceleròmetre (IA basada en regles). |
| [`04_esp32_telemetria.ino`](codi/04_esp32_telemetria/04_esp32_telemetria.ino) | *(Opcional)* ESP32 que publica dades per WiFi. |

## Mètode de projecte i continuïtat
- **Cicle de treball** (com a tot el curs): *analitzar → dissenyar → prototipar → provar → millorar* (vegeu SA1). El disseny IoT (S2) treballa especialment la fase **analitzar** (requisits, riscos).
- **Lectura de codi amb PRIMM:** també en Python. A cada *modelatge* l'alumnat **prediu** què farà el programa **abans** d'executar-lo, després l'**investiga**, el **modifica** i en **crea** un de nou. **Operativa (val per a totes les sessions amb codi):** dedica els primers ~5' del Modelatge a projectar el codi nou **sense executar-lo** i recollir prediccions; només després, executa i investiga.
- **Pont (d'on venim / on anem):** ve de la **SA7** (robot mòbil) → portem a la **SA9** (projecte final). Reprèn el **fil dels dos llenguatges** (Python/C++) obert a la **SA5**; les peces d'aquí (dades, connexió, decisió) es poden **integrar** al projecte final.
- **Retirada de bastida — repte "a full en blanc" (últim graó abans de la SA9):** de la parella emissor/receptor de telemetria, **una de les dues meitats** s'escriu amb l'editor buit (pseudocodi propi + xuleta de `radio`); l'altra pot partir del codi donat. Vegeu `Programació didàctica/04_Metodologia.md` §4.2 bis.

> 🤖 **Fil conductor de robots:** si el curs segueix el fil conductor
> ([`00_Fil_conductor_robots.md`](../00_General/00_Fil_conductor_robots.md)),
> aquesta SA s'imparteix en **4 h** en lloc de 6: la **S1 (telemetria) i la S2
> (disseny IoT) es fusionen** en una única sessió de 4 h — la mateixa fusió
> que ja preveu el pla de contingència d'aquesta guia. Les **2 h alliberades**
> es traslladen a l'inici del 3r trimestre com a **sessió 0 de muntatge del
> rover** (SA7). La **S3 d'IA es manté sencera** (2 h), sense canvis.
> Detall del rover: [dossier T3](../00_General/00_Projecte_T3_Rover.md).

---

## SESSIÓ 1 (2 h) — Telemetria: el robot que informa

> 📡 **Abans de la sessió (represa espaiada):** la ràdio no es toca des de la S3 de la SA5. Reparteix (o envia pel Classroom) la targeta [`00_Repas_expres_Radio.md`](../00_General/00_Repas_expres_Radio.md) la setmana anterior, i dedica els primers 5' de l'activació a l'autotest de la targeta («les tres línies que preparen la ràdio»).

- **Activació (10'):** *"Com sap el teu mòbil la temperatura de casa quan ets fora?"* → telemetria/IoT.
- 🔭 **Referent (1', dins l'activació):** **Fei-Fei Li** (ImageNet: sense bones dades no hi ha bona IA) i menció d'**Hedy Lamarr** (salt de freqüència, 1942) ([guió](../00_General/00_Referents_tecnologia.md)).
- **Modelatge (25'):** [`01_telemetria_emissor.py`](codi/01_telemetria_emissor.py) + [`02_telemetria_receptor.py`](codi/02_telemetria_receptor.py). Enviar dades amb `radio.send()`; rebre-les i **registrar-les pel port sèrie** (per fer-ne després un gràfic/full de càlcul).
- **Pràctica guiada (35'):** una placa mesura temperatura/llum i les envia; l'altra les mostra i registra.
- **Repte (40'):** enviar dues magnituds amb etiqueta (p. ex. `"T:23"`, `"L:120"`); **+ repte:** alerta quan se supera un llindar.
- **Tancament (10'):** quadern (mostra de dades registrades).

> ⏱️ **Marge:** el temps efectiu real és ~100' (arrencada + recollida), no 120'. Si vas just, retalla primer: **el «+ repte» (alerta per llindar) del Repte**.

**Punt clau:** la **telemetria** és mesurar en un lloc i transmetre les dades a un altre. És la base de l'IoT.

---

## SESSIÓ 2 (2 h) — IoT: arquitectura, aplicacions i riscos (auditoria d'un producte real)

> Sessió amb format d'**auditoria per rol** — material de l'activitat: [`SA8_auditoria_iot.md`](SA8_auditoria_iot.md) (8 targetes de producte + plantilla d'informe).

- **Ganxo (10'):** projecta 3 productes de les targetes (polsera esportiva, càmera domèstica, altaveu amb assistent) i pregunta: *"què saben de tu, per on viatja, i qui més ho pot veure?"* Vot a mà alçada: quin comprarien. **No responguis encara** — l'auditoria ho farà.
- **Mini-lliçó (15'):** l'arquitectura **dispositiu → xarxa → núvol → app** dibuixada **sobre un dels 3 productes del ganxo**, no en abstracte. El vocabulari (BLE/WiFi, MQTT, broker, xifratge) entra **etiquetant el dibuix**. *(Opcional: demostració amb `04_esp32_telemetria.ino` publicant dades per WiFi.)*
- **Auditoria per parelles (40'):** cada parella **tria una targeta** de producte i fa d'**auditors de privacitat**: omplen l'**informe d'auditoria** d'1 pàgina (diagrama de la SEVA arquitectura, 3 dades personals, 2 riscos concrets, 2 recomanacions). La secció «Ètica de dades i IA» d'aquesta guia és la font de consulta, no contingut a dictar.
- **Peritatge creuat (20'):** cada parella presenta l'informe en **90 segons** a una altra, que fa d'**advocada del fabricant** (ha de rebatre un risc); després es giren els papers. Força l'argumentació amb el vocabulari tècnic.
- **Tancament (10'):** exit ticket — *"quina dada teva viatja ara mateix per una arquitectura com aquesta, i on es podria interceptar?"* — + entrada de quadern.

> ⏱️ **Marge:** el temps efectiu real és ~100' (arrencada + recollida), no 120'. Si vas just, retalla primer: **la demostració opcional amb ESP32 (dins la Mini-lliçó)**; després, escurça el peritatge a una sola ronda.

**Punt clau:** connectar-ho tot té avantatges i **riscos**; el disseny responsable inclou pensar en dades i privacitat (CC, ODS). **Pont a la S3:** els mateixos productes reapareixen a la sessió d'IA (*"i si el producte, a més, decideix?"*).

---

## SESSIÓ 3 (2 h) — Introducció a la IA: de les regles a l'aprenentatge
- **Mini-check individual (10', substitueix l'activació):** [`00_Mini_checks_individuals.md`](../00_General/00_Mini_checks_individuals.md). Aprofita el canvi de full per presentar en 1' com pot un sistema "reconèixer" un gest o decidir per si sol.
- **Modelatge (25'):** [`03_ia_gestos.py`](codi/03_ia_gestos.py). Presenta-ho com una **escala de tres graons**, perquè el salt a la IA no sigui al buit sinó des de coses que ja saben fer:
  1. **Un llindar** (ja ho saben: l'alarma de la SA3, el termòstat de la SA6) — *"si x > 300, alerta"*: classifica en 2 classes amb 1 valor.
  2. **Regles combinades** (el que es fa avui): diversos valors (3 eixos de l'acceleròmetre) i diverses regles → 4 gestos (pla, dret, inclinat, sacseig). Encara les escrivim **a mà**. Recupera els **valors d'acceleròmetre anotats al quadern a la SA5 S2**: són el punt de partida per fixar els llindars sense fer-ho «a ull».
  3. **ML** (el bloc següent): quan les classes són massa complexes per escriure'n regles (una cara, un so), les regles **s'aprenen dels exemples**.

  Explicar la diferència entre **regles fetes a mà** i **aprenentatge automàtic (ML)** real (vegeu el marc de `../00_IA_a_la_materia.md` §4).
- **Pràctica guiada (25'):** proven i ajusten el classificador per **regles**.
- **De regles a ML real (35'):** fes el salt amb la **pràctica de Teachable Machine** ([`SA8_practica_teachable_machine.md`](SA8_practica_teachable_machine.md)): l'alumnat **recull exemples**, **entrena** un classificador (imatge/so/postura), el **prova** i el **trenca a propòsit** per veure'n els límits. *(Sense maquinari extra; Pla B amb demostració projectada — vegeu la pràctica.)* **Alternativa amb la placa:** extensió **ML/"AI" de MakeCode** per a micro:bit (recollir mostres de moviment i entrenar).
- **Reflexió ètica + tancament (15'):** biaixos, dades i usos responsables de la IA. Usa el marc de la secció **"Ètica de dades i IA"** (RGPD, biaix, consentiment) i una de les seves preguntes de mini-debat.

> ⏱️ **Marge:** el temps efectiu real és ~100' (arrencada + recollida), no 120'. Si vas just, retalla primer: **la Pràctica guiada d'ajust del classificador per regles**.

**Punt clau:** una "IA" pot ser tan simple com un conjunt de **regles** sobre dades; el **ML** **aprèn** les regles a partir d'**exemples** (dades d'entrenament). Tots dos depenen de **bones dades**: *garbage in, garbage out*.

**Producte:** sistema connectat que recull/transmet dades (telemetria) **o** classifica un gest/patró amb IA, + **reflexió escrita** sobre ètica i privacitat.
**Avaluació:** rúbriques **R1** (codi), **R3** (sistema/decisió), **R4** (documentació/reflexió).

### Mapa d'avaluació (traçabilitat)
| Instrument | Què evidencia | Criteri | Rúbrica |
|---|---|---|---|
| Producte (telemetria o IA de gestos) | Integrar tecnologia emergent (IoT/IA) en un sistema | CA4.2 | R3, R1 |
| Informe d'auditoria IoT ([`SA8_auditoria_iot.md`](SA8_auditoria_iot.md)) | Arquitectura, riscos de privacitat/seguretat, impacte ètic | CA4.2, CA5.3 | R4 |
| Quadern (dades + reflexió ètica) | Registre de dades i valoració ètica (ODS) | CA4.2 | R4 |
| Coavaluació | Treball d'equip i decisions de disseny responsable | CA3.1 | R4 |

*(CA3.1 = control/decisió; CA4.2 = integrar tecnologies emergents (IoT/telemetria/IA) en un sistema de control. Vegeu [`Programació didàctica/06_Avaluacio_criteris_qualificacio.md`](../../Programació%20didàctica/06_Avaluacio_criteris_qualificacio.md). Comparteix R1, R3 i R4 **abans** de començar.)*

## Ètica de dades i IA (RGPD, biaix, consentiment)

> Marc breu per a la **Sessió 2 (riscos)** i la **Sessió 3 (reflexió IA)**. Concreta la **CA5.3** (valorar l'impacte ètic/social). No cal teoria jurídica: es tracta que l'alumnat sàpiga **fer-se les preguntes correctes** sobre les dades que recull el seu sistema.

**Tres idees clau (per verbalitzar):**
1. **Privadesa i RGPD (idea, no llei):** una **dada personal** és tota informació que identifica una persona (ubicació, hàbits, salut…). Principis aplicables a un projecte: **minimització** (recull només el que necessites), **finalitat** (per a què serveix), **conservació** (no la guardis per sempre) i **seguretat** (xifratge, accés restringit). Pregunta de control: *"el meu sensor mesura alguna cosa que identifiqui una persona?"*
2. **Biaix:** un sistema d'IA **aprèn de les dades** que li dones; si les dades són esbiaixades, les decisions ho seran. Exemple proper: un classificador de gestos entrenat només amb dades d'unes mans pot fallar amb altres. Mantra: *"garbage in, garbage out"* — **bones dades = bones decisions**.
3. **Consentiment:** abans de mesurar o enregistrar algú, **cal que ho sàpiga i hi estigui d'acord**. Pregunta: *"qui ha dit que sí a ser mesurat pel meu sistema?"*

**Mini-debat (tria'n una, 5–10'):**
- Un timbre intel·ligent grava qui passa pel carrer. És acceptable? On és el límit?
- Una app de salut ven les teves dades de passes a una asseguradora. Què hauria de canviar?
- Un assistent de veu falla més amb certs accents. De qui és la responsabilitat i com es corregiria?

> **Connexió ODS/ciutadania digital:** ODS 11 (ciutats intel·ligents **i** respectuoses amb la privadesa) i ODS 16 (institucions, drets). La reflexió escrita del producte (R4) ha d'incloure **un risc de dades concret** i **una mesura per reduir-lo**.

## Errors freqüents
| Error | Causa | Solució |
|---|---|---|
| El receptor no rep dades | `group` diferent | Mateix `radio.config(group=...)` a les dues plaques. |
| Les dades arriben barrejades | Sense etiqueta | Enviar `"T:23"` i separar pel `:`. |
| El classificador falla sempre | Llindars mal ajustats | Mesurar valors reals abans de fixar els llindars. |
| ESP32 no connecta al WiFi | Credencials/2,4 GHz | Revisar SSID/clau; xarxa de 2,4 GHz. |

---

## Guió de modelatge (què verbalitzar)

> Frases i preguntes clau per al **Modelatge** de cada sessió (què mirar, què preguntar abans d'executar, error a anticipar).

> ✍️ **Katas:** en acabar el modelatge de cada sessió amb pràctica de codi, projecta el kata del sketch del dia ([SA8_katas.md](SA8_katas.md)): 10' d'escriptura individual **abans** de repartir/obrir el sketch. **Un sol kata per sessió**; el dia del mini-check, el mini-check el substitueix. En aquest tram, projecta l'enunciat **abans** de modelar el bloc: primer escriuen, després el modelatge tanca.

- **S1 · `01/02_telemetria` (emissor/receptor):** mostra el parell `radio.send()` / `radio.receive()` i com **registrar pel port sèrie** (per fer-ne després un gràfic). Recalca el **mateix `group`** a les dues plaques. *Error a anticipar:* dades barrejades per no etiquetar-les (`"T:23"`).
- **S2 · IoT (auditoria, sense codi):** dibuixa l'arquitectura **dispositiu → xarxa → núvol → app** sobre un producte concret de les [targetes](SA8_auditoria_iot.md), etiquetant fletxes amb el protocol. Pregunta pels **riscos**: *"qui té aquestes dades? què passa si algú les intercepta?"*. *Error a anticipar:* riscos genèrics («et poden hackejar») en lloc d'ubicats al diagrama; i veure l'IoT com a "màgia" sense riscos.
- **S3 · `03_ia_gestos` (IA):** distingeix **regles fetes a mà** vs **aprenentatge automàtic (ML)**. Insisteix: cal **mesurar valors reals** abans de fixar llindars. Tanca amb **biaix i ètica** de les dades. *Error a anticipar:* fixar llindars "a ull" sense mesurar.

## Atenció a la diversitat (DUA)

| Via | Mesura |
|---|---|
| **Bastida** (qui s'encalla) | Donar emissor i receptor ja fets per modificar-los; l'**esquelet amb `# TODO`** de la secció «Si t'encalles» de la [pàgina de la pràctica de l'emissor](codi/01_telemetria_emissor_EXPLICACIO.md); **simulador** micro:bit i Wokwi (ESP32); equips heterogenis. |
| **+ Ampliació** (qui va sobrat) | Dues magnituds etiquetades, alerta per llindar, classe nova de gest, **ML real** (Teachable Machine: exportar model; o MakeCode ML); reptes ⭐ de [`Reptes/Reptes_SA8.md`](../../Reptes/Reptes_SA8.md). |
| **Representació múltiple** | Dades en taula i gràfic, diagrama d'arquitectura IoT, simuladors. |
| **Implicació** | Cada equip tria el sistema IoT del seu entorn (hort, aula, casa). |

## Treball cooperatiu amb rols

Equips amb **rols rotatius**: Coordinador/a · Programador/a · Enginyer/a de maquinari (plaques, ràdio/sensors) · Provador/a–Documentador/a (registra dades + quadern). Quadre per rotar a la fitxa.

## Pensament computacional i depuració

- **PC d'aquesta SA:** **dades** (recollir, etiquetar, transmetre) i **classificació** (decidir una categoria a partir de valors).
- **Depuració:** rutina **DEPURA**; el registre **pel port sèrie** és l'eina clau per veure si les dades arriben i estan ben etiquetades.

## Avaluació formativa (instruments)

- **Diana d'autoavaluació** (fitxa) · **Coavaluació** entre equips (ja al mapa d'avaluació) · **Exit ticket** de tancament.
- **Mini-check individual** (10', **inici de la S3**, no qualifica): llegir i explicar línia a línia un emissor de telemetria (`group`, `send`). Vegeu [`../00_General/00_Mini_checks_individuals.md`](../00_General/00_Mini_checks_individuals.md).

## Context real i ODS

- **Context:** ciutats intel·ligents, telemetria ambiental, salut connectada.
- **ODS 11** (ciutats sostenibles) i **ODS 13** (acció climàtica). Reforça la reflexió sobre **ètica i privacitat de dades** ja present a la SA.
