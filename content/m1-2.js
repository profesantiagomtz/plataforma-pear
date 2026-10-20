import { lesson, def, ex, ana, warn, it, p, md, img, flow, tiles, tbl, steps, words, vis, alt, viz, match, mc, order, cloze, gen, guia, abaco, write, practica } from '../js/mk.js';

export default {
  id: 'm1-2', unit: '1.2', title: 'Conteo y sistemas numéricos', sub: 'Cómo aprendió la gente a contar, el cero y el ábaco', minutes: 90, weight: 5,
  goals: [
    'Contar con **marcas** y entender por qué la gente inventó los números.',
    'Leer números de **egipcios, mayas y romanos**.',
    'Entender el **valor posicional** (por qué el 5 de 502 no vale lo mismo que el 5 de 25) y el **cero**.',
    'Usar el **ábaco** para formar números y sumar.',
  ],
  pages: [
    lesson('¿Para qué contamos?', 'Los números nacieron porque la gente los necesitaba', [
      words([['Contar', 'saber cuántas cosas hay'], ['Número', 'el nombre que le damos a «cuántas hay»'], ['Sistema de numeración', 'la forma que usa una cultura para escribir los números']]),
      flow([['🐑', 'Un pastor quiere saber|cuántas ovejas tiene'], ['🪵', 'Hace una marca|por oveja'], ['🔣', 'Inventa símbolos|para no hacer tantas'], ['🔢', 'Nace el|sistema numérico']], 'De la necesidad al sistema numérico'),
      ana('Un pastor quiere saber si **regresaron todas sus ovejas** 🐑. Hace una **marca** por cada oveja que sale y la tacha cuando regresa. Eso es **contar**: relacionar cada cosa con una marca o símbolo.'),
      tiles([['🌾', 'Cosechas', 'repartir y guardar'], ['🪙', 'Comercio', 'cobrar y pagar'], ['🌙', 'Calendario', 'medir el tiempo']]),
    ], 'Contar sirve para comparar, repartir y planear.', 'Para qué contamos'),

    lesson('Contar con palitos', 'La forma más fácil: una marca por cosa', [
      words([['Marca', 'una rayita o palito que representa «una cosa»']]),
      def('Contar con marcas', 'Haces **una rayita por cada cosa**. Para no perderte, las agrupas **de 5 en 5**.'),
      vis([['|||||', '|||||', '||']], 'Son 5 + 5 + 2 = 12 marcas.'),
      alt('Cuando juegas **cartas** o **dominó** y anotas puntos, haces lo mismo: una rayita por punto, en grupos de 5. ¡Ya contabas como los antiguos!', '🤔 ¿Dónde lo he visto?'),
    ], 'Agrupar de 5 en 5 hace más fácil contar.', 'Contar con palitos'),

    guia('Practica con ayuda', 'Cuenta las marcas', [
      { q: 'Cuenta: |||||  |||||  |||  ¿Cuántas marcas hay?', mode: 'n', ans: 13, hint: 'Hay dos grupos de 5 y uno de 3. Suma 5 + 5 + 3.', ok: '5 + 5 + 3 = 13.' },
      { q: '¿Cuántas marcas son: |||||  |||||  |||||  ||?', mode: 'n', ans: 17, hint: 'Tres grupos de 5 son 15. Y sobran 2.', ok: '15 + 2 = 17.' },
      { q: 'Si cuentas de 5 en 5 y llevas 4 grupos completos, ¿cuántas marcas llevas?', mode: 'n', ans: 20, hint: 'Cuenta: 5, 10, 15, …', ok: '4 × 5 = 20.' },
    ], 'Es muy fácil: suma los grupos.', 'Con ayuda: marcas'),

    lesson('Egipto: símbolos que se suman', 'Hace unos 5 000 años', [
      words([['Jeroglífico', 'dibujito que representa una palabra o un número'], ['Sistema aditivo', 'sistema donde los símbolos se **suman** y el orden no importa'], ['Base 10', 'se agrupa de 10 en 10, como en nuestros dedos 🖐️🖐️']]),
      def('Números egipcios', 'Tenían **un dibujo para cada «salto»** (1, 10, 100, 1 000…). Para escribir un número, **repetían los dibujos** y se sumaban.'),
      tbl(['Valor', 'Dibujo (jeroglífico)', 'Lo escribimos así aquí'], [['1', 'palito', '|'], ['10', 'arco (un talón)', '∩'], ['100', 'soga enrollada', '🌀'], ['1 000', 'flor de loto', '🪷'], ['10 000', 'un dedo', '☝️']]),
      vis([['🪷', '🌀🌀🌀', '∩∩', '||||']], '= 1 000 + 300 + 20 + 4 = **1 324**'),
      warn('Para escribir **999** necesitaban **27 símbolos** (9 + 9 + 9). ¡Muy largo! Por eso después inventaron sistemas más cómodos.'),
    ], 'Egipto: los dibujos se suman, el orden no importa.', 'Egipto'),

    guia('Practica con ayuda', 'Lee números egipcios', [
      { q: 'Mira: 🌀🌀🌀  ∩∩  ||  ¿Cuántos son las sogas 🌀? (cada soga vale 100)', mode: 'n', ans: 300, hint: '3 sogas × 100.', ok: '3 × 100 = 300.' },
      { q: 'Los arcos ∩∩ (cada uno vale 10) suman…', mode: 'n', ans: 20, hint: '2 × 10.', ok: '20.' },
      { q: 'Y los palitos || valen…', mode: 'n', ans: 2, hint: 'Cada palito vale 1.', ok: '2.' },
      { q: 'Suma todo: 300 + 20 + 2 = ¿cuál es el número egipcio 🌀🌀🌀 ∩∩ ||?', mode: 'n', ans: 322, hint: '300 + 20 = 320; más 2…', ok: '¡322!' },
    ], 'Sumamos cada tipo de dibujo y luego juntamos.', 'Con ayuda: Egipto'),

    match('Ahora tú solo: números egipcios', 'Une cada combinación con su número', [
      ['1 flor de loto, 3 sogas, 2 arcos y 4 palitos', '1 324'], ['2 flores de loto y 5 palitos', '2 005'], ['4 sogas y 6 arcos', '460'], ['1 dedo y 2 sogas', '10 200'], ['3 flores de loto, 1 soga y 7 palitos', '3 107'],
    ], ['1 324', '2 005', '460', '10 200', '3 107'], 'Tú solo: números egipcios'),

    lesson('Mesopotamia: de 60 en 60', 'Los números del reloj', [
      words([['Base 60', 'se agrupa de 60 en 60 (en vez de 10 en 10)'], ['Valor posicional', 'el número vale distinto según el **lugar** donde está escrito']]),
      def('Base 60', 'Los babilonios contaban **de 60 en 60**. Esa idea sigue en tu vida diaria.'),
      tiles([['⏱️', '60 minutos', 'hacen 1 hora'], ['⏲️', '60 segundos', 'hacen 1 minuto'], ['📐', '360 grados', 'dan una vuelta completa']]),
      ana('Cuando dices **«2 horas con 5 minutos»** estás usando base 60. Son 2 × 60 + 5 = **125 minutos**.', '⏰ Ya la usas'),
    ], 'La base 60 vive en el reloj y en los ángulos.', 'Mesopotamia'),

    guia('Practica con ayuda', 'Base 60 en el reloj', [
      { q: '1 hora tiene 60 minutos. ¿Cuántos minutos son 2 horas?', mode: 'n', ans: 120, hint: '2 × 60.', ok: '2 × 60 = 120 minutos.' },
      { q: 'Y 2 horas con 5 minutos, ¿cuántos minutos son en total?', mode: 'n', ans: 125, hint: 'Ya sabes que 2 horas son 120 minutos. Súmale 5.', ok: '120 + 5 = 125.' },
      { q: '¿Cuántos segundos tiene 1 minuto con 30 segundos?', mode: 'n', ans: 90, hint: '1 minuto = 60 segundos. Súmale 30.', ok: '60 + 30 = 90 segundos.' },
    ], 'Es lo mismo que haces al ver el reloj.', 'Con ayuda: base 60'),

    lesson('Mayas y olmecas: de 20 en 20 y el cero', 'Punto, raya y concha', [
      words([['Base 20', 'se agrupa de 20 en 20 (dedos de manos 🖐️🖐️ y pies 🦶🦶)'], ['Cero', 'el número que significa «no hay nada» y sirve para marcar un lugar vacío']]),
      def('Números mayas', 'Solo usaban **3 signos**: **● = 1**, **▬ = 5** y **🐚 (concha) = 0**.'),
      tbl(['Número', 'Se escribe', 'Cómo se saca'], [['3', '●●●', '1 + 1 + 1'], ['7', '▬ ●●', '5 + 2'], ['13', '▬ ▬ ●●●', '5 + 5 + 3'], ['19', '▬ ▬ ▬ ●●●●', '5 + 5 + 5 + 4'], ['20', 'abajo 🐚 y arriba ●', '1 × 20 + 0'], ['45', 'abajo ▬ y arriba ●●', '2 × 20 + 5']]),
      ana('Se escribían en **pisos**: el piso de abajo vale 1 y el de arriba vale 20. Con eso llegaban a números enormes.', '🏢 Como un edificio'),
      ana('Los olmecas y los mayas usaban el **cero** hace más de **2 000 años**, ¡mucho antes que Europa!', '🌎 Dato histórico'),
    ], '● vale 1, ▬ vale 5, la concha vale 0.', 'Mayas'),

    guia('Practica con ayuda', 'Lee números mayas', [
      { q: 'Mira: ▬ ●●  ¿Cuánto es? (▬ = 5 y cada ● = 1)', mode: 'n', ans: 7, hint: '5 + 1 + 1.', ok: '5 + 2 = 7.' },
      { q: 'Mira: ▬ ▬ ●●●  ¿Cuánto es?', mode: 'n', ans: 13, hint: 'Dos rayas son 10, más 3 puntos.', ok: '10 + 3 = 13.' },
      { q: 'Si ▬ ▬ ▬ ●●●● ... ¿cuánto es?', mode: 'n', ans: 19, hint: 'Tres rayas son 15. Más 4 puntos.', ok: '15 + 4 = 19.' },
    ], 'Rayas valen 5, puntos valen 1.', 'Con ayuda: mayas'),

    gen('Ahora tú solo: números mayas', '● = 1 y ▬ = 5. «Otros ejercicios» te da más', 'maya', 5, 'Tú solo: mayas'),

    lesson('Roma: letras como números', 'I, V, X, L, C, D, M', [
      words([['Número romano', 'número escrito con letras'], ['Sumar o restar letras', 'si la letra chica va **después**, se suma; si va **antes**, se resta']]),
      tbl(['I', 'V', 'X', 'L', 'C', 'D', 'M'], [['1', '5', '10', '50', '100', '500', '1 000']]),
      it('Se suma', 'Letra igual o menor **a la derecha** → se suma. **VII** = 5 + 1 + 1 = **7**. **XVI** = 10 + 5 + 1 = **16**.'),
      it('Se resta', 'Letra chica **a la izquierda** de una grande → se resta. **IV** = 5 − 1 = **4**. **IX** = 10 − 1 = **9**. **XL** = 50 − 10 = **40**.'),
      it('Se repite', 'Una letra se repite **máximo 3 veces**: III = 3, pero 4 es IV.'),
      alt('Truco: los relojes de pared a veces traen números romanos. Fíjate: ahí el 4 se ve «IIII» o «IV», y el 9 es «IX». Practica leyéndolos.', '🤔 ¿Dónde los veo?'),
      warn('Los romanos **no tenían cero** y su sistema no es posicional, por eso sumar o multiplicar con él era muy difícil.'),
    ], 'Chica a la derecha se suma; chica a la izquierda se resta.', 'Roma'),

    guia('Practica con ayuda', 'Lee números romanos', [
      { q: 'XII: X vale 10, I vale 1. ¿Cuánto es X + I + I?', mode: 'n', ans: 12, hint: '10 + 1 + 1.', ok: 'XII = 12.' },
      { q: 'IV: la I está **antes** de la V, así que se resta. ¿Cuánto es 5 − 1?', mode: 'n', ans: 4, hint: 'Resta: V (5) menos I (1).', ok: 'IV = 4.' },
      { q: 'IX = 10 − 1. ¿Cuánto es?', mode: 'n', ans: 9, hint: 'X vale 10, la I resta 1.', ok: 'IX = 9.' },
      { q: 'XLV = XL (40) + V (5). ¿Cuánto es?', mode: 'n', ans: 45, hint: 'XL es 50 − 10 = 40. Luego suma V.', ok: 'XLV = 45.' },
    ], 'Primero resta las parejas, luego suma.', 'Con ayuda: romanos'),

    gen('Ahora tú solo: números romanos', 'Convierte entre romanos y números normales', 'romano', 5, 'Tú solo: romanos'),

    lesson('India, los árabes y Fibonacci', 'Cómo llegaron a ti los números que usas hoy', [
      words([['Fibonacci', 'apodo de Leonardo de Pisa, un comerciante italiano'], ['Cifras indoarábigas', 'los números 0 1 2 3 4 5 6 7 8 9 que usamos hoy']]),
      img('assets/lessons/1-2-linea-tiempo.svg', 'Línea del tiempo de los números'),
      it('India (siglo VII)', 'Perfeccionó nuestro sistema y trató al **cero como un número de verdad**.'),
      it('Árabes (siglo IX)', 'Un sabio, Al-Juarismi, lo explicó y lo difundió. De su nombre viene la palabra **algoritmo**.'),
      it('Fibonacci (1202)', 'Aprendió esos números de comerciantes árabes y escribió un libro, el *Liber Abaci*, para enseñarlos en Europa.'),
      ana('Por ese libro hoy escribes **2026** y no **MMXXVI**. ¡Los comerciantes ahorraron muchísimo tiempo al sumar!'),
    ], 'India lo creó, los árabes lo difundieron, Fibonacci lo llevó a Europa.', 'Fibonacci'),

    order('Ordena la historia', 'De lo más antiguo a lo más nuevo', [
      ['Egipto: jeroglíficos que se suman (hace unos 5 000 años)'], ['Mesopotamia: base 60 (hace unos 4 000 años)'], ['Mayas y olmecas: usan el cero (hace más de 2 000 años)'], ['India: sistema con cero como número (siglo VII)'], ['Fibonacci publica su libro (año 1202)'],
    ], 'Tú solo: línea del tiempo'),

    match('¿De qué cultura hablamos?', 'Une cada pista con su cultura', [
      ['Base 60: de ahí vienen los 60 minutos', 'Mesopotamia'], ['Punto, raya y concha', 'Mayas'], ['Jeroglíficos que se suman', 'Egipto'], ['Letras I, V, X, L, C, D, M', 'Roma'], ['Tratar al cero como número', 'India'], ['Libro «Liber Abaci» (1202)', 'Leonardo de Pisa'],
    ], ['Mesopotamia', 'Mayas', 'Egipto', 'Roma', 'India', 'Leonardo de Pisa'], 'Tú solo: culturas'),

    lesson('El valor posicional con dinero', 'Por qué el 5 de 502 no vale lo mismo que el 5 de 25', [
      words([['Cifra o dígito', 'cada número suelto del 0 al 9 (el 352 tiene tres cifras)'], ['Posición', 'el lugar donde está la cifra: unidades, decenas, centenas, millares'], ['Valor posicional', 'lo que vale una cifra **según su lugar**']]),
      def('Valor posicional', 'Una cifra vale **distinto según el lugar** donde esté. Es como el dinero: un billete de $100 vale más que una moneda de $1, aunque los dos tengan un «1».'),
      tbl(['Millares', 'Centenas', 'Decenas', 'Unidades'], [['3 billetes de $1 000', '5 billetes de $100', '0 billetes de $10', '2 monedas de $1']]),
      vis([['3', '5', '0', '2'], ['3 000', '+ 500', '+ 0', '+ 2']], '3 502 = 3 000 + 500 + 0 + 2. ¡Fíjate que el **5 vale 500**, no 5!'),
      alt('Si el número fuera **$3 502**, necesitarías 3 billetes de mil, 5 de cien, ningún billete de diez y 2 monedas de uno. Cada lugar es un tipo de billete.', '🤔 ¿Otra forma de verlo?'),
    ], 'Cada cifra vale según el lugar que ocupa.', 'Valor posicional'),

    guia('Practica con ayuda', 'Dinero y posiciones', [
      { q: 'Tienes **2 billetes de $100**, **3 de $10** y **4 monedas de $1**. ¿Cuánto dinero es en total?', mode: 'n', ans: 234, hint: '200 + 30 + 4.', ok: '200 + 30 + 4 = $234.' },
      { q: 'En el número **305**, ¿cuántas **decenas** hay? (la cifra de en medio)', mode: 'n', ans: 0, hint: 'Mira el número de en medio: 3 **0** 5.', ok: 'Hay 0 decenas (¡por eso el cero es importante!).' },
      { q: 'En **3 502**, ¿qué **valor** tiene la cifra **5**?', mode: 'n', ans: 500, hint: 'El 5 está en las centenas: 5 × 100.', ok: '5 × 100 = 500.' },
      { q: 'Escribe **forma desarrollada** de 407: 4 centenas + 0 decenas + 7 unidades. ¿Cuánto vale el 4?', mode: 'n', ans: 400, hint: '4 × 100.', ok: '400.' },
    ], 'Piensa en billetes de $100, $10 y $1.', 'Con ayuda: posiciones'),

    gen('Ahora tú solo: valor posicional', '¿Cuánto vale la cifra en su lugar?', 'posicional', 5, 'Tú solo: posiciones'),

    lesson('El cero: el número «vacío» que es muy importante', 'Sin él no podemos escribir bien', [
      words([['Cero (0)', 'significa «aquí no hay nada», pero guarda el lugar']]),
      def('Para qué sirve el cero', 'El cero **guarda lugares vacíos**. Sin él, no distinguirías estos tres números:'),
      vis([['35', '305', '3 005']], 'Treinta y cinco · trescientos cinco · tres mil cinco: ¡todos tienen un 3 y un 5, pero el cero cambia todo!'),
      ana('Imagina que tienes **$305** y escribes «35»: ¡perdiste **$270**! El cero te dice «aquí no hay billetes de diez».', '💸 Con dinero'),
    ], 'El cero guarda el lugar vacío.', 'El cero'),

    lesson('El ábaco', 'Una calculadora de más de 4 000 años', [
      words([['Ábaco', 'tablita con varillas y bolitas para hacer cuentas'], ['Varilla', 'cada palito del ábaco; cada una es una posición'], ['Acarreo', 'cuando una varilla pasa de 9, «llevas 1» a la varilla de la izquierda']]),
      def('Cómo funciona', 'Cada **varilla** es una posición (unidades, decenas, centenas, millares). Las **bolitas de arriba** son las que cuentan.'),
      viz('abaco', '🧮 Pruébalo: toca las bolitas para formar un número', { rods: 4 }),
      steps('Cómo sumar 375 + 48 en el ábaco', ['Forma **375**: 3 bolitas en centenas, 7 en decenas, 5 en unidades.', 'Suma **48**. Unidades: 5 + 8 = 13. Se pasa de 9, así que quedan **3** y «llevas 1» a decenas.', 'Decenas: 7 + 4 + 1 que llevabas = 12. Quedan **2** y «llevas 1» a centenas.', 'Centenas: 3 + 1 = 4.', 'Resultado: **423**.']),
    ], 'Si una varilla pasa de 9, bajas las bolitas y subes 1 en la de la izquierda.', 'El ábaco'),

    abaco('Forma números en el ábaco', 'Empezamos fácil y vamos subiendo', [5, 12, 40, 203, 1203, 450, 3099, 7008], 4, 'Tú solo: ábaco'),

    mc('Repaso rápido', 'Elige la respuesta (te digo al instante si acertaste)', [
      ['¿De cuánto en cuánto contaban los mayas?', ['De 10 en 10', 'De 20 en 20', 'De 60 en 60'], 1, 'Base 20: las manos y los pies.'],
      ['¿Por qué es difícil sumar con números romanos?', ['Porque no son posicionales', 'Porque tienen muchas cifras', 'Porque no tienen la V'], 0, 'Sin posiciones, cada suma es muy complicada.'],
      ['¿Qué libro llevó los números actuales a Europa?', ['El Quijote', 'Liber Abaci', 'Los Elementos'], 1, 'Lo escribió Fibonacci en 1202.'],
      ['En 4 072, la cifra 7 vale…', ['7', '70', '700'], 1, 'Está en las decenas: 7 × 10 = 70.'],
      ['¿Para qué sirve el cero?', ['Guarda el lugar vacío', 'Solo para restar', 'Para nada'], 0, 'Distingue 35, 305 y 3 005.'],
    ], 'Repaso'),

    write('Explícalo con tus palabras', '¿Por qué el cero fue tan importante?', 'Explica **por qué el cero es importante**. Usa como ejemplo los números 35, 305 y 3 005.', [['Habla del lugar o posición', 'posicion|lugar|vacio|espacio'], ['Compara 35, 305 y 3 005', '305|3 ?005|3005'], ['Dice que distingue o cambia el valor', 'distingu|diferenci|confund|cambia|significa|valor|dinero']], 3, 'Piensa en el dinero: ¿es lo mismo $35 que $305?', 'Tú solo: el cero'),

    lesson('Resumen del módulo', 'Lo más importante', [
      tbl(['Cultura', 'De cuánto en cuánto', 'Idea principal'], [['Egipto', '10', 'Dibujos que se suman'], ['Mesopotamia', '60', 'Posicional; hoy: 60 min y 360°'], ['Mayas', '20', 'Punto, raya y concha (cero)'], ['India', '10', 'Posicional con cero'], ['Roma', '10', 'Letras; no posicional']]),
      md('- **Fibonacci (1202)** llevó los números actuales a Europa.\n- **Valor posicional:** 3 502 = 3 000 + 500 + 0 + 2.\n- **Cero:** guarda el lugar vacío.\n- **Ábaco:** cada varilla es una posición; si pasa de 9, llevas 1 a la izquierda.'),
    ], 'Ya puedes hacer tu ábaco.', 'Resumen'),

    practica({
      t: 'Tu propio ábaco con material reciclado', sub: 'Tu evidencia: vale el 5 % del curso',
      intro: 'Vas a **construir un ábaco** con cosas que ya tengas en casa y a **explicar** cómo funciona.',
      mat: 'Caja o tapa de cartón, palitos de brocheta o alambre, tapitas, botones o cuentas, plastilina o pegamento, plumón.',
      ejemplo: '**Idea fácil:** una caja de zapatos 👟 con 4 palitos de brocheta clavados, y 9 tapitas de refresco en cada palito. Pones una etiqueta arriba de cada palito: **Unidades · Decenas · Centenas · Millares**. Para formar 203 subes 2 tapitas en centenas, 0 en decenas y 3 en unidades.',
      steps: ['Haz el marco con el cartón y pon **4 varillas**: Millares, Centenas, Decenas y Unidades.', 'Ponle **9 cuentas** a cada varilla y **etiqueta** las columnas.', 'Forma **tres números** (por ejemplo 1 203, 450 y 3 099) y tómale **foto** a cada uno.', 'Haz una **suma con acarreo** (por ejemplo 375 + 48) y tómale foto al resultado.', 'Escribe tu explicación (mínimo **10 renglones**): ¿qué es un ábaco?, ¿quién lo usaba?, ¿cómo se forma un número?, ¿cómo se suma?, ¿para qué servía?'],
      deliver: 'Las fotos de tu ábaco (los 3 números y la suma) y tu explicación escrita (foto del cuaderno, PDF o documento).',
      rubric: [['Modelo', 'Funciona, con etiquetas y material reciclado', 'Funciona con detalles', 'No funciona o está incompleto'], ['Demostración', 'Tres números y una suma correctos', 'Un error', 'No demuestra'], ['Explicación', 'Clara, completa y con algo de historia', 'Incompleta', 'No hay o está copiada']],
    }),
  ],
};
