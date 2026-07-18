# 🤖 El fil conductor del curs: tres robots, tres trimestres

> **Per a qui és?** Per a tothom. És el mapa dels tres robots que cada parella
> construeix durant el curs i de com cada SA hi aporta una peça. El docent hi
> té el calendari de fabricació; l'alumnat, la visió de cap a on va cada repte.

**Durada:** tot el curs · **Maquinari:** talladora làser xTool S1, impressora 3D Bambu Lab P2S Combo, kits d'aula

## Per què tres robots

L'assignatura es diu **Robòtica**, però cap situació d'aprenentatge, per si
sola, acaba en un robot complet: es treballa amb components solts (un LED,
un sensor, un servo) i només la SA7 usa un robot ja muntat (la Imagina
3dBot, de dotació). Per tancar aquest buit, cada trimestre convergeix en la
construcció d'un **robot real per parella**, aprofitant la talladora làser
**xTool S1** i la impressora 3D **Bambu Lab P2S Combo** de l'aula.

Els tres robots són els tres arquetips clàssics de la robòtica: un robot
**social** que percep l'entorn i hi reacciona (la mascota), un robot
**manipulador** que actua sobre el món (el braç) i un robot **mòbil** que es
desplaça pel món (el rover). Cadascun tanca un trimestre i és independent
dels altres: no hi ha una evolució d'un robot cap al següent, sinó tres
productes complets.

El robot **no és una activitat nova ni una càrrega afegida**: és el lloc on
conflueixen els reptes que ja es feien a cada SA. Els sabers, les sessions i
les proves T1/T2/T3 no canvien; el que canvia és que el producte final de
cada bloc de SA es materialitza en una peça física del robot del trimestre.

## Els tres robots

| Trimestre | Robot | Arquetip | SA que hi aporten | On es tanca (producte) |
|---|---|---|---|---|
| 1r | Mascota reactiva | robot social | SA2, SA3 | Producte de SA3 (mascota amb ≥3 reaccions sensor→comportament + fitxa de personalitat) |
| 2n | Braç robòtic | robot manipulador | SA4, SA5, SA6 | Producte de SA6 (braç amb màquina d'estats i sensor de col·lisió com a final de carrera) |
| 3r | Rover autònom | robot mòbil | SA7, SA8, SA9 | Plataforma de SA7, ampliada a SA8 (telemetria) i repte final a SA9 |

<!-- web:only-github -->
Dossier de cada robot (peces, esquema de muntatge, cablatge i rúbrica):
[`00_Projecte_T1_Mascota.md`](00_Projecte_T1_Mascota.md) ·
[`00_Projecte_T2_Brac.md`](00_Projecte_T2_Brac.md) ·
[`00_Projecte_T3_Rover.md`](00_Projecte_T3_Rover.md)
<!-- /web:only-github -->

## Calendari de fabricació

| Trimestre | Sessió de fabricació | D'on surt l'hora | Què s'hi fa |
|---|---|---|---|
| T1 | S4 de SA2 | Palanca oficial del pla de contingència: el repte de la S3 fa de producte, i S4 queda alliberada | Tall làser de la caixa comuna i gravat de cares/orelles personalitzades; muntatge inicial de la mascota |
| T2 | S4 de SA4 | Mateixa palanca (repte de la S3 fa de producte) | Tall làser i muntatge del braç de 3 GDL (base, colze, pinça) |
| T3 | Sessió 0 del trimestre | Comprimir SA8 de 6 a 4 h (fusió de S1+S2) i traslladar les 2 h alliberades a l'inici del trimestre | Muntatge del xassís del rover (2 pisos), abans de començar SA7 |

> ⚠️ Les tres palanques de contingència del curs queden **totes gastades** en
> fabricació: el marge del calendari és pràcticament **zero**. Senyal
> d'alerta: si el T1 no tanca SA3 al desembre, la mascota de gener es
> reparteix amb les peces **pretallades pel docent** enlloc d'esperar una
> sessió de tall addicional.

## Com funciona una sessió de fabricació

1. **Abans de la sessió**, cada parella té el seu fitxer personalitzat (les
   zones de gravat de la plantilla) validat pel docent.
2. **Durant la sessió**, el docent opera la làser; l'alumnat hi assisteix
   per **rotacions** (grups de 2-3 parelles, 10-15 min cadascun) mentre la
   resta munta l'estructura ja tallada o avança en la programació.
3. Les **impressions 3D** es llancen entre sessions: el docent gestiona la
   cua de la impressora fora de l'horari de classe.
4. Es manté un **full de cua públic per màquina**, amb les columnes
   *parella | fitxer | estat* (pendent / tallat / lliurat), perquè tothom
   sàpiga on és la seva peça.

## Material i pressupost

| Material | Quantitat orientativa |
|---|---|
| DM 3 mm | ~12 taulers per trimestre |
| Filament PLA | 2-3 bobines per curs |
| Portapiles 6×AA | ×12 |
| Cargols M3 + separadors | segons muntatge |
| Pont H L298N | ×14 (12 parelles + reserva) |

**Total orientatiu: 130-180 €.** La resta d'electrònica (Arduino UNO,
sensors, servos, micro:bit...) surt dels **kits d'aula existents** i es
**retorna al juny**: els tres robots són desmuntables perquè els components
tornin a circular curs rere curs.

## On són les plantilles

<!-- web:only-github -->
- Plantilles de tall làser (SVG, un fitxer per robot) i la seva guia:
  [`../../Recursos/plantilles_laser/mascota.svg`](../../Recursos/plantilles_laser/mascota.svg),
  [`../../Recursos/plantilles_laser/brac.svg`](../../Recursos/plantilles_laser/brac.svg),
  [`../../Recursos/plantilles_laser/rover.svg`](../../Recursos/plantilles_laser/rover.svg) ·
  [`../../Recursos/plantilles_laser/LLEGEIX-ME.md`](../../Recursos/plantilles_laser/LLEGEIX-ME.md)
- Peces impreses en 3D (OpenSCAD) i la seva guia:
  [`../../Recursos/peces_3d/escaire_caixa.scad`](../../Recursos/peces_3d/escaire_caixa.scad),
  [`../../Recursos/peces_3d/difusor_ull.scad`](../../Recursos/peces_3d/difusor_ull.scad),
  [`../../Recursos/peces_3d/suport_hcsr04.scad`](../../Recursos/peces_3d/suport_hcsr04.scad),
  [`../../Recursos/peces_3d/roda_boja.scad`](../../Recursos/peces_3d/roda_boja.scad),
  [`../../Recursos/peces_3d/dit_pinca.scad`](../../Recursos/peces_3d/dit_pinca.scad) ·
  [`../../Recursos/peces_3d/LLEGEIX-ME.md`](../../Recursos/peces_3d/LLEGEIX-ME.md)

Els SVG de tall làser **no s'editen a mà**: es regeneren amb
`py tools/genera_plantilles_laser.py`.
<!-- /web:only-github -->
