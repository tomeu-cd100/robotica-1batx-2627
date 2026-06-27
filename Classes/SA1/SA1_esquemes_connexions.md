# SA1 · Esquemes i connexions

> Tot reproduïble a **Tinkercad Circuits** (tinkercad.com) o **Wokwi** (wokwi.com). A la SA1 només es necessita **un LED**; si s'usa el LED **intern** (pin 13) no cal cap component extern. El LED **extern** sempre porta una **resistència de 220 Ω** en sèrie i el càtode (pota curta / costat pla) va a **GND**.

---

## 1. Anatomia de la placa Arduino UNO (Activitat 2)

Aquest apartat dona suport a l'**Activitat 2** de la fitxa. Es projecta primer la **versió etiquetada** (model) i, després, l'alumnat etiqueta la **versió muda**.

### 1.1. Versió etiquetada (model del docent)

```
                       ┌─────── USB (programació + alimentació)
                       │   ┌─── Connector d'alimentació (7-12 V)
                       ▼   ▼
                  ┌──────────────────────────────────────┐
   PINS DIGITALS  │  [ 13 12 ~11 ~10 ~9  8 | 7 ~6 ~5 4 ~3 2 1 0 ] │  ← (~ = PWM)
   (entrada/      │                                        │
    sortida)      │            ARDUINO  UNO                │
                  │         ┌──────────────┐               │
                  │         │ ATmega328P   │ ← MICROCONTROLADOR (el "cervell")
                  │         └──────────────┘               │
                  │  [ IOREF RESET 3V3 5V GND GND Vin ]     │  ← PINS D'ALIMENTACIÓ
   ALIMENTACIÓ →  │  [ A0 A1 A2 A3 A4 A5 ]                  │  ← ENTRADES ANALÒGIQUES
                  └──────────────────────────────────────┘
```

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

L'alumnat escriu el nom de cada part als requadres `[ ____ ]`.

```
                       ┌─────── [ ____________ ]
                       │   ┌─── [ ____________ ]
                       ▼   ▼
                  ┌──────────────────────────────────────┐
  [ __________ ]  │  [ 13 12 ~11 ~10 ~9  8 | 7 ~6 ~5 4 ~3 2 1 0 ] │
                  │            ARDUINO  UNO                │
                  │         ┌──────────────┐               │
                  │         │              │ ← [ ____________ ]
                  │         └──────────────┘               │
  [ __________ ]  │  [ IOREF RESET 3V3 5V GND GND Vin ]     │
  [ __________ ]  │  [ A0 A1 A2 A3 A4 A5 ]                  │
                  └──────────────────────────────────────┘
```

> **Imatges reals recomanades** (per projectar o imprimir en color):
> - Diagrama oficial de la placa: documentació d'Arduino — *Arduino UNO Rev3* (`docs.arduino.cc`).
> - Vista interactiva: crea el circuit a **Tinkercad** i fes captura de la placa amb les etiquetes.

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

```
Pin 13 ──[220 Ω]──►|── GND
                   LED
```

> ⚠️ **Sempre** la resistència de 220 Ω en sèrie: sense ella el LED rep massa corrent i es pot fondre.
> El mateix esquema serveix per als sketches d'ampliació `blink_millis` i `sos_morse`.

---

## 3. Comprovació ràpida (abans de pujar el codi)

- [ ] Placa seleccionada: **Eines → Placa → Arduino UNO**.
- [ ] **Port** correcte seleccionat (Eines → Port).
- [ ] Si és LED extern: pota llarga cap a la resistència, pota curta a GND.
- [ ] Cap curtcircuit entre **5V** i **GND**.

> Reproducció en simulador: a **Tinkercad** arrossega *Arduino UNO* + *LED* + *resistència de 220 Ω*, cabla com a l'esquema i prem **Iniciar simulació**.
