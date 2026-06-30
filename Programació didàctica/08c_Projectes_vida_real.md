# 08c · Projectes de la vida real (model mixt: producte per SA + gran integrador)

**Proposta pedagògica.** Convertir cada SA en un **producte real autònom** que l'alumnat pugui reconèixer en el món que l'envolta (un braç robòtic, un cotxe teledirigit, una barrera de pàrquing…), mantenint la progressió tècnica actual i culminant amb **SA9 com a gran projecte integrador**.

> **Model triat:** *mixt*. Cada SA acaba amb un **producte físic petit però complet** (no un exercici aïllat), i SA9 demana sintetitzar-ho tot. No s'imposa un únic artefacte de trimestre: cada SA és vàlida per si mateixa, però la seqüència està pensada perquè els subsistemes encaixin si un equip vol acumular-los cap al projecte final.

---

## Per què aquest canvi

Els reptes actuals (`Reptes/`) **ja tenen context realista** (far costaner, semàfor, sensor d'aparcament, braç dispensador, robot repartidor…), però es viuen com a **exercicis tancats**. Aquesta proposta:

- Dona a cada SA un **marc de producte** (qui l'usaria, quin problema resol, quin és el lliurable funcional).
- **Reaprofita** els reptes A/B/C existents com a variants del mateix producte.
- Fa **explícita la connexió** entre el producte de cada SA i el projecte final de SA9.
- **No altera** hores, rúbriques ni seqüència tècnica: és una capa de sentit, no una reestructuració.

---

## Mapa de productes per trimestre

### 1r TRIMESTRE — Arduino: del senyal a la percepció
Productes sense moviment mecànic (es reserva per al 2n trimestre). **Fil:** *un dispositiu que informa i percep.*

| SA | Producte real de la SA | Reptes que s'hi reaprofiten | Qui ho usa / problema real |
|----|------------------------|------------------------------|-----------------------------|
| **SA1** | **Balisa de senyalització** (far, llum de bici o emissor Morse) | Far costaner · Llum de bici · Morse | Senyalització marítima, seguretat viària, comunicació d'emergència |
| **SA2** | **Panell de senyalització programable** (semàfor + indicador) | Semàfor · Llum d'ambient · Indicador de nivell | Regulació de trànsit, indicadors industrials de nivell |
| **SA3** | **Estació sensora intel·ligent** (alarma de proximitat o llum automàtica) | Llum nocturna · Sensor d'aparcament · Instrument interactiu | Estalvi energètic, ajuda a l'aparcament, domòtica |

> **Producte estrella opcional del trimestre:** *peatge/barrera intel·ligent (sense moviment)* — el panell de SA2 mostra l'estat i el sensor de SA3 detecta el vehicle. El motor que obre la barrera arriba a SA4.

---

### 2n TRIMESTRE — Moviment i control: el **braç robòtic**
**Fil:** *una màquina que es mou amb precisió i decideix sola.* Producte estrella del trimestre: un **braç robòtic** controlable i intel·ligent.

| SA | Producte real de la SA | Reptes que s'hi reaprofiten | Qui ho usa / problema real |
|----|------------------------|------------------------------|-----------------------------|
| **SA4** | **Mecanisme motoritzat** (braç dispensador, barrera o vehicle amb motor) | Braç dispensador · Barrera automàtica · Ventilador/vehicle | Robòtica industrial, automatització, accessibilitat |
| **SA5** | **Comandament micro:bit** (per gestos o ràdio) + producte propi micro:bit | Joc/ràdio · Comptapassos · Llum de nit | Wearables, controls sense fil, esport connectat |
| **SA6** | **Control intel·ligent del moviment** (màquina d'estats + proporcional) | Regulador proporcional · Semàfor adaptatiu · Termòstat | Robòtica de precisió, climatització, automòbil |

> **Integració del trimestre:** el **braç de SA4** es **teledirigeix amb el micro:bit de SA5** i es mou de forma **suau i precisa gràcies al control de SA6**. Equips que no vulguin braç poden fer una **barrera/climatitzador** amb la mateixa cadena tècnica.

---

### 3r TRIMESTRE — Robot autònom i connectat: el **cotxe que es torna intel·ligent**
**Fil:** *un vehicle que es condueix sol i es connecta.* Producte estrella: un **cotxe/robot mòbil** que evoluciona de teledirigit a autònom, i SA9 com a síntesi lliure.

| SA | Producte real de la SA | Reptes que s'hi reaprofiten | Qui ho usa / problema real |
|----|------------------------|------------------------------|-----------------------------|
| **SA7** | **Robot mòbil autònom** (evita obstacles o segueix línia) | Explorador · Seguidor de línia · Repartidor | Vehicle autònom, logística, AGV de magatzem |
| **SA8** | **Robot connectat (IoT) i amb IA** (telemetria + gestos) | Estació meteo · Sistema d'alerta · Control per gestos | Cotxe connectat, ciutat intel·ligent, assistència |
| **SA9** | **Projecte final lliure** (cada equip proposa el seu robot) | — (lliure, ja existeix) | El que l'equip vulgui resoldre |

> **Integració del trimestre:** el **cotxe de SA7** rep **telecomandament i telemetria de SA8** (ràdio/WiFi) i pot **reaccionar a gestos**. SA9 permet combinar-ho tot o triar un repte propi (opció competició WRO/RoboCup/FTC o Treball de Recerca).

---

## SA9 com a gran integrador

SA9 ja és un projecte obert; aquesta proposta només hi afegeix un **catàleg de productes de referència** perquè els equips sàpiguen què poden reaprofitar:

- **Braç robòtic classificador** (SA4 + SA6 + visió/sensor de SA3 + IA de gestos de SA8).
- **Cotxe autònom de repartiment** (SA7 + SA8 + senyalització de SA2).
- **Estació domòtica completa** (SA3 sensors + SA6 control + SA8 IoT).
- **Proposta lliure** de l'equip (manté l'esperit obert actual).

---

## Impacte sobre el material actual

| Element | Canvi necessari |
|---------|-----------------|
| Reptes (`Reptes/`) | **Reescriptura de marc**: afegir a cada repte un encapçalament "Producte real / Client / Lliurable". El codi i les ampliacions no canvien. |
| Fitxes d'alumnat | Opcional: una línia de context "Aquest producte serveix per a…". Sense canvis tècnics. |
| Guies docents | Afegir nota d'integració de trimestre (com encadenar productes). |
| Seqüenciació (`08`) | Cap canvi d'hores ni de rúbriques. Aquest document n'és el complement. |
| Material físic | Per al braç de SA4 cal preveure **2-3 servos i estructura** per equip (vegeu `09b_Guia_compra_pressupost.md`); per al cotxe, el robot Imagina 3dBot ja és previst a SA7. |

---

## Decisions pendents abans d'implementar

1. **Abast de la reescriptura de reptes:** tots els reptes A/B/C, o només l'opció "estrella" de cada SA?
2. **Material del braç (SA4):** quants servos per equip i si es comparteix una estructura impresa en 3D comuna.
3. **Avaluació:** afegir o no un criteri de "producte funcional" a les rúbriques, o mantenir R1-R5 tal com estan.

> **Següent pas suggerit:** validar aquest document i, si s'aprova, fer un **pilot reescrivint el repte del braç robòtic (SA4)** com a mostra del nou format "producte real".
