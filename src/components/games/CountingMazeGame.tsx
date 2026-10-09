import React, { useState } from "react";
import { COUNTING_MAZE_THEORY } from "../../data/newGamesData";
import { GameAcademicPanel } from "./GameAcademicPanel";
import { Play, RotateCcw, CheckCircle2, XCircle, HelpCircle, Trophy, Sparkles, ArrowRight, Compass } from "lucide-react";

interface MazeLevel {
  id: number;
  title: string;
  scenario: string;
  structureType: "multiplication" | "addition" | "hybrid";
  stages: { name: string; choices: string[]; count: number }[];
  corridors?: { name: string; stages: { name: string; count: number }[]; total: number }[];
  correctTotalRoutes: number;
  hint1: string;
  hint2: string;
  solutionExplanation: string;
}

const MAZE_LEVELS: MazeLevel[] = [
  {
    id: 1,
    title: "Level 1: Two-Stage Sequential Highway",
    scenario: "Navigate from Start (A) to Checkpoint (B) through City Gates, then from (B) to Destination (C) through Mountain Passes. How many total paths exist from A to C?",
    structureType: "multiplication",
    stages: [
      { name: "Stage 1: City Gates (A → B)", choices: ["North Gate", "Central Gate", "South Gate"], count: 3 },
      { name: "Stage 2: Mountain Passes (B → C)", choices: ["Eagle Pass", "Wolf Ridge", "Falcon Peak", "Bear Trail"], count: 4 }
    ],
    correctTotalRoutes: 12,
    hint1: "Because reaching C requires travelling through Stage 1 AND then Stage 2 in succession, use the Multiplication Principle.",
    hint2: "Total routes = n(Gates) × n(Passes) = 3 × 4.",
    solutionExplanation: "Every gate can connect to any of the 4 mountain passes. Total routes = 3 × 4 = 12."
  },
  {
    id: 2,
    title: "Level 2: Three-Stage Expedition",
    scenario: "Travel across 3 consecutive biomes: Forest Crossing (2 bridges), River Ferry (3 boats), and Valley Tunnels (3 tunnels). What is the total number of distinct route sequences?",
    structureType: "multiplication",
    stages: [
      { name: "Stage 1: Bridges", choices: ["Rope Bridge", "Stone Arch"], count: 2 },
      { name: "Stage 2: Ferries", choices: ["Steamer", "Canoe", "Barge"], count: 3 },
      { name: "Stage 3: Tunnels", choices: ["Glow Cavern", "Echo Tunnel", "Quartz Pass"], count: 3 }
    ],
    correctTotalRoutes: 18,
    hint1: "Three independent stages in sequence: multiply the counts at each stage (n₁ × n₂ × n₃).",
    hint2: "Calculate 2 × 3 × 3.",
    solutionExplanation: "Total sequential outcomes: 2 × 3 × 3 = 18 possible travel routes."
  },
  {
    id: 3,
    title: "Level 3: Mutually Exclusive Corridors (Addition Principle)",
    scenario: "A fortress escape offers 3 disjoint escape methods that cannot be combined: Secret Dungeons (3 tunnels) OR Canal Barges (2 boats) OR Rooftop Ziplines (4 lines). How many total escape routes exist?",
    structureType: "addition",
    stages: [
      { name: "Alternative 1: Secret Dungeons", choices: ["Tunnel Alpha", "Tunnel Beta", "Tunnel Gamma"], count: 3 },
      { name: "Alternative 2: Canal Barges", choices: ["Barge One", "Barge Two"], count: 2 },
      { name: "Alternative 3: Rooftop Ziplines", choices: ["Line North", "Line East", "Line South", "Line West"], count: 4 }
    ],
    correctTotalRoutes: 9,
    hint1: "The escapee can choose only ONE of the three alternative modes; they cannot take a dungeon and a boat at the same time.",
    hint2: "Mutually exclusive alternatives require the Addition Principle: n₁ + n₂ + n₃ = 3 + 2 + 4.",
    solutionExplanation: "Since the modes are mutually exclusive, add the independent choices: 3 + 2 + 4 = 9 total escape routes."
  },
  {
    id: 4,
    title: "Level 4: Dual-Branching Maze (Hybrid Addition & Multiplication)",
    scenario: "The maze splits at the entrance into Upper High-Road (2 chambers: 3 doors then 3 doors) and Lower Low-Road (2 chambers: 2 doors then 4 doors). How many total routes lead from the entrance to the goal?",
    structureType: "hybrid",
    stages: [],
    corridors: [
      { name: "Upper High-Road", stages: [{ name: "Chamber 1", count: 3 }, { name: "Chamber 2", count: 3 }], total: 9 },
      { name: "Lower Low-Road", stages: [{ name: "Chamber 1", count: 2 }, { name: "Chamber 2", count: 4 }], total: 8 }
    ],
    correctTotalRoutes: 17,
    hint1: "Multiply stages along each corridor (Upper: 3 × 3; Lower: 2 × 4), then add the two corridor totals together.",
    hint2: "Upper = 9 routes. Lower = 8 routes. Corridors are mutually exclusive: 9 + 8.",
    solutionExplanation: "Upper routes = 3 × 3 = 9. Lower routes = 2 × 4 = 8. Since a traveller takes Upper OR Lower, total routes = 9 + 8 = 17."
  },
  {
    id: 5,
    title: "Level 5: Grand Multi-Branch Network",
    scenario: "A courier network branches into Northern Highway (3 paths to Waypoint 1 × 4 paths to Waypoint 2 = 12 routes), Central Rail (straight path through 5 express trains = 5 routes), and Southern Canal (2 locks × 5 channels = 10 routes). How many total delivery paths exist?",
    structureType: "hybrid",
    stages: [],
    corridors: [
      { name: "Northern Highway", stages: [{ name: "Leg A", count: 3 }, { name: "Leg B", count: 4 }], total: 12 },
      { name: "Central Express Rail", stages: [{ name: "Express Trains", count: 5 }], total: 5 },
      { name: "Southern Canal", stages: [{ name: "Locks", count: 2 }, { name: "Channels", count: 5 }], total: 10 }
    ],
    correctTotalRoutes: 27,
    hint1: "Calculate routes for each corridor: North (3×4=12), Central (5), South (2×5=10).",
    hint2: "Add the three mutually exclusive transport corridors: 12 + 5 + 10.",
    solutionExplanation: "North = 3 × 4 = 12. Central = 5. South = 2 × 5 = 10. Total composite routes = 12 + 5 + 10 = 27."
  }
];

export const CountingMazeGame: React.FC = () => {
  const [levelIndex, setLevelIndex] = useState<number>(0);
  const [userGuess, setUserGuess] = useState<string>("");
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [isCorrect, setIsCorrect] = useState<boolean>(false);
  const [revealedHintIndex, setRevealedHintIndex] = useState<number>(0);
  const [score, setScore] = useState<number>(0);
  const [streak, setStreak] = useState<number>(0);
  const [completedLevels, setCompletedLevels] = useState<number[]>([]);

  // Interactive traversal state
  const [selectedChoices, setSelectedChoices] = useState<Record<number, number>>({ 0: 0, 1: 0, 2: 0 });
  const [isSimulatingWalk, setIsSimulatingWalk] = useState<boolean>(false);
  const [runnerPosition, setRunnerPosition] = useState<number>(0);

  const level = MAZE_LEVELS[levelIndex];

  const handleCheckAnswer = () => {
    if (submitted) return;
    const num = parseInt(userGuess.trim(), 10);
    const correct = num === level.correctTotalRoutes;
    setIsCorrect(correct);
    setSubmitted(true);

    if (correct) {
      const addedPoints = 100 - (revealedHintIndex * 20) + (streak * 15);
      setScore((s) => s + Math.max(addedPoints, 40));
      setStreak((st) => st + 1);
      if (!completedLevels.includes(level.id)) {
        setCompletedLevels((prev) => [...prev, level.id]);
      }
      // Trigger traversal animation
      triggerWalkAnimation();
    } else {
      setStreak(0);
    }
  };

  const triggerWalkAnimation = () => {
    setIsSimulatingWalk(true);
    setRunnerPosition(0);
    let step = 0;
    const interval = setInterval(() => {
      step += 1;
      setRunnerPosition(step);
      if (step >= 3) {
        clearInterval(interval);
        setTimeout(() => setIsSimulatingWalk(false), 600);
      }
    }, 450);
  };

  const handleNextLevel = () => {
    const next = (levelIndex + 1) % MAZE_LEVELS.length;
    setLevelIndex(next);
    setUserGuess("");
    setSubmitted(false);
    setIsCorrect(false);
    setRevealedHintIndex(0);
    setRunnerPosition(0);
  };

  const handleResetLevel = () => {
    setUserGuess("");
    setSubmitted(false);
    setIsCorrect(false);
    setRevealedHintIndex(0);
    setRunnerPosition(0);
  };

  return (
    <div className="space-y-6">
      {/* 1-5. Full Academic Foundations & 5 Worked Examples */}
      <GameAcademicPanel data={COUNTING_MAZE_THEORY} />

      {/* 6-9. Animated Demonstration, Interactive Challenge & Scoring */}
      <div className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-sm overflow-hidden p-6 space-y-6">
        {/* Game Top Bar & Scoreboard */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-700">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-indigo-600 dark:text-indigo-400">
              <Compass className="w-4 h-4" />
              <span>GAME 1 · INTERACTIVE SIMULATION &amp; CHALLENGE</span>
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
              Level {levelIndex + 1}/{MAZE_LEVELS.length}
            </div>
          </div>
        </div>

        {/* Level Scenario Prompt */}
        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-700 text-sm leading-relaxed text-slate-800 dark:text-slate-200">
          <span className="font-bold text-slate-900 dark:text-white">Scenario: </span>
          {level.scenario}
        </div>

        {/* 6. Animated Demonstration: Interactive SVG Maze Canvas */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs font-bold text-slate-600 dark:text-slate-300">
            <span>6. Visual Maze Branching Network &amp; Animated Route Traversal</span>
            <button
              onClick={triggerWalkAnimation}
              disabled={isSimulatingWalk}
              className="px-2.5 py-1 rounded bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 text-[11px] font-semibold text-slate-700 dark:text-slate-200 transition-colors flex items-center gap-1"
            >
              <Play className="w-3 h-3 text-indigo-500" />
              <span>Animate Sample Route</span>
            </button>
          </div>

          <div className="w-full bg-slate-900 rounded-xl p-4 sm:p-6 overflow-x-auto border border-slate-800 shadow-inner">
            <svg
              viewBox="0 0 760 220"
              className="w-full min-w-[650px] h-48 select-none"
            >
              {/* Grid background */}
              <defs>
                <pattern id="maze-grid" width="20" height="20" patternUnits="userSpaceOnUse">
                  <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
                </pattern>
                <linearGradient id="path-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#6366f1" />
                  <stop offset="100%" stopColor="#10b981" />
                </linearGradient>
              </defs>
              <rect width="760" height="220" fill="url(#maze-grid)" />

              {/* Start Node */}
              <g transform="translate(60, 110)">
                <circle r="24" fill="#4f46e5" stroke="#818cf8" strokeWidth="3" />
                <text textAnchor="middle" dy="5" fill="#fff" fontSize="12" fontWeight="bold">START (A)</text>
              </g>

              {/* Branching paths & Junctions based on level type */}
              {level.structureType === "multiplication" && (
                <>
                  {/* Stage 1 Connections */}
                  {level.stages[0].choices.map((choice, i) => {
                    const yPos = 50 + i * (120 / (level.stages[0].choices.length - 1 || 1));
                    const isSelected = selectedChoices[0] === i;
                    return (
                      <g key={i}>
                        <path
                          d={`M 84 110 C 180 110, 200 ${yPos}, 300 ${yPos}`}
                          fill="none"
                          stroke={isSelected || runnerPosition >= 1 ? "#10b981" : "#475569"}
                          strokeWidth={isSelected ? "4" : "2"}
                          strokeDasharray={isSelected ? "none" : "4,4"}
                        />
                        {/* Intermediate node */}
                        <circle
                          cx="300"
                          cy={yPos}
                          r="15"
                          fill={isSelected ? "#10b981" : "#1e293b"}
                          stroke="#64748b"
                          strokeWidth="2"
                          className="cursor-pointer"
                          onClick={() => setSelectedChoices((p) => ({ ...p, 0: i }))}
                        />
                        <text cx="300" cy={yPos} textAnchor="middle" dy="4" fill="#fff" fontSize="10">
                          J{i + 1}
                        </text>
                        <text cx="200" cy={yPos - 6} fill="#94a3b8" fontSize="9" textAnchor="middle">
                          {choice}
                        </text>
                      </g>
                    );
                  })}

                  {/* Stage 2 Connections to Goal */}
                  {level.stages[1] &&
                    level.stages[1].choices.map((c2, j) => {
                      const yEnd = 40 + j * (140 / (level.stages[1].choices.length - 1 || 1));
                      const isSel = selectedChoices[1] === j;
                      return (
                        <g key={j}>
                          <path
                            d={`M 315 ${50 + (selectedChoices[0] || 0) * (120 / (level.stages[0].choices.length - 1 || 1))} C 420 100, 520 ${yEnd}, 660 110`}
                            fill="none"
                            stroke={isSel || runnerPosition >= 2 ? "#10b981" : "#475569"}
                            strokeWidth={isSel ? "3" : "1.5"}
                          />
                        </g>
                      );
                    })}
                </>
              )}

              {level.structureType === "addition" && (
                <>
                  {/* Parallel corridors from A to C */}
                  {level.stages.map((alt, k) => {
                    const yCorridor = 40 + k * 70;
                    return (
                      <g key={k}>
                        <path
                          d={`M 84 110 C 160 110, 200 ${yCorridor}, 380 ${yCorridor} C 560 ${yCorridor}, 600 110, 660 110`}
                          fill="none"
                          stroke="#818cf8"
                          strokeWidth="3"
                        />
                        <rect
                          x="320"
                          y={yCorridor - 14}
                          width="120"
                          height="28"
                          rx="6"
                          fill="#1e1b4b"
                          stroke="#6366f1"
                          strokeWidth="1.5"
                        />
                        <text x="380" y={yCorridor + 4} textAnchor="middle" fill="#c7d2fe" fontSize="11" fontWeight="bold">
                          {alt.name} ({alt.count})
                        </text>
                      </g>
                    );
                  })}
                </>
              )}

              {level.structureType === "hybrid" && (
                <>
                  {/* Top corridor */}
                  <path d="M 84 110 C 160 110, 200 50, 380 50 C 560 50, 600 110, 660 110" fill="none" stroke="#6366f1" strokeWidth="3" />
                  <rect x="290" y="32" width="180" height="36" rx="8" fill="#1e1b4b" stroke="#818cf8" strokeWidth="1.5" />
                  <text x="380" y="48" textAnchor="middle" fill="#c7d2fe" fontSize="11" fontWeight="bold">
                    {level.corridors?.[0]?.name}
                  </text>
                  <text x="380" y="62" textAnchor="middle" fill="#a5b4fc" fontSize="9">
                    {level.corridors?.[0]?.stages.map((s) => s.count).join(" × ")} = {level.corridors?.[0]?.total} paths
                  </text>

                  {/* Bottom corridor */}
                  <path d="M 84 110 C 160 110, 200 170, 380 170 C 560 170, 600 110, 660 110" fill="none" stroke="#10b981" strokeWidth="3" />
                  <rect x="290" y="152" width="180" height="36" rx="8" fill="#064e3b" stroke="#34d399" strokeWidth="1.5" />
                  <text x="380" y="168" textAnchor="middle" fill="#a7f3d0" fontSize="11" fontWeight="bold">
                    {level.corridors?.[1]?.name}
                  </text>
                  <text x="380" y="182" textAnchor="middle" fill="#6ee7b7" fontSize="9">
                    {level.corridors?.[1]?.stages.map((s) => s.count).join(" × ")} = {level.corridors?.[1]?.total} paths
                  </text>
                </>
              )}

              {/* Destination Node */}
              <g transform="translate(680, 110)">
                <circle r="24" fill="#059669" stroke="#34d399" strokeWidth="3" />
                <text textAnchor="middle" dy="5" fill="#fff" fontSize="12" fontWeight="bold">GOAL (C)</text>
              </g>

              {/* Moving Character / Runner Avatar */}
              {isSimulatingWalk && (
                <g
                  transform={`translate(${
                    runnerPosition === 0 ? 84 : runnerPosition === 1 ? 300 : 660
                  }, ${runnerPosition === 1 ? 50 : 110})`}
                  className="transition-all duration-300"
                >
                  <circle r="12" fill="#fbbf24" stroke="#d97706" strokeWidth="2" />
                  <circle cx="-3" cy="-3" r="2" fill="#000" />
                  <circle cx="3" cy="-3" r="2" fill="#000" />
                  <path d="M -4 3 Q 0 7 4 3" fill="none" stroke="#000" strokeWidth="1.5" />
                </g>
              )}
            </svg>
          </div>
        </div>

        {/* 7. Interactive Challenge: Student Calculation & Input */}
        <div className="p-4 rounded-xl border border-indigo-200 dark:border-indigo-900/60 bg-indigo-50/40 dark:bg-indigo-950/20 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-700 dark:text-indigo-300 block">
                7. Interactive Mathematical Challenge
              </span>
              <span className="text-sm font-semibold text-slate-900 dark:text-white">
                How many total routes exist from Start to Goal?
              </span>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="number"
                placeholder="Enter total routes..."
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
                Submit Answer
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
                  {isCorrect ? "Correct! Route Calculation Verified." : "Incorrect Count. Try Again!"}
                </div>
                <div>{level.solutionExplanation}</div>
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
                <span>Next Level ({levelIndex + 2 <= MAZE_LEVELS.length ? levelIndex + 2 : 1})</span>
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
