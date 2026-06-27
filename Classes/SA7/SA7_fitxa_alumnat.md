# SA7 · Fitxa d'alumnat — Robòtica mòbil

**Nom:** ______________________  **Equip:** ______________________  **Data:** __________

> Ara el robot es mou sol! Programaràs moviment, trajectòries i comportaments autònoms. Recorda **ajustar els pins** segons la teva placa.

---

## Activitat 1 · Moviment i cinemàtica (S1)
0. **PREDIU** (abans d'executar): mirant les funcions de `01_moviment_basic.ino`, què creus que farà el robot amb `gira_dreta()`? ____________________
1. Ajusta el bloc de pins de `01_moviment_basic.ino` i **comprova** la predicció. Quins pins has posat?

| Motor esq. dir/vel | Motor dret dir/vel |
|---|---|
| | |

2. Completa: per girar a la dreta, la roda esquerra ha d'anar __________ que la dreta.
3. **Repte:** seqüència de "ball". **+ Repte:** ajusta velocitats per anar recte.

## Activitat 2 · Trajectòries (S2)
1. Recorre un **quadrat** amb `02_trajectoria_quadrat.ino`.
2. Calibra el gir de 90°: temps de gir = ______ ms.
3. Quant s'allunya del punt inicial després d'una volta? ______ cm. Per què? ____________
4. **Repte:** triangle o forma "L". **+ Repte:** tornar al punt de sortida.

## Activitat 3 · Evita-obstacles (S3)
1. Carrega `03_evita_obstacles.ino`. A quina distància decideix girar? ______ cm.
2. Dibuixa la **decisió** (percepció → acció):

```

```
3. **Repte:** millora l'estratègia (retrocedir, gir aleatori). **+ Repte:** gir proporcional a la proximitat.

## Activitat 4 · Seguidor de línia + repte de pista (S4)
1. Calibra els sensors de línia. Valor "línia" = ______ / "fons" = ______
2. Temps de volta — intent 1: ____ s · intent 2: ____ s · intent 3: ____ s
3. Quines **millores** has fet entre intents? ___________________________
4. **+ Repte:** correcció proporcional (moviment més suau).

**Autoavaluació** (marca el teu nivell — NA/AS/AN/AE):
| Criteri | Nivell |
|---|---|
| El codi del robot és modular i comentat (R1) | ☐ NA ☐ AS ☐ AN ☐ AE |
| El robot completa el repte autònom (R3) | ☐ NA ☐ AS ☐ AN ☐ AE |
| He registrat proves i iteracions de millora (R4) | ☐ NA ☐ AS ☐ AN ☐ AE |

---

## Quadern tècnic (SA7)
- **Què és la cinemàtica diferencial?** _________________________________
- **Per què el control per temps no és precís?** ________________________
- **Millora que ha funcionat millor:** _________________________________
