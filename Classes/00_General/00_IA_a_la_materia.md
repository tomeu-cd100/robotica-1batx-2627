# 00 · La Intel·ligència Artificial a la matèria (guia transversal)

> **Per a qui és aquest document?** Per al **professorat**. Explica **com s'introdueix la IA al llarg de tot el curs** (no només a la SA8), amb quin marc conceptual mínim, com tractar-la **èticament** i com gestionar l'**ús d'assistents d'IA** (tipus ChatGPT/Copilot) a l'aula amb **integritat acadèmica**. És un mapa de conjunt: el desplegament concret viu a cada SA.

---

## 1. Per què la IA, i amb quin pes

La IA **no és un afegitó de moda**: és contingut **prescriptiu** del currículum.

- **Competència específica 5 (CE5)** de *Tecnologia i Enginyeria I* (Decret 171/2022): *"…aplicant coneixements de la regulació automàtica, del control programat i de les **tecnologies emergents**…"*.
- **Criteri CA5.1:** *"Controlar i experimentar el funcionament de sistemes… aplicant les possibilitats de les **tecnologies emergents (IA**, telemetria, Internet de les coses, big data, etc.)."*
- **Sabers bàsics:** *"**Intel·ligència artificial aplicada als sistemes de control.**"*

> ⚖️ **Pes realista.** És una matèria **optativa anual** (~70 h). La IA hi entra com a **tecnologia emergent dins del control**, no com a assignatura d'IA. L'objectiu **no** és que l'alumnat entreni xarxes neuronals, sinó que **entengui la idea** (dades → model → decisió), en vegi els **límits i riscos**, i la **connecti** amb el que ja sap (sensors, llindars, control). Dosi: petites llavors al llarg del curs + un nucli a la SA8.

---

## 2. Dos eixos (no els confonguis)

| Eix | Què és | On viu |
|---|---|---|
| **A · IA com a OBJECTE d'estudi** | Què és la IA, com funciona (regles vs aprenentatge), dades/model/biaix, ètica, IA aplicada al control. | Espiral SA0→SA9, **nucli a SA8** + pràctica Teachable Machine. |
| **B · IA com a EINA de treball** | Ús responsable d'**assistents d'IA** (ChatGPT, Copilot, Gemini…) per programar, depurar i documentar, amb **integritat acadèmica**. | **Transversal** (§5 d'aquest document) — qualsevol SA amb codi. |

Tots dos s'avaluen amb les rúbriques existents (no en calen de noves): l'**eix A** via **R1/R3/R4** a la SA8; l'**eix B** s'integra a **R1 (depuració)**, **R4 (documentació honesta)** i **R5 (autoregulació/responsabilitat)**.

---

## 3. Eix A — La IA en espiral (SA0 → SA9)

Cada llavor és **curta i conceptual** (no consumeix una sessió sencera, tret de la SA8). La idea és que, quan s'arribi a la SA8, la IA **no soni nova**.

| SA | Llavor d'IA | Com introduir-la (cost baix) | On |
|----|-------------|------------------------------|----|
| **SA0** | Vocabulari: *IA, model, dades d'entrenament, classificació, biaix, IA generativa, assistent de codi*. | Consulta puntual quan surti el terme. | [`SA0_vocabulari_essencial.md`](../SA0/SA0_vocabulari_essencial.md) (bloc SA8 ampliat). |
| **SA1** | *Què és i què NO és IA.* Un robot que segueix regles fixes **no** és IA; ho és quan "aprèn" o decideix amb dades. | Pregunta d'activació de 5'. | Connexió conceptual. |
| **SA3** | **Dades → decisió.** Un **llindar** (`if dist < 20`) és la **regla** precursora d'un classificador. | Caixa "Connexió amb la IA". | [`SA3_guia_docent.md`](../SA3/SA3_guia_docent.md). |
| **SA6** | **IA aplicada al control** (la frase literal del saber). Compara una **regla/PID** feta a mà amb un controlador que **aprendria** la resposta. | Caixa "Connexió amb la IA". | [`SA6_guia_docent.md`](../SA6/SA6_guia_docent.md). |
| **SA7** | Comportament **programat** vs **après**. Els cotxes autònoms i el seguiment visual usen IA; el nostre seguidor de línia, regles. | Caixa "Connexió amb la IA" + demo/vídeo. | [`SA7_guia_docent.md`](../SA7/SA7_guia_docent.md). |
| **SA8** | **NUCLI.** De *regles fetes a mà* → **aprenentatge automàtic (ML) real**: dades d'entrenament, model, prova, **biaix**, sobreajust; ètica i privadesa de dades. | Sessió 3 ampliada + **pràctica Teachable Machine**. | [`SA8_guia_docent.md`](../SA8/SA8_guia_docent.md), [`SA8_practica_teachable_machine.md`](../SA8/SA8_practica_teachable_machine.md). |
| **SA9** | **Opció** de repte final amb component d'IA (classificador de gestos/imatge/so integrat al projecte). | Banc de reptes. | `SA9` plantilles / `Reptes/`. |

> 🧵 **Fil narratiu únic:** *encendre (SA1) → percebre (SA3) → moure's (SA4) → regular-se (SA6) → desplaçar-se sol (SA7) → **connectar-se i decidir amb dades (SA8)***. La IA és el pas natural quan el sistema ja percep i actua: ara **aprèn a decidir**.

---

## 4. Marc conceptual mínim (el que NO pot faltar)

Quatre idees. Si l'alumnat se'n va amb aquestes quatre, n'hi ha prou.

1. **Regles vs aprenentatge.**
   - *Regles fetes a mà:* la persona escriu les condicions (`if acceleració > X: "sacseig"`). Funciona si el problema és senzill i el coneixem bé.
   - *Aprenentatge automàtic (ML):* en lloc d'escriure les regles, **donem exemples** (dades etiquetades) i el **model les dedueix sol**. Útil quan les regles serien massa complexes (reconèixer una cara, una veu, un gest variable).
2. **Dades → model → decisió.** Un model d'IA és el resultat d'**entrenar** amb dades. La qualitat de la decisió **depèn de les dades**: *garbage in, garbage out*.
3. **Biaix i límits.** Si les dades d'entrenament són parcials, les decisions ho seran (un classificador entrenat només amb unes mans falla amb altres). La IA **no "entén"**: troba **patrons estadístics**, i pot equivocar-se amb seguretat.
4. **Ètica de dades.** Recollir dades implica **privadesa, consentiment i finalitat** (vegeu el bloc *"Ètica de dades i IA"* de [`SA8_guia_docent.md`](../SA8/SA8_guia_docent.md): RGPD, biaix, consentiment).

> Vocabulari "IA generativa" (ChatGPT i companyia): són models entrenats amb **enormes quantitats de text** que **prediuen la paraula següent**. Per això **sonen segurs encara que s'equivoquin** (al·lucinacions). Aquesta idea és la frontissa cap a l'**eix B**.

---

## 5. Eix B — Ús d'assistents d'IA amb integritat acadèmica

L'alumnat **ja** fa servir ChatGPT i companyia. Prohibir-ho és irreal i contraeducatiu; el que cal és **ensenyar a usar-los bé**. Principi rector:

> 🧭 **"La IA t'ha d'ajudar a APRENDRE, no a SALTAR-TE l'aprenentatge."**

### 5.1. Regla d'or: **DEPURA primer, IA després**

Abans de demanar res a una IA, l'alumnat aplica la rutina **DEPURA** (Descriu · Examina · Prova una hipòtesi · Ubica · Repara · Apunta). La IA és l'**últim recurs**, no el primer reflex. Així es protegeix el múscul de la resolució de problemes.

### 5.2. Semàfor d'usos (penjar a l'aula)

> 🖨️ **Versió imprimible A4/A3:** [`00_Poster_IA_us_assistents.md`](00_Poster_IA_us_assistents.md) (regla d'or, semàfor, "explica-ho", honestedat i avisos) per penjar a l'aula.

| 🟢 SÍ (ben fet) | 🟡 AMB CURA | 🔴 NO (deshonest) |
|---|---|---|
| Demanar que **expliqui** un missatge d'error. | Demanar que **suggereixi** com estructurar el codi (després el reescric jo). | Enganxar l'enunciat i lliurar la resposta **sense entendre-la**. |
| Demanar **exemples** d'una funció (`map()`, `radio.send()`). | Generar un **esborrany** que jo **reviso, provo i modifico**. | Fer-li **tota la pràctica/quadern** i copiar-ho. |
| Demanar que em **faci preguntes** per repassar. | Traduir/millorar la **redacció** d'una reflexió meva. | Presentar com a **propi** un text/codi que no puc explicar. |
| Demanar **idees** per a un repte i triar-ne jo. | | Usar-la en una **prova/examen** on no està permès. |

### 5.3. Verificació "**Explica-ho**"

Norma simple i potent: **si fas servir codi o text d'una IA, has de poder explicar cada línia.** El docent pot assenyalar qualsevol línia i demanar *"què fa això i per què?"*. Si no se sap explicar → no compta com a aprenentatge (i pot baixar nota a R1/R4).

### 5.4. Citar l'ús (transparència, no càstig)

Usar la IA **declarant-ho** és honest; amagar-ho és el problema. Al **quadern tècnic**, una línia breu:

> *"He fet servir [eina] per: ______. Li he demanat: '______'. M'ha donat: ______. Què he canviat/entès: ______."*

Declarar l'ús **no baixa nota**; amagar-lo o no saber explicar-lo, **sí**.

### 5.5. Encaix amb les rúbriques (sense crear-ne de noves)

| Rúbrica | Com hi entra l'ús d'IA |
|---|---|
| **R1 · Depuració** | "Depura i **explica la causa**" → si la IA va donar la solució, l'alumne **l'ha d'entendre i explicar**. |
| **R4 · Documentació** | Quadern **honest**: l'ús d'IA citat i la reflexió **pròpia**. |
| **R5 · Autoregulació/Responsabilitat** | Aplicar **DEPURA abans** d'externalitzar; ús responsable i declarat. |

### 5.6. Avisos pràctics

- **Privadesa:** no enganxar a la IA **dades personals** (noms, fotos d'alumnes, etc.). Connecta amb l'ètica de dades de la SA8.
- **Al·lucinacions:** la IA **inventa amb seguretat**; sempre **provar el codi** i contrastar.
- **Edat i comptes:** moltes eines requereixen +13/+14 anys i compte. Prioritza eines del centre o sense registre; **consulta la teva direcció/coordinació digital** abans d'exigir comptes personals.
- **Equitat:** no tothom té el mateix accés a IA de pagament; **no n'avaluïs mai el resultat**, sinó el **procés i la comprensió**.

---

## 6. Pràctica estrella d'IA (eix A, nucli) — Teachable Machine

Per passar de *regles* a **ML real** **sense maquinari extra** (només navegador), la SA8 incorpora una pràctica amb **Google Teachable Machine**: l'alumnat **recull exemples**, **entrena** un classificador (imatge, so o postura), el **prova en directe** i **observa el biaix**.

→ Material complet: **[`Classes/SA8/SA8_practica_teachable_machine.md`](../SA8/SA8_practica_teachable_machine.md)**. És integrable com a **ampliació de la SA8 · Sessió 3** o com a **opció de repte a la SA9**. Té **Pla B** sense internet.

---

## 7. Pla B i requisits

| Situació | Solució |
|---|---|
| Sense internet a l'aula | IA com a **objecte d'estudi** es pot fer **sense connexió** (regles a la micro:bit, debat ètic, vídeos descarregats). Teachable Machine necessita navegador → fer-ho a casa/aula d'informàtica o amb una **demostració del docent**. |
| Sense comptes d'IA per a l'alumnat | Eix B treballat amb **demostració projectada** del docent + debat; o eines del centre. |
| Poc temps | Mínim irrenunciable: **§4 (4 idees)** + **§5.1–5.3 (regla d'or, semàfor, "explica-ho")** + Sessió 3 de SA8. |

---

## 8. Per a saber-ne més (docent)

- Marc de **competència digital** i IA del Departament d'Educació (consulta XTEC: ús de la IA a l'aula).
- *Teachable Machine* (Google) — `teachablemachine.withgoogle.com`.
- Extensió **ML / "AI"** de MakeCode per a micro:bit (recollir mostres i entrenar al navegador).
- Bloc **"Ètica de dades i IA"** a [`Classes/SA8/SA8_guia_docent.md`](../SA8/SA8_guia_docent.md) (RGPD, biaix, consentiment, mini-debats).

> **Resum en una frase:** la IA entra **a poc a poc com a contingut** (sensors→dades→decisió→ML, culminant a la SA8) i **transversalment com a eina** (assistents amb DEPURA-primer, semàfor d'usos i "explica-ho"), sempre lligada a l'**ètica de les dades**.
