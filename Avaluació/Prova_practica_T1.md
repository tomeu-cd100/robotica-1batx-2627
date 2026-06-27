# Prova pràctica — Trimestre 1 (SA1-SA3)
## "Llum de seguretat intel·ligent"

**Durada:** 2 h · **Material:** Arduino UNO, protoboard, LDR + 10 kΩ, LED + 220 Ω, polsador, brunzidor piezo, cables. Es permet consultar esquemes i quadern tècnic.

### Competències i criteris avaluats
- **CE-R1** (programar) → CA1.1 · **CE-R2** (circuits) → CA2.1, CA2.2
- Rúbriques: **R1** (codi), **R2** (circuit), **R4** (documentació).

---

## Enunciat (per nivells)

Has de construir i programar un sistema d'il·luminació de seguretat.

### Nivell 1 — Nucli obligatori (assoliment satisfactori)
1. Munta una **LDR** (entrada analògica) i un **LED** (sortida).
2. Programa el sistema perquè **el LED s'encengui quan fa fosc** (lectura de la LDR per sota d'un llindar).
3. Mostra la **lectura de la LDR pel Serial Monitor**.

### Nivell 2 — Ampliació (notable)
4. Afegeix un **polsador** que activi/desactivi el sistema (mode ON/OFF) amb **antirebot**.

### Nivell 3 — Ampliació (excel·lent)
5. Afegeix un **brunzidor** que faci un avís quan la foscor és extrema (segon llindar), i estructura el codi amb **funcions**.

### Lliurament
- Sistema funcionant + **explicació breu al quadern** (esquema + què fa cada part + un error que has resolt).

---

## Graella de correcció (10 punts)

| Criteri | Punts | Rúbrica |
|---|---|---|
| El circuit funciona i està ben muntat (segur) | 3 | R2 |
| El LED respon correctament a la llum (nucli) | 2 | R1 |
| Lectura pel Serial correcta | 1 | R1 |
| Polsador ON/OFF amb antirebot (ampliació) | 1,5 | R1 |
| Brunzidor + codi amb funcions (ampliació) | 1,5 | R1 |
| Documentació al quadern (esquema + error) | 1 | R4 |

> Orientació: nucli ben fet ≈ 5-6; amb una ampliació ≈ 7-8; amb les dues i bona documentació ≈ 9-10.

---

## Solució orientativa (docent)

**Connexions:** LDR en divisor amb 10 kΩ → A1 · LED → pin 9 (220 Ω) · polsador → pin 2 (`INPUT_PULLUP`) · piezo → pin 6.

```cpp
const int LDR = A1, LED = 9, BOTO = 2, PIEZO = 6;
const int LLINDAR = 400;        // fosc
const int LLINDAR_EXTREM = 150; // molt fosc
bool actiu = true;
int anterior = HIGH;

void avis() { tone(PIEZO, 1500, 100); }

void setup() {
  pinMode(LED, OUTPUT);
  pinMode(BOTO, INPUT_PULLUP);
  pinMode(PIEZO, OUTPUT);
  Serial.begin(9600);
}

void loop() {
  // Polsador ON/OFF amb antirebot
  int estat = digitalRead(BOTO);
  if (estat == LOW && anterior == HIGH) { actiu = !actiu; delay(40); }
  anterior = estat;

  int llum = analogRead(LDR);
  Serial.println(llum);

  if (actiu && llum < LLINDAR) {
    digitalWrite(LED, HIGH);
    if (llum < LLINDAR_EXTREM) avis();   // avis si foscor extrema
  } else {
    digitalWrite(LED, LOW);
  }
  delay(100);
}
```
