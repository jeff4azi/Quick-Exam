export const csc113Questions = [
  {
    id: "CSC113-001",
    question: "How many different arrangements can be made from the letters of the word DOG?",
    options: ["3", "6", "9", "12"],
    correct: "6",
    reason: "The word DOG has 3 unique letters. The number of arrangements is $3! = 3 \\times 2 \\times 1 = 6$."
  },
  {
    id: "CSC113-002",
    question: "In how many ways can 2 students be selected from 6 students?",
    options: ["6", "12", "15", "30"],
    correct: "15",
    reason: "This is a combination problem: $^6C_2 = \\frac{6!}{2!(6-2)!} = \\frac{6 \\times 5}{2 \\times 1} = 15$."
  },
  {
    id: "CSC113-003",
    question: "How many 3-digit numbers can be formed from the digits 1, 2, 3, 4 without repetition?",
    options: ["12", "18", "24", "64"],
    correct: "24",
    reason: "This is a permutation of 4 items taken 3 at a time: $^4P_3 = 4 \\times 3 \\times 2 = 24$."
  },
  {
    id: "CSC113-004",
    question: "In how many ways can 5 people be arranged in a straight line?",
    options: ["25", "60", "120", "720"],
    correct: "120",
    reason: "The number of ways to arrange $n$ objects in a line is $n!$. For 5 people, it is $5! = 5 \\times 4 \\times 3 \\times 2 \\times 1 = 120$."
  },
  {
    id: "CSC113-005",
    question: "How many ways can a committee of 3 people be chosen from 8 people?",
    options: ["24", "56", "120", "336"],
    correct: "56",
    reason: "Using combinations: $^8C_3 = \\frac{8 \\times 7 \\times 6}{3 \\times 2 \\times 1} = 56$."
  },
  {
    id: "CSC113-006",
    question: "How many different arrangements can be made from the letters of the word NOON?",
    options: ["6", "12", "24", "4"],
    correct: "6",
    reason: "The word NOON has 4 letters with N repeating twice and O repeating twice. Arrangements $= \\frac{4!}{2!2!} = \\frac{24}{4} = 6$."
  },
  {
    id: "CSC113-007",
    question: "In how many ways can 6 people sit around a round table?",
    options: ["120", "720", "60", "24"],
    correct: "120",
    reason: "Circular permutation formula is $(n-1)!$. For 6 people, it is $(6-1)! = 5! = 120$."
  },
  {
    id: "CSC113-008",
    question: "How many ways can 3 books be selected from 7 different books?",
    options: ["21", "35", "210", "343"],
    correct: "35",
    reason: "Using combinations: $^7C_3 = \\frac{7 \\times 6 \\times 5}{3 \\times 2 \\times 1} = 35$."
  },
  {
    id: "CSC113-009",
    question: "How many permutations of the letters of the word MATH are possible?",
    options: ["12", "24", "48", "120"],
    correct: "24",
    reason: "MATH has 4 unique letters. $4! = 4 \\times 3 \\times 2 \\times 1 = 24$."
  },
  {
    id: "CSC113-010",
    question: "How many 4-digit numbers can be formed using the digits 1, 2, 3, 4 without repetition?",
    options: ["12", "16", "24", "256"],
    correct: "24",
    reason: "This is $4!$ for the 4 available digits, which equals 24."
  },
  {
    id: "CSC113-011",
    question: "In how many ways can 4 boys and 2 girls be arranged in a row if the girls sit together?",
    options: ["48", "96", "120", "240"],
    correct: "240",
    reason: "Treat the 2 girls as one unit. We now arrange 5 units (4 boys + 1 block of girls) in $5!$ ways. The girls can also swap places in $2!$ ways. Total $= 120 \\times 2 = 240$."
  },
  {
    id: "CSC113-012",
    question: "From 5 men and 4 women, how many committees of 3 men and 1 woman can be formed?",
    options: ["40", "60", "80", "120"],
    correct: "40",
    reason: "Select 3 men from 5 ($^5C_3 = 10$) and 1 woman from 4 ($^4C_1 = 4$). $10 \\times 4 = 40$."
  },
  {
    id: "CSC113-013",
    question: "How many arrangements can be made from the letters of the word SUCCESS?",
    options: ["420", "840", "1260", "5040"],
    correct: "420",
    reason: "Total 7 letters. S repeats 3 times, C repeats 2 times. $\\frac{7!}{3!2!} = \\frac{5040}{6 \\times 2} = \\frac{5040}{12} = 420$."
  },
  {
    id: "CSC113-014",
    question: "How many different signals can be made using 5 flags, if all flags are used at once?",
    options: ["24", "60", "120", "240"],
    correct: "120",
    reason: "The arrangement of 5 distinct items is $5! = 120$."
  },
  {
    id: "CSC113-015",
    question: "How many ways can 7 people be arranged in a circle?",
    options: ["720", "120", "60", "24"],
    correct: "720",
    reason: "Circular permutation: $(7-1)! = 6! = 720$."
  },
  {
    id: "CSC113-016",
    question: "How many ways can 8 people be arranged in a row if two particular persons must sit together?",
    options: ["720", "5040", "10080", "40320"],
    correct: "10080",
    reason: "Treat the 2 specific people as one unit. We arrange 7 units in $7!$ ways (5040). The 2 people can swap places in $2!$ ways. $5040 \\times 2 = 10080$."
  },
  {
    id: "CSC113-017",
    question: "How many different arrangements are possible from the letters of the word BANANA?",
    options: ["20", "60", "120", "720"],
    correct: "60",
    reason: "Total 6 letters. A repeats 3 times, N repeats 2 times. $\\frac{6!}{3!2!} = \\frac{720}{6 \\times 2} = 60$."
  },
  {
    id: "CSC113-018",
    question: "In how many ways can a team of 4 players be chosen from 10 players?",
    options: ["40", "120", "210", "5040"],
    correct: "210",
    reason: "Combination: $^{10}C_4 = \\frac{10 \\times 9 \\times 8 \\times 7}{4 \\times 3 \\times 2 \\times 1} = 210$."
  },
  {
    id: "CSC113-019",
    question: "How many subsets can be formed from a set containing 4 elements?",
    options: ["8", "12", "16", "24"],
    correct: "16",
    reason: "The number of subsets for a set with $n$ elements is $2^n$. $2^4 = 16$."
  },
  {
    id: "CSC113-020",
    question: "From 6 boys and 5 girls, how many committees of 2 boys and 2 girls can be formed?",
    options: ["150", "200", "225", "300"],
    correct: "150",
    reason: "Select 2 boys from 6 ($^6C_2 = 15$) and 2 girls from 5 ($^5C_2 = 10$). $15 \\times 10 = 150$."
  },
  {
    id: "CSC113-021",
    question: "Which of the following is a set?",
    options: ["A collection of good students", "A collection of tall boys", "A collection of all even numbers", "A collection of beautiful girls"],
    correct: "A collection of all even numbers",
    reason: "A set must be well-defined. 'Good', 'tall', and 'beautiful' are subjective, but 'even numbers' is a clearly defined mathematical property."
  },
  {
    id: "CSC113-022",
    question: "If A={1,3,5,7}, which of the following is not an element of A?",
    options: ["1", "3", "6", "7"],
    correct: "6",
    reason: "The number 6 does not appear in the defined set A."
  },
  {
    id: "CSC113-023",
    question: "Which of the following is the empty (null) set?",
    options: ["{0}", "{}", "{x:x>0}", "{1}"],
    correct: "{}",
    reason: "The empty set contains no elements, denoted by {} or $\\emptyset$. {0} contains the element zero."
  },
  {
    id: "CSC113-024",
    question: "If A={a,b,c}, how many subsets does A have?",
    options: ["3", "6", "8", "9"],
    correct: "8",
    reason: "A has 3 elements. Subsets $= 2^3 = 8$."
  },
  {
    id: "CSC113-025",
    question: "Which of the following is a finite set?",
    options: ["Set of real numbers", "Set of integers", "Set of prime numbers", "Set of days in a week"],
    correct: "Set of days in a week",
    reason: "There are exactly 7 days in a week, making it countable and finite. The other options are infinite."
  },
  {
    id: "CSC113-026",
    question: "If A={1,2,3} and B={3,4,5}, find A∩B.",
    options: ["{1,2}", "{3}", "{4,5}", "{1,2,3,4,5}"],
    correct: "{3}",
    reason: "Intersection (∩) finds elements common to both sets. Only '3' is in both."
  },
  {
    id: "CSC113-027",
    question: "If A={2,4,6,8} and B={1,2,3,4}, find A ∪ B.",
    options: ["{2,4}", "{1,2,3,4,6,8}", "{6,8}", "{1,3}"],
    correct: "{1,2,3,4,6,8}",
    reason: "Union (∪) combines all elements from both sets, removing duplicates."
  },
  {
    id: "CSC113-028",
    question: "If A={1,3,5,7}, which of the following is not an element of A?",
    options: ["1", "3", "6", "7"],
    correct: "6",
    reason: "This is a repetition of question 22. 6 is not in the set."
  },
  {
    id: "CSC113-029",
    question: "If A={1,2,3} and B={3,4,5}, find A∩B",
    options: ["{1,2}", "{3}", "{4,5}", "{1,2,3,4,5}"],
    correct: "{3}",
    reason: "Intersection (∩) is the set of elements common to A and B."
  },
  {
    id: "CSC113-030",
    question: "If A={2,4,6,8} and B={1,2,3,4}, find A ∪ B.",
    options: ["{2,4}", "{1,2,3,4,6,8}", "{6,8}", "{1,3}"],
    correct: "{1,2,3,4,6,8}",
    reason: "Union combines all members: 1, 2, 3, 4, 6, and 8."
  },
  {
    id: "CSC113-031",
    question: "Which of the following statements is true?",
    options: ["3 ⊂ {3}", "{3} ⊂ 3", "3 ∈ {3}", "{3} ∈ 3"],
    correct: "3 ∈ {3}",
    reason: "The element 3 belongs to (is a member of) the set {3}."
  },
  {
    id: "CSC113-032",
    question: "If the universal set U={1,2,3,4,5} and A={1,3}, find A′",
    options: ["{1,3}", "{2,4,5}", "{1,2,3}", "{4,5}"],
    correct: "{2,4,5}",
    reason: "The complement A' consists of elements in U that are not in A."
  },
  {
    id: "CSC113-033",
    question: "Two sets are equal if:",
    options: ["They have the same number of elements", "They have exactly the same elements", "They are subsets of each other", "They have common elements"],
    correct: "They have exactly the same elements",
    reason: "Equality in sets requires identical members, regardless of order."
  },
  {
    id: "CSC113-034",
    question: "Which of the following is a subset of A = {1, 2, 3}?",
    options: ["{4}", "{1, 4}", "{1, 2}", "{5, 6}"],
    correct: "{1, 2}",
    reason: "A subset contains only elements that are already present in the parent set."
  },
  {
    id: "CSC113-035",
    question: "The universal set is the set that:",
    options: ["Contains all subsets", "Contains no element", "Contains all elements under consideration", "Is always infinite"],
    correct: "Contains all elements under consideration",
    reason: "By definition, the universal set U contains every element relevant to the specific problem or context."
  },
  {
    id: "CSC113-036",
    question: "If A = {2, 4, 6} and B = {1, 3, 5}, then A ∩ B =",
    options: ["{1, 2}", "{ }", "{2, 4}", "{6}"],
    correct: "{ }",
    reason: "Since there are no common elements between even numbers {2, 4, 6} and odd numbers {1, 3, 5}, the intersection is the empty set."
  },
  {
    id: "CSC113-037",
    question: "Which of the following is a singleton set?",
    options: ["{1, 2}", "{a, b, c}", "{5}", "{ }"],
    correct: "{5}",
    reason: "A singleton set is a set containing exactly one element."
  },
  {
    id: "CSC113-038",
    question: "If A ⊆ B, then:",
    options: ["B ⊆ A", "Every element of A is in B", "A and B are equal", "A is empty"],
    correct: "Every element of A is in B",
    reason: "The notation A ⊆ B means that A is a subset of B, implying all members of A must exist in B."
  },
  {
    id: "CSC113-039",
    question: "The complement of a set A is denoted by:",
    options: ["A⁻¹", "A′", "A⁺", "A*"],
    correct: "A′",
    reason: "Standard notation for the complement of set A includes A' or $A^c$."
  },
  {
    id: "CSC113-040",
    question: "Which operation gives elements common to two sets?",
    options: ["Union", "Difference", "Intersection", "Complement"],
    correct: "Intersection",
    reason: "Intersection identifies the overlapping members of two or more sets."
  },
  {
    id: "CSC113-041",
    question: "Probability of an event always lies between:",
    options: ["−1 and 1", "0 and 1", "1 and 2", "−∞ and ∞"],
    correct: "0 and 1",
    reason: "Probabilities are expressed as values from 0 (impossible) to 1 (certain)."
  },
  {
    id: "CSC113-042",
    question: "If an event is impossible, its probability is:",
    options: ["1", "0", "−1", "½"],
    correct: "0",
    reason: "An event that cannot occur has a mathematical probability of zero."
  },
  {
    id: "CSC113-043",
    question: "If an event is certain, its probability is:",
    options: ["0", "½", "1", "−1"],
    correct: "1",
    reason: "An event that is guaranteed to happen has a probability of 1."
  },
  {
    id: "CSC113-044",
    question: "A card is drawn at random from a standard deck of 52 cards. What is the probability of drawing a heart?",
    options: ["1/52", "1/26", "1/13", "1/4"],
    correct: "1/4",
    reason: "There are 13 hearts in a deck of 52. Probability = 13/52 = 1/4."
  },
  {
    id: "CSC113-045",
    question: "A die is thrown once. What is the probability of getting an even number?",
    options: ["1/6", "1/3", "1/2", "2/3"],
    correct: "1/2",
    reason: "The even outcomes are {2, 4, 6}. Probability = 3/6 = 1/2."
  },
  {
    id: "CSC113-046",
    question: "If P(A) = 0.35, find P(A′).",
    options: ["0.35", "0.65", "1.35", "−0.35"],
    correct: "0.65",
    reason: "P(A') = 1 - P(A) = 1 - 0.35 = 0.65."
  },
  {
    id: "CSC113-047",
    question: "Two coins are tossed. What is the probability of getting two heads?",
    options: ["1/2", "1/3", "1/4", "3/4"],
    correct: "1/4",
    reason: "The sample space is {HH, HT, TH, TT}. Only one outcome (HH) is 'two heads' out of four total."
  },
  {
    id: "CSC113-048",
    question: "A bag contains 3 red balls and 5 blue balls. One ball is picked at random. What is the probability that it is red?",
    options: ["3/5", "5/8", "3/8", "1/8"],
    correct: "3/8",
    reason: "Total balls = 3 + 5 = 8. Red balls = 3. Probability = 3/8."
  },
  {
    id: "CSC113-049",
    question: "The sum of probabilities of all possible outcomes of a random experiment is:",
    options: ["0", "1", "2", "½"],
    correct: "1",
    reason: "The total probability of the entire sample space is always 1."
  },
  {
    id: "CSC113-050",
    question: "If events A and B are mutually exclusive, then:",
    options: ["P(A ∩ B) = 1", "P(A ∪ B) = P(A) × P(B)", "P(A ∩ B) = 0", "P(A) = P(B)"],
    correct: "P(A ∩ B) = 0",
    reason: "Mutually exclusive events cannot happen at the same time, so their intersection is zero."
  },
  {
    id: "CSC113-051",
    question: "A number is selected at random from {1, 2, 3, 4, 5}. What is the probability that the number is prime?",
    options: ["1/5", "2/5", "3/5", "4/5"],
    correct: "3/5",
    reason: "Prime numbers in the set are {2, 3, 5}. Probability = 3/5."
  },
  {
    id: "CSC113-052",
    question: "When a die is thrown, what is the probability of getting a number greater than 4?",
    options: ["1/6", "1/3", "1/2", "2/3"],
    correct: "1/3",
    reason: "The numbers greater than 4 are {5, 6}. Probability = 2/6 = 1/3."
  },
  {
    id: "CSC113-053",
    question: "If P(A) = 0.7 and P(B) = 0.4, and A and B are independent, find P(A ∩ B).",
    options: ["0.11", "0.28", "1.1", "0.3"],
    correct: "0.28",
    reason: "For independent events, P(A ∩ B) = P(A) × P(B) = 0.7 × 0.4 = 0.28."
  },
  {
    id: "CSC113-054",
    question: "A letter is chosen at random from the word “PROBABILITY”. What is the probability that the letter chosen is a vowel?",
    options: ["3/11", "4/11", "5/11", "6/11"],
    correct: "4/11",
    reason: "Total letters = 11. Vowels are {O, A, I, I} = 4. Probability = 4/11."
  },
  {
    id: "CSC113-055",
    question: "A box contains 6 white balls and 4 black balls. One ball is drawn at random. What is the probability that it is black?",
    options: ["2/5", "3/5", "1/5", "4/5"],
    correct: "2/5",
    reason: "Total balls = 10. Black balls = 4. Probability = 4/10 = 2/5."
  },
  {
    id: "CSC113-056",
    question: "If two events cannot occur at the same time, they are called:",
    options: ["Independent events", "Dependent events", "Mutually exclusive events", "Exhaustive events"],
    correct: "Mutually exclusive events",
    reason: "By definition, mutually exclusive events have no shared outcomes."
  },
  {
    id: "CSC113-057",
    question: "The probability of selecting a non-prime number from {1, 2, 3, 4, 5, 6} is:",
    options: ["1/6", "1/3", "1/2", "2/3"],
    correct: "1/2",
    reason: "Prime numbers are {2, 3, 5}. Non-primes (including 1) are {1, 4, 6}. Probability = 3/6 = 1/2."
  },
  {
    id: "CSC113-058",
    question: "Which of the following is NOT a probability value?",
    options: ["0", "0.75", "1", "1.25"],
    correct: "1.25",
    reason: "Probability values must be within the range [0, 1]. 1.25 is invalid."
  },
  {
    id: "CSC113-059",
    question: "A coin is tossed once. What is the probability of getting a tail?",
    options: ["0", "1/4", "1/2", "1"],
    correct: "1/2",
    reason: "A fair coin has two outcomes (H, T). Probability of T is 1/2."
  },
  {
    id: "CSC113-060",
    question: "If P(A ∪ B) = 1, then events A and B are:",
    options: ["Independent", "Complementary", "Mutually exclusive", "Exhaustive"],
    correct: "Exhaustive",
    reason: "Exhaustive events cover the entire sample space, so the probability of their union is 1."
  },
  {
    id: "CSC113-061",
    question: "A matrix is defined as:",
    options: ["A set of numbers", "A rectangular array of numbers arranged in rows and columns", "A square table of values", "A single row of numbers"],
    correct: "A rectangular array of numbers arranged in rows and columns",
    reason: "This is the formal definition of a matrix in linear algebra."
  },
  {
    id: "CSC113-062",
    question: "The order of a matrix with 3 rows and 4 columns is:",
    options: ["3 × 4", "4 × 3", "7 × 1", "12 × 1"],
    correct: "3 × 4",
    reason: "Order is always expressed as (number of rows) × (number of columns)."
  },
  {
    id: "CSC113-063",
    question: "How many elements are in a matrix of order 2 × 3?",
    options: ["5", "6", "8", "9"],
    correct: "6",
    reason: "The number of elements is found by multiplying the rows and columns: $2 \\times 3 = 6$."
  },
  {
    id: "CSC113-064",
    question: "Which of the following is a square matrix?",
    options: ["2 × 3", "3 × 2", "1 × 3", "3 × 3"],
    correct: "3 × 3",
    reason: "A square matrix has an equal number of rows and columns."
  },
  {
    id: "CSC113-065",
    question: "If A is a matrix of order 2 × 3 and B is of order 3 × 2, then the order of AB is:",
    options: ["2 × 2", "3 × 3", "3 × 2", "2 × 3"],
    correct: "2 × 2",
    reason: "When multiplying an $(m \times n)$ matrix by an $(n \times p)$ matrix, the result is $(m \times p)$. Here $(2 \times 3) \\times (3 \\times 2) = 2 \\times 2$."
  },
  {
    id: "CSC113-066",
    question: "Matrix multiplication is possible only when:",
    options: ["The matrices are square", "The number of rows are equal", "The number of columns of the first equals the number of rows of the second", "Both matrices have the same order"],
    correct: "The number of columns of the first equals the number of rows of the second",
    reason: "This is the fundamental condition for matrix conformability."
  },
  {
    id: "CSC113-067",
    question: "Which of the following is a zero (null) matrix?",
    options: ["A matrix with ones on the diagonal", "A matrix with all elements equal to zero", "A matrix with unequal rows and columns", "A matrix with equal rows"],
    correct: "A matrix with all elements equal to zero",
    reason: "A zero matrix is one where every single entry is 0."
  },
  {
    id: "CSC113-068",
    question: "The identity matrix is a square matrix with:",
    options: ["All elements equal to 1", "All diagonal elements equal to 0", "All diagonal elements equal to 1 and others 0", "All elements equal"],
    correct: "All diagonal elements equal to 1 and others 0",
    reason: "The identity matrix (I) must have 1s on the main diagonal and 0s elsewhere."
  },
  {
    id: "CSC113-069",
    question: "If A = [2 3; 4 5] then Aᵀ is:",
    options: ["[2 3; 4 5]", "[2 4; 3 5]", "[3 2; 5 4]", "[5 4; 3 2]"],
    correct: "[2 4; 3 5]",
    reason: "Transpose is found by switching rows into columns. Row 1 (2, 3) becomes Column 1."
  },
  {
    id: "CSC113-070",
    question: "The transpose of a matrix is obtained by:",
    options: ["Multiplying rows by columns", "Changing signs of elements", "Interchanging rows and columns", "Finding the inverse"],
    correct: "Interchanging rows and columns",
    reason: "To get $A^T$, the element at $a_{ij}$ is moved to $a_{ji}$."
  },
  {
    id: "CSC113-071",
    question: "Two matrices are equal if:",
    options: ["They have the same number of elements", "They have the same order and equal corresponding elements", "They are both square", "Their determinants are equal"],
    correct: "They have the same order and equal corresponding elements",
    reason: "Equality requires both identical dimensions and identical values in every position."
  },
  {
    id: "CSC113-072",
    question: "If A + B = B + A for matrices A and B, this property is called:",
    options: ["Associative", "Distributive", "Commutative", "Identity"],
    correct: "Commutative",
    reason: "The property where order does not matter in addition is the commutative property."
  },
  {
    id: "CSC113-073",
    question: "Which of the following is NOT possible for matrices?",
    options: ["A + B = B + A", "(A + B) + C = A + (B + C)", "A(B + C) = AB + AC", "AB = BA always"],
    correct: "AB = BA always",
    reason: "Matrix multiplication is generally non-commutative; $AB$ is rarely equal to $BA$."
  },
  {
    id: "CSC113-074",
    question: "The determinant of a 2 × 2 matrix [a b; c d] is:",
    options: ["ad + bc", "ab − cd", "ad − bc", "ac − bd"],
    correct: "ad − bc",
    reason: "The standard formula for the determinant of a $2 \\times 2$ matrix is the product of the main diagonal minus the product of the off-diagonal."
  },
  {
    id: "CSC113-075",
    question: "A matrix whose transpose is equal to itself is called:",
    options: ["Identity matrix", "Symmetric matrix", "Skew matrix", "Zero matrix"],
    correct: "Symmetric matrix",
    reason: "A symmetric matrix satisfies the condition $A = A^T$."
  },
  {
    id: "CSC113-076",
    question: "A matrix whose transpose is the negative of itself is called:",
    options: ["Symmetric", "Identity", "Skew-symmetric", "Singular"],
    correct: "Skew-symmetric",
    reason: "A skew-symmetric matrix satisfies the condition $A^T = -A$."
  },
  {
    id: "CSC113-077",
    question: "If A is a matrix and I is the identity matrix of the same order, then AI =",
    options: ["I", "A", "0", "A²"],
    correct: "A",
    reason: "The identity matrix acts as the number 1 in matrix multiplication."
  },
  {
    id: "CSC113-078",
    question: "A matrix that has only one row is called:",
    options: ["Column matrix", "Square matrix", "Row matrix", "Diagonal matrix"],
    correct: "Row matrix",
    reason: "A matrix with dimensions $1 \\times n$ is a row matrix."
  },
  {
    id: "CSC113-079",
    question: "A matrix that has only one column is called:",
    options: ["Row matrix", "Column matrix", "Identity matrix", "Scalar matrix"],
    correct: "Column matrix",
    reason: "A matrix with dimensions $n \\times 1$ is a column matrix."
  },
  {
    id: "CSC113-080",
    question: "If the determinant of a matrix is zero, the matrix is called:",
    options: ["Non-singular", "Identity", "Symmetric", "Singular"],
    correct: "Singular",
    reason: "A matrix with $|A| = 0$ is singular and has no inverse."
  }
];
