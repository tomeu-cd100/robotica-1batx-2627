# Pràctica 3 · La pantalla OLED: text, una barra i una cara

<div class="cap-practica" markdown="1">

🎯 **Avui aconseguiràs:** que una pantalla petita mostri un text, una **barra** que creix amb la llum i una **cara** que es posa trista quan és fosc. És la pantalla del teu tamagotchi.

⏱️ 25 min

📦 Pantalla OLED de 0,96" (I²C), el sensor de llum de la Pràctica 2 i 4 cables

</div>

## 🚀 Pas a pas

### Pas 1 · Instal·la la llibreria

A l'Arduino IDE: **Eines → Gestiona les biblioteques**, cerca **U8g2** i prem **Instal·la**.

✅ **Comprova:** a la llista de biblioteques, U8g2 diu «Instal·lada».

### Pas 2 · Munta la pantalla

Deixa muntat el sensor de llum de la Pràctica 2 (punt d'unió a **A1**) i afegeix-hi la pantalla:

| Pin de la pantalla | Pin de l'Arduino |
|---|---|
| VCC | 5 V |
| GND | GND |
| SCL | A5 |
| SDA | A4 |

✅ **Comprova:** has llegit les lletres de la pantalla. En alguns models l'ordre és GND, VCC, SCL, SDA i en d'altres canvia.

### Pas 3 · Carrega el codi

Prem **Copia**, enganxa'l a l'Arduino IDE (esborra el que hi hagués) i prem **→ Puja**.

<!-- codi-complet -->

✅ **Comprova:** a la pantalla surten «Hola!», una cara i una barra a baix.

### Pas 4 · Tapa el sensor de llum

Tapa el sensor amb la mà i destapa'l.

✍️ **Apunta-ho:** què fan la barra i la cara quan tapes el sensor de llum? Per què? (La resposta és al tros 2.)

### Pas 5 · Canvia el text

Busca la línia `pantalla.drawStr(0, 12, "Hola!");`. Posa-hi el **nom** que vols per al teu tamagotchi i prova de canviar el `0` i el `12`.

✅ **Comprova:** el teu text surt a la pantalla, al lloc on l'has posat.

✍️ **Apunta-ho:** quina línia has tocat i què volen dir els números de `drawStr(x, y, text)`?

### Pas 6 · Explica-ho amb les teves paraules

✍️ **Apunta-ho:** quin és el concepte nou més important d'aquesta pràctica?

### Pas 7 · Respon i envia

📤 [Obre la tasca «SA3 · Pràctica 3» a Classroom i envia el formulari](https://classroom.google.com/c/ODY4ODU4Njk0NTEy/a/ODk3NDE0MDkzMjg3/details)

Hi trobaràs les mateixes preguntes ✍️ que has anat apuntant. Envia'l ara i passa a la **[Pràctica 4 · El teu tamagotchi](../05_mascota/EXPLICACIO.md)**. Deixa la pantalla muntada: la faràs servir.

⭐ **Si acabes abans:** dibuixa una segona barra amb el valor del potenciòmetre (A0) o fes que la cara somrigui més com més llum hi ha. Més reptes a **[Reptes de la SA3](../../../../Reptes/Reptes_SA3.md)**; quan el docent te'l validi, pinta l'estrella al [tauler de reptes](../../../00_General/00_Tauler_reptes.md).

<details markdown="1">
<summary>🧗 Si t'encalles</summary>

| Què passa | Per què | Com ho arreglo |
|---|---|---|
| No compila: `U8g2lib.h` no trobat | Falta la llibreria. | Torna al pas 1. |
| La pantalla no s'encén | SDA i SCL intercanviats, o VCC i GND al revés. | Mira les lletres de la pantalla i la taula del pas 2. |
| La pantalla està negra però abans funcionava | Un cable fa mal contacte. | Prem bé els 4 cables a la protoboard. |
| La barra no canvia mai | El sensor de llum no és a A1, o falta la resistència de 10 kΩ. | Revisa el muntatge de la [Pràctica 2](../02_potenciometre_ldr/EXPLICACIO.md). |

</details>

<details markdown="1">
<summary>🧠 Vols saber per què funciona?</summary>

### Tros 1 — La pantalla és una quadrícula de punts

La pantalla té **128 punts d'ample i 64 d'alt** (píxels). Cada punt es diu per la seva posició: **x** cap a la dreta (de 0 a 127) i **y** cap avall (de 0 a 63). El punt (0, 0) és a dalt a l'esquerra.

```cpp
pantalla.drawStr(0, 12, "Hola!");   // text: x = 0, y = 12 (linia de base)
pantalla.drawCircle(64, 34, 14);    // cercle: centre (64, 34), radi 14
pantalla.drawBox(14, 54, amplada, 8);  // rectangle ple
```

### Tros 2 — La barra i la cara depenen de la llum

```cpp
int llum = analogRead(SENSOR_LLUM);        // 0 ... 1023
int amplada = map(llum, 0, 1023, 0, 100);  // 0 ... 100 punts
```

És el `map()` de la Pràctica 2: converteix la lectura del sensor (0-1023) en l'amplada de la barra (0-100 punts). Si tapes el sensor, la lectura baixa, la barra s'escurça i, quan l'amplada és 30 o menys, l'`if` dibuixa la boca trista.

### Tros 3 — Dibuixar a trossos: `firstPage` i `nextPage`

**Com a la vida real:** pintar una paret gran amb un pinzell petit, franja a franja.

```cpp
pantalla.firstPage();
do {
  // ... tot el que es dibuixa ...
} while (pantalla.nextPage());
```

L'Arduino UNO només té **2 KB de memòria**, i la pantalla sencera n'ocuparia 1 KB. Per això la llibreria la dibuixa **a trossos** (pàgines): repeteix el que hi ha dins del `do { }` una vegada per a cada tros. Per això **tot** el que vols que surti ha d'anar dins del `do { }`.

### On ho aplicaràs

- **Ara mateix:** el teu **tamagotchi** fa servir aquestes mateixes instruccions per dibuixar la cara i les barres de les necessitats.

</details>
