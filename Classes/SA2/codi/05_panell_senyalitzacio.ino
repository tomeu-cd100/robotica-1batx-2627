/*
  SA2 - 05_panell_senyalitzacio.ino  (PRODUCTE integrador)
  Panell d'estats: combina LED RGB (color d'estat) + piezo (avis) + rele (carrega).
  Circuit: R=9, G=10, B=11 (220 ohm, catode comu a GND)
           piezo (+)=6 ; rele IN=7
  Estats: CORRECTE (verd), AVIS (groc + so curt), ALARMA (vermell + so llarg + rele ON)
*/

const int R = 9, G = 10, B = 11;   // LED RGB
const int PIEZO = 6;               // brunzidor
const int RELE = 7;                // mòdul rele (carrega de baixa tensio)

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
  pinMode(RELE, OUTPUT);
}

void estatCorrecte() {
  color(0, 255, 0);          // verd
  digitalWrite(RELE, LOW);   // carrega apagada
  noTone(PIEZO);
}

void estatAvis() {
  color(255, 180, 0);        // groc
  tone(PIEZO, 1000, 150);    // bip curt (1 kHz, 150 ms)
  digitalWrite(RELE, LOW);
}

void estatAlarma() {
  color(255, 0, 0);          // vermell
  tone(PIEZO, 2000, 500);    // bip llarg
  digitalWrite(RELE, HIGH);  // activa la carrega
}

void loop() {
  // Demostracio ciclica dels tres estats (en el projecte real,
  // l'estat es decidira a partir de sensors - vegeu SA3).
  estatCorrecte();  delay(2000);
  estatAvis();      delay(2000);
  estatAlarma();    delay(2000);
}
