/*
 * Adjunta els 9 Forms de conceptes com a TASCA amb nota (/10) al Classroom,
 * en ESBORRANY (DRAFT) i a la categoria de nota del trimestre corresponent:
 *   T1: SA1,2,3   T2: SA4,5,6   T3: SA7,8,9
 * Es creen en esborrany perquè el docent els publiqui quan toqui cada SA
 * (evita mostrar als alumnes qüestionaris de SA futures).
 *
 * Ús:
 *   node adjuntar_questionaris_classroom.js           # descoberta
 *   APPLY=1 node adjuntar_questionaris_classroom.js   # crea les tasques (draft)
 */
import { google } from 'googleapis';
import { getAuthClient, COURSE_ID, DRIVE_FOLDER_ID } from './_form_sa_lib.js';

const APPLY = process.env.APPLY === '1';

// SA -> categoria de nota (trimestre)
const CAT = {
  1: { id: '870540828382', name: 'T1' }, 2: { id: '870540828382', name: 'T1' }, 3: { id: '870540828382', name: 'T1' },
  4: { id: '870540828383', name: 'T2' }, 5: { id: '870540828383', name: 'T2' }, 6: { id: '870540828383', name: 'T2' },
  7: { id: '870540828384', name: 'T3' }, 8: { id: '870540828384', name: 'T3' }, 9: { id: '870540828384', name: 'T3' },
};

async function main() {
  const auth = await getAuthClient();
  const drive = google.drive({ version: 'v3', auth });
  const classroom = google.classroom({ version: 'v1', auth });
  const forms = google.forms({ version: 'v1', auth });

  // Localitza els Forms de conceptes a la carpeta del curs.
  const res = await drive.files.list({
    q: `'${DRIVE_FOLDER_ID}' in parents and mimeType='application/vnd.google-apps.form' and trashed=false`,
    fields: 'files(id,name)', pageSize: 100,
  });
  const trobats = {};
  for (const f of res.data.files || []) {
    const m = f.name.match(/^SA(\d)\b.*Qüestionari de conceptes/i);
    if (m) trobats[Number(m[1])] = f;
  }

  // Evita duplicats: mira les tasques existents amb el mateix títol.
  const cw = await classroom.courses.courseWork.list({ courseId: COURSE_ID, pageSize: 100 });
  const titolsExistents = new Set((cw.data.courseWork || []).map(w => w.title));

  const plans = [];
  for (let n = 1; n <= 9; n++) {
    const f = trobats[n];
    if (!f) { console.log(`  ⚠ SA${n}: no trobo el Form a Drive`); continue; }
    const titol = `SA${n} · Qüestionari de conceptes`;
    plans.push({ n, fileId: f.id, name: f.name, titol,
                 dup: titolsExistents.has(titol), cat: CAT[n] });
  }

  console.log('\n🎯 Pla:');
  for (const p of plans) {
    console.log(`  SA${p.n} → "${p.titol}"  [${p.cat.name}, /10, DRAFT]` +
                (p.dup ? '  ⏭ JA EXISTEIX (salto)' : ''));
  }

  if (!APPLY) { console.log('\n🔎 Descoberta. APPLY=1 per crear les tasques.'); return; }

  for (const p of plans) {
    if (p.dup) continue;
    // URL CANÒNICA del Form (/d/{id}/viewform): Classroom la reconeix com un
    // Form natiu (materials.form) i permet importar-ne les notes. La URL
    // publicada /e/.../viewform NO funciona (queda com a enllaç genèric).
    const url = `https://docs.google.com/forms/d/${p.fileId}/viewform`;
    await classroom.courses.courseWork.create({
      courseId: COURSE_ID,
      requestBody: {
        title: p.titol,
        description: `Qüestionari autocorrectiu de conceptes de la SA${p.n}. `
          + `10 preguntes d'opció múltiple (1 punt cadascuna) + una pregunta oberta. `
          + `Es corregeix automàticament dins el formulari.`,
        workType: 'ASSIGNMENT',
        state: 'DRAFT',
        maxPoints: 10,
        gradeCategory: { id: p.cat.id, name: p.cat.name },
        assigneeMode: 'ALL_STUDENTS',
        materials: [{ link: { url } }],
      },
    });
    console.log(`  ✅ SA${p.n}: tasca creada (draft, ${p.cat.name}, /10)`);
  }
  console.log('\nFet. Són esborranys: publica cada tasca quan comenci la seva SA.');
}

main().catch(e => { console.error('❌', e.message); process.exit(1); });
