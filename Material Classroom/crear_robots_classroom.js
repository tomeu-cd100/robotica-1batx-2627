// Fil conductor dels robots al Classroom: rúbriques importables + tasques de
// producte + materials-enllaç. Transcripció FIDEL de les rúbriques dels
// dossiers (Classes/00_General/00_Projecte_T*.md), que són la font de veritat
// versionada.
//
// Crea (tot idempotent, per títol):
//   1) 3 Sheets de rúbrica en FORMAT D'IMPORTACIÓ de Classroom, a la carpeta
//      de Drive del curs (config.DRIVE_FOLDER_ID). Els punts 1-4 són el
//      marcador de nivell que Classroom exigeix — NO són una nota sobre 10.
//      La rúbrica s'importa a la tasca des del Classroom:
//      Tasca → Rúbrica → «Importa de Fulls de càlcul».
//   2) 3 tasques de producte en DRAFT (33 punts, categoria del trimestre).
//   3) 4 materials-enllaç en DRAFT (fil conductor + 3 dossiers).
//
// Ús: node crear_robots_classroom.js          (des de Material Classroom/)
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { google } from 'googleapis';
import { getAuthClient, ambReintents } from './_form_sa_lib.js';
import { COURSE_ID, DRIVE_FOLDER_ID, GRADE_CATEGORIES, WEB_BASE } from './config.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const RESULTATS = path.join(__dirname, 'resultats_robots_classroom.json');

// Escala oficial del curs (07_Rubriques.md). Punts 1-4 = marcador de nivell.
const NIVELL_TITOLS = ['Insuficient (0-4)', 'Suficient/Bé (5-6)', 'Notable (7-8)', 'Excel·lent (9-10)'];
const PUNTS = ['1.0', '2.0', '3.0', '4.0'];
const BANNER = 'Et recomanem que no editis les rúbriques en format de full de càlcul';
const VERSIO = 'v1.0-s';

// Temes del Classroom (node estat_classroom.js per refrescar-los).
const TEMES = {
  material: '870467767393', // Material per al curs
  sa2: '870507457924', sa3: '870511802408', sa4: '870512711808',
  sa6: '870512731275', sa7: '870512438579', sa9: '870512720734',
};

// [títol criteri, [desc Insuficient, Suficient/Bé, Notable, Excel·lent]]
// Transcripció fidel dels dossiers 00_Projecte_T*.md.
const RUBRIQUES = {
  T1: { nom: 'Producte T1 · La mascota reactiva', criteris: [
    ['R1 · Fabricació i muntatge', ['Caixa inestable o cablejat insegur.', 'Caixa funcional però amb algun cable fluix o desordenat.', 'Caixa ferma i cablejat endreçat, sense etiquetar.', 'Caixa ferma, cablejat endreçat i etiquetat, res solt ni curtcircuitat.']],
    ['R2 · Funcionament', ['Sortides o sensors clau no funcionen.', 'La majoria de sortides i sensors funcionen.', 'Totes les sortides i sensors funcionen, amb algun ajust.', 'Totes les sortides i sensors funcionen a la primera i de manera fiable.']],
    ['R3 · Comportaments', ['Menys de 2 reaccions, o sense relació amb cap personalitat.', '2 reaccions sensor→resposta, o coherència parcial.', '≥3 reaccions sensor→resposta, coherents amb la personalitat.', '≥3 reaccions sensor→resposta, totes coherents amb la personalitat i ben calibrades.']],
    ['R4 · Fitxa de personalitat i demostració', ['Sense fitxa o sense poder explicar el funcionament.', 'Fitxa bàsica o defensa amb ajuda.', 'Fitxa completa i defensa oral clara.', 'Fitxa completa i defensa oral que explica i justifica cada reacció.']],
  ]},
  T2: { nom: 'Producte T2 · El braç robòtic', criteris: [
    ['R1 · Fabricació i muntatge', ['Estructura inestable o cablejat insegur.', 'Braç funcional però amb algun cable fluix o desordenat.', 'Braç ferm i cablejat endreçat, sense etiquetar.', 'Braç ferm, cablejat endreçat i etiquetat, res solt ni curtcircuitat.']],
    ['R2 · Moviment', ['Alguna articulació no es mou o força el topall.', 'Les 3 articulacions es mouen, amb algun tremolor.', 'Les 3 articulacions es mouen de manera suau i fiable.', 'Moviment suau, precís i sense tremolor a les 3 articulacions.']],
    ['R3 · Modes i màquina d\'estats', ['Sense estats definits o el braç queda penjat en algun mode.', 'Alguns modes funcionen, sense diagrama d\'estats.', 'Tots els modes (repòs/manual/replay/emergència) funcionen, amb diagrama d\'estats inclòs.', 'Tots els modes funcionen de manera fiable, amb diagrama d\'estats clar i emergència provada.']],
    ['R4 · Comandament per ràdio i demostració', ['Sense comandament o no arriba a agafar cap objecte.', 'Comandament bàsic; agafa l\'objecte amb ajuda.', 'Comandament fiable; agafa i mou un objecte amb èxit.', 'Comandament fiable i demostració fluida: agafa i mou l\'objecte a la primera.']],
  ]},
  T3: { nom: 'Producte T3 · El rover autònom', criteris: [
    ['R1 · Fabricació i robustesa', ['El rover no aguanta la competició (es desmunta o deixa de respondre).', 'Aguanta la competició amb algun retoc d\'última hora.', 'Aguanta la competició sense retocs, cablatge endreçat.', 'Aguanta la competició sense retocs, cablatge endreçat i etiquetat, res solt.']],
    ['R2 · Comportaments autònoms', ['No segueix línia ni evita obstacles de manera fiable.', 'Segueix línia o evita obstacles, amb errors freqüents.', 'Segueix línia i evita obstacles, amb algun error puntual.', 'Segueix línia i evita obstacles de manera fiable i fluida.']],
    ['R3 · Telemetria', ['No arriben dades per ràdio a la base.', 'Arriben dades bàsiques, de manera intermitent.', 'Arriben dades de manera fiable i es mostren a l\'OLED.', 'Telemetria fiable, ben etiquetada i útil per seguir l\'estat del rover en directe.']],
    ['R4 · Documentació tècnica', ['Sense esquema ni codi comentat.', 'Esquema o codi comentat, no els dos.', 'Esquema i codi comentat, sense diari de proves.', 'Esquema, codi comentat i diari de proves que explica el procés de calibratge.']],
  ]},
};

const URL = (p) => `${WEB_BASE}/00-general/${p}`;

const TASQUES = [
  {
    titol: 'Producte T1 · La mascota reactiva 🐣',
    descripcio: 'Lliurament del robot del 1r trimestre: la mascota muntada amb '
      + 'com a mínim 3 reaccions sensor→comportament i la fitxa de personalitat. '
      + 'Es tanca a la S3 de SA3. La rúbrica R1-R4 és al dossier.',
    topicId: TEMES.sa3, categoria: GRADE_CATEGORIES.T1.id,
    links: [URL('00-projecte-t1-mascota.html'), URL('00-fil-conductor-robots.html')],
    rubrica: 'T1',
  },
  {
    titol: 'Producte T2 · El braç robòtic 🦾',
    descripcio: 'Lliurament del robot del 2n trimestre: el braç de 3 articulacions '
      + 'amb màquina d\'estats (repòs/manual/replay/emergència) i comandament per '
      + 'ràdio. Es tanca a la S3 de SA6. La rúbrica R1-R4 és al dossier.',
    topicId: TEMES.sa6, categoria: GRADE_CATEGORIES.T2.id,
    links: [URL('00-projecte-t2-brac.html'), URL('00-fil-conductor-robots.html')],
    rubrica: 'T2',
  },
  {
    titol: 'Producte T3 · El rover autònom 🚗',
    descripcio: 'Lliurament del robot del 3r trimestre: el rover que segueix '
      + 'línia i evita obstacles, amb telemetria per ràdio, al repte final i la '
      + 'competició de SA9. La rúbrica R1-R4 és al dossier.',
    topicId: TEMES.sa9, categoria: GRADE_CATEGORIES.T3.id,
    links: [URL('00-projecte-t3-rover.html'), URL('00-fil-conductor-robots.html')],
    rubrica: 'T3',
  },
];

const MATERIALS = [
  { titol: '🤖 El fil conductor del curs: tres robots, tres trimestres',
    descripcio: 'El mapa dels tres robots que cada parella construeix durant el '
      + 'curs (mascota, braç, rover) i de com cada SA hi aporta una peça.',
    url: URL('00-fil-conductor-robots.html'), topicId: TEMES.material },
  { titol: '🐣 Dossier del robot T1: la mascota reactiva',
    descripcio: 'Peces, muntatge, cablatge i rúbrica del robot del 1r trimestre.',
    url: URL('00-projecte-t1-mascota.html'), topicId: TEMES.sa2 },
  { titol: '🦾 Dossier del robot T2: el braç robòtic',
    descripcio: 'Peces, muntatge, cablatge (Arduino i micro:bit) i rúbrica del robot del 2n trimestre.',
    url: URL('00-projecte-t2-brac.html'), topicId: TEMES.sa4 },
  { titol: '🚗 Dossier del robot T3: el rover autònom',
    descripcio: 'Peces, muntatge, cablatge, sessió 0 i rúbrica del robot del 3r trimestre.',
    url: URL('00-projecte-t3-rover.html'), topicId: TEMES.sa7 },
];

const cell = (v) => `"${String(v).replace(/"/g, '""')}"`;
const row = (arr) => arr.map(cell).join(',');

function buildCsv(criteris) {
  const rows = [row([BANNER, '', '', '', '']), row([VERSIO, '', '', '', ''])];
  for (const [titol, descs] of criteris) {
    rows.push(row([titol, '', '', '', '']));
    rows.push(row(['', '', '', '', '']));
    rows.push(row(['', ...PUNTS]));
    rows.push(row(['', ...NIVELL_TITOLS]));
    rows.push(row(['', ...descs]));
  }
  return rows.join('\r\n');
}

async function main() {
  const auth = await getAuthClient();
  const drive = google.drive({ version: 'v3', auth });
  const classroom = google.classroom({ version: 'v1', auth });
  const results = fs.existsSync(RESULTATS) ? JSON.parse(fs.readFileSync(RESULTATS, 'utf8')) : {};
  const desa = () => fs.writeFileSync(RESULTATS, JSON.stringify(results, null, 2));

  // 1 · Rúbriques importables (Sheets a la carpeta del curs)
  for (const [key, rub] of Object.entries(RUBRIQUES)) {
    const nom = `Rúbrica ${rub.nom} (importable a Classroom)`;
    if (results[`rubrica_${key}`]?.fileId) {
      console.log(`🔄 Actualitzant "${nom}"...`);
      await ambReintents(() => drive.files.update({
        fileId: results[`rubrica_${key}`].fileId,
        media: { mimeType: 'text/csv', body: buildCsv(rub.criteris) },
        fields: 'id',
      }), nom);
      console.log(`✅ actualitzada: ${results[`rubrica_${key}`].url}`);
      continue;
    }
    console.log(`📊 Creant "${nom}"...`);
    const res = await ambReintents(() => drive.files.create({
      requestBody: { name: nom, mimeType: 'application/vnd.google-apps.spreadsheet', parents: [DRIVE_FOLDER_ID] },
      media: { mimeType: 'text/csv', body: buildCsv(rub.criteris) },
      fields: 'id, webViewLink',
    }), nom);
    results[`rubrica_${key}`] = { nom, fileId: res.data.id, url: res.data.webViewLink };
    desa();
    console.log(`✅ ${res.data.webViewLink}`);
  }

  // Llistes fresques per a la deduplicació per títol (esborranys inclosos)
  const cw = [];
  let pt;
  do {
    const r = await ambReintents(() => classroom.courses.courseWork.list({
      courseId: COURSE_ID, pageSize: 100, pageToken: pt,
      courseWorkStates: ['PUBLISHED', 'DRAFT'] }), 'llistar tasques');
    cw.push(...(r.data.courseWork || []));
    pt = r.data.nextPageToken;
  } while (pt);
  const cwm = [];
  do {
    const r = await ambReintents(() => classroom.courses.courseWorkMaterials.list({
      courseId: COURSE_ID, pageSize: 100, pageToken: pt,
      courseWorkMaterialStates: ['PUBLISHED', 'DRAFT'] }), 'llistar materials');
    cwm.push(...(r.data.courseWorkMaterial || []));
    pt = r.data.nextPageToken;
  } while (pt);

  // 2 · Tasques de producte (DRAFT, 33 punts, categoria del trimestre)
  for (const t of TASQUES) {
    if (cw.some(w => w.title === t.titol)) {
      console.log(`⏭  Tasca ja existent: "${t.titol}"`);
      continue;
    }
    console.log(`📝 Creant tasca DRAFT "${t.titol}"...`);
    const res = await ambReintents(() => classroom.courses.courseWork.create({
      courseId: COURSE_ID,
      requestBody: {
        title: t.titol,
        description: t.descripcio + '\n\nRúbrica importable (per al docent): '
          + (results[`rubrica_${t.rubrica}`]?.url || ''),
        state: 'DRAFT',
        workType: 'ASSIGNMENT',
        maxPoints: 33,
        topicId: t.topicId,
        gradeCategory: { id: t.categoria },
        materials: t.links.map(url => ({ link: { url } })),
      },
    }), t.titol);
    results[`tasca_${t.rubrica}`] = { titol: t.titol, id: res.data.id };
    desa();
    console.log(`✅ id=${res.data.id}`);
  }

  // 3 · Materials-enllaç (DRAFT)
  for (const m of MATERIALS) {
    if (cwm.some(w => w.title === m.titol)) {
      console.log(`⏭  Material ja existent: "${m.titol}"`);
      continue;
    }
    console.log(`🔗 Creant material DRAFT "${m.titol}"...`);
    const res = await ambReintents(() => classroom.courses.courseWorkMaterials.create({
      courseId: COURSE_ID,
      requestBody: {
        title: m.titol, description: m.descripcio, state: 'DRAFT',
        topicId: m.topicId, materials: [{ link: { url: m.url } }],
      },
    }), m.titol);
    results[`material_${m.titol.slice(0, 20)}`] = { titol: m.titol, id: res.data.id };
    desa();
    console.log(`✅ id=${res.data.id}`);
  }

  console.log('\nFet. Les tasques i materials són en DRAFT: publica\'ls des del Classroom quan toqui.');
  console.log('Per posar la rúbrica a cada tasca: obre-la → Rúbrica → «Importa de Fulls de càlcul» → tria el Sheet.');
}

main().catch(e => { console.error('❌', e.message); process.exit(1); });
