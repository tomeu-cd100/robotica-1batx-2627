# Reptes SA7 · Robòtica mòbil (Imagina 3dBot)

**Tria UN dels tres reptes.** Tots fan que un **robot mòbil es desplaci de forma autònoma** amb una lògica pròpia. Mateix requisit mínim, ampliacions graduades.

> ⚠️ **Important:** cal **ajustar els pins** dels motors al codi segons el manual de la placa (bloc marcat als `.ino`).
> **Continguts SA7:** moviment bàsic, trajectòries, evitar obstacles (ultrasons), seguidor de línia (IR). · **Codi base:** `Classes/SA7/codi/`.

> 🌟 **Format "producte real" — producte estrella del 3r trimestre:** construïu un **cotxe/robot autònom**. Cada repte n'és una capacitat (ruta, exploració, seguiment). A SA8 hi afegireu **telecomandament i telemetria (IoT/IA)**. *(Vegeu `Programació didàctica/08c_Projectes_vida_real.md`.)*

---

## 📦 Repte A · Robot repartidor (trajectòria programada)

**Context.** Un robot de magatzem que ha de seguir un **recorregut conegut** (anar, girar, tornar) per portar una càrrega d'un punt a un altre.

> *Client: operador logístic · Lliurable: robot repartidor de ruta programada · Món real: AGV de magatzem i logística automatitzada.*

**Què treballa.** Moviment bàsic (endavant, gir, parar), seqüència de trajectòria, funcions de moviment.

**Requisit mínim.**
- El robot fa una **trajectòria definida** (mínim: anar recte, girar i parar) amb **funcions** de moviment (`endavant()`, `gira()`...).
- Codi comentat amb els pins dels motors ajustats.

**Ampliacions graduades.**
1. *(bàsica)* Completa un **quadrat** (o circuit tancat) tornant al punt inicial.
2. *(notable)* **Calibra** els temps de gir perquè els angles siguin precisos.
3. *(⭐⭐⭐)* Encadena una **ruta amb diverses parades** i senyalitza-les amb un LED/so.

---

## 🧭 Repte B · Robot explorador (evita obstacles)

**Context.** Un robot que **explora** un espai sense xocar, canviant de rumb quan detecta un obstacle.

> *Client: agència d'exploració · Lliurable: robot explorador evita-obstacles · Món real: rovers, robots d'inspecció i neteja autònoma.*

**Què treballa.** Ultrasons + lògica de navegació (decisió segons distància).

**Requisit mínim.**
- El robot avança i, en **detectar un obstacle** a prop, **s'atura i canvia de direcció** per continuar.
- Codi comentat.

**Ampliacions graduades.**
1. *(bàsica)* Encapsula la mesura i la maniobra en **funcions**.
2. *(notable)* **Estratègia** de navegació: mira a banda i banda i tria el costat més lliure.
3. *(⭐⭐⭐)* Combina amb un **mode de cerca** (explora fins a trobar pas) sense quedar encallat.

---

## 🏁 Repte C · Seguidor de línia

**Context.** Un robot de competició que **segueix una línia** pintada al terra el més de pressa i estable possible.

> *Client: equip de competició de robòtica · Lliurable: robot seguidor de línia · Món real: competicions (WRO/RoboCup) i guiatge industrial per línia.*

**Què treballa.** Sensors infrarojos (IR), lògica de seguiment, ajust de velocitat.

**Requisit mínim.**
- El robot **segueix una línia** amb els sensors IR (corregeix quan se'n surt).
- Codi comentat.

**Ampliacions graduades.**
1. *(bàsica)* Afegeix un **cronòmetre** del recorregut (Monitor Sèrie).
2. *(notable)* Suavitza les correccions per anar **més ràpid sense sortir-se**.
3. *(⭐⭐⭐)* Implementa un **control proporcional** (gir ∝ desviació) — pont amb la SA6.

---

## Material necessari
- Robot **Imagina 3dBot** (xassís + motors + pont H integrat) · sensor d'ultrasons (repte B) · mòdul de sensors IR (repte C) · piles/bateria · cinta/circuit de línia (repte C) · manual de la placa per als **pins**.

## Per on començar (mètode de projecte + PRIMM)
1. **Analitzar:** quin comportament vull i quins sensors el guien?
2. **Dissenyar (Predir):** descompon el moviment en funcions; predigues els temps de gir.
3. **Prototipar:** parteix de `Classes/SA7/codi/` (`01_moviment_basic`, `02_trajectoria_quadrat`, `03_evita_obstacles`, `04_seguidor_linia`) i **ajusta els pins**.
4. **Provar:** prova en un espai segur i ampli; calibra temps/llindars.
5. **Millorar:** afegeix estratègia, cronòmetre o control proporcional.

## Com s'avalua
| Rúbrica | Per què |
|---|---|
| **R1** (codi) | Funcions de moviment, lògica de navegació/seguiment. |
| **R3** (projecte) | Robot autònom, integració sensors+motors, fiabilitat. |
| **R5** (actitud) | Iteració, gestió de l'error, cooperació en proves. |

## Producte / entrega
- Codi `.ino` comentat (amb pins ajustats) + quadern tècnic amb el procés de calibratge i un vídeo/registre de la prova.

---

## Orientació docent
- **Errors freqüents:** **pins dels motors** no ajustats al manual; sentit de gir invertit; temps de gir sense calibrar; sensors IR sense ajustar al contrast del terra; bateria baixa (comportament erràtic).
- **Diferenciació:** el mínim és moviment autònom amb funcions; trajectòries precises, estratègies i control proporcional escalen.
- **Gestió d'aula:** reservar **espai de proves**; treballar per torns si hi ha pocs robots; el repte C necessita un circuit de línia preparat. Seguretat: robots a terra, no a la taula.
- **Vincle avaluació:** R1 + R3 + R5; el repte C connecta amb el control proporcional (SA6) i prepara el projecte (SA9).
