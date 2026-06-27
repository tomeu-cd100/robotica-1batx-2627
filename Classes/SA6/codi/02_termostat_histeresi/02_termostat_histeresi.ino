/*
  SA6 - 02_termostat_histeresi.ino
  Control tot/res amb HISTERESI per evitar oscil-lacions al voltant de la consigna.
  Llegeix un sensor (NTC o potenciometre) a A0 i activa una sortida (pin 9).
  Encen quan la lectura supera LLINDAR_ALT i apaga quan baixa de LLINDAR_BAIX.
  (La lectura 0-1023 fa de "temperatura"; mes valor = mes calor.)
*/

const int SENSOR = A0;
const int SORTIDA = 9;     // ventilador/LED

const int LLINDAR_ALT  = 600;  // encen el ventilador (massa calor)
const int LLINDAR_BAIX = 500;  // apaga (ja s'ha refredat)

bool actiu = false;

void setup() {
  pinMode(SORTIDA, OUTPUT);
  Serial.begin(9600);
}

void loop() {
  int t = analogRead(SENSOR);

  if (!actiu && t > LLINDAR_ALT) {
    actiu = true;               // s'ha escalfat: engega
  } else if (actiu && t < LLINDAR_BAIX) {
    actiu = false;              // s'ha refredat: atura
  }

  digitalWrite(SORTIDA, actiu ? HIGH : LOW);

  Serial.print(t);
  Serial.print("  actiu=");
  Serial.println(actiu);
  delay(100);
}
