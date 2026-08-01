# Pràctica 1 · LED bàsic: constants i variables

**Quan es fa:** Sessió 1 (modelatge) · **Fitxer:** `01_led_basic.ino` · **Circuit:** [esquema de connexions](../../SA2_esquemes_connexions.md)

> ✍️ **Kata primer!** No llegeixis encara el codi: obre el [kata d'aquesta pràctica](../../SA2_katas.md) i tens **10 minuts** per escriure el teu bloc (individual, apunts permesos). Després torna aquí i **compara**.

## 🎯 Per què fem aquesta pràctica

A la SA1 vas fer parpellejar el LED de la placa amb `Blink`. Aquí fas el mateix… però **bé**: amb un LED extern al pin 8 i, sobretot, amb el codi escrit perquè es pugui **canviar sense por**.

La pregunta que ho justifica tot: *si demà moc el LED al pin 7, quantes línies he de canviar?* Amb el número `8` escampat pel codi, n'hauries de canviar unes quantes (i te'n deixaries alguna). Amb una **constant**, només una. Aquesta idea —donar **nom** als valors— la faràs servir a cada programa del curs.

## 🔮 Abans d'executar: prediu

Mira el codi complet (a baix de tot, plegat) **sense carregar-lo**. Què farà el LED? Cada quant s'encendrà? Escriu la predicció a l'Activitat 1 de la [fitxa](../../SA2_fitxa_alumnat.md) i després comprova-la.

## 🧠 El codi, per blocs

### Bloc 1 — Donar nom als valors

```cpp
const int LED = 8;     // pin del LED (constant)
int temps = 500;       // temps en ms (variable: la pots canviar)
```

Dues maneres de guardar un número, amb intencions diferents:

- `const int LED = 8;` — una **constant**: el pin no canviarà mentre el programa funciona. El `const` és una promesa; si intentes canviar-la, l'Arduino IDE et donarà error (i això és bo: t'avisa d'un despiste).
- `int temps = 500;` — una **variable**: un valor que **vols** poder canviar (aquí, la velocitat del parpelleig). Prova 100, prova 2000: una sola línia.

### Bloc 2 — Configurar la sortida

```cpp
void setup() {
  pinMode(LED, OUTPUT);
}
```

`setup()` s'executa **un sol cop** en engegar. `pinMode(LED, OUTPUT)` diu a la placa que el pin 8 serà una **sortida** (hi enviarem corrent). Si te'l deixes, `digitalWrite` no farà res visible: és l'error més típic de la sessió.

### Bloc 3 — El cicle infinit

```cpp
void loop() {
  digitalWrite(LED, HIGH);
  delay(temps);
  digitalWrite(LED, LOW);
  delay(temps);
}
```

`loop()` es repeteix per sempre: encén (`HIGH` = 5 V), espera, apaga (`LOW` = 0 V), espera, i torna a començar. Fixa't que el temps d'espera és la **variable** `temps`: el parpelleig sencer es governa des d'una sola línia del Bloc 1.

## ⚠️ Errors que veuràs segur

| Símptoma | Causa probable |
|---|---|
| El LED no fa res | Falta `pinMode(LED, OUTPUT)` al `setup()`, o el LED és en un altre pin. |
| El LED no s'encén mai | Polaritat invertida (pota llarga = ànode, cap al pin) o falta la resistència de 220 Ω. |

## 🔗 On ho aplicaràs

- **Ara mateix:** el repte de la S1 (parpelleig amb temps propis i patró Morse d'una lletra) és aquest sketch amb valors teus.
- **Tota la SA:** el [semàfor](../02_semafor/02_semafor.ino) fa servir constants per als 3 pins i per als temps de cada fase — la mateixa idea, multiplicada.

> ⭐ **Has acabat abans?** Tria un repte a **[Reptes de la SA2](../../../../Reptes/Reptes_SA2.md)** i, quan el docent te'l validi, pinta l'estrella al [tauler de reptes](../../../00_General/00_Tauler_reptes.md).
