/*
  SA7 - Robot reactiu (per a Wokwi)
  Prova la LOGICA reactiva percepcio -> decisio -> accio SENSE robot fisic:
  Wokwi no mou rodes, pero els 3 LEDs mostren QUE farien els motors.
    VERD    = endavant (via lliure)
    GROC    = atura    (zona de confort)
    VERMELL = enrere   (massa a prop)
  En un robot real, aquests pins anirien al driver dels motors (vegeu el
  codi de la SA7), aqui hi posem LEDs per VEURE la decisio.

  Circuit: HC-SR04 TRIG=12 ECHO=11 ; LED verd=8, groc=4, vermell=7 (220R cada un).
  A Wokwi: clica el sensor HC-SR04 i mou el control de "distance" per provar-ho.
*/

const int TRIG = 12;
const int ECHO = 11;
const int VERD = 8;      // endavant
const int GROC = 4;      // atura
const int VERMELL = 7;   // enrere

// Dos llindars amb zona de confort al mig (evita el "va-i-ve" al voltant d'un valor).
const int A_PROP  = 10;  // cm: per sota d'aixo, massa a prop -> recula
const int A_LLUNY = 20;  // cm: per sobre d'aixo, via lliure  -> avanca

float distancia() {
  digitalWrite(TRIG, LOW);
  delayMicroseconds(2);
  digitalWrite(TRIG, HIGH);
  delayMicroseconds(10);
  digitalWrite(TRIG, LOW);
  long t = pulseIn(ECHO, HIGH, 30000);   // timeout 30 ms
  if (t == 0) return 400;                // sense eco: molt lluny
  return t * 0.034 / 2.0;                // temps (us) -> distancia (cm)
}

// Encen NOMES el LED de l'estat triat; els altres, apagats.
void mostraEstat(int verd, int groc, int vermell) {
  digitalWrite(VERD, verd);
  digitalWrite(GROC, groc);
  digitalWrite(VERMELL, vermell);
}

void setup() {
  pinMode(TRIG, OUTPUT);
  pinMode(ECHO, INPUT);
  pinMode(VERD, OUTPUT);
  pinMode(GROC, OUTPUT);
  pinMode(VERMELL, OUTPUT);
  Serial.begin(9600);
}

void loop() {
  float d = distancia();          // 1) PERCEPCIO
  Serial.println(d);

  if (d < A_PROP) {               // 2) DECISIO  +  3) ACCIO
    mostraEstat(LOW, LOW, HIGH);  // massa a prop -> enrere (vermell)
  } else if (d > A_LLUNY) {
    mostraEstat(HIGH, LOW, LOW);  // via lliure  -> endavant (verd)
  } else {
    mostraEstat(LOW, HIGH, LOW);  // zona de confort -> atura (groc)
  }

  delay(50);
}
