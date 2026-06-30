# SA8 · IoT i IA: el robot connectat i intel·ligent

Vuitena situació d'aprenentatge (**6 h · 3 sessions**, 3r trimestre). El sistema es **connecta** i comença a **decidir**: **telemetria** (enviar/rebre dades de sensors per ràdio), concepte d'**Internet de les coses** amb les seves aplicacions i **riscos**, i una **introducció a la IA** (classificar gestos amb l'acceleròmetre), amb reflexió **ètica i de privacitat**. Maquinari: micro:bit + Micro:shield (ESP32 opcional). Programació oficial: [`Programació didàctica/17_SA8_IoT_IA.md`](../../Programació%20didàctica/17_SA8_IoT_IA.md).

## Contingut

| Fitxer | Descripció |
|---|---|
| [`SA8_guia_docent.md`](SA8_guia_docent.md) | Guia del professorat: objectius, 3 sessions, mètode de projecte, mapa d'avaluació i errors freqüents. |
| [`SA8_fitxa_alumnat.md`](SA8_fitxa_alumnat.md) | **Fitxa base** (nucli d'una cara, per a tot l'alumnat): Activitats 1-3 + quadern. |
| [`SA8_fitxa_ampliada.md`](SA8_fitxa_ampliada.md) | **Versió ampliada** (aprofundiment): totes les rutines (rols, coavaluació, exit ticket, ODS, PC) i ampliacions. |
| [`SA8_connexions.md`](SA8_connexions.md) | Connexions (micro:bit emissor/receptor, Micro:shield, ESP32 opcional). |
| `codi/` | Programes MicroPython + un sketch ESP32 (vegeu la taula següent). |

### Codi (`codi/`)

| Programa | Què mostra |
|---|---|
| [`01_telemetria_emissor.py`](codi/01_telemetria_emissor.py) | micro:bit que envia dades de sensors per ràdio. |
| [`02_telemetria_receptor.py`](codi/02_telemetria_receptor.py) | micro:bit que rep, mostra i registra pel port sèrie. |
| [`03_ia_gestos.py`](codi/03_ia_gestos.py) | Classificació de gestos amb l'acceleròmetre (IA basada en regles). |
| `04_esp32_telemetria.ino` | *(Opcional)* ESP32 que publica dades per WiFi. |

## Producte i avaluació

- **Producte:** sistema connectat (telemetria) **o** classificador de gestos amb IA, + **reflexió escrita** sobre ètica i privacitat.
- **Criteris:** CA4.2, CA3.1 · **Rúbriques:** **R1** (codi), **R3** (sistema/decisió), **R4** (documentació/reflexió).

## Continuïtat

Ve de la **SA7** (robot mòbil) i porta a la **SA9** (projecte final). Reprèn el **fil dels dos llenguatges** obert a la **SA5** (Python a micro:bit; C++ a l'ESP32 opcional) i hi afegeix **dades, connexió i decisió** — peces que es poden integrar al projecte final.
