import React, { useState, useEffect } from "react";
import { RACE_HURDLES, RaceHurdle } from "../../data/gamesData";
import { Flag, Play, Pause, RotateCcw, CheckCircle2, XCircle, Trophy, Timer } from "lucide-react";

export const CountingRaceGame: React.FC = () => {
  const [currentHurdleIndex, setCurrentHurdleIndex] = useState<number>(0);
  const [score, setScore] = useState<number>(0);
  const [isTimedMode, setIsTimedMode] = useState<boolean>(true);
  const [timeLeft, setTimeLeft] = useState<number>(60);
  const [timerRunning, setTimerRunning] = useState<boolean>(false);
  const [raceFinished, setRaceFinished] = useState<boolean>(false);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [hurdleFeedback, setHurdleFeedback] = useState<boolean | null>(null);
  const [attemptHistory, setAttemptHistory] = useState<
    { hurdle: RaceHurdle; chosenIndex: number; isCorrect: boolean }[]
  >([]);

  const hurdle: RaceHurdle = RACE_HURDLES[currentHurdleIndex];

  // Timer countdown
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (timerRunning && isTimedMode && timeLeft > 0 && !raceFinished) {
      interval = setInterval(() => {
        setTimeLeft((t) => {
          if (t <= 1) {
            setRaceFinished(true);
            setTimerRunning(false);
            return 0;
          }
          return t - 1;
        });
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [timerRunning, isTimedMode, timeLeft, raceFinished]);

  const handleStartRace = () => {
    setTimerRunning(true);
  };

  const handlePauseRace = () => {
    setTimerRunning(false);
  };

  const handleOptionSelect = (optionIdx: number) => {
    if (hurdleFeedback !== null || raceFinished) return;
    if (!timerRunning && isTimedMode) {
      setTimerRunning(true);
    }

    const correct = optionIdx === hurdle.correctIndex;
    setSelectedOption(optionIdx);
    setHurdleFeedback(correct);

    if (correct) {
      setScore((s) => s + 10);
    }

    setAttemptHistory((prev) => [
      ...prev,
      { hurdle, chosenIndex: optionIdx, isCorrect: correct }
    ]);

    setTimeout(() => {
      if (currentHurdleIndex < RACE_HURDLES.length - 1) {
        setCurrentHurdleIndex((prev) => prev + 1);
        setSelectedOption(null);
        setHurdleFeedback(null);
      } else {
        setRaceFinished(true);
        setTimerRunning(false);
      }
    }, 900);
  };

  const handleResetRace = () => {
    setCurrentHurdleIndex(0);
    setScore(0);
    setTimeLeft(60);
    setTimerRunning(false);
    setRaceFinished(false);
    setSelectedOption(null);
    setHurdleFeedback(null);
    setAttemptHistory([]);
  };

  const progressPercent = Math.round((currentHurdleIndex / RACE_HURDLES.length) * 100);

  return (
    <div className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 space-y-6 shadow-sm">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-700">
        <div>
          <div className="text-xs font-bold text-indigo-600 dark:text-indigo-400 flex items-center gap-1.5">
            <Flag className="w-4 h-4 text-rose-500" />
            <span>GAME 5: COMBINATORIAL COUNTING RACE</span>
          </div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white mt-0.5">
            Track Speed Challenge ({RACE_HURDLES.length} Hurdles)
          </h2>
        </div>

        <div className="flex items-center gap-3">
          {/* Mode Switcher */}
          <div className="flex items-center gap-1 p-1 bg-slate-100 dark:bg-slate-700 rounded-lg text-xs font-semibold">
            <button
              onClick={() => {
                setIsTimedMode(true);
                handleResetRace();
              }}
              className={`px-2.5 py-1 rounded-md transition-colors ${
                isTimedMode ? "bg-white dark:bg-slate-900 text-indigo-600 shadow-xs" : "text-slate-600 dark:text-slate-300"
              }`}
            >
              Timed Race (60s)
            </button>
            <button
              onClick={() => {
                setIsTimedMode(false);
                handleResetRace();
              }}
              className={`px-2.5 py-1 rounded-md transition-colors ${
                !isTimedMode ? "bg-white dark:bg-slate-900 text-indigo-600 shadow-xs" : "text-slate-600 dark:text-slate-300"
              }`}
            >
              Practice Mode
            </button>
          </div>

          {/* Time & Score Display */}
          {isTimedMode && (
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 text-amber-800 dark:text-amber-300 font-mono text-xs font-bold">
              <Timer className="w-3.5 h-3.5" />
              <span>{timeLeft}s</span>
            </div>
          )}

          <div className="px-3 py-1.5 rounded-lg bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800 text-indigo-800 dark:text-indigo-300 font-mono text-xs font-bold">
            Score: {score}
          </div>
        </div>
      </div>

      {/* Visual Racing Track Animation with Runner SVG */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 border border-slate-800 space-y-4 text-white overflow-hidden relative">
        <div className="flex items-center justify-between text-xs text-slate-400">
          <span className="font-semibold uppercase tracking-wider">Race Course (1000m Track)</span>
          <span className="font-mono">{progressPercent}% Completed</span>
        </div>

        {/* The Track Container */}
        <div className="relative h-20 bg-slate-800/80 rounded-xl border border-slate-700 overflow-hidden flex items-center px-4">
          {/* Lane marking dashed line */}
          <div className="absolute inset-x-0 h-0.5 border-b-2 border-dashed border-slate-600/60 top-1/2 -translate-y-1/2" />

          {/* Distance markers along track */}
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((h) => (
            <div
              key={h}
              className="absolute top-2 bottom-2 w-0.5 bg-slate-600/40 flex flex-col justify-between items-center text-[9px] text-slate-500 font-mono"
              style={{ left: `${(h / 10) * 90}%` }}
            >
              <span>{h}00m</span>
              <span>H{h}</span>
            </div>
          ))}

          {/* Finish Line Flag */}
          <div className="absolute right-4 top-2 bottom-2 w-3 bg-red-600 flex items-center justify-center font-bold text-[8px] text-white">
            FIN
          </div>

          {/* Moving Runner / Race Piece SVG */}
          <div
            className="absolute z-10 transition-all duration-500 ease-out flex flex-col items-center"
            style={{
              left: `${Math.min(92, Math.max(2, (currentHurdleIndex / RACE_HURDLES.length) * 90))}%`,
              transform: "translateX(-50%)"
            }}
          >
            {/* Illustrated Runner SVG Piece */}
            <svg className="w-10 h-10 drop-shadow-md" viewBox="0 0 40 40">
              {/* Runner Torso & Head */}
              <circle cx="20" cy="10" r="4.5" fill="#F59E0B" />
              {/* Torso */}
              <path d="M 20 15 L 20 25" stroke="#3B82F6" strokeWidth="3.5" strokeLinecap="round" />
              {/* Moving Arms */}
              <path
                d={hurdleFeedback ? "M 20 17 L 27 12 M 20 17 L 13 14" : "M 20 18 L 26 15 M 20 18 L 14 20"}
                stroke="#F59E0B"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
              {/* Moving Legs */}
              <path
                d={hurdleFeedback ? "M 20 25 L 26 34 M 20 25 L 14 31" : "M 20 25 L 24 33 M 20 25 L 16 32"}
                stroke="#1E293B"
                strokeWidth="3"
                strokeLinecap="round"
              />
            </svg>
            <div className="text-[10px] font-bold text-amber-400 bg-slate-900/80 px-1.5 rounded">
              Runner
            </div>
          </div>
        </div>

        {/* Race Controls (Play / Pause / Reset) */}
        <div className="flex items-center justify-between pt-1">
          <div className="flex items-center gap-2">
            {isTimedMode && !raceFinished && (
              <button
                onClick={timerRunning ? handlePauseRace : handleStartRace}
                className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-semibold flex items-center gap-1 border border-slate-700"
              >
                {timerRunning ? <Pause className="w-3.5 h-3.5 text-amber-400" /> : <Play className="w-3.5 h-3.5 text-emerald-400" />}
                {timerRunning ? "Pause Race" : "Start Race"}
              </button>
            )}
            <button
              onClick={handleResetRace}
              className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-semibold flex items-center gap-1 border border-slate-700"
            >
              <RotateCcw className="w-3.5 h-3.5 text-slate-400" /> Restart
            </button>
          </div>

          <div className="text-xs text-slate-400">
            Hurdle {currentHurdleIndex + 1} of {RACE_HURDLES.length}
          </div>
        </div>
      </div>

      {/* Race Question Card or Results Screen */}
      {!raceFinished ? (
        <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 space-y-5">
          <div>
            <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider block">
              Track Challenge Question:
            </span>
            <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white mt-1">
              {hurdle.prompt}
            </h3>
          </div>

          {/* Multiple Choice Option Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {hurdle.options.map((option, idx) => {
              const isSelected = selectedOption === idx;
              const isCorrectOpt = idx === hurdle.correctIndex;
              return (
                <button
                  key={idx}
                  onClick={() => handleOptionSelect(idx)}
                  className={`p-3.5 rounded-xl border font-mono text-sm font-semibold transition-all text-left flex items-center justify-between ${
                    isSelected && isCorrectOpt
                      ? "bg-emerald-100 dark:bg-emerald-950 border-emerald-500 text-emerald-900 dark:text-emerald-200 ring-2 ring-emerald-500"
                      : isSelected && !isCorrectOpt
                      ? "bg-rose-100 dark:bg-rose-950 border-rose-500 text-rose-900 dark:text-rose-200"
                      : "bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white hover:border-indigo-400 hover:bg-indigo-50/20"
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span className="w-6 h-6 rounded-md bg-slate-100 dark:bg-slate-700 text-xs flex items-center justify-center font-bold">
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <span>{option}</span>
                  </div>
                  {isSelected && (isCorrectOpt ? <CheckCircle2 className="w-4 h-4 text-emerald-600" /> : <XCircle className="w-4 h-4 text-rose-600" />)}
                </button>
              );
            })}
          </div>

          {/* Rapid Flash Feedback */}
          {hurdleFeedback !== null && (
            <div className={`p-3 rounded-lg text-xs font-medium ${hurdleFeedback ? "bg-emerald-50 dark:bg-emerald-950/30 text-emerald-800 dark:text-emerald-300" : "bg-rose-50 dark:bg-rose-950/30 text-rose-800 dark:text-rose-300"}`}>
              {hurdleFeedback ? "✓ Correct! Runner sprints ahead +100m!" : "✗ Missed hurdle! Penalty hesitation!"} — {hurdle.explanation}
            </div>
          )}
        </div>
      ) : (
        /* Race Finished Summary Screen */
        <div className="p-8 rounded-2xl bg-gradient-to-br from-indigo-900 via-slate-900 to-slate-950 text-white text-center space-y-6 border border-indigo-700">
          <div className="w-16 h-16 rounded-full bg-amber-500/20 text-amber-400 mx-auto flex items-center justify-center ring-4 ring-amber-500/30">
            <Trophy className="w-8 h-8" />
          </div>
          <div className="space-y-1">
            <h3 className="text-2xl font-bold">Race Finished!</h3>
            <p className="text-sm text-slate-300">
              Final Score: <strong className="text-amber-400">{score} points</strong> ({score / 10} of 10 hurdles cleared).
            </p>
          </div>

          {/* Attempt Breakdown */}
          <div className="max-w-xl mx-auto p-4 rounded-xl bg-slate-800/80 border border-slate-700 text-left text-xs space-y-2 max-h-60 overflow-y-auto">
            <span className="font-bold text-slate-300 block mb-2">Hurdle Review &amp; Mathematical Explanations:</span>
            {attemptHistory.map((att, i) => (
              <div key={i} className="p-2 rounded bg-slate-900/60 border border-slate-800 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-slate-200">{att.hurdle.prompt}</span>
                  <span className={att.isCorrect ? "text-emerald-400 font-bold" : "text-rose-400 font-bold"}>
                    {att.isCorrect ? "Correct" : "Incorrect"}
                  </span>
                </div>
                <div className="text-[11px] text-slate-400">{att.hurdle.explanation}</div>
              </div>
            ))}
          </div>

          <button
            onClick={handleResetRace}
            className="px-6 py-2.5 rounded-lg bg-indigo-500 hover:bg-indigo-400 text-white font-bold text-xs transition-colors"
          >
            Race Again
          </button>
        </div>
      )}
    </div>
  );
};
