# 2026-06-29 · Integració de la Intel·ligència Artificial a les SA

Registre de la feina per **introduir la IA de manera coherent** a tot el curs, a petició del docent. S'ha treballat amb **dos eixos** i desplegament **complet**.

## Plantejament

La IA ja era contingut prescriptiu (CE5 / CA5.1 / sabers: *"IA aplicada als sistemes de control"*), però quedava **concentrada en una sola sessió** (SA8·S3) i només com a *classificador per regles*. Es decideix:

- **Eix A — IA com a objecte d'estudi:** introduir-la **en espiral** (petites llavors SA0→SA9) amb **nucli a la SA8**, ampliant de *regles* a **ML real**.
- **Eix B — IA com a eina de treball:** afegir un **protocol d'ús d'assistents d'IA** (ChatGPT/Copilot) amb **integritat acadèmica**, lligat a DEPURA i a les rúbriques existents.

## Què s'ha creat

- **`Classes/00_IA_a_la_materia.md`** (NOU) — guia transversal per al professorat: ancoratge curricular, els dos eixos, **mapa espiral SA0→SA9**, marc conceptual mínim (regles vs ML, dades→model→decisió, biaix, ètica), **protocol d'ús d'assistents d'IA** (regla d'or "DEPURA primer", **semàfor d'usos** 🟢🟡🔴, verificació "explica-ho", citació al quadern, encaix amb R1/R4/R5, avisos de privadesa/edat/equitat) i Pla B.
- **`Classes/SA8/SA8_practica_teachable_machine.md`** (NOU) — pràctica de **ML real sense maquinari extra** (Teachable Machine al navegador): recollir exemples → entrenar → provar → trencar a propòsit → millorar → reflexió de biaix/ètica. Amb guia docent, full d'alumnat, Pla B (demo projectada / sense internet) i avís de privadesa (no cares d'alumnes).

## Què s'ha modificat

- **`Classes/SA8/SA8_guia_docent.md`** — objectius 3 i 4 reescrits (regles↔ML, biaix, ús responsable d'IA); nota d'encapçalament + enllaç al marc transversal; **Sessió 3 ampliada** ("De regles a ML real" amb Teachable Machine + alternativa MakeCode ML); material i fila d'ampliació actualitzats.
- **`Classes/SA8/SA8_fitxa_alumnat.md`** — Activitat 3 amb el salt a ML (Teachable Machine); bloc nou al quadern tècnic: **registre honest d'ús d'assistents d'IA**.
- **`Classes/SA3/SA6/SA7_guia_docent.md`** — caixa **"Connexió amb la IA (llavor)"** de 2–3': SA3 (llindar = regla precursora del classificador), SA6 (IA aplicada al control — saber literal), SA7 (comportament programat vs après; lliga amb el referent Daniela Rus).
- **`Classes/SA0/SA0_vocabulari_essencial.md`** — bloc SA8 ampliat: regles fetes a mà, ML, dades d'entrenament, model, classificació, biaix, IA generativa, assistent de codi.
- **`Programació didàctica/07_Rubriques.md`** — nota sobre **integritat amb IA** (sense rúbrica nova: s'integra a R1/R4/R5) i **traçabilitat de CA5.1**.
- **`Classes/README.md`** i **`Classes/00_LLEGEIX-ME_Classes.md`** — enllacen el nou material transversal.

## Decisions pedagògiques clau

- **Dosi proporcionada:** matèria trimestral (~70 h) → la IA entra com a *tecnologia emergent dins del control*, no com a curs d'IA. Llavors curtes + un nucli.
- **Sense rúbriques noves:** l'ús d'IA s'avalua amb R1 (explicar el codi), R4 (quadern honest) i R5 (DEPURA abans, ús declarat).
- **Eina realista i gratuïta:** Teachable Machine (navegador, sense maquinari ni instal·lació) amb **Pla B** per a aules sense dispositius/internet.
- **Privadesa primer:** no entrenar models amb cares d'alumnes ni enganxar dades personals a assistents d'IA.

## Pendents (FETS en segona tanda)

- ✅ **Repte amb IA a SA9:** ampliat el repte 12 del `Banc_de_reptes.md` amb dues vies (Teachable Machine / micro:bit), requisit mínim, ampliacions graduades i nota de privadesa.
- ✅ **Vídeos per a la llavor de SA7:** nou `Classes/SA7/SA7_recursos_video_IA.md` (termes de cerca estables, fonts fiables, guia de descàrrega offline i Pla B); la caixa d'IA de SA7 hi apunta.
- ✅ **Pòster A4 del semàfor d'usos d'IA:** nou `Classes/00_Poster_IA_us_assistents.md` (regla d'or, semàfor 🟢🟡🔴, "explica-ho", honestedat, avisos); enllaçat des del marc transversal i els índexs.

## Possibles continuacions futures

- Buscar i fixar **URLs concretes** de vídeos validats per al docent (ara hi ha termes de cerca, no enllaços fixos).
- Versions PDF/DOCX imprimibles dels pòsters.
