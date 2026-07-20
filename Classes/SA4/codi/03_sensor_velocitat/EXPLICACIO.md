# Pràctica 3 · Del sensor al moviment: percepció → acció

**Quan es fa:** Sessió 3 (modelatge) · **Fitxer:** `03_sensor_velocitat.ino` · **Circuit:** [esquema de connexions](../../SA4_esquemes_connexions.md) (pont H com a la Pràctica 2 + HC-SR04 TRIG=12, ECHO=11)

## 🎯 Per què fem aquesta pràctica

Fins avui, sensors i actuadors anaven per separat: a la SA3 **llegies** el món, a les dues primeres sessions d'aquesta SA **movies** coses. Aquesta pràctica els connecta: *com fa un robot per frenar quan s'acosta a una paret?* La resposta és el bucle **percepció → acció**: mesura la distància, converteix-la en velocitat, aplica-la al motor. I torna a començar, moltes vegades per segon.

Fixa't en com ho fa: el programa **pregunta** al sensor a cada volta de `loop()` (cada ~50 ms). D'això se'n diu **polling** (sondeig): no esperes que el món t'avisi, vas mirant tu. És l'estratègia més senzilla i la que farás servir tot el curs.

Aquest patró és la llavor del **control** (SA6) i de la **robòtica mòbil** (SA7): un robot no és res més que aquest bucle repetit amb més sensors i més motors.

## 🔮 Abans d'executar: prediu

Sense carregar-lo: si acostes la mà al sensor **a poc a poc**, què farà el motor? I quan siguis a **menys de 10 cm**? I si **tapes el sensor del tot** o el desconnectes — el motor s'aturarà o correrà? (Pista: mira què retorna `mesuraDistancia()` quan no hi ha eco.) Apunta-ho a l'Activitat 3 de la [fitxa](../../SA4_fitxa_alumnat.md).

## 🧠 El codi, per blocs

### Bloc 1 — Una funció que retorna un valor

```cpp
float mesuraDistancia() {
  digitalWrite(TRIG, LOW);  delayMicroseconds(2);
  digitalWrite(TRIG, HIGH); delayMicroseconds(10);
  digitalWrite(TRIG, LOW);
  long t = pulseIn(ECHO, HIGH, 30000);  // timeout 30 ms
  if (t == 0) return 400;               // sense eco: fora de rang (no frena per error)
  return t * 0.034 / 2.0;
}
```

A la Pràctica 2 les funcions **feien** coses (`endavant`); aquesta a més **retorna** un resultat: el `float` (número amb decimals) de la distància en cm. Per això comença amb `float` i no amb `void`, i acaba amb `return`.

Dos detalls d'enginyer que val la pena copiar:

- `pulseIn(..., 30000)` té un **timeout**: si en 30 ms no arriba eco, plega i retorna 0 en lloc de quedar-se penjat esperant.
- `if (t == 0) return 400;` — sense eco, la funció **menteix a favor de la seguretat del comportament**: diu "400 cm, via lliure" perquè un sensor desconnectat no deixi el motor clavat per error. Decidir què fer quan una mesura falla és disseny, no detall.

### Bloc 2 — La decisió de seguretat

```cpp
  if (d < SEGURETAT) {
    atura();                 // massa a prop: frena
  }
```

Abans de calcular res: si la distància és per sota del llindar (`SEGURETAT = 10` cm), **atura**. La seguretat sempre es comprova primer i té la seva pròpia branca — no es barreja amb el càlcul de velocitat.

### Bloc 3 — Reescalar distància a velocitat

```cpp
    // Reescala la distancia (10..50 cm) a velocitat (80..255)
    int vel = map((int)d, SEGURETAT, 50, 80, 255);
    vel = constrain(vel, 80, 255);
    endavant(vel);
```

El cor de la pràctica: `map()` converteix el rang de distàncies (10–50 cm) en el rang de velocitats (80–255). Com més a prop, més lent. Dues preguntes que el codi respon:

- **Per què el mínim és 80 i no 0?** Perquè amb PWM molt baix el motor **brunzeix però no gira** (no venç el fregament). 80 és la velocitat mínima útil.
- **Per què `constrain()`?** `map()` **extrapola**: amb d = 80 cm et donaria una velocitat per sobre de 255. `constrain(vel, 80, 255)` retalla el resultat perquè no surti mai del rang vàlid. La parella `map` + `constrain` la veuràs sempre juntes.

I fixa't que `endavant(vel)` és la funció de la Pràctica 2, reciclada tal qual.

### Bloc 4 — El monitor sèrie com a finestra

```cpp
  float d = mesuraDistancia();
  Serial.println(d);
```

Sense el `Serial.println(d)` aniries a cegues: *frena perquè és a prop o perquè el sensor llegeix malament?* Amb el monitor sèrie obert (9600 bauds) veus la distància en temps real i pots omplir la taula distància→velocitat del quadern amb dades de veritat.

## ⚠️ Errors que veuràs segur

| Símptoma | Causa probable |
|---|---|
| El motor no gira mai | Massa comuna que falta (com a la Pràctica 2), o el sensor llegeix sempre < 10 cm (TRIG/ECHO intercanviats). |
| El motor va sempre a tope | Sensor desconnectat o mal cablejat → sense eco → `mesuraDistancia()` retorna 400 ("via lliure"). |
| Velocitat que "balla" amb la mà quieta | Ecos rebotats o superfície tova (roba absorbeix l'ultraso): apunta a una superfície dura i plana. |
| Al monitor sèrie surten símbols estranys | La velocitat del monitor no és 9600 bauds. |

## 🔗 On ho aplicaràs

- **Repte de la S3:** el llindar de seguretat ja hi és — el **+ repte** és invertir el sentit segons la distància (fer servir també `enrere()`).
- **A la S4:** la [barrera automàtica](../04_barrera_automatica/04_barrera_automatica.ino) és el mateix bucle percepció→acció, amb servo en lloc de motor.
- **SA6 i SA7:** el control amb consigna (SA6) i el rover que esquiva obstacles (SA7) són aquest patró amb més graons.
