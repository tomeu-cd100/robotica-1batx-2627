# 2026-07-09 · Auditoria d'usabilitat de tot el material

## Mètode
Revisió amb els ulls dels **dos usuaris reals**: el docent que prepara/imparteix classe i l'alumne de 16-17 anys que treballa amb la fitxa. S'ha analitzat: capa d'entrada (README, GUIA_INICI, LLEGEIX-ME, Índex general), kits de SA (guia, fitxa base/ampliada, checklists, esquemes), material transversal (targetes, glossari, avaluació per alumnat, quadern), Reptes i Avaluació. Comprovacions creuades automatitzades: enllaços `.md` relatius de tot el repo, rutes velles, coherència de durades (programació ↔ guies), pesos d'avaluació i mides de documents.

## El que funciona bé (no tocar)
- **Kit de SA homogeni**: mateixa estructura i mateix ordre pedagògic a les 10 SA; qui n'aprèn una, les sap totes.
- **Coherència de dades**: durades programació↔guies **idèntiques a les 9 SA**; pesos 45/25/20/10 consistents a tots els documents; **0 enllaços `.md` trencats** a tot el repo.
- **Materials d'alumnat ben escrits**: parlen de «tu», caixa «🎯 Objectius i avaluació», «versió nucli» explícita (baixa l'ansietat), semàfors, DEPURA i targetes de rescat referenciades al punt d'ús; sigles enllaçades a «Com s'avalua».
- **Reptes** amb format exemplar: client/lliurable/món real + requisit mínim + ampliacions graduades.
- **Targetes de rescat** organitzades per SA (bona trobabilitat); mides raonables (fitxa base ~680 paraules, checklist ~280).
- **Capa d'entrada per públic** ja existent (guia d'inici docent, guia d'avaluació per a l'alumnat, vistes docent/alumnat al web).

## Problemes trobats (per gravetat)

### 🔴 A · `GUIA_INICI_DOCENT.md` desactualitzada (el document d'entrada núm. 1)
1. **5 rutes velles** al «Mapa ràpid» i a la checklist: `Classes/00_Banc_objectes_disseny.md`, `00_Plantilla_disseny_objecte.md`, `00_Mapa_SA_objectes.md`, `00_Galeria_exemples_objectes.md`, `00_Poster_aula_metode_DEPURA_rols.md` — tots viuen a `Classes/00_General/` des del 2026-06-30.
2. **No menciona el web** (només rutes de repo): per a un docent nou, el web amb vistes és ara la interfície principal.
3. **No recull el material posterior**: checklists docent/alumnat, quadern tècnic (diu «obre el quadern tècnic» sense enllaçar la guia nova), tasca de Classroom del quadern.
4. La **checklist de la primera setmana** hauria d'incloure: crear la tasca del quadern a Classroom i repartir «Com s'avalua la matèria».

### 🔴 B · `00_LLEGEIX-ME_Classes.md` desactualitzat (la guia general d'aula)
1. «Esquemes… *(SA2 i SA3)*» — **fals**: n'hi ha de SA1 a SA8.
2. La llista «Cada SA conté» **no inclou els checklists** ni remet al quadern tècnic.
3. Codi de SA1 llista 2 de 4 sketches.
4. «Possibles ampliacions futures» **ja fetes** (PDF del material ✓ via web; bateria de proves per trimestre ✓ a `Avaluació/`) — confon sobre l'estat real.

### 🟠 C · Rutes velles textuals en 5 fitxers (8 mencions)
`GUIA_INICI` (3), `SA9_guia_docent` (1), `07_Rubriques` (2), `Reptes/README` (2): mencions en backticks a `Classes/00_*` que ja és `Classes/00_General/00_*`. No són enllaços clicables trencats, però desorienten qui hi va a buscar el fitxer.

### 🟠 D · Redundància estructural amb risc de desincronització
El contingut de cada SA es llista a **5 llocs**: taula del README de SA · llista generada del web · checklist docent · LLEGEIX-ME · guia docent. El LLEGEIX-ME **ja ha divergit** (símptoma real, no risc teòric). Recomanació: reduir el LLEGEIX-ME a **guia de conceptes** (què és cada tipus de document) i deixar l'inventari concret als README de SA (font única).

### 🟡 E · Menors
- **4 portes d'entrada docent** amb solapament parcial (GUIA_INICI · docent.html · LLEGEIX-ME · Índex general): cadascuna té rol, però convé que la primera línia de cadascuna digui el rol i l'ordre de lectura (parcialment ja hi és).
- **Nom de la dimensió del 25 %** dit de 3 maneres: «Pràctiques i quadern tècnic» (doc 06), «Quadern tècnic i pràctiques» (guia alumnat), «Quadern i pràctiques» (fitxes). Unificar per cercabilitat.
- La fitxa base es presenta com a «nucli d'una cara» però ~680 paraules amb taules probablement ocupen 2 cares al PDF real: ajustar l'expectativa («full de treball») o comprovar el PDF.
- Sinònims del quadern: quadern tècnic / *logbook* / diari de bord / diari de treball — acceptable, però convé fixar «quadern tècnic» com a terme principal a tot arreu (la resta, entre parèntesis un sol cop).

## Recomanacions prioritzades
1. **Actualitzar `GUIA_INICI_DOCENT.md`** (rutes + web/vistes + checklist setmana 1 amb quadern/Classroom). Impacte alt, esforç baix.
2. **Refer `00_LLEGEIX-ME_Classes.md`**: corregir la nota d'esquemes, afegir checklists/quadern, treure «futures» ja fetes; idealment convertir-lo en guia de conceptes sense inventaris duplicats.
3. **Corregir les 8 mencions** amb ruta vella (SA9 guia, Rubriques, Reptes/README).
4. **Unificar el nom** de la dimensió del 25 %.
5. *(Opcional)* Nota de rol a la capçalera de cada porta d'entrada docent.

## Correccions aplicades (mateix dia)
- **A · GUIA_INICI_DOCENT**: rutes corregides a `00_General/`; avís del **web amb vistes docent/alumnat** al capdamunt del mapa; files noves (checklists per SA, quadern tècnic + tasca Classroom); checklist de la 1a setmana ampliada (guia «Com s'avalua», tasca del quadern a Classroom, enllaçar el web al Classroom); enllaç del quadern a «La primera sessió».
- **B · 00_LLEGEIX-ME_Classes**: llista «Cada SA conté» amb **checklists** i esquemes corregits *(SA1–SA8)*; remissió al quadern tècnic; codi SA1 complet (4 sketches); «Possibles ampliacions futures» substituït per **«Estat i formats»** (web+PDF, proves T1-T3, solucionaris — tot ja existent).
- **C · 8 mencions amb ruta vella** corregides a `SA9_guia_docent`, `07_Rubriques` (×2), `Reptes/README` (×2) i `GUIA_INICI` (×3).
- **E · Nom del 25 % unificat** a **«Quadern tècnic i pràctiques»** a 24 fitxers (doc 06, full de qualificació, 9 fitxes, 8 checklists docent, tasca Classroom, guies del quadern).
- **Verificat**: 0 rutes velles · 0 variants del nom antic · 0 enllaços `.md` trencats a tot el repo · build del web net.

## Conclusió
El material **és clar en el nivell que més importa** (documents d'aula: fitxes, guies, reptes, checklists) i les dades són coherents entre capes. El problema d'usabilitat real és **de manteniment de la capa d'orientació**: els documents que diuen «on és cada cosa» (guia d'inici, LLEGEIX-ME) han quedat enrere respecte de l'evolució del material (reestructuració 00_General, web amb vistes, checklists, quadern). És exactament el tipus de document que més llegeix qui arriba de nou — i per això és la prioritat.
