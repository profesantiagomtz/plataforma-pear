import { lesson, def, ex, ana, warn, it, p, md, img, flow, tiles, tbl, steps, words, vis, alt, viz, match, mc, order, cloze, gen, guia, write, practica } from '../js/mk.js';

export default {
  id: 'm1-3', unit: '1.3', title: 'Números naturales y enteros', sub: 'Positivos y negativos, divisores, múltiplos, MCD y MCM (todo explicado con ejemplos)', minutes: 130, weight: 10,
  goals: [
    'Saber a qué **familia** pertenece un número (naturales, enteros, fracciones…).',
    'Sumar, restar, multiplicar y dividir **números negativos** sin confundirte.',
    'Entender qué es un **múltiplo**, un **divisor**, un **número primo**, el **MCD** y el **MCM**.',
    'Usar el MCD y el MCM para resolver problemas de **repartir** y de **coincidir**.',
  ],
  pages: [
    lesson('Los números tienen familias', 'Cada número pertenece a un grupo', [
      words([['Número natural', 'los que usas para contar cosas: 1, 2, 3, 4… 🍎'], ['Número entero', 'los naturales, el cero y los negativos: …−2, −1, 0, 1, 2…'], ['Número racional', 'los que se escriben como fracción, como ½ o 0.75 🍰'], ['Número irracional', 'decimales «raros» que nunca terminan ni se repiten, como π'], ['Número real', 'todos los anteriores juntos']]),
      img('assets/lessons/1-3-conjuntos.svg', 'Los conjuntos de números, uno dentro de otro'),
      ana('Piénsalo como **muñecas rusas** 🪆: los naturales caben dentro de los enteros, los enteros dentro de los racionales y los racionales dentro de los reales.'),
      tbl(['Familia', 'Ejemplos', 'Cuándo la usas'], [['Naturales', '1, 2, 3, 100', 'contar manzanas 🍎'], ['Enteros', '−5, 0, 8', 'temperaturas, deudas'], ['Racionales', '½, −3/4, 0.25', 'partes de algo, 🍰'], ['Irracionales', '√2, π', 'círculos, medidas especiales']]),
    ], 'ℕ ⊂ ℤ ⊂ ℚ ⊂ ℝ: cada familia cabe en la siguiente.', 'Familias de números'),

    guia('Practica con ayuda', '¿A qué familia pertenece?', [
      { q: 'Tienes **3 manzanas** 🍎. El número 3 sirve para **contar**. ¿Es natural?', mode: 'sel', opts: ['Sí', 'No'], ans: 'Sí', hint: 'Los naturales son los que usas para contar: 1, 2, 3…', ok: 'Sí, 3 es natural.' },
      { q: 'Hace **−5 grados** de frío 🥶. ¿Un número negativo puede ser natural?', mode: 'sel', opts: ['Sí', 'No'], ans: 'No', hint: 'Con los naturales no puedes contar cosas «negativas».', ok: 'No: −5 es entero, pero no natural.' },
      { q: 'Te comiste **la mitad** de una pizza 🍕: ½. ¿A qué familia pertenece ½?', mode: 'sel', opts: ['Entero', 'Racional'], ans: 'Racional', hint: 'Es una fracción.', ok: 'Las fracciones son racionales.' },
      { q: 'El número π (3.14159…) nunca termina ni se repite. ¿Es racional o irracional?', mode: 'sel', opts: ['Racional', 'Irracional'], ans: 'Irracional', hint: 'Los decimales «raros» que nunca terminan ni se repiten se llaman irracionales.', ok: 'Eso es: π es irracional.' },
    ], 'Contestamos una por una.', 'Con ayuda: familias'),

    match('Ahora tú solo: clasifica', 'Elige la familia más específica de cada número', [
      ['12', 'Natural (ℕ)'], ['−7', 'Entero (ℤ)'], ['0', 'Entero (ℤ)'], ['3/4', 'Racional (ℚ)'], ['−2.5', 'Racional (ℚ)'], ['√3', 'Irracional'], ['π', 'Irracional'],
    ], ['Natural (ℕ)', 'Entero (ℤ)', 'Racional (ℚ)', 'Irracional'], 'Tú solo: clasificar'),

    lesson('Números negativos: deudas y frío', 'Los números que están «debajo» del cero', [
      words([['Positivo', 'mayor que cero: lo que tienes o ganas (+)'], ['Negativo', 'menor que cero: lo que debes o pierdes (−)'], ['Opuesto', 'el mismo número con el signo contrario: el opuesto de 5 es −5']]),
      vis([['−3', '−2', '−1', '0', '1', '2', '3']], 'La recta numérica: a la derecha son positivos, a la izquierda negativos. El 0 está en medio.'),
      tiles([['💰', 'Tengo $5', '+5'], ['💸', 'Debo $5', '−5'], ['🌡️', '5° bajo cero', '−5']]),
      ana('Si debes **$3** y tienes **$0**, tu dinero es **−3**. Si te regalan $5, pagas la deuda y te sobran **$2**: −3 + 5 = **2**.', '💰 Con dinero'),
    ], 'Negativo = deuda o frío; positivo = lo que tienes.', 'Negativos'),

    lesson('Sumar enteros', 'Con dinero es facilísimo', [
      words([['Signo', 'el + o el − que va antes del número']]),
      it('Mismo signo', 'Se **juntan**: debo $6 y debo $4 más → debo **$10**: (−6) + (−4) = **−10**.'),
      it('Signos distintos', 'Se **compensan**: debo $8 y me dan $5 → todavía debo **$3**: (−8) + 5 = **−3**.'),
      steps('Ejemplo: (−8) + 5', ['Imagina: **debes $8**.', 'Te dan **$5** y los usas para pagar.', 'Todavía debes **$3**.', 'Resultado: **−3**.']),
      alt('En la recta numérica: empiezas en **−8** y **avanzas 5 pasos a la derecha** (porque sumas). Llegas al **−3**.', '🤔 ¿Lo veo en la recta?'),
    ], 'Juntar si son iguales; compensar si son distintos.', 'Sumar enteros'),

    lesson('Restar enteros', 'Restar es sumar el «opuesto»', [
      def('Resta = suma del opuesto', '**a − b = a + (−b)**. Es decir: restar un número es **sumar su opuesto**.'),
      vis([['7', '−', '12', '=', '7 + (−12)', '=', '−5']], 'Es lo mismo: restar 12 es sumar −12.'),
      ana('Quitarle a alguien **una deuda** es como **regalarle dinero**. Por eso **5 − (−3)** = 5 + 3 = **8**: si te quitan una deuda de $3, ¡tienes $3 más!', '💰 La deuda que desaparece'),
      steps('Ejemplo: 5 − (−3)', ['Restar es sumar el opuesto.', 'El opuesto de **−3** es **3**.', 'Entonces 5 − (−3) = 5 + 3.', 'Resultado: **8**.']),
      warn('Un **menos delante de un negativo** se convierte en **más**: 5 − (−3) = 5 + 3.'),
    ], 'Restar un negativo es lo mismo que sumar un positivo.', 'Restar enteros'),

    guia('Practica con ayuda', 'Sumar y restar con dinero', [
      { q: 'No tienes nada y **debes $8** (−8). Te dan **$5**. ¿Cuánto tienes ahora? (−8 + 5)', mode: 'n', ans: -3, hint: 'Pagas $5 de tu deuda de $8; todavía debes algo. Si debes, el número es negativo.', ok: '−8 + 5 = −3 (todavía debes $3).' },
      { q: 'Debes $6 (−6) y debes otros $4 (−4). ¿Cuánto debes en total? (−6 + −4)', mode: 'n', ans: -10, hint: 'Las deudas se juntan: 6 + 4, pero como son deudas queda negativo.', ok: '−10.' },
      { q: '**7 − 12** es lo mismo que 7 + (−12). ¿Cuánto da?', mode: 'n', ans: -5, hint: 'Tienes 7 y debes 12: pagas 7 y aún debes 5.', ok: '−5.' },
      { q: '**5 − (−3)**: restar un negativo es sumar. ¿Cuánto da?', mode: 'n', ans: 8, hint: 'Cambia el − (−3) por + 3.', ok: '5 + 3 = 8.' },
    ], 'Piensa siempre en dinero: lo que tienes y lo que debes.', 'Con ayuda: sumas y restas'),

    gen('Ahora tú solo: sumas y restas de enteros', 'Piensa en dinero. «Otros ejercicios» te da más', 'enterosFacil', 6, 'Tú solo: sumar y restar'),

    lesson('Multiplicar y dividir con signos', 'La regla de los amigos y enemigos', [
      words([['Ley de signos', 'la regla que dice si el resultado de × o ÷ es positivo o negativo']]),
      def('Ley de signos', '**Signos iguales → resultado positivo (+). Signos distintos → resultado negativo (−).**'),
      ana('**El amigo de mi amigo es mi amigo** (+ × + = +). **El enemigo de mi enemigo es mi amigo** (− × − = +). **El amigo de mi enemigo es mi enemigo** (+ × − = −).', '😄 Para que no se te olvide'),
      tbl(['Cuenta', 'Signos', 'Resultado'], [['(+3) × (+4)', 'iguales', '+12'], ['(−3) × (−4)', 'iguales', '+12'], ['(+3) × (−4)', 'distintos', '−12'], ['(−3) × (+4)', 'distintos', '−12'], ['−36 ÷ 9', 'distintos', '−4'], ['−48 ÷ (−6)', 'iguales', '+8']]),
    ], 'Iguales (+), distintos (−). Con × y con ÷ es igual.', 'Ley de signos'),

    guia('Practica con ayuda', 'Ley de signos', [
      { q: '(−4) × 6. Signos: − y +, ¿iguales o distintos?', mode: 'sel', opts: ['Iguales', 'Distintos'], ans: 'Distintos', hint: 'Uno es negativo y el otro positivo.', ok: 'Distintos → resultado negativo.' },
      { q: 'Entonces (−4) × 6 = ?', mode: 'n', ans: -24, hint: '4 × 6 = 24, y como es distinto signo, es negativo.', ok: '−24.' },
      { q: '(−5) × (−7) = ? (los dos son negativos, el «enemigo de mi enemigo»)', mode: 'n', ans: 35, hint: 'Signos iguales → positivo. 5 × 7 = 35.', ok: '+35.' },
      { q: '−36 ÷ 9 = ?', mode: 'n', ans: -4, hint: 'Distintos signos → negativo. 36 ÷ 9 = 4.', ok: '−4.' },
    ], 'Primero decide el signo, luego haz la cuenta.', 'Con ayuda: signos'),

    gen('Ahora tú solo: multiplicar y dividir con signos', 'Mezcla de las cuatro operaciones', 'enteros', 6, 'Tú solo: operaciones'),

    lesson('Propiedades: reglas que siempre funcionan', 'Atajos para hacer cuentas más fácil', [
      words([['Propiedad', 'una regla que siempre se cumple']]),
      it('Conmutativa', '**Cambiar el orden no cambia el resultado** (en suma y multiplicación). 3 + 5 = 5 + 3. Meter primero las manzanas o primero las peras en la bolsa da lo mismo 🍎🍐.'),
      it('Asociativa', '**Agrupar distinto no cambia el resultado.** (2 + 3) + 4 = 2 + (3 + 4).'),
      it('Distributiva', '**Repartir** una multiplicación sobre una suma: 4 × (10 + 3) = 4 × 10 + 4 × 3 = 40 + 12 = **52**. Sirve para hacer cuentas de cabeza.'),
      it('Neutro', 'El que **no cambia nada**: en la suma es el **0** (5 + 0 = 5); en la multiplicación es el **1** (5 × 1 = 5).'),
      it('Inverso', 'El que **te regresa al neutro**: 5 + (−5) = 0 (inverso de la suma); 5 × 1/5 = 1 (inverso de la multiplicación).'),
      warn('La **resta** y la **división** **no** son conmutativas: 7 − 3 no es igual que 3 − 7.'),
    ], 'Conmutativa: orden. Asociativa: grupos. Distributiva: repartir.', 'Propiedades'),

    match('¿Qué propiedad se usa?', 'Une cada igualdad con su propiedad', [
      ['5 + 8 = 8 + 5', 'Conmutativa'], ['(2 + 3) + 4 = 2 + (3 + 4)', 'Asociativa'], ['6 × (4 + 1) = 24 + 6', 'Distributiva'], ['9 + 0 = 9', 'Neutro aditivo'], ['7 × 1 = 7', 'Neutro multiplicativo'], ['5 + (−5) = 0', 'Inverso aditivo'],
    ], ['Conmutativa', 'Asociativa', 'Distributiva', 'Neutro aditivo', 'Neutro multiplicativo', 'Inverso aditivo'], 'Tú solo: propiedades'),

    lesson('Múltiplos: contar de salto en salto', 'La base para entender el MCM', [
      words([['Múltiplo', 'un número que sale al **contar de salto en salto**. Los múltiplos de 3 son 3, 6, 9, 12…'], ['Salto', 'el número de 3 en 3, de 4 en 4, etc.']]),
      def('Múltiplos', 'Los **múltiplos de un número** son los que obtienes **multiplicándolo por 1, 2, 3, 4…** Es decir, **contar de salto en salto**.'),
      vis([['3', '6', '9', '12', '15', '…']], 'Múltiplos de 3: saltas de 3 en 3 (son la tabla del 3).'),
      ana('Es como **subir escaleras de 3 en 3**: pisas el 3, luego el 6, luego el 9… **Esos escalones son los múltiplos del 3**.', '🪜 Como escaleras'),
      alt('Los múltiplos de un número **son su tabla de multiplicar**. Los múltiplos del 4 son 4, 8, 12, 16, 20… (¡la tabla del 4!).', '🤔 ¿Dónde los he visto?'),
    ], 'Múltiplos = contar de salto en salto = tabla de multiplicar.', 'Múltiplos'),

    gen('Escribe múltiplos', 'Cuenta de salto en salto. Escribe los números separados por comas', 'multiplos', 4, 'Tú solo: múltiplos'),

    lesson('Divisores: lo que cabe exacto', 'La otra base para el MCD', [
      words([['Divisor', 'un número que **cabe exacto** (sin que sobre nada) dentro de otro']]),
      def('Divisores', 'Los **divisores de un número** son los que **lo dividen exacto**, sin sobrante.'),
      ana('Tienes **12 galletas** 🍪 y quieres hacer **bolsas iguales** sin que sobre ninguna. Puedes hacer bolsas de **1, 2, 3, 4, 6 o 12 galletas**. Esos números (1, 2, 3, 4, 6 y 12) son los **divisores de 12**.', '🍪 Con galletas'),
      vis([['🍪🍪🍪🍪', '🍪🍪🍪🍪', '🍪🍪🍪🍪']], '12 galletas en 3 bolsas de 4: ¡no sobra ninguna! Por eso 3 y 4 son divisores de 12.'),
      warn('Con **5** sí sobran: 12 ÷ 5 = 2 y sobran 2 galletas. Por eso **5 no es divisor de 12**.'),
      alt('Para encontrar los divisores de un número, prueba **1, 2, 3, 4…** y fíjate **cuáles dividen exacto**. Siempre salen de dos en dos: 1 × 12, 2 × 6, 3 × 4.', '🤔 ¿Cómo los encuentro?'),
    ], 'Divisor = cabe exacto, sin que sobre nada.', 'Divisores'),

    gen('¿Es divisor?', 'Contesta Sí o No', 'esDivisor', 5, 'Tú solo: ¿es divisor?'),
    gen('Escribe los divisores', 'Todos los que caben exacto, separados por comas', 'divisores', 4, 'Tú solo: divisores'),

    lesson('Números primos y compuestos', 'Los «ladrillos» de todos los números', [
      words([['Primo', 'tiene **solo dos divisores**: el 1 y él mismo'], ['Compuesto', 'tiene **más de dos** divisores']]),
      def('Primo', 'Un número es **primo** si solo se puede dividir exacto entre **1** y entre **él mismo**: 2, 3, 5, 7, 11, 13, 17, 19…'),
      def('Compuesto', 'Si tiene **más divisores**, es **compuesto**: 4 (1, 2, 4), 6, 9, 12… El **1** no es primo ni compuesto.'),
      tbl(['Truco', 'Si…'], [['Divisible entre 2', 'termina en 0, 2, 4, 6 u 8'], ['Divisible entre 3', 'la suma de sus cifras es múltiplo de 3 (51: 5 + 1 = 6 ✔)'], ['Divisible entre 5', 'termina en 0 o 5'], ['Divisible entre 10', 'termina en 0']]),
      ex('¿**51** es primo? Sus cifras suman 5 + 1 = 6, que es múltiplo de 3 → 51 se divide entre 3 → es **compuesto** (3 × 17).'),
    ], 'El 2 es el único primo que es par.', 'Primos y compuestos'),

    gen('¿Primo o compuesto?', 'Usa los trucos de divisibilidad', 'primo', 5, 'Tú solo: primos'),

    lesson('Factorizar: descomponer en primos', 'Como armar un número con ladrillos', [
      words([['Factorizar', 'escribir un número como **multiplicación de números primos**'], ['Factor', 'cada número que se multiplica']]),
      def('Teorema fundamental', 'Todo número mayor que 1 se puede escribir como **multiplicación de primos**, y solo de **una manera**.'),
      img('assets/lessons/1-3-arbol-factores.svg', 'Árbol de factores de 360'),
      steps('Factorizar 84 dividiendo entre primos', ['Empieza con el primo más chico: **84 ÷ 2 = 42**.', 'Otra vez: **42 ÷ 2 = 21**.', '21 ya no se divide entre 2. Prueba con 3: **21 ÷ 3 = 7**.', '7 es primo: **7 ÷ 7 = 1**. ¡Terminamos!', 'Los primos que usaste: 2, 2, 3 y 7 → **84 = 2 × 2 × 3 × 7 = 2² × 3 × 7**.']),
    ], 'Divide siempre entre el primo más chico posible.', 'Factorizar'),

    gen('Factoriza en primos', 'Escribe así: 2^2*3*5', 'factor', 4, 'Tú solo: factorizar'),

    lesson('MCD: Máximo Común Divisor', '«El número más grande que cabe exacto en los dos»', [
      words([['MCD', '**M**áximo **C**omún **D**ivisor: el divisor **más grande** que tienen **en común** dos números'], ['Máximo', 'el más grande'], ['Común', 'que se repite en los dos']]),
      def('MCD', 'Es el **número más grande que cabe exacto en los dos números**. Sirve para **repartir en partes iguales** sin que sobre nada.'),
      ana('Tienes **12 galletas de chocolate** 🍫 y **18 de avena** 🌾. Quieres hacer **bolsas iguales** (con las mismas galletas de cada tipo) y que **no sobre ninguna**. ¿**Cuántas bolsas, lo más que se pueda**? La respuesta es el **MCD de 12 y 18**.', '🍪 Problema para entenderlo'),
      steps('Cómo sacar el MCD de 12 y 18 (método fácil)', ['Escribe los **divisores de 12**: 1, 2, 3, 4, 6, 12.', 'Escribe los **divisores de 18**: 1, 2, 3, 6, 9, 18.', 'Busca los que **están en las dos listas** (los comunes): 1, 2, 3, 6.', 'Elige **el más grande**: **6**. Ese es el **MCD**.', '¿Qué significa? Puedes hacer **6 bolsas**, cada una con **2 de chocolate y 3 de avena** (12 ÷ 6 = 2 y 18 ÷ 6 = 3). ¡No sobra ninguna!']),
      alt('Método rápido para después: factoriza los dos números. 12 = 2² × 3 y 18 = 2 × 3². Toma los **primos que se repiten** con el **menor exponente**: 2 × 3 = **6**. Sale lo mismo.', '🤔 ¿Hay otra forma?'),
    ], 'MCD = el número más grande que cabe exacto en los dos.', 'MCD'),

    guia('Practica con ayuda', 'Saca el MCD paso a paso', [
      { q: 'Vamos a sacar el MCD de **8 y 12**. Primero, escribe los **divisores de 8** separados por comas.', mode: 'list', ans: [1, 2, 4, 8], hint: 'Los números que caben exacto en 8: 1, 2, 4…', ok: '1, 2, 4, 8.' },
      { q: 'Ahora los **divisores de 12**, separados por comas.', mode: 'list', ans: [1, 2, 3, 4, 6, 12], hint: 'Los números que caben exacto en 12: 1, 2, 3, 4, 6, 12.', ok: '1, 2, 3, 4, 6, 12.' },
      { q: 'Los divisores de 8 son 1, 2, 4, 8 y los de 12 son 1, 2, 3, 4, 6, 12. ¿Cuáles **se repiten** en las dos listas? (separados por comas)', mode: 'list', ans: [1, 2, 4], hint: 'Busca los que aparecen en las dos listas.', ok: 'Comunes: 1, 2, 4.' },
      { q: 'De esos comunes (1, 2, 4), el **más grande** es el MCD. ¿Cuál es?', mode: 'n', ans: 4, hint: 'El más grande de 1, 2 y 4.', ok: 'MCD(8, 12) = 4.' },
      { q: 'Si tienes **8 galletas** y **12 galletas** y haces bolsas iguales sin que sobre nada, ¿cuántas bolsas puedes hacer como máximo?', mode: 'n', ans: 4, hint: 'Es justo el MCD.', ok: '4 bolsas (con 2 y 3 galletas cada una). ¡Ya sabes sacar el MCD!' },
    ], 'Haremos los mismos pasos que en el ejemplo.', 'Con ayuda: MCD'),

    gen('Ahora tú solo: MCD (fácil)', 'Escribe el MCD. Pulsa «Otros ejercicios» para más', 'mcdFacil', 5, 'Tú solo: MCD fácil'),
    gen('Reto: MCD con números más grandes', 'Aquí te conviene factorizar', 'mcd', 4, 'Reto: MCD'),

    lesson('MCM: Mínimo Común Múltiplo', '«El primer número al que llegan los dos»', [
      words([['MCM', '**M**ínimo **C**omún **M**últiplo: el múltiplo **más chico** que tienen **en común** dos números'], ['Mínimo', 'el más chico'], ['Coincidir', 'que pasen al mismo tiempo']]),
      def('MCM', 'Es el **primer número al que llegan los dos al contar de salto en salto**. Sirve para saber **cuándo coinciden** cosas que se repiten.'),
      ana('Dos camiones 🚌 salen juntos hoy. Uno pasa por tu parada **cada 4 minutos** y el otro **cada 6 minutos**. ¿**Cuándo vuelven a coincidir**? La respuesta es el **MCM de 4 y 6**.', '🚌 Problema para entenderlo'),
      steps('Cómo sacar el MCM de 4 y 6 (método fácil)', ['Escribe los **múltiplos de 4**: 4, 8, 12, 16, 20, 24…', 'Escribe los **múltiplos de 6**: 6, 12, 18, 24, 30…', 'Busca **el primero que se repite** en las dos listas: **12**.', 'Ese es el **MCM**. Los dos camiones coinciden a los **12 minutos**.']),
      alt('Método rápido para después: factoriza. 4 = 2² y 6 = 2 × 3. Toma **todos los primos** con el **mayor exponente**: 2² × 3 = **12**. Sale lo mismo.', '🤔 ¿Hay otra forma?'),
    ], 'MCM = el primer número al que llegan los dos contando de salto en salto.', 'MCM'),

    guia('Practica con ayuda', 'Saca el MCM paso a paso', [
      { q: 'Vamos a sacar el MCM de **3 y 4**. Escribe los **primeros 5 múltiplos de 3**, separados por comas.', mode: 'list', ans: [3, 6, 9, 12, 15], hint: 'Cuenta de 3 en 3.', ok: '3, 6, 9, 12, 15.' },
      { q: 'Ahora los **primeros 5 múltiplos de 4**, separados por comas.', mode: 'list', ans: [4, 8, 12, 16, 20], hint: 'Cuenta de 4 en 4.', ok: '4, 8, 12, 16, 20.' },
      { q: 'Múltiplos de 3: 3, 6, 9, **12**, 15 · Múltiplos de 4: 4, 8, **12**, 16, 20. ¿Cuál es **el primero que se repite**? (ese es el MCM)', mode: 'n', ans: 12, hint: 'Busca el primer número que está en las dos listas.', ok: 'MCM(3, 4) = 12.' },
      { q: 'Dos luces parpadean: una cada **3** segundos y otra cada **4**. Si ahora coinciden, ¿cada cuántos segundos vuelven a coincidir?', mode: 'n', ans: 12, hint: 'Coincidir → MCM.', ok: 'Cada 12 segundos. ¡Ya sabes sacar el MCM!' },
    ], 'Haremos los mismos pasos que en el ejemplo.', 'Con ayuda: MCM'),

    gen('Ahora tú solo: MCM (fácil)', 'Escribe el MCM. Pulsa «Otros ejercicios» para más', 'mcmFacil', 5, 'Tú solo: MCM fácil'),
    gen('Reto: MCM con números más grandes', 'Aquí te conviene factorizar', 'mcm', 4, 'Reto: MCM'),

    lesson('¿MCD o MCM? Cómo no confundirte', 'Una pregunta te dice cuál usar', [
      tiles([['✂️', 'MCD', 'REPARTIR o CORTAR en partes iguales'], ['⏰', 'MCM', 'ver cuándo COINCIDEN']]),
      def('Pregúntate', '**¿Voy a repartir o a cortar en pedazos iguales?** → **MCD** (el más grande que cabe en los dos).<br>**¿Voy a ver cuándo dos cosas vuelven a coincidir?** → **MCM** (el primero al que llegan los dos).'),
      tbl(['Si el problema dice…', 'Usa', 'Ejemplo'], [['bolsas iguales, sin que sobre', 'MCD', '12 y 18 galletas → 6 bolsas'], ['trozos iguales lo más largos posible', 'MCD', 'cuerdas de 18 m y 24 m → 6 m'], ['cada cuánto coinciden', 'MCM', 'camiones cada 4 y 6 min → 12 min'], ['cuándo se vuelven a encontrar', 'MCM', 'luces cada 3 y 4 s → 12 s']]),
    ], 'Repartir/cortar → MCD. Coincidir → MCM.', 'MCD o MCM'),

    mc('¿MCD o MCM?', 'Decide cuál usar en cada problema', [
      ['Quieres armar **bolsas iguales** con 60 galletas de chocolate y 84 de avena, sin que sobre ninguna. ¿Qué usas?', ['MCD', 'MCM'], 0, 'Repartir en grupos iguales → MCD(60, 84) = 12 bolsas.'],
      ['Una luz parpadea cada 8 s y otra cada 12 s. ¿Cada cuánto **coinciden**?', ['MCD', 'MCM'], 1, 'Coincidir → MCM(8, 12) = 24 s.'],
      ['Tienes cuerdas de 18 m y 24 m y las quieres cortar en **trozos iguales, lo más largos posible**. ¿Qué usas?', ['MCD', 'MCM'], 0, 'Trozos iguales lo más largos → MCD(18, 24) = 6 m.'],
      ['Dos autobuses salen juntos y pasan cada 15 y 20 minutos. ¿Cuándo vuelven a **encontrarse**?', ['MCD', 'MCM'], 1, 'Encontrarse → MCM(15, 20) = 60 min.'],
    ], '¿MCD o MCM?'),

    cloze('Completa la regla', 'Elige la palabra correcta', 'El **MCD** es el divisor {0} que tienen en común dos números y sirve para {1}. El **MCM** es el múltiplo {2} que tienen en común y sirve para ver cuándo {3}.', [['más grande', ['más grande', 'más chico', 'primo']], ['repartir', ['repartir', 'sumar', 'restar']], ['más chico', ['más chico', 'más grande', 'primo']], ['coinciden', ['coinciden', 'se reparten', 'se restan']]], 'Tú solo: reglas'),

    write('Invéntalo tú', 'Un problema de tu vida diaria', 'Inventa un problema de tu vida diaria que se resuelva con **MCD o con MCM** y explica **cuál usaste y por qué**.', [['Dice si usó MCD o MCM', 'mcd|mcm|maximo comun|minimo comun'], ['Tiene números', '\\d'], ['Explica el porqué', 'porque|ya que|para|sirve|repart|coincid']], 3, 'Piensa: ¿quieres repartir en partes iguales (MCD) o ver cuándo coinciden (MCM)?', 'Tú solo: invéntalo'),

    lesson('Resumen del módulo', 'Lo más importante', [
      md('- **Familias:** naturales (contar), enteros (con negativos), racionales (fracciones), irracionales (π, √2).\n- **Resta = suma del opuesto.** Ley de signos: iguales (+), distintos (−).\n- **Múltiplo:** contar de salto en salto · **Divisor:** cabe exacto.\n- **Primo:** solo se divide entre 1 y él mismo.\n- **MCD:** divisor más grande en común → **repartir**. **MCM:** múltiplo más chico en común → **coincidir**.'),
    ], 'Ya puedes hacer tu presupuesto.', 'Resumen'),

    practica({
      t: 'Presupuesto de salud comunitaria', sub: 'Tu evidencia: vale el 10 % del curso',
      intro: 'Vas a armar un **presupuesto** (una lista de gastos e ingresos) sobre prácticas de **salud comunitaria**: alimentación, medicina tradicional e higiene, en distintos momentos de la historia.',
      mat: 'Cuaderno u hojas, calculadora (opcional) e internet o libros para investigar.',
      ejemplo: '**Época:** mi colonia hoy 🏘️. **Compras:** 12 frutas a $5 → 12 × 5 = **$60** (con la distributiva: 12 × 5 = 10 × 5 + 2 × 5 = 50 + 10).<br>**Saldo:** ingresos $200 − gastos $230 = **−$30** (me faltan $30). <br>**MCD:** si tengo 12 manzanas y 18 naranjas y quiero hacer paquetes iguales sin que sobre nada, hago **6 paquetes** (MCD = 6). <br>**MCM:** si compro una cosa cada 4 días y otra cada 6 días, las dos coinciden cada **12 días**.',
      steps: ['**Elige una época y una comunidad** (un mercado antiguo, un pueblo del siglo XIX, tu colonia hoy) e investiga qué hacían para su salud: qué comían, qué plantas usaban, cómo se aseaban.', 'Haz una **tabla con al menos 10 conceptos** (alimentos, plantas, artículos de higiene…) con cantidad, valor por unidad y total.', 'Calcula los totales usando la **propiedad distributiva** en al menos 2 conceptos (como en el ejemplo).', 'Incluye **ingresos (+) y gastos (−)** y calcula el **saldo** con números enteros (puede salir negativo).', 'Usa el **MCD** para repartir productos en paquetes iguales sin que sobre nada.', 'Usa el **MCM** para planear compras que se repiten cada cierto número de días y decir cuándo coinciden.', '**Factoriza en primos** al menos 3 de los números que uses.', 'Escribe una **conclusión** de 8 renglones: ¿qué prácticas de salud destacan y cómo cambian de una época a otra?'],
      deliver: 'Un reporte (PDF, documento o fotos legibles) con tu tabla, tus cuentas, el MCD, el MCM, las factorizaciones y tu conclusión.',
      rubric: [['Contexto histórico y cultural', 'Claro y con fuentes', 'Parcial', 'Sin contexto'], ['Enteros y propiedades', 'Correctos y justificados', 'Algunos errores', 'Incorrectos'], ['Factorización, MCD y MCM', 'Bien aplicados al problema', 'Aplicados sin explicar', 'No están'], ['Presentación y conclusión', 'Ordenada y fundamentada', 'Incompleta', 'Desordenada']],
    }),
  ],
};
