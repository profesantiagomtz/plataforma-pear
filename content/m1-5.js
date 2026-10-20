import { lesson, def, ex, ana, warn, it, p, md, img, flow, tiles, tbl, steps, words, vis, alt, viz, match, mc, order, cloze, gen, guia, write, practica } from '../js/mk.js';

export default {
  id: 'm1-5', unit: '1.5', title: 'Potenciación y radicación', sub: 'Multiplicar lo mismo varias veces (potencias) y su operación contraria (raíces)', minutes: 120, weight: 10,
  goals: [
    'Entender qué es una **potencia** (base y exponente) y calcularla.',
    'Usar las **reglas de los exponentes** para ahorrarte cuentas.',
    'Entender el **exponente negativo** y el **cero**.',
    'Calcular **raíces cuadradas** y saber que es la operación contraria de elevar al cuadrado.',
  ],
  pages: [
    lesson('¿Qué es una potencia?', 'Una forma corta de escribir «multiplicar lo mismo varias veces»', [
      words([['Potencia', 'multiplicar un número por sí mismo varias veces'], ['Base', 'el número que se multiplica (el de abajo, grande)'], ['Exponente', 'cuántas veces se multiplica (el chiquito arriba)']]),
      img('assets/lessons/1-5-potencias.svg', 'Partes de una potencia y cuadrados'),
      vis([['2', '×', '2', '×', '2', '=', '8']], 'Eso se escribe **2³** y se lee «2 elevado a la 3». La base es 2, el exponente es 3, y la potencia es 8.'),
      ana('Una bacteria se **duplica** cada hora 🦠: después de 3 horas hay 2 × 2 × 2 = **8** bacterias. En vez de escribir 2 × 2 × 2, escribes **2³**. ¡Las potencias ahorran escritura!', '🦠 Ejemplo'),
      viz('power', '🎛️ Cambia la base y el exponente y mira el resultado'),
    ], 'aⁿ es multiplicar a por sí mismo n veces.', 'Qué es una potencia'),

    guia('Practica con ayuda', 'Calcula una potencia', [
      { q: '**3²** significa 3 × 3. ¿Cuánto es?', mode: 'n', ans: 9, hint: '3 veces 3.', ok: '3² = 9 (se dice «3 al cuadrado»).' },
      { q: '**2³** significa 2 × 2 × 2. Primero 2 × 2 = ?', mode: 'n', ans: 4, hint: 'Dos por dos.', ok: '2 × 2 = 4.' },
      { q: 'Ahora multiplica ese 4 por el último 2. ¿Cuánto es 2³?', mode: 'n', ans: 8, hint: '4 × 2.', ok: '2³ = 8.' },
      { q: '**10²** = 10 × 10. ¿Cuánto es?', mode: 'n', ans: 100, hint: 'Diez por diez.', ok: '100.' },
    ], 'Multiplica poco a poco.', 'Con ayuda: potencias'),

    lesson('Casos especiales', 'Exponente 1, exponente 0 y números negativos', [
      it('Exponente 1', 'No cambia nada: **7¹ = 7** (multiplicas 7 una sola vez).'),
      it('Exponente 0', 'Cualquier número (menos 0) elevado a 0 vale **1**: **7⁰ = 1**. Es una regla especial.'),
      def('Números negativos', 'Con base negativa: exponente **par** → resultado **positivo**; exponente **impar** → resultado **negativo**.'),
      tbl(['Cuenta', 'Se hace', 'Resultado'], [['(−2)²', '(−2) × (−2)', '+4'], ['(−2)³', '(−2) × (−2) × (−2)', '−8'], ['(−3)²', '(−3) × (−3)', '+9']]),
      warn('Los **paréntesis** importan: **(−3)² = 9**, pero **−3² = −9** (aquí solo el 3 se eleva al cuadrado y luego se cambia el signo).', 'Cuidado con los paréntesis'),
      alt('Cuenta los signos negativos: si hay un número **par** de ellos (2, 4…), se cancelan en parejas y queda **+**. Si es **impar**, sobra uno y queda **−**.', '🤔 ¿Por qué par = positivo?'),
    ], 'Con exponente 1: no cambia · con exponente 0: da 1 · negativos: par (+), impar (−).', 'Casos especiales'),

    gen('Ahora tú solo: calcula potencias', 'Cuidado con los paréntesis y los signos', 'potencia', 5, 'Tú solo: potencias'),

    lesson('Reglas de los exponentes', 'Atajos para no hacer tantas cuentas', [
      words([['Misma base', 'cuando los números de abajo son iguales, como 2³ y 2⁴']]),
      ana('**2³ × 2⁴** significa (2·2·2) × (2·2·2·2). Cuenta cuántos 2 hay en total: **3 + 4 = 7**. Así que 2³ × 2⁴ = **2⁷**. Por eso, al multiplicar con la misma base, **se suman los exponentes**.', '🔍 ¿Por qué funciona?'),
      tbl(['Regla', 'Cómo se escribe', 'Ejemplo'], [['Multiplicar, misma base', 'se **suman** los exponentes', '2³ · 2⁴ = 2⁷ = 128'], ['Dividir, misma base', 'se **restan** los exponentes', '5⁶ ÷ 5⁴ = 5² = 25'], ['Potencia de potencia', 'se **multiplican** los exponentes', '(3²)³ = 3⁶ = 729'], ['Producto elevado', 'cada uno se eleva', '(2 · 5)³ = 8 · 125 = 1 000']]),
      alt('Resumen para no confundirte: **× → sumas · ÷ → restas · potencia de potencia → multiplicas**. Siempre con la **misma base**.', '🤔 Truco para memorizar'),
    ], 'Misma base: × suma, ÷ resta, potencia de potencia multiplica.', 'Reglas'),

    guia('Practica con ayuda', 'Usa las reglas', [
      { q: '**2³ × 2²**. Misma base 2, ¿qué haces con los exponentes 3 y 2?', mode: 'sel', opts: ['Los sumo', 'Los resto', 'Los multiplico'], ans: 'Los sumo', hint: 'Al multiplicar con la misma base, se suman los exponentes.', ok: 'Se suman.' },
      { q: 'Entonces 3 + 2 = ?  Es el exponente de 2³ × 2² = 2^?', mode: 'n', ans: 5, hint: '3 + 2.', ok: '2⁵.' },
      { q: '**5⁶ ÷ 5⁴**. ¿Qué haces con 6 y 4?', mode: 'sel', opts: ['Los sumo', 'Los resto', 'Los multiplico'], ans: 'Los resto', hint: 'Al dividir con la misma base, se restan.', ok: 'Se restan.' },
      { q: 'Entonces 5⁶ ÷ 5⁴ = 5^?', mode: 'n', ans: 2, hint: '6 − 4.', ok: '5².' },
    ], 'Primero decide la regla.', 'Con ayuda: reglas'),

    gen('Ahora tú solo: encuentra el exponente', 'Aplica la regla correcta', 'reglasExp', 5, 'Tú solo: reglas'),

    match('Simplifica con las reglas', 'Une cada expresión con su resultado', [
      ['3⁵ · 3²', '3⁷'], ['7⁹ ÷ 7⁶', '7³'], ['(2³)²', '2⁶'], ['4³ · 4⁻¹', '4²'], ['(5 · 2)²', '100'], ['10⁰', '1'],
    ], ['3⁷', '7³', '2⁶', '4²', '100', '1'], 'Tú solo: reglas'),

    lesson('Exponentes negativos', 'No hacen negativo el número: lo vuelven fracción', [
      def('Exponente negativo', '**a⁻ⁿ = 1 ÷ aⁿ**. El exponente negativo **no** vuelve negativo al número: lo convierte en **una fracción**.'),
      vis([['2³ = 8'], ['2² = 4'], ['2¹ = 2'], ['2⁰ = 1'], ['2⁻¹ = ½'], ['2⁻² = ¼']], 'Mira el patrón: cada vez que bajas el exponente, **divides entre 2**. ¡Por eso sigue 1/2, 1/4, 1/8…!'),
      ex('2⁻³ = 1/2³ = **1/8** · 10⁻² = 1/100 = **0.01** · (1/3)⁻² = 3² = **9**.'),
      ana('10⁻³ es **un milímetro** respecto a un metro (1/1 000). Los exponentes negativos describen cantidades **muy chiquitas**.', '🔬 Dónde se usan'),
    ], 'Exponente negativo = voltear: se vuelve fracción.', 'Exponentes negativos'),

    guia('Practica con ayuda', 'Exponentes negativos', [
      { q: 'El patrón: 2² = 4, 2¹ = 2, 2⁰ = 1. ¿Cuánto es 2⁻¹ (la mitad de 1)? (escribe a/b)', mode: 'fs', ans: [1, 2], hint: 'Cada paso hacia abajo divides entre 2. De 1 a la mitad.', ok: '2⁻¹ = 1/2.' },
      { q: '¿Y 2⁻²? (la mitad de 1/2) (escribe a/b)', mode: 'fs', ans: [1, 4], hint: 'La mitad de 1/2 es…', ok: '2⁻² = 1/4.' },
      { q: '**10⁻²** = 1 ÷ 10². ¿Cuánto es 10²?', mode: 'n', ans: 100, hint: '10 × 10.', ok: '100.' },
      { q: 'Entonces 10⁻² = 1/100 = ¿cuánto en decimal?', mode: 'n', ans: 0.01, hint: 'Un centésimo.', ok: '0.01.' },
    ], 'Sigue el patrón.', 'Con ayuda: negativos'),

    gen('Ahora tú solo: exponentes negativos', 'Escribe fracciones como a/b', 'negativo', 4, 'Tú solo: exponentes negativos'),

    lesson('La raíz cuadrada', 'La operación contraria de elevar al cuadrado', [
      words([['Raíz cuadrada (√)', 'el número que, multiplicado por sí mismo, da el número de adentro'], ['Radicando', 'el número que está dentro de la raíz'], ['Cuadrado perfecto', 'un número que tiene raíz exacta, como 9 (porque 3 × 3 = 9)']]),
      def('Raíz cuadrada', '**√9 = 3** porque **3 × 3 = 9**. Preguntas: «¿qué número multiplicado por sí mismo me da 9?».'),
      ana('Un terreno **cuadrado** tiene **9 m²** de área. ¿Cuánto mide cada lado? Un lado × un lado = 9 → el lado es **√9 = 3 m** 📐.', '📐 Con un terreno'),
      tbl(['Cuadrados perfectos', 'Su raíz'], [['1, 4, 9, 16, 25', '1, 2, 3, 4, 5'], ['36, 49, 64, 81, 100', '6, 7, 8, 9, 10'], ['121, 144, 169, 196, 225', '11, 12, 13, 14, 15']]),
      ex('¿Entre qué enteros está **√20**? 4² = 16 y 5² = 25. Como 20 está entre 16 y 25, **4 < √20 < 5**.', 'Estimar una raíz'),
      warn('La raíz cuadrada de un número **negativo** no existe en los números reales (nadie multiplicado por sí mismo da −4).'),
    ], 'Si no es cuadrado perfecto, la raíz es irracional: √2 ≈ 1.414.', 'Raíz cuadrada'),

    guia('Practica con ayuda', 'Raíces cuadradas', [
      { q: '**√25**. ¿Qué número multiplicado por sí mismo da 25?', mode: 'n', ans: 5, hint: 'Prueba: 4 × 4 = 16, 5 × 5 = ?', ok: '5 × 5 = 25, así que √25 = 5.' },
      { q: '**√81**. ¿Qué número por sí mismo da 81?', mode: 'n', ans: 9, hint: 'Piensa en la tabla del 9.', ok: '9 × 9 = 81.' },
      { q: 'Un cuadrado tiene **49 cm²** de área. ¿Cuánto mide cada lado?', mode: 'n', ans: 7, hint: 'Es √49.', ok: '7 cm.' },
      { q: '¿Entre qué números está **√20**? Sabemos que 4² = 16 y 5² = 25.', mode: 'sel', opts: ['3 y 4', '4 y 5', '5 y 6'], ans: '4 y 5', hint: '20 está entre 16 y 25.', ok: 'Entre 4 y 5.' },
    ], 'Piensa: ¿qué por sí mismo?', 'Con ayuda: raíces'),

    gen('Ahora tú solo: calcula raíces', 'Cuadrados perfectos', 'raiz', 5, 'Tú solo: raíces'),
    gen('Ahora tú solo: ¿entre qué enteros está?', 'Estima la raíz', 'entre', 4, 'Tú solo: estimar'),

    lesson('Potencia y raíz se «cancelan»', 'Como sumar y restar', [
      it('(√a)² = a', 'Si sacas la raíz y luego elevas al cuadrado, regresas al mismo número: (√13)² = **13**.'),
      it('√(a²) = a', 'Si elevas al cuadrado y luego sacas la raíz, también: √(5²) = **5**.'),
      def('Simplificar una raíz', '**√(a × b) = √a × √b**. Sirve para sacar fuera los cuadrados perfectos: **√72 = √36 × √2 = 6√2**.'),
      steps('Simplificar √50', ['Busca el cuadrado perfecto más grande que **divide** a 50: es **25**.', '50 = 25 × 2.', '√50 = √25 × √2 = 5 × √2.', 'Resultado: **5√2** (se lee «cinco raíz de dos»).']),
      alt('Esto de simplificar radicales es un **reto extra** 🌟. Si te cuesta, concéntrate primero en raíces exactas (√25, √81…) y vuelve aquí después.', '🤔 ¿Esto es difícil?'),
    ], 'Potencia y raíz se cancelan.', 'Cancelación'),

    match('Reto 🌟: simplifica radicales', 'Une cada raíz con su forma simplificada', [['√18', '3√2'], ['√50', '5√2'], ['√75', '5√3'], ['√98', '7√2'], ['√8', '2√2'], ['√12', '2√3']], ['3√2', '5√2', '5√3', '7√2', '2√2', '2√3'], 'Reto: radicales'),

    mc('Repaso rápido', 'Elige la respuesta', [
      ['¿Cuánto vale (−2)⁴?', ['−16', '16', '8'], 1, 'Exponente par → resultado positivo: 16.'],
      ['2⁻³ es igual a…', ['−8', '1/8', '−6'], 1, 'a⁻ⁿ = 1/aⁿ.'],
      ['¿Cuál es verdadera?', ['√(9 + 16) = 3 + 4', '√(9 + 16) = 5', '√(9 + 16) = 25'], 1, '√25 = 5. La raíz de una suma no es la suma de las raíces.'],
      ['5⁶ ÷ 5⁴ =', ['5²', '5¹⁰', '5²⁴'], 0, 'Misma base: se restan los exponentes.'],
    ], 'Repaso'),

    lesson('Potencias y raíces en la vida real', 'Crecimiento, redes sociales y áreas', [
      ex('Una bacteria se duplica cada hora: en 6 horas hay 2⁶ = **64** por cada una del inicio.', '🦠 Crecimiento'),
      ex('Un mensaje se reenvía a 3 personas nuevas en cada ronda: en la ronda 4 lo reciben 3⁴ = **81** personas.', '📱 Redes sociales'),
      ex('Un cuadrado de 169 cm² de área tiene lado √169 = **13 cm** y perímetro **52 cm**.', '📐 Geometría'),
    ], 'Las potencias describen crecimiento rápido.', 'Aplicaciones'),

    write('Tu situación', 'Inventa un problema con potencias o raíces', 'Inventa un problema real (redes sociales, crecimiento, áreas…) que se resuelva con una **potencia** o con una **raíz** y resuélvelo.', [['Incluye potencia o raíz', 'potencia|raiz|cuadrad|cubo|exponente|\\^|\\d ?x ?\\d'], ['Incluye números', '\\d'], ['Da un resultado', 'resultado|son|hay|mide|vale|=|total']], 3, 'Por ejemplo: un video se comparte con 4 personas en cada ronda.', 'Tú solo: invéntalo'),

    lesson('Resumen del módulo', 'Lo más importante', [
      md('- **aⁿ** = a multiplicado n veces · a¹ = a · a⁰ = 1 · a⁻ⁿ = 1/aⁿ.\n- **× misma base:** suma exponentes · **÷:** resta · **potencia de potencia:** multiplica.\n- **√a = b** si b × b = a · (√a)² = a.\n- Base negativa: exponente par → +, impar → −.'),
    ], 'Ya puedes crear tu problemario.', 'Resumen'),

    practica({
      t: 'Problemario con situaciones reales', sub: 'Tu evidencia: vale el 10 % del curso',
      intro: 'Vas a **inventar un problemario** (un librito de problemas) con situaciones de la vida real que usen fracciones, porcentajes, potencias, raíces y proporciones.',
      mat: 'Cuaderno u hojas, calculadora, colores; puede hacerse en un documento digital.',
      ejemplo: '**Contexto:** tu cuenta de TikTok 📱.<br>**Problema (potencias):** subes un video y cada persona que lo ve lo comparte con 3 personas nuevas. ¿Cuántas personas lo reciben en la ronda 4?<br>**Solución:** 3⁴ = 3 × 3 × 3 × 3 = **81 personas**.<br>**Problema (raíz):** un cuadrado de un mural tiene 49 m² de área. ¿Cuánto mide cada lado? **√49 = 7 m**.',
      steps: ['**Elige un contexto** que conozcas: tu colonia, un deporte, un negocio familiar, redes sociales, cocina, construcción…', '**Inventa mínimo 10 problemas** originales: 2 con fracciones, 2 con porcentajes o proporciones, 2 con potencias, 2 con raíces, 1 con exponentes negativos y 1 que use que potencia y raíz se cancelan.', 'Para cada problema escribe: **la situación, los datos, el procedimiento completo y la respuesta con unidades**.', 'Pon **un dibujo o esquema** en al menos 3 problemas.', '**Coevaluación:** intercambia tu problemario con un compañero, resuélvelo y anota si les salieron los mismos resultados.', 'Corrige y entrega la **versión final** con portada y soluciones.'],
      deliver: 'Tu problemario en PDF, documento o fotos ordenadas, con portada y soluciones.',
      rubric: [['Variedad de temas', 'Incluye todos los pedidos', 'Falta uno', 'Faltan varios'], ['Situaciones reales', 'Originales y realistas', 'Poco realistas', 'Sin contexto'], ['Procedimientos y resultados', 'Correctos y completos', 'Algunos errores', 'Incorrectos'], ['Presentación y coevaluación', 'Ordenado, con dibujos y revisión', 'Incompleto', 'Desordenado']],
    }),
  ],
};
