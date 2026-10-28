/*
  SA6 - 01_llac_obert_vs_tancat.ino
  Llac OBERT vs llac TANCAT amb la base del brac.
  - Mode OBERT: la base rep l'ordre d'anar a ANGLE_OBJECTIU i el programa
    CONFIA que hi ha arribat. No ho comprova.
  - Mode TANCAT (HOMING): la base gira a poc a poc fins que el final de
    carrera (el sensor de col.lisio) toca. Aquell angle es el zero REAL.
  El polsador A canvia de mode i torna a comencar.
  Circuit: servo base=9 (piles + GND comu); sensor de col.lisio D2
           (INPUT_PULLUP, LOW = toca); polsador A entre D3 i GND.
  Mira el Monitor serie (9600).
  Quan: S1 - modelatge
*/

#include <Servo.h>

const int PIN_COLLISIO = 2;
const int BOTO_MODE = 3;

const int ANGLE_INICI = 90;
const int ANGLE_OBJECTIU = 20;         // on CREIEM que hi ha el final de carrera
const unsigned long PAS_HOMING = 30;   // ms per grau: a poc a poc

Servo base;

bool modeTancat = true;
int angle = ANGLE_INICI;
bool acabat = false;

void comenca() {
  angle = ANGLE_INICI;
  base.write(angle);
  delay(800);                          // temps per tornar a l'inici
  acabat = false;
  if (modeTancat) {
    Serial.println("Mode TANCAT (homing): busco el final de carrera...");
  } else {
    Serial.println("Mode OBERT: envio l'ordre i confio.");
  }
}

void setup() {
  Serial.begin(9600);
  pinMode(PIN_COLLISIO, INPUT_PULLUP);
  pinMode(BOTO_MODE, INPUT_PULLUP);
  base.write(ANGLE_INICI);
  base.attach(9);
  comenca();
}

void loop() {
  // El polsador canvia de mode i torna a comencar
  if (digitalRead(BOTO_MODE) == LOW) {
    modeTancat = !modeTancat;
    while (digitalRead(BOTO_MODE) == LOW) { }   // espera que el deixis anar
    delay(50);
    comenca();
  }

  if (acabat) return;                  // ja ha fet la seva feina

  if (!modeTancat) {
    // LLAC OBERT: una ordre i prou. Hi som? El programa no ho sap.
    base.write(ANGLE_OBJECTIU);
    Serial.print("He enviat la base a ");
    Serial.print(ANGLE_OBJECTIU);
    Serial.println(" graus. Toca el final de carrera? No ho se.");
    acabat = true;
  } else {
    // LLAC TANCAT: el sensor diu quan hem arribat
    if (digitalRead(PIN_COLLISIO) == LOW) {
      Serial.print("Final de carrera a ");
      Serial.print(angle);
      Serial.println(" graus: aquest es el zero REAL de la base.");
      acabat = true;
    } else if (angle <= 0) {
      Serial.println("No he trobat el final de carrera! Revisa el sensor.");
      acabat = true;
    } else {
      angle = angle - 1;
      base.write(angle);
      delay(PAS_HOMING);
    }
  }
}
