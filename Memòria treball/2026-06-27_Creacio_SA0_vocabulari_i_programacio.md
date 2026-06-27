# Memòria de treball — 2026-06-27 · Creació de la SA0 (vocabulari essencial i bases de programació)

## Objectiu de l'avenç
Crear una **SA0** dins de `Classes/` com a material **transversal de suport**: vocabulari essencial de totes les SA i una guia per aprendre a programar la placa (conceptes bàsics ben explicats).

## Decisions de disseny (brainstorming amb el docent)
- **Estructura:** híbrida → glossari + guia de programació + fitxa d'autoaprenentatge.
- **Llenguatges:** Arduino C/C++ **i** MicroPython (micro:bit), amb taula comparativa.
- **Organització del vocabulari:** **per SA** (SA1→SA9), més un bloc 0 de termes inicials.
- **To:** **fitxers separats per públic** → alumnat (autoexplicatiu, amb analogies) i docent (referència densa).
- **Codi:** només **fragments il·lustratius** dins els `.md`; els sketches complets resten a `Classes/SAx/codi/`.

## Fitxers creats (`Classes/SA0/`)
| Fitxer | Públic | Contingut |
|---|---|---|
| `README.md` | tots | Presentació, índex i com usar la SA0. |
| `SA0_vocabulari_essencial.md` | alumnat | Glossari per SA + bloc inicial + mètode de projecte. |
| `SA0_guia_programacio.md` | alumnat | Part A Arduino, Part B MicroPython, Part C comparativa, errors freqüents, PRIMM. |
| `SA0_fitxa_alumnat.md` | alumnat | 6 activitats d'autoaprenentatge + autoavaluació (no qualifica). |
| `SA0_guia_docent.md` | docent | Integració, mapa vocabulari↔SA, precisions tècniques, solucionari de la fitxa. |

## Altres canvis
- Actualitzat `Classes/00_LLEGEIX-ME_Classes.md`: afegida la fila **SA0** a la taula de contingut.

## Coherència amb el material existent
- Mateixa "gramàtica" del curs: model **entrada→procés→sortida**, **mètode de projecte** (analitzar→dissenyar→prototipar→provar→millorar) i pedagogia **PRIMM**.
- Vincle explícit amb la programació didàctica (`10_SA1...`–`18_SA9...`).

## Pendents / possibles ampliacions
- Versió **imprimible** (DOCX/PDF) del "diccionari de butxaca".
- Ampliar la fitxa amb més exercicis de traducció Arduino↔MicroPython.
- Sincronitzar amb el repositori GitHub quan es validi.
