/*
  COPIA DE VALIDACIO del solucionari SA8-A (ESP32) per a Wokwi CLI.
  NO es material d'alumnat. Difereix de l'original NOMES en:
    - SSID/CLAU: xarxa simulada Wokwi-GUEST (oberta),
    - WEBHOOK_URL: endpoint public estable que respon 200 (example.com),
    - INTERVAL_S: 5 s en lloc de 30 per escurcar la simulacio.
  Tota la logica (enviament, confirmacio HTTP, reconnexio no bloquejant)
  es identica a Reptes/Solucionari/SA8/A_estacio_meteo_esp32/.
*/

#include <WiFi.h>
#include <HTTPClient.h>

const char* SSID = "Wokwi-GUEST";
const char* CLAU = "";

const char* WEBHOOK_URL = "https://example.com/?v=";

const int SENSOR = 34;                  // pin analogic (ex.: LDR/potenciometre)
const int INTERVAL_S = 5;               // fita 3: un enviament cada X segons
const unsigned long TIMEOUT_WIFI = 8000; // ms maxims per intent de reconnexio

unsigned long ultimEnviament = 0;
unsigned long iniciReconnexio = 0;
bool reconnectant = false;

bool wifiOk() {
  if (WiFi.status() == WL_CONNECTED) {
    reconnectant = false;
    return true;
  }
  if (!reconnectant) {
    Serial.println("WiFi caigut: engegant reconnexio (no bloqueja)...");
    WiFi.disconnect();
    WiFi.begin(SSID, CLAU);
    reconnectant = true;
    iniciReconnexio = millis();
  } else if (millis() - iniciReconnexio > TIMEOUT_WIFI) {
    reconnectant = false;   // intent esgotat; se'n fara un altre mes tard
  }
  return false;
}

void enviaWebhook(int valor) {
  HTTPClient http;
  String url = String(WEBHOOK_URL) + String(valor);
  http.begin(url);
  http.setTimeout(5000);        // si el servidor no respon, no ens hi penjem
  int httpCode = http.GET();    // el Form accepta els camps a la mateixa URL
  if (httpCode == 200 || httpCode == 302) {
    Serial.print("  CONFIRMAT: dada rebuda (HTTP ");
    Serial.print(httpCode);
    Serial.println(")");
  } else {
    Serial.print("  ERROR d'enviament (codi ");
    Serial.print(httpCode);
    Serial.println(")");
  }
  http.end();
}

void setup() {
  Serial.begin(115200);
  Serial.println();
  Serial.println("Estacio meteo ESP32 - telemetria cap a un full de calcul");
  WiFi.begin(SSID, CLAU);      // primer intent; wifiOk() en fara el seguiment
  reconnectant = true;
  iniciReconnexio = millis();
}

void loop() {
  if (millis() - ultimEnviament >= (unsigned long)INTERVAL_S * 1000UL) {
    ultimEnviament = millis();

    int lectura = analogRead(SENSOR);        // 0..4095 a l'ESP32
    unsigned long segons = millis() / 1000;  // marca de temps (s des d'engegar)

    Serial.print("t=");
    Serial.print(segons);
    Serial.print(" s  valor=");
    Serial.println(lectura);

    if (wifiOk()) {
      enviaWebhook(lectura);
    } else {
      Serial.println("  (sense WiFi: dada no enviada, el programa continua)");
    }
  }
  delay(50);   // el loop sempre gira: cap espera bloquejant
}
