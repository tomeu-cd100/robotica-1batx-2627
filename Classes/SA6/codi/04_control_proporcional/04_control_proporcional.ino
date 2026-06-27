/*
  SA6 - 04_control_proporcional.ino
  Control PROPORCIONAL (P): la sortida depen de l'error (diferencia amb la consigna).
  Exemple: regular la velocitat d'un ventilador (PWM, pin 9) segons la "temperatura" (A0).
  Com mes calor per sobre de la consigna, mes velocitat.
  Compara'l amb el control tot/res (02): la resposta es mes suau.
*/

const int SENSOR = A0;
const int SORTIDA = 9;        // ventilador/LED (PWM)

const int CONSIGNA = 500;     // valor objectiu (0-1023)
const float Kp = 0.8;         // constant proporcional (ajusta-la!)

void setup() {
  pinMode(SORTIDA, OUTPUT);
  Serial.begin(9600);
}

void loop() {
  int t = analogRead(SENSOR);
  int error = t - CONSIGNA;          // si fa mes calor del desitjat, error > 0

  int sortida = (int)(Kp * error);   // actuacio proporcional a l'error
  sortida = constrain(sortida, 0, 255);  // limita a un rang valid de PWM

  analogWrite(SORTIDA, sortida);

  // Per al Serial Plotter: consigna, lectura i sortida
  Serial.print(CONSIGNA); Serial.print(" ");
  Serial.print(t);        Serial.print(" ");
  Serial.println(sortida);
  delay(50);
}
