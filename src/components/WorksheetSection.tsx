import React, { useState } from "react";
import { WORKSHEET_QUESTIONS, WorksheetQuestion } from "../data/worksheetData";
import { CheckSquare, HelpCircle, CheckCircle2, XCircle, RotateCcw, Eye, Search, Filter } from "lucide-react";

interface WorksheetSectionProps {
  userAnswers: Record<string, string>;
  setUserAnswers: React.Dispatch<React.SetStateAction<Record<string, string>>>;
  submittedStatus: Record<string, "correct" | "incorrect">;
  setSubmittedStatus: React.Dispatch<React.SetStateAction<Record<string, "correct" | "incorrect">>>;
  revealedHints: Record<string, number>;
  setRevealedHints: React.Dispatch<React.SetStateAction<Record<string, number>>>;
  revealedSolutions: Record<string, boolean>;
  setRevealedSolutions: React.Dispatch<React.SetStateAction<Record<string, boolean>>>;
}

export const WorksheetSection: React.FC<WorksheetSectionProps> = ({
  userAnswers,
  setUserAnswers,
  submittedStatus,
  setSubmittedStatus,
  revealedHints,
  setRevealedHints,
  revealedSolutions,
  setRevealedSolutions
}) => {
  const [selectedTopic, setSelectedTopic] = useState<string>("all");
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const handleInputChange = (id: string, val: string) => {
    setUserAnswers((prev) => ({ ...prev, [id]: val }));
  };

  const handleCheckAnswer = (q: WorksheetQuestion) => {
    const rawUser = (userAnswers[q.id] || "").trim().toLowerCase();
    const cleanCorrect = q.correctAnswer.trim().toLowerCase();

    // Check numerical equality or string equality
    const isCorrect = rawUser === cleanCorrect;

    setSubmittedStatus((prev) => ({
      ...prev,
      [q.id]: isCorrect ? "correct" : "incorrect"
    }));
  };

  const handleRevealNextHint = (id: string, totalHints: number) => {
    setRevealedHints((prev) => {
      const current = prev[id] || 0;
      return { ...prev, [id]: Math.min(current + 1, totalHints) };
    });
  };

  const toggleSolution = (id: string) => {
    setRevealedSolutions((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleResetQuestion = (id: string) => {
    setUserAnswers((prev) => {
      const next = { ...prev };
      delete next[id];
      return next;
    });
    setSubmittedStatus((prev) => {
      const next = { ...prev };
      delete next[id];
      return next;
    });
    setRevealedHints((prev) => {
      const next = { ...prev };
      delete next[id];
      return next;
    });
    setRevealedSolutions((prev) => {
      const next = { ...prev };
      delete next[id];
      return next;
    });
  };

  // Filtering
  const filteredQuestions = WORKSHEET_QUESTIONS.filter((q) => {
    if (selectedTopic !== "all" && q.topicId !== selectedTopic) return false;
    if (selectedDifficulty !== "all" && q.difficulty !== selectedDifficulty) return false;
    if (searchQuery.trim() !== "") {
      const query = searchQuery.toLowerCase();
      return (
        q.question.toLowerCase().includes(query) ||
        q.topicName.toLowerCase().includes(query) ||
        q.id.toLowerCase().includes(query)
      );
    }
    return true;
  });

  const totalCorrect = Object.values(submittedStatus).filter((s) => s === "correct").length;
  const totalAttempted = Object.keys(submittedStatus).length;
  const progressPercent = Math.round((totalCorrect / WORKSHEET_QUESTIONS.length) * 100);

  return (
    <div className="space-y-8 py-6">
      {/* Header & Progress Stats */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
          <span>Self-Assessment &amp; Practice Arena</span>
          <span aria-hidden="true">·</span>
          <span>70 Curated Problems with Solutions</span>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
              Interactive DMS Worksheet ({WORKSHEET_QUESTIONS.length} Problems)
            </h1>
            <p className="text-sm text-slate-600 dark:text-slate-300 mt-0.5">
              Ten problems per concept across Easy, Medium, and Challenging tiers. Immediate feedback with progressive hints.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm min-w-[200px]">
            <div className="flex items-center justify-between text-xs font-semibold mb-1.5">
              <span className="text-slate-600 dark:text-slate-300">Completion Score</span>
              <span className="font-mono text-emerald-600 dark:text-emerald-400">
                {totalCorrect} / {WORKSHEET_QUESTIONS.length} ({progressPercent}%)
              </span>
            </div>
            <div className="w-full h-2 rounded-full bg-slate-100 dark:bg-slate-700 overflow-hidden">
              <div
                className="h-full bg-emerald-500 rounded-full transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="p-4 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 space-y-3 shadow-sm">
        <div className="flex flex-col md:flex-row gap-3">
          {/* Search Box */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
            <input
              type="text"
              placeholder="Search problem statement or topic keyword..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Topic Dropdown */}
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-slate-400 shrink-0" />
            <select
              value={selectedTopic}
              onChange={(e) => setSelectedTopic(e.target.value)}
              className="px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-white focus:outline-none"
            >
              <option value="all">All 7 Topics ({WORKSHEET_QUESTIONS.length})</option>
              <option value="factorials">Topic A: Factorials (10)</option>
              <option value="perm_no_rep">Topic B: Permutations w/o Rep (10)</option>
              <option value="comb_no_rep">Topic C: Combinations w/o Rep (10)</option>
              <option value="perm_rep">Topic D: Permutations with Rep (10)</option>
              <option value="comb_rep">Topic E: Combinations with Rep (10)</option>
              <option value="circular_perm">Topic F: Circular Permutations (10)</option>
              <option value="identical_objects">Topic G: Identical Objects (10)</option>
            </select>

            {/* Difficulty Dropdown */}
            <select
              value={selectedDifficulty}
              onChange={(e) => setSelectedDifficulty(e.target.value)}
              className="px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-white focus:outline-none"
            >
              <option value="all">All Difficulties</option>
              <option value="Easy">Easy</option>
              <option value="Medium">Medium</option>
              <option value="Challenging">Challenging</option>
            </select>
          </div>
        </div>

        <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 pt-1">
          <span>Showing {filteredQuestions.length} matching problems</span>
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="text-indigo-600 dark:text-indigo-400 underline hover:no-underline"
            >
              Clear Search
            </button>
          )}
        </div>
      </div>

      {/* Questions List */}
      <div className="space-y-5">
        {filteredQuestions.map((q, idx) => {
          const currentHintLevel = revealedHints[q.id] || 0;
          const status = submittedStatus[q.id];
          const isSolutionVisible = revealedSolutions[q.id] || false;
          const currentInput = userAnswers[q.id] || "";

          return (
            <div
              key={q.id}
              className={`p-6 rounded-2xl bg-white dark:bg-slate-800 border transition-all shadow-sm ${
                status === "correct"
                  ? "border-emerald-300 dark:border-emerald-800/80 bg-emerald-50/10"
                  : status === "incorrect"
                  ? "border-rose-300 dark:border-rose-800/80 bg-rose-50/10"
                  : "border-slate-200 dark:border-slate-700/80"
              }`}
            >
              {/* Question Header */}
              <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-slate-100 dark:border-slate-700">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300">
                    {q.id.toUpperCase()}
                  </span>
                  <span className="text-xs font-semibold text-indigo-600 dark:text-indigo-400">
                    {q.topicName}
                  </span>
                  <span aria-hidden="true" className="text-slate-300">·</span>
                  <span className="text-xs text-slate-500">{q.category}</span>
                </div>

                <div className="flex items-center gap-2">
                  <span
                    className={`text-[11px] font-semibold px-2 py-0.5 rounded ${
                      q.difficulty === "Easy"
                        ? "bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300"
                        : q.difficulty === "Medium"
                        ? "bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300"
                        : "bg-rose-100 dark:bg-rose-950 text-rose-800 dark:text-rose-300"
                    }`}
                  >
                    {q.difficulty}
                  </span>

                  {status === "correct" && (
                    <span className="flex items-center gap-1 text-xs font-bold text-emerald-600 dark:text-emerald-400">
                      <CheckCircle2 className="w-4 h-4" /> Correct
                    </span>
                  )}
                  {status === "incorrect" && (
                    <span className="flex items-center gap-1 text-xs font-bold text-rose-600 dark:text-rose-400">
                      <XCircle className="w-4 h-4" /> Try Again
                    </span>
                  )}
                </div>
              </div>

              {/* Problem Prompt */}
              <div className="py-4">
                <p className="text-sm sm:text-base font-medium text-slate-900 dark:text-white leading-relaxed">
                  {q.question}
                </p>
              </div>

              {/* Input & Action Deck */}
              <div className="space-y-4 pt-1">
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                  <div className="flex-1">
                    <input
                      type="text"
                      placeholder="Enter exact numerical answer..."
                      value={currentInput}
                      onChange={(e) => handleInputChange(q.id, e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") handleCheckAnswer(q);
                      }}
                      className="w-full px-4 py-2 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-sm font-mono text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => handleCheckAnswer(q)}
                      className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs transition-colors"
                    >
                      Check Answer
                    </button>

                    <button
                      onClick={() => handleRevealNextHint(q.id, q.hints.length)}
                      disabled={currentHintLevel >= q.hints.length}
                      className="flex items-center gap-1 px-3 py-2 rounded-lg bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200 text-xs font-medium transition-colors disabled:opacity-50"
                    >
                      <HelpCircle className="w-3.5 h-3.5" />
                      {currentHintLevel === 0
                        ? `Hint (0/${q.hints.length})`
                        : `Next Hint (${currentHintLevel}/${q.hints.length})`}
                    </button>

                    <button
                      onClick={() => toggleSolution(q.id)}
                      className="flex items-center gap-1 px-3 py-2 rounded-lg bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200 text-xs font-medium transition-colors"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      {isSolutionVisible ? "Hide Solution" : "Show Solution"}
                    </button>

                    <button
                      onClick={() => handleResetQuestion(q.id)}
                      title="Reset question"
                      className="p-2 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Progressive Hints Box */}
                {currentHintLevel > 0 && (
                  <div className="p-3.5 rounded-xl bg-amber-50/70 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/50 space-y-2">
                    <span className="text-xs font-bold text-amber-900 dark:text-amber-300 block">
                      Progressive Hints ({currentHintLevel} revealed):
                    </span>
                    {q.hints.slice(0, currentHintLevel).map((hint, hIdx) => (
                      <div key={hIdx} className="text-xs text-amber-800 dark:text-amber-200 pl-2">
                        <span className="font-semibold">Hint {hIdx + 1}:</span> {hint}
                      </div>
                    ))}
                  </div>
                )}

                {/* Detailed Step-by-Step Solution */}
                {isSolutionVisible && (
                  <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-700 space-y-2.5">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                        Complete Step-by-Step Mathematical Solution
                      </span>
                      <span className="text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400">
                        Target Answer: {q.correctAnswer}
                      </span>
                    </div>

                    <div className="space-y-1 text-xs text-slate-700 dark:text-slate-300 pl-1 font-mono">
                      {q.solutionSteps.map((step, sIdx) => (
                        <div key={sIdx}>• {step}</div>
                      ))}
                    </div>

                    <div className="pt-2 border-t border-slate-200 dark:border-slate-800 text-xs font-medium text-slate-800 dark:text-slate-200">
                      <span className="font-bold">Interpretation:</span> {q.finalAnswerExplanation}
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
