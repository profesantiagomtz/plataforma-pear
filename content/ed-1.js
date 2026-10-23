import { lesson, def, ex, ana, warn, it, tbl, steps, words, alt, mc, match, guia } from '../js/mk.js';

export default {
  id: 'ed-1', unit: 'EDIEMS 1', title: 'Presupuesto: mis ingresos y mis gastos', sub: 'Números enteros: lo que entra (+) y lo que sale (−)', minutes: 50,
  goals: [
    'Representar **ingresos con +** y **gastos con −**.',
    'Sumar, restar, multiplicar y dividir **números enteros** con la **ley de los signos**.',
    'Calcular el **saldo** de un presupuesto familiar.',
  ],
  pages: [
    lesson('Lo que entra y lo que sale', 'El presupuesto familiar con números enteros', [
      words([['Ingreso', 'dinero que **entra** (sueldo, regalo, venta). Se escribe con **+**'], ['Gasto (egreso)', 'dinero que **sale** (luz, comida, transporte). Se escribe con **−**'], ['Saldo', 'lo que queda: **ingresos − gastos**'], ['Número entero', 'números sin decimales, positivos, negativos y el cero: … −3, −2, −1, 0, 1, 2, 3 …']]),
      ana('Piensa en tu cartera 👛: si te dan $50 escribes **+50**; si gastas $30 escribes **−30**. Al final sumas todo: +50 − 30 = **+20**. Te quedan $20.', '👛 Con tu cartera'),
      def('Presupuesto', 'Es una lista de **ingresos (+)** y **gastos (−)** de un periodo (semana, quincena, mes). Si el saldo es **positivo** te sobra dinero; si es **negativo** te falta.'),
      ex('Una familia gana **$2 650 por quincena** cada papá. En un mes hay **2 quincenas**: 2 × 2 650 = 5 300 por persona → **5 300 + 5 300 = $10 600** de ingreso mensual.', 'Ejemplo de la guía'),
      tbl(['Gasto mensual', 'Cuenta', 'Total'], [['Gas, luz, internet, gasolina', '500 + 243 + 580 + 1 500', '−2 823'], ['Transporte escolar (3 niños)', '3 × 350', '−1 050'], ['Alimentos', '', '−4 000'], ['Croquetas (2 kg)', '2 × 94', '−188'], ['Ahorro semanal (4 semanas)', '4 × 500', '−2 000'], ['**Total de gastos**', '', '**−10 061**']]),
      ex('Saldo del mes: **10 600 − 10 061 = $539** (positivo: sí alcanza y sobra un poco).', 'Saldo'),
    ], 'Ingresos con +, gastos con −, y al final sumas todo.', 'Presupuesto'),

    lesson('La ley de los signos', 'Reglas para no equivocarte con los negativos', [
      it('Sumar con el **mismo signo**', 'Se suman y se deja el signo: −8 − 5 = **−13**; 7 + 4 = **11**.'),
      it('Sumar con **signos distintos**', 'Se **restan** y se deja el signo del que tenga más valor: −8 + 5 = **−3**; 12 − 4 = **8**.'),
      it('Restar un negativo', 'Restar un negativo es **sumar**: 6 − (−4) = 6 + 4 = **10**.'),
      tbl(['Multiplicar o dividir', 'Resultado'], [['(+) por (+)', '**+**'], ['(−) por (−)', '**+**'], ['(+) por (−)', '**−**'], ['(−) por (+)', '**−**']]),
      ex('(−3)(−4) = **+12** · (−15) ÷ 3 = **−5** · 6 × (−2) = **−12**', 'Ejemplos'),
      warn('Signos **iguales** dan **+**; signos **diferentes** dan **−**. ¡Esto solo es para multiplicar y dividir!', 'Truco'),
      alt('Imagina una línea de números: sumar es **caminar a la derecha** ➡️ y restar es **caminar a la izquierda** ⬅️. Si estás en −8 y caminas 5 a la derecha, llegas a −3.'),
    ], 'Signos iguales = +, signos diferentes = − (al multiplicar o dividir).', 'Ley de signos'),

    guia('Practica con ayuda', 'El presupuesto de la familia', [
      { q: 'Cada papá gana **$2 650 por quincena**. ¿Cuánto gana **uno** al mes (2 quincenas)? (solo el número)', ans: 5300, hint: '2 × 2 650', ok: '$5 300 cada uno.' },
      { q: '¿Cuál es el **ingreso total** de la familia al mes (mamá + papá)?', ans: 10600, hint: '5 300 + 5 300', ok: '$10 600.' },
      { q: 'El transporte escolar cuesta **$350 por niño** y son **3 niños**. ¿Cuánto pagan al mes?', ans: 1050, hint: '3 × 350', ok: '$1 050.' },
      { q: 'Los gastos del mes suman **$10 061**. ¿Cuál es el **saldo** (ingresos − gastos)?', ans: 539, hint: '10 600 − 10 061', ok: 'Les quedan $539.' },
      { q: 'La verificación del carro cuesta **$890**. Si solo tienen $539, ¿cuánto les **falta**?', ans: 351, hint: '890 − 539', ok: 'Les faltan $351. Podrían reducir gastos o ahorrar antes.' },
    ], 'Escribe solo el número (sin $ ni comas).', 'Con ayuda: presupuesto'),

    guia('Practica con ayuda', 'Cuentas con signos', [
      { q: 'Erick tenía **$50**, gastó **$30** en un coctel y luego recibió **$20**. ¿Cuánto tiene? (50 − 30 + 20)', ans: 40, hint: 'Ingresos: 50 + 20 = 70. Gastos: 30. 70 − 30.', ok: '$40.' },
      { q: 'Yoselyn tiene **$2 000**. Gasta 450, deposita 850, paga 1 200 y 650, retira 100 y gasta 350. ¿Cuál es su saldo final?', ans: 100, hint: 'Ingresos: 2 000 + 850 = 2 850. Gastos: 450 + 1 200 + 650 + 100 + 350 = 2 750.', ok: '2 850 − 2 750 = $100.' },
      { q: 'En la mañana hacía **−4 °C** y en la tarde **7 °C**. ¿Cuántos grados subió la temperatura?', ans: 11, hint: '7 − (−4) = 7 + 4', ok: 'Subió 11 grados.' },
      { q: '(−6) × (−5) = ?', ans: 30, hint: 'Signos iguales dan +.', ok: '+30.' },
      { q: '(−48) ÷ 6 = ?', ans: -8, hint: 'Signos diferentes dan −.', ok: '−8.' },
    ], 'Puedes escribir negativos con el signo menos, por ejemplo -8.', 'Con ayuda: signos'),

    mc('Repaso rápido', 'Números enteros', [
      ['¿Cuál es el resultado de −12 + 7?', ['−19', '−5', '5', '19'], 1, 'Signos distintos: 12 − 7 = 5 y queda el signo del 12 (−).'],
      ['¿Cuál es el resultado de −9 − 6?', ['−15', '−3', '3', '15'], 0, 'Mismo signo: se suman y queda −.'],
      ['¿Cuál es el resultado de 8 − (−5)?', ['3', '−13', '13', '−3'], 2, 'Restar un negativo es sumar: 8 + 5.'],
      ['(−7)(4) es igual a…', ['28', '−28', '11', '−11'], 1, 'Signos diferentes → negativo.'],
      ['Carlos debe $25 a Ana y Ana le debe $5 a David. Si cada quien paga lo que debe, ¿cuál es el saldo de Ana? (recibe 25, paga 5)', ['+20', '−20', '+30', '+5'], 0, '+25 − 5 = +20: Ana queda con saldo a favor.'],
      ['Un buzo está a −18 m y sube 7 m. ¿A qué profundidad queda?', ['−25 m', '−11 m', '11 m', '25 m'], 1, '−18 + 7 = −11.'],
      ['Una cuenta tenía $1 200, se cobraron $1 500. ¿Cómo queda el saldo?', ['+300', '−300', '+2 700', '0'], 1, '1 200 − 1 500 = −300 (se debe dinero).'],
      ['(−36) ÷ (−4) = ?', ['−9', '9', '−32', '40'], 1, 'Signos iguales → positivo: 9.'],
    ]),

    match('Actividad', 'Relaciona cada situación con su número entero', [
      ['Me pagaron $300 por un trabajo', '+300', 'Ingreso → positivo'],
      ['Pagué $300 de luz', '−300', 'Gasto → negativo'],
      ['No gané ni gasté', '0', 'Ni positivo ni negativo'],
      ['Un estacionamiento a 3 pisos bajo tierra', '−3', 'Abajo del nivel del suelo'],
      ['Ahorré $150 esta semana', '+150', 'Dinero que guardas para ti'],
    ]),
  ],
};
