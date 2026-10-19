import { lesson, def, ex, ana, warn, it, p, md, img, flow, tiles, tbl, steps, viz, match, mc, order, cloze, gen, write, practica } from '../js/mk.js';

export default {
  id: 'm1-5', unit: '1.5', title: 'Potenciación y radicación', sub: 'Exponentes, reglas, exponentes negativos y raíz cuadrada', minutes: 95, weight: 10,
  goals: [
    'Identificar **base, exponente y potencia** y calcular potencias.',
    'Aplicar las **reglas de los exponentes**, incluido el exponente negativo.',
    'Calcular y **simplificar raíces cuadradas**.',
    'Usar potencias y raíces como **operaciones inversas**.',
  ],
  pages: [
    lesson('¿Qué es una potencia?', 'Multiplicar el mismo número varias veces', [
      img('assets/lessons/1-5-potencias.svg', 'Partes de una potencia y cuadrados'),
      def('Potencia', '**aⁿ = a × a × … × a** (n veces). **a** es la **base**, **n** es el **exponente** y el resultado es la **potencia**.'),
      viz('power', '🎛️ Cambia la base y el exponente'),
      it('a¹', 'El exponente 1 no cambia nada: a¹ = a.'),
      it('a⁰', 'Cualquier número (distinto de 0) elevado a 0 vale **1**.'),
      warn('**(−3)² = 9** pero **−3² = −9**. Sin paréntesis solo el 3 se eleva al cuadrado y después se cambia el signo.', 'Cuidado con los signos'),
      md('**Regla del signo:** base negativa con exponente **par** → resultado **positivo**; con exponente **impar** → **negativo**.'),
    ], 'aⁿ es multiplicar a por sí mismo n veces.', 'Potencias'),

    gen('Calcula potencias', 'Cuidado con los paréntesis y los signos', 'potencia', 5, 'Práctica: potencias'),

    lesson('Reglas de los exponentes', 'Atajos para simplificar', [
      tbl(['Regla', 'Fórmula', 'Ejemplo'], [['Producto, misma base', 'aᵐ · aⁿ = aᵐ⁺ⁿ', '2³ · 2⁴ = 2⁷ = 128'], ['Cociente, misma base', 'aᵐ ÷ aⁿ = aᵐ⁻ⁿ', '5⁶ ÷ 5⁴ = 5² = 25'], ['Potencia de potencia', '(aᵐ)ⁿ = aᵐ·ⁿ', '(3²)³ = 3⁶ = 729'], ['Producto elevado', '(a · b)ⁿ = aⁿ · bⁿ', '(2 · 5)³ = 8 · 125 = 1 000'], ['Cociente elevado', '(a ÷ b)ⁿ = aⁿ ÷ bⁿ', '(6 ÷ 2)² = 36 ÷ 4 = 9']]),
      ana('2³ · 2⁴ = (2·2·2)·(2·2·2·2) = 2·2·2·2·2·2·2 = **2⁷**. Por eso los exponentes se **suman**.', '¿Por qué funciona?'),
    ], 'Misma base: se suman (·), se restan (÷) o se multiplican (potencia de potencia).', 'Reglas'),

    gen('Aplica las reglas', 'Encuentra el exponente que falta', 'reglasExp', 5, 'Práctica: reglas'),

    match('Simplifica con las reglas', 'Une cada expresión con su resultado', [
      ['3⁵ · 3²', '3⁷'], ['7⁹ ÷ 7⁶', '7³'], ['(2³)²', '2⁶'], ['4³ · 4⁻¹', '4²'], ['(5 · 2)²', '100'], ['10⁰', '1'],
    ], ['3⁷', '7³', '2⁶', '4²', '100', '1'], 'Actividad: reglas'),

    lesson('Exponentes negativos', 'El inverso multiplicativo de la base', [
      def('Exponente negativo', '**a⁻ⁿ = 1 ÷ aⁿ**  y  **(a/b)⁻ⁿ = (b/a)ⁿ**. Un exponente negativo **no** vuelve negativo al número: lo convierte en una fracción.'),
      ex('2⁻³ = 1/2³ = **1/8** · 10⁻² = 1/100 = **0.01** · (1/3)⁻² = 3² = **9**.'),
      steps('Calcular (2³ · 2⁻¹)²', ['Misma base dentro del paréntesis: 3 + (−1) = 2 → 2².', 'Queda (2²)².', 'Potencia de potencia: 2 × 2 = 4 → 2⁴.', '2⁴ = **16**.']),
      ana('10⁻³ es un milímetro respecto a un metro (1/1 000). Los exponentes negativos describen cantidades **muy pequeñas**.', '🔬 Dónde se usan'),
    ], 'Exponente negativo = inverso, no número negativo.', 'Exponentes negativos'),

    gen('Exponentes negativos', 'Escribe fracciones como a/b', 'negativo', 4, 'Práctica: exponentes negativos'),

    lesson('La raíz cuadrada', 'La operación contraria a elevar al cuadrado', [
      def('Raíz cuadrada', '**√a = b** si b² = a (con b ≥ 0). **Partes:** √ es el signo radical, **a** el **radicando**, **b** la **raíz** y el **índice** es 2 (no se escribe).'),
      tbl(['Cuadrados perfectos', ''], [['1, 4, 9, 16, 25, 36, 49, 64, 81, 100', '√ = 1, 2, 3, 4, 5, 6, 7, 8, 9, 10'], ['121, 144, 169, 196, 225', '√ = 11, 12, 13, 14, 15']]),
      warn('La raíz cuadrada de un número **negativo** no existe en los números reales (√−4 no es real).'),
      ex('¿Entre qué enteros está **√20**? 4² = 16 y 5² = 25, así que **4 < √20 < 5**.', 'Estimar'),
      ana('Si un terreno cuadrado tiene 9 m² de área, su lado mide √9 = **3 m**.', '📐 Con áreas'),
    ], 'Si no es cuadrado perfecto, la raíz es irracional: √2 ≈ 1.414.', 'Raíz cuadrada'),

    gen('Calcula raíces', 'Cuadrados perfectos', 'raiz', 5, 'Práctica: raíces'),
    gen('Entre qué enteros', 'Estima la raíz', 'entre', 4, 'Práctica: estimar'),

    lesson('Potencias y raíces se cancelan', 'Operaciones inversas', [
      it('(√a)² = a', 'Elevar al cuadrado deshace la raíz: (√13)² = **13**.'),
      it('√(a²) = a', 'La raíz deshace el cuadrado (con a ≥ 0): √(5²) = **5**.'),
      def('Propiedad del producto', '**√(a · b) = √a · √b**. Sirve para simplificar: **√72 = √(36 · 2) = 6√2**.'),
      steps('Simplificar √50', ['Busca el mayor cuadrado perfecto que divida a 50: **25**.', '50 = 25 · 2.', '√50 = √25 · √2 = 5 · √2.', 'Resultado: **5√2**.']),
    ], 'Potencia y raíz son como suma y resta: se cancelan.', 'Cancelación'),

    match('Simplifica radicales', 'Une cada raíz con su forma simplificada', [['√18', '3√2'], ['√50', '5√2'], ['√75', '5√3'], ['√98', '7√2'], ['√8', '2√2'], ['√12', '2√3']], ['3√2', '5√2', '5√3', '7√2', '2√2', '2√3'], 'Actividad: radicales'),

    mc('Repaso rápido', 'Cuatro preguntas', [
      ['¿Cuánto vale (−2)⁴?', ['−16', '16', '8'], 1, 'Exponente par → resultado positivo: 16.'],
      ['2⁻³ es igual a…', ['−8', '1/8', '−6'], 1, 'a⁻ⁿ = 1/aⁿ.'],
      ['¿Cuál es verdadera?', ['√(9 + 16) = 3 + 4', '√(9 + 16) = 5', '√(9 + 16) = 25'], 1, '√25 = 5. La raíz de una suma no es la suma de las raíces.'],
      ['5⁶ ÷ 5⁴ =', ['5²', '5¹⁰', '5²⁴'], 0, 'Misma base: se restan los exponentes.'],
    ], 'Repaso'),

    lesson('Potencias y raíces en la vida real', 'Crecimiento, áreas y cantidades pequeñas', [
      ex('Una bacteria se duplica cada hora: después de 6 horas hay 2⁶ = **64** por cada una inicial.', 'Crecimiento'),
      ex('Un mensaje se reenvía a 3 personas nuevas en cada ronda: en la ronda 4 lo reciben 3⁴ = **81** personas.', 'Redes sociales'),
      ex('Un cuadrado de 169 cm² de área tiene lado √169 = **13 cm** y perímetro **52 cm**.', 'Geometría'),
    ], 'Las potencias describen crecimiento rápido; las raíces regresan al «tamaño original».', 'Aplicaciones'),

    write('Tu situación', 'Inventa un problema con potencias o raíces', 'Inventa un problema con un contexto real (redes sociales, crecimiento, áreas…) que se resuelva con una **potencia** o con una **raíz** y resuélvelo.', [['Incluye potencia o raíz', 'potencia|raiz|cuadrad|cubo|exponente|\\^|\\d ?x ?\\d'], ['Incluye números', '\\d'], ['Da un resultado', 'resultado|son|hay|mide|vale|=|total']], 3, 'Por ejemplo: un video se comparte con 4 personas en cada ronda.', 'Actividad: invéntalo'),

    lesson('Resumen del módulo', 'Lo esencial de potencias y raíces', [
      md('- **aⁿ** = a multiplicada n veces · a¹ = a · a⁰ = 1 · a⁻ⁿ = 1/aⁿ.\n- **Producto:** aᵐ·aⁿ = aᵐ⁺ⁿ · **cociente:** aᵐ÷aⁿ = aᵐ⁻ⁿ · **potencia de potencia:** (aᵐ)ⁿ = aᵐⁿ.\n- **√a = b** si b² = a · (√a)² = a · √(ab) = √a·√b.\n- Base negativa: exponente par → +, impar → −.'),
    ], 'Ya puedes crear tu problemario.', 'Resumen'),

    practica({
      t: 'Problemario contextualizado', sub: 'Evidencia de la actividad de evaluación 1.5.1 · vale el 10 % del curso',
      intro: 'Elabora un **problemario** con problemas contextualizados que integren fracciones, porcentajes, potencias, raíces cuadradas, equivalencias, simplificación, proporciones, exponentes negativos y la relación inversa entre potencias y raíces.',
      mat: 'Cuaderno u hojas, calculadora, colores; puede hacerse en documento digital.',
      steps: ['**Elige un contexto** que conozcas: tu colonia, un deporte, un negocio familiar, redes sociales, cocina, construcción…', '**Inventa mínimo 10 problemas** originales: 2 con fracciones y simplificación, 2 con porcentajes o proporciones, 2 con potencias, 2 con raíces cuadradas, 1 con exponentes negativos y 1 con la relación inversa potencia–raíz.', 'Para cada problema escribe: **contexto, datos, procedimiento completo y respuesta con unidades**.', 'Agrega **una ilustración o esquema** en al menos 3 problemas.', '**Coevaluación:** intercambia tu problemario con un compañero, resuélvelo y anota si los resultados coinciden.', 'Corrige y entrega la **versión final** con portada y soluciones.'],
      deliver: 'Problemario en PDF, documento o fotos ordenadas, con portada y soluciones.',
      rubric: [['Variedad de temas', 'Incluye todos los requeridos', 'Falta uno', 'Faltan varios'], ['Contextualización', 'Problemas originales y realistas', 'Poco realistas', 'Descontextualizados'], ['Procedimientos y resultados', 'Correctos y completos', 'Algunos errores', 'Incorrectos'], ['Presentación y coevaluación', 'Ordenado, con ilustraciones y revisión', 'Incompleto', 'Desordenado']],
    }),
  ],
};
