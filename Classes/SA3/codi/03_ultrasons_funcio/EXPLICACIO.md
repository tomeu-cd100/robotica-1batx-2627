# Pràctica 3 · Ultrasons: la primera funció que retorna un valor

**Quan es fa:** Sessió 3 (modelatge) · **Fitxer:** `03_ultrasons_funcio.ino` · **Circuit:** [esquema de connexions](../../SA3_esquemes_connexions.md) (TRIG=12, ECHO=11)

## 🎯 Per què fem aquesta pràctica

L'HC-SR04 mesura distàncies com un ratpenat: envia un so que no sents, espera l'**eco** i cronometra quant triga a tornar. Però el sensor és l'excusa: la lliçó gran del dia és **escriure una funció pròpia que retorna un valor**. Fins ara les funcions (`setup`, `loop`) només *feien* coses; `mesuraDistancia()` fa una feina i **et torna el resultat** amb `return`, com si preguntessis "a quina distància?" i et responguessin amb un número.

La pregunta que ho justifica: *quin avantatge té encapsular-ho en una funció?* Tres: el `loop()` es llegeix com una frase (`float d = mesuraDistancia();`), pots reutilitzar la mesura tants cops com vulguis sense copiar codi, i si mai canvies de sensor només toques **un** lloc.

## 🔮 Abans d'executar: prediu

Sense carregar el codi: si poses la mà a uns 20 cm del sensor, quin número apareixerà? I si no hi ha **res** davant del sensor (l'eco no torna mai), què hauria de dir — 0? infinit? Mira el codi plegat de baix i busca com resol aquest cas la funció. Comprova-ho després amb el Serial Plotter.

## 🧠 El codi, per blocs

### Bloc 1 — Dos pins, dos papers

```cpp
const int TRIG = 12;
const int ECHO = 11;
```

El sensor té dos pins de senyal amb papers oposats: **TRIG** és una **sortida** de l'Arduino (li ordenem "dispara el so") i **ECHO** és una **entrada** (el sensor ens hi respon quan torna l'eco). Al `setup()`, `pinMode(TRIG, OUTPUT)` i `pinMode(ECHO, INPUT)` — si els intercanvies, no funciona res.

### Bloc 2 — La funció: disparar el pols

```cpp
// Funcio propia: mesura i RETORNA la distancia en cm
float mesuraDistancia() {
  digitalWrite(TRIG, LOW);
  delayMicroseconds(2);
  digitalWrite(TRIG, HIGH);     // pols de 10 us
  delayMicroseconds(10);
  digitalWrite(TRIG, LOW);
```

Fixa't en la capçalera: `float mesuraDistancia()`. El `float` del davant declara **què retornarà** (un decimal, els cm). Dins, el protocol del sensor: un pols de 10 **microsegons** (µs, milionèsimes de segon — per això `delayMicroseconds` i no `delay`) al pin TRIG fa que el sensor emeti la ràfega d'ultrasons.

### Bloc 3 — pulseIn i el càlcul de la distància

```cpp
  long temps = pulseIn(ECHO, HIGH, 30000);  // temps de l'eco en us (timeout 30 ms)
  if (temps == 0) return 400;               // sense eco: objecte fora de rang (molt lluny)
  float dist = temps * 0.034 / 2.0;   // cm (velocitat del so ~0.034 cm/us)
  return dist;
}
```

Tres línies, tres idees:

- `pulseIn(ECHO, HIGH, 30000)` cronometra quant dura el pols HIGH al pin ECHO — el temps de l'eco en µs. El tercer paràmetre és un ***timeout***: si en 30 ms no ha arribat cap eco, es rendeix i retorna **0**.
- **El cas trampa:** sense eco (objecte fora de rang), `pulseIn` dona 0, i 0 µs serien **0 cm** — el sistema es pensaria que té l'objecte enganxat! Per això `if (temps == 0) return 400;`: el 0 es tradueix a "molt lluny" (400 cm). Sense aquesta línia, l'alarma de la S3 es dispararia sola.
- **La física:** el so viatja a ~0,034 cm/µs, i el temps mesurat és l'**anada i tornada** — per això *distància = temps · 0,034 / 2*.

I l'última línia: `return dist;` — la funció **entrega el resultat** a qui l'ha cridada.

### Bloc 4 — Una funció que crida una altra funció

```cpp
// REPTE resolt: mitjana de 3 mesures (filtre simple)
float distanciaMitjana() {
  float suma = 0;
  for (int i = 0; i < 3; i++) {
    suma += mesuraDistancia();
    delay(20);
  }
  return suma / 3.0;
}
```

Les mesures d'ultrasons "ballen" (ecos rebotats, sorolls). Aquesta segona funció crida `mesuraDistancia()` **tres cops** i en retorna la **mitjana**: un filtre simple que suavitza la gràfica. Fixa't en el poder de l'encapsulació: `distanciaMitjana()` es construeix **sobre** `mesuraDistancia()` sense repetir ni una línia del protocol del sensor.

### Bloc 5 — El loop, net, i el Serial Plotter

```cpp
void loop() {
  float d = distanciaMitjana();
  Serial.println(d);     // una sola dada per linia: ideal per al Serial Plotter
  delay(100);
}
```

Tota la feina bruta és a les funcions: el `loop()` queda en tres línies que es llegeixen soles. I en lloc del Monitor, obre el **Serial Plotter** (Eines > Serial Plotter): com que enviem **un sol número per línia**, el traçarà com una gràfica en directe — mou la mà davant del sensor i veuràs la distància pujar i baixar.

## ⚠️ Errors que veuràs segur

| Símptoma | Causa probable |
|---|---|
| Distància sempre 0 o un valor absurd | **TRIG i ECHO intercanviats**: TRIG és sortida (pin 12) i ECHO entrada (pin 11). Revisa també VCC=5V i GND. |
| Salts sobtats a 400 sense que res es mogui | No és (sempre) un error: `pulseIn` ha retornat **0** (sense eco: objecte fora de rang o superfície que no rebota, com roba o una cantonada) i la funció ho tradueix a "molt lluny". |
| La gràfica del Plotter surt buida o boja | Monitor i Plotter oberts alhora (només un pot usar el port), *baud* diferent de 9600, o més d'una dada per línia. |
| Lectures que "ballen" molt | Normal amb una sola mesura: fes servir `distanciaMitjana()` (el filtre de 3 mesures). |

## 🔗 On ho aplicaràs

- **Avui mateix (producte):** l'[alarma d'aparcament](../04_alarma_aparcament/EXPLICACIO.md) reutilitza `mesuraDistancia()` tal qual i hi afegeix la decisió per trams.
- **+ Ampliació:** detectar si l'objecte **s'acosta o s'allunya** (compara la mesura d'ara amb l'anterior).
- **Prova T1 (S4):** escriure i fer servir una funció que retorna un valor és exactament el múscul que s'hi avalua.
