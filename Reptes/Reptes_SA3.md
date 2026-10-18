# Reptes SA3 · Entrades i sensors

> 🧑‍🎓 **Quan toca fer-ne un?** Els reptes són **extra ⭐**. Comença'n un quan ja tinguis fetes les pràctiques de la sessió. Tria'n **UN**, ensenya'l al docent quan funcioni i, si te'l valida, pinta l'estrella al [tauler de reptes](../Classes/00_General/00_Tauler_reptes.md).

**Tria UN dels tres reptes.** Tots **llegeixen un sensor** i **decideixen** què fer amb un `if`. Els tres tenen un **mínim** igual de difícil i després **nivells** per anar més lluny. Els pots provar abans a Tinkercad o a Wokwi.

> **El codi de partida** és a les pràctiques de la SA3 (`Classes/SA3/codi/`).

> **Com si fos un encàrrec de veritat:** cada repte té un **client** (qui te l'encarrega), una **cosa a entregar** i **on es fa servir** a la vida real.

---

## 🌙 Repte A · Llum automàtica de nit

**De què va.** Un llum que **s'encén sol quan es fa fosc** i s'apaga quan es fa de dia. Així no gasta energia de més.

> *Client: l'ajuntament (llums del carrer) · Entregues: un fanal automàtic · A la vida real: els fanals que s'encenen sols al vespre.*

**Què practiques.** Llegir el sensor de llum i decidir amb una ratlla (el llindar) i un `if`.

**El mínim.**
- Llegir el **sensor de llum** i encendre un LED quan el número baixa d'una **ratlla** (el llindar).
- Comentaris al codi, i el número del sensor visible al **Monitor sèrie**.

**Nivells per anar més lluny.**
1. *(bàsic)* Tria la ratlla **mirant els números de veritat** al Monitor sèrie.
2. *(notable)* Fes servir **dues ratlles** (una per encendre i una altra per apagar) perquè el llum no parpellegi quan es fa fosc a poc a poc.
3. *(⭐⭐⭐)* Fes que el LED faci **més llum com més fosc** sigui (amb `analogWrite`).

    **Comprova-ho així** (en ordre):
    1. Saps entre quins números es mou **el teu** sensor a classe (amb molta llum i tapat del tot) i ho tens apuntat al quadern.
    2. Amb `map()` converteixes el número del sensor en una llum de 0 a 255, **al revés** (més fosc → més llum), i el número sempre queda entre 0 i 255 (pista: `constrain()`).
    3. Amb llum el LED està apagat, a les fosques brilla al màxim i entremig canvia **a poc a poc**, sense salts.

---

## 🅿️ Repte B · Sensor d'aparcament

**De què va.** El sensor que avisa quan t'acostes massa a la paret en aparcar: com més a prop, més ràpid pita o fa pampallugues.

> *Client: un taller de cotxes · Entregues: un sensor d'aparcament · A la vida real: els cotxes que fan «bip-bip» quan aparques.*

**Què practiques.** El sensor d'ultrasons, mesurar distàncies i decidir per zones.

**El mínim.**
- Mesurar la **distància** amb l'ultrasons i encendre un LED (o fer sonar el brunzidor) quan estàs **més a prop** d'una distància.
- Comentaris al codi, i la distància visible al Monitor sèrie.

**Nivells per anar més lluny.**
1. *(bàsic)* Posa la mesura dins d'una **funció** que **et torni** la distància.
2. *(notable)* Fes **tres zones** (lluny, compte, perill) amb avisos diferents.
3. *(⭐⭐⭐)* Fes que els bips vagin **més ràpid com més a prop**.

    **Comprova-ho així** (en ordre):
    1. La distància en centímetres surt bé i sense salts estranys al Monitor sèrie (fora els 0).
    2. La pausa entre bips la calcules amb `map()` a partir de la distància. Mira els números al Monitor abans d'escoltar res.
    3. Els bips s'acceleren a poc a poc quan t'acostes i, molt a prop, el so és **continu** (com als cotxes de veritat).

---

## 🎛️ Repte C · Instrument o comptador

**De què va.** Un comandament de joc o un instrument: un **potenciòmetre** que regula alguna cosa, o un **polsador** que compta sense equivocar-se.

> *Client: una empresa de videojocs · Entregues: un comandament o un comptador · A la vida real: els comandaments de les consoles i els aparells de música.*

**Què practiques.** El potenciòmetre o el polsador amb antirebot, i fer que el que llegeixes canviï alguna cosa.

**El mínim.**
- *Opció 1:* un **potenciòmetre** que regula la llum d'un LED (o la velocitat d'un parpelleig).
- *Opció 2:* un **polsador amb antirebot** que **compta** les premudes i les mostra (al Monitor sèrie o amb LED).

**Nivells per anar més lluny.**
1. *(bàsic)* Mostra el número de manera clara al Monitor sèrie.
2. *(notable)* Fes servir `map()` per passar el que llegeixes a l'escala que necessites (per exemple, de 0 a 255 per al LED).
3. *(⭐⭐⭐)* Ajunta **les dues coses** (potenciòmetre + polsador) en un mini-instrument.

    **Comprova-ho així** (en ordre):
    1. Cada part funciona **per separat** al mateix circuit: el potenciòmetre regula la llum i el polsador compta sense errors.
    2. Les dues funcionen alhora dins del mateix `loop()` sense que una faci perdre l'altra (cap `delay()` llarg que et faci perdre premudes).
    3. Té sentit com a instrument (per exemple, el polsador fa sonar la nota que el potenciòmetre tria). Ensenya-ho a algú.

---

## 🎨 Fes-lo teu (decideix-ho abans de començar)

> El repte diu **què** ha de fer el circuit. **Per a què serveix, ho tries tu.** Apunta-ho al quadern:
> - **A:** decideix **on aniria el teu llum** (un passadís, una caseta, una escala…) i mira quanta llum hi ha allà per triar la ratlla.
> - **B:** inventa **el so d'avís**: quin to i quin ritme avisen bé sense ser molestos.
> - **C:** tria **quin instrument o joc** fas: un theremin, una sirena, un comptador de gols…

## Què necessites
- Arduino UNO + cable USB · sensor de llum, ultrasons, potenciòmetre o polsador · LED + resistència (o brunzidor) · una resistència de 10 kΩ per al sensor de llum · o **Tinkercad/Wokwi**.

## Per on començar
1. **Pensa:** què ha de **notar** el circuit i què ha de **fer** quan ho nota?
2. **Endevina:** quins números creus que donarà el sensor? Quina ratlla posaràs?
3. **Comença d'una pràctica:** parteix del codi d'una pràctica de la SA3 (el polsador, el sensor de llum, l'ultrasons o l'alarma).
4. **Prova:** mira els números de veritat al Monitor sèrie i ajusta la ratlla.
5. **Millora:** posa dues ratlles, fes funcions o fes servir `map()`.

## Com es corregeix
| Rúbrica | Què es mira |
|---|---|
| **R1** (codi) | Que el programa decideixi bé, que tingui funcions i que facis servir el Monitor per comprovar-ho. |
| **R2** (circuit) | Que els sensors estiguin ben connectats (amb la resistència quan cal). |
| **R4** (quadern) | Que apuntis com has triat la ratlla i quins números has vist. |

## Què entregues
- El codi `.ino` amb comentaris + el dibuix dels cables + el quadern tècnic (com has triat la ratlla i quins números has mesurat).

---

## Orientació docent
- **Errors freqüents:** llegir un sensor analògic amb `digitalRead`; oblidar la resistència de *pull-up*/divisor; no filtrar el **rebot** del polsador; llindar fix sense calibrar.
- **Diferenciació:** el mínim (llegir + decidir) és comú; la histèresi i la resposta proporcional connecten amb la SA6.
- **Gestió d'aula:** insistir en l'ús del **Monitor Sèrie** com a eina de depuració. Tot simulable a Tinkercad (ultrasons i LDR inclosos).
- **Vincle avaluació:** R1 + R2 + R4; pont natural cap a control (SA6).

---

## 🤖 Cap al robot del trimestre

Aquest trimestre, tot el que fas serveix per a la **mascota** ([dossier](../Classes/00_General/00_Projecte_T1_Mascota.md) · [fil conductor](../Classes/00_General/00_Fil_conductor_robots.md)):

- **Repte A (llum de nit)** → el sensor de llum de la mascota: **s'adorm** (ulls apagats) quan es fa fosc i **es desperta** quan torna la llum.
- **Repte B (sensor d'aparcament)** → el PIR de la mascota: **saluda** (llums o so) quan algú **s'hi acosta**.
- **Repte C (instrument o comptador)** → el polsador de la mascota: cada **carícia** li canvia l'humor o li fa una animació.

El micròfon (despertar-se amb una picada de mans) i el sensor de temperatura són altres reaccions que hi pots afegir. La mascota es talla a la Sessió 3 de la SA2 i es munta a la Sessió 3 de la SA3, amb la mateixa idea de sempre: **llegeix → compara → reacciona**. El producte final és la mascota amb **3 reaccions** i la seva fitxa de personalitat.
