# SA1 · Guia docent — Què és un robot? Sistemes embeguts i mètode de projecte

**Durada:** 6 h (3 sessions de 2 h) · **Maquinari:** Arduino UNO (demostració) + Tinkercad · **Llenguatge:** lectura de C/C++
**Referència:** [`Programació didàctica/10_SA1_Introduccio_robotica.md`](../../Programació%20didàctica/10_SA1_Introduccio_robotica.md)

## Objectius de la SA
1. Definir robot i sistema embegut; identificar entrada-procés-sortida.
2. Reconèixer l'arquitectura d'Arduino i la diferència analògic/digital.
3. Aplicar normes de seguretat i conèixer l'entorn (IDE + simulador).
4. Llegir i modificar el primer programa (`Blink`).
5. Conèixer i començar a aplicar el **mètode de projecte** (anàlisi → disseny → prototip → prova → millora) com a forma de treball de tot el curs.

## Materials per a la sessió
- 1 Arduino UNO + cable USB (per a demostració i, si n'hi ha, per parelles).
- Ordinadors amb **Arduino IDE** instal·lat i accés a **Tinkercad** (tinkercad.com).
- Projector. Quadern tècnic (digital o paper) per a cada alumne/a.

## Documents de la SA (aquesta carpeta)
| Document | Quan s'usa |
|---|---|
| [`SA1_fitxa_alumnat.md`](SA1_fitxa_alumnat.md) | Totes les sessions (Activitats 1-4 + quadern). |
| [`SA1_prova_diagnostica.md`](SA1_prova_diagnostica.md) | Sessió 1 (imprimible o Google Forms; **no qualifica**). |
| [`SA1_esquemes_connexions.md`](SA1_esquemes_connexions.md) | Sessió 2 (anatomia de la placa, Activitat 2) i 3 (circuit `Blink`). |
| [`SA1_normes_seguretat.md`](SA1_normes_seguretat.md) | Sessió 2 (lectura i **signatura**). |
| [`SA1_poster_robot_plantilla.md`](SA1_poster_robot_plantilla.md) | Producte de la SA (es pot iniciar a la Sessió 3). |
| `codi/` | `blink`, `blink_repte` i ampliacions `blink_millis`, `sos_morse`. |

---

## El mètode de projecte (fil conductor del curs)

La SA1 no només respon *"què és un robot?"*: també presenta **com treballarem** a totes les SA. És el cicle d'enginyeria que es repetirà fins al projecte final (SA9) i que avalua la **CA5.1** (*gestionar un projecte tecnològic complet: anàlisi → prototip → millora*).

| Fase | Pregunta clau | A la SA1 es viu així… |
|---|---|---|
| **1. Analitzar** | Quin problema/repte tinc? Què necessito? | Entendre el repte del `Blink` i descompondre'l (entrada-procés-sortida). |
| **2. Dissenyar** | Com ho penso resoldre abans de fer-ho? | Predir/planificar la solució del repte (PRIMM, Sessió 3) abans d'escriure codi. |
| **3. Prototipar** | Construeixo una primera versió. | Escriure/muntar el codi (real o a Tinkercad). |
| **4. Provar** | Funciona? On falla? | Pujar, observar, identificar errors (taula d'errors freqüents). |
| **5. Millorar** | Com ho faig millor? | Ajustar temps, refactoritzar amb variables/funcions, ampliacions. |

> Es presenta de forma **breu i visual** (un pòster a l'aula) i es **referencia explícitament** cada cop que l'alumnat resol un repte. No es memoritza: s'aplica. És també l'estructura del **quadern tècnic**.

---

## SESSIÓ 1 (2 h) — Què és un robot?

| Fase | Temps | Activitat docent | Activitat alumnat |
|---|---|---|---|
| Activació | 15' | Llança la pregunta: *"Quins robots tens a casa sense saber-ho?"* | Pluja d'idees; llista a la pissarra. |
| Explicació | 25' | Presenta el model **entrada → procés → sortida** i el concepte de sistema embegut. | Prenen notes; classifiquen exemples. |
| Pràctica | 40' | Reparteix l'**anàlisi de 3 sistemes** (rentadora, dron, semàfor). | En parelles, omplen la taula E-P-S de la fitxa (Activitat 1). |
| Diagnòstic | 30' | Passa la **prova diagnòstica** ([`SA1_prova_diagnostica.md`](SA1_prova_diagnostica.md); no qualifica). | Responen individualment. |
| Tancament | 10' | Recull conclusions; presenta el **mètode de projecte** (pòster a l'aula) com a forma de treball del curs; obre el quadern tècnic. | Primera entrada al quadern. |

**Punts clau:** tot sistema automàtic té sensors (entrada), un "cervell" (procés) i actuadors (sortida). El robot és un sistema embegut amb capacitat d'actuar sobre l'entorn. **Tot el curs** treballarem amb el cicle analitzar → dissenyar → prototipar → provar → millorar.

**Solucions Activitat 1 (orientatives):**
| Sistema | Entrada | Procés | Sortida |
|---|---|---|---|
| Rentadora | Selector de programa, sensor de nivell d'aigua i de temperatura | Microcontrolador que segueix el cicle (omplir, rentar, centrifugar) | Motor del tambor, electrovàlvula, resistència, bomba de buidatge |
| Dron | Giroscopi/acceleròmetre, GPS, comandament | Controlador de vol que estabilitza i navega | Motors de les hèlixs (ESC), LED, càmera |
| Semàfor | Temporitzador, sensor de presència/espira | Lògica de seqüència de fases | LED vermell/groc/verd |

**Prova diagnòstica:** vegeu [`SA1_prova_diagnostica.md`](SA1_prova_diagnostica.md) (versió imprimible amb clau de correcció + versió Google Forms autocorregible). Serveix per formar **parelles heterogènies** (alumnat amb experiència + sense).

---

## SESSIÓ 2 (2 h) — Arquitectura i seguretat

| Fase | Temps | Activitat docent | Activitat alumnat |
|---|---|---|---|
| Activació | 10' | Mostra una placa Arduino UNO real. | Identifiquen parts visibles. |
| Explicació | 30' | Arquitectura: microcontrolador, pins digitals/analògics, alimentació, USB. **Analògic vs digital**. (Projecta la versió etiquetada de [`SA1_esquemes_connexions.md`](SA1_esquemes_connexions.md).) | Etiqueten l'**esquema mut de la placa** (Activitat 2; versió muda del mateix document). |
| Seguretat | 20' | Presenta i comenta les **normes de seguretat** ([`SA1_normes_seguretat.md`](SA1_normes_seguretat.md)). | Llegeixen i **signen** el full. |
| Pràctica | 50' | Tour guiat de l'**Arduino IDE** i de **Tinkercad** (crear compte de classe, primer circuit virtual). | Creen el seu primer circuit a Tinkercad (LED + placa). |
| Tancament | 10' | Resol dubtes de l'entorn. | Entrada al quadern: captura del circuit. |

**Punts clau:**
- **Digital** = dos estats (0/5 V, LOW/HIGH). **Analògic** = valors continus (0–5 V → 0–1023).
- Pins `~` = PWM. Pins `A0-A5` = entrades analògiques.
- **Seguretat:** treballar amb la placa desconnectada en muntar; no curtcircuitar 5 V–GND; respectar polaritats.

---

## SESSIÓ 3 (2 h) — El primer programa

> **Mètode de lectura de codi: PRIMM.** En lloc de copiar codi, l'alumnat el **Prediu**, l'**Executa**, l'**Investiga**, el **Modifica** i en **Crea** un de nou. Predir *abans* d'executar és el pas que més consolida la comprensió. Encaixa amb el mètode de projecte (predir = dissenyar; executar/investigar = provar; modificar/crear = millorar).

| Fase (PRIMM) | Temps | Activitat docent | Activitat alumnat |
|---|---|---|---|
| **Predir** | 15' | Projecta `blink.ino` **sense executar-lo**: *"Què creieu que farà? Què fa cada línia?"* | Escriuen la seva **predicció** a la fitxa (Activitat 4). |
| **Executar** | 10' | Carrega `Blink` (real o Tinkercad). | Comproven la predicció; comenten diferències. |
| **Investigar** | 20' | Lectura guiada: `setup()`, `loop()`, `pinMode`, `digitalWrite`, `delay`. | Anoten què fa cada part i per què. |
| **Modificar** | 25' | Demana canviar el temps i el patró de parpelleig. | Modifiquen `delay` i observen l'efecte. |
| **Crear** | 30' | Proposa el **repte de parpelleig variable** (`blink_repte.ino`). Per a qui acaba aviat, **ampliacions** (`blink_millis.ino`, `sos_morse.ino`). | Resolen; comparen solucions. |
| **Debat + tancament** | 20' | Mini-debat **ètica de l'automatització** (ODS); presenta la **fitxa-pòster** ([`SA1_poster_robot_plantilla.md`](SA1_poster_robot_plantilla.md)). | Reflexió escrita al quadern; trien el robot del pòster. |

**Errors freqüents i solució:**
| Error | Causa | Solució |
|---|---|---|
| El LED no s'encén | Polaritat/posició invertida o sense resistència | Revisar pota llarga (+) a la sortida; resistència 220 Ω. |
| "Port not found" en pujar | Placa no seleccionada | Eines → Placa: Arduino UNO; Port correcte. |
| Parpelleig massa ràpid/imperceptible | `delay` molt petit | Augmentar el valor (ms). |

**Producte de la SA:** fitxa-pòster d'anàlisi d'un robot real ([`SA1_poster_robot_plantilla.md`](SA1_poster_robot_plantilla.md)) + primeres entrades del quadern tècnic.

### Mapa d'avaluació (traçabilitat)

| Instrument | Què evidencia | Criteri | Rúbrica | Qualifica? |
|---|---|---|---|---|
| Prova diagnòstica | Coneixements previs (per agrupar) | — | — | **No** (diagnòstica) |
| Fitxa d'alumnat (Act. 1-4) | Comprensió E-P-S, placa, codi | CA5.1 | R4 | Formativa |
| Fitxa-pòster | Anàlisi d'un sistema + dilema ètic (ODS) | CA5.3 | **R4** | Sí |
| Quadern tècnic | Documentació i reflexió del procés | CA5.1 | **R4** | Sí |
| Observació d'aula | Cooperació, autonomia, seguretat | CA5.3 | **R5** | Sí |

*(CA5.1 = gestionar un projecte tecnològic; CA5.3 = valorar l'impacte ètic/social/ambiental i cooperar. Vegeu [`Programació didàctica/06_Avaluacio_criteris_qualificacio.md`](../../Programació%20didàctica/06_Avaluacio_criteris_qualificacio.md).)*

### Quadern tècnic — primera entrada (guia per a l'alumnat)

El quadern tècnic és el **diari de bord** que es farà servir tota la matèria. La 1a entrada (SA1) inclou, seguint el mètode de projecte:
- **Què he après** (conceptes clau: robot, sistema embegut, E-P-S, digital/analògic).
- **Repte i com l'he resolt** (predicció → solució → millores del `Blink`).
- **Un error que he tingut i com l'he resolt.**
- **Reflexió ètica** (un avantatge i un risc de l'automatització + ODS).

> Comparteix les rúbriques **R4** i **R5** amb l'alumnat **abans** de començar (avaluació formativa).

### Pont cap a la SA2

A la SA1 hem fet **parpellejar un LED** (una sortida digital senzilla). A la **SA2** controlarem **múltiples sortides digitals i PWM** (semàfors, intensitat, RGB): passem de "encendre/apagar" a "graduar i coordinar" sortides.

---

## Guió de modelatge (què verbalitzar)

> Frases i preguntes clau per al **Modelatge** de cada sessió. Pensat perquè el docent **afegeixi valor encara que no improvisi codi**: el que cal mirar, què preguntar (predicció) i l'error que cal anticipar.

- **S1 · Entrada–Procés–Sortida:** dibuixa 3 caixes (SENSOR → CERVELL → ACTUADOR). Per a cada exemple pregunta *"què percep? què decideix? què fa?"* — **no donis tu la resposta**, que la classe ompli les caixes. *Error a anticipar:* confondre entrada (sensor) amb sortida (actuador).
- **S2 · La placa:** assenyala **físicament** cada part abans d'etiquetar-la. Mantra: *pins amb `~` = PWM; A0–A5 = entrades analògiques*. Pregunta: *"un LED, a quin tipus de pin el connectaries?"* *Error a anticipar:* confondre 5V amb GND.
- **S3 · Blink (PRIMM):** projecta `blink.ino` **sense pujar-lo**. Pregunta: *"què farà? i si canvio el 1000 per 100?"*. Llegeix en veu alta `setup()` (s'executa **un cop**) vs `loop()` (**per sempre**); verbalitza que `delay` és en **mil·lisegons**. *Error a anticipar:* creure que `setup()` es repeteix.

## Atenció a la diversitat

| Necessitat | Mesura |
|---|---|
| **Bastida (qui ho necessita)** | Apartats guiats de la fitxa i del pòster; la versió **etiquetada** de la placa com a referència; treball en **parella heterogènia** segons la diagnòstica. |
| **+ Ampliació (qui va sobrat)** | Sketches `blink_millis.ino` (sense `delay()`) i `sos_morse.ino` (funcions); investigar un robot industrial/IA i preparar defensa oral d'1 min. |
| **Diversitat lingüística/lectora** | Glossari mínim a la pissarra (sensor, actuador, procés, embegut); diagrames ASCII i imatges en lloc de text dens. |
| **Sense maquinari per a tothom** | Tot és reproduïble a **Tinkercad**/**Wokwi**; es pot treballar amb el LED **intern** (pin 13) sense cablejar res. |

> **Avaluació formativa:** comparteix les rúbriques **R4** i **R5** amb l'alumnat **abans** de començar el producte (vegeu [`Programació didàctica/07_Rubriques.md`](../../Programació%20didàctica/07_Rubriques.md)).

---

## Treball cooperatiu amb rols

L'alumnat treballa en parella amb **rols rotatius** (un canvi per sessió) perquè tothom programi, munti i documenti:

| Rol | Funció |
|---|---|
| Coordinador/a | Gestiona el temps, llegeix l'enunciat, vetlla perquè tothom participi. |
| Programador/a | Escriu i edita el codi. |
| Enginyer/a de maquinari | Munta el circuit, comprova connexions i seguretat. |
| Provador/a–Documentador/a | Prova, aplica la rutina DEPURA i documenta al quadern. |

> El quadre per rotar els rols és a la fitxa. Forma les parelles **heterogènies** segons la prova diagnòstica.

## Pensament computacional i depuració

- **Concepte de PC d'aquesta SA:** **descomposició** (partir un sistema en entrada → procés → sortida). Nomena-ho explícitament a l'Activitat 1.
- **Depuració:** presenta la **rutina DEPURA** com a forma estàndard d'afrontar errors tot el curs (és a la fitxa); el docent té la taula d'**errors freqüents** de més amunt.

> DEPURA: **D**escriu · **E**xamina · **P**rova una hipòtesi cada cop · **U**bica · **R**epara · **A**punta.

## Avaluació formativa (instruments)

- **Diana d'autoavaluació** (fitxa): posicionament en 3 criteris clau.
- **Coavaluació** ("2 estrelles i un desig"): cada parella valora el pòster d'una altra.
- **Exit ticket** (fitxa): 3 preguntes de tancament; recull-les per ajustar la sessió següent.

## Referent (coeducació)

> **Carme Torras** (Barcelona, 1956) — investigadora en **robòtica assistencial** a l'Institut de Robòtica i Informàtica Industrial (IRI, CSIC-UPC) i pionera a connectar robòtica i **ètica**; també escriu ciència-ficció sobre l'impacte social de la tecnologia.
>
> *Connexió amb la SA:* uneix els dos fils d'aquesta unitat —què és un robot i quins **dilemes ètics** planteja—. Pregunta a la classe: *per què una experta en robots hi dedica temps a pensar-ne l'ètica?*

## Context real i ODS

- **Context:** robots quotidians i sistemes embeguts invisibles (electrodomèstics, transport, indústria).
- **ODS 9** (indústria, innovació) i **ODS 12** (consum responsable): hi connecten el dilema ètic del pòster i la reflexió del quadern.
