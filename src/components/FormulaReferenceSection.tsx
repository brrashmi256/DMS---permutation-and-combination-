import React, { useState } from "react";
import { FORMULA_TABLE, DECISION_GUIDE, FormulaItem } from "../data/formulaReferenceData";
import { Table, GitBranch, AlertCircle, Copy, Check, CheckCircle2 } from "lucide-react";

export const FormulaReferenceSection: React.FC = () => {
  const [copiedFormula, setCopiedFormula] = useState<string | null>(null);

  const handleCopy = (formula: string, key: string) => {
    navigator.clipboard.writeText(formula);
    setCopiedFormula(key);
    setTimeout(() => setCopiedFormula(null), 2000);
  };

  return (
    <div className="space-y-10 py-6">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-xs font-semibold text-indigo-600 dark:text-indigo-400">
          <span>Formula Reference &amp; Decision Guide</span>
          <span aria-hidden="true">·</span>
          <span>Exam Quick-Reference</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mt-1">
          Formula Reference &amp; Comparison Guide
        </h1>
        <p className="text-sm text-slate-600 dark:text-slate-300 mt-1 max-w-3xl">
          Quick-lookup formula table with rigorous mathematical assumptions and an interactive decision guide
          to correctly classify any word problem on discrete mathematics exams.
        </p>
      </div>

      {/* 1. Comprehensive Formula Comparison Table */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Table className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
          Comprehensive Combinatorial Formula Reference Table
        </h2>

        <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-sm">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-slate-50 dark:bg-slate-900/80 border-b border-slate-200 dark:border-slate-700 text-slate-500 uppercase tracking-wider text-[11px]">
              <tr>
                <th className="p-3.5 font-bold">Concept</th>
                <th className="p-3.5 font-bold font-mono">Formula</th>
                <th className="p-3.5 font-bold">When to Use</th>
                <th className="p-3.5 font-bold">Assumptions &amp; Restrictions</th>
                <th className="p-3.5 font-bold">Key Example</th>
                <th className="p-3.5 text-center font-bold">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-700/60 text-slate-700 dark:text-slate-200">
              {FORMULA_TABLE.map((item, idx) => (
                <tr key={idx} className="hover:bg-slate-50/70 dark:hover:bg-slate-700/30 transition-colors">
                  <td className="p-3.5 font-bold text-slate-900 dark:text-white whitespace-nowrap">
                    {item.concept}
                  </td>
                  <td className="p-3.5 font-mono font-bold text-indigo-600 dark:text-indigo-400 whitespace-nowrap">
                    {item.formula}
                  </td>
                  <td className="p-3.5 text-xs leading-relaxed max-w-xs">{item.whenToUse}</td>
                  <td className="p-3.5 text-xs text-slate-500 dark:text-slate-400 leading-relaxed max-w-xs">
                    {item.assumptions}
                  </td>
                  <td className="p-3.5 text-xs font-serif italic max-w-xs">{item.keyExample}</td>
                  <td className="p-3.5 text-center whitespace-nowrap">
                    <button
                      onClick={() => handleCopy(item.formula, item.concept)}
                      className="p-1.5 rounded-md hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-500"
                      title="Copy formula text"
                    >
                      {copiedFormula === item.concept ? (
                        <Check className="w-4 h-4 text-emerald-500" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 2. Interactive Word Problem Decision Guide */}
      <div className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 space-y-6 shadow-sm">
        <div className="space-y-1">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <GitBranch className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
            Decision Guide: How to Choose the Correct Formula from Word Problems
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Follow this 4-step diagnostic flowchart whenever approaching a new discrete math problem.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {DECISION_GUIDE.map((step) => (
            <div
              key={step.step}
              className="p-5 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-700 space-y-2"
            >
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-md bg-indigo-600 text-white font-bold text-xs flex items-center justify-center">
                  {step.step}
                </span>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                  {step.title}
                </h3>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed pl-8">
                {step.details}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* 3. Permutations vs Combinations Comparison Matrix */}
      <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-700 space-y-4">
        <h3 className="text-base font-bold text-slate-900 dark:text-white">
          Permutations vs. Combinations: The Crucial Distinctions
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="p-4 rounded-xl bg-indigo-50/60 dark:bg-indigo-950/20 border border-indigo-200 dark:border-indigo-900/40 space-y-2">
            <div className="font-bold text-indigo-900 dark:text-indigo-300 text-sm">
              Permutations (Order Matters)
            </div>
            <ul className="space-y-1.5 text-slate-700 dark:text-slate-300 list-disc list-inside">
              <li>Sequence, ranking, priority, position, or roles are assigned.</li>
              <li>AB is completely different from BA.</li>
              <li>Keywords: "Arranged in a row", "passcode", "schedule", "President/VP", "podium finish".</li>
              <li>Always greater than or equal to combinations: nPr = r! × nCr.</li>
            </ul>
          </div>

          <div className="p-4 rounded-xl bg-emerald-50/60 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-900/40 space-y-2">
            <div className="font-bold text-emerald-900 dark:text-emerald-300 text-sm">
              Combinations (Order Does NOT Matter)
            </div>
            <ul className="space-y-1.5 text-slate-700 dark:text-slate-300 list-disc list-inside">
              <li>Only group membership or co-presence matters.</li>
              <li>AB is the exact same committee as BA.</li>
              <li>Keywords: "Committee", "team", "delegation", "hand of cards", "toppings", "subset".</li>
              <li>Quotients out the internal permutations: divides by r!.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
