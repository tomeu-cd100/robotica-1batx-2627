# SA4 · Guia docent — Moviment: servos, motors i ponts H

**Durada:** 8 h (4 sessions; la 4a amb ampliacions opcionals) · **Maquinari:** Arduino UNO + braç MeArm (4 servos) + potenciòmetres + ultrasons + motor DC + driver/pont H (L298N) · **Llenguatge:** C/C++
**Referència:** [`Programació didàctica/13_SA4_Moviment_servos_motors.md`](../../Programació%20didàctica/13_SA4_Moviment_servos_motors.md) · **Esquemes:** [`SA4_esquemes_connexions.md`](SA4_esquemes_connexions.md)

> 🧭 **Com s'usa aquesta guia.** **Abans de la SA:** objectius, material i codi de suport (la logística, al checklist docent). **A cada sessió:** la secció «SESSIÓ n» corresponent, amb el «Guió de modelatge» i els «Errors freqüents» a mà. **Durant tota la SA:** diversitat (DUA), ajuda i revisió entre iguals, i pensament computacional. **En avaluar:** «Avaluació formativa (instruments)». **Per contextualitzar:** context real i ODS.

> 🦾 **Fil conductor (des del 28-10-2026):** totes les pràctiques de la SA es
> fan **sobre el braç MeArm** de cada alumne/a, que es munta en torns de
> taller al final de cada sessió. El motor DC queda com a pràctica curta,
> fora del braç (el pont H es fa servir de debò al rover del T3). Calendari,
> pins i rúbrica: [dossier del braç](../00_General/00_Projecte_T2_Brac.md).

## Objectius de la SA
1. Controlar la **posició** d'un servo dins del seu **rang segur** i la **velocitat/direcció** d'un motor DC.
2. Comprendre per què cal un **driver (pont H)** i una **alimentació externa**.
3. Usar llibreries (`Servo.h`) i estructurar el control en **funcions amb paràmetres**.
4. Relacionar entrada (sensor/potenciòmetre) amb el moviment del braç (control).
5. **Muntar i cablejar** el MeArm seguint una guia tècnica.

## Material per alumne/a
- Arduino UNO + USB, protoboard, cables.
- **Caixa del MeArm** (peces tallades, cargols M3, 4 servos: Starter, 2 KS0194 i 1 MG90S) → [guia de muntatge](../00_General/00_Muntatge_brac_MeArm.md).
- 4 potenciòmetres, ultrasons HC-SR04 amb el seu suport, portapiles 4×AA.
- Motor DC i mòdul driver **L298N** (o pont H del kit), per a la pràctica de la S2.

## Codi de suport (`codi/`)

> Cada sketch té la seva **pàgina de pràctica** (per què es fa + codi explicat per blocs, l'`EXPLICACIO.md` de la seva carpeta): és el text que l'alumnat pot rellegir si falta a classe o repassa a casa. El guió oral de sota continua sent teu.

| Fitxer | Contingut |
|---|---|
| `01_servo_potenciometre.ino` | El servo de la base del braç controlat per potenciòmetre; la mateixa pàgina explica el pas 0 (centrar els 4 servos). |
| `02_motor_pont_h.ino` | Motor DC (fora del braç): direcció + velocitat (PWM) amb L298N (amb esquelet «Si t'encalles» a la seva pàgina). |
| `03_ultrasons_brac.ino` | L'ultrasons de l'estació de recollida fa girar la base i obrir la pinça. |
| `04_brac_potenciometres.ino` | Producte: el MeArm amb 4 potenciòmetres, rang segur i zona morta. |
| `05_dos_servos_millis.ino` | Bastida S3 (opcional, 10'): base i pinça a ritmes diferents sense `delay()` (patró `millis()`, prepara la SA6). |

## Mètode de projecte i continuïtat
- **Cicle de treball** (com a tot el curs): *analitzar → dissenyar → prototipar → provar → millorar* (vegeu SA1). El **producte** n'és el recorregut complet i el **quadern tècnic** el documenta.
- **Lectura de codi amb PRIMM:** a cada *modelatge* l'alumnat **prediu** què farà el sketch **abans** d'executar-lo, després l'**investiga**, el **modifica** i en **crea** un de nou. **Operativa (val per a totes les sessions amb codi):** dedica els primers ~5' del Modelatge a projectar el codi nou **sense executar-lo** i recollir prediccions; només després, executa i investiga.
- **Pont (d'on venim / on anem):** ve de la **SA3** (sensors) → portem a la **SA5** (micro:bit + MicroPython, **canvi de plataforma i llenguatge**). El control sensor→moviment d'aquí és la llavor del **control** (SA6) i la **robòtica mòbil** (SA7).
- **Activació de cada sessió (rutina #1 del curs):** els primers **5'** dels 10' d'activació són la **graella de repàs espaiat** — 3 preguntes projectades, tothom escriu, no qualifica. Les graelles d'aquesta SA, llestes per projectar, són al [banc](../00_General/00_Banc_activacio_repas.md); la pregunta ganxo que obre cada sessió, aquí sota, ocupa la resta. *(El dia del mini-check, el mini-check les substitueix totes dues.)*

---

## SESSIÓ 1 (2 h) — El servomotor (la base del braç)
- **Activació (10'):** *"Com es controla l'angle exacte d'un braç robòtic?"* Reparteix les caixes del MeArm: la pregunta es respon amb el braç a la taula.
- 🔭 **Referent (1', dins l'activació):** **Edith Clarke**, primera enginyera elèctrica professional — potència i transmissió, el perquè de l'alimentació externa ([guió](../00_General/00_Referents_tecnologia.md)).
- **Modelatge (20'):** `01_servo_potenciometre.ino` amb el **servo de la base**. Llibreria `Servo.h`, `attach()`, `write(angle)` (0-180°). Diferència servo ↔ motor DC.
- **Pràctica guiada (25'):** mouen el servo a angles fixos; després el controlen amb el potenciòmetre (`map(0-1023 → 0-180)`).
- **Repte (20'):** "escombrada" automàtica (vaivé) suau. **Que la guardin**: és l'eina de calibratge del bloc D a la S2.
- 🔧 **Torn de taller del braç (35'):** **pas 0** (amb el mateix sketch i `write(90)`, els 4 servos centrats i etiquetats) + **blocs A-B** de la [guia de muntatge](../00_General/00_Muntatge_brac_MeArm.md) (banyes, base i laterals).
- **Tancament (10'):** quadern (esquema + codi).

> ⏱️ **Marge:** el temps efectiu real és ~100' (arrencada + recollida), no 120'. Si vas just, retalla primer: **el repte** (l'escombrada es pot donar feta per al calibratge de la S2). El pas 0 no es retalla: sense ell no es pot muntar.

**Punt clau:** el servo es controla per posició (angle); s'alimenta a 5 V però si en mous diversos cal **alimentació externa** (no des del pin 5V de l'Arduino). El pas 0 es fa amb **un sol servo connectat cada vegada**: així n'hi ha prou amb l'USB.

---

## SESSIÓ 2 (2 h) — Motor DC i pont H (+ pinça del braç)
- **Activació (10'):** *"Per què no puc connectar un motor directament a un pin?"* → corrent i protecció.
- **Modelatge (15'):** `02_motor_pont_h.ino`. Funcionament del **pont H** (L298N): `IN1`/`IN2` (direcció), `ENA` (velocitat per PWM). **Massa comuna** entre Arduino i alimentació del motor. Avisa d'entrada: *el motor no és del braç, és per al rover del T3*.
- **Pràctica guiada + repte (25'):** munten el motor amb L298N i alimentació externa; omplen les funcions `endavant(vel)`, `enrere(vel)`, `atura()` (esquelet «Si t'encalles» a mà per a qui el necessiti) i fan una seqüència curta.
- 🔧 **Torn de taller del braç (40'):** **blocs C-D**: pinça (passos 7-8) i **calibratge** dels servos de pinça, esquerre i dret amb l'escombrada de la S1 (passos 9-11). Que anotin al quadern els angles límit que ja vegin.
- **Tancament (10'):** quadern.

> ⏱️ **Marge:** el temps efectiu real és ~100' (arrencada + recollida), no 120'. Si vas just, retalla primer: **la seqüència pròpia del motor** (n'hi ha prou que les tres funcions funcionin). El calibratge no es retalla: el bloc E el necessita fet.

**Punt clau:** un pin d'Arduino dona poc corrent → el **driver** amplifica. **Sempre** unir el GND de l'Arduino amb el GND de l'alimentació del motor (massa comuna). Mai alimentar el motor des del pin 5V.

---

## SESSIÓ 3 (2 h) — Del sensor al braç
- **Activació (10'):** *"Com sap un braç d'una fàbrica que ha arribat una peça a la cinta?"*
- **Modelatge (20'):** `03_ultrasons_brac.ino`. Integració: l'ultrasons de l'estació de recollida mesura la distància → si hi ha objecte, la base s'hi gira i la pinça s'obre (percepció→acció). La funció `mesuraDistancia()` és la de la SA3; **canvien els pins** (D7/D8, perquè el D11 és la pinça).
- **Pràctica guiada (20'):** connecten l'ultrasons i els servos de base i pinça amb piles; omplen la taula distància → què fa el braç amb el Serial Plotter obert.
- **Repte (15'):** obertura de la pinça proporcional a la distància amb `map()` + guarda de seguretat.
- 🔧 **Torn de taller del braç (45'):** **bloc E** (passos 12-18), l'estructura central. El **pas 15 es fa en parella** (una persona aguanta i l'altra cargola): organitza-ho perquè tothom ajudi i sigui ajudat (evidència per a R5).
- **Tancament (10'):** quadern (taula distància→braç).

> ⏱️ **Marge:** el temps efectiu real és ~100' (arrencada + recollida), no 120'. Si vas just, retalla primer: **el repte** (la pràctica guiada ja demostra percepció→acció). Si el bloc E no s'acaba, es completa al principi del torn de la S4.

**Punt clau:** la sortida (moviment del braç) depèn de l'entrada (sensor) → primer pas cap al **control** (SA6). Fes notar el «ball» del braç amb l'objecte **just al llindar**: és el problema que la **histèresi** de la SA6 resoldrà.

> 🧩 **Bastida `millis()` (10', per a qui acaba aviat — recomanat, prepara la SA6):** [`05_dos_servos_millis`](codi/05_dos_servos_millis/EXPLICACIO.md): base i pinça a ritmes diferents **sense `delay()`**. Repesca el concepte presentat a la SA2 S1 («`delay()` bloqueja») i és el patró que la **màquina d'estats del braç** (SA6) dona per sabut. Si no hi arriba ningú, reserva els 10' d'escalfament previstos a la S3 de SA6.

---

## SESSIÓ 4 (2 h) — Producte: el braç amb potenciòmetres
- **Mini-check individual (10', substitueix l'activació):** les 3 línies del servo a 90° + per què els servos i el motor DC van amb alimentació externa — [`00_Mini_checks_individuals.md`](../00_General/00_Mini_checks_individuals.md). Aprofita el canvi de full per presentar en 1' el producte.
- 🔧 **Cablatge definitiu (20'):** 4 servos a les piles amb GND comú i 4 potenciòmetres a A0-A3 ([mapa de pins](../00_General/00_Projecte_T2_Brac.md#cablatge)). Qui no hagi acabat el bloc E, l'acaba ara.
- **Pràctica (50'):** `04_brac_potenciometres.ino`. Amb el Monitor sèrie obert, troben els **angles límit** de cada servo, els posen a les constants `_MIN`/`_MAX` i ajusten la zona morta. Prova final: **agafar un objecte de l'estació de recollida i deixar-lo en un altre lloc**.
- **Documentació + defensa (20'):** esquema, codi comentat i **mini-defensa individual** (1-2' per alumne/a: amb 5 alumnes, ~10' en total) amb la **mini-rúbrica R4·DO** ([`07_Rubriques.md`](../../Programació%20didàctica/07_Rubriques.md)): a més de la claredat (SA2), ara s'espera **una decisió tècnica justificada** (per què aquests angles límit, per què aquesta zona morta).
- **Tancament (10'):** autoavaluació.

> ⏱️ **Marge:** el temps efectiu real és ~100' (arrencada + recollida), no 120'. Si vas just, retalla primer: **la prova d'agafar un objecte** (passa a la SA5-S2). Si el T2 va just, aquesta S4 és **comprimible**: el repte de la S3 fa de producte i el cablatge passa al torn de la SA5-S2.

**Producte:** el braç MeArm muntat i controlat amb quatre potenciòmetres, dins dels seus angles límit.
**Avaluació:** rúbriques **R1** (codi), **R2** (circuit), **R3** parcial (control).

### Mapa d'avaluació (traçabilitat)
| Instrument | Què evidencia | Criteri | Rúbrica |
|---|---|---|---|
| Producte (el braç amb potenciòmetres) | Control de posició dins del rang segur, sensor→actuador (S3) | CA3.1 | R3 (parcial), R1 |
| Repte de codi (funcions amb paràmetres) | `Servo.h`, lògica del pont H, `map()`, funcions | CA1.1 | R1 |
| Quadern tècnic | Esquema del pont H, taula distància→braç, angles límit, errors | CA1.1 | **R4** |
| Observació de muntatge segur | Massa comuna, servos a les piles, no alimentar motors des de l'Arduino; muntatge del MeArm seguint la guia | CA2.1 | R2 |
| Ajuda entre iguals i **revisió creuada** de codi | Cooperació sense producte compartit: línia d'ajuda del quadern + una millora concreta i un dubte al company | CA5.3 | **R5** |

*(CA1.1 = programar en C/C++; CA2.1 = dissenyar/muntar circuits amb seguretat; CA3.1 = implementar sistemes de control. Vegeu [`Programació didàctica/06_Avaluacio_criteris_qualificacio.md`](../../Programació%20didàctica/06_Avaluacio_criteris_qualificacio.md). Comparteix R1, R2 i R3 **abans** de començar.)*

## Errors freqüents
| Error | Causa | Solució |
|---|---|---|
| El servo vibra/no arriba a l'angle | Alimentació insuficient | Alimentació externa de 5 V; massa comuna. |
| El motor no gira | Falta `ENA` en HIGH/PWM o massa no comuna | Activar `ENA`; unir GND Arduino–driver–piles. |
| L'Arduino es reinicia en moure el motor | Pic de corrent des del 5V | Mai alimentar el motor des de l'Arduino. |
| Gira sempre en el mateix sentit | `IN1`/`IN2` mal posats | Revisar la lògica IN1≠IN2 per a cada sentit. |

---

## Guió de modelatge (què verbalitzar)

> Frases i preguntes clau per al **Modelatge** de cada sessió (què mirar, què preguntar abans d'executar, error a anticipar).

> ✍️ **Katas:** en acabar el modelatge de cada sessió amb pràctica de codi, projecta el kata del sketch del dia ([SA4_katas.md](SA4_katas.md)): 10' d'escriptura individual **abans** de repartir/obrir el sketch. **Un sol kata per sessió**; el dia del mini-check (**S4** en aquesta SA) el mini-check el substitueix, i el kata `04_brac_potenciometres` queda com a **repàs autònom** (marcat amb 🔁 al fitxer): recomana'l com a deures abans de tancar la SA. Per a la posada en comú, tens la solució comentada de cada kata (amb els valors de la variació) a [SA4_katas_solucions.md](SA4_katas_solucions.md).

- **S1 · `01_servo_potenciometre` (servo):** distingeix **servo** (controla *posició*/angle 0–180°) de **motor DC** (gir continu). Demana predir on anirà `write(90)`: és exactament el **pas 0** del muntatge. Avís: *si mous diversos servos, alimentació externa*. *Error a anticipar:* el servo vibra per alimentació insuficient.
- **S2 · `02_motor_pont_h` (pont H):** dibuixa la **taula IN1/IN2** per a cada sentit i assenyala **ENA = velocitat (PWM)**. Repeteix com un mantra: *MASSA COMUNA, mai el motor des del 5V*. *Error a anticipar:* l'Arduino es reinicia pel pic de corrent del motor.
- **S3 · `03_ultrasons_brac` (percepció→acció):** mostra que `mesuraDistancia()` és la funció de la SA3 i pregunta *per què canvien els pins* (el D11 és la pinça). Pregunta: *"què farà el braç amb l'objecte just a 15 cm?"* (el «ball»: llavor de la histèresi).
- **S4 · `04_brac_potenciometres` (integració):** pregunta *què passa si el `map()` va a 0-180 en lloc del rang segur* (el servo força el topall). Explica el `&` de `mouSiCal()` amb la imatge de l'original vs la fotocòpia.

> 🤖 **Fil conductor de robots (des del 28-10-2026):** el MeArm **es munta
> en els torns de taller de les S1-S3** i la S4 n'és el **producte**
> ([`00_Fil_conductor_robots.md`](../00_General/00_Fil_conductor_robots.md),
> [dossier](../00_General/00_Projecte_T2_Brac.md)). Si el calendari va just,
> aquesta S4 és **comprimible** (el repte de la S3 fa de producte i el
> cablatge passa al torn de la SA5-S2): és el marge real del T2.
>
> *Contingència:* si les peces no eren tallades a la s13, les pràctiques es
> fan amb **servos solts a la breadboard** (cap pràctica no depèn del braç) i
> la S4 es dedica al **muntatge sencer** (~2 h). Si el prototip del MeArm va
> fallar, el pla B és `brac.svg` (3 servos): vegeu el dossier.

## Atenció a la diversitat (DUA)

| Via | Mesura |
|---|---|
| **Bastida** (qui s'encalla) | Moure el servo a **angles fixos** abans del control amb potenciòmetre; donar la **taula de lògica del pont H** ja resolta; l'**esquelet amb `// TODO`** de les funcions de moviment a la [pàgina del motor](codi/02_motor_pont_h/EXPLICACIO.md) i el de `millis()` a la [pàgina de `05_dos_servos_millis`](codi/05_dos_servos_millis/EXPLICACIO.md); al taller, parella de muntatge al pas 15. |
| **+ Ampliació** (qui va sobrat) | Dos servos coordinats, pinça proporcional a la distància, `05_dos_servos_millis`; reptes ⭐ de [`Reptes/Reptes_SA4.md`](../../Reptes/Reptes_SA4.md) (dispensador, registre/replay). |
| **Representació múltiple** | Esquemes SVG del braç, simulació Wokwi (servo), guia de muntatge amb les fotos oficials, codi comentat. |
| **Implicació** | Cada alumne/a tria els angles, la tasca que farà el braç i el decora (etiquetes, colors) com a seu. |

## Cooperació (amb treball individual)

El treball és **individual**: cadascú munta el seu circuit, escriu el seu codi i lliura el seu producte ([`04_Metodologia.md` §4.3](../../Programació%20didàctica/04_Metodologia.md)). La cooperació —el **CA5.3** i la **R5**— s'evidencia en la **revisió creuada de codi** (abans de tancar el producte, cadascú llegeix el codi d'un company i li retorna **una millora concreta i un dubte**) i en l'**ajuda documentada** al quadern («qui m'ha ajudat / a qui he ajudat»).

> Si en algun moment ajuntes dues persones (material que falla, una absència, un repte massa gros), reparteix només dos rols —**qui escriu** i **qui verifica**— i fes que s'intercanviïn a mitja sessió; el lliurable continua sent de cadascú.

## Pensament computacional i depuració

- **PC d'aquesta SA:** **descomposició del moviment** (agafar un objecte = girar → baixar → tancar → pujar) i **abstracció** amb funcions (`llegeixAngle()`, `mouSiCal()`, `endavant()`…: una funció, quatre articulacions).
- **Depuració:** rutina **DEPURA**; atenció especial a la **seguretat elèctrica** en aïllar el problema (alimentació, massa comuna).

## Avaluació formativa (instruments)

- **Diana d'autoavaluació** (fitxa) · **Revisió creuada de codi** (una millora concreta i un dubte sobre el codi d'un company) · **Exit ticket** de tancament.
- **Mini-check individual** (10', **inici de la S4, substitueix l'activació**, no qualifica): les 3 línies del servo a 90° + per què el motor DC va amb alimentació externa. Vegeu [`../00_General/00_Mini_checks_individuals.md`](../00_General/00_Mini_checks_individuals.md).

## Referent (coeducació)

> **Cynthia Breazeal** — enginyera del MIT, pionera de la **robòtica social** (robots que es mouen i interaccionen per comunicar-se, com Kismet i Jibo).
>
> *Connexió amb la SA:* el moviment controlat (servos, motors) no només **desplaça** —també **expressa i assisteix** (robòtica assistencial, ODS 10)—. Pregunta: *quins moviments fan que un robot sembli "viu" o proper?*

## Context real i ODS

- **Context:** braços robòtics industrials (cadenes de muntatge, *pick and place*), cirurgia robòtica, pròtesis de mà, robòtica assistencial.
- **ODS 9** (indústria i innovació) i **ODS 10** (reduir desigualtats: accessibilitat i tecnologia assistencial).
