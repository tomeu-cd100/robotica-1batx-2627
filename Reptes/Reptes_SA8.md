# Reptes SA8 · IoT i Intel·ligència Artificial

**Tria UN dels tres reptes.** Tots **connecten o fan intel·ligent** un sistema: envien/reben dades o usen un model per decidir. Mateix requisit mínim, ampliacions graduades. Base en **micro:bit/MicroPython** (l'ESP32 és opcional/avançat).

> **Continguts SA8:** IoT, telemetria (emissor/receptor), ràdio, IA (gestos), ESP32 (opcional). · **Codi base:** `Classes/SA8/codi/` (`.py` + `esp32_telemetria.ino`).

---

## 🌍 Repte A · Estació meteorològica connectada

**Context.** Una estació que **mesura** l'entorn (temperatura, llum) i **envia** les dades a un altre dispositiu que les mostra/registra.

**Què treballa.** Telemetria: emissor que llegeix sensors i **envia per ràdio**; receptor que **rep i mostra**.

**Requisit mínim.**
- Un micro:bit **emissor** llegeix un sensor (temperatura/llum) i **envia** el valor; un **receptor** el **mostra**.
- Codi comentat (emissor i receptor).

**Ampliacions graduades.**
1. *(bàsica)* Envia **diverses magnituds** identificades (etiqueta + valor).
2. *(notable)* El receptor **registra** o calcula màxim/mínim/mitjana.
3. *(⭐⭐⭐)* Porta la telemetria a un **ESP32 amb WiFi** (avançat) o a un full de càlcul.

---

## 🚨 Repte B · Sistema d'alerta a distància

**Context.** Un sensor que **avisa a distància** quan passa alguna cosa (porta oberta, planta seca, temperatura alta) enviant una alerta a un receptor.

**Què treballa.** Detecció amb llindar + comunicació per ràdio (esdeveniment → missatge).

**Requisit mínim.**
- Un emissor que, **quan se supera un llindar**, **envia una alerta**; un receptor que la **mostra** (icona/text + so).
- Codi comentat.

**Ampliacions graduades.**
1. *(bàsica)* Diferencia **estat normal vs alerta** amb icones clares.
2. *(notable)* Afegeix **confirmació (ACK)** del receptor o diversos nivells d'alerta.
3. *(⭐⭐⭐)* Xarxa de **diversos emissors** identificats que reporten a un sol receptor.

---

## ✋ Repte C · Control per gestos (IA)

**Context.** Controlar un sistema **amb gestos** (moviments de la mà amb el micro:bit) reconeguts per un model, com fan els wearables.

**Què treballa.** Captura de dades de l'acceleròmetre, **classificació** de gestos, acció associada.

**Requisit mínim.**
- Reconèixer **almenys dos gestos** diferents (p. ex. inclinar/sacsejar) i associar-hi una **acció** (mostrar icona, enviar missatge).
- Codi comentat.

**Ampliacions graduades.**
1. *(bàsica)* Afegeix un **tercer gest** i la seva acció.
2. *(notable)* Usa els gestos per **controlar un altre dispositiu** per ràdio (comandament gestual).
3. *(⭐⭐⭐)* Entrena/ajusta un **model senzill** de classificació amb dades pròpies (ML educatiu).

---

## Material necessari (segons repte)
- **Dos** micro:bits (emissor/receptor) + piles · sensors integrats (temperatura, llum, acceleròmetre) · *(opcional)* ESP32 + WiFi per al repte A avançat · python.microbit.org / **Thonny**.

## Per on començar (mètode de projecte + PRIMM)
1. **Analitzar:** quina dada/acció viatja, de qui a qui?
2. **Dissenyar (Predir):** defineix el **protocol** (què s'envia i com s'interpreta).
3. **Prototipar:** parteix de `Classes/SA8/codi/` (`01_telemetria_emissor.py`, `02_telemetria_receptor.py`, `03_ia_gestos.py`; ESP32: `04_esp32_telemetria.ino`).
4. **Provar:** comprova la comunicació amb missatges senzills abans d'afegir sensors.
5. **Millorar:** afegeix magnituds, ACK, nivells o gestos.

## Com s'avalua
| Rúbrica | Per què |
|---|---|
| **R1** (codi) | Estructura emissor/receptor, lògica de classificació. |
| **R3** (projecte) | Sistema connectat funcional i fiable. |
| **R4** (documentació) | Quadern tècnic: protocol de comunicació i proves. |

## Producte / entrega
- Codi `.py` (emissor i receptor) comentat + quadern tècnic amb el protocol i un registre de proves.

---

## Orientació docent
- **Errors freqüents:** **grups de ràdio** diferents entre dispositius; `radio.receive()` retorna `None` (no gestionar-ho); barrejar tipus (enviar números com a text); a l'ESP32, credencials/WiFi (deixar-ho com a ampliació).
- **Diferenciació:** el mínim és enviar-rebre una dada o reconèixer dos gestos; xarxes, ACK i ML escalen.
- **Gestió d'aula:** aparellar dispositius per **grups de ràdio** únics per equip per evitar interferències; l'ESP32 és **opcional/avançat**. Reforça les diferències de llenguatge amb `Classes/SA0/` (Part B).
- **Vincle avaluació:** R1 + R3 + R4; tanca el curs amb visió de sistemes connectats i ètica de les dades (pont amb SA9).
