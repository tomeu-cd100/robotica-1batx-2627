/*
  SA8 - 04_esp32_telemetria.ino  (OPCIONAL / AVANCAT)
  ESP32 que es connecta al WiFi i "publica" una lectura periodicament.
  Aqui nomes mostra la lectura per serie; per enviar-la a un broker MQTT
  caldria afegir una llibreria (p. ex. PubSubClient) i un broker.
  Requereix: paquet de plaques ESP32 a l'Arduino IDE i una xarxa WiFi 2,4 GHz.

  >>> POSA LES TEVES DADES DE WIFI <<<
*/

#include <WiFi.h>

const char* SSID = "EL_TEU_WIFI";       // <-- AJUSTAR
const char* CLAU = "LA_TEVA_CLAU";      // <-- AJUSTAR

const int SENSOR = 34;   // pin analogic de l'ESP32 (ex.: LDR/potenciometre)

void setup() {
  Serial.begin(115200);
  WiFi.begin(SSID, CLAU);
  Serial.print("Connectant al WiFi");
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("\nConnectat! IP: " + WiFi.localIP().toString());
}

void loop() {
  int lectura = analogRead(SENSOR);   // 0..4095 a l'ESP32
  Serial.print("Lectura sensor: ");
  Serial.println(lectura);
  // Aqui s'enviaria la dada a un broker MQTT o a un servidor web.
  delay(2000);
}
