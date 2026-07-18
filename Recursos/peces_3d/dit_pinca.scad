// Dit de la pinca del brac (x2, un per banda). Es cargola al casquet del servo.
difference() {
    union() {
        cube([8, 40, 6]);                          // dit
        for (i = [0 : 3]) translate([8, 28 + i * 3, 0]) cube([2, 2, 6]); // dents
    }
    translate([4, 5, -1]) cylinder(h = 8, d = 2.2, $fn = 24);  // cargols del casquet
    translate([4, 11, -1]) cylinder(h = 8, d = 2.2, $fn = 24);
}
