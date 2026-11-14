// Definicions dels Forms «un per pràctica» + «Entrega final» (format de passos
// autònoms, spec docs/superpowers/specs/2026-11-03-passos-autonoms-design.md).
// Cada clau és una tasca de Classroom; els camps són els que espera
// crearIPenjar() de _form_sa_lib.js.
//
// Regla d'or: les preguntes de cada pràctica corresponen 1:1 amb els
// paràgrafs «✍️ Apunta-ho» de la seva pàgina (Classes/SAn/codi/.../EXPLICACIO.md).
// L'última pregunta de cada pràctica és la de reflexió del quadern tècnic
// (25 % = mitjana dels formularis de pràctica de la SA).
//
// Ús: node crear_forms_practiques.mjs sa2            (simulació)
//     node crear_forms_practiques.mjs sa2 --aplica   (crea en DRAFT)
//     node crear_forms_practiques.mjs sa2 --aplica --publica
import { t, p, pOpt, s, check, autoaval, WEB_BASE } from './_form_sa_lib.js';
import { GRADE_CATEGORIES } from './config.js';

const T1 = { id: GRADE_CATEGORIES.T1.id, name: GRADE_CATEGORIES.T1.name };
const T2 = { id: GRADE_CATEGORIES.T2.id, name: GRADE_CATEGORIES.T2.name };
const pagina = (sa, fitxer, titol) => ({
  link: { url: `${WEB_BASE}/${sa}/codi/${fitxer}.html`, title: titol }
});
const T3 = { id: GRADE_CATEGORIES.T3.id, name: GRADE_CATEGORIES.T3.name };
// Pràctiques que no són d'un programa (pàgina de la SA, no de codi/)
const paginaDoc = (sa, fitxer, titol) => ({
  link: { url: `${WEB_BASE}/${sa}/${fitxer}.html`, title: titol }
});
const SA7 = { sa: 'sa7', topicName: 'SA7 · Robòtica mòbil', gradeCategory: T3 };
const SA8 = { sa: 'sa8', topicName: 'SA8 · IoT i IA', gradeCategory: T3 };
const SA9 = { sa: 'sa9', topicName: 'SA9 · Projecte final', gradeCategory: T3 };
const descForm = (n, que) => `Respostes de la Pràctica ${n} (${que}). Les preguntes són les mateixes que els ✍️ de la pàgina de la pràctica.`;
const descTasca = (n) => `Fes la Pràctica ${n} seguint els passos de la pàgina (enllaç a sota) i envia aquest formulari en acabar-la. Compta per al quadern tècnic (25 %).`;
const QT = 'Pregunta del quadern tècnic.';
const SA6 = {
  sa: 'sa6',
  topicName: 'SA6 · Sistemes de control',
  gradeCategory: T2,
};
const SA5 = {
  sa: 'sa5',
  topicName: 'SA5 · micro:bit i MicroPython',
  gradeCategory: T2,
};
const SA4 = {
  sa: 'sa4',
  topicName: 'SA4 · Moviment: servos, motors i ponts H',
  gradeCategory: T2,
};
const SA3 = {
  sa: 'sa3',
  topicName: 'SA3 · Entrades i sensors',
  gradeCategory: T1,
};
const SA2 = {
  sa: 'sa2',
  topicName: 'SA2 · Sortides digitals i PWM',
  gradeCategory: T1,
};

export const PRACTIQUES = {

  // =========================================================================
  'sa2-p3': {
    ...SA2,
    titol: 'SA2 · Pràctica 3 · La llum que respira',
    descripcioForm: "Respostes de la Pràctica 3 (PWM). Les preguntes són les mateixes que els ✍️ de la pàgina de la pràctica.",
    descripcioTasca: "Fes la Pràctica 3 seguint els passos de la pàgina (enllaç a sota) i envia aquest formulari en acabar-la. Compta per al quadern tècnic (25 %).",
    maxPoints: 33,  // com la resta de tasques de la SA a Classroom
    materials: [pagina('sa2', '03-fade-pwm', 'Pràctica 3 · La llum que respira (passos)')],
    items: [
      s('Rang de valors d’analogWrite: de ____ a ____'),
      p('Què canvia quan poses delay(2)? I delay(20)?'),
      p('Què passa amb el LED al pin 8, que no té ~? Per què?'),
      p('Diferència entre digitalWrite i analogWrite',
        'Pregunta del quadern tècnic: explica-ho amb les teves paraules.')
    ]
  },

  // =========================================================================
  'sa2-p4': {
    ...SA2,
    titol: 'SA2 · Pràctica 4 · Colors RGB',
    descripcioForm: "Respostes de la Pràctica 4 (LED RGB). Les preguntes són les mateixes que els ✍️ de la pàgina de la pràctica.",
    descripcioTasca: "Fes la Pràctica 4 seguint els passos de la pàgina (enllaç a sota) i envia aquest formulari en acabar-la. Compta per al quadern tècnic (25 %).",
    maxPoints: 33,  // com la resta de tasques de la SA a Classroom
    materials: [pagina('sa2', '04-rgb', 'Pràctica 4 · Colors RGB (passos)')],
    items: [
      p('Els teus 3 colors: valors R, G, B de cadascun',
        'Format: «nom del color = (R, G, B)», un per línia.'),
      pOpt('⭐ Repte: transició suau entre dos colors. Com ho has fet?'),
      p('El concepte nou més important d’aquesta sessió',
        'Pregunta del quadern tècnic.')
    ]
  },

  // =========================================================================
  'sa2-p5': {
    ...SA2,
    titol: 'SA2 · Pràctica 5 · Panell de senyalització',
    descripcioForm: "Respostes de la Pràctica 5 (el producte de la SA2). Les preguntes són les mateixes que els ✍️ de la pàgina de la pràctica.",
    descripcioTasca: "Fes la Pràctica 5 (el producte) seguint els passos de la pàgina (enllaç a sota) i envia aquest formulari en acabar-la. El panell es defensa a l'aula (R1 codi + R2 circuit). Després, fes l'Entrega final.",
    maxPoints: 33,  // com la resta de tasques de la SA a Classroom
    materials: [pagina('sa2', '05-panell-senyalitzacio', 'Pràctica 5 · Panell de senyalització (passos)')],
    items: [
      p('Estat «Tot correcte»: color RGB / so (piezo) / relé'),
      p('Estat «Avís»: color RGB / so (piezo) / relé'),
      p('Estat «Alarma»: color RGB / so (piezo) / relé'),
      p('Un error que has trobat i com l’has resolt',
        'Pregunta del quadern tècnic.')
    ]
  },

  // =========================================================================
  'sa2-final': {
    ...SA2,
    titol: 'SA2 · Entrega final',
    descripcioForm: "Tancament de la SA2: autoavaluació i checklist. Fes-la quan hagis acabat la Pràctica 5.",
    descripcioTasca: "Fes-la quan hagis acabat la Pràctica 5 i la defensa d'1 minut. No té nota pròpia: és la teva autoavaluació i el repàs final.",
    // Sense maxPoints: tasca sense qualificació.
    materials: [{ link: { url: `${WEB_BASE}/sa2/index.html#entrega-final`, title: 'SA2 · Entrega final (portada de la SA)' } }],
    items: [
      t('Versió nucli',
        'Per aprovar n’hi ha prou amb un panell amb 2 estats clarament distingibles amb color i so.'),
      autoaval([
        'Programo seqüències amb if/switch i constants',
        'Regulo intensitat/color amb PWM (analogWrite, map)',
        'Munto el circuit amb resistència i polaritat correctes'
      ]),
      check('Checklist final: marca el que tens fet', [
        'El semàfor de 3 LED funciona i he provat el mode nit',
        'He fet el racó de mesura (volts del LED + resistència ≈ 5 V)',
        'Un LED respira i he creat colors amb el LED RGB',
        'He defensat el panell de senyalització en 1 minut',
        'He enviat els formularis de la Sessió 1 i de les Pràctiques 3, 4 i 5',
        'He guardat el codi del panell per a la mascota'
      ])
    ]
  },
  // =========================================================================
  // SA3 (2026-11-03): ① polsador · ② potenciòmetre i llum · ③ ultrasons ·
  // ④ mascota (producte) + Entrega final. Prova T1 (S4) a part, amb full resum.
  'sa3-p1': {
    ...SA3,
    titol: 'SA3 · Pràctica 1 · El polsador',
    descripcioForm: "Respostes de la Pràctica 1 (polsador i Monitor sèrie). Les preguntes són les mateixes que els ✍️ de la pàgina de la pràctica.",
    descripcioTasca: "Fes la Pràctica 1 seguint els passos de la pàgina (enllaç a sota) i envia aquest formulari en acabar-la. Compta per al quadern tècnic (25 %).",
    maxPoints: 33,  // com la resta de tasques de la SA a Classroom
    materials: [pagina('sa3', '01-polsador-debounce', 'Pràctica 1 · El polsador (passos)')],
    items: [
      p('PREDIU: què sortirà al Monitor sèrie quan premis el polsador?'),
      s('Quan no prems, el pin llegeix ____ i quan prems, ____ (HIGH/LOW)'),
      p('Per què cal l’antirebot?'),
      pOpt('⭐ Repte: el comptador arriba a 5 i torna a 0. Com ho has fet?'),
      p('El concepte nou més important d’aquesta pràctica', 'Pregunta del quadern tècnic.')
    ]
  },

  'sa3-p2': {
    ...SA3,
    titol: 'SA3 · Pràctica 2 · Potenciòmetre i sensor de llum',
    descripcioForm: "Respostes de la Pràctica 2 (entrades analògiques i llum automàtic). Les preguntes són les mateixes que els ✍️ de la pàgina de la pràctica.",
    descripcioTasca: "Fes la Pràctica 2 seguint els passos de la pàgina (enllaç a sota) i envia aquest formulari en acabar-la. Compta per al quadern tècnic (25 %).",
    maxPoints: 33,  // com la resta de tasques de la SA a Classroom
    materials: [pagina('sa3', '02-potenciometre-ldr', 'Pràctica 2 · Potenciòmetre i sensor de llum (passos)')],
    items: [
      s('Els números que llegeixes van de ____ a ____'),
      s('Número del sensor de llum (LDR) amb llum: ____ · tapat: ____'),
      p('Quina instrucció passa de 0-1023 a 0-255?'),
      p('Racó de mesura (multímetre): volts al punt d’unió del sensor de llum, número del Monitor i comprovació',
        'Format: «volts = ... V · Monitor = ... · Monitor ÷ 1023 × 5 = ... V · coincideixen? ...»'),
      p('Llum automàtic: el LED s’encén quan el número del sensor de llum és ____ que ____'),
      p('Diferència entre entrada digital i analògica', 'Pregunta del quadern tècnic.')
    ]
  },

  'sa3-p3': {
    ...SA3,
    titol: 'SA3 · Pràctica 3 · La pantalla OLED',
    descripcioForm: "Respostes de la Pràctica 3 (la pantalla OLED). Les preguntes són les mateixes que els ✍️ de la pàgina de la pràctica.",
    descripcioTasca: "Fes la Pràctica 3 seguint els passos de la pàgina (enllaç a sota) i envia aquest formulari en acabar-la. Compta per al quadern tècnic (25 %).",
    maxPoints: 33,  // com la resta de tasques de la SA a Classroom
    materials: [pagina('sa3', '03-pantalla-oled', 'Pràctica 3 · La pantalla OLED (passos)')],
    items: [
      p('Què fan la barra i la cara quan tapes el sensor de llum? Per què?'),
      p('Has canviat el text: quina línia has tocat i què volen dir els números de drawStr(x, y, text)?'),
      p('El concepte nou més important d’aquesta pràctica', 'Pregunta del quadern tècnic.')
    ]
  },

  // Tasca creada com a «La mascota reactiva» (2026-11-03) i reconvertida al
  // tamagotchi el mateix dia: el títol vell és a `titolVell` per localitzar-la.
  'sa3-p4': {
    ...SA3,
    titol: 'SA3 · Pràctica 4 · El teu tamagotchi',
    titolVell: 'SA3 · Pràctica 4 · La mascota reactiva',
    descripcioForm: "Respostes de la Pràctica 4 (el producte de la SA3): el teu tamagotchi. Les preguntes són les mateixes que els ✍️ de la pàgina de la pràctica.",
    descripcioTasca: "Fes la Pràctica 4 (el tamagotchi) seguint els passos de la pàgina (enllaç a sota) i envia aquest formulari en acabar-la. El tamagotchi es defensa a l'aula amb la rúbrica del robot. Després, fes l'Entrega final.",
    maxPoints: 33,  // com la resta de tasques de la SA a Classroom
    materials: [pagina('sa3', '05-mascota', 'Pràctica 4 · El teu tamagotchi (passos)')],
    items: [
      p('Nom i caràcter del teu tamagotchi'),
      p('Què fa cada botó (MENJAR, JUGAR, DORMIR)? Quines necessitats canvia?'),
      p('Quins sensors l’afecten i com (llum, soroll, PIR…)?'),
      p('Quan es posa TRISTA i quan MALALTA? Escriu les condicions que has programat'),
      p('Per a què serveix una funció? Posa’n un exemple del teu tamagotchi', 'Pregunta del quadern tècnic.'),
      p('Un error que has trobat i com l’has resolt', 'Pregunta del quadern tècnic.')
    ]
  },

  'sa3-final': {
    ...SA3,
    titol: 'SA3 · Entrega final',
    descripcioForm: "Tancament de la SA3: autoavaluació i checklist. Fes-la quan hagis acabat la Pràctica 4 (el tamagotchi).",
    descripcioTasca: "Fes-la quan hagis acabat la Pràctica 4 i la defensa d'1 minut del tamagotchi. No té nota pròpia: és la teva autoavaluació i el repàs abans de la prova T1.",
    // Sense maxPoints: tasca sense qualificació.
    materials: [{ link: { url: `${WEB_BASE}/sa3/index.html#entrega-final`, title: 'SA3 · Entrega final (portada de la SA)' } }],
    items: [
      t('Versió nucli',
        'Per aprovar n’hi ha prou amb un tamagotchi amb les 3 necessitats i els 3 botons (MENJAR, JUGAR, DORMIR), 1 sensor (la llum) i els estats contenta i trista.'),
      autoaval([
        'Distingeixo i llegeixo entrades digitals i analògiques',
        'Faig servir el Monitor sèrie per calibrar',
        'Escric i faig servir funcions pròpies'
      ]),
      check('Checklist final: marca el que tens fet', [
        'El polsador funciona i entenc per què llegeix «al revés» (HIGH sense prémer)',
        'He llegit el potenciòmetre i el sensor de llum i he fet el llum automàtic',
        'He fet el racó de mesura (volts del multímetre vs número del Monitor)',
        'He vist la cara i la barra a la pantalla OLED',
        'El meu tamagotchi té les seves necessitats i estats i l’he defensat en 1 minut',
        'He enviat els formularis de les Pràctiques 1, 2, 3 i 4',
        'Tinc el full resum en paper per a la prova T1'
      ])
    ]
  },
  // =========================================================================
  // SA4 (2026-11-03): ① servo · ② motor DC i pont H · ③ ultrasons → braç ·
  // ④ el braç amb potenciòmetres (producte) + Entrega final. En DRAFT (gener).
  'sa4-p1': {
    ...SA4,
    titol: 'SA4 · Pràctica 1 · El servo amb potenciòmetre',
    descripcioForm: "Respostes de la Pràctica 1 (servomotor). Les preguntes són les mateixes que els ✍️ de la pàgina de la pràctica.",
    descripcioTasca: "Fes la Pràctica 1 seguint els passos de la pàgina (enllaç a sota) i envia aquest formulari en acabar-la. Compta per al quadern tècnic (25 %).",
    maxPoints: 33,  // com la resta de tasques de la SA a Classroom
    materials: [pagina('sa4', '01-servo-potenciometre', 'Pràctica 1 · El servo amb potenciòmetre (passos)')],
    items: [
      p('PREDIU: què farà el servo de la base en girar el potenciòmetre?'),
      s('Rang d’angles de write(): de ____ a ____ graus'),
      s('Funció que reescala 0-1023 → 0-180'),
      pOpt('⭐ Repte: escombrada automàtica. Com ho has fet?'),
      p('El concepte nou més important d’aquesta pràctica', 'Pregunta del quadern tècnic.')
    ]
  },

  'sa4-p2': {
    ...SA4,
    titol: 'SA4 · Pràctica 2 · Motor DC i pont H',
    descripcioForm: "Respostes de la Pràctica 2 (motor DC i pont H). Les preguntes són les mateixes que els ✍️ de la pàgina de la pràctica.",
    descripcioTasca: "Fes la Pràctica 2 seguint els passos de la pàgina (enllaç a sota) i envia aquest formulari en acabar-la. Compta per al quadern tècnic (25 %).",
    maxPoints: 33,  // com la resta de tasques de la SA a Classroom
    materials: [pagina('sa4', '02-motor-pont-h', 'Pràctica 2 · Motor DC i pont H (passos)')],
    items: [
      p('Lògica del pont H: què fa el motor amb IN1=HIGH·IN2=LOW / IN1=LOW·IN2=HIGH / IN1=LOW·IN2=LOW?'),
      p('Com es regula la velocitat? Per quin pin?'),
      pOpt('⭐ Repte: la teva seqüència de moviments pròpia amb endavant(vel), enrere(vel) i atura(). Explica-la'),
      p('Taller (bloc D): angles límit (mínim i màxim) de la pinça (tancada i oberta), l’esquerre i el dret'),
      p('Per què cal un pont H (driver) per moure un motor?', 'Pregunta del quadern tècnic.')
    ]
  },

  'sa4-p3': {
    ...SA4,
    titol: 'SA4 · Pràctica 3 · Del sensor al braç',
    descripcioForm: "Respostes de la Pràctica 3 (l'ultrasons mou el braç). Les preguntes són les mateixes que els ✍️ de la pàgina de la pràctica.",
    descripcioTasca: "Fes la Pràctica 3 seguint els passos de la pàgina (enllaç a sota) i envia aquest formulari en acabar-la. Compta per al quadern tècnic (25 %).",
    maxPoints: 33,  // com la resta de tasques de la SA a Classroom
    materials: [pagina('sa4', '03-ultrasons-brac', 'Pràctica 3 · Del sensor al braç (passos)')],
    items: [
      p('PREDIU: què farà el braç amb la mà a 10 cm? I a 30 cm?'),
      p('Distància mesurada i què fa el braç amb l’objecte a 5 cm / 15 cm / 30 cm'),
      pOpt('⭐ Repte: pinça proporcional a la distància. A quants cm has posat la guarda de seguretat?'),
      p('Què és la massa comuna i per què és important?', 'Pregunta del quadern tècnic.')
    ]
  },

  'sa4-p4': {
    ...SA4,
    titol: 'SA4 · Pràctica 4 · El braç amb potenciòmetres',
    descripcioForm: "Respostes de la Pràctica 4 (el producte de la SA4). Les preguntes són les mateixes que els ✍️ de la pàgina de la pràctica.",
    descripcioTasca: "Fes la Pràctica 4 (el producte) seguint els passos de la pàgina (enllaç a sota) i envia aquest formulari en acabar-la. El braç es defensa a l'aula (R1, R2 i R3). Després, fes l'Entrega final.",
    maxPoints: 33,  // com la resta de tasques de la SA a Classroom
    materials: [pagina('sa4', '04-brac-potenciometres', 'Pràctica 4 · El braç amb potenciòmetres (passos)')],
    items: [
      p('El teu pseudocodi del control d’una articulació (3-5 línies)'),
      p('Angles límit (mínim i màxim) de la base, l’esquerre, el dret i la pinça'),
      p('Zona morta triada (°) i per què'),
      p('Com has trobat aquests angles límit i com saps que el servo no força el topall?', 'Pregunta del quadern tècnic.'),
      p('Un error que has trobat i com l’has resolt', 'Pregunta del quadern tècnic.')
    ]
  },

  'sa4-final': {
    ...SA4,
    titol: 'SA4 · Entrega final',
    descripcioForm: "Tancament de la SA4: autoavaluació i checklist. Fes-la quan hagis acabat la Pràctica 4 (el braç amb potenciòmetres).",
    descripcioTasca: "Fes-la quan hagis acabat la Pràctica 4 i la defensa d'1 minut del braç. No té nota pròpia: és la teva autoavaluació i el repàs final.",
    materials: [{ link: { url: `${WEB_BASE}/sa4/index.html#entrega-final`, title: 'SA4 · Entrega final (portada de la SA)' } }],
    items: [
      t('Versió nucli',
        'Per aprovar n’hi ha prou amb el braç movent-se amb els potenciòmetres dins dels angles límit, amb la massa comuna i l’alimentació externa ben fetes.'),
      autoaval([
        'Controlo la posició d’un servo dins del seu rang segur i la velocitat d’un motor',
        'Munto el circuit amb seguretat (massa comuna, alimentació externa)',
        'Faig que el braç respongui a un sensor',
        'He muntat i cablejat el meu MeArm'
      ]),
      check('Checklist final: marca el que tens fet', [
        'El servo segueix el potenciòmetre i sé el rang de write()',
        'He mogut el motor DC endavant, enrere i a diferents velocitats',
        'L’ultrasons fa moure el braç',
        'El braç es mou amb els 4 potenciòmetres dins dels angles límit i l’he defensat',
        'He muntat el MeArm (blocs A-E) als torns de taller',
        'He enviat els formularis de les Pràctiques 1, 2, 3 i 4',
        'Tinc el full del quadern de cada sessió omplert'
      ])
    ]
  },
  // =========================================================================
  // SA5 (2026-11-03): ① selector · ② inclinació · ③ el braç obeeix ordres
  // (04_brac_ordres, taller S2) · ④ ràdio: el comandament (03_radio, producte
  // + comparació C++/Python) + Entrega final. En DRAFT (2n trimestre).
  'sa5-p1': {
    ...SA5,
    titol: 'SA5 · Pràctica 1 · El selector d’articulació',
    descripcioForm: "Respostes de la Pràctica 1 (primer programa MicroPython). Les preguntes són les mateixes que els ✍️ de la pàgina de la pràctica.",
    descripcioTasca: "Fes la Pràctica 1 seguint els passos de la pàgina (enllaç a sota) i envia aquest formulari en acabar-la. Compta per al quadern tècnic (25 %).",
    maxPoints: 33,  // com la resta de tasques de la SA a Classroom
    materials: [pagina('sa5', '01-selector-articulacio', 'Pràctica 1 · El selector d’articulació (passos)')],
    items: [
      p('PREDIU: quina lletra surt en engegar? I si prems B cinc vegades?'),
      p('Diferència entre display.show() i display.scroll()'),
      p('Per què ARTICULACIONS[0] és "B" i no "E"?'),
      pOpt('⭐ Repte: una imatge pròpia per a cada articulació. Com ho has fet?'),
      p('Per què la indentació és important en Python?', 'Pregunta del quadern tècnic.')
    ]
  },

  'sa5-p2': {
    ...SA5,
    titol: 'SA5 · Pràctica 2 · La inclinació com a gest',
    descripcioForm: "Respostes de la Pràctica 2 (l'acceleròmetre). Les preguntes són les mateixes que els ✍️ de la pàgina de la pràctica.",
    descripcioTasca: "Fes la Pràctica 2 seguint els passos de la pàgina (enllaç a sota) i envia aquest formulari en acabar-la. Compta per al quadern tècnic (25 %).",
    maxPoints: 33,  // com la resta de tasques de la SA a Classroom
    materials: [pagina('sa5', '02-inclinacio', 'Pràctica 2 · La inclinació com a gest (passos)')],
    items: [
      p('PREDIU: quant valdran x i y amb la placa plana? I de cantell?'),
      p('Valors de x i y amb la placa plana / inclinada a la dreta / inclinada endavant'),
      p('Llindar triat i per què no és 0'),
      pOpt('⭐ Repte: zona morta proporcional (com més inclines, més ràpid). Com ho has fet?'),
      p('El concepte nou més important d’aquesta pràctica', 'Pregunta del quadern tècnic.')
    ]
  },

  'sa5-p3': {
    ...SA5,
    titol: 'SA5 · Pràctica 3 · El braç obeeix ordres',
    descripcioForm: "Respostes de la Pràctica 3 (l'Arduino del braç obeeix ordres de text). Les preguntes són les mateixes que els ✍️ de la pàgina de la pràctica.",
    descripcioTasca: "Fes la Pràctica 3 (taller de la Sessió 2) seguint els passos de la pàgina (enllaç a sota) i envia aquest formulari en acabar-la. Compta per al quadern tècnic (25 %).",
    maxPoints: 33,  // com la resta de tasques de la SA a Classroom
    materials: [pagina('sa5', '04-brac-ordres', 'Pràctica 3 · El braç obeeix ordres (passos)')],
    items: [
      p('PREDIU: si escrius B+ deu vegades, quants graus es mou la base? I amb b+ (minúscula)? I amb X?'),
      p('Què fa el braç amb l’ordre B+? I amb P?'),
      p('Què és el protocol d’ordres del braç i per què cal que sigui el mateix a les dues bandes?', 'Pregunta del quadern tècnic.')
    ]
  },

  'sa5-p4': {
    ...SA5,
    titol: 'SA5 · Pràctica 4 · Ràdio: el comandament del braç',
    descripcioForm: "Respostes de la Pràctica 4 (el producte de la SA5): el comandament per ràdio i la comparació C++ ↔ Python. Les preguntes són les mateixes que els ✍️ de la pàgina de la pràctica.",
    descripcioTasca: "Fes la Pràctica 4 (el producte) seguint els passos de la pàgina (enllaç a sota) i envia aquest formulari en acabar-la. S'avalua amb R1 (codi) i R4 (comparació). Després, fes l'Entrega final.",
    maxPoints: 33,  // com la resta de tasques de la SA a Classroom
    materials: [pagina('sa5', '03-radio-comandament', 'Pràctica 4 · Ràdio: el comandament del braç (passos)')],
    items: [
      p('El teu pseudocodi del comandament (3-5 línies)'),
      p('PREDIU: si la teva placa té GRUP = 10 i la del company GRUP = 12, què passa quan inclines la teva?'),
      p('Què han de compartir les dues plaques perquè es «sentin»? I què ha de ser diferent del dels companys?'),
      s('Instrucció que envia / instrucció que rep'),
      pOpt('⭐ Repte: el servo esquerre amb els botons (E+ / E-). Com ho has fet?'),
      t('Comparació C++ ↔ Python', 'La mateixa taula de la pàgina: com és cada aspecte en Python (el comandament) si en Arduino (04_brac_ordres) és…'),
      s('Estructura: en Arduino és setup()/loop(); en Python?'),
      s('Final d’instrucció: en Arduino és « ; »; en Python?'),
      s('Blocs de codi: en Arduino són { }; en Python?'),
      s('Declarar una variable: en Arduino és int aBase = 90; en Python?'),
      s('Comparar un text: en Arduino és if (ordre == "B+"); en Python?'),
      s('Mostrar un valor: en Arduino és Serial.println(x); en Python?'),
      p('Un error que has trobat i com l’has resolt', 'Pregunta del quadern tècnic.')
    ]
  },

  'sa5-final': {
    ...SA5,
    titol: 'SA5 · Entrega final',
    descripcioForm: "Tancament de la SA5: autoavaluació i checklist. Fes-la quan hagis acabat la Pràctica 4 (el comandament).",
    descripcioTasca: "Fes-la quan hagis acabat la Pràctica 4 i la defensa del comandament. No té nota pròpia: és la teva autoavaluació i el repàs final.",
    materials: [{ link: { url: `${WEB_BASE}/sa5/index.html#entrega-final`, title: 'SA5 · Entrega final (portada de la SA)' } }],
    items: [
      t('Versió nucli',
        'Per aprovar n’hi ha prou amb el comandament movent almenys una articulació del braç per ràdio, i la taula comparativa C++ ↔ Python completa.'),
      autoaval([
        'Escric Python ben indentat que funciona',
        'Faig servir l’acceleròmetre amb un llindar',
        'Comunico dues plaques per ràdio i moc el braç a distància'
      ]),
      check('Checklist final: marca el que tens fet', [
        'El selector d’articulació funciona (el meu primer MicroPython)',
        'La inclinació es converteix en un gest amb un llindar',
        'El braç obeeix ordres escrites al Monitor sèrie',
        'Dues plaques es parlen per ràdio amb el meu grup',
        'El braç es mou amb el comandament a través del pont',
        'He completat la taula comparativa C++ ↔ Python',
        'He enviat els formularis de les Pràctiques 1, 2, 3 i 4',
        'Tinc el full del quadern de cada sessió omplert'
      ])
    ]
  },

  // =========================================================================
  'sa6-p1': {
    ...SA6,
    titol: 'SA6 · Pràctica 1 · El homing del braç',
    descripcioForm: "Respostes de la Pràctica 1 (llaç obert vs llaç tancat: el homing de la base). Les preguntes són les mateixes que els ✍️ de la pàgina de la pràctica.",
    descripcioTasca: "Fes la Pràctica 1 seguint els passos de la pàgina (enllaç a sota) i envia aquest formulari en acabar-la. Compta per al quadern tècnic (25 %).",
    maxPoints: 33,  // com la resta de tasques de la SA a Classroom
    materials: [pagina('sa6', '01-llac-obert-vs-tancat', 'Pràctica 1 · El homing del braç (passos)')],
    items: [
      p('PREDIU: si has muntat el final de carrera a 30°, en quin mode la base l’acabarà tocant? I si fos a 15°?'),
      s('A quants graus ha tocat el final de carrera en mode tancat (el zero real de la teva base)?'),
      p('Diferència principal entre llaç obert i llaç tancat'),
      p('El diagrama de blocs del teu braç: quina és la consigna, quin l’actuador i quin el sensor?'),
      p('Què és la realimentació en un sistema de control?', 'Pregunta del quadern tècnic.')
    ]
  },

  'sa6-p2': {
    ...SA6,
    titol: 'SA6 · Pràctica 2 · La pinça automàtica',
    descripcioForm: "Respostes de la Pràctica 2 (histèresi: la pinça automàtica). Les preguntes són les mateixes que els ✍️ de la pàgina de la pràctica.",
    descripcioTasca: "Fes la Pràctica 2 seguint els passos de la pàgina (enllaç a sota) i envia aquest formulari en acabar-la. Compta per al quadern tècnic (25 %).",
    maxPoints: 33,  // com la resta de tasques de la SA a Classroom
    materials: [pagina('sa6', '02-pinca-histeresi', 'Pràctica 2 · La pinça automàtica (passos)')],
    items: [
      p('PREDIU: acostes la mà de 20 cm a 3 cm i després l’allunyes. A quina distància es tanca la pinça? A quina s’obre? I si deixes la mà quieta a 8 cm?'),
      s('Llindars del codi: es tanca a ____ cm · s’obre a ____ cm'),
      p('Què passaria sense histèresi (amb un sol llindar)?'),
      s('Taller: angles límit definitius de cada servo (base · esquerre · dret · pinça)'),
      pOpt('⭐ Repte: un LED que mostra si la pinça és tancada. Com ho has fet?'),
      p('Per què serveix la histèresi?', 'Pregunta del quadern tècnic.')
    ]
  },

  'sa6-p3': {
    ...SA6,
    titol: 'SA6 · Pràctica 3 · La màquina d’estats del braç',
    descripcioForm: "Respostes de la Pràctica 3 (el producte de la SA6): la màquina d'estats del braç i el comandament. Les preguntes són les mateixes que els ✍️ de la pàgina de la pràctica.",
    descripcioTasca: "Fes la Pràctica 3 (el producte) seguint els passos de la pàgina (enllaç a sota) i envia aquest formulari en acabar-la. S'avalua amb R1 (codi), R3 (control) i R4 (documentació). Després, fes l'Entrega final.",
    maxPoints: 33,  // com la resta de tasques de la SA a Classroom
    materials: [pagina('sa6', '03-maquina-estats', 'Pràctica 3 · La màquina d’estats del braç (passos)')],
    items: [
      p('El teu diagrama d’estats: escriu una línia per fletxa (ESTAT → ESTAT quan …)'),
      p('PREDIU: si toques el sensor de col·lisió a mig replay, què fa el braç? I si després el deixes anar però no prems A?'),
      p('Per què la comprovació de l’emergència va abans del switch i no dins d’un case?'),
      p('Producte: quina ordre del comandament fa cada canvi d’estat? (A, R, G)'),
      p('Un error que has trobat i com l’has resolt', 'Pregunta del quadern tècnic.')
    ]
  },

  'sa6-final': {
    ...SA6,
    titol: 'SA6 · Entrega final',
    descripcioForm: "Tancament de la SA6: autoavaluació i checklist. Fes-la quan hagis acabat la Pràctica 3 (la màquina d'estats del braç).",
    descripcioTasca: "Fes-la quan hagis acabat la Pràctica 3 i la defensa de 2-3' del braç. No té nota pròpia: és la teva autoavaluació i el repàs final abans de la prova T2.",
    materials: [{ link: { url: `${WEB_BASE}/sa6/index.html#entrega-final`, title: 'SA6 · Entrega final (portada de la SA)' } }],
    items: [
      t('Versió nucli',
        'Per aprovar n’hi ha prou amb la pinça amb histèresi funcionant i la màquina d’estats amb repòs, manual i emergència, documentades amb els diagrames.'),
      autoaval([
        'Distingeixo llaç obert i llaç tancat',
        'Implemento la histèresi de la pinça i la màquina d’estats del braç',
        'Explico el diagrama de blocs i el diagrama d’estats del meu braç'
      ]),
      check('Checklist final: marca el que tens fet', [
        'El sensor de col·lisió és muntat a la base i el homing troba el zero',
        'He dibuixat el diagrama de blocs del braç',
        'La pinça automàtica funciona amb histèresi, sense clic-clic',
        'He anotat els angles límit i el cablatge és endreçat i etiquetat',
        'La màquina d’estats funciona: repòs, manual, replay i emergència',
        'El braç obeeix el comandament per ràdio (ordres A, R i G)',
        'He enviat els formularis de les Pràctiques 1, 2 i 3',
        'Tinc el full del quadern de cada sessió omplert',
        'He repassat la targeta de MicroPython per a la prova T2'
      ])
    ]
  },

  // =========================================================================
  'sa7-p1': {
    ...SA7, titol: 'SA7 · Pràctica 1 · Moviment bàsic', maxPoints: 33,
    descripcioForm: descForm(1, 'funcions per moure el rover'), descripcioTasca: descTasca(1),
    materials: [pagina('sa7', '01-moviment-basic', 'Pràctica 1 · Moviment bàsic (passos)')],
    items: [
      p('PREDIU: què farà el rover amb gira_dreta()? Què fa cada roda?'),
      s('Pins dels motors del teu rover: esquerre (ENA, IN1, IN2) i dret (ENB, IN3, IN4)'),
      p('Per girar a la dreta, què ha de fer la roda esquerra respecte de la dreta?'),
      p('La teva seqüència de ball: quines funcions i quins temps?'),
      p('Per què tot el moviment passa per una sola funció, motors()?', QT)
    ]
  },
  'sa7-p2': {
    ...SA7, titol: 'SA7 · Pràctica 2 · Trajectòria en quadrat', maxPoints: 33,
    descripcioForm: descForm(2, 'calibrar el gir de 90°'), descripcioTasca: descTasca(2),
    materials: [pagina('sa7', '02-trajectoria-quadrat', 'Pràctica 2 · Trajectòria en quadrat (passos)')],
    items: [
      p('El temps teòric de gir de 90° i els teus càlculs (D, velocitat i L)'),
      p('PREDIU: el rover farà el quadrat una vegada o sense parar? I si T_GIR_90 és massa gran, el quadrat sortirà obert o creuat?'),
      p('El gir de 90° calibrat (ms) i la diferència amb el teòric. A què creus que es deu?'),
      p('Quant s’allunya del punt inicial després d’una volta? Per què?'),
      pOpt('⭐ Repte: triangle o «L». Com ho has fet?'),
      p('Per què el control per temps és senzill però poc fiable?', QT)
    ]
  },
  'sa7-p3': {
    ...SA7, titol: 'SA7 · Pràctica 3 · Evita-obstacles', maxPoints: 33,
    descripcioForm: descForm(3, 'percepció, decisió, acció'), descripcioTasca: descTasca(3),
    materials: [pagina('sa7', '03-evita-obstacles', 'Pràctica 3 · Evita-obstacles (passos)')],
    items: [
      p('PREDIU: a quina distància deixarà d’avançar? Què farà quan detecti l’obstacle, i en quin ordre?'),
      p('A quina distància gira el teu rover? Quin DIST_MIN has triat i per què?'),
      p('Quina millora has fet a la maniobra i per què?'),
      p('Què és el cicle percepció → decisió → acció? Explica’l amb el teu rover.', QT)
    ]
  },
  'sa7-p4': {
    ...SA7, titol: 'SA7 · Pràctica 4 · Seguidor de línia', maxPoints: 33,
    descripcioForm: descForm(4, 'el producte: seguidor de línia i repte de pista'),
    descripcioTasca: "Fes la Pràctica 4 (el producte) seguint els passos de la pàgina (enllaç a sota) i envia aquest formulari en acabar-la. S'avalua amb R1, R3 i R4. Després, fes l'Entrega final.",
    materials: [pagina('sa7', '04-seguidor-linia', 'Pràctica 4 · Seguidor de línia (passos)')],
    items: [
      s('El valor «línia» i el valor «fons» de cada sensor, i el llindar que tries'),
      p('PREDIU: què farà el rover si només el sensor esquerre veu la línia? I si cap dels dos no la veu?'),
      s('Temps de volta: intent 1, intent 2 i intent 3'),
      p('Quines millores has fet entre intents i quina ha funcionat millor?'),
      p('Un error que has trobat i com l’has resolt', QT)
    ]
  },
  'sa7-final': {
    ...SA7, titol: 'SA7 · Entrega final',
    descripcioForm: "Tancament de la SA7: autoavaluació i checklist. Fes-la quan hagis acabat la Pràctica 4 (el seguidor de línia).",
    descripcioTasca: "Fes-la quan hagis acabat la Pràctica 4 i la demostració a la pista. No té nota pròpia: és la teva autoavaluació i el repàs final.",
    materials: [{ link: { url: `${WEB_BASE}/sa7/index.html#entrega-final`, title: 'SA7 · Entrega final (portada de la SA)' } }],
    items: [
      t('Versió nucli', 'Per aprovar n’hi ha prou amb el rover movent-se amb funcions pròpies, evitant obstacles i fent almenys una volta a la pista seguint la línia, amb el registre d’iteracions.'),
      autoaval([
        'Programo el moviment del rover amb funcions (cinemàtica diferencial)',
        'Calibro una trajectòria i entenc els límits del control per temps',
        'Faig un comportament autònom (percepció → decisió → acció) i l’itero'
      ]),
      check('Checklist final: marca el que tens fet', [
        'El rover és muntat i ha passat el test de fum',
        'He adaptat el codi als pins del meu rover',
        'El rover fa el quadrat amb el gir calibrat',
        'El rover evita obstacles amb l’ultrasons',
        'El rover segueix la línia i he cronometrat tres voltes',
        'He enviat els formularis i les fotos de les Pràctiques 1, 2, 3 i 4',
        'Tinc el full del quadern de cada sessió omplert'
      ])
    ]
  },

  // =========================================================================
  'sa8-p1': {
    ...SA8, titol: 'SA8 · Pràctica 1 · L’emissor', maxPoints: 33,
    descripcioForm: descForm(1, 'telemetria: l’emissor'), descripcioTasca: descTasca(1),
    materials: [pagina('sa8', '01-telemetria-emissor', 'Pràctica 1 · L’emissor (passos)')],
    items: [
      p('PREDIU: què veuràs a la pantalla de l’emissora? I si la receptora té un group diferent, què li arribarà?'),
      s('Quines magnituds envies i cada quant?'),
      p('Per què les dades s’envien etiquetades ("T:23;L:120") i no només el número?', QT)
    ]
  },
  'sa8-p2': {
    ...SA8, titol: 'SA8 · Pràctica 2 · El receptor', maxPoints: 33,
    descripcioForm: descForm(2, 'telemetria: el receptor'), descripcioTasca: descTasca(2),
    materials: [pagina('sa8', '02-telemetria-receptor', 'Pràctica 2 · El receptor (passos)')],
    items: [
      p('PREDIU: què mostrarà la pantalla si arriba "T:31;L:80"? I si arriba "hola"?'),
      p('Què mostra el teu gràfic? Quan han canviat les dades i per què?'),
      p('Quin LLINDAR_TEMP has triat i per què?'),
      p('Quina meitat has escrit a full en blanc i què t’ha costat més?'),
      p('Què és la telemetria? Posa’n un exemple real.', QT)
    ]
  },
  'sa8-p3': {
    ...SA8, titol: 'SA8 · Pràctica 3 · Auditoria d’un producte IoT', maxPoints: 33,
    descripcioForm: descForm(3, 'l’informe d’auditoria'), descripcioTasca: descTasca(3),
    materials: [paginaDoc('sa8', 'sa8-auditoria-iot', 'Pràctica 3 · Auditoria d’un producte IoT (passos)')],
    items: [
      s('El producte que audites i per a què serveix (1 línia)'),
      p('Tres dades personals que recull el producte'),
      p('Un risc tècnic: què pot fallar o ser interceptat, i on del diagrama'),
      p('Un risc de privacitat: què pot saber algú que no hauria de saber-ho'),
      p('Una recomanació al fabricant i una al comprador'),
      p('Després de l’auditoria, què faràs diferent amb els aparells connectats de casa teva?', QT)
    ]
  },
  'sa8-p4': {
    ...SA8, titol: 'SA8 · Pràctica 4 · IA de gestos', maxPoints: 33,
    descripcioForm: descForm(4, 'classificar amb regles'), descripcioTasca: descTasca(4),
    materials: [pagina('sa8', '03-ia-gestos', 'Pràctica 4 · IA de gestos (passos)')],
    items: [
      p('PREDIU: amb la placa plana sobre la taula, quant valdran x, y i z? Quin gest dirà el programa?'),
      p('Quins gestos classifica el programa, i quin llindar has canviat (abans i després)?'),
      p('Per què importa l’ordre dels if al classificador?', QT)
    ]
  },
  'sa8-p5': {
    ...SA8, titol: 'SA8 · Pràctica 5 · Teachable Machine', maxPoints: 33,
    descripcioForm: descForm(5, 'el producte: una IA que aprèn d’exemples'),
    descripcioTasca: "Fes la Pràctica 5 (el producte) seguint els passos de la pàgina (enllaç a sota) i envia aquest formulari en acabar-la. S'avalua amb R1, R3 i R4. Després, fes l'Entrega final.",
    materials: [paginaDoc('sa8', 'sa8-practica-teachable-machine', 'Pràctica 5 · Teachable Machine (passos)')],
    items: [
      p('El mode que tries i les teves classes'),
      s('PREDIU: quants exemples creus que necessitaràs de cada classe?'),
      p('Quan falla el teu model? Posa dos casos amb el percentatge de confiança.'),
      p('Ha millorat? Què has après sobre quines dades calen?'),
      p('Biaix: si l’has entrenat només amb les teves condicions, amb qui o quan fallaria?'),
      p('Quina diferència hi ha entre el classificador per regles i aquest? Quan val més la pena cadascun?'),
      p('Si el teu model classifiqués persones, què hauries de demanar abans?', QT)
    ]
  },
  'sa8-final': {
    ...SA8, titol: 'SA8 · Entrega final',
    descripcioForm: "Tancament de la SA8: autoavaluació i checklist. Fes-la quan hagis acabat la Pràctica 5 (Teachable Machine).",
    descripcioTasca: "Fes-la quan hagis acabat la Pràctica 5 i la demostració del classificador. No té nota pròpia: és la teva autoavaluació i el repàs final.",
    materials: [{ link: { url: `${WEB_BASE}/sa8/index.html#entrega-final`, title: 'SA8 · Entrega final (portada de la SA)' } }],
    items: [
      t('Versió nucli', 'Per aprovar n’hi ha prou amb la telemetria funcionant entre dues plaques, l’informe d’auditoria amb diagrama, un risc i una recomanació, i el classificador entrenat amb la reflexió sobre el biaix.'),
      autoaval([
        'Envio i rebo dades de sensors per ràdio (telemetria)',
        'Analitzo l’arquitectura i els riscos d’un producte IoT',
        'Explico com classifica una IA i on pot fallar (biaix, dades)'
      ]),
      check('Checklist final: marca el que tens fet', [
        'L’emissora envia dades etiquetades',
        'La receptora les rep, avisa i les registra',
        'He fet l’informe d’auditoria i el peritatge creuat',
        'He ajustat les regles del classificador de gestos',
        'He entrenat i provat un model amb Teachable Machine',
        'He enviat els formularis i les fotos de les Pràctiques 1, 2, 3, 4 i 5',
        'Tinc el full del quadern de cada sessió omplert'
      ])
    ]
  },

  // =========================================================================
  'sa9-p1': {
    ...SA9, titol: 'SA9 · Pràctica 1 · Idear', maxPoints: 33,
    descripcioForm: descForm(1, 'idear: repte, requisits, disseny i fites'), descripcioTasca: descTasca(1),
    materials: [paginaDoc('sa9', 'sa9-practica-1-idear', 'Pràctica 1 · Idear (passos)')],
    items: [
      p('El repte que tries i el problema real que resol'),
      p('Els teus 3 requisits mínims'),
      p('Els sensors (entrada), els actuadors (sortida) i el tipus de control'),
      p('Les teves fites: què tindràs fet al final de la S2, de la S3 i de la S4'),
      p('De les quatre feines, quina et costarà més i com evitaràs oblidar-la?', QT)
    ]
  },
  'sa9-p2': {
    ...SA9, titol: 'SA9 · Pràctica 2 · Prototipar', maxPoints: 33,
    descripcioForm: descForm(2, 'el prototip mínim'), descripcioTasca: descTasca(2),
    materials: [paginaDoc('sa9', 'sa9-practica-2-prototipar', 'Pràctica 2 · Prototipar (passos)')],
    items: [
      p('Quins mòduls (funcions) té el teu codi i què fa cadascun?'),
      p('Quin mòdul ja funciona i quin encara no? Què hi falla?'),
      p('Has arribat a la fita de la S2? Si no, què has replanificat?'),
      p('Un error que has trobat i com l’has resolt', QT)
    ]
  },
  'sa9-p3': {
    ...SA9, titol: 'SA9 · Pràctica 3 · Provar', maxPoints: 33,
    descripcioForm: descForm(3, 'proves, iteració i revisió creuada'), descripcioTasca: descTasca(3),
    materials: [paginaDoc('sa9', 'sa9-practica-3-provar', 'Pràctica 3 · Provar (passos)')],
    items: [
      p('Versió 1: quins requisits es compleixen i què fallava?'),
      p('Versió 2: què has canviat i quin ha estat el resultat?'),
      p('La millora i el dubte que has donat al company'),
      p('Què has après de la primera iteració?', QT)
    ]
  },
  'sa9-p4': {
    ...SA9, titol: 'SA9 · Pràctica 4 · Comunicar', maxPoints: 33,
    descripcioForm: descForm(4, 'el producte: dossier, defensa i retrospectiva'),
    descripcioTasca: "Fes la Pràctica 4 (el producte del curs) seguint els passos de la pàgina (enllaç a sota) i envia aquest formulari en acabar-la. S'avalua amb R1-R5. Després, fes l'Entrega final.",
    materials: [paginaDoc('sa9', 'sa9-practica-4-comunicar', 'Pràctica 4 · Comunicar (passos)')],
    items: [
      p('L’ordre de la teva defensa, amb una frase per a cada part'),
      p('Una alternativa que vas descartar i per què'),
      p('L’impacte del teu sistema: una reflexió d’ètica o de sostenibilitat'),
      p('Retrospectiva: què t’emportes d’aquest curs de robòtica?', QT)
    ]
  },
  'sa9-final': {
    ...SA9, titol: 'SA9 · Entrega final',
    descripcioForm: "Tancament de la SA9 i del curs: autoavaluació i checklist. Fes-la quan hagis acabat la Pràctica 4 (la defensa).",
    descripcioTasca: "Fes-la quan hagis acabat la Pràctica 4 i la defensa del projecte. No té nota pròpia: és la teva autoavaluació i el repàs final.",
    materials: [{ link: { url: `${WEB_BASE}/sa9/index.html#entrega-final`, title: 'SA9 · Entrega final (portada de la SA)' } }],
    items: [
      t('Versió nucli', 'Per aprovar n’hi ha prou amb els requisits mínims complerts i demostrables en directe, amb el dossier a les seccions essencials.'),
      autoaval([
        'El meu sistema compleix els requisits mínims',
        'He treballat amb planificació àgil i fites per sessió',
        'He iterat (provar → millorar) i ho he documentat',
        'He ajudat i he fet una revisió creuada útil (una millora i un dubte)'
      ]),
      check('Checklist final: marca el que tens fet', [
        'Sistema funcional',
        'Dossier tècnic complet',
        'Codi comentat',
        'Defensa oral individual feta',
        'Revisió creuada del codi d’un company',
        'He enviat els formularis i les fotos de les Pràctiques 1, 2, 3 i 4'
      ])
    ]
  },
};
