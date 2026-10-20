import { lesson, def, ex, ana, warn, it, p, md, img, flow, tiles, tbl, steps, words, vis, alt, match, mc, order, cloze, gen, guia, tt, write, practica } from '../js/mk.js';

export default {
  id: 'm1-1', unit: '1.1', title: 'Lógica matemática', sub: 'Aprende a saber si algo es cierto o no, paso a paso', minutes: 100, weight: 15,
  goals: [
    'Saber qué frases se pueden decir **ciertas o falsas** (se llaman proposiciones).',
    'Unir frases con **«no», «y», «o», «si… entonces»** y saber cuándo el resultado es cierto.',
    'Armar **tablas de verdad** (una tabla con todos los casos posibles).',
    'Usar todo esto para **analizar un debate** sobre derechos humanos.',
  ],
  pages: [
    lesson('¿Qué vamos a aprender?', 'Es más fácil de lo que parece. Vamos poco a poco.', [
      flow([['💬', 'Alguien dice|una frase'], ['🤔', '¿Es cierta|o falsa?'], ['🧩', 'Unimos|frases'], ['✅', 'Sacamos una|conclusión']], 'Del enunciado a la conclusión'),
      words([['Razonar', 'pensar paso a paso para llegar a una respuesta correcta'], ['Lógica', 'las reglas para razonar bien, sin confundirnos']]),
      ana('En la escuela hay una regla: **«Si llegas tarde, no entras a primera hora»**. Para saber si alguien **cumplió o no** la regla, necesitas lógica. ¡Eso vamos a aprender!'),
      p('No necesitas saber nada antes. Si algo no se entiende, toca **📖 Palabras** (arriba) o abre **🤔 ¿No lo entendiste?** y te lo explico de otra forma.'),
    ], 'Hoy aprendes las reglas para saber si algo es cierto o no.', 'Qué vamos a aprender'),

    lesson('Frases que son ciertas o falsas', 'Primer paso: saber cuáles frases «cuentan»', [
      words([['Verdadero (V)', 'lo que sí es cierto ✅'], ['Falso (F)', 'lo que no es cierto ❌'], ['Proposición', 'una frase de la que puedes decir «es cierta» o «es falsa»']]),
      def('Proposición', 'Es una frase de la que puedes decir **«es cierta»** o **«es falsa»**. Nada más.'),
      tbl(['Frase', '¿Puedo decir si es cierta o falsa?', 'Resultado'], [['Una manzana es una fruta 🍎', 'Sí', '✅ V (verdadero)'], ['Un perro tiene 3 patas 🐕', 'Sí', '❌ F (falso)'], ['¿Quieres tacos? 🌮', 'No, es una pregunta', '—'], ['Cierra la puerta 🚪', 'No, es una orden', '—'], ['¡Qué rico huele! 😋', 'No, es una exclamación', '—'], ['x + 2 = 5', 'No, depende de cuánto valga x', '—']]),
      alt('Truco: ponle **«Es cierto que…»** al principio. «Es cierto que una manzana es una fruta» **suena bien** → es proposición. «Es cierto que ¿quieres tacos?» **suena raro** → no es proposición.', '🤔 ¿No lo entendiste? Un truco fácil'),
    ], 'Pregunta, orden o exclamación: NO es proposición.', 'Proposiciones'),

    guia('Practica con ayuda', '¿Es proposición? Yo te voy guiando', [
      { q: '«Los perros ladran 🐕». ¿Se puede decir que es cierta o falsa?', mode: 'sel', opts: ['Sí', 'No'], ans: 'Sí', hint: 'Pregúntate: ¿alguien podría decir «eso es cierto»? Sí, ¿verdad?', ok: 'Es una proposición (y es verdadera).' },
      { q: '«¿Quieres tacos? 🌮». ¿Se puede decir que es cierta o falsa?', mode: 'sel', opts: ['Sí', 'No'], ans: 'No', hint: 'Es una pregunta. A una pregunta no le decimos «cierta» o «falsa».', ok: 'Las preguntas no son proposiciones.' },
      { q: '«Cierra la puerta 🚪». ¿Es proposición?', mode: 'sel', opts: ['Sí', 'No'], ans: 'No', hint: 'Es una orden.', ok: 'Las órdenes tampoco.' },
      { q: '«5 + 3 = 9». ¿Es proposición?', mode: 'sel', opts: ['Sí', 'No'], ans: 'Sí', hint: 'Se puede revisar con una cuenta y decir si está bien o mal.', ok: 'Sí es proposición.' },
      { q: 'Haz la cuenta: 5 + 3 = ?  Entonces la frase «5 + 3 = 9» es…', mode: 'sel', opts: ['Verdadera', 'Falsa'], ans: 'Falsa', hint: '5 + 3 da 8, no 9.', ok: '¡Falsa! Ya sabes clasificar frases.' },
    ], 'Contesta cada pregunta. Aparece una nueva cuando aciertas.', 'Con ayuda: proposiciones'),

    match('Ahora tú solo', 'Clasifica cada frase', [
      ['México está en América del Norte', 'Proposición verdadera', 'Es un hecho que se puede revisar: V.'],
      ['5 + 3 = 9', 'Proposición falsa', 'La cuenta da 8, así que es falsa.'],
      ['¿Ya hiciste la tarea?', 'No es proposición', 'Es una pregunta.'],
      ['Los gatos son aves', 'Proposición falsa', 'Los gatos no son aves.'],
      ['Guarda silencio, por favor', 'No es proposición', 'Es una orden.'],
      ['x − 3 = 10', 'No es proposición', 'Depende del valor de x.'],
    ], ['Proposición verdadera', 'Proposición falsa', 'No es proposición'], 'Tú solo: proposiciones'),

    lesson('Usamos letras para ir más rápido', 'En vez de escribir toda la frase, usamos una letra', [
      words([['Símbolo', 'una letra o dibujito que representa algo'], ['p, q, r', 'letras que usamos para nombrar frases']]),
      def('Letras para frases', 'En lugar de escribir la frase completa, le ponemos una letra: **p**, **q**, **r**…'),
      vis([['p', '=', '«Hoy llueve ☔»'], ['q', '=', '«Llevo paraguas 🌂»']], 'Así, «p y q» significa «Hoy llueve y llevo paraguas».'),
      alt('Es igual que cuando en tu celular guardas un contacto como «Mamá»: no escribes todo el número cada vez, usas un nombre corto.', '🤔 ¿Para qué sirve?'),
    ], 'p y q son solo nombres cortos para frases.', 'Letras p y q'),

    lesson('La negación: «NO»', 'El conectivo que voltea todo', [
      words([['Conectivo', 'una palabra que une frases o las cambia: «no», «y», «o», «si… entonces»'], ['Negación', 'poner «NO» a una frase. Se escribe ¬p y se lee «no p»']]),
      def('Negación (¬p)', 'Voltea el valor: lo **verdadero** se vuelve **falso** y lo **falso** se vuelve **verdadero**.'),
      vis([['💡 prendida', 'NO', '🌑 apagada'], ['🌑 apagada', 'NO', '💡 prendida']], 'Como un apagador: el NO cambia lo que había.'),
      tbl(['p', '¬p (no p)'], [['✅ V', '❌ F'], ['❌ F', '✅ V']]),
      ex('p = «Hoy llueve» ➜ ¬p = «Hoy **no** llueve».'),
    ], 'El NO siempre voltea: V se vuelve F y F se vuelve V.', 'La negación'),

    guia('Practica con ayuda', 'La negación (NO)', [
      { q: 'Si p es ✅ V, ¿cuánto vale ¬p (no p)?', mode: 'sel', opts: ['V', 'F'], ans: 'F', hint: 'El NO voltea. Si era V, ahora es…', ok: 'V se vuelve F.' },
      { q: 'Si p es ❌ F, ¿cuánto vale ¬p?', mode: 'sel', opts: ['V', 'F'], ans: 'V', hint: 'El NO voltea. Si era F, ahora es…', ok: 'F se vuelve V.' },
      { q: 'p = «Hoy llueve». ¿Cuál frase es ¬p?', mode: 'sel', opts: ['Hoy llueve mucho', 'Hoy no llueve'], ans: 'Hoy no llueve', hint: '¬p es poner un «no» a la frase.', ok: 'Eso es: «Hoy no llueve».' },
      { q: 'p = «3 es mayor que 5» (y eso es FALSO). ¿Cuánto vale ¬p?', mode: 'sel', opts: ['V', 'F'], ans: 'V', hint: 'p es F. Entonces ¬p, que voltea, es…', ok: '¡Bien! Negar algo falso da algo verdadero.' },
    ], 'Contesta cada pregunta; si te trabas, toca 💡 PISTA.', 'Con ayuda: negación'),

    lesson('La conjunción: «Y» (∧)', 'Las dos tienen que cumplirse', [
      words([['Conjunción', 'unir dos frases con «y». Se escribe p ∧ q'], ['Cumplirse', 'que sea verdadero ✅']]),
      def('Conjunción (p ∧ q)', 'Dos frases unidas con **«y»**. Solo es verdadera si **las dos** son verdaderas.'),
      ana('Pides **un taco Y un refresco** 🌮🥤. Si te dan los dos, ✅ cumplieron. Si falta **uno**, ❌ ya no cumplieron.'),
      vis([['✅', 'Y', '✅', '=', '✅'], ['✅', 'Y', '❌', '=', '❌'], ['❌', 'Y', '✅', '=', '❌'], ['❌', 'Y', '❌', '=', '❌']], '✅ = verdadero · ❌ = falso. Solo gana cuando las dos son ✅.'),
      tbl(['p', 'q', 'p ∧ q (p y q)'], [['V', 'V', '✅ V'], ['V', 'F', '❌ F'], ['F', 'V', '❌ F'], ['F', 'F', '❌ F']]),
      img('assets/lessons/1-1-venn.svg', 'Dibujo de «y» (zona de en medio) y «o» (todo lo pintado)'),
    ], 'Con «Y», si falta una, ya no se cumple.', 'La «Y»'),

    guia('Practica con ayuda', 'La conjunción (Y)', [
      { q: 'Dices: «Tengo hambre Y tengo dinero». Tienes hambre ✅ y tienes dinero ✅. ¿La frase completa es V o F?', mode: 'sel', opts: ['V', 'F'], ans: 'V', hint: 'Las dos son verdaderas. Con «Y» eso basta.', ok: 'Las dos ✅ → ✅.' },
      { q: 'Tienes hambre ✅ pero NO tienes dinero ❌. ¿«Tengo hambre Y tengo dinero» es V o F?', mode: 'sel', opts: ['V', 'F'], ans: 'F', hint: 'Con «Y» si falta una, ya no se cumple.', ok: 'Falta una → ❌.' },
      { q: 'No tienes hambre ❌ y no tienes dinero ❌. ¿La frase con «Y» es V o F?', mode: 'sel', opts: ['V', 'F'], ans: 'F', hint: 'Con «Y» necesitas las DOS ✅.', ok: 'Las dos ❌ → ❌.' },
      { q: 'Si p = V y q = F, ¿cuánto vale p ∧ q?', mode: 'sel', opts: ['V', 'F'], ans: 'F', hint: 'Una de las dos es F.', ok: 'Con una F, el «Y» da F.' },
    ], 'Piensa en el taco y el refresco 🌮🥤.', 'Con ayuda: la «Y»'),

    lesson('La disyunción: «O» (∨)', 'Con que se cumpla una, ya ganaste', [
      words([['Disyunción', 'unir dos frases con «o». Se escribe p ∨ q'], ['Al menos una', 'una o las dos']]),
      def('Disyunción (p ∨ q)', 'Dos frases unidas con **«o»**. Es verdadera si **al menos una** es verdadera. Solo es falsa si **las dos** son falsas.'),
      ana('Para pagar puedes usar **efectivo 💵 O tarjeta 💳**. Si traes una, pagas. Si traes las dos, también. Solo no pagas si **no traes ninguna**.'),
      vis([['✅', 'O', '✅', '=', '✅'], ['✅', 'O', '❌', '=', '✅'], ['❌', 'O', '✅', '=', '✅'], ['❌', 'O', '❌', '=', '❌']], 'Solo pierde cuando las dos son ❌.'),
      tbl(['p', 'q', 'p ∨ q (p o q)'], [['V', 'V', '✅ V'], ['V', 'F', '✅ V'], ['F', 'V', '✅ V'], ['F', 'F', '❌ F']]),
      warn('En matemáticas «o» **también vale si pasan las dos**. En la calle a veces «o» significa «una u otra, pero no las dos»; aquí no.'),
    ], 'Con «O», solo pierdes si las dos son falsas.', 'La «O»'),

    guia('Practica con ayuda', 'La disyunción (O)', [
      { q: 'Dices: «Traigo efectivo O traigo tarjeta». Traes efectivo ✅ y NO traes tarjeta ❌. ¿La frase es V o F?', mode: 'sel', opts: ['V', 'F'], ans: 'V', hint: 'Con «O» basta con que una sea ✅.', ok: 'Con una ✅ ya es ✅.' },
      { q: 'No traes efectivo ❌ ni tarjeta ❌. ¿La frase «efectivo O tarjeta» es V o F?', mode: 'sel', opts: ['V', 'F'], ans: 'F', hint: 'Si no traes ninguna, no puedes pagar.', ok: 'Las dos ❌ → ❌.' },
      { q: 'Si p = F y q = V, ¿cuánto vale p ∨ q?', mode: 'sel', opts: ['V', 'F'], ans: 'V', hint: 'Una de las dos es V; con «O» alcanza.', ok: 'Una V es suficiente.' },
      { q: 'Si p = V y q = V, ¿cuánto vale p ∨ q?', mode: 'sel', opts: ['V', 'F'], ans: 'V', hint: 'En matemáticas, «O» también vale si pasan las dos.', ok: '¡Sí! Las dos juntas también cuentan.' },
    ], 'Con la «O» es más fácil ganar que con la «Y».', 'Con ayuda: la «O»'),

    match('Traduce a símbolos', 'Sea p = «Estudio» y q = «Apruebo». Une cada frase con su símbolo', [
      ['Estudio y apruebo', 'p ∧ q', 'La «y» se escribe ∧.'], ['Estudio o apruebo', 'p ∨ q', 'La «o» se escribe ∨.'], ['No estudio', '¬p', 'El «no» se escribe ¬.'], ['No apruebo', '¬q', '«no» + q.'], ['Estudio y no apruebo', 'p ∧ ¬q', '«y» y además «no» delante de q.'], ['No estudio o apruebo', '¬p ∨ q', '«no» delante de p, luego «o».'],
    ], ['p ∧ q', 'p ∨ q', '¬p', '¬q', 'p ∧ ¬q', '¬p ∨ q'], 'Tú solo: traducir'),

    lesson('El condicional: «Si… entonces» (→)', 'Una promesa', [
      words([['Condicional', 'una frase del tipo «si pasa esto, entonces pasa lo otro». Se escribe p → q'], ['Hipótesis', 'la parte del «si» (p)'], ['Conclusión', 'la parte del «entonces» (q)']]),
      def('Condicional (p → q)', 'Es una **promesa**: «**si** p, **entonces** q». Solo es **falsa** en un caso: cuando se cumple el «si» (p = V) pero **no** se cumple el «entonces» (q = F).'),
      ana('Tu mamá dice: **«Si sacas 10, entonces te compro un helado»** 🍦. ¿Cuándo te **mintió**? Solo si sacaste 10 ✅ y **no** hubo helado ❌. Si no sacaste 10, no rompió su promesa: haya helado o no.', 'La promesa del helado'),
      tbl(['¿Sacaste 10? (p)', '¿Hubo helado? (q)', '¿Cumplió la promesa? (p → q)'], [['✅ Sí', '✅ Sí', '✅ V (cumplió)'], ['✅ Sí', '❌ No', '❌ F (¡mintió!)'], ['❌ No', '✅ Sí', '✅ V (regalo extra)'], ['❌ No', '❌ No', '✅ V (no aplicaba)']]),
      alt('Memoriza **un solo caso**: p → q es **falso únicamente** en V → F («me lo prometieron y no me lo dieron»). En los otros tres casos es verdadero.', '🤔 ¿Cómo lo memorizo?'),
    ], 'p → q solo es falso cuando p es V y q es F.', 'El «Si… entonces»'),

    guia('Practica con ayuda', 'El condicional (la promesa del helado)', [
      { q: 'Promesa: «Si sacas 10, te compro un helado». Sacaste 10 ✅ y te lo compraron ✅. ¿La promesa es V (cumplida) o F (rota)?', mode: 'sel', opts: ['V', 'F'], ans: 'V', hint: 'Prometió helado y hubo helado.', ok: 'Cumplió.' },
      { q: 'Sacaste 10 ✅ y NO te compraron helado ❌. ¿Promesa V o F?', mode: 'sel', opts: ['V', 'F'], ans: 'F', hint: 'Prometió algo y no lo cumplió.', ok: 'Promesa rota → F. Es el único caso en que falla.' },
      { q: 'NO sacaste 10 ❌ y te compraron helado ✅. ¿Promesa V o F?', mode: 'sel', opts: ['V', 'F'], ans: 'V', hint: 'No sacaste 10, así que la promesa no aplicaba. Nadie mintió.', ok: 'No mintió: V.' },
      { q: 'NO sacaste 10 ❌ y NO hubo helado ❌. ¿Promesa V o F?', mode: 'sel', opts: ['V', 'F'], ans: 'V', hint: 'La promesa solo se rompe en un caso, y este no es.', ok: 'Tampoco mintió: V.' },
      { q: 'Si p = V y q = F, ¿cuánto vale p → q?', mode: 'sel', opts: ['V', 'F'], ans: 'F', hint: 'Es el caso de la promesa rota (V → F).', ok: '¡Ya lo dominas!' },
    ], 'Recuerda: la promesa solo se rompe en UN caso.', 'Con ayuda: condicional'),

    lesson('El bicondicional: «si y solo si» (↔)', 'Las dos van juntas', [
      words([['Bicondicional', 'dos frases que van siempre juntas: las dos ciertas o las dos falsas. Se escribe p ↔ q'], ['Si y solo si', 'pasa una exactamente cuando pasa la otra']]),
      def('Bicondicional (p ↔ q)', 'Es verdadero cuando **p y q valen lo mismo**: las dos ✅ o las dos ❌.'),
      ana('**Sales al recreo si y solo si suena el timbre** 🔔. Si suena, sales. Si **no** suena, **no** sales. Siempre van juntos.'),
      tbl(['p', 'q', 'p ↔ q'], [['V', 'V', '✅ V (iguales)'], ['V', 'F', '❌ F (distintos)'], ['F', 'V', '❌ F (distintos)'], ['F', 'F', '✅ V (iguales)']]),
      warn('«Si p entonces q» **no** es lo mismo que «si q entonces p». El orden importa.'),
    ], '↔ es V cuando los dos valen lo mismo.', 'El «si y solo si»'),

    mc('Repaso rápido', 'Elige la respuesta (te digo al instante si acertaste)', [
      ['¿Cuándo es verdadera «p y q»?', ['Cuando alguna es V', 'Cuando las dos son V', 'Cuando las dos son F'], 1, 'La «y» exige las dos verdaderas.'],
      ['¿Cuándo es falsa «p o q»?', ['Cuando las dos son F', 'Cuando una es F', 'Cuando las dos son V'], 0, 'La «o» solo falla si las dos son falsas.'],
      ['¿Cuándo es falsa «si p entonces q»?', ['Cuando p es F y q es V', 'Cuando p es V y q es F', 'Cuando las dos son F'], 1, 'La promesa rota: p es V y q es F.'],
      ['Si p = V, ¿cuánto vale «no p»?', ['V', 'F', 'No se sabe'], 1, 'El NO voltea: de V pasa a F.'],
    ], 'Repaso'),

    lesson('¿Qué es una tabla de verdad?', 'Una lista con todos los casos posibles', [
      words([['Tabla de verdad', 'una tabla que muestra qué pasa en TODOS los casos posibles'], ['Fila', 'una línea de la tabla. Cada fila es un caso']]),
      def('Tabla de verdad', 'Una tabla que dice **si una frase es V o F en cada caso posible**.'),
      vis([['VV', 'VF', 'FV', 'FF']], 'Con 2 frases (p y q) hay 4 casos: las dos V, V y F, F y V, las dos F.'),
      ana('Es como un **menú**: antes de pedir revisas **todas** las combinaciones posibles (tacos con refresco, tacos sin refresco, etc.). La tabla revisa todas las combinaciones de V y F.', '🌮 Piénsalo así'),
      tiles([['2 frases', '4 filas', 'p y q'], ['3 frases', '8 filas', 'p, q y r'], ['n frases', '2ⁿ filas', 'se duplica cada vez']]),
    ], 'Con 2 frases: 4 filas. Con 3 frases: 8 filas.', 'Qué es una tabla'),

    tt('Completa las tablas de verdad', 'Conjunción, disyunción y negación', ['p', 'q'], [{ h: 'p ∧ q', f: 'p && q' }, { h: 'p ∨ q', f: 'p || q' }, { h: '¬p', f: '!p' }], 'Acuérdate: «Y» solo es V si las dos son V · «O» solo es F si las dos son F · «NO» voltea.', 'Tú solo: tablas básicas'),

    lesson('Cómo armar una tabla paso a paso', 'Sin perderte', [
      it('1. Letras', 'Ponle letra a cada frase simple (p, q, r…).'),
      it('2. Filas', 'Cuenta los casos: 2 letras → 4 filas · 3 letras → 8 filas.'),
      it('3. Combinaciones', 'Escribe todas las combinaciones de V y F.'),
      it('4. Columnas', 'Resuelve **una columna a la vez**: primero los «no» y los paréntesis; al final, el conectivo principal.'),
      steps('Ejemplo: tabla de ¬p ∨ q', ['Hay 2 letras → **4 filas**: VV, VF, FV, FF.', 'Columna ¬p: voltea p → **F, F, V, V**.', 'Columna ¬p ∨ q: con «o», es V si alguna de las dos es V.', 'Fila VV: F o V → **V** · Fila VF: F o F → **F** · Fila FV: V o V → **V** · Fila FF: V o F → **V**.', 'Resultado: **V, F, V, V**. ¡Es la misma tabla que p → q! Son frases «equivalentes».']),
    ], 'Una columna a la vez: de lo más chiquito a lo más grande.', 'Armar una tabla'),

    guia('Arma una tabla conmigo', 'Vamos fila por fila con ¬p ∨ q', [
      { q: '**Fila 1:** p = V, q = V. Primero ¬p. ¿Cuánto vale ¬p?', mode: 'sel', opts: ['V', 'F'], ans: 'F', hint: 'p es V, el NO lo voltea.', ok: '¬p = F.' },
      { q: 'Ahora ¬p ∨ q con ¬p = F y q = V. ¿V o F?', mode: 'sel', opts: ['V', 'F'], ans: 'V', hint: 'Con «o» basta con que una sea V.', ok: 'Fila 1: V.' },
      { q: '**Fila 2:** p = V, q = F. ¬p vale F. ¿Cuánto vale ¬p ∨ q (F o F)?', mode: 'sel', opts: ['V', 'F'], ans: 'F', hint: 'Con «o», si las dos son F, el resultado es F.', ok: 'Fila 2: F.' },
      { q: '**Fila 3:** p = F, q = V. ¬p vale V. ¿Cuánto vale ¬p ∨ q (V o V)?', mode: 'sel', opts: ['V', 'F'], ans: 'V', hint: 'Hay al menos una V.', ok: 'Fila 3: V.' },
      { q: '**Fila 4:** p = F, q = F. ¬p vale V. ¿Cuánto vale ¬p ∨ q (V o F)?', mode: 'sel', opts: ['V', 'F'], ans: 'V', hint: 'Hay una V, con «o» alcanza.', ok: 'Fila 4: V. El resultado final es V, F, V, V.' },
    ], 'Hacemos una fila a la vez.', 'Con ayuda: tabla completa'),

    order('Ordena los pasos', 'Pon en orden cómo se arma una tabla de verdad', [
      ['Ponerle letra a cada frase simple'], ['Contar cuántas filas habrá'], ['Escribir las combinaciones de V y F'], ['Resolver los «no» y los paréntesis'], ['Resolver el conectivo principal y leer el resultado'],
    ], 'Tú solo: ordenar pasos'),

    tt('Tabla de ¬p ∨ q y p → q', 'Llena las tres columnas y compara las dos últimas', ['p', 'q'], [{ h: '¬p', f: '!p' }, { h: '¬p ∨ q', f: '!p || q' }, { h: 'p → q', f: '!p || q' }], '¿Notas algo en las dos últimas columnas? (Pista: son iguales.)', 'Tú solo: equivalencia'),

    lesson('Tres tipos de frases compuestas', 'Siempre V, siempre F, o a veces', [
      words([['Tautología', 'una frase que siempre es verdadera, pase lo que pase'], ['Contradicción', 'una frase que siempre es falsa'], ['Contingencia', 'una frase que a veces es V y a veces es F']]),
      tiles([['🟢', 'Tautología', 'Siempre verdadera'], ['🔴', 'Contradicción', 'Siempre falsa'], ['🟡', 'Contingencia', 'A veces V, a veces F']]),
      ex('**Llueve o no llueve** (p ∨ ¬p): siempre es verdad, no hay otra opción. → **Tautología**.'),
      ex('**Llueve y no llueve** (p ∧ ¬p): imposible a la vez. → **Contradicción**.'),
      ex('**Llueve y llevo paraguas** (p ∧ q): depende. → **Contingencia**.'),
      alt('Para saberlo, arma la tabla y mira la última columna: si son **todas V**, tautología; **todas F**, contradicción; **mezcladas**, contingencia.', '🤔 ¿Cómo se sabe?'),
    ], 'Revisa toda la columna final de la tabla.', 'Tautología y contradicción'),

    match('Clasifica', '¿Tautología, contradicción o contingencia?', [
      ['p ∨ ¬p  (llueve o no llueve)', 'Tautología'], ['p ∧ ¬p  (llueve y no llueve)', 'Contradicción'], ['p ∧ q  (llueve y llevo paraguas)', 'Contingencia'], ['p → p  (si llueve, entonces llueve)', 'Tautología'], ['p ↔ ¬p', 'Contradicción'], ['p ∨ q', 'Contingencia'],
    ], ['Tautología', 'Contradicción', 'Contingencia'], 'Tú solo: clasificar'),

    gen('Calcula valores (fácil)', 'Sustituye y resuelve. «Otros ejercicios» te da nuevos', 'logicaFacil', 6, 'Práctica fácil: valores'),
    gen('Reto: calcula valores (más difícil)', 'Ahora con frases más largas', 'logica', 5, 'Reto: valores'),
    gen('¿Cuántas filas?', 'Cuenta casos y clasifica', 'filas', 4, 'Práctica: filas'),

    write('Tu propio razonamiento', 'Escribe una promesa sobre un derecho humano', 'Escribe una frase con **«si… entonces…»** sobre educación, salud o igualdad, y explica **en qué caso sería falsa** (cuándo se rompe la promesa).', [['Usa «si… entonces…»', 'si.*entonces'], ['Habla de un derecho (educación, salud, igualdad…)', 'educacion|salud|igualdad|derecho|agua|vivienda|trabajo'], ['Explica cuándo sería falsa', 'falsa|falso|no se cumple|miente|equivocad|se rompe']], 3, 'Ejemplo: «Si una persona va a la escuela, entonces tiene derecho a estudiar». Sería falsa si va a la escuela y no la dejan estudiar.', 'Tú solo: razonar'),

    lesson('Resumen del módulo', 'Lo más importante en una hoja', [
      tbl(['Conectivo', 'Se escribe', 'Es ✅ V cuando…'], [['NO (negación)', '¬p', 'p es F'], ['Y (conjunción)', 'p ∧ q', 'las dos son V'], ['O (disyunción)', 'p ∨ q', 'al menos una es V'], ['Si… entonces', 'p → q', 'no pasa «V → F»'], ['Si y solo si', 'p ↔ q', 'las dos valen lo mismo']]),
      md('- Con **2 frases** hay **4 filas**; con **3**, **8 filas**.\n- **Tautología:** siempre V · **Contradicción:** siempre F · **Contingencia:** a veces V, a veces F.\n- **p → q** es lo mismo que **¬p ∨ q**.'),
    ], 'Ya puedes hacer tu práctica final.', 'Resumen'),

    practica({
      t: 'Tablas de verdad y derechos humanos', sub: 'Tu evidencia: vale el 15 % del curso',
      intro: 'En equipo van a analizar un **debate sobre derechos humanos** con tablas de verdad y a tomar una decisión usando lo que muestran las tablas.',
      mat: 'Cuaderno u hojas, regla y lápiz de colores (puede hacerse a mano) o un documento en el celular.',
      ejemplo: '**Derecho:** educación 🎓.<br>**p** = «Hay becas disponibles» · **q** = «Las familias conocen las becas».<br>**Frase compuesta:** «p ∧ q» (hay becas **y** las conocen).<br>**Tabla:** solo es V en la fila VV. **Conclusión:** para garantizar la educación no basta con que existan becas: también hay que **informar** a las familias.',
      steps: ['Formen un equipo de 3 o 4 y **elijan un derecho** (educación, salud, igualdad, medio ambiente sano, no discriminación…).',
        'Escriban **4 frases simples** sobre ese derecho y ponles letra: p, q, r, s. (Mira el ejemplo de arriba.)',
        'Armen **3 frases compuestas**: una con «y» (∧) o «o» (∨), una con «si… entonces» (→) y una con «no» (¬) o «si y solo si» (↔).',
        'Hagan la **tabla de verdad completa** de cada una (todas las filas).',
        '**Analicen:** ¿en qué filas se cumple el derecho? ¿qué falta en las filas donde no?',
        'Escriban una **conclusión** de 5 a 8 renglones: ¿qué propondrían, según lo que mostraron las tablas?'],
      deliver: 'Una foto o PDF legible con: las frases (con letras y en palabras), las tablas y la conclusión.',
      rubric: [['Frases', 'Claras y bien clasificadas', 'Algunas confusas', 'No son proposiciones'], ['Tablas de verdad', 'Completas y correctas', 'Pequeños errores', 'Incompletas'], ['Análisis', 'Relaciona la tabla con el derecho', 'Solo describe', 'Sin análisis'], ['Conclusión', 'Apoyada en las tablas', 'Poco sustentada', 'No hay']],
    }),
  ],
};
