# Reptes SA6 · Sistemes de control

**Tria UN dels tres reptes.** Tots implementen un **llaç de control** (mesurar → comparar amb una consigna → actuar). Mateix requisit mínim, ampliacions graduades. Integren sensors (SA3) i actuadors (SA2/SA4). Simulables a Tinkercad/Wokwi.

> **Continguts SA6:** llaç obert vs tancat, realimentació, consigna, histèresi, màquina d'estats, control proporcional. · **Codi base:** `Classes/SA6/codi/`.

> **Format "producte real":** cada repte simula un **encàrrec** amb **client**, **lliurable** i **ús al món real**. El requisit tècnic no canvia. *(2n trimestre — el control proporcional dóna **moviment intel·ligent i precís** al braç robòtic de SA4. Vegeu `Programació didàctica/08c_Projectes_vida_real.md`.)*

---

## 🌡️ Repte A · Termòstat amb histèresi

**Context.** Un termòstat que **manté la temperatura** engegant i parant la calefacció/ventilació, sense oscil·lar contínuament.

> *Client: empresa de climatització · Lliurable: termòstat amb histèresi · Món real: calefacció i aire condicionat eficients.*

**Què treballa.** Llaç tancat, consigna, **histèresi** (dos llindars).

**Requisit mínim.**
- Llegir la **temperatura** (o un potenciòmetre que la simuli) i activar una sortida (LED/ventilador) segons una **consigna**.
- Codi comentat; valors al Monitor Sèrie.

**Ampliacions graduades.**
1. *(bàsica)* Afegeix **histèresi** (arrenca a X, atura a X−2) per evitar parpelleigs.
2. *(notable)* Permet **ajustar la consigna** amb un potenciòmetre.
3. *(⭐⭐⭐)* Afegeix **dos modes** (fred/calor) amb una màquina d'estats.

    **Fites** (valida-les en ordre):
    1. El **diagrama d'estats** és en paper abans de programar: estats, transicions i els llindars concrets de cadascuna.
    2. El mode calor funciona **sol** amb la seva histèresi (dos llindars), com el termòstat de classe.
    3. La commutació fred↔calor té una **banda morta** entre modes: mai s'encenen tots dos ni oscil·la al voltant del canvi.


---

## 🚦 Repte B · Semàfor adaptatiu (màquina d'estats)

**Context.** Un semàfor que **canvia d'estat** segons condicions (botó de vianants, sensor de presència), no només per temps.

> *Client: ajuntament (mobilitat) · Lliurable: semàfor adaptatiu amb màquina d'estats · Món real: trànsit intel·ligent que reacciona a la demanda.*

**Què treballa.** **Màquina d'estats** (estats + transicions), entrades que disparen canvis.

**Requisit mínim.**
- Implementar un semàfor amb **estats ben definits** (verd/groc/vermell) i transicions controlades per una **variable d'estat** (no encadenant `delay()`).
- Codi comentat.

**Ampliacions graduades.**
1. *(bàsica)* Afegeix un **polsador de vianants** que avança a vermell de forma segura.
2. *(notable)* Afegeix un estat de **parpelleig groc** (mode nocturn).
3. *(⭐⭐⭐)* Coordina **dos semàfors** d'un encreuament amb estats complementaris.

    **Fites** (valida-les en ordre):
    1. La **taula d'estats** de l'encreuament és en paper: per a cada fase, què mostra A i què mostra B (quan A és verd, B és vermell...).
    2. Hi ha **un sol `enum`** amb els estats de l'encreuament sencer (no dues màquines independents) i les transicions van amb `millis()`.
    3. El cicle complet és estable amb fases de groc, i **mai** hi ha els dos semàfors en verd (comprova-ho mirant 2 minuts seguits).


---

## ⚙️ Repte C · Regulador proporcional

**Context.** Un sistema que **corregeix de manera proporcional** a l'error: com més lluny de l'objectiu, més forta la correcció (llum, velocitat o posició).

> *Client: empresa de robòtica de precisió · Lliurable: regulador proporcional (base del PID) · Món real: control de motors, drons i braços robòtics (com el de SA4).*

**Què treballa.** **Control proporcional** (sortida ∝ error), `map()`/càlcul, PWM.

**Requisit mínim.**
- Mantenir una magnitud (p. ex. **nivell de llum** d'una LDR) a prop d'una **consigna** ajustant un LED per **PWM proporcional a l'error**.
- Codi comentat; error i sortida al Monitor Sèrie.

**Ampliacions graduades.**
1. *(bàsica)* Ajusta la **constant proporcional (Kp)** i observa l'efecte.
2. *(notable)* Compara amb un **control tot-o-res** i documenta la diferència.
3. *(⭐⭐⭐)* Aplica-ho a un **motor** (velocitat proporcional a la distància d'un ultrasons).

    **Fites** (valida-les en ordre):
    1. La distància es llegeix **estable** (mitjana de 3-5 lectures) i es mostra al Serial Plotter.
    2. La velocitat surt de `Kp * (distancia - consigna)` amb `constrain(0, 255)` i el motor respon en la **direcció correcta**.
    3. El comportament prop de la consigna és suau: documenta al quadern els valors de `Kp` provats i què passa quan és massa gran (oscil·la).


---

## 🎨 Fes-lo teu (tria abans de començar)

> El repte fixa **què** ha de fer el sistema; **el context el poses tu**. Tria i anota-ho al quadern:
> - **A:** decideix **què climatitza el termostat** (terrari, hivernacle, habitació…) i busca la **consigna real** que necessita.
> - **B:** modela **un encreuament que coneguis**: quina via té prioritat i per què.
> - **C:** tria **què manté a distància** el regulador: un ventilador que segueix la mà, una barrera suau, un vehicle que no xoca…

## Material necessari (segons repte)
- Arduino UNO + USB · sensor (temperatura/LDR/ultrasons) o potenciòmetre simulador · LED/ventilador/motor segons repte · o **Tinkercad/Wokwi**.

## Per on començar (mètode de projecte + PRIMM)
1. **Analitzar:** quina és la **variable a controlar** i quina la **consigna**?
2. **Dissenyar (Predir):** dibuixa el llaç (mesura → comparació → actuació) abans de codificar.
3. **Prototipar:** parteix de `Classes/SA6/codi/` (`02_termostat_histeresi`, `03_maquina_estats`, `04_control_proporcional`).
4. **Provar:** observa el comportament al Monitor Sèrie; ajusta llindars/Kp.
5. **Millorar:** afegeix histèresi, estats o proporcionalitat.

## Com s'avalua
| Rúbrica | Per què |
|---|---|
| **R1** (codi) | Estructura del llaç, màquina d'estats sense `delay` bloquejant. |
| **R3** (projecte) | Control fiable amb realimentació (autonomia/control). |
| **R4** (documentació) | Quadern tècnic: comparació de comportaments i ajust de paràmetres. |

## Producte / entrega
- Codi `.ino` comentat + quadern tècnic amb gràfic/registre del comportament i justificació dels paràmetres.

---

## Orientació docent
- **Errors freqüents:** confondre llaç obert i tancat; oscil·lacions per manca d'histèresi; màquines d'estats fetes amb `delay()` encadenats (millor variables d'estat + `millis()`); Kp massa alt (inestabilitat).
- **Diferenciació:** el mínim és un llaç tancat bàsic; histèresi, estats i proporcionalitat escalen la dificultat.
- **Gestió d'aula:** un **potenciòmetre** pot simular qualsevol sensor per centrar-se en el control. Connecta amb la SA3 (sensors) i la SA4 (actuadors).
- **Vincle avaluació:** R1 + R3 + R4; conceptes clau de cara al projecte final (SA9).

---

## 🤖 Cap al robot del trimestre

Aquest trimestre tot suma cap al **braç robòtic** ([dossier](../Classes/00_General/00_Projecte_T2_Brac.md) · [fil conductor](../Classes/00_General/00_Fil_conductor_robots.md)):

- **Repte B (semàfor adaptatiu)** → els modes del braç: la mateixa lògica de màquina d'estats (una sola variable d'estat, transicions controlades, mai dos estats incompatibles alhora) governa repòs/manual/replay/emergència al braç.

El sensor de col·lisió del braç fa d'entrada d'emergència: igual que el polsador de vianants força una transició segura al semàfor, un xoc força el braç a l'estat d'emergència i atura els servos. La histèresi d'aquest bloc es treballa amb el termòstat (repte A); el braç n'és la màquina d'estats.
