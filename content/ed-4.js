import { lesson, def, ex, ana, warn, it, tbl, steps, words, alt, mc, match, guia } from '../js/mk.js';

export default {
  id: 'ed-4', unit: 'EDIEMS 4', title: 'Las propiedades en las finanzas personales', sub: 'Conmutativa, asociativa y distributiva', minutes: 50,
  goals: [
    'Reconocer las propiedades **conmutativa, asociativa y distributiva**.',
    'Usarlas para hacer cuentas de compras y descuentos **más rápido**.',
  ],
  pages: [
    lesson('Las tres propiedades', 'El "código de conducta" de los números', [
      def('Conmutativa', 'El **orden** no cambia el resultado (en suma y multiplicación): **a + b = b + a** · **a × b = b × a**. Ej.: 15 + 8 = 8 + 15 = 23; 3 × 7 = 7 × 3 = 21.'),
      def('Asociativa', 'La forma de **agrupar** (paréntesis) no cambia el resultado: **(a + b) + c = a + (b + c)** · **(a × b) × c = a × (b × c)**. Ej.: (2 + 10) + 20 = 2 + (10 + 20) = 32.'),
      def('Distributiva', 'Multiplicar por una suma es multiplicar **cada sumando**: **a × (b + c) = a×b + a×c**. Ej.: 4 × (6 + 9) = 4×6 + 4×9 = 24 + 36 = 60.'),
      warn('La resta y la división **NO** son conmutativas: 10 − 4 ≠ 4 − 10 y 12 ÷ 3 ≠ 3 ÷ 12.', 'Cuidado'),
      tbl(['Propiedad', 'Palabra clave', 'En tus finanzas'], [['Conmutativa', '**Orden**', 'Sumar la lista del súper en cualquier orden'], ['Asociativa', '**Agrupar**', 'Agrupar gastos por día o por tipo'], ['Distributiva', '**Repartir el ×**', 'Aplicar un descuento a cada producto o al total']]),
    ], 'Orden → conmutativa · Agrupar → asociativa · Repartir el × → distributiva.', 'Propiedades'),

    lesson('Las compras de Diego', 'Las propiedades en acción', [
      ex('Diego compra ropa **$1 300**, electrónicos **$1 250**, alimentos **$1 200** e higiene **$1 150**.<br>**Conmutativa:** 1 300 + 1 250 + 1 200 + 1 150 = 1 250 + 1 150 + 1 300 + 1 200 = **$4 900**.<br>**Asociativa:** (1 300 + 1 250) + (1 200 + 1 150) = 2 550 + 2 350 = **$4 900**.', 'Precio original'),
      ex('Promoción: **15 %** en ropa y electrónicos (pagas 0.85) y **10 %** en alimentos e higiene (pagas 0.9).<br>**Distributiva:** 0.85 × (1 300 + 1 250) + 0.9 × (1 200 + 1 150) = 2 167.5 + 2 115 = **$4 282.50**<br>Producto por producto da lo mismo: 1 105 + 1 062.5 + 1 080 + 1 035 = **$4 282.50**.', 'Con descuento'),
      ex('Paula compra $120, $80 y $100 con 10 % de descuento:<br>0.9 × (120 + 80 + 100) = 0.9 × 300 = **$270** = 108 + 72 + 90.', 'Otro ejemplo'),
    ], 'Distribuir el descuento producto por producto o aplicarlo al total da lo mismo.', 'Diego'),

    guia('Practica con ayuda', 'Calcula usando las propiedades', [
      { q: '3 × (4 + 7) = 3×4 + 3×7 = ?', ans: 33, hint: '12 + 21', ok: '33 (distributiva).' },
      { q: '9 × (15 − 6) = 9×15 − 9×6 = ?', ans: 81, hint: '135 − 54', ok: '81.' },
      { q: '(5 × 3) × 10 = 5 × (3 × 10) = ?', ans: 150, hint: '5 × 30', ok: '150 (asociativa).' },
      { q: 'Una familia de **4** paga **$350** cada uno de un plan de música. 4 × 350 = 350 × 4 = ?', ans: 1400, hint: 'El orden no importa.', ok: '$1 400 (conmutativa).' },
      { q: 'Paula: 0.9 × (120 + 80 + 100) = ?', ans: 270, hint: '0.9 × 300', ok: '$270.' },
      { q: '¿Qué propiedad usaste en (2 + 5) + 8 = 2 + (5 + 8)?', mode: 'sel', opts: ['Conmutativa', 'Asociativa', 'Distributiva'], ans: 'Asociativa', hint: 'Solo cambiaron los paréntesis.', ok: 'Asociativa.' },
    ], 'Escribe solo números.', 'Con ayuda: propiedades'),

    match('Actividad', '¿Qué propiedad se usó?', [
      ['7 + 13 = 13 + 7', 'Conmutativa', 'Cambió el orden'],
      ['(7 + 13) + 5 = 7 + (13 + 5)', 'Asociativa', 'Cambiaron los paréntesis'],
      ['3 × (4 + 7) = 3×4 + 3×7', 'Distributiva', 'Se repartió el 3'],
      ['6 × 8 × 2 = 8 × 2 × 6', 'Conmutativa', 'Cambió el orden'],
      ['(7 + 3) × 4 = 7×4 + 3×4', 'Distributiva', 'Se repartió el 4'],
      ['5 × (3 × 10) = (5 × 3) × 10', 'Asociativa', 'Cambiaron los paréntesis'],
    ], ['Conmutativa', 'Asociativa', 'Distributiva']),

    mc('Repaso rápido', 'Verdadero o falso', [
      ['La propiedad conmutativa permite cambiar el orden de los precios sin alterar el total.', ['Verdadero', 'Falso'], 0, 'Sí: a + b = b + a.'],
      ['La propiedad conmutativa cambia el resultado si alteras el orden de una suma.', ['Verdadero', 'Falso'], 1, 'No cambia nada; por eso es útil.'],
      ['La distributiva sirve para aplicar un descuento a cada producto por separado.', ['Verdadero', 'Falso'], 0, '0.9 × (a + b) = 0.9a + 0.9b.'],
      ['La resta es conmutativa: 10 − 3 = 3 − 10.', ['Verdadero', 'Falso'], 1, '10 − 3 = 7 pero 3 − 10 = −7.'],
      ['¿Cuál es igual a 6 × (10 + 2)?', ['6×10 + 2', '6×10 + 6×2', '6 + 10 + 2', '60 × 12'], 1, 'Distributiva: 60 + 12 = 72.'],
      ['Luis ahorra 20 %, paga renta 40 % y reparte el resto en partes iguales entre servicios y diversión, de $4 500. ¿Cuánto va a servicios?', ['$450', '$675', '$900', '$1 800'], 2, 'Queda 40 %; la mitad es 20 % → 4 500 × 0.20 = 900.'],
    ]),
  ],
};
