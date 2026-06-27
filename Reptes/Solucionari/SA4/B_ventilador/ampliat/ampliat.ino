/*
  Solucionari Repte SA4-B · Ventilador/vehicle amb motor DC (AMPLIAT)
  AMPLIACIO 1: regula la velocitat amb PWM des d'un potenciometre.
  AMPLIACIO 2: canvi de sentit (endavant/enrere) amb el pont H i un polsador.
  AMPLIACIO 3: seqüencia (accelera, mante, frena) amb funcions.
  SEGURETAT: motor amb font EXTERNA i MASSA COMUNA.
  Circuit: ENA=5(PWM), IN1=7, IN2=8 ; potenciometre -> A0 ; polsador entre pin 2 i GND.
*/

const int ENA = 5, IN1 = 7, IN2 = 8;
const int POT = A0, POLSADOR = 2;
bool endavantDir = true;
int estatAnterior = HIGH;

void aplica(bool dir, int velocitat) {
  digitalWrite(IN1, dir ? HIGH : LOW);
  digitalWrite(IN2, dir ? LOW : HIGH);
  analogWrite(ENA, velocitat);
}

// AMPLIACIO 3: seqüencia de demostracio
void seqAccelera() {
  for (int v = 0; v <= 255; v += 5) { aplica(endavantDir, v); delay(30); }  // accelera
  delay(1500);                                                              // mante
  for (int v = 255; v >= 0; v -= 5) { aplica(endavantDir, v); delay(30); }  // frena
}

void setup() {
  pinMode(ENA, OUTPUT); pinMode(IN1, OUTPUT); pinMode(IN2, OUTPUT);
  pinMode(POLSADOR, INPUT_PULLUP);
}

void loop() {
  // AMPLIACIO 2: el polsador inverteix el sentit
  int estat = digitalRead(POLSADOR);
  if (estat == LOW && estatAnterior == HIGH) { endavantDir = !endavantDir; delay(40); }
  estatAnterior = estat;

  // AMPLIACIO 1: la velocitat la fixa el potenciometre
  int velocitat = map(analogRead(POT), 0, 1023, 0, 255);
  aplica(endavantDir, velocitat);

  // Per provar la seqüencia de l'AMPLIACIO 3, descomenta:
  // seqAccelera();
}
