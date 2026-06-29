# Reptes — Tria el teu repte a cada SA

Aquesta carpeta conté, **per a cada situació d'aprenentatge (SA1–SA8)**, **tres reptes diferenciats** entre els quals l'alumnat pot **triar**. Tots tres treballen els **mateixos continguts** de la unitat però en **contextos diferents** (per triar segons l'interès), amb un **requisit mínim comú** i **ampliacions graduades** (per atendre la diversitat).

> La **SA9** no té fitxa aquí: és el projecte final obert, amb el seu propi `Classes/SA9/plantilles/Banc_de_reptes.md`.

## Com triar un repte

1. Llegeix els **tres** reptes de la SA.
2. Tria el que més et motivi (el context, no la dificultat: tots parteixen del mateix mínim).
3. Decideix fins on vols arribar amb les **ampliacions**.
4. Pots **proposar un repte propi** amb el vistiplau del professorat, sempre que treballi els continguts de la SA.

## Contingut

| Fitxer | SA | Reptes (contextos) |
|---|---|---|
| `Reptes_SA1.md` | SA1 · LED, Blink, digital | 🌊 Far costaner · 🚲 Llum de bici · 📡 Morse |
| `Reptes_SA2.md` | SA2 · Sortides i PWM | 🚦 Semàfor · 💡 Llum d'ambient · 📊 Indicador de nivell |
| `Reptes_SA3.md` | SA3 · Sensors i entrades | 🌙 Llum nocturna · 🅿️ Sensor d'aparcament · 🎛️ Instrument interactiu |
| `Reptes_SA4.md` | SA4 · Servos i motors | 🚧 Barrera · 🌬️ Ventilador/vehicle · 🤖 Braç dispensador |
| `Reptes_SA5.md` | SA5 · micro:bit i MicroPython | 🏃 Comptapassos · 🌃 Llum de nit · 🎲 Joc/ràdio |
| `Reptes_SA6.md` | SA6 · Sistemes de control | 🌡️ Termòstat · 🚦 Semàfor adaptatiu · ⚙️ Regulador proporcional |
| `Reptes_SA7.md` | SA7 · Robòtica mòbil | 📦 Repartidor · 🧭 Explorador · 🏁 Seguidor de línia |
| `Reptes_SA8.md` | SA8 · IoT i IA | 🌍 Estació meteo · 🚨 Sistema d'alerta · ✋ Control per gestos |

## Estructura de cada repte

Context/problema · Què treballa · **Requisit mínim** · **Ampliacions graduades** · Material · Per on començar (mètode de projecte + PRIMM) · Com s'avalua (rúbriques) · Producte · Orientació docent.

## Com s'avalua (rúbriques del curs)

| Rúbrica | Avalua |
|---|---|
| **R1** | Programació (codi) |
| **R2** | Circuit i electrònica |
| **R3** | Projecte i robot |
| **R4** | Documentació tècnica i comunicació |
| **R5** | Actitud, cooperació i autoregulació |

Cada repte indica les rúbriques aplicables. Es comparteixen amb l'alumnat **abans** de començar (avaluació formativa). Vegeu `Programació didàctica/07_Rubriques.md`.

## Com treballar els reptes (rols, depuració i coavaluació)

Els reptes es resolen amb les **mateixes rutines** que les classes (pòster projectable: `Classes/00_Poster_aula_metode_DEPURA_rols.md`):

- **Rols rotatius:** Coordinador/a · Programador/a · Enginyer/a de maquinari · Provador/a–Documentador/a (roteu-los a cada sessió).
- **Quan no funcioni → rutina DEPURA:** **D**escriu · **E**xamina · **P**rova una hipòtesi cada cop · **U**bica · **R**epara · **A**punta-ho.
- **Coavaluació "2 estrelles i un desig":** en acabar, intercanvieu el producte amb un altre equip i anoteu 2 coses ben fetes + 1 millora.
- **Diana d'autoavaluació:** situeu-vos (NA/AS/AN/AE) en el codi, el circuit i la documentació abans de l'entrega.

## Simulacions interactives (Wokwi)

Els reptes de **SA1–SA4 i SA6** tenen el circuit i el codi de solució de referència muntats a Wokwi (versions **mínim** i **ampliat**): vegeu `Simulacions/Wokwi/Reptes/README.md`. Permeten provar i comparar sense maquinari. **Excepcions dins d'aquest rang:** el repte **SA4_B (ventilador)** i l'**ampliat de SA6_C (proporcional)** usen motor DC + pont H, que no és component estàndard de Wokwi, i no s'hi simulen. *(SA5, SA7 i la part micro:bit de SA8 tampoc no són simulables a Wokwi.)*

## Convertir un repte en un objecte (disseny de producte)

Qualsevol repte es pot portar més enllà del muntatge i convertir-lo en un **objecte real amb carcassa/maqueta**. Vegeu el **`Classes/00_Banc_objectes_disseny.md`**: per a cada SA hi ha objectes dissenyables (funció, usuari, materials) amb procés de disseny i rúbrica de producte.

## Fil comú del curs

Tots els reptes es resolen amb el **mètode de projecte**: *analitzar → dissenyar → prototipar → provar → millorar*, i es llegeix/escriu el codi amb **PRIMM** (Predir → Executar → Investigar → Modificar → Crear). Vocabulari i bases de programació: `Classes/SA0/`.
