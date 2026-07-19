# Solucionari dels Reptes (codi de referència)

Codi de **solució de referència** per als 3 reptes de cada SA (SA1–SA8) de la carpeta `Reptes/`. **Material per al docent.**

> 🧭 **Quan s'usa.** En **validar el repte ⭐ d'una parella** (comparar amb la referència abans de pintar l'estrella al tauler) o per **preparar-te la SA**. **No es passa a l'alumnat**: el repte és seu — si estan encallats, primer la rutina DEPURA i les targetes de rescat. Recorda que **hi pot haver més d'una solució vàlida**: la referència és un contrast, no l'única resposta bona.

> ⚠️ **Avís de verificació.** Les solucions **ampliades s'han validat en simulació** contra les fites dels reptes ⭐⭐⭐, executant el firmware AVR real amb *wokwi-cli* (vegeu [`Simulacions/Validacio/`](../../Simulacions/Validacio/README.md)); el CI en compila els `.ino` i comprova la sintaxi dels `.py`. **Encara no s'han provat al maquinari real.** A la **SA7** (Imagina 3dBot) cal **ajustar els pins** dels motors segons el manual.

## Estructura

Per a cada repte hi ha **dos sketches carregables**:
- **`minim`** — resol el **requisit mínim** del repte (net i comentat).
- **`ampliat`** — incorpora les **ampliacions graduades** (marcades amb `// AMPLIACIO 1/2/3`).

Els sketches d'**Arduino** (`.ino`) viuen cada un en una carpeta pròpia (ho exigeix l'IDE). Els de **micro:bit** (`.py`, SA5 i SA8) són fitxers directes.

```
Solucionari/
├── SA1/  A_far_costaner/ · B_llum_bici/ · C_morse/        (.ino)
├── SA2/  A_semafor/ · B_llum_ambient/ · C_indicador_nivell/ (.ino)
├── SA3/  A_llum_nocturna/ · B_sensor_aparcament/ · C_instrument/ (.ino)
├── SA4/  A_barrera/ · B_ventilador/ · C_brac_dispensador/  (.ino)
├── SA5/  A_comptapassos*.py · B_llum_nit*.py · C_joc_radio*.py
├── SA6/  A_termostat/ · B_semafor_adaptatiu/ · C_proporcional/ (.ino)
├── SA7/  A_repartidor/ · B_explorador/ · C_seguidor_linia/ (.ino)
└── SA8/  A_estacio_meteo*.py · B_alerta*.py · C_gestos*.py
      └── A_estacio_meteo_esp32/ (.ino d'ESP32: l'ampliació ⭐⭐⭐ del repte A
          és WiFi + webhook, fora de l'abast del micro:bit)
```

## Notes
- Comentaris en català **sense accents** als fitxers de codi (convenció del curs, evita problemes de codificació).
- Pins coherents amb el material de `Classes/SAx/codi/`.
- Enunciats dels reptes: `Reptes/Reptes_SAx.md`. Vocabulari i bases: `Classes/SA0/`.
- Cada `ampliat` cobreix **les tres ampliacions**, incloses les **fites** de la ⭐⭐⭐ tal com estan redactades al repte (alineació auditada el 17-07-2026).
- **El CI compila** tots els `.ino` d'UNO del solucionari (SA1-SA4, SA6, SA7) i el d'ESP32 de SA8; els `.py` passen py_compile a `tools/qa.py`.
