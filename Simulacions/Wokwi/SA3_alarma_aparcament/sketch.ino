/*
  SA3 - Alarma d'aparcament (per a Wokwi)
  Alarma de proximitat: com mes a prop esta l'objecte, mes rapid sona el piezo
  i mes "alerta" el LED.
  Circuit: HC-SR04 TRIG=12 ECHO=11 ; LED=8 (amb 220R) ; buzzer=6.
  A Wokwi: clica el sensor HC-SR04 i mou el control de distancia per provar-ho.
*/

const int TRIG = 12;
const int ECHO = 11;
const int LED = 8;
const int PIEZO = 6;

// Llindars de distancia (cm) - personalitzables
const int LLUNY = 30;
const int PROP  = 10;

float mesuraDistancia() {
  digitalWrite(TRIG, LOW);
  delayMicroseconds(2);
  digitalWrite(TRIG, HIGH);
  delayMicroseconds(10);
  digitalWrite(TRIG, LOW);
  long temps = pulseIn(ECHO, HIGH, 30000);  // timeout 30 ms
  if (temps == 0) return 400;               // sense eco: fora de rang (evita falsa alarma)
  return temps * 0.034 / 2.0;
}

void setup() {
  pinMode(TRIG, OUTPUT);
  pinMode(ECHO, INPUT);
  pinMode(LED, OUTPUT);
  pinMode(PIEZO, OUTPUT);
  Serial.begin(9600);
}

void loop() {
  float d = mesuraDistancia();
  Serial.println(d);

  if (d > LLUNY) {
    // Lluny: tot tranquil
    digitalWrite(LED, LOW);
    noTone(PIEZO);
  } else if (d > PROP) {
    // Zona intermedia: bips espaiats (interval proporcional a la distancia)
    int interval = map((int)d, PROP, LLUNY, 100, 600);  // mes a prop -> mes rapid
    tone(PIEZO, 1500, 60);
    digitalWrite(LED, HIGH);
    delay(interval);
    digitalWrite(LED, LOW);
    delay(interval);
  } else {
    // Molt a prop: avis continu
    digitalWrite(LED, HIGH);
    tone(PIEZO, 2500);   // so continu
  }

  delay(20);
}
