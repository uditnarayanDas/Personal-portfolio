/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import type { LucideIcon } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import * as React from "react";
import { cn } from "@/lib/utils";

export interface TabItem {
  id: string;
  title: string;
  icon?: LucideIcon;
  content?: React.ReactNode;
  cardContent?: React.ReactNode;
  color: string;
}

const WaveformPath = () => (
  <path
    d="M0 50 
           C 20 40, 40 30, 60 50
           C 80 70, 100 60, 120 50
           C 140 40, 160 30, 180 50
           C 200 70, 220 60, 240 50
           C 260 40, 280 30, 300 50
           C 320 70, 340 60, 360 50
           C 380 40, 400 30, 420 50
           L 420 100 L 0 100 Z"
  />
);

export const DEFAULT_TABS: TabItem[] = [
  {
    id: "Discover",
    title: "1. Step1",
    color: "bg-blue-500 hover:bg-blue-600",
    cardContent: (
      <div className="relative h-full w-full">
        <div className="absolute inset-x-0 bottom-0 h-32 overflow-hidden pointer-events-none">
          <svg
            aria-hidden="true"
            className="absolute bottom-0 left-0 w-full h-[150%] opacity-60 flex-shrink-0"
            preserveAspectRatio="none"
            role="presentation"
            viewBox="0 0 420 100"
          >
            <motion.g animate={{ opacity: 0.15 }} className="fill-blue-500 stroke-blue-500" initial={{ opacity: 0 }} style={{ strokeWidth: 1 }} transition={{ duration: 0.5 }}>
              <WaveformPath />
            </motion.g>
            <motion.g animate={{ opacity: 0.1 }} className="fill-blue-500 stroke-blue-500" initial={{ opacity: 0 }} style={{ strokeWidth: 1, transform: "translateY(10px)" }} transition={{ duration: 0.5 }}>
              <WaveformPath />
            </motion.g>
          </svg>
        </div>
        <div className="relative flex h-full flex-col items-center justify-center text-center px-4 sm:px-6 space-y-3 pb-20 pt-8 z-10">
          <h3 className="font-serif italic font-bold text-xl sm:text-xl md:text-2xl lg:text-3xl bg-clip-text text-transparent bg-gradient-to-r from-blue-300 via-blue-400 to-blue-500 tracking-tight">
            Understand & Plan
          </h3>
          <p className="max-w-[95%] sm:max-w-[85%] text-neutral-400 text-[9px] sm:text-[10px] md:text-[11px] leading-relaxed md:leading-relaxed">
            Every great digital product starts with a deep dive into core requirements. I actively analyze user needs, map out the optimal technical architecture, and establish a clear roadmap to ensure we build exactly what the market demands.
          </p>
        </div>
      </div>
    ),
  },
  {
    id: "Design",
    title: "2. Step2",
    color: "bg-purple-500 hover:bg-purple-600",
    cardContent: (
      <div className="relative h-full w-full">
        <div className="absolute inset-x-0 bottom-0 h-32 overflow-hidden pointer-events-none">
          <svg aria-hidden="true" className="absolute bottom-0 left-0 w-full h-[150%] opacity-60 flex-shrink-0" preserveAspectRatio="none" role="presentation" viewBox="0 0 420 100">
            <motion.g animate={{ opacity: 0.15 }} className="fill-purple-500 stroke-purple-500" initial={{ opacity: 0 }} style={{ strokeWidth: 1 }} transition={{ duration: 0.5 }}>
              <WaveformPath />
            </motion.g>
            <motion.g animate={{ opacity: 0.1 }} className="fill-purple-500 stroke-purple-500" initial={{ opacity: 0 }} style={{ strokeWidth: 1, transform: "translateY(10px)" }} transition={{ duration: 0.5 }}>
              <WaveformPath />
            </motion.g>
          </svg>
        </div>
        <div className="relative flex h-full flex-col items-center justify-center text-center px-4 sm:px-6 space-y-3 pb-20 pt-8 z-10">
          <h3 className="font-serif italic font-bold text-xl sm:text-xl md:text-2xl lg:text-3xl bg-clip-text text-transparent bg-gradient-to-r from-purple-300 via-purple-400 to-purple-500 tracking-tight">
            Crafting UX/UI
          </h3>
          <p className="max-w-[95%] sm:max-w-[85%] text-neutral-400 text-[9px] sm:text-[10px] md:text-[11px] leading-relaxed md:leading-relaxed">
            I design pixel-perfect, highly accessible, and fully responsive interfaces focused entirely on user experience. From wireframes to premium visual aesthetics, every interaction is curated to feel polished, dynamic, and engaging.
          </p>
        </div>
      </div>
    ),
  },
  {
    id: "Build",
    title: "3. Step3",
    color: "bg-emerald-500 hover:bg-emerald-600",
    cardContent: (
      <div className="relative h-full w-full">
        <div className="absolute inset-x-0 bottom-0 h-32 overflow-hidden pointer-events-none">
          <svg aria-hidden="true" className="absolute bottom-0 left-0 w-full h-[150%] opacity-60 flex-shrink-0" preserveAspectRatio="none" role="presentation" viewBox="0 0 420 100">
            <motion.g animate={{ opacity: 0.15 }} className="fill-emerald-500 stroke-emerald-500" initial={{ opacity: 0 }} style={{ strokeWidth: 1 }} transition={{ duration: 0.5 }}>
              <WaveformPath />
            </motion.g>
            <motion.g animate={{ opacity: 0.1 }} className="fill-emerald-500 stroke-emerald-500" initial={{ opacity: 0 }} style={{ strokeWidth: 1, transform: "translateY(10px)" }} transition={{ duration: 0.5 }}>
              <WaveformPath />
            </motion.g>
          </svg>
        </div>
        <div className="relative flex h-full flex-col items-center justify-center text-center px-4 sm:px-6 space-y-3 pb-20 pt-8 z-10">
          <h3 className="font-serif italic font-bold text-xl sm:text-xl md:text-2xl lg:text-3xl bg-clip-text text-transparent bg-gradient-to-r from-emerald-300 via-emerald-400 to-emerald-500 tracking-tight">
            Scalable Code
          </h3>
          <p className="max-w-[95%] sm:max-w-[85%] text-neutral-400 text-[9px] sm:text-[10px] md:text-[11px] leading-relaxed md:leading-relaxed">
            Utilizing cutting-edge frameworks like React, Next.js, and Node.js, I write clean, maintainable, and remarkably robust code. Security, performance, and type-safety are heavily prioritized natively for seamless scaling.
          </p>
        </div>
      </div>
    ),
  },
  {
    id: "Ship",
    title: "4. Step4",
    color: "bg-amber-500 hover:bg-amber-600",
    cardContent: (
      <div className="relative h-full w-full">
        <div className="absolute inset-x-0 bottom-0 h-32 overflow-hidden pointer-events-none">
          <svg aria-hidden="true" className="absolute bottom-0 left-0 w-full h-[150%] opacity-60 flex-shrink-0" preserveAspectRatio="none" role="presentation" viewBox="0 0 420 100">
            <motion.g animate={{ opacity: 0.15 }} className="fill-amber-500 stroke-amber-500" initial={{ opacity: 0 }} style={{ strokeWidth: 1 }} transition={{ duration: 0.5 }}>
              <WaveformPath />
            </motion.g>
            <motion.g animate={{ opacity: 0.1 }} className="fill-amber-500 stroke-amber-500" initial={{ opacity: 0 }} style={{ strokeWidth: 1, transform: "translateY(10px)" }} transition={{ duration: 0.5 }}>
              <WaveformPath />
            </motion.g>
          </svg>
        </div>
        <div className="relative flex h-full flex-col items-center justify-center text-center px-4 sm:px-6 space-y-3 pb-20 pt-8 z-10">
          <h3 className="font-serif italic font-bold text-xl sm:text-xl md:text-2xl lg:text-3xl bg-clip-text text-transparent bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500 tracking-tight">
            Launch & Optimize
          </h3>
          <p className="max-w-[95%] sm:max-w-[85%] text-neutral-400 text-[9px] sm:text-[10px] md:text-[11px] leading-relaxed md:leading-relaxed">
            Deployment isn&apos;t the finish line. With modern CI/CD pipelines, I seamlessly launch your product and continuously integrate tracking frameworks to constantly refine performance data and guarantee maximum digital impact.
          </p>
        </div>
      </div>
    ),
  },
];

interface SmoothTabProps {
  items?: TabItem[];
  defaultTabId?: string;
  className?: string;
  activeColor?: string;
  onChange?: (tabId: string) => void;
}

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? "10%" : "-10%",
    opacity: 0,
    filter: "blur(8px)",
    scale: 0.95,
    position: "absolute" as const,
  }),
  center: {
    x: 0,
    opacity: 1,
    filter: "blur(0px)",
    scale: 1,
    position: "absolute" as const,
  },
  exit: (direction: number) => ({
    x: direction < 0 ? "10%" : "-10%",
    opacity: 0,
    filter: "blur(8px)",
    scale: 0.95,
    position: "absolute" as const,
  }),
};

const transition = {
  duration: 0.4,
  ease: [0.32, 0.72, 0, 1],
};

export default function SmoothTab({
  items = DEFAULT_TABS,
  defaultTabId = DEFAULT_TABS[0]?.id,
  className,
  activeColor = "bg-[#1F9CFE]",
  onChange,
}: SmoothTabProps) {
  const [selected, setSelected] = React.useState<string>(defaultTabId);
  const [direction, setDirection] = React.useState(0);
  const [dimensions, setDimensions] = React.useState({ width: 0, left: 0 });

  // Reference for the selected button
  const buttonRefs = React.useRef<Map<string, HTMLButtonElement>>(new Map());
  const containerRef = React.useRef<HTMLDivElement>(null);

  // Update dimensions whenever selected tab changes or on mount
  React.useLayoutEffect(() => {
    const updateDimensions = () => {
      const selectedButton = buttonRefs.current.get(selected);
      const container = containerRef.current;

      if (selectedButton && container) {
        const rect = selectedButton.getBoundingClientRect();
        const containerRect = container.getBoundingClientRect();

        setDimensions({
          width: rect.width,
          left: rect.left - containerRect.left,
        });
      }
    };

    // Initial update
    requestAnimationFrame(() => {
      updateDimensions();
    });

    // Update on resize
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, [selected]);

  const handleTabClick = (tabId: string) => {
    const currentIndex = items.findIndex((item) => item.id === selected);
    const newIndex = items.findIndex((item) => item.id === tabId);
    setDirection(newIndex > currentIndex ? 1 : -1);
    setSelected(tabId);
    onChange?.(tabId);
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLButtonElement>,
    tabId: string
  ) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleTabClick(tabId);
    }
  };

  const selectedItem = items.find((item) => item.id === selected);

  return (
    <div className="flex h-full w-full flex-col absolute inset-0 rounded-2xl overflow-hidden">
      {/* Card Content Area - Fills the entire space now, wave stays precisely at bottom */}
      <div className="relative flex-1 w-full min-h-0 bg-transparent flex">
        <div className="relative h-full w-full overflow-hidden bg-transparent">
          <div className="absolute inset-0 overflow-hidden">
            <AnimatePresence custom={direction} initial={false} mode="wait">
              <motion.div
                animate="center"
                className="absolute inset-0 h-full w-full bg-transparent will-change-transform"
                custom={direction}
                exit="exit"
                initial="enter"
                key={`card-${selected}`}
                style={{
                  backfaceVisibility: "hidden",
                  WebkitBackfaceVisibility: "hidden",
                }}
                transition={transition as any}
                variants={slideVariants as any}
              >
                {selectedItem?.cardContent}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Bottom Toolbar */}
      <div className="absolute bottom-6 left-0 right-0 z-20 flex justify-center px-4 w-full">
        <div
          aria-label="Smooth tabs"
          className={cn(
            "relative flex items-center justify-between gap-1 sm:gap-2 p-1.5 h-12 sm:h-14",
            "w-full max-w-full sm:max-w-[350px]",
            "bg-black/50 backdrop-blur-2xl",
            "rounded-full border border-white/10",
            "shadow-[inset_0_1px_2px_rgba(255,255,255,0.15),inset_0_0_12px_rgba(255,255,255,0.05),0_12px_32px_-4px_rgba(0,0,0,0.8)]",
            "transition-all duration-200",
            className
          )}
          ref={containerRef}
          role="tablist"
        >
          {/* Liquid Glass Sliding Background */}
          <motion.div
            animate={{
              width: dimensions.width,
              x: dimensions.left,
              opacity: 1,
            }}
            className={cn(
              "absolute z-[1] rounded-full",
              "border border-white/20 shadow-[inset_0_2px_4px_rgba(255,255,255,0.4),inset_0_-2px_4px_rgba(0,0,0,0.3),0_4px_12px_rgba(0,0,0,0.5)]",
              "backdrop-blur-md saturate-150",
              selectedItem?.color || activeColor
            )}
            initial={false}
            style={{ height: "calc(100% - 12px)", top: "6px" }}
            transition={{
              type: "spring",
              stiffness: 400,
              damping: 30,
            }}
          />

          <div className="relative z-[2] grid w-full grid-cols-4 gap-1 h-full">
            {items.map((item) => {
              const isSelected = selected === item.id;
              return (
                <motion.button
                  aria-controls={`panel-${item.id}`}
                  aria-selected={isSelected}
                  className={cn(
                    "relative flex items-center justify-center rounded-full h-full",
                    "font-bold text-[10px] sm:text-[11px] transition-all duration-300",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                    "uppercase tracking-wider break-words",
                    isSelected
                      ? "text-white"
                      : "text-neutral-400 hover:text-white hover:bg-white/5"
                  )}
                  id={`tab-${item.id}`}
                  key={item.id}
                  onClick={() => handleTabClick(item.id)}
                  onKeyDown={(e) => handleKeyDown(e, item.id)}
                  ref={(el) => {
                    if (el) buttonRefs.current.set(item.id, el);
                    else buttonRefs.current.delete(item.id);
                  }}
                  role="tab"
                  tabIndex={isSelected ? 0 : -1}
                  type="button"
                >
                  <span className="relative z-10 flex items-center justify-center w-full h-full drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)] m-0 p-0 text-center">
                    {item.title.split('. ')[1] || item.title}
                  </span>
                </motion.button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
