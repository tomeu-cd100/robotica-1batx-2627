// Actualitza EN PLACE el Form de repàs de SA5 del curs Maker: la pregunta del gruix
// mínim de paret passa de «~2 mm» a «3 mm (el llindar de sempre del curs)», alineada
// amb la unificació del llindar a tot el material (2026-07-15).
// No crea res de nou: troba el Form existent per nom al Drive i modifica només aquella
// pregunta. Segur d'executar més d'un cop (idempotent).
import { google } from 'googleapis';
import { getAuthClient } from './_form_sa_lib.js';

const NOM_FORM = 'SA5 · Qüestionari de repàs — Impressió 3D funcional';
const TITOL_PREGUNTA = 'El gruix mínim de paret perquè la peça no surti fràgil és…';
const OPCIONS_NOVES = ['0,1 mm', '3 mm (el llindar de sempre del curs)', '10 mm', 'Tant és.'];
const CORRECTA = OPCIONS_NOVES[1];

async function main() {
  const auth = await getAuthClient();
  const drive = google.drive({ version: 'v3', auth });
  const forms = google.forms({ version: 'v1', auth });

  const search = await drive.files.list({
    q: `name = '${NOM_FORM.replace(/'/g, "\\'")}' and mimeType = 'application/vnd.google-apps.form' and trashed = false`,
    fields: 'files(id, name)'
  });
  const fitxers = search.data.files || [];
  if (!fitxers.length) throw new Error(`No s'ha trobat cap Form anomenat «${NOM_FORM}» (l'app només veu fitxers creats per ella mateixa — scope drive.file).`);
  if (fitxers.length > 1) console.log(`⚠️  ${fitxers.length} Forms amb aquest nom; s'actualitza el primer (${fitxers[0].id}).`);
  const formId = fitxers[0].id;

  const form = await forms.forms.get({ formId });
  const items = form.data.items || [];
  const idx = items.findIndex(it => it.title === TITOL_PREGUNTA);
  if (idx === -1) throw new Error(`El Form ${formId} no té cap pregunta titulada «${TITOL_PREGUNTA}».`);
  const item = items[idx];

  const jaBe = item.questionItem?.question?.choiceQuestion?.options?.some(o => o.value === CORRECTA);
  if (jaBe) { console.log(`↩️  La pregunta ja està actualitzada (Form ${formId}). Res a fer.`); return; }

  await forms.forms.batchUpdate({ formId, requestBody: { requests: [{
    updateItem: {
      item: {
        itemId: item.itemId,
        title: TITOL_PREGUNTA,
        questionItem: { question: {
          required: true,
          grading: { pointValue: 1, correctAnswers: { answers: [{ value: CORRECTA }] } },
          choiceQuestion: { type: 'RADIO', options: OPCIONS_NOVES.map(v => ({ value: v })) }
        } }
      },
      location: { index: idx },
      updateMask: 'questionItem.question'
    }
  }] } });

  console.log(`✅ Form ${formId} actualitzat: la resposta bona del gruix ara és «${CORRECTA}».`);
}

main().catch(err => { console.error('❌ Error:', err.message); process.exit(1); });
