/*
  SA6 - Termostat amb HISTERESI (per a Wokwi)
  Control tot/res amb histeresi per evitar oscil-lacions al voltant de la consigna.
  El potenciometre (A0) fa de "temperatura" (0-1023, mes valor = mes calor) i
  la sortida (pin 9, LED) fa de ventilador/calefactor.
  Encen quan supera LLINDAR_ALT i apaga quan baixa de LLINDAR_BAIX.
  A Wokwi: gira el potenciometre lentament i observa que el LED no "vibra"
  a la zona morta entre els dos llindars.
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
