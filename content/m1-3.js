import { lesson, def, ex, ana, warn, it, p, md, img, flow, tiles, tbl, steps, match, mc, order, cloze, gen, write, practica } from '../js/mk.js';

export default {
  id: 'm1-3', unit: '1.3', title: 'Números naturales y enteros', sub: 'Clasificación, operaciones, propiedades, factorización, MCD y MCM', minutes: 100, weight: 10,
  goals: [
    'Clasificar números en **naturales, enteros, racionales, irracionales y reales**.',
    'Operar con **enteros** usando la ley de signos y la resta como suma del opuesto.',
    'Aplicar las **propiedades** de las operaciones.',
    'Factorizar números y calcular **MCD** y **MCM** para resolver problemas.',
  ],
  pages: [
    lesson('Clasificación de los números', 'Cada conjunto contiene al anterior', [
      img('assets/lessons/1-3-conjuntos.svg', 'Conjuntos numéricos anidados'),
      tbl(['Conjunto', 'Símbolo', 'Qué contiene', 'Ejemplos'], [['Naturales', 'ℕ', 'Los que sirven para contar', '1, 2, 3, …'], ['Enteros', 'ℤ', 'Naturales, sus opuestos y el cero', '−3, 0, 5'], ['Racionales', 'ℚ', 'Los que se escriben como fracción a/b (b ≠ 0)', '1/2, −3/4, 0.75'], ['Irracionales', '—', 'Decimales infinitos sin patrón', '√2, π'], ['Reales', 'ℝ', 'Racionales + irracionales', 'todos los anteriores']]),
      ana('Piensa en muñecas rusas: los naturales caben dentro de los enteros, los enteros dentro de los racionales y los racionales dentro de los reales.'),
    ], 'ℕ ⊂ ℤ ⊂ ℚ ⊂ ℝ.', 'Clasificación'),

    match('Clasifica números', 'Elige el conjunto más específico de cada número', [
      ['12', 'Natural (ℕ)'], ['−7', 'Entero (ℤ)'], ['0', 'Entero (ℤ)'], ['3/4', 'Racional (ℚ)'], ['−2.5', 'Racional (ℚ)'], ['√3', 'Irracional'], ['π', 'Irracional'],
    ], ['Natural (ℕ)', 'Entero (ℤ)', 'Racional (ℚ)', 'Irracional'], 'Actividad: clasificar'),

    lesson('Suma y resta de enteros', 'Con signos iguales y distintos', [
      it('Signos iguales', 'Se **suman** los valores y se conserva el signo: (−6) + (−4) = **−10**.'),
      it('Signos distintos', 'Se **restan** los valores y se conserva el signo del mayor valor absoluto: (−8) + 5 = **−3**.'),
      def('Resta = suma del opuesto', '**a − b = a + (−b)**. Así evitas confusiones: 7 − 12 = 7 + (−12) = **−5** y −3 − (−9) = −3 + 9 = **6**.'),
      ana('Piensa en dinero: si debes $8 (−8) y pagas $5 (+5), ahora debes $3 (−3).', '💰 Con dinero'),
      steps('Ejemplo: 5 − (−3)', ['Restar es sumar el opuesto.', 'El opuesto de −3 es **3**.', 'Entonces 5 − (−3) = 5 + 3 = **8**.']),
    ], 'Restar un negativo es sumar un positivo.', 'Suma y resta'),

    lesson('Multiplicación y división de enteros', 'La ley de signos', [
      tbl(['Signos', 'Resultado'], [['(+) × (+) o (+) ÷ (+)', '+'], ['(−) × (−) o (−) ÷ (−)', '+'], ['(+) × (−) o (−) × (+)', '−'], ['(+) ÷ (−) o (−) ÷ (+)', '−']]),
      md('**Signos iguales → positivo. Signos distintos → negativo.**\n\n- (−4)(6) = −24 · (−5)(−7) = 35 · −36 ÷ 9 = −4 · −48 ÷ (−6) = 8'),
      def('Operaciones inversas', 'La **resta deshace la suma** (a + b − b = a) y la **división deshace la multiplicación** (a × b ÷ b = a).'),
    ], 'Iguales (+), distintos (−).', 'Multiplicar y dividir'),

    gen('Operaciones con enteros', 'Aplica la ley de signos. Pulsa «Otros ejercicios» cuantas veces quieras', 'enteros', 6, 'Práctica: enteros'),

    lesson('Propiedades de las operaciones', 'Reglas que siempre se cumplen', [
      tbl(['Propiedad', 'Suma', 'Multiplicación'], [['Cerradura', 'a + b es entero', 'a × b es entero'], ['Conmutativa', 'a + b = b + a', 'a × b = b × a'], ['Asociativa', '(a + b) + c = a + (b + c)', '(a × b) × c = a × (b × c)'], ['Distributiva', 'a × (b + c) = a × b + a × c', ''], ['Neutro', '0 → a + 0 = a', '1 → a × 1 = a'], ['Inverso', '−a → a + (−a) = 0', '1/a → a × 1/a = 1']]),
      ex('**4 × (10 + 3) = 4 × 10 + 4 × 3 = 40 + 12 = 52**. La distributiva sirve para calcular mentalmente.'),
      warn('La resta **no** es conmutativa (7 − 3 ≠ 3 − 7) ni cerrada en ℕ (3 − 5 = −2 no es natural). La división no es cerrada en ℤ (7 ÷ 2 no es entero).'),
    ], 'Conmutativa cambia el orden; asociativa cambia los grupos.', 'Propiedades'),

    match('¿Qué propiedad se usa?', 'Une cada igualdad con su propiedad', [
      ['5 + 8 = 8 + 5', 'Conmutativa'], ['(2 + 3) + 4 = 2 + (3 + 4)', 'Asociativa'], ['6 × (4 + 1) = 24 + 6', 'Distributiva'], ['9 + 0 = 9', 'Neutro aditivo'], ['7 × 1 = 7', 'Neutro multiplicativo'], ['5 + (−5) = 0', 'Inverso aditivo'],
    ], ['Conmutativa', 'Asociativa', 'Distributiva', 'Neutro aditivo', 'Neutro multiplicativo', 'Inverso aditivo'], 'Actividad: propiedades'),

    lesson('Números primos y compuestos', 'Los «ladrillos» de todos los números', [
      def('Número primo', 'Solo es divisible entre **1** y entre **sí mismo**: 2, 3, 5, 7, 11, 13, 17, 19, 23…'),
      def('Número compuesto', 'Tiene **más de dos divisores**: 4, 6, 9, 12… El **1** no es primo ni compuesto.'),
      tbl(['Divisible entre', 'Si…'], [['2', 'termina en cifra par'], ['3', 'la suma de sus cifras es múltiplo de 3'], ['5', 'termina en 0 o 5'], ['10', 'termina en 0']]),
      ex('¿**51** es primo? 5 + 1 = 6, que es múltiplo de 3 → 51 es divisible entre 3 → es **compuesto** (3 × 17).'),
    ], 'El 2 es el único primo par.', 'Primos y compuestos'),

    gen('¿Primo o compuesto?', 'Usa los criterios de divisibilidad', 'primo', 5, 'Práctica: primos'),

    lesson('Factorización', 'Teorema fundamental de la aritmética', [
      def('Teorema fundamental', '**Todo número natural mayor que 1 se escribe de una sola forma como producto de números primos** (sin importar el orden).'),
      img('assets/lessons/1-3-arbol-factores.svg', 'Árbol de factores de 360'),
      steps('Factorizar 84 dividiendo entre primos', ['84 ÷ 2 = 42', '42 ÷ 2 = 21', '21 ÷ 3 = 7', '7 ÷ 7 = 1 → ¡terminamos!', '**84 = 2² × 3 × 7**']),
    ], 'Divide siempre entre el primo más pequeño posible.', 'Factorización'),

    gen('Factoriza en primos', 'Escribe así: 2^2*3*5', 'factor', 4, 'Práctica: factorizar'),

    lesson('MCD y MCM', 'Máximo común divisor y mínimo común múltiplo', [
      it('MCD', 'Primos **comunes** con el **menor** exponente. Sirve para **repartir en partes iguales** sin que sobre nada.'),
      it('MCM', '**Todos** los primos con el **mayor** exponente. Sirve para saber **cuándo coinciden** eventos que se repiten.'),
      steps('Ejemplo con 12 y 18', ['12 = 2² × 3 y 18 = 2 × 3².', '**MCD**: primos comunes con menor exponente → 2 × 3 = **6**.', '**MCM**: todos los primos con mayor exponente → 2² × 3² = **36**.', 'Comprobación: MCD × MCM = 6 × 36 = 216 = 12 × 18 ✔']),
      ex('Reparto 48 manzanas y 36 naranjas en bolsas iguales sin que sobre fruta: MCD(48, 36) = **12 bolsas** (4 manzanas y 3 naranjas cada una).', 'Con MCD'),
      ex('Dos rutas salen juntas y vuelven a salir cada 12 y 18 minutos: coinciden de nuevo a los **36 minutos** (MCM).', 'Con MCM'),
    ], 'MCD reparte; MCM sincroniza.', 'MCD y MCM'),

    gen('Calcula el MCD', 'Factoriza y toma los primos comunes', 'mcd', 4, 'Práctica: MCD'),
    gen('Calcula el MCM', 'Todos los primos con el mayor exponente', 'mcm', 4, 'Práctica: MCM'),

    mc('¿MCD o MCM?', 'Decide qué herramienta resuelve cada problema', [
      ['Quieres armar **bolsas iguales** con 60 galletas de chocolate y 84 de avena sin que sobre ninguna. ¿Qué usas?', ['MCD', 'MCM'], 0, 'Repartir en grupos iguales → MCD(60, 84) = 12 bolsas.'],
      ['Una luz parpadea cada 8 s y otra cada 12 s. ¿Cada cuánto **coinciden**?', ['MCD', 'MCM'], 1, 'Coincidencias → MCM(8, 12) = 24 s.'],
      ['Tienes cuerdas de 18 m y 24 m y quieres cortarlas en **trozos iguales lo más largos posible**. ¿Qué usas?', ['MCD', 'MCM'], 0, 'Trozos iguales y lo más largos → MCD(18, 24) = 6 m.'],
      ['Dos autobuses salen juntos y pasan por la parada cada 15 y 20 minutos. ¿Cuándo vuelven a **encontrarse**?', ['MCD', 'MCM'], 1, 'Encontrarse → MCM(15, 20) = 60 min.'],
    ], 'Problemas'),

    cloze('Completa la regla', 'Elige la palabra correcta', 'Para el **MCD** tomamos los factores {0} con el {1} exponente; para el **MCM** tomamos {2} los factores con el {3} exponente.', [['comunes', ['comunes', 'no comunes', 'pares']], ['menor', ['menor', 'mayor', 'primer']], ['todos', ['todos', 'solo los comunes', 'ningún']], ['mayor', ['mayor', 'menor', 'segundo']]], 'Actividad: reglas'),

    write('Aplícalo', 'Un problema con tus propias palabras', 'Inventa un problema de tu vida diaria que se resuelva con **MCD** o con **MCM** y explica cuál usaste y por qué.', [['Menciona MCD o MCM', 'mcd|mcm|maximo comun|minimo comun'], ['Incluye números', '\\d'], ['Explica el porqué', 'porque|ya que|para|sirve|repart|coincid']], 3, 'Piensa si quieres repartir en partes iguales (MCD) o ver cuándo coinciden (MCM).', 'Actividad: invéntalo'),

    lesson('Resumen del módulo', 'Lo esencial de enteros y divisibilidad', [
      md('- **ℕ ⊂ ℤ ⊂ ℚ ⊂ ℝ**; los irracionales (√2, π) completan los reales.\n- **Resta = suma del opuesto.** Ley de signos: iguales (+), distintos (−).\n- **Propiedades:** conmutativa, asociativa, distributiva, neutros e inversos.\n- **Factorización:** todo natural > 1 es producto único de primos.\n- **MCD:** comunes con menor exponente (repartir). **MCM:** todos con mayor exponente (coincidir).\n- **MCD × MCM = a × b.**'),
    ], 'Ya puedes armar tu presupuesto.', 'Resumen'),

    practica({
      t: 'Presupuesto de salud comunitaria', sub: 'Evidencia de la actividad de evaluación 1.3.1 · vale el 10 % del curso',
      intro: 'Elabora un presupuesto que integre prácticas culturales de **salud comunitaria** (alimentación, medicina tradicional, higiene) en distintos momentos históricos.',
      mat: 'Cuaderno u hojas, calculadora (opcional), internet o libros para investigar.',
      steps: ['**Elige un momento histórico** y una comunidad (mercado mesoamericano, pueblo del siglo XIX, tu colonia hoy) e investiga prácticas de salud: alimentos, plantas, higiene.', 'Arma una **tabla con al menos 10 conceptos** con cantidad, valor por unidad y total.', 'Calcula totales usando la **propiedad distributiva** en al menos dos conceptos (por ejemplo 12 × 35 = 12 × 30 + 12 × 5).', 'Incluye **ingresos (+) y gastos (−)** y calcula el **saldo** con números enteros.', 'Usa el **MCD** para repartir productos en paquetes iguales sin que sobre nada.', 'Usa el **MCM** para planear compras que se repiten cada cierto número de días y decir cuándo coinciden.', '**Factoriza** en primos al menos tres de las cantidades que uses.', 'Escribe una **conclusión** (8 renglones): ¿qué prácticas destacan y cómo cambian entre épocas?'],
      deliver: 'Reporte en PDF, documento o fotos legibles con tabla, operaciones, MCD, MCM, factorizaciones y conclusión.',
      rubric: [['Contexto histórico y cultural', 'Claro y con fuentes', 'Parcial', 'Sin contexto'], ['Operaciones con enteros y propiedades', 'Correctas y justificadas', 'Algunos errores', 'Incorrectas'], ['Factorización, MCD y MCM', 'Bien aplicados al problema', 'Aplicados sin explicar', 'Ausentes'], ['Presentación y conclusión', 'Ordenada y fundamentada', 'Incompleta', 'Desordenada']],
    }),
  ],
};
