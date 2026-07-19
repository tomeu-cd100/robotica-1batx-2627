# SA1 · Esquemes i connexions

> Tot reproduïble a **Tinkercad Circuits** (tinkercad.com) o **Wokwi** (wokwi.com). A la SA1 només es necessita **un LED**; si s'usa el LED **intern** (pin 13) no cal cap component extern. El LED **extern** sempre porta una **resistència de 220 Ω** en sèrie i el càtode (pota curta / costat pla) va a **GND**.

---

## 1. Anatomia de la placa Arduino UNO (Activitat 2)

Aquest apartat dona suport a l'**Activitat 2** de la fitxa. Es projecta primer la **versió etiquetada** (model) i, després, l'alumnat etiqueta la **versió muda**.

![Fotografia d'una placa Arduino UNO real](img/arduino-uno-foto.jpg)

> *Fotografia: Arduino Uno R3, per [SparkFun Electronics](https://commons.wikimedia.org/wiki/File:Arduino_Uno_-_R3.jpg) — llicència [CC BY 2.0](https://creativecommons.org/licenses/by/2.0/).*

### 1.1. Versió etiquetada (model del docent)

![Esquema de la placa Arduino UNO amb les parts etiquetades: connector USB, connector d'alimentació, pins digitals 0-13 amb PWM, microcontrolador ATmega328P, LED intern L al pin 13, pins d'alimentació i entrades analògiques A0-A5](img/sa1-placa-uno-etiquetada.svg)

| Part | Funció |
|---|---|
| **Microcontrolador (ATmega328P)** | El "cervell": executa el programa i pren decisions (procés). |
| **Pins digitals (0-13)** | Entrades/sortides de **dos estats** (LOW/HIGH). Els marcats amb `~` fan **PWM**. |
| **Pins analògics (A0-A5)** | **Entrades** de valors continus (0-5 V → 0-1023). |
| **Pins d'alimentació (5V, 3V3, GND, Vin)** | Donen corrent als components. **GND** = referència 0 V. |
| **Connector USB** | Puja el programa des de l'ordinador i alimenta la placa. |
| **Connector d'alimentació (jack)** | Alimentació externa 7-12 V (piles/transformador). |
| **LED intern (L)** | LED de la placa connectat al **pin 13**: ideal per al primer `Blink` sense cablejar res. |

### 1.2. Versió muda (per imprimir / projectar)

L'alumnat escriu el nom de cada part al requadre numerat corresponent.

![Esquema mut de la placa Arduino UNO amb set requadres numerats i buits per escriure el nom de cada part](img/sa1-placa-uno-muda.svg)

> **Solució (per al docent):** 1 · Connector USB · 2 · Connector d'alimentació (7-12 V) · 3 · Pins digitals 0-13 (`~` = PWM) · 4 · LED intern «L» (pin 13) · 5 · Microcontrolador (ATmega328P) · 6 · Pins d'alimentació (5V, GND…) · 7 · Entrades analògiques (A0-A5).

---

## 2. Circuit del primer programa (`Blink`)

### 2.1. Opció A — LED intern (recomanada per començar)

No cal cap component: el LED marcat amb **L** ja està connectat internament al **pin 13**. N'hi ha prou de pujar `blink.ino`.

```
[ Placa Arduino UNO ] ── USB ── [ Ordinador ]
        │
   LED intern "L" (pin 13)  → parpelleja
```

### 2.2. Opció B — LED extern al pin 13

| Component | Pin Arduino | Notes |
|---|---|---|
| LED (ànode +) | Pin 13 → 220 Ω → ànode | Pota **llarga** = + |
| LED (càtode −) | GND | Pota **curta** / costat pla |

![Circuit: el pin 13 va a una resistència de 220 ohms, després a l'ànode (pota llarga, +) del LED, i el càtode (pota curta, −) del LED va a GND](img/sa1-circuit-blink.svg)

> ⚠️ **Sempre** la resistència de 220 Ω en sèrie: sense ella el LED rep massa corrent i es pot fondre.
> El mateix esquema serveix per als sketches d'ampliació `blink_millis` i `sos_morse`.

### 2.3. El mateix circuit, muntat de veritat (variant al pin 8)

El circuit de l'opció B funciona a **qualsevol pin digital**: aquí el tens muntat al **pin 8**, primer al simulador i després amb components reals. Si canvies de pin, només cal canviar el número al codi (`digitalWrite(8, HIGH);` en lloc de `13`).

![Captura de Tinkercad: Arduino UNO amb un LED verd i una resistència de 220 ohms a la protoboard, cable vermell del pin 8 a la resistència i cable negre de GND al càtode del LED](img/sa1-tinkercad-blink-pin8.png)

▶ **Obre la simulació a Tinkercad** (pots fer *Copy and Tinker* per modificar-la): <https://www.tinkercad.com/things/frRjKG3t65m-sa1blinkinternledopciob?sharecode=GAxNpImV4w6b7voAyfgleBhy6jWHl5doUDeHF35HlTc>

![Fotografia del muntatge real: Arduino UNO connectat a una protoboard amb un LED verd encès i una resistència, amb el cable de senyal al pin 8 i el retorn a GND](img/sa1-muntatge-real-pin8.jpg)

> Fixa-t'hi: al muntatge real els colors dels cables no importen (aquí verd i blanc), però **el camí elèctric és idèntic** al de l'esquema: pin digital → resistència → ànode del LED → càtode → GND.

---

## 3. Comprovació ràpida (abans de pujar el codi)

- [ ] Placa seleccionada: **Eines → Placa → Arduino UNO**.
- [ ] **Port** correcte seleccionat (Eines → Port).
- [ ] Si és LED extern: pota llarga cap a la resistència, pota curta a GND.
- [ ] Cap curtcircuit entre **5V** i **GND**.

> Reproducció en simulador: a **Tinkercad** arrossega *Arduino UNO* + *LED* + *resistència de 220 Ω*, cabla com a l'esquema i prem **Iniciar simulació**.

---

## Simulació interactiva (Wokwi)

- ▶ **Simulació interactiva (Blink, LED intern):** <https://wokwi.com/projects/468012800918599681>
- **Projecte al repositori:** [`Simulacions/Wokwi/SA1_blink/`](../../Simulacions/Wokwi/SA1_blink/) (`diagram.json` + `sketch.ino`).

> Obre l'enllaç i prem **▶**: el LED intern (pin 13) parpelleja.
