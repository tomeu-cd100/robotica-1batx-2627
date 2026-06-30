# SA7 · Fitxa ampliada (aprofundiment) — Robòtica mòbil

> 📄 **Versió ampliada**: conté totes les activitats, rutines (coavaluació, exit ticket, ODS…) i ampliacions. La fitxa que fa **tot l'alumnat** és la base: **[SA7_fitxa_alumnat.md](SA7_fitxa_alumnat.md)**.

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

## Treball en equip · rols

Repartiu-vos els rols i **roteu-los** a cada sessió:

| Rol | S1 | S2 | S3 | S4 |
|---|---|---|---|---|
| Coordinador/a (temps, estratègia, enunciat) | | | | |
| Programador/a (codi i lògica) | | | | |
| Enginyer/a de maquinari (ajusta pins, robot, sensors) | | | | |
| Pilot/a–Documentador/a (prova a la pista, cronometra, quadern) | | | | |

---

## Si t'encalles

1. **Pista 1:** comprova el bloc `// === PINS (AJUSTAR) ===` amb el manual de la placa.
2. **Pista 2:** prova **una funció de moviment cada cop** (`endavant`, `gira_dreta`…) abans de la trajectòria sencera.
3. **Pista 3:** aplica la **rutina DEPURA** i demana ajuda **explicant què ja has provat**.

> **DEPURA:** **D**escriu · **E**xamina (què fa el robot de debò) · **P**rova una hipòtesi cada cop · **U**bica · **R**epara · **A**punta-ho.

## Vols més?

- **Reptes ⭐:** [`Reptes/Reptes_SA7.md`](../../Reptes/Reptes_SA7.md) (repartidor, explorador, seguidor de línia).
- **Repte de pista cronometrat:** millora el temps de volta iterant (registra cada intent).

---

## Pensament computacional d'aquesta SA

Treballes **ALGORISMES** (seqüència de decisions del seguidor/evita-obstacles) i **DESCOMPOSICIÓ** (el moviment en funcions reutilitzables). Quin algorisme segueix el teu robot per no xocar? ______________________

## Diana d'autoavaluació

Marca el teu nivell (NA/AS/AN/AE):

| Criteri | NA | AS | AN | AE |
|---|---|---|---|---|
| Programo moviment amb funcions (control diferencial) | ☐ | ☐ | ☐ | ☐ |
| El robot completa un comportament autònom | ☐ | ☐ | ☐ | ☐ |
| Registro proves i itero per millorar | ☐ | ☐ | ☐ | ☐ |

## Coavaluació (2 estrelles i un desig)

Mireu la demostració d'un altre equip i anoteu:
- ⭐ Una cosa ben feta: ______________________
- ⭐ Una altra cosa ben feta: ______________________
- 💡 Una millora (desig): ______________________

## Exit ticket (abans de marxar)

1. Una cosa que he après avui: ______________________
2. Una cosa que encara no tinc clara: ______________________
3. On ho faria servir al món real: ______________________

## Context real i ODS

Els robots mòbils mouen mercaderies i persones. **ODS 9** (indústria i innovació) i **ODS 11** (mobilitat sostenible): AGV de magatzem, vehicles autònoms. Quin transport autònom milloraria la teva ciutat? ______________________

---

## Quadern tècnic (SA7)
- **Què és la cinemàtica diferencial?** _________________________________
- **Per què el control per temps no és precís?** ________________________
- **Millora que ha funcionat millor:** _________________________________
