# 2026-07-12 · Anàlisi "ulls nous": professor que entoma la matèria i alumne que la cursa

## Mètode

Recorregut **com si no existissin les 5 rondes prèvies**, simulant els dos usuaris reals:

1. **Professor nou:** README → GUIA_INICI_DOCENT → web (vista docent) → programació didàctica sencera (19 docs) → SA1 completa → SA6 (punt calent) → SA0 → material transversal (00_General, 18 docs) → Avaluació → Reptes.
2. **Alumne:** web (vista alumnat, servit en local) → portada SA1 → fitxa base → esquemes → itinerari → SA6 → SA9 → "Com s'avalua".
3. **Les 3 memòries:** carpeta `Memòria treball/` (58 docs), memòria de l'alumne (retenció amb 2 h/setmana) i memòria persistent de Claude (MEMORY.md).
4. **Contrast final** amb les rondes prèvies (30-06, 02-07, 03-07, 08-07, 09-07) per etiquetar cada troballa: **[NOU]** mai detectat · **[CONEGUT-PENDENT]** detectat i encara obert · **[RESOLT]** verificat tancat.

*Nota: el web s'ha auditat servint `web/` en local (sense connexió al GitHub Pages durant la sessió).*

---

## 1. Veredicte global

El material és **excepcional en amplada i coherència interna**: després de 5 rondes, els problemes de contingut estan esgotats. El que veu un ull nou ja no són buits del material sinó **friccions d'execució**: llocs on el paper diu dues coses que no caben a la mateixa hora de classe, on la porta d'entrada apunta a un entorn que l'aula real no té, o on l'orquestració demanada al docent excedeix el que una persona pot fer la primera vegada. Cap és estructural; tots són corregibles amb edicions petites.

**La troballa més important de la ronda és la T1 (col·lisió prova/producte a SA3-S4 i SA6-S4): és un error de comptabilitat horària que explotarà al desembre si no es resol al paper abans.**

---

## 2. Troballes — perspectiva del professor nou

### T1 · [NOU] 🔴 Col·lisió irresoluble a les sessions que "allotgen" les proves T1 i T2

**On:** `SA3_guia_docent.md` S4 · `SA6_guia_docent.md` S4 · `Avaluació/Prova_practica_T1.md`/`T2` · `08_Sequenciacio` §proves integrades.

**El problema.** La seqüenciació diu que les proves trimestrals "no afegeixen sessions: s'incorporen dins l'última sessió de la SA de tancament". Però:

- La **prova T1 dura 2 h** (ho diu el seu enunciat) i és **individual**. La **S4 de SA3 dura 2 h** i el seu guió descriu una altra cosa: producte "alarma/aparcament" **en parella** (70' de pràctica + 30' de documentació i defensa). **No hi caben totes dues coses.** O la sessió és la prova individual, o és el producte en parella amb defensa — no ambdues.
- El mateix passa a **SA6-S4**: el guió detalla modelatge + pràctica de control proporcional (fases completes de sessió), i alhora "allotja la prova T2" que també dura 2 h i té dues parts (Arduino + micro:bit).
- La **fitxa d'alumnat de SA3** llista com a lliuraments separats el producte S4 (parella, R1+R2) **i** la prova T1 (individual, dins S4): l'alumne llegeix que farà dues coses avaluables diferents el mateix dia de 2 h.

**Per què cap ronda no ho havia vist:** cada peça és coherent per separat (la prova diu 2 h; la sessió diu 2 h; la integració diu "sense hores extra"). Només xoca quan fas el dia amb ulls de docent que l'ha d'executar.

**Vies de solució (cal decisió):**
- **(a) La prova ÉS el producte** (mínim canvi de calendari): la S4 sencera és la prova T1 individual; el "producte" de SA3 passa a ser el que cada alumne construeix a la prova. Cost: es perd la defensa d'1' i el treball en parella d'aquella sessió; cal reescriure el guió de S4 i la fitxa perquè diguin una sola cosa.
- **(b) Sessió extra de prova** (mínim canvi de material): la prova ocupa una sessió pròpia després de la S4. Cost: +1 sessió per trimestre (el marge d'~1 h no ho cobreix; caldria activar d'entrada la retallada de les 4es sessions d'ampliació de SA2/SA4, que ja són opcionals per disseny — quadra: 2 sessions alliberades per a 2 proves).
- **(c) Producte a S3, prova a S4**: comprimir el producte a la S3 (que ara té repte propi). Cost: la S3 s'atapeeix; el mini-check de SA3/SA6 ja és a la S3.

*Recomanació: (b) per a T1 i T2, finançada amb les 4es sessions opcionals de SA2 i SA4. És l'única que no fa trampes amb el temps i manté producte i prova amb identitat pròpia. El doc 08 ja conté la lògica ("primera retallada: les 4es sessions"); només cal fer-la oficial d'entrada en lloc de contingent.*

### T2 · [NOU] 🔴 La porta d'entrada docent instal·la l'entorn equivocat per a l'aula real

**On:** `GUIA_INICI_DOCENT.md` §1.1 i §1.4 · contrast amb `Classes/SA0/SA0_guia_web_editor_chromebook.md` i el Classroom real.

La guia d'inici (document núm. 1 del docent nou) dedica la secció 1.1 a **instal·lar l'Arduino IDE d'escriptori + driver CH340 a Windows**, i la checklist de la primera setmana comença per "Arduino IDE instal·lat". Però **l'aula real treballa amb Chromebooks** (el Classroom sencer està muntat sobre el Web Editor + extensió), i el repositori ja té la guia de la via Chromebook (`SA0_guia_web_editor_chromebook.md`) — que la GUIA_INICI **no menciona ni una vegada**. Un docent nou seguiria la checklist, instal·laria l'IDE al seu portàtil… i el primer dia d'aula descobriria que l'alumnat no pot fer el mateix.

**Proposta:** reescriure §1.1 com a **"tria la teva via"** (A: Chromebook/Web Editor — la del centre, enllaçant la guia SA0; B: IDE d'escriptori — per a l'ordinador del docent i com a pla B), i esmenar la checklist de la primera setmana (provar el flux del Web Editor amb un Chromebook real, verificar l'extensió/permisos de la xarxa del centre). Cost: 1 fitxer.

### T3 · [NOU] 🟠 Sobrecàrrega d'orquestració per sessió: falta la "partitura mínima"

**On:** transversal (guies docents + 00_General).

Una sessió tipus demana al docent, alhora: graella d'activació (5') + referent (1') + modelatge amb predicció PRIMM (5' + 20') + racó de mesura rotatiu (5'/parella) + pràctica guiada + repte amb pseudocodi previ + tancament amb quadern + rotació de rols A/B + targetes de rescat + exit ticket + (segons el dia) mini-check. Cada peça està justificada i cap no costa "temps nou" sobre el paper, però **la càrrega de canvi de context del docent no està pressupostada**. Un docent expert ho filtra sol; un de nou intentarà fer-ho tot i naufragarà a la segona setmana — o ho abandonarà tot de cop.

**Proposta:** una secció de mig full a la GUIA_INICI (o un `00_Mode_supervivencia.md`): **"Les 3 coses no negociables de cada sessió"** (1. graella d'activació — la memòria del curs; 2. predicció abans d'executar — el cor de PRIMM; 3. 2' de quadern al tancament) + regla explícita: *"tota la resta (referents, racó de mesura, exit ticket, coavaluació) és capa 2: incorpora-la quan les 3 primeres et surtin soles, no abans"*. Els checklists docents per SA ja existeixen; això és la capa **per sobre**: l'ordre d'adopció. Cost: 1 fitxer curt + 1 enllaç.

### T4 · [NOU] 🟡 El README del repositori no enllaça el web

**On:** `README.md` (arrel).

La primera pantalla que veu qualsevol persona que arriba al repo (GitHub) no conté **cap** enllaç al web de GitHub Pages — la interfície principal del material. La GUIA_INICI sí que el destaca, però el README és la porta amb més trànsit. Cost: 2 línies.

### T5 · [NOU] 🟡 SA5 declara "7 h (3-4 sessions)" — no quadra amb sessions de 2 h

**On:** `14_SA5_microbit_micropython.md` · `08_Sequenciacio` · `SA5_guia_docent.md`.

Amb sessions de 2 h, 7 h no és possible: són 3 sessions (6 h) o 4 (8 h). La guia docent de SA5 té 3 sessions desenvolupades + la S4 marcada "opc./+ampliació" a la programació. El "7" és un compromís comptable perquè el total doni 69, però un docent nou que planifica el calendari es troba mitja sessió fantasma. **Proposta:** declarar SA5 = 6 h (3 sessions) + S4 opcional, i recomptar el total anual (63 h de nucli + ampliacions + marge = més honest i dona espai a la solució (b) de T1). Cost: 2 fitxers.

### T6 · [CONEGUT-PENDENT] 🟡 Qüestionaris de conceptes només a SA1 i SA2

**On:** `Classes/SA1/SA1_questionari_conceptes.md` (stub) i `SA2_questionari_conceptes.md` (128 línies); res a SA3-SA9.

El web ofereix "Qüestionari de conceptes — per repassar" a SA1/SA2 i enlloc més: inconsistència que l'alumne percep (i que toca la memòria a llarg termini — vegeu §4.2). Les rondes prèvies no ho van llistar com a pendent explícit. **Proposta:** vegeu P-C de la proposta final (banc de qüestionaris autocorrectius per SA).

---

## 3. Troballes — perspectiva de l'alumne

### T7 · [NOU] 🟠 El trimestre 2 és un carrusel de plataformes: C++ → Python → C++ en 3 SA seguides

**Corba d'aprenentatge.** El T1 és una escala perfecta (cada SA reutilitza l'anterior, mateix entorn). El T2, en canvi, demana: SA4 Arduino/C++ (pont H, llibreries — càrrega alta) → SA5 **canvi total** de placa, llenguatge i editor → SA6 **retorn** a Arduino/C++ per fer el salt cognitiu més gran del curs (màquines d'estats + `millis()` + no-bloqueig). L'alumne mitjà arriba a SA6 amb el C++ **rovellat per 3-4 setmanes de Python**, just quan més fluïdesa necessita. Les mitigacions existents (Part C de SA0, graelles de repàs espaiat que recuperen C++ durant SA5, `05_dos_leds_millis` practicat a SA4) amorteixen però no eliminen el cost del doble canvi de context.

No proposo reordenar (la seqüència té justificació curricular i la prova T2 integra les dues plataformes). **Proposta de baix cost:** durant SA5, la pregunta P① o P② de cada graella d'activació ha de ser **sempre de C++** (manteniment actiu del llenguatge aparcat) — ara les graelles de SA5 poden ser 100 % Python. Revisar les 3-4 graelles de SA5 al banc. Cost: edicions al `00_Banc_activacio_repas.md`.

### T8 · [NOU] 🟡 Dos glossaris per al mateix dubte

`SA0_vocabulari_essencial.md` (per SA, amb analogies) i `00_Glossari_tecnic.md` (per blocs, català↔anglès). Tots dos són bons i tenen rols diferents, però l'alumne amb el dubte "què era el debounce?" té **dos llocs on mirar** i cap dels dos no enllaça l'altre com a "si no és aquí, mira allà". Cost: 1 línia de capçalera creuada a cadascun.

### T9 · [RESOLT — verificat] El recorregut d'alumne al web funciona

Verificat en local: portada → "Què vols fer?" → SA1 → itinerari per sessions → fitxa base (objectius/avaluació + enllaç Classroom + DEPURA) → checklist. La vista Alumnat/Docent commuta bé, el fil de SA (stepper SA0-SA9) hi és a totes les SA, "Baixa PDF" present, "En aquesta pàgina" (TOC) present. La capa d'orientació de l'alumne és de les millors coses del material.

### T10 · [CONEGUT-PENDENT] 🟡 Pla B del T3 sense simulador

SA5, SA7 i la part micro:bit de SA8 no són simulables a Wokwi (limitació documentada als Reptes). Al T3, si el 3dBot falla, el pla B és feble. Ja conegut; segueix sense mitigació documentada (p. ex. simulador micro:bit de python.microbit.org com a pla B explícit de SA5/SA8 a les guies — el de SA7 no en té).

---

## 4. Les tres memòries

### 4.1 · Carpeta `Memòria treball/` — [NOU] 🟠 l'índex ha quedat enrere

- **58 documents**, README n'indexa **14** (43 sense indexar, tot el juliol inclòs). La convenció "cada avenç → doc nou" funciona; l'índex no s'ha mantingut. Qui arribi d'aquí un any (tu mateix el juny de 2027, per a la revisió del 06b) haurà de reconstruir la cronologia a mà.
- **Proposta:** README regenerable — taula completa per data amb una línia per doc (es pot generar amb un script de 10 línies a partir dels títols H1) + un bloc curt "**Fites**" a dalt (5-6 línies: creació juny → rondes pedagògiques → web → Classroom) perquè no calgui llegir 58 títols per orientar-se.
- Positiu: els documents en si són **reconstructius de debò** (decisions + evidència + estat), no diaris buits. El valor hi és; només falta el mapa.

### 4.2 · Memòria de l'alumne (retenció) — P1 aplicat i ben integrat; queda un buit fora de l'aula

- **[RESOLT — verificat]** El repàs espaiat (P1 del 02-07) està efectivament desplegat: banc amb 33 graelles, integrat a la fase d'Activació de la metodologia, referenciat a LLEGEIX-ME i doc 06. L'efecte test + espaiat **dins l'aula** està cobert.
- **[NOU] 🟡 Fora de l'aula no hi ha res:** amb 2 h/setmana, entre sessió i sessió passen 3-4 dies i entre SA i prova, setmanes. No hi ha cap mecanisme de repàs **a casa** (ni deures — decisió legítima — ni res voluntari autocorrectiu). La infraestructura ja existeix (Forms autocorrectius al Classroom, patró de la prova diagnòstica). **Proposta P-C:** un **qüestionari autocorrectiu de 8-10 preguntes per SA** (Google Form, no qualifica, reintents il·limitats) publicat en tancar cada SA: repàs voluntari a casa + eina de repesca per als 🔴 dels mini-checks + estén els "qüestionaris de conceptes" (ara només SA1-SA2, T6) a tot el curs amb un format únic.

### 4.3 · Memòria persistent (Claude) — al dia

MEMORY.md i els 13 fitxers reflecteixen l'estat real (Classroom, Forms, rúbriques, pendents tècnics). Única millora aplicable: quan es resolgui T1/T5 caldrà actualitzar `project-robotica-1batx`. Cap acció ara.

---

## 5. Nivell visual (web, en local)

- **Global:** net, jeràrquic, llegible; identitat per trimestre (colors SA), stepper, TOC lateral, controls A-/A+/Aa i tema fosc, vista dual amb persistència. Per sobre de l'estàndard de material docent.
- **[RESOLT — verificat]** El pilot visual de SA1 (SVG placa etiquetada/muda, model E-P-S, foto CC) **ja està replicat en l'essencial**: SA4 (esquema pont H en SVG), SA6 (llaç tancat + histèresi), SA9 (taulell àgil + mètode de projecte). Les 9 SA tenen 2-5 imatges. El pendent real ja no és "replicar el pilot" sinó **fotos reals de muntatges** (Fritzing/foto de protoboard per pràctica), que és producció manual — pendent conegut des del 29-06.
- **[NOU] 🟢 Menor:** en fer scroll ràpid s'observa un repintat estrany del header sticky (doble header transitori). Vist en local amb Chrome; no reproduït de forma consistent. Vigilar-ho al Pages real; si es confirma, és un `position: sticky` + `transform` al CSS.
- **[CONEGUT-PENDENT]** Cerca sense cos indexat (P8 del 08-07: cercar "histèresi" no troba la fitxa SA6 si no és al títol) i visor amb dependència de CDN/Office (P9). Confirmats pendents (`cerca-index.js` sense camp `b`; `visor.html` amb jsdelivr + officeapps).

---

## 6. Estat dels pendents tècnics (auditoria 08-07) — verificat avui

| # | Proposta | Estat |
|---|---|---|
| P2 · build determinista | ✅ Fet (`BUILD_DATE = build_date()` derivada) |
| P6 · requirements fixats | ✅ Fet |
| P3 · CI construeix | ✅ Fet (workflow: pip install → generar → generar_pdf → deploy) |
| P1 · sortida fora del repo | ⚠️ **Mig fet:** `.gitignore` cobreix `web/` (7 fitxers font versionats), però **l'històric no s'ha purgat**: pack de **334 MB**. El `filter-repo` segueix pendent — és la peça que arregla el fetch lent. |
| P4 · modularitzar + tests | ❌ Pendent (`generar.py` ara 1809 línies — ha **crescut** 280 des de l'auditoria) |
| P5 · enllaços per regex | ❌ Pendent |
| P7 · QA/link-checker a CI | ❌ Pendent (no hi ha `tools/`) |
| P8 · cerca al cos | ❌ Pendent |
| P9 · visor autocontingut | ❌ Pendent |
| P10 · compilar sketches a CI | ❌ Pendent |

---

## 7. Proposta de canvi i millora (prioritzada)

**Bloc A — abans de setembre (afecten el primer dia de curs):**

| # | Acció | Troballa | Esforç |
|---|---|---|---|
| A1 | **Resoldre la col·lisió prova/producte** de SA3-S4 i SA6-S4 (recomanat: sessió pròpia de prova finançada amb les 4es sessions opcionals de SA2/SA4; reescriure guions S4, fitxes SA3/SA6 i doc 08) | T1 | M (½ dia) |
| A2 | **GUIA_INICI amb "tria la teva via"** (Chromebook/Web Editor primer; IDE escriptori com a via B) + checklist 1a setmana esmenada | T2 | S (2 h) |
| A3 | **"Mode supervivència"**: les 3 rutines no negociables per sessió + ordre d'adopció de la resta | T3 | S (2 h) |
| A4 | Quadrar **SA5 = 6 h** i recomptar el total anual (coherent amb A1) | T5 | XS |
| A5 | README arrel: **enllaç al web** a dalt de tot | T4 | XS |

**Bloc B — durant el 1r trimestre (milloren la retenció i el T2):**

| # | Acció | Troballa | Esforç |
|---|---|---|---|
| B1 | **Qüestionari autocorrectiu per SA** (Form, no qualifica, reintents) publicat en tancar cada SA — repàs a casa + repesca dels 🔴 + unifica els "qüestionaris de conceptes" | T6 + §4.2 | M (la infra Forms ja existeix; 9 formularis) |
| B2 | Graelles d'activació de **SA5 amb 1 pregunta C++ garantida** (manteniment del llenguatge aparcat) | T7 | XS |
| B3 | Creuament de capçaleres entre els **dos glossaris** | T8 | XS |
| B4 | Pla B explícit de **simulador micro:bit** a les guies SA5/SA8 | T10 | XS |

**Bloc C — manteniment i tècnic (sense pressa de calendari):**

| # | Acció | Troballa | Esforç |
|---|---|---|---|
| C1 | **README de Memòria treball regenerable** (taula completa + fites) | §4.1 | S |
| C2 | **`git filter-repo`** per purgar l'històric (334 MB → ~20 MB); reclonatge de l'altra màquina | P1 | S + coordinació |
| C3 | Cerca amb cos indexat (P8) — la millora de producte amb més impacte per a l'alumne | P8 | S |
| C4 | QA a CI: link-checker + compilació de sketches (P7+P10) — xarxa de seguretat abans de tocar res més | P7/P10 | M |
| C5 | Resta d'auditoria tècnica (P4, P5, P9) segons full de ruta del 08-07 | — | L |

**Ordre recomanat:** A1 → A2 → A4 (van juntes: calendari) → A3/A5 → B2/B3/B4 → B1 → C1 → C2 → C3/C4 → C5.

---

## 8. El que un ull nou confirma que és or (no tocar)

- La **capa d'orientació de l'alumne** (fitxa base amb caixa d'objectius/avaluació, versió nucli, DEPURA al punt d'ús, targetes de rescat): un alumne perdut sap sempre quin és el següent pas.
- La **traçabilitat instrument→CA→rúbrica** a cada guia: cap material docent públic que conegui la té a aquest nivell.
- El **sistema formatiu que no qualifica** (graelles, mini-checks, dianes) amb la seva lògica de radar explicitada a l'alumnat.
- La **honestedat temporal** del doc 04 (arrencada/recollida pressupostades) i el pla de contingència del doc 08 — precisament per això la T1 destaca: és l'única esquerda en un edifici que es pren el temps seriosament.

---

*Informe de la 6a ronda. Cap fitxer del material del curs editat: tot queda com a proposta pendent de decisió del docent.*
