/*
  SA4 - 03_ultrasons_brac.ino
  Del sensor al moviment: l'ultrasons de l'estacio de recollida mou el brac.
  Si hi ha un objecte a prop, la base gira cap a l'estacio i la pinca s'obre
  per rebre'l; si no n'hi ha, el brac torna a repos amb la pinca tancada.
  Circuit: servo base=9, servo pinca=11 (piles + GND comu amb l'Arduino);
           ultrasons TRIG=7, ECHO=8, VCC=5V, GND=GND.
  Quan: S3 - modelatge
*/

#include <Servo.h>

const int TRIG = 7;
const int ECHO = 8;

const int DIST_OBJECTE = 15;     // cm: mes a prop = hi ha un objecte
const int BASE_REPOS = 90;       // angle de la base mirant endavant
const int BASE_ESTACIO = 45;     // angle de la base mirant l'estacio
const int PINCA_TANCADA = 60;
const int PINCA_OBERTA = 120;

Servo base;
Servo pinca;

// La mateixa funcio de la SA3: mesura i RETORNA la distancia en cm
float mesuraDistancia() {
  digitalWrite(TRIG, LOW);
  delayMicroseconds(2);
  digitalWrite(TRIG, HIGH);     // pols de 10 us
  delayMicroseconds(10);
  digitalWrite(TRIG, LOW);

  long temps = pulseIn(ECHO, HIGH, 30000);  // timeout 30 ms
  if (temps == 0) return 400;               // sense eco: res a la vista
  return temps * 0.034 / 2.0;               // cm
}

void setup() {
  pinMode(TRIG, OUTPUT);
  pinMode(ECHO, INPUT);
  base.attach(9);
  pinca.attach(11);
  base.write(BASE_REPOS);
  pinca.write(PINCA_TANCADA);
  Serial.begin(9600);
}

void loop() {
  float d = mesuraDistancia();
  Serial.println(d);              // mira-ho al Serial Plotter

  if (d < DIST_OBJECTE) {
    // Percepcio -> accio: hi ha un objecte, el brac s'hi gira i obre
    base.write(BASE_ESTACIO);
    pinca.write(PINCA_OBERTA);
  } else {
    base.write(BASE_REPOS);
    pinca.write(PINCA_TANCADA);
  }

  delay(100);                     // ~10 mesures per segon
}
