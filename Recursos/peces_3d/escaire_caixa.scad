// Escaire d'unio per a caixa de DM de 3 mm (mascota). Imprimir x8 per robot.
gruix_dm = 3;
costat = 15;
ample = 12;
paret = 3;
difference() {
    union() {
        cube([costat, paret, ample]);
        cube([paret, costat, ample]);
    }
    translate([5, -1, ample / 2])
        rotate([-90, 0, 0]) cylinder(h = paret + 2, d = 3.4, $fn = 24);
    translate([-1, 5, ample / 2])
        rotate([0, 90, 0]) cylinder(h = paret + 2, d = 3.4, $fn = 24);
}
