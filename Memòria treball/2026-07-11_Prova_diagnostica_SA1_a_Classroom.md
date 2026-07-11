# 2026-07-11 · Prova diagnòstica SA1 convertida en Google Form + tasca de Classroom

La prova diagnòstica de coneixements previs de la SA1 (`Classes/SA1/SA1_prova_diagnostica.md`) ara és un **Google Form autocorrectiu** publicat com a tasca de Classroom.

## Decisions

- **Quiz autocorrectiu:** mode qüestionari actiu (`quizSettings.isQuiz`); la **Part B** (7 conceptes) té 1 punt i resposta correcta per pregunta → feedback formatiu dins el Form. Part A (experiència) i Part C (oberta) sense puntuació.
- **Sense nota a Classroom:** la tasca **no** porta `maxPoints` (no qualifica). Els punts són interns del Form (informatius). Serveix per situar l'experiència prèvia i **formar parelles heterogènies**, no per avaluar.
- **Publicada** al tema SA1 (la SA1 ja està activa).

## Resultat

| Recurs | Enllaç |
|---|---|
| Tasca Classroom (SA1, PUBLISHED, sense nota) | https://classroom.google.com/c/ODY4ODU4Njk0NTEy/a/ODcwNTM2NzE0Njcx/details |
| Google Form | https://docs.google.com/forms/d/e/1FAIpQLSdzVFJvt3JrJk3UhcO98lSv0vgbQHC49HKZEpCHH-ldRuroWg/viewform |

El Form és a la carpeta de Drive del curs (`1vUzzhLBIArNcRaWdz-nMMtn1R-2l4rMn`) amb el títol com a nom de fitxer.

## Eina nova (`Material Classroom/`, local, fora del repo)

- `crear_diagnostica_sa1.js` — standalone (la llibreria genèrica `_form_sa_lib.js` no cobreix quiz+grading). Reusa `getAuthClient`, `COURSE_ID` i `DRIVE_FOLDER_ID` de la llibreria. Crea el Form, l'activa com a qüestionari amb autocorrecció, el mou a Drive i penja la tasca al tema SA1. Helpers compactes: `curta/paragraf/opcio/caselles/quiz`.

## Canvis al repo

- `Classes/SA1/SA1_prova_diagnostica.md`: nou avís amb l'enllaç a la tasca (visible a tot arreu); la secció «Versió Google Forms» passa a ser **referència de muntatge** i queda embolcallada amb `web:only-github` (el Form ja existeix, la spec és per recrear/modificar).
- `Classes/SA1/README.md`: l'itinerari (sessió 1) enllaça la prova diagnòstica de Classroom; la versió imprimible queda com a secundària.
- Web regenerat i verificat: enllaç a la tasca present, spec de muntatge fora, marcadors balancejats (1 obre / 1 tanca).

## Pendent

- Revisar el Form a la interfície (text pla, sense imatges — limitació de l'API de Forms).
- Al final de la sessió 1: ordenar respostes per Part B + P1 per emparellar alumnat.
