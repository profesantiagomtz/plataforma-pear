# Genera los gráficos de assets/lessons/ (python tools/make_svgs.py)
import os
OUT = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "assets", "lessons")
os.makedirs(OUT, exist_ok=True)
F = 'font-family="system-ui,Segoe UI,Arial,sans-serif"'
INK, BR, SOFT, OK, WARN, MUT, PINK = "#1b1d2a", "#4f46e5", "#eceafd", "#0f9d58", "#d97706", "#6a6f85", "#db2777"


def svg(name, w, h, body):
    s = f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {w} {h}" role="img"><rect width="{w}" height="{h}" fill="#ffffff"/>{body}</svg>'
    open(os.path.join(OUT, name), "w", encoding="utf-8").write(s)


def t(x, y, s, size=14, fill=INK, anchor="middle", weight="400"):
    return f'<text x="{x}" y="{y}" {F} font-size="{size}" fill="{fill}" text-anchor="{anchor}" font-weight="{weight}">{s}</text>'


# 1.1 Venn: conjunción y disyunción
b = ""
for ox, title, mode in ((0, "Conjunción: p y q  (p ∧ q)", "and"), (380, "Disyunción: p o q  (p ∨ q)", "or")):
    cid = f"c{ox}"
    b += f'<clipPath id="{cid}"><circle cx="{ox+120}" cy="130" r="70"/></clipPath>'
    if mode == "or":
        b += f'<circle cx="{ox+120}" cy="130" r="70" fill="{BR}" fill-opacity=".35"/><circle cx="{ox+200}" cy="130" r="70" fill="{BR}" fill-opacity=".35"/>'
    else:
        b += f'<circle cx="{ox+200}" cy="130" r="70" fill="{BR}" fill-opacity=".35" clip-path="url(#{cid})"/>'
    b += f'<circle cx="{ox+120}" cy="130" r="70" fill="none" stroke="{BR}" stroke-width="2.5"/><circle cx="{ox+200}" cy="130" r="70" fill="none" stroke="{BR}" stroke-width="2.5"/>'
    b += t(ox + 90, 135, "p", 20, weight="700") + t(ox + 230, 135, "q", 20, weight="700") + t(ox + 160, 40, title, 15, weight="700")
    b += t(ox + 160, 235, "Verdadera cuando " + ("ambas son verdaderas" if mode == "and" else "al menos una es verdadera"), 12.5, MUT)
svg("1-1-venn.svg", 740, 255, b)

# 1.2 línea del tiempo
ev = [("≈3000 a.C.", "Egipto", "Jeroglíficos,|sistema decimal"), ("≈2000 a.C.", "Mesopotamia", "Base 60|(horas y minutos)"),
      ("≈siglo I a.C.", "Olmecas y mayas", "Base 20 y|uso del cero"), ("siglo VII d.C.", "India", "Cero y sistema|posicional"),
      ("siglo IX d.C.", "Arabia", "Al-Juarismi difunde|las cifras"), ("1202", "Leonardo de Pisa", "«Liber Abaci»:|llega a Europa")]
b = f'<line x1="40" y1="110" x2="760" y2="110" stroke="{BR}" stroke-width="4"/>'
for i, (d, p, x) in enumerate(ev):
    cx = 70 + i * 132
    b += f'<circle cx="{cx}" cy="110" r="9" fill="{BR}"/>' + t(cx, 82, d, 12.5, BR, weight="700") + t(cx, 142, p, 13.5, weight="700")
    for j, l in enumerate(x.split("|")):
        b += t(cx, 162 + j * 16, l, 12, MUT)
svg("1-2-linea-tiempo.svg", 800, 200, b)

# 1.2 ábaco mostrando 1 203
b = '<rect x="30" y="20" width="320" height="200" rx="10" fill="#f3e8d8" stroke="#8a5a2b" stroke-width="4"/>'
val = [1, 2, 0, 3]
lab = ["Millares", "Centenas", "Decenas", "Unidades"]
for r in range(4):
    x = 75 + r * 77
    b += f'<line x1="{x}" y1="28" x2="{x}" y2="212" stroke="#8a5a2b" stroke-width="4"/>'
    for k in range(9):
        active = k < val[r]
        y = 42 + k * 20 + (0 if active else 16)
        b += f'<ellipse cx="{x}" cy="{y}" rx="16" ry="8" fill="{BR if active else "#d1d5db"}" stroke="#374151" stroke-width="1"/>'
    b += t(x, 240, lab[r], 11.5, MUT) + t(x, 258, str(val[r]), 16, BR, weight="700")
b += t(190, 285, "Se lee: 1 203", 14, weight="700")
svg("1-2-abaco.svg", 380, 300, b)

# 1.3 conjuntos numéricos anidados
b = ""
for cx, cy, rx, ry, c in [(300, 170, 270, 150, "#e0f2fe"), (300, 185, 215, 118, "#dcfce7"), (300, 200, 160, 86, "#fef9c3"), (300, 212, 105, 52, "#fee2e2")]:
    b += f'<ellipse cx="{cx}" cy="{cy}" rx="{rx}" ry="{ry}" fill="{c}" stroke="{MUT}" stroke-width="1.5"/>'
b += t(300, 40, "ℝ  Reales  (incluye irracionales: √2, π)", 13, weight="700")
b += t(300, 76, "ℚ  Racionales:  1/2,  0.75,  −3/4", 13, weight="700")
b += t(300, 128, "ℤ  Enteros:  −3, −1, 0", 13, weight="700")
b += t(300, 196, "ℕ  Naturales", 13, weight="700") + t(300, 214, "1, 2, 3, …", 13, MUT)
svg("1-3-conjuntos.svg", 600, 330, b)

# 1.3 árbol de factores de 360
P = {"360": (250, 40), "36": (160, 110), "10": (340, 110), "4": (100, 180), "9": (220, 180), "2a": (300, 180), "5": (380, 180),
     "2b": (70, 250), "2c": (130, 250), "3a": (190, 250), "3b": (250, 250)}
leaves = {"2a", "5", "2b", "2c", "3a", "3b"}
b = ""
for a, c in [("360", "36"), ("360", "10"), ("36", "4"), ("36", "9"), ("10", "2a"), ("10", "5"), ("4", "2b"), ("4", "2c"), ("9", "3a"), ("9", "3b")]:
    b += f'<line x1="{P[a][0]}" y1="{P[a][1]+19}" x2="{P[c][0]}" y2="{P[c][1]-19}" stroke="{MUT}" stroke-width="1.5"/>'
for k, (x, y) in P.items():
    lf = k in leaves
    b += f'<circle cx="{x}" cy="{y}" r="19" fill="{"#dcfce7" if lf else SOFT}" stroke="{OK if lf else BR}" stroke-width="2"/>' + t(x, y + 5, k.rstrip("abc"), 14, weight="700")
b += t(250, 300, "360 = 2 × 2 × 2 × 3 × 3 × 5 = 2³ × 3² × 5", 14, weight="700")
svg("1-3-arbol-factores.svg", 500, 320, b)


# 1.4 fracciones equivalentes y porcentaje
def bar(y, n, k, label, col=BR):
    w, s = 360, ""
    for i in range(n):
        s += f'<rect x="{110+i*w/n}" y="{y}" width="{w/n}" height="30" fill="{col if i<k else "#ffffff"}" fill-opacity="{.55 if i<k else 1}" stroke="{INK}" stroke-width="1.5"/>'
    return s + t(95, y + 20, label, 15, anchor="end", weight="700")


b = t(290, 28, "Fracciones equivalentes: la misma parte del entero", 15, weight="700")
b += bar(45, 2, 1, "1/2") + bar(85, 4, 2, "2/4") + bar(125, 8, 4, "4/8") + bar(165, 3, 1, "1/3", WARN) + bar(205, 6, 2, "2/6", WARN)
b += t(290, 262, "Porcentaje: el entero dividido en 100 partes", 15, weight="700")
b += f'<rect x="110" y="275" width="360" height="30" fill="#fff" stroke="{INK}" stroke-width="1.5"/><rect x="110" y="275" width="270" height="30" fill="{OK}" fill-opacity=".55" stroke="{INK}" stroke-width="1.5"/>'
for p in (0, 25, 50, 75, 100):
    b += t(110 + p * 3.6, 322, f"{p} %", 12, MUT)
b += t(290, 345, "75 % = 75/100 = 3/4 = 0.75", 14, weight="700")
svg("1-4-fracciones.svg", 580, 360, b)

# 1.5 potencias
b = t(150, 34, "Partes de una potencia", 15, weight="700")
b += t(105, 125, "2", 70, BR, weight="700") + t(150, 78, "5", 38, WARN, weight="700") + t(225, 125, "= 32", 46, weight="700")
b += t(105, 160, "base", 14, BR, weight="700") + t(165, 160, "exponente", 13, WARN, weight="700") + t(250, 160, "potencia", 14, weight="700")
b += t(150, 205, "2⁵ = 2 × 2 × 2 × 2 × 2", 15)
b += t(480, 34, "Elevar al cuadrado = área de un cuadrado", 15, weight="700")
for n, ox in zip((1, 2, 3, 4), (340, 390, 460, 560)):
    s, oy = 22, 190 - n * 22
    for i in range(n):
        for j in range(n):
            b += f'<rect x="{ox+i*s}" y="{oy+j*s}" width="{s}" height="{s}" fill="{BR}" fill-opacity=".35" stroke="{BR}"/>'
    b += t(ox + n * s / 2, 212, f"{n}² = {n*n}", 13, weight="700")
svg("1-5-potencias.svg", 680, 230, b)

# 1.6 prefijos SI
names = [("kilo (k)", "10³ = 1 000"), ("hecto (h)", "10² = 100"), ("deca (da)", "10¹ = 10"), ("UNIDAD", "m · g · L"),
         ("deci (d)", "10⁻¹ = 0.1"), ("centi (c)", "10⁻² = 0.01"), ("mili (m)", "10⁻³ = 0.001")]
b = t(300, 28, "Prefijos del Sistema Internacional", 15, weight="700")
for i, (n, v) in enumerate(names):
    x, hi = 30 + i * 80, i == 3
    b += f'<rect x="{x}" y="60" width="74" height="80" rx="10" fill="{BR if hi else SOFT}" stroke="{BR}" stroke-width="2"/>'
    b += t(x + 37, 95, n, 12.5, "#fff" if hi else INK, weight="700") + t(x + 37, 118, v, 10.5, "#fff" if hi else MUT)
b += f'<line x1="40" y1="168" x2="560" y2="168" stroke="{OK}" stroke-width="3"/><path d="M560 168 l-10 -6 v12z" fill="{OK}"/>' + t(300, 190, "Hacia la derecha: × 10 por cada escalón", 12.5, OK, weight="700")
b += f'<line x1="560" y1="210" x2="40" y2="210" stroke="{WARN}" stroke-width="3"/><path d="M40 210 l10 -6 v12z" fill="{WARN}"/>' + t(300, 232, "Hacia la izquierda: ÷ 10 por cada escalón", 12.5, WARN, weight="700")
svg("1-6-prefijos-si.svg", 600, 250, b)

# 1.7 jerarquía de operaciones
steps = [("1", "Paréntesis ( ), corchetes [ ], llaves { }", "de adentro hacia afuera", BR), ("2", "Potencias y raíces", "", WARN),
         ("3", "Multiplicación × y división ÷", "de izquierda a derecha", OK), ("4", "Suma + y resta −", "de izquierda a derecha", PINK)]
b = t(300, 28, "Jerarquía de operaciones", 15, weight="700")
for i, (n, a, c, col) in enumerate(steps):
    y = 45 + i * 58
    b += f'<rect x="{30+i*20}" y="{y}" width="{540-i*20}" height="48" rx="10" fill="{col}" fill-opacity=".14" stroke="{col}" stroke-width="2"/><circle cx="{58+i*20}" cy="{y+24}" r="15" fill="{col}"/>'
    b += t(58 + i * 20, y + 30, n, 16, "#fff", weight="700") + t(85 + i * 20, y + (22 if c else 29), a, 14, anchor="start", weight="700")
    if c:
        b += t(85 + i * 20, y + 39, c, 12, MUT, "start")
b += t(300, 298, "Ejemplo: 3 + 2 × (5 − 1)² ÷ 4  →  3 + 2 × 16 ÷ 4  →  3 + 32 ÷ 4  →  3 + 8  =  11", 12.5, weight="700")
svg("1-7-jerarquia.svg", 600, 320, b)
print(sorted(os.listdir(OUT)))
