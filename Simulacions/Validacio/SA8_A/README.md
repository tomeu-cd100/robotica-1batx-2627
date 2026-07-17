# Validació SA8-A · Estació meteo ESP32 (firmware original)

Valida `Reptes/Solucionari/SA8/A_estacio_meteo_esp32/` **tal qual** (SSID placeholder
`EL_TEU_WIFI`, que no existeix a Wokwi — i justament això és el que es vol provar):

| Execució | Què valida |
|---|---|
| `escenari_1.yaml` | **Fita 3 (part crítica)**: sense xarxa el programa NO es penja — la dada surt igualment pel monitor sèrie a t=30 s i t=60 s amb marca de temps (fita 1) i el codi anota «sense WiFi: dada no enviada, el programa continua». La reconnexió és no bloquejant. |

El camí feliç (connexió + webhook + confirmació HTTP, fites 2-3) es valida a
`../SA8_A_wokwi/` amb una còpia mínimament adaptada. Compilació: `esp32:esp32:esp32`
(nucli esp32 3.x; el mateix fqbn que el job d'ESP32 del CI).

**Només al maquinari real**: WiFi 2,4 GHz del centre, webhook de Google Forms real
(el 302 del Form) i el tall de xarxa físic a mig funcionament.
