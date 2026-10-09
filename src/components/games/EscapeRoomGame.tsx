import React, { useState } from "react";
import { ESCAPE_ROOM_STATIONS, EscapeRoomStation } from "../../data/gamesData";
import { Lock, Unlock, Key, CheckCircle2, RotateCcw, Lightbulb, Trophy, Sparkles } from "lucide-react";

export const EscapeRoomGame: React.FC = () => {
  const [currentStationIndex, setCurrentStationIndex] = useState<number>(0);
  const [userAnswer, setUserAnswer] = useState<string>("");
  const [unlockedRooms, setUnlockedRooms] = useState<boolean[]>([false, false, false, false, false]);
  const [feedback, setFeedback] = useState<"idle" | "correct" | "incorrect">("idle");
  const [showHint, setShowHint] = useState<boolean>(false);
  const [gearRotation, setGearRotation] = useState<number>(0);

  const station: EscapeRoomStation = ESCAPE_ROOM_STATIONS[currentStationIndex];
  const allUnlocked = unlockedRooms.every(Boolean);

  const handleAttemptUnlock = () => {
    const isCorrect = userAnswer.trim() === station.correctAnswer.trim();
    // Animate gear rotation
    setGearRotation((prev) => prev + 90);

    if (isCorrect) {
      setFeedback("correct");
      const nextUnlocked = [...unlockedRooms];
      nextUnlocked[currentStationIndex] = true;
      setUnlockedRooms(nextUnlocked);
    } else {
      setFeedback("incorrect");
    }
  };

  const handleNextRoom = () => {
    if (currentStationIndex < ESCAPE_ROOM_STATIONS.length - 1) {
      setCurrentStationIndex((prev) => prev + 1);
      setUserAnswer("");
      setFeedback("idle");
      setShowHint(false);
    }
  };

  const handleResetGame = () => {
    setCurrentStationIndex(0);
    setUserAnswer("");
    setUnlockedRooms([false, false, false, false, false]);
    setFeedback("idle");
    setShowHint(false);
    setGearRotation(0);
  };

  return (
    <div className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 space-y-6 shadow-sm">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-700">
        <div>
          <div className="text-xs font-bold text-amber-600 dark:text-amber-400 flex items-center gap-1.5">
            <Lock className="w-4 h-4" />
            <span>GAME 4: DMS COMBINATORIAL ESCAPE ROOM</span>
          </div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white mt-0.5">
            Station {station.roomNumber}: {station.roomName}
          </h2>
        </div>

        {/* 5 Doors Progress Tracker */}
        <div className="flex items-center gap-2">
          {ESCAPE_ROOM_STATIONS.map((st, idx) => (
            <button
              key={st.roomNumber}
              onClick={() => {
                setCurrentStationIndex(idx);
                setUserAnswer("");
                setFeedback(unlockedRooms[idx] ? "correct" : "idle");
                setShowHint(false);
              }}
              className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold transition-all ${
                unlockedRooms[idx]
                  ? "bg-emerald-600 text-white shadow-xs"
                  : idx === currentStationIndex
                  ? "bg-amber-500 text-white ring-2 ring-amber-300"
                  : "bg-slate-100 dark:bg-slate-700 text-slate-500 hover:bg-slate-200"
              }`}
              title={`Room ${st.roomNumber}: ${st.roomName}`}
            >
              {unlockedRooms[idx] ? <Unlock className="w-3.5 h-3.5" /> : st.roomNumber}
            </button>
          ))}
        </div>
      </div>

      {/* Victory Celebration Screen when all 5 doors unlocked */}
      {allUnlocked ? (
        <div className="p-8 rounded-2xl bg-gradient-to-br from-emerald-900 via-slate-900 to-slate-950 text-white text-center space-y-5 border border-emerald-500/50 shadow-xl">
          <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 mx-auto flex items-center justify-center ring-4 ring-emerald-500/30">
            <Trophy className="w-8 h-8" />
          </div>
          <div className="space-y-2">
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
              Escape Room Conquered!
            </h3>
            <p className="text-sm text-emerald-200 max-w-lg mx-auto">
              You unlocked all 5 combinatorial vault portals using factorials, permutations, combinations,
              repetition, and circular arrangements. Excellent mathematical deduction!
            </p>
          </div>
          <div className="pt-2">
            <button
              onClick={handleResetGame}
              className="px-6 py-2.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs transition-colors shadow-md"
            >
              Replay Escape Room
            </button>
          </div>
        </div>
      ) : (
        <>
          {/* Animated Vault Mechanical Stage */}
          <div className="p-8 rounded-2xl bg-gradient-to-b from-slate-900 to-slate-950 text-white border border-slate-800 space-y-6 relative overflow-hidden">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
              {/* Vault Chamber Visual Representation */}
              <div className="space-y-2 text-left max-w-md">
                <span className="text-[11px] font-bold uppercase tracking-wider text-amber-400 block">
                  Vault Security Protocol: {station.theme}
                </span>
                <p className="text-sm text-slate-300 font-serif leading-relaxed">
                  "{station.puzzleDescription}"
                </p>
              </div>

              {/* Animated Interactive Gears & Lock SVG */}
              <div className="relative w-36 h-36 flex items-center justify-center shrink-0">
                {/* Rotating Outer Gear SVG */}
                <svg
                  className="w-full h-full text-amber-500/40 transition-transform duration-500"
                  style={{ transform: `rotate(${gearRotation}deg)` }}
                  viewBox="0 0 100 100"
                >
                  <circle cx="50" cy="50" r="38" fill="none" stroke="currentColor" strokeWidth="4" strokeDasharray="6 4" />
                  <circle cx="50" cy="50" r="28" fill="none" stroke="currentColor" strokeWidth="2" />
                  {/* Gear teeth */}
                  {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
                    <rect
                      key={i}
                      x="47"
                      y="4"
                      width="6"
                      height="10"
                      fill="currentColor"
                      transform={`rotate(${angle} 50 50)`}
                    />
                  ))}
                </svg>

                {/* Center Vault Door State */}
                <div
                  className={`absolute w-16 h-16 rounded-full flex items-center justify-center border-2 transition-all duration-500 ${
                    unlockedRooms[currentStationIndex]
                      ? "bg-emerald-600/30 border-emerald-400 text-emerald-400 scale-110 shadow-lg shadow-emerald-500/20"
                      : "bg-slate-800/80 border-amber-500/60 text-amber-400"
                  }`}
                >
                  {unlockedRooms[currentStationIndex] ? (
                    <Unlock className="w-8 h-8 animate-in zoom-in-50" />
                  ) : (
                    <Lock className="w-7 h-7" />
                  )}
                </div>
              </div>
            </div>

            {/* Chamber Status Bar */}
            <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
              <span>Chamber Lock State:</span>
              <span
                className={`font-mono font-bold ${
                  unlockedRooms[currentStationIndex] ? "text-emerald-400" : "text-amber-400"
                }`}
              >
                {unlockedRooms[currentStationIndex] ? "UNLOCKED (PASSED)" : "SEALED"}
              </span>
            </div>
          </div>

          {/* Interactive Dial Keypad Input */}
          <div className="p-6 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 space-y-4">
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                {station.question}
              </h3>
              <span className="text-xs text-slate-500">
                Enter the exact numeric key to release the chamber gears.
              </span>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <input
                type="text"
                placeholder={station.inputPlaceholder}
                value={userAnswer}
                disabled={unlockedRooms[currentStationIndex]}
                onChange={(e) => setUserAnswer(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleAttemptUnlock();
                }}
                className="w-full sm:w-64 px-4 py-2 rounded-lg bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-sm font-mono text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
              />

              {!unlockedRooms[currentStationIndex] ? (
                <button
                  onClick={handleAttemptUnlock}
                  className="px-5 py-2 rounded-lg bg-amber-600 hover:bg-amber-700 text-white font-semibold text-xs transition-colors flex items-center justify-center gap-1.5"
                >
                  <Key className="w-3.5 h-3.5" /> Turn Vault Key
                </button>
              ) : (
                <button
                  onClick={handleNextRoom}
                  className="px-5 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs transition-colors flex items-center justify-center gap-1.5"
                >
                  Enter Next Chamber →
                </button>
              )}
            </div>

            {/* Feedback & Solution */}
            {feedback === "correct" && (
              <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-300 dark:border-emerald-800 space-y-1.5">
                <div className="flex items-center gap-2 text-emerald-800 dark:text-emerald-300 font-bold text-xs">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  Gear Released! Chamber {station.roomNumber} Unlocked.
                </div>
                <div className="text-xs text-slate-700 dark:text-slate-300">
                  <span className="font-semibold">Solution: </span>
                  {station.solution}
                </div>
              </div>
            )}

            {feedback === "incorrect" && (
              <div className="p-4 rounded-xl bg-rose-50 dark:bg-rose-950/30 border border-rose-300 dark:border-rose-800 space-y-1">
                <div className="text-rose-800 dark:text-rose-300 font-bold text-xs">
                  Key jammed! Incorrect code. The dial reset.
                </div>
                <p className="text-xs text-rose-700 dark:text-rose-400">
                  Review the mathematical restriction carefully and retry.
                </p>
              </div>
            )}
          </div>

          {/* Footer Tools */}
          <div className="flex items-center justify-between text-xs text-slate-500 pt-2 border-t border-slate-100 dark:border-slate-700">
            <button
              onClick={() => setShowHint(!showHint)}
              className="flex items-center gap-1 text-amber-600 dark:text-amber-400 hover:underline"
            >
              <Lightbulb className="w-3.5 h-3.5" />
              {showHint ? "Hide Vault Inscription" : "Decipher Inscription (Hint)"}
            </button>

            <button
              onClick={handleResetGame}
              className="flex items-center gap-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
            >
              <RotateCcw className="w-3 h-3" /> Reset Escape Room
            </button>
          </div>

          {showHint && (
            <div className="p-3 rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-200 text-xs text-amber-800 dark:text-amber-200">
              💡 <strong>Vault Clue:</strong> {station.hint}
            </div>
          )}
        </>
      )}
    </div>
  );
};
