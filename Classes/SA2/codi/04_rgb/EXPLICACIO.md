# Pràctica 4 · LED RGB: barrejar colors (i la primera funció pròpia)

**Quan es fa:** Sessió 3 (després del *fade*) · **Fitxer:** `04_rgb.ino` · **Circuit:** [esquema de connexions](../../SA2_esquemes_connexions.md) (R=9, G=10, B=11, càtode comú a GND)

> ✍️ **Kata primer!** No llegeixis encara el codi: obre el [kata d'aquesta pràctica](../../SA2_katas.md) i tens **10 minuts** per escriure el teu bloc (individual, apunts permesos). Després torna aquí i **compara**.

## 🎯 Per què fem aquesta pràctica

Un LED RGB són **tres LED en un** (vermell, verd i blau) que comparteixen una pota. Si controles cadascun amb PWM (0–255), pots barrejar qualsevol color: és exactament com fan color els píxels de la teva pantalla (barreja **additiva** de llum).

Però la segona meitat de la pràctica és tan important com la primera: per no escriure tres `analogWrite` cada vegada que vols un color, el codi defineix la **primera funció pròpia amb paràmetres** del curs, `color(r, g, b)`. Escriure una vegada i cridar mil: això és la **modularitat**, i és el múscul que farà llegible el producte de la S4.

## 🔮 Abans d'executar: prediu

Repassa el `loop()`: quina seqüència de colors veuràs? I la línia `color(128, 0, 128);` — si 255 és el màxim, **quin color i quina intensitat** esperes del valor 128?

## 🧠 El codi, per blocs

### Bloc 1 — Tres pins PWM, un per canal

```cpp
const int R = 9;
const int G = 10;
const int B = 11;
```

Els tres han de ser pins `~` (PWM), perquè graduarem cada color de 0 a 255.

### Bloc 2 — La funció pròpia: `color(r, g, b)`

```cpp
// Funcio propia per fixar un color (modularitat)
void color(int r, int g, int b) {
  analogWrite(R, r);
  analogWrite(G, g);
  analogWrite(B, b);
}
```

Fins avui només havies **usat** funcions d'altri (`digitalWrite`, `delay`…). Aquesta la **defineixes tu**:

- `void` — no retorna cap valor, només fa feina.
- `color` — el nom que tu tries.
- `(int r, int g, int b)` — els **paràmetres**: tres números que li passes en cridar-la.

Quan al `loop()` escrius `color(255, 0, 0)`, els valors viatgen als paràmetres (`r=255, g=0, b=0`) i la funció executa els tres `analogWrite`. Una línia en lloc de tres, i amb un nom que **diu què fa**.

### Bloc 3 — La paleta al `loop()`

```cpp
color(255, 0, 0);   delay(1000);   // vermell
color(0, 255, 0);   delay(1000);   // verd
color(0, 0, 255);   delay(1000);   // blau
color(255, 255, 0); delay(1000);   // groc (R+G)
color(128, 0, 128); delay(1000);   // lila
color(0, 0, 0);     delay(1000);   // apagat
```

Les tres primeres línies són els colors purs. Les interessants són les altres: **groc** = vermell + verd a tope (barreja additiva: llum + llum = més llum, no com les pintures), i **lila** = vermell i blau a mitja intensitat (128). Cada color és una recepta de tres números.

## ⚠️ Errors que veuràs segur

| Símptoma | Causa probable |
|---|---|
| Colors «al revés» (el vermell surt cian…) | El teu LED és d'**ànode comú**: el comú va a 5 V i els valors s'inverteixen (255 − valor). Comprova quin tipus tens a l'esquema. |
| Un canal no funciona mai | Pin equivocat o la resistència d'aquell canal fa mal contacte. |
| Colors apagats o estranys | Algun canal en pin sense `~` (no gradua). |

## 🔗 On ho aplicaràs

- **Repte S3:** 5 colors propis (apunta les receptes R,G,B a la fitxa) i una transició suau entre dos colors.
- **S4:** el [panell de senyalització](../05_panell_senyalitzacio/05_panell_senyalitzacio.ino) reutilitza `color()` tal qual — i hi afegeix una funció per a cada **estat**.
- **Mascota del trimestre:** aquests colors i animacions seran les **expressions** del teu robot.

> ⭐ **Has acabat abans?** Tria un repte a **[Reptes de la SA2](../../../../Reptes/Reptes_SA2.md)** i, quan el docent te'l validi, pinta l'estrella al [tauler de reptes](../../../00_General/00_Tauler_reptes.md).
