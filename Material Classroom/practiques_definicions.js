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
const pagina = (sa, fitxer, titol) => ({
  link: { url: `${WEB_BASE}/${sa}/codi/${fitxer}.html`, title: titol }
});
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
};
