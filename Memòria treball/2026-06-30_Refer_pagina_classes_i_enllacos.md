# 2026-06-30 · Refer la pàgina de Classes + revisió profunda d'enllaços

## Objectiu
La pàgina de Classes era un embolic (8 fitxers transversals solts barrejats amb les SA) i molts `.md` es mencionaven en *backticks* sense ser enllaços clicables. Calia: subpàgines netes per cada SA (0→9) i que **cada `.md` tingui el seu enllaç**.

## Decisions (acordades amb el docent)
- **Material transversal** agrupat a `Classes/00_General/` (no repartit per SA).
- **SA0** com a subpàgina pròpia dins un bloc *Preàmbul* (sense color de trimestre).
- **Enllaços**: convertir totes les mencions de fitxers a enllaços reals, amb el criteri **"només si el destí existeix de debò"** (placeholders i identificadors de codi intactes).

## Què s'ha fet
- **Reestructuració de fonts** (`git mv`, preservant històric):
  - 8 fitxers `00_*` → `Classes/00_General/` + nova portada `00_General/README.md` ("Material transversal del curs") amb enllaç als 8.
  - Nova portada `Classes/Solucionari/README.md` (el grup no en tenia).
  - `Classes/README.md` reescrit: fora la taula SA1–SA9 duplicada i la llista en *backticks*; enllaços reals al material transversal, solucionari i programació.
- **Generador** `web/_generador/generar.py`:
  - `GROUP_LABELS` (slug→nom) per anomenar bé grups que no són SA; `group_sort_key` posa el transversal **primer**; `section_index_extra` el renderitza en bloc propi al capdamunt.
  - `subindex_extra`: etiqueta "Materials d'aquest apartat" quan el grup no és una SA.
- **Revisió profunda d'enllaços**: script de transformació (un sol cop) que ha creat **248 enllaços** markdown a `Classes/`. Resol la ruta des de la ubicació del `.md` (germà, `codi/`, arrel de Classes, arrel del repo, patró `SAx_*`), codifica espais com `%20`, salta blocs de codi ```` ``` ```` i el que ja és enllaç.

## Resultat
- Sidebar de Classes: *Presentació · Material transversal del curs · SA0 (Preàmbul) · SA1–SA9 (per trimestre) · Solucionari*. Sense els 8 enllaços solts.
- Índex de Classes: *Material transversal → Preàmbul → Situacions d'aprenentatge → Solucionari*.
- Web regenerat: **117 pàgines doc · 17 codi · 33 simulació**.
- Verificat: **11.555 enllaços relatius comprovats → 0 trencats** (3 falsos positius de cadenes JS al visor). 0 `.md` locals trencats i 0 fallbacks a GitHub dins Classes.

## Pendents / passos següents
- Per regenerar després de canvis al material: `py web/_generador/generar.py`.
