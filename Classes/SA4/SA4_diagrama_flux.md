# SA4 · Diagrama de flux — el braç amb quatre potenciòmetres

> **Per a qui és?** Alumnat. És el **producte de la S4** (`04_brac_potenciometres`), però **dibuixat**: què fa el braç a cada volta del `loop()` per a cadascuna de les quatre articulacions. Mira'l **abans de programar** l'Activitat 4 per tenir el pla al cap; després el codi.

## El flux

![Diagrama de flux de la SA4: engego la placa; al setup faig el write abans de l'attach; llegeixo el potenciòmetre i el passo al rang segur amb map; si el canvi supera la zona morta moc el servo i apunto l'angle, si no, no faig res; i es repeteix per a cada articulació a cada volta](img/sa4-flux.svg)

> **El truc del braç:** el rombe és la **zona morta**. Sense ell, el servo
> obeiria cada petit soroll del potenciòmetre i el braç tremolaria. Amb ell,
> només es mou quan de debò has girat el comandament.

## Llegenda
- Caixa **fosca** = **inici**.
- Caixa **teal** `[ ... ]` = una **acció** (una instrucció o bloc de codi).
- **Rombe ambre** `< ... ? >` = una **decisió** (`if`): en surt una branca per cada cas.
- **Fletxa ambre** = **bucle**: torna enrere i es repeteix.

## Del diagrama al codi
- **setup(): write() abans d'attach()** → per a cada servo, `base.write(angleBase);` i després `base.attach(PIN_SERVO_BASE);`: el braç arrenca on diu el potenciòmetre, sense saltar a 90°.
- **Llegeixo el potenciòmetre i el passo al rang segur** → `llegeixAngle(PIN_POT_BASE, BASE_MIN, BASE_MAX)`, que fa `map(analogRead(pin), 0, 1023, minim, maxim)`.
- **canvi > ZONA_MORTA ?** → `if (abs(nou - actual) > ZONA_MORTA)` dins de `mouSiCal()`.
- **Moc el servo i apunto l'angle** → `actual = nou; servo.write(actual);`.
- **El bucle** es fa **quatre vegades per volta** (una línia de `mouSiCal()` per articulació): una sola funció, quatre crides. Això és l'**abstracció**.
