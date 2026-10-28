/*
  Solucionari Repte SA4-C · Brac que apren: registre i replay (MINIM)
  Amb els potenciometres es mou el brac. El polsador A GRAVA la posicio
  actual (fins a MAX_PUNTS) i el polsador B REPRODUEIX tots els punts gravats.
  Circuit: servos base=9, esquerre=6, dret=10, pinca=11 (PILES + GND comu);
           pots base=A0, dret=A1, pinca=A2, esquerre=A3;
           polsador A entre D3 i GND, polsador B entre D4 i GND.
*/

#include <Servo.h>

Servo base, esquerre, dret, pinca;

const int BOTO_GRAVA = 3;
const int BOTO_REPRODUEIX = 4;
const int MAX_PUNTS = 10;
const unsigned long PAUSA_PUNT = 700;   // ms entre punts del replay

const int BASE_MIN = 0,      BASE_MAX = 180;
const int ESQUERRE_MIN = 40, ESQUERRE_MAX = 150;
const int DRET_MIN = 40,     DRET_MAX = 150;
const int PINCA_MIN = 60,    PINCA_MAX = 120;

// Una llista per servo: el punt i es (seqBase[i], seqEsq[i], seqDret[i], seqPinca[i])
int seqBase[MAX_PUNTS], seqEsq[MAX_PUNTS], seqDret[MAX_PUNTS], seqPinca[MAX_PUNTS];
int numPunts = 0;

int aBase, aEsq, aDret, aPinca;

void llegeixPots() {
  aBase = map(analogRead(A0), 0, 1023, BASE_MIN, BASE_MAX);
  aDret = map(analogRead(A1), 0, 1023, DRET_MIN, DRET_MAX);
  aPinca = map(analogRead(A2), 0, 1023, PINCA_MIN, PINCA_MAX);
  aEsq = map(analogRead(A3), 0, 1023, ESQUERRE_MIN, ESQUERRE_MAX);
}

void escriu(int b, int e, int d, int p) {
  base.write(b);
  esquerre.write(e);
  dret.write(d);
  pinca.write(p);
}

void grava() {
  if (numPunts < MAX_PUNTS) {
    seqBase[numPunts] = aBase;
    seqEsq[numPunts] = aEsq;
    seqDret[numPunts] = aDret;
    seqPinca[numPunts] = aPinca;
    numPunts++;
    Serial.print("Punt gravat: ");
    Serial.println(numPunts);
  } else {
    Serial.println("Memoria plena");
  }
}

void reprodueix() {
  for (int i = 0; i < numPunts; i++) {
    escriu(seqBase[i], seqEsq[i], seqDret[i], seqPinca[i]);
    delay(PAUSA_PUNT);
  }
}

void setup() {
  Serial.begin(9600);
  pinMode(BOTO_GRAVA, INPUT_PULLUP);
  pinMode(BOTO_REPRODUEIX, INPUT_PULLUP);
  base.attach(9);
  esquerre.attach(6);
  dret.attach(10);
  pinca.attach(11);
}

void loop() {
  llegeixPots();
  escriu(aBase, aEsq, aDret, aPinca);

  if (digitalRead(BOTO_GRAVA) == LOW) {
    grava();
    while (digitalRead(BOTO_GRAVA) == LOW) { }   // un punt per premuda
    delay(50);
  }
  if (digitalRead(BOTO_REPRODUEIX) == LOW) {
    reprodueix();
    while (digitalRead(BOTO_REPRODUEIX) == LOW) { }
    delay(50);
  }
  delay(20);
}
