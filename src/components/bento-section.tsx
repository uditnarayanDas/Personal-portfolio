"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useInView } from "motion/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Heart,
  Mail,
  Copy,
  Check,
  ArrowRight,
  Globe2,
  Code2,
  Palette,
  Smartphone,
  Server,
  Database,
  Zap,
  Sparkles,
  ShieldCheck,
} from "lucide-react";
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

              {/* CARD 4: UD Tesseract 3D Core */}
              <motion.div
                variants={fadeUp}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                custom={3}
                className="bento-card p-0 relative h-[380px] md:h-[400px] flex flex-col group bg-[#020202] border-white/10 overflow-hidden"
                onMouseMove={(e) => {
                  const target = e.currentTarget;
                  const rect = target.getBoundingClientRect();
                  const x = (e.clientX - rect.left) / rect.width - 0.5;
                  const y = (e.clientY - rect.top) / rect.height - 0.5;
                  // Map mouse coordinates to rotation values
                  target.style.setProperty("--rx", `${-y * 50}deg`);
                  target.style.setProperty("--ry", `${x * 50}deg`);
                  target.style.setProperty("--mx", `${e.clientX - rect.left}px`);
                  target.style.setProperty("--my", `${e.clientY - rect.top}px`);
                }}
                onMouseLeave={(e) => {
                  const target = e.currentTarget;
                  target.style.setProperty("--rx", `0deg`);
                  target.style.setProperty("--ry", `0deg`);
                }}
                style={{ perspective: "1000px" }}
              >
                {/* 1. Mouse Follower Background Glow (2D, Wall layer) */}
                <div 
                  className="absolute inset-0 z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                  style={{
                    background: "radial-gradient(400px circle at var(--mx, 50%) var(--my, 50%), rgba(255, 0, 0, 0.2), transparent 60%)"
                  }}
                />

                {/* 2. The 3D Preserve Container (Everything inside rotates together) */}
                <div 
                  className="w-full h-full absolute inset-0 flex items-center justify-center transition-transform duration-[400ms] ease-out pointer-events-none"
                  style={{ 
                    transform: "rotateX(var(--rx, 0deg)) rotateY(var(--ry, 0deg))", 
                    transformStyle: "preserve-3d" 
                  }}
                >
                  {/* LAYER -150px: Deep Blackhole Void */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none" style={{ transform: "translateZ(-150px)" }}>
                    <div className="w-[300px] h-[300px] rounded-full border border-red-500/10 bg-red-950/20 blur-xl animate-[spin_10s_linear_infinite]" />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] h-[200px] rounded-full bg-red-600/10 blur-3xl group-hover:bg-red-600/30 group-hover:scale-150 transition-all duration-1000 animate-pulse" />
                  </div>

                  {/* LAYER -80px: Glowing Rotating Rings / Matrix Data */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none" style={{ transform: "translateZ(-80px)" }}>
                    <div className="w-[280px] h-[280px] rounded-full border-2 border-dashed border-red-500/20 animate-[spin_20s_linear_infinite]" />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[320px] h-[320px] rounded-full border border-white/5 animate-[spin_15s_linear_infinite_reverse]" />
                    
                    {/* Far background Text */}
                    <div className="absolute -top-10 -left-10 text-[8px] font-mono text-red-500/30 font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-1000 delay-100">
                      SYS.OVERRIDE_ENABLED
                    </div>
                  </div>

                  {/* LAYER -40px: Infinite Mirrors / Echoes of the Monogram */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-40 group-hover:opacity-100 transition-opacity duration-700" style={{ transform: "translateZ(-40px)" }}>
                    <span className="text-8xl font-black italic font-serif text-transparent bg-clip-text bg-gradient-to-b from-red-500/20 to-transparent blur-md scale-[1.3] group-hover:scale-[1.8] group-hover:from-red-600/40 transition-all duration-1000">
                      UD
                    </span>
                  </div>

                  {/* LAYER 0: The Core Glass Monogram (The physical object) */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none" style={{ transform: "translateZ(20px)" }}>
                    <div className="relative w-40 h-40 flex items-center justify-center group/core">
                      {/* The Glass Cube */}
                      <div className="absolute inset-0 bg-white/[0.03] border border-white/10 rounded-2xl backdrop-blur-md shadow-[0_0_50px_rgba(255,0,0,0.1)] group-hover:shadow-[0_0_80px_rgba(255,0,0,0.4)] transition-all duration-500 group-hover:border-red-500/30 overflow-hidden">
                        {/* Scanning Laser Line inside the glass */}
                        <motion.div 
                          className="absolute left-0 right-0 h-px bg-red-400 shadow-[0_0_15px_red] opacity-0 group-hover:opacity-100 transition-opacity"
                          animate={{ top: ["0%", "100%", "0%"] }}
                          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                        />
                      </div>
                      
                      {/* The Monogram */}
                      <span className="relative z-10 text-6xl font-black italic font-serif text-transparent bg-clip-text bg-gradient-to-br from-white via-neutral-100 to-neutral-400 drop-shadow-[0_0_15px_rgba(255,255,255,0.3)] group-hover:from-white group-hover:via-red-100 group-hover:to-red-600 transition-all duration-500 select-none">
                        UD
                      </span>

                      {/* Sci-fi corners */}
                      <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-red-500/50 rounded-tl-xl transition-all duration-500 group-hover:w-8 group-hover:h-8" />
                      <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-red-500/50 rounded-tr-xl transition-all duration-500 group-hover:w-8 group-hover:h-8" />
                      <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-red-500/50 rounded-bl-xl transition-all duration-500 group-hover:w-8 group-hover:h-8" />
                      <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-red-500/50 rounded-br-xl transition-all duration-500 group-hover:w-8 group-hover:h-8" />
                    </div>
                  </div>

                  {/* LAYER 60px: Floating Overlays / Target sights */}
                  <div className="absolute inset-0 pointer-events-none flex items-center justify-center" style={{ transform: "translateZ(60px)" }}>
                    <div className="w-[180px] h-[180px] border border-white/5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-[1s]" />
                    {/* Crosshairs & HUD Elements */}
                    <div className="absolute top-[20%] left-[20%] w-2 h-2 bg-red-500 shadow-[0_0_10px_red] rounded-full animate-ping pointer-events-none" />
                    <div className="absolute bottom-[30%] right-[30%] w-1.5 h-1.5 bg-white shadow-[0_0_10px_white] rounded-full animate-pulse pointer-events-none" />
                    
                    <div className="absolute top-[35%] right-[25%] opacity-0 group-hover:opacity-100 transition-opacity duration-1000 delay-300">
                       <span className="text-[7px] font-mono text-red-400 rotate-90 block">TRACKING...</span>
                    </div>
                  </div>

                  {/* LAYER 100px: Extreme Foreground Action Button & Readouts */}
                  <div className="absolute inset-x-0 bottom-0 top-0 flex flex-col justify-between p-6 pointer-events-none" style={{ transform: "translateZ(100px)" }}>
                    {/* Top Topo Readouts */}
                    <div className="flex justify-between items-start opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                      <div className="flex flex-col gap-1 backdrop-blur-sm bg-black/20 p-2 rounded border border-white/5 group-hover:border-red-500/20">
                        <span className="text-[8px] font-mono font-bold text-red-500 tracking-widest flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                          DIMENSIONAL SYNC
                        </span>
                        <span className="text-[10px] font-mono text-white/80 animate-pulse">LOCK_ACQUIRED</span>
                      </div>
                      
                      <div className="text-[8px] font-mono text-neutral-500 text-right backdrop-blur-sm bg-black/20 p-2 rounded border border-white/5">
                        <div>Z-INDEX: <span className="text-white">- 150</span></div>
                        <div className="text-red-400 animate-pulse">awaiting_input_</div>
                      </div>
                    </div>

                    {/* Button floating at the very front */}
                    <div className="flex justify-center mt-auto pb-4 pointer-events-auto">
                      <button
                        onClick={handleCopyEmail}
                        className="group/btn flex gap-2 items-center rounded-full border border-red-500/30 bg-black/60 backdrop-blur-xl px-5 py-3 text-[10px] font-bold uppercase tracking-[0.2em] text-white hover:bg-white/10 hover:border-red-500 transition-all shadow-[0_20px_40px_rgba(0,0,0,0.8)] hover:shadow-[0_0_30px_rgba(255,0,0,0.6)] hover:scale-[1.02] active:scale-95"
                      >
                        {emailCopied ? <Check className="h-4 w-4 text-red-500" /> : <Database className="h-4 w-4 text-red-400 group-hover/btn:text-white transition-colors animate-pulse" />}
                        <span>{emailCopied ? "Connection Established" : "Extract Data"}</span>
                      </button>
                    </div>
                  </div>

                </div>
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
