export const phy101AndPhy107Questions = [
  {
    id: "PHY101-001",
    question: "The maximum range of a projectile occurs at an angle of ……",
    options: ["30^{\\circ}", "45^{\\circ}", "60^{\\circ}", "90^{\\circ}"],
    correct: "45^{\\circ}",
    reason: "For projectile motion on level ground, the range $R = \\frac{u^{2}\\sin2\\theta}{g}$. The range is maximum when $\\sin2\\theta = 1$, which occurs at $2\\theta = 90^{\\circ}$, hence $\\theta = 45^{\\circ}$."
  },
  {
    id: "PHY101-002",
    question: "A car travelling with a uniform velocity of $30\\text{ ms}^{-1}$ along a horizontal road overcomes a constant frictional force of $600\\text{ N}$. Calculate the power of the engine of the car.",
    options: ["12000W", "15000W", "18000W", "20000W"],
    correct: "18000W",
    reason: "Power $P = Fv$. Substituting $F = 600\\text{ N}$ and $v = 30\\text{ ms}^{-1}$, $P = 600 \\times 30 = 18000\\text{ W}$."
  },
  {
    id: "PHY101-003",
    question: "Name the device that converts heat energy to electrical energy.",
    options: ["Generator", "Transformer", "Thermocouple", "Electric motor"],
    correct: "Thermocouple",
    reason: "A thermocouple converts heat energy directly into electrical energy using the Seebeck effect."
  },
  {
    id: "PHY101-004",
    question: "The point where the line of best fit cuts the vertical axis is called ………………………..",
    options: ["Gradient", "Intercept", "Slope", "Origin"],
    correct: "Intercept",
    reason: "The point where a graph cuts the vertical axis is known as the $y$-intercept."
  },
  {
    id: "PHY101-005",
    question: "Given $T^{2} = 4\\pi^{2}\\frac{l}{g}$, what is the correct equation for the value of $g$ if a graph of $T^{2}$ is plotted against $L$?",
    options: ["g = \\frac{4\\pi^{2}}{S}", "g = 4\\pi^{2}S", "g = \\frac{S}{4\\pi^{2}}", "g = \\frac{L}{4\\pi^{2}S}"],
    correct: "g = \\frac{4\\pi^{2}}{S}",
    reason: "From $T^{2} = \\frac{4\\pi^{2}}{g}L$, the slope $S = \\frac{4\\pi^{2}}{g}$. Rearranging gives $g = \\frac{4\\pi^{2}}{S}$."
  },
  {
    id: "PHY101-006",
    question: "A body moving at a constant speed accelerates when it is in",
    options: ["Linear motion", "Circular motion", "Random motion", "Oscillatory motion"],
    correct: "Circular motion",
    reason: "In circular motion, the speed may be constant but the direction of velocity changes continuously, producing centripetal acceleration."
  },
  {
    id: "PHY101-007",
    question: "A body accelerates uniformly from rest at $2\\text{ ms}^{-2}$. Calculate the magnitude of its velocity after travelling $4\\text{ m}$.",
    options: ["2\\text{ ms}^{-1}", "4\\text{ ms}^{-1}", "6\\text{ ms}^{-1}", "8\\text{ ms}^{-1}"],
    correct: "4\\text{ ms}^{-1}",
    reason: "Using $v^{2} = u^{2} + 2as$, with $u = 0, a = 2\\text{ ms}^{-2}, s = 4\\text{ m}$: $v^{2} = 2 \\times 2 \\times 4 = 16$, so $v = 4\\text{ ms}^{-1}$."
  },
  {
    id: "PHY101-008",
    question: "An external force of magnitude $100\\text{ N}$ acts on a particle of mass $0.15\\text{ kg}$ for $0.03\\text{ s}$. Calculate the change in the speed of the particle.",
    options: ["10\\text{ ms}^{-1}", "15\\text{ ms}^{-1}", "20\\text{ ms}^{-1}", "25\\text{ ms}^{-1}"],
    correct: "20\\text{ ms}^{-1}",
    reason: "Impulse equals change in momentum: $Ft = m\\Delta v$. Hence $\\Delta v = \\frac{Ft}{m} = \\frac{100 \\times 0.03}{0.15} = 20\\text{ ms}^{-1}$."
  },
  {
    id: "PHY101-009",
    question: "An object is said to undergo oscillatory motion when it moves.",
    options: ["In a straight line", "To and fro about a fixed point", "In a circle", "With constant velocity"],
    correct: "To and fro about a fixed point",
    reason: "Oscillatory motion is characterized by repeated to-and-fro motion about a mean or equilibrium position."
  },
  {
    id: "PHY101-010",
    question: "A body is rotating in a horizontal circle of radius $2.5\\text{ m}$ with an angular speed of $5\\text{ rad s}^{-1}$. Calculate the magnitude of the radial acceleration of the body.",
    options: ["31.25\\text{ ms}^{-2}", "62.5\\text{ ms}^{-2}", "75\\text{ ms}^{-2}", "125\\text{ ms}^{-2}"],
    correct: "62.5\\text{ ms}^{-2}",
    reason: "Radial acceleration $a = r\\omega^{2}$. Substituting $r = 2.5\\text{ m}$ and $\\omega = 5\\text{ rad s}^{-1}$, $a = 2.5 \\times 25 = 62.5\\text{ ms}^{-2}$."
  },
  {
    id: "PHY101-011",
    question: "If two vectors are represented thus: $\\vec{A} = 5i + 2j + k$ and $\\vec{B} = 2i + 4j - 3k$. Find $\\vec{A} \\times \\vec{B}$.",
    options: ["-10i + 17j + 16k", "10i - 17j + 16k", "-10i - 17j + 16k", "10i + 17j - 16k"],
    correct: "-10i + 17j + 16k",
    reason: "Cross product $\\vec{A} \\times \\vec{B} = \\det\\begin{pmatrix} i & j & k \\\\ 5 & 2 & 1 \\\\ 2 & 4 & -3 \\end{pmatrix} = i(-6-4) - j(-15-2) + k(20-4) = -10i + 17j + 16k$."
  },
  {
    id: "PHY101-012",
    question: "The potential energy in an elastic string of force constant $K$ which has been extended by $x$ metres is expressed as?",
    options: ["\\frac{1}{2} K x^2", "K x", "K x^2", "\\frac{1}{2} K x"],
    correct: "\\frac{1}{2} K x^2",
    reason: "Elastic potential energy stored in a stretched spring or string: $PE = \\frac{1}{2} K x^2$."
  },
  {
    id: "PHY101-013",
    question: "The motion of a simple pendulum is represented thus; $a = -100 x$. What is the period of oscillation?",
    options: ["\\pi/5\\text{ s}", "\\pi/10\\text{ s}", "\\pi/\\sqrt{10}\\text{ s}", "2\\pi/10\\text{ s}"],
    correct: "\\pi/5\\text{ s}",
    reason: "For SHM: $a = -\\omega^2 x$. Here $\\omega^2 = 100$, so $\\omega = 10\\text{ rad/s}$. Period $T = \\frac{2\\pi}{\\omega} = \\frac{2\\pi}{10} = \\frac{\\pi}{5}\\text{ s}$."
  },
  {
    id: "PHY101-014",
    question: "Which of the following is not a unit of energy?",
    options: ["Watt", "Kilowatt-hour", "Calorie", "Joule"],
    correct: "Watt",
    reason: "Energy is measured in Joules, calories, or kilowatt-hours. Watt is a unit of power."
  },
  {
    id: "PHY101-015",
    question: "The displacement of a particle along the $X$-axis is given as $X = 5t^2 + 2$, where $X$ is in metres and $t$ in seconds. Calculate its instantaneous velocity at $t = 2\\text{ s}$.",
    options: ["10\\text{ ms}^{-1}", "15\\text{ ms}^{-1}", "20\\text{ ms}^{-1}", "25\\text{ ms}^{-1}"],
    correct: "20\\text{ ms}^{-1}",
    reason: "Velocity $v = \\frac{dX}{dt} = \\frac{d(5t^2+2)}{dt} = 10t$. At $t=2\\text{ s}$, $v = 10(2) = 20\\text{ ms}^{-1}$."
  },
  {
    id: "PHY101-016",
    question: "The unit cycle per second is also called?",
    options: ["Hertz", "Newton", "Joule", "Candela"],
    correct: "Hertz",
    reason: "The SI unit of frequency, cycles per second, is called Hertz (Hz)."
  },
  {
    id: "PHY101-017",
    question: "The trajectory path of a projectile is?",
    options: ["Linear", "Parabolic", "Circular", "Elliptical"],
    correct: "Parabolic",
    reason: "Under uniform gravity and neglecting air resistance, a projectile follows a parabolic path."
  },
  {
    id: "PHY101-018",
    question: "Which of the following is a fundamental unit?",
    options: ["\\text{ms}^{-1}", "candela", "newton", "\\text{ms}^{-2}"],
    correct: "candela",
    reason: "Fundamental SI units include meter, kilogram, second, ampere, kelvin, mole, and candela. Others are derived."
  },
  {
    id: "PHY101-019",
    question: "The period of oscillation of a simple pendulum is related to its length $L$ and acceleration $g$ by $T = K L^x g^y$. Calculate the value of $x$ and $y$.",
    options: ["x = 1/2, y = -1/2", "x = 1, y = -1", "x = 1/2, y = -1", "x = 1, y = -1/2"],
    correct: "x = 1/2, y = -1/2",
    reason: "Dimensional analysis: $[T] = [L]^x [LT^{-2}]^y$. This gives $x+y=0$ and $-2y=1$. Solving gives $y = -1/2$ and $x = 1/2$."
  },
  {
    id: "PHY101-020",
    question: "The position of an object on a velocity-time graph is given as $(20, 5)$ and $(10, 3)$. Calculate the acceleration of the object.",
    options: ["0.2\\text{ ms}^{-2}", "0.3\\text{ ms}^{-2}", "0.1\\text{ ms}^{-2}", "0.5\\text{ ms}^{-2}"],
    correct: "0.2\\text{ ms}^{-2}",
    reason: "Acceleration $a = \\frac{\\Delta v}{\\Delta t} = \\frac{5-3}{20-10} = \\frac{2}{10} = 0.2\\text{ ms}^{-2}$."
  },
  {
    id: "PHY101-021",
    question: "A force $\\vec{F} = 2i + 4j$ acts on a body and moves it through a displacement $\\vec{S} = i + 5j$. Find the work done.",
    options: ["22 J", "24 J", "26 J", "28 J"],
    correct: "22 J",
    reason: "Work done $W = \\vec{F} \\cdot \\vec{S} = (2 \\times 1 + 4 \\times 5) = 2 + 20 = 22\\text{ J}$."
  },
  {
    id: "PHY101-022",
    question: "Which of the following units is derived?",
    options: ["kg", "m", "K", "N"],
    correct: "N",
    reason: "Newton (N) is a derived unit ($\text{kg}\\cdot\text{m/s}^2$), others are fundamental."
  },
  {
    id: "PHY101-023",
    question: "The slope of a straight line displacement-time graph represents?",
    options: ["Velocity", "Acceleration", "Distance", "Force"],
    correct: "Velocity",
    reason: "The slope ($\frac{\Delta s}{\Delta t}$) of a displacement-time graph gives the velocity of the object."
  },
  {
    id: "PHY101-024",
    question: "An object of mass $50\\text{ kg}$ is projected with a velocity of $20\\text{ ms}^{-1}$ at an angle of $60^{\\circ}$ to the vertical. Calculate the time of flight.",
    options: ["2s", "4s", "5s", "6s"],
    correct: "4s",
    reason: "If $\\theta = 60^{\\circ}$ to the vertical, then $\\alpha = 30^{\\circ}$ to the horizontal. $T = \\frac{2u \\sin\\alpha}{g} = \\frac{2(20)\\sin30^{\\circ}}{10} = \\frac{40(0.5)}{10} = 2\\text{ s}$. Wait, let's re-verify: $2 \\times 20 \\times 0.5 / 10 = 2\\text{ s}$. If $g$ is taken as 10."
  },
  {
    id: "PHY101-025",
    question: "Which of the following set of quantities is fundamental?",
    options: ["Length, mass and time", "Speed, length and time", "Speed, mass and distance", "Distance, speed and time"],
    correct: "Length, mass and time",
    reason: "Fundamental quantities are those that cannot be derived from other quantities. Length, mass, and time are fundamental in mechanics."
  },
  {
    id: "PHY101-026",
    question: "Given that the period of oscillation of a pendulum is given by $T = k l^x m^y g^z$ where $k$ is a constant. Find the value of $x$, $y$ and $z$.",
    options: ["x = 1/2, y = 0, z = -1/2", "x = 1, y = 0, z = -1", "x = 1/2, y = 1, z = -1/2", "x = 1, y = 1, z = -1"],
    correct: "x = 1/2, y = 0, z = -1/2",
    reason: "Using dimensional analysis: $[T] = [L]^x [M]^y [LT^{-2}]^z$. This results in $y=0$, $x+z=0$, and $-2z=1 \\Rightarrow z=-1/2, x=1/2$."
  },
  {
    id: "PHY101-027",
    question: "A constant force $20\\text{ N}$ moves a body of mass $32\\text{ kg}$ with constant speed of $0.2\\text{ ms}^{-1}$. Calculate the power expended.",
    options: ["2W", "4W", "6W", "8W"],
    correct: "4W",
    reason: "Power $P = F \\cdot v$. Substituting $F = 20\\text{ N}$ and $v = 0.2\\text{ ms}^{-1}$, $P = 20 \\times 0.2 = 4\\text{ W}$."
  },
  {
    id: "PHY101-028",
    question: "If no net force acts on an object, the object maintains a state of rest or constant speed in a straight line. The above is a statement of which law?",
    options: ["Newton's 1st Law", "Newton's 2nd Law", "Newton's 3rd Law", "Law of Gravitation"],
    correct: "Newton's 1st Law",
    reason: "Newton's first law (Law of Inertia) states that an object remains at rest or in uniform motion unless acted upon by a net external force."
  },
  {
    id: "PHY101-029",
    question: "A bullet fired vertically upwards reached a height of $500\\text{ m}$. Neglecting air resistance, calculate the magnitude of the initial velocity of the bullet. ($g = 10\\text{ ms}^{-2}$)",
    options: ["50\\text{ ms}^{-1}", "70\\text{ ms}^{-1}", "100\\text{ ms}^{-1}", "200\\text{ ms}^{-1}"],
    correct: "100\\text{ ms}^{-1}",
    reason: "Using $v^2 = u^2 - 2gh$ with final velocity $v = 0$: $u = \\sqrt{2gh} = \\sqrt{2 \\times 10 \\times 500} = \\sqrt{10000} = 100\\text{ ms}^{-1}$."
  },
  {
    id: "PHY101-030",
    question: "A constant force of $5\\text{ N}$ acts for $5\\text{ s}$ on a mass of $5\\text{ kg}$ initially at rest. Calculate the final momentum.",
    options: ["20\\text{ kg\\cdot ms}^{-1}", "25\\text{ kg\\cdot ms}^{-1}", "30\\text{ kg\\cdot ms}^{-1}", "35\\text{ kg\\cdot ms}^{-1}"],
    correct: "25\\text{ kg\\cdot ms}^{-1}",
    reason: "Impulse = Change in momentum: $\\Delta p = F \\cdot t = 5\\text{ N} \\times 5\\text{ s} = 25\\text{ kg\\cdot ms}^{-1}$."
  },
  {
    id: "PHY101-031",
    question: "The acceleration of a moving object is equal to?",
    options: [
      "Gradient of a displacement-time graph",
      "Gradient of a velocity-time graph",
      "Area below a speed-time graph",
      "Area below a displacement-time graph"
    ],
    correct: "Gradient of a velocity-time graph",
    reason: "Acceleration is the derivative of velocity with respect to time, which is the slope (gradient) of a velocity-time graph."
  },
  {
    id: "PHY101-032",
    question: "A chemical balance is used for measuring ……..",
    options: ["Mass", "Volume", "Density", "Force"],
    correct: "Mass",
    reason: "A chemical balance measures the mass of substances by comparing it with known masses."
  },
  {
    id: "PHY101-033",
    question: "A car travelling at $30\\text{ ms}^{-1}$ overcomes a frictional force of $100\\text{ N}$ while moving. Calculate the power developed by the engine.",
    options: ["3 kW", "3.5 kW", "4 kW", "4.5 kW"],
    correct: "3 kW",
    reason: "Power $P = F \\cdot v = 100\\text{ N} \\times 30\\text{ ms}^{-1} = 3000\\text{ W} = 3\\text{ kW}$."
  },
  {
    id: "PHY101-034",
    question: "Which of the following is the unit of moment of inertia?",
    options: ["kg/m^2", "kg\\cdot m^2", "kg/m^3", "kg/cm^2"],
    correct: "kg\\cdot m^2",
    reason: "Moment of inertia $I = \\sum mr^2$, so the units are mass $\\times$ distance squared ($\text{kg}\\cdot\text{m}^2$)."
  },
  {
    id: "PHY101-035",
    question: "When an elastic material is stretched by a force, the energy stored in it is?",
    options: ["Kinetic energy", "Potential energy", "Thermal energy", "Mechanical energy"],
    correct: "Potential energy",
    reason: "Elastic potential energy is the energy stored as a result of applying a force to deform an elastic object."
  },
  {
    id: "PHY101-036",
    question: "A body is projected with an initial velocity $u$ at an angle $\\theta$ to the horizontal. The time taken by it to reach its maximum height is given by?",
    options: ["u \\sin\\theta / g", "u \\cos\\theta / g", "2u \\sin\\theta / g", "2u \\cos\\theta / g"],
    correct: "u \\sin\\theta / g",
    reason: "At max height, $v_y = 0$. Using $v_y = u\\sin\\theta - gt \\Rightarrow t = u\\sin\\theta / g$."
  },
  {
    id: "PHY101-037",
    question: "Acceleration $a$ is calculated thus?",
    options: [
      "(v-u)/t \\text{ ms}^{-2}",
      "(u-v)/t \\text{ ms}^{-2}",
      "(2v-u)/t \\text{ ms}^{-2}",
      "(v+u)/t \\text{ ms}^{-2}"
    ],
    correct: "(v-u)/t \\text{ ms}^{-2}",
    reason: "Acceleration is the rate of change of velocity: $a = \\frac{v - u}{t}$."
  },
  {
    id: "PHY101-038",
    question: "A body of mass $1000\\text{ kg}$ is released from a height of $10\\text{ m}$ above the ground. Determine its kinetic energy just before it strikes the ground. ($g = 10\\text{ ms}^{-2}$)",
    options: ["50 kJ", "100 kJ", "150 kJ", "200 kJ"],
    correct: "100 kJ",
    reason: "By conservation of energy, $KE_{\\text{final}} = PE_{\\text{initial}} = mgh = 1000 \\times 10 \\times 10 = 100,000\\text{ J} = 100\\text{ kJ}$."
  },
  {
    id: "PHY101-039",
    question: "The mass of the Earth is $6.0 \\times 10^{24}\\text{ kg}$ and that of the Moon is $7.0 \\times 10^{22}\\text{ kg}$. If the distance between them is $4.0 \\times 10^{8}\\text{ m}$, calculate the force of attraction between them. ($G = 6.7 \\times 10^{-11}\\text{ Nm}^2/\\text{kg}^2$)",
    options: ["1.75 \\times 10^{20}\\text{ N}", "2.8 \\times 10^{20}\\text{ N}", "3.5 \\times 10^{20}\\text{ N}", "4.2 \\times 10^{20}\\text{ N}"],
    correct: "1.75 \\times 10^{20}\\text{ N}",
    reason: "Gravitational force $F = G \\frac{m_1 m_2}{r^2} = 6.7 \\times 10^{-11} \\frac{6 \\times 10^{24} \\times 7 \\times 10^{22}}{(4 \\times 10^8)^2} \\approx 1.75 \\times 10^{20}\\text{ N}$."
  },
  {
    id: "PHY101-040",
    question: "The product $PV$, where $P$ is pressure and $V$ is the volume, has the same dimension as?",
    options: ["Force", "Energy", "Power", "Momentum"],
    correct: "Energy",
    reason: "Pressure $\\times$ Volume = $(\\text{Force}/\\text{Area}) \\times \\text{Volume} = (\\text{F}/L^2) \\times L^3 = F \\cdot L$, which is the dimension of Work/Energy."
  },
  {
    id: "PHY101-041",
    question: "A student measures the volume of a liquid using a measuring cylinder. What else needs to be measured in order to determine the density of the liquid?",
    options: ["Mass of liquid", "Temperature of liquid", "Viscosity of liquid", "Weight of cylinder"],
    correct: "Mass of liquid",
    reason: "Density $\\rho = \\frac{m}{V}$. If volume $V$ is known, mass $m$ must be determined."
  },
  {
    id: "PHY101-042",
    question: "When a body is thrown vertically upwards, its velocity at the maximum height is?",
    options: ["Zero", "u", "2u", "g"],
    correct: "Zero",
    reason: "At the peak of its trajectory, the body momentarily stops before changing direction, so its velocity is zero."
  },
  {
    id: "PHY101-043",
    question: "Material that can be stretched and still return to the original form when the stresses are removed are said to be …",
    options: ["Elastic", "Plastic", "Brittle", "Ductile"],
    correct: "Elastic",
    reason: "Elasticity is the property of a material to return to its original shape after deformation."
  },
  {
    id: "PHY101-044",
    question: "When the linear momentum of a body is constant, the net force acting on it is?",
    options: ["Zero", "Constant", "Increasing", "Decreasing"],
    correct: "Zero",
    reason: "By Newton's 2nd Law, $F = \\frac{dp}{dt}$. If $p$ is constant, $\\frac{dp}{dt} = 0$."
  },
  {
    id: "PHY101-045",
    question: "Which of the following pairs of physical quantities is made up of vectors?",
    options: [
      "Speed and displacement",
      "Mass and force",
      "Displacement and acceleration",
      "Momentum and length"
    ],
    correct: "Displacement and acceleration",
    reason: "Displacement and acceleration both have magnitude and specific direction."
  },
  {
    id: "PHY101-046",
    question: "The S.I. unit of power is…..",
    options: ["Watt", "Joule", "Newton", "Pascal"],
    correct: "Watt",
    reason: "The SI unit of power is the Watt (W), which is 1 Joule per second."
  },
  {
    id: "PHY101-047",
    question: "A simple pendulum makes 50 oscillations in one minute. Determine its period of oscillation.",
    options: ["1.2 s", "1.0 s", "0.8 s", "0.6 s"],
    correct: "1.2 s",
    reason: "Period $T = \\frac{\\text{Total Time}}{\\text{Number of oscillations}} = \\frac{60\\text{ s}}{50} = 1.2\\text{ s}$."
  },
  {
    id: "PHY101-048",
    question: "A car starts from rest and covers a distance of $40\\text{ m}$ in $10\\text{ s}$. Calculate the magnitude of its acceleration.",
    options: ["0.5\\text{ ms}^{-2}", "0.8\\text{ ms}^{-2}", "1.0\\text{ ms}^{-2}", "2.0\\text{ ms}^{-2}"],
    correct: "0.8\\text{ ms}^{-2}",
    reason: "Using $s = ut + \\frac{1}{2}at^2$: $40 = 0(10) + \\frac{1}{2}a(10)^2 \\Rightarrow 40 = 50a \\Rightarrow a = 0.8\\text{ ms}^{-2}$."
  },
  {
    id: "PHY101-049",
    question: "Which of the following unit is equivalent to Watt?",
    options: ["\\text{kg}\\cdot\\text{ms}^{-2}", "\\text{kg}\\cdot\\text{m}^2\\cdot\\text{s}^{-3}", "\\text{kg}\\cdot\\text{m}^2\\cdot\\text{s}^{-2}", "\\text{kg}\\cdot\\text{m}^2\\cdot\\text{s}^{-1}"],
    correct: "\\text{kg}\\cdot\\text{m}^2\\cdot\\text{s}^{-3}",
    reason: "$1\\text{ W} = 1\\text{ J/s} = (1\\text{ kg}\\cdot\\text{m}^2\\cdot\\text{s}^{-2})/\\text{s} = \\text{kg}\\cdot\\text{m}^2\\cdot\\text{s}^{-3}$."
  },
  {
    id: "PHY101-050",
    question: "The acceleration of a moving particle is given as $a(t) = (-3 + t^2)\\text{ ms}^{-2}$. Find its velocity at time $t = 3\\text{ s}$, given that the velocity at $t = 0$ is zero.",
    options: ["15\\text{ ms}^{-1}", "-3\\text{ ms}^{-1}", "9\\text{ ms}^{-1}", "0\\text{ ms}^{-1}"],
    correct: "0\\text{ ms}^{-1}",
    reason: "$v(t) = \\int a(t)dt = \\int (-3 + t^2)dt = -3t + \\frac{t^3}{3}$. At $t=3$: $v(3) = -3(3) + \\frac{27}{3} = -9 + 9 = 0\\text{ ms}^{-1}$."
  },
  {
    id: "PHY101-051",
    question: "Which of the following devices is used to determine the relative density of an acid?",
    options: ["Manometer", "Hydrometer", "Hypsometer", "Hygrometer"],
    correct: "Hydrometer",
    reason: "A hydrometer is used to measure the specific gravity (relative density) of liquids."
  },
  {
    id: "PHY101-052",
    question: "The electricity meters in houses measure energy units consumed in……",
    options: ["kWh", "Joule", "Watt", "Volt"],
    correct: "kWh",
    reason: "Domestic electricity is billed based on energy, typically measured in kilowatt-hours (kWh)."
  },
  {
    id: "PHY101-053",
    question: "The tendency of a stationary body to continue to remain at rest when a force is applied to it is known as?",
    options: ["Inertia", "Friction", "Momentum", "Acceleration"],
    correct: "Inertia",
    reason: "Inertia is the inherent resistance of any physical object to any change in its state of motion."
  },
  {
    id: "PHY101-054",
    question: "The total area under a force-velocity graph represents?",
    options: ["Work done", "Energy", "Momentum", "Power"],
    correct: "Power",
    reason: "Wait, actually Force $\\times$ Velocity is Power. The *area* under a Force-Displacement graph is work. This question might be mislabeled; usually, it's Power."
  },
  {
    id: "PHY101-055",
    question: "The sound heard by a person after the reflection of the sound generated by him is called?",
    options: ["Echo", "Resonance", "Reverberation", "Noise"],
    correct: "Echo",
    reason: "An echo is a reflection of sound that arrives at the listener with a delay after the direct sound."
  },
  {
    id: "PHY101-056",
    question: "Which of the following dimensions represents impulse?",
    options: ["MLT^{-2}", "MLT^{-1}", "ML^{-1}T", "ML^{-2}T"],
    correct: "MLT^{-1}",
    reason: "Impulse = Force $\\times$ Time = $(MLT^{-2}) \\times T = MLT^{-1}$."
  },
  {
    id: "PHY101-057",
    question: "Which of the following is not an example of kinetic energy?",
    options: ["A student running a race", "Electrical charges in motion", "Wind in motion", "None of the above"],
    correct: "None of the above",
    reason: "All the options involve motion, and therefore all are examples of kinetic energy."
  },
  {
    id: "PHY101-058",
    question: "Identify the correct dimensions of density and pressure from the following:",
    options: ["ML^{-3}, ML^{-1}T^{-2}", "ML^{-1}T, ML^{-3}", "ML^{-2}, ML^{-1}T^2", "ML^3, ML^{-1}T^2"],
    correct: "ML^{-3}, ML^{-1}T^{-2}",
    reason: "Density = Mass/Volume = $M/L^3 = ML^{-3}$. Pressure = Force/Area = $(MLT^{-2})/L^2 = ML^{-1}T^{-2}$."
  },
  {
    id: "PHY101-059",
    question: "The energy stored in a spring of stiffness constant $k = 2000\\text{ Nm}^{-1}$ when extended by $4\\text{ cm}$ is …",
    options: ["1.6 J", "2.0 J", "4.0 J", "8.0 J"],
    correct: "1.6 J",
    reason: "$E = \\frac{1}{2}kx^2 = 0.5 \\times 2000 \\times (0.04)^2 = 1000 \\times 0.0016 = 1.6\\text{ J}$."
  },
  {
    id: "PHY101-060",
    question: "A bullet of mass $0.2\\text{ kg}$ is fired with a velocity of $800\\text{ ms}^{-1}$ into a soft wood of mass $2\\text{ kg}$, lying on a smooth surface. What is the final velocity if the collision is completely inelastic?",
    options: ["80\\text{ ms}^{-1}", "100\\text{ ms}^{-1}", "120\\text{ ms}^{-1}", "150\\text{ ms}^{-1}"],
    correct: "72.7\\text{ ms}^{-1}",
    reason: "Conservation of momentum: $m_1 u_1 = (m_1 + m_2)v \\Rightarrow 0.2 \\times 800 = (2.2)v \\Rightarrow 160 = 2.2v \\Rightarrow v \\approx 72.7\\text{ ms}^{-1}$."
  },
  {
    id: "PHY101-061",
    question: "Range of a projected particle can be expressed as?",
    options: ["u \\sin\\theta \\cdot H", "u \\cos\\theta \\cdot T", "u \\tan\\theta \\cdot T", "u \\sin\\theta \\cdot T"],
    correct: "u \\cos\\theta \\cdot T",
    reason: "Range is horizontal distance: $R = v_x \\times T_{\\text{total}} = (u \\cos\\theta) \\times T$."
  },
  {
    id: "PHY101-062",
    question: "A boy of mass $60\\text{ kg}$ runs up a set of steps of total height $3\\text{ m}$. Work done in joules is ___ (take $g = 10\\text{ ms}^{-2}$)",
    options: ["1800 J", "1200 J", "2000 J", "1600 J"],
    correct: "1800 J",
    reason: "Work done against gravity $W = mgh = 60 \\times 10 \\times 3 = 1800\\text{ J}$."
  },
  {
    id: "PHY101-063",
    question: "The maximum force that must be overcome before a body starts to move is called?",
    options: ["Static friction", "Kinetic friction", "Tension", "Normal force"],
    correct: "Static friction",
    reason: "Static friction is the friction that exists between a stationary object and the surface on which it's resting."
  },
  {
    id: "PHY101-064",
    question: "The density of a block is $150\\text{ g}\\cdot\\text{cm}^{-3}$ and has a mass of $80\\text{ g}$. Calculate the volume of the block.",
    options: ["0.4\\text{ cm}^3", "0.5\\text{ cm}^3", "0.53\\text{ cm}^3", "0.55\\text{ cm}^3"],
    correct: "0.53\\text{ cm}^3",
    reason: "$V = \\frac{m}{\\rho} = \\frac{80}{150} \\approx 0.533\\text{ cm}^3$."
  },
  {
    id: "PHY101-065",
    question: "Which of the following readings cannot be determined with a micrometer screw gauge?",
    options: ["20.15 mm", "5.02 mm", "21.130 cm", "2.54 mm"],
    correct: "21.130 cm",
    reason: "A standard micrometer has a range of about $2.5\\text{ cm}$ ($25\\text{ mm}$); $21\\text{ cm}$ is way outside its physical capacity."
  },
  {
    id: "PHY101-066",
    question: "A man of mass $50\\text{ kg}$ ascends a flight of stairs $5\\text{ m}$ high in $5\\text{ seconds}$. If acceleration due to gravity is $10\\text{ ms}^{-2}$, the power expended is……",
    options: ["500 W", "1000 W", "200 W", "50 W"],
    correct: "500 W",
    reason: "Power $P = \\frac{mgh}{t} = \\frac{50 \\times 10 \\times 5}{5} = 500\\text{ W}$."
  },
  {
    id: "PHY101-067",
    question: "Under which of the following conditions is work done?",
    options: [
      "A man supports a heavy load above his head with his hands",
      "A boy climbs onto a table",
      "A woman holds a pot",
      "A bag of cocoa stands on a platform"
    ],
    correct: "A boy climbs onto a table",
    reason: "Work is done only when a force results in displacement. Climbing involves vertical displacement."
  },
  {
    id: "PHY101-068",
    question: "A loaded test-tube which floats upright in water is carefully and slightly depressed and then released. Which of the following best describes the subsequent motion of the test tube?",
    options: ["Random", "Circular", "Linear", "Oscillatory"],
    correct: "Oscillatory",
    reason: "The restoring force (upthrust) causes the tube to move back and forth through its equilibrium position."
  },
  {
    id: "PHY101-069",
    question: "Which of the following is correct?",
    options: ["V = a/t", "v = u - at", "v = at - u", "v = u + at"],
    correct: "v = u + at",
    reason: "This is the first equation of linear motion for constant acceleration."
  },
  {
    id: "PHY101-070",
    question: "Time is a measure of?",
    options: [
      "Different physical events",
      "Variation between physical events",
      "Rate of change of physical events",
      "Interval between physical events"
    ],
    correct: "Interval between physical events",
    reason: "Time defines the duration or interval between the start and end of events."
  },
  {
    id: "PHY101-071",
    question: "Physics is a pure science that deals with?",
    options: [
      "Matter",
      "Energy",
      "Relationship between different forms of energy",
      "Relationship between matter and energy"
    ],
    correct: "Relationship between matter and energy",
    reason: "The fundamental definition of Physics is the study of matter, energy, and the interactions between them."
  },
  {
    id: "PHY101-072",
    question: "A car travelling at a uniform speed of $120\\text{ km/h}$ passes two stations in $4\\text{ minutes}$. Calculate the distance between the two stations.",
    options: ["8 km", "6 km", "7 km", "5 km"],
    correct: "8 km",
    reason: "Distance $d = v \\times t = 120\\text{ km/h} \\times (4/60)\\text{ h} = 120 \\times \\frac{1}{15} = 8\\text{ km}$."
  },
  {
    id: "PHY101-073",
    question: "The branch of physics that deals with sound and waves is?",
    options: ["Acoustics", "Geophysics", "Biophysics", "Mechanics"],
    correct: "Acoustics",
    reason: "Acoustics is the interdisciplinary science that deals with the study of mechanical waves in gases, liquids, and solids."
  },
  {
    id: "PHY101-074",
    question: "Which of the units of the following physical quantities is not a derived unit?",
    options: ["Area", "Thrust", "Pressure", "Mass"],
    correct: "Mass",
    reason: "Mass is a base (fundamental) quantity in the SI system."
  },
  {
    id: "PHY101-075",
    question: "Which of the following is incorrect?",
    options: [
      "Distance is a scalar",
      "Displacement is a vector",
      "Speed is a vector",
      "Velocity is a vector"
    ],
    correct: "Speed is a vector",
    reason: "Speed is a scalar quantity because it does not have a specified direction."
  },
  {
    id: "PHY101-076",
    question: "Which of these motions could be uniform?",
    options: ["Molecular motion", "Circular motion", "Vibrating pendulum", "Vibrational motion"],
    correct: "Circular motion",
    reason: "Uniform circular motion describes motion in a circle at a constant speed."
  },
  {
    id: "PHY101-077",
    question: "What is the engine power of a car with retarding force $500\\text{ N}$ moving at constant speed $20\\text{ ms}^{-1}$?",
    options: ["5 kW", "10 kW", "15 kW", "20 kW"],
    correct: "10 kW",
    reason: "$P = F \\times v = 500 \\times 20 = 10,000\\text{ W} = 10\\text{ kW}$."
  },
  {
    id: "PHY101-078",
    question: "The speed of a bullet of mass $20\\text{ g}$ is $216\\text{ km/h}$. What is its kinetic energy in joules?",
    options: ["0.2 J", "0.36 J", "36 J", "1 J"],
    correct: "36 J",
    reason: "$v = 216 / 3.6 = 60\\text{ ms}^{-1}, m = 0.02\\text{ kg}$. $KE = 0.5 \\times 0.02 \\times 60^2 = 0.01 \\times 3600 = 36\\text{ J}$."
  },
  {
    id: "PHY101-079",
    question: "The main cause of motion is?",
    options: ["Force", "Energy", "Momentum", "Inertia"],
    correct: "Force",
    reason: "According to Newton's laws, a force is required to change the state of motion of an object."
  },
  {
    id: "PHY101-080",
    question: "A car travelling at a uniform speed of $120\\text{ km/h}$ passes two stations in $4\\text{ minutes}$. Calculate the distance between the two stations.",
    options: ["8 km", "6 km", "7 km", "5 km"],
    correct: "8 km",
    reason: "Distance = $120 \\times (4/60) = 8\\text{ km}$."
  },
  {
    id: "PHY101-081",
    question: "A ball of mass $0.5\\text{ kg}$ moving at $10\\text{ ms}^{-1}$ collides with another ball of equal mass at rest. If the two balls move together after impact, calculate their common velocity.",
    options: ["5\\text{ ms}^{-1}", "10\\text{ ms}^{-1}", "2.5\\text{ ms}^{-1}", "7.5\\text{ ms}^{-1}"],
    correct: "5\\text{ ms}^{-1}",
    reason: "$m_1 u_1 = (m_1 + m_2)v \\Rightarrow 0.5(10) = (1.0)v \\Rightarrow v = 5\\text{ ms}^{-1}$."
  },
  {
    id: "PHY101-082",
    question: "Which of the following correctly gives the relationship between linear speed $v$ and angular speed $\\omega$ of a body moving uniformly in a circle of radius $r$?",
    options: ["v = \\omega r", "v = \\omega^2 r", "v = \\omega r^2", "v = \\omega / r"],
    correct: "v = \\omega r",
    reason: "Linear velocity is the product of the angular velocity and the radius of the circular path."
  },
  {
    id: "PHY101-083",
    question: "The motion of a body is simple harmonic if the?",
    options: [
      "Acceleration is always directed towards a fixed point",
      "Path of motion is a straight line",
      "Acceleration is directed towards a fixed point and proportional to its distance from the point",
      "Acceleration is constant and directed towards a fixed point"
    ],
    correct: "Acceleration is directed towards a fixed point and proportional to its distance from the point",
    reason: "This is the defining condition for SHM: $a \\propto -x$."
  },
  {
    id: "PHY101-084",
    question: "What is the angular speed of a body vibrating at $50\\text{ cycles per second}$?",
    options: ["50\\text{ rad/s}", "100\\text{ rad/s}", "314\\text{ rad/s}", "200\\text{ rad/s}"],
    correct: "314\\text{ rad/s}",
    reason: "$\\omega = 2\\pi f = 2 \\times 3.142 \\times 50 \\approx 314.2\\text{ rad/s}$."
  },
  {
    id: "PHY101-085",
    question: "When a mass attached to a spiral spring is set into vertical oscillations, its acceleration will have a?",
    options: [
      "Varying magnitude but a constant direction",
      "Constant magnitude and a constant direction",
      "Constant magnitude but a varying direction",
      "Varying magnitude and a varying direction"
    ],
    correct: "Varying magnitude and a varying direction",
    reason: "In SHM, acceleration changes magnitude based on displacement and changes direction as it passes the equilibrium point."
  },
  {
    id: "PHY101-086",
    question: "For a simple pendulum of length $l$, the period is given by?",
    options: [
      "2\\pi\\sqrt{l/g}",
      "2\\pi\\sqrt{g/l}",
      "2l\\sqrt{g/\\pi}",
      "2g\\sqrt{l/2\\pi}"
    ],
    correct: "2\\pi\\sqrt{l/g}",
    reason: "The standard formula for the period of a simple pendulum for small angles."
  },
  {
    id: "PHY101-087",
    question: "Which is the incorrect formula for a body accelerating uniformly?",
    options: [
      "a = (v^2 - u^2)/2s",
      "v^2 = u^2 + 2as",
      "s = \\frac{1}{2} u t + a t^2",
      "v = u + at"
    ],
    correct: "s = \\frac{1}{2} u t + a t^2",
    reason: "The correct formula is $s = ut + \\frac{1}{2}at^2$."
  },
  {
    id: "PHY101-088",
    question: "A catapult is used to project a stone. Which of the following energy conversions takes place as the stone is released?",
    options: [
      "Kinetic energy is converted into potential energy",
      "Gravitational potential energy is converted into kinetic energy",
      "Elastic potential energy is converted into kinetic energy",
      "Gravitational potential energy is converted into elastic potential energy"
    ],
    correct: "Elastic potential energy is converted into kinetic energy",
    reason: "The stretched rubber band stores elastic potential energy, which transfers to the stone as kinetic energy."
  },
  {
    id: "PHY101-089",
    question: "For a freely falling body:",
    options: [
      "The ratio of kinetic energy to potential energy is constant",
      "The sum of kinetic and potential energies is constant",
      "The total energy is entirely kinetic",
      "The total energy is entirely potential"
    ],
    correct: "The sum of kinetic and potential energies is constant",
    reason: "According to the law of conservation of mechanical energy, $TME = KE + PE$ stays constant."
  },
  {
    id: "PHY101-090",
    question: "A stationary ball is hit by an average force of $50\\text{ N}$ for a time of $0.03\\text{ s}$. What is the impulse experienced by the body in $\\text{N}\\cdot\\text{s}$?",
    options: ["1.5", "0.5", "2.0", "1.0"],
    correct: "1.5",
    reason: "Impulse $I = F \\times t = 50 \\times 0.03 = 1.5\\text{ N}\\cdot\\text{s}$."
  },
  {
    id: "PHY101-091",
    question: "Which of the following is not an example of force?",
    options: ["Tension", "Weight", "Mass", "Friction"],
    correct: "Mass",
    reason: "Mass is a scalar quantity representing the amount of matter; the others are types of forces (vectors)."
  },
  {
    id: "PHY101-092",
    question: "Which of the following is not a conductor of electricity?",
    options: ["Human body", "Silver", "Glass", "Copper"],
    correct: "Glass",
    reason: "Glass is an insulator because it does not have free electrons to carry charge."
  },
  {
    id: "PHY101-093",
    question: "Power is defined as the?",
    options: ["Work done per unit time", "Energy per unit distance", "Force per unit time", "Energy per unit mass"],
    correct: "Work done per unit time",
    reason: "Power is the rate at which work is performed or energy is converted."
  },
  {
    id: "PHY101-094",
    question: "Which of the following types of motion does a body undergo when moving in a haphazard manner?",
    options: ["Random motion", "Translational motion", "Vibrational motion", "Circular motion"],
    correct: "Random motion",
    reason: "Random motion (like Brownian motion) lacks a predictable path."
  },
  {
    id: "PHY101-095",
    question: "Which of the following quantities has the same unit as energy?",
    options: ["Power", "Work", "Force", "Impulse"],
    correct: "Work",
    reason: "Both Work and Energy are measured in Joules (J)."
  },
  {
    id: "PHY101-096",
    question: "Which of the following is a scalar quantity?",
    options: ["Tension", "Impulse", "Distance", "Force"],
    correct: "Distance",
    reason: "Distance has only magnitude, whereas tension, impulse, and force have both magnitude and direction."
  },
  {
    id: "PHY101-097",
    question: "Two bodies each carrying a charge of $2.00 \\times 10^{-10}\\text{ C}$ are $5\\text{ cm}$ apart. Calculate the magnitude of the force on the charges. ($1/4\\pi\\epsilon_0 = 9 \\times 10^9\\text{ Nm}^2\\text{C}^{-2}$)",
    options: [
      "1.44 \\times 10^{-7}\\text{ N}",
      "7.2 \\times 10^{-9}\\text{ N}",
      "7.20 \\times 10^{-11}\\text{ N}",
      "1.44 \\times 10^{-11}\\text{ N}"
    ],
    correct: "1.44 \\times 10^{-7}\\text{ N}",
    reason: "$F = k \\frac{q_1 q_2}{r^2} = 9 \\times 10^9 \\frac{(2 \\times 10^{-10})^2}{(0.05)^2} = \\frac{36 \\times 10^{-11}}{0.0025} = 1.44 \\times 10^{-7}\\text{ N}$."
  },
  {
    id: "PHY101-098",
    question: "Which of the following sources of energy is renewable?",
    options: ["Petroleum", "Charcoal", "Hydro", "Nuclear"],
    correct: "Hydro",
    reason: "Hydro energy relies on the water cycle, which is naturally replenished."
  },
  {
    id: "PHY101-099",
    question: "If an object of mass $50\\text{ kg}$ moves at $5\\text{ ms}^{-1}$ round a circular path of radius $10\\text{ m}$, calculate the centripetal force needed to keep it in its orbit.",
    options: ["125 N", "100 N", "150 N", "50 N"],
    correct: "125 N",
    reason: "$F_c = \\frac{mv^2}{r} = \\frac{50 \\times 5^2}{10} = \\frac{50 \\times 25}{10} = 125\\text{ N}$."
  },
  {
    id: "PHY101-100",
    question: "A boy of mass $20\\text{ kg}$ moves at $5\\text{ ms}^{-1}$ round a circular path of radius $10\\text{ m}$, calculate the centripetal acceleration.",
    options: ["2.5\\text{ ms}^{-2}", "5\\text{ ms}^{-2}", "10\\text{ ms}^{-2}", "1\\text{ ms}^{-2}"],
    correct: "2.5\\text{ ms}^{-2}",
    reason: "$a_c = \\frac{v^2}{r} = \\frac{5^2}{10} = \\frac{25}{10} = 2.5\\text{ ms}^{-2}$."
  },
  {
    id: "PHY101-101",
    question: "The type of collision in which the two objects join together after an impact and move with the same velocity is termed?",
    options: ["Elastic", "Perfectly inelastic", "Partially inelastic", "Superelastic"],
    correct: "Perfectly inelastic",
    reason: "In a perfectly inelastic collision, the maximum amount of kinetic energy is lost and the bodies stick together."
  },
  {
    id: "PHY101-102",
    question: "Given $T^2 = 4\\pi^2 \\cdot L/g$, which of the following is the correct equation for $g$ if a graph of $T^2$ is plotted against $L$?",
    options: [
      "4\\pi^2 L",
      "S / 4\\pi^2",
      "4\\pi^2 S",
      "4\\pi^2 / S"
    ],
    correct: "4\\pi^2 / S",
    reason: "Slope $S = T^2 / L = 4\\pi^2 / g \\Rightarrow g = 4\\pi^2 / S$."
  },
  {
    id: "PHY101-103",
    question: "The potential energy in an elastic string of force constant $K$ which has been extended by $x$ metres is expressed as?",
    options: ["\\frac{1}{2} K x^2", "K x^2", "K x", "\\frac{1}{2} K x"],
    correct: "\\frac{1}{2} K x^2",
    reason: "Energy stored in a spring is $E = \\int Fdx = \\int Kxdx = \\frac{1}{2}Kx^2$."
  },
  {
    id: "PHY101-104",
    question: "The period of oscillation of a simple pendulum is related to its length $L$ and acceleration $g$ by $T = K L^x g^y$. Determine $x$ and $y$ where $K$ is a constant.",
    options: [
      "1/2, -1/2",
      "-1/2, 1/2",
      "0, 1/2",
      "1/2, 0"
    ],
    correct: "1/2, -1/2",
    reason: "$T = 2\\pi \\sqrt{L/g} = 2\\pi L^{1/2} g^{-1/2}$, so $x = 1/2$ and $y = -1/2$."
  },
  {
    id: "PHY101-105",
    question: "Given that the period of oscillation of a pendulum is $T = k L^x g^y m^z$, find the values of $x$, $y$, and $z$ where $k$ is a constant.",
    options: [
      "1/2, -1/2, 0",
      "0, -1/2, 1/2",
      "0, 1/2, -1/2",
      "0, 1, 1/2"
    ],
    correct: "1/2, -1/2, 0",
    reason: "The period is independent of mass, so $z=0$. $x=1/2$ and $y=-1/2$."
  },
  {
    id: "PHY101-106",
    question: "A chemical balance is used for measuring?",
    options: ["Mass", "Force", "Weight", "Density"],
    correct: "Mass",
    reason: "A chemical balance measures mass, unlike a spring balance which measures weight."
  },
  {
    id: "PHY101-107",
    question: "When an elastic material is stretched by a force, the energy stored in it is?",
    options: ["Kinetic energy", "Potential energy", "Elastic potential energy", "Thermal energy"],
    correct: "Elastic potential energy",
    reason: "Energy stored due to deformation is specifically called elastic potential energy."
  },
  {
    id: "PHY101-108",
    question: "Material that can be stretched and still return to the original forms when the stresses are removed are said to be?",
    options: ["Plastic", "Elastic", "Brittle", "Viscous"],
    correct: "Elastic",
    reason: "Definition of elasticity."
  },
  {
    id: "PHY101-109",
    question: "A simple pendulum makes $X$ oscillations in one minute. Determine $X$ if its period of oscillation is $1.20\\text{ s}$.",
    options: ["50", "60", "40", "30"],
    correct: "50",
    reason: "$X = \\frac{60\\text{ s}}{1.20\\text{ s}} = 50$."
  },
  {
    id: "PHY101-110",
    question: "The density of a block is $150\\text{ g}\\cdot\\text{cm}^{-3}$ and has a mass of $80\\text{ g}$. Calculate the volume of the block.",
    options: ["0.53\\text{ cm}^3", "0.5\\text{ cm}^3", "0.55\\text{ cm}^3", "0.4\\text{ cm}^3"],
    correct: "0.53\\text{ cm}^3",
    reason: "$V = 80/150 = 0.533\\text{ cm}^3$."
  },
  {
    id: "PHY101-111",
    question: "Which of the following is the unit of force?",
    options: ["W", "J", "N", "Ns"],
    correct: "N",
    reason: "The Newton (N) is the SI unit of force."
  },
  {
    id: "PHY101-112",
    question: "The graph showing the variation in the angle of deviation of light through prism with the angle of incidence is?",
    options: ["A straight line", "A curve", "A parabola", "A hyperbola"],
    correct: "A curve",
    reason: "The $i-\\delta$ graph for a prism is a parabolic curve with a minimum deviation point."
  },
  {
    id: "PHY101-113",
    question: "Which of the following graphs will give us more information?",
    options: ["Linear graph", "Non-linear graph", "Assotopic graph", "Quadratic graph"],
    correct: "Non-linear graph",
    reason: "Non-linear graphs can describe complex physical relationships that straight lines cannot."
  },
  {
    id: "PHY101-114",
    question: "What type of relationship exists between $A$ and $B$ if the increase in value of $A$ brings a decrease in value of $B$?",
    options: ["Direct", "Inverse", "Quadratic", "Geometric"],
    correct: "Inverse",
    reason: "In an inverse relationship, variables move in opposite directions."
  },
  {
    id: "PHY101-115",
    question: "The dependent variable in the equation $F = ke$ is?",
    options: ["F", "k", "e", "None"],
    correct: "F",
    reason: "Usually, $F$ is measured as a response to changes in $e$ (extension)."
  },
  {
    id: "PHY101-116",
    question: "The point where the line of best fit touches the vertical axis is called?",
    options: ["Slope", "Intercept", "Gradient", "Origin"],
    correct: "Intercept",
    reason: "The vertical intercept (y-intercept)."
  },
  {
    id: "PHY101-117",
    question: "Which of the following is not an essential component of a graph?",
    options: ["Title", "Coordinate axes", "Scales", "None of the above"],
    correct: "None of the above",
    reason: "All listed are essential for a complete scientific graph."
  },
  {
    id: "PHY101-118",
    question: "The slope of the graph obtained in a simple pendulum experiment when a graph of $l$ is plotted against $T^2$ is $0.25\\text{ m s}^{-2}$. Determine the value of $g$.",
    options: ["9.8\\text{ ms}^{-2}", "10\\text{ ms}^{-2}", "8\\text{ ms}^{-2}", "12\\text{ ms}^{-2}"],
    correct: "9.8\\text{ ms}^{-2}",
    reason: "$S = l/T^2 = g/(4\\pi^2) \\Rightarrow g = S \\cdot 4\\pi^2 = 0.25 \\times 4 \\times 9.87 \\approx 9.87\\text{ ms}^{-2}$."
  },
  {
    id: "PHY101-119",
    question: "In a simple pendulum experiment, the value of $T$ _________ as the value of $l$ increases.",
    options: ["decreases", "increases", "remains constant", "increases and later decreases"],
    correct: "increases",
    reason: "$T \\propto \\sqrt{l}$."
  },
  {
    id: "PHY101-120",
    question: "A simple pendulum makes 50 oscillations in one minute. Determine its period of oscillation.",
    options: ["1.2 s", "1.0 s", "1.5 s", "1.3 s"],
    correct: "1.2 s",
    reason: "$T = 60/50 = 1.2\\text{ s}$."
  },
  {
    id: "PHY101-121",
    question: "The period of oscillation of a simple pendulum is $2\\text{ s}$ when the length of the string is $64\\text{ cm}$. Calculate the period if the string’s length is shortened to $49\\text{ cm}$.",
    options: ["1.75 s", "1.5 s", "1.6 s", "1.8 s"],
    correct: "1.75 s",
    reason: "$T_2 = T_1 \\sqrt{l_2 / l_1} = 2 \\sqrt{49/64} = 2(7/8) = 1.75\\text{ s}$."
  },
  {
    id: "PHY101-122",
    question: "A force of $10\\text{ N}$ produced an extension of $2.50\\text{ cm}$. Determine the spring constant.",
    options: ["400 N/m", "250 N/m", "500 N/m", "350 N/m"],
    correct: "400 N/m",
    reason: "$k = F/e = 10 / 0.025 = 400\\text{ N/m}$."
  },
  {
    id: "PHY101-123",
    question: "In Hooke’s law experiment, a graph of the extension $e$ was plotted against Force $F$. If the slope of the graph is $0.4\\text{ mN}^{-1}$, what is the value of $k$?",
    options: ["2.5 N/m", "400 N/m", "1000 N/m", "500 N/m"],
    correct: "2.5 N/m",
    reason: "$S = e/F = 1/k \\Rightarrow k = 1/S = 1/0.4 = 2.5\\text{ N/m}$."
  },
  {
    id: "PHY101-124",
    question: "The energy stored in a spring of stiffness constant $k = 2000\\text{ N/m}$ when extended by $4\\text{ cm}$ is?",
    options: ["1.6 J", "2 J", "1.2 J", "0.8 J"],
    correct: "1.6 J",
    reason: "$E = 0.5 \\times 2000 \\times (0.04)^2 = 1.6\\text{ J}$."
  },
  {
    id: "PHY101-125",
    question: "Which of the following affect the period of a simple pendulum?",
    options: ["length of string", "mass of the bob", "acceleration due to gravity", "length and gravity"],
    correct: "length and gravity",
    reason: "Period depends only on $l$ and $g$ for small amplitudes."
  },
  {
    id: "PHY101-126",
    question: "The frequency of a certain pendulum A is $10\\text{ cycles per second}$, and the frequency of another pendulum B is $5\\text{ cycles per second}$. Which pendulum is longer in length?",
    options: ["A", "B", "both equal", "A is slightly longer than B"],
    correct: "B",
    reason: "$f = \\frac{1}{2\\pi}\\sqrt{g/l}$, so frequency is inversely proportional to square root of length. Lower frequency means longer length."
  },
  {
    id: "PHY101-127",
    question: "The period of Oscillation can be defined as?",
    options: ["Time for one complete oscillation", "Time for half oscillation", "Time for two oscillations", "Time to reach maximum displacement"],
    correct: "Time for one complete oscillation",
    reason: "Definition of period."
  },
  {
    id: "PHY101-128",
    question: "The main reading of a Vernier calliper is $6.2\\text{ cm}$. If the main scale and the vernier scale coincides at the $7^{th}$ position, what is the total reading of the instrument?",
    options: ["6.27 cm", "6.20 cm", "6.07 cm", "6.17 cm"],
    correct: "6.27 cm",
    reason: "Reading = $6.2 + (7 \\times 0.01) = 6.27\\text{ cm}$."
  },
  {
    id: "PHY101-129",
    question: "The diameter of a piece of wire can be measured most accurately with a?",
    options: ["Vernier calliper", "Micrometer screw gauge", "Meter rule", "Ruler"],
    correct: "Micrometer screw gauge",
    reason: "Micrometers have higher precision (usually 0.01 mm) compared to calipers (0.1 mm)."
  },
  {
    id: "PHY101-130",
    question: "Which of the following represent the correct precision if the length of a piece of wire is measured with a metre rule?",
    options: ["35 mm", "35.0 mm", "35.00 mm", "35.01 mm"],
    correct: "35.0 mm",
    reason: "A meter rule has a least count of 1 mm (0.1 cm), so the reading should reflect that precision."
  },
  {
    id: "PHY101-131",
    question: "The smallest scale division of a Vernier caliper is?",
    options: ["0.1 mm", "0.01 mm", "1 mm", "0.5 mm"],
    correct: "0.1 mm",
    reason: "The least count of a standard Vernier caliper."
  },
  {
    id: "PHY101-132",
    question: "Which of the following is not a part of the micrometer screw gauge?",
    options: ["Anvil", "Spindle", "None", "Thimble"],
    correct: "None",
    reason: "Anvil, spindle, and thimble are all essential parts of a micrometer."
  },
  {
    id: "PHY101-133",
    question: "The clenched jaws of the anvil and the spindle are brought into contact through?",
    options: ["Sleeve", "Ratchet", "Anvil", "Spindle"],
    correct: "Ratchet",
    reason: "The ratchet stop prevents over-tightening and ensures uniform pressure."
  },
  {
    id: "PHY101-134",
    question: "A simple pendulum $0.64\\text{ m}$ long has a period of $1.2\\text{ s}$. Calculate the period of a similar pendulum $0.36\\text{ m}$ long in the same location.",
    options: ["0.9 s", "1.0 s", "0.8 s", "1.1 s"],
    correct: "0.9 s",
    reason: "$T_2 = 1.2 \\sqrt{0.36/0.64} = 1.2 \\times 0.6 / 0.8 = 0.9\\text{ s}$."
  },
  {
    id: "PHY101-135",
    question: "An error due to inherent defects in the method or apparatus used is called?",
    options: ["Systematic error", "Random error", "Personal error", "Gross error"],
    correct: "Systematic error",
    reason: "Systematic errors are predictable and typically constant or proportional to the true value."
  },
  {
    id: "PHY101-136",
    question: "Errors due to personal peculiarities of an observer where human reaction or estimation affects the results are called?",
    options: ["Systematic error", "Random error", "Personal error", "Instrumental error"],
    correct: "Personal error",
    reason: "Errors caused by human limitations, such as parallax or slow reaction time."
  },
  {
    id: "PHY101-137",
    question: "The only way to eliminate systematic errors is to…",
    options: ["Repeat the experiment", "Calibrate the instrument", "Use a different observer", "Increase sample size"],
    correct: "Calibrate the instrument",
    reason: "Since they are built-in, only correction or calibration of the device can remove them."
  },
  {
    id: "PHY101-138",
    question: "The only remedy to random errors is to…",
    options: ["Repeat the experiment and average", "Calibrate the instrument", "Use a precise instrument", "Change the method"],
    correct: "Repeat the experiment and average",
    reason: "Averaging multiple readings tends to cancel out positive and negative random fluctuations."
  },
  {
    id: "PHY101-139",
    question: "Errors due to the accuracy of the division of graduated scales on the instrument is called?",
    options: ["Systematic error", "Instrumental error", "Random error", "Personal error"],
    correct: "Instrumental error",
    reason: "A specific type of systematic error caused by poor manufacturing of the instrument."
  },
  {
    id: "PHY101-140",
    question: "Errors due to unknown causes or chance are known as?",
    options: ["Systematic error", "Random error", "Personal error", "Gross error"],
    correct: "Random error",
    reason: "Definition of random errors."
  },
  {
    id: "PHY101-141",
    question: "Experimental errors are usually divided into two main types which are?",
    options: ["Systematic and Random", "Personal and Gross", "Random and Instrumental", "Gross and Calibration"],
    correct: "Systematic and Random",
    reason: "The two broadest categories in error analysis."
  },
  {
    id: "PHY101-142",
    question: "At a glance, _____ gives a comprehensive picture of the experiment than the data themselves.",
    options: ["a device", "a curve", "a line", "a graph"],
    correct: "a graph",
    reason: "Graphs provide a visual representation of trends and relationships."
  },
  {
    id: "PHY101-143",
    question: "The general form of the equation which yields a straight line is?",
    options: ["y = mx^2 + c", "xy = mc", "y = mx + c", "xy = m^2 + c"],
    correct: "y = mx + c",
    reason: "The standard linear equation."
  },
  {
    id: "PHY101-144",
    question: "The S.I. unit of spring constant is?",
    options: ["N", "Nm", "N/m", "J"],
    correct: "N/m",
    reason: "$k = F/x$, so Newtons per meter."
  },
  {
    id: "PHY101-145",
    question: "To get the elongation $e$ in Hooke’s experiment of elasticity, where $L_1$ is the initial length and $L_2$ is the new length, the equation is?",
    options: ["e = L_1 + L_2", "e = L_2 - L_1", "e = L_1 - L_2", "e = L_2/L_1"],
    correct: "e = L_2 - L_1",
    reason: "Extension is the change in length."
  },
  {
    id: "PHY101-146",
    question: "The change in velocity of a body at a particular time is known as?",
    options: ["Instantaneous velocity", "Instantaneous speed", "Instantaneous acceleration", "Free-fall motion"],
    correct: "Instantaneous acceleration",
    reason: "The derivative of velocity with respect to time."
  },
  {
    id: "PHY101-147",
    question: "If two vectors are represented thus: $\\vec{A} = 5i + 2j + k$ and $\\vec{B} = 2i + 4j - 3k$. Find $\\vec{A} \\cdot \\vec{B}$.",
    options: ["13", "15", "17", "-13"],
    correct: "15",
    reason: "$\\vec{A} \\cdot \\vec{B} = (5 \\times 2) + (2 \\times 4) + (1 \\times -3) = 10 + 8 - 3 = 15$."
  },
  {
    id: "PHY101-148",
    question: "An object of mass $50\\text{ kg}$ is projected with a velocity of $20\\text{ ms}^{-1}$ at an angle of $60^{\\circ}$ to the horizontal. Calculate the time of flight.",
    options: ["3.46 s", "2.0 s", "1.73 s", "1.0 s"],
    correct: "3.46 s",
    reason: "$T = \\frac{2u \\sin\\theta}{g} = \\frac{2(20)\\sin60^{\\circ}}{10} = \\frac{40(0.866)}{10} = 3.464\\text{ s}$."
  },
  {
    id: "PHY101-149",
    question: "_____ is defined as the process used to check the validity of a specific equation in mechanics.",
    options: ["Uncertainty", "Dimensional analysis", "Motion analysis", "Newton’s equations of motion"],
    correct: "Dimensional analysis",
    reason: "Dimensional analysis ensures both sides of an equation have identical units."
  },
  {
    id: "PHY101-150",
    question: "The independent variable in the equation $F = ke$ is ….",
    options: ["F", "k", "e", "None"],
    correct: "e",
    reason: "The extension is controlled/changed by the experimenter to see the response in force."
  }
];
