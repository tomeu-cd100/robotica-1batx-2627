# Blink sense delay: coneix millis()

**Quan es fa:** Sessió 3 (ampliació, per a qui va sobrat) · **Fitxer:** `blink_millis.ino` · **Circuit:** [esquema de connexions](../../SA1_esquemes_connexions.md) (el mateix del [Blink](../blink/EXPLICACIO.md))

## 🎯 Per què fem aquesta pràctica

El `delay()` té un peatge amagat: mentre espera, la placa queda **congelada** — no pot llegir un botó, ni un sensor, ni fer res més. Per a un LED sol no importa; per a un robot que ha de vigilar l'entorn **mentre** parpelleja, és un problema greu.

Aquesta ampliació fa **exactament el mateix** que el `Blink`… però sense aturar mai el programa: en lloc d'esperar, el codi **consulta un rellotge** (`millis()`) i decideix si ja toca canviar el LED. És la tècnica de la **temporització no bloquejant**, la base dels sistemes que fan diverses coses alhora. Avui només l'has de tastar; la practicaràs de debò a la SA4 i la faràs servir a fons a la SA6.

## 🔮 Abans d'executar: prediu

Mira el codi complet (a baix, plegat) **sense carregar-lo**. El LED es comportarà igual que amb `delay(500)`? On és, la «espera»? I una de trampa: quantes vegades per segon creus que s'executa el `loop()` sencer?

## 🧠 El codi, per blocs

### Bloc 1 — Les variables de memòria

```cpp
const int LED = 13;
const unsigned long INTERVAL = 500;   // mig segon entre canvis (ms)

unsigned long anterior = 0;   // moment de l'ultim canvi
int estat = LOW;              // estat actual del LED
```

Dues cares noves:

- `unsigned long` és un tipus de número **molt més gran** que `int` i sense negatius. Cal perquè `millis()` compta mil·lisegons des de l'engegada i el número creix sense parar (un `int` es quedaria curt en mig minut!).
- `anterior` i `estat` són la **memòria** del programa entre voltes de `loop()`: *quan* vaig canviar el LED per última vegada, i *com* està ara. Per això es declaren **fora** del `loop()` — si fossin dins, es reiniciarien a cada volta.

### Bloc 2 — `millis()`: el rellotge de bord

```cpp
void loop() {
  unsigned long ara = millis();        // mil·lisegons des que la placa va arrencar

  // Ha passat prou temps des de l'ultim canvi?
  if (ara - anterior >= INTERVAL) {
    anterior = ara;                    // desem el nou moment de referencia
```

`millis()` retorna els **mil·lisegons transcorreguts des que la placa es va engegar**: és un cronòmetre que sempre corre. La pregunta clau és la resta `ara - anterior`: *quant fa de l'últim canvi?* Si ja passa de `INTERVAL`, toca actuar — i **desem `ara` com a nou punt de referència** per començar a comptar el següent mig segon.

Fixa't en el canvi de filosofia: amb `delay()` el programa **espera**; amb `millis()` el programa **pregunta** («ja toca?») milers de vegades per segon i, mentre no toca, queda lliure per fer altres coses.

### Bloc 3 — L'operador ternari: invertir l'estat en una línia

```cpp
    estat = (estat == LOW) ? HIGH : LOW;  // invertim l'estat
    digitalWrite(LED, estat);
  }
```

La línia del `?` i els `:` és l'**operador ternari**, un `if/else` comprimit en una expressió. Es llegeix així:

> `variable = (condició) ? valor_si_certa : valor_si_falsa;`

És a dir: *si `estat` és `LOW`, posa-hi `HIGH`; si no, posa-hi `LOW`*. Exactament equivalent a:

```cpp
if (estat == LOW) {
  estat = HIGH;
} else {
  estat = LOW;
}
```

…però en una línia: perfecte per a alternances com aquesta. Després, `digitalWrite(LED, estat)` aplica al LED l'estat que hem calculat. Compte a no confondre `==` (comparar: «és igual?») amb `=` (assignar: «desa-hi això»).

### Bloc 4 — El loop queda lliure

```cpp
  // Aqui el loop continua lliure: es podria llegir un sensor sense esperar.
}
```

Aquest comentari final és el més important del sketch: com que **enlloc no hi ha cap `delay()`**, aquí hi podries afegir la lectura d'un botó o d'un sensor i funcionaria **alhora** que el parpelleig. Amb `delay()`, impossible.

## ⚠️ Errors que veuràs segur

| Símptoma | Causa probable |
|---|---|
| El LED queda mig encès (parpelleig ultraràpid) | T'has deixat la línia `anterior = ara;`: la condició es compleix a cada volta i el LED s'inverteix milers de cops per segon. |
| El LED no canvia mai | Has escrit `=` en lloc de `==` a la comparació, o `INTERVAL` és enorme (recorda: mil·lisegons). |
| Funciona una estona i es torna boig | Has declarat `anterior` com a `int` en lloc d'`unsigned long`: el número es desborda. |
| «Ho he arreglat afegint un `delay()`» | Llavors torna a ser bloquejant! La gràcia és que **no** n'hi hagi cap. |

## 🔗 On ho aplicaràs

- **SA4:** dos LEDs amb ritmes diferents **alhora** — impossible amb `delay()`, natural amb `millis()`.
- **SA6:** la màquina d'estats del termòstat combina `millis()` amb decisions: és el cor del control de sistemes.
- **Germans d'ampliació:** si encara tens corda, [`sos_morse`](../sos_morse/EXPLICACIO.md) t'ensenya l'altra eina estrella: les funcions pròpies.

> ⭐ **Has acabat abans?** Tria un repte a **[Reptes de la SA1](../../../../Reptes/Reptes_SA1.md)** i, quan el docent te'l validi, pinta l'estrella al [tauler de reptes](../../../00_General/00_Tauler_reptes.md).
