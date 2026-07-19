# SA2 · Fitxa base — Sortides digitals i PWM · *encén, gradua i coordina llums i so*

<!-- web:only-github -->

**Nom:** ______________________  **Parella:** ______________________  **Data:** __________

<!-- /web:only-github -->

> Controlaràs LED, color i so, i regularàs la intensitat amb PWM. Recorda: **cada LED amb resistència de 220 Ω** i polaritat correcta.

## 🎯 Objectius i avaluació

**En acabar aquesta SA podré:**
1. Escriure programes amb **variables, `if`, `for` i `switch`** que controlin llums i so.
2. **Graduar** intensitat i color amb PWM (`analogWrite`, 0–255, pins `~`).
3. Muntar circuits correctes (resistència, polaritat) i **mesurar-hi tensions** amb el multímetre.

| Què lliuro | Rúbrica | On compta |
|---|---|---|
| **Panell de senyalització** (producte, S4) + defensa d'1' | **R1** (codi) i **R2** (circuit) | Projectes (45 %) |
| **Quadern tècnic** (esquemes, mesures, errors) | **R4** | Quadern tècnic i pràctiques (25 %) |
| Mini-check individual (inici S4) | semàfor | **No qualifica** (em situa) |

> 🪜 **Versió nucli (ja és assoliment satisfactori):** panell amb **2 estats** clarament distingibles amb color i so. **Versió completa:** els 3 estats + relé, i codi ordenat amb una funció per estat.

> Escala de nota 0-10, rúbriques i tot el sistema: **[Com s'avalua la matèria](../00_General/00_Avaluacio_per_alumnat.md)**.

---

## Les activitats · al Google Classroom

Aquesta fitxa es respon **en línia**, a la tasca de Google Classroom (val **10 punts**). **No cal que la responguis d'entrada**: cada activitat porta el seu **enunciat dins de la tasca**, i l'**itinerari de la portada de la SA** et diu quina toca a cada sessió. Obre-la quan comencis a treballar-hi i ves-la responent a mesura que avances:

> 👉 **[Obre la tasca: SA2 · Fitxa base (Google Classroom)](https://classroom.google.com/c/ODY4ODU4Njk0NTEy/a/ODcwNTEzOTQ1NjAz/details)**

En aquesta pàgina hi tens el que necessites mentre treballes: els **objectius i l'avaluació** (a dalt) i la rutina **DEPURA** (a sota).

<!-- web:only-github -->

## El que has de fer

### 1 · LED bàsic i variables (S1)
0. **PREDIU:** mirant `01_led_basic.ino`, què farà el LED? ______________________
1. Munta un LED al pin 8. Carrega `01_led_basic.ino` i comprova la predicció.
2. Canvia el temps d'encès/apagat amb una **variable** `temps`. Valor provat: ______
3. **D'on surt el 220 Ω?** Calcula amb la llei d'Ohm: R = (5 − 2) V / 0,02 A = ______ Ω. Per què usem 220 Ω i no aquest valor exacte? ______________________
4. **Racó de mesura (multímetre):** amb el LED encès, tensió al LED = ______ V · a la resistència = ______ V · suma ≈ ______ V. Què hi observes? ______________________
5. **Repte:** escriu el codi Morse d'una lletra (· curt / − llarg). Lletra: ____

### 2 · Semàfor (S2)
1. Munta 3 LED (vermell-8, groc-9, verd-10). Carrega `02_semafor.ino`.
2. Durada de cada fase: vermell ____ s · verd ____ s · groc ____ s.
3. Reescriu el semàfor amb **`switch`** sobre una variable `fase` (0-1-2). Què passa si oblides un `break`? ______________________
4. **Repte:** afegeix una **fase nocturna** (groc intermitent) com a fase nova del `switch`.

> 💡 Si t'encalles muntant el semàfor, parteix de l'esquelet `06_semafor_BASTIDA`: pins i `setup()` ja fets; tu omples els `// TODO` de les fases (i, al final, un groc que «respira» amb PWM).

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

<!-- /web:only-github -->

## Producte · Panell de senyalització
Es fa a la **S4**: un panell que indica **estats** (tot correcte / avís / alarma) amb **color (RGB) + so (piezo) + relé**. **Defensa d'1'**: què fa el teu panell i una millora possible. S'avalua amb **R1** (codi) i **R2** (circuit).

## Si t'encalles (DEPURA)
> **D**escriu · **E**xamina (LED, error, Monitor Sèrie) · **P**rova una hipòtesi cada cop · **U**bica · **R**epara · **A**punta-ho. Revisa la **resistència** i la **polaritat** de cada LED. Encara encallat? **[Targeta de rescat](../00_General/00_Targetes_rescat.md)** (comença per la 🟢).

<!-- web:only-github -->

## M'autoavaluo (Insuficient · Suficient/Bé · Notable · Excel·lent — la nota és 0-10)
| Criteri | Insuficient | Suficient/Bé | Notable | Excel·lent |
|---|---|---|---|---|
| Programo seqüències amb `for`/`if`/`switch` i variables | ☐ | ☐ | ☐ | ☐ |
| Regulo intensitat/color amb PWM (`analogWrite`, `map`) | ☐ | ☐ | ☐ | ☐ |
| Munto el circuit amb resistència i polaritat correctes | ☐ | ☐ | ☐ | ☐ |

## Quadern tècnic

> 📓 Escriu-ho a la teva entrada del **[quadern tècnic](../00_General/00_Quadern_tecnic.md)** (guia + plantilla; compta el 25 %).
- **Concepte nou més important:** ______________________________________
- **Diferència entre `digitalWrite` i `analogWrite`:** ___________________
- **Un error i com l'he resolt:** _____________________________________

<!-- /web:only-github -->

> 📌 **Vols més?** +Reptes (semàfor de vianants, indicador de nivell), rols, coavaluació, exit ticket, pensament computacional i ODS → **[SA2_fitxa_ampliada.md](SA2_fitxa_ampliada.md)**

> 🤖 **Cap al robot del trimestre:** les expressions que has programat en aquesta fitxa (colors, animacions i sons) són les de la teva **mascota**. Guarda el codi: el reaprofitaràs quan la caixa estigui tallada. Peces, muntatge i cablatge: **[dossier de la mascota](../00_General/00_Projecte_T1_Mascota.md)**.
