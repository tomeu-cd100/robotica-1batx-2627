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
| **3** | Sensor de distància **ultrasons** en versió curta: escriure una **funció** `mesuraDistancia()` que retorna un valor. Serial Plotter. **Producte: la mascota** del fil conductor (≥3 reaccions sensor→comportament + fitxa de personalitat) amb mini-defensa. L'alarma d'aparcament queda com a referència per a qui acabi abans. |
| **4** | **Prova pràctica T1** (individual, sessió sencera — vegeu `Avaluació/Prova_practica_T1.md`). |

## Producte
**La mascota reactiva** (fil conductor, `Classes/00_General/00_Projecte_T1_Mascota.md`): la caixa de la SA2 amb ≥3 reaccions sensor→comportament (llegir → comparar amb un llindar → actuar) i la seva fitxa de personalitat. **Es tanca a la S3**; la S4 és la prova T1 individual. *(Decisió del 18-10-2026: abans el producte era l'alarma d'aparcament, que queda com a pràctica de referència.)*

## Avaluació
- Instruments: producte (S3) + quadern + **prova pràctica T1** (S4, individual).
- Rúbriques: rúbrica del robot del dossier de la mascota (producte); R1, R2, R4 (prova).

## Atenció a la diversitat
- **Bastida:** simulació prèvia a Wokwi/Tinkercad; funció model proporcionada.
- **+ Ampliació:** calibratge del sensor; llindars configurables; combinar dos sensors.

## Recursos
Aprendiendo Arduino; Luis Llamas; Todotecnología; Wokwi.
