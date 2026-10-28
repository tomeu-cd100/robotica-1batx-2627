# -*- coding: utf-8 -*-
"""Dades del quadern tècnic imprimible: una entrada per sessió lectiva.

Font única per a `generar_quadern_tecnic.py`. Cada sessió porta el títol
CANÒNIC de la guia docent (capçalera «## SESSIÓ n (2 h) — …»; SA9 usa les
fases de la taula «Seqüència de sessions») — `tools/qa.py` comprova que no
es desincronitzin. Els camps `avui` i `vocab` estan curats a mà des de les
guies i fitxes, en llenguatge d'alumne.

La darrera sessió de cada trimestre és la prova pràctica (`"prova": True`).
"""

def _s(sa, s, titol, avui, vocab, prova=False):
    return {"sa": sa, "s": s, "titol": titol, "avui": avui, "vocab": vocab,
            "prova": prova}

SESSIONS = {
    1: [
        _s("SA1", 1, "Què és un robot?",
           "Descobrir robots amagats a casa · Classificar en entrada-procés-sortida · Conèixer el mètode de projecte",
           "sistema embegut · entrada · procés · sortida · sensor · actuador"),
        _s("SA1", 2, "Arquitectura i seguretat",
           "Reconèixer les parts de la placa Arduino · Distingir digital d'analògic · Muntar amb seguretat",
           "microcontrolador · pin digital · pin analògic (A0-A5) · PWM (~) · 5V/GND"),
        _s("SA1", 3, "El primer programa",
           "Predir i llegir el codi Blink · Fer parpellejar un LED · Modificar el temps i crear un repte",
           "setup() · loop() · pinMode · digitalWrite · delay() · PRIMM"),
        # La Prova SA1 és a la sessió de marge entre SA1 i SA2 (doc 08): sense full.
        _s("SA2", 1, "Estructures de control: el semàfor",
           "Muntar LED amb resistència i mesurar-hi tensions · Programar un semàfor de 3 LED · Afegir una fase nocturna",
           "resistència 220 Ω · multímetre · if · switch · seqüència · delay()"),
        _s("SA2", 2, "PWM: intensitat i color",
           "Regular la intensitat d'un LED · Fer un efecte fade · Barrejar colors amb un LED RGB",
           "PWM · analogWrite (0-255) · map() · LED RGB · pins ~"),
        _s("SA2", 3, "Producte: panell de senyalització",
           "Integrar RGB, piezo i relé · Programar estats amb color i so · Defensar el teu panell",
           "LED RGB · piezo · relé · estat · funció"),
        _s("SA3", 1, "Entrades digitals i monitor sèrie",
           "Llegir un polsador · Comptar premudes al monitor sèrie · Fer un LED mode toggle",
           "INPUT_PULLUP · digitalRead · antirebot (debounce) · Serial Monitor · toggle"),
        _s("SA3", 2, "Entrades analògiques",
           "Llegir potenciòmetre i LDR (0-1023) · Reescalar amb map() · Fer un llum automàtic",
           "analogRead · conversió A/D · map() · divisor de tensió · llindar"),
        _s("SA3", 3, "Ultrasons + PRODUCTE: la mascota",
           "Mesurar distància amb ultrasons · Escriure una funció que retorna un valor · Tancar la mascota amb 3 reaccions",
           "HC-SR04 · pulseIn · mesuraDistancia() · return · llindar · reacció"),
        _s("SA3", 4, "PROVA PRÀCTICA T1 (individual)",
           "Muntar i programar tot sol la llum de seguretat intel·ligent · Documentar el procés",
           "sensor→actuador · llindar · funció · INPUT_PULLUP · quadern tècnic",
           prova=True),
    ],
    2: [
        _s("SA4", 1, "El servomotor (la base del braç)",
           "Controlar l'angle d'un servo amb un potenciòmetre · Centrar els 4 servos del braç (pas 0)",
           "Servo.h · attach() · write(angle) · map() · pas 0 · alimentació externa"),
        _s("SA4", 2, "Motor DC i pont H (+ pinça del braç)",
           "Fer girar un motor endavant i enrere amb seguretat · Muntar i calibrar la pinça del braç",
           "pont H (L298N) · IN1/IN2 · ENA · PWM · massa comuna · calibratge"),
        _s("SA4", 3, "Del sensor al braç",
           "Fer que el braç reaccioni a un objecte · Muntar l'estructura central del MeArm",
           "ultrasons · mesuraDistancia() · percepció→acció · llindar · millis()"),
        _s("SA4", 4, "Producte: el braç amb potenciòmetres",
           "Controlar les 4 articulacions dins del seu rang segur · Documentar i defensar el braç",
           "rang segur · zona morta · funcions amb paràmetres · angles límit · defensa"),
        _s("SA5", 1, "Primers passos amb MicroPython",
           "Escriure el primer programa en Python · Fer un selector d'articulació amb pantalla i botons",
           "from microbit import * · display.show() · llista · indentació · botons A/B"),
        _s("SA5", 2, "La inclinació com a gest",
           "Llegir l'acceleròmetre amb llindars · Connectar la micro:bit pont al braç",
           "acceleròmetre · get_x()/get_y() · llindar · was_gesture() · pont P1→D0"),
        _s("SA5", 3, "Ràdio: el comandament del braç",
           "Moure el braç per ràdio des d'una altra micro:bit · Comparar C++ i Python",
           "radio.on() · radio.config(group) · send() · receive() · protocol d'ordres · taula comparativa"),
        _s("SA6", 1, "Llaç obert, llaç tancat i homing",
           "Distingir llaç obert de llaç tancat · Fer el homing del braç amb un final de carrera",
           "consigna · realimentació · llaç obert/tancat · final de carrera · homing"),
        _s("SA6", 2, "Histèresi: la pinça automàtica",
           "Fer una pinça que no faci «clic-clic» · Entendre per què calen dos llindars",
           "control tot/res · histèresi · dos llindars · ultrasons · angles límit"),
        _s("SA6", 3, "Màquina d'estats del braç + tancament del producte",
           "Organitzar el braç en estats (repòs, manual, replay, emergència) · Programar sense bloquejar",
           "enum · switch · estats · transicions · millis() · emergència"),
        _s("SA6", 4, "PROVA PRÀCTICA T2 (individual)",
           "Demostrar tot sol la pinça amb histèresi · Fer el comandament de micro:bit en solitari",
           "histèresi · màquina d'estats · micro:bit · quadern consultable",
           prova=True),
    ],
    3: [
        _s("SA7", 1, "Moviment i cinemàtica diferencial",
           "Ajustar els pins del robot · Programar endavant, gir i aturada · Entendre per què gira",
           "cinemàtica diferencial · velocitat de roda · gir · calibratge"),
        _s("SA7", 2, "Trajectòries programades",
           "Fer recórrer un quadrat al robot · Calibrar el gir de 90° · Mesurar l'error i ajustar",
           "trajectòria · gir de 90° · control per temps · error de trajectòria"),
        _s("SA7", 3, "Evitar obstacles (comportament reactiu)",
           "Programar el robot amb ultrasons · Percebre, decidir i actuar · Millorar l'estratègia de gir",
           "ultrasons · llaç tancat · percepció-decisió-acció · màquina d'estats"),
        _s("SA7", 4, "Seguidor de línia + repte de pista",
           "Calibrar els sensors IR · Completar la pista de manera autònoma · Mesurar temps i iterar",
           "sensors IR · seguidor de línia · llindar · correcció proporcional · iteració"),
        _s("SA8", 1, "Telemetria: el robot que informa",
           "Enviar dades per ràdio · Rebre-les i registrar-les pel sèrie · Etiquetar dues magnituds",
           "telemetria · ràdio · group · port sèrie · llindar"),
        _s("SA8", 2, "IoT: arquitectura, aplicacions i riscos (auditoria d'un producte real)",
           "Dibuixar l'arquitectura del producte · Auditar dades i riscos · Defensar l'informe al peritatge",
           "IoT · dispositiu-xarxa-núvol-app · MQTT/WiFi · privacitat · RGPD · auditoria"),
        _s("SA8", 3, "Introducció a la IA: de les regles a l'aprenentatge",
           "Classificar gestos amb regles · Entrenar un model amb exemples · Reflexionar sobre el biaix",
           "regles · aprenentatge automàtic (ML) · classificador · entrenament · biaix"),
        _s("SA9", 1, "Projecte: idear",
           "Triar el meu repte i els requisits · Fer l'esbós i el taulell (etiquetes PLA/MAQ/PROG/DOC)",
           "repte · requisits mínims · esbós · planificació àgil · etiquetes · kanban"),
        _s("SA9", 2, "Projecte: prototipar",
           "Muntar el prototip mínim viable · Escriure el primer codi partint de l'esquelet",
           "prototip mínim viable (MVP) · esquelet de codi · codi modular · integració"),
        _s("SA9", 3, "Projecte: provar i millorar",
           "Provar el sistema · Registrar els errors · Iterar la millora i avançar el dossier",
           "proves sistemàtiques · registre d'errors · iteració · code review · DEPURA"),
        _s("SA9", 4, "Projecte: comunicar (defensa) i tancament del curs",
           "Tancar el dossier tècnic · Defensar el projecte a la mostra amb demostració · Coavaluar · "
           "Escriure la RETROSPECTIVA DE CURS (última entrada del quadern)",
           "dossier tècnic · defensa oral · mostra · coavaluació · retrospectiva de curs"),
        _s("SA9", 5, "PROVA PRÀCTICA T3 (individual)",
           "Demostrar tot sol el robot a la pista (per torns) · Fer la part de micro:bit a la taula · "
           "Desmuntar i retornar el material als kits (15' finals)",
           "recorregut · obstacle · telemetria · estacions rotatives · desmuntatge · quadern consultable",
           prova=True),
    ],
}

# Prova pràctica de cada trimestre (Avaluació/Prova_practica_Tn.md).
PROVES = {
    1: {"titol": "Llum de seguretat intel·ligent",
        "material": "Arduino UNO · protoboard · LDR + 10 kΩ · LED + 220 Ω · polsador · brunzidor · cables",
        "reflexio_final": False},
    2: {"titol": "Control climàtic + estació remota",
        "material": "Arduino UNO · ventilador/pont H (o LED PWM) · NTC o potenciòmetre · 2 micro:bit",
        "reflexio_final": False},
    3: {"titol": "Robot autònom + sistema connectat",
        "material": "Robot mòbil (el rover del curs, o Imagina 3dBot) · pista de proves · micro:bit",
        "reflexio_final": True},
}

# Situacions d'aprenentatge de cada trimestre (per a portada i índex).
SA_TRIMESTRE = {
    1: [("SA1", "Què és un robot?"), ("SA2", "Sortides digitals i PWM"),
        ("SA3", "Entrades i sensors")],
    2: [("SA4", "Moviment: servos, motors i ponts H"), ("SA5", "micro:bit i MicroPython"),
        ("SA6", "Sistemes de control")],
    3: [("SA7", "Robòtica mòbil"), ("SA8", "IoT i IA"),
        ("SA9", "Repte final integrador")],
}
