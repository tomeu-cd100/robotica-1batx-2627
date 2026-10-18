# Reptes SA2 · Sortides digitals i PWM

> 🧑‍🎓 **Quan toca fer-ne un?** Els reptes són **extra ⭐**. Comença'n un quan ja tinguis fetes les pràctiques de la sessió. Tria'n **UN**, ensenya'l al docent quan funcioni i, si te'l valida, pinta l'estrella al [tauler de reptes](../Classes/00_General/00_Tauler_reptes.md).

**Tria UN dels tres reptes.** Tots fan servir **diversos LED** o la **llum que respira** (`analogWrite`, de 0 a 255, en pins amb `~`). Els tres tenen un **mínim** igual de difícil i després **nivells** per anar més lluny. Els pots provar abans a Tinkercad o a Wokwi.

> **El codi de partida** és a les pràctiques de la SA2 (`Classes/SA2/codi/`).

> **Com si fos un encàrrec de veritat:** cada repte té un **client** (qui te l'encarrega), una **cosa a entregar** i **on es fa servir** a la vida real.

---

## 🚦 Repte A · Semàfor d'una cruïlla

**De què va.** Programa un semàfor de cotxes amb uns temps semblants als d'un semàfor de veritat.

> *Client: l'ajuntament · Entregues: el semàfor d'una cruïlla · A la vida real: els semàfors del teu poble o ciutat.*

**Què practiques.** Encendre 3 LED en un ordre concret i amb temps diferents.

**El mínim.**
- 3 LED (vermell, groc, verd) que s'encenen en l'**ordre correcte**, cada color amb el seu temps.
- Comentaris al codi que diguin quin LED va a cada pin.

**Nivells per anar més lluny.**
1. *(bàsic)* Posa **noms** (constants) als pins i als temps, com a la Pràctica 2.
2. *(notable)* Afegeix un **semàfor per a vianants**: quan els cotxes tenen vermell, els vianants tenen verd.
3. *(⭐⭐⭐)* Posa cada color en una **funció** (`cotxesPassen()`, `cotxesEsperen()`…) perquè el `loop()` quedi curt i clar.

    **Comprova-ho així** (en ordre):
    1. Una fase (per exemple, «els cotxes passen») és dins d'una funció que deixa **els tres LED** com toca, i el semàfor funciona igual que abans.
    2. Totes les fases són funcions i el `loop()` només les crida una darrere l'altra. Al `loop()` no hi queda cap `digitalWrite`.
    3. Per canviar quant dura una fase, només has de canviar **un número**. Prova-ho.

---

## 💡 Repte B · Llum d'ambient

**De què va.** Un llum per a una habitació que **s'encén i s'apaga a poc a poc** (com si respirés) o que **canvia de color**.

> *Client: una botiga de decoració · Entregues: un llum d'ambient · A la vida real: els llums de colors de les habitacions i les cases intel·ligents.*

**Què practiques.** La llum que respira (`analogWrite`, de 0 a 255) i el `for` per fer canvis suaus.

**El mínim.**
- Un LED en un pin amb `~` que **respira** (puja i baixa de llum) amb un `for`, com a la Pràctica 3.
- Comentaris al codi.

**Nivells per anar més lluny.**
1. *(bàsic)* Fes que la **velocitat** de la respiració depengui d'una variable.
2. *(notable)* Fes-ho amb el **LED RGB**: que passi a poc a poc d'un color a un altre.
3. *(⭐⭐⭐)* Fes que passi per **tots els colors de l'arc de Sant Martí**, un darrere l'altre.

    **Comprova-ho així** (en ordre):
    1. Tens la funció `color(r, g, b)` de la Pràctica 4 i l'has provada amb 3 o 4 colors fixos (vermell, groc, blau cel…).
    2. El canvi entre **dos** colors es fa a poc a poc amb un `for` (un color puja mentre l'altre baixa), sense salts.
    3. Passa per tots els colors i torna al primer, i es repeteix sense cap salt brusc.

---

## 📊 Repte C · Indicador de nivell (barra de LED)

**De què va.** Una **barra de LED** que s'omple de mica en mica, com l'indicador de bateria del mòbil o el del volum.

> *Client: una fàbrica de màquines · Entregues: un indicador de nivell · A la vida real: la bateria del mòbil, el nivell d'un dipòsit, el volum d'un altaveu.*

**Què practiques.** Encendre molts LED segons un número, fent servir repeticions (`for`).

**El mínim.**
- 4 o 5 LED que s'encenen **un darrere l'altre** segons un nivell (de moment, un número que tu poses al codi).
- Comentaris al codi.

**Nivells per anar més lluny.**
1. *(bàsic)* Encén els LED amb un **`for`**, com a la Pràctica 3, en lloc d'escriure una línia per a cada LED.
   - **Si vols anar més lluny:** guarda tots els pins en una **llista** (un *array*): `const int LEDS[] = {8, 9, 10, 11};`. Després, dins del `for`, fes servir `LEDS[i]` per anar d'un LED a l'altre. Les llistes encara no les hem fet a classe: això és tot el que necessites saber.
2. *(notable)* Fes que el nivell **pugi i baixi** sense parar, com les barres que es mouen amb la música.
3. *(⭐⭐⭐)* Canvia l'últim LED pel **LED RGB** i fes que passi de **verd a vermell** com més ple estigui.

    **Comprova-ho així** (en ordre):
    1. El LED RGB és **verd** quan el nivell és baix i **vermell** quan és alt (prova-ho posant tu el nivell al codi).
    2. Amb `map()` calcules quant vermell i quant verd toca a cada nivell. Mira els números al Monitor Sèrie: van de 0 a 255, i quan un puja l'altre baixa.
    3. Mentre la barra puja i baixa, el color canvia **a poc a poc** i sempre va d'acord amb els LED que estan encesos.

---

## 🎨 Fes-lo teu (decideix-ho abans de començar)

> El repte diu **què** ha de fer el circuit. **Per a què serveix, ho tries tu.** Apunta-ho al quadern:
> - **A:** fixa't en un **semàfor de veritat** que coneguis. Quant dura el verd?
> - **B:** tria **per a quina habitació** és el llum i quins colors tindrà.
> - **C:** decideix **què mesura la barra**: el volum, l'aigua d'un dipòsit, la llum… i posa-hi unitats.

## Què necessites
- Arduino UNO + cable USB · de 3 a 5 LED + resistències de 220 Ω (o el LED RGB) · cables i protoboard · o **Tinkercad/Wokwi**.

## Per on començar
1. **Pensa:** quants LED necessito, i en quin ordre s'han d'encendre?
2. **Dibuixa:** fes un dibuix dels cables i apunta l'ordre de les llums (què passa primer, què després).
3. **Comença d'una pràctica:** parteix del codi d'una pràctica de la SA2 (el semàfor, la llum que respira, el RGB o el panell).
4. **Prova:** comprova els temps i els colors. Si alguna cosa no va, segueix DEPURA.
5. **Millora:** posa noms als números, fes funcions i prova un nivell més.

## Com es corregeix
| Rúbrica | Què es mira |
|---|---|
| **R1** (codi) | Que el codi estigui ordenat (per exemple, una funció per a cada fase). |
| **R2** (circuit) | Que els LED estiguin ben connectats, cadascun amb la seva resistència. |
| **R4** (quadern) | El dibuix dels cables i el que has apuntat al quadern tècnic. |

## Què entregues
- El codi `.ino` amb comentaris + el **dibuix dels cables** + l'entrada al quadern tècnic.

---

## Orientació docent
- **Errors freqüents:** confondre `analogWrite` (0–255) amb nivells digitals; usar PWM en un pin **sense** `~`; oblidar resistències; ordre de fases del semàfor incorrecte.
- **Diferenciació:** el mínim assegura la base (seqüència/fade/barra); les ampliacions porten a arrays, RGB i funcions.
- **Gestió d'aula:** el repte A enllaça amb `02_semafor`; el B amb `03_fade_pwm`/`04_rgb`; el C amb `05_panell_senyalitzacio`. Tot simulable.
- **Vincle avaluació:** producte amb esquema (R2/R4) coherent amb el material de la SA2.

---

## 🤖 Cap al robot del trimestre

Aquest trimestre, tot el que fas serveix per a la **mascota** ([dossier](../Classes/00_General/00_Projecte_T1_Mascota.md) · [fil conductor](../Classes/00_General/00_Fil_conductor_robots.md)):

- **Repte A (semàfor)** → els colors d'humor de la mascota als ulls: contenta, normal o enfadada.
- **Repte B (llum d'ambient)** → els ulls que «respiren» quan la mascota dorm.
- **Repte C (indicador de nivell)** → el termòmetre d'emoció de la mascota: el LED passa de verd (tranquil·la) a vermell (molt nerviosa).

El que programes al repte és **una expressió de la teva mascota**: guarda el codi, que el faràs servir quan la caixa estigui tallada.
