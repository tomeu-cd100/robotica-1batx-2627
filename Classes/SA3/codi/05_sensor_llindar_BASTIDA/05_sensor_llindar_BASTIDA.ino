/*
  SA3 - 05_sensor_llindar_BASTIDA.ino  (BASTIDA / esquelet per a l'alumnat)

  El patro ja esta muntat: setup() amb Serial.begin per calibrar, la funcio de
  lectura del sensor donada, i un loop() que llegeix i mostra el valor al Monitor.
  Tu nomes has d'OMPLIR els // TODO: la comparacio amb el llindar i que fa cada cas.

  Metode SA3: llegir analogic (0..1023) -> comparar amb un llindar -> decidir.
  Munta: sensor analogic (LDR/pot en divisor) -> A1 ; LED -> [220 ohm] -> pin 9 (~) -> GND.
  Quan: S2 - bastida del llum automatic
*/

const int SENSOR = A1;      // entrada analogica (punt mig del divisor)
const int LED = 9;          // sortida (pin ~ per si despres vols graduar-lo)
const int LLINDAR = 400;    // ajusta'l mirant el Monitor serie al teu muntatge
                            // (analogRead va de 0 a 1023, NO de 0 a 255)

// Funcio propia DONADA: llegeix i RETORNA el valor del sensor (0..1023).
int llegeixSensor() {
  return analogRead(SENSOR);
}

void setup() {
  pinMode(LED, OUTPUT);
  Serial.begin(9600);       // obre Eines > Serial Monitor per calibrar el llindar
}

void loop() {
  int valor = llegeixSensor();   // 0 = minim ... 1023 = maxim

  // Mostra la lectura per poder triar be el llindar (eina de calibratge)
  Serial.print("Sensor: ");
  Serial.println(valor);

  // Decisio per llindar: completa la comparacio i l'accio de cada cas.
  if (/* TODO: compara "valor" amb LLINDAR, p. ex. valor < LLINDAR */ false) {
    // TODO: que fa el sistema quan es supera el llindar? (p. ex. digitalWrite(LED, HIGH);)
  } else {
    // TODO: que fa en cas contrari? (p. ex. digitalWrite(LED, LOW);)
  }

  delay(100);
}
