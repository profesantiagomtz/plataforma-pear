import { lesson, def, ex, ana, warn, it, p, md, img, flow, tiles, tbl, steps, viz, match, mc, order, cloze, gen, write, practica } from '../js/mk.js';

export default {
  id: 'm1-7', unit: '1.7', title: 'Cálculos combinados con números reales', sub: 'Jerarquía de operaciones, agrupaciones, potencias, raíces, fracciones y decimales', minutes: 120, weight: 30,
  goals: [
    'Aplicar la **jerarquía de operaciones** sin equivocarte.',
    'Resolver con **paréntesis, corchetes y llaves** (de adentro hacia afuera).',
    'Usar la **resta como suma del opuesto** y operar con negativos.',
    'Combinar **potencias, raíces, fracciones y decimales** en un mismo cálculo y aplicarlo a **compras reales**.',
  ],
  pages: [
    lesson('¿Por qué hace falta un orden?', 'Para que todos obtengamos el mismo resultado', [
      flow([['🧮', '8 + 4 × 3'], ['😕', 'Hay dos|caminos'], ['📜', 'Se acordó una|jerarquía'], ['✅', 'Un solo|resultado: 20']], 'Del problema al acuerdo'),
      def('El problema', '¿Cuánto es **8 + 4 × 3**? Si sumas primero: 12 × 3 = **36**. Si multiplicas primero: 8 + 12 = **20**. Para que **todas las personas y calculadoras** den el mismo resultado se acordó un orden.'),
      ana('Es como las reglas de tránsito: sin un acuerdo común, cada quien pasaría cuando quisiera y habría choques.'),
    ], 'La jerarquía evita ambigüedades.', 'Por qué un orden'),

    lesson('La jerarquía de operaciones', 'Cuatro niveles', [
      img('assets/lessons/1-7-jerarquia.svg', 'Jerarquía de operaciones'),
      it('1. Agrupaciones', 'Paréntesis ( ), corchetes [ ] y llaves { }. Se resuelven **de adentro hacia afuera**.'),
      it('2. Potencias y raíces', 'Después de las agrupaciones.'),
      it('3. × y ÷', 'Misma jerarquía: de **izquierda a derecha**.'),
      it('4. + y −', 'Misma jerarquía: de **izquierda a derecha**.'),
      warn('Multiplicar **no** va siempre antes que dividir, ni sumar antes que restar. Si están juntas, se resuelven en el orden en que aparecen, de izquierda a derecha: 24 ÷ 4 × 3 = 6 × 3 = **18** (y no 24 ÷ 12 = 2).'),
    ], 'Agrupaciones → potencias/raíces → × ÷ → + −.', 'Jerarquía'),

    order('Ordena la jerarquía', 'De lo que se resuelve primero a lo último', [
      ['Agrupaciones: ( ) [ ] { }, de adentro hacia afuera'], ['Potencias y raíces'], ['Multiplicaciones y divisiones, de izquierda a derecha'], ['Sumas y restas, de izquierda a derecha'],
    ], 'Actividad: la jerarquía'),

    lesson('Resolver paso a paso', 'Una herramienta que te muestra cada paso', [
      viz('hier', '🧰 Escribe cualquier operación y mira cómo se resuelve'),
      p('La parte **resaltada** es la operación que se resuelve en ese paso. Prueba tus propias operaciones: usa **+ − × ÷ ^ √** y paréntesis, corchetes o llaves.'),
    ], 'Fíjate qué se resalta primero y por qué.', 'Herramienta'),

    gen('Operaciones combinadas (nivel 1)', 'Aplica la jerarquía. Después de revisar, «Ver respuestas» muestra el paso a paso', 'jerarquia', 5, 'Práctica: nivel 1'),

    lesson('Símbolos de agrupación', 'Paréntesis, corchetes y llaves anidados', [
      def('Agrupaciones', 'Sirven para indicar qué se resuelve primero. Se resuelve **lo más interno** y se sale hacia afuera: primero ( ), luego [ ], luego { }.'),
      steps('2 × {3 + [10 − (4 − 1)] ÷ 7}', ['Lo más interno: **(4 − 1) = 3** → 2 × {3 + [10 − 3] ÷ 7}.', 'Corchetes: **[10 − 3] = 7** → 2 × {3 + 7 ÷ 7}.', 'Dentro de las llaves, primero la división: **7 ÷ 7 = 1** → 2 × {3 + 1}.', 'Llaves: **{3 + 1} = 4** → 2 × 4.', 'Resultado: **8**.']),
      warn('Cuidado: **√(9 + 16)** no es √9 + √16. Primero se suma dentro del radical: √25 = **5** (y no 3 + 4 = 7).', 'La raíz también agrupa'),
    ], 'Siempre de adentro hacia afuera.', 'Agrupaciones'),

    gen('Operaciones combinadas (nivel 2)', 'Con potencias, raíces y negativos', 'jerarquia2', 5, 'Práctica: nivel 2'),

    lesson('La resta como suma del opuesto', 'Cómo evitar errores con los signos', [
      def('Regla', '**a − b = a + (−b)**. Restar es sumar el opuesto.'),
      tbl(['Operación', 'Se convierte en', 'Resultado'], [['5 − 9', '5 + (−9)', '−4'], ['5 − (−3)', '5 + 3', '8'], ['−7 − (−2 + 5)', '−7 − 3', '−10'], ['(−3)² − 2 × (−4)', '9 + 8', '17']]),
      steps('(−3)² − 2 × (−4) + √16 ÷ (−2)', ['Potencias y raíces: (−3)² = **9** y √16 = **4**.', 'Queda 9 − 2 × (−4) + 4 ÷ (−2).', '× y ÷ de izquierda a derecha: 2 × (−4) = **−8**; 4 ÷ (−2) = **−2**.', 'Queda 9 − (−8) + (−2) = 9 + 8 − 2.', 'Resultado: **15**.']),
    ], 'Un menos delante de un negativo se vuelve más.', 'Resta y negativos'),

    mc('Errores comunes', 'Detecta dónde se equivocó cada persona', [
      ['Ana resolvió 6 + 3 × 4 = 36. ¿Qué hizo mal?', ['Sumó antes de multiplicar', 'Multiplicó mal', 'Nada, está bien'], 0, 'Correcto: 6 + 12 = 18.'],
      ['Luis resolvió 24 ÷ 4 × 3 = 2. ¿Qué hizo mal?', ['Dividió entre 12 (hizo 4 × 3 primero)', 'Restó mal', 'Nada'], 0, 'De izquierda a derecha: 24 ÷ 4 = 6 y 6 × 3 = 18.'],
      ['Eva resolvió √(9 + 16) = 7. ¿Qué hizo mal?', ['Sumó las raíces por separado', 'Se equivocó en la suma', 'Nada, está bien'], 0, 'Dentro del radical se suma primero: √25 = 5.'],
      ['Tomás resolvió −3² = 9. ¿Qué hizo mal?', ['Elevó el signo también', 'Debió dividir', 'Nada, está bien'], 0, 'Sin paréntesis solo el 3 se eleva: −(3²) = −9.'],
    ], 'Errores comunes'),

    match('¿Qué se resuelve primero?', 'Elige la primera operación en cada expresión', [
      ['3 + 4 × 2', '4 × 2'], ['(3 + 4) × 2', '3 + 4'], ['10 − 2³', '2³'], ['12 ÷ 3 × 2', '12 ÷ 3'], ['√(9 + 16) − 1', '9 + 16'], ['6 + 8 ÷ 2', '8 ÷ 2'],
    ], ['4 × 2', '3 + 4', '2³', '12 ÷ 3', '9 + 16', '8 ÷ 2'], 'Actividad: primer paso'),

    lesson('Fracciones, decimales y reales', 'Todo cabe en el mismo cálculo', [
      p('En un cálculo pueden aparecer enteros, fracciones, decimales y raíces. Puedes trabajar **todo en fracciones** o **todo en decimales**, pero no mezclarlos sin convertir. Las raíces pueden quedar exactas (√2) o aproximarse (1.414) si el problema pide un número.'),
      ex('**1/2 + 3/4 × 2/3** = 1/2 + 6/12 = 1/2 + 1/2 = **1**.', 'Con fracciones'),
      ex('**0.5 × 8 − 1.2 ÷ 0.4** = 4 − 3 = **1**.', 'Con decimales'),
      ex('**2⁻¹ + 4 × (1/2)² − √(1/4)** = 1/2 + 4 × 1/4 − 1/2 = 1/2 + 1 − 1/2 = **1**.', 'Todo junto'),
    ], 'Primero la jerarquía; después, el tipo de número.', 'Números reales'),

    lesson('Cálculos de la vida real', 'Compras en el mercado', [
      def('Una sola expresión', 'Muchos problemas de compras se pueden escribir como **una sola operación combinada** y resolver con la jerarquía.'),
      steps('Compras 3 kg de tomate a $22, 2.5 kg de cebolla a $18, con 10 % de descuento. Pagas con $200', ['Escribe la expresión: **200 − (3 × 22 + 2.5 × 18) × 0.90**.', 'Dentro del paréntesis, primero × : 3 × 22 = **66** y 2.5 × 18 = **45**.', 'Suma: 66 + 45 = **111**.', 'Descuento: 111 × 0.90 = **99.90**.', 'Cambio: 200 − 99.90 = **$100.10**.']),
    ], 'Escribir la expresión completa es la mitad del problema.', 'Compras reales'),

    gen('Compras con cupón', 'Escribe el total que pagas', 'mercado', 4, 'Práctica: compras'),

    write('Tu propio reto', 'Una operación combinada de tu vida diaria', 'Inventa un problema de compras o gastos de tu vida diaria que necesite **una operación combinada** (con paréntesis o descuento). Escribe la expresión y el resultado.', [['Incluye números', '\\d'], ['Usa paréntesis o signos de operación', '\\(|\\)|x|\\*|\\+|-|÷|/'], ['Da un resultado', 'resultado|total|pago|paga|cambio|queda|son|=']], 3, 'Ejemplo: 3 refrescos de $18 y 2 tortas de $35 con $20 de descuento.', 'Actividad: tu reto'),

    lesson('Resumen del módulo', 'Lo esencial de cálculos combinados', [
      md('1. **Agrupaciones** ( ) [ ] { } de adentro hacia afuera.\n2. **Potencias y raíces.**\n3. **× y ÷** de izquierda a derecha.\n4. **+ y −** de izquierda a derecha.\n\n- **a − b = a + (−b)**.\n- (−3)² = 9 pero −3² = −9.\n- √(a + b) ≠ √a + √b.\n- Escribe **toda la expresión** y reescribe en cada paso lo que no cambió.'),
    ], 'Ya puedes crear tu reto matemático.', 'Resumen'),

    practica({
      t: 'Reto matemático: mercado comunitario', sub: 'Evidencia de la actividad de evaluación 1.7.1 · vale el 30 % del curso',
      intro: 'Elabora un **reto matemático** para la planificación de compras en un **mercado comunitario**, aplicando cálculos combinados con números reales.',
      mat: 'Hojas o cuaderno, calculadora, colores; puede hacerse en documento o presentación digital.',
      steps: ['**Define el evento** (kermés, posada, comida escolar, fiesta del barrio), el número de personas y el **presupuesto máximo**.', 'Crea la **lista de productos** del mercado (mínimo 8) con precio por kilo, litro o pieza; incluye ofertas o descuentos.', 'Redacta **al menos 6 preguntas encadenadas** (el resultado de una sirve para la siguiente) que exijan: operaciones combinadas con agrupaciones, fracciones o decimales, al menos un porcentaje, al menos una potencia o raíz (por ejemplo el lado de una mesa cuadrada) y una conversión de unidades.', 'Agrega una restricción: «¿alcanza el presupuesto? ¿cuánto sobra o falta?».', 'Escribe el **solucionario** con cada paso y el resultado final correcto (usa la jerarquía de operaciones).', '**Intercambia** el reto con otro equipo, resuélvanlo y comparen resultados; corrijan lo necesario.', 'Entrega la versión final con **conclusiones**: ¿qué decisión de compra recomiendan y por qué?'],
      deliver: 'Reto + solucionario + conclusiones (PDF, documento o fotos).',
      rubric: [['Diseño del reto', 'Contexto real, 6+ preguntas encadenadas', 'Faltan elementos', 'Preguntas sueltas'], ['Operaciones combinadas', 'Usa jerarquía, agrupaciones, potencias o raíces correctamente', 'Algunos errores', 'Errores frecuentes'], ['Solucionario', 'Pasos completos y resultado correcto', 'Incompleto', 'Ausente o incorrecto'], ['Decisión y conclusiones', 'Fundamentada con cálculos', 'General', 'Sin sustento']],
    }),
  ],
};
