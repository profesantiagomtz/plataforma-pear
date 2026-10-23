import { lesson, def, ex, ana, warn, it, tbl, steps, words, alt, mc, match, guia } from '../js/mk.js';

export default {
  id: 'ed-6', unit: 'EDIEMS 6', title: 'Convertir para decidir mejor', sub: 'Conversión de unidades y precio unitario', minutes: 50,
  goals: [
    'Convertir unidades del **Sistema Internacional** (g ↔ kg, ml ↔ L, m ↔ km, min ↔ h).',
    'Calcular el **precio unitario** para saber qué presentación conviene.',
  ],
  pages: [
    lesson('Factores de conversión', 'Para comparar, todo debe estar en la misma unidad', [
      tbl(['Magnitud', 'Unidades', 'Equivalencia'], [['Masa', 'gramo (g), kilogramo (kg)', '**1 kg = 1 000 g**'], ['Longitud', 'metro (m), kilómetro (km)', '**1 km = 1 000 m**'], ['Volumen', 'mililitro (ml), litro (L)', '**1 L = 1 000 ml**'], ['Tiempo', 'hora (h), minuto (min), segundo (s)', '**1 h = 60 min · 1 min = 60 s**']]),
      steps('Convierte 5 km a metros', ['**Identifica** las unidades: de km a m.', '**Factor:** 1 km = 1 000 m.', '**Prepara:** 5 km × (1 000 m / 1 km) → se cancela "km".', '**Calcula:** 5 × 1 000 = **5 000 m**.']),
      it('De grande a chica (kg → g)', '**Multiplica** por 1 000: 2.5 kg = **2 500 g**.'),
      it('De chica a grande (ml → L)', '**Divide** entre 1 000: 850 ml = **0.85 L**.'),
      ex('90 min ÷ 60 = **1.5 h** · 3 h × 60 = **180 min** · 750 g ÷ 1 000 = **0.75 kg**', 'Más ejemplos'),
      alt('Piensa: si la unidad nueva es **más chica** (de kg a g), vas a tener **más** números → multiplicas. Si es **más grande** (de g a kg), tendrás **menos** → divides.', '🤔 ¿Multiplico o divido?'),
    ], 'A unidad más chica, multiplica; a unidad más grande, divide.', 'Conversiones'),

    lesson('¿Qué presentación conviene?', 'El precio unitario', [
      def('Precio unitario', 'Lo que cuesta **una** unidad (un gramo, un mililitro, un rollo). Se calcula: **precio ÷ cantidad** (en la misma unidad). El más **bajo** es el que conviene.'),
      ex('Detergente A: **800 g por $45** · B: **3 kg por $140**.<br>Convierte: 3 kg = 3 000 g.<br>A: 45 ÷ 800 = **$0.056** por gramo · B: 140 ÷ 3 000 = **$0.047** por gramo → ¡**B** es más barato!', 'Ejemplo'),
      tbl(['Producto', 'Opción A', 'Opción B', 'Conviene'], [['Arroz', '2 kg por $52 → $0.0260/g', '900 g por $22 → $0.0244/g', '**B**'], ['Aceite', '850 ml por $45 → $0.0529/ml', '5 L por $240 → $0.0480/ml', '**B**'], ['Papel higiénico', '32 rollos por $160 → $5.00/rollo', '12 rollos por $54 → $4.50/rollo', '**B**']]),
      ex('La familia necesita **4 kg de arroz** y compra bolsas de 900 g: 4 000 ÷ 900 ≈ 4.4 → compra **5 bolsas** = 4 500 g y le sobran **500 g** de reserva.', '¿Cuántas compro?'),
    ], 'Precio ÷ cantidad: el más chico gana.', 'Precio unitario'),

    guia('Practica con ayuda', 'Convierte', [
      { q: '¿Cuántos gramos son **3 kg**?', ans: 3000, hint: '3 × 1 000', ok: '3 000 g.' },
      { q: '¿Cuántos litros son **2 500 ml**?', ans: 2.5, hint: '2 500 ÷ 1 000', ok: '2.5 L.' },
      { q: '¿Cuántas horas son **150 minutos**?', ans: 2.5, hint: '150 ÷ 60', ok: '2.5 h (2 horas y media).' },
      { q: 'Detergente B: **$140** por **3 000 g**. ¿Cuánto cuesta 1 gramo? (redondea a 3 decimales)', ans: 0.047, tol: 0.0006, hint: '140 ÷ 3 000', ok: '$0.047 por gramo.' },
      { q: 'Papel: 12 rollos por **$54**. ¿Cuánto cuesta cada rollo?', ans: 4.5, hint: '54 ÷ 12', ok: '$4.50 por rollo.' },
      { q: 'Necesitas **24 rollos** y compras paquetes de 12. ¿Cuántos paquetes?', ans: 2, hint: '24 ÷ 12', ok: '2 paquetes.' },
    ], 'Usa punto decimal, por ejemplo 2.5', 'Con ayuda: conversiones'),

    match('Actividad', 'Relaciona cada medida con su equivalencia', [
      ['1.5 kg', '1 500 g', '1.5 × 1 000'],
      ['750 ml', '0.75 L', '750 ÷ 1 000'],
      ['2 km', '2 000 m', '2 × 1 000'],
      ['90 min', '1.5 h', '90 ÷ 60'],
      ['3 min', '180 s', '3 × 60'],
    ]),

    mc('Repaso rápido', 'Conversiones y precio unitario', [
      ['¿Cuántos ml tiene una botella de 1.5 L?', ['15', '150', '1 500', '15 000'], 2, '1.5 × 1 000.'],
      ['¿Cuántos kg son 4 200 g?', ['42', '4.2', '0.42', '420'], 1, '4 200 ÷ 1 000.'],
      ['Refresco A: 600 ml por $18. Refresco B: 2 L por $45. ¿Cuál conviene?', ['A ($0.030/ml)', 'B ($0.0225/ml)', 'Cuestan igual', 'No se puede saber'], 1, 'B: 45 ÷ 2 000 = 0.0225 < 0.03.'],
      ['Una película dura 135 min. ¿Cuánto es en horas?', ['1.35 h', '2.25 h', '2.35 h', '1.5 h'], 1, '135 ÷ 60 = 2.25 h (2 h 15 min).'],
      ['Caminas 3 500 m. ¿Cuántos km son?', ['35', '0.35', '3.5', '350'], 2, '3 500 ÷ 1 000.'],
      ['Necesitas 3 L de aceite y vienen botellas de 850 ml. ¿Cuántas compras como mínimo?', ['3', '4', '5', '35'], 1, '3 000 ÷ 850 ≈ 3.5 → necesitas 4.'],
    ]),
  ],
};
