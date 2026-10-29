/*
  Solucionari Repte SA4-B · Brac dispensador (AMPLIAT)
  AMPLIACIO 1: moviment SUAU entre posicions (tots els servos arriben alhora).
  AMPLIACIO 2: nomes dispensa si l'ULTRASONS veu una peca a l'estacio
               (si no n'hi ha, ho diu pel Monitor serie i no es mou).
  AMPLIACIO 3: compta les dosis i s'atura a MAX_DOSIS; cada cicle i el
               total es mostren pel Monitor serie.
  Circuit: servos base=9, esquerre=6, dret=10, pinca=11 (PILES + GND comu);
           polsador entre D3 i GND; ultrasons TRIG=7, ECHO=8.
*/

#include <Servo.h>

Servo base, esquerre, dret, pinca;

const int BOTO = 3;
const int TRIG = 7, ECHO = 8;
const int DIST_PECA = 15;      // cm: mes a prop = hi ha peca
const int MAX_DOSIS = 5;

const int BASE_MIN = 0,      BASE_MAX = 180;
const int ESQUERRE_MIN = 40, ESQUERRE_MAX = 150;
const int DRET_MIN = 40,     DRET_MAX = 150;
const int PINCA_TANCADA = 60, PINCA_OBERTA = 120;

const int BASE_ESTACIO = 45, BASE_DESTI = 135, BASE_CASA = 90;
const int ESQ_AMUNT = 90, ESQ_AVALL = 130;
const int DRET_AMUNT = 90, DRET_AVALL = 120;

const int PASSOS = 30;         // AMPLIACIO 1: trams de cada moviment
const int PAUSA_PAS = 15;      // ms per tram

int ara[4] = {BASE_CASA, ESQ_AMUNT, DRET_AMUNT, PINCA_TANCADA};
int dosis = 0;

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

void escriu(int b, int e, int d, int p) {
  base.write(b);
  esquerre.write(e);
  dret.write(d);
  pinca.write(p);
}

// AMPLIACIO 1: interpola entre la posicio actual i la nova en PASSOS trams
void posa(int b, int e, int d, int p) {
  int fi[4] = {constrain(b, BASE_MIN, BASE_MAX),
               constrain(e, ESQUERRE_MIN, ESQUERRE_MAX),
               constrain(d, DRET_MIN, DRET_MAX),
               constrain(p, PINCA_TANCADA, PINCA_OBERTA)};
  for (int i = 1; i <= PASSOS; i++) {
    escriu(map(i, 0, PASSOS, ara[0], fi[0]),
           map(i, 0, PASSOS, ara[1], fi[1]),
           map(i, 0, PASSOS, ara[2], fi[2]),
           map(i, 0, PASSOS, ara[3], fi[3]));
    delay(PAUSA_PAS);
  }
  for (int k = 0; k < 4; k++) ara[k] = fi[k];
  delay(150);
}

void dispensa() {
  posa(BASE_ESTACIO, ESQ_AMUNT, DRET_AMUNT, PINCA_OBERTA);
  posa(BASE_ESTACIO, ESQ_AVALL, DRET_AVALL, PINCA_OBERTA);
  posa(BASE_ESTACIO, ESQ_AVALL, DRET_AVALL, PINCA_TANCADA);
  posa(BASE_ESTACIO, ESQ_AMUNT, DRET_AMUNT, PINCA_TANCADA);
  posa(BASE_DESTI, ESQ_AMUNT, DRET_AMUNT, PINCA_TANCADA);
  posa(BASE_DESTI, ESQ_AVALL, DRET_AVALL, PINCA_TANCADA);
  posa(BASE_DESTI, ESQ_AVALL, DRET_AVALL, PINCA_OBERTA);
  posa(BASE_CASA, ESQ_AMUNT, DRET_AMUNT, PINCA_TANCADA);
}

void setup() {
  Serial.begin(9600);
  pinMode(BOTO, INPUT_PULLUP);
  pinMode(TRIG, OUTPUT);
  pinMode(ECHO, INPUT);
  escriu(ara[0], ara[1], ara[2], ara[3]);
  base.attach(9);
  esquerre.attach(6);
  dret.attach(10);
  pinca.attach(11);
}

void loop() {
  if (digitalRead(BOTO) == LOW) {
    if (dosis >= MAX_DOSIS) {                       // AMPLIACIO 3
      Serial.println("Diposit esgotat: maxim de dosis");
    } else if (mesuraDistancia() > DIST_PECA) {     // AMPLIACIO 2
      Serial.println("No hi ha cap peca a l'estacio");
    } else {
      dispensa();
      dosis++;
      Serial.print("Dosi ");
      Serial.print(dosis);
      Serial.print(" de ");
      Serial.println(MAX_DOSIS);
    }
    while (digitalRead(BOTO) == LOW) {
      // un cicle per premuda
    }
    delay(50);
  }
}
