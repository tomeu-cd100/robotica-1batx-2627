# SA8 · IoT i IA: el robot connectat i intel·ligent

Vuitena situació d'aprenentatge (**6 h · 3 sessions**, 3r trimestre). El sistema es **connecta** i comença a **decidir**: **telemetria** (enviar/rebre dades de sensors per ràdio), concepte d'**Internet de les coses** amb les seves aplicacions i **riscos**, i una **introducció a la IA** (classificar gestos amb l'acceleròmetre), amb reflexió **ètica i de privacitat**. Maquinari: micro:bit + Micro:shield (ESP32 opcional). Programació oficial: [`Programació didàctica/17_SA8_IoT_IA.md`](../../Programació%20didàctica/17_SA8_IoT_IA.md).

![Telemetria: una placa mesura dades en un lloc i les transmet sense fils a una altra](img/sa8-telemetria.svg)

## 📦 Què has d'entregar

| Quan | Lliurable | On es lliura |
|---|---|---|
| S1 | [Activitat 1 · Telemetria](SA8_fitxa_alumnat.md#1-telemetria-s1) | [Tasca de Classroom](https://classroom.google.com/c/ODY4ODU4Njk0NTEy/a/ODcwNTE3MTIxMDY0/details) |
| S2 | [Activitat 2 · Auditoria d'un producte IoT](SA8_fitxa_alumnat.md#2-auditoria-dun-producte-iot-s2) | Mateixa tasca de Classroom |
| S3 | [Activitat 3 · Introducció a la IA](SA8_fitxa_alumnat.md#3-introduccio-a-la-ia-s3) | Mateixa tasca de Classroom |
| ⭐ | [Repte triat (A, B o C)](../../Reptes/Reptes_SA8.md) | El docent el valida i pinteu l'estrella al [tauler de reptes](../00_General/00_Tauler_reptes.md) |
| 📓 | Full del quadern tècnic de cada sessió | En paper, en acabar la sessió |
| 🤖 | La telemetria del rover (micro:bit al rover + base amb OLED) | Es registra al dossier del rover: [dossier del rover](../00_General/00_Projecte_T3_Rover.md) |

## Itinerari per sessions

> La teva feina és a la **[fitxa base](SA8_fitxa_alumnat.md)**. Aquesta ruta et diu què toca fer a cada sessió i què necessites en aquell moment. Les respostes de la fitxa es lliuren a la **[tasca de Classroom](https://classroom.google.com/c/ODY4ODU4Njk0NTEy/a/ODcwNTE3MTIxMDY0/details)**.

1. **Sessió 1 · Telemetria** — fes l'[Activitat 1 de la fitxa](SA8_fitxa_alumnat.md#1-telemetria-s1), amb les [connexions](SA8_connexions.md), el [diagrama de flux de la telemetria](SA8_diagrama_flux.md) i el codi de l'[emissor](codi/01_telemetria_emissor_EXPLICACIO.md) i el [receptor](codi/02_telemetria_receptor_EXPLICACIO.md). Recorda: **una de les dues meitats** s'escriu ✏️ **a full en blanc** (editor buit, pseudocodi propi + xuleta de `radio`).
2. **Sessió 2 · IoT: auditoria d'un producte real** — tria una targeta de [`SA8_auditoria_iot.md`](SA8_auditoria_iot.md) i omple l'informe (Activitat 2 de la [fitxa](SA8_fitxa_alumnat.md)).
3. **Sessió 3 · Introducció a la IA** — fes l'[Activitat 3](SA8_fitxa_alumnat.md#3-introduccio-a-la-ia-s3), amb el [classificador de gestos](codi/03_ia_gestos_EXPLICACIO.md) i la [pràctica de Teachable Machine](SA8_practica_teachable_machine.md) (s'avalua amb R1, R3, R4).
4. **Abans d'entregar** — repassa [el meu checklist](SA8_checklist_alumnat.md).

### Si vols més

- [Fitxa ampliada](SA8_fitxa_ampliada.md) — aprofundiment i ampliacions.
- [Reptes de la SA8](../../Reptes/Reptes_SA8.md) — tria el teu context.

<!-- web:only-github -->
## Contingut

| Fitxer | Descripció |
|---|---|
| [`SA8_guia_docent.md`](SA8_guia_docent.md) | Guia del professorat: objectius, 3 sessions, mètode de projecte, mapa d'avaluació i errors freqüents. |
| [`SA8_fitxa_alumnat.md`](SA8_fitxa_alumnat.md) | **Fitxa base** (nucli d'una cara, per a tot l'alumnat): Activitats 1-3 + quadern. |
| [`SA8_fitxa_ampliada.md`](SA8_fitxa_ampliada.md) | **Versió ampliada** (aprofundiment): totes les rutines (rols, coavaluació, exit ticket, ODS, PC) i ampliacions. |
| [`SA8_checklist_docent.md`](SA8_checklist_docent.md) | **Checklist docent** (una cara): logística prèvia, punts de control per sessió, avaluació i diversitat. |
| [`SA8_checklist_alumnat.md`](SA8_checklist_alumnat.md) | **Checklist alumnat** (una cara): què he de fer/lliurar + autoavaluació amb semàfor. |
| [`SA8_katas.md`](SA8_katas.md) | Katas d'escriptura (10'): un per sessió de codi, abans d'obrir el sketch; si ningú no el projecta, l'alumnat l'obre sol. |
| [`SA8_auditoria_iot.md`](SA8_auditoria_iot.md) | **Auditoria d'un producte IoT** (S2): 8 targetes de producte + informe d'auditoria + peritatge creuat. |
| [`SA8_connexions.md`](SA8_connexions.md) | Connexions (micro:bit emissor/receptor, Micro:shield, ESP32 opcional). |
| `codi/` | Programes MicroPython + un sketch ESP32 (vegeu la taula següent). |

### Codi (`codi/`)

| Programa | Què mostra |
|---|---|
| [`01_telemetria_emissor.py`](codi/01_telemetria_emissor.py) | micro:bit que envia dades de sensors per ràdio (amb esquelet «Si t'encalles» a la seva pàgina). |
| [`02_telemetria_receptor.py`](codi/02_telemetria_receptor.py) | micro:bit que rep, mostra i registra pel port sèrie. |
| [`03_ia_gestos.py`](codi/03_ia_gestos.py) | Classificació de gestos amb l'acceleròmetre (IA basada en regles). |
| [`04_esp32_telemetria.ino`](codi/04_esp32_telemetria/04_esp32_telemetria.ino) | *(Opcional)* ESP32 que publica dades per WiFi. |

Cada sketch té la seva **pàgina de pràctica** a la web (per què es fa + codi explicat per blocs); a GitHub, l'explicació és al `*_EXPLICACIO.md` del costat de cada `.py` (i a l'`EXPLICACIO.md` de la carpeta de l'ESP32).

<!-- /web:only-github -->

## Producte i avaluació

- **Producte:** sistema connectat (telemetria) **o** classificador de gestos amb IA, + **reflexió escrita** sobre ètica i privacitat.
- **Criteris:** CA4.2, CA3.1 · **Rúbriques:** **R1** (codi), **R3** (sistema/decisió), **R4** (documentació/reflexió).

## Continuïtat

Ve de la **SA7** (robot mòbil) i porta a la **SA9** (projecte final). Reprèn el **fil dels dos llenguatges** obert a la **SA5** (Python a micro:bit; C++ a l'ESP32 opcional) i hi afegeix **dades, connexió i decisió** — peces que es poden integrar al projecte final.
