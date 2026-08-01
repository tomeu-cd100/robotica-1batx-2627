# Pràctica 4 · Seguidor de línia: dos sensors IR i correcció

**Quan es fa:** Sessió 4 (modelatge i repte de pista) · **Fitxer:** `04_seguidor_linia.ino` · **Circuit:** [esquema de connexions](../../SA7_esquemes_connexions.md) (sensors IR sota el robot, mirant a terra)

> ✍️ **Kata primer!** No llegeixis encara el codi: el docent projecta el kata d'aquesta pràctica i tens **10 minuts** per escriure el teu bloc (apunts permesos). Després torna aquí i **compara**.

## 🎯 Per què fem aquesta pràctica

Als magatzems de logística hi ha robots (AGV) que es passen el dia seguint línies pintades a terra. Avui el teu rover fa el mateix: dos sensors **IR** sota el xassís miren el terra i distingeixen la línia negra (poc reflex) del fons clar (molt reflex). La lògica és de sentit comú: si **només un** sensor veu la línia, és que el robot s'ha desviat cap a l'altre costat → **corregeix** cap a la línia.

És el mateix cicle percepció → decisió → acció de la Pràctica 3, amb un matís nou: aquí l'acció no és una maniobra sencera, sinó una **correcció contínua** — el robot es manté sobre la línia a base de petites frenades d'una roda. I el final de la sessió és el **repte de pista**: completar el recorregut, **cronometrar cada volta** i iterar per millorar el temps. El registre d'iteracions és part del producte.

## 🔮 Abans d'executar: prediu

Sense carregar el codi: què farà el robot si **només** el sensor esquerre veu la línia? I si **cap** dels dos no la veu (s'ha sortit de la pista o és en un encreuament)? Anirà fi i recte, o farà ziga-zaga? Apunta-ho i comprova-ho a la pista.

## 🧠 El codi, per blocs

### Bloc 1 — Llegir la línia: de reflex a `bool`

```cpp
// Suposem lectura DIGITAL: LOW = linia negra detectada, HIGH = fons.
// (Comprova-ho amb la teva placa; si cal, inverteix la logica.)

  bool liniaEsq  = (digitalRead(S_ESQ) == LOW);
  bool liniaDret = (digitalRead(S_DRET) == LOW);
```

Cada sensor es tradueix a una pregunta de sí/no: *aquest costat veu la línia?* Compte amb el comentari: en **aquesta** placa suposem que línia = `LOW`, però hi ha mòduls que ho donen al revés, i d'altres que donen lectura **analògica** (llavors: `analogRead` + un llindar calibrat, com el llindar de la P3). El primer que has de fer a la pista és **comprovar-ho**: sensor sobre la línia, sensor sobre el fons, i mira què llegeix.

### Bloc 2 — Corregir = frenar una roda

```cpp
void endavant()      { motors(HIGH, VEL, HIGH, VEL); }
void corregeix_dreta(){ motors(HIGH, VEL, HIGH, 0); }   // frena roda dreta
void corregeix_esq()  { motors(HIGH, 0,  HIGH, VEL); }  // frena roda esquerra
```

Cinemàtica diferencial un altre cop, però en versió suau: per girar cap a la línia no cal posar una roda enrere (com el pivot de la P1) — n'hi ha prou de **frenar-ne una** (velocitat 0) i deixar que l'altra empenyi. El robot descriu una corba cap al costat frenat. Fixa't també que `VEL` aquí és 150, no 180: seguir línia demana més finesa que velocitat.

### Bloc 3 — La decisió: quatre situacions, quatre respostes

```cpp
  if (liniaEsq && liniaDret) {
    endavant();                 // tots dos sobre la linia: recte
  } else if (liniaEsq && !liniaDret) {
    corregeix_esq();            // s'ha desviat: torna a l'esquerra
  } else if (!liniaEsq && liniaDret) {
    corregeix_dreta();
  } else {
    endavant();                 // cap sensor: continua (o busca la linia)
  }
  delay(10);
```

Dos sensors amb dos valors cadascun = **4 combinacions**, i la cadena `if / else if / else` les cobreix totes: tots dos a la línia → recte; només un → corregeix cap a aquell costat; cap → aquí hi ha una **decisió de disseny**: aquest codi continua recte (aposta que la línia reapareixerà — funciona en encreuaments), però podries fer que busqués la línia o s'aturés. El `delay(10)` és encara més curt que a la P3: com més sovint mira, més fina és la correcció.

## ⚠️ Errors que veuràs segur

| Símptoma | Causa probable |
|---|---|
| No detecta mai la línia | Llindar o alçada mal ajustats: els IR volen estar a pocs mil·límetres del terra. Calibra amb la pista real (la llum de l'aula hi influeix!). |
| Fa just el contrari: fuig de la línia | Lògica invertida — el teu sensor dona `HIGH` sobre la línia. Inverteix les comparacions del Bloc 1. |
| Fa molta ziga-zaga | En part és normal: la correcció és **tot o res** (recte o frenada seca). Per suavitzar-ho: abaixa `VEL`… o el «+ repte» de correcció proporcional. |
| Perd la línia a les corbes tancades | Va massa ràpid per a la corba: abaixa `VEL` o fes la correcció més agressiva (roda frenada una mica enrere). |

## 🔗 On ho aplicaràs

- **Repte de pista (avui):** completar el recorregut autònom, **mesurar el temps de volta** i iterar — cada millora, apuntada a l'Activitat 4 de la [fitxa](../../SA7_fitxa_alumnat.md).
- **+ Repte:** correcció **proporcional** (correcció = Kp·error): com més desviat, més gir; a prop del centre, correcció suau. És la resposta de veritat a la ziga-zaga (idea de la SA6).
- **D'on ve:** el cicle reactiu el vas muntar a l'[evita-obstacles](../03_evita_obstacles/03_evita_obstacles.ino); aquí només canvia el sensor i la finor de l'acció.
- **Robot del trimestre:** el seguidor de línia és un dels comportaments de demostració del teu **rover** ([dossier](../../../00_General/00_Projecte_T3_Rover.md)).

> ⭐ **Has acabat abans?** Tria un repte a **[Reptes de la SA7](../../../../Reptes/Reptes_SA7.md)** i, quan el docent te'l validi, pinta l'estrella al [tauler de reptes](../../../00_General/00_Tauler_reptes.md).
