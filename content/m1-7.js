import { lesson, def, ex, ana, warn, it, p, md, img, flow, tiles, tbl, steps, words, vis, alt, viz, match, mc, order, cloze, gen, guia, write, practica } from '../js/mk.js';

export default {
  id: 'm1-7', unit: '1.7', title: 'Cálculos combinados con números reales', sub: 'Qué se hace primero cuando una cuenta tiene muchas operaciones', minutes: 150, weight: 30,
  goals: [
    'Saber **en qué orden** se resuelven las operaciones (la jerarquía).',
    'Resolver con **paréntesis, corchetes y llaves**, de adentro hacia afuera.',
    'Operar con **negativos, potencias, raíces, fracciones y decimales** en la misma cuenta.',
    'Aplicarlo a **compras reales**: descuentos, cambio y presupuesto.',
  ],
  pages: [
    lesson('¿Por qué hace falta un orden?', 'Para que todos lleguemos al mismo resultado', [
      words([['Operación combinada', 'una cuenta que tiene varias operaciones (sumas, multiplicaciones, etc.) juntas'], ['Jerarquía', 'el orden de importancia: qué se hace primero']]),
      flow([['🧮', 'Cuenta: 8 + 4 × 3'], ['😕', 'Hay dos formas|de hacerla'], ['📜', 'Se acordó un|orden'], ['✅', 'Un solo|resultado: 20']], 'Del problema al acuerdo'),
      def('El problema', '¿Cuánto es **8 + 4 × 3**? Si sumas primero: 12 × 3 = **36**. Si multiplicas primero: 8 + 12 = **20**. ¡Dos respuestas distintas!'),
      p('Para que **todas las personas y todas las calculadoras** den **el mismo resultado**, se acordó un orden. Ese orden se llama **jerarquía de operaciones**.'),
      ana('Es como las reglas de tránsito 🚦: sin un acuerdo común, cada quien pasaría cuando quisiera y habría choques. La jerarquía evita «choques» en las cuentas.'),
    ], 'La jerarquía evita que una cuenta tenga dos respuestas.', 'Por qué un orden'),

    lesson('La jerarquía de operaciones', 'Cuatro niveles. Aprende este orden de memoria', [
      img('assets/lessons/1-7-jerarquia.svg', 'Orden de operaciones'),
      it('1.º Agrupaciones', 'Lo que está **entre paréntesis ( ), corchetes [ ] o llaves { }**. Se resuelve de **adentro hacia afuera**.'),
      it('2.º Potencias y raíces', 'Después, los exponentes (³) y las raíces (√).'),
      it('3.º × y ÷', 'Multiplicaciones y divisiones: de **izquierda a derecha** (valen igual).'),
      it('4.º + y −', 'Sumas y restas: de **izquierda a derecha** (valen igual).'),
      alt('Truco para recordar el orden: **«Papá Pide Muchas Sopas»** → **P**aréntesis, **P**otencias y raíces, **M**ultiplicar y dividir, **S**umar y restar.', '🤔 ¿Cómo lo memorizo?'),
      warn('**× y ÷ valen igual** (se hacen como vienen, de izquierda a derecha). **+ y − valen igual** también. Ejemplo: **24 ÷ 4 × 3** → primero 24 ÷ 4 = 6, luego 6 × 3 = **18** (no 24 ÷ 12 = 2).', 'Cuidado'),
    ], 'Agrupaciones → potencias/raíces → × ÷ → + −.', 'La jerarquía'),

    order('Ordena la jerarquía', 'De lo que se resuelve primero a lo último', [
      ['Agrupaciones: ( ) [ ] { }, de adentro hacia afuera'], ['Potencias y raíces'], ['Multiplicaciones y divisiones, de izquierda a derecha'], ['Sumas y restas, de izquierda a derecha'],
    ], 'Tú solo: la jerarquía'),

    lesson('Resolver sin perderte', 'Un paso a la vez, y vuelves a escribir todo', [
      def('Método', '**1)** Escribe la cuenta. **2)** Busca **qué se hace primero**. **3)** Resuélvelo y **vuelve a escribir** la cuenta con ese resultado. **4)** Repite hasta que quede un solo número.'),
      steps('Ejemplo: 8 + 4 × 3', ['Escribe: **8 + 4 × 3**.', '¿Qué va primero? La **multiplicación** (nivel 3) antes que la suma (nivel 4).', '4 × 3 = **12**. Reescribe: **8 + 12**.', 'Ahora solo queda la suma: **8 + 12 = 20**.']),
      steps('Ejemplo con paréntesis: (8 + 4) × 3', ['Escribe: **(8 + 4) × 3**.', 'Lo que va **entre paréntesis** va primero: 8 + 4 = **12**.', 'Reescribe: **12 × 3**.', 'Resultado: **36**. ¡Con paréntesis cambió la respuesta!']),
    ], 'Resuelve una cosa a la vez y reescribe todo.', 'Método paso a paso'),

    guia('Practica con ayuda', 'Resuelve 20 − 3 × 4 + 6 ÷ 2', [
      { q: 'En **20 − 3 × 4 + 6 ÷ 2**, ¿qué se hace **primero**? (los × y ÷ van antes que + y −)', mode: 'sel', opts: ['20 − 3', '3 × 4', 'Todo de izquierda a derecha'], ans: '3 × 4', hint: 'Multiplicar y dividir tienen más jerarquía que sumar y restar. De izquierda a derecha, la primera multiplicación es 3 × 4.', ok: 'Empezamos con 3 × 4.' },
      { q: '3 × 4 = ?', mode: 'n', ans: 12, hint: 'Tres por cuatro.', ok: 'Queda: 20 − 12 + 6 ÷ 2.' },
      { q: 'Ahora la división: **6 ÷ 2** = ?', mode: 'n', ans: 3, hint: 'La mitad de 6.', ok: 'Queda: 20 − 12 + 3.' },
      { q: 'Quedan solo sumas y restas, de izquierda a derecha: 20 − 12 = ?', mode: 'n', ans: 8, hint: 'Veinte menos doce.', ok: 'Queda: 8 + 3.' },
      { q: 'Y por último: 8 + 3 = ?', mode: 'n', ans: 11, hint: 'Ocho más tres.', ok: '¡El resultado es 11! Lo hiciste paso a paso.' },
    ], 'Un paso a la vez.', 'Con ayuda: una cuenta completa'),

    lesson('Herramienta: resuelve paso a paso', 'Escribe cualquier cuenta y mira los pasos', [
      viz('hier', '🧰 Escribe una operación y toca «Resolver paso a paso»'),
      p('Lo que sale **resaltado** es lo que se resuelve en ese paso. Usa **+ − × ÷ ^ √** y paréntesis, corchetes o llaves. ¡Prueba con tus propias cuentas!'),
    ], 'Fíjate qué se resalta primero y por qué.', 'Herramienta'),

    gen('Ahora tú solo: cuentas fáciles', 'Aplica el orden. «Ver respuestas» te muestra los pasos', 'jerarquiaFacil', 5, 'Tú solo: nivel fácil'),

    lesson('Paréntesis, corchetes y llaves', 'Resuelve de adentro hacia afuera', [
      words([['Agrupación', 'los símbolos que encierran una parte de la cuenta para decir «esto va primero»'], ['Anidados', 'unos dentro de otros, como las muñecas rusas']]),
      def('De adentro hacia afuera', 'Primero lo **más interno** ( ), luego los corchetes [ ], al final las llaves { }.'),
      ana('Es como pelar una **cebolla** 🧅: empiezas por la **capa de afuera** al revés: para llegar al centro quitas capas, pero para **resolver** la cuenta empiezas por el **centro** (lo más interno) y sales hacia afuera.', 'Piénsalo así'),
      steps('2 × {3 + [10 − (4 − 1)] ÷ 7}', ['Lo más interno: **(4 − 1) = 3** → 2 × {3 + [10 − 3] ÷ 7}.', 'Corchetes: **[10 − 3] = 7** → 2 × {3 + 7 ÷ 7}.', 'Dentro de las llaves va primero la **división**: **7 ÷ 7 = 1** → 2 × {3 + 1}.', 'Llaves: **{3 + 1} = 4** → 2 × 4.', 'Resultado: **8**.']),
      warn('Ojo: **√(9 + 16)** no es √9 + √16. Primero se suma dentro de la raíz: √25 = **5** (y no 3 + 4 = 7). La raíz también «agrupa».', 'La raíz también agrupa'),
    ], 'Siempre de lo más interno hacia afuera.', 'Agrupaciones'),

    guia('Practica con ayuda', 'Resuelve 2 × {3 + [10 − (4 − 1)] ÷ 7}', [
      { q: 'Empieza por lo **más interno**, el paréntesis (4 − 1). ¿Cuánto da?', mode: 'n', ans: 3, hint: 'Cuatro menos uno.', ok: 'Ahora: 2 × {3 + [10 − 3] ÷ 7}.' },
      { q: 'Ahora el corchete: [10 − 3] = ?', mode: 'n', ans: 7, hint: 'Diez menos tres.', ok: 'Ahora: 2 × {3 + 7 ÷ 7}.' },
      { q: 'Dentro de las llaves, primero la **división**: 7 ÷ 7 = ?', mode: 'n', ans: 1, hint: 'Un número entre sí mismo.', ok: 'Ahora: 2 × {3 + 1}.' },
      { q: 'Las llaves: 3 + 1 = ?', mode: 'n', ans: 4, hint: 'Tres más uno.', ok: 'Ahora: 2 × 4.' },
      { q: 'Y para terminar: 2 × 4 = ?', mode: 'n', ans: 8, hint: 'Dos por cuatro.', ok: '¡8! Resolviste una cuenta con tres tipos de agrupaciones.' },
    ], 'De adentro hacia afuera.', 'Con ayuda: agrupaciones'),

    gen('Ahora tú solo: cuentas con potencias y raíces', 'Después de revisar, «Ver respuestas» muestra el paso a paso', 'jerarquia', 5, 'Tú solo: nivel medio'),

    lesson('Con números negativos', 'La resta como suma del opuesto', [
      def('Recuerda', '**a − b = a + (−b)**. Restar un número es **sumar su opuesto**. Y un **menos delante de un negativo** se vuelve **más**.'),
      tbl(['Cuenta', 'Se convierte en', 'Resultado'], [['5 − 9', '5 + (−9)', '−4'], ['5 − (−3)', '5 + 3', '8'], ['−7 − (−2 + 5)', '−7 − 3', '−10'], ['(−3)² − 2 × (−4)', '9 + 8', '17']]),
      steps('(−3)² − 2 × (−4) + √16 ÷ (−2)', ['**Potencias y raíces** primero: (−3)² = **9** y √16 = **4**.', 'Queda: 9 − 2 × (−4) + 4 ÷ (−2).', '**× y ÷** de izquierda a derecha: 2 × (−4) = **−8** y 4 ÷ (−2) = **−2**.', 'Queda: 9 − (−8) + (−2) = 9 + 8 − 2.', 'Resultado: **15**.']),
    ], 'Un menos delante de un negativo se vuelve más.', 'Con negativos'),

    mc('Errores comunes', 'Detecta dónde se equivocó cada persona', [
      ['Ana resolvió 6 + 3 × 4 = 36. ¿Qué hizo mal?', ['Sumó antes de multiplicar', 'Multiplicó mal', 'Nada, está bien'], 0, 'Correcto es 6 + 12 = 18.'],
      ['Luis resolvió 24 ÷ 4 × 3 = 2. ¿Qué hizo mal?', ['Hizo 4 × 3 primero', 'Restó mal', 'Nada'], 0, 'De izquierda a derecha: 24 ÷ 4 = 6, y 6 × 3 = 18.'],
      ['Eva resolvió √(9 + 16) = 7. ¿Qué hizo mal?', ['Sacó la raíz de cada número por separado', 'Se equivocó al sumar', 'Nada'], 0, 'Dentro de la raíz se suma primero: √25 = 5.'],
      ['Tomás resolvió −3² = 9. ¿Qué hizo mal?', ['Elevó el signo también', 'Debió dividir', 'Nada'], 0, 'Sin paréntesis solo el 3 se eleva: −(3²) = −9.'],
    ], 'Errores comunes'),

    match('¿Qué se resuelve primero?', 'Elige la primera operación en cada cuenta', [
      ['3 + 4 × 2', '4 × 2'], ['(3 + 4) × 2', '3 + 4'], ['10 − 2³', '2³'], ['12 ÷ 3 × 2', '12 ÷ 3'], ['√(9 + 16) − 1', '9 + 16'], ['6 + 8 ÷ 2', '8 ÷ 2'],
    ], ['4 × 2', '3 + 4', '2³', '12 ÷ 3', '9 + 16', '8 ÷ 2'], 'Tú solo: primer paso'),

    lesson('Fracciones y decimales en la misma cuenta', 'Todo cabe en una operación', [
      p('En una cuenta pueden aparecer **enteros, fracciones, decimales y raíces**. Puedes pasar **todo a fracciones** o **todo a decimales**, pero no mezclarlos sin convertir.'),
      ex('**1/2 + 3/4 × 2/3** → primero la multiplicación: 3/4 × 2/3 = 6/12 = 1/2 → 1/2 + 1/2 = **1**.', 'Con fracciones'),
      ex('**0.5 × 8 − 1.2 ÷ 0.4** → 4 − 3 = **1**.', 'Con decimales'),
    ], 'Primero la jerarquía; luego, el tipo de número.', 'Fracciones y decimales'),

    lesson('Cuentas de la vida real: el mercado', 'Compras, descuentos y cambio', [
      def('Una sola cuenta', 'Muchos problemas de compras se pueden escribir como **una sola operación combinada** y resolverse con la jerarquía.'),
      steps('Compras 3 kg de tomate a $22 y 2.5 kg de cebolla a $18, con 10 % de descuento. Pagas con $200', ['Escribe la cuenta: **200 − (3 × 22 + 2.5 × 18) × 0.90**.', 'Dentro del paréntesis, primero las **multiplicaciones**: 3 × 22 = **66** y 2.5 × 18 = **45**.', 'Suma: 66 + 45 = **111**.', 'Descuento: 111 × 0.90 = **99.90** (pagas el 90 %).', 'Cambio: 200 − 99.90 = **$100.10**.']),
    ], 'Escribir la cuenta completa es la mitad del problema.', 'Compras reales'),

    gen('Tú solo: compras con cupón', 'Escribe cuánto pagas', 'mercado', 4, 'Tú solo: compras'),
    gen('Reto 🌟: cuentas largas con negativos', 'Para los que quieren más', 'jerarquia2', 4, 'Reto: cuentas largas'),

    write('Tu propio reto', 'Una cuenta combinada de tu vida diaria', 'Inventa un problema de compras o gastos de tu vida diaria que necesite **una operación combinada** (con paréntesis o descuento). Escribe la cuenta y el resultado.', [['Incluye números', '\\d'], ['Usa paréntesis o signos de operación', '\\(|\\)|x|\\*|\\+|-|÷|/'], ['Da un resultado', 'resultado|total|pago|paga|cambio|queda|son|=']], 3, 'Ejemplo: 3 refrescos de $18 y 2 tortas de $35 con $20 de descuento.', 'Tú solo: tu reto'),

    lesson('Resumen del módulo', 'Lo más importante', [
      md('1. **Agrupaciones** ( ) [ ] { } de adentro hacia afuera.\n2. **Potencias y raíces.**\n3. **× y ÷** de izquierda a derecha.\n4. **+ y −** de izquierda a derecha.\n\n- «Papá Pide Muchas Sopas».\n- **a − b = a + (−b)** · (−3)² = 9 pero −3² = −9 · √(a + b) no es √a + √b.\n- Escribe **toda la cuenta** y reescribe en cada paso lo que no cambió.'),
    ], 'Ya puedes crear tu reto matemático.', 'Resumen'),

    practica({
      t: 'Reto matemático: mercado comunitario', sub: 'Tu evidencia: vale el 30 % del curso (la más importante)',
      intro: 'Vas a **inventar un reto matemático** para que otros equipos planeen las compras de un evento del barrio sin pasarse del presupuesto.',
      mat: 'Hojas o cuaderno, calculadora y colores; puede hacerse en un documento o presentación digital.',
      ejemplo: '**Evento:** kermés de la escuela 🎪 para **40 personas**. **Presupuesto:** $1 200.<br>**Pregunta 1:** Cada persona toma 2 refrescos de $18. ¿Cuánto cuestan en total? → 40 × 2 × 18 = **$1 440**. <br>**Pregunta 2:** Con un descuento del 15 % por mayoreo, ¿cuánto pagan? → 1 440 × 0.85 = **$1 224**.<br>**Pregunta 3:** ¿Se pasan del presupuesto? → 1 224 − 1 200 = **$24 de más**. Recomendamos comprar menos refrescos.',
      steps: ['**Define el evento** (kermés, posada, comida escolar, fiesta del barrio), cuántas personas son y el **presupuesto máximo**.', 'Haz la **lista de productos** del mercado (mínimo 8) con su precio por kilo, litro o pieza. Incluye algunas ofertas o descuentos.', 'Escribe **al menos 6 preguntas encadenadas** (el resultado de una sirve para la siguiente) que pidan: operaciones combinadas con agrupaciones, fracciones o decimales, al menos un porcentaje, una potencia o raíz (por ejemplo, el lado de una mesa cuadrada) y una conversión de unidades (g ↔ kg).', 'Agrega una pregunta final: «¿alcanza el presupuesto? ¿cuánto sobra o falta?».', 'Escribe el **solucionario** con cada paso y el resultado correcto (usa la jerarquía).', '**Intercambia** tu reto con otro equipo, resuélvanlo y comparen resultados; corrijan lo que haga falta.', 'Entrega la versión final con una **conclusión**: ¿qué decisión de compra recomiendan y por qué?'],
      deliver: 'Tu reto + el solucionario + tus conclusiones (PDF, documento o fotos).',
      rubric: [['Diseño del reto', 'Situación real, 6 o más preguntas encadenadas', 'Faltan elementos', 'Preguntas sueltas'], ['Operaciones combinadas', 'Usa la jerarquía, agrupaciones, potencias o raíces bien', 'Algunos errores', 'Muchos errores'], ['Solucionario', 'Pasos completos y resultado correcto', 'Incompleto', 'No hay o es incorrecto'], ['Decisión y conclusiones', 'Fundamentada con cuentas', 'General', 'Sin sustento']],
    }),
  ],
};
