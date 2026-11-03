# 🐣 Projecte T1 · El teu tamagotchi

> **Per a qui és?** Per a cada alumne/a durant el 1r trimestre. És el dossier del
> primer robot del curs: peces, carcassa, muntatge, cablatge i rúbrica. La SA2
> hi aporta la carcassa, la llum i el so; la SA3, els botons, els sensors, la
> pantalla i el programa.

**Durada:** 1r trimestre (SA2-SA3) · **Maquinari:** UNO + mitja protoboard, pantalla OLED SSD1306 0,96" I²C, 3 polsadors, LED RGB, brunzidor, sensor de llum, micròfon, PIR (DHT11 opcional), carcassa en forma d'ou (DM 3 mm o impresa en 3D)

## El robot

El tamagotchi és una **mascota virtual de sobretaula**: un ou que a dins porta
el mateix Arduino UNO i la protoboard de classe. Al davant té una **pantalla**
on es veu la cara de la mascota i tres barres (gana, son i felicitat), **tres
botons** per cuidar-la (MENJAR, JUGAR, DORMIR) i els **sensors** que li fan
notar l'entorn: es fa fosc i té son, hi ha soroll i s'espanta, s'hi acosta algú
i es posa contenta. El LED RGB i el brunzidor expressen l'humor.

Les necessitats **baixen soles amb el temps** i més de pressa segons el que
noten els sensors. Si no la cuides es posa **trista** i després **malalta**,
però **mai no es mor**: sempre es recupera si l'atens. Cadascú li tria un
**nom** i un **caràcter**, i el tamagotchi reacciona d'acord amb aquest
caràcter. És un disseny propi del curs: no fa servir cap programa, gràfic ni
personatge del joguet comercial.

## Llista de peces

| Peça | D'on surt | Quantitat |
|---|---|---|
| Arduino UNO + cable USB | Kit de classe | 1 |
| Mitja protoboard + cables | Kit de classe | 1 |
| Pantalla OLED SSD1306 0,96" I²C (128×64) | **Compra nova** | 1 |
| Polsadors de 12 mm (o de 6 mm amb caputxó) | 1 del kit + **2 de compra nova** | 3 |
| LED RGB + 3 resistències de 220 Ω | Kit de classe (SA2) | 1 |
| Brunzidor piezo | Kit de classe (SA2) | 1 |
| Sensor de llum (LDR + 10 kΩ, o TEMT6000) | Kit de classe (SA3) | 1 |
| Micròfon (mòdul analògic) | Kit de classe | 1 |
| Sensor de moviment PIR | Kit de classe | 1 |
| DHT11 (temperatura, opcional) | Kit de classe | 1 |
| Carcassa en forma d'ou | Làser **o** 3D (vegeu sota) | 1 |
| Cargols M3 (i 4 separadors de 72 mm per a la versió làser) | Taller | 4 |

## Fabricació de la carcassa (SA2 · Sessió 3)

Les dues versions surten del **mateix fitxer paramètric**,
[`Recursos/peces_3d/tamagotchi_ou.scad`](https://github.com/tomeu-cd100/robotica-1batx-2627/blob/main/Recursos/peces_3d/tamagotchi_ou.scad),
i tenen els mateixos forats: finestra de la pantalla, tres botons, sensor de
llum, micròfon, PIR (el «nas») i LED RGB. Es fabriquen per torns mentre la
resta fa el panell de la SA2, **una per alumne/a**.

- **Tallada al làser** ([`tamagotchi_ou_laser.svg`](../../Recursos/plantilles_laser/tamagotchi_ou_laser.svg)):
  dues plaques d'ou de DM de 3 mm (davant i darrere) unides amb **4 separadors
  M3 de 72 mm**. Els costats queden oberts i es veu l'electrònica per dins.
  Es pot gravar el frontal per personalitzar-lo.
- **Impresa en 3D** (`MODE="closca"` i `MODE="tapa"`): una closca d'ou que
  s'imprimeix de cara avall i una tapa del darrere amb 4 cargols M3. La closca
  triga unes **6-8 h**: imprimeix-les amb antelació.

> 📏 **Abans de fabricar, el docent mesura el mòdul OLED** que s'ha comprat i
> ajusta els paràmetres `OLED_*` del fitxer (no tots els mòduls de 0,96" són
> iguals). Vegeu [`Recursos/peces_3d/LLEGEIX-ME.md`](../../Recursos/peces_3d/LLEGEIX-ME.md).

**Personalització (esbós a la SA2 S2):** cada alumne/a dissenya el gravat del
frontal (cara del voltant de la pantalla, el nom, orelles…) o tria el color
de filament, d'acord amb el caràcter que donarà al seu tamagotchi.

## Muntatge

1. Fixa la **pantalla** al frontal amb 4 cargols M2 (o cola calenta pels
   costats del PCB, mai sobre la pantalla).
2. Encaixa els **tres botons** als forats de sota la pantalla: MENJAR, JUGAR i
   DORMIR, d'esquerra a dreta.
3. Col·loca el **sensor de llum**, el **micròfon** i el **PIR** als seus forats,
   i el **LED RGB** al forat petit del costat.
4. A dins, posa el **UNO** i la **mitja protoboard** drets, un sobre l'altre,
   amb el connector USB cap al forat del lateral (3D) o cap al costat obert (làser).
5. Fes el cablatge (taula de sota) i tanca amb la tapa o la placa del darrere.

## Cablatge

Abans de res, prepara els **carrils d'alimentació de la protoboard**: un cable
del pin **5V** del UNO al carril vermell (+) i un del **GND** al carril blau
(−). Cableja sempre amb l'**USB desendollat**.

| Component | Pin | Notes |
|---|---|---|
| Pantalla OLED | SDA → A4 · SCL → A5 | VCC a 5 V, GND a GND. L'ordre dels pins canvia segons el model. |
| Botó MENJAR | D3 | Una pota al pin i la diagonal a GND (`INPUT_PULLUP`, com a SA3 P1). |
| Botó JUGAR | D5 | Igual. |
| Botó DORMIR | D7 | Igual. |
| LED RGB | D9 / D10 / D11 | Pins PWM, cada canal amb 220 Ω (com a la SA2). |
| Brunzidor | D8 | Pota + al pin, pota − a GND. |
| Sensor de llum | A1 | El divisor de la SA3 P2, o el TEMT6000. |
| Micròfon | A0 | Llindar a calibrar amb el Monitor sèrie. |
| PIR | D2 | 30-60 s d'estabilització en engegar. |
| DHT11 (opcional) | D4 | Cal la llibreria `DHT`. |
| NeoPixel (ampliació) | D6 | Només si hi cap a la memòria. |

## El programa

El programa es fa a la **[Pràctica 4 de la SA3 · El teu tamagotchi](../SA3/codi/05_mascota/EXPLICACIO.md)**,
amb l'esquelet `05_mascota.ino`: la pantalla i la baixada de les necessitats ja
hi són, i el botó MENJAR és l'exemple resolt. L'alumne/a hi programa els
botons JUGAR i DORMIR, els sensors (llegir → comparar → decidir) i els estats.
Cal la llibreria **U8g2**. La pantalla es fa servir abans a la
[Pràctica 3 · La pantalla OLED](../SA3/codi/03_pantalla_oled/EXPLICACIO.md).

## Simular el tamagotchi a Wokwi

[Wokwi](https://wokwi.com/) té l'Arduino UNO, la pantalla **SSD1306**, els
polsadors, el LED RGB, el brunzidor, el PIR i un fotoresistor, i accepta la
llibreria U8g2. Per provar el programa sense placa: crea un projecte nou
d'Arduino UNO, afegeix-hi els components amb el botó **+**, connecta'ls amb
els pins de la taula de cablatge i enganxa-hi el codi. El micròfon no hi és:
substitueix-lo per un **potenciòmetre** a A0 per simular el soroll.

## Què hi aporta cada SA

| SA | Sessions | Què s'hi construeix | Repte relacionat |
|---|---|---|---|
| SA2 | S1-S3 (S3 = fabricació de la carcassa) | La llum i el so de l'humor (LED RGB i brunzidor), els estats amb `const int` i la carcassa en forma d'ou. | `Reptes_SA2.md` |
| SA3 | S1-S3 (S4 = prova T1) | Els botons amb antirebot (P1), els sensors analògics i els llindars (P2), la pantalla (P3) i el tamagotchi complet (P4). | `Reptes_SA3.md` |

**Producte final (SA3-S3):** el tamagotchi dins de la seva carcassa, amb
necessitats que baixen amb el temps i amb els sensors, botons per cuidar-lo i
estats contenta, trista i malalta, més la seva **fitxa de personalitat** (nom,
caràcter, què fa cada botó i com l'afecten els sensors). **Versió nucli:** 2
necessitats, 2 botons, 1 sensor, contenta i trista. La S4 de SA3 és la prova
pràctica **T1**.

## Rúbrica del robot (producte SA3)

| Criteri | Insuficient (0-4) | Suficient/Bé (5-6) | Notable (7-8) | Excel·lent (9-10) |
|---|---|---|---|---|
| **R1 · Carcassa i muntatge** | Carcassa inacabada o cablatge insegur. | Carcassa funcional però amb algun cable fluix o desordenat. | Carcassa ferma, components ben fixats i cablatge endreçat. | Carcassa ferma i personalitzada, cablatge endreçat i etiquetat, res solt ni curtcircuitat. |
| **R2 · Funcionament** | La pantalla, els botons o els sensors clau no funcionen. | Pantalla i 2 botons funcionen; algun sensor falla. | Pantalla, botons i sensors funcionen, amb algun ajust. | Tot funciona a la primera i de manera fiable (botons sense rebots, llindars ben calibrats). |
| **R3 · Necessitats i estats** | Les necessitats no canvien o no hi ha estats. | Versió nucli: 2 necessitats, contenta i trista. | 3 necessitats i els estats trista i malalta, que es recupera quan el cuides. | Tot l'anterior, coherent amb el caràcter, amb `millis()` i sense `delay()` llargs. |
| **R4 · Fitxa de personalitat i demostració** | Sense fitxa o sense poder explicar el funcionament. | Fitxa bàsica o defensa amb ajuda. | Fitxa completa i defensa oral clara. | Fitxa completa i defensa oral que explica i justifica cada botó, sensor i estat. |

## Problemes freqüents

| Símptoma | Causa probable | Solució |
|---|---|---|
| La pantalla no s'encén | SDA i SCL intercanviats, o VCC i GND al revés. | Llegeix les lletres del mòdul: SDA a A4 i SCL a A5. |
| No compila: `U8g2lib.h` | Falta la llibreria. | **Eines → Gestiona les biblioteques** → «U8g2». |
| Un botó suma moltes vegades | Es compta mentre està premut. | Compara amb l'estat anterior (`ara == LOW && anterior == HIGH`). |
| Una necessitat cau a 0 de cop | Es resta a cada volta del `loop()`. | Resta-la només amb `millis()`, dins de `baixaAmbElTemps()`. |
| El PIR dispara sempre | Encara en el temps d'estabilització (30-60 s) o sensibilitat massa alta. | Espera i ajusta els potenciòmetres del mòdul. |
| El micròfon no detecta res | Llindar mal calibrat per al soroll de l'aula. | Mira els valors reals al Monitor sèrie i recalibra. |
| La pantalla no encaixa a la finestra | El mòdul comprat té unes altres mides. | Ajusta els paràmetres `OLED_*` del `.scad` i torna a fabricar el frontal. |

---

⬅️ Torna al teu camí: [Reptes de la SA2](../../Reptes/Reptes_SA2.md) · [Reptes de la SA3](../../Reptes/Reptes_SA3.md) · [El fil conductor dels tres robots](00_Fil_conductor_robots.md)
