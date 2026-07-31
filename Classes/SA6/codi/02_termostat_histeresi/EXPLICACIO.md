# Pràctica 2 · Termòstat amb histèresi: dos llindars contra el clic-clic

**Quan es fa:** Sessió 2 (modelatge) · **Fitxer:** `02_termostat_histeresi.ino` · **Circuit:** [esquema de connexions](../../SA6_esquemes_connexions.md) (NTC o potenciòmetre a A0, sortida a 9~)

## 🎯 Per què fem aquesta pràctica

A la Pràctica 1 vas veure el defecte del llaç tancat més simple: amb **un sol llindar**, quan la mesura balla just al voltant de la consigna, la sortida s'engega i s'apaga moltes vegades per segon — el "clic-clic". A casa ho patiria la **caldera**: si engegués a 21,0 °C i apagués a 21,0 °C, estaria commutant sense parar (i un relé o un compressor que fa això, es crema).

La solució té nom: **histèresi**. En lloc d'un llindar, **dos**: engega a un valor **alt** i no apaga fins a un valor **baix**. Entre els dos hi queda una **zona morta** on el sistema **manté el que feia** — una petita *memòria* que mata l'oscil·lació. Per això la teva caldera engega a 20,5 i apaga a 21,5: la histèresi és a totes les cases, i avui la programes tu. És el **nucli de la SA** (i de la prova T2).

## 🔮 Abans d'executar: prediu

Els llindars són 600 (engega) i 500 (apaga). Si la lectura val **550**… la sortida està encesa o apagada? *(Pista: la pregunta està mal feta — falta saber **d'on venia**.)* I què passaria si els dos llindars valguessin 550? Apunta-ho a l'Activitat 2 de la [fitxa](../../SA6_fitxa_alumnat.md) i comprova-ho.

## 🧠 El codi, per blocs

### Bloc 1 — Dos llindars amb nom

```cpp
const int LLINDAR_ALT  = 600;  // encen el ventilador (massa calor)
const int LLINDAR_BAIX = 500;  // apaga (ja s'ha refredat)
```

La histèresi **viu en la distància** entre aquests dos números: de 500 a 600 hi ha la zona morta. Acosta'ls i el sistema commutarà més sovint; allunya'ls i la "temperatura" oscil·larà més amunt i avall. Ajustar aquesta finestra és el repte de la sessió — i com que són constants amb nom (SA2!), es fa tocant dues línies.

### Bloc 2 — La memòria del sistema

```cpp
bool actiu = false;
```

Un sol `bool`, però és la peça clau: recorda **què estava fent** la sortida. Sense aquesta memòria, la zona morta no pot existir — no pots "mantenir el que feies" si no recordes què feies.

### Bloc 3 — Les dues condicions de la histèresi

```cpp
if (!actiu && t > LLINDAR_ALT) {
  actiu = true;               // s'ha escalfat: engega
} else if (actiu && t < LLINDAR_BAIX) {
  actiu = false;              // s'ha refredat: atura
}
```

Llegeix-les a poc a poc, perquè cada condició té **dues parts**:

- *Si estic **aturat** i la lectura **supera** el llindar alt* → engego.
- *Si estic **en marxa** i la lectura **baixa** del llindar baix* → aturo.

I la pregunta trampa: què passa si la lectura és **entre 500 i 600**? **Cap** de les dues condicions es compleix, `actiu` no canvia… i el sistema manté l'estat. La zona morta no és un `else`: és l'absència de canvi. Aquesta és tota la màgia de la histèresi.

### Bloc 4 — Aplicar l'estat i ensenyar-lo

```cpp
digitalWrite(SORTIDA, actiu ? HIGH : LOW);

Serial.print(t);
Serial.print("  actiu=");
Serial.println(actiu);
delay(100);
```

`actiu ? HIGH : LOW` és una manera compacta d'escriure "si `actiu` és cert, `HIGH`; si no, `LOW`". I les línies de `Serial` són el teu laboratori: obre el **Serial Plotter** i veuràs la lectura pujar i baixar **rebotant entre els dos llindars** sense vibrar. Si hi hagués un sol llindar, veuries la sortida "serrada" al seu voltant.

## ⚠️ Errors que veuràs segur

| Símptoma | Causa probable |
|---|---|
| Continua fent "clic-clic" | Els dos llindars són iguals o massa junts: la zona morta és més petita que el tremolor de la lectura. Separa'ls. |
| La sortida no s'encén (o no s'apaga) mai | Llindars girats: `LLINDAR_BAIX` ha de ser **sempre menor** que `LLINDAR_ALT`. |
| La lectura balla molt | Soroll del sensor: fes la **mitjana** de diverses lectures (targeta de rescat T6.3). |

## 🔗 On ho aplicaràs

- **Repte de la S2:** ajustar la finestra d'histèresi i descriure l'efecte; **+ repte:** indicador d'estat verd/vermell (amb pista no cromàtica!).
- **Producte i prova T2:** el termòstat amb histèresi ben documentat és la **versió nucli** del producte i la Part A de la prova.
- **Exemple resolt:** el [dipòsit que es reomple sol](../../SA6_exemple_resolt.md) és el **bessó** d'aquesta pràctica, comentat pas a pas: la mateixa histèresi… amb la lògica **girada** (engega quan el sensor **baixa**). Entendre-la és saber-la girar — mira-te'l després del teu primer intent.
- **Pràctica 3:** quan el sistema tingui més de dues situacions (no només encès/apagat), el `bool` es quedarà curt: caldrà una [màquina d'estats](../03_maquina_estats/EXPLICACIO.md).

> ⭐ **Has acabat abans?** Tria un repte a **[Reptes de la SA6](../../../../Reptes/Reptes_SA6.md)** i, quan el docent te'l validi, pinta l'estrella al [tauler de reptes](../../../00_General/00_Tauler_reptes.md).
