# Full de qualificació per competències

Plantilla operativa per **qualificar per competències** d'acord amb `Programació didàctica/06_Avaluacio_criteris_qualificacio.md`. Tradueix els criteris d'avaluació (CA), les rúbriques (R) i les dimensions de ponderació en un **procediment de càlcul** reproduïble i un **full de seguiment per alumne/a i trimestre**.

> Pots usar aquest document tal com és (en paper o digital) o portar-lo a un **full de càlcul**: cada taula és una pestanya. La conversió de nivell a nota i les ponderacions ja estan fixades.

---

## 1. Escala de nivells → nota

Conversió única per a totes les rúbriques (vegeu `Programació didàctica/07_Rubriques.md`):

| Nivell | Sigla | Nota orientativa |
|---|---|---|
| No assolit | **NA** | 0–4 |
| Assoliment satisfactori | **AS** | 5–6 |
| Assoliment notable | **AN** | 7–8 |
| Assoliment excel·lent | **AE** | 9–10 |

> La qualificació trimestral i final s'expressa amb un **enter de l'1 al 10 (sense decimals)**, com estableix el Decret 171/2022. Els decimals s'usen només en el càlcul intern; s'arrodoneix al final.

---

## 2. Mapa criteri d'avaluació ↔ rúbrica ↔ on s'avalua

| CA | Descripció breu | Rúbrica(es) | SA on s'evidencia |
|---|---|---|---|
| **CA1.1** | Programar i depurar en C/C++ | R1 | SA2, SA3, SA4, SA6, SA7 |
| **CA1.2** | Programar en MicroPython i comparar-ho amb C/C++ | R1, R4 | SA5, SA8 |
| **CA2.1** | Dissenyar/muntar circuits amb seguretat | R2 | SA2, SA3, SA4 |
| **CA2.2** | Mesurar/interpretar senyals (digital/analògic/PWM) | R2 | SA2, SA3 |
| **CA3.1** | Implementar i explicar sistemes de control | R3, R1 | SA4 (parcial), SA6, SA7, SA8 |
| **CA4.1** | Programar un robot mòbil (trajectòries/autonomia) | R3 | SA7 |
| **CA4.2** | Integrar tecnologies emergents (IoT/IA) | R3 | SA8 |
| **CA5.1** | Gestionar un projecte complet (anàlisi→prototip→millora) | R4, R5 | SA1, SA9 (transversal: quadern) |
| **CA5.2** | Documentar i defensar la solució amb rigor | R4 | SA9 (transversal: defenses) |
| **CA5.3** | Valorar l'impacte ètic/social/ambiental i cooperar | R5, R4 | SA1, SA8, SA9 (transversal) |

---

## 3. Dimensions de ponderació (Decret 171/2022 · doc. 06)

| Dimensió | Pes | Instruments | Rúbriques |
|---|---|---|---|
| **Projectes i productes** | **45 %** | Productes de cada SA + defenses orals | R1, R2, R3 |
| **Pràctiques i quadern tècnic** | **25 %** | *Logbook*, pràctiques guiades i reptes | R4 (quadern), R1 |
| **Proves pràctiques** | **20 %** | Reptes individuals curts (proves T1/T2/T3) | R1, R3 |
| **Actitud, cooperació i autoregulació** | **10 %** | Observació, coavaluació, autoavaluació | R5 |

> **Recomanació de l'enfocament:** dins de cada dimensió, **agrega per competència** (mitjana dels CA implicats), no per activitat solta. Així la nota reflecteix el grau d'assoliment competencial, no el nombre de tasques lliurades.

---

## 4. Full de seguiment per alumne/a (un per trimestre)

**Alumne/a:** ____________________  **Trimestre:** ____  **Grup:** ______

### 4.1. Evidències i nivell assolit

Anota el nivell (NA/AS/AN/AE) i la nota numèrica de cada evidència. Les files canvien segons el trimestre (vegeu §5).

| SA / Instrument | CA | Rúbrica | Nivell | Nota (0–10) |
|---|---|---|---|---|
| | | | | |
| | | | | |
| | | | | |
| | | | | |

### 4.2. Càlcul per dimensió

| Dimensió | Pes | Nota dimensió (mitjana de les evidències) | Aportació (nota × pes) |
|---|---|---|---|
| Projectes i productes | 0,45 | | |
| Pràctiques i quadern tècnic | 0,25 | | |
| Proves pràctiques | 0,20 | | |
| Actitud, cooperació i autoregulació | 0,10 | | |
| **TOTAL** | **1,00** | — | **= nota trimestral (arrodonir a enter)** |

> **Exemple de càlcul:** Productes 7,5 × 0,45 = 3,375 · Pràctiques/quadern 8 × 0,25 = 2,0 · Proves 6 × 0,20 = 1,2 · Actitud 9 × 0,10 = 0,9 → **total 7,475 → nota 7**.

---

## 5. Quines competències s'avaluen cada trimestre (guia de farciment)

> Mapatge orientatiu segons `Programació didàctica/08_Sequenciacio_temporal_anual.md`. La prova pràctica de cada trimestre va **integrada** a la darrera SA (no afegeix hores).

| Trimestre | SA | CA principals | Prova pràctica |
|---|---|---|---|
| **1r** | SA1–SA3 | CA5.1, CA1.1, CA2.1, CA2.2 | **T1** dins de SA3 (sessió 4) |
| **2n** | SA4–SA6 | CA1.1, CA1.2, CA3.1, CA2.1 | **T2** dins de SA6 (sessió 4) |
| **3r** | SA7–SA9 | CA4.1, CA4.2, CA3.1, CA5.1, CA5.2, CA5.3 | **T3** dins de SA9 (defensa) |

---

## 6. Notes d'ús

- **Avaluació contínua:** un CA treballat en diverses SA es pot **reavaluar**; preval l'evidència més recent i consolidada (la millora compta).
- **Recuperació:** quan un CA queda en NA, l'activitat de recuperació és **millorar el producte/codi** (no un examen memorístic). Actualitza el nivell del CA, no afegeixis una nota a part.
- **R5 (actitud/cooperació):** es valora **al llarg del trimestre** (acumulant observació de diverses sessions), no sessió a sessió — coherent amb la rotació de rols (vegeu nota a `07_Rubriques.md`).
- **Transparència:** comparteix aquest full i les rúbriques amb l'alumnat **a l'inici** del curs i de cada SA.

---

*Plantilla sota llicència CC BY-SA 4.0. Coherent amb `06_Avaluacio_criteris_qualificacio.md` i `07_Rubriques.md`.*
