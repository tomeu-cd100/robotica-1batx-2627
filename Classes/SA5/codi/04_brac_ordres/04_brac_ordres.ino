/*
  SA5 - 04_brac_ordres.ino  (el brac obeeix ORDRES DE TEXT)
  L'Arduino del brac llegeix ordres per Serial, una per linia, i mou els
  servos: B+ B- (base), D+ D- (dret), E+ E- (esquerre), P (obre/tanca pinca).
  Les ordres poden venir del Monitor serie (9600, "Nova linia") o de la
  micro:bit PONT, que les passa pel pin D0 (SA5-S3).
  Circuit: servos base=9, esquerre=6, dret=10, pinca=11 (PILES + GND comu);
           micro:bit pont: P1 -> D0, GND -> GND.
  ATENCIO: desconnecta el cable del D0 per PUJAR el programa.
  Quan: S2 - taller (prova amb el Monitor serie) i S3 - amb el pont
*/

#include <Servo.h>

const int PAS = 3;           // graus per ordre rebuda

const int BASE_MIN = 0,      BASE_MAX = 180;
const int ESQUERRE_MIN = 40, ESQUERRE_MAX = 150;
const int DRET_MIN = 40,     DRET_MAX = 150;
const int PINCA_TANCADA = 60, PINCA_OBERTA = 120;

Servo base, esquerre, dret, pinca;

int aBase = 90, aEsquerre = 90, aDret = 90, aPinca = PINCA_TANCADA;

void escriu() {
  base.write(aBase);
  esquerre.write(aEsquerre);
  dret.write(aDret);
  pinca.write(aPinca);
}

void setup() {
  Serial.begin(9600);
  Serial.setTimeout(50);     // no esperis mes de 50 ms una linia a mitges
  escriu();                  // write() abans d'attach(): sense salts
  base.attach(9);
  esquerre.attach(6);
  dret.attach(10);
  pinca.attach(11);
  Serial.println("Llest: escriu B+ B- D+ D- E+ E- o P");
}

void loop() {
  if (Serial.available() > 0) {
    String ordre = Serial.readStringUntil('\n');
    ordre.trim();            // treu espais i el '\r' del final

    if (ordre == "B+") {
      aBase = min(aBase + PAS, BASE_MAX);
    } else if (ordre == "B-") {
      aBase = max(aBase - PAS, BASE_MIN);
    } else if (ordre == "D+") {
      aDret = min(aDret + PAS, DRET_MAX);
    } else if (ordre == "D-") {
      aDret = max(aDret - PAS, DRET_MIN);
    } else if (ordre == "E+") {
      aEsquerre = min(aEsquerre + PAS, ESQUERRE_MAX);
    } else if (ordre == "E-") {
      aEsquerre = max(aEsquerre - PAS, ESQUERRE_MIN);
    } else if (ordre == "P") {
      if (aPinca == PINCA_TANCADA) {
        aPinca = PINCA_OBERTA;
      } else {
        aPinca = PINCA_TANCADA;
      }
    }
    escriu();
  }
}
