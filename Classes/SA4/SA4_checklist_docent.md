# SA4 · Checklist docent — Moviment: servos, motors i ponts H

**8 h (4 sessions) · Arduino UNO + servo SG90 + motor DC + L298N · Criteris CA1.1, CA2.1, CA3.1 · Rúbriques R1 (codi), R2 (circuit), R3 (control, parcial), R4 (quadern)**

> Eina d'acció d'una cara. Condensa la [`SA4_guia_docent.md`](SA4_guia_docent.md). Marca `[x]` a mesura que ho tinguis fet.

## 🧰 1. Logística prèvia (preparar abans de començar la SA)
- [ ] Material per parella: Arduino UNO + USB, protoboard, cables
- [ ] Actuadors: servo **SG90**, motor DC, driver **L298N**, potenciòmetre, ultrasons
- [ ] **Alimentació externa** (portapiles 4×AA o font) per als motors — imprescindible
- [ ] Sketches provats: `01_servo_potenciometre` · `02_motor_pont_h` · `03_sensor_velocitat` · `04_barrera_automatica`
- [ ] Simulació **Wokwi** (servo) i, si pots, vídeo del moviment de referència
- [ ] Compartir rúbriques **R1, R2 i R3** amb l'alumnat *abans* del producte

## ⏱️ 2. Moments (punts de control per sessió)

**Sessió 1 — El servomotor**
- [ ] Referent (1') Edith Clarke · `01_servo_potenciometre` (`Servo.h`, `attach()`, `write(0–180°)`)
- [ ] Control del servo amb potenciòmetre (`map` 0–1023 → 0–180)
- ⚠️ *Clau:* si mous diversos servos → **alimentació externa** (no del pin 5V) · *Error:* servo vibra per alimentació insuficient

**Sessió 2 — Motor DC i pont H**
- [ ] `02_motor_pont_h`: taula IN1/IN2 (direcció) + ENA (velocitat PWM)
- [ ] Funcions `endavant(vel)`, `enrere(vel)`, `atura()`
- ⚠️ *Mantra:* **MASSA COMUNA**, mai el motor des del 5V · *Error:* Arduino es reinicia pel pic de corrent

**Sessió 3 — Del sensor al moviment**
- [ ] `03_sensor_velocitat`: ultrasons → `map()` → velocitat (percepció→acció)
- [ ] Aturada per llindar de seguretat
- ⚠️ *Vigilar:* què passa a la distància mínima de seguretat

**Sessió 4 — Producte: barrera automàtica**
- [ ] `04_barrera_automatica`: servo obre amb detecció + tanca passat un temps + LED indicador
- [ ] **Mini-check individual** a l'inici (10', no qualifica): 3 línies del servo a 90° + per què alimentació externa
- [ ] Documentació + mini-defensa + autoavaluació

## 📊 3. Avaluació i evidències (a recollir)
- [ ] **Producte** (barrera/braç/ventilador) + defensa → **R3** (parcial) i **R1**, Projectes 45 %
- [ ] **Quadern tècnic** (esquema pont H, taula distància→velocitat) → **R4**, Quadern 25 %
- [ ] **Observació de muntatge segur** (massa comuna, alimentació externa, no motors des de l'Arduino) → R2
- [ ] Coavaluació + **exit tickets** + registre **0–10**

## 🪜 4. Atenció a la diversitat (previst per aquesta SA)
- [ ] **Bastida:** servo a **angles fixos** abans del control amb potenciòmetre · taula de lògica del pont H ja resolta · parella heterogènia
- [ ] **+ Ampliació:** dos servos coordinats · rampa d'acceleració · invertir sentit per distància · [reptes ⭐ SA4](../../Reptes/Reptes_SA4.md)
- [ ] **Representació múltiple:** esquema pont H · Wokwi · vídeo del moviment · codi comentat
- [ ] **Rescat:** [targetes de rescat](../00_General/00_Targetes_rescat.md) 🟢🟡🔴 a qui s'encalli
