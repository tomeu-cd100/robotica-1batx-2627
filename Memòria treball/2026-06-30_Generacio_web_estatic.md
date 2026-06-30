# 2026-06-30 · Generació del web estàtic (carpeta `web/`)

## Objectiu
Crear un lloc web interconnectat amb **tot el material** de la matèria, amb coherència visual: **cada apartat un color** i **cada trimestre un color**. Disseny modern i net.

## Decisions (acordades amb el docent)
- **Tecnologia**: HTML estàtic **pre-generat** amb un script Python (zero dependències per veure'l).
- **Allotjament**: GitHub Pages + funcionament en local (enllaços relatius arreu).
- **Abast**: tot el material **excepte** `Memòria treball/`.
- **Públic**: docent + altre professorat (to tècnic, ho mostra tot).
- **Extres**: tema clar/fosc amb commutador, cercador client, pàgina de codi per SA amb botó *copiar*.

## Què s'ha fet
- **Generador** `web/_generador/generar.py`: converteix els `.md` a HTML (markdown + pygments), reescriu **tots** els enllaços interns (`.md`→`.html`, README→index, codi→pàgina de codi amb àncora, imatges→`assets/img`), genera TOC, distintius de trimestre, índexs de secció amb targetes, pàgines de codi per SA i l'índex de cerca.
- **Disseny** `web/assets/css/estil.css`: sistema de color doble (`[data-section]` per apartat, `[data-tri]` per trimestre), tema clar/fosc, layout de 3 columnes (sidebar · contingut · TOC), responsiu amb menú lateral mòbil.
- **Interacció** `web/assets/js/lloc.js`: commutador de tema (persistent), menú mòbil, botons de copiar codi, cercador amb teclat. Índex carregat via `cerca-index.js` (funciona també en `file://`).
- **Publicació**: `.github/workflows/pages.yml` (puja `web/` a Pages a cada push a `main`) + `.nojekyll`.
- **Galeria**: les 3 fotos de kits de `Recursos/` s'incrusten a l'índex de Recursos.

## Resultat
- 113 pàgines de document + 17 de codi = **131 pàgines HTML**, 3 imatges, 131 entrades de cerca.
- Verificat: cap enllaç `.md` sense reescriure; camins relatius correctes per profunditat.

## Paleta
- Apartats: Programació indi · Classes cian · Reptes ambre · Avaluació gerani · Normativa pissarra · Recursos maragda.
- Trimestres: 1r blau · 2n violeta · 3r magenta.

## Millora: reorganització de la navegació (mateix dia)
L'apartat Classes (~80 pàgines) sortia en llista plana i cada índex de SA mostrava tot Classes. Reorganitzat amb **drill-down jeràrquic genèric**:
- **Índex de secció**: SA agrupades per trimestre (una targeta per SA amb recompte de materials), més blocs separats de *Preàmbul* (SA0), *Documents i recursos* i *Solucionari*.
- **Índex de cada SA**: mostra només els materials d'aquella SA (guia, fitxes, esquemes, codi…), ordenats per tipus.
- **Menú lateral**: grups plegables `<details>` per SA (la SA actual oberta), amb SA0 primer i Solucionari al final.
- SA0 reconeguda com a preàmbul transversal (color neutre, sense trimestre).
- La lògica és genèrica: també millora Programació (SA per trimestre) i Reptes.

## Pendents / passos següents
- Activar GitHub Pages (Settings → Pages → Source: **GitHub Actions**) per publicar.
- Fer *commit* dels fitxers nous (encara no s'ha fet).
- Per regenerar després de canvis al material: `py web/_generador/generar.py`.
