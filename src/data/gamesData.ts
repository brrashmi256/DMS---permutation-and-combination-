// Games configuration data for the 6 Animated Interactive Games

export interface DetectiveQuestion {
  id: string;
  scenario: string;
  clue: string;
  type: "permutation" | "combination";
  items: string[];
  sampleOrderA: string[];
  sampleOrderB: string[];
  correctAnswer: string;
  totalN: number;
  totalR: number;
  formula: string;
  calculatedValue: number;
  explanation: string;
}

export const DETECTIVE_QUESTIONS: DetectiveQuestion[] = [
  {
    id: "det_1",
    scenario: "Case #101: The Podium Mystery",
    clue: "At an athletics meet, three runners finish 1st, 2nd, and 3rd. Does awarding Gold to Alice and Silver to Bob represent the same outcome as awarding Gold to Bob and Silver to Alice?",
    type: "permutation",
    items: ["Runner Alice", "Runner Bob", "Runner Charlie"],
    sampleOrderA: ["Alice (Gold)", "Bob (Silver)", "Charlie (Bronze)"],
    sampleOrderB: ["Bob (Gold)", "Alice (Silver)", "Charlie (Bronze)"],
    correctAnswer: "permutation",
    totalN: 3,
    totalR: 3,
    formula: "n! = 3! = 6",
    calculatedValue: 6,
    explanation: "Permutation! The medals represent distinct ranks. Changing who receives Gold versus Silver creates a distinct podium result."
  },
  {
    id: "det_2",
    scenario: "Case #102: The Study Squad",
    clue: "A professor picks 3 students to form a collaborative study squad. If the professor calls {Meera, Rohan, Arjun} vs {Arjun, Meera, Rohan}, did the group composition change?",
    type: "combination",
    items: ["Meera", "Rohan", "Arjun"],
    sampleOrderA: ["Meera", "Rohan", "Arjun"],
    sampleOrderB: ["Arjun", "Meera", "Rohan"],
    correctAnswer: "combination",
    totalN: 5,
    totalR: 3,
    formula: "5C3 = 10",
    calculatedValue: 10,
    explanation: "Combination! In a study squad, all 3 members work together with equal status. The order in which names were called does not change the squad."
  },
  {
    id: "det_3",
    scenario: "Case #103: The Vault PIN",
    clue: "A bank vault requires a 4-digit code. Entering 4-7-2-9 unlocks the vault. Will entering 9-2-7-4 unlock the vault as well?",
    type: "permutation",
    items: ["Digit 4", "Digit 7", "Digit 2", "Digit 9"],
    sampleOrderA: ["4", "7", "2", "9"],
    sampleOrderB: ["9", "2", "7", "4"],
    correctAnswer: "permutation",
    totalN: 10,
    totalR: 4,
    formula: "10^4 = 10,000 (with rep) or 10P4 = 5,040",
    calculatedValue: 5040,
    explanation: "Permutation! Order matters critically in passcodes. The sequential order of the digits determines whether the lock opens."
  },
  {
    id: "det_4",
    scenario: "Case #104: Fruit Salad Recipe",
    clue: "A chef tosses apples, bananas, and strawberries into a salad bowl. Does putting apples in first change the salad compared to tossing strawberries in first?",
    type: "combination",
    items: ["Apple", "Banana", "Strawberry"],
    sampleOrderA: ["Apple", "Banana", "Strawberry"],
    sampleOrderB: ["Strawberry", "Apple", "Banana"],
    correctAnswer: "combination",
    totalN: 6,
    totalR: 3,
    formula: "6C3 = 20",
    calculatedValue: 20,
    explanation: "Combination! Once mixed in the bowl, all ingredients coexist simultaneously. Order of selection is irrelevant."
  },
  {
    id: "det_5",
    scenario: "Case #105: The Executive Board",
    clue: "From 8 company partners, one will be appointed CEO, one CFO, and one Chief Architect. Does role assignment care about order?",
    type: "permutation",
    items: ["Partner X (CEO)", "Partner Y (CFO)", "Partner Z (Architect)"],
    sampleOrderA: ["X as CEO", "Y as CFO", "Z as Architect"],
    sampleOrderB: ["Y as CEO", "X as CFO", "Z as Architect"],
    correctAnswer: "permutation",
    totalN: 8,
    totalR: 3,
    formula: "8P3 = 336",
    calculatedValue: 336,
    explanation: "Permutation! CEO, CFO, and Chief Architect are distinct positions with distinct duties."
  },
  {
    id: "det_6",
    scenario: "Case #106: Lottery Ticket Drawing",
    clue: "In a state lottery, 6 numbers are drawn from a drum of 49 balls. To claim the jackpot, you must have matched all 6 numbers on your card regardless of drawing sequence.",
    type: "combination",
    items: ["Ball 7", "Ball 14", "Ball 21", "Ball 35", "Ball 42", "Ball 49"],
    sampleOrderA: ["7, 14, 21, 35, 42, 49"],
    sampleOrderB: ["49, 21, 7, 42, 14, 35"],
    correctAnswer: "combination",
    totalN: 49,
    totalR: 6,
    formula: "49C6 = 13,983,816",
    calculatedValue: 13983816,
    explanation: "Combination! Lottery winning conditions depend only on the set of numbers drawn, not the chronological order of balls pulled."
  },
  {
    id: "det_7",
    scenario: "Case #107: Relay Race Running Order",
    clue: "A track team assigns 4 runners to the 4 legs of a 4x100m relay (Starter, Backstretch, Curve, Anchor). Does swapping the starter and anchor produce a different lineup?",
    type: "permutation",
    items: ["Leg 1 (Starter)", "Leg 2", "Leg 3", "Leg 4 (Anchor)"],
    sampleOrderA: ["Kiran (Leg 1)", "Vikram (Leg 4)"],
    sampleOrderB: ["Vikram (Leg 1)", "Kiran (Leg 4)"],
    correctAnswer: "permutation",
    totalN: 4,
    totalR: 4,
    formula: "4! = 24",
    calculatedValue: 24,
    explanation: "Permutation! Each leg has distinct strategic demands (e.g. explosive block start vs sprint finish)."
  },
  {
    id: "det_8",
    scenario: "Case #108: Book Bundle Deal",
    clue: "A bookstore offers a discount if you select any 4 books from a bargain table. Does the cashier care which book was placed on the counter first?",
    type: "combination",
    items: ["Algorithms", "Networks", "Databases", "Compilers"],
    sampleOrderA: ["Algorithms", "Networks", "Databases", "Compilers"],
    sampleOrderB: ["Compilers", "Databases", "Networks", "Algorithms"],
    correctAnswer: "combination",
    totalN: 10,
    totalR: 4,
    formula: "10C4 = 210",
    calculatedValue: 210,
    explanation: "Combination! You walk away with the exact same bundle of books regardless of pick order."
  },
  {
    id: "det_9",
    scenario: "Case #109: Flight Seating Assignment",
    clue: "Three passengers are boarding an aircraft and have seat tickets for 12A, 12B, and 12C. Does who gets the window seat (12A) matter?",
    type: "permutation",
    items: ["Seat 12A (Window)", "Seat 12B (Middle)", "Seat 12C (Aisle)"],
    sampleOrderA: ["Passenger 1 in 12A", "Passenger 2 in 12B"],
    sampleOrderB: ["Passenger 2 in 12A", "Passenger 1 in 12B"],
    correctAnswer: "permutation",
    totalN: 3,
    totalR: 3,
    formula: "3! = 6",
    calculatedValue: 6,
    explanation: "Permutation! Seat locations are unique physical positions; seating Passenger 1 in 12A vs 12B is completely distinct."
  },
  {
    id: "det_10",
    scenario: "Case #110: Hand of Poker Cards",
    clue: "A player is dealt 5 playing cards in poker. Does re-sorting the cards in hand by rank create a new hand?",
    type: "combination",
    items: ["Ace of Spades", "King of Hearts", "Queen of Clubs", "Jack of Diamonds", "10 of Spades"],
    sampleOrderA: ["A♠, K♥, Q♣, J♦, 10♠"],
    sampleOrderB: ["10♠, J♦, Q♣, K♥, A♠"],
    correctAnswer: "combination",
    totalN: 52,
    totalR: 5,
    formula: "52C5 = 2,598,960",
    calculatedValue: 2598960,
    explanation: "Combination! In card games, only the subset of cards held in your hand counts towards poker ranking."
  },
  {
    id: "det_11",
    scenario: "Case #111: Car Number Plate",
    clue: "License plate KA-01-AB-1234. If the digits read 4321 instead, is it registered to the same vehicle?",
    type: "permutation",
    items: ["1", "2", "3", "4"],
    sampleOrderA: ["1-2-3-4"],
    sampleOrderB: ["4-3-2-1"],
    correctAnswer: "permutation",
    totalN: 10,
    totalR: 4,
    formula: "10P4 or 10^4",
    calculatedValue: 10000,
    explanation: "Permutation! Number plates are ordered identification sequences."
  },
  {
    id: "det_12",
    scenario: "Case #112: Pizza Toppings",
    clue: "You select 3 pizza toppings from {Mushrooms, Olives, Jalapenos, Peppers}. The chef distributes them evenly on the cheese before baking.",
    type: "combination",
    items: ["Mushrooms", "Olives", "Jalapenos"],
    sampleOrderA: ["Mushrooms, Olives, Jalapenos"],
    sampleOrderB: ["Jalapenos, Mushrooms, Olives"],
    correctAnswer: "combination",
    totalN: 4,
    totalR: 3,
    formula: "4C3 = 4",
    calculatedValue: 4,
    explanation: "Combination! The toppings are co-present on the pizza; the order they were sprinkled does not create a different pizza recipe."
  },
  {
    id: "det_13",
    scenario: "Case #113: Dance Lead & Follower",
    clue: "Pairing two dancers where one is explicitly designated Lead and the other Follower. Does swapping who leads change the choreographic role?",
    type: "permutation",
    items: ["Dancer A (Lead)", "Dancer B (Follower)"],
    sampleOrderA: ["A leads, B follows"],
    sampleOrderB: ["B leads, A follows"],
    correctAnswer: "permutation",
    totalN: 2,
    totalR: 2,
    formula: "2! = 2",
    calculatedValue: 2,
    explanation: "Permutation! Lead and Follower are distinct functional roles."
  },
  {
    id: "det_14",
    scenario: "Case #114: Selecting Marbles from a Bag",
    clue: "Reaching blindly into a bag and pulling out 3 marbles at once to inspect their colors.",
    type: "combination",
    items: ["Red Marble", "Blue Marble", "Green Marble"],
    sampleOrderA: ["Red, Blue, Green"],
    sampleOrderB: ["Green, Red, Blue"],
    correctAnswer: "combination",
    totalN: 8,
    totalR: 3,
    formula: "8C3 = 56",
    calculatedValue: 56,
    explanation: "Combination! Drawing items simultaneously means there is no sequential order."
  },
  {
    id: "det_15",
    scenario: "Case #115: Chemical Synthesis Order",
    clue: "In organic chemistry, adding Acid before Water vs Water before Acid can cause an exothermic explosion! Does the addition sequence matter?",
    type: "permutation",
    items: ["Acid", "Water"],
    sampleOrderA: ["Acid into Water (Safe)"],
    sampleOrderB: ["Water into Acid (Violent reaction)"],
    correctAnswer: "permutation",
    totalN: 2,
    totalR: 2,
    formula: "2! = 2",
    calculatedValue: 2,
    explanation: "Permutation! Sequential operational order yields drastically different physical results."
  }
];

// Game 2: Arrangement Puzzle Levels
export interface ArrangementLevel {
  level: number;
  word: string;
  items: string[];
  totalArrangements: number;
  formula: string;
  hint: string;
}

export const ARRANGEMENT_LEVELS: ArrangementLevel[] = [
  {
    level: 1,
    word: "CAT",
    items: ["C", "A", "T"],
    totalArrangements: 6,
    formula: "3! = 3 × 2 × 1 = 6",
    hint: "Three distinct letters. Total arrangements = 3! = 6."
  },
  {
    level: 2,
    word: "MATH",
    items: ["M", "A", "T", "H"],
    totalArrangements: 24,
    formula: "4! = 4 × 3 × 2 × 1 = 24",
    hint: "Four distinct letters. Total arrangements = 4! = 24."
  },
  {
    level: 3,
    word: "DANCE",
    items: ["D", "A", "N", "C", "E"],
    totalArrangements: 120,
    formula: "5! = 5 × 4 × 3 × 2 × 1 = 120",
    hint: "Five distinct letters. 5! = 120 possible arrangements."
  },
  {
    level: 4,
    word: "CIPHER",
    items: ["C", "I", "P", "H", "E", "R"],
    totalArrangements: 720,
    formula: "6! = 6 × 5 × 4 × 3 × 2 × 1 = 720",
    hint: "Six distinct letters. 6! = 720 distinct permutations."
  },
  {
    level: 5,
    word: "DISCRETE",
    items: ["D", "I", "S", "C", "R", "E", "T", "E_2"], // contains repeated E's!
    totalArrangements: 20160,
    formula: "8! / 2! = 40,320 / 2 = 20,160",
    hint: "Word DISCRETE has 8 letters with E repeating 2 times: 8! / 2! = 20,160."
  }
];

// Game 3: Basket Challenges
export interface BasketChallenge {
  id: number;
  title: string;
  poolItems: { id: string; name: string; color: string; icon: string }[];
  requiredCount: number;
  formulaText: string;
  calculatedAnswer: number;
  explanation: string;
}

export const BASKET_CHALLENGES: BasketChallenge[] = [
  {
    id: 1,
    title: "Fresh Fruit Basket",
    poolItems: [
      { id: "apple", name: "Apple", color: "#EF4444", icon: "🍎" },
      { id: "banana", name: "Banana", color: "#F59E0B", icon: "🍌" },
      { id: "orange", name: "Orange", color: "#F97316", icon: "🍊" },
      { id: "grape", name: "Grape", color: "#8B5CF6", icon: "🍇" }
    ],
    requiredCount: 2,
    formulaText: "4C2 = (4 × 3) / 2 = 6",
    calculatedAnswer: 6,
    explanation: "Choosing 2 fruits out of 4 distinct fruits without caring about order yields 4C2 = 6 combinations."
  },
  {
    id: 2,
    title: "Gemstone Collection",
    poolItems: [
      { id: "ruby", name: "Ruby", color: "#DC2626", icon: "💎" },
      { id: "emerald", name: "Emerald", color: "#10B981", icon: "💎" },
      { id: "sapphire", name: "Sapphire", color: "#2563EB", icon: "💎" },
      { id: "topaz", name: "Topaz", color: "#F59E0B", icon: "💎" },
      { id: "amethyst", name: "Amethyst", color: "#9333EA", icon: "💎" }
    ],
    requiredCount: 3,
    formulaText: "5C3 = (5 × 4 × 3) / 6 = 10",
    calculatedAnswer: 10,
    explanation: "Selecting 3 gemstones from 5 distinct gems yields 5C3 = 10 unique collections."
  },
  {
    id: 3,
    title: "Library Book Loan",
    poolItems: [
      { id: "dms", name: "DMS", color: "#3B82F6", icon: "📘" },
      { id: "dsa", name: "DSA", color: "#10B981", icon: "📗" },
      { id: "os", name: "OS", color: "#F97316", icon: "📙" },
      { id: "dbms", name: "DBMS", color: "#8B5CF6", icon: "📕" },
      { id: "cn", name: "CN", color: "#EC4899", icon: "📓" },
      { id: "math", name: "Calculus", color: "#6366F1", icon: "📔" }
    ],
    requiredCount: 4,
    formulaText: "6C4 = 6C2 = (6 × 5) / 2 = 15",
    calculatedAnswer: 15,
    explanation: "Selecting 4 books from 6 yields 6C4 = 15 bundles. By symmetry, 6C4 = 6C2."
  },
  {
    id: 4,
    title: "Sports Ball Bag",
    poolItems: [
      { id: "soccer", name: "Soccer", color: "#374151", icon: "⚽" },
      { id: "basketball", name: "Basketball", color: "#EA580C", icon: "🏀" },
      { id: "tennis", name: "Tennis", color: "#84CC16", icon: "🎾" },
      { id: "volleyball", name: "Volleyball", color: "#F59E0B", icon: "🏐" },
      { id: "baseball", name: "Baseball", color: "#EF4444", icon: "⚾" }
    ],
    requiredCount: 2,
    formulaText: "5C2 = (5 × 4) / 2 = 10",
    calculatedAnswer: 10,
    explanation: "Choosing 2 sports balls from 5 yields 5C2 = 10 distinct equipment pairs."
  },
  {
    id: 5,
    title: "Musical Instruments Ensemble",
    poolItems: [
      { id: "guitar", name: "Guitar", color: "#B45309", icon: "🎸" },
      { id: "violin", name: "Violin", color: "#92400E", icon: "🎻" },
      { id: "drums", name: "Drums", color: "#475569", icon: "🥁" },
      { id: "piano", name: "Keyboards", color: "#0F172A", icon: "🎹" },
      { id: "flute", name: "Flute", color: "#D97706", icon: "🪈" },
      { id: "trumpet", name: "Trumpet", color: "#CA8A04", icon: "🎺" },
      { id: "sax", name: "Saxophone", color: "#EAB308", icon: "🎷" }
    ],
    requiredCount: 3,
    formulaText: "7C3 = (7 × 6 × 5) / 6 = 35",
    calculatedAnswer: 35,
    explanation: "Selecting 3 acoustic instruments from 7 gives 7C3 = 35 acoustic trios."
  }
];

// Game 4: DMS Escape Room Stations
export interface EscapeRoomStation {
  roomNumber: number;
  roomName: string;
  theme: string;
  puzzleDescription: string;
  question: string;
  inputPlaceholder: string;
  correctAnswer: string;
  hint: string;
  solution: string;
}

export const ESCAPE_ROOM_STATIONS: EscapeRoomStation[] = [
  {
    roomNumber: 1,
    roomName: "The Factorial Vault",
    theme: "Heavy Steel Dial Lock",
    puzzleDescription: "The digital keypad is locked. An inscription on the door reads: 'Enter the value of (6! / 4!) - 0! to calibrate the dial gear.'",
    question: "Calculate the exact numerical passcode: (6! / 4!) - 0!",
    inputPlaceholder: "Enter code...",
    correctAnswer: "29",
    hint: "6! / 4! = 6 × 5 = 30. Remember that 0! = 1.",
    solution: "6! / 4! = (6 × 5 × 4!) / 4! = 30. Since 0! = 1, 30 - 1 = 29."
  },
  {
    roomNumber: 2,
    roomName: "The Chamber of Permutations",
    theme: "Ranked Medal Chamber",
    puzzleDescription: "Five engraved pedestals stand empty. The chamber requires you to enter the number of ways to assign 3 distinct ancient artifacts to the top 3 pedestals.",
    question: "How many ways can 3 artifacts be arranged on 5 pedestals without repetition (5P3)?",
    inputPlaceholder: "Enter 5P3...",
    correctAnswer: "60",
    hint: "5P3 = 5! / (5 - 3)! = 5 × 4 × 3.",
    solution: "5P3 = 5 × 4 × 3 = 60 distinct assignments."
  },
  {
    roomNumber: 3,
    roomName: "The Council of Combinations",
    theme: "Golden Scales of Justice",
    puzzleDescription: "A circular gate is sealed by 6 mystical runes. You must pick an unordered set of 4 runes to balance the scale. How many combinations exist?",
    question: "Calculate the number of ways to choose 4 runes from 6 (6C4).",
    inputPlaceholder: "Enter 6C4...",
    correctAnswer: "15",
    hint: "6C4 = 6C2 = (6 × 5) / 2.",
    solution: "6C4 = (6 × 5 × 4 × 3) / (4 × 3 × 2 × 1) = 15."
  },
  {
    roomNumber: 4,
    roomName: "The Hall of Infinite Mirrors",
    theme: "Repeating Optical Array",
    puzzleDescription: "A light beam splits into 3 sensor receivers. Each receiver can be tuned to 4 distinct optical frequencies with repetition permitted.",
    question: "How many total frequency sequences are possible across the 3 sensors (4^3)?",
    inputPlaceholder: "Enter 4^3...",
    correctAnswer: "64",
    hint: "Each sensor independently has 4 choices: 4 × 4 × 4.",
    solution: "4^3 = 64 frequency states."
  },
  {
    roomNumber: 5,
    roomName: "The Circular Sanctum",
    theme: "The Round Table of Freedom",
    puzzleDescription: "The final door has 6 chairs arranged in a perfect circle around the exit portal. To unlock the escape pod, enter the number of circular seatings for 6 passengers.",
    question: "What is the number of circular permutations for 6 distinct passengers: (6 - 1)!?",
    inputPlaceholder: "Enter (6-1)!...",
    correctAnswer: "120",
    hint: "On a circle with rotations equivalent, formula is (n - 1)! = 5!.",
    solution: "(6 - 1)! = 5! = 120. The final vault unseals!"
  }
];

// Game 5: Counting Race Questions
export interface RaceHurdle {
  id: number;
  prompt: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export const RACE_HURDLES: RaceHurdle[] = [
  {
    id: 1,
    prompt: "Hurdle 1: What is the value of 4!?",
    options: ["12", "24", "48", "16"],
    correctIndex: 1,
    explanation: "4! = 4 × 3 × 2 × 1 = 24."
  },
  {
    id: 2,
    prompt: "Hurdle 2: Compute 6P2 (permutations of 6 taken 2 at a time).",
    options: ["30", "15", "36", "12"],
    correctIndex: 0,
    explanation: "6P2 = 6 × 5 = 30."
  },
  {
    id: 3,
    prompt: "Hurdle 3: Compute 6C2 (combinations of 6 taken 2 at a time).",
    options: ["30", "15", "12", "36"],
    correctIndex: 1,
    explanation: "6C2 = (6 × 5) / 2 = 15."
  },
  {
    id: 4,
    prompt: "Hurdle 4: How many 3-bit binary strings exist with repetition allowed?",
    options: ["6", "8", "9", "16"],
    correctIndex: 1,
    explanation: "2^3 = 8 binary strings (000 to 111)."
  },
  {
    id: 5,
    prompt: "Hurdle 5: How many ways can 4 people sit around a circular table?",
    options: ["24", "12", "6", "4"],
    correctIndex: 2,
    explanation: "Circular permutations = (4 - 1)! = 3! = 6."
  },
  {
    id: 6,
    prompt: "Hurdle 6: How many distinct arrangements of the word 'EGG' exist?",
    options: ["6", "3", "2", "1"],
    correctIndex: 1,
    explanation: "Word EGG has 3 letters with G repeating twice: 3! / 2! = 6 / 2 = 3."
  },
  {
    id: 7,
    prompt: "Hurdle 7: Solve for n if nC1 = 7.",
    options: ["1", "7", "14", "49"],
    correctIndex: 1,
    explanation: "nC1 = n. Thus n = 7."
  },
  {
    id: 8,
    prompt: "Hurdle 8: Non-negative integer solutions to x1 + x2 = 4:",
    options: ["4", "5", "8", "10"],
    correctIndex: 1,
    explanation: "C(2 + 4 - 1, 4) = C(5, 4) = 5 solutions: (0,4),(1,3),(2,2),(3,1),(4,0)."
  },
  {
    id: 9,
    prompt: "Hurdle 9: Value of 0! × 5!:",
    options: ["0", "120", "24", "1"],
    correctIndex: 1,
    explanation: "0! = 1, and 5! = 120. 1 × 120 = 120."
  },
  {
    id: 10,
    prompt: "Finish Line: Distinct arrangements of the word 'NOON':",
    options: ["24", "12", "6", "4"],
    correctIndex: 2,
    explanation: "NOON has 4 letters (two N's, two O's): 4! / (2! × 2!) = 24 / 4 = 6."
  }
];

// Game 6: Dance Formation Studio Configurations
export interface DancerCharacter {
  id: number;
  name: string;
  color: string;
  costume: string;
  hairColor: string;
}

export const DANCER_CHARACTERS: DancerCharacter[] = [
  { id: 1, name: "Aria", color: "#3B82F6", costume: "#2563EB", hairColor: "#1E293B" },
  { id: 2, name: "Bella", color: "#EC4899", costume: "#DB2777", hairColor: "#92400E" },
  { id: 3, name: "Cyrus", color: "#10B981", costume: "#059669", hairColor: "#0F172A" },
  { id: 4, name: "Dev", color: "#F59E0B", costume: "#D97706", hairColor: "#451A03" },
  { id: 5, name: "Elena", color: "#8B5CF6", costume: "#7C3AED", hairColor: "#78350F" },
  { id: 6, name: "Farhan", color: "#06B6D4", costume: "#0891B2", hairColor: "#1E293B" },
  { id: 7, name: "Gia", color: "#F43F5E", costume: "#E11D48", hairColor: "#172554" },
  { id: 8, name: "Hari", color: "#14B8A6", costume: "#0D9488", hairColor: "#312E81" },
  { id: 9, name: "Isha", color: "#A855F7", costume: "#9333EA", hairColor: "#450A0A" },
  { id: 10, name: "Jai", color: "#EAB308", costume: "#CA8A04", hairColor: "#020617" }
];
