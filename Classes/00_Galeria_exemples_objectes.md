# Galeria d'exemples resolts — objectes de disseny

> Dos objectes desenvolupats **de punta a punta** com a **model**: mostren com es veu la `00_Plantilla_disseny_objecte.md` ben omplerta. Útils per ensenyar el nivell esperat (no per copiar: l'alumnat dissenya el seu).

---

# Exemple 1 · Llum d'estat d'escriptori (SA2)

**SA:** 2 (sortides, PWM, RGB) · **Nom de l'objecte:** "EstaLlum"

## 1 · Empatitzar
- **Usuari:** una persona que estudia o teletreballa en una habitació compartida.
- **Problema:** la interrompen quan està concentrada; vol avisar sense haver de dir res.

## 2 · Definir
- **Funció:** mostrar amb color l'estat de disponibilitat: **verd = lliure**, **groc = un moment**, **vermell = no molestar**.
- **Requisits mínims:** (1) tres estats amb color clar; (2) canvi d'estat amb un botó; (3) visible des de la porta.
- **Continguts SA2:** LED RGB, `analogWrite` (PWM), seqüència amb `if`/variables.

## 3 · Idear i dissenyar
- **Esbós:** cub de 8 cm amb una cara difusora; el botó al lateral; sortida del USB per darrere.

```
        ┌─────────┐
        │ ░░░░░░░ │  ← cara difusora (paper vegetal)
        │ ░░░░░░░ │
        └──○──────┘  ○ = botó d'estat
```
- **Forma i mida:** cub ~8 cm. · **Materials:** cartró ploma + paper vegetal de difusor (o carcassa impresa en filament translúcid).

## 4 · Prototipar
| Element | Concreció |
|---|---|
| Entrades | 1 polsador (canvi d'estat) al pin 2 |
| Sortides | LED RGB (R=9, G=10, B=11), càtode comú a GND |
| Placa i pins | Arduino UNO; RGB a pins ~PWM |
| On va l'electrònica | placa al fons del cub; RGB centrat darrere la cara difusora |
| Fixació | placa amb velcro; forat posterior per al USB |

- **Codi base:** `Classes/SA2/codi/04_rgb.ino` (afegint la lògica de 3 estats amb el polsador, com a `Reptes/Solucionari/SA3/C_instrument` per al botó amb antirebot).
- **Simulació de referència:** llum ambient RGB a `Simulacions/Wokwi/Reptes/SA2_B_ambient_ampliat/`.

## 5 · Provar i millorar
| Versió | Què fallava o millorar | Què he canviat | Resultat |
|---|---|---|---|
| v1 | El groc semblava verd | Vaig pujar el R i baixar el G (`255,120,0`) | Groc clar |
| v2 | El botó canviava dos estats per premuda | Vaig afegir antirebot (*debounce*) | Un canvi per clic |
| v3 | Poc visible de dia | Difusor de paper vegetal i LED a màxima intensitat | Visible des de la porta |

## 6 · Comunicar (decisions de disseny)
1. **Cub difusor** perquè el color es vegi des de qualsevol angle, no un punt brillant.
2. **Paper vegetal** (reutilitzat) com a difusor: barat i ecodisseny (ODS 12).
3. **Tres estats** en lloc de dos: el "groc = un moment" evita interrupcions però no bloqueja del tot.

## Autoavaluació (model)
| Aspecte | Nivell |
|---|---|
| Funció | AE — fa els 3 estats de manera fiable |
| Usabilitat | AN — un sol botó intuïtiu; falta etiqueta dels colors |
| Construcció | AN — sòlid; les vores es poden refinar |
| Ecodisseny | AE — cartró i paper reutilitzats, desmuntable |
| Comunicació | AE — decisions justificades |

---

# Exemple 2 · Mini-hivernacle automàtic (SA6)

**SA:** 6 (control: llaç tancat, histèresi) · **Nom de l'objecte:** "HortBox"

## 1 · Empatitzar
- **Usuari:** algú amb una planta a casa o a l'aula que sovint oblida ventilar/regar.
- **Problema:** la planta pateix per excés de calor o falta de cura quan no hi ha ningú.

## 2 · Definir
- **Funció:** mantenir la planta dins d'un rang: si fa massa "calor" (lectura alta), activa un **ventilador**; quan es refreda, l'atura — **amb histèresi** per no oscil·lar.
- **Requisits mínims:** (1) llegir un sensor; (2) activar una sortida segons consigna; (3) histèresi (dos llindars).
- **Continguts SA6:** llaç tancat, histèresi, `if/else`, `analogRead`.

## 3 · Idear i dissenyar
- **Esbós:** caixa transparent (ampolla gran tallada o marc imprès amb làmines) amb la planta a dins; ventilador a una paret; electrònica en un calaix sec a sota.

```
     ┌───────────────┐
     │   🌱  (planta) │
     │            ▤▤▤ │ ← ventilador
     ├───────────────┤
     │  [ electrònica]│ ← calaix sec, separat
     └───────────────┘
```
- **Materials:** ampolla/PET reutilitzat o metacrilat; base de fusta; suport de sensor imprès.

## 4 · Prototipar
| Element | Concreció |
|---|---|
| Entrades | sensor a A0 (NTC; en prova, potenciòmetre que simula la temperatura) |
| Sortides | ventilador/LED al pin 9 (via transistor/relé si és ventilador real) |
| Placa i pins | Arduino UNO; A0 sensor, 9 sortida |
| On va l'electrònica | calaix inferior **sec**, separat de la zona humida |
| Fixació | placa cargolada a la base; cables passats per un forat segellat |

- **Codi base:** `Classes/SA6/codi/02_termostat_histeresi.ino`.
- **Simulació de referència:** `Simulacions/Wokwi/SA6_termostat_histeresi/` (públic) — gira el potenciòmetre i observa que la sortida **no vibra** a la zona morta.

## 5 · Provar i millorar
| Versió | Què fallava o millorar | Què he canviat | Resultat |
|---|---|---|---|
| v1 | El ventilador s'encenia i apagava molt seguit | Vaig separar els llindars (600/500) → histèresi | Commutació estable |
| v2 | L'electrònica es mullava amb el reg | Vaig moure la placa a un calaix inferior segellat | Segur i sec |
| v3 | No sabia si funcionava | Vaig afegir un LED verd/vermell d'estat | Estat visible |

## 6 · Comunicar (decisions de disseny)
1. **Histèresi (dos llindars)** perquè el ventilador no s'engegui i s'aturi sense parar (allarga la vida i estalvia energia, ODS 7).
2. **Separar electrònica de la zona humida**: seguretat i durabilitat.
3. **PET reutilitzat** com a campana transparent: ecodisseny (ODS 12) i deixa veure la planta.

## Autoavaluació (model)
| Aspecte | Nivell |
|---|---|
| Funció | AE — control en llaç tancat amb histèresi correcte |
| Usabilitat | AN — el LED d'estat ajuda; falta ajustar la consigna fàcilment |
| Construcció | AN — estanc i estable; acabat millorable |
| Ecodisseny | AE — PET reutilitzat, desmuntable |
| Comunicació | AE — justifica el perquè de la histèresi i la separació |

---

## Com fer servir aquesta galeria
- **Projecta un exemple** abans que l'alumnat empleni la seva `00_Plantilla_disseny_objecte.md`: mostra el **nivell i el detall** esperats.
- Fes notar que el valor és el **procés** (iteracions de la fase 5) i les **decisions justificades** (fase 6), no la perfecció de l'acabat.
- Recursos: catàleg a `00_Banc_objectes_disseny.md` · full de treball a `00_Plantilla_disseny_objecte.md` · mapa a `00_Mapa_SA_objectes.md`.
