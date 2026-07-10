# «La teva ruta» — pàgina de SA neta i lineal per a l'alumnat — Disseny

**Data:** 2026-07-10 · **Estat:** aprovat, pendent d'implementar
**Abast:** README de les 9 SA + `web/_generador/generar.py` + `web/assets/css/estil.css`

## Problema

En vista alumnat, la pàgina d'una SA té massa capes redundants i cap camí
clar: la portada repeteix el mateix contingut fins a 3 cops (itinerari +
«Comença aquí» + graella «Tot el material» + barra «Tot sobre la SAx»), el
pager empeny cap a la fitxa ampliada (material *opcional*), i el sidebar
mostra 7-10 entrades planes sense distingir «ho he de fer» de «és de
consulta». Les fitxes en si són netes; el problema és la capa de navegació.

## Objectiu

Que l'alumne, a cada moment, sàpiga **què ha de fer i on anar després**, i no
vegi referències que no li calen. Principi: **si no li cal, no la hi donem**.

## Decisions preses (amb el docent)

1. **Model:** ruta lineal per passos a la portada de SA (no pàgina-guió única,
   no poda mínima).
2. **Poda vista alumnat:** s'amaguen la graella «Tot el material», la barra
   «Tot sobre la SAx», i la caixa «▶ Comença aquí»; l'ampliada i el
   qüestionari surten **del pager i del sidebar** (només accessibles des de
   «Si vols més»).
3. **Font única:** la ruta viu al README de cada SA (secció «Itinerari»),
   editable en markdown, visible també a GitHub.

## A · La ruta (contingut, README de cada SA)

Convenció fixa per a la secció d'itinerari del README:

- **Un pas per sessió**, com a llista numerada. Cada pas diu què es fa i
  enllaça **directament l'activitat de la fitxa** (àncora, p. ex.
  `SA2_fitxa_alumnat.md#2-semafor-s2`) més l'esquema o el codi **només si
  aquell pas ho necessita**. Les àncores existeixen i són estables
  (headings `### N · Títol (SN)` de les fitxes).
- **Pas final fix:** «Abans d'entregar: el meu checklist» → checklist alumnat.
- **Subsecció «Si vols més»** després de la ruta: fitxa ampliada, qüestionari
  de conceptes (si n'hi ha) i els reptes de la SA (enllaç a `Reptes/`). És
  l'únic lloc en vista alumnat on apareixen aquests materials.

S'aplica a les **9 SA**. SA0 (transversal, sense sessions) manté «Com
usar-la» i només rep la capsa «Si vols més» si escau. SA9 usa les 5 fases com
a passos (ja ho fa).

## B · Renderització (generar.py + estil.css)

- El generador detecta a les **portades de SA** (kind `index`, grup `saN`) la
  secció d'itinerari (heading que comença per «Itinerari») i l'embolcalla:
  la `<ol>` es renderitza com a **passos numerats** (targeta amb número gros
  i línia vertical de progrés, reutilitzant `--tri` per al color del
  trimestre). La subsecció «Si vols més» es renderitza com a capsa suau
  diferenciada (classe pròpia).
- **Regles de visibilitat (CSS, per `data-vista`):**
  - Vista **alumnat** amaga a la portada: graella «Tot el material»
    (`subindex_extra`), caixa «▶ Comença aquí» d'alumnat, barra `.sa-fil`.
  - Vista **docent** ho conserva tot com ara (inventari complet).
- No es toca la classificació `docent/alumnat` existent (`classify_public`):
  s'introdueix una classe CSS nova (p. ex. `nomes-ruta-docent` o
  `amagat-alumnat`) per als elements que són d'alumnat però no han de sortir
  a la seva navegació.

## C · Pager alumnat = la ruta

- Ordre alumnat per SA: **portada → fitxa base → (prova diagnòstica / normes,
  si la SA en té) → esquemes/connexions → codi → checklist alumnat**.
- **Exclosos del pager alumnat:** fitxa ampliada i qüestionari (filtre per nom
  a `build_sequences`, variant alumnat). El **pager docent no canvia**.

## D · Sidebar alumnat mínim

- Per SA, en vista alumnat: **Ruta (portada) · Fitxa base · Esquemes · Codi ·
  Checklist** (+ prova/normes on n'hi ha). Ampliada i qüestionari amagats amb
  la classe CSS nova.
- **Ordre = ordre de la ruta**: ajustar `doc_ordre` perquè sigui
  `guia → fitxa base → prova → normes → esquemes/connexions → pòster →
  checklist alumnat → codi → ampliada → qüestionari → checklist docent`
  (avui l'ampliada va enganxada a la fitxa i el checklist cau al final per
  defecte). Aquest ordre serveix també per al pager.

## Fitxers afectats

- `Classes/SA1..SA9/README.md` — ruta amb enllaços a àncores + «Si vols més».
- `Classes/SA0/README.md` — només revisió lleu (capsa «Si vols més» si escau).
- `web/_generador/generar.py` — embolcall de la ruta, filtre del pager
  alumnat, classe d'amagat al sidebar, `doc_ordre` ajustat, poda de
  `subindex_extra`/`sa_fil` per vista.
- `web/assets/css/estil.css` — estils `.ruta` (passos), capsa «Si vols més»,
  regles `html[data-vista="alumnat"] …{display:none}`.

## Criteris d'èxit

- [ ] En vista alumnat, la portada d'una SA mostra: títol + intro + **ruta
      per passos** + capsa «Si vols més» + pager. Res més.
- [ ] Cada pas enllaça l'activitat concreta de la fitxa (àncora funcional al
      web) i només els suports necessaris.
- [ ] Pager alumnat: fitxa → esquemes → codi → checklist; mai passa per
      l'ampliada ni el qüestionari.
- [ ] Sidebar alumnat per SA: ≤6 entrades, en ordre de treball.
- [ ] Vista docent: idèntica a l'actual (inventari complet).
- [ ] `py web/_generador/generar.py` corre net; verificat al navegador en
      les dues vistes (mínim SA1, SA2 i SA9).

## Fora d'abast

- Tocar el contingut de les fitxes (ja netes).
- Canvis a la vista docent.
- PDF/impressió (la ruta és navegació web; el paper segueix igual).

## Risc conegut

Àncores: el web les genera amb el seu slugificador i GitHub amb el seu — poden
divergir amb accents. Al web (cas que importa) funcionen sempre; a GitHub
l'enllaç obre el document igualment encara que no salti a l'àncora.
