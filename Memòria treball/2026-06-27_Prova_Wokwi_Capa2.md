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

## Pendents
- Decidir si s'escala a **totes les pràctiques** (generar `diagram.json` + codi per a cada una) i fer-ne les captures.
- Sincronitzar amb GitHub la prova (`Simulacions/Wokwi/`).
- *(Captura del semàfor desada a disc per als apunts; cal incorporar-la on calgui.)*
