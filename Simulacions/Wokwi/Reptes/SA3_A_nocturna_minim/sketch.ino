/*
  Solucionari Repte SA3-A · Llum automatica nocturna (REQUISIT MINIM)
  Llegeix una LDR i encen un LED quan la llum baixa d'un llindar.
  Circuit: LDR en divisor amb 10k -> A0 ; LED al pin 9 (+220 ohm a GND).
  El valor de la LDR es veu al Monitor Serie per poder calibrar.
*/

const int LDR = A0;
const int LED = 9;
int llindar = 400;   // per sota d'aquest valor, considerem "fosc"

void setup() {
  pinMode(LED, OUTPUT);
  Serial.begin(9600);
}

void loop() {
  int llum = analogRead(LDR);   // 0..1023
  Serial.println(llum);

  if (llum < llindar) {
    digitalWrite(LED, HIGH);    // fa fosc -> encen
  } else {
    digitalWrite(LED, LOW);     // hi ha llum -> apaga
  }
  delay(100);
}
