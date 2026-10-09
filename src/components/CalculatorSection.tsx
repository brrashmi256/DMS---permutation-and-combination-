import React, { useState, useEffect } from "react";
import {
  calculateFactorial,
  calculatePermutationNoRep,
  calculateCombinationNoRep,
  calculatePermutationWithRep,
  calculateCombinationWithRep,
  calculateCircularPerm,
  calculateIdenticalObjects,
  CalculationResult
} from "../utils/combinatoricsMath";
import { Calculator, AlertCircle, CheckCircle2, RotateCcw } from "lucide-react";

type CalcMode =
  | "factorial"
  | "perm_no_rep"
  | "comb_no_rep"
  | "perm_rep"
  | "comb_rep"
  | "circular"
  | "identical";

export const CalculatorSection: React.FC = () => {
  const [mode, setMode] = useState<CalcMode>("factorial");
  const [nVal, setNVal] = useState<number>(5);
  const [rVal, setRVal] = useState<number>(3);
  const [isFlippable, setIsFlippable] = useState<boolean>(false);
  const [multisetInput, setMultisetInput] = useState<string>("3, 2, 1");
  const [result, setResult] = useState<CalculationResult | null>(null);

  const performCalculation = () => {
    switch (mode) {
      case "factorial":
        setResult(calculateFactorial(nVal));
        break;
      case "perm_no_rep":
        setResult(calculatePermutationNoRep(nVal, rVal));
        break;
      case "comb_no_rep":
        setResult(calculateCombinationNoRep(nVal, rVal));
        break;
      case "perm_rep":
        setResult(calculatePermutationWithRep(nVal, rVal));
        break;
      case "comb_rep":
        setResult(calculateCombinationWithRep(nVal, rVal));
        break;
      case "circular":
        setResult(calculateCircularPerm(nVal, isFlippable));
        break;
      case "identical": {
        const counts = multisetInput
          .split(",")
          .map((s) => parseInt(s.trim(), 10))
          .filter((v) => !isNaN(v));
        setResult(calculateIdenticalObjects(counts));
        break;
      }
    }
  };

  useEffect(() => {
    performCalculation();
  }, [mode, nVal, rVal, isFlippable, multisetInput]);

  return (
    <div className="space-y-8 py-6">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-xs font-semibold text-indigo-600 dark:text-indigo-400">
          <span>Mathematical Engine</span>
          <span aria-hidden="true">·</span>
          <span>Arbitrary-Precision Combinatorics</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mt-1">
          Interactive Formula Calculator
        </h1>
        <p className="text-sm text-slate-600 dark:text-slate-300 mt-1 max-w-3xl">
          Compute exact factorial, permutation, and combination values with full algebraic expansions.
          All calculations are verified and backed by arbitrary-precision BigInt arithmetic.
        </p>
      </div>

      {/* Mode Selector */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2">
        {[
          { id: "factorial", label: "Factorial", symbol: "n!" },
          { id: "perm_no_rep", label: "Permutation", symbol: "nPr" },
          { id: "comb_no_rep", label: "Combination", symbol: "nCr" },
          { id: "perm_rep", label: "Perm. with Rep", symbol: "n^r" },
          { id: "comb_rep", label: "Stars & Bars", symbol: "n+r-1Cr" },
          { id: "circular", label: "Circular", symbol: "(n-1)!" },
          { id: "identical", label: "Identical Items", symbol: "n! / ∏ni!" }
        ].map((m) => (
          <button
            key={m.id}
            onClick={() => setMode(m.id as CalcMode)}
            className={`p-3 rounded-xl text-left border transition-all ${
              mode === m.id
                ? "bg-indigo-600 text-white border-indigo-600 shadow-md"
                : "bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-slate-400"
            }`}
          >
            <div className="text-[11px] font-medium opacity-80">{m.label}</div>
            <div className="text-sm font-mono font-bold mt-0.5">{m.symbol}</div>
          </button>
        ))}
      </div>

      {/* Calculator Workspace Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Input Controls Deck */}
        <div className="lg:col-span-5 p-6 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 space-y-5 shadow-sm">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-700">
            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-white flex items-center gap-2">
              <Calculator className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
              Parameter Controls
            </h2>
            <button
              onClick={() => {
                setNVal(5);
                setRVal(3);
                setIsFlippable(false);
                setMultisetInput("3, 2, 1");
              }}
              className="text-xs text-slate-500 hover:text-slate-800 dark:hover:text-white flex items-center gap-1"
            >
              <RotateCcw className="w-3 h-3" /> Reset
            </button>
          </div>

          {/* Mode-Specific Input Fields */}
          {mode !== "identical" ? (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Total Objects (n):
                </label>
                <input
                  type="number"
                  min={mode === "perm_rep" || mode === "circular" ? 1 : 0}
                  max={mode === "perm_rep" ? 50 : 100}
                  value={nVal}
                  onChange={(e) => setNVal(parseInt(e.target.value, 10) || 0)}
                  className="w-full px-3.5 py-2 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white font-mono text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                />
                <span className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 block">
                  {mode === "circular"
                    ? "Distinct guests or beads around the circle"
                    : mode === "perm_rep"
                    ? "Available symbol choices per slot"
                    : "Total distinct items in source set"}
                </span>
              </div>

              {mode !== "factorial" && mode !== "circular" && (
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Positions / Selections (r):
                  </label>
                  <input
                    type="number"
                    min="0"
                    max={mode === "perm_rep" ? 40 : 100}
                    value={rVal}
                    onChange={(e) => setRVal(parseInt(e.target.value, 10) || 0)}
                    className="w-full px-3.5 py-2 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white font-mono text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  />
                  <span className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 block">
                    {mode === "perm_rep"
                      ? "Length of the sequence or number of slots"
                      : "Items to select or arrange"}
                  </span>
                </div>
              )}

              {mode === "circular" && (
                <div className="pt-2">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={isFlippable}
                      onChange={(e) => setIsFlippable(e.target.checked)}
                      className="w-4 h-4 text-indigo-600 rounded border-slate-300 focus:ring-indigo-500"
                    />
                    <div>
                      <span className="text-xs font-semibold text-slate-800 dark:text-slate-200 block">
                        Flippable in 3D Space (Necklace / Keyring)
                      </span>
                      <span className="text-[11px] text-slate-500 dark:text-slate-400 block">
                        When enabled, clockwise and counter-clockwise are treated as identical: divides by 2.
                      </span>
                    </div>
                  </label>
                </div>
              )}
            </div>
          ) : (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Item Group Multiplicities (comma-separated):
                </label>
                <input
                  type="text"
                  value={multisetInput}
                  onChange={(e) => setMultisetInput(e.target.value)}
                  placeholder="e.g., 3, 2, 1"
                  className="w-full px-3.5 py-2 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white font-mono text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                />
                <span className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 block">
                  Example for BANANA: 3 (for A), 2 (for N), 1 (for B) = "3, 2, 1".
                </span>
              </div>

              {/* Helpful presets */}
              <div className="space-y-1.5 pt-1">
                <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block">
                  Curriculum Word Presets:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {[
                    { label: "BANANA (3,2,1)", val: "3, 2, 1" },
                    { label: "LEVEL (2,2,1)", val: "2, 2, 1" },
                    { label: "MISSISSIPPI (4,4,2,1)", val: "4, 4, 2, 1" },
                    { label: "STATISTICS (3,3,2,1,1)", val: "3, 3, 2, 1, 1" }
                  ].map((preset) => (
                    <button
                      key={preset.label}
                      onClick={() => setMultisetInput(preset.val)}
                      className="px-2 py-1 text-[11px] font-mono rounded bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-300 transition-colors"
                    >
                      {preset.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Quick preset buttons */}
          {mode !== "identical" && (
            <div className="pt-2 border-t border-slate-100 dark:border-slate-700 space-y-1.5">
              <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block">
                Standard Test Values:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {[
                  { label: "5, 3", n: 5, r: 3 },
                  { label: "10, 4", n: 10, r: 4 },
                  { label: "7, 2", n: 7, r: 2 },
                  { label: "6, 6", n: 6, r: 6 }
                ].map((p, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      setNVal(p.n);
                      setRVal(p.r);
                    }}
                    className="px-2 py-1 text-[11px] font-mono rounded bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-300 transition-colors"
                  >
                    n={p.n}, r={p.r}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right: Step-by-Step Mathematical Output Deck */}
        <div className="lg:col-span-7 p-6 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 space-y-6 shadow-sm flex flex-col justify-between">
          <div className="space-y-5">
            {/* Concept & Formula Heading */}
            <div className="flex items-start justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-700">
              <div>
                <span className="text-xs font-semibold text-indigo-600 dark:text-indigo-400">
                  Step 1 &amp; 2: Selected Concept &amp; Formula
                </span>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                  {result?.conceptName}
                </h3>
              </div>
              <div className="text-right font-mono font-bold text-indigo-600 dark:text-indigo-400 text-base sm:text-lg">
                {result?.formulaTex}
              </div>
            </div>

            {/* Error Message if any */}
            {result?.error && (
              <div className="p-4 rounded-xl bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-800 text-rose-800 dark:text-rose-200 text-xs flex items-start gap-2.5">
                <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold block">Calculation Error:</span>
                  {result.error}
                </div>
              </div>
            )}

            {/* Substituted Expression */}
            {result?.substitutedTex && (
              <div className="space-y-1">
                <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 block">
                  Step 3: Substituted Numerical Expression
                </span>
                <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 font-mono text-sm text-slate-900 dark:text-white">
                  {result.substitutedTex}
                </div>
              </div>
            )}

            {/* Step-by-Step Expansion */}
            {result?.steps && result.steps.length > 0 && (
              <div className="space-y-1.5">
                <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 block">
                  Step 4: Step-by-Step Arithmetic Breakdown
                </span>
                <div className="p-3.5 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 space-y-1.5 font-mono text-xs text-slate-800 dark:text-slate-200">
                  {result.steps.map((st, idx) => (
                    <div key={idx} className="leading-relaxed">
                      ▸ {st}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Precision Warning */}
            {result?.warning && (
              <div className="p-3 rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/40 text-amber-800 dark:text-amber-200 text-xs">
                {result.warning}
              </div>
            )}
          </div>

          {/* Step 5: Final Answer Box */}
          {result?.success && (
            <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 flex items-center justify-between">
              <div>
                <span className="text-xs uppercase tracking-wider font-bold text-emerald-800 dark:text-emerald-400 block">
                  Step 5: Exact Numerical Result
                </span>
                <div className="text-xl sm:text-2xl font-black font-mono text-emerald-700 dark:text-emerald-300 break-all">
                  {result.finalAnswer}
                </div>
              </div>
              <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
