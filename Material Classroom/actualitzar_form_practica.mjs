// Actualitza EN PLACE una tasca «un per pràctica» ja creada perquè torni a
// coincidir amb la seva definició a practiques_definicions.js: títol i
// descripció de la tasca, i títol, descripció i preguntes del Form.
// Pensat per a tasques creades amb el client OAuth actual (les antigues donen
// ProjectPermissionDenied). Si la definició té `titolVell`, la tasca i el Form
// es busquen pel títol vell (canvi de nom).
//
// Ús (des de Material Classroom/):
//   node actualitzar_form_practica.mjs sa3-p4            -> simulació
//   node actualitzar_form_practica.mjs sa3-p4 --aplica   -> aplica
//   ... --forca  -> encara que hi hagi lliuraments enviats (es perdrien respostes)
//
// Les preguntes es substitueixen totes (esborrar + crear) en un sol batchUpdate.
import { google } from 'googleapis';
import { getAuthClient, ambReintents, itemToRequest, trobaTascaPerTitol, COURSE_ID } from './_form_sa_lib.js';
import { PRACTIQUES } from './practiques_definicions.js';

const [clau, ...flags] = process.argv.slice(2);
const APLICA = flags.includes('--aplica');
const FORCA = flags.includes('--forca');

async function main() {
  const def = PRACTIQUES[clau];
  if (!def) throw new Error(`Cap pràctica «${clau}» (${Object.keys(PRACTIQUES).join(', ')}).`);
  const auth = await getAuthClient();
  const forms = google.forms({ version: 'v1', auth });
  const drive = google.drive({ version: 'v3', auth });
  const classroom = google.classroom({ version: 'v1', auth });

  const titolCerca = def.titolVell || def.titol;
  const tasca = (await trobaTascaPerTitol(classroom, titolCerca)) || (await trobaTascaPerTitol(classroom, def.titol));
  if (!tasca) throw new Error(`No trobo la tasca «${titolCerca}» ni «${def.titol}».`);

  let formFitxer = null;
  for (const nom of [titolCerca, def.titol]) {
    const r = await ambReintents(() => drive.files.list({
      q: `name = '${nom.replace(/'/g, "\\'")}' and mimeType = 'application/vnd.google-apps.form' and trashed = false`,
      fields: 'files(id, name)'
    }), 'cercar Form');
    if ((r.data.files || []).length === 1) { formFitxer = r.data.files[0]; break; }
    if ((r.data.files || []).length > 1) throw new Error(`Hi ha ${r.data.files.length} Forms «${nom}»: resol-ho a mà.`);
  }
  if (!formFitxer) throw new Error(`No trobo el Form «${titolCerca}» a Drive.`);
  const form = (await ambReintents(() => forms.forms.get({ formId: formFitxer.id }), 'llegir Form')).data;
  const actuals = form.items || [];

  const subs = await ambReintents(() => classroom.courses.courseWork.studentSubmissions.list({
    courseId: COURSE_ID, courseWorkId: tasca.id, pageSize: 100
  }), 'llistar lliuraments');
  const lliurats = (subs.data.studentSubmissions || []).filter(s => ['TURNED_IN', 'RETURNED'].includes(s.state)).length;

  console.log(`\n=== ${clau} ===`);
  console.log(`Tasca: «${tasca.title}» → «${def.titol}» · lliuraments enviats: ${lliurats}`);
  console.log(`Form «${form.info?.title}»: ${actuals.length} elements → ${def.items.length}`);
  def.items.forEach((it, i) => console.log(`   ${String(i + 1).padStart(2)}. ${it.titol}`));

  if (!APLICA) { console.log('\nSIMULACIÓ: res canviat. Afegeix --aplica.'); return; }
  if (lliurats > 0 && !FORCA) throw new Error(`Hi ha ${lliurats} lliuraments enviats: es perdrien respostes. Afegeix --forca si ho vols igualment.`);

  const requests = [
    { updateFormInfo: { info: { title: def.titol, description: def.descripcioForm }, updateMask: 'title,description' } },
    ...actuals.map((_, i) => ({ deleteItem: { location: { index: actuals.length - 1 - i } } })),
    ...def.items.map((it, i) => itemToRequest(it, i)),
  ];
  await ambReintents(() => forms.forms.batchUpdate({ formId: formFitxer.id, requestBody: { requests } }), 'batchUpdate Form');
  await ambReintents(() => drive.files.update({ fileId: formFitxer.id, requestBody: { name: def.titol } }), 'reanomenar Form');
  await ambReintents(() => classroom.courses.courseWork.patch({
    courseId: COURSE_ID, id: tasca.id, updateMask: 'title,description',
    requestBody: { title: def.titol, description: def.descripcioTasca }
  }), 'actualitzar tasca');
  console.log(`\n✅ Fet: tasca i Form «${def.titol}» actualitzats.`);
}

main().catch(e => { console.error(`\n❌ ${e.message}`); process.exit(1); });
