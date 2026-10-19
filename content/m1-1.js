import { lesson, def, ex, ana, warn, it, p, md, img, flow, tiles, tbl, steps, match, mc, order, cloze, gen, tt, write, practica } from '../js/mk.js';

export default {
  id: 'm1-1', unit: '1.1', title: 'Lógica matemática', sub: 'Proposiciones, conectivos y tablas de verdad', minutes: 90, weight: 15,
  goals: [
    'Reconocer qué enunciados son **proposiciones** y cuáles no.',
    'Usar los conectivos **¬, ∧, ∨, →, ↔** para combinar proposiciones.',
    'Construir **tablas de verdad** y clasificar proposiciones compuestas.',
    'Analizar un **debate sobre derechos humanos** con razonamiento estructurado.',
  ],
  pages: [
    lesson('¿Para qué sirve la lógica?', 'Razonar bien es una habilidad que se entrena', [
      flow([['🗣️', 'Alguien afirma|algo'], ['🔍', 'Revisamos si es|verdadero o falso'], ['🧩', 'Combinamos|afirmaciones'], ['✅', 'Llegamos a una|conclusión']], 'Del enunciado a la conclusión'),
      def('Lógica matemática', 'Es la parte de las matemáticas que estudia **cómo se razona**: cuándo una afirmación es verdadera, cuándo es falsa y cómo se combinan varias para concluir de forma correcta.'),
      ana('Un reglamento de la escuela dice: «Si llegas tarde, entonces no entras a primera hora». Para saber si alguien **cumplió o rompió** esa regla necesitas razonar con lógica. Eso haremos aquí.'),
      ex('En un debate sobre **derechos humanos** alguien dice: «Todas las personas tienen derecho a la educación y a la salud». ¿Es verdadera la frase completa solo si **ambas** partes lo son? La lógica nos da la respuesta exacta.'),
    ], 'La lógica no opina: revisa si el razonamiento está bien construido.', 'Para qué sirve'),

    lesson('Proposiciones', 'La unidad básica: algo que puede ser verdadero (V) o falso (F)', [
      def('Proposición', 'Un enunciado que puede ser **verdadero (V)** o **falso (F)**, pero **no ambos** a la vez. Se nombran con letras minúsculas: **p, q, r, s…**'),
      tbl(['Enunciado', '¿Es proposición?', 'Valor'], [['7 es un número primo', '✅ Sí', 'V'], ['La Tierra es plana', '✅ Sí', 'F'], ['¿Qué hora es?', '❌ No (pregunta)', '—'], ['Cierra la puerta', '❌ No (orden)', '—'], ['x + 2 = 5', '❌ No (depende de x)', '—'], ['¡Qué bonito día!', '❌ No (exclamación)', '—']]),
      it('Simple', 'No se puede dividir en otras proposiciones: «Llueve».'),
      it('Compuesta', 'Une varias con conectivos: «Llueve **y** hace frío».'),
      warn('Las preguntas, órdenes, deseos y exclamaciones **no** son proposiciones: no se pueden calificar como verdaderas o falsas.'),
    ], 'Si puedes decir «es verdadero» o «es falso», es una proposición.', 'Proposiciones'),

    match('¿Es proposición?', 'Clasifica cada enunciado', [
      ['México está en América del Norte', 'Proposición verdadera', 'Es un hecho verificable: V.'],
      ['5 + 3 = 9', 'Proposición falsa', 'Se puede decir que es falso: F.'],
      ['¿Ya hiciste la tarea?', 'No es proposición', 'Es una pregunta.'],
      ['Los gatos son aves', 'Proposición falsa', 'Afirma algo falso.'],
      ['Guarda silencio, por favor', 'No es proposición', 'Es una orden.'],
      ['x − 3 = 10', 'No es proposición', 'Depende del valor de x.'],
    ], ['Proposición verdadera', 'Proposición falsa', 'No es proposición'], 'Actividad: proposiciones'),

    lesson('Negación y conjunción', 'Los conectivos «no» y «y»', [
      tiles([['¬', 'Negación', '«no p» invierte el valor'], ['∧', 'Conjunción', '«p y q»']]),
      def('Negación (¬p)', 'Cambia el valor de verdad: si p es V, **¬p es F**; si p es F, **¬p es V**. Ejemplo: p: «Llueve» → ¬p: «**No** llueve».'),
      md('| p | ¬p |\n|---|---|\n| V | F |\n| F | V |'),
      def('Conjunción (p ∧ q)', 'Se lee «p **y** q». Es **verdadera solo si las dos son verdaderas**.'),
      md('| p | q | p ∧ q |\n|---|---|---|\n| V | V | **V** |\n| V | F | F |\n| F | V | F |\n| F | F | F |'),
      img('assets/lessons/1-1-venn.svg', 'Diagramas de Venn de la conjunción y la disyunción'),
      ana('Para entrar al concierto necesitas **boleto y** identificación. Si te falta una, no entras: la conjunción exige las dos.'),
    ], '∧ solo es V cuando **ambas** son V.', 'Negación y conjunción'),

    lesson('Disyunción', 'El conectivo «o» (inclusivo)', [
      def('Disyunción (p ∨ q)', 'Se lee «p **o** q». Es **verdadera si al menos una es verdadera**; solo es falsa cuando **las dos son falsas**.'),
      md('| p | q | p ∨ q |\n|---|---|---|\n| V | V | V |\n| V | F | **V** |\n| F | V | **V** |\n| F | F | F |'),
      ana('Para pagar puedes usar **efectivo o tarjeta**. Si llevas las dos, también puedes pagar: es una «o» inclusiva.'),
      warn('En matemáticas «o» incluye la posibilidad de que **ambas** sean verdaderas (en el lenguaje diario a veces significa «una u otra, pero no las dos»).', 'Cuidado'),
    ], '∨ solo es F cuando **ambas** son F.', 'Disyunción'),

    match('Traduce a símbolos', 'Sea p: «Estudio» y q: «Apruebo»', [
      ['Estudio y apruebo', 'p ∧ q'], ['Estudio o apruebo', 'p ∨ q'], ['No estudio', '¬p'], ['No apruebo', '¬q'], ['Estudio y no apruebo', 'p ∧ ¬q'], ['No estudio o apruebo', '¬p ∨ q'],
    ], ['p ∧ q', 'p ∨ q', '¬p', '¬q', 'p ∧ ¬q', '¬p ∨ q'], 'Actividad: traducir'),

    lesson('Condicional y bicondicional', '«Si… entonces» y «si y solo si»', [
      def('Condicional (p → q)', 'Se lee «**si** p, **entonces** q». p es la **hipótesis** y q la **conclusión**. Solo es **falsa** cuando p es V y q es F.'),
      ana('Tu mamá te dice: «**Si** sacas buenas calificaciones, **entonces** te compro un helado.» Solo te **mintió** si sacaste buenas calificaciones (p = V) y **no** hubo helado (q = F). Si no sacaste buenas calificaciones, no rompió su promesa, haya helado o no.', '🍦 La promesa'),
      def('Bicondicional (p ↔ q)', 'Se lee «p **si y solo si** q». Es **verdadera cuando p y q tienen el mismo valor** (las dos V o las dos F).'),
      md('| p | q | p → q | p ↔ q |\n|---|---|---|---|\n| V | V | V | V |\n| V | F | **F** | F |\n| F | V | V | F |\n| F | F | V | V |'),
      warn('«Si p entonces q» **no** es lo mismo que «si q entonces p». Cambiar el orden cambia el significado.'),
    ], '→ solo es F en V→F. ↔ es V si ambas son iguales.', 'Condicional y bicondicional'),

    mc('Repaso rápido', 'Cuatro preguntas para fijar los conectivos', [
      ['¿Cuándo es verdadera **p ∧ q**?', ['Cuando al menos una es V', 'Cuando ambas son V', 'Cuando ambas son F'], 1, 'La conjunción exige las dos verdaderas.'],
      ['¿Cuándo es falsa **p ∨ q**?', ['Cuando ambas son F', 'Cuando una es F', 'Cuando ambas son V'], 0, 'La disyunción solo falla si las dos son falsas.'],
      ['¿Cuándo es falso **p → q**?', ['Cuando p es F y q es V', 'Cuando p es V y q es F', 'Cuando ambas son F'], 1, 'La «promesa rota»: hipótesis V y conclusión F.'],
      ['Si p = V, ¿cuánto vale **¬p ∨ p**?', ['F', 'V', 'No se puede saber'], 1, 'p es V, así que p ∨ ¬p ya es V.'],
    ], 'Repaso'),

    tt('Completa las tablas de verdad', 'Conjunción y disyunción', ['p', 'q'], [{ h: 'p ∧ q', f: 'p && q' }, { h: 'p ∨ q', f: 'p || q' }, { h: '¬p', f: '!p' }], 'Llena cada columna. Recuerda: ∧ solo es V si ambas V; ∨ solo es F si ambas F.', 'Actividad: tablas básicas'),

    lesson('Cómo construir una tabla de verdad', 'Paso a paso, sin perderte', [
      it('1. Letras', 'Identifica las proposiciones simples y ponles una letra (p, q, r…).'),
      it('2. Filas', 'Con **n** letras hay **2ⁿ filas**: 2 letras → 4 filas; 3 letras → 8 filas.'),
      it('3. Orden', 'En la primera columna pon la mitad V y la mitad F; en la siguiente alterna de la mitad de la mitad… (VV, VF, FV, FF).'),
      it('4. Columnas', 'Resuelve **por columnas**: primero negaciones y paréntesis, al final el conectivo principal.'),
      steps('Ejemplo: tabla de ¬p ∨ q', ['Hay 2 letras → **4 filas**: VV, VF, FV, FF.', 'Columna ¬p: invierte p → **F, F, V, V**.', 'Columna ¬p ∨ q: V si alguna de las dos es V.', 'Fila VV: F ∨ V = **V**. Fila VF: F ∨ F = **F**. Fila FV: V ∨ V = **V**. Fila FF: V ∨ F = **V**.', 'Resultado: **V, F, V, V**. ¡Es igual a la tabla de p → q! Son proposiciones **equivalentes**.']),
    ], 'n letras → 2ⁿ filas. Se resuelve de lo más pequeño a lo más grande.', 'Construir tablas'),

    order('Ordena los pasos', 'Pon en orden el procedimiento para construir una tabla de verdad', [
      ['Identificar las proposiciones simples y asignarles letras'], ['Calcular cuántas filas habrá (2ⁿ)'], ['Escribir las combinaciones de V y F para las letras'], ['Resolver las negaciones y los paréntesis'], ['Resolver el conectivo principal y leer el resultado'],
    ], 'Actividad: ordenar pasos'),

    tt('Tabla de ¬p ∨ q y p → q', 'Comprueba que son equivalentes', ['p', 'q'], [{ h: '¬p', f: '!p' }, { h: '¬p ∨ q', f: '!p || q' }, { h: 'p → q', f: '!p || q' }], 'Completa las tres columnas. ¿Qué notas en las dos últimas?', 'Actividad: equivalencia'),

    lesson('Tipos de proposición compuesta', 'Tautología, contradicción y contingencia', [
      tiles([['🟢', 'Tautología', 'Siempre verdadera'], ['🔴', 'Contradicción', 'Siempre falsa'], ['🟡', 'Contingencia', 'A veces V y a veces F']]),
      ex('**p ∨ ¬p** es tautología: «Llueve o no llueve» siempre es verdadera.', 'Tautología'),
      ex('**p ∧ ¬p** es contradicción: «Llueve y no llueve» nunca es verdadera.', 'Contradicción'),
      def('Leyes de De Morgan', '**¬(p ∧ q)** equivale a **¬p ∨ ¬q**, y **¬(p ∨ q)** equivale a **¬p ∧ ¬q**. Sirven para negar frases con «y» / «o».'),
      ex('La negación de «Tengo celular **y** tengo internet» es «**No** tengo celular **o no** tengo internet».'),
    ], 'Al revisar toda la tabla sabes de qué tipo es.', 'Tautología y contradicción'),

    match('Clasifica', '¿Tautología, contradicción o contingencia?', [
      ['p ∨ ¬p', 'Tautología'], ['p ∧ ¬p', 'Contradicción'], ['p ∧ q', 'Contingencia'], ['p → p', 'Tautología'], ['p ↔ ¬p', 'Contradicción'], ['(p ∧ q) → p', 'Tautología'],
    ], ['Tautología', 'Contradicción', 'Contingencia'], 'Actividad: clasificar'),

    gen('Calcula valores de verdad', 'Sustituye y resuelve. Pulsa «Otros ejercicios» cuantas veces quieras', 'logica', 5, 'Práctica: valores'),
    gen('Filas y tipos', 'Cuántas filas tiene una tabla y de qué tipo es', 'filas', 4, 'Práctica: filas'),

    write('Tu propio razonamiento', 'Escribe una proposición condicional sobre un derecho humano', 'Escribe una proposición condicional (si… entonces…) sobre educación, salud o igualdad y explica **en qué caso sería falsa**.', [['Usa «si… entonces…»', 'si.*entonces'], ['Habla de un derecho (educación, salud, igualdad…)', 'educacion|salud|igualdad|derecho|agua|vivienda|trabajo'], ['Explica cuándo sería falsa', 'falsa|falso|no se cumple|miente|equivocad']], 3, 'Recuerda: p → q solo es falsa cuando p es V y q es F.', 'Actividad: razonar'),

    lesson('Resumen del módulo', 'Lo esencial de lógica matemática', [
      tbl(['Conectivo', 'Símbolo', 'Es V cuando…'], [['Negación', '¬p', 'p es F'], ['Conjunción', 'p ∧ q', 'ambas son V'], ['Disyunción', 'p ∨ q', 'al menos una es V'], ['Condicional', 'p → q', 'no ocurre V → F'], ['Bicondicional', 'p ↔ q', 'ambas tienen el mismo valor']]),
      md('- **n** proposiciones simples → **2ⁿ** filas.\n- **Tautología:** siempre V · **Contradicción:** siempre F · **Contingencia:** a veces V y a veces F.\n- **De Morgan:** ¬(p ∧ q) ≡ ¬p ∨ ¬q · ¬(p ∨ q) ≡ ¬p ∧ ¬q.\n- **p → q** equivale a **¬p ∨ q**.'),
    ], 'Ya puedes preparar tu práctica final.', 'Resumen'),

    practica({
      t: 'Tablas de verdad y derechos humanos', sub: 'Evidencia de la actividad de evaluación 1.1.1 · vale el 15 % del curso',
      intro: 'En equipo analizarán un debate sobre derechos humanos con tablas de verdad y tomarán una decisión fundamentada.',
      mat: 'Hojas o cuaderno, regla, lápiz de colores (puede hacerse a mano) o un documento digital.',
      steps: ['Formen un equipo de 3 o 4 personas y **elijan un derecho** (educación, salud, igualdad de género, medio ambiente sano, no discriminación…).',
        'Redacten **4 proposiciones simples** sobre ese derecho y póngales letra (p, q, r, s).',
        'Armen **3 proposiciones compuestas**: una con ∧ o ∨, una condicional (→) y otra con negación o bicondicional (↔).',
        'Construyan la **tabla de verdad completa** de cada una, sin saltarse filas.',
        '**Analicen:** ¿en qué filas se garantiza el derecho? ¿qué condiciones faltan en las filas donde no?',
        'Escriban una **conclusión** o propuesta apoyada en lo que muestran las tablas (5 a 8 renglones).'],
      deliver: 'Foto o PDF legible con las proposiciones (en símbolos y en palabras), las tablas y la conclusión.',
      rubric: [['Proposiciones', 'Claras y bien clasificadas', 'Algunas confusas', 'No son proposiciones'], ['Tablas de verdad', 'Completas y correctas', 'Pequeños errores', 'Incompletas'], ['Análisis', 'Relaciona la tabla con el derecho', 'Solo describe', 'Sin análisis'], ['Conclusión', 'Fundamentada en las tablas', 'Poco sustentada', 'Ausente']],
    }),
  ],
};
