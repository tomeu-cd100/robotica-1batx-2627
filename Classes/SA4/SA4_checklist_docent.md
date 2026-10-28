# SA4 · Checklist docent — Moviment: servos, motors i ponts H

**8 h (4 sessions) · Arduino UNO + MeArm (4 servos) + motor DC + L298N · Criteris CA1.1, CA2.1, CA3.1 · Rúbriques R1 (codi), R2 (circuit), R3 (control, parcial), R4 (quadern)**

> Eina d'acció d'una cara. Condensa la [`SA4_guia_docent.md`](SA4_guia_docent.md). Marca `[x]` a mesura que ho tinguis fet.
 **Quan s'usa:** imprimeix-lo en **preparar la SA** (§1) i tingues-lo **a taula a cada sessió** (§2–§4).

## 🧰 1. Logística prèvia (preparar abans de començar la SA)
- [ ] Material per alumne/a: Arduino UNO + USB, protoboard, cables
- [ ] **Caixa del MeArm per alumne/a** amb les peces tallades, els cargols i els 4 servos (el 4t, MG90S) → [dossier](../00_General/00_Projecte_T2_Brac.md)
- [ ] Actuadors: motor DC, driver **L298N**, 4 potenciòmetres, ultrasons + suport (`suport_hcsr04.scad`)
- [ ] **Alimentació externa** (portapiles 4×AA) per als servos i el motor — imprescindible
- [ ] Sketches provats: `01_servo_potenciometre` · `02_motor_pont_h` · `03_ultrasons_brac` · `04_brac_potenciometres` · `05_dos_servos_millis` (bastida opcional S3)
- [ ] Claus Allen M3 i tornavisos per als torns de taller
- [ ] Simulació **Wokwi** (servo) i, si pots, vídeo del moviment de referència
- [ ] Compartir rúbriques **R1, R2 i R3** amb l'alumnat *abans* del producte

## ⏱️ 2. Moments (punts de control per sessió)

**Sessió 1 — El servomotor**
- [ ] Referent (1') Edith Clarke · `01_servo_potenciometre` (`Servo.h`, `attach()`, `write(0–180°)`)
- [ ] ✍️ **Kata** `01_servo_potenciometre` (10', abans de repartir el sketch) → [SA4_katas.md](SA4_katas.md)
- [ ] Control del servo de la base amb potenciòmetre (`map` 0–1023 → 0–180)
- [ ] 🔧 **Taller (35'):** pas 0 (4 servos a 90°, etiquetats) + blocs A-B del MeArm
- ⚠️ *Clau:* si mous diversos servos → **alimentació externa** (no del pin 5V) · *Error:* servo vibra per alimentació insuficient

**Sessió 2 — Motor DC i pont H**
- [ ] ✍️ **Kata** `02_motor_pont_h` (10', abans de repartir el sketch) → [SA4_katas.md](SA4_katas.md)
- [ ] `02_motor_pont_h`: taula IN1/IN2 (direcció) + ENA (velocitat PWM)
- [ ] Funcions `endavant(vel)`, `enrere(vel)`, `atura()` (pràctica curta, ~40', fora del braç)
- [ ] 🔧 **Taller (40'):** blocs C-D del MeArm (pinça + calibratge amb l'escombrada de la S1)
- ⚠️ *Mantra:* **MASSA COMUNA**, mai el motor des del 5V · *Error:* Arduino es reinicia pel pic de corrent

**Sessió 3 — Del sensor al braç**
- [ ] ✍️ **Kata** `03_ultrasons_brac` (10', abans de repartir el sketch) → [SA4_katas.md](SA4_katas.md)
- [ ] `03_ultrasons_brac`: ultrasons (D7/D8) → la base gira i la pinça s'obre (percepció→acció)
- [ ] 🔧 **Taller (45'):** bloc E del MeArm (pas 15 en parella)
- ⚠️ *Vigilar:* el «ball» del braç amb l'objecte just al llindar: és la llavor de la histèresi de la SA6

**Sessió 4 — Producte: el braç amb potenciòmetres**
- [ ] **Mini-check individual** a l'inici (10', no qualifica): 3 línies del servo a 90° + per què alimentació externa (substitueix la graella d'activació i el kata del dia)
- [ ] `04_brac_potenciometres`: 4 servos amb rang segur i zona morta; angles límit anotats
- [ ] 🔧 Cablatge definitiu (4 servos a les piles, 4 potenciòmetres) i prova d'agafar un objecte
- [ ] Documentació + mini-defensa + autoavaluació

## 📊 3. Avaluació i evidències (a recollir)
- [ ] **Producte** (el braç amb potenciòmetres) + defensa → **R3** (parcial) i **R1**, Projectes 45 %
- [ ] **Quadern tècnic** (esquema pont H, taula distància→braç, angles límit) → **R4**, Quadern tècnic i pràctiques 25 %
- [ ] **Observació de muntatge segur** (massa comuna, servos a les piles, no motors des de l'Arduino) → R2
- [ ] Revisió creuada de codi (una millora concreta i un dubte) → **R5** + **exit tickets** + registre **0–10**

## 🪜 4. Atenció a la diversitat (previst per aquesta SA)
- [ ] **Bastida:** servo a **angles fixos** abans del control amb potenciòmetre · taula de lògica del pont H ja resolta · agrupament puntual (qui escriu / qui verifica) si cal
- [ ] **+ Ampliació:** dos servos coordinats · pinça proporcional a la distància · `05_dos_servos_millis` · [reptes ⭐ SA4](../../Reptes/Reptes_SA4.md)
- [ ] **Representació múltiple:** esquemes SVG del braç · Wokwi (servo) · guia de muntatge amb les fotos oficials · codi comentat
- [ ] **Rescat:** [targetes de rescat](../00_General/00_Targetes_rescat.md) 🟢🟡🔴 a qui s'encalli
