# SA2 · Checklist docent — Sortides digitals i PWM

**8 h (4 sessions) · Arduino UNO + kit Keyestudio/BQ · Criteris CA1.1, CA2.1, CA2.2 · Rúbriques R1 (codi), R2 (circuit), R4 (quadern)**

> Eina d'acció d'una cara. Condensa la [`SA2_guia_docent.md`](SA2_guia_docent.md). Marca `[x]` a mesura que ho tinguis fet.

## 🧰 1. Logística prèvia (preparar abans de començar la SA)
- [ ] Material per parella: Arduino UNO + USB, protoboard, cables dupont
- [ ] Components: LED (vermell/groc/verd), 1 LED RGB (càtode comú), resistències **220 Ω**, brunzidor piezo, mòdul relé
- [ ] **2–3 multímetres** per al racó de mesura (o el teu per a demo projectada)
- [ ] Sketches provats: `01_led_basic` · `02_semafor` · `03_fade_pwm` · `04_rgb` · `05_panell_senyalitzacio`
- [ ] Simulació **Wokwi** del semàfor a punt (representació múltiple)
- [ ] Compartir rúbriques **R1 i R2** amb l'alumnat *abans* del producte

## ⏱️ 2. Moments (punts de control per sessió)

**Sessió 1 — Variables i la primera sortida**
- [ ] Referent (1') Limor Fried · `01_led_basic` → concepte de **constant** (`const int`)
- [ ] Muntatge LED pin 8 amb **resistència 220 Ω** i polaritat (pota llarga = +)
- [ ] **Racó de mesura (multímetre):** V al LED (~2 V) + V a la resistència (~3 V) ≈ 5 V (evidència CA2.2/R2)
- ⚠️ *Error:* oblidar `pinMode(LED, OUTPUT)`

**Sessió 2 — Estructures de control: el semàfor**
- [ ] `02_semafor` → `for`, `if`, ordre de fases · introduir `millis()` vs `delay()` (concepte)
- [ ] Repte fase nocturna (groc intermitent)
- ⚠️ *Error:* esperar que els LED canviïn alhora (`delay()` bloqueja)

**Sessió 3 — PWM: intensitat i color**
- [ ] `03_fade_pwm` (`analogWrite` 0–255, `map()`) + `04_rgb` (barreja RGB)
- ⚠️ *Mantra:* PWM només als pins `~` (3,5,6,9,10,11) · *Error:* barrejar 0–1023 (lectura) amb 0–255 (PWM)

**Sessió 4 — Producte: panell de senyalització**
- [ ] `05_panell_senyalitzacio`: integrar RGB (estat) + piezo (avís) + relé (càrrega)
- [ ] **Mini-check individual** a l'inici (10', no qualifica): escriure un Blink de memòria
- [ ] Documentació + mini-defensa d'1' + autoavaluació

## 📊 3. Avaluació i evidències (a recollir)
- [ ] **Producte** (panell/semàfor) + defensa → **R1** (codi) i **R2** (circuit), Projectes 45 %
- [ ] **Quadern tècnic** (esquema, codi comentat, mesures) → **R4**, Quadern tècnic i pràctiques 25 %
- [ ] **Observació de muntatge** (resistència limitadora, polaritat, seguretat) → R2
- [ ] Coavaluació "2 estrelles i un desig" + **exit tickets** + registre **0–10**

## 🪜 4. Atenció a la diversitat (previst per aquesta SA)
- [ ] **Bastida:** començar amb **1 LED** abans del semàfor de 3 · seqüència de fases en comentaris · parella heterogènia
- [ ] **+ Ampliació:** fase nocturna · semàfor de vianants · arc de Sant Martí RGB · [reptes ⭐ SA2](../../Reptes/Reptes_SA2.md)
- [ ] ♿ **Accessibilitat (daltonisme):** afegir pista no cromàtica (posició fixa, etiqueta o patró de parpelleig per estat)
- [ ] **Rescat:** [targetes de rescat](../00_General/00_Targetes_rescat.md) 🟢🟡🔴 a qui s'encalli
