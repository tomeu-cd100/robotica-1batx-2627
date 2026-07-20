# Pràctica 2 · Trajectòria en quadrat: calibrar el gir de 90°

**Quan es fa:** Sessió 2 (modelatge) · **Fitxer:** `02_trajectoria_quadrat.ino` · **Circuit:** [esquema de connexions](../../SA7_esquemes_connexions.md)

## 🎯 Per què fem aquesta pràctica

A la Pràctica 1 el robot es movia; ara ha de fer un **recorregut concret**: un quadrat. Una trajectòria és exactament això: una **seqüència de moviments amb els seus temps**. I aquí topes amb el problema central de la sessió: *com fa el robot per girar exactament 90°?* No té cap sensor d'angle: gira **mentre tu li diguis**, i prou. El temps de gir s'ha de **calibrar** provant, mesurant l'error i ajustant.

Abans de provar temps a ull, fes el **full de càlcul previ** de l'Activitat 2 (perímetre de la roda, velocitat real, temps teòric de gir): quan comparis el temps teòric amb el calibrat, la diferència (fregament, bateria, inèrcia) t'explicarà per què el control **per temps** és senzill però poc fiable — i per què a la S3 passarem als **sensors**.

## 🔮 Abans d'executar: prediu

Sense carregar el codi: quantes vegades girarà el robot? El quadrat, el farà **una vegada** o **sense parar**? (Pista: mira a quina funció és el `for`.) I si `T_GIR_90` és massa gran, el quadrat sortirà obert o creuat? Apunta-ho i comprova-ho.

## 🧠 El codi, per blocs

### Bloc 1 — Els dos temps que ho decideixen tot

```cpp
const int T_RECTE  = 1200;  // ms per avancar un costat (ajustar)
const int T_GIR_90 = 600;   // ms per girar 90 graus (CALIBRAR!)
```

Dues constants, dues responsabilitats: `T_RECTE` fa el **costat** del quadrat més llarg o més curt; `T_GIR_90` fa l'**angle** del gir. El mètode de calibratge és iterar: prova, mira si el gir passa de 90° o no hi arriba, ajusta el número, torna a provar. Apunta cada intent al quadern: aquest registre **és** la pràctica.

### Bloc 2 — El quadrat: un `for` de 4 costats

```cpp
  for (int costat = 0; costat < 4; costat++) {
    endavant();    delay(T_RECTE);
    atura();       delay(300);
    gira_dreta();  delay(T_GIR_90);
    atura();       delay(300);
  }
  atura();
```

Un quadrat són **4 vegades el mateix**: avançar un costat i girar 90°. En lloc de copiar el bloc quatre cops, un `for` (SA2) ho repeteix. Fixa't en els `atura(); delay(300);` intercalats: sense aquesta pausa, la inèrcia del robot **arrossega** part del moviment anterior cap al gir i el quadrat es deforma.

### Bloc 3 — Per què és al `setup()` i el `loop()` és buit

```cpp
void setup() {
  // ... pinMode dels 4 pins de motors ...
  delay(1000);   // temps per deixar el robot a terra

  // aqui hi va el for de 4 costats
}

void loop() {
  // El recorregut es fa una sola vegada al setup().
}
```

Sorpresa: el recorregut no és al `loop()`. Si hi fos, el robot faria quadrats **sense parar** fins a quedar-se sense bateria. Posant-lo al `setup()` s'executa **un sol cop** i el robot s'atura — i el `delay(1000)` inicial et dona un segon per deixar-lo a terra després de connectar-lo. Per repetir la prova: botó **RESET** (o desconnecta i torna a connectar).

## ⚠️ Errors que veuràs segur

| Símptoma | Causa probable |
|---|---|
| Gira més o menys de 90° | `T_GIR_90` sense calibrar — i compte: el valor bo d'avui **canvia** amb la bateria i la superfície. |
| Els costats no són rectes i el quadrat surt tort | Motors desiguals (l'error de la P1): compensa velocitats abans de calibrar girs. |
| El quadrat no tanca: acaba lluny d'on ha començat | Els 4 errors petits de cada gir i cada costat **s'acumulen**. És el límit del control per temps, no un bug teu. |
| El robot no fa res en connectar-lo | És normal que trigui 1 s (el `delay(1000)`). Si no arrenca mai, revisa pins i bateria. |

## 🔗 On ho aplicaràs

- **Repte de la S2:** triangle o forma en «L» — el mateix `for` amb un altre nombre de costats i un altre angle; **+ repte:** tornar al punt de sortida.
- **Sessió 3:** com que el control per temps acumula error, l'[evita-obstacles](../03_evita_obstacles/03_evita_obstacles.ino) deixarà de comptar mil·lisegons i es guiarà per un **sensor** (llaç tancat, la idea de la SA6).
- **Robot del trimestre:** qualsevol coreografia del teu **rover** és una trajectòria com aquesta, amb els temps calibrats per a les teves rodes.
