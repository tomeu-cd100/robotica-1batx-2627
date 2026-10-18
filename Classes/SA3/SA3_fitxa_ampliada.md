# SA3 · Fitxa ampliada (aprofundiment) — Entrades i sensors

> 📄 **Versió ampliada**: té les mateixes activitats que la fitxa base, però amb més reptes i activitats extra. La fitxa que fa **tothom** és la base: **[SA3_fitxa_alumnat.md](SA3_fitxa_alumnat.md)**.

> 🧑‍🎓 **Quan toca obrir-la?** **Només si vols**, quan ja portis la fitxa base al dia. Algunes activitats d'aquí (la revisió del codi d'un company, el tiquet de sortida) les farà fer el docent a classe quan toqui.

**Nom:** ______________________  **Data:** __________

> Ara el teu Arduino aprèn a **notar** què passa: un botó, la llum, la distància. I al final, la teva **mascota** reaccionarà a tot això.

---

## Activitat 1 · El polsador i el Monitor sèrie (Sessió 1)
0. **Endevina** (abans de carregar-lo): mirant `01_polsador_debounce.ino`, què sortirà al Monitor sèrie quan premis el botó? ____________________
1. Munta el polsador al pin 2. Carrega el codi, obre el **Monitor sèrie** i **comprova** si ho has encertat.
2. Quan **no** prems, el pin llegeix ______. Quan **sí** prems, llegeix ______ (HIGH o LOW).
3. Per què cal l'**antirebot**? ______________________________
4. **Repte:** el comptador arriba a 5 i torna a 0. **+ Repte:** el LED només s'encén a la 5a premuda.

## Activitat 2 · El potenciòmetre i el sensor de llum (Sessió 2)
1. Llegeix el potenciòmetre (A0) i el sensor de llum (A1) al Monitor. Els números van de ____ a ____.
2. Quina instrucció passa de 0-1023 a 0-255? `__________`
3. **Llum automàtic:** el LED s'encén quan el número del sensor de llum és ____ que ______.
4. **+ Repte:** fes que la ratlla (el llindar) la triïs girant el potenciòmetre.

| Situació | Número del sensor de llum |
|---|---|
| Molta llum | |
| Mitja llum | |
| Tapat (fosc) | |

## Activitat 3 · L'ultrasons i la teva mascota (Sessió 3)
1. Munta l'ultrasons (TRIG al 12, ECHO a l'11). Carrega `03_ultrasons_funcio.ino` i obre el **Serial Plotter**.
2. distància (cm) = temps × ______ ÷ 2.
3. Què **et torna** la funció `mesuraDistancia()`? __________________________
4. **+ Repte:** per què la **mitjana de 3 mesures** fa que la gràfica «balli» menys? ____________

**La fitxa de la teva mascota:**

- **Nom:** ______________________ · **Caràcter:** ______________________

| Reacció | Quin sensor? | Què fa la mascota? | Per què encaixa amb el seu caràcter? |
|---|---|---|---|
| 1 | | | |
| 2 | | | |
| 3 | | | |
| 4 (extra) | | | |

- **Dibuix del circuit** (dibuixa'l o enganxa una foto): ______________________
- **Explica-la en 1 minut:** presenta la mascota i què fa cada reacció.

**Com ho he fet?** (la nota és de 0 a 10):
| | Nivell |
|---|---|
| Les reaccions funcionen i encaixen amb el caràcter de la mascota | ☐ Encara no ☐ Bé ☐ Molt bé ☐ Excel·lent |
| Els sensors estan ben connectats i no fallen | ☐ Encara no ☐ Bé ☐ Molt bé ☐ Excel·lent |

---

## Treball individual i ajuda entre companys

La mascota és **teva**: la muntes, la programes i l'expliques tu. Però ningú aprèn sol: apunta cada sessió **qui t'ha ajudat i a qui has ajudat** (i en què). Això es valora a la rúbrica **R5**.

| | Sessió 1 | Sessió 2 | Sessió 3 |
|---|---|---|---|
| Qui m'ha ajudat i en què | | | |
| A qui he ajudat i en què | | | |

> 👥 **Si el docent et posa amb algú un moment**, repartiu-vos els papers: un **escriu** el codi i l'altre **comprova** que estigui bé. A mitja sessió, canvieu. El que entregues continua sent teu.

---

## Si t'encalles

1. **Pista 1:** obre el **Monitor sèrie** i mira quins números arriben de debò del sensor.
2. **Pista 2:** repassa amb l'esquema els cables del sensor: **5 V**, **GND** i el del pin.
3. **Pista 3:** segueix **DEPURA** i, quan demanis ajuda, **explica què has provat ja**.

> **DEPURA:** **D**igues què esperaves i què passa · **E**xamina (**el Monitor sèrie!**) · **P**rova **un sol canvi** cada vegada · **U**bica on és el problema · **R**epara-ho · **A**punta-ho.

## Vols més?

- **Reptes ⭐:** [`Reptes/Reptes_SA3.md`](../../Reptes/Reptes_SA3.md) (llum de nit, sensor d'aparcament, instrument).
- **Prova-ho sense placa (Wokwi):** l'enllaç és a l'[apartat 4 dels esquemes](SA3_esquemes_connexions.md).

---

## Pensar com un programador

En aquesta SA has fet dues coses que fan servir tots els programadors:
- **Amagar la feina dins d'una funció:** `mesuraDistancia()` fa tots els passos del sensor, i tu només li demanes «a quina distància?».
- **Decidir amb una pregunta** (`if`): si el número és més petit que la ratlla, fes una cosa; si no, una altra.

On has fet servir una funció per no haver de repetir feina? ______________________

## Revisió del codi d'un company (2 estrelles i un desig)

Mira la mascota **d'un company o companya** (el codi i el circuit). **Primer, comprova aquestes tres coses** (marca ✓ o ✗):

| Comprova si… | ✓/✗ |
|---|---|
| Cada reacció segueix la idea **llegeix → compara → reacciona** | |
| Les reaccions fan **el que diu la seva fitxa** (prova-les!) | |
| Els sensors estan **ben connectats i no fallen** (5 V, GND, cables ferms) | |

Ara escriu-li la teva opinió. **Fes servir el que has vist a la taula.** El desig ha de ser una millora concreta, i afegeix-hi un dubte que t'hagi sorgit:
- ⭐ Una cosa ben feta: ______________________
- ⭐ Una altra cosa ben feta: ______________________
- 💡 Una millora concreta: ______________________
- ❓ Un dubte que tinc del seu codi: ______________________

## Tiquet de sortida (abans de marxar)

1. Una cosa que he après avui: ______________________
2. Una cosa que encara no tinc clara: ______________________
3. On ho faria servir a la vida real: ______________________

## A la vida real

Els sensors ajuden a **no malgastar**: el llum del carrer que només s'encén quan es fa fosc, o la llum del passadís que s'encén quan hi passa algú. Això estalvia energia (**ODS 7**) i ajuda a consumir amb cap (**ODS 12**). Com podria un sensor fer que la teva escola gastés menys? ______________________

---

## Quadern tècnic (SA3)
- **Diferència entre una entrada digital (el botó) i una analògica (el sensor de llum):** ______________________
- **Per a què serveix una funció?** _____________________________________
- **Un error que he tingut i com l'he arreglat:** ___________________________________
