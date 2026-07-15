import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { google } from 'googleapis';
import { authenticate } from '@google-cloud/local-auth';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SCOPES = [
  'https://www.googleapis.com/auth/drive',
  'https://www.googleapis.com/auth/classroom.coursework.students',
  'https://www.googleapis.com/auth/classroom.courseworkmaterials',
  'https://www.googleapis.com/auth/classroom.courses.readonly',
  'https://www.googleapis.com/auth/classroom.announcements',
];

const CREDENTIALS_PATH = path.join(__dirname, 'credentials.json');
const TOKEN_PATH = path.join(__dirname, 'token.json');

const COURSE_ID = '868858694512';  // id numèric API (la URL /c/ODY4… és base64)

// Els dos PDF locals que han de substituir el contingut HTML a Drive.
// Es fan servir per emparellar per nom i per pujar el contingut nou.
const PDFS = [
  { pdf: 'Fitxes_Arduino_UNO.pdf',        match: /fitx|visual/i },
  { pdf: 'Blocs_Programacio_Offline.pdf', match: /bloc|offline/i },
];

// Passa APPLY=1 per aplicar els canvis; sense la variable, només descobreix.
const APPLY = process.env.APPLY === '1';

async function getAuthClient() {
  if (fs.existsSync(TOKEN_PATH)) {
    return google.auth.fromJSON(JSON.parse(fs.readFileSync(TOKEN_PATH, 'utf8')));
  }
  console.log('🔄 Autenticant per primera vegada amb Google...');
  const client = await authenticate({ scopes: SCOPES, keyfilePath: CREDENTIALS_PATH });
  if (client.credentials) {
    const keys = JSON.parse(fs.readFileSync(CREDENTIALS_PATH, 'utf8'));
    const key = keys.installed || keys.web;
    fs.writeFileSync(TOKEN_PATH, JSON.stringify({
      type: 'authorized_user',
      client_id: key.client_id,
      client_secret: key.client_secret,
      refresh_token: client.credentials.refresh_token,
    }));
  }
  return client;
}

// Recorre coursework + courseWorkMaterials + announcements i retorna tots els
// adjunts driveFile amb el context (on són).
async function recollirAdjunts(classroom) {
  const trobats = [];

  const push = (origen, titol, id, materials) => {
    for (const m of materials || []) {
      if (m.driveFile && m.driveFile.driveFile) {
        const df = m.driveFile.driveFile;
        trobats.push({ origen, titol, itemId: id, fileId: df.id, fileTitle: df.title });
      }
    }
  };

  const cw = await classroom.courses.courseWork.list({ courseId: COURSE_ID, pageSize: 100 });
  for (const w of cw.data.courseWork || []) push('courseWork', w.title, w.id, w.materials);

  const cwm = await classroom.courses.courseWorkMaterials.list({ courseId: COURSE_ID, pageSize: 100 });
  for (const w of cwm.data.courseWorkMaterial || []) push('courseWorkMaterial', w.title, w.id, w.materials);

  const ann = await classroom.courses.announcements.list({ courseId: COURSE_ID, pageSize: 100 });
  for (const a of ann.data.announcements || []) push('announcement', (a.text || '').slice(0, 40), a.id, a.materials);

  return trobats;
}

async function main() {
  const auth = await getAuthClient();
  const classroom = google.classroom({ version: 'v1', auth });
  const drive = google.drive({ version: 'v3', auth });

  const adjunts = await recollirAdjunts(classroom);
  console.log(`\n📎 ${adjunts.length} adjunts driveFile al curs:\n`);
  for (const a of adjunts) {
    console.log(`  [${a.origen}] "${a.titol}"`);
    console.log(`     fitxer: "${a.fileTitle}"  fileId=${a.fileId}`);
  }

  // Emparella cada PDF amb l'adjunt HTML corresponent (per nom del fitxer).
  const plans = [];
  for (const { pdf, match } of PDFS) {
    const cand = adjunts.filter(a => match.test(a.fileTitle || '') || match.test(a.titol || ''));
    plans.push({ pdf, match, cand });
  }

  console.log('\n🎯 Emparellament PDF ↔ adjunt:\n');
  for (const p of plans) {
    if (p.cand.length === 0) {
      console.log(`  ⚠ ${p.pdf}: cap adjunt coincident (${p.match})`);
    } else {
      for (const c of p.cand) {
        console.log(`  ${p.pdf}  →  fileId=${c.fileId}  ("${c.fileTitle}", ${c.origen} "${c.titol}")`);
      }
    }
  }

  if (!APPLY) {
    console.log('\n🔎 Mode descoberta (sense canvis). Torna a executar amb APPLY=1 per substituir.');
    return;
  }

  console.log('\n✍️  APPLY=1 — recreant els materials amb PDF...\n');
  // Llista fresca de materials per detectar duplicats ja creats.
  const cwmCache = (await classroom.courses.courseWorkMaterials.list({
    courseId: COURSE_ID, pageSize: 100,
  })).data;
  // El token només té drive.file: no pot modificar els HTML pujats a mà.
  // Estratègia: puja un PDF nou (propietat de l'app) → crea un material nou
  // amb el mateix títol/descripció/tema → esborra el material HTML antic.
  for (const p of plans) {
    if (p.cand.length !== 1 || p.cand[0].origen !== 'courseWorkMaterial') {
      console.log(`  ⏭  ${p.pdf}: ${p.cand.length} candidats (o no és courseWorkMaterial), no toco.`);
      continue;
    }
    const c = p.cand[0];
    const old = (await classroom.courses.courseWorkMaterials.get({
      courseId: COURSE_ID, id: c.itemId,
    })).data;

    // Guard anti-duplicat: si ja existeix un material amb el mateix títol i un
    // adjunt PDF, no en tornem a crear (execució repetida després d'un error).
    const jaExisteix = (cwmCache.courseWorkMaterial || []).some(w =>
      w.title === old.title && (w.materials || []).some(m =>
        m.driveFile?.driveFile?.title?.toLowerCase().endsWith('.pdf')));
    if (jaExisteix) {
      console.log(`  ⏭  "${old.title}": ja té un material PDF, no en creo un altre.`);
      continue;
    }

    // 1) puja el PDF nou (l'app n'és propietària → drive.file el pot adjuntar)
    const up = await drive.files.create({
      requestBody: { name: p.pdf },
      media: { mimeType: 'application/pdf', body: fs.createReadStream(path.join(__dirname, p.pdf)) },
      fields: 'id',
    });
    const newFileId = up.data.id;

    // 2) crea el material nou amb el mateix títol/descripció/tema
    const created = await classroom.courses.courseWorkMaterials.create({
      courseId: COURSE_ID,
      requestBody: {
        title: old.title,
        description: old.description,
        state: 'PUBLISHED',
        ...(old.topicId ? { topicId: old.topicId } : {}),
        materials: [{ driveFile: { driveFile: { id: newFileId }, shareMode: 'VIEW' } }],
      },
    });
    console.log(`  ✅ "${old.title}"`);
    console.log(`       nou material id=${created.data.id}  (PDF fileId=${newFileId})`);

    // 3) intenta esborrar el material HTML antic (falla si el va crear un
    // altre projecte, p. ex. pujat a mà des del web: ho farà el docent).
    try {
      await classroom.courses.courseWorkMaterials.delete({ courseId: COURSE_ID, id: c.itemId });
      console.log(`       esborrat material HTML antic id=${c.itemId}`);
    } catch (e) {
      console.log(`       ⚠ no puc esborrar l'HTML antic id=${c.itemId} (${e.message}). Esborra'l tu al Classroom.`);
    }
  }
  console.log('\nFet. Refresca el Classroom: els materials ara mostren el PDF.');
}

main().catch(e => { console.error('❌', e.message); process.exit(1); });
