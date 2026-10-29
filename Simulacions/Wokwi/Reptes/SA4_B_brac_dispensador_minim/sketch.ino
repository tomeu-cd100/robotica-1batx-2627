/*
  Solucionari Repte SA4-B · Brac dispensador (MINIM)
  Cada premuda del polsador A fa UN cicle: el brac agafa una peca de
  l'estacio de recollida, la porta a l'altre costat, la deixa i torna a casa.
  Una funcio posa() per a la posicio sencera, amb el rang segur a dins.
  Circuit: servos base=9, esquerre=6, dret=10, pinca=11 (PILES + GND comu);
           polsador entre D3 i GND.
*/

#include <Servo.h>

Servo base, esquerre, dret, pinca;

const int BOTO = 3;

const int BASE_MIN = 0,      BASE_MAX = 180;
const int ESQUERRE_MIN = 40, ESQUERRE_MAX = 150;
const int DRET_MIN = 40,     DRET_MAX = 150;
const int PINCA_TANCADA = 60, PINCA_OBERTA = 120;

// Posicions de la tasca (ajusteu-les al vostre brac)
const int BASE_ESTACIO = 45, BASE_DESTI = 135, BASE_CASA = 90;
const int ESQ_AMUNT = 90, ESQ_AVALL = 130;
const int DRET_AMUNT = 90, DRET_AVALL = 120;

void posa(int b, int e, int d, int p) {
  base.write(constrain(b, BASE_MIN, BASE_MAX));
  esquerre.write(constrain(e, ESQUERRE_MIN, ESQUERRE_MAX));
  dret.write(constrain(d, DRET_MIN, DRET_MAX));
  pinca.write(constrain(p, PINCA_TANCADA, PINCA_OBERTA));
  delay(500);
}

void dispensa() {
  posa(BASE_ESTACIO, ESQ_AMUNT, DRET_AMUNT, PINCA_OBERTA);   // va a l'estacio
  posa(BASE_ESTACIO, ESQ_AVALL, DRET_AVALL, PINCA_OBERTA);   // baixa
  posa(BASE_ESTACIO, ESQ_AVALL, DRET_AVALL, PINCA_TANCADA);  // agafa
  posa(BASE_ESTACIO, ESQ_AMUNT, DRET_AMUNT, PINCA_TANCADA);  // puja
  posa(BASE_DESTI, ESQ_AMUNT, DRET_AMUNT, PINCA_TANCADA);    // gira
  posa(BASE_DESTI, ESQ_AVALL, DRET_AVALL, PINCA_TANCADA);    // baixa
  posa(BASE_DESTI, ESQ_AVALL, DRET_AVALL, PINCA_OBERTA);     // deixa
  posa(BASE_CASA, ESQ_AMUNT, DRET_AMUNT, PINCA_TANCADA);     // a casa
}

void setup() {
  pinMode(BOTO, INPUT_PULLUP);
  base.attach(9);
  esquerre.attach(6);
  dret.attach(10);
  pinca.attach(11);
  posa(BASE_CASA, ESQ_AMUNT, DRET_AMUNT, PINCA_TANCADA);
}

void loop() {
  if (digitalRead(BOTO) == LOW) {
    dispensa();
    while (digitalRead(BOTO) == LOW) {
      // espera que es deixi anar: un cicle per premuda
    }
    delay(50);   // antirebot en deixar anar
  }
}
