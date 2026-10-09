import React from "react";
import { LAB_RECORD_DATA } from "../data/labNotesData";
import { Printer, FileText, CheckCircle2 } from "lucide-react";

export const LabNotesSection: React.FC = () => {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-8 py-6">
      {/* Header and Print Action */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800 print:hidden">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-indigo-600 dark:text-indigo-400">
            <span>Observation Book &amp; Laboratory Record</span>
            <span aria-hidden="true">·</span>
            <span>Formatted for VTU / Autonomous DMS Lab Submissions</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mt-1">
            Observation-Book Notes &amp; Conclusion
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-300 mt-1 max-w-2xl">
            Complete academic lab record write-up with Aim, Objectives, Theory, Formulae, Experimental Observations,
            and Conclusion. Ready for submission or printing.
          </p>
        </div>

        <button
          onClick={handlePrint}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs shadow-sm transition-colors whitespace-nowrap self-start sm:self-auto"
        >
          <Printer className="w-4 h-4" />
          <span>Print / Save as PDF</span>
        </button>
      </div>

      {/* The Printable Academic Document */}
      <div className="p-8 sm:p-12 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700/80 shadow-md space-y-8 print:border-none print:shadow-none print:p-0 print:text-black">
        {/* Title Header */}
        <div className="text-center space-y-2 border-b-2 border-slate-900 dark:border-slate-200 pb-6 print:border-black">
          <div className="text-xs font-mono uppercase tracking-widest text-slate-500 dark:text-slate-400 print:text-black">
            DEPARTMENT OF COMPUTER SCIENCE &amp; ENGINEERING
          </div>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900 dark:text-white print:text-black">
            {LAB_RECORD_DATA.title}
          </h2>
          <div className="text-xs font-mono font-semibold text-indigo-600 dark:text-indigo-400 print:text-black">
            {LAB_RECORD_DATA.courseCode} — {LAB_RECORD_DATA.topic}
          </div>
        </div>

        {/* 1. Aim */}
        <div className="space-y-2">
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-white print:text-black border-b border-slate-200 dark:border-slate-800 pb-1">
            1. Aim of the Laboratory Activity
          </h3>
          <p className="text-sm text-slate-700 dark:text-slate-300 print:text-black leading-relaxed text-justify font-serif">
            {LAB_RECORD_DATA.aim}
          </p>
        </div>

        {/* 2. Learning Objectives */}
        <div className="space-y-2">
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-white print:text-black border-b border-slate-200 dark:border-slate-800 pb-1">
            2. Learning Objectives
          </h3>
          <ul className="space-y-1.5 text-xs sm:text-sm text-slate-700 dark:text-slate-300 print:text-black list-disc list-inside">
            {LAB_RECORD_DATA.learningObjectives.map((obj, i) => (
              <li key={i}>{obj}</li>
            ))}
          </ul>
        </div>

        {/* 3. Brief Theory Overview */}
        <div className="space-y-2">
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-white print:text-black border-b border-slate-200 dark:border-slate-800 pb-1">
            3. Summary of Combinatorial Theory
          </h3>
          <div className="space-y-2 text-xs sm:text-sm text-slate-700 dark:text-slate-300 print:text-black leading-relaxed">
            {LAB_RECORD_DATA.theoryOverview.map((item, i) => (
              <p key={i} className="text-justify font-serif">
                {item}
              </p>
            ))}
          </div>
        </div>

        {/* 4. Important Formulae */}
        <div className="space-y-2">
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-white print:text-black border-b border-slate-200 dark:border-slate-800 pb-1">
            4. Summary of Standard Combinatorial Formulae
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border border-slate-200 dark:border-slate-800 print:border-black">
              <thead className="bg-slate-50 dark:bg-slate-800 print:bg-slate-100 font-bold border-b border-slate-200 dark:border-slate-800 print:border-black">
                <tr>
                  <th className="p-2.5">Principle</th>
                  <th className="p-2.5 font-mono">Mathematical Formula</th>
                  <th className="p-2.5">Functional Purpose</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-800 print:divide-black">
                {LAB_RECORD_DATA.importantFormulae.map((f, i) => (
                  <tr key={i}>
                    <td className="p-2.5 font-semibold text-slate-900 dark:text-white print:text-black">
                      {f.name}
                    </td>
                    <td className="p-2.5 font-mono font-bold text-indigo-600 dark:text-indigo-400 print:text-black">
                      {f.formula}
                    </td>
                    <td className="p-2.5 text-slate-600 dark:text-slate-300 print:text-black">
                      {f.purpose}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* 5. Sample Experimental Observations from Interactive Activities */}
        <div className="space-y-3">
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-white print:text-black border-b border-slate-200 dark:border-slate-800 pb-1">
            5. Experimental Observations from Multi-Agent Simulations
          </h3>
          <div className="space-y-3">
            {LAB_RECORD_DATA.experimentalObservations.map((obs, i) => (
              <div
                key={i}
                className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/40 print:bg-white print:border-black text-xs space-y-1.5"
              >
                <div className="font-bold text-slate-900 dark:text-white print:text-black text-sm">
                  {obs.activity}
                </div>
                <div>
                  <span className="font-semibold text-slate-600 dark:text-slate-400 print:text-black">Parameters:</span>{" "}
                  {obs.parametersTested}
                </div>
                <div>
                  <span className="font-semibold text-slate-600 dark:text-slate-400 print:text-black">Simulation Output:</span>{" "}
                  {obs.observedResult}
                </div>
                <div>
                  <span className="font-semibold text-emerald-600 dark:text-emerald-400 print:text-black">Theoretical Validation:</span>{" "}
                  {obs.theoreticalValidation}
                </div>
                <div>
                  <span className="font-semibold text-indigo-600 dark:text-indigo-400 print:text-black">Mathematical Inference:</span>{" "}
                  {obs.inference}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 6. What the Student Learns from the Games */}
        <div className="space-y-2">
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-white print:text-black border-b border-slate-200 dark:border-slate-800 pb-1">
            6. Pedagogical Outcomes from Interactive Visualizations
          </h3>
          <ul className="space-y-1.5 text-xs sm:text-sm text-slate-700 dark:text-slate-300 print:text-black list-disc list-inside">
            {LAB_RECORD_DATA.pedagogicalTakeaways.map((pt, i) => (
              <li key={i}>{pt}</li>
            ))}
          </ul>
        </div>

        {/* 7. Conclusion */}
        <div className="space-y-2 pt-2">
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-white print:text-black border-b border-slate-200 dark:border-slate-800 pb-1">
            7. Conclusion
          </h3>
          <p className="text-sm text-slate-700 dark:text-slate-300 print:text-black leading-relaxed font-serif text-justify">
            {LAB_RECORD_DATA.conclusion}
          </p>
        </div>

        {/* Signatures Block for Academic Record */}
        <div className="pt-8 border-t border-slate-200 dark:border-slate-800 flex justify-between text-xs font-mono text-slate-600 dark:text-slate-400 print:text-black">
          <div>
            <div>Date of Verification: _______________</div>
            <div>Student Roll No: __________________</div>
          </div>
          <div className="text-right">
            <div>Signature of Faculty In-Charge: _________________</div>
            <div>Marks Awarded: ________ / 20</div>
          </div>
        </div>
      </div>
    </div>
  );
};
