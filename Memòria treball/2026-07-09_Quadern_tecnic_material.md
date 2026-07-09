# 2026-07-09 · Quadern tècnic — materialització del diari de treball

## Objectiu
El quadern tècnic (*logbook*) era un eix estructural del curs **sense suport concret**: pesa el 25 % de la nota (R4), es menciona a 72 fitxers, la metodologia (§4.5) el defineix i les proves permeten consultar-lo — però no existia cap plantilla ni cap lloc definit on l'alumnat el portés.

## Decisions (acordades amb el docent)
- **Val la pena tirar-ho endavant**: tanca un forat que ja es paga (avaluació R4 poc defensable sense suport comú).
- **Suport híbrid**: Google Doc per alumne (repartit via Classroom, «fes una còpia per a cada alumne») + **esquemes i diagrames a mà, fotografiats i enganxats**. Punt dolç entre traçabilitat/correcció eficient i rapidesa del llapis per dibuixar.
- **Recollida d'evidències**: tasca de Classroom per SA amb la rúbrica R4 adjunta; registre distribuït a l'aula (2-3' per fase); lliurament al final de cada SA; qualificació acumulada per trimestre; **historial de revisions** del Doc com a evidència d'autoria (coherent amb la política d'IA).
- **Un sol document** (guia + plantilla d'entrada), no dos: evita duplicació que es desincronitza. Digital i PDF imprimible del mateix origen.
- **Enllaçat a totes les fitxes** que tenen secció «Quadern tècnic» (SA1–SA8; SA0 no en té perquè és autodiagnòstic i SA9 usa el dossier tècnic d'equip).

## Què s'ha fet
- **Nou** `Classes/00_General/00_Quadern_tecnic.md`: per què compta (25 %, R4, consultable a proves) · **5 regles** (Doc per Classroom; escriure a cada sessió; esquemes a mà fotografiats; errors documentats sumen; declarar IA) · **plantilla d'entrada** amb els 6 camps de la metodologia §4.5 (objectiu+esquema · pseudocodi · codi i decisions · proves i errors DEPURA · reflexió · ús d'IA).
- **Generador**: classificat `alumnat` (visible a la vista alumnat) i marcat **activitat** → es genera **PDF imprimible** (40 activitats, abans 39).
- **Enllaços**: nota a la secció «Quadern tècnic» de les **8 fitxes** SA1–SA8 · bloc «El meu quadern tècnic» al **hub d'alumnat** · **4a targeta** a la portada d'alumnat («Què vols fer?») · entrada al README del material transversal.

## Verificació
Build net; pàgina generada amb `data-public="alumnat"`; present al manifest PDF; enllaços de les fitxes reescrits correctament (`../00-general/00-quadern-tecnic.html`); visible des de portada i hub d'alumnat.

## Pendents (a l'aula, no al repo)
- Crear la **tasca de Classroom** «Quadern tècnic» amb el Doc plantilla i la rúbrica R4 (una per SA o per trimestre).
- Presentar-lo la primera setmana juntament amb «Com s'avalua la matèria».
