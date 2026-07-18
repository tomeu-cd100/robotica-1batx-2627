# SA8 · IoT i IA: el robot connectat i intel·ligent

| | |
|---|---|
| **Trimestre** | 3r |
| **Durada** | 6 h (3 sessions) |
| **Maquinari** | micro:bit (ràdio) + Micro:shield; ESP32 (WiFi) *opcional* |
| **Llenguatge** | Python (micro:bit) / C++ (ESP32) |

## Vincle competencial
- **Competències específiques:** CE-R4 (principal); CE-R3, CE-R1 (secundàries).
- **Criteris d'avaluació:** CA4.2, CA3.1.
- **Competències clau:** STEM, CD, CC.

## Sabers (Bloc F)
**IoT i telemetria**: enviament i monitoratge de dades; ràdio micro:bit / WiFi-MQTT (ESP32 opcional); **introducció a la IA** aplicada al control (classificació senzilla, reconeixement de patrons amb dades de sensors).

## Objectius d'aprenentatge
1. Enviar i monitorar **dades de sensors** entre dispositius (telemetria).
2. Comprendre el concepte d'**Internet de les coses** i les seves aplicacions/riscos.
3. Introduir-se a la **IA**: entrenar/usar un model senzill amb dades de sensor.
4. Valorar **privacitat, seguretat i ètica** de les dades (CC, ODS).

## Repte/pregunta inicial
> *"Com pot un sistema aprendre a reconèixer un gest o decidir per si sol?"*

> 🤖 **Fil conductor de robots:** amb el fil conductor actiu
> ([`Classes/00_General/00_Fil_conductor_robots.md`](../Classes/00_General/00_Fil_conductor_robots.md)),
> aquesta SA s'imparteix en **4 h**: les sessions 1 (telemetria) i 2 (disseny
> IoT) es fusionen en una sola sessió (mateixa fusió que ja preveu la
> retallada de calendari de
> [`08_Sequenciacio_temporal_anual.md`](08_Sequenciacio_temporal_anual.md)).
> Les 2 h alliberades passen a ser la **sessió 0** de muntatge del rover
> (SA7). La sessió 3 d'IA es manté sencera.

## Seqüència de sessions

| Sessió | Activitats |
|---|---|
| **1** | **Telemetria**: una micro:bit envia dades (temperatura/llum) i una altra les rep i mostra/registra. (Opció ESP32: enviar a un panell/MQTT.) |
| **2** | Concepte d'IoT: arquitectura, aplicacions i **riscos** (privacitat/seguretat). **Auditoria per parelles d'un producte IoT real** (informe + peritatge creuat). |
| **3** | **Introducció a la IA** en escala de tres graons: llindar (conegut de SA3/SA6) → regles combinades (classificador de gestos amb l'acceleròmetre, amb els valors anotats a la SA5) → ML real (Teachable Machine). Reflexió ètica. |

## Producte
Sistema connectat que recull i comunica dades (telemetria) o classifica un gest/patró amb IA senzilla, amb una reflexió escrita sobre ètica i privacitat.

## Avaluació
- Instruments: producte + quadern (dades + reflexió ètica) + coavaluació.
- Rúbriques: **R1**, **R3**, **R4**.

## Atenció a la diversitat
- **Bastida:** codi base de ràdio/telemetria; dataset d'exemple.
- **+ Ampliació:** dashboard de dades; afegir més classes al model; integrar la IA en el robot de SA7.

## Recursos
micro:bit Code & AI; Wokwi (ESP32/IoT); Scientix.
