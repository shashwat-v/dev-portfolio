"use client";
import React, { Suspense, useEffect, useRef, useState } from "react";
import { Application, SplineEvent } from "@splinetool/runtime";
import gsap from "gsap";
const Spline = React.lazy(() => import("@splinetool/react-spline"));
import { Skill, SkillNames, SKILLS } from "@/data/constants";
import { useSounds } from "@/hooks/use-sounds";
import { useTheme } from "next-themes";

export const KeyboardAnimation = () => {
  const { theme } = useTheme();
  const splineContainer = useRef<HTMLDivElement>(null);
  const [splineApp, setSplineApp] = useState<Application>();
  const selectedSkillRef = useRef<Skill | null>(null);

  const { playPressSound, playReleaseSound } = useSounds();
  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null);
  const [keyboardRevealed, setKeyboardRevealed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleMouseHover = (e: SplineEvent) => {
    if (!splineApp || selectedSkillRef.current?.name === e.target.name) return;

    if (e.target.name === "body" || e.target.name === "platform") {
      if (selectedSkillRef.current) playReleaseSound();
      setSelectedSkill(null);
      selectedSkillRef.current = null;
      if (splineApp.getVariable("heading") && splineApp.getVariable("desc")) {
        splineApp.setVariable("heading", "");
        splineApp.setVariable("desc", "");
      }
    } else {
      if (!selectedSkillRef.current || selectedSkillRef.current.name !== e.target.name) {
        const skill = SKILLS[e.target.name as SkillNames];
        if (skill) {
          if (selectedSkillRef.current) playReleaseSound();
          playPressSound();
          setSelectedSkill(skill);
          selectedSkillRef.current = skill;
        }
      }
    }
  };

  const handleSplineInteractions = () => {
    if (!splineApp) return;

    const isInputFocused = () => {
      const activeElement = document.activeElement;
      return (
        activeElement &&
        (activeElement.tagName === "INPUT" ||
          activeElement.tagName === "TEXTAREA" ||
          (activeElement as HTMLElement).isContentEditable)
      );
    };

    splineApp.addEventListener("keyUp", () => {
      if (!splineApp || isInputFocused()) return;
      playReleaseSound();
      splineApp.setVariable("heading", "");
      splineApp.setVariable("desc", "");
    });

    splineApp.addEventListener("keyDown", (e) => {
      if (!splineApp || isInputFocused()) return;
      const skill = SKILLS[e.target.name as SkillNames];
      if (skill) {
        playPressSound();
        setSelectedSkill(skill);
        selectedSkillRef.current = skill;
        splineApp.setVariable("heading", skill.label);
        splineApp.setVariable("desc", skill.shortDescription);
      }
    });

    splineApp.addEventListener("mouseHover", handleMouseHover);
  };

  const updateKeyboardTransform = async () => {
    if (!splineApp) return;
    const kbd = splineApp.findObjectByName("keyboard");
    if (!kbd) return;

    kbd.visible = false;
    await new Promise((resolve) => setTimeout(resolve, 400));
    kbd.visible = true;
    setKeyboardRevealed(true);

    // Reduce scale so the keyboard is fully visible without clipping
    const scale = isMobile ? { x: 0.12, y: 0.12, z: 0.12 } : { x: 0.15, y: 0.15, z: 0.15 };
    
    gsap.fromTo(
      kbd.scale,
      { x: 0.01, y: 0.01, z: 0.01 },
      {
        ...scale,
        duration: 1.5,
        ease: "elastic.out(1, 0.6)",
      }
    );

    // Set a subtle tilt
    gsap.to(kbd.rotation, {
      x: 0,
      y: Math.PI / 12,
      z: 0,
      duration: 1.5,
      ease: "power2.out"
    });

    const allObjects = splineApp.getAllObjects();
    const keycaps = allObjects.filter((obj) => obj.name === "keycap");

    await new Promise((resolve) => setTimeout(resolve, 900));

    if (isMobile) {
      const mobileKeyCaps = allObjects.filter((obj) => obj.name === "keycap-mobile");
      mobileKeyCaps.forEach((keycap) => { keycap.visible = true; });
    } else {
      const desktopKeyCaps = allObjects.filter((obj) => obj.name === "keycap-desktop");
      desktopKeyCaps.forEach(async (keycap, idx) => {
        await new Promise((resolve) => setTimeout(resolve, idx * 70));
        keycap.visible = true;
      });
    }

    keycaps.forEach(async (keycap, idx) => {
      keycap.visible = false;
      await new Promise((resolve) => setTimeout(resolve, idx * 70));
      keycap.visible = true;
      gsap.fromTo(
        keycap.position,
        { y: 200 },
        { y: 50, duration: 0.5, delay: 0.1, ease: "bounce.out" }
      );
    });
  };

  useEffect(() => {
    if (!splineApp) return;
    handleSplineInteractions();
    
    if (!keyboardRevealed) {
      updateKeyboardTransform();
    }
  }, [splineApp, isMobile]);

  useEffect(() => {
    if (!splineApp) return;
    const textDesktopDark = splineApp.findObjectByName("text-desktop-dark");
    const textDesktopLight = splineApp.findObjectByName("text-desktop");
    const textMobileDark = splineApp.findObjectByName("text-mobile-dark");
    const textMobileLight = splineApp.findObjectByName("text-mobile");

    if (!textDesktopDark || !textDesktopLight || !textMobileDark || !textMobileLight) return;

    if (theme === "dark") {
      textDesktopDark.visible = false;
      textDesktopLight.visible = !isMobile;
      textMobileDark.visible = false;
      textMobileLight.visible = isMobile;
    } else {
      textDesktopDark.visible = !isMobile;
      textDesktopLight.visible = false;
      textMobileDark.visible = isMobile;
      textMobileLight.visible = false;
    }
  }, [theme, splineApp, isMobile]);

  useEffect(() => {
    if (!selectedSkill || !splineApp) return;
    splineApp.setVariable("heading", selectedSkill.label);
    splineApp.setVariable("desc", selectedSkill.shortDescription);
  }, [selectedSkill, splineApp]);

  return (
    <div className="w-full h-full relative group">
      <Suspense fallback={<div className="flex items-center justify-center w-full h-full text-gray-400">Loading interactive 3D model...</div>}>
        <Spline
          className="w-full h-full"
          ref={splineContainer}
          onLoad={(app: Application) => {
            setSplineApp(app);
          }}
          scene="/assets/skills-keyboard.spline"
        />
      </Suspense>
    </div>
  );
};
