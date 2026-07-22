/*
 * Backup complet del contingut del curs de Classroom (temes, tasques,
 * materials, anuncis) a un fitxer JSON local. NOMÉS contingut creat pel
 * docent: no llegeix alumnat, notes ni entregues (l'API no ho permet).
 *
 * Ús:  node backup_classroom.js
 * Genera: backups/backup_<COURSE_ID>_<AAAAMMDD-HHMM>.json
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { google } from 'googleapis';
import { getAuthClient, ambReintents } from './_form_sa_lib.js';
import { COURSE_ID } from './config.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const BACKUPS_DIR = path.join(__dirname, 'backups');

function marcaTemps() {
  const ara = new Date();
  const pad = n => String(n).padStart(2, '0');
  return `${ara.getFullYear()}${pad(ara.getMonth() + 1)}${pad(ara.getDate())}` +
    `-${pad(ara.getHours())}${pad(ara.getMinutes())}`;
}

async function llistarTot(fn, camp, etiqueta) {
  const resultat = [];
  let pageToken;
  do {
    const res = await ambReintents(
      () => fn(pageToken), etiqueta);
    resultat.push(...(res.data[camp] || []));
    pageToken = res.data.nextPageToken;
  } while (pageToken);
  return resultat;
}

async function main() {
  const auth = await getAuthClient();
  const classroom = google.classroom({ version: 'v1', auth });

  const curs = await ambReintents(
    () => classroom.courses.get({ id: COURSE_ID }), 'llegir curs');

  const temes = await llistarTot(
    pageToken => classroom.courses.topics.list({ courseId: COURSE_ID, pageSize: 100, pageToken }),
    'topic', 'llistar temes');

  const courseWork = await llistarTot(
    pageToken => classroom.courses.courseWork.list({
      courseId: COURSE_ID, courseWorkStates: ['PUBLISHED', 'DRAFT'], pageSize: 100, pageToken,
    }), 'courseWork', 'llistar courseWork');

  const courseWorkMaterials = await llistarTot(
    pageToken => classroom.courses.courseWorkMaterials.list({
      courseId: COURSE_ID, courseWorkMaterialStates: ['PUBLISHED', 'DRAFT'], pageSize: 100, pageToken,
    }), 'courseWorkMaterial', 'llistar materials');

  const announcements = await llistarTot(
    pageToken => classroom.courses.announcements.list({
      courseId: COURSE_ID, announcementStates: ['PUBLISHED', 'DRAFT'], pageSize: 100, pageToken,
    }), 'announcement', 'llistar anuncis');

  const backup = {
    generat: new Date().toISOString(),
    curs: {
      id: COURSE_ID,
      nom: curs.data.name,
      seccio: curs.data.section || null,
      descripcio: curs.data.description || null,
      alternateLink: curs.data.alternateLink,
    },
    temes: temes.map(t => ({ topicIdVell: t.topicId, nom: t.name })),
    courseWork: courseWork.map(w => ({
      titol: w.title,
      descripcio: w.description || null,
      estat: w.state,
      workType: w.workType,
      maxPoints: w.maxPoints ?? null,
      topicIdVell: w.topicId || null,
      materials: w.materials || [],
      dataLliurament: w.dueDate || null,
    })),
    courseWorkMaterials: courseWorkMaterials.map(m => ({
      titol: m.title,
      descripcio: m.description || null,
      estat: m.state,
      topicIdVell: m.topicId || null,
      materials: m.materials || [],
    })),
    announcements: announcements.map(a => ({
      text: a.text || null,
      estat: a.state,
      materials: a.materials || [],
    })),
  };

  fs.mkdirSync(BACKUPS_DIR, { recursive: true });
  const fitxer = path.join(BACKUPS_DIR, `backup_${COURSE_ID}_${marcaTemps()}.json`);
  fs.writeFileSync(fitxer, JSON.stringify(backup, null, 2));

  console.log(`✅ Backup desat: ${fitxer}`);
  console.log(`   Temes: ${temes.length} · courseWork: ${courseWork.length} · ` +
    `materials: ${courseWorkMaterials.length} · anuncis: ${announcements.length}`);
}

main().catch(e => { console.error('❌', e.message); process.exit(1); });
