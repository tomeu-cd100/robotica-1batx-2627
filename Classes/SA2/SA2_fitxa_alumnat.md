# SA2 · Fitxa d'alumnat — Sortides digitals i PWM

**Nom:** ______________________  **Parella:** ______________________  **Data:** __________

> Aprendràs a controlar LED, color i so, i a regular la intensitat amb PWM. Recorda: **cada LED amb resistència de 220 Ω** i polaritat correcta.

---

## Activitat 1 · LED bàsic i variables (S1)
1. Munta un LED al pin 8 (esquema 1). Carrega `01_led_basic.ino`.
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

---

## Quadern tècnic (SA2)
- **Concepte nou més important:** _______________________________________
- **Error trobat i solució:** ___________________________________________
- **Diferència entre `digitalWrite` i `analogWrite`:** ___________________
