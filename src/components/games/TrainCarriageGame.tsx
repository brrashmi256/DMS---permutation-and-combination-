import React, { useState } from "react";
import { TRAIN_CARRIAGE_THEORY } from "../../data/newGamesData";
import { GameAcademicPanel } from "./GameAcademicPanel";
import { Play, RotateCcw, CheckCircle2, XCircle, HelpCircle, Trophy, Sparkles, ArrowRight, ShieldCheck, AlertCircle } from "lucide-react";

interface TrainLevel {
  id: number;
  title: string;
  scenario: string;
  carriages: { id: string; name: string; color: string; label: string }[];
  rules: { id: string; text: string; validator: (formation: string[]) => boolean }[];
  correctPermutations: number;
  unrestrictedCount: number;
  formula: string;
  hint1: string;
  hint2: string;
  solutionDerivation: string;
}

const TRAIN_LEVELS: TrainLevel[] = [
  {
    id: 1,
    title: "Level 1: Unrestricted 5-Carriage Express",
    scenario: "Couple all 5 distinct carriages behind the Locomotive: Passenger (Red), Sleeper (Blue), Dining (Gold), Cargo (Green), Mail (Purple). How many total coupling orders can be formed?",
    carriages: [
      { id: "P", name: "Passenger", color: "#ef4444", label: "RED" },
      { id: "S", name: "Sleeper", color: "#3b82f6", label: "BLUE" },
      { id: "D", name: "Dining", color: "#f59e0b", label: "GOLD" },
      { id: "C", name: "Cargo", color: "#10b981", label: "GREEN" },
      { id: "M", name: "Mail", color: "#8b5cf6", label: "PURPLE" }
    ],
    rules: [
      {
        id: "r1",
        text: "All 5 carriages coupled in any linear sequence",
        validator: (arr) => arr.length === 5
      }
    ],
    correctPermutations: 120,
    unrestrictedCount: 120,
    formula: "n! = 5! = 120",
    hint1: "There are 5 positions to fill with 5 distinct carriages with no constraints.",
    hint2: "Calculate 5 × 4 × 3 × 2 × 1 = 120.",
    solutionDerivation: "Arranging 5 distinct carriages in a line behind the engine: 5! = 5 × 4 × 3 × 2 × 1 = 120."
  },
  {
    id: 2,
    title: "Level 2: VIP Passenger Car Fixed at Front",
    scenario: "Due to priority passenger boarding, the Red Passenger carriage must be coupled in the 1st position immediately behind the engine. How many valid orders exist?",
    carriages: [
      { id: "P", name: "Passenger", color: "#ef4444", label: "RED" },
      { id: "S", name: "Sleeper", color: "#3b82f6", label: "BLUE" },
      { id: "D", name: "Dining", color: "#f59e0b", label: "GOLD" },
      { id: "C", name: "Cargo", color: "#10b981", label: "GREEN" },
      { id: "M", name: "Mail", color: "#8b5cf6", label: "PURPLE" }
    ],
    rules: [
      {
        id: "r1",
        text: "Red Passenger carriage must be in Position 1 (directly behind engine)",
        validator: (arr) => arr[0] === "P"
      }
    ],
    correctPermutations: 24,
    unrestrictedCount: 120,
    formula: "1 × (n - 1)! = 1 × 4! = 24",
    hint1: "Position 1 is locked for Red. How many choices remain for positions 2, 3, 4, and 5?",
    hint2: "The remaining 4 carriages arrange in 4! = 24 ways.",
    solutionDerivation: "Position 1 has 1 choice (Red). Remaining 4 slots are filled by the other 4 cars in 4! = 24 ways."
  },
  {
    id: 3,
    title: "Level 3: Dining and Sleeper Coupled Together (Block Method)",
    scenario: "For passenger convenience, Blue Sleeper and Gold Dining must be coupled together as an adjacent pair. In how many ways can the 5 carriages be ordered?",
    carriages: [
      { id: "P", name: "Passenger", color: "#ef4444", label: "RED" },
      { id: "S", name: "Sleeper", color: "#3b82f6", label: "BLUE" },
      { id: "D", name: "Dining", color: "#f59e0b", label: "GOLD" },
      { id: "C", name: "Cargo", color: "#10b981", label: "GREEN" },
      { id: "M", name: "Mail", color: "#8b5cf6", label: "PURPLE" }
    ],
    rules: [
      {
        id: "r1",
        text: "Blue Sleeper and Gold Dining must be adjacent (coupled together)",
        validator: (arr) => {
          const idxS = arr.indexOf("S");
          const idxD = arr.indexOf("D");
          return idxS !== -1 && idxD !== -1 && Math.abs(idxS - idxD) === 1;
        }
      }
    ],
    correctPermutations: 48,
    unrestrictedCount: 120,
    formula: "(n - k + 1)! × k! = (5 - 2 + 1)! × 2! = 4! × 2! = 48",
    hint1: "Treat [Sleeper, Dining] as 1 single composite unit. How many units are there in total?",
    hint2: "There are 4 units to arrange (4! = 24). Inside the unit, Sleeper and Dining can be ordered in 2! = 2 ways.",
    solutionDerivation: "Units: [SD], P, C, M → 4 units. 4! = 24. Internal order within the pair: 2! = 2. Total = 24 × 2 = 48."
  },
  {
    id: 4,
    title: "Level 4: Green Cargo Forbidden at Rear (Buffer Regulation)",
    scenario: "Rail safety rules prohibit placing the Green Cargo carriage in the final rear position. In how many ways can the 5 carriages be coupled?",
    carriages: [
      { id: "P", name: "Passenger", color: "#ef4444", label: "RED" },
      { id: "S", name: "Sleeper", color: "#3b82f6", label: "BLUE" },
      { id: "D", name: "Dining", color: "#f59e0b", label: "GOLD" },
      { id: "C", name: "Cargo", color: "#10b981", label: "GREEN" },
      { id: "M", name: "Mail", color: "#8b5cf6", label: "PURPLE" }
    ],
    rules: [
      {
        id: "r1",
        text: "Green Cargo CANNOT be in the 5th (final rear) position",
        validator: (arr) => arr[arr.length - 1] !== "C"
      }
    ],
    correctPermutations: 96,
    unrestrictedCount: 120,
    formula: "Total - (Green at end) = 5! - 4! = 120 - 24 = 96",
    hint1: "Use complementary counting: Total unrestricted (5! = 120) minus formations where Green IS at the end (4!).",
    hint2: "120 - 24 = 96. Alternatively: 4 choices for the last slot × 4! for remaining slots = 96.",
    solutionDerivation: "Total arrangements = 120. Formations with Green in slot 5 = 4! × 1 = 24. Valid formations = 120 - 24 = 96."
  },
  {
    id: 5,
    title: "Level 5: Dual Combined Railway Constraint",
    scenario: "Red Passenger is fixed in Position 1, AND Blue Sleeper and Gold Dining must be coupled together. How many valid train formations exist?",
    carriages: [
      { id: "P", name: "Passenger", color: "#ef4444", label: "RED" },
      { id: "S", name: "Sleeper", color: "#3b82f6", label: "BLUE" },
      { id: "D", name: "Dining", color: "#f59e0b", label: "GOLD" },
      { id: "C", name: "Cargo", color: "#10b981", label: "GREEN" },
      { id: "M", name: "Mail", color: "#8b5cf6", label: "PURPLE" }
    ],
    rules: [
      {
        id: "r1",
        text: "Red Passenger must be in Position 1",
        validator: (arr) => arr[0] === "P"
      },
      {
        id: "r2",
        text: "Blue Sleeper and Gold Dining must be adjacent",
        validator: (arr) => {
          const idxS = arr.indexOf("S");
          const idxD = arr.indexOf("D");
          return idxS !== -1 && idxD !== -1 && Math.abs(idxS - idxD) === 1;
        }
      }
    ],
    correctPermutations: 12,
    unrestrictedCount: 120,
    formula: "1 × [(4 - 2 + 1)! × 2!] = 1 × 3! × 2! = 12",
    hint1: "Slot 1 is filled by Red. The remaining 4 slots hold C, M, and the block [SD].",
    hint2: "Units among remaining 4 slots: 3 units (3! = 6). Block internal order: 2! = 2. Total: 6 × 2 = 12.",
    solutionDerivation: "Slot 1 fixed (1 way). Remaining 4 slots filled by C, M, and [SD] (3 units): 3! = 6. Internal order of [SD]: 2! = 2. Total = 6 × 2 = 12."
  }
];

export const TrainCarriageGame: React.FC = () => {
  const [levelIndex, setLevelIndex] = useState<number>(0);
  const [userGuess, setUserGuess] = useState<string>("");
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [isCorrect, setIsCorrect] = useState<boolean>(false);
  const [revealedHintIndex, setRevealedHintIndex] = useState<number>(0);
  const [score, setScore] = useState<number>(0);
  const [streak, setStreak] = useState<number>(0);

  const level = TRAIN_LEVELS[levelIndex];

  // Interactive train formation
  const [formation, setFormation] = useState<string[]>(level.carriages.map((c) => c.id));
  const [selectedSlot, setSelectedSlot] = useState<number | null>(null);
  const [isChooChooAnimating, setIsChooChooAnimating] = useState<boolean>(false);

  const handleSlotClick = (idx: number) => {
    if (selectedSlot === null) {
      setSelectedSlot(idx);
    } else {
      const nextF = [...formation];
      const temp = nextF[selectedSlot];
      nextF[selectedSlot] = nextF[idx];
      nextF[idx] = temp;
      setFormation(nextF);
      setSelectedSlot(null);
    }
  };

  const handleRunTrain = () => {
    setIsChooChooAnimating(true);
    setTimeout(() => setIsChooChooAnimating(false), 1200);
  };

  const handleCheckAnswer = () => {
    if (submitted) return;
    const val = parseInt(userGuess.trim(), 10);
    const correct = val === level.correctPermutations;
    setIsCorrect(correct);
    setSubmitted(true);

    if (correct) {
      const pts = 100 - revealedHintIndex * 20 + streak * 15;
      setScore((s) => s + Math.max(pts, 40));
      setStreak((st) => st + 1);
      handleRunTrain();
    } else {
      setStreak(0);
    }
  };

  const handleNextLevel = () => {
    const next = (levelIndex + 1) % TRAIN_LEVELS.length;
    setLevelIndex(next);
    setFormation(TRAIN_LEVELS[next].carriages.map((c) => c.id));
    setUserGuess("");
    setSubmitted(false);
    setIsCorrect(false);
    setRevealedHintIndex(0);
    setSelectedSlot(null);
  };

  const handleResetLevel = () => {
    setFormation(level.carriages.map((c) => c.id));
    setUserGuess("");
    setSubmitted(false);
    setIsCorrect(false);
    setRevealedHintIndex(0);
    setSelectedSlot(null);
  };

  const allRulesSatisfied = level.rules.every((r) => r.validator(formation));

  return (
    <div className="space-y-6">
      {/* 1-5. Full Academic Foundations & 5 Worked Examples */}
      <GameAcademicPanel data={TRAIN_CARRIAGE_THEORY} />

      {/* 6-9. Animated Demonstration, Interactive Challenge & Scoring */}
      <div className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-sm overflow-hidden p-6 space-y-6">
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-700">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-indigo-600 dark:text-indigo-400">
              <Play className="w-4 h-4" />
              <span>GAME 3 · TRAIN CARRIAGE PERMUTATION CHALLENGE</span>
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
              Level {levelIndex + 1}/{TRAIN_LEVELS.length}
            </div>
          </div>
        </div>

        {/* Level Scenario */}
        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-700 text-sm leading-relaxed text-slate-800 dark:text-slate-200">
          <span className="font-bold text-slate-900 dark:text-white">Scenario: </span>
          {level.scenario}
        </div>

        {/* Active Rules Card */}
        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-700 space-y-2">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            Coupling Regulations:
          </div>
          <div className="space-y-1.5">
            {level.rules.map((rule) => {
              const satisfied = rule.validator(formation);
              return (
                <div
                  key={rule.id}
                  className={`p-2.5 rounded-lg border flex items-center justify-between text-xs font-medium transition-all ${
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
                    {satisfied ? "VALID" : "VIOLATED"}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* 6. Animated Demonstration: Visual SVG Train & Coupled Carriages */}
        <div className="space-y-3">
          <div className="flex items-center justify-between text-xs font-bold text-slate-600 dark:text-slate-300">
            <span>6. Visual Train Assembly Track (Click any 2 carriages to swap their coupling order)</span>
            <button
              onClick={handleRunTrain}
              disabled={isChooChooAnimating}
              className="px-2.5 py-1 rounded bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 text-[11px] font-semibold text-slate-700 dark:text-slate-200 transition-colors flex items-center gap-1"
            >
              <Play className="w-3 h-3 text-indigo-500" />
              <span>Drive Train</span>
            </button>
          </div>

          <div
            className={`p-6 rounded-2xl bg-slate-950 border-2 transition-all duration-300 overflow-x-auto ${
              allRulesSatisfied ? "border-emerald-500 shadow-lg shadow-emerald-500/10" : "border-slate-800"
            }`}
          >
            <div className={`min-w-[720px] transition-transform duration-500 ${isChooChooAnimating ? "translate-x-4" : ""}`}>
              {/* Railroad Tracks */}
              <div className="relative mb-2">
                <div className="h-1 bg-slate-700 rounded-full w-full" />
                <div className="h-1 bg-slate-700 rounded-full w-full mt-3" />
                {/* Ties */}
                <div className="absolute top-0 w-full flex justify-between px-2">
                  {Array.from({ length: 30 }).map((_, i) => (
                    <div key={i} className="w-1 h-5 bg-amber-900/80 -mt-1" />
                  ))}
                </div>
              </div>

              {/* Train: Locomotive + Carriages */}
              <div className="flex items-end gap-2 pt-4">
                {/* Locomotive (Front) */}
                <div className="w-36 bg-slate-800 border-2 border-slate-600 rounded-t-xl p-3 flex flex-col items-center justify-between text-white shrink-0 relative shadow-md">
                  {/* Smoke Stack */}
                  <div className="w-4 h-4 bg-slate-600 rounded-t absolute -top-4 right-6">
                    {isChooChooAnimating && (
                      <div className="absolute -top-3 left-1 w-3 h-3 rounded-full bg-slate-300/60 animate-ping" />
                    )}
                  </div>
                  <div className="text-[10px] font-bold text-amber-400 tracking-wider">
                    LOCOMOTIVE
                  </div>
                  <div className="text-xs font-black">STEAM ENGINE</div>
                  <div className="w-full flex justify-around mt-2">
                    <div className="w-5 h-5 rounded-full bg-slate-900 border-2 border-amber-500" />
                    <div className="w-5 h-5 rounded-full bg-slate-900 border-2 border-amber-500" />
                  </div>
                </div>

                {/* Hitching connector */}
                <div className="w-4 h-1 bg-slate-600 shrink-0 mb-4" />

                {/* Carriages */}
                {formation.map((cId, idx) => {
                  const cDef = level.carriages.find((c) => c.id === cId);
                  const isSelected = selectedSlot === idx;
                  return (
                    <React.Fragment key={cId}>
                      <button
                        onClick={() => handleSlotClick(idx)}
                        style={{ backgroundColor: cDef?.color || "#475569" }}
                        className={`w-28 h-24 rounded-t-xl border-2 p-2.5 flex flex-col items-center justify-between text-white shrink-0 shadow-md transition-all transform hover:-translate-y-1 ${
                          isSelected
                            ? "ring-4 ring-amber-400 scale-105 border-amber-400"
                            : "border-white/30 hover:border-white"
                        }`}
                      >
                        <span className="text-[10px] font-mono bg-black/30 px-1.5 py-0.5 rounded">
                          Car #{idx + 1}
                        </span>
                        <span className="text-sm font-black">{cDef?.label}</span>
                        <span className="text-[10px] font-medium truncate max-w-[90px]">
                          {cDef?.name}
                        </span>
                        {/* Carriage wheels */}
                        <div className="w-full flex justify-around mt-1">
                          <div className="w-4 h-4 rounded-full bg-slate-900 border-2 border-white/60" />
                          <div className="w-4 h-4 rounded-full bg-slate-900 border-2 border-white/60" />
                        </div>
                      </button>

                      {idx < formation.length - 1 && (
                        <div className="w-3 h-1 bg-slate-600 shrink-0 mb-4" />
                      )}
                    </React.Fragment>
                  );
                })}
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
              <span>
                Order from Engine to Rear:{" "}
                <span className="font-mono text-white font-bold">
                  [{formation.map((c) => level.carriages.find((x) => x.id === c)?.label).join(" → ")}]
                </span>
              </span>
              <span
                className={`font-bold ${
                  allRulesSatisfied ? "text-emerald-400" : "text-rose-400"
                }`}
              >
                {allRulesSatisfied
                  ? "✓ Coupling configuration meets all safety requirements!"
                  : "✗ Active coupling violation!"}
              </span>
            </div>
          </div>
        </div>

        {/* 7. Interactive Challenge: Mathematical Calculation Input */}
        <div className="p-4 rounded-xl border border-indigo-200 dark:border-indigo-900/60 bg-indigo-50/40 dark:bg-indigo-950/20 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-700 dark:text-indigo-300 block">
                7. Calculate Total Valid Formations
              </span>
              <span className="text-sm font-semibold text-slate-900 dark:text-white">
                How many of the {level.unrestrictedCount} unrestricted orders satisfy all regulations?
              </span>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="number"
                placeholder="Enter valid orders..."
                value={userGuess}
                onChange={(e) => setUserGuess(e.target.value)}
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
                    ? `Correct! Valid Train Formations: ${level.correctPermutations}`
                    : "Incorrect Formation Count. Review the coupling logic below."}
                </div>
                <div className="font-mono text-indigo-700 dark:text-indigo-300 font-semibold">
                  Applied Formula: {level.formula}
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
                <span>Next Level ({levelIndex + 2 <= TRAIN_LEVELS.length ? levelIndex + 2 : 1})</span>
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
