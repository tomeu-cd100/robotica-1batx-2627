// Feines d'inici de curs del Maker 1r ESO que es poden fer per API (15-07-2026):
//  1. Form del TIQUET ANÒNIM trimestral de valoració (Instruments_formatius.md §8):
//     3 preguntes obertes + selector de trimestre. SENSE recollir correu ni nom (anònim).
//  2. Carpeta compartida del grup amb subcarpetes SA1/…/SA9 i Portafoli/
//     (la comparteix el docent amb el grup quan tingui la llista).
//  3. Puja el quadern digital docent (plantilla .xlsx) a una carpeta privada
//     (compartir NOMÉS amb el co-docent, a mà — mai amb l'alumnat).
// Idempotent: si una peça ja existeix (per nom), es salta.
import fs from 'fs';
import { google } from 'googleapis';
import { getAuthClient } from './_form_sa_lib.js';

const QUADERN_XLSX = 'C:/Users/briera2/Documents/Curs 2627 1 ESO Maker/Avaluació/Quadern_digital_docent_plantilla.xlsx';
const CARPETA_GRUP = 'Aula Maker 1r ESO 26-27 — Grup';
const CARPETA_QUADERN = 'Aula Maker 1r ESO 26-27 — Quadern docent (privat)';
const NOM_TIQUET = 'Maker 1r ESO · Tiquet anònim de valoració de l\'assignatura';
const SUBCARPETES = ['SA1', 'SA2', 'SA3', 'SA4', 'SA5', 'SA6', 'SA7', 'SA8', 'SA9', 'Portafoli'];

async function trobaOCrea(drive, nom, mimeType, parentId = null, mediaPath = null) {
  const qParent = parentId ? ` and '${parentId}' in parents` : '';
  const search = await drive.files.list({
    q: `name = '${nom.replace(/'/g, "\\'")}' and mimeType = '${mimeType}' and trashed = false${qParent}`,
    fields: 'files(id, name)'
  });
  if (search.data.files && search.data.files.length) {
    console.log(`↩️  Ja existeix: ${nom}`);
    return { id: search.data.files[0].id, creat: false };
  }
  const requestBody = { name: nom, mimeType };
  if (parentId) requestBody.parents = [parentId];
  const params = { requestBody, fields: 'id' };
  if (mediaPath) {
    delete requestBody.mimeType; // el tipus real el posa el contingut
    params.media = {
      mimeType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      body: fs.createReadStream(mediaPath)
    };
  }
  const created = await drive.files.create(params);
  console.log(`✅ Creat: ${nom}`);
  return { id: created.data.id, creat: true };
}

async function main() {
  const auth = await getAuthClient();
  const drive = google.drive({ version: 'v3', auth });
  const forms = google.forms({ version: 'v1', auth });
  const FOLDER = 'application/vnd.google-apps.folder';

  // 1 · Carpeta del grup + subcarpetes
  const grup = await trobaOCrea(drive, CARPETA_GRUP, FOLDER);
  for (const sub of SUBCARPETES) await trobaOCrea(drive, sub, FOLDER, grup.id);

  // 2 · Quadern digital (privat)
  const privada = await trobaOCrea(drive, CARPETA_QUADERN, FOLDER);
  await trobaOCrea(drive, 'Quadern_digital_docent_plantilla.xlsx',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', privada.id, QUADERN_XLSX);

  // 3 · Form del tiquet anònim (sense quiz, sense nom, sense correu)
  const jaForm = await drive.files.list({
    q: `name = '${NOM_TIQUET.replace(/'/g, "\\'")}' and mimeType = 'application/vnd.google-apps.form' and trashed = false`,
    fields: 'files(id)'
  });
  if (jaForm.data.files && jaForm.data.files.length) {
    console.log(`↩️  Ja existeix: ${NOM_TIQUET}`);
  } else {
    const createRes = await forms.forms.create({ requestBody: { info: { title: NOM_TIQUET, documentTitle: NOM_TIQUET } } });
    const formId = createRes.data.formId;
    const fileMeta = await drive.files.get({ fileId: formId, fields: 'parents' });
    await drive.files.update({ fileId: formId, addParents: privada.id,
      removeParents: (fileMeta.data.parents || []).join(','), fields: 'id, parents' });
    await forms.forms.batchUpdate({ formId, requestBody: { requests: [
      { updateFormInfo: { info: { description:
          'És ANÒNIM: no posis el teu nom enlloc. La teva veu serveix per millorar l\'assignatura — el que ens digueu es llegeix a la coordinació i us tornem resposta («ens heu dit X; farem Y»).' },
        updateMask: 'description' } },
      { createItem: { item: { title: 'Quin trimestre tanquem?', questionItem: { question: { required: true,
          choiceQuestion: { type: 'RADIO', options: [{ value: '1r trimestre' }, { value: '2n trimestre' }, { value: '3r trimestre' }] } } } },
        location: { index: 0 } } },
      { createItem: { item: { title: 'Una cosa de l\'Aula Maker que MANTINDRIA tal com és:', questionItem: { question: { required: true, textQuestion: { paragraph: true } } } }, location: { index: 1 } } },
      { createItem: { item: { title: 'Una cosa que TRAURIA o canviaria:', questionItem: { question: { required: true, textQuestion: { paragraph: true } } } }, location: { index: 2 } } },
      { createItem: { item: { title: 'Una cosa que M\'AGRADARIA FER i encara no hem fet:', questionItem: { question: { required: true, textQuestion: { paragraph: true } } } }, location: { index: 3 } } },
    ] } });
    const responderUri = (await forms.forms.get({ formId })).data.responderUri;
    console.log(`✅ Creat: ${NOM_TIQUET}\n   Enllaç per a l'alumnat (projecta'l o fes-ne QR): ${responderUri}`);
  }

  console.log('\n🏆 Drive a punt. Recorda: compartir la carpeta del grup amb l\'alumnat i el quadern NOMÉS amb el co-docent.');
}

main().catch(err => { console.error('❌ Error:', err.message); process.exit(1); });
