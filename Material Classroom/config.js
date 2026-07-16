// Configuració ÚNICA del curs per a tots els scripts de Material Classroom.
// EN CANVIAR DE CURS (setembre): actualitzar aquí i enlloc més.
//  - COURSE_ID: id numèric del curs (courses.list o la URL de l'API, NO la
//    forma base64 de la URL /c/... del web).
//  - DRIVE_FOLDER_ID: carpeta de Drive on van tots els Forms del curs.
//  - GRADE_CATEGORIES: ids de les categories de nota (T1/T2/T3). ⚠️ Es
//    regeneren amb cada curs nou de Classroom: obtenir-los amb
//    `node estat_classroom.js` (llista les categories del curs) abans de
//    tornar a executar adjuntar_questionaris_classroom.js.
//  - WEB_BASE: arrel del web publicat (canvia si es fa fork del repo).

export const COURSE_ID = '868858694512';
export const DRIVE_FOLDER_ID = '1vUzzhLBIArNcRaWdz-nMMtn1R-2l4rMn';
export const WEB_BASE = 'https://tomeu-cd100.github.io/robotica-1batx-2627/classes';

export const GRADE_CATEGORIES = {
  T1: { id: '870540828382', name: 'T1' },
  T2: { id: '870540828383', name: 'T2' },
  T3: { id: '870540828384', name: 'T3' },
};

// SA -> trimestre (per assignar categoria de nota).
export const SA_TRIMESTRE = { 1: 'T1', 2: 'T1', 3: 'T1',
                              4: 'T2', 5: 'T2', 6: 'T2',
                              7: 'T3', 8: 'T3', 9: 'T3' };
