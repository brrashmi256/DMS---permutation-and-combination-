import React, { useState } from "react";
import { GameTheoryContent, WorkedExampleItem } from "../../data/newGamesData";
import { BookOpen, ChevronDown, ChevronUp, CheckCircle2, HelpCircle, Layers } from "lucide-react";

interface GameAcademicPanelProps {
  data: GameTheoryContent;
}

export const GameAcademicPanel: React.FC<GameAcademicPanelProps> = ({ data }) => {
  const [activeTab, setActiveTab] = useState<"foundations" | "examples">("foundations");
  const [expandedExampleId, setExpandedExampleId] = useState<string>(data.workedExamples[0]?.id || "");

  return (
    <div className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-sm overflow-hidden mb-6">
      {/* Panel Navigation Tabs */}
      <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-700 bg-slate-50/70 dark:bg-slate-900/60 px-4 py-2.5">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab("foundations")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
              activeTab === "foundations"
                ? "bg-indigo-600 text-white shadow-sm"
                : "text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800"
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>1–4. Definition, Explanation & Formulas</span>
          </button>
          <button
            onClick={() => setActiveTab("examples")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
              activeTab === "examples"
                ? "bg-indigo-600 text-white shadow-sm"
                : "text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800"
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>5. Five Worked Examples (5 Solved)</span>
          </button>
        </div>

        <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400 hidden sm:inline">
          Academic Foundations &amp; Rigorous Proofs
        </span>
      </div>

      <div className="p-5 sm:p-6 space-y-6">
        {activeTab === "foundations" ? (
          <>
            {/* 1. Definition */}
            <div className="space-y-2">
              <div className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 flex items-center gap-1.5">
                <span>1. Formal Mathematical Definition</span>
              </div>
              <div className="p-4 rounded-xl bg-indigo-50/60 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-900/60 text-sm font-medium text-slate-900 dark:text-slate-100 leading-relaxed">
                {data.definition}
              </div>
            </div>

            {/* 2. Detailed Explanation */}
            <div className="space-y-2.5">
              <div className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                <span>2. Detailed Conceptual Explanation &amp; When to Use</span>
              </div>
              <div className="space-y-3 text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                {data.explanationParagraphs.map((para, idx) => (
                  <p key={idx}>{para}</p>
                ))}
              </div>
            </div>

            {/* 3. Formula Box (Immediately Below Explanation) */}
            <div className="space-y-2.5">
              <div className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                <span>3. Prominent Formula Reference Box</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                {data.formulaBoxes.map((fb, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl border-2 border-indigo-400/80 dark:border-indigo-600 bg-indigo-50/40 dark:bg-indigo-950/20 space-y-2 shadow-sm"
                  >
                    <div className="text-xs font-bold text-slate-800 dark:text-slate-200">
                      {fb.title}
                    </div>
                    <div className="p-2.5 rounded-lg bg-white dark:bg-slate-900 font-mono font-bold text-base text-indigo-700 dark:text-indigo-300 border border-indigo-100 dark:border-indigo-900/40 text-center tracking-wide">
                      {fb.formula}
                    </div>
                    <div className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                      {fb.note}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 4. Symbols Explanation */}
            <div className="space-y-2.5">
              <div className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                <span>4. Mathematical Symbols &amp; Meaning</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
                {data.symbols.map((sym, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/50 flex items-start gap-2.5 text-xs"
                  >
                    <span className="font-mono font-bold px-2 py-0.5 rounded bg-indigo-100 dark:bg-indigo-900/60 text-indigo-800 dark:text-indigo-200 shrink-0">
                      {sym.symbol}
                    </span>
                    <span className="text-slate-700 dark:text-slate-300 leading-relaxed">
                      {sym.meaning}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </>
        ) : (
          /* 5. Worked Examples (5 Solved) */
          <div className="space-y-3.5">
            <div className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              <span>5. Five Textbook Worked Examples with Step-by-Step Derivation</span>
            </div>
            <div className="space-y-3">
              {data.workedExamples.map((ex: WorkedExampleItem) => {
                const isExpanded = expandedExampleId === ex.id;
                return (
                  <div
                    key={ex.id}
                    className="rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/50 overflow-hidden transition-all"
                  >
                    <button
                      onClick={() => setExpandedExampleId(isExpanded ? "" : ex.id)}
                      className="w-full p-3.5 text-left flex items-center justify-between gap-3 hover:bg-slate-100/70 dark:hover:bg-slate-800/60 transition-colors"
                    >
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                        <span className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">
                          {ex.title}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        <span className="text-xs font-mono font-bold text-indigo-600 dark:text-indigo-400">
                          {ex.finalAnswer}
                        </span>
                        {isExpanded ? (
                          <ChevronUp className="w-4 h-4 text-slate-400" />
                        ) : (
                          <ChevronDown className="w-4 h-4 text-slate-400" />
                        )}
                      </div>
                    </button>

                    {isExpanded && (
                      <div className="p-4 pt-1 border-t border-slate-200 dark:border-slate-700/60 space-y-3 text-xs leading-relaxed">
                        <div className="p-3 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200">
                          <span className="font-bold text-slate-900 dark:text-white">Problem: </span>
                          {ex.question}
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 font-mono">
                          <div className="p-2.5 rounded-lg bg-indigo-50/60 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-900/60 text-indigo-900 dark:text-indigo-200">
                            <span className="font-sans font-bold text-[11px] block text-indigo-700 dark:text-indigo-300">
                              Applied Formula:
                            </span>
                            {ex.formula}
                          </div>
                          <div className="p-2.5 rounded-lg bg-emerald-50/60 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900/60 text-emerald-900 dark:text-emerald-200">
                            <span className="font-sans font-bold text-[11px] block text-emerald-700 dark:text-emerald-300">
                              Substituted Values:
                            </span>
                            {ex.substitution}
                          </div>
                        </div>

                        <div className="space-y-1 p-3 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                          <span className="font-bold text-slate-900 dark:text-white block mb-1">
                            Step-by-Step Calculation:
                          </span>
                          {ex.calculation.map((step, sIdx) => (
                            <div key={sIdx} className="flex items-start gap-1.5 text-slate-700 dark:text-slate-300">
                              <span className="text-indigo-500 font-bold">•</span>
                              <span>{step}</span>
                            </div>
                          ))}
                        </div>

                        <div className="p-2.5 rounded-lg bg-slate-100 dark:bg-slate-800/80 text-slate-600 dark:text-slate-300 italic">
                          <span className="font-bold font-sans not-italic text-slate-800 dark:text-slate-200">
                            Mathematical Insight:{" "}
                          </span>
                          {ex.explanation}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
