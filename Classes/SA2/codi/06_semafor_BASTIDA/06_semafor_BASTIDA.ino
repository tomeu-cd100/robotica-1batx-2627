/*
  SA2 - 06_semafor_BASTIDA.ino  (BASTIDA / esquelet per a l'alumnat)

  L'estructura dificil ja esta muntada: les constants de pins i el setup()
  amb els pinMode(). Tu nomes has d'OMPLIR els // TODO: de dins del loop()
  per fer funcionar el semafor i, al final, un GROC que "respira" amb PWM.

  Recorda:
   - digitalWrite(pin, HIGH/LOW) encen o apaga del tot (sortida digital).
   - analogWrite(pin, 0..255) gradua la INTENSITAT, pero nomes en pins ~ (PWM).
   - delay(ms) fa una pausa en mil.lisegons.

  Munta: LED vermell al pin 8, groc al pin 9 (~PWM), verd al pin 10,
  cada un amb la seva resistencia de 220 ohm cap a GND.

  Aixo compila tal qual (els // TODO: son comentaris). No fa res visible
  fins que omplis les fases.
  Quan: S2 - bastida del semafor
*/

const int VERMELL = 8;
const int GROC    = 9;   // ha de ser un pin PWM (~) per fer el fade del final
const int VERD    = 10;

const int T_VERMELL = 4000;  // ms que dura el vermell
const int T_VERD    = 4000;  // ms que dura el verd
const int T_GROC    = 1500;  // ms que dura el groc

const int PAS_FADE  = 5;     // com mes gran, mes rapid el fade del groc
const int ESPERA    = 12;    // ms entre passos del fade

void setup() {
  // Les tres sortides ja estan configurades. No cal tocar res aqui.
  pinMode(VERMELL, OUTPUT);
  pinMode(GROC, OUTPUT);
  pinMode(VERD, OUTPUT);
}

void loop() {
  // FASE 1: VERMELL
  // TODO: encen el LED vermell (digitalWrite ... HIGH)
  // TODO: espera T_VERMELL mil.lisegons (delay)
  // TODO: apaga el LED vermell (digitalWrite ... LOW)

  // FASE 2: VERD
  // TODO: encen el verd, espera T_VERD i apaga'l (com la fase 1)

  // FASE 3: GROC
  // TODO: encen el groc, espera T_GROC i apaga'l

  // FASE EXTRA (PWM): el groc "respira" abans de tornar a comencar.
  // Puja la intensitat del groc de 0 a 255 amb un for i analogWrite.
  for (int valor = 0; valor <= 255; valor += PAS_FADE) {
    // TODO: aplica la intensitat 'valor' al groc amb analogWrite(...)
    delay(ESPERA);
  }
  // TODO: fes un altre for que BAIXI la intensitat de 255 a 0
  //       (canvia el <= per >= i el += per -=)
}
