# Memòria de treball — Millora de les SA7–SA9 (Bloc 3) i tancament
### Data: 27 de juny de 2026

Registre de l'avenç: **aplicació de les millores de segona iteració** al **Bloc 3: SA7 (robòtica mòbil), SA8 (IoT/IA) i SA9 (projecte final)**. Amb aquest bloc es completa la revisió de **totes les SA del curs (SA1-SA9)**.

---

## Abast (igual que els blocs anteriors)
README per carpeta · mapa d'avaluació · mètode de projecte + ponts · PRIMM + buits propis. Profunditat: parificar + buits crítics.

## Què s'ha fet
1. **`README.md` nou** a SA7, SA8 i SA9.
2. **Bloc de mètode de projecte i continuïtat** a cada guia (a SA9, en forma de **culminació del cicle**).
3. **Mapa d'avaluació** (instrument → criteri CA → rúbrica) a cada guia.
4. **PRIMM** ("0. PREDIU") a la primera activitat de codi de SA7 i SA8 (a SA8, en Python).
5. **Autoavaluació amb rúbriques** al producte de SA7 i SA8.

## Tractament especial de la SA9 (projecte final)
- **No s'hi aplica PRIMM**: l'alumnat no llegeix codi donat, **escriu el seu propi** a partir de `Codi_base_PLANTILLA/`.
- S'ha fet explícita la **correspondència fase a fase** entre el cicle del mètode de projecte (SA1) i les 5 sessions (Idear → Prototipar → Provar → Millorar → Comunicar).
- Mapa d'avaluació amb **les cinc rúbriques** (R1-R5) i els criteris CA2.1, CA3.1, CA4.1, CA5.1, CA5.2, CA5.3.

## Ponts de continuïtat (tancament de la cadena)
- **SA7:** ve de SA6 (control) → porta a SA8 (IoT/IA). Comportaments autònoms = llaç tancat aplicat al moviment.
- **SA8:** ve de SA7 (robot mòbil) → porta a SA9. Reprèn el fil dels dos llenguatges (SA5).
- **SA9:** culmina tot el curs (SA1-SA8); tanca el mètode de projecte iniciat a la SA1.

## Reorganització estructural (commit a part)
- S'han mogut **22 sketches `.ino`** solts (SA2-SA9) a **subcarpetes homònimes**, com exigeix l'Arduino IDE (la SA1 ja ho complia; els `.py` de micro:bit no es toquen). Fet amb `git mv` per preservar l'historial.

## Estat final del curs
Totes les SA (SA1-SA9) tenen ara: README, mètode de projecte, PRIMM (on aplica), mapa d'avaluació, ponts de continuïtat i autoavaluació. Estructura de sketches homogènia i compatible amb l'Arduino IDE.

## Possibles passos següents (opcionals)
1. Crear un **pòster A3 del mètode de projecte** comú a l'aula.
2. Revisar el contingut intern dels **sketches** (compilació real) i de les **plantilles de la SA9**.
3. Afegir **imatges reals** als documents de connexions de totes les SA.
