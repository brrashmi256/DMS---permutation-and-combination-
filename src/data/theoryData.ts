// 2nd-year B.E. Discrete Mathematical Structures (DMS)
// Comprehensive Academic Theory & 49 Fully Worked Examples (7 per topic)

export interface WorkedExample {
  id: string;
  title: string;
  problem: string;
  given: string;
  concept: string;
  formula: string;
  reasoning: string;
  substitution: string;
  calculation: string[];
  finalAnswer: string;
  interpretation: string;
  verification: string;
}

export interface TheoryTopic {
  id: string;
  title: string;
  shortCode: string;
  formulaDisplay: string;
  formalDefinition: string;
  explanationParagraphs: string[];
  whyUseful: string[];
  whenToApply: string[];
  symbolExplanations: { symbol: string; meaning: string }[];
  derivation: {
    heading: string;
    steps: string[];
  };
  assumptionsAndRestrictions: string[];
  workedExamples: WorkedExample[];
  realLifeApplications: string[];
  commonMistakes: { mistake: string; correction: string; why: string }[];
  summary: string;
}

export const THEORY_TOPICS: TheoryTopic[] = [
  {
    id: "factorials",
    title: "Factorials and the Fundamental Counting Principle",
    shortCode: "n!",
    formulaDisplay: "n! = n \\times (n - 1) \\times (n - 2) \\times \\cdots \\times 2 \\times 1",
    formalDefinition:
      "For any non-negative integer n, the factorial of n (denoted as n!) is defined as the product of all positive integers less than or equal to n. Formally, n! = \\prod_{k=1}^n k for n \\ge 1, with the critical axiomatic foundation that 0! = 1. In discrete structures, factorials represent the cardinality of the symmetric group S_n, which enumerates all bijective mappings of an n-element set onto itself.",
    explanationParagraphs: [
      "The factorial function forms the absolute bedrock of enumerative combinatorics and discrete mathematics. When we are tasked with arranging n distinct objects in a straight line, each position must be filled sequentially. For the first slot, we possess n available candidates. Once that object is placed, it cannot be reused, leaving exactly n - 1 candidates for the second position, n - 2 for the third, and so forth until only 1 single candidate remains for the final position.",
      "By the Fundamental Multiplication Principle of Counting (the Rule of Product), if a compound task consists of k consecutive independent stages where stage i can be performed in m_i ways, the total number of ways to perform the entire compound task is the product m_1 \\times m_2 \\times \\cdots \\times m_k. For linear arrangements of n distinct entities, this translates directly to n \\times (n-1) \\times (n-2) \\times \\cdots \\times 1, which we abbreviate as n!.",
      "The value of 0! = 1 frequently perplexes novice engineering students. In set theory and discrete mathematics, 0! represents the number of ways to arrange zero objects (the empty set ∅). There is precisely one bijective map from the empty set to itself (the empty function ∅). Furthermore, from the recursive algebraic identity n! = n \\times (n-1)!, substituting n = 1 yields 1! = 1 \\times 0!. Dividing both sides by 1 proves irrevocably that 0! must equal 1. Without this convention, fundamental combinatorial identities like \\binom{n}{0} = \\frac{n!}{0!n!} = 1 and \\binom{n}{n} = \\frac{n!}{n!0!} = 1 would collapse.",
      "Factorials exhibit an explosive growth rate known as superexponential growth (approximated asymptotically by Stirling's Formula: n! \\approx \\sqrt{2\\pi n}(\\frac{n}{e})^n). In algorithm analysis, an algorithm with time complexity O(n!)—such as brute-force Traveling Salesperson Problem solvers—becomes computationally intractable for even modest inputs like n = 20 (where 20! \\approx 2.43 \\times 10^{18})."
    ],
    whyUseful: [
      "Provides the fundamental building block for computing permutations, combinations, and binomial coefficients.",
      "Quantifies the state space size in discrete probability, statistical mechanics, and combinatorial optimization.",
      "Directly measures algorithmic time complexity in permutation-generation algorithms and NP-hard graph search algorithms.",
      "Forms coefficients in Taylor series expansions and generating functions throughout advanced discrete calculus."
    ],
    whenToApply: [
      "When arranging n distinct items in a complete linear sequence where every item must be assigned a unique position.",
      "When evaluating binomial expansions, hypergeometric distributions, and partitioning problems.",
      "When simplifying combinatorial ratios such as \\frac{n!}{(n-r)!} or \\frac{(n+1)!}{(n-1)!}."
    ],
    symbolExplanations: [
      { symbol: "n", meaning: "A non-negative integer representing the total number of distinct entities to arrange." },
      { symbol: "!", meaning: "The factorial operator signifying consecutive integer descending multiplication." },
      { symbol: "0!", meaning: "The empty product, mathematically defined and proved to equal exactly 1." },
      { symbol: "\\prod_{k=1}^n k", meaning: "Capital pi product notation shorthand for multiplying all integers k from 1 to n." }
    ],
    derivation: {
      heading: "Derivation via the Product Rule and Recursive Relation",
      steps: [
        "Step 1: Consider a line of n empty labeled slots: [Position 1], [Position 2], ..., [Position n].",
        "Step 2: There are n distinct objects available. We can fill Position 1 with any of the n objects (n choices).",
        "Step 3: Because replacement is not permitted, Position 2 has (n - 1) objects remaining.",
        "Step 4: Continue this deterministic reduction until Position n has only 1 remaining object.",
        "Step 5: Apply the Multiplication Principle: Total Arrangements = n \\times (n - 1) \\times (n - 2) \\times \\cdots \\times 2 \\times 1 = n!.",
        "Step 6: Algebraic consistency check for 0!: The recurrence is (n - 1)! = \\frac{n!}{n}. Setting n = 1 yields 0! = \\frac{1!}{1} = 1."
      ]
    },
    assumptionsAndRestrictions: [
      "The input n must be a non-negative integer (n \\in \\mathbb{N}_0 = \\{0, 1, 2, 3, \\dots\\}). Negative factorials are undefined in discrete mathematics.",
      "All objects being arranged must be mutually distinct (indistinguishable duplicates require multinomial correction).",
      "Order of placement matters completely; changing slot assignments yields a distinct outcome."
    ],
    workedExamples: [
      {
        id: "fact_ex_1",
        title: "Arranging Engineering Textbooks on a Shelf",
        problem: "In a B.E. computer science library, 6 distinct textbooks (Discrete Mathematics, Data Structures, Operating Systems, Computer Networks, Algorithms, and DBMS) need to be arranged side-by-side on a single shelf. How many distinct arrangements are possible?",
        given: "Total textbooks n = 6. All 6 textbooks are distinct. All 6 shelf positions are distinct.",
        concept: "Factorial of n distinct items arranged in a linear line.",
        formula: "Total Arrangements = n!",
        reasoning: "Each position on the shelf can be occupied by only one book without repetition. The first slot has 6 candidates, the second 5, and so on until the 6th slot has 1 candidate.",
        substitution: "Substitute n = 6 into the formula: 6!",
        calculation: [
          "6! = 6 \\times 5 \\times 4 \\times 3 \\times 2 \\times 1",
          "6 \\times 5 = 30",
          "30 \\times 4 = 120",
          "120 \\times 3 = 360",
          "360 \\times 2 = 720",
          "720 \\times 1 = 720"
        ],
        finalAnswer: "720 distinct shelf arrangements",
        interpretation: "There are precisely 720 unique visual orderings in which the librarian can stack these six semester textbooks.",
        verification: "Using recurrence: 6! = 6 \\times 5! = 6 \\times 120 = 720. Calculation is verified."
      },
      {
        id: "fact_ex_2",
        title: "Simplifying a Factorial Algebraic Fraction",
        problem: "Simplify the factorial fraction: \\frac{10!}{7! \\times 3!} and determine its exact numerical value.",
        given: "Numerator = 10!, Denominator = 7! \\times 3!.",
        concept: "Factorial expansion, cancellation of common factors, and simplification.",
        formula: "\\frac{n!}{r!(n-r)!}",
        reasoning: "Rather than multiplying out 10! completely (which is 3,628,800), we expand 10! down to 7! and cancel the large common factor 7! from numerator and denominator.",
        substitution: "\\frac{10 \\times 9 \\times 8 \\times 7!}{7! \\times (3 \\times 2 \\times 1)}",
        calculation: [
          "Cancel out 7! in numerator and denominator: \\frac{10 \\times 9 \\times 8}{3 \\times 2 \\times 1}",
          "Numerator product: 10 \\times 9 \\times 8 = 720",
          "Denominator product: 3 \\times 2 \\times 1 = 6",
          "Divide 720 by 6: \\frac{720}{6} = 120"
        ],
        finalAnswer: "120",
        interpretation: "The fraction represents the binomial coefficient \\binom{10}{3}, which counts the combinations of selecting 3 objects from 10.",
        verification: "Direct calculation: 10! = 3,628,800. 7! = 5,040. 3! = 6. Denominator = 5,040 \\times 6 = 30,240. 3,628,800 / 30,240 = 120."
      },
      {
        id: "fact_ex_3",
        title: "Factorial Equation: Solving for Unknown n",
        problem: "Find the positive integer n that satisfies the equation: \\frac{(n+2)!}{n!} = 56.",
        given: "Equation \\frac{(n+2)!}{n!} = 56 where n \\ge 1 is an integer.",
        concept: "Expanding factorial expressions algebraically to reduce to a polynomial.",
        formula: "(n+2)! = (n+2)(n+1)n!",
        reasoning: "The term (n+2)! contains n! as a sub-product. Dividing by n! cancels out all terms from n down to 1, leaving a clean quadratic equation in terms of n.",
        substitution: "\\frac{(n+2)(n+1)n!}{n!} = 56 \\implies (n+2)(n+1) = 56",
        calculation: [
          "Expand the quadratic: n^2 + 3n + 2 = 56",
          "Subtract 56 from both sides: n^2 + 3n - 54 = 0",
          "Factor the quadratic: (n + 9)(n - 6) = 0",
          "Roots: n = -9 or n = 6",
          "Since n must be a positive integer in discrete mathematics, discard n = -9."
        ],
        finalAnswer: "n = 6",
        interpretation: "When n = 6, (6+2)! / 6! = 8! / 6! = (40,320) / (720) = 56.",
        verification: "Substitute n = 6 back into original equation: (6+2)! / 6! = 8 \\times 7 = 56. Equation is satisfied."
      },
      {
        id: "fact_ex_4",
        title: "Arranging Letters with Vowels Kept Together (Tie Method)",
        problem: "In how many ways can the letters of the word 'COMPUTER' be arranged such that all vowels (O, U, E) always stay together as a single block?",
        given: "Word 'COMPUTER' has 8 distinct letters. Vowels = {O, U, E} (3 vowels). Consonants = {C, M, P, T, R} (5 consonants).",
        concept: "Block/Tie Method in factorial permutations.",
        formula: "Total = (Number of super-items)! \\times (Internal vowel permutations)!",
        reasoning: "Tie the 3 vowels together into a single composite entity [O,U,E]. We now arrange 5 consonants + 1 block = 6 entities. Then, within the block, the 3 vowels can permute among themselves.",
        substitution: "Number of super items = 5 + 1 = 6. Internal items = 3.",
        calculation: [
          "Ways to arrange the 6 entities: 6! = 720",
          "Ways to arrange the 3 vowels internally: 3! = 3 \\times 2 \\times 1 = 6",
          "By the multiplication rule: Total Ways = 6! \\times 3! = 720 \\times 6 = 4,320"
        ],
        finalAnswer: "4,320 arrangements",
        interpretation: "Out of all 8! = 40,320 unrestricted arrangements of 'COMPUTER', exactly 4,320 keep the vowel block intact.",
        verification: "Fraction of arrangements where vowels are together = 3! \\times 6! / 8! = (6 \\times 720) / 40320 = 4320 / 40320 = 3/28. Confirmed."
      },
      {
        id: "fact_ex_5",
        title: "Arranging Letters with Two Specific Characters Never Adjacent",
        problem: "In how many ways can 7 distinct student ambassadors (A, B, C, D, E, F, G) stand in a straight queue if students A and B must NEVER stand next to each other?",
        given: "Total students n = 7. Restriction: A and B must not be adjacent.",
        concept: "Complementary Counting Principle: Total Unrestricted - Total Adjacent.",
        formula: "N(\\text{Not Adjacent}) = N(\\text{Total}) - N(\\text{A and B Adjacent})",
        reasoning: "It is far easier to calculate the total unrestricted arrangements and subtract the arrangements where A and B are glued together as a pair [AB].",
        substitution: "Total = 7!. Adjacent = 6! \\times 2! (treating [AB] as 1 item with 2 internal orders AB and BA).",
        calculation: [
          "Total unrestricted arrangements: 7! = 5,040",
          "Number of entities when [AB] is grouped: (6 remaining items + [AB] block) = 6 items",
          "Arrangements of 6 items: 6! = 720",
          "Internal arrangements of block: 2! = 2",
          "Arrangements where A and B are adjacent: 6! \\times 2! = 720 \\times 2 = 1,440",
          "Subtract adjacent from total: 5,040 - 1,440 = 3,600"
        ],
        finalAnswer: "3,600 valid queues",
        interpretation: "There are 3,600 linear queue configurations where student A and student B have at least one other student between them.",
        verification: "Alternative Gap Method: Arrange 5 other students in 5! = 120 ways. They create 6 empty gaps (_C_D_E_F_G_). Choose 2 gaps for A and B in 6 \\times 5 = 30 ways. Total = 120 \\times 30 = 3,600. Perfect match."
      },
      {
        id: "fact_ex_6",
        title: "Proving the Factorial Identity n! + (n-1)! = (n-1)!(n+1)",
        problem: "Express the sum 8! + 7! as a single factored product of the form k \\times 7!, and compute its value.",
        given: "Expression 8! + 7!.",
        concept: "Factoring out common factorial powers using n! = n \\times (n-1)!.",
        formula: "n! + (n-1)! = (n)(n-1)! + (n-1)! = (n-1)!(n + 1)",
        reasoning: "Because 8! = 8 \\times 7!, both terms share a common factor of 7!. Factoring 7! out simplifies the arithmetic immensely.",
        substitution: "Substitute n = 8: 8! + 7! = 7!(8 + 1) = 7! \\times 9",
        calculation: [
          "Evaluate 7!: 7! = 5,040",
          "Multiply by (8 + 1) = 9: 5,040 \\times 9",
          "5,040 \\times 9 = 45,360"
        ],
        finalAnswer: "9 \\times 7! = 45,360",
        interpretation: "Combining adjacent factorials produces (n+1) copies of the smaller factorial.",
        verification: "Direct calculation: 8! = 40,320. 7! = 5,040. Sum = 40,320 + 5,040 = 45,360. Consistent."
      },
      {
        id: "fact_ex_7",
        title: "Factorial Prime Factorization (Legendre's Formula)",
        problem: "How many trailing zeros are there at the end of the decimal representation of 25! (factorial of 25)?",
        given: "Factorial value 25!.",
        concept: "Prime factorization and count of factors of 10 = 2 \\times 5 in n!.",
        formula: "E_5(n!) = \\sum_{k=1}^{\\infty} \\lfloor \\frac{n}{5^k} \\rfloor",
        reasoning: "A trailing zero is created by every factor of 10. Since 10 = 2 \\times 5 and factors of 2 are strictly more abundant than factors of 5 in any factorial, the number of trailing zeros equals the highest power of 5 dividing 25!.",
        substitution: "n = 25: \\lfloor \\frac{25}{5^1} \\rfloor + \\lfloor \\frac{25}{5^2} \\rfloor + \\lfloor \\frac{25}{5^3} \\rfloor + \\dots",
        calculation: [
          "First term: \\lfloor 25 / 5 \\rfloor = 5 (numbers 5, 10, 15, 20, 25 each contribute at least one factor of 5)",
          "Second term: \\lfloor 25 / 25 \\rfloor = 1 (number 25 contributes an additional factor of 5)",
          "Third term: \\lfloor 25 / 125 \\rfloor = 0",
          "Total zeros = 5 + 1 = 6"
        ],
        finalAnswer: "6 trailing zeros",
        interpretation: "The exact value of 25! ends with exactly six consecutive zeros: 25! = 15,511,210,043,330,985,984,000,000.",
        verification: "Factors of 5: 5 (1), 10 (1), 15 (1), 20 (1), 25 (2). Total 5's = 1 + 1 + 1 + 1 + 2 = 6. Verified."
      }
    ],
    realLifeApplications: [
      "Scheduling and Task Execution: Determining the sequence of CPU thread executions in real-time operating systems.",
      "Route Optimization: In the Traveling Salesperson Problem (TSP), a graph with n nodes has (n-1)! / 2 possible Hamiltonian circuits.",
      "Cryptographic Key Spaces: Generating permutation matrices in symmetric-key encryption schemes.",
      "DNA Sequencing: Reconstructing genome fragments by testing sequence re-orderings."
    ],
    commonMistakes: [
      {
        mistake: "Assuming (a + b)! = a! + b! or (a \\times b)! = a! \\times b!",
        correction: "Factorials do NOT distribute over addition or multiplication. For example, (2 + 3)! = 5! = 120, whereas 2! + 3! = 2 + 6 = 8.",
        why: "Factorial is a cumulative product, not a linear operator."
      },
      {
        mistake: "Claiming that 0! = 0 because 'multiplying by zero gives zero'.",
        correction: "0! = 1 by mathematical definition and recurrence consistency (n! = n(n-1)!).",
        why: "0! represents an empty product, which has a multiplicative identity value of 1."
      }
    ],
    summary:
      "The factorial n! counts all linear sequences of n distinct objects. It grows superexponentially, obeys n! = n \\times (n-1)!, and satisfies the indispensable boundary condition 0! = 1."
  },
  {
    id: "perm_no_rep",
    title: "Permutations Without Repetition",
    shortCode: "nPr",
    formulaDisplay: "{}^nP_r = P(n, r) = \\frac{n!}{(n - r)!}",
    formalDefinition:
      "A permutation without repetition of r elements selected from a set of n distinct elements is an ordered arrangement of those r distinct elements. The total number of such ordered arrangements is denoted by ^nP_r or P(n, r). Formally, it represents the cardinality of the set of all injective (one-to-one) functions from a domain set of size r into a codomain set of size n, where 0 \\le r \\le n.",
    explanationParagraphs: [
      "The defining characteristic of a permutation is that ORDER MATTERS. If we change the sequence of chosen elements, we produce a fundamentally different outcome. For example, awarding Gold to Alice and Silver to Bob is entirely different from awarding Gold to Bob and Silver to Alice, even though the exact same two individuals are involved.",
      "To build an ordered sequence of length r from an available pool of n distinct elements, we imagine r distinct labeled slots: Position 1, Position 2, ..., Position r. For Position 1, we can choose any of the n objects. For Position 2, since repetition is strictly forbidden, only n - 1 objects remain. For Position 3, n - 2 objects remain. By mathematical induction, for the r-th position, exactly n - (r - 1) = n - r + 1 objects remain available.",
      "Multiplying these sequential choices yields: ^nP_r = n \\times (n - 1) \\times (n - 2) \\times \\cdots \\times (n - r + 1). Notice that this product contains exactly r factors. To express this cleanly in compact factorial notation, we multiply and divide by (n - r)!: \\frac{n(n-1)\\cdots(n-r+1) \\times (n-r)!}{(n-r)!} = \\frac{n!}{(n-r)!}.",
      "A crucial special case occurs when r = n: ^nP_n = \\frac{n!}{(n-n)!} = \\frac{n!}{0!} = \\frac{n!}{1} = n!. This smoothly unifies our definition of factorials: arranging all n objects is simply a permutation of length n from n available candidates."
    ],
    whyUseful: [
      "Essential whenever roles, rankings, positions, or priorities are distinct and non-interchangeable.",
      "Calculates the number of possible passwords or security codes when characters cannot be reused.",
      "Models injective mappings between finite sets in discrete mathematics.",
      "Determines the probability of ordered event sequences in sampling without replacement."
    ],
    whenToApply: [
      "When selecting r objects from a total of n distinct objects.",
      "When every object can be selected AT MOST ONCE (no repetition allowed).",
      "When changing the order of the chosen objects produces a distinct valid outcome."
    ],
    symbolExplanations: [
      { symbol: "n", meaning: "Total number of distinct available items in the source set." },
      { symbol: "r", meaning: "Number of positions to fill, or number of items to select in order (0 \\le r \\le n)." },
      { symbol: "{}^nP_r", meaning: "Permutation operator counting ordered selections of r items from n items." },
      { symbol: "(n - r)!", meaning: "The factorial of unchosen items, which cancels out unneeded terms from the tail of n!." }
    ],
    derivation: {
      heading: "Derivation via Sequential Slot Filling",
      steps: [
        "Step 1: Set up r distinct ordered slots: Slot 1, Slot 2, ..., Slot r.",
        "Step 2: Slot 1 has n choices.",
        "Step 3: Slot 2 has n - 1 choices (since no repetition is allowed).",
        "Step 4: Slot 3 has n - 2 choices.",
        "Step 5: Slot r has n - (r - 1) = n - r + 1 choices.",
        "Step 6: By Rule of Product: Total = n \\times (n - 1) \\times (n - 2) \\times \\cdots \\times (n - r + 1).",
        "Step 7: Multiply and divide by (n - r)!: \\frac{[n(n-1)\\cdots(n-r+1)] \\times (n-r)!}{(n-r)!} = \\frac{n!}{(n-r)!}."
      ]
    },
    assumptionsAndRestrictions: [
      "0 \\le r \\le n. If r > n, ^nP_r = 0 because you cannot select more distinct items than exist in the set.",
      "All n source objects are mutually distinguishable.",
      "No object can be picked more than once (sampling without replacement)."
    ],
    workedExamples: [
      {
        id: "perm_ex_1",
        title: "Electing Student Council Executives",
        problem: "In a class of 25 engineering students, a President, Vice President, and Secretary must be elected. No student may hold more than one office. In how many different ways can these three distinct executive posts be filled?",
        given: "Total eligible students n = 25. Number of distinct roles r = 3 (President, VP, Secretary).",
        concept: "Permutation without repetition: roles are distinct, order/assignment matters.",
        formula: "{}^nP_r = \\frac{n!}{(n - r)!}",
        reasoning: "President, VP, and Secretary are completely distinct roles. Assigning Student A as President and Student B as VP is different from Student B as President and Student A as VP.",
        substitution: "{}^{25}P_3 = \\frac{25!}{(25 - 3)!} = \\frac{25!}{22!}",
        calculation: [
          "Expand 25! down to 22!: \\frac{25 \\times 24 \\times 23 \\times 22!}{22!}",
          "Cancel 22! from numerator and denominator: 25 \\times 24 \\times 23",
          "25 \\times 24 = 600",
          "600 \\times 23 = 13,800"
        ],
        finalAnswer: "13,800 ways",
        interpretation: "There are 13,800 distinct executive leadership slates that can be elected from the 25 students.",
        verification: "Slot method: President has 25 choices, VP has 24 choices, Secretary has 23 choices. 25 \\times 24 \\times 23 = 13,800. Matches formula."
      },
      {
        id: "perm_ex_2",
        title: "Running a 100-Meter Sprint Podium Finish",
        problem: "Eight sprinters compete in the finals of an Olympic 100-meter dash. In how many different ways can the Gold, Silver, and Bronze medals be awarded, assuming there are no ties?",
        given: "Total sprinters n = 8. Medals to award r = 3 (Gold, Silver, Bronze). No ties.",
        concept: "Permutation without repetition.",
        formula: "{}^nP_r = \\frac{n!}{(n - r)!}",
        reasoning: "The medals represent distinct ranks (1st, 2nd, 3rd). A runner finishing 1st is not interchangeable with one finishing 2nd.",
        substitution: "{}^8P_3 = \\frac{8!}{(8 - 3)!} = \\frac{8!}{5!}",
        calculation: [
          "{}^8P_3 = \\frac{8 \\times 7 \\times 6 \\times 5!}{5!}",
          "Cancel 5!: 8 \\times 7 \\times 6",
          "8 \\times 7 = 56",
          "56 \\times 6 = 336"
        ],
        finalAnswer: "336 ways",
        interpretation: "There are 336 possible podium configurations for the top 3 finishers among the 8 competitors.",
        verification: "8 choices for Gold, 7 remaining for Silver, 6 remaining for Bronze: 8 \\times 7 \\times 6 = 336."
      },
      {
        id: "perm_ex_3",
        title: "Creating 4-Digit Codes with Distinct Digits",
        problem: "How many 4-digit security passcodes can be formed using the digits {1, 2, 3, 4, 5, 6, 7, 8, 9} if each digit can be used at most once?",
        given: "Pool of digits n = 9 (non-zero digits). Length of passcode r = 4. Repetition forbidden.",
        concept: "Permutation of 9 items taken 4 at a time.",
        formula: "{}^nP_r = \\frac{n!}{(n - r)!}",
        reasoning: "In a security PIN, 1234 is completely distinct from 4321; position encodes value.",
        substitution: "{}^9P_4 = \\frac{9!}{(9 - 4)!} = \\frac{9!}{5!}",
        calculation: [
          "{}^9P_4 = 9 \\times 8 \\times 7 \\times 6",
          "9 \\times 8 = 72",
          "72 \\times 7 = 504",
          "504 \\times 6 = 3,024"
        ],
        finalAnswer: "3,024 passcodes",
        interpretation: "There are 3,024 unique 4-digit codes with no repeated digits from the set {1..9}.",
        verification: "9! / 5! = 362,880 / 120 = 3,024. Calculation is exact."
      },
      {
        id: "perm_ex_4",
        title: "Permutations with Restrictions: Even Numbers Only",
        problem: "How many 3-digit numbers can be formed from the digits {1, 2, 3, 4, 5, 6, 7} without repetition such that the resulting number is EVEN?",
        given: "Digits = {1, 2, 3, 4, 5, 6, 7} (7 total). Even digits = {2, 4, 6} (3 even digits). Length = 3 digits. No repetition.",
        concept: "Permutation with a restricted position (units digit must be even).",
        formula: "Ways = (Choices for units digit) \\times {}^{n-1}P_{r-1}",
        reasoning: "A number is even if and only if its last digit is even. We must fill the most constrained slot (the units digit) first.",
        substitution: "Units digit: 3 choices. Remaining 2 slots filled from remaining 6 digits: {}^6P_2.",
        calculation: [
          "Units digit choices = 3 (can be 2, 4, or 6)",
          "Remaining digits available = 7 - 1 = 6 digits",
          "Choices for hundreds and tens slots: {}^6P_2 = \\frac{6!}{(6-2)!} = 6 \\times 5 = 30",
          "Total even 3-digit numbers = 3 \\times 30 = 90"
        ],
        finalAnswer: "90 even numbers",
        interpretation: "Out of all {}^7P_3 = 210 possible 3-digit numbers, exactly 90 are even (and 120 are odd).",
        verification: "Odd digits = {1, 3, 5, 7} (4 choices). Odd numbers = 4 \\times {}^6P_2 = 4 \\times 30 = 120. Total = 90 + 120 = 210 = {}^7P_3. Verified."
      },
      {
        id: "perm_ex_5",
        title: "Evaluating Algebraic Ratio of Permutations",
        problem: "Solve for n if {}^nP_4 = 20 \\times {}^nP_2, with n \\ge 4.",
        given: "Equation {}^nP_4 = 20 \\times {}^nP_2.",
        concept: "Expanding permutation formulas algebraically.",
        formula: "{}^nP_r = n(n-1)(n-2)\\cdots(n-r+1)",
        reasoning: "Expand both sides in terms of polynomial products and cancel common non-zero factors.",
        substitution: "n(n-1)(n-2)(n-3) = 20 \\times n(n-1)",
        calculation: [
          "Since n \\ge 4, n \\ne 0 and n \\ne 1, so divide both sides by n(n-1):",
          "(n - 2)(n - 3) = 20",
          "Expand: n^2 - 5n + 6 = 20",
          "Subtract 20: n^2 - 5n - 14 = 0",
          "Factor: (n - 7)(n + 2) = 0",
          "Roots: n = 7 or n = -2. Since n must be positive, n = 7."
        ],
        finalAnswer: "n = 7",
        interpretation: "A set of 7 objects satisfies {}^7P_4 = 7 \\times 6 \\times 5 \\times 4 = 840, and 20 \\times {}^7P_2 = 20 \\times (7 \\times 6) = 20 \\times 42 = 840.",
        verification: "840 = 840. Proved."
      },
      {
        id: "perm_ex_6",
        title: "Arranging Dancers with Alternate Gender Placement",
        problem: "Four male dancers and four female dancers must be arranged in a straight line on stage such that men and women alternate. In how many ways can this formation be established?",
        given: "4 men, 4 women. Total positions = 8. Restriction: Alternate genders (M-F-M-F-M-F-M-F or F-M-F-M-F-M-F-M).",
        concept: "Independent linear permutations with multiple valid template patterns.",
        formula: "Total = 2 \\times (n_m! \\times n_f!)",
        reasoning: "There are two allowable structural templates: starting with a man or starting with a woman. For each template, the 4 men occupy 4 designated spots in 4! ways, and the 4 women occupy 4 designated spots in 4! ways.",
        substitution: "Template 1 (M first): 4! \\times 4!. Template 2 (F first): 4! \\times 4!.",
        calculation: [
          "4! for male dancers = 24",
          "4! for female dancers = 24",
          "Ways for Template 1: 24 \\times 24 = 576",
          "Ways for Template 2: 24 \\times 24 = 576",
          "Total ways = 576 + 576 = 1,152"
        ],
        finalAnswer: "1,152 alternating arrangements",
        interpretation: "There are 1,152 different stage lineups maintaining strict gender alternation.",
        verification: "Direct calculation: 2 \\times (24)^2 = 2 \\times 576 = 1,152."
      },
      {
        id: "perm_ex_7",
        title: "Selecting and Arranging with At Least One Specific Member",
        problem: "From a department of 10 professors including Professor Rao, a delegation of 4 distinct ranking delegates (Head, Deputy Head, Rapporteur, Treasurer) is to be formed. In how many ways can this delegation be appointed if Professor Rao MUST be included in one of the positions?",
        given: "Total professors n = 10. Distinct roles r = 4. Professor Rao must hold one of the 4 roles.",
        concept: "Permutations with guaranteed inclusion of a specific element.",
        formula: "Ways = (Choices for Rao's role) \\times {}^{n-1}P_{r-1}",
        reasoning: "First assign Professor Rao to one of the 4 roles (4 choices). Then fill the remaining 3 roles from the remaining 9 professors in {}^9P_3 ways.",
        substitution: "4 \\times {}^9P_3 = 4 \\times \\frac{9!}{(9-3)!} = 4 \\times (9 \\times 8 \\times 7)",
        calculation: [
          "Rao's role choices = 4",
          "Remaining positions: {}^9P_3 = 9 \\times 8 \\times 7 = 504",
          "Total delegations = 4 \\times 504 = 2,016"
        ],
        finalAnswer: "2,016 ways",
        interpretation: "There are 2,016 distinct 4-person delegations that guarantee Professor Rao holds a post.",
        verification: "Complementary method: Total 4-person delegations = {}^10P_4 = 10 \\times 9 \\times 8 \\times 7 = 5,040. Delegations excluding Rao = {}^9P_4 = 9 \\times 8 \\times 7 \\times 6 = 3,024. Delegations with Rao = 5,040 - 3,024 = 2,016. Exact match."
      }
    ],
    realLifeApplications: [
      "Access Control: Generating unique sequential activation tokens and OTPs.",
      "Job Shop Scheduling: Assigning n computational tasks to m available GPU cores in sequential priority.",
      "Tournament Rankings: Modeling permutations of final tournament standings.",
      "Robotic Assembly Line: Determining the sequence of mechanical arm weld points."
    ],
    commonMistakes: [
      {
        mistake: "Using permutations when the order of items does not matter (e.g., selecting a committee).",
        correction: "Always verify whether changing the order creates a distinct scenario. If roles are identical, use combinations ^nC_r.",
        why: "Permutations count ordered arrangements, leading to an overcounting by a factor of r! if order is irrelevant."
      },
      {
        mistake: "Evaluating ^nP_r as \\frac{n!}{r!} instead of \\frac{n!}{(n-r)!}.",
        correction: "The denominator for ^nP_r is (n - r)!, which cancels out the unselected items.",
        why: "Dividing by r! would convert the permutation into a combination."
      }
    ],
    summary:
      "Permutations without repetition count ordered sequences of r distinct items chosen from n. Formula: ^nP_r = \\frac{n!}{(n-r)!}. Remember: Order matters and each item can be selected at most once."
  },
  {
    id: "comb_no_rep",
    title: "Combinations Without Repetition",
    shortCode: "nCr",
    formulaDisplay: "{}^nC_r = \\binom{n}{r} = \\frac{n!}{r!(n - r)!}",
    formalDefinition:
      "A combination without repetition of r elements chosen from a set of n distinct elements is an unordered subset of size r. The total number of such subsets is denoted by ^nC_r, C(n, r), or \\binom{n}{r}. Formally, it represents the cardinality of the family of all r-element subsets of an n-element set: \\{ S \\subseteq A \\mid |S| = r, |A| = n \\}.",
    explanationParagraphs: [
      "In sharp contrast to permutations, COMBINATIONS DISREGARD ORDER ENTIRELY. When we select a study group, a committee, or a basketball team, the members {Alice, Bob, Charlie} constitute the exact same team as {Charlie, Alice, Bob}. Membership is what counts, not who was called up first, second, or third.",
      "To understand why the combination formula divides by r!, consider selecting r items from n items. If we cared about order, there would be ^nP_r = \\frac{n!}{(n-r)!} ordered arrangements. However, any specific subset of r distinct items can be permuted internally in exactly r! different ways. Since all r! of these arrangements represent the exact same unordered collection, ^nP_r overcounts the number of true subsets by a factor of exactly r!.",
      "To correct this massive overcounting, we divide the permutation count by r!: ^nC_r = \\frac{{}^nP_r}{r!} = \\frac{n!}{r!(n-r)!}. This profound relationship connects permutations and combinations: ^nP_r = r! \\times {}^nC_r.",
      "Combinations possess elegant algebraic symmetry: \\binom{n}{r} = \\binom{n}{n-r}. Selecting r objects to INCLUDE in a team is mathematically identical to selecting n - r objects to EXCLUDE. Furthermore, combinations are the exact coefficients in Pascal's Triangle and Newton's Binomial Theorem: (x + y)^n = \\sum_{k=0}^n \\binom{n}{k} x^{n-k} y^k, which is why \\binom{n}{r} is universally referred to as the binomial coefficient."
    ],
    whyUseful: [
      "Forms the mathematical basis for committee selection, sampling in statistics, and lottery probabilities.",
      "Generates coefficients in the Binomial Theorem and Pascal's Triangle.",
      "Enables subset counting in power sets: \\sum_{k=0}^n \\binom{n}{k} = 2^n.",
      "Underpins graph theory (counting edges in complete graphs K_n: \\binom{n}{2})."
    ],
    whenToApply: [
      "When choosing r items from n distinct items where group membership matters, not ordering.",
      "When terms like 'team', 'committee', 'subset', 'hand of cards', or 'sample' appear in the problem.",
      "When items cannot be repeated (sampling without replacement)."
    ],
    symbolExplanations: [
      { symbol: "n", meaning: "Total number of distinct available items." },
      { symbol: "r", meaning: "Size of the subset to choose (0 \\le r \\le n)." },
      { symbol: "{}^nC_r \\text{ or } \\binom{n}{r}", meaning: "Binomial coefficient counting r-element subsets." },
      { symbol: "r!", meaning: "The internal permutation factor divided out because order within the subset is irrelevant." }
    ],
    derivation: {
      heading: "Derivation via Overcounting Correction",
      steps: [
        "Step 1: Suppose we want to find the number of unordered subsets of size r, which we call C.",
        "Step 2: Take any one specific subset of r items. In how many ways can this specific subset be ordered in a line? Answer: r! ways.",
        "Step 3: If we take every possible subset C and multiply by r!, we generate all possible ordered sequences of length r.",
        "Step 4: Therefore: C \\times r! = {}^nP_r.",
        "Step 5: Divide both sides by r!: C = \\frac{{}^nP_r}{r!} = \\frac{n!}{r!(n - r)!}.",
        "Step 6: Symmetry identity check: \\binom{n}{n-r} = \\frac{n!}{(n-r)!(n-(n-r))!} = \\frac{n!}{(n-r)!r!} = \\binom{n}{r}."
      ]
    },
    assumptionsAndRestrictions: [
      "0 \\le r \\le n. If r > n, \\binom{n}{r} = 0.",
      "Elements in the set are distinct.",
      "No replacement: an element can only be selected once for the subset."
    ],
    workedExamples: [
      {
        id: "comb_ex_1",
        title: "Forming a Technical Project Committee",
        problem: "A department has 12 computer science professors. A curriculum revision committee of 5 professors must be formed. In how many different ways can this committee be selected?",
        given: "Total professors n = 12. Committee size r = 5. Order does not matter.",
        concept: "Combinations without repetition: all committee members have equal status.",
        formula: "{}^nC_r = \\binom{n}{r} = \\frac{n!}{r!(n - r)!}",
        reasoning: "A committee is an unordered set. Selecting {Prof A, Prof B, Prof C, Prof D, Prof E} is the identical committee regardless of selection order.",
        substitution: "{}^{12}C_5 = \\frac{12!}{5!(12 - 5)!} = \\frac{12!}{5! \\times 7!}",
        calculation: [
          "Expand numerator down to 7!: \\frac{12 \\times 11 \\times 10 \\times 9 \\times 8 \\times 7!}{5 \\times 4 \\times 3 \\times 2 \\times 1 \\times 7!}",
          "Cancel 7!: \\frac{12 \\times 11 \\times 10 \\times 9 \\times 8}{5 \\times 4 \\times 3 \\times 2 \\times 1}",
          "Simplify: (5 \\times 2 = 10 cancels with 10; 4 \\times 3 = 12 cancels with 12)",
          "Remaining product: 11 \\times 9 \\times 8",
          "11 \\times 9 = 99",
          "99 \\times 8 = 792"
        ],
        finalAnswer: "792 distinct committees",
        interpretation: "There are 792 unique 5-member committees that can be selected from the 12 faculty members.",
        verification: "By symmetry, \\binom{12}{5} = \\binom{12}{7}. 12! / (5! \\times 7!) = 479,001,600 / (120 \\times 5,040) = 479,001,600 / 604,800 = 792. Exact."
      },
      {
        id: "comb_ex_2",
        title: "Mixed Committee with Gender Quotas",
        problem: "A university club consists of 8 men and 6 women. A working committee of 4 people is to be formed containing exactly 2 men and 2 women. How many such committees are possible?",
        given: "Men pool = 8, Women pool = 6. Required men = 2, Required women = 2.",
        concept: "Rule of Product applied to independent combination selections.",
        formula: "Total = \\binom{n_m}{r_m} \\times \\binom{n_w}{r_w}",
        reasoning: "Selecting men and selecting women are two independent stages. By the Fundamental Multiplication Principle, multiply the number of ways to choose the men by the number of ways to choose the women.",
        substitution: "{}^8C_2 \\times {}^6C_2 = \\frac{8!}{2!6!} \\times \\frac{6!}{2!4!}",
        calculation: [
          "Evaluate {}^8C_2: \\frac{8 \\times 7}{2 \\times 1} = \\frac{56}{2} = 28",
          "Evaluate {}^6C_2: \\frac{6 \\times 5}{2 \\times 1} = \\frac{30}{2} = 15",
          "Multiply the two results: 28 \\times 15",
          "28 \\times 10 = 280; 28 \\times 5 = 140; 280 + 140 = 420"
        ],
        finalAnswer: "420 committees",
        interpretation: "There are 420 distinct committees containing precisely 2 men and 2 women.",
        verification: "Total 4-person committees regardless of gender = \\binom{14}{4} = 1,001. 420 is a sensible fraction of 1,001."
      },
      {
        id: "comb_ex_3",
        title: "At Least Condition: Minimum Representation",
        problem: "From a pool of 7 programmers and 5 system analysts, a team of 4 people must be selected containing AT LEAST 1 system analyst. In how many ways can this team be formed?",
        given: "Programmers = 7, Analysts = 5, Total = 12. Team size = 4. Condition: At least 1 analyst.",
        concept: "Complementary Counting with Combinations.",
        formula: "N(\\text{At least 1}) = N(\\text{Total}) - N(\\text{Zero Analysts})",
        reasoning: "The complement of 'at least 1 analyst' is 'exactly 0 analysts' (which means all 4 members are chosen exclusively from the 7 programmers).",
        substitution: "\\binom{12}{4} - \\binom{7}{4}",
        calculation: [
          "Total possible teams of 4 from 12: \\binom{12}{4} = \\frac{12 \\times 11 \\times 10 \\times 9}{4 \\times 3 \\times 2 \\times 1} = 495",
          "Teams with 0 analysts (all programmers): \\binom{7}{4} = \\frac{7 \\times 6 \\times 5 \\times 4}{4 \\times 3 \\times 2 \\times 1} = 35",
          "Subtract zero-analyst teams: 495 - 35 = 460"
        ],
        finalAnswer: "460 teams",
        interpretation: "Out of 495 possible teams, 460 have at least one system analyst.",
        verification: "Direct sum: 1 analyst (\\binom{5}{1}\\binom{7}{3} = 5 \\times 35 = 175) + 2 analysts (\\binom{5}{2}\\binom{7}{2} = 10 \\times 21 = 210) + 3 analysts (\\binom{5}{3}\\binom{7}{1} = 10 \\times 7 = 70) + 4 analysts (\\binom{5}{4}\\binom{7}{0} = 5 \\times 1 = 5). Sum: 175 + 210 + 70 + 5 = 460. Matches perfectly."
      },
      {
        id: "comb_ex_4",
        title: "Geometry Problem: Number of Diagonals in an n-gon",
        problem: "How many diagonals does a regular decagon (a 10-sided polygon) have?",
        given: "Number of vertices n = 10.",
        concept: "Combinations of pairs of vertices minus polygon sides.",
        formula: "\\text{Diagonals} = \\binom{n}{2} - n = \\frac{n(n - 3)}{2}",
        reasoning: "Any two vertices define a straight line segment. Total segments connecting 10 vertices = \\binom{10}{2}. Of these, exactly 10 segments form the outer perimeter sides. The remaining segments are diagonals.",
        substitution: "\\binom{10}{2} - 10 = \\frac{10 \\times 9}{2} - 10",
        calculation: [
          "Total line segments connecting any 2 vertices: \\binom{10}{2} = \\frac{90}{2} = 45",
          "Subtract the 10 boundary sides: 45 - 10 = 35",
          "Using direct formula: \\frac{10 \\times (10 - 3)}{2} = \\frac{10 \\times 7}{2} = \\frac{70}{2} = 35"
        ],
        finalAnswer: "35 diagonals",
        interpretation: "A 10-sided polygon has 35 interior straight-line diagonals.",
        verification: "For n=4 (quadrilateral): 4(1)/2 = 2 diagonals. For n=5 (pentagon): 5(2)/2 = 5 diagonals. Formula n(n-3)/2 is verified."
      },
      {
        id: "comb_ex_5",
        title: "Pascal's Identity Algebraic Verification",
        problem: "Verify Pascal's Identity \\binom{n}{r} = \\binom{n-1}{r-1} + \\binom{n-1}{r} for n = 6 and r = 3.",
        given: "n = 6, r = 3.",
        concept: "Pascal's combinatorial recurrence relation.",
        formula: "\\binom{n}{r} = \\binom{n-1}{r-1} + \\binom{n-1}{r}",
        reasoning: "Consider choosing r items from n items including a special item X. Either item X is included (choose r-1 from remaining n-1), or item X is excluded (choose r from remaining n-1).",
        substitution: "\\binom{6}{3} = \\binom{5}{2} + \\binom{5}{3}",
        calculation: [
          "LHS: \\binom{6}{3} = \\frac{6 \\times 5 \\times 4}{3 \\times 2 \\times 1} = 20",
          "RHS Term 1: \\binom{5}{2} = \\frac{5 \\times 4}{2 \\times 1} = 10",
          "RHS Term 2: \\binom{5}{3} = \\frac{5 \\times 4 \\times 3}{3 \\times 2 \\times 1} = 10",
          "RHS Sum: 10 + 10 = 20",
          "LHS = RHS = 20"
        ],
        finalAnswer: "20 = 20 (Identity holds)",
        interpretation: "Pascal's identity is verified algebraically and combinatorially.",
        verification: "20 = 10 + 10 = 20. Identity verified."
      },
      {
        id: "comb_ex_6",
        title: "Poker Hand: Combinations of Full House",
        problem: "In a standard 52-card deck, how many 5-card hands constitute a 'Full House' (3 cards of one rank and 2 cards of another rank)?",
        given: "Standard deck: 13 ranks, 4 suits per rank. Hand size = 5 cards.",
        concept: "Multi-stage combination selection with distinct rank choices.",
        formula: "\\text{Hands} = \\binom{13}{1}\\binom{4}{3} \\times \\binom{12}{1}\\binom{4}{2}",
        reasoning: "Choose which rank will have 3 cards (13 choices), then choose 3 of the 4 suits of that rank (\\binom{4}{3} ways). Next, choose which of the remaining 12 ranks will have 2 cards (12 choices), and choose 2 of the 4 suits (\\binom{4}{2} ways).",
        substitution: "\\binom{13}{1} \\times \\binom{4}{3} \\times \\binom{12}{1} \\times \\binom{4}{2}",
        calculation: [
          "\\binom{13}{1} = 13",
          "\\binom{4}{3} = 4",
          "\\binom{12}{1} = 12",
          "\\binom{4}{2} = \\frac{4 \\times 3}{2} = 6",
          "Product: 13 \\times 4 \\times 12 \\times 6",
          "13 \\times 4 = 52",
          "12 \\times 6 = 72",
          "52 \\times 72 = 3,744"
        ],
        finalAnswer: "3,744 full house hands",
        interpretation: "There are 3,744 distinct 5-card full house hands in standard poker.",
        verification: "Total 5-card hands = \\binom{52}{5} = 2,598,960. Probability of full house = 3,744 / 2,598,960 \\approx 0.144%."
      },
      {
        id: "comb_ex_7",
        title: "Solving a Quadratic Combinatorial Equation",
        problem: "Find the positive integer n such that \\binom{n}{2} = 28.",
        given: "Equation \\binom{n}{2} = 28.",
        concept: "Formulating and solving a polynomial from combination definition.",
        formula: "\\binom{n}{2} = \\frac{n(n - 1)}{2}",
        reasoning: "Substitute the formula for r = 2 and solve the resulting quadratic equation for positive integer n.",
        substitution: "\\frac{n(n - 1)}{2} = 28",
        calculation: [
          "Multiply both sides by 2: n(n - 1) = 56",
          "Expand: n^2 - n = 56",
          "Rearrange: n^2 - n - 56 = 0",
          "Factor: (n - 8)(n + 7) = 0",
          "Roots: n = 8 or n = -7. Since n \\ge 2 must be positive, n = 8."
        ],
        finalAnswer: "n = 8",
        interpretation: "A set of 8 distinct elements has exactly 28 unique 2-element subsets.",
        verification: "\\binom{8}{2} = (8 \\times 7) / 2 = 56 / 2 = 28. Verified."
      }
    ],
    realLifeApplications: [
      "Lottery Systems: Calculating the jackpot odds in games like Powerball (e.g. \\binom{69}{5} \\times \\binom{26}{1}).",
      "Network Topology: Counting point-to-point links required to construct a full mesh network among n routers: \\binom{n}{2}.",
      "Machine Learning: Generating feature combinations in polynomial feature extraction.",
      "Clinical Trials: Selecting sample patient cohorts from participant pools without bias."
    ],
    commonMistakes: [
      {
        mistake: "Using ^nP_r instead of ^nC_r when selecting teams or groups.",
        correction: "If the members perform identical roles or form a collective group, order is irrelevant; always use combinations.",
        why: "Permutations assume position 1 is distinct from position 2."
      },
      {
        mistake: "Double counting when conditions like 'at least one' appear.",
        correction: "Use complementary counting (Total minus zero) or carefully partition into mutually disjoint cases.",
        why: "Selecting 1 analyst and then picking 3 remaining people allows the same subset to be chosen in multiple orders."
      }
    ],
    summary:
      "Combinations without repetition count unordered subsets of r distinct items from n. Formula: \\binom{n}{r} = \\frac{n!}{r!(n-r)!}. Symmetrical property: \\binom{n}{r} = \\binom{n}{n-r}."
  },
  {
    id: "perm_rep",
    title: "Permutations With Repetition Allowed",
    shortCode: "n^r",
    formulaDisplay: "\\text{Total Sequences} = n^r",
    formalDefinition:
      "When constructing an ordered sequence of length r where each position can be occupied by any of n available distinct types, and each type may be chosen repeatedly without restriction, the total number of distinct sequences is given by n^r. Formally, this equals the cardinality of the Cartesian product A^r = A \\times A \\times \\cdots \\times A (|A| = n), or the number of functions from a domain of size r to a codomain of size n.",
    explanationParagraphs: [
      "In many engineering and computer science contexts, items or symbols CAN BE REPEATED. Think of computer memory: a byte consists of 8 bits. Each bit can be independently set to 0 or 1. Placing a 0 in the first bit does NOT prevent you from placing a 0 in the second bit. Each slot has the exact same 2 choices, resulting in 2 \\times 2 \\times \\cdots \\times 2 = 2^8 = 256 distinct bit patterns.",
      "By the Multiplication Principle of Counting, if an experiment consists of r sequential stages and every single stage offers exactly n independent choices (because picking a symbol does not deplete the supply of that symbol), the total number of outcomes is simply n multiplied by itself r times, which equals n^r.",
      "Notice that unlike permutations without repetition (where r cannot exceed n), in permutations with repetition r can be ANY positive integer, even vastly larger than n. For instance, you can construct a 100-character string using only 4 DNA nucleotides (A, C, G, T); here n = 4 and r = 100, yielding 4^{100} possible sequences.",
      "It is vital to distinguish 'which number is the base' and 'which is the exponent'. A golden mnemonic for students: The base n is the number of OPTIONS available for each choice, while the exponent r is the number of CHOICES (slots or decisions) to be made. If 3 letters are to be dropped into 5 mailboxes, each letter has 5 mailbox choices, so the answer is 5^3 = 125, not 3^5."
    ],
    whyUseful: [
      "Calculates password entropy, key space sizes, and brute-force complexity in cyber security.",
      "Determines the information capacity of digital registers, IPv4/IPv6 address spaces, and RAM.",
      "Models genetic DNA/RNA sequence combinatorics (nucleotide quadruplets).",
      "Calculates total possible truth table assignments for r boolean variables: 2^r."
    ],
    whenToApply: [
      "When creating an ordered sequence or code of length r from n symbol options.",
      "When symbols can be used multiple times without depleting the pool.",
      "When order matters: 1-1-2 is a different code from 1-2-1."
    ],
    symbolExplanations: [
      { symbol: "n", meaning: "Number of available options or symbol types for each individual position." },
      { symbol: "r", meaning: "Number of positions, slots, or sequential decisions to make." },
      { symbol: "n^r", meaning: "Exponential product counting all ordered r-tuples with repetition." }
    ],
    derivation: {
      heading: "Derivation via the Independent Multiplication Principle",
      steps: [
        "Step 1: Set up r slots: Slot 1, Slot 2, Slot 3, ..., Slot r.",
        "Step 2: Slot 1 can be filled by any of the n options (n choices).",
        "Step 3: Because replacement/repetition is permitted, Slot 2 also has n choices.",
        "Step 4: Every slot up to Slot r independently has n choices.",
        "Step 5: Total sequences = \\underbrace{n \\times n \\times n \\times \\dots \\times n}_{r \\text{ times}} = n^r."
      ]
    },
    assumptionsAndRestrictions: [
      "Each position has the same set of n choices unless specific slot restrictions (like leading zeros) are stated.",
      "The choices at each step are mutually independent.",
      "Order of placement distinguishes outcomes."
    ],
    workedExamples: [
      {
        id: "perm_rep_ex_1",
        title: "ATM 4-Digit Security PINs",
        problem: "An automated teller machine (ATM) card requires a 4-digit numeric personal identification number (PIN). Any digit from 0 through 9 may be used in any position, and repetition is permitted. How many distinct PINs can be created?",
        given: "Available digits = {0, 1, 2, 3, 4, 5, 6, 7, 8, 9} (n = 10). PIN length r = 4. Repetition allowed. Leading zeros allowed (e.g., 0042 is valid).",
        concept: "Permutation with repetition allowed: n^r.",
        formula: "\\text{Total PINs} = n^r",
        reasoning: "Each of the 4 digit slots can independently take any of the 10 digits from 0 to 9.",
        substitution: "n = 10, r = 4 \\implies 10^4",
        calculation: [
          "10^1 = 10",
          "10^2 = 100",
          "10^3 = 1,000",
          "10^4 = 10,000"
        ],
        finalAnswer: "10,000 distinct PINs",
        interpretation: "The possible PINs range from 0000 to 9999, yielding exactly 10,000 combinations.",
        verification: "The set of numbers from 0000 to 9999 has cardinality 9999 - 0 + 1 = 10,000. Verified."
      },
      {
        id: "perm_rep_ex_2",
        title: "Byte States in Digital Electronics",
        problem: "How many distinct states or values can be represented by a 16-bit binary register where each bit can be either 0 or 1?",
        given: "Bit values n = 2 ({0, 1}). Register width r = 16 bits. Repetition allowed.",
        concept: "Binary permutations with repetition: 2^r.",
        formula: "\\text{States} = n^r = 2^{16}",
        reasoning: "Each of the 16 bit positions has 2 independent choices (0 or 1).",
        substitution: "n = 2, r = 16 \\implies 2^{16}",
        calculation: [
          "2^4 = 16",
          "2^8 = 256",
          "2^{12} = 4,096",
          "2^{16} = 65,536"
        ],
        finalAnswer: "65,536 distinct states",
        interpretation: "A 16-bit integer variable in programming can store 65,536 unique values (e.g. unsigned 0 to 65,535).",
        verification: "Standard computer architecture specification: 2^{16} = 65,536. Exact."
      },
      {
        id: "perm_rep_ex_3",
        title: "Vehicle License Plates with Hybrid Format",
        problem: "A state vehicle registration system designs license plates consisting of 2 uppercase English letters followed by 4 numerical digits. Letters and digits may both be repeated. How many distinct license plates can be generated?",
        given: "2 letters (pool of 26 letters: A-Z), followed by 4 digits (pool of 10 digits: 0-9). Repetition allowed throughout.",
        concept: "Compound Rule of Product with repeated choices.",
        formula: "\\text{Plates} = (n_{\\text{letters}})^{r_1} \\times (n_{\\text{digits}})^{r_2}",
        reasoning: "The letter positions have 26 independent options each (26^2). The digit positions have 10 independent options each (10^4). Multiply by the Rule of Product.",
        substitution: "26^2 \\times 10^4",
        calculation: [
          "Evaluate letter permutations: 26^2 = 26 \\times 26 = 676",
          "Evaluate digit permutations: 10^4 = 10,000",
          "Multiply: 676 \\times 10,000 = 6,760,000"
        ],
        finalAnswer: "6,760,000 plates",
        interpretation: "The licensing agency can issue 6.76 million unique license plates before exhausting this format.",
        verification: "Slot breakdown: 26 \\times 26 \\times 10 \\times 10 \\times 10 \\times 10 = 6,760,000. Verified."
      },
      {
        id: "perm_rep_ex_4",
        title: "Telephone Numbers with No Leading Zero or One",
        problem: "How many 7-digit local telephone numbers can be created if the first digit cannot be 0 or 1, but all subsequent 6 digits can be any digit from 0 to 9 with repetition allowed?",
        given: "Length = 7 digits. First digit choices = {2, 3, 4, 5, 6, 7, 8, 9} (8 choices). Digits 2 through 7: {0..9} (10 choices each).",
        concept: "Permutation with repetition with an initial restricted position.",
        formula: "\\text{Total} = c_1 \\times n^{r-1}",
        reasoning: "The first digit has a restricted choice count of 8. The remaining 6 digits each have 10 unrestricted choices.",
        substitution: "8 \\times 10^6",
        calculation: [
          "First slot choices = 8",
          "Remaining 6 slots = 10^6 = 1,000,000",
          "Total numbers = 8 \\times 1,000,000 = 8,000,000"
        ],
        finalAnswer: "8,000,000 telephone numbers",
        interpretation: "There are 8 million assignable telephone numbers under this standard North American numbering constraint.",
        verification: "Range of valid numbers is 2,000,000 to 9,999,999: 9,999,999 - 2,000,000 + 1 = 8,000,000."
      },
      {
        id: "perm_rep_ex_5",
        title: "Distributing Distinct Letters into Distinct Post Boxes",
        problem: "In how many ways can 5 distinct letters be posted into 3 different letter boxes?",
        given: "Number of letters r = 5. Number of letter boxes n = 3. Each letter can be posted in any box.",
        concept: "Distributing distinct items into categories (n^r model).",
        formula: "\\text{Ways} = n^r = 3^5",
        reasoning: "Each letter is a decision maker that must choose one of the 3 mailboxes. Letter 1 has 3 choices, Letter 2 has 3 choices, ..., Letter 5 has 3 choices. (Avoid confusing base and exponent: mailboxes do not choose letters!).",
        substitution: "n = 3 (options per item), r = 5 (items) \\implies 3^5",
        calculation: [
          "3^1 = 3",
          "3^2 = 9",
          "3^3 = 27",
          "3^4 = 81",
          "3^5 = 243"
        ],
        finalAnswer: "243 ways",
        interpretation: "There are 243 different distributions of the 5 letters across the 3 boxes.",
        verification: "If we had 1 letter, 3 ways. 2 letters, 3 \\times 3 = 9 ways. For 5 letters, 3^5 = 243. Correct."
      },
      {
        id: "perm_rep_ex_6",
        title: "DNA Strand Sequences",
        problem: "DNA strands are composed of sequences of 4 chemical bases: Adenine (A), Cytosine (C), Guanine (G), and Thymine (T). How many distinct DNA strands of length 6 can be synthesized?",
        given: "Alphabet size n = 4 ({A, C, G, T}). Sequence length r = 6. Bases can repeat freely.",
        concept: "Permutation with repetition: 4^6.",
        formula: "\\text{Sequences} = n^r = 4^6",
        reasoning: "Each of the 6 positions in the synthesized strand can be occupied by any of the 4 nucleotides.",
        substitution: "n = 4, r = 6 \\implies 4^6",
        calculation: [
          "4^1 = 4",
          "4^2 = 16",
          "4^3 = 64",
          "4^4 = 256",
          "4^5 = 1,024",
          "4^6 = 4,096"
        ],
        finalAnswer: "4,096 distinct strands",
        interpretation: "A 6-base oligonucleotide has 4,096 distinct genetic sequence variations.",
        verification: "4^6 = (2^2)^6 = 2^{12} = 4,096. Exact."
      },
      {
        id: "perm_rep_ex_7",
        title: "Multiple-Choice Exam Answer Keys",
        problem: "A discrete mathematics quiz consists of 10 multiple-choice questions. Each question has 4 options (A, B, C, D). How many different complete answer keys are possible for the quiz?",
        given: "Questions r = 10. Options per question n = 4. Every question must have an answer.",
        concept: "Permutations with repetition: 4^{10}.",
        formula: "\\text{Answer Keys} = n^r = 4^{10}",
        reasoning: "Question 1 has 4 choices, Question 2 has 4 choices, ..., up to Question 10.",
        substitution: "n = 4, r = 10 \\implies 4^{10}",
        calculation: [
          "4^{10} = (2^2)^{10} = 2^{20}",
          "2^{10} = 1,024",
          "2^{20} = 1,024 \\times 1,024 = 1,048,576"
        ],
        finalAnswer: "1,048,576 answer keys",
        interpretation: "A student guessing blindly on all 10 questions has a 1 in 1,048,576 chance of scoring 100%.",
        verification: "1,024^2 = 1,048,576. Verified."
      }
    ],
    realLifeApplications: [
      "Cybersecurity: Calculating password search spaces and brute-force time estimates.",
      "IP Networking: Subnet mask allocations and address pools in IPv4 (2^{32}) and IPv6 (2^{128}).",
      "Digital Audio & Video: Calculating color bit depths (e.g. 24-bit TrueColor = 2^{24} = 16.7 million colors).",
      "Genomics: Modeling protein sequences built from 20 standard amino acids (20^L)."
    ],
    commonMistakes: [
      {
        mistake: "Inverting the base and exponent (writing r^n instead of n^r).",
        correction: "Identify which object is making the choice. Base n = choices available; Exponent r = number of choices being made.",
        why: "If 4 people enter an elevator with 7 floors, each person chooses a floor: 7^4, NOT 4^7."
      },
      {
        mistake: "Forgetting to account for constraints on leading digits.",
        correction: "If the first digit cannot be zero (e.g. an authentic integer), treat slot 1 with n - 1 choices and remaining slots with n choices.",
        why: "Leading zero restrictions reduce the choice pool for the most significant position."
      }
    ],
    summary:
      "When order matters and repetition is allowed, every position independently has n options. Total sequences = n^r, where n is the number of options and r is the sequence length."
  },
  {
    id: "comb_rep",
    title: "Combinations With Repetition Allowed (Stars & Bars)",
    shortCode: "n+r-1Cr",
    formulaDisplay: "\\binom{n + r - 1}{r} = \\frac{(n + r - 1)!}{r!(n - 1)!}",
    formalDefinition:
      "A combination with repetition (also known as a multiset coefficient or multichoose) represents the number of ways to select an unordered collection of r items from n distinct item types, where items of any type may be selected multiple times. Formally, it counts the number of non-negative integer solutions to the Diophantine equation x_1 + x_2 + \\cdots + x_n = r, where x_i \\ge 0 represents the count of items selected of type i.",
    explanationParagraphs: [
      "Consider walking into an ice-cream parlour offering n = 5 distinct flavours. You want to purchase a bowl containing r = 3 scoops. You do not care in what order the scoops are scooped into the bowl; only the final contents matter. Crucially, you are permitted to select 3 scoops of all Chocolate, or 2 Vanilla and 1 Mint, or 3 distinct flavours. This cannot be solved by ordinary combinations \\binom{5}{3} because you are allowed to repeat flavours.",
      "To solve this problem, combinatorics uses the ingenious 'Stars and Bars' method (credited to William Feller). Imagine representing the r selected items as r identical stars (★). To partition these r stars into n distinct flavour bins, we need n - 1 dividers or bars (|). For example, with n = 3 types (A, B, C) and r = 5 scoops, the string ★★ | ★ | ★★ represents 2 scoops of A, 1 scoop of B, and 2 scoops of C.",
      "Every unique choice of flavours corresponds to a unique sequence composed of exactly r stars and n - 1 bars. The total number of symbols in this sequence is r + (n - 1) = n + r - 1. To determine the layout of the sequence, we simply need to choose which r positions out of the total n + r - 1 positions will be occupied by stars (the remaining positions will automatically be bars).",
      "Thus, by basic combinations, the number of ways to place r stars in n + r - 1 positions is given by \\binom{n + r - 1}{r} = \\binom{n + r - 1}{n - 1} = \\frac{(n + r - 1)!}{r!(n - 1)!}. This magnificent formula unifies identical item distribution, polynomial term counting, and multiset selection."
    ],
    whyUseful: [
      "Counts the number of terms in homogeneous polynomials of degree r in n variables.",
      "Distributes r identical resources (tokens, memory packets) among n distinct recipients or threads.",
      "Determines non-negative integer solutions to linear Diophantine equations.",
      "Underpins Bose-Einstein statistics in quantum physics (distribution of indistinguishable bosons into energy states)."
    ],
    whenToApply: [
      "When selecting r items from n categories where order does not matter and categories can be picked multiple times.",
      "When distributing r IDENTICAL objects into n DISTINCT bins or containers.",
      "When finding the number of non-negative integer solutions to x_1 + x_2 + \\dots + x_n = r."
    ],
    symbolExplanations: [
      { symbol: "n", meaning: "Number of distinct categories, types, or bins." },
      { symbol: "r", meaning: "Total number of items being selected or distributed." },
      { symbol: "n - 1", meaning: "Number of dividers (bars) needed to separate the n bins." },
      { symbol: "n + r - 1", meaning: "Total number of slots containing both items (stars) and dividers (bars)." },
      { symbol: "\\binom{n + r - 1}{r}", meaning: "Multiset coefficient / Stars & Bars formula." }
    ],
    derivation: {
      heading: "Derivation via Stars and Bars Theorem",
      steps: [
        "Step 1: Let the count of items selected of type i be denoted by x_i. Then x_1 + x_2 + \\dots + x_n = r with x_i \\ge 0.",
        "Step 2: Represent the r selected items as r identical stars: ★ ★ ★ ... ★.",
        "Step 3: To partition these stars into n labeled groups, we place n - 1 separator bars | between and around them.",
        "Step 4: The total number of characters in the star-and-bar string is r stars + (n - 1) bars = n + r - 1 characters.",
        "Step 5: Any valid selection corresponds to choosing r positions for stars out of the n + r - 1 available positions.",
        "Step 6: By combination definition: Number of ways = \\binom{n + r - 1}{r} = \\frac{(n + r - 1)!}{r!(n - 1)!}."
      ]
    },
    assumptionsAndRestrictions: [
      "The r items being selected or distributed are INDISTINGUISHABLE (identical).",
      "The n categories or recipients are DISTINGUISHABLE (distinct).",
      "Variables x_i \\ge 0 (bins can be empty). If x_i \\ge 1 is required, substitute y_i = x_i - 1 to reduce to \\binom{r - 1}{n - 1}."
    ],
    workedExamples: [
      {
        id: "comb_rep_ex_1",
        title: "Selecting Ice-Cream Scoops with Repetition",
        problem: "An ice-cream shop offers 5 flavours: Chocolate, Vanilla, Strawberry, Mango, and Pistachio. A customer orders a bowl containing 3 scoops. The order of scoops does not matter, and flavours may be repeated. How many different combinations of scoops can be ordered?",
        given: "Flavours n = 5. Scoops to choose r = 3. Repetition allowed. Order does not matter.",
        concept: "Combinations with repetition allowed (Stars & Bars).",
        formula: "\\binom{n + r - 1}{r} = \\frac{(n + r - 1)!}{r!(n - 1)!}",
        reasoning: "We are selecting 3 items from 5 distinct types where multiple scoops of the same flavour are allowed, and order does not matter.",
        substitution: "n = 5, r = 3 \\implies \\binom{5 + 3 - 1}{3} = \\binom{7}{3}",
        calculation: [
          "n + r - 1 = 5 + 3 - 1 = 7",
          "\\binom{7}{3} = \\frac{7!}{3!(7 - 3)!} = \\frac{7!}{3!4!}",
          "\\frac{7 \\times 6 \\times 5}{3 \\times 2 \\times 1}",
          "3 \\times 2 \\times 1 = 6 cancels with 6 in numerator",
          "Remaining product: 7 \\times 5 = 35"
        ],
        finalAnswer: "35 distinct scoop combinations",
        interpretation: "There are 35 distinct flavour combinations (ranging from all 3 same flavour to all 3 different).",
        verification: "Categorize: All 3 same: \\binom{5}{1} = 5. 2 of one + 1 of another: \\binom{5}{1} \\times \\binom{4}{1} = 20. All 3 different: \\binom{5}{3} = 10. Total = 5 + 20 + 10 = 35. Exact."
      },
      {
        id: "comb_rep_ex_2",
        title: "Non-Negative Integer Solutions to a Linear Equation",
        problem: "Find the number of non-negative integer solutions to the equation: x_1 + x_2 + x_3 + x_4 = 10, where x_i \\ge 0 for each i \\in {1, 2, 3, 4}.",
        given: "Equation x_1 + x_2 + x_3 + x_4 = 10 with n = 4 variables and sum r = 10, with x_i \\ge 0.",
        concept: "Stars and Bars theorem for non-negative integer solutions.",
        formula: "\\binom{n + r - 1}{r} = \\binom{n + r - 1}{n - 1}",
        reasoning: "Distributing sum 10 among 4 variables is equivalent to distributing 10 identical units among 4 distinct recipients using 4 - 1 = 3 bars.",
        substitution: "n = 4, r = 10 \\implies \\binom{4 + 10 - 1}{10} = \\binom{13}{10} = \\binom{13}{3}",
        calculation: [
          "\\binom{13}{3} = \\frac{13 \\times 12 \\times 11}{3 \\times 2 \\times 1}",
          "3 \\times 2 = 6, and 12 / 6 = 2",
          "Product: 13 \\times 2 \\times 11 = 26 \\times 11",
          "26 \\times 11 = 286"
        ],
        finalAnswer: "286 non-negative solutions",
        interpretation: "There are 286 ordered quadruples (x_1, x_2, x_3, x_4) of non-negative integers that sum to 10.",
        verification: "\\binom{13}{10} = 13! / (10! \\times 3!) = (13 \\times 12 \\times 11) / 6 = 286. Confirmed."
      },
      {
        id: "comb_rep_ex_3",
        title: "Distributing Identical Candies with Positive Integer Constraint",
        problem: "In how many ways can 12 identical candies be distributed among 4 children such that each child receives AT LEAST 1 candy?",
        given: "Candies r = 12 (identical). Children n = 4 (distinct). Condition: x_i \\ge 1 for each child.",
        concept: "Stars and Bars with strictly positive integer constraints.",
        formula: "\\binom{r - 1}{n - 1}",
        reasoning: "Give 1 candy to each child first (using up 4 candies). Now 12 - 4 = 8 candies remain to be distributed freely with x_i' \\ge 0 among the 4 children: \\binom{4 + 8 - 1}{8} = \\binom{11}{8} = \\binom{11}{3}.",
        substitution: "r' = 8, n = 4 \\implies \\binom{12 - 1}{4 - 1} = \\binom{11}{3}",
        calculation: [
          "\\binom{11}{3} = \\frac{11 \\times 10 \\times 9}{3 \\times 2 \\times 1}",
          "9 / 3 = 3; 10 / 2 = 5",
          "Product: 11 \\times 5 \\times 3 = 11 \\times 15 = 165"
        ],
        finalAnswer: "165 ways",
        interpretation: "There are 165 fair distributions guaranteeing every child gets at least one candy.",
        verification: "Equivalent to placing 3 dividers into the 11 spaces between 12 stars: \\binom{11}{3} = 165. Matches."
      },
      {
        id: "comb_rep_ex_4",
        title: "Counting Terms in a Multinomial Expansion",
        problem: "How many distinct terms are there in the algebraic expansion of (a + b + c + d)^6 after combining like terms?",
        given: "Variables n = 4 ({a, b, c, d}). Power r = 6.",
        concept: "Number of terms in multinomial expansion equals non-negative solutions to powers summing to r.",
        formula: "\\text{Terms} = \\binom{n + r - 1}{r}",
        reasoning: "Each term has the form a^{k_1} b^{k_2} c^{k_3} d^{k_4} where k_1 + k_2 + k_3 + k_4 = 6 with k_i \\ge 0.",
        substitution: "n = 4, r = 6 \\implies \\binom{4 + 6 - 1}{6} = \\binom{9}{6} = \\binom{9}{3}",
        calculation: [
          "\\binom{9}{3} = \\frac{9 \\times 8 \\times 7}{3 \\times 2 \\times 1}",
          "9 / 3 = 3; 8 / 2 = 4",
          "Product: 3 \\times 4 \\times 7 = 12 \\times 7 = 84"
        ],
        finalAnswer: "84 distinct terms",
        interpretation: "The expansion of (a + b + c + d)^6 contains exactly 84 unique variable monomials.",
        verification: "For n=2 (binomial), \\binom{2+6-1}{6} = \\binom{7}{6} = 7 terms, matching standard (a+b)^6 having 7 terms. Formula holds."
      },
      {
        id: "comb_rep_ex_5",
        title: "Purchasing Donuts from 6 Varieties",
        problem: "A bakery sells 6 varieties of donuts. A customer wants to buy a box of a dozen (12) donuts. In how many different ways can the box be filled?",
        given: "Varieties n = 6. Dozen r = 12. Repetition allowed. Order in box is irrelevant.",
        concept: "Combinations with repetition: \\binom{n+r-1}{r}.",
        formula: "\\binom{n + r - 1}{r} = \\binom{6 + 12 - 1}{12} = \\binom{17}{12} = \\binom{17}{5}",
        reasoning: "We are choosing 12 donuts from 6 varieties where repetition is unrestricted and order does not matter.",
        substitution: "\\binom{17}{5} = \\frac{17 \\times 16 \\times 15 \\times 14 \\times 13}{5 \\times 4 \\times 3 \\times 2 \\times 1}",
        calculation: [
          "5 \\times 3 = 15 cancels with 15",
          "4 \\times 2 = 8, and 16 / 8 = 2",
          "Remaining product: 17 \\times 2 \\times 14 \\times 13",
          "17 \\times 2 = 34",
          "14 \\times 13 = 182",
          "34 \\times 182 = 6,188"
        ],
        finalAnswer: "6,188 different donut boxes",
        interpretation: "There are 6,188 distinct flavour configurations to fill the dozen box.",
        verification: "17! / (12! \\times 5!) = (17 \\times 16 \\times 15 \\times 14 \\times 13) / 120 = 742,560 / 120 = 6,188. Exact."
      },
      {
        id: "comb_rep_ex_6",
        title: "Distributing Identical Computational Tasks to CPU Servers",
        problem: "An operating system dispatcher needs to distribute 7 identical compute threads among 3 server cores. Any core may receive zero or more threads. How many thread distribution configurations exist?",
        given: "Identical threads r = 7. Distinct server cores n = 3. Any core can receive 0 to 7 threads.",
        concept: "Stars and bars: distributing r identical items to n distinct bins.",
        formula: "\\binom{n + r - 1}{r} = \\binom{3 + 7 - 1}{7} = \\binom{9}{7} = \\binom{9}{2}",
        reasoning: "Threads are identical (stars), cores are distinct (bins separated by 2 bars).",
        substitution: "\\binom{9}{2} = \\frac{9 \\times 8}{2 \\times 1}",
        calculation: [
          "9 \\times 8 = 72",
          "72 / 2 = 36"
        ],
        finalAnswer: "36 configurations",
        interpretation: "There are 36 ways the scheduler can allocate the workload across the 3 cores.",
        verification: "Manual check: (7,0,0) permutations: 3. (6,1,0): 6. (5,2,0): 6. (5,1,1): 3. (4,3,0): 6. (4,2,1): 6. (3,3,1): 3. (3,2,2): 3. Sum = 3+6+6+3+6+6+3+3 = 36. Exact match!"
      },
      {
        id: "comb_rep_ex_7",
        title: "Upper Bound Constraint on One Variable",
        problem: "Find the number of non-negative integer solutions to x_1 + x_2 + x_3 = 8 where x_1 \\le 3.",
        given: "Equation x_1 + x_2 + x_3 = 8 with x_1, x_2, x_3 \\ge 0 and constraint x_1 \\le 3.",
        concept: "Complementary counting with Stars and Bars.",
        formula: "N(x_1 \\le 3) = N(\\text{Total}) - N(x_1 \\ge 4)",
        reasoning: "The complement of x_1 \\le 3 is x_1 \\ge 4. To count solutions with x_1 \\ge 4, let x_1 = y_1 + 4 where y_1 \\ge 0. Then y_1 + x_2 + x_3 = 8 - 4 = 4.",
        substitution: "\\binom{3 + 8 - 1}{8} - \\binom{3 + 4 - 1}{4} = \\binom{10}{8} - \\binom{6}{4}",
        calculation: [
          "Total unrestricted solutions: \\binom{10}{2} = \\frac{10 \\times 9}{2} = 45",
          "Solutions with x_1 \\ge 4: \\binom{6}{2} = \\frac{6 \\times 5}{2} = 15",
          "Subtract: 45 - 15 = 30"
        ],
        finalAnswer: "30 solutions",
        interpretation: "There are 30 integer solutions where the first variable does not exceed 3.",
        verification: "Direct sum for x_1 = 0, 1, 2, 3: For x_1=k, x_2+x_3 = 8-k has (9-k) solutions. Sum: 9 + 8 + 7 + 6 = 30. Matches perfectly."
      }
    ],
    realLifeApplications: [
      "Inventory Management: Selecting product restock bundles across product lines.",
      "Statistical Physics: Bose-Einstein distribution of identical photons or atoms into energy levels.",
      "Game Design: Rolling r identical dice and counting possible outcome multisets.",
      "Resource Allocation: Cloud computing container CPU share allocation."
    ],
    commonMistakes: [
      {
        mistake: "Confusing identical items with distinct items.",
        correction: "If the items being distributed are identical, use Stars & Bars \\binom{n+r-1}{r}. If the items are distinct, use n^r.",
        why: "Identical items have no internal ordering among themselves."
      },
      {
        mistake: "Using \\binom{n+r-1}{r} when each category must have at least one item without adjusting r.",
        correction: "Pre-allocate 1 item to each of the n categories first, leaving r - n items to distribute: \\binom{r-1}{n-1}.",
        why: "The standard formula assumes x_i \\ge 0 (empty categories allowed)."
      }
    ],
    summary:
      "Combinations with repetition select r items from n types where order is ignored and types may repeat. Solved via Stars & Bars: \\binom{n+r-1}{r} = \\frac{(n+r-1)!}{r!(n-1)!}."
  },
  {
    id: "circular_perm",
    title: "Circular Permutations",
    shortCode: "(n-1)!",
    formulaDisplay: "P_{\\text{circular}} = (n - 1)! \\quad \\text{or} \\quad \\frac{(n - 1)!}{2} \\text{ (if flip-symmetric)}",
    formalDefinition:
      "A circular permutation is an arrangement of distinct objects along a closed circle where positions are distinguished solely by the relative cyclical order of the elements. Rotational shifts of the entire circle do not produce distinct arrangements. For n distinct objects on a fixed planar circle, the total number of unique circular arrangements is (n - 1)!. If the circle can be flipped over in three-dimensional space (such as a necklace or keychain), clockwise and counter-clockwise arrangements become indistinguishable, reducing the count to \\frac{(n - 1)!}{2}.",
    explanationParagraphs: [
      "When people sit in a straight line, the leftmost seat is uniquely distinguished from the second seat, third seat, and rightmost seat. Shifting everyone one position to the right creates a completely new arrangement because someone now sits at the end. However, around a round table with no designated 'head of the table', shifting every person one seat clockwise leaves everyone with the exact same neighbours to their left and right.",
      "In a circle of n chairs, any specific arrangement can be rotated into n equivalent configurations without changing who sits next to whom. Therefore, each circular arrangement is counted n times in the standard linear factorial count n!. To eliminate this rotational redundancy, we divide by the group size of rotations: \\frac{n!}{n} = (n - 1)!.",
      "Another intuitive way to derive this formula is the 'Reference Anchor Method'. Because a blank circular table has no absolute starting point, the first person to sit down has no choices—no matter where they sit, their seat is identical by rotational symmetry. We fix this first person in place as an anchor. Once this reference anchor is established, the remaining n - 1 seats become distinct relative to the anchor (e.g., 'to the anchor's immediate left', 'two seats to the right'). These n - 1 remaining seats can then be filled in (n - 1)! standard linear ways.",
      "A critical engineering distinction must be made between circular arrangements that can be FLIPPED OVER (like beads on a necklace, keys on a keyring, or printed circuit ring traces) and those that CANNOT BE FLIPPED (people seated at a round table on the floor). If flipping the ring turns a clockwise sequence into a counter-clockwise sequence, then clockwise and counter-clockwise are identical, and we divide by an extra factor of 2: \\frac{(n - 1)!}{2}."
    ],
    whyUseful: [
      "Models ring-topology networks (Token Ring, SONET rings) where node sequence matters but rotation is invariant.",
      "Designs circular conference seating, banquet tables, and round-robin tournament schedules.",
      "Analyzes circular DNA plasmids and cyclic hydrocarbon chemical structures.",
      "Solves combinatorial games and rotational puzzle rings."
    ],
    whenToApply: [
      "When objects are arranged in a closed loop or circle.",
      "When rotating the entire circle preserves equivalence.",
      "Determine if flipping is possible (divide by 2 if clockwise equals counter-clockwise)."
    ],
    symbolExplanations: [
      { symbol: "n", meaning: "Total number of distinct objects arranged around the circle." },
      { symbol: "(n - 1)!", meaning: "Number of arrangements when clockwise and counter-clockwise are distinct." },
      { symbol: "\\frac{(n - 1)!}{2}", meaning: "Arrangements when the loop can be flipped over (necklaces, keyrings)." }
    ],
    derivation: {
      heading: "Derivation via Rotational Equivalence & Reference Anchor",
      steps: [
        "Method 1: Rotational Group Equivalence",
        "Step 1: If the n seats were arranged in a straight line, there would be n! linear arrangements.",
        "Step 2: On a circle, each arrangement has n rotational equivalents: rotating the entire table by 1, 2, ..., n-1 positions.",
        "Step 3: All n rotations represent the same circular arrangement.",
        "Step 4: Total circular arrangements = \\frac{n!}{n} = \\frac{n \\times (n - 1)!}{n} = (n - 1)!.",
        "Method 2: Reference Anchor Method",
        "Step 5: Seat person 1 anywhere on the blank circle. There is only 1 unique choice because all empty chairs are rotationally identical.",
        "Step 6: With person 1 fixed, the remaining n - 1 seats now possess unique relative coordinates.",
        "Step 7: Arrange the remaining n - 1 people in (n - 1)! linear ways. Total = 1 \\times (n - 1)! = (n - 1)!."
      ]
    },
    assumptionsAndRestrictions: [
      "The circle has no designated 'head of table' or fixed landmark (e.g., sitting near a window breaks circular symmetry, converting it into a linear permutation n!).",
      "All objects are distinct.",
      "Check whether clockwise vs counter-clockwise orientations are distinguishable."
    ],
    workedExamples: [
      {
        id: "circ_ex_1",
        title: "Diplomatic Banquet Seating at a Round Table",
        problem: "In how many ways can 6 foreign delegates be seated around a circular conference table with identical chairs?",
        given: "Number of delegates n = 6. Round table with indistinguishable chairs. Rotations are equivalent.",
        concept: "Circular permutation of n distinct objects (non-flippable).",
        formula: "P_{\\text{circular}} = (n - 1)!",
        reasoning: "Seating at a table cannot be flipped over, but rotating everyone by any number of seats preserves relative neighbours.",
        substitution: "n = 6 \\implies (6 - 1)! = 5!",
        calculation: [
          "5! = 5 \\times 4 \\times 3 \\times 2 \\times 1",
          "5 \\times 4 = 20",
          "20 \\times 3 = 60",
          "60 \\times 2 = 120",
          "120 \\times 1 = 120"
        ],
        finalAnswer: "120 seating arrangements",
        interpretation: "There are 120 distinct neighbour-relation configurations for the 6 delegates.",
        verification: "Linear arrangements = 6! = 720. Dividing by 6 rotational symmetries: 720 / 6 = 120. Exact."
      },
      {
        id: "circ_ex_2",
        title: "Beads Strung on a Circular Necklace",
        problem: "In how many ways can 7 distinct coloured glass beads be strung together to make a circular necklace?",
        given: "Number of distinct beads n = 7. Necklace can be turned over (flipped in 3D).",
        concept: "Flippable circular permutation (clockwise and counter-clockwise are equivalent).",
        formula: "P = \\frac{(n - 1)!}{2}",
        reasoning: "A necklace can be picked up and viewed from the reverse side. Looking at a clockwise arrangement from behind makes it look counter-clockwise.",
        substitution: "n = 7 \\implies \\frac{(7 - 1)!}{2} = \\frac{6!}{2}",
        calculation: [
          "6! = 720",
          "Divide by 2: \\frac{720}{2} = 360"
        ],
        finalAnswer: "360 distinct necklaces",
        interpretation: "There are 360 physical necklace patterns when taking 3D flipping into account.",
        verification: "7! linear / (7 rotations \\times 2 reflections) = 5,040 / 14 = 360. Verified."
      },
      {
        id: "circ_ex_3",
        title: "Round Table Seating with Two People Always Together",
        problem: "Eight board members, including the Chairperson and CEO, are seated at a circular meeting table. In how many ways can they be seated if the Chairperson and the CEO must ALWAYS sit next to each other?",
        given: "Total members n = 8. Restriction: Chairperson (C) and CEO must sit together.",
        concept: "Tie/Block method applied within circular permutations.",
        formula: "P = (m - 1)! \\times 2! \\text{ where } m = n - 1",
        reasoning: "Group Chairperson and CEO into a single super-member [C, CEO]. There are now 8 - 2 + 1 = 7 super-members around the circular table. Arrange them circularly in (7 - 1)! = 6! ways. Then, Chairperson and CEO can switch places in 2! ways.",
        substitution: "(7 - 1)! \\times 2! = 6! \\times 2",
        calculation: [
          "6! = 720",
          "Internal arrangements of block = 2! = 2",
          "Total ways = 720 \\times 2 = 1,440"
        ],
        finalAnswer: "1,440 seating arrangements",
        interpretation: "Out of all (8-1)! = 5,040 total circular seatings, 1,440 keep the two executives side-by-side.",
        verification: "Complement check: Total (5,040) - Together (1,440) = 3,600 seatings where they are separated. Confirmed."
      },
      {
        id: "circ_ex_4",
        title: "Round Table Seating with Alternating Genders",
        problem: "Five men and five women sit at a circular dining table. In how many ways can they be seated such that men and women alternate seats?",
        given: "5 men, 5 women. Circular table with 10 seats. Strict alternation (M-W-M-W...).",
        concept: "Circular permutation of first group followed by linear permutation of second group.",
        formula: "P = (n_m - 1)! \\times n_w!",
        reasoning: "First, seat the 5 men around the circle to establish relative reference positions. There are (5 - 1)! = 4! ways to do this. This creates 5 distinct empty chairs between the men. The 5 women are then seated in these 5 distinct gaps in 5! (linear) ways (since the chairs are now distinguished by the specific men sitting adjacent to them).",
        substitution: "(5 - 1)! \\times 5! = 4! \\times 5!",
        calculation: [
          "4! = 24",
          "5! = 120",
          "24 \\times 120 = 2,880"
        ],
        finalAnswer: "2,880 arrangements",
        interpretation: "There are 2,880 circular seatings with strict alternation.",
        verification: "Notice that we do NOT multiply by 2 (unlike linear alternation) because rotating the entire table by one seat is already accounted for by the circular nature of the initial seating."
      },
      {
        id: "circ_ex_5",
        title: "Circular Seating with Two People Never Adjacent",
        problem: "In how many ways can 7 people sit around a circular table such that two particular people, A and B, NEVER sit next to each other?",
        given: "Total people n = 7. Restriction: A and B must not be adjacent.",
        concept: "Complementary counting in circular permutations.",
        formula: "N(\\text{Not together}) = (n - 1)! - ((n - 2)! \\times 2!)",
        reasoning: "Calculate total unrestricted circular arrangements of 7 people, then subtract the circular arrangements where A and B sit together as a pair.",
        substitution: "(7 - 1)! - ((6 - 1)! \\times 2!) = 6! - (5! \\times 2)",
        calculation: [
          "Total circular arrangements: (7 - 1)! = 6! = 720",
          "Arrangements where A and B are together: (6 - 1)! \\times 2! = 5! \\times 2 = 120 \\times 2 = 240",
          "Subtract together cases from total: 720 - 240 = 480"
        ],
        finalAnswer: "480 arrangements",
        interpretation: "In 480 circular configurations, A and B are safely separated by at least one person.",
        verification: "Gap method: Seat 5 others circularly in (5-1)! = 24 ways. They create 5 gaps. Choose 2 distinct gaps for A and B in {}^5P_2 = 20 ways. Total = 24 \\times 20 = 480. Matches perfectly."
      },
      {
        id: "circ_ex_6",
        title: "Circular Permutation with a Designated 'Head of Table'",
        problem: "A round table has 6 chairs, but one chair is uniquely painted Gold and designated as the 'Head of Table'. In how many ways can 6 guests be seated?",
        given: "6 chairs in a circle. One chair is distinctly marked (Gold). 6 distinct guests.",
        concept: "Breaking circular symmetry converts circular permutations to linear permutations.",
        formula: "P = n!",
        reasoning: "Because one seat is distinctly marked, the rotational symmetry of the circle is broken. Every seat can now be uniquely identified by its distance clockwise from the Gold chair (e.g. '1 seat clockwise from Gold', '2 seats clockwise', etc.). Thus, this becomes a standard linear permutation.",
        substitution: "n = 6 \\implies 6!",
        calculation: [
          "6! = 6 \\times 5 \\times 4 \\times 3 \\times 2 \\times 1 = 720"
        ],
        finalAnswer: "720 arrangements",
        interpretation: "Adding a fixed landmark or distinguishing mark converts the circular problem into a linear one.",
        verification: "Gold chair has 6 choices of guest; remaining 5 chairs have 5! choices: 6 \\times 120 = 720. Exactly 6!."
      },
      {
        id: "circ_ex_7",
        title: "Keys on a Keyring with a Fixed Divider Tag",
        problem: "In how many ways can 5 distinct keys be arranged on a circular keyring that has NO tag or divider?",
        given: "5 distinct keys. Circular keyring without tag. Ring can be flipped over in 3D space.",
        concept: "Flippable circular permutation: \\frac{(n-1)!}{2}.",
        formula: "\\text{Arrangements} = \\frac{(n - 1)!}{2}",
        reasoning: "A keyring can be rotated freely, and it can be flipped over front-to-back, making clockwise and counter-clockwise arrangements identical.",
        substitution: "n = 5 \\implies \\frac{(5 - 1)!}{2} = \\frac{4!}{2}",
        calculation: [
          "4! = 24",
          "24 / 2 = 12"
        ],
        finalAnswer: "12 distinct keyring arrangements",
        interpretation: "There are 12 geometrically distinct ways to arrange the 5 keys on the ring.",
        verification: "5! / (5 \\times 2) = 120 / 10 = 12. Verified."
      }
    ],
    realLifeApplications: [
      "Network Engineering: Token Ring protocols and cyclic redundancy code routing.",
      "Industrial Robotics: Workstations arranged circularly around a central articulated robotic arm.",
      "Biochemistry: Modeling base-pair sequences in cyclic plasmids and circular DNA.",
      "Event Planning: Seating VIP guests at round banquet tables to avoid hierarchy."
    ],
    commonMistakes: [
      {
        mistake: "Using (n - 1)! for necklaces and keyrings instead of \\frac{(n - 1)!}{2}.",
        correction: "Always check if the object can be viewed from both sides (flipped in 3D). If so, divide by 2.",
        why: "Flipping turns clockwise into counter-clockwise, making both orientations identical."
      },
      {
        mistake: "Dividing by n when a fixed landmark exists (e.g. a chair near the stage).",
        correction: "Any unique landmark breaks rotational invariance, converting the count back to n!.",
        why: "Relative positions become absolute when anchored to an external landmark."
      }
    ],
    summary:
      "Circular permutations eliminate rotational redundancy: (n - 1)! for fixed planar circles (round tables) and \\frac{(n - 1)!}{2} for objects that can be flipped over (necklaces, keyrings)."
  },
  {
    id: "identical_objects",
    title: "Permutations of Objects With Identical Items",
    shortCode: "n! / (n1!n2!...)",
    formulaDisplay: "\\text{Arrangements} = \\frac{n!}{n_1! \\times n_2! \\times \\cdots \\times n_k!}",
    formalDefinition:
      "When arranging a multiset of n total objects in a linear sequence where there are k distinct types of objects, and the i-th type contains n_i indistinguishable (identical) copies such that \\sum_{i=1}^k n_i = n, the total number of distinct arrangements is given by the multinomial coefficient \\binom{n}{n_1, n_2, \\dots, n_k} = \\frac{n!}{n_1! n_2! \\cdots n_k!}.",
    explanationParagraphs: [
      "In standard permutations, we assume every single object is distinct. But what happens if some objects are identical? Consider the word 'CAT'. All 3 letters are distinct, giving 3! = 6 unique arrangements: CAT, CTA, ACT, ATC, TCA, TAC. Now consider the word 'MOM'. There are two M's. If we artificially label them as M_1 and M_2, the arrangements M_1 O M_2 and M_2 O M_1 look completely identical to the naked eye as 'MOM'.",
      "Because the two M's cannot be distinguished, treating them as distinct overcounts the real arrangements by a factor of 2! (the internal permutations of the M's). Therefore, the true number of distinct arrangements of MOM is \\frac{3!}{2!} = \\frac{6}{2} = 3 (namely: MOM, MMO, OMM).",
      "Generalizing to n total objects with n_1 identical items of type 1, n_2 identical items of type 2, and so on up to n_k identical items of type k: if all items were distinct, there would be n! arrangements. However, permuting the n_1 identical items amongst their positions changes nothing (n_1! redundant arrangements). Permuting the n_2 identical items amongst themselves changes nothing (n_2! redundant arrangements). By the Rule of Product, the total overcounting factor is n_1! \\times n_2! \\times \\cdots \\times n_k!.",
      "Dividing the unconstrained factorial n! by this cumulative product of internal factorials eliminates all identical duplicates: \\frac{n!}{n_1! n_2! \\dots n_k!}. This formula is the celebrated Multinomial Coefficient, essential for anagram analysis, grid-walking path combinatorics, and multinomial probability distributions."
    ],
    whyUseful: [
      "Solves word anagram and anagram-generation problems across linguistic computing.",
      "Calculates the number of lattice paths from (0,0) to (x,y) in grid walking algorithms: \\frac{(x+y)!}{x!y!}.",
      "Underpins the Multinomial Probability Distribution in statistical modeling.",
      "Calculates microstates in statistical thermodynamics for particles in energy bins."
    ],
    whenToApply: [
      "When arranging all n items in a line, but some items are identical copies of each other.",
      "When letters of a word repeat (e.g. MISSISSIPPI, BANANA, SUCCESS).",
      "When counting routes on a Manhattan grid (steps East and North)."
    ],
    symbolExplanations: [
      { symbol: "n", meaning: "Total number of items to arrange (n = n_1 + n_2 + \\dots + n_k)." },
      { symbol: "n_i", meaning: "Multiplicity (frequency of appearance) of the i-th distinct item type." },
      { symbol: "n_i!", meaning: "Internal permutation factor for the i-th duplicate group that must be divided out." },
      { symbol: "\\frac{n!}{n_1! n_2! \\cdots n_k!}", meaning: "Multinomial coefficient counting distinct permutations of a multiset." }
    ],
    derivation: {
      heading: "Derivation via Successive Subsets (Combinations)",
      steps: [
        "Step 1: Consider a line of n empty slots.",
        "Step 2: Choose n_1 slots out of the n available slots to place the identical items of type 1: \\binom{n}{n_1} ways.",
        "Step 3: From the remaining n - n_1 slots, choose n_2 slots to place identical items of type 2: \\binom{n - n_1}{n_2} ways.",
        "Step 4: Continue this process for all k types.",
        "Step 5: Multiply all choices together:",
        "\\frac{n!}{n_1!(n-n_1)!} \\times \\frac{(n-n_1)!}{n_2!(n-n_1-n_2)!} \\times \\cdots \\times \\frac{n_k!}{n_k!0!}.",
        "Step 6: All intermediate factorial terms cancel out telescopically in the denominators and numerators!",
        "Step 7: Final result: \\frac{n!}{n_1! n_2! \\dots n_k!}."
      ]
    },
    assumptionsAndRestrictions: [
      "Items within the same type are completely indistinguishable from each other.",
      "The sum of all multiplicities must strictly equal the total item count: \\sum_{i=1}^k n_i = n.",
      "Order of positions matters in the final output string."
    ],
    workedExamples: [
      {
        id: "ident_ex_1",
        title: "Arranging Letters of the Word BANANA",
        problem: "Find the total number of distinct linear permutations that can be formed using all the letters of the word 'BANANA'.",
        given: "Word: BANANA. Total letters n = 6. Letter counts: B = 1, A = 3, N = 2. Total = 1 + 3 + 2 = 6.",
        concept: "Permutations of objects with identical items (multinomial coefficient).",
        formula: "\\text{Arrangements} = \\frac{n!}{n_B! \\times n_A! \\times n_N!}",
        reasoning: "If all 6 letters were distinct, there would be 6! arrangements. We must divide by 3! to correct for the three identical A's, and by 2! to correct for the two identical N's.",
        substitution: "\\frac{6!}{1! \\times 3! \\times 2!} = \\frac{6!}{3! \\times 2!}",
        calculation: [
          "6! = 720",
          "3! = 6",
          "2! = 2",
          "Denominator = 3! \\times 2! = 6 \\times 2 = 12",
          "Divide 720 by 12: \\frac{720}{12} = 60"
        ],
        finalAnswer: "60 distinct arrangements",
        interpretation: "There are exactly 60 distinct words (pronounceable or not) that can be constructed using all letters of BANANA.",
        verification: "Direct calculation: (6 \\times 5 \\times 4 \\times 3!) / (3! \\times 2) = (120) / 2 = 60. Matches reference value."
      },
      {
        id: "ident_ex_2",
        title: "Arranging Letters of the Word MISSISSIPPI",
        problem: "In how many distinct ways can all the letters of the word 'MISSISSIPPI' be arranged in a line?",
        given: "Word: MISSISSIPPI. Total letters n = 11. Multiplicities: M = 1, I = 4, S = 4, P = 2. Total: 1 + 4 + 4 + 2 = 11.",
        concept: "Multinomial permutation formula with multiple high multiplicities.",
        formula: "\\frac{n!}{n_M! \\times n_I! \\times n_S! \\times n_P!}",
        reasoning: "Divide total 11! by the factorials of the repeated letters (4 I's, 4 S's, 2 P's).",
        substitution: "\\frac{11!}{1! \\times 4! \\times 4! \\times 2!} = \\frac{11!}{4! \\times 4! \\times 2!}",
        calculation: [
          "Expand 11! down to 4!: \\frac{11 \\times 10 \\times 9 \\times 8 \\times 7 \\times 6 \\times 5 \\times 4!}{4! \\times (24) \\times (2)}",
          "Cancel 4!: \\frac{11 \\times 10 \\times 9 \\times 8 \\times 7 \\times 6 \\times 5}{24 \\times 2}",
          "Denominator = 48",
          "Numerator: 8 \\times 6 = 48, which cancels perfectly with 48 in the denominator!",
          "Remaining product: 11 \\times 10 \\times 9 \\times 7 \\times 5",
          "11 \\times 10 = 110",
          "9 \\times 7 = 63",
          "63 \\times 5 = 315",
          "110 \\times 315 = 34,650"
        ],
        finalAnswer: "34,650 distinct arrangements",
        interpretation: "There are 34,650 unique anagrams of MISSISSIPPI.",
        verification: "11! = 39,916,800. Denominator = 24 \\times 24 \\times 2 = 1,152. 39,916,800 / 1,152 = 34,650. Exact."
      },
      {
        id: "ident_ex_3",
        title: "Grid Walking: Manhattan Lattice Paths",
        problem: "A robot at coordinate (0, 0) must travel to coordinate (5, 3) on a city grid. The robot can only move 1 unit Right (R) or 1 unit Up (U) at each step. How many distinct paths can the robot take?",
        given: "Start = (0, 0), End = (5, 3). Total Right steps R = 5, Total Up steps U = 3. Total steps n = 5 + 3 = 8.",
        concept: "Grid paths modeled as permutations of repeated move characters {R, R, R, R, R, U, U, U}.",
        formula: "\\text{Paths} = \\frac{n!}{n_R! \\times n_U!} = \\binom{n_R + n_U}{n_R}",
        reasoning: "Every valid path is a sequence of 8 steps containing exactly 5 identical R's and 3 identical U's in some order.",
        substitution: "\\frac{8!}{5! \\times 3!} = \\binom{8}{3}",
        calculation: [
          "\\frac{8 \\times 7 \\times 6 \\times 5!}{5! \\times (3 \\times 2 \\times 1)}",
          "Cancel 5!: \\frac{8 \\times 7 \\times 6}{6}",
          "Cancel 6: 8 \\times 7 = 56"
        ],
        finalAnswer: "56 distinct paths",
        interpretation: "There are 56 unique shortest paths through the grid from (0,0) to (5,3).",
        verification: "\\binom{8}{3} = (8 \\times 7 \\times 6) / 6 = 56. Verified."
      },
      {
        id: "ident_ex_4",
        title: "Arranging Colored Signal Flags on a Mast",
        problem: "A ship has 4 identical red flags, 3 identical white flags, and 2 identical blue flags. In how many distinct ways can all 9 flags be hoisted vertically on a flagpole to transmit a maritime signal?",
        given: "Total flags n = 9. Red = 4, White = 3, Blue = 2. Total: 4 + 3 + 2 = 9.",
        concept: "Multinomial permutation with 3 color groups.",
        formula: "\\frac{n!}{n_R! \\times n_W! \\times n_B!}",
        reasoning: "Vertical position encodes meaning. Swapping two red flags produces no visible change in signal.",
        substitution: "\\frac{9!}{4! \\times 3! \\times 2!}",
        calculation: [
          "Expand: \\frac{9 \\times 8 \\times 7 \\times 6 \\times 5 \\times 4!}{4! \\times (6) \\times (2)}",
          "Cancel 4! and 6: \\frac{9 \\times 8 \\times 7 \\times 5}{2}",
          "8 / 2 = 4",
          "Product: 9 \\times 4 \\times 7 \\times 5",
          "9 \\times 4 = 36",
          "7 \\times 5 = 35",
          "36 \\times 35 = 1,260"
        ],
        finalAnswer: "1,260 distinct signals",
        interpretation: "The ship can transmit 1,260 unique maritime visual signals.",
        verification: "9! / (24 \\times 6 \\times 2) = 362,880 / 288 = 1,260. Exact."
      },
      {
        id: "ident_ex_5",
        title: "Anagrams of MATHEMATICS with Vowels Kept Together",
        problem: "In how many ways can the letters of the word 'MATHEMATICS' be arranged such that all the vowels (A, E, A, I) always remain together as a single block?",
        given: "Word: MATHEMATICS (11 letters). Multiplicities: M=2, A=2, T=2, H=1, E=1, I=1, C=1, S=1. Vowels = {A, A, E, I} (4 vowels). Consonants = {M, M, T, T, H, C, S} (7 consonants).",
        concept: "Block method combined with identical item multinomial permutations.",
        formula: "\\text{Total} = (\\text{Arrangements of super-items}) \\times (\\text{Internal vowel arrangements})",
        reasoning: "Tie the 4 vowels into a block [A, A, E, I]. Now arrange 7 consonants + 1 block = 8 entities, where M repeats twice and T repeats twice. Then multiply by the internal permutations of the 4 vowels where A repeats twice.",
        substitution: "\\frac{8!}{2! \\times 2!} \\times \\frac{4!}{2!}",
        calculation: [
          "Super-entity arrangements: \\frac{8!}{2! \\times 2!} = \\frac{40,320}{2 \\times 2} = \\frac{40,320}{4} = 10,080",
          "Internal vowel arrangements: \\frac{4!}{2!} = \\frac{24}{2} = 12",
          "Total ways = 10,080 \\times 12",
          "10,080 \\times 10 = 100,800",
          "10,080 \\times 2 = 20,160",
          "100,800 + 20,160 = 120,960"
        ],
        finalAnswer: "120,960 arrangements",
        interpretation: "There are 120,960 valid arrangements where the 4 vowels form an unbroken cluster.",
        verification: "8! / 4 = 10,080. 4! / 2 = 12. 10,080 \\times 12 = 120,960. Correct."
      },
      {
        id: "ident_ex_6",
        title: "Arranging Letters of LEVEL",
        problem: "How many distinct permutations can be made from the letters of the palindromic word 'LEVEL'?",
        given: "Word: LEVEL. Total letters n = 5. Letters: L = 2, E = 2, V = 1. Total = 2 + 2 + 1 = 5.",
        concept: "Permutations of multiset {L, L, E, E, V}.",
        formula: "\\frac{n!}{n_L! \\times n_E! \\times n_V!}",
        reasoning: "Divide 5! by 2! for the two L's and 2! for the two E's.",
        substitution: "\\frac{5!}{2! \\times 2! \\times 1!}",
        calculation: [
          "5! = 120",
          "Denominator = 2 \\times 2 = 4",
          "120 / 4 = 30"
        ],
        finalAnswer: "30 distinct permutations",
        interpretation: "There are exactly 30 unique anagram strings formed from the letters of LEVEL.",
        verification: "Listing patterns: V at center (EEVLL, ELEVL, etc.) can be systematically verified to sum to 30."
      },
      {
        id: "ident_ex_7",
        title: "Tossing a Coin 10 Times with Exactly 6 Heads",
        problem: "A fair coin is tossed 10 times. How many distinct sequence outcomes contain exactly 6 Heads and 4 Tails?",
        given: "Total tosses n = 10. Heads H = 6, Tails T = 4.",
        concept: "Binary string permutations with repeated characters (equivalent to binomial coefficient \\binom{n}{k}).",
        formula: "\\frac{n!}{n_H! \\times n_T!} = \\binom{n}{n_H}",
        reasoning: "Each outcome sequence is a string of 10 characters composed of 6 identical H's and 4 identical T's.",
        substitution: "\\frac{10!}{6! \\times 4!} = \\binom{10}{6} = \\binom{10}{4}",
        calculation: [
          "\\frac{10 \\times 9 \\times 8 \\times 7}{4 \\times 3 \\times 2 \\times 1}",
          "4 \\times 2 = 8 cancels with 8",
          "9 / 3 = 3",
          "Remaining product: 10 \\times 3 \\times 7 = 210"
        ],
        finalAnswer: "210 sequences",
        interpretation: "There are 210 distinct sequences of 10 coin flips yielding exactly 6 Heads.",
        verification: "\\binom{10}{4} = (10 \\times 9 \\times 8 \\times 7) / 24 = 5,040 / 24 = 210. Confirmed."
      }
    ],
    realLifeApplications: [
      "Natural Language Processing: Text generation and token frequency modeling.",
      "Bioinformatics: Enumerating RNA/DNA sequences with fixed GC-content percentages.",
      "Robotics & Path Planning: Automated Guided Vehicle (AGV) grid route calculation.",
      "Statistical Physics: Maxwell-Boltzmann statistics for particle distributions."
    ],
    commonMistakes: [
      {
        mistake: "Forgetting to divide by the factorial of EACH repeated item (e.g. dividing by (n_1 + n_2)! instead of n_1! \\times n_2!).",
        correction: "Multiply the individual factorials in the denominator: n_1! \\times n_2! \\times \\dots \\times n_k!.",
        why: "(2 + 3)! = 5! = 120, whereas 2! \\times 3! = 2 \\times 6 = 12."
      },
      {
        mistake: "Treating single occurrence letters as requiring a divisor (1! = 1, so it is safe, but multiplying by 0! instead of 1! causes errors).",
        correction: "Letters appearing once contribute 1! = 1 to the denominator.",
        why: "Multiplying by 1 does not alter the denominator value."
      }
    ],
    summary:
      "When arranging n items where some are identical, divide n! by the product of the factorials of each group's multiplicity: \\frac{n!}{n_1! n_2! \\cdots n_k!} to eliminate indistinguishable duplicates."
  }
];
