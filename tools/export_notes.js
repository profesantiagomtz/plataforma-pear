// Regenera los textos «Apuntes» y «Ejemplos resueltos» de cada propósito a partir de los módulos interactivos.
// Se ejecuta desde la consola de la plataforma con sesión de docente:  (await import('/tools/export_notes.js')).rebuildNotes()
import { sb } from '../js/ui.js';

const clean = (s) => String(s ?? '').replace(/<br\s*\/?>/g, '  \n').replace(/<sup>(.*?)<\/sup>/g, '^$1').replace(/<[^>]+>/g, '').trim();
const line = (h, p) => `> **${clean(h)}** ${clean(p)}`;

function blockMd(b) {
  switch (b.k) {
    case 'words': return `**📖 Palabras nuevas**\n\n${b.items.map(([t, d]) => `- **${clean(t)}**: ${clean(d)}`).join('\n')}`;
    case 'def': return line(`${b.h}:`, b.p);
    case 'ex': return line(`${b.h || 'Ejemplo'}:`, b.p);
    case 'ana': return line(`${b.h || 'Piénsalo así'}:`, b.p);
    case 'warn': return line(`⚠️ ${b.h || 'Ojo'}:`, b.p);
    case 'alt': return line(b.h && /^🤔/.test(b.h) ? b.h : `🤔 ${b.h || '¿No lo entendiste?'}`, b.p);
    case 'it': return `- **${clean(b.h)}:** ${clean(b.p)}`;
    case 'p': return clean(b.s);
    case 'md': return b.s;
    case 'tbl': return `| ${b.head.map(clean).join(' | ')} |\n|${b.head.map(() => '---').join('|')}|\n${b.rows.map((r) => `| ${r.map(clean).join(' | ')} |`).join('\n')}`;
    case 'tiles': return b.items.map(([e, t, d]) => `- ${e} **${clean(t)}**${d ? ' — ' + clean(d) : ''}`).join('\n');
    case 'vis': return b.rows.map((r) => `**${r.map(clean).join('  ')}**`).join('  \n') + (b.cap ? `\n\n${clean(b.cap)}` : '');
    case 'steps': return `**${clean(b.t)}**\n\n${b.steps.map((s, i) => `${i + 1}. ${clean(s)}`).join('\n')}`;
    case 'img': return `![${b.alt || ''}](${b.src})`;
    case 'ill': return b.kind === 'flow' ? b.items.map(([e, t]) => `${e} ${clean(String(t).replace(/\|/g, ' '))}`).join('  ➜  ') : '';
    default: return '';
  }
}

export async function rebuildNotes() {
  const report = [];
  for (let n = 1; n <= 7; n++) {
    const mod = (await import(`../content/m1-${n}.js?` + Date.now())).default; const code = `1.${n}`;
    const lessons = mod.pages.filter((p) => p.type === 'lesson' && !/Resumen/.test(p.t));
    const apuntes = [`# Apuntes del propósito ${code}: ${mod.title}`, `> Si hay una palabra que no entiendes, búscala en **📖 Palabras nuevas** de cada tema. Para practicar con ayuda, abre el **módulo interactivo**.`]
      .concat(lessons.map((p) => `## ${clean(p.t)}\n*${clean(p.sub || '')}*\n\n${p.blocks.map(blockMd).filter(Boolean).join('\n\n')}${p.take ? `\n\n> 👉 **Recuerda:** ${clean(p.take)}` : ''}`)).join('\n\n---\n\n');
    const ejem = [`# Ejemplos resueltos del propósito ${code}: ${mod.title}`, `> Mira cómo se hace paso a paso. Después practica en el **módulo interactivo**.`]
      .concat(lessons.map((p) => { const bl = p.blocks.filter((b) => b.k === 'steps' || b.k === 'ex'); return bl.length ? `## ${clean(p.t)}\n\n${bl.map(blockMd).join('\n\n')}` : ''; }).filter(Boolean)).join('\n\n');
    for (const [pattern, body] of [[`${code} · Apuntes`, apuntes], [`${code} · Ejemplos resueltos`, ejem]]) {
      const { data, error } = await sb.from('materials').update({ body, description: pattern.endsWith('Apuntes') ? 'Explicado en fácil, con palabras nuevas, ejemplos y trucos' : 'Paso a paso, para que veas cómo se hace' }).eq('title', pattern).select('id');
      report.push(`${pattern}: ${error ? 'ERROR ' + error.message : data.length + ' actualizado(s), ' + body.length + ' caracteres'}`);
    }
  }
  return report;
}
