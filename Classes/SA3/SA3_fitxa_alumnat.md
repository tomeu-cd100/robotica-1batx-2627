# SA3 · Fitxa d'alumnat — Entrades i sensors

**Nom:** ______________________  **Parella:** ______________________  **Data:** __________

> Ara el sistema **percep** l'entorn. Treballaràs entrades digitals i analògiques, el monitor sèrie i les funcions.

---

## Activitat 1 · Polsador i monitor sèrie (S1)
0. **PREDIU** (abans d'executar): mirant `01_polsador_debounce.ino`, què creus que mostrarà el monitor quan premis el polsador? ____________________
1. Munta el polsador al pin 2 (`INPUT_PULLUP`). Carrega `01_polsador_debounce.ino`, obre el **Monitor sèrie** i **comprova** la predicció.
2. En repòs el pin llegeix ______ i en prémer llegeix ______ (HIGH/LOW).
3. Per què cal l'**antirebot** (*debounce*)? ______________________________
4. **Repte:** mode *toggle* (cada premuda encén/apaga un LED). **+ Repte:** comptar fins a 5 i reiniciar.

## Activitat 2 · Entrades analògiques (S2)
1. Llegeix el potenciòmetre (A0) i la LDR (A1) al monitor. Rang de valors: de ____ a ____
2. Regula la intensitat d'un LED amb el potenciòmetre. Quina funció converteix 0-1023 a 0-255? `__________`
3. **Llum automàtic:** completa el llindar — el LED s'encén quan la lectura de la LDR és ____ que ______.
4. **+ Repte:** fes el llindar ajustable amb el potenciòmetre.

| Situació | Lectura LDR |
|---|---|
| Molta llum | |
| Penombra | |
| Tapada (fosc) | |

## Activitat 3 · Ultrasons i funcions (S3)
1. Munta l'HC-SR04 (TRIG=12, ECHO=11). Carrega `03_ultrasons_funcio.ino` i obre el **Serial Plotter**.
2. Completa: distància (cm) = temps · ______ / 2.
3. Què **retorna** la funció `mesuraDistancia()`? __________________________
4. **Repte:** funció que retorna la **mitjana de 3 mesures**. Per què millora la lectura? ____________

## Activitat 4 · Producte: alarma / aparcament (S4)
Dissenya un avís que depèn de la distància:

| Distància | LED | So (piezo) |
|---|---|---|
| > 30 cm (lluny) | | |
| 10–30 cm | | |
| < 10 cm (molt a prop) | | |

- **Esquema** (dibuixa o enganxa): ______________________
- **Defensa (1'):** explica el teu sistema i una aplicació real.

**Autoavaluació** (marca el teu nivell — NA/AS/AN/AE):
| Criteri | Nivell |
|---|---|
| El codi és modular (funcions) i comentat (R1) | ☐ NA ☐ AS ☐ AN ☐ AE |
| El circuit del sensor és correcte i estable (R2) | ☐ NA ☐ AS ☐ AN ☐ AE |

---

## Quadern tècnic (SA3)
- **Diferència entre entrada digital i analògica:** ______________________
- **Per a què serveix una funció?** _____________________________________
- **Error trobat i com l'he resolt:** ___________________________________
