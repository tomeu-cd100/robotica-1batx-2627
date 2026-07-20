# Pràctica 1 · Llaç obert vs llaç tancat: la realimentació

**Quan es fa:** Sessió 1 (modelatge) · **Fitxer:** `01_llac_obert_vs_tancat.ino` · **Circuit:** [esquema de connexions](../../SA6_esquemes_connexions.md) (sensor a A0, sortida a 9~)

## 🎯 Per què fem aquesta pràctica

Pensa en una **torradora**: l'engegues, compta un temps fix i expulsa la torrada — **sense mirar mai** si és feta o cremada. Ara pensa en l'**aire condicionat** de casa: mesura la temperatura contínuament i actua **segons el que mesura**. La torradora és un **llaç obert**; l'aire condicionat, un **llaç tancat**. Aquesta diferència — tenir o no tenir **realimentació** (un sensor que informa del resultat) — és la idea central de tota la SA6, i la base de qualsevol sistema que es *regula sol*: termòstats, creuers de cotxe, drons… i el robot de la SA7.

Aquest sketch et deixa **provar els dos mons amb el mateix muntatge**: una variable `MODE` tria si la sortida s'activa "a cegues" (temps fix) o mirant el sensor. Amb ell posaràs nom a les quatre peces del control: **consigna** (el valor que vull), **sensor** (el que mesuro, la realimentació), **error** (la diferència) i **actuador** (el que corregeix).

## 🔮 Abans d'executar: prediu

Sense carregar el codi: si escalfes la NTC amb els dits (o gires el potenciòmetre), **quin dels dos modes reaccionarà** i quin continuarà fent el seu cicle com si res? Escriu la predicció a l'Activitat 1 de la [fitxa](../../SA6_fitxa_alumnat.md) i comprova-la amb els dos valors de `MODE`.

## 🧠 El codi, per blocs

### Bloc 1 — El commutador de mode i la consigna

```cpp
int MODE = 1;            // 0 = llac obert ; 1 = llac tancat
const int CONSIGNA = 500; // valor objectiu (en unitats de lectura 0-1023)
```

`MODE` és l'interruptor de l'experiment: el canvies tu i tornes a carregar (com el `nocturn` del semàfor de la SA2). La `CONSIGNA` és **el valor que el sistema vol mantenir** — fixa't que en llaç obert no es fa servir enlloc: sense sensor, la consigna no serveix de res.

### Bloc 2 — Llaç obert: actuar a cegues

```cpp
if (MODE == 0) {
  // LLAÇ OBERT: actua un temps fix sense comprovar res
  digitalWrite(SORTIDA, HIGH);
  delay(2000);
  digitalWrite(SORTIDA, LOW);
  delay(2000);
}
```

Dos segons encès, dos apagat, per sempre. **Cap `analogRead`**: el programa no sap (ni li importa) què passa al món. Si la sala ja és freda, ell continua "refredant". El llaç obert "confia" que tot anirà bé — i quan hi ha una pertorbació, no se n'assabenta.

### Bloc 3 — Llaç tancat: mesurar, comparar, actuar

```cpp
// LLAÇ TANCAT: decideix segons el sensor
int lectura = analogRead(SENSOR);
Serial.println(lectura);
if (lectura > CONSIGNA) {
  digitalWrite(SORTIDA, HIGH);   // cal actuar
} else {
  digitalWrite(SORTIDA, LOW);
}
delay(100);
```

Aquí hi ha el **bucle de control** sencer, deu cops per segon: **mesura** (`analogRead`), **compara** amb la consigna (`if`), **actua** (`digitalWrite`). La lectura del sensor que torna a entrar a la decisió és la **realimentació**: el sistema es corregeix sol. El `Serial.println` et deixa veure-ho al Monitor sèrie mentre passa.

## ⚠️ Errors que veuràs segur

| Símptoma | Causa probable |
|---|---|
| La sortida no reacciona al sensor | `MODE` encara val `0` (llaç obert): és el comportament esperat d'aquell mode. |
| La lectura és sempre 0 o 1023 | Divisor de tensió mal muntat: revisa `5V → NTC → A0 → 10 kΩ → GND`. |
| En llaç tancat, la sortida fa "clic-clic" prop de 500 | No és cap avaria: amb **un sol llindar**, qualsevol tremolor de la lectura commuta la sortida. És justament el problema que resol la histèresi (Pràctica 2). |

## 🔗 On ho aplicaràs

- **Repte de la S1:** dibuixar el **diagrama de blocs** del teu sistema (consigna → error → controlador → actuador → sensor) i identificar-hi cada peça d'aquest codi.
- **Tota la SA:** el [termòstat amb histèresi](../02_termostat_histeresi/02_termostat_histeresi.ino) arregla el "clic-clic" que acabes de veure, i la màquina d'estats i el proporcional són maneres cada cop més fines de decidir **què fer amb l'error**.
- **SA7:** el robot que evita obstacles és exactament aquest bucle: mesurar distància → comparar → girar.
