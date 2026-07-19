# Reptes SA3 · Entrades i sensors

> 🧑‍🎓 **Quan toca fer-ne un?** És l'**ampliació ⭐** de la SA: comença'l quan tinguis el **nucli al dia** (les activitats de la fitxa). Tria'n **UN**, ensenya'l al docent perquè el validi i pinta l'estrella al [tauler de reptes](../Classes/00_General/00_Tauler_reptes.md).

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

    **Fites** (valida-les en ordre):
    1. Coneixes el rang **real** de la LDR a l'aula (valor amb llum plena i tapada del tot), observat al Monitor Sèrie i apuntat al quadern.
    2. Amb `map()` converteixes la lectura en una brillantor 0–255 **invertida** (més fosc → valor més alt) i el número surt sempre dins de rang pel Monitor Sèrie (mira `constrain()`).
    3. El LED queda apagat del tot amb llum plena, brilla al màxim a les fosques i fa una transició **contínua** (sense salts) entremig.

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

    **Fites** (valida-les en ordre):
    1. La distància en cm surt fiable i contínua pel Monitor Sèrie (descarta lectures 0 o fora de rang).
    2. L'**interval entre bips** es calcula amb `map()` a partir de la distància: comprova els números pel Monitor Sèrie abans d'escoltar res.
    3. El ritme s'accelera de manera contínua en acostar-te i, per sota d'una distància crítica, passa a **so continu** (com els sensors reals).

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

    **Fites** (valida-les en ordre):
    1. Cada entrada funciona **per separat** al mateix circuit: el potenciòmetre regula (PWM) i el polsador compta amb *debounce*.
    2. Les dues conviuen al mateix `loop()` sense bloquejar-se (cap `delay()` llarg que faci perdre premudes).
    3. La combinació té sentit d'instrument (p. ex. el polsador canvia el mode o dispara la nota que el potenciòmetre afina): fes-ne una demostració d'ús davant d'algú.

---

## 🎨 Fes-lo teu (tria abans de començar)

> El repte fixa **què** ha de fer el sistema; **el context el poses tu**. Tria i anota-ho al quadern:
> - **A:** decideix **on aniria la teva llum** (passadís, caseta, escala…) i mesura la foscor real d'allà per fixar el llindar.
> - **B:** dissenya **el so d'avís**: quines freqüències i quin ritme avisen millor sense molestar.
> - **C:** tria **quin instrument o efecte** fas: theremin, sirena, comptador de gols…

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

---

## 🤖 Cap al robot del trimestre

Aquest trimestre tot suma cap a la **mascota reactiva** ([dossier](../Classes/00_General/00_Projecte_T1_Mascota.md) · [fil conductor](../Classes/00_General/00_Fil_conductor_robots.md)):

- **Repte A (llum automàtica nocturna)** → el sensor TEMT6000 de la mascota: **dorm** (ulls apagats) quan es fa fosc i es **desperta** amb la llum del dia.
- **Repte B (sensor d'aparcament)** → el PIR de la mascota: **saluda** (parpelleig o so) quan algú **s'hi acosta**, amb la mateixa lògica de trams que l'avís antixoc.
- **Repte C (instrument o comptador)** → el polsador de la mascota: cada **carícia** (premuda) li canvia l'humor o li dispara una animació, com el comptador que has programat.

El micròfon i el DHT11 de la caixa —despertar-se amb una picada de mans, reaccionar a la temperatura— són les altres reaccions que hi afegeixes: la mascota es talla a la S4 de SA2 (sessió de fabricació) i es munta i sensoritza durant les sessions de SA3, amb la mateixa lògica entrada→decisió del repte que hagis triat. El producte final de SA3-S3 és la mascota muntada amb **≥3 reaccions sensor→comportament** i la seva fitxa de personalitat.
