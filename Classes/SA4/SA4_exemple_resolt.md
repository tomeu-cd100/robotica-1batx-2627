# SA4 · Exemple resolt (model «jo ho faig») — El braç que saluda

> 🧑‍🎓 **Quan toca mirar-lo?** Després del teu **primer intent** amb el servo de l'**Activitat 1 (S1)** i abans del producte de la **S4** — mai abans. És un problema **anàleg** per veure *com es pensa*, no la solució del braç amb potenciòmetres.

> 🔗 **D'on ve i on va.** Aquest exemple és el **bessó comentat** de la pràctica [Producte: el braç amb quatre potenciòmetres](codi/04_brac_potenciometres/EXPLICACIO.md): el mateix MeArm i les mateixes idees (**rang segur** i **funcions amb paràmetres**), però el braç no obeeix uns potenciòmetres sinó una **seqüència de gestos programada**. Serveix per veure **com es pensa**, no per copiar-lo. Quan l'hagis entès, torna a la pàgina de la pràctica i fes-la teva.

> 🗺️ **Com es llegeix per apartats:** **🔑 El repte model** primer, per situar-te · **🧭 Com ho penso** abans d'escriure el **teu** codi (és l'apartat més important: el raonament) · **💡 La solució anotada** només **després del teu intent**, per comparar · **🔬 Provo i mesuro** quan provis el teu: copia'n el **mètode**, no el resultat · **⚠️ Contraexemple** quan una cosa no rutlli — i com a repàs abans d'entregar · **📔 Diari de bord** quan escriguis la teva entrada del quadern.

> **Nota docent:** mostra'l **després del primer intent** amb `01_servo_potenciometre.ino`, mai abans.
> No és la solució del producte (S4): és un problema **anàleg** resolt pas a pas perquè l'alumnat vegi
> *com es pensa*, no què s'ha de copiar. Comenta en veu alta el pas «🧭 Com ho penso» (predicció abans
> de codi, PRIMM) i, sobretot, el «⚠️ Contraexemple» (seguretat: rang segur i alimentació externa).

---

![Braç MeArm: base giratòria, servos esquerre i dret als laterals, palanques fins a la pinça](../00_General/img/mearm-estructura.svg)

## 🔑 El repte model

> Fer que el **braç MeArm saludi** quan s'engega: s'aixeca, gira cap a un costat, obre i tanca la
> pinça tres vegades (com qui diu «hola» amb la mà) i torna a la posició de repòs. I fer-ho **sense
> que cap servo forci mai el topall**, encara que algú escrigui un angle massa gran.

Fa servir només conceptes de la SA4: llibreria `Servo.h` (`attach`, `write`), **funcions amb
paràmetres**, **rang segur** de cada servo i **alimentació externa** amb massa comuna. El circuit és
el del braç: base → **pin 9**, esquerre → **pin 6**, dret → **pin 10**, pinça → **pin 11**, tots
quatre servos a les **piles** amb el GND unit al de l'Arduino.

---

## 🧭 Com ho penso (abans d'escriure codi)

1. **Analitzo:** una «posició del braç» són **quatre angles** (base, esquerre, dret, pinça). Si cada
   vegada escric quatre `write()`, el programa es fa llarg i fàcil d'equivocar.
2. **Descomponc:** faré **una funció que posa el braç sencer** en una posició, `posa(b, e, d, p)`, i
   després **una funció per gest** (`repos()`, `saluda()`). El `loop()` quedarà curt i llegible.
3. **Seguretat primer:** dins de `posa()`, cada angle passa per `constrain()` amb els **angles límit**
   del servo. Així, encara que em despisti i escrigui `posa(90, 200, 90, 90)`, el servo esquerre no
   passarà mai del seu màxim.
4. **🔮 PREDIU (fes-ho tu abans de llegir el codi):** amb `ESQUERRE_MAX = 150`, què farà
   `posa(90, 200, 90, 90)` amb el servo esquerre? ☐ anirà a 200° ☐ **es quedarà a 150°** ☐ no es
   mourà. I `constrain(30, 60, 120)` val… ☐ 30 ☐ **60** ☐ 120.

---

## 💡 La solució anotada

```cpp
/*
  SA4 - exemple_brac_saluda.ino  (EXEMPLE MODEL, no es el producte)
  El brac MeArm saluda en engegar-se i torna a repos.
  Una funcio per a la POSICIO sencera (4 angles) i una funcio per GEST.
  Cada angle passa pel seu rang segur amb constrain().

  Circuit: servos base=9, esquerre=6, dret=10, pinca=11
           (PILES + GND comu amb l'Arduino; mai l'USB per a 4 servos)
*/

#include <Servo.h>

Servo base, esquerre, dret, pinca;

// Angles limit (els que has anotat al taller)
const int BASE_MIN = 0,      BASE_MAX = 180;
const int ESQUERRE_MIN = 40, ESQUERRE_MAX = 150;
const int DRET_MIN = 40,     DRET_MAX = 150;
const int PINCA_MIN = 60,    PINCA_MAX = 120;

// --- La posicio sencera del brac, sempre dins del rang segur ---
void posa(int b, int e, int d, int p) {
  base.write(constrain(b, BASE_MIN, BASE_MAX));
  esquerre.write(constrain(e, ESQUERRE_MIN, ESQUERRE_MAX));
  dret.write(constrain(d, DRET_MIN, DRET_MAX));
  pinca.write(constrain(p, PINCA_MIN, PINCA_MAX));
  delay(400);              // temps perque el brac hi arribi
}

// --- Gestos ---
void repos() {
  posa(90, 90, 90, PINCA_MIN);
}

void saluda() {
  posa(60, 130, 110, PINCA_MIN);       // s'aixeca i gira
  for (int i = 0; i < 3; i++) {        // "hola" amb la pinca, 3 vegades
    posa(60, 130, 110, PINCA_MAX);
    posa(60, 130, 110, PINCA_MIN);
  }
}

void setup() {
  base.attach(9);
  esquerre.attach(6);
  dret.attach(10);
  pinca.attach(11);
  repos();
  saluda();
  repos();
}

void loop() {
  // Res: el brac saluda una sola vegada, en engegar-se
}
```

**Per què està escrit així (🌟):**
- **Una funció per a la posició** (`posa`) amb **quatre paràmetres**: el braç sencer és una sola idea, i el codi el tracta com una sola idea.
- **Una funció per gest** (`repos`, `saluda`): `setup()` es llegeix com una frase. És la mateixa **abstracció** que als sketches reals de la SA4.
- **El rang segur viu en un sol lloc** (dins de `posa()`): cap gest, ni els que escriuré demà, pot fer forçar un topall.
- El `delay(400)` dins de `posa()` dona temps al braç a arribar. És senzill, però **bloqueja**: mentre espera, el braç no podria vigilar cap sensor.

---

## 🔬 Provo i mesuro

- **Predicció ✔:** `posa(90, 200, 90, 90)` deixa el servo esquerre a 150°; `constrain(30, 60, 120)` val 60.
- **Mètode:** abans de provar `saluda()`, prova `repos()` sol i **mira cada articulació**: si alguna brunz o s'escalfa quieta, l'angle límit d'aquell servo és massa ample.
- **Racó de mesura:** cronometra el salut sencer. Hauria de durar unes **3 s** (7 crides a `posa()` × 400 ms). Si dura més, el braç no hi arriba a temps i cal més pausa.
- **Límit honest:** amb `delay()`, el braç fa el salut «a cegues». Si volgués que s'aturés en tocar alguna cosa, hauria de vigilar un sensor mentre es mou, i per això cal `millis()` (com a `05_dos_servos_millis.ino`) i, a la SA6, una **màquina d'estats**.

---

## ⚠️ Contraexemple (errors típics i com es detecten)

- **Alimento els quatre servos des de l'USB** → el braç **tremola** i l'Arduino **es reinicia** quan es mouen tots alhora. *Solució:* servos a les **piles**, amb el − unit al GND de l'Arduino.
- **Oblido el `constrain()`** i escric `posa(90, 200, 90, 90)` → el servo esquerre va al seu topall físic, **brunz i s'escalfa**. *Solució:* el rang segur dins de la funció, no confiar en la memòria.
- **Oblido `attach()` d'algun servo** → aquell servo **no es mou mai**, encara que el codi compili. *Solució:* quatre servos, quatre `attach()`.
- **`delay()` massa curt dins de `posa()`** → el braç rep la posició següent abans d'arribar a l'anterior i el salut queda **tallat**. *Solució:* augmentar la pausa o moure menys graus per gest.

---

## 📔 Diari de bord (entrada model, 1a persona)

> **Sessió 4:** He fet que el meu MeArm **saludi** en engegar-se. He escrit una funció `posa()` amb
> **quatre paràmetres** (un angle per servo) i dues funcions de gest, `repos()` i `saluda()`. Dins de
> `posa()` cada angle passa per `constrain()` amb els **angles límit** que vaig anotar al taller (el
> meu esquerre va de 40 a 150°). Al principi el braç tremolava i l'Arduino es reiniciava: tenia els
> servos a l'USB. Amb les **piles** i el **GND comú** ja va anar. **Evidència:** taula d'angles límit
> + vídeo del salut.

**Per què és una bona entrada:** usa el **vocabulari clau** (rang segur, angles límit, `constrain()`,
funció amb paràmetres, alimentació externa, GND comú), explica *el com*, i és **honesta amb la
dificultat** (el reinici) i com es va resoldre.

---

*Exemple resolt de la SA4. Model de treball per a l'alumnat (alliberament gradual: es mostra
després del primer intent). Es recolza en `codi/01_servo_potenciometre` i
`codi/04_brac_potenciometres`. Llicència CC BY-SA 4.0.*
