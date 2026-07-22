# Backup i restore del curs de Google Classroom

**Data:** 2026-07-22 · **Estat:** aprovat

## Context

El docent va detectar que el curs de Classroom semblava haver desaparegut (fals positiu:
era un problema de vista/sessió al navegador, el curs seguia `ACTIVE` via API). Arran
d'això, es vol una forma de recuperar el contingut del curs si mai desapareix de veritat
(esborrat accidental, problema de compte, etc.), complementària a la còpia nativa de
Classroom (menú ⋮ > "Fes una còpia") que el docent ja fa servir puntualment.

## Objectiu

Poder recrear l'estructura completa del curs (temes, tasques, materials, anuncis) a partir
d'un fitxer de backup local, sense dependre que el curs original existeixi.

## Fora d'abast

L'API de Google Classroom no permet llegir ni reinjectar dades pròpies de l'alumnat:
- Llista d'alumnes / matriculacions.
- Notes i entregues (`studentSubmissions`).
- Comentaris privats o de classe.

El backup/restore cobreix únicament **contingut del curs** creat pel docent.

## Disseny

### `backup_classroom.js`

- Reutilitza `getAuthClient()` de `_form_sa_lib.js` (els àmbits OAuth actuals ja cobreixen
  `classroom.courses`, `classroom.coursework.students`, `classroom.courseworkmaterials`,
  `classroom.announcements`, `classroom.topics` — no cal reautoritzar).
- Llegeix via API, per al `COURSE_ID` de `config.js`:
  - `courses.get` (nom, secció, descripció, `alternateLink`).
  - `topics.list`.
  - `courseWork.list`.
  - `courseWorkMaterials.list`.
  - `announcements.list`.
- Desa tot en un únic JSON autocontingut a
  `Material Classroom/backups/backup_<COURSE_ID>_<AAAAMMDD-HHMM>.json`, amb:
  - Metadades del curs.
  - Array de temes (id vell + nom).
  - Array de `courseWork` (títol, descripció, estat, punts, `topicId` vell, materials
    adjunts, dates de lliurament si n'hi ha).
  - Array de `courseWorkMaterials` (mateix format sense punts).
  - Array d'`announcements` (text, estat, materials).
- Execució manual: `node backup_classroom.js`. Sense programació/cron.
- Els JSON de backup es poden versionar a git (no contenen secrets ni dades d'alumnat).

### `restaurar_classroom.js <fitxer_backup.json>`

- Argument obligatori: ruta al JSON de backup a restaurar.
- Sempre crea un **curs nou** amb `courses.create`
  (nom: `<nom original> (còpia AAAA-MM-DD)`), mai reutilitza ni sobreescriu un curs existent.
- Pas 1: recrea els temes amb `topics.create`, construint un mapa `topicId vell → nou`.
- Pas 2: recrea `courseWork` i `courseWorkMaterials` amb `topicId` remapejat als nous temes.
  - **Tot es crea en estat `DRAFT`**, independentment de l'estat original — evita
    notificacions a alumnat en un curs que encara s'està revisant.
  - Els materials adjunts (`driveFile`, `link`, `youtubeVideo`, `form`) es referencien
    **amb el mateix id/URL original**: no es dupliquen fitxers de Drive, ja que el
    contingut de Drive no es perd encara que el curs de Classroom desaparegui.
- Pas 3: recrea `announcements` en `DRAFT`.
- En acabar, imprimeix per consola l'id i l'`alternateLink` del curs nou creat.

## Gestió d'errors

- Si `courses.create` falla (p. ex. límit de cursos), abortar abans de crear cap
  tema/tasca — no deixar un curs a mitges.
- Reutilitzar el patró `ambReintents()` ja existent a `_form_sa_lib.js` per a les crides
  d'API (reintents davant errors transitoris de quota/xarxa).
- Si un material referencia un `driveFile.id` que ja no existeix, avisar per consola i
  continuar amb la resta (no bloquejar tot el restore per un adjunt orfe).

## Testing

- Sense entorn de test automatitzat per als scripts de Classroom (depenen de l'API real).
- Verificació manual: executar `backup_classroom.js` sobre el curs actual, inspeccionar el
  JSON generat, executar `restaurar_classroom.js` sobre aquest JSON i comprovar manualment
  al navegador que el curs nou té els mateixos temes/tasques/materials en `DRAFT`.
- Esborrar el curs de prova un cop verificat, per no deixar bruit al Classroom del docent.
