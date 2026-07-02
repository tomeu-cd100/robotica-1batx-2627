# 2026-07-02 · Aplicació de les millores pedagògiques P1–P10

## Objectiu

Aplicar les **10 propostes** de l'informe `2026-07-02_Analisi_pedagogica_global_i_propostes.md`, aprovades pel docent ("aplicarem totes les modificacions"), pas a pas i en ordre. **Totes aplicades.**

## Fitxers nous (4)

| Fitxer | Proposta | Contingut |
|---|---|---|
| `Classes/00_General/00_Banc_activacio_repas.md` | **P1** | **33 graelles de repàs espaiat** (una per sessió, SA1-S2 → SA9-S5): 3 preguntes retrospectives (sessió anterior · SA anterior · trimestre/fons d'armari) amb respostes per al docent i rutina de 5' (tothom escriu, no qualifica). |
| `Classes/00_General/00_Mini_checks_individuals.md` | **P2** | **7 micro-reptes individuals de 10'** (SA2–SA8), en solitari i sense apunts, amb semàfor de correcció 🟢🟡🔴 i accions de reforç. Radar de l'*efecte passatger*; no qualifica. A SA3/SA6 cau a la S3 (la S4 acull la prova trimestral). |
| `Classes/00_General/00_Guia_defensa_oral.md` | **P7** | **Escala de la defensa oral** (T1: 1'+1 pregunta · T2: 2-3'+decisió tècnica · T3/SA9: 5'+torn de preguntes+demo), guió, errors típics (inclòs "DEPURA en veu alta" si la demo falla) i logística de defenses esglaonades a SA9. |
| `Memòria treball/2026-07-02_Aplicacio_millores_pedagogiques_P1-P10.md` | — | Aquest document. |

## Fitxers editats (per proposta)

- **P1 · Repàs espaiat:** `04_Metodologia.md` (fase Activació ara inclou la graella) · `00_LLEGEIX-ME_Classes.md` (índex).
- **P2 · Rendiment individual:** `Avaluació/00_LLEGEIX-ME_Avaluacio.md` (**T1/T2 individuals per defecte** — la dotació ho permet, 1 kit/alumne; T3 en parella per logística 3dBot, compensat amb preguntes individuals a la defensa) · guies docents **SA2–SA8** (bullet del mini-check a "Avaluació formativa") · `06_Avaluacio_criteris_qualificacio.md` (§6.5: mini-checks i graelles com a instruments formatius) · `00_LLEGEIX-ME_Classes.md`.
- **P3 · Fading de la bastida:** `04_Metodologia.md` (**nou §4.2 bis**: escala PRIMM → pseudocodi → full en blanc → SA9, amb exemple de pseudocodi; materialitza els "diagrames de flux" que el DUA prometia) · fitxes base **SA3–SA8** (pas "✏️ Dissenya abans de codificar" al repte/producte; SA6 el lliga al diagrama d'estats; **SA7/SA8: un repte "a full en blanc"**) · guies **SA7/SA8** (orquestració del full en blanc: no obrir el sketch fins ensenyar el pseudocodi).
- **P4 · Pla de contingència temporal:** `08_Sequenciacio_temporal_anual.md` (nova secció "curs mínim viable": ordre oficial de retallada + trasllat de proves si es retalla S4 de SA3/SA6 + **senyals d'alerta** per decidir al gener/Setmana Santa).
- **P5 · Multímetre (CA2.2):** guies **SA2-S1** i **SA3-S2** ("racó de mesura" rotatiu ~5'/parella: llei de la malla al LED; divisor LDR vs `lectura/1023·5V`) · fitxes base SA2/SA3 (ítem de mesura amb buits) · `09b_Guia_compra_pressupost.md` (2-3 multímetres, ús docent + racó).
- **P6 · Coavaluació amb criteris:** **9 fitxes ampliades (SA1–SA9)** — el "2 estrelles i un desig" ara comença amb una taula de **3 criteris ✓/✗ trets de les rúbriques** específics de la SA, i les estrelles/desig han de sortir de la taula.
- **P7 · Defensa oral:** a més del fitxer nou — `SA9_guia_docent.md` (defenses esglaonades si >6 equips) · fitxa base SA6 (defensa de nivell T2: 2-3' amb decisió tècnica) · `00_LLEGEIX-ME_Classes.md`.
- **P8 · Bucle metacognitiu:** `Prova_practica_T1/T2.md` (**pla de millora personal** de 3 línies post-prova, recuperat a l'inici de SA4/SA7) · `Prova_practica_T3.md` (reflexió final de curs) · `04_Metodologia.md` §4.5 (el quadern incorpora el pseudocodi com a entrada, "els meus 3 errors del trimestre" i el pla post-prova).
- **P9 · Rols en parella:** `00_Poster_aula_metode_DEPURA_rols.md` i `04_Metodologia.md` §4.3 — emparellament fix **A:** Coordinador/a+Programador/a · **B:** Enginyer/a+Provador/a-Documentador/a, intercanvi cada sessió (separa escriure codi de validar-lo).
- **P10 · Vocabulari:** subtítol col·loquial en cursiva al títol de les **8 fitxes base SA2–SA9** (p. ex. SA6 "*que el sistema es reguli sol*", SA7 "*com es mou i gira un robot*"). Guies docents i programació didàctica **no** s'han tocat (el rigor terminològic hi és un valor). Tanca el pendent de l'auditoria del 30-06.

## Decisions de disseny destacables

1. **Cap minut nou:** la graella viu dins l'Activació existent; el mini-check substitueix la graella el dia que toca; el racó de mesura va dins la pràctica guiada. El curs no guanya càrrega horària.
2. **Res del que és nou qualifica** (graelles, mini-checks, plans de millora): són instruments formatius; s'ha explicitat a cada document per protegir la funció de radar.
3. **Coherència entre propostes:** el pseudocodi (P3) és una entrada del quadern (P8); el mini-check (P2) substitueix la graella (P1); la coavaluació amb criteris (P6) és la feina del públic a les defenses (P7).

## Pendents

- **Regenerar el web** (`py web/_generador/generar.py`) i sincronitzar amb GitHub: molts `.md` enllaçats al web han canviat. *(Ho fa el docent o es demana explícitament.)*
- **Imatges reals de circuit** (Fritzing/captures): únic pendent estructural que queda de les rondes anteriors.
- Comprovació empírica a l'aula (curs 2026-2027): la sèrie de semàfors dels mini-checks i les errades massives de les graelles seran la primera evidència real.
