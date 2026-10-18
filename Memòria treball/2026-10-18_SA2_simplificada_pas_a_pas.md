# 2026-10-18 · SA2 simplificada: itinerari pas a pas

## Per què

En començar la SA2 a l'aula, l'alumnat no sabia per on començar: massa documents (portada, fitxa que remet a Classroom, 6 pàgines de pràctica, katas, diagrama, exemple resolt, qüestionari, fitxa ampliada…). El docent també dubtava de què explicar. Prioritat: l'alumne.

## Què s'ha fet

- **Portada `Classes/SA2/README.md`**: bloc «Com treballes (3 regles)» + itinerari amb **una sessió plegable per dia** (`<details class="sessio">`), passos numerats amb **un sol enllaç** cadascun i marca ✍️ quan cal respondre a Classroom. «Si vols més» (opcional) agrupa reptes, exemple resolt, diagrama, qüestionari, fitxa base i ampliada.
- **Katas de la SA2 arxivats** a `docs/arxiu/SA2_katas/` (no es publiquen). Tret el ganxo «Kata primer!» de les 6 pràctiques i les mencions de la fitxa, el checklist docent i la guia. `tools/qa.py`: `KATAS_ARXIVATS = {2}` (vigila que el ganxo no hi torni).
- **Generador**: `NOMES_CONSULTA` inclou diagrama, exemple resolt i qüestionari de la SA2 → paginador d'alumnat 9 → 5 passos; menú lateral: Presentació · Fitxa · Esquemes · Codi · Checklist.
- **CSS** (`web/assets/css/estil.css`): estil de `.ruta details.sessio`.
- **Guia docent**: «⚡ Xuleta de sessió» a dalt (què explicar ~10', què vigilar, què comprovar abans que marxin).
- Transversals (`00_LLEGEIX-ME_Classes`, `00_Mode_supervivencia`): katas = SA3-SA8.

## Segona tanda (mateix dia): itinerari alineat amb Classroom i el kit

Cada pas ✍️ enllaça la tasca i correspon a una pregunta real del formulari; s'expliquen com carregar el codi (Copia → IDE → Puja) i que no s'ha de prémer «Envia» fins a l'última sessió; el RGB és el mòdul del kit (R, G, B, −). La pàgina de la Prova SA1 és només per al docent: l'alumne rep l'enllaç al qüestionari de repàs de la SA1.

## Tercera tanda: fora l'antiga S1 de la SA2 (decisió del docent)

- **Per què:** l'antiga S1 (`01_led_basic`: `Blink` amb `const`, canviar el temps, Morse) repetia la S3 de la SA1, i la Prova SA1 (que inclou el `Blink`) es feia el mateix dia.
- **SA2 = 3 sessions (6 h):** S1 semàfor (amb llei d'Ohm i Racó de mesura, l'evidència CA2.2), S2 PWM/RGB, S3 panell. `01_led_basic` queda com a **bastida** «comença per un sol LED».
- **Sessió de marge** entre SA1 i SA2 (docent la va triar davant de «Prova al final de la SA1» o «Prova a l'inici de la nova S1»): Prova SA1 (50') + posada al dia de la SA1. Doc 08: subtotal SA 66 h + 2 h de marge de prova + ~2 h de marge = 70 h. Calendari: entrada `MARGE-T1` (les dates no es mouen) i migració de les marques «feta» al `localStorage` (v2).
- Renumerat a tot arreu: guia, programació 11, fitxa (Activitats 1-3), fitxa ampliada, checklists, pràctiques, mini-check (S3), banc d'activació, fil conductor (fabricació de la mascota = S3 de SA2), rúbrica de defensa (SA2 S3), Prova SA1 (solucionari, SA1, 06/07/10, full de qualificació), quadern en paper (PDF T1-T3 regenerats).
- `Material Classroom/sa_definicions.js` actualitzat a 3 activitats (reptes opcionals).

## Pendent / a decidir

- ⚠️ **Formulari de Classroom en línia** encara amb l'antiga «Activitat 1» (PREDIU, temps, Morse: obligatòries). Cal ajustar-lo abans de la S3, o l'alumnat no podrà enviar.
- Si funciona a l'aula, replicar el model a la SA3 i següents (i decidir si s'arxiven també els katas de la resta).
