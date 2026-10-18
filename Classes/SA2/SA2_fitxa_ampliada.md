# SA2 · Fitxa ampliada (aprofundiment) — Sortides digitals i PWM

> 📄 **Versió ampliada**: té les mateixes activitats que la fitxa base, però amb més reptes i activitats extra. La fitxa que fa **tothom** és la base: **[SA2_fitxa_alumnat.md](SA2_fitxa_alumnat.md)**.

> 🧑‍🎓 **Quan toca obrir-la?** **Només si vols**, quan ja portis la fitxa base al dia. Algunes activitats d'aquí (la revisió del codi d'un company, el tiquet de sortida) les farà fer el docent a classe quan toqui.

**Nom:** ______________________  **Data:** __________

> Faràs llums que s'encenen en ordre, llums que respiren, colors i sons. Recorda: **cada LED amb la seva resistència de 220 Ω**, i la **pota llarga cap al pin**.

---

## Activitat 1 · El semàfor (Sessió 1)
1. Munta 3 LED (vermell al 8, groc al 9, verd al 10), cadascun amb la seva resistència. Carrega `02_semafor.ino`. *(Si no et surt, comença per un sol LED amb `01_led_basic.ino`.)*
2. Quant dura cada color? Vermell ____ s · verd ____ s · groc ____ s.
3. **Per què 220 Ω?** (5 − 2) ÷ 0,02 = ______ Ω. Per què posem 220 Ω? ______________
4. **Racó de mesura:** el LED té ______ V · la resistència té ______ V · sumen ______ V.
5. **Repte:** afegeix un **mode nit** (el groc fa pampallugues). Com l'has fet? ______________
6. **+ Repte:** afegeix un semàfor per a **vianants** (un altre vermell i verd) que vagi coordinat amb el dels cotxes.

## Activitat 2 · La llum que respira i els colors (Sessió 2)
1. Carrega `03_fade_pwm.ino` (LED al pin 9). `analogWrite` va de ____ a ____.
2. Amb el LED RGB i `04_rgb.ino`, omple la taula amb 3 colors que hagis creat:

| Color | Vermell R (0-255) | Verd G (0-255) | Blau B (0-255) |
|---|---|---|---|
| | | | |
| | | | |
| | | | |

3. **Repte:** fes que un color canviï a poc a poc cap a un altre. Quins? __________ → __________

## Activitat 3 · El panell de senyalització (Sessió 3)
Dissenya un panell que avisi de 3 **estats** amb color + so + relé.

| Estat | Color | So (brunzidor) | Relé (engegat o apagat) |
|---|---|---|---|
| Tot correcte | | | |
| Avís | | | |
| Alarma | | | |

- **Dibuix del circuit** (dibuixa'l o enganxa una foto): ______________________
- **Explica'l en 1 minut:** què fa el teu panell i una millora que li faries.

**Com ho he fet?** (la nota és de 0 a 10):
| | Nivell |
|---|---|
| El codi funciona i té comentaris que expliquen què fa (R1) | ☐ Encara no ☐ Bé ☐ Molt bé ☐ Excel·lent |
| El circuit està ben muntat i és segur (R2) | ☐ Encara no ☐ Bé ☐ Molt bé ☐ Excel·lent |

---

## Treball individual i ajuda entre companys

El panell és **teu**: el muntes, el programes i l'expliques tu. Però ningú aprèn sol: apunta cada sessió **qui t'ha ajudat i a qui has ajudat** (i en què). Això es valora a la rúbrica **R5**.

| | Sessió 1 | Sessió 2 | Sessió 3 |
|---|---|---|---|
| Qui m'ha ajudat i en què | | | |
| A qui he ajudat i en què | | | |

> 👥 **Si el docent et posa amb algú un moment**, repartiu-vos els papers: un **escriu** el codi i l'altre **comprova** que estigui bé. A mitja sessió, canvieu. El que entregues continua sent teu.

---

## Si t'encalles

1. **Pista 1:** explica amb paraules què ha de fer el circuit: quin LED s'encén, quan i quanta estona.
2. **Pista 2:** repassa els cables un per un amb l'esquema. Mira la **resistència** i que la **pota llarga** vagi al pin.
3. **Pista 3:** segueix **DEPURA** i, quan demanis ajuda, **explica què has provat ja**.

> **DEPURA:** **D**igues què esperaves i què passa · **E**xamina (el LED, el missatge d'error) · **P**rova **un sol canvi** cada vegada · **U**bica on és el problema · **R**epara i torna a provar · **A**punta-ho al quadern.

## Vols més?

- **Reptes ⭐:** [`Reptes/Reptes_SA2.md`](../../Reptes/Reptes_SA2.md) (semàfor, llum ambient, indicador de nivell).
- **Prova el semàfor sense placa (Wokwi):** l'enllaç és a l'[apartat final dels esquemes](SA2_esquemes_connexions.md).

---

## Pensar com un programador

Avui has fet dues coses que fan servir tots els programadors:
- **Seguir un ordre:** el semàfor fa sempre els mateixos passos, en el mateix ordre (vermell, verd, groc).
- **Posar nom a una feina que es repeteix:** la funció `color()` fa en una línia el que abans eren tres.

On has vist alguna cosa que es repeteix sempre igual? ______________________

## Revisió del codi d'un company (2 estrelles i un desig)

Mira el panell o el semàfor **d'un company o companya** (el codi i el circuit). **Primer, comprova aquestes tres coses** (marca ✓ o ✗):

| Comprova si… | ✓/✗ |
|---|---|
| El codi fa servir **noms clars** (`VERMELL`, `T_GROC`…) en lloc de números sense explicació — R1 | |
| Cada LED té la seva **resistència** i la **pota llarga** al pin — R2 | |
| Els **estats** del panell es distingeixen sense que te'ls expliquin (pel color i el so) — R1 | |

Ara escriu-li la teva opinió. **Fes servir el que has vist a la taula.** El desig ha de ser una millora concreta, i afegeix-hi un dubte que t'hagi sorgit:
- ⭐ Una cosa ben feta: ______________________
- ⭐ Una altra cosa ben feta: ______________________
- 💡 Una millora concreta: ______________________
- ❓ Un dubte que tinc del seu codi: ______________________

## Tiquet de sortida (abans de marxar)

1. Una cosa que he après avui: ______________________
2. Una cosa que encara no tinc clara: ______________________
3. On ho faria servir a la vida real: ______________________

## A la vida real

Els semàfors i els panells d'avisos fan que les ciutats i les fàbriques funcionin bé. Un LED gasta **molt menys** que una bombeta de les d'abans: estalvia energia (**ODS 7**) i ajuda a fer ciutats més sostenibles (**ODS 11**). Com faries que el teu panell gastés encara menys? ______________________

---

## Quadern tècnic (SA2)
- **La cosa nova més important que he après:** _______________________________________
- **Un error que he tingut i com l'he arreglat:** ___________________________________________
- **Diferència entre `digitalWrite` i `analogWrite`:** ___________________
