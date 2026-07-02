# 2026-07-02 · Anàlisi pedagògica global del curs i propostes de millora

## Objectiu i abast

A petició del docent: **anàlisi pedagògica de tot el curs** (carpetes `Programació didàctica/`, `Classes/`, `Avaluació/`, `Reptes/`, `Recursos/`, `Normativa/`; exclosa `web/`) i **propostes de millora**. Només anàlisi: **no s'ha editat cap material del curs**.

L'anàlisi s'ha contrastat amb les rondes de millora anteriors (memòries del 28-29-30 de juny) per **no repetir** el que ja està resolt. Les propostes d'aquest informe són, doncs, de "segona generació": buits que només es veuen quan la base didàctica ja és sòlida.

## 1. Valoració global (breu, per no duplicar informes previs)

El material manté les fortaleses ja diagnosticades (informe 2026-06-29): completesa end-to-end, traçabilitat instrument→CA→rúbrica, mètode de projecte + PRIMM + quadern tècnic com a bastides repetides, multinivell amb fitxa base/ampliada, cultura de l'error (DEPURA), pla B amb simuladors i solucionaris. Les millores de les rondes anteriors (DUA, avaluació formativa, rols cooperatius, ètica i IA, mitigacions SA6, plantilla de qualificació, pressupost, inventari) **estan efectivament integrades** al material: s'ha verificat mostrejant SA0, SA1, SA3, SA5, SA6, SA9, les tres proves i els reptes.

**Conclusió global:** el curs és d'una maduresa poc habitual. Els marges de millora que queden són de tres tipus: (a) **validesa de l'avaluació individual**, (b) **consolidació de l'aprenentatge a llarg termini**, i (c) **transició cap a l'autonomia** (SA9). Cap no és estructural.

## 2. Estat dels pendents de rondes anteriors

| Pendent (origen) | Estat actual |
|---|---|
| Imatges reals de circuit (informe 29-06 §3.1) | **Segueix pendent** (requereix eines gràfiques: Fritzing/captures). |
| Accessibilitat daltònics (informe 29-06 §3.2) | ✅ Aplicat (`05_Atencio_a_la_diversitat.md` §5.1). |
| Fitxes alleugerides (informe 29-06 §3.8) | ✅ Resolt amb el desdoblament fitxa **base** / **ampliada** (29-06). |
| Comparació C++↔MicroPython avaluable (informe 29-06 §3.6) | ✅ Resolt: taula comparativa al mapa d'avaluació de SA5 (CA1.2, R4). |
| Vocabulari dels títols de cara a l'alumnat (auditoria 30-06) | **Segueix pendent** d'acordar abast → vegeu P10. |

## 3. Propostes noves (problema → evidència → proposta → cost)

Ordenades per **impacte pedagògic** esperat.

### P1 · Recuperació espaiada (repàs acumulatiu) — prioritat ALTA
- **Problema:** tota l'avaluació formativa del curs mira **dins de la SA en curs**. No hi ha cap mecanisme de **repàs espaiat**: la fase d'Activació recupera el que se sap del tema del dia, però mai continguts de 2-3 SA enrere. Amb 2 h/setmana, el que es va aprendre a l'octubre (rangs 0-1023/0-255, `INPUT_PULLUP`, divisor de tensió) arriba **esborrat** a la prova T2 o a la SA9.
- **Evidència:** cap fitxer del repositori conté repàs espaiat ni preguntes retrospectives (cerca feta). Les proves trimestrals són l'únic moment acumulatiu.
- **Proposta:** nou `Classes/00_General/00_Banc_activacio_repas.md` amb **3 preguntes d'activació per sessió** (format "graella de recuperació": 1 de la sessió anterior + 1 d'una SA anterior + 1 del trimestre passat), llestes per projectar. Encaix natural: la fase **Activació (10')** de l'estructura de sessió ja existent (`04_Metodologia.md` §4.2) — no costa temps nou, en reaprofita. Referenciar-lo des de la fila Activació de la metodologia.
- **Cost:** 1 fitxer nou + 1 línia a `04_Metodologia.md`. Impacte alt: l'efecte test i l'espaiat són de les intervencions amb més evidència en consolidació.

### P2 · Visibilitat del rendiment individual ("efecte passatger") — prioritat ALTA
- **Problema:** la nota es construeix majoritàriament sobre **productes de parella/equip** (45 % projectes + bona part del 25 % de pràctiques). Les proves trimestrals — l'únic instrument potencialment individual — diuen *"individual o en parella (segons el docent)"* (`Avaluació/00_LLEGEIX-ME_Avaluacio.md`). Un alumne pot arribar al febrer **sense haver escrit mai codi tot sol** i sense que cap instrument ho hagi detectat.
- **Proposta (2 peces):**
  1. **Proves T1 i T2 individuals per defecte** (T3 pot mantenir la parella per logística de robot); canviar la recomanació al LLEGEIX-ME d'Avaluació.
  2. **Mini-check individual formatiu** (~10', no qualifica) un cop per SA a partir de la SA2: un micro-repte de codi en solitari (p. ex. "encén el LED quan la lectura superi el llindar") a l'inici de la darrera sessió. Detecta el passatger **abans** que la prova trimestral el penalitzi. Es pot documentar com a secció breu a les guies docents o com a annex al banc de P1.
- **Cost:** edició del LLEGEIX-ME + secció curta per SA. Impacte alt en **validesa** de la qualificació.

### P3 · Retirada progressiva de la bastida (fading PRIMM → autonomia) — prioritat ALTA
- **Problema:** amb PRIMM l'alumnat sempre parteix de **codi donat**; a la SA9 se li demana de cop **escriure des de zero** ("no hi ha PRIMM", diu la pròpia guia SA9). El salt de *modificar* a *crear* no té graons intermedis planificats. A més, `05_Atencio_a_la_diversitat.md` promet "diagrames de flux" com a bastida, però **cap material del curs no en conté ni cap activitat en demana** (cerca feta: 0 resultats de pseudocodi/diagrames de flux als materials d'aula).
- **Proposta:** pla de **fading explícit** documentat a `04_Metodologia.md` i reflectit a les fitxes:
  - **SA2-SA3:** com ara (PRIMM complet sobre codi donat) + introduir el **pseudocodi/diagrama de flux com a pas de Disseny** al quadern (3-5 línies abans de codificar el repte).
  - **SA4-SA6:** la fase "Crea" parteix del **pseudocodi propi**, no del sketch anterior; el codi donat queda com a referència, no com a plantilla.
  - **SA7-SA8:** un repte per SA **"a full en blanc"** (només amb el full-xuleta d'API com a suport).
  - **SA9:** autonomia completa (ja és així).
- **Cost:** edicions petites a metodologia + fitxes (una línia "Dissenya abans de codificar" per repte). Tanca la incoherència DUA (bastida promesa i no desplegada) i prepara la SA9 de debò.

### P4 · "Curs mínim viable" dins la programació didàctica — prioritat MITJANA-ALTA
- **Problema:** `08_Sequenciacio_temporal_anual.md` compta **69 h de SA + ~1 h de marge**. Un curs real perd 2-3 sessions (festius, sortides, vagues, avaries). La llista de retallades segures ("curs mínim viable") **existeix però viu en una memòria de treball** (informe 2026-06-29 §4.5), que cap docent substitut trobarà.
- **Proposta:** nova secció **"Pla de contingència temporal"** a `08_Sequenciacio_temporal_anual.md` amb l'ordre oficial de retallada: mai SA1-SA3 ni SA9 → primer les 4es sessions d'ampliació (SA2/SA4/SA6) → després comprimir SA8 (6→4 h) → mantenir sempre una prova per trimestre.
- **Cost:** trasllat de contingut ja escrit. Impacte: robustesa organitzativa i adoptabilitat.

### P5 · Mesura física real (multímetre) per a la CA2.2 — prioritat MITJANA-ALTA
- **Problema:** la **CA2.2** ("mesurar i interpretar magnituds i senyals") i la fila "Mesura/diagnòstic" de la **R2** s'evidencien avui **només via Monitor sèrie** (mesura per software). El **multímetre no apareix en cap activitat** de cap SA (només a la guia de compra i a la llista de sabers). Un alumne pot acabar el curs sense haver mesurat mai una tensió real — i és l'eina de diagnòstic número u quan el circuit "no funciona".
- **Proposta:** mini-activitat de multímetre (15-20') a la **SA2** (mesurar la caiguda al LED i a la resistència; verificar continuïtat) i reforç a la **SA3** (mesurar el divisor LDR-10 kΩ i comparar amb la lectura d'`analogRead` — connexió directa amb Física). Afegir el multímetre a la rutina DEPURA com a eina de la fase "Examina" del maquinari.
- **Cost:** seccions curtes a 2 guies + 2 fitxes. Tanca l'única CA amb evidència parcial que queda.

### P6 · Coavaluació amb criteris (no genèrica) — prioritat MITJANA
- **Problema:** "2 estrelles i un desig" sense guia produeix sovint feedback superficial ("m'agrada el color"). Les rúbriques existeixen, però la coavaluació no s'hi ancora.
- **Proposta:** a les fitxes ampliades, substituir les línies en blanc per **3 ítems trets de files de rúbrica** de la SA (p. ex. SA3: "el codi té una funció pròpia? · el circuit del sensor és estable? · saben explicar el llindar?") + 1 desig lliure. Mateix temps, feedback de més qualitat i alumnat que **interioritza els criteris** avaluant-los en altres.
- **Cost:** edició de les 9 fitxes ampliades (3 línies cadascuna).

### P7 · Escala de progressió de la defensa oral — prioritat MITJANA
- **Problema:** la R4 avalua "defensa oral" des de la SA1, i la SA9 exigeix una defensa completa, però **no hi ha progressió planificada**: les defenses d'1' de les SA no creixen mai en exigència fins al salt de la SA9.
- **Proposta:** escala explícita — **T1:** 1' amb 1 pregunta ("què fa i on s'usaria"); **T2:** 2-3' amb guió (problema → solució → decisió tècnica que defensen); **T3/SA9:** 5' + torn de preguntes + demostració. Documentar-la en un `Classes/00_General/00_Guia_defensa_oral.md` breu (guió + errors típics + com escoltar com a públic) i referenciar-la de les fitxes. Nota logística SA9: amb >6 equips, preveure defenses **esglaonades** (2-3 per sessió des de la S3) en lloc de totes a la S5.
- **Cost:** 1 fitxer curt + referències.

### P8 · Tancament del bucle metacognitiu — prioritat MITJANA
- **Problema:** els exit tickets i les dianes **informen el docent**, però l'alumne **no torna mai sobre ells**: no hi ha cap moment on l'alumne actuï sobre allò que va marcar com a "encara no ho tinc clar". La metacognició queda en autoinforme.
- **Proposta (2 peces petites):**
  1. **Pla de millora personal post-prova** (3 línies a continuació de cada prova trimestral: què m'ha fallat / què practicaré / com ho comprovaré), recuperat pel docent a l'inici de la SA següent.
  2. **"Els meus 3 errors del trimestre"** com a entrada de tancament del quadern tècnic (l'alumne rellegeix els seus apunts DEPURA i tria els 3 més instructius). Converteix el registre d'errors — que ja existeix — en repàs actiu.
- **Cost:** 3 línies a cada prova + 1 línia a la guia del quadern.

### P9 · Aclariment dels 4 rols en parelles de 2 — prioritat BAIXA
- **Problema:** el model cooperatiu defineix **4 rols** (Coordinador/a, Programador/a, Enginyer/a, Provador/a-Documentador/a) però la unitat de treball habitual és la **parella**: cada alumne acumula 2 rols i el material no diu quins van junts, cosa que a la pràctica dilueix la responsabilitat.
- **Proposta:** una línia a les fitxes i al pòster de rols: en parella, els emparellaments recomanats són **Coordinador/a + Programador/a** vs **Enginyer/a + Provador/a-Documentador/a** (separen "pensar el codi" de "validar-lo", que és el control creuat que interessa), rotant cada sessió.
- **Cost:** mínim.

### P10 · Vocabulari dels títols de cara a l'alumnat (pendent del 30-06) — proposta d'abast concret
- **Recordatori:** l'auditoria de nivell va concloure que la sensació de "massa alt" ve del **lèxic**, no del contingut, i va quedar pendent acordar l'abast.
- **Proposta d'abast mínim (per desencallar-ho):** tocar **només el subtítol de les 9 fitxes base** (el que llegeix l'alumnat), mantenint el títol tècnic: p. ex. SA6 "Sistemes de control — *que el sistema es reguli sol*"; SA7 "Robòtica mòbil — *com es mou i gira un robot*". Guies docents i programació didàctica **no es toquen** (el rigor terminològic hi és un valor).
- **Cost:** 9 línies. Decisió del docent.

## 4. Taula resum prioritzada

| # | Proposta | Impacte | Cost | Fitxers principals |
|---|---|---|---|---|
| P1 | Repàs espaiat (banc d'activació retrospectiva) | Alt | Baix | Nou `00_Banc_activacio_repas.md` + `04_Metodologia.md` |
| P2 | Proves individuals + mini-check per SA | Alt | Baix | `Avaluació/00_LLEGEIX-ME` + guies docents |
| P3 | Fading PRIMM → autonomia (pseudocodi com a Disseny) | Alt | Mitjà | `04_Metodologia.md` + fitxes |
| P4 | Curs mínim viable dins `08_Sequenciacio` | Mitjà-alt | Molt baix | `08_Sequenciacio_temporal_anual.md` |
| P5 | Multímetre a SA2-SA3 (CA2.2) | Mitjà-alt | Baix | Guies/fitxes SA2-SA3 |
| P6 | Coavaluació ancorada a rúbriques | Mitjà | Baix | 9 fitxes ampliades |
| P7 | Escala de defensa oral + logística SA9 | Mitjà | Baix | Nou `00_Guia_defensa_oral.md` |
| P8 | Bucle metacognitiu (pla post-prova + top-3 errors) | Mitjà | Molt baix | 3 proves + guia quadern |
| P9 | Emparellament dels 4 rols en parelles | Baix | Mínim | Fitxes + pòster rols |
| P10 | Subtítols col·loquials a fitxes base | Baix-mitjà | Mínim | 9 fitxes base |

## 5. Pendents que continuen oberts (fora d'aquest informe)

- **Imatges reals de circuit** (Fritzing / captures): segueix sent el buit visual número u; no generable com a binari en aquest entorn.
- **Comprovació empírica a l'aula** (prova diagnòstica + pilotatge SA6-S3): és del docent, curs 2026-2027.

---

*Cap fitxer del curs no ha estat modificat. Aquest document és només anàlisi i proposta; l'aplicació es farà segons el que decideixi el docent.*
