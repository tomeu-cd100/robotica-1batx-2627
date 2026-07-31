# Pràctica 5 · Producte: el panell de senyalització

**Quan es fa:** Sessió 4 (producte de la SA) · **Fitxer:** `05_panell_senyalitzacio.ino` · **Circuit:** [esquema de connexions](../../SA2_esquemes_connexions.md) (RGB 9-10-11, piezo 6, relé 7)

## 🎯 Per què fem aquesta pràctica

Aquí **no hi ha cap concepte nou** — i això és el que la fa important. El producte de la SA és una **integració**: tot el que has après per separat (sortides digitals, PWM, funcions pròpies) treballant junt en un sistema amb sentit: un panell que comunica **estats** (tot correcte / avís / alarma) amb color, so i una càrrega real commutada per relé.

Pensa-ho com un semàfor industrial: la caldera va bé (verd), s'escalfa (groc + bip), s'ha passat de temperatura (vermell + alarma + activar el ventilador). Aquest sketch és la teva **base**: el que s'avalua (R1 codi + R2 circuit) és com el **personalitzes** — els teus estats, colors, sons i seqüència, documentats a la taula de l'Activitat 4 de la [fitxa](../../SA2_fitxa_alumnat.md).

## 🔮 Abans de tocar res: llegeix

Aquest cop no prediràs el comportament (és una demo cíclica), sinó **l'estructura**: quantes funcions hi ha? Qui crida qui? Si volguessis afegir un quart estat («manteniment», blau), **quines línies** hauries d'afegir i on?

## 🧠 El codi, per blocs

### Bloc 1 — El maquinari, amb nom

```cpp
const int R = 9, G = 10, B = 11;   // LED RGB
const int PIEZO = 6;               // brunzidor
const int RELE = 7;                // mòdul rele (carrega de baixa tensio)
```

Tres actuadors diferents en un sol sistema. El relé és la novetat de maquinari: un interruptor controlat pel pin 7 que pot commutar una càrrega externa (aquí, de baixa tensió).

### Bloc 2 — `color()`, reutilitzada

```cpp
void color(int r, int g, int b) {
  analogWrite(R, r);
  analogWrite(G, g);
  analogWrite(B, b);
}
```

Idèntica a la de la [Pràctica 4](../04_rgb/04_rgb.ino). Les funcions bones es reutilitzen tal qual: escriure-la bé ahir t'estalvia feina avui.

### Bloc 3 — Una funció per estat (el patró clau)

```cpp
void estatAvis() {
  color(255, 180, 0);        // groc
  tone(PIEZO, 1000, 150);    // bip curt (1 kHz, 150 ms)
  digitalWrite(RELE, LOW);
}
```

Aquest és el patró que ho ordena tot: **cada estat del sistema és una funció amb nom** (`estatCorrecte()`, `estatAvis()`, `estatAlarma()`), i dins seu es defineix **tot** el que aquell estat significa — color, so i relé. Per canviar què fa l'avís, vas a un sol lloc. Per afegir un estat, escrius una funció nova. Compara-ho amb tenir 15 línies barrejades al `loop()`.

Novetat de codi: `tone(pin, freqüència, durada)` fa sonar el piezo (1000 Hz aguts, 2000 Hz més aguts) i `noTone(pin)` el calla.

### Bloc 4 — El `loop()`: demo avui, sensors demà

```cpp
void loop() {
  // Demostracio ciclica dels tres estats (en el projecte real,
  // l'estat es decidira a partir de sensors - vegeu SA3).
  estatCorrecte();  delay(2000);
  estatAvis();      delay(2000);
  estatAlarma();    delay(2000);
}
```

Amb les funcions fetes, el `loop()` es llegeix sol. I fixa't en el comentari: aquí els estats roden en bucle per demostrar-los, però el panell «de debò» decidiria l'estat **llegint sensors** — exactament el que aprendràs a la **SA3**. El teu codi ja està preparat per a aquell pas: només caldrà canviar qui crida les funcions.

## ⚠️ Errors que veuràs segur

| Símptoma | Causa probable |
|---|---|
| El relé no commuta | Alimentació del mòdul insuficient o pin de senyal mal connectat. |
| El piezo no sona | Polaritat del piezo o pin equivocat; recorda que `tone` amb durada s'atura sol. |
| Colors del RGB estranys | Càtode/ànode comú confós (vegeu la Pràctica 4). |

## 🔗 On ho aplicaràs

- **Avui mateix:** personalitza estats, colors i sons; omple la taula de la fitxa i prepara la **defensa d'1 minut** (què fa el panell + una millora possible).
- **SA3:** el teu panell aprendrà a **percebre**: l'estat el decidirà un sensor, no el `delay`.

> ⭐ **Has acabat abans?** Tria un repte a **[Reptes de la SA2](../../../../Reptes/Reptes_SA2.md)** i, quan el docent te'l validi, pinta l'estrella al [tauler de reptes](../../../00_General/00_Tauler_reptes.md).
