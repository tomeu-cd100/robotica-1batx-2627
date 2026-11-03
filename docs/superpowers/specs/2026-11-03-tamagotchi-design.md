# Disseny · El robot del T1 passa a ser un tamagotchi de sobretaula

**Data:** 2026-11-03 · **Estat:** esborrany per aprovar pel docent · **Relacionat:** `2026-11-03-passos-autonoms-design.md` (el format de pràctiques es manté)

## Per què

La mascota reactiva del T1 (caixa de DM amb ulls NeoPixel i reaccions a sensors) no convenç el docent. Vol que el robot del trimestre sigui **un tamagotchi**: una mascota virtual que l'alumnat ha de **cuidar**, amb pantalla i botons, que reacciona a l'entorn i amb la forma d'ou característica. Hi ha projectes oberts que demostren que es pot fer amb un Arduino UNO, una OLED SSD1306 i tres botons (Tamaguino, Slug-gotchi, Bunny Tamagotchi). Fem un tamagotchi **propi**: res de ROM ni d'emuladors de Bandai, i ni el personatge ni els gràfics del joguet comercial.

## Objectius

- Un **tamagotchi de sobretaula** amb el **UNO i la protoboard del kit** a dins d'una carcassa **en forma d'ou**.
- **Tres necessitats** (gana, son i felicitat, de 0 a 100) que baixen amb el temps i més de pressa segons els sensors.
- **Tres botons** per cuidar-la: menjar, jugar i dormir.
- **Estats:** contenta → trista → malalta. **No es mor mai** i sempre es recupera quan l'atens.
- **Pantalla OLED** amb la cara i les barres de les necessitats. El LED RGB i el brunzidor expressen l'humor, aprofitant la SA2.
- Cada alumne li dona **nom i caràcter**, que es veuen en com reacciona (com fins ara amb la fitxa de personalitat).
- Substitueix la mascota **als dos llocs**: a la **SA2 S3** es fabrica la carcassa i a la **SA3** es programa.

## No-objectius

- No és un dispositiu de butxaca: ni Arduino Nano, ni bateria, ni portabilitat.
- No hi ha minijocs complexos, ni evolució per etapes, ni rellotge real.
- No es copien gràfics, noms ni sons del Tamagotchi comercial, ni es fa servir el seu firmware.
- No es canvia el format de passos autònoms: les pràctiques segueixen `docs/plantilles/`.

## Anti-objectius (fracàs encara que funcioni)

- Que la mascota «es mori» o arribi a un final sense retorn.
- Un esquelet tan acabat que l'alumne només canvia números: la feina de la SA3 (llegir → comparar → decidir, botons amb antirebot) l'ha de fer ell.
- Un programa que no hi cap a la memòria del UNO o que es penja per falta de RAM a mitja classe.
- Una carcassa on no hi cap el UNO amb la protoboard, o que obliga a desmuntar el cablatge per treure el cable USB.

## Decisions preses amb el docent

1. **De sobretaula, amb el UNO del kit**, no amb un Nano.
2. **Forma de tamagotchi (ou)**, en dues versions fabricables alhora: **tallada al làser** (DM) i **impresa en 3D**. El docent fa algunes carcasses de cada tipus per treballar en paral·lel.
3. **Si no la cuides: es posa trista i malalta, però no es mor.**
4. **Substitueix la mascota a la SA2 (fabricació) i a la SA3 (programació).**
5. **Els ultrasons surten de la SA3.** La «funció que retorna un valor» i l'HC-SR04 es treballen a la SA4 (braç). Les hores de la SA3 no canvien.
6. **Les OLED arriben abans de la SA2 S3.** La carcassa es fabrica a la SA2 S3 tal com estava previst. El SCAD es parametritza amb les mides del mòdul 0,96" habitual i el docent les ajusta amb el mòdul real.
7. **Una carcassa per alumne.** El producte és individual i la rúbrica R1 avalua la carcassa de cadascú.

## Decisions de Claude després de la revisió (2026-11-03)

- **Versió nucli:** les 3 necessitats amb els 3 botons, 1 sensor (la llum) i els estats contenta i trista. *(Revisió final: la son baixa sola, i sense DORMIR el nucli quedaria trist per sempre.)*
- **Versió completa:** a més, el soroll (2 sensors o més) i l'estat malalta. Quan dorm, el soroll no la desperta (si no, en una aula sorollosa no es podria recuperar).
- **Ampliacions:** DHT11, persistència a l'EEPROM i NeoPixel.
- **SA3 S3:** la ③ OLED és curta (~25', el temps dels ultrasons) i deixa a punt les funcions de dibuix (cara, barres, text). L'esquelet del tamagotchi (④) porta fets la pantalla i la baixada de les necessitats amb `millis()`. Els `// TODO` de l'alumne són els botons (amb antirebot), els sensors (llegir → comparar → decidir) i les condicions dels estats.
- **Sensors:** el nucli fa servir la **llum** i el **micròfon**, el **PIR** és de la versió completa i el **DHT11** és una ampliació. La carcassa té forats per a tots quatre.
- **`04_alarma_aparcament`** (també fa servir l'HC-SR04) s'arxiva a `docs/arxiu/`, amb la mateixa lògica que la P3 antiga.
- **La tasca de Classroom «SA3 · Pràctica 3 · Ultrasons»** (publicada, 0 lliuraments, creada amb el client nou) **s'esborra**, d'acord amb la indicació del docent d'esborrar les que no serveixen. La nova ③ OLED té la seva pròpia tasca.

## Funcionament (proposta de Claude, per a validar)

- **Necessitats:** `gana`, `son` i `felicitat`, enters de 0 a 100. Cada N segons (`millis()`, sense `delay` llargs) en baixa una mica cadascuna.
- **Sensors (els de la SA3):**
  - **llum** (LDR o TEMT6000): si és fosc, la son baixa més de pressa i es pot adormir;
  - **micròfon**: un soroll fort l'espanta i baixa la felicitat;
  - **PIR**: si hi ha algú a prop, la felicitat puja una mica;
  - **DHT11** (opcional): si fa calor o fred, està incòmoda.
- **Botons** (`INPUT_PULLUP` i antirebot, com a SA3 P1):
  - **menjar** puja la gana;
  - **jugar** puja la felicitat i baixa una mica la son;
  - **dormir** apaga la pantalla i la son es recupera.
- **Estats:**
  - **contenta**: totes les necessitats per sobre d'un llindar;
  - **trista**: alguna per sota del llindar (cara trista, LED blau, so suau);
  - **malalta**: dues necessitats baixes durant un temps (icona de malalta, LED vermell, no vol jugar fins que mengi i dormi).
  - Totes les transicions són reversibles.
- **Persistència (proposta, es pot deixar com a ampliació):** desar les necessitats a l'EEPROM amb poca freqüència (per exemple, cada 5 min o en dormir), perquè la mascota continuï a la classe següent sense gastar l'EEPROM.

## Maquinari

- **Nou (s'ha de comprar):** **1 OLED SSD1306 de 0,96", 128×64, I²C** (A4/A5) per alumne i **2 polsadors més** (n'hi ha 3 en total).
- **Del kit:** UNO, protoboard, LED RGB, brunzidor, PIR, micròfon, sensor de llum i DHT11.
- **Pins:** els lliures després de reservar A4/A5 per a l'OLED. El micròfon i la llum no poden quedar a A4/A5, i el pin 11 ja no està ocupat per l'ECHO de l'ultrasons.
- **Memòria:** el UNO té 2 KB de RAM. Cal fer servir **U8g2 en mode pàgina** (constructor `_1_`), no Adafruit_SSD1306 amb el buffer de 1 KB. Els **NeoPixel queden fora del muntatge base**, perquè els ulls ja són a la pantalla (si hi cap, poden ser una ampliació). Cal comprovar la memòria lliure compilant l'esquelet.

## Carcassa (Recursos/)

- **Paramètrica en OpenSCAD** (`Recursos/peces_3d/`), amb les mides del UNO + mitja protoboard, la finestra de l'OLED, 3 forats de polsador, els forats dels sensors (llum, micròfon, PIR) i del LED RGB, la sortida del cable USB i una tapa de darrere desmuntable.
- **Versió 3D:** closca d'ou i tapa. **Versió làser:** l'ou en capes de DM de 3 mm apilades (un SVG/DXF exportat del mateix SCAD, a `Recursos/plantilles_laser/`), amb el frontal gravable per personalitzar-lo.
- Substitueix `mascota.svg` i `difusor_ull.scad`, que s'arxiven i no s'esborren.

## Impacte al curs

- **SA2 S3:** la fabricació de la mascota passa a ser la fabricació de la carcassa del tamagotchi, per torns, mentre fan el panell. La personalització (gravat del frontal o color) l'esbossen a la S2.
- **SA3:**
  - ① Polsador i ② Potenciòmetre i llum es mantenen.
  - La ③ Ultrasons surt, i la seva tasca de Classroom «SA3 · Pràctica 3 · Ultrasons», ja publicada i sense lliuraments, s'esborra o s'amaga.
  - Hi entra **③ La pantalla OLED** (nova): mostrar text, una barra i una cara.
  - La **④ La mascota** passa a ser **④ El teu tamagotchi**.
  - Els formularis de Classroom s'han d'adaptar: la Pràctica 3 nova i la 4.
  - La prova T1 no canvia, perquè no fa servir ultrasons.
- **SA4:** `03_ultrasons_brac` i la seva guia passen a ser la **primera vegada** que veuen l'HC-SR04 i una funció que retorna un valor. Cal portar-hi el contingut essencial de l'antiga SA3 P3.
- **Documents:** el dossier `00_Projecte_T1_Mascota.md` (es converteix en el dossier del tamagotchi), el fil conductor dels robots, la Programació didàctica (11_SA2, 12_SA3, 13_SA4 i la seqüenciació), els reptes de la SA2 i la SA3, els esquemes de la SA3 i la rúbrica del robot (els criteris passen a ser carcassa, necessitats, estats i botons, i fitxa de personalitat).

## Restriccions

Les del projecte (`CLAUDE.md`): català, `qa.py` net, el CI compila els `.ino` de SA1-SA7 (cal afegir la llibreria **U8g2** al workflow), l'alumnat programa amb comentaris sense accents i la Programació didàctica 1:1. Les tasques de Classroom van a 33 punts, publicades, i el docent posa la categoria T1 a mà.

## Què queda a criteri de qui ho construeixi

- Els llindars, la velocitat de les necessitats, els dibuixos de les cares (bitmaps petits, originals) i els sons.
- Com es reparteix la feina entre l'esquelet donat i els `// TODO` de l'alumne, respectant l'anti-objectiu.
- Les mides concretes de la carcassa i l'assignació de pins, comprovades amb un muntatge de prova.
- Si la persistència a l'EEPROM és el nucli o una ampliació.

## Decisions preses durant la construcció (2026-11-03)

- **Versió làser = «sandvitx»:** dues plaques d'ou de DM (davant i darrere) amb 3 separadors M3 de 72 mm, en lloc de capes apilades (que haurien demanat ~25 plaques per alumne). Els costats queden oberts i es veu l'electrònica.
- **Dormir no apaga la pantalla:** mostra els ulls tancats i una «z». Així l'alumne veu que dorm i que el programa funciona.
- **Pins definitius:** OLED A4/A5 · micròfon A0 · llum A1 · PIR 2 · MENJAR 3 · DHT11 4 · JUGAR 5 · NeoPixel 6 (ampliació) · DORMIR 7 · brunzidor 8 · RGB 9/10/11.
- **Memòria:** l'esquelet deixa 1.158 B de RAM lliure i la solució completa, 1.149 B (U8g2 en mode pàgina, sense NeoPixel).
- La carpeta `Classes/SA3/codi/05_mascota/` conserva el nom perquè el material de la tasca de Classroom `sa3-p4` hi enllaça (l'API no permet canviar els materials).

