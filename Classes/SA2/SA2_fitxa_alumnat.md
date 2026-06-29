# SA2 · Fitxa base — Sortides digitals i PWM

**Nom:** ______________________  **Parella:** ______________________  **Data:** __________

> Controlaràs LED, color i so, i regularàs la intensitat amb PWM. Recorda: **cada LED amb resistència de 220 Ω** i polaritat correcta.

---

## El que has de fer

### 1 · LED bàsic i variables (S1)
0. **PREDIU:** mirant `01_led_basic.ino`, què farà el LED? ______________________
1. Munta un LED al pin 8. Carrega `01_led_basic.ino` i comprova la predicció.
2. Canvia el temps d'encès/apagat amb una **variable** `temps`. Valor provat: ______
3. **Repte:** escriu el codi Morse d'una lletra (· curt / − llarg). Lletra: ____

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
> **D**escriu · **E**xamina (LED, error, Monitor Sèrie) · **P**rova una hipòtesi cada cop · **U**bica · **R**epara · **A**punta-ho. Revisa la **resistència** i la **polaritat** de cada LED.

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
