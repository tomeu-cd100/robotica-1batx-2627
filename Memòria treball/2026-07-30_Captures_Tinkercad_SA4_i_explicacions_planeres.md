# Memòria de treball — 30/07/2026 · Captures Tinkercad SA4 i explicacions més planeres

**Sessió:** validació dels muntatges de SA4 a Tinkercad (docent) + incrustació al web (Claude), rebaixa del to de l'explicació de la pràctica 3 i repte exprés nou del `map()`.

## Què s'ha fet

### 1. Fix de la taula del servo SG90 (esquemes SA4 §1)
La taula sortia com a text pla amb pipes a la web: faltava la línia en blanc entre `**Servo SG90:**` i la capçalera de la taula (Python-Markdown la necessita per activar el parser de taules). Cas únic al repo. (`6c1d9b8`)

### 2. Captures Tinkercad de SA4 §1–§3 (flux manual del docent)
Mateix flux que SA3: el docent munta i captura, Claude verifica el cablatge sobre la imatge, copia a `Classes/SA4/img/` i incrusta amb alt-text + enllaç *Copy and Tinker*.

- **§1 servo + potenciòmetre** — `sa4-tinkercad-servo-potenciometre.png` (`4692626`).
- **§2 motor + pont H** — `sa4-tinkercad-motor-pont-h.png`. La 1a versió del muntatge del docent **no girava: faltava el 5 V a VCC1 (pota 16)** — el L293D té dues alimentacions. Detectat a la revisió de la captura; també s'hi vigilava el costat del motor (OUT1/OUT2 amb IN1/IN2) i l'orientació del xip (etiqueta capgirada). (`2b3a8ad`)
- **§3 motor + HC-SR04** — `sa4-tinkercad-sensor-velocitat.png`, muntatge complet validat pel docent en simulació. (`6d6e3be`)
- **Pendent: §4 (barrera automàtica)** per tancar la sèrie SA4.

### 3. Variant Tinkercad del pont H documentada (esquemes SA4 §2)
Tinkercad no té el mòdul L298N: taula pota a pota del **xip L293D** (EN1,2=5~, IN1=7, IN2=8, OUT1/OUT2 al mateix costat, VCC1→5 V, VCC2→pila, massa comuna) + avís dels 3 errors típics (oblidar VCC1, motor al costat equivocat, xip girat). El codi de la pràctica no canvia. (`9d27ac0`)

Si el docent rebateja un projecte Tinkercad, l'enllaç antic segueix funcionant (va per id) però s'actualitza el slug per coherència (`c2d069a`, verificat amb WebFetch).

### 4. Explicació de la pràctica 3 més planera («per a un nen de 5 anys»)
Petició del docent: el Bloc 1 era massa dur. Reescrits els 4 blocs amb el patró **analogia quotidiana primer, codi després**, sense perdre contingut tècnic:

- **Bloc 1:** el crit i l'eco a la muntanya → crit (pols TRIG), cronòmetre (`pulseIn`), conversió (0,034 cm/µs i el perquè del `/2`); `void` vs `float` com a "fer feina i callar" vs "pregunta que rep resposta". (`f3975fc`)
- **Bloc 2:** creuar el carrer (seguretat primer, càlcul després, branques separades).
- **Bloc 3:** `map()` com a **traductor** entre l'idioma distància (10–50 cm) i l'idioma velocitat (80–255); mínim 80 = bici en el pinyó més dur; `constrain()` = topall del traductor massa obedient.
- **Bloc 4:** l'Arduino no té pantalla; `Serial.println` = fer-li dir en veu alta el que veu. (`f901ad5`)

**Criteri a mantenir:** aquesta rampa (analogia → codi) és el to que vol el docent per a les explicacions. Pendent si es demana: mateixa passada a les pràctiques 1, 2 i 4 de SA4.

### 5. Repte exprés «El traductor de distàncies» (`6d6e3be`)
Sorgit d'una observació real del docent provant la simulació: *"a partir de 50,1 cm el motor ja va a tope"* — comportament dissenyat (`map` 10–50 + `constrain`), però a Tinkercad la boleta arriba a ~330 cm i el gradient només es veu en un tram petit.

- **`Reptes/Reptes_SA4.md`:** secció «⚡ Repte exprés» (escalfament de 10 min, **no compta** com el repte triat dels tres): trobar el número que ho decideix, estendre el gradient a 2 m, comprovar amb el monitor sèrie.
- **Solucionari T2:** canvi exacte (el 50 del `map`, el `constrain` no es toca) + error esperable de l'alumnat.

## Decisions
- Els reptes exprés no alteren el contracte "tria UN dels tres" de les pàgines de reptes: van en secció pròpia marcada com a escalfament.
- Les captures només s'incrusten **després** que el docent confirmi que el muntatge funciona a la simulació; la revisió de Claude sobre la captura es fa abans (va caçar el VCC1 absent).

## Estat
- QA net a cada pas (només les 4 alertes PII conegudes del correu del docent).
- Tot pujat a `main` fins a `6d6e3be`.
