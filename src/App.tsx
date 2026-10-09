import React, { useState, useEffect } from "react";
import { Navbar } from "./components/Navbar";
import { HomeOverview } from "./components/HomeOverview";
import { TheorySection } from "./components/TheorySection";
import { WorksheetSection } from "./components/WorksheetSection";
import { CalculatorSection } from "./components/CalculatorSection";
import { GameZoneSection } from "./components/GameZoneSection";
import { FormulaReferenceSection } from "./components/FormulaReferenceSection";
import { LabNotesSection } from "./components/LabNotesSection";
import { ProgressDashboard } from "./components/ProgressDashboard";
import { WORKSHEET_QUESTIONS } from "./data/worksheetData";

export default function App() {
  const [activeTab, setActiveTab] = useState<string>("home");
  const [selectedTheoryTopicId, setSelectedTheoryTopicId] = useState<string | undefined>(undefined);

  // Theme state
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem("dms_theme");
      if (saved) return saved === "dark";
      return window.matchMedia("(prefers-color-scheme: dark)").matches;
    } catch {
      return false;
    }
  });

  // Apply dark mode class to root HTML element
  useEffect(() => {
    try {
      if (darkMode) {
        document.documentElement.classList.add("dark");
        localStorage.setItem("dms_theme", "dark");
      } else {
        document.documentElement.classList.remove("dark");
        localStorage.setItem("dms_theme", "light");
      }
    } catch {
      // localStorage may fail in hermetic iframes, safe to ignore
    }
  }, [darkMode]);

  // Worksheet State
  const [userAnswers, setUserAnswers] = useState<Record<string, string>>(() => {
    try {
      const saved = localStorage.getItem("dms_worksheet_answers");
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  const [submittedStatus, setSubmittedStatus] = useState<Record<string, "correct" | "incorrect">>(() => {
    try {
      const saved = localStorage.getItem("dms_worksheet_status");
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  const [revealedHints, setRevealedHints] = useState<Record<string, number>>({});
  const [revealedSolutions, setRevealedSolutions] = useState<Record<string, boolean>>({});

  // Sync worksheet progress to localStorage
  useEffect(() => {
    try {
      localStorage.setItem("dms_worksheet_answers", JSON.stringify(userAnswers));
      localStorage.setItem("dms_worksheet_status", JSON.stringify(submittedStatus));
    } catch {
      // safe fallback
    }
  }, [userAnswers, submittedStatus]);

  const worksheetScore = Object.values(submittedStatus).filter((s) => s === "correct").length;
  const totalAttempted = Object.keys(submittedStatus).length;

  const handleNavigate = (tab: string, topicId?: string) => {
    if (topicId) {
      setSelectedTheoryTopicId(topicId);
    }
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleResetAllProgress = () => {
    if (window.confirm("Are you sure you want to reset all worksheet scores and progress?")) {
      setUserAnswers({});
      setSubmittedStatus({});
      setRevealedHints({});
      setRevealedSolutions({});
      try {
        localStorage.removeItem("dms_worksheet_answers");
        localStorage.removeItem("dms_worksheet_status");
      } catch {
        // safe fallback
      }
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors flex flex-col font-sans">
      {/* Top Bar Navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        worksheetScore={worksheetScore}
        totalWorksheet={WORKSHEET_QUESTIONS.length}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8">
        {activeTab === "home" && (
          <HomeOverview
            onNavigate={handleNavigate}
            worksheetScore={worksheetScore}
            totalWorksheet={WORKSHEET_QUESTIONS.length}
          />
        )}

        {activeTab === "theory" && (
          <TheorySection initialTopicId={selectedTheoryTopicId} />
        )}

        {activeTab === "worksheet" && (
          <WorksheetSection
            userAnswers={userAnswers}
            setUserAnswers={setUserAnswers}
            submittedStatus={submittedStatus}
            setSubmittedStatus={setSubmittedStatus}
            revealedHints={revealedHints}
            setRevealedHints={setRevealedHints}
            revealedSolutions={revealedSolutions}
            setRevealedSolutions={setRevealedSolutions}
          />
        )}

        {activeTab === "calculator" && <CalculatorSection />}

        {activeTab === "games" && <GameZoneSection />}

        {activeTab === "reference" && <FormulaReferenceSection />}

        {activeTab === "labnotes" && <LabNotesSection />}

        {activeTab === "dashboard" && (
          <ProgressDashboard
            worksheetScore={worksheetScore}
            totalAttempted={totalAttempted}
            onResetAllProgress={handleResetAllProgress}
            onNavigate={handleNavigate}
          />
        )}
      </main>

      {/* Academic Footer */}
      <footer className="mt-16 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 py-8 print:hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 dark:text-slate-400">
          <div>
            <span className="font-semibold text-slate-800 dark:text-slate-200">
              Discrete Mathematical Structures (21CS36 / 18CS36)
            </span>
            <span aria-hidden="true"> · </span>
            <span>Permutations &amp; Combinations Portal</span>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={() => handleNavigate("reference")}
              className="hover:text-slate-900 dark:hover:text-white"
            >
              Formula Sheet
            </button>
            <button
              onClick={() => handleNavigate("labnotes")}
              className="hover:text-slate-900 dark:hover:text-white"
            >
              Observation Notes
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
