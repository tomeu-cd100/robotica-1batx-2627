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
};
