import React, { useState } from "react";
import { DetectiveGame } from "./games/DetectiveGame";
import { ArrangementPuzzleGame } from "./games/ArrangementPuzzleGame";
import { CombinationBasketGame } from "./games/CombinationBasketGame";
import { EscapeRoomGame } from "./games/EscapeRoomGame";
import { CountingRaceGame } from "./games/CountingRaceGame";
import { DanceStudioGame } from "./games/DanceStudioGame";
import { CountingMazeGame } from "./games/CountingMazeGame";
import { ArrangementLabGame } from "./games/ArrangementLabGame";
import { TrainCarriageGame } from "./games/TrainCarriageGame";
import { SelectionSorterGame } from "./games/SelectionSorterGame";
import { TournamentPlannerGame } from "./games/TournamentPlannerGame";
import { FormulaBattleGame } from "./games/FormulaBattleGame";
import {
  Search,
  Move,
  ShoppingBasket,
  Lock,
  Flag,
  Activity,
  Compass,
  Sliders,
  Train,
  ShoppingBag,
  Users,
  Swords,
  EyeOff,
  Sparkles,
  Gamepad2
} from "lucide-react";

export const GameZoneSection: React.FC = () => {
  const [activeGame, setActiveGame] = useState<number>(7); // Default to the first new Game (Counting Maze) or user selection
  const [gameCategory, setGameCategory] = useState<"all" | "new" | "classic">("all");
  const [reducedMotion, setReducedMotion] = useState<boolean>(false);

  const ALL_GAMES = [
    // 6 Original Games (Preserved 100%)
    { id: 1, category: "classic", name: "1. Detective", icon: Search, tag: "Perm vs Comb", desc: "15 Clue Cases" },
    { id: 2, category: "classic", name: "2. Arrangement", icon: Move, tag: "Factorials n!", desc: "5 Tile Puzzles" },
    { id: 3, category: "classic", name: "3. Basket", icon: ShoppingBasket, tag: "Combinations nCr", desc: "5 Challenges" },
    { id: 4, category: "classic", name: "4. Escape Room", icon: Lock, tag: "Multi-Topic", desc: "5 Vault Doors" },
    { id: 5, category: "classic", name: "5. Counting Race", icon: Flag, tag: "Speed Track", desc: "10 Hurdles" },
    { id: 6, category: "classic", name: "6. Dance Studio", icon: Activity, tag: "Articulated Limbs", desc: "5 Stage Levels" },

    // 6 New Games (Added per specifications)
    { id: 7, category: "new", name: "7. Counting Maze", icon: Compass, tag: "Counting Principles", desc: "Routes & Choices" },
    { id: 8, category: "new", name: "8. Arrangement Lab", icon: Sliders, tag: "Restricted Perms", desc: "Block Method & Rules" },
    { id: 9, category: "new", name: "9. Train Carriage", icon: Train, tag: "Coupling Perms", desc: "Locomotive Logic" },
    { id: 10, category: "new", name: "10. Selection Sorter", icon: ShoppingBag, tag: "Comb with/w/o Rep", desc: "Stars & Bars" },
    { id: 11, category: "new", name: "11. Tournament Planner", icon: Users, tag: "Team (nCr) vs Role (nPr)", desc: "Duality Bridge" },
    { id: 12, category: "new", name: "12. Formula Battle", icon: Swords, tag: "Cross-Topic Arena", desc: "7 Concepts Dual-Phase" }
  ];

  const displayedGames = ALL_GAMES.filter((g) => {
    if (gameCategory === "all") return true;
    return g.category === gameCategory;
  });

  return (
    <div className="space-y-8 py-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-amber-600 dark:text-amber-400">
            <Gamepad2 className="w-4 h-4" />
            <span>Interactive Visual Sandboxes &amp; Academic Laboratories</span>
            <span aria-hidden="true">·</span>
            <span>12 Animated Educational Games</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mt-1">
            Combinatorics Game Zone
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-300 mt-0.5 max-w-2xl">
            Experience combinatorial mathematics through real physical motion, moving avatars, interactive train coupling, and branching mazes.
            Every game features complete mathematical definitions, explanations, formula boxes, 5 solved examples, and interactive challenges.
          </p>
        </div>

        {/* Accessibility & Category Controls */}
        <div className="flex items-center gap-2 self-start sm:self-auto">
          <button
            onClick={() => setReducedMotion(!reducedMotion)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-semibold transition-colors ${
              reducedMotion
                ? "bg-amber-100 dark:bg-amber-950/60 border-amber-400 text-amber-900 dark:text-amber-200"
                : "bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-50"
            }`}
            title="Toggle reduced motion for accessibility"
          >
            <EyeOff className="w-3.5 h-3.5" />
            <span>{reducedMotion ? "Reduced Motion: ON" : "Reduced Motion: OFF"}</span>
          </button>
        </div>
      </div>

      {/* Category Filter Pills */}
      <div className="flex items-center gap-2 text-xs font-semibold">
        <button
          onClick={() => setGameCategory("all")}
          className={`px-3 py-1.5 rounded-lg border transition-colors ${
            gameCategory === "all"
              ? "bg-slate-900 dark:bg-white text-white dark:text-slate-900 border-slate-900 dark:border-white shadow-sm"
              : "bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:border-slate-400"
          }`}
        >
          All 12 Games
        </button>
        <button
          onClick={() => setGameCategory("new")}
          className={`px-3 py-1.5 rounded-lg border transition-colors flex items-center gap-1 ${
            gameCategory === "new"
              ? "bg-indigo-600 text-white border-indigo-600 shadow-sm"
              : "bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-indigo-600 dark:text-indigo-400 hover:border-indigo-400"
          }`}
        >
          <Sparkles className="w-3 h-3" />
          <span>New Academic Labs (Games 7–12)</span>
        </button>
        <button
          onClick={() => setGameCategory("classic")}
          className={`px-3 py-1.5 rounded-lg border transition-colors ${
            gameCategory === "classic"
              ? "bg-slate-900 dark:bg-white text-white dark:text-slate-900 border-slate-900 dark:border-white shadow-sm"
              : "bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:border-slate-400"
          }`}
        >
          Classic Sandboxes (Games 1–6)
        </button>
      </div>

      {/* 12-Game Selector Tabs */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
        {displayedGames.map((g) => {
          const Icon = g.icon;
          const isActive = activeGame === g.id;
          const isNewGame = g.category === "new";
          return (
            <button
              key={g.id}
              onClick={() => setActiveGame(g.id)}
              className={`p-3 rounded-xl text-left border transition-all ${
                isActive
                  ? "bg-indigo-600 text-white border-indigo-600 shadow-md ring-2 ring-indigo-300 dark:ring-indigo-900"
                  : "bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 border-slate-200 dark:border-slate-700 hover:border-slate-400"
              }`}
            >
              <div className="flex items-center justify-between">
                <Icon className={`w-4 h-4 ${isActive ? "text-white" : "text-indigo-600 dark:text-indigo-400"}`} />
                <span
                  className={`text-[9px] font-mono px-1.5 py-0.5 rounded ${
                    isActive
                      ? "bg-white/20 text-white"
                      : isNewGame
                      ? "bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 font-bold border border-indigo-200 dark:border-indigo-800"
                      : "bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300"
                  }`}
                >
                  {g.tag}
                </span>
              </div>
              <div className="text-xs font-bold mt-2 truncate">{g.name}</div>
              <div className={`text-[10px] mt-0.5 truncate ${isActive ? "text-indigo-100" : "text-slate-400"}`}>
                {g.desc}
              </div>
            </button>
          );
        })}
      </div>

      {/* Render Active Game */}
      <div className={reducedMotion ? "transition-none" : ""}>
        {/* Original 6 Games */}
        {activeGame === 1 && <DetectiveGame />}
        {activeGame === 2 && <ArrangementPuzzleGame />}
        {activeGame === 3 && <CombinationBasketGame />}
        {activeGame === 4 && <EscapeRoomGame />}
        {activeGame === 5 && <CountingRaceGame />}
        {activeGame === 6 && <DanceStudioGame />}

        {/* 6 New Animated Learning Games */}
        {activeGame === 7 && <CountingMazeGame />}
        {activeGame === 8 && <ArrangementLabGame />}
        {activeGame === 9 && <TrainCarriageGame />}
        {activeGame === 10 && <SelectionSorterGame />}
        {activeGame === 11 && <TournamentPlannerGame />}
        {activeGame === 12 && <FormulaBattleGame />}
      </div>
    </div>
  );
};
