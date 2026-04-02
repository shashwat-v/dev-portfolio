"use client";

import Image from "next/image";
import { useEffect, useState, useMemo, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { User, Bot, FileText, Download, X } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { ExperienceItem } from "@/components/ExperienceItem";
import { ExperienceCard } from "@/components/ExperienceCard";
import { GithubGraph } from "@/components/GithubGraph";
import { getMarkdownContent } from "@/data/content";
import { TechStack } from "@/components/TechStack";

// ─── Social Icon SVGs ────────────────────────────────────────────────────────
function IconPerson() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}

function IconQR() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="7" height="7" />
      <rect x="14" y="3" width="7" height="7" />
      <rect x="3" y="14" width="7" height="7" />
      <rect x="14" y="14" width="3" height="3" />
      <rect x="18" y="18" width="3" height="3" />
      <rect x="14" y="18" width="3" height="3" />
      <rect x="18" y="14" width="3" height="3" />
    </svg>
  );
}

function IconMessage() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  );
}

function IconLinkedIn() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

function IconX() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.747l7.73-8.835L1.254 2.25H8.08l4.261 5.636 5.902-5.636zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}



function IconCalendar() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  );
}

// ─── Live Clock ───────────────────────────────────────────────────────────────
function LiveClock() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const update = () => {
      const now = new Date();
      const formatted = now.toLocaleTimeString("en-IN", {
        timeZone: "Asia/Kolkata",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      });
      setTime(formatted);
    };
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

  return <span>{time} IST</span>;
}

// ─── Floating NavBar ──────────────────────────────────────────────────────────
function FloatingNavBar() {
  const [isAgentMode, setIsAgentMode] = useState(false);

  return (
    <nav className="fixed bottom-6 left-1/2 flex -translate-x-1/2 items-center gap-3 rounded-full border border-gray-200 dark:border-zinc-700 bg-white/70 dark:bg-zinc-900/80 px-4 py-3 shadow-sm backdrop-blur-md transition-all hover:bg-white/90 dark:hover:bg-zinc-900 sm:gap-6 sm:px-6 z-50">
      <div className="flex items-center">
        <button
          onClick={() => setIsAgentMode(!isAgentMode)}
          className={`group relative flex h-7 w-12 cursor-pointer rounded-full p-1 transition-colors duration-200 ease-in-out focus:outline-none bg-gray-200 hover:bg-gray-300 dark:bg-zinc-700 dark:hover:bg-zinc-600`}
          role="switch"
          aria-checked={isAgentMode}
          title="Switch to agent mode"
        >
          <div className={`flex h-5 w-5 transform items-center justify-center rounded-full bg-white shadow-sm transition duration-200 ease-in-out ${isAgentMode ? 'translate-x-5' : 'translate-x-0'}`}>
            {isAgentMode ? (
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-3 w-3 text-black" aria-hidden="true">
                <path d="M12 8V4H8" />
                <rect width="16" height="12" x="4" y="8" rx="2" />
                <path d="M2 14h2" />
                <path d="M20 14h2" />
                <path d="M15 13v2" />``
                <path d="M9 13v2" />
              </svg>
              // </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-3 w-3 text-black" aria-hidden="true">
                <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
            )}
          </div>
        </button>
      </div>
      <button className="text-gray-500 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors hover:scale-110" aria-label="Show QR Code">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5" aria-hidden="true"><rect width="5" height="5" x="3" y="3" rx="1"></rect><rect width="5" height="5" x="16" y="3" rx="1"></rect><rect width="5" height="5" x="3" y="16" rx="1"></rect><path d="M21 16h-3a2 2 0 0 0-2 2v3"></path><path d="M21 21v.01"></path><path d="M12 7v3a2 2 0 0 1-2 2H7"></path><path d="M3 12h.01"></path><path d="M12 3h.01"></path><path d="M12 16v.01"></path><path d="M16 12h1"></path><path d="M21 12v.01"></path><path d="M12 21v-1"></path></svg>
      </button>
      <div className="h-6 w-px bg-gray-200 dark:bg-zinc-700"></div>
      <a href="https://github.com/shashwat-v" target="_blank" rel="noopener noreferrer" className="text-gray-500 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors hover:scale-110">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5" aria-hidden="true"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path><path d="M9 18c-4.51 2-5-2-7-2"></path></svg>
      </a>
      <a href="https://www.linkedin.com/in/shashwat-v" target="_blank" rel="noopener noreferrer" className="text-gray-500 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors hover:scale-110">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5" aria-hidden="true"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect width="4" height="12" x="2" y="9"></rect><circle cx="4" cy="4" r="2"></circle></svg>
      </a>
      <a href="https://x.com/shvshvat" target="_blank" rel="noopener noreferrer" className="text-gray-500 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors hover:scale-110">
        <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" className="h-5 w-5" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z"></path></svg>
      </a>
      <a href="#research-and-blogs" className="text-gray-500 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors hover:scale-110" title="Research & Blogs">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5" aria-hidden="true"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path></svg>
      </a>
      <a href="https://cal.com/adi-patil/30min" target="_blank" rel="noopener noreferrer" className="text-gray-500 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors hover:scale-110">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5" aria-hidden="true"><path d="M8 2v4"></path><path d="M16 2v4"></path><rect width="18" height="18" x="3" y="4" rx="2"></rect><path d="M3 10h18"></path></svg>
      </a>
    </nav>
  );
}

export default function Home() {
  const [isAgentMode, setIsAgentMode] = useState(false);
  const [showQR, setShowQR] = useState(false);
  const [showResume, setShowResume] = useState(false);
  const [isAuraActive, setIsAuraActive] = useState(false);
  const [time, setTime] = useState("");
  const [isLofiPlaying, setIsLofiPlaying] = useState(false);
  const [lofiVolume, setLofiVolume] = useState(1);
  const lofiRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (showQR || showResume) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [showQR, showResume]);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString("en-IN", {
          timeZone: "Asia/Kolkata",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
        })
      );
    };

    updateTime();
    const timer = setInterval(updateTime, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (lofiRef.current) {
      lofiRef.current.volume = lofiVolume;
    }
  }, [lofiVolume]);

  useEffect(() => {
    return () => {
      if (lofiRef.current) {
        lofiRef.current.pause();
        lofiRef.current = null;
      }
    };
  }, []);

  const toggleLofi = () => {
    if (!lofiRef.current) {
      lofiRef.current = new Audio("/lofi.mp3");
      lofiRef.current.loop = true;
      lofiRef.current.volume = lofiVolume;
    }

    if (isLofiPlaying) {
      lofiRef.current.pause();
    } else {
      lofiRef.current.play().catch(e => console.error("Lofi play failed:", e));
    }
    setIsLofiPlaying(!isLofiPlaying);
  };

  const starPositions = useMemo(() => {
    return [...Array(50)].map(() => ({
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      duration: 2 + Math.random() * 3,
      delay: Math.random() * 5,
    }));
  }, []);

  return (
    <div className="relative flex min-h-screen flex-col items-center bg-white dark:bg-black px-3 pt-16 text-black dark:text-white pb-32 sm:px-4 sm:pt-24 sm:pb-40 overflow-x-hidden transition-colors duration-300">
      {/* Easter Egg Effects */}
      <AnimatePresence>
        {isAuraActive && (
          <>
            {/* Bluish Aura Edge Effect */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[100] pointer-events-none shadow-[inset_0_0_150px_rgba(29,78,216,0.5)] dark:shadow-[inset_0_0_150px_rgba(59,130,246,0.4)] transition-opacity duration-1000"
            />
            {/* Twinkling Stars Background */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-0 pointer-events-none overflow-hidden"
            >
              {starPositions.map((pos, i) => (
                <motion.div
                  key={i}
                  className="absolute h-[2px] w-[2px] bg-blue-500 dark:bg-white rounded-full shadow-[0_0_4px_rgba(59,130,246,0.8)] dark:shadow-[0_0_3px_white]"
                  style={{
                    top: pos.top,
                    left: pos.left,
                  }}
                  animate={{
                    opacity: [0.2, 1, 0.2],
                    scale: [0.8, 1.2, 0.8],
                  }}
                  transition={{
                    duration: pos.duration,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: pos.delay,
                  }}
                />
              ))}
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <ThemeToggle />

      <AnimatePresence mode="wait">
        {isAgentMode ? (
          <motion.main
            key="agent"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="flex w-full max-w-2xl flex-col items-start text-left px-4 sm:px-0 z-10"
          >
            <pre
              className="w-full whitespace-pre-wrap font-mono text-sm leading-relaxed text-black dark:text-gray-300 selection:bg-black dark:selection:bg-white selection:text-white dark:selection:text-black antialiased"
              style={{ fontFamily: '"Courier New", Courier, "Lucida Sans Typewriter", "Lucida Console", monospace' }}
            >
              {getMarkdownContent(time)}
            </pre>
          </motion.main>
        ) : (
          <motion.main
            key="human"
            className="flex w-full max-w-2xl flex-col items-center text-center font-sans z-10"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.5 }}
          >
            {/* Profile Image (Aura Toggle) */}
            <button
              onClick={() => setIsAuraActive(!isAuraActive)}
              className="group relative mb-2 h-48 w-48 grayscale filter sm:h-64 sm:w-64 overflow-hidden cursor-pointer transition-all duration-500 hover:grayscale-0 active:scale-95 rounded-none"
              aria-label="Toggle Aura Mode"
            >
              <Image
                src="/profile-pic.png"
                alt="Profile"
                fill
                className={`object-cover transition-all duration-700 ${!isAuraActive ? 'grayscale' : 'grayscale-0'}`}
                priority
              />
              {/* <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black via-black/60 to-transparent dark:opacity-100 opacity-0 transition-opacity duration-500 pointer-events-none" /> */}
              <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white via-white/60 to-transparent dark:from-black dark:via-black/60 backdrop-blur-[1px]"></div>
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 shadow-[inset_0_0_20px_rgba(59,130,246,0.3)] rounded-full pointer-events-none"></div>
            </button>

            {/* Name */}
            <h1 className="mb-4 text-5xl font-bold tracking-tight sm:text-7xl">Shashwat Vishwakarma</h1>

            {/* Meta row */}
            <div className="mb-8 flex flex-wrap items-center justify-center gap-2 text-xs text-gray-400 dark:text-gray-500 sm:text-sm">
              <span>/shəˈshwət vɪʃwəˈkɑːrmə/</span>
              <span className="text-gray-300 dark:text-gray-700">•</span>
              <span>noun</span>
              <span className="text-gray-300 dark:text-gray-700">•</span>
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1.5">
                  <span className="tabular-nums text-xs sm:text-sm">
                    <LiveClock />
                  </span>
                </div>
                <span className="text-gray-300 dark:text-gray-700">•</span>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold uppercase tracking-tight text-gray-400">lofi</span>
                  <button
                    onClick={toggleLofi}
                    className="flex h-5 w-5 items-center justify-center rounded-full transition-all hover:bg-gray-100 dark:hover:bg-zinc-800 text-gray-400 hover:text-black dark:hover:text-white" aria-label="Play Lofi"
                  >
                    {isLofiPlaying ? (
                      <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-pause"><rect width="4" height="16" x="6" y="4"></rect><rect width="4" height="16" x="14" y="4"></rect></svg>
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-music"><path d="M9 18V5l12-2v13"></path><circle cx="6" cy="18" r="3"></circle><circle cx="18" cy="16" r="3"></circle></svg>
                    )}
                  </button>
                  <AnimatePresence>
                    {isLofiPlaying && (
                      <motion.div
                        initial={{ width: 0, opacity: 0 }}
                        animate={{ width: 40, opacity: 1 }}
                        exit={{ width: 0, opacity: 0 }}
                        className="flex h-5 items-center overflow-hidden"
                      >
                        <input
                          type="range"
                          min="0"
                          max="1"
                          step="0.01"
                          value={lofiVolume}
                          onChange={(e) => setLofiVolume(parseFloat(e.target.value))}
                          className="h-[2px] w-8 cursor-pointer appearance-none rounded-full bg-gray-200 dark:bg-zinc-800 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-2 [&::-webkit-slider-thumb]:w-2 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-gray-400 dark:[&::-webkit-slider-thumb]:bg-zinc-500 hover:[&::-webkit-slider-thumb]:bg-black dark:hover:[&::-webkit-slider-thumb]:bg-white [&::-moz-range-thumb]:border-none [&::-moz-range-thumb]:h-2 [&::-moz-range-thumb]:w-2 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-gray-400 dark:[&::-moz-range-thumb]:bg-zinc-500 hover:[&::-moz-range-thumb]:bg-black dark:hover:[&::-moz-range-thumb]:bg-white transition-all"
                        />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>

            {/* Description Paragraphs */}
            <div className="w-full space-y-4 text-left text-base leading-relaxed text-gray-600 dark:text-gray-400 sm:text-lg md:text-xl">
              <p>
                I’m a curious polymath and generalist by nature — drawn across disciplines, yet disciplined enough to go deep when it matters. I think in systems, question first principles, and value clarity through exploration.</p>
              <p>
                At heart, I’m a tinkerer and builder — shaping thoughtful technology through iteration and precision. I focus less on noise and more on building things that work, endure, and improve over time.</p>
              {/* <p>
            a full-stack developer and{" "}
            <a href="https://en.wikipedia.org/wiki/Product_design" target="_blank" rel="noopener noreferrer" className="underline underline-offset-4 hover:text-black dark:hover:text-white transition-colors">
              product builder
            </a>{" "}
            with deep experience across engineering, product strategy, and user-centric design.
          </p>
          <p>
            a{" "}
            <a href="https://en.wikipedia.org/wiki/Polymath" target="_blank" rel="noopener noreferrer" className="underline underline-offset-4 hover:text-black dark:hover:text-white transition-colors">
              polymath
            </a>{" "}
            who bridges technical architecture with business outcomes to create impactful, scalable solutions.
          </p> */}
            </div>

            {/* Side Feature Link */}
            {/* <div className="mb-4 w-full flex justify-start py-6">
          <button className="group flex items-center gap-3 text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-all duration-300">
            <span className="text-sm sm:text-base underline underline-offset-8 decoration-gray-200 dark:decoration-zinc-800 group-hover:decoration-blue-500 transition-all">
              side feature: neural landscape
            </span>
          </button>
        </div> */}

            {/* Experience Section */}
            <div className="mb-16 w-full text-left py-6">
              <h2 className="mb-6 text-xs font-bold uppercase tracking-widest text-gray-400 dark:text-gray-500">Experience</h2>
              <div className="space-y-6">

                {/* JULIUS BAER */}
                <ExperienceCard
                  title="JULIUS BAER | Wealth Management Intern"
                  role="Dec 2025 - January 2026 | Gurugram, India"
                  link="#"
                  logo={<Image src="/juliusbaerlogo.png" alt="Julius Baer Logo" fill className="object-cover" />}
                >
                  <div className="space-y-2">
                    <ul className="list-disc list-inside space-y-1 pl-2 text-gray-600 dark:text-gray-400">
                      <li>Applied equity valuation frameworks (DDM, P/E, PEG, P/B, CAPE) with comparative analysis across profitability and unit economics.</li>
                      <li>Built a quantitative research framework covering volatility, drawdown, regime-wise returns, and equal-weight vs. index strategies.</li>
                      <li>Automated portfolio backtesting and analytics workflows using Python to support investment research.</li>
                      <li>Applied Monte Carlo simulations and options strategies (covered calls, spreads, straddles) for multi-asset risk estimation.</li>
                    </ul>
                  </div>
                </ExperienceCard>

                {/* PHASE0 */}
                <ExperienceCard
                  title="PHASE0 | Founder & Full-Stack Engineer"
                  role="Dec 2025 – Present | Remote"
                  link="#"
                  logo={<Image src="/phase0logo2.png" alt="PHASE0 Logo" fill className="object-cover" />}
                >
                  <div className="space-y-2">
                    <ul className="list-disc list-inside space-y-1 pl-2 text-gray-600 dark:text-gray-400">
                      <li>Built and deployed a production-ready ticketing platform using React, Node.js, and PostgreSQL.</li>
                      <li>Designed scalable REST APIs with JWT authentication and role-based access control.</li>
                      <li>Containerized services with Docker and deployed on AWS (EC2, RDS).</li>
                      <li>Designed database schema and managed migrations using Prisma ORM.</li>
                    </ul>
                  </div>
                </ExperienceCard>

                {/* COGNECTO */}
                <ExperienceCard
                  title="COGNECTO | App Developer"
                  role="Sep 2023 - Nov 2023 | Bengaluru, India"
                  link="#"
                  logo={<Image src="/cognectologo.jpg" alt="Cognecto Logo" fill className="object-cover" />}
                >
                  <div className="space-y-2">
                    <ul className="list-disc list-inside space-y-1 pl-2 text-gray-600 dark:text-gray-400">
                      <li>Coordinated with team of 5 people to make changes in the Mobile Application of the Company.</li>
                      <li>Re-Constructed Code Structure of the Mobile Application in Flutter.</li>
                      <li>Increased the Application speed by 42% by optimizing code and removing bugs.</li>
                    </ul>
                  </div>
                </ExperienceCard>

                {/* D FRAME */}
                <ExperienceCard
                  title="D FRAME | Co-Founder of Technology (Full-Stack Engineer)"
                  role="Jul 2022 - Jul 2024 | The Hague, Netherlands"
                  link="#"
                  logo={<Image src="/dframelogo.jpg" alt="D FRAME Logo" fill className="object-cover" />}
                >
                  <div className="space-y-2">
                    <ul className="list-disc list-inside space-y-1 pl-2 text-gray-600 dark:text-gray-400">
                      <li>Built data pipelines (Pandas, NumPy) to analyze and monetize user data.</li>
                      <li>Developed ad-campaign algorithm (Express, MongoDB) boosting conversions by 35%.</li>
                    </ul>
                  </div>
                </ExperienceCard>

              </div>
            </div>

            {/* Research Publications Section */}
            {/* <div className="mb-16 w-full text-left">
              <h2 className="mb-6 text-xs font-bold uppercase tracking-widest text-gray-400 dark:text-gray-500">
                Research Publications
              </h2>
              <div className="space-y-12">
                <ExperienceItem title="Cross-Compatible Encryption Adapter for Securing Legacy Modbus Devices" role="" collapsible={true} collapsedHeight="max-h-40">
                  <div className="space-y-4">
                    <div className="space-y-1">
                      <p className="text-sm text-gray-400 font-medium">2025 17th International Conference on COMmunication Systems and NETworks (COMSNETS)</p>
                      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-4">
                        <p className="text-gray-600 dark:text-gray-400">Authors: Aditya Patil; T. S. Sreeram</p>
                        <a href="https://doi.org/10.1109/COMSNETS63942.2025.10885597" target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-xs font-medium text-black dark:text-white underline underline-offset-4 hover:text-gray-600 dark:hover:text-gray-300">View Publication</a>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <p className="text-xs uppercase tracking-wider text-gray-400 dark:text-gray-500 font-bold">Abstract</p>
                      <p className="text-gray-600 dark:text-gray-400">Supervisory Control and Data Acquisition systems are the backbone of managing critical infrastructure in modern industrial control systems, spanning sectors from power generation to logistics. However, these systems face significant challenges due to threats from malicious actors. The Modbus protocol, despite its known lack of security features, is still used in many industries managing critical infrastructure due to the high cost of replacing existing systems. As a result, these legacy systems remain vulnerable to potentially damaging threats. This paper proposes an adapter device for enhancing the security of the Modbus protocol without replacing devices in legacy systems. The proposed adapter is cost-efficient, provides cross-platform support, and is easy to install, update, and maintain.</p>
                    </div>
                  </div>
                </ExperienceItem>
              </div>
            </div> */}

            {/* Writings & Blogs Section */}
            <div className="mb-16 w-full text-left">
              <h2 className="mb-6 text-xs font-bold uppercase tracking-widest text-gray-400 dark:text-gray-500">
                Writings & Blogs
              </h2>
              <p className="w-full text-lg leading-relaxed text-gray-600 dark:text-gray-400">
                i host my thoughts on <a href="https://medium.com/@shashwat2775" target="_blank" rel="noopener noreferrer" className="text-black dark:text-white underline underline-offset-4 transition-colors hover:text-gray-600 dark:hover:text-gray-300">medium</a> rather than building a custom site. instead of overengineering and reinventing the wheel, i prefer leveraging a mature platform that lets me focus on what matters: sharing insights on ai systems, product strategy, and technical architecture.
              </p>
            </div>

            {/* Tech Stack */}
            <div className="mb-16 w-full text-left">
              <h2 className="mb-6 text-xs font-bold uppercase tracking-widest text-gray-400 dark:text-gray-500">Tech Stack</h2>
              <p className="mb-8 text-lg text-gray-600 dark:text-gray-400">I'm a generalist at heart who can build with anything, but here's the core stack I've spent the most time with:</p>
              <TechStack />
            </div>

            {/* In Between These Experiences Section */}
            <div className="mb-16 w-full text-left">
              <h2 className="mb-6 text-xs font-bold uppercase tracking-widest text-gray-400 dark:text-gray-500">
                In Between These Experiences
              </h2>
              <div className="rounded-xl border border-gray-200 dark:border-gray-800 p-6 sm:p-8">
                <ExperienceItem
                  title="The Product Building Journey"
                  role=""
                  collapsible={true}
                >
                  <div className="space-y-4 text-gray-600 dark:text-gray-400">
                    <p>I've been building and experimenting on the product side for a long time. Each previous product always feels naive in hindsight, but looking back, I can see they were incrementally better, each iteration teaching me something new about users, infrastructure, and what it takes to build something people actually want.</p>
                    <p>It started with <span className="font-medium">MetaWiper</span> during my sophomore year, a tool that cleaned image metadata. No one would use it, but I was proud. It was my first real attempt at shipping something complete.</p>
                    <p>Next came <span className="font-medium">Stockic</span>, a news app where I spent months doing serious infrastructure work. This was where I learned to build systems that could scale, not just features that looked good.</p>
                    <p>Then I worked on <span className="font-medium">Gloss Card</span>, and for the first time, a customer actually wanted to buy it for their product. That validation, knowing someone saw enough value to pay, was a turning point.</p>
                    <p>After that, I built <span className="font-medium">NeuraLeap</span>, where I had the most meaningful user interactions yet, HRs from established firms. I worked on data pipelines capable of handling 50 million LinkedIn profiles and processing them with AI. The scale was different, the stakes were higher, and the technical challenges forced me to level up.</p>
                    <p>Most recently, I worked on <span className="font-medium">Meteor</span>, an AI SEO toolkit at Entrepreneurs First. This time, my product was being used by 6 YC-backed companies. Real users. Real traction. Real feedback loops.</p>
                    <p className="font-medium text-black dark:text-gray-300">So yes, hard work and consistency pay off. Each product was a step forward, even when it didn't feel like it at the time.</p>
                  </div>
                </ExperienceItem>
              </div>
            </div>

            {/* Education Section */}
            <div className="mb-16 w-full text-left">
              <h2 className="mb-6 text-xs font-bold uppercase tracking-widest text-gray-400 dark:text-gray-500">
                Education
              </h2>
              <div className="space-y-6">
                <ExperienceItem
                  title="Ashoka University"
                  role="B.Sc (Hons.) in Economics & Finance, minor in Entrepreneurship & Mathematics"
                >
                  <p>August 2023 - August 2027</p>
                </ExperienceItem>
                <ExperienceItem
                  title="Yugdharma Public School"
                  role="High School (Class 12th PCM)"
                >
                  <p>April 2021 - April 2022</p>
                </ExperienceItem>
                <ExperienceItem
                  title="Scholars Academy"
                  role="Secondary School (Class 10th)"
                >
                  <p>May 2019 - May 2020</p>
                </ExperienceItem>
              </div>
            </div>

            {/* Contributions Section */}
            <div className="mb-16 w-full text-left">
              <h2 className="mb-6 text-xs font-bold uppercase tracking-widest text-gray-400 dark:text-gray-500">
                GitHub Contributions
              </h2>
              <GithubGraph />
            </div>

            {/* Thing about me Section */}
            <div className="mb-16 w-full text-left">
              <h2 className="mb-6 text-xs font-bold uppercase tracking-widest text-gray-400 dark:text-gray-500">
                Thing about me
              </h2>
              <div className="space-y-6">
                <p className="w-full text-lg leading-relaxed text-gray-600 dark:text-gray-400">
                  beyond engineering and build systems, i find balance in the tactile and the thoughtful. whether it's exploring the nuances of complex architectures or spending time in the real world, my approach to life is driven by curiosity and a desire to understand how things work at their core.
                </p>
                <p className="w-full text-lg leading-relaxed text-gray-600 dark:text-gray-400">
                  i believe that the best products are built by people who have a diverse range of interests. it's the unique combination of technical depth and human perspective that allows us to create technology that actually resonates.
                </p>
              </div>
            </div>

            {/* Get in Touch Section */}
            <div className="mb-16 w-full text-left">
              <h2 className="mb-6 text-xs font-bold uppercase tracking-widest text-gray-400">
                Get in Touch
              </h2>
              <div className="space-y-4">
                <p className="text-lg text-gray-600 dark:text-gray-400">
                  connect with me on <a href="https://www.linkedin.com/in/shashwat-v" target="_blank" rel="noopener noreferrer" className="text-black dark:text-white underline underline-offset-4 hover:text-gray-600 dark:hover:text-gray-300">linkedin</a> or shoot an <a href="mailto:shashwat.v@example.com" className="text-black dark:text-white underline underline-offset-4 hover:text-gray-600 dark:hover:text-gray-300">email</a>
                </p>
              </div>
            </div>

          </motion.main>
        )}
      </AnimatePresence>

      <nav className="fixed bottom-6 left-1/2 flex -translate-x-1/2 items-center gap-3 rounded-full border border-gray-200 dark:border-zinc-700 bg-white/70 dark:bg-zinc-900/80 px-4 py-3 shadow-sm backdrop-blur-md transition-all hover:bg-white/90 dark:hover:bg-zinc-900 sm:gap-6 sm:px-6 z-50">
        <div className="flex items-center">
          <button
            onClick={() => setIsAgentMode(!isAgentMode)}
            className="group relative flex h-7 w-12 cursor-pointer rounded-full bg-gray-200 dark:bg-zinc-700 p-1 transition-colors duration-200 ease-in-out hover:bg-gray-300 dark:hover:bg-zinc-600 focus:outline-none"
            role="switch"
            aria-checked={isAgentMode}
            title={`Switch to ${!isAgentMode ? "agent" : "human"} mode`}
          >
            <div
              className={`flex h-5 w-5 transform items-center justify-center rounded-full bg-white dark:bg-white shadow-sm transition duration-200 ease-in-out ${isAgentMode ? "translate-x-5" : "translate-x-0"
                }`}
            >
              {!isAgentMode ? (
                <User className="h-3 w-3 text-black" />
              ) : (
                <Bot className="h-3 w-3 text-black" />
              )}
            </div>
          </button>
        </div>
        <button
          onClick={() => setShowQR(true)}
          className="text-gray-500 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors hover:scale-110" aria-label="Show QR Code"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5" aria-hidden="true"><rect width="5" height="5" x="3" y="3" rx="1"></rect><rect width="5" height="5" x="16" y="3" rx="1"></rect><rect width="5" height="5" x="3" y="16" rx="1"></rect><path d="M21 16h-3a2 2 0 0 0-2 2v3"></path><path d="M21 21v.01"></path><path d="M12 7v3a2 2 0 0 1-2 2H7"></path><path d="M3 12h.01"></path><path d="M12 3h.01"></path><path d="M12 16v.01"></path><path d="M16 12h1"></path><path d="M21 12v.01"></path><path d="M12 21v-1"></path></svg>
        </button>
        <button
          onClick={() => setShowResume(true)}
          className="text-gray-500 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors hover:scale-110" aria-label="Show Resume"
        >
          <FileText className="h-5 w-5" />
        </button>
        <div className="h-6 w-px bg-gray-200 dark:bg-zinc-700"></div>
        <a href="#research-and-blogs" className="text-gray-500 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors hover:scale-110" title="Research & Blogs">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5" aria-hidden="true"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path></svg>
        </a>
        <a href="https://github.com/shashwat-v" target="_blank" rel="noopener noreferrer" className="text-gray-500 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors hover:scale-110">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5" aria-hidden="true"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path><path d="M9 18c-4.51 2-5-2-7-2"></path></svg>
        </a>
        <a href="https://www.linkedin.com/in/shashwat-v" target="_blank" rel="noopener noreferrer" className="text-gray-500 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors hover:scale-110">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5" aria-hidden="true"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect width="4" height="12" x="2" y="9"></rect><circle cx="4" cy="4" r="2"></circle></svg>
        </a>
        <a href="https://x.com/shvshvat" target="_blank" rel="noopener noreferrer" className="text-gray-500 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors hover:scale-110">
          <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" className="h-5 w-5" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z"></path></svg>
        </a>
        <a href="https://cal.com/adi-patil/30min" target="_blank" rel="noopener noreferrer" className="text-gray-500 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors hover:scale-110">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5" aria-hidden="true"><path d="M8 2v4"></path><path d="M16 2v4"></path><rect width="18" height="18" x="3" y="4" rx="2"></rect><path d="M3 10h18"></path></svg>
        </a>
      </nav>

      {/* QR Code Modal */}
      {showQR && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/20 dark:bg-white/5 backdrop-blur-sm"
          onClick={() => setShowQR(false)}
        >
          <div
            className="relative rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-black p-8 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowQR(false)}
              className="absolute -right-3 -top-3 rounded-full bg-black dark:bg-white p-2 text-white dark:text-black transition-transform hover:scale-110"
              aria-label="Close"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-x h-4 w-4" aria-hidden="true"><path d="M18 6 6 18"></path><path d="m6 6 12 12"></path></svg>
            </button>
            <div className="rounded-lg bg-white p-2">
              <Image src="/frame.svg" alt="QR Code" width={200} height={200} className="w-48 h-48 sm:w-56 sm:h-56 object-contain" />
            </div>
          </div>
        </div>
      )}

      {/* Resume Modal */}
      {showResume && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/20 dark:bg-white/5 backdrop-blur-sm"
          onClick={() => setShowResume(false)}
        >
          <div
            className="relative flex flex-col items-center w-[95vw] max-w-4xl h-[90vh] rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-black p-4 sm:p-6 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowResume(false)}
              className="absolute -right-3 -top-3 rounded-full bg-black dark:bg-white p-2 text-white dark:text-black transition-transform hover:scale-110 z-10"
              aria-label="Close"
            >
              <X className="h-4 w-4" />
            </button>
            <div className="w-full h-full flex-grow relative overflow-hidden rounded-lg bg-white border border-transparent">
              <iframe
                src="/Resume.pdf#view=FitH&toolbar=0&navpanes=0"
                className="absolute -left-[24px] -top-[24px] w-[calc(100%+48px)] h-[calc(100%+48px)] border-none"
                title="Resume"
              />
            </div>
            <a
              href="/Resume.pdf"
              download
              className="absolute bottom-8 right-8 flex items-center justify-center rounded-full bg-black dark:bg-white p-3 text-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200 transition-transform hover:scale-110 shadow-lg z-20"
              aria-label="Download Resume"
            >
              <Download className="h-5 w-5" />
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
