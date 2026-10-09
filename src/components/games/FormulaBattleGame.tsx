import React, { useState, useEffect } from "react";
import { FORMULA_BATTLE_THEORY } from "../../data/newGamesData";
import { GameAcademicPanel } from "./GameAcademicPanel";
import { Swords, RotateCcw, CheckCircle2, XCircle, HelpCircle, Trophy, Sparkles, ArrowRight, Timer, Zap, Shield, Heart } from "lucide-react";

interface BattleQuestion {
  id: string;
  topic: string;
  prompt: string;
  correctFormulaKey: string;
  correctFormulaTex: string;
  correctAnswer: number;
  whyThisFormula: string;
  whyOthersFail: string;
  hint: string;
}

const FORMULA_OPTIONS = [
  { key: "factorials", label: "Factorials (n!)", formula: "n!" },
  { key: "perm_no_rep", label: "Permutations w/o Rep (ⁿPᵣ)", formula: "n! / (n - r)!" },
  { key: "comb_no_rep", label: "Combinations w/o Rep (ⁿCᵣ)", formula: "n! / [r!(n - r)!]" },
  { key: "perm_rep", label: "Permutations with Rep (nʳ)", formula: "nʳ" },
  { key: "comb_rep", label: "Combinations with Rep", formula: "C(n + r - 1, r)" },
  { key: "circular_perm", label: "Circular Permutations", formula: "(n - 1)!" },
  { key: "identical_objects", label: "Identical Objects", formula: "n! / (p! × q!...)" }
];

const BATTLE_QUESTIONS: BattleQuestion[] = [
  {
    id: "q1",
    topic: "Factorials",
    prompt: "In how many ways can 5 distinct books be arranged on a single shelf?",
    correctFormulaKey: "factorials",
    correctFormulaTex: "n! = 5! = 120",
    correctAnswer: 120,
    whyThisFormula: "All 5 distinct books are being arranged in a line with no repetitions or omissions.",
    whyOthersFail: "Not ⁿPᵣ with r < n because all books are used. Not circular because a shelf is linear.",
    hint: "Linear arrangement of all n distinct items is given by n!."
  },
  {
    id: "q2",
    topic: "Permutations w/o Rep",
    prompt: "In how many ways can a President, Vice President, and Secretary be elected from 7 eligible candidates?",
    correctFormulaKey: "perm_no_rep",
    correctFormulaTex: "ⁿPᵣ = ⁷P₃ = 7 × 6 × 5 = 210",
    correctAnswer: 210,
    whyThisFormula: "Order matters because the 3 elected titles are distinct roles (President ≠ VP ≠ Sec).",
    whyOthersFail: "Combination fails because order/titles matter. Repetition fails because one person cannot hold multiple titles.",
    hint: "Selecting r distinct items for distinct titled positions is ⁿPᵣ."
  },
  {
    id: "q3",
    topic: "Combinations w/o Rep",
    prompt: "A study group of 4 students is to be chosen from a class of 9 students. In how many ways can the group be selected?",
    correctFormulaKey: "comb_no_rep",
    correctFormulaTex: "ⁿCᵣ = ⁹C₄ = (9 × 8 × 7 × 6) / 24 = 126",
    correctAnswer: 126,
    whyThisFormula: "Study group members share equal unranked status; the order of choosing students does not alter the group.",
    whyOthersFail: "Permutation fails because {Alice, Bob} is the exact same group as {Bob, Alice}.",
    hint: "Unordered selection of distinct items without replacement is ⁿCᵣ."
  },
  {
    id: "q4",
    topic: "Permutations with Rep",
    prompt: "How many 3-letter secret codes can be created using English alphabet letters (A-Z) if letters may be repeated freely?",
    correctFormulaKey: "perm_rep",
    correctFormulaTex: "nʳ = 26³ = 17,576",
    correctAnswer: 17576,
    whyThisFormula: "There are 3 positions, and each position independently allows any of the 26 letters (e.g. AAA, ABC).",
    whyOthersFail: "Permutation without repetition fails because the same letter can appear multiple times.",
    hint: "r positions, each with n independent choices is nʳ."
  },
  {
    id: "q5",
    topic: "Combinations with Rep",
    prompt: "An ice cream shop offers 3 flavours. A customer orders a bowl with 4 scoops where flavours can be repeated and scoop order does not matter. How many flavour combinations exist?",
    correctFormulaKey: "comb_rep",
    correctFormulaTex: "C(n + r - 1, r) = C(3 + 4 - 1, 4) = C(6, 4) = 15",
    correctAnswer: 15,
    whyThisFormula: "Unordered selection where item categories can be chosen repeatedly (Stars and Bars).",
    whyOthersFail: "Ordinary combination ⁿCᵣ cannot choose 4 items from only 3 categories without repetition.",
    hint: "Selecting r items from n categories with repetition allowed uses C(n + r - 1, r)."
  },
  {
    id: "q6",
    topic: "Circular Permutations",
    prompt: "In how many ways can 6 delegates sit around a round conference table where rotations of the same seating are considered identical?",
    correctFormulaKey: "circular_perm",
    correctFormulaTex: "(n - 1)! = (6 - 1)! = 5! = 120",
    correctAnswer: 120,
    whyThisFormula: "In a circle, rotating everyone by one position does not alter relative neighbours. Fixing 1 reference seat leaves (n - 1)! arrangements.",
    whyOthersFail: "Linear n! overcounts by a factor of n because there is no distinguished first chair in a circle.",
    hint: "Circular arrangements modulo rotation is (n - 1)!."
  },
  {
    id: "q7",
    topic: "Identical Objects",
    prompt: "How many distinct permutations can be formed using all the letters in the word 'RADAR' (5 letters: 2 R's, 2 A's, 1 D)?",
    correctFormulaKey: "identical_objects",
    correctFormulaTex: "n! / (p! × q!) = 5! / (2! × 2!) = 120 / 4 = 30",
    correctAnswer: 30,
    whyThisFormula: "Multinomial arrangement: swapping the two identical 'R's does not create a new observable word.",
    whyOthersFail: "Ordinary 5! fails because identical duplicate symbols produce identical strings.",
    hint: "Divide total n! by the factorials of repeated item multiplicities."
  }
];

export const FormulaBattleGame: React.FC = () => {
  const [questionIndex, setQuestionIndex] = useState<number>(0);
  const [selectedFormula, setSelectedFormula] = useState<string | null>(null);
  const [calculatedGuess, setCalculatedGuess] = useState<string>("");
  const [phase, setPhase] = useState<"formula" | "calculation">("formula");
  const [isAnswered, setIsAnswered] = useState<boolean>(false);
  const [isFormulaCorrect, setIsFormulaCorrect] = useState<boolean>(false);
  const [isCalcCorrect, setIsCalcCorrect] = useState<boolean>(false);
  const [showHint, setShowHint] = useState<boolean>(false);

  // Gamification & Battle state
  const [playerHp, setPlayerHp] = useState<number>(100);
  const [bossHp, setBossHp] = useState<number>(100);
  const [score, setScore] = useState<number>(0);
  const [streak, setStreak] = useState<number>(0);
  const [attackAnimation, setAttackAnimation] = useState<"player" | "boss" | null>(null);
  const [isTimedMode, setIsTimedMode] = useState<boolean>(false);
  const [timerSeconds, setTimerSeconds] = useState<number>(45);

  const question = BATTLE_QUESTIONS[questionIndex];

  // Timer countdown if in timed mode
  useEffect(() => {
    if (!isTimedMode || isAnswered) return;
    const interval = setInterval(() => {
      setTimerSeconds((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          handleTimeExpired();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [isTimedMode, isAnswered, questionIndex]);

  const handleTimeExpired = () => {
    setIsAnswered(true);
    setPlayerHp((hp) => Math.max(hp - 20, 0));
    setStreak(0);
    setAttackAnimation("boss");
    setTimeout(() => setAttackAnimation(null), 800);
  };

  const handleSelectFormula = (key: string) => {
    if (phase !== "formula" || isAnswered) return;
    setSelectedFormula(key);
    const correct = key === question.correctFormulaKey;
    setIsFormulaCorrect(correct);

    if (correct) {
      setPhase("calculation");
    } else {
      setIsAnswered(true);
      setStreak(0);
      setPlayerHp((hp) => Math.max(hp - 15, 0));
      setAttackAnimation("boss");
      setTimeout(() => setAttackAnimation(null), 800);
    }
  };

  const handleCheckCalculation = () => {
    if (phase !== "calculation" || isAnswered) return;
    const val = parseInt(calculatedGuess.trim(), 10);
    const correct = val === question.correctAnswer;
    setIsCalcCorrect(correct);
    setIsAnswered(true);

    if (correct) {
      setAttackAnimation("player");
      setTimeout(() => setAttackAnimation(null), 800);
      setScore((s) => s + 150 + streak * 25);
      const newStreak = streak + 1;
      setStreak(newStreak);
      setBossHp((hp) => Math.max(hp - 20, 0));
    } else {
      setAttackAnimation("boss");
      setTimeout(() => setAttackAnimation(null), 800);
      setStreak(0);
      setPlayerHp((hp) => Math.max(hp - 15, 0));
    }
  };

  const handleNextQuestion = () => {
    const next = (questionIndex + 1) % BATTLE_QUESTIONS.length;
    setQuestionIndex(next);
    setSelectedFormula(null);
    setCalculatedGuess("");
    setPhase("formula");
    setIsAnswered(false);
    setIsFormulaCorrect(false);
    setIsCalcCorrect(false);
    setShowHint(false);
    setTimerSeconds(45);
  };

  const handleRestartBattle = () => {
    setQuestionIndex(0);
    setSelectedFormula(null);
    setCalculatedGuess("");
    setPhase("formula");
    setIsAnswered(false);
    setIsFormulaCorrect(false);
    setIsCalcCorrect(false);
    setShowHint(false);
    setPlayerHp(100);
    setBossHp(100);
    setScore(0);
    setStreak(0);
    setTimerSeconds(45);
  };

  return (
    <div className="space-y-6">
      {/* 1-5. Full Academic Foundations & 5 Worked Examples */}
      <GameAcademicPanel data={FORMULA_BATTLE_THEORY} />

      {/* 6-9. Animated Demonstration, Interactive Challenge & Scoring */}
      <div className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-sm overflow-hidden p-6 space-y-6">
        {/* Top Header & Battle Scoreboard */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-700">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-indigo-600 dark:text-indigo-400">
              <Swords className="w-4 h-4" />
              <span>GAME 6 · FORMULA BATTLE ARENA (ALL 7 CONCEPTS)</span>
            </div>
            <h2 className="text-xl font-extrabold text-slate-900 dark:text-white mt-0.5">
              Battle Question {questionIndex + 1} of {BATTLE_QUESTIONS.length}: {question.topic}
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsTimedMode(!isTimedMode)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold border transition-colors ${
                isTimedMode
                  ? "bg-amber-100 dark:bg-amber-950/60 border-amber-400 text-amber-900 dark:text-amber-200"
                  : "bg-slate-100 dark:bg-slate-700 border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-200"
              }`}
            >
              <Timer className="w-3.5 h-3.5" />
              <span>{isTimedMode ? `Timed (${timerSeconds}s)` : "Untimed Mode"}</span>
            </button>

            <div className="px-3 py-1.5 rounded-lg bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800 text-xs font-bold flex items-center gap-1.5">
              <Trophy className="w-3.5 h-3.5" />
              <span>Score: {score}</span>
            </div>
            <div className="px-3 py-1.5 rounded-lg bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800 text-xs font-bold flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Streak: {streak}</span>
            </div>
          </div>
        </div>

        {/* 6. Animated Demonstration: Battle Arena Canvas (Player vs Boss Health & Attack Animations) */}
        <div className="p-5 rounded-2xl bg-gradient-to-r from-slate-950 via-slate-900 to-indigo-950 border border-slate-800 text-white space-y-4 shadow-inner relative overflow-hidden">
          <div className="flex items-center justify-between text-xs font-bold">
            {/* Player Health Bar */}
            <div className="space-y-1.5 w-44 sm:w-56">
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1 text-emerald-400">
                  <Shield className="w-3.5 h-3.5" /> Student Champion
                </span>
                <span className="font-mono">{playerHp}/100 HP</span>
              </div>
              <div className="w-full h-3 rounded-full bg-slate-800 overflow-hidden border border-slate-700">
                <div
                  className="h-full bg-emerald-500 rounded-full transition-all duration-500"
                  style={{ width: `${playerHp}%` }}
                />
              </div>
            </div>

            <div className="text-center font-mono text-xs font-bold text-amber-400">
              VS
            </div>

            {/* Boss Health Bar */}
            <div className="space-y-1.5 w-44 sm:w-56 text-right">
              <div className="flex items-center justify-between">
                <span className="font-mono">{bossHp}/100 HP</span>
                <span className="flex items-center gap-1 text-rose-400">
                  Combinatorics Titan <Heart className="w-3.5 h-3.5" />
                </span>
              </div>
              <div className="w-full h-3 rounded-full bg-slate-800 overflow-hidden border border-slate-700">
                <div
                  className="h-full bg-rose-500 rounded-full transition-all duration-500 float-right"
                  style={{ width: `${bossHp}%` }}
                />
              </div>
            </div>
          </div>

          {/* Visual Avatar Battle Animation Stage */}
          <div className="flex items-center justify-around py-4 relative">
            {/* Player Avatar */}
            <div
              className={`flex flex-col items-center transition-transform duration-300 ${
                attackAnimation === "player"
                  ? "translate-x-12 scale-110 text-emerald-400"
                  : attackAnimation === "boss"
                  ? "opacity-60 -translate-x-2"
                  : ""
              }`}
            >
              <div className="w-16 h-16 rounded-2xl bg-indigo-600/80 border-2 border-indigo-400 flex items-center justify-center text-3xl shadow-lg">
                🧙‍♂️
              </div>
              <span className="text-xs font-bold mt-1 text-indigo-300">Player</span>
            </div>

            {/* Attack Energy Bolt Animation */}
            {attackAnimation === "player" && (
              <div className="flex items-center gap-1 text-emerald-400 animate-pulse text-sm font-bold">
                <Zap className="w-6 h-6 animate-bounce" />
                <span>FORMULA CRITICAL HIT!</span>
              </div>
            )}
            {attackAnimation === "boss" && (
              <div className="flex items-center gap-1 text-rose-400 animate-pulse text-sm font-bold">
                <XCircle className="w-6 h-6 animate-bounce" />
                <span>MISDIAGNOSIS COUNTER-ATTACK!</span>
              </div>
            )}

            {/* Boss Avatar */}
            <div
              className={`flex flex-col items-center transition-transform duration-300 ${
                attackAnimation === "boss"
                  ? "-translate-x-12 scale-110 text-rose-400"
                  : attackAnimation === "player"
                  ? "opacity-60 translate-x-2"
                  : ""
              }`}
            >
              <div className="w-16 h-16 rounded-2xl bg-rose-950/80 border-2 border-rose-600 flex items-center justify-center text-3xl shadow-lg">
                🐲
              </div>
              <span className="text-xs font-bold mt-1 text-rose-400">Titan Boss</span>
            </div>
          </div>
        </div>

        {/* Question Prompt */}
        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-700 space-y-2">
          <div className="text-[11px] font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
            Challenge Scenario:
          </div>
          <p className="text-base font-semibold text-slate-900 dark:text-white leading-relaxed">
            {question.prompt}
          </p>
        </div>

        {/* 7. Interactive Challenge: Phase 1 (Choose Formula) and Phase 2 (Calculate Answer) */}
        <div className="space-y-4">
          {/* Phase 1: Formula Archetype Selection */}
          <div className="p-4 rounded-xl border border-indigo-200 dark:border-indigo-900/60 bg-indigo-50/30 dark:bg-indigo-950/20 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-700 dark:text-indigo-300">
                Phase 1: Identify the Correct Mathematical Concept
              </span>
              <span className="text-[11px] text-slate-500">
                {phase === "formula" && !isAnswered ? "Click the matching formula" : "Concept Selected"}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
              {FORMULA_OPTIONS.map((opt) => {
                const isSelected = selectedFormula === opt.key;
                const isThisTheCorrectKey = opt.key === question.correctFormulaKey;
                let btnStyle = "bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 hover:border-indigo-400";

                if (isAnswered) {
                  if (isThisTheCorrectKey) {
                    btnStyle = "bg-emerald-100 dark:bg-emerald-950/60 border-emerald-500 text-emerald-900 dark:text-emerald-200 ring-2 ring-emerald-500";
                  } else if (isSelected && !isFormulaCorrect) {
                    btnStyle = "bg-rose-100 dark:bg-rose-950/60 border-rose-500 text-rose-900 dark:text-rose-200";
                  }
                } else if (isSelected) {
                  btnStyle = "bg-indigo-600 text-white border-indigo-600 shadow-md";
                }

                return (
                  <button
                    key={opt.key}
                    onClick={() => handleSelectFormula(opt.key)}
                    disabled={isAnswered || phase !== "formula"}
                    className={`p-3 rounded-xl border text-left flex flex-col justify-between transition-all ${btnStyle}`}
                  >
                    <div className="text-xs font-bold truncate">{opt.label}</div>
                    <div className="font-mono text-[11px] mt-1 opacity-80">{opt.formula}</div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Phase 2: Calculation Input (Appears if formula is correct or in calculation phase) */}
          {(phase === "calculation" || isAnswered) && (
            <div className="p-4 rounded-xl border border-emerald-200 dark:border-emerald-900/60 bg-emerald-50/30 dark:bg-emerald-950/20 space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-300 block">
                Phase 2: Substitute Parameters &amp; Calculate Verified Outcome
              </span>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <span className="text-xs font-medium text-slate-700 dark:text-slate-300">
                  Using formula: <span className="font-mono font-bold text-indigo-600 dark:text-indigo-400">{question.correctFormulaTex}</span>
                </span>

                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    placeholder="Enter final answer..."
                    value={calculatedGuess}
                    onChange={(e) => setCalculatedGuess(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleCheckCalculation()}
                    disabled={isAnswered}
                    className="w-44 px-3 py-2 rounded-lg bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 font-mono text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                  <button
                    onClick={handleCheckCalculation}
                    disabled={isAnswered}
                    className="px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs transition-colors shadow-sm disabled:opacity-50"
                  >
                    Strike Attack!
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Feedback & Result */}
          {isAnswered && (
            <div
              className={`p-4 rounded-xl border flex items-start gap-3 ${
                isCalcCorrect
                  ? "bg-emerald-50 dark:bg-emerald-950/40 border-emerald-300 dark:border-emerald-800 text-emerald-900 dark:text-emerald-200"
                  : "bg-rose-50 dark:bg-rose-950/40 border-rose-300 dark:border-rose-800 text-rose-900 dark:text-rose-200"
              }`}
            >
              {isCalcCorrect ? (
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              ) : (
                <XCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
              )}
              <div className="space-y-1.5 text-xs">
                <div className="font-bold text-sm">
                  {isCalcCorrect
                    ? "Victory! Concept Diagnosed & Calculation Verified!"
                    : "Mistake Diagnosis:"}
                </div>
                <div>
                  <strong>Why {question.topic} applies: </strong>
                  {question.whyThisFormula}
                </div>
                <div className="text-slate-600 dark:text-slate-300">
                  <strong>Why others fail: </strong>
                  {question.whyOthersFail}
                </div>
                <div className="font-mono font-bold text-indigo-700 dark:text-indigo-300">
                  Verified Result: {question.correctFormulaTex} = {question.correctAnswer}
                </div>
              </div>
            </div>
          )}

          {/* 8. Progressive Hints & Navigation Controls */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-slate-200 dark:border-slate-700 text-xs">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowHint(true)}
                disabled={showHint}
                className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 text-slate-700 dark:text-slate-200 font-medium transition-colors disabled:opacity-50"
              >
                <HelpCircle className="w-3.5 h-3.5" />
                <span>{showHint ? "Hint Active" : "Get Hint"}</span>
              </button>
              <button
                onClick={handleRestartBattle}
                className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Restart Arena</span>
              </button>
            </div>

            {isAnswered && (
              <button
                onClick={handleNextQuestion}
                className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs transition-colors shadow-sm"
              >
                <span>Next Battle Question</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Hint Card */}
          {showHint && (
            <div className="p-3 rounded-lg bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900 text-xs text-amber-900 dark:text-amber-200 space-y-1">
              <span className="font-bold">Progressive Hint:</span>
              <p>{question.hint}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
