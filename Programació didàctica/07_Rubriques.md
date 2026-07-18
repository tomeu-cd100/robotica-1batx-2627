# 07 · Rúbriques d'avaluació

Rúbriques reutilitzables amb **quatre nivells**, cadascun lligat a una **banda de nota (0-10)**. A Batxillerat la qualificació és numèrica; els noms només indiquen la banda: **Insuficient = 0-4 · Suficient/Bé = 5-6 · Notable = 7-8 · Excel·lent = 9-10**.

> ⚠️ **No confonguis les rúbriques `R1–R5` amb les competències específiques `CE-R1–CE-R5`** (doc `02`). Són **dos sistemes diferents** que comparteixen numeració: les **rúbriques** avaluen *com de bé* es fa una feina concreta (codi, circuit…); les **competències** descriuen *què* s'ha d'assolir al curs. Només coincideixen en l'1 i el 2:
>
> | Núm. | **Rúbrica** (R) — instrument d'avaluació | **Competència** (CE-R) — fita del curs |
> |---|---|---|
> | 1 | Programació (codi) | Programar sistemes |
> | 2 | Circuit i electrònica | Construir i experimentar circuits |
> | 3 | **Projecte i robot** | **Automatitzar i controlar** |
> | 4 | **Documentació i comunicació** | **Dissenyar robots i trajectòries** |
> | 5 | **Actitud i cooperació** | **Projectar i comunicar** |
>
> Quan un repte diu "s'avalua amb R1, R3, R4" es refereix a les **rúbriques** d'aquest document.

---

## R1 · Rúbrica de programació (codi)

| Criteri | Insuficient (0–4) | Suficient/Bé (5–6) | Notable (7–8) | Excel·lent (9–10) |
|---|---|---|---|---|
| **Funcionament** | El programa no compila o no fa la tasca. | Fa la tasca bàsica amb errors menors. | Fa la tasca completa de manera fiable. | Funciona i gestiona casos límit/errors. |
| **Estructura** | Codi desordenat, tot a `loop`. | Alguna funció, poca modularitat. | Ben modularitzat amb funcions. | Modular, reutilitzable i eficient. |
| **Llegibilitat** | Sense comentaris ni noms clars. | Comentaris escassos. | Comentat i noms significatius. | Documentat de manera professional. |
| **Depuració** | No identifica errors. | Corregeix amb ajuda. | Depura de forma autònoma. | Depura i explica la causa de l'error. |

## R2 · Rúbrica de circuit i electrònica

| Criteri | Insuficient | Suficient/Bé | Notable | Excel·lent |
|---|---|---|---|---|
| **Muntatge** | Connexions incorrectes/insegures. | Funciona amb ajuda. | Muntatge correcte i ordenat. | Òptim, net i ben etiquetat. |
| **Esquema** | Inexistent o erroni. | Esquema bàsic. | Esquema correcte amb simbologia. | Esquema professional i documentat. |
| **Mesura/diagnòstic** | No mesura ni interpreta. | Mesura amb ajuda. | Mesura i interpreta senyals. | Diagnostica avaries amb autonomia. |
| **Seguretat** | No aplica normes. | Aplica amb recordatoris. | Aplica les normes. | Model de bones pràctiques. |

> **Nota (Mesura/diagnòstic):** quan no hi ha instrument físic disponible, són evidència vàlida la **mesura amb el multímetre simulat de Tinkercad** (amb captura al quadern) i la **conversió calibrada d'`analogRead` a volts**, anotades com a mesura simulada (vegeu el «Racó de mesura» i el pla B de la guia de la SA2).

## R3 · Rúbrica de projecte i robot

| Criteri | Insuficient | Suficient/Bé | Notable | Excel·lent |
|---|---|---|---|---|
| **Compliment del repte** | No assoleix els objectius. | Assoleix els mínims. | Assoleix tots els objectius. | Supera els objectius amb millores. |
| **Disseny i iteració** | Sense procés de disseny. | Una sola versió. | Itera amb proves. | Iteració documentada i justificada. |
| **Integració** | Parts inconnexes. | Integració parcial. | Sistema integrat i coherent. | Integració robusta i optimitzada. |
| **Autonomia/control** | No autònom. | Control bàsic. | Control fiable. | Control avançat (realimentació). |

## R4 · Rúbrica de documentació tècnica i comunicació

| Criteri | Insuficient | Suficient/Bé | Notable | Excel·lent |
|---|---|---|---|---|
| **Quadern tècnic** | Incomplet. | Bàsic. | Complet i ordenat. | Exhaustiu i reflexiu. |
| **Claredat tècnica** | Confús. | Comprensible amb llacunes. | Clar i rigorós. | Rigorós, precís i ben argumentat. |
| **Defensa oral** | No defensa la solució. | Defensa amb dificultats. | Defensa clara. | Defensa convincent i respon dubtes. |
| **Terminologia** | Incorrecta. | Bàsica. | Adequada. | Precisa i professional. |

### R4·DO — Mini-rúbrica de la defensa oral (detall del criteri «Defensa oral» de la R4)

Les defenses orals **es repeteixen tot el curs** (SA2 S4, SA4 S4, SA6 S3, SA9 S4) però fins ara només tenien una fila genèrica a la R4. Aquesta mini-rúbrica de **3 indicadors** la desplega, es comparteix amb l'alumnat **des de la SA2** i fa visible la progressió; també serveix per **calibrar la coavaluació** (l'alumnat que escolta valora amb els mateixos 3 indicadors).

| Indicador | Insuficient (0–4) | Suficient/Bé (5–6) | Notable (7–8) | Excel·lent (9–10) |
|---|---|---|---|---|
| **Claredat** (què fa el sistema) | No se n'entén el funcionament. | S'entén amb esforç o llegint el codi. | Explicació clara i ordenada (problema → solució). | Clara, concisa i adaptada a qui escolta. |
| **Decisió tècnica justificada** (el *per què*) | Cap decisió justificada («ho hem fet així»). | Anomena una decisió però la justifica vagament. | Justifica **una decisió** amb argument tècnic (per què aquests llindars/estats/components). | Justifica decisions i **alternatives descartades**. |
| **Resposta a preguntes** | No respon o respon fora de tema. | Respon parcialment. | Respon amb precisió. | Respon i **reconeix límits** («això fallaria si…»). |

**Progressió esperada al llarg del curs** (mateixos indicadors, exigència creixent):

| Moment | Format | Nivell esperat |
|---|---|---|
| **SA2 S4** (mini-defensa, 1') | Davant el docent | Claredat; la decisió justificada s'hi **inicia** |
| **SA4 S4** (mini-defensa, 1-2') | Davant el docent | Claredat + una decisió justificada |
| **SA6 S3** (defensa a peu de taula, 2-3') | Docent, durant el repte | Els 3 indicadors (la guia ja demana «una decisió tècnica justificada») |
| **SA9 S4** (defensa final + demo) | Grup classe + coavaluació | Els 3 indicadors al nivell alt; coavaluació amb la mateixa mini-rúbrica |

> La nota de la defensa **continua entrant per la R4** (fila «Defensa oral»): aquesta mini-rúbrica és el **desglossament formatiu** d'aquella fila, no una rúbrica nova al còmput.

## R5 · Rúbrica d'actitud, cooperació i autoregulació

| Criteri | Insuficient | Suficient/Bé | Notable | Excel·lent |
|---|---|---|---|---|
| **Cooperació** | No col·labora. | Col·labora puntualment. | Col·labora activament. | Lidera i facilita l'equip. |
| **Gestió de l'error** | Es bloqueja/abandona. | Persisteix amb ajuda. | Persisteix i prova alternatives. | Converteix l'error en aprenentatge. |
| **Autonomia** | Depèn del docent. | Treballa amb suport. | Treballa de manera autònoma. | Autònom i autoregulat. |
| **Responsabilitat** | No compleix terminis/material. | Compleix amb recordatoris. | Compleix. | Exemplar amb material i terminis. |

---

> **Ús:** cada SA indica quines rúbriques s'apliquen al seu producte. Les rúbriques es comparteixen amb l'alumnat **abans** de començar la SA per orientar l'aprenentatge (avaluació formativa).
>
> **Nota sobre la R5 (actitud, cooperació i autoregulació):** com que els **rols cooperatius roten** (sovint cada alumne fa cada rol una sola vegada per SA), la R5 es valora **al llarg del trimestre** (acumulant l'observació de diverses sessions i SA), no sessió a sessió. Així la rotació de rols té sentit longitudinal i la valoració és més fiable.
>
> **Nota sobre l'ús d'assistents d'IA (integritat acadèmica):** **no cal una rúbrica nova**. L'ús d'IA (ChatGPT, Copilot…) s'integra a les existents: **R1 · Depuració** ("depura i **explica la causa**" → l'alumne ha de poder **explicar cada línia** que la IA li hagi suggerit), **R4 · Documentació** (quadern **honest**: ús d'IA **citat** i reflexió **pròpia**) i **R5 · Autoregulació/Responsabilitat** (aplicar **DEPURA abans** d'externalitzar; ús declarat). Principi: *declarar l'ús no baixa nota; amagar-lo o no saber-lo explicar, sí*. Protocol complet a `../Classes/00_General/00_IA_a_la_materia.md` §5.
>
> **Traçabilitat de la IA com a contingut (CA5.1):** la IA com a **tecnologia emergent** (sabers: *"IA aplicada als sistemes de control"*) s'avalua sobretot a la **SA8** amb **R1/R3/R4** (telemetria, classificador i pràctica de ML / Teachable Machine), amb llavors prèvies a SA3/SA6/SA7. Vegeu el mapa a `../Classes/00_General/00_IA_a_la_materia.md`.
