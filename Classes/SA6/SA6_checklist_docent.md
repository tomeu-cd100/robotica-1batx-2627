# SA6 · Checklist docent — Sistemes de control: llaç obert/tancat i màquines d'estats

**8 h (4 sessions; la S4 és, sencera, la prova pràctica T2 — el producte es tanca a la S3) · Arduino UNO + NTC/LDR/actuador · Criteris CA1.1, CA3.1 · Rúbriques R1 (codi), R3 (control), R4 (documentació)**

> Eina d'acció d'una cara. Condensa la [`SA6_guia_docent.md`](SA6_guia_docent.md). Marca `[x]` a mesura que ho tinguis fet.

## 🧰 1. Logística prèvia (preparar abans de començar la SA)
- [ ] Material per parella: Arduino UNO + USB, protoboard, cables
- [ ] Components: NTC + 10 kΩ, LDR + 10 kΩ, LED (o ventilador via transistor/relé), polsador
- [ ] Sketches provats: `01_llac_obert_vs_tancat` · `02_termostat_histeresi` · `03_maquina_estats` (+ **BASTIDA**) · `04_control_proporcional`
- [ ] **Preparar la prova pràctica T2** ([`Avaluació/Prova_practica_T2.md`](../../Avaluació/Prova_practica_T2.md)) — ocupa la S4 sencera (individual; kit + micro:bit per alumne/a)
- [ ] Repassar el patró `millis()` no bloquejant (bastida SA4 `05_dos_leds_millis`) per si cal escalfament
- [ ] Compartir rúbriques **R1, R3 i R4** amb l'alumnat *abans* del producte

## ⏱️ 2. Moments (punts de control per sessió)

**Sessió 1 — Què és un sistema de control?**
- [ ] Referent (1') Irmgard Flügge-Lotz · conceptes: consigna, realimentació, error, actuador
- [ ] `01_llac_obert_vs_tancat` + **diagrama de blocs**
- ⚠️ *Error:* confondre realimentació amb la sortida

**Sessió 2 — Control tot/res i histèresi**
- [ ] `02_termostat_histeresi`: dos llindars (encén/apaga) per evitar el "clic-clic"
- ⚠️ *Error:* parpelleig per no posar histèresi

**Sessió 3 — Màquines d'estats + tancament del producte**
- [ ] **Mini-check individual** a l'inici (10', no qualifica): dos llindars d'histèresi
- [ ] `03_maquina_estats`: `enum` + `switch`, transicions per temps o esdeveniment · repartir la **BASTIDA** (`// TODO`) a qui s'encalli
- [ ] **Defenses 2–3' a peu de taula** durant el repte (decisió tècnica justificada) + documentació + autoavaluació
- ⚠️ *Error:* un `case` sense transició → la màquina es "penja"

**Sessió 4 — PROVA T2 (sessió sencera, individual)**
- [ ] Instruccions (5-10') · prova Part A + Part B (~100') · recollida (10')
- [ ] Material consultable: quadern propi i esquemes · només incidències de material
- [ ] Recordar el **pla de millora personal** (es reprèn a l'inici de SA7)
- *(+Ampliació fora de sessió: `04_control_proporcional` — error, `Kp`, tot/res vs P; oscil·lació si `Kp` massa gran, limitar amb `constrain`)*

## 📊 3. Avaluació i evidències (a recollir)
- [ ] **Producte** (termòstat/màquina d'estats, S3) + defensa 2–3' → **R1, R3, R4**, Projectes 45 %
- [ ] **Prova T2** (S4 sencera) → R1, R3, R4, Proves 20 %
- [ ] **Quadern tècnic** (diagrama de blocs + diagrama d'estats + anàlisi de la resposta) → **R4**, Quadern tècnic i pràctiques 25 %
- [ ] **Observació + Serial Plotter** (histèresi, ajust de `Kp`) → R3
- [ ] Coavaluació + **exit tickets** + registre **0–10**

## 🪜 4. Atenció a la diversitat (previst per aquesta SA)
- [ ] **Bastida:** diagrama de blocs parcialment fet · termòstat tot/res abans del proporcional · esquelet `03_maquina_estats_BASTIDA` · parella heterogènia
- [ ] **+ Ampliació:** afegir estats · comparar tot/res vs P · ajustar `Kp` · [reptes ⭐ SA6](../../Reptes/Reptes_SA6.md)
- [ ] **Representació múltiple:** diagrames de blocs i d'estats · **Serial Plotter** · Wokwi
- [ ] ♿ **Accessibilitat (daltonisme):** indicador verd/vermell amb pista no cromàtica (posició, etiqueta ON/OFF, parpelleig)
- [ ] 🤖 **Llavor IA (2–3', saber literal del currículum):** control clàssic (regles/constants fixades) vs **IA aplicada al control** (aprèn de dades) → SA8
- [ ] **Rescat:** [targetes de rescat](../00_General/00_Targetes_rescat.md) 🟢🟡🔴 a qui s'encalli
