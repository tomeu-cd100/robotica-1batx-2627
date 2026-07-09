# 2026-07-09 · Implementació — Vistes Docent/Alumnat al web

> Executa el pla `2026-07-09_Pla_implementacio_web_vistes.md` (disseny: `2026-07-09_Disseny_millores_web_usabilitat.md`). Branca `web-vistes-usabilitat`.

## Objectiu
Fer el web navegable per als dos públics: un **commutador Docent/Alumnat** que filtra tot el web, una **portada per vista**, un bloc **"Comença aquí"** per SA i uns **quick wins** de navegació.

## Què s'ha fet (per tasques, 9 commits)
1. **Model `data-public`**: cada pàgina i grup de codi es classifica en `docent`/`alumnat` per regla automàtica (secció, carpeta `Solucionari`, `00-general` cas per cas, patró de nom `_guia_docent`/`_checklist_docent`). Sense tocar cap `.md` del curs.
2. **Commutador de vista**: botó al capçal (🎓 Alumnat ⇄ 👩‍🏫 Docent), `data-vista` a `<html>` aplicat pel script inline (com el tema), persistent a `localStorage`. Per defecte **Alumnat**. Filtre via CSS `.nomes-docent`. Banner "material per al docent" en obrir una pàgina docent en vista alumnat.
3. **Filtre de navegació**: sidebar, fil "Tot sobre la SAx" i menú superior amaguen el material docent en vista alumnat (topnav alumnat = Inici · Les 9 SA · Reptes · Simulacions).
4. **Paginador per vista**: dues seqüències (completa i només-alumnat); en vista alumnat el "Anterior/Següent" salta el material docent i recompta (p. ex. SA3 3/8 → 2/6).
5. **Cerca filtrada**: cada entrada de l'índex porta el públic; en vista alumnat no retorna pàgines docents.
6. **Portada per vista**: bloc alumnat net ("Què vols fer?" + 9 SA) i bloc docent complet; s'elimina la triplicació de punts d'entrada.
7. **"Comença aquí" per SA**: bloc destacat amb l'essencial per vista (alumnat: fitxa + codi; docent: guia + fitxa). Llista completa amb targetes docents filtrades.
8. **Quick wins**: sidebar en ordre pedagògic (abans alfabètic), etiquetes curtes, i noms de fitxer `.md` substituïts pel títol als enllaços de text.

## Verificació (navegador + auditoria)
- Commutador alterna i persisteix; banner docent apareix/desapareix segons vista. ✓
- Vista alumnat: topnav reduït; sidebar/fil/paginador de SA3 sense guia ni checklist docent; portada neta. ✓
- **Cerca**: "solucionari"/"guia docent" no retornen material docent en vista alumnat. ✓
- **Bugs trobats i corregits a la verificació**: els solucionaris de `Classes/Solucionari/` i la `GUIA_INICI_DOCENT.md` es classificaven com a alumnat → corregits a docent.
- Auditoria de classificació: 121 alumnat / 79 docent; `00-general` coincideix amb l'spec; única "prova/docent" visible a alumnat = prova diagnòstica SA1 (intencional).

## Decisions durant l'execució
- **Duplicació a l'índex de SA** (taula del README vs llista generada): el docent va decidir **deixar la taula del README com ara**; el filtre actua a sidebar/fil/paginador/cerca i a la llista generada ("Comença aquí" + "Tot el material de la SA").

## Fitxers tocats
`web/_generador/generar.py`, `web/assets/css/estil.css`, `web/assets/js/lloc.js`. Cap dependència nova; web estàtic i reproduïble.

## Pendents
- **Publicar**: fusió a `main` + push (pendent de vistiplau del docent).
- Opcional futur: resoldre la duplicació de la taula del README si es vol (ara descartat).
