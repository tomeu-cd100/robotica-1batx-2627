// Difusor d'ull per a NeoPixel (encaixa al forat de 16 mm del frontal).
difference() {
    union() {
        cylinder(h = 2, d = 20, $fn = 48);       // vora exterior
        translate([0, 0, 2]) cylinder(h = 4, d = 15.8, $fn = 48); // cos que encaixa
    }
    translate([0, 0, 3]) cylinder(h = 4, d = 12, $fn = 48);       // cavitat del LED
}
