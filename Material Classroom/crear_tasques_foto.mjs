// Crea, per a cada pràctica, una tasca de Classroom «Foto · <títol de la pràctica>»
// on l'alumnat penja una foto de la pràctica funcionant. No té formulari ni nota.
// Les pràctiques surten de practiques_definicions.js (claus san-pN).
//
// Ús (des de Material Classroom/):
//   node crear_tasques_foto.mjs sa4                    -> simulació
//   node crear_tasques_foto.mjs sa4 --aplica           -> crea les tasques en DRAFT
//   node crear_tasques_foto.mjs sa4 --aplica --publica -> crea-les ja PUBLICADES
// Idempotent per títol: si la tasca ja existeix, no se'n crea cap altra.
// Resultats a resultats_tasques_foto.json ({ clau: { taskUrl, state } }).
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { google } from 'googleapis';
import { getAuthClient, trobaTascaPerTitol, ambReintents, COURSE_ID } from './_form_sa_lib.js';
import { PRACTIQUES } from './practiques_definicions.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const RESULTATS = path.join(__dirname, 'resultats_tasques_foto.json');
const b64 = (s) => Buffer.from(String(s)).toString('base64').replace(/=+$/, '');
const urlTasca = (id) => `https://classroom.google.com/c/${b64(COURSE_ID)}/a/${b64(id)}/details`;

export const PREFIX = 'Foto · ';
export const titolFoto = (def) => PREFIX + def.titol;
export const descripcioFoto = (def) =>
  `Fes una foto de la teva pràctica funcionant (${def.titol.split(' · ').slice(1).join(' · ')}) ` +
  'i penja-la aquí: «Afegeix o crea» → «Fitxer» (o fes-la amb la càmera del mòbil des de l’app de Classroom). ' +
  'Que es vegi sencer el muntatge i el braç, ben enfocat. Després, prem «Entrega».';

const [prefix, ...flags] = process.argv.slice(2);
const APLICA = flags.includes('--aplica');
const PUBLICA = flags.includes('--publica');
const claus = Object.keys(PRACTIQUES).filter(k => prefix && k.startsWith(prefix) && /-p\d+$/.test(k));
if (!claus.length) {
  console.error(`Cap pràctica amb el prefix «${prefix ?? ''}».`);
  process.exit(1);
}
const estat = PUBLICA ? 'PUBLISHED' : 'DRAFT';
console.log(`${APLICA ? 'APLICANT' : 'SIMULACIÓ'} · ${claus.length} tasques Foto · estat ${estat}\n`);
claus.forEach(k => console.log(`[${k}] ${titolFoto(PRACTIQUES[k])}`));
if (!APLICA) {
  console.log('\nRes creat. Afegeix --aplica (i --publica si les vols visibles ja).');
  process.exit(0);
}

const classroom = google.classroom({ version: 'v1', auth: await getAuthClient() });
const resultats = fs.existsSync(RESULTATS) ? JSON.parse(fs.readFileSync(RESULTATS, 'utf8')) : {};
const temes = (await ambReintents(
  () => classroom.courses.topics.list({ courseId: COURSE_ID }), 'llistar temes')).data.topic || [];

for (const k of claus) {
  const def = PRACTIQUES[k];
  const titol = titolFoto(def);
  let tasca = await trobaTascaPerTitol(classroom, titol);
  if (tasca) {
    console.log(`= Ja existeix: ${titol}`);
  } else {
    const tema = temes.find(t => t.name && t.name.toUpperCase().startsWith(def.sa.toUpperCase()));
    const cw = await ambReintents(() => classroom.courses.courseWork.create({
      courseId: COURSE_ID,
      requestBody: {
        title: titol,
        description: descripcioFoto(def),
        workType: 'ASSIGNMENT',
        state: estat,
        ...(tema ? { topicId: tema.topicId } : {}),
        materials: def.materials || []
      }
    }), 'crear la tasca Foto');
    tasca = cw.data;
    console.log(`+ Creada: ${titol}`);
  }
  resultats[k] = { taskUrl: tasca.alternateLink || urlTasca(tasca.id), state: tasca.state };
  fs.writeFileSync(RESULTATS, JSON.stringify(resultats, null, 2) + '\n');
}
console.log(`\nDesat a ${path.basename(RESULTATS)}.`);
