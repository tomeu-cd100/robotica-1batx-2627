# 08 · Seqüenciació temporal anual

**Base de càlcul:** 2 h/setmana · ≈ 35 setmanes lectives · ≈ **70 h**.
Distribució en **3 trimestres** i **9 situacions d'aprenentatge (SA)**.

## Visió general

| Trim. | Setmanes aprox. | SA | Títol | Hores |
|---|---|---|---|---|
| **1r** | s1-s12 | SA1 | Què és un robot? Sistemes embeguts i mètode de projecte | 6 |
| | | SA2 * | Sortides digitals i PWM: dona vida als actuadors | 8 |
| | | SA3 † | Entrades i sensors: el robot percep | 8 |
| **2n** | s13-s24 | SA4 * | Moviment: servos, motors i ponts H | 8 |
| | | SA5 | micro:bit i MicroPython: un altre paradigma | 6 |
| | | SA6 † | Sistemes de control: llaç obert/tancat i màquines d'estats | 8 |
| **3r** | s25-s35 | SA7 | Robòtica mòbil: cinemàtica i trajectòries | 8 |
| | | SA8 | IoT i IA: el robot connectat i intel·ligent | 6 |
| | | SA9 † | Repte final integrador (opció competició) | 10 |
| | | | **Subtotal SA** | **68 h** |
| | | | **Marge (diagnòstic, avaluació, imprevistos)** | **~2 h** |
| | | | **Total** | **70 h** |

> **\*** SA amb **4a sessió de producte comprimible**: les **8 h (4 sessions)** són el còmput de referència; la S4 és la sessió de producte, però si el calendari real ho exigeix el **repte de la S3 pot fer de producte** i la S4 s'allibera (vegeu el pla de contingència).
>
> **†** SA la **darrera sessió de la qual és, sencera, la prova pràctica trimestral** (T1 a SA3 i T2 a SA6: la S4; T3 a SA9: la S5): el producte es tanca a la sessió anterior i la darrera sessió és la prova **individual**. Cap activitat de sessió no competeix amb la prova (vegeu «Marge i integració de l'avaluació»).
>
> **SA5** compta 6 h (3 sessions); la comparativa C++↔Python de la antiga 4a sessió es fa dins el tancament de la S3 i com a **+ampliació**.

## Marge i integració de l'avaluació

Per garantir la **viabilitat real** del curs (2 h/setmana ≈ 70 h), s'apliquen dos criteris:

1. **Flexibilitat de ritme (marge ~2 h):** les SA marcades amb **\*** (SA2, SA4) tenen la S4 de producte **comprimible** (el repte de la S3 pot fer de producte), i la SA5 queda en 3 sessions. Així hi ha marge per al **diagnòstic inicial** (SA1), festius i imprevistos sense alterar el còmput de referència.
2. **Proves pràctiques amb sessió pròpia dins de la SA (T1 i T2):** les proves (`Avaluació/Prova_practica_T1/T2/T3`) ocupen **una sessió sencera**, comptada **dins de les 8 h** de la SA de tancament del trimestre — no s'hi barreja cap altra activitat:
   - **T1** → la **S4 de SA3 és, sencera, la prova** (individual). El producte de parella de la SA3 es tanca a la **S3** (el repte de la S3 és el producte).
   - **T2** → la **S4 de SA6 és, sencera, la prova** (individual). El producte es tanca a la **S3** i el **control proporcional passa a +ampliació** (ja ho era: el nucli avaluable és la histèresi).
   - **T3** → la **S5 de SA9 és, sencera, la prova** (individual, **per estacions rotatives**: la part de micro:bit es fa a la taula i la part de robot per torns a les pistes disponibles). El projecte es tanca a la **S4** (dossier + defensa oral; amb més de 6 equips, defenses esglaonades des de la S3, ja previstes a la guia). La prova és **independent del projecte**: avalua destreses individuals de SA7-SA8 i puntua només a la dimensió «Proves pràctiques» (20 %); el projecte puntua a «Projectes i productes» — cap evidència no compta dues vegades.

> Vegeu la ponderació a `06_Avaluacio_criteris_qualificacio.md` (dimensió "Proves pràctiques", 20 %). **Per què així:** una prova individual de ~100' i una sessió de producte en parella amb defensa **no caben en la mateixa sessió de 2 h**; fer-ho explícit evita descobrir-ho al desembre. El cost (1 sessió per trimestre) ja està comptat dins les hores de la SA.

## Pla de contingència temporal («curs mínim viable»)

El marge real (~2 h) és **més petit que les pèrdues habituals** d'un curs (festius que cauen en dia de classe, sortides, vagues, avaries): cal preveure **on es retalla** abans que passi, no improvisar-ho al març. Ordre oficial de retallada, **sense trencar la progressió**:

1. **No es retallen mai** SA1–SA3 (fonaments d'E/S: tot el curs s'hi recolza) ni SA9 (síntesi i pes avaluatiu del 3r trimestre).
2. **Primera retallada:** comprimir la **S4 de producte** de SA2 i/o SA4: el **repte de la S3 fa de producte** (s'avalua amb les mateixes rúbriques) i la S4 s'allibera — fins a 2 sessions recuperades. *Atenció:* les S4 de SA3 i SA6 **no es retallen** (són les proves T1/T2); si el calendari les desplaça, la prova es fa a la darrera sessió efectiva de la SA.
3. **Segona retallada:** **SA8 comprimible de 6 h a 4 h** (fusionar S1+S2: telemetria + disseny IoT en una sessió; la S3 d'IA es manté — és el nucli del saber "IA aplicada al control").
4. **Tercera retallada (últim recurs):** SA7 de 8 h a 6 h (sacrificar la S4 de seguidor de línia i quedar-se amb l'evita-obstacles com a comportament autònom).
5. **Es mantenen sempre:** una **prova pràctica per trimestre** (amb la seva sessió, comptada dins la SA) i els **mini-checks individuals** (10', són el radar de l'avaluació).

**Senyal d'alerta per decidir a temps:** si en acabar el **1r trimestre no s'ha tancat la SA3**, activa la retallada 2 ja al gener (no esperis al maig); si a **Setmana Santa no s'ha tancat la SA6**, activa també la 3.

## Fil conductor de robots i ús del marge

El curs aplica el **fil conductor de tres robots** (un robot real per
parella cada trimestre, construït amb la talladora làser i la impressora 3D
de l'aula): vegeu
[`../Classes/00_General/00_Fil_conductor_robots.md`](../Classes/00_General/00_Fil_conductor_robots.md).
Cada sessió de fabricació del fil conductor **consumeix per endavant** una de
les retallades del pla de contingència anterior; cal deixar-ho explícit aquí
perquè no es descobreixi al març.

| Trimestre | Sessió de fabricació | Retallada del pla de contingència que s'hi gasta |
|---|---|---|
| 1r | S4 de SA2 | Primera retallada (S4 de SA2 comprimible: el repte de la S3 fa de producte) |
| 2n | S4 de SA4 | Primera retallada (S4 de SA4 comprimible: el repte de la S3 fa de producte) |
| 3r | Sessió 0 del trimestre | Segona retallada (SA8 comprimible de 6 h a 4 h; les 2 h alliberades es traslladen a l'inici del T3, abans de començar SA7) |

> ⚠️ Amb el fil conductor en marxa, la **primera i la segona retallada** del
> pla de contingència queden **assignades per endavant** a la fabricació dels
> robots, no disponibles com a marge davant d'imprevistos: el marge efectiu
> real és **≈ 0 h**. L'única palanca que queda lliure és la **tercera
> retallada** (SA7 de 8 h a 6 h, últim recurs).
>
> **Senyal d'alerta:** si en acabar el 1r trimestre no s'ha tancat la SA3 (el
> mateix senyal que activa la retallada 2 més amunt), la mascota es reparteix
> a l'alumnat amb les peces **pretallades pel docent**, en lloc d'esperar una
> sessió de tall làser addicional.

## Fil conductor i progressió

```
Trimestre 1 — FONAMENTS
  SA1 ─ Context, mètode, entorns, seguretat, diagnòstic inicial
  SA2 ─ Programació C/C++ + sortides (LED, PWM, so, relé)
  SA3 ─ Programació C/C++ + entrades (polsadors, sensors analògics)
        ▼ (l'alumnat ja controla E/S amb Arduino)
Trimestre 2 — CONTROL I SENSORS
  SA4 ─ Actuadors de moviment (servos, motors DC, pont H)
  SA5 ─ micro:bit + MicroPython (nou paradigma, ràdio, sensors)
  SA6 ─ Sistemes de control (llaç obert/tancat, màquines d'estats)
        ▼ (l'alumnat controla moviment i realimentació)
Trimestre 3 — ROBÒTICA I INTEGRACIÓ
  SA7 ─ Robòtica mòbil (Imagina 3dBot): seguir línia / evitar obstacles
  SA8 ─ IoT/IA: telemetria, dades, introducció a la IA
  SA9 ─ Repte final: projecte autònom + documentació + defensa
```

## Criteris de seqüenciació

1. **Maquinari concret → abstracció:** del component (SA2) al sistema autònom (SA9).
2. **Un llenguatge consolidat abans del segon:** C/C++ (SA2-SA4) abans de Python (SA5), i transferència posterior.
3. **Cada SA reutilitza i amplia l'anterior** (avaluació contínua i espiral).
4. **El projecte final (SA9) integra** electrònica + programació + control + robòtica + documentació.

## Connexions interdisciplinàries

- **Matemàtiques I:** funcions, proporcionalitat (mapatge de senyals), geometria (trajectòries), lògica.
- **Física:** electricitat, mecànica del moviment, sensors.
- **Tecnologia i Enginyeria I:** comparteix sabers; possibilitat de coordinació de projectes.
- **Treball de Recerca:** la SA9 pot llavorar un futur TR.

## Flexibilitat

- Si la matèria acaba sent de **3 h/setmana**, cada SA incorpora les activitats *"+ ampliació"*.
- Si es prioritza **Python-primer**, s'intercanvien SA5↔SA2/SA3 (cal adaptar el maquinari de les primeres setmanes a micro:bit).
