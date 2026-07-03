# SA2 · Fitxa base — Sortides digitals i PWM · *encén, gradua i coordina llums i so*

**Nom:** ______________________  **Parella:** ______________________  **Data:** __________

> Controlaràs LED, color i so, i regularàs la intensitat amb PWM. Recorda: **cada LED amb resistència de 220 Ω** i polaritat correcta.

## 🎯 Objectius i avaluació

**En acabar aquesta SA podré:**
1. Escriure programes amb **variables, `if` i `for`** que controlin llums i so.
2. **Graduar** intensitat i color amb PWM (`analogWrite`, 0–255, pins `~`).
3. Muntar circuits correctes (resistència, polaritat) i **mesurar-hi tensions** amb el multímetre.

| Què lliuro | Rúbrica | On compta |
|---|---|---|
| **Panell de senyalització** (producte, S4) + defensa d'1' | **R1** (codi) i **R2** (circuit) | Projectes (45 %) |
| **Quadern tècnic** (esquemes, mesures, errors) | **R4** | Quadern i pràctiques (25 %) |
| Mini-check individual (inici S4) | semàfor | **No qualifica** (em situa) |

> 🪜 **Versió nucli (ja és assoliment satisfactori):** panell amb **2 estats** clarament distingibles amb color i so. **Versió completa:** els 3 estats + relé, i codi ordenat amb una funció per estat.

> Escala NA·AS·AN·AE, rúbriques i tot el sistema: **[Com s'avalua la matèria](../00_General/00_Avaluacio_per_alumnat.md)**.

---

## El que has de fer

### 1 · LED bàsic i variables (S1)
0. **PREDIU:** mirant `01_led_basic.ino`, què farà el LED? ______________________
1. Munta un LED al pin 8. Carrega `01_led_basic.ino` i comprova la predicció.
2. Canvia el temps d'encès/apagat amb una **variable** `temps`. Valor provat: ______
3. **Racó de mesura (multímetre):** amb el LED encès, tensió al LED = ______ V · a la resistència = ______ V · suma ≈ ______ V. Què hi observes? ______________________
4. **Repte:** escriu el codi Morse d'una lletra (· curt / − llarg). Lletra: ____

### 2 · Semàfor (S2)
1. Munta 3 LED (vermell-8, groc-9, verd-10). Carrega `02_semafor.ino`.
2. Durada de cada fase: vermell ____ s · verd ____ s · groc ____ s.
3. **Repte:** afegeix una **fase nocturna** (groc intermitent).

### 3 · PWM: intensitat i color (S3)
1. Efecte *fade* amb `03_fade_pwm.ino` (pin 9). Rang d'`analogWrite`: ____ a ____
2. LED RGB amb `04_rgb.ino`. Anota 3 colors creats (R, G, B): ______________________
3. **Repte:** transició suau entre dos colors: __________ → __________

### 4 · Producte: panell de senyalització (S4)
Dissenya un panell que indiqui **estats** amb color + so + una càrrega (relé):

| Estat | Color RGB | So (piezo) | Relé |
|---|---|---|---|
| Tot correcte | | | |
| Avís | | | |
| Alarma | | | |

**Defensa (1'):** explica què fa el teu panell i una millora possible. S'avalua amb **R1** (codi) i **R2** (circuit).

## Si t'encalles (DEPURA)
> **D**escriu · **E**xamina (LED, error, Monitor Sèrie) · **P**rova una hipòtesi cada cop · **U**bica · **R**epara · **A**punta-ho. Revisa la **resistència** i la **polaritat** de cada LED. Encara encallat? **[Targeta de rescat](../00_General/00_Targetes_rescat.md)** (comença per la 🟢).

## M'autoavaluo (NA/AS/AN/AE)
| Criteri | NA | AS | AN | AE |
|---|---|---|---|---|
| Programo seqüències amb `for`/`if` i variables | ☐ | ☐ | ☐ | ☐ |
| Regulo intensitat/color amb PWM (`analogWrite`, `map`) | ☐ | ☐ | ☐ | ☐ |
| Munto el circuit amb resistència i polaritat correctes | ☐ | ☐ | ☐ | ☐ |

## Quadern tècnic
- **Concepte nou més important:** ______________________________________
- **Diferència entre `digitalWrite` i `analogWrite`:** ___________________
- **Un error i com l'he resolt:** _____________________________________

> 📌 **Vols més?** +Reptes (semàfor de vianants, indicador de nivell), rols, coavaluació, exit ticket, pensament computacional i ODS → **[SA2_fitxa_ampliada.md](SA2_fitxa_ampliada.md)**
