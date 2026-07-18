# 2026-07-18 · Millores de progressió de conceptes (8 arreglos)

**Context:** anàlisi d'adequació del temari per a 1r de Batxillerat (nivell validat
en auditories anteriors; sostre OK). Patró detectat: conceptes **presentats com a
menció** en una SA i **reutilitzats com a sabuts** en una de posterior, sense repesca
explícita. S'apliquen 8 arreglos, tots repesques de 10-15' dins sessions existents —
**cap hora nova** (el quadre de `08_Sequenciacio` no es toca).

## Arreglos aplicats

| # | Forat | Arreglo | Fitxers |
|---|---|---|---|
| 1 | `millis()` orfe (presentat SA2, exigit SA6/SA7) | Itinerari explícit del concepte: SA2 S2 el presenta → SA4 S3 el practica (`05_dos_leds_millis`, ara també a la guia docent, no només al README) → SA6 S3 l'usa | `SA2_guia_docent`, `SA4_guia_docent`, `13_SA4` |
| 2 | `switch` apareixia de cop a SA6 | Variant del semàfor amb `switch` sobre variable de fase a SA2 S2 («llavor de les màquines d'estats»); sketch nou `02b_semafor_switch.ino` (compila, 1076 bytes) | `SA2_guia_docent`, `SA2_fitxa_alumnat`, `11_SA2`, sketch nou |
| 3 | Control proporcional inconsistent (ampliació a SA6, reapareix SA7/SA9) | Política fixada: **+ampliació sempre**; requadre pont de 5' a SA7 S4 (correcció = Kp·error) per a qui no va fer l'ampliació de SA6 | `SA7_guia_docent` |
| 4 | Cinemàtica diferencial sense bastida numèrica | Full de càlcul previ a SA7 S2 (perímetre de roda, velocitat real, temps teòric del gir de 90° amb arc (π·L)/4) + comparació teòric↔calibrat; connexió Matemàtiques I | `SA7_guia_docent`, `SA7_fitxa_alumnat`, `16_SA7` |
| 5 | Llei d'Ohm assumida (220 Ω per decret) | Requadre «D'on surt el 220 Ω?» a SA2 S1: R = (5−2) V / 0,02 A = 150 → 220 Ω comercial; lliga amb el Racó de mesura existent | `SA2_guia_docent`, `SA2_fitxa_alumnat`, `11_SA2` |
| 6 | Salt a la IA massa gran (SA8 S3) | Escala de 3 graons: llindar (conegut de SA3/SA6) → regles combinades → ML (Teachable Machine); **sembra a SA5 S2**: anotar valors reals d'acceleròmetre al quadern per reutilitzar-los a SA8 | `SA8_guia_docent`, `SA5_guia_docent`, `17_SA8`, `14_SA5` |
| 7 | Brúixola fantasma (als sabers, cap activitat) | Esborrada del Bloc D i de les llistes de SA5; a l'activació de SA5 S2 es menciona com a «hi és però no la treballem»; el solucionari T3 ja no hi remet | `03_Sabers`, `14_SA5`, `SA5_guia_docent`, `Solucionari_T3` |
| 8 | Design thinking estrenat a SA9 | S'anomena pel nom des de SA1 S1 (el cicle del pòster n'és la versió d'aula); SA9 el presenta com a repesca | `SA1_guia_docent`, `10_SA1`, `SA9_guia_docent` |

## Decisions

- **Proporcional NO promogut a nucli de SA6**: la S3 de SA6 ja és la sessió més
  carregada del trimestre (punt calent conegut); el pont es fa a SA7, on es necessita.
- **Brúixola: esborrar, no afegir activitat**: cap ús posterior al curs no la
  justificava; el SVG de la placa la manté (descriu el maquinari real, no el temari).
- **MQTT/WiFi/ESP32 es mantenen com a opcionals** sense introducció prèvia: són
  material docent de demostració, no exigible a l'alumnat.

## Estat

- `tools/qa.py` net (12 comprovacions; avisos PII preexistents de la memòria de treball).
- `02b_semafor_switch.ino` compilat amb `arduino:avr:uno` (arduino-cli local).
- Web regenerada (257 pàgines, 0 enllaços trencats).
