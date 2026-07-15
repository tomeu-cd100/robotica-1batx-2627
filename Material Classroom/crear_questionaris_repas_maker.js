// Qüestionaris de repàs autocorrectius del curs MAKER 1r ESO (SA0-SA9).
// - Un Google Form en mode quiz per SA: 8 preguntes del NUCLI, 1 punt cadascuna,
//   respostes visibles en enviar (formatiu). Es poden repetir tants cops com es vulgui.
// - Tasca de Classroom en DRAFT al tema de la SA, sense qualificar:
//   es publica quan la SA es tanca, com a repàs voluntari.
// - Escriu el banc de preguntes llegible al repo del curs Maker
//   (Avaluació/Questionaris_repas.md).
import fs from 'fs';
import { google } from 'googleapis';
import { getAuthClient } from './_form_sa_lib.js';

const COURSE_ID = '870550164488'; // Maker - 1r ESO - Curs 26/27
const DRIVE_FOLDER_NAME = 'Maker 1r ESO — Qüestionaris de repàs';
const BANC_MD = 'C:/Users/briera2/Documents/Curs 2627 1 ESO Maker/Avaluació/Questionaris_repas.md';

// q = [enunciat, [opcions...], indexCorrecta]
const SAS = [
  {
    sa: 'SA0', tema: 'Seguretat i cultura maker',
    qs: [
      ['Si veus fum estrany, una olor rara o algú es fa mal, què fas PRIMER?', ['Segueixo treballant, ja ho veurà algú.', 'Aviso immediatament el/la docent.', 'Obro la finestra i no dic res.', 'Faig una foto per al diari.'], 1],
      ['Es pot tocar una màquina sense autorització?', ['Sí, si vas amb compte.', 'Mai: sense permís (i sense carnet) no s\'opera cap màquina.', 'Només la làser.', 'Sí, si és rapidet.'], 1],
      ['Si tens els cabells llargs, al taller…', ['No cal fer res.', 'Els portes recollits (i res penjant: mànigues, cordons…).', 'Et poses una gorra i llestos.', 'No pots entrar.'], 1],
      ['Al Museu dels Errors hi posem…', ['Les peces perfectes.', 'Peces fallides amb la seva targeta: què ha passat i què n\'hem après.', 'Les coses per llençar.', 'Els deures oblidats.'], 1],
      ['El passaport maker serveix per…', ['Sortir del centre.', 'Registrar els teus carnets, insígnies i progrés del curs.', 'Apuntar les faltes.', 'Res, és decoratiu.'], 1],
      ['Un prototip és…', ['La versió final i perfecta.', 'Una primera versió que serveix per provar i millorar.', 'Un dibuix a la pissarra.', 'Una peça comprada.'], 1],
      ['L\'avaluació 0 de la SA0…', ['Compta molt per a la nota.', 'No té nota: serveix per saber d\'on partim i formar equips equilibrats.', 'Separa la classe en grups de bons i dolents.', 'És un examen sorpresa.'], 1],
      ['Els carnets de màquina (🔴🟠🟢🔵) es guanyen…', ['Pagant.', 'Amb un checkpoint: 3 preguntes de protocol + 1 demostració pràctica.', 'Automàticament amb el temps.', 'Només els que treuen bones notes.'], 1],
    ]
  },
  {
    sa: 'SA1', tema: 'El clauer: Inkscape i làser',
    qs: [
      ['Al nostre codi de colors, què vol dir cada color?', ['Vermell = gravat, negre = tall.', 'Vermell pur = tall, negre = gravat.', 'Tant és, la làser ho endevina.', 'Blau = tall, verd = gravat.'], 1],
      ['Has escrit el teu nom però la làser no el detecta. Què falta?', ['Fer la lletra més gran.', 'Seleccionar el text i fer Camí → Objecte a camí.', 'Canviar de font.', 'Imprimir-ho primer.'], 1],
      ['La peça et surt gegant (o diminuta). El més probable és que…', ['La làser està espatllada.', 'El document està en píxels: cal posar-lo en mm i comprovar les mides.', 'El fitxer és massa nou.', 'Falta tinta.'], 1],
      ['El forat per a l\'anella del clauer ha de fer com a mínim…', ['1 mm', '4 mm de diàmetre', '20 mm', 'No cal forat.'], 1],
      ['Mentre la làser treballa…', ['Puc anar a esmorzar.', 'MAI es deixa sola: sempre hi ha algú vigilant.', 'Puc obrir la tapa per mirar de prop.', 'Puc posar-hi més material.'], 1],
      ['Quin d\'aquests materials està PROHIBIT a la làser?', ['Fusta DM de 3 mm.', 'Cartró.', 'PVC o vinil (allibera gasos tòxics).', 'Contraxapat.'], 2],
      ['Com s\'ha de dir el teu fitxer del clauer al Drive?', ['clauer.svg', 'ElMeuNom_SA1_v1.svg, a la carpeta de la SA.', 'final_definitiu_ara_si.svg', 'Qualsevol nom serveix.'], 1],
      ['El carnet 🔴 d\'operador/a làser…', ['Es dona a tothom el primer dia.', 'Es guanya amb un checkpoint (preguntes + demostració) i sense ell no s\'opera la làser.', 'Només el pot tenir el docent.', 'Serveix per a totes les màquines.'], 1],
    ]
  },
  {
    sa: 'SA2', tema: 'Disseny vectorial: el marcapàgines',
    qs: [
      ['Vectoritzar una imatge vol dir…', ['Fer-la més gran.', 'Convertir una imatge de píxels en camins (línies) que la làser entén.', 'Posar-hi color.', 'Comprimir-la perquè ocupi menys.'], 1],
      ['Quina diferència hi ha entre una imatge de píxels i una de vectorial?', ['Cap.', 'La vectorial es pot escalar sense perdre qualitat; la de píxels es pixela.', 'La de píxels és sempre millor.', 'La vectorial només pot ser en blanc i negre.'], 1],
      ['Les operacions booleanes (unió, diferència) serveixen per…', ['Pintar més de pressa.', 'Crear formes noves combinant-ne o restant-ne dues.', 'Comptar nodes.', 'Canviar el color del traç.'], 1],
      ['Un node és…', ['Un error del programa.', 'Un punt que defineix la forma d\'un camí.', 'Un tipus de làser.', 'Una capa.'], 1],
      ['Quina imatge és més fàcil de vectoritzar bé?', ['Una foto amb molts detalls i ombres.', 'Una imatge simple i d\'alt contrast (silueta, icona, escut).', 'Una imatge borrosa.', 'Un vídeo.'], 1],
      ['El nesting (aprofitar la planxa) consisteix a…', ['Tallar al mig de la planxa, que és més bonic.', 'Col·locar les peces juntes i ben distribuïdes per malbaratar poc material.', 'Fer les peces més petites del compte.', 'Usar una planxa nova per peça.'], 1],
      ['Abans d\'enviar el marcapàgines a la làser, el text ha d\'estar…', ['En negreta.', 'Convertit a camí.', 'En majúscules.', 'Subratllat.'], 1],
      ['Per què separem tall i gravat en capes/colors diferents?', ['Per estètica.', 'Perquè la màquina faci cada operació amb la potència que toca.', 'Perquè el fitxer pesi menys.', 'No cal separar-los.'], 1],
    ]
  },
  {
    sa: 'SA3', tema: 'Encaixos i procés tecnològic',
    qs: [
      ['El kerf és…', ['Un tipus de fusta.', 'L\'amplada de material que la làser es "menja" en tallar.', 'Una eina d\'Inkscape.', 'El soroll de la màquina.'], 1],
      ['Si no tens en compte el kerf, l\'encaix…', ['Queda perfecte igualment.', 'Queda fluix: el tall surt més ample del dibuixat.', 'Queda massa fort.', 'No es pot tallar.'], 1],
      ['Per què la ranura es dissenya una mica més estreta que el gruix del material?', ['Per error.', 'Perquè la làser es menja material (kerf) i així l\'encaix queda ferm.', 'Per gastar menys fusta.', 'Perquè és més ràpid de tallar.'], 1],
      ['L\'ordre del procés tecnològic és…', ['Fabricar → pensar → dibuixar.', 'Necessitat → idea → disseny → fabricació → millora.', 'Comprar → muntar → llençar.', 'Dissenyar → entregar, i ja està.'], 1],
      ['Un requisit és…', ['Una decoració opcional.', 'Una condició que el producte ha de complir sí o sí.', 'El nom del projecte.', 'Un material.'], 1],
      ['Iterar vol dir…', ['Repetir-ho tot des de zero.', 'Provar el prototip, detectar què falla i fer-ne una versió millorada.', 'Copiar el disseny d\'un altre equip.', 'Esborrar el fitxer.'], 1],
      ['Una unió per encaix…', ['Necessita cola sempre.', 'Uneix peces amb pestanyes i ranures ajustades al gruix del material, sense cola.', 'Només funciona amb metall.', 'És un tipus de gravat.'], 1],
      ['Els rols d\'equip (i la seva rotació) serveixen per…', ['Que mani sempre el mateix.', 'Que tothom tingui una responsabilitat clara i tothom passi per tot.', 'Acabar abans.', 'Res, són simbòlics.'], 1],
    ]
  },
  {
    sa: 'SA4', tema: 'Del 2D al 3D amb Tinkercad',
    qs: [
      ['Els eixos X, Y i Z representen…', ['Colors.', 'Amplada, fondària i alçada: les 3 dimensions del volum.', 'Velocitats.', 'Tres capes de pintura.'], 1],
      ['A Tinkercad, un "forat" és…', ['Un error del model.', 'Un cos transparent que, en agrupar-lo amb una peça, la buida.', 'Un fitxer corrupte.', 'Una eina de pintar.'], 1],
      ['Per fer que el forat foradi de veritat cal…', ['Esperar una estona.', 'Seleccionar peça + forat i Agrupar (Ctrl+G).', 'Fer doble clic.', 'Exportar el fitxer.'], 1],
      ['La teva peça "flota" sobre el pla de treball. Com la fas baixar?', ['Arrossegant-la a ull.', 'Seleccionant-la i prement la tecla D (drop).', 'Reiniciant Tinkercad.', 'No passa res si flota.'], 1],
      ['Per imprimir en 3D, el model s\'exporta en format…', ['.SVG', '.STL', '.JPG', '.PDF'], 1],
      ['El model d\'aquesta SA ha de tenir…', ['Un sol cub gegant.', '≥3 cossos i ≥1 forat, màxim ~50 mm.', 'Com a mínim 20 peces.', 'Colors ben triats.'], 1],
      ['Per què el model s\'ha d\'imprimir pla i sense suports?', ['Perquè quedi més bonic.', 'Perquè entri al batch de placa amb els dels companys: menys temps i material.', 'Perquè Tinkercad no en sap més.', 'És una superstició.'], 1],
      ['Escalar "amb sentit" vol dir…', ['Fer-ho tot el més gran possible.', 'Comprovar les mides reals (amb regle) i mantenir les proporcions.', 'Duplicar la peça.', 'Girar-la 90 graus.'], 1],
    ]
  },
  {
    sa: 'SA5', tema: 'Impressió 3D funcional',
    qs: [
      ['Laminar (amb Bambu Studio) vol dir…', ['Pintar el model.', 'Convertir l\'STL en capes i instruccions que la impressora entén.', 'Aplanar la peça.', 'Fer-ne una còpia.'], 1],
      ['El farciment (infill)…', ['És la caixa de la impressora.', 'És la densitat interior: més farciment = més resistent, però més temps i material.', 'Només serveix per al color.', 'S\'ha de posar sempre al 100 %.'], 1],
      ['El gruix mínim de paret perquè la peça no surti fràgil és…', ['0,1 mm', '3 mm (el llindar de sempre del curs)', '10 mm', 'Tant és.'], 1],
      ['El warping és…', ['Un filament especial.', 'Les vores de la peça s\'aixequen perquè la primera capa es refreda massa de pressa.', 'Un mode ràpid d\'impressió.', 'Una peça de recanvi.'], 1],
      ['El brim serveix per…', ['Decorar la peça.', 'Millorar l\'adherència: una vorera al voltant de la primera capa.', 'Estalviar filament.', 'Refredar el broquet.'], 1],
      ['El límit del curs per a cada peça és…', ['Menys d\'1 h i menys de 40 g (ho diu Bambu Studio).', '10 hores i mig quilo.', 'No hi ha límits.', '5 minuts exactes.'], 0],
      ['En arrencar la impressió, què cal vigilar especialment?', ['El color del filament.', 'Que la primera capa s\'enganxi bé a la placa.', 'El volum de l\'altaveu.', 'Res: ja s\'apanya sola.'], 1],
      ['La tolerància és…', ['Un error de disseny.', 'El petit marge de mida que cal perquè dues peces encaixin de veritat.', 'La paciència del docent.', 'Un paràmetre del color.'], 1],
    ]
  },
  {
    sa: 'SA6', tema: 'Disseny centrat en l\'usuari',
    qs: [
      ['Empatitzar, en disseny, vol dir…', ['Fer el que a tu t\'agrada.', 'Observar i escoltar l\'usuari per entendre la seva necessitat real.', 'Copiar solucions d\'internet.', 'Acabar el primer.'], 1],
      ['Els requisits del vostre disseny surten de…', ['El que l\'equip troba més fàcil.', 'El que l\'usuari necessita (entrevista i observació).', 'La primera idea que surt.', 'El color favorit de l\'equip.'], 1],
      ['Per què repartim les peces en un calendari d\'impressió?', ['Per fer bonic.', 'Perquè la impressora és el coll d\'ampolla: cal planificar la cua.', 'Perquè ho diu el conserge.', 'Per imprimir-ho tot l\'últim dia.'], 1],
      ['Cada peça de l\'equip ha de complir…', ['Menys d\'1 h i menys de 40 g.', 'Més de 2 hores.', 'Un color diferent.', 'Cap límit.'], 0],
      ['Abans d\'imprimir, cada peça passa…', ['Directa a la impressora.', 'El 🚦 semàfor de fabricació, validat per l\'operador/a de l\'equip.', 'Una votació a mà alçada.', 'Un dia de repòs.'], 1],
      ['Provar la solució amb l\'usuari serveix per…', ['Quedar bé.', 'Descobrir què no funciona i iterar (versió 2).', 'Acabar la SA abans.', 'Res, si ja ens agrada a nosaltres.'], 1],
      ['Un assemblatge és…', ['Una peça molt gran.', 'Un conjunt de peces coordinades que encaixen entre elles.', 'Un tipus de filament.', 'Una reunió d\'equip.'], 1],
      ['Comunicar l\'impacte de la solució vol dir explicar…', ['Quant hem trigat.', 'Què millora en la vida de l\'usuari real.', 'Qui és el més llest de l\'equip.', 'El preu del filament.'], 1],
    ]
  },
  {
    sa: 'SA7', tema: 'Captura 360 i tour virtual',
    qs: [
      ['Una imatge 360…', ['És una foto panoràmica normal.', 'Captura tot l\'entorn al voltant de la càmera i es pot explorar girant.', 'Només es pot veure amb ulleres.', 'És un vídeo accelerat.'], 1],
      ['Un punt de captura és…', ['On es carrega la càmera.', 'El lloc triat on es fa cada foto 360 del tour.', 'Un botó de l\'app.', 'El centre exacte de l\'aula.'], 1],
      ['On és qui fa la captura quan la càmera dispara?', ['Al costat de la càmera, somrient.', 'Amagat/da o fora de l\'escena (la càmera ho veu TOT).', 'Aguantant la càmera amb la mà.', 'Tant és.'], 1],
      ['Per una captura estable i clara cal…', ['Fer la foto caminant.', 'Trípode (o superfície estable) i bona llum, evitant contrallums.', 'Zoom digital al màxim.', 'Fer moltes fotos mogudes i triar.'], 1],
      ['Qui pot sortir a les imatges del tour?', ['Tothom qui passi per allà.', 'Només qui ha donat permís (drets d\'imatge i autoritzacions).', 'Només els docents.', 'Ningú mai.'], 1],
      ['Un tour navegable és…', ['Una carpeta amb fotos.', 'Escenes 360 connectades entre elles, amb títols i etiquetes.', 'Un vídeo de YouTube.', 'Un plànol en paper.'], 1],
      ['El carnet 🟢 d\'operador/a de càmera 360 inclou saber…', ['Editar vídeo professionalment.', 'Drets d\'imatge, espais a evitar i on s\'amaga qui captura.', 'Programar en Python.', 'Muntar un trípode en 5 segons.'], 1],
      ['El tour s\'acaba de debò quan…', ['Es desa a la carpeta.', 'Es publica i arriba a una audiència real (web del centre, QR…).', 'El docent hi posa nota.', 'S\'esborren les fotos dolentes.'], 1],
    ]
  },
  {
    sa: 'SA8', tema: 'Realitat virtual responsable',
    qs: [
      ['La immersió és…', ['Un tipus de pantalla.', 'La sensació de ser DINS de l\'escena virtual.', 'Un joc concret.', 'El pes de les ulleres.'], 1],
      ['Si notes mareig amb les ulleres VR…', ['Aguantes fins que passi.', 'T\'atures, et treus les ulleres, seus i avises.', 'Tanques els ulls i continues.', 'Corres una mica.'], 1],
      ['Les sessions de VR han de ser…', ['Tan llargues com vulguis.', 'Curtes i amb pauses (protocol d\'ús de la VR).', 'De 3 hores mínim.', 'Només al pati.'], 1],
      ['La higiene de les ulleres VR es fa…', ['Amb aigua i sabó directament.', 'Lents amb microfibra i interfície facial neta entre usuaris.', 'Bufant fort.', 'No cal netejar-les.'], 1],
      ['Mentre un company porta les ulleres, tu com a guia…', ['Li fas pessigolles.', 'Vigiles el seu espai perquè no topi amb res ni ningú.', 'Li amagues la funda.', 'Marxes a una altra estació.'], 1],
      ['El carnet 🔵 d\'usuari/ària responsable de VR inclou…', ['Guanyar una partida.', 'Temps màxim, què fer si hi ha mareig i higiene — i fer de guia d\'un company.', 'Portar les ulleres a casa.', 'Instal·lar jocs.'], 1],
      ['Una escena explorable a CoSpaces té…', ['Només un fons de color.', 'Objectes col·locats amb sentit i alguna interacció per descobrir.', 'Un text molt llarg.', 'Música alta.'], 1],
      ['Un ús positiu real de la VR (i un risc) són…', ['Benefici: formació/patrimoni/medicina · Risc: salut visual i abús de pantalla.', 'Benefici: substitueix dormir · Risc: cap.', 'Benefici: cap · Risc: tot.', 'Benefici: fa la nota més alta · Risc: el wifi.'], 0],
    ]
  },
  {
    sa: 'SA9', tema: 'El projecte final i la Fira',
    qs: [
      ['El projecte final és integrador perquè…', ['És el més llarg.', 'Combina un objecte fabricat (làser/3D) amb una experiència immersiva (360/VR).', 'El fa tota la classe junta.', 'No té rúbrica.'], 1],
      ['Una fita del pla de projecte és…', ['Una idea bonica.', 'Un punt de control amb data: què ha d\'estar acabat i quan.', 'El nom de l\'equip.', 'La nota final.'], 1],
      ['Per què planifiquem ABANS de fabricar?', ['Per omplir paper.', 'Perquè el temps de màquina és limitat i l\'equip ha de repartir tasques i sessions.', 'Perquè ho diu el calendari.', 'No cal planificar.'], 1],
      ['El portafoli final és…', ['Una carpeta amb tot barrejat.', 'El recull de les teves evidències i reflexions de tot el curs.', 'Un examen escrit.', 'Una foto de la peça final.'], 1],
      ['Un bon estand de Fira…', ['Té molts colors i prou.', 'Mostra el producte i l\'explica de manera clara i atractiva a un públic real.', 'És el més gran.', 'Amaga els errors comesos.'], 1],
      ['Quantes persones poden ser alhora dins l\'aula Maker durant la Fira?', ['Les que hi càpiguen.', '10 (aforament de seguretat).', '50', '2'], 1],
      ['Si la demo falla en directe davant del públic…', ['S\'acaba la presentació.', 'Expliques què esperaves, què passa i la teva hipòtesi: diagnosticar en veu alta també és saber-ne.', 'És culpa del company.', 'Es tanca l\'estand.'], 1],
      ['La transferència vol dir…', ['Passar els fitxers al Drive.', 'Usar el que has après aquest curs en situacions noves.', 'Canviar d\'equip.', 'Enviar la nota a casa.'], 1],
    ]
  },
];

// Repàs ACUMULATIU de trimestre (mini-lliga de la setmana de Fira): preguntes NOVES
// (reformulades, amb escenari) que barregen les SA del trimestre + 2-3 "perles" de
// trimestres anteriors — l'interleaving és el que consolida de veritat.
// topicSA = tema de Classroom on penjar la tasca (la SA que tanca el trimestre).
const TRIMESTRALS = [
  {
    sa: 'T1', topicSA: 'SA3', tema: 'Repàs acumulatiu del trimestre — làser, disseny 2D i seguretat (SA0-SA3)',
    qs: [
      ['La Núria vol que el seu nom es GRAVI i que el contorn del clauer es TALLI. Com ho marca a Inkscape?', ['Tot en vermell, més ràpid.', 'Nom en negre (ompliment) i contorn en vermell pur de línia fina.', 'Nom en vermell i contorn en negre.', 'Tant és, la làser ho endevina.'], 1],
      ['Un marcapàgines surt de la làser i les lletres del nom han CAIGUT (hi ha forats amb forma de lletra). Què ha passat?', ['La làser s\'ha espatllat.', 'El nom estava marcat com a TALL (vermell) en lloc de gravat: el que és vermell i queda solt, cau. El gravat negre no cau mai.', 'La fusta era massa fina.', 'Les lletres eren massa petites.'], 1],
      ['En Pau dissenya una ranura de 3 mm exactes per a fusta de 3 mm, i l\'encaix queda fluix. Per què?', ['Ha mesurat malament la fusta.', 'La làser es "menja" material en tallar (kerf): la ranura es dissenya una mica més estreta.', 'La fusta s\'ha encongit.', 'Els encaixos sempre queden fluixos.'], 1],
      ['Obres el teu fitxer i la peça és diminuta a la previsualització de la làser. El sospitós número 1 és…', ['El fitxer és massa vell.', 'El document estava en píxels en lloc de mil·límetres.', 'La làser llegeix malament.', 'El Drive l\'ha encongit.'], 1],
      ['Abans d\'enviar un text a la làser cal fer «Camí → Objecte a camí» perquè…', ['Quedi més bonic.', 'El text es converteixi en línies que qualsevol màquina entén, tingui o no la teva font.', 'Ocupi menys espai.', 'Es pugui editar millor després.'], 1],
      ['Veus una mica de flama dins la làser. Què fas PRIMER?', ['Obro la tapa i bufo.', 'Prémer aturada i avisar el/la docent immediatament.', 'Tiro aigua.', 'Espero que s\'apagui sola.'], 1],
      ['Ordena bé el procés tecnològic:', ['Fabricar → pensar → dibuixar.', 'Necessitat → idea → disseny → fabricació → millora.', 'Dissenyar → entregar.', 'Comprar → muntar → llençar.'], 1],
      ['El teu prototip v1 falla davant de tothom. Què en fa un maker?', ['L\'amaga perquè no compti.', 'Targeta per al Museu dels Errors (què ha passat i què n\'aprenc) i versió 2.', 'Canvia de projecte.', 'Culpa la màquina.'], 1],
      ['Per vectoritzar bé, tria…', ['Una foto amb ombres i molts detalls.', 'Una imatge simple i d\'alt contrast (silueta, icona, escut).', 'Una imatge borrosa gran.', 'Qualsevol, és igual.'], 1],
      ['Per què posem tots els dissenys del grup junts i ben col·locats en UNA planxa (nesting)?', ['Perquè queda ordenat a la foto.', 'S\'estalvia material i temps de làser: menys passades i menys retalls.', 'Perquè la làser només accepta una planxa al dia.', 'Per obligació del fabricant.'], 1],
    ]
  },
  {
    sa: 'T2', topicSA: 'SA6', tema: 'Repàs acumulatiu del trimestre — 3D, impressió i usuari (SA4-SA6 + una mica de T1)',
    qs: [
      ['Poses un cilindre "forat" sobre el teu cos a Tinkercad, exportes… i el forat no hi és. Què faltava?', ['Esperar que es guardi.', 'Seleccionar peça + forat i AGRUPAR: el forat només buida en agrupar.', 'Pintar el forat de negre.', 'Fer el cilindre més alt.'], 1],
      ['La peça queda flotant sobre el pla de treball. La manera ràpida de baixar-la és…', ['Arrossegar-la a ull.', 'Seleccionar-la i prémer la tecla D (drop).', 'Reiniciar Tinkercad.', 'Girar-la 180°.'], 1],
      ['Per passar el model a la impressora, l\'exportes en…', ['.SVG', '.STL', '.JPG', '.DOCX'], 1],
      ['Bambu Studio et marca 1 h 20 min i 55 g. Què toca?', ['Imprimir igualment, què vols fer-hi.', 'Iterar: reduir mida/farciment fins a complir el límit del curs (< 1 h i < 40 g).', 'Demanar més hores de màquina.', 'Treure el brim.'], 1],
      ['Una paret d\'1 mm a la teva capsa impresa probablement…', ['Serà més lleugera i millor.', 'Sortirà fràgil o trencada: el llindar del curs és ≥3 mm.', 'Estalviarà temps sense cap risc.', 'Farà la peça més forta.'], 1],
      ['Vols que un llapis de Ø8 mm entri en un forat de la teva peça. El forat es dissenya de…', ['8 mm exactes.', '~8,5 mm: tolerància perquè encaixi de veritat.', '7,5 mm ben ajustat.', '12 mm, com més gran millor.'], 1],
      ['Les vores de la peça s\'aixequen de la placa (warping). El moment crític que calia vigilar era…', ['L\'última capa.', 'La primera capa (adherència: placa neta, brim si cal).', 'El canvi de color.', 'El moment d\'exportar.'], 1],
      ['A SA6, els requisits del disseny surten de…', ['El que l\'equip troba més fàcil de modelar.', 'Parlar amb l\'usuari i observar-lo: la necessitat real, no la imaginada.', 'La primera idea votada.', 'Internet.'], 1],
      ['🧠 Perla del T1 — Al codi de colors de la làser, vermell pur i negre volen dir…', ['Vermell = gravat · negre = tall.', 'Vermell = tall · negre = gravat.', 'Tots dos tallen.', 'Tots dos graven.'], 1],
      ['🧠 Perla del T1 — El kerf (làser) i la tolerància (3D) s\'assemblen perquè tots dos…', ['Són tipus de material.', 'Són marges de mida que cal preveure perquè les peces encaixin de veritat.', 'Fan la peça més bonica.', 'Només afecten el color.'], 1],
    ]
  },
  {
    sa: 'T3', topicSA: 'SA9', tema: 'Repàs acumulatiu del curs — immersiu i projecte (SA7-SA9 + perles de tot el curs)',
    qs: [
      ['Quan la càmera 360 dispara, qui fa la captura és…', ['Al costat, saludant.', 'Amagat/da o fora de l\'escena: la càmera ho veu TOT al voltant.', 'Aguantant la càmera amb el braç.', 'On vulgui.'], 1],
      ['Al tour hi surt una persona que passava per allà. Es pot publicar?', ['Sí, si surt de lluny.', 'No sense el seu permís: drets d\'imatge — es repeteix la captura o es descarta.', 'Sí, si el tour queda bé.', 'Sí, esborrant-li la cara amb retolador.'], 1],
      ['Amb les ulleres VR notes mareig. Protocol:', ['Aguantar, que passa.', 'Aturar-se, treure-se-les, seure i avisar.', 'Tancar els ulls i seguir.', 'Sacsejar el cap.'], 1],
      ['Mentre un company explora amb les ulleres, el teu paper de guia és…', ['Mirar el mòbil.', 'Vigilar el seu espai perquè no topi amb res ni ningú.', 'Cridar-li instruccions.', 'Prendre-li les ulleres si trigues.'], 1],
      ['Una FITA del pla de projecte de SA9 és…', ['Una idea que agrada.', 'Un punt de control amb data: què ha d\'estar acabat i quan.', 'El logotip de l\'equip.', 'La nota que voleu.'], 1],
      ['El portafoli final del curs conté…', ['Totes les fotos del mòbil.', '1 evidència de cada trimestre amb reflexió + fitxa i diari de SA9 + «El meu viatge maker».', 'Només la peça més bonica.', 'Un examen final.'], 1],
      ['El dia de la Fira, dins l\'aula Maker hi pot haver com a màxim…', ['Tothom qui vulgui entrar.', '10 persones (aforament de seguretat).', '25 persones.', '2 persones.'], 1],
      ['La demo falla en directe davant del públic. Un maker…', ['Tanca l\'estand.', 'Explica què esperava, què passa i la seva hipòtesi: diagnosticar en veu alta també és saber-ne.', 'Diu que és culpa del wifi.', 'Fa veure que funcionava.'], 1],
      ['🧠 Perla del T2 — Cada peça 3D del vostre estand ha de complir…', ['Cap límit, és el projecte final.', 'Menys d\'1 h i menys de 40 g (ho diu Bambu Studio).', 'Només el límit de color.', 'Mida mínima de 100 mm.'], 1],
      ['🧠 Perla del T1 — Es pot operar una màquina sense el carnet corresponent?', ['Sí, si vas amb compte.', 'Mai: sense carnet (i sense permís) no s\'opera cap màquina — també a la Fira.', 'Sí, si el docent és a prop.', 'Només la làser.'], 1],
    ]
  },
];

// Retroacció per pregunta (mateix ordre que les qs de cada SA — si mous o afegeixes una
// pregunta, mou la seva línia aquí). Una frase que explica el PERQUÈ: es mostra tant si
// s'encerta (reforç) com si es falla (micro-lliçó al moment de l'error).
const FEEDBACK = {
  SA0: [
    'Primer les persones: avisar de seguida permet actuar abans que el problema creixi.',
    'Les màquines només s\'operen amb carnet i permís: és la regla que fa possible tot el taller.',
    'Res que pengi a prop d\'una màquina: cabells recollits, mànigues i cordons controlats.',
    'L\'error documentat ensenya; el que s\'amaga es repeteix.',
    'El passaport registra carnets, insígnies i progrés: la teva trajectòria maker.',
    'Un prototip existeix per provar-lo i millorar-lo: fallar-hi és part del pla.',
    'L\'avaluació 0 serveix per saber d\'on partim i formar equips equilibrats — sense nota.',
    'Cada carnet es guanya amb un checkpoint: 3 preguntes de protocol + 1 demostració.',
  ],
  SA1: [
    'Vermell pur = tall · negre = gravat: la làser només entén aquest codi.',
    'Les fonts són text; la làser vol camins: Camí → Objecte a camí.',
    'Si el document és en píxels, les mides no són reals: sempre en mm.',
    'Mínim Ø 4 mm perquè hi passi l\'anella del clauer.',
    'La làser mai es queda sola: sempre hi ha algú vigilant fins que acaba.',
    'El PVC allibera gasos tòxics en cremar-se: prohibit sempre, sense excepcions.',
    'Sense nom i carpeta correctes, la peça no entra al batch i es perd.',
    'El carnet 🔴 es guanya al checkpoint i és el que et permet operar la làser.',
  ],
  SA2: [
    'Vectoritzar = convertir píxels en camins (línies) que la làser pot seguir.',
    'El vector s\'escala sense perdre qualitat; els píxels es pixelen.',
    'Unió i diferència combinen o resten formes: així neixen formes noves.',
    'Un node és un punt que defineix el camí: movent nodes, canvies la forma.',
    'Silueta simple i d\'alt contrast = vectorització neta al primer intent.',
    'Peces juntes i ben distribuïdes = menys material malbaratat i menys temps de làser.',
    'Com al clauer de SA1: el text sempre convertit a camí abans d\'anar a la làser.',
    'Tall i gravat necessiten potències diferents: per això van en capes separades.',
  ],
  SA3: [
    'El kerf és el material que el feix es "menja": ~0,1-0,2 mm per costat del tall.',
    'El tall surt més ample del dibuixat: sense preveure el kerf, l\'encaix balla.',
    'Ranura una mica més estreta + kerf que eixampla = encaix ferm.',
    'Necessitat → idea → disseny → fabricació → millora: sempre en aquest ordre.',
    'Un requisit és obligatori: si no es compleix, el producte no serveix.',
    'Iterar = provar, detectar què falla i fer la versió millorada: el cor del disseny.',
    'Pestanyes i ranures a mida del gruix del material: unió ferma sense cola.',
    'Rols amb rotació: responsabilitat clara avui, i tothom passa per tot durant el curs.',
  ],
  SA4: [
    'X amplada, Y fondària, Z alçada: el volum té tres dimensions.',
    'Un "forat" és un cos transparent que buida la peça quan s\'hi agrupa.',
    'Sense Agrupar, el forat només és un cos transparent posat a sobre.',
    'La tecla D baixa la peça al pla: res pot quedar flotant o la impressió falla.',
    '.STL és el format que el laminador entén.',
    '≥3 cossos + ≥1 forat i màxim ~50 mm: els límits que fan possible el batch.',
    'Pla i sense suports = entra a la placa compartida: menys temps i menys material.',
    'Escalar amb sentit = mides reals comprovades amb regle i proporcions mantingudes.',
  ],
  SA5: [
    'Laminar converteix l\'STL en capes i instruccions que la impressora entén.',
    'Més farciment = més resistència però més temps i material: es tria segons l\'ús.',
    'Per sota de 3 mm la paret surt fràgil: és el llindar de sempre del curs.',
    'La primera capa es refreda massa de pressa i les vores s\'aixequen: adherència!',
    'El brim és una vorera que augmenta la superfície enganxada de la primera capa.',
    '< 1 h i < 40 g per peça: el límit que fa que tothom pugui imprimir.',
    'Si la primera capa s\'enganxa bé, la resta va sola; si no, espagueti.',
    'La impressió mai és exacta: sense marge, dues peces "perfectes" no encaixen.',
  ],
  SA6: [
    'Empatitzar = observar i escoltar l\'usuari: la necessitat real, no la imaginada.',
    'Els requisits surten de l\'entrevista i l\'observació, no del que és fàcil de fer.',
    'La impressora és el coll d\'ampolla: la cua es planifica o algú es queda sense peça.',
    'El límit < 1 h / < 40 g també val en equip: cada peça compta.',
    'Cap peça va a la màquina sense el 🚦 semàfor validat per l\'operador/a de l\'equip.',
    'El feedback de l\'usuari descobreix el que l\'equip no veu: d\'aquí surt la versió 2.',
    'Assemblatge = peces coordinades que encaixen: cal la mida comuna acordada abans.',
    'Comunicar l\'impacte = explicar què millora en la vida de l\'usuari real.',
  ],
  SA7: [
    'La càmera 360 captura tot l\'entorn: la imatge s\'explora girant.',
    'El punt de captura és el lloc triat per a cada foto 360 del tour.',
    'No hi ha "fora de pla": si no t\'amagues, surts a la foto.',
    'Trípode (o superfície estable) + bona llum sense contrallums = captura utilitzable.',
    'Només surt qui ha donat permís: drets d\'imatge, sempre.',
    'Un tour navegable = escenes 360 connectades amb títols i etiquetes.',
    'El carnet 🟢 inclou drets d\'imatge, espais a evitar i on s\'amaga qui captura.',
    'Un tour s\'acaba de debò quan arriba a una audiència real (web, QR…).',
  ],
  SA8: [
    'Immersió = la sensació de ser DINS de l\'escena virtual.',
    'Amb mareig: aturar-se, treure\'s les ulleres, seure i avisar. Sempre.',
    'Sessions curtes i amb pauses: ho marca el protocol d\'ús de la VR.',
    'Lents amb microfibra i interfície facial neta entre usuaris.',
    'El guia vigila l\'espai del company: la seguretat en VR és cosa de dos.',
    'El carnet 🔵: temps màxim, protocol de mareig, higiene — i fer de guia.',
    'Explorable = objectes col·locats amb sentit + alguna interacció per descobrir.',
    'La VR té beneficis reals (formació, patrimoni, medicina) i riscos reals (vista, abús de pantalla).',
  ],
  SA9: [
    'Integrador = fabricació (làser/3D) + immersiu (360/VR): tot el curs en un projecte.',
    'Una fita té data: què ha d\'estar acabat i quan. Sense data, no és fita.',
    'El temps de màquina és limitat: planificar és repartir-lo entre tots.',
    'El portafoli recull les teves evidències i reflexions de tot el curs.',
    'Un bon estand mostra el producte i l\'explica de manera clara a un públic real.',
    '10 persones dins l\'aula Maker: la seguretat també mana el dia gran.',
    'Diagnosticar en veu alta (què esperava, què passa, hipòtesi) és demostrar coneixement.',
    'Transferir = usar el que has après en situacions noves: l\'objectiu final del curs.',
  ],
  T1: [
    'Nom = negre (gravat) · contorn = vermell fi (tall).',
    'El vermell (tall) que queda solt cau; el gravat negre no cau mai.',
    'El kerf fa el tall més ample: la ranura es dissenya més estreta que el material.',
    'Document sempre en mm: els píxels enganyen les mides.',
    'Convertit a camí, el text es grava igual a qualsevol ordinador, tingui la font o no.',
    'Aturar la màquina i avisar: mai aigua ni bufar.',
    'Necessitat → idea → disseny → fabricació → millora.',
    'Targeta del Museu + versió 2: l\'error documentat és aprenentatge, no fracàs.',
    'Alt contrast i simplicitat = vector net.',
    'Una planxa ben aprofitada estalvia material i minuts de làser per a tothom.',
  ],
  T2: [
    'El forat només buida quan AGRUPES peça + forat.',
    'D de "drop": la peça baixa al pla de treball.',
    '.STL per imprimir (com .SVG per a la làser).',
    'Si supera el límit: reduir mida o farciment i tornar a laminar — una iteració més.',
    '≥3 mm de paret: el llindar del curs perquè la peça no es trenqui.',
    'El forat una mica més gran que l\'objecte (~0,5 mm de marge) o no hi entrarà.',
    'La primera capa és el moment crític: placa neta i brim si cal.',
    'Els requisits surten de l\'usuari real: entrevista i observació.',
    'Vermell = tall · negre = gravat: el codi de colors no caduca mai.',
    'Kerf i tolerància són marges de mida: preveure\'ls és dissenyar bé.',
  ],
  T3: [
    'La càmera 360 ho veu tot: qui captura queda fora d\'escena.',
    'Sense permís no es publica: es repeteix la captura o es descarta.',
    'Parar, treure\'s les ulleres, seure i avisar.',
    'Vigilar l\'espai del company mentre porta les ulleres: seguretat de dos.',
    'Una fita és un punt de control amb data: què i quan.',
    '1 evidència per trimestre amb reflexió + fitxa i diari de SA9 + «El meu viatge maker».',
    '10 persones dins l\'aula Maker, comptades a la porta.',
    'Explicar què esperava / què passa / la hipòtesi: diagnosticar és saber-ne.',
    '< 1 h i < 40 g per peça, fins a l\'últim dia de curs.',
    'Sense carnet no s\'opera cap màquina — tampoc a la Fira.',
  ],
};

function buildRequests(saDef) {
  const descripcio = saDef.topicSA
    ? `Mini-lliga de la setmana de Fira: ${saDef.tema}. Barreja el que has après aquest trimestre (i abans!). NO qualifica: en enviar veuràs les solucions. Repeteix-lo tants cops com vulguis — recordar més tard és el que consolida.`
    : `Qüestionari de repàs de la ${saDef.sa} (${saDef.tema}). NO qualifica: en enviar veuràs les solucions. Repeteix-lo tants cops com vulguis — recordar és el que consolida.`;
  const requests = [
    { updateFormInfo: {
        info: { description: descripcio },
        updateMask: 'description' } },
    { updateSettings: { settings: { quizSettings: { isQuiz: true } }, updateMask: 'quizSettings.isQuiz' } },
  ];
  let index = 0;
  requests.push({ createItem: { item: { title: 'Nom i cognoms', questionItem: { question: { required: true, textQuestion: { paragraph: false } } } }, location: { index: index++ } } });
  for (const [i, [title, opcions, correcta]] of saDef.qs.entries()) {
    requests.push({ createItem: { item: {
      title,
      questionItem: { question: gradedQuestion(saDef, i, opcions, correcta) }
    }, location: { index: index++ } } });
  }
  return requests;
}

// Pregunta amb qualificació i retroacció (si n'hi ha al mapa FEEDBACK).
function gradedQuestion(saDef, i, opcions, correcta) {
  const grading = { pointValue: 1, correctAnswers: { answers: [{ value: opcions[correcta] }] } };
  const fb = (FEEDBACK[saDef.sa] || [])[i];
  if (fb) {
    grading.whenRight = { text: `✅ Exacte. ${fb}` };
    grading.whenWrong = { text: `🔎 Fixa-t'hi: ${fb}` };
  }
  return {
    required: true,
    grading,
    choiceQuestion: { type: 'RADIO', options: opcions.map(v => ({ value: v })) }
  };
}

// Afegeix la retroacció a preguntes de Forms JA CREATS (in place, per títol de pregunta).
// Idempotent: salta les preguntes que ja tenen whenWrong.
async function afegirRetroaccio(auth) {
  const drive = google.drive({ version: 'v3', auth });
  const forms = google.forms({ version: 'v1', auth });
  for (const saDef of [...SAS, ...TRIMESTRALS]) {
    const titolForm = saDef.topicSA
      ? `${saDef.sa} · ${saDef.tema}`
      : `${saDef.sa} · Qüestionari de repàs — ${saDef.tema}`;
    const search = await drive.files.list({
      q: `name = '${titolForm.replace(/'/g, "\\'")}' and mimeType = 'application/vnd.google-apps.form' and trashed = false`,
      fields: 'files(id)'
    });
    const f = (search.data.files || [])[0];
    if (!f) { console.log(`⚠️  Form no trobat: ${titolForm}`); continue; }
    const form = await forms.forms.get({ formId: f.id });
    const items = form.data.items || [];
    const requests = [];
    for (const [i, [title, opcions, correcta]] of saDef.qs.entries()) {
      const idx = items.findIndex(it => it.title === title);
      if (idx === -1) { console.log(`   ⚠️  Pregunta no trobada a ${saDef.sa}: ${title.slice(0, 50)}…`); continue; }
      if (items[idx].questionItem?.question?.grading?.whenWrong) continue; // ja té retroacció
      requests.push({ updateItem: {
        item: { itemId: items[idx].itemId, title, questionItem: { question: gradedQuestion(saDef, i, opcions, correcta) } },
        location: { index: idx },
        updateMask: 'questionItem.question'
      } });
    }
    if (!requests.length) { console.log(`↩️  ${saDef.sa}: ja tenia tota la retroacció.`); continue; }
    await forms.forms.batchUpdate({ formId: f.id, requestBody: { requests } });
    console.log(`✅ ${saDef.sa}: retroacció afegida a ${requests.length} preguntes.`);
  }
}

function escriuBancMd() {
  let md = `# 🔁 Qüestionaris de repàs autocorrectius (SA0–SA9)

> **Per a l'alumnat** (i per a qualsevol docent que reutilitzi el material). Un qüestionari
> **autocorrectiu** per SA: 8 preguntes del **nucli** (criteris d'èxit, vocabulari clau i
> normes), resposta immediata, **no qualifica** i es pot **repetir**. És repàs espaiat fora
> de l'aula: fes-lo en tancar la SA i torna-hi unes setmanes després.
>
> Les tasques de Classroom estan en **esborrany**: el docent les publica quan es tanca cada
> SA. La font única de les preguntes (amb la resposta marcada) és el generador
> \`crear_questionaris_repas_maker.js\` del pipeline de Classroom del docent.
>
> ⚠️ **Sincronització:** aquest document el **genera** el script; no l'editis a mà. Per canviar
> una pregunta, edita-la al generador i **regenera** el Form afectat abans de publicar-lo.

| SA | Tema | Preguntes |
|---|---|---|
`;
  for (const s of SAS) md += `| **${s.sa}** | ${s.tema} | ${s.qs.length} |\n`;
  for (const s of TRIMESTRALS) md += `| **${s.sa}** 🎪 | ${s.tema} | ${s.qs.length} |\n`;
  const bancDe = (defs) => {
    let out = '';
    for (const s of defs) {
      out += `\n### ${s.sa} — ${s.tema}\n\n`;
      s.qs.forEach(([enunciat, opcions, correcta], i) => {
        out += `${i + 1}. ${enunciat}\n`;
        opcions.forEach((o, j) => {
          out += j === correcta ? `   - **${o}** ✔️\n` : `   - ${o}\n`;
        });
        const fb = (FEEDBACK[s.sa] || [])[i];
        if (fb) out += `   💡 *${fb}*\n`;
      });
    }
    return out;
  };
  md += `\n## Banc de preguntes (solució en negreta)\n`;
  md += bancDe(SAS);
  md += `\n## 🎪 Repàs acumulatiu de trimestre (mini-lliga de la setmana de Fira)

> Preguntes **noves** (amb escenari) que barregen les SA del trimestre i recuperen «perles»
> de trimestres anteriors: l'esforç de recordar el que semblava oblidat és el que consolida.
> El docent els publica la setmana de cada Fira (13, 25 i 35).
`;
  md += bancDe(TRIMESTRALS);
  md += `\n> Connecta amb: \`Avaluació/Instruments_formatius.md\` §2 i §6 (tiquets i mini-checks)\n> i \`Classes/SA0_Punt_de_partida/Vocabulari_basic.md\` (el glossari del curs).\n`;
  fs.writeFileSync(BANC_MD, md);
}

async function main() {
  if (process.argv.includes('--nomes-md')) {
    escriuBancMd();
    console.log('📄 Només banc: Avaluació/Questionaris_repas.md regenerat (cap crida a Google).');
    return;
  }
  if (process.argv.includes('--retroaccio')) {
    const auth = await getAuthClient();
    await afegirRetroaccio(auth);
    escriuBancMd();
    console.log('\n🏆 Retroacció aplicada als Forms existents + banc regenerat.');
    return;
  }
  const auth = await getAuthClient();
  const forms = google.forms({ version: 'v1', auth });
  const drive = google.drive({ version: 'v3', auth });
  const classroom = google.classroom({ version: 'v1', auth });

  // carpeta de Drive (només fitxers creats per aquesta app són visibles amb drive.file)
  let folderId = null;
  try {
    const search = await drive.files.list({
      q: `name = '${DRIVE_FOLDER_NAME}' and mimeType = 'application/vnd.google-apps.folder' and trashed = false`,
      fields: 'files(id, name)'
    });
    if (search.data.files && search.data.files.length) {
      folderId = search.data.files[0].id;
      console.log(`↩️  Carpeta de Drive existent: ${DRIVE_FOLDER_NAME}`);
    } else {
      const created = await drive.files.create({
        requestBody: { name: DRIVE_FOLDER_NAME, mimeType: 'application/vnd.google-apps.folder' },
        fields: 'id'
      });
      folderId = created.data.id;
      console.log(`✅ Carpeta de Drive creada: ${DRIVE_FOLDER_NAME}`);
    }
  } catch (e) {
    console.log(`⚠️  No s'ha pogut preparar la carpeta de Drive (${e.message}); els Forms quedaran a l'arrel.`);
  }

  const topicsRes = await classroom.courses.topics.list({ courseId: COURSE_ID, pageSize: 100 });
  const topics = topicsRes.data.topic || [];

  // tasques existents per no duplicar
  const cwRes = await classroom.courses.courseWork.list({ courseId: COURSE_ID, pageSize: 100, courseWorkStates: ['PUBLISHED', 'DRAFT'] });
  const titolsExistents = new Set((cwRes.data.courseWork || []).map(w => w.title));

  const resultats = [];
  for (const saDef of [...SAS, ...TRIMESTRALS]) {
    const titol = saDef.topicSA
      ? `${saDef.sa} · ${saDef.tema}`
      : `${saDef.sa} · Qüestionari de repàs — ${saDef.tema}`;
    if (titolsExistents.has(titol)) {
      console.log(`↩️  Ja existeix, saltat: ${titol}`);
      continue;
    }
    console.log(`\n📝 ${titol}`);
    const createRes = await forms.forms.create({ requestBody: { info: { title: titol, documentTitle: titol } } });
    const formId = createRes.data.formId;

    if (folderId) {
      const fileMeta = await drive.files.get({ fileId: formId, fields: 'parents' });
      await drive.files.update({ fileId: formId, addParents: folderId,
        removeParents: (fileMeta.data.parents || []).join(','), fields: 'id, parents' });
    }

    await forms.forms.batchUpdate({ formId, requestBody: { requests: buildRequests(saDef) } });
    const responderUri = (await forms.forms.get({ formId })).data.responderUri;

    const topicKey = saDef.topicSA || saDef.sa;
    let topic = topics.find(tp => tp.name && tp.name.toUpperCase().startsWith(topicKey));
    if (!topic) {
      const nt = await classroom.courses.topics.create({ courseId: COURSE_ID, requestBody: { name: topicKey } });
      topic = nt.data; topics.push(topic);
    }

    const descTasca = saDef.topicSA
      ? `Mini-lliga de la setmana de Fira (NO qualifica; el pots repetir). Barreja preguntes de tot el trimestre — i alguna d'abans: recuperar el que sembla oblidat és el que el fixa de veritat.`
      : `Repàs autocorrectiu de la ${saDef.sa} (NO qualifica; el pots repetir). Fes-lo quan tanquem la SA, i torna-hi unes setmanes després: recordar més tard és el que fa que no s'esborri.`;

    const cw = await classroom.courses.courseWork.create({
      courseId: COURSE_ID,
      requestBody: {
        title: titol,
        description: descTasca,
        workType: 'ASSIGNMENT',
        state: 'DRAFT',
        topicId: topic.topicId,
        materials: [{ link: { url: responderUri, title: `${titol} (Google Form)` } }]
      }
    });

    console.log(`   ✅ Form ${formId} · tasca DRAFT ${cw.data.id}`);
    resultats.push({ sa: saDef.sa, titol, formId, responderUri, courseWorkId: cw.data.id, alternateLink: cw.data.alternateLink, preguntes: saDef.qs.length });
  }

  // fusiona amb execucions anteriors (per títol) per no perdre els formId ja creats
  const RESULTATS_PATH = new URL('./resultats_questionaris_repas_maker.json', import.meta.url);
  let previs = [];
  try { previs = JSON.parse(fs.readFileSync(RESULTATS_PATH, 'utf8')); } catch { /* primera execució */ }
  const perTitol = new Map(previs.map(r => [r.titol, r]));
  for (const r of resultats) perTitol.set(r.titol, r);
  fs.writeFileSync(RESULTATS_PATH, JSON.stringify([...perTitol.values()], null, 2));

  // Banc visible al repo del curs Maker
  escriuBancMd();

  console.log(`\n🏆 FET! ${resultats.length} qüestionaris creats (tasques en DRAFT) + banc a Avaluació/Questionaris_repas.md`);
}

main().catch(err => { console.error('❌ Error:', err); process.exit(1); });
