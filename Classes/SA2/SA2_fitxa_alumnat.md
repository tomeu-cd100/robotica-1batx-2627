# SA2 · Fitxa d'alumnat — Sortides digitals i PWM

**Nom:** ______________________  **Parella:** ______________________  **Data:** __________

> Aprendràs a controlar LED, color i so, i a regular la intensitat amb PWM. Recorda: **cada LED amb resistència de 220 Ω** i polaritat correcta.

---

## Activitat 1 · LED bàsic i variables (S1)
0. **PREDIU** (abans d'executar): mirant `01_led_basic.ino`, què creus que farà el LED? ____________________
1. Munta un LED al pin 8 (esquema 1). Carrega `01_led_basic.ino` i **comprova** la predicció.
2. Canvia el temps d'encès/apagat usant una **variable** `temps`. Quin valor has provat? ______
3. **Repte:** escriu el codi Morse d'una lletra (· curt / − llarg). Lletra: ____ → enganxa el codi al quadern.

## Activitat 2 · Semàfor (S2)
1. Munta 3 LED (vermell-8, groc-9, verd-10). Carrega `02_semafor.ino`.
2. Anota la durada de cada fase: vermell ____ s · verd ____ s · groc ____ s.
3. **Repte:** afegeix una **fase nocturna** (groc intermitent). Com l'actives? ______________
4. **+ Repte:** afegeix un semàfor de **vianants** coordinat.

## Activitat 3 · PWM: intensitat i color (S3)
1. Efecte *fade* amb `03_fade_pwm.ino` (pin 9). Quin rang de valors té `analogWrite`? ____ a ____
2. LED RGB amb `04_rgb.ino`. Completa la taula amb 3 colors que hagis creat:

| Color | R (0-255) | G (0-255) | B (0-255) |
|---|---|---|---|
| | | | |
| | | | |
| | | | |

3. **Repte:** transició suau entre dos colors. Quins? __________ → __________

## Activitat 4 · Producte: panell de senyalització (S4)
Dissenya un panell que indiqui **estats** amb color + so + una càrrega (relé).

| Estat | Color RGB | So (piezo) | Relé |
|---|---|---|---|
| Tot correcte | | | |
| Avís | | | |
| Alarma | | | |

- **Esquema** (dibuixa o enganxa): ______________________
- **Defensa (1'):** explica què fa el teu panell i una millora possible.

**Autoavaluació** (marca el teu nivell — NA/AS/AN/AE):
| Criteri | Nivell |
|---|---|
| El codi funciona i està comentat (R1) | ☐ NA ☐ AS ☐ AN ☐ AE |
| El circuit és correcte i segur (R2) | ☐ NA ☐ AS ☐ AN ☐ AE |

---

## Treball en equip · rols de la parella

Repartiu-vos els rols i **roteu-los** a cada sessió:

| Rol | S1 | S2 | S3 | S4 |
|---|---|---|---|---|
| Coordinador/a (temps, enunciat) | | | | |
| Programador/a (codi) | | | | |
| Enginyer/a de maquinari (circuit, seguretat) | | | | |
| Provador/a–Documentador/a (prova + quadern) | | | | |

---

## Si t'encalles

1. **Pista 1:** descriu la **seqüència** que ha de fer el sistema (quin LED, quan, quant temps).
2. **Pista 2:** revisa pin a pin amb l'esquema; comprova la **resistència** i la **polaritat** de cada LED.
3. **Pista 3:** aplica la **rutina DEPURA** i demana ajuda **explicant què ja has provat**.

> **Rutina DEPURA:** **D**escriu (què esperaves vs què passa) · **E**xamina (LED, error, Monitor Sèrie) · **P**rova una hipòtesi cada cop · **U**bica el problema · **R**epara i torna a provar · **A**punta-ho al quadern.

## Vols més?

- **Reptes ⭐:** `Reptes/Reptes_SA2.md` (semàfor, llum ambient, indicador de nivell).
- **Simulació interactiva (Wokwi):** semàfor a `Simulacions/Wokwi/SA2_semafor/` (enllaç a `SA2_esquemes_connexions.md`).

---

## Pensament computacional d'aquesta SA

Avui has treballat amb **PATRONS i ALGORISME** (la seqüència ordenada de fases del semàfor) i amb **ABSTRACCIÓ** (encapsular fases en funcions). On has vist un patró que es repeteix? ______________________

## Diana d'autoavaluació

Marca el teu nivell (NA/AS/AN/AE):

| Criteri | NA | AS | AN | AE |
|---|---|---|---|---|
| Programo seqüències amb `for`/`if` i variables | ☐ | ☐ | ☐ | ☐ |
| Regulo intensitat/color amb PWM (`analogWrite`, `map`) | ☐ | ☐ | ☐ | ☐ |
| Munto el circuit amb resistència i polaritat correctes | ☐ | ☐ | ☐ | ☐ |

## Coavaluació (2 estrelles i un desig)

Intercanvieu el panell/semàfor amb una altra parella:
- ⭐ Una cosa ben feta: ______________________
- ⭐ Una altra cosa ben feta: ______________________
- 💡 Una millora (desig): ______________________

## Exit ticket (abans de marxar)

1. Una cosa que he après avui: ______________________
2. Una cosa que encara no tinc clara: ______________________
3. On ho faria servir al món real: ______________________

## Context real i ODS

Els sistemes de senyalització ordenen ciutats i indústries. **ODS 11** (ciutats sostenibles) i **ODS 7** (energia: el LED consumeix molt menys que la bombeta). Com faria el teu panell un ús més eficient de l'energia? ______________________

---

## Quadern tècnic (SA2)
- **Concepte nou més important:** _______________________________________
- **Error trobat i solució:** ___________________________________________
- **Diferència entre `digitalWrite` i `analogWrite`:** ___________________
