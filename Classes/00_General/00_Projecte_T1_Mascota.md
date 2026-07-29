# 🐣 Projecte T1 · La mascota reactiva

> **Per a qui és?** Per a cada parella durant el 1r trimestre. És el dossier del
> primer robot del curs: peces, muntatge, cablatge i rúbrica. Els reptes de SA2
> i SA3 hi van sumant capacitats; aquí es veu el conjunt.

**Durada:** 1r trimestre (SA2-SA3) · **Maquinari:** UNO + breadboard, NeoPixel, LED RGB, brunzidor, PIR, micròfon, TEMT6000, polsador, DHT11, caixa DM 3 mm

## El robot

La mascota és una capsa de fusta DM amb cara de criatura: dos **ulls** fets
amb NeoPixel i difusor imprès en 3D, un **nas** que en realitat és el sensor
PIR mirant cap enfora, i una **boca somrient tallada al làser** que fa de
sortida de so del brunzidor i de finestra per al micròfon i el sensor de
llum. Celles i galtes van gravades, i dues **orelles** (una de rodona i una
de gat) s'encaixen a les ranures de la tapa. Per fora sembla un joguet; per
dins és el mateix Arduino UNO i breadboard que ja es fa servir a classe.

![Cara de la mascota: dues orelles encaixades a la tapa (una de rodona i una de gat), celles i galtes gravades, dos ulls NeoPixel amb difusor, el sensor PIR com a nas, una boca somrient tallada al làser (sortida de so del brunzidor i finestra del micròfon i el TEMT6000) i el polsador al llom](img/mascota-cara.svg)

Què fa: **expressa emocions** amb llum i so —els ulls canvien de color i el
brunzidor fa melodies d'estat— (treballat a **SA2**) i **reacciona a
l'entorn** amb com a mínim **3 comportaments sensor→resposta** —algú
s'hi acosta, li fan una carícia, es fa fosc, hi ha soroll o canvia la
temperatura— (treballat a **SA3**). El producte final és seva: cada parella
li tria un nom i un caràcter, i la mascota reacciona **de manera coherent**
amb aquest caràcter.

## Llista de peces

| Peça | Origen | Quantitat |
|---|---|---|
| Plaques de DM 3 mm (caixa) | Plantilla `mascota.svg`, tall làser | 6 |
| Escaires d'angle | `escaire_caixa.scad`, impressió 3D | 8 |
| Difusors d'ull | `difusor_ull.scad`, impressió 3D | 2 |
| Arduino UNO + breadboard | Kit 1 | 1 |
| Tira NeoPixel WS2812B (ulls) | Kit 2 | 1 |
| LED RGB KS0312 (indicador d'humor) | Kit 3 | 1 |
| Brunzidor | Kit 1/3 | 1 |
| Sensor PIR KS0052 | Kit 2 | 1 |
| Micròfon KS0035 | Kit 3 | 1 |
| Sensor de llum TEMT6000 KS0098 | Kit 2 | 1 |
| Polsador | Kit 1 | 1 |
| Sensor de temperatura i humitat DHT11 | Kit 3 | 1 |
| Cargols M3 x16 | Material del centre | ~16 |

<!-- web:only-github -->
Plantilla de tall làser: [`../../Recursos/plantilles_laser/mascota.svg`](../../Recursos/plantilles_laser/mascota.svg).
Peces impreses en 3D: [`../../Recursos/peces_3d/escaire_caixa.scad`](../../Recursos/peces_3d/escaire_caixa.scad),
[`../../Recursos/peces_3d/difusor_ull.scad`](../../Recursos/peces_3d/difusor_ull.scad).
<!-- /web:only-github -->

## Fabricació i personalització

La plantilla `mascota.svg` és **fixa** (línies negres de tall i forats de
muntatge): cap equip la toca. El que cada parella personalitza és **NOMÉS la
zona vermella**, sobre una **còpia pròpia** del fitxer: les celles, les
galtes i el contorn de cara del frontal (gravat), i el dibuix interior de les
**2 orelles** (etiquetades «ORELLES x2 - encaixen a la tapa»). Les formes per
defecte (orella rodona i orella de gat) ja són retallables tal qual; qui
vulgui una forma pròpia pot redibuixar el contorn negre de l'orella sempre
que **mantingui la pestanya de 10 mm** que encaixa a la ranura de la tapa.

Flux de personalització:
1. Cada parella fa una **còpia** del fitxer `mascota.svg` amb el nom del seu
   equip.
2. Edita **només les línies vermelles** amb xTool Creative Space o Inkscape
   (la zona negra de tall no es toca).
3. El docent **valida** el disseny (que no se surti del tauler ni trenqui
   cap forat de muntatge).
4. El fitxer validat entra a la **cua de tall** de la sessió de fabricació
   (S4 de SA2).

<!-- web:only-github -->
Plantilla per personalitzar: [`../../Recursos/plantilles_laser/mascota.svg`](../../Recursos/plantilles_laser/mascota.svg) ·
guia completa: [`../../Recursos/plantilles_laser/LLEGEIX-ME.md`](../../Recursos/plantilles_laser/LLEGEIX-ME.md).
<!-- /web:only-github -->

## Muntatge

1. Munta la **base** i els **quatre laterals** de la caixa amb 6 dels 8
   escaires impresos, sense encolar encara (els 2 restants es reserven per a
   la tapa, al pas 7).
2. Fixa la **breadboard amb l'Arduino UNO** a la base, deixant els ports USB
   i d'alimentació accessibles per una obertura lateral.
3. Encaixa els **difusors d'ull** al frontal i passa-hi els cables de la
   tira NeoPixel per darrere.
4. Munta el **PIR** mirant cap enfora pel forat frontal i el **polsador**
   al llom (accessible des de fora).
5. Munta el **brunzidor**, el **micròfon** i el **TEMT6000** darrere la
   **boca somrient** (el forat tallat fa de sortida de so i d'entrada de llum).
6. Cablatge complet segons la taula de baix; comprova totes les connexions
   **abans** de tancar la caixa.
7. Encaixa les **2 orelles** a les ranures de la tapa i tanca la **tapa
   superior** amb els 2 escaires restants, deixant-la desmuntable (sense
   encolar) per si cal repassar el cablatge.
8. Prova d'encesa: comprova que els ulls s'encenen amb el color correcte
   abans de donar la mascota per acabada.

> ⚠️ **Polaritat:** la tira NeoPixel té un sentit de senyal (DIN → DOUT):
> si es connecta al revés, els LED no s'encenen. El PIR també té un
> connector orientat (VCC/OUT/GND): revisa la serigrafia del mòdul abans de
> cablejar-lo, no per posició del cable.

## Cablatge

Abans de res, prepara els **carrils d'alimentació de la breadboard**: un cable
del pin **5V** del UNO al carril vermell (+) i un del **GND** al carril blau
(−). Tots els mòduls s'alimenten d'aquests dos carrils; cada component només
necessita, a més, el seu cable de senyal cap al pin de la taula. Cableja
sempre amb l'**USB desendollat**.

| Component | Pin de senyal | Notes |
|---|---|---|
| NeoPixel (ulls), DIN | D6 | Alimentació **5V/GND** a part (no del pin 5V del UNO si la tira supera ~8-10 LED; consum ~60 mA/LED a blanc ple). |
| LED RGB (indicador d'humor) | D9 / D10 / D11 | Pins PWM (`~`), un per canal (R/G/B). |
| Brunzidor | D8 | Sortida digital o PWM per a to. |
| Sensor PIR | D2 | Digital; necessita 30-60 s d'estabilització en engegar. |
| Polsador | D3 | Digital, amb *pull-up* (intern o resistència externa) i *debounce* per programari. |
| DHT11 (temperatura/humitat) | D4 | Bus digital 1-Wire; requereix la llibreria `DHT`. |
| Micròfon | A0 | Entrada analògica; llindar de so a calibrar. |
| TEMT6000 (llum) | A1 | Entrada analògica; llindar de foscor a calibrar. |

**Com es connecta cada component:**

- **Mòduls de 3 pins (PIR, micròfon, TEMT6000):** VCC → carril 5 V,
  GND → carril −, i el pin de sortida (OUT/S/AO) → pin de senyal de la
  taula. ⚠️ L'**ordre dels 3 pins canvia segons el fabricant**: mira sempre
  la serigrafia del mòdul, no la posició del cable.
- **Tira NeoPixel:** connecta **primer el GND**, després el 5 V i al final
  el senyal DIN → D6. Recorda el sentit DIN → DOUT de l'avís de dalt.
- **LED RGB:** el mateix muntatge de l'esquema 4 de
  [SA2 · Esquemes i connexions](../SA2/SA2_esquemes_connexions.md): una
  resistència de **220 Ω per canal** cap a D9/D10/D11 i el càtode comú al
  carril −.
- **Brunzidor:** pota (+) → D8, pota (−) → carril − (com al panell de SA2,
  que el tenia al pin 6).
- **Polsador:** una pota → D3 i la diagonal → carril −, sense resistència
  (el programa activa el *pull-up* intern, com a l'esquema 1 de
  [SA3 · Esquemes i connexions](../SA3/SA3_esquemes_connexions.md)).
- **DHT11:** si és el **mòdul de 3 pins**, com els altres mòduls (senyal →
  D4). Si és el **sensor solt de 4 potes**, cal una resistència de
  **10 kΩ** entre VCC i DATA (el mòdul ja la porta incorporada).

> 🔑 **Per al docent:** implementació completa de referència al
> [solucionari del trimestre](../Solucionari/Solucionari_T1_SA1-SA3.md) (secció «Codi de referència»).

## Simular la mascota a Tinkercad

Pots provar el programa de la mascota a Tinkercad abans de cablejar-la de
debò, però el catàleg de components no ho té tot: cal fer **tres
substitucions** (el codi no canvia gens, només els llindars a l'hora de
provar):

| A la mascota real | A Tinkercad | Per què funciona igual |
|---|---|---|
| Micròfon (A0) | **Potenciòmetre** a A0 | Tinkercad no té cap sensor de so. `analogRead(A0)` llegeix igual 0–1023: girar el cargol = «fer soroll». |
| TEMT6000 (A1) | **Fotoresistència (LDR)** a A1 | Mateix paper: sensor de llum analògic. |
| DHT11 (D4) | **Res** (esborra'l del codi) | Tinkercad no té ni el component ni la llibreria `DHT`. Com que és l'extra opcional, es pot ometre: treu l'`#include <DHT.h>` i totes les línies amb `dht` o `PIN_DHT`. |

El PIR, la tira NeoPixel, el LED RGB, el brunzidor i el polsador sí que hi
són (i la llibreria `Adafruit_NeoPixel` ve inclosa al mode text).

> ⚠️ Enganxa sempre el **programa sencer** a l'editor de text de Tinkercad,
> no blocs solts: un fragment sense les declaracions de dalt (pins,
> constants…) dona errors del tipus `'...' was not declared in this
> scope`.

> ⚠️ **Tinkercad i els `enum`:** si una funció teva rep un `enum` com a
> paràmetre (p. ex. `void canviaEstat(Estat nou)`), Tinkercad dona l'error
> `'Estat' was not declared in this scope` encara que el codi sigui
> correcte (i compili bé a l'IDE d'Arduino). És un defecte del seu
> compilador. Solució: fes servir **`const int`** per als estats i passa'ls
> com a `int` (`void canviaEstat(int nou)`).

### Trampes de simulació (provades: hi cauràs)

Aquesta llista surt de muntar la mascota a Tinkercad de debò. Si el circuit
«fa coses rares», repassa-la en ordre:

1. **A0 no és el pin «0».** Les entrades analògiques són al connector
   **ANALOG IN** (a tocar de POWER). Els pins «TX→1» i «RX→0» del connector
   digital són el port sèrie: si hi punxes un sensor, `analogRead` llegeix
   valors a l'aire **i** el Monitor Sèrie deixa de funcionar.
2. **Melodia sense parar = estats canviant sense parar.** El so només sona
   quan l'emoció canvia: si no calla, alguna lectura analògica balla al
   voltant d'un llindar (sensor a l'aire o mal punxat). Obre el Monitor
   Sèrie: `soroll` i `llum` han d'estar **quiets** quan no toques res.
3. **L'ordre del divisor importa.** Potenciòmetre: extrems a 5 V i GND,
   **central** a A0 (si l'escala et surt al revés, intercanvia els extrems).
   LDR: la LDR a la banda de **5 V**, la de 10 kΩ a **GND** i A1 **al punt
   del mig** — invertit dona «més llum = valor més baix».
4. **Comprova el valor de cada resistència** (clica-la): a Tinkercad surten
   d'1 kΩ per defecte i el desplegable d'unitats (Ω/kΩ/MΩ) enganya. Amb la
   del divisor equivocada, `llum` no arriba mai al llindar. I no «arreglis»
   un divisor malament dimensionat abaixant el llindar al codi: al muntatge
   real et tornaria a passar.
5. **Polsador de 4 potes: cables en diagonal.** Les potes del mateix costat
   estan unides per dins; en diagonal travesses sempre l'interruptor de
   debò. I recorda: prémer «carícia» quan la mascota **ja està** contenta no
   fa res visible — prova-la des d'ESPANTAT.
6. **PIR: mira els tooltips, no els colors.** Passa el ratolí per cada pota
   (Signal / Power / Ground) abans de cablejar: l'ordre no és el que sembla.
   Per disparar-lo, **arrossega la boleta creuant el con** de detecció. I no
   esperis números: el PIR és **binari** (moviment sí/no), no mesura
   distància — això és feina de l'ultrasons de SA3.

> 🤫 **Secret de la mascota (descobert simulant):** si dorm a les fosques,
> el PIR **no** la desperta — les reaccions es comproven per **prioritat**
> (soroll > foscor > presència) i, mentre és fosc, la regla del son «mana» i
> es queda l'estímul. En canvi, un **soroll fort sí** que la desperta,
> perquè va abans a la llista. No és cap error: és la gràcia de l'ordre de
> les regles — quan programis les teves, tria conscientment quina mana.

## 🧗 Si t'encalles: l'esquelet del programa

Si en ajuntar els reptes de SA2 i SA3 no sabeu per on començar, partiu
d'aquest esquelet. L'estructura ja hi és: pins, estats, `setup()`, `loop()` i
les funcions de llum i so de SA2. La vostra feina són els `// TODO`: les
**reaccions dels sensors** (mètode SA3: llegir → comparar amb un llindar →
decidir) i la **personalitat de cada emoció** (colors i melodies coherents
amb el caràcter que heu triat). El primer cas de cada funció ja està resolt
com a exemple. Compila tal qual; la mascota només s'espantarà fins que
completeu la resta.

<details markdown="1">
<summary>Desplega l'esquelet (còpia'l a un sketch nou)</summary>

```cpp
/*
  Projecte T1 - La mascota reactiva (ESQUELET per comencar)

  L'estructura ja esta muntada: pins, estats, setup(), loop() i les funcions
  de llum i so (les vas fer a SA2). Tu has d'OMPLIR els // TODO:
    - les reaccions dels sensors a llegeixSensors() (metode SA3: llegir ->
      comparar amb un llindar -> decidir),
    - i la personalitat de cada emocio a canviaEmocio() (colors i melodies).
  El primer cas de cada funcio ja esta resolt com a exemple.

  Compila tal qual; la mascota nomes s'espantara fins que completis la resta.
  Cablatge: el de l'apartat Cablatge d'aquest dossier.
  Per simular-ho a Tinkercad: treu les 3 linies marcades amb [DHT] i recorda
  les substitucions de l'apartat de Tinkercad (potenciometre a A0, LDR a A1).
*/

#include <Adafruit_NeoPixel.h>
#include <DHT.h>              // [DHT]

// --- Pins (taula de cablatge del dossier) ---
const int PIN_NEOPIXEL = 6;   // ulls (tira WS2812B)
const int PIN_RGB_R = 9;      // LED RGB indicador d'humor
const int PIN_RGB_G = 10;
const int PIN_RGB_B = 11;
const int PIN_BRUNZIDOR = 8;
const int PIN_PIR = 2;        // nas (presencia)
const int PIN_POLSADOR = 3;   // caricia (pull-up intern)
const int PIN_DHT = 4;        // temperatura/humitat (extra)
const int PIN_MICROFON = A0;  // soroll
const int PIN_LLUM = A1;      // TEMT6000 (foscor)

// --- Ajustos que heu de calibrar amb el Monitor serie obert ---
const int NUM_LEDS = 8;            // LEDs de la vostra tira dels ulls
const int LLINDAR_SOROLL = 600;    // 0-1023: per sobre = espant
const int LLINDAR_FOSCOR = 150;    // 0-1023: per sota = son
const unsigned long TEMPS_CALMA = 8000;  // ms sense estimuls per calmar-se

Adafruit_NeoPixel ulls(NUM_LEDS, PIN_NEOPIXEL, NEO_GRB + NEO_KHZ800);
DHT dht(PIN_DHT, DHT11);      // [DHT]

// --- Estats de la mascota (const int, no enum: vegeu l'avis de Tinkercad) ---
// TODO: canvieu els noms si el vostre personatge te altres emocions,
//       i afegiu-ne si en voleu mes (minim 3 comportaments sensor->resposta).
const int CONTENT = 0;
const int ESPANTAT = 1;
const int ADORMIT = 2;
const int CURIOS = 3;
int emocio = CONTENT;
unsigned long tUltimEstimul = 0;
unsigned long tUltimPolsador = 0;   // debounce de la caricia

void setup() {
  Serial.begin(9600);
  pinMode(PIN_PIR, INPUT);
  pinMode(PIN_POLSADOR, INPUT_PULLUP);
  pinMode(PIN_RGB_R, OUTPUT);
  pinMode(PIN_RGB_G, OUTPUT);
  pinMode(PIN_RGB_B, OUTPUT);
  pinMode(PIN_BRUNZIDOR, OUTPUT);
  ulls.begin();
  dht.begin();                // [DHT]
}

void loop() {
  llegeixSensors();

  // Si fa estona que no passa res, torna a l'estat de calma
  if (emocio != ADORMIT && millis() - tUltimEstimul > TEMPS_CALMA) {
    canviaEmocio(CONTENT);
  }
  delay(50);
}

// --- Reaccions sensor->resposta (aqui va la vostra feina de SA3) ---
void llegeixSensors() {
  int soroll = analogRead(PIN_MICROFON);
  int llum = analogRead(PIN_LLUM);

  // Traca per calibrar els llindars: obre el Monitor serie a 9600
  Serial.print("soroll="); Serial.print(soroll);
  Serial.print(" llum="); Serial.println(llum);

  // EXEMPLE RESOLT - reaccio 1: soroll fort -> ESPANTAT
  if (soroll > LLINDAR_SOROLL) {
    canviaEmocio(ESPANTAT);
    return;   // un estimul per volta: la primera reaccio que salta mana
  }

  // TODO reaccio 2: si es fa fosc (llum per sota del llindar) -> ADORMIT.
  //      I quan torni la llum? Decidiu que fa en despertar-se.

  // TODO reaccio 3: si el PIR detecta algu (digitalRead HIGH) -> saludeu.

  // TODO extra: caricia al polsador (LOW, es pull-up) -> calmar la mascota.
  //      Recordeu el debounce amb millis() i tUltimPolsador (SA3).

  // TODO extra [DHT]: si dht.readTemperature() passa d'un llindar, la
  //      mascota "te calor" -> estat nou? Decidiu-ho segons el personatge.
}

// --- Transicio d'estat: llums + so nomes quan CANVIA l'emocio ---
void canviaEmocio(int nova) {
  if (nova == emocio) return;   // si ja hi es, no repeteix llums ni so
  emocio = nova;
  tUltimEstimul = millis();
  switch (emocio) {
    // EXEMPLE RESOLT: aixi es defineix la personalitat d'un estat
    case CONTENT:
      mostraUlls(0, 180, 40);      // ulls verd calid
      colorHumor(0, 255, 0);
      melodia(523, 659, 784);      // do-mi-sol (alegre)
      break;
    case ESPANTAT:
      // TODO: quins colors i quin so fa el VOSTRE personatge espantat?
      break;
    case ADORMIT:
      // TODO
      break;
    case CURIOS:
      // TODO
      break;
  }
}

// --- Llum i so (fetes a SA2: aprofiteu-les tal qual) ---
void mostraUlls(int r, int g, int b) {
  for (int i = 0; i < NUM_LEDS; i++) {
    ulls.setPixelColor(i, ulls.Color(r, g, b));
  }
  ulls.show();
}

void colorHumor(int r, int g, int b) {
  analogWrite(PIN_RGB_R, r);
  analogWrite(PIN_RGB_G, g);
  analogWrite(PIN_RGB_B, b);
}

// Tres notes seguides (freq. en Hz; 0 = silenci)
void melodia(int n1, int n2, int n3) {
  int notes[3] = {n1, n2, n3};
  for (int i = 0; i < 3; i++) {
    if (notes[i] > 0) tone(PIN_BRUNZIDOR, notes[i], 120);
    delay(150);
  }
  noTone(PIN_BRUNZIDOR);
}
```

</details>

## Què hi aporta cada SA

| SA | Sessions | Què s'hi construeix | Repte relacionat |
|---|---|---|---|
| SA2 | S1-S4 (S4 = fabricació) | Expressions de la mascota: colors i animacions dels ulls (NeoPixel), indicador d'humor (LED RGB) i melodies d'estat (brunzidor). | `Reptes_SA2.md` |
| SA3 | S1-S4 | Cada sensor de la caixa (PIR, polsador, TEMT6000, micròfon, DHT11) es programa amb la seva pròpia reacció sensor→comportament. | `Reptes_SA3.md` |

**Producte final (SA3-S3):** la mascota muntada amb **≥3 reaccions
sensor→comportament** coherents entre si, més la seva **fitxa de
personalitat** (nom, caràcter, com reacciona i per què reacciona així). La
S4 de SA3 és la prova pràctica **T1**, amb la mascota ja tancada.

## Rúbrica del robot (producte SA3)

| Criteri | Insuficient (0-4) | Suficient/Bé (5-6) | Notable (7-8) | Excel·lent (9-10) |
|---|---|---|---|---|
| **R1 · Fabricació i muntatge** | Caixa inestable o cablejat insegur. | Caixa funcional però amb algun cable fluix o desordenat. | Caixa ferma i cablejat endreçat, sense etiquetar. | Caixa ferma, cablejat endreçat i etiquetat, res solt ni curtcircuitat. |
| **R2 · Funcionament** | Sortides o sensors clau no funcionen. | La majoria de sortides i sensors funcionen. | Totes les sortides i sensors funcionen, amb algun ajust. | Totes les sortides i sensors funcionen a la primera i de manera fiable. |
| **R3 · Comportaments** | Menys de 2 reaccions, o sense relació amb cap personalitat. | 2 reaccions sensor→resposta, o coherència parcial. | ≥3 reaccions sensor→resposta, coherents amb la personalitat. | ≥3 reaccions sensor→resposta, totes coherents amb la personalitat i ben calibrades. |
| **R4 · Fitxa de personalitat i demostració** | Sense fitxa o sense poder explicar el funcionament. | Fitxa bàsica o defensa amb ajuda. | Fitxa completa i defensa oral clara. | Fitxa completa i defensa oral que explica i justifica cada reacció. |

## Problemes freqüents

| Símptoma | Causa probable | Solució |
|---|---|---|
| El NeoPixel no s'encén | El DIN està al revés, o falta un GND comú entre la tira i l'Arduino. | Comprova el sentit DIN→DOUT de la serigrafia i uneix tots els GND. |
| El PIR dispara sempre (fals positiu) | Encara en el temps d'estabilització (30-60 s) o sensibilitat massa alta. | Espera l'estabilització i ajusta els potenciòmetres de sensibilitat/temps del mòdul. |
| El micròfon no detecta res | Llindar analògic mal calibrat per al soroll de l'aula. | Llegeix valors reals al Monitor Sèrie i recalibra el llindar. |
| El DHT11 llegeix `NaN` | Pin equivocat o llibreria `DHT` no instal·lada/mal configurada. | Comprova el pin (D4) i que el tipus de sensor a la llibreria sigui `DHT11`. |
| La caixa no tanca bé | Escaires mal orientats o forats de muntatge desalineats. | Torna a muntar els escaires seguint l'ordre del pas de muntatge; no forcis les peces. |

---

⬅️ Torna al teu camí: [Reptes de la SA2](../../Reptes/Reptes_SA2.md) · [Reptes de la SA3](../../Reptes/Reptes_SA3.md) · [El fil conductor dels tres robots](00_Fil_conductor_robots.md)
