import React, { useState } from "react";
import { ARRANGEMENT_LEVELS, ArrangementLevel } from "../../data/gamesData";
import { MoveRight, RotateCcw, CheckCircle2, Trophy, HelpCircle, ArrowLeft, ArrowRight } from "lucide-react";

export const ArrangementPuzzleGame: React.FC = () => {
  const [levelIndex, setLevelIndex] = useState<number>(0);
  const currentLevel: ArrangementLevel = ARRANGEMENT_LEVELS[levelIndex];

  const [currentTiles, setCurrentTiles] = useState<string[]>([...currentLevel.items]);
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  const [historyMoves, setHistoryMoves] = useState<string[][]>([[...currentLevel.items]]);
  const [showExplanation, setShowExplanation] = useState<boolean>(false);
  const [showHint, setShowHint] = useState<boolean>(false);
  const [discoveredArrangements, setDiscoveredArrangements] = useState<Set<string>>(
    new Set([currentLevel.items.join("")])
  );

  // Switch level
  const handleSelectLevel = (idx: number) => {
    setLevelIndex(idx);
    const lvl = ARRANGEMENT_LEVELS[idx];
    setCurrentTiles([...lvl.items]);
    setSelectedIdx(null);
    setHistoryMoves([[...lvl.items]]);
    setShowExplanation(false);
    setShowHint(false);
    setDiscoveredArrangements(new Set([lvl.items.join("")]));
  };

  // Swap tiles
  const handleTileClick = (idx: number) => {
    if (selectedIdx === null) {
      setSelectedIdx(idx);
    } else if (selectedIdx === idx) {
      setSelectedIdx(null);
    } else {
      // Swap selectedIdx and idx
      const newTiles = [...currentTiles];
      const temp = newTiles[selectedIdx];
      newTiles[selectedIdx] = newTiles[idx];
      newTiles[idx] = temp;

      setCurrentTiles(newTiles);
      setSelectedIdx(null);
      setHistoryMoves((prev) => [...prev, newTiles]);

      // Track discovered permutations
      const str = newTiles.join("");
      setDiscoveredArrangements((prev) => new Set([...prev, str]));
    }
  };

  // Shuffle randomly
  const handleShuffle = () => {
    const shuffled = [...currentTiles];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    setCurrentTiles(shuffled);
    setSelectedIdx(null);
    setHistoryMoves((prev) => [...prev, shuffled]);
    setDiscoveredArrangements((prev) => new Set([...prev, shuffled.join("")]));
  };

  // Reset current level
  const handleResetLevel = () => {
    setCurrentTiles([...currentLevel.items]);
    setSelectedIdx(null);
    setHistoryMoves([[...currentLevel.items]]);
    setShowExplanation(false);
    setShowHint(false);
  };

  return (
    <div className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 space-y-6 shadow-sm">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-700">
        <div>
          <div className="text-xs font-bold text-indigo-600 dark:text-indigo-400">
            GAME 2: ARRANGEMENT PUZZLE &amp; FACTORIAL BUILDER
          </div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white mt-0.5">
            Level {currentLevel.level}: Arranging "{currentLevel.word}"
          </h2>
        </div>

        {/* Level Selector Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
          {ARRANGEMENT_LEVELS.map((lvl, idx) => (
            <button
              key={lvl.level}
              onClick={() => handleSelectLevel(idx)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                levelIndex === idx
                  ? "bg-indigo-600 text-white shadow-xs"
                  : "bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-200"
              }`}
            >
              Lvl {lvl.level} ({lvl.word})
            </button>
          ))}
        </div>
      </div>

      {/* Explanatory Prompt */}
      <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-700 text-xs text-slate-600 dark:text-slate-300 flex items-center justify-between">
        <div>
          Click any tile, then click another tile to <strong>swap their positions</strong>.
          Every distinct ordering represents one unique linear permutation!
        </div>
        <div className="font-mono font-bold text-indigo-600 dark:text-indigo-400 shrink-0 ml-2">
          {discoveredArrangements.size} / {currentLevel.totalArrangements} explored
        </div>
      </div>

      {/* Interactive Tile Board */}
      <div className="p-8 rounded-2xl bg-gradient-to-b from-slate-100 to-slate-50 dark:from-slate-900 dark:to-slate-950 border border-slate-200 dark:border-slate-800 space-y-6">
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 min-h-[120px]">
          {currentTiles.map((tile, idx) => {
            const isSelected = selectedIdx === idx;
            const displayLetter = tile.replace("_2", "");
            return (
              <button
                key={idx}
                onClick={() => handleTileClick(idx)}
                className={`w-14 h-16 sm:w-16 sm:h-20 rounded-xl font-mono text-2xl sm:text-3xl font-extrabold flex flex-col items-center justify-center transition-all duration-200 shadow-md ${
                  isSelected
                    ? "bg-amber-400 text-slate-950 ring-4 ring-amber-300 -translate-y-2 scale-105"
                    : "bg-white dark:bg-slate-800 text-slate-900 dark:text-white hover:-translate-y-1 hover:border-indigo-400 border border-slate-300 dark:border-slate-700"
                }`}
              >
                <span>{displayLetter}</span>
                <span className="text-[10px] font-sans font-normal opacity-50">Pos {idx + 1}</span>
              </button>
            );
          })}
        </div>

        {/* Current Arrangement Display */}
        <div className="text-center space-y-1">
          <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
            Current Sequential String
          </div>
          <div className="font-mono text-2xl font-black text-indigo-600 dark:text-indigo-400 tracking-widest">
            {currentTiles.map((t) => t.replace("_2", "")).join(" ")}
          </div>
        </div>

        {/* Controls Bar */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <button
            onClick={handleShuffle}
            className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs transition-colors shadow-xs"
          >
            Shuffle to Next Permutation
          </button>
          <button
            onClick={handleResetLevel}
            className="px-3.5 py-2 rounded-lg bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-800 dark:text-slate-200 font-semibold text-xs transition-colors flex items-center gap-1"
          >
            <RotateCcw className="w-3.5 h-3.5" /> Reset Word
          </button>
          <button
            onClick={() => setShowExplanation(!showExplanation)}
            className="px-3.5 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs transition-colors"
          >
            {showExplanation ? "Hide Combinatorial Math" : "Reveal Total Possible Formula"}
          </button>
        </div>
      </div>

      {/* Combinatorial Formula Breakdown */}
      {showExplanation && (
        <div className="p-5 rounded-xl bg-indigo-50/70 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-800/50 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-900 dark:text-indigo-300">
              Factorial Permutation Calculation for "{currentLevel.word}"
            </span>
            <span className="text-base font-bold font-mono text-indigo-600 dark:text-indigo-400">
              {currentLevel.totalArrangements} Total Arrangements
            </span>
          </div>
          <div className="font-mono text-xs sm:text-sm text-slate-800 dark:text-slate-200">
            Formula: {currentLevel.formula}
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            {currentLevel.hint}
          </p>
        </div>
      )}

      {/* Footer Navigation */}
      <div className="flex items-center justify-between text-xs text-slate-500 pt-2 border-t border-slate-100 dark:border-slate-700">
        <button
          onClick={() => setShowHint(!showHint)}
          className="flex items-center gap-1 text-amber-600 dark:text-amber-400 hover:underline"
        >
          <HelpCircle className="w-3.5 h-3.5" />
          {showHint ? "Hide Hint" : "Need Hint?"}
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={() => handleSelectLevel(Math.max(0, levelIndex - 1))}
            disabled={levelIndex === 0}
            className="p-1.5 rounded bg-slate-100 dark:bg-slate-700 disabled:opacity-40"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
          </button>
          <span>Level {levelIndex + 1} of {ARRANGEMENT_LEVELS.length}</span>
          <button
            onClick={() => handleSelectLevel(Math.min(ARRANGEMENT_LEVELS.length - 1, levelIndex + 1))}
            disabled={levelIndex === ARRANGEMENT_LEVELS.length - 1}
            className="p-1.5 rounded bg-slate-100 dark:bg-slate-700 disabled:opacity-40"
          >
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {showHint && (
        <div className="p-3 rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-200 text-xs text-amber-800 dark:text-amber-200">
          💡 <strong>Counting Principle:</strong> Position 1 has {currentLevel.items.length} choices. Position 2 has {currentLevel.items.length - 1} choices, and so on. Multiply all sequential choices to get {currentLevel.items.length}!
        </div>
      )}
    </div>
  );
};
