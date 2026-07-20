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

Aquestes quatre línies **són el disseny** de la barrera: tota la personalització que et demana la S4 (angles, distància de detecció, temps obert) viu aquí, no escampada pel `loop()`. És la lliçó de les constants de la SA2 aplicada a un producte: quan a la defensa et preguntin *"per què 15 cm?"*, la resposta és teva; que canviar-ho costi una sola línia, això és mèrit del codi.

### Bloc 2 — Arrencar en un estat conegut

```cpp
void setup() {
  barrera.attach(9);
  pinMode(TRIG, OUTPUT); pinMode(ECHO, INPUT);
  pinMode(LED, OUTPUT);
  barrera.write(ANGLE_TANCAT);
}
```

L'última línia és la subtil: en engegar, la barrera es col·loca **tancada**. Sense això, el servo es quedaria on fos que l'hagués deixat l'última execució. Un sistema ben dissenyat arrenca sempre en un estat conegut i segur.

### Bloc 3 — Detectar el vehicle

```cpp
  float d = mesuraDistancia();

  if (d > 0 && d < DIST_DETECCIO) {
```

La condició té **dues parts** unides amb `&&` (i lògic): la distància ha de ser menor que el llindar **i** més gran que zero. El `d > 0` filtra les lectures nul·les (sense eco, `pulseIn` retorna 0): sense aquesta guarda, un sensor desconnectat faria obrir la barrera tota sola. Desconfiar de les mesures és un hàbit de la Pràctica 3 que aquí torna a aparèixer.

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

La seqüència es llegeix sola: LED encès, barrera amunt, espera, barrera avall, LED apagat. Però hi ha un preu amagat: durant els 3 segons del `delay(TEMPS_OBERT)`, el programa està **cec** — no llegeix el sensor. Si el vehicle es queda a sota, la barrera li cau al damunt igualment. Per a la **versió nucli** això és acceptable (i el codi és molt més senzill); la **versió completa** de la fitxa (gestionar el vehicle aturat sota la barrera) demana no quedar-se cec: vigilar el temps **i** el sensor alhora, que és exactament el patró `millis()` de la [Pràctica 5](../05_dos_leds_millis/EXPLICACIO.md).

## ⚠️ Errors que veuràs segur

| Símptoma | Causa probable |
|---|---|
| La barrera s'obre sola de tant en tant | Lectures fantasma de l'ultrasons (ecos rebotats), o falta la guarda `d > 0`. |
| El servo vibra o cau a mig camí | Alimentació insuficient: servo amb alimentació externa i **massa comuna**. |
| No detecta mai el vehicle | TRIG i ECHO intercanviats, o el llindar `DIST_DETECCIO` massa petit per al teu muntatge. |
| Es tanca damunt del "vehicle" | No és un error del codi: és el límit del `delay()` (Bloc 4). Gestionar-ho és la versió completa. |

## 🔗 On ho aplicaràs

- **Ara mateix:** el teu producte de la S4 (barrera, braç o ventilador) surt del **teu pseudocodi**, amb aquest codi com a referència. A la defensa, justifica les teves constants de disseny (Bloc 1).
- **Versió completa:** el cas «vehicle aturat sota la barrera» es resol amb el patró de la [Pràctica 5 (`millis()`)](../05_dos_leds_millis/EXPLICACIO.md).
- **SA6:** la màquina d'estats farà d'aquesta barrera un sistema que mai no es queda cec.
