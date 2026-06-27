/*
  Solucionari Repte SA4-B · Ventilador/vehicle amb motor DC (REQUISIT MINIM)
  Engega i para un motor DC mitjancant un pont H, controlat per un polsador.
  SEGURETAT: el motor s'alimenta amb font EXTERNA, amb MASSA COMUNA amb l'Arduino.
  Circuit: pont H ENA=5(PWM), IN1=7, IN2=8 ; polsador entre pin 2 i GND.
*/

const int ENA = 5, IN1 = 7, IN2 = 8;
const int POLSADOR = 2;
bool engegat = false;
int estatAnterior = HIGH;

void setup() {
  pinMode(ENA, OUTPUT); pinMode(IN1, OUTPUT); pinMode(IN2, OUTPUT);
  pinMode(POLSADOR, INPUT_PULLUP);
}

void loop() {
  int estat = digitalRead(POLSADOR);
  if (estat == LOW && estatAnterior == HIGH) {   // flanc de premuda
    engegat = !engegat;                          // alterna engegar/parar
    delay(40);                                   // antirebot simple
  }
  estatAnterior = estat;

  if (engegat) {
    digitalWrite(IN1, HIGH); digitalWrite(IN2, LOW);   // endavant
    analogWrite(ENA, 200);
  } else {
    analogWrite(ENA, 0);                               // parat
  }
}
