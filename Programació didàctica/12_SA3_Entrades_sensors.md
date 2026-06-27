# SA3 · Entrades i sensors: el robot percep

| | |
|---|---|
| **Trimestre** | 1r |
| **Durada** | 8 h (4 sessions) |
| **Maquinari** | Arduino UNO + Keyestudio (polsador, potenciòmetre, LDR, NTC, ultrasons HC-SR04) |
| **Llenguatge** | C/C++ |

## Vincle competencial
- **Competències específiques:** CE-R1, CE-R2 (principals); CE-R3 (secundària).
- **Criteris d'avaluació:** CA1.1, CA2.1, CA2.2.
- **Competències clau:** STEM, CD.

## Sabers (Blocs B i C)
Entrades digitals (`digitalRead`, *pull-up*, *debounce*); entrades analògiques (`analogRead`, conversió A/D); funcions definides per l'usuari; comunicació sèrie i Serial Plotter; sensors de la gamma Keyestudio.

## Objectius d'aprenentatge
1. Llegir entrades digitals i analògiques i interpretar-ne els valors.
2. Aplicar **funcions** per modularitzar el codi.
3. Usar el **monitor/traçador sèrie** per depurar i visualitzar dades.
4. Relacionar lectura de sensor amb una acció de sortida (percepció→acció).

## Repte/pregunta inicial
> *"Com sap un robot que hi ha un obstacle o que s'ha fet de nit?"*

## Seqüència de sessions

| Sessió | Activitats |
|---|---|
| **1** | Polsador amb *pull-up* intern; `digitalRead`; **debounce**. Comptador de premudes (Serial Monitor). |
| **2** | Entrades analògiques: potenciòmetre i **LDR**. `analogRead` (0-1023), `map()`. Llum automàtic (LDR→LED). |
| **3** | Sensor de distància **ultrasons**: escriure una **funció** `mesuraDistancia()`. Visualització amb Serial Plotter. |
| **4** | Repte: **"sistema d'alarma/aparcament"** (ultrasons + LED/piezo segons distància). Documentació i proves. |

## Producte
Sistema sensor→actuador (alarma de proximitat o llum automàtic) amb codi modular (funcions) i registre de mesures al quadern.

## Avaluació
- Instruments: producte + quadern + repte de codi (escriure una funció de lectura).
- Rúbriques: **R1**, **R2**.

## Atenció a la diversitat
- **Bastida:** simulació prèvia a Wokwi/Tinkercad; funció model proporcionada.
- **+ Ampliació:** calibratge del sensor; llindars configurables; combinar dos sensors.

## Recursos
Aprendiendo Arduino; Luis Llamas; Todotecnología; Wokwi.
