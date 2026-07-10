# SA1 · Millores pedagògiques, imatges i navegació web — Disseny

**Data:** 2026-07-10 · **Estat:** aprovat, pendent d'implementar
**Abast:** SA1 (contingut + imatges) i generador del web (navegació global)

## Objectiu

Millorar la SA1 en tres eixos: (1) afegir imatges/diagrames sense duplicar
informació, (2) petites millores pedagògiques de contingut, i (3) millorar la
navegació del web (canvis al generador → beneficien tot el web).

Principi rector (memòria del projecte): **font única, zero duplicació**. Cada
imatge i cada tros de contingut viu en un sol document; la resta hi enllaça.

---

## Bloc A · Imatges i diagrames de la SA1

Nova carpeta `Classes/SA1/img/` amb 4 SVG propis + 1 foto lliure.

| Fitxer | Document amfitrió (font única) | Substitueix |
|---|---|---|
| `sa1-model-eps.svg` | `SA1_fitxa_alumnat.md` (Activitat 1) | res (ara només text) |
| `sa1-placa-uno-etiquetada.svg` | `SA1_esquemes_connexions.md` §1.1 | ASCII etiquetat |
| `sa1-placa-uno-muda.svg` | `SA1_esquemes_connexions.md` §1.2 | ASCII mut |
| `sa1-circuit-blink.svg` | `SA1_esquemes_connexions.md` §2.2 | ASCII d'una línia |
| `arduino-uno-foto.jpg` | `SA1_esquemes_connexions.md` §1 (costat SVG) | res |

### Decisions de disseny

- **ASCII → SVG:** els diagrames ASCII de `SA1_esquemes_connexions.md` es
  **substitueixen** per SVG (una sola font, es veu bé a web, GitHub i imprès).
  El text explicatiu (llegenda, taules de parts) es manté.
- **SVG esquemàtics, no fotorealistes:** fets a mà, suficients per etiquetar i
  entendre. El pinout s'ha de verificar contra el pinout oficial d'Arduino UNO
  (13 pins digitals amb PWM a 3/5/6/9/10/11, A0–A5, alimentació).
- **SVG muts imprimibles:** la versió muda (§1.2) manté requadres buits per
  escriure a mà; ha de quedar net en blanc i negre per fotocopiar.
- **Foto Wikimedia Commons:** llicència CC amb **atribució visible** al peu de
  figura (autor + llicència + enllaç). Descarregar a `Classes/SA1/img/`.
- **Accessibilitat:** cada `<img>` amb `alt` descriptiu; els SVG amb `<title>`.
- **Referències als diagrames:** la fitxa d'alumnat (Act. 2) i la guia docent ja
  apunten a `SA1_esquemes_connexions.md`; aquests enllaços es mantenen (no es
  dupliquen les imatges a la fitxa).

### Com es publica al web

El generador (`web/_generador/generar.py`) ja copia imatges a `assets/img/` i
reescriu enllaços relatius (`generar.py:465-468`, `copy_image`). En Markdown les
imatges s'inclouen amb `![alt](img/nom.svg)`. No cal tocar el generador per a
aquest bloc; només verificar que `.svg` és a `IMG_EXT` (ho és, `generar.py:72`).

---

## Bloc B · Millores pedagògiques de contingut

Canvis petits i quirúrgics, sense reescriure documents.

1. **PRIMM complet a la fitxa d'alumnat** (`SA1_fitxa_alumnat.md`, Activitat 4):
   ara salta de «PREDIU» a «Investiga». Afegir el pas explícit
   **EXECUTA i compara amb la predicció** (moment clau del mètode PRIMM, ja
   descrit a la guia docent S3). Mantenir l'estil d'una cara.

2. **README de SA1** (`Classes/SA1/README.md`): la taula de contingut **no
   llista** `SA1_questionari_conceptes.md` (orfe; només apareix al sidebar web).
   Afegir-hi una fila. *(Es fa dins del Bloc C.2 en reordenar la portada.)*

3. **Guia docent** (`SA1_guia_docent.md:152`): «diagrames ASCII» →
   «diagrames i imatges» (coherència amb el Bloc A).

4. **Wokwi incrustat al web:** el generador incrusta els enllaços
   `wokwi.com/projects/<id>` com a iframe a les pàgines web, perquè l'alumnat
   executi la simulació sense sortir de la pàgina (útil al Chromebook). Al `.md`
   i a GitHub queda l'enllaç de text normal. Detall al Bloc C (canvi de
   generador).

---

## Bloc C · Navegació web (canvis al generador)

Tots aquests canvis són a `web/_generador/generar.py` i s'apliquen a **tot el
web** en regenerar (`py web/_generador/generar.py`).

### C.1 · Anterior / Següent per SA

Peu de pàgina dins de cada SA amb `← anterior · següent →` seguint l'**ordre de
treball** de la SA (no ordre alfabètic). Ordre canònic per SA:
`índex → guia docent → fitxa base → prova/diagnòstic → normes → esquemes →
pòster/producte → checklist alumnat → checklist docent → qüestionari → codi`.

- L'ordre es deriva d'una llista canònica de sufixos de fitxer (ja hi ha
  convenció de noms `saN-*`).
- Els extrems no tenen enllaç (primera pàgina sense «anterior», última sense
  «següent»).
- Respecta la vista: en vista alumnat, les pàgines `nomes-docent` se salten de
  la cadena (o s'hi mantenen però amagades per CSS — decidir a la implementació,
  preferència: **saltar-les** perquè l'alumnat no aterri en una pàgina amagada).

### C.2 · Portada de SA com a itinerari

La portada (`README.md` de cada SA) es reordena: primer un **itinerari per
sessions** («Sessió 1: fes X amb Y»), i la taula tècnica de fitxers a sota.

- **Font única:** el mateix `README.md` serveix GitHub i web. La secció
  «Seqüència ràpida» de SA1 ja és gairebé això; s'amplia i es puja a dalt.
- **Pilot a SA1.** Si el resultat convenç, es replica a la resta de SA en una
  tasca posterior (fora d'aquest abast, però el patró queda establert).
- La taula tècnica completa pot quedar sota un encapçalament «Tots els
  documents» o marcar-se com a orientada al docent.

### C.3 · Sidebar compacte (SA actual + veïnes)

El lateral mostra **expandida només la SA actual** (totes les seves pàgines).
Les altres SA es redueixen a un sol enllaç a la seva portada (sense `<details>`
desplegable amb totes les subpàgines).

- Redueix el pes de cada HTML (ara el sidebar repeteix totes les subpàgines de
  les 9 SA a cada pàgina).
- Es genera a `generar.py` (funció que construeix `sidebar-nav`).
- Material transversal (`00-general`) i Solucionari: mantenir el comportament
  actual (grup plegable) o també compactar — preferència: compactar igual.

### C.4 · Stepper de progrés del curs

Barra horitzontal SA0→SA9 a la capçalera de les pàgines de **Classes**, amb la
SA actual ressaltada i color per trimestre (reutilitza `data-tri` i les classes
`badge-tri` existents).

- Només a la secció `classes` (no a programació/avaluació/etc.).
- Cada pas enllaça a la portada de la SA corresponent.
- Responsiu: en pantalla estreta, es pot reduir a punts numerats.

---

## Fitxers afectats

**Contingut SA1:**
- `Classes/SA1/img/*` (nous: 4 SVG + 1 JPG)
- `Classes/SA1/SA1_esquemes_connexions.md` (ASCII → imatges)
- `Classes/SA1/SA1_fitxa_alumnat.md` (PRIMM + imatge model E-P-S)
- `Classes/SA1/SA1_guia_docent.md` (ASCII → imatges)
- `Classes/SA1/README.md` (portada-itinerari + fila qüestionari)

**Generador (global):**
- `web/_generador/generar.py` (anterior/següent, sidebar compacte, stepper,
  Wokwi iframe)
- `web/assets/css/estil.css` (estils del peu de nav, stepper, sidebar compacte)

**Regeneració:** `py web/_generador/generar.py` després de cada canvi de
generador o de contingut.

## Criteris d'èxit

- [ ] SA1 mostra imatges nítides a web, GitHub i imprès; cap ASCII redundant.
- [ ] Cap informació duplicada: cada imatge/text en un sol document.
- [ ] Foto amb atribució CC visible.
- [ ] Fitxa d'alumnat amb PRIMM complet (predir → executar → investigar →
      modificar → crear).
- [ ] Peu anterior/següent funcional a totes les pàgines de SA.
- [ ] Portada de SA1 llegible com a itinerari.
- [ ] Sidebar compacte: només SA actual expandida.
- [ ] Stepper visible a Classes amb SA actual ressaltada.
- [ ] `py web/_generador/generar.py` corre sense errors; web es regenera.

## Fora d'abast

- Replicar la portada-itinerari a SA0, SA2–SA9 (tasca posterior).
- Imatges per a altres SA.
- Refactor gran del generador més enllà dels 4 canvis descrits.
