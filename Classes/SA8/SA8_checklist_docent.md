# SA8 · Checklist docent — IoT i IA: el robot connectat i intel·ligent

**6 h (3 sessions) · 2× micro:bit + Micro:shield · ESP32 (WiFi) opcional · Criteris CA3.1, CA4.2 · Rúbriques R1 (codi), R3 (sistema/decisió), R4 (documentació/reflexió)**

> Eina d'acció d'una cara. Condensa la [`SA8_guia_docent.md`](SA8_guia_docent.md). 🤖 És la SA on **culmina la IA**: repassa `../00_IA_a_la_materia.md`. **Quan s'usa:** imprimeix-lo en **preparar la SA** (§1) i tingues-lo **a taula a cada sessió** (§2–§4).

## 🧰 1. Logística prèvia (preparar abans de començar la SA)
- [ ] 2 micro:bit (emissor + receptor) per equip + cables USB
- [ ] (Opcional) ESP32 per a la demo WiFi/MQTT · editor Python o Thonny
- [ ] **S3 (ML):** 1 ordinador/tauleta amb **navegador + càmera/micròfon** per parella (Teachable Machine) — *Pla B: demo projectada*
- [ ] Sketches provats: `01_telemetria_emissor` · `02_telemetria_receptor` · `03_ia_gestos` · (`04_esp32_telemetria`)
- [ ] Preparar la [`SA8_practica_teachable_machine.md`](SA8_practica_teachable_machine.md) i triar el mini-debat d'ètica de dades
- [ ] Compartir rúbriques **R1, R3 i R4** amb l'alumnat *abans* del producte

## ⏱️ 2. Moments (punts de control per sessió)

**Sessió 1 — Telemetria: el robot que informa**
- [ ] Referent (1') Fei-Fei Li (+ menció Hedy Lamarr) · `01/02_telemetria` (`radio.send/receive`, registre pel sèrie)
- [ ] Enviar magnitud etiquetada (`"T:23"`) i registrar-la
- ⚠️ *Clau:* mateix `group` a les dues plaques · *Error:* dades barrejades sense etiqueta

**Sessió 2 — IoT: arquitectura, aplicacions i riscos**
- [ ] Arquitectura **dispositiu → xarxa → núvol → app** + protocols
- [ ] Auditoria per parelles d'un **producte IoT real** (targetes + informe) i **peritatge creuat**
- ⚠️ *Error:* veure l'IoT com a "màgia" sense riscos

**Sessió 3 — Introducció a la IA: de les regles a l'aprenentatge**
- [ ] `03_ia_gestos` (classificació per **regles**) → salt a **ML real** amb Teachable Machine (recollir, entrenar, provar, **trencar-lo a propòsit**)
- [ ] **Mini-check individual** a l'inici (10', no qualifica): explicar línia a línia un emissor de telemetria
- [ ] Reflexió ètica: biaix, dades, consentiment (RGPD, ODS 11/16)
- ⚠️ *Error:* fixar llindars "a ull" sense mesurar valors reals

## 📊 3. Avaluació i evidències (a recollir)
- [ ] **Producte** (telemetria o classificador IA) → **R1, R3**, Projectes 45 %
- [ ] **Reflexió ètica** (un risc de dades concret + una mesura per reduir-lo) → **R4**
- [ ] **Informe d'auditoria IoT** + **quadern tècnic** (dades, errors) → **R4**, Quadern tècnic i pràctiques 25 %
- [ ] **Coavaluació** (treball d'equip, disseny responsable) + **exit tickets** + registre **0–10**

## 🪜 4. Atenció a la diversitat (previst per aquesta SA)
- [ ] **Bastida:** emissor i receptor ja fets per modificar · esquelet «Si t'encalles» a la pàgina de la pràctica de l'emissor · simulador micro:bit i Wokwi (ESP32) · equips heterogenis
- [ ] **+ Ampliació:** dues magnituds etiquetades · alerta per llindar · classe nova de gest · **ML real** (Teachable Machine / MakeCode ML) · [reptes ⭐ SA8](../../Reptes/Reptes_SA8.md)
- [ ] ✏️ **Retirada de bastida — "a full en blanc":** l'emissor **o** el receptor escrit des de zero (últim graó abans de la SA9)
- [ ] **Representació múltiple:** dades en taula i gràfic · diagrama d'arquitectura IoT · simuladors
- [ ] **Rescat:** [targetes de rescat](../00_General/00_Targetes_rescat.md) 🟢🟡🔴 a qui s'encalli
