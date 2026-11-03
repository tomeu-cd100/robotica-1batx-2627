# Peces impreses en 3D dels robots

Peces auxiliars per completar el muntatge dels tres robots del curs, pensades
per imprimir-se en una impressora FDM (Bambu Lab). Els fitxers `.scad` es
poden obrir i modificar amb OpenSCAD; no calen fitxers STL al repositori
perquè cada docent els regenera segons calgui.

## Fitxers

| Fitxer | Robot | Quantitat per robot | Material / farciment |
| --- | --- | --- | --- |
| `tamagotchi_ou.scad` | Tamagotchi (T1) | closca + tapa (`MODE="closca"` i `"tapa"`) | PLA, farciment 15 %, de cara avall, sense suports |
| `suport_hcsr04.scad` | Rover | ×1 | PLA, farciment 20 % |
| `roda_boja.scad` | Rover | ×1 | PLA, farciment 20 % |
| `dit_pinca.scad` | Braç | ×2 | PLA, farciment 20 % |

## Com renderitzar-les

1. Obre el fitxer `.scad` amb **OpenSCAD**.
2. Renderitza (F6) i fes `Export STL`.
3. Importa l'STL a **Bambu Studio**, amb PLA i una alçada de capa de
   0,2 mm.
4. Cap peça necessita suports, **excepte `roda_boja.scad`**, que en requereix
   per a la cavitat esfèrica del llit de la canica.

## Nota sobre la roda boja

`roda_boja.scad` està dimensionada per allotjar una **canica de 16 mm** de
diàmetre: aquesta fa de roda boja de suport al davant o al darrere del
xassís del rover, sense necessitat de motor ni eix.

## Tamagotchi del T1 (`tamagotchi_ou.scad`)

Carcassa en forma d'ou per al robot del 1r trimestre: hi caben l'Arduino UNO i
mitja protoboard drets, l'OLED de 0,96", 3 polsadors, el sensor de llum, el
micròfon, el PIR i el LED RGB. Un sol fitxer paramètric fa les dues versions:

- **Impresa en 3D:** `MODE="closca"` (la closca, de cara avall) i `MODE="tapa"`
  (la tapa del darrere, 4 cargols M3 autoroscants). Temps orientatiu: closca
  **6-8 h** i tapa **~1 h** (PLA, capa 0,2 mm, 2 perímetres, farciment 15 %).
- **Tallada al làser:** `MODE="laser"` genera
  `Recursos/plantilles_laser/tamagotchi_ou_laser.svg` (placa del davant i del
  darrere en DM de 3 mm, unides amb **4 separadors M3** de 72 mm).

**Abans de fabricar, mesura el mòdul OLED que tens** i ajusta `OLED_FINESTRA_X/Y`,
`OLED_FORATS_X/Y` i `OLED_DESP_FINESTRA` (no tots els mòduls de 0,96" són iguals).
Si fas servir polsadors de 6 mm amb caputxó en lloc de 12 mm, canvia `D_BOTO`.
Les peces de la mascota antiga (caixa, difusors d'ull i escaires) són a
`docs/arxiu/mascota_T1/`.
