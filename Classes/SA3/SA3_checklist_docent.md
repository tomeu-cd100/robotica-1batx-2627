# SA3 · Checklist docent — Entrades i sensors: el robot percep

**8 h (4 sessions; la S4 és, sencera, la prova pràctica T1 — el producte es tanca a la S3) · Arduino UNO + Keyestudio · Criteris CA1.1, CA2.1, CA2.2 · Rúbriques R1 (codi), R2 (circuit), R4 (quadern)**

> Eina d'acció d'una cara. Condensa la [`SA3_guia_docent.md`](SA3_guia_docent.md). Marca `[x]` a mesura que ho tinguis fet. **Quan s'usa:** imprimeix-lo en **preparar la SA** (§1) i tingues-lo **a taula a cada sessió** (§2–§4).

## 🧰 1. Logística prèvia (preparar abans de començar la SA)
- [ ] Material per parella: Arduino UNO + USB, protoboard, cables
- [ ] Sensors: polsador, potenciòmetre, LDR + 10 kΩ, NTC + 10 kΩ, **HC-SR04** (ultrasons), LED, piezo
- [ ] **Multímetres** per al racó de mesura del divisor de tensió
- [ ] Sketches provats: `01_polsador_debounce` · `02_potenciometre_ldr` · `03_ultrasons_funcio` · `04_alarma_aparcament`
- [ ] **Preparar la prova pràctica T1** ([`Avaluació/Prova_practica_T1.md`](../../Avaluació/Prova_practica_T1.md)) — ocupa la S4 sencera (individual; material per a cada alumne/a)
- [ ] Compartir rúbriques **R1 i R2** amb l'alumnat *abans* del producte

## ⏱️ 2. Moments (punts de control per sessió)

**Sessió 1 — Entrades digitals i monitor sèrie**
- [ ] Referent (1') Marie Van Brittan Brown · `01_polsador_debounce` (`INPUT_PULLUP`, *debounce*, Serial Monitor)
- [ ] ✍️ **Kata** `01_polsador_debounce` (10', abans de repartir el sketch) → [SA3_katas.md](SA3_katas.md)
- [ ] Muntatge polsador pin 2 · comptar premudes al monitor
- ⚠️ *Clau:* amb `INPUT_PULLUP` → HIGH en repòs, LOW en prémer (lògica invertida)

**Sessió 2 — Entrades analògiques**
- [ ] ✍️ **Kata** `02_potenciometre_ldr` (10', abans de repartir el sketch) → [SA3_katas.md](SA3_katas.md)
- [ ] `02_potenciometre_ldr` (`analogRead` 0–1023, `map()`, divisor de tensió LDR)
- [ ] **Racó de mesura:** comparar V mesurada amb `lectura/1023·5V`; tapar LDR i veure baixar les dues
- ⚠️ *Error:* divisor mal connectat (lectures 0 o 1023)

**Sessió 3 — Funcions + PRODUCTE (alarma/aparcament)**
- [ ] **Mini-check individual** a l'inici (10', no qualifica): `if/else` sobre lectura analògica (substitueix la graella d'activació i el kata del dia)
- [ ] `03_ultrasons_funcio`: escriure la funció `mesuraDistancia()` que **retorna** un valor · Serial Plotter
- [ ] Repte-producte `04_alarma_aparcament` (pseudocodi primer) + **defensa d'1' a peu de taula** mentre treballen
- ⚠️ *Error:* TRIG/ECHO intercanviats · vigilar `pulseIn` = 0 quan no hi ha eco

**Sessió 4 — PROVA T1 (sessió sencera, individual)**
- [ ] Instruccions (5-10') · prova (~100') · recollida (10')
- [ ] Material consultable: quadern propi i esquemes · el docent només resol incidències de material
- [ ] Recordar el **pla de millora personal** (3 línies al retorn; es reprèn a l'inici de SA4)

## 📊 3. Avaluació i evidències (a recollir)
- [ ] **Producte** (alarma/llum automàtic, S3) + defensa → **R1** i **R2**, Projectes 45 %
- [ ] **Prova T1** (S4 sencera) → R1, R2, R4, Proves 20 %
- [ ] **Quadern tècnic** (pseudocodi, taula de lectures, codi de la funció) → **R4**, Quadern tècnic i pràctiques 25 %
- [ ] **Observació + depuració sèrie** (monitor, divisor de tensió) → R2
- [ ] Coavaluació + **exit tickets** + registre **0–10**

## 🪜 4. Atenció a la diversitat (previst per aquesta SA)
- [ ] **Bastida:** començar pel **polsador** (digital) abans de l'analògic · donar `mesuraDistancia()` ja escrita per llegir-la · parella heterogènia
- [ ] **+ Ampliació:** mitjana de 3 mesures · detectar acostament/allunyament · [reptes ⭐ SA3](../../Reptes/Reptes_SA3.md)
- [ ] **Representació múltiple:** esquema · **Serial Plotter** · Wokwi · codi comentat
- [ ] 🤖 **Llavor IA (2–3'):** un llindar (`if distancia < 20`) és una **regla/classificador** → precursor de l'aprenentatge automàtic (SA8)
- [ ] **Rescat:** [targetes de rescat](../00_General/00_Targetes_rescat.md) 🟢🟡🔴 a qui s'encalli
