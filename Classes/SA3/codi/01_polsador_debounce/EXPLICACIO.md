# Pràctica 1 · El polsador: INPUT_PULLUP i antirebot

**Quan es fa:** Sessió 1 (modelatge) · **Fitxer:** `01_polsador_debounce.ino` · **Circuit:** [esquema de connexions](../../SA3_esquemes_connexions.md) (polsador=2, LED=8)

> ✍️ **Kata primer!** No llegeixis encara el codi: el docent projecta el kata d'aquesta pràctica i tens **10 minuts** per escriure el teu bloc (apunts permesos). Després torna aquí i **compara**.

## 🎯 Per què fem aquesta pràctica

Fins ara el sistema només **feia** coses: encenia LEDs, tocava sons. Avui, per primer cop, **percep**: llegeix un polsador i reacciona. És el primer pas del patró que governarà tota la SA (i tot robot): *llegir una entrada → decidir → actuar*.

I hi ha una sorpresa que cal entendre bé: amb `INPUT_PULLUP`, el pin està com **"agafat" a HIGH** per una resistència interna, i prémer el polsador **l'estira cap a LOW**. O sigui: en repòs llegeix HIGH i en prémer llegeix LOW — **lògica invertida**. També descobriràs que un polsador real "rebota": una sola premuda pot generar diversos senyals en mil·lisegons, i cal un **antirebot** (*debounce*) per no comptar-la diverses vegades.

## 🔮 Abans d'executar: prediu

Mira el codi complet (a baix de tot, plegat) **sense carregar-lo**. Què mostrarà el Monitor sèrie quan premis el polsador? I la pregunta clau: *per què, sense antirebot, una sola premuda en compta diverses?* Escriu la predicció a l'Activitat 1 de la [fitxa](../../SA3_fitxa_alumnat.md) i després comprova-la.

## 🧠 El codi, per blocs

### Bloc 1 — Constants i variables d'estat

```cpp
const int POLSADOR = 2;
const int LED = 8;

int comptador = 0;
int estatAnterior = HIGH;          // en repos esta a HIGH
unsigned long ultimCanvi = 0;
const unsigned long ANTIREBOT = 40;  // ms
```

A més de les constants de pins (SA2), hi ha tres variables que fan **memòria** entre voltes de `loop()`: quantes premudes portem (`comptador`), com estava el pin l'última vegada (`estatAnterior`, que comença a `HIGH` perquè en repòs el pin llegeix HIGH) i **quan** va ser l'últim canvi (`ultimCanvi`). `ANTIREBOT` són els 40 ms durant els quals ignorarem "rebots" del contacte metàl·lic.

### Bloc 2 — Configurar l'entrada (i el canal sèrie)

```cpp
void setup() {
  pinMode(POLSADOR, INPUT_PULLUP);
  pinMode(LED, OUTPUT);
  Serial.begin(9600);
}
```

Dues novetats:

- `INPUT_PULLUP` activa la **resistència interna** de l'Arduino que manté el pin a HIGH. Gràcies a això el polsador es connecta amb només **dos cables** (pin 2 i GND), sense resistència externa. El peatge és la lògica invertida: **HIGH = no premut, LOW = premut**.
- `Serial.begin(9600)` obre el **canal sèrie** cap a l'ordinador a 9600 bauds. A partir d'ara és la teva finestra per veure què passa dins la placa (Eines > Monitor sèrie, amb el mateix 9600 seleccionat).

### Bloc 3 — Detectar la premuda amb antirebot

```cpp
void loop() {
  int estat = digitalRead(POLSADOR);

  // Detecta el canvi HIGH -> LOW (premuda) amb antirebot
  if (estat != estatAnterior && (millis() - ultimCanvi) > ANTIREBOT) {
```

`digitalRead` llegeix l'estat del pin (HIGH o LOW). La condició de l'`if` demana **dues coses alhora** (`&&`): que l'estat **hagi canviat** respecte de l'última volta, i que hagin passat **més de 40 ms** des de l'últim canvi. Aquesta segona part és l'antirebot: els rebots del contacte arriben en pocs mil·lisegons, i així queden ignorats.

### Bloc 4 — Comptar i fer el toggle

```cpp
    ultimCanvi = millis();
    if (estat == LOW) {            // s'acaba de premer
      comptador++;
      Serial.print("Premudes: ");
      Serial.println(comptador);
      digitalWrite(LED, !digitalRead(LED));  // mode toggle del LED
    }
    estatAnterior = estat;
```

Dins del canvi vàlid, encara filtrem: només ens interessa el pas a `LOW` (la **premuda**; el pas a HIGH és deixar anar). Llavors sumem 1 al comptador, l'escrivim pel Monitor i fem el truc del **toggle**: `!digitalRead(LED)` llegeix com està el LED i escriu el contrari — cada premuda l'encén o l'apaga. Al final, recordem l'estat per a la volta següent.

## ⚠️ Errors que veuràs segur

| Símptoma | Causa probable |
|---|---|
| "Està al revés! Marca HIGH sense tocar res" | No és un error: amb `INPUT_PULLUP` el repòs és **HIGH** i prémer és **LOW** (lògica invertida). |
| Una premuda en compta 2 o 3 | Antirebot massa curt (o inexistent, si l'has tret): els rebots del contacte es compten com a premudes. |
| El polsador no fa res | Polsador mal punxat a la protoboard (les potes van de dos en dos!) o cable a un pin equivocat. |
| El Monitor mostra símbols estranys o res | El *baud* del Monitor no coincideix amb el `Serial.begin(9600)` — selecciona 9600 a baix a la dreta. |

## 🔗 On ho aplicaràs

- **Repte de la S1:** el mode *toggle* ja el tens aquí — el repte és entendre'l i estendre'l: **comptar fins a 5 i reiniciar** el comptador.
- **Tota la SA:** el **Monitor sèrie** que has obert avui és l'eina de calibratge de la [pràctica 2](../02_potenciometre_ldr/EXPLICACIO.md) i la **E** (*Examina*) de la rutina DEPURA.

> ⭐ **Has acabat abans?** Tria un repte a **[Reptes de la SA3](../../../../Reptes/Reptes_SA3.md)** i, quan el docent te'l validi, pinta l'estrella al [tauler de reptes](../../../00_General/00_Tauler_reptes.md).
