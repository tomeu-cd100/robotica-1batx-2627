/*
  SA1 - 02_senyal_estat_BASTIDA.ino  (BASTIDA / esquelet per a l'alumnat)

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
