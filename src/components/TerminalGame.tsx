"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { RotateCcw } from "lucide-react";

// ─── Guess The Number ───────────────────────────────────────────────────────
// A fake-terminal mini game. Styled to look like a terminal but built with
// plain React state + the site's own theme tokens so it blends into the page
// in both light and dark mode. No terminal-emulator libraries involved.

const MONO_STACK =
  '"Courier New", Courier, "Lucida Sans Typewriter", "Lucida Console", monospace';

type LineType = "system" | "guess" | "hint" | "correct" | "error";

type Line = { id: number; text: string; type: LineType };

// Each line type maps to a color that stays on-theme in both light and dark
// mode, mirroring the `rich` cues from the original Python CLI: amber for the
// higher/lower hints, green for success, red for errors, neutral grays for the
// rest — so it reads like a terminal without leaving the site's palette.
const LINE_CLASS: Record<LineType, string> = {
  system: "text-gray-500 dark:text-gray-500",
  guess: "text-gray-700 dark:text-gray-300",
  hint: "text-amber-600 dark:text-amber-400",
  correct: "text-green-600 dark:text-green-500",
  error: "text-red-600 dark:text-red-400",
};

type Phase = "playing" | "replay";

const randomTarget = () => Math.floor(Math.random() * 100) + 1;

const INTRO: Omit<Line, "id">[] = [
  { text: "Guess a number between 1 and 100.", type: "system" },
];

export function TerminalGame() {
  // The intro lines are static, so they render identically on the server and
  // client (no hydration mismatch). The random target is game state that never
  // touches the DOM, so seeding it at init is safe too.
  const [lines, setLines] = useState<Line[]>(() =>
    INTRO.map((line, i) => ({ ...line, id: i }))
  );
  const [value, setValue] = useState("");
  const [target, setTarget] = useState(randomTarget);
  const [guesses, setGuesses] = useState(0);
  const [phase, setPhase] = useState<Phase>("playing");

  const idRef = useRef(INTRO.length);
  const outputRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const pushLines = useCallback((items: Omit<Line, "id">[]) => {
    setLines((prev) => [
      ...prev,
      ...items.map((item) => ({ ...item, id: idRef.current++ })),
    ]);
  }, []);

  // Restart from scratch: wipe the scrollback, pick a fresh number, and drop
  // back to the intro — used by both the "y" replay answer and the restart
  // button so a new game truly starts clean.
  const resetGame = useCallback(() => {
    idRef.current = INTRO.length;
    setLines(INTRO.map((line, i) => ({ ...line, id: i })));
    setTarget(randomTarget());
    setGuesses(0);
    setPhase("playing");
    setValue("");
    inputRef.current?.focus();
  }, []);

  // Auto-scroll to the latest line as the game progresses.
  useEffect(() => {
    const el = outputRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [lines]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const raw = value.trim();
    setValue("");
    if (!raw) return;

    if (phase === "replay") {
      const answer = raw.toLowerCase();
      if (answer === "y" || answer === "yes") {
        resetGame();
      } else if (answer === "n" || answer === "no") {
        pushLines([
          { text: "Thanks for playing! 👋 (type 'y' if you change your mind)", type: "system" },
        ]);
      } else {
        pushLines([{ text: "Play again? Type 'y' or 'n'.", type: "error" }]);
      }
      return;
    }

    // Echo the typed guess as a scrollback line, exactly like the terminal
    // prompt would. Validation: integers between 1 and 100 only.
    if (!/^-?\d+$/.test(raw)) {
      pushLines([
        { text: `Your guess: ${raw}`, type: "guess" },
        { text: "Please enter a valid number!", type: "error" },
      ]);
      return;
    }

    const num = Number(raw);
    if (num < 1 || num > 100) {
      pushLines([
        { text: `Your guess: ${num}`, type: "guess" },
        { text: "Please enter a number between 1 and 100.", type: "error" },
      ]);
      return;
    }

    const attempts = guesses + 1;
    setGuesses(attempts);

    if (num < target) {
      pushLines([
        { text: `Your guess: ${num}`, type: "guess" },
        { text: "⬆ Guess higher", type: "hint" },
      ]);
    } else if (num > target) {
      pushLines([
        { text: `Your guess: ${num}`, type: "guess" },
        { text: "⬇ Guess lower", type: "hint" },
      ]);
    } else {
      setPhase("replay");
      pushLines([
        { text: `Your guess: ${num}`, type: "guess" },
        { text: `✅ Correct! The number was ${target}`, type: "correct" },
        { text: `Attempts: ${attempts}`, type: "guess" },
      ]);
    }
  };

  const promptSymbol = phase === "replay" ? "Play again? (y/n):" : "Your guess:";

  return (
    <div
      onClick={() => inputRef.current?.focus()}
      className="cursor-text overflow-hidden rounded-xl border border-gray-200 dark:border-zinc-800 bg-gray-50 dark:bg-zinc-900/60 shadow-sm transition-colors"
      style={{ fontFamily: MONO_STACK }}
    >
      {/* Title bar */}
      <div className="flex items-center gap-2 border-b border-gray-200 dark:border-zinc-800 bg-gray-100/70 dark:bg-white/[0.02] px-4 py-2.5">
        <span className="flex gap-1.5" aria-hidden="true">
          <span className="h-3 w-3 rounded-full bg-gray-300 dark:bg-zinc-700" />
          <span className="h-3 w-3 rounded-full bg-gray-300 dark:bg-zinc-700" />
          <span className="h-3 w-3 rounded-full bg-gray-300 dark:bg-zinc-700" />
        </span>
        <span className="ml-1 text-xs text-gray-500 dark:text-gray-400">
          🎯 Guess The Number
        </span>
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            resetGame();
          }}
          className="ml-auto text-gray-400 transition-transform duration-500 hover:-rotate-180 hover:text-black dark:text-gray-500 dark:hover:text-white"
          aria-label="Restart game"
          title="Restart"
        >
          <RotateCcw className="h-3.5 w-3.5" />
        </button>
      </div>

      {/* Output area */}
      <div
        ref={outputRef}
        className="no-scrollbar h-56 overflow-y-auto px-4 py-3 text-sm leading-relaxed"
      >
        {lines.map((line) => (
          <p key={line.id} className={`whitespace-pre-wrap break-words ${LINE_CLASS[line.type]}`}>
            {line.text}
          </p>
        ))}

        {/* Prompt line with blinking cursor */}
        <form onSubmit={handleSubmit} className="mt-1 flex items-center">
          <span className="shrink-0 font-bold text-cyan-600 dark:text-cyan-400">{promptSymbol}&nbsp;</span>
          <span className="relative min-w-0 flex-1">
            <span className="break-all text-gray-700 dark:text-gray-200">{value}</span>
            <span className="terminal-cursor text-gray-700 dark:text-gray-200" aria-hidden="true">▋</span>
            <input
              ref={inputRef}
              value={value}
              onChange={(e) => setValue(e.target.value)}
              className="absolute inset-0 h-full w-full cursor-text bg-transparent text-transparent caret-transparent outline-none"
              aria-label="Enter your guess"
              autoComplete="off"
              autoCorrect="off"
              autoCapitalize="off"
              spellCheck={false}
              inputMode={phase === "replay" ? "text" : "numeric"}
            />
          </span>
        </form>
      </div>
    </div>
  );
}
