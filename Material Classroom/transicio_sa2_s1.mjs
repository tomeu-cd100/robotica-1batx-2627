// Transició del Form únic de la SA2 al format «un per pràctica» (2026-11-03).
// El Form actual passa a ser «SA2 · Sessió 1 — El semàfor»: es conserven els
// elements de la S1 (i els esborranys que l'alumnat hi té desats) i s'esborren,
// UN A UN PER ÍNDEX, els d'«Activitat 2» fins al final (S2, S3, autoavaluació,
// quadern). No es recrea res: NO facis servir actualitzar_form_fitxa_sa.mjs sa2,
// que substitueix TOTS els elements.
//
// Ús (des de Material Classroom/):
//   node transicio_sa2_s1.mjs            -> simulació
//   node transicio_sa2_s1.mjs --aplica   -> aplica (s'atura si hi ha lliuraments enviats)
//   ... --forca                          -> aplica encara que hi hagi lliuraments o no es puguin llegir
//
// La tasca de Classroom es va crear amb l'antic projecte OAuth: l'API no en pot
// canviar el títol ni la descripció (ProjectPermissionDenied). L'script imprimeix
// el text per enganxar-lo a mà.
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { google } from 'googleapis';
import { getAuthClient, ambReintents, trobaTascaPerTitol, COURSE_ID } from './_form_sa_lib.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const flags = process.argv.slice(2);
const APLICA = flags.includes('--aplica');
const FORCA = flags.includes('--forca');

const TITOL_VELL = 'SA2 · Fitxa base — Sortides digitals i PWM';
export const TITOL_NOU = 'SA2 · Sessió 1 — El semàfor';
export const DESCRIPCIO_NOVA = "Respostes de la Sessió 1 (semàfor, Racó de mesura i fase nocturna). Envia-ho a l'inici de la Sessió 2, tal com ho tinguis.";
const PRIMER_A_ESBORRAR = 'Activitat 2';

const titolItem = (it) => it.title ?? '(sense títol)';

function textManual() {
  console.log('\n📋 A mà a Classroom (tasca de la SA2 → Edita):');
  console.log(`   Títol:       ${TITOL_NOU}`);
  console.log(`   Instruccions: ${DESCRIPCIO_NOVA}`);
}

async function main() {
  const res = JSON.parse(fs.readFileSync(path.join(__dirname, 'resultats_sa1a9.json'), 'utf8'));
  const formId = res.sa2?.formId;
  if (!formId) throw new Error('resultats_sa1a9.json no té sa2.formId.');

  const auth = await getAuthClient();
  const forms = google.forms({ version: 'v1', auth });
  const classroom = google.classroom({ version: 'v1', auth });

  const form = (await ambReintents(() => forms.forms.get({ formId }), 'llegir Form')).data;
  const items = form.items || [];
  const inici = items.findIndex(it => titolItem(it).startsWith(PRIMER_A_ESBORRAR));
  console.log(`\n=== ${form.info?.title} (Form ${formId}) · ${items.length} elements ===`);
  if (inici === -1) {
    console.log(`\nCap element «${PRIMER_A_ESBORRAR}…»: la transició ja està aplicada. No es fa res.`);
    textManual();
    return;
  }
  console.log('\nES CONSERVEN:');
  items.slice(0, inici).forEach((it, i) => console.log(`  ${String(i + 1).padStart(2)}. ${titolItem(it)}`));
  console.log("\nS'ESBORREN:");
  items.slice(inici).forEach((it, i) => console.log(`  ${String(inici + i + 1).padStart(2)}. ${titolItem(it)}`));

  // Guard: lliuraments enviats perdrien les respostes de les preguntes esborrades.
  let lliurats = null;
  const tasca = (await trobaTascaPerTitol(classroom, TITOL_VELL)) || (await trobaTascaPerTitol(classroom, TITOL_NOU));
  if (tasca) {
    try {
      const subs = await ambReintents(() => classroom.courses.courseWork.studentSubmissions.list({
        courseId: COURSE_ID, courseWorkId: tasca.id, pageSize: 100
      }), 'llistar lliuraments');
      lliurats = (subs.data.studentSubmissions || [])
        .filter(s => s.state === 'TURNED_IN' || s.state === 'RETURNED').length;
    } catch (e) {
      console.log(`\n⚠️  No es poden llegir els lliuraments (${e.message}).`);
    }
    console.log(`\nTasca: ${tasca.alternateLink} · lliuraments enviats: ${lliurats ?? 'desconegut'}`);
  } else {
    console.log('\n⚠️  No trobo la tasca de Classroom pel títol.');
  }

  if (!APLICA) {
    console.log('\nSIMULACIÓ: res canviat. Afegeix --aplica per aplicar-ho.');
    textManual();
    return;
  }
  if (lliurats !== 0 && !FORCA) {
    throw new Error(`Lliuraments enviats: ${lliurats ?? 'desconegut'}. Les seves respostes a les preguntes esborrades es perdrien. Afegeix --forca si ho vols igualment.`);
  }

  const requests = [
    { updateFormInfo: { info: { title: TITOL_NOU, description: DESCRIPCIO_NOVA }, updateMask: 'title,description' } },
    // índexs en ordre descendent perquè cada esborrat no desplaci els següents
    ...items.slice(inici).map((_, i) => ({ deleteItem: { location: { index: items.length - 1 - i } } })),
  ];
  await ambReintents(() => forms.forms.batchUpdate({ formId, requestBody: { requests } }), 'batchUpdate');
  const despres = (await ambReintents(() => forms.forms.get({ formId }), 'rellegir Form')).data;
  console.log(`\n✅ Fet: «${despres.info?.title}» · ${(despres.items || []).length} elements.`);
  textManual();
}

main().catch(e => { console.error(`\n❌ ${e.message}`); process.exit(1); });
