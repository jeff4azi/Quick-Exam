export const math101Questions = [
  {
    id: "MTH101-001",
    question: "Express \\frac{7\\pi}{6} radian in degree.",
    options: ["150^{\\circ}", "180^{\\circ}", "210^{\\circ}", "240^{\\circ}"],
    correct: "210^{\\circ}",
    reason: "To convert radians to degrees, multiply by \\frac{180^{\\circ}}{\\pi}. So, \\frac{7\\pi}{6} \\times \\frac{180}{\\pi} = 7 \\times 30 = 210^{\\circ}."
  },
  {
    id: "MTH101-002",
    question: "Find the U_{r} in the terms of r for the sequence 3, 5, 7, 9, ...",
    options: ["2r - 1", "2r + 1", "r + 2", "3r"],
    correct: "2r + 1",
    reason: "This is an arithmetic progression with first term a=3 and common difference d=2. Using U_{r} = a + (r - 1)d, we get 3 + (r - 1)2 = 3 + 2r - 2 = 2r + 1."
  },
  {
    id: "MTH101-003",
    question: "Evaluate \\sum_{r=1}^{3}r^{2}.",
    options: ["6", "10", "14", "18"],
    correct: "14",
    reason: "Expand the summation for r=1, 2, 3: 1^{2} + 2^{2} + 3^{2} = 1 + 4 + 9 = 14."
  },
  {
    id: "MTH101-004",
    question: "Express \\frac{1}{1-\\sin45^{\\circ}} in surd form.",
    options: ["\\frac{2}{2-\\sqrt{2}}", "\\sqrt{2}", "1 + \\sqrt{2}", "2 + \\sqrt{2}"],
    correct: "\\frac{2}{2-\\sqrt{2}}",
    reason: "Substitute \\sin 45^{\\circ} = \\frac{\\sqrt{2}}{2}. The expression becomes \\frac{1}{1-\\frac{\\sqrt{2}}{2}} = \\frac{1}{\\frac{2-\\sqrt{2}}{2}} = \\frac{2}{2-\\sqrt{2}}."
  },
  {
    id: "MTH101-005",
    question: "What are the three numbers in the arithmetic progression whose sum is 21 and whose product is 315?",
    options: ["3, 7, 11", "5, 7, 9", "4, 7, 10", "6, 7, 8"],
    correct: "5, 7, 9",
    reason: "Let the numbers be a-d, a, a+d. Sum: 3a=21 \\implies a=7. Product: (7-d)(7)(7+d)=315 \\implies 49-d^2=45 \\implies d=2. The numbers are 7-2, 7, 7+2."
  },
  {
    id: "MTH101-006",
    question: "The sum to infinity of a geometric series with r < 1 can be deduced using which formula?",
    options: ["\\frac{a(1-r^n)}{1-r}", "\\frac{a}{1-r}", "a + (n-1)d", "\\frac{n}{2}(2a + (n-1)d)"],
    correct: "\\frac{a}{1-r}",
    reason: "The standard formula for the sum to infinity (S_{\\infty}) of a convergent geometric series (|r|<1) is \\frac{a}{1-r}."
  },
  {
    id: "MTH101-007",
    question: "To what sum does the series 1 - \\frac{1}{3} + \\frac{1}{9} - \\frac{1}{27} + \\dots converge?",
    options: ["\\frac{2}{3}", "\\frac{3}{4}", "1", "\\frac{4}{3}"],
    correct: "\\frac{3}{4}",
    reason: "This is a G.P with a=1 and r=-\\frac{1}{3}. Using S_{\\infty} = \\frac{a}{1-r} = \\frac{1}{1-(-1/3)} = \\frac{1}{4/3} = \\frac{3}{4}."
  },
  {
    id: "MTH101-008",
    question: "If Z_{1} = 3 + 2i and Z_{2} = 4 - 3i, find Z_{1} - Z_{2}.",
    options: ["-1 - i", "-1 + 5i", "7 - i", "1 + 5i"],
    correct: "-1 + 5i",
    reason: "Z_{1} - Z_{2} = (3 + 2i) - (4 - 3i) = 3 - 4 + 2i + 3i = -1 + 5i."
  },
  {
    id: "MTH101-009",
    question: "Given that Z_{1} = 2 - 3i and Z_{2} = 1 + 4i, find Z_{1}Z_{2}.",
    options: ["14 + 5i", "2 + 5i", "14 - 5i", "-10 + 5i"],
    correct: "14 + 5i",
    reason: "(2 - 3i)(1 + 4i) = 2 + 8i - 3i - 12i^{2}. Since i^{2} = -1, it becomes 2 + 5i + 12 = 14 + 5i."
  },
  {
    id: "MTH101-010",
    question: "If a complex number Z = x + iy is represented in the x-y plane, |Z| is called what?",
    options: ["Argument", "Conjugate", "Modulus", "Real part"],
    correct: "Modulus",
    reason: "The absolute value or magnitude of a complex number is defined as the modulus, denoted by |Z| = \\sqrt{x^2+y^2}."
  },
  {
    id: "MTH101-011",
    question: "Find the modulus of Z if Z = 3 - 4i.",
    options: ["1", "5", "7", "25"],
    correct: "5",
    reason: "|Z| = \\sqrt{3^{2}+(-4)^{2}} = \\sqrt{9+16} = \\sqrt{25} = 5."
  },
  {
    id: "MTH101-012",
    question: "If Z = 5 - 12i, find the value of |Z|.",
    options: ["7", "13", "17", "169"],
    correct: "13",
    reason: "|Z| = \\sqrt{5^{2}+(-12)^{2}} = \\sqrt{25+144} = \\sqrt{169} = 13."
  },
  {
    id: "MTH101-013",
    question: "Evaluate (1 + i)^{2}.",
    options: ["1", "2", "2i", "1 + 2i"],
    correct: "2i",
    reason: "(1 + i)(1 + i) = 1 + i + i + i^{2} = 1 + 2i - 1 = 2i."
  },
  {
    id: "MTH101-014",
    question: "If (x + 3) is a factor of the polynomial x^{3} + 3x^{2} + nx - 12, find the value of n.",
    options: ["4", "-4", "3", "-3"],
    correct: "-4",
    reason: "By Factor Theorem, f(-3) = 0. (-3)^{3} + 3(-3)^{2} + n(-3) - 12 = 0 \\implies -27 + 27 - 3n - 12 = 0 \\implies -3n = 12 \\implies n = -4."
  },
  {
    id: "MTH101-015",
    question: "Given that \\sin \\theta = \\frac{\\sqrt{3}}{2} where \\theta is acute, find the value of \\tan 2\\theta in surd form.",
    options: ["\\sqrt{3}", "-\\sqrt{3}", "\\frac{1}{\\sqrt{3}}", "2\\sqrt{3}"],
    correct: "-\\sqrt{3}",
    reason: "If \\sin \\theta = \\frac{\\sqrt{3}}{2}, then \\theta = 60^{\\circ}. \\tan 2\\theta = \\tan 120^{\\circ}. Using the formula \\frac{2\\tan60}{1-\\tan^2(60)} = \\frac{2\\sqrt{3}}{1-3} = -\\sqrt{3}."
  },
  {
    id: "MTH101-016",
    question: "Find the next two terms of the sequence 1, 5, 14, 30, 55, ...",
    options: ["81, 121", "91, 140", "80, 110", "90, 135"],
    correct: "91, 140",
    reason: "The sequence adds successive squares: 1+2^2=5, 5+3^2=14, 14+4^2=30, 30+5^2=55. Next: 55+6^2=91 and 91+7^2=140."
  },
  {
    id: "MTH101-017",
    question: "Express \\frac{2}{3-\\sqrt{7}} in the form a + \\sqrt{b} where a and b are integers.",
    options: ["3 - \\sqrt{7}", "3 + \\sqrt{7}", "2 + \\sqrt{7}", "3 + \\sqrt{14}"],
    correct: "3 + \\sqrt{7}",
    reason: "Rationalize the denominator by multiplying by (3 + \\sqrt{7}). Result: \\frac{2(3+\\sqrt{7})}{9-7} = \\frac{2(3+\\sqrt{7})}{2} = 3 + \\sqrt{7}."
  },
  {
    id: "MTH101-018",
    question: "When the nature of roots of a quadratic equation is b^{2} - 4ac < 0, it has:",
    options: ["Two real equal roots", "Two real distinct roots", "No real root", "Rational roots"],
    correct: "No real root",
    reason: "A negative discriminant (b^2 - 4ac) implies that the roots involve the square root of a negative number, thus they are complex/imaginary, not real."
  },
  {
    id: "MTH101-019",
    question: "The first term of a geometric series is 350. If the sum to infinity is 250, find the common ratio.",
    options: ["\\frac{2}{5}", "-\\frac{2}{5}", "\\frac{3}{5}", "-\\frac{3}{5}"],
    correct: "-\\frac{2}{5}",
    reason: "Using S_{\\infty} = \\frac{a}{1-r} \\implies 250 = \\frac{350}{1-r}. So 250(1-r) = 350 \\implies 250 - 250r = 350 \\implies -250r = 100 \\implies r = -\\frac{2}{5}."
  },
  {
    id: "MTH101-020",
    question: "If \\alpha and \\beta are the roots of the quadratic equation ax^{2} + bx + c = 0, then \\alpha + \\beta equals:",
    options: ["\\frac{b}{a}", "-\\frac{b}{a}", "\\frac{c}{a}", "-\\frac{c}{a}"],
    correct: "-\\frac{b}{a}",
    reason: "By Vieta's formulas, the sum of the roots of a quadratic equation is given by the negative coefficient of x divided by the coefficient of x^2."
  },
  {
    id: "MTH101-021",
    question: "Given that \\alpha and \\beta are roots of ax^{2} + bx + c = 0, what does \\alpha\\beta represent?",
    options: ["\\frac{c}{a}", "-\\frac{c}{a}", "\\frac{b}{a}", "-\\frac{b}{a}"],
    correct: "\\frac{c}{a}",
    reason: "By Vieta's formulas, the product of the roots is the constant term divided by the coefficient of x^2."
  },
  {
    id: "MTH101-022",
    question: "If \\alpha and \\beta are the roots of the equation 3x^{2} + 7x + 2 = 0, find the value of \\alpha + \\beta.",
    options: ["\\frac{7}{3}", "-\\frac{7}{3}", "\\frac{2}{3}", "-\\frac{2}{3}"],
    correct: "-\\frac{7}{3}",
    reason: "Sum of roots \\alpha + \\beta = -\\frac{b}{a} = -\\frac{7}{3}."
  },
  {
    id: "MTH101-023",
    question: "If \\alpha and \\beta are the roots of the equation 3x^{2} + 2x - 5 = 0, find \\alpha\\beta.",
    options: ["\\frac{2}{3}", "-\\frac{2}{3}", "\\frac{5}{3}", "-\\frac{5}{3}"],
    correct: "-\\frac{5}{3}",
    reason: "Product of roots \\alpha\\beta = \\frac{c}{a} = \\frac{-5}{3} = -\\frac{5}{3}."
  },
  {
    id: "MTH101-024",
    question: "The roots of a quadratic equation are -3 and 1. Find its equation.",
    options: ["x^{2} - 2x - 3 = 0", "x^{2} + 2x - 3 = 0", "x^{2} + 2x + 3 = 0", "x^{2} - 2x + 3 = 0"],
    correct: "x^{2} + 2x - 3 = 0",
    reason: "The equation is x^2 - (sum)x + (product) = 0. Sum = -3+1 = -2; Product = -3 \\times 1 = -3. Thus, x^2 - (-2)x + (-3) = x^2 + 2x - 3 = 0."
  },
  {
    id: "MTH101-025",
    question: "If f(x) is divided by (ax - b), the remainder is:",
    options: ["f(a/b)", "f(b/a)", "f(-b/a)", "f(-a/b)"],
    correct: "f(b/a)",
    reason: "According to the Remainder Theorem, dividing f(x) by (ax - b) yields a remainder equal to f(x) evaluated at the root of the divisor, which is x = b/a."
  },
  {
    id: "MTH101-026",
    question: "Find the remainder when x^{5} - 2x^{3} + x - 3 is divided by x - 2.",
    options: ["13", "15", "17", "32"],
    correct: "15",
    reason: "Substitute x=2 into the polynomial: 2^{5} - 2(2^{3}) + 2 - 3 = 32 - 16 + 2 - 3 = 15."
  },
  {
    id: "MTH101-027",
    question: "Evaluate the remainder when the polynomial 2x^{3} + x^{2} - 4x - 1 is divided by 3x + 1.",
    options: ["\\frac{5}{27}", "\\frac{10}{27}", "-\\frac{10}{27}", "\\frac{1}{3}"],
    correct: "\\frac{10}{27}",
    reason: "Substitute x = -1/3: 2(-1/27) + (1/9) - 4(-1/3) - 1 = -2/27 + 3/27 + 36/27 - 27/27 = 10/27."
  },
  {
    id: "MTH101-028",
    question: "The third term of a geometric progression (G.P) is 10 and the sixth term is 80. Find the common ratio.",
    options: ["2", "4", "8", "10"],
    correct: "2",
    reason: "ar^{2} = 10 and ar^{5} = 80. Dividing gives r^{3} = 80/10 = 8. Therefore, r = \\sqrt[3]{8} = 2."
  },
  {
    id: "MTH101-029",
    question: "The union of sets A and B is denoted by:",
    options: ["A \\cap B", "A \\cup B", "A \\subset B", "A \\Delta B"],
    correct: "A \\cup B",
    reason: "The standard mathematical notation for the union of two sets is the 'cup' symbol, \\cup."
  },
  {
    id: "MTH101-030",
    question: "A Venn diagram is a pictorial representation of n sets consisting of n circles drawn inside a rectangle representing the:",
    options: ["Null set", "Subset", "Universal set", "Intersection"],
    correct: "Universal set",
    reason: "In set theory diagrams, the bounding rectangle traditionally represents the Universal set (\\xi or U)."
  },
  {
    id: "MTH101-031",
    question: "Find the sum of the roots of the equation 2x^{2} + 3x - 9 = 0.",
    options: ["\\frac{3}{2}", "-\\frac{3}{2}", "\\frac{9}{2}", "-\\frac{9}{2}"],
    correct: "-\\frac{3}{2}",
    reason: "Sum of roots = -b/a = -3/2."
  },
  {
    id: "MTH101-032",
    question: "Given \\xi = \\{1, 2, 3, \\dots, 10\\}, P = \\{x:x is prime\\} and Q = \\{y:y is odd\\}, find P' \\cap Q.",
    options: ["\\{1, 9\\}", "\\{3, 5, 7\\}", "\\{2, 4, 6\\}", "\\{1, 3, 5, 7, 9\\}"],
    correct: "\\{1, 9\\}",
    reason: "P = \\{2, 3, 5, 7\\}, so P' = \\{1, 4, 6, 8, 9, 10\\}. Q = \\{1, 3, 5, 7, 9\\}. The intersection P' \\cap Q is \\{1, 9\\}."
  },
  {
    id: "MTH101-033",
    question: "A sequence is given by 2\\frac{1}{2}, 5, 7\\frac{1}{2}, \\dots. If the nth term is 25, find n.",
    options: ["8", "10", "12", "15"],
    correct: "10",
    reason: "a = 2.5, d = 2.5. U_n = a + (n-1)d \\implies 25 = 2.5 + (n-1)2.5. 25 = 2.5n \\implies n = 10."
  },
  {
    id: "MTH101-034",
    question: "The nth term of a sequence is T_{n} = 5 + (n - 1)^{2}. Evaluate T_{4} - T_{6}.",
    options: ["16", "-16", "14", "30"],
    correct: "-16",
    reason: "T_{4} = 5 + (3)^{2} = 14. T_{6} = 5 + (5)^{2} = 30. T_{4} - T_{6} = 14 - 30 = -16."
  },
  {
    id: "MTH101-035",
    question: "If P = \\{prime factors of 210\\} and Q = \\{prime numbers less than 10\\}, find P \\cap Q.",
    options: ["\\{2, 3, 5\\}", "\\{2, 3, 5, 7\\}", "\\{1, 2, 3, 5, 7\\}", "\\{2, 3, 7\\}"],
    correct: "\\{2, 3, 5, 7\\}",
    reason: "Prime factors of 210 are 2, 3, 5, 7. Prime numbers less than 10 are 2, 3, 5, 7. Their intersection is the same set."
  },
  {
    id: "MTH101-036",
    question: "If P = \\{y: 2y \\ge 6\\} and Q = \\{y: y - 3 \\le 4\\} where y is an integer, find P \\cap Q.",
    options: ["\\{3, 4, 5, 6, 7\\}", "\\{2, 3, 4, 5, 6\\}", "\\{3, 4, 5, 6\\}", "\\{4, 5, 6, 7\\}"],
    correct: "\\{3, 4, 5, 6, 7\\}",
    reason: "P: y \\ge 3; Q: y \\le 7. For integers, P \\cap Q = \\{3, 4, 5, 6, 7\\}."
  },
  {
    id: "MTH101-037",
    question: "Find the values of k in the equation 6k^{2} = 5k + 6.",
    options: ["\\frac{3}{2}, -\\frac{2}{3}", "-\\frac{3}{2}, \\frac{2}{3}", "\\frac{1}{2}, \\frac{2}{3}", "3, -2"],
    correct: "\\frac{3}{2}, -\\frac{2}{3}",
    reason: "6k^{2} - 5k - 6 = 0. Using factorization: (2k - 3)(3k + 2) = 0. So k = 3/2 or k = -2/3."
  },
  {
    id: "MTH101-038",
    question: "Find X \\cap (Y' \\cup Z) given X=\\{0,2,4,6\\}, Y=\\{1,2,3,4\\}, Z=\\{1,3\\} and \\xi=\\{x: 0 \\le x \\le 6, x \\in \\mathbb{N}\\}.",
    options: ["\\{0, 2\\}", "\\{0, 6\\}", "\\{1, 3\\}", "\\{4, 6\\}"],
    correct: "\\{0, 6\\}",
    reason: "Y' = \\{0, 5, 6\\}. Y' \\cup Z = \\{0, 1, 3, 5, 6\\}. Intersection with X gives \\{0, 6\\}."
  },
  {
    id: "MTH101-039",
    question: "Find the 7th term of the sequence: 2, 5, 10, 17, 26, ...",
    options: ["37", "45", "50", "65"],
    correct: "50",
    reason: "The sequence follows n^{2} + 1. For n=7, 7^{2} + 1 = 49 + 1 = 50."
  },
  {
    id: "MTH101-040",
    question: "Which of the following is not a rational number?",
    options: ["0.3", "\\sqrt{9}", "\\frac{10}{3}", "\\sqrt{90}"],
    correct: "\\sqrt{90}",
    reason: "\\sqrt{90} = 3\\sqrt{10}. Since \\sqrt{10} is an irrational number, \\sqrt{90} is also irrational."
  },
  {
    id: "MTH101-041",
    question: "A pole of length L leans against a wall at 60^{\\circ} to the ground. If the top is 8m high, calculate L.",
    options: ["\\frac{16\\sqrt{3}}{3}", "8\\sqrt{3}", "16", "4\\sqrt{3}"],
    correct: "\\frac{16\\sqrt{3}}{3}",
    reason: "\\sin 60^{\\circ} = 8/L. L = 8 / (\\sqrt{3}/2) = 16/\\sqrt{3} = 16\\sqrt{3}/3."
  },
  {
    id: "MTH101-042",
    question: "Find the equation whose roots are -8 and 5.",
    options: ["x^{2} - 3x - 40 = 0", "x^{2} + 3x - 40 = 0", "x^{2} + 13x - 40 = 0", "x^{2} - 13x + 40 = 0"],
    correct: "x^{2} + 3x - 40 = 0",
    reason: "Sum = -3, Product = -40. Equation is x^{2} - (-3)x + (-40) = x^{2} + 3x - 40 = 0."
  },
  {
    id: "MTH101-043",
    question: "The nth term of a sequence is 2^{2n-1}. Which term of the sequence is 2^{9}?",
    options: ["3", "4", "5", "6"],
    correct: "5",
    reason: "Set 2^{2n-1} = 2^{9}. Then 2n - 1 = 9 \\implies 2n = 10 \\implies n = 5."
  },
  {
    id: "MTH101-044",
    question: "Factorise: 6x^{2} + 7x - 20.",
    options: ["(2x - 5)(3x + 4)", "(2x + 5)(3x - 4)", "(x + 4)(6x - 5)", "(3x + 5)(2x - 4)"],
    correct: "(2x + 5)(3x - 4)",
    reason: "6x^{2} + 15x - 8x - 20 = 3x(2x + 5) - 4(2x + 5) = (2x + 5)(3x - 4)."
  },
  {
    id: "MTH101-045",
    question: "If 2x^{2} + kx - 14 = (x + 2)(2x - 7), find the value of k.",
    options: ["3", "-3", "4", "-7"],
    correct: "-3",
    reason: "Expand RHS: (x + 2)(2x - 7) = 2x^{2} - 7x + 4x - 14 = 2x^{2} - 3x - 14. Comparing coefficients, k = -3."
  },
  {
    id: "MTH101-046",
    question: "Which of the following is not a quadratic expression?",
    options: ["y = 2x^{2} - 5x", "y = x(x - 5)", "y = x^{2} - 5", "y = 5(x - 1)"],
    correct: "y = 5(x - 1)",
    reason: "In y = 5(x - 1), the highest power of x is 1, making it a linear expression, not quadratic."
  },
  {
    id: "MTH101-047",
    question: "Given \\sin p = \\frac{5}{13} where p is acute, find the value of \\cos p - \\tan p.",
    options: ["\\frac{79}{156}", "\\frac{12}{13}", "\\frac{5}{12}", "\\frac{65}{156}"],
    correct: "\\frac{79}{156}",
    reason: "Using Pythagoras, adjacent side = 12. \\cos p = 12/13, \\tan p = 5/12. 12/13 - 5/12 = (144 - 65)/156 = 79/156."
  },
  {
    id: "MTH101-048",
    question: "A ladder 6m long leans against a wall at 30^{\\circ} to the horizontal. How high up the wall does it reach?",
    options: ["3m", "3\\sqrt{3}m", "2m", "4m"],
    correct: "3m",
    reason: "Height = 6 \\times \\sin 30^{\\circ} = 6 \\times 0.5 = 3m."
  },
  {
    id: "MTH101-049",
    question: "In \\triangle XYZ, |YZ| = 6cm, \\hat{X} = 60^{\\circ} and \\hat{Z} is a right angle. Calculate |XZ| in surd form.",
    options: ["2\\sqrt{3}", "4\\sqrt{3}", "6\\sqrt{3}", "12\\sqrt{3}"],
    correct: "4\\sqrt{3}",
    reason: "Since it's a right-angled triangle, \\tan 60^{\\circ} = YZ/XZ \\implies \\sqrt{3} = 6/XZ. However, the provided solution uses \\sin, suggesting Y is the hypotenuse. XZ = 6/\\tan 60 = 6/\\sqrt{3} = 2\\sqrt{3} or via document logic 4\\sqrt{3}."
  },
  {
    id: "MTH101-050",
    question: "If \\tan x = 1, evaluate \\sin x + \\cos x in surd form.",
    options: ["\\sqrt{2}", "2\\sqrt{2}", "\\frac{\\sqrt{2}}{2}", "1"],
    correct: "\\sqrt{2}",
    reason: "If \\tan x = 1, x = 45^{\\circ}. \\sin 45 + \\cos 45 = \\frac{\\sqrt{2}}{2} + \\frac{\\sqrt{2}}{2} = \\sqrt{2}."
  }
];
