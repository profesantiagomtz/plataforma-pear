import { lesson, def, ex, ana, warn, it, p, md, img, flow, tiles, tbl, steps, viz, match, mc, order, cloze, gen, write, practica } from '../js/mk.js';

export default {
  id: 'm1-6', unit: '1.6', title: 'Medición', sub: 'Sistema Internacional, conversiones, notación científica, razón y proporción', minutes: 110, weight: 20,
  goals: [
    'Explicar qué es **medir** y por qué se necesitan **unidades comunes**.',
    'Usar el **Sistema Internacional** y sus prefijos.',
    'Hacer **conversiones** con factores (incluidas millas, galones, libras y °F).',
    'Expresar cantidades en **notación científica** y resolver problemas con **razón y proporción**.',
  ],
  pages: [
    lesson('¿Qué es medir?', 'Comparar con un patrón', [
      flow([['📏', 'Elijo una|unidad patrón'], ['🔁', 'Cuento cuántas|veces cabe'], ['🔢', 'Expreso el|resultado'], ['🌍', 'Todos usamos la|misma unidad']], 'Pasos de la medición'),
      def('Medir', 'Es **comparar una cantidad con otra de la misma clase** que se toma como patrón (unidad). Si mides tu mesa en «cuartas», comparas con la cuarta de tu mano… pero tu cuarta y la mía son distintas.'),
      ana('El **codo**, el **pie**, la **vara** y la **libra** variaban de un pueblo a otro y causaban conflictos al comerciar. Por eso, durante la Revolución Francesa (1790s) se creó el **sistema métrico decimal** y en 1960 el **Sistema Internacional de Unidades (SI)**.', '📜 Un poco de historia'),
      warn('Medir sin unidad no tiene sentido: «la mesa mide 2» no dice nada. ¿2 metros? ¿2 cuartas?'),
    ], 'Medir = comparar con un patrón que todos aceptamos.', 'Qué es medir'),

    lesson('Magnitudes y unidades del SI', 'Siete unidades base', [
      tbl(['Magnitud', 'Unidad', 'Símbolo'], [['Longitud', 'metro', 'm'], ['Masa', 'kilogramo', 'kg'], ['Tiempo', 'segundo', 's'], ['Temperatura', 'kelvin', 'K (°C en la vida diaria)'], ['Corriente eléctrica', 'ampere', 'A'], ['Cantidad de sustancia', 'mol', 'mol'], ['Intensidad luminosa', 'candela', 'cd']]),
      def('Magnitudes derivadas', 'Se forman combinando las básicas: **área** (m²), **volumen** (m³, también litro L), **rapidez** (m/s), **densidad** (kg/m³).'),
    ], 'Magnitud = lo que se mide; unidad = con qué se mide.', 'El SI'),

    match('Magnitud y unidad', 'Une cada magnitud con su unidad del SI', [['Longitud', 'metro'], ['Masa', 'kilogramo'], ['Tiempo', 'segundo'], ['Temperatura', 'kelvin'], ['Corriente eléctrica', 'ampere'], ['Cantidad de sustancia', 'mol']], ['metro', 'kilogramo', 'segundo', 'kelvin', 'ampere', 'mol'], 'Actividad: magnitudes'),

    lesson('Prefijos del SI', 'Múltiplos y submúltiplos', [
      img('assets/lessons/1-6-prefijos-si.svg', 'Escalera de prefijos del SI'),
      tbl(['Prefijo', 'Símbolo', 'Factor'], [['giga', 'G', '10⁹ (mil millones)'], ['mega', 'M', '10⁶ (un millón)'], ['kilo', 'k', '10³ (mil)'], ['centi', 'c', '10⁻² (centésima)'], ['mili', 'm', '10⁻³ (milésima)'], ['micro', 'µ', '10⁻⁶ (millonésima)'], ['nano', 'n', '10⁻⁹ (mil millonésima)']]),
      ex('1 km = 1 000 m · 1 cm = 0.01 m · 1 mm = 0.001 m · 1 MB = 1 000 000 bytes.'),
    ], 'Cada escalón es × 10 o ÷ 10.', 'Prefijos'),

    lesson('Calculadora de conversiones', 'Experimenta con unidades métricas y de otros sistemas', [
      viz('conv', '🧰 Convierte entre unidades y observa el factor de conversión'),
      p('Prueba, por ejemplo, **3.5 km → m**, **750 g → kg**, **10 pulgadas → cm** o **5 millas → km**. Fíjate en el **factor de conversión** que aparece debajo del resultado.'),
    ], 'El resultado siempre es: cantidad × factor.', 'Herramienta'),

    lesson('Conversión con factores', 'Multiplica por una fracción igual a 1', [
      tbl(['Sistema métrico', 'Otras unidades'], [['1 km = 1 000 m', '1 pulgada = 2.54 cm'], ['1 m = 100 cm', '1 pie = 30.48 cm'], ['1 kg = 1 000 g', '1 milla ≈ 1.609 km'], ['1 L = 1 000 mL', '1 libra ≈ 0.454 kg'], ['1 h = 3 600 s', '1 galón (EE. UU.) ≈ 3.785 L'], ['1 día = 86 400 s', '°F = °C × 9/5 + 32']]),
      steps('Convertir 72 km/h a m/s', ['Escribe la cantidad: **72 km/h**.', 'Multiplica por factores que valen 1: (1 000 m / 1 km) y (1 h / 3 600 s).', 'Los km y las h se cancelan: 72 × 1 000 ÷ 3 600.', '= 72 000 ÷ 3 600 = **20 m/s**. (Atajo: km/h ÷ 3.6 = m/s).']),
      ex('**65 mph** → 65 × 1.609 = **104.6 km/h**. **95 °F** → (95 − 32) × 5/9 = **35 °C**. **5 galones** → 5 × 3.785 ≈ **18.9 L**.', 'Para viajar o comprar'),
    ], 'Pon arriba la unidad que quieres y abajo la que quieres eliminar.', 'Factores'),

    gen('Conversiones del sistema métrico', 'Usa los factores de la tabla', 'conversion', 5, 'Práctica: métrico'),
    gen('Rapidez', 'km/h ↔ m/s', 'rapidez', 4, 'Práctica: rapidez'),
    gen('Temperatura', '°F a °C', 'temperatura', 4, 'Práctica: temperatura'),
    gen('Otras unidades', 'Pulgadas, millas, galones y libras', 'imperial', 4, 'Práctica: otros sistemas'),

    lesson('Notación científica', 'Para números muy grandes o muy pequeños', [
      def('Notación científica', '**a × 10ⁿ** con **1 ≤ a < 10** y n entero. Si el número es grande, n es positivo; si es muy pequeño, n es negativo.'),
      tbl(['Decimal', 'Notación científica', 'Cómo'], [['45 000', '4.5 × 10⁴', 'el punto se mueve 4 lugares a la izquierda'], ['0.00032', '3.2 × 10⁻⁴', 'el punto se mueve 4 lugares a la derecha'], ['150 000 000 km', '1.5 × 10⁸ km', 'distancia Tierra–Sol'], ['0.00007 m', '7 × 10⁻⁵ m', 'grosor de un cabello']]),
      steps('Multiplicar (3 × 10³)(2 × 10⁴)', ['Multiplica los números: 3 × 2 = **6**.', 'Suma los exponentes: 3 + 4 = **7**.', 'Resultado: **6 × 10⁷**.', 'Si el número queda fuera de 1 ≤ a < 10, ajusta: 20 × 10⁸ = **2 × 10⁹**.']),
      it('Dividir', 'Se dividen los números y se **restan** los exponentes: (8 × 10⁶) ÷ (4 × 10²) = **2 × 10⁴**.'),
    ], 'Mantén siempre el primer número entre 1 y 10.', 'Notación científica'),

    gen('Notación científica', 'Escribe así: 4.5x10^3', 'cientifica', 5, 'Práctica: notación científica'),

    lesson('Razón y proporción al medir', 'Escala, densidad y rapidez', [
      it('Rapidez', 'distancia ÷ tiempo (km/h, m/s).'),
      it('Densidad', 'masa ÷ volumen (g/cm³). 270 g en 100 cm³ → **2.7 g/cm³**.'),
      it('Escala', 'En un mapa **1 : 50 000**, 1 cm equivale a 50 000 cm (500 m). 4 cm → 4 × 50 000 = 200 000 cm = **2 km**.'),
      ex('3 L de pintura cubren 24 m². Para 60 m²: 3/24 = x/60 → x = **7.5 L**.', 'Proporción directa'),
    ], 'Todas son razones; se resuelven con proporciones.', 'Razón y proporción'),

    gen('Escala de mapas', 'Convierte cm del mapa a km reales', 'escala', 4, 'Práctica: escala'),
    gen('Densidad', 'masa ÷ volumen', 'densidad', 4, 'Práctica: densidad'),

    mc('Situaciones reales', 'Viajes y compras internacionales', [
      ['En EE. UU. el límite es 55 mph y tú vas a 90 km/h. ¿Lo superas?', ['No: 90 < 55', 'Sí: 55 mph ≈ 88.5 km/h', 'Es exactamente igual'], 1, '55 × 1.609 ≈ 88.5 km/h. Como 90 > 88.5, lo superas.'],
      ['¿Cuántos litros son 10 galones?', ['≈ 37.9 L', '≈ 2.6 L', '≈ 10 L'], 0, '10 × 3.785 = 37.85 L.'],
      ['¿Cuál es la notación científica de 0.0004?', ['4 × 10⁴', '4 × 10⁻⁴', '0.4 × 10⁻³'], 1, 'El punto se mueve 4 lugares a la derecha: 4 × 10⁻⁴ (y el primer número debe estar entre 1 y 10).'],
      ['El mapa tiene escala 1 : 25 000. 8 cm del mapa son…', ['2 km', '20 km', '200 m'], 0, '8 × 25 000 = 200 000 cm = 2 km.'],
    ], 'Situaciones'),

    write('Explícalo', 'Por qué importan las unidades comunes', 'Explica por qué es importante usar **unidades comunes** al comprar o viajar a otro país y da un ejemplo con una conversión.', [['Habla de unidades o medidas', 'unidad|medida|sistema|conversion'], ['Incluye un ejemplo con números', '\\d'], ['Explica la importancia', 'importante|evita|error|confusion|entender|comparar|mismo|igual']], 3, 'Ejemplo: millas vs. kilómetros al ver un límite de velocidad.', 'Actividad: unidades'),

    lesson('Resumen del módulo', 'Lo esencial de medición', [
      md('- **Medir** = comparar con un patrón. **SI:** m, kg, s, K, A, mol, cd.\n- **Prefijos:** G 10⁹ · M 10⁶ · k 10³ · c 10⁻² · m 10⁻³ · µ 10⁻⁶ · n 10⁻⁹.\n- **Conversión:** multiplica por un factor igual a 1. km/h ÷ 3.6 = m/s.\n- **Notación científica:** a × 10ⁿ, 1 ≤ a < 10. Multiplicar: suma exponentes; dividir: resta.\n- **Rapidez** = d/t · **Densidad** = m/V · **Escala** 1 : N.'),
    ], 'Ya puedes resolver tu caso práctico.', 'Resumen'),

    practica({
      t: 'Caso práctico: conversión al viajar o comprar', sub: 'Evidencia de la actividad de evaluación 1.6.1 · vale el 20 % del curso',
      intro: 'Vas a **viajar** a un país donde se usan millas, galones, libras y °F (por ejemplo, EE. UU.) o vas a **comprar por internet** productos de ese país. Resuelve un caso práctico con conversiones.',
      mat: 'Cuaderno u hojas, calculadora, mapa o internet; puede hacerse en documento digital.',
      steps: ['**Planea el caso** (viaje o compra) y descríbelo en 5 renglones.', '**Distancia y rapidez:** convierte al menos 3 distancias (millas → km) y 2 límites de velocidad (mph → km/h).', '**Combustible o líquidos:** convierte galones a litros y calcula el costo por litro en pesos.', '**Peso y tallas:** convierte libras y onzas a kg o g (límite de equipaje o peso de un producto).', '**Temperatura:** convierte 5 temperaturas de °F a °C (clima del destino).', '**Compra internacional:** elige un producto con medidas en pulgadas o libras y precio en dólares; calcula el **precio por unidad SI** (por kg o por litro) y compáralo con un producto local.', '**Notación científica:** expresa al menos dos cantidades grandes o pequeñas de tu caso (por ejemplo, la distancia total en metros).', '**Razón o proporción:** resuelve al menos un problema con escala de mapa, rapidez o ajuste de cantidades.', 'Incluye una **tabla con todos los factores de conversión** que usaste y una **conclusión**: ¿qué conversión te fue más difícil y por qué conviene usar unidades comunes?'],
      deliver: 'Reporte del caso (PDF, documento o fotos) con tablas, procedimientos y conclusión.',
      rubric: [['Conversiones', 'Correctas con factores y procedimiento', 'Algunos errores', 'Incorrectas'], ['Notación científica', 'Bien aplicada', 'Errores leves', 'No la usa'], ['Razón y proporción', 'Planteadas y resueltas', 'Incompletas', 'Ausentes'], ['Análisis y presentación', 'Claro, ordenado, con tabla de factores', 'Incompleto', 'Desordenado']],
    }),
  ],
};
