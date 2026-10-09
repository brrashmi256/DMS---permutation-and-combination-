import React, { useState, useEffect } from "react";
import { DANCER_CHARACTERS, DancerCharacter } from "../../data/gamesData";
import { Play, Pause, RotateCcw, Shuffle, Sparkles, ChevronRight, CheckCircle2, Trophy, HelpCircle, Activity } from "lucide-react";

export type FormationType = "line" | "v_shape" | "two_row" | "circle" | "front_back";
export type StudioLevel = 1 | 2 | 3 | 4 | 5;

// Dancer Component rendering detailed SVG with articulated limbs
const IllustratedDancer: React.FC<{
  dancer: DancerCharacter;
  x: number;
  y: number;
  isDancing: boolean;
  isSpotlight: boolean;
  isDimmed: boolean;
  dancePhase: number;
  label?: string;
  onClick?: () => void;
}> = ({ dancer, x, y, isDancing, isSpotlight, isDimmed, dancePhase, label, onClick }) => {
  // Compute limb angles based on dancing phase
  const armAngleLeft = isDancing ? Math.sin(dancePhase + dancer.id * 0.7) * 28 : -10;
  const armAngleRight = isDancing ? -Math.sin(dancePhase + dancer.id * 0.7) * 28 : 10;
  const legOffsetLeft = isDancing ? Math.sin(dancePhase * 1.5 + dancer.id) * 6 : 0;
  const legOffsetRight = isDancing ? -Math.sin(dancePhase * 1.5 + dancer.id) * 6 : 0;
  const headBob = isDancing ? Math.sin(dancePhase * 2 + dancer.id) * 2 : 0;

  return (
    <g
      transform={`translate(${x}, ${y})`}
      className={`cursor-pointer transition-all duration-700 ease-out select-none ${
        isDimmed ? "opacity-30 scale-90" : isSpotlight ? "opacity-100 scale-105" : "opacity-95"
      }`}
      onClick={onClick}
    >
      {/* Spotlight Glow if selected */}
      {isSpotlight && (
        <ellipse cx="0" cy="52" rx="30" ry="10" fill="#FDE047" opacity="0.35" className="animate-pulse" />
      )}

      {/* Shadow */}
      <ellipse cx="0" cy="50" rx="18" ry="5" fill="#0F172A" opacity="0.4" />

      {/* DANCER SVG BODY WITH ARTICULATED MOVING LIMBS */}
      <g transform={`translate(0, ${headBob})`}>
        {/* Left Leg */}
        <line
          x1="-6"
          y1="22"
          x2={-8 + legOffsetLeft}
          y2={48 + Math.abs(legOffsetLeft)}
          stroke="#1E293B"
          strokeWidth="4"
          strokeLinecap="round"
        />
        {/* Left Shoe */}
        <ellipse cx={-10 + legOffsetLeft} cy={49} rx="5" ry="3" fill="#0F172A" />

        {/* Right Leg */}
        <line
          x1="6"
          y1="22"
          x2={8 + legOffsetRight}
          y2={48 + Math.abs(legOffsetRight)}
          stroke="#1E293B"
          strokeWidth="4"
          strokeLinecap="round"
        />
        {/* Right Shoe */}
        <ellipse cx={10 + legOffsetRight} cy={49} rx="5" ry="3" fill="#0F172A" />

        {/* Torso & Costume */}
        <path
          d="M -10 2 Q 0 -2 10 2 L 8 24 L -8 24 Z"
          fill={dancer.costume}
          stroke="#0F172A"
          strokeWidth="1.5"
        />

        {/* Left Arm (Moving) */}
        <g transform={`translate(-10, 5) rotate(${armAngleLeft})`}>
          <line x1="0" y1="0" x2="-8" y2="18" stroke={dancer.costume} strokeWidth="3.5" strokeLinecap="round" />
          {/* Hand */}
          <circle cx="-9" cy="20" r="3" fill="#FBCFE8" />
        </g>

        {/* Right Arm (Moving) */}
        <g transform={`translate(10, 5) rotate(${armAngleRight})`}>
          <line x1="0" y1="0" x2="8" y2="18" stroke={dancer.costume} strokeWidth="3.5" strokeLinecap="round" />
          {/* Hand */}
          <circle cx="9" cy="20" r="3" fill="#FBCFE8" />
        </g>

        {/* Neck */}
        <rect x="-3" y="-5" width="6" height="5" fill="#FBCFE8" />

        {/* Head */}
        <circle cx="0" cy="-14" r="9" fill="#FBCFE8" stroke="#0F172A" strokeWidth="1" />

        {/* Hair */}
        <path
          d="M -9 -16 Q 0 -25 9 -16 Q 9 -10 6 -8 Q 0 -10 -6 -8 Z"
          fill={dancer.hairColor}
        />

        {/* Eyes & Smile */}
        <circle cx="-3" cy="-14" r="1.2" fill="#0F172A" />
        <circle cx="3" cy="-14" r="1.2" fill="#0F172A" />
        <path d="M -3 -11 Q 0 -8 3 -11" stroke="#0F172A" strokeWidth="1" fill="none" />
      </g>

      {/* Name / Role Label Banner */}
      <g transform="translate(0, 64)">
        <rect
          x="-24"
          y="-8"
          width="48"
          height="16"
          rx="4"
          fill="#1E293B"
          opacity="0.85"
        />
        <text
          x="0"
          y="3"
          textAnchor="middle"
          fill="#FFFFFF"
          fontSize="9"
          fontWeight="bold"
          fontFamily="sans-serif"
        >
          {label || dancer.name}
        </text>
      </g>
    </g>
  );
};

export const DanceStudioGame: React.FC = () => {
  const [level, setLevel] = useState<StudioLevel>(1);
  const [numDancers, setNumDancers] = useState<number>(6);
  const [formation, setFormation] = useState<FormationType>("line");
  const [isDancing, setIsDancing] = useState<boolean>(true);
  const [dancePhase, setDancePhase] = useState<number>(0);
  const [speedMultiplier, setSpeedMultiplier] = useState<number>(1); // 1 = Normal, 0.5 = Slow-motion
  const [circleRotationDeg, setCircleRotationDeg] = useState<number>(0);

  // Level 2: Team Selection state
  const [selectedTeam, setSelectedTeam] = useState<number[]>([1, 2, 3]);

  // Level 3: Position Assignment state
  const [assignedRoles, setAssignedRoles] = useState<{ center: number; left: number; right: number }>({
    center: 1,
    left: 2,
    right: 3
  });

  // Level 5: Formation Challenge state
  const [challengeQuestionIdx, setChallengeQuestionIdx] = useState<number>(0);
  const [userChallengeAnswer, setUserChallengeAnswer] = useState<string>("");
  const [challengeFeedback, setChallengeFeedback] = useState<"idle" | "correct" | "incorrect">("idle");
  const [challengeScore, setChallengeScore] = useState<number>(0);

  // Animation heartbeat loop
  useEffect(() => {
    let animId: number;
    let lastTime = performance.now();

    const loop = (time: number) => {
      const dt = (time - lastTime) / 1000;
      lastTime = time;

      if (isDancing) {
        setDancePhase((prev) => prev + dt * 4 * speedMultiplier);
      }
      animId = requestAnimationFrame(loop);
    };

    animId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animId);
  }, [isDancing, speedMultiplier]);

  // Calculate coordinates for all active dancers based on selected formation
  const activeDancers = DANCER_CHARACTERS.slice(0, numDancers);

  const getDancerPosition = (index: number, total: number): { x: number; y: number } => {
    const stageWidth = 720;
    const stageHeight = 360;
    const centerX = stageWidth / 2;
    const centerY = stageHeight / 2 + 20;

    switch (formation) {
      case "line": {
        const spacing = Math.min(65, (stageWidth - 140) / Math.max(1, total - 1));
        const startX = centerX - ((total - 1) * spacing) / 2;
        return { x: startX + index * spacing, y: centerY + 15 };
      }
      case "v_shape": {
        const mid = (total - 1) / 2;
        const spacingX = 55;
        const diff = Math.abs(index - mid);
        const x = centerX + (index - mid) * spacingX;
        const y = centerY - 50 + diff * 35;
        return { x, y };
      }
      case "two_row": {
        const half = Math.ceil(total / 2);
        const isBackRow = index >= half;
        const col = isBackRow ? index - half : index;
        const rowCount = isBackRow ? total - half : half;
        const spacingX = 65;
        const startX = centerX - ((rowCount - 1) * spacingX) / 2;
        return {
          x: startX + col * spacingX,
          y: isBackRow ? centerY - 40 : centerY + 40
        };
      }
      case "circle": {
        const radius = Math.min(130, 70 + total * 8);
        const baseAngle = (index / total) * 2 * Math.PI - Math.PI / 2;
        const rad = baseAngle + (circleRotationDeg * Math.PI) / 180;
        return {
          x: centerX + Math.cos(rad) * radius,
          y: centerY + Math.sin(rad) * radius * 0.75
        };
      }
      case "front_back": {
        if (index === 0) return { x: centerX, y: centerY - 50 }; // Soloist center front
        const remaining = total - 1;
        const spacing = 60;
        const startX = centerX - ((remaining - 1) * spacing) / 2;
        return { x: startX + (index - 1) * spacing, y: centerY + 45 };
      }
    }
  };

  // Math metrics for each level
  const factorialWays = Array.from({ length: numDancers }, (_, i) => i + 1).reduce((a, b) => a * b, 1);
  const circularWays = Array.from({ length: Math.max(1, numDancers - 1) }, (_, i) => i + 1).reduce((a, b) => a * b, 1);

  // Level 5 Challenges
  const CHALLENGES = [
    {
      prompt: "A dance director must arrange 5 dancers in a single straight line. How many distinct line formations can be created?",
      answer: "120",
      formula: "5! = 120",
      type: "Factorial (5!)"
    },
    {
      prompt: "From a dance troupe of 8 performers, the choreographer must choose a featured team of 3 dancers for a solo routine. In how many ways can this team be selected?",
      answer: "56",
      formula: "8C3 = (8 × 7 × 6) / 6 = 56",
      type: "Combination (8C3)"
    },
    {
      prompt: "From 6 dancers, the director must assign one dancer to the Center Spotlight, one to Stage Left, and one to Stage Right. How many role assignments are possible?",
      answer: "120",
      formula: "6P3 = 6 × 5 × 4 = 120",
      type: "Permutation (6P3)"
    },
    {
      prompt: "Seven dancers join hands to perform a round folk dance in a circle. In how many ways can they be arranged around the circle (rotations equivalent)?",
      answer: "720",
      formula: "(7 - 1)! = 6! = 720",
      type: "Circular Permutation ((7-1)!)"
    }
  ];

  const currentChallenge = CHALLENGES[challengeQuestionIdx];

  const handleCheckChallenge = () => {
    const isCorr = userChallengeAnswer.trim() === currentChallenge.answer;
    if (isCorr) {
      setChallengeFeedback("correct");
      setChallengeScore((s) => s + 25);
    } else {
      setChallengeFeedback("incorrect");
    }
  };

  const handleNextChallenge = () => {
    setChallengeQuestionIdx((prev) => (prev + 1) % CHALLENGES.length);
    setUserChallengeAnswer("");
    setChallengeFeedback("idle");
  };

  // Rotate circle animation
  const handleRotateCircle = () => {
    setCircleRotationDeg((prev) => prev + (360 / numDancers));
  };

  return (
    <div className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 space-y-6 shadow-sm">
      {/* Studio Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-700">
        <div>
          <div className="text-xs font-bold text-indigo-600 dark:text-indigo-400 flex items-center gap-1.5">
            <Activity className="w-4 h-4 text-pink-500" />
            <span>GAME 6: VIRTUAL DANCE FORMATION STUDIO</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mt-0.5">
            Animated Choreography Stage &amp; Visual Combinatorics
          </h2>
        </div>

        {/* Level Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
          {[
            { lvl: 1, label: "Lvl 1: Line (n!)" },
            { lvl: 2, label: "Lvl 2: Team (nCr)" },
            { lvl: 3, label: "Lvl 3: Roles (nPr)" },
            { lvl: 4, label: "Lvl 4: Circle (n-1)!" },
            { lvl: 5, label: "Lvl 5: Challenge" }
          ].map((l) => (
            <button
              key={l.lvl}
              onClick={() => {
                setLevel(l.lvl as StudioLevel);
                if (l.lvl === 4) setFormation("circle");
                else if (l.lvl === 1) setFormation("line");
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${
                level === l.lvl
                  ? "bg-indigo-600 text-white shadow-xs"
                  : "bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-200"
              }`}
            >
              {l.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main Stage Canvas: Articulated Illustrated Dancers in SVG */}
      <div className="relative rounded-2xl bg-gradient-to-b from-slate-950 via-indigo-950/80 to-slate-900 border border-slate-800 overflow-hidden shadow-2xl">
        {/* Overhead Stage Lighting Beam Effect */}
        <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-indigo-500/10 via-pink-500/5 to-transparent pointer-events-none" />

        {/* Stage Flooring Grid Lines */}
        <div className="absolute inset-x-0 bottom-0 h-28 border-t border-slate-800/80 bg-slate-950/60 pointer-events-none flex justify-around">
          {[1, 2, 3, 4, 5, 6].map((gridLine) => (
            <div key={gridLine} className="w-px h-full bg-slate-800/30" />
          ))}
        </div>

        {/* SVG Dance Floor */}
        <svg
          viewBox="0 0 720 360"
          className="w-full h-auto min-h-[300px] sm:min-h-[380px] select-none"
        >
          {/* Stage Center Marker */}
          <circle cx="360" cy="200" r="160" fill="none" stroke="#334155" strokeWidth="1" strokeDasharray="4 6" opacity="0.4" />
          <circle cx="360" cy="200" r="4" fill="#64748B" opacity="0.6" />

          {/* Render All Active Dancers with Animated Limbs */}
          {activeDancers.map((dancer, idx) => {
            const pos = getDancerPosition(idx, numDancers);

            let isSpotlight = false;
            let isDimmed = false;
            let customLabel = dancer.name;

            if (level === 2) {
              isSpotlight = selectedTeam.includes(dancer.id);
              isDimmed = !isSpotlight;
              customLabel = isSpotlight ? "Team ★" : "Reserve";
            } else if (level === 3) {
              if (assignedRoles.center === dancer.id) {
                isSpotlight = true;
                customLabel = "Center";
              } else if (assignedRoles.left === dancer.id) {
                isSpotlight = true;
                customLabel = "Left";
              } else if (assignedRoles.right === dancer.id) {
                isSpotlight = true;
                customLabel = "Right";
              } else {
                isDimmed = true;
                customLabel = "Ensemble";
              }
            }

            return (
              <IllustratedDancer
                key={dancer.id}
                dancer={dancer}
                x={pos.x}
                y={pos.y}
                isDancing={isDancing}
                isSpotlight={isSpotlight}
                isDimmed={isDimmed}
                dancePhase={dancePhase}
                label={customLabel}
                onClick={() => {
                  if (level === 2) {
                    if (selectedTeam.includes(dancer.id)) {
                      setSelectedTeam(selectedTeam.filter((id) => id !== dancer.id));
                    } else if (selectedTeam.length < 3) {
                      setSelectedTeam([...selectedTeam, dancer.id]);
                    }
                  } else if (level === 3) {
                    // Cycle dancer role
                    if (assignedRoles.center === dancer.id) {
                      setAssignedRoles({ ...assignedRoles, center: assignedRoles.left, left: dancer.id });
                    } else {
                      setAssignedRoles({ ...assignedRoles, center: dancer.id });
                    }
                  }
                }}
              />
            );
          })}
        </svg>

        {/* Stage Status Overlay Bar */}
        <div className="p-3.5 bg-slate-900/90 backdrop-blur border-t border-slate-800 text-xs text-slate-300 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <span className="font-semibold text-white">Active Stage Setup:</span>
            <span className="font-mono text-indigo-400">{numDancers} Dancers</span>
            <span className="text-slate-500">·</span>
            <span className="text-pink-400 capitalize">{formation.replace("_", " ")} Formation</span>
          </div>

          <div className="flex items-center gap-2">
            {formation === "circle" && (
              <button
                onClick={handleRotateCircle}
                className="px-2.5 py-1 rounded bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-[11px] transition-colors"
                title="Rotate the whole circle to prove equivalence"
              >
                Rotate Circle Formation ↺
              </button>
            )}
            <span className="text-slate-400 font-mono text-[11px]">
              Status: {isDancing ? "Performing Live" : "Paused"}
            </span>
          </div>
        </div>
      </div>

      {/* Choreography Controls Deck */}
      <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          {/* Dancer Count Selector (3 to 10 Dancers) */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">
              Dancers Count (3–10):
            </span>
            <div className="flex items-center gap-1">
              {[3, 4, 5, 6, 7, 8, 9, 10].map((count) => (
                <button
                  key={count}
                  onClick={() => setNumDancers(count)}
                  className={`w-7 h-7 rounded text-xs font-mono font-bold transition-all ${
                    numDancers === count
                      ? "bg-indigo-600 text-white"
                      : "bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100"
                  }`}
                >
                  {count}
                </button>
              ))}
            </div>
          </div>

          {/* Formations Selector */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">
              Stage Formation:
            </span>
            <div className="flex items-center gap-1">
              {[
                { id: "line", label: "Straight Line" },
                { id: "v_shape", label: "V-Shape" },
                { id: "two_row", label: "Two-Row" },
                { id: "circle", label: "Circle" },
                { id: "front_back", label: "Front/Back" }
              ].map((f) => (
                <button
                  key={f.id}
                  onClick={() => setFormation(f.id as FormationType)}
                  className={`px-2.5 py-1 rounded text-xs font-medium transition-all ${
                    formation === f.id
                      ? "bg-indigo-600 text-white"
                      : "bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100"
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>

          {/* Playback Controls */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsDancing(!isDancing)}
              className="p-2 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-100"
              title={isDancing ? "Pause Limb Movement" : "Play Limb Movement"}
            >
              {isDancing ? <Pause className="w-4 h-4 text-amber-500" /> : <Play className="w-4 h-4 text-emerald-500" />}
            </button>

            <button
              onClick={() => setSpeedMultiplier((s) => (s === 1 ? 0.4 : 1))}
              className={`px-2.5 py-1.5 rounded-lg border text-xs font-semibold ${
                speedMultiplier < 1
                  ? "bg-pink-100 dark:bg-pink-950 border-pink-400 text-pink-700 dark:text-pink-300"
                  : "bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300"
              }`}
            >
              {speedMultiplier < 1 ? "Slow-Mo ON" : "1x Normal"}
            </button>

            <button
              onClick={() => setCircleRotationDeg((r) => r + 45)}
              className="p-2 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-100"
              title="Shuffle Positions"
            >
              <Shuffle className="w-4 h-4 text-indigo-500" />
            </button>
          </div>
        </div>
      </div>

      {/* Educational Concept Deck Corresponding to Active Level */}
      {level === 1 && (
        <div className="p-5 rounded-xl bg-indigo-50/70 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-800 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-900 dark:text-indigo-300">
              Level 1: Linear Stage Arrangements (Factorial n!)
            </span>
            <span className="font-mono text-base font-bold text-indigo-600 dark:text-indigo-400">
              {factorialWays.toLocaleString()} Possible Lineups
            </span>
          </div>
          <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
            When all <strong>{numDancers} dancers</strong> line up across the stage, the first spot has {numDancers} choices,
            the second has {numDancers - 1}, and so on. Total distinct stage orderings:{" "}
            <span className="font-mono font-bold text-indigo-600 dark:text-indigo-400">
              {numDancers}! = {factorialWays.toLocaleString()}
            </span>.
          </p>
        </div>
      )}

      {level === 2 && (
        <div className="p-5 rounded-xl bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-900 dark:text-emerald-300">
              Level 2: Team Selection ({numDancers}C3 Combinations)
            </span>
            <span className="font-mono text-base font-bold text-emerald-600 dark:text-emerald-400">
              Selected: {selectedTeam.length} / 3 dancers
            </span>
          </div>
          <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
            Click any dancer on stage to add/remove them from the highlighted spotlight trio.
            Because the 3 dancers share the spotlight equally without distinct ranks, order does NOT matter.
            Total ways to select a 3-person team from {numDancers}:{" "}
            <span className="font-mono font-bold text-emerald-600 dark:text-emerald-400">
              \binom{`{${numDancers}}`}{`{3}`} = {Math.round((numDancers * (numDancers - 1) * (numDancers - 2)) / 6)} teams
            </span>.
          </p>
        </div>
      )}

      {level === 3 && (
        <div className="p-5 rounded-xl bg-purple-50/70 dark:bg-purple-950/30 border border-purple-200 dark:border-purple-800 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-purple-900 dark:text-purple-300">
              Level 3: Distinct Role Assignment (Permutation {numDancers}P3)
            </span>
            <span className="font-mono text-base font-bold text-purple-600 dark:text-purple-400">
              {numDancers * (numDancers - 1) * (numDancers - 2)} Permutations
            </span>
          </div>
          <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
            Click on dancers to cycle roles between <strong>Center Soloist</strong>, <strong>Stage Left</strong>, and <strong>Stage Right</strong>.
            Because Center is distinct from Left or Right, ORDER MATTERS.
            Total ways to assign these 3 distinct choreography roles from {numDancers} dancers:{" "}
            <span className="font-mono font-bold text-purple-600 dark:text-purple-400">
              {numDancers}P3 = {numDancers} × {numDancers - 1} × {numDancers - 2} = {numDancers * (numDancers - 1) * (numDancers - 2)}
            </span>.
          </p>
        </div>
      )}

      {level === 4 && (
        <div className="p-5 rounded-xl bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-900 dark:text-amber-300">
              Level 4: Circular Dance Formation ((n-1)!)
            </span>
            <span className="font-mono text-base font-bold text-amber-600 dark:text-amber-400">
              ({numDancers} - 1)! = {circularWays.toLocaleString()} Circular Arrangements
            </span>
          </div>
          <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
            Click <strong>"Rotate Circle Formation"</strong> above. Notice that everyone's left-hand and right-hand neighbours remain exactly the same!
            Because rotating the entire table creates identical relative positions, we divide by {numDancers}:{" "}
            <span className="font-mono font-bold text-amber-600 dark:text-amber-400">
              {numDancers}! / {numDancers} = ({numDancers} - 1)! = {circularWays.toLocaleString()}
            </span>.
          </p>
        </div>
      )}

      {level === 5 && (
        <div className="p-6 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
              Level 5: Real-World Choreography Challenge
            </span>
            <span className="font-mono text-xs font-bold text-emerald-600 dark:text-emerald-400">
              Challenge Score: {challengeScore}
            </span>
          </div>

          <div className="space-y-2">
            <p className="text-sm font-semibold text-slate-900 dark:text-white leading-relaxed">
              {currentChallenge.prompt}
            </p>
            <div className="text-xs text-slate-500">
              Method type: {currentChallenge.type}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <input
              type="text"
              placeholder="Enter numerical answer..."
              value={userChallengeAnswer}
              onChange={(e) => setUserChallengeAnswer(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleCheckChallenge();
              }}
              className="w-full sm:w-64 px-4 py-2 rounded-lg bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-sm font-mono text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <button
              onClick={handleCheckChallenge}
              className="px-5 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs transition-colors shadow-xs"
            >
              Check Answer
            </button>
          </div>

          {challengeFeedback === "correct" && (
            <div className="p-3.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-300 text-xs text-emerald-800 dark:text-emerald-300 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Correct! Formula: {currentChallenge.formula}</span>
              </div>
              <button
                onClick={handleNextChallenge}
                className="px-3 py-1 rounded bg-slate-900 text-white dark:bg-white dark:text-slate-900 font-bold text-[11px]"
              >
                Next Challenge →
              </button>
            </div>
          )}

          {challengeFeedback === "incorrect" && (
            <div className="p-3.5 rounded-lg bg-rose-50 dark:bg-rose-950/30 border border-rose-300 text-xs text-rose-800 dark:text-rose-300">
              Incorrect calculation. Recall whether the problem involves linear order, selection, or circular symmetry!
            </div>
          )}
        </div>
      )}
    </div>
  );
};
