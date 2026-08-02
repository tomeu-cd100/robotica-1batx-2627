# SA4 · Guia docent — Moviment: servos, motors i ponts H

**Durada:** 8 h (4 sessions; la 4a amb ampliacions opcionals) · **Maquinari:** Arduino UNO + servo SG90 + motor DC + driver/pont H (L298N) · **Llenguatge:** C/C++
**Referència:** [`Programació didàctica/13_SA4_Moviment_servos_motors.md`](../../Programació%20didàctica/13_SA4_Moviment_servos_motors.md) · **Esquemes:** [`SA4_esquemes_connexions.md`](SA4_esquemes_connexions.md)

> 🧭 **Com s'usa aquesta guia.** **Abans de la SA:** objectius, material i codi de suport (la logística, al checklist docent). **A cada sessió:** la secció «SESSIÓ n» corresponent, amb el «Guió de modelatge» i els «Errors freqüents» a mà. **Durant tota la SA:** diversitat (DUA), ajuda i revisió entre iguals, i pensament computacional. **En avaluar:** «Avaluació formativa (instruments)». **Per contextualitzar:** context real i ODS.

## Objectius de la SA
1. Controlar la **posició** d'un servo i la **velocitat/direcció** d'un motor DC.
2. Comprendre per què cal un **driver (pont H)** i una **alimentació externa**.
3. Usar llibreries (`Servo.h`) i estructurar el control en **funcions**.
4. Relacionar entrada (sensor/potenciòmetre) amb moviment (control).

## Material per alumne/a
- Arduino UNO + USB, protoboard, cables.
- Servo SG90, motor DC, mòdul driver **L298N** (o pont H del kit), portapiles/alimentació externa (4×AA o font), potenciòmetre, sensor d'ultrasons.

## Codi de suport (`codi/`)

> Cada sketch té la seva **pàgina de pràctica** (per què es fa + codi explicat per blocs, l'`EXPLICACIO.md` de la seva carpeta): és el text que l'alumnat pot rellegir si falta a classe o repassa a casa. El guió oral de sota continua sent teu.

| Fitxer | Contingut |
|---|---|
| `01_servo_potenciometre.ino` | Servo controlat per potenciòmetre. |
| `02_motor_pont_h.ino` | Motor DC: direcció + velocitat (PWM) amb L298N (amb esquelet «Si t'encalles» a la seva pàgina). |
| `03_sensor_velocitat.ino` | Ultrasons regula la velocitat del motor. |
| `04_barrera_automatica.ino` | Producte: barrera amb servo activada per sensor. |
| `05_dos_leds_millis.ino` | Mini-pràctica S3 (opcional, 10'): dos LED sense `delay()` (patró `millis()`, prepara la SA6). |

## Mètode de projecte i continuïtat
- **Cicle de treball** (com a tot el curs): *analitzar → dissenyar → prototipar → provar → millorar* (vegeu SA1). El **producte** n'és el recorregut complet i el **quadern tècnic** el documenta.
- **Lectura de codi amb PRIMM:** a cada *modelatge* l'alumnat **prediu** què farà el sketch **abans** d'executar-lo, després l'**investiga**, el **modifica** i en **crea** un de nou. **Operativa (val per a totes les sessions amb codi):** dedica els primers ~5' del Modelatge a projectar el codi nou **sense executar-lo** i recollir prediccions; només després, executa i investiga.
- **Pont (d'on venim / on anem):** ve de la **SA3** (sensors) → portem a la **SA5** (micro:bit + MicroPython, **canvi de plataforma i llenguatge**). El control sensor→moviment d'aquí és la llavor del **control** (SA6) i la **robòtica mòbil** (SA7).
- **Activació de cada sessió (rutina #1 del curs):** els primers **5'** dels 10' d'activació són la **graella de repàs espaiat** — 3 preguntes projectades, tothom escriu, no qualifica. Les graelles d'aquesta SA, llestes per projectar, són al [banc](../00_General/00_Banc_activacio_repas.md); la pregunta ganxo que obre cada sessió, aquí sota, ocupa la resta. *(El dia del mini-check, el mini-check les substitueix totes dues.)*

---

## SESSIÓ 1 (2 h) — El servomotor
- **Activació (10'):** *"Com es controla l'angle exacte d'un braç robòtic?"*
- 🔭 **Referent (1', dins l'activació):** **Edith Clarke**, primera enginyera elèctrica professional — potència i transmissió, el perquè de l'alimentació externa ([guió](../00_General/00_Referents_tecnologia.md)).
- **Modelatge (25'):** `01_servo_potenciometre.ino`. Llibreria `Servo.h`, `attach()`, `write(angle)` (0-180°). Diferència servo ↔ motor DC.
- **Pràctica guiada (35'):** munten el servo; el mouen a angles fixos; després el controlen amb el potenciòmetre (`map(0-1023 → 0-180)`).
- **Repte (40'):** "escombrada" automàtica (vaivé 0↔180) suau; **+ repte:** dos servos coordinats.
- **Tancament (10'):** quadern (esquema + codi).

> ⏱️ **Marge:** el temps efectiu real és ~100' (arrencada + recollida), no 120'. Si vas just, retalla primer: **+ repte: dos servos coordinats**.

**Punt clau:** el servo es controla per posició (angle); s'alimenta a 5 V però si en mous diversos cal **alimentació externa** (no des del pin 5V de l'Arduino).

---

## SESSIÓ 2 (2 h) — Motor DC i pont H
- **Activació (10'):** *"Per què no puc connectar un motor directament a un pin?"* → corrent i protecció.
- **Modelatge (30'):** `02_motor_pont_h.ino`. Funcionament del **pont H** (L298N): `IN1`/`IN2` (direcció), `ENA` (velocitat per PWM). **Massa comuna** entre Arduino i alimentació del motor.
- **Pràctica guiada (30'):** munten el motor amb L298N i alimentació externa; gir endavant/enrere; control de velocitat.
- **Repte (40'):** funcions `endavant(vel)`, `enrere(vel)`, `atura()`; seqüència de moviments; **+ repte:** rampa d'acceleració.
- **Tancament (10'):** quadern.

> ⏱️ **Marge:** el temps efectiu real és ~100' (arrencada + recollida), no 120'. Si vas just, retalla primer: **+ repte: rampa d'acceleració**.

**Punt clau:** un pin d'Arduino dona poc corrent → el **driver** amplifica. **Sempre** unir el GND de l'Arduino amb el GND de l'alimentació del motor (massa comuna). Mai alimentar el motor des del pin 5V.

---

## SESSIÓ 3 (2 h) — Del sensor al moviment
- **Activació (10'):** *"Com fa un robot per frenar quan s'acosta a una paret?"*
- **Modelatge (25'):** `03_sensor_velocitat.ino`. Integració: l'ultrasons mesura distància → `map()` → velocitat del motor (percepció→acció).
- **Pràctica guiada (35'):** connecten ultrasons + motor; com més a prop, més lent.
- **Repte (40'):** aturar el motor per sota d'un llindar de seguretat; **+ repte:** invertir el sentit segons distància.
- **Tancament (10'):** quadern (taula distància→velocitat).

> ⏱️ **Marge:** el temps efectiu real és ~100' (arrencada + recollida), no 120'. Si vas just, retalla primer: **+ repte: invertir el sentit segons distància**.

**Punt clau:** la sortida (moviment) depèn de l'entrada (sensor) → primer pas cap al **control** (SA6) i la robòtica mòbil (SA7).

> 🧩 **Bastida `millis()` (10', per a qui acaba aviat — recomanat, prepara la SA6):** mini-pràctica [`05_dos_leds_millis`](codi/05_dos_leds_millis/05_dos_leds_millis.ino): dos LED a ritmes diferents **sense `delay()`**. Repesca el concepte presentat a la SA2 S2 («`delay()` bloqueja») i és el patró que la **màquina d'estats de la SA6** dona per sabut. Si no hi arriba ningú, reserva els 10' d'escalfament previstos a la S3 de SA6.

---

## SESSIÓ 4 (2 h) — Producte: barrera automàtica
- **Mini-check individual (10', substitueix l'activació):** les 3 línies del servo a 90° + per què el motor DC va amb alimentació externa — [`00_Mini_checks_individuals.md`](../00_General/00_Mini_checks_individuals.md). Aprofita el canvi de full per presentar en 1' el repte.
- **Pràctica (70'):** `04_barrera_automatica.ino`. Barrera amb **servo** que s'obre quan l'ultrasons detecta un vehicle a prop i es tanca passat un temps, amb LED indicador. Cada alumne/a personalitza temps i angles.
- **Documentació + defensa (30'):** esquema, codi comentat i **mini-defensa individual** (1-2' per alumne/a: amb 5 alumnes, ~10' en total) amb la **mini-rúbrica R4·DO** ([`07_Rubriques.md`](../../Programació%20didàctica/07_Rubriques.md)): a més de la claredat (SA2), ara s'espera **una decisió tècnica justificada** (per què aquest llindar de distància, per què aquests angles).
- **Tancament (10'):** autoavaluació.

> ⏱️ **Marge:** el temps efectiu real és ~100' (arrencada + recollida), no 120'. Si vas just, retalla primer: **la personalització de temps i angles al final de la Pràctica (70')**.

**Producte:** mecanisme motoritzat controlat per sensor (barrera, braç o ventilador regulable).
**Avaluació:** rúbriques **R1** (codi), **R2** (circuit), **R3** parcial (control).

### Mapa d'avaluació (traçabilitat)
| Instrument | Què evidencia | Criteri | Rúbrica |
|---|---|---|---|
| Producte (barrera/braç/ventilador) | Control de posició i velocitat sensor→actuador | CA3.1 | R3 (parcial), R1 |
| Repte de codi (funcions de moviment) | `Servo.h`, lògica del pont H, `map()`, funcions | CA1.1 | R1 |
| Quadern tècnic | Esquema del pont H, taula distància→velocitat, errors | CA1.1 | **R4** |
| Observació de muntatge segur | Massa comuna, alimentació externa, no alimentar motors des de l'Arduino | CA2.1 | R2 |
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

> ✍️ **Katas:** en acabar el modelatge de cada sessió amb pràctica de codi, projecta el kata del sketch del dia ([SA4_katas.md](SA4_katas.md)): 10' d'escriptura individual **abans** de repartir/obrir el sketch. **Un sol kata per sessió**; el dia del mini-check (**S4** en aquesta SA) el mini-check el substitueix, i el kata `04_barrera_automatica` queda com a **repàs autònom** (marcat amb 🔁 al fitxer): recomana'l com a deures abans de tancar la SA. Per a la posada en comú, tens la solució comentada de cada kata (amb els valors de la variació) a [SA4_katas_solucions.md](SA4_katas_solucions.md).

- **S1 · `01_servo_potenciometre` (servo):** distingeix **servo** (controla *posició*/angle 0–180°) de **motor DC** (gir continu). Demana predir on anirà `write(90)`. Avís: *si mous diversos servos, alimentació externa*. *Error a anticipar:* el servo vibra per alimentació insuficient.
- **S2 · `02_motor_pont_h` (pont H):** dibuixa la **taula IN1/IN2** per a cada sentit i assenyala **ENA = velocitat (PWM)**. Repeteix com un mantra: *MASSA COMUNA, mai el motor des del 5V*. *Error a anticipar:* l'Arduino es reinicia pel pic de corrent del motor.
- **S3 · `03_sensor_velocitat` (percepció→acció):** mostra com `map()` converteix **distància → velocitat**. Pregunta: *"què ha de passar a la distància mínima de seguretat?"*
- **S4 · `04_barrera_automatica` (integració):** mostra'l com a integració; pregunta com personalitzarien temps i angles.

> 🤖 **Fil conductor de robots:** si el curs segueix el fil conductor
> ([`00_Fil_conductor_robots.md`](../00_General/00_Fil_conductor_robots.md)),
> aquesta S4 és la **sessió de fabricació del braç**: el repte de la S3 fa de
> producte (mateixa palanca oficial del pla de contingència) i la sessió es
> dedica al tall làser i muntatge del braç de 3 GDL (base, colze, pinça)
> ([dossier](../00_General/00_Projecte_T2_Brac.md)). El mini-check de la S4
> es manté a l'inici de la sessió.

## Atenció a la diversitat (DUA)

| Via | Mesura |
|---|---|
| **Bastida** (qui s'encalla) | Moure el servo a **angles fixos** abans del control amb potenciòmetre; donar la **taula de lògica del pont H** ja resolta; l'**esquelet amb `// TODO`** de les funcions de moviment a la secció «Si t'encalles» de la [pàgina de la pràctica del motor](codi/02_motor_pont_h/EXPLICACIO.md); si cal, agrupament puntual amb un company/a que ja ho tingui resolt (qui escriu / qui verifica). |
| **+ Ampliació** (qui va sobrat) | Dos servos coordinats, rampa d'acceleració, invertir sentit per distància; reptes ⭐ de [`Reptes/Reptes_SA4.md`](../../Reptes/Reptes_SA4.md). |
| **Representació múltiple** | Esquema del pont H, simulació Wokwi (servo), vídeo del moviment, codi comentat. |
| **Implicació** | Cada alumne/a tria angles, temps i el mecanisme (barrera, braç, ventilador). |

## Cooperació (amb treball individual)

El treball és **individual**: cadascú munta el seu circuit, escriu el seu codi i lliura el seu producte ([`04_Metodologia.md` §4.3](../../Programació%20didàctica/04_Metodologia.md)). La cooperació —el **CA5.3** i la **R5**— s'evidencia en la **revisió creuada de codi** (abans de tancar el producte, cadascú llegeix el codi d'un company i li retorna **una millora concreta i un dubte**) i en l'**ajuda documentada** al quadern («qui m'ha ajudat / a qui he ajudat»).

> Si en algun moment ajuntes dues persones (material que falla, una absència, un repte massa gros), reparteix només dos rols —**qui escriu** i **qui verifica**— i fes que s'intercanviïn a mitja sessió; el lliurable continua sent de cadascú.

## Pensament computacional i depuració

- **PC d'aquesta SA:** **descomposició del moviment** (partir una tasca en passos) i **abstracció** amb funcions (`endavant()`, `atura()`…).
- **Depuració:** rutina **DEPURA**; atenció especial a la **seguretat elèctrica** en aïllar el problema (alimentació, massa comuna).

## Avaluació formativa (instruments)

- **Diana d'autoavaluació** (fitxa) · **Revisió creuada de codi** (una millora concreta i un dubte sobre el codi d'un company) · **Exit ticket** de tancament.
- **Mini-check individual** (10', **inici de la S4, substitueix l'activació**, no qualifica): les 3 línies del servo a 90° + per què el motor DC va amb alimentació externa. Vegeu [`../00_General/00_Mini_checks_individuals.md`](../00_General/00_Mini_checks_individuals.md).

## Referent (coeducació)

> **Cynthia Breazeal** — enginyera del MIT, pionera de la **robòtica social** (robots que es mouen i interaccionen per comunicar-se, com Kismet i Jibo).
>
> *Connexió amb la SA:* el moviment controlat (servos, motors) no només **desplaça** —també **expressa i assisteix** (robòtica assistencial, ODS 10)—. Pregunta: *quins moviments fan que un robot sembli "viu" o proper?*

## Context real i ODS

- **Context:** barreres, ascensors, braços robòtics, pròtesis, robòtica assistencial.
- **ODS 9** (indústria i innovació) i **ODS 10** (reduir desigualtats: accessibilitat i tecnologia assistencial).
