// Data and worked examples for the 6 New Animated Learning Games
// Every game strictly contains:
// 1. Definition (2-4 sentences)
// 2. Detailed explanation (multiple paragraphs)
// 3. Formula box (tex & display)
// 4. Symbols explanation
// 5. 5 fully solved worked examples with step-by-step calculations
// 6. Interactive challenge levels, hints, and verified solutions

export interface WorkedExampleItem {
  id: string;
  title: string;
  question: string;
  formula: string;
  substitution: string;
  calculation: string[];
  finalAnswer: string;
  explanation: string;
}

export interface GameTheoryContent {
  gameId: string;
  title: string;
  subtitle: string;
  definition: string;
  explanationParagraphs: string[];
  formulaBoxes: { title: string; formula: string; note: string }[];
  symbols: { symbol: string; meaning: string }[];
  workedExamples: WorkedExampleItem[];
}

// ==========================================
// GAME 1: COUNTING MAZE
// ==========================================
export const COUNTING_MAZE_THEORY: GameTheoryContent = {
  gameId: "counting_maze",
  title: "Counting Maze",
  subtitle: "Fundamental Principle of Counting, Addition & Multiplication Principles",
  definition:
    "The Fundamental Principle of Counting states that if a procedure can be broken into successive independent stages where the first stage can be completed in n₁ ways, the second in n₂ ways, and so on, then the total number of composite outcomes is the product n₁ × n₂ × ... × n_k. When a task requires choosing between mutually exclusive alternative paths that cannot happen simultaneously, the total number of valid outcomes is obtained by the Addition Principle (n₁ + n₂ + ... + n_k).",
  explanationParagraphs: [
    "In discrete mathematics, counting large sets of outcomes without listing every individual possibility is essential. The multiplication principle applies whenever a decision or journey consists of consecutive, independent stages. For example, travelling from City A to City B via intermediate City M requires selecting one road to M and then one road from M to B; every choice at the first stage branches into all possible choices at the next stage.",
    "Conversely, the addition principle applies when decisions represent disjoint, mutually exclusive alternatives. If a traveller can reach a destination either entirely by train (using one of 3 routes) OR entirely by flight (using one of 2 routes), they cannot take both simultaneously. In this case, the total count of possibilities is the sum (3 + 2 = 5).",
    "Real-world systems frequently combine both principles. For instance, navigating a maze network may involve choosing between an Upper Corridor (which branches into 2 × 3 = 6 sub-routes) and a Lower Corridor (which branches into 3 × 2 = 6 sub-routes). The total routes through the entire maze is obtained by multiplying within each sequential corridor and then adding the independent corridor totals: 6 + 6 = 12 possible journeys."
  ],
  formulaBoxes: [
    {
      title: "Multiplication Principle (Sequential Independent Stages)",
      formula: "N = n₁ × n₂ × n₃ × ... × n_k",
      note: "Applies when all k stages must be completed in succession."
    },
    {
      title: "Addition Principle (Mutually Exclusive Alternatives)",
      formula: "N = n₁ + n₂ + n₃ + ... + n_k",
      note: "Applies when choosing exactly one alternative from k disjoint sets."
    }
  ],
  symbols: [
    { symbol: "N", meaning: "Total number of possible composite outcomes or routes." },
    { symbol: "k", meaning: "Total number of successive stages or mutually exclusive alternatives." },
    { symbol: "n₁, n₂, ..., n_k", meaning: "Number of available choices at each individual stage or alternative category." }
  ],
  workedExamples: [
    {
      id: "maze_ex_1",
      title: "Example 1: Wardrobe Outfit Coordination",
      question: "A student has 4 distinct shirts, 3 pairs of trousers, and 2 pairs of shoes. How many different outfits consisting of one shirt, one pair of trousers, and one pair of shoes can be formed?",
      formula: "N = n₁ × n₂ × n₃",
      substitution: "N = 4 × 3 × 2",
      calculation: [
        "Stage 1 (Shirts): 4 independent choices.",
        "Stage 2 (Trousers): 3 independent choices for each shirt.",
        "Stage 3 (Shoes): 2 independent choices for each combination of shirt and trousers.",
        "Composite count: 4 × 3 × 2 = 24."
      ],
      finalAnswer: "24 distinct outfits",
      explanation: "Because an outfit requires choosing from all three categories in sequence, the multiplication principle applies directly."
    },
    {
      id: "maze_ex_2",
      title: "Example 2: Route via Intermediate Junction",
      question: "A network router sends a packet from server A to server C via switch B. There are 5 available fiber channels from A to B, and 4 channels from B to C. How many total transmission routes exist?",
      formula: "N = n(A→B) × n(B→C)",
      substitution: "N = 5 × 4",
      calculation: [
        "First leg of transmission: 5 channels.",
        "Second leg of transmission: 4 channels.",
        "Total sequential paths: 5 × 4 = 20."
      ],
      finalAnswer: "20 routes",
      explanation: "Each of the 5 first-hop links connects to any of the 4 second-hop links, yielding 20 composite network paths."
    },
    {
      id: "maze_ex_3",
      title: "Example 3: Disjoint Travel Modes (Addition Principle)",
      question: "A student travelling from campus to home can take one of 3 express trains, one of 2 intercity buses, or one of 4 rideshare services. No two modes can be taken simultaneously. In how many ways can the trip be made?",
      formula: "N = n(Trains) + n(Buses) + n(Rideshares)",
      substitution: "N = 3 + 2 + 4",
      calculation: [
        "Choice 1: 3 train options.",
        "Choice 2: 2 bus options.",
        "Choice 3: 4 rideshare options.",
        "Sum of mutually exclusive options: 3 + 2 + 4 = 9."
      ],
      finalAnswer: "9 travel choices",
      explanation: "The modes are mutually exclusive alternatives; selecting one excludes the others, so we add the choices."
    },
    {
      id: "maze_ex_4",
      title: "Example 4: Dual-Corridor Maze (Combined Addition & Multiplication)",
      question: "A maze splits at the entrance into a Northern Corridor and a Southern Corridor. The Northern Corridor has 2 successive chambers with 3 doors and 4 doors respectively. The Southern Corridor has 2 chambers with 2 doors and 5 doors respectively. How many total ways exist to traverse the maze from entrance to exit?",
      formula: "N = (n_North1 × n_North2) + (n_South1 × n_South2)",
      substitution: "N = (3 × 4) + (2 × 5)",
      calculation: [
        "Northern Corridor routes: 3 × 4 = 12 routes.",
        "Southern Corridor routes: 2 × 5 = 10 routes.",
        "Since the two corridors are mutually exclusive paths from the entrance: 12 + 10 = 22."
      ],
      finalAnswer: "22 total maze routes",
      explanation: "Within each corridor, stages are sequential (multiply). Between the corridors, paths are mutually exclusive (add)."
    },
    {
      id: "maze_ex_5",
      title: "Example 5: Four-Course Banquet Selection",
      question: "A banquet offers 3 appetizers, 4 main courses, 2 desserts, and 3 beverages. If every diner selects exactly one item from each category, how many distinct meal plans can be created?",
      formula: "N = n₁ × n₂ × n₃ × n₄",
      substitution: "N = 3 × 4 × 2 × 3",
      calculation: [
        "Appetizer choices: 3",
        "Main course choices: 4 (cumulative: 3 × 4 = 12)",
        "Dessert choices: 2 (cumulative: 12 × 2 = 24)",
        "Beverage choices: 3 (cumulative: 24 × 3 = 72)"
      ],
      finalAnswer: "72 distinct meal plans",
      explanation: "All four courses must be chosen to complete the dinner sequence, multiplying all independent stage counts."
    }
  ]
};

// ==========================================
// GAME 2: RULE-BASED ARRANGEMENT LAB
// ==========================================
export const ARRANGEMENT_LAB_THEORY: GameTheoryContent = {
  gameId: "arrangement_lab",
  title: "Rule-Based Arrangement Lab",
  subtitle: "Permutations with Restrictions, Fixed Positions & The Block Method",
  definition:
    "A restricted permutation is an ordered arrangement of distinct objects subject to one or more spatial constraints or positioning rules. Common restrictions include pinning specified objects to fixed positions, requiring certain objects to remain strictly adjacent (the Block Method), or forbidding certain objects from standing adjacent to one another.",
  explanationParagraphs: [
    "Unrestricted permutations of n distinct items count all n! orders without exception. However, practical engineering and scheduling problems almost always enforce constraints. Understanding how to model these constraints mathematically prevents laborious brute-force enumeration.",
    "When an object is fixed in a specific position (such as fixing item A in position 1), that slot is occupied in exactly 1 way. The remaining (n - 1) objects can be freely arranged in the remaining (n - 1) positions in (n - 1)! ways.",
    "When a subset of k objects must always remain together, we apply the Block Method (or Tie Method). We treat the k objects as a single composite 'super-object' (or block). Together with the remaining (n - k) individual objects, we have (n - k + 1) units to arrange, which can be done in (n - k + 1)! ways. Then, inside the block, the k objects can be internally arranged in k! ways. By the multiplication principle, the total valid arrangements is (n - k + 1)! × k!.",
    "When two objects must NOT be together, it is often simplest to use complementary counting: subtract the number of arrangements where they are together from the total unrestricted arrangements: N = n! - (n - 1)! × 2!."
  ],
  formulaBoxes: [
    {
      title: "Unrestricted Linear Permutation",
      formula: "n!",
      note: "All n distinct objects arranged in a line with no constraints."
    },
    {
      title: "Arrangement with 1 Object Fixed in Position",
      formula: "(n - 1)!",
      note: "The fixed object has 1 choice; remaining (n - 1) items arrange freely."
    },
    {
      title: "Block Method (k Objects Kept Together)",
      formula: "N = (n - k + 1)! × k!",
      note: "Treat the k objects as 1 block, arrange units, then multiply by internal orderings."
    },
    {
      title: "Separation of 2 Objects (Complementary Method)",
      formula: "N = n! - [(n - 1)! × 2!]",
      note: "Total unrestricted arrangements minus arrangements where the 2 objects are adjacent."
    }
  ],
  symbols: [
    { symbol: "n", meaning: "Total number of distinct objects in the set." },
    { symbol: "k", meaning: "Number of specified objects that must remain grouped together." },
    { symbol: "(n - k + 1)", meaning: "Number of units to arrange when the grouped items are treated as 1 single block." },
    { symbol: "k!", meaning: "Number of internal permutations of the k grouped items within their block." }
  ],
  workedExamples: [
    {
      id: "lab_ex_1",
      title: "Example 1: Math Book Fixed at First Position",
      question: "In how many ways can 5 distinct books (Mathematics, Physics, Chemistry, Biology, History) be arranged on a shelf if the Mathematics book must always occupy the first position?",
      formula: "N = 1 × (n - 1)!",
      substitution: "N = 1 × (5 - 1)! = 4!",
      calculation: [
        "Position 1 is reserved for Mathematics: 1 choice.",
        "Positions 2, 3, 4, 5 are filled by the remaining 4 books: 4! choices.",
        "Calculation: 4! = 4 × 3 × 2 × 1 = 24."
      ],
      finalAnswer: "24 arrangements",
      explanation: "Fixing one item effectively reduces the active rearrangement problem to the remaining 4 books."
    },
    {
      id: "lab_ex_2",
      title: "Example 2: Two Students Must Stand Together (Block Method)",
      question: "Six students (A, B, C, D, E, F) line up for a photograph. In how many ways can they be arranged if student A and student B must stand next to each other?",
      formula: "N = (n - k + 1)! × k!",
      substitution: "n = 6, k = 2 → N = (6 - 2 + 1)! × 2! = 5! × 2!",
      calculation: [
        "Tie A and B into a single block [AB].",
        "Number of units to arrange: [AB], C, D, E, F → 5 units.",
        "Arrange 5 units: 5! = 120 ways.",
        "Internal order within block: (AB or BA) → 2! = 2 ways.",
        "Total arrangements: 120 × 2 = 240."
      ],
      finalAnswer: "240 arrangements",
      explanation: "The block method treats the pair as a unified entity, preserving adjacency while exploring all 5! relative slot positions."
    },
    {
      id: "lab_ex_3",
      title: "Example 3: Two Rivals Must NOT Stand Together",
      question: "In how many ways can 5 people (P, Q, R, S, T) be seated in a row of 5 chairs if P and Q refuse to sit next to each other?",
      formula: "N = n! - (Together count)",
      substitution: "N = 5! - [(5 - 2 + 1)! × 2!] = 120 - (4! × 2!)",
      calculation: [
        "Total unrestricted arrangements: 5! = 120.",
        "Arrangements where P and Q sit together: 4! × 2! = 24 × 2 = 48.",
        "Arrangements where P and Q do NOT sit together: 120 - 48 = 72."
      ],
      finalAnswer: "72 arrangements",
      explanation: "Complementary counting is clean and reliable: subtract forbidden configurations from total unrestricted configurations."
    },
    {
      id: "lab_ex_4",
      title: "Example 4: Three Specific Books Must Form a Single Block",
      question: "Seven different volumes are placed on a shelf. Three specific science volumes must always be placed side by side. How many such arrangements are possible?",
      formula: "N = (n - k + 1)! × k!",
      substitution: "n = 7, k = 3 → N = (7 - 3 + 1)! × 3! = 5! × 3!",
      calculation: [
        "Treat the 3 science volumes as 1 composite block.",
        "Units to arrange: 1 block + 4 other volumes = 5 units.",
        "Arrange 5 units: 5! = 120.",
        "Internal arrangement of 3 science volumes: 3! = 6.",
        "Total: 120 × 6 = 720."
      ],
      finalAnswer: "720 arrangements",
      explanation: "With k=3, the internal block order has 3! = 6 variations, multiplying the 120 unit placements."
    },
    {
      id: "lab_ex_5",
      title: "Example 5: Vowels Fixed at Both Ends",
      question: "In how many ways can the letters of the word PRISMA (6 distinct letters: P, R, I, S, M, A) be arranged so that a vowel occupies both the first and last positions?",
      formula: "N = (Vowel arrangements at ends) × (Consonant arrangements in middle)",
      substitution: "Vowels = {I, A} (2), Consonants = {P, R, S, M} (4) → N = 2! × 4!",
      calculation: [
        "Positions 1 and 6 must be filled by the 2 vowels: 2! = 2 ways (I...A or A...I).",
        "Positions 2, 3, 4, 5 are filled by the 4 consonants: 4! = 24 ways.",
        "Total valid arrangements: 2 × 24 = 48."
      ],
      finalAnswer: "48 arrangements",
      explanation: "Restrictions on multiple positions are solved by filling restricted slots first, then arranging remaining items in open slots."
    }
  ]
};

// ==========================================
// GAME 3: TRAIN CARRIAGE CHALLENGE
// ==========================================
export const TRAIN_CARRIAGE_THEORY: GameTheoryContent = {
  gameId: "train_carriage",
  title: "Train Carriage Challenge",
  subtitle: "Permutations of Distinct Objects, Coupling Sequences & Positional Rules",
  definition:
    "A permutation is an ordered arrangement of distinct objects in a definite linear sequence. In a train formation, changing the relative order of distinct carriages produces a physically and functionally distinct train. Restricted train permutations enforce coupling rules such as fixing a specific carriage immediately behind the locomotive or requiring hazardous material carriages to remain isolated.",
  explanationParagraphs: [
    "When a train is formed from a locomotive and n distinct carriages, every position from front to back represents an ordered slot. The first slot behind the locomotive can be filled in n ways, the second in (n - 1) ways, down to 1 choice for the caboose or final carriage, resulting in n! total permutations.",
    "If only r of the available n carriages are chosen to form the train, the number of distinct formations is given by the permutation formula ⁿPᵣ = n! / (n - r)!. For example, assembling a 3-carriage train from a depot containing 6 available carriages yields ⁶P₃ = 6 × 5 × 4 = 120 possible trains.",
    "Practical railroad operations enforce critical safety and logistical constraints. If the Dining Carriage and Kitchen Carriage must remain coupled together, they form a single 2-carriage block. If the Tanker Carriage cannot be placed in the final position (due to rear-collision buffer regulations), we calculate valid formations either by direct slot multiplication or by complementary subtraction."
  ],
  formulaBoxes: [
    {
      title: "Arranging All n Distinct Carriages in a Line",
      formula: "n!",
      note: "Total orders for coupling n distinct carriages behind the locomotive."
    },
    {
      title: "Arranging r Carriages Selected from n Available",
      formula: "ⁿPᵣ = n! / (n - r)!",
      note: "Order matters; only r carriages are chosen from n depot carriages."
    },
    {
      title: "Adjacent Carriages Constraint (Block Method)",
      formula: "N = (n - k + 1)! × k!",
      note: "k carriages coupled together treated as 1 unit."
    },
    {
      title: "Prohibited Position Constraint",
      formula: "N = (n - 1) × (n - 1)!",
      note: "One specified carriage forbidden in 1 position leaves (n-1) choices for that slot."
    }
  ],
  symbols: [
    { symbol: "n", meaning: "Total number of available carriages." },
    { symbol: "r", meaning: "Number of carriage slots being coupled into the active train." },
    { symbol: "ⁿPᵣ", meaning: "Number of permutations of n items taken r at a time." },
    { symbol: "k", meaning: "Number of carriages required to remain coupled adjacently." }
  ],
  workedExamples: [
    {
      id: "train_ex_1",
      title: "Example 1: Unrestricted 5-Carriage Assembly",
      question: "A locomotive must couple 5 distinct carriages: Red Passenger, Blue Sleeper, Yellow Dining, Green Cargo, and Purple Mail. In how many different orders can these 5 carriages be coupled?",
      formula: "N = n!",
      substitution: "N = 5!",
      calculation: [
        "First slot behind locomotive: 5 choices.",
        "Second slot: 4 choices.",
        "Third slot: 3 choices.",
        "Fourth slot: 2 choices.",
        "Fifth slot: 1 choice.",
        "5! = 5 × 4 × 3 × 2 × 1 = 120."
      ],
      finalAnswer: "120 train formations",
      explanation: "With no restrictions, every distinct order constitutes a valid train permutation."
    },
    {
      id: "train_ex_2",
      title: "Example 2: 3-Carriage Express from 6 Available",
      question: "A train dispatcher has 6 distinct carriages in the rail yard but needs to form a short express train consisting of only 3 carriages. How many different 3-carriage trains can be formed?",
      formula: "ⁿPᵣ = n! / (n - r)!",
      substitution: "⁶P₃ = 6! / (6 - 3)! = 6! / 3!",
      calculation: [
        "Position 1 (behind engine): 6 choices.",
        "Position 2: 5 choices.",
        "Position 3: 4 choices.",
        "Calculation: 6 × 5 × 4 = 120."
      ],
      finalAnswer: "120 express formations",
      explanation: "Selection and ordering of 3 items from 6 distinct items without replacement is ⁶P₃ = 120."
    },
    {
      id: "train_ex_3",
      title: "Example 3: Dining and Sleeper Must Be Coupled Together",
      question: "Five carriages (A, B, C, D, E) are coupled behind an engine. Carriages B (Sleeper) and C (Dining) must remain coupled together in immediate succession. How many valid trains can be made?",
      formula: "N = (n - k + 1)! × k!",
      substitution: "n = 5, k = 2 → N = (5 - 2 + 1)! × 2! = 4! × 2!",
      calculation: [
        "Group B and C as unit [BC].",
        "Units to arrange: [BC], A, D, E → 4 units.",
        "Ways to arrange 4 units: 4! = 24.",
        "Internal coupling order: BC or CB → 2! = 2.",
        "Total valid trains: 24 × 2 = 48."
      ],
      finalAnswer: "48 valid train formations",
      explanation: "Grouping the two coupled cars ensures they are never split while exploring all sequence possibilities."
    },
    {
      id: "train_ex_4",
      title: "Example 4: Green Cargo Carriage Forbidden at the Rear",
      question: "Five carriages (Red, Blue, Yellow, Green, Purple) are assembled. Green Cargo carriage cannot be placed at the very end of the train. In how many ways can the carriages be arranged?",
      formula: "N = Total - (Green at end)",
      substitution: "N = 5! - 4! = 120 - 24",
      calculation: [
        "Total unrestricted arrangements of 5 carriages: 5! = 120.",
        "Arrangements with Green fixed at the rear: 4! × 1 = 24.",
        "Valid arrangements: 120 - 24 = 96.",
        "Alternative direct method: Last position has 4 choices (not Green); remaining 4 positions have 4! ways → 4 × 24 = 96."
      ],
      finalAnswer: "96 train formations",
      explanation: "Both the complement method (120 - 24) and the slot choice method (4 × 24) confirm 96 valid configurations."
    },
    {
      id: "train_ex_5",
      title: "Example 5: Red First and Green/Purple Adjacent",
      question: "Six carriages (A, B, C, D, E, F) are assembled. Carriage A must be in the first position immediately behind the engine, while carriages E and F must be adjacent. How many formations are possible?",
      formula: "N = 1 × [(5 - 2 + 1)! × 2!]",
      substitution: "N = 1 × (4! × 2!)",
      calculation: [
        "Slot 1 is fixed for Carriage A: 1 choice.",
        "Remaining 5 slots must accommodate B, C, D and the pair [EF].",
        "Number of units among remaining slots: B, C, D, [EF] → 4 units.",
        "Arrange 4 units: 4! = 24.",
        "Internal order of [EF]: 2! = 2.",
        "Total: 1 × 24 × 2 = 48."
      ],
      finalAnswer: "48 train formations",
      explanation: "Fixing slot 1 isolates the problem to arranging the remaining elements with the block condition."
    }
  ]
};

// ==========================================
// GAME 4: SELECTION SORTER
// ==========================================
export const SELECTION_SORTER_THEORY: GameTheoryContent = {
  gameId: "selection_sorter",
  title: "Selection Sorter",
  subtitle: "Combinations Without Repetition vs. Combinations With Repetition Allowed",
  definition:
    "A combination is an unordered selection of objects from a collection. In contrast to permutations where the order of items determines distinct outcomes, combinations consider only which elements are present in the chosen subset. When repetition is permitted, the selection counts how many items of each available category or type are selected, regardless of the sequence in which they were chosen.",
  explanationParagraphs: [
    "The fundamental distinction between permutations and combinations lies in the role of ordering. Selecting a delegation consisting of Alice, Bob, and Charlie creates the exact same team as selecting Charlie, Alice, and Bob. Because every group of r distinct objects can be rearranged internally in r! ways, the combination count without repetition is obtained by dividing the permutation count by r!: ⁿCᵣ = n! / [r!(n - r)!].",
    "In scenarios where repetition is permitted (such as selecting multiple scoops of ice cream from available flavours, purchasing donuts from different bakery varieties, or distributing identical tokens into categories), individual types can be selected multiple times. The order of selection remains irrelevant (ordering Vanilla then Chocolate yields the same dessert as Chocolate then Vanilla).",
    "Combinations with repetition are counted using the Stars-and-Bars theorem. To select r items from n categories, we represent the r chosen items as 'stars' (★) and the boundaries separating the n categories as (n - 1) 'bars' (|). Any selection corresponds to a unique sequence of r stars and (n - 1) bars. The total number of symbols in this sequence is r + (n - 1) = n + r - 1. Choosing the positions of the r stars yields the formula: C(n + r - 1, r)."
  ],
  formulaBoxes: [
    {
      title: "Combination Without Repetition",
      formula: "ⁿCᵣ = n! / [r!(n - r)!]",
      note: "Selecting r distinct items from n distinct items; each item chosen at most once."
    },
    {
      title: "Combination With Repetition Allowed (Stars & Bars)",
      formula: "C(n + r - 1, r) = (n + r - 1)! / [r!(n - 1)!]",
      note: "Selecting r items from n categories where categories can be selected multiple times."
    }
  ],
  symbols: [
    { symbol: "n", meaning: "Number of available distinct items or distinct category types." },
    { symbol: "r", meaning: "Number of items to be selected." },
    { symbol: "ⁿCᵣ", meaning: "Number of combinations of n distinct items taken r at a time." },
    { symbol: "n - 1", meaning: "Number of separators ('bars') required to divide n categories." },
    { symbol: "n + r - 1", meaning: "Total number of positions (stars + bars) in the repetition model." }
  ],
  workedExamples: [
    {
      id: "sorter_ex_1",
      title: "Example 1: Selecting a Student Committee (No Repetition)",
      question: "A class has 8 students. In how many ways can a committee of 3 students be selected to represent the class?",
      formula: "ⁿCᵣ = n! / [r!(n - r)!]",
      substitution: "⁸C₃ = 8! / [3!(8 - 3)!] = 8! / (3! × 5!)",
      calculation: [
        "Numerator expansion: 8 × 7 × 6 × 5!.",
        "Cancel 5!: (8 × 7 × 6) / 3!.",
        "Evaluate denominator: 3! = 6.",
        "(8 × 7 × 6) / 6 = 56."
      ],
      finalAnswer: "56 committees",
      explanation: "Because a student cannot be selected twice and committee membership has no hierarchy or order, ⁸C₃ applies."
    },
    {
      id: "sorter_ex_2",
      title: "Example 2: 4 Ice Cream Scoops from 3 Flavors (Repetition Allowed)",
      question: "An ice cream shop offers 3 flavours: Vanilla, Chocolate, and Strawberry. A customer orders a bowl with 4 scoops. Flavours can be repeated and order in the bowl does not matter. How many distinct flavour combinations can be ordered?",
      formula: "C(n + r - 1, r)",
      substitution: "n = 3, r = 4 → C(3 + 4 - 1, 4) = C(6, 4)",
      calculation: [
        "Total symbols = n + r - 1 = 3 + 4 - 1 = 6.",
        "C(6, 4) = 6! / (4! × 2!).",
        "By symmetry, C(6, 4) = C(6, 2) = (6 × 5) / (2 × 1) = 30 / 2 = 15."
      ],
      finalAnswer: "15 flavour combinations",
      explanation: "Using stars and bars: 4 stars (scoops) and 2 bars (separating 3 flavours) gives C(6, 4) = 15 combinations."
    },
    {
      id: "sorter_ex_3",
      title: "Example 3: Pizza Toppings Selection (No Repetition)",
      question: "A pizzeria offers 6 different toppings. A customer wants a pizza with exactly 2 distinct toppings. How many different topping combinations can be chosen?",
      formula: "ⁿCᵣ = n! / [r!(n - r)!]",
      substitution: "⁶C₂ = 6! / [2!(6 - 2)!] = 6! / (2! × 4!)",
      calculation: [
        "Numerator: 6 × 5 × 4!.",
        "Denominator: 2! × 4!.",
        "Cancel 4!: (6 × 5) / 2 = 30 / 2 = 15."
      ],
      finalAnswer: "15 topping combinations",
      explanation: "The order in which the toppings are placed on the pizza does not alter the pizza, so combinations without repetition apply."
    },
    {
      id: "sorter_ex_4",
      title: "Example 4: Purchasing 5 Bakery Items from 4 Varieties (Repetition Allowed)",
      question: "A bakery sells 4 varieties of pastry: Croissants, Danishes, Muffins, and Scones. In how many ways can a customer purchase a box of 5 pastries?",
      formula: "C(n + r - 1, r)",
      substitution: "n = 4, r = 5 → C(4 + 5 - 1, 5) = C(8, 5)",
      calculation: [
        "n + r - 1 = 4 + 5 - 1 = 8.",
        "C(8, 5) = 8! / (5! × 3!).",
        "By symmetry: C(8, 3) = (8 × 7 × 6) / (3 × 2 × 1) = 336 / 6 = 56."
      ],
      finalAnswer: "56 pastry selections",
      explanation: "With 4 varieties (n=4) and 5 items to select (r=5), the stars and bars method yields C(8, 5) = 56 combinations."
    },
    {
      id: "sorter_ex_5",
      title: "Example 5: Selecting 3 Books from a Reading List of 7",
      question: "A literature syllabus lists 7 recommended novels. A student must select 3 distinct novels to read for their term paper. How many different subsets of 3 novels can be chosen?",
      formula: "ⁿCᵣ = n! / [r!(n - r)!]",
      substitution: "⁷C₃ = 7! / [3!(7 - 3)!] = 7! / (3! × 4!)",
      calculation: [
        "Numerator: 7 × 6 × 5 × 4!.",
        "Cancel 4!: (7 × 6 × 5) / 3!.",
        "3! = 6, so (7 × 6 × 5) / 6 = 35."
      ],
      finalAnswer: "35 reading selections",
      explanation: "The student chooses 3 distinct books without regard to order, making ⁷C₃ = 35 the exact count."
    }
  ]
};

// ==========================================
// GAME 5: TOURNAMENT PLANNER
// ==========================================
export const TOURNAMENT_PLANNER_THEORY: GameTheoryContent = {
  gameId: "tournament_planner",
  title: "Tournament Planner",
  subtitle: "Team Selection (ⁿCᵣ) vs. Distinct Role Assignment (ⁿPᵣ)",
  definition:
    "A counting problem involving groups requires choosing between a combination and a permutation based on role differentiation. A combination (ⁿCᵣ) is applied when selecting an unranked squad or committee where all members share equal status. A permutation (ⁿPᵣ) is applied when each selected individual is assigned to a distinct, unique role or position (such as Captain, Goalkeeper, or Striker).",
  explanationParagraphs: [
    "A fundamental conceptual milestone in discrete mathematics is recognizing that permutations and combinations are connected by a multiplicative factor: ⁿPᵣ = ⁿCᵣ × r!. Selecting r participants from a pool of n candidates identifies the team (done in ⁿCᵣ ways). Once those r participants are chosen, assigning them to r distinct designated positions can be done in r! ways.",
    "For instance, if a coach selects 3 players from a squad of 8 to play on the field without assigned roles, there are ⁸C₃ = 56 possible player combinations. However, if those 3 players must fill the distinct positions of Captain, Vice-Captain, and Goalkeeper, each of the 56 combinations can be distributed among the 3 roles in 3! = 6 ways, giving 56 × 6 = 336 = ⁸P₃ total role assignments.",
    "The Tournament Planner demonstrates this duality visually: students first pick a subset of players from an athlete roster into an unranked dugout (Combination View). They then drag those selected athletes onto designated positional podiums (Permutation View), showing in real time how one combination generates r! distinct permutations."
  ],
  formulaBoxes: [
    {
      title: "Team / Squad Selection (Unranked Roles)",
      formula: "ⁿCᵣ = n! / [r!(n - r)!]",
      note: "Only group membership matters; no assigned positions."
    },
    {
      title: "Ordered Role Assignment (Distinct Positions)",
      formula: "ⁿPᵣ = n! / (n - r)!",
      note: "Each selected player receives a specific, non-interchangeable position."
    },
    {
      title: "The Duality Bridge",
      formula: "ⁿPᵣ = ⁿCᵣ × r!",
      note: "Every 1 combination of r players yields r! distinct positional assignments."
    }
  ],
  symbols: [
    { symbol: "n", meaning: "Total number of eligible athletes / candidates in the candidate pool." },
    { symbol: "r", meaning: "Number of players selected or number of distinct positions to be filled." },
    { symbol: "ⁿCᵣ", meaning: "Number of unranked team selections." },
    { symbol: "r!", meaning: "Number of ways to assign r selected players to r distinct roles." },
    { symbol: "ⁿPᵣ", meaning: "Number of ordered, role-specific assignments." }
  ],
  workedExamples: [
    {
      id: "tourn_ex_1",
      title: "Example 1: Esports 4-Player Roster vs. Assigned Roles",
      question: "An esports club has 9 candidates. (a) In how many ways can a team of 4 be selected? (b) In how many ways can 4 distinct roles (Entry Fragger, Support, IGL, Sniper) be assigned from the 9 candidates?",
      formula: "(a) ⁿCᵣ  |  (b) ⁿPᵣ = ⁿCᵣ × r!",
      substitution: "(a) ⁹C₄ = 9! / (4! × 5!)  |  (b) ⁹P₄ = 9! / 5!",
      calculation: [
        "Part (a) Team selection: (9 × 8 × 7 × 6) / 4! = 3024 / 24 = 126 teams.",
        "Part (b) Role assignment: 9 × 8 × 7 × 6 = 3024 role assignments.",
        "Check duality: 126 × 4! = 126 × 24 = 3024."
      ],
      finalAnswer: "(a) 126 teams, (b) 3,024 role assignments",
      explanation: "Notice that each team of 4 can be assigned to the 4 roles in 4! = 24 ways, multiplying 126 by 24 to get 3,024."
    },
    {
      id: "tourn_ex_2",
      title: "Example 2: Executive Officers from 10 Board Members",
      question: "A company board has 10 directors. How many ways can a President, Vice President, and Treasurer be elected?",
      formula: "ⁿPᵣ = n! / (n - r)!",
      substitution: "¹⁰P₃ = 10! / (10 - 3)! = 10! / 7!",
      calculation: [
        "President: 10 choices.",
        "Vice President: 9 choices.",
        "Treasurer: 8 choices.",
        "Total = 10 × 9 × 8 = 720."
      ],
      finalAnswer: "720 officer configurations",
      explanation: "Because each officer holds a distinct title and responsibility, this is a permutation problem (¹⁰P₃ = 720)."
    },
    {
      id: "tourn_ex_3",
      title: "Example 3: Doubles Tennis Pairing from 6 Players",
      question: "A coach must choose 2 players from 6 available athletes to form a doubles tennis team. How many different pairings can be formed?",
      formula: "ⁿCᵣ = n! / [r!(n - r)!]",
      substitution: "⁶C₂ = 6! / [2!(6 - 2)!] = (6 × 5) / 2",
      calculation: [
        "Numerator: 6 × 5 = 30.",
        "Denominator: 2! = 2.",
        "30 / 2 = 15."
      ],
      finalAnswer: "15 doubles pairs",
      explanation: "In doubles tennis, both players share the court equally without assigned hierarchy; order does not matter."
    },
    {
      id: "tourn_ex_4",
      title: "Example 4: Assigning First 4 Batting Positions from 11 Players",
      question: "From a cricket squad of 11 players, in how many ways can the coach select and assign the opening, 2nd, 3rd, and 4th batting positions?",
      formula: "ⁿPᵣ = n! / (n - r)!",
      substitution: "¹¹P₄ = 11! / (11 - 4)! = 11! / 7!",
      calculation: [
        "Opener: 11 choices.",
        "2nd batsman: 10 choices.",
        "3rd batsman: 9 choices.",
        "4th batsman: 8 choices.",
        "11 × 10 × 9 × 8 = 7,920."
      ],
      finalAnswer: "7,920 batting lineups",
      explanation: "Batting slots 1 through 4 are strictly ordered and distinct, so permutations of 11 taken 4 at a time apply."
    },
    {
      id: "tourn_ex_5",
      title: "Example 5: Relay Team Selection vs. Lap Assignment",
      question: "A track coach has 7 sprinters. (a) How many 4-person relay teams can be chosen? (b) How many ways can the 4 legs (Lead-off, 2nd leg, 3rd leg, Anchor) be assigned?",
      formula: "(a) ⁷C₄  |  (b) ⁷P₄",
      substitution: "(a) ⁷C₄ = 7! / (4! × 3!)  |  (b) ⁷P₄ = 7! / 3!",
      calculation: [
        "(a) Team selection: (7 × 6 × 5) / (3 × 2 × 1) = 35 teams.",
        "(b) Leg assignment: 7 × 6 × 5 × 4 = 840 lineups.",
        "Verification: 35 × 4! = 35 × 24 = 840."
      ],
      finalAnswer: "(a) 35 teams, (b) 840 leg assignments",
      explanation: "Selecting the 4 runners is a combination (35); assigning them to 4 distinct relay legs multiplies by 4! (840)."
    }
  ]
};

// ==========================================
// GAME 6: FORMULA BATTLE ARENA
// ==========================================
export const FORMULA_BATTLE_THEORY: GameTheoryContent = {
  gameId: "formula_battle",
  title: "Formula Battle Arena",
  subtitle: "Cross-Curriculum Synthesis Across All 7 Combinatorics Topics",
  definition:
    "Solving discrete counting problems requires identifying the mathematical structure of the scenario before executing any calculation. The correct counting method depends on five core criteria: whether order matters, whether repetition is allowed, whether items are distinct or identical, whether the arrangement is linear or circular, and whether positions are subject to restrictions.",
  explanationParagraphs: [
    "Students frequently make the mistake of plugging numbers into a formula before diagnosing the scenario. In the Formula Battle Arena, students practice the critical two-step protocol used by professional mathematicians and computer scientists: first, classify the problem into its exact combinatorial archetype, and second, substitute the parameters to compute the verified outcome.",
    "The 7 core topics in Discrete Mathematical Structures (DMS) cover the entire counting spectrum: Factorials (arranging n distinct objects, n!), Permutations without Repetition (ordered selection, ⁿPᵣ), Combinations without Repetition (unordered selection, ⁿCᵣ), Permutations with Repetition (codes and sequences, nʳ), Combinations with Repetition (stars & bars, C(n+r-1,r)), Circular Permutations (rotational equivalence, (n-1)!), and Permutations of Identical Objects (multinomial coefficients, n! / [p!q!r!...]).",
    "In the battle arena, questions from all 7 topics appear with animated visual effects. Answering correctly powers up your champion; incorrect diagnoses reveal targeted feedback on why the chosen formula does not fit the problem's physical assumptions."
  ],
  formulaBoxes: [
    {
      title: "1. Factorial Arrangements",
      formula: "n! = n(n - 1)...2 × 1,  0! = 1",
      note: "Linear arrangement of all n distinct objects."
    },
    {
      title: "2. Permutations Without Repetition",
      formula: "ⁿPᵣ = n! / (n - r)!",
      note: "Ordered arrangement of r items chosen from n distinct items."
    },
    {
      title: "3. Combinations Without Repetition",
      formula: "ⁿCᵣ = n! / [r!(n - r)!]",
      note: "Unordered selection of r items chosen from n distinct items."
    },
    {
      title: "4. Permutations With Repetition Allowed",
      formula: "N = nʳ",
      note: "r ordered positions, each independently chosen from n available symbols."
    },
    {
      title: "5. Combinations With Repetition Allowed",
      formula: "C(n + r - 1, r) = (n + r - 1)! / [r!(n - 1)!]",
      note: "Selecting r items from n categories; order ignored, repetition allowed."
    },
    {
      title: "6. Circular Permutations",
      formula: "N = (n - 1)!",
      note: "Arranging n distinct items around a circle; rotations are equivalent."
    },
    {
      title: "7. Permutations of Identical Objects",
      formula: "N = n! / (p! × q! × r!...)",
      note: "Arranging n items where p are of type 1, q of type 2, etc."
    }
  ],
  symbols: [
    { symbol: "n", meaning: "Total number of available items or categories." },
    { symbol: "r", meaning: "Number of positions, selections, or draws." },
    { symbol: "p, q, s", meaning: "Multiplicities (counts) of identical items of each indistinguishable type." },
    { symbol: "(n - 1)!", meaning: "Accounts for n rotatable starting positions in circular arrangements." }
  ],
  workedExamples: [
    {
      id: "battle_ex_1",
      title: "Example 1: Factorials - 5 Books on a Shelf",
      question: "How many ways can 5 distinct textbooks be arranged on a single bookshelf?",
      formula: "n!",
      substitution: "5! = 5 × 4 × 3 × 2 × 1",
      calculation: ["5 × 4 × 3 × 2 × 1 = 120."],
      finalAnswer: "120 arrangements",
      explanation: "Arranging all 5 distinct objects in a line without restriction is 5! = 120."
    },
    {
      id: "battle_ex_2",
      title: "Example 2: Permutations w/o Rep - Electing Officers",
      question: "From a club of 7 members, how many ways can a President and a Vice President be elected?",
      formula: "ⁿPᵣ = n! / (n - r)!",
      substitution: "⁷P₂ = 7! / (7 - 2)! = 7! / 5!",
      calculation: ["7 × 6 = 42."],
      finalAnswer: "42 outcomes",
      explanation: "Order matters because President and Vice President are distinct roles: ⁷P₂ = 42."
    },
    {
      id: "battle_ex_3",
      title: "Example 3: Combinations w/o Rep - Study Group Selection",
      question: "In how many ways can a study group of 4 students be selected from a class of 9 students?",
      formula: "ⁿCᵣ = n! / [r!(n - r)!]",
      substitution: "⁹C₄ = 9! / (4! × 5!)",
      calculation: ["(9 × 8 × 7 × 6) / (4 × 3 × 2 × 1) = 3024 / 24 = 126."],
      finalAnswer: "126 study groups",
      explanation: "Group membership has no order or internal ranking, so combinations without repetition apply: ⁹C₄ = 126."
    },
    {
      id: "battle_ex_4",
      title: "Example 4: Permutations with Rep - 4-Digit Security PIN",
      question: "How many 4-digit PIN codes can be formed using digits 0 through 9 if digits can be repeated freely?",
      formula: "nʳ",
      substitution: "10⁴",
      calculation: ["10 × 10 × 10 × 10 = 10,000."],
      finalAnswer: "10,000 PIN codes",
      explanation: "Each of the 4 positions independently has 10 choices (0-9), giving 10⁴ = 10,000."
    },
    {
      id: "battle_ex_5",
      title: "Example 5: Identical Objects - Letter Permutations of 'LEVEL'",
      question: "How many distinct permutations can be formed using all the letters in the word 'LEVEL'?",
      formula: "n! / (p! × q!)",
      substitution: "Total letters n=5; L appears 2 times, E appears 2 times, V appears 1 time → 5! / (2! × 2!)",
      calculation: ["5! = 120", "2! × 2! = 4", "120 / 4 = 30."],
      finalAnswer: "30 distinct permutations",
      explanation: "Permuting identical letters does not create a new string, so we divide by the factorials of their counts: 120 / 4 = 30."
    }
  ]
};
