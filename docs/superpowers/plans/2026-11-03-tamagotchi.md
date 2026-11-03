# Tamagotchi del T1 · Pla 3

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Substituir la mascota reactiva pel tamagotchi de sobretaula. Això inclou:
- el codi: la pràctica OLED i l'esquelet del tamagotchi;
- la carcassa en forma d'ou, en versions 3D i làser;
- les pràctiques i els documents de la SA2, la SA3 i la SA4;
- les tasques de Classroom.

**Architecture:** Es manté el format de passos autònoms dels Plans 1 i 2. La carpeta `Classes/SA3/codi/05_mascota/` **conserva el nom**, perquè el material de la tasca de Classroom `sa3-p4` hi enllaça i l'API no permet canviar-lo. Hi canvien el sketch i la pàgina. La pràctica ③ nova és `Classes/SA3/codi/03_pantalla_oled/`. La P3 d'ultrasons i l'alarma s'arxiven a `docs/arxiu/SA3_ultrasons/`.

**Tech Stack:** Arduino UNO + U8g2 2.36 (mode pàgina, `U8G2_SSD1306_128X64_NONAME_1_HW_I2C`), OpenSCAD (`/c/Program Files/OpenSCAD/openscad.exe`), `arduino-cli`, i els scripts del Pla 1.

**Spec:** `docs/superpowers/specs/2026-11-03-tamagotchi-design.md`

## Global Constraints

Les dels Plans 1 i 2, més aquestes:
- **Pins fixos** (taula única que fan servir el codi, la carcassa i els documents): OLED SDA A4 i SCL A5 · micròfon A0 · llum A1 · PIR 2 · botó MENJAR 3 · DHT11 4 · botó JUGAR 5 · NeoPixel 6 (ampliació) · botó DORMIR 7 · brunzidor 8 · RGB 9, 10 i 11.
- **RAM:** l'esquelet compilat ha de deixar **≥ 600 bytes** de RAM lliure a `arduino-cli compile` (marge per a les variables locals i la pila de U8g2). Sense `String`, i els textos amb `F()` o `u8g2.drawStr` de literals.
- Cares i icones **originals**: bitmaps XBM petits o primitives (cercles i línies). Res del Tamagotchi comercial.
- La mascota **no es mor mai**: cap estat terminal.
- Comentaris del codi d'alumnat en català sense accents.

## Review Focus

1. Les necessitats no poden baixar de 0 ni pujar de 100 (`constrain`). L'estat malalta ha de sortir quan les necessitats es recuperen.
2. Mantenir premut un botó no pot sumar-hi cada volta del `loop`. Cal antirebot i detecció de flanc.
3. El dormir apaga la pantalla. Despertar (amb el botó o amb la llum) la torna a encendre.
4. La carcassa ha de tenir lloc per al UNO, mitja protoboard, la sortida USB i el connector de 5V, i les mides han de ser paramètriques.
5. Cap pàgina d'alumnat de la SA2, la SA3 o la SA4 pot parlar encara de la mascota antiga (caixa de DM amb ulls NeoPixel, «3 reaccions») ni dels ultrasons a la SA3.

---

### Task 1: Codi · pràctica OLED i esquelet del tamagotchi

**Files:** Create `Classes/SA3/codi/03_pantalla_oled/03_pantalla_oled.ino` · Replace `Classes/SA3/codi/05_mascota/05_mascota.ino` · Modify `.github/workflows/qa.yml` (llibreria `U8g2`)

- [ ] **Step 1: `03_pantalla_oled.ino`**: U8g2 en mode pàgina. Al `loop`, mostra el text «Hola!», una barra horitzontal proporcional a `analogRead(A1)` (la llum, de la P2) i una cara feta de cercles que canvia a trista si la barra és curta. Capçalera `Quan: S3`.
- [ ] **Step 2: `05_mascota.ino` (tamagotchi)**: constants de pins segons la taula; `gana`, `son` i `felicitat` (`int`, de 0 a 100); estats `CONTENTA`, `TRISTA`, `MALALTA` i `DORMINT` (`const int`).
  - **Fet**, com a exemple: la baixada amb `millis()` cada `TEMPS_BAIXADA`; `dibuixa()` amb la cara segons l'estat i 3 barres; `colorHumor()` i `so()` de la SA2; el botó MENJAR resolt amb antirebot.
  - **`// TODO`**: els botons JUGAR i DORMIR; la reacció de la llum (fosc → `son` baixa més / s'adorm); la reacció del micròfon (soroll → `felicitat` baixa); `calculaEstat()`, amb els llindars i la condició de malalta; el PIR (versió completa).
  - **Ampliació** marcada `// EXTRA`: DHT11 i EEPROM.
  - Ha de compilar tal com està i mostrar cara i barres.
- [ ] **Step 3:** `arduino-cli compile -b arduino:avr:uno` dels dos sketches → compilen, i el `05` deixa ≥ 600 B lliures. Un sketch de solució **local** (al scratchpad, no es versiona) amb els TODO resolts també ha de compilar amb ≥ 600 B lliures: és la prova que l'alumne té memòria per completar-lo.
- [ ] **Step 4:** Afegeix `- name: U8g2` a les llibreries dels dos passos `compile-sketches` de `qa.yml`. Arxiva `03_ultrasons_funcio/` i `04_alarma_aparcament/` amb `git mv` a `docs/arxiu/SA3_ultrasons/`, i hi afegeix un `README.md` que expliqui que van a la SA4.

### Task 2: Carcassa en forma d'ou (OpenSCAD)

**Files:** Create `Recursos/peces_3d/tamagotchi_ou.scad`, `Recursos/plantilles_laser/tamagotchi_ou_capes.svg` (exportat) · Modify `Recursos/peces_3d/LLEGEIX-ME.md`, `Recursos/plantilles_laser/LLEGEIX-ME.md` · Archive `mascota.svg` i `difusor_ull.scad` a `docs/arxiu/mascota_T1/` (`git mv`)

- [ ] **Step 1:** Ou paramètric (el·lipse amb la part de dalt més estreta), amb paràmetres al capdamunt:
  - UNO 68,6 × 53,4 mm i mitja protoboard 82 × 55 mm, col·locats l'un al costat de l'altre o apilats, segons el que doni la closca més petita;
  - OLED de 0,96": PCB 27,3 × 27,8 mm i finestra 26 × 15 mm, amb un `oled_desp_finestra` ajustable;
  - 3 polsadors de 6 o 12 mm (`d_boto`), a sota de la pantalla;
  - forats per al micròfon, la llum, el PIR (d 23 mm) i el LED RGB;
  - sortida USB-B i jack de 5V al lateral;
  - tapa de darrere amb 4 cargols M3.
  - Variable `MODE = "3d" | "capes"`: `"3d"` genera la closca i la tapa; `"capes"` genera la projecció 2D de N capes de 3 mm, amb el buidat interior i el frontal amb els forats.
- [ ] **Step 2:** `openscad -o tamagotchi_ou_capes.svg -D 'MODE="capes"'` → SVG vàlid. `openscad -o /tmp/... .stl -D 'MODE="3d"'` → STL sense errors (l'STL no es versiona). Captura PNG (`--render -o prev.png`) per comprovar la forma.
- [ ] **Step 3:** Els LLEGEIX-ME expliquen com ajustar les mides de l'OLED real, quantes capes cal tallar i el temps d'impressió orientatiu.

### Task 3: Pràctiques de la SA3 i portada

**Files:** Create `Classes/SA3/codi/03_pantalla_oled/EXPLICACIO.md` · Rewrite `Classes/SA3/codi/05_mascota/EXPLICACIO.md` · Modify `Classes/SA3/README.md`, `SA3_esquemes_connexions.md` (apartats 3 i 5), `SA3_fitxa_alumnat.md`, `SA3_checklist_alumnat.md` (+ PDF), `SA3_guia_docent.md`, `Classes/SA3/codi/02_potenciometre_ldr/EXPLICACIO.md` (enllaç «següent»), `tools/qa.py` (`PRACTIQUES_NOU_FORMAT`)

- [ ] **Step 1: ③ La pantalla OLED** amb la plantilla (25'):
  - Munta l'OLED a A4/A5 amb el sensor de llum de la P2; instal·la U8g2; carrega.
  - ✅ surt «Hola!».
  - Tapa el sensor: ✅ la barra s'escurça i la cara es posa trista.
  - Canvia el text: ✍️ «què escriu `drawStr` i on (x, y)».
  - ✍️ «Per què la pantalla dibuixa dins d'un `do { … } while (nextPage())`?».
  - Envia.
- [ ] **Step 2: ④ El teu tamagotchi**:
  1. Dissenya: ✍️ nom i caràcter; ✍️ què fa cada botó i quins sensors l'afecten.
  2. Munta a la carcassa amb la taula de pins.
  3. Carrega l'esquelet: ✅ cara i barres que baixen.
  4. Programa JUGAR i DORMIR, copiant MENJAR.
  5. La llum i el son.
  6. El soroll.
  7. Els estats (trista i malalta) i ✅ «es recupera».
  8. Calibra.
  9. Full resum per a la prova: es manté, sense la part d'ultrasons.
  10. ✍️ Error.
  11. Envia.

  Versió nucli i completa com a la spec. Les ampliacions (PIR, DHT11, EEPROM i NeoPixel) van al ⭐.
- [ ] **Step 3: Portada.** ③ i ④ nous, sense ultrasons ni alarma; Entrega final; full resum sense la part d'ultrasons; taula de codi. **Esquemes:** l'apartat 3 passa a ser l'OLED i l'apartat 5, el tamagotchi; s'eliminen els apartats d'ultrasons i d'alarma.
- [ ] **Step 4: Guia docent** (S3, xuleta, mapa, logística: U8g2 instal·lada) i fitxa/checklist (treure ultrasons, mascota → tamagotchi).
- [ ] **Step 5:** QA (substitueix la P3 a `PRACTIQUES_NOU_FORMAT`), regenera la web i el PDF de la checklist, i passa tests i QA → net.

### Task 4: Dossier, SA2, SA4, programació i fil conductor

**Files:** Rewrite `Classes/00_General/00_Projecte_T1_Mascota.md` (mateix nom de fitxer: «Projecte T1 · El tamagotchi»: peces, carcassa, cablatge, simulació a Wokwi en lloc de Tinkercad si cal, rúbrica R1-R4 nova) · Modify `00_Fil_conductor_robots.md`, `00_Projecte_T1_portada.md`, `SA2_guia_docent.md` (S3 = fabricació de la carcassa), `Classes/SA2/README.md`, `SA2_checklist_alumnat.md`, `Classes/SA2/codi/0{4,5}*/EXPLICACIO.md` (frases «mascota»), `Reptes/Reptes_SA2.md`, `Reptes/Reptes_SA3.md`, `Programació didàctica/{08,11,12,13}_*.md`, `Classes/SA4/codi/03_ultrasons_brac/EXPLICACIO.md` + `SA4_guia_docent.md` (primera vegada de l'HC-SR04 i de la funció que retorna un valor)

- [ ] **Step 1:** Fes un `grep -rn -i "mascota\|ultrasons" Classes Reptes "Programació didàctica"` i revisa cada coincidència: o s'adapta o es deixa conscientment (la SA4-SA9, si parla dels ultrasons a la SA4, està bé).
- [ ] **Step 2:** SA4 `03_ultrasons_brac`: afegeix-hi els trossos «el sensor és un ratpenat» i «una funció que et torna un número» de l'antiga P3 arxivada, i treu «ja el coneixes de la SA3».
- [ ] **Step 3:** Rúbrica del robot nova (dossier i guia):
  - **R1:** carcassa i muntatge.
  - **R2:** funcionament (botons, sensors, pantalla).
  - **R3:** necessitats i estats (sense mort, es recupera).
  - **R4:** fitxa de personalitat i demostració.
- [ ] **Step 4:** Regenera, fes els tests i el QA, i comprova que el CI compila amb U8g2.

### Task 5: Classroom

**Files:** Modify `Material Classroom/practiques_definicions.js` (`sa3-p3` → OLED; `sa3-p4` → tamagotchi; checklist de `sa3-final`)

- [ ] **Step 1:** Definicions:
  - `sa3-p3`: títol «SA3 · Pràctica 3 · La pantalla OLED», amb les preguntes ✍️ del Task 3.
  - `sa3-p4`: el títol «SA3 · Pràctica 4 · El teu tamagotchi», amb les preguntes ✍️ del Task 3.
  - `sa3-final`: checklist sense els ultrasons.
- [ ] **Step 2:** Simulació. Crea la tasca nova de la P3 OLED (`--aplica --publica`; com que el títol és nou, no la duplica). Per a la P4, script curt que canvia el títol de la tasca (`courseWork.patch title,description`) i substitueix els elements del Form (localitzat a Drive pel títol vell; el client nou el pot editar). També actualitza el `final`. Comprova abans la simulació.
- [ ] **Step 3:** La tasca «SA3 · Pràctica 3 · Ultrasons» s'esborra. Si el classificador bloqueja l'esborrat, s'indica al docent. Els enllaços de les pàgines ③ i ④ apunten a les tasques bones.
- [ ] **Step 4:** Commits, push, CI verd, revisió final amb un revisor nou i correccions, sincronització del Drive.
