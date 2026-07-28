// Codi de referencia del Projecte T2 - El brac robotic (NOMES DOCENT)
// Fase Arduino (SA4): 3 servos amb 3 potenciometres + aturada d'emergencia
// per sensor de col.lisio (maquina d'estats, estil SA6).
// Cablatge: el del dossier 00_Projecte_T2_Brac.md (fase Arduino).
// ATENCIO: els 3 servos amb ALIMENTACIO EXTERNA (piles AA) i GND comu. Mai per USB.

#include <Servo.h>

const int PIN_SERVO_BASE = 9;
const int PIN_SERVO_COLZE = 10;
const int PIN_SERVO_PINCA = 11;
const int PIN_POT_BASE = A0;
const int PIN_POT_COLZE = A1;
const int PIN_POT_PINCA = A2;
const int PIN_COLLISIO = 2;    // LOW = xoc (modul KS0021)

// Limits d'angle REALS de cada servo: anoteu-los abans de programar res mes
// (rubrica del dossier: el servo mai ha de forcar el topall mecanic).
const int BASE_MIN = 10,  BASE_MAX = 170;
const int COLZE_MIN = 20, COLZE_MAX = 160;
const int PINCA_MIN = 40, PINCA_MAX = 120;  // tancada .. oberta

const unsigned long TEMPS_REARMAMENT = 2000;  // ms alliberat per tornar a NORMAL

Servo base, colze, pinca;

enum Estat { NORMAL, EMERGENCIA };
Estat estat = NORMAL;
unsigned long tAlliberat = 0;

void setup() {
  Serial.begin(9600);
  pinMode(PIN_COLLISIO, INPUT_PULLUP);
  base.attach(PIN_SERVO_BASE);
  colze.attach(PIN_SERVO_COLZE);
  pinca.attach(PIN_SERVO_PINCA);
}

void loop() {
  bool xoc = (digitalRead(PIN_COLLISIO) == LOW);

  switch (estat) {
    case NORMAL:
      if (xoc) {
        aturadaEmergencia();
      } else {
        mouServos();
      }
      break;

    case EMERGENCIA:
      // Rearmament MANUAL: cal que el sensor quedi alliberat TEMPS_REARMAMENT
      // seguits; aixi el brac no rebota contra l'obstacle.
      if (xoc) {
        tAlliberat = 0;
      } else if (tAlliberat == 0) {
        tAlliberat = millis();
      } else if (millis() - tAlliberat > TEMPS_REARMAMENT) {
        estat = NORMAL;
        Serial.println("REARMAT: control actiu de nou");
      }
      break;
  }
  delay(20);   // ~50 actualitzacions/s: suficient i suau
}

void mouServos() {
  // map() de 0-1023 al rang SEGUR de cada servo (mai 0-180 a cegues)
  base.write(map(analogRead(PIN_POT_BASE), 0, 1023, BASE_MIN, BASE_MAX));
  colze.write(map(analogRead(PIN_POT_COLZE), 0, 1023, COLZE_MIN, COLZE_MAX));
  pinca.write(map(analogRead(PIN_POT_PINCA), 0, 1023, PINCA_MIN, PINCA_MAX));
}

void aturadaEmergencia() {
  estat = EMERGENCIA;
  tAlliberat = 0;
  // Els servos es queden on son (no es tornen a escriure): aturada immediata
  Serial.println("EMERGENCIA: xoc detectat, servos aturats");
}
