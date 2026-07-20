/*
  SA4 - 06_moviment_BASTIDA.ino  (BASTIDA / esquelet per a l'alumnat)

  El muntatge dificil ja esta fet: pins amb nom, pinMode() al setup()
  i un loop() que ja CRIDA les funcions de moviment en ordre.
  Tu nomes has d'OMPLIR els // TODO: de dins de cada funcio amb els
  digitalWrite() (sentit) i analogWrite() (velocitat) que calguin.

  Recorda (pont H L298N):
    - IN1 i IN2 decideixen el SENTIT de gir del motor.
    - ENA (pin PWM ~) regula la VELOCITAT amb analogWrite() (0..255).
    - Per anar ENDAVANT: un IN a HIGH i l'altre a LOW.
    - Per anar ENRERE: intercanvia HIGH i LOW.
    - Per ATURAR: els dos IN a LOW i analogWrite(ENA, 0).

  Circuit: ENA=5 (PWM), IN1=7, IN2=8. Motor amb alimentacio externa. MASSA COMUNA.
  Quan: S2 - bastida del motor
*/

const int ENA = 5;   // PWM: velocitat
const int IN1 = 7;   // direccio
const int IN2 = 8;   // direccio

void endavant(int velocitat) {   // velocitat 0..255
  // TODO: posa IN1 a HIGH i IN2 a LOW (sentit endavant)
  // TODO: aplica la velocitat amb analogWrite(ENA, velocitat)
}

void enrere(int velocitat) {     // velocitat 0..255
  // TODO: intercanvia els IN respecte a endavant() (sentit contrari)
  // TODO: aplica la velocitat amb analogWrite(ENA, velocitat)
}

void atura() {
  // TODO: posa IN1 i IN2 a LOW
  // TODO: analogWrite(ENA, 0) per aturar el motor
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
