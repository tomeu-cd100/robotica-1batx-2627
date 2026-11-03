# Pràctica 4 · Producte: el teu tamagotchi

<div class="cap-practica" markdown="1">

🎯 **Avui aconseguiràs:** un **tamagotchi** que té gana, son i ganes de jugar, que **nota** el que passa al seu voltant amb els sensors i que **cuides** amb tres botons. Si no el cuides es posa trist i malalt, però **mai no es mor**. És el producte de la SA3.

⏱️ La resta de la Sessió 3

📦 La carcassa en forma d'ou, la pantalla OLED, 3 polsadors, el LED RGB, el brunzidor, el sensor de llum, el micròfon, el PIR i cables

</div>

## 🚀 Pas a pas

### Pas 1 · Dissenya el teu tamagotchi

Tria-li un **nom** i un **caràcter** (és dormilec? juganer? poruc?). Decideix què farà cada botó i com l'afectaran els sensors, d'acord amb el seu caràcter.

✍️ **Apunta-ho:** nom i caràcter del teu tamagotchi.

✍️ **Apunta-ho:** què fa cada botó (MENJAR, JUGAR, DORMIR) i quines necessitats canvia.

### Pas 2 · Munta-ho a la carcassa

Fes un cable del **5V** a la fila vermella (+) i un del **GND** a la fila blava (−) de la protoboard. Cada component agafa el corrent d'aquí, i el seu senyal va al pin de la taula:

| Component | Pin de l'Arduino | Fixa-t'hi |
|---|---|---|
| Pantalla OLED | SDA → A4 · SCL → A5 | Com a la Pràctica 3. |
| Botó MENJAR | 3 | Una pota al pin i la diagonal a GND, com a la Pràctica 1. |
| Botó JUGAR | 5 | Igual. |
| Botó DORMIR | 7 | Igual. |
| LED RGB (humor) | 9 · 10 · 11 | Com a la SA2, cada color amb la seva resistència de 220 Ω. |
| Brunzidor | 8 | Pota + al 8, pota − a la fila blava. |
| Sensor de llum | A1 | El de la Pràctica 2, amb la seva resistència de 10 kΩ (o el mòdul TEMT6000). |
| Micròfon | A0 | Mesura el soroll. |
| Sensor de moviment (PIR) | 2 | Versió completa. Tarda **30-60 segons** a funcionar en endollar-lo. |

✅ **Comprova:** els tres botons queden als forats de sota la pantalla, i els mòduls de 3 potes (micròfon, PIR, sensor de llum) tenen les lletres (VCC, GND, OUT o S) on toca.

### Pas 3 · Carrega l'esquelet

Prem **Copia**, enganxa'l a l'Arduino IDE (esborra el que hi hagués) i prem **→ Puja**. Obre el **Monitor sèrie** (9600).

<!-- codi-complet -->

✅ **Comprova:** a la pantalla surten una **cara** i tres **barres** (Gana, Son, Feli) que baixen a poc a poc, i el LED és verd. Si prems MENJAR, sona do-mi i la barra de la gana puja: aquest botó ja és fet, és l'exemple.

### Pas 4 · Programa els botons JUGAR i DORMIR

Busca `// TODO boto JUGAR` i `// TODO boto DORMIR`. Copia l'exemple del botó MENJAR: cada botó necessita la seva variable `anteriorJugar` o `anteriorDormir`, perquè **només compti quan el prems**, no mentre el mantens premut.

✅ **Comprova:** JUGAR fa pujar la barra de la felicitat, i DORMIR fa que tanqui els ulls (surt una «z»). Si el tornes a prémer, es desperta.

### Pas 5 · De nit té son

Busca `// TODO llum`. Fes **llegeix → compara → decideix**, com a la Pràctica 2: posa `esFosc = true;` si la llum és més petita que `LLINDAR_FOSC`, i `esFosc = false;` si no.

✅ **Comprova:** si tapes el sensor de llum, la barra de la son baixa més de pressa.

### Pas 6 · El soroll l'espanta

Busca `// TODO soroll`. Si està desperta i el micròfon llegeix més que `LLINDAR_SOROLL`, la felicitat baixa i fa un so d'espant. Quan dorm, dorm profundament: el soroll no la desperta. El comentari del codi t'explica com evitar que s'espanti cada volta del `loop()`: amb `millis()` i `tUltimEspant`, com l'antirebot.

✅ **Comprova:** si piques de mans fort, sona l'espant i la barra de la felicitat baixa una mica (només una vegada per picada).

✍️ **Apunta-ho:** quins sensors l'afecten i com (llum, soroll, PIR…)?

### Pas 7 · Trista i malalta, però mai morta

Busca `// TODO` dins de `calculaEstat()`. Compta quantes necessitats estan per sota de `LLINDAR_TRISTA`: si n'hi ha **una**, està `TRISTA`; si n'hi ha **dues o més**, està `MALALTA`; si no, `CONTENTA`.

✅ **Comprova:** si no la cuides, el LED es posa blau i la boca trista, i més tard vermell amb una creu. Si llavors la fas menjar i dormir (malalta no vol jugar), **torna a estar contenta**.

✍️ **Apunta-ho:** quan es posa TRISTA i quan MALALTA? Escriu les condicions que has programat.

### Pas 8 · Calibra

Mira els números `llum=` i `soroll=` del Monitor sèrie, amb llum i tapat, i en silenci i picant de mans. Canvia `LLINDAR_FOSC` i `LLINDAR_SOROLL` per un número **entre** els dos que hi veus. Si vols que les necessitats baixin més a poc a poc, fes més gran `TEMPS_BAIXADA`.

✅ **Comprova:** el tamagotchi reacciona quan toca, i no s'espanta sol quan no passa res.

### Pas 9 · Omple el full resum per a la prova

A la Sessió 4 fas la **prova pràctica T1**, i hi pots portar **un full resum en paper** fet per tu. Escriu-hi a mà:

- els pins que has fet servir i a quin component van;
- per a què serveixen `digitalRead`, `analogRead`, `map` i un `if` amb llindar, amb un exemple de cadascun;
- com es llegeix un botó amb `INPUT_PULLUP` i antirebot;
- com es fa una cosa cada cert temps amb `millis()`, sense `delay()`;
- un error que hagis tingut a la SA3 i com l'has resolt.

✅ **Comprova:** tens el full amb el teu nom i el guardes per a la Sessió 4.

### Pas 10 · Explica-ho amb les teves paraules

✍️ **Apunta-ho:** per a què serveix una funció? Posa'n un exemple del teu tamagotchi (per exemple `cara()` o `so()`).

✍️ **Apunta-ho:** un error que has trobat i com l'has resolt.

### Pas 11 · Respon i envia

📤 [Obre la tasca «SA3 · Pràctica 4» a Classroom i envia el formulari](https://classroom.google.com/c/ODY4ODU4Njk0NTEy/a/ODk3NDAzNTU3MTY2/details)

Hi trobaràs les mateixes preguntes ✍️ que has anat apuntant. Envia'l ara i, després, fes l'**[🏁 Entrega final de la SA3](../../README.md#entrega-final)**: la defensa d'1 minut i l'autoavaluació.

**Versió nucli (per aprovar):** les **3 necessitats** amb els **3 botons** (MENJAR, JUGAR, DORMIR), **1 sensor** (la llum) i els estats contenta i trista. **Versió completa:** a més, el soroll (2 sensors o més) i l'estat malalta.

⭐ **Si acabes abans:** fes que el **PIR** el posi content quan algú s'hi acosta, que el **DHT11** el faci estar incòmode si fa calor, o que **guardi** les necessitats a l'EEPROM perquè l'endemà continuï igual (tens els `// EXTRA` al codi). Més reptes a **[Reptes de la SA3](../../../../Reptes/Reptes_SA3.md)**; quan el docent te'l validi, pinta l'estrella al [tauler de reptes](../../../00_General/00_Tauler_reptes.md).

<details markdown="1">
<summary>🧗 Si t'encalles</summary>

| Què passa | Per què | Com ho arreglo |
|---|---|---|
| No compila: `U8g2lib.h` no trobat | Falta la llibreria. | **Eines → Gestiona les biblioteques**, cerca «U8g2» i instal·la-la. |
| Un botó suma moltes vegades si el mantens premut | No compares amb l'estat anterior del botó. | Mira com ho fa MENJAR: `ara == LOW && anterior == HIGH`, i al final `anterior = ara;`. |
| La barra de la son baixa de cop | Restes la son a cada volta del `loop()`. | Al pas 5 només has de posar `esFosc`: qui resta la son és `baixaAmbElTemps()`. |
| S'espanta tota l'estona | El llindar del soroll és massa baix. | Mira el número `soroll=` en silenci i posa el llindar una mica per sobre. |
| Les barres passen de 100 o baixen de 0 | Falta el `constrain`. | Fes com l'exemple: `gana = constrain(gana, 0, 100);`. |
| La pantalla va molt lenta | Hi ha un `delay()` llarg. | Fes servir `millis()` com a `baixaAmbElTemps()`. |

Tots els detalls de la carcassa i el muntatge són al **[dossier del tamagotchi](../../../00_General/00_Projecte_T1_Mascota.md)** i a l'**[esquema de connexions, apartat 5](../../SA3_esquemes_connexions.md)**.

</details>

<details markdown="1">
<summary>🧠 Vols saber per què funciona?</summary>

### Com està organitzat l'esquelet

El `loop()` és molt curt i es llegeix com una llista de feines que es repeteix sense parar:

```cpp
void loop() {
  llegeixBotons();     // el cuides
  llegeixSensors();    // nota l'entorn
  baixaAmbElTemps();   // cada 5 s, les necessitats baixen
  calculaEstat();      // contenta, trista, malalta o dormint
  mostraHumor();       // el color del LED RGB
  dibuixa();           // la pantalla
}
```

Cada feina és una **funció**. Així, si vols canviar com es dibuixa la cara, només toques `cara()`, i si vols un altre so, només toques `so()`.

### Les necessitats: variables que pugen i baixen

`gana`, `son` i `felicitat` són tres variables de 0 a 100. Els botons les fan pujar; el temps i els sensors les fan baixar. `constrain(valor, 0, 100)` vigila que mai no surtin d'aquests límits.

### Fer coses cada cert temps sense aturar-ho tot

```cpp
if (millis() - tUltimaBaixada < TEMPS_BAIXADA) return;
tUltimaBaixada = millis();
```

És el mateix truc de l'antirebot de la Pràctica 1: `millis()` diu quants mil·lisegons fa que s'ha encès l'Arduino, i **restant** sabem quant temps ha passat. Si encara no han passat 5 segons, la funció surt (`return`) i el tamagotchi continua atent als botons. Amb un `delay(5000)`, en canvi, estaria 5 segons sense veure ni sentir res.

### Els estats

Com a la SA2, cada estat és un número amb nom (`CONTENTA`, `TRISTA`, `MALALTA`, `DORMINT`). `calculaEstat()` decideix l'estat a partir de les necessitats, i `mostraHumor()` i `cara()` només miren l'estat per saber què han de mostrar. Com que no hi ha cap estat «mort», sempre es pot tornar a `CONTENTA`.

### On ho aplicaràs

- **Prova T1 (Sessió 4):** muntaràs i programaràs tu sol un circuit amb un sensor, un botó i un llum, amb el mateix patró llegeix → compara → reacciona.
- **SA4:** els estats i `millis()` controlaran el braç robòtic.

</details>
