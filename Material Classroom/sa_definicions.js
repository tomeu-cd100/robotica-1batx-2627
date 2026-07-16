// Definicions dels Forms de les fitxes base SA1-SA9.
// Transcripció fidel de Classes/SAn/SAn_fitxa_alumnat.md:
// - Activitats -> preguntes (obertes; les pràctiques com a instruccions).
// - Autoavaluació -> graella (Insuficient/Suficient·Bé/Notable/Excel·lent).
// - Quadern tècnic -> preguntes de paràgraf.
// - Objectius i lliuraments -> descripció/element de text inicial.
// DEPURA i la taula de rúbriques queden a la pàgina web de la fitxa.
import { t, p, pOpt, s, sOpt, radio, check, autoaval, WEB_BASE } from './_form_sa_lib.js';

const fitxaWeb = (n) => ({
  link: {
    url: `${WEB_BASE}/sa${n}/sa${n}-fitxa-alumnat.html`,
    title: `SA${n} · Fitxa base al web (objectius, rúbriques i DEPURA)`
  }
});

export const DEFINICIONS = {

  // =========================================================================
  sa1: {
    sa: 'sa1',
    titol: 'SA1 · Fitxa base — Què és un robot?',
    descripcioForm: "Full de respostes de la fitxa base de la SA1. Descobriràs què és un robot i un sistema embegut, coneixeràs la placa Arduino i faràs el teu primer programa. Tingues la fitxa del web al costat (objectius, rúbriques i DEPURA).",
    descripcioTasca: "Full de respostes de la fitxa base de la SA1 (activitats 1-4 + autoavaluació + quadern tècnic). El producte (fitxa-pòster) i la prova diagnòstica es lliuren a part. S'avalua amb l'escala 0-10 de la matèria.",
    topicName: 'SA1 · Introducció a la robòtica i sistemes embeguts',
    state: 'PUBLISHED',
    maxPoints: 10,
    materials: [fitxaWeb(1)],
    items: [
      t('Abans de començar',
        "En acabar aquesta SA podré: 1) analitzar un sistema automàtic amb el model entrada → procés → sortida; 2) reconèixer les parts de la placa Arduino i distingir digital d'analògic; 3) predir, llegir i modificar un programa senzill (Blink); 4) treballar amb seguretat i portar el quadern tècnic al dia.\n\nVersió nucli (ja és assoliment satisfactori): pòster amb entrada → procés → sortida ben identificades i el dilema ètic plantejat."),
      s('Parella (nom, si treballes en parella)'),

      t('Activitat 1 · Entrada – Procés – Sortida',
        "Per a cada sistema, completa: què PERCEP (entrada), què DECIDEIX (procés) i què FA (sortida)."),
      p('Rentadora — Entrada / Procés / Sortida',
        'Exemple de format: «Entrada: ... · Procés: ... · Sortida: ...»'),
      p('Dron — Entrada / Procés / Sortida'),
      p('Semàfor — Entrada / Procés / Sortida'),

      t('Activitat 2 · La placa Arduino UNO',
        "Etiqueta l'esquema mut (document d'esquemes de connexions, apartat 1.2): microcontrolador · pins digitals · pins analògics (A0–A5) · alimentació (5V, GND) · USB · PWM (~)."),
      p('Parts de la placa que has identificat a l’esquema mut',
        'Enumera-les; si alguna no la tens clara, digues quina.'),
      p('Digital vs analògic: quina diferència hi ha? Posa’n un exemple de cada',
        'Pista: digital = dos estats (0 o 5 V, com un interruptor); analògic = molts valors (com el volum).'),

      t('Activitat 3 · Normes de seguretat',
        "Llegeix el document de normes de seguretat i SIGNA el full a l'aula."),
      p('Les 2 normes que et semblen més importants (1 i 2)'),

      t('Activitat 4 · El teu primer programa (Blink) — PRIMM',
        "Segueix els passos PRIMM amb blink.ino (el codi és a la carpeta de codi de la SA1)."),
      p('0 · PREDIU (sense pujar-lo encara): què creus que farà el LED?'),
      s('1 · EXECUTA: coincideix amb la teva predicció? Què has vist de diferent?'),
      p('2 · INVESTIGA blink.ino: què hi ha a setup()? I a loop()? Què fa delay(1000)?'),
      s('3 · MODIFICA el temps perquè parpellegi més ràpid. Quin valor has posat?'),
      p('4 · CREA un repte (blink_repte.ino): 3 parpellejos ràpids i una pausa llarga, en bucle',
        'Explica com ho has resolt o enganxa el codi.'),

      t('Producte · Fitxa-pòster (es lliura a part)',
        "Tria un robot real i analitza'l amb la plantilla de fitxa-pòster (entrada-procés-sortida + dilema ètic). S'avalua amb la rúbrica R4. No es respon aquí."),

      autoaval([
        'Identifico entrada-procés-sortida d’un sistema',
        'Reconec les parts de la placa i distingeixo digital/analògic',
        'Llegeixo i modifico el codi Blink'
      ]),

      t('Quadern tècnic',
        "Aquestes tres respostes formen la teva entrada del quadern tècnic (compta el 25 %)."),
      p('Què he après'),
      p('El repte i com l’he resolt (què havia de fer, què vaig predir, com)'),
      p('Un error i com l’he resolt')
    ]
  },

  // =========================================================================
  sa2: {
    sa: 'sa2',
    titol: 'SA2 · Fitxa base — Sortides digitals i PWM',
    descripcioForm: "Full de respostes de la fitxa base de la SA2: encén, gradua i coordina llums i so. Recorda: cada LED amb resistència de 220 Ω i polaritat correcta.",
    descripcioTasca: "Full de respostes de la fitxa base de la SA2 (activitats 1-4 + autoavaluació + quadern tècnic). El producte (panell de senyalització) es defensa i es lliura a part (rúbriques R1 i R2).",
    topicName: 'SA2 · Sortides digitals i PWM',
    state: 'PUBLISHED',
    maxPoints: 10,
    materials: [fitxaWeb(2)],
    items: [
      t('Abans de començar',
        "En acabar aquesta SA podré: 1) escriure programes amb variables, if i for que controlin llums i so; 2) graduar intensitat i color amb PWM (analogWrite, 0–255, pins ~); 3) muntar circuits correctes (resistència, polaritat) i mesurar-hi tensions amb el multímetre.\n\nVersió nucli: panell amb 2 estats clarament distingibles amb color i so."),
      s('Parella (nom, si treballes en parella)'),

      t('Activitat 1 · LED bàsic i variables (S1)',
        "Munta un LED al pin 8 i treballa amb 01_led_basic.ino."),
      p('0 · PREDIU: mirant 01_led_basic.ino, què farà el LED?'),
      s('Canvia el temps d’encès/apagat amb una variable «temps». Quin valor has provat?'),
      p('Racó de mesura (multímetre): tensió al LED, a la resistència i la suma. Què hi observes?',
        'Format: «LED = ... V · resistència = ... V · suma ≈ ... V · observo que ...»'),
      s('Repte: codi Morse d’una lletra (· curt / − llarg). Quina lletra i quin codi?'),

      t('Activitat 2 · Semàfor (S2)',
        "Munta 3 LED (vermell-8, groc-9, verd-10) i carrega 02_semafor.ino."),
      s('Durada de cada fase: vermell / verd / groc (en segons)'),
      p('Repte: com has fet la fase nocturna (groc intermitent)?'),

      t('Activitat 3 · PWM: intensitat i color (S3)',
        "Efecte fade amb 03_fade_pwm.ino (pin 9) i LED RGB amb 04_rgb.ino."),
      s('Rang de valors d’analogWrite: de ____ a ____'),
      p('Anota 3 colors creats amb el LED RGB (valors R, G, B de cadascun)'),
      p('Repte: transició suau entre dos colors. Quins colors i com ho has fet?'),

      t('Activitat 4 · Producte: panell de senyalització (S4)',
        "Dissenya un panell que indiqui estats amb color + so + una càrrega (relé). Defensa d'1 minut: què fa el teu panell i una millora possible (s'avalua amb R1 codi i R2 circuit)."),
      p('Estat «Tot correcte»: color RGB / so (piezo) / relé'),
      p('Estat «Avís»: color RGB / so (piezo) / relé'),
      p('Estat «Alarma»: color RGB / so (piezo) / relé'),

      autoaval([
        'Programo seqüències amb for/if i variables',
        'Regulo intensitat/color amb PWM (analogWrite, map)',
        'Munto el circuit amb resistència i polaritat correctes'
      ]),

      t('Quadern tècnic',
        "Aquestes respostes formen la teva entrada del quadern tècnic (compta el 25 %)."),
      p('Concepte nou més important'),
      p('Diferència entre digitalWrite i analogWrite'),
      p('Un error i com l’he resolt')
    ]
  },

  // =========================================================================
  sa3: {
    sa: 'sa3',
    titol: 'SA3 · Fitxa base — Entrades i sensors',
    descripcioForm: "Full de respostes de la fitxa base de la SA3: fes que el sistema percebi el món. Entrades digitals i analògiques, monitor sèrie i funcions.",
    descripcioTasca: "Full de respostes de la fitxa base de la SA3 (activitats 1-4 + autoavaluació + quadern tècnic). El producte (alarma/sensor d'aparcament) es defensa a part; la prova T1 és individual dins la S4.",
    topicName: 'SA3 · Entrades i sensors',
    state: 'DRAFT',
    maxPoints: 10,
    materials: [fitxaWeb(3)],
    items: [
      t('Abans de començar',
        "En acabar aquesta SA podré: 1) llegir polsadors (amb antirebot) i sensors analògics (0–1023) i decidir amb llindars; 2) calibrar i depurar amb el Monitor sèrie i el multímetre; 3) escriure funcions pròpies que retornen un valor.\n\nVersió nucli: avís de 2 nivells segons la distància (LED + so) que funciona de manera fiable."),
      s('Parella (nom, si treballes en parella)'),

      t('Activitat 1 · Polsador i monitor sèrie (S1)',
        "Munta el polsador al pin 2 (INPUT_PULLUP), carrega 01_polsador_debounce.ino i obre el Monitor sèrie."),
      p('0 · PREDIU: què mostrarà el monitor quan premis el polsador?'),
      s('En repòs el pin llegeix ____ i en prémer ____ (HIGH/LOW)'),
      p('Per què cal l’antirebot (debounce)?'),
      p('Repte: mode toggle (cada premuda encén/apaga un LED). Com ho has fet?'),

      t('Activitat 2 · Entrades analògiques (S2)',
        "Llegeix el potenciòmetre (A0) i la LDR (A1)."),
      s('Rang de valors que llegeixes: de ____ a ____'),
      s('Quina funció converteix 0-1023 → 0-255?'),
      p('Racó de mesura (multímetre): tensió al punt mig del divisor, lectura del programa i comprovació',
        'Format: «tensió = ... V · lectura = ... · lectura/1023·5 V = ... V · coincideixen? ...»'),
      s('Llum automàtic: el LED s’encén quan la lectura de la LDR és ____ que ____'),

      t('Activitat 3 · Ultrasons i funcions (S3)',
        "Munta l'HC-SR04 (TRIG=12, ECHO=11), carrega 03_ultrasons_funcio.ino i obre el Serial Plotter."),
      s('distància (cm) = temps · ____ / 2'),
      p('Què retorna la funció mesuraDistancia()?'),
      p('Repte: funció que retorna la mitjana de 3 mesures. Per què millora la lectura?'),

      t('Activitat 4 · Producte: alarma / aparcament (S4)',
        "Nou hàbit — dissenya abans de codificar: escriu el pseudocodi (3–5 línies, paraules teves) ABANS d'obrir l'editor. Defensa d'1 minut: el teu sistema i una aplicació real (R1 i R2)."),
      p('El teu pseudocodi (3–5 línies)',
        'Exemple: «REPETEIX: llegeix distància; SI < 10 → ...»'),
      p('Tram «> 30 cm (lluny)»: LED / so (piezo)'),
      p('Tram «10–30 cm»: LED / so (piezo)'),
      p('Tram «< 10 cm (molt a prop)»: LED / so (piezo)'),

      autoaval([
        'Distingeixo i llegeixo entrades digitals i analògiques',
        'Faig servir el Monitor sèrie per calibrar',
        'Escric i faig servir funcions pròpies'
      ]),

      t('Quadern tècnic',
        "Aquestes respostes formen la teva entrada del quadern tècnic (compta el 25 %)."),
      p('Diferència entre entrada digital i analògica'),
      p('Per a què serveix una funció?'),
      p('Un error i com l’he resolt')
    ]
  },

  // =========================================================================
  sa4: {
    sa: 'sa4',
    titol: 'SA4 · Fitxa base — Moviment: servos, motors i ponts H',
    descripcioForm: "Full de respostes de la fitxa base de la SA4: fes que les coses es moguin. Recorda la massa comuna i no alimentar motors des de l'Arduino.",
    descripcioTasca: "Full de respostes de la fitxa base de la SA4 (activitats 1-4 + autoavaluació + quadern tècnic). El producte (barrera automàtica) es defensa a part (R1, R2 i R3).",
    topicName: 'SA4 · Moviment: servos, motors i ponts H',
    state: 'DRAFT',
    maxPoints: 10,
    materials: [fitxaWeb(4)],
    items: [
      t('Abans de començar',
        "En acabar aquesta SA podré: 1) controlar la posició d'un servo (0–180°) amb una llibreria (Servo.h); 2) moure un motor DC en els dos sentits amb pont H i alimentació segura (font externa + massa comuna); 3) fer que el moviment respongui a un sensor.\n\nVersió nucli: la barrera s'obre en detectar el vehicle i es tanca sola (angle i temps fixos)."),
      s('Parella (nom, si treballes en parella)'),

      t('Activitat 1 · Servomotor (S1)',
        "Munta el servo (senyal al pin 9) i treballa amb 01_servo_potenciometre.ino."),
      p('0 · PREDIU: què farà el servo en girar el potenciòmetre?'),
      s('Rang d’angles de write(): de ____ a ____ graus'),
      s('Funció que reescala 0-1023 → 0-180'),
      p('Repte: vaivé automàtic 0↔180. Com ho has fet?'),

      t('Activitat 2 · Motor DC i pont H (S2)',
        "Munta el motor amb el L298N (ENA=5, IN1=7, IN2=8) i ALIMENTACIÓ EXTERNA."),
      p('Completa la lògica del pont H: què fa el motor amb IN1=HIGH·IN2=LOW / IN1=LOW·IN2=HIGH / IN1=LOW·IN2=LOW?'),
      s('Com es regula la velocitat? Per quin pin?'),
      p('Repte: funcions endavant(vel), enrere(vel), atura(). Enganxa-les o explica-les'),

      t('Activitat 3 · Del sensor al moviment (S3)',
        "Connecta l'ultrasons i fes que la velocitat depengui de la distància."),
      p('Velocitat (0-255) per a cada tram: > 30 cm / 15-30 cm / < 15 cm'),
      s('Repte: llindar de seguretat on el motor s’atura (cm)'),

      t('Activitat 4 · Producte: barrera automàtica (S4)',
        "Dissenya abans de codificar: pseudocodi de la barrera al quadern (3–5 línies) ABANS d'obrir l'editor. El codi de les sessions és referència de consulta, no plantilla. Defensa d'1 minut (R1, R2 i R3)."),
      p('El teu pseudocodi de la barrera (3–5 línies)'),
      s('Paràmetres: angle tancat (°) / obert (°) / temps obert (s) / distància de detecció (cm)'),

      autoaval([
        'Controlo la posició d’un servo i la velocitat d’un motor',
        'Munto el circuit amb seguretat (massa comuna, alimentació externa)',
        'Faig que el moviment respongui a un sensor'
      ]),

      t('Quadern tècnic',
        "Aquestes respostes formen la teva entrada del quadern tècnic (compta el 25 %)."),
      p('Per què cal un pont H / driver?'),
      p('Què és la massa comuna i per què és important?'),
      p('Un error i com l’he resolt')
    ]
  },

  // =========================================================================
  sa5: {
    sa: 'sa5',
    titol: 'SA5 · Fitxa base — micro:bit i MicroPython',
    descripcioForm: "Full de respostes de la fitxa base de la SA5: els mateixos conceptes, un altre llenguatge. Atenció a la INDENTACIÓ (en Python és obligatòria!).",
    descripcioTasca: "Full de respostes de la fitxa base de la SA5 (activitats 1-4 + autoavaluació + quadern tècnic). El producte (app micro:bit) i la taula comparativa s'avaluen amb R1 i R4.",
    topicName: 'SA5 · micro:bit i MicroPython',
    state: 'DRAFT',
    maxPoints: 10,
    materials: [fitxaWeb(5)],
    items: [
      t('Abans de començar',
        "En acabar aquesta SA podré: 1) escriure programes MicroPython ben indentats que funcionen; 2) fer servir els sensors integrats (acceleròmetre, llum) i la ràdio de la micro:bit; 3) comparar la mateixa solució en C++ (Arduino) i en Python (micro:bit).\n\nVersió nucli: app que fa servir UN sensor integrat o la ràdio i funciona + taula comparativa completa. Sense placa? Simulador: python.microbit.org"),
      s('Parella (nom, si treballes en parella)'),

      t('Activitat 1 · Name badge (S1)',
        "Carrega 01_name_badge.py a la micro:bit."),
      p('0 · PREDIU: què farà la matriu de LED i els botons?'),
      s('Instrucció que desplaça text per la pantalla'),
      p('Diferència entre display.show() i display.scroll()'),
      p('Repte: badge d’emocions (A: contenta / B: trista). Com ho has fet?'),

      t('Activitat 2 · Sensors integrats (S2)',
        "Treballa amb 02_passes.py (comptapassos) i 03_nightlight.py (llum automàtic)."),
      s('Comptapassos: quin sensor s’usa i quin llindar has posat?'),
      s('Llum automàtic: rang de read_light_level(): de ____ a ____'),
      p('Repte: detector d’inclinació o termòmetre amb avís. Què has triat i com funciona?'),

      t('Activitat 3 · Ràdio (S3)',
        "Carrega 04_radio_dau.py en DUES plaques."),
      s('Què han de compartir les dues plaques perquè es «sentin»?'),
      s('Instrucció que envia / instrucció que rep'),
      p('Repte: «pedra-paper-tisora» o comandament per ràdio. Com ho has fet?'),

      t('Activitat 4 · Producte + comparació C++ ↔ Python',
        "Dissenya abans de codificar: pseudocodi del producte (3–5 línies). Fixa't que el pseudocodi és EL MATEIX en C++ i en Python: només canvia la sintaxi. Tria un dels reptes com a producte. S'avalua amb R1 (codi) i R4 (comparació)."),
      p('El teu pseudocodi del producte (3–5 línies)'),
      s('Quin repte has triat com a producte?'),
      s('Comparativa — Estructura: en Arduino és setup()/loop(); en Python?'),
      s('Comparativa — Final d’instrucció: en Arduino és « ; »; en Python?'),
      s('Comparativa — Blocs de codi: en Arduino són { }; en Python?'),
      s('Comparativa — Mostrar un valor: en Arduino és Serial.println(x); en Python?'),

      autoaval([
        'Escric Python ben indentat que funciona',
        'Faig servir sensors integrats (acceleròmetre, llum…)',
        'Comunico dues plaques per ràdio'
      ]),

      t('Quadern tècnic',
        "Aquestes respostes formen la teva entrada del quadern tècnic (compta el 25 %)."),
      p('Per què la indentació és important en Python?'),
      p('Avantatge d’usar sensors integrats'),
      p('Un error i com l’he resolt')
    ]
  },

  // =========================================================================
  sa6: {
    sa: 'sa6',
    titol: 'SA6 · Fitxa base — Sistemes de control',
    descripcioForm: "Full de respostes de la fitxa base de la SA6: que el sistema es reguli sol. Nucli: llaç obert/tancat, histèresi i màquines d'estats. El control proporcional és +ampliació (opcional).",
    descripcioTasca: "Full de respostes de la fitxa base de la SA6 (activitats 1-4 + autoavaluació + quadern tècnic). El producte (sistema de control documentat) es defensa a part (2-3'); la prova T2 és individual dins la S4 (nucli: histèresi).",
    topicName: 'SA6 · Sistemes de control',
    state: 'DRAFT',
    maxPoints: 10,
    materials: [fitxaWeb(6)],
    items: [
      t('Abans de començar',
        "En acabar aquesta SA podré: 1) distingir llaç obert i llaç tancat i explicar el meu sistema amb un diagrama de blocs; 2) fer un termòstat amb histèresi (dos llindars, sense «clic-clic»); 3) construir una màquina d'estats que no es bloqueja (millis()); 4) (+ampliació opcional) provar el control proporcional.\n\nVersió nucli: termòstat amb histèresi que funciona, documentat amb el diagrama de blocs."),
      s('Parella (nom, si treballes en parella)'),

      t('Activitat 1 · Llaç obert vs llaç tancat (S1)',
        "Carrega 01_llac_obert_vs_tancat.ino i prova els dos modes. Fixa't en el diagrama de blocs del llaç tancat (a la fitxa del web)."),
      p('0 · PREDIU: quin mode corregirà sol les pertorbacions?'),
      p('Diferència principal entre llaç obert i llaç tancat'),

      t('Activitat 2 · Termòstat amb histèresi (S2)',
        "Carrega 02_termostat_histeresi.ino."),
      s('Llindars: encén a ____ · apaga a ____'),
      p('Què passaria SENSE histèresi (un sol llindar)?'),

      t('Activitat 3 · Màquina d’estats (S3)',
        "Carrega 03_maquina_estats.ino. Dibuixa el diagrama d'estats al quadern (estats i transicions). Si t'encalles, parteix de l'esquelet 03_maquina_estats_BASTIDA."),
      s('Quins estats té la màquina?'),
      p('Descriu el teu diagrama d’estats (estats i transicions; el dibuix va al quadern)'),
      p('Repte: quin estat nou o transició condicional hi has afegit?'),

      t('Activitat 4 · Control proporcional (S4) · +AMPLIACIÓ (OPCIONAL)',
        "Per a qui vagi sobrat: el nucli de la SA són la histèresi i la màquina d'estats. Carrega 04_control_proporcional.ino."),
      pOpt('Què és l’error en el control proporcional?'),
      pOpt('Com afecta Kp a la resposta?'),
      sOpt('Repte: tot/res vs proporcional al Serial Plotter — quin és més estable?'),

      t('Producte · Sistema de control documentat (es defensa a part)',
        "Dissenya abans de codificar: aquí el pseudocodi és el diagrama d'estats que has dibuixat — cap «case» que no sigui al dibuix. Defensa de 2-3' (nivell T2): problema → solució → una decisió tècnica justificada + 2 preguntes. S'avalua amb R1, R3 i R4."),

      autoaval([
        'Distingeixo llaç obert i llaç tancat',
        'Implemento histèresi i una màquina d’estats',
        'Explico el diagrama de blocs del meu control'
      ]),

      t('Quadern tècnic',
        "Aquestes respostes formen la teva entrada del quadern tècnic (compta el 25 %)."),
      p('Què és la realimentació en un sistema de control?'),
      p('Per què serveix la histèresi?'),
      p('Un error i com l’he resolt')
    ]
  },

  // =========================================================================
  sa7: {
    sa: 'sa7',
    titol: 'SA7 · Fitxa base — Robòtica mòbil',
    descripcioForm: "Full de respostes de la fitxa base de la SA7: com es mou i gira un robot. Recorda ajustar els pins segons la teva placa (bloc // === PINS (AJUSTAR) ===).",
    descripcioTasca: "Full de respostes de la fitxa base de la SA7 (activitats 1-4 + autoavaluació + quadern tècnic). El producte (comportament autònom + registre d'iteracions) es demostra a la pista (R1, R3 i R4).",
    topicName: 'SA7 · Robòtica mòbil',
    state: 'DRAFT',
    maxPoints: 10,
    materials: [fitxaWeb(7)],
    items: [
      t('Abans de començar',
        "En acabar aquesta SA podré: 1) programar moviments i trajectòries d'un robot (girar = rodes a velocitats diferents); 2) aconseguir un comportament autònom: evitar obstacles o seguir una línia; 3) calibrar i millorar iterant, registrant cada intent.\n\nVersió nucli: el robot completa UN comportament autònom, encara que lent, amb el registre d'almenys 2 iteracions."),
      s('Equip (noms)'),

      t('Activitat 1 · Moviment i cinemàtica (S1)',
        "Ajusta el bloc de pins de 01_moviment_basic.ino i comprova."),
      p('0 · PREDIU: què farà gira_dreta()?'),
      s('Pins: motor esquerre (dir/vel) i motor dret (dir/vel)'),
      s('Per girar a la dreta, la roda esquerra ha d’anar __________ que la dreta'),
      p('Repte: seqüència de «ball». Què fa el teu robot?'),

      t('Activitat 2 · Trajectòries (S2)',
        "Recorre un quadrat amb 02_trajectoria_quadrat.ino."),
      s('Gir de 90° = ______ ms'),
      p('Quant s’allunya del punt inicial després d’una volta (cm)? Per què?'),
      p('Repte: triangle o forma «L». Com ho has fet?'),

      t('Activitat 3 · Evita-obstacles (S3)',
        "Carrega 03_evita_obstacles.ino."),
      s('A quina distància gira (cm)?'),
      p('Descriu la decisió del robot (percepció → acció; el dibuix va al quadern)'),
      p('Repte: quina millora d’estratègia has fet (retrocedir, gir aleatori…)?'),

      t('Activitat 4 · Seguidor de línia + repte de pista (S4)',
        "Calibra els sensors i registra els intents."),
      s('Calibratge: valor «línia» = ______ / valor «fons» = ______'),
      s('Temps de volta — intent 1 / intent 2 / intent 3 (s)'),
      p('Quines millores has fet entre intents?'),

      t('Un repte a full en blanc',
        "Tria UN dels reptes d'aquesta SA i escriu-lo amb l'editor buit: només el teu pseudocodi i el full-xuleta de crides (motors(), dist()…). Sense obrir cap sketch fet. És l'entrenament directe per a la SA9."),
      p('Quin repte has triat i quin és el teu pseudocodi?'),

      autoaval([
        'Programo moviment amb funcions (control diferencial)',
        'El robot completa un comportament autònom',
        'Registro proves i itero per millorar'
      ]),

      t('Quadern tècnic',
        "Aquestes respostes formen la teva entrada del quadern tècnic (compta el 25 %)."),
      p('Què és la cinemàtica diferencial?'),
      p('Per què el control per temps no és precís?'),
      p('Una millora que ha funcionat')
    ]
  },

  // =========================================================================
  sa8: {
    sa: 'sa8',
    titol: 'SA8 · Fitxa base — IoT i IA',
    descripcioForm: "Full de respostes de la fitxa base de la SA8: connecta el sistema i decideix amb dades. Pensa també en l'ètica de les dades.",
    descripcioTasca: "Full de respostes de la fitxa base de la SA8 (activitats 1-3 + repte a full en blanc + autoavaluació + quadern tècnic). El producte (sistema connectat o classificador + reflexió ètica) s'avalua amb R1, R3 i R4.",
    topicName: 'SA8 · IoT i IA',
    state: 'DRAFT',
    maxPoints: 10,
    materials: [fitxaWeb(8)],
    items: [
      t('Abans de començar',
        "En acabar aquesta SA podré: 1) enviar i rebre dades a distància (telemetria per ràdio); 2) explicar què és l'IoT i valorar-ne els riscos de privacitat; 3) distingir regles fetes a mà i aprenentatge automàtic, entrenar un classificador i detectar-ne el biaix.\n\nVersió nucli: telemetria d'UNA magnitud etiquetada que es rep i es mostra + reflexió ètica amb un risc i una mesura."),
      s('Equip (noms)'),

      t('Activitat 1 · Telemetria (S1)',
        "Carrega 01_telemetria_emissor.py i 02_telemetria_receptor.py en dues plaques (mateix group)."),
      p('0 · PREDIU: què mostrarà la placa receptora?'),
      s('Quines magnituds envies? Cada quant?'),
      p('Repte: envia dues magnituds etiquetades (T:.., L:..). Com ho has fet?'),

      t('Activitat 2 · Disseny IoT (S2)',
        "Dissenya un sistema IoT del teu entorn. El mínim ètic és OBLIGATORI."),
      s('Què mesura el teu sistema?'),
      s('Com transmet les dades?'),
      s('Recull alguna dada personal? Quina?'),
      s('Consentiment: qui l’autoritza?'),
      p('Un risc de privacitat + una mesura per reduir-lo'),

      t('Activitat 3 · Introducció a la IA (S3)',
        "Carrega 03_ia_gestos.py i fes la pràctica de Teachable Machine (entrenar amb exemples)."),
      s('Quins gestos classifica 03_ia_gestos.py?'),
      p('Diferència entre regles fetes a mà i aprenentatge automàtic'),
      s('Teachable Machine: quantes classes i quants exemples per classe?'),
      p('Biaix: amb qui podria fallar el teu classificador i per què?'),

      t('Un repte a full en blanc',
        "L'emissor O el receptor de telemetria del teu producte, escrit des de l'editor buit (pseudocodi propi + xuleta de radio). L'altra meitat pot partir del codi donat."),
      p('Quina meitat has escrit de zero i quin és el teu pseudocodi?'),

      autoaval([
        'Envio i registro dades entre dispositius (telemetria)',
        'Explico l’arquitectura IoT i els seus riscos',
        'Distingeixo regles fetes a mà i aprenentatge automàtic'
      ]),

      t('Quadern tècnic',
        "Aquestes respostes formen la teva entrada del quadern tècnic (compta el 25 %)."),
      p('Què és la telemetria?'),
      p('Per què les «bones dades» són clau per a la IA?'),
      p('Un error i com l’he resolt'),

      t('Ús d’assistents d’IA (honestedat) — només si n’has fet servir',
        "La IA t'ha d'ajudar a APRENDRE. Declarar-ho no baixa nota; amagar-ho o no saber-ho explicar, sí. Abans de preguntar, aplica DEPURA."),
      sOpt('Eina i per a què l’has fet servir'),
      pOpt('Què he canviat / entès jo (sé explicar cada línia?)')
    ]
  },

  // =========================================================================
  sa9: {
    sa: 'sa9',
    titol: 'SA9 · Fitxa base — Repte final integrador',
    descripcioForm: "Fitxa d'equip del projecte final: de la idea a la demo. Dissenyareu, construireu, programareu i defensareu un sistema robòtic autònom. UNA resposta per equip.",
    descripcioTasca: "Fitxa d'equip de la SA9 (repte, rols, disseny, planificació, iteracions i defensa). UNA resposta per equip. El sistema, el dossier tècnic i la defensa es lliuren a part (R1-R5); la prova T3 és individual.",
    topicName: 'SA9 · Projecte final integrador',
    state: 'DRAFT',
    maxPoints: 10,
    materials: [fitxaWeb(9)],
    items: [
      t('Abans de començar',
        "Mètode de projecte (el mateix de tot el curs): analitzar → dissenyar → prototipar → provar/millorar → comunicar. Aquest cop, sencer i en autonomia.\n\nVersió nucli: els requisits mínims del §1 complerts i demostrables en directe, amb el dossier a les seccions essencials. UNA resposta per equip."),
      s('Equip (nom) i membres'),

      t('1 · El nostre repte', "Trieu el repte al banc de reptes de la SA9."),
      s('Repte triat'),
      p('Problema real que resol'),
      p('Requisits mínims (sí o sí): 1, 2 i 3'),

      t('2 · Rols de l’equip', "Un rol per persona; podeu rotar-los entre sessions."),
      p('Qui fa cada rol: coordinació/planificació · maquinari/electrònica · programació · documentació/comunicació'),

      t('3 · Disseny', "L'esbós/esquema del sistema va al dossier tècnic; aquí descriviu-lo."),
      p('Descripció de l’esbós/esquema del sistema'),
      s('Sensors (entrada) / Actuadors (sortida)'),
      radio('Tipus de control', ['Llaç obert', 'Llaç tancat', 'Màquina d’estats'],
        'El que millor descriu el vostre sistema.'),

      t('4 · Planificació', "Useu la plantilla de planificació àgil (To Do / Fent / Fet)."),
      s('Fita S2 / Fita S3 / Fita S4'),

      t('5 · Proves i iteracions',
        "Apliqueu el mètode de projecte: després de provar, milloreu i torneu a provar."),
      p('Iteració v1: què fallava · què heu canviat · resultat'),
      p('Iteració v2: què fallava · què heu canviat · resultat'),

      t('6 · Defensa (S5)', "Defensa oral de 5' + preguntes individuals + demostració."),
      s('Qui explica cada part?'),
      radio('Demostració preparada?', ['Sí', 'Encara no'], undefined),
      p('Reflexió ètica/sostenibilitat: impacte del vostre sistema'),

      check('Entrega final (marqueu el que ja teniu)', [
        'Sistema funcional',
        'Dossier tècnic complet',
        'Codi comentat a la carpeta',
        'Defensa oral preparada',
        'Autoavaluació i coavaluació'
      ]),

      autoaval([
        'El sistema compleix els requisits mínims',
        'Hem treballat amb rols i planificació àgil',
        'Hem iterat (provar → millorar) i ho hem documentat'
      ])
    ]
  }
};
