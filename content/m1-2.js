import { lesson, def, ex, ana, warn, it, p, md, img, flow, tiles, tbl, steps, viz, match, mc, order, cloze, gen, abaco, write, practica } from '../js/mk.js';

export default {
  id: 'm1-2', unit: '1.2', title: 'Conteo y sistemas numéricos', sub: 'Cómo las culturas inventaron los números, el cero y el ábaco', minutes: 75, weight: 5,
  goals: [
    'Explicar cómo contaban **egipcios, mesopotámicos, mayas, indios y árabes**.',
    'Leer y escribir números en **sistema romano y maya**.',
    'Entender el **valor posicional** y la importancia del **cero**.',
    'Representar y sumar números en el **ábaco**.',
  ],
  pages: [
    lesson('¿Por qué contamos?', 'Los números nacieron de necesidades reales', [
      flow([['🐑', 'Necesito saber|cuántos hay'], ['🪵', 'Hago marcas|(palitos)'], ['🔣', 'Invento|símbolos'], ['🔢', 'Creo un|sistema']], 'De la necesidad al sistema numérico'),
      def('Sistema de numeración', 'Un conjunto de **símbolos y reglas** para representar cantidades. Cada cultura inventó el suyo según lo que necesitaba: repartir cosechas, cobrar impuestos, medir el tiempo o comerciar.'),
      ana('Un pastor quiere saber si regresaron todas sus ovejas. Hace una marca por oveja que sale y la tacha cuando regresa. Eso es **contar**: relacionar cada objeto con una marca o símbolo.'),
      tiles([['🌾', 'Cosechas', 'repartir y almacenar'], ['🪙', 'Comercio', 'cobrar y pagar'], ['🌙', 'Calendario', 'medir el tiempo']]),
    ], 'Contar sirve para comparar, repartir y planear.', 'Para qué contamos'),

    lesson('Egipto: números con símbolos', 'Sistema decimal (base 10) y aditivo', [
      def('Sistema aditivo', 'Cada potencia de 10 tiene su **propio símbolo** y el número se forma **sumando** los símbolos. El orden no importa.'),
      tbl(['Valor', 'Símbolo (jeroglífico)'], [['1', 'palo vertical'], ['10', 'arco (talón)'], ['100', 'soga enrollada'], ['1 000', 'flor de loto'], ['10 000', 'dedo'], ['100 000', 'renacuajo'], ['1 000 000', 'dios con brazos alzados']]),
      ex('**1 324** = 1 flor de loto + 3 sogas + 2 arcos + 4 palos, porque 1 000 + 3 × 100 + 2 × 10 + 4.'),
      warn('Para escribir **999** los egipcios necesitaban **27 símbolos** (9 + 9 + 9). ¡Por eso se inventaron sistemas más cómodos!'),
    ], 'Egipto: base 10, símbolos que se suman.', 'Egipto'),

    match('Descifra números egipcios', 'Une cada combinación de símbolos con su valor', [
      ['1 flor de loto, 3 sogas, 2 arcos y 4 palos', '1 324'], ['2 flores de loto y 5 palos', '2 005'], ['4 sogas y 6 arcos', '460'], ['1 dedo y 2 sogas', '10 200'], ['3 flores de loto, 1 soga y 7 palos', '3 107'],
    ], ['1 324', '2 005', '460', '10 200', '3 107'], 'Actividad: números egipcios'),

    lesson('Mesopotamia: base 60', 'Escritura cuneiforme y valor posicional', [
      p('Los sumerios y babilonios escribían con una cuña sobre tablillas de arcilla (**cuneiforme**). Usaban la **base 60**: cada posición vale 60 veces la anterior.'),
      def('Sistema posicional', 'El valor de una cifra depende de **dónde está escrita**. Es el mismo principio que usamos hoy con unidades, decenas y centenas.'),
      ex('**125** = 2 × 60 + 5 → se escribe (2)(5). **3 725** = 1 × 3 600 + 2 × 60 + 5 → (1)(2)(5).'),
      tiles([['⏱️', '60 minutos', 'una hora'], ['⏲️', '60 segundos', 'un minuto'], ['📐', '360 grados', '6 × 60 de un círculo']]),
      ana('Cuando dices «dos horas con cinco minutos» estás usando la base 60 que inventaron hace más de 4 000 años.', 'Huella en tu vida'),
    ], 'La base 60 sobrevive en el reloj y en los ángulos.', 'Mesopotamia'),

    lesson('Olmecas y mayas: base 20 y el cero', 'Punto, barra y concha', [
      def('Numeración maya', 'Usaban **base 20** con tres signos: **● = 1**, **▬ = 5** y la **concha = 0**. Los números se escriben en **columnas verticales**: el nivel de abajo vale 1 y el de arriba vale 20.'),
      tbl(['Número', 'Se escribe', 'Cálculo'], [['3', '●●●', '1 + 1 + 1'], ['7', '▬ ●●', '5 + 2'], ['13', '▬ ▬ ●●●', '5 + 5 + 3'], ['19', '▬ ▬ ▬ ●●●●', '15 + 4'], ['20', 'arriba ●, abajo concha', '1 × 20 + 0'], ['45', 'arriba ●●, abajo ▬', '2 × 20 + 5']]),
      ana('Los olmecas y mayas ya usaban el **cero** como símbolo hace más de 2 000 años, siglos antes de que llegara a Europa.', '🌎 Dato histórico'),
    ], 'Maya: base 20; ● vale 1, ▬ vale 5, concha vale 0.', 'Mayas'),

    gen('Lee números mayas', '● = 1 y ▬ = 5. Pulsa «Otros ejercicios» para practicar más', 'maya', 5, 'Práctica: números mayas'),

    lesson('Roma: letras como números', 'Reglas del sistema romano', [
      tbl(['I', 'V', 'X', 'L', 'C', 'D', 'M'], [['1', '5', '10', '50', '100', '500', '1 000']]),
      it('Suma', 'Letras iguales o menores a la derecha se **suman**: VII = 5 + 2 = 7; XVI = 16.'),
      it('Resta', 'Una letra menor **a la izquierda** de una mayor se **resta**: IV = 4, IX = 9, XL = 40, XC = 90, CD = 400, CM = 900.'),
      it('Repetición', 'Una letra se repite hasta **3 veces** seguidas (III = 3, pero 4 es IV).'),
      ex('**MCMXCIV** = M (1 000) + CM (900) + XC (90) + IV (4) = **1 994**.'),
      warn('Los romanos **no tenían cero** y su sistema no es posicional: por eso es muy difícil sumar o multiplicar con él.'),
    ], 'I, V, X, L, C, D, M: se suma, se resta y se repite máximo 3 veces.', 'Roma'),

    gen('Números romanos', 'Convierte entre romanos y decimales', 'romano', 5, 'Práctica: romanos'),

    lesson('India, Arabia y Leonardo de Pisa', 'Cómo llegaron a Europa las cifras que usas hoy', [
      img('assets/lessons/1-2-linea-tiempo.svg', 'Línea del tiempo de los sistemas de numeración'),
      it('India (siglo VII)', 'Perfeccionó el sistema decimal **posicional** y trató al **cero como número** (Brahmagupta).'),
      it('Arabia (siglo IX)', 'Al-Juarismi explicó estas cifras y difundió el sistema. De su nombre viene la palabra **algoritmo**.'),
      it('Leonardo de Pisa (1202)', 'Conocido como **Fibonacci**. Aprendió las cifras de los comerciantes árabes y en su *Liber Abaci* enseñó a Europa los **dígitos 0 al 9** y el valor posicional.'),
      ana('Gracias a ese libro hoy escribes **2026** y no MMXXVI. Los comerciantes ganaron rapidez: sumar con cifras indoarábigas es mucho más fácil que con letras romanas.'),
    ], 'India creó el sistema, los árabes lo difundieron y Fibonacci lo llevó a Europa.', 'Fibonacci'),

    order('Ordena cronológicamente', 'De la más antigua a la más reciente', [
      ['Egipto: jeroglíficos decimales (≈3000 a. C.)'], ['Mesopotamia: base 60 (≈2000 a. C.)'], ['Olmecas y mayas: uso del cero (≈siglo I a. C.)'], ['India: cero y sistema posicional (siglo VII)'], ['Fibonacci publica el *Liber Abaci* (1202)'],
    ], 'Actividad: línea del tiempo'),

    match('¿De qué cultura se habla?', 'Une cada pista con su cultura', [
      ['Base 60: de ahí vienen los 60 minutos', 'Mesopotamia'], ['Punto, barra y concha', 'Mayas'], ['Jeroglíficos que se suman', 'Egipto'], ['Letras I, V, X, L, C, D, M', 'Roma'], ['Tratar el cero como número', 'India'], ['Libro «Liber Abaci» (1202)', 'Leonardo de Pisa'],
    ], ['Mesopotamia', 'Mayas', 'Egipto', 'Roma', 'India', 'Leonardo de Pisa'], 'Actividad: culturas'),

    lesson('Números naturales y valor posicional', 'El sistema decimal que usamos hoy', [
      def('Números naturales (ℕ)', 'Son los números con los que **contamos**: **1, 2, 3, 4, …** sin fin. Con ellos siempre se puede sumar y multiplicar dentro del mismo conjunto.'),
      def('Valor posicional', 'Cada cifra vale según su **posición**, de derecha a izquierda: unidades, decenas, centenas, millares…'),
      tbl(['Millares', 'Centenas', 'Decenas', 'Unidades'], [['3', '5', '0', '2']]),
      ex('**3 502** = 3 × 1 000 + 5 × 100 + 0 × 10 + 2. El **5** vale **500**, no 5.', 'Forma desarrollada'),
      warn('El **cero** ocupa los lugares vacíos. Sin él, 35, 305 y 3 005 se confundirían. Por eso fue tan importante.'),
    ], 'Cada cifra vale según el lugar que ocupa; el cero guarda lugares vacíos.', 'Valor posicional'),

    gen('Valor posicional', '¿Cuánto vale la cifra en su posición?', 'posicional', 5, 'Práctica: posiciones'),

    lesson('El ábaco', 'Una calculadora de más de 4 000 años', [
      def('Ábaco', 'Instrumento de cálculo con **varillas** (cada una es una posición decimal) y **cuentas** que se desplazan para mostrar una cifra. Se usó en Mesopotamia, Grecia, Roma, China y América.'),
      viz('abaco', '🧮 Pruébalo: toca las cuentas para formar un número', { rods: 4 }),
      steps('Cómo sumar 375 + 48 en el ábaco', ['Representa **375**: centenas 3, decenas 7, unidades 5.', 'Suma **48**. Unidades: 5 + 8 = 13 → la varilla de unidades queda en **3** y subes **1** en decenas (acarreo).', 'Decenas: 7 + 4 + 1 = 12 → queda **2** y subes **1** en centenas.', 'Centenas: 3 + 1 = 4.', 'Resultado: **423**.']),
    ], 'Si una varilla pasa de 9, baja las cuentas y sube 1 en la varilla de la izquierda.', 'El ábaco'),

    abaco('Representa números en el ábaco', 'Forma cada número y pulsa «Comprobar»', [1203, 450, 3099, 7008], 4, 'Actividad: ábaco'),

    mc('Repaso rápido', 'Cinco preguntas sobre todo el módulo', [
      ['¿Qué base usaban los mayas?', ['10', '20', '60'], 1, 'La numeración maya es de base 20.'],
      ['El sistema romano **no** es posicional. ¿Qué consecuencia tiene?', ['Es difícil operar con él', 'Es más rápido que el decimal', 'No tiene el número 1'], 0, 'Sin posiciones, sumar o multiplicar es muy incómodo.'],
      ['¿Qué libro llevó las cifras indoarábigas a Europa?', ['Elementos de Euclides', 'Liber Abaci', 'El Quijote'], 1, 'Fibonacci lo escribió en 1202.'],
      ['En 4 072, la cifra 7 vale…', ['7', '70', '700'], 1, 'Está en las decenas: 7 × 10 = 70.'],
      ['¿Qué aporta el cero al sistema posicional?', ['Marca lugares vacíos y permite distinguir 35, 305 y 3 005', 'Sirve solo para restar', 'No cambia nada'], 0, 'Guarda el lugar vacío.'],
    ], 'Repaso'),

    write('Explica con tus palabras', '¿Por qué fue tan importante el cero?', 'Explica por qué el cero fue un gran descubrimiento. Usa como ejemplo los números 35, 305 y 3 005.', [['Habla de posición o lugar', 'posicion|lugar|vacio|espacio'], ['Compara 35, 305 y 3 005', '305|3 ?005|3005'], ['Dice que distingue o diferencia cantidades', 'distingu|diferenci|confund|cambia|significa|valor']], 3, 'Piensa qué pasaría si no pudieras escribir un lugar vacío.', 'Actividad: el cero'),

    lesson('Resumen del módulo', 'Lo esencial de conteo y numeración', [
      tbl(['Cultura', 'Base', 'Idea principal'], [['Egipto', '10', 'Símbolos que se suman'], ['Mesopotamia', '60', 'Posicional; hoy: 60 min y 360°'], ['Mayas', '20', 'Punto, barra y concha (cero)'], ['India', '10', 'Posicional con cero'], ['Roma', '10', 'Letras; no posicional']]),
      md('- **Fibonacci (1202)** llevó el sistema indoarábigo a Europa con el *Liber Abaci*.\n- **Valor posicional:** 3 502 = 3 × 1 000 + 5 × 100 + 0 × 10 + 2.\n- **Ábaco:** cada varilla es una posición; si pasas de 9 se hace acarreo.'),
    ], 'Ya puedes construir tu ábaco.', 'Resumen'),

    practica({
      t: 'Modelo de ábaco con material reciclable', sub: 'Evidencia de la actividad de evaluación 1.2.1 · vale el 5 % del curso',
      intro: 'Construye tu propio ábaco y explica por escrito cómo funciona y para qué sirvió.',
      mat: 'Caja o tapa de cartón, palitos de brocheta o alambre, tapitas, botones o cuentas, plastilina o pegamento y plumón.',
      steps: ['Arma el marco con el cartón y coloca **4 varillas**: Millares, Centenas, Decenas y Unidades.', 'Pon **9 cuentas** en cada varilla y **etiqueta** las columnas.', 'Comprueba que funciona representando **tres números** (por ejemplo 1 203, 450 y 3 099) y toma fotos.', 'Realiza una **suma con acarreo** en tu ábaco (por ejemplo 375 + 48) y toma una foto del resultado.', 'Escribe la explicación (mínimo **10 renglones**): ¿qué es un ábaco?, ¿quién lo usó?, ¿cómo se representa un número?, ¿cómo se suma?, ¿para qué sirvió en la historia?'],
      deliver: 'Fotos del modelo mostrando los tres números y la suma, más la explicación escrita (foto del cuaderno, PDF o documento).',
      rubric: [['Modelo', 'Funcional, con etiquetas y material reciclado', 'Funciona con detalles', 'No funciona o está incompleto'], ['Demostración', 'Tres números y una suma correctos', 'Un error', 'No demuestra'], ['Explicación', 'Clara, completa y con contexto histórico', 'Incompleta', 'Ausente o copiada']],
    }),
  ],
};
