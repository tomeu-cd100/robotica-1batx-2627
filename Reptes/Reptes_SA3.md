# Reptes SA3 · Entrades i sensors

**Tria UN dels tres reptes.** Tots **llegeixen un sensor** i **decideixen una acció** amb `if/else` (model entrada→procés→sortida complet). Mateix requisit mínim, ampliacions graduades. Simulables a Tinkercad/Wokwi.

> **Continguts SA3:** polsador i *debounce*, potenciòmetre, LDR, ultrasons, `analogRead` (0–1023), condicionals. · **Codi base:** `Classes/SA3/codi/`.

> **Format "producte real":** cada repte simula un **encàrrec** amb **client**, **lliurable** i **ús al món real**. El requisit tècnic no canvia. *(1r trimestre — dispositius que informen i perceben. Vegeu `Programació didàctica/08c_Projectes_vida_real.md`.)*

---

## 🌙 Repte A · Llum automàtica nocturna

**Context.** Un llum que **s'encén sol quan es fa fosc** i s'apaga amb la llum del dia (estalvi energètic).

> *Client: servei d'enllumenat públic · Lliurable: fanal automàtic amb sensor de llum · Món real: estalvi energètic i enllumenat intel·ligent.*

**Què treballa.** Lectura analògica d'una LDR, llindar de decisió amb `if`.

**Requisit mínim.**
- Llegir una **LDR** i encendre un LED quan la llum baixa d'un **llindar**.
- Codi comentat; valor de la LDR visible al **Monitor Sèrie**.

**Ampliacions graduades.**
1. *(bàsica)* Calibra el **llindar** observant valors reals al Monitor Sèrie.
2. *(notable)* Afegeix **histèresi** (dos llindars) perquè no parpellegi al capvespre.
3. *(⭐⭐⭐)* Regula la **brillantor** del LED amb PWM segons la foscor (com més fosc, més llum).

---

## 🅿️ Repte B · Sensor d'aparcament (antixoc)

**Context.** El sensor que avisa quan t'acostes massa en aparcar: més a prop, més ràpid pita/parpelleja.

> *Client: taller d'automoció · Lliurable: sensor d'aparcament antixoc · Món real: ajuda a la conducció i seguretat.*

**Què treballa.** Sensor d'ultrasons, mesura de distància, decisions per trams.

**Requisit mínim.**
- Mesurar la **distància** amb ultrasons i encendre un LED (o brunzidor) quan estàs **per sota d'una distància**.
- Codi comentat; distància visible al Monitor Sèrie.

**Ampliacions graduades.**
1. *(bàsica)* Encapsula la mesura en una **funció** `mesura_distancia()`.
2. *(notable)* Fes **tres trams** (lluny/mig/a prop) amb avisos diferents.
3. *(⭐⭐⭐)* Avís **proporcional**: el ritme del parpelleig/so augmenta com més a prop.

---

## 🎛️ Repte C · Instrument o comptador interactiu

**Context.** Un control de joc o un instrument: un **potenciòmetre** que regula alguna cosa, o un **polsador** que compta sense rebots.

> *Client: estudi de videojocs / fabricant de comandaments · Lliurable: comandament o comptador interactiu · Món real: interfícies d'usuari i instrumentació.*

**Què treballa.** Entrada analògica (potenciòmetre) o digital amb *debounce*; relació entrada→sortida.

**Requisit mínim.**
- *Opció 1:* un **potenciòmetre** que controla la brillantor d'un LED (o el ritme d'un parpelleig).
- *Opció 2:* un **polsador amb debounce** que **compta** premudes i les mostra (Monitor Sèrie / LEDs).

**Ampliacions graduades.**
1. *(bàsica)* Mostra el valor/recompte de forma clara al Monitor Sèrie.
2. *(notable)* Mapeja l'entrada (`map()`) a un rang útil (p. ex. 0–255 de PWM).
3. *(⭐⭐⭐)* Combina **dues entrades** (potenciòmetre + polsador) per a un mini-instrument.

---

## Material necessari (segons repte)
- Arduino UNO + USB · LDR / sensor d'ultrasons HC-SR04 / potenciòmetre / polsador · LED + resistència (o brunzidor) · resistència de 10 kΩ per a divisor/pull-up · o **Tinkercad/Wokwi**.

## Per on començar (mètode de projecte + PRIMM)
1. **Analitzar:** quina magnitud mesuro i quina decisió en depèn?
2. **Dissenyar (Predir):** quin llindar/lògica? Predigues els valors que donarà el sensor.
3. **Prototipar:** parteix de `Classes/SA3/codi/` (`01_polsador_debounce`, `02_potenciometre_ldr`, `03_ultrasons_funcio`, `04_alarma_aparcament`).
4. **Provar:** llegeix valors reals al Monitor Sèrie i ajusta el llindar.
5. **Millorar:** afegeix histèresi, funcions o `map()`.

## Com s'avalua
| Rúbrica | Per què |
|---|---|
| **R1** (codi) | Lògica de decisió, funcions, depuració amb Serial. |
| **R2** (circuit) | Connexió correcta de sensors (divisor/pull-up). |
| **R4** (documentació) | Quadern tècnic: calibratge del llindar i proves. |

## Producte / entrega
- Codi `.ino` comentat + esquema + quadern tècnic (com he calibrat el llindar i quins valors he mesurat).

---

## Orientació docent
- **Errors freqüents:** llegir un sensor analògic amb `digitalRead`; oblidar la resistència de *pull-up*/divisor; no filtrar el **rebot** del polsador; llindar fix sense calibrar.
- **Diferenciació:** el mínim (llegir + decidir) és comú; la histèresi i la resposta proporcional connecten amb la SA6.
- **Gestió d'aula:** insistir en l'ús del **Monitor Sèrie** com a eina de depuració. Tot simulable a Tinkercad (ultrasons i LDR inclosos).
- **Vincle avaluació:** R1 + R2 + R4; pont natural cap a control (SA6).
