# Reptes SA2 · Sortides digitals i PWM

**Tria UN dels tres reptes.** Tots coordinen **diverses sortides** i/o fan servir **PWM** (`analogWrite`, 0–255, pins `~`). Mateix requisit mínim, ampliacions graduades. Simulables a Tinkercad/Wokwi.

> **Continguts SA2:** múltiples sortides digitals, PWM i brillantor, LED RGB, seqüències. · **Codi base:** `Classes/SA2/codi/`.

---

## 🚦 Repte A · Semàfor d'un encreuament

**Context.** Programa el cicle d'un semàfor de cotxes amb els temps realistes de cada fase.

**Què treballa.** Coordinar 3 sortides digitals amb una seqüència temporitzada.

**Requisit mínim.**
- 3 LED (vermell, groc, verd) amb la **seqüència correcta** i temps diferents per fase.
- Codi comentat amb els pins ben identificats.

**Ampliacions graduades.**
1. *(bàsica)* Usa **constants** per als pins i **variables** per als temps.
2. *(notable)* Afegeix un **semàfor de vianants** coordinat (verd vianants quan vermell cotxes).
3. *(⭐⭐⭐)* Encapsula cada fase en una **funció** i fes el cicle net al `loop()`.

---

## 💡 Repte B · Llum d'ambient regulable

**Context.** Una llum d'ambient que **puja i baixa d'intensitat** suaument (efecte "respiració") o canvia de color.

**Què treballa.** PWM amb `analogWrite` (0–255), bucles per fer transicions suaus.

**Requisit mínim.**
- Un LED en un pin `~` que fa un **efecte fade** (puja i baixa d'intensitat) amb un bucle `for`.
- Codi comentat.

**Ampliacions graduades.**
1. *(bàsica)* Ajusta la **velocitat** del fade amb una variable.
2. *(notable)* Passa a un **LED RGB** i fes una transició entre **dos colors**.
3. *(⭐⭐⭐)* Programa un **cicle de colors** (arc de Sant Martí) barrejant els tres canals.

---

## 📊 Repte C · Indicador de nivell (barra de LED)

**Context.** Un indicador visual de nivell (bateria, dipòsit, volum) amb una **barra de LEDs** que s'omple per trams.

**Què treballa.** Control de múltiples sortides segons un valor, organització amb bucles.

**Requisit mínim.**
- 4–5 LED que s'encenen **progressivament** segons un nivell (de moment fixat al codi o amb un comptador).
- Codi comentat.

**Ampliacions graduades.**
1. *(bàsica)* Recorre els LED amb un **bucle `for`** i un array de pins.
2. *(notable)* Fes que el nivell **pugi i baixi** en bucle (efecte VU-mètre).
3. *(⭐⭐⭐)* Substitueix l'últim LED per un **RGB** que passi de verd a vermell segons el nivell.

---

## Material necessari (segons repte)
- Arduino UNO + cable USB · LEDs (3–5) + resistències 220 Ω (o LED RGB) · cables / placa de proves · o **Tinkercad/Wokwi**.

## Per on començar (mètode de projecte + PRIMM)
1. **Analitzar:** quantes sortides necessito i com es coordinen en el temps?
2. **Dissenyar (Predir):** fes un esquema de pins i una línia de temps de les fases.
3. **Prototipar:** parteix dels sketches de `Classes/SA2/codi/` (`02_semafor`, `03_fade_pwm`, `04_rgb`, `05_panell_senyalitzacio`).
4. **Provar:** comprova temps i colors; depura amb el Monitor Sèrie si cal.
5. **Millorar:** introdueix constants, funcions i una ampliació.

## Com s'avalua
| Rúbrica | Per què |
|---|---|
| **R1** (codi) | Estructura i modularitat (funcions per fase). |
| **R2** (circuit) | Muntatge correcte de múltiples sortides i resistències. |
| **R4** (documentació) | Esquema de connexions i quadern tècnic. |

## Producte / entrega
- Codi `.ino` comentat + **esquema de connexions** + entrada al quadern tècnic.

---

## Orientació docent
- **Errors freqüents:** confondre `analogWrite` (0–255) amb nivells digitals; usar PWM en un pin **sense** `~`; oblidar resistències; ordre de fases del semàfor incorrecte.
- **Diferenciació:** el mínim assegura la base (seqüència/fade/barra); les ampliacions porten a arrays, RGB i funcions.
- **Gestió d'aula:** el repte A enllaça amb `02_semafor`; el B amb `03_fade_pwm`/`04_rgb`; el C amb `05_panell_senyalitzacio`. Tot simulable.
- **Vincle avaluació:** producte amb esquema (R2/R4) coherent amb el material de la SA2.
