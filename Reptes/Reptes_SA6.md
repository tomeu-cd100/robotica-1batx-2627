# Reptes SA6 · Sistemes de control

> 🧑‍🎓 **Quan toca fer-ne un?** És l'**ampliació ⭐** de la SA: comença'l quan tinguis el **nucli al dia** (les activitats de la fitxa). Tria'n **UN**, ensenya'l al docent perquè el validi i pinta l'estrella al [tauler de reptes](../Classes/00_General/00_Tauler_reptes.md).

**Tria UN dels tres reptes.** Tots fan **més intel·ligent el control del teu braç MeArm**: implementen un **llaç de control** (mesurar → comparar amb una consigna → actuar) sobre la pinça, la base o les quatre articulacions. Mateix requisit de seguretat: servos a les **piles** amb GND comú i cap servo fora del seu rang segur.

> **Continguts SA6:** llaç obert vs tancat, realimentació, consigna, histèresi, màquina d'estats, control proporcional. · **Codi base:** `Classes/SA6/codi/`. · **Pins:** el [mapa del braç](../Classes/00_General/00_Projecte_T2_Brac.md#cablatge).

> **Format "producte real":** cada repte simula un **encàrrec** amb **client**, **lliurable** i **ús al món real**. El requisit tècnic no canvia.

---

## 🤏 Repte A · La pinça automàtica amb LED d'estat

**Context.** Una cadena d'embalatge vol que la pinça agafi sola les peces que arriben, **sense clic-clic**, i que un operari pugui veure de lluny si té una peça agafada.

> *Client: una cadena d'embalatge · Lliurable: pinça automàtica senyalitzada · Món real: pinces de les cèl·lules robotitzades, portes automàtiques, termòstats (la mateixa histèresi).*

**Què treballa.** Histèresi (dos llindars + estat), senyalització, filtrat de sensors.

**Requisit mínim.**
- La pinça es tanca a menys de `TANCA_CM` i només s'obre a més d'`OBRE_CM` (histèresi).
- Un **LED** (D5) està encès mentre la pinça té una peça.

**Ampliacions graduades.**
1. *(bàsica)* La **finestra** d'histèresi es regula amb un potenciòmetre.
2. *(notable)* **Filtre de soroll:** la distància és la mitjana de 5 mesures.
3. *(⭐⭐⭐)* **Compta les peces** agafades i ho mostra pel Monitor sèrie.

    **Fites** (valida-les en ordre):
    1. El LED surt de la variable d'estat (`pincaTancada`), no d'una altra comparació amb la distància.
    2. Amb la mà quieta just a la frontera, la pinça **no** fa clic-clic en cap ajust del potenciòmetre.
    3. Deu peces seguides = comptador a 10 (cap peça comptada dues vegades).

---

## 🏠 Repte B · Homing i seqüència segura

**Context.** Un taller vol que el braç trobi el seu zero en engegar-se (encara que algú l'hagi mogut amb la mà) i que **s'aturi** si topa amb alguna cosa mentre treballa.

> *Client: un taller amb braços col·laboratius · Lliurable: braç amb homing i aturada per xoc · Món real: tots els robots industrials fan homing en engegar i tenen aturada d'emergència.*

**Què treballa.** Llaç tancat (homing), seguretat, `millis()`, rearmament.

**Requisit mínim.**
- En engegar, la base fa **homing** fins al final de carrera (D2).
- Després repeteix una **seqüència de gestos**; si el sensor toca enmig, el braç **s'atura** i ho diu.

**Ampliacions graduades.**
1. *(bàsica)* La seqüència és **relativa al zero** trobat: si mous el sensor, la tasca es desplaça amb ell.
2. *(notable)* La seqüència va amb `millis()`: el xoc es detecta **a l'instant**, no al final del gest.
3. *(⭐⭐⭐)* **Rearmament:** amb el sensor alliberat, el polsador A fa un nou homing i torna a començar.

    **Fites** (valida-les en ordre):
    1. Mou el braç amb la mà abans d'engegar-lo: el homing el troba igual.
    2. Toca el sensor a mig gest: el braç s'atura **abans** d'acabar aquell gest.
    3. Amb el sensor premut, el polsador A **no** rearma (una emergència no es rearma sola).

> **Cap al producte:** és el mateix patró de l'estat EMERGÈNCIA de la màquina d'estats del braç.

---

## 🎚️ Repte C · Moviment proporcional a les 4 articulacions

**Context.** El braç ha de moure una tassa plena sense vessar-la: res de salts, totes les articulacions han d'arrencar i frenar **suaument i alhora**.

> *Client: un restaurant robotitzat · Lliurable: braç amb moviment suau · Món real: perfils de velocitat dels robots industrials, càmeres estabilitzades, el PID dels drons.*

**Què treballa.** Control proporcional, arrays, coordinació de diverses articulacions.

**Requisit mínim.**
- Cada potenciòmetre marca la **consigna** de la seva articulació, i cada servo s'hi acosta una fracció `K` de l'error a cada volta.

**Ampliacions graduades.**
1. *(bàsica)* Les quatre articulacions **arriben alhora** (el pas de cadascuna s'escala segons l'error més gran).
2. *(notable)* **Velocitat màxima:** cap articulació es mou més de 3° per volta.
3. *(⭐⭐⭐)* El polsador A canvia `K` (0.05 / 0.1 / 0.3) i el Serial Plotter mostra les quatre posicions.

    **Fites** (valida-les en ordre):
    1. Les quatre articulacions es controlen amb **arrays i un `for`**, no amb quatre blocs copiats.
    2. Gira dos potenciòmetres de cop: les dues articulacions arriben **al mateix moment**.
    3. Al Serial Plotter, amb `K = 0.3` les corbes són més dretes però mai superen el pendent de la velocitat màxima.

---

## 🎨 Fes-lo teu (tria abans de començar)

> El repte fixa **què** ha de fer el braç; **el context el poses tu**. Tria i anota-ho al quadern:
> - **A:** quina **peça** agafa la teva pinça i quina finestra d'histèresi li va bé (mesura-la!).
> - **B:** quina **tasca** repeteix el braç després del homing.
> - **C:** quin **objecte delicat** transporta el teu braç i quina `K` li va millor.

## Material necessari
- El teu MeArm amb l'Arduino, les piles i els potenciòmetres. **A:** l'ultrasons (D7/D8) i un LED amb 220 Ω al D5. **B:** el sensor de col·lisió (D2) i el polsador A (D3). **C:** el polsador A (D3) per a l'ampliació.

## Per on començar (mètode de projecte + PRIMM)
1. **Analitzar:** quina és la consigna, quin el sensor (realimentació) i quin l'actuador?
2. **Dissenyar (Predir):** diagrama de blocs i, si cal, diagrama d'estats.
3. **Prototipar:** parteix de `Classes/SA6/codi/` (`01_llac_obert_vs_tancat`, `02_pinca_histeresi`, `04_control_proporcional`).
4. **Provar:** observa la resposta al **Serial Plotter**.
5. **Millorar:** ajusta llindars, `K` o pauses mirant el braç.

## Com s'avalua
| Rúbrica | Per què |
|---|---|
| **R1** (codi) | Lògica de control, arrays, estats, llegibilitat. |
| **R3** (projecte) | El llaç de control funciona i és **estable** sobre el braç. |
| **R4** (documentació) | Diagrama de blocs + anàlisi de la resposta al quadern. |

## Producte / entrega
- Codi `.ino` comentat + diagrama de blocs + captura del Serial Plotter + quadern tècnic.

---

## Orientació docent
- **Errors freqüents:** un sol llindar (clic-clic); condicions d'histèresi sense l'estat; `delay()` llarg a la seqüència (el xoc es detecta tard); `angle` declarat `int` al proporcional (passos perduts).
- **Diferenciació:** A és el més assequible (histèresi aplicada), B treballa la seguretat i el C els arrays i la coordinació.
- **Gestió d'aula:** el Serial Plotter és l'eina clau; la histèresi també es pot simular a Wokwi sense el braç.
- **Solucionari:** `Reptes/Solucionari/SA6/` (`A_pinca_histeresi`, `B_homing_sequencia`, `C_proporcional_4`; `minim` i `ampliat`).

---

## 🤖 Cap al robot del trimestre

Aquest trimestre **tot és el braç** ([dossier](../Classes/00_General/00_Projecte_T2_Brac.md) · [fil conductor](../Classes/00_General/00_Fil_conductor_robots.md)). El producte de la SA6 és la **màquina d'estats del braç** (repòs, manual, replay, emergència) amb el comandament per ràdio; els reptes n'afinen peces: la **pinça** (A), la **seguretat** (B, el mateix patró de l'emergència) i la **suavitat** (C).
