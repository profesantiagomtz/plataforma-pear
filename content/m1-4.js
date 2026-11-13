import { anim, lesson, def, ex, ana, warn, it, p, md, img, flow, tiles, tbl, steps, words, vis, alt, viz, match, mc, order, cloze, gen, guia, write, practica } from '../js/mk.js';

export default {
  id: 'm1-4', unit: '1.4', title: 'Fracciones y porcentajes', sub: 'Pizzas, descuentos y repartos: matemáticas que usas todos los días', minutes: 130, weight: 10,
  goals: [
    'Saber qué es una **fracción** (partes de algo entero, como una pizza).',
    'Ver cuándo dos fracciones **valen lo mismo** y hacerlas **más cortas**.',
    'Saber cuál fracción es **más grande**, y **sumar, restar, multiplicar y dividir** fracciones.',
    'Resolver **regla de tres**: si 3 cuestan tanto, ¿cuánto cuestan 5?',
    'Calcular **descuentos** y **porcentajes** de la tienda.',
  ],
  pages: [
    lesson('¿Qué es una fracción?', 'Partes de algo entero, como una pizza 🍕', [
      words([['Unidad', 'algo completo: una pizza entera, un chocolate entero'], ['Fracción', 'unas partes iguales de algo completo. Se escribe con dos números y una rayita: ¾'], ['Numerador', 'el número de **arriba**: cuántas partes tomas'], ['Denominador', 'el número de **abajo**: en cuántas partes partiste']]),
      anim('assets/anim/pizza-3-4.html', '🍕 De la pizza a la fracción: aprieta el botón azul **Siguiente paso**'),
      def('Fracción', 'En **3/4**: el **4 (abajo)** dice en cuántas partes iguales partiste la pizza. El **3 (arriba)** dice cuántas partes tomaste.'),
      viz('frac', '🎛️ Juega con la barra: aprieta los botones azules **−** y **+**'),
      tbl(['Nombre', 'Cómo la reconoces', 'Ejemplo'], [['Propia', 'el de arriba es **más chico** que el de abajo. Es menos de una pizza', '3/4'], ['Impropia', 'el de arriba es **más grande** (o igual). Es una pizza o más', '11/4'], ['Mixta', 'un número entero y junto una fracción', '2 ¾']], '📋 Tipos de fracciones'),
      anim('assets/anim/mixta-impropia.html', '🍕 Número mixto: aprieta el botón azul **Siguiente paso**'),
      p('También al revés: 11 ÷ 4 = 2 y sobran 3. Entonces 11/4 = **2 ¾** (2 pizzas enteras y 3 rebanadas).'),
    ], 'El de abajo dice en cuántas partes se partió; el de arriba, cuántas tomaste.', 'La fracción'),

    guia('Practica con ayuda', 'Leer fracciones', [
      { q: 'Una pizza 🍕 se parte en **8** rebanadas y te comes **3**. ¿Cuál es el número de **abajo** (en cuántas partes se partió)?', mode: 'n', ans: 8, hint: 'Cuenta todas las rebanadas de la pizza.', ok: 'Abajo va el 8.' },
      { q: '¿Y el número de **arriba** (cuántas rebanadas te comiste)?', mode: 'n', ans: 3, hint: 'Las rebanadas que te comiste.', ok: 'Arriba va el 3. Te comiste 3/8.' },
      { q: 'Hay **12** pastelitos y te comes **5**. ¿Qué número va **arriba**?', mode: 'n', ans: 5, hint: 'Arriba va lo que tomaste.', ok: '5/12.' },
      { q: '¿Cuál fracción es **más de una pizza entera**?', mode: 'sel', opts: ['3/4', '11/4', '1/2'], ans: '11/4', hint: 'Busca la que tiene el número de arriba más grande que el de abajo.', ok: '11/4 = 2 pizzas y ¾.' },
    ], 'Piensa en pizza y pastelitos.', 'Con ayuda: fracciones'),

    lesson('Fracciones que valen lo mismo', 'Se ven distintas pero son la misma cantidad', [
      words([['Equivalentes', 'fracciones que valen **lo mismo** aunque tengan otros números'], ['Amplificar', 'hacer los números **más grandes**: multiplicas arriba y abajo por el mismo número'], ['Simplificar', 'hacer los números **más chicos**: divides arriba y abajo entre el mismo número']]),
      img('assets/lessons/1-4-fracciones.svg', 'Barras que muestran fracciones equivalentes'),
      anim('assets/anim/fracciones-iguales.html', '🍕 Con pizza: aprieta el botón azul **Siguiente paso**'),
      it('Amplificar', 'Multiplica arriba y abajo por el **mismo** número. 1/2: arriba 1 × 2 = 2, abajo 2 × 2 = 4. Queda **2/4**, que es lo mismo.'),
      it('Simplificar', 'Divide arriba y abajo entre el **mismo** número. 4/8: arriba 4 ÷ 4 = 1, abajo 8 ÷ 4 = 2. Queda **1/2**.'),
      steps('Simplificar 12/18, poco a poco', ['¿Los dos son pares? Sí. Divide los dos entre **2**: 12 ÷ 2 = **6** y 18 ÷ 2 = **9**. Va en **6/9**.', '¿6 y 9 se pueden dividir entre 2? No (9 es impar). Prueba con **3**: 6 ÷ 3 = **2** y 9 ÷ 3 = **3**. Va en **2/3**.', '¿2 y 3 se pueden dividir entre el mismo número? No. **Terminaste: 12/18 = 2/3**.']),
      alt('Prueba en este orden: **2** (si los dos son pares), luego **3**, luego **5** (si los dos terminan en 0 o 5). Repite hasta que ya no se pueda.', '🤔 ¿Entre qué número divido?'),
    ], 'Cambiar de forma no cambia el valor.', 'Equivalentes'),

    guia('Practica con ayuda', 'Simplifica paso a paso', [
      { q: 'Vamos a simplificar **6/9**. ¿Qué número divide exacto al 6 y al 9? (prueba 2 o 3)', mode: 'n', ans: 3, hint: '6 se divide entre 3 y 9 también.', ok: '3 cabe en los dos.' },
      { q: '6 ÷ 3 = ?', mode: 'n', ans: 2, hint: 'Una cuenta fácil.', ok: '2.' },
      { q: '9 ÷ 3 = ?', mode: 'n', ans: 3, hint: 'Otra fácil.', ok: '3.' },
      { q: 'Entonces 6/9 simplificada es… (escribe arriba, rayita y abajo; por ejemplo 5/7)', mode: 'fs', ans: [2, 3], hint: 'Arriba el 2, abajo el 3: 2/3.', ok: '2/3. ¡Ya sabes simplificar!' },
    ], 'Cuatro pasitos.', 'Con ayuda: simplificar'),

    gen('Ahora tú solo: simplifica', 'Escríbela con rayita, por ejemplo 2/3', 'simplifica', 5, 'Tú solo: simplificar'),

    lesson('¿Cuál fracción es más grande?', 'Un truco: multiplica en forma de X', [
      def('Multiplicar en cruz (en X)', 'Pon las dos fracciones juntas. Multiplica el de **arriba** de una por el de **abajo** de la otra, para los dos lados. **Donde salga el número más grande, esa fracción es más grande.**'),
      steps('¿Cuál es más: 3/5 o 4/7?', ['Lado de 3/5: su arriba (**3**) por el abajo de la otra (**7**): 3 × 7 = **21**.', 'Lado de 4/7: su arriba (**4**) por el abajo de la otra (**5**): 4 × 5 = **20**.', '21 es más que 20. **Gana 3/5**. Se escribe 3/5 > 4/7 (la boca del signo > se abre hacia el más grande).']),
      anim('assets/anim/cual-es-mas.html', '🍕 Para imaginarlo: aprieta el botón azul **Siguiente paso**'),
    ], 'Multiplica en cruz y compara los resultados.', 'Comparar'),

    match('Tú solo: compara fracciones', 'Elige el signo: > si la de la izquierda es más grande · < si es más chica · = si son iguales', [
      ['2/3  ○  3/5', '>'], ['5/8  ○  7/12', '>'], ['4/6  ○  6/9', '='], ['1/3  ○  2/5', '<'], ['7/10  ○  3/4', '<'], ['5/6  ○  4/5', '>'],
    ], ['>', '<', '='], 'Tú solo: comparar'),

    lesson('Sumar y restar fracciones', 'Primero hay que partir todo en partes iguales', [
      words([['Mismo número abajo', 'que las dos estén partidas en partes del **mismo tamaño**. Solo así se pueden sumar']]),
      it('Si abajo tienen el mismo número', 'Suma (o resta) **solo los de arriba**. El de abajo se queda igual. 3/8 + 2/8 = **5/8**.'),
      it('Si abajo tienen números distintos', 'Primero cámbialas para que abajo tengan el **mismo número**. Busca un número que esté en las **tablas de multiplicar** de los dos. 1/2 + 1/3: el 6 está en la tabla del 2 y en la del 3. 1/2 = 3/6 y 1/3 = 2/6. Suma: **5/6**.'),
      anim('assets/anim/sumar-fracciones.html', '🍫 Mira cómo se suman: aprieta el botón azul **Siguiente paso**'),
      steps('Ejemplo: 1/3 + 1/6', ['Abajo hay **3** y **6**. Son distintos.', 'Busca en la tabla del 6: 6, 12, 18… ¿El 6 está también en la tabla del 3? **Sí** (3 × 2 = 6). Usamos el **6**.', 'Cambia 1/3 a sextos: abajo 3 × 2 = 6, arriba 1 × 2 = 2. Queda **2/6**.', '1/6 ya tiene 6 abajo. Se queda igual.', 'Suma los de arriba: 2/6 + 1/6 = **3/6**.', 'Hazla más corta: 3 ÷ 3 = 1 y 6 ÷ 3 = 2. **Resultado: 1/2**.']),
      warn('**Nunca** sumes los de abajo. 1/2 + 1/3 **no** es 2/5.'),
    ], 'Primero el mismo número abajo; luego sumas solo los de arriba.', 'Sumar y restar'),

    guia('Practica con ayuda', 'Suma 1/2 + 1/4', [
      { q: 'Tenemos 1/2 + 1/4. Abajo hay 2 y 4. ¿Qué número está en la tabla del 2 **y** en la tabla del 4? (el más chico)', mode: 'n', ans: 4, hint: 'Tabla del 2: 2, 4, 6… Tabla del 4: 4, 8… ¿cuál está en las dos?', ok: 'El 4.' },
      { q: 'Cambia 1/2 para que abajo diga 4. Abajo fue × 2 (2 × 2 = 4). Arriba también × 2. ¿Cuánto queda arriba? (1/2 = ?/4)', mode: 'n', ans: 2, hint: '1 × 2 = ?', ok: '1/2 = 2/4.' },
      { q: 'Ahora suma 2/4 + 1/4. ¿Cuánto da? (escribe con rayita, por ejemplo 5/7)', mode: 'fs', ans: [3, 4], hint: 'Abajo se queda el 4. Arriba suma 2 + 1.', ok: '3/4.' },
    ], 'Vamos con calma.', 'Con ayuda: sumar'),

    gen('Ahora tú solo: suma y resta', 'Escríbelo con rayita, por ejemplo 2/3', 'sumaFrac', 5, 'Tú solo: sumar y restar'),

    lesson('Multiplicar y dividir fracciones', '¡Es más fácil que sumar!', [
      def('Multiplicar', 'Multiplica **arriba con arriba** y **abajo con abajo**. 1/2 × 3/4: arriba 1 × 3 = 3, abajo 2 × 4 = 8. Resultado: **3/8**.'),
      def('Dividir', '**Voltea** la segunda fracción (lo de arriba pasa abajo) y luego **multiplica**. 1/2 ÷ 3/4: volteo 3/4 → 4/3. Multiplico 1/2 × 4/3 = 4/6 = **2/3**.'),
      anim('assets/anim/fraccion-de-cantidad.html', '🍬 Fracción de una cantidad: aprieta el botón azul **Siguiente paso**'),
      alt('Cuando dice «¾ **de** 80»: primero **reparte** 80 entre 4 (el de abajo) y luego **toma** 3 partes (el de arriba).', '🤔 ¿Qué significa «de»?'),
    ], 'Multiplicar: arriba con arriba, abajo con abajo. Dividir: voltea la segunda y multiplica.', 'Multiplicar y dividir'),

    gen('Tú solo: × y ÷ de fracciones', 'Escríbelo con rayita, por ejemplo 2/3', 'mulFrac', 5, 'Tú solo: × y ÷'),
    gen('Tú solo: fracción de una cantidad', 'Reparte entre el de abajo y toma los de arriba', 'fraccionDe', 4, 'Tú solo: fracción de'),

    lesson('Regla de tres', 'Si 3 cuestan tanto, ¿cuánto cuestan 5?', [
      words([['Regla de tres', 'una forma de saber un dato que falta. Truco: **primero saca cuánto vale 1**'], ['Directa', 'si una cosa sube, la otra **también sube**. Más tortillas, más dinero'], ['Inversa', 'si una cosa sube, la otra **baja**. Más trabajadores, menos días']]),
      anim('assets/anim/regla-directa.html', '🍅 **Directa**: aprieta el botón azul **Siguiente paso**'),
      anim('assets/anim/regla-inversa.html', '👷 **Inversa**: aprieta el botón azul **Siguiente paso**'),
      ex('Una receta de arroz para **4** personas lleva **2 tazas**. ¿Para **8** personas? 8 es el doble de 4, entonces el doble de arroz: **4 tazas**.', '🍚 En la cocina'),
      alt('Pregúntate: «si compro el **doble**, ¿pago el doble?» Si sí, es **directa**. «Si trabaja el **doble de gente**, ¿tardan la **mitad**?» Si sí, es **inversa**.', '🤔 ¿Directa o inversa?'),
    ], 'Directa: sube y sube. Inversa: una sube y la otra baja.', 'Regla de tres'),

    guia('Practica con ayuda', 'Regla de tres', [
      { q: '5 cuadernos cuestan **$140**. ¿Cuánto cuesta **1** cuaderno?', mode: 'n', ans: 28, hint: 'Divide 140 entre 5.', ok: '140 ÷ 5 = $28.' },
      { q: 'Si cada cuaderno cuesta $28, ¿cuánto cuestan **8** cuadernos?', mode: 'n', ans: 224, hint: 'Multiplica 28 × 8.', ok: '28 × 8 = $224.' },
    ], 'Primero el precio de 1.', 'Con ayuda: regla de tres'),

    gen('Tú solo: regla de tres', 'Primero saca cuánto cuesta 1', 'reglaTres', 4, 'Tú solo: regla de tres'),

    lesson('Porcentaje', 'El % quiere decir «de cada 100»', [
      words([['Porcentaje (%)', '«de cada 100». El 25 % es 25 de cada 100'], ['Descuento', 'lo que **te quitan** del precio. Pagas menos'], ['Aumento', 'lo que **le suben** al precio. Pagas más']]),
      def('Porcentaje', '**50 %** es 50 de cada 100: **la mitad**. **25 %** es 25 de cada 100: **un cuarto**. **100 %** es **todo**.'),
      tiles([['½', '50 %', 'la mitad'], ['¼', '25 %', 'un cuarto'], ['¾', '75 %', 'tres cuartos'], ['1', '100 %', 'todo']]),
      tbl(['Quiero saber…', 'Qué hago', 'Ejemplo'], [['El 25 % de 240', 'multiplica por el % y divide entre 100', '240 × 25 = 6 000. 6 000 ÷ 100 = **60**'], ['Cuánto pago con descuento', 'saca el descuento y **réstalo**', '$850 con 20 %: 850 × 20 ÷ 100 = 170. 850 − 170 = **$680**'], ['Cuánto cuesta con aumento', 'saca el aumento y **súmalo**', '$400 con 15 %: 400 × 15 ÷ 100 = 60. 400 + 60 = **$460**'], ['Qué % es 45 de 180', 'divide y multiplica por 100', '45 ÷ 180 = 0.25. 0.25 × 100 = **25 %**']]),
      anim('assets/anim/porcentaje-descuento.html', '📱 Un descuento: aprieta el botón azul **Siguiente paso**'),
    ], 'Si te descuentan 20 %, pagas el 80 %.', 'Porcentaje'),

    guia('Practica con ayuda', 'Descuento paso a paso', [
      { q: 'Unos tenis cuestan **$850** y tienen **20 %** de descuento. Primero: ¿cuánto es el 20 % de 850? (850 × 20 ÷ 100)', mode: 'n', ans: 170, hint: '850 × 20 = 17 000. Luego ÷ 100.', ok: '$170 de descuento.' },
      { q: 'Si te descuentan $170, ¿cuánto pagas? (850 − 170)', mode: 'n', ans: 680, hint: 'Resta.', ok: 'Pagas $680.' },
      { q: 'Atajo: si descuentan el 20 %, pagas el **80 %**. ¿Cuánto es el 80 % de 850? (850 × 0.80)', mode: 'n', ans: 680, hint: '850 × 8 ÷ 10.', ok: '$680. ¡Sale igual!' },
    ], 'Un paso a la vez.', 'Con ayuda: descuento'),

    gen('Tú solo: calcula porcentajes', 'Multiplica por el % y divide entre 100', 'porcentaje', 4, 'Tú solo: porcentajes'),
    gen('Tú solo: descuentos y aumentos', 'Descuento: restas. Aumento: sumas', 'descuento', 4, 'Tú solo: descuentos'),
    gen('Tú solo: ¿qué porcentaje es?', 'Divide y multiplica por 100', 'quePorcentaje', 4, 'Tú solo: qué %'),

    mc('Problemas del mercado', 'Elige la respuesta', [
      ['Una camisa de $400 sube 15 %. ¿Cuál es el nuevo precio?', ['$415', '$460', '$340'], 1, 'El 15 % de 400 es 60. Le sumas: 400 + 60 = $460.'],
      ['Si 3/4 de una cantidad son 36, ¿cuál es la cantidad completa?', ['27', '48', '45'], 1, 'Si 3 cuartos son 36, un cuarto es 36 ÷ 3 = 12. Los 4 cuartos: 12 × 4 = 48.'],
      ['6 trabajadores terminan en 10 días. ¿Cuántos días tardan 4 trabajadores?', ['6.7 días', '15 días', '12 días'], 1, 'Es inversa: menos trabajadores, más días. 6 × 10 = 60 días de trabajo. 60 ÷ 4 = 15.'],
      ['¿Qué fracción equivale a 30 %?', ['3/10', '1/3', '30/10'], 0, '30 % es 30/100. Divide los dos entre 10: 3/10.'],
    ], 'Problemas'),

    write('Tu propia situación', 'Usa porcentajes o fracciones en tu vida', 'Describe una situación de tu vida (compras, descuentos, recetas, propinas, batería del celular…) donde uses un **porcentaje o una fracción** y calcula el resultado.', [['Menciona porcentaje, % o fracción', '%|porcentaje|fraccion|por ciento|\\d/\\d'], ['Incluye una operación o resultado con números', '\\d'], ['Explica lo que significa el resultado', 'pago|paga|quedan|queda|total|resulta|son|es']], 3, 'Ejemplo: descuento del 20 % en unos tenis de $850.', 'Tú solo: tu situación'),

    lesson('Resumen del módulo', 'Lo más importante', [
      md('- **Fracción:** abajo, en cuántas partes partes; arriba, cuántas tomas.\n- **Hacerla más corta (simplificar):** divide arriba y abajo entre el mismo número (prueba 2, 3, 5).\n- **¿Cuál es más grande?** Multiplica en X; gana el lado con el número más grande.\n- **Sumar y restar:** primero el mismo número abajo; luego solo sumas los de arriba.\n- **Multiplicar:** arriba con arriba, abajo con abajo. **Dividir:** voltea la segunda y multiplica.\n- **Regla de tres:** primero saca cuánto vale 1.\n- **Porcentaje:** multiplica por el % y divide entre 100. Descuento: restas. Aumento: sumas.'),
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
