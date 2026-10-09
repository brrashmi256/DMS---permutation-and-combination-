import React, { useState } from "react";
import { ARRANGEMENT_LAB_THEORY } from "../../data/newGamesData";
import { GameAcademicPanel } from "./GameAcademicPanel";
import { Move, RotateCcw, CheckCircle2, XCircle, HelpCircle, Trophy, Sparkles, ArrowRight, ShieldCheck, AlertCircle } from "lucide-react";

interface LabLevel {
  id: number;
  title: string;
  items: { id: string; name: string; color: string; label: string }[];
  rules: { id: string; text: string; validator: (arrangement: string[]) => boolean }[];
  totalValidCount: number;
  unrestrictedCount: number;
  formulaUsed: string;
  hint1: string;
  hint2: string;
  solutionDerivation: string;
}

const LAB_LEVELS: LabLevel[] = [
  {
    id: 1,
    title: "Level 1: Fixed Leading Position",
    items: [
      { id: "A", name: "Alice", color: "bg-indigo-600", label: "A" },
      { id: "B", name: "Bob", color: "bg-emerald-600", label: "B" },
      { id: "C", name: "Charlie", color: "bg-amber-600", label: "C" },
      { id: "D", name: "David", color: "bg-rose-600", label: "D" },
      { id: "E", name: "Emma", color: "bg-purple-600", label: "E" }
    ],
    rules: [
      {
        id: "r1",
        text: "Alice (A) must occupy the 1st position (Slot 1)",
        validator: (arr) => arr[0] === "A"
      }
    ],
    totalValidCount: 24,
    unrestrictedCount: 120,
    formulaUsed: "(n - 1)! = 4! = 24",
    hint1: "Alice is fixed in slot 1 (1 way). How many ways can the other 4 students be arranged?",
    hint2: "Remaining (5 - 1) = 4 students can arrange freely in 4! = 24 ways.",
    solutionDerivation: "Fixing A in Slot 1 leaves 4 open slots for {B, C, D, E}. Total valid arrangements = 1 × 4! = 24."
  },
  {
    id: 2,
    title: "Level 2: The Block Method (Adjacent Pair)",
    items: [
      { id: "A", name: "Alice", color: "bg-indigo-600", label: "A" },
      { id: "B", name: "Bob", color: "bg-emerald-600", label: "B" },
      { id: "C", name: "Charlie", color: "bg-amber-600", label: "C" },
      { id: "D", name: "David", color: "bg-rose-600", label: "D" },
      { id: "E", name: "Emma", color: "bg-purple-600", label: "E" }
    ],
    rules: [
      {
        id: "r1",
        text: "Bob (B) and Charlie (C) must stand together (adjacent)",
        validator: (arr) => {
          const idxB = arr.indexOf("B");
          const idxC = arr.indexOf("C");
          return idxB !== -1 && idxC !== -1 && Math.abs(idxB - idxC) === 1;
        }
      }
    ],
    totalValidCount: 48,
    unrestrictedCount: 120,
    formulaUsed: "(n - k + 1)! × k! = 4! × 2! = 48",
    hint1: "Treat [BC] as 1 single super-object. How many total units are there to arrange?",
    hint2: "There are 4 units ({[BC], A, D, E}) arranged in 4! ways. Don't forget B and C can swap internally in 2! ways.",
    solutionDerivation: "Units: [BC], A, D, E → 4 units. 4! = 24. Internal order within block: BC or CB (2! = 2). Total = 24 × 2 = 48."
  },
  {
    id: 3,
    title: "Level 3: Separation Restriction (Not Adjacent)",
    items: [
      { id: "A", name: "Alice", color: "bg-indigo-600", label: "A" },
      { id: "B", name: "Bob", color: "bg-emerald-600", label: "B" },
      { id: "C", name: "Charlie", color: "bg-amber-600", label: "C" },
      { id: "D", name: "David", color: "bg-rose-600", label: "D" },
      { id: "E", name: "Emma", color: "bg-purple-600", label: "E" }
    ],
    rules: [
      {
        id: "r1",
        text: "David (D) and Emma (E) CANNOT stand next to each other",
        validator: (arr) => {
          const idxD = arr.indexOf("D");
          const idxE = arr.indexOf("E");
          if (idxD === -1 || idxE === -1) return true;
          return Math.abs(idxD - idxE) > 1;
        }
      }
    ],
    totalValidCount: 72,
    unrestrictedCount: 120,
    formulaUsed: "Total - Together = 5! - (4! × 2!) = 120 - 48 = 72",
    hint1: "Use complementary counting: subtract the arrangements where D and E ARE together from total unrestricted arrangements.",
    hint2: "Total = 5! = 120. Together = 4! × 2! = 48. Calculate 120 - 48.",
    solutionDerivation: "Total unrestricted permutations = 5! = 120. Arrangements with [DE] together = 4! × 2! = 48. Valid arrangements = 120 - 48 = 72."
  },
  {
    id: 4,
    title: "Level 4: Triple Block Constraint",
    items: [
      { id: "A", name: "Red", color: "bg-rose-600", label: "R1" },
      { id: "B", name: "Red 2", color: "bg-rose-500", label: "R2" },
      { id: "C", name: "Red 3", color: "bg-rose-400", label: "R3" },
      { id: "D", name: "Blue", color: "bg-blue-600", label: "B1" },
      { id: "E", name: "Blue 2", color: "bg-blue-500", label: "B2" },
      { id: "F", name: "Green", color: "bg-emerald-600", label: "G1" }
    ],
    rules: [
      {
        id: "r1",
        text: "All three Red blocks (R1, R2, R3) must remain together in a single block",
        validator: (arr) => {
          const indices = [arr.indexOf("A"), arr.indexOf("B"), arr.indexOf("C")].sort((x, y) => x - y);
          if (indices.includes(-1)) return true;
          return indices[2] - indices[0] === 2 && indices[1] - indices[0] === 1;
        }
      }
    ],
    totalValidCount: 144,
    unrestrictedCount: 720,
    formulaUsed: "(n - k + 1)! × k! = (6 - 3 + 1)! × 3! = 4! × 3! = 144",
    hint1: "Treat the 3 Red blocks as 1 unit. How many units are there among the 6 distinct objects?",
    hint2: "Units to arrange: 4 units (4! = 24). Internal arrangements of 3 red blocks: 3! = 6.",
    solutionDerivation: "Treat [R1, R2, R3] as 1 block. Units: 1 block + 3 other items = 4 units. Arrange units: 4! = 24. Internal order: 3! = 6. Total = 24 × 6 = 144."
  },
  {
    id: 5,
    title: "Level 5: Dual Boundary Constraint",
    items: [
      { id: "A", name: "Vowel A", color: "bg-amber-600", label: "A" },
      { id: "B", name: "Vowel E", color: "bg-amber-500", label: "E" },
      { id: "C", name: "Consonant M", color: "bg-indigo-600", label: "M" },
      { id: "D", name: "Consonant T", color: "bg-indigo-500", label: "T" },
      { id: "E", name: "Consonant H", color: "bg-indigo-400", label: "H" },
      { id: "F", name: "Consonant S", color: "bg-indigo-700", label: "S" }
    ],
    rules: [
      {
        id: "r1",
        text: "Both end positions (Slot 1 and Slot 6) must be occupied by Vowels (A or E)",
        validator: (arr) => {
          const slot1 = arr[0];
          const slot6 = arr[arr.length - 1];
          return (slot1 === "A" && slot6 === "B") || (slot1 === "B" && slot6 === "A");
        }
      }
    ],
    totalValidCount: 48,
    unrestrictedCount: 720,
    formulaUsed: "(Vowel slots) × (Consonant slots) = 2! × 4! = 2 × 24 = 48",
    hint1: "Fill the restricted ends first: 2 vowels for 2 slots (2! ways).",
    hint2: "Then fill the 4 inner slots with the 4 consonants (4! ways). Multiply: 2! × 4!.",
    solutionDerivation: "Positions 1 and 6 filled by {A, E} in 2! = 2 ways. Positions 2, 3, 4, 5 filled by {M, T, H, S} in 4! = 24 ways. Total = 2 × 24 = 48."
  }
];

export const ArrangementLabGame: React.FC = () => {
  const [levelIndex, setLevelIndex] = useState<number>(0);
  const [userCalculation, setUserCalculation] = useState<string>("");
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [isCorrect, setIsCorrect] = useState<boolean>(false);
  const [revealedHintIndex, setRevealedHintIndex] = useState<number>(0);
  const [score, setScore] = useState<number>(0);
  const [streak, setStreak] = useState<number>(0);

  const level = LAB_LEVELS[levelIndex];

  // Interactive arrangement board state
  const [currentSlots, setCurrentSlots] = useState<string[]>(level.items.map((it) => it.id));
  const [selectedItemForSwap, setSelectedItemForSwap] = useState<number | null>(null);

  const handleSlotClick = (index: number) => {
    if (selectedItemForSwap === null) {
      setSelectedItemForSwap(index);
    } else {
      const nextArr = [...currentSlots];
      const temp = nextArr[selectedItemForSwap];
      nextArr[selectedItemForSwap] = nextArr[index];
      nextArr[index] = temp;
      setCurrentSlots(nextArr);
      setSelectedItemForSwap(null);
    }
  };

  const handleShuffle = () => {
    const shuffled = [...currentSlots].sort(() => Math.random() - 0.5);
    setCurrentSlots(shuffled);
    setSelectedItemForSwap(null);
  };

  const handleCheckAnswer = () => {
    if (submitted) return;
    const val = parseInt(userCalculation.trim(), 10);
    const correct = val === level.totalValidCount;
    setIsCorrect(correct);
    setSubmitted(true);

    if (correct) {
      const pts = 100 - revealedHintIndex * 20 + streak * 15;
      setScore((s) => s + Math.max(pts, 40));
      setStreak((st) => st + 1);
    } else {
      setStreak(0);
    }
  };

  const handleNextLevel = () => {
    const next = (levelIndex + 1) % LAB_LEVELS.length;
    setLevelIndex(next);
    setCurrentSlots(LAB_LEVELS[next].items.map((it) => it.id));
    setUserCalculation("");
    setSubmitted(false);
    setIsCorrect(false);
    setRevealedHintIndex(0);
    setSelectedItemForSwap(null);
  };

  const handleResetLevel = () => {
    setCurrentSlots(level.items.map((it) => it.id));
    setUserCalculation("");
    setSubmitted(false);
    setIsCorrect(false);
    setRevealedHintIndex(0);
    setSelectedItemForSwap(null);
  };

  // Rule verification on current interactive board
  const allRulesSatisfied = level.rules.every((r) => r.validator(currentSlots));

  return (
    <div className="space-y-6">
      {/* 1-5. Full Academic Foundations & 5 Worked Examples */}
      <GameAcademicPanel data={ARRANGEMENT_LAB_THEORY} />

      {/* 6-9. Animated Demonstration, Interactive Challenge & Scoring */}
      <div className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-sm overflow-hidden p-6 space-y-6">
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-700">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-indigo-600 dark:text-indigo-400">
              <Move className="w-4 h-4" />
              <span>GAME 2 · RESTRICTED ARRANGEMENT LAB</span>
            </div>
            <h2 className="text-xl font-extrabold text-slate-900 dark:text-white mt-0.5">
              {level.title}
            </h2>
          </div>

          <div className="flex items-center gap-4 text-xs font-semibold">
            <div className="px-3 py-1.5 rounded-lg bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800 flex items-center gap-1.5">
              <Trophy className="w-3.5 h-3.5" />
              <span>Score: {score}</span>
            </div>
            <div className="px-3 py-1.5 rounded-lg bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Streak: {streak}</span>
            </div>
            <div className="text-slate-500">
              Level {levelIndex + 1}/{LAB_LEVELS.length}
            </div>
          </div>
        </div>

        {/* Active Rules Card */}
        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-700 space-y-3">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            Active Spatial Restrictions:
          </div>
          <div className="space-y-2">
            {level.rules.map((rule) => {
              const satisfied = rule.validator(currentSlots);
              return (
                <div
                  key={rule.id}
                  className={`p-3 rounded-lg border flex items-center justify-between text-xs font-medium transition-all ${
                    satisfied
                      ? "bg-emerald-50/70 dark:bg-emerald-950/30 border-emerald-300 dark:border-emerald-800 text-emerald-900 dark:text-emerald-200"
                      : "bg-rose-50/70 dark:bg-rose-950/30 border-rose-300 dark:border-rose-800 text-rose-900 dark:text-rose-200"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    {satisfied ? (
                      <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                    ) : (
                      <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                    )}
                    <span>{rule.text}</span>
                  </div>
                  <span className="font-bold text-[11px] px-2 py-0.5 rounded bg-white/60 dark:bg-slate-900/60">
                    {satisfied ? "SATISFIED" : "VIOLATED"}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* 6. Animated Demonstration: Interactive Position Board */}
        <div className="space-y-3">
          <div className="flex items-center justify-between text-xs font-bold text-slate-600 dark:text-slate-300">
            <span>6. Interactive Arrangement Board (Click any 2 blocks to swap positions)</span>
            <button
              onClick={handleShuffle}
              className="px-2.5 py-1 rounded bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 text-[11px] font-semibold text-slate-700 dark:text-slate-200 transition-colors"
            >
              Shuffle Positions
            </button>
          </div>

          <div
            className={`p-6 rounded-2xl border-2 transition-all duration-300 bg-slate-900 ${
              allRulesSatisfied ? "border-emerald-500 shadow-lg shadow-emerald-500/10" : "border-slate-800"
            }`}
          >
            <div className="grid grid-cols-5 sm:grid-cols-6 gap-3">
              {currentSlots.map((itemId, idx) => {
                const itemDef = level.items.find((it) => it.id === itemId);
                const isSelected = selectedItemForSwap === idx;
                return (
                  <button
                    key={idx}
                    onClick={() => handleSlotClick(idx)}
                    className={`flex flex-col items-center justify-center p-3 rounded-xl border-2 transition-all transform hover:-translate-y-1 ${
                      isSelected
                        ? "ring-4 ring-amber-400 scale-105 border-amber-400"
                        : "border-slate-700 hover:border-slate-500"
                    } ${itemDef?.color || "bg-slate-700"}`}
                  >
                    <span className="text-[10px] font-mono text-white/70 block mb-0.5">
                      Slot {idx + 1}
                    </span>
                    <span className="text-xl font-black text-white">
                      {itemDef?.label || itemId}
                    </span>
                    <span className="text-[11px] text-white/90 truncate max-w-[60px]">
                      {itemDef?.name}
                    </span>
                  </button>
                );
              })}
            </div>

            <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
              <span>
                Current configuration:{" "}
                <span className="font-mono text-white font-bold">
                  [{currentSlots.join(", ")}]
                </span>
              </span>
              <span
                className={`font-bold ${
                  allRulesSatisfied ? "text-emerald-400" : "text-rose-400"
                }`}
              >
                {allRulesSatisfied
                  ? "✓ This configuration is a valid permutation!"
                  : "✗ Violates active rule!"}
              </span>
            </div>
          </div>
        </div>

        {/* 7. Interactive Challenge: Mathematical Calculation Input */}
        <div className="p-4 rounded-xl border border-indigo-200 dark:border-indigo-900/60 bg-indigo-50/40 dark:bg-indigo-950/20 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-700 dark:text-indigo-300 block">
                7. Calculate Total Valid Arrangements
              </span>
              <span className="text-sm font-semibold text-slate-900 dark:text-white">
                How many of the {level.unrestrictedCount} unrestricted orders satisfy all rules?
              </span>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="number"
                placeholder="Enter valid count..."
                value={userCalculation}
                onChange={(e) => setUserCalculation(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleCheckAnswer()}
                disabled={submitted && isCorrect}
                className="w-44 px-3 py-2 rounded-lg bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 font-mono text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <button
                onClick={handleCheckAnswer}
                disabled={submitted && isCorrect}
                className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs transition-colors shadow-sm disabled:opacity-50"
              >
                Check Answer
              </button>
            </div>
          </div>

          {/* Feedback & Result */}
          {submitted && (
            <div
              className={`p-3.5 rounded-lg border flex items-start gap-3 ${
                isCorrect
                  ? "bg-emerald-50 dark:bg-emerald-950/40 border-emerald-300 dark:border-emerald-800 text-emerald-900 dark:text-emerald-200"
                  : "bg-rose-50 dark:bg-rose-950/40 border-rose-300 dark:border-rose-800 text-rose-900 dark:text-rose-200"
              }`}
            >
              {isCorrect ? (
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              ) : (
                <XCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
              )}
              <div className="space-y-1 text-xs">
                <div className="font-bold">
                  {isCorrect
                    ? `Correct! Valid Permutations: ${level.totalValidCount}`
                    : "Incorrect Calculation. Review the restriction logic below."}
                </div>
                <div className="font-mono text-indigo-700 dark:text-indigo-300 font-semibold">
                  Applied Formula: {level.formulaUsed}
                </div>
                <div>{level.solutionDerivation}</div>
              </div>
            </div>
          )}

          {/* 8. Hints & Progressive Solution Controls */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-indigo-100 dark:border-indigo-900/40 text-xs">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setRevealedHintIndex((p) => Math.min(p + 1, 2))}
                disabled={revealedHintIndex >= 2}
                className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 text-slate-700 dark:text-slate-200 font-medium transition-colors disabled:opacity-50"
              >
                <HelpCircle className="w-3.5 h-3.5" />
                <span>
                  {revealedHintIndex === 0
                    ? "Get Hint (0/2)"
                    : `Next Hint (${revealedHintIndex}/2)`}
                </span>
              </button>
              <button
                onClick={handleResetLevel}
                className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset</span>
              </button>
            </div>

            {submitted && isCorrect && (
              <button
                onClick={handleNextLevel}
                className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs transition-colors shadow-sm"
              >
                <span>Next Level ({levelIndex + 2 <= LAB_LEVELS.length ? levelIndex + 2 : 1})</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Hint Card */}
          {revealedHintIndex > 0 && (
            <div className="p-3 rounded-lg bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900 text-xs text-amber-900 dark:text-amber-200 space-y-1">
              <span className="font-bold">Progressive Hint:</span>
              <p>{revealedHintIndex === 1 ? level.hint1 : level.hint2}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
