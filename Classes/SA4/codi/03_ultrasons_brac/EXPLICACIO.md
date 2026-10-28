# Pràctica 3 · Del sensor al moviment: l'ultrasons mou el braç

**Quan es fa:** Sessió 3 (modelatge) · **Fitxer:** `03_ultrasons_brac.ino` · **Circuit:** [esquema de connexions](../../SA4_esquemes_connexions.md) (servo base=9, servo pinça=11 amb piles; ultrasons TRIG=7, ECHO=8)

> ✍️ **Kata primer!** No llegeixis encara el codi: obre el [kata d'aquesta pràctica](../../SA4_katas.md) i tens **10 minuts** per escriure el teu bloc (individual, apunts permesos). Després torna aquí i **compara**.

## 🎯 Per què fem aquesta pràctica

Fins ara el braç feia el que li manaves amb la mà (el potenciòmetre). Avui fa
el primer pas cap a un robot de debò: **decideix ell sol** a partir del que
percep. A la taula hi ha l'**estació de recollida**, el lloc on deixes els
objectes que el braç ha d'agafar, i un ultrasons que la vigila. Quan hi poses
un objecte, el braç **s'hi gira i obre la pinça** per rebre'l. Quan el treus,
torna a repòs.

És la cadena **percepció → decisió → acció** que fan servir tots els robots
industrials: un sensor detecta la peça a la cinta i el braç la va a buscar.
L'ultrasons ja el coneixes de la SA3, i la funció `mesuraDistancia()` és la
mateixa que vas escriure allà: avui la reaprofites per moure el teu braç.

## 🔮 Abans d'executar: prediu

Mira només el `loop()`: què farà el braç si poses la mà a **10 cm** de
l'ultrasons? I a **30 cm**? I si la poses i la treus molt de pressa, a
quina velocitat creus que reaccionarà el braç? Apunta-ho a l'Activitat 3 de
la [fitxa](../../SA4_fitxa_alumnat.md).

## 🧠 El codi, per blocs

### Bloc 1 — Les constants de disseny

```cpp
const int TRIG = 7;
const int ECHO = 8;

const int DIST_OBJECTE = 15;     // cm: mes a prop = hi ha un objecte
const int BASE_REPOS = 90;       // angle de la base mirant endavant
const int BASE_ESTACIO = 45;     // angle de la base mirant l'estacio
const int PINCA_TANCADA = 60;
const int PINCA_OBERTA = 120;
```

Abans de cuinar, el cuiner deixa a punt els ingredients mesurats al marbre.
Aquí, igual: cada número que decideix com es comporta el braç té **nom propi**
a dalt de tot. Si l'estació és més a la dreta, canvies `BASE_ESTACIO` i prou;
no has de buscar el `45` enmig del codi.

Fixa't en els pins: a la SA3 l'ultrasons anava als pins 12 i 11, però ara el
**D11 és el servo de la pinça**. Al braç, l'ultrasons passa al **D7/D8**
(mapa de pins al [dossier](../../../00_General/00_Projecte_T2_Brac.md#cablatge)).

### Bloc 2 — Mesurar (la funció de la SA3)

```cpp
float mesuraDistancia() {
  digitalWrite(TRIG, LOW);
  delayMicroseconds(2);
  digitalWrite(TRIG, HIGH);     // pols de 10 us
  delayMicroseconds(10);
  digitalWrite(TRIG, LOW);

  long temps = pulseIn(ECHO, HIGH, 30000);  // timeout 30 ms
  if (temps == 0) return 400;               // sense eco: res a la vista
  return temps * 0.034 / 2.0;               // cm
}
```

Un ratpenat crida i escolta quant triga a tornar l'eco. L'ultrasons fa el
mateix: un pols de 10 µs al `TRIG`, i `pulseIn()` mesura quant dura el retorn
a l'`ECHO`. El so fa 0,034 cm per microsegon i va i torna, d'aquí el `/ 2`.
El `timeout` de 30 ms evita que el programa es quedi esperant si no hi ha
eco: llavors la funció diu «400 cm», que vol dir *res a la vista*.

### Bloc 3 — Decidir i actuar

```cpp
void loop() {
  float d = mesuraDistancia();
  Serial.println(d);              // mira-ho al Serial Plotter

  if (d < DIST_OBJECTE) {
    base.write(BASE_ESTACIO);
    pinca.write(PINCA_OBERTA);
  } else {
    base.write(BASE_REPOS);
    pinca.write(PINCA_TANCADA);
  }

  delay(100);                     // ~10 mesures per segon
}
```

Un sensor, una pregunta (`d < DIST_OBJECTE`?), dues respostes. És un
**control tot o res**: o objecte o no-objecte, sense terme mig. Obre el
**Serial Plotter** mentre hi acostes la mà: veuràs la distància baixant i el
moment exacte en què el braç decideix girar-se.

> 🔭 **Fixa-t'hi:** què passa si l'objecte queda **just a 15 cm**? El braç fa
> un ball: gira, torna, gira… Les mesures sempre tenen una mica de soroll.
> Aquest problema té nom i solució, i el resoldràs a la SA6 amb la
> **histèresi** de la pinça automàtica.

## ⚠️ Errors que veuràs segur

| Símptoma | Causa probable |
|---|---|
| La distància sempre val 400 | TRIG i ECHO intercanviats, o l'ultrasons sense 5V. |
| La distància sempre val 0 o salta a l'atzar | L'ECHO no és al D8, o el GND de l'ultrasons no és comú amb l'Arduino. |
| El braç tremola quan es mou | Servos alimentats des de l'USB: han d'anar a les **piles**, amb GND comú. |
| El braç «balla» amb l'objecte a prop del llindar | Soroll de la mesura just al llindar: ho arreglaràs amb histèresi a la SA6. Mentrestant, allunya o acosta l'objecte. |

## 🔗 On ho aplicaràs

- **Repte de la S3:** que l'obertura de la pinça sigui **proporcional** a la distància amb `map()` (com més a prop, més oberta) i una **guarda de seguretat**: si l'objecte és a menys de 3 cm, el braç no es mou.
- **A la SA6:** la [pinça automàtica amb histèresi](../../../SA6/codi/02_pinca_histeresi/EXPLICACIO.md) és aquest mateix muntatge amb dos llindars en lloc d'un.
- **Al braç:** l'ultrasons es queda muntat a l'estació de recollida tot el trimestre ([dossier](../../../00_General/00_Projecte_T2_Brac.md)).

> ⭐ **Has acabat abans?** Prova la [bastida de `millis()`](../05_dos_servos_millis/EXPLICACIO.md) o tria un repte a **[Reptes de la SA4](../../../../Reptes/Reptes_SA4.md)** i, quan el docent te'l validi, pinta l'estrella al [tauler de reptes](../../../00_General/00_Tauler_reptes.md).
