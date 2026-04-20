"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useInView } from "motion/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Mail, Copy, Check, Globe2, FileText, Download } from "lucide-react";
import {
  TextRevealCard,
  TextRevealCardDescription,
  TextRevealCardTitle,
} from "@/components/ui/text-reveal-card";
import { FlipWords } from "@/components/ui/flip-words";
import { Terminal } from "./ui/terminal";

gsap.registerPlugin(ScrollTrigger);

/* ═══════════════════════ COBE Globe with Pulse ═══════════════════════ */
function CobeGlobe() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pointerInteracting = useRef<number | null>(null);
  const pointerInteractionMovement = useRef(0);
  const fadeMask =
    "radial-gradient(circle at 50% 50%, rgb(0,0,0) 60%, rgba(0,0,0,0) 70%)";

  useEffect(() => {
    let phi = 0;
    let animId: number;
    let width = 0;

    const onResize = () => {
      if (canvasRef.current) {
        width = canvasRef.current.offsetWidth;
      }
    };
    window.addEventListener("resize", onResize);
    onResize();

    let globe: import("cobe").Globe | undefined;

    import("cobe").then(({ default: createGlobe }) => {
      if (!canvasRef.current) return;

      globe = createGlobe(canvasRef.current, {
        devicePixelRatio: 2,
        width: width * 2,
        height: width * 2,
        phi: 0,
        theta: 0.3,
        dark: 1,
        diffuse: 3,
        mapSamples: 16000,
        mapBrightness: 1.8,
        baseColor: [0.8, 0.1, 0.1],
        markerColor: [1, 0.2, 0.2],
        glowColor: [0.3, 0.05, 0.05],
        markers: [
          { location: [20.5937, 78.9629], size: 0.08 },
          { location: [37.0902, -95.7129], size: 0.05 },
          { location: [55.3781, -3.436], size: 0.05 },
        ],
      });

      // Animation loop for continuous rotation
      function tick() {
        if (!pointerInteracting.current) {
          phi += 0.003;
        }
        globe?.update({
          phi: phi + pointerInteractionMovement.current,
          width: width * 2,
          height: width * 2,
        });
        animId = requestAnimationFrame(tick);
      }
      animId = requestAnimationFrame(tick);
    });

    return () => {
      cancelAnimationFrame(animId);
      globe?.destroy();
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <div
      className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-[22%] md:translate-y-[25%] w-[330px] h-[330px] md:w-[380px] md:h-[380px]"
      style={{
        WebkitMaskImage: fadeMask,
        maskImage: fadeMask,
      }}
    >
      {/* Red glow behind globe */}
      <div className="absolute inset-0 rounded-full bg-red-500/[0.08] blur-[60px] scale-110" />
      {/* Pulsing ring */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="animate-ping w-4 h-4 rounded-full bg-red-500/30 absolute" style={{ top: '38%', left: '62%' }} />
      </div>
      <canvas
        ref={canvasRef}
        onPointerDown={(e) => {
          pointerInteracting.current = e.clientX - pointerInteractionMovement.current;
          canvasRef.current!.style.cursor = "grabbing";
        }}
        onPointerUp={() => {
          pointerInteracting.current = null;
          canvasRef.current!.style.cursor = "grab";
        }}
        onPointerOut={() => {
          pointerInteracting.current = null;
          if (canvasRef.current) canvasRef.current.style.cursor = "grab";
        }}
        onMouseMove={(e) => {
          if (pointerInteracting.current !== null) {
            const delta = e.clientX - pointerInteracting.current;
            pointerInteractionMovement.current = delta / 200;
          }
        }}
        onTouchMove={(e) => {
          if (pointerInteracting.current !== null && e.touches[0]) {
            const delta = e.touches[0].clientX - pointerInteracting.current;
            pointerInteractionMovement.current = delta / 200;
          }
        }}
        className="w-full h-full cursor-grab"
        style={{ contain: "layout paint size" }}
      />
    </div>
  );
}


/* ═══════════════════════ iOS Widget Card ═══════════════════════ */
function AppIcon({
  bg,
  iconSrc,
  alt,
}: {
  bg: string;
  iconSrc: string;
  alt: string;
}) {
  return (
    <div
      className="w-full h-full rounded-[16px] sm:rounded-[20px] flex items-center justify-center overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-[0_0_20px_rgba(255,255,255,0.15)] cursor-pointer"
      style={{ background: bg, boxShadow: "inset 0 1px 1px rgba(255,255,255,0.15)" }}
    >
      <img src={iconSrc} alt={alt} className="w-6 h-6 sm:w-8 sm:h-8 drop-shadow-md" />
    </div>
  );
}

/* ═══════════════════════ Notification Stack ═══════════════════════ */
const PROJECTS = [
  {
    id: "vocra",
    app: "VOCRA AI",
    iconSrc: "https://cdn.simpleicons.org/openai/ffffff",
    iconBg: "linear-gradient(135deg,#000000,#222222)",
    time: "now",
    body: "Interview session finished — candidate scored 94% accuracy",
  },
  {
    id: "camp",
    app: "CAMPCONNECT",
    iconSrc: "https://cdn.simpleicons.org/firebase/ffffff",
    iconBg: "linear-gradient(135deg,#e65c00,#F9D423)",
    time: "2m",
    body: "15 students enrolled in your ML Bootcamp session today",
  },
  {
    id: "jarvis",
    app: "JARVIS VOICE",
    iconSrc: "https://cdn.simpleicons.org/amazonalexa/ffffff",
    iconBg: "linear-gradient(135deg,#000000,#0f172a)",
    time: "5m",
    body: 'Voice command triggered — "Deploy to production" ✓',
  },
  {
    id: "portfolio",
    app: "PORTFOLIO",
    iconSrc: "https://cdn.simpleicons.org/vercel/ffffff",
    iconBg: "linear-gradient(135deg,#000000,#434343)",
    time: "8m",
    body: "New visitor from San Francisco viewed your portfolio",
  },
] as const;

type Project = (typeof PROJECTS)[number];

function NotificationStack() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setActive((a) => (a + 1) % PROJECTS.length);
    }, 4000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="relative flex-col items-center flex-shrink-0 w-full" style={{ height: "100px" }}>
      <div className="absolute top-0 left-0 right-0 h-[80px] perspective-1000">
        {PROJECTS.map((notif, index) => {
          const offset = (index - active + PROJECTS.length) % PROJECTS.length;
          const isLeaving = offset === PROJECTS.length - 1;

          return (
            <motion.div
              key={notif.id}
              className="absolute inset-x-0 sm:inset-x-1 top-0 rounded-[22px] overflow-hidden border border-white/[0.12] sm:border-white/[0.15]"
              style={{
                height: "82px",
                background: "rgba(255,255,255,0.06)",
                backdropFilter: "blur(40px)",
                WebkitBackdropFilter: "blur(40px)",
                transformOrigin: "top center",
                boxShadow: "inset 0 1px 1px rgba(255,255,255,0.15), 0 10px 30px rgba(0,0,0,0.3)",
              }}
              animate={{
                top: isLeaving ? 24 : offset * 12,
                scale: isLeaving ? 0.95 : 1 - offset * 0.04,
                opacity: isLeaving ? 0 : offset > 2 ? 0 : 1 - offset * 0.15,
                zIndex: PROJECTS.length - offset,
              }}
              transition={{ duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
            >
              <div className="flex items-start gap-4 h-full px-4 py-[14px] cursor-pointer hover:bg-white/[0.04] transition-colors group">
                <div
                  className="w-10 h-10 sm:w-11 sm:h-11 rounded-[12px] flex-shrink-0 flex items-center justify-center shadow-[inset_0_1px_1px_rgba(255,255,255,0.2),0_4px_10px_rgba(0,0,0,0.2)] transition-transform group-hover:scale-105"
                  style={{ background: notif.iconBg, boxShadow: "inset 0 1px 1px rgba(255,255,255,0.25)" }}
                >
                  <img src={notif.iconSrc} alt={notif.app} className="w-[22px] h-[22px] drop-shadow-md" />
                </div>

                <div className="flex-1 min-w-0 text-left pt-0.5">
                  <div className="flex items-center justify-between mb-0.5">
                    <span className="text-[14px] sm:text-[15px] font-semibold text-white/95 tracking-tight truncate">
                      {notif.app}
                    </span>
                    <span className="text-[12px] sm:text-[13px] text-white/40 font-medium ml-2 flex-shrink-0">{notif.time}</span>
                  </div>
                  <p className="text-[13px] sm:text-[14px] text-white/70 leading-tight line-clamp-2 pr-2 tracking-tight font-normal">
                    {notif.body}
                  </p>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

/* ═══════════════════════ iOS Widget Card ═══════════════════════ */
function IOSWidgetsCard() {
  return (
    <div className="absolute inset-0 p-4 sm:p-5 flex flex-col gap-3 sm:gap-4 overflow-hidden select-none">

      {/* ── ROW 1: Contact card (left) + 2×2 icons (right) ── */}
      <div className="flex gap-3 sm:gap-4" style={{ flex: "1 1 0", minHeight: 0 }}>
        {/* Contact card */}
        <div className="flex-1 rounded-[24px] bg-white/[0.06] hover:bg-white/[0.08] transition-all duration-300 hover:-translate-y-1 cursor-pointer border border-white/[0.12] p-4 flex flex-col min-w-0 overflow-hidden shadow-[inset_0_1px_1px_rgba(255,255,255,0.15),0_10px_30px_rgba(0,0,0,0.3)] backdrop-blur-[30px]">
          <div className="w-[42px] h-[42px] sm:w-[50px] sm:h-[50px] rounded-full overflow-hidden border border-white/20 shadow-sm flex-shrink-0 transition-transform duration-300 hover:scale-105">
            <img src="/avatar-ud.png" alt="Uditnarayan Das" className="w-full h-full object-cover" />
          </div>
          <div className="flex-1" />
          <div className="flex gap-[4px] sm:gap-[5px] mb-1.5 mt-2">
            <span className="w-1.5 h-1.5 sm:w-[6px] sm:h-[6px] rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]" />
            <span className="w-1.5 h-1.5 sm:w-[6px] sm:h-[6px] rounded-full bg-yellow-500" />
            <span className="w-1.5 h-1.5 sm:w-[6px] sm:h-[6px] rounded-full bg-orange-500" />
          </div>
          <p className="text-[14px] font-semibold text-white/95 leading-tight truncate tracking-tight">Uditnarayan Das</p>
          <p className="text-[12px] text-white/50 mt-0.5 truncate tracking-tight">udit@portfolio.dev</p>
        </div>

        {/* 2×2 icons */}
        <div className="grid grid-cols-2 grid-rows-2 gap-2 sm:gap-3 flex-shrink-0 aspect-square h-full">
          <AppIcon bg="linear-gradient(135deg,#1f3b2f,#2c6142)" iconSrc="https://cdn.simpleicons.org/react/61dafb" alt="React" />
          <AppIcon bg="linear-gradient(135deg,#3c1f6f,#7322b5)" iconSrc="https://cdn.simpleicons.org/nextdotjs/ffffff" alt="Next.js" />
          <AppIcon bg="linear-gradient(135deg,#7c3109,#d0460c)" iconSrc="https://cdn.simpleicons.org/typescript/ffffff" alt="TypeScript" />
          <AppIcon bg="linear-gradient(135deg,#1d4ed8,#2563eb)" iconSrc="https://cdn.simpleicons.org/tailwindcss/ffffff" alt="Tailwind" />
        </div>
      </div>

      {/* ── ROW 2: Animated notification stack ── */}
      <NotificationStack />

      {/* ── ROW 3: 2×2 icons (left) + Resume card (right) ── */}
      <div className="flex gap-3 sm:gap-4" style={{ flex: "1 1 0", minHeight: 0 }}>
        {/* 2×2 icons */}
        <div className="grid grid-cols-2 grid-rows-2 gap-2 sm:gap-3 flex-shrink-0 aspect-square h-full">
          <AppIcon bg="linear-gradient(135deg,#be123c,#e11d48)" iconSrc="https://cdn.simpleicons.org/nodedotjs/ffffff" alt="Node.js" />
          <AppIcon bg="linear-gradient(135deg,#854d0e,#ca8a04)" iconSrc="https://cdn.simpleicons.org/github/ffffff" alt="GitHub" />
          <AppIcon bg="linear-gradient(135deg,#075985,#0369a1)" iconSrc="https://cdn.simpleicons.org/docker/ffffff" alt="Docker" />
          <AppIcon bg="linear-gradient(135deg,#1e3a5f,#2d5986)" iconSrc="https://cdn.simpleicons.org/python/ffffff" alt="Python" />
        </div>

        {/* Resume Card */}
        <a
          href="/resume.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 rounded-[24px] bg-white/[0.06] hover:bg-white/[0.08] transition-all duration-300 hover:-translate-y-1 cursor-pointer border border-white/[0.12] p-4 flex flex-col min-w-0 overflow-hidden shadow-[inset_0_1px_1px_rgba(255,255,255,0.15),0_10px_30px_rgba(0,0,0,0.3)] backdrop-blur-[30px] group"
        >
          <div className="w-[42px] h-[42px] sm:w-[50px] sm:h-[50px] rounded-[14px] sm:rounded-[16px] bg-blue-500/15 border border-blue-400/20 shadow-sm flex-shrink-0 flex items-center justify-center transition-transform duration-300 group-hover:scale-105 group-hover:bg-blue-500/25">
            <FileText className="w-5 h-5 sm:w-6 sm:h-6 text-blue-400 group-hover:text-blue-300 transition-colors" />
          </div>
          <div className="flex-1" />
          <div className="flex items-center gap-[6px] mb-1.5 mt-2">
            <span className="w-1.5 h-1.5 sm:w-[6px] sm:h-[6px] rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)] shrink-0 animate-pulse" />
            <span className="text-[10px] sm:text-[11px] text-white/50 font-semibold tracking-wider small-caps uppercase truncate">
              Resume .PDF
            </span>
          </div>
          <div className="flex justify-between items-center gap-1">
            <p className="text-[12px] sm:text-[14px] font-semibold text-white/95 group-hover:text-white leading-[1.1] transition-colors truncate tracking-tight">
              Preview & Save
            </p>
            <Download className="w-[14px] h-[14px] sm:w-4 sm:h-4 text-white/30 group-hover:text-white/80 transition-colors shrink-0" />
          </div>
        </a>
      </div>

    </div>
  );
}

/* ═══════════════════════ Tech Badge ═══════════════════════ */
function TechBadge({ name, color, icon }: { name: string; color?: string; icon?: string }) {
  return (
    <div className="flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.03] px-3.5 py-[7px] text-[11px] font-medium text-neutral-300 transition-all duration-300 hover:border-white/15 hover:bg-white/[0.06] hover:text-white select-none whitespace-nowrap">
      {icon ? (
        <img
          src={`https://cdn.simpleicons.org/${icon}/${color?.replace('#', '') || 'white'}`}
          alt={name}
          className="h-3 w-3 flex-shrink-0 opacity-90 group-hover:opacity-100 transition-opacity"
        />
      ) : (
        <span
          className="h-2 w-2 rounded-full flex-shrink-0"
          style={{ backgroundColor: color || "#ff2a2a" }}
        />
      )}
      <span>{name}</span>
    </div>
  );
}

/* ═══════════════════════ Marquee Row ═══════════════════════ */
function Marquee({ items, direction = "left", speed = 20 }: { items: { name: string; color: string; icon?: string }[], direction?: "left" | "right", speed?: number }) {
  return (
    <div className="flex w-full overflow-hidden py-0.5 [mask-image:linear-gradient(to_right,transparent,white_15%,white_85%,transparent)]">
      <motion.div
        initial={{ x: direction === "left" ? 0 : "-50%" }}
        animate={{ x: direction === "left" ? "-50%" : 0 }}
        transition={{ duration: speed, repeat: Infinity, ease: "linear" }}
        className="flex flex-nowrap min-w-max gap-3 px-1.5"
      >
        {/* Render items twice for seamless loop */}
        {[...items, ...items].map((tech, i) => (
          <TechBadge key={`${tech.name}-${i}`} name={tech.name} color={tech.color} icon={tech.icon} />
        ))}
      </motion.div>
    </div>
  );
}

/* ═══════════════════════ Service Marquee Card ═══════════════════════ */
function ServiceMarqueeCard({
  title,
  subtitle,
}: {
  title: string;
  subtitle: string;
}) {
  return (
    <div className="flex-shrink-0 w-[200px] md:w-[220px] bento-card p-5 relative overflow-hidden group hover:scale-[1.02] transition-transform duration-300">
      {/* Grid pattern background */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />
      <div className="relative z-10">
        <h4 className="text-[13px] font-semibold text-white/80 leading-snug mb-1.5">
          {title}
        </h4>
        <p className="text-[11px] text-neutral-600 leading-relaxed">
          {subtitle}
        </p>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   MAIN BENTO SECTION
   ═══════════════════════════════════════════════════════════ */
export function BentoSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });

  const [emailCopied, setEmailCopied] = useState(false);
  const [activeLocation, setActiveLocation] = useState("India");

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("dasuditnarayan9@gmail.com");
    setEmailCopied(true);
    setTimeout(() => setEmailCopied(false), 2000);
  };


  // Cursor glow tracking on bento cards
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const handleMouseMove = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest<HTMLElement>(".bento-card");
      if (!target) return;
      const rect = target.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      target.style.setProperty("--mouse-x", `${x}px`);
      target.style.setProperty("--mouse-y", `${y}px`);
    };

    section.addEventListener("mousemove", handleMouseMove);
    return () => section.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Infinite marquee scroll
  useEffect(() => {
    const container = marqueeRef.current;
    if (!container) return;

    let animId: number;
    let pos = 0;
    const speed = 0.5;

    function tick() {
      pos += speed;
      const halfWidth = container!.scrollWidth / 2;
      if (pos >= halfWidth) pos = 0;
      container!.style.transform = `translateX(-${pos}px)`;
      animId = requestAnimationFrame(tick);
    }

    animId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animId);
  }, []);

  const techStack1 = [
    { name: "Next.js", icon: "nextdotjs", color: "#ffffff" },
    { name: "React", icon: "react", color: "#61dafb" },
    { name: "TypeScript", icon: "typescript", color: "#3178c6" },
    { name: "Tailwind", icon: "tailwindcss", color: "#38bdf8" },
    { name: "Framer Motion", icon: "framer", color: "#ffffff" },
    { name: "GSAP", icon: "greensock", color: "#88ce02" },
    { name: "Lucide", icon: "lucide", color: "#f24e1e" },
  ];

  const techStack2 = [
    { name: "Node.js", icon: "nodedotjs", color: "#339933" },
    { name: "Prisma", icon: "prisma", color: "#ffffff" },
    { name: "Zustand", icon: "zustand", color: "#453f39" },
    { name: "AWS", icon: "amazonaws", color: "#ff9900" },
    { name: "Docker", icon: "docker", color: "#2496ed" },
    { name: "PostgreSQL", icon: "postgresql", color: "#336791" },
    { name: "Redis", icon: "redis", color: "#dc382d" },
  ];

  const techStack3 = [
    { name: "React Query", icon: "reactquery", color: "#ff4154" },
    { name: "React Router", icon: "reactrouter", color: "#f44250" },
    { name: "Supabase", icon: "supabase", color: "#3ecf8e" },
    { name: "Zod", icon: "zod", color: "#3068b7" },
    { name: "Clerk", icon: "clerk", color: "#6c47ff" },
    { name: "Stripe", icon: "stripe", color: "#635bff" },
    { name: "Vercel", icon: "vercel", color: "#ffffff" },
  ];

  const services = [
    { title: "Full-Stack Development", subtitle: "End-to-end web applications with modern architecture" },
    { title: "UI/UX Design", subtitle: "Pixel-perfect interfaces with user-centric flows" },
    { title: "Cloud & DevOps", subtitle: "Infrastructure, CI/CD, and containerized deployments" },
    { title: "AI Integration", subtitle: "LLMs, vector search, and smart automation" },
    { title: "Database Design", subtitle: "Optimized data modeling and real-time sync" },
    { title: "Performance Tuning", subtitle: "Core Web Vitals mastery and optimization" },
    { title: "API Architecture", subtitle: "RESTful and GraphQL API design patterns" },
    { title: "Mobile Responsive", subtitle: "Seamless cross-device adaptive experiences" },
  ];

  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        delay: i * 0.12,
        ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
      },
    }),
  };

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative w-full pt-4 pb-20 md:py-32 overflow-hidden"
    >
      <div className="relative z-10 mx-auto max-w-[1200px] px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-5">
          {/* LEFT COLUMN */}
          <div className="md:col-span-7 flex flex-col gap-4 md:gap-5">
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              custom={0}
              className="bento-card relative overflow-hidden h-[260px] md:h-[290px] p-6 group"
            >
              <TextRevealCard
                text={"You know\nthe business"}
                revealText={"I know\nthe Chemistry"}
                className="w-full h-full bg-transparent border-none p-2 md:p-5 flex flex-col items-center justify-center translate-y-2"
              >
                <div className="flex flex-col leading-tight tracking-tight max-w-[650px] mb-4 items-center text-center pt-2">
                  <h3 className="font-serif font-bold italic text-white text-lg md:text-2xl lg:text-[32px] tracking-tighter">
                    Helping{" "}
                    <FlipWords
                      duration={2000}
                      words={[
                        "startups", "founders", "creators", "brands", "businesses",
                        "teams", "innovators", "companies", "visionaries",
                        "entrepreneurs", "builders", "agencies",
                      ]}
                      className="bg-clip-text text-transparent bg-gradient-to-r from-red-300 via-red-400 to-red-500 p-0"
                    />
                  </h3>
                  <p className="font-serif italic text-neutral-500 text-lg md:text-xl lg:text-[26px] tracking-tight mt-1">
                    build impactful digital products because
                  </p>
                </div>
              </TextRevealCard>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
              {/* CARD 3: Globe */}
              <motion.div
                variants={fadeUp}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                custom={2}
                className="bento-card p-5 md:p-6 relative overflow-hidden h-[380px] md:h-[400px] flex flex-col group"
              >
                <div className="relative z-10 flex flex-col text-center">
                  <h3 className="font-sans italic font-bold text-lg md:text-xl leading-snug bg-clip-text text-transparent bg-gradient-to-r from-white via-red-100 to-red-300">
                    I&apos;m highly adaptable
                  </h3>
                  <h3 className="font-sans italic font-bold text-xl md:text-2xl leading-none bg-clip-text text-transparent bg-gradient-to-r from-red-300 via-red-400 to-red-500 mb-4 whitespace-nowrap">
                    across global time zones
                  </h3>
                  <div className="flex flex-wrap justify-center gap-2 mb-4">
                    {[
                      { code: "GB", label: "UK" },
                      { code: "IN", label: "India" },
                      { code: "US", label: "USA" },
                    ].map((tz) => (
                      <button
                        key={tz.code}
                        onClick={() => setActiveLocation(tz.label)}
                        className={`flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-[9px] font-bold uppercase tracking-wider border transition-all ${activeLocation === tz.label
                          ? "border-red-500/50 bg-red-950/30 text-red-500"
                          : "border-white/[0.08] bg-white/[0.03] text-neutral-500"
                          }`}
                      >
                        {tz.label}
                      </button>
                    ))}
                  </div>
                </div>
                <CobeGlobe />
                <div className="absolute bottom-5 left-6 z-10 flex flex-col gap-0.5">
                  <span className="text-[8px] font-medium uppercase text-neutral-600 flex items-center gap-1">
                    <Globe2 className="h-2.5 w-2.5" /> Remote
                  </span>
                  <motion.span
                    key={activeLocation}
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-sm font-bold text-white"
                  >
                    {activeLocation}
                  </motion.span>
                </div>
              </motion.div>

              {/* CARD 4: iOS Widgets */}
              <motion.div
                variants={fadeUp}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                custom={3}
                className="bento-card p-0 relative overflow-hidden h-[380px] md:h-[400px] flex flex-col group"
              >
                <IOSWidgetsCard />
              </motion.div>
            </div>
          </div>

          {/* RIGHT COLUMN */}
          <div className="md:col-span-5 flex flex-col gap-4 md:gap-5">
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              custom={1}
              className="bento-card p-6 md:p-8 relative overflow-hidden h-[580px] md:h-[710px] group flex flex-col"
            >
              <div className="relative z-10 flex flex-col items-center text-center h-full pt-1.5 overflow-hidden">
                <h3 className="font-sans italic font-bold text-lg md:text-xl leading-snug bg-clip-text text-transparent bg-gradient-to-r from-white via-red-100 to-red-300 flex-shrink-0">
                  Building with the latest
                </h3>
                <h3 className="font-sans italic font-bold text-xl md:text-2xl leading-none bg-clip-text text-transparent bg-gradient-to-r from-red-300 via-red-400 to-red-500 mb-5 flex-shrink-0">
                  technologies
                </h3>
                <div className="w-full flex flex-col gap-2 mb-6 flex-shrink-0 relative">
                  <Marquee items={techStack1} direction="left" speed={25} />
                  <Marquee items={techStack2} direction="right" speed={30} />
                  <Marquee items={techStack3} direction="left" speed={28} />
                </div>
                <div className="w-full flex-1 min-h-0 overflow-hidden opacity-90 scale-[0.95] origin-top">
                  <Terminal
                    commands={["whoami", "cat about.txt", "ls projects/", "cat skills.json", "echo $CAREER_GOAL"]}
                    outputs={{
                      0: ["Uditnarayan Das"],
                      1: ["Passionate fresher focused on AI, full-stack development, and building useful real-world products."],
                      2: ["Jarvis-Voice-Assistant  Vocra-AI-Interviewer", "CampConnect              Pygame-Projects"],
                      3: ["[\"Python\", \"React\", \"JavaScript\", \"PyTorch\", \"TensorFlow\", \"HuggingFace\", \"Flask\"]"],
                      4: ["AI Engineer"]
                    }}
                    username="udit@ai-portfolio"
                    className="w-full h-full"
                  />
                </div>
              </div>
            </motion.div>
          </div>

          {/* CARD 6: Scrolling Services */}
          {/* <motion.div
            variants={fadeUp}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            custom={5}
            className="md:col-span-12 relative overflow-hidden"
          >
            <div className="mb-4 flex items-center justify-between px-1">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-600 block mb-1">
                  Things I&apos;m doing
                </span>
                <h3 className="text-base md:text-lg font-semibold text-white/90">
                  Building Digital Products
                </h3>
              </div>
            </div>
            <div className="relative overflow-hidden">
              <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-16 z-10 bg-gradient-to-r from-black to-transparent" />
              <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-16 z-10 bg-gradient-to-l from-black to-transparent" />
              <div
                ref={marqueeRef}
                className="flex gap-4 will-change-transform"
                style={{ width: "max-content" }}
              >
                {[...services, ...services].map((s, i) => (
                  <ServiceMarqueeCard
                    key={`${s.title}-${i}`}
                    title={s.title}
                    subtitle={s.subtitle}
                  />
                ))}
              </div>
            </div>
          </motion.div> */}
        </div>
      </div>
    </section>
  );
}
