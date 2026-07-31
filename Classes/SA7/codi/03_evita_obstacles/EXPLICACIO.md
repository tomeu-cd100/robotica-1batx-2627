# Pràctica 3 · Evita-obstacles: percepció, decisió, acció

**Quan es fa:** Sessió 3 (modelatge) · **Fitxer:** `03_evita_obstacles.ino` · **Circuit:** [esquema de connexions](../../SA7_esquemes_connexions.md) (ultrasons frontal: TRIG=12, ECHO=11)

## 🎯 Per què fem aquesta pràctica

Fins ara el robot executava un pla cec: tants mil·lisegons endavant, tants de gir. Avui **percep l'entorn i decideix sol**: avança i, si l'ultrasons detecta un obstacle a prop, recula i gira per buscar via lliure. És el primer comportament **autònom** del rover, i és **control en llaç tancat** (SA6): el sensor mana sobre l'acció, no el rellotge.

El patró que aprens aquí té nom i el repetiràs sempre més: el cicle **percepció → decisió → acció**. Cada volta de `loop()`, el robot mesura (percepció), mira el valor amb un `if` (decisió) i crida una funció de moviment (acció). Un cotxe autònom de debò fa exactament aquest cicle — milers de vegades per segon i amb IA a la decisió. Tens el cicle dibuixat al [diagrama de flux](../../SA7_diagrama_flux.md).

## 🔮 Abans d'executar: prediu

Sense carregar el codi: a quina **distància** deixarà d'avançar? Què farà exactament quan detecti l'obstacle (en quin **ordre**)? I si no hi ha res al davant de la paret més propera, què retornarà `distancia()`? Apunta-ho a l'Activitat 3 de la [fitxa](../../SA7_fitxa_alumnat.md) i comprova-ho.

## 🧠 El codi, per blocs

### Bloc 1 — La percepció: `distancia()` amb ultrasons

```cpp
float distancia() {
  digitalWrite(TRIG, LOW);  delayMicroseconds(2);
  digitalWrite(TRIG, HIGH); delayMicroseconds(10);
  digitalWrite(TRIG, LOW);
  long t = pulseIn(ECHO, HIGH, 30000);   // timeout 30 ms
  if (t == 0) return 400;                // res detectat -> lluny
  return t * 0.034 / 2.0;
}
```

El mateix sensor que a la SA3/SA4: un pols per `TRIG`, i `pulseIn` cronometra el retorn de l'eco per `ECHO`. Dos detalls que aquí són vitals perquè el robot **es mou**: el **timeout de 30 ms** (si no arriba eco, `pulseIn` no es queda esperant per sempre amb el robot en marxa) i el `return 400` (cap eco = «molt lluny», així el robot continua avançant en lloc de fer coses rares amb un 0).

### Bloc 2 — La decisió: un llindar amb nom

```cpp
const int DIST_MIN = 15;            // cm: per sota, evita
```

Tota l'«intel·ligència» del robot és aquesta frontera: per sota de 15 cm, obstacle; per sobre, via lliure. És un valor per **calibrar** amb un regle a la teva pista: massa petit i el robot xoca abans de reaccionar (porta inèrcia!); massa gran i «té por» de tot.

### Bloc 3 — El cicle reactiu i la maniobra d'evasió

```cpp
void loop() {
  float d = distancia();

  if (d < DIST_MIN) {
    // Obstacle a prop: maniobra d'evasio
    atura();        delay(150);
    enrere();       delay(400);
    atura();        delay(150);
    gira_dreta();   delay(450);   // gir per buscar via lliure
    atura();        delay(150);
  } else {
    endavant();
  }
  delay(30);
}
```

Llegeix-lo com el cicle: **percebo** (`distancia()`), **decideixo** (`if`), **actuo** (branca). La maniobra no és només girar: primer **recula** (per fer-se lloc) i després gira — si només girés, amb el nas enganxat a l'obstacle es quedaria encallat fregant-lo. I el `delay(30)` final és el **ritme del cicle**: curt a consciència, perquè mentre hi ha un `delay` en marxa el robot **no mesura** — va cec. Per això la branca `else` és només `endavant()` sense espera: engega els motors i torna de seguida a mesurar.

## ⚠️ Errors que veuràs segur

| Símptoma | Causa probable |
|---|---|
| Sempre avança (i xoca) o sempre està evitant | `TRIG` i `ECHO` intercanviats, o falta `pinMode(ECHO, INPUT)`: `distancia()` retorna sempre 400 o sempre 0. |
| Es queda encallat en una cantonada, gira-avança-gira sense sortir-ne | Estratègia massa simple per a aquell racó: allarga el `delay` del gir o recula més. És el repte de la sessió, no un bug. |
| Reacciona tard i toca l'obstacle abans d'aturar-se | `DIST_MIN` massa petit per a la velocitat que porta: apuja el llindar o abaixa `VEL`. |
| No detecta la cadira / la pota de la taula | L'ultrasons vol superfícies que tornin l'eco: objectes prims o en angle el despisten. Prova amb una capsa. |

## 🧗 Si t'encalles: l'esquelet

Si el cicle no et surt, no et quedis en blanc: parteix d'aquest esquelet. Les funcions de moviment i `distancia()` ja estan fetes i provades; tu només omples els `// TODO:` del `loop()` amb la teva decisió (fixa't que té **dos llindars** i una zona intermèdia, com l'[exemple resolt](../../SA7_exemple_resolt.md)). Compila tal qual; el robot queda aturat fins que hi posis les accions.

<details markdown="1">
<summary>Desplega l'esquelet (còpia'l a un sketch nou)</summary>

```cpp
/*
  SA7 - robot reactiu (BASTIDA / esquelet per comencar)

  El patro dificil ja esta muntat: les funcions de MOVIMENT (control diferencial)
  i la de PERCEPCIO amb ultrasons (distancia()) estan completes i provades.
  Tu nomes has d'OMPLIR el loop(): el cicle PERCEPCIO -> DECISIO -> ACCIO.

  A cada volta el robot mesura una vegada la distancia i, segons el valor,
  ha de decidir que fa. Escriu la DECISIO i l'ACCIO dins de cada // TODO:
  cridant les funcions de moviment que ja tens (endavant, enrere,
  gira_dreta, gira_esquerra, atura).

  Munta: motors (2 pins per motor: DIRECCIO + VELOCITAT PWM) i un
  ultrasons frontal (TRIG i ECHO). AJUSTA els pins al teu maquinari.
*/

// === PINS (AJUSTAR segons el manual de la teva placa) ===
const int ESQ_DIR = 4;    // direccio motor esquerre   <-- AJUSTAR
const int ESQ_VEL = 5;    // velocitat (PWM) esquerre  <-- AJUSTAR
const int DRET_DIR = 7;   // direccio motor dret       <-- AJUSTAR
const int DRET_VEL = 6;   // velocitat (PWM) dret      <-- AJUSTAR

const int TRIG = 12;      // ultrasons: TRIG surt      <-- AJUSTAR
const int ECHO = 11;      // ultrasons: ECHO entra     <-- AJUSTAR

const int VEL = 180;      // velocitat de marxa (0-255)

// Llindars de decisio en cm. Els has de CALIBRAR amb un regle.
// Consell: fes servir DOS valors (a prop / lluny) i deixa una zona
// intermedia, per evitar que el robot oscil-li just al limit.
const int A_PROP  = 12;   // cm: per sota d'aixo, hi ha un obstacle a prop
const int A_LLUNY = 25;   // cm: per sobre d'aixo, via lliure

// --- Funcions de MOVIMENT (ja donades, control diferencial) ---
void motors(int dirEsq, int velEsq, int dirDret, int velDret) {
  digitalWrite(ESQ_DIR, dirEsq);
  analogWrite(ESQ_VEL, velEsq);
  digitalWrite(DRET_DIR, dirDret);
  analogWrite(DRET_VEL, velDret);
}
void endavant()      { motors(HIGH, VEL, HIGH, VEL); }   // dues rodes igual = recte
void enrere()        { motors(LOW,  VEL, LOW,  VEL); }
void gira_dreta()    { motors(HIGH, VEL, LOW,  VEL); }   // esq endavant, dret enrere
void gira_esquerra() { motors(LOW,  VEL, HIGH, VEL); }
void atura()         { analogWrite(ESQ_VEL, 0); analogWrite(DRET_VEL, 0); }

// --- Funcio de PERCEPCIO (ja donada): distancia a l'obstacle, en cm ---
float distancia() {
  digitalWrite(TRIG, LOW);  delayMicroseconds(2);
  digitalWrite(TRIG, HIGH); delayMicroseconds(10);
  digitalWrite(TRIG, LOW);
  long t = pulseIn(ECHO, HIGH, 30000);   // timeout 30 ms (no bloqueja per sempre)
  if (t == 0) return 400;                // res detectat -> molt lluny
  return t * 0.034 / 2.0;                // temps (us) -> cm (anada i tornada)
}

void setup() {
  pinMode(ESQ_DIR, OUTPUT);  pinMode(ESQ_VEL, OUTPUT);
  pinMode(DRET_DIR, OUTPUT); pinMode(DRET_VEL, OUTPUT);
  pinMode(TRIG, OUTPUT);     pinMode(ECHO, INPUT);   // TRIG surt, ECHO entra
  atura();                   // arrenca aturat, per seguretat
}

void loop() {
  // 1) PERCEPCIO: mesura la distancia una vegada per cicle.
  float d = distancia();

  // 2) DECISIO + 3) ACCIO: decideix segons "d" i crida una funcio de moviment.
  if (d < A_PROP) {
    // TODO: hi ha un obstacle a prop. Que ha de fer el robot?
    // (p. ex. atura(); enrere() una mica; despres gira_dreta() per buscar sortida)
    atura();   // <-- accio placeholder: substitueix-la per la teva decisio
  } else if (d > A_LLUNY) {
    // TODO: via lliure. Que fa el robot quan no te res al davant?
    atura();   // <-- accio placeholder: substitueix-la per la teva decisio
  } else {
    // TODO: zona intermedia (entre A_PROP i A_LLUNY). Que decideixes aqui?
    atura();   // <-- accio placeholder: substitueix-la per la teva decisio
  }

  // Ritme del cicle: prou curt per reaccionar de pressa. No hi posis
  // esperes llargues, o el robot quedaria "cec" mentre es mou.
  delay(30);
}
```

</details>

## 🔗 On ho aplicaràs

- **Repte de la S3:** millorar l'estratègia (retrocedir més, gir a un costat aleatori); **+ repte:** com més a prop, gir més tancat.
- **Després del primer intent:** compara el teu raonament amb l'[exemple resolt](../../SA7_exemple_resolt.md) (el robot «prudent» que manté la distància) — mateix cicle, decisió diferent.
- **Inici de la S4:** el mini-check individual és escriure un `loop()` reactiu com aquest amb les funcions donades.
- **Sessió 4:** el [seguidor de línia](../04_seguidor_linia/04_seguidor_linia.ino) és el mateix cicle percepció → decisió → acció, amb sensors IR en lloc d'ultrasons.
- **Robot del trimestre:** aquest és el comportament autònom estrella del teu **rover** ([dossier](../../../00_General/00_Projecte_T3_Rover.md)).

> ⭐ **Has acabat abans?** Tria un repte a **[Reptes de la SA7](../../../../Reptes/Reptes_SA7.md)** i, quan el docent te'l validi, pinta l'estrella al [tauler de reptes](../../../00_General/00_Tauler_reptes.md).
