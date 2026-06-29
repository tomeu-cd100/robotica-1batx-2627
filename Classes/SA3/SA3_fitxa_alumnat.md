# SA3 · Fitxa base — Entrades i sensors

**Nom:** ______________________  **Parella:** ______________________  **Data:** __________

> Ara el sistema **percep** l'entorn. Treballaràs entrades digitals i analògiques, el monitor sèrie i les funcions.

---

## El que has de fer

### 1 · Polsador i monitor sèrie (S1)
0. **PREDIU:** mirant `01_polsador_debounce.ino`, què mostrarà el monitor quan premis? ______________________
1. Munta el polsador al pin 2 (`INPUT_PULLUP`). Carrega, obre el **Monitor sèrie** i comprova.
2. En repòs el pin llegeix ______ i en prémer ______ (HIGH/LOW).
3. Per què cal l'**antirebot** (*debounce*)? ______________________
4. **Repte:** mode *toggle* (cada premuda encén/apaga un LED).

### 2 · Entrades analògiques (S2)
1. Llegeix el potenciòmetre (A0) i la LDR (A1). Rang de valors: ____ a ____
2. Quina funció converteix 0-1023 → 0-255? `__________`
3. **Llum automàtic:** el LED s'encén quan la lectura de la LDR és ____ que ______.

### 3 · Ultrasons i funcions (S3)
1. Munta l'HC-SR04 (TRIG=12, ECHO=11). Carrega `03_ultrasons_funcio.ino`, obre el **Serial Plotter**.
2. distància (cm) = temps · ______ / 2.
3. Què **retorna** la funció `mesuraDistancia()`? ______________________
4. **Repte:** funció que retorna la **mitjana de 3 mesures** (per què millora?).

### 4 · Producte: alarma / aparcament (S4)
Dissenya un avís que depèn de la distància:

| Distància | LED | So (piezo) |
|---|---|---|
| > 30 cm (lluny) | | |
| 10–30 cm | | |
| < 10 cm (molt a prop) | | |

**Defensa (1'):** explica el teu sistema i una aplicació real. S'avalua amb **R1** i **R2**.

## Si t'encalles (DEPURA)
> **D**escriu · **E**xamina (**Monitor sèrie!**) · **P**rova una hipòtesi cada cop · **U**bica · **R**epara · **A**punta-ho. Revisa l'alimentació del sensor (VCC/GND).

## M'autoavaluo (NA/AS/AN/AE)
| Criteri | NA | AS | AN | AE |
|---|---|---|---|---|
| Distingeixo i llegeixo entrades digitals i analògiques | ☐ | ☐ | ☐ | ☐ |
| Faig servir el Monitor sèrie per calibrar | ☐ | ☐ | ☐ | ☐ |
| Escric i faig servir funcions pròpies | ☐ | ☐ | ☐ | ☐ |

## Quadern tècnic
- **Diferència entre entrada digital i analògica:** ______________________
- **Per a què serveix una funció?** ___________________________________
- **Un error i com l'he resolt:** _____________________________________

> 📌 **Vols més?** +Reptes (llindar ajustable, instrument), rols, coavaluació, exit ticket, pensament computacional i ODS → **[SA3_fitxa_ampliada.md](SA3_fitxa_ampliada.md)**
