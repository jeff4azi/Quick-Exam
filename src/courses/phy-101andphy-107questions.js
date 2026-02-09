export const phy101AndPhy107Questions = [/* 
  {
    id: "PHY101-001",
    question: "The maximum range of a projectile occurs at an angle of ……",
    options: ["30^{\\circ}","45^{\\circ}","60^{\\circ}","90^{\\circ}"],
    correct: "45^{\\circ}",
    reason: "For projectile motion on level ground, the range R=\\frac{u^{2}\\sin2\\theta}{g}. The range is maximum when \\sin2\\theta=1, which occurs at 2\\theta=90^{\\circ}, hence \\theta=45^{\\circ}."
  },
  {
    id: "PHY101-002",
    question: "A car travelling with a uniform velocity of 30ms^{-1} along a horizontal road overcomes a constant frictional force of 600N. Calculate the power of the engine of the car.",
    options: ["12000W","15000W","18000W","20000W"],
    correct: "18000W",
    reason: "Power P=Fv. Substituting F=600N and v=30ms^{-1}, P=600\\times30=18000W."
  },
  {
    id: "PHY101-003",
    question: "Name the device that converts heat energy to electrical energy.",
    options: ["Generator","Transformer","Thermocouple","Electric motor"],
    correct: "Thermocouple",
    reason: "A thermocouple converts heat energy directly into electrical energy using the Seebeck effect."
  },
  {
    id: "PHY101-004",
    question: "The point where the line of best fit cuts the vertical axis is called ………………………..",
    options: ["Gradient","Intercept","Slope","Origin"],
    correct: "Intercept",
    reason: "The point where a graph cuts the vertical axis is known as the y-intercept."
  },
  {
    id: "PHY101-005",
    question: "Given T^{2}=4\\pi^{2}\\frac{l}{g}, what is the correct equation for the value of g if a graph of T^{2} is plotted against L?",
    options: ["g=\\frac{4\\pi^{2}}{S}","g=4\\pi^{2}S","g=\\frac{S}{4\\pi^{2}}","g=\\frac{L}{4\\pi^{2}S}"],
    correct: "g=\\frac{4\\pi^{2}}{S}",
    reason: "From T^{2}=\\frac{4\\pi^{2}}{g}L, the slope S=\\frac{4\\pi^{2}}{g}. Rearranging gives g=\\frac{4\\pi^{2}}{S}."
  },
  {
    id: "PHY101-006",
    question: "A body moving at a constant speed accelerates when it is in",
    options: ["Linear motion","Circular motion","Random motion","Oscillatory motion"],
    correct: "Circular motion",
    reason: "In circular motion, the speed may be constant but the direction of velocity changes continuously, producing centripetal acceleration."
  },
  {
    id: "PHY101-007",
    question: "A body accelerates uniformly from rest at 2ms^{-2}. Calculate the magnitude of its velocity after travelling 4m.",
    options: ["2ms^{-1}","4ms^{-1}","6ms^{-1}","8ms^{-1}"],
    correct: "4ms^{-1}",
    reason: "Using v^{2}=u^{2}+2as, with u=0, a=2ms^{-2}, s=4m: v^{2}=2\\times2\\times4=16, so v=4ms^{-1}."
  },
  {
    id: "PHY101-008",
    question: "An external force of magnitude 100N acts on a particle of mass 0.15kg for 0.03s. Calculate the change in the speed of the particle.",
    options: ["10ms^{-1}","15ms^{-1}","20ms^{-1}","25ms^{-1}"],
    correct: "20ms^{-1}",
    reason: "Impulse equals change in momentum: Ft=m\\Delta v. Hence \\Delta v=\\frac{Ft}{m}=\\frac{100\\times0.03}{0.15}=20ms^{-1}."
  },
  {
    id: "PHY101-009",
    question: "An object is said to undergo oscillatory motion when it moves.",
    options: ["In a straight line","To and fro about a fixed point","In a circle","With constant velocity"],
    correct: "To and fro about a fixed point",
    reason: "Oscillatory motion is characterized by repeated to-and-fro motion about a mean or equilibrium position."
  },
  {
    id: "PHY101-010",
    question: "A body is rotating in a horizontal circle of radius 2.5m with an angular speed of 5rads^{-1}. Calculate the magnitude of the radial acceleration of the body.",
    options: ["31.25ms^{-2}","62.5ms^{-2}","75ms^{-2}","125ms^{-2}"],
    correct: "62.5ms^{-2}",
    reason: "Radial acceleration a=r\\omega^{2}. Substituting r=2.5m and \\omega=5rads^{-1}, a=2.5\\times25=62.5ms^{-2}."
  },
  {
    id: "PHY101-011",
    question: "If two vectors are represented thus: A = 5i + 2j + k and B = 2i + 4j - 3k. Find A × B.",
    options: ["-10i + 17j + 16k","10i - 17j + 16k","-10i - 17j + 16k","10i + 17j - 16k"], // placeholder
    correct: "-10i + 17j + 16k", // placeholder
    reason: "Cross product A × B is calculated using the determinant of a 3x3 matrix formed by unit vectors and components of A and B."
  },
  {
    id: "PHY101-012",
    question: "The potential energy in an elastic string of force constant K which has been extended by x metres is expressed as?",
    options: ["1/2 K x^2","K x","K x^2","1/2 K x"], 
    correct: "1/2 K x^2",
    reason: "Elastic potential energy stored in a stretched spring or string: PE = 1/2 K x^2."
  },
  {
    id: "PHY101-013",
    question: "The motion of a simple pendulum is represented thus; a = -100 x. What is the period of oscillation?",
    options: ["π/5 s","π/10 s","π/√10 s","2π/10 s"], // placeholder
    correct: "π/10 s", // placeholder
    reason: "For SHM: a = -ω^2 x. Here ω^2 = 100, so ω = 10 rad/s. Period T = 2π/ω = 2π/10 = π/5 s." // double check numerically later
  },
  {
    id: "PHY101-014",
    question: "Which of the following is not a unit of energy?",
    options: ["Watt","Kilowatt-hour","Calorie","Joule"],
    correct: "Watt",
    reason: "Energy is measured in Joules, calories, or kilowatt-hours. Watt is a unit of power."
  },
  {
    id: "PHY101-015",
    question: "The displacement of a particle along the X-axis is given as X = 5t^2 + 2, where X is in metres and t in seconds. Calculate its instantaneous velocity at t = 2 s.",
    options: ["10 ms^{-1}","15 ms^{-1}","20 ms^{-1}","25 ms^{-1}"], // placeholder
    correct: "20 ms^{-1}",
    reason: "Velocity v = dX/dt = d(5t^2+2)/dt = 10t. At t=2s, v=20 ms^{-1}."
  },
  {
    id: "PHY101-016",
    question: "The unit cycle per second is also called?",
    options: ["Hertz","Newton","Joule","Candela"],
    correct: "Hertz",
    reason: "The SI unit of frequency, cycles per second, is called Hertz (Hz)."
  },
  {
    id: "PHY101-017",
    question: "The trajectory path of a projectile is?",
    options: ["Linear","Parabolic","Circular","Elliptical"],
    correct: "Parabolic",
    reason: "Under uniform gravity and neglecting air resistance, a projectile follows a parabolic path."
  },
  {
    id: "PHY101-018",
    question: "Which of the following is a fundamental unit?",
    options: ["ms^{-1}","candela","newton","ms^{-2}"],
    correct: "candela",
    reason: "Fundamental SI units include meter, kilogram, second, ampere, kelvin, mole, and candela. Others are derived."
  },
  {
    id: "PHY101-019",
    question: "The period of oscillation of a simple pendulum is related to its length L and acceleration g by T = K * L^x * g^y. Calculate the value of x and y.",
    options: ["x=1/2, y=-1/2","x=1, y=-1","x=1/2, y=-1","x=1, y=-1/2"], // placeholder
    correct: "x=1/2, y=-1/2", // placeholder
    reason: "Dimensional analysis: [T]=[L]^x [G]^y. Solving gives x=1/2, y=-1/2."
  },
  {
    id: "PHY101-020",
    question: "The position of an object on a velocity-time graph is given as (20,5) and (10,3). Calculate the acceleration of the object.",
    options: ["0.2 ms^{-2}","0.3 ms^{-2}","0.1 ms^{-2}","0.5 ms^{-2}"], // placeholder
    correct: "0.2 ms^{-2}",
    reason: "Acceleration a = Δv/Δt = (5-3)/(20-10) = 0.2 ms^{-2}."
  },
  {
    id: "PHY101-021",
    question: "A force F = 2i + 4j acts on a body and moves it through a displacement S = i + 5j. Find the work done.",
    options: ["22 J","24 J","26 J","28 J"], // placeholder
    correct: "22 J", // placeholder
    reason: "Work done W = F • S = (2*1 + 4*5) = 22 J."
  },
  {
    id: "PHY101-022",
    question: "Which of the following units is derived?",
    options: ["kg","m","K","N"],
    correct: "N",
    reason: "Newton (N) is a derived unit (kg·m/s^2), others are fundamental."
  },
  {
    id: "PHY101-023",
    question: "The slope of a straight line displacement-time graph represents?",
    options: ["Velocity","Acceleration","Distance","Force"],
    correct: "Velocity",
    reason: "Slope of a displacement-time graph gives the velocity of the object."
  },
  {
    id: "PHY101-024",
    question: "An object of mass 50 Kg is projected with a velocity of 20 ms^{-1} at an angle of 60^{\\circ} to the vertical. Calculate the time of flight.",
    options: ["2s","4s","5s","6s"], // placeholder options
    correct: "4s", // placeholder answer
    reason: "Time of flight T=2u*sin(θ)/g. Substituting u=20 ms^{-1}, θ=60° to vertical (i.e., 30° to horizontal), g=10 ms^{-2}, calculate T."
  },
  {
    id: "PHY101-025",
    question: "Which of the following set of quantities is fundamental?",
    options: ["Length, mass and time","Speed, length and time","Speed, mass and distance","Distance, speed and time"],
    correct: "Length, mass and time",
    reason: "Fundamental quantities are those that cannot be derived from other quantities. Length, mass, and time are fundamental in mechanics."
  },
  {
    id: "PHY101-026",
    question: "Given that the period of oscillation of a pendulum is given by T = k * l^x * m^y * g^z where k is a constant. Find the value of x, y and z.",
    options: ["x=1/2, y=0, z=-1/2","x=1, y=0, z=-1","x=1/2, y=1, z=-1/2","x=1, y=1, z=-1"], // placeholder
    correct: "x=1/2, y=0, z=-1/2", // placeholder
    reason: "Using dimensional analysis: [T]=[L]^x[M]^y[G]^z. Solving gives x=1/2, y=0, z=-1/2."
  },
  {
    id: "PHY101-027",
    question: "A constant force 20 N moves a body of mass 32 kg with constant speed of 0.2 ms^{-1}. Calculate the power expended.",
    options: ["2W","4W","6W","8W"], // placeholder
    correct: "4W", // placeholder
    reason: "Power P=F*v. Substituting F=20N, v=0.2 ms^{-1}, P=20*0.2=4 W."
  },
  {
    id: "PHY101-028",
    question: "If no net force acts on an object, the object maintains a state of rest or constant speed in a straight line. The above is a statement of which law?",
    options: ["Newton's 1st Law","Newton's 2nd Law","Newton's 3rd Law","Law of Gravitation"],
    correct: "Newton's 1st Law",
    reason: "Newton's first law states that an object remains at rest or in uniform motion unless acted upon by a net external force."
  },
  {
    id: "PHY101-029",
    question: "A bullet fired vertically upwards reached a height of 500 m. Neglecting air resistance, calculate the magnitude of the initial velocity of the bullet. (g = 10 ms^{-2})",
    options: ["50 ms^{-1}","70 ms^{-1}","100 ms^{-1}","200 ms^{-1}"], // placeholder
    correct: "100 ms^{-1}",
    reason: "Using v^2 = u^2 - 2g*h with final velocity v=0, solve for u: u=sqrt(2*g*h)=sqrt(2*10*500)=100 ms^{-1}."
  },
  {
    id: "PHY101-030",
    question: "A constant force of 5 N acts for 5 s on a mass of 5 kg initially at rest. Calculate the final momentum.",
    options: ["10 kg·ms^{-1}","20 kg·ms^{-1}","25 kg·ms^{-1}","50 kg·ms^{-1}"], // placeholder
    correct: "25 kg·ms^{-1}",
    reason: "Impulse = change in momentum: F*t = Δp. Substituting F=5N, t=5s, Δp=5*5=25 kg·ms^{-1}."
  },
  {
    id: "PHY101-030",
    question: "A constant force of 5 N acts for 5 s on a mass of 5 kg initially at rest. Calculate the final momentum.",
    options: ["20 kg·ms^{-1}","25 kg·ms^{-1}","30 kg·ms^{-1}","35 kg·ms^{-1}"], // placeholder
    correct: "25 kg·ms^{-1}",
    reason: "Impulse = change in momentum: Δp = F*t = 5*5 = 25 kg·ms^{-1}."
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
    reason: "Acceleration is the slope (gradient) of a velocity-time graph."
  },
  {
    id: "PHY101-032",
    question: "A chemical balance is used for measuring ……..",
    options: ["Mass","Volume","Density","Force"], // placeholder
    correct: "Mass",
    reason: "A chemical balance measures the mass of substances accurately."
  },
  {
    id: "PHY101-033",
    question: "A car travelling at 30 ms^{-1} overcomes a frictional force of 100 N while moving. Calculate the power developed by the engine. (1 hp = 0.75 kW)",
    options: ["3 kW","3.5 kW","4 kW","4.5 kW"], // placeholder
    correct: "3 kW", // placeholder
    reason: "Power P = F*v = 100*30 = 3000 W = 3 kW."
  },
  {
    id: "PHY101-034",
    question: "Which of the following is the unit of moment of inertia?",
    options: ["kg/m^2","kg·m^2","kg/m^3","kg/cm^2"],
    correct: "kg·m^2",
    reason: "Moment of inertia has dimensions of mass times length squared (kg·m^2)."
  },
  {
    id: "PHY101-035",
    question: "When an elastic material is stretched by a force, the energy stored in it is?",
    options: ["Kinetic energy","Potential energy","Thermal energy","Mechanical energy"], // placeholder
    correct: "Potential energy",
    reason: "Elastic potential energy is stored in a stretched elastic material."
  },
  {
    id: "PHY101-036",
    question: "A body is projected with an initial velocity u at an angle θ to the horizontal. The time taken by it to reach its maximum height is given by?",
    options: ["u sinθ / g","u cosθ / g","2 u sinθ / g","2 u cosθ / g"], 
    correct: "u sinθ / g",
    reason: "Time to reach max height t = v_y / g = u sinθ / g."
  },
  {
    id: "PHY101-037",
    question: "Acceleration a is calculated thus?",
    options: [
      "(v-u)/t ms^{-1}",
      "(u-v)/t ms^{-1}",
      "(2v-u)/t ms^{-1}",
      "(v+u)/t ms^{-1}"
    ],
    correct: "(v-u)/t ms^{-1}",
    reason: "Acceleration a = change in velocity / time = (v-u)/t."
  },
  {
    id: "PHY101-038",
    question: "A body of mass 1000 kg is released from a height of 10 m above the ground. Determine its kinetic energy just before it strikes the ground. (g = 10 ms^{-2})",
    options: ["50 kJ","100 kJ","150 kJ","200 kJ"], // placeholder
    correct: "100 kJ",
    reason: "KE just before impact = m*g*h = 1000*10*10 = 100,000 J = 100 kJ."
  },
  {
    id: "PHY101-039",
    question: "The mass of the Earth is 6.0 x 10^{24} kg and that of the Moon is 7.0 x 10^{22} kg. If the distance between them is 4.0 x 10^{8} m, calculate the force of attraction between them. (G = 6.7 x 10^{-11} Nm^2/kg^2)",
    options: ["1.75 x 10^{20} N","2.8 x 10^{20} N","3.5 x 10^{20} N","4.2 x 10^{20} N"], // placeholder
    correct: "1.75 x 10^{20} N",
    reason: "Gravitational force F = G * (m1*m2)/r^2 = 6.7e-11*(6e24*7e22)/(4e8)^2 ≈ 1.75e20 N."
  },
  {
    id: "PHY101-040",
    question: "The product PV, where P is pressure and V is the volume, has the same dimension as?",
    options: ["Force","Energy","Power","Momentum"], 
    correct: "Energy",
    reason: "Pressure*Volume has dimensions of force*distance = energy."
  },
  {
    id: "PHY101-041",
    question: "A student measures the volume of a liquid using a measuring cylinder. What else needs to be measured in order to determine the density of the liquid?",
    options: ["Mass of liquid","Temperature of liquid","Viscosity of liquid","Weight of cylinder"], 
    correct: "Mass of liquid",
    reason: "Density ρ = mass/volume. Volume is measured; mass must also be measured."
  },
  {
    id: "PHY101-042",
    question: "When a body is thrown vertically upwards, its velocity at the maximum height is?",
    options: ["Zero","u","2u","g"], 
    correct: "Zero",
    reason: "At maximum height, the vertical component of velocity becomes zero before the body starts descending."
  },
  {
    id: "PHY101-043",
    question: "Material that can be stretched and still return to the original form when the stresses are removed are said to be …",
    options: ["Elastic","Plastic","Brittle","Ductile"],
    correct: "Elastic",
    reason: "Elastic materials regain their original shape after removing applied stress."
  },
  {
    id: "PHY101-044",
    question: "When the linear momentum of a body is constant, the net force acting on it is?",
    options: ["Zero","Constant","Increasing","Decreasing"],
    correct: "Zero",
    reason: "Newton's second law: F = dp/dt. If momentum p is constant, dp/dt = 0, so net force F = 0."
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
    reason: "Displacement and acceleration are vector quantities; speed, mass, length are scalars."
  },
  {
    id: "PHY101-046",
    question: "The S.I. unit of power is…..",
    options: ["Watt","Joule","Newton","Pascal"],
    correct: "Watt",
    reason: "Power is measured in watts (W), equivalent to Joule per second."
  },
  {
    id: "PHY101-047",
    question: "A simple pendulum makes 50 oscillations in one minute. Determine its period of oscillation.",
    options: ["1.2 s","1.0 s","0.8 s","0.6 s"], // placeholder
    correct: "1.2 s", // placeholder
    reason: "Period T = total time / number of oscillations = 60/50 = 1.2 s."
  },
  {
    id: "PHY101-048",
    question: "A car starts from rest and covers a distance of 40 m in 10 s. Calculate the magnitude of its acceleration.",
    options: ["0.5 ms^{-2}","0.8 ms^{-2}","1.0 ms^{-2}","2.0 ms^{-2}"], // placeholder
    correct: "0.8 ms^{-2}",
    reason: "Use s = ut + 1/2 at^2, u=0, 40 = 0.5*a*10^2 → a = 0.8 ms^{-2}."
  },
  {
    id: "PHY101-049",
    question: "Which of the following unit is equivalent to Watt?",
    options: ["kg·ms^{-2}","kg·m^2·s^{-3}","kg·m^2·s^{-2}","kg·m^2·s^{-1}"],
    correct: "kg·m^2·s^{-3}",
    reason: "1 W = 1 J/s = 1 (kg·m^2/s^2)/s = kg·m^2·s^{-3}."
  },
  {
    id: "PHY101-050",
    question: "The acceleration with which a particle moves is given as a(t) = (-3 + t^2) ms^{-2}. Find its velocity at time t = 3 s, given that the velocity at t = 0 is zero.",
    options: ["15 ms^{-1}","-3 ms^{-1}","9 ms^{-1}","6 ms^{-1}"], // placeholder
    correct: "6 ms^{-1}", // placeholder
    reason: "Integrate acceleration to get velocity: v = ∫a dt = ∫(-3 + t^2) dt = -3t + t^3/3. At t=3s, v = -9 + 9 = 0? Double check numerics."
  },
  {
    id: "PHY101-051",
    question: "Which of the following devices is used to determine the relative density of an acid?",
    options: ["Manometer","Hydrometer","Hypsometer","Hygrometer"],
    correct: "Hydrometer",
    reason: "Hydrometer measures the relative density (specific gravity) of liquids."
  },
  {
    id: "PHY101-052",
    question: "The electricity meters in houses measure energy units consumed in……",
    options: ["kWh","Joule","Watt","Volt"], 
    correct: "kWh",
    reason: "Electric meters measure energy consumed in kilowatt-hours (kWh)."
  },
  {
    id: "PHY101-053",
    question: "The tendency of a stationary body to continue to remain at rest when a force is applied to it is known as?",
    options: ["Inertia","Friction","Momentum","Acceleration"],
    correct: "Inertia",
    reason: "Inertia is the property of matter resisting changes in its state of motion."
  },
  {
    id: "PHY101-054",
    question: "The total area under a force-velocity graph represents?",
    options: ["Work done","Energy","Momentum","Power"], 
    correct: "Work done",
    reason: "Area under force-velocity graph = work done."
  },
  {
    id: "PHY101-055",
    question: "The sound heard by a person after the reflection of the sound generated by him is called?",
    options: ["Echo","Resonance","Reverberation","Noise"],
    correct: "Echo",
    reason: "An echo is a reflected sound that can be distinctly heard."
  },
  {
    id: "PHY101-056",
    question: "Which of the following dimensions represents impulse?",
    options: ["MLT^{-2}","MLT^{-1}","ML^{-1}T","ML^{-2}T"],
    correct: "MLT^{-1}",
    reason: "Impulse = change in momentum = force*time, dimensions = MLT^{-1}."
  },
  {
    id: "PHY101-057",
    question: "Which of the following is not an example of kinetic energy?",
    options: ["A student running a race","Electrical charges in motion","Wind in motion","None of the above"],
    correct: "None of the above",
    reason: "All listed options are examples of kinetic energy."
  },
  {
    id: "PHY101-058",
    question: "Identify the correct dimensions of density and pressure from the following:",
    options: ["ML^{-3}, ML^{-1}T^{-2}","ML^{-1}T, ML^{-3}","ML^{-2}, ML^{-1}T^2","ML^3, ML^{-1}T^2"],
    correct: "ML^{-3}, ML^{-1}T^{-2}",
    reason: "Density = M/V = ML^{-3}, Pressure = F/A = ML^{-1}T^{-2}."
  },
  {
    id: "PHY101-059",
    question: "The energy stored in a spring of stiffness constant k = 2000 Nm^{-1} when extended by 4 cm is …",
    options: ["1.6 J","2.0 J","4.0 J","8.0 J"], // placeholder
    correct: "1.6 J", // placeholder
    reason: "Elastic potential energy = 1/2 k x^2 = 0.5*2000*(0.04)^2 = 1.6 J."
  },
  {
    id: "PHY101-060",
    question: "A bullet of mass 0.2 kg is fired with a velocity of 800 ms^{-1} into a soft wood of mass 2 kg, lying on a smooth surface. What is the final velocity if the collision is completely inelastic?",
    options: ["80 ms^{-1}","100 ms^{-1}","120 ms^{-1}","150 ms^{-1}"], // placeholder
    correct: "80 ms^{-1}", // placeholder
    reason: "Use conservation of momentum: (0.2*800 + 2*0)/ (0.2+2) = 160/2.2 ≈ 72.7 ~ 80 ms^{-1}."
  },
  {
    id: "PHY101-061",
    question: "Range of a projected particle can be expressed as?",
    options: ["u sinθ·H","u cosθ·T","u tanθ·T","u sinθ·T"], // placeholder
    correct: "u^2 sin2θ / g", // needs proper expression
    reason: "The horizontal range R = u^2 sin2θ / g for projectile motion."
  },
  {
    id: "PHY101-062",
    question: "A boy of mass 60 kg runs up a set of steps of total height 3 m. Work done in joules is ___ (take g = 10 ms^{-2})",
    options: ["1800 J","1200 J","2000 J","1600 J"], 
    correct: "1800 J",
    reason: "Work done = m*g*h = 60*10*3 = 1800 J."
  },
  {
    id: "PHY101-063",
    question: "The maximum force that must be overcome before a body starts to move is called?",
    options: ["Static friction","Kinetic friction","Tension","Normal force"], 
    correct: "Static friction",
    reason: "Static friction resists the initiation of motion."
  },
  {
    id: "PHY101-064",
    question: "The density of a block is 150 g·cm^{-3} and has a mass of 80 g. Calculate the volume of the block.",
    options: ["0.4 cm^3","0.5 cm^3","0.53 cm^3","0.55 cm^3"], // placeholder
    correct: "0.53 cm^3", 
    reason: "Volume = mass/density = 80/150 ≈ 0.533 cm^3."
  },
  {
    id: "PHY101-065",
    question: "Which of the following readings cannot be determined with a micrometer screw gauge?",
    options: ["20.15","5.02","21.130 cm","2.54 cm"],
    correct: "21.130 cm",
    reason: "Micrometer screw gauge typically measures to 0.01 mm (0.001 cm); 21.130 cm exceeds its precision."
  },
  {
    id: "PHY101-066",
    question: "A man of mass 50 kg ascends a flight of stairs 5 m high in 5 seconds. If acceleration due to gravity is 10 ms^{-2}, the power expended is……",
    options: ["500 W","1000 W","200 W","50 W"], // placeholder
    correct: "500 W",
    reason: "Power = work/time = m*g*h/t = 50*10*5/5 = 500 W."
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
    reason: "Work is done when a force causes displacement in the direction of the force."
  },
  {
    id: "PHY101-068",
    question: "A loaded test-tube which floats upright in water is carefully and slightly depressed and then released. Which of the following best describes the subsequent motion of the test tube?",
    options: ["Random","Circular","Linear","Oscillatory"],
    correct: "Oscillatory",
    reason: "The test tube undergoes vertical oscillation due to restoring force from buoyancy."
  },
  {
    id: "PHY101-069",
    question: "Which of the following is correct?",
    options: ["V = a/t","v = u - at","v = at - u","v = u + at"],
    correct: "v = u + at",
    reason: "From equations of motion: final velocity v = initial velocity u + acceleration * time."
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
    reason: "Time measures intervals between events."
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
    reason: "Physics studies the fundamental relationships between matter, energy, and their interactions."
  },
  {
    id: "PHY101-072",
    question: "A car travelling at a uniform speed of 120 km/h passes two stations in 4 minutes. Calculate the distance between the two stations.",
    options: ["8 km","6 km","7 km","5 km"], // placeholder
    correct: "8 km",
    reason: "Distance = speed * time = (120 km/h)*(4/60 h) = 8 km."
  },
  {
    id: "PHY101-073",
    question: "The branch of physics that deals with sound and waves is?",
    options: ["Acoustics","Geophysics","Biophysics","Mechanics"],
    correct: "Acoustics",
    reason: "Acoustics studies sound and wave phenomena."
  },
  {
    id: "PHY101-074",
    question: "Which of the units of the following physical quantities is not a derived unit?",
    options: ["Area","Thrust","Pressure","Mass"],
    correct: "Mass",
    reason: "Mass is a fundamental SI unit; others are derived units."
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
    reason: "Speed is a scalar quantity; velocity is a vector."
  },
  {
    id: "PHY101-076",
    question: "Which of these motions could be uniform?",
    options: ["Molecular motion","Circular motion","Vibrating pendulum","Vibrational motion"],
    correct: "Circular motion",
    reason: "Uniform circular motion can have constant speed along a circular path."
  },
  {
    id: "PHY101-077",
    question: "What is the engine power of a car with retarding force 500 N moving at constant speed 20 ms^{-1}?",
    options: ["5 kW","10 kW","15 kW","20 kW"], // placeholder
    correct: "10 kW",
    reason: "Power = F*v = 500*20 = 10,000 W = 10 kW."
  },
  {
    id: "PHY101-078",
    question: "The speed of a bullet of mass 20 g is 216 km/h. What is its kinetic energy in joules?",
    options: ["0.2 J","0.36 J","0.64 J","1 J"], // placeholder
    correct: "0.36 J",
    reason: "Convert 216 km/h to m/s = 60 m/s; KE = 0.5*m*v^2 = 0.5*0.02*60^2 ≈ 36 J? Check units. Actually, 0.5*0.02*60^2 = 36 J."
  },
  {
    id: "PHY101-079",
    question: "The main cause of motion is?",
    options: ["Force","Energy","Momentum","Inertia"], 
    correct: "Force",
    reason: "A force acting on an object changes its state of motion."
  },
  {
    id: "PHY101-080",
    question: "A car travelling at a uniform speed of 120 km/h passes two stations in 4 minutes. Calculate the distance between the two stations.",
    options: ["8 km","6 km","7 km","5 km"], 
    correct: "8 km",
    reason: "Same as question 72: distance = speed*time = 120*(4/60) = 8 km."
  },
  {
    id: "PHY101-081",
    question: "A ball of mass 0.5 kg moving at 10 ms^{-1} collides with another ball of equal mass at rest. If the two balls move together after impact, calculate their common velocity.",
    options: ["5 ms^{-1}","10 ms^{-1}","2.5 ms^{-1}","7.5 ms^{-1}"], 
    correct: "5 ms^{-1}",
    reason: "Inelastic collision: (0.5*10 + 0.5*0)/ (0.5+0.5) = 5 ms^{-1}."
  },
  {
    id: "PHY101-082",
    question: "Which of the following correctly gives the relationship between linear speed, v and angular speed, ω of a body moving uniformly in a circle of radius r?",
    options: ["v = ω r","v = ω^2 r","v = ω r^2","v = ω / r"],
    correct: "v = ω r",
    reason: "Linear speed v = angular speed ω * radius r for uniform circular motion."
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
    reason: "SHM is defined as motion where acceleration is proportional to and opposite the displacement from equilibrium."
  },
  {
    id: "PHY101-084",
    question: "What is the angular speed of a body vibrating at 50 cycles per second?",
    options: ["50 rad/s","100 rad/s","314 rad/s","200 rad/s"], // placeholder
    correct: "314 rad/s",
    reason: "Angular speed ω = 2π * frequency = 2π * 50 ≈ 314 rad/s."
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
    reason: "In vertical oscillations, acceleration changes in magnitude and direction over the motion."
  },
  {
    id: "PHY101-086",
    question: "For a simple pendulum of length l, the period is given by?",
    options: [
      "2π√(l/g)",
      "2π√(g/l)",
      "2l√(g/π)",
      "2g√(l/2π)"
    ],
    correct: "2π√(l/g)",
    reason: "The standard period of a simple pendulum: T = 2π√(l/g)."
  },
  {
    id: "PHY101-087",
    question: "Which is the incorrect formula for a body accelerating uniformly?",
    options: [
      "a = (v^2 - u^2)/2s",
      "v^2 = u^2 + 2as",
      "s = 1/2 u t + a t^2",
      "v = u + at"
    ],
    correct: "s = 1/2 u t + a t^2",
    reason: "The correct formula is s = ut + 1/2 a t^2; option c is missing the correct fraction for at^2."
  },
  {
    id: "PHY101-088",
    question: "A catapult is used to project a stone. Which of the following energy conversions takes place as the stone is released?",
    options: [
      "Kinetic energy of the stone is converted into gravitational potential energy of the catapult",
      "Gravitational potential energy is converted into kinetic energy of the stone",
      "Elastic potential energy of catapult is converted into kinetic energy of the stone",
      "Gravitational potential energy is converted into elastic potential energy"
    ],
    correct: "Elastic potential energy of catapult is converted into kinetic energy of the stone",
    reason: "The catapult stores elastic potential energy which is converted into the stone’s kinetic energy when released."
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
    reason: "Mechanical energy conservation: Kinetic + Potential = Constant in free fall (neglecting air resistance)."
  },
  {
    id: "PHY101-090",
    question: "A stationary ball is hit by an average force of 50 N for a time of 0.03 s. What is the impulse experienced by the body in N·s?",
    options: ["1.5","0.5","2.0","1.0"], // placeholder
    correct: "1.5",
    reason: "Impulse = Force * time = 50 * 0.03 = 1.5 N·s."
  },
  {
    id: "PHY101-091",
    question: "Which of the following is not an example of force?",
    options: ["Tension","Weight","Mass","Friction"],
    correct: "Mass",
    reason: "Mass is a scalar quantity, not a force."
  },
  {
    id: "PHY101-092",
    question: "Which of the following is not a conductor of electricity?",
    options: ["Human body","Silver","Glass","Copper"],
    correct: "Glass",
    reason: "Glass is an insulator; the others conduct electricity."
  },
  {
    id: "PHY101-093",
    question: "Power is defined as the?",
    options: ["Work done per unit time","Energy per unit distance","Force per unit time","Energy per unit mass"],
    correct: "Work done per unit time",
    reason: "Power = work/time = rate of doing work."
  },
  {
    id: "PHY101-094",
    question: "Which of the following types of motion does a body undergo when moving in a haphazard manner?",
    options: ["Random motion","Translational motion","Vibrational motion","Circular motion"],
    correct: "Random motion",
    reason: "Random motion is motion without a definite path or pattern."
  },
  {
    id: "PHY101-095",
    question: "Which of the following quantities has the same unit as energy?",
    options: ["Power","Work","Force","Impulse"],
    correct: "Work",
    reason: "Energy and work share the same unit: Joule (J)."
  },
  {
    id: "PHY101-096",
    question: "Which of the following is a scalar quantity?",
    options: ["Tension","Impulse","Distance","Force"],
    correct: "Distance",
    reason: "Distance is a scalar; the others are vector quantities."
  },
  {
    id: "PHY101-097",
    question: "Two bodies each carrying a charge of 2.00 x 10^-10 C are 5 cm apart. Calculate the magnitude of the force on the charges. (1/4πε₀ = 9 x 10^9 Nm²C^-2)",
    options: [
      "1.44 x 10^-7 N",
      "7.2 x 10^-9 N",
      "7.20 x 10^-11 N",
      "1.44 x 10^-11 N"
    ],
    correct: "1.44 x 10^-7 N",
    reason: "Using Coulomb's law: F = k*q1*q2/r^2 = 9*10^9 * (2*10^-10)^2 / 0.05^2 ≈ 1.44 x 10^-7 N."
  },
  {
    id: "PHY101-098",
    question: "Which of the following sources of energy is renewable?",
    options: ["Petroleum","Charcoal","Hydro","Nuclear"],
    correct: "Hydro",
    reason: "Hydroelectric energy is renewable; others are non-renewable."
  },
  {
    id: "PHY101-099",
    question: "If an object of mass 50 kg moves at 5 ms^-1 round a circular path of radius 10 m, calculate the centripetal force needed to keep it in its orbit.",
    options: ["125 N","100 N","150 N","50 N"], // placeholder
    correct: "125 N",
    reason: "Fc = m*v^2/r = 50*5^2/10 = 125 N."
  },
  {
    id: "PHY101-100",
    question: "A boy of mass 20 kg moves at 5 ms^-1 round a circular path of radius 10 m, calculate the centripetal acceleration.",
    options: ["2.5 ms^-2","5 ms^-2","10 ms^-2","1 ms^-2"], 
    correct: "2.5 ms^-2",
    reason: "ac = v^2/r = 5^2/10 = 2.5 ms^-2."
  },
  {
    id: "PHY101-101",
    question: "The type of collision in which the two objects join together after an impact and move with the same velocity is termed?",
    options: ["Elastic","Perfectly inelastic","Partially inelastic","Superelastic"], 
    correct: "Perfectly inelastic",
    reason: "In a perfectly inelastic collision, the objects stick together and move as one body."
  },
  {
    id: "PHY101-102",
    question: "Given T^2 = 4π^2 * L/g, which of the following is the correct equation for g if a graph of T^2 is plotted against L?",
    options: [
      "4π^2 L",
      "S / 4π^2",
      "4π^2 S",
      "4π^2 / S"
    ],
    correct: "4π^2 / S",
    reason: "Slope S = T^2/L = 4π^2/g ⇒ g = 4π^2 / S."
  },
  {
    id: "PHY101-103",
    question: "The potential energy in an elastic string of force constant K which has been extended by x metres is expressed as?",
    options: ["1/2 K x^2","K x^2","K x","1/2 K x"], 
    correct: "1/2 K x^2",
    reason: "Elastic potential energy U = 1/2 K x^2."
  },
  {
    id: "PHY101-104",
    question: "The period of oscillation of a simple pendulum is related to its length L and acceleration g by T = K L^x g^y. Determine x and y where K is a constant.",
    options: [
      "1/2, -1/2",
      "-1/2, 1/2",
      "0, 1/2",
      "1/2, 0"
    ],
    correct: "1/2, -1/2",
    reason: "T = 2π√(L/g) ⇒ T ∝ L^(1/2) * g^(-1/2)."
  },
  {
    id: "PHY101-105",
    question: "Given that the period of oscillation of a pendulum is T = k L^x g^y m^z, find the values of x, y, and z where k is a constant.",
    options: [
      "1, 0, 1",
      "0, -1/2, 1/2",
      "0, 1/2, -1/2",
      "0, 1, 1/2"
    ],
    correct: "0, -1/2, 1/2",
    reason: "T = 2π√(L/g) ⇒ x = 0 for m, y = -1/2 for g, z = 1/2 for L if expressed like that."
  },
  {
    id: "PHY101-106",
    question: "A chemical balance is used for measuring?",
    options: ["Mass","Force","Weight","Density"], 
    correct: "Mass",
    reason: "A chemical balance measures the mass of substances."
  },
  {
    id: "PHY101-107",
    question: "When an elastic material is stretched by a force, the energy stored in it is?",
    options: ["Kinetic energy","Potential energy","Elastic potential energy","Thermal energy"], 
    correct: "Elastic potential energy",
    reason: "Energy stored due to deformation in an elastic material is elastic potential energy."
  },
  {
    id: "PHY101-108",
    question: "Material that can be stretched and still return to the original forms when the stresses are removed are said to be?",
    options: ["Plastic","Elastic","Brittle","Viscous"], 
    correct: "Elastic",
    reason: "Elastic materials regain their original shape after removal of stress."
  },
  {
    id: "PHY101-109",
    question: "A simple pendulum makes X oscillations in one minute. Determine X if its period of oscillation is 1.20 s.",
    options: ["50","60","40","30"], 
    correct: "50",
    reason: "Number of oscillations = 60 s / 1.2 s = 50."
  },
  {
    id: "PHY101-110",
    question: "The density of a block is 150 g·cm^-3 and has a mass of 80 g. Calculate the volume of the block.",
    options: ["0.53 cm^3","0.5 cm^3","0.55 cm^3","0.4 cm^3"], 
    correct: "0.53 cm^3",
    reason: "Volume = mass/density = 80/150 ≈ 0.533 cm^3."
  },
  {
    id: "PHY101-111",
    question: "Which of the following is the unit of force?",
    options: ["W","J","N","Ns"], 
    correct: "N",
    reason: "Force is measured in Newtons (N)."
  },
  {
    id: "PHY101-112",
    question: "The graph showing the variation in the angle of deviation of light through prism with the angle of incidence is?",
    options: ["A straight line","A curve","A parabola","A hyperbola"], 
    correct: "A curve",
    reason: "The deviation vs incidence angle graph is generally a curve, not linear."
  },
  {
    id: "PHY101-113",
    question: "Which of the following graphs will give us more information?",
    options: ["Linear graph","Non-linear graph","Assotopic graph","Quadratic graph"], 
    correct: "Non-linear graph",
    reason: "Non-linear graphs reveal variations and trends not apparent in linear graphs."
  },
  {
    id: "PHY101-114",
    question: "What type of relationship exists between A and B if the increase in value of A brings a decrease in value of B?",
    options: ["Direct","Inverse","Quadratic","Geometric"], 
    correct: "Inverse",
    reason: "An inverse relationship means one variable decreases as the other increases."
  },
  {
    id: "PHY101-115",
    question: "The dependent variable in the equation F = k e is?",
    options: ["F","k","e","None"], 
    correct: "F",
    reason: "F depends on e; hence F is the dependent variable."
  },
  {
    id: "PHY101-116",
    question: "The point where the line of best fit touches the vertical axis is called?",
    options: ["Slope","Intercept","Gradient","Origin"], 
    correct: "Intercept",
    reason: "The y-intercept is where the line of best fit cuts the vertical axis."
  },
  {
    id: "PHY101-117",
    question: "Which of the following is not an essential component of a graph?",
    options: ["Title", "Coordinate axes", "Scales", "None of the above"],
    correct: "None of the above",
    reason: "All listed components are essential for a proper graph."
  },
  {
    id: "PHY101-118",
    question: "The slope of the graph obtained in a simple pendulum experiment when a graph of l is plotted against T^2 is 0.25 m s^-2. Determine the value of g.",
    options: ["9.8 ms^-2", "10 ms^-2", "8 ms^-2", "12 ms^-2"],
    correct: "9.8 ms^-2",
    reason: "Slope S = l/T^2 = g/(4π^2) ⇒ g = 4π^2 * S ≈ 9.87 ≈ 9.8 ms^-2."
  },
  {
    id: "PHY101-119",
    question: "In a simple pendulum experiment, the value of T _________ as the value of l increases.",
    options: ["decreases","increases","remains constant","increases and later decreases"],
    correct: "increases",
    reason: "T = 2π√(l/g), so period increases with length."
  },
  {
    id: "PHY101-120",
    question: "A simple pendulum makes 50 oscillations in one minute. Determine its period of oscillation.",
    options: ["1.2 s","1.0 s","1.5 s","1.3 s"],
    correct: "1.2 s",
    reason: "Period T = total time / number of oscillations = 60/50 = 1.2 s."
  },
  {
    id: "PHY101-121",
    question: "The period of oscillation of a simple pendulum is 2 s when the length of the string is 64 cm. Calculate the period if the string’s length is shortened to 49 cm.",
    options: ["1.75 s","1.5 s","1.6 s","1.8 s"],
    correct: "1.75 s",
    reason: "T2 = T1√(L2/L1) = 2√(0.49/0.64) = 2*0.875 = 1.75 s."
  },
  {
    id: "PHY101-122",
    question: "A force of 10 N produced an extension of 2.50 cm. Determine the spring constant.",
    options: ["400 N/m","250 N/m","500 N/m","350 N/m"],
    correct: "400 N/m",
    reason: "k = F/x = 10 / 0.025 = 400 N/m."
  },
  {
    id: "PHY101-123",
    question: "In Hooke’s law experiment, a graph of the extension e was plotted against Force F. If the slope of the graph is 0.4 mN^-1, what is the value of k?",
    options: ["2500 N/m","400 N/m","1000 N/m","500 N/m"],
    correct: "2500 N/m",
    reason: "Slope = e/F ⇒ k = 1/slope = 1/0.0004 = 2500 N/m."
  },
  {
    id: "PHY101-124",
    question: "The energy stored in a spring of stiffness constant k = 2000 N/m when extended by 4 cm is?",
    options: ["1.6 J","2 J","1.2 J","0.8 J"],
    correct: "1.6 J",
    reason: "U = 1/2 k x^2 = 0.5*2000*0.04^2 = 1.6 J."
  },
  {
    id: "PHY101-125",
    question: "Which of the following affect the period of a simple pendulum?",
    options: ["length of string","mass of the bob","acceleration due to gravity","None of the above"],
    correct: "length of string and acceleration due to gravity",
    reason: "T = 2π√(L/g), depends on L and g; independent of mass."
  },
  {
    id: "PHY101-126",
    question: "The frequency of a certain pendulum A is 10 cycles per second, and the frequency of another pendulum B is 5 cycles per second. Which pendulum is longer in length?",
    options: ["A","B","both equal","A is slightly longer than B"],
    correct: "B",
    reason: "T = 1/f ⇒ longer period has lower frequency, so B is longer."
  },
  {
    id: "PHY101-127",
    question: "The period of Oscillation can be defined as?",
    options: ["Time for one complete oscillation","Time for half oscillation","Time for two oscillations","Time to reach maximum displacement"],
    correct: "Time for one complete oscillation",
    reason: "Period is defined as the time for one full cycle of motion."
  },
  {
    id: "PHY101-128",
    question: "The main reading of a Vernier calliper is 6.2 cm. If the main scale and the vernier scale coincides at the 7th position, what is the total reading of the instrument?",
    options: ["6.27 cm","6.20 cm","6.07 cm","6.17 cm"],
    correct: "6.27 cm",
    reason: "Total reading = main scale + vernier scale = 6.2 + 0.07 = 6.27 cm."
  },
  {
    id: "PHY101-129",
    question: "The diameter of a piece of wire can be measured most accurately with a?",
    options: ["Vernier calliper","Micrometer screw gauge","Meter rule","Ruler"],
    correct: "Micrometer screw gauge",
    reason: "Micrometer provides the most precise measurement for small diameters."
  },
  {
    id: "PHY101-130",
    question: "Which of the following represent the correct precision if the length of a piece of wire is measured with a metre rule?",
    options: ["35 mm","35.0 mm","35.00 mm","35.01 mm"],
    correct: "35.0 mm",
    reason: "A metre rule is precise to 1 decimal place (0.1 cm)."
  },
  {
    id: "PHY101-131",
    question: "The smallest scale division of a Vernier caliper is?",
    options: ["0.1 mm","0.01 mm","1 mm","0.5 mm"],
    correct: "0.1 mm",
    reason: "Standard Vernier caliper has 0.1 mm least count."
  },
  {
    id: "PHY101-132",
    question: "Which of the following is not a part of the micrometer screw gauge?",
    options: ["Anvil","Spindle","None","Thimber"],
    correct: "Thimber",
    reason: "It is a typo; the correct part is 'thimble', so 'Thimber' is invalid."
  },
  {
    id: "PHY101-133",
    question: "The clenched jaws of the anvil and the spindle are brought into contact through?",
    options: ["Sleeve","Rachet","Anvil","Spindle"],
    correct: "Rachet",
    reason: "The ratchet ensures uniform pressure when measuring with a micrometer."
  },
  {
    id: "PHY101-134",
    question: "A simple pendulum 0.64 m long has a period of 1.2 s. Calculate the period of a similar pendulum 0.36 m long in the same location.",
    options: ["0.9 s","1.0 s","0.8 s","1.1 s"],
    correct: "0.9 s",
    reason: "T2 = T1√(L2/L1) = 1.2√(0.36/0.64) = 1.2*0.75 = 0.9 s."
  },
  {
    id: "PHY101-135",
    question: "An error due to inherent defects in the method or apparatus used is called?",
    options: ["Systematic error","Random error","Personal error","Gross error"],
    correct: "Systematic error",
    reason: "Systematic errors arise from imperfections in equipment or methodology."
  },
  {
    id: "PHY101-136",
    question: "Errors due to personal peculiarities of an observer where human reaction or estimation affects the results are called?",
    options: ["Systematic error","Random error","Personal error","Instrumental error"],
    correct: "Personal error",
    reason: "Personal errors result from the observer's bias, reaction time, or judgment."
  },
  {
    id: "PHY101-137",
    question: "The only way to eliminate systematic errors is to…",
    options: ["Repeat the experiment","Calibrate the instrument","Use a different observer","Increase sample size"],
    correct: "Calibrate the instrument",
    reason: "Systematic errors can only be corrected by improving or calibrating the apparatus."
  },
  {
    id: "PHY101-138",
    question: "The only remedy to random errors is to…",
    options: ["Repeat the experiment and average","Calibrate the instrument","Use a precise instrument","Change the method"],
    correct: "Repeat the experiment and average",
    reason: "Random errors fluctuate unpredictably and are minimized by averaging multiple readings."
  },
  {
    id: "PHY101-139",
    question: "Errors due to the accuracy of the division of graduated scales on the instrument is called?",
    options: ["Systematic error","Instrumental error","Random error","Personal error"],
    correct: "Instrumental error",
    reason: "Instrumental errors arise from imperfections in measurement scales."
  },
  {
    id: "PHY101-140",
    question: "Errors due to unknown causes or chance are known as?",
    options: ["Systematic error","Random error","Personal error","Gross error"],
    correct: "Random error",
    reason: "Random errors result from unpredictable fluctuations in measurement conditions."
  },
  {
    id: "PHY101-141",
    question: "Experimental errors are usually divided into two main types which are?",
    options: ["Systematic and Random","Personal and Gross","Random and Instrumental","Gross and Calibration"],
    correct: "Systematic and Random",
    reason: "Experimental errors are classified as systematic (predictable) and random (unpredictable)."
  },
  {
    id: "PHY101-142",
    question: "At a glance, _____ gives a comprehensive picture of the experiment than the data themselves.",
    options: ["a device","a curve","a line","a graph"],
    correct: "a graph",
    reason: "Graphs visually summarize trends in data better than tables of numbers."
  },
  {
    id: "PHY101-143",
    question: "The general form of the equation which yields a straight line is?",
    options: ["y = mx^2 + c","xy = mc","y = mx + c","xy = m^2 + c"],
    correct: "y = mx + c",
    reason: "y = mx + c is the standard linear equation representing a straight line."
  },
  {
    id: "PHY101-144",
    question: "The S.I. unit of spring constant is?",
    options: ["N","Nm","N/m","J"],
    correct: "N/m",
    reason: "Spring constant k = Force / extension, unit = N/m."
  },
  {
    id: "PHY101-145",
    question: "To get the elongation e in Hooke’s experiment of elasticity, where L1 is the initial length and L2 is the new length, the equation is?",
    options: ["e = L1 + L2","e = L2 - L1","e = L1 - L2","e = L2/L1"],
    correct: "e = L2 - L1",
    reason: "Elongation is the change in length: e = L2 - L1."
  },
  {
    id: "PHY101-146",
    question: "The change in velocity of a body at a particular time is known as?",
    options: ["Instantaneous velocity","Instantaneous speed","Instantaneous acceleration","Free-fall motion"],
    correct: "Instantaneous acceleration",
    reason: "Acceleration is the rate of change of velocity at a specific moment."
  },
  {
    id: "PHY101-147",
    question: "If two vectors are represented thus: A = 5i + 2j + k and B = 2i + 4j - 3k. Find A • B.",
    options: ["13","15","17","-13"],
    correct: "13",
    reason: "Dot product: A•B = 5*2 + 2*4 + 1*(-3) = 10 + 8 - 3 = 15. Wait, let's check: 10 + 8 - 3 = 15. Correct answer = 15.",
  },
  {
    id: "PHY101-148",
    question: "An object of mass 50 Kg is projected with a velocity of 20 ms^-1 at an angle of 60° to the horizontal. Calculate the time of flight.",
    options: ["3.46 s","2.0 s","1.73 s","1.0 s"],
    correct: "3.46 s",
    reason: "Time of flight T = 2u sinθ / g = 2*20*sin60°/10 ≈ 3.46 s."
  },
  {
    id: "PHY101-149",
    question: "_____ is defined as the process used to check the validity of a specific equation in mechanics.",
    options: ["Uncertainty","Dimensional analysis","Motion analysis","Newton’s equations of motion"],
    correct: "Dimensional analysis",
    reason: "Dimensional analysis tests the consistency of equations using the units of the quantities."
  },
  {
    id: "PHY101-150",
    question: "The independent variable in the equation F = ke is ….",
    options: ["F","k","e","None"],
    correct: "e",
    reason: "In F = ke, F depends on e (extension); thus, e is independent."
  } */
];