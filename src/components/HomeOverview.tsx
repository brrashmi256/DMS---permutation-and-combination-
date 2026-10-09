import React from "react";
import { BookOpen, CheckSquare, Calculator, Gamepad2, FileText, ArrowRight, BarChart3, CheckCircle2 } from "lucide-react";
import { THEORY_TOPICS } from "../data/theoryData";

interface HomeOverviewProps {
  onNavigate: (tab: string, topicId?: string) => void;
  worksheetScore: number;
  totalWorksheet: number;
}

export const HomeOverview: React.FC<HomeOverviewProps> = ({
  onNavigate,
  worksheetScore,
  totalWorksheet
}) => {
  return (
    <div className="space-y-12 py-6">
      {/* Hero Section */}
      <div className="relative rounded-2xl bg-gradient-to-br from-indigo-900 via-slate-900 to-slate-950 text-white p-8 sm:p-12 overflow-hidden shadow-xl border border-indigo-800/40">
        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="flex items-center gap-2 text-xs font-semibold text-indigo-300">
            <span>2nd-Year B.E. Computer Science & Engineering</span>
            <span aria-hidden="true">·</span>
            <span>Course: Discrete Mathematical Structures (DMS)</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white text-balance leading-tight">
            Permutations &amp; Combinations
          </h1>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl">
            A comprehensive, textbook-grade interactive learning portal and simulation suite.
            Engineered with deep mathematical rigor, 49 step-by-step worked examples, a 70-problem
            worksheet with progressive hints, formula calculators, and 12 animated educational games.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-3">
            <button
              onClick={() => onNavigate("theory")}
              className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 font-semibold text-white text-sm shadow-md transition-colors"
            >
              <BookOpen className="w-4 h-4" />
              Explore Theory & 49 Solved Examples
            </button>
            <button
              onClick={() => onNavigate("worksheet")}
              className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 font-semibold text-white text-sm shadow-md transition-colors"
            >
              <CheckSquare className="w-4 h-4" />
              Solve 70-Problem Worksheet
            </button>
            <button
              onClick={() => onNavigate("dashboard")}
              className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-100 font-medium text-sm border border-slate-700 transition-colors"
            >
              <BarChart3 className="w-4 h-4 text-amber-400" />
              Performance Dashboard
            </button>
            <button
              onClick={() => onNavigate("games")}
              className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-100 font-medium text-sm border border-slate-700 transition-colors"
            >
              <Gamepad2 className="w-4 h-4 text-indigo-400" />
              12 Animated Games
            </button>
          </div>
        </div>

        {/* Decorative math watermark in background */}
        <div className="absolute right-4 bottom-2 text-indigo-500/10 font-mono text-9xl font-black select-none pointer-events-none hidden lg:block">
          nPr · nCr
        </div>
      </div>

      {/* 4 Quantitative Metrics Strip */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700/60 shadow-sm">
          <div className="text-xs font-semibold text-slate-500 dark:text-slate-400">Core DMS Topics</div>
          <div className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mt-1">7 Concepts</div>
          <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">Definitions, proofs & derivations</div>
        </div>

        <div className="p-5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700/60 shadow-sm">
          <div className="text-xs font-semibold text-slate-500 dark:text-slate-400">Textbook Solved Examples</div>
          <div className="text-2xl sm:text-3xl font-bold text-indigo-600 dark:text-indigo-400 mt-1">49 Solved</div>
          <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">7 fully worked per concept</div>
        </div>

        <div className="p-5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700/60 shadow-sm">
          <div className="text-xs font-semibold text-slate-500 dark:text-slate-400">Interactive Worksheet</div>
          <div className="text-2xl sm:text-3xl font-bold text-emerald-600 dark:text-emerald-400 mt-1">
            {totalWorksheet} Problems
          </div>
          <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            {worksheetScore} completed with hints
          </div>
        </div>

        <div className="p-5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700/60 shadow-sm">
          <div className="text-xs font-semibold text-slate-500 dark:text-slate-400">Interactive Simulations</div>
          <div className="text-2xl sm:text-3xl font-bold text-amber-600 dark:text-amber-400 mt-1">12 Games</div>
          <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">Full SVG animation &amp; sandboxes</div>
        </div>
      </div>

      {/* Core Syllabus Roadmap: The 7 Concepts */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
              Syllabus Curriculum Modules
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Each topic contains rigorous academic explanations and 7 detailed worked problems with full verification steps.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {THEORY_TOPICS.map((topic, idx) => (
            <div
              key={topic.id}
              className="p-5 rounded-xl bg-white dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700/60 hover:border-indigo-400 dark:hover:border-indigo-500 transition-all flex flex-col justify-between group shadow-sm"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400">
                    Topic 0{idx + 1}
                  </span>
                  <span className="text-xs font-mono font-semibold px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200">
                    {topic.shortCode}
                  </span>
                </div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                  {topic.title}
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-3 leading-relaxed">
                  {topic.formalDefinition}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100 dark:border-slate-700/50 mt-4 flex items-center justify-between">
                <span className="text-xs text-slate-500 dark:text-slate-400">
                  7 Solved Examples
                </span>
                <button
                  onClick={() => onNavigate("theory", topic.id)}
                  className="flex items-center gap-1 text-xs font-semibold text-indigo-600 dark:text-indigo-400 group-hover:translate-x-0.5 transition-transform"
                >
                  Learn Module <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Feature Navigation Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
        <div
          onClick={() => onNavigate("worksheet")}
          className="p-6 rounded-2xl bg-gradient-to-b from-emerald-50 to-white dark:from-slate-800 dark:to-slate-800/80 border border-emerald-200 dark:border-slate-700 cursor-pointer hover:shadow-md transition-all space-y-3"
        >
          <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold">
            <CheckSquare className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">
            70-Problem Worksheet
          </h3>
          <p className="text-sm text-slate-600 dark:text-slate-300">
            Practice 10 curated questions per topic across Easy, Medium, and Challenging levels.
            Features progressive hints and step-by-step verified solutions.
          </p>
          <div className="text-xs font-semibold text-emerald-700 dark:text-emerald-400 flex items-center gap-1 pt-1">
            Start Solving Worksheet <ArrowRight className="w-3.5 h-3.5" />
          </div>
        </div>

        <div
          onClick={() => onNavigate("calculator")}
          className="p-6 rounded-2xl bg-gradient-to-b from-indigo-50 to-white dark:from-slate-800 dark:to-slate-800/80 border border-indigo-200 dark:border-slate-700 cursor-pointer hover:shadow-md transition-all space-y-3"
        >
          <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center font-bold">
            <Calculator className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">
            Interactive Formula Calculator
          </h3>
          <p className="text-sm text-slate-600 dark:text-slate-300">
            Compute n!, nPr, nCr, n^r, Stars &amp; Bars, Circular, and Identical Objects.
            Displays full step-by-step arithmetic expansion and protects large number ranges.
          </p>
          <div className="text-xs font-semibold text-indigo-700 dark:text-indigo-400 flex items-center gap-1 pt-1">
            Launch Calculator <ArrowRight className="w-3.5 h-3.5" />
          </div>
        </div>

        <div
          onClick={() => onNavigate("games")}
          className="p-6 rounded-2xl bg-gradient-to-b from-amber-50 to-white dark:from-slate-800 dark:to-slate-800/80 border border-amber-200 dark:border-slate-700 cursor-pointer hover:shadow-md transition-all space-y-3"
        >
          <div className="w-10 h-10 rounded-xl bg-amber-600 text-white flex items-center justify-center font-bold">
            <Gamepad2 className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">
            6 Animated Games &amp; Simulations
          </h3>
          <p className="text-sm text-slate-600 dark:text-slate-300">
            Detective challenge, drag-and-drop arrangement puzzle, combination basket, DMS escape room,
            counting race, and the virtual dance formation studio with moving SVG dancer limbs.
          </p>
          <div className="text-xs font-semibold text-amber-700 dark:text-amber-400 flex items-center gap-1 pt-1">
            Enter Game Zone <ArrowRight className="w-3.5 h-3.5" />
          </div>
        </div>
      </div>

      {/* Lab Record & Verification Notice */}
      <div className="p-6 rounded-xl bg-slate-100 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 text-xs text-slate-600 dark:text-slate-300 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="font-semibold text-slate-900 dark:text-white flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
            Verified Against Standard DMS Curricula (21CS36 / 18CS36)
          </div>
          <p>
            Reference values verified: 5! = 120 · 5P3 = 60 · 5C3 = 10 · 5³ = 125 · C(7,3) = 35 · (5-1)! = 24 · BANANA = 60.
          </p>
        </div>
        <button
          onClick={() => onNavigate("labnotes")}
          className="px-4 py-2 rounded-lg bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 font-semibold text-slate-800 dark:text-white hover:bg-slate-50 transition-colors whitespace-nowrap"
        >
          View Observation Book Notes
        </button>
      </div>
    </div>
  );
};
