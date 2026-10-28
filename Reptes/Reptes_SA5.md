# Reptes SA5 · micro:bit i MicroPython

> 🧑‍🎓 **Quan toca fer-ne un?** És l'**ampliació ⭐** de la SA: comença'l quan tinguis el **nucli al dia** (les activitats de la fitxa). Tria'n **UN**, ensenya'l al docent perquè el validi i pinta l'estrella al [tauler de reptes](../Classes/00_General/00_Tauler_reptes.md).

**Tria UN dels tres reptes.** Tots són **millores del comandament del teu braç MeArm**: es programen en **MicroPython** i parlen el mateix **protocol d'ordres** que l'Arduino del braç ja entén (`B±`, `D±`, `E±`, `P`, `G`). Mateix requisit de base: el grup de ràdio és el teu número de llista. Editor: python.microbit.org (té simulador) o Thonny.

> **Continguts SA5:** MicroPython (indentació, `while True`, llistes), `display`, botons, acceleròmetre, ràdio. · **Codi base:** `Classes/SA5/codi/` (`.py`). · **Protocol:** [dossier del braç](../Classes/00_General/00_Projecte_T2_Brac.md#el-protocol-dordres).

> **Format "producte real":** cada repte simula un **encàrrec** amb **client**, **lliurable** i **ús al món real**. El requisit tècnic no canvia.

---

## 🎛️ Repte A · El selector per ràdio

**Context.** Un comandament de grua professional no té un gest per a cada articulació: té un **selector** i una palanca. Tries què mous i després el mous.

> *Client: un taller que fa servir el braç amb una sola mà · Lliurable: comandament amb selector · Món real: comandaments de grues, excavadores i braços de demolició.*

**Què treballa.** Llistes, `was_pressed()`, construir un text (`lletra + "+"`), ràdio.

**Requisit mínim.**
- Els botons A i B trien l'articulació (B, E, D, P), com al [selector de la S1](../Classes/SA5/codi/01_selector_articulacio_EXPLICACIO.md).
- Inclinar endavant/enrere envia `"<lletra>+"` o `"<lletra>-"` de l'articulació triada (amb la P, qualsevol inclinació envia `P` una vegada).

**Ampliacions graduades.**
1. *(bàsica)* La pantalla mostra la lletra triada i, quan envia, una fletxa.
2. *(notable)* **A i B alhora bloquegen** el comandament (icona de prohibit): no s'envia res fins que es desbloqueja.
3. *(⭐⭐⭐)* En canviar d'articulació, el comandament envia un **«saludet»** (tres `+` i tres `-`) perquè es vegi al braç quina s'ha triat.

    **Fites** (valida-les en ordre):
    1. Una sola llista `ARTICULACIONS` i un sol índex `triada`: cap `if` per lletra.
    2. Amb el comandament bloquejat, el braç no es mou per molt que l'inclinis.
    3. El saludet es veu al braç **sense haver de mirar la pantalla** del comandament.

---

## 🎚️ Repte B · El comandament fi

**Context.** Amb el comandament de la S3, el braç es mou sempre igual de ràpid: o res, o tot. Per agafar una peça petita cal **precisió**: poc moviment quan inclines poc.

> *Client: un laboratori que manipula mostres delicades · Lliurable: comandament proporcional · Món real: els joysticks analògics, els comandaments de drons, la cirurgia robòtica.*

**Què treballa.** Zona morta, valor absolut, proporcionalitat (una regla de tres), mitjana.

**Requisit mínim.**
- Inclinació esquerra/dreta → `B-`/`B+` i endavant/enrere → `D-`/`D+`, amb una **zona morta**: amb la placa gairebé plana no s'envia res.

**Ampliacions graduades.**
1. *(bàsica)* **Velocitat proporcional:** com més inclines, més ordres per segon (pausa de 400 ms a 80 ms).
2. *(notable)* **Calibratge en engegar:** la postura de repòs de la teva mà (mitjana de 20 lectures) passa a ser el zero.
3. *(⭐⭐⭐)* La pantalla mostra la **intensitat** amb una barra d'1 a 5 LED.

    **Fites** (valida-les en ordre):
    1. Amb la mà relaxada, el braç no es mou gens (zona morta ben triada i justificada al quadern).
    2. Inclinant a poc a poc, el braç accelera a poc a poc: es nota la diferència entre 30° i 60°.
    3. Si engegues el comandament amb la mà torta, el calibratge fa que «torta» sigui el nou repòs.

---

## 🎮 Repte C · El comandament complet amb gravació

**Context.** El braç de la SA6 tindrà un mode **replay**: grava punts i els repeteix sol. Per gravar-los cal un gest al comandament, i per controlar-ho tot, les quatre articulacions.

> *Client: un taller de reparacions que vol ensenyar tasques al braç · Lliurable: comandament de les 4 articulacions amb gravació · Món real: l'ensenyament per demostració dels cobots.*

**Què treballa.** Combinar sensors i botons, evitar repeticions (una ordre per gest), comptadors.

**Requisit mínim.**
- Les quatre articulacions: inclinació → `B±` i `D±`; mantenir A / B → `E+` / `E-`; A+B → `P` (una sola vegada per premuda).
- Sacsejar envia `G` (gravar un punt).

**Ampliacions graduades.**
1. *(bàsica)* El comandament **compta els punts gravats** i els mostra; al 30è es nega a gravar més (com el braç).
2. *(notable)* El **pont amb botons d'estat:** A envia `A` i B envia `R` a l'Arduino (els botons de la màquina d'estats de la SA6).
3. *(⭐⭐⭐)* **Mode lent** amb el logo tàctil (micro:bit V2): ordres cada 300 ms en lloc de 100 ms.

    **Fites** (valida-les en ordre):
    1. Mantenint A+B, la pinça canvia **una sola vegada** (no fa clic-clic).
    2. El comptador del comandament i el del braç (Monitor sèrie de la SA6) coincideixen.
    3. Amb el mode lent, aconsegueixes posar la pinça damunt d'una moneda.

> **Cap a SA6:** el repte C és el comandament de referència del braç: a la SA6, `G`, `A` i `R` faran funcionar la màquina d'estats.

---

## 🎨 Fes-lo teu (tria abans de començar)

> El repte fixa **què** ha de fer el comandament; **el context el poses tu**. Tria i anota-ho al quadern:
> - **A:** les **imatges** del selector (dissenya una icona pròpia per a cada articulació amb `Image("...")`).
> - **B:** la **zona morta** que va bé a la teva mà (mesura-la!) i la velocitat màxima que et deixa ser precís.
> - **C:** quin **gest** fa cada cosa (si vols, canvia'l: el protocol no canvia, només qui l'envia).

## Material necessari
- Dues micro:bit (comandament i pont/receptor) + el braç amb l'Arduino i el cable del pont · ordinador amb python.microbit.org o **Thonny**. **C ⭐⭐⭐:** micro:bit **V2** (logo tàctil).
- Sense braç a mà? El **receptor de prova** de la [pràctica 3](../Classes/SA5/codi/03_radio_comandament_EXPLICACIO.md) mostra les ordres que arriben.

## Per on començar (mètode de projecte + PRIMM)
1. **Analitzar:** quines ordres ha d'enviar el comandament i amb quin gest?
2. **Dissenyar (Predir):** escriu l'estructura `while True:` i el que anirà sagnat dins.
3. **Prototipar:** parteix de `Classes/SA5/codi/` (`01_selector_articulacio.py`, `02_inclinacio.py`, `03_radio_comandament.py`).
4. **Provar:** primer amb el receptor de prova; després, amb el pont i el braç.
5. **Millorar:** ajusta llindars i pauses mirant el braç, no la pantalla.

## Com s'avalua
| Rúbrica | Per què |
|---|---|
| **R1** (codi) | Indentació correcta, lògica, llegibilitat en Python. |
| **R3** (projecte) | El braç respon al comandament de manera fiable i controlable. |
| **R4** (documentació) | Quadern tècnic: diferències Arduino↔MicroPython amb el protocol com a exemple. |

## Producte / entrega
- Codi `.py` comentat + vídeo curt del braç movent-se amb el comandament + entrada al quadern tècnic.

---

## Orientació docent
- **Errors freqüents:** `IndentationError` (sagnat); grups de ràdio repetits entre alumnes (els braços s'obeeixen creuats); confondre `is_pressed()` amb `was_pressed()`; enviar la `P` a cada volta.
- **Diferenciació:** A treballa llistes, B proporcionalitat i calibratge, C integració. El C és el pont natural cap a la SA6.
- **Gestió d'aula:** el **simulador** permet treballar sense maquinari; el **receptor de prova** permet validar sense el braç. Recomanar repassar `Classes/SA0/SA0_guia_programacio.md` (Part B i taula comparativa).
- **Solucionari:** `Reptes/Solucionari/SA5/` (`A_selector_radio`, `B_inclinacio_fina`, `C_comandament_complet`; `minim` i `ampliat`).

---

## 🤖 Cap al robot del trimestre

Aquest trimestre **tot és el braç** ([dossier](../Classes/00_General/00_Projecte_T2_Brac.md) · [fil conductor](../Classes/00_General/00_Fil_conductor_robots.md)). El braç que vas muntar a la SA4 **no es toca**: continua amb el seu Arduino. Els tres reptes milloren el seu comandament sense fils, i el **C** és exactament el comandament que la màquina d'estats de la SA6 necessita (gravar amb `G`, canviar d'estat amb `A` i `R`).
