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

Primer, la idea física, que és la de sempre a la muntanya: **crides, esperes l'eco, i comptes quant triga a tornar**. Com més triga, més lluny és la paret. El sensor d'ultrasons fa exactament això, però amb un so tan agut que no el sentim:

1. **El crit** — les tres primeres línies: posem `TRIG` a `HIGH` durant 10 microsegons. Això és l'ordre "fes el crit ara".
2. **El cronòmetre** — `pulseIn(ECHO, HIGH, 30000)`: l'Arduino es queda escoltant el pin `ECHO` i ens diu **quants microsegons** ha trigat l'eco a tornar. Aquest temps queda desat a la variable `t`.
3. **La conversió** — `t * 0.034 / 2.0`: el so viatja a 0,034 cm per microsegon, així que multipliquem el temps per la velocitat… i **dividim per 2**, perquè el so ha fet el viatge **d'anada i tornada** (fins a la paret i de retorn) i només volem l'anada.

I ara la novetat de programació. A la Pràctica 2 les funcions **feien** coses i callaven (`endavant` movia el motor i prou — per això començaven amb `void`, "res"). Aquesta funció és diferent: li fas una pregunta — *"a quina distància és l'obstacle?"* — i **et contesta amb un número**. D'això en diem **retornar un valor**: per això comença amb `float` (número amb decimals, el tipus de resposta) i acaba amb `return` (el moment de contestar).

Dos detalls d'enginyer que val la pena copiar:

- **I si l'eco no torna mai?** (sensor desconnectat, obstacle massa lluny…) Sense pla B, l'Arduino es quedaria esperant per sempre. El `30000` de `pulseIn` és un **timeout**: "espera com a màxim 30 ms; si no ha arribat res, plega i retorna 0".
- `if (t == 0) return 400;` — quan no hi ha eco, la funció respon "400 cm, via lliure". Per què no 0? Perquè 0 cm voldria dir "paret enganxada al nas!" i el motor frenaria en sec per culpa d'un sensor mut. Decidir què fer quan una mesura falla és disseny, no detall.

### Bloc 2 — La decisió de seguretat

```cpp
  if (d < SEGURETAT) {
    atura();                 // massa a prop: frena
  }
```

Pensa en com creues un carrer: **primer mires si ve un cotxe, i si ve, ni un pas més**. No et poses a calcular a quina velocitat podries creuar — t'atures i punt. El codi fa el mateix: abans de calcular cap velocitat, una sola pregunta — *és més a prop de 10 cm?* (`SEGURETAT = 10`) — i si la resposta és sí, `atura()` i no es parla més.

Fixa't que la seguretat té la seva **pròpia branca** del `if`, separada del càlcul de velocitat. No es barregen mai: primer decideixes si és segur moure's, i només llavors decideixes com de ràpid. Aquest ordre — seguretat primer, càlcul després — el veuràs a tots els robots del curs.

### Bloc 3 — Reescalar distància a velocitat

```cpp
    // Reescala la distancia (10..50 cm) a velocitat (80..255)
    int vel = map((int)d, SEGURETAT, 50, 80, 255);
    vel = constrain(vel, 80, 255);
    endavant(vel);
```

Aquí hi ha el cor de la pràctica, i la idea és ben senzilla: **com més a prop de la paret, més a poc a poc**. El problema és que la distància i la velocitat parlen "idiomes" diferents — la distància va de 10 a 50 cm i la velocitat del motor de 80 a 255. Necessitem un **traductor**, i això és exactament `map()`: li dius "quan la distància sigui 10, vull velocitat 80; quan sigui 50, vull 255" i ell tradueix qualsevol valor del mig. A 30 cm (mig camí de les distàncies) et dona una velocitat a mig camí. És la regla de tres que fas a mates, empaquetada en una funció.

Dues preguntes que segur que et faràs:

- **Per què el mínim és 80 i no 0?** Prova-ho: amb velocitats molt baixes el motor **brunzeix però no es mou** — no té prou força per vèncer el fregament, com quan intentes arrencar amb bici en el pinyó més dur. 80 és la primera velocitat que fa girar el motor de veritat.
- **Per què `constrain()` just després?** Perquè `map()` és un traductor massa obedient: si li arriba una distància de 80 cm (fora del rang que li vas dir), tradueix igualment i et dona una velocitat **més gran que 255** — que no existeix. `constrain(vel, 80, 255)` fa de topall: "passi el que passi, mai per sota de 80 ni per sobre de 255". Per això `map` i `constrain` van sempre de parella.

I fixa't en el premi final: `endavant(vel)` és la funció que vas escriure a la Pràctica 2, reciclada tal qual. Les funcions ben fetes es tornen a fer servir sense tocar-les.

### Bloc 4 — El monitor sèrie com a finestra

```cpp
  float d = mesuraDistancia();
  Serial.println(d);
```

L'Arduino no té pantalla: treballa "en silenci" i tu no saps què està veient. El `Serial.println(d)` és com fer-li dir en veu alta el que llegeix el sensor: cada mesura de distància s'envia pel cable USB i apareix al **monitor sèrie** de l'ordinador, en temps real.

Per què és tan important? Imagina que el motor frena: *frena perquè hi ha un obstacle a prop, o perquè el sensor llegeix malament?* Sense el monitor sèrie no ho pots saber — vas a cegues. Amb el monitor obert (a 9600 bauds, la mateixa "velocitat de conversa" que el `Serial.begin` del `setup()`) veus els números que veu l'Arduino, i pots omplir la taula distància→velocitat del quadern amb dades de veritat, no amb suposicions.

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

> ⭐ **Has acabat abans?** Tria un repte a **[Reptes de la SA4](../../../../Reptes/Reptes_SA4.md)** i, quan el docent te'l validi, pinta l'estrella al [tauler de reptes](../../../00_General/00_Tauler_reptes.md).
