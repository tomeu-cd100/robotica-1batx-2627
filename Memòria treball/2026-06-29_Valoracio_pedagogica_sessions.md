# Valoració pedagògica exhaustiva de les sessions

**Data:** 2026-06-29 · **Matèria:** Robòtica · 1r de Batxillerat (2026-2027)
**Abast:** anàlisi del **disseny de les sessions** de totes les SA (SA0–SA9) tal com apareixen a les guies docents (`Classes/SAx/SAx_guia_docent.md`), avaluat contra els principis de `Programació didàctica/04_Metodologia.md` i la literatura didàctica de programació/robòtica.

> Aquest document **no** repeteix l'informe general (`2026-06-29_Informe_analisi_pedagogica_i_arrencada.md`): allà s'analitza el material globalment; aquí s'analitza **com estan dissenyades les sessions** (estructura, temps, progressió, càrrega cognitiva, viabilitat real a l'aula).

---

## 1. Resum executiu

El disseny de sessions és **molt sòlid i internament coherent**: totes les SA segueixen la mateixa estructura de 5 fases, amb una pregunta d'activació de qualitat, modelatge amb PRIMM, alliberament gradual de responsabilitat i tancament reflexiu. La progressió intra-SA (concret→abstracte) i inter-SA (espiral amb "ponts" explícits) és **gairebé impecable**.

**Verdict:** sessions **directament aplicables**, ben fonamentades. Les debilitats no són de disseny pedagògic sinó de **viabilitat temporal real** i de **consistència en l'operacionalització** d'algunes metodologies que es declaren transversals però només es detallen a la SA1.

**Top 3 fortaleses:**
1. Estructura de sessió **uniforme i basada en evidència** (activació → modelatge → pràctica guiada → repte → tancament), que crea rutina i redueix càrrega cognitiva.
2. **PRIMM + alliberament gradual + multinivell** integrats a cada sessió (sempre hi ha "+ repte" per a qui va sobrat).
3. **Continuïtat narrativa**: cada SA obre amb un "pont" d'on venim / on anem; la matèria és un currículum en espiral real, no unitats soltes.

**Top 4 punts de millora (detallats a §7):**
1. **Temps sense marge logístic**: els 120' assumeixen 0' de repartiment de kits, arrencada d'ordinadors, càrrega de sketches i recollida. A la pràctica es perden 15–25'.
2. **PRIMM només es detalla a la SA1**: a SA2–SA8 el "predir abans d'executar" queda al preàmbul, no a la graella minut a minut → un docent novell el saltarà.
3. **El tancament (quadern + avaluació formativa) viu a la franja més escurçable** (10' finals): és on hi ha el 25% de la nota i els exit tickets.
4. **Buit de bastida amb `millis()`**: a SA6 es demanen màquines d'estats no bloquejants amb `millis()` que abans només s'havia vist com a "concepte" (SA2) o ampliació (SA1).

---

## 2. Criteris d'anàlisi

S'avalua cada sessió i el conjunt contra: **estructura i rutina**, **qualitat de l'activació**, **modelatge i lectura de codi (PRIMM)**, **alliberament gradual de responsabilitat** (I do / we do / you do), **càrrega cognitiva i pacing**, **progressió i espiral**, **temporització realista**, **atenció a la diversitat dins la sessió**, **avaluació formativa integrada**, i **viabilitat per a un docent novell**.

---

## 3. Anàlisi de l'estructura tipus de sessió

Totes les SA "ordinàries" (SA1–SA8) repliquen l'estructura de `04_Metodologia.md`:

| Fase | Temps tipus | Funció didàctica | Valoració |
|---|---|---|---|
| **Activació** | 10' | Pregunta detonant; recupera el previ; crea necessitat | **Excel·lent** |
| **Modelatge** | 20–30' | Live coding + PRIMM; el docent mostra el concepte | **Bo, amb matís** |
| **Pràctica guiada** | 30–40' | L'alumnat replica i modifica en parella | **Molt bo** |
| **Repte / pràctica autònoma** | 40' | Aplicació oberta + "+ repte" multinivell | **Excel·lent (però vulnerable al temps)** |
| **Tancament i registre** | 10' | Quadern tècnic + autoavaluació/exit ticket | **Bo (però en zona de risc)** |

### 3.1. Activació — *excel·lent*
Cada sessió obre amb una **pregunta autèntica i provocadora**: *"Com gira un robot que no té volant?"* (SA7), *"Per què un aire condicionat no encén i apaga sense parar?"* (SA6), *"Com sap la placa que has premut un botó?"* (SA3). Activen coneixement previ, generen *need-to-know* i connecten amb el món real. És un dels punts més forts i consistents del material.

### 3.2. Modelatge i PRIMM — *bo, amb una inconsistència*
El modelatge combina **live coding** amb **PRIMM** (Predict–Run–Investigate–Modify–Make), metodologia avalada per la recerca per fer "llegir codi abans d'escriure'l" i reduir la càrrega cognitiva. **Però**: PRIMM només es desglossa en fases a la **SA1 (Sessió 3)**. A SA2–SA8 el "predir abans d'executar" només apareix al preàmbul "Mètode de projecte i continuïtat", **no a la graella minut a minut**, on el modelatge es descriu com a simple presentació del `.ino`. Conseqüència: un docent que segueixi la taula de SA2+ **mostrarà el codi directament** i es perdrà el pas de predicció, que és el que més consolida. (Vegeu §7.2.)

### 3.3. Pràctica guiada → Repte — *alliberament gradual ben fet*
La seqüència "replicar (guiada) → aplicar/estendre (repte) → +repte (ampliació)" és un **gradual release of responsibility** de manual, amb **diferenciació incorporada a cada sessió**: qui acaba sempre té el "+ repte". Això resol l'atenció a la diversitat *dins* de la sessió, no només a nivell de SA.

### 3.4. Tancament — *bo però mal ubicat*
El tancament (10') concentra el **quadern tècnic** (25% de la qualificació, eix de l'avaluació contínua) i l'**avaluació formativa** (diana, exit ticket). El problema no és el disseny sinó la **posició**: és la franja que primer s'escurça quan la sessió va endarrerida (vegeu §5). El que més valor avaluador té viu al lloc més fràgil.

---

## 4. Anàlisi de la progressió

### 4.1. Progressió intra-SA — *molt bona*
Cada SA va del component senzill al sistema integrat. Exemple paradigmàtic, SA3: entrada **digital** (polsador) → entrada **analògica** (potenciòmetre/LDR + `map()`) → **funció** + sensor complex (ultrasons) → **producte integrat** (alarma sensor→actuador). Concret→abstracte, simple→complex, amb un producte que tanca la SA.

### 4.2. Progressió inter-SA (espiral) — *excel·lent*
Els "ponts" expliciten la continuïtat: SA1 (1 LED) → SA2 (múltiples sortides + PWM) → SA3 (entrades) → SA4 (moviment) → SA6 (tanca el llaç sensor→actuador) → SA7 (control aplicat al robot mòbil) → SA8 (connexió/dades) → SA9 (integració). El **llaç tancat i les màquines d'estats de SA6 són explícitament la base** de l'evita-obstacles i el seguidor de línia de SA7. És un currículum en espiral genuí.

### 4.3. Punts de tensió de la progressió
- **SA3 és la rampa més pronunciada**: en 4 sessions introdueix debounce, `INPUT_PULLUP`, `analogRead`, `map()`, divisor de tensió, `pulseIn` i escriptura de funcions. Defensable per a una optativa de nivell alt, però és el tram on més alumnat pot quedar enrere.
- **SA6 és el pic d'abstracció**: llaç obert/tancat, histèresi, màquines d'estats (`enum`/`switch`) i control proporcional (`Kp`), tot en 4 sessions, **i** allotja la prova pràctica T2. Final de trimestre carregat.
- **Buit de `millis()`** (vegeu §7.4): SA6 dona per pràctica el `millis()` no bloquejant que mai s'ha treballat amb les mans.

---

## 5. Anàlisi de la temporització (el punt crític pràctic)

Les sessions estan **ben pressupostades sobre el paper**: la majoria sumen exactament 120'. (Algunes sumen 125' —SA5 S3, SA6 S4— per sobre-assignació menor.)

**El problema real:** el pressupost de 120' assumeix **0 minuts** per a la logística inevitable d'una aula taller:

| Activitat logística (no pressupostada) | Temps real aprox. |
|---|---|
| Repartiment i recompte de kits per grup | 3–5' |
| Arrencada d'ordinadors + login + obrir IDE/Tinkercad | 5–8' |
| Selecció de placa/port + 1a càrrega de sketch | 2–4' |
| Recàrregues després de cada modificació (×N) | 0,5–2' cada cop |
| Recollida, desconnexió i ordre del material | 5' |
| **Total overhead típic** | **15–25'** |

**Conseqüència:** el temps lectiu efectiu real és de ~95–105', no 120'. La fase que es "menja" aquest dèficit sol ser el **Repte autònom (40')** o el **Tancament (10')** —és a dir, **les dues fases amb més valor d'aprenentatge i d'avaluació**. Per a un docent novell, que infravalorarà l'overhead, aquest és el risc nº1 de quedar sistemàticament endarrerit.

> No és un defecte de disseny pedagògic, sinó de **planificació realista**. Es resol fàcilment (vegeu §7.1).

---

## 6. Punts forts destacats

1. **Rutina d'aula predictible**: la mateixa estructura cada dia descarrega memòria de treball i deixa l'energia per al contingut. Especialment valuós en una matèria tècnica.
2. **Activació autèntica universal**: cada sessió enganxa amb una pregunta del món real.
3. **PRIMM + gradual release + multinivell**: tres bones pràctiques combinades a cada sessió.
4. **Espiral explícita amb "ponts"**: coherència longitudinal poc habitual.
5. **Taula d'errors freqüents per SA**: suport *just-in-time* per al docent (símptoma→causa→acció) — el que més tranquil·litza qui no domina la matèria.
6. **Sessió-producte amb mini-defensa**: cada SA tanca amb un producte i una defensa d'1', treballant la **comunicació tècnica de manera contínua**, no només al final de curs.
7. **Variació de format**: no tot és codi — SA8 S2 és un **disseny IoT en paper** (sense ordinador), SA6 treballa diagrames de blocs/estats, SA7 és físic a la pista. Bona varietat sensorial i de ritme.
8. **SA0 sense sessions pròpies**: decisió encertada de no consumir hores del calendari amb material de consulta.
9. **SA9 mapeja les sessions al mètode de projecte** (Idear/Prototipar/Provar/Millorar/Comunicar): la culminació reflecteix el fil de tot el curs.

---

## 7. Punts de millora i riscos (prioritzats)

Cada punt: *problema → recomanació → impacte*.

### 7.1. Marge logístic dins de cada sessió *(prioritat alta)*
- **Problema:** les graelles no pressuposten arrencada, repartiment, càrregues ni recollida (§5); el temps efectiu real és ~95–105'.
- **Recomanació:** afegir a `04_Metodologia.md` (i com a nota a les guies) una **fase 0 "Preparació/arrencada" de 5–10'** i una rutina de recollida de 5'; reduir el Repte a 30–35' "realista" amb el "+repte" com a marge. Alternativament, marcar a cada graella què és **prescindible si es va just**.
- **Impacte:** evita que el docent novell quedi endarrerit i sacrifiqui justament el repte i el tancament.

### 7.2. PRIMM operacionalitzat només a la SA1 *(prioritat alta, cost baix)*
- **Problema:** el "predir abans d'executar" és transversal de paraula però només està a la graella de SA1 S3; a SA2–SA8 el modelatge es descriu com a presentació directa del codi.
- **Recomanació:** inserir un **micro-pas explícit "Predir (5')"** a la fase de Modelatge de cada sessió amb codi nou (p. ex. "projecta el `.ino` sense executar: què farà? → executa → investiga").
- **Impacte:** garanteix que el benefici de PRIMM es viu a totes les SA, no només a la primera.

### 7.3. El tancament avaluatiu en zona de risc temporal *(prioritat mitjana)*
- **Problema:** quadern tècnic (25%) i avaluació formativa viuen als 10' finals, els primers a desaparèixer.
- **Recomanació:** **distribuir el registre**: 2–3' de quadern *després* del modelatge i del repte (no tot al final), i fer l'exit ticket amb una eina ràpida (paperet o formulari) que no depengui de tenir temps de sobres.
- **Impacte:** protegeix l'evidència d'avaluació contínua encara que la sessió vagi justa.

### 7.4. Buit de bastida amb `millis()` abans de SA6 *(prioritat mitjana)*
- **Problema:** SA6 S3 demana màquines d'estats **no bloquejants amb `millis()`**, però `millis()` només s'ha vist com a "concepte sense aprofundir" (SA2 S2) i com a ampliació opcional (SA1 `blink_millis.ino`). Molts alumnes hi arribaran sense haver-lo practicat.
- **Recomanació:** afegir una **mini-pràctica guiada de `millis()`** (semàfor no bloquejant) a SA2 S2 o al principi de SA6 S3, o oferir l'esquelet de la màquina d'estats amb el patró `millis()` ja muntat com a bastida.
- **Impacte:** evita que el concepte més abstracte de SA6 ensopegui amb una eina no consolidada.

### 7.5. Desajust entre el pla d'avaluació i el guió de sessió a SA3/SA6 *(prioritat mitjana)*
- **Problema:** `08_Sequenciacio` diu que la prova pràctica **T1 va dins de SA3 S4** i **T2 dins de SA6 S4**, però les graelles de SA3 S4 i SA6 S4 descriuen un **producte/repte**, sense esmentar la prova trimestral. Un docent que llegeixi només la guia de SA3 **no sabrà que allà hi va la T1**.
- **Recomanació:** afegir una línia explícita a la Sessió 4 de SA3 i SA6 ("aquest producte fa de **prova pràctica trimestral T1/T2**; vegeu `Avaluació/Prova_practica_Tx.md`").
- **Impacte:** alinea els documents i evita que el docent "oblidi" la prova o l'afegeixi com a sessió extra.

### 7.6. Risc del live coding per a un docent novell *(prioritat mitjana)*
- **Problema:** el modelatge depèn de **live coding/demo en directe**, arriscat per a qui no domina la matèria (un error en públic atura la classe). El material dona els `.ino` fets, però llavors la temptació és **només executar-los**, perdent el valor del modelatge.
- **Recomanació:** afegir a cada guia docent un **guió de modelatge** (3–4 frases del que cal verbalitzar mentre es mostra el codi: què mirar, què preguntar, on solen equivocar-se), perquè el docent afegeixi valor encara que no improvisi codi.
- **Impacte:** fa el modelatge robust independentment del nivell del docent.

### 7.7. Activació de la SA0 depèn de la iniciativa del docent *(prioritat baixa)*
- **Problema:** la SA0 (vocabulari/bases) no té sessions; el seu ús depèn que el docent recordi derivar-hi ("repassa A6 abans de SA3", "llegeix Part B abans de SA5").
- **Recomanació:** inserir **recordatoris-disparador** a les guies que la necessiten (p. ex. a SA5 S1: "bastida: deriva a `SA0` Part B/C abans de començar").
- **Impacte:** que el material de consulta s'usi de debò i no quedi oblidat.

### 7.8. Consolidació limitada dels rols cooperatius *(prioritat baixa)*
- **Problema:** "un canvi de rol per sessió" en SA de 3–4 sessions vol dir que cada alumne fa cada rol potser **una sola vegada**; difícil de consolidar i d'avaluar amb fiabilitat.
- **Recomanació:** seguiment del rol al quadre de la fitxa (ja existeix) i que la **rúbrica R5** es valori sobre el conjunt del trimestre, no sessió a sessió.
- **Impacte:** dona sentit longitudinal a la rotació de rols.

---

## 8. Valoració sessió a sessió per SA (síntesi)

| SA | Nº sessions | Càrrega cognitiva | Risc específic de sessió | Valoració global |
|---|---|---|---|---|
| **SA0** | 0 (consulta) | — | Que no s'usi per oblit del docent (§7.7) | Bon disseny de suport |
| **SA1** | 3 | Baixa-mitjana | Cap; és la SA modèlica (PRIMM complet) | **Excel·lent** |
| **SA2** | 4 (4a opc.) | Mitjana | PRIMM no detallat; `millis()` només esmentat | Molt bona |
| **SA3** | 4 | **Alta** (rampa) | Densitat conceptual S2–S3 | Bona; vigilar pacing |
| **SA4** | 4 (4a opc.) | Mitjana-alta | Temps de muntatge motor/pont H + seguretat elèctrica | Molt bona |
| **SA5** | 3–4 | Mitjana | Canvi de paradigma; S3 sobre-assignada (125') | Molt bona |
| **SA6** | 4 (4a opc.) | **Alta** (abstracció) | `millis()` no consolidat; allotja T2; S4 a 125' | Bona; tram exigent |
| **SA7** | 4 | Mitjana-alta | Ajust de pins per model + dependència física (sense simulador) | Molt bona; preparar maquinari |
| **SA8** | 3 | Mitjana | Ètica/IA tractada curt (vegeu informe general) | Bona |
| **SA9** | 5 | Alta (integració) | "Tot per a l'últim dia" (ja mitigat amb fites) | **Excel·lent** |

---

## 9. Recomanacions accionables (síntesi)

**Prioritat alta**
1. Afegir **fase 0 d'arrencada (5–10') i recollida (5')** a l'estructura tipus + nota de "temps realista" a les guies. *(§7.1)*
2. Inserir el **micro-pas "Predir" a cada Modelatge** amb codi nou. *(§7.2)*

**Prioritat mitjana**
3. **Distribuir el registre del quadern** al llarg de la sessió, no només al final. *(§7.3)*
4. **Mini-pràctica de `millis()`** abans de les màquines d'estats de SA6. *(§7.4)*
5. **Explicitar la prova T1/T2** a la Sessió 4 de SA3 i SA6. *(§7.5)*
6. Afegir un **guió de modelatge** (frases clau) a cada guia docent. *(§7.6)*

**Prioritat baixa**
7. **Recordatoris-disparador de la SA0** a les SA que la necessiten. *(§7.7)*
8. Valorar la **R5 (cooperació) a escala trimestral**, no per sessió. *(§7.8)*

> Aquestes recomanacions afecten sobretot `Programació didàctica/04_Metodologia.md` i les capçaleres/graelles de `Classes/SAx/SAx_guia_docent.md`. Cap requereix refer el disseny; són ajustos d'operativa i de consistència.

---

## 10. Conclusió

El disseny de les sessions és **pedagògicament madur**: estructura basada en evidència, activacions de qualitat, PRIMM, alliberament gradual, multinivell i una progressió en espiral exemplar. Les debilitats són **pràctiques i de consistència**, no conceptuals: el principal és que les graelles són plans de **temps ideal** sense marge logístic, cosa que perjudicarà un docent novell; i que algunes metodologies declarades transversals (PRIMM, ús de la SA0) només s'operacionalitzen amb detall a la SA1. Amb els ajustos de §9 —tots de baix cost— les sessions passen de "molt bones sobre el paper" a "robustes a l'aula real, fins i tot amb un docent sense base".

---

*Material i valoració sota llicència CC BY-SA 4.0.*
