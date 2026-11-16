/*
  SA2 - 05_panell_senyalitzacio.ino  (PRODUCTE integrador)
  Panell d'estats: combina LED RGB (color d'estat) + piezo (avis sonor).
  Circuit: R=9, G=10, B=11 (220 ohm, catode comu a GND)
           piezo (+)=6, (-)=GND
  Estats: CORRECTE (verd), AVIS (groc + so curt), ALARMA (vermell + so llarg)
  Quan: S3 - producte
*/

const int R = 9, G = 10, B = 11;   // LED RGB
const int PIEZO = 6;               // brunzidor

void color(int r, int g, int b) {
  analogWrite(R, r);
  analogWrite(G, g);
  analogWrite(B, b);
}

void setup() {
  pinMode(R, OUTPUT);
  pinMode(G, OUTPUT);
  pinMode(B, OUTPUT);
  pinMode(PIEZO, OUTPUT);
}

void estatCorrecte() {
  color(0, 255, 0);          // verd
  noTone(PIEZO);             // en silenci
}

void estatAvis() {
  color(255, 180, 0);        // groc
  tone(PIEZO, 1000, 150);    // bip curt (1 kHz, 150 ms)
}

void estatAlarma() {
  color(255, 0, 0);          // vermell
  tone(PIEZO, 2000, 500);    // bip llarg i mes agut (2 kHz, 500 ms)
}

void loop() {
  // Demostracio ciclica dels tres estats (en el projecte real,
  // l'estat es decidira a partir de sensors - vegeu SA3).
  estatCorrecte();  delay(2000);
  estatAvis();      delay(2000);
  estatAlarma();    delay(2000);
}
