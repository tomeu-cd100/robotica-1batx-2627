# 🔧 Muntatge del braç MeArm V1.1

> **Per a qui és?** Per a cada alumne/a durant els **torns de taller** del
> 2n trimestre: el MeArm és el robot de SA4-SA6 ([dossier del braç](00_Projecte_T2_Brac.md)).
> Segueix els **18 passos de la guia oficial** en el mateix ordre, de manera
> que es pot tenir aquesta pàgina i les fotos originals obertes alhora.

<div class="nomes-docent" markdown="1">

> 🧑‍🏫 **Per al docent: el prototip abans de Nadal.** Munta un MeArm amb el
> nostre DM i els nostres servos, cronometra'l i omple el
> [registre del prototip](#registre-del-prototip). Si falla, el pla B és
> `brac.svg` (vegeu el [dossier](00_Projecte_T2_Brac.md)).

</div>

**Durada:** unes 2 h repartides en torns de taller (SA4 S1-S3) · **Maquinari:** peces de `brac_MeArm_v1.1.svg` en DM 3 mm, 4 servos (servo Starter, 2 KS0194 i 1 MG90S), cargols M3, Arduino UNO **o** micro:bit V2 + Micro:shield, alimentació externa per als servos

## Abans de començar

**Fotos oficials.** La guia original és sobretot fotogràfica i les fotos no
es poden copiar aquí (llicència no comercial). Descarrega-la i tingues-la al
costat: [MeArmV1.1.pdf](https://github.com/phenoptix/MeArm/blob/master/hardware/Robot%20Chassis/v1/MeArmV1.1.pdf)
(repositori de phenoptix). A cada pas d'aquesta pàgina hi ha la
**pàgina del PDF** on en surten les fotos.

**Peces.** Cada peça té un **número gravat** (en vermell a la plantilla).
Alguns números es repeteixen perquè hi ha peces bessones (per exemple, dues
`5`, tres `17` o tres `20`). Abans de començar:

- Treu totes les peces del tauler i comprova que cap no s'ha quedat enganxada
  per un tall incomplet.
- Prova d'encaixar **una pestanya en una ranura** qualsevol. Les ranures fan
  **3,0 mm justos**:
  - si el DM entra a pressió forta, **no el forcis**: llima la ranura (o
    torna a tallar amb el DM més prim);
  - si queda fluix, el braç tremolarà però funcionarà; anota-ho.

**Material i eines.**

| Element | Notes |
|---|---|
| 4 servos | El kit en té 3 per alumne/a; el 4t és un **MG90S** comprat pel centre, que va al **servo dret** (és el que fa més força). Guarda les **banyes** (*servo horns*) i els cargolets que porten. |
| Cargols M3 de cap Allen | Mides que cita la guia: **8, 10, 12 i 20 mm**. Les quantitats exactes, a la [taula del prototip](#registre-del-prototip). |
| 4 femelles M3 | Per als cargols de 20 mm de la base. |
| Clau Allen M3 i tornavís petit d'estrella | El tornavís és per als cargolets de les banyes. |
| Alicates de tall | Per escurçar les banyes si sobresurten de la palanca. |

> 💡 **Com funcionen les unions.** A la plantilla hi ha dos tipus de forat
> rodó: d'uns **2,6 mm** i d'uns **3,0 mm**. El cargol M3 passa lliure pel de
> 3,0 mm i **fa la seva pròpia rosca** al de 2,6 mm (és *autoroscant*). Per
> això les articulacions giren al voltant del cargol: la peça del forat gran
> balla i la del forat petit queda collada.

> ⚠️ **DM no és metacrilat.** El DM aguanta molt menys la rosca que el
> metacrilat de l'original. Colla cada cargol **fins que ofereixi
> resistència i prou**. Si un forat es passa de rosca, posa-hi un cargol que
> travessi les dues peces amb una femella al darrere.

## Pas 0 · Centra els servos abans de muntar res

La guia oficial insisteix que els servos s'han de preparar **abans** de
muntar: si una banya queda mal orientada, cal desmuntar mig braç. Amb
l'Arduino del curs, carrega aquest programa, connecta els servos un per un
i deixa'ls tots a **90°** (el centre del recorregut):

```cpp
// Centra els 4 servos a 90 graus abans de muntar les banyes
#include <Servo.h>

Servo base, esquerre, dret, pinca;

void setup() {
  base.attach(9);
  esquerre.attach(6);
  dret.attach(10);
  pinca.attach(11);
  base.write(90);
  esquerre.write(90);
  dret.write(90);
  pinca.write(90);
}

void loop() {
}
```

> ⚠️ **Alimentació:** amb un sol servo connectat n'hi ha prou amb l'USB.
> Per moure'n **més d'un alhora**, alimenta'ls amb piles i uneix el GND de
> les piles amb el GND de l'Arduino, com al [dossier del braç](00_Projecte_T2_Brac.md#cablatge).

Si fas la **versió micro:bit**, no cal aquest programa: el receptor ja posa
els quatre servos a 90° en arrencar (vegeu [Connexions i programa](#connexions-i-programa)).

Enganxa una **etiqueta** a cada servo (base, esquerre, dret, pinça) i no els
moguis amb la mà a partir d'ara.

## Muntatge pas a pas

El muntatge es reparteix en **torns de taller** al final de les sessions de la
SA4. Cada bloc aprofita el que la sessió t'acaba d'ensenyar:

| Sessió | Blocs | Temps | Per què ara |
|---|---|---|---|
| SA4 · S1 | Pas 0 + A + B | ~35' | La pràctica del dia és el servo: el `write(90)` del pas 0 surt d'aquí. |
| SA4 · S2 | C + D | ~40' | El calibratge del bloc D fa servir l'escombrada que vas programar a la S1. |
| SA4 · S3 | E | ~45' | El bloc més llarg. El pas 15 es fa en parella: tothom ajuda i és ajudat. |
| SA4 · S4 | Cablatge | ~20' | Servos i potenciòmetres al seu pin definitiu ([dossier](00_Projecte_T2_Brac.md#cablatge)). |

### Bloc A · Preparació (passos 1-3)

1. **Tall** (PDF p. 3). Ja fet. La guia original diu que el disseny tolera
   imprecisions de tall i de material.
2. **Servos** (PDF p. 3-4). Fet al pas 0: la guia original fa servir la seva
   placa *Brains*; nosaltres, l'Arduino UNO.
3. **Banyes a les palanques** (PDF p. 5-6). Cargola cada banya a la seva
   peça amb els **cargolets punxeguts** que venen amb el servo. Segons les
   fotos, porten banya:
   - la **placa central** amb el forat gran al mig (`14`): banya en creu o
     doble, per al servo de la base;
   - la **palanca llarga** amb ranures (`13`);
   - una **palanca curta** amb forat gran;
   - l'**engranatge** amb la pestanya (`30`), que obre i tanca la pinça.

   Si la banya sobresurt de la peça, escurça-la amb les alicates. Guarda en
   una bossa els **cargols petits del centre de la banya**: es fan servir als
   passos 9-11 i 18.

### Bloc B · Base i laterals (passos 4-6)

4. **Base** (PDF p. 7-9).
   1. Posa el **collaret** al servo de la base i cargola'l a la **base
      petita** (la peça en forma de rombe, `2`) amb **2 cargols de 8 mm**.
   2. Passa **4 cargols de 20 mm** per la **base gran** (`1`, la del logotip)
      i enrosca'n les femelles fins a mitja llargada.
   3. Enrosca els 4 cargols a la base petita fins que gairebé arribin a
      la cara de dalt.
   4. Ara colla les femelles contra la base gran.
5. **Lateral esquerre** (PDF p. 10). Passa el servo pel seu collaret i
   cargola el conjunt a la placa lateral amb **2 cargols de 8 mm**.
6. **Lateral dret** (PDF p. 11-12). Igual que l'esquerre. Comprova-ho
   posant els dos laterals de cara: els cossos dels servos han de quedar
   **a les cares exteriors**, mirant enfora.

### Bloc C · Pinça (passos 7-8)

7. **Pinça, primera part** (PDF p. 13). Passa el servo de la pinça pel
   collaret, posa-hi les peces laterals (**l'orientació importa**: compara
   amb la foto) i cargola-hi la base de la pinça amb **4 cargols de 8 mm**.
8. **Pinça, segona part** (PDF p. 14). Munta els **dits** i els
   **engranatges** amb **un cargol de 8 mm, un de 10 mm i un de 12 mm**,
   seguint les fotos. Els dits han de girar sense fregar.

### Bloc D · Calibratge (passos 9-11)

Aquí es posen les banyes del bloc A als servos. El servo és a 90° des del
pas 0; ara es tracta d'encaixar la banya en la posició bona.

9. **Pinça** (PDF p. 15-16). Encaixa l'engranatge amb banya (`30`) a l'eix
   del servo **sense collar-lo**. Amb un programa d'escombrat (per exemple
   el de la SA4), comprova que la pinça **es tanca del tot** a un extrem i
   s'obre a l'altre. Si no, treu la banya, gira-la **una dent** i torna-ho a
   provar. Quan vagi bé, colla el cargol petit del centre.
10. **Esquerre** (PDF p. 17). Igual, amb la seva palanca. Comprova que la
    palanca **no passa mai per on anirà la base**.
11. **Dret** (PDF p. 18). Igual que l'esquerre.

> 📝 **Anota els angles límit** de cada servo (on la peça toca o està a punt
> de tocar). Al codi del braç no s'han de superar mai: un servo que força el
> topall s'escalfa i es crema.

### Bloc E · Estructura central (passos 12-18)

> ⚠️ **La regla d'or d'aquest bloc:** les articulacions han de quedar
> **fluixes, com les d'una titella**. Si una unió frega, el servo ha de fer
> força contra la mateixa estructura i el braç tremola o s'encalla. Després
> de cada unió, mou-la amb el dit: ha de caure pel seu propi pes.

12. **La peça del mig** (PDF p. 18). Munta les barres del mig. Han de
    moure's **en línia recta** i sense fregar.
13. **Lateral esquerre a la base** (PDF p. 19-20). **Pas difícil.** S'hi
    ajunten el lateral esquerre, la peça del mig, el **travesser davanter**
    i la **placa central**.
14. **Palanques de l'esquerre** (PDF p. 21-23). Afegeix el **travesser del
    darrere** i les palanques del costat esquerre. Fluix!
15. **Lateral dret i travesser central** (PDF p. 24-25). **El pas més
    difícil de tot el muntatge.** Calen **dues persones**: una aguanta
    l'estructura alineada i l'altra hi passa els cargols. Encara que costi,
    després d'aquest pas tot és fàcil.
16. **Palanques de la dreta** (PDF p. 26-28). Fàcil. Atenció a
    l'**orientació de la peça en forma de Y**: compara-la amb la foto abans
    de cargolar.
17. **La pinça al braç** (PDF p. 29). **Tres cargols.**
18. **Tot a la base** (PDF p. 30-31). **Un cargol** uneix el braç a la
    banya de la base: és el cargol petit de la bossa. Comprova que la base
    gira **90° a cada banda** des del centre. Si no, treu el cargol, gira la
    banya una dent i torna-hi.

## Connexions i programa

El MeArm es pot governar de **dues maneres**. Totes dues fan servir els
mateixos noms de servo (base, esquerre, dret, pinça) i els mateixos angles
límit que has anotat al bloc D. **La del curs és la versió Arduino**: a la
SA5 s'hi afegeix el comandament per ràdio a través d'una micro:bit pont
(vegeu el [dossier](00_Projecte_T2_Brac.md#cablatge)). La versió micro:bit
és el **pla B**, per si el pont no funciona amb el maquinari real.

| | Versió Arduino | Versió micro:bit |
|---|---|---|
| Cervell | Arduino UNO | micro:bit **V2** + Micro:shield |
| Com es controla | 4 potenciòmetres a la taula | una 2a micro:bit a la mà, per ràdio |
| Llenguatge | C++ (com la SA4 i la SA6) | MicroPython (com la SA5) |
| Material extra | 1 potenciòmetre (el kit en porta 3) | 2 micro:bit, una d'elles V2 |

> 🤔 **Quin servo lateral fa què?** Un fa **avançar i recular** el braç i
> l'altre el fa **pujar i baixar**. Depèn de com l'hagis muntat: mou-los un
> per un i escriu-ho a l'etiqueta del servo.

### Versió Arduino: 4 servos + 4 potenciòmetres

![Esquema de connexions del MeArm amb Arduino: les piles alimenten els quatre servos per una línia + i una de GND, amb el GND de les piles unit al GND de l'Arduino; senyals a D6 (esquerre), D9 (base), D10 (dret) i D11 (pinça); quatre potenciòmetres alimentats pel 5V de l'Arduino amb el cursor a A0, A1, A2 i A3](img/mearm-connexions-arduino.svg)

| Component | Pin | Notes |
|---|---|---|
| Servo base | D9 | Igual que al [dossier del braç](00_Projecte_T2_Brac.md#cablatge). |
| Servo esquerre | D6 | Servo nou del MeArm. |
| Servo dret | D10 | Ocupa el lloc del colze. |
| Servo pinça | D11 | Igual que al dossier. |
| Potenciòmetre base | A0 | Extrems a 5V i GND de l'Arduino. |
| Potenciòmetre dret | A1 | |
| Potenciòmetre pinça | A2 | |
| Potenciòmetre esquerre | A3 | El 4t potenciòmetre. |
| Piles: + | + dels 4 servos | Només els servos. |
| Piles: − | − dels 4 servos **i GND de l'Arduino** | GND comú: sense ell, els servos fan coses estranyes. |

> ⚠️ **Mai alimentar 4 servos des de l'USB** ni des del pin 5V del UNO.
> Els potenciòmetres sí que van al 5V de l'Arduino: gasten molt poc.

**Com funciona el programa.** Cada volta del `loop()` llegeix els quatre
potenciòmetres i els converteix amb `map()` **al rang segur de cada servo**,
no a 0-180°. Així, per molt que giris el potenciòmetre, el servo mai arriba
al topall. Dos detalls més:

- **Zona morta:** el servo només es mou si l'angle canvia més de 2°. El
  potenciòmetre sempre té una mica de soroll i, sense això, el braç tremola.
- **Arrencada sense salt:** al `setup()` es fa el `write()` **abans** de
  l'`attach()`. El servo s'engega directament a la posició del potenciòmetre
  en lloc de saltar primer a 90°.

Obre el **Monitor sèrie** (9600): cada mig segon hi surten els quatre angles.
És la manera més ràpida de trobar els angles límit i copiar-los a les
constants `_MIN` i `_MAX` del principi.

<details markdown="1">
<summary>Desplega el codi complet (<code>T2_mearm_arduino.ino</code>)</summary>

```cpp
// Codi de referencia del brac MeArm V1.1 - VERSIO ARDUINO
// 4 servos controlats amb 4 potenciometres, cadascun dins del seu rang segur.
// Cablatge: el de la guia 00_Muntatge_brac_MeArm.md (versio Arduino).
// ATENCIO: els 4 servos amb ALIMENTACIO EXTERNA (piles) i GND comu. Mai per USB
// ni pel pin 5V de l'UNO.
//
// Truc per trobar els angles limit: obre el Monitor serie (9600). Cada mig
// segon s'hi escriuen els 4 angles. Mou un potenciometre a poc a poc fins que
// la peca toqui, i anota l'angle una mica abans.

#include <Servo.h>

const int PIN_SERVO_BASE = 9;
const int PIN_SERVO_ESQUERRE = 6;   // servo nou del MeArm
const int PIN_SERVO_DRET = 10;      // ocupa el lloc del colze del brac de 3 servos
const int PIN_SERVO_PINCA = 11;

const int PIN_POT_BASE = A0;
const int PIN_POT_DRET = A1;
const int PIN_POT_PINCA = A2;
const int PIN_POT_ESQUERRE = A3;    // 4t potenciometre (el kit en porta 3)

// Limits d'angle REALS de cada servo: canvieu-los pels que heu anotat al
// bloc D de la guia. El servo mai ha de forcar el topall mecanic.
const int BASE_MIN = 0,      BASE_MAX = 180;
const int ESQUERRE_MIN = 40, ESQUERRE_MAX = 150;
const int DRET_MIN = 40,     DRET_MAX = 150;
const int PINCA_MIN = 60,    PINCA_MAX = 120;   // tancada .. oberta

// Zona morta: nomes es mou el servo si l'angle nou canvia mes d'aquests
// graus. Aixi el soroll del potenciometre no fa tremolar el brac.
const int ZONA_MORTA = 2;

Servo base, esquerre, dret, pinca;

int angleBase, angleEsquerre, angleDret, anglePinca;
unsigned long tDarrerInforme = 0;

// Llegeix un potenciometre i el converteix al rang segur del seu servo
int llegeixAngle(int pinPot, int minim, int maxim) {
  return map(analogRead(pinPot), 0, 1023, minim, maxim);
}

// Escriu l'angle nou nomes si s'allunya prou de l'actual
void mouSiCal(Servo &servo, int &actual, int nou) {
  if (abs(nou - actual) > ZONA_MORTA) {
    actual = nou;
    servo.write(actual);
  }
}

void setup() {
  Serial.begin(9600);

  // Primer es calcula la posicio dels potenciometres i despres s'engega cada
  // servo: aixi el brac no fa un salt a 90 graus en arrencar.
  angleBase = llegeixAngle(PIN_POT_BASE, BASE_MIN, BASE_MAX);
  angleEsquerre = llegeixAngle(PIN_POT_ESQUERRE, ESQUERRE_MIN, ESQUERRE_MAX);
  angleDret = llegeixAngle(PIN_POT_DRET, DRET_MIN, DRET_MAX);
  anglePinca = llegeixAngle(PIN_POT_PINCA, PINCA_MIN, PINCA_MAX);

  base.write(angleBase);
  esquerre.write(angleEsquerre);
  dret.write(angleDret);
  pinca.write(anglePinca);

  base.attach(PIN_SERVO_BASE);
  esquerre.attach(PIN_SERVO_ESQUERRE);
  dret.attach(PIN_SERVO_DRET);
  pinca.attach(PIN_SERVO_PINCA);
}

void loop() {
  mouSiCal(base, angleBase, llegeixAngle(PIN_POT_BASE, BASE_MIN, BASE_MAX));
  mouSiCal(esquerre, angleEsquerre, llegeixAngle(PIN_POT_ESQUERRE, ESQUERRE_MIN, ESQUERRE_MAX));
  mouSiCal(dret, angleDret, llegeixAngle(PIN_POT_DRET, DRET_MIN, DRET_MAX));
  mouSiCal(pinca, anglePinca, llegeixAngle(PIN_POT_PINCA, PINCA_MIN, PINCA_MAX));

  // Informe al Monitor serie sense delay(): el control no s'atura mai
  if (millis() - tDarrerInforme > 500) {
    tDarrerInforme = millis();
    Serial.print("base=");
    Serial.print(angleBase);
    Serial.print("  esquerre=");
    Serial.print(angleEsquerre);
    Serial.print("  dret=");
    Serial.print(angleDret);
    Serial.print("  pinca=");
    Serial.println(anglePinca);
  }

  delay(20);   // ~50 actualitzacions/s: suficient i suau
}
```

</details>

### Versió micro:bit: comandament + receptor

![Esquema de connexions del MeArm amb micro:bit: la micro:bit comandament envia ordres per ràdio a una micro:bit V2 endollada al Micro:shield; base a P0, dret a P1, pinça a P2 i esquerre a P8, cada servo al seu connector de tres pins del shield; piles a l'entrada externa del shield](img/mearm-connexions-microbit.svg)

| Component | Pin (Micro:shield) | Notes |
|---|---|---|
| Servo base | P0 | Connector de 3 pins del shield (S, +, −). |
| Servo dret | P1 | |
| Servo pinça | P2 | |
| Servo esquerre | P8 | Servo nou del MeArm. |
| Piles | Entrada externa del shield | Alimenten els 4 servos. |
| Ràdio | — | Mateix **grup** a les dues plaques (el teu número de llista). |

> ⚠️ **Cal una micro:bit V2 per al receptor.** La V1 només pot generar el
> senyal de servo a **3 pins alhora**, i el MeArm en necessita 4. El
> comandament pot ser una V1.

> ⚠️ **Servos mai pel 3V de la micro:bit ni per l'USB:** sempre per
> l'alimentació externa del shield.

**Com es reparteix la feina.** Hi ha **dos programes**, un per placa:

- El **comandament** no mou res. Mira la inclinació i els botons i envia
  ordres de text curtes per ràdio: `B+`/`B-` (base), `D+`/`D-` (dret),
  `E+`/`E-` (esquerre), `P` (pinça) i `G` (grava). És el **mateix
  comandament** que el del curs: el receptor simplement ignora la `G`.
- El **receptor** guarda l'angle actual de cada servo. Cada ordre el mou
  **3°** (constant `PAS`) i la funció `limita()` no el deixa sortir mai del
  rang segur. En arrencar posa els quatre servos a 90°: et serveix de
  **pas 0** per centrar-los.

| Gest al comandament | Ordre | Què fa el braç |
|---|---|---|
| Inclinar esquerra / dreta | `B+` / `B-` | Gira la base. |
| Inclinar davant / enrere | `D+` / `D-` | Mou el servo dret. |
| Mantenir A / mantenir B | `E+` / `E-` | Mou el servo esquerre. |
| A i B alhora | `P` | Obre o tanca la pinça (una vegada per pulsació). |
| Sacsejar | `G` | Res en aquesta versió (grava un punt amb la màquina d'estats de la SA6). |

> 💡 **La micro:bit no té `Servo.write()`.** El receptor fabrica el senyal
> a mà amb `write_analog()`: un pols cada 20 ms que dura de 0,5 ms (0°) a
> 2,5 ms (180°). És exactament el que fa la llibreria `Servo` de l'Arduino
> per dins.

<details markdown="1">
<summary>Desplega el codi complet (<code>T2_brac_microbit_comandament.py</code>)</summary>

```python
# Codi de referencia del Projecte T2 - Brac robotic MeArm (NOMES DOCENT)
# COMANDAMENT: la 2a micro:bit, la que es te a la ma. No mou cap servo:
# envia ordres de text per radio.
#   Inclina esquerra/dreta   -> "B+" / "B-"  base
#   Inclina davant/enrere    -> "D+" / "D-"  servo dret
#   Mantens el boto A        -> "E+"         servo esquerre
#   Mantens el boto B        -> "E-"         servo esquerre
#   A i B alhora             -> "P"          obre/tanca la pinca
#   Sacseja                  -> "G"          grava el punt actual (replay, SA6)
# Pla per defecte: les ordres les rep la micro:bit PONT, que les passa a
# l'Arduino (T2_brac_microbit_pont.py + T2_brac_estats.ino). Els botons A i B
# del PONT (no d'aquesta) canvien d'estat: A repos/manual, B reprodueix.
# Versio micro:bit del MeArm (contingencia): les rep
# T2_mearm_microbit_receptor.py, que ignora la "G".

from microbit import *
import radio

GRUP = 10        # CANVIA'L pel teu numero de llista (les 2 plaques igual)
LLINDAR = 300    # inclinacio minima perque compti (evita moure's sol)

radio.on()
radio.config(group=GRUP)

pinca_enviada = False   # per enviar "P" una sola vegada per cada A+B

while True:
    x = accelerometer.get_x()
    y = accelerometer.get_y()

    if x > LLINDAR:
        radio.send("B+")
    elif x < -LLINDAR:
        radio.send("B-")

    if y > LLINDAR:
        radio.send("D+")
    elif y < -LLINDAR:
        radio.send("D-")

    # Es llegeixen els dos botons UNA vegada, a variables
    boto_a = button_a.is_pressed()
    boto_b = button_b.is_pressed()

    if boto_a and boto_b:
        # Si mantens A+B la pinca no ha d'obrir-se i tancar-se sense parar:
        # nomes s'envia la primera volta
        if not pinca_enviada:
            radio.send("P")
            pinca_enviada = True
        display.show(Image.TARGET)
    elif accelerometer.was_gesture("shake"):
        pinca_enviada = False
        # Nomes s'envia l'ordre: qui confirma que el punt s'ha gravat de debo
        # es el BRAC (Monitor serie). Aqui, una fletxa d'"enviat".
        radio.send("G")
        display.show(Image.ARROW_E)
        sleep(300)
    else:
        pinca_enviada = False
        if boto_a:
            radio.send("E+")
            display.show(Image.ARROW_N)
        elif boto_b:
            radio.send("E-")
            display.show(Image.ARROW_S)
        else:
            display.show(Image.DIAMOND_SMALL)

    sleep(100)   # ~10 ordres/s: suficient per a un control suau
```

</details>

<details markdown="1">
<summary>Desplega el codi complet (<code>T2_mearm_microbit_receptor.py</code>)</summary>

```python
# Codi de referencia del brac MeArm V1.1 - VERSIO MICRO:BIT
# RECEPTOR: la micro:bit del brac, endollada al Micro:shield. Rep les ordres
# del COMANDAMENT (T2_brac_microbit_comandament.py) i mou els 4 servos:
#   P0 base, P1 dret, P2 pinca, P8 esquerre (el servo nou del MeArm)
# ATENCIO: cal una micro:bit V2. La V1 no pot generar senyal de servo a 4
# pins alhora (en te prou per a 3).
# ATENCIO: servos amb alimentacio externa del Micro:shield, mai el 3V de la
# placa ni l'USB.
# En arrencar posa els 4 servos a 90 graus: serveix de "pas 0" de la guia.

from microbit import *
import radio

GRUP = 10   # el MATEIX numero que el comandament
PAS = 3     # graus que es mou el servo per cada ordre rebuda

# Limits d'angle segurs de cada servo (els que heu anotat al bloc D)
BASE_MIN, BASE_MAX = 0, 180
ESQUERRE_MIN, ESQUERRE_MAX = 40, 150
DRET_MIN, DRET_MAX = 40, 150
PINCA_TANCADA, PINCA_OBERTA = 60, 120


def angle_a_analog(angle):
    # Servo estandard: pols de 0.5 ms (0 graus) a 2.5 ms (180 graus)
    # sobre un periode de 20 ms -> valors analogics d'uns 26 a 128.
    return int(26 + (angle / 180) * 102)


def mou(pin, angle):
    pin.set_analog_period(20)
    pin.write_analog(angle_a_analog(angle))


def limita(valor, minim, maxim):
    # Mai fora del rang segur: un servo que forca el topall es crema
    return max(minim, min(valor, maxim))


radio.on()
radio.config(group=GRUP)

base = 90
esquerre = 90
dret = 90
pinca = 90
mou(pin0, base)
mou(pin8, esquerre)
mou(pin1, dret)
mou(pin2, pinca)
display.show(Image.YES)

while True:
    ordre = radio.receive()

    if ordre == "B+":
        base = limita(base + PAS, BASE_MIN, BASE_MAX)
        mou(pin0, base)
    elif ordre == "B-":
        base = limita(base - PAS, BASE_MIN, BASE_MAX)
        mou(pin0, base)
    elif ordre == "D+":
        dret = limita(dret + PAS, DRET_MIN, DRET_MAX)
        mou(pin1, dret)
    elif ordre == "D-":
        dret = limita(dret - PAS, DRET_MIN, DRET_MAX)
        mou(pin1, dret)
    elif ordre == "E+":
        esquerre = limita(esquerre + PAS, ESQUERRE_MIN, ESQUERRE_MAX)
        mou(pin8, esquerre)
    elif ordre == "E-":
        esquerre = limita(esquerre - PAS, ESQUERRE_MIN, ESQUERRE_MAX)
        mou(pin8, esquerre)
    elif ordre == "P":
        # Commutador: si esta oberta, la tanca; si no, l'obre
        if pinca == PINCA_OBERTA:
            pinca = PINCA_TANCADA
        else:
            pinca = PINCA_OBERTA
        mou(pin2, pinca)

    sleep(10)
```

</details>


## Problemes freqüents

| Símptoma | Causa probable | Solució |
|---|---|---|
| Les pestanyes no entren a les ranures | El DM fa més de 3,0 mm | Llima la ranura; no la forcis, el DM s'esberla. |
| El braç tremola o s'encalla a mig moviment | Alguna articulació massa collada | Afluixa mitja volta els cargols dels pivots (bloc E). |
| Un cargol gira en buit | Rosca del DM passada | Cargol que travessi les dues peces + femella. |
| Un servo brunz i s'escalfa quiet | Força contra un topall | Revisa els angles límit (bloc D) i limita'ls al codi. |
| La pinça no tanca del tot | Banya desplaçada una dent | Repeteix el pas 9. |
| La base no arriba a 90° a una banda | Banya de la base mal centrada | Repeteix el pas 18. |

## Registre del prototip

Omple aquesta taula en muntar el prototip: decideix si el MeArm s'adopta i
dona les quantitats reals per al pressupost de cargols.

| Dada | Valor |
|---|---|
| Versió provada (Arduino / micro:bit) | |
| Gruix real del DM (mm) | |
| Ajust de les ranures (just / fluix / no entra) | |
| Temps total de muntatge | |
| Cargols M3 × 8 mm | |
| Cargols M3 × 10 mm | |
| Cargols M3 × 12 mm | |
| Cargols M3 × 20 mm (+ femelles) | 4 |
| Altres cargols | |
| Passos on calen dues persones | 15 |
| Angles límit (base / esquerre / dret / pinça) | |
| Incidències | |

<!-- web:only-github -->
Plantilla de tall: [`../../Recursos/plantilles_laser/brac_MeArm_v1.1.svg`](../../Recursos/plantilles_laser/brac_MeArm_v1.1.svg) ·
notes de tall a [`LLEGEIX-ME.md`](../../Recursos/plantilles_laser/LLEGEIX-ME.md).
<!-- /web:only-github -->

## Crèdits

**MeArm V1.1**, disseny de **Ben Gray** (phenoptix), maquinari amb llicència
**CC BY-SA 3.0** ([github.com/phenoptix/MeArm](https://github.com/phenoptix/MeArm)).
Aquesta guia és una redacció pròpia en català que segueix l'ordre dels
passos de la guia oficial i l'adapta al DM, als servos i a l'Arduino del
curs. Les fotos originals no s'hi inclouen.
