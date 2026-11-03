// Crea els Forms + tasques «un per pràctica» definits a practiques_definicions.js.
//
// Ús (des de Material Classroom/):
//   node crear_forms_practiques.mjs sa2                    -> simulació: què es crearia
//   node crear_forms_practiques.mjs sa2 --aplica           -> crea les tasques en DRAFT
//   node crear_forms_practiques.mjs sa2 --aplica --publica -> crea-les ja PUBLICADES
//
// ⚠️ Classroom ignora gradeCategory a les tasques DRAFT (comprovat 29-10-2026,
// crear_mearm_classroom.js): en DRAFT cal posar la categoria T1/T2/T3 a mà.
// crearIPenjar és idempotent per títol: re-executar no duplica.
// Resultats a resultats_forms_practiques.json ({ clau: { taskUrl, formUrl, state } }).
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { crearIPenjar } from './_form_sa_lib.js';
import { PRACTIQUES } from './practiques_definicions.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const RESULTATS = path.join(__dirname, 'resultats_forms_practiques.json');

const [prefix, ...flags] = process.argv.slice(2);
const APLICA = flags.includes('--aplica');
const PUBLICA = flags.includes('--publica');

const claus = Object.keys(PRACTIQUES).filter(k => prefix && k.startsWith(prefix));
if (!claus.length) {
  console.error(`Cap pràctica amb el prefix «${prefix ?? ''}». Claus: ${Object.keys(PRACTIQUES).join(', ')}`);
  process.exit(1);
}

const estat = PUBLICA ? 'PUBLISHED' : 'DRAFT';
console.log(`${APLICA ? 'APLICANT' : 'SIMULACIÓ'} · ${claus.length} tasques · estat ${estat}\n`);
for (const k of claus) {
  const d = PRACTIQUES[k];
  console.log(`[${k}] ${d.titol} · ${d.maxPoints ?? 'sense'} punts`);
  d.items.forEach((it, i) => console.log(`   ${String(i + 1).padStart(2)}. ${it.titol}${it.required === false ? ' (opcional)' : ''}`));
}
if (!APLICA) {
  console.log('\nRes creat. Afegeix --aplica (i --publica si les vols visibles ja).');
  process.exit(0);
}

const resultats = fs.existsSync(RESULTATS) ? JSON.parse(fs.readFileSync(RESULTATS, 'utf8')) : {};
for (const k of claus) {
  const r = await crearIPenjar({ ...PRACTIQUES[k], state: estat });
  resultats[k] = { taskUrl: r.taskUrl, formUrl: r.formUrl ?? resultats[k]?.formUrl ?? null, state: r.state };
  fs.writeFileSync(RESULTATS, JSON.stringify(resultats, null, 2) + '\n');
}
console.log(`\nDesat a ${path.basename(RESULTATS)}.`);
if (!PUBLICA) console.log('Recorda: en DRAFT, posa la categoria de nota a mà a Classroom en publicar-les.');
