# Classes — Material d'aula

Material llest per a l'aula, organitzat per situació d'aprenentatge (SA). Cada SA conté:
- **Guia docent** (`SAx_guia_docent.md`): seqüència sessió a sessió, punts clau i errors freqüents.
- **Fitxa base** (`SAx_fitxa_alumnat.md`): el **nucli d'una cara** que fa tot l'alumnat — activitats nuclears, repte, producte, DEPURA, autoavaluació i quadern.
- **Fitxa ampliada** (`SAx_fitxa_ampliada.md`): **versió d'aprofundiment** amb totes les rutines (rols, coavaluació, exit ticket, ODS, pensament computacional) i ampliacions.
- **Esquemes** (`SAx_esquemes_connexions.md`): taules de connexió pin-a-pin (reproduïbles a Tinkercad/Wokwi). *(SA2 i SA3.)*
- **Codi** (`codi/*.ino`): sketches comentats, oberts directament a l'Arduino IDE.

## Contingut actual

| SA | Tema | Sessions | Codi |
|---|---|---|---|
| **SA0** | Vocabulari essencial i bases de programació (material transversal de suport) | — | Fragments dins els `.md` |
| **SA1** | Introducció a la robòtica i sistemes embeguts | 3 | `blink.ino`, `blink_repte.ino` |
| **SA2** | Sortides digitals i PWM | 4 | `01_led_basic` · `02_semafor` · `03_fade_pwm` · `04_rgb` · `05_panell_senyalitzacio` |
| **SA3** | Entrades i sensors | 4 | `01_polsador_debounce` · `02_potenciometre_ldr` · `03_ultrasons_funcio` · `04_alarma_aparcament` |
| **SA4** | Moviment: servos, motors i ponts H | 4 | `01_servo_potenciometre` · `02_motor_pont_h` · `03_sensor_velocitat` · `04_barrera_automatica` |
| **SA5** | micro:bit i MicroPython | 3-4 | `01_name_badge.py` · `02_passes.py` · `03_nightlight.py` · `04_radio_dau.py` |
| **SA6** | Sistemes de control | 4 | `01_llac_obert_vs_tancat` · `02_termostat_histeresi` · `03_maquina_estats` · `04_control_proporcional` |
| **SA7** | Robòtica mòbil (Imagina 3dBot) | 4 | `01_moviment_basic` · `02_trajectoria_quadrat` · `03_evita_obstacles` · `04_seguidor_linia` |
| **SA8** | IoT i IA | 3 | `01_telemetria_emissor.py` · `02_telemetria_receptor.py` · `03_ia_gestos.py` · `04_esp32_telemetria.ino` |
| **SA9** | Projecte final integrador | 5 | `plantilles/` (banc de reptes, planificació, dossier, codi base) |

## Notes
- El codi d'Arduino (`.ino`) usa **Arduino UNO** + kit Keyestudio/BQ; el de **SA5 és MicroPython (`.py`)** per a micro:bit (editor python.microbit.org / Thonny).
- Comentaris en català sense accents als fitxers de codi per evitar problemes de codificació.
- Els esquemes es poden muntar físicament o simular a **Tinkercad Circuits** / **Wokwi** abans del muntatge real.
- Vincle amb la programació didàctica: vegeu `Programació didàctica/10_SA1...` fins a `18_SA9...`.
- **SA7** (Imagina 3dBot): cal **ajustar els pins** dels motors al codi segons el manual de la placa (bloc marcat a cada `.ino`).
- **SA8**: codi micro:bit en `.py`; l'ESP32 és **opcional/avançat**.
- **SA9**: el codi el crea l'alumnat; es proporcionen **plantilles** de treball.
- **Com s'avalua la matèria (per a l'alumnat):** [`00_Avaluacio_per_alumnat.md`](00_Avaluacio_per_alumnat.md) — la guia d'avaluació **en llenguatge d'alumne**: d'on surt la nota (45/25/20/10), l'escala NA·AS·AN·AE, les 5 rúbriques en una línia, què no qualifica i per què, els errors que sumen, les proves, la recuperació i l'ús d'IA. Es reparteix/enllaça **la primera setmana** i es reprèn a l'inici de cada SA (cada fitxa base té la seva caixa «🎯 Objectius i avaluació» que hi remet).
- **Banc d'activació amb repàs espaiat:** [`00_Banc_activacio_repas.md`](00_Banc_activacio_repas.md) — **3 preguntes de recuperació per a cada sessió del curs** (sessió anterior · SA anterior · trimestre anterior), amb respostes per al docent. Es projecten a la fase d'**Activació** (5', tothom escriu, no qualifica): combinen l'efecte test i l'espaiat perquè el que es va aprendre a l'octubre arribi viu al febrer.
- **Mini-checks individuals:** [`00_Mini_checks_individuals.md`](00_Mini_checks_individuals.md) — un micro-repte de codi de **10' en solitari** per SA (SA2–SA8), amb semàfor de correcció i accions de reforç. No qualifica: és el radar que detecta l'*efecte passatger* del treball en parella abans de la prova trimestral.
- **Targetes de rescat:** [`00_Targetes_rescat.md`](00_Targetes_rescat.md) — per a cada **encallament previsible** de cada pràctica, **3 nivells de pista** (🟢 pregunta conceptual → 🟡 pas concret → 🔴 fragment amb forat). L'alumne agafa el nivell mínim, s'apunta la targeta al quadern (no penalitza) i el docent deixa de ser el coll d'ampolla. Fa operatives les mesures de suport de la programació (doc 05 §5.2).
- **Referents de la tecnologia:** [`00_Referents_tecnologia.md`](00_Referents_tecnologia.md) — **un referent per SA lligat al tema tècnic** (Hamilton→programari, Van Brittan Brown→alarma, Wilson→ARM/micro:bit, Flügge-Lotz→control…), amb pregunta ganxo per a 1 minut dins l'activació de la S1. Perspectiva de gènere pel contingut, no pel calendari.
- **Glossari tècnic català ↔ anglès:** [`00_Glossari_tecnic.md`](00_Glossari_tecnic.md) — ~55 termes per blocs (electrònica, programació, control, robòtica, comunicacions/dades) amb el terme anglès i una definició d'una línia. Hàbit associat: 3 termes nous per SA al quadern (doc 04 §4.5).
- **Guia de la defensa oral:** [`00_Guia_defensa_oral.md`](00_Guia_defensa_oral.md) — **escala de progressió** de la defensa (T1: 1' · T2: 2-3' amb decisió tècnica · T3/SA9: 5' + preguntes i demo), guió, errors típics i logística de defenses esglaonades a la SA9.
- **Recurs transversal d'aula:** [`00_Poster_aula_metode_DEPURA_rols.md`](00_Poster_aula_metode_DEPURA_rols.md) (per projectar/imprimir): mètode de projecte, rutina de depuració **DEPURA**, **rols** d'equip i autoavaluació/coavaluació. Les rutines del pòster es concreten a cada fitxa i guia.
- **Guia transversal d'IA:** [`00_IA_a_la_materia.md`](00_IA_a_la_materia.md) — com s'introdueix la **Intel·ligència Artificial** al llarg del curs (espiral SA0→SA9, marc conceptual mínim, **ètica de dades** i **ús d'assistents d'IA amb integritat acadèmica**). La pràctica de ML viu a [`SA8/SA8_practica_teachable_machine.md`](../SA8/SA8_practica_teachable_machine.md) i el **pòster d'aula** del semàfor d'usos a [`00_Poster_IA_us_assistents.md`](00_Poster_IA_us_assistents.md).
- **Banc d'objectes per dissenyar:** [`00_Banc_objectes_disseny.md`](00_Banc_objectes_disseny.md) — per a cada SA, objectes reals que l'alumnat pot dissenyar i construir com a **producte** (funció, usuari, carcassa/maqueta), amb procés de disseny, pautes de fabricació i rúbrica de producte.
- **Plantilla de disseny d'objecte:** [`00_Plantilla_disseny_objecte.md`](00_Plantilla_disseny_objecte.md) — full A4 imprimible perquè l'alumnat dissenyi el seu objecte (empatitzar → definir → idear/esbós → prototipar → provar → comunicar) amb autoavaluació i coavaluació.
- **Mapa SA → objecte:** [`00_Mapa_SA_objectes.md`](00_Mapa_SA_objectes.md) — vista de conjunt per projectar: què s'aprèn a cada SA i quins objectes s'hi poden dissenyar (el fil encendre → … → integrar).
- **Galeria d'exemples resolts:** [`00_Galeria_exemples_objectes.md`](00_Galeria_exemples_objectes.md) — dos objectes desenvolupats de punta a punta (llum d'estat d'escriptori, SA2; mini-hivernacle automàtic, SA6) com a model del nivell esperat.

## Estat
✅ **Curs complet:** material d'aula de les 9 situacions d'aprenentatge (SA1-SA9), trimestres 1, 2 i 3.

## Possibles ampliacions futures
- Versions **DOCX/PDF** del material per imprimir/compartir.
- Solucionari ampliat dels reptes "+ ampliació".
- Bateria de proves pràctiques d'avaluació per trimestre.
