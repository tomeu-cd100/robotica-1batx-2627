# Solucionari dels Reptes (codi de referència)

Codi de **solució de referència** per als 3 reptes de cada SA (SA1–SA8) de la carpeta `Reptes/`. **Material per al docent.**

> ⚠️ **Avís de verificació.** Aquestes solucions s'han escrit amb cura però **no s'han provat al maquinari real**. Abans d'usar-les, verifica-les a **Tinkercad/Wokwi** o a la placa. A la **SA7** (Imagina 3dBot) cal **ajustar els pins** dels motors segons el manual. Hi pot haver més d'una solució vàlida.

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
```

## Notes
- Comentaris en català **sense accents** als fitxers de codi (convenció del curs, evita problemes de codificació).
- Pins coherents amb el material de `Classes/SAx/codi/`.
- Enunciats dels reptes: `Reptes/Reptes_SAx.md`. Vocabulari i bases: `Classes/SA0/`.
