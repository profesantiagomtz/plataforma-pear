import { lesson, def, ex, ana, warn, it, tbl, steps, words, alt, mc, match, cloze, guia } from '../js/mk.js';

export default {
  id: 'ed-5', unit: 'EDIEMS 5', title: 'Viaje a París', sub: 'Variación proporcional directa y regla de tres', minutes: 50,
  goals: [
    'Reconocer una **variación proporcional directa** (en tabla y en gráfica).',
    'Resolver problemas con la **regla de tres directa**.',
    'Convertir **monedas** (dólares, euros, pesos).',
  ],
  pages: [
    lesson('Si una crece, la otra también', 'Variación proporcional directa', [
      def('Proporcionalidad directa', 'Dos cantidades (magnitudes) son directamente proporcionales si cuando una **aumenta** al doble, triple…, la otra **aumenta** igual; y si una **disminuye** a la mitad, la otra también.'),
      ana('Te pagan **$100 por hora** de cuidar a tu hermano. 2 horas → $200; media hora → $50. Siempre se multiplica por **100**: ese número es la **constante de proporcionalidad**.', '👶 Cuidando a tu hermano'),
      tbl(['Horas', '1', '2', '3', '4'], [['Pago ($)', '100', '200', '300', '400']]),
      it('En la gráfica', 'Los puntos quedan en una **línea recta que sale del 0** (origen) y sube.'),
      it('Truco para reconocerla', 'Divide y = pago ÷ horas: si **siempre da lo mismo** (100), es proporcional directa.'),
      warn('No es proporcional si hay una cuota fija: un taxi que cobra **$30 de banderazo + $10 por km** no da una línea desde el 0.', 'Ojo'),
    ], 'Doble de una → doble de la otra. Línea recta desde el 0.', 'Proporción directa'),

    lesson('La regla de tres', 'Multiplica cruzado y divide', [
      steps('50 dólares = $862. ¿Cuánto son 65 dólares?', ['Acomoda en tabla: **50 → 862** y **65 → ?**', 'Multiplica cruzado: 65 × 862 = **56 030**.', 'Divide entre el que sobra (50): 56 030 ÷ 50 = **1 120.6**.', 'Por 65 dólares recibes **$1 120.60**.']),
      ex('En París el hotel cuesta **€700 = $15 141 MXN**. ¿Cuánto son **€420** de comida?<br>(15 141 × 420) ÷ 700 = **$9 084.60**', 'Euros a pesos'),
      tbl(['Concepto', 'Euros', 'Pesos'], [['Hotel (6 noches)', '€700', '$15 141.00'], ['Alimentos y propinas', '€420', '$9 084.60'], ['Transporte y atracciones', '€310', '$6 705.30'], ['Imprevistos y recuerditos', '€45', '$973.35']]),
      ex('Vuelo $18 500 + seguro $1 200 + 15 141 + 9 084.60 + 6 705.30 + 973.35 = **$51 604.25 MXN** por persona.', 'Costo total del viaje'),
      alt('También puedes sacar primero **cuánto vale 1**: 1 euro = 15 141 ÷ 700 = **$21.63**. Luego multiplicas: €420 × 21.63 = 9 084.60. Esto se llama **valor unitario**.', '🤔 Otra forma'),
    ], 'Multiplica cruzado y divide entre el que sobra.', 'Regla de tres'),

    guia('Practica con ayuda', 'Regla de tres paso a paso', [
      { q: '50 dólares = $862. Multiplica cruzado: 65 × 862 = ?', ans: 56030, hint: '65 × 862', ok: '56 030.' },
      { q: 'Ahora divide entre 50. ¿Cuántos pesos son 65 dólares?', ans: 1120.6, tol: 0.01, hint: '56 030 ÷ 50', ok: '$1 120.60.' },
      { q: 'Si €700 = $15 141, ¿cuántos pesos vale **1 euro**?', ans: 21.63, tol: 0.01, hint: '15 141 ÷ 700', ok: '$21.63 por euro.' },
      { q: '¿Cuántos pesos son **€310** de transporte?', ans: 6705.3, tol: 0.05, hint: '310 × 21.63 (o 15 141 × 310 ÷ 700)', ok: '$6 705.30.' },
      { q: '3 cuadernos cuestan $84. ¿Cuánto cuestan **7**?', ans: 196, hint: '84 ÷ 3 = 28 cada uno; 28 × 7', ok: '$196.' },
    ], 'Puedes usar punto decimal, por ejemplo 1120.6', 'Con ayuda: regla de tres'),

    cloze('Actividad', 'Completa la definición', 'La variación proporcional {0} ocurre cuando dos {1} están relacionadas de tal manera que si una {2} o {3} la otra también lo hace en la misma {4}.', [
      ['directa', ['directa', 'inversa', 'fija']],
      ['magnitudes', ['magnitudes', 'personas', 'monedas']],
      ['aumenta', ['aumenta', 'desaparece', 'se divide']],
      ['disminuye', ['disminuye', 'se queda igual', 'se multiplica por 0']],
      ['proporción', ['proporción', 'resta', 'hora']],
    ]),

    mc('Repaso rápido', 'Proporcionalidad directa', [
      ['Si 4 kg de naranja cuestan $72, ¿cuánto cuestan 10 kg?', ['$160', '$180', '$720', '$288'], 1, '72 ÷ 4 = 18 por kg; 18 × 10 = 180.'],
      ['Un auto recorre 150 km con 10 L de gasolina. ¿Cuántos km con 25 L?', ['300', '375', '250', '1 500'], 1, '15 km por litro × 25 = 375.'],
      ['¿Cuál tabla es de proporcionalidad directa?', ['1→5, 2→10, 3→15', '1→5, 2→7, 3→9', '1→10, 2→5, 3→2', '1→1, 2→4, 3→9'], 0, 'Siempre se multiplica por 5.'],
      ['¿Cómo es la gráfica de una proporcionalidad directa?', ['Una curva', 'Una línea recta que pasa por el origen', 'Una línea horizontal', 'Puntos sin orden'], 1, 'Recta desde (0, 0).'],
      ['Si 1 dólar = $17.24, ¿cuánto son 20 dólares?', ['$344.80', '$37.24', '$172.40', '$1.16'], 0, '17.24 × 20 = 344.80.'],
      ['Una receta usa 3 tazas de harina para 12 galletas. ¿Cuántas tazas para 30 galletas?', ['6', '7.5', '10', '9'], 1, '3 × 30 ÷ 12 = 7.5.'],
    ]),
  ],
};
