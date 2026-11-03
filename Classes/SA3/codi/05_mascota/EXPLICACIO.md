# Pràctica 4 · Producte: la teva mascota reactiva

<div class="cap-practica" markdown="1">

🎯 **Avui aconseguiràs:** que la teva mascota **reaccioni a 3 coses** de l'entorn (soroll, foscor, algú que s'acosta…), d'acord amb el seu caràcter. És el producte de la SA3.

⏱️ La resta de la Sessió 3

📦 La caixa de la mascota, el LED RGB, el brunzidor, el PIR, el micròfon, el sensor de llum (TEMT6000) i cables

</div>

## 🚀 Pas a pas

### Pas 1 · Dissenya la teva mascota

Tria-li un **nom** i un **caràcter** (és tímida? valenta? dormilega?). Després decideix 3 reaccions: **quin sensor → què fa la mascota → per què encaixa amb el seu caràcter**.

✍️ **Apunta-ho:** nom i caràcter de la teva mascota.

✍️ **Apunta-ho:** reacció 1, reacció 2 i reacció 3 (la 3a és opcional): quin sensor → què fa → per què encaixa amb el seu caràcter.

### Pas 2 · Munta els sensors i els llums

Desmunta l'ultrasons, si encara hi és: la mascota fa servir el **pin 11** per al blau del LED RGB. Fes un cable del **5V** a la fila vermella (+) i un del **GND** a la fila blava (−) de la protoboard. Cada component agafa el corrent d'aquí, i el seu senyal va al pin de la taula:

| Component | Pin de l'Arduino | Fixa-t'hi |
|---|---|---|
| LED RGB (humor) | 9 · 10 · 11 | Com a la SA2. |
| Brunzidor | 8 | Pota + al 8, pota − a la fila blava. |
| Sensor de moviment (PIR, el nas) | 2 | Quan l'endolles, tarda **30-60 segons** a funcionar bé. |
| Micròfon | A0 | Mesura el soroll. |
| Sensor de llum (TEMT6000) | A1 | Mesura la llum. |
| Ulls (tira NeoPixel), DIN | 6 | Connecta primer GND, després 5 V i al final DIN. |

✅ **Comprova:** als mòduls de 3 potes (PIR, micròfon, sensor de llum) has llegit les lletres del mòdul (VCC, GND, OUT o S). L'ordre de les potes canvia segons el fabricant.

### Pas 3 · Carrega l'esquelet

Prem **Copia**, enganxa'l a l'Arduino IDE (esborra el que hi hagués) i prem **→ Puja**. Obre el **Monitor sèrie** (9600).

<!-- codi-complet -->

✅ **Comprova:** al Monitor sèrie surten tota l'estona `soroll=…` i `llum=…`, i si piques de mans la mascota s'espanta. Aquesta reacció ja està feta: és l'exemple.

### Pas 4 · Fes la reacció de la foscor

Busca al codi `// TODO reaccio 2`. Copia la idea de la reacció del soroll: **llegeix → compara amb el llindar → reacciona**. Si `llum` és **més petit** que `LLINDAR_FOSCOR`, la mascota passa a `ADORMIT`.

✅ **Comprova:** quan tapes el sensor de llum amb la mà, la mascota s'adorm.

### Pas 5 · Fes la reacció del PIR

Busca `// TODO reaccio 3`. Si `digitalRead(PIN_PIR)` és `HIGH`, algú s'acosta: fes que la mascota saludi, amb l'emoció que hagis triat.

✅ **Comprova:** quan passes la mà per davant del PIR, la mascota reacciona (recorda que tarda 30-60 segons a funcionar en endollar-la).

### Pas 6 · Calibra els llindars

Mira els números del Monitor sèrie amb soroll i sense, i amb llum i tapat. Canvia `LLINDAR_SOROLL` i `LLINDAR_FOSCOR` per un número **entre** els dos que hi veus.

✅ **Comprova:** la mascota reacciona quan toca, i no reacciona sola quan no passa res.

### Pas 7 · Omple el full resum per a la prova

A la Sessió 4 fas la **prova pràctica T1**, i hi pots portar **un full resum en paper** fet per tu. Escriu-hi a mà:

- els pins que has fet servir i a quin sensor van;
- per a què serveixen `digitalRead`, `analogRead`, `map` i un `if` amb llindar, amb un exemple de cadascun;
- com es mesura una distància amb l'ultrasons (la funció `mesuraDistancia()`);
- un error que hagis tingut a la SA3 i com l'has resolt.

✅ **Comprova:** tens el full amb el teu nom i el guardes per a la Sessió 4.

### Pas 8 · Un error, apuntat

✍️ **Apunta-ho:** un error que has trobat i com l'has resolt.

### Pas 9 · Respon i envia

📤 [Obre la tasca «SA3 · Pràctica 4» a Classroom i envia el formulari](https://classroom.google.com/c/ODY4ODU4Njk0NTEy/a/ODk3NDAzNTU3MTY2/details)

Hi trobaràs les mateixes preguntes ✍️ que has anat apuntant. Envia'l ara i, després, fes l'**[🏁 Entrega final de la SA3](../../README.md#entrega-final)**: la defensa d'1 minut i l'autoavaluació.

⭐ **Si acabes abans:** afegeix una 4a reacció (la carícia al polsador o la temperatura amb el DHT11: tens els `// TODO extra` al codi) o prova l'**[alarma d'aparcament](../04_alarma_aparcament/EXPLICACIO.md)**. Més reptes a **[Reptes de la SA3](../../../../Reptes/Reptes_SA3.md)**; quan el docent te'l validi, pinta l'estrella al [tauler de reptes](../../../00_General/00_Tauler_reptes.md).

<details markdown="1">
<summary>🧗 Si t'encalles</summary>

| Què passa | Per què | Com ho arreglo |
|---|---|---|
| No compila: `Adafruit_NeoPixel.h` o `DHT.h` no trobat | Falta la llibreria a l'Arduino IDE. | **Eines → Gestiona les biblioteques**, cerca «Adafruit NeoPixel» i «DHT sensor library» i instal·la-les. |
| La mascota s'espanta tota l'estona | El llindar del soroll és massa baix. | Mira el número `soroll=` en silenci i posa el llindar una mica per sobre. |
| El PIR detecta sempre (o mai) | Encara s'està estabilitzant, o la pota OUT no és al 2. | Espera 1 minut i comprova les lletres del mòdul. |
| No s'adorm mai | El llindar de foscor és massa baix, o el sensor no és a A1. | Mira el número `llum=` tapat i posa el llindar una mica per sobre. |

Tots els detalls del muntatge, les fotos i la caixa són al **[dossier de la mascota](../../../00_General/00_Projecte_T1_Mascota.md)** i a l'**[esquema de connexions, apartat 5](../../SA3_esquemes_connexions.md)**.

</details>

<details markdown="1">
<summary>🧠 Vols saber per què funciona?</summary>

### Com està organitzat l'esquelet

- **`llegeixSensors()`** és on va la teva feina de la SA3: cada reacció **llegeix** un sensor, el **compara** amb un llindar i **decideix** l'emoció. La primera reacció que salta mana (per això hi ha el `return`).
- **`canviaEmocio()`** és on viu la personalitat: els colors dels ulls i del LED RGB i les melodies de cada emoció. Només fa llum i so quan l'emoció **canvia**.
- **`loop()`** només crida `llegeixSensors()` i, si fa estona que no passa res (`TEMPS_CALMA`), torna la mascota a `CONTENT`.

### On ho aplicaràs

- **Prova T1 (Sessió 4):** muntaràs i programaràs tu sol un circuit amb un sensor i un llum, amb el mateix patró llegeix → compara → reacciona.
- **SA4:** els sensors decidiran com es mou el braç robòtic.

</details>
