/*
  SA6 - 02_pinca_histeresi.ino
  Control TOT/RES amb HISTERESI: la pinca automatica de l'estacio de recollida.
  Quan un objecte s'acosta a menys de TANCA_CM, la pinca es tanca (l'agafa).
  Nomes es torna a obrir quan l'objecte s'allunya mes de OBRE_CM.
  Entre els dos llindars, la pinca MANTE el que feia: no fa "clic-clic".
  Circuit: servo pinca=11 (piles + GND comu); ultrasons TRIG=7, ECHO=8.
  Mou la ma a poc a poc davant l'ultrasons i mira el Serial Plotter.
  Quan: S2 - modelatge
*/

#include <Servo.h>

const int TRIG = 7;
const int ECHO = 8;

const int TANCA_CM = 6;      // llindar BAIX: mes a prop, es tanca
const int OBRE_CM = 10;      // llindar ALT: mes lluny, s'obre
const int PINCA_TANCADA = 60;
const int PINCA_OBERTA = 120;

Servo pinca;
bool pincaTancada = false;   // l'ESTAT: la memoria del sistema

// La funcio de la SA3 (i de 03_ultrasons_brac de la SA4)
float mesuraDistancia() {
  digitalWrite(TRIG, LOW);
  delayMicroseconds(2);
  digitalWrite(TRIG, HIGH);
  delayMicroseconds(10);
  digitalWrite(TRIG, LOW);
  long temps = pulseIn(ECHO, HIGH, 30000);
  if (temps == 0) return 400;
  return temps * 0.034 / 2.0;
}

void setup() {
  pinMode(TRIG, OUTPUT);
  pinMode(ECHO, INPUT);
  pinca.write(PINCA_OBERTA);
  pinca.attach(11);
  Serial.begin(9600);
}

void loop() {
  float d = mesuraDistancia();

  if (!pincaTancada && d < TANCA_CM) {
    pincaTancada = true;               // objecte a prop: l'agafa
    pinca.write(PINCA_TANCADA);
  } else if (pincaTancada && d > OBRE_CM) {
    pincaTancada = false;              // objecte lluny: la deixa anar
    pinca.write(PINCA_OBERTA);
  }
  // Entre TANCA_CM i OBRE_CM: no es toca res (la histeresi)

  // Serial Plotter: distancia, els dos llindars i l'estat de la pinca
  Serial.print(d);
  Serial.print(" ");
  Serial.print(TANCA_CM);
  Serial.print(" ");
  Serial.print(OBRE_CM);
  Serial.print(" ");
  Serial.println(pincaTancada ? 15 : 0);

  delay(60);
}
