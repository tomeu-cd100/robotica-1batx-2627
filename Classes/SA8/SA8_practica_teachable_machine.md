# Pràctica 5 · Teachable Machine: una IA que aprèn d'exemples

<div class="cap-practica" markdown="1">

❓ **La pregunta:** Com aprèn una màquina a partir d'exemples?

🎯 **Avui aconseguiràs:** el **producte de la SA**: entrenar un classificador amb exemples teus, descobrir quan falla i per què, i reflexionar sobre les dades i la privacitat.

⏱️ La segona part de la Sessió 3 (~50')

📦 Un ordinador o tauleta amb càmera o micròfon i navegador ([teachablemachine.withgoogle.com](https://teachablemachine.withgoogle.com))

</div>

## 🚀 Pas a pas

### Pas 1 · Tria i planifica

Avui **no programes les regles**: ensenyes una IA **amb exemples**. Tria un mode: **imatge** (3 objectes o gestos de la mà), **so** (paraules curtes) o **postura** (dret, assegut, braços amunt). Fes servir **objectes, gestos o sons**, no cares de persones.

✍️ **Apunta-ho:** el mode que tries i les teves classes (mínim 2 + una de «fons/res»).

✍️ **Apunta-ho:** PREDIU: quants exemples creus que necessitaràs de cada classe perquè encerti?

### Pas 2 · Recull dades i entrena

Obre Teachable Machine → *Get Started* → el teu mode. Per a **cada classe**, recull **20-30 exemples** variats (angle, distància, llum, veu). Prem **Train Model** i espera sense tancar la pestanya.

✅ **Comprova:** a la vista prèvia, el model encerta les teves classes amb exemples nous.

### Pas 3 · Prova'l i intenta enganyar-lo

Mostra-li exemples **nous**, que no hagi vist. Després, **trenca'l a propòsit**: canvia la llum, el fons, parla més fluix, posa't lluny.

✍️ **Apunta-ho:** quan falla el teu model? Posa dos casos amb el percentatge de confiança.

### Pas 4 · Millora'l

Afegeix **més exemples variats** a la classe que fallava i torna a entrenar.

✍️ **Apunta-ho:** ha millorat? Què has après sobre **quines dades** calen?

### Pas 5 · Reflexiona: biaix i ètica

Això compta per a la rúbrica R4.

✍️ **Apunta-ho:** biaix: si l'has entrenat només amb les **teves** condicions, amb qui o quan fallaria?

✍️ **Apunta-ho:** quina diferència hi ha entre el classificador per **regles** de la Pràctica 4 i aquest? Quan val més la pena cadascun?

✍️ **Apunta-ho:** si el teu model classifiqués **persones**, què hauries de demanar abans?

### Pas 6 · Respon i envia

📤 [Obre la tasca «SA8 · Pràctica 5» a Classroom i envia el formulari](https://classroom.google.com/c/ODY4ODU4Njk0NTEy/a/ODk5NDU4MzczMTA4/details)

📷 [Penja la foto de la teva pràctica a la tasca «Foto · SA8 · Pràctica 5»](https://classroom.google.com/c/ODY4ODU4Njk0NTEy/a/ODk5NDU3NjEyOTgy/details)

Hi trobaràs les mateixes preguntes ✍️ que has anat apuntant. Envia'l ara i passa a l'**[Entrega final](README.md#entrega-final)**: demostració del classificador i autoavaluació.

⭐ **Si acabes abans:** **exporta el model** (Export Model → TensorFlow.js) i pensa com el faries servir al teu projecte de la SA9. O compara dues classes molt semblants: com afecta la confiança? Més reptes a **[Reptes de la SA8](../../Reptes/Reptes_SA8.md)**.

<div class="nomes-docent" markdown="1">

## 👩‍🏫 Per al professorat

**Objectiu:** que l'alumnat visqui el cicle de ML (*recollir dades → entrenar → provar → millorar*) i en descobreixi els límits (biaix, sobreajust, dades dolentes), connectant-ho amb *bones dades = bones decisions*. Marc: `00_IA_a_la_materia.md` · ètica de dades a la [guia docent](SA8_guia_docent.md).

**Requisits i pla B:**

- **Ideal:** 1 dispositiu amb càmera o micròfon i navegador per alumne/a + internet.
- **Sense dispositius per a tothom:** demostració projectada amb la classe aportant exemples. El debat i les preguntes es fan igual.
- **Sense internet:** ajornar a l'aula d'informàtica o a casa i, mentrestant, fer el debat d'ètica i biaix amb el classificador per regles de la Pràctica 4.
- **Privadesa:** no desar ni publicar cap model amb cares d'alumnes; treballar amb objectes, gestos o sons, tret de consentiment explícit.

**Temporització (~50'):** demo del cicle (10') · recollir i entrenar (15') · provar i trencar-lo (10') · millorar (5') · reflexió (10').

**Currículum:** CA5.1 (IA aplicada), CA5.3 (biaix, dades, privadesa). Rúbriques: R3 (el classificador funciona i s'itera) i R4 (documentació i reflexió).

</div>
