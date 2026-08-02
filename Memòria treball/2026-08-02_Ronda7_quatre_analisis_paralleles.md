# 2026-08-02 · Ronda 7: quatre anàlisis independents i paral·leles

## Mètode

Quatre anàlisis independents i paral·leles: (1) temps d'aula i sistema
d'avaluació, (2) corba d'aprenentatge i exercicis SA1-SA5, (3) SA6-SA9,
projectes trimestrals i tancament, (4) recorregut d'ulls nous (docent que
hereta el curs + alumne de 16 anys). Les troballes de severitat alta s'han
verificat manualment sobre el material abans d'incloure-les. **Cap fitxer del
material tocat encara**: aquest document és només l'informe.

## Troballes ALTA (totes 8 verificades manualment — confirmades)

1. **Barrera SA4 perd el timeout «vital»** —
   `Classes/SA4/codi/04_barrera_automatica/04_barrera_automatica.ino:23` fa
   `pulseIn(ECHO, HIGH)` sense timeout ni `return 400`, just després que
   SA3-P3, SA3-P4 i SA4-P3 declarin la guarda «vital» i «es porta d'un sketch
   a l'altre sense tocar-la». Sense objecte davant: ~1 s de bloqueig per volta
   i retorn de 0 (que la guarda `d > 0` de l'EXPLICACIO tapa en silenci).

2. **`millis()` s'escriu de zero abans d'explicar-se** — el kata de SA3-S1
   (`SA3_katas.md:10`) demana el `loop()` del debounce amb aritmètica de
   `millis()`; l'EXPLICACIO de la pràctica l'usa (línies 55, 63) però no diu
   mai què retorna, i SA2 només el «presenta, sense aprofundir»
   (`SA2_guia_docent.md:60,67`, que l'ajorna a SA4). Matís: kata de rèplica
   post-modelatge i amb apunts.

3. **Sessions de prova pressuposten 110-120' en sessions de ~95-105'** —
   `SA3_guia_docent.md:88-90` (i SA6, i `Avaluació/Prova_practica_T1.md`):
   instruccions 5-10' + prova 95-100' + tancament 10', contra el temps efectiu
   que `04_Metodologia.md:25` fixa en ~95-105'. Úniques sessions sense nota
   «⏱️ Marge»; la prova real quedarà en ~80-85'.

4. **SA1 prepara l'eina equivocada** — `SA1_guia_docent.md:17,86,89` només
   parla d'Arduino IDE d'escriptori (i Tinkercad); `GUIA_INICI_DOCENT.md:37`
   diu que l'aula real és Chromebook + Web Editor. Cap esment de Web
   Editor/Chromebook a tota la carpeta SA1.

5. **Àncores mortes a l'itinerari d'alumnat del web** — les portades de SA
   enllacen activitats de la fitxa (`sa1-fitxa-alumnat.html#1-entrada-...`,
   6 enllaços a `web/classes/sa1/index.html`), però les activitats són dins
   `<!-- web:only-github -->` i el generador les elimina: l'id no existeix a
   la pàgina destí. Verificat a SA1 i SA2.

6. **Pàgines d'alumnat enllacen rúbriques rere la porta docent** —
   `00_Avaluacio_per_alumnat.md:32` («Tens dret a veure-les abans de
   començar») i `00_Quadern_tecnic.md:33` enllacen `07_Rubriques.md`, que al
   web és vista docent amb porta de contrasenya (verificat `avis-docent` a
   `web/programacio/07-rubriques.html`).

7. **Els sketches de SA7 no mouen el rover real** — el dossier
   (`00_Projecte_T3_Rover.md:23,193`) afirma que els `.ino` de SA7 van al
   rover «canviant només el bloc PINS», però SA7 usa el model 1 pin de
   direcció + 1 de velocitat per motor i el cablatge del rover és L298N amb
   IN1/IN2 + IN3/IN4 (dos pins de direcció per motor, taula línies 124-127):
   cal reescriure `motors()`, no només pins. El solucionari `T3_rover.ino` ja
   usa l'altre model.

8. **El braç T2 promet modes que el codi de referència no té** —
   `00_Projecte_T2_Brac.md:136,152` (màquina d'estats repòs/manual/replay/
   emergència; R3 notable = «tots els modes funcionen») contra
   `T2_brac_microbit_receptor.py`, que només té `bool emergencia` + control
   manual (verificat: cap repòs/replay al codi). A més, la màquina d'estats
   s'ensenya en C++ i el braç en aquest punt va amb MicroPython, sense
   bastida del patró en Python.

## Troballes MITJANA (seleccionades, no verificades una a una)

**Temps/avaluació:** T3 amb 24 h programades en ~22 h disponibles (dèficit
estructural de 2 h, detectat per dos revisors independents); SA6-S3 a 125'
reals (taula 120' + «Python flash» 5' no comptat); activacions de represa
SA6/SA7/SA8 amb ~12' prescrits en 10'; quadern tècnic avaluat amb R1 als
mapes de SA2-SA4 però R4 a fitxes/checklists/06; registre del mini-check
apuntant a `Full_qualificacio_competencies.md` quan els semàfors són a
`Full_seguiment_grup.md:11`; «repesca col·lectiva ja prevista al banc» que no
existeix al banc (i per SA3/SA6 cauria el dia de la prova); graelles de SA9
del banc d'activació amb l'estructura antiga de sessions.

**SA1-SA5:** «primeres funcions pròpies» a SA4-P2 quan SA2-P4 ja ho va ser;
`return` presentat com a novetat a SA4-P3 (és la funció de SA3-P3); error
factual «esperaria per sempre» (el timeout per defecte de `pulseIn` és 1 s);
repte bàsic de SA2 amb arrays mai ensenyats; reptes de SA1 amb `for`/funcions/
`millis()` per davant del temari sense avís a la cara de l'alumne; kata
SA4-03 amb enunciat 100-255 però comparació ② que cita el 80-255 del sketch.

**SA6-SA9/projectes:** rúbrica del rover ancorada a una «competició» que cap
sessió acull; `Prova_practica_T3.md` desactualitzada del fil conductor (2-3
robots vs rover per parella); pla B Wokwi de SA7 no enllaçat des de cap
document de SA7 i sense URL pública; katas etiquetats a sessions de mini-check
(SA6-S3, SA7-S4, SA8-S3) que la política substitueix — contradicció entre
documents (també detectat per l'anàlisi 1 com a BAIXA); «sessió de 4 h» a
`SA8_guia_docent.md:43` (són 2 h); el curs acaba de cop amb la prova T3:
sense retrospectiva, tancament de portfolio, desmuntatge ni difusió dels tres
robots.

**Ulls nous:** katas absents de `GUIA_INICI_DOCENT.md` i
`00_Mode_supervivencia.md` (el docent nou no sap si són nucli o retallables);
«graella d'activació = rutina no negociable #1» però cap guia de sessió la
pauta (dos sistemes d'activació paral·lels); enllaços durs al Classroom de
l'autor sense avís al flux de fork; `00_LLEGEIX-ME_Classes.md` orfe (només
enllaçat des d'un README secundari); al mapa del docent falten
`Classes/Solucionari/` i la guia de compra 09b; fitxes SA6-SA8 diuen «Arduino
IDE» sense enllaçar la guia del Web Editor.

## Troballes BAIXA

Registrades als informes dels revisors (12 en total): imprecisions factuals
menors (PWM «milers de vegades per segon», `unsigned long` «nou»), residus de
coherència narrativa, llindar de defenses SA9 amb 6 equips, cablatge del
sensor de col·lisió del braç sense pin a la taula (codi usa P8), dimensió
«Proves pràctiques» amb R1/R3 quan les proves usen també R2/R4.

## Valoracions globals dels quatre àmbits

1. **Temps/avaluació:** sistema inusualment honest (temps efectiu explicitat,
   retallades prioritzades); febles: sessions de prova i T3.
2. **SA1-SA5:** progressió de molta qualitat; febles: barrera SA4 i arrencada
   de SA3; la resta, ferides d'una frase.
3. **SA6-SA9:** el punt calent SA6 està ben desactivat i la retirada de
   bastida SA7→SA9 és de les millors seqüències del repo; taló d'Aquil·les:
   coherència material↔robot real (tot validat només en simulació) i el
   tancament de curs.
4. **Ulls nous:** aterratge docent i vista alumnat molt bons; trencaments
   mecànics de navegació (àncores, porta docent) i doble discurs d'eina
   (IDE vs Web Editor).

## Estat

Pendent de decidir amb el docent l'ordre d'aplicació. Cap correcció aplicada.
