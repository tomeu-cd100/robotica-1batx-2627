/*
  Solucionari Repte SA6-C · Regulador proporcional (AMPLIAT)
  AMPLIACIO 1: ajusta la constant proporcional (Kp) amb un potenciometre i observa l'efecte.
  AMPLIACIO 2: compara amb un control tot-o-res (alterna amb el boto).
  AMPLIACIO 3: aplica-ho a un motor (velocitat proporcional a la distancia d'un ultrasons).
  Circuit: HC-SR04 TRIG=12 ECHO=11 ; motor pont H ENA=5 IN1=7 IN2=8 ;
           potenciometre Kp -> A0 ; polsador mode entre pin 2 i GND.
*/

const int TRIG = 12, ECHO = 11;
const int ENA = 5, IN1 = 7, IN2 = 8;
const int POT_KP = A0, POLSADOR = 2;
const int CONSIGNA = 25;     // distancia objectiu (cm)
bool modeProporcional = true;
int estatAnterior = HIGH;

float mesuraDistancia() {
  digitalWrite(TRIG, LOW);  delayMicroseconds(2);
  digitalWrite(TRIG, HIGH); delayMicroseconds(10);
  digitalWrite(TRIG, LOW);
  long t = pulseIn(ECHO, HIGH, 30000);
  if (t == 0) return 400;
  return t * 0.034 / 2.0;
}

float distanciaMitjana() {
  // AMPLIACIO 3 (fita 1): mitjana de 3 lectures per tenir una distancia ESTABLE
  // (descarta les lectures amb timeout, que retornen 400)
  float suma = 0;
  int valides = 0;
  for (int i = 0; i < 3; i++) {
    float d = mesuraDistancia();
    if (d < 400) { suma += d; valides++; }
    delay(10);   // petit espaiat perque els ecos no es trepitgin
  }
  if (valides == 0) return 400;   // cap lectura valida
  return suma / valides;
}

void motor(int velocitat) {
  digitalWrite(IN1, HIGH); digitalWrite(IN2, LOW);
  analogWrite(ENA, constrain(velocitat, 0, 255));
}

void setup() {
  pinMode(TRIG, OUTPUT); pinMode(ECHO, INPUT);
  pinMode(ENA, OUTPUT); pinMode(IN1, OUTPUT); pinMode(IN2, OUTPUT);
  pinMode(POLSADOR, INPUT_PULLUP);
  Serial.begin(9600);
}

void loop() {
  // AMPLIACIO 2: el polsador alterna proporcional / tot-o-res
  int estat = digitalRead(POLSADOR);
  if (estat == LOW && estatAnterior == HIGH) { modeProporcional = !modeProporcional; delay(40); }
  estatAnterior = estat;

  float d = distanciaMitjana();   // fita 1: lectura estable (mitjana de 3)
  float error = d - CONSIGNA;          // AMPLIACIO 3: error de distancia

  int velocitat;
  if (modeProporcional) {
    // AMPLIACIO 1: Kp ajustable amb el potenciometre (0..2)
    float Kp = analogRead(POT_KP) / 512.0;
    velocitat = (int)(Kp * error);     // mes lluny -> mes rapid
  } else {
    velocitat = (error > 0) ? 200 : 0; // tot-o-res
  }
  motor(velocitat);

  Serial.print(modeProporcional ? "P " : "ONOFF ");
  Serial.print(d); Serial.print(" "); Serial.println(velocitat);
  delay(50);
}
