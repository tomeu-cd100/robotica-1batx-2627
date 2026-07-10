# 2026-07-10 · Fitxes base SA1-SA9 convertides en tasques de Classroom

Replica del patró SA0 (vegeu `2026-07-10_Fitxa_SA0_a_Classroom_i_correccio_PRIMM.md`) a totes les SA, amb les decisions del docent:

- **Contingut:** fitxa sencera al Google Form (activitats + autoavaluació en graella + quadern tècnic). Objectius/lliuraments com a text inicial; DEPURA i rúbriques queden a la pàgina web.
- **Qualificació:** tasques **amb nota 0-10** (`maxPoints: 10`), correcció manual (formularis sense quiz — respostes obertes).
- **Publicació:** **SA1-SA2 publicades**, **SA3-SA9 en esborrany** (coherent amb el Classroom actual ~T1); es publiquen quan toqui.
- **Web:** activitats fora del web (`web:only-github`, com la SA0) + secció «Les activitats · al Google Classroom» amb l'enllaç de la tasca. Es mantenen al web: objectius i avaluació, DEPURA i «Vols més». A GitHub tot es conserva (paper/reutilització).

## Eines noves (`Material Classroom/`, local, fora del repo)

- `_form_sa_lib.js` — llibreria: crea el Form (amb `documentTitle`), el mou a la carpeta de Drive del curs, busca/crea el tema `SAn` i penja la tasca. Helpers per definir preguntes (`t/p/s/radio/check/grid/autoaval`).
- `sa_definicions.js` — transcripció fidel de les 9 fitxes en preguntes de Form (~22-27 elements per SA; SA6 amb l'ampliació opcional com a preguntes no obligatòries; SA9 en clau d'equip amb checklist d'entrega).
- `crear_i_penjar_sa1a9.js` — executor (`node crear_i_penjar_sa1a9.js sa3|tot`), idempotent via `resultats_sa1a9.json` (no duplica si ja existeix).

## Resultats

| SA | Estat | Tasca |
|---|---|---|
| SA1 | PUBLISHED | https://classroom.google.com/c/ODY4ODU4Njk0NTEy/a/ODcwNTEwOTcwMDE1/details |
| SA2 | PUBLISHED | https://classroom.google.com/c/ODY4ODU4Njk0NTEy/a/ODcwNTEzOTQ1NjAz/details |
| SA3 | DRAFT | https://classroom.google.com/c/ODY4ODU4Njk0NTEy/a/ODcwNTE4MDEwMzM3/details |
| SA4 | DRAFT | https://classroom.google.com/c/ODY4ODU4Njk0NTEy/a/ODcwNTEzNjkxNjIy/details |
| SA5 | DRAFT | https://classroom.google.com/c/ODY4ODU4Njk0NTEy/a/ODcwNTE3NDYxNTQy/details |
| SA6 | DRAFT | https://classroom.google.com/c/ODY4ODU4Njk0NTEy/a/ODcwNTE2NDU2MzYx/details |
| SA7 | DRAFT | https://classroom.google.com/c/ODY4ODU4Njk0NTEy/a/ODcwNTE4MDMwMTA4/details |
| SA8 | DRAFT | https://classroom.google.com/c/ODY4ODU4Njk0NTEy/a/ODcwNTE3MTIxMDY0/details |
| SA9 | DRAFT | https://classroom.google.com/c/ODY4ODU4Njk0NTEy/a/ODcwNTE3OTM1Nzkw/details |

Notes tècniques descobertes:
- Les tasques **DRAFT no retornen `alternateLink`**; l'URL es construeix de manera determinista: `https://classroom.google.com/c/{b64(courseId)}/a/{b64(courseWorkId)}/details` (base64 de l'ID decimal). Els enllaços del web ja funcionen quan es publica la tasca.
- `topics.list` **pagina**: els temes SA3-SA9 ja existien al Classroom (la primera consulta només en veia una pàgina). El matching per prefix «SAn» els ha trobat tots; cap tema duplicat.
- Els 9 Forms són a la carpeta de Drive del curs amb el títol com a nom de fitxer.

## Canvis al repo

- 9 fitxes `SAn_fitxa_alumnat.md`: capçalera Nom/Data i blocs d'activitats + autoavaluació + quadern embolcallats amb `web:only-github`; secció nova amb l'enllaç de la tasca (amb avís «si encara no t'apareix, la SA no ha començat» a les DRAFT).
- 9 portades `README.md`: la cita de l'itinerari ara diu on es lliuren les respostes (enllaç a la tasca). Les àncores a activitats es mantenen (a GitHub segueixen funcionant; al web cauen a dalt de la fitxa, que redirigeix a Classroom).
- Web regenerat i verificat (9/9: enllaç present, activitats fora, DEPURA i objectius visibles, cap residu de marcador).

## Pendent

- Publicar SA3-SA9 quan toqui (des de Classroom o amb `courseWork.patch state=PUBLISHED`).
- Revisar els 9 Forms a la interfície (codi en text pla; cap imatge).
- Els PDF de les fitxes al web queden sense activitats (mateix efecte conegut que SA0); la versió completa imprimible és el md de GitHub.
