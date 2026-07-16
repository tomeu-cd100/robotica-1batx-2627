# Reptes SA1 · Introducció: primer programa amb un LED

**Tria UN dels tres reptes.** Tots controlen un **LED** amb sortides digitals (`pinMode`, `digitalWrite`, `delay`) i el model **entrada→procés→sortida**. Parteixen del mateix **requisit mínim** i creixen amb **ampliacions**. Es poden muntar a Tinkercad o amb el LED intern (pin 13).

> **Continguts SA1:** robot i sistema embegut, digital vs analògic, esquelet `setup()`/`loop()`, primer codi (`Blink`). · **Vocabulari/bases:** `Classes/SA0/`.

> **Format "producte real":** cada repte simula un **encàrrec** amb **client**, **lliurable** i **ús al món real**. El requisit tècnic no canvia; el marc ajuda a donar sentit al producte. *(1r trimestre — dispositius que informen i perceben. Vegeu `Programació didàctica/08c_Projectes_vida_real.md`.)*

---

## 🌊 Repte A · Far costaner

**Context.** Un far identifica cada port amb un **patró de llum** propi (tants segons encès, tants apagat). Programa un far amb el seu codi lluminós únic.

> *Client: autoritat portuària · Lliurable: balisa amb patró identificatiu · Món real: senyalització marítima i navegació.*

**Què treballa.** Sortida digital, temporització amb `delay()`, seqüència repetitiva al `loop()`.

**Requisit mínim.**
- Un LED que repeteix **un patró identificatiu propi** (mínim 2 temps diferents, p. ex. 2 s encès / 1 s apagat).
- Codi comentat amb `setup()` i `loop()`.

**Ampliacions graduades.**
1. *(bàsica)* Usa **variables** per als temps i canvia el patró fàcilment.
2. *(notable)* Combina **dos patrons** alternats (flaix curt + llum llarga) amb un bucle `for`.
3. *(⭐⭐⭐)* Afegeix un **segon LED** (far secundari) amb un ritme diferent i sincronitzat.

    **Fites** (valida-les en ordre):
    1. El far secundari (pin 12) parpelleja sol amb el seu propi ritme, en un sketch de prova a part.
    2. Els dos LEDs conviuen al mateix sketch **sense aturar-se l'un a l'altre** (pista: un dels dos no pot dependre de `delay()`; investiga `millis()`).
    3. Els dos patrons es mantenen estables durant 1 minut seguit: el far principal no es va desfasant per culpa del secundari.

---

## 🚲 Repte B · Llum de bicicleta intel·ligent

**Context.** Les llums de bici tenen diversos **modes** (fix, intermitent ràpid, intermitent lent). Programa el comportament lluminós d'una llum del darrere.

> *Client: marca de mobilitat urbana · Lliurable: llum de seguretat multimode · Món real: seguretat viària i visibilitat ciclista.*

**Què treballa.** Sortida digital, patrons de parpelleig, organització del `loop()`.

**Requisit mínim.**
- Un LED que fa un **mode intermitent clar i regular** (p. ex. 200 ms encès / 200 ms apagat).
- Codi comentat.

**Ampliacions graduades.**
1. *(bàsica)* Afegeix un **segon mode** (parpelleig més lent) que s'executi després del primer.
2. *(notable)* Programa una **seqüència d'emergència** (3 flaixos ràpids + pausa) amb bucle `for`.
3. *(⭐⭐⭐)* Encapsula cada mode en una **funció pròpia** (`mode_emergencia()`...).

    **Fites** (valida-les en ordre):
    1. Un primer mode funciona dins una funció (p. ex. `mode_rapid()`) cridada des del `loop()`, exactament igual que abans d'encapsular-lo.
    2. Tots els modes són funcions amb **paràmetres** (p. ex. nombre de repeticions o durada), sense codi duplicat entre elles.
    3. El `loop()` queda reduït a 3–4 línies llegibles que només criden les funcions en ordre.

---

## 📡 Repte C · Missatge en Morse

**Context.** Abans dels mòbils, els missatges viatjaven en **codi Morse** (punts i ratlles). Fes que el LED enviï una paraula curta.

> *Client: equip de rescat · Lliurable: emissor lluminós de senyals d'auxili · Món real: comunicació d'emergència sense ràdio.*

**Què treballa.** Sortida digital, temps curts/llargs, idea de codificar informació amb llum.

**Requisit mínim.**
- El LED emet **les lletres S O S** (· · · — — — · · ·) amb temps de punt i ratlla diferenciats.
- Codi comentat.

**Ampliacions graduades.**
1. *(bàsica)* Usa **variables** per al temps del punt i deriva'n la ratlla (×3).
2. *(notable)* Crea les **funcions** `punt()` i `ratlla()` i compon el missatge cridant-les.
3. *(⭐⭐⭐)* Envia **les teves inicials** respectant les pauses entre lletres i paraules.

    **Fites** (valida-les en ordre):
    1. Tens escrites en paper les seqüències punt/ratlla de les teves inicials i les **quatre durades** (punt, ratlla, pausa entre símbols, pausa entre lletres), totes derivades de la unitat de punt.
    2. La primera inicial s'emet correcta, amb pausa d'1 unitat entre símbols i de 3 unitats en acabar la lletra.
    3. Les dues inicials completes s'emeten en bucle amb pausa de 7 unitats entre repeticions, i un company amb la taula Morse davant les desxifra sense veure el teu codi.

---

## Material necessari (qualsevol dels tres)
- Arduino UNO + cable USB (o LED intern del pin 13) · 1 LED + resistència 220 Ω + cables (si és muntatge real) · o **Tinkercad/Wokwi**.

## Per on començar (mètode de projecte + PRIMM)
1. **Analitzar:** quin patró/missatge vull? Dibuixa'l en una línia de temps.
2. **Dissenyar (Predir):** escriu *abans* quines línies de codi necessitaràs.
3. **Prototipar:** parteix de `Classes/SA1/codi/blink.ino` i modifica'l.
4. **Provar:** carrega'l, observa, compara amb la teva predicció.
5. **Millorar:** introdueix variables/funcions i una ampliació.

## Com s'avalua
| Rúbrica | Per què |
|---|---|
| **R1** (codi) | Funcionament, estructura, llegibilitat, depuració. |
| **R4** (documentació) | Quadern tècnic: predicció, solució i millora. |
| **R5** (actitud) | Autonomia, gestió de l'error, cooperació. |

## Producte / entrega
- Codi `.ino` comentat + entrada al **quadern tècnic** (predicció, què he fet, error trobat i millora).

---

## Orientació docent
- **Errors freqüents:** LED sense resistència o amb polaritat invertida; `delay()` massa petit (parpelleig imperceptible); oblidar `pinMode(..., OUTPUT)`.
- **Diferenciació:** el mínim és idèntic als tres → tothom assoleix la base; les ampliacions 2–3 introdueixen `for` i funcions per a qui va sobrat.
- **Gestió d'aula:** tots són simulables a Tinkercad si no hi ha prou plaques; el repte C connecta amb l'ampliació `sos_morse.ino` de la SA1.
- **Vincle avaluació:** producte coherent amb el de la SA1 (quadern tècnic, R4/R5) i amb la rúbrica R1 de codi.
