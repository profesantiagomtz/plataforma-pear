import { lesson, def, ex, ana, warn, it, tbl, steps, words, alt, mc, match, guia } from '../js/mk.js';

export default {
  id: 'ed-2', unit: 'EDIEMS 2', title: 'Salud financiera', sub: 'MCD y MCM: repartir parejo y saber cuándo coinciden los pagos', minutes: 50,
  goals: [
    'Descomponer un número en **factores primos**.',
    'Calcular el **MCD** (máximo común divisor) y el **MCM** (mínimo común múltiplo).',
    'Saber **cuándo usar cada uno** en problemas de dinero.',
  ],
  pages: [
    lesson('¿MCD o MCM?', 'Dos herramientas para organizar tu dinero', [
      words([['Divisor', 'número que cabe **exacto** en otro: 4 es divisor de 12'], ['Múltiplo', 'resultado de multiplicar un número por 1, 2, 3…: múltiplos de 5 → 5, 10, 15…'], ['Número primo', 'solo se divide entre 1 y él mismo: 2, 3, 5, 7, 11, 13…'], ['MCD', '**Máximo Común Divisor**: el número **más grande** que divide a todos'], ['MCM', '**Mínimo Común Múltiplo**: el número **más chico** que es múltiplo de todos']]),
      def('Salud financiera', 'Gastar menos de lo que ganas, tener un presupuesto, ahorrar (un "colchón" de 3 a 6 meses de gastos) y que las deudas **no pasen del 30 %** de tu ingreso.'),
      tbl(['Si el problema dice…', 'Usa'], [['¿**Cada cuándo** coinciden? ¿Cuándo vuelven a juntarse?', '**MCM** (el resultado es **mayor** o igual a los números)'], ['Repartir en partes **iguales**, lo **más grande** posible, sin que sobre', '**MCD** (el resultado es **menor** o igual a los números)']]),
      ana('**MCM = calendario** 📅 (fechas que coinciden). **MCD = repartir** ✂️ (sobres, bolsas, cajas iguales).', '📌 Para no confundirte'),
    ], 'MCM para fechas que coinciden; MCD para repartir parejo.', 'MCD o MCM'),

    lesson('Cómo se calculan', 'Con la descomposición en factores primos', [
      steps('MCD de 24 y 18', ['Divide entre primos: **24 = 2 × 2 × 2 × 3 = 2³ × 3**.', '**18 = 2 × 3 × 3 = 2 × 3²**.', 'Toma solo los factores **comunes** con el **menor** exponente: 2 y 3.', 'MCD = 2 × 3 = **6**.']),
      steps('MCM de 45 y 30', ['**45 = 3² × 5**.', '**30 = 2 × 3 × 5**.', 'Toma **todos** los factores (comunes y no comunes) con el **mayor** exponente: 2, 3², 5.', 'MCM = 2 × 9 × 5 = **90**.']),
      ex('Ana paga internet cada **14** días, celular cada **21** y streaming cada **28**.<br>14 = 2 × 7 · 21 = 3 × 7 · 28 = 2² × 7<br>MCM = 2² × 3 × 7 = **84** → los tres pagos coinciden **cada 84 días**.', 'Pagos que coinciden'),
      ex('Tres estudiantes ahorraron **$240, $360 y $480** y quieren sobres iguales sin que sobre nada.<br>240 = 2⁴×3×5 · 360 = 2³×3²×5 · 480 = 2⁵×3×5<br>MCD = 2³ × 3 × 5 = **120** → sobres de **$120**: 2, 3 y 4 sobres.', 'Repartiendo el ahorro'),
      alt('**Atajo para MCM:** ve escribiendo los múltiplos del número más grande hasta que los demás quepan exacto. Para 10, 15 y 20: 20, 40, **60** ✔ (60 ÷ 10 = 6, 60 ÷ 15 = 4). MCM = 60.', '🤔 ¿Hay una forma más rápida?'),
    ], 'MCD: comunes con menor exponente. MCM: todos con mayor exponente.', 'Cálculo'),

    guia('Practica con ayuda', 'Pagos que coinciden', [
      { q: 'Ana paga cada 14, 21 y 28 días. ¿Qué usas para saber **cada cuántos días coinciden**?', mode: 'sel', opts: ['MCD', 'MCM'], ans: 'MCM', hint: 'Es una pregunta de calendario.', ok: 'MCM.' },
      { q: '¿Cuál es el MCM de 14, 21 y 28?', ans: 84, hint: '2² × 3 × 7', ok: 'Coinciden cada 84 días.' },
      { q: 'Si pagó todo junto el **28 de agosto**, 84 días después es el **__ de noviembre**. (Agosto tiene 31 días, septiembre 30, octubre 31)', ans: 20, hint: 'Del 28 al 31 de agosto: 3 días. +30 (sep) = 33. +31 (oct) = 64. Faltan 84 − 64 = 20.', ok: 'El 20 de noviembre.' },
      { q: 'Ana paga $580 + $399 + $269. ¿Cuánto necesita ese día?', ans: 1248, hint: '580 + 399 = 979; 979 + 269', ok: '$1 248.' },
      { q: 'Gana **$18 519** y gasta **$17 936** al mes. ¿Cuánto puede ahorrar?', ans: 583, hint: '18 519 − 17 936', ok: '$583 al mes para esos pagos extra.' },
    ], 'Escribe solo números.', 'Con ayuda: MCM'),

    guia('Practica con ayuda', 'Repartiendo el ahorro', [
      { q: 'Quieren sobres con **cantidades iguales** y lo **más grandes** posible. ¿Qué usas?', mode: 'sel', opts: ['MCD', 'MCM'], ans: 'MCD', hint: 'Es una pregunta de repartir.', ok: 'MCD.' },
      { q: '¿Cuál es el MCD de 240, 360 y 480?', ans: 120, hint: 'Comunes con menor exponente: 2³ × 3 × 5', ok: '$120 por sobre.' },
      { q: '¿Cuántos sobres tendrá quien ahorró **$480**?', ans: 4, hint: '480 ÷ 120', ok: '4 sobres.' },
      { q: 'Adrián recarga su celular cada **10** días, paga streaming cada **15** y transporte cada **20**. ¿Cada cuántos días paga todo el mismo día?', ans: 60, hint: 'MCM(10, 15, 20)', ok: 'Cada 60 días.' },
    ], 'Escribe solo números.', 'Con ayuda: MCD'),

    match('Actividad', 'Escribe MCD o MCM según corresponda', [
      ['Organizar fechas en que coinciden varios pagos', 'MCM', 'Fechas que coinciden → MCM'],
      ['Dividir dinero en partes iguales sin que sobre', 'MCD', 'Repartir → MCD'],
      ['Sincronizar gastos mensuales', 'MCM', 'Coincidir → MCM'],
      ['Hacer paquetes iguales con 36 lápices y 48 plumas, sin que sobre', 'MCD', 'Paquetes iguales → MCD'],
      ['Dos camiones salen cada 12 y 18 minutos: ¿cuándo vuelven a salir juntos?', 'MCM', 'Vuelven a coincidir → MCM'],
    ], ['MCD', 'MCM']),

    mc('Repaso rápido', 'MCD y MCM', [
      ['¿Cuál es el MCD de 12 y 18?', ['2', '3', '6', '36'], 2, '12 = 2²×3, 18 = 2×3² → 2×3 = 6.'],
      ['¿Cuál es el MCM de 4 y 6?', ['2', '12', '24', '10'], 1, 'Múltiplos de 6: 6, 12 ✔ (12 ÷ 4 = 3).'],
      ['¿Cuál es la descomposición en primos de 60?', ['2 × 30', '2² × 3 × 5', '4 × 15', '2 × 3 × 10'], 1, '60 = 2 × 2 × 3 × 5.'],
      ['Un foco parpadea cada 8 s y otro cada 12 s. Si parpadean juntos ahora, ¿en cuántos segundos vuelven a coincidir?', ['4', '20', '24', '96'], 2, 'MCM(8, 12) = 24.'],
      ['Se tienen 24 manzanas y 36 naranjas para hacer bolsas iguales (mismo número de cada fruta) sin que sobre. ¿Cuántas bolsas como máximo?', ['6', '12', '24', '72'], 1, 'MCD(24, 36) = 12.'],
      ['El MCM de dos números siempre es…', ['menor que ambos', 'mayor o igual que el mayor', 'igual a su suma', 'igual a 1'], 1, 'Es un múltiplo, así que no puede ser más chico.'],
    ]),
  ],
};
