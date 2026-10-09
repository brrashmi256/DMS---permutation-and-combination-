import React, { useState } from "react";
import { THEORY_TOPICS, TheoryTopic, WorkedExample } from "../data/theoryData";
import { BookOpen, CheckCircle, AlertTriangle, ArrowRight, ChevronDown, ChevronUp, Copy, Check } from "lucide-react";

interface TheorySectionProps {
  initialTopicId?: string;
}

export const TheorySection: React.FC<TheorySectionProps> = ({ initialTopicId }) => {
  const [activeTopicId, setActiveTopicId] = useState<string>(initialTopicId || THEORY_TOPICS[0].id);
  const [expandedExamples, setExpandedExamples] = useState<Record<string, boolean>>({});
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const activeTopic = THEORY_TOPICS.find((t) => t.id === activeTopicId) || THEORY_TOPICS[0];

  const toggleExample = (id: string) => {
    setExpandedExamples((prev) => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const expandAllExamples = () => {
    const next: Record<string, boolean> = {};
    activeTopic.workedExamples.forEach((ex) => {
      next[ex.id] = true;
    });
    setExpandedExamples(next);
  };

  const collapseAllExamples = () => {
    setExpandedExamples({});
  };

  const handleCopyFormula = (formula: string, id: string) => {
    navigator.clipboard.writeText(formula);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="space-y-8 py-6">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-xs font-semibold text-indigo-600 dark:text-indigo-400">
          <span>Curriculum Theory &amp; Formulations</span>
          <span aria-hidden="true">·</span>
          <span>7 Comprehensive Modules</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mt-1">
          Detailed Academic Theory &amp; 49 Worked Examples
        </h1>
        <p className="text-sm text-slate-600 dark:text-slate-300 mt-1 max-w-3xl">
          Deep formal definitions, multi-paragraph conceptual expositions, step-by-step mathematical derivations,
          and seven rigorous textbook-style worked examples for every single concept.
        </p>
      </div>

      {/* Topic Selection Tabs */}
      <div className="flex overflow-x-auto gap-2 pb-2 border-b border-slate-200 dark:border-slate-800 no-scrollbar">
        {THEORY_TOPICS.map((topic, idx) => (
          <button
            key={topic.id}
            onClick={() => setActiveTopicId(topic.id)}
            className={`px-3.5 py-2 rounded-lg text-xs font-semibold transition-all whitespace-nowrap flex items-center gap-2 ${
              activeTopicId === topic.id
                ? "bg-indigo-600 text-white shadow-sm"
                : "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
            }`}
          >
            <span>0{idx + 1}.</span>
            <span>{topic.title.split(" ")[0]}</span>
            <span className="font-mono text-[10px] opacity-80">({topic.shortCode})</span>
          </button>
        ))}
      </div>

      {/* Main Topic Card */}
      <div className="bg-white dark:bg-slate-800/90 rounded-2xl border border-slate-200 dark:border-slate-700/70 p-6 sm:p-8 space-y-8 shadow-sm">
        {/* Title & Formula Banner */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-200 dark:border-slate-700">
          <div>
            <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400">
              Module {THEORY_TOPICS.findIndex((t) => t.id === activeTopic.id) + 1} of 7
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mt-0.5">
              {activeTopic.title}
            </h2>
          </div>

          <div className="flex items-center gap-2 p-3 bg-slate-50 dark:bg-slate-900/80 rounded-xl border border-slate-200 dark:border-slate-800 self-start md:self-auto">
            <div className="text-right">
              <div className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">Governing Formula</div>
              <div className="text-base sm:text-lg font-mono font-bold text-indigo-600 dark:text-indigo-400">
                {activeTopic.formulaDisplay}
              </div>
            </div>
            <button
              onClick={() => handleCopyFormula(activeTopic.formulaDisplay, "top_formula")}
              className="p-1.5 rounded-md hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-500"
              title="Copy Formula"
            >
              {copiedId === "top_formula" ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* 1. Formal Definition */}
        <div className="space-y-2">
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-white flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-indigo-600 dark:bg-indigo-400" />
            1. Formal Academic Definition
          </h3>
          <div className="p-4 rounded-xl bg-indigo-50/60 dark:bg-indigo-950/30 border border-indigo-100 dark:border-indigo-900/50 text-slate-800 dark:text-slate-200 text-sm leading-relaxed font-serif">
            {activeTopic.formalDefinition}
          </div>
        </div>

        {/* 2. Beginner-Friendly Exposition (3-5 Substantial Paragraphs) */}
        <div className="space-y-3">
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-white flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-indigo-600 dark:bg-indigo-400" />
            2. Detailed Conceptual Exposition
          </h3>
          <div className="space-y-3 text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
            {activeTopic.explanationParagraphs.map((para, i) => (
              <p key={i} className="text-justify">
                {para}
              </p>
            ))}
          </div>
        </div>

        {/* 3. Symbols & Derivations Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pt-2">
          {/* Symbol Glossary */}
          <div className="p-5 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white">
              Formula Symbol Dictionary
            </h4>
            <div className="space-y-2">
              {activeTopic.symbolExplanations.map((sym, i) => (
                <div key={i} className="flex items-start gap-2 text-xs">
                  <span className="font-mono font-bold text-indigo-600 dark:text-indigo-400 shrink-0 bg-white dark:bg-slate-800 px-1.5 py-0.5 rounded border border-slate-200 dark:border-slate-700">
                    {sym.symbol}
                  </span>
                  <span className="text-slate-700 dark:text-slate-300 leading-tight pt-0.5">
                    {sym.meaning}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Mathematical Derivation */}
          <div className="p-5 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white">
              {activeTopic.derivation.heading}
            </h4>
            <div className="space-y-1.5 text-xs text-slate-700 dark:text-slate-300">
              {activeTopic.derivation.steps.map((step, i) => (
                <div key={i} className="leading-relaxed">
                  {step}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Why Useful & When to Apply */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-5 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
              Why This Concept is Useful
            </h4>
            <ul className="space-y-1.5 text-xs text-slate-700 dark:text-slate-300 list-disc list-inside">
              {activeTopic.whyUseful.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>

          <div className="p-5 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-indigo-700 dark:text-indigo-400">
              When to Apply in Word Problems
            </h4>
            <ul className="space-y-1.5 text-xs text-slate-700 dark:text-slate-300 list-disc list-inside">
              {activeTopic.whenToApply.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* Assumptions & Restrictions */}
        <div className="p-4 rounded-xl bg-amber-50/70 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/50 space-y-1.5 text-xs text-amber-900 dark:text-amber-200">
          <div className="font-bold flex items-center gap-1.5">
            <AlertTriangle className="w-3.5 h-3.5" />
            Assumptions &amp; Restrictions:
          </div>
          <ul className="space-y-1 list-disc list-inside pl-1 text-slate-700 dark:text-slate-300">
            {activeTopic.assumptionsAndRestrictions.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </div>

        {/* ======================================================== */}
        {/* 7 FULLY WORKED EXAMPLES (All 10 Steps Per Example)        */}
        {/* ======================================================== */}
        <div className="space-y-4 pt-6 border-t border-slate-200 dark:border-slate-700">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                7 Textbook Worked Examples (Full 10-Step Solutions)
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Every example demonstrates: Problem, Given, Concept, Formula, Reasoning, Substitution, Calculation, Final Answer, Interpretation, Verification.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={expandAllExamples}
                className="px-2.5 py-1 text-xs font-medium rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200"
              >
                Expand All
              </button>
              <button
                onClick={collapseAllExamples}
                className="px-2.5 py-1 text-xs font-medium rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200"
              >
                Collapse All
              </button>
            </div>
          </div>

          <div className="space-y-4">
            {activeTopic.workedExamples.map((ex, idx) => {
              const isExpanded = expandedExamples[ex.id] ?? (idx === 0);
              return (
                <div
                  key={ex.id}
                  className="rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden bg-white dark:bg-slate-900/50 shadow-sm"
                >
                  <button
                    onClick={() => toggleExample(ex.id)}
                    className="w-full px-5 py-3.5 bg-slate-50 dark:bg-slate-800/80 hover:bg-slate-100 dark:hover:bg-slate-800 text-left flex items-center justify-between gap-4 transition-colors"
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="w-6 h-6 rounded-md bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 text-xs font-bold flex items-center justify-center shrink-0">
                        {idx + 1}
                      </span>
                      <span className="text-sm font-bold text-slate-900 dark:text-white">
                        {ex.title}
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-mono font-semibold text-emerald-600 dark:text-emerald-400 hidden sm:inline">
                        Answer: {ex.finalAnswer}
                      </span>
                      {isExpanded ? (
                        <ChevronUp className="w-4 h-4 text-slate-400" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-slate-400" />
                      )}
                    </div>
                  </button>

                  {isExpanded && (
                    <div className="p-5 sm:p-6 space-y-4 text-xs sm:text-sm text-slate-700 dark:text-slate-300 border-t border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900">
                      {/* Step 1: Problem */}
                      <div className="p-3.5 rounded-lg bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700">
                        <span className="font-bold text-slate-900 dark:text-white block mb-1">
                          1. Problem Statement:
                        </span>
                        <p className="font-serif italic text-slate-800 dark:text-slate-200">
                          {ex.problem}
                        </p>
                      </div>

                      {/* Step 2 & 3: Given & Concept */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700">
                          <span className="font-bold text-slate-900 dark:text-white block mb-0.5">
                            2. Given Information:
                          </span>
                          <p>{ex.given}</p>
                        </div>
                        <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700">
                          <span className="font-bold text-slate-900 dark:text-white block mb-0.5">
                            3. Concept Identification:
                          </span>
                          <p>{ex.concept}</p>
                        </div>
                      </div>

                      {/* Step 4 & 5: Formula & Reasoning */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700">
                          <span className="font-bold text-slate-900 dark:text-white block mb-0.5">
                            4. Formula Applied:
                          </span>
                          <p className="font-mono font-semibold text-indigo-600 dark:text-indigo-400">{ex.formula}</p>
                        </div>
                        <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700">
                          <span className="font-bold text-slate-900 dark:text-white block mb-0.5">
                            5. Method Reasoning:
                          </span>
                          <p>{ex.reasoning}</p>
                        </div>
                      </div>

                      {/* Step 6: Substitution */}
                      <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700">
                        <span className="font-bold text-slate-900 dark:text-white block mb-0.5">
                          6. Variable Substitution:
                        </span>
                        <p className="font-mono text-slate-800 dark:text-slate-200">{ex.substitution}</p>
                      </div>

                      {/* Step 7: Calculation Breakdown */}
                      <div className="p-3.5 rounded-lg bg-indigo-50/40 dark:bg-indigo-950/20 border border-indigo-100 dark:border-indigo-900/50 space-y-1">
                        <span className="font-bold text-indigo-900 dark:text-indigo-300 block mb-1">
                          7. Step-by-Step Calculation:
                        </span>
                        {ex.calculation.map((step, sIdx) => (
                          <div key={sIdx} className="font-mono text-xs text-slate-800 dark:text-slate-200 pl-2">
                            • {step}
                          </div>
                        ))}
                      </div>

                      {/* Step 8: Final Answer Highlight */}
                      <div className="p-3.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 text-emerald-900 dark:text-emerald-200 flex items-center justify-between">
                        <div>
                          <span className="text-xs uppercase tracking-wider font-bold block">8. Final Answer:</span>
                          <span className="text-base font-bold font-mono text-emerald-700 dark:text-emerald-400">
                            {ex.finalAnswer}
                          </span>
                        </div>
                        <CheckCircle className="w-5 h-5 text-emerald-500" />
                      </div>

                      {/* Step 9 & 10: Interpretation & Verification */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                        <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700">
                          <span className="font-bold text-slate-900 dark:text-white block mb-0.5">
                            9. Real-World Interpretation:
                          </span>
                          <p>{ex.interpretation}</p>
                        </div>
                        <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700">
                          <span className="font-bold text-slate-900 dark:text-white block mb-0.5">
                            10. Method Verification:
                          </span>
                          <p>{ex.verification}</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Real Life Applications & Common Mistakes */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-slate-200 dark:border-slate-700">
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white">
              Real-World Engineering Applications
            </h4>
            <ul className="space-y-2 text-xs text-slate-700 dark:text-slate-300">
              {activeTopic.realLifeApplications.map((app, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-indigo-500 mt-0.5">▸</span>
                  <span>{app}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-rose-600 dark:text-rose-400">
              Common Student Pitfalls &amp; Corrections
            </h4>
            <div className="space-y-2.5">
              {activeTopic.commonMistakes.map((cm, i) => (
                <div key={i} className="p-3 rounded-lg bg-rose-50/50 dark:bg-rose-950/20 border border-rose-200/60 dark:border-rose-900/40 text-xs space-y-1">
                  <div className="text-rose-700 dark:text-rose-300 font-semibold">
                    ❌ Mistake: {cm.mistake}
                  </div>
                  <div className="text-emerald-700 dark:text-emerald-400 font-semibold">
                    ✓ Correction: {cm.correction}
                  </div>
                  <div className="text-slate-500 dark:text-slate-400">
                    Why: {cm.why}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Module Summary */}
        <div className="p-4 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
          <span className="font-bold text-slate-900 dark:text-white">Module Summary: </span>
          {activeTopic.summary}
        </div>
      </div>
    </div>
  );
};
