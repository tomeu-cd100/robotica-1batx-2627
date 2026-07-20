# SA2 · Esquemes i connexions

> 🧑‍🎓 **Quan toca?** Tingues aquesta pàgina oberta **mentre muntes** cada circuit. Correspondència amb la fitxa: **§1** → Activitat 1 (S1) · **§2** → Activitat 2 (S2) · **§3–§4** → Activitat 3 (S3) · **§5** → Activitat 4, el producte (S4).

> Reproduïbles a **Tinkercad Circuits** o **Wokwi**. Tots els LED porten **resistència de 220 Ω** en sèrie; el càtode (pota curta) va a **GND**.

---

## 1. LED bàsic (`01_led_basic.ino`)

| Pin | Component | Via | Cap a |
|---|---|---|---|
| 8 | LED | 220 Ω | GND |

![Captura de Tinkercad: Arduino UNO amb un LED verd i una resistència de 220 ohms a la protoboard, cable vermell del pin 8 a la resistència i cable negre de GND al càtode del LED](../SA1/img/sa1-tinkercad-blink-pin8.png)

> Mateix circuit d'un LED que a la SA1 (pin → 220 Ω → ànode; càtode → GND), i **exactament al pin 8** com aquí.
> ▶ Pots obrir-lo fet a **Tinkercad** (*Copy and Tinker* per modificar-lo): <https://www.tinkercad.com/things/frRjKG3t65m-sa1blinkinternledopciob?sharecode=GAxNpImV4w6b7voAyfgleBhy6jWHl5doUDeHF35HlTc>

---

## 2. Semàfor (`02_semafor.ino`)

| Pin | Component | Via | Cap a |
|---|---|---|---|
| 8 | LED vermell | 220 Ω | GND |
| 9 | LED groc | 220 Ω | GND |
| 10 | LED verd | 220 Ω | GND |

![Circuit del semàfor: els pins 8, 9 i 10 controlen tres LED (vermell, groc, verd), cadascun amb 220 Ω, amb els càtodes a una línia comuna de GND](img/sa2-semafor.svg)

**El mateix circuit, muntat a la protoboard:**

![Muntatge del semàfor a la protoboard: cada pin (8, 9, 10) va amb un cable de color a la seva columna, passa per la resistència de 220 ohms que salta el canal central, arriba a l'ànode del LED, i el càtode es connecta amb un pont al carril blau de massa, que torna al GND de l'Arduino](img/sa2-semafor-protoboard.svg)

**Al simulador i amb components reals:**

![Captura de Tinkercad del semàfor a la protoboard: tres LED (verd, groc i vermell) amb la seva resistència de 220 ohms, els càtodes amb cables negres al carril de massa, cables vermells de senyal cap als pins 8, ~9 i ~10 de l'Arduino UNO i retorn del carril a GND](img/sa2-tinkercad-semafor.png)

▶ **Obre la simulació a Tinkercad** (pots fer *Copy and Tinker* per modificar-la): <https://www.tinkercad.com/things/aYZvUenzQ6c-sa2-semafor?sharecode=RK48gLo9I5cgj1lBzIenLJUhcTMZFcBzePUGJtUvltU>

![Fotografia del muntatge real del semàfor: protoboard amb els tres LED (el vermell encès), resistències de 220 ohms, cables taronja de senyal cap als pins digitals de l'Arduino UNO i cable blanc de retorn a GND](img/sa2-muntatge-real-semafor.jpg)

> Fixa-t'hi: al muntatge real els colors dels cables no importen (aquí taronja i blanc), però **el camí elèctric és idèntic** al del diagrama: pin digital → resistència → ànode del LED → càtode → GND.

---

## 3. Fade PWM (`03_fade_pwm.ino`)

Cal un pin amb `~` (PWM). El **PWM** encén i apaga la sortida molt de pressa: el **percentatge de temps encès** (cicle de treball) marca la brillantor mitjana.

![Concepte de PWM: tres cicles de treball (20%, 50%, 80%) amb els seus senyals quadrats i la brillantor resultant del LED (poca, mitja, molta llum)](img/sa2-pwm-concept.svg)

| Pin | Component | Via | Cap a |
|---|---|---|---|
| 9 ~ | LED | 220 Ω | GND |

> Circuit igual que un LED bàsic, però el pin **ha de tenir `~`** (3, 5, 6, 9, 10, 11) per fer `analogWrite`.

**Al simulador:**

![Captura de Tinkercad del circuit del fade: Arduino UNO amb un LED verd a la protoboard, resistència de 220 ohms en sèrie, cable vermell de senyal del pin ~9 i cable negre de GND al carril de massa](img/sa2-tinkercad-fade.png)

▶ **Obre la simulació a Tinkercad** (pots fer *Copy and Tinker* per modificar-la): <https://www.tinkercad.com/things/c4frTqo45MQ-sa2-fade-pwm?sharecode=uEsFwkit-32KF6Z7yrBhDhUSFmkHnfpc53kKWrXdrfc>

---

## 4. LED RGB — càtode comú (`04_rgb.ino`)

| Pin (PWM) | Canal | Via | Cap a |
|---|---|---|---|
| 9 | Vermell (R) | 220 Ω | càtode comú |
| 10 | Verd (G) | 220 Ω | càtode comú |
| 11 | Blau (B) | 220 Ω | càtode comú |

![Circuit del LED RGB de càtode comú: els pins PWM 9, 10 i 11 alimenten els canals vermell, verd i blau amb 220 Ω cadascun; el càtode comú va a GND](img/sa2-rgb.svg)

> Si el teu LED RGB és d'**ànode comú**, el comú va a **5 V** i els valors PWM s'inverteixen (255 = apagat).

**Com es munta — variant A, el mòdul del kit (Keyestudio KS0312):**

El que tens al **Kit 3** és un **mòdul** amb els pins ja etiquetats: no cal protoboard. Quatre cables dupont directes:

| Pin del mòdul | Cap a l'Arduino |
|---|---|
| R | ~9 |
| G | ~10 |
| B | ~11 |
| − (o GND) | GND |

> El mòdul ja porta l'electrònica de suport a la placa; si tens dubtes de si porta resistències incorporades, afegir-hi les 220 Ω en sèrie **no fa cap mal** (només una mica menys de brillantor).

**Com es munta — variant B, LED RGB discret de 4 potes (el de Tinkercad):**

![Muntatge del LED RGB de 4 potes a la protoboard: la pota llarga (càtode comú) va amb un pont al carril de massa, que torna al GND de l'Arduino; cada pota de color passa per la seva resistència de 220 ohms que salta el canal central i arriba amb un cable de color als pins ~9 (R), ~10 (G) i ~11 (B)](img/sa2-rgb-protoboard.svg)

El camí elèctric és el mateix del semàfor, però **tres vegades dins d'un sol component**: cada canal fa pin PWM → 220 Ω → pota del seu color, i tots tres comparteixen el **càtode comú** (la **pota més llarga**), que va al carril de massa i torna a GND. Les quatre potes van a **quatre columnes diferents** de la protoboard; l'ordre habitual és **R · càtode · G · B**, amb el càtode com a segona pota des del costat pla.

**Al simulador:**

![Captura de Tinkercad del circuit del LED RGB: LED RGB de 4 potes a la protoboard amb les tres resistències de 220 ohms en sèrie i cables de senyal blau, verd i vermell cap als pins ~11, ~10 i ~9 de l'Arduino UNO, i cable negre del càtode comú al carril de massa que torna a GND](img/sa2-tinkercad-rgb.png)

▶ **Obre la simulació a Tinkercad** (pots fer *Copy and Tinker* per modificar-la): <https://www.tinkercad.com/things/9LwYhmKU7cE-sa2-led-rgb?sharecode=t-A5r44qV1flQMonUG_rtQFte36syN3U8sCEPQt7ruo>

---

## 5. Panell de senyalització (`05_panell_senyalitzacio.ino`)

| Pin | Component | Via | Cap a |
|---|---|---|---|
| 9 / 10 / 11 | LED RGB (R/G/B) | 220 Ω c/u | càtode comú a GND |
| 6 | Brunzidor piezo (+) | — | (−) a GND |
| 7 | Mòdul relé (IN) | — | VCC=5 V, GND=GND del mòdul |

> Combina el LED RGB (apartat 4) amb un brunzidor piezo al pin 6 i un mòdul relé al pin 7.
> ⚠️ El relé permet controlar càrregues; a l'aula es connecta a **baixa tensió** (LED de 5 V, petit motor). **No** connectar 230 V.

**Al simulador:**

![Captura de Tinkercad del circuit del panell de senyalització: LED RGB de 4 potes a la protoboard amb les tres resistències de 220 ohms cap als pins ~9, ~10 i ~11, brunzidor piezo connectat al mòdul relé i cables vermells de senyal des dels pins 6 i 7 de l'Arduino UNO](img/sa2-tinkercad-panell.png)

▶ **Obre la simulació a Tinkercad** (pots fer *Copy and Tinker* per modificar-la): <https://www.tinkercad.com/things/3eQhVzZTaCk-sa2-panell-de-senyalitzacio?sharecode=mfYAeNXK_DMBMN2YTYYJx3SthfZXTAW_xf2isvFoPWg>

---

## Simulació interactiva (Wokwi)

El circuit del **semàfor** (apartat 2) es pot **simular en viu**:

- ▶ **Simulació interactiva:** <https://wokwi.com/projects/468009961823220737>
- **Projecte al repositori:** [`Simulacions/Wokwi/SA2_semafor/`](../../Simulacions/Wokwi/SA2_semafor/) (`diagram.json` + `sketch.ino`), per editar-lo o tornar-lo a carregar.

> Obre l'enllaç i prem **▶**: veuràs el semàfor funcionant (verd → groc → vermell).
