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
function TechBadge({ name, color }: { name: string; color?: string }) {
  return (
    <div className="flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.03] px-3.5 py-[7px] text-[11px] font-medium text-neutral-300 transition-all duration-300 hover:border-white/15 hover:bg-white/[0.06] hover:text-white select-none whitespace-nowrap">
      <span
        className="h-2 w-2 rounded-full flex-shrink-0"
        style={{ backgroundColor: color || "#ff2a2a" }}
      />
      <span>{name}</span>
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
  const sectionRef = useRef<HTMLDivElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });

  const [emailCopied, setEmailCopied] = useState(false);
  const [activeLocation, setActiveLocation] = useState("India");

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("dasuditnarayan9@gmail.com");
    setEmailCopied(true);
    setTimeout(() => setEmailCopied(false), 2000);
  };

  // GSAP parallax
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".bento-parallax").forEach((el) => {
        gsap.fromTo(
          el,
          { y: 30 },
          {
            y: -15,
            ease: "none",
            scrollTrigger: {
              trigger: el,
              start: "top bottom",
              end: "bottom top",
              scrub: 1.5,
            },
          }
        );
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

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

  const techStack = [
    { name: "Next.js", color: "#ffffff" },
    { name: "TypeScript", color: "#3178c6" },
    { name: "Tailwind", color: "#38bdf8" },
    { name: "Motion", color: "#f5c518" },
    { name: "Prisma", color: "#5a67d8" },
    { name: "Zustand", color: "#453f39" },
    { name: "AWS", color: "#ff9900" },
    { name: "Docker", color: "#2496ed" },
    { name: "React Query", color: "#ff4154" },
    { name: "React Router", color: "#f44250" },
    { name: "Supabase", color: "#3ecf8e" },
    { name: "Zod", color: "#3068b7" },
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
      className="relative w-full py-20 md:py-32 overflow-hidden"
    >

      <div className="relative z-10 mx-auto max-w-[1200px] px-4 sm:px-6">
        {/* ═══════════════ BENTO GRID ═══════════════ */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-5">

          {/* ──── CARD 1: Partnership (Top-Left, spans 7 cols) ──── */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            custom={0}
            className="bento-card bento-parallax md:col-span-7 relative overflow-hidden group"
          >
            <TextRevealCard
              text="You know the business"
              revealText="I know the Chemistry"
              className="w-full h-full bg-transparent border-none p-4 md:p-6 flex flex-col items-center justify-center"
            >
              <div className="flex flex-col leading-[1.05] tracking-tight max-w-[650px] mb-2 items-center text-center">
                <h3 className="font-serif font-bold italic text-white text-2xl md:text-3xl lg:text-4xl tracking-tighter">
                  Helping{" "}
                  <FlipWords
                    duration={2000}
                    words={[
                      "startups",
                      "founders",
                      "creators",
                      "brands",
                      "businesses",
                      "teams",
                      "innovators",
                      "companies",
                      "visionaries",
                      "entrepreneurs",
                      "builders",
                      "agencies",
                    ]}
                    className="text-emerald-400 p-0"
                  />
                </h3>
                <p className="font-serif italic text-neutral-500 text-2xl md:text-3xl lg:text-4xl tracking-tight mt-1">
                  build impactful digital products because
                </p>
              </div>
            </TextRevealCard>
          </motion.div>

          {/* ──── CARD 2: Tech Stack (Top-Right, tall, spans 2 rows) ──── */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            custom={1}
            className="bento-card bento-parallax md:col-span-5 md:row-span-2 p-6 md:p-8 relative overflow-hidden group"
          >
            <div className="relative z-10">
              <h3 className="font-serif text-xl md:text-[22px] italic text-white/90 leading-snug">
                Focused on latest digital
              </h3>
              <h3 className="font-serif text-xl md:text-[22px] italic text-white/90 mb-7">
                innovations
              </h3>

              <div className="flex flex-wrap gap-2.5">
                {techStack.map((tech) => (
                  <TechBadge key={tech.name} name={tech.name} color={tech.color} />
                ))}
              </div>
            </div>
          </motion.div>

          {/* ─── Nested Bottom Grid (7 cols) ─── */}
          <div className="md:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
            {/* ──── CARD 3: Globe / Time Zones (Bottom-Left) ──── */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              custom={2}
              className="bento-card bento-parallax p-5 md:p-6 relative overflow-hidden min-h-[380px] md:min-h-[400px] group"
            >
              <div className="relative z-10">
                <h3 className="font-serif text-base md:text-lg italic text-white/90 leading-snug">
                  Seamlessly Syncing
                </h3>
                <h3 className="font-serif text-base md:text-lg italic text-white/50 mb-3">
                  Across Global Time Zones
                </h3>

                <div className="grid grid-cols-3 gap-1.5 md:flex md:flex-wrap">
                  {[
                    { code: "GB", label: "UK" },
                    { code: "IN", label: "India" },
                    { code: "US", label: "USA" },
                  ].map((tz) => (
                    <button
                      key={tz.code}
                      onClick={() => setActiveLocation(tz.label)}
                      className={`flex items-center justify-center gap-1 rounded-full px-2 py-1 md:px-2.5 text-[8px] md:text-[9px] font-semibold uppercase tracking-wider border transition-all duration-300 ${activeLocation === tz.label
                        ? "border-white/20 bg-white/10 text-white"
                        : "border-white/[0.08] bg-white/[0.03] text-neutral-500 hover:border-white/15 hover:text-neutral-400"
                        }`}
                    >
                      <span>{tz.code}</span>
                      <span className="text-neutral-600 hidden sm:inline">{tz.label}</span>
                      <span className="text-neutral-600 sm:hidden">{tz.label.slice(0, 3)}</span>
                    </button>
                  ))}
                </div>
              </div>

              <CobeGlobe />

              {/* Location label */}
              <div className="absolute bottom-5 left-6 z-10 flex flex-col gap-0.5">
                <span className="text-[8px] font-medium uppercase tracking-[0.15em] text-neutral-600 flex items-center gap-1">
                  <Globe2 className="h-2.5 w-2.5" /> Remote
                </span>
                <motion.span
                  key={activeLocation}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-sm font-bold text-white transition-opacity duration-300"
                >
                  {activeLocation}
                </motion.span>
              </div>
            </motion.div>

            {/* ──── CARD 4: CTA "Let's innovate together" ──── */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              custom={3}
              className="bento-card bento-parallax p-5 md:p-6 relative overflow-hidden flex flex-col items-center justify-center text-center group"
            >
              <div className="relative z-10 flex flex-col items-center gap-3">
                {/* Monogram */}
                <div className="flex items-center justify-center">
                  <span className="text-3xl font-black text-white/90 tracking-tighter select-none italic font-serif">
                    UD
                  </span>
                </div>

                <h3 className="text-sm md:text-[15px] font-semibold text-white/90 leading-snug">
                  Let&apos;s innovate together
                </h3>
                <p className="text-[11px] text-neutral-500 leading-relaxed">
                  Ready to bring your vision to life?
                </p>

                <button
                  onClick={handleCopyEmail}
                  className="flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.03] px-3.5 py-2 text-[11px] font-medium text-neutral-300 hover:border-white/15 hover:bg-white/[0.06] hover:text-white transition-all duration-300"
                >
                  {emailCopied ? (
                    <Check className="h-3 w-3 text-green-400" />
                  ) : (
                    <Copy className="h-3 w-3" />
                  )}
                  <span className="text-[10px]">dasuditnarayan9@gmail.com</span>
                </button>

                <span className="text-[9px] text-neutral-600 mt-1">
                  Get in touch via email
                </span>
              </div>
            </motion.div>
          </div>

          {/* ──── CARD 6: Scrolling Services (Full-width) ──── */}
          <motion.div
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

            {/* Infinite Marquee */}
            <div className="relative overflow-hidden">
              {/* Fade edges */}
              <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-16 z-10 bg-gradient-to-r from-black to-transparent" />
              <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-16 z-10 bg-gradient-to-l from-black to-transparent" />

              <div
                ref={marqueeRef}
                className="flex gap-4 will-change-transform"
                style={{ width: "max-content" }}
              >
                {/* Duplicate services for seamless loop */}
                {[...services, ...services].map((s, i) => (
                  <ServiceMarqueeCard
                    key={`${s.title}-${i}`}
                    title={s.title}
                    subtitle={s.subtitle}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
