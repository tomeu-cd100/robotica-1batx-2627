# 2026-08-01 · Revisió pedagògica profunda dels katas (i decisions resultants)

## Què es va revisar

Quatre revisions independents sobre el material de katas acabat d'estrenar:
pressupost de temps i acumulació de rutines · flux intern de la pàgina de
pràctica vs PRIMM i retirada de bastida · escrivibilitat real dels 31 katas
en 10 minuts · coherència transversal de tots els textos.

## Incoherències de fons trobades

1. **El kata arribava després que el docent modelés el mateix codi** (mateixos
   pins i temps): mesurava memòria a 10 minuts vista, no construcció; i el
   «🔮 prediu» de l'EXPLICACIO preguntava el que l'alumne acabava d'escriure.
2. **El pressupost de temps no quadrava**: 6 sessions amb 2 sketches tenien
   2 ganxos de kata (~20'); el mini-check queia sempre el mateix dia que un
   kata (20'+ d'escriptura individual el dia més carregat); i a SA2/SA4 el
   mini-check se sumava a l'activació en lloc de substituir-la.
3. Katas concrets fora de mida o amb requisits mai ensenyats (`try/except` a
   SA8), i textos desfasats pel canvi a vista alumnat.

## Decisions (política nova, escrita a 04_Metodologia.md §4.2 bis)

- **El kata segueix els trams de retirada de bastida**:
  - **SA2–SA3**: *rèplica* del que s'ha modelat (fixar sintaxi i estructura).
  - **SA4–SA6**: *variació* — l'enunciat demana el mateix patró amb valors
    expressament diferents dels del sketch; en comparar es mira l'estructura,
    no els números (transferència, no record).
  - **SA7–SA8**: el kata es fa *abans* del modelatge (enunciat de comportament
    autosuficient); el modelatge del docent tanca després.
- **Un kata per sessió** (el del sketch nuclear del modelatge). Els sketches
  secundaris duen ganxo *condicional* («si avui encara no has fet cap kata…»).
- **El dia de mini-check, el mini-check substitueix graella d'activació i
  kata** (mateix múscul: escriptura individual de 10'). Les 7 guies docents
  ara ho apliquen al bloc de sessió (patró únic; abans SA2/SA4 sumaven).
- El «🔮 prediu» de SA2–SA3 es reenfoca a la part **no coberta** pel kata.

## Ajustos de contingut

- SA8 `02_telemetria_receptor`: esquelet `try/except` donat (mai ensenyat al
  curs); s'escriu només `split`/`int`/decisió.
- SA8 `03_ia_gestos`: es demanen 4 regles + defecte (el sketch en té 7).
- SA3 `04_alarma_aparcament`: `map()` donat; s'escriu l'estructura de branques.
- SA2 `02b_semafor_switch`: constants ja declarades (no es reescriuen).
- SA2 `05_panell`: groc càlid (255,180,0) explícit, amb el perquè vs (255,255,0).
- 13 variacions SA4–SA6 (valors canviats kata a kata, taula al commit `25cb2c7`).

## Commits

`aba5e7a` (política i textos marc) · `25cb2c7` (katas per trams) ·
`d3e1438` (un kata per sessió, prediu) · `b746671` (residus de la verificació
creuada: guies SA5/SA7/SA8, ganxo condicional del control proporcional).

## Verificació

`tools/qa.py` net i 55 tests del generador verds després de cada paquet;
verificació creuada final independent sobre el diff combinat.
