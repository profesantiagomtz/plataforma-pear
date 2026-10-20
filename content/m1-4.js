import { lesson, def, ex, ana, warn, it, p, md, img, flow, tiles, tbl, steps, words, vis, alt, viz, match, mc, order, cloze, gen, guia, write, practica } from '../js/mk.js';

export default {
  id: 'm1-4', unit: '1.4', title: 'Fracciones y porcentajes', sub: 'Pizzas, descuentos y proporciones: matemáticas que usas todos los días', minutes: 130, weight: 10,
  goals: [
    'Entender qué es una **fracción** y reconocer **fracciones iguales** (equivalentes).',
    '**Simplificar**, **comparar**, **sumar, restar, multiplicar y dividir** fracciones.',
    'Resolver problemas de **proporción** (regla de tres).',
    'Calcular **porcentajes**: descuentos, aumentos y «qué parte es».',
  ],
  pages: [
    lesson('¿Qué es una fracción?', 'Partes de algo entero, como una pizza 🍕', [
      words([['Unidad', 'el entero: una pizza completa, una barra, un grupo'], ['Fracción', 'una o varias partes iguales de la unidad, como ¾'], ['Numerador', 'el número de **arriba**: cuántas partes tomas'], ['Denominador', 'el número de **abajo**: en cuántas partes se partió']]),
      flow([['🍕', 'Pizza entera|(la unidad)'], ['✂️', 'La parto en 4|partes iguales'], ['😋', 'Me como 3|partes'], ['➗', 'Como ¾|de pizza']], 'De la pizza a la fracción'),
      def('Fracción', 'En **a/b**, el **denominador (b)** dice en cuántas partes iguales se partió el entero y el **numerador (a)** dice cuántas partes tomaste.'),
      viz('frac', '🎛️ Mueve los controles y mira cómo cambia la barra'),
      tbl(['Tipo', 'Cómo se ve', 'Ejemplo'], [['Propia', 'arriba < abajo (vale menos que 1)', '3/4'], ['Impropia', 'arriba ≥ abajo (vale 1 o más)', '11/4'], ['Mixta', 'un entero + una fracción', '2 ¾']]),
      ex('**Mixta a impropia:** 2 ¾ = (2 × 4 + 3)/4 = **11/4**.<br>**Impropia a mixta:** 11 ÷ 4 = 2 y sobran 3 → **2 ¾**.<br>Un entero también es fracción: 5 = 5/1 = 10/2.'),
    ], 'El de abajo dice en cuántas partes se partió; el de arriba, cuántas tomaste.', 'La fracción'),

    guia('Practica con ayuda', 'Leer fracciones', [
      { q: 'Una pizza 🍕 se parte en **8** rebanadas y te comes **3**. ¿Cuál es el **denominador** (cuántas partes en total)?', mode: 'n', ans: 8, hint: 'El denominador es el número de abajo: en cuántas partes se partió.', ok: 'Denominador = 8.' },
      { q: 'Y el **numerador** (cuántas partes te comiste)?', mode: 'n', ans: 3, hint: 'El de arriba: las partes que tomaste.', ok: 'Numerador = 3.' },
      { q: 'Entonces te comiste los **3/8** de la pizza. Si te comes **5 de 12** pastelitos, ¿cuál es el numerador de la fracción?', mode: 'n', ans: 5, hint: 'Arriba va lo que tomaste.', ok: '5/12.' },
      { q: '¿Cuál fracción vale **más de 1**? (está más de un entero)', mode: 'sel', opts: ['3/4', '11/4', '1/2'], ans: '11/4', hint: 'Cuando el de arriba es mayor que el de abajo, vale más que 1.', ok: '11/4 = 2 ¾.' },
    ], 'Piensa en pizza y pastelitos.', 'Con ayuda: fracciones'),

    lesson('Fracciones que valen lo mismo', 'Equivalentes: se ven distintas pero son iguales', [
      words([['Equivalentes', 'fracciones que valen **lo mismo** aunque se escriban distinto'], ['Amplificar', 'multiplicar arriba y abajo por el mismo número'], ['Simplificar', 'dividir arriba y abajo entre el mismo número para que quede más chica'], ['Irreducible', 'una fracción que ya no se puede simplificar más']]),
      img('assets/lessons/1-4-fracciones.svg', 'Barras que muestran fracciones equivalentes'),
      ana('**La mitad de una pizza es lo mismo** si la partes en 2 y te comes 1 (1/2), o la partes en 4 y te comes 2 (2/4), o en 8 y te comes 4 (4/8). Se ve distinto, pero **comes lo mismo** 🍕.', '🍕 Con pizza'),
      it('Amplificar', 'Multiplica arriba y abajo por el **mismo** número: 2/3 = 4/6 = 6/9.'),
      it('Simplificar', 'Divide arriba y abajo entre un número que quepa en los dos. Lo mejor es el **MCD**. 18/24 ÷ 6 = **3/4**.'),
      steps('Simplificar 12/18', ['Busca un número que quepa exacto en 12 y en 18. El más grande es el **MCD = 6**.', '12 ÷ 6 = **2**.', '18 ÷ 6 = **3**.', 'Queda **2/3**. Ya no se puede simplificar (el 2 y el 3 no tienen divisores en común).']),
      alt('¿No te acuerdas del MCD? Es **el número más grande que cabe exacto en los dos** (lo aprendiste en el módulo 1.3). Si no lo encuentras, divide entre 2 varias veces hasta que ya no se pueda.', '🤔 ¿Cómo encuentro el número para simplificar?'),
    ], 'Cambiar de forma no cambia el valor.', 'Equivalentes'),

    guia('Practica con ayuda', 'Simplifica paso a paso', [
      { q: 'Vamos a simplificar **6/9**. ¿Qué número cabe exacto en 6 y en 9?', mode: 'n', ans: 3, hint: '6 se divide entre 3 y 9 también.', ok: '3 cabe en los dos.' },
      { q: '6 ÷ 3 = ?', mode: 'n', ans: 2, hint: 'Una cuenta fácil.', ok: '2.' },
      { q: '9 ÷ 3 = ?', mode: 'n', ans: 3, hint: 'Otra fácil.', ok: '3.' },
      { q: 'Entonces 6/9 simplificada es… (escríbela como a/b)', mode: 'fs', ans: [2, 3], hint: 'Arriba el 2, abajo el 3: 2/3.', ok: '2/3. ¡Ya sabes simplificar!' },
    ], 'Cuatro pasitos.', 'Con ayuda: simplificar'),

    gen('Ahora tú solo: simplifica', 'Escribe la fracción simplificada como a/b', 'simplifica', 5, 'Tú solo: simplificar'),

    lesson('¿Cuál fracción es más grande?', 'Compara con la «multiplicación en cruz»', [
      def('Multiplicación en cruz', 'Para comparar **a/b** con **c/d**: multiplica **a × d** y **b × c**. **El lado con el resultado más grande es la fracción más grande.**'),
      ex('Comparar **3/5** con **4/7**: 3 × 7 = **21** y 4 × 5 = **20**. Como 21 es mayor que 20, **3/5 > 4/7**.'),
      ana('Si partes 2 pizzas iguales, una en 5 y otra en 7 rebanadas, **las rebanadas de 5 son más grandes**. Tomar 3 de 5 es más que tomar 4 de 7.', '🍕 Para imaginarlo'),
    ], 'Multiplica en cruz y compara los resultados.', 'Comparar'),

    match('Tú solo: compara fracciones', 'Elige el signo correcto (> mayor · < menor · = igual)', [
      ['2/3  ○  3/5', '>'], ['5/8  ○  7/12', '>'], ['4/6  ○  6/9', '='], ['1/3  ○  2/5', '<'], ['7/10  ○  3/4', '<'], ['5/6  ○  4/5', '>'],
    ], ['>', '<', '='], 'Tú solo: comparar'),

    lesson('Sumar y restar fracciones', 'Primero hay que partir todo en partes iguales', [
      words([['Denominador común', 'que las dos fracciones estén partidas en el **mismo** número de partes']]),
      it('Mismo denominador', 'Ya están partidas igual: solo **sumas o restas los de arriba**. 3/8 + 2/8 = **5/8**.'),
      it('Distinto denominador', 'Primero las **partes iguales**: busca el **MCM** de los denominadores y convierte. 1/2 + 1/3 = 3/6 + 2/6 = **5/6**.'),
      ana('No puedes sumar «medios» con «tercios» como si fueran lo mismo, igual que no puedes sumar 2 manzanas + 3 peras y decir «5 manzanas». Hay que convertirlos a **sextos** (partes del mismo tamaño).', '🍎🍐 Peras y manzanas'),
      steps('Ejemplo: 3/4 − 1/6', ['Denominadores 4 y 6 → el **MCM** es **12**.', '3/4 = **9/12** (multiplicaste arriba y abajo por 3).', '1/6 = **2/12** (multiplicaste por 2).', '9/12 − 2/12 = **7/12**.', '7 y 12 no tienen divisores en común: ya quedó simplificada.']),
      warn('**Nunca** sumes los de abajo: 1/2 + 1/3 **no** es 2/5.'),
    ], 'Primero partes iguales (MCM), luego sumas los de arriba.', 'Sumar y restar'),

    guia('Practica con ayuda', 'Suma 1/2 + 1/4', [
      { q: 'Tenemos 1/2 + 1/4. Los denominadores son 2 y 4. ¿Cuál es el **MCM** de 2 y 4 (el primer número al que llegan contando de 2 en 2 y de 4 en 4)?', mode: 'n', ans: 4, hint: 'Múltiplos de 2: 2, 4… Múltiplos de 4: 4… ¿cuál se repite primero?', ok: 'MCM = 4.' },
      { q: 'Convierte 1/2 a cuartos: 1/2 = ?/4', mode: 'n', ans: 2, hint: 'Multiplicaste abajo por 2 (de 2 a 4); arriba también.', ok: '1/2 = 2/4.' },
      { q: 'Ahora suma 2/4 + 1/4. ¿Cuánto da? (a/b)', mode: 'fs', ans: [3, 4], hint: 'Mismo denominador: suma los de arriba: 2 + 1.', ok: '3/4.' },
    ], 'Vamos con calma.', 'Con ayuda: sumar'),

    gen('Ahora tú solo: suma y resta', 'Escribe el resultado simplificado como a/b', 'sumaFrac', 5, 'Tú solo: sumar y restar'),

    lesson('Multiplicar y dividir fracciones', 'Más fácil que sumar', [
      def('Multiplicar', '**Arriba × arriba** y **abajo × abajo**: 2/3 × 3/5 = 6/15 = **2/5**.'),
      def('Dividir', 'Se **voltea** la segunda fracción y se **multiplica**: 3/4 ÷ 2/5 = 3/4 × 5/2 = **15/8**.'),
      ex('**Fracción de una cantidad:** ¿cuánto es **3/4 de 80**? Divide entre 4 → 20 y multiplica por 3 → **60**.'),
      alt('«De» en matemáticas es **por**: «¾ de 80» es lo mismo que ¾ × 80.', '🤔 ¿Qué significa «de»?'),
    ], 'Multiplicar: directo. Dividir: voltea la segunda y multiplica.', 'Multiplicar y dividir'),

    gen('Tú solo: × y ÷ de fracciones', 'Resultado simplificado, como a/b', 'mulFrac', 5, 'Tú solo: × y ÷'),
    gen('Tú solo: fracción de una cantidad', '¿Cuánto es?', 'fraccionDe', 4, 'Tú solo: fracción de'),

    lesson('Proporciones y regla de tres', 'Cuando una cosa sube, la otra también (o baja)', [
      words([['Razón', 'comparar dos cantidades: 3 de cada 5'], ['Proporción', 'dos razones que valen lo mismo'], ['Directa', 'si una sube, la otra **también**'], ['Inversa', 'si una sube, la otra **baja**']]),
      it('Directa', '**3 kg** de tomate cuestan **$54**. ¿Cuánto cuestan **5 kg**? Cada kilo cuesta 54 ÷ 3 = $18 → 5 × 18 = **$90**.'),
      it('Inversa', '**4 obreros** terminan en **12 días**. ¿Y con **6 obreros**? Más obreros → menos días: 4 × 12 ÷ 6 = **8 días**.'),
      ex('Receta para **4** personas: **3/4 de taza** de harina. Para **6** personas: 3/4 × 6/4 = 9/8 = **1 ⅛ tazas**.', '🍰 En la cocina'),
      alt('Pregúntate: «si pido el **doble**, ¿pago el doble?» (directa). «Si pongo el **doble de gente**, ¿tardo la **mitad**?» (inversa).', '🤔 ¿Directa o inversa?'),
    ], 'Directa: sube con sube. Inversa: sube con baja.', 'Proporciones'),

    guia('Practica con ayuda', 'Regla de tres', [
      { q: '5 cuadernos cuestan **$140**. ¿Cuánto cuesta **1** cuaderno?', mode: 'n', ans: 28, hint: 'Divide 140 entre 5.', ok: '140 ÷ 5 = $28.' },
      { q: 'Si cada cuaderno cuesta $28, ¿cuánto cuestan **8** cuadernos?', mode: 'n', ans: 224, hint: 'Multiplica 28 × 8.', ok: '28 × 8 = $224.' },
    ], 'Primero el precio de 1.', 'Con ayuda: regla de tres'),

    gen('Tú solo: regla de tres', 'Proporción directa', 'reglaTres', 4, 'Tú solo: regla de tres'),

    lesson('Porcentaje', 'Una fracción «de cada 100»', [
      words([['Porcentaje (%)', '«por cada 100». El 25 % significa 25 de cada 100'], ['Descuento', 'lo que **te quitan** al precio'], ['Aumento', 'lo que **le suben** al precio']]),
      def('Porcentaje', '**P %** quiere decir **P/100**. Ejemplo: 50 % = 50/100 = ½ y 25 % = 25/100 = ¼.'),
      tiles([['½', '50 %', 'la mitad'], ['¼', '25 %', 'un cuarto'], ['¾', '75 %', 'tres cuartos'], ['1', '100 %', 'todo']]),
      tbl(['Quiero…', 'Cómo lo hago', 'Ejemplo'], [['El P % de una cantidad', 'cantidad × P ÷ 100', '25 % de 240 = 240 × 25 ÷ 100 = 60'], ['¿Qué % es A de N?', 'A ÷ N × 100', '45 de 180 = 45 ÷ 180 × 100 = 25 %'], ['Aplicar descuento', 'precio × (100 − P) ÷ 100', '$850 con 20 % = 850 × 0.80 = $680'], ['Aplicar aumento', 'precio × (100 + P) ÷ 100', '$400 con 15 % = 400 × 1.15 = $460']]),
      steps('Un celular de $4 800 con 15 % de descuento', ['El descuento es el 15 % de 4 800: 4 800 × 15 ÷ 100 = **$720**.', 'Precio final: 4 800 − 720 = **$4 080**.', 'Atajo: si descuentan 15 %, **pagas el 85 %**: 4 800 × 0.85 = **$4 080**.']),
    ], 'Si descuentan P %, pagas (100 − P) %.', 'Porcentaje'),

    guia('Practica con ayuda', 'Descuento paso a paso', [
      { q: 'Unos tenis cuestan **$850** y tienen **20 %** de descuento. Primero: ¿cuánto es el 20 % de 850? (850 × 20 ÷ 100)', mode: 'n', ans: 170, hint: '850 × 20 = 17 000. Luego ÷ 100.', ok: '$170 de descuento.' },
      { q: 'Si te descuentan $170, ¿cuánto pagas? (850 − 170)', mode: 'n', ans: 680, hint: 'Resta.', ok: 'Pagas $680.' },
      { q: 'Atajo: si descuentan el 20 %, pagas el **80 %**. ¿Cuánto es el 80 % de 850? (850 × 0.80)', mode: 'n', ans: 680, hint: '850 × 8 ÷ 10.', ok: '$680. ¡Sale igual!' },
    ], 'Un paso a la vez.', 'Con ayuda: descuento'),

    gen('Tú solo: calcula porcentajes', 'El P % de una cantidad', 'porcentaje', 4, 'Tú solo: porcentajes'),
    gen('Tú solo: descuentos y aumentos', 'Precio final', 'descuento', 4, 'Tú solo: descuentos'),
    gen('Tú solo: ¿qué porcentaje es?', 'A ÷ N × 100', 'quePorcentaje', 4, 'Tú solo: qué %'),

    mc('Problemas del mercado', 'Elige la respuesta', [
      ['Una camisa de $400 sube 15 %. ¿Cuál es el nuevo precio?', ['$415', '$460', '$340'], 1, '400 × 1.15 = $460.'],
      ['Si 3/4 de una cantidad son 36, ¿cuál es la cantidad completa?', ['27', '48', '45'], 1, 'Cada cuarto es 12; los 4 cuartos son 48.'],
      ['6 trabajadores terminan en 10 días. ¿Cuántos días tardan 4 trabajadores?', ['6.7 días', '15 días', '12 días'], 1, 'Proporción inversa: 6 × 10 ÷ 4 = 15.'],
      ['¿Qué fracción equivale a 30 %?', ['3/10', '1/3', '30/10'], 0, '30/100 = 3/10.'],
    ], 'Problemas'),

    write('Tu propia situación', 'Usa porcentajes o fracciones en tu vida', 'Describe una situación de tu vida (compras, descuentos, recetas, propinas, batería del celular…) donde uses un **porcentaje o una fracción** y calcula el resultado.', [['Menciona porcentaje, % o fracción', '%|porcentaje|fraccion|por ciento|\\d/\\d'], ['Incluye una operación o resultado con números', '\\d'], ['Explica lo que significa el resultado', 'pago|paga|quedan|queda|total|resulta|son|es']], 3, 'Ejemplo: descuento del 20 % en unos tenis de $850.', 'Tú solo: tu situación'),

    lesson('Resumen del módulo', 'Lo más importante', [
      md('- **Simplificar:** divide arriba y abajo entre el MCD. **Equivalentes:** a × d = b × c.\n- **Suma/resta:** primero denominador común (MCM). **Multiplicar:** arriba × arriba, abajo × abajo. **Dividir:** voltea la segunda y multiplica.\n- **Regla de tres directa:** sube con sube. **Inversa:** sube con baja.\n- **P % de N = N × P ÷ 100.** Descuento: pagas (100 − P) %.'),
    ], 'Ya puedes simular tu mercado.', 'Resumen'),

    practica({
      t: 'Simulación de mercado', sub: 'Tu evidencia: vale el 10 % del curso',
      intro: 'Vas a **simular un mercado** y usar **proporciones y porcentajes** para calcular precios y descuentos, y luego analizar qué se vendió más.',
      mat: 'Hojas o cuaderno, calculadora y colores; puede hacerse en una hoja de cálculo.',
      ejemplo: '**Producto:** paquete de 12 galletas a $84 → cada una cuesta 84 ÷ 12 = **$7**; 5 galletas cuestan **$35**.<br>**Promoción:** 15 % de descuento a $200 → pagas 200 × 0.85 = **$170**.<br>**Tabla de ventas:** se vendieron 6 paquetes de galletas de 18 ventas en total → 6/18 = **1/3** = **33 %**. **Probabilidad** de que el siguiente cliente compre galletas ≈ 1/3.',
      steps: ['**Monten su mercado** (en equipo de 4): elijan 8 productos con su precio por unidad o por paquete.', '**Calculen precios con proporciones:** por ejemplo, si una caja de 12 cuesta $84, ¿cuánto cuesta cada pieza? ¿y 5 piezas?', '**Inventen 3 promociones** (15 % de descuento, 3 × 2, descuento si compras más de cierto monto) y calculen el precio final.', '**Simulen 12 clientes** que compran 3 productos cada uno y anoten en una **tabla** cuántas veces se vendió cada producto.', 'Calculen cada venta como **fracción simplificada, decimal y porcentaje**, y el total vendido en dinero.', '**Probabilidad:** si llega un cliente nuevo, ¿qué tan probable es que compre el producto más vendido? (veces vendido ÷ total de ventas).', 'Hagan una **gráfica** de barras o circular con los porcentajes.', '**Conclusión:** ¿qué producto conviene promocionar? ¿qué promoción deja más ganancia y cuál conviene más al cliente?'],
      deliver: 'Un reporte (PDF, documento o fotos) con tablas, cuentas, la gráfica y tus conclusiones.',
      rubric: [['Proporciones y porcentajes', 'Correctos y bien explicados', 'Algunos errores', 'Incorrectos'], ['Fracciones y simplificación', 'Simplificadas y con % y decimal', 'Sin simplificar', 'Incorrectas'], ['Análisis y probabilidad', 'Tabla, gráfica y probabilidad correctas', 'Falta un elemento', 'No hay'], ['Conclusiones', 'Basadas en los datos', 'Generales', 'No hay']],
    }),
  ],
};
