/*
  SA1 - blink_millis.ino  (AMPLIACIO)
  Parpelleig SENSE delay(): la placa no s'atura mentre espera.
  Tecnica: comparar el temps transcorregut amb millis().
  Per que importa: amb delay() la placa queda "congelada"; amb millis()
  podria fer altres coses alhora (llegir un boto, un sensor...). Es la base
  del control de sistemes que faran diverses tasques a la vegada.
*/

const int LED = 13;
const unsigned long INTERVAL = 500;   // mig segon entre canvis (ms)

unsigned long anterior = 0;   // moment de l'ultim canvi
int estat = LOW;              // estat actual del LED

void setup() {
  pinMode(LED, OUTPUT);
}

void loop() {
  unsigned long ara = millis();        // mil·lisegons des que la placa va arrencar

  // Ha passat prou temps des de l'ultim canvi?
  if (ara - anterior >= INTERVAL) {
    anterior = ara;                    // desem el nou moment de referencia
    estat = (estat == LOW) ? HIGH : LOW;  // invertim l'estat
    digitalWrite(LED, estat);
  }

  // Aqui el loop continua lliure: es podria llegir un sensor sense esperar.
}
