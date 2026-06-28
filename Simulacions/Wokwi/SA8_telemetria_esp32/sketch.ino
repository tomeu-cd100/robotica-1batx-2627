/*
  SA8 - Telemetria IoT amb ESP32 (per a Wokwi)
  L'ESP32 es connecta al WiFi i "publica" una lectura periodicament pel port serie.
  Aquesta es la versio adaptada a WOKWI: la simulacio nomes es connecta a la
  xarxa "Wokwi-GUEST" (sense contrasenya). Per a una placa real, canvia SSID i CLAU
  per les de la teva xarxa de 2,4 GHz (vegeu el sketch original a Classes/SA8).

  Per enviar la dada a un broker MQTT caldria afegir una llibreria (p. ex.
  PubSubClient) i un broker; aqui ens quedem en la lectura + WiFi.
*/

#include <WiFi.h>

const char* SSID = "Wokwi-GUEST";   // xarxa simulada de Wokwi (no canviar a la simulacio)
const char* CLAU = "";              // Wokwi-GUEST no te contrasenya

const int SENSOR = 34;   // pin analogic de l'ESP32 (potenciometre / LDR)

void setup() {
  Serial.begin(115200);
  WiFi.begin(SSID, CLAU);
  Serial.print("Connectant al WiFi");
  while (WiFi.status() != WL_CONNECTED) {
    delay(200);
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
