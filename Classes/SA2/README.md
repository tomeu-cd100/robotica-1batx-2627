# SA2 · Sortides digitals i PWM (*Pulse Width Modulation*): dona vida als actuadors

Segona situació d'aprenentatge (**8 h · 4 sessions**, 1r trimestre). Passem d'encendre un LED (SA1) a **controlar diverses sortides i regular-ne la intensitat amb PWM**: semàfor, llum que «respira», LED RGB i, al final, un panell de senyalització amb so. Programació oficial: [`Programació didàctica/11_SA2_Sortides_digitals_PWM.md`](../../Programació%20didàctica/11_SA2_Sortides_digitals_PWM.md).

> 🧭 **Com treballes a la SA2 (4 regles):**
>
> 1. Obre **només la sessió d'avui** (aquí sota) i fes els passos **en ordre**. No cal mirar res més.
> 2. Cada pas té **un enllaç**: obre'l, fes el que diu i torna aquí.
> 3. Quan un pas diu **[✍️ Classroom](https://classroom.google.com/c/ODY4ODU4Njk0NTEy/a/ODcwNTEzOTQ1NjAz/details)**, respon aquella pregunta a la tasca de Classroom. Hi ha **una sola tasca per a tota la SA**: cada dia respons només les preguntes de l'activitat d'avui.
> 4. **No premis «Envia» fins a la Sessió 4.** Si has entrat amb el compte de l'escola, el formulari desa sol el que has escrit i l'endemà el trobes tal com el vas deixar.
>
> 💻 **Com carregar el codi d'una pràctica:** al final de la pàgina de la pràctica hi ha l'apartat **«El codi complet»**. Prem **Copia**, enganxa'l a l'Arduino IDE (esborra el que hi havia) i prem **→ Puja**.

## Itinerari per sessions

<details markdown="1" class="sessio">
<summary><strong>Sessió 1</strong> · Examen de la SA1 i el primer LED amb variables</summary>

1. 📝 **Primera hora: l'examen de la SA1**, la unitat que acabem de tancar (50', en paper, sense apunts ni ordinador). Entra el que vas treballar a la SA1 (entrada-procés-sortida, la placa, la seguretat i el `Blink`): per repassar-ho, fes el **[qüestionari de conceptes de la SA1](../SA1/SA1_questionari_conceptes.md)**. Quan l'entreguis, el docent et dona el kit i **comença la SA2**.
2. 🔌 **Munta** un LED al pin 8 amb una resistència de 220 Ω. Mira-ho a l'**[esquema, apartat 1](SA2_esquemes_connexions.md)**. La pota llarga del LED va cap al pin 8.
3. 🔮 Obre la **[Pràctica 1](codi/01_led_basic/EXPLICACIO.md)**. Llegeix el codi **sense carregar-lo** i respon a [✍️ Classroom](https://classroom.google.com/c/ODY4ODU4Njk0NTEy/a/ODcwNTEzOTQ1NjAz/details) què creus que farà el LED (Activitat 1, pregunta 0).
4. ▶️ **Carrega** el codi a la placa (Copia → Arduino IDE → Puja). Ha passat el que havies predit?
5. 🔧 **Canvia** el número de `int temps = 500;` i torna a carregar. Escriu a [✍️ Classroom](https://classroom.google.com/c/ODY4ODU4Njk0NTEy/a/ODcwNTEzOTQ1NjAz/details) el valor que has provat.
6. 📏 **Racó de mesura:** quan el docent et cridi, mesura amb el multímetre la tensió del LED i la de la resistència. Apunta els valors a [✍️ Classroom](https://classroom.google.com/c/ODY4ODU4Njk0NTEy/a/ODcwNTEzOTQ1NjAz/details). Si avui no hi arribes, ho faràs a la Sessió 2.
7. 📓 **Quadern (en paper):** dibuixa l'esquema i apunta un error que hagis tingut.

**Si acabes abans:** fes que el LED faci el codi Morse d'una lletra (· curt / − llarg). Explica-ho a [✍️ Classroom](https://classroom.google.com/c/ODY4ODU4Njk0NTEy/a/ODcwNTEzOTQ1NjAz/details) (Activitat 1, repte).

</details>

<details markdown="1" class="sessio">
<summary><strong>Sessió 2</strong> · El semàfor</summary>

1. 🔌 **Munta** 3 LED: vermell al pin 8, groc al 9 i verd al 10, **cadascun amb la seva resistència**. Mira-ho a l'**[esquema, apartat 2](SA2_esquemes_connexions.md)**.
2. 🔮 Obre la **[Pràctica 2](codi/02_semafor/EXPLICACIO.md)**. Prediu en quin ordre s'encendran les llums, carrega el codi i escriu a [✍️ Classroom](https://classroom.google.com/c/ODY4ODU4Njk0NTEy/a/ODcwNTEzOTQ1NjAz/details) quants segons dura cada color (Activitat 2).
3. 🔁 Obre la **[Pràctica 2b](codi/02b_semafor_switch/EXPLICACIO.md)**: és el mateix semàfor fet amb `switch`. Carrega'l, esborra un `break`, torna'l a carregar i mira què passa. Apunta-ho al **quadern**.
4. ⭐ **Repte:** afegeix una **fase nocturna** (el groc fa pampallugues) com a fase nova del `switch`. Explica a [✍️ Classroom](https://classroom.google.com/c/ODY4ODU4Njk0NTEy/a/ODcwNTEzOTQ1NjAz/details) com ho has fet (Activitat 2, repte).
5. 📓 **Quadern (en paper):** l'esquema dels 3 LED i un error que hagis resolt.

**T'has encallat al pas 2?** A la Pràctica 2 hi ha la secció **🧗 Si t'encalles**, amb un esquelet a mig fer.

</details>

<details markdown="1" class="sessio">
<summary><strong>Sessió 3</strong> · PWM: la llum que respira i els colors</summary>

1. 🔌 **Munta** un LED al **pin 9**, amb la seva resistència. El pin 9 té el símbol `~`: vol dir que és un pin PWM. Mira-ho a l'**[esquema, apartat 3](SA2_esquemes_connexions.md)**.
2. 🔮 Obre la **[Pràctica 3](codi/03_fade_pwm/EXPLICACIO.md)** i carrega el *fade*. Escriu a [✍️ Classroom](https://classroom.google.com/c/ODY4ODU4Njk0NTEy/a/ODcwNTEzOTQ1NjAz/details) entre quins valors va `analogWrite` (de ___ a ___).
3. 🔌 **Treu el LED i connecta el mòdul RGB** del kit amb 4 cables: R → 9, G → 10, B → 11 i − → GND. Mira-ho a l'**[esquema, apartat 4](SA2_esquemes_connexions.md)**.
4. 🎨 Obre la **[Pràctica 4](codi/04_rgb/EXPLICACIO.md)**. Crea 3 colors teus i escriu-ne els valors (R, G, B) a [✍️ Classroom](https://classroom.google.com/c/ODY4ODU4Njk0NTEy/a/ODcwNTEzOTQ1NjAz/details).
5. 📓 **Quadern (en paper):** la taula dels colors que has provat.

**Si acabes abans:** ⭐ fes una transició suau entre dos colors i explica-la a [✍️ Classroom](https://classroom.google.com/c/ODY4ODU4Njk0NTEy/a/ODcwNTEzOTQ1NjAz/details) (Activitat 3, repte).

</details>

<details markdown="1" class="sessio">
<summary><strong>Sessió 4</strong> · El producte: panell de senyalització (i entrega)</summary>

1. 🧠 **Mini-check** (10', en paper, **no compta per a nota**): escriu de memòria un programa que faci parpellejar un LED.
2. 🗒️ **Dissenya abans de programar:** decideix el color, el so i el relé de cada estat (Tot correcte · Avís · Alarma) i escriu-ho a [✍️ Classroom](https://classroom.google.com/c/ODY4ODU4Njk0NTEy/a/ODcwNTEzOTQ1NjAz/details) (Activitat 4).
3. 🔌 **Munta** el mòdul RGB (com a la Sessió 3), el brunzidor (+ al pin 6, − a GND) i el relé (IN al 7, VCC a 5 V, GND a GND). Mira-ho a l'**[esquema, apartat 5](SA2_esquemes_connexions.md)**.
4. 💻 Carrega la **[Pràctica 5](codi/05_panell_senyalitzacio/EXPLICACIO.md)** i canvia-la perquè faci els teus estats. **Mínim:** 2 estats ben diferents (color + so). **Complet:** 3 estats + relé.
5. 🎤 **Defensa d'1 minut** davant del docent: què fa el teu panell i una millora possible.
6. ✅ Repassa **[el meu checklist](SA2_checklist_alumnat.md)**.
7. 📤 **Acaba la tasca:** a [✍️ Classroom](https://classroom.google.com/c/ODY4ODU4Njk0NTEy/a/ODcwNTEzOTQ1NjAz/details), respon l'**autoavaluació** i les 3 preguntes del **quadern tècnic** (són al final del formulari). Ara sí: prem **Envia**.

</details>

### Si vols més (opcional)

- [Reptes de la SA2](../../Reptes/Reptes_SA2.md) ⭐ — tria el teu context.
- [Exemple resolt](SA2_exemple_resolt.md) · [Diagrama de flux del *fade*](SA2_diagrama_flux.md) · [Qüestionari de conceptes](SA2_questionari_conceptes.md) — per repassar a casa.
- [Fitxa base](SA2_fitxa_alumnat.md) — objectius, com s'avalua i la rutina DEPURA quan alguna cosa no funciona.
- [Fitxa ampliada](SA2_fitxa_ampliada.md) — aprofundiment.

## 📦 Què has d'entregar

| Quan | Què | On |
|---|---|---|
| S1 | Respostes ✍️ de la Sessió 1 (Activitat 1) | [Tasca de Classroom](https://classroom.google.com/c/ODY4ODU4Njk0NTEy/a/ODcwNTEzOTQ1NjAz/details) (una sola tasca per a tota la SA) |
| S2 | Respostes ✍️ de la Sessió 2 (Activitat 2) | Mateixa tasca de Classroom |
| S3 | Respostes ✍️ de la Sessió 3 (Activitat 3) | Mateixa tasca de Classroom |
| S4 | **Panell de senyalització** + defensa d'1' (Activitat 4) | A l'aula i a la mateixa tasca. S'avalua amb **R1** (codi) i **R2** (circuit) |
| 📓 | El full del **quadern tècnic** de cada sessió | En paper, en acabar la sessió |
| ⭐ | Un repte (opcional) | El docent el valida al [tauler de reptes](../00_General/00_Tauler_reptes.md) |
| 🤖 | Els colors, llums i sons que programis: són les «expressions» de la teva **mascota** | Guarda el codi: el reaprofitaràs al [robot del trimestre](../00_General/00_Projecte_T1_Mascota.md) |

<!-- web:only-github -->
## Contingut

| Fitxer | Descripció |
|---|---|
| [`SA2_guia_docent.md`](SA2_guia_docent.md) | Guia del professorat: xuleta de sessió (a dalt), 4 sessions, mapa d'avaluació i errors freqüents. |
| [`SA2_fitxa_alumnat.md`](SA2_fitxa_alumnat.md) | **Fitxa base** (nucli d'una cara, per a tot l'alumnat): Activitats 1-4 + quadern. |
| [`SA2_fitxa_ampliada.md`](SA2_fitxa_ampliada.md) | **Versió ampliada** (aprofundiment): totes les rutines (ajuda entre iguals, revisió creuada, exit ticket, ODS, PC) i ampliacions. |
| [`SA2_checklist_docent.md`](SA2_checklist_docent.md) | **Checklist docent** (una cara): logística prèvia, punts de control per sessió, avaluació i diversitat. |
| [`SA2_checklist_alumnat.md`](SA2_checklist_alumnat.md) | **Checklist alumnat** (una cara): què he de fer/lliurar + autoavaluació amb semàfor. |
| [`SA2_esquemes_connexions.md`](SA2_esquemes_connexions.md) | Esquemes i connexions de tots els circuits (LED, semàfor, fade, RGB, panell). |
| `codi/` | Sketches d'Arduino (vegeu la taula següent). |

> 🗄️ Els **katas** d'aquesta SA estan arxivats (18-10-2026) a [`docs/arxiu/SA2_katas/`](../../docs/arxiu/SA2_katas/README.md): l'alumnat no hi arribava i es van treure de l'itinerari per simplificar-lo.

### Codi (`codi/`)

| Sketch | Què mostra |
|---|---|
| `01_led_basic.ino` | Sortida digital amb constants i variables. |
| `02_semafor.ino` | Estructures de control (`for`, `if`) i temporització (amb esquelet «Si t'encalles» a la seva pàgina). |
| `02b_semafor_switch.ino` | El mateix semàfor amb `switch` sobre una variable de fase (llavor de la SA6). |
| `03_fade_pwm.ino` | PWM amb `analogWrite` i funció `map()`. |
| `04_rgb.ino` | Barreja de colors amb LED RGB. |
| `05_panell_senyalitzacio.ino` | Producte: RGB (estat) + piezo (avís) + relé (càrrega). |

Cada sketch té la seva **pàgina de pràctica** a la web (per què es fa + codi explicat per blocs); a GitHub, l'explicació és a l'`EXPLICACIO.md` de la carpeta del sketch.

<!-- /web:only-github -->

## Producte i avaluació

- **Producte:** dispositiu de senyalització programable (semàfor amb fase nocturna o panell d'estat RGB + so + càrrega).
- **Criteris:** CA1.1, CA2.1, CA2.2 · **Rúbriques:** **R1** (codi) i **R2** (circuit).

## Continuïtat

Ve de la **SA1** (parpelleig d'un LED) i porta a la **SA3** (entrades i sensors): després de fer que el sistema **actuï**, farem que **percebi** l'entorn.
