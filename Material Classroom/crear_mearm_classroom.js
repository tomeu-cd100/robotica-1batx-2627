/*
 * Tema «MeArm» al Classroom: les activitats del T2 reorientades al braç
 * (28-10-2026). NO toca ni esborra les activitats antigues de SA4-SA6: totes
 * les noves porten «(MeArm)» al títol i van al tema nou.
 *
 * Crea (tot idempotent, per títol; tasques en DRAFT, categoria T2):
 *   1) el tema «MeArm» (si no hi és);
 *   2) 2 materials-enllaç: el dossier del braç i la guia de muntatge;
 *   3) les fitxes base de SA4, SA5 i SA6 (Forms de sa_definicions.js, que ja
 *      són les versions del braç), /10;
 *   4) els qüestionaris de conceptes de SA4-SA6 (Forms en mode qüestionari):
 *      preguntes de Classes/SAn/SAn_questionari_conceptes.md i resposta
 *      correcta de la clau de SAn_questionari_conceptes_solucions.md, /10;
 *   5) la rúbrica importable del producte T2 (MeArm) i la tasca de producte,
 *      /33 com els altres robots.
 *
 * Ús (des de Material Classroom/):
 *   node crear_mearm_classroom.js            # descoberta: valida i mostra el pla
 *   APPLY=1 node crear_mearm_classroom.js    # crea-ho al Classroom/Drive
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { google } from 'googleapis';
import { getAuthClient, ambReintents, crearIPenjar } from './_form_sa_lib.js';
import { COURSE_ID, DRIVE_FOLDER_ID, GRADE_CATEGORIES, WEB_BASE } from './config.js';
import { DEFINICIONS } from './sa_definicions.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const CLASSES = path.join(__dirname, '..', 'Classes');
const RESULTATS = path.join(__dirname, 'resultats_mearm_classroom.json');
const APPLY = process.env.APPLY === '1';

const TEMA = 'MeArm';
// ⚠️ Comprovat el 29-10-2026: Classroom IGNORA gradeCategory en crear tasques en DRAFT i
// l'API no la deixa canviar (patch: "Non-supported update mask"). Cal posar T2 a mà.
// Els Forms també queden com a enllaç (no materials.form): no s'hi poden importar notes.
const T2 = { id: GRADE_CATEGORIES.T2.id, name: GRADE_CATEGORIES.T2.name };
const URL = (p) => `${WEB_BASE}/00-general/${p}`;

const MATERIALS = [
  { titol: '🦾 MeArm · Dossier del braç (pins, calendari i rúbrica)',
    descripcio: 'El robot del 2n trimestre i fil conductor de SA4-SA6: peces, '
      + 'calendari de muntatge, mapa de pins, protocol d\'ordres i rúbrica.',
    url: URL('00-projecte-t2-brac.html') },
  { titol: '🔧 MeArm · Guia de muntatge pas a pas',
    descripcio: 'Els blocs de muntatge del MeArm (pas 0 i blocs A-E), '
      + 'repartits en els torns de taller de la SA4, i les connexions.',
    url: URL('00-muntatge-brac-mearm.html') },
];

// Rúbrica del producte: transcripció fidel de 00_Projecte_T2_Brac.md.
const NIVELLS = ['Insuficient (0-4)', 'Suficient/Bé (5-6)', 'Notable (7-8)', 'Excel·lent (9-10)'];
const RUBRICA = [
  ['R1 · Fabricació i muntatge', ['Estructura inestable o cablejat insegur.', 'Braç funcional però amb algun cable fluix o desordenat.', 'Braç ferm i cablejat endreçat, sense etiquetar.', 'Braç ferm, cablejat endreçat i etiquetat, res solt ni curtcircuitat.']],
  ['R2 · Moviment', ['Alguna articulació no es mou o força el topall.', 'Les 4 articulacions es mouen, amb algun tremolor.', 'Les 4 articulacions es mouen de manera suau i fiable.', 'Moviment suau, precís i sense tremolor a les 4 articulacions.']],
  ['R3 · Modes i màquina d\'estats', ['Sense estats definits o el braç queda penjat en algun mode.', 'Alguns modes funcionen, sense diagrama d\'estats.', 'Tots els modes (repòs/manual/replay/emergència) funcionen, amb diagrama d\'estats inclòs.', 'Tots els modes funcionen de manera fiable, amb diagrama d\'estats clar i emergència provada.']],
  ['R4 · Comandament per ràdio i demostració', ['Sense comandament o no arriba a agafar cap objecte.', 'Comandament bàsic; agafa l\'objecte amb ajuda.', 'Comandament fiable; agafa i mou un objecte amb èxit.', 'Comandament fiable i demostració fluida: agafa i mou l\'objecte a la primera.']],
];
const PRODUCTE = {
  titol: 'Producte T2 · El braç robòtic MeArm 🦾',
  descripcio: 'Lliurament del robot del 2n trimestre: el MeArm de 4 articulacions '
    + 'amb màquina d\'estats (repòs/manual/replay/emergència) i comandament per '
    + 'ràdio, capaç d\'agafar un objecte i deixar-lo en un altre lloc. Es tanca a '
    + 'la S3 de SA6. La rúbrica R1-R4 és al dossier.',
};

// --- Qüestionaris: preguntes del .md d'alumnat + clau de les solucions -----
const net = (s) => s.replace(/\*\*/g, '').replace(/`/g, '').trim();

function llegeixBanc(sa) {
  const md = fs.readFileSync(path.join(CLASSES, sa, `${sa}_questionari_conceptes.md`), 'utf8');
  const sol = fs.readFileSync(path.join(CLASSES, sa, `${sa}_questionari_conceptes_solucions.md`), 'utf8');
  const titol = net(md.split(/\r?\n/).find(l => l.startsWith('# ')).slice(2));
  const preguntes = [];
  let q = null, dins = false, oberta = null;
  for (const ln of md.split(/\r?\n/)) {
    if (/^##\s+Preguntes/.test(ln)) { dins = true; continue; }
    if (/^##\s/.test(ln)) dins = false;
    const mObe = ln.match(/^11\.\s+(.*)/);
    if (mObe) oberta = net(mObe[1]);
    if (!dins) continue;
    const mq = ln.match(/^(\d{1,2})\.\s+(.*)/);
    if (mq) { q = { titol: net(mq[2]), opcions: [] }; preguntes.push(q); continue; }
    const mo = ln.match(/^\s*-\s*([a-d])\)\s*(.*)/);
    if (mo && q) q.opcions.push(net(mo[2]));
  }
  const fila = sol.match(/\|\s*\*\*Resposta\*\*\s*\|(.*)\|/);
  const claus = fila ? fila[1].split('|').map(c => c.trim()) : [];
  preguntes.forEach((p, i) => { p.correcta = p.opcions['abcd'.indexOf(claus[i])]; });
  const curt = `${sa} · Qüestionari de conceptes (MeArm)`;
  return { sa, titol, curt, preguntes, oberta };
}

function validaBanc(b) {
  const pr = [];
  if (b.preguntes.length !== 10) pr.push(`${b.preguntes.length} preguntes`);
  b.preguntes.forEach((p, i) => {
    if (p.opcions.length !== 4) pr.push(`Q${i + 1}: ${p.opcions.length} opcions`);
    if (!p.correcta) pr.push(`Q${i + 1}: sense correcta`);
  });
  if (!b.oberta) pr.push('sense pregunta oberta');
  return pr;
}

function peticionsQuiz(b) {
  const reqs = [];
  let i = 0;
  const add = (item) => reqs.push({ createItem: { item, location: { index: i++ } } });
  add({ title: 'Nom i cognoms', questionItem: { question: { required: true, textQuestion: {} } } });
  for (const p of b.preguntes) {
    add({ title: p.titol, questionItem: { question: {
      required: true,
      choiceQuestion: { type: 'RADIO', options: p.opcions.map(o => ({ value: o })) },
      grading: { pointValue: 1, correctAnswers: { answers: [{ value: p.correcta }] } },
    } } });
  }
  add({ title: b.oberta, questionItem: { question: { required: false, textQuestion: { paragraph: true } } } });
  return reqs;
}

// --- Rúbrica importable (mateix format que crear_robots_classroom.js) -------
const cell = (v) => `"${String(v).replace(/"/g, '""')}"`;
const row = (arr) => arr.map(cell).join(',');
function csvRubrica() {
  const rows = [row(['Et recomanem que no editis les rúbriques en format de full de càlcul', '', '', '', '']),
                row(['v1.0-s', '', '', '', ''])];
  for (const [titol, descs] of RUBRICA) {
    rows.push(row([titol, '', '', '', '']), row(['', '', '', '', '']),
              row(['', '1.0', '2.0', '3.0', '4.0']), row(['', ...NIVELLS]), row(['', ...descs]));
  }
  return rows.join('\r\n');
}

async function llistaTot(classroom) {
  const cw = [], cwm = [];
  let pt;
  do {
    const r = await ambReintents(() => classroom.courses.courseWork.list({
      courseId: COURSE_ID, pageSize: 100, pageToken: pt,
      courseWorkStates: ['PUBLISHED', 'DRAFT'] }), 'llistar tasques');
    cw.push(...(r.data.courseWork || [])); pt = r.data.nextPageToken;
  } while (pt);
  do {
    const r = await ambReintents(() => classroom.courses.courseWorkMaterials.list({
      courseId: COURSE_ID, pageSize: 100, pageToken: pt,
      courseWorkMaterialStates: ['PUBLISHED', 'DRAFT'] }), 'llistar materials');
    cwm.push(...(r.data.courseWorkMaterial || [])); pt = r.data.nextPageToken;
  } while (pt);
  return { cw, cwm };
}

async function main() {
  // Validació local abans de tocar res
  const bancs = ['SA4', 'SA5', 'SA6'].map(llegeixBanc);
  let malament = false;
  for (const b of bancs) {
    const pr = validaBanc(b);
    console.log(pr.length ? `❌ ${b.sa}: ${pr.join(', ')}` : `✔ ${b.sa}: «${b.curt}» — 10 preguntes amb clau + oberta`);
    if (pr.length) malament = true;
  }
  const fitxes = ['sa4', 'sa5', 'sa6'].map(k => {
    const d = DEFINICIONS[k];
    return { ...d, titol: d.titol.replace('Fitxa base', 'Fitxa base (MeArm)') };
  });
  fitxes.forEach(f => console.log(`✔ ${f.sa}: «${f.titol}» — ${f.items.length} elements`));
  if (malament) process.exit(1);

  const auth = await getAuthClient();
  const classroom = google.classroom({ version: 'v1', auth });
  const forms = google.forms({ version: 'v1', auth });
  const drive = google.drive({ version: 'v3', auth });
  const results = fs.existsSync(RESULTATS) ? JSON.parse(fs.readFileSync(RESULTATS, 'utf8')) : {};
  const desa = () => fs.writeFileSync(RESULTATS, JSON.stringify(results, null, 2));

  const temes = (await ambReintents(() => classroom.courses.topics.list({ courseId: COURSE_ID }),
    'llistar temes')).data.topic || [];
  let tema = temes.find(t => t.name === TEMA);
  const { cw, cwm } = await llistaTot(classroom);
  const existeix = (titol) => cw.some(w => w.title === titol);

  console.log('\n🎯 Pla:');
  console.log(`  Tema «${TEMA}»: ${tema ? 'ja existeix' : 'es crearà'}`);
  for (const m of MATERIALS) console.log(`  Material «${m.titol}»${cwm.some(x => x.title === m.titol) ? '  ⏭ ja existeix' : ''}`);
  for (const f of fitxes) console.log(`  Tasca «${f.titol}» [DRAFT, T2, /10]${existeix(f.titol) ? '  ⏭ ja existeix' : ''}`);
  for (const b of bancs) console.log(`  Tasca «${b.curt}» [DRAFT, T2, /10]${existeix(b.curt) ? '  ⏭ ja existeix' : ''}`);
  console.log(`  Rúbrica importable + tasca «${PRODUCTE.titol}» [DRAFT, T2, /33]${existeix(PRODUCTE.titol) ? '  ⏭ ja existeix' : ''}`);
  if (!APPLY) { console.log('\n🔎 Descoberta. APPLY=1 per crear-ho.'); return; }

  // 1 · Tema
  if (!tema) {
    tema = (await ambReintents(() => classroom.courses.topics.create({
      courseId: COURSE_ID, requestBody: { name: TEMA } }), 'crear tema')).data;
    console.log(`✅ Tema creat: ${tema.topicId}`);
  }
  const topicId = tema.topicId;
  results.tema = topicId; desa();

  // 2 · Materials
  for (const m of MATERIALS) {
    if (cwm.some(x => x.title === m.titol)) { console.log(`⏭ ${m.titol}`); continue; }
    await ambReintents(() => classroom.courses.courseWorkMaterials.create({
      courseId: COURSE_ID,
      requestBody: { title: m.titol, description: m.descripcio, state: 'DRAFT', topicId,
                     materials: [{ link: { url: m.url } }] } }), m.titol);
    console.log(`✅ Material: ${m.titol}`);
  }

  // 3 · Fitxes base (crearIPenjar ja és idempotent per títol)
  for (const f of fitxes) {
    const r = await crearIPenjar({ ...f, topicId, state: 'DRAFT', gradeCategory: T2 });
    results[`fitxa_${f.sa}`] = r.taskUrl; desa();
  }

  // 4 · Qüestionaris de conceptes
  for (const b of bancs) {
    if (existeix(b.curt)) {
      results[`questionari_${b.sa}`] = cw.find(w => w.title === b.curt).alternateLink;
      console.log(`⏭ ${b.curt}`); desa(); continue;
    }
    let formId = (await ambReintents(() => drive.files.list({
      q: `name = '${b.curt.replace(/'/g, "\\'")}' and '${DRIVE_FOLDER_ID}' in parents and trashed = false`,
      fields: 'files(id)' }), 'buscar Form')).data.files?.[0]?.id;
    if (!formId) {
      formId = (await ambReintents(() => forms.forms.create({
        requestBody: { info: { title: b.curt, documentTitle: b.curt } } }), 'crear Form')).data.formId;
      try {
        await ambReintents(() => forms.forms.batchUpdate({ formId, requestBody: { requests: [
          { updateSettings: { settings: { quizSettings: { isQuiz: true } }, updateMask: 'quizSettings.isQuiz' } },
          { updateFormInfo: { info: { description: `${b.titol}. 10 preguntes d'opció múltiple (1 punt cadascuna) + una pregunta oberta.` }, updateMask: 'description' } },
        ] } }), 'configurar quiz');
        await ambReintents(() => forms.forms.batchUpdate({ formId,
          requestBody: { requests: peticionsQuiz(b) } }), 'preguntes');
        const meta = await ambReintents(() => drive.files.get({ fileId: formId, fields: 'parents' }), 'parents');
        await ambReintents(() => drive.files.update({ fileId: formId, addParents: DRIVE_FOLDER_ID,
          removeParents: (meta.data.parents || []).join(','), fields: 'id' }), 'moure');
      } catch (e) {
        console.log(`🧹 Error a mig fer: esborrant el Form orfe ${formId}...`);
        try { await drive.files.delete({ fileId: formId }); } catch { /* res */ }
        throw e;
      }
      console.log(`✅ Form: ${b.curt}`);
    }
    // URL canònica /d/{id}/viewform: Classroom la reconeix com a Form natiu
    const tasca = await ambReintents(() => classroom.courses.courseWork.create({
      courseId: COURSE_ID,
      requestBody: {
        title: b.curt,
        description: `Qüestionari autocorrectiu de conceptes de la ${b.sa}, orientat al braç MeArm. `
          + '10 preguntes d\'opció múltiple (1 punt cadascuna) + una pregunta oberta.',
        workType: 'ASSIGNMENT', state: 'DRAFT', maxPoints: 10, topicId, gradeCategory: T2,
        materials: [{ link: { url: `https://docs.google.com/forms/d/${formId}/viewform` } }],
      } }), b.curt);
    results[`questionari_${b.sa}`] = tasca.data.alternateLink; desa();
    console.log(`✅ Tasca: ${b.curt}`);
  }

  // 5 · Rúbrica + producte
  const nomRub = 'Rúbrica Producte T2 · El braç robòtic MeArm (importable a Classroom)';
  if (!results.rubrica) {
    const r = await ambReintents(() => drive.files.create({
      requestBody: { name: nomRub, mimeType: 'application/vnd.google-apps.spreadsheet', parents: [DRIVE_FOLDER_ID] },
      media: { mimeType: 'text/csv', body: csvRubrica() }, fields: 'id, webViewLink' }), nomRub);
    results.rubrica = r.data.webViewLink; desa();
    console.log(`✅ Rúbrica: ${results.rubrica}`);
  }
  if (!existeix(PRODUCTE.titol)) {
    const r = await ambReintents(() => classroom.courses.courseWork.create({
      courseId: COURSE_ID,
      requestBody: {
        title: PRODUCTE.titol,
        description: PRODUCTE.descripcio + '\n\nRúbrica importable (per al docent): ' + results.rubrica,
        state: 'DRAFT', workType: 'ASSIGNMENT', maxPoints: 33, topicId, gradeCategory: T2,
        materials: MATERIALS.map(m => ({ link: { url: m.url } })),
      } }), PRODUCTE.titol);
    results.producte = r.data.alternateLink; desa();
    console.log(`✅ Tasca: ${PRODUCTE.titol}`);
  }

  console.log('\n🏁 Fet. Tot és en ESBORRANY al tema «MeArm»: publica-ho quan toqui.');
  console.log(JSON.stringify(results, null, 2));
}

main().catch(e => { console.error('❌', e.message); process.exit(1); });
