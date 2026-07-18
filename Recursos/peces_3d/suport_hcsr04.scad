// Suport frontal de l'HC-SR04 (els "ulls" del rover). Cargols M3 a la placa.
difference() {
    union() {
        cube([46, 3, 22]);                        // placa frontal
        translate([0, 0, -3]) cube([46, 15, 3]);  // peu
    }
    translate([11, -1, 12]) rotate([-90, 0, 0]) cylinder(h = 5, d = 16.4, $fn = 48);
    translate([35, -1, 12]) rotate([-90, 0, 0]) cylinder(h = 5, d = 16.4, $fn = 48);
    translate([8, 7.5, -4]) cylinder(h = 5, d = 3.4, $fn = 24);
    translate([38, 7.5, -4]) cylinder(h = 5, d = 3.4, $fn = 24);
}
