# SA2 · Fitxa base — Sortides digitals i PWM · *encén, gradua i coordina llums i so*

<!-- web:only-github -->

**Nom:** ______________________  **Data:** __________

<!-- /web:only-github -->

> Faràs llums que s'encenen en ordre, llums que respiren, colors i sons. Recorda sempre: **cada LED amb la seva resistència de 220 Ω**, i la **pota llarga cap al pin**.

## 🎯 Què aprendràs i com s'avalua

**En acabar aquesta SA sabré:**
1. Fer programes que encenen llums **en ordre** i que **trien** què fer (`if`, `switch`).
2. Fer que un llum brilli **més o menys** i barrejar **colors** (`analogWrite`, de 0 a 255).
3. Muntar bé els circuits (resistència i pota llarga) i **mesurar** amb el multímetre.

| Què entrego | Com es corregeix | Quant compta |
|---|---|---|
| **Panell de senyalització** (Sessió 3) + explicar-lo en 1 minut | **R1** (el codi) i **R2** (el circuit) | Projectes (45 %) |
| **Quadern tècnic** (dibuixos, mesures, errors) | **R4** | Quadern tècnic i pràctiques (25 %) |
| Mini-check (inici de la Sessió 3) | — | **No compta per a nota**: només et diu com vas |

> 🪜 **Per aprovar n'hi ha prou amb:** un panell amb **2 estats** que es distingeixin bé (color i so). **Per treure més nota:** 3 estats + relé, i el codi ordenat (una funció per a cada estat).

> Com es posa la nota (de 0 a 10) i totes les rúbriques: **[Com s'avalua la matèria](../00_General/00_Avaluacio_per_alumnat.md)**.

---

## On responc · Google Classroom

Les preguntes d'aquesta fitxa es responen a la **tasca de Google Classroom** (val **10 punts**). **No cal fer-ho tot de cop:** la portada de la SA et diu, sessió a sessió, què has de respondre cada dia.

> 👉 **[Obre la tasca: SA2 · Fitxa base (Google Classroom)](https://classroom.google.com/c/ODY4ODU4Njk0NTEy/a/ODcwNTEzOTQ1NjAz/details)**

En aquesta pàgina hi tens el que et pot fer falta mentre treballes: què aprendràs (a dalt) i què fer si alguna cosa no funciona (a sota).

<!-- web:only-github -->

## El que has de fer

### 1 · El semàfor (Sessió 1)
1. Munta 3 LED (vermell al 8, groc al 9, verd al 10), cadascun amb la seva resistència. Carrega `02_semafor.ino`.
2. Quant dura cada color? Vermell ____ s · verd ____ s · groc ____ s.
3. **Per què 220 Ω?** El LED necessita uns 2 V i la placa en dona 5. Fes el compte: (5 − 2) ÷ 0,02 = ______ Ω. Per què posem una resistència de 220 Ω i no del número exacte? ______________________
4. **Racó de mesura (multímetre):** amb un LED encès, el LED té ______ V · la resistència té ______ V · entre tots dos sumen ______ V. Què hi veus? ______________________
5. Amb el semàfor de la pràctica 2b: si al `case 0` poses `fase = 2;` en lloc de `fase = 1;`, què fa el semàfor? Per què? ______________________ (al quadern)
6. **Repte:** afegeix un **mode nit** (el groc fa pampallugues) com a `case 3`.

> 💡 No et surt el semàfor? Comença per **un sol LED** amb la [pràctica 1](codi/01_led_basic/EXPLICACIO.md), o fes servir l'**esquelet** de l'apartat «Si t'encalles» de la [pràctica del semàfor](codi/02_semafor/EXPLICACIO.md): només hi has d'omplir els `// TODO` de les tres llums.

### 2 · La llum que respira i els colors (Sessió 2)
1. Carrega `03_fade_pwm.ino` (LED al pin 9). `analogWrite` va de ____ a ____.
2. Amb el LED RGB i `04_rgb.ino`, crea 3 colors i apunta'n els números (R, G, B): ______________________
3. **Repte:** fes que un color canviï a poc a poc cap a un altre: __________ → __________

### 3 · El panell de senyalització (Sessió 3)
Dissenya un panell que avisi de 3 **estats** amb color + so + relé:

| Estat | Color | So (brunzidor) | Relé (engegat o apagat) |
|---|---|---|---|
| Tot correcte | | | |
| Avís | | | |
| Alarma | | | |

**Explica'l en 1 minut:** què fa el teu panell i una millora que li faries. Es corregeix amb **R1** (codi) i **R2** (circuit).

<!-- /web:only-github -->

## El producte · Panell de senyalització
Es fa a la **Sessió 3**: un panell que avisa de **3 estats** (tot correcte / avís / alarma) amb **color (LED RGB) + so (brunzidor) + relé**. Al final l'expliques en **1 minut**: què fa i una millora possible. Es corregeix amb **R1** (codi) i **R2** (circuit).

## Si alguna cosa no funciona (DEPURA)
> **D**igues què esperaves i què passa · **E**xamina (el LED, el missatge d'error) · **P**rova **un sol canvi** cada vegada · **U**bica on és el problema · **R**epara-ho · **A**punta-ho al quadern. Mira sempre primer la **resistència** i que la **pota llarga** vagi al pin. Encara no ho trobes? **[Targeta de rescat](../00_General/00_Targetes_rescat.md)** (comença per la 🟢).

<!-- web:only-github -->

## Com ho he fet? (la nota és de 0 a 10)
| Sé fer… | Encara no | Bé | Molt bé | Excel·lent |
|---|---|---|---|---|
| Programes que encenen llums en ordre i trien què fer (`if`, `switch`) | ☐ | ☐ | ☐ | ☐ |
| Fer brillar més o menys un llum i barrejar colors (`analogWrite`) | ☐ | ☐ | ☐ | ☐ |
| Muntar el circuit amb resistència i la pota llarga al pin | ☐ | ☐ | ☐ | ☐ |

## Quadern tècnic

> 📓 Escriu-ho al teu **[quadern tècnic](../00_General/00_Quadern_tecnic.md)** (compta el 25 %).
- **La cosa nova més important que he après:** ______________________________________
- **Diferència entre `digitalWrite` i `analogWrite`:** ___________________
- **Un error que he tingut i com l'he arreglat:** _____________________________________

<!-- /web:only-github -->

> 📌 **Vols més?** [Reptes ⭐](../../Reptes/Reptes_SA2.md) (semàfor per a vianants, indicador de nivell) i més activitats a la **[fitxa ampliada](SA2_fitxa_ampliada.md)**.

> 🤖 **El robot del trimestre:** els colors, llums i sons que programes en aquesta SA seran les **expressions** de la teva **mascota**. Guarda el codi! Tot sobre la mascota: **[dossier de la mascota](../00_General/00_Projecte_T1_Mascota.md)**.
