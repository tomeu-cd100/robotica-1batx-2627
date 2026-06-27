/*
  SA6 - 01_llac_obert_vs_tancat.ino
  Compara el control en LLAÇ OBERT i en LLAÇ TANCAT amb el mateix muntatge.
  - Llaç obert: encen la sortida un temps fix, sense mirar el sensor.
  - Llaç tancat: encen/apaga segons la lectura del sensor (realimentacio).
  Circuit: sensor (NTC o pot) a A0 ; sortida (LED/ventilador) a pin 9.
  Canvia la variable MODE per provar cada cas.
*/

const int SENSOR = A0;
const int SORTIDA = 9;

int MODE = 1;            // 0 = llac obert ; 1 = llac tancat
const int CONSIGNA = 500; // valor objectiu (en unitats de lectura 0-1023)

void setup() {
  pinMode(SORTIDA, OUTPUT);
  Serial.begin(9600);
}

void loop() {
  if (MODE == 0) {
    // LLAÇ OBERT: actua un temps fix sense comprovar res
    digitalWrite(SORTIDA, HIGH);
    delay(2000);
    digitalWrite(SORTIDA, LOW);
    delay(2000);
  } else {
    // LLAÇ TANCAT: decideix segons el sensor
    int lectura = analogRead(SENSOR);
    Serial.println(lectura);
    if (lectura > CONSIGNA) {
      digitalWrite(SORTIDA, HIGH);   // cal actuar
    } else {
      digitalWrite(SORTIDA, LOW);
    }
    delay(100);
  }
}
