// Actualitza EN PLACE el Form de la fitxa base d'una SA perquè torni a coincidir amb
// la seva definició a sa_definicions.js. No crea cap Form nou: conserva l'enllaç,
// la tasca i la carpeta. ⚠️ Esborra i recrea TOTS els elements (IDs nous): els
// esborranys desats de l'alumnat es perden. Per això les SA ja migrades al format
// de passos (SA_MIGRADES) queden bloquejades: es toquen amb el seu script propi
// (SA2: transicio_sa2_s1.mjs) o, si de debò cal, amb --forca.
//
// Ús (des de Material Classroom/):
//   node actualitzar_form_fitxa_sa.mjs sa3            -> només mostra què canviaria
//   node actualitzar_form_fitxa_sa.mjs sa3 --aplica   -> substitueix les preguntes
//   ... sa3 --form=https://docs.google.com/forms/d/<id>/edit  -> si la tasca només duu
//       l'enllaç de resposta (Forms creats amb l'antic projecte OAuth)
//
// Les preguntes es substitueixen totes en un sol batchUpdate (atòmic). Les respostes
// ja enviades a preguntes esborrades es perden del Form: per això, si hi ha lliuraments
// TURNED_IN a Classroom, s'atura (força-ho amb --forca). L'app no té l'scope de
// lectura de respostes del Form; el recompte de Classroom és l'indicador disponible.
import { google } from 'googleapis';
import { getAuthClient, ambReintents, itemToRequest, trobaTascaPerTitol, COURSE_ID } from './_form_sa_lib.js';
import { DEFINICIONS } from './sa_definicions.js';

const [saKey, ...flags] = process.argv.slice(2);
const APLICA = flags.includes('--aplica');
const FORCA = flags.includes('--forca');

const titolItem = (it) => it.title ?? '(sense títol)';

// SA amb Form ja transformat per a passos autònoms: no s'han de recrear.
export const SA_MIGRADES = new Set(['sa2', 'sa3', 'sa4', 'sa5']);

async function main() {
  const def = DEFINICIONS[saKey];
  if (!def) throw new Error(`Cap definició «${saKey}» a sa_definicions.js (${Object.keys(DEFINICIONS).join(', ')}).`);
  if (SA_MIGRADES.has(saKey) && !FORCA) {
    throw new Error(`${saKey} ja està migrada al format de passos: aquest script en recrearia TOTS els elements i l'alumnat perdria els esborranys. Fes servir el seu script propi o afegeix --forca.`);
  }

  const auth = await getAuthClient();
  const drive = google.drive({ version: 'v3', auth });
  const forms = google.forms({ version: 'v1', auth });
  const classroom = google.classroom({ version: 'v1', auth });

  // El Form es localitza primer pel material adjunt de la tasca (fiable encara que
  // s'hagi reanomenat al Drive); si no n'hi ha, pel títol al Drive.
  const trobada = await trobaTascaPerTitol(classroom, def.titol);  // només id/títol/estat
  const tasca = trobada && (await ambReintents(() => classroom.courses.courseWork.get({
    courseId: COURSE_ID, id: trobada.id
  }), 'llegir tasca')).data;
  // --form=<URL d'edició o id>: per a tasques que només porten l'enllaç de resposta
  // (/forms/d/e/...), que no és l'id d'edició i l'API no sap resoldre.
  const formArg = flags.find(f => f.startsWith('--form='))?.slice(7);
  let formId = formArg?.match(/\/forms\/d\/([\w-]+)/)?.[1] || formArg || (tasca?.materials || [])
    .map(m => m.form?.formUrl?.match(/\/forms\/d\/([\w-]+)/)?.[1]).find(Boolean);
  if (formId === 'e') throw new Error("Això és l'enllaç de resposta (/forms/d/e/...). Cal el d'edició: obre el Form i copia l'URL acabada en /edit.");
  if (!formId) {
    const search = await ambReintents(() => drive.files.list({
      q: `name = '${def.titol.replace(/'/g, "\\'")}' and mimeType = 'application/vnd.google-apps.form' and trashed = false`,
      fields: 'files(id, name)'
    }), 'cercar Form');
    const fitxers = search.data.files || [];
    if (!fitxers.length) throw new Error(`No s'ha trobat cap Form «${def.titol}» (ni a la tasca ni al Drive; scope drive.file).`);
    if (fitxers.length > 1) throw new Error(`${fitxers.length} Forms amb el títol «${def.titol}»: resol el duplicat a mà.`);
    formId = fitxers[0].id;
  }

  const form = (await ambReintents(() => forms.forms.get({ formId }), 'llegir Form')).data;
  const actuals = form.items || [];
  console.log(`\n=== ${def.titol} (Form ${formId}) ===`);
  console.log(`\nACTUAL (${actuals.length} elements):`);
  actuals.forEach((it, i) => console.log(`  ${String(i + 1).padStart(2)}. ${titolItem(it)}`));
  console.log(`\nNOU (${def.items.length} elements, de sa_definicions.js):`);
  def.items.forEach((it, i) => console.log(`  ${String(i + 1).padStart(2)}. ${it.titol}`));

  let lliurats = 0;
  if (tasca) {
    const subs = await ambReintents(() => classroom.courses.courseWork.studentSubmissions.list({
      courseId: COURSE_ID, courseWorkId: tasca.id, pageSize: 100
    }), 'llistar lliuraments');
    lliurats = (subs.data.studentSubmissions || []).filter(s => s.state === 'TURNED_IN' || s.state === 'RETURNED').length;
    console.log(`\nTasca de Classroom: ${tasca.alternateLink} · lliuraments enviats: ${lliurats}`);
    if (tasca.description !== def.descripcioTasca) console.log('  (la descripció de la tasca també s\'actualitzarà)');
  } else {
    console.log('\n⚠️  Cap tasca de Classroom amb aquest títol: només s\'actualitza el Form.');
  }

  if (!APLICA) { console.log('\nSimulació: no s\'ha canviat res. Torna-ho a executar amb --aplica.'); return; }
  if (lliurats > 0 && !FORCA) throw new Error(`Hi ha ${lliurats} lliuraments enviats: les seves respostes a preguntes esborrades es perdrien. Afegeix --forca si ho vols igualment.`);

  // Esborra de l'últim al primer (els índexs es desplacen) i recrea en ordre.
  const requests = [
    { updateFormInfo: { info: { description: def.descripcioForm }, updateMask: 'description' } },
    ...actuals.map((_, i) => ({ deleteItem: { location: { index: actuals.length - 1 - i } } })),
    ...def.items.map((it, i) => itemToRequest(it, i))
  ];
  await ambReintents(() => forms.forms.batchUpdate({ formId, requestBody: { requests } }), 'substituir preguntes');
  console.log(`\n✅ Form actualitzat: ${actuals.length} elements fora, ${def.items.length} de nous.`);

  if (tasca && tasca.description !== def.descripcioTasca) {
    try {
      await ambReintents(() => classroom.courses.courseWork.patch({
        courseId: COURSE_ID, id: tasca.id, updateMask: 'description',
        requestBody: { description: def.descripcioTasca }
      }), 'actualitzar descripció de la tasca');
      console.log('✅ Descripció de la tasca actualitzada.');
    } catch (err) {
      // Classroom només deixa editar tasques creades pel mateix projecte OAuth
      // (les d'abans del client nou, 2026-10-31, no ho són).
      if (!/ProjectPermissionDenied/.test(err.message)) throw err;
      console.log(`⚠️  La tasca la va crear un altre projecte OAuth: canvia la descripció a mà a Classroom:\n   ${def.descripcioTasca}`);
    }
  }
}

main().catch(err => { console.error(`❌ ${err.message}`); process.exit(1); });
