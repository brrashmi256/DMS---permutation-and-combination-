import React, { useState } from "react";
import { BASKET_CHALLENGES, BasketChallenge } from "../../data/gamesData";
import { ShoppingBasket, CheckCircle2, RotateCcw, Lightbulb, Trophy, ArrowRight, ArrowLeft } from "lucide-react";

export const CombinationBasketGame: React.FC = () => {
  const [challengeIdx, setChallengeIdx] = useState<number>(0);
  const challenge: BasketChallenge = BASKET_CHALLENGES[challengeIdx];

  const [basket, setBasket] = useState<string[]>([]);
  const [selectionOrderLog, setSelectionOrderLog] = useState<string[]>([]);
  const [userGuess, setUserGuess] = useState<string>("");
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [isCorrect, setIsCorrect] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [showHint, setShowHint] = useState<boolean>(false);

  const handleToggleItem = (itemId: string) => {
    if (basket.includes(itemId)) {
      setBasket(basket.filter((id) => id !== itemId));
      setSelectionOrderLog(selectionOrderLog.filter((id) => id !== itemId));
    } else {
      if (basket.length < challenge.requiredCount) {
        setBasket([...basket, itemId]);
        setSelectionOrderLog([...selectionOrderLog, itemId]);
      }
    }
  };

  const handleCheckAnswer = () => {
    const numericGuess = parseInt(userGuess.trim(), 10);
    const correct = numericGuess === challenge.calculatedAnswer;
    setIsCorrect(correct);
    setIsSubmitted(true);
    if (correct) {
      setScore((s) => s + 20);
    }
  };

  const handleNextChallenge = () => {
    const nextIdx = (challengeIdx + 1) % BASKET_CHALLENGES.length;
    setChallengeIdx(nextIdx);
    setBasket([]);
    setSelectionOrderLog([]);
    setUserGuess("");
    setIsSubmitted(false);
    setIsCorrect(false);
    setShowHint(false);
  };

  const handleResetBasket = () => {
    setBasket([]);
    setSelectionOrderLog([]);
  };

  return (
    <div className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 space-y-6 shadow-sm">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-700">
        <div>
          <div className="text-xs font-bold text-emerald-600 dark:text-emerald-400">
            GAME 3: COMBINATION BASKET (UNORDERED SELECTION)
          </div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white mt-0.5">
            Challenge {challenge.id}: {challenge.title}
          </h2>
        </div>

        <div className="flex items-center gap-4 text-xs font-semibold">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
            <Trophy className="w-4 h-4 text-emerald-500" />
            <span>Score: {score}</span>
          </div>
          <div className="text-slate-500">
            {challengeIdx + 1} of {BASKET_CHALLENGES.length}
          </div>
        </div>
      </div>

      {/* Task Description */}
      <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm text-slate-700 dark:text-slate-300 space-y-1">
        <p>
          Select exactly <strong>{challenge.requiredCount} items</strong> from the pool below to place into the basket.
        </p>
        <p className="text-slate-500 dark:text-slate-400">
          Observe: Whether you click Apple then Banana or Banana then Apple, the contents of the basket remain identical!
        </p>
      </div>

      {/* Items Pool & Basket Visual Stage */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 rounded-2xl bg-gradient-to-b from-slate-100 to-slate-50 dark:from-slate-900 dark:to-slate-950 border border-slate-200 dark:border-slate-800">
        {/* Source Pool */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Available Items ({challenge.poolItems.length} Total)
            </span>
            <span className="text-xs text-slate-400">Click to add/remove</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
            {challenge.poolItems.map((item) => {
              const inBasket = basket.includes(item.id);
              return (
                <button
                  key={item.id}
                  onClick={() => handleToggleItem(item.id)}
                  className={`p-3 rounded-xl border text-center transition-all flex flex-col items-center gap-1 ${
                    inBasket
                      ? "bg-emerald-100 dark:bg-emerald-950/60 border-emerald-500 ring-2 ring-emerald-400 -translate-y-1"
                      : "bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:border-slate-400"
                  }`}
                >
                  <span className="text-2xl">{item.icon}</span>
                  <span className="text-xs font-semibold text-slate-800 dark:text-slate-200">
                    {item.name}
                  </span>
                  <span className="text-[10px] text-slate-400">
                    {inBasket ? "In Basket ✓" : "Click to Add"}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Animated Basket */}
        <div className="space-y-3 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                <ShoppingBasket className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                The Combination Basket ({basket.length}/{challenge.requiredCount})
              </span>
              <button
                onClick={handleResetBasket}
                className="text-xs text-slate-500 hover:text-slate-800 dark:hover:text-white flex items-center gap-1"
              >
                <RotateCcw className="w-3 h-3" /> Empty
              </button>
            </div>

            {/* Basket Container */}
            <div className="mt-3 p-5 rounded-2xl bg-amber-50 dark:bg-amber-950/20 border-2 border-dashed border-amber-300 dark:border-amber-800 min-h-[140px] flex items-center justify-center">
              {basket.length === 0 ? (
                <div className="text-center text-xs text-amber-700 dark:text-amber-400">
                  🧺 Basket is currently empty. Click {challenge.requiredCount} items from the left.
                </div>
              ) : (
                <div className="flex flex-wrap items-center justify-center gap-3">
                  {basket.map((itemId) => {
                    const item = challenge.poolItems.find((p) => p.id === itemId);
                    if (!item) return null;
                    return (
                      <div
                        key={itemId}
                        className="px-3 py-2 rounded-xl bg-white dark:bg-slate-800 border border-amber-200 dark:border-amber-800/60 shadow-sm flex items-center gap-2 animate-in zoom-in-75 duration-200"
                      >
                        <span className="text-xl">{item.icon}</span>
                        <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
                          {item.name}
                        </span>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>

          {/* Mathematical Equivalence Note */}
          {selectionOrderLog.length > 0 && (
            <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-[11px] text-slate-600 dark:text-slate-400">
              <span className="font-semibold text-indigo-600 dark:text-indigo-400">
                Order Invariance Check:
              </span>{" "}
              Items were chosen in order:{" "}
              <span className="font-mono font-medium">
                [{selectionOrderLog.map((id) => challenge.poolItems.find((p) => p.id === id)?.name).join(", ")}]
              </span>
              . But the basket contains the unordered set:{" "}
              <span className="font-mono font-bold text-slate-800 dark:text-slate-200">
                {"{" + basket.map((id) => challenge.poolItems.find((p) => p.id === id)?.name).sort().join(", ") + "}"}
              </span>
              . Both represent the exact same single combination!
            </div>
          )}
        </div>
      </div>

      {/* Combinatorial Challenge Question */}
      <div className="p-5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 space-y-4">
        <div>
          <h3 className="text-sm font-bold text-slate-900 dark:text-white">
            Counting Challenge: How many total unique combinations of {challenge.requiredCount} items can be chosen from {challenge.poolItems.length} total items?
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Use the combination formula: {challenge.poolItems.length}C{challenge.requiredCount}.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <input
            type="number"
            placeholder="Enter total combinations..."
            value={userGuess}
            onChange={(e) => setUserGuess(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleCheckAnswer();
            }}
            className="w-full sm:w-64 px-3.5 py-2 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-sm font-mono text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
          <button
            onClick={handleCheckAnswer}
            className="px-5 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs transition-colors shadow-xs"
          >
            Check Calculation
          </button>
        </div>

        {/* Feedback Deck */}
        {isSubmitted && (
          <div
            className={`p-4 rounded-xl border space-y-2 ${
              isCorrect
                ? "bg-emerald-50 dark:bg-emerald-950/30 border-emerald-300 dark:border-emerald-800"
                : "bg-rose-50 dark:bg-rose-950/30 border-rose-300 dark:border-rose-800"
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 font-bold text-sm">
                {isCorrect ? (
                  <>
                    <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                    <span className="text-emerald-800 dark:text-emerald-300">
                      Perfect Calculation! (+20 pts)
                    </span>
                  </>
                ) : (
                  <span className="text-rose-800 dark:text-rose-300">
                    Incorrect. Target value is {challenge.calculatedAnswer}.
                  </span>
                )}
              </div>

              <button
                onClick={handleNextChallenge}
                className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-semibold text-xs transition-colors"
              >
                Next Challenge <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="font-mono text-xs text-slate-700 dark:text-slate-300">
              Formula: {challenge.formulaText} = {challenge.calculatedAnswer} combinations.
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              {challenge.explanation}
            </p>
          </div>
        )}
      </div>

      {/* Footer Tools */}
      <div className="flex items-center justify-between text-xs text-slate-500 pt-2 border-t border-slate-100 dark:border-slate-700">
        <button
          onClick={() => setShowHint(!showHint)}
          className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 hover:underline"
        >
          <Lightbulb className="w-3.5 h-3.5" />
          {showHint ? "Hide Hint" : "Formula Hint"}
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              const prev = (challengeIdx - 1 + BASKET_CHALLENGES.length) % BASKET_CHALLENGES.length;
              setChallengeIdx(prev);
              setBasket([]);
              setUserGuess("");
              setIsSubmitted(false);
            }}
            className="p-1.5 rounded bg-slate-100 dark:bg-slate-700 hover:bg-slate-200"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
          </button>
          <span>Challenge {challengeIdx + 1} of {BASKET_CHALLENGES.length}</span>
          <button
            onClick={handleNextChallenge}
            className="p-1.5 rounded bg-slate-100 dark:bg-slate-700 hover:bg-slate-200"
          >
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {showHint && (
        <div className="p-3 rounded-lg bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 text-xs text-emerald-800 dark:text-emerald-200">
          💡 <strong>Combination Formula:</strong> nCr = n! / [r! (n - r)!]. With n = {challenge.poolItems.length} and r = {challenge.requiredCount}, multiply descending {challenge.requiredCount} factors and divide by {challenge.requiredCount}!.
        </div>
      )}
    </div>
  );
};
