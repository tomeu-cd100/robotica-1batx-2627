# Memòria de treball — 2026-06-27 · Prova de la Capa 2 (Wokwi)

## Objectiu
Validar la **Capa 2** de la proposta alternativa a Tinkercad: circuits com a text (Wokwi) per tenir simulació i captures reproduïbles.

## Què s'ha fet
- Generat el projecte de prova **`Simulacions/Wokwi/SA2_semafor/`**: `diagram.json` (circuit) + `sketch.ino` (codi).
- Carregat a **wokwi.com** i **simulat amb èxit**: el circuit es renderitza (3 LEDs + resistències + cables a l'Arduino) i el semàfor funciona (captura del **LED verd encès**).
- Creat `Simulacions/Wokwi/README.md` amb el flux de càrrega i la referència del format.

## Aprenentatge clau (tècnic)
- **Injectar codi via teclat (`type`) a l'editor Monaco és poc fiable**: acumula indentació i depèn d'enfocar bé l'editor.
- **Mètode robust:** injectar amb l'API de Monaco via JavaScript:
  ```js
  const models = monaco.editor.getModels();
  models.find(m => m.uri.toString()==='vfs:sketch.ino').setValue(codi);
  models.find(m => m.uri.toString()==='vfs:diagram.json').setValue(json);
  ```
  Evita problemes de focus, autotancament de claus i indentació.

## Veredicte
**Wokwi és viable i escalable** (a diferència de Tinkercad): el circuit és text versionable al repo i la simulació/captura és fiable. Cobreix Arduino i micro:bit (MicroPython).

## Estat final (decisió del docent: aturar com a mostra)
S'ha decidit **deixar la Capa 2 com a mostra validada** amb **2 pràctiques publicades** i el flux documentat:
| Pràctica | Projecte text | Enllaç interactiu (Wokwi públic) |
|---|---|---|
| SA1 Blink | `Simulacions/Wokwi/SA1_blink/` | https://wokwi.com/projects/468012800918599681 |
| SA2 Semàfor | `Simulacions/Wokwi/SA2_semafor/` | https://wokwi.com/projects/468009961823220737 |

Tots dos enllaços referenciats als `SAx_esquemes_connexions.md` corresponents.

## Cost observat (per si es reprèn l'escalat)
Publicar cada pràctica a Wokwi són ~8-10 passos de navegador. El coll d'ampolla és el **modal de desat (React)**: cal registrar el nom amb el **setter natiu** (`HTMLInputElement.prototype.value` + event `input`) perquè el botó SAVE s'activi, i clicar SAVE pel DOM. La injecció de codi/diagrama es fa amb `monaco.editor.getModels().setValue(...)`.

## Per reprendre (escalat per fases)
- **Fase 1:** SA3 (sensors). **Fase 2:** SA4 + SA6. **Fase 3:** SA5 + SA8 (micro:bit). **SA7:** no simulable (només diagrama .md).
- Opció recomanada: generar primer tots els projectes **text** al repo i publicar els enllaços en tandes.
