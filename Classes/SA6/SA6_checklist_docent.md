# SA6 · Checklist docent — Sistemes de control: llaç obert/tancat i màquines d'estats

**8 h (4 sessions; la S4 és, sencera, la prova pràctica T2 — el producte es tanca a la S3) · El braç MeArm + col·lisió, ultrasons, polsadors i pont · Criteris CA1.1, CA3.1 · Rúbriques R1 (codi), R3 (control), R4 (documentació)**

> Eina d'acció d'una cara. Condensa la [`SA6_guia_docent.md`](SA6_guia_docent.md). Marca `[x]` a mesura que ho tinguis fet.
 **Quan s'usa:** imprimeix-lo en **preparar la SA** (§1) i tingues-lo **a taula a cada sessió** (§2–§4).

## 🧰 1. Logística prèvia (preparar abans de començar la SA)
- [ ] Material per alumne/a: Arduino UNO + USB, protoboard, cables
- [ ] Components: sensor de col·lisió KS0021, ultrasons + suport, 2 polsadors; el braç cablejat (SA4) i el pont (SA5)
- [ ] Sketches provats: `01_llac_obert_vs_tancat` · `02_pinca_histeresi` · `03_maquina_estats` · `04_control_proporcional` · i el producte de referència `T2_brac_estats` ([dossier](../00_General/00_Projecte_T2_Brac.md))
- [ ] **Preparar la prova pràctica T2** ([`Avaluació/Prova_practica_T2.md`](../../Avaluació/Prova_practica_T2.md)) — ocupa la S4 sencera (individual; el braç o un servo solt + ultrasons, i 2 micro:bit per alumne/a)
- [ ] Repassar el patró `millis()` no bloquejant (bastida SA4 `05_dos_servos_millis`) per si cal escalfament
- [ ] Compartir rúbriques **R1, R3 i R4** amb l'alumnat *abans* del producte

## ⏱️ 2. Moments (punts de control per sessió)

**Sessió 1 — Llaç obert, llaç tancat i homing**
- [ ] **«C++ flash» (5', dins l'activació):** traduir 2-3 línies Python→C++ en veu alta (targeta [`00_Repas_expres_Cpp.md`](../00_General/00_Repas_expres_Cpp.md), repartida com a deures a la SA5 S3)
- [ ] Referent (1') Irmgard Flügge-Lotz · conceptes: consigna, realimentació, error, actuador
- [ ] ✍️ **Kata** `01_llac_obert_vs_tancat` (10', abans de repartir el sketch) → [SA6_katas.md](SA6_katas.md)
- [ ] 🔧 **Taller (20'):** sensor de col·lisió a la base (D2)
- [ ] `01_llac_obert_vs_tancat` (obert vs homing) + **diagrama de blocs** del braç
- ⚠️ *Error:* confondre realimentació amb la sortida

**Sessió 2 — Histèresi: la pinça automàtica**
- [ ] ✍️ **Kata** `02_pinca_histeresi` (10', abans de repartir el sketch) → [SA6_katas.md](SA6_katas.md)
- [ ] `02_pinca_histeresi`: dos llindars (tanca/obre) + estat per evitar el "clic-clic"
- [ ] 🔧 **Taller (20'):** angles límit definitius + cablatge endreçat i etiquetat (R1 del braç)
- ⚠️ *Error:* condicions sense l'estat → torna el clic-clic

**Sessió 3 — Màquina d'estats del braç + tancament del producte**
- [ ] **Mini-check individual** a l'inici (10', no qualifica): dos llindars d'histèresi (substitueix la graella d'activació i el kata del dia)
- [ ] `03_maquina_estats`: `enum` + `switch` del braç (repòs, manual, replay, emergència), l'emergència abans del `switch` · producte amb el comandament per ràdio (`A`, `R`, `G` pel pont) · repartir l'**esquelet «Si t'encalles»** (`// TODO`, a la [pàgina de la pràctica](codi/03_maquina_estats/EXPLICACIO.md)) a qui s'encalli
- [ ] **Defenses individuals de 2–3' a peu de taula** durant el repte (5 alumnes → ~15' en total; decisió tècnica justificada) + documentació + autoavaluació
- ⚠️ *Error:* un `case` sense transició → la màquina es "penja"

**Sessió 4 — PROVA T2 (sessió sencera, individual)**
- [ ] Instruccions (5-10') · prova Part A + Part B (**~80-85' reals**; el nucli, la Part A, està calibrat per a ~60') · recollida (10')
- [ ] Material consultable: quadern propi i esquemes · només incidències de material
- [ ] Recordar el **pla de millora personal** (es reprèn a l'inici de SA7)
- *(+Ampliació fora de sessió: `04_control_proporcional` — error, `K`, salt vs moviment proporcional de la base)*

## 📊 3. Avaluació i evidències (a recollir)
- [ ] **Producte** (el braç amb màquina d'estats, S3) + defensa 2–3' → **R1, R3, R4** + rúbrica del braç, Projectes 45 %
- [ ] **Prova T2** (S4 sencera) → R1, R3, R4, Proves 20 %
- [ ] **Quadern tècnic** (diagrama de blocs + diagrama d'estats + anàlisi de la resposta) → **R4**, Quadern tècnic i pràctiques 25 %
- [ ] **Observació + Serial Plotter** (histèresi de la pinça, ajust de `K`) → R3
- [ ] Revisió creuada de codi (una millora concreta i un dubte) → **R5** + **exit tickets** + registre **0–10**

## 🪜 4. Atenció a la diversitat (previst per aquesta SA)
- [ ] **Bastida:** diagrames de blocs i d'estats parcialment fets · pinça amb un llindar abans de dos · esquelet «Si t'encalles» de la [pàgina de la màquina d'estats](codi/03_maquina_estats/EXPLICACIO.md) · agrupament puntual (qui escriu / qui verifica) si cal
- [ ] **+ Ampliació:** afegir estats al braç · moviment proporcional · ajustar `K` · [reptes ⭐ SA6](../../Reptes/Reptes_SA6.md)
- [ ] **Representació múltiple:** diagrames de blocs i d'estats · **Serial Plotter** · Wokwi
- [ ] ♿ **Accessibilitat (daltonisme):** indicador verd/vermell amb pista no cromàtica (posició, etiqueta ON/OFF, parpelleig)
- [ ] 🤖 **Llavor IA (2–3', saber literal del currículum):** control clàssic (regles/constants fixades) vs **IA aplicada al control** (aprèn de dades) → SA8
- [ ] **Rescat:** [targetes de rescat](../00_General/00_Targetes_rescat.md) 🟢🟡🔴 a qui s'encalli
