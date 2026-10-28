# SA6 · Exemple resolt (model «jo ho faig») — La pinça vigilant

> 🧑‍🎓 **Quan toca mirar-lo?** Després del teu **primer intent** amb la histèresi de l'**Activitat 2 (S2)** i la màquina d'estats de l'**Activitat 3 (S3)** — mai abans. És un problema **anàleg** per veure *com es pensa* un llaç tancat amb estats, no la solució del teu producte.

> 🔗 **D'on ve i on va.** Aquest exemple és el **bessó comentat** de la pràctica [Histèresi: la pinça automàtica](codi/02_pinca_histeresi/EXPLICACIO.md) — i hi suma la [màquina d'estats de la Pràctica 3](codi/03_maquina_estats/EXPLICACIO.md): la mateixa pinça, però organitzada en **estats** i amb una **alarma** per temps. Serveix per veure **com es pensa**, no per copiar-lo. Quan l'hagis entès, torna a la pàgina de la pràctica i fes-la teva.

> 🗺️ **Com es llegeix per apartats:** **🔑 El repte model** primer, per situar-te · **🧭 Com ho penso** abans d'escriure el **teu** codi (és l'apartat més important: el raonament) · **💡 La solució anotada** només **després del teu intent**, per comparar · **🔬 Provo i mesuro** quan provis el teu: copia'n el **mètode**, no el resultat · **⚠️ Contraexemple** quan una cosa no rutlli — i com a repàs abans d'entregar · **📔 Diari de bord** quan escriguis la teva entrada del quadern.

> **Nota docent:** mostra'l **després del primer intent** amb `02_pinca_histeresi.ino`
> i `03_maquina_estats.ino`, mai abans. No és la solució del producte (S3) ni de la prova T2:
> és un problema **anàleg** resolt pas a pas perquè l'alumnat vegi *com es pensa* un llaç tancat
> amb estats. Comenta en veu alta el pas «🧭 Com ho penso» (predicció abans de codi, PRIMM) i el
> «⚠️ Contraexemple».

---

![Gràfica de la histèresi de la pinça: es tanca per sota de 6 cm i només s'obre per sobre de 10 cm](img/sa6-histeresi-pinca.svg)

## 🔑 El repte model

> A l'estació de recollida, la **pinça agafa sola** les peces que s'hi acosten (histèresi: tanca a
> menys de 6 cm, obre a més de 10 cm). Però si una peça es queda **agafada massa estona** (més de
> 10 s) perquè ningú la recull, la pinça entra en **ALARMA**: un LED parpelleja i la pinça no fa
> res més fins que algú prem el **polsador de rearmament**, que l'obre.

Fa servir només conceptes de la SA6: **llaç tancat** (ultrasons → decisió → pinça),
**histèresi** amb dos llindars, **màquina d'estats** (`enum`/`switch`) i **`millis()`** sense
bloquejar. El muntatge és el del braç: **pinça al D11**, **ultrasons al D7/D8**, un **LED al D5**
(amb 220 Ω) i el **polsador A al D3**.

---

## 🧭 Com ho penso (abans d'escriure codi)

1. **Analitzo:** és un **llaç tancat**. Mesuro la distància, la comparo amb els llindars i
   decideixo què fa la pinça. La realimentació és l'ultrasons.
2. **Descomponc:** el comportament té **tres situacions clares** → **ESPERA** (pinça oberta),
   **AGAFAT** (pinça tancada amb una peça) i **ALARMA** (peça oblidada). Això demana una
   **màquina d'estats**, com al `03_maquina_estats.ino`.
3. **Evito el «clic-clic»:** la pinça es tanca per sota de `TANCA_CM` i només s'obre per sobre
   d'`OBRE_CM`. Aquí la memòria de la histèresi **és l'estat**: ESPERA o AGAFAT.
4. **No bloquejo:** per comptar els 10 s **no puc fer `delay(10000)`** (no veuria el polsador ni
   l'ultrasons). Uso **`millis()`** i apunto quan he entrat a l'estat.
5. **🔮 PREDIU (fes-ho tu abans de llegir el codi):** si la peça és a **8 cm** i la pinça era
   **oberta**, es tanca? ☐ sí ☐ **no** (encara no ha baixat de 6). I si era **tancada**?
   ☐ **continua tancada** ☐ s'obre. I si et descuides la peça 15 s a la pinça? ☐ res
   ☐ **ALARMA**.

---

## 💡 La solució anotada

```cpp
/*
  SA6 - exemple_pinca_vigilant.ino  (EXEMPLE MODEL, no es el producte)
  La pinca agafa amb HISTERESI i una MAQUINA D'ESTATS (enum/switch) amb
  millis() vigila que cap peca s'hi quedi oblidada.
  Circuit: servo pinca=11 (piles + GND comu); ultrasons TRIG=7, ECHO=8;
           LED d'alarma (220 ohm) al D5; polsador A entre D3 i GND.
*/

#include <Servo.h>

const int TRIG = 7, ECHO = 8;
const int LED_ALARMA = 5;
const int BOTO_A = 3;

const int TANCA_CM = 6;                 // HISTERESI: dos llindars
const int OBRE_CM = 10;
const unsigned long TEMPS_MAX = 10000;  // 10 s agafant sense que la recullin

const int PINCA_TANCADA = 60, PINCA_OBERTA = 120;

Servo pinca;

enum Estat { ESPERA, AGAFAT, ALARMA };
Estat estat = ESPERA;
unsigned long tEstat = 0;               // quan hem entrat a l'estat actual

void canviaEstat(Estat nou) {
  estat = nou;
  tEstat = millis();                    // reinicia el cronometre de l'estat
}

float mesuraDistancia() {
  digitalWrite(TRIG, LOW);
  delayMicroseconds(2);
  digitalWrite(TRIG, HIGH);
  delayMicroseconds(10);
  digitalWrite(TRIG, LOW);
  long temps = pulseIn(ECHO, HIGH, 30000);
  if (temps == 0) return 400;
  return temps * 0.034 / 2.0;
}

void setup() {
  pinMode(TRIG, OUTPUT);
  pinMode(ECHO, INPUT);
  pinMode(LED_ALARMA, OUTPUT);
  pinMode(BOTO_A, INPUT_PULLUP);
  pinca.write(PINCA_OBERTA);
  pinca.attach(11);
  Serial.begin(9600);
}

void loop() {
  float d = mesuraDistancia();          // realimentacio: sempre

  switch (estat) {

    case ESPERA:                        // pinca oberta, esperant una peca
      pinca.write(PINCA_OBERTA);
      digitalWrite(LED_ALARMA, LOW);
      if (d < TANCA_CM) canviaEstat(AGAFAT);       // llindar BAIX
      break;

    case AGAFAT:                        // pinca tancada amb la peca
      pinca.write(PINCA_TANCADA);
      if (d > OBRE_CM) {
        canviaEstat(ESPERA);            // l'han recollida (llindar ALT)
      } else if (millis() - tEstat > TEMPS_MAX) {
        canviaEstat(ALARMA);            // massa estona: peca oblidada
      }
      break;

    case ALARMA:                        // no es mou res; LED parpellejant
      digitalWrite(LED_ALARMA, (millis() / 300) % 2);
      if (digitalRead(BOTO_A) == LOW) {
        canviaEstat(ESPERA);            // rearmament manual: obre la pinca
        delay(200);
      }
      break;
  }

  // Serial Plotter: distancia i els dos llindars
  Serial.print(d);        Serial.print(" ");
  Serial.print(TANCA_CM); Serial.print(" ");
  Serial.println(OBRE_CM);
  delay(50);
}
```

**Per què està escrit així (🌟):**
- **Dos llindars amb nom** (`TANCA_CM`, `OBRE_CM`): la **histèresi** viu en aquesta distància i la puc ajustar en **un sol lloc**.
- **L'estat fa de memòria:** a ESPERA només es mira el llindar baix; a AGAFAT, només l'alt. No cal cap variable booleana a part.
- **`millis()`, mai `delay()` llarg**: el `loop()` segueix llegint l'ultrasons i el polsador mentre cronometra. El parpelleig del LED tampoc bloqueja.
- **Un `canviaEstat()`** que reinicia `tEstat`: no repeteixo `estat = ...; tEstat = millis();` a cada transició.

---

## 🔬 Provo i mesuro

- **Predicció ✔:** a 8 cm, l'estat **manté** el que feia: si era ESPERA, no es tanca; si era AGAFAT, segueix tancada. La histèresi és aquesta memòria.
- **Serial Plotter:** **tres línies** (distància + els dos llindars). Quan la mà ronda entre les dues línies, la pinça no canvia.
- **Amplada de la histèresi:** si acosto els llindars (7 i 8 cm), la pinça torna a fer clic-clic amb el soroll de l'ultrasons; si els allunyo (4 i 15 cm), costa més que agafi i que deixi anar. **Trio segons la peça.**
- **Prova de l'alarma:** deixo la mà a 3 cm i, als **10 s**, el LED **parpelleja**: ALARMA. En prémer el polsador, la pinça s'obre i torna a ESPERA.

---

## ⚠️ Contraexemple (errors típics i com es detecten)

- **Un sol llindar** (`if (d < 8) tanca; else obre`) → prop de 8 cm la pinça fa **«clic-clic»**. **Solució:** dos llindars, com aquí.
- **Llindars girats** (`TANCA_CM = 10`, `OBRE_CM = 6`) → la pinça es tanca i s'obre a la vegada a la zona del mig: la lògica queda **impossible**. *Regla:* `TANCA_CM` **sempre menor** que `OBRE_CM`.
- **Vigilar el temps amb `delay(10000)`** → durant 10 s el programa **no llegeix res**: sembla penjat i no pots rearmar. **Solució:** `millis() - tEstat > TEMPS_MAX`.
- **Oblidar `tEstat = millis()` en canviar d'estat** → l'alarma salta **de seguida**, perquè compta des de l'engegada. **Solució:** tots els canvis passen per `canviaEstat()`.
- **Servo de la pinça a l'USB** → en tancar-se amb força, l'Arduino es reinicia. **Solució:** piles amb GND comú.

---

## 📔 Diari de bord (entrada model, 1a persona)

> **Sessió 2–3:** He fet una **pinça vigilant** en **llaç tancat**: es tanca quan una peça és a
> menys de **6 cm** i només s'obre quan s'allunya més de **10 cm**. Al principi feia **«clic-clic»**
> perquè tenia un sol llindar; amb **dos** (histèresi) i el **Serial Plotter** he vist que ja no
> vibra. Després hi he afegit una **màquina d'estats** (ESPERA / AGAFAT / ALARMA) amb **`millis()`**
> per avisar si una peça s'hi queda oblidada, sense **bloquejar** la lectura del polsador.
> **Evidència:** captura del Serial Plotter + diagrama d'estats.

**Per què és una bona entrada:** usa el **vocabulari clau** (llaç tancat, histèresi, dos llindars,
màquina d'estats, `millis()`), explica *el com*, i és **honesta amb la dificultat** (el clic-clic) i
com es va resoldre.

---

*Exemple resolt de la SA6. Model de treball per a l'alumnat (alliberament gradual: es mostra
després del primer intent). Es recolza en `codi/02_pinca_histeresi` i `codi/03_maquina_estats`.
Llicència CC BY-SA 4.0.*
