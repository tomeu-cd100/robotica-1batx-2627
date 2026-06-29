# Classes — material d'aula

Material llest per a l'aula de cada situació d'aprenentatge (**SA1-SA9**), amb el **codi** funcional i el solucionari de les ampliacions («+ repte») de les pràctiques. *(El solucionari dels reptes triables A/B/C és a `../Reptes/Solucionari/`.)*

## Organització

Cada subcarpeta `SAx/` conté, segons la SA:
- **`SAx_guia_docent.md`** — desenvolupament de la sessió per al professorat.
- **`SAx_fitxa_alumnat.md`** — **fitxa base** (nucli d'una cara, per a tot l'alumnat).
- **`SAx_fitxa_ampliada.md`** — **versió ampliada** (aprofundiment): rutines i ampliacions per a qui vulgui/pugui més.
- **`SAx_esquemes_connexions.md`** / **`SAx_connexions.md`** — esquemes de muntatge.
- **`codi/`** — programes `.ino` (Arduino) o `.py` (micro:bit/MicroPython).

| Carpeta | SA | Plataforma |
|---|---|---|
| `SA1/` | Introducció a la robòtica | Arduino |
| `SA2/` | Sortides digitals i PWM | Arduino |
| `SA3/` | Entrades i sensors | Arduino |
| `SA4/` | Moviment: servos i motors | Arduino |
| `SA5/` | micro:bit i MicroPython | micro:bit |
| `SA6/` | Sistemes de control | Arduino |
| `SA7/` | Robòtica mòbil | Imagina 3dBot |
| `SA8/` | IoT i IA | micro:bit / ESP32 |
| `SA9/` | Projecte final | (plantilles) |
| `Solucionari/` | Solucions de les ampliacions «+ repte» de les pràctiques, per trimestre (≠ `../Reptes/Solucionari/`) | — |

## Convencions de codi
- Comentaris en català **sense accents** (evita problemes de codificació a l'IDE).
- Assignació de pins **consistent** entre SA (documentada als esquemes de cada SA).

## Recursos transversals
- **`00_IA_a_la_materia.md`** — guia d'integració de la **Intel·ligència Artificial** a tot el curs: espiral SA0→SA9, marc conceptual mínim, ètica de dades i **ús responsable d'assistents d'IA** (integritat acadèmica). Pràctica de ML a `SA8/SA8_practica_teachable_machine.md`.
- **`00_Poster_aula_metode_DEPURA_rols.md`** — pòster d'aula (mètode, DEPURA, rols).
- **`00_Poster_IA_us_assistents.md`** — pòster A4/A3: semàfor d'usos d'assistents d'IA + integritat acadèmica.

> La planificació didàctica de cada SA és a [`../Programació didàctica/`](../Programació%20didàctica/). El `00_LLEGEIX-ME_Classes.md` amplia aquesta guia.
