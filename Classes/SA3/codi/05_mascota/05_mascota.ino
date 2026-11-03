/*
  Projecte T1 - La mascota reactiva (ESQUELET per comencar)

  L'estructura ja esta muntada: pins, estats, setup(), loop() i les funcions
  de llum i so (les vas fer a SA2). Tu has d'OMPLIR els // TODO:
    - les reaccions dels sensors a llegeixSensors() (metode SA3: llegir ->
      comparar amb un llindar -> decidir),
    - i la personalitat de cada emocio a canviaEmocio() (colors i melodies).
  El primer cas de cada funcio ja esta resolt com a exemple.

  Compila tal qual; la mascota nomes s'espantara fins que completis la resta.
  Quan: S3 - producte (Practica 4 de la SA3)
  Cablatge: el de l'apartat Cablatge del dossier de la mascota.
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
