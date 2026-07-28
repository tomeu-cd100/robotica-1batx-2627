// Codi de referencia del Projecte T1 - La mascota reactiva (NOMES DOCENT)
// Integra el que s'apren a SA2 (sortides: llum i so) i SA3 (entrades: sensors).
// Emocions amb maquina d'estats + 3 comportaments sensor->resposta.
// Cablatge: el del dossier 00_Projecte_T1_Mascota.md (apartat Cablatge).

#include <Adafruit_NeoPixel.h>
#include <DHT.h>

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

// --- Ajustos que cada parella ha de calibrar ---
const int NUM_LEDS = 8;            // LEDs de la tira dels ulls (ajusta als reals)
const int LLINDAR_SOROLL = 600;    // 0-1023: per sobre = espant (calibra amb Serial)
const int LLINDAR_FOSCOR = 150;    // 0-1023: per sota = son (calibra amb Serial)
const unsigned long TEMPS_CALMA = 8000;  // ms sense estimuls per tornar a CONTENT

Adafruit_NeoPixel ulls(NUM_LEDS, PIN_NEOPIXEL, NEO_GRB + NEO_KHZ800);
DHT dht(PIN_DHT, DHT11);

// --- Maquina d'estats de les emocions ---
enum Emocio { CONTENT, ESPANTAT, ADORMIT, CURIOS };
Emocio emocio = CONTENT;
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
  dht.begin();
  // El PIR necessita 30-60 s d'estabilitzacio en engegar: la mascota "es desperta"
  canviaEmocio(ADORMIT);
}

void loop() {
  llegeixSensors();

  // Si fa estona que no passa res, torna a CONTENT (tret que dormi per foscor)
  if (emocio != ADORMIT && millis() - tUltimEstimul > TEMPS_CALMA) {
    canviaEmocio(CONTENT);
  }
  delay(50);
}

// --- Comportaments sensor->resposta (els 3 minims del producte) ---
void llegeixSensors() {
  int soroll = analogRead(PIN_MICROFON);
  int llum = analogRead(PIN_LLUM);

  // Traca per calibrar els llindars: obre el Serial Monitor a 9600
  Serial.print("soroll="); Serial.print(soroll);
  Serial.print(" llum="); Serial.print(llum);
  Serial.print(" temp="); Serial.println(dht.readTemperature());

  // 1) Soroll fort -> ESPANTAT
  if (soroll > LLINDAR_SOROLL) {
    if (emocio == ESPANTAT) tUltimEstimul = millis();  // refresca el temporitzador si ja estem espantats
    canviaEmocio(ESPANTAT);
    return;
  }
  // 2) Foscor -> ADORMIT (i la llum el desperta)
  if (llum < LLINDAR_FOSCOR) {
    canviaEmocio(ADORMIT);
    return;
  } else if (emocio == ADORMIT) {
    canviaEmocio(CURIOS);   // acaba de despertar-se
    return;
  }
  // 3) Algu s'acosta (PIR) -> CURIOS (saluda)
  if (digitalRead(PIN_PIR) == HIGH) {
    if (emocio != CURIOS) {
      canviaEmocio(CURIOS);
      return;
    }
    tUltimEstimul = millis();  // refresca si ja estem curiosos, deixa que la caricia funcione
  }
  // Extra: caricia al polsador -> CONTENT (amb debounce de 200 ms)
  if (digitalRead(PIN_POLSADOR) == LOW && millis() - tUltimPolsador > 200) {
    tUltimPolsador = millis();
    canviaEmocio(CONTENT);
  }
  // Extra (comentat al dossier): reaccionar a la temperatura del DHT11,
  // p. ex. si temp > 28 la mascota "te calor" -> afegiu un estat nou.
}

// --- Transicio d'estat: llums + so nomes quan canvia ---
void canviaEmocio(Emocio nova) {
  if (nova == emocio) return;
  emocio = nova;
  tUltimEstimul = millis();
  switch (emocio) {
    case CONTENT:
      mostraUlls(0, 180, 40);      // verd calid
      colorHumor(0, 255, 0);
      melodia(523, 659, 784);      // do-mi-sol (alegre)
      break;
    case ESPANTAT:
      mostraUlls(255, 0, 0);       // vermell
      colorHumor(255, 0, 0);
      melodia(880, 740, 622);      // descendent (ensurt)
      break;
    case ADORMIT:
      mostraUlls(0, 0, 30);        // blau molt tenue
      colorHumor(0, 0, 60);
      melodia(262, 0, 0);          // una nota greu i prou
      break;
    case CURIOS:
      mostraUlls(200, 120, 0);     // taronja
      colorHumor(255, 160, 0);
      melodia(659, 784, 988);      // ascendent (hola!)
      break;
  }
}

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

// Tres notes seguides (freq. en Hz; 0 = silenci). Bloqueja ~450 ms: acceptable
// perque nomes sona quan CANVIA l'emocio, no a cada volta del loop.
void melodia(int n1, int n2, int n3) {
  int notes[3] = {n1, n2, n3};
  for (int i = 0; i < 3; i++) {
    if (notes[i] > 0) tone(PIN_BRUNZIDOR, notes[i], 120);
    delay(150);
  }
  noTone(PIN_BRUNZIDOR);
}
