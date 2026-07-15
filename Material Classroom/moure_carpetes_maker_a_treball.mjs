// Mou les carpetes creades per preparar_drive_maker_inici_curs.mjs dins la carpeta
// de treball del docent (convenció del pipeline: tot el del curs Maker va allà dins).
import { google } from 'googleapis';
import { getAuthClient } from './_form_sa_lib.js';

const CARPETA_TREBALL = '1TJ58N0opbsfLy83GPP3pa3W4V4vF5Z5g';
const NOMS = ['Aula Maker 1r ESO 26-27 — Grup', 'Aula Maker 1r ESO 26-27 — Quadern docent (privat)'];

async function main() {
  const auth = await getAuthClient();
  const drive = google.drive({ version: 'v3', auth });
  for (const nom of NOMS) {
    const search = await drive.files.list({
      q: `name = '${nom.replace(/'/g, "\\'")}' and mimeType = 'application/vnd.google-apps.folder' and trashed = false`,
      fields: 'files(id, parents)'
    });
    const f = (search.data.files || [])[0];
    if (!f) { console.log(`⚠️  No trobada: ${nom}`); continue; }
    if ((f.parents || []).includes(CARPETA_TREBALL)) { console.log(`↩️  Ja és al lloc: ${nom}`); continue; }
    await drive.files.update({ fileId: f.id, addParents: CARPETA_TREBALL,
      removeParents: (f.parents || []).join(','), fields: 'id, parents' });
    console.log(`✅ Moguda dins la carpeta de treball: ${nom}`);
  }
}

main().catch(err => { console.error('❌ Error:', err.message); process.exit(1); });
