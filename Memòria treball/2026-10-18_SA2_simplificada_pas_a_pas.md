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

## Pendent / a decidir

- Si funciona a l'aula, replicar el model a la SA3 i següents (i decidir si s'arxiven també els katas de la resta).
- La tasca de Classroom no s'ha tocat: els passos ✍️ hi remeten per número d'activitat.
