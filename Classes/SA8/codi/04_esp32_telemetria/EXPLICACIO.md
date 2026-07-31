# Pràctica 4 · ESP32: telemetria per WiFi, el pas cap a l'IoT real

**Quan es fa:** Sessió 2 (demo opcional del docent · repte ⭐⭐⭐) · **Fitxer:** `04_esp32_telemetria.ino` · **Muntatge:** [connexions i entorn](../../SA8_connexions.md) (opció ESP32)

## 🎯 Per què fem aquesta pràctica

La ràdio de les micro:bit uneix **dues plaques a la mateixa aula**. Els productes IoT de debò (la polsera, la càmera, l'altaveu de l'[auditoria](../../SA8_auditoria_iot.md)) fan servir **WiFi i internet**: les dades surten del dispositiu, travessen la xarxa i acaben en un servidor al núvol. Aquest sketch mostra el **primer tram** d'aquesta arquitectura — **dispositiu → xarxa** — amb un ESP32: un microcontrolador barat amb WiFi integrat que és, literalment, el que hi ha dins de molts productes IoT reals.

De pas, reprèn el **fil dels dos llenguatges** de la SA5: torna el **C++** de l'Arduino (`setup()`/`loop()`, `Serial`, `analogRead`), ara sobre una placa amb connectivitat. És material **opcional i avançat**: demo del docent a la S2, o repte ⭐⭐⭐ si el teu equip hi va.

## 🔮 Abans d'executar: prediu

Mira el codi (a baix, plegat) sense carregar-lo. Què traurà pel monitor sèrie **mentre es connecta**? I si la contrasenya és incorrecta — donarà error o es quedarà en algun lloc per sempre? I una d'arquitectura: aquest programa **envia** les dades a algun servidor, o encara no?

## 🧠 El codi, per blocs

### Bloc 1 — Les credencials (la part que has d'ajustar)

```cpp
#include <WiFi.h>

const char* SSID = "EL_TEU_WIFI";       // <-- AJUSTAR
const char* CLAU = "LA_TEVA_CLAU";      // <-- AJUSTAR

const int SENSOR = 34;   // pin analogic de l'ESP32 (ex.: LDR/potenciometre)
```

`WiFi.h` és la llibreria que dona superpoders de xarxa a l'ESP32. Les dues constants següents són el nom i la contrasenya de la **teva** xarxa — i han de ser d'una xarxa de **2,4 GHz** (l'ESP32 no veu les de 5 GHz: la causa número u de «no connecta»). Pensament d'auditor: aquestes credencials queden **escrites al codi**. Si comparteixes el sketch, comparteixes la clau del WiFi — una dada sensible dins d'un fitxer de text.

### Bloc 2 — Connectar-se: esperar el WiFi al `setup()`

```cpp
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
```

`WiFi.begin()` **demana** la connexió, però connectar-se triga uns segons: el `while` s'espera imprimint un punt cada mig segon fins que l'estat és `WL_CONNECTED`. Si les credencials són dolentes, el programa es queda **imprimint punts per sempre** — no hi ha missatge d'error: aquesta és la pista per diagnosticar-ho. En connectar, la xarxa assigna una **adreça IP** a la placa: des d'aquell moment, l'ESP32 és **un dispositiu més de la xarxa**, com el teu mòbil. (Fixa't també en el `Serial.begin(115200)`: velocitat alta, l'habitual a l'ESP32 — el monitor sèrie ha d'estar a la mateixa.)

### Bloc 3 — Llegir i «publicar» (de moment, pel sèrie)

```cpp
void loop() {
  int lectura = analogRead(SENSOR);   // 0..4095 a l'ESP32
  Serial.print("Lectura sensor: ");
  Serial.println(lectura);
  // Aqui s'enviaria la dada a un broker MQTT o a un servidor web.
  delay(2000);
}
```

El mateix patró *mesura → publica → espera* de l'emissora micro:bit, en C++. Detall tècnic: `analogRead` a l'ESP32 dona **0..4095** (12 bits), no 0..1023 com a l'Arduino UNO. I el comentari del mig és el més honest del sketch: aquí les dades **encara no surten** de la placa — per enviar-les de debò caldria un *broker* **MQTT** (el «carter» de l'IoT) i una llibreria com PubSubClient. El diagrama complet — **dispositiu → xarxa → núvol → app** — és el que dibuixeu a l'auditoria de la S2; aquest sketch n'implementa el primer tram.

## ⚠️ Errors que veuràs segur

| Símptoma | Causa probable |
|---|---|
| Punts infinits, mai «Connectat!» | SSID/clau incorrectes, o la xarxa és de **5 GHz** (cal 2,4 GHz). |
| Símbols estranys al monitor sèrie | Velocitat del monitor diferent de `115200`. |
| No compila / no surt la placa | Falta el **paquet de plaques ESP32** a l'Arduino IDE (Gestor de plaques). |
| La lectura és sempre 0 o 4095 | Res connectat al pin 34, o el sensor (LDR/potenciòmetre) mal cablejat. |

## 🔗 On ho aplicaràs

- **A la S2:** posa nom tècnic al diagrama de l'**[auditoria IoT](../../SA8_auditoria_iot.md)** — ara ja saps què hi ha exactament al tram «dispositiu → xarxa» d'un producte real.
- **Sense placa:** el projecte té **simulació Wokwi** (ESP32 + potenciòmetre, xarxa `Wokwi-GUEST`): enllaç a [connexions i entorn](../../SA8_connexions.md).
- **Repte ⭐⭐⭐ / SA9:** completar el tram que falta (publicar a un broker MQTT i veure les dades en un panell) és una ampliació de primera per al **projecte final**.
- **Compara:** l'[emissora micro:bit](../01_telemetria_emissor.py) fa el mateix paper amb ràdio local — mateixa idea de telemetria, abast i arquitectura diferents.

> ⭐ **Has acabat abans?** Tria un repte a **[Reptes de la SA8](../../../../Reptes/Reptes_SA8.md)** i, quan el docent te'l validi, pinta l'estrella al [tauler de reptes](../../../00_General/00_Tauler_reptes.md).
