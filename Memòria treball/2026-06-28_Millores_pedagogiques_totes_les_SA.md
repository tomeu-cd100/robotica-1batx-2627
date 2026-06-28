# Memòria de treball — 2026-06-28 · Millores pedagògiques a totes les SA

## Objectiu
Reforçar **4 dimensions pedagògiques** de manera integrada a **totes les SA (SA0–SA9)**,
homogeneïtzant el nivell (la SA1 ja era modèlica; altres en tenien menys) i afegint elements
que cap SA tenia del tot. Disseny aprovat: `2026-06-28_Disseny_millores_pedagogiques_SA.md`.

## Dimensions integrades
1. **Atenció a la diversitat (DUA):** taula de bastida · ampliació (reptes ⭐ + Wokwi) ·
   representació múltiple · implicació.
2. **Avaluació formativa:** diana d'autoavaluació, coavaluació ("2 estrelles i un desig") i
   exit ticket, a més de les rúbriques ja existents.
3. **Pensament computacional + depuració:** concepte de PC explícit per SA + **rutina DEPURA**
   ensenyada a l'alumnat.
4. **Treball cooperatiu + context real/ODS:** 4 rols rotatius (Coordinador/a, Programador/a,
   Enginyer/a de maquinari, Provador/a–Documentador/a) + connexió ODS i context real.

## Què s'ha fet (20 fitxers editats)
- **Guies docent (10):** afegides les seccions DUA, cooperatiu amb rols, PC+depuració,
  avaluació formativa i context/ODS (completant, no duplicant, el que ja hi havia —p. ex. SA1).
- **Fitxes d'alumnat (10):** afegides les caixes "rols de la parella/equip", "si t'encalles"
  + DEPURA, "vols més?", "pensament computacional", "diana d'autoavaluació", "coavaluació" i
  "exit ticket", més "context real/ODS".

### Adaptacions per naturalesa de la SA
- **SA0** (material de consulta, sense producte): només PC, depuració i ODS; sense rols ni
  coavaluació de producte.
- **SA5/SA8** (micro:bit): rol d'enginyer/a adaptat (preparar placa, ràdio, sensors).
- **SA7** (robot 3dBot, equip): rols d'equip; sense Wokwi (placa no simulable) → repte de
  pista cronometrat com a iteració.
- **SA9** (projecte): ja tenia rols, planificació i coavaluació; afegits DEPURA, PC integrat,
  diana i exit ticket final + síntesi de les 4 dimensions.

## Mapatge PC · ODS per SA (resum)
SA0 abstracció/lectura · ODS 4 — SA1 descomposició · 9,12 — SA2 patrons/algorisme · 11,7 —
SA3 abstracció/condicionals · 7,12 — SA4 descomposició moviment · 9,10 — SA5 esdeveniments · 3,4 —
SA6 màquina d'estats/control · 7,11 — SA7 algorismes · 9,11 — SA8 dades/classificació · 11,13 —
SA9 integració · ODS segons repte.

## Sincronització
Aplicat i pujat en **4 tandes** (SA0–SA2, SA3–SA5, SA6–SA9) amb un commit per tanda, més el
commit del spec. Tot a `origin/main`.

## No s'ha tocat
Codis `.ino/.py`, esquemes, solucionaris ni simulacions Wokwi (ja fets).
