# 2026-07-20 · Pàgines de pràctica per a cada sketch (SA1–SA8) i fusió de les bastides

## Punt de partida (auditoria del mateix dia)

Auditoria de SA1–SA3 amb tres agents: el codi de les pràctiques es donava sense
explicació escrita per a l'alumnat. L'explicació existia però era invisible per a ells:
guions de modelatge ORALS a les guies docents (PRIMM), comentaris de capçalera dels
`.ino` i un exemple resolt que comentava un sketch «bessó» que no existeix a `codi/`.
A més, les bastides `*_BASTIDA` (n'hi havia 8, no 3: SA1–SA8) estaven desinventariades
(una sola menció a la fitxa; absents de README, guia i checklists), i `02b_semafor_switch`
faltava a tres inventaris de SA2.

## Decisions del docent

1. **Cada pràctica, una pàgina pròpia** amb el per què es fa i el codi explicat per blocs,
   reutilitzant els guions de modelatge (reescrits en to alumne; el guió oral de la guia
   docent es conserva).
2. **Codi mai desplegat d'entrada**: el fitxer complet queda plegat (`<details>`).
3. **Bastides: desapareixen com a sketch** i es fusionen com a secció «🧗 Si t'encalles»
   (esquelet plegat) dins de la pàgina de la pràctica base.
4. **Abast: totes les SA amb codi** (SA1–SA8; la política de bastides s'ha aplicat a les 8).

## Què s'ha fet

- **Generador** (`web/_generador/generar.py`): un sketch d'alumnat amb `EXPLICACIO.md` al
  costat (`<nom>_EXPLICACIO.md` si és fitxer solt, com SA5/SA8) genera pàgina pròpia a
  `classes/san/codi/<slug>.html` amb l'explicació + codi complet plegat amb botó Copia;
  `codi.html` passa a ser l'índex de pràctiques; `code_map` remapa cada `.ino`/`.py` a la
  seva pàgina (tots els enllaços existents hi apunten sols); paginador propi
  ‹ anterior · índex · següent › i fil de SA; les pràctiques no s'apilen al sidebar.
- **35 pàgines de pràctica noves** (SA1: 4 · SA2: 6 · SA3: 4 · SA4: 5 · SA5: 4 · SA6: 4 ·
  SA7: 4 · SA8: 4), pilot fet a mà a SA2 i la resta amb 7 agents seguint el patró:
  🎯 per què / 🔮 prediu (PRIMM) / 🧠 codi per blocs / ⚠️ errors / 🔗 on ho aplicaràs.
- **8 bastides fusionades i esborrades**: SA1→blink_repte · SA2→02_semafor ·
  SA3→02_potenciometre_ldr · SA4→02_motor_pont_h · SA5→03_nightlight ·
  SA6→03_maquina_estats · SA7→03_evita_obstacles · SA8→01_telemetria_emissor.
- **Inventaris al dia**: README (taula de codi completa, amb `02b` a SA2), guia docent
  (nota de pàgines de pràctica + fila DUA cap a l'esquelet), checklists i fitxes (la
  menció «si t'encalles» apunta a la secció de la pàgina); `sa_definicions.js` (SA6) i
  `00_Targetes_rescat.md` actualitzats.
- **QA nou**: `tools/qa.py:comprova_explicacions()` (punt 13) exigeix explicació per a
  cada sketch d'alumnat i prohibeix que reapareguin `*_BASTIDA` solts. Convenció
  documentada al `CLAUDE.md`.

## Conceptes que abans no s'explicaven enlloc i ara sí

`millis()` i temporització no bloquejant (SA1/SA4), operador ternari (SA1), definició de
funcions pròpies i paràmetres (SA1/SA2/SA4), `switch`/`break` i variable de fase amb el
pont SA2→SA6, PWM i rangs 0–255 vs 0–1023, `INPUT_PULLUP` i antirebot, `pulseIn` (i el
retorn 0), pont H, histèresi, `enum`, control proporcional, ràdio micro:bit i protocol
emissor/receptor, WiFi a l'ESP32.

## Pendent

- Cap PDF nou: les pàgines de pràctica són material de consulta web (no full imprimible).
- L'exemple resolt de cada SA segueix comentant el seu sketch «bessó»; ara les pàgines de
  pràctica el complementen (no s'ha unificat: decisió no presa).
