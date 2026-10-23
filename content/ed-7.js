import { lesson, def, ex, ana, warn, it, tbl, steps, words, alt, mc, match, guia } from '../js/mk.js';

export default {
  id: 'ed-7', unit: 'EDIEMS 7', title: 'Conoce tu límite', sub: 'Operaciones con fracciones, deudas y el CAT', minutes: 55,
  goals: [
    '**Sumar y restar** fracciones (igual y diferente denominador).',
    '**Multiplicar y dividir** fracciones.',
    'Usar fracciones para analizar **deudas y créditos**.',
  ],
  pages: [
    lesson('Suma y resta de fracciones', 'Primero, partes del mismo tamaño', [
      words([['Numerador', 'el de **arriba**: cuántas partes tomas'], ['Denominador', 'el de **abajo**: en cuántas partes se divide el entero (nunca 0)'], ['CAT', '**Costo Anual Total**: el costo real de un crédito en % anual (incluye intereses y comisiones)']]),
      it('Mismo denominador', 'Suma o resta los de arriba y deja el de abajo: 3/8 + 2/8 = **5/8**.'),
      it('Diferente denominador', 'Busca un denominador común (el **MCM**), convierte y luego suma: 3/12 + 6/8 → MCM = 24 → 6/24 + 18/24 = 24/24 = **1**.'),
      steps('3/5 + 8/3', ['Denominador común: 5 × 3 = **15**.', '3/5 = **9/15** (×3 arriba y abajo).', '8/3 = **40/15** (×5 arriba y abajo).', '9/15 + 40/15 = **49/15**.']),
      ex('2/3 + 1/4 = (2×4 + 1×3)/(3×4) = (8 + 3)/12 = **11/12**', 'Método cruzado'),
      warn('**Nunca** sumes los denominadores: 1/2 + 1/3 **no** es 2/5. Es 3/6 + 2/6 = **5/6**. Y siempre **simplifica** al final.', 'Error típico'),
    ], 'Para sumar o restar, primero el mismo denominador.', 'Suma y resta'),

    lesson('Multiplicación y división', 'Más fácil de lo que parece', [
      it('Multiplicar', 'Arriba por arriba y abajo por abajo: (3/5)(2/7) = **6/35**.'),
      it('Dividir', 'Multiplica por el **recíproco** (voltea la segunda): 3/4 ÷ 1/2 = 3/4 × 2/1 = 6/4 = **3/2**.'),
      it('Signos', 'Igual que con enteros: (4/3) × (−3/2) = **−2**.'),
      it('Fracción de una cantidad', '7/10 de $100 000 = 100 000 × 7 ÷ 10 = **$70 000**.'),
      ex('Alejandra debe **$100 000**. 7/10 es capital y el resto (**3/10**) intereses.<br>Le perdonan 1/2 + 1/5 = 5/10 + 2/10 = **7/10** → paga solo **3/10 = $30 000**.<br>En 5 pagos: 30 000 ÷ 5 = **$6 000** cada mes, que es (3/10) ÷ 5 = **3/50** de la deuda.', 'Estrategias de alivio'),
      ex('El límite sano de deuda es **3/10** del sueldo y una persona paga **45/100**. Exceso: 45/100 − 30/100 = 15/100 = **3/20** del sueldo.', 'Nivel de endeudamiento'),
      def('Interés diario', 'Si el CAT es 50/100 anual, al día es 50 ÷ 365 ≈ **0.137 %**; con 130/100 es ≈ **0.356 %**. Conviene el CAT **más bajo**.'),
    ], 'Multiplicar: directo. Dividir: voltea la segunda y multiplica.', 'Por y entre'),

    guia('Practica con ayuda', 'Fracciones paso a paso', [
      { q: '3/8 + 2/8 = ? (escribe a/b)', mode: 'fs', ans: [5, 8], hint: 'Mismo denominador: suma los de arriba.', ok: '5/8.' },
      { q: '3/5 + 8/3 = ?', mode: 'fs', ans: [49, 15], hint: '9/15 + 40/15', ok: '49/15.' },
      { q: '45/100 − 3/10 = ? (simplificada)', mode: 'fs', ans: [3, 20], hint: '45/100 − 30/100 = 15/100; simplifica entre 5.', ok: '3/20 del sueldo excede el límite.' },
      { q: '(3/5) × (2/7) = ?', mode: 'fs', ans: [6, 35], hint: 'Arriba por arriba, abajo por abajo.', ok: '6/35.' },
      { q: '3/4 ÷ 1/2 = ? (simplificada)', mode: 'fs', ans: [3, 2], hint: '3/4 × 2/1 = 6/4', ok: '3/2.' },
      { q: '¿Cuánto es 7/10 de $100 000?', ans: 70000, hint: '100 000 × 7 ÷ 10', ok: '$70 000.' },
      { q: 'Alejandra pagará $30 000 en 5 pagos iguales. ¿Cuánto cada mes?', ans: 6000, hint: '30 000 ÷ 5', ok: '$6 000.' },
    ], 'Fracciones así: 3/4 (simplificadas).', 'Con ayuda: fracciones'),

    mc('Repaso rápido', 'Fracciones', [
      ['1/2 + 1/3 = ?', ['2/5', '5/6', '1/6', '2/6'], 1, '3/6 + 2/6 = 5/6.'],
      ['5/6 − 1/4 = ?', ['4/2', '7/12', '1/3', '4/10'], 1, '10/12 − 3/12 = 7/12.'],
      ['(2/3) × (9/4) = ?', ['18/7', '3/2', '11/7', '6/12'], 1, '18/12 = 3/2.'],
      ['(5/8) ÷ (5/2) = ?', ['1/4', '25/16', '4', '10/40'], 0, '5/8 × 2/5 = 10/40 = 1/4.'],
      ['Gastas 2/5 de tu sueldo en renta y 1/4 en comida. ¿Qué fracción gastas en total?', ['3/9', '13/20', '3/20', '2/20'], 1, '8/20 + 5/20 = 13/20.'],
      ['Con un sueldo de $12 000, ¿cuánto es el límite sano de deuda (3/10)?', ['$3 000', '$3 600', '$4 000', '$1 200'], 1, '12 000 × 3 ÷ 10 = 3 600.'],
      ['¿Qué tarjeta conviene: CAT 50 % o CAT 130 %?', ['CAT 130 %', 'CAT 50 %', 'Son iguales', 'Depende del color'], 1, 'Menor CAT = menor costo total del crédito.'],
      ['¿Cuál es el recíproco de 3/7?', ['−3/7', '7/3', '3/7', '1/7'], 1, 'Se voltea: 7/3.'],
    ]),
  ],
};
