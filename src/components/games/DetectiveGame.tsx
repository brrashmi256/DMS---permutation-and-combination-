import React, { useState } from "react";
import { DETECTIVE_QUESTIONS, DetectiveQuestion } from "../../data/gamesData";
import { Search, CheckCircle2, XCircle, ArrowRight, RotateCcw, Lightbulb, Trophy } from "lucide-react";

export const DetectiveGame: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [score, setScore] = useState<number>(0);
  const [streak, setStreak] = useState<number>(0);
  const [bestStreak, setBestStreak] = useState<number>(0);
  const [selectedAnswer, setSelectedAnswer] = useState<"permutation" | "combination" | null>(null);
  const [isAnswered, setIsAnswered] = useState<boolean>(false);
  const [showHint, setShowHint] = useState<boolean>(false);
  const [isSwapping, setIsSwapping] = useState<boolean>(false);
  const [orderSwapState, setOrderSwapState] = useState<boolean>(false);

  const question: DetectiveQuestion = DETECTIVE_QUESTIONS[currentIndex];

  const handleSelectAnswer = (ans: "permutation" | "combination") => {
    if (isAnswered) return;
    setSelectedAnswer(ans);
    setIsAnswered(true);

    const isCorrect = ans === question.correctAnswer;
    if (isCorrect) {
      setScore((s) => s + 10);
      const newStreak = streak + 1;
      setStreak(newStreak);
      if (newStreak > bestStreak) setBestStreak(newStreak);
    } else {
      setStreak(0);
    }
  };

  const handleNext = () => {
    setIsAnswered(false);
    setSelectedAnswer(null);
    setShowHint(false);
    setOrderSwapState(false);
    setCurrentIndex((prev) => (prev + 1) % DETECTIVE_QUESTIONS.length);
  };

  const handleSwapAnimation = () => {
    setIsSwapping(true);
    setTimeout(() => {
      setOrderSwapState((prev) => !prev);
      setIsSwapping(false);
    }, 400);
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setScore(0);
    setStreak(0);
    setIsAnswered(false);
    setSelectedAnswer(null);
    setShowHint(false);
    setOrderSwapState(false);
  };

  const currentDisplayOrder = orderSwapState ? question.sampleOrderB : question.sampleOrderA;

  return (
    <div className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 space-y-6 shadow-sm">
      {/* Game Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-700">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-amber-600 dark:text-amber-400">
            <Search className="w-4 h-4" />
            <span>GAME 1: PERMUTATION OR COMBINATION DETECTIVE</span>
          </div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white mt-0.5">
            {question.scenario}
          </h2>
        </div>

        <div className="flex items-center gap-4 text-xs font-semibold">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-50 dark:bg-amber-950/40 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-800">
            <Trophy className="w-4 h-4 text-amber-500" />
            <span>Score: {score}</span>
          </div>
          <div className="px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200">
            Streak: {streak} (Best: {bestStreak})
          </div>
          <div className="text-slate-500">
            {currentIndex + 1} / {DETECTIVE_QUESTIONS.length}
          </div>
        </div>
      </div>

      {/* Clue Scenario Card */}
      <div className="p-5 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-700 space-y-3">
        <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 block">
          Detective Briefing &amp; Evidence:
        </span>
        <p className="text-sm sm:text-base text-slate-800 dark:text-slate-200 leading-relaxed font-serif">
          "{question.clue}"
        </p>
      </div>

      {/* Visual Animation Stage: Dynamic Swapping & Comparison */}
      <div className="p-6 rounded-xl bg-gradient-to-b from-slate-100 to-slate-50 dark:from-slate-900 dark:to-slate-950 border border-slate-200 dark:border-slate-800 space-y-4">
        <div className="flex items-center justify-between text-xs text-slate-500">
          <span className="font-semibold uppercase tracking-wider">
            Interactive Visual Evidence Board:
          </span>
          <button
            onClick={handleSwapAnimation}
            className="px-2.5 py-1 rounded bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 hover:bg-slate-50 text-indigo-600 dark:text-indigo-400 font-semibold shadow-xs transition-transform active:scale-95"
          >
            Animate Re-Ordering ⇆
          </button>
        </div>

        {/* Animated Item Slots */}
        <div className="flex flex-wrap items-center justify-center gap-3 py-4 min-h-[90px]">
          {currentDisplayOrder.map((item, idx) => (
            <div
              key={idx}
              className={`px-4 py-3 rounded-xl border text-xs sm:text-sm font-semibold transition-all duration-300 shadow-sm ${
                isSwapping ? "scale-90 opacity-40 rotate-2" : "scale-100 opacity-100 rotate-0"
              } ${
                question.type === "permutation"
                  ? "bg-indigo-50 dark:bg-indigo-950/40 text-indigo-900 dark:text-indigo-200 border-indigo-300 dark:border-indigo-800"
                  : "bg-emerald-50 dark:bg-emerald-950/40 text-emerald-900 dark:text-emerald-200 border-emerald-300 dark:border-emerald-800"
              }`}
            >
              <div className="text-[10px] text-slate-400 uppercase">Slot {idx + 1}</div>
              <div className="font-mono mt-0.5">{item}</div>
            </div>
          ))}
        </div>

        <div className="text-center text-xs text-slate-500 dark:text-slate-400 italic">
          {question.type === "permutation"
            ? "Notice: Swapping positions assigns different roles or codes (Order Matters!)."
            : "Notice: The same items are in the collection together regardless of display position (Order Does Not Matter!)."}
        </div>
      </div>

      {/* Decision Question */}
      <div className="space-y-3">
        <div className="text-center">
          <span className="text-sm font-bold text-slate-900 dark:text-white">
            Detective, identify the counting principle: Does the order of items matter?
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <button
            onClick={() => handleSelectAnswer("permutation")}
            disabled={isAnswered}
            className={`p-4 rounded-xl border text-left transition-all ${
              isAnswered && question.correctAnswer === "permutation"
                ? "bg-emerald-50 dark:bg-emerald-950/40 border-emerald-500 text-emerald-900 dark:text-emerald-200 ring-2 ring-emerald-500"
                : isAnswered && selectedAnswer === "permutation" && question.correctAnswer !== "permutation"
                ? "bg-rose-50 dark:bg-rose-950/40 border-rose-500 text-rose-900 dark:text-rose-200"
                : "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 hover:border-indigo-500"
            }`}
          >
            <div className="text-sm font-bold text-slate-900 dark:text-white">
              A. Permutation
            </div>
            <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              ORDER MATTERS. Swapping positions produces a completely different outcome.
            </div>
          </button>

          <button
            onClick={() => handleSelectAnswer("combination")}
            disabled={isAnswered}
            className={`p-4 rounded-xl border text-left transition-all ${
              isAnswered && question.correctAnswer === "combination"
                ? "bg-emerald-50 dark:bg-emerald-950/40 border-emerald-500 text-emerald-900 dark:text-emerald-200 ring-2 ring-emerald-500"
                : isAnswered && selectedAnswer === "combination" && question.correctAnswer !== "combination"
                ? "bg-rose-50 dark:bg-rose-950/40 border-rose-500 text-rose-900 dark:text-rose-200"
                : "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 hover:border-emerald-500"
            }`}
          >
            <div className="text-sm font-bold text-slate-900 dark:text-white">
              B. Combination
            </div>
            <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              ORDER DOES NOT MATTER. Group membership is all that counts.
            </div>
          </button>
        </div>
      </div>

      {/* Answer Feedback & Mathematical Formula Reveal */}
      {isAnswered && (
        <div
          className={`p-5 rounded-xl border space-y-3 transition-all ${
            selectedAnswer === question.correctAnswer
              ? "bg-emerald-50 dark:bg-emerald-950/30 border-emerald-300 dark:border-emerald-800"
              : "bg-rose-50 dark:bg-rose-950/30 border-rose-300 dark:border-rose-800"
          }`}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 font-bold text-sm">
              {selectedAnswer === question.correctAnswer ? (
                <>
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                  <span className="text-emerald-800 dark:text-emerald-300">Case Solved Correctly! (+10 pts)</span>
                </>
              ) : (
                <>
                  <XCircle className="w-5 h-5 text-rose-600" />
                  <span className="text-rose-800 dark:text-rose-300">Incorrect Deduction</span>
                </>
              )}
            </div>

            <button
              onClick={handleNext}
              className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-semibold text-xs transition-colors hover:opacity-90"
            >
              Next Case <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
            {question.explanation}
          </p>

          <div className="pt-2 border-t border-slate-200/60 dark:border-slate-700/60 flex items-center justify-between text-xs font-mono">
            <span className="text-slate-500">Governing Mathematical Formula:</span>
            <span className="font-bold text-indigo-700 dark:text-indigo-300">
              {question.formula}
            </span>
          </div>
        </div>
      )}

      {/* Detective Controls */}
      <div className="flex items-center justify-between pt-2">
        <button
          onClick={() => setShowHint(!showHint)}
          className="flex items-center gap-1 text-xs text-amber-600 dark:text-amber-400 hover:underline"
        >
          <Lightbulb className="w-3.5 h-3.5" />
          {showHint ? "Hide Detective Clue" : "Need a Detective Clue?"}
        </button>

        <button
          onClick={handleRestart}
          className="flex items-center gap-1 text-xs text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
        >
          <RotateCcw className="w-3 h-3" /> Reset Game
        </button>
      </div>

      {showHint && (
        <div className="p-3 rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800/40 text-xs text-amber-800 dark:text-amber-200">
          💡 <strong>Detective Clue:</strong> Ask yourself: If we change who comes first or who gets which position, does anyone get hurt or does a code fail? If yes, it's Permutation. If it's a team or collection where all members sit together, it's Combination!
        </div>
      )}
    </div>
  );
};
