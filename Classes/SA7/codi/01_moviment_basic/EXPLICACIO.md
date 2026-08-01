# Pràctica 1 · Moviment bàsic: funcions per moure el rover

**Quan es fa:** Sessió 1 (modelatge) · **Fitxer:** `01_moviment_basic.ino` · **Circuit:** [esquema de connexions](../../SA7_esquemes_connexions.md)

> ✍️ **Kata primer!** No llegeixis encara el codi: obre el [kata d'aquesta pràctica](../../SA7_katas.md) i tens **10 minuts** per escriure el teu bloc (individual, apunts permesos). Després torna aquí i **compara**.

## 🎯 Per què fem aquesta pràctica

El teu rover no té volant. Com gira, doncs? Amb **cinemàtica diferencial**: cada roda té el seu motor, i el que decideix la trajectòria és la **diferència** entre elles. Dues rodes a la mateixa velocitat = recte; velocitats o sentits diferents = gir. Tota la robòtica mòbil de la SA7 (i el rover del trimestre) penja d'aquesta idea.

L'altra idea de la sessió és de programació: en lloc d'escampar `digitalWrite` i `analogWrite` pel `loop()`, empaquetes cada moviment en una **funció amb nom** (`endavant()`, `gira_dreta()`…). A partir d'avui, programar el robot serà **combinar aquestes crides**, no tornar a escriure pins cada vegada.

⚙️ **Abans de res:** ajusta el bloc `// === PINS (AJUSTAR) ===` amb els pins reals del teu robot (taula de cablatge del [dossier del rover](../../../00_General/00_Projecte_T3_Rover.md); si uses la 3dBot de reserva, el manual de la placa). Sense això, cap sketch de la SA no mou res.

## 🔮 Abans d'executar: prediu

Mira el codi complet (a baix de tot, plegat) **sense carregar-lo**. Què farà `gira_dreta()` amb cada roda? Quina seqüència repetirà el robot al `loop()`, i cada quant? Escriu la predicció a l'Activitat 1 de la [fitxa](../../SA7_fitxa_alumnat.md) i després comprova-la.

## 🧠 El codi, per blocs

### Bloc 1 — Els pins i la velocitat, amb nom

```cpp
const int ESQ_DIR = 4;    // direccio motor esquerre   <-- AJUSTAR
const int ESQ_VEL = 5;    // velocitat (PWM) esquerre  <-- AJUSTAR
const int DRET_DIR = 7;   // direccio motor dret       <-- AJUSTAR
const int DRET_VEL = 6;   // velocitat (PWM) dret      <-- AJUSTAR

const int VEL = 180;      // velocitat per defecte (0-255)
```

Cada motor necessita **dos pins**: un de **direcció** (endavant o enrere, `digitalWrite`) i un de **velocitat** (com de ràpid, `analogWrite` — per això ha de ser un pin PWM `~`, com el fade de la SA2). `VEL` és la velocitat de creuer: si el robot va massa embalat per a la teva pista, la canvies en una sola línia.

### Bloc 2 — `motors()`: una funció que ho governa tot

```cpp
void motors(int dirEsq, int velEsq, int dirDret, int velDret) {
  digitalWrite(ESQ_DIR, dirEsq);
  analogWrite(ESQ_VEL, velEsq);
  digitalWrite(DRET_DIR, dirDret);
  analogWrite(DRET_VEL, velDret);
}
```

Tot el control del robot passa per aquí: direcció i velocitat de cada roda, en una sola crida. És l'única funció que toca pins; les altres només decideixen **quins valors** passar-li. Si algun dia canvies de xassís o de driver de motors, només reescrius aquesta.

### Bloc 3 — El vocabulari de moviments

```cpp
void endavant()      { motors(HIGH, VEL, HIGH, VEL); }
void enrere()        { motors(LOW,  VEL, LOW,  VEL); }
void gira_dreta()    { motors(HIGH, VEL, LOW,  VEL); }   // esq endavant, dret enrere
void gira_esquerra() { motors(LOW,  VEL, HIGH, VEL); }
void atura()         { analogWrite(ESQ_VEL, 0); analogWrite(DRET_VEL, 0); }
```

Aquí hi ha la cinemàtica diferencial feta codi. Llegeix `gira_dreta()`: roda esquerra **endavant**, roda dreta **enrere** → el robot pivota sobre si mateix cap a la dreta. I `atura()` no toca la direcció: posa les dues velocitats a **0** i prou. Aquestes cinc funcions són el **vocabulari** amb què escriuràs totes les trajectòries i comportaments de la SA.

### Bloc 4 — Una seqüència de prova

```cpp
void loop() {
  endavant();      delay(1500);
  atura();         delay(500);
  gira_dreta();    delay(600);
  atura();         delay(500);
}
```

Fixa't en el patró: una funció de moviment **engega** els motors i el `delay` decideix **quanta estona** duren. `endavant()` no fa avançar el robot 1,5 segons: el posa en marxa, i és el `delay(1500)` qui el deixa córrer. Aquest matís és clau per a la Pràctica 2.

## ⚠️ Errors que veuràs segur

| Símptoma | Causa probable |
|---|---|
| El robot no es mou gens | Pins del bloc `AJUSTAR` que no són els reals, o bateria descarregada (l'USB sol no alimenta els motors). |
| No va recte: es desvia sempre cap a un costat | Motors desiguals (cap robot real és perfecte). Compensa: abaixa una mica la `VEL` de la roda ràpida dins `endavant()`. |
| Un moviment surt al revés (endavant recula, o gira cap a l'altre costat) | Cablatge del motor invertit o `HIGH`/`LOW` de direcció al revés per a la teva placa: intercanvia'ls a `motors()` o al cable. |

## 🔗 On ho aplicaràs

- **Ara mateix:** el repte de la S1 (seqüència de «ball») és combinar aquestes cinc funcions amb els teus temps.
- **Tota la SA:** el [quadrat](../02_trajectoria_quadrat/02_trajectoria_quadrat.ino) (S2), l'[evita-obstacles](../03_evita_obstacles/03_evita_obstacles.ino) (S3) i el [seguidor de línia](../04_seguidor_linia/04_seguidor_linia.ino) (S4) reutilitzen aquestes mateixes funcions: només canvia **qui decideix** quan cridar-les.
- **Robot del trimestre:** aquest sketch és la base de moviment del teu **rover** ([dossier](../../../00_General/00_Projecte_T3_Rover.md)).

> ⭐ **Has acabat abans?** Tria un repte a **[Reptes de la SA7](../../../../Reptes/Reptes_SA7.md)** i, quan el docent te'l validi, pinta l'estrella al [tauler de reptes](../../../00_General/00_Tauler_reptes.md).
