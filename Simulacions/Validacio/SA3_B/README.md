# Validació SA3-B · Sensor d'aparcament (ampliat)

Harness Wokwi CLI per al solucionari `Reptes/Solucionari/SA3/B_sensor_aparcament/ampliat/ampliat.ino`
(HC-SR04 TRIG=12 ECHO=11, LED=8, piezo=6; trams LLUNY>30 cm, MIG 10–30 cm, A PROP<10 cm).

**Per què hi ha variants de diagrama:** l'HC-SR04 de Wokwi **no té cap control d'escenari
documentat** per canviar la distància en marxa. Cada tram es valida amb una execució pròpia
que arrenca de zero amb la distància fixada a l'atribut `"distance"` de la peça:

| Execució | Diagrama | Distància | Tram |
|---|---|---|---|
| `escenari_1.yaml` | `diagram_80cm.json` | 80 cm | lluny |
| `escenari_2.yaml` | `diagram_20cm.json` | 20 cm | mig |
| `escenari_3.yaml` | `diagram_5cm.json` | 5 cm | a prop |

(`diagram.json` és el diagrama per defecte, idèntic a la variant de 20 cm.)

## Fites del ⭐⭐⭐ i cobertura

| Fita | Escenari | Com es valida |
|---|---|---|
| 1. Distància fiable i contínua pel Monitor Sèrie (descarta 0 / fora de rang) | tots (parcial) | `wait-serial: 'distancia='` repetit a cada execució: la mesura surt contínuament i cau al tram correcte a 5, 20 i 80 cm. El **filtre sense-eco** (`pulseIn` amb timeout → 400) no és disparable per escenari (vegeu límits). |
| 2. Interval entre bips calculat amb `map()` i comprovable abans d'escoltar res | `escenari_2.yaml` | `wait-serial: 'interval='` tres vegades: l'interval es publica pel Monitor Sèrie i es recalcula a cada cicle del tram mig. |
| 3. Ritme que s'accelera de manera contínua i so continu per sota la distància crítica | `escenari_3.yaml` (parcial) | «(a prop, so continu)» pel Monitor Sèrie i LED fix a HIGH al pin 8. L'**acceleració contínua** en acostar-se no es pot observar en una sola execució (vegeu límits). |

## Límits (només validables a mà)

- **Acceleració contínua (fita 3):** cada execució té la distància congelada, de manera que
  no es pot «acostar el cotxe» dins d'un mateix escenari. Es valida per punts (80/20/5 cm);
  per veure el ritme accelerant-se cal moure el control de distància a la simulació
  interactiva de Wokwi o provar-ho al maquinari real.
- **Valor exacte de l'interval:** el model acústic de Wokwi (velocitat del so) fa que la
  distància calculada pel codi pugui diferir unes dècimes de l'atribut (`20` cm pot sortir
  `19.8`), i l'interval de `map()` variar uns pocs ms. Per això només es valida la
  **presència** d'`interval=` i no el número exacte.
- **Filtre sense-eco (fita 1):** el retorn de 400 cm quan `pulseIn` fa timeout no es pot
  provocar per escenari (caldria desconnectar el sensor en marxa). Revisió de codi:
  `if (t == 0) return 400;` dins `mesuraDistancia()`.
- **El piezo als trams mig i a prop** oscil·la (tone a 1500/2500 Hz), o sigui que `expect-pin`
  hi és una loteria de mostreig: només es comprova el silenci (`noTone`, pin 6 a 0) al tram
  lluny, on el nivell és estable.
