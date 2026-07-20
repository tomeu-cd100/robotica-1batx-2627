# Solució del repte: parpelleig amb variables

**Quan es fa:** Sessió 3 (repte) · **Fitxer:** `blink_repte.ino` · **Circuit:** [esquema de connexions](../../SA1_esquemes_connexions.md) (el mateix del [Blink](../blink/EXPLICACIO.md))

> ✋ **Aquesta pàgina és la SOLUCIÓ del repte de l'Activitat 4** (*3 parpellejos ràpids + una pausa llarga, repetint-se*). **Intenta-ho pel teu compte abans de mirar-la**: el repte és teu, no del full. Si t'encalles, tens un cop de mà a la secció «Si t'encalles» de més avall — que és una escala, no la resposta.

## 🎯 Per què fem aquesta pràctica

Al `Blink` vas **llegir i modificar** codi d'altri; aquí és la fase **Crea** del PRIMM: escriure el teu primer sketch **des de zero**. El patró demanat (ràpid-ràpid-ràpid… pausa) et fa descobrir dues eines noves que ja no deixaràs anar: **posar nom als temps** (constants) i **repetir sense copiar i enganxar** (el bucle `for`).

## 🔮 Abans d'executar: prediu

Mira el codi complet (a baix, plegat) **sense carregar-lo**. Amb `T_RAPID = 150` i `T_PAUSA = 1000`: quant dura un parpelleig sencer (encès + apagat)? I tot el cicle? Què canviaria si poses `i < 5` al `for`? Apunta-ho i comprova-ho.

## 🧠 El codi, per blocs

### Bloc 1 — Els temps, amb nom

```cpp
const int LED = 13;
const int T_RAPID = 150;    // durada del parpelleig rapid (ms)
const int T_PAUSA = 1000;   // durada de la pausa llarga (ms)
```

En lloc de números solts escampats pel `loop()`, cada temps té un **nom que explica què és**. Vols el parpelleig més nerviós? Canvies `T_RAPID` en **una sola línia** i tot el programa obeeix.

### Bloc 2 — El bucle `for`: repetir sense copiar

```cpp
// 3 parpellejos rapids amb un bucle for
for (int i = 0; i < 3; i++) {
  digitalWrite(LED, HIGH);
  delay(T_RAPID);
  digitalWrite(LED, LOW);
  delay(T_RAPID);
}
```

Podries copiar el bloc encén-espera-apaga-espera **tres vegades**… però el `for` ho fa per tu. Llegeix la primera línia per parts:

- `int i = 0` — crea un **comptador** que comença a 0.
- `i < 3` — la **condició per continuar**: mentre sigui certa, es repeteix el bloc de dins.
- `i++` — després de cada volta, el comptador **puja 1** (0 → 1 → 2 → i a 3 s'atura).

Resultat: el bloc de dins s'executa exactament **3 vegades**. Vols 5 parpellejos? Canvies un sol número. Aquesta és la gràcia: el codi diu *què vols* (3 repeticions), no ho repeteix a mà.

### Bloc 3 — La pausa llarga

```cpp
// Pausa llarga abans de tornar a comencar
delay(T_PAUSA);
```

Fora del `for`, la pausa només passa **un cop per cicle**. I qui repeteix el cicle sencer? Ningú del teu codi: **el `loop()` ja torna a començar tot sol**. No cal cap bucle «gran» al voltant.

## ⚠️ Errors que veuràs segur

| Símptoma | Causa probable |
|---|---|
| Fa 4 parpellejos en lloc de 3 | Has escrit `i <= 3` en lloc de `i < 3` (amb `<=` hi ha les voltes 0, 1, 2 **i 3**). |
| L'últim parpelleig «es menja» la pausa | Falta el `delay(T_RAPID)` de després del `LOW` dins del `for`: el LED s'apaga i la pausa comença sense separació. |
| No es nota la diferència ràpid/pausa | `T_RAPID` i `T_PAUSA` massa semblants: separa'ls (p. ex. 150 i 1000). |
| Canvio el codi i no passa res | No l'has tornat a **pujar** a la placa: cada canvi necessita un altre *Upload*. |

## 🧗 Si t'encalles: l'esquelet del senyal d'estat

Si estàs en blanc davant del sketch buit, no miris encara la solució: parteix d'aquest esquelet. L'estructura `setup()`/`loop()` i el `pinMode()` ja hi són; tu només omples els `// TODO:` amb `digitalWrite` i `delay`. Primer fes que el LED doni un «senyal de vida» senzill (encén-espera-apaga-espera); quan et funcioni, transforma'l en el patró del repte.

<details markdown="1">
<summary>Desplega l'esquelet (còpia'l a un sketch nou)</summary>

```cpp
/*
  SA1 - senyal d'estat  (BASTIDA / esquelet per a l'alumnat)

  QUE JA ESTA FET (no ho toquis):
    - L'estructura setup() / loop() ja esta muntada.
    - La constant del pin del LED ja esta declarada.
    - El pinMode() del LED ja esta configurat dins de setup().

  QUE HAS DE FER TU:
    - OMPLE el patro del "senyal d'estat" DINS del loop(), als // TODO:.
      El teu robot ha de donar un "senyal de vida" amb el LED: encendre'l,
      esperar un temps, apagar-lo, esperar un altre temps... i tornar a
      comencar (aixo ho fa sol el loop).

  EINES QUE POTS USAR (nomes conceptes de la SA1):
    - digitalWrite(LED, HIGH);  -> encen el LED (5 V)
    - digitalWrite(LED, LOW);   -> apaga el LED (0 V)
    - delay(ms);                -> espera "ms" mil.lisegons (1000 ms = 1 s)

  IDEA: canviant nomes els temps del delay() canvies tot el comportament.
    Un batec de cor: ences poc (100 ms) i apagat molt (2000 ms).
    Un parpelleig nervios: temps curts i iguals (200 ms i 200 ms).

  Maquinari: LED intern de la placa (pin 13). No cal cablejar res.
  Repte: quan funcioni, prova de fer un patro amb DOS temps diferents.
*/

const int LED = 13;   // Numero de pin on hi ha el LED (constant: no canvia)

void setup() {
  // setup() s'executa UNA sola vegada en encendre o reiniciar la placa.
  pinMode(LED, OUTPUT);   // Configurem el pin del LED com a SORTIDA. JA FET.
}

void loop() {
  // loop() es repeteix indefinidament: aixo fa que el senyal no s'aturi mai.

  // TODO 1: encen el LED  ->  digitalWrite(LED, HIGH);

  // TODO 2: espera un temps amb el LED ences  ->  delay( ... );

  // TODO 3: apaga el LED  ->  digitalWrite(LED, LOW);

  // TODO 4: espera un altre temps amb el LED apagat  ->  delay( ... );

  // (En arribar aqui, el loop torna a comencar sol i el senyal es repeteix.)
}
```

</details>

## 🔗 On ho aplicaràs

- **Si vas sobrat:** les ampliacions [`blink_millis`](../blink_millis/EXPLICACIO.md) (el mateix parpelleig **sense** `delay()`) i [`sos_morse`](../sos_morse/EXPLICACIO.md) (el patró ràpid/llarg convertit en **funcions**: punt i ratlla).
- **SA2 i tot el curs:** el `for` i les constants de temps tornen a sortir a cada sketch una mica llarg (el *fade* PWM de la SA2 és, de fet, un `for` que puja i baixa).
