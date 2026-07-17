# Validació SA4-A · Barrera automàtica (ampliat)

Harness de validació amb **wokwi-cli** del solucionari `Reptes/Solucionari/SA4/A_barrera/ampliat/ampliat.ino` (pins: servo=9, TRIG=12, ECHO=11, LED vermell=8, LED verd=7). El binari ja compilat és a `../build/SA4_A/` (referenciat des de `wokwi.toml`).

## Fitxers

| Fitxer | Què és |
|---|---|
| `diagram.json` | Circuit base amb el vehicle a **100 cm** (cap detecció). |
| `diagram_10cm.json` | Variant amb el vehicle a **10 cm** (detecció immediata). |
| `escenari_1.yaml` | Cicle complet de detecció amb semàfor. |
| `escenari_2.yaml` | Control negatiu: sense vehicle, res no es mou. |
| `escenari_3.yaml` | Estrès: 10 cicles seguits (fita 3). |
| `execucions.json` | Quina combinació diagrama+escenari executa cada prova. |
| `libraries.txt` | Informatiu per a Wokwi web (el binari ja duu Servo compilada). |

**Important:** l'HC-SR04 **no té control d'escenari** a wokwi-cli; la distància es fixa amb `"attrs": {"distance": "..."}` al diagrama. Per això hi ha dues variants i cada execució d'`execucions.json` indica quin diagrama toca (copieu-lo sobre `diagram.json` abans d'executar).

Exemple d'execució manual (des d'aquesta carpeta):

```
wokwi-cli --scenario escenari_2.yaml --timeout 8000 .
```

## Cobertura de les fites del repte (⭐⭐⭐)

| Fita | Estat | Com |
|---|---|---|
| 1. Estat en una sola variable, LED pintat des d'ella | **Coberta (indirecta)** | Escenaris 1 i 3: LED i barrera mai incoherents en cap instant mostrejat; el vermell/verd segueixen exactament el cicle d'estat. La *forma* del codi (una sola variable `oberta`) només es pot confirmar per revisió del codi. |
| 2. Verd només quan el servo **ha acabat** d'obrir | **Coberta** | Escenari 1, assert a t=400 ms: a mig moviment d'obertura el verd encara és 0 i el vermell 1. |
| 3. 10 obertures/tancaments sense incoherència | **Coberta** | Escenari 3: verd al punt mig dels 10 cicles; vermell entre cicles als 3 primers (la finestra vermella és estreta, ~790 ms, i la deriva acumulada desaconsella assertar-la als cicles finals). |

## Límits coneguts

- **L'angle del servo no es pot assertar** amb els passos d'escenari de wokwi-cli: el pin 9 duu polsos PWM de servo (50 Hz) i un `expect-pin` instantani no és fiable. La posició de la barrera es valida **indirectament** pel semàfor (que el codi només canvia en acabar cada moviment) i pel cronometratge determinista dels cicles.
- El firmware no escriu res per Serial (verificat al codi i a l'ELF compilat), així que **no s'usa `wait-serial`**: tota la validació és `delay` + `expect-pin` sobre finestres temporals àmplies (marges ≥ 390 ms; ≥ 1,8 s a les finestres verdes).
