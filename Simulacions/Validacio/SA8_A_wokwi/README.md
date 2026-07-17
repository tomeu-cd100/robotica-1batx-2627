# Validació SA8-A · Estació meteo ESP32 (còpia Wokwi-GUEST)

`src/src.ino` és una **còpia de validació** del solucionari SA8-A que difereix NOMÉS en:
SSID `Wokwi-GUEST` (xarxa oberta del simulador), webhook cap a `https://example.com/?v=`
(endpoint públic estable que respon 200) i `INTERVAL_S = 5` (en lloc de 30, per escurçar
la simulació). Tota la lògica és idèntica; si el solucionari canvia, refés la còpia.

| Execució | Què valida |
|---|---|
| `escenari_1.yaml` | Camí feliç complet per Internet real (passarel·la IoT de Wokwi): la dada surt contínua amb marca de temps (fita 1), cada enviament rep la confirmació HTTP (`CONFIRMAT: dada rebuda (HTTP 200`) — fita 2 — i el cicle es repeteix automàticament (fita 3). |

Nota: el Form de Google real respon **302** (redirecció); el codi accepta 200 i 302.
Amb `example.com` es valida la branca 200; la branca 302 queda per al maquinari real
amb un Form de debò.
