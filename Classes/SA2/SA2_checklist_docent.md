# SA2 · Checklist docent — Sortides digitals i PWM

**6 h (3 sessions) · Arduino UNO + kit Keyestudio/BQ · Criteris CA1.1, CA2.1, CA2.2 · Rúbriques R1 (codi), R2 (circuit), R4 (quadern)**

> Eina d'acció d'una cara. Condensa la [`SA2_guia_docent.md`](SA2_guia_docent.md). Marca `[x]` a mesura que ho tinguis fet. **Quan s'usa:** imprimeix-lo en **preparar la SA** (§1) i tingues-lo **a taula a cada sessió** (§2–§4).

## 🧰 1. Logística prèvia (preparar abans de començar la SA)
- [ ] Material per alumne/a: Arduino UNO + USB, protoboard, cables dupont
- [ ] Components: LED (vermell/groc/verd), 1 LED RGB (càtode comú), resistències **220 Ω**, brunzidor piezo, mòdul relé
- [ ] **2–3 multímetres** per al racó de mesura (o el teu per a demo projectada)
- [ ] Sketches provats: `01_led_basic` · `02_semafor` (+ variant `02b_semafor_switch`) · `03_fade_pwm` · `04_rgb` · `05_panell_senyalitzacio`
- [ ] Simulació **Wokwi** del semàfor a punt (representació múltiple)
- [ ] Compartir rúbriques **R1 i R2** amb l'alumnat *abans* del producte

## ⏱️ 2. Moments (punts de control per sessió)

**Abans de la SA2 · sessió de marge** (no és de la SA2)
- [ ] 📝 **Prova SA1** (primers 50', en paper, models A/B alternats per taules) → [Prova_SA1.md](../../Avaluació/Prova_SA1.md) · resta: posada al dia de la SA1 i revisió del kit de la SA2

**Sessió 1 — Estructures de control: el semàfor**
- [ ] Referent (1') Limor Fried · **d'on surt el 220 Ω** (llei d'Ohm, 5') · polaritat (pota llarga = +)
- [ ] `02_semafor` → `if`, constants de temps, ordre de fases (el `for` és a la S2) · variant `switch` · introduir `millis()` vs `delay()` (concepte)
- [ ] **Racó de mesura (multímetre):** V al LED (~2 V) + V a la resistència (~3 V) ≈ 5 V (evidència CA2.2/R2)
- [ ] Repte fase nocturna (groc intermitent) · qui s'encalla: bastida `01_led_basic` (un sol LED)
- ⚠️ *Error:* esperar que els LED canviïn alhora (`delay()` bloqueja) · `case` sense `break`

**Sessió 2 — PWM: intensitat i color**
- [ ] `03_fade_pwm` (`analogWrite` 0–255, `map()`) + `04_rgb` (barreja RGB)
- ⚠️ *Mantra:* PWM només als pins `~` (3,5,6,9,10,11) · *Error:* barrejar 0–1023 (lectura) amb 0–255 (PWM)

**Sessió 3 — Producte: panell de senyalització**
- [ ] **Mini-check individual** a l'inici (10', no qualifica): escriure un Blink de memòria (substitueix la graella d'activació)
- [ ] `05_panell_senyalitzacio`: integrar RGB (estat) + piezo (avís) + relé (càrrega)
- [ ] Documentació + mini-defensa individual d'1' (~5-7' per a tot el grup) + autoavaluació + **enviar el formulari**

## 📊 3. Avaluació i evidències (a recollir)
- [ ] **Producte** (panell/semàfor) + defensa → **R1** (codi) i **R2** (circuit), Projectes 45 %
- [ ] **Quadern tècnic** (esquema, codi comentat, mesures) → **R4**, Quadern tècnic i pràctiques 25 %
- [ ] **Observació de muntatge** (resistència limitadora, polaritat, seguretat) → R2
- [ ] Revisió creuada de codi "2 estrelles i un desig" (una millora concreta i un dubte) → **R5** + **exit tickets** + registre **0–10**

## 🪜 4. Atenció a la diversitat (previst per aquesta SA)
- [ ] **Bastida:** començar amb **1 LED** abans del semàfor de 3 · seqüència de fases en comentaris · ajuda puntual d'un company
- [ ] **+ Ampliació:** fase nocturna · semàfor de vianants · arc de Sant Martí RGB · [reptes ⭐ SA2](../../Reptes/Reptes_SA2.md)
- [ ] ♿ **Accessibilitat (daltonisme):** afegir pista no cromàtica (posició fixa, etiqueta o patró de parpelleig per estat)
- [ ] **Rescat:** [targetes de rescat](../00_General/00_Targetes_rescat.md) 🟢🟡🔴 a qui s'encalli
