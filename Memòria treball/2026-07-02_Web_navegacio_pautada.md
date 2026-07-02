# 2026-07-02 · Web: regeneració amb navegació pautada

## Objectiu

Regenerar el web després de la ronda P1-P10 i, a petició del docent, fer la **navegació més clara i pautada**. Tots els canvis són al generador (`web/_generador/generar.py`) i al CSS (`web/assets/css/estil.css`): es regeneren sempre, no s'ha tocat cap HTML a mà.

## Novetats de navegació

1. **Portada — «Per on començo?»:** 3 rutes guiades per situació (*agafo la matèria per primer cop* → guia d'inici + metodologia + calendari · *preparo la classe de la setmana* → SA + fitxa + codi + transversal · *he d'avaluar* → rúbriques + proves + full). URL resoltes dinàmicament des del nom del fitxer font (no es trenquen si es reanomena).
2. **Portada — targetes de SA** apunten ara al **material d'aula** (Classes/SAx), no a la programació: és el centre operatiu del docent. El bloc de SA va abans que el d'apartats.
3. **Caixa «📋 Com s'usa aquesta secció»** a l'índex de cada secció (camp `pauta` a `SECTIONS`): 2-3 passos numerats amb l'ordre de treball recomanat.
4. **Fil transversal de cada SA:** a totes les pàgines d'una SA (doc i codi), barra de pastilles «Tot sobre la SAx» que enllaça 📘 Programació · 🧑‍🏫 Guia i fitxes · 💻 Codi · 🎯 Reptes · 🔑 Solucionari · 📝 Prova (SA3/6/9). La ubicació actual surt marcada.
5. **Paginador d'itinerari** (‹ anterior · següent › amb «SA3 · 3/6»): seqüències per a la programació didàctica (22 docs), cada SA de Classes (presentació → guia → fitxes → esquemes → codi) i els reptes (SA1→SA8).
6. **Molla de pa amb nivell de SA:** Inici / Classes / **SA3 · Entrades i sensors** / Fitxa.

Els elements nous (`.pauta-box`, `.ruta-card`, `.sa-fil`, `.pager`) queden **exclosos de la impressió/PDF**.

## Regeneració

- `py web/_generador/generar.py` → 120 pàgines de document · 17 de codi · 33 de simulació · 171 entrades de cerca.
- `py web/_generador/generar_pdf.py` → **36 PDF regenerats** (recullen els canvis P3/P5/P6/P10 a fitxes i proves).

## Pendent

- **Commit i push** del conjunt (ronda P1-P10 + web): el fa el docent o es demana explícitament. Recordatori: no fer `git add -A` (l'usuari pot tenir feina en paral·lel).
