import { lesson, def, ex, ana, warn, it, p, md, img, flow, tiles, tbl, steps, viz, match, mc, order, cloze, gen, write, practica } from '../js/mk.js';

export default {
  id: 'm1-4', unit: '1.4', title: 'Fracciones y porcentajes', sub: 'Unidad, equivalencias, operaciones, proporciones y porcentajes', minutes: 100, weight: 10,
  goals: [
    'Entender la **unidad** y representar fracciones.',
    'Simplificar, amplificar y **comparar** fracciones.',
    'Sumar, restar, multiplicar y dividir **fracciones**.',
    'Resolver problemas con **proporciones** y **porcentajes** (descuentos y aumentos).',
  ],
  pages: [
    lesson('La unidad y la fracción', 'Partir un entero en partes iguales', [
      flow([['🍕', 'La unidad|(un entero)'], ['✂️', 'Se divide en b|partes iguales'], ['🥣', 'Se toman a|de esas partes'], ['➗', 'Fracción a/b']], 'De la unidad a la fracción'),
      def('Fracción a/b', 'La unidad se divide en **b partes iguales** (denominador) y se toman **a** de ellas (numerador).'),
      viz('frac', '🎛️ Mueve los controles y observa la fracción'),
      tbl(['Tipo', 'Condición', 'Ejemplo'], [['Propia', 'numerador < denominador (vale menos que 1)', '3/4'], ['Impropia', 'numerador ≥ denominador', '11/4'], ['Mixta', 'entero + fracción propia', '2 3/4']]),
      ex('**Mixta → impropia:** 2 3/4 = (2 × 4 + 3)/4 = 11/4.  **Impropia → mixta:** 11 ÷ 4 = 2 y sobran 3 → 2 3/4. Un entero también es fracción: 5 = 5/1 = 10/2.'),
    ], 'El denominador dice en cuántas partes se partió el entero.', 'La fracción'),

    lesson('Fracciones equivalentes', 'Amplificar y simplificar', [
      img('assets/lessons/1-4-fracciones.svg', 'Barras de fracciones equivalentes y porcentaje'),
      it('Amplificar', 'Multiplicar numerador y denominador por el mismo número: 2/3 = 4/6 = 6/9.'),
      it('Simplificar', 'Dividir ambos entre un divisor común. La forma **irreducible** se obtiene dividiendo entre el **MCD**: 18/24 → MCD = 6 → **3/4**.'),
      def('Equivalencia', 'a/b y c/d son equivalentes si **a × d = b × c** (productos cruzados).'),
      steps('Simplificar 36/48', ['MCD(36, 48): 36 = 2² × 3² y 48 = 2⁴ × 3 → MCD = 2² × 3 = **12**.', '36 ÷ 12 = **3**.', '48 ÷ 12 = **4**.', 'Resultado irreducible: **3/4**.']),
    ], 'Cambiar de forma no cambia el valor.', 'Equivalencias'),

    gen('Simplifica fracciones', 'Escribe la fracción irreducible como a/b', 'simplifica', 5, 'Práctica: simplificar'),

    lesson('Comparar fracciones', 'Con productos cruzados', [
      def('Regla', 'a/b **>** c/d si **a × d > b × c**. Se multiplica en cruz y se comparan los resultados.'),
      ex('Comparar **3/5** y **4/7**: 3 × 7 = 21 y 4 × 5 = 20. Como 21 > 20, **3/5 > 4/7**.'),
      ana('Si dos pizzas iguales se parten en 5 y en 7 rebanadas, las rebanadas de 5 son más grandes. Tomar 3 de 5 es más que tomar 4 de 7.'),
    ], 'Multiplica en cruz y compara.', 'Comparar'),

    match('Compara fracciones', 'Elige el signo correcto', [
      ['2/3  ○  3/5', '>'], ['5/8  ○  7/12', '>'], ['4/6  ○  6/9', '='], ['1/3  ○  2/5', '<'], ['7/10  ○  3/4', '<'], ['5/6  ○  4/5', '>'],
    ], ['>', '<', '='], 'Actividad: comparar'),

    lesson('Suma y resta de fracciones', 'Con el mismo y con distinto denominador', [
      it('Mismo denominador', 'Se suman o restan los numeradores: 3/8 + 2/8 = **5/8**.'),
      it('Distinto denominador', 'Se busca el **MCM** de los denominadores y se convierten las fracciones: 1/2 + 1/3 = 3/6 + 2/6 = **5/6**.'),
      steps('Ejemplo: 3/4 − 1/6', ['Denominadores 4 y 6 → MCM = **12**.', '3/4 = 9/12 (× 3) y 1/6 = 2/12 (× 2).', '9/12 − 2/12 = **7/12**.', '7 y 12 no tienen divisores comunes → ya está simplificada.']),
      warn('**No** se suman los denominadores: 1/2 + 1/3 **no** es 2/5.'),
    ], 'Primero iguala los denominadores con el MCM.', 'Suma y resta'),

    gen('Suma y resta', 'Resultado simplificado, como a/b', 'sumaFrac', 5, 'Práctica: sumar y restar'),

    lesson('Multiplicación y división', 'Fácil: arriba con arriba, abajo con abajo', [
      def('Multiplicación', 'Numerador × numerador y denominador × denominador. 2/3 × 3/5 = 6/15 = **2/5**.'),
      def('División', 'Se multiplica por el **inverso** de la segunda fracción. 3/4 ÷ 2/5 = 3/4 × 5/2 = **15/8** = 1 7/8.'),
      ex('**Fracción de una cantidad:** 3/4 de 80 = (80 ÷ 4) × 3 = **60**.'),
    ], 'Dividir entre una fracción es multiplicar por su inverso.', 'Multiplicar y dividir'),

    gen('Multiplica y divide', 'Resultado simplificado, como a/b', 'mulFrac', 5, 'Práctica: × y ÷'),
    gen('Fracción de una cantidad', '¿Cuánto es la fracción de la cantidad?', 'fraccionDe', 4, 'Práctica: fracción de'),

    lesson('Razón y proporción', 'Directa e inversa', [
      def('Razón y proporción', 'Una **razón** compara dos cantidades. Una **proporción** es la igualdad de dos razones: a/b = c/d.'),
      it('Directa', 'Si una cantidad aumenta, la otra también. Se usa la **regla de tres**: 3 kg cuestan $54 → 5 kg cuestan 54 ÷ 3 × 5 = **$90**.'),
      it('Inversa', 'Si una aumenta, la otra **disminuye**. 4 obreros terminan en 12 días → 6 obreros: 4 × 12 ÷ 6 = **8 días**.'),
      ex('Receta para 4 personas: 3/4 de taza de harina. Para 6 personas: 3/4 × 6/4 = 9/8 = **1 1/8 tazas**.', 'En la cocina'),
    ], 'Pregúntate: ¿al aumentar una, la otra sube (directa) o baja (inversa)?', 'Proporciones'),

    gen('Regla de tres', 'Proporción directa', 'reglaTres', 4, 'Práctica: regla de tres'),

    lesson('Porcentaje', 'Una fracción de denominador 100', [
      def('Porcentaje', '**P %** = P/100. Ejemplo: 25 % = 25/100 = 1/4 = 0.25.'),
      tbl(['Quiero…', 'Cómo', 'Ejemplo'], [['El P % de N', 'N × P ÷ 100', '25 % de 240 = 60'], ['¿Qué % es A de N?', 'A ÷ N × 100', '45 de 180 → 25 %'], ['Descuento de P %', 'N × (100 − P) ÷ 100', '$850 con 20 % → $680'], ['Aumento de P %', 'N × (100 + P) ÷ 100', '$400 con 15 % → $460']]),
      steps('Un celular de $4 800 con 15 % de descuento', ['Descuento = 4 800 × 15 ÷ 100 = **$720**.', 'Precio final = 4 800 − 720 = **$4 080**.', 'Atajo: pagas el 85 %: 4 800 × 0.85 = $4 080.']),
    ], 'Para descontar P % pagas (100 − P) %.', 'Porcentaje'),

    gen('Calcula porcentajes', 'El P % de una cantidad', 'porcentaje', 4, 'Práctica: porcentaje'),
    gen('Descuentos y aumentos', 'Precio final', 'descuento', 4, 'Práctica: descuentos'),
    gen('¿Qué porcentaje es?', 'A ÷ N × 100', 'quePorcentaje', 4, 'Práctica: qué %'),

    mc('Problemas del mercado', 'Elige la operación correcta', [
      ['Una camisa de $400 sube 15 %. ¿Cuál es el nuevo precio?', ['$415', '$460', '$340'], 1, '400 × 1.15 = $460.'],
      ['Si 3/4 de una cantidad son 36, ¿cuál es la cantidad?', ['27', '48', '45'], 1, 'Cada cuarto es 12; 4 cuartos = 48.'],
      ['6 trabajadores terminan en 10 días. ¿Cuántos días con 4 trabajadores?', ['6.7 días', '15 días', '12 días'], 1, 'Proporción inversa: 6 × 10 ÷ 4 = 15.'],
      ['¿Qué fracción es equivalente a 30 %?', ['3/10', '1/3', '30/10'], 0, '30/100 = 3/10.'],
    ], 'Problemas'),

    write('Tu propia situación', 'Aplica porcentajes o fracciones', 'Describe una situación de tu vida (compras, descuentos, recetas, propinas, batería del celular…) donde uses un **porcentaje o una fracción** y calcula el resultado.', [['Menciona porcentaje, % o fracción', '%|porcentaje|fraccion|por ciento|\\d/\\d'], ['Incluye una operación o resultado con números', '\\d'], ['Explica lo que significa el resultado', 'pago|paga|quedan|queda|total|resulta|son|es']], 3, 'Ejemplo: descuento del 20 % en unos tenis de $850.', 'Actividad: tu situación'),

    lesson('Resumen del módulo', 'Lo esencial de fracciones y porcentajes', [
      md('- **Simplificar:** divide entre el MCD. **Equivalentes:** a × d = b × c.\n- **Suma/resta:** MCM de los denominadores. **Multiplicar:** arriba × arriba y abajo × abajo. **Dividir:** × el inverso.\n- **Regla de tres directa:** x = (b × c) ÷ a. **Inversa:** producto constante.\n- **P % de N = N × P ÷ 100.** Descuento: N × (100 − P) ÷ 100.'),
    ], 'Ya puedes simular tu mercado.', 'Resumen'),

    practica({
      t: 'Simulación de mercado', sub: 'Evidencia de la actividad de evaluación 1.4.1 · vale el 10 % del curso',
      intro: 'Realiza una simulación de mercado con **proporciones y porcentajes** para calcular precios y descuentos, y analiza datos de consumo con frecuencias y probabilidad.',
      mat: 'Hojas o cuaderno, calculadora, colores; puede hacerse en hoja de cálculo.',
      steps: ['**Monten su mercado** (equipos de 4): elijan 8 productos con precio por unidad o por paquete.', '**Calculen precios con proporciones:** por ejemplo, si una caja de 12 cuesta $84, ¿cuánto cuesta cada pieza? ¿y 5 piezas?', '**Diseñen 3 promociones** (15 % de descuento, 3 × 2, descuento a partir de cierta compra) y calculen el precio final de cada una.', '**Simulen 12 clientes** que compran 3 productos cada uno y registren en una **tabla de frecuencias** cuántas veces se vendió cada producto.', 'Calculen la **frecuencia** como fracción simplificada, decimal y porcentaje; el total vendido en dinero y el porcentaje de ventas de cada producto.', '**Probabilidad:** si llega un cliente nuevo, ¿qué probabilidad hay de que elija el producto más vendido? (veces vendido ÷ total de ventas).', 'Hagan una **gráfica** de barras o circular con los porcentajes.', '**Conclusiones:** ¿qué producto conviene promocionar? ¿qué promoción deja más ganancia y cuál conviene más al cliente?'],
      deliver: 'Reporte (PDF, documento o fotos) con tablas, operaciones, gráfica y conclusiones.',
      rubric: [['Proporciones y porcentajes', 'Correctos y bien explicados', 'Algunos errores', 'Incorrectos'], ['Fracciones y simplificación', 'Simplificadas y equivalentes con % y decimal', 'Sin simplificar', 'Incorrectas'], ['Análisis de datos y probabilidad', 'Tabla, gráfica y probabilidad correctas', 'Falta un elemento', 'Ausente'], ['Conclusiones', 'Fundamentadas en los datos', 'Generales', 'Sin conclusiones']],
    }),
  ],
};
