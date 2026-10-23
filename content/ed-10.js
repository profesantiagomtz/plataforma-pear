import { lesson, def, ex, ana, warn, it, tbl, steps, words, alt, mc, match, guia } from '../js/mk.js';

export default {
  id: 'ed-10', unit: 'EDIEMS 10', title: 'El idioma del dinero', sub: 'Del lenguaje común al lenguaje algebraico', minutes: 50,
  goals: [
    'Representar cantidades desconocidas con **letras (variables)**.',
    '**Traducir** situaciones de dinero a expresiones algebraicas.',
    '**Interpretar** y **evaluar** una expresión.',
  ],
  pages: [
    lesson('Hablar con letras', 'El lenguaje algebraico', [
      def('Lenguaje algebraico', 'Expresar ideas matemáticas con **letras, números y símbolos**. La letra (x, y, n…) representa una cantidad que **no conocemos** o que puede cambiar.'),
      tbl(['Lenguaje común', 'Lenguaje algebraico'], [['Un número más 5', '**x + 5**'], ['Un número menos 30', '**x − 30**'], ['El doble de un número', '**2x**'], ['El triple de un número', '**3x**'], ['La mitad de un número', '**x/2**'], ['La cuarta parte', '**x/4**'], ['El cuadrado de un número', '**x²**'], ['Dos números consecutivos', '**x, x + 1**']]),
      ex('"El ingreso es 5 veces la inversión, pero hay un gasto de 40 pesos" → **5x − 40**', 'Ejemplo de dinero'),
      ex('Sueldo base de **$1 200 semanales** más **$50 por par** de tenis vendido. En un mes (4 semanas): 4(1 200) + 50x = **4 800 + 50x**', 'Sueldo con comisión'),
      warn('"El doble de un número **más** 3" es **2x + 3**, pero "el doble de (un número más 3)" es **2(x + 3)**. ¡Fíjate qué se multiplica!', 'Cuidado'),
    ], 'Lo que no conoces, ponle letra.', 'Lenguaje algebraico'),

    lesson('Interpretar y evaluar', 'Darle valor a la letra', [
      ex('En **2x + 50**: **x** es el valor desconocido, **2x** es el doble de ese valor y **+50** se le agregan 50.', 'Interpretar'),
      steps('Evalúa 2x + 50 cuando x = 100', ['Cambia la x por 100: 2(100) + 50.', 'Multiplica: 200 + 50.', 'Resultado: **250**.']),
      ex('Ricardo toma un café de **x** pesos **2 días a la semana** durante **3 meses** (4 semanas por mes): (2)(4)(3)x = **24x**. Si el café cuesta $35: 24 × 35 = **$840**.', 'Evaluar'),
      alt('Piensa en la letra como una **cajita vacía** 📦: cuando sabes cuánto vale, metes el número en la cajita y haces la cuenta.', '🤔 ¿Cómo lo imagino?'),
    ], 'Para evaluar, cambia la letra por el número y respeta la jerarquía.', 'Evaluar'),

    match('Actividad', 'Une cada situación con su expresión', [
      ['El papá de José le da dinero y su mamá le da $50 más', 'x + 50', 'Una cantidad más 50'],
      ['Édgar cobra por un dibujo y gasta $30 en un helado', 'x − 30', 'Le quitas 30'],
      ['Alfonso recibe doble pago por entregar antes', '2x', 'El doble'],
      ['Paola se queda con la mitad de la rifa más 30 pesos', 'x/2 + 30', 'La mitad más 30'],
      ['Mariana gana 3 veces lo que invierte', '3x', 'El triple'],
    ]),

    guia('Practica con ayuda', 'Traduce y evalúa', [
      { q: 'El costo de los postres es la inversión más 20 pesos de empaque.', mode: 'sel', opts: ['x + 20', '20x', 'x − 20', 'x/20'], ans: 'x + 20', hint: '"Más" es suma.', ok: 'x + 20.' },
      { q: 'Francisco reparte las ganancias entre 4 socios.', mode: 'sel', opts: ['4x', 'x/4', 'x − 4', 'x + 4'], ans: 'x/4', hint: '"Repartir entre" es dividir.', ok: 'x/4.' },
      { q: 'Ingreso: 5 veces la inversión menos un gasto de 40.', mode: 'sel', opts: ['5 + x − 40', '5x − 40', '40 − 5x', '5(x − 40)'], ans: '5x − 40', hint: '5 veces x = 5x; luego menos 40.', ok: '5x − 40.' },
      { q: 'Evalúa **2x + 50** si x = 100.', ans: 250, hint: '2(100) + 50', ok: '250.' },
      { q: 'Vendes tenis: **4 800 + 50x**. ¿Cuánto ganas en el mes si vendes **30 pares**?', ans: 6300, hint: '50 × 30 = 1 500; 4 800 + 1 500', ok: '$6 300.' },
      { q: 'Café: **24x**. Si cada café cuesta $35, ¿cuánto gasta Ricardo?', ans: 840, hint: '24 × 35', ok: '$840.' },
    ], 'Elige la expresión o escribe el número.', 'Con ayuda: traducir'),

    mc('Repaso rápido', 'Lenguaje algebraico', [
      ['"El triple de un número disminuido en 7"', ['3(x − 7)', '3x − 7', '7 − 3x', 'x³ − 7'], 1, 'Primero el triple (3x) y luego le quitas 7.'],
      ['"La mitad de un número más 8"', ['x/2 + 8', '(x + 8)/2', '2x + 8', 'x + 8/2'], 0, 'La mitad del número y luego +8.'],
      ['"La suma de dos números consecutivos"', ['x + x', 'x + (x + 1)', '2x + 2', 'x(x + 1)'], 1, 'Consecutivos: x y x + 1.'],
      ['"El cuadrado de un número"', ['2x', 'x²', 'x + 2', '√x'], 1, 'Cuadrado = elevar a la 2.'],
      ['Si x = 6, ¿cuánto vale 3x − 4?', ['14', '22', '2', '18'], 0, '3(6) − 4 = 18 − 4 = 14.'],
      ['Un plan de celular cobra $199 al mes más $2 por cada MB extra (m). ¿Qué expresión da el pago?', ['199m + 2', '199 + 2m', '201m', '2(199 + m)'], 1, 'Fijo 199 y 2 por cada MB.'],
      ['En 4x + 10, ¿qué representa el 4?', ['El valor desconocido', 'El coeficiente: cuántas veces se toma x', 'Una cantidad fija que se suma', 'El exponente'], 1, 'Es el coeficiente de x.'],
    ]),
  ],
};
