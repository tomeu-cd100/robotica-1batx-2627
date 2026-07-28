# Spec · Seccions «Projecte trimestral» al web (2026-07-28)

**Problema detectat:** en acabar la SA3, l'itinerari del web s'atura i l'alumnat no
troba el dossier de la mascota (`Classes/00_General/00_Projecte_T1_Mascota.md`),
penjat a la secció «Material transversal». Els tres dossiers de robot (mascota,
braç, rover) queden fora del flux de navegació.

## Decisions preses (amb el docent)

1. **Secció pròpia entre SA** al hub i sidebar per a cada projecte trimestral
   (no una pàgina dins de SA3 ni només enllaços de sortida).
2. **Posició cronològica**, no uniforme al tancament:
   - 🐣 Projecte T1 · Mascota — **després de SA3** (es munta a final de T1).
   - 🦾 Projecte T2 · Braç — **després de SA6** (es munta a final de T2).
   - 🚙 Projecte T3 · Rover — **entre el Projecte T2 i SA7**: es construeix a la
     sessió 0 del 3r trimestre i SA7 el necessita muntat
     (`00_Projecte_T3_Rover.md:141`, `08_Sequenciacio_temporal_anual.md`).
3. **Contingut**: portada índex nova + dossier existent. Cap fitxer es mou de
   carpeta.

## Estructura resultant de l'itinerari

```
SA1 → SA2 → SA3 → 🐣 Projecte T1 · Mascota
    → SA4 → SA5 → SA6 → 🦾 Projecte T2 · Braç → 🚙 Projecte T3 · Rover
    → SA7 → SA8 → SA9
```

## Contingut de cada secció

1. **Portada índex** (nova): `Classes/00_General/00_Projecte_T{n}_portada.md`.
   Punt de recollida amb totes les referències:
   - enllaç al dossier del robot;
   - reptes de cada SA que hi sumen (T1: SA2/SA3 · T2: SA4–SA6 · T3: SA7–SA9);
   - plantilles de tall làser i impressió 3D;
   - rúbrica i calendari de fabricació;
   - enllaç al fil conductor i al banc d'objectes.
   La portada del T3 explicita: «aquest robot es construeix ARA, abans de
   començar SA7».
2. **Dossier existent** (`00_Projecte_T{n}_*.md`) com a segona pàgina de la
   secció. Surt del llistat de «Material transversal»; el fitxer no es mou.

`00_Fil_conductor_robots.md` i `00_Banc_objectes_disseny.md` es queden a
transversal, enllaçats des de les tres portades.

## Implementació al generador (`web/_generador/generar.py`)

- Grups «projecte» dins la secció Classes amb ordre explícit
  (SA3 → PT1 → SA4 … SA6 → PT2 → PT3 → SA7 …).
- Portada índex com a pàgina d'entrada de cada grup; dossier com a segona pàgina.
- Excloure els fitxers de projecte (3 portades + 3 dossiers) del llistat
  transversal.
- Paginador d'itinerari i stepper: s'estén l'ordre de grups, no es reescriu.
  L'última pàgina de SA3 acaba amb «Següent: 🐣 Projecte T1 · La mascota».
- **Redireccions**: els dossiers canvien d'URL (de `material-transversal/…` a la
  secció nova). Mantenir la URL antiga com a HTML de redirecció simple per no
  trencar enllaços ja publicats (Classroom).

## QA (`tools/qa.py`)

- Cap contracte de cobertura SA afectat (no són SA).
- Comprovació nova lleugera: les 3 portades existeixen i enllacen el seu dossier.

## Fora d'abast

- Cap canvi a `Programació didàctica/` ni al material del Classroom.
- Cap canvi als PDFs ni al quadern tècnic.
