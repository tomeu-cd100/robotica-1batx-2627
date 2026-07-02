# 2026-07-02 · Avaluació transparent per a l'alumnat (objectius + com s'avalua cada SA)

## Objectiu

A petició del docent: que a l'alumnat **li quedi clar quins són els objectius d'aprenentatge i com s'avaluarà cada SA**. Fins ara la transparència vivia en documents del docent (mapes d'avaluació a les guies, rúbriques a la programació); l'alumnat no tenia cap document en el seu llenguatge.

## Què s'ha creat

### 1. Guia del sistema per a l'alumnat (nova)

**`Classes/00_General/00_Avaluacio_per_alumnat.md`** — "Com s'avalua aquesta matèria", en segona persona:

1. **D'on surt la nota** (45 % projectes · 25 % quadern · 20 % proves · 10 % actitud) amb una columna "com anar-hi bé".
2. **Escala NA·AS·AN·AE** i les **5 rúbriques en una línia** cadascuna, amb el dret explícit a veure-les abans de començar.
3. **Què NO qualifica** (diagnòstica, graelles, mini-checks, dianes/exit tickets) i per què cal respondre-hi amb honestedat.
4. **Els errors sumen**: error documentat amb DEPURA puja R1/R4; demo que falla ≠ zero si es diagnostica en veu alta.
5. **Les proves**: T1/T2 individuals, per nivells (nucli = 5-6), amb el quadern com a material permès i pla de millora posterior.
6. **Recuperació** = millorar el producte (cultura de prototip), no examen memorístic.
7. **Ús d'IA**: declarar-lo no baixa nota; no saber explicar el codi, sí.
8. **Drets i deures** de transparència.

Es reparteix la **primera setmana**. Té botó "Baixa PDF" al web (afegit a `is_activitat` del generador).

### 2. Caixa «🎯 Objectius i avaluació» a les 9 fitxes base (SA1–SA9)

Just després de la introducció de cada fitxa:

- **Objectius en primera persona** ("En acabar aquesta SA podré: …"), 3-4 per SA, en llenguatge d'alumne (p. ex. SA6: *"fer un termòstat amb histèresi (dos llindars, sense clic-clic)"*).
- **Taula "Què lliuro → Rúbrica → On compta"** amb el producte, el quadern, la prova trimestral si la SA l'acull (SA3/SA6/SA9) i el mini-check marcat explícitament com a **"no qualifica"**.
- Enllaç a la guia general del punt 1.

Coherent amb el mapa d'avaluació docent de cada guia (mateixos instruments i rúbriques, llenguatge diferent).

## Fitxers editats

- 9 fitxes base `Classes/SAx/SAx_fitxa_alumnat.md` (caixa nova).
- `Classes/00_General/00_LLEGEIX-ME_Classes.md` (índex).
- `Avaluació/00_LLEGEIX-ME_Avaluacio.md` (apartat de transparència).
- `Programació didàctica/06_Avaluacio_criteris_qualificacio.md` §6.6 (la transparència queda materialitzada en aquests dos instruments).
- `web/_generador/generar.py` (el document nou genera PDF).

## Web regenerat

121 pàgines de document · 17 de codi · 33 de simulació · **37 PDF** (les 9 fitxes actualitzades + la guia nova).

## Ús a l'aula (2 minuts per SA)

A la primera sessió de cada SA, llegir en veu alta la caixa d'objectius i la taula d'avaluació de la fitxa; a final de SA, tornar-hi: la **diana d'autoavaluació** de la fitxa valora exactament aquests objectius. Primera setmana de curs: repartir la guia general.

## Visibilitat al web (afegit el mateix dia)

L'avaluació surt ara a **tres punts d'entrada** del web (canvis a `generar.py`, regenerat):

1. **Botó a la capçalera de la portada:** «🎓 Com s'avalua» → guia de l'alumnat.
2. **Quarta ruta guiada a la portada:** «🎓 Soc alumne/a: com se m'avaluarà?» (guia → caixa d'objectius de cada fitxa → rúbriques completes). El web deixa de ser només per al docent.
3. **Pauta de la secció Avaluació:** pas 4 amb l'enllaç a la guia de l'alumnat i el recordatori de repartir-la la primera setmana.

## Pendent

- Commit i push (docent o a petició; sense `git add -A`).
