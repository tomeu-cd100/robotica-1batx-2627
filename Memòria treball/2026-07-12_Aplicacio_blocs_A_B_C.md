# 2026-07-12 · Aplicació dels blocs A, B i C de la 6a ronda («ulls nous»)

Aplicació de la proposta de `2026-07-12_Analisi_ulls_nous_professor_i_alumne.md`, aprovada sencera pel docent («tira endavant els 3 blocs»).

## Bloc A — abans de setembre (calendari i portes d'entrada)

### A1 · Col·lisió prova/producte resolta — amb canvi de via justificat

L'informe recomanava la via (b) (sessió pròpia de prova finançada amb les «4es sessions opcionals» de SA2/SA4). **En implementar-ho es va comprovar que la premissa era falsa:** les S4 de SA2/SA4 no són ampliacions — contenen els **productes** (45 % de la nota). L'aritmètica real (68 h de SA + 4 h de proves = 72 h > 70 h) feia la via (b) impossible sense retallar producte. **S'ha aplicat la via (a):**

- **La S4 de SA3 és, sencera, la prova T1** (individual); el producte (alarma/aparcament) **es tanca a la S3** (el repte de la S3 és el producte, amb defensa d'1' a peu de taula).
- **La S4 de SA6 és, sencera, la prova T2**; el producte es tanca a la S3 (defenses de 2-3' a peu de taula durant el repte) i el **control proporcional passa a +ampliació sense sessió pròpia** (ja era «no nucli» de facto).
- Editats: doc 08 (nova secció de proves amb sessió pròpia; contingència reescrita — les S4 de SA3/SA6 no es retallen mai), 00_Index, fitxes de programació 12/15, guies + fitxes + checklists + README de SA3 i SA6, proves T1/T2 (durada = una sessió, individual), LLEGEIX-ME d'Avaluació, mini-checks i banc d'activació (les graelles de SA3-S4/SA6-S4 queden com a escalfament opcional del dia de prova).

### A4 · SA5 = 6 h (dins A1)
«7 h (3-4 sessions)» era impossible amb sessions de 2 h. Ara: **6 h (3 sessions) + 4a opcional d'ampliació** (la comparativa C++↔Python es tanca dins la S3 si no es fa la 4a). Total anual: **68 h de SA + ~2 h de marge = 70 h**. Editats: 08, 00_Index, 14_SA5, guia/checklist/README de SA5.

### A2 · GUIA_INICI amb la via Chromebook primer
§1.1 reescrit com a **«Tria la teva via»**: **Via A = Chromebook + Arduino Web Editor** (la de l'aula real, enllaçant `SA0_guia_web_editor_chromebook.md`, amb verificació de xarxa del centre) i **Via B = IDE d'escriptori** (màquina del docent i pla B). Checklist de la 1a setmana esmenada (provar el flux amb un Chromebook real) i fila del Web Editor a la taula de comptes.

### A3 · Mode supervivència
Nou **`Classes/00_General/00_Mode_supervivencia.md`**: les **3 rutines no negociables** de cada sessió (graella d'activació · predir abans d'executar · 2-3' de quadern), capa 2 (mini-check, targetes, rols, racó de mesura) i capa 3, més el que no es retalla mai. Enllaçat des de la GUIA_INICI (primera fila del mapa) i del LLEGEIX-ME de Classes.

### A5 · README arrel
Enllaç al web navegable (vistes, cercador, PDF) a dalt de tot.

## Bloc B — retenció i transicions

- **B1 · Qüestionaris de repàs autocorrectius (SA1-SA9):** 9 Google Forms en mode quiz (8-9 preguntes de nucli cadascun, 1 punt, solucions en enviar, repetibles, **no qualifiquen**), creats amb `Material Classroom/crear_questionaris_repas.js` (reutilitza `_form_sa_lib.js`; Forms a la carpeta de Drive del curs). **Tasca de Classroom en DRAFT al tema de cada SA** — es publica en tancar la SA. És el repàs espaiat **fora de l'aula** i la repesca dels 🔴 del mini-check. Banc i enllaços: `Classes/00_General/00_Questionaris_repas.md`; referenciat al LLEGEIX-ME i a «Com s'avalua» (taula del que no posa nota). Resultats: `Material Classroom/resultats_questionaris_repas.json`.
- **B2 · C++ viu durant SA5:** nota de capçalera al banc d'activació (cada graella de SA5 manté C++; no substituir per Python) + la P② de SA5-S3 ara demana **escriure C++ de memòria** (l'`if` de lectura analògica). *(Verificació honesta: les graelles ja tenien C++ conceptual a cada sessió — el que faltava era escriptura activa i la regla explícita.)*
- **B3 · Glossaris creuats:** capçalera de cadascun apunta a l'altre amb el criteri d'ús (SA0 = concepte amb analogies; 00_Glossari = anglès tècnic).
- **B4 · Pla B sense maquinari a SA5/SA8:** caixa a les dues guies — el simulador de python.microbit.org cobreix S1/S2 de SA5 i els gestos de SA8; la **ràdio no és simulable** → demo projectada del docent amb 2 plaques mentre les parelles programen al simulador.

## Bloc C — manteniment i tècnic

- **C1 · Índex regenerable de la memòria:** `tools/genera_index_memoria.py` regenera el README de `Memòria treball/` (bloc de **fites** + taula completa; abans 14/58 indexats).
- **C3 (P8) · Cerca amb cos:** `generar.py` afegeix el camp `b` (text pla del cos, 1500 caràcters, sense `<pre>`) a l'índex; `lloc.js` fa dues passades (títol/secció primer, cos després). **Verificat al navegador:** «histeresi» ara retorna fitxa, checklist i esquemes de SA6. Índex: ~260 KB.
- **C4 (P7+P10) · QA a CI:** `tools/qa.py` (enllaços locals del web generat · cobertura de material per SA · coherència horària del doc 08 · `py_compile` dels .py d'alumnat) + workflow **`.github/workflows/qa.yml`** amb un segon job que **compila tots els sketches .ino** per a `arduino:avr:uno` (`arduino/compile-sketches`, llibreria Servo; l'ESP32 opcional queda exclòs). **El QA ja ha pagat el peatge:** ha destapat que els enllaços `[codi](codi/)` dels itineraris eren morts al web → el generador ara resol carpetes de codi cap a la pàgina de codi de la SA (0 trencats a 208 pàgines).
- **C5 parcial (P9) · Visor autocontingut:** pdf.js **4.7.76 vendoritzat** a `web/assets/vendor/pdfjs/` (el visor ja no depèn del CDN; **verificat** en local servint el web) + **avís de privadesa** a la previsualització Office (via Microsoft) amb alternativa d'obrir a GitHub.

### C2 · Purga d'històric git — NO executada (descobriment que canvia el pla)

L'anàlisi prèvia al `filter-repo` ha desmentit la premissa de l'auditoria del 08-07:

| Què pesa a l'històric | MB | Estat |
|---|---|---|
| `Recursos/` | **388,5** | Els blobs grossos són **VIUS** (llibres/manuals de tercers: STEAMakers 90 MB, manuals ArduinoBlocks 9-18 MB…) |
| `web/` (generat, històric) | 62 | Purgable (els 7 fonts vius es conserven) |
| resta | 23 | — |

- Purgar només `web/` deixaria el repo a **~275 MB**, no als ~20 MB promesos: **el coll d'ampolla del fetch lent són els PDF vius de Recursos/**, no el web.
- A més, són **PDF de tercers amb copyright** dins d'un repo públic CC BY-SA: treure'ls (queden referenciats per l'Excel de recursos amb enllaços originals) seria alhora la solució de mida i la neteja de llicència. **Decisió de contingut que correspon al docent.**
- GitHub inaccessible durant la sessió (xarxa del centre): tampoc no es podia fer el `push --force`.

**Procediment deixat a punt per quan es decideixi** (amb xarxa): 1) `git clone --mirror` de seguretat; 2) `pip install git-filter-repo`; 3) `git filter-repo --invert-paths --path web/pdf --path web/classes --path web/programacio --path web/avaluacio --path web/normativa --path web/reptes --path web/recursos --path web/simulacions --path web/assets/img` (+ si es decideix, `--path 'Recursos/<fitxers pesats>'`); 4) re-afegir `origin` i `git push --force`; 5) reclonar l'altra màquina.

### C5 pendent (P4 + P5) — fora d'abast d'una sessió
- **P4** (modularitzar `generar.py`, ara 1834 línies, + pytest): feina de 3-5 dies; **ara amb menys risc** perquè el QA de C4 fa de xarxa de seguretat (regressió d'enllaços/cobertura es detecta al CI).
- **P5** (reescriptura d'enllaços per arbre en lloc de regex): risc mitigat pel link-checker; recomanat fer-lo **dins** del refactor P4, no abans.

## Verificacions fetes
- `py tools/qa.py` → **✅ net** (208 pàgines, 0 enllaços trencats; cobertura completa; hores 68=68; 7 .py sense errors).
- Cerca «histeresi» al navegador → fitxa/checklist/esquemes SA6 ✅.
- Visor PDF amb pdf.js local al navegador ✅.
- Web regenerat sense errors (207 entrades d'índex).

## Pendents que queden vius
1. **Push a GitHub** (xarxa del centre el bloquejava): els 4 commits d'avui (informe + blocs A/B/C) queden en local. En fer `git push`, el CI reconstruirà el web i correrà el QA nou per primera vegada.
2. **Decisió C2:** què fer amb els PDF de tercers de `Recursos/` (quedar-se ~275 MB purgant només web/, o treure'ls i baixar a ~30 MB). Després, executar el procediment de dalt.
3. **P4/P5** (refactor del generador) quan hi hagi una finestra llarga.
4. Publicar cada qüestionari de repàs al Classroom **quan es tanqui la SA** (ara en DRAFT).
5. Fotos reals de muntatges (pendent de producció manual des del 29-06).
