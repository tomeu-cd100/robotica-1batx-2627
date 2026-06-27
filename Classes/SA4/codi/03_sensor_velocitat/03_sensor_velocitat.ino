/*
  SA4 - 03_sensor_velocitat.ino
  La distancia mesurada per l'ultrasons regula la velocitat del motor.
  Com mes a prop, mes lent; per sota d'un llindar de seguretat, s'atura.
  Circuit: ENA=5, IN1=7, IN2=8 ; HC-SR04 TRIG=12, ECHO=11.
*/

const int ENA = 5, IN1 = 7, IN2 = 8;
const int TRIG = 12, ECHO = 11;
const int SEGURETAT = 10;   // cm

float mesuraDistancia() {
  digitalWrite(TRIG, LOW);  delayMicroseconds(2);
  digitalWrite(TRIG, HIGH); delayMicroseconds(10);
  digitalWrite(TRIG, LOW);
  long t = pulseIn(ECHO, HIGH);
  return t * 0.034 / 2.0;
}

void endavant(int vel) {
  digitalWrite(IN1, HIGH);
  digitalWrite(IN2, LOW);
  analogWrite(ENA, vel);
}

void atura() {
  analogWrite(ENA, 0);
}

void setup() {
  pinMode(ENA, OUTPUT); pinMode(IN1, OUTPUT); pinMode(IN2, OUTPUT);
  pinMode(TRIG, OUTPUT); pinMode(ECHO, INPUT);
  Serial.begin(9600);
}

void loop() {
  float d = mesuraDistancia();
  Serial.println(d);

  if (d < SEGURETAT) {
    atura();                 // massa a prop: frena
  } else {
    // Reescala la distancia (10..50 cm) a velocitat (80..255)
    int vel = map((int)d, SEGURETAT, 50, 80, 255);
    vel = constrain(vel, 80, 255);
    endavant(vel);
  }
  delay(50);
}
