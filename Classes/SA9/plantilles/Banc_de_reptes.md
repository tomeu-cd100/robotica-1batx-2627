# SA9 · Banc de reptes (per nivells)

Tria un repte segons l'ambició de l'equip. Tots integren electrònica + programació + control. Els ⭐ indiquen dificultat.

## Nivell ⭐ (assolible amb el que sabem)
1. **Hort/hivernacle automàtic:** rega o ventila segons humitat/temperatura (llaç tancat + histèresi).
2. **Aparcament intel·ligent:** barrera + comptador de places lliures (servo + ultrasons).
3. **Estació meteorològica:** mesura i mostra/registra temperatura i llum (telemetria micro:bit).
4. **Semàfor adaptatiu:** màquina d'estats amb polsador de vianants.

## Nivell ⭐⭐ (cal integrar diversos mòduls)
5. **Robot seguidor de línia** amb cronòmetre i millores (Imagina 3dBot).
6. **Robot evita-obstacles** amb estratègia de navegació.
7. **Sistema domòtic:** llum + clima + alarma controlats i monitorats.
8. **Mà/braç robòtic** amb diversos servos per a una tasca (classificar, saludar).

## Nivell ⭐⭐⭐ (ambiciós / competició / TR)
9. **Robot de competició** (WRO / RoboCup Junior / FTC) segons reglament.
10. **Robot amb control proporcional** (seguidor de línia suau / equilibri).
11. **Sistema IoT complet:** sensors → ràdio/WiFi → registre i alertes.
12. **IA aplicada:** classificació de gestos/objectes per controlar un sistema (detall a sota).

### Repte 12 en detall · Sistema controlat per IA

**Context.** Un sistema que **decideix amb un model** (no només amb regles `if`): reconeix un gest, un objecte, un so o una postura i hi associa una **acció**. És el pas que tanca el fil del curs *percebre → decidir amb dades*.

**Què treballa.** Cicle de **ML** (recollir dades → entrenar → provar → millorar), **biaix**, i integració del model en un sistema. Connecta amb la SA8 i el marc de `../../00_IA_a_la_materia.md`.

**Dues vies (tria segons material):**
- **Via A · Teachable Machine (recomanada, sense maquinari extra).** Entrena un classificador (imatge/so/postura) al navegador i fes que **dispari una acció** (vegeu `../SA8_practica_teachable_machine.md`). L'acció pot ser virtual (missatge a pantalla) o física si exportes el model i el connectes a un actuador.
- **Via B · micro:bit (gestos).** Classifica gestos de l'acceleròmetre (regles o ML de MakeCode) i controla un altre dispositiu per ràdio (comandament gestual).

**Requisit mínim.** Reconèixer **≥2 classes** de manera fiable i associar-hi una **acció clara**; **document** del procés (quines dades, com s'ha provat).

**Ampliacions graduades.**
1. *(bàsica)* Afegeix una **tercera classe** i millora-la amb més exemples.
2. *(notable)* **Identifica i corregeix un biaix** (proves amb condicions/persones diferents) i documenta-ho.
3. *(⭐⭐⭐)* **Integra el model** en un sistema físic (gest/objecte → moviment d'un robot o actuador).

**Avaluació.** R3 (sistema funcional i iterat), R1 (codi/integració), R4 (**reflexió sobre dades, biaix i ètica** — obligatòria).

> ⚠️ **Privadesa:** no entrenis models amb **cares d'alumnes** ni dades personals sense consentiment (vegeu l'ètica de dades de la SA8).

## Criteris per triar
- Que sigui **realitzable** en 10 h amb el material disponible.
- Que tingui un **requisit mínim clar** + millores opcionals.
- Que resolgui un **problema real** i tingui sentit (impacte/sostenibilitat).

> Es pot proposar un repte propi, amb el vistiplau del professorat.
