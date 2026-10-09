import React from "react";
import { BarChart3, CheckSquare, Gamepad2, BookOpen, RotateCcw, Trophy, Award, CheckCircle2 } from "lucide-react";
import { THEORY_TOPICS } from "../data/theoryData";
import { WORKSHEET_QUESTIONS } from "../data/worksheetData";

interface ProgressDashboardProps {
  worksheetScore: number;
  totalAttempted: number;
  onResetAllProgress: () => void;
  onNavigate: (tab: string) => void;
}

export const ProgressDashboard: React.FC<ProgressDashboardProps> = ({
  worksheetScore,
  totalAttempted,
  onResetAllProgress,
  onNavigate
}) => {
  const accuracy = totalAttempted > 0 ? Math.round((worksheetScore / totalAttempted) * 100) : 0;
  const overallCompletion = Math.round((worksheetScore / WORKSHEET_QUESTIONS.length) * 100);

  return (
    <div className="space-y-8 py-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-indigo-600 dark:text-indigo-400">
            <span>Student Analytics</span>
            <span aria-hidden="true">·</span>
            <span>Real-Time Performance Dashboard</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mt-1">
            Progress &amp; Learning Results Dashboard
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-300 mt-1 max-w-2xl">
            Track your discrete mathematical performance across theory modules, worksheet evaluations, and simulation games.
          </p>
        </div>

        <button
          onClick={onResetAllProgress}
          className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-semibold text-xs transition-colors self-start sm:self-auto"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset All Progress</span>
        </button>
      </div>

      {/* 4 KPI Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 space-y-1 shadow-sm">
          <div className="text-xs font-semibold text-slate-500 dark:text-slate-400">
            Theory Topics Ready
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
            7 / 7
          </div>
          <div className="text-xs text-indigo-600 dark:text-indigo-400 font-medium">
            49 Worked Examples
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 space-y-1 shadow-sm">
          <div className="text-xs font-semibold text-slate-500 dark:text-slate-400">
            Worksheet Correct
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-emerald-600 dark:text-emerald-400">
            {worksheetScore} / {WORKSHEET_QUESTIONS.length}
          </div>
          <div className="text-xs text-slate-500 dark:text-slate-400">
            {totalAttempted} Attempted
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 space-y-1 shadow-sm">
          <div className="text-xs font-semibold text-slate-500 dark:text-slate-400">
            Worksheet Accuracy
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-indigo-600 dark:text-indigo-400">
            {accuracy}%
          </div>
          <div className="text-xs text-slate-500 dark:text-slate-400">
            {totalAttempted > 0 ? "Based on first submissions" : "No submissions yet"}
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 space-y-1 shadow-sm">
          <div className="text-xs font-semibold text-slate-500 dark:text-slate-400">
            Overall Completion
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-amber-600 dark:text-amber-400">
            {overallCompletion}%
          </div>
          <div className="text-xs text-slate-500 dark:text-slate-400">
            Syllabus Completed
          </div>
        </div>
      </div>

      {/* Curriculum Topic Coverage Grid */}
      <div className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 space-y-6 shadow-sm">
        <h2 className="text-base font-bold text-slate-900 dark:text-white">
          Curriculum Topic Coverage &amp; Solved Proof Status
        </h2>

        <div className="space-y-4">
          {THEORY_TOPICS.map((topic, i) => (
            <div
              key={topic.id}
              className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-700 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
            >
              <div className="space-y-0.5">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-slate-900 dark:text-white text-sm">
                    0{i + 1}. {topic.title}
                  </span>
                  <span className="font-mono px-1.5 py-0.5 rounded bg-slate-200 dark:bg-slate-700 text-[10px]">
                    {topic.shortCode}
                  </span>
                </div>
                <div className="text-slate-500">
                  {topic.workedExamples.length} fully solved textbook examples · 10 worksheet practice problems
                </div>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <span className="flex items-center gap-1 font-semibold text-emerald-600 dark:text-emerald-400">
                  <CheckCircle2 className="w-4 h-4" /> Ready for Exam
                </span>
                <button
                  onClick={() => onNavigate("theory")}
                  className="px-3 py-1.5 rounded-lg bg-indigo-50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300 font-semibold hover:bg-indigo-100 transition-colors"
                >
                  Review
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 12 Games Status Cards */}
      <div className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 space-y-4 shadow-sm">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Gamepad2 className="w-4 h-4 text-amber-500" />
            Interactive Simulation Hub Status (12 Animated Games)
          </h2>
          <button
            onClick={() => onNavigate("games")}
            className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline"
          >
            Launch All 12 Games →
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
          {[
            { name: "Game 1: Detective", type: "15 Varied Cases", badge: "Active" },
            { name: "Game 2: Arrangement Puzzle", type: "5 Difficulty Levels", badge: "Active" },
            { name: "Game 3: Combination Basket", type: "5 Basket Challenges", badge: "Active" },
            { name: "Game 4: Escape Room", type: "5 Sealed Vault Doors", badge: "Active" },
            { name: "Game 5: Counting Race", type: "10 Track Hurdles", badge: "Active" },
            { name: "Game 6: Dance Formation Studio", type: "5 Levels & Moving Limbs", badge: "Active" },
            { name: "Game 7: Counting Maze", type: "Routes & Choices", badge: "New Lab" },
            { name: "Game 8: Arrangement Lab", type: "Block Method & Rules", badge: "New Lab" },
            { name: "Game 9: Train Carriage", type: "Locomotive Permutations", badge: "New Lab" },
            { name: "Game 10: Selection Sorter", type: "Combinations & Stars/Bars", badge: "New Lab" },
            { name: "Game 11: Tournament Planner", type: "Team (nCr) vs Role (nPr)", badge: "New Lab" },
            { name: "Game 12: Formula Battle", type: "7 Concepts Dual-Phase Arena", badge: "New Lab" }
          ].map((g, idx) => (
            <div key={idx} className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-700 flex items-center justify-between">
              <div>
                <div className="font-bold text-slate-900 dark:text-white truncate max-w-[150px]">{g.name}</div>
                <div className="text-slate-500 text-[11px] mt-0.5 truncate max-w-[150px]">{g.type}</div>
              </div>
              <span className={`font-mono text-[9px] font-semibold px-2 py-0.5 rounded shrink-0 ${
                g.badge === "New Lab"
                  ? "bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800"
                  : "bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300"
              }`}>
                {g.badge}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
