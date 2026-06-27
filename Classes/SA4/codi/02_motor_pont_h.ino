/*
  SA4 - 02_motor_pont_h.ino
  Motor DC amb driver pont H (L298N): direccio i velocitat.
  Circuit: ENA=5 (PWM), IN1=7, IN2=8. Alimentacio externa al motor. MASSA COMUNA.
  Demostra funcions propies: endavant(), enrere(), atura().
*/

const int ENA = 5;   // PWM: velocitat
const int IN1 = 7;   // direccio
const int IN2 = 8;   // direccio

void endavant(int velocitat) {   // velocitat 0..255
  digitalWrite(IN1, HIGH);
  digitalWrite(IN2, LOW);
  analogWrite(ENA, velocitat);
}

void enrere(int velocitat) {
  digitalWrite(IN1, LOW);
  digitalWrite(IN2, HIGH);
  analogWrite(ENA, velocitat);
}

void atura() {
  digitalWrite(IN1, LOW);
  digitalWrite(IN2, LOW);
  analogWrite(ENA, 0);
}

void setup() {
  pinMode(ENA, OUTPUT);
  pinMode(IN1, OUTPUT);
  pinMode(IN2, OUTPUT);
}

void loop() {
  endavant(200);  delay(2000);
  atura();        delay(1000);
  enrere(150);    delay(2000);
  atura();        delay(1000);
}
