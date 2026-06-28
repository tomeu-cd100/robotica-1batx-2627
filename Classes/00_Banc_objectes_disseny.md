# Banc d'objectes per dissenyar — de l'electrònica al producte

> Catàleg **transversal**: per a cada SA, **objectes reals** que l'alumnat pot **dissenyar i construir** com a producte amb identitat pròpia (no només el muntatge tècnic). Cada objecte parteix dels continguts de la SA i hi afegeix la dimensió de **disseny de producte**: funció, usuari, carcassa/maqueta i estètica.

Es pot fer servir com a **alternativa al producte de la SA**, com a **repte obert**, o com a **llavor del projecte de SA9**.

---

## El procés de disseny d'un objecte (integrat amb el mètode de projecte)

| Pas | Pregunta de disseny | Es correspon amb… |
|---|---|---|
| 1. **Empatitzar** | Qui ho farà servir? Quin problema o desig té? | Analitzar |
| 2. **Definir** | Què ha de fer l'objecte (funció) i quins requisits té? | Analitzar |
| 3. **Idear i dissenyar** | Quina forma, mida i materials? On va l'electrònica? | Dissenyar |
| 4. **Prototipar** | Munto el circuit, programo i construeixo la carcassa/maqueta. | Prototipar |
| 5. **Provar i millorar** | Funciona? És còmode, segur i atractiu? Itero. | Provar → Millorar |

> És el mateix cicle del curs, amb la mirada de **producte**: un objecte que algú voldria usar, no només un circuit damunt la taula.

---

## Pautes de carcassa, maqueta i fabricació

- **Materials de baix cost:** cartró ploma, cartró reciclat, fusta de balsa, envasos reutilitzats (ampolles, capses), brides, velcro, cola tèrmica.
- **Impressió 3D** (aprofitant que el curs ja la usa amb la Imagina 3dBot): suports de sensor, carcasses, engranatges, peces a mida. Eines: Tinkercad 3D / FreeCAD → STL.
- **Subjecció de l'electrònica:** deixar accés al **USB** i al **portapiles**; forats per a sensors (LDR, ultrasons) i per a la **ventilació** si hi ha motors.
- **Seguretat:** cap cable pelat accessible; bateries fixades; vores sense tall; motors amb protecció de dits.
- **Ecodisseny (ODS 12):** prioritzar material reciclat/reutilitzat, unions desmuntables (per reparar i reciclar) i mida mínima necessària.

---

## Rúbrica de disseny de producte (complementa R2/R3/R4)

| Aspecte | NA | AS | AN | AE |
|---|---|---|---|---|
| **Funció**: l'objecte fa el que diu i respon a una necessitat real | | | | |
| **Usabilitat**: còmode i clar per a l'usuari previst | | | | |
| **Construcció**: carcassa/maqueta sòlida, neta i segura | | | | |
| **Ecodisseny**: materials i unions responsables (ODS 12) | | | | |
| **Comunicació**: explica decisions de disseny (per què així) | | | | |

---

## Banc d'objectes per SA

> Format de cada objecte: **Funció · Usuari/context · Base tècnica (SA) · Carcassa/maqueta · Repte de disseny extra.**

### SA1 · LED, sortida digital, entrada-procés-sortida
- **Llum de nit infantil.** Funció: llum suau amb un patró tranquil·litzador. · Usuari: infants. · Base: LED (intern o extern) amb patró de `delay()`. · Carcassa: figura translúcida de cartró/paper vegetal o impresa en filament translúcid. · Repte: forma personalitzada que difongui bé la llum.
- **Xapa/insígnia lluminosa.** Funció: identificar un grup o esdeveniment amb llum. · Usuari: assistents a una fira/jornada. · Base: LED amb parpelleig. · Carcassa: suport amb agulla/clip imprès; logotip retallat. · Repte: silueta del logotip que deixi passar la llum.
- **Far de maqueta.** Funció: senyal lluminosa identificativa. · Usuari: maqueta de port/diorama. · Base: LED amb patró propi. · Carcassa: torre de cartró + lent de difusió. · Repte: dos temps clarament distingibles a distància.

### SA2 · Sortides múltiples, PWM, RGB
- **Làmpada d'ambient RGB.** Funció: il·luminació decorativa amb colors i *fade*. · Usuari: habitació/escriptori. · Base: LED RGB + PWM. · Carcassa: difusor (ampolla reciclada, paper vegetal o pantalla impresa). · Repte: diversos "modes" d'ambient.
- **Llum d'estat (ocupat/lliure).** Funció: comunicar disponibilitat sense paraules. · Usuari: teletreball, aula, lavabo. · Base: RGB o 3 LED. · Carcassa: peça de taula o de porta impresa, amb peana. · Repte: canvi d'estat amb un botó i color clar a distància.
- **Semàfor educatiu de maqueta.** Funció: ensenyar el trànsit. · Usuari: educació infantil. · Base: 3 LED + seqüència. · Carcassa: pal + caixa de cartró a escala. · Repte: afegir fase de vianants.

### SA3 · Sensors i entrades
- **Llum automàtica d'armari/passadís.** Funció: encén sol quan fa fosc. · Usuari: casa. · Base: LDR + LED. · Carcassa: caixa amb finestreta per a la LDR. · Repte: histèresi perquè no parpellegi al capvespre.
- **Sensor d'aparcament de garatge.** Funció: avisa quan el cotxe és a la distància justa. · Usuari: conductor al garatge. · Base: HC-SR04 + LED/brunzidor. · Carcassa: caixa amb suport de paret i sensor orientable. · Repte: tres trams (lluny/mig/a prop).
- **Alarma de calaix/motxilla.** Funció: avisa si algú l'obre. · Usuari: estudiant. · Base: LDR (entra llum) o polsador. · Carcassa: mòdul petit amovible. · Repte: desactivació amb una seqüència.

### SA4 · Servos, motors i moviment
- **Barrera de pàrquing.** Funció: obrir/tancar el pas. · Usuari: maqueta urbana. · Base: servo (+ ultrasons). · Carcassa: estructura amb braç articulat (cartró/3D). · Repte: obertura automàtica per detecció.
- **Dispensador (caramels / pinso de mascota).** Funció: servir una dosi. · Usuari: casa, mascotes. · Base: servo com a comporta. · Carcassa: tremuja (ampolla/cartró) + comporta giratòria. · Repte: una sola dosi per activació.
- **Braç robòtic de cartró (tipus MeArm).** Funció: agafar i moure objectes lleugers. · Usuari: taller/demostració. · Base: 2 servos coordinats. · Carcassa: peces de cartró o impreses. · Repte: afegir una pinça.

### SA5 · micro:bit i MicroPython
- **Podòmetre *wearable*.** Funció: comptar passes i animar a moure's. · Usuari: esportista. · Base: acceleròmetre. · Carcassa: braçalet/clip (tela o imprès) amb accés al USB. · Repte: objectiu diari i felicitació en assolir-lo.
- **Insígnia interactiva.** Funció: mostrar nom/emoció. · Usuari: jornada o classe. · Base: matriu LED + botons. · Carcassa: penjoll amb cordó. · Repte: animació pròpia.
- **Joc de butxaca (dau/pedra-paper-tisora).** Funció: jugar a qualsevol lloc. · Usuari: tothom. · Base: acceleròmetre + ràdio. · Carcassa: carcassa de butxaca robusta. · Repte: partida entre dues plaques per ràdio.

### SA6 · Sistemes de control
- **Mini-hivernacle automàtic.** Funció: mantenir condicions per a una planta. · Usuari: balcó/aula. · Base: sensor + ventilador/llum amb histèresi. · Carcassa: estructura transparent (ampolla, metacrilat o marc imprès). · Repte: regular dues variables.
- **Termòstat de maqueta.** Funció: mantenir una consigna. · Usuari: casa. · Base: sensor + actuador (LED/ventilador) tot/res amb histèresi. · Carcassa: caixa amb indicador d'estat. · Repte: consigna ajustable amb potenciòmetre.
- **Incubadora didàctica.** Funció: temperatura estable. · Usuari: granja escola. · Base: control en llaç tancat. · Carcassa: caixa aïllada amb finestreta. · Repte: alarma si surt de rang.

### SA7 · Robòtica mòbil (Imagina 3dBot)
- **Robot repartidor.** Funció: portar un objecte d'un punt a un altre. · Usuari: magatzem/casa de maqueta. · Base: 3dBot + trajectòria/seguidor. · Carcassa: safata o compartiment (cartró/3D). · Repte: completar una ruta amb càrrega.
- **Robot netejador (tipus Roomba).** Funció: recórrer una superfície. · Usuari: casa. · Base: 3dBot + evita-obstacles. · Carcassa: faldó/raspall frontal. · Repte: no caure d'una taula (sensor de vora).
- **Vehicle de competició (seguidor de línia).** Funció: completar un circuit ràpid. · Usuari: cursa d'aula. · Base: 3dBot + sensors IR. · Carcassa: carrosseria lleugera i aerodinàmica (cartró/3D). · Repte: millorar el temps de volta iterant.

### SA8 · IoT i IA
- **Estació meteo connectada.** Funció: mesurar i transmetre dades ambientals. · Usuari: hort/aula. · Base: micro:bit/ESP32 + sensors (telemetria). · Carcassa: abric tipus *Stevenson* (ventilat, protegit de la pluja) de cartró/3D. · Repte: registre i alerta per llindar.
- **Comptador d'aforament.** Funció: comptar persones que entren/surten. · Usuari: botiga/aula. · Base: sensor + ràdio. · Carcassa: mòdul discret a la porta. · Repte: avís en superar l'aforament.
- **Control domòtic per gestos.** Funció: encendre/controlar amb moviments. · Usuari: accessibilitat a la llar. · Base: micro:bit (acceleròmetre, IA per regles) + ràdio. · Carcassa: comandament de mà o guant. · Repte: afegir una nova classe de gest.

### SA9 · Projecte final — objecte lliure integrador
- L'equip **tria o inventa** un objecte que combini sensors + actuadors + control (i, si vol, IoT/IA), amb una **carcassa/maqueta acabada**.
- Guia de tria: *quin problema real resol? qui l'usarà? quins continguts de SA1–SA8 integra? com serà físicament?*
- Useu el `plantilles/Banc_de_reptes.md` i el `Dossier_tecnic_PLANTILLA.md`; documenteu també les **decisions de disseny de producte** (per què aquesta forma, materials i mida).

---

## Connexió amb el curs
- Cada objecte reforça el **context real i ODS** de la seva SA (vegeu cada `SAx_guia_docent.md`).
- L'enfocament d'**ecodisseny** (materials reutilitzats, desmuntables) treballa l'**ODS 12**.
- Aquest banc complementa els **reptes** (`Reptes/`) i el **projecte final** (`Classes/SA9/`): el repte aporta el context tècnic; aquest banc, la mirada de **producte**.
