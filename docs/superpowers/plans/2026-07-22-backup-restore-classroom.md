# Backup i restore del curs de Classroom Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Dos scripts Node (`backup_classroom.js` i `restaurar_classroom.js`) a `Material Classroom/` que permetin desar tot el contingut del curs de Classroom a JSON i recrear-lo en un curs nou si l'original desapareix.

**Architecture:** Reutilitzen `getAuthClient()` i `ambReintents()` de `_form_sa_lib.js` (mateix patró que la resta d'scripts del directori). El backup és de només lectura (`courses.get`, `topics.list`, `courseWork.list`, `courseWorkMaterials.list`, `announcements.list`) i escriu un JSON. El restore llegeix aquest JSON, crea un curs nou (`courses.create`), recrea temes (guardant mapa id vell→nou) i després tasques/materials/anuncis en `DRAFT`.

**Tech Stack:** Node.js ESM (`"type": "module"`), `googleapis` (ja al `package.json` de `Material Classroom/`), sense framework de test (verificació manual contra l'API real, com la resta d'scripts del directori).

## Global Constraints

- Comentaris de codi en català sense accents (regla del repo per codi d'alumnat NO aplica aquí — aquest és codi docent/intern, no d'alumnat; s'escriu en català normal amb accents, seguint el patró dels altres scripts de `Material Classroom/`).
- `COURSE_ID` sempre ve de `config.js`, mai hardcoded.
- Cap tasca/material/anunci recreat es publica automàticament: sempre `state: 'DRAFT'`.
- No duplicar fitxers de Drive: els materials `driveFile`/`link`/`youtubeVideo`/`form` es referencien amb el mateix id/URL original.
- `courses.create` ha de fallar-hi abans de crear cap tema si hi ha error (no deixar curs a mitges).
- Usar `ambReintents()` per a totes les crides d'API (patró existent, veure `_form_sa_lib.js`).

---

### Task 1: `backup_classroom.js`

**Files:**
- Create: `Material Classroom/backup_classroom.js`

**Interfaces:**
- Consumes: `getAuthClient()`, `ambReintents(fn, etiqueta)` de `./_form_sa_lib.js`; `COURSE_ID` de `./config.js`.
- Produces: fitxer `Material Classroom/backups/backup_<COURSE_ID>_<AAAAMMDD-HHMM>.json` amb forma:
  ```
  {
    generat: string (ISO),
    curs: { id, nom, seccio, descripcio, alternateLink },
    temes: [{ topicIdVell, nom }],
    courseWork: [{ titol, descripcio, estat, workType, maxPoints, topicIdVell, materials, dataLliurament }],
    courseWorkMaterials: [{ titol, descripcio, estat, topicIdVell, materials }],
    announcements: [{ text, estat, materials }],
  }
  ```
  Aquesta forma és l'input que `restaurar_classroom.js` (Task 2) espera.

- [ ] **Step 1: Crear la carpeta de backups i el fitxer base de l'script**

Crear `Material Classroom/backups/.gitkeep` (buit) perquè la carpeta existeixi encara que no hi hagi cap backup versionat.

- [ ] **Step 2: Escriure `backup_classroom.js`**

```javascript
/*
 * Backup complet del contingut del curs de Classroom (temes, tasques,
 * materials, anuncis) a un fitxer JSON local. NOMES contingut creat pel
 * docent: no llegeix alumnat, notes ni entregues (l'API no ho permet).
 *
 * Us:  node backup_classroom.js
 * Genera: backups/backup_<COURSE_ID>_<AAAAMMDD-HHMM>.json
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { google } from 'googleapis';
import { getAuthClient, ambReintents } from './_form_sa_lib.js';
import { COURSE_ID } from './config.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const BACKUPS_DIR = path.join(__dirname, 'backups');

function marcaTemps() {
  const ara = new Date();
  const pad = n => String(n).padStart(2, '0');
  return `${ara.getFullYear()}${pad(ara.getMonth() + 1)}${pad(ara.getDate())}` +
    `-${pad(ara.getHours())}${pad(ara.getMinutes())}`;
}

async function llistarTot(fn, camp, etiqueta) {
  const resultat = [];
  let pageToken;
  do {
    const res = await ambReintents(
      () => fn(pageToken), etiqueta);
    resultat.push(...(res.data[camp] || []));
    pageToken = res.data.nextPageToken;
  } while (pageToken);
  return resultat;
}

async function main() {
  const auth = await getAuthClient();
  const classroom = google.classroom({ version: 'v1', auth });

  const curs = await ambReintents(
    () => classroom.courses.get({ id: COURSE_ID }), 'llegir curs');

  const temes = await llistarTot(
    pageToken => classroom.courses.topics.list({ courseId: COURSE_ID, pageSize: 100, pageToken }),
    'topic', 'llistar temes');

  const courseWork = await llistarTot(
    pageToken => classroom.courses.courseWork.list({
      courseId: COURSE_ID, courseWorkStates: ['PUBLISHED', 'DRAFT'], pageSize: 100, pageToken,
    }), 'courseWork', 'llistar courseWork');

  const courseWorkMaterials = await llistarTot(
    pageToken => classroom.courses.courseWorkMaterials.list({
      courseId: COURSE_ID, courseWorkMaterialStates: ['PUBLISHED', 'DRAFT'], pageSize: 100, pageToken,
    }), 'courseWorkMaterial', 'llistar materials');

  const announcements = await llistarTot(
    pageToken => classroom.courses.announcements.list({
      courseId: COURSE_ID, announcementStates: ['PUBLISHED', 'DRAFT'], pageSize: 100, pageToken,
    }), 'announcement', 'llistar anuncis');

  const backup = {
    generat: new Date().toISOString(),
    curs: {
      id: COURSE_ID,
      nom: curs.data.name,
      seccio: curs.data.section || null,
      descripcio: curs.data.description || null,
      alternateLink: curs.data.alternateLink,
    },
    temes: temes.map(t => ({ topicIdVell: t.topicId, nom: t.name })),
    courseWork: courseWork.map(w => ({
      titol: w.title,
      descripcio: w.description || null,
      estat: w.state,
      workType: w.workType,
      maxPoints: w.maxPoints ?? null,
      topicIdVell: w.topicId || null,
      materials: w.materials || [],
      dataLliurament: w.dueDate || null,
    })),
    courseWorkMaterials: courseWorkMaterials.map(m => ({
      titol: m.title,
      descripcio: m.description || null,
      estat: m.state,
      topicIdVell: m.topicId || null,
      materials: m.materials || [],
    })),
    announcements: announcements.map(a => ({
      text: a.text || null,
      estat: a.state,
      materials: a.materials || [],
    })),
  };

  fs.mkdirSync(BACKUPS_DIR, { recursive: true });
  const fitxer = path.join(BACKUPS_DIR, `backup_${COURSE_ID}_${marcaTemps()}.json`);
  fs.writeFileSync(fitxer, JSON.stringify(backup, null, 2));

  console.log(`✅ Backup desat: ${fitxer}`);
  console.log(`   Temes: ${temes.length} · courseWork: ${courseWork.length} · ` +
    `materials: ${courseWorkMaterials.length} · anuncis: ${announcements.length}`);
}

main().catch(e => { console.error('❌', e.message); process.exit(1); });
```

- [ ] **Step 3: Executar contra el curs real i verificar**

Run: `node backup_classroom.js` (des de `Material Classroom/`)
Expected: missatge `✅ Backup desat: ...` i un fitxer nou a `backups/backup_868858694512_<data>.json` amb `temes`, `courseWork` (~84 entrades entre PUBLISHED/DRAFT segons `estat_classroom.js` previ), `courseWorkMaterials` i `announcements` no buits.

Obrir el JSON generat i comprovar manualment:
- El camp `curs.alternateLink` coincideix amb `https://classroom.google.com/c/ODY4ODU4Njk0NTEy`.
- Cada `courseWork` té `workType` informat (no `undefined`/`null`).

- [ ] **Step 4: Commit**

```bash
git add "Material Classroom/backup_classroom.js" "Material Classroom/backups/.gitkeep"
git commit -m "feat: script de backup del contingut del curs Classroom"
```

(El JSON de backup generat NO es commiteja en aquest pas — és sortida d'execució, no codi; el docent decideix quan versionar-ne un.)

---

### Task 2: `restaurar_classroom.js`

**Files:**
- Create: `Material Classroom/restaurar_classroom.js`

**Interfaces:**
- Consumes: fitxer de backup amb la forma exacta produïda per Task 1 (`curs`, `temes[].{topicIdVell,nom}`, `courseWork[].{titol,descripcio,estat,workType,maxPoints,topicIdVell,materials,dataLliurament}`, `courseWorkMaterials[].{titol,descripcio,estat,topicIdVell,materials}`, `announcements[].{text,estat,materials}`); `getAuthClient()`/`ambReintents()` de `./_form_sa_lib.js`.
- Produces: un curs nou a Classroom (imprimeix `id` i `alternateLink` per consola en acabar).

- [ ] **Step 1: Escriure `restaurar_classroom.js`**

```javascript
/*
 * Restaura un backup de curs (generat per backup_classroom.js) creant un
 * curs NOU a Classroom. Mai reutilitza ni modifica un curs existent.
 * Tot es crea en DRAFT, encara que l'original estigues PUBLISHED, per
 * evitar notificar alumnat abans de revisar el contingut recreat.
 *
 * Materials driveFile/link/youtubeVideo/form es referencien amb el mateix
 * id/URL original: no es dupliquen fitxers de Drive.
 *
 * Us:  node restaurar_classroom.js backups/backup_868858694512_20260722-1200.json
 */
import fs from 'fs';
import { google } from 'googleapis';
import { getAuthClient, ambReintents } from './_form_sa_lib.js';

function netejaMaterials(materials) {
  // Els materials del backup venen tal qual de l'API (driveFile/link/
  // youtubeVideo/form); es reenvien igual, sense duplicar res a Drive.
  return (materials || []).map(m => {
    const net = {};
    if (m.link) net.link = { url: m.link.url, title: m.link.title };
    if (m.driveFile) net.driveFile = { driveFile: { id: m.driveFile.driveFile.id } };
    if (m.youtubeVideo) net.youtubeVideo = { id: m.youtubeVideo.id };
    if (m.form) net.form = { formUrl: m.form.formUrl };
    return net;
  });
}

async function main() {
  const fitxerBackup = process.argv[2];
  if (!fitxerBackup) {
    console.error('❌ Cal indicar el fitxer de backup: node restaurar_classroom.js <fitxer.json>');
    process.exit(1);
  }
  const backup = JSON.parse(fs.readFileSync(fitxerBackup, 'utf8'));

  const auth = await getAuthClient();
  const classroom = google.classroom({ version: 'v1', auth });

  const dataAvui = new Date().toISOString().slice(0, 10);
  const cursNou = await ambReintents(
    () => classroom.courses.create({
      requestBody: {
        name: `${backup.curs.nom} (còpia ${dataAvui})`,
        section: backup.curs.seccio || undefined,
        description: backup.curs.descripcio || undefined,
        ownerId: 'me',
        courseState: 'PROVISIONED',
      },
    }), 'crear curs nou');
  const courseIdNou = cursNou.data.id;
  console.log(`✅ Curs nou creat: ${cursNou.data.name} (${courseIdNou})`);

  const mapaTemes = {};
  for (const t of backup.temes) {
    const creat = await ambReintents(
      () => classroom.courses.topics.create({
        courseId: courseIdNou,
        requestBody: { name: t.nom },
      }), `crear tema «${t.nom}»`);
    mapaTemes[t.topicIdVell] = creat.data.topicId;
  }
  console.log(`✅ Temes recreats: ${Object.keys(mapaTemes).length}`);

  let okCourseWork = 0;
  for (const w of backup.courseWork) {
    await ambReintents(
      () => classroom.courses.courseWork.create({
        courseId: courseIdNou,
        requestBody: {
          title: w.titol,
          description: w.descripcio || undefined,
          workType: w.workType,
          state: 'DRAFT',
          maxPoints: w.maxPoints ?? undefined,
          topicId: w.topicIdVell ? mapaTemes[w.topicIdVell] : undefined,
          materials: netejaMaterials(w.materials),
        },
      }), `crear tasca «${w.titol}»`).catch(e => {
        console.error(`⚠️  Tasca «${w.titol}» no recreada: ${e.message}`);
      });
    okCourseWork++;
  }
  console.log(`✅ courseWork processats: ${okCourseWork}/${backup.courseWork.length}`);

  let okMaterials = 0;
  for (const m of backup.courseWorkMaterials) {
    await ambReintents(
      () => classroom.courses.courseWorkMaterials.create({
        courseId: courseIdNou,
        requestBody: {
          title: m.titol,
          description: m.descripcio || undefined,
          state: 'DRAFT',
          topicId: m.topicIdVell ? mapaTemes[m.topicIdVell] : undefined,
          materials: netejaMaterials(m.materials),
        },
      }), `crear material «${m.titol}»`).catch(e => {
        console.error(`⚠️  Material «${m.titol}» no recreat: ${e.message}`);
      });
    okMaterials++;
  }
  console.log(`✅ courseWorkMaterials processats: ${okMaterials}/${backup.courseWorkMaterials.length}`);

  let okAnuncis = 0;
  for (const a of backup.announcements) {
    await ambReintents(
      () => classroom.courses.announcements.create({
        courseId: courseIdNou,
        requestBody: {
          text: a.text || '',
          state: 'DRAFT',
          materials: netejaMaterials(a.materials),
        },
      }), 'crear anunci').catch(e => {
        console.error(`⚠️  Anunci no recreat: ${e.message}`);
      });
    okAnuncis++;
  }
  console.log(`✅ announcements processats: ${okAnuncis}/${backup.announcements.length}`);

  console.log(`\n🔗 Curs restaurat: ${cursNou.data.alternateLink}`);
  console.log('   Tot en DRAFT: revisa i publica manualment el que calgui.');
}

main().catch(e => { console.error('❌', e.message); process.exit(1); });
```

- [ ] **Step 2: Executar el restore amb el backup de Task 1 i verificar**

Run: `node restaurar_classroom.js backups/backup_868858694512_<data-de-task-1>.json`
Expected: `✅ Curs nou creat: ...`, `✅ Temes recreats: N` (mateix N que `temes.length` del JSON), `courseWork processats: 84/84` (o el total real) sense cap línia `⚠️` inesperada, i finalment `🔗 Curs restaurat: https://classroom.google.com/c/...`.

Obrir l'enllaç al navegador i comprovar manualment:
- El curs nou existeix i té els mateixos temes que l'original.
- Almenys 3 tasques a l'atzar (d'entre les que eren `PUBLISHED` a l'original) apareixen com `DRAFT` al curs nou.
- Un material amb adjunt de Drive obre el mateix fitxer que l'original.

- [ ] **Step 3: Esborrar el curs de prova creat al pas 2**

Al Classroom del curs nou: Configuració > Arxiva el curs > Elimina'l (o des de la UI, menú ⋮ del curs > Arxiva, i després elimina'l des de la vista d'arxivats). Fer-ho manualment al navegador — l'API de Classroom no permet esborrar cursos per programa amb els àmbits actuals, i no cal ampliar-los per aquest ús puntual.

- [ ] **Step 4: Commit**

```bash
git add "Material Classroom/restaurar_classroom.js"
git commit -m "feat: script de restore del curs Classroom des d'un backup"
```

---

### Task 3: Documentar l'ús al README de Material Classroom (si n'hi ha) o a `config.js`

**Files:**
- Modify: `Material Classroom/config.js` (afegir comentari d'ús a sobre de `COURSE_ID` o al capçal del fitxer)

**Interfaces:**
- Consumes: cap (només comentaris).
- Produces: cap (documentació inline).

- [ ] **Step 1: Comprovar si existeix `Material Classroom/README.md`**

Run: `Test-Path "Material Classroom/README.md"` (PowerShell) o `ls "Material Classroom"/README.md` (bash)

- [ ] **Step 2a: Si NO existeix README, afegir comentari a `config.js`**

Al capçal de `config.js`, després del bloc de comentaris existent sobre `COURSE_ID`, afegir:

```javascript
// Backup/restore del contingut del curs (temes, tasques, materials, anuncis;
// NO alumnat ni notes, l'API no ho permet):
//   node backup_classroom.js
//   node restaurar_classroom.js backups/backup_<id>_<data>.json
// El restore SEMPRE crea un curs nou, en DRAFT; mai toca el curs original.
```

- [ ] **Step 2b: Si SÍ existeix README, afegir la mateixa informació allà en lloc de `config.js`**

Afegir una secció `## Backup i restore del curs` amb el mateix contingut que el Step 2a, adaptat a format Markdown.

- [ ] **Step 3: Commit**

```bash
git add "Material Classroom/config.js"
git commit -m "docs: com fer servir el backup/restore del curs Classroom"
```
