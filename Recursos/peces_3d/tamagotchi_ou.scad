// =====================================================================
// Carcassa del tamagotchi del T1 (Robotica 1r Batx) - forma d'ou
// Hi caben: Arduino UNO + mitja protoboard (drets, un sobre l'altre),
// OLED 0,96" I2C, 3 polsadors, sensor de llum, microfon, PIR i LED RGB.
//
// MODE = "3d"     -> closca d'ou (imprimir de cara avall) + tapa del darrere
// MODE = "closca" -> nomes la closca      MODE = "tapa" -> nomes la tapa
// MODE = "laser"  -> 2D per tallar en DM de 3 mm: placa del davant (amb
//                    forats) i placa del darrere, unides amb 4 separadors M3
//                    de llargada = FONS (versio "sandvitx", oberta pels costats)
//
// Exportar:
//   openscad -o tamagotchi_ou_closca.stl -D 'MODE="closca"' tamagotchi_ou.scad
//   openscad -o tamagotchi_ou_tapa.stl   -D 'MODE="tapa"'   tamagotchi_ou.scad
//   openscad -o tamagotchi_ou_laser.svg  -D 'MODE="laser"'  tamagotchi_ou.scad
//
// ABANS DE FABRICAR: mesura el TEU modul OLED i ajusta els parametres OLED_*.
// Totes les mides en mm.
// =====================================================================

MODE = "3d";

// --- Forma de l'ou (vista de davant) ---
AMPLE      = 124;   // amplada maxima
ALT_BAIX   = 88;    // de la linia mes ampla cap avall
ALT_DALT   = 72;    // de la linia mes ampla cap amunt (mes estret = forma d'ou)
TALL_BASE  = 12;    // es talla la part de baix perque s'aguanti dret
FONS       = 72;    // profunditat interior (UNO + protoboard + cables)
PARET      = 2.4;   // gruix de paret (3D)
PLACA      = 3;     // gruix del DM (laser) i de la tapa (3D)

// --- Pantalla OLED 0,96" (mesura la teva!) ---
OLED_FINESTRA_X = 26;    // part visible
OLED_FINESTRA_Y = 15;
OLED_CENTRE_Y   = 28;    // altura del centre de la finestra
OLED_FORATS_X   = 23.5;  // distancia entre forats de fixacio
OLED_FORATS_Y   = 23.8;
OLED_D_FORAT    = 2.2;   // M2
OLED_DESP_FINESTRA = 2;  // la finestra no es al centre del PCB (cap amunt +)

// --- Botons (MENJAR, JUGAR, DORMIR) ---
D_BOTO     = 12.4;  // 12,4 per a polsadors de 12 mm; 7 per a 6 mm amb caputxo
BOTONS_Y   = -22;
BOTONS_SEP = 28;

// --- Sensors i LED ---
LLUM_POS  = [-30, 54];  D_LLUM  = 6;     // sensor de llum (TEMT6000 o LDR)
MICRO_POS = [ 30, 54];  D_MICRO = 10;    // microfon
PIR_POS   = [  0, -54]; D_PIR   = 23.5;  // cupula del PIR (el "nas")
LED_POS   = [ 44,  4];  D_LED   = 5.3;   // LED RGB de 5 mm

// --- Cargols de la tapa / separadors (M3) ---
CARGOLS = [[-49, 30], [49, 30], [-45, -48], [45, -48]];  // fora de la protoboard (82 mm) i del UNO (68,6 mm)
D_CARGOL = 3.3;

// --- Sortida USB i alimentacio (lateral dret, closca 3D) ---
USB_ALT   = 16;  USB_AMPLE = 14;   // USB-B del UNO
JACK_ALT  = 13;  JACK_AMPLE = 11;  // jack de 5-9 V
USB_Z     = 18;  // distancia de la tapa del darrere al centre del connector
USB_Y     = -30; // altura del connector

$fn = 96;

// ---------------------------------------------------------------------
module ou2d(marge = 0) {
    a = AMPLE / 2 - marge;
    difference() {
        union() {
            // meitat de baix (mes rodona)
            intersection() {
                scale([a, ALT_BAIX - marge]) circle(1);
                translate([-a, -ALT_BAIX]) square([2 * a, ALT_BAIX]);
            }
            // meitat de dalt (mes estreta i allargada)
            intersection() {
                scale([a, ALT_DALT - marge]) circle(1);
                translate([-a, 0]) square([2 * a, ALT_DALT]);
            }
        }
        // base plana
        translate([-AMPLE, -ALT_BAIX - 1]) square([2 * AMPLE, TALL_BASE + 1 + marge]);
    }
}

module forats_frontal() {
    // finestra de l'OLED i forats de fixacio
    translate([0, OLED_CENTRE_Y]) square([OLED_FINESTRA_X, OLED_FINESTRA_Y], center = true);
    for (sx = [-1, 1], sy = [-1, 1])
        translate([sx * OLED_FORATS_X / 2, OLED_CENTRE_Y - OLED_DESP_FINESTRA + sy * OLED_FORATS_Y / 2])
            circle(d = OLED_D_FORAT);
    // botons
    for (i = [-1, 0, 1]) translate([i * BOTONS_SEP, BOTONS_Y]) circle(d = D_BOTO);
    // sensors i LED
    translate(LLUM_POS)  circle(d = D_LLUM);
    translate(MICRO_POS) circle(d = D_MICRO);
    translate(PIR_POS)   circle(d = D_PIR);
    translate(LED_POS)   circle(d = D_LED);
}

module forats_cargols() {
    for (p = CARGOLS) translate(p) circle(d = D_CARGOL);
}

// --- Versio 3D ------------------------------------------------------
module closca() {
    difference() {
        union() {
            difference() {
                linear_extrude(FONS + PARET) ou2d();
                translate([0, 0, PARET]) linear_extrude(FONS + 1) ou2d(PARET);
            }
            // torretes per als cargols de la tapa
            for (p = CARGOLS) translate(p) cylinder(d = 8, h = FONS + PARET);
        }
        // forats del frontal (z = 0 es la cara de davant)
        translate([0, 0, -1]) linear_extrude(PARET + 2) forats_frontal();
        // forats per a cargols autoroscants M3 a les torretes
        for (p = CARGOLS) translate([p[0], p[1], PARET + 2]) cylinder(d = 2.6, h = FONS);
        // USB i jack pel lateral dret
        translate([AMPLE / 2 - 12, USB_Y, FONS + PARET - USB_Z])
            cube([30, USB_AMPLE, USB_ALT], center = true);
        translate([AMPLE / 2 - 12, USB_Y + 26, FONS + PARET - USB_Z])
            cube([30, JACK_AMPLE, JACK_ALT], center = true);
    }
}

module tapa() {
    linear_extrude(PLACA) difference() { ou2d(); forats_cargols(); }
}

// --- Versio laser (2D) ----------------------------------------------
module placa_davant() { difference() { ou2d(); forats_frontal(); forats_cargols(); } }
module placa_darrere() {
    difference() {
        ou2d();
        forats_cargols();
        // pas del cable USB i ventilacio
        translate([AMPLE / 2 - 30, USB_Y]) square([18, 16], center = true);
    }
}

if (MODE == "3d") {
    closca();
    translate([AMPLE + 10, 0, 0]) tapa();
} else if (MODE == "closca") {
    closca();
} else if (MODE == "tapa") {
    tapa();
} else if (MODE == "laser") {
    placa_davant();
    translate([AMPLE + 6, 0]) placa_darrere();
}
