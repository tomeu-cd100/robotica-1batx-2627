# Resultats de la validació per simulació (wokwi-cli)

Data: 2026-07-17 22:28 · 27/27 execucions passen

| Repte | Escenari | Estat | Què valida |
|---|---|---|---|
| SA1_A | escenari_1.yaml | PASSA | Fites 1-2: el far secundari (pin 12) parpelleja amb ritme propi mentre el principal (pin 13) fa la llum llarga i els flaixos curts, sense aturar-se l'un a l'altre |
| SA1_A | escenari_2.yaml | PASSA | Fita 3: els dos patrons mantenen la fase absoluta esperada a t=30 s i passat 1 minut de simulació (cap desfasament acumulat) |
| SA1_B | escenari_1.yaml | PASSA | Comportament dels tres modes en ordre (ràpid 200 ms, lent 700 ms, pausa d'emergència) i reinici correcte del cicle: efecte observable de les fites 1-3; l'estructura del codi es revisa a mà |
| SA1_C | escenari_1.yaml | PASSA | Fites 2-3: la T i la C s'emeten amb ratlles llargues i punts curts, pausa de 3 unitats entre lletres, pausa de 7 unitats entre repeticions i repetició en bucle |
| SA2_A | escenari_1.yaml | PASSA | Semàfor ampliat: comprova les tres fases (verd cotxes, groc, vermell cotxes) mostrejant al mig de cada finestra, i que el semàfor de vianants va coordinat (verd vianants només quan vermell cotxes). |
| SA2_A | escenari_2.yaml | PASSA | Semàfor ampliat: comprova que el segon cicle repeteix les fases amb les mateixes durades (9500 ms per cicle), és a dir que el loop() net no desquadra la seqüència. |
| SA2_B | escenari_1.yaml | PASSA | Llum d'ambient ampliada: comprova l'estructura de la roda de color (quin canal RGB és a zero a cada tram de 2048 ms, durant un cicle sencer i l'inici del segon) amb temporització determinista; els canals en PWM intermedi no són comprovables amb expect-pin. |
| SA2_C | escenari_1.yaml | PASSA | Indicador de nivell ampliat: comprova els dos extrems del LED RGB (verd fix amb nivell 0, vermell fix amb nivell 4) i que la barra és tota apagada / tota encesa en cada cas, sincronitzant amb el Monitor Sèrie. |
| SA2_C | escenari_2.yaml | PASSA | Indicador de nivell ampliat: valida per sèrie tots els valors del map() (0-255, vermell puja quan verd baixa) durant una pujada i una baixada completes del VU-mètre, i que amb nivell 2 la barra té exactament 2 LEDs encesos. |
| SA3_A | escenari_1.yaml | PASSA | LDR real: la lectura crua surt contínua pel Monitor Sèrie (fita 1) i el map() invers és correcte en dos punts (250→73, 39→227), sempre dins 0-255. Límit: el mòdul LDR de Wokwi té la polaritat invertida respecte al divisor del repte i no arriba als llindars 350/450. |
| SA3_A | escenari_2.yaml | PASSA | Potenciòmetre a A0 (rang complet, mateix firmware): amb llum plena la brillantor queda clampada a 0 per constrain() i el pin 9 apagat del tot; a les fosques brillantor=255 i pin encès continu; en tornar la llum s'apaga (fites 2 i 3). |
| SA3_B | escenari_1.yaml | PASSA | Sensor d'aparcament ampliat, tram LLUNY (80 cm): la distància surt contínua pel Monitor Sèrie (fita 1), el codi anuncia «lluny, sense avís» i el LED (pin 8) i el piezo (pin 6) queden en repòs. |
| SA3_B | escenari_2.yaml | PASSA | Sensor d'aparcament ampliat, tram MIG (20 cm): l'interval entre bips es calcula amb map() i es publica pel Monitor Sèrie abans d'escoltar res (fita 2), i es recalcula a cada cicle. |
| SA3_B | escenari_3.yaml | PASSA | Sensor d'aparcament ampliat, tram A PROP (5 cm): per sota la distància crítica passa a so continu (fita 3) amb el LED fix encès al pin 8. |
| SA3_C | escenari_1.yaml | PASSA | Instrument ampliat: el potenciòmetre regula el PWM del pin 9 (extrems 255→HIGH i 0→LOW deterministes) mentre el polsador amb debounce compta «Premudes: 1» i «Premudes: 2» pel Monitor Sèrie — les dues entrades conviuen al mateix loop() sense bloquejar-se. |
| SA8_A | escenari_1.yaml | PASSA | Firmware original intacte (SSID placeholder → mai connecta): la dada surt igualment pel monitor sèrie a t=30 i t=60 s i el programa anota «sense WiFi… continua» sense penjar-se mai (fita 3, reconnexió no bloquejant). |
| SA8_A_wokwi | escenari_1.yaml | PASSA | Còpia amb Wokwi-GUEST i webhook cap a example.com: la dada surt contínua amb marca de temps (fita 1), cada enviament rep confirmació HTTP 200/302 (fita 2) i el cicle es repeteix automàticament (fita 3). |
