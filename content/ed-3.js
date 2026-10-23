import { lesson, def, ex, ana, warn, it, tbl, steps, words, alt, mc, match, guia } from '../js/mk.js';

export default {
  id: 'ed-3', unit: 'EDIEMS 3', title: 'Administrando mi dinero', sub: 'Porcentajes: descuentos, ahorro, intereses y aumentos', minutes: 60,
  goals: [
    'Convertir entre **porcentaje, fracción y decimal**.',
    'Calcular el **porcentaje de una cantidad**.',
    'Resolver **descuentos, aumentos e intereses**.',
  ],
  pages: [
    lesson('¿Qué es un porcentaje?', '"Por cada cien"', [
      words([['Porcentaje (%)', 'una parte de cada **100**: 25 % = 25 de cada 100'], ['Descuento', 'lo que te **rebajan** del precio'], ['Interés', 'dinero extra que **te pagan** por ahorrar o que **pagas** por un préstamo']]),
      ana('La batería de tu celular 🔋 al **75 %** tiene 75 de cada 100 partes de carga: ¾ de la pila.', '🔋 Con tu celular'),
      tbl(['Porcentaje', 'Fracción', 'Decimal'], [['50 %', '50/100 = 1/2', '0.5'], ['25 %', '25/100 = 1/4', '0.25'], ['75 %', '75/100 = 3/4', '0.75'], ['10 %', '10/100 = 1/10', '0.1'], ['8 %', '8/100 = 2/25', '0.08'], ['120 %', '120/100 = 6/5', '1.2']]),
      it('% → decimal', 'Divide entre 100 (mueve el punto **2 lugares a la izquierda**): 45 % = **0.45**; 8 % = **0.08**.'),
      it('Decimal → %', 'Multiplica por 100 (punto **2 lugares a la derecha**): 0.6 = **60 %**; 1.5 = **150 %**.'),
      it('% → fracción', 'Escribe sobre 100 y simplifica: 30 % = 30/100 = **3/10**.'),
    ], 'Porcentaje, fracción y decimal son tres formas de decir lo mismo.', 'Qué es'),

    lesson('Calcular porcentajes', 'Descuentos, aumentos e intereses', [
      steps('20 % de 150', ['Convierte el porcentaje a decimal: 20 % = **0.20**.', 'Multiplica por la cantidad: 0.20 × 150 = **30**.']),
      ex('Audífonos de **$2 400** con **25 %** de descuento:<br>Descuento: 2 400 × 0.25 = **$600**<br>Pagas: 2 400 − 600 = **$1 800**', 'Descuento'),
      ex('Un sueldo de **$1 000** aumenta **10 %**: 1 000 × 0.10 = 100 → nuevo sueldo **$1 100**.', 'Aumento'),
      ex('Depositas **$2 000** al **5 % mensual** (interés simple):<br>Cada mes: 2 000 × 0.05 = **$100** · En un año: 100 × 12 = **$1 200** · Total: **$3 200**', 'Interés'),
      ex('¿Qué porcentaje es 45 de 60? → 45 ÷ 60 = 0.75 → **75 %**.', '¿Qué porcentaje es?'),
      warn('Un descuento más grande **no siempre** es más barato. Tienda A: $700 − 10 % = **$630**. Tienda B: $800 − 15 % = **$680**. ¡Conviene la A!', 'Ojo al comparar'),
      alt('**Atajo:** para el precio con descuento multiplica directo por lo que **sí pagas**. 25 % de descuento → pagas el 75 % → 2 400 × 0.75 = 1 800. Para un aumento del 16 % → 1.16 × precio.', '🤔 ¿Hay forma más rápida?'),
    ], 'Pasa el % a decimal y multiplica.', 'Calcular'),

    guia('Practica con ayuda', 'Te regalan $2 500 por tu graduación', [
      { q: 'Decides **ahorrar el 20 %**. ¿Cuánto ahorras?', ans: 500, hint: '2 500 × 0.20', ok: '$500.' },
      { q: '¿Cuánto te queda para gastar?', ans: 2000, hint: '2 500 − 500', ok: '$2 000.' },
      { q: 'Unos audífonos cuestan **$2 400** con **25 %** de descuento. ¿Cuánto **pagas**?', ans: 1800, hint: 'Descuento: 2 400 × 0.25 = 600. Pagas 2 400 − 600.', ok: '$1 800.' },
      { q: 'Mochila: Tienda A $700 con 10 % · Tienda B $800 con 15 %. ¿Cuánto pagas en la **B**?', ans: 680, hint: '800 × 0.15 = 120; 800 − 120', ok: '$680. En la A pagas $630, así que conviene la A.' },
      { q: 'Si ahorras el **15 %** de $2 500 cada semana durante **4 semanas**, ¿cuánto juntas?', ans: 1500, hint: '2 500 × 0.15 = 375 por semana; × 4', ok: '$1 500.' },
    ], 'Escribe solo el número.', 'Con ayuda: porcentajes'),

    mc('Repaso rápido', 'Porcentajes', [
      ['¿Cuánto es el 30 % de 250?', ['7.5', '75', '83.3', '220'], 1, '0.30 × 250 = 75.'],
      ['¿A qué decimal equivale 8 %?', ['0.8', '0.08', '8.0', '0.008'], 1, '8 ÷ 100 = 0.08.'],
      ['¿A qué fracción equivale 75 %?', ['7/5', '3/4', '1/75', '75/10'], 1, '75/100 = 3/4.'],
      ['Un pantalón de $600 tiene 35 % de descuento. ¿Cuánto pagas?', ['$210', '$390', '$565', '$810'], 1, 'Descuento 210 → 600 − 210 = 390 (o 600 × 0.65).'],
      ['Un producto de $500 sube 16 % (IVA). ¿Cuál es el precio final?', ['$80', '$516', '$580', '$420'], 2, '500 × 1.16 = 580.'],
      ['En un examen de 40 preguntas contestaste 30 bien. ¿Qué porcentaje es?', ['30 %', '70 %', '75 %', '80 %'], 2, '30 ÷ 40 = 0.75 = 75 %.'],
      ['Depositas $3 000 al 2 % mensual (interés simple). ¿Cuánto interés ganas en 6 meses?', ['$60', '$360', '$600', '$3 360'], 1, '3 000 × 0.02 = 60 por mes; × 6 = 360.'],
      ['¿Qué significa 150 %?', ['La mitad', 'Menos que el total', 'Una vez y media el total', 'El total exacto'], 2, '150 de cada 100: el total más la mitad. 150 % de 40 = 60.'],
    ]),

    match('Actividad', 'Relaciona cada porcentaje con su equivalente', [
      ['50 %', '1/2', '50/100 simplificado'],
      ['25 %', '0.25', '25 ÷ 100'],
      ['10 % de 1 000', '100', '0.10 × 1 000'],
      ['0.6 en porcentaje', '60 %', '0.6 × 100'],
      ['20 % de 150', '30', '0.20 × 150'],
    ]),
  ],
};
