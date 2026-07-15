// Rúbriques del curs MAKER 1r ESO en el FORMAT D'IMPORTACIÓ de Classroom.
// Transcripció fidel de Classes/SAx_*/Rubrica_SAx.md (+ Avaluació/Rubrica_producte_final.md)
// del repo «Curs 2627 1 ESO Maker». Cada rúbrica = un Sheet a la carpeta de Drive
// «Maker 1r ESO — Rúbriques».
//
// Nivells del curs (LOMLOE): NA / AS / AN / AE. Els punts 1-4 són el marcador de nivell
// que Classroom exigeix al format puntuat — NO són una nota sobre 10.
//
// Format del Sheet (deduït d'una rúbrica exportada real, com crear_rubriques_importables.js):
//   fila 1: banner · fila 2: v1.0-s · per criteri: títol / desc buida / punts / títols / descs
//
// Ús: node crear_rubriques_importables_maker.js [SA1 SA2 … PF | tot]   (per defecte: tot)
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { google } from 'googleapis';
import { getAuthClient } from './_form_sa_lib.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const RESULTATS = path.join(__dirname, 'resultats_rubriques_importables_maker.json');
const DRIVE_FOLDER_NAME = 'Maker 1r ESO — Rúbriques';

const NIVELL_TITOLS = ['NA — Encara no', 'AS — Satisfactori', 'AN — Notable', 'AE — Excel·lent'];
const PUNTS = ['1.0', '2.0', '3.0', '4.0'];
const BANNER = 'Et recomanem que no editis les rúbriques en format de full de càlcul';
const VERSIO = 'v1.0-s';

// [títol criteri, [desc NA, desc AS, desc AN, desc AE]] — transcripció fidel dels .md
const RUBRIQUES = {
  SA1: { nom: 'SA1 · Benvinguts a l\'Aula Maker (el clauer)', criteris: [
    ['Cultura i seguretat (CA6.1)', ['Encara no segueix les normes', 'Segueix les normes amb recordatoris', 'Segueix les normes de seguretat', 'Compleix i recorda les normes als companys']],
    ['Idear el meu disseny (CA1.1)', ['Encara no decideix què posar-hi', 'Copia una idea sense provar-ne d\'altres', 'Prova 2-3 idees a la zona de proves i tria la seva', 'Justifica per què tria aquella forma']],
    ['Disseny vectorial bàsic (CA2.1)', ['Encara no completa el disseny', 'Disseny molt bàsic amb ajuda', 'Disseny correcte amb forma, text i forat', 'Disseny acurat i personalitzat amb autonomia']],
    ['Preparació per a làser (CA3.1)', ['Fitxer encara no preparat', 'Capes tall/gravat amb molta ajuda', 'Capes correctes', 'Capes correctes i optimitzades']],
    ['Reflexió i millora (CA1.4)', ['Encara no reflexiona', 'Reflexió molt breu', 'Identifica què milloraria', 'Reflexió rica amb propostes concretes']],
    ['Documentació al diari (CA5.2)', ['Encara no documenta', 'Entrada incompleta', 'Entrada completa amb foto', 'Entrada completa i reflexiva']],
  ]},
  SA2: { nom: 'SA2 · Dissenyem en 2D (el marcapàgines)', criteris: [
    ['Disseny vectorial (CA2.1)', ['Encara no completa el disseny', 'Usa formes bàsiques amb ajuda', 'Usa formes, text i operacions de camí', 'Domina operacions de camí i vectorització amb autonomia']],
    ['Geometria i mesura (CA2.3)', ['Encara no pren les mides correctes', 'Mides aproximades', 'Mides correctes', 'Mides precises i material optimitzat']],
    ['Preparació i fabricació làser (CA3.1)', ['Fitxer encara no apte', 'Alguns elements a la capa/color equivocat', 'Capes tall/gravat correctes', 'Paràmetres i capes optimitzats']],
    ['Idear i triar solució (CA1.2)', ['Encara no proposa idees', 'Proposa una sola idea, sense comparar-ne d\'altres', 'Prova diverses idees i en tria una amb motiu', 'Compara idees i justifica l\'elecció']],
    ['Sostenibilitat del material (CA6.2)', ['Encara malgasta material', 'Deixa força espai buit a la planxa', 'Aprofita bé la planxa (≤10 mm entre dissenys)', 'Optimitza i proposa millores']],
    ['Documentació (CA5.2)', ['Encara no documenta', 'Incompleta', 'Completa amb evidència', 'Completa i reflexiva']],
  ]},
  SA3: { nom: 'SA3 · Projecte làser: la meva identitat ⭐ (producte T1)', criteris: [
    ['Procés tecnològic complet (CA1.1-1.3)', ['Encara sense procés', 'Procés bàsic amb ajuda', 'Detecta necessitat, idea i planifica', 'Procés rigorós i ben justificat']],
    ['Disseny de peces i unions (CA2.1/2.3)', ['Peces encara no vàlides', 'Peces simples, encaix fallit', 'Peces correctes que encaixen', 'Disseny precís d\'unions optimitzades']],
    ['Fabricació i iteració (CA3.1/3.3)', ['Encara no fabrica', 'Fabrica amb molta ajuda', 'Prova la mostra d\'encaix i millora el prototip almenys un cop', 'Itera més d\'una vegada o anticipa el kerf sense refer cap peça']],
    ['Funcionalitat del producte (CA3.3)', ['Encara no funciona', 'Funció mínima', 'Compleix la funció', 'Supera els requisits']],
    ['Treball en equip (CA5.1)', ['Encara no col·labora', 'Col·labora puntualment', 'Assumeix el seu rol', 'Fa avançar l\'equip i ajuda']],
    ['Comunicació/presentació (CA5.3)', ['Encara no presenta', 'Presentació confusa', 'Presentació clara, seguint el guió repte→solució→com ho hem fet', 'Presentació clara i, a més, respon preguntes del públic']],
    ['Documentació (CA5.2)', ['Encara no documenta', 'Incompleta', 'Completa', 'Completa i reflexiva']],
    ['Contribució individual identificable (CA5.1/5.2)', ['Encara no es pot identificar què ha aportat', 'S\'identifica la seva aportació amb l\'ajuda del diari i dels rols', 'Té una part concreta del producte amb la seva «signatura» (peça, gravat, documentació) i la sap explicar', 'Contribució clara i, a més, explica com la seva part es connecta amb el conjunt']],
  ]},
  SA4: { nom: 'SA4 · Del 2D al 3D (primer objecte 3D)', criteris: [
    ['Modelatge 3D (CA2.2)', ['Encara no modela', 'Combina cossos amb ajuda', 'Combina ≥3 cossos i ≥1 forat, imprimible pla i sense suports', 'Model elaborat amb diverses operacions i autonomia']],
    ['Geometria, mesura i escala (CA2.3)', ['Mides encara irreals', 'Mides aproximades', 'Mides dins el límit (≤50 mm) i gruix ≥3 mm', 'Mides precises i optimitzades per imprimir']],
    ['Exportació i comprensió del flux (CA2.2)', ['Encara no exporta', 'Exporta amb ajuda', 'Exporta STL correctament', 'Exporta i comprova/optimitza el model']],
    ['Reflexió (CA1.4)', ['Encara no reflexiona', 'Reflexió breu', 'Identifica aprenentatges', 'Reflexió rica sobre el pas 2D→3D']],
    ['Documentació (CA5.2)', ['Encara no documenta', 'Incompleta', 'Captures i procés', 'Completa i reflexiva']],
  ]},
  SA5: { nom: 'SA5 · Modelatge 3D funcional (peça útil)', criteris: [
    ['Detectar necessitat i mesurar (CA1.1/2.3)', ['Encara no defineix el problema', 'Problema vague, mides imprecises', 'Problema clar i mides reals', 'Problema ben definit i mides precises amb toleràncies']],
    ['Disseny 3D funcional (CA2.2)', ['Encara no imprimible', 'Disseny bàsic amb ajuda', 'Disseny correcte i imprimible', 'Disseny optimitzat per a la impressió']],
    ['Iteració digital v1→v2 (CA1.4)', ['Encara no revisa el disseny', 'Fa canvis amb molta ajuda', 'Fa la v2 a partir del retorn i explica un canvi', 'Itera amb criteri i justifica cada canvi']],
    ['Laminat i impressió (CA3.2)', ['Encara no prepara la impressió', 'Lamina amb molta ajuda', 'Lamina amb paràmetres correctes i dins el límit (< 1 h, < 40 g)', 'Optimitza paràmetres (temps/material/qualitat)']],
    ['Resolució d\'incidències (CA3.3)', ['Encara es bloqueja davant l\'error', 'Demana ajuda', 'Resol incidències bàsiques', 'Diagnostica i preveu problemes']],
    ['Funcionalitat', ['Encara no funciona', 'Funció parcial', 'Compleix la funció', 'Supera els requisits']],
    ['Documentació (CA5.2)', ['Encara no documenta', 'Incompleta', 'Fitxa tècnica completa', 'Completa i reflexiva']],
  ]},
  SA6: { nom: 'SA6 · Repte de disseny 3D ⭐ (producte T2)', criteris: [
    ['Empatia i requisits (CA1.1)', ['Encara no considera l\'usuari', 'Requisits vagues o inventats', '≥3 requisits i ≥1 restricció que surten de l\'usuari', 'Anàlisi acurada de necessitats i restriccions']],
    ['Idear i planificar (CA1.2/1.3)', ['Encara sense pla', 'Pla incomplet', 'Idees, elecció i repartiment', 'Pla rigorós i ben justificat']],
    ['Disseny 3D de conjunt (CA2.2/2.3)', ['Peces encara no vàlides', 'Peces simples', 'Cada peça fa la seva funció (i si n\'hi ha més d\'una, encaixen)', 'Conjunt optimitzat i coherent']],
    ['Impressió i iteració (CA3.2/3.3)', ['Encara no imprimeix', 'Imprimeix amb ajuda', 'Imprimeix, prova amb l\'usuari i aplica una millora', 'Itera més d\'un cop i justifica cada canvi amb el feedback']],
    ['Impacte / funcionalitat (CA3.3)', ['Encara no resol el repte', 'Solució parcial', 'Resol el repte', 'Solució excel·lent amb valor afegit']],
    ['Treball en equip (CA5.1)', ['Encara no col·labora', 'Col·labora puntualment', 'Assumeix el rol', 'Coordina i fa avançar l\'equip']],
    ['Comunicació (CA5.3)', ['Encara no presenta', 'Confusa', 'Clara, seguint el guió repte→usuari→solució→impacte', 'A més, mostra l\'evidència de la prova amb l\'usuari i respon preguntes']],
    ['Contribució individual identificable (CA5.1/5.2)', ['Encara no es pot identificar què ha aportat', 'S\'identifica la seva aportació amb l\'ajuda del diari i dels rols', 'La seva peça (taula «Peça / Responsable» de la fitxa) és identificable i la sap explicar', 'Contribució clara i, a més, explica com la seva peça es connecta amb el conjunt']],
  ]},
  SA7: { nom: 'SA7 · Captura el món en 360 (tour virtual)', criteris: [
    ['Captura 360 (CA4.1)', ['Encara no captura', 'Captures amb ajuda i defectes', 'Captura correcta: horitzó recte, sense zones borroses i amb detalls a l\'ombra', 'Captures acurades (llum, enquadrament, neteja)']],
    ['Resol incidències de captura (CA3.3)', ['Encara no sap què fer si la captura surt malament', 'Ho resol amb ajuda contínua', 'Detecta el problema (moguda, fosca, algú al pla) i torna a capturar', 'Anticipa els problemes i ajusta abans de capturar']],
    ['Muntatge del tour (CA4.2)', ['Encara no munta', 'Tour bàsic incomplet', 'Tour navegable amb etiquetes', 'Tour ric, ben estructurat i atractiu']],
    ['Ús segur del visor VR (CA4.3)', ['Encara no segueix el protocol', 'Necessita recordatoris', 'Segueix les 4 regles VR i fa de guia', 'Ús segur autònom i ajuda els companys']],
    ['Ètica i drets d\'imatge (CA6.3)', ['Encara no té en compte la privadesa', 'Necessita recordatoris', 'Respecta drets i permisos', 'Actua èticament i ho argumenta']],
    ['Treball en equip (CA5.1)', ['Encara no col·labora', 'Col·labora puntualment', 'Assumeix el rol', 'Coordina l\'equip']],
    ['Comunicació (CA5.3)', ['Encara no presenta el tour', 'Confusa', 'Clara', 'Clara i, a més, adaptada a l\'audiència (respon preguntes, convida a navegar)']],
    ['Documentació (CA5.2)', ['Encara no documenta', 'Incompleta', 'Completa', 'Completa i reflexiva']],
  ]},
  SA8: { nom: 'SA8 · Explorem la Realitat Virtual (escena VR)', criteris: [
    ['Creació d\'escena VR (CA4.2)', ['Encara no crea l\'escena', 'Escena molt bàsica amb ajuda', 'Escena explorable: ≥3-4 objectes, un text i càmera ben posada', 'Escena rica amb interaccions (codi)']],
    ['Ús segur i crític (CA4.3)', ['Encara no segueix les normes / sense anàlisi', 'Segueix normes amb recordatoris', 'Ús segur + anàlisi bàsica', 'Ús segur + anàlisi crítica argumentada']],
    ['Ètica digital (CA6.3)', ['Encara no identifica riscos (privadesa, temps de pantalla)', 'Els identifica amb ajuda', 'Explica un benefici i un risc de la VR amb les seves paraules', 'Argumenta límits d\'ús amb criteri propi']],
    ['Resol incidències de l\'escena (CA3.3)', ['Encara no sap desencallar-se', 'Ho resol amb ajuda contínua', 'Fa servir la guia/companys per desencallar-se sol', 'Anticipa i evita els errors freqüents']],
    ['Idear i triar (CA1.2)', ['Encara sense idea pròpia', 'Proposa una sola idea, sense comparar-ne d\'altres', 'Prova diverses idees i en tria una amb motiu', 'Idea original i justificada']],
    ['Treball en equip (CA5.1)', ['Encara no col·labora', 'Col·labora puntualment', 'Assumeix el rol', 'Coordina i ajuda']],
    ['Comunicació (CA5.3)', ['Encara no presenta', 'Confusa', 'Clara', 'Clara i, a més, adaptada a l\'audiència']],
    ['Documentació (CA5.2)', ['Encara no documenta', 'Incompleta', 'Completa', 'Completa i reflexiva']],
  ]},
  SA9: { nom: 'SA9 · Projecte final Aula Maker ⭐ (producte de curs)', criteris: [
    ['Integració de tecnologies (CE2/CE3/CE4)', ['Encara no integra', 'Una sola tecnologia', 'Objecte fabricat + immersiu', 'Integració rica i coherent de làser/3D i 360/VR']],
    ['Procés tecnològic complet (CE1)', ['Encara sense procés', 'Procés bàsic', 'Planifica, fabrica i millora', 'Procés rigorós i iteratiu']],
    ['Qualitat i funcionalitat del producte (CA2.3/CA3.3)', ['Encara inacabat', 'Mínims justos', 'Producte complet i acurat', 'Producte excel·lent amb valor afegit']],
    ['Treball en equip (CA5.1)', ['Encara no col·labora', 'Col·labora puntualment', 'Assumeix el rol', 'Coordina i fa avançar l\'equip']],
    ['Comunicació a la Fira (CA5.3)', ['Encara no presenta', 'Presentació confusa', 'Presentació clara', 'Presentació clara, atractiva i convincent']],
    ['Seguretat, sostenibilitat i ètica (CE6)', ['Encara incompleix normes', 'Amb recordatoris', 'Compleix', 'Exemplar i ho argumenta']],
    ['Portafoli final (CA5.2)', ['Encara no l\'ha lliurat', 'Incomplet', 'Complet', 'Complet, clar i reflexiu']],
    ['Contribució individual identificable (CA5.1/5.2)', ['Encara no es pot identificar què ha aportat', 'S\'identifica la seva aportació amb l\'ajuda del diari i dels rols', 'Té una part concreta de l\'estand amb la seva «signatura» (objecte, component immersiu, guió) i la sap explicar', 'Contribució clara i, a més, explica com la seva part es connecta amb el conjunt']],
  ]},
  PF: { nom: 'Producte final (complementària de SA3/SA6/SA9)', criteris: [
    ['Funcionalitat / compliment dels requisits (~25 %)', ['Encara no compleix els requisits', 'Compleix els mínims', 'Compleix tots els requisits', 'Supera els requisits i afegeix valor']],
    ['Qualitat del disseny i la fabricació (~25 %)', ['Acabat encara deficient', 'Acabat acceptable', 'Bon acabat i precisió', 'Acabat excel·lent i acurat']],
    ['Ideació: comparar i triar (CA1.2) (~15 %)', ['Encara sense aportació pròpia', 'Una sola idea, sense comparar', 'Prova diverses idees i tria amb motiu', 'Compara idees i justifica una solució pròpia']],
    ['Procés i iteració (CA1.4) (~15 %)', ['Encara sense procés documentat', 'Procés bàsic', 'Procés clar amb una millora (la targeta del Museu dels Errors hi compta)', 'Procés iteratiu amb millores justificades']],
    ['Documentació / portafoli (~10 %)', ['Encara inexistent', 'Incompleta', 'Completa', 'Completa, clara i reflexiva']],
    ['Comunicació / presentació (~10 %)', ['Encara no presenta', 'Presentació confusa', 'Presentació clara', 'Presentació clara i convincent']],
  ]},
};

const cell = (v) => `"${String(v).replace(/"/g, '""')}"`;
const row = (arr) => arr.map(cell).join(',');

function buildCsv(criteris) {
  const rows = [row([BANNER, '', '', '', '']), row([VERSIO, '', '', '', ''])];
  for (const [titol, descs] of criteris) {
    rows.push(row([titol, '', '', '', '']));
    rows.push(row(['', '', '', '', '']));
    rows.push(row(['', ...PUNTS]));
    rows.push(row(['', ...NIVELL_TITOLS]));
    rows.push(row(['', ...descs]));
  }
  return rows.join('\r\n');
}

async function main() {
  const args = process.argv.slice(2).map(s => s.toUpperCase());
  const ids = (args.length === 0 || args.includes('TOT')) ? Object.keys(RUBRIQUES) : args;

  const auth = await getAuthClient();
  const drive = google.drive({ version: 'v3', auth });

  // Carpeta de Drive «Maker 1r ESO — Rúbriques» (troba-la o crea-la)
  let folderId = null;
  const search = await drive.files.list({
    q: `name = '${DRIVE_FOLDER_NAME}' and mimeType = 'application/vnd.google-apps.folder' and trashed = false`,
    fields: 'files(id, name)',
  });
  if (search.data.files && search.data.files.length) {
    folderId = search.data.files[0].id;
    console.log(`↩️  Carpeta de Drive existent: ${DRIVE_FOLDER_NAME}`);
  } else {
    const created = await drive.files.create({
      requestBody: { name: DRIVE_FOLDER_NAME, mimeType: 'application/vnd.google-apps.folder' },
      fields: 'id',
    });
    folderId = created.data.id;
    console.log(`✅ Carpeta de Drive creada: ${DRIVE_FOLDER_NAME}`);
  }

  const results = fs.existsSync(RESULTATS) ? JSON.parse(fs.readFileSync(RESULTATS, 'utf8')) : {};

  for (const key of ids) {
    const rub = RUBRIQUES[key];
    if (!rub) { console.log(`⚠️  clau desconeguda: ${key}`); continue; }
    if (results[key]?.fileId) { console.log(`↩️  Ja existeix (${key}): ${results[key].url}`); continue; }
    const nom = `Rúbrica ${rub.nom} (importable a Classroom)`;
    console.log(`📊 Creant "${nom}" (${rub.criteris.length} criteris)...`);
    const res = await drive.files.create({
      requestBody: { name: nom, mimeType: 'application/vnd.google-apps.spreadsheet', parents: [folderId] },
      media: { mimeType: 'text/csv', body: buildCsv(rub.criteris) },
      fields: 'id, webViewLink',
    });
    results[key] = { key, nom, criteris: rub.criteris.length, fileId: res.data.id, url: res.data.webViewLink };
    fs.writeFileSync(RESULTATS, JSON.stringify(results, null, 2));
    console.log(`✅ ${res.data.webViewLink}`);
  }
  console.log('\n🏆 Fet. A Classroom: tasca → Rúbrica → Reutilitza o importa → Importa des de Sheets.');
}

main().catch(err => { console.error('❌ Error:', err.errors || err.message || err); process.exit(1); });
