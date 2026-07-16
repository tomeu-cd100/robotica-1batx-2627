# 06 · Avaluació: criteris, instruments i qualificació

L'avaluació és **competencial, contínua, formativa i global**, d'acord amb el Decret 171/2022. El referent són les **competències específiques + criteris d'avaluació + sabers**.

## 6.1. Criteris d'avaluació de la matèria

*Derivats dels criteris 5.1, 5.2, 3.x i 1.x de Tecnologia i Enginyeria I i concretats per a aquesta matèria.*

| Codi | Criteri d'avaluació | Competència |
|---|---|---|
| **CA1.1** | Escriure i depurar programes en C/C++ amb estructures de control, funcions i llibreries, comentant el codi. | CE-R1 |
| **CA1.2** | Escriure programes en MicroPython i comparar-los amb la solució equivalent en C/C++. | CE-R1 |
| **CA2.1** | Dissenyar, simular i muntar circuits amb sensors i actuadors aplicant criteris de seguretat. | CE-R2 |
| **CA2.2** | Mesurar i interpretar magnituds i senyals (digitals, analògics, PWM). | CE-R2 |
| **CA3.1** | Implementar sistemes de control (llaç obert/tancat, màquines d'estats) i explicar-ne el funcionament. | CE-R3 |
| **CA4.1** | Programar un robot mòbil perquè executi trajectòries i comportaments autònoms aplicant algorismes. | CE-R4 |
| **CA4.2** | Integrar tecnologies emergents (IoT/telemetria/IA) en un sistema de control. | CE-R4 |
| **CA5.1** | Gestionar un projecte tecnològic complet (anàlisi → prototip → millora). | CE-R5 |
| **CA5.2** | Elaborar documentació tècnica i comunicar/defensar la solució amb rigor. | CE-R5 |
| **CA5.3** | Valorar l'impacte ètic, social i ambiental de la solució (ODS) i treballar cooperativament. | CE-R5 / CPSAA |

## 6.2. Instruments d'avaluació

- **Productes/projectes** de cada situació d'aprenentatge (amb rúbrica — vegeu `07_Rubriques.md`).
- **Quadern tècnic (*logbook*)**: registre de pràctiques, codi, errors i millores.
- **Reptes de programació/electrònica** (proves pràctiques curtes).
- **Defenses orals** i demostracions del producte.
- **Observació sistemàtica** (rúbrica d'actitud i treball cooperatiu).
- **Autoavaluació i coavaluació** (dianes, rúbriques compartides).

## 6.3. Ponderació de la qualificació

| Dimensió | Pes | Instruments |
|---|---|---|
| **Projectes i productes** | **45 %** | Productes de les SA + defenses (rúbriques). |
| **Quadern tècnic i pràctiques** | **25 %** | *Logbook*, pràctiques guiades i reptes. |
| **Proves pràctiques** (programació/electrònica) | **20 %** | Reptes individuals curts. |
| **Actitud, cooperació i autoregulació** | **10 %** | Observació, coavaluació, autoavaluació. |

> Recomanació: ponderació **per competències** dins de cada dimensió. La qualificació trimestral i final s'expressa amb un enter **del 0 al 10 (sense decimals)**, com estableix el Decret 171/2022.

## 6.4. Caràcter continu i recuperació

- L'avaluació és **contínua**: cada trimestre integra i consolida el següent.
- Cada producte admet **iteracions de millora** dins el termini (cultura de prototip): la primera «recuperació» és no arribar a necessitar-ne.

### Recuperació trimestral (instruments concrets)

Qui no assoleix el trimestre (qualificació < 5) rep, la **primera setmana del trimestre següent**, un **pla de recuperació individual** d'una pàgina: quins CA té pendents (segons el `Full_seguiment_grup.md`), quina evidència nova se li demana i la **data límit (3 setmanes)**. L'instrument depèn de la dimensió no assolida:

| Dimensió suspesa | Instrument de recuperació | Criteri de «recuperat» |
|---|---|---|
| **Proves pràctiques** (20 %) | **Repetició individual de la prova** en versió equivalent (mateixa estructura nucli/ampliacions, enunciat variat), en una sessió acordada. | Nucli de la prova complet i funcional (≥ 5 a la graella). |
| **Projectes i productes** (45 %) | **Millora del producte** amb 2-3 requisits explícits per escrit + **defensa curta (5')** individual. | Requisits complerts i defensa que demostra comprensió (mateixa rúbrica de la SA). |
| **Quadern tècnic** (25 %) | Posar el quadern **al dia** (entrades que falten, amb les evidències disponibles) + validació del docent. | Totes les sessions del trimestre documentades amb el mínim de la R4. |
| **Actitud** (10 %) | No es «recupera» amb una tasca: compromisos concrets al pla + seguiment d'observació el trimestre següent. | Observació sistemàtica favorable durant 3 setmanes. |

La qualificació de la dimensió recuperada **substitueix** l'anterior (no se'n fa mitjana): recuperar vol dir assolir, no compensar.

### Recuperació de final de curs

- **Qui arriba al juny amb un trimestre pendent:** la **SA9 és la primera via** — el projecte final integra CA de tot el curs, i el pla individual hi fixa quines evidències pendents pot certificar (p. ex. CA3.1 al sistema de control del robot).
- **Qui en té més d'un o no els certifica via SA9:** **prova pràctica global de síntesi** (individual, mateixa estructura nucli/ampliacions que T1-T3, muntatge + programa + documentació breu, amb quadern consultable) sobre els CA pendents + lliurament del **quadern al dia**.
- **Convocatòria extraordinària** (si el calendari del centre en preveu per a 1r de Batxillerat): mateixa prova pràctica global + quadern; es publica amb antelació **què entra** (llista de CA pendents personalitzada).

## 6.5. Avaluació formativa i retorn

- **Retorn freqüent** sobre el codi i el circuit (durant la pràctica autònoma).
- **Rúbriques compartides** des de l'inici de cada SA.
- **Sessions de revisió de codi** entre iguals (*code review*) per consolidar bones pràctiques.
- **Mini-check individual per SA** (10', no qualifica): micro-repte de codi **en solitari i sense apunts** que detecta l'*efecte passatger* del treball en parella abans que el penalitzi la prova trimestral. Banc complet: `../Classes/00_General/00_Mini_checks_individuals.md`.
- **Graella d'activació amb repàs espaiat** a cada sessió (no qualifica): les errades massives hi fan de termòmetre del grup. Banc: `../Classes/00_General/00_Banc_activacio_repas.md`.

## 6.6. Transparència

Els criteris d'avaluació i les rúbriques es fan **públics a l'inici del curs i de cada SA**, segons exigeix la normativa. Aquesta transparència està **materialitzada en dos instruments per a l'alumnat**:

- **`Classes/00_General/00_Avaluacio_per_alumnat.md`** — guia del sistema d'avaluació en llenguatge d'alumne (ponderació, escala de nota 0-10, rúbriques resumides, què no qualifica, proves, recuperació, ús d'IA). Es reparteix la **primera setmana**.
- **Caixa «🎯 Objectius i avaluació» a cada fitxa base** — objectius d'aprenentatge de la SA en primera persona ("en acabar podré…") + taula *què lliuro → rúbrica → on compta*. Es llegeix **a l'inici de cada SA** (2 minuts): l'alumnat comença sabent què ha d'assolir i com se'l valorarà.

## 6.7. Avaluació de la programació i de la pràctica docent

L'avaluació també s'aplica **a la programació mateixa i a qui la imparteix**: indicadors trimestrals (assoliment per CA, desviació temporal, senyals formatius), qüestionari breu a l'alumnat i full de decisions documentat. Vegeu **`06b_Avaluacio_programacio_i_practica_docent.md`**.
