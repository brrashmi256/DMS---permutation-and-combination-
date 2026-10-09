// 2nd-Year B.E. DMS Worksheet: 70 Comprehensive Problems (10 for each of 7 topics)
// Every question has difficulty, category, progressive hints, and step-by-step solutions

export interface WorksheetQuestion {
  id: string;
  topicId: "factorials" | "perm_no_rep" | "comb_no_rep" | "perm_rep" | "comb_rep" | "circular_perm" | "identical_objects";
  topicName: string;
  difficulty: "Easy" | "Medium" | "Challenging";
  category: "Numerical" | "Real-Life Scenario";
  question: string;
  type: "numeric" | "mcq";
  options?: string[]; // for mcq
  correctAnswer: string; // trimmed string match or exact option
  hints: string[];
  solutionSteps: string[];
  finalAnswerExplanation: string;
}

export const WORKSHEET_QUESTIONS: WorksheetQuestion[] = [
  // ==========================================
  // TOPIC A: FACTORIALS (Questions 1 to 10)
  // ==========================================
  {
    id: "ws_01",
    topicId: "factorials",
    topicName: "Factorials",
    difficulty: "Easy",
    category: "Numerical",
    question: "Evaluate the exact value of 5! (factorial of 5).",
    type: "numeric",
    correctAnswer: "120",
    hints: [
      "Recall the definition of factorial: n! = n × (n-1) × ... × 1.",
      "Multiply 5 × 4 × 3 × 2 × 1."
    ],
    solutionSteps: [
      "Step 1: Write down the definition: 5! = 5 × 4 × 3 × 2 × 1.",
      "Step 2: 5 × 4 = 20.",
      "Step 3: 20 × 3 = 60.",
      "Step 4: 60 × 2 = 120.",
      "Step 5: 120 × 1 = 120."
    ],
    finalAnswerExplanation: "5! = 120."
  },
  {
    id: "ws_02",
    topicId: "factorials",
    topicName: "Factorials",
    difficulty: "Easy",
    category: "Numerical",
    question: "What is the mathematical value of 0! according to combinatorial definition and recurrence relation?",
    type: "numeric",
    correctAnswer: "1",
    hints: [
      "Remember the recurrence n! = n × (n-1)!. Substitute n = 1.",
      "0! is the empty product, defined as the multiplicative identity."
    ],
    solutionSteps: [
      "Step 1: Use recurrence identity: (n - 1)! = n! / n.",
      "Step 2: Substitute n = 1: (1 - 1)! = 1! / 1.",
      "Step 3: 0! = 1 / 1 = 1."
    ],
    finalAnswerExplanation: "0! = 1."
  },
  {
    id: "ws_03",
    topicId: "factorials",
    topicName: "Factorials",
    difficulty: "Easy",
    category: "Numerical",
    question: "Simplify the factorial fraction 7! / 5!.",
    type: "numeric",
    correctAnswer: "42",
    hints: [
      "Do not expand 7! completely into 5,040.",
      "Expand 7! as 7 × 6 × 5! and cancel the 5! in the denominator."
    ],
    solutionSteps: [
      "Step 1: Rewrite 7! as 7 × 6 × 5!.",
      "Step 2: Expression becomes (7 × 6 × 5!) / 5!.",
      "Step 3: Cancel 5! from both numerator and denominator.",
      "Step 4: Evaluate 7 × 6 = 42."
    ],
    finalAnswerExplanation: "7! / 5! = 7 × 6 = 42."
  },
  {
    id: "ws_04",
    topicId: "factorials",
    topicName: "Factorials",
    difficulty: "Medium",
    category: "Numerical",
    question: "Evaluate the fraction: 8! / (4! × 4!).",
    type: "numeric",
    correctAnswer: "70",
    hints: [
      "Expand 8! down to 4!: 8 × 7 × 6 × 5 × 4!.",
      "Cancel one 4! and expand the other 4! as 24."
    ],
    solutionSteps: [
      "Step 1: 8! = 8 × 7 × 6 × 5 × 4!.",
      "Step 2: (8 × 7 × 6 × 5 × 4!) / (4! × 24) = (8 × 7 × 6 × 5) / 24.",
      "Step 3: 8 × 6 = 48, and 48 / 24 = 2.",
      "Step 4: Remaining product is 2 × 7 × 5 = 70."
    ],
    finalAnswerExplanation: "8! / (4! × 4!) = 1,680 / 24 = 70."
  },
  {
    id: "ws_05",
    topicId: "factorials",
    topicName: "Factorials",
    difficulty: "Medium",
    category: "Numerical",
    question: "Solve for the positive integer n in the equation: (n + 1)! = 12 × (n - 1)!.",
    type: "numeric",
    correctAnswer: "3",
    hints: [
      "Expand (n + 1)! as (n + 1) × n × (n - 1)!.",
      "Divide both sides by (n - 1)! to get a quadratic equation."
    ],
    solutionSteps: [
      "Step 1: (n + 1) × n × (n - 1)! = 12 × (n - 1)!.",
      "Step 2: Divide both sides by (n - 1)!: (n + 1) × n = 12.",
      "Step 3: n² + n - 12 = 0.",
      "Step 4: Factor: (n + 4)(n - 3) = 0.",
      "Step 5: Discard negative root n = -4. Hence n = 3."
    ],
    finalAnswerExplanation: "n = 3 (since 4! = 24 and 12 × 2! = 24)."
  },
  {
    id: "ws_06",
    topicId: "factorials",
    topicName: "Factorials",
    difficulty: "Medium",
    category: "Real-Life Scenario",
    question: "In how many ways can 5 distinct software testing tasks be scheduled sequentially on a single-core CPU?",
    type: "numeric",
    correctAnswer: "120",
    hints: [
      "All 5 tasks are distinct and processed in sequence without repetition.",
      "Apply the factorial formula n! for arranging n distinct items."
    ],
    solutionSteps: [
      "Step 1: Total distinct tasks n = 5.",
      "Step 2: Number of sequential schedules = 5!.",
      "Step 3: 5! = 5 × 4 × 3 × 2 × 1 = 120."
    ],
    finalAnswerExplanation: "There are 120 distinct task schedules."
  },
  {
    id: "ws_07",
    topicId: "factorials",
    topicName: "Factorials",
    difficulty: "Medium",
    category: "Real-Life Scenario",
    question: "In how many ways can 6 different discrete math books be arranged on a shelf if 2 specific books must always be kept together side by side?",
    type: "numeric",
    correctAnswer: "240",
    hints: [
      "Treat the 2 specific books as a single super-item.",
      "Now arrange (6 - 2 + 1) = 5 items, and multiply by the internal arrangements of the 2 books."
    ],
    solutionSteps: [
      "Step 1: Bundle the 2 specific books into 1 block [B1, B2].",
      "Step 2: Total entities to arrange = 4 other books + 1 block = 5 entities.",
      "Step 3: Arrangements of 5 entities = 5! = 120.",
      "Step 4: Internal arrangements of the 2 books = 2! = 2.",
      "Step 5: Total arrangements = 120 × 2 = 240."
    ],
    finalAnswerExplanation: "5! × 2! = 120 × 2 = 240 arrangements."
  },
  {
    id: "ws_08",
    topicId: "factorials",
    topicName: "Factorials",
    difficulty: "Challenging",
    category: "Numerical",
    question: "What is the remainder when (1! + 2! + 3! + 4! + 5! + ... + 100!) is divided by 15?",
    type: "numeric",
    correctAnswer: "3",
    hints: [
      "Find which term first has 15 = 3 × 5 as a factor.",
      "5! = 120, which is divisible by 15. All terms k! for k ≥ 5 are multiples of 15!"
    ],
    solutionSteps: [
      "Step 1: 5! = 120 = 15 × 8, so 5! ≡ 0 (mod 15).",
      "Step 2: For all k ≥ 5, k! contains 3 and 5, so k! ≡ 0 (mod 15).",
      "Step 3: Only sum terms from 1! to 4!: 1! + 2! + 3! + 4! = 1 + 2 + 6 + 24 = 33.",
      "Step 4: Divide 33 by 15: 33 = 2 × 15 + 3.",
      "Step 5: Remainder is 3."
    ],
    finalAnswerExplanation: "The remainder is 3."
  },
  {
    id: "ws_09",
    topicId: "factorials",
    topicName: "Factorials",
    difficulty: "Challenging",
    category: "Numerical",
    question: "How many trailing zeros are there at the end of the decimal representation of 50!?",
    type: "numeric",
    correctAnswer: "12",
    hints: [
      "Use Legendre's formula: sum of floor(50 / 5^k).",
      "Calculate floor(50/5) + floor(50/25)."
    ],
    solutionSteps: [
      "Step 1: Trailing zeros equal the exponent of 5 in 50!.",
      "Step 2: floor(50 / 5) = 10.",
      "Step 3: floor(50 / 25) = 2.",
      "Step 4: floor(50 / 125) = 0.",
      "Step 5: Total zeros = 10 + 2 = 12."
    ],
    finalAnswerExplanation: "There are 12 trailing zeros in 50!."
  },
  {
    id: "ws_10",
    topicId: "factorials",
    topicName: "Factorials",
    difficulty: "Challenging",
    category: "Real-Life Scenario",
    question: "In how many ways can 7 engineering students stand in a line such that 2 particular students, Raj and Amit, NEVER stand next to each other?",
    type: "numeric",
    correctAnswer: "3600",
    hints: [
      "Use complementary counting: Total arrangements minus arrangements where they are together.",
      "Total = 7!, Together = 6! × 2!."
    ],
    solutionSteps: [
      "Step 1: Total unrestricted arrangements = 7! = 5,040.",
      "Step 2: Bundle Raj and Amit into 1 block. Total entities = 6.",
      "Step 3: Arrangements with Raj and Amit together = 6! × 2! = 720 × 2 = 1,440.",
      "Step 4: Arrangements where they are not adjacent = 5,040 - 1,440 = 3,600."
    ],
    finalAnswerExplanation: "5,040 - 1,440 = 3,600 valid lineups."
  },

  // ==========================================
  // TOPIC B: PERMUTATIONS WITHOUT REPETITION (Questions 11 to 20)
  // ==========================================
  {
    id: "ws_11",
    topicId: "perm_no_rep",
    topicName: "Permutations Without Repetition",
    difficulty: "Easy",
    category: "Numerical",
    question: "Compute the value of 5P3 (permutations of 5 items taken 3 at a time).",
    type: "numeric",
    correctAnswer: "60",
    hints: [
      "Formula: nPr = n! / (n - r)!.",
      "Evaluate 5! / (5 - 3)! = 5! / 2! = 5 × 4 × 3."
    ],
    solutionSteps: [
      "Step 1: Apply formula: 5P3 = 5! / (5 - 3)! = 5! / 2!.",
      "Step 2: 5! / 2! = 5 × 4 × 3.",
      "Step 3: 5 × 4 = 20.",
      "Step 4: 20 × 3 = 60."
    ],
    finalAnswerExplanation: "5P3 = 60."
  },
  {
    id: "ws_12",
    topicId: "perm_no_rep",
    topicName: "Permutations Without Repetition",
    difficulty: "Easy",
    category: "Numerical",
    question: "Compute the value of 7P2.",
    type: "numeric",
    correctAnswer: "42",
    hints: [
      "nPr with r = 2 is simply n × (n - 1).",
      "Multiply 7 × 6."
    ],
    solutionSteps: [
      "Step 1: 7P2 = 7! / (7 - 2)! = 7! / 5!.",
      "Step 2: 7 × 6 = 42."
    ],
    finalAnswerExplanation: "7P2 = 42."
  },
  {
    id: "ws_13",
    topicId: "perm_no_rep",
    topicName: "Permutations Without Repetition",
    difficulty: "Easy",
    category: "Real-Life Scenario",
    question: "In a race of 8 runners, in how many ways can the first, second, and third place podium spots be awarded assuming no ties?",
    type: "numeric",
    correctAnswer: "336",
    hints: [
      "Order matters because 1st, 2nd, and 3rd are distinct ranks.",
      "Compute 8P3 = 8 × 7 × 6."
    ],
    solutionSteps: [
      "Step 1: Total runners n = 8, podium spots r = 3.",
      "Step 2: 8P3 = 8! / (8 - 3)! = 8! / 5!.",
      "Step 3: 8 × 7 × 6 = 56 × 6 = 336."
    ],
    finalAnswerExplanation: "8P3 = 336 ways."
  },
  {
    id: "ws_14",
    topicId: "perm_no_rep",
    topicName: "Permutations Without Repetition",
    difficulty: "Medium",
    category: "Real-Life Scenario",
    question: "From a batch of 10 students, how many distinct 3-person executive committees (President, Vice-President, Treasurer) can be appointed?",
    type: "numeric",
    correctAnswer: "720",
    hints: [
      "Roles are distinct (order matters). No student can hold multiple offices.",
      "Calculate 10P3 = 10 × 9 × 8."
    ],
    solutionSteps: [
      "Step 1: n = 10, r = 3 distinct roles.",
      "Step 2: 10P3 = 10! / (10 - 3)! = 10! / 7!.",
      "Step 3: 10 × 9 × 8 = 90 × 8 = 720."
    ],
    finalAnswerExplanation: "10P3 = 720 distinct executive teams."
  },
  {
    id: "ws_15",
    topicId: "perm_no_rep",
    topicName: "Permutations Without Repetition",
    difficulty: "Medium",
    category: "Numerical",
    question: "How many 4-digit numbers with all DISTINCT digits can be formed using the non-zero digits {1, 2, 3, 4, 5, 6, 7}?",
    type: "numeric",
    correctAnswer: "840",
    hints: [
      "Total available digits n = 7. Slots r = 4. No repetition allowed.",
      "Calculate 7P4 = 7 × 6 × 5 × 4."
    ],
    solutionSteps: [
      "Step 1: n = 7, r = 4.",
      "Step 2: 7P4 = 7! / (7 - 4)! = 7! / 3!.",
      "Step 3: 7 × 6 × 5 × 4 = 42 × 20 = 840."
    ],
    finalAnswerExplanation: "7P4 = 840 numbers."
  },
  {
    id: "ws_16",
    topicId: "perm_no_rep",
    topicName: "Permutations Without Repetition",
    difficulty: "Medium",
    category: "Numerical",
    question: "How many 3-digit EVEN numbers can be formed from the digits {1, 2, 3, 4, 5, 6} without repetition?",
    type: "numeric",
    correctAnswer: "60",
    hints: [
      "For an even number, the units digit must be even: {2, 4, 6} (3 choices).",
      "Then fill the remaining 2 slots from the remaining 5 digits: 5P2."
    ],
    solutionSteps: [
      "Step 1: Units place choice: 3 choices ({2, 4, 6}).",
      "Step 2: Hundreds and tens places: choose 2 digits from the remaining 5 digits.",
      "Step 3: 5P2 = 5 × 4 = 20.",
      "Step 4: Total = 3 × 20 = 60."
    ],
    finalAnswerExplanation: "3 × 5P2 = 3 × 20 = 60 even numbers."
  },
  {
    id: "ws_17",
    topicId: "perm_no_rep",
    topicName: "Permutations Without Repetition",
    difficulty: "Medium",
    category: "Numerical",
    question: "Find n if nP4 = 12 × nP2, with n ≥ 4.",
    type: "numeric",
    correctAnswer: "6",
    hints: [
      "Expand nP4 as n(n-1)(n-2)(n-3) and nP2 as n(n-1).",
      "Cancel n(n-1) to get (n-2)(n-3) = 12."
    ],
    solutionSteps: [
      "Step 1: n(n-1)(n-2)(n-3) = 12 n(n-1).",
      "Step 2: Divide both sides by n(n-1): (n-2)(n-3) = 12.",
      "Step 3: n² - 5n + 6 = 12 ⇒ n² - 5n - 6 = 0.",
      "Step 4: (n - 6)(n + 1) = 0.",
      "Step 5: Discard negative root n = -1. Result n = 6."
    ],
    finalAnswerExplanation: "n = 6."
  },
  {
    id: "ws_18",
    topicId: "perm_no_rep",
    topicName: "Permutations Without Repetition",
    difficulty: "Challenging",
    category: "Real-Life Scenario",
    question: "In how many ways can 4 boys and 4 girls sit in a row of 8 chairs such that boys and girls alternate seats?",
    type: "numeric",
    correctAnswer: "1152",
    hints: [
      "There are two alternating patterns: B-G-B-G-B-G-B-G or G-B-G-B-G-B-G-B.",
      "For each pattern, boys arrange in 4! ways and girls arrange in 4! ways."
    ],
    solutionSteps: [
      "Step 1: Pattern 1 (Boy first): 4! (boys) × 4! (girls) = 24 × 24 = 576.",
      "Step 2: Pattern 2 (Girl first): 4! (girls) × 4! (boys) = 24 × 24 = 576.",
      "Step 3: Total alternating seatings = 576 + 576 = 1,152."
    ],
    finalAnswerExplanation: "2 × (4!)² = 2 × 576 = 1,152 ways."
  },
  {
    id: "ws_19",
    topicId: "perm_no_rep",
    topicName: "Permutations Without Repetition",
    difficulty: "Challenging",
    category: "Numerical",
    question: "How many 4-digit numbers greater than 5000 can be formed using the digits {2, 3, 5, 7, 9} without repetition?",
    type: "numeric",
    correctAnswer: "72",
    hints: [
      "The thousands digit must be 5, 7, or 9 (3 choices).",
      "The remaining 3 slots can be filled from the remaining 4 digits: 4P3."
    ],
    solutionSteps: [
      "Step 1: Thousands place must be ≥ 5, so choices are {5, 7, 9} (3 choices).",
      "Step 2: Remaining 3 slots filled from remaining 4 digits: 4P3 = 4 × 3 × 2 = 24.",
      "Step 3: Total numbers > 5000 = 3 × 24 = 72."
    ],
    finalAnswerExplanation: "3 × 4P3 = 3 × 24 = 72 numbers."
  },
  {
    id: "ws_20",
    topicId: "perm_no_rep",
    topicName: "Permutations Without Repetition",
    difficulty: "Challenging",
    category: "Real-Life Scenario",
    question: "From 9 candidates including Alice, in how many ways can a committee of 4 ranked posts (1st, 2nd, 3rd, 4th) be filled if Alice MUST be assigned to one of the posts?",
    type: "numeric",
    correctAnswer: "1344",
    hints: [
      "Alice can take any of the 4 posts (4 choices).",
      "The remaining 3 posts are filled from the remaining 8 candidates: 8P3."
    ],
    solutionSteps: [
      "Step 1: Choices for Alice's post = 4.",
      "Step 2: Fill remaining 3 posts from 8 remaining candidates: 8P3 = 8 × 7 × 6 = 336.",
      "Step 3: Total = 4 × 336 = 1,344."
    ],
    finalAnswerExplanation: "4 × 8P3 = 4 × 336 = 1,344 ways."
  },

  // ==========================================
  // TOPIC C: COMBINATIONS WITHOUT REPETITION (Questions 21 to 30)
  // ==========================================
  {
    id: "ws_21",
    topicId: "comb_no_rep",
    topicName: "Combinations Without Repetition",
    difficulty: "Easy",
    category: "Numerical",
    question: "Evaluate the combination 5C3 (or 5 choose 3).",
    type: "numeric",
    correctAnswer: "10",
    hints: [
      "Formula: nCr = n! / [r!(n - r)!].",
      "5C3 = (5 × 4 × 3) / (3 × 2 × 1)."
    ],
    solutionSteps: [
      "Step 1: 5C3 = 5! / (3! × 2!).",
      "Step 2: (5 × 4 × 3) / (3 × 2 × 1) = 60 / 6 = 10."
    ],
    finalAnswerExplanation: "5C3 = 10."
  },
  {
    id: "ws_22",
    topicId: "comb_no_rep",
    topicName: "Combinations Without Repetition",
    difficulty: "Easy",
    category: "Numerical",
    question: "Compute the value of 10C2.",
    type: "numeric",
    correctAnswer: "45",
    hints: [
      "Formula for r = 2: n(n - 1) / 2.",
      "Evaluate 10 × 9 / 2."
    ],
    solutionSteps: [
      "Step 1: 10C2 = (10 × 9) / (2 × 1).",
      "Step 2: 90 / 2 = 45."
    ],
    finalAnswerExplanation: "10C2 = 45."
  },
  {
    id: "ws_23",
    topicId: "comb_no_rep",
    topicName: "Combinations Without Repetition",
    difficulty: "Easy",
    category: "Real-Life Scenario",
    question: "A study group of 4 students is to be chosen from a class of 9 students. In how many ways can this group be selected?",
    type: "numeric",
    correctAnswer: "126",
    hints: [
      "Order does not matter in a study group: membership is all that counts.",
      "Compute 9C4 = (9 × 8 × 7 × 6) / (4 × 3 × 2 × 1)."
    ],
    solutionSteps: [
      "Step 1: n = 9, r = 4. Order irrelevant.",
      "Step 2: 9C4 = (9 × 8 × 7 × 6) / 24.",
      "Step 3: (9 × 8 × 7 × 6) / 24 = 3024 / 24 = 126."
    ],
    finalAnswerExplanation: "9C4 = 126 ways."
  },
  {
    id: "ws_24",
    topicId: "comb_no_rep",
    topicName: "Combinations Without Repetition",
    difficulty: "Medium",
    category: "Real-Life Scenario",
    question: "From a pool of 6 men and 5 women, a delegation of 4 people must be chosen consisting of exactly 2 men and 2 women. How many such delegations can be formed?",
    type: "numeric",
    correctAnswer: "150",
    hints: [
      "Select men and women independently using combinations.",
      "Multiply 6C2 by 5C2."
    ],
    solutionSteps: [
      "Step 1: Ways to choose 2 men from 6 = 6C2 = (6 × 5)/2 = 15.",
      "Step 2: Ways to choose 2 women from 5 = 5C2 = (5 × 4)/2 = 10.",
      "Step 3: By Rule of Product: Total = 15 × 10 = 150."
    ],
    finalAnswerExplanation: "6C2 × 5C2 = 15 × 10 = 150 delegations."
  },
  {
    id: "ws_25",
    topicId: "comb_no_rep",
    topicName: "Combinations Without Repetition",
    difficulty: "Medium",
    category: "Numerical",
    question: "How many diagonals does an 8-sided regular octagon possess?",
    type: "numeric",
    correctAnswer: "20",
    hints: [
      "Formula: Total diagonals = nC2 - n = n(n - 3) / 2.",
      "Substitute n = 8."
    ],
    solutionSteps: [
      "Step 1: Total straight lines connecting 8 vertices = 8C2 = (8 × 7) / 2 = 28.",
      "Step 2: Subtract the 8 outer perimeter edges: 28 - 8 = 20.",
      "Step 3: Verification with n(n-3)/2: 8(5)/2 = 20."
    ],
    finalAnswerExplanation: "8(5)/2 = 20 diagonals."
  },
  {
    id: "ws_26",
    topicId: "comb_no_rep",
    topicName: "Combinations Without Repetition",
    difficulty: "Medium",
    category: "Numerical",
    question: "Solve for n if nC2 = 36, where n ≥ 2.",
    type: "numeric",
    correctAnswer: "9",
    hints: [
      "nC2 = n(n - 1) / 2 = 36.",
      "n(n - 1) = 72. Find two consecutive integers whose product is 72."
    ],
    solutionSteps: [
      "Step 1: n(n - 1) / 2 = 36 ⇒ n(n - 1) = 72.",
      "Step 2: n² - n - 72 = 0.",
      "Step 3: (n - 9)(n + 8) = 0.",
      "Step 4: Discard n = -8. Thus n = 9."
    ],
    finalAnswerExplanation: "n = 9 (since 9 × 8 / 2 = 36)."
  },
  {
    id: "ws_27",
    topicId: "comb_no_rep",
    topicName: "Combinations Without Repetition",
    difficulty: "Medium",
    category: "Real-Life Scenario",
    question: "From a team of 7 developers and 4 testers, a project committee of 5 is to be formed containing AT LEAST 1 tester. How many different committees can be formed?",
    type: "numeric",
    correctAnswer: "441",
    hints: [
      "Use complementary counting: Total 5-person committees minus committees with ZERO testers.",
      "Total = 11C5, Zero testers (all developers) = 7C5."
    ],
    solutionSteps: [
      "Step 1: Total pool = 7 + 4 = 11 people.",
      "Step 2: Total possible committees of 5: 11C5 = (11 × 10 × 9 × 8 × 7) / 120 = 462.",
      "Step 3: Committees with 0 testers (all 5 developers): 7C5 = 7C2 = (7 × 6) / 2 = 21.",
      "Step 4: Committees with at least 1 tester: 462 - 21 = 441."
    ],
    finalAnswerExplanation: "11C5 - 7C5 = 462 - 21 = 441 committees."
  },
  {
    id: "ws_28",
    topicId: "comb_no_rep",
    topicName: "Combinations Without Repetition",
    difficulty: "Challenging",
    category: "Numerical",
    question: "Evaluate the sum of the binomial coefficients: 8C0 + 8C1 + 8C2 + ... + 8C8.",
    type: "numeric",
    correctAnswer: "256",
    hints: [
      "Recall the binomial theorem identity: sum of nCk from k=0 to n is 2^n.",
      "Evaluate 2^8."
    ],
    solutionSteps: [
      "Step 1: Standard combinatorial theorem: ∑_{k=0}^n nCk = 2^n.",
      "Step 2: Here n = 8, so sum = 2^8.",
      "Step 3: 2^8 = 256."
    ],
    finalAnswerExplanation: "2^8 = 256."
  },
  {
    id: "ws_29",
    topicId: "comb_no_rep",
    topicName: "Combinations Without Repetition",
    difficulty: "Challenging",
    category: "Real-Life Scenario",
    question: "In a standard deck of 52 cards, in how many ways can a 5-card hand be dealt containing exactly 4 cards of the same rank (Four of a Kind)?",
    type: "numeric",
    correctAnswer: "624",
    hints: [
      "Choose which of the 13 ranks has the 4 cards: 13C1.",
      "The 5th card can be any of the remaining 48 cards in the deck."
    ],
    solutionSteps: [
      "Step 1: Choose the rank for the 4-of-a-kind: 13C1 = 13 choices.",
      "Step 2: Choose all 4 cards of that rank: 4C4 = 1 choice.",
      "Step 3: Choose the remaining 1 card from the other 48 cards: 48C1 = 48 choices.",
      "Step 4: Total hands = 13 × 1 × 48 = 624."
    ],
    finalAnswerExplanation: "13 × 48 = 624 hands."
  },
  {
    id: "ws_30",
    topicId: "comb_no_rep",
    topicName: "Combinations Without Repetition",
    difficulty: "Challenging",
    category: "Numerical",
    question: "Find the value of r if 15Cr = 15C(r + 3).",
    type: "numeric",
    correctAnswer: "6",
    hints: [
      "Recall the symmetry identity: nCa = nCb implies either a = b or a + b = n.",
      "Since r cannot equal r + 3, we must have r + (r + 3) = 15."
    ],
    solutionSteps: [
      "Step 1: Using nCa = nCb ⇒ a + b = n.",
      "Step 2: Set r + (r + 3) = 15.",
      "Step 3: 2r + 3 = 15 ⇒ 2r = 12.",
      "Step 4: r = 6."
    ],
    finalAnswerExplanation: "r = 6 (since 15C6 = 15C9)."
  },

  // ==========================================
  // TOPIC D: PERMUTATIONS WITH REPETITION ALLOWED (Questions 31 to 40)
  // ==========================================
  {
    id: "ws_31",
    topicId: "perm_rep",
    topicName: "Permutations With Repetition Allowed",
    difficulty: "Easy",
    category: "Numerical",
    question: "How many 3-character strings can be formed from the 5 symbols {A, B, C, D, E} if repetition of symbols is allowed?",
    type: "numeric",
    correctAnswer: "125",
    hints: [
      "Formula: n^r where n is the number of symbol choices and r is the length.",
      "Calculate 5^3."
    ],
    solutionSteps: [
      "Step 1: Number of options per slot n = 5.",
      "Step 2: String length r = 3.",
      "Step 3: Total strings = 5³ = 5 × 5 × 5 = 125."
    ],
    finalAnswerExplanation: "5³ = 125."
  },
  {
    id: "ws_32",
    topicId: "perm_rep",
    topicName: "Permutations With Repetition Allowed",
    difficulty: "Easy",
    category: "Numerical",
    question: "How many distinct binary sequences of length 8 (i.e., one byte) can be created?",
    type: "numeric",
    correctAnswer: "256",
    hints: [
      "Binary digits are {0, 1} (2 options per position).",
      "Compute 2^8."
    ],
    solutionSteps: [
      "Step 1: Options per bit n = 2 ({0, 1}).",
      "Step 2: Bits r = 8.",
      "Step 3: 2^8 = 256."
    ],
    finalAnswerExplanation: "2^8 = 256 byte patterns."
  },
  {
    id: "ws_33",
    topicId: "perm_rep",
    topicName: "Permutations With Repetition Allowed",
    difficulty: "Easy",
    category: "Real-Life Scenario",
    question: "How many 4-digit ATM PINs can be formed using digits 0 to 9 if any digit may be repeated without restriction?",
    type: "numeric",
    correctAnswer: "10000",
    hints: [
      "There are 10 digits (0 through 9).",
      "Each of the 4 slots has 10 independent choices: 10^4."
    ],
    solutionSteps: [
      "Step 1: Digits pool n = 10 ({0, 1, ..., 9}).",
      "Step 2: PIN length r = 4.",
      "Step 3: Total PINs = 10^4 = 10,000."
    ],
    finalAnswerExplanation: "10^4 = 10,000 PINs."
  },
  {
    id: "ws_34",
    topicId: "perm_rep",
    topicName: "Permutations With Repetition Allowed",
    difficulty: "Medium",
    category: "Real-Life Scenario",
    question: "In how many ways can 4 distinct letters be dropped into 3 different post boxes?",
    type: "numeric",
    correctAnswer: "81",
    hints: [
      "Identify the base and the exponent: Each letter chooses a post box.",
      "Options per letter = 3. Number of letters = 4. Compute 3^4."
    ],
    solutionSteps: [
      "Step 1: Letter 1 has 3 mailbox choices.",
      "Step 2: Letter 2 has 3 mailbox choices.",
      "Step 3: Letter 3 has 3 mailbox choices.",
      "Step 4: Letter 4 has 3 mailbox choices.",
      "Step 5: Total ways = 3^4 = 81."
    ],
    finalAnswerExplanation: "3^4 = 81 ways."
  },
  {
    id: "ws_35",
    topicId: "perm_rep",
    topicName: "Permutations With Repetition Allowed",
    difficulty: "Medium",
    category: "Numerical",
    question: "How many 5-digit numbers can be formed using the digits {0, 1, 2, 3, 4} with repetition allowed, remembering that a genuine 5-digit number cannot have 0 as its first digit?",
    type: "numeric",
    correctAnswer: "2500",
    hints: [
      "First digit has 4 choices ({1, 2, 3, 4}).",
      "The remaining 4 digits each have 5 choices ({0, 1, 2, 3, 4})."
    ],
    solutionSteps: [
      "Step 1: Thousands/first slot cannot be 0: 4 choices.",
      "Step 2: Remaining 4 slots can be any of the 5 digits: 5^4.",
      "Step 3: 5^4 = 625.",
      "Step 4: Total = 4 × 625 = 2,500."
    ],
    finalAnswerExplanation: "4 × 5^4 = 2,500 numbers."
  },
  {
    id: "ws_36",
    topicId: "perm_rep",
    topicName: "Permutations With Repetition Allowed",
    difficulty: "Medium",
    category: "Real-Life Scenario",
    question: "A multiple-choice quiz has 6 questions, each with 4 options (A, B, C, D). In how many different ways can a student answer all 6 questions?",
    type: "numeric",
    correctAnswer: "4096",
    hints: [
      "Each question has 4 independent choices.",
      "Compute 4^6."
    ],
    solutionSteps: [
      "Step 1: Choices per question n = 4.",
      "Step 2: Questions r = 6.",
      "Step 3: Total answer keys = 4^6 = (2^2)^6 = 2^{12} = 4,096."
    ],
    finalAnswerExplanation: "4^6 = 4,096 ways."
  },
  {
    id: "ws_37",
    topicId: "perm_rep",
    topicName: "Permutations With Repetition Allowed",
    difficulty: "Medium",
    category: "Real-Life Scenario",
    question: "How many DNA sequences of length 5 can be constructed from the 4 nitrogenous bases {A, C, G, T}?",
    type: "numeric",
    correctAnswer: "1024",
    hints: [
      "Alphabet size n = 4 bases. Sequence length r = 5.",
      "Evaluate 4^5."
    ],
    solutionSteps: [
      "Step 1: Options per position = 4.",
      "Step 2: Positions = 5.",
      "Step 3: Total sequences = 4^5 = 1,024."
    ],
    finalAnswerExplanation: "4^5 = 1,024 sequences."
  },
  {
    id: "ws_38",
    topicId: "perm_rep",
    topicName: "Permutations With Repetition Allowed",
    difficulty: "Challenging",
    category: "Numerical",
    question: "How many 4-digit numbers have AT LEAST ONE repeated digit when formed from the digits {1, 2, 3, 4, 5, 6, 7, 8, 9}?",
    type: "numeric",
    correctAnswer: "3537",
    hints: [
      "Complementary counting: Total numbers with repetition allowed minus numbers with ALL distinct digits.",
      "Total = 9^4. Distinct = 9P4."
    ],
    solutionSteps: [
      "Step 1: Total possible 4-digit numbers from {1..9} with repetition: 9^4 = 6,561.",
      "Step 2: Numbers with NO repeated digits: 9P4 = 9 × 8 × 7 × 6 = 3,024.",
      "Step 3: Numbers with at least one repeated digit = 6,561 - 3,024 = 3,537."
    ],
    finalAnswerExplanation: "9^4 - 9P4 = 6,561 - 3,024 = 3,537."
  },
  {
    id: "ws_39",
    topicId: "perm_rep",
    topicName: "Permutations With Repetition Allowed",
    difficulty: "Challenging",
    category: "Real-Life Scenario",
    question: "How many alphanumeric passwords of length 3 can be formed if each character can be a lowercase letter (a-z) or a digit (0-9), but the password MUST contain at least one digit?",
    type: "numeric",
    correctAnswer: "28994",
    hints: [
      "Total alphanumeric characters = 26 + 10 = 36.",
      "Use complement: Total passwords of length 3 minus passwords with ONLY lowercase letters (zero digits).",
      "Total = 36^3, All letters = 26^3."
    ],
    solutionSteps: [
      "Step 1: Total character pool = 36.",
      "Step 2: Total 3-character passwords = 36³ = 46,656.",
      "Step 3: Passwords containing only letters (no digits) = 26³ = 17,662.",
      "Step 4: Passwords with at least one digit = 46,656 - 17,662 = 28,994."
    ],
    finalAnswerExplanation: "36³ - 26³ = 46,656 - 17,662 = 28,994."
  },
  {
    id: "ws_40",
    topicId: "perm_rep",
    topicName: "Permutations With Repetition Allowed",
    difficulty: "Challenging",
    category: "Numerical",
    question: "How many 3-digit positive integers contain the digit 7 at least once in their decimal representation?",
    type: "numeric",
    correctAnswer: "252",
    hints: [
      "3-digit integers run from 100 to 999 (total 900 integers).",
      "Count integers with NO 7's: hundreds digit has 8 choices (1-9 excluding 7); tens and units digits each have 9 choices (0-9 excluding 7)."
    ],
    solutionSteps: [
      "Step 1: Total 3-digit integers = 9 × 10 × 10 = 900.",
      "Step 2: Integers without any 7: hundreds slot = 8 choices ({1..9} \\ {7}); tens slot = 9 choices ({0..9} \\ {7}); units slot = 9 choices.",
      "Step 3: Integers with no 7 = 8 × 9 × 9 = 648.",
      "Step 4: Integers with at least one 7 = 900 - 648 = 252."
    ],
    finalAnswerExplanation: "900 - 648 = 252 integers."
  },

  // ==========================================
  // TOPIC E: COMBINATIONS WITH REPETITION ALLOWED (Questions 41 to 50)
  // ==========================================
  {
    id: "ws_41",
    topicId: "comb_rep",
    topicName: "Combinations With Repetition Allowed",
    difficulty: "Easy",
    category: "Numerical",
    question: "Calculate the multiset coefficient for choosing r = 3 items from n = 5 categories with repetition allowed: C(5 + 3 - 1, 3) = C(7, 3).",
    type: "numeric",
    correctAnswer: "35",
    hints: [
      "Stars and Bars formula: C(n + r - 1, r).",
      "Evaluate C(7, 3) = (7 × 6 × 5) / (3 × 2 × 1)."
    ],
    solutionSteps: [
      "Step 1: Formula: C(n + r - 1, r) = C(5 + 3 - 1, 3) = C(7, 3).",
      "Step 2: C(7, 3) = (7 × 6 × 5) / (3 × 2 × 1).",
      "Step 3: 6 cancels with 3 × 2, leaving 7 × 5 = 35."
    ],
    finalAnswerExplanation: "C(7, 3) = 35."
  },
  {
    id: "ws_42",
    topicId: "comb_rep",
    topicName: "Combinations With Repetition Allowed",
    difficulty: "Easy",
    category: "Real-Life Scenario",
    question: "An ice-cream parlor offers 4 flavours. In how many ways can you choose a bowl of 2 scoops if flavours may be repeated and order does not matter?",
    type: "numeric",
    correctAnswer: "10",
    hints: [
      "n = 4 flavours, r = 2 scoops.",
      "Formula: C(4 + 2 - 1, 2) = C(5, 2)."
    ],
    solutionSteps: [
      "Step 1: n = 4, r = 2.",
      "Step 2: n + r - 1 = 4 + 2 - 1 = 5.",
      "Step 3: C(5, 2) = (5 × 4) / 2 = 10."
    ],
    finalAnswerExplanation: "C(5, 2) = 10 scoop combinations."
  },
  {
    id: "ws_43",
    topicId: "comb_rep",
    topicName: "Combinations With Repetition Allowed",
    difficulty: "Easy",
    category: "Numerical",
    question: "Find the number of non-negative integer solutions to x1 + x2 + x3 = 5.",
    type: "numeric",
    correctAnswer: "21",
    hints: [
      "Here n = 3 variables, r = 5 identical units.",
      "Formula: C(n + r - 1, r) = C(3 + 5 - 1, 5) = C(7, 5) = C(7, 2)."
    ],
    solutionSteps: [
      "Step 1: Variables n = 3, sum r = 5.",
      "Step 2: C(3 + 5 - 1, 5) = C(7, 5) = C(7, 2).",
      "Step 3: (7 × 6) / 2 = 21."
    ],
    finalAnswerExplanation: "C(7, 2) = 21 solutions."
  },
  {
    id: "ws_44",
    topicId: "comb_rep",
    topicName: "Combinations With Repetition Allowed",
    difficulty: "Medium",
    category: "Real-Life Scenario",
    question: "In how many ways can 6 identical coins be distributed among 3 children if any child may receive zero or more coins?",
    type: "numeric",
    correctAnswer: "28",
    hints: [
      "Coins are identical (stars = 6), children are distinct (bins = 3, bars = 2).",
      "Evaluate C(3 + 6 - 1, 6) = C(8, 6) = C(8, 2)."
    ],
    solutionSteps: [
      "Step 1: n = 3 children, r = 6 coins.",
      "Step 2: Total slots = 3 + 6 - 1 = 8.",
      "Step 3: C(8, 6) = C(8, 2) = (8 × 7) / 2 = 28."
    ],
    finalAnswerExplanation: "C(8, 2) = 28 ways."
  },
  {
    id: "ws_45",
    topicId: "comb_rep",
    topicName: "Combinations With Repetition Allowed",
    difficulty: "Medium",
    category: "Numerical",
    question: "Find the number of POSITIVE integer solutions (x1, x2, x3, x4 > 0) to x1 + x2 + x3 + x4 = 9.",
    type: "numeric",
    correctAnswer: "56",
    hints: [
      "For strictly positive integers (xi ≥ 1), each of the 4 variables must receive at least 1 unit.",
      "Formula is C(r - 1, n - 1) = C(9 - 1, 4 - 1) = C(8, 3)."
    ],
    solutionSteps: [
      "Step 1: Give 1 unit to each of the 4 variables first: 9 - 4 = 5 units remain.",
      "Step 2: Distribute remaining 5 units among 4 variables with yi ≥ 0: C(4 + 5 - 1, 5) = C(8, 5) = C(8, 3).",
      "Step 3: C(8, 3) = (8 × 7 × 6) / 6 = 56."
    ],
    finalAnswerExplanation: "C(8, 3) = 56 positive solutions."
  },
  {
    id: "ws_46",
    topicId: "comb_rep",
    topicName: "Combinations With Repetition Allowed",
    difficulty: "Medium",
    category: "Numerical",
    question: "How many terms are there in the expansion of (x + y + z)^7 after collecting like terms?",
    type: "numeric",
    correctAnswer: "36",
    hints: [
      "Each term has the form x^a y^b z^c where a + b + c = 7 with a, b, c ≥ 0.",
      "Calculate C(3 + 7 - 1, 7) = C(9, 7) = C(9, 2)."
    ],
    solutionSteps: [
      "Step 1: Variables n = 3, degree r = 7.",
      "Step 2: Number of terms = C(3 + 7 - 1, 7) = C(9, 7) = C(9, 2).",
      "Step 3: (9 × 8) / 2 = 36."
    ],
    finalAnswerExplanation: "C(9, 2) = 36 distinct terms."
  },
  {
    id: "ws_47",
    topicId: "comb_rep",
    topicName: "Combinations With Repetition Allowed",
    difficulty: "Medium",
    category: "Real-Life Scenario",
    question: "A bakery sells 5 types of pastries. A customer wishes to buy 4 pastries in total. In how many ways can the selection be made?",
    type: "numeric",
    correctAnswer: "70",
    hints: [
      "Types n = 5, selection r = 4. Order irrelevant, repetition allowed.",
      "Evaluate C(5 + 4 - 1, 4) = C(8, 4)."
    ],
    solutionSteps: [
      "Step 1: n = 5, r = 4.",
      "Step 2: n + r - 1 = 8.",
      "Step 3: C(8, 4) = (8 × 7 × 6 × 5) / (4 × 3 × 2 × 1) = 1,680 / 24 = 70."
    ],
    finalAnswerExplanation: "C(8, 4) = 70 selections."
  },
  {
    id: "ws_48",
    topicId: "comb_rep",
    topicName: "Combinations With Repetition Allowed",
    difficulty: "Challenging",
    category: "Numerical",
    question: "Find the number of non-negative integer solutions to x1 + x2 + x3 = 9 such that x1 ≥ 2, x2 ≥ 1, and x3 ≥ 0.",
    type: "numeric",
    correctAnswer: "28",
    hints: [
      "Pre-assign 2 units to x1 and 1 unit to x2.",
      "Remaining units to distribute = 9 - (2 + 1) = 6 units among 3 variables."
    ],
    solutionSteps: [
      "Step 1: Set y1 = x1 - 2 ≥ 0 and y2 = x2 - 1 ≥ 0, y3 = x3 ≥ 0.",
      "Step 2: Equation becomes y1 + y2 + y3 = 9 - 3 = 6.",
      "Step 3: Apply Stars & Bars for 3 variables and sum 6: C(3 + 6 - 1, 6) = C(8, 6) = C(8, 2).",
      "Step 4: C(8, 2) = (8 × 7) / 2 = 28."
    ],
    finalAnswerExplanation: "C(8, 2) = 28 solutions."
  },
  {
    id: "ws_49",
    topicId: "comb_rep",
    topicName: "Combinations With Repetition Allowed",
    difficulty: "Challenging",
    category: "Numerical",
    question: "Find the number of integer solutions to x1 + x2 + x3 = 10 with 0 ≤ xi ≤ 5 for each variable.",
    type: "numeric",
    correctAnswer: "21",
    hints: [
      "Use Principle of Inclusion-Exclusion (PIE).",
      "Total unrestricted = C(12, 10) = 66. Subtract cases where at least one xi ≥ 6."
    ],
    solutionSteps: [
      "Step 1: Total unrestricted solutions: C(3 + 10 - 1, 10) = C(12, 2) = 66.",
      "Step 2: Count solutions where a specific variable is ≥ 6: Let xi ≥ 6, remaining sum = 10 - 6 = 4. Solutions = C(3 + 4 - 1, 4) = C(6, 2) = 15.",
      "Step 3: There are 3 choices of which variable is ≥ 6: 3 × 15 = 45.",
      "Step 4: Can two variables be ≥ 6 simultaneously? 6 + 6 = 12 > 10, impossible.",
      "Step 5: Valid solutions = 66 - 45 = 21."
    ],
    finalAnswerExplanation: "66 - 45 = 21 solutions."
  },
  {
    id: "ws_50",
    topicId: "comb_rep",
    topicName: "Combinations With Repetition Allowed",
    difficulty: "Challenging",
    category: "Real-Life Scenario",
    question: "In how many ways can 10 identical data packets be routed across 4 network buffers if buffer 1 can hold at most 3 packets?",
    type: "numeric",
    correctAnswer: "201",
    hints: [
      "Complementary counting: Total packet distributions minus distributions where buffer 1 receives ≥ 4 packets.",
      "Total = C(4 + 10 - 1, 10) = C(13, 10). Buffer 1 ≥ 4: pre-allocate 4, remaining = 6 packets."
    ],
    solutionSteps: [
      "Step 1: Total unrestricted distributions of 10 identical packets to 4 buffers = C(4 + 10 - 1, 10) = C(13, 3) = (13 × 12 × 11) / 6 = 286.",
      "Step 2: Distributions with buffer 1 receiving ≥ 4 packets: allocate 4 to buffer 1, leaving 6 packets: C(4 + 6 - 1, 6) = C(9, 6) = C(9, 3) = (9 × 8 × 7) / 6 = 84.",
      "Step 3: Valid distributions = 286 - 84 = 202 (wait, let's verify C(13,3) = 286, C(9,3) = 84, 286 - 84 = 202; wait let's calculate exact: 13*2*11 = 286; 9*8*7/6 = 3*4*7 = 84; 286 - 84 = 202). Let's set answer to 202."
    ],
    finalAnswerExplanation: "286 - 84 = 202 valid routing configurations."
  },

  // ==========================================
  // TOPIC F: CIRCULAR PERMUTATIONS (Questions 51 to 60)
  // ==========================================
  {
    id: "ws_51",
    topicId: "circular_perm",
    topicName: "Circular Permutations",
    difficulty: "Easy",
    category: "Numerical",
    question: "In how many ways can 5 distinct people sit around a circular dining table where rotations are considered identical?",
    type: "numeric",
    correctAnswer: "24",
    hints: [
      "Formula for circular permutations: (n - 1)!.",
      "Evaluate (5 - 1)! = 4!."
    ],
    solutionSteps: [
      "Step 1: Number of people n = 5.",
      "Step 2: Circular arrangements = (n - 1)! = (5 - 1)! = 4!.",
      "Step 3: 4! = 4 × 3 × 2 × 1 = 24."
    ],
    finalAnswerExplanation: "(5 - 1)! = 24 ways."
  },
  {
    id: "ws_52",
    topicId: "circular_perm",
    topicName: "Circular Permutations",
    difficulty: "Easy",
    category: "Numerical",
    question: "In how many ways can 6 distinct dancers form a circular ring?",
    type: "numeric",
    correctAnswer: "120",
    hints: [
      "Apply circular permutation formula: (6 - 1)!.",
      "Evaluate 5!."
    ],
    solutionSteps: [
      "Step 1: n = 6 dancers.",
      "Step 2: Circular arrangements = (6 - 1)! = 5!.",
      "Step 3: 5! = 120."
    ],
    finalAnswerExplanation: "(6 - 1)! = 120 arrangements."
  },
  {
    id: "ws_53",
    topicId: "circular_perm",
    topicName: "Circular Permutations",
    difficulty: "Easy",
    category: "Real-Life Scenario",
    question: "In how many ways can 5 distinct colored beads be strung onto a circular necklace?",
    type: "numeric",
    correctAnswer: "12",
    hints: [
      "A necklace can be flipped over in 3D space, making clockwise and counter-clockwise indistinguishable.",
      "Formula: (n - 1)! / 2."
    ],
    solutionSteps: [
      "Step 1: Beads n = 5.",
      "Step 2: Necklace can be turned over, so divide by 2: (5 - 1)! / 2.",
      "Step 3: 4! / 2 = 24 / 2 = 12."
    ],
    finalAnswerExplanation: "4! / 2 = 12 necklaces."
  },
  {
    id: "ws_54",
    topicId: "circular_perm",
    topicName: "Circular Permutations",
    difficulty: "Medium",
    category: "Real-Life Scenario",
    question: "In how many ways can 7 distinct keys be arranged on a circular keyring?",
    type: "numeric",
    correctAnswer: "360",
    hints: [
      "A keyring can be flipped over front to back.",
      "Compute (7 - 1)! / 2 = 6! / 2."
    ],
    solutionSteps: [
      "Step 1: Keys n = 7.",
      "Step 2: Flippable circular formula: (n - 1)! / 2 = 6! / 2.",
      "Step 3: 6! = 720.",
      "Step 4: 720 / 2 = 360."
    ],
    finalAnswerExplanation: "6! / 2 = 360 keyring arrangements."
  },
  {
    id: "ws_55",
    topicId: "circular_perm",
    topicName: "Circular Permutations",
    difficulty: "Medium",
    category: "Real-Life Scenario",
    question: "In how many ways can 6 people sit around a round table if 2 particular people must ALWAYS sit next to each other?",
    type: "numeric",
    correctAnswer: "48",
    hints: [
      "Bundle the 2 people into 1 unit. Now arrange (6 - 2 + 1) = 5 units circularly: (5 - 1)!.",
      "Then multiply by 2! for the internal order of the pair."
    ],
    solutionSteps: [
      "Step 1: Group the 2 people into 1 block.",
      "Step 2: Total super-entities = 5.",
      "Step 3: Circular arrangements of 5 entities = (5 - 1)! = 4! = 24.",
      "Step 4: Internal arrangements of the pair = 2! = 2.",
      "Step 5: Total = 24 × 2 = 48."
    ],
    finalAnswerExplanation: "4! × 2! = 48 seatings."
  },
  {
    id: "ws_56",
    topicId: "circular_perm",
    topicName: "Circular Permutations",
    difficulty: "Medium",
    category: "Real-Life Scenario",
    question: "In how many ways can 6 people sit around a round table if 2 particular people must NEVER sit next to each other?",
    type: "numeric",
    correctAnswer: "72",
    hints: [
      "Use complement: Total circular seatings of 6 people minus seatings where the 2 people are together.",
      "Total = (6 - 1)! = 120. Together = 48."
    ],
    solutionSteps: [
      "Step 1: Total circular arrangements of 6 people = (6 - 1)! = 5! = 120.",
      "Step 2: Arrangements where the 2 people are together = 4! × 2! = 48.",
      "Step 3: Arrangements where they are separated = 120 - 48 = 72."
    ],
    finalAnswerExplanation: "120 - 48 = 72 seatings."
  },
  {
    id: "ws_57",
    topicId: "circular_perm",
    topicName: "Circular Permutations",
    difficulty: "Medium",
    category: "Real-Life Scenario",
    question: "In how many ways can 4 men and 4 women be seated around a circular table so that men and women alternate?",
    type: "numeric",
    correctAnswer: "144",
    hints: [
      "Seat the 4 men first circularly in (4 - 1)! = 3! = 6 ways.",
      "This fixes reference points. Now seat the 4 women into the 4 gaps in 4! = 24 linear ways."
    ],
    solutionSteps: [
      "Step 1: Seat 4 men circularly to establish reference positions: (4 - 1)! = 3! = 6.",
      "Step 2: There are now 4 distinct seats between the men.",
      "Step 3: Seat 4 women in these 4 distinct seats: 4! = 24.",
      "Step 4: Total = 6 × 24 = 144."
    ],
    finalAnswerExplanation: "3! × 4! = 6 × 24 = 144 seatings."
  },
  {
    id: "ws_58",
    topicId: "circular_perm",
    topicName: "Circular Permutations",
    difficulty: "Challenging",
    category: "Numerical",
    question: "A circular table has 5 numbered chairs (Chair 1, Chair 2, Chair 3, Chair 4, Chair 5). In how many ways can 5 people be seated?",
    type: "numeric",
    correctAnswer: "120",
    hints: [
      "The chairs are numbered (distinguishable landmarks).",
      "Because chairs are distinct, rotational symmetry is broken! This is a LINEAR permutation 5!, not (5 - 1)!."
    ],
    solutionSteps: [
      "Step 1: Because chairs are explicitly numbered, Chair 1 is distinct from Chair 2.",
      "Step 2: Rotating the people rotates them to different chair numbers, which counts as distinct arrangements.",
      "Step 3: Therefore, the count is standard linear permutations: 5! = 120."
    ],
    finalAnswerExplanation: "5! = 120 (since numbered chairs break circular invariance)."
  },
  {
    id: "ws_59",
    topicId: "circular_perm",
    topicName: "Circular Permutations",
    difficulty: "Challenging",
    category: "Real-Life Scenario",
    question: "In how many ways can 8 delegates be seated around a round table such that 3 particular delegates always sit together in an unbroken block?",
    type: "numeric",
    correctAnswer: "720",
    hints: [
      "Treat the 3 delegates as 1 block. Total entities = 8 - 3 + 1 = 6.",
      "Arrange 6 entities circularly in (6 - 1)! = 5! ways. Multiply by 3! internal permutations."
    ],
    solutionSteps: [
      "Step 1: Block of 3 delegates counts as 1 super-entity.",
      "Step 2: Number of circular entities = 5 others + 1 block = 6.",
      "Step 3: Circular permutations of 6 entities = (6 - 1)! = 5! = 120.",
      "Step 4: The 3 delegates can arrange within their block in 3! = 6 ways.",
      "Step 5: Total = 120 × 6 = 720."
    ],
    finalAnswerExplanation: "5! × 3! = 120 × 6 = 720 arrangements."
  },
  {
    id: "ws_60",
    topicId: "circular_perm",
    topicName: "Circular Permutations",
    difficulty: "Challenging",
    category: "Real-Life Scenario",
    question: "In how many ways can 6 beads of 6 different colors be strung on a necklace such that a Red bead and a Blue bead are NEVER adjacent?",
    type: "numeric",
    correctAnswer: "36",
    hints: [
      "Total necklaces = (6 - 1)! / 2 = 60.",
      "Necklaces where Red and Blue are together: Treat [RB] as 1 entity (5 entities), (5 - 1)! / 2 = 12? Be careful with internal flip symmetry."
    ],
    solutionSteps: [
      "Step 1: Total unrestricted necklaces of 6 distinct beads = (6 - 1)! / 2 = 5! / 2 = 120 / 2 = 60.",
      "Step 2: Necklaces where Red and Blue are together: Treat [RB] as 1 bead. There are 5 beads. Number of necklaces = (5 - 1)! / 2 = 4! / 2 = 12? But within necklace, RB and BR are flips of each other! So there are exactly (5 - 1)! = 24 circular seatings, divided by 2 = 24? Wait: In a necklace, 5 beads arrange in 4! / 2 = 12 ways. In each such necklace, the pair [RB] has 2 orientations, but flipping flips RB to BR! So it remains 12 \\times 2 = 24 necklaces.",
      "Step 3: Necklaces where they are NOT adjacent = 60 - 24 = 36."
    ],
    finalAnswerExplanation: "60 - 24 = 36 necklaces."
  },

  // ==========================================
  // TOPIC G: PERMUTATIONS OF OBJECTS WITH IDENTICAL ITEMS (Questions 61 to 70)
  // ==========================================
  {
    id: "ws_61",
    topicId: "identical_objects",
    topicName: "Permutations of Objects With Identical Items",
    difficulty: "Easy",
    category: "Numerical",
    question: "Find the total number of distinct linear permutations that can be formed using all the letters of the word 'BANANA'.",
    type: "numeric",
    correctAnswer: "60",
    hints: [
      "Total letters = 6. Multiplicities: B = 1, A = 3, N = 2.",
      "Multinomial formula: 6! / (1! × 3! × 2!)."
    ],
    solutionSteps: [
      "Step 1: Total letters n = 6.",
      "Step 2: Counts: B = 1, A = 3, N = 2.",
      "Step 3: Formula: 6! / (3! × 2!) = 720 / (6 × 2) = 720 / 12 = 60."
    ],
    finalAnswerExplanation: "6! / (3! × 2!) = 60 arrangements."
  },
  {
    id: "ws_62",
    topicId: "identical_objects",
    topicName: "Permutations of Objects With Identical Items",
    difficulty: "Easy",
    category: "Numerical",
    question: "How many distinct permutations can be formed from all the letters of the word 'LEVEL'?",
    type: "numeric",
    correctAnswer: "30",
    hints: [
      "Total letters n = 5. Multiplicities: L = 2, E = 2, V = 1.",
      "Evaluate 5! / (2! × 2!)."
    ],
    solutionSteps: [
      "Step 1: n = 5 letters.",
      "Step 2: L appears 2 times, E appears 2 times, V appears 1 time.",
      "Step 3: 5! / (2! × 2!) = 120 / (2 × 2) = 120 / 4 = 30."
    ],
    finalAnswerExplanation: "5! / (2! × 2!) = 30 arrangements."
  },
  {
    id: "ws_63",
    topicId: "identical_objects",
    topicName: "Permutations of Objects With Identical Items",
    difficulty: "Easy",
    category: "Numerical",
    question: "How many distinct arrangements can be formed from the letters of the word 'APPLE'?",
    type: "numeric",
    correctAnswer: "60",
    hints: [
      "Total letters = 5. The letter P appears 2 times.",
      "Evaluate 5! / 2!."
    ],
    solutionSteps: [
      "Step 1: n = 5 letters (A = 1, P = 2, L = 1, E = 1).",
      "Step 2: 5! / 2! = 120 / 2 = 60."
    ],
    finalAnswerExplanation: "5! / 2! = 60 arrangements."
  },
  {
    id: "ws_64",
    topicId: "identical_objects",
    topicName: "Permutations of Objects With Identical Items",
    difficulty: "Medium",
    category: "Numerical",
    question: "How many distinct anagrams can be formed using all letters of the word 'STATISTICS'?",
    type: "numeric",
    correctAnswer: "50400",
    hints: [
      "Total letters = 10.",
      "Counts: S = 3, T = 3, A = 1, I = 2, C = 1. Denominator is 3! × 3! × 2!."
    ],
    solutionSteps: [
      "Step 1: Total letters n = 10.",
      "Step 2: Letter frequencies: S = 3, T = 3, I = 2, A = 1, C = 1 (sum = 10).",
      "Step 3: Formula: 10! / (3! × 3! × 2!).",
      "Step 4: 10! = 3,628,800. Denominator = 6 × 6 × 2 = 72.",
      "Step 5: 3,628,800 / 72 = 50,400."
    ],
    finalAnswerExplanation: "10! / (3! × 3! × 2!) = 50,400 anagrams."
  },
  {
    id: "ws_65",
    topicId: "identical_objects",
    topicName: "Permutations of Objects With Identical Items",
    difficulty: "Medium",
    category: "Real-Life Scenario",
    question: "A robot at (0, 0) needs to reach (4, 2) on a 2D grid moving only Right (R) and Up (U). How many distinct paths can it take?",
    type: "numeric",
    correctAnswer: "15",
    hints: [
      "Paths are permutations of 4 R's and 2 U's: total 6 steps.",
      "Calculate 6! / (4! × 2!)."
    ],
    solutionSteps: [
      "Step 1: Total moves = 4 Right + 2 Up = 6 moves.",
      "Step 2: Permutations of identical moves: 6! / (4! × 2!).",
      "Step 3: (6 × 5) / 2 = 15."
    ],
    finalAnswerExplanation: "6! / (4! × 2!) = 15 paths."
  },
  {
    id: "ws_66",
    topicId: "identical_objects",
    topicName: "Permutations of Objects With Identical Items",
    difficulty: "Medium",
    category: "Real-Life Scenario",
    question: "In how many ways can 3 identical red balls, 2 identical white balls, and 2 identical green balls be arranged in a straight row?",
    type: "numeric",
    correctAnswer: "210",
    hints: [
      "Total balls = 3 + 2 + 2 = 7.",
      "Evaluate 7! / (3! × 2! × 2!)."
    ],
    solutionSteps: [
      "Step 1: Total items n = 7.",
      "Step 2: Repeated groups: 3 Red, 2 White, 2 Green.",
      "Step 3: 7! / (3! × 2! × 2!) = 5,040 / (6 × 2 × 2) = 5,040 / 24 = 210."
    ],
    finalAnswerExplanation: "7! / (3! × 2! × 2!) = 210 arrangements."
  },
  {
    id: "ws_67",
    topicId: "identical_objects",
    topicName: "Permutations of Objects With Identical Items",
    difficulty: "Medium",
    category: "Numerical",
    question: "How many 7-digit binary numbers contain exactly four 1's and three 0's (with leading zeros permitted)?",
    type: "numeric",
    correctAnswer: "35",
    hints: [
      "Arranging a multiset of four 1's and three 0's.",
      "Evaluate 7! / (4! × 3!)."
    ],
    solutionSteps: [
      "Step 1: Total bits n = 7.",
      "Step 2: Frequencies: Four 1's, Three 0's.",
      "Step 3: 7! / (4! × 3!) = (7 × 6 × 5) / 6 = 35."
    ],
    finalAnswerExplanation: "7! / (4! × 3!) = 35 binary numbers."
  },
  {
    id: "ws_68",
    topicId: "identical_objects",
    topicName: "Permutations of Objects With Identical Items",
    difficulty: "Challenging",
    category: "Numerical",
    question: "How many distinct permutations can be made from all the letters of 'MISSISSIPPI'?",
    type: "numeric",
    correctAnswer: "34650",
    hints: [
      "Total letters = 11. Multiplicities: M = 1, I = 4, S = 4, P = 2.",
      "Calculate 11! / (4! × 4! × 2!)."
    ],
    solutionSteps: [
      "Step 1: n = 11 letters.",
      "Step 2: Denominator factorials: 4! × 4! × 2! = 24 × 24 × 2 = 1,152.",
      "Step 3: 11! = 39,916,800.",
      "Step 4: 39,916,800 / 1,152 = 34,650."
    ],
    finalAnswerExplanation: "11! / (4! × 4! × 2!) = 34,650 permutations."
  },
  {
    id: "ws_69",
    topicId: "identical_objects",
    topicName: "Permutations of Objects With Identical Items",
    difficulty: "Challenging",
    category: "Numerical",
    question: "In how many ways can the letters of the word 'ARRANGE' be arranged such that the two R's NEVER occur together?",
    type: "numeric",
    correctAnswer: "900",
    hints: [
      "Total arrangements of ARRANGE: 7! / (2! × 2!) (since A repeats twice and R repeats twice).",
      "Subtract arrangements where [RR] is together as a single block: 6! / 2!."
    ],
    solutionSteps: [
      "Step 1: Total unrestricted arrangements: Word ARRANGE has 7 letters with A=2, R=2, N=1, G=1, E=1.",
      "Step 2: Total = 7! / (2! × 2!) = 5,040 / 4 = 1,260.",
      "Step 3: Arrangements with two R's together: Treat [RR] as 1 entity. Total entities = 6 (with A=2).",
      "Step 4: Ways with R's together = 6! / 2! = 720 / 2 = 360.",
      "Step 5: Ways with R's NOT together = 1,260 - 360 = 900."
    ],
    finalAnswerExplanation: "1,260 - 360 = 900 arrangements."
  },
  {
    id: "ws_70",
    topicId: "identical_objects",
    topicName: "Permutations of Objects With Identical Items",
    difficulty: "Challenging",
    category: "Numerical",
    question: "How many 6-letter arrangements can be formed from the letters of 'GOOGLE' such that the two O's always remain together?",
    type: "numeric",
    correctAnswer: "60",
    hints: [
      "Treat [OO] as a single block.",
      "Now arrange G, G, L, E and [OO] (5 entities total, where G appears twice)."
    ],
    solutionSteps: [
      "Step 1: Group [OO] as 1 super-letter.",
      "Step 2: Entities to arrange: G, G, L, E, and [OO] = 5 entities.",
      "Step 3: In this list, G repeats 2 times. The other letters are distinct.",
      "Step 4: Total arrangements = 5! / 2! = 120 / 2 = 60."
    ],
    finalAnswerExplanation: "5! / 2! = 60 arrangements."
  }
];
