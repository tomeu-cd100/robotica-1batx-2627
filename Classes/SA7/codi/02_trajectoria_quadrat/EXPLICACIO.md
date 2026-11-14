# Pràctica 2 · Trajectòria en quadrat: calibrar el gir de 90°

<div class="cap-practica" markdown="1">

❓ **La pregunta:** Com fa un robot per girar exactament 90°?

🎯 **Avui aconseguiràs:** que el rover dibuixi un quadrat a terra, calibrant tu mateix el temps de gir, i veure per què el control per temps no és mai perfecte.

⏱️ La sessió

📦 El teu rover, un metre o regle, cinta adhesiva per marcar el punt de sortida i una calculadora

</div>

## 🚀 Pas a pas

### Pas 1 · Calcula abans de provar

Mesura la roda i fes el càlcul del gir **teòric**:

- Diàmetre de la roda D → perímetre = π·D (cm per volta).
- Fes anar el rover endavant 1 m i cronometra'l → velocitat = 100 / temps (cm/s).
- Per girar 90° sobre si mateix, cada roda fa un arc de (π·L)/4, on L és la distància entre rodes → temps de gir = arc / velocitat.

✍️ **Apunta-ho:** el temps teòric de gir de 90° i els teus càlculs (D, velocitat i L).

### Pas 2 · Endevina abans de provar

Desplega el codi complet del pas 3 i mira on és el `for` dels quatre costats: al `setup()` o al `loop()`?

✍️ **Apunta-ho:** PREDIU: el rover farà el quadrat una vegada o sense parar? I si `T_GIR_90` és massa gran, el quadrat sortirà obert o creuat?

### Pas 3 · Carrega el codi

Prem **Copia** i enganxa'l a l'Arduino IDE. Canvia el bloc de pins i `motors()` pel **bloc del rover** de la [Pràctica 1](../01_moviment_basic/EXPLICACIO.md) (pas 4) i prem **→ Puja**.

<!-- codi-complet -->

✅ **Comprova:** marca el punt de sortida amb cinta, posa-hi el rover i prem **RESET**: en 1 s arrenca, fa quatre costats i s'atura.

### Pas 4 · Calibra el gir

Si el gir passa de 90°, abaixa `T_GIR_90`; si no hi arriba, apuja'l. Puja i torna a provar. Apunta cada intent: aquest registre és la pràctica.

✍️ **Apunta-ho:** el gir de 90° calibrat (ms) i la diferència amb el teòric. A què creus que es deu?

### Pas 5 · Mesura l'error

Amb el gir ja calibrat, fes una volta sencera i mesura la distància entre el punt de sortida i on s'atura.

✅ **Comprova:** el quadrat es tanca **gairebé**, però mai del tot.

✍️ **Apunta-ho:** quant s'allunya del punt inicial després d'una volta? Per què?

✍️ **Apunta-ho:** per què el control per temps és senzill però poc fiable?

### Pas 6 · Respon i envia

📤 [Obre la tasca «SA7 · Pràctica 2» a Classroom i envia el formulari](https://classroom.google.com/c/ODY4ODU4Njk0NTEy/a/ODk5NDU4ODA1NDAw/details)

📷 [Penja la foto de la teva pràctica a la tasca «Foto · SA7 · Pràctica 2»](https://classroom.google.com/c/ODY4ODU4Njk0NTEy/a/ODk5NDU4NTQxNTky/details)

Hi trobaràs les mateixes preguntes ✍️ que has anat apuntant. Envia'l ara. A la sessió següent: **[Pràctica 3 · Evita-obstacles](../03_evita_obstacles/EXPLICACIO.md)**.

⭐ **Si acabes abans:** fes un **triangle** o una **«L»** (el mateix `for` amb un altre nombre de costats i un altre angle). I si vas fort, que el rover torni al punt de sortida. Al formulari hi ha una pregunta opcional per explicar-ho. Més reptes a **[Reptes de la SA7](../../../../Reptes/Reptes_SA7.md)**; quan el docent te'l validi, pinta l'estrella al [tauler de reptes](../../../00_General/00_Tauler_reptes.md).

<details markdown="1">
<summary>🧗 Si t'encalles</summary>

| Símptoma | Causa probable |
|---|---|
| Gira més o menys de 90° | `T_GIR_90` sense calibrar. I compte: el valor bo d'avui **canvia** amb la bateria i la superfície. |
| Els costats no són rectes | Motors desiguals (l'error de la P1): compensa velocitats abans de calibrar girs. |
| El quadrat no tanca | Els errors petits de cada gir i cada costat **s'acumulen**. És el límit del control per temps, no un error teu. |
| El robot no fa res en connectar-lo | Espera 1 s (el `delay(1000)`). Si no arrenca mai, revisa el bloc de pins i la bateria. |

</details>

<details markdown="1">
<summary>🧠 Vols saber per què funciona?</summary>

### Per què fem aquesta pràctica

Una trajectòria és una **seqüència de moviments amb els seus temps**. El rover no té cap sensor d'angle: gira **mentre tu li diguis**, i prou. Per això el temps de gir s'ha de **calibrar**. Quan comparis el temps teòric amb el calibrat, la diferència (fregament, bateria, inèrcia) t'explicarà per què a la Pràctica 3 passarem als **sensors**.

### Bloc 1 — Els dos temps que ho decideixen tot

```cpp
const int T_RECTE  = 1200;  // ms per avancar un costat (ajustar)
const int T_GIR_90 = 600;   // ms per girar 90 graus (CALIBRAR!)
```

`T_RECTE` fa el **costat** més llarg o més curt; `T_GIR_90` fa l'**angle** del gir.

### Bloc 2 — El quadrat: un `for` de 4 costats

```cpp
  for (int costat = 0; costat < 4; costat++) {
    endavant();    delay(T_RECTE);
    atura();       delay(300);
    gira_dreta();  delay(T_GIR_90);
    atura();       delay(300);
  }
```

Un quadrat són **4 vegades el mateix**. Els `atura(); delay(300);` intercalats eviten que la inèrcia arrossegui part del moviment anterior cap al gir.

### Bloc 3 — Per què és al `setup()`

Si el recorregut fos al `loop()`, el robot faria quadrats **sense parar**. Al `setup()` s'executa **un sol cop**. Per repetir la prova: botó **RESET**.

### On ho aplicaràs

- **Pràctica 3:** com que el control per temps acumula error, l'[evita-obstacles](../03_evita_obstacles/EXPLICACIO.md) es guiarà per un **sensor** (llaç tancat, la idea de la SA6).
- **Robot del trimestre:** qualsevol coreografia del teu **rover** és una trajectòria com aquesta.

</details>
