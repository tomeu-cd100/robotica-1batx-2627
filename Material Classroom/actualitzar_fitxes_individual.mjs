// Actualitza al Classroom les fitxes SA1-SA9 ja publicades perquè siguin
// INDIVIDUALS (vegeu `Programació didàctica/04_Metodologia.md` §4.3).
//
// NO crea res: modifica els Forms i les tasques que ja existeixen, llegint-ne
// els ids de resultats_sa1a9.json. Republicar-les amb crear_i_penjar_sa1a9.js
// deixaria DUPLICATS al curs, que és el que aquest script evita.
//
// Ús:  node actualitzar_fitxes_individual.mjs            (simulació: no toca res)
//      node actualitzar_fitxes_individual.mjs --aplica   (aplica els canvis)
//
// Què fa:
//   1. Forms SA1-SA8: elimina la pregunta «Parella (nom, si treballes en parella)».
//   2. Form SA9: títol/descripció i les preguntes d'equip → individuals.
//   3. Tasques (courseWork) SA1-SA9: actualitza la descripció des de sa_definicions.js.
//
// SEGURETAT: si un Form té respostes, NO li esborra cap pregunta (esborrar-la
// n'esborraria les dades) i ho avisa perquè ho decideixis a mà.
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { google } from 'googleapis';
import { authenticate } from '@google-cloud/local-auth';
import { DEFINICIONS } from './sa_definicions.js';
import { COURSE_ID } from './config.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SCOPES = [
  'https://www.googleapis.com/auth/forms.body',
  'https://www.googleapis.com/auth/forms.responses.readonly',
  'https://www.googleapis.com/auth/drive.file',
  'https://www.googleapis.com/auth/classroom.coursework.students',
];
const APLICA = process.argv.includes('--aplica');

async function auth() {
  const tokenPath = path.join(__dirname, 'token.json');
  if (fs.existsSync(tokenPath)) {
    const c = JSON.parse(fs.readFileSync(tokenPath, 'utf8'));
    const cl = google.auth.fromJSON(c);
    if (cl) return cl;
  }
  const cl = await authenticate({ scopes: SCOPES, keyfilePath: path.join(__dirname, 'credentials.json') });
  if (cl.credentials) {
    const keys = JSON.parse(fs.readFileSync(path.join(__dirname, 'credentials.json'), 'utf8'));
    const key = keys.installed || keys.web;
    fs.writeFileSync(tokenPath, JSON.stringify({
      type: 'authorized_user', client_id: key.client_id,
      client_secret: key.client_secret, refresh_token: cl.credentials.refresh_token,
    }));
  }
  return cl;
}

const PATRO_FORA = /^(Parella \(nom|Equip \(noms\))/;   // preguntes d'agrupament que desapareixen
// Reetiquetatge de preguntes del Form de SA9 (títol vell → títol nou).
const SA9_RETITOLS = new Map([
  ['Equip (nom) i membres', 'Nom'],
  ['1 · El nostre repte', '1 · El meu repte'],
  ['2 · Rols de l’equip', '2 · Les meves quatre feines'],
  ['Qui fa cada rol: coordinació/planificació · maquinari/electrònica · programació · documentació/comunicació',
   'Quines tasques tens de cada etiqueta? (la que se sol oblidar és DOC)'],
  ['Descripció de l’esbós/esquema del sistema', 'Descripció de l’esbós/esquema del meu sistema'],
  ['Iteració v1: què fallava · què heu canviat · resultat', 'Iteració v1: què fallava · què has canviat · resultat'],
  ['Iteració v2: què fallava · què heu canviat · resultat', 'Iteració v2: què fallava · què has canviat · resultat'],
  ['6 · Defensa (S5)', '6 · Defensa (S4)'],
  ['Qui explica cada part?', 'Ordre de la teva defensa: problema · solució · decisió tècnica · alternativa descartada'],
  ['Reflexió ètica/sostenibilitat: impacte del vostre sistema', 'Reflexió ètica/sostenibilitat: impacte del teu sistema'],
]);

const client = await auth();
const forms = google.forms({ version: 'v1', auth: client });
const classroom = google.classroom({ version: 'v1', auth: client });
const resultats = JSON.parse(fs.readFileSync(path.join(__dirname, 'resultats_sa1a9.json'), 'utf8'));

console.log(APLICA ? '⚙️  MODE APLICAR — es modificarà el Classroom real\n'
                   : '🔍 SIMULACIÓ — no es toca res (afegeix --aplica per fer-ho)\n');

let canvis = 0, bloquejats = 0;

for (const [clau, res] of Object.entries(resultats)) {
  const def = DEFINICIONS[clau];
  if (!def) continue;
  const form = await forms.forms.get({ formId: res.formId });
  const items = form.data.items || [];

  // Quantes respostes té? Si en té, no s'esborra cap pregunta.
  let nResp = 0;
  try {
    const r = await forms.forms.responses.list({ formId: res.formId });
    nResp = (r.data.responses || []).length;
  } catch { nResp = -1; }   // sense scope de respostes: es tracta com a desconegut

  const peticions = [];
  const descripcio = [];

  // 1) Fora la pregunta de parella (SA1-SA8)
  const idx = items.findIndex(it => PATRO_FORA.test(it.title || ''));
  if (idx >= 0) {
    if (nResp > 0) {
      console.log(`⚠️  ${clau.toUpperCase()}: té ${nResp} respostes → NO esborro «${items[idx].title}» (perdria dades). Fes-ho a mà si vols.`);
      bloquejats++;
    } else {
      peticions.push({ deleteItem: { location: { index: idx } } });
      descripcio.push(`elimina la pregunta «${items[idx].title}»`);
    }
  }

  // 2) SA9: reetiquetatge de preguntes + títol/descripció del Form
  if (clau === 'sa9') {
    items.forEach((it, i) => {
      const nou = SA9_RETITOLS.get(it.title);
      if (nou && nou !== it.title) {
        // L'API exigeix l'ítem SENCER: amb només {title} interpreta que se'n
        // vol canviar el tipus i respon 400 («cannot be changed into a non
        // question Item type»).
        peticions.push({ updateItem: { item: { ...it, title: nou }, location: { index: i }, updateMask: 'title' } });
        descripcio.push(`«${it.title}» → «${nou}»`);
      }
    });
    if (form.data.info?.description !== def.descripcioForm) {
      peticions.push({ updateFormInfo: { info: { description: def.descripcioForm }, updateMask: 'description' } });
      descripcio.push('descripció del Form');
    }
  }

  if (peticions.length) {
    canvis += peticions.length;
    console.log(`📄 ${clau.toUpperCase()} (${nResp < 0 ? '?' : nResp} respostes): ${descripcio.join(' · ')}`);
    if (APLICA) {
      await forms.forms.batchUpdate({ formId: res.formId, requestBody: { requests: peticions } });
      console.log('   ✅ Form actualitzat');
    }
  }

  // 3) Descripció de la tasca de Classroom (només si ha canviat)
  let cwActual = null;
  if (res.courseWorkId) {
    try {
      const cw = await classroom.courses.courseWork.get({ courseId: COURSE_ID, id: res.courseWorkId });
      cwActual = cw.data.description || '';
    } catch { cwActual = null; }
  }
  if (res.courseWorkId && def.descripcioTasca && cwActual !== def.descripcioTasca) {
    if (APLICA) {
      await classroom.courses.courseWork.patch({
        courseId: COURSE_ID, id: res.courseWorkId, updateMask: 'description',
        requestBody: { description: def.descripcioTasca },
      });
      console.log(`   ✅ Tasca ${clau.toUpperCase()}: descripció actualitzada`);
    } else {
      console.log(`   · tasca ${clau.toUpperCase()}: s'actualitzaria la descripció`);
    }
    canvis++;
  }
}

console.log(`\n${APLICA ? 'Fet' : 'Simulació acabada'}: ${canvis} canvis` +
            (bloquejats ? ` · ${bloquejats} bloquejats per respostes existents` : ''));
if (!APLICA) console.log('Torna a executar amb --aplica per fer-ho de debò.');
