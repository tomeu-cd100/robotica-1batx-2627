/*
 * Restaura un backup de curs (generat per backup_classroom.js) creant un
 * curs NOU a Classroom. Mai reutilitza ni modifica un curs existent.
 * Tot es crea en DRAFT, encara que l'original estigues PUBLISHED, per
 * evitar notificar alumnat abans de revisar el contingut recreat.
 *
 * Materials driveFile/link/youtubeVideo/form es referencien amb el mateix
 * id/URL original: no es dupliquen fitxers de Drive.
 *
 * Us:  node restaurar_classroom.js backups/backup_868858694512_20260722-1200.json
 */
import fs from 'fs';
import { google } from 'googleapis';
import { getAuthClient, ambReintents } from './_form_sa_lib.js';

function netejaMaterials(materials) {
  // Els materials del backup venen tal qual de l'API (driveFile/link/
  // youtubeVideo/form); es reenvien igual, sense duplicar res a Drive.
  return (materials || []).map(m => {
    const net = {};
    if (m.link) net.link = { url: m.link.url, title: m.link.title };
    if (m.driveFile) net.driveFile = { driveFile: { id: m.driveFile.driveFile.id } };
    if (m.youtubeVideo) net.youtubeVideo = { id: m.youtubeVideo.id };
    if (m.form) net.form = { formUrl: m.form.formUrl };
    return net;
  });
}

async function main() {
  const fitxerBackup = process.argv[2];
  if (!fitxerBackup) {
    console.error('❌ Cal indicar el fitxer de backup: node restaurar_classroom.js <fitxer.json>');
    process.exit(1);
  }
  const backup = JSON.parse(fs.readFileSync(fitxerBackup, 'utf8'));

  const auth = await getAuthClient();
  const classroom = google.classroom({ version: 'v1', auth });

  const dataAvui = new Date().toISOString().slice(0, 10);
  const cursNou = await ambReintents(
    () => classroom.courses.create({
      requestBody: {
        name: `${backup.curs.nom} (còpia ${dataAvui})`,
        section: backup.curs.seccio || undefined,
        description: backup.curs.descripcio || undefined,
        ownerId: 'me',
        courseState: 'PROVISIONED',
      },
    }), 'crear curs nou');
  const courseIdNou = cursNou.data.id;
  console.log(`✅ Curs nou creat: ${cursNou.data.name} (${courseIdNou})`);

  const mapaTemes = {};
  for (const t of backup.temes) {
    const creat = await ambReintents(
      () => classroom.courses.topics.create({
        courseId: courseIdNou,
        requestBody: { name: t.nom },
      }), `crear tema «${t.nom}»`);
    mapaTemes[t.topicIdVell] = creat.data.topicId;
  }
  console.log(`✅ Temes recreats: ${Object.keys(mapaTemes).length}`);

  let okCourseWork = 0;
  for (const w of backup.courseWork) {
    await ambReintents(
      () => classroom.courses.courseWork.create({
        courseId: courseIdNou,
        requestBody: {
          title: w.titol,
          description: w.descripcio || undefined,
          workType: w.workType,
          state: 'DRAFT',
          maxPoints: w.maxPoints ?? undefined,
          topicId: w.topicIdVell ? mapaTemes[w.topicIdVell] : undefined,
          materials: netejaMaterials(w.materials),
        },
      }), `crear tasca «${w.titol}»`).catch(e => {
        console.error(`⚠️  Tasca «${w.titol}» no recreada: ${e.message}`);
      });
    okCourseWork++;
  }
  console.log(`✅ courseWork processats: ${okCourseWork}/${backup.courseWork.length}`);

  let okMaterials = 0;
  for (const m of backup.courseWorkMaterials) {
    await ambReintents(
      () => classroom.courses.courseWorkMaterials.create({
        courseId: courseIdNou,
        requestBody: {
          title: m.titol,
          description: m.descripcio || undefined,
          state: 'DRAFT',
          topicId: m.topicIdVell ? mapaTemes[m.topicIdVell] : undefined,
          materials: netejaMaterials(m.materials),
        },
      }), `crear material «${m.titol}»`).catch(e => {
        console.error(`⚠️  Material «${m.titol}» no recreat: ${e.message}`);
      });
    okMaterials++;
  }
  console.log(`✅ courseWorkMaterials processats: ${okMaterials}/${backup.courseWorkMaterials.length}`);

  let okAnuncis = 0;
  for (const a of backup.announcements) {
    await ambReintents(
      () => classroom.courses.announcements.create({
        courseId: courseIdNou,
        requestBody: {
          text: a.text || '',
          state: 'DRAFT',
          materials: netejaMaterials(a.materials),
        },
      }), 'crear anunci').catch(e => {
        console.error(`⚠️  Anunci no recreat: ${e.message}`);
      });
    okAnuncis++;
  }
  console.log(`✅ announcements processats: ${okAnuncis}/${backup.announcements.length}`);

  console.log(`\n🔗 Curs restaurat: ${cursNou.data.alternateLink}`);
  console.log('   Tot en DRAFT: revisa i publica manualment el que calgui.');
}

main().catch(e => { console.error('❌', e.message); process.exit(1); });
