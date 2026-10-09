import React, { useState } from "react";
import { TOURNAMENT_PLANNER_THEORY } from "../../data/newGamesData";
import { GameAcademicPanel } from "./GameAcademicPanel";
import { Users, RotateCcw, CheckCircle2, XCircle, HelpCircle, Trophy, Sparkles, ArrowRight, Award, UserCheck } from "lucide-react";

interface TournamentLevel {
  id: number;
  title: string;
  scenario: string;
  candidatePool: { id: string; name: string; avatar: string; number: number }[];
  r: number;
  roles: string[];
  teamCombinationsCount: number;
  rolePermutationsCount: number;
  questionType: "team" | "roles" | "both";
  formulaTex: string;
  hint1: string;
  hint2: string;
  solutionDerivation: string;
}

const TOURNAMENT_LEVELS: TournamentLevel[] = [
  {
    id: 1,
    title: "Level 1: 3-Player Basketball Trio Selection",
    scenario: "From a roster of 6 basketball players, select a 3-player squad. (a) In how many ways can the 3-player squad be selected if positions do not matter? (b) In how many ways can they be assigned to the 3 distinct roles: Point Guard, Shooting Guard, and Center?",
    candidatePool: [
      { id: "P1", name: "Marcus", avatar: "🏀", number: 7 },
      { id: "P2", name: "Jordan", avatar: "⚡", number: 23 },
      { id: "P3", name: "Kobe", avatar: "🔥", number: 24 },
      { id: "P4", name: "LeBron", avatar: "👑", number: 6 },
      { id: "P5", name: "Stephen", avatar: "🎯", number: 30 },
      { id: "P6", name: "Giannis", avatar: "🦌", number: 34 }
    ],
    r: 3,
    roles: ["Point Guard", "Shooting Guard", "Center"],
    teamCombinationsCount: 20,
    rolePermutationsCount: 120,
    questionType: "both",
    formulaTex: "Teams = ⁶C₃ = 20  |  Roles = ⁶P₃ = ⁶C₃ × 3! = 20 × 6 = 120",
    hint1: "Team selection ignores roles (⁶C₃ = 20). Role assignment distinguishes the 3 positions (⁶P₃ = 120).",
    hint2: "Notice the duality bridge: ⁶P₃ = ⁶C₃ × 3! = 20 × 6 = 120.",
    solutionDerivation: "Team squad count: ⁶C₃ = 6! / (3! × 3!) = 20. Role assignment count: ⁶P₃ = 6 × 5 × 4 = 120. Every team can be ordered into roles in 3! = 6 ways."
  },
  {
    id: 2,
    title: "Level 2: Esports Tactical Squad (4 of 8)",
    scenario: "An esports coach has 8 players available. The coach needs to select and assign 4 players to 4 distinct competitive roles: Captain/IGL, Entry Fragger, Sniper, and Support. How many distinct role assignments can be made?",
    candidatePool: [
      { id: "P1", name: "Viper", avatar: "🐍", number: 1 },
      { id: "P2", name: "Ghost", avatar: "👻", number: 2 },
      { id: "P3", name: "Phoenix", avatar: "🦅", number: 3 },
      { id: "P4", name: "Jett", avatar: "💨", number: 4 },
      { id: "P5", name: "Sova", avatar: "🏹", number: 5 },
      { id: "P6", name: "Omen", avatar: "🌑", number: 6 },
      { id: "P7", name: "Sage", avatar: "❄️", number: 7 },
      { id: "P8", name: "Raze", avatar: "💥", number: 8 }
    ],
    r: 4,
    roles: ["Captain / IGL", "Entry Fragger", "Sniper", "Support"],
    teamCombinationsCount: 70,
    rolePermutationsCount: 1680,
    questionType: "roles",
    formulaTex: "ⁿPᵣ = ⁸P₄ = 8! / 4! = 8 × 7 × 6 × 5 = 1,680",
    hint1: "Because each player receives a distinct designated role, this is a permutation problem (⁸P₄).",
    hint2: "Calculate 8 × 7 × 6 × 5 = 1,680.",
    solutionDerivation: "⁸P₄ = 8! / (8 - 4)! = 8 × 7 × 6 × 5 = 1,680 unique competitive role assignments."
  },
  {
    id: 3,
    title: "Level 3: Tennis Doubles Pair (2 of 7 Candidates)",
    scenario: "A club must select a 2-player team for a doubles tennis championship from 7 candidates. In doubles tennis, both players share the court equally without distinct positional hierarchy. How many different pairings can be chosen?",
    candidatePool: [
      { id: "P1", name: "Roger", avatar: "🎾", number: 1 },
      { id: "P2", name: "Rafa", avatar: "🐂", number: 2 },
      { id: "P3", name: "Novak", avatar: "🐺", number: 3 },
      { id: "P4", name: "Andy", avatar: "🏴󠁧󠁢󠁳󠁣󠁴󠁿", number: 4 },
      { id: "P5", name: "Carlos", avatar: "🇪🇸", number: 5 },
      { id: "P6", name: "Jannik", avatar: "🦊", number: 6 },
      { id: "P7", name: "Daniil", avatar: "🐙", number: 7 }
    ],
    r: 2,
    roles: ["Partner 1", "Partner 2"],
    teamCombinationsCount: 21,
    rolePermutationsCount: 42,
    questionType: "team",
    formulaTex: "ⁿCᵣ = ⁷C₂ = (7 × 6) / 2 = 21",
    hint1: "In doubles, team membership is unranked; choosing {Roger, Rafa} is the same pair as {Rafa, Roger}.",
    hint2: "Calculate ⁷C₂ = (7 × 6) / (2 × 1) = 21.",
    solutionDerivation: "⁷C₂ = 7! / [2!(7 - 2)!] = (7 × 6) / 2 = 21 unique doubles pairs."
  },
  {
    id: 4,
    title: "Level 4: Football Captain & Vice-Captain (2 of 9 Players)",
    scenario: "A football coach needs to appoint 1 Team Captain and 1 Vice-Captain from 9 starting field players. In how many ways can these two distinct leadership roles be appointed?",
    candidatePool: [
      { id: "P1", name: "Messi", avatar: "🐐", number: 10 },
      { id: "P2", name: "Ronaldo", avatar: "⚡", number: 7 },
      { id: "P3", name: "Mbappé", avatar: "🚀", number: 9 },
      { id: "P4", name: "Haaland", avatar: "🤖", number: 9 },
      { id: "P5", name: "Modrić", avatar: "🪄", number: 10 },
      { id: "P6", name: "De Bruyne", avatar: "🎯", number: 17 },
      { id: "P7", name: "Van Dijk", avatar: "🧱", number: 4 },
      { id: "P8", name: "Bellingham", avatar: "🌟", number: 5 },
      { id: "P9", name: "Rodri", avatar: "⚓", number: 16 }
    ],
    r: 2,
    roles: ["Team Captain", "Vice-Captain"],
    teamCombinationsCount: 36,
    rolePermutationsCount: 72,
    questionType: "roles",
    formulaTex: "ⁿPᵣ = ⁹P₂ = 9 × 8 = 72",
    hint1: "Captain and Vice-Captain are distinct roles; order matters: ⁹P₂.",
    hint2: "Calculate 9 × 8 = 72.",
    solutionDerivation: "Captain: 9 choices. Vice-Captain: 8 remaining choices. 9 × 8 = 72 leadership appointments."
  },
  {
    id: 5,
    title: "Level 5: 4-Person Relay Squad & Leg Order (4 of 6 Sprinters)",
    scenario: "A track coach has 6 sprinters. (a) In how many ways can a 4-runner team be selected? (b) In how many ways can the 4 runners be assigned to the 4 relay legs: Lead-off, 2nd Leg, 3rd Leg, and Anchor?",
    candidatePool: [
      { id: "P1", name: "Bolt", avatar: "⚡", number: 1 },
      { id: "P2", name: "Blake", avatar: "🐯", number: 2 },
      { id: "P3", name: "Powell", avatar: "🚀", number: 3 },
      { id: "P4", name: "Gatlin", avatar: "🦅", number: 4 },
      { id: "P5", name: "Gay", avatar: "🐆", number: 5 },
      { id: "P6", name: "Lyles", avatar: "🏃", number: 6 }
    ],
    r: 4,
    roles: ["Lead-off Leg", "Second Leg", "Third Leg", "Anchor Leg"],
    teamCombinationsCount: 15,
    rolePermutationsCount: 360,
    questionType: "both",
    formulaTex: "Team = ⁶C₄ = 15  |  Legs = ⁶P₄ = ⁶C₄ × 4! = 15 × 24 = 360",
    hint1: "Team selection is ⁶C₄ = ⁶C₂ = 15. Leg assignment multiplies by 4! = 24.",
    hint2: "15 × 24 = 360.",
    solutionDerivation: "Team count: ⁶C₄ = 6! / (4! × 2!) = 15. Leg order count: ⁶P₄ = 6 × 5 × 4 × 3 = 360. Duality: 15 × 4! = 360."
  }
];

export const TournamentPlannerGame: React.FC = () => {
  const [levelIndex, setLevelIndex] = useState<number>(0);
  const [activeView, setActiveView] = useState<"team" | "roles">("team");
  const [userGuessTeam, setUserGuessTeam] = useState<string>("");
  const [userGuessRoles, setUserGuessRoles] = useState<string>("");
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [isCorrect, setIsCorrect] = useState<boolean>(false);
  const [revealedHintIndex, setRevealedHintIndex] = useState<number>(0);
  const [score, setScore] = useState<number>(0);
  const [streak, setStreak] = useState<number>(0);

  const level = TOURNAMENT_LEVELS[levelIndex];

  // Interactive selected squad
  const [selectedPlayers, setSelectedPlayers] = useState<string[]>([]);
  // Assigned roles map: role index -> player ID
  const [roleAssignments, setRoleAssignments] = useState<Record<number, string>>({});

  const handleTogglePlayerSelection = (pId: string) => {
    if (selectedPlayers.includes(pId)) {
      setSelectedPlayers(selectedPlayers.filter((id) => id !== pId));
      // Remove from role assignment if assigned
      const nextRoles = { ...roleAssignments };
      Object.keys(nextRoles).forEach((k) => {
        if (nextRoles[Number(k)] === pId) delete nextRoles[Number(k)];
      });
      setRoleAssignments(nextRoles);
    } else {
      if (selectedPlayers.length < level.r) {
        setSelectedPlayers([...selectedPlayers, pId]);
      }
    }
  };

  const handleAssignRole = (roleIdx: number, pId: string) => {
    setRoleAssignments((prev) => ({ ...prev, [roleIdx]: pId }));
  };

  const handleCheckAnswer = () => {
    if (submitted) return;
    let correct = false;

    if (level.questionType === "team") {
      correct = parseInt(userGuessTeam.trim(), 10) === level.teamCombinationsCount;
    } else if (level.questionType === "roles") {
      correct = parseInt(userGuessRoles.trim(), 10) === level.rolePermutationsCount;
    } else {
      const t = parseInt(userGuessTeam.trim(), 10);
      const r = parseInt(userGuessRoles.trim(), 10);
      correct = t === level.teamCombinationsCount && r === level.rolePermutationsCount;
    }

    setIsCorrect(correct);
    setSubmitted(true);

    if (correct) {
      const pts = 100 - revealedHintIndex * 20 + streak * 15;
      setScore((s) => s + Math.max(pts, 40));
      setStreak((st) => st + 1);
    } else {
      setStreak(0);
    }
  };

  const handleNextLevel = () => {
    const next = (levelIndex + 1) % TOURNAMENT_LEVELS.length;
    setLevelIndex(next);
    setSelectedPlayers([]);
    setRoleAssignments({});
    setUserGuessTeam("");
    setUserGuessRoles("");
    setSubmitted(false);
    setIsCorrect(false);
    setRevealedHintIndex(0);
  };

  const handleResetLevel = () => {
    setSelectedPlayers([]);
    setRoleAssignments({});
    setUserGuessTeam("");
    setUserGuessRoles("");
    setSubmitted(false);
    setIsCorrect(false);
    setRevealedHintIndex(0);
  };

  return (
    <div className="space-y-6">
      {/* 1-5. Full Academic Foundations & 5 Worked Examples */}
      <GameAcademicPanel data={TOURNAMENT_PLANNER_THEORY} />

      {/* 6-9. Animated Demonstration, Interactive Challenge & Scoring */}
      <div className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-sm overflow-hidden p-6 space-y-6">
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-700">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-indigo-600 dark:text-indigo-400">
              <Users className="w-4 h-4" />
              <span>GAME 5 · TOURNAMENT TEAM &amp; ROLE PLANNER</span>
            </div>
            <h2 className="text-xl font-extrabold text-slate-900 dark:text-white mt-0.5">
              {level.title}
            </h2>
          </div>

          <div className="flex items-center gap-4 text-xs font-semibold">
            <div className="px-3 py-1.5 rounded-lg bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800 flex items-center gap-1.5">
              <Trophy className="w-3.5 h-3.5" />
              <span>Score: {score}</span>
            </div>
            <div className="px-3 py-1.5 rounded-lg bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Streak: {streak}</span>
            </div>
            <div className="text-slate-500">
              Level {levelIndex + 1}/{TOURNAMENT_LEVELS.length}
            </div>
          </div>
        </div>

        {/* Level Scenario */}
        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-700 text-sm leading-relaxed text-slate-800 dark:text-slate-200">
          <span className="font-bold text-slate-900 dark:text-white">Scenario: </span>
          {level.scenario}
        </div>

        {/* 6. Animated Demonstration: Two Visual Perspectives (Team Selection vs Role Assignment) */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setActiveView("team")}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                  activeView === "team"
                    ? "bg-indigo-600 text-white shadow-sm"
                    : "bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300"
                }`}
              >
                View A: Team Selection (ⁿCᵣ - Unranked Squad)
              </button>
              <button
                onClick={() => setActiveView("roles")}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                  activeView === "roles"
                    ? "bg-indigo-600 text-white shadow-sm"
                    : "bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300"
                }`}
              >
                View B: Positional Roles (ⁿPᵣ = ⁿCᵣ × r!)
              </button>
            </div>

            <span className="text-xs text-slate-500">
              Selected: {selectedPlayers.length}/{level.r}
            </span>
          </div>

          {/* Player Roster Cards */}
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-700 space-y-3">
            <div className="text-xs font-bold text-slate-700 dark:text-slate-300">
              Candidate Pool (n = {level.candidatePool.length} athletes): Click to select into your team
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
              {level.candidatePool.map((p) => {
                const isSelected = selectedPlayers.includes(p.id);
                return (
                  <button
                    key={p.id}
                    onClick={() => handleTogglePlayerSelection(p.id)}
                    className={`p-3 rounded-xl border text-center transition-all transform hover:-translate-y-0.5 ${
                      isSelected
                        ? "bg-indigo-600 text-white border-indigo-600 shadow-md ring-2 ring-indigo-300 dark:ring-indigo-900"
                        : "bg-white dark:bg-slate-800 text-slate-900 dark:text-white border-slate-200 dark:border-slate-700 hover:border-indigo-400"
                    }`}
                  >
                    <span className="text-2xl block mb-1">{p.avatar}</span>
                    <div className="text-xs font-bold truncate">{p.name}</div>
                    <div className={`text-[10px] ${isSelected ? "text-indigo-200" : "text-slate-400"}`}>
                      #{p.number}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Active View Display: Team Dugout vs Podiums */}
          {activeView === "team" ? (
            <div className="p-5 rounded-xl border-2 border-dashed border-indigo-300 dark:border-indigo-800 bg-indigo-50/20 dark:bg-indigo-950/20 space-y-3">
              <div className="text-xs font-bold text-indigo-900 dark:text-indigo-300 flex items-center justify-between">
                <span>Unordered Team Squad Bench (Combinations: ⁿCᵣ)</span>
                <span className="text-[11px] text-indigo-600 dark:text-indigo-400">
                  Total possible squads: <strong>{level.teamCombinationsCount}</strong>
                </span>
              </div>

              <div className="min-h-[90px] flex flex-wrap items-center gap-3 p-3 rounded-lg bg-white/70 dark:bg-slate-900/60 border border-indigo-100 dark:border-indigo-900/40">
                {selectedPlayers.length === 0 ? (
                  <div className="w-full text-center py-4 text-xs text-slate-400 italic">
                    Click players above to draft your team of {level.r} athletes.
                  </div>
                ) : (
                  selectedPlayers.map((pId) => {
                    const p = level.candidatePool.find((x) => x.id === pId);
                    return (
                      <div
                        key={pId}
                        className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-indigo-600 text-white text-xs font-bold shadow-sm"
                      >
                        <span>{p?.avatar}</span>
                        <span>{p?.name}</span>
                        <span className="text-[10px] opacity-75">#{p?.number}</span>
                      </div>
                    );
                  })
                )}
              </div>

              <div className="text-[11px] text-slate-500">
                In this view, the order of players does not alter the squad. Selecting player A then B gives the exact same squad as B then A.
              </div>
            </div>
          ) : (
            <div className="p-5 rounded-xl border-2 border-indigo-400/80 dark:border-indigo-700 bg-indigo-50/30 dark:bg-indigo-950/30 space-y-3">
              <div className="text-xs font-bold text-indigo-900 dark:text-indigo-300 flex items-center justify-between">
                <span>Distinct Positional Roles (Permutations: ⁿPᵣ = ⁿCᵣ × r!)</span>
                <span className="text-[11px] text-indigo-600 dark:text-indigo-400">
                  Total role lineups: <strong>{level.rolePermutationsCount}</strong>
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {level.roles.map((roleName, rIdx) => {
                  const assignedPId = roleAssignments[rIdx];
                  const assignedP = level.candidatePool.find((x) => x.id === assignedPId);
                  return (
                    <div
                      key={rIdx}
                      className="p-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-center space-y-2 shadow-sm"
                    >
                      <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 block">
                        Position {rIdx + 1}
                      </span>
                      <div className="text-xs font-black text-slate-900 dark:text-white">
                        {roleName}
                      </div>

                      <div className="p-2 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 min-h-[46px] flex items-center justify-center">
                        {assignedP ? (
                          <div className="text-xs font-bold text-indigo-600 dark:text-indigo-400 flex items-center gap-1">
                            <span>{assignedP.avatar}</span>
                            <span>{assignedP.name}</span>
                          </div>
                        ) : (
                          <span className="text-[10px] text-slate-400 italic">Unassigned</span>
                        )}
                      </div>

                      {/* Dropdown / assignment buttons */}
                      <select
                        value={assignedPId || ""}
                        onChange={(e) => handleAssignRole(rIdx, e.target.value)}
                        className="w-full text-[11px] p-1 rounded bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-200 focus:outline-none"
                      >
                        <option value="">Assign Player</option>
                        {selectedPlayers.map((pId) => {
                          const p = level.candidatePool.find((x) => x.id === pId);
                          return (
                            <option key={pId} value={pId}>
                              {p?.name} (#{p?.number})
                            </option>
                          );
                        })}
                      </select>
                    </div>
                  );
                })}
              </div>

              <div className="text-[11px] text-slate-500">
                Notice that every 1 team combination creates {level.r}! ={" "}
                {level.r === 2 ? 2 : level.r === 3 ? 6 : 24} distinct role assignments!
              </div>
            </div>
          )}
        </div>

        {/* 7. Interactive Challenge: Mathematical Calculation Input */}
        <div className="p-4 rounded-xl border border-indigo-200 dark:border-indigo-900/60 bg-indigo-50/40 dark:bg-indigo-950/20 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-700 dark:text-indigo-300 block">
                7. Calculate Combinations vs. Permutations
              </span>
              <span className="text-sm font-semibold text-slate-900 dark:text-white">
                Enter the mathematically verified counts for this tournament scenario:
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              {(level.questionType === "team" || level.questionType === "both") && (
                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-semibold text-slate-600 dark:text-slate-300">
                    Team (ⁿCᵣ):
                  </span>
                  <input
                    type="number"
                    placeholder="Teams..."
                    value={userGuessTeam}
                    onChange={(e) => setUserGuessTeam(e.target.value)}
                    disabled={submitted && isCorrect}
                    className="w-24 px-2.5 py-1.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 font-mono text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              )}

              {(level.questionType === "roles" || level.questionType === "both") && (
                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-semibold text-slate-600 dark:text-slate-300">
                    Roles (ⁿPᵣ):
                  </span>
                  <input
                    type="number"
                    placeholder="Roles..."
                    value={userGuessRoles}
                    onChange={(e) => setUserGuessRoles(e.target.value)}
                    disabled={submitted && isCorrect}
                    className="w-28 px-2.5 py-1.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 font-mono text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              )}

              <button
                onClick={handleCheckAnswer}
                disabled={submitted && isCorrect}
                className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs transition-colors shadow-sm disabled:opacity-50"
              >
                Check Answer
              </button>
            </div>
          </div>

          {/* Feedback & Result */}
          {submitted && (
            <div
              className={`p-3.5 rounded-lg border flex items-start gap-3 ${
                isCorrect
                  ? "bg-emerald-50 dark:bg-emerald-950/40 border-emerald-300 dark:border-emerald-800 text-emerald-900 dark:text-emerald-200"
                  : "bg-rose-50 dark:bg-rose-950/40 border-rose-300 dark:border-rose-800 text-rose-900 dark:text-rose-200"
              }`}
            >
              {isCorrect ? (
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              ) : (
                <XCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
              )}
              <div className="space-y-1 text-xs">
                <div className="font-bold">
                  {isCorrect
                    ? "Correct! Team vs. Role Duality Confirmed."
                    : "Incorrect Calculation. Review the relation between combinations and permutations below."}
                </div>
                <div className="font-mono text-indigo-700 dark:text-indigo-300 font-semibold">
                  Applied Formula: {level.formulaTex}
                </div>
                <div>{level.solutionDerivation}</div>
              </div>
            </div>
          )}

          {/* 8. Hints & Progressive Solution Controls */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-indigo-100 dark:border-indigo-900/40 text-xs">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setRevealedHintIndex((p) => Math.min(p + 1, 2))}
                disabled={revealedHintIndex >= 2}
                className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 text-slate-700 dark:text-slate-200 font-medium transition-colors disabled:opacity-50"
              >
                <HelpCircle className="w-3.5 h-3.5" />
                <span>
                  {revealedHintIndex === 0
                    ? "Get Hint (0/2)"
                    : `Next Hint (${revealedHintIndex}/2)`}
                </span>
              </button>
              <button
                onClick={handleResetLevel}
                className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset</span>
              </button>
            </div>

            {submitted && isCorrect && (
              <button
                onClick={handleNextLevel}
                className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs transition-colors shadow-sm"
              >
                <span>Next Level ({levelIndex + 2 <= TOURNAMENT_LEVELS.length ? levelIndex + 2 : 1})</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Hint Card */}
          {revealedHintIndex > 0 && (
            <div className="p-3 rounded-lg bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900 text-xs text-amber-900 dark:text-amber-200 space-y-1">
              <span className="font-bold">Progressive Hint:</span>
              <p>{revealedHintIndex === 1 ? level.hint1 : level.hint2}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
