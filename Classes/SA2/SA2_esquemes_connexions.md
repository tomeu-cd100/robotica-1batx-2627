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

---

## 3. Fade PWM (`03_fade_pwm.ino`)

Cal un pin amb `~` (PWM). El **PWM** encén i apaga la sortida molt de pressa: el **percentatge de temps encès** (cicle de treball) marca la brillantor mitjana.

![Concepte de PWM: tres cicles de treball (20%, 50%, 80%) amb els seus senyals quadrats i la brillantor resultant del LED (poca, mitja, molta llum)](img/sa2-pwm-concept.svg)

| Pin | Component | Via | Cap a |
|---|---|---|---|
| 9 ~ | LED | 220 Ω | GND |

> Circuit igual que un LED bàsic, però el pin **ha de tenir `~`** (3, 5, 6, 9, 10, 11) per fer `analogWrite`.

---

## 4. LED RGB — càtode comú (`04_rgb.ino`)

| Pin (PWM) | Canal | Via | Cap a |
|---|---|---|---|
| 9 | Vermell (R) | 220 Ω | càtode comú |
| 10 | Verd (G) | 220 Ω | càtode comú |
| 11 | Blau (B) | 220 Ω | càtode comú |

![Circuit del LED RGB de càtode comú: els pins PWM 9, 10 i 11 alimenten els canals vermell, verd i blau amb 220 Ω cadascun; el càtode comú va a GND](img/sa2-rgb.svg)

> Si el teu LED RGB és d'**ànode comú**, el comú va a **5 V** i els valors PWM s'inverteixen (255 = apagat).

---

## 5. Panell de senyalització (`05_panell_senyalitzacio.ino`)

| Pin | Component | Via | Cap a |
|---|---|---|---|
| 9 / 10 / 11 | LED RGB (R/G/B) | 220 Ω c/u | càtode comú a GND |
| 6 | Brunzidor piezo (+) | — | (−) a GND |
| 7 | Mòdul relé (IN) | — | VCC=5 V, GND=GND del mòdul |

> Combina el LED RGB (apartat 4) amb un brunzidor piezo al pin 6 i un mòdul relé al pin 7.
> ⚠️ El relé permet controlar càrregues; a l'aula es connecta a **baixa tensió** (LED de 5 V, petit motor). **No** connectar 230 V.

---

## Simulació interactiva (Wokwi)

El circuit del **semàfor** (apartat 2) es pot **simular en viu**:

- ▶ **Simulació interactiva:** <https://wokwi.com/projects/468009961823220737>
- **Projecte al repositori:** [`Simulacions/Wokwi/SA2_semafor/`](../../Simulacions/Wokwi/SA2_semafor/) (`diagram.json` + `sketch.ino`), per editar-lo o tornar-lo a carregar.

> Obre l'enllaç i prem **▶**: veuràs el semàfor funcionant (verd → groc → vermell).
