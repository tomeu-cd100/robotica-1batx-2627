# Pràctica 4 · Producte: la barrera automàtica

**Quan es fa:** Sessió 4 (producte) · **Fitxer:** `04_barrera_automatica.ino` · **Circuit:** [esquema de connexions](../../SA4_esquemes_connexions.md) (servo=9, HC-SR04 TRIG=12/ECHO=11, LED=8)

## 🎯 Per què fem aquesta pràctica

És el **producte** de la SA: la integració de tot el que has fet aquestes quatre sessions. Un **servo** (Pràctica 1) fa de barrera, un **ultrasons** (Pràctica 3) detecta el vehicle, i un LED indica l'estat. S'obre quan detecta, es tanca sola passat un temps: el mateix comportament que la barrera d'un pàrquing de veritat.

Compte amb el paper d'aquest fitxer: és **referència de consulta, no plantilla per retocar**. A la S4 escrius primer el **pseudocodi** de la teva barrera al quadern (3–5 línies) i després el teu codi. Aquesta pàgina et serveix per entendre *com està pensat* un codi que funciona — i sobretot per veure **on són les decisions**: a la defensa d'1' hauràs de justificar per què has triat el teu llindar de distància i els teus angles.

## 🔮 Abans d'executar: prediu

Sense carregar-lo: descriu **la seqüència sencera** que passarà quan posis la mà a 10 cm del sensor (què fa el LED, què fa el servo, quant dura cada cosa). I la pregunta amb trampa: si el "vehicle" **es queda aturat sota la barrera**, què farà el programa — mirarà el sensor o tancarà igualment? Apunta-ho a l'Activitat 4 de la [fitxa](../../SA4_fitxa_alumnat.md).

## 🧠 El codi, per blocs

### Bloc 1 — Les constants de disseny

```cpp
const int ANGLE_TANCAT = 0;
const int ANGLE_OBERT  = 90;
const int DIST_DETECCIO = 15;   // cm
const int TEMPS_OBERT = 3000;   // ms
```

Pensa en el termòstat de casa: la temperatura que vols es tria girant un dial a la paret, no obrint la caldera amb un tornavís. Aquestes quatre línies són els **dials** de la barrera: tota la personalització que et demana la S4 (angles, distància de detecció, temps obert) viu aquí, no escampada pel `loop()`. És la lliçó de les constants de la SA2 aplicada a un producte: quan a la defensa et preguntin *"per què 15 cm?"*, la resposta és teva; que canviar-ho costi una sola línia, això és mèrit del codi.

### Bloc 2 — Arrencar en un estat conegut

```cpp
void setup() {
  barrera.attach(9);
  pinMode(TRIG, OUTPUT); pinMode(ECHO, INPUT);
  pinMode(LED, OUTPUT);
  barrera.write(ANGLE_TANCAT);
}
```

El microones, després d'una apagada de llum, arrenca marcant 0:00 — no l'hora que li sembla: un aparell ben fet engega sempre des d'un punt conegut. L'última línia del `setup()` fa el mateix: en engegar, la barrera es col·loca **tancada**. Sense això, el servo es quedaria on fos que l'hagués deixat l'última execució — potser mig obert, potser travessat. Un sistema ben dissenyat arrenca sempre en un estat conegut i segur.

### Bloc 3 — Detectar el vehicle

```cpp
  float d = mesuraDistancia();

  if (d > 0 && d < DIST_DETECCIO) {
```

El porter d'un concert et demana dues coses **alhora**: l'entrada **i** el DNI — amb una de sola no passes. El `&&` (i lògic) és aquest porter: la condició té dues parts i s'han de complir totes dues — la distància ha de ser menor que el llindar **i** més gran que zero. I per què demanar el "DNI" del `d > 0`? Perquè filtra les lectures nul·les (sense eco, `pulseIn` retorna 0): sense aquesta guarda, un sensor desconnectat faria obrir la barrera tota sola. Desconfiar de les mesures és un hàbit de la Pràctica 3 que aquí torna a aparèixer.

### Bloc 4 — Obrir, esperar, tancar (i el peatge del delay)

```cpp
    // Vehicle detectat: obre la barrera
    digitalWrite(LED, HIGH);
    barrera.write(ANGLE_OBERT);
    delay(TEMPS_OBERT);
    // Tanca
    barrera.write(ANGLE_TANCAT);
    digitalWrite(LED, LOW);
```

La seqüència es llegeix sola: LED encès, barrera amunt, espera, barrera avall, LED apagat. Però hi ha un preu amagat. Quan comptes fins a deu jugant a fet i amagar, tens els ulls tapats: mentre comptes, no veus res del que passa al teu voltant. El `delay(TEMPS_OBERT)` és aquest comptar amb els ulls tapats: durant els 3 segons, el programa està **cec** — no llegeix el sensor. Si el vehicle es queda a sota, la barrera li cau al damunt igualment. Per a la **versió nucli** això és acceptable (i el codi és molt més senzill); la **versió completa** de la fitxa (gestionar el vehicle aturat sota la barrera) demana no quedar-se cec: vigilar el temps **i** el sensor alhora, que és exactament el patró `millis()` de la [Pràctica 5](../05_dos_leds_millis/EXPLICACIO.md).

## ⚠️ Errors que veuràs segur

| Símptoma | Causa probable |
|---|---|
| La barrera s'obre sola de tant en tant | Lectures fantasma de l'ultrasons (ecos rebotats), o falta la guarda `d > 0`. |
| El servo vibra o cau a mig camí | Alimentació insuficient: servo amb alimentació externa i **massa comuna**. |
| No detecta mai el vehicle | TRIG i ECHO intercanviats, o el llindar `DIST_DETECCIO` massa petit per al teu muntatge. |
| Es tanca damunt del "vehicle" | No és un error del codi: és el límit del `delay()` (Bloc 4). Gestionar-ho és la versió completa. |

## 🧗 Si t'encalles: la versió completa amb `millis()` (vehicle aturat sota la barrera)

Si vols fer la **versió completa** de la fitxa (que la barrera no es tanqui mai damunt del vehicle) i no saps per on començar: no és maquinari nou — és substituir el `delay(TEMPS_OBERT)` del Bloc 4 pel patró de la [Pràctica 5](../05_dos_leds_millis/EXPLICACIO.md). Les tres peces de la P5 es tradueixen així:

| A la P5 (dos LEDs) | A la barrera |
|---|---|
| `tA` (quan vaig canviar el LED) | `tObertura` (quan s'ha vist el vehicle per última vegada) |
| `encesA` (estat del LED) | `oberta` (estat de la barrera) |
| `if (ara - tA >= PERIODE_A)` | `if (millis() - tObertura >= TEMPS_OBERT)` |

La línia clau és `tObertura = millis();` **dins** de la detecció: mentre el sensor vegi el vehicle, el cronòmetre es reinicia a cada volta — els 3 segons compten des de l'**última vegada** que s'ha vist el vehicle, no des de l'obertura. El programa no es queda mai cec: llegeix el sensor a cada volta, també amb la barrera oberta.

<details markdown="1">
<summary>Desplega el `loop()` complet (la resta del sketch no canvia)</summary>

```cpp
// Noves variables globals (abans del setup): l'estat de la barrera
unsigned long tObertura = 0;   // quan s'ha vist el vehicle per ultim cop
bool oberta = false;

void loop() {
  float d = mesuraDistancia();

  // Vehicle detectat: obre (si cal) i reinicia el cronometre
  if (d > 0 && d < DIST_DETECCIO) {
    if (!oberta) {
      digitalWrite(LED, HIGH);
      barrera.write(ANGLE_OBERT);
      oberta = true;
    }
    tObertura = millis();   // mentre hi hagi vehicle, el compte torna a zero
  }

  // Ja toca tancar? Nomes si esta oberta I fa prou temps que no es veu vehicle
  if (oberta && millis() - tObertura >= TEMPS_OBERT) {
    barrera.write(ANGLE_TANCAT);
    digitalWrite(LED, LOW);
    oberta = false;
  }

  delay(60);   // petita pausa entre mesures del sensor
}
```

</details>

Fixa't que la parella `oberta` + `tObertura` ja és una **màquina d'estats** embrionària: dos estats (tancada/oberta) i dues transicions (per sensor i per temps). A la SA6 li posarem nom.

## 🔗 On ho aplicaràs

- **Ara mateix:** el teu producte de la S4 (barrera, braç o ventilador) surt del **teu pseudocodi**, amb aquest codi com a referència. A la defensa, justifica les teves constants de disseny (Bloc 1).
- **Versió completa:** el cas «vehicle aturat sota la barrera» es resol amb el patró de la [Pràctica 5 (`millis()`)](../05_dos_leds_millis/EXPLICACIO.md).
- **SA6:** la màquina d'estats farà d'aquesta barrera un sistema que mai no es queda cec.

> ⭐ **Has acabat abans?** Tria un repte a **[Reptes de la SA4](../../../../Reptes/Reptes_SA4.md)** i, quan el docent te'l validi, pinta l'estrella al [tauler de reptes](../../../00_General/00_Tauler_reptes.md).
