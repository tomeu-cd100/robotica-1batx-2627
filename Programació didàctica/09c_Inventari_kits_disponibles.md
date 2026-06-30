# 09c · Inventari del maquinari disponible (dotació real del centre)

Aquest document deixa **constància del maquinari que el centre ja té** per a la matèria i **on s'utilitza cada element** dins de les SA. A diferència de `09b_Guia_compra_pressupost.md` (compra des de zero), aquí es documenta la **dotació real disponible** el curs 2026-2027.

> 📷 **Font:** fotografies dels kits desades a `Recursos/`:
> `arduino-starter-kit-espanol.jpg`, `sensors_bàsics.jpg`, `sensors_avançats.jpg`.

## Dotació per alumne

- **3 kits combinats per alumne** (hi ha tants kits com alumnes): Kit 1 (Arduino Starter Kit oficial) + Kit 2 (sensors bàsics Keyestudio) + Kit 3 (sensors avançats Keyestudio).
- **1 micro:bit (+ Micro:shield) per alumne.**
- **Placa/robot Imagina 3dBot** (per a robòtica mòbil, SA7).
- **Alimentació i cables al centre:** piles AA + carregador, piles 9V (alim. UNO sense USB), cables **micro-USB** per als micro:bit.

> ✅ Amb aquesta dotació, **les 9 SA queden cobertes**. L'única compra pendent és el **pont H L298N** per a la SA4 (vegeu el final del document).

---

## Kit 1 — Arduino Starter Kit oficial («El Libro de Proyectos de Arduino»)

És la **base de totes les SA d'Arduino**: aporta la placa, la breadboard i els components passius i bàsics.

**Contingut:**
- **Arduino UNO** + **breadboard** (protoboard) + **cable USB** + jocs de cables (dupont i rígids) + connector de **pila 9V**.
- **Pantalla LCD 16×2.**
- **1 servomotor** petit + **1 motor DC.**
- **Brunzidor piezo.**
- **LED** de diversos colors (vermell, groc, verd) + LED IR + filtres de color RGB.
- **Potenciòmetres**, **polsadors**.
- **Sensor de temperatura** (tipus TMP36).
- Components passius: **resistències, condensadors, díodes, transistors**, tires de capçaleres (pin headers).
- Base de fusta i llibre de projectes.

**On s'utilitza:**
| SA | Ús del Kit 1 |
|---|---|
| SA1 | UNO + LED + breadboard (primer Blink, lectura de codi). |
| SA2 | LED, PWM, brunzidor (sortides digitals i analògiques). |
| SA3 | Polsador, potenciòmetre, sensor de temperatura (entrades). |
| SA4 | Servomotor + motor DC (base del moviment; el pont H és a comprar). |
| SA6 | UNO + actuadors (LED/motor) per a sistemes de control. |

---

## Kit 2 — Sensors bàsics (Keyestudio · peces de robot mòbil + sensors)

Aporta els **sensors de percepció** i les **peces mecàniques** de robòtica mòbil.

**Contingut:**
- **2× motoreductor** (motor DC amb reductora) + **2× roda** (KS9008).
- **2× micro servo 180°** (KS0194).
- **Sensor de llum TEMT6000** (KS0098).
- **Sensor de temperatura LM35** (KS0022).
- **Sensor PIR** de moviment (KS0052).
- **Pantalla OLED** (KS0271).
- **Sensor de col·lisió / crash** (KS0021).
- **Tira LED adreçable WS2812B** (NeoPixel, ~30 LED).
- **Sensor d'humitat del terra** (KS0049).
- **Sensor d'ultrasons HC-SR04.**
- **Seguidor de línia** (KS0050).
- Cables I2C, de sensor i dupont.

**On s'utilitza:**
| SA | Ús del Kit 2 |
|---|---|
| SA2 | Tira NeoPixel WS2812B (sortida de llum avançada). |
| SA3 | TEMT6000 (llum), LM35 (temperatura), HC-SR04 (ultrasons), PIR, humitat de terra. |
| SA4 | Micro servos i motoreductor (moviment); el motoreductor fa de motor discret per a la lliçó del pont H. |
| SA6 | LM35 + actuador per al **termòstat** (llaç tancat). |
| SA7 | Motoreductors, rodes, seguidor de línia i ultrasò → **repuesto/alternativa** a la Imagina 3dBot. |
| SA8 | Pantalla OLED per mostrar dades. |

> ℹ️ La SA7 s'imparteix amb la **Imagina 3dBot**; les peces de robot d'aquest kit queden com a **material de reserva** (avaries) o per a una construcció alternativa a SA9.

---

## Kit 3 — Sensors avançats (Keyestudio)

Aporta **comunicació, actuadors i sensors avançats** per a control, IoT i IA.

**Contingut:**
- **Mòdul relé** (KS0011).
- **Comunicació IR:** emissor (KS0027) + receptor (KS0026) + **comandament IR**.
- **Brunzidor** (KS0019).
- **LED RGB** (KS0312) + **LEDs individuals** (blanc, groc, verd, vermell).
- **Sensor de so / micròfon** (KS0035).
- **Polsador** (KS0025).
- **IMU MPU6050** (giroscopi + acceleròmetre, KS0179).
- **Sensor de temperatura i humitat DHT11.**
- **Sensor de pressió baromètrica BMP280.**
- **Sensor de CO₂ CCS811** (SEN-CCS811B).
- **Bomba d'aigua** (amb tub).
- Cables de sensor i dupont.

**On s'utilitza:**
| SA | Ús del Kit 3 |
|---|---|
| SA2 | Relé, LED RGB, LEDs, brunzidor (sortides i commutació). |
| SA3 | Sensor de so, polsador, DHT11 (entrades). |
| SA6 | Relé + DHT11 per a control (termòstat, commutació d'actuadors). |
| SA8 | **MPU6050** (gestos/IA), BMP280, CCS811, DHT11 (telemetria); comunicació **IR** com a enllaç de curt abast. |
| SA9 | **Bomba d'aigua + relé** per a projectes de reg/domòtica; qualsevol sensor per al repte lliure. |

---

## Altre maquinari (no inclòs als 3 kits)

| Element | Quant. | On s'utilitza |
|---|---|---|
| **micro:bit V2 + Micro:shield** | 1 per alumne | **SA5** (MicroPython) i **SA8** (telemetria per ràdio). |
| **Imagina 3dBot** (xassís + motors + driver) | dotació de centre | **SA7** (robòtica mòbil: seguir línia, evitar obstacles). |
| **Piles AA + carregador** | centre | Alimentació externa de motors (SA4) i robots. |
| **Piles 9V** | centre | Alimentar la UNO sense cable USB (opcional). |
| **Cables micro-USB** | centre | Programació dels micro:bit (SA5/SA8). |

---

## Matriu resum: SA → material principal

| SA | Material principal | Procedència | Estat |
|---|---|---|---|
| **SA1** Introducció | UNO + LED + breadboard | Kit 1 | ✅ |
| **SA2** Sortides/PWM | LED/RGB, PWM, brunzidor, relé, NeoPixel | Kit 1 + 2 + 3 | ✅ |
| **SA3** Sensors | polsador, potenciòmetre, LDR/TEMT6000, NTC/LM35, DHT11, ultrasò, so, PIR | Kit 1 + 2 + 3 | ✅ (ric) |
| **SA4** Moviment | servos, motor DC, **pont H L298N** | Kit 1 + 2 + *compra* | 🟡 falta L298N |
| **SA5** micro:bit | micro:bit + Micro:shield | micro:bit | ✅ |
| **SA6** Control | sensor temp + relé/actuador | Kit 1 + 2 + 3 | ✅ |
| **SA7** Robòtica mòbil | Imagina 3dBot + seguidor + ultrasò | Imagina 3dBot (+ Kit 2 reserva) | ✅ |
| **SA8** IoT/IA | micro:bit ràdio + MPU6050 + sensors + OLED | micro:bit + Kit 2 + 3 | ✅ |
| **SA9** Projecte final | tot el material | Tots | ✅ |

---

## Única compra pendent: pont H L298N (SA4)

| Element | Per a què | Acció | Quant. orient. | Cost |
|---|---|---|---|---|
| **Driver pont H L298N** (o L293D / motor shield) | SA4: ensenyar el **pont H** amb un motor discret a la breadboard (la Imagina 3dBot ja porta driver integrat) | **1r: revisar si n'hi ha al departament** (és habitual tenir-ne de cursos anteriors). Si no → **comprar.** | ~1 per parella + 2–3 de reserva | ~2–3 €/u |

> 💡 No és bloquejant: el L298N **no s'usa fins a la SA4**, així que es pot començar el curs sense tenir-lo resolt. És el component **més barat** de tota la programació.

---

*Document de constància de la dotació real. Complementa `09_Materials_recursos_per_unitat.md` (mapatge per unitat) i `09b_Guia_compra_pressupost.md` (compra des de zero). Llicència CC BY-SA 4.0.*
