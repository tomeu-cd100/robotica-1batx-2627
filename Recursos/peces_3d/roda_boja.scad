// Roda boja per a canica de 16 mm. Dos forats M3 cap al pis inferior.
difference() {
    cube([14, 30, 12]);
    translate([7, 20, 13]) sphere(d = 16.8, $fn = 64);  // llit de la canica
    translate([7, 5, -1]) cylinder(h = 14, d = 3.4, $fn = 24);
    translate([7, 15, -1]) cylinder(h = 14, d = 3.4, $fn = 24);
}
