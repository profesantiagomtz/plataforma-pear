import { lesson, def, ex, ana, warn, it, tbl, steps, words, alt, mc, match, guia } from '../js/mk.js';

export default {
  id: 'ed-9', unit: 'EDIEMS 9', title: 'El crecimiento del dinero y su organización', sub: 'Leyes de los exponentes', minutes: 55,
  goals: [
    'Identificar **base** y **exponente** de una potencia.',
    'Aplicar las leyes de **multiplicación, división y potencia de una potencia**.',
    'Saber **cuándo sí y cuándo no** se pueden juntar potencias en sumas y restas.',
  ],
  pages: [
    lesson('¿Qué es una potencia?', 'Multiplicar el mismo número varias veces', [
      words([['Base', 'el número (o letra) que se **multiplica** por sí mismo'], ['Exponente', 'el numerito de arriba: **cuántas veces** se multiplica la base'], ['Coeficiente', 'el número que va **adelante**: en 5a³ es el 5']]),
      ex('2⁵ = 2 × 2 × 2 × 2 × 2 = **32** · En **5a³** la base es **a**, el exponente **3** y el coeficiente **5**.', 'Ejemplo'),
      ana('Si empiezas con **$100** y tu dinero se **duplica** cada mes, después de 5 meses tienes 100 × 2 × 2 × 2 × 2 × 2 = 100 × 2⁵ = **$3 200**. ¡Las potencias crecen muy rápido! 🚀', '💰 Dinero que se duplica'),
      warn('2³ **no** es 2 × 3. Es 2 × 2 × 2 = **8**.', 'Error típico'),
    ], 'El exponente dice cuántas veces se multiplica la base.', 'Potencias'),

    lesson('Las leyes de los exponentes', 'Atajos para no escribir todo', [
      tbl(['Ley', 'Regla', 'Ejemplo'], [['Multiplicación (misma base)', '**Se suman** los exponentes', '2³ · 2² = 2⁵ = 32 · x³ · x² = x⁵'], ['División (misma base)', '**Se restan** los exponentes', '5⁶ / 5² = 5⁴ = 625 · x⁶ / x² = x⁴'], ['Potencia de una potencia', '**Se multiplican** los exponentes', '(3²)³ = 3⁶ = 729 · (x²)³ = x⁶'], ['Exponente cero', 'Todo número (≠ 0) a la 0 vale **1**', '5⁰ = 1 (porque 5/5 = 1)']]),
      tbl(['Suma y resta', 'Ejemplo', '¿Se juntan?'], [['Misma base y mismo exponente', '2³ + 2³ = 8 + 8 = **16** = 2(2³)', '✅ Sí'], ['Iguales restados', '3⁴ − 3⁴ = **0**', '✅ Sí'], ['Exponentes distintos', '2³ + 2⁴ = 8 + 16 = **24**', '❌ No: se calcula cada una'], ['Con letras, semejantes', 'x³ + x³ = **2x³** · 5a² − 5a² = **0**', '✅ Sí'], ['Con letras, no semejantes', 'x² + x³', '❌ No se simplifica']]),
      warn('En **sumas y restas** los exponentes **NO se suman**. 2³ + 2³ es 16 (no 2⁶ = 64).', 'El error de Sofía'),
    ], 'Multiplicar → suma exponentes · Dividir → resta · Potencia de potencia → multiplica.', 'Leyes'),

    guia('Practica con ayuda', 'Aplica las leyes', [
      { q: '2⁴ × 2² = 2^? (escribe el exponente)', ans: 6, hint: 'Misma base al multiplicar: suma 4 + 2.', ok: '2⁶.' },
      { q: '¿Cuánto vale 2⁶?', ans: 64, hint: '2 × 2 × 2 × 2 × 2 × 2', ok: '64.' },
      { q: '5⁶ ÷ 5⁴ = ? (el valor)', ans: 25, hint: 'Resta exponentes: 5² = 25.', ok: '25.' },
      { q: '(3²)³ = 3^? (exponente)', ans: 6, hint: 'Multiplica 2 × 3.', ok: '3⁶ = 729.' },
      { q: '4² + 4² = ?', ans: 32, hint: '16 + 16', ok: '32 = 2(4²).' },
      { q: '3² + 3⁵ = ?', ans: 252, hint: 'Exponentes distintos: 9 + 243.', ok: '252.' },
      { q: 'x⁴ · x³ = ?', mode: 'sel', opts: ['x⁷', 'x¹²', '2x⁷', 'x¹'], ans: 'x⁷', hint: 'Suma los exponentes.', ok: 'x⁷.' },
      { q: 'm⁶/m² + m² = ?', mode: 'sel', opts: ['m⁴ + m²', 'm⁶', '2m⁴', 'm⁸'], ans: 'm⁴ + m²', hint: 'm⁶/m² = m⁴; m⁴ y m² no son semejantes.', ok: 'm⁴ + m² (no se simplifica más).' },
    ], 'Escribe solo el número.', 'Con ayuda: exponentes'),

    match('Actividad', 'Relaciona cada expresión con su resultado', [
      ['b³ · b⁵', 'b⁸', 'Se suman: 3 + 5'],
      ['y⁷ / y²', 'y⁵', 'Se restan: 7 − 2'],
      ['a² + a²', '2a²', 'Términos semejantes'],
      ['(x²)³', 'x⁶', 'Se multiplican: 2 × 3'],
      ['7³ − 7³', '0', 'Iguales restados'],
      ['x² + x³', 'No se simplifica', 'Exponentes distintos'],
    ]),

    mc('Repaso rápido', 'Exponentes', [
      ['¿Cuánto vale 3⁴?', ['12', '81', '64', '7'], 1, '3 × 3 × 3 × 3 = 81.'],
      ['a⁵ · a³ = ?', ['a¹⁵', 'a⁸', 'a²', '2a⁸'], 1, 'Se suman: 5 + 3.'],
      ['x¹⁰ / x⁴ = ?', ['x⁶', 'x¹⁴', 'x^2.5', 'x⁴⁰'], 0, 'Se restan: 10 − 4.'],
      ['(2³)² = ?', ['2⁵ = 32', '2⁶ = 64', '2⁹', '4³'], 1, 'Se multiplican: 3 × 2 = 6.'],
      ['¿Cuánto vale 7⁰?', ['0', '7', '1', '70'], 2, 'Todo número distinto de 0 elevado a 0 vale 1.'],
      ['2³ + 2³ = ?', ['2⁶ = 64', '16', '4³', '12'], 1, '8 + 8 = 16. En sumas NO se suman exponentes.'],
      ['$500 que se duplican cada año durante 3 años quedan en…', ['$1 500', '$3 000', '$4 000', '$2 000'], 2, '500 × 2³ = 500 × 8 = 4 000.'],
    ]),
  ],
};
