# SA1 · Què és un robot? Sistemes embeguts i mètode de projecte

Primera situació d'aprenentatge del curs (**6 h · 3 sessions**, 1r trimestre). Introdueix el concepte de **robot** i **sistema embegut**, el model **entrada → procés → sortida**, l'arquitectura d'**Arduino UNO**, les **normes de seguretat** i el primer programa (`Blink`). Maquinari: Arduino UNO (demostració) + simulador **Tinkercad**. Programació oficial: [`Programació didàctica/10_SA1_Introduccio_robotica.md`](../../Programació%20didàctica/10_SA1_Introduccio_robotica.md).

## Contingut

| Fitxer | Descripció |
|---|---|
| [`SA1_guia_docent.md`](SA1_guia_docent.md) | Guia del professorat: objectius, seqüència de les 3 sessions, punts clau, errors freqüents i avaluació. |
| [`SA1_fitxa_alumnat.md`](SA1_fitxa_alumnat.md) | **Fitxa base** (nucli d'una cara, per a tot l'alumnat): Activitats 1-4 + quadern. |
| [`SA1_fitxa_ampliada.md`](SA1_fitxa_ampliada.md) | **Versió ampliada** (aprofundiment): totes les rutines (rols, coavaluació, exit ticket, ODS, PC) i ampliacions. |
| [`SA1_esquemes_connexions.md`](SA1_esquemes_connexions.md) | Anatomia de la placa UNO (etiquetada + muda per a l'Activitat 2) i circuit del `Blink`. |
| [`SA1_prova_diagnostica.md`](SA1_prova_diagnostica.md) | Prova inicial de coneixements previs (no qualifica): versió imprimible + versió Google Forms. |
| [`SA1_normes_seguretat.md`](SA1_normes_seguretat.md) | Full de normes de seguretat del laboratori, **per signar**. |
| [`SA1_poster_robot_plantilla.md`](SA1_poster_robot_plantilla.md) | Plantilla del **producte de la SA**: fitxa-pòster d'anàlisi d'un robot real. |
| `codi/` | Sketches d'Arduino (vegeu la taula següent). |

### Codi (`codi/`)

| Sketch | Nivell | Què mostra |
|---|---|---|
| [`blink/blink.ino`](codi/blink/blink.ino) | Base | El primer programa: `setup()`, `loop()`, `pinMode`, `digitalWrite`, `delay`. |
| [`blink_repte/blink_repte.ino`](codi/blink_repte/blink_repte.ino) | Repte | Bucle `for` i variables per als temps (3 parpellejos + pausa). |
| [`blink_millis/blink_millis.ino`](codi/blink_millis/blink_millis.ino) | Ampliació | Temporització **no bloquejant** amb `millis()` (sense `delay()`). |
| [`sos_morse/sos_morse.ino`](codi/sos_morse/sos_morse.ino) | Ampliació | **Funcions** pròpies (`punt()`, `ratlla()`) per emetre SOS en Morse. |

## Seqüència ràpida

1. **Sessió 1** — Què és un robot? Model E-P-S, anàlisi de 3 sistemes (Activitat 1) i [`SA1_prova_diagnostica.md`](SA1_prova_diagnostica.md).
2. **Sessió 2** — Arquitectura de la placa ([`SA1_esquemes_connexions.md`](SA1_esquemes_connexions.md), Activitat 2), [`SA1_normes_seguretat.md`](SA1_normes_seguretat.md) (signatura) i entorn (IDE + Tinkercad).
3. **Sessió 3** — Lectura i modificació de `blink.ino`, repte (`blink_repte.ino`), ampliacions i mini-debat ètic (ODS).

## Producte i avaluació

- **Producte:** [`SA1_poster_robot_plantilla.md`](SA1_poster_robot_plantilla.md) (anàlisi d'un robot real + dilema ètic) i primeres entrades del quadern tècnic.
- **Rúbriques:** **R4** (documentació) i **R5** (actitud). La prova diagnòstica **no** qualifica.
