# 2026-07-10 · Fitxa SA0 a Classroom (Google Form) i correcció PRIMM

## 1. Correcció de les sigles PRIMM

**Problema:** a `Classes/SA0/SA0_guia_programacio.md` i al pòster d'aula, les negretes marcaven les inicials catalanes (**P**redir · **E**xecutar · **I**nvestigar · **M**odificar · **C**rear = P-E-I-M-C), que no quadren amb l'acrònim anglès **PRIMM**.

**Solució:** es conserva l'acrònim original (Sentance & Waite, 2017) i cada pas glossa el terme anglès d'origen:

1. **Predir** (*Predict*) · 2. **Executar** (*Run*) · 3. **Investigar** (*Investigate*) · 4. **Modificar** (*Modify*) · 5. **Crear** (*Make*)

**Fitxers tocats:** `Classes/SA0/SA0_guia_programacio.md` (llista + nota d'origen) i `Classes/00_General/00_Poster_aula_metode_DEPURA_rols.md` (versió en línia). Commit `dc70661`, pujat a `main`; el web es regenera a CI.

## 2. Fitxa SA0 convertida en activitat de Classroom

**Decisions (consultades al docent):** Google Form interactiu · contingut complet (activitats 1-6 + exit ticket + autoavaluació) · **sense nota** i publicada directament (coherent amb «no es qualifica, autoaprenentatge»).

**Com s'ha fet:** nou script `Material Classroom/crear_i_penjar_sa0.js` (calcat del patró de `crear_i_penjar_sa1.js`; la carpeta és eina local, fora del repo). El script:

- Crea el Google Form amb tota la fitxa `Classes/SA0/SA0_fitxa_alumnat.md`:
  - Activitat 1 (E-P-S): 3 preguntes de paràgraf (una per sistema).
  - **Activitats 2 i 3: autocorrectives** (quiz mode, 1 punt intern per ítem; l'alumnat veu les solucions en enviar — feedback formatiu, no nota).
  - Activitats 4-6: text obert (predicció, error, buits de MicroPython) amb el codi als encapçalaments de secció.
  - Exit ticket (3 respostes curtes) + pregunta ODS + **autoavaluació com a graella semàfor** (`questionGroupItem.grid`, files = destreses, columnes = 🔴🟡🟢).
- Penja la tasca al tema existent **«SA0 · Vocabulari essencial i bases de programació»** (ID 798422971376), `workType: ASSIGNMENT`, `state: PUBLISHED`, **sense `maxPoints`** (= tasca sense nota a Classroom).
- Adjunta 3 enllaços: el Form + vocabulari essencial i guia de programació del web (GitHub Pages).

**Resultats:**

- Form: ID `1wS9VoYVKO_uBNB3ClPY9N7q9u61XsgOB-DKbGTdrAYo` — https://docs.google.com/forms/d/e/1FAIpQLSfPILGPPsrMK6LLp8SlJlEZZoXln5hGrHgzIdnIzN4OQqeuXA/viewform
- Tasca Classroom: https://classroom.google.com/c/ODY4ODU4Njk0NTEy/a/ODcwNTEwMDkwMTY1/details

## 3. Carpeta de Drive per als Forms (convenció nova)

**Decisió del docent:** a partir d'ara **tots els Google Forms** es desen a la carpeta de Drive del curs: https://drive.google.com/drive/folders/1vUzzhLBIArNcRaWdz-nMMtn1R-2l4rMn

- Moguts els 3 Forms existents (SA0 + 2×SA1) amb `Material Classroom/moure_forms_a_carpeta.js`.
- Renombrats a Drive amb el títol real del Form (`renombrar_forms_drive.js`): `forms.create` amb només `info.title` deixa el fitxer com a «Formulari sense títol»; el nom de Drive és `info.documentTitle` i només es pot fixar en crear.
- Patró actualitzat a `crear_i_penjar_sa0.js`: `documentTitle` en la creació + moviment automàtic a la carpeta (`drive.files.update` amb `addParents`/`removeParents`; l'scope `drive.file` ja ho cobreix).

**Detectat:** hi ha **dos Forms SA1 duplicats** amb el mateix títol («SA1 · Qüestionari de conceptes…», IDs `1YE3uHuJp…` i `1wXbvX3d…`) — probablement d'una execució repetida del script. Cal comprovar quin està enllaçat a la tasca de Classroom i valorar esborrar l'orfe.

## 4. La fitxa del web apunta a Classroom

A `Classes/SA0/SA0_fitxa_alumnat.md` les **activitats 1-6** s'han embolcallat amb `<!-- web:only-github -->` (es conserven al repo per imprimir/reutilitzar, però desapareixen del web) i s'hi ha afegit la secció **«Les activitats · al Google Classroom»** amb l'enllaç a la tasca. Commit `b5aca8d`, pujat.

**Efecte col·lateral acceptat:** el PDF de la fitxa es genera de l'HTML del web, així que també queda sense activitats (només enllaç a Classroom). La versió imprimible completa és el md de GitHub.

## 5. Auditoria de coherència de la SA0 i correccions

Anàlisi completa de la SA0 (7 documents + web + Classroom) amb 8 correccions aplicades:

1. **Referències trencades al web:** la fitxa citava «Activitat 5» i «Activitats 4 i 6» que ja no es veuen al web (són al Form); ara són autodescriptives («Detecta l'error», «llegir i predir codi»…).
2. **Duplicació eliminada:** exit ticket, pregunta ODS i autoavaluació eren al web **i** al Form; ara al web són `web:only-github` (només Form en línia, paper des de GitHub).
3. **Vestigi de paper:** línia «Nom/Parella/Data» fora del web (`web:only-github`).
4. **Itinerari a la portada SA0:** secció «Itinerari (per on començo?)» en veu d'alumnat (vocabulari → guia → fitxa a Classroom → checklist), renderitzada com a `.ruta` (com les SA1-SA9); instruccions de docent separades a «Per al docent: com integrar-la».
5. **Ordre del pager corregit** (`generar.py`, `DOC_ORDRE_CLAUS`): `vocabulari` ara va abans de les guies i la fitxa (abans sortia *després* de la fitxa). Només afecta SA0 (cap altra SA té pàgina de vocabulari). Ruta alumnat resultant: Presentació → Vocabulari → Guia programació → Guia Chromebook → Fitxa → Checklist.
6. **Referència creuada que faltava:** la guia de programació (A0) ara enllaça la guia del web editor per a Chromebooks (abans només existia el sentit invers).
7. **Doc drift:** README i guia docent no llistaven `SA0_guia_web_editor_chromebook.md` (ni els checklists a la guia docent); taules completades.
8. **Docs docents al dia:** guia docent i checklist docent ara mencionen la tasca de Classroom (Form, sense nota, act. 2-3 autocorrectives).

**Punts forts confirmats (no tocats):** cadena d'enllaços vocabulari→guia→fitxa→Classroom, progressió A0→A9, solucionari alineat amb el Form (verificat), precisions tècniques, missatge «no qualifica» consistent.

## Pendent / següents passos

- Revisar el Form a la interfície (l'API no permet pujar imatges de codi amb format; el codi va en text pla als encapçalaments).
- Replicar el patró per a la resta de fitxes d'alumnat (SA1 ja té el qüestionari de conceptes; les fitxes completes de SA1+ es poden convertir amb el mateix script adaptat).
