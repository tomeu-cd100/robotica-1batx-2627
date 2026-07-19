# Reptes SA2 · Sortides digitals i PWM

> 🧑‍🎓 **Quan toca fer-ne un?** És l'**ampliació ⭐** de la SA: comença'l quan tinguis el **nucli al dia** (les activitats de la fitxa). Tria'n **UN**, ensenya'l al docent perquè el validi i pinta l'estrella al [tauler de reptes](../Classes/00_General/00_Tauler_reptes.md).

**Tria UN dels tres reptes.** Tots coordinen **diverses sortides** i/o fan servir **PWM** (`analogWrite`, 0–255, pins `~`). Mateix requisit mínim, ampliacions graduades. Simulables a Tinkercad/Wokwi.

> **Continguts SA2:** múltiples sortides digitals, PWM i brillantor, LED RGB, seqüències. · **Codi base:** `Classes/SA2/codi/`.

> **Format "producte real":** cada repte simula un **encàrrec** amb **client**, **lliurable** i **ús al món real**. El requisit tècnic no canvia. *(1r trimestre — dispositius que informen i perceben. Vegeu `Programació didàctica/08c_Projectes_vida_real.md`.)*

---

## 🚦 Repte A · Semàfor d'un encreuament

**Context.** Programa el cicle d'un semàfor de cotxes amb els temps realistes de cada fase.

> *Client: ajuntament (mobilitat) · Lliurable: regulador de semàfor d'una cruïlla · Món real: regulació de trànsit urbà.*

**Què treballa.** Coordinar 3 sortides digitals amb una seqüència temporitzada.

**Requisit mínim.**
- 3 LED (vermell, groc, verd) amb la **seqüència correcta** i temps diferents per fase.
- Codi comentat amb els pins ben identificats.

**Ampliacions graduades.**
1. *(bàsica)* Usa **constants** per als pins i **variables** per als temps.
2. *(notable)* Afegeix un **semàfor de vianants** coordinat (verd vianants quan vermell cotxes).
3. *(⭐⭐⭐)* Encapsula cada fase en una **funció** i fes el cicle net al `loop()`.

    **Fites** (valida-les en ordre):
    1. Una fase (p. ex. "cotxes passen") viu dins una funció que deixa **els tres LEDs** a l'estat correcte, i el semàfor funciona igual que abans.
    2. Totes les fases són funcions i el `loop()` només les crida en ordre: no hi queda cap `digitalWrite` solt.
    3. Canviar la durada d'una fase vol dir tocar **un sol número** (constant o paràmetre): prova-ho i comprova que res més no es desquadra.

---

## 💡 Repte B · Llum d'ambient regulable

**Context.** Una llum d'ambient que **puja i baixa d'intensitat** suaument (efecte "respiració") o canvia de color.

> *Client: estudi de disseny d'interiors · Lliurable: làmpada d'ambient regulable · Món real: il·luminació decorativa i domòtica.*

**Què treballa.** PWM amb `analogWrite` (0–255), bucles per fer transicions suaus.

**Requisit mínim.**
- Un LED en un pin `~` que fa un **efecte fade** (puja i baixa d'intensitat) amb un bucle `for`.
- Codi comentat.

**Ampliacions graduades.**
1. *(bàsica)* Ajusta la **velocitat** del fade amb una variable.
2. *(notable)* Passa a un **LED RGB** i fes una transició entre **dos colors**.
3. *(⭐⭐⭐)* Programa un **cicle de colors** (arc de Sant Martí) barrejant els tres canals.

    **Fites** (valida-les en ordre):
    1. Tens una funció `color(r, g, b)` que fixa els tres canals amb una sola crida, provada amb 3–4 colors fixos (vermell, groc, cian...).
    2. Una transició entre **dos** colors surt suau amb un `for` (un canal puja mentre l'altre baixa, sense salts visibles).
    3. El cicle complet passa per tota la roda de color i torna exactament al color inicial, repetint-se sense cap tall brusc.

---

## 📊 Repte C · Indicador de nivell (barra de LED)

**Context.** Un indicador visual de nivell (bateria, dipòsit, volum) amb una **barra de LEDs** que s'omple per trams.

> *Client: fabricant d'equips industrials · Lliurable: indicador de nivell de barra · Món real: panells de control de bateria, dipòsit o volum.*

**Què treballa.** Control de múltiples sortides segons un valor, organització amb bucles.

**Requisit mínim.**
- 4–5 LED que s'encenen **progressivament** segons un nivell (de moment fixat al codi o amb un comptador).
- Codi comentat.

**Ampliacions graduades.**
1. *(bàsica)* Recorre els LED amb un **bucle `for`** i un array de pins.
2. *(notable)* Fes que el nivell **pugi i baixi** en bucle (efecte VU-mètre).
3. *(⭐⭐⭐)* Substitueix l'últim LED per un **RGB** que passi de verd a vermell segons el nivell.

    **Fites** (valida-les en ordre):
    1. El LED RGB mostra **verd fix** amb nivell baix i **vermell fix** amb nivell alt (els dos casos extrems, forçats al codi).
    2. Amb `map()` calcules els components vermell i verd a partir del nivell, i els valors surten coherents pel Monitor Sèrie (0–255, un puja quan l'altre baixa).
    3. Mentre la barra puja i baixa, el color canvia **gradualment** i sempre és coherent amb el nombre de LEDs encesos.

---

## 🎨 Fes-lo teu (tria abans de començar)

> El repte fixa **què** ha de fer el sistema; **el context el poses tu**. Tria i anota-ho al quadern:
> - **A:** temporitza el semàfor amb **un encreuament real que coneguis** (quant dura el verd de veritat?).
> - **B:** tria **l'ambient** de la llum: quins colors, per a quina habitació o moment.
> - **C:** decideix **què representa la barra**: volum, nivell d'un dipòsit, intensitat de llum… i posa-li unitats.

## Material necessari (segons repte)
- Arduino UNO + cable USB · LEDs (3–5) + resistències 220 Ω (o LED RGB) · cables / placa de proves · o **Tinkercad/Wokwi**.

## Per on començar (mètode de projecte + PRIMM)
1. **Analitzar:** quantes sortides necessito i com es coordinen en el temps?
2. **Dissenyar (Predir):** fes un esquema de pins i una línia de temps de les fases.
3. **Prototipar:** parteix dels sketches de `Classes/SA2/codi/` (`02_semafor`, `03_fade_pwm`, `04_rgb`, `05_panell_senyalitzacio`).
4. **Provar:** comprova temps i colors; depura amb el Monitor Sèrie si cal.
5. **Millorar:** introdueix constants, funcions i una ampliació.

## Com s'avalua
| Rúbrica | Per què |
|---|---|
| **R1** (codi) | Estructura i modularitat (funcions per fase). |
| **R2** (circuit) | Muntatge correcte de múltiples sortides i resistències. |
| **R4** (documentació) | Esquema de connexions i quadern tècnic. |

## Producte / entrega
- Codi `.ino` comentat + **esquema de connexions** + entrada al quadern tècnic.

---

## Orientació docent
- **Errors freqüents:** confondre `analogWrite` (0–255) amb nivells digitals; usar PWM en un pin **sense** `~`; oblidar resistències; ordre de fases del semàfor incorrecte.
- **Diferenciació:** el mínim assegura la base (seqüència/fade/barra); les ampliacions porten a arrays, RGB i funcions.
- **Gestió d'aula:** el repte A enllaça amb `02_semafor`; el B amb `03_fade_pwm`/`04_rgb`; el C amb `05_panell_senyalitzacio`. Tot simulable.
- **Vincle avaluació:** producte amb esquema (R2/R4) coherent amb el material de la SA2.

---

## 🤖 Cap al robot del trimestre

Aquest trimestre tot suma cap a la **mascota reactiva** ([dossier](../Classes/00_General/00_Projecte_T1_Mascota.md) · [fil conductor](../Classes/00_General/00_Fil_conductor_robots.md)):

- **Repte A (semàfor)** → el codi de colors d'humor de la mascota (contenta/neutra/enfadada) als ulls NeoPixel.
- **Repte B (llum d'ambient)** → la «respiració» dels ulls quan la mascota dorm.
- **Repte C (indicador de nivell)** → el termòmetre d'emoció de la mascota: el LED RGB passa de verd a vermell segons la seva intensitat (tranquil·la ↔ molt excitada), igual que la barra puja i baixa amb el nivell.

El que programes al repte és **directament** una expressió de la teva mascota: guarda el codi, que el reutilitzaràs quan la caixa estigui tallada.
