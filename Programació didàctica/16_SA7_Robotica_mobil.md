# SA7 · Robòtica mòbil: cinemàtica i trajectòries

| | |
|---|---|
| **Trimestre** | 3r |
| **Durada** | 8 h (4 sessions) |
| **Maquinari** | Placa Imagina 3dBot (Arduino) + sensors de línia/distància |
| **Llenguatge** | C/C++ |

## Vincle competencial
- **Competències específiques:** CE-R4 (principal); CE-R3, CE-R1 (secundàries).
- **Criteris d'avaluació:** CA4.1, CA3.1, CA1.1.
- **Competències clau:** STEM, CD, CE.

## Sabers (Bloc F)
Robòtica mòbil; xassís i rodes; **cinemàtica diferencial**; algorismes de comportament (seguidor de línia, evita-obstacles); modelització i programació de **trajectòries**.

## Objectius d'aprenentatge
1. Programar el moviment d'un robot mòbil (endavant, gir, aturada) amb **control diferencial**.
2. Dissenyar i programar **trajectòries** (quadrat, recorregut definit).
3. Implementar un **comportament autònom** (seguir línia o evitar obstacles) amb sensors.
4. Provar, mesurar i **iterar** per millorar la fiabilitat.

## Repte/pregunta inicial
> *"Com fa un robot per girar exactament 90° i per no xocar mai?"*

## Seqüència de sessions

| Sessió | Activitats |
|---|---|
| **1** | Control bàsic de motors del 3dBot: funcions `endavant()`, `gira()`, `atura()`. Cinemàtica diferencial. |
| **2** | **Trajectòria programada**: recórrer un quadrat; calibratge de temps/velocitat de gir. |
| **3** | Comportament reactiu: **evita-obstacles** (ultrasons) o **seguidor de línia** (sensors IR). |
| **4** | Repte de pista: completar un recorregut autònom. Proves, mesura d'errors i **iteració**. Documentació. |

## Producte
Robot mòbil que completa un repte autònom (seguir línia o evitar obstacles / recorregut) amb codi modular i registre d'iteracions de millora.

## Avaluació
- Instruments: demostració a la pista + quadern (proves i millores) + observació.
- Rúbriques: **R1**, **R3** (robot/control), **R4**.

## Atenció a la diversitat
- **Bastida:** llibreria/funcions de moviment ja fetes per començar; circuit de prova simple.
- **+ Ampliació:** control proporcional del seguidor de línia; combinar dos comportaments; optimitzar el temps de volta.

## Recursos
Servei Educatiu Segrià; Arduino Project Hub; exemple Institut Lluís Companys (robòtica 1r Batx).
