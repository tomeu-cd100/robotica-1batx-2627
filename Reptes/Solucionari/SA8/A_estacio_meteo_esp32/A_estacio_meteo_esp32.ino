/*
  Solucionari Repte SA8-A · Estacio meteo - ESP32 amb WiFi (AMPLIACIO 3)
  AMPLIACIO 3: porta la telemetria a un full de calcul via webhook (Google Form).
  Fites que cobreix:
    1. La dada surt de manera CONTINUA pel monitor serie (115200 bauds).
    2. Cada enviament comprova el codi HTTP de resposta com a CONFIRMACIO
       que la dada ha arribat al servei de destinacio.
    3. Enviament automatic cada INTERVAL_S segons amb marca de temps;
       si el WiFi cau, es reintenta SENSE bloquejar (el programa continua).

  COM OBTENIR LA URL DEL WEBHOOK amb un Google Form:
    1. Crea un Form amb UNA pregunta de resposta curta (el valor del sensor).
    2. Obre "Previsualitza" el formulari i mira el codi font de la pagina:
       busca "entry." seguit de numeros (p. ex. entry.123456789).
    3. La URL del webhook es:
       https://docs.google.com/forms/d/e/ID_DEL_FORM/formResponse?entry.XXXXXXXX=
       (el valor s'afegeix al final de la URL a cada enviament).
    4. Cada enviament crea una FILA nova al full de calcul de respostes,
       amb l'hora de recepcio inclosa automaticament (fita 3).

  Requereix: paquet de plaques ESP32 a l'Arduino IDE (WiFi.h i HTTPClient.h
  ja venen amb el core esp32) i una xarxa WiFi de 2,4 GHz.
  NOTA: per tenir hora real en lloc de segons des de l'engegada, es pot
  usar configTime() amb un servidor NTP (avancat, no cal per al repte).
*/

#include <WiFi.h>
#include <HTTPClient.h>

const char* SSID = "EL_TEU_WIFI";       // <-- AJUSTAR
const char* CLAU = "LA_TEVA_CLAU";      // <-- AJUSTAR

// <-- AJUSTAR: URL del webhook (vegeu la capcalera per obtenir-la)
const char* WEBHOOK_URL =
  "https://docs.google.com/forms/d/e/ID_DEL_FORM/formResponse?entry.XXXXXXXX=";

const int SENSOR = 34;                  // pin analogic (ex.: LDR/potenciometre)
const int INTERVAL_S = 30;              // fita 3: un enviament cada X segons
const unsigned long TIMEOUT_WIFI = 8000; // ms maxims per intent de reconnexio

unsigned long ultimEnviament = 0;
unsigned long iniciReconnexio = 0;
bool reconnectant = false;

// Fita 3: gestio del WiFi SENSE bloquejar. Si no hi ha connexio, engega un
// intent i deixa que el loop continui; si l'intent triga mes de TIMEOUT_WIFI,
// es dona per fallat i mes endavant se'n fara un altre. El programa no es
// penja mai per un tall de xarxa.
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

// Fita 2: envia el valor al webhook i comprova el codi HTTP com a CONFIRMACIO
// (l'hora de cada fila la posa el mateix full de calcul en rebre la resposta)
void enviaWebhook(int valor) {
  HTTPClient http;
  String url = String(WEBHOOK_URL) + String(valor);
  http.begin(url);
  http.setTimeout(5000);        // si el servidor no respon, no ens hi penjem
  int httpCode = http.GET();    // el Form accepta els camps a la mateixa URL
  if (httpCode == 200 || httpCode == 302) {
    // 200 (OK) o 302 (redireccio del Form) = dada rebuda al full de calcul
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

    // Fita 1: la dada surt de manera continua pel monitor serie
    Serial.print("t=");
    Serial.print(segons);
    Serial.print(" s  valor=");
    Serial.println(lectura);

    if (wifiOk()) {
      enviaWebhook(lectura);
    } else {
      // Fita 3: sense xarxa NO ens penjem: ho anotem i continuem
      Serial.println("  (sense WiFi: dada no enviada, el programa continua)");
    }
  }
  delay(50);   // el loop sempre gira: cap espera bloquejant
}
