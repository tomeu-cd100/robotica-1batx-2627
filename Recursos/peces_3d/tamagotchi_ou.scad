// =====================================================================
// Carcassa del tamagotchi del T1 (Robotica 1r Batx) - forma d'ou
// Hi caben: Arduino UNO + mitja protoboard (drets, un sobre l'altre),
// OLED 0,96" I2C, 3 polsadors, sensor de llum, microfon, PIR i LED RGB.
//
// MODE = "3d"     -> closca d'ou (imprimir de cara avall) + tapa del darrere
// MODE = "closca" -> nomes la closca      MODE = "tapa" -> nomes la tapa
// MODE = "comprova" -> closca amb el UNO i la protoboard en transparent
//                    (per veure que hi caben abans d'imprimir-ne 20)
// MODE = "laser"  -> 2D per tallar en DM de 3 mm: placa del davant (amb
//                    forats) i placa del darrere, unides amb 3 separadors M3
//                    de llargada = FONS (versio "sandvitx", oberta pels costats)
//
// COL.LOCACIO (vista de davant): el UNO dret a BAIX, amb els connectors USB i
// jack cap a la DRETA (surten per la ranura del lateral), i la mitja protoboard
// dreta a DALT, darrere la pantalla. Tots dos amb els components cap al davant.
// Es fixen a la tapa del darrere amb cinta de doble cara o brides.
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
AMPLE      = 130;   // amplada maxima
ALT_BAIX   = 92;    // de la linia mes ampla cap avall
ALT_DALT   = 76;    // de la linia mes ampla cap amunt (mes estret = forma d'ou)
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
LLUM_POS  = [-26, 58];  D_LLUM  = 6;     // sensor de llum (TEMT6000 o LDR)
MICRO_POS = [ 26, 58];  D_MICRO = 10;    // microfon
PIR_POS   = [  0, -54]; D_PIR   = 23.5;  // cupula del PIR (el "nas")
LED_POS   = [ 44,  4];  D_LED   = 5.3;   // LED RGB de 5 mm

// --- Cargols de la tapa / separadors (M3) ---
// 3 cargols: dos a dalt (per sobre de la protoboard) i un a baix a l'esquerra.
// A baix a la dreta no n'hi ha: hi passen els cables USB i del jack.
CARGOLS = [[-40, 50], [40, 50], [-48, -45]];
D_CARGOL = 3.3;

// --- Placa i protoboard (per a MODE="comprova" i per a la ranura) ---
UNO      = [68.6, 53.4, 15];   // ample, alt, gruix amb components
UNO_Y    = -72;                // vora de baix del UNO
PROTO    = [82, 55, 10];
PROTO_Y  = -17;                // vora de baix de la protoboard

// --- Ranura del lateral dret (closca 3D): USB i jack del UNO ---
// Cobreix tota l'altura del UNO i va fins a la tapa: serveix per a qualsevol
// orientacio dels connectors i deixa treure el cable sense desmuntar res.
RANURA_FONS = 34;              // profunditat de la ranura des de la tapa

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
        // ranura del lateral dret per a l'USB i el jack, oberta cap a la tapa
        translate([AMPLE / 2 - 25, UNO_Y - 2, FONS + PARET - RANURA_FONS])
            cube([40, UNO[1] + 4, RANURA_FONS + 1]);
    }
}

module tapa() {
    linear_extrude(PLACA) difference() { ou2d(); forats_cargols(); }
}

// --- Versio laser (2D) ----------------------------------------------
module placa_davant() { difference() { ou2d(); forats_frontal(); forats_cargols(); } }
module placa_darrere() { difference() { ou2d(); forats_cargols(); } }

// --- Comprovacio d'encaix ---------------------------------------------
module fantasmes() {
    // els components miren endavant (z = 0 es el frontal); la placa, a tocar de la tapa
    color("teal", 0.5)
        translate([-UNO[0] / 2, UNO_Y, FONS + PARET - UNO[2]]) cube(UNO);
    color("white", 0.5)
        translate([-PROTO[0] / 2, PROTO_Y, FONS + PARET - PROTO[2]]) cube(PROTO);
}

if (MODE == "3d") {
    closca();
    translate([AMPLE + 10, 0, 0]) tapa();
} else if (MODE == "closca") {
    closca();
} else if (MODE == "tapa") {
    tapa();
} else if (MODE == "comprova") {
    closca();
    %fantasmes();
} else if (MODE == "laser") {
    placa_davant();
    translate([AMPLE + 6, 0]) placa_darrere();
}
