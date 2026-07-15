/*
 * Crea un Google Form (mode QÜESTIONARI, autocorrecció) per a cada banc de
 * conceptes `Classes/SAn/SAn_questionari_conceptes.md`. El .md és la FONT DE
 * VERITAT: aquest script el parseja (no re-transcriu preguntes) i crea el Form
 * amb la resposta correcta (negreta) i 1 punt per pregunta. Mou cada Form a la
 * carpeta Drive del curs. NO l'adjunta al Classroom (això es fa a part).
 *
 * Ús:
 *   node crear_questionaris_conceptes_forms.js            # descoberta (no crea res)
 *   APPLY=1 node crear_questionaris_conceptes_forms.js    # crea els Forms
 *   APPLY=1 SA=3 node ...                                 # només una SA
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { google } from 'googleapis';
import { getAuthClient, DRIVE_FOLDER_ID } from './_form_sa_lib.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const CLASSES = path.join(__dirname, '..', 'Classes');
const APPLY = process.env.APPLY === '1';
const ONLY = process.env.SA ? `SA${process.env.SA}` : null;

// Treu marques de markdown (negreta, codi) per obtenir text net per al Form.
const net = (s) => s.replace(/\*\*/g, '').replace(/`/g, '').trim();

// Parseja un banc: retorna { titol, preguntes:[{titol, opcions[], correcta}], oberta }
function parseBanc(md) {
  const lines = md.split(/\r?\n/);
  const h1 = (lines.find(l => l.startsWith('# ')) || '# Qüestionari').slice(2).trim();
  const preguntes = [];
  let q = null;
  let dinsPreguntes = false;
  let oberta = null;
  for (const ln of lines) {
    if (/^##\s+Preguntes/.test(ln)) { dinsPreguntes = true; continue; }
    if (/^##\s+Pregunta oberta/.test(ln)) { dinsPreguntes = false; }
    if (/^##\s+Clau/.test(ln) || /^##\s+Versió/.test(ln)) { dinsPreguntes = false; }

    const mOberta = ln.match(/^\s*11\.\s+(.*)/);
    if (mOberta && !dinsPreguntes && !oberta) oberta = net(mOberta[1]);

    if (!dinsPreguntes) continue;
    const mq = ln.match(/^\s{0,3}(\d{1,2})\.\s+(.*)/);
    if (mq && Number(mq[1]) >= 1 && Number(mq[1]) <= 10) {
      q = { titol: net(mq[2]), opcions: [], correcta: null };
      preguntes.push(q);
      continue;
    }
    const mo = ln.match(/^\s*-\s*([a-d])\)\s*(.*)/);
    if (mo && q) {
      const esCorrecta = /\*\*/.test(ln);
      const text = net(mo[2]);
      q.opcions.push(text);
      if (esCorrecta) q.correcta = text;
    }
  }
  return { titol: h1, preguntes, oberta };
}

// Construeix les peticions batchUpdate (camps inicials + 10 MC amb nota + oberta).
function requests(banc) {
  const reqs = [];
  let i = 0;
  const add = (item) => reqs.push({ createItem: { item, location: { index: i++ } } });

  add({ title: 'Nom i cognoms',
        questionItem: { question: { required: true, textQuestion: {} } } });
  add({ title: 'Grup/classe',
        questionItem: { question: { required: true, textQuestion: {} } } });

  for (const p of banc.preguntes) {
    add({
      title: p.titol,
      questionItem: {
        question: {
          required: true,
          choiceQuestion: { type: 'RADIO', options: p.opcions.map(o => ({ value: o })) },
          grading: {
            pointValue: 1,
            correctAnswers: { answers: [{ value: p.correcta }] },
          },
        },
      },
    });
  }
  if (banc.oberta) {
    add({ title: banc.oberta,
          questionItem: { question: { required: false, textQuestion: { paragraph: true } } } });
  }
  return reqs;
}

async function main() {
  const auth = await getAuthClient();
  const forms = google.forms({ version: 'v1', auth });
  const drive = google.drive({ version: 'v3', auth });

  const resultats = [];
  for (let n = 1; n <= 9; n++) {
    const sa = `SA${n}`;
    if (ONLY && ONLY !== sa) continue;
    const f = path.join(CLASSES, sa, `${sa}_questionari_conceptes.md`);
    if (!fs.existsSync(f)) { console.log(`  ⚠ falta ${sa}`); continue; }
    const banc = parseBanc(fs.readFileSync(f, 'utf8'));

    // Validació abans de crear res.
    const problemes = [];
    if (banc.preguntes.length !== 10) problemes.push(`${banc.preguntes.length} preguntes`);
    banc.preguntes.forEach((p, idx) => {
      if (p.opcions.length !== 4) problemes.push(`Q${idx + 1}: ${p.opcions.length} opcions`);
      if (!p.correcta) problemes.push(`Q${idx + 1}: sense correcta`);
    });
    if (problemes.length) {
      console.log(`  ❌ ${sa}: ${problemes.join(', ')} — no el creo`);
      continue;
    }
    console.log(`  ✔ ${sa}: "${banc.titol}" — 10 preguntes, correctes OK` +
                (banc.oberta ? ' + oberta' : ''));

    if (!APPLY) continue;

    const created = await forms.forms.create({
      requestBody: { info: { title: banc.titol, documentTitle: banc.titol } },
    });
    const formId = created.data.formId;
    // 1) activa mode qüestionari
    await forms.forms.batchUpdate({
      formId,
      requestBody: { requests: [{
        updateSettings: {
          settings: { quizSettings: { isQuiz: true } },
          updateMask: 'quizSettings.isQuiz',
        },
      }] },
    });
    // 2) afegeix camps + preguntes amb nota
    await forms.forms.batchUpdate({ formId, requestBody: { requests: requests(banc) } });
    // 3) mou a la carpeta del curs
    const meta = await drive.files.get({ fileId: formId, fields: 'parents' });
    await drive.files.update({
      fileId: formId,
      addParents: DRIVE_FOLDER_ID,
      removeParents: (meta.data.parents || []).join(','),
      fields: 'id, parents',
    });
    const info = await forms.forms.get({ formId });
    resultats.push({ sa, edit: `https://docs.google.com/forms/d/${formId}/edit`,
                     respon: info.data.responderUri });
    console.log(`    ✅ creat i mogut a Drive`);
  }

  if (resultats.length) {
    console.log('\n=== Forms creats ===');
    for (const r of resultats) console.log(`${r.sa}: edició ${r.edit}\n     respon ${r.respon}`);
  }
  if (!APPLY) console.log('\n🔎 Mode descoberta. Executa amb APPLY=1 per crear-los.');
}

main().catch(e => { console.error('❌', e.message); process.exit(1); });
