/*
 * Crea materials de Classroom (courseWorkMaterials) que són ENLLAÇOS al web
 * publicat — sense Forms ni fitxers de Drive. Idempotent: si ja existeix un
 * material amb el mateix títol (esborranys inclosos), el salta.
 *
 * Es creen com a DRAFT: el docent els publica quan toca (coherent amb la
 * resta de material del 3r trimestre).
 *
 * Ús:  node crear_materials_enllac.js
 */
import { google } from 'googleapis';
import { getAuthClient, ambReintents } from './_form_sa_lib.js';
import { COURSE_ID, WEB_BASE } from './config.js';

// Dades declaratives: afegir aquí els materials-enllaç nous del curs.
// topicId: id del tema (node estat_classroom.js els llista).
const MATERIALS = [
  {
    titol: 'SA8 · Auditoria d\'un producte IoT real (S2)',
    descripcio: 'Targetes de producte i informe d\'auditoria de la sessió 2: '
      + 'feu d\'auditors de privacitat d\'un producte IoT real (diagrama, dades, '
      + 'riscos i recomanacions) i defenseu l\'informe al peritatge creuat.',
    url: `${WEB_BASE}/sa8/sa8-auditoria-iot.html`,
    topicId: '870512485238', // SA8 · IoT i IA
  },
  {
    titol: '📡 Repàs exprés de la ràdio micro:bit (abans de la SA8)',
    descripcio: 'Targeta de 10 minuts per recuperar la ràdio de la SA5 abans '
      + 'de començar la telemetria: les 5 línies clau, el patró emissor/receptor '
      + 'i un autotest amb solucions.',
    url: `${WEB_BASE}/00-general/00-repas-expres-radio.html`,
    topicId: '870512485238', // SA8 · IoT i IA
  },
];

async function main() {
  const auth = await getAuthClient();
  const classroom = google.classroom({ version: 'v1', auth });

  // Materials existents (per títol) per no duplicar en reexecutar.
  const existents = new Set();
  let pageToken;
  do {
    const res = await ambReintents(
      () => classroom.courses.courseWorkMaterials.list({
        courseId: COURSE_ID,
        courseWorkMaterialStates: ['PUBLISHED', 'DRAFT'],
        pageSize: 100,
        pageToken,
      }), 'llistar materials');
    for (const m of res.data.courseWorkMaterial || []) existents.add(m.title);
    pageToken = res.data.nextPageToken;
  } while (pageToken);

  for (const m of MATERIALS) {
    if (existents.has(m.titol)) {
      console.log(`↷ Ja existeix, saltat: ${m.titol}`);
      continue;
    }
    const res = await ambReintents(
      () => classroom.courses.courseWorkMaterials.create({
        courseId: COURSE_ID,
        requestBody: {
          title: m.titol,
          description: m.descripcio,
          state: 'DRAFT',
          topicId: m.topicId,
          materials: [{ link: { url: m.url } }],
        },
      }), `crear material «${m.titol}»`);
    console.log(`✅ Creat (DRAFT): ${m.titol}\n   ${res.data.alternateLink}`);
  }
  console.log('\nFet. Publica\'ls des del Classroom quan toqui.');
}

main().catch(e => { console.error('❌', e.message); process.exit(1); });
