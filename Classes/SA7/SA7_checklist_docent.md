# SA7 · Checklist docent — Robòtica mòbil: cinemàtica i trajectòries

**8 h (4 sessions) · Imagina 3dBot (Arduino) + sensors IR i ultrasons · Criteris CA1.1, CA3.1, CA4.1 · Rúbriques R1 (codi), R3 (robot/control), R4 (documentació)**

> Eina d'acció d'una cara. Condensa la [`SA7_guia_docent.md`](SA7_guia_docent.md). Marca `[x]` a mesura que ho tinguis fet. **Quan s'usa:** imprimeix-lo en **preparar la SA** (§1) i tingues-lo **a taula a cada sessió** (§2–§4).

## 🧰 1. Logística prèvia (preparar abans de començar la SA)
- [ ] Imagina 3dBot muntada per equip (motors, rodes, **bateria carregada**), cable de programació
- [ ] Sensors de línia IR + ultrasons segons dotació
- [ ] ⚙️ **Comprovar el manual de pins de la placa** (bloc `// === PINS (AJUSTAR) ===` de cada `.ino`) — depèn del model
- [ ] **Circuit de proves a terra:** pista amb línia negra + recorregut amb obstacles
- [ ] Sketches provats: `01_moviment_basic` · `02_trajectoria_quadrat` · `03_evita_obstacles` · `04_seguidor_linia`
- [ ] Vídeos de suport IA a punt ([`SA7_recursos_video_IA.md`](SA7_recursos_video_IA.md), descàrrega offline)
- [ ] Compartir rúbriques **R1, R3 i R4** amb l'alumnat *abans* del producte

## ⏱️ 2. Moments (punts de control per sessió)

**Sessió 1 — Moviment i cinemàtica diferencial**
- [ ] Referent (1') Ayanna Howard · **AVÍS: ajustar els pins del model abans de pujar res**
- [ ] `01_moviment_basic`: funcions de moviment; girar = rodes a velocitats/sentits diferents
- ⚠️ *Error:* no va recte per motors desiguals (cal calibrar)

**Sessió 2 — Trajectòries programades**
- [ ] `02_trajectoria_quadrat`: seqüència + temps; **calibrar el gir de 90°**
- ⚠️ *Clau:* el control per temps és imprecís (depèn de bateria/superfície) → connexió realimentació SA6

**Sessió 3 — Evitar obstacles (comportament reactiu)**
- [ ] `03_evita_obstacles`: percepció→decisió→acció amb ultrasons (llaç tancat, SA6)
- ⚠️ *Error:* estratègia massa simple → es queda encallat

**Sessió 4 — Seguidor de línia + repte de pista**
- [ ] `04_seguidor_linia`: calibrar llindar IR; lògica de correcció
- [ ] **Repte de pista:** completar el recorregut, **mesurar temps** i **iterar**
- [ ] **Mini-check individual** a l'inici (10', no qualifica): `loop()` reactiu amb funcions donades
- [ ] Autoavaluació

## 📊 3. Avaluació i evidències (a recollir)
- [ ] **Demostració a la pista** (comportament autònom) → **R3**, Projectes 45 %
- [ ] **Registre d'iteracions** (temps de volta per intent, millores) → **R3, R4**
- [ ] **Quadern tècnic** (calibratges, decisions, errors) → **R4**, Quadern tècnic i pràctiques 25 %
- [ ] **Observació del procés** (treball d'equip, ús segur del robot) → R4
- [ ] Coavaluació entre equips + **exit tickets** + registre **0–10**

## 🪜 4. Atenció a la diversitat (previst per aquesta SA)
- [ ] **Bastida:** provar **una funció de moviment cada cop** · donar el bloc de pins ja ajustat · rols clars
- [ ] **+ Ampliació:** gir proporcional a la proximitat · correcció suau del seguidor · tornar al punt de sortida · [reptes ⭐ SA7](../../Reptes/Reptes_SA7.md)
- [ ] ✏️ **Retirada de bastida — repte "a full en blanc":** un repte amb l'editor buit (només pseudocodi + full-xuleta de crides). No deixar obrir el sketch de referència fins tenir el pseudocodi
- [ ] 🤖 **Llavor IA (2–3'):** comportament **programat** (regles) vs **après** (visió per computador, milions d'exemples) → SA8
- [ ] **Rescat:** [targetes de rescat](../00_General/00_Targetes_rescat.md) 🟢🟡🔴 a qui s'encalli
