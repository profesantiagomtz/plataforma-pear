import { lesson, def, ex, ana, warn, it, tbl, steps, words, alt, mc, match, order, guia } from '../js/mk.js';

export default {
  id: 'ed-8', unit: 'EDIEMS 8', title: 'Las afores', sub: 'Jerarquía de operaciones y signos de agrupación', minutes: 50,
  goals: [
    'Aplicar la **jerarquía de las operaciones**.',
    'Resolver signos de agrupación **( ), [ ], { }** de adentro hacia afuera.',
    'Calcular el saldo de una **afore**.',
  ],
  pages: [
    lesson('¿Qué se hace primero?', 'La jerarquía de las operaciones', [
      words([['Afore', '**Administradora de Fondos para el Retiro**: una "alcancía gigante" donde se guarda parte de tu sueldo para cuando te retires'], ['Aportación tripartita', 'la ponen **tú, tu empresa y el gobierno**'], ['Comisión', 'lo que cobra la afore por cuidar e invertir tu dinero'], ['SIEFORE', 'el fondo donde la afore **invierte** tu dinero para que genere rendimientos']]),
      tbl(['Orden', 'Operación'], [['1️⃣', 'Signos de agrupación: primero **( )**, luego **[ ]**, al final **{ }**'], ['2️⃣', 'Potencias y raíces'], ['3️⃣', 'Multiplicaciones y divisiones (de izquierda a derecha)'], ['4️⃣', 'Sumas y restas (de izquierda a derecha)']]),
      ex('500 + 200 × 3 − 50 ÷ 2<br>= 500 + **600** − **25**   (primero × y ÷)<br>= **1 075**', 'Ejemplo'),
      warn('Una calculadora sencilla hace las cuentas **en el orden en que las escribes** y da un resultado equivocado. Una **científica** respeta la jerarquía.', 'Ojo con la calculadora'),
      alt('Recuerda **"PaPoMuDiSuRe"**: **Pa**réntesis, **Po**tencias, **Mu**ltiplicación y **Di**visión, **Su**ma y **Re**sta.', '🤔 Un truco para recordarlo'),
    ], 'Agrupación → potencias → × ÷ → + −.', 'Jerarquía'),

    lesson('El saldo de la afore', 'Las fórmulas usan signos de agrupación', [
      ex('Saldo inicial **$5 000**. Cada mes: $150 (tú) + $300 (empresa) + $50 (gobierno) durante 12 meses. Aportación voluntaria $1 000. Comisión anual $120.<br>5 000 + (150 + 300 + 50) × 12 + 1 000 − 120<br>= 5 000 + 500 × 12 + 1 000 − 120 = 5 000 + 6 000 + 1 000 − 120 = **$11 780**', 'Auditando el año'),
      steps('Dany: {24 000 + [(180 + 60 + 40) × 12] + 5 500 − 140} × 1.096', ['Paréntesis: 180 + 60 + 40 = **280**.', 'Corchetes: 280 × 12 = **3 360**.', 'Llaves: 24 000 + 3 360 + 5 500 − 140 = **32 720**.', 'Rendimiento 9.6 %: 32 720 × 1.096 = **$35 861.12**.']),
      ex('La app de Sergio hizo 8 000 + 500 = 8 500 y luego × 12 = 102 000 − 200 = 101 800. ❌ **Sumó antes de multiplicar.**<br>Correcto: 8 000 + (500 × 12) − 200 = 8 000 + 6 000 − 200 = **$13 800**.', 'Error de la app'),
    ], 'Primero lo de adentro: ( ) → [ ] → { }.', 'Afore'),

    guia('Practica con ayuda', 'Resuelve respetando la jerarquía', [
      { q: '500 + 200 × 3 − 50 ÷ 2 = ?', ans: 1075, hint: '200 × 3 = 600 y 50 ÷ 2 = 25. Luego 500 + 600 − 25.', ok: '1 075.' },
      { q: '8 000 + 500 × 12 − 200 = ?', ans: 13800, hint: 'Primero 500 × 12 = 6 000.', ok: '$13 800 (no 101 800).' },
      { q: '(150 + 300 + 50) × 12 = ?', ans: 6000, hint: 'Paréntesis: 500. Luego × 12.', ok: '$6 000 al año.' },
      { q: '20 − [3 + (8 − 2)] × 2 = ?', ans: 2, hint: '(8 − 2) = 6 → [3 + 6] = 9 → 9 × 2 = 18 → 20 − 18', ok: '2.' },
      { q: '3² + 4 × 5 = ?', ans: 29, hint: 'Potencia: 9. Multiplicación: 20. Suma.', ok: '29.' },
      { q: '{24 000 + [(180 + 60 + 40) × 12] + 5 500 − 140} = ?', ans: 32720, hint: '280 × 12 = 3 360; 24 000 + 3 360 + 5 500 − 140', ok: '32 720. Con el rendimiento: × 1.096 = $35 861.12.' },
    ], 'Escribe solo el número.', 'Con ayuda: jerarquía'),

    order('Actividad', 'Ordena los pasos de la jerarquía', [
      ['Resolver paréntesis ( )'], ['Resolver corchetes [ ]'], ['Resolver llaves { }'], ['Potencias y raíces'], ['Multiplicaciones y divisiones'], ['Sumas y restas'],
    ]),

    mc('Repaso rápido', 'Jerarquía de operaciones', [
      ['2 + 3 × 4 = ?', ['20', '14', '24', '9'], 1, 'Primero 3 × 4 = 12; luego 2 + 12.'],
      ['(2 + 3) × 4 = ?', ['14', '20', '24', '9'], 1, 'Paréntesis primero: 5 × 4.'],
      ['18 ÷ 3 × 2 = ?', ['3', '12', '9', '36'], 1, 'De izquierda a derecha: 6 × 2.'],
      ['10 − 2² × 2 = ?', ['12', '2', '32', '16'], 1, '2² = 4; 4 × 2 = 8; 10 − 8 = 2.'],
      ['5 × [12 − (4 + 2)] = ?', ['30', '50', '6', '60'], 0, '(4 + 2) = 6 → [12 − 6] = 6 → 5 × 6.'],
      ['¿Qué se resuelve primero en {3 + [2 × (5 − 1)]}?', ['3 + 2', '2 × 5', '5 − 1', '{ }'], 2, 'De adentro hacia afuera: el paréntesis.'],
      ['Ahorras $300 al mes durante 12 meses y te cobran $150 de comisión. ¿Qué expresión da tu ahorro?', ['300 + 12 − 150', '(300 × 12) − 150', '300 × (12 − 150)', '300 − 150 × 12'], 1, 'Primero 300 × 12 = 3 600; luego − 150.'],
    ]),
  ],
};
