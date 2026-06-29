# SA7 · Fitxa base — Robòtica mòbil

**Nom:** ______________________  **Equip:** ______________________  **Data:** __________

> Ara el robot es mou sol! Programaràs moviment, trajectòries i comportaments autònoms. Recorda **ajustar els pins** segons la teva placa.

---

## El que has de fer

### 1 · Moviment i cinemàtica (S1)
0. **PREDIU:** mirant les funcions de `01_moviment_basic.ino`, què farà `gira_dreta()`? ______________________
1. Ajusta el bloc de pins i comprova. Pins:

| Motor esq. dir/vel | Motor dret dir/vel |
|---|---|
| | |

2. Per girar a la dreta, la roda esquerra ha d'anar __________ que la dreta.
3. **Repte:** seqüència de "ball".

### 2 · Trajectòries (S2)
1. Recorre un **quadrat** amb `02_trajectoria_quadrat.ino`. Gir de 90° = ______ ms.
2. Quant s'allunya del punt inicial després d'una volta? ______ cm. Per què? ____
3. **Repte:** triangle o forma "L".

### 3 · Evita-obstacles (S3)
1. Carrega `03_evita_obstacles.ino`. A quina distància gira? ______ cm.
2. Dibuixa la **decisió** (percepció → acció).
3. **Repte:** millora l'estratègia (retrocedir, gir aleatori).

### 4 · Seguidor de línia + repte de pista (S4)
1. Calibra els sensors: valor "línia" = ______ / "fons" = ______
2. Temps de volta — intent 1: ____ s · 2: ____ s · 3: ____ s
3. Quines **millores** has fet entre intents? ______________________

**Producte:** comportament autònom + registre d'iteracions. S'avalua amb **R1**, **R3** i **R4**.

## Si t'encalles (DEPURA)
> **D**escriu · **E**xamina (què fa el robot de debò) · **P**rova una hipòtesi cada cop · **U**bica · **R**epara · **A**punta-ho. Comprova el bloc `// === PINS (AJUSTAR) ===` i prova **una funció de moviment cada cop**.

## M'autoavaluo (NA/AS/AN/AE)
| Criteri | NA | AS | AN | AE |
|---|---|---|---|---|
| Programo moviment amb funcions (control diferencial) | ☐ | ☐ | ☐ | ☐ |
| El robot completa un comportament autònom | ☐ | ☐ | ☐ | ☐ |
| Registro proves i itero per millorar | ☐ | ☐ | ☐ | ☐ |

## Quadern tècnic
- **Què és la cinemàtica diferencial?** _______________________________
- **Per què el control per temps no és precís?** ______________________
- **Una millora que ha funcionat:** ___________________________________

> 📌 **Vols més?** +Reptes (repartidor, explorador, gir proporcional), rols, coavaluació, exit ticket, pensament computacional i ODS → **[SA7_fitxa_ampliada.md](SA7_fitxa_ampliada.md)**
