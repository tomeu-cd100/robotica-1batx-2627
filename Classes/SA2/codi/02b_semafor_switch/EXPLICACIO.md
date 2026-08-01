# Pràctica 2b · El mateix semàfor amb switch (llavor de la SA6)

**Quan es fa:** Sessió 2 (després del semàfor) · **Fitxer:** `02b_semafor_switch.ino` · **Circuit:** el mateix de la [Pràctica 2](../02_semafor/02_semafor.ino) (vermell=8, groc=9, verd=10)

> ✍️ **Kata primer!** Si avui encara no has fet cap kata (ni el mini-check), obre el [kata d'aquesta pràctica](../../SA2_katas.md): 10 minuts per escriure el teu bloc abans de llegir aquest codi. Si ja l'has fet, endavant.

## 🎯 Per què hi ha DUES versions del semàfor

No és una pràctica nova: és **el mateix semàfor, escrit d'una altra manera**. I això és exactament la lliçó — un problema pot tenir més d'una escriptura, i triar-ne una bona té conseqüències.

La versió de la Pràctica 2 llegeix el cicle com una recepta de dalt a baix. Aquesta el reorganitza al voltant d'una idea nova i molt potent: **una variable que diu en quin estat som** (`fase`). Cada fase del semàfor és un `case` separat, net, amb nom. Vols afegir una quarta fase (nocturna)? Un `case` més. Amb la recepta seqüencial, afegir comportaments es va tornant un embolic; amb estats, escala.

Aquesta idea —*estat + salt a l'estat següent*— és la **llavor de les màquines d'estats** amb què programaràs el termòstat i el sistema de control de la **SA6**. La plantes avui amb un semàfor de tres llums.

## 🔮 Abans d'executar: prediu

*Quantes fases té el semàfor? Si n'hi afegim una quarta (nocturna), on aniria?* I la trampa: *què passaria si un `case` no tingués `break`?* Apunta les respostes; l'última la comprovaràs expressament.

## 🧠 El codi, per blocs

### Bloc 1 — La variable d'estat

```cpp
int fase = 0;   // 0=vermell, 1=verd, 2=groc
```

Tot el programa gira al voltant d'aquest número. En cada moment, `fase` diu **on som** del cicle. El comentari que documenta què vol dir cada valor no és decoració: sense ell, `fase = 1` no vol dir res.

### Bloc 2 — `switch`: una porta per a cada estat

```cpp
switch (fase) {
  case 0:  // fase vermell
    digitalWrite(VERMELL, HIGH);
    delay(T_VERMELL);
    digitalWrite(VERMELL, LOW);
    fase = 1;
    break;   // sense break, cauria al case seguent!
  ...
}
```

`switch (fase)` mira el valor i salta directament al `case` que coincideix. Dins de cada `case` hi ha el trio conegut (encén–espera–apaga) **més la transició**: `fase = 1;` prepara el salt a l'estat següent per a la propera volta de `loop()`.

### Bloc 3 — El `break` (l'error clàssic)

Sense `break`, el programa **no surt** del `switch` en acabar el `case`: continua executant el següent (*fall-through*). El semàfor faria vermell **i tot seguit** verd dins la mateixa volta. Prova-ho un cop expressament — treu un `break`, mira què passa i torna'l a posar. És dels errors que, un cop vist, ja no oblides (i a la fitxa et demanem justament això).

## ⚠️ Errors que veuràs segur

| Símptoma | Causa probable |
|---|---|
| Dues fases seguides "de cop" | Falta un `break` en un `case`. |
| El semàfor es queda clavat en un color | La transició (`fase = ...`) d'aquell `case` no hi és o apunta malament. |
| No entra mai en una fase | `fase` no pren mai aquell valor: repassa les transicions. |

## 🔗 On ho aplicaràs

- **Repte:** afegeix el `case 3` (fase nocturna: groc intermitent) i fes que s'hi entri i se'n surti.
- **SA6:** màquines d'estats de debò (termòstat amb histèresi, sistema de control): la mateixa estructura, amb sensors decidint les transicions en lloc del pas del temps.

> ⭐ **Has acabat abans?** Tria un repte a **[Reptes de la SA2](../../../../Reptes/Reptes_SA2.md)** i, quan el docent te'l validi, pinta l'estrella al [tauler de reptes](../../../00_General/00_Tauler_reptes.md).
