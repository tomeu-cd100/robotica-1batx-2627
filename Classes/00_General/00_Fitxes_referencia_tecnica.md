# Fitxes de referència tècnica (annex de consulta)

> Annex de **consulta ràpida** per a l'alumnat i el professorat. Recull conceptes que
> apareixen a diverses SA (pins de la placa, aïllament amb optoacoblador, tipus de sensors,
> biosensors). No és una unitat: és material de **referència** per tenir a mà.

---

## 1. Els pins de l'Arduino UNO

### 1.1 Pins DIGITALS (D0–D13)

Treballen amb **dos estats**: `HIGH` (5 V) o `LOW` (0 V). Es configuren amb `pinMode()`
com a `INPUT`, `INPUT_PULLUP` o `OUTPUT`.

| Pin | Nota |
|---|---|
| **D0 (RX) / D1 (TX)** | Comunicació **sèrie** amb l'ordinador. **Evita fer-los servir** per a LED/sensors: interfereixen amb el Monitor Sèrie i la càrrega de programes. |
| **D2–D13** | Ús general d'entrada/sortida digital. |
| **~3, ~5, ~6, ~9, ~10, ~11** | Marcats amb **`~`**: poden fer **PWM** (`analogWrite`, 0–255) per simular una sortida "analògica" (intensitat de LED, velocitat de motor). |
| **D13** | Té un **LED integrat** a la placa (*LED on board*): ideal per al primer `Blink` sense muntar res. |

> 💡 **Regla pràctica:** si necessites regular intensitat/velocitat, connecta-ho a un pin
> amb **`~`**. Els altres només fan encès/apagat.

### 1.2 Pins ANALÒGICS (A0–A5)

Llegeixen **molts valors** (no només 0/5 V) amb `analogRead()`.

- El convertidor és de **10 bits** → retorna un valor de **0 a 1023**.
- Referència per defecte: **5 V** (0 V → 0; 5 V → 1023). Cada pas ≈ 4,9 mV.
- Serveixen per a **potenciòmetre, LDR, NTC/LM35, TEMT6000…** (sensors de magnitud contínua).
- **Truc:** A0–A5 també poden funcionar com a **pins digitals** si et falten pins D.

> ⚠️ No confonguis les escales: **`analogRead` → 0–1023** (entrada). **`analogWrite`/PWM → 0–255** (sortida).

### 1.3 Alimentació

- **5V** i **3V3**: sortides de tensió per alimentar sensors/mòduls.
- **GND**: massa (referència 0 V). Sempre cal **compartir GND** entre la placa i els mòduls externs.
- **Vin / connector de pila 9V**: alimentar la placa **sense** USB.

---

## 2. L'optoacoblador (per què i quan)

Un **optoacoblador** (o *optocoupler*) és un component que **connecta dos circuits sense
contacte elèctric directe**: a dins hi ha un **LED** i un **fototransistor** enfrontats.
El LED s'encén amb el senyal de control i el fototransistor "veu" la llum i activa l'altre
circuit. La informació passa **per llum**, no per cable.

**Per a què serveix:**
- **Aïllar** el circuit de control (Arduino, 5 V) del circuit de potència (motors, relés,
  230 V). Si hi ha un pic de tensió o una avaria al costat de potència, **l'Arduino queda protegit**.
- Evitar que el **soroll elèctric** dels motors/càrregues torni cap a la placa.

**Quan el trobaràs:** a **mòduls de relé** (molts ja en porten un integrat), en drivers de
motor i en qualsevol muntatge que commuti **càrregues grans** o de **xarxa elèctrica**.

> ⚠️ **Seguretat:** qualsevol treball amb **230 V** es fa amb material homologat i sota
> supervisió. A classe commutem càrregues de **baixa tensió**; la xarxa elèctrica és
> només explicació teòrica.

---

## 3. Tipus de sensors

Un **sensor** capta una magnitud de l'entorn i la converteix en un **senyal elèctric** que
la placa pot llegir. Es classifiquen segons **com** entreguen la informació:

| Tipus | Com es llegeix | Exemples del nostre material |
|---|---|---|
| **Digital** (tot/res) | `digitalRead()` → `HIGH`/`LOW` | Polsador, sensor de xoc (*crash*), PIR de moviment, seguidor de línia (sortida digital) |
| **Analògic** (magnitud contínua) | `analogRead()` → 0–1023 | Potenciòmetre, LDR/TEMT6000 (llum), NTC/LM35 (temperatura), humitat de terra, micròfon |
| **Digital per bus** (I²C/1-Wire…) | Amb **llibreria** | DHT11 (temp+humitat), BMP280 (pressió), CCS811 (CO₂), MPU6050 (IMU), OLED |
| **De distància** | Càlcul de temps (`pulseIn`) | Ultrasons HC-SR04 |

**Idees clau:**
- Un sensor és una **entrada** (percepció); un actuador és una **sortida** (acció).
- Alguns sensors donen **sortida digital i analògica** alhora (mòduls amb potenciòmetre de
  llindar): tria el pin segons el que necessitis.
- **Calibrar** vol dir ajustar els valors del sensor a la realitat (p. ex. quin `analogRead`
  correspon a "fosc" i quin a "clar").

---

## 4. Biosensors

Un **biosensor** és un sensor que detecta senyals del **cos o d'éssers vius**: batec del
cor, activitat muscular, resposta de la pell, respiració, etc. Combinen un element que capta
el senyal biològic amb l'electrònica que el converteix en dades.

| Exemple | Què mesura | Ús típic |
|---|---|---|
| **Sensor de pols/ritme cardíac** | Batecs per minut (fotopletismografia) | Polsera d'activitat, monitor esportiu |
| **Sensor GSR** | Conductància de la pell (suor) | Estudis d'estrès/emoció |
| **Sensor EMG** | Activitat muscular | Pròtesis, control gestual |
| **Sensor de respiració** | Ritme respiratori | Salut, son |

**Per què ens interessen:** connecten la robòtica amb la **salut i el benestar** (un context
real i motivador), i són un bon exemple de **dades personals sensibles**.

> ⚠️ **Ètica i privadesa:** les dades biomètriques són **personals**. No es recullen ni es
> comparteixen dades de salut d'una persona sense el seu consentiment (connecta amb l'ètica
> de dades de la **SA8** i `00_IA_a_la_materia.md`).

---

*Annex de referència tècnica. Material de consulta transversal a les SA. Llicència CC BY-SA 4.0.*
