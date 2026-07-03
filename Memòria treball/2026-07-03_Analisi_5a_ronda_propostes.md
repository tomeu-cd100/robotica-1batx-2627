# 2026-07-03 · Anàlisi pedagògica — 5a ronda de millores (propostes Q1–Q8)

## Context

Cinquena ronda de millora, a petició del docent («podríem fer encara més millores pedagògiques?»). Direccions acordades: **reforç per SA**, **instruments del docent**, **coeducació i STEM** i **anàlisi lliure**. Després de 4 rondes, els documents existents estan madurs: aquesta ronda no refina el que hi ha, sinó que omple **buits de tipus diferent**, verificats un a un contra el material actual.

## Verificacions prèvies (per no duplicar feina)

| Què s'ha comprovat | Resultat |
|---|---|
| Material de reforç per a l'alumne que s'encalla | ❌ No existeix. Les fitxes només tenen una línia genèrica «Si t'encalles (DEPURA)». Les guies docents sí que anticipen dificultats, però és material **del docent** |
| Full de seguiment individual | ✅ Ja existeix (`Avaluació/Full_qualificacio_competencies.md` §4, per alumne i trimestre). El buit és la **vista de grup** formativa |
| Autoavaluació de la pràctica docent / avaluació de la programació | ❌ Zero ocurrències en tot el repositori. No hi ha cap document `10_*` a la programació |
| Perspectiva de gènere | ⚠️ Només declarativa: §4.6 de Metodologia (3 línies) i §5.5 de Diversitat (1 línia). Cap material operatiu |
| Multinivell (ampliació) | ✅ Cobert: nucli + reptes, carpeta `Reptes/`, §5.4 altes capacitats |
| Glossari de vocabulari tècnic | ❌ No existeix. El vocabulari real (datasheet, pull-up, duty cycle…) apareix dispers i sense pont català-anglès |
| Connexió amb el Treball de Recerca | ⚠️ Una menció a §5.4 (altes capacitats), sense concreció per SA |

---

## Bloc A · Reforç per SA (fa operatiu el que `05_Atencio_a_la_diversitat.md` només declara)

### Q1 · Banc de targetes de rescat (pistes escalonades) — prioritat ALTA

**Buit:** l'alumne que s'encalla en una pràctica només té el mètode DEPURA genèric; si no se'n surt, depèn del docent (coll d'ampolla amb 12+ parelles) o copia del company (aprenentatge zero).

**Proposta:** nou document `Classes/00_General/00_Targetes_rescat.md`, un banc organitzat per SA i pràctica amb els **punts d'encallament previsibles** (els que ja anticipen les guies docents) i, per a cadascun, **3 nivells de pista**:

- **Pista 1 (conceptual):** una pregunta que reorienta («què retorna exactament `analogRead()`? mira-ho amb un `Serial.println`»).
- **Pista 2 (concreta):** el pas específic («el servo tremola perquè comparteixes alimentació: revisa d'on treu els 5 V»).
- **Pista 3 (fragment amb forat):** 2-4 línies de codi amb un buit clau per completar.

**Regles d'ús** (encapçalament del document): l'alumne agafa la pista **del nivell més baix possible**, una cada cop, i **apunta al quadern quina ha usat** (no penalitza — coherent amb la cultura d'error; al contrari, documentar-ho puja R4). El docent les pot imprimir i retallar (targetes físiques al racó de material) o deixar el document obert a l'aula.

**Cost:** 1 document nou (~2-3 encallaments × 8 SA amb pràctica). Cap hora de classe nova. Referència breu a les fitxes («targetes de rescat al racó») i a `05_Atencio_a_la_diversitat.md` §5.2 (que passa de prometre a tenir l'instrument).

### Q2 · «Versió nucli» explícita de cada producte de SA — prioritat ALTA

**Buit:** el multinivell existeix cap amunt (+reptes) però no cap avall: l'alumne que va just no sap quina és la versió mínima digna del producte, i o bé s'angoixa o bé abandona.

**Proposta:** a la caixa «🎯 Objectius i avaluació» de cada fitxa base, una línia sota la taula:

> **Versió nucli (assoliment satisfactori):** _descripció concreta_ · **Versió completa:** _el que hi afegeix AN/AE_.

Exemple SA4: *nucli = la barrera s'obre en detectar i es tanca sola (angle i temps fixos); completa = llindars ajustats, temps configurables i gestió del cas «vehicle aturat sota la barrera»*.

**Cost:** 9 edicions petites (1 línia per fitxa) + coherència amb la rúbrica corresponent. Treu ansietat i fa transparent l'escala NA→AE en termes del producte, no de l'abstracció.

---

## Bloc B · Instruments del docent per al curs en marxa

### Q3 · Graella de seguiment formatiu de grup — prioritat MITJANA

**Buit:** el full per alumne (§4 del Full de qualificació) serveix per **qualificar**; no hi ha cap vista d'una pàgina per **veure el grup sencer** i decidir la sessió següent.

**Proposta:** nou document `Avaluació/Full_seguiment_grup.md`: una taula per trimestre, files = alumnes, columnes = senyals formatius (semàfor de cada mini-check, diana d'autoavaluació de cada SA, nivell de targeta de rescat més alt usat, observacions R5). Amb una llegenda de **lectura per columnes** («si un mini-check té ⅓ de grocs/vermells → repesca col·lectiva de 10′ a la sessió següent, com ja preveu `00_Mini_checks_individuals.md`») i **per files** («dos vermells seguits del mateix alumne → mesures addicionals de §5.2»).

**Cost:** 1 document nou (plantilla imprimible o full de càlcul). Connecta instruments que ja existeixen però ara no conflueixen enlloc.

### Q4 · Avaluació de la programació i de la pràctica docent — prioritat ALTA

**Buit:** la programació no té l'apartat d'autoavaluació docent (habitual i sovint exigit a les programacions didàctiques; aquí no existeix cap `10_*`). El curs 2026-27 és la **primera implantació**: sense instruments de revisió, els ajustos del curs següent seran per intuïció.

**Proposta:** nou document `Programació didàctica/10_Avaluacio_programacio_i_practica_docent.md` amb:

1. **Indicadors trimestrals** (recollits amb dades que ja es generen): % d'assoliment per CA, desviació temps real/previst per SA (alimenta el pla de contingència del doc 08), distribució de semàfors dels mini-checks, ús de targetes de rescat, taxa de lliurament del quadern.
2. **Qüestionari breu a l'alumnat** (5 ítems, final de trimestre, anònim): ritme, claredat de les fitxes, utilitat del quadern, treball en parella, què canviaries.
3. **Full de decisions:** per trimestre, 3 línies — què mantinc · què ajusto ara · què anoto per al curs vinent (mirall del «pla de millora personal» que ja es demana a l'alumnat: el docent modela la mateixa metacognició que exigeix).

**Cost:** 1 document nou + 1 línia a l'índex (00) i al doc 06.

---

## Bloc C · Coeducació i vocacions STEM

### Q5 · Referents de la tecnologia per SA — prioritat MITJANA

**Buit:** «referents femenins» és una línia de §4.6 sense cap material. En una matèria optativa tecnològica de Batxillerat, la infrarepresentació femenina és el patró de partida esperable; els referents han d'entrar pel contingut, no per un dia assenyalat.

**Proposta:** nou document `Classes/00_General/00_Referents_tecnologia.md`: **un referent per SA, lligat al tema tècnic** (no biografies genèriques), amb 3-4 línies i una **pregunta ganxo** per obrir la primera sessió de la SA (1 minut, dins l'activació que ja existeix — cap hora nova). Exemples de mapatge: SA1 → Margaret Hamilton (programari de l'Apollo, enginyeria de programari); SA3 → Marie Van Brittan Brown (patent del primer sistema de videovigilància domèstica: sensors + actuadors, 1966); SA5 → Sophie Wilson (conjunt d'instruccions ARM — el processador del micro:bit); SA6 → Irmgard Flügge-Lotz (teoria del control discontinu — l'histèresi de la SA); SA8 → Fei-Fei Li (ImageNet, visió per computador) i Hedy Lamarr (salt de freqüència → precedent del sense fils). Inclou un referent de proximitat (tecnòloga catalana) per trencar el «són genis llunyans».

**Cost:** 1 document nou + 1 línia al guió de la sessió 1 de cada guia docent.

### Q6 · Operativitzar §4.6 (gestió d'aula coeducativa) — prioritat MITJANA

**Buit:** la rotació de rols A/B ja reparteix la feina tècnica (fet a la ronda P1-P10), però no hi ha cap pauta sobre **formació de parelles**, **repartiment de la paraula** a les defenses ni **seguiment** que el repartiment funcioni.

**Proposta:** ampliar §4.6 de `04_Metodologia.md` amb 4 pautes concretes: (1) parelles formades pel docent els T1-T2 (heterogènies, evitant que cap perfil quedi sistemàticament de «secretari»); (2) a les defenses orals, **qui no ha programat la part explicada la defensa** (lliga amb la guia de defensa oral existent); (3) torn de preguntes gestionat pel docent amb quota de primera paraula; (4) indicador al doc 10 (Q4): participació equilibrada a les defenses. Cap document nou.

**Cost:** 1 edició (§4.6) + 1 línia a `00_Guia_defensa_oral.md` + 1 indicador a Q4.

---

## Bloc D · Anàlisi lliure (altres buits detectats)

### Q7 · Glossari tècnic català–anglès de l'alumne — prioritat BAIXA-MITJANA

**Buit:** la documentació real de la professió (datasheets, fòrums, documentació d'Arduino/MicroPython) és en anglès; el curs usa els termes però no en fa pont enlloc.

**Proposta:** nou document `Classes/00_General/00_Glossari_tecnic.md`: ~40-50 termes per blocs (electrònica, programació, control, comunicacions), format *terme català → anglès → definició d'una línia → on surt (SA)*. A cada fitxa no cal tocar res: el glossari s'enllaça des del LLEGEIX-ME i té PDF al web. Hàbit associat (1 línia al quadern del doc 04): «cada SA, apunta 3 termes nous del glossari al quadern».

### Q8 · Llavors de Treball de Recerca per SA — prioritat BAIXA-MITJANA

**Buit:** §5.4 menciona el TR com a via d'aprofundiment però cap material ho concreta. L'alumnat de 1r de Batxillerat tria el TR **aquest mateix curs**: és el moment exacte.

**Proposta:** secció nova (~1 pàgina) dins de `08c_Projectes_vida_real.md` o document breu a `Recursos/`: per a cada SA, 1-2 **preguntes investigables** que en surten (SA3: «quin sensor de distància és més fiable en quines condicions? — estudi comparatiu»; SA6: «histèresi òptima d'un termòstat domèstic: confort vs. consum»; SA8: «biaixos d'un classificador entrenat amb Teachable Machine»). Amb el format mínim d'un TR (pregunta → hipòtesi → experiment mesurable). Es presenta al T2, quan comencen a pensar el TR.

---

## Resum i ordre recomanat

| # | Proposta | Bloc | Prioritat | Cost |
|---|---|---|---|---|
| Q1 | Banc de targetes de rescat (3 nivells de pista) | Reforç | **Alta** | 1 doc nou + refs |
| Q2 | «Versió nucli» del producte a les 9 fitxes | Reforç | **Alta** | 9 línies |
| Q4 | Avaluació de la programació i pràctica docent (doc 10) | Docent | **Alta** | 1 doc nou |
| Q3 | Graella de seguiment formatiu de grup | Docent | Mitjana | 1 doc nou |
| Q5 | Referents de la tecnologia per SA | Coeducació | Mitjana | 1 doc nou + 9 línies |
| Q6 | Gestió d'aula coeducativa (§4.6 operatiu) | Coeducació | Mitjana | 3 edicions |
| Q7 | Glossari tècnic català–anglès | Lliure | Baixa-mitjana | 1 doc nou |
| Q8 | Llavors de Treball de Recerca per SA | Lliure | Baixa-mitjana | 1 secció |

**Principis mantinguts de les rondes anteriors:** cap hora de classe nova (tot viu dins de rutines existents), res de nou qualifica, coherència amb Decret 171/2022 i amb el sistema R1-R5 / 45-25-20-10.

**Fora d'abast d'aquesta ronda (pendent conegut):** imatges reals de circuits (Fritzing/Wokwi) — producció de material, no disseny pedagògic.

## Estat

- [x] Decisió del docent (03-07-2026): **aplicar-les totes**.
- [x] Aplicades les 8 (Q1–Q8) el mateix dia — vegeu `2026-07-03_Aplicacio_5a_ronda_Q1-Q8.md`.
