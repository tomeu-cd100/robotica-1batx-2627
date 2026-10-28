/*
  SA4 - 04_brac_potenciometres.ino  (PRODUCTE de la SA4)
  El brac MeArm sencer: 4 servos controlats amb 4 potenciometres, cadascun
  dins del seu rang segur (els angles limit que has anotat al taller).
  Circuit: servos base=9, esquerre=6, dret=10, pinca=11 (PILES + GND comu);
           potenciometres base=A0, dret=A1, pinca=A2, esquerre=A3 (5V Arduino).
  ATENCIO: els 4 servos MAI des de l'USB ni del pin 5V de l'UNO.

  Truc per trobar els angles limit: obre el Monitor serie (9600). Cada mig
  segon s'hi escriuen els 4 angles. Mou un potenciometre a poc a poc fins que
  la peca toqui, i anota l'angle una mica abans.
  Quan: S4 - producte
*/

#include <Servo.h>

const int PIN_SERVO_BASE = 9;
const int PIN_SERVO_ESQUERRE = 6;   // servo nou del MeArm
const int PIN_SERVO_DRET = 10;      // ocupa el lloc del colze del brac de 3 servos
const int PIN_SERVO_PINCA = 11;

const int PIN_POT_BASE = A0;
const int PIN_POT_DRET = A1;
const int PIN_POT_PINCA = A2;
const int PIN_POT_ESQUERRE = A3;    // 4t potenciometre (el kit en porta 3)

// Limits d'angle REALS de cada servo: canvieu-los pels que heu anotat al
// bloc D de la guia. El servo mai ha de forcar el topall mecanic.
const int BASE_MIN = 0,      BASE_MAX = 180;
const int ESQUERRE_MIN = 40, ESQUERRE_MAX = 150;
const int DRET_MIN = 40,     DRET_MAX = 150;
const int PINCA_MIN = 60,    PINCA_MAX = 120;   // tancada .. oberta

// Zona morta: nomes es mou el servo si l'angle nou canvia mes d'aquests
// graus. Aixi el soroll del potenciometre no fa tremolar el brac.
const int ZONA_MORTA = 2;

Servo base, esquerre, dret, pinca;

int angleBase, angleEsquerre, angleDret, anglePinca;
unsigned long tDarrerInforme = 0;

// Llegeix un potenciometre i el converteix al rang segur del seu servo
int llegeixAngle(int pinPot, int minim, int maxim) {
  return map(analogRead(pinPot), 0, 1023, minim, maxim);
}

// Escriu l'angle nou nomes si s'allunya prou de l'actual
void mouSiCal(Servo &servo, int &actual, int nou) {
  if (abs(nou - actual) > ZONA_MORTA) {
    actual = nou;
    servo.write(actual);
  }
}

void setup() {
  Serial.begin(9600);

  // Primer es calcula la posicio dels potenciometres i despres s'engega cada
  // servo: aixi el brac no fa un salt a 90 graus en arrencar.
  angleBase = llegeixAngle(PIN_POT_BASE, BASE_MIN, BASE_MAX);
  angleEsquerre = llegeixAngle(PIN_POT_ESQUERRE, ESQUERRE_MIN, ESQUERRE_MAX);
  angleDret = llegeixAngle(PIN_POT_DRET, DRET_MIN, DRET_MAX);
  anglePinca = llegeixAngle(PIN_POT_PINCA, PINCA_MIN, PINCA_MAX);

  base.write(angleBase);
  esquerre.write(angleEsquerre);
  dret.write(angleDret);
  pinca.write(anglePinca);

  base.attach(PIN_SERVO_BASE);
  esquerre.attach(PIN_SERVO_ESQUERRE);
  dret.attach(PIN_SERVO_DRET);
  pinca.attach(PIN_SERVO_PINCA);
}

void loop() {
  mouSiCal(base, angleBase, llegeixAngle(PIN_POT_BASE, BASE_MIN, BASE_MAX));
  mouSiCal(esquerre, angleEsquerre, llegeixAngle(PIN_POT_ESQUERRE, ESQUERRE_MIN, ESQUERRE_MAX));
  mouSiCal(dret, angleDret, llegeixAngle(PIN_POT_DRET, DRET_MIN, DRET_MAX));
  mouSiCal(pinca, anglePinca, llegeixAngle(PIN_POT_PINCA, PINCA_MIN, PINCA_MAX));

  // Informe al Monitor serie sense delay(): el control no s'atura mai
  if (millis() - tDarrerInforme > 500) {
    tDarrerInforme = millis();
    Serial.print("base=");
    Serial.print(angleBase);
    Serial.print("  esquerre=");
    Serial.print(angleEsquerre);
    Serial.print("  dret=");
    Serial.print(angleDret);
    Serial.print("  pinca=");
    Serial.println(anglePinca);
  }

  delay(20);   // ~50 actualitzacions/s: suficient i suau
}
