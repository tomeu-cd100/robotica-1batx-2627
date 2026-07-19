# 🤖 El fil conductor del curs: tres robots, tres trimestres

> **Per a qui és?** Per a tothom. És el mapa dels tres robots que cada parella
> construeix durant el curs i de com cada SA hi aporta una peça. El docent hi
> té el calendari de fabricació; l'alumnat, la visió de cap a on va cada repte.
> **Quan toca?** Mira'l a l'**inici de cada trimestre** (per saber quin robot toca
> i què hi aportarà cada SA) i quan un repte digui «cap al robot del trimestre».

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
| 1r | Mascota reactiva | robot social | SA2, SA3 | Producte SA3 (mascota amb ≥3 reaccions sensor→comportament + fitxa de personalitat; tancat a S3, S4 = prova T1 intacta) |
| 2n | Braç robòtic | robot manipulador | SA4, SA5, SA6 | Producte SA6 (braç amb màquina d'estats i sensor de col·lisió com a final de carrera; tancat a S3, S4 = prova T2 intacta) |
| 3r | Rover autònom | robot mòbil | SA7, SA8, SA9 | Plataforma de SA7 i base del repte SA9 |

Dossier de cada robot (peces, esquema de muntatge, cablatge i rúbrica):
[🐣 la mascota](00_Projecte_T1_Mascota.md) ·
[🦾 el braç](00_Projecte_T2_Brac.md) ·
[🚗 el rover](00_Projecte_T3_Rover.md)

## Calendari de fabricació

| Trimestre | Sessió de fabricació | Què s'hi fa |
|---|---|---|
| T1 | S4 de SA2 | Tall làser de la caixa comuna i gravat de cares/orelles personalitzades; muntatge inicial de la mascota |
| T2 | S4 de SA4 | Tall làser i muntatge del braç de 3 GDL (base, colze, pinça) |
| T3 | Sessió 0 del trimestre (abans de SA7) | Muntatge del xassís del rover (2 pisos) |

<div class="nomes-docent" markdown="1">

> 🧑‍🏫 **D'on surten les hores (nota per al docent):** T1 i T2 usen la
> palanca oficial del pla de contingència (el repte de la S3 fa de producte i
> la S4 queda alliberada); T3 comprimeix SA8 de 6 a 4 h (fusió de S1+S2) i
> trasllada les 2 h a l'inici del trimestre. D'aquestes palanques, ja en
> queden **dues gastades**: només resta la tercera (SA7 de 8 a 6 h) com a
> **últim recurs** — el marge del calendari és pràcticament **zero**. Senyal
> d'alerta: si el T1 no tanca SA3 al desembre, la mascota de gener es
> reparteix amb les peces **pretallades pel docent** en lloc d'esperar una
> sessió de tall addicional. Detall complet al document
> [08 · Seqüenciació temporal anual](../../Programació%20didàctica/08_Sequenciacio_temporal_anual.md).

</div>

## Com funciona una sessió de fabricació

1. **Abans de la sessió**, la parella porta l'esborrany de la cara fet (de
   casa o del tancament de la S3 anterior).
2. **Durant la sessió**, s'ajusta l'esborrany al fitxer, el docent el valida
   i es talla per **rotacions** (grups de 2-3 parelles, 10-15 min cadascun)
   mentre la resta munta l'estructura ja tallada o avança en la
   programació.
3. Les **impressions 3D** es llancen entre sessions: el docent gestiona la
   cua de la impressora fora de l'horari de classe.
4. Es manté un **full de cua públic per màquina**, amb les columnes
   *parella | fitxer | estat* (pendent / tallat / lliurat), perquè tothom
   sàpiga on és la seva peça.

## Material i pressupost

L'estructura de cada robot (fusta tallada a làser i peces impreses en 3D) és
**vostra i personalitzada**; l'electrònica (Arduino UNO, sensors, servos,
micro:bit...) surt dels **kits d'aula** i es **retorna al juny**: els tres
robots són desmuntables perquè els components tornin a circular curs rere
curs.

<div class="nomes-docent" markdown="1">

| Material (compra del centre) | Quantitat orientativa |
|---|---|
| DM 3 mm | ~12 taulers per trimestre |
| Filament PLA | 2-3 bobines per curs |
| Portapiles 6×AA | ×12 |
| Cargols M3 + separadors | segons muntatge |
| Caniques de 16 mm (roda boja) | ×15 (cost negligible) |
| Pont H L298N | ×14 (12 parelles + reserva) |

**Total orientatiu: 130-180 €.** Detall al document
[09c · Inventari del maquinari](../../Programació%20didàctica/09c_Inventari_kits_disponibles.md).

</div>

## On són les plantilles

Els fitxers font de les plantilles (tall làser i peces 3D) viuen al
**repositori de GitHub del curs**, no en aquesta web: a l'aula sempre es
treballa sobre la còpia que us passa el docent, i la personalització es fa
sobre les **zones vermelles** de la plantilla.

<!-- web:only-github -->
- Plantilles de tall làser (SVG, un fitxer per robot) i la seva guia:
  [`../../Recursos/plantilles_laser/mascota.svg`](../../Recursos/plantilles_laser/mascota.svg),
  [`../../Recursos/plantilles_laser/brac.svg`](../../Recursos/plantilles_laser/brac.svg),
  [`../../Recursos/plantilles_laser/xassis_rover_ARomero.svg`](../../Recursos/plantilles_laser/xassis_rover_ARomero.svg)
  (xassís del rover: disseny d'**Antonio Romero**, CC BY-NC-SA 4.0, geometria provada) ·
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
