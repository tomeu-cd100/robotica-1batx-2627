# Peces impreses en 3D dels robots

Peces auxiliars per completar el muntatge dels tres robots del curs, pensades
per imprimir-se en una impressora FDM (Bambu Lab). Els fitxers `.scad` es
poden obrir i modificar amb OpenSCAD; no calen fitxers STL al repositori
perquè cada docent els regenera segons calgui.

## Fitxers

| Fitxer | Robot | Quantitat per robot | Material / farciment |
| --- | --- | --- | --- |
| `escaire_caixa.scad` | Mascota | ×8 | PLA, farciment 20 % |
| `difusor_ull.scad` | Mascota | ×2 | PLA blanc, farciment 10 % |
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
