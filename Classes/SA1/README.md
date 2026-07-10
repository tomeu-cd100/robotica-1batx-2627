# SA1 · Què és un robot? Sistemes embeguts i mètode de projecte

Primera situació d'aprenentatge del curs (**6 h · 3 sessions**, 1r trimestre). Introdueix el concepte de **robot** i **sistema embegut**, el model **entrada → procés → sortida**, l'arquitectura d'**Arduino UNO**, les **normes de seguretat** i el primer programa (`Blink`). Maquinari: Arduino UNO (demostració) + simulador **Tinkercad**. Programació oficial: [`Programació didàctica/10_SA1_Introduccio_robotica.md`](../../Programació%20didàctica/10_SA1_Introduccio_robotica.md).

## Itinerari de la SA (per sessions)

> Ordre de treball recomanat. La font única de cada activitat és la **fitxa base** ([`SA1_fitxa_alumnat.md`](SA1_fitxa_alumnat.md)); la resta de documents hi donen suport.

**🟦 Sessió 1 (2 h) · Què és un robot?**
1. Model **entrada → procés → sortida** i anàlisi de 3 sistemes → fitxa base, *Activitat 1*.
2. [Prova diagnòstica](SA1_prova_diagnostica.md) (no qualifica; serveix per fer parelles heterogènies).
3. Presentació del **mètode de projecte** i primera entrada al **quadern tècnic**.

**🟦 Sessió 2 (2 h) · Arquitectura i seguretat**
1. Anatomia de la placa UNO: etiqueta l'esquema mut → [esquemes i connexions](SA1_esquemes_connexions.md), *Activitat 2*.
2. [Normes de seguretat](SA1_normes_seguretat.md): llegir i **signar** el full.
3. Entorn: tour de l'**Arduino IDE** i **Tinkercad** (primer circuit virtual).

**🟦 Sessió 3 (2 h) · El primer programa**
1. `Blink` amb el mètode **PRIMM** (predir → executar → investigar → modificar) → fitxa base, *Activitat 4*.
2. Repte [`blink_repte.ino`](codi/blink_repte/blink_repte.ino) i ampliacions ([`blink_millis`](codi/blink_millis/blink_millis.ino), [`sos_morse`](codi/sos_morse/sos_morse.ino)).
3. Mini-debat **ètic** (ODS) i tria del robot per a la [fitxa-pòster](SA1_poster_robot_plantilla.md).

## Producte i avaluació

- **Producte:** [`SA1_poster_robot_plantilla.md`](SA1_poster_robot_plantilla.md) (anàlisi d'un robot real + dilema ètic) i primeres entrades del quadern tècnic.
- **Rúbriques:** **R4** (documentació) i **R5** (actitud). La prova diagnòstica **no** qualifica.

<!-- web:only-github -->
## Tots els documents

| Fitxer | Descripció |
|---|---|
| [`SA1_guia_docent.md`](SA1_guia_docent.md) | Guia del professorat: objectius, seqüència de les 3 sessions, punts clau, errors freqüents i avaluació. |
| [`SA1_fitxa_alumnat.md`](SA1_fitxa_alumnat.md) | **Fitxa base** (nucli d'una cara, per a tot l'alumnat): Activitats 1-4 + quadern. |
| [`SA1_fitxa_ampliada.md`](SA1_fitxa_ampliada.md) | **Versió ampliada** (aprofundiment): totes les rutines (rols, coavaluació, exit ticket, ODS, PC) i ampliacions. |
| [`SA1_checklist_docent.md`](SA1_checklist_docent.md) | **Checklist docent** (una cara): logística prèvia, punts de control per sessió, avaluació i diversitat. |
| [`SA1_checklist_alumnat.md`](SA1_checklist_alumnat.md) | **Checklist alumnat** (una cara): què he de fer/lliurar + autoavaluació amb semàfor. |
| [`SA1_esquemes_connexions.md`](SA1_esquemes_connexions.md) | Anatomia de la placa UNO (etiquetada + muda per a l'Activitat 2) i circuit del `Blink`. |
| [`SA1_prova_diagnostica.md`](SA1_prova_diagnostica.md) | Prova inicial de coneixements previs (no qualifica): versió imprimible + versió Google Forms. |
| [`SA1_normes_seguretat.md`](SA1_normes_seguretat.md) | Full de normes de seguretat del laboratori, **per signar**. |
| [`SA1_poster_robot_plantilla.md`](SA1_poster_robot_plantilla.md) | Plantilla del **producte de la SA**: fitxa-pòster d'anàlisi d'un robot real. |
| [`SA1_questionari_conceptes.md`](SA1_questionari_conceptes.md) | Qüestionari de conceptes (robot, sistema embegut i placa UNO): repàs formatiu o prova curta qualificable (10 preguntes). |
| `codi/` | Sketches d'Arduino (vegeu la taula següent). |

### Codi (`codi/`)

| Sketch | Nivell | Què mostra |
|---|---|---|
| [`blink/blink.ino`](codi/blink/blink.ino) | Base | El primer programa: `setup()`, `loop()`, `pinMode`, `digitalWrite`, `delay`. |
| [`blink_repte/blink_repte.ino`](codi/blink_repte/blink_repte.ino) | Repte | Bucle `for` i variables per als temps (3 parpellejos + pausa). |
| [`blink_millis/blink_millis.ino`](codi/blink_millis/blink_millis.ino) | Ampliació | Temporització **no bloquejant** amb `millis()` (sense `delay()`). |
| [`sos_morse/sos_morse.ino`](codi/sos_morse/sos_morse.ino) | Ampliació | **Funcions** pròpies (`punt()`, `ratlla()`) per emetre SOS en Morse. |
<!-- /web:only-github -->
