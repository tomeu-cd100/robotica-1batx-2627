# SA6 · Fitxa d'alumnat — Sistemes de control

**Nom:** ______________________  **Parella:** ______________________  **Data:** __________

> Faràs que el sistema **es reguli sol**. Treballaràs llaç obert/tancat, histèresi, màquines d'estats i control proporcional.

---

## Activitat 1 · Llaç obert vs llaç tancat (S1)
0. **PREDIU** (abans d'executar): mirant `01_llac_obert_vs_tancat.ino`, en quin dels dos modes creus que el sistema corregirà sol les pertorbacions? ____________________
1. Carrega `01_llac_obert_vs_tancat.ino`, prova els dos modes i **comprova** la predicció.
2. Completa el **diagrama de blocs** del llaç tancat:

```
[ Consigna ] → ( error ) → [ CONTROLADOR ] → [ ACTUADOR ] → [ PROCÉS ] → sortida
                  ↑________________ [ SENSOR ] ___________________|
```
3. Diferència principal entre llaç obert i tancat: ________________________
4. **Repte:** 3 exemples reals de cada tipus.

| Llaç obert | Llaç tancat |
|---|---|
| | |
| | |
| | |

## Activitat 2 · Termòstat amb histèresi (S2)
1. Carrega `02_termostat_histeresi.ino`. Quins són els dos llindars?  Encén a ____  · Apaga a ____
2. Què passaria **sense** histèresi (un sol llindar)? ____________________
3. **Repte:** modifica la finestra d'histèresi i descriu l'efecte: ______________

## Activitat 3 · Màquina d'estats (S3)
1. Carrega `03_maquina_estats.ino`. Enumera els estats: ____________________
2. Dibuixa el **diagrama d'estats** (estats i transicions):

```

```
3. **Repte:** afegeix un estat nou o una transició condicional. Quin? ____________

## Activitat 4 · Control proporcional (S4)
1. Carrega `04_control_proporcional.ino`. Què és l'**error**? ____________________
2. Com afecta la constant `Kp` a la resposta? ___________________________
3. **Repte:** compara tot/res vs proporcional al Serial Plotter. Quin és més estable? ______
4. **+ Repte:** què passa si `Kp` és massa gran? _________________________

**Autoavaluació** (marca el teu nivell — NA/AS/AN/AE):
| Criteri | Nivell |
|---|---|
| El codi de control funciona i està comentat (R1) | ☐ NA ☐ AS ☐ AN ☐ AE |
| El sistema de control és correcte i l'explico bé (R3) | ☐ NA ☐ AS ☐ AN ☐ AE |
| El diagrama de blocs i l'anàlisi són clars (R4) | ☐ NA ☐ AS ☐ AN ☐ AE |

---

## Treball en equip · rols de la parella

Repartiu-vos els rols i **roteu-los** a cada sessió:

| Rol | S1 | S2 | S3 | S4 |
|---|---|---|---|---|
| Coordinador/a (temps, enunciat) | | | | |
| Programador/a (codi) | | | | |
| Enginyer/a de maquinari (sensor/actuador, seguretat) | | | | |
| Provador/a–Documentador/a (Serial Plotter + quadern) | | | | |

---

## Si t'encalles

1. **Pista 1:** dibuixa el **diagrama de blocs** (consigna → error → controlador → actuador → procés → sensor) i situa on falla.
2. **Pista 2:** mira el **Serial Plotter**: la sortida segueix la consigna o oscil·la?
3. **Pista 3:** aplica la **rutina DEPURA** i demana ajuda **explicant què ja has provat**.

> **DEPURA:** **D**escriu · **E**xamina (Serial Plotter) · **P**rova una hipòtesi cada cop · **U**bica · **R**epara · **A**punta-ho.

## Vols més?

- **Reptes ⭐:** `Reptes/Reptes_SA6.md` (termòstat, semàfor adaptatiu, proporcional).
- **Simulació interactiva (Wokwi):** termòstat a `SA6_esquemes_connexions.md`.

---

## Pensament computacional d'aquesta SA

Treballes la **MÀQUINA D'ESTATS** (organitzar comportaments en estats i transicions) i el **BUCLE DE CONTROL** (mesurar → comparar → corregir). Quins estats té el teu sistema? ______________________

## Diana d'autoavaluació

Marca el teu nivell (NA/AS/AN/AE):

| Criteri | NA | AS | AN | AE |
|---|---|---|---|---|
| Distingeixo llaç obert i llaç tancat | ☐ | ☐ | ☐ | ☐ |
| Implemento histèresi i una màquina d'estats | ☐ | ☐ | ☐ | ☐ |
| Explico el diagrama de blocs del meu control | ☐ | ☐ | ☐ | ☐ |

## Coavaluació (2 estrelles i un desig)

Intercanvieu el sistema de control amb una altra parella:
- ⭐ Una cosa ben feta: ______________________
- ⭐ Una altra cosa ben feta: ______________________
- 💡 Una millora (desig): ______________________

## Exit ticket (abans de marxar)

1. Una cosa que he après avui: ______________________
2. Una cosa que encara no tinc clara: ______________________
3. On ho faria servir al món real: ______________________

## Context real i ODS

El control automàtic regula climatització, indústria i energia. **ODS 7** (energia: un bon control estalvia) i **ODS 11** (ciutats i edificis sostenibles). On milloraria l'eficiència un control en llaç tancat? ______________________

---

## Quadern tècnic (SA6)
- **Què és la realimentació en un sistema de control?** __________________
- **Per què serveix la histèresi?** _____________________________________
- **Avantatge d'una màquina d'estats:** _________________________________
- **Error trobat i solució:** ___________________________________________
