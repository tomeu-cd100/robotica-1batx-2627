# SA1 · Checklist docent — Què és un robot?

**6 h (3 sessions) · Arduino UNO + Tinkercad · Criteris CA5.1, CA5.3 · Rúbriques R4 (documentació) i R5 (actitud)**

> Eina d'acció d'una cara. Condensa la [`SA1_guia_docent.md`](SA1_guia_docent.md) en punts verificables. Marca `[x]` a mesura que ho tinguis fet.

## 🧰 1. Logística prèvia (preparar abans de començar la SA)
- [ ] Arduino UNO + cable USB a punt (demostració i, si n'hi ha, per parelles)
- [ ] Ordinadors amb **Arduino IDE** instal·lat i accés a **Tinkercad** (compte de classe creat)
- [ ] Projector provat amb [`SA1_esquemes_connexions.md`](SA1_esquemes_connexions.md) (versió etiquetada + muda)
- [ ] **Imprimir:** [prova diagnòstica](SA1_prova_diagnostica.md) · [full de normes de seguretat](SA1_normes_seguretat.md) (per signar) · [plantilla fitxa-pòster](SA1_poster_robot_plantilla.md)
- [ ] Sketches oberts i provats: `blink` · `blink_repte` · (ampliacions `blink_millis`, `sos_morse`)
- [ ] Pòster del **mètode de projecte** penjat a l'aula
- [ ] Compartir rúbriques **R4 i R5** amb l'alumnat *abans* del producte (avaluació formativa)

## ⏱️ 2. Moments (punts de control per sessió)

**Sessió 1 — Què és un robot?**
- [ ] Activació: *"Quins robots tens a casa sense saber-ho?"* + referent (1') Margaret Hamilton
- [ ] Model entrada→procés→sortida i anàlisi de 3 sistemes (Act. 1)
- [ ] Passar la **prova diagnòstica** (no qualifica → forma parelles heterogènies)
- [ ] Tancament: presentar mètode de projecte + obrir quadern tècnic
- ⚠️ *Error a vigilar:* confondre entrada (sensor) amb sortida (actuador)

**Sessió 2 — Arquitectura i seguretat**
- [ ] Placa UNO real a la mà; etiquetar l'esquema mut (Act. 2)
- [ ] **Signatura del full de seguretat** (recollir-lo)
- [ ] Tour Arduino IDE + Tinkercad (primer circuit LED)
- ⚠️ *Mantra:* pins `~` = PWM; A0–A5 = analògics · *Error:* confondre 5V amb GND

**Sessió 3 — El primer programa (PRIMM)**
- [ ] Projectar `blink.ino` **sense pujar-lo** → alumnat prediu (Act. 4)
- [ ] Executar → Investigar → Modificar `delay` → **Repte** `blink_repte`
- [ ] Mini-debat ètic (ODS) + presentar la fitxa-pòster
- ⚠️ *Error:* creure que `setup()` es repeteix

## 📊 3. Avaluació i evidències (a recollir)
- [ ] **Fitxa-pòster** d'un robot real → **R4** (compta, Projectes 45 %)
- [ ] **Quadern tècnic** 1a entrada → **R4** (Quadern i pràctiques 25 %)
- [ ] **Observació d'aula** (cooperació, seguretat, autonomia) → **R5** (Actitud 10 %)
- [ ] Coavaluació del pòster ("2 estrelles i un desig") + recollir **exit tickets**
- [ ] Traspassar valoracions al registre (nota **0–10**)

## 🪜 4. Atenció a la diversitat (previst per aquesta SA)
- [ ] **Bastida:** esquema etiquetat de referència · parella heterogènia (segons diagnòstica) · treball amb LED intern (pin 13)
- [ ] **+ Ampliació:** `blink_millis` (sense `delay()`) · `sos_morse` (funcions) · defensa oral d'1' d'un robot industrial/IA
- [ ] **Rescat:** recordar les [targetes de rescat](../00_General/00_Targetes_rescat.md) 🟢🟡🔴 a qui s'encalli
