# SA6 · Fitxa d'alumnat — Sistemes de control

**Nom:** ______________________  **Parella:** ______________________  **Data:** __________

> Faràs que el sistema **es reguli sol**. Treballaràs llaç obert/tancat, histèresi, màquines d'estats i control proporcional.

---

## Activitat 1 · Llaç obert vs llaç tancat (S1)
1. Carrega `01_llac_obert_vs_tancat.ino` i prova els dos modes.
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

---

## Quadern tècnic (SA6)
- **Què és la realimentació en un sistema de control?** __________________
- **Per què serveix la histèresi?** _____________________________________
- **Avantatge d'una màquina d'estats:** _________________________________
- **Error trobat i solució:** ___________________________________________
