import React, { useState } from "react";
import { SELECTION_SORTER_THEORY } from "../../data/newGamesData";
import { GameAcademicPanel } from "./GameAcademicPanel";
import { ShoppingBag, RotateCcw, CheckCircle2, XCircle, HelpCircle, Trophy, Sparkles, ArrowRight, Layers, Plus, Trash2 } from "lucide-react";

interface SorterLevel {
  id: number;
  title: string;
  scenario: string;
  mode: "no_repetition" | "with_repetition";
  n: number;
  r: number;
  categoryLabel: string;
  items: { id: string; name: string; icon: string; color: string }[];
  correctCount: number;
  formulaTex: string;
  hint1: string;
  hint2: string;
  solutionDerivation: string;
}

const SORTER_LEVELS: SorterLevel[] = [
  {
    id: 1,
    title: "Level 1: Pizza Toppings (No Repetition)",
    scenario: "Select 3 distinct toppings for a gourmet pizza from 6 available toppings: Mushrooms, Olives, Pepperoni, Bell Pepper, Onions, and Basil. Order on the pizza does not matter, and duplicate toppings are not allowed. How many different topping combinations can be chosen?",
    mode: "no_repetition",
    n: 6,
    r: 3,
    categoryLabel: "Topping",
    items: [
      { id: "M", name: "Mushrooms", icon: "🍄", color: "bg-amber-100 dark:bg-amber-950" },
      { id: "O", name: "Olives", icon: "🫒", color: "bg-emerald-100 dark:bg-emerald-950" },
      { id: "P", name: "Pepperoni", icon: "🍕", color: "bg-rose-100 dark:bg-rose-950" },
      { id: "B", name: "Bell Pepper", icon: "🫑", color: "bg-green-100 dark:bg-green-950" },
      { id: "N", name: "Onions", icon: "🧅", color: "bg-purple-100 dark:bg-purple-950" },
      { id: "S", name: "Basil", icon: "🌿", color: "bg-teal-100 dark:bg-teal-950" }
    ],
    correctCount: 20,
    formulaTex: "ⁿCᵣ = ⁶C₃ = 6! / (3! × 3!) = 20",
    hint1: "Because order does not matter and each topping is chosen at most once, use ⁿCᵣ without repetition.",
    hint2: "Calculate ⁶C₃ = (6 × 5 × 4) / (3 × 2 × 1) = 120 / 6 = 20.",
    solutionDerivation: "⁶C₃ = 6! / [3!(6 - 3)!] = (6 × 5 × 4) / 6 = 20 unique topping combinations."
  },
  {
    id: 2,
    title: "Level 2: Ice Cream Bowl (Repetition Allowed)",
    scenario: "An ice cream parlor offers 3 flavors: Vanilla, Chocolate, and Strawberry. A customer orders a bowl with 4 scoops. Flavors can be repeated (e.g. 3 Vanilla + 1 Chocolate, or 2 Vanilla + 2 Strawberry), and scoop order in the bowl does not matter. How many distinct flavor combinations can be created?",
    mode: "with_repetition",
    n: 3,
    r: 4,
    categoryLabel: "Flavor",
    items: [
      { id: "V", name: "Vanilla", icon: "🍨", color: "bg-amber-100 dark:bg-amber-950" },
      { id: "C", name: "Chocolate", icon: "🍫", color: "bg-amber-200 dark:bg-amber-900" },
      { id: "S", name: "Strawberry", icon: "🍓", color: "bg-rose-100 dark:bg-rose-950" }
    ],
    correctCount: 15,
    formulaTex: "C(n + r - 1, r) = C(3 + 4 - 1, 4) = C(6, 4) = 15",
    hint1: "Repetition is allowed and order does not matter: use the Stars and Bars formula C(n + r - 1, r).",
    hint2: "n = 3, r = 4 → n + r - 1 = 6. Calculate C(6, 4) = C(6, 2) = (6 × 5) / 2 = 15.",
    solutionDerivation: "Using stars and bars: 4 stars (scoops) and 2 bars (separating 3 flavors). C(3 + 4 - 1, 4) = C(6, 4) = 15."
  },
  {
    id: 3,
    title: "Level 3: Science Fair Committee (No Repetition)",
    scenario: "A department must form a student committee of 4 members chosen from 8 eligible candidates. There are no ranks or positions on the committee. In how many ways can this committee be selected?",
    mode: "no_repetition",
    n: 8,
    r: 4,
    categoryLabel: "Candidate",
    items: [
      { id: "C1", name: "Alice", icon: "👩‍🎓", color: "bg-indigo-100 dark:bg-indigo-950" },
      { id: "C2", name: "Bob", icon: "👨‍🎓", color: "bg-emerald-100 dark:bg-emerald-950" },
      { id: "C3", name: "Carol", icon: "👩‍🔬", color: "bg-amber-100 dark:bg-amber-950" },
      { id: "C4", name: "Dave", icon: "👨‍💻", color: "bg-rose-100 dark:bg-rose-950" },
      { id: "C5", name: "Elena", icon: "👩‍🏫", color: "bg-purple-100 dark:bg-purple-950" },
      { id: "C6", name: "Frank", icon: "👨‍🔧", color: "bg-teal-100 dark:bg-teal-950" },
      { id: "C7", name: "Grace", icon: "👩‍🚀", color: "bg-blue-100 dark:bg-blue-950" },
      { id: "C8", name: "Henry", icon: "👨‍🎨", color: "bg-pink-100 dark:bg-pink-950" }
    ],
    correctCount: 70,
    formulaTex: "ⁿCᵣ = ⁸C₄ = 8! / (4! × 4!) = 70",
    hint1: "Selecting a committee without internal hierarchy is a pure combination problem without repetition (⁸C₄).",
    hint2: "Calculate (8 × 7 × 6 × 5) / (4 × 3 × 2 × 1) = 1680 / 24 = 70.",
    solutionDerivation: "⁸C₄ = 8! / (4! × 4!) = (8 × 7 × 6 × 5) / (24) = 70 distinct committees."
  },
  {
    id: 4,
    title: "Level 4: Bakery Donut Box (Repetition Allowed)",
    scenario: "A bakery sells 4 varieties of gourmet donuts: Glazed, Chocolate, Jelly, and Cinnamon. A customer buys a variety box of 5 donuts. Any flavor can be selected multiple times. How many different box selections are possible?",
    mode: "with_repetition",
    n: 4,
    r: 5,
    categoryLabel: "Donut",
    items: [
      { id: "G", name: "Glazed", icon: "🍩", color: "bg-amber-100 dark:bg-amber-950" },
      { id: "C", name: "Chocolate", icon: "🍫", color: "bg-amber-200 dark:bg-amber-900" },
      { id: "J", name: "Jelly", icon: "🍓", color: "bg-rose-100 dark:bg-rose-950" },
      { id: "N", name: "Cinnamon", icon: "🥨", color: "bg-orange-100 dark:bg-orange-950" }
    ],
    correctCount: 56,
    formulaTex: "C(n + r - 1, r) = C(4 + 5 - 1, 5) = C(8, 5) = 56",
    hint1: "4 varieties (n = 4) and 5 items to select (r = 5) with repetition allowed.",
    hint2: "Total symbols = 4 + 5 - 1 = 8. Calculate C(8, 5) = C(8, 3) = (8 × 7 × 6) / 6 = 56.",
    solutionDerivation: "C(4 + 5 - 1, 5) = C(8, 5) = C(8, 3) = (8 × 7 × 6) / 6 = 56 possible boxes."
  },
  {
    id: 5,
    title: "Level 5: Rare Mineral Sample Set (No Repetition)",
    scenario: "A geological institute has 7 rare crystal minerals. A researcher needs to select a sample set of 5 distinct crystals for spectroscopic testing. In how many ways can the 5 crystals be selected?",
    mode: "no_repetition",
    n: 7,
    r: 5,
    categoryLabel: "Crystal",
    items: [
      { id: "Q", name: "Quartz", icon: "💎", color: "bg-cyan-100 dark:bg-cyan-950" },
      { id: "R", name: "Ruby", icon: "♦️", color: "bg-rose-100 dark:bg-rose-950" },
      { id: "S", name: "Sapphire", icon: "🔷", color: "bg-blue-100 dark:bg-blue-950" },
      { id: "E", name: "Emerald", icon: "🟩", color: "bg-emerald-100 dark:bg-emerald-950" },
      { id: "A", name: "Amethyst", icon: "🟣", color: "bg-purple-100 dark:bg-purple-950" },
      { id: "T", name: "Topaz", icon: "🔶", color: "bg-amber-100 dark:bg-amber-950" },
      { id: "O", name: "Opal", icon: "⚪", color: "bg-slate-200 dark:bg-slate-800" }
    ],
    correctCount: 21,
    formulaTex: "ⁿCᵣ = ⁷C₅ = ⁷C₂ = (7 × 6) / 2 = 21",
    hint1: "Order does not matter and crystals cannot be repeated: ⁷C₅.",
    hint2: "Use the combinatorial symmetry property: ⁷C₅ = ⁷C₂ = (7 × 6) / 2 = 21.",
    solutionDerivation: "⁷C₅ = 7! / (5! × 2!) = (7 × 6) / 2 = 21 distinct crystal sets."
  }
];

export const SelectionSorterGame: React.FC = () => {
  const [levelIndex, setLevelIndex] = useState<number>(0);
  const [userGuess, setUserGuess] = useState<string>("");
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [isCorrect, setIsCorrect] = useState<boolean>(false);
  const [revealedHintIndex, setRevealedHintIndex] = useState<number>(0);
  const [score, setScore] = useState<number>(0);
  const [streak, setStreak] = useState<number>(0);

  const level = SORTER_LEVELS[levelIndex];

  // Interactive basket / selection sandbox
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  const handleAddItem = (itemId: string) => {
    if (level.mode === "no_repetition" && selectedItems.includes(itemId)) {
      return; // No repetition allowed
    }
    if (selectedItems.length < level.r) {
      setSelectedItems([...selectedItems, itemId]);
    }
  };

  const handleRemoveItem = (index: number) => {
    const nextList = [...selectedItems];
    nextList.splice(index, 1);
    setSelectedItems(nextList);
  };

  const handleClearBasket = () => {
    setSelectedItems([]);
  };

  const handleCheckAnswer = () => {
    if (submitted) return;
    const val = parseInt(userGuess.trim(), 10);
    const correct = val === level.correctCount;
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
    const next = (levelIndex + 1) % SORTER_LEVELS.length;
    setLevelIndex(next);
    setSelectedItems([]);
    setUserGuess("");
    setSubmitted(false);
    setIsCorrect(false);
    setRevealedHintIndex(0);
  };

  const handleResetLevel = () => {
    setSelectedItems([]);
    setUserGuess("");
    setSubmitted(false);
    setIsCorrect(false);
    setRevealedHintIndex(0);
  };

  return (
    <div className="space-y-6">
      {/* 1-5. Full Academic Foundations & 5 Worked Examples */}
      <GameAcademicPanel data={SELECTION_SORTER_THEORY} />

      {/* 6-9. Animated Demonstration, Interactive Challenge & Scoring */}
      <div className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-sm overflow-hidden p-6 space-y-6">
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-700">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-indigo-600 dark:text-indigo-400">
              <ShoppingBag className="w-4 h-4" />
              <span>GAME 4 · COMBINATION SELECTION SORTER</span>
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
              Level {levelIndex + 1}/{SORTER_LEVELS.length}
            </div>
          </div>
        </div>

        {/* Level Scenario */}
        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-700 text-sm leading-relaxed text-slate-800 dark:text-slate-200">
          <span className="font-bold text-slate-900 dark:text-white">Scenario: </span>
          {level.scenario}
        </div>

        {/* Mode Indicator Badge */}
        <div className="flex items-center gap-2 text-xs font-medium">
          <span className="text-slate-500">Active Mathematical Rule:</span>
          <span
            className={`px-2.5 py-1 rounded-md font-bold ${
              level.mode === "no_repetition"
                ? "bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800"
                : "bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 border border-amber-300 dark:border-amber-800"
            }`}
          >
            {level.mode === "no_repetition"
              ? "COMBINATION WITHOUT REPETITION (ⁿCᵣ) · Each item chosen at most once"
              : "COMBINATION WITH REPETITION ALLOWED · Stars & Bars C(n+r-1, r)"}
          </span>
        </div>

        {/* 6. Animated Demonstration: Interactive Selection Sandbox */}
        <div className="space-y-4">
          <div className="flex items-center justify-between text-xs font-bold text-slate-600 dark:text-slate-300">
            <span>
              6. Visual Selection Basket (Pick {level.r} {level.categoryLabel}s from {level.n} options)
            </span>
            <button
              onClick={handleClearBasket}
              className="px-2.5 py-1 rounded bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 text-[11px] font-semibold text-slate-700 dark:text-slate-200 transition-colors flex items-center gap-1"
            >
              <Trash2 className="w-3 h-3" />
              <span>Empty Basket</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Left: Available Options Dispenser */}
            <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/40 space-y-3">
              <div className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center justify-between">
                <span>Available Types / Options (n = {level.n}):</span>
                <span className="text-[11px] text-slate-500">Click to add to selection</span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {level.items.map((it) => {
                  const isAlreadySelected = level.mode === "no_repetition" && selectedItems.includes(it.id);
                  const isBasketFull = selectedItems.length >= level.r;
                  return (
                    <button
                      key={it.id}
                      onClick={() => handleAddItem(it.id)}
                      disabled={isAlreadySelected || isBasketFull}
                      className={`p-2.5 rounded-xl border text-left flex items-center gap-2 transition-all transform hover:-translate-y-0.5 ${
                        it.color
                      } ${
                        isAlreadySelected || isBasketFull
                          ? "opacity-40 cursor-not-allowed border-slate-200 dark:border-slate-700"
                          : "border-slate-300 dark:border-slate-600 hover:border-indigo-500 shadow-sm"
                      }`}
                    >
                      <span className="text-xl shrink-0">{it.icon}</span>
                      <div className="truncate">
                        <div className="text-xs font-bold text-slate-900 dark:text-white truncate">
                          {it.name}
                        </div>
                        <div className="text-[10px] text-slate-500">
                          {level.mode === "no_repetition" && isAlreadySelected ? "Selected" : "Add +"}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Right: Active Unordered Selection Container */}
            <div className="p-4 rounded-xl border-2 border-dashed border-indigo-300 dark:border-indigo-800 bg-indigo-50/20 dark:bg-indigo-950/20 flex flex-col justify-between space-y-3">
              <div>
                <div className="text-xs font-bold text-indigo-900 dark:text-indigo-300 flex items-center justify-between">
                  <span>Your Unordered Selection (r = {selectedItems.length}/{level.r}):</span>
                  <span className="text-[11px] text-indigo-600 dark:text-indigo-400 font-mono">
                    Order Does Not Matter
                  </span>
                </div>

                <div className="min-h-[110px] flex flex-wrap items-center gap-2 p-3 mt-2 rounded-lg bg-white/70 dark:bg-slate-900/60 border border-indigo-100 dark:border-indigo-900/50">
                  {selectedItems.length === 0 ? (
                    <div className="w-full text-center py-6 text-xs text-slate-400 italic">
                      Basket is empty. Click options on the left to add items.
                    </div>
                  ) : (
                    selectedItems.map((sId, sIdx) => {
                      const def = level.items.find((x) => x.id === sId);
                      return (
                        <div
                          key={sIdx}
                          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-600 text-white text-xs font-semibold shadow-sm animate-scaleIn"
                        >
                          <span>{def?.icon}</span>
                          <span>{def?.name}</span>
                          <button
                            onClick={() => handleRemoveItem(sIdx)}
                            className="ml-1 text-white/70 hover:text-white"
                            title="Remove from selection"
                          >
                            ×
                          </button>
                        </div>
                      );
                    })
                  )}
                </div>
              </div>

              {/* Order Invariance Demonstration Note */}
              <div className="p-2.5 rounded-lg bg-white/80 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-700 text-[11px] text-slate-600 dark:text-slate-400">
                <span className="font-bold text-slate-800 dark:text-slate-200">
                  Order Invariance Proof:{" "}
                </span>
                {selectedItems.length > 1 ? (
                  <span>
                    Selection &#123;{selectedItems.map((id) => level.items.find((x) => x.id === id)?.name).join(", ")}&#125; is
                    mathematically IDENTICAL to any of its {selectedItems.length}! ={" "}
                    {selectedItems.length === 2 ? 2 : selectedItems.length === 3 ? 6 : selectedItems.length === 4 ? 24 : 120}{" "}
                    re-ordered permutations.
                  </span>
                ) : (
                  <span>Add items to see how combination order equivalence works.</span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* 7. Interactive Challenge: Mathematical Calculation Input */}
        <div className="p-4 rounded-xl border border-indigo-200 dark:border-indigo-900/60 bg-indigo-50/40 dark:bg-indigo-950/20 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-700 dark:text-indigo-300 block">
                7. Calculate Total Unique Combinations
              </span>
              <span className="text-sm font-semibold text-slate-900 dark:text-white">
                How many unique combinations of {level.r} {level.categoryLabel}s can be formed from {level.n} categories?
              </span>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="number"
                placeholder="Enter combination count..."
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
                    ? `Correct! Total Unique Combinations: ${level.correctCount}`
                    : "Incorrect Count. Check the formula substitution below."}
                </div>
                <div className="font-mono text-indigo-700 dark:text-indigo-300 font-semibold">
                  Applied Formula: {level.formulaTex}
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
                <span>Next Level ({levelIndex + 2 <= SORTER_LEVELS.length ? levelIndex + 2 : 1})</span>
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
