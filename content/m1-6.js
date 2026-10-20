import { lesson, def, ex, ana, warn, it, p, md, img, flow, tiles, tbl, steps, words, vis, alt, viz, match, mc, order, cloze, gen, guia, write, practica } from '../js/mk.js';

export default {
  id: 'm1-6', unit: '1.6', title: 'Medición', sub: 'Medir, convertir unidades y escribir números muy grandes o muy chiquitos', minutes: 140, weight: 20,
  goals: [
    'Entender **qué es medir** y por qué todos usamos las mismas unidades.',
    'Cambiar de **kilómetros a metros**, de **km/h a m/s**, de **millas a km** y de **°F a °C**.',
    'Escribir números enormes o diminutos en **notación científica**.',
    'Resolver problemas de **escala, densidad y rapidez**.',
  ],
  pages: [
    lesson('¿Qué es medir?', 'Comparar con algo que todos aceptamos', [
      words([['Medir', 'comparar algo con una unidad para saber cuánto es'], ['Unidad', 'la medida que usamos de comparación: metro, kilo, litro, segundo…'], ['Magnitud', 'lo que se puede medir: longitud, peso, tiempo…']]),
      flow([['📏', 'Elijo una|unidad'], ['🔁', 'Cuento cuántas veces|cabe'], ['🔢', 'Digo el|resultado'], ['🌍', 'Todos usamos la|misma unidad']], 'Pasos de la medición'),
      ana('Si mides tu mesa en **«cuartas»** (con tu mano) y yo con la mía, ¡saldrá distinto! 🖐️ Por eso se inventaron unidades **iguales para todos**: el metro, el kilo, el litro.'),
      warn('Medir **sin unidad** no sirve: «la mesa mide 2» ¿2 qué? ¿2 metros? ¿2 cuartas? Siempre pon la unidad.'),
      ana('Antes se usaban el **codo**, el **pie** y la **vara**, y cada pueblo tenía los suyos. En la Revolución Francesa se creó el **sistema métrico** y hoy usamos el **Sistema Internacional (SI)**.', '📜 Un poco de historia'),
    ], 'Medir = comparar con una unidad que todos usamos.', 'Qué es medir'),

    guia('Practica con ayuda', '¿Con qué unidad medirías?', [
      { q: 'La **distancia de tu casa a la escuela** 🏫. ¿Qué unidad usarías?', mode: 'sel', opts: ['gramos', 'kilómetros', 'litros'], ans: 'kilómetros', hint: 'Es una distancia, y es larga.', ok: 'Kilómetros (km).' },
      { q: 'Lo que **pesa una persona** ⚖️', mode: 'sel', opts: ['kilogramos', 'metros', 'segundos'], ans: 'kilogramos', hint: 'Es un peso (masa).', ok: 'Kilogramos (kg).' },
      { q: 'Lo que **dura una canción** 🎵', mode: 'sel', opts: ['minutos', 'litros', 'kilos'], ans: 'minutos', hint: 'Es tiempo.', ok: 'Minutos (min) o segundos (s).' },
      { q: 'Lo que **cabe en una botella de agua** 💧', mode: 'sel', opts: ['litros', 'metros', 'segundos'], ans: 'litros', hint: 'Es capacidad.', ok: 'Litros (L).' },
    ], 'Piensa qué estás midiendo.', 'Con ayuda: unidades'),

    lesson('Las unidades del Sistema Internacional', 'Una lista corta que usa todo el mundo', [
      tbl(['Qué mides', 'Unidad', 'Símbolo'], [['Longitud (qué tan largo)', 'metro', 'm'], ['Masa (el peso)', 'kilogramo', 'kg'], ['Tiempo', 'segundo', 's'], ['Temperatura', 'kelvin (o °C en la vida diaria)', 'K / °C'], ['Corriente eléctrica', 'ampere', 'A'], ['Cantidad de sustancia', 'mol', 'mol'], ['Intensidad de luz', 'candela', 'cd']]),
      def('Unidades derivadas', 'Se forman **combinando las básicas**: **área** (m²: metros × metros), **volumen** (m³; también litro L), **rapidez** (m/s: metros entre segundos), **densidad** (kg/m³).'),
    ], 'Magnitud = lo que mides; unidad = con qué lo mides.', 'Unidades SI'),

    match('Magnitud y unidad', 'Une cada magnitud con su unidad del SI', [['Longitud', 'metro'], ['Masa', 'kilogramo'], ['Tiempo', 'segundo'], ['Temperatura', 'kelvin'], ['Corriente eléctrica', 'ampere'], ['Cantidad de sustancia', 'mol']], ['metro', 'kilogramo', 'segundo', 'kelvin', 'ampere', 'mol'], 'Tú solo: magnitudes'),

    lesson('Prefijos: kilo, centi, mili…', 'Nombres que dicen «qué tan grande»', [
      words([['Prefijo', 'una palabrita que se pone adelante de la unidad para decir si es mil veces más grande o más chica'], ['kilo (k)', 'mil veces más grande: 1 km = 1 000 m'], ['centi (c)', 'cien veces más chico: 1 cm = 1/100 de metro'], ['mili (m)', 'mil veces más chico: 1 mm = 1/1 000 de metro']]),
      img('assets/lessons/1-6-prefijos-si.svg', 'Escalera de los prefijos'),
      ana('Es como el dinero: **$1 = 100 centavos**. Una moneda de $1 es «100 veces más grande» que un centavo. Igual: **1 metro = 100 centímetros**.', '💰 Como el dinero'),
      tbl(['Prefijo', 'Símbolo', 'Cuánto vale'], [['kilo', 'k', '1 000 (mil)'], ['hecto', 'h', '100'], ['deca', 'da', '10'], ['(unidad)', '', '1'], ['deci', 'd', '0.1 (un décimo)'], ['centi', 'c', '0.01 (un centésimo)'], ['mili', 'm', '0.001 (un milésimo)']]),
    ], 'Cada escalón de la escalera es ×10 o ÷10.', 'Prefijos'),

    lesson('Convertir unidades', '¿Multiplico o divido? Una regla fácil', [
      def('La regla', '**Si la unidad nueva es MÁS CHICA → el número crece → MULTIPLICAS.**<br>**Si la unidad nueva es MÁS GRANDE → el número se hace chico → DIVIDES.**'),
      ana('Con dinero: **$3** a centavos → centavos son más chicos, hay **más** → 3 × 100 = **300 centavos** (multiplicas). **500 centavos** a pesos → pesos son más grandes, hay **menos** → 500 ÷ 100 = **$5** (divides).', '💰 Con dinero'),
      steps('Ejemplo: 3.5 km a metros', ['El metro es **más chico** que el km → el número **crece** → **multiplicas**.', '1 km = 1 000 m.', '3.5 × 1 000 = **3 500**.', 'Respuesta: **3 500 m**.']),
      viz('conv', '🧰 Pruébalo: convierte lo que quieras y mira el factor'),
      tbl(['Sistema métrico'], [['1 km = 1 000 m'], ['1 m = 100 cm'], ['1 kg = 1 000 g'], ['1 L = 1 000 mL'], ['1 h = 60 min = 3 600 s']]),
    ], 'Unidad más chica: multiplicas. Unidad más grande: divides.', 'Convertir'),

    guia('Practica con ayuda', 'Convierte paso a paso', [
      { q: 'Quieres pasar **4 km** a **metros**. ¿El metro es más grande o más chico que el km?', mode: 'sel', opts: ['Más chico', 'Más grande'], ans: 'Más chico', hint: '1 km tiene 1 000 metros: el metro es muy chiquito.', ok: 'Más chico → vas a multiplicar.' },
      { q: '¿Cuántos metros hay en 1 km?', mode: 'n', ans: 1000, hint: 'Kilo = mil.', ok: '1 000.' },
      { q: 'Entonces 4 km = 4 × 1 000 = ? metros', mode: 'n', ans: 4000, hint: '4 por mil.', ok: '4 000 m.' },
      { q: 'Ahora al revés: **2 500 g** a **kg**. El kg es más grande, así que **divides** entre 1 000. ¿Cuánto da?', mode: 'n', ans: 2.5, hint: '2 500 ÷ 1 000.', ok: '2.5 kg.' },
    ], 'Primero decide si multiplicas o divides.', 'Con ayuda: convertir'),

    gen('Ahora tú solo: convierte unidades', 'Usa los factores de la tabla', 'conversion', 5, 'Tú solo: convertir'),

    lesson('Rapidez: de km/h a m/s', 'Un truco: divide entre 3.6', [
      words([['Rapidez', 'qué tan rápido va algo: distancia ÷ tiempo'], ['km/h', 'kilómetros por hora (lo que ves en el velocímetro)'], ['m/s', 'metros por segundo (el SI)']]),
      steps('Convertir 72 km/h a m/s', ['1 km = 1 000 m y 1 h = 3 600 s.', 'Entonces: 72 × 1 000 ÷ 3 600.', '= 72 000 ÷ 3 600 = **20**.', '**72 km/h = 20 m/s**.']),
      def('Atajo', '**Para pasar de km/h a m/s, divide entre 3.6.** Para pasar de m/s a km/h, **multiplica por 3.6**.'),
    ], 'km/h ÷ 3.6 = m/s.', 'Rapidez'),

    gen('Tú solo: rapidez', 'km/h ↔ m/s', 'rapidez', 4, 'Tú solo: rapidez'),

    lesson('Temperatura: de °F a °C', 'Cuando viajas a Estados Unidos', [
      words([['°C', 'grados Celsius (México)'], ['°F', 'grados Fahrenheit (Estados Unidos)']]),
      def('Fórmula', '**°C = (°F − 32) × 5/9**. Resta 32, multiplica por 5 y divide entre 9.'),
      steps('Convertir 95 °F a °C', ['Resta 32: 95 − 32 = **63**.', 'Multiplica por 5: 63 × 5 = **315**.', 'Divide entre 9: 315 ÷ 9 = **35**.', '**95 °F = 35 °C** (¡hace calor!).']),
    ], 'Resta 32, multiplica por 5, divide entre 9.', 'Temperatura'),

    gen('Tú solo: temperatura', '°F a °C', 'temperatura', 4, 'Tú solo: temperatura'),

    lesson('Otros sistemas: millas, galones, libras', 'Lo que ves cuando viajas o compras en línea', [
      tbl(['Unidad', 'Equivale a'], [['1 pulgada', '2.54 cm'], ['1 pie', '30.48 cm'], ['1 milla', '1.609 km'], ['1 libra', '0.454 kg'], ['1 galón (EE. UU.)', '3.785 litros']]),
      ex('**65 mph** (millas por hora) → 65 × 1.609 = **104.6 km/h**. **5 galones** de gasolina → 5 × 3.785 ≈ **18.9 litros**.', 'Para viajar o comprar'),
    ], 'Multiplica por el factor de la tabla.', 'Otros sistemas'),

    gen('Tú solo: pulgadas, millas, galones y libras', 'Redondea a décimas si hace falta', 'imperial', 4, 'Tú solo: otros sistemas'),

    lesson('Notación científica', 'Para escribir números muy grandes o muy chiquitos', [
      words([['Notación científica', 'una forma corta de escribir números enormes o diminutos usando potencias de 10'], ['a × 10ⁿ', 'un número entre 1 y 10, multiplicado por una potencia de 10']]),
      def('La regla', 'Se escribe **a × 10ⁿ**, donde **a está entre 1 y 10**. Si el número es **muy grande**, n es **positivo**; si es **muy chiquito**, n es **negativo**.'),
      ana('La distancia de la Tierra al Sol es **150 000 000 km**: ¡muchos ceros! En notación científica es **1.5 × 10⁸ km**. Mucho más corto 🌍☀️.', '🌍 Ejemplo'),
      steps('Escribir 45 000 en notación científica', ['Pon el punto después de la primera cifra: **4.5**.', 'Cuenta cuántos lugares se movió el punto hacia la izquierda: **4**.', 'Ese 4 es el exponente (positivo porque el número es grande).', 'Resultado: **4.5 × 10⁴**.']),
      steps('Y si el número es chiquito: 0.00032', ['Mueve el punto a la derecha hasta quedar después de la primera cifra que no es cero: **3.2**.', 'Se movió **4 lugares**.', 'Como el número es chiquito, el exponente es **negativo**: −4.', 'Resultado: **3.2 × 10⁻⁴**.']),
      tbl(['Para multiplicar (3 × 10³)(2 × 10⁴)', 'Se hace'], [['Multiplica los números', '3 × 2 = 6'], ['Suma los exponentes', '3 + 4 = 7'], ['Resultado', '6 × 10⁷']]),
    ], 'El primer número siempre debe quedar entre 1 y 10.', 'Notación científica'),

    gen('Tú solo: notación científica', 'Escribe así: 4.5x10^3', 'cientifica', 5, 'Tú solo: notación científica'),

    lesson('Razón y proporción al medir', 'Mapas, densidad y recetas', [
      words([['Escala', 'cuánto se encoge la realidad en un mapa. 1 : 50 000 → 1 cm del mapa son 50 000 cm reales'], ['Densidad', 'qué tan «apretada» está la materia: masa ÷ volumen']]),
      it('Escala', 'En un mapa **1 : 50 000**, 4 cm → 4 × 50 000 = 200 000 cm = **2 km** reales.'),
      it('Densidad', '**270 g** en **100 cm³** → 270 ÷ 100 = **2.7 g/cm³**.'),
      ex('3 L de pintura cubren 24 m². Para 60 m²: 3/24 = x/60 → x = 3 × 60 ÷ 24 = **7.5 L**.', 'Con proporción'),
    ], 'Todo se resuelve con proporciones.', 'Razón y proporción'),

    gen('Tú solo: escala de mapas', 'Pasa de cm del mapa a km reales', 'escala', 4, 'Tú solo: escala'),
    gen('Tú solo: densidad', 'masa ÷ volumen', 'densidad', 4, 'Tú solo: densidad'),

    mc('Situaciones reales', 'Viajes y compras', [
      ['En EE. UU. el límite es 55 mph y vas a 90 km/h. ¿Lo superas?', ['No', 'Sí: 55 mph ≈ 88.5 km/h', 'Es igual'], 1, '55 × 1.609 ≈ 88.5 km/h. Como 90 > 88.5, lo superas.'],
      ['¿Cuántos litros son 10 galones?', ['≈ 37.9 L', '≈ 2.6 L', '≈ 10 L'], 0, '10 × 3.785 = 37.85 L.'],
      ['¿Cuál es la notación científica de 0.0004?', ['4 × 10⁴', '4 × 10⁻⁴', '0.4 × 10⁻³'], 1, 'El punto se mueve 4 lugares a la derecha: 4 × 10⁻⁴.'],
      ['Un mapa tiene escala 1 : 25 000. ¿Cuántos km son 8 cm del mapa?', ['2 km', '20 km', '200 m'], 0, '8 × 25 000 = 200 000 cm = 2 km.'],
    ], 'Situaciones'),

    write('Explícalo', '¿Por qué importan las unidades comunes?', 'Explica **por qué es importante usar unidades comunes** al comprar o viajar a otro país y da un ejemplo con una conversión.', [['Habla de unidades o medidas', 'unidad|medida|sistema|conversion'], ['Incluye un ejemplo con números', '\\d'], ['Explica la importancia', 'importante|evita|error|confusion|entender|comparar|mismo|igual']], 3, 'Ejemplo: millas vs. kilómetros al ver un límite de velocidad.', 'Tú solo: unidades'),

    lesson('Resumen del módulo', 'Lo más importante', [
      md('- **Medir** = comparar con una unidad. **SI:** m, kg, s, K.\n- **Prefijos:** kilo = mil, centi = centésima, mili = milésima.\n- **Convertir:** unidad más chica → multiplicas; más grande → divides. km/h ÷ 3.6 = m/s.\n- **Notación científica:** a × 10ⁿ con a entre 1 y 10.\n- **Escala** 1 : N · **Densidad** = masa ÷ volumen.'),
    ], 'Ya puedes hacer tu caso práctico.', 'Resumen'),

    practica({
      t: 'Caso práctico: conversiones al viajar o comprar', sub: 'Tu evidencia: vale el 20 % del curso',
      intro: 'Imagina que **viajas a Estados Unidos** (donde usan millas, galones, libras y °F) o que **compras algo por internet** de allá. Resuelve un caso real usando conversiones.',
      mat: 'Cuaderno u hojas, calculadora, internet o un mapa; puede hacerse en un documento digital.',
      ejemplo: '**Caso:** viaje de Reynosa a San Antonio 🚗. Distancia: 250 millas → 250 × 1.609 = **402 km**. Gasolina: 10 galones → 10 × 3.785 = **37.9 L**. Clima: 95 °F → (95 − 32) × 5/9 = **35 °C**. Distancia en metros en notación científica: 402 000 m = **4.02 × 10⁵ m**.',
      steps: ['**Planea tu caso** (viaje o compra) y descríbelo en 5 renglones.', '**Distancias y velocidad:** convierte al menos 3 distancias (millas → km) y 2 límites de velocidad (mph → km/h).', '**Gasolina o líquidos:** convierte galones a litros y calcula cuánto cuesta cada litro en pesos.', '**Peso:** convierte libras y onzas a kg o g (equipaje o peso de un producto).', '**Temperatura:** convierte 5 temperaturas de °F a °C (clima del lugar).', '**Compra:** elige un producto con medidas en pulgadas o libras y precio en dólares; calcula el **precio por kg o por litro** y compáralo con uno de aquí.', '**Notación científica:** escribe al menos 2 cantidades (por ejemplo, la distancia total en metros).', '**Proporción:** resuelve un problema de escala de mapa, rapidez o ajuste de cantidades.', 'Incluye una **tabla con todos los factores** que usaste y una **conclusión**: ¿qué conversión te costó más y por qué conviene usar unidades comunes?'],
      deliver: 'Tu reporte (PDF, documento o fotos) con tablas, cuentas y conclusión.',
      rubric: [['Conversiones', 'Correctas con factores y procedimiento', 'Algunos errores', 'Incorrectas'], ['Notación científica', 'Bien aplicada', 'Errores leves', 'No la usa'], ['Razón y proporción', 'Planteadas y resueltas', 'Incompletas', 'No hay'], ['Análisis y presentación', 'Claro, ordenado, con tabla de factores', 'Incompleto', 'Desordenado']],
    }),
  ],
};
