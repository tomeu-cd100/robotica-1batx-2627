# SA3 · Checklist docent — Entrades i sensors: el robot percep

**8 h (4 sessions; la S4 acull la prova pràctica T1) · Arduino UNO + Keyestudio · Criteris CA1.1, CA2.1, CA2.2 · Rúbriques R1 (codi), R2 (circuit), R4 (quadern)**

> Eina d'acció d'una cara. Condensa la [`SA3_guia_docent.md`](SA3_guia_docent.md). Marca `[x]` a mesura que ho tinguis fet.

## 🧰 1. Logística prèvia (preparar abans de començar la SA)
- [ ] Material per parella: Arduino UNO + USB, protoboard, cables
- [ ] Sensors: polsador, potenciòmetre, LDR + 10 kΩ, NTC + 10 kΩ, **HC-SR04** (ultrasons), LED, piezo
- [ ] **Multímetres** per al racó de mesura del divisor de tensió
- [ ] Sketches provats: `01_polsador_debounce` · `02_potenciometre_ldr` · `03_ultrasons_funcio` · `04_alarma_aparcament`
- [ ] **Preparar la prova pràctica T1** ([`Avaluació/Prova_practica_T1.md`](../../Avaluació/Prova_practica_T1.md)) — es fa dins la S4
- [ ] Compartir rúbriques **R1 i R2** amb l'alumnat *abans* del producte

## ⏱️ 2. Moments (punts de control per sessió)

**Sessió 1 — Entrades digitals i monitor sèrie**
- [ ] Referent (1') Marie Van Brittan Brown · `01_polsador_debounce` (`INPUT_PULLUP`, *debounce*, Serial Monitor)
- [ ] Muntatge polsador pin 2 · comptar premudes al monitor
- ⚠️ *Clau:* amb `INPUT_PULLUP` → HIGH en repòs, LOW en prémer (lògica invertida)

**Sessió 2 — Entrades analògiques**
- [ ] `02_potenciometre_ldr` (`analogRead` 0–1023, `map()`, divisor de tensió LDR)
- [ ] **Racó de mesura:** comparar V mesurada amb `lectura/1023·5V`; tapar LDR i veure baixar les dues
- ⚠️ *Error:* divisor mal connectat (lectures 0 o 1023)

**Sessió 3 — Sensor de distància i funcions**
- [ ] `03_ultrasons_funcio`: escriure la funció `mesuraDistancia()` que **retorna** un valor · Serial Plotter
- [ ] **Mini-check individual** a l'inici (10', no qualifica): `if/else` sobre lectura analògica
- ⚠️ *Error:* TRIG/ECHO intercanviats · vigilar `pulseIn` = 0 quan no hi ha eco

**Sessió 4 — Producte + PROVA T1**
- [ ] `04_alarma_aparcament`: sensor→actuador amb avís proporcional a la distància
- [ ] El producte/repte **fa de prova pràctica T1** (individual)
- [ ] Documentació + defensa + autoavaluació

## 📊 3. Avaluació i evidències (a recollir)
- [ ] **Producte** (alarma/llum automàtic) + defensa → **R1** i **R2**, Projectes 45 %
- [ ] **Prova T1** (dins S4) → R1, R2, R4, Proves 20 %
- [ ] **Quadern tècnic** (pseudocodi, taula de lectures, codi de la funció) → **R4**, Quadern 25 %
- [ ] **Observació + depuració sèrie** (monitor, divisor de tensió) → R2
- [ ] Coavaluació + **exit tickets** + registre **0–10**

## 🪜 4. Atenció a la diversitat (previst per aquesta SA)
- [ ] **Bastida:** començar pel **polsador** (digital) abans de l'analògic · donar `mesuraDistancia()` ja escrita per llegir-la · parella heterogènia
- [ ] **+ Ampliació:** mitjana de 3 mesures · detectar acostament/allunyament · [reptes ⭐ SA3](../../Reptes/Reptes_SA3.md)
- [ ] **Representació múltiple:** esquema · **Serial Plotter** · Wokwi · codi comentat
- [ ] 🤖 **Llavor IA (2–3'):** un llindar (`if distancia < 20`) és una **regla/classificador** → precursor de l'aprenentatge automàtic (SA8)
- [ ] **Rescat:** [targetes de rescat](../00_General/00_Targetes_rescat.md) 🟢🟡🔴 a qui s'encalli
