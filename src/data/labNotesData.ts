export interface LabNoteSection {
  title: string;
  courseCode: string;
  topic: string;
  aim: string;
  learningObjectives: string[];
  theoryOverview: string[];
  importantFormulae: { name: string; formula: string; purpose: string }[];
  experimentalObservations: {
    activity: string;
    parametersTested: string;
    observedResult: string;
    theoreticalValidation: string;
    inference: string;
  }[];
  pedagogicalTakeaways: string[];
  conclusion: string;
}

export const LAB_RECORD_DATA: LabNoteSection = {
  title: "Discrete Mathematical Structures Laboratory Record",
  courseCode: "21CS36 / 18CS36 (DMS — 3rd Semester B.E. CSE/ISE)",
  topic: "Combinatorics: Comprehensive Study and Simulation of Permutations and Combinations",
  aim: "To experimentally investigate, verify, and document the combinatorial principles governing ordered and unordered finite set partitions, factorials, permutations, combinations, repetition constraints, circular invariance, and multiset permutations through interactive algorithmic simulations.",
  learningObjectives: [
    "Differentiate unambiguously between ordered arrangements (permutations) and unordered selections (combinations) across discrete problem domains.",
    "Formulate and compute exact states for linear, circular, and multiset combinatorial structures without algebraic overcounting.",
    "Derive the Stars and Bars theorem for distributing identical items into distinct containers and integer partitions.",
    "Analyze rotational and reflective symmetries in circular topologies and calculate their group orbits.",
    "Develop algorithmic intuition for state space growth rates (n! vs n^r vs C(n,r)) relevant to computational complexity analysis."
  ],
  theoryOverview: [
    "The Rule of Product (Fundamental Principle of Counting) asserts that if a sequential procedure can be broken into k stages where stage i has n_i possible outcomes, the total number of distinct outcomes is n_1 × n_2 × ... × n_k.",
    "Permutations without repetition count injective mappings from an r-element set to an n-element set: nPr = n! / (n - r)!. Changing sequence order constitutes a distinct mapping.",
    "Combinations without repetition enumerate r-element subsets of an n-element set: nCr = n! / [r!(n - r)!]. Order within the subset is quotiented out by dividing by r!.",
    "Permutations with repetition represent unconstrained functions between finite sets, yielding n^r distinct assignments.",
    "Combinations with repetition (Stars and Bars) enumerate non-negative integer solutions to x1 + x2 + ... + xn = r, modeled as C(n + r - 1, r) binary sequences of r stars and n - 1 bars.",
    "Circular arrangements quotient out cyclic group rotations C_n, reducing linear arrangements from n! to (n - 1)!. For dihedral group symmetries D_n (flippable loops), reflections reduce the count to (n - 1)! / 2.",
    "Multinomial permutations correct for indistinguishable items by dividing n! by the product of the factorials of each element's multiplicity: n! / (n1! n2! ... nk!)."
  ],
  importantFormulae: [
    { name: "Factorial", formula: "n! = \\prod_{k=1}^n k \\quad (0! = 1)", purpose: "Total linear sequences of n distinct items." },
    { name: "Permutations (No Repetition)", formula: "{}^nP_r = \\frac{n!}{(n - r)!}", purpose: "Ordered arrangements of r distinct items from n." },
    { name: "Combinations (No Repetition)", formula: "{}^nC_r = \\frac{n!}{r!(n - r)!}", purpose: "Unordered subsets of r distinct items from n." },
    { name: "Permutations (With Repetition)", formula: "n^r", purpose: "Ordered sequences with independent repeated choices." },
    { name: "Combinations (With Repetition)", formula: "\\binom{n + r - 1}{r}", purpose: "Unordered multisets / Stars & Bars partitions." },
    { name: "Circular Permutations (Planar)", formula: "(n - 1)!", purpose: "Rotational invariance around a round table." },
    { name: "Circular Permutations (Flippable)", formula: "\\frac{(n - 1)!}{2}", purpose: "Rotational and reflective invariance (necklaces, keyrings)." },
    { name: "Multiset Permutations", formula: "\\frac{n!}{n_1! n_2! \\cdots n_k!}", purpose: "Arranging objects with repeated identical items." }
  ],
  experimentalObservations: [
    {
      activity: "Activity 1: Linear vs Circular Dance Formation Simulation",
      parametersTested: "Dancers n = 5 in a straight line vs dancers in a circle.",
      observedResult: "Straight line produced 120 unique formations. Circular formation produced exactly 24 unique formations.",
      theoreticalValidation: "Linear: 5! = 120. Circular: (5 - 1)! = 4! = 24. Ratio 120 / 24 = 5 = n (rotational symmetry factor).",
      inference: "Fixing one reference anchor eliminates the n-fold rotational equivalence on the circle."
    },
    {
      activity: "Activity 2: Permutation vs Combination Detective Challenge",
      parametersTested: "Selecting 3 students for distinct ranks (1st, 2nd, 3rd) vs selecting 3 students for a study committee.",
      observedResult: "Ranked selection yielded 60 outcomes for 5 candidates. Unranked committee yielded 10 outcomes.",
      theoreticalValidation: "5P3 = 60; 5C3 = 10. 5P3 = 3! × 5C3 = 6 × 10 = 60.",
      inference: "Permutations exceed combinations by a factor of exactly r! (the internal permutations of the selected subset)."
    },
    {
      activity: "Activity 3: Stars and Bars Partition Simulation",
      parametersTested: "Distributing 7 identical compute packets across 3 server buffers.",
      observedResult: "Algorithm generated exactly 36 valid allocation vectors (x1, x2, x3) where sum = 7.",
      theoreticalValidation: "C(n + r - 1, r) = C(3 + 7 - 1, 7) = C(9, 7) = C(9, 2) = (9 × 8) / 2 = 36.",
      inference: "Distributing r identical objects across n distinct categories is isomorphic to placing n - 1 dividers among r stars."
    },
    {
      activity: "Activity 4: Multiset Permutations of Repeated Letters",
      parametersTested: "Permuting letters of 'BANANA' (n = 6; B=1, A=3, N=2).",
      observedResult: "Total distinct printable anagrams generated: 60.",
      theoreticalValidation: "6! / (1! × 3! × 2!) = 720 / (1 × 6 × 2) = 720 / 12 = 60.",
      inference: "Indistinguishable duplicate items collapse 12 distinct permutation states into 1 visible state."
    }
  ],
  pedagogicalTakeaways: [
    "Interactive animation of physical objects reinforces the abstract algebraic derivation of factorials.",
    "Visualizing dancers rotating around a circle proves why rotating every dancer does not create a new relative neighbour sequence.",
    "Solving progressive hints trains disciplined problem decomposition before blindly applying formulas.",
    "Recognizing the fundamental question ('Does the order of components produce a distinct system state?') prevents 90% of student exam errors."
  ],
  conclusion:
    "Through comprehensive theoretical study, worked examples, and interactive multi-agent simulations, all fundamental combinatorial laws of Discrete Mathematical Structures have been verified. Permutations and combinations provide essential mathematical models for computer science, directly governing cryptographic key spaces, algorithm complexity, protocol state machines, and finite set theory."
};
