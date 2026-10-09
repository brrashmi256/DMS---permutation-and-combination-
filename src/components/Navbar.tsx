import React from "react";
import { Sun, Moon, Download, BookOpen, CheckSquare, Calculator, Gamepad2, FileText, BarChart3 } from "lucide-react";

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  darkMode: boolean;
  setDarkMode: (val: boolean) => void;
  worksheetScore: number;
  totalWorksheet: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  darkMode,
  setDarkMode,
  worksheetScore,
  totalWorksheet
}) => {
  return (
    <header className="sticky top-0 z-50 bg-white/95 dark:bg-slate-900/95 backdrop-blur border-b border-slate-200 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          {/* Brand Zone */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setActiveTab("home")}
              className="text-left group flex items-center gap-2 focus:outline-none"
            >
              <div className="w-9 h-9 rounded-lg bg-indigo-600 text-white flex items-center justify-center font-bold text-lg shadow-sm">
                ∑
              </div>
              <div>
                <span className="text-base sm:text-lg font-bold tracking-tight text-slate-900 dark:text-white block whitespace-nowrap">
                  DMS Combinatorics
                </span>
                <span className="text-[11px] text-slate-500 dark:text-slate-400 block whitespace-nowrap hidden sm:block">
                  2nd-Year B.E. Discrete Mathematical Structures
                </span>
              </div>
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2 text-xs lg:text-sm font-medium">
            <button
              onClick={() => setActiveTab("home")}
              className={`px-3 py-1.5 rounded-md transition-colors whitespace-nowrap ${
                activeTab === "home"
                  ? "bg-slate-100 dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 font-semibold"
                  : "text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => setActiveTab("theory")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md transition-colors whitespace-nowrap ${
                activeTab === "theory"
                  ? "bg-slate-100 dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 font-semibold"
                  : "text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              Theory &amp; 49 Solved
            </button>
            <button
              onClick={() => setActiveTab("worksheet")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md transition-colors whitespace-nowrap ${
                activeTab === "worksheet"
                  ? "bg-slate-100 dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 font-semibold"
                  : "text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              <CheckSquare className="w-3.5 h-3.5" />
              Worksheet ({worksheetScore}/{totalWorksheet})
            </button>
            <button
              onClick={() => setActiveTab("calculator")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md transition-colors whitespace-nowrap ${
                activeTab === "calculator"
                  ? "bg-slate-100 dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 font-semibold"
                  : "text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              <Calculator className="w-3.5 h-3.5" />
              Calculator
            </button>
            <button
              onClick={() => setActiveTab("games")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md transition-colors whitespace-nowrap ${
                activeTab === "games"
                  ? "bg-slate-100 dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 font-semibold"
                  : "text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              <Gamepad2 className="w-3.5 h-3.5" />
              Games (12)
            </button>
            <button
              onClick={() => setActiveTab("reference")}
              className={`px-3 py-1.5 rounded-md transition-colors whitespace-nowrap ${
                activeTab === "reference"
                  ? "bg-slate-100 dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 font-semibold"
                  : "text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              Formulas
            </button>
            <button
              onClick={() => setActiveTab("labnotes")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md transition-colors whitespace-nowrap ${
                activeTab === "labnotes"
                  ? "bg-slate-100 dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 font-semibold"
                  : "text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              Lab Notes
            </button>
            <button
              onClick={() => setActiveTab("dashboard")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md transition-colors whitespace-nowrap ${
                activeTab === "dashboard"
                  ? "bg-slate-100 dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 font-semibold"
                  : "text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              <BarChart3 className="w-3.5 h-3.5" />
              Performance Dashboard
            </button>
          </nav>

          {/* Action Zone: Download HTML and Dark/Light Mode */}
          <div className="flex items-center gap-2">
            <a
              href="/DMS_Permutations_Combinations.html"
              download="DMS_Permutations_Combinations.html"
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-indigo-200 dark:border-indigo-800 bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 hover:bg-indigo-100 dark:hover:bg-indigo-900/60 transition-colors text-xs font-semibold whitespace-nowrap"
              title="Download standalone offline HTML file"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download HTML</span>
            </a>

            <button
              onClick={() => setDarkMode(!darkMode)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors text-xs font-semibold whitespace-nowrap"
              title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
              aria-label="Toggle theme"
            >
              {darkMode ? (
                <>
                  <Sun className="w-4 h-4 text-amber-400" />
                  <span>Light Mode</span>
                </>
              ) : (
                <>
                  <Moon className="w-4 h-4 text-slate-600" />
                  <span>Dark Mode</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Submenu Bar */}
        <div className="flex md:hidden overflow-x-auto py-2 gap-1 border-t border-slate-100 dark:border-slate-800 text-xs no-scrollbar">
          {[
            { id: "home", label: "Overview" },
            { id: "theory", label: "Theory & Solved" },
            { id: "worksheet", label: `Worksheet (${worksheetScore}/${totalWorksheet})` },
            { id: "calculator", label: "Calculator" },
            { id: "games", label: "Games (12)" },
            { id: "reference", label: "Formulas" },
            { id: "labnotes", label: "Lab Notes" },
            { id: "dashboard", label: "Performance" }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-2.5 py-1 rounded whitespace-nowrap ${
                activeTab === tab.id
                  ? "bg-indigo-600 text-white font-medium"
                  : "text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-800"
              }`}
            >
              {tab.label}
            </button>
          ))}
          <a
            href="/DMS_Permutations_Combinations.html"
            download="DMS_Permutations_Combinations.html"
            className="px-2.5 py-1 rounded whitespace-nowrap bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 font-medium inline-flex items-center gap-1"
          >
            <Download className="w-3 h-3" />
            HTML
          </a>
        </div>
      </div>
    </header>
  );
};
