export const math101Questions = [
  {
    id: "MTH101-001",
    question: "Simplify $8a^{-6} \\div 4a^{-4}$",
    options: [
      "$2a^{-2}$",
      "$\\frac{2}{a^{2}}$",
      "$2a^{2}$",
      "$\\frac{a^{2}}{2}$",
    ],
    correct: "$\\frac{2}{a^{2}}$",
    reason:
      "Divide the coefficients: $8 \\div 4 = 2$. Subtract the exponents: $-6 - (-4) = -6 + 4 = -2$. This gives $2a^{-2}$, which is $\\frac{2}{a^{2}}$.",
  },
  {
    id: "MTH101-002",
    question: "Simplify $75a^{2}b^{-2} \\div 5a^{3}b^{-3}$",
    options: ["$15ab$", "$25a^{2}b$", "$15a^{-1}b$", "$15b/a$"],
    correct: "$15b/a$",
    reason:
      "$75/5 = 15$. For the variables: $a^{2-3} = a^{-1}$ and $b^{-2-(-3)} = b^{1}$. Result is $15a^{-1}b$, or $15b/a$.",
  },
  {
    id: "MTH101-003",
    question: "Simplify $\\log_{3}{2} + \\log_{3}{10} - \\log_{3}{5}$",
    options: ["$\\log_{3}{4}$", "$3$", "$2$", "$\\log_{3}{7}$"],
    correct: "$\\log_{3}{4}$",
    reason:
      "Using log laws: $\\log_{3}(\\frac{2 \\times 10}{5}) = \\log_{3}(\\frac{20}{5}) = \\log_{3}{4}$.",
  },
  {
    id: "MTH101-004",
    question: "Simplify $5^{x} \\div 5^{x-1}$",
    options: ["$5^{2x-1}$", "$2$", "$5$", "$10$"],
    correct: "$5$",
    reason:
      "Using the division law of indices: $5^{x - (x - 1)} = 5^{x - x + 1} = 5^{1} = 5$.",
  },
  {
    id: "MTH101-005",
    question:
      "Given that $\\log_{10}{2} = 0.3010$ and $\\log_{10}{3} = 0.4771$, evaluate $\\log_{10}{24}$",
    options: ["$1.3801$", "$1.1071$", "$1.2373$", "$0.8263$"],
    correct: "$1.3801$",
    reason:
      "$\\log{24} = \\log(2^{3} \\times 3) = 3\\log{2} + \\log{3} = 3(0.3010) + 0.4771 = 0.9030 + 0.4771 = 1.3801$.",
  },
  {
    id: "MTH101-006",
    question: "Simplify $(3 + 4i) + (-2i + 5)$",
    options: ["$8 + 2i$", "$6 + 2i$", "$8 + 5i$", "$1 + 9i$"],
    correct: "$8 + 2i$",
    reason: "Group real and imaginary parts: $(3 + 5) + (4i - 2i) = 8 + 2i$.",
  },
  {
    id: "MTH101-007",
    question: "Simplify $\\frac{1}{4}(2^{n} - 2^{n+2})$",
    options: ["$-3(2^{n-2})$", "$2^{n-2}$", "$2^{n+1}$", "$n-2$"],
    correct: "$-3(2^{n-2})$",
    reason:
      "$\\frac{1}{4}(2^{n} - 2^{n} \\cdot 2^{2}) = \\frac{1}{4}(2^{n}(1 - 4)) = \\frac{1}{4}(2^{n} \\cdot -3) = -3 \\cdot \\frac{2^{n}}{2^{2}} = -3(2^{n-2})$.",
  },
  {
    id: "MTH101-008",
    question: "Evaluate $\\frac{5}{\\sqrt{2}-1}$",
    options: [
      "$5(\\sqrt{2}+1)$",
      "$\\frac{5(\\sqrt{2}+1)}{3}$",
      "$5\\sqrt{2}-1$",
      "$\\sqrt{5}+1$",
    ],
    correct: "$5(\\sqrt{2}+1)$",
    reason:
      "Rationalize the denominator by multiplying top and bottom by $(\\sqrt{2}+1)$. Result is $\\frac{5(\\sqrt{2}+1)}{2-1} = 5(\\sqrt{2}+1)$.",
  },
  {
    id: "MTH101-009",
    question: "Evaluate $\\log_{10}{2} + \\log_{10}{5}$",
    options: ["$10$", "$1$", "$0.1$", "$0$"],
    correct: "$1$",
    reason: "$\\log_{10}(2 \\times 5) = \\log_{10}{10} = 1$.",
  },
  {
    id: "MTH101-010",
    question: "If $3^{2x} = 27$, find $x$",
    options: ["$3/2$", "$2/3$", "$9$", "$-3/2$"],
    correct: "$3/2$",
    reason: "$3^{2x} = 3^{3}$. Therefore, $2x = 3$, so $x = 3/2$.",
  },
  {
    id: "MTH101-011",
    question:
      "If $P = \\{1, 2, 3, 9, 2\\frac{1}{2}\\}$, $Q = \\{1, 2\\frac{1}{2}, 3, 7\\}$, and $R = \\{5, 4, 2\\frac{1}{2}\\}$, find $P \\cup Q \\cup R$",
    options: [
      "$\\{1, 2, 3, 2\\frac{1}{2}, 4, 5, 9, 7\\}$",
      "$\\{1, 2, 3, 2\\frac{1}{2}\\}$",
      "$\\{5, 4, 2\\frac{1}{2}\\}$",
      "$\\{1, 2, 3\\}$",
    ],
    correct: "$\\{1, 2, 3, 2\\frac{1}{2}, 4, 5, 9, 7\\}$",
    reason:
      "The union is the set of all unique elements present in P, Q, or R.",
  },
  {
    id: "MTH101-012",
    question: "Using the sets from Question 11, find $P \\cap Q \\cap R$",
    options: [
      "$\\{1, 2, 3\\}$",
      "$\\{5, 4, 2\\frac{1}{2}\\}$",
      "$\\{2\\frac{1}{2}\\}$",
      "$\\{1, 7, 9\\}$",
    ],
    correct: "$\\{2\\frac{1}{2}\\}$",
    reason:
      "The intersection is the set of elements common to all three sets, which is $2\\frac{1}{2}$.",
  },
  {
    id: "MTH101-013",
    question: "Simplify $16^{-3/4}$",
    options: ["$1/8$", "$1/4$", "$8$", "$1/16$"],
    correct: "$1/8$",
    reason: "$(16^{1/4})^{-3} = (2)^{-3} = 1/2^{3} = 1/8$.",
  },
  {
    id: "MTH101-014",
    question: "Simplify $\\log_{3}{9}$",
    options: ["$4$", "$3$", "$2$", "$9$"],
    correct: "$2$",
    reason: "Since $3^{2} = 9$, $\\log_{3}{9} = 2$.",
  },
  {
    id: "MTH101-015",
    question: "Solve $4^{x} = 0.5$",
    options: ["$-1/2$", "$1/2$", "$2$", "$-2$"],
    correct: "$-1/2$",
    reason: "$2^{2x} = 2^{-1}$. Thus $2x = -1$, and $x = -1/2$.",
  },
  {
    id: "MTH101-016",
    question: "Simplify $2\\sqrt{3} + \\sqrt{27} - 5\\sqrt{3}$",
    options: ["$0$", "$\\sqrt{3}$", "$3\\sqrt{3}$", "$2\\sqrt{3}$"],
    correct: "$0$",
    reason:
      "$2\\sqrt{3} + 3\\sqrt{3} - 5\\sqrt{3} = 5\\sqrt{3} - 5\\sqrt{3} = 0$.",
  },
  {
    id: "MTH101-017",
    question: "Simplify $(\\frac{16}{81})^{1/4} \\div (\\frac{9}{16})^{-1/2}$",
    options: ["$1/2$", "$3/2$", "$3/4$", "$2/3$"],
    correct: "$1/2$",
    reason:
      "First part is $2/3$. Second part is $(16/9)^{1/2} = 4/3$. So, $2/3 \\div 4/3 = 2/3 \\times 3/4 = 1/2$.",
  },
  {
    id: "MTH101-018",
    question: "Find the value of $\\log_{6}{\\frac{1}{36}}$",
    options: ["$-2$", "$2$", "$1/2$", "$-1/2$"],
    correct: "$-2$",
    reason: "$\\log_{6}{6^{-2}} = -2$.",
  },
  {
    id: "MTH101-019",
    question: "Given $\\log_{x}{9} = 2$, find $x$",
    options: ["$3$", "$81$", "$9$", "$\\sqrt{3}$"],
    correct: "$3$",
    reason: "$x^{2} = 9$, therefore $x = 3$.",
  },
  {
    id: "MTH101-020",
    question: "Express $\\frac{7\\pi}{6}$ radian in degree.",
    options: [
      "$150^{\\circ}$",
      "$180^{\\circ}$",
      "$210^{\\circ}$",
      "$240^{\\circ}$",
    ],
    correct: "$210^{\\circ}$",
    reason:
      "To convert radians to degrees, multiply by $\\frac{180^{\\circ}}{\\pi}$. So, $\\frac{7\\pi}{6} \\times \\frac{180}{\\pi} = 7 \\times 30 = 210^{\\circ}$.",
  },
  {
    id: "MTH101-021",
    question:
      "Find the $U_{r}$ in the terms of $r$ for the sequence $3, 5, 7, 9, \\dots$",
    options: ["$2r-1$", "$2r+1$", "$r+2$", "$3r-1$"],
    correct: "$2r+1$",
    reason:
      "This is an arithmetic progression with $a=3$ and $d=2$. Using $U_{r} = a + (r-1)d$: $3 + (r-1)2 = 3 + 2r - 2 = 2r + 1$.",
  },
  {
    id: "MTH101-022",
    question: "Evaluate $\\sum_{r=1}^{3} r^{2}$",
    options: ["$6$", "$9$", "$14$", "$10$"],
    correct: "$14$",
    reason: "The sum is $1^{2} + 2^{2} + 3^{2} = 1 + 4 + 9 = 14$.",
  },
  {
    id: "MTH101-023",
    question: "Express $\\frac{1}{1 - \\sin 45^{\\circ}}$ in surd form.",
    options: [
      "$\\frac{2}{2-\\sqrt{2}}$",
      "$\\frac{\\sqrt{2}}{1-\\sqrt{2}}$",
      "$1+\\sqrt{2}$",
      "$2+\\sqrt{2}$",
    ],
    correct: "$\\frac{2}{2-\\sqrt{2}}$",
    reason:
      "Since $\\sin 45^{\\circ} = \\frac{\\sqrt{2}}{2}$, the expression becomes $\\frac{1}{1 - \\frac{\\sqrt{2}}{2}} = \\frac{1}{\\frac{2-\\sqrt{2}}{2}} = \\frac{2}{2-\\sqrt{2}}$.",
  },
  {
    id: "MTH101-024",
    question:
      "Find three numbers in an arithmetic progression whose sum is $21$ and whose product is $315$.",
    options: ["$3, 7, 11$", "$5, 7, 9$", "$4, 7, 10$", "$6, 7, 8$"],
    correct: "$5, 7, 9$",
    reason:
      "Let the numbers be $a-d, a, a+d$. Sum $3a = 21 \\Rightarrow a = 7$. Product $(7-d)(7)(7+d) = 315 \\Rightarrow 49-d^2 = 45 \\Rightarrow d=2$. The numbers are $5, 7, 9$.",
  },
  {
    id: "MTH101-025",
    question:
      "What is the formula for the sum to infinity of a geometric series with $|r| < 1$?",
    options: [
      "$\\frac{a}{1-r}$",
      "$\\frac{a(1-r^n)}{1-r}$",
      "$ar^{n-1}$",
      "$\\frac{n}{2}(2a + (n-1)d)$",
    ],
    correct: "$\\frac{a}{1-r}$",
    reason:
      "The sum to infinity of a geometric series is deduced using the formula $\\frac{a}{1-r}$.",
  },
  {
    id: "MTH101-026",
    question:
      "To what sum does the series $1 - \\frac{1}{3} + \\frac{1}{9} - \\frac{1}{27} + \\dots$ converge?",
    options: [
      "$\\frac{1}{4}$",
      "$\\frac{3}{4}$",
      "$\\frac{2}{3}$",
      "$\\frac{4}{3}$",
    ],
    correct: "$\\frac{3}{4}$",
    reason:
      "Here $a=1$ and $r=-\\frac{1}{3}$. $S_{\\infty} = \\frac{1}{1 - (-\\frac{1}{3})} = \\frac{1}{\\frac{4}{3}} = \\frac{3}{4}$.",
  },
  {
    id: "MTH101-027",
    question: "If $Z_{1} = 3 + 2i$ and $Z_{2} = 4 - 3i$, find $Z_{1} - Z_{2}$.",
    options: ["$7 - i$", "$-1 + 5i$", "$1 - 5i$", "$-1 - i$"],
    correct: "$-1 + 5i$",
    reason: "$Z_{1} - Z_{2} = (3 - 4) + (2i - (-3i)) = -1 + 5i$.",
  },
  {
    id: "MTH101-028",
    question: "Given $Z_{1} = 2 - 3i$ and $Z_{2} = 1 + 4i$, find $Z_{1}Z_{2}$.",
    options: ["$14 + 5i$", "$2 - 12i$", "$-10 + 5i$", "$14 - 5i$"],
    correct: "$14 + 5i$",
    reason:
      "$Z_{1}Z_{2} = (2-3i)(1+4i) = 2 + 8i - 3i - 12i^2 = 2 + 5i + 12 = 14 + 5i$.",
  },
  {
    id: "MTH101-029",
    question: "In the complex plane $Z = x + iy$, what does $|z|$ represent?",
    options: ["The argument", "The real part", "The modulus", "The conjugate"],
    correct: "The modulus",
    reason:
      "For a complex number $Z = x + iy$, $|z|$ is called the modulus of $Z$.",
  },
  {
    id: "MTH101-030",
    question: "Find the modulus of $Z = 3 - 4i$.",
    options: ["$7$", "$1$", "$5$", "$\\sqrt{7}$"],
    correct: "$5$",
    reason:
      "Modulus $|z| = \\sqrt{3^2 + (-4)^2} = \\sqrt{9 + 16} = \\sqrt{25} = 5$.",
  },
  {
    id: "MTH101-031",
    question: "If $Z = 5 - 12i$, find the value of $|z|$.",
    options: ["$7$", "$13$", "$17$", "$11$"],
    correct: "$13$",
    reason:
      "$|z| = \\sqrt{5^2 + (-12)^2} = \\sqrt{25 + 144} = \\sqrt{169} = 13$.",
  },
  {
    id: "MTH101-032",
    question: "Evaluate $(1+i)^{2}$.",
    options: ["$2$", "$2i$", "$1+2i$", "$0$"],
    correct: "$2i$",
    reason: "$(1+i)(1+i) = 1 + i + i + i^2 = 1 + 2i - 1 = 2i$.",
  },
  {
    id: "MTH101-033",
    question:
      "If $(x+3)$ is a factor of $x^3 + 3x^2 + nx - 12$, find the value of $n$.",
    options: ["$4$", "$-4$", "$3$", "$-3$"],
    correct: "$-4$",
    reason:
      "Using the factor theorem, $f(-3) = 0 \\Rightarrow (-3)^3 + 3(-3)^2 + n(-3) - 12 = 0 \\Rightarrow -27 + 27 - 3n - 12 = 0 \\Rightarrow -3n = 12 \\Rightarrow n = -4$.",
  },
  {
    id: "MTH101-034",
    question:
      "Given $\\sin \\theta = \\frac{\\sqrt{3}}{2}$ where $\\theta$ is acute, find $\\tan 2\\theta$ in surd form.",
    options: [
      "$\\sqrt{3}$",
      "$-\\sqrt{3}$",
      "$\\frac{1}{\\sqrt{3}}$",
      "$-\\frac{1}{\\sqrt{3}}$",
    ],
    correct: "$-\\sqrt{3}$",
    reason:
      "$\\theta = 60^{\\circ}$. $\\tan 2(60^{\\circ}) = \\tan 120^{\\circ} = -\\sqrt{3}$.",
  },
  {
    id: "MTH101-035",
    question:
      "Find the next two terms of the sequence $1, 5, 14, 30, 55, \\dots$",
    options: ["$81, 121$", "$91, 140$", "$75, 110$", "$85, 130$"],
    correct: "$91, 140$",
    reason:
      "The sequence adds successive perfect squares: $55 + 6^2 = 91$ and $91 + 7^2 = 140$.",
  },
  {
    id: "MTH101-036",
    question:
      "Express $\\frac{2}{3 - \\sqrt{7}}$ in the form $a + \\sqrt{b}$ where $a, b$ are integers.",
    options: [
      "$3 + \\sqrt{7}$",
      "$3 - \\sqrt{7}$",
      "$2 + \\sqrt{7}$",
      "$1 + \\sqrt{7}$",
    ],
    correct: "$3 + \\sqrt{7}$",
    reason:
      "Rationalize: $\\frac{2(3+\\sqrt{7})}{(3-\\sqrt{7})(3+\\sqrt{7})} = \\frac{2(3+\\sqrt{7})}{9-7} = \\frac{2(3+\\sqrt{7})}{2} = 3 + \\sqrt{7}$.",
  },
  {
    id: "MTH101-037",
    question:
      "What is the nature of the roots of a quadratic equation if $b^2 - 4ac < 0$?",
    options: [
      "Two real equal roots",
      "Two real distinct roots",
      "No real roots",
      "Rational roots",
    ],
    correct: "No real roots",
    reason:
      "If the discriminant $b^2 - 4ac < 0$, the equation has no real roots.",
  },
  {
    id: "MTH101-038",
    question:
      "The first term of a geometric series is $350$. If the sum to infinity is $250$, find the common ratio $r$.",
    options: [
      "$\\frac{2}{5}$",
      "$-\\frac{2}{5}$",
      "$\\frac{3}{5}$",
      "$-\\frac{3}{5}$",
    ],
    correct: "$-\\frac{2}{5}$",
    reason:
      "Using $S_{\\infty} = \\frac{a}{1-r} \\Rightarrow 250 = \\frac{350}{1-r} \\Rightarrow 250 - 250r = 350 \\Rightarrow -250r = 100 \\Rightarrow r = -\\frac{100}{250} = -\\frac{2}{5}$.",
  },
  {
    id: "MTH101-039",
    question:
      "If $\\alpha$ and $\\beta$ are the roots of $ax^2 + bx + c = 0$, what does $\\alpha + \\beta$ equal?",
    options: [
      "$\\frac{b}{a}$",
      "$-\\frac{b}{a}$",
      "$\\frac{c}{a}$",
      "$-\\frac{c}{a}$",
    ],
    correct: "$-\\frac{b}{a}$",
    reason: "The sum of the roots of a quadratic equation is $-\\frac{b}{a}$.",
  },
  {
    id: "MTH101-040",
    question:
      "If $\\alpha$ and $\\beta$ are the roots of $ax^2 + bx + c = 0$, what does $\\alpha\\beta$ represent?",
    options: [
      "$\\frac{b}{a}$",
      "$-\\frac{b}{a}$",
      "$\\frac{c}{a}$",
      "$-\\frac{c}{a}$",
    ],
    correct: "$\\frac{c}{a}$",
    reason:
      "The product of the roots of a quadratic equation is $\\frac{c}{a}$.",
  },
  {
    id: "MTH101-041",
    question:
      "If $\\alpha$ and $\\beta$ are the roots of $3x^2 + 7x + 2 = 0$, find $\\alpha + \\beta$.",
    options: [
      "$\\frac{7}{3}$",
      "$-\\frac{7}{3}$",
      "$\\frac{2}{3}$",
      "$-\\frac{2}{3}$",
    ],
    correct: "$-\\frac{7}{3}$",
    reason: "Sum of roots $= -\\frac{b}{a} = -\\frac{7}{3}$.",
  },
  {
    id: "MTH101-042",
    question:
      "If $\\alpha$ and $\\beta$ are the roots of $3x^2 + 2x - 5 = 0$, find $\\alpha\\beta$.",
    options: [
      "$\\frac{2}{3}$",
      "$-\\frac{2}{3}$",
      "$\\frac{5}{3}$",
      "$-\\frac{5}{3}$",
    ],
    correct: "$-\\frac{5}{3}$",
    reason: "Product of roots $= \\frac{c}{a} = -\\frac{5}{3}$.",
  },
  {
    id: "MTH101-043",
    question:
      "The roots of a quadratic equation are $-3$ and $1$. Find its equation.",
    options: [
      "$x^2 - 2x - 3 = 0$",
      "$x^2 + 2x - 3 = 0$",
      "$x^2 + 2x + 3 = 0$",
      "$x^2 - 2x + 3 = 0$",
    ],
    correct: "$x^2 + 2x - 3 = 0$",
    reason:
      "Equation is $x^2 - (sum)x + (product) = 0$. $Sum = -2$, $Product = -3$. So $x^2 - (-2)x + (-3) = x^2 + 2x - 3 = 0$.",
  },
  {
    id: "MTH101-044",
    question: "If $f(x)$ is divided by $(ax-b)$, the remainder is:",
    options: ["$f(\\frac{b}{a})$", "$f(-\\frac{b}{a})$", "$f(b)$", "$f(a)$"],
    correct: "$f(\\frac{b}{a})$",
    reason:
      "If $ax-b=0$, $x=\\frac{b}{a}$. By the remainder theorem, the remainder is $f(\\frac{b}{a})$.",
  },
  {
    id: "MTH101-045",
    question:
      "Find the remainder when $x^5 - 2x^3 + x - 3$ is divided by $x - 2$.",
    options: ["$10$", "$15$", "$20$", "$5$"],
    correct: "$15$",
    reason: "Substitute $x=2$: $2^5 - 2(2^3) + 2 - 3 = 32 - 16 + 2 - 3 = 15$.",
  },
  {
    id: "MTH101-046",
    question:
      "Evaluate the remainder when $2x^3 + x^2 - 4x - 1$ is divided by $3x + 1$.",
    options: [
      "$\\frac{5}{27}$",
      "$\\frac{10}{27}$",
      "$-\\frac{10}{27}$",
      "$1$",
    ],
    correct: "$\\frac{10}{27}$",
    reason:
      "Substitute $x = -\\frac{1}{3}$ into the polynomial. Result is $\\frac{10}{27}$.",
  },
  {
    id: "MTH101-047",
    question:
      "The third term of a G.P. is $10$ and the sixth term is $80$. Find the common ratio $r$.",
    options: ["$2$", "$4$", "$3$", "$5$"],
    correct: "$2$",
    reason:
      "$\\frac{ar^5}{ar^2} = \\frac{80}{10} \\Rightarrow r^3 = 8 \\Rightarrow r = 2$.",
  },
  {
    id: "MTH101-048",
    question: "The union of two sets $A$ and $B$ is denoted by:",
    options: ["$A \\cap B$", "$A \\cup B$", "$A \\subset B$", "$A \\times B$"],
    correct: "$A \\cup B$",
    reason: "The union of $A$ and $B$ is denoted by $A \\cup B$.",
  },
  {
    id: "MTH101-049",
    question:
      "What pictorial representation uses circles inside a rectangle to represent sets?",
    options: ["Bar chart", "Venn diagram", "Histogram", "Pie chart"],
    correct: "Venn diagram",
    reason:
      "A Venn diagram is a pictorial representation of sets inside a universal set rectangle.",
  },
  {
    id: "MTH101-050",
    question: "Find the sum of the roots of the equation $2x^2 + 3x - 9 = 0$.",
    options: [
      "$\\frac{3}{2}$",
      "$-\\frac{3}{2}$",
      "$\\frac{9}{2}$",
      "$-\\frac{9}{2}$",
    ],
    correct: "$-\\frac{3}{2}$",
    reason: "Sum of roots $= -\\frac{b}{a} = -\\frac{3}{2}$.",
  },
  {
    id: "MTH101-051",
    question:
      "Given $\\xi = \\{1, 2, \\dots, 10\\}$, $P = \\{x:x \\text{ is prime}\\}$ and $Q = \\{y:y \\text{ is odd}\\}$, find $P' \\cap Q$.",
    options: [
      "$\\{1, 9\\}$",
      "$\\{2, 3, 5, 7\\}$",
      "$\\{1, 3, 5, 7, 9\\}$",
      "$\\{4, 6, 8, 10\\}$",
    ],
    correct: "$\\{1, 9\\}$",
    reason:
      "$P = \\{2, 3, 5, 7\\}$, $P' = \\{1, 4, 6, 8, 9, 10\\}$. $Q = \\{1, 3, 5, 7, 9\\}$. Intersection is $\\{1, 9\\}$.",
  },
  {
    id: "MTH101-052",
    question:
      "A sequence is given by $2.5, 5, 7.5, \\dots$ If the $n$th term is $25$, find $n$.",
    options: ["$5$", "$8$", "$10$", "$12$"],
    correct: "$10$",
    reason:
      "$a = 2.5, d = 2.5$. $2.5 + (n-1)2.5 = 25 \\Rightarrow 2.5n = 25 \\Rightarrow n = 10$.",
  },
  {
    id: "MTH101-053",
    question:
      "The $n$th term of a sequence is $T_n = 5 + (n-1)^2$. Evaluate $T_4 - T_6$.",
    options: ["$16$", "$-16$", "$14$", "$-30$"],
    correct: "$-16$",
    reason: "$T_4 = 14, T_6 = 30$. $T_4 - T_6 = 14 - 30 = -16$.",
  },
  {
    id: "MTH101-054",
    question:
      "If $P = \\{\\text{prime factors of } 210\\}$ and $Q = \\{\\text{prime numbers } < 10\\}$, find $P \\cap Q$.",
    options: [
      "$\\{2, 3, 5, 7\\}$",
      "$\\{2, 3, 5\\}$",
      "$\\{7, 11\\}$",
      "$\\{1, 2, 3, 5, 7\\}$",
    ],
    correct: "$\\{2, 3, 5, 7\\}$",
    reason:
      "$P = \\{2, 3, 5, 7\\}$ and $Q = \\{2, 3, 5, 7\\}$. Their intersection is $\\{2, 3, 5, 7\\}$.",
  },
  {
    id: "MTH101-055",
    question:
      "If $P = \\{y:2y \\ge 6\\}$ and $Q = \\{y:y-3 \\le 4\\}$ for integers $y$, find $P \\cap Q$.",
    options: [
      "$\\{3, 4, 5, 6, 7\\}$",
      "$\\{2, 3, 4, 5, 6\\}$",
      "$\\{3, 4, 5, 6\\}$",
      "$\\{y:3 \\le y \\le 7\\}$",
    ],
    correct: "$\\{3, 4, 5, 6, 7\\}$",
    reason:
      "$P = \\{y:y \\ge 3\\}$ and $Q = \\{y:y \\le 7\\}$. The intersection for integers is $\\{3, 4, 5, 6, 7\\}$.",
  },
  {
    id: "MTH101-056",
    question: "Find the values of $k$ in the equation $6k^2 = 5k + 6$.",
    options: [
      "$\\frac{3}{2}, -\\frac{2}{3}$",
      "$-\\frac{3}{2}, \\frac{2}{3}$",
      "$\\frac{1}{2}, 3$",
      "$2, -3$",
    ],
    correct: "$\\frac{3}{2}, -\\frac{2}{3}$",
    reason:
      "$6k^2 - 5k - 6 = 0 \\Rightarrow (2k-3)(3k+2) = 0 \\Rightarrow k = \\frac{3}{2}, -\\frac{2}{3}$.",
  },
  {
    id: "MTH101-057",
    question:
      "If $X = \\{0, 2, 4, 6\\}$, $Y = \\{1, 2, 3, 4\\}$, $Z = \\{1, 3\\}$, find $X \\cap (Y' \\cup Z)$ relative to $\\xi = \\{0, 1, 2, 3, 4, 5, 6\\}$.",
    options: [
      "$\\{0, 6\\}$",
      "$\\{2, 4\\}$",
      "$\\{0, 1, 3, 5, 6\\}$",
      "$\\{1, 3\\}$",
    ],
    correct: "$\\{0, 6\\}$",
    reason:
      "$Y' = \\{0, 5, 6\\}$. $Y' \\cup Z = \\{0, 1, 3, 5, 6\\}$. $X \\cap (Y' \\cup Z) = \\{0, 6\\}$.",
  },
  {
    id: "MTH101-058",
    question: "Find the 7th term of the sequence $2, 5, 10, 17, 26, \\dots$",
    options: ["$37$", "$50$", "$49$", "$65$"],
    correct: "$50$",
    reason: "The sequence is $n^2 + 1$. For $n=7$, $7^2 + 1 = 50$.",
  },
  {
    id: "MTH101-059",
    question: "Which of the following is an irrational number?",
    options: [
      "$0.333\\dots$",
      "$\\sqrt{9}$",
      "$\\sqrt{90}$",
      "$\\frac{10}{3}$",
    ],
    correct: "$\\sqrt{90}$",
    reason:
      "$\\sqrt{90} = 3\\sqrt{10}$, which cannot be expressed as a simple fraction.",
  },
  {
    id: "MTH101-060",
    question:
      "A pole of length $L$ leans against a wall at $60^{\\circ}$ to the horizontal ground. If the top is $8m$ high, find $L$.",
    options: [
      "$\\frac{16\\sqrt{3}}{3}m$",
      "$8\\sqrt{3}m$",
      "$16m$",
      "$4\\sqrt{3}m$",
    ],
    correct: "$\\frac{16\\sqrt{3}}{3}m$",
    reason:
      "$\\sin 60^{\\circ} = \\frac{8}{L} \\Rightarrow L = \\frac{8}{\\sin 60^{\\circ}} = \\frac{8}{\\sqrt{3}/2} = \\frac{16}{\\sqrt{3}} = \\frac{16\\sqrt{3}}{3}$.",
  },
  {
    id: "MTH101-061",
    question: "Find the equation whose roots are $-8$ and $5$.",
    options: [
      "$x^2 - 3x - 40 = 0$",
      "$x^2 + 3x - 40 = 0$",
      "$x^2 + 3x + 40 = 0$",
      "$x^2 - 3x + 40 = 0$",
    ],
    correct: "$x^2 + 3x - 40 = 0$",
    reason: "Equation is $x^2 - (-8+5)x + (-8 \\times 5) = x^2 + 3x - 40 = 0$.",
  },
  {
    id: "MTH101-062",
    question:
      "The $n$th term of a sequence is $2^{2n-1}$. Which term is $2^9$?",
    options: ["$4$", "$5$", "$6$", "$10$"],
    correct: "$5$",
    reason: "$2n - 1 = 9 \\Rightarrow 2n = 10 \\Rightarrow n = 5$.",
  },
  {
    id: "MTH101-063",
    question: "Factorize $6x^2 + 7x - 20$.",
    options: [
      "$(2x-5)(3x+4)$",
      "$(2x+5)(3x-4)$",
      "$(6x+5)(x-4)$",
      "$(3x+5)(2x-4)$",
    ],
    correct: "$(2x+5)(3x-4)$",
    reason: "$6x^2 + 15x - 8x - 20 = 3x(2x+5) - 4(2x+5) = (2x+5)(3x-4)$.",
  },
  {
    id: "MTH101-064",
    question: "If $2x^2 + kx - 14 = (x+2)(2x-7)$, find $k$.",
    options: ["$3$", "$-3$", "$4$", "$-4$"],
    correct: "$-3$",
    reason:
      "Expanding $(x+2)(2x-7) = 2x^2 - 7x + 4x - 14 = 2x^2 - 3x - 14$. Thus $k = -3$.",
  },
  {
    id: "MTH101-065",
    question: "Which of the following is NOT a quadratic expression?",
    options: [
      "$y = 2x^2 - 5x$",
      "$y = x(x-5)$",
      "$y = x^2 - 5$",
      "$y = 5(x-1)$",
    ],
    correct: "$y = 5(x-1)$",
    reason: "$y = 5(x-1)$ is linear because the highest power of $x$ is one.",
  },
  {
    id: "MTH101-066",
    question:
      "Given $\\sin p = \\frac{5}{13}$ where $p$ is acute, find $\\cos p - \\tan p$.",
    options: [
      "$\\frac{79}{156}$",
      "$\\frac{11}{13}$",
      "$\\frac{1}{12}$",
      "$\\frac{5}{156}$",
    ],
    correct: "$\\frac{79}{156}$",
    reason:
      "$\\cos p = \\frac{12}{13}$ and $\\tan p = \\frac{5}{12}$. $\\frac{12}{13} - \\frac{5}{12} = \\frac{144-65}{156} = \\frac{79}{156}$.",
  },
  {
    id: "MTH101-067",
    question:
      "A ladder $6m$ long leans against a wall at $30^{\\circ}$ to the horizontal. How high does it reach?",
    options: ["$2m$", "$3m$", "$4m$", "$3\\sqrt{3}m$"],
    correct: "$3m$",
    reason:
      "$\\text{Height} = 6 \\times \\sin 30^{\\circ} = 6 \\times \\frac{1}{2} = 3m$.",
  },
  {
    id: "MTH101-068",
    question:
      "In $\\triangle XYZ$, $YZ=6cm$, $\\hat{X}=60^{\\circ}$ and $\\hat{Y}=90^{\\circ}$. Find $XZ$ in surd form.",
    options: ["$4\\sqrt{3}cm$", "$2\\sqrt{3}cm$", "$6\\sqrt{3}cm$", "$12cm$"],
    correct: "$4\\sqrt{3}cm$",
    reason:
      "$\\sin 60^{\\circ} = \\frac{6}{XZ} \\Rightarrow XZ = \\frac{6}{\\sqrt{3}/2} = \\frac{12}{\\sqrt{3}} = 4\\sqrt{3}$.",
  },
  {
    id: "MTH101-069",
    question: "If $\\tan x = 1$, evaluate $\\sin x + \\cos x$ in surd form.",
    options: ["$1$", "$\\sqrt{2}$", "$\\frac{\\sqrt{2}}{2}$", "$2$"],
    correct: "$\\sqrt{2}$",
    reason:
      "If $\\tan x = 1$, $x=45^{\\circ}$. $\\sin 45^{\\circ} + \\cos 45^{\\circ} = \\frac{\\sqrt{2}}{2} + \\frac{\\sqrt{2}}{2} = \\sqrt{2}$.",
  },
];
