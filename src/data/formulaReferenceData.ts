export interface FormulaItem {
  concept: string;
  formula: string;
  whenToUse: string;
  assumptions: string;
  keyExample: string;
}

export const FORMULA_TABLE: FormulaItem[] = [
  {
    concept: "Factorial",
    formula: "n! = n \\times (n-1) \\times \\cdots \\times 1",
    whenToUse: "Arranging all n distinct items in a complete linear sequence.",
    assumptions: "Objects are distinct; order matters; no repetition allowed; 0! = 1.",
    keyExample: "Arranging 5 books on a shelf = 5! = 120."
  },
  {
    concept: "Permutation Without Repetition",
    formula: "{}^nP_r = \\frac{n!}{(n - r)!}",
    whenToUse: "Arranging r distinct items chosen from n available items where order matters.",
    assumptions: "0 \\le r \\le n; items are distinct; each item used at most once.",
    keyExample: "Electing President, VP, Secretary from 10 students = {}^{10}P_3 = 720."
  },
  {
    concept: "Combination Without Repetition",
    formula: "{}^nC_r = \\binom{n}{r} = \\frac{n!}{r!(n - r)!}",
    whenToUse: "Selecting an unordered group/team/subset of size r from n distinct items.",
    assumptions: "Order does not matter; items are distinct; each item chosen at most once.",
    keyExample: "Choosing a 3-person project team from 10 students = {}^{10}C_3 = 120."
  },
  {
    concept: "Permutation With Repetition",
    formula: "n^r",
    whenToUse: "Ordered sequence of length r where each position has n independent options.",
    assumptions: "Items can be reused freely; order matters; n is choices, r is slots.",
    keyExample: "4-digit security PIN from 10 digits = 10^4 = 10,000."
  },
  {
    concept: "Combination With Repetition (Stars & Bars)",
    formula: "\\binom{n + r - 1}{r} = \\frac{(n + r - 1)!}{r!(n - 1)!}",
    whenToUse: "Unordered selection of r items from n types, or distributing r identical items to n bins.",
    assumptions: "Order does not matter; item types can repeat; distributed items are identical.",
    keyExample: "Choosing 3 scoops from 5 ice-cream flavours = \\binom{5+3-1}{3} = \\binom{7}{3} = 35."
  },
  {
    concept: "Circular Permutation",
    formula: "(n - 1)! \\quad \\left[\\text{or } \\frac{(n - 1)!}{2} \\text{ if flip-symmetric}\\right]",
    whenToUse: "Arranging distinct objects in a closed loop/circle where rotations are equivalent.",
    assumptions: "Rotations are identical; divide by 2 for necklaces/keyrings (flippable in 3D).",
    keyExample: "6 delegates around a circular table = (6-1)! = 120."
  },
  {
    concept: "Permutation with Identical Items",
    formula: "\\frac{n!}{n_1! \\times n_2! \\times \\cdots \\times n_k!}",
    whenToUse: "Arranging a multiset of n items where some items are indistinguishable duplicates.",
    assumptions: "All n items used; n_i is the frequency of each duplicate group.",
    keyExample: "Arrangements of BANANA (6 letters, 3 A's, 2 N's) = 6! / (3! 2!) = 60."
  }
];

export interface DecisionStep {
  id: string;
  question: string;
  yesNext?: string;
  noNext?: string;
  resultFormula?: string;
  resultTitle?: string;
  explanation?: string;
}

export const DECISION_GUIDE = [
  {
    step: 1,
    title: "Does the order of items or position matter?",
    details:
      "Ask: Does changing who is first, second, or on the left create a completely different outcome? E.g., Gold vs Silver medal, or Passcode 123 vs 321 -> ORDER MATTERS (Permutation). E.g., choosing a committee, fruit bowl, or poker hand -> ORDER DOES NOT MATTER (Combination)."
  },
  {
    step: 2,
    title: "Can items or symbols be repeated?",
    details:
      "Ask: Can the same symbol appear multiple times (like repeated digits in a PIN or scoops of chocolate)? If YES with order -> n^r. If YES without order -> Stars & Bars \\binom{n+r-1}{r}. If NO -> standard nPr or nCr."
  },
  {
    step: 3,
    title: "Is the arrangement linear or circular?",
    details:
      "If items sit in a line with ends -> standard factorials or permutations. If items sit in a closed ring without a designated head of table -> Circular Permutation: (n-1)!. If the ring can be flipped over like a necklace -> divide by 2: (n-1)! / 2."
  },
  {
    step: 4,
    title: "Are any of the items identical or indistinguishable?",
    details:
      "If you are arranging all n items but letters repeat (like BANANA or MISSISSIPPI), divide total n! by the factorial of each frequency: \\frac{n!}{n_1! n_2! \\cdots n_k!}."
  }
];
