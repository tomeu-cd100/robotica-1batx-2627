# 2026-07-09 · Disseny — Millores d'usabilitat del web (vistes Docent/Alumnat)

> **Estat:** especificació de disseny aprovada (pendent d'implementar). Document de treball, no material del curs.

## Problema

El web (150+ pàgines, generat amb `web/_generador/generar.py`) té molta infraestructura de navegació, però **el docent i l'alumnat s'hi perden**. Diagnòstic (codi + navegació real):

1. **Barreja de públics**: dins de cada SA, material docent i d'alumnat conviuen sense distinció (el sidebar, el fil "Tot sobre la SAx" i el paginador ofereixen a l'alumne la guia docent, el checklist docent i fins i tot el **solucionari**).
2. **Tres ordres diferents** del mateix material: sidebar (alfabètic) vs taula del cos i paginador (pedagògic).
3. **Jerga tècnica exposada**: noms de fitxer `.md` en brut a les taules "Contingut" i als enllaços "Vols més?"; sigles sense explicar.
4. **Sobrecàrrega de punts d'entrada** a la portada (hero 3 botons + 4 rutes + hubs del menú).
5. **Volum per SA sense jerarquia**: 8–11 documents per SA, tots amb el mateix pes.
6. **Etiquetes del sidebar llargues** (títol + subtítol poètic ocupen 3 línies).

## Decisions (acordades amb el docent)

- **Commutador de vista** amb 2 estats, **Alumnat per defecte**; es recorda a `localStorage`.
- **Filtre ampli**: en vista Alumnat s'amaguen també les **seccions senceres** de docent.
- **Portada i commutador independents**: la portada és l'**excepció** que mai amaga res (xarxa de seguretat del docent); la resta del web sí filtra.
- **Normes de seguretat** i **prova diagnòstica** (SA1) → **visibles a l'alumnat**.

## Abast (què inclou i què no)

**Inclou:** (a) commutador de vista amb filtre; (b) portada replantejada per vista; (c) bloc "Comença aquí" per SA; (d) 3 quick wins de suport (ordre únic, etiquetes curtes, fora noms `.md`). Tot dins de `web/_generador/generar.py` + `assets/css/estil.css` + `assets/js/lloc.js`.

**No inclou:** canvis al contingut dels `.md` del curs; canvis al sistema de PDF; nous continguts pedagògics.

---

## 1 · Model de dades: `data-public`

Cada **pàgina** i cada **enllaç de navegació** rep una classe de públic:

- `alumnat` — visible sempre (material de l'alumne).
- `docent` — visible només en vista Docent.
- (No cal un tercer valor "comú": el material comú es tracta com `alumnat`, ja que l'alumnat també el veu.)

### Regla de classificació (automàtica al generador)

**Per secció sencera → `docent`:** `programacio`, `normativa`, `avaluacio`, `recursos`, i tot `reptes/solucionari/*`.

**Seccions visibles a l'alumnat:** `classes` (filtrat per fitxer, vegeu sota), `reptes` (enunciats), `simulacions`.

**Dins de `classes`, per nom de fitxer:**
- `docent`: `*_guia_docent*`, `*_checklist_docent*`.
- `alumnat`: `*_fitxa_alumnat*`, `*_fitxa_ampliada*`, `*_checklist_alumnat*`, `*_vocabulari*`, `*_guia_programacio*`, `*_esquemes*`, `*_connexions*`, `*_poster*`, `*_normes_seguretat*`, `*_prova_diagnostica*`, `*_questionari*`, `*_guia_web_editor*`, i el `codi.html` de la SA.

**`classes/00-general/` (transversal, classificació explícita):**
- `alumnat`: `00_Targetes_rescat`, `00_Glossari_tecnic`, `00_Avaluacio_per_alumnat`, `00_Fitxes_referencia_tecnica`, `00_Plantilla_disseny_objecte`, `00_Galeria_exemples_objectes`, `00_Poster_IA_us_assistents`.
- `docent` (per defecte de la carpeta): `00_Llegeix-me_classes`, `00_Mini_checks_individuals`, `00_Guia_defensa_oral`, `00_Banc_objectes_disseny`, `00_Mapa_SA_objectes`, `00_Banc_activacio_repas`, `00_Referents_tecnologia`, `00_IA_a_la_materia`, `00_Poster_aula_metode_depura_rols`.

> L'índex de `classes/00-general/` es manté visible en totes dues vistes, però les seves targetes es filtren per `data-public`.

L'assignació es fa a `discover()` afegint `public` a cada `Page` i propagant-lo a `code_groups`, `sim_groups`, i als enllaços de navegació (sidebar, fil, paginador, topnav, targetes d'índex, resultats de cerca).

## 2 · El commutador

- **Ubicació**: capçal (`.topbar-eines`), abans del botó de tema. Etiqueta commutable: `🎓 Alumnat` ⇄ `👩‍🏫 Docent` (botó amb `aria-pressed`).
- **Estat**: atribut `data-vista="alumnat|docent"` a `<html>`, aplicat pel script inline del `<head>` (com el tema, per evitar parpelleig). Per defecte `alumnat`.
- **Persistència**: `localStorage['vista']`.
- **Efecte (CSS)**: `html[data-vista="alumnat"] .nomes-docent{display:none}`. Els elements de navegació docent porten la classe `nomes-docent`.

## 3 · Filtre per component

| Component | Comportament en vista Alumnat |
|---|---|
| **Topnav** | `Inici · Les 9 SA · Reptes · Simulacions`. S'amaguen (o marquen `nomes-docent`) els accessos a Programació, Normativa, Avaluació, Recursos. Els hubs "Docent/Alumnat" actuals se substitueixen pel commutador. |
| **Sidebar** | Els `<li>` de pàgines `docent` porten `nomes-docent`. Un grup (SA) sense fills visibles s'amaga sencer. |
| **Fil "Tot sobre la SAx"** | Les pastilles docents (`📘 Programació`, `🔑 Solucionari`, `📝 Prova`) porten `nomes-docent`. |
| **Paginador** | Es recalcula: en vista alumnat, la seqüència d'una SA salta les pàgines docents (el "3/8" passa a comptar només material d'alumnat). *Implementació*: generar dues seqüències (completa i només-alumnat) i marcar cada `.pager` amb la classe de vista; CSS en mostra una. |
| **Índexs de SA (targetes)** | Targetes docents amb `nomes-docent`. |
| **Cerca** | Cada entrada de l'índex JSON porta `p` (`docent`/`alumnat`); `cerca-index.js` filtra segons `data-vista`. |
| **Portada** | **Excepció**: no s'amaga res; és el mapa complet i el lloc on el docent activa la seva vista. |

**Pàgina docent oberta en vista alumnat** (enllaç directe): banner discret a dalt del `<main>` ("📎 Material per al docent") via un bloc amb classe `avis-docent` que només es mostra si `data-vista="alumnat"` i la pàgina és `docent`. No es bloqueja l'accés.

## 4 · Portada replantejada

Una sola portada; el CSS mostra el bloc segons `data-vista`.

- **Vista Alumnat** (`.portada-alumnat`): hero curt + bloc **"Què vols fer?"** (3 targetes: *Treballar la SA de la setmana* → Les 9 SA · *Practicar a casa* → Simulacions/Reptes · *M'he encallat* → Targetes de rescat + Glossari) + graella de les 9 SA per trimestre.
- **Vista Docent** (`.portada-docent`, `nomes-docent`): l'actual "Per on començo?" (nou / setmana / avaluar) + 9 SA + graella d'apartats completa.
- S'elimina la triplicació: el hero passa a 1 CTA contextual + el commutador ja present al capçal governa la resta.

## 5 · "Comença aquí" per SA

A `subindex_extra()` (índex de cada SA), abans de la llista completa:
- Bloc destacat **"▶ Comença aquí"** amb 1–2 materials essencials, **per vista**:
  - Alumnat: *Fitxa base* → *Codi*.
  - Docent (`nomes-docent`): *Guia docent* → *Fitxa base*.
- La resta de materials queden a sota sota un títol "Tot el material de la SA".

## 6 · Quick wins de suport (mateixa tirada)

- **Ordre únic**: `sidebar_html()` deixa d'ordenar per `out_rel` alfabètic i passa a usar `doc_ordre()` (el mateix que el cos i el paginador). *(Problema 2)*
- **Etiquetes curtes al sidebar**: nova funció `short_label(page)` que retalla el títol al tram abans del primer "—"/"·" (p. ex. "SA3 · Fitxa base"). *(Problema 6)*
- **Fora noms `.md`**: a `rewrite_links()`, quan el text visible d'un enllaç coincideix amb el nom del fitxer `.md` destí, substituir-lo pel títol H1 de la pàgina destí. Afecta les taules "Contingut" i "Vols més?". *(Problema 3)*

## Arquitectura (fitxers que es toquen)

- `web/_generador/generar.py`: `discover()` (afegir `public`), `sidebar_html()`, `sa_fil_html()`, `build_sequences()`, `topnav_html()`, `section_index_extra()` / `subindex_extra()`, `render_home()`, `page_shell()` (commutador + banner + script inline), i l'índex de cerca.
- `web/assets/css/estil.css`: regles `[data-vista]`, `.nomes-docent`, commutador, portada per vista, banner docent, "Comença aquí".
- `web/assets/js/lloc.js`: lògica del commutador (toggle + `localStorage`); filtre de cerca per públic.

Cap dependència nova. El web segueix sent estàtic i reproduïble a CI.

## Verificació (com es comprova que funciona)

1. `py web/_generador/generar.py` sense errors; nre. de pàgines estable.
2. Servir en local i comprovar **en vista Alumnat**: el topnav no mostra Programació/Normativa/Avaluació/Recursos; a SA3 el sidebar/fil/paginador no mostren guia docent, checklist docent ni solucionari; la portada mostra el bloc alumnat.
3. Activar **Vista docent**: reapareix tot; recàrrega de pàgina manté la vista (localStorage).
4. Cerca en vista alumnat no retorna pàgines docents.
5. Obrir una pàgina docent directament en vista alumnat mostra el banner "material per al docent".
6. Quick wins: sidebar en ordre pedagògic; etiquetes curtes; cap nom `.md` visible a les taules.

## Pendents / passos següents

- Escriure el pla d'implementació (writing-plans) amb passos verificables.
- Implementar, regenerar el web i verificar amb la llista de dalt.
- Memòria de treball datada de la implementació + commit + sync GitHub.
