// Combinatorics math utilities with step-by-step expansion and safety checks

export interface CalculationResult {
  success: boolean;
  conceptName: string;
  formulaTex: string;
  substitutedTex: string;
  steps: string[];
  finalAnswer: string;
  warning?: string;
  error?: string;
}

export function bigIntFactorial(n: bigint): bigint {
  if (n < 0n) throw new Error("Factorial undefined for negative numbers");
  if (n === 0n || n === 1n) return 1n;
  let res = 1n;
  for (let i = 2n; i <= n; i++) {
    res *= i;
  }
  return res;
}

export function calculateFactorial(n: number): CalculationResult {
  if (!Number.isInteger(n) || n < 0) {
    return {
      success: false,
      conceptName: "Factorial",
      formulaTex: "n!",
      substitutedTex: "",
      steps: [],
      finalAnswer: "",
      error: "Input n must be a non-negative integer (n ≥ 0)."
    };
  }

  if (n > 100) {
    return {
      success: false,
      conceptName: "Factorial",
      formulaTex: "n!",
      substitutedTex: `${n}!`,
      steps: [],
      finalAnswer: "",
      error: "Input too large for exact calculation. Please choose n ≤ 100 to prevent CPU freeze."
    };
  }

  const steps: string[] = [];
  if (n === 0) {
    steps.push("0! is the empty product, defined axiomatically as 1.");
    steps.push("Recurrence verification: 1! = 1 × 0! ⇒ 1 = 1 × 0! ⇒ 0! = 1.");
    return {
      success: true,
      conceptName: "Factorial",
      formulaTex: "0! = 1",
      substitutedTex: "0!",
      steps,
      finalAnswer: "1"
    };
  }

  if (n === 1) {
    return {
      success: true,
      conceptName: "Factorial",
      formulaTex: "1! = 1",
      substitutedTex: "1!",
      steps: ["1! = 1."],
      finalAnswer: "1"
    };
  }

  const expansionParts: string[] = [];
  for (let i = n; i >= 1; i--) {
    expansionParts.push(i.toString());
  }
  steps.push(`Expansion: ${n}! = ${expansionParts.slice(0, 8).join(" × ")}${n > 8 ? " × ... × 1" : ""}`);

  const val = bigIntFactorial(BigInt(n));
  let warning: string | undefined;
  if (n > 20) {
    warning = "Note: For n > 20, standard JavaScript IEEE 754 floating point numbers lose precision. BigInt was used to ensure 100% exact integer precision.";
  }

  return {
    success: true,
    conceptName: "Factorial",
    formulaTex: "n! = n × (n - 1) × ... × 1",
    substitutedTex: `${n}!`,
    steps,
    finalAnswer: val.toString(),
    warning
  };
}

export function calculatePermutationNoRep(n: number, r: number): CalculationResult {
  if (!Number.isInteger(n) || !Number.isInteger(r) || n < 0 || r < 0) {
    return {
      success: false,
      conceptName: "Permutation Without Repetition",
      formulaTex: "{}^nP_r = \\frac{n!}{(n - r)!}",
      substitutedTex: "",
      steps: [],
      finalAnswer: "",
      error: "Both n and r must be non-negative integers."
    };
  }

  if (r > n) {
    return {
      success: false,
      conceptName: "Permutation Without Repetition",
      formulaTex: "{}^nP_r = \\frac{n!}{(n - r)!}",
      substitutedTex: `{}^{${n}}P_{${r}}`,
      steps: [
        `Cannot select r = ${r} distinct items from a set of size n = ${n}.`,
        "Because repetition is forbidden, the number of ways is 0."
      ],
      finalAnswer: "0",
      error: "Constraint violation: r cannot be strictly greater than n (r ≤ n required)."
    };
  }

  const steps: string[] = [];
  steps.push(`Apply formula: {}^{${n}}P_{${r}} = \\frac{${n}!}{( ${n} - ${r} )!} = \\frac{${n}!}{( ${n - r} )!}`);

  const factors: string[] = [];
  let cur = BigInt(n);
  let total = 1n;
  for (let i = 0; i < r; i++) {
    factors.push(cur.toString());
    total *= cur;
    cur -= 1n;
  }

  if (r === 0) {
    steps.push(`Choosing 0 items yields 1 empty sequence: {}^{${n}}P_0 = 1.`);
  } else {
    steps.push(`Sequential slot multiplication (${r} factors): ${factors.join(" × ")}`);
  }

  return {
    success: true,
    conceptName: "Permutation Without Repetition",
    formulaTex: "{}^nP_r = \\frac{n!}{(n - r)!}",
    substitutedTex: `{}^{${n}}P_{${r}} = \\frac{${n}!}{( ${n - r} )!}`,
    steps,
    finalAnswer: total.toString()
  };
}

export function calculateCombinationNoRep(n: number, r: number): CalculationResult {
  if (!Number.isInteger(n) || !Number.isInteger(r) || n < 0 || r < 0) {
    return {
      success: false,
      conceptName: "Combination Without Repetition",
      formulaTex: "{}^nC_r = \\binom{n}{r} = \\frac{n!}{r!(n - r)!}",
      substitutedTex: "",
      steps: [],
      finalAnswer: "",
      error: "Both n and r must be non-negative integers."
    };
  }

  if (r > n) {
    return {
      success: false,
      conceptName: "Combination Without Repetition",
      formulaTex: "{}^nC_r = \\frac{n!}{r!(n - r)!}",
      substitutedTex: `{}^{${n}}C_{${r}}`,
      steps: [
        `Cannot form an unordered subset of size r = ${r} from a set of size n = ${n}.`,
        "Combinations equal 0."
      ],
      finalAnswer: "0",
      error: "Constraint violation: r cannot exceed n (r ≤ n required)."
    };
  }

  const steps: string[] = [];
  const effectiveR = r > n - r ? n - r : r;
  steps.push(`Formula: \\binom{${n}}{${r}} = \\frac{${n}!}{${r}! \\times ( ${n} - ${r} )!} = \\frac{${n}!}{${r}! \\times ${n - r}!}`);
  if (r !== effectiveR) {
    steps.push(`By symmetry property: \\binom{${n}}{${r}} = \\binom{${n}}{${n - r}} = \\binom{${n}}{${effectiveR}}.`);
  }

  let num = 1n;
  let den = 1n;
  const numFactors: string[] = [];
  const denFactors: string[] = [];
  for (let i = 1; i <= effectiveR; i++) {
    const nFactor = BigInt(n - i + 1);
    const dFactor = BigInt(i);
    num *= nFactor;
    den *= dFactor;
    numFactors.push(nFactor.toString());
    denFactors.push(dFactor.toString());
  }

  if (effectiveR > 0) {
    steps.push(`Numerator: ${numFactors.join(" × ")} = ${num.toString()}`);
    steps.push(`Denominator: ${denFactors.join(" × ")} = ${den.toString()}`);
  }
  const answer = den === 0n ? 1n : num / den;
  steps.push(`Divide Numerator by Denominator: ${num.toString()} / ${den.toString()} = ${answer.toString()}`);

  return {
    success: true,
    conceptName: "Combination Without Repetition",
    formulaTex: "\\binom{n}{r} = \\frac{n!}{r!(n - r)!}",
    substitutedTex: `\\binom{${n}}{${r}} = \\frac{${n}!}{${r}! \\times ${n - r}!}`,
    steps,
    finalAnswer: answer.toString()
  };
}

export function calculatePermutationWithRep(n: number, r: number): CalculationResult {
  if (!Number.isInteger(n) || !Number.isInteger(r) || n < 1 || r < 0) {
    return {
      success: false,
      conceptName: "Permutation With Repetition Allowed",
      formulaTex: "n^r",
      substitutedTex: "",
      steps: [],
      finalAnswer: "",
      error: "Base n must be a positive integer (n ≥ 1) and r must be a non-negative integer (r ≥ 0)."
    };
  }

  if (r > 60 && n > 2) {
    return {
      success: false,
      conceptName: "Permutation With Repetition Allowed",
      formulaTex: "n^r",
      substitutedTex: `${n}^{${r}}`,
      steps: [],
      finalAnswer: "",
      error: "Result exceeds reasonable computation limits. Please choose smaller exponents."
    };
  }

  const steps: string[] = [];
  steps.push(`Each of the ${r} positions independently has ${n} available choices.`);
  steps.push(`Total arrangements = \\underbrace{${n} \\times ${n} \\times \\dots \\times ${n}}_{${r} \\text{ times}} = ${n}^{${r}}`);

  let ans = 1n;
  const bigN = BigInt(n);
  for (let i = 0; i < r; i++) {
    ans *= bigN;
  }
  steps.push(`Evaluation: ${n}^{${r}} = ${ans.toString()}`);

  return {
    success: true,
    conceptName: "Permutation With Repetition Allowed",
    formulaTex: "n^r",
    substitutedTex: `${n}^{${r}}`,
    steps,
    finalAnswer: ans.toString()
  };
}

export function calculateCombinationWithRep(n: number, r: number): CalculationResult {
  if (!Number.isInteger(n) || !Number.isInteger(r) || n < 1 || r < 0) {
    return {
      success: false,
      conceptName: "Combination With Repetition (Stars & Bars)",
      formulaTex: "\\binom{n + r - 1}{r} = \\frac{(n + r - 1)!}{r!(n - 1)!}",
      substitutedTex: "",
      steps: [],
      finalAnswer: "",
      error: "Types n must be ≥ 1 and selected items r must be ≥ 0."
    };
  }

  const totalSlots = n + r - 1;
  const steps: string[] = [];
  steps.push(`Stars and Bars setup: Selecting ${r} items from ${n} categories.`);
  steps.push(`Represent selection as ${r} stars (★) and ${n - 1} partition bars (|).`);
  steps.push(`Total symbols = r + (n - 1) = ${r} + (${n} - 1) = ${totalSlots}.`);
  steps.push(`Choose ${r} positions for stars: \\binom{${totalSlots}}{${r}} = \\frac{${totalSlots}!}{${r}! \\times ( ${n} - 1 )!} = \\frac{${totalSlots}!}{${r}! \\times ${n - 1}!}`);

  const combRes = calculateCombinationNoRep(totalSlots, r);
  if (!combRes.success) {
    return combRes;
  }

  steps.push(...combRes.steps);

  return {
    success: true,
    conceptName: "Combination With Repetition (Stars & Bars)",
    formulaTex: "\\binom{n + r - 1}{r}",
    substitutedTex: `\\binom{${n} + ${r} - 1}{${r}} = \\binom{${totalSlots}}{${r}}`,
    steps,
    finalAnswer: combRes.finalAnswer
  };
}

export function calculateCircularPerm(n: number, isFlippable: boolean): CalculationResult {
  if (!Number.isInteger(n) || n < 1) {
    return {
      success: false,
      conceptName: "Circular Permutations",
      formulaTex: "(n - 1)!",
      substitutedTex: "",
      steps: [],
      finalAnswer: "",
      error: "Number of objects n must be an integer ≥ 1."
    };
  }

  const steps: string[] = [];
  if (n === 1) {
    return {
      success: true,
      conceptName: "Circular Permutations",
      formulaTex: "(1 - 1)! = 0! = 1",
      substitutedTex: "(1 - 1)!",
      steps: ["A single object in a circle has only 1 trivial arrangement."],
      finalAnswer: "1"
    };
  }

  steps.push(`Linear arrangements of ${n} objects = ${n}!`);
  steps.push(`Because the circle can be rotated into ${n} equivalent positions, divide by ${n}: ${n}! / ${n} = (${n} - 1)! = ${n - 1}!`);

  const factRes = calculateFactorial(n - 1);
  if (!factRes.success) return factRes;

  let finalVal = BigInt(factRes.finalAnswer);
  if (isFlippable) {
    steps.push(`Because the arrangement is flippable in 3D (necklace / keyring), clockwise and counter-clockwise are identical.`);
    steps.push(`Divide by 2: ${finalVal.toString()} / 2 = ${(finalVal / 2n).toString()}`);
    finalVal = finalVal / 2n;
  }

  return {
    success: true,
    conceptName: isFlippable ? "Circular Permutations (Flippable / Dihedral)" : "Circular Permutations (Planar Round Table)",
    formulaTex: isFlippable ? "\\frac{(n - 1)!}{2}" : "(n - 1)!",
    substitutedTex: isFlippable ? `\\frac{(${n} - 1)!}{2} = \\frac{${n - 1}!}{2}` : `(${n} - 1)! = ${n - 1}!`,
    steps,
    finalAnswer: finalVal.toString()
  };
}

export function calculateIdenticalObjects(counts: number[]): CalculationResult {
  if (counts.length === 0 || counts.some((c) => !Number.isInteger(c) || c < 1)) {
    return {
      success: false,
      conceptName: "Permutations of Objects With Identical Items",
      formulaTex: "\\frac{n!}{n_1! \\times n_2! \\times \\cdots \\times n_k!}",
      substitutedTex: "",
      steps: [],
      finalAnswer: "",
      error: "All group multiplicities must be positive integers (n_i ≥ 1)."
    };
  }

  const n = counts.reduce((acc, c) => acc + c, 0);
  const steps: string[] = [];
  steps.push(`Total objects n = ${counts.join(" + ")} = ${n}.`);
  steps.push(`Multiplicities: [${counts.join(", ")}].`);

  const num = bigIntFactorial(BigInt(n));
  let den = 1n;
  const denParts: string[] = [];
  for (const c of counts) {
    const f = bigIntFactorial(BigInt(c));
    den *= f;
    denParts.push(`${c}! (${f})`);
  }

  steps.push(`Numerator: ${n}! = ${num.toString()}`);
  steps.push(`Denominator: ${denParts.join(" × ")} = ${den.toString()}`);
  const ans = num / den;
  steps.push(`Final division: ${num.toString()} / ${den.toString()} = ${ans.toString()}`);

  return {
    success: true,
    conceptName: "Permutations of Objects With Identical Items",
    formulaTex: "\\frac{n!}{n_1! \\times n_2! \\times \\cdots \\times n_k!}",
    substitutedTex: `\\frac{${n}!}{${counts.map((c) => `${c}!`).join(" \\times ")}}`,
    steps,
    finalAnswer: ans.toString()
  };
}
