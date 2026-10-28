# Reptes SA4 · Moviment: servos, motors i ponts H

> 🧑‍🎓 **Quan toca fer-ne un?** És l'**ampliació ⭐** de la SA: comença'l quan tinguis el **nucli al dia** (les activitats de la fitxa). Tria'n **UN**, ensenya'l al docent perquè el validi i pinta l'estrella al [tauler de reptes](../Classes/00_General/00_Tauler_reptes.md).

**Tria UN dels tres reptes.** Tots són **missions del teu braç MeArm**: parteixen del producte de la S4 (el braç amb quatre potenciòmetres) i li donen una capacitat nova. Mateix requisit de seguretat per a tots: servos a les **piles** amb GND comú i **cap servo fora del seu rang segur**.

> **Format "producte real":** cada repte simula un **encàrrec professional**. Hi trobaràs **qui** us el demana (client), **quin producte** heu de lliurar i **per a què** serveix al món real. El requisit tècnic és el mateix d'abans; el marc us ajuda a decidir disseny i prioritats com ho faria un equip d'enginyeria.

> **Continguts SA4:** servomotor (`Servo.h`), rang segur, funcions amb paràmetres, sensor → moviment, `millis()`. · **Codi base:** `Classes/SA4/codi/` (sobretot `04_brac_potenciometres`). · **Pins:** el [mapa del braç](../Classes/00_General/00_Projecte_T2_Brac.md#cablatge) (polsadors A/B al D3/D4).

---

## 🏠 Repte A · El braç amb botó de casa

**Client.** Un **laboratori escolar** fa servir braços manipulats per alumnes. Vol que, passi el que passi, un botó porti el braç a una **posició de casa** segura (recollit i amb la pinça tancada).

**Producte a lliurar.** El MeArm amb potenciòmetres i un **polsador de casa**.

**Per a què serveix al món real.** Tots els robots industrials tenen una posició de repòs (*home*) on es deixen en acabar o quan algú s'hi ha d'acostar.

**Què treballa.** Dos modes de control (manual / casa) i la lectura d'un polsador.

**Requisit mínim.**
- Mentre es mantingui premut el polsador A (D3), el braç va a la posició de casa; si no, obeeix els potenciòmetres.
- Codi comentat.

**Ampliacions graduades.**
1. *(bàsica)* La tornada a casa és **suau** (un grau cada pocs mil·lisegons, sense salts).
2. *(notable)* El botó és un **commutador**: una premuda envia el braç a casa i s'hi queda; una altra el retorna als potenciòmetres (amb **antirebot**).
3. *(⭐⭐⭐)* Un **LED d'estat** (D5) indica quan el braç és en mode casa.

    **Fites** (valida-les en ordre):
    1. El mode viu en **una sola variable** (p. ex. `modeCasa`) i el LED es pinta a partir d'ella, no de la lectura del botó.
    2. La tornada suau es fa amb `millis()`: mentre torna, el botó continua responent.
    3. Prova d'estrès: 10 premudes seguides sense que el LED i el mode quedin mai incoherents.

---

## 🍬 Repte B · El braç dispensador

**Client.** Una **botiga de llaminadures** vol un braç d'aparador: cada vegada que un client prem el botó, el braç agafa una llaminadura de l'**estació de recollida** i la deixa a la safata del client.

**Producte a lliurar.** El MeArm executant un **cicle complet d'agafar i deixar** per cada premuda.

**Per a què serveix al món real.** *Pick and place* industrial, dispensadors de farmàcia, cadenes d'embalatge.

**Què treballa.** Descomposició d'una tasca en gestos i **funcions amb paràmetres** (`posa(base, esquerre, dret, pinca)`).

**Requisit mínim.**
- Una premuda del polsador A = **un** cicle: anar a l'estació, baixar, tancar la pinça, pujar, girar, baixar, obrir, tornar a casa.
- Una funció `posa()` per a la posició sencera, amb el **rang segur** (`constrain()`) a dins.

**Ampliacions graduades.**
1. *(bàsica)* Moviment **suau** entre posicions: les quatre articulacions arriben alhora.
2. *(notable)* Només dispensa si l'**ultrasons** veu una peça a l'estació (si no, ho avisa pel Monitor sèrie).
3. *(⭐⭐⭐)* Compta les **dosis** i s'atura en arribar a un màxim (diposit esgotat).

    **Fites** (valida-les en ordre):
    1. Cada gest de la tasca és una crida a `posa()` amb un comentari que diu què fa (*agafa*, *puja*…).
    2. El moviment suau interpola **les quatre articulacions alhora** (cap no arriba abans que les altres).
    3. El cicle complet es repeteix **5 cops seguits** sense recol·locar res a mà, i a la sisena premuda el braç es nega a moure's.

---

## 🧠 Repte C · El braç que aprèn (registre i replay)

**Client.** Un **taller de reparacions** vol ensenyar tasques noves al braç **sense programar**: el tècnic el mou a mà amb els potenciòmetres, va gravant posicions, i el braç les repeteix soles.

**Producte a lliurar.** El MeArm amb **gravació de punts** (polsador A) i **reproducció** (polsador B).

**Per a què serveix al món real.** És l'*ensenyament per demostració* dels robots col·laboratius (cobots): l'operari mou el braç i el robot aprèn la trajectòria.

**Què treballa.** **Arrays** (una llista per servo), comptadors i recorreguts amb `for`.

**Requisit mínim.**
- El polsador A grava la posició actual (fins a 10 punts); el polsador B reprodueix tots els punts en ordre.
- Una premuda = un punt (no se'n graven deu si mantens premut).

**Ampliacions graduades.**
1. *(bàsica)* El replay va **suau** d'un punt al següent.
2. *(notable)* El replay es fa amb `millis()` i es pot **avortar** amb el polsador A a mig camí.
3. *(⭐⭐⭐)* La seqüència es **guarda a l'EEPROM**: el braç la recorda encara que el desendollis.

    **Fites** (valida-les en ordre):
    1. Els punts viuen en **arrays** (o un `struct`) i el Monitor sèrie diu quants n'hi ha gravats.
    2. Durant el replay, una premuda de A l'atura **a l'instant**, no en acabar el punt.
    3. Desendolla l'Arduino, torna'l a endollar i prem B: el braç repeteix la tasca gravada abans.

> **Cap a SA6:** aquest replay és exactament el mode **REPLAY** de la màquina d'estats del braç. Si fas el repte C, a la SA6 ja tindràs mitja feina feta.

---

## 🎨 Fes-lo teu (tria abans de començar)

> El repte fixa **què** ha de fer el braç; **el context el poses tu**. Tria i anota-ho al quadern:
> - **A:** on és la posició de casa del teu braç i per què és segura.
> - **B:** **què dispensa** el teu braç (llaminadures, cargols, fitxes de joc…) i on és la safata.
> - **C:** **quina tasca** li ensenyaràs (apilar dues peces, servir una fitxa, saludar…).

## Material necessari
- El teu MeArm amb l'Arduino, les piles i els 4 potenciòmetres (producte de la S4).
- **A i C:** polsadors al D3 (i D4 per al C). **A ⭐⭐⭐:** LED amb resistència de 220 Ω al D5. **B ⭐⭐:** l'ultrasons de l'estació (D7/D8).

## Per on començar (mètode de projecte + PRIMM)
1. **Analitzar:** quins gestos té la tasca? Escriu-los en ordre al quadern.
2. **Dissenyar (Predir):** angles de cada gest (mesura'ls amb el Monitor sèrie del producte de la S4).
3. **Prototipar:** parteix de `04_brac_potenciometres` i de l'[exemple resolt](../Classes/SA4/SA4_exemple_resolt.md) (la funció `posa()`).
4. **Provar:** primer cada gest per separat, sense res a la pinça.
5. **Millorar:** suavitza, afegeix el sensor o la memòria.

## Com s'avalua
| Rúbrica | Per què |
|---|---|
| **R1** (codi) | Funcions amb paràmetres, arrays, lògica de control. |
| **R2** (circuit) | Servos a les piles amb GND comú; cablatge segons el mapa del braç. |
| **R3** (projecte) | El braç fa la tasca de manera fiable, sense forçar cap topall, **adequada al producte demanat**. |

## Producte / entrega
- Codi `.ino` comentat + taula de posicions (angles de cada gest) + quadern tècnic.
- **Full de producte** (1 cara): qui és el client, què fa el braç i una millora futura.

---

## Orientació docent
- **Marc "producte real":** el client i el lliurable són una **capa de sentit**, no afegeixen requisit tècnic.
- **Seguretat (clau):** servos a les piles, **GND comú**, i el `constrain()` dins de `posa()`: un repte que força un topall no és vàlid encara que «funcioni».
- **Errors freqüents:** gravar deu punts amb una premuda (falta esperar que es deixi anar el botó); `posa()` sense pausa (el braç no arriba); arrays fora de rang al punt 11.
- **Diferenciació:** A és el més assequible (dos modes), B treballa la descomposició i C els arrays. El C enllaça directament amb el mode REPLAY de la SA6.
- **Solucionari:** `Reptes/Solucionari/SA4/` (`A_brac_casa`, `B_brac_dispensador`, `C_brac_replay`; `minim` i `ampliat`).

---

## 🤖 Cap al robot del trimestre

Aquest trimestre **tot és el braç** ([dossier](../Classes/00_General/00_Projecte_T2_Brac.md) · [fil conductor](../Classes/00_General/00_Fil_conductor_robots.md)): els tres reptes són capacitats del mateix MeArm que has muntat als torns de taller. El **botó de casa** (A) i el **replay** (C) tornaran a sortir a la màquina d'estats de la SA6 com a estats **REPÒS** i **REPLAY**; el **dispensador** (B) és una bona demostració per al producte final.
