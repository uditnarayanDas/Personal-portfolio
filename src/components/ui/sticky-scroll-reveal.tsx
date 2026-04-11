"use client";
import React, { useEffect, useState, useRef } from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import { Eye } from "lucide-react";

export type TechStack = {
  name: string;
  icon?: React.ReactNode;
};

export type ProjectItem = {
  id: string;
  number: string;
  category: string;
  date: string;
  title: string;
  description: string;
  bulletPoints: string[];
  techStacks: TechStack[];
  imageContent: React.ReactNode;
};

// Sub-component to seamlessly manage individual mouse-tracking states per project image
function ProjectImageDisplay({ item, index, isActive }: { item: ProjectItem, index: number, isActive: boolean }) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <motion.div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={cn(
        "sticky-scroll-item relative w-full aspect-[16/10] xl:aspect-[16/9] rounded-2xl overflow-hidden group/card transition-all duration-700",
        "shadow-[0_20px_40px_rgba(0,0,0,0.8),0_0_40px_rgba(255,255,255,0.08)]",
        isActive ? "opacity-100 scale-100" : "opacity-30 scale-95",
        isHovered && "cursor-none"
      )}
    >
      {item.imageContent}

      {/* Liquid Glass Overlay Frame */}
      <div className="absolute inset-0 rounded-2xl border border-white/10 border-t-white/30 shadow-[inset_0_2px_15px_rgba(255,255,255,0.1)] pointer-events-none z-10" />

      {/* Custom Cursor Badge overlay restricted strictly within the parent bounds */}
      <motion.div
        animate={{
          x: mousePosition.x - 40, // offset half the width (w-20 = 80px)
          y: mousePosition.y - 40,
          opacity: isHovered ? 1 : 0,
          scale: isHovered ? 1 : 0.4,
        }}
        transition={{ type: "spring", stiffness: 200, damping: 20, mass: 0.1 }}
        className="absolute top-0 left-0 pointer-events-none z-30"
      >
        <div className="relative flex items-center justify-center w-20 h-20 bg-white/10 backdrop-blur-md rounded-full border border-white/20 text-white shadow-xl">
          <Eye className="w-5 h-5 absolute" />
          <svg viewBox="0 0 100 100" className="w-full h-full animate-[spin_10s_linear_infinite]">
            <defs>
              <path id={`circle-${index}`} d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0" />
            </defs>
            <text className="text-[10px] uppercase font-bold tracking-widest fill-white">
              <textPath href={`#circle-${index}`}>OPEN • EXPLORE • DISCOVER • </textPath>
            </text>
          </svg>
        </div>
      </motion.div>
    </motion.div>
  );
}

export const StickyScroll = ({
  content,
  className,
}: {
  content: ProjectItem[];
  className?: string;
}) => {
  const [activeCard, setActiveCard] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const cardElements = document.querySelectorAll(".sticky-scroll-item");
      let minDistance = Infinity;
      let activeIndex = 0;

      cardElements.forEach((el, index) => {
        const rect = el.getBoundingClientRect();
        // Measure distance to center of viewport
        const distance = Math.abs(rect.top - window.innerHeight * 0.4);
        if (distance < minDistance) {
          minDistance = distance;
          activeIndex = index;
        }
      });
      setActiveCard(activeIndex);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // initialize
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className={cn("w-full relative", className)}>
      {/* 
        DESKTOP LAYOUT (>= lg)
      */}
      <div className="hidden lg:flex items-start gap-10 xl:gap-16 w-full relative">
        {/* Left Side: Scrolling Images */}
        <div className="w-[55%] xl:w-[60%] flex flex-col gap-[20vh] pt-[12vh] pb-[30vh]">
          {content.map((item, index) => (
             <ProjectImageDisplay key={item.id} item={item} index={index} isActive={index === activeCard} />
          ))}
        </div>

        {/* Right Side: Sticky Text Content */}
        <div className="w-[45%] xl:w-[40%] sticky top-[30vh] min-h-[450px] flex flex-col justify-start relative">
          
          <div className="grid w-full">
            {content.map((item, index) => (
              <div
                key={`sticky-text-${index}`}
                className={cn(
                  "col-start-1 row-start-1 flex flex-col gap-4 xl:gap-5 transition-opacity duration-300 ease-in-out",
                  activeCard === index 
                    ? "opacity-100 pointer-events-auto z-10" 
                    : "opacity-0 pointer-events-none z-0"
                )}
              >
                {/* Title Header with Dash */}
                <div className="flex items-center gap-3 mt-[2px]">
                  <div className="w-6 h-[1px] bg-neutral-600 flex-shrink-0" />
                  <h3 className="text-2xl xl:text-3xl font-serif font-bold text-white tracking-tight">
                    {item.title}
                  </h3>
                </div>

                {/* Description */}
                <div className={cn("transition-transform duration-500 ease-out", activeCard === index ? "translate-y-0 delay-100" : "translate-y-4 delay-0")}>
                  <p className="text-neutral-300 text-xs xl:text-sm leading-relaxed ml-9">
                    {item.description}
                  </p>
                </div>

                {/* Bullet Points */}
                {item.bulletPoints?.length > 0 && (
                  <div className={cn("transition-transform duration-500 ease-out", activeCard === index ? "translate-y-0 delay-150" : "translate-y-4 delay-0")}>
                    <ul className="flex flex-col gap-2.5 ml-9">
                      {item.bulletPoints.map((bp, i) => (
                        <li key={i} className="flex items-start gap-2.5 text-neutral-400 text-xs xl:text-sm leading-relaxed">
                          <div className="mt-1.5 flex-shrink-0">
                            <svg width="6" height="6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-neutral-500">
                              <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fill="currentColor" />
                            </svg>
                          </div>
                          <span className="flex-1">{bp}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Tech Stack Pills space out */}
                <div className="flex flex-wrap gap-1.5 mt-1 xl:mt-2 ml-9">
                  {item.techStacks.map((tech, i) => (
                    <div
                      key={i}
                      style={{ transitionDelay: activeCard === index ? `${200 + (i * 40)}ms` : '0ms' }}
                      className={cn(
                        "flex items-center gap-1.5 px-2 py-1 rounded-md border border-white/10 bg-white/5 text-[9px] font-medium uppercase tracking-wider text-neutral-300 transition-all duration-400 ease-out",
                        activeCard === index ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-4 scale-95"
                      )}
                    >
                      {tech.icon}
                      {tech.name}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 
        MOBILE LAYOUT (< lg)
      */}
      <div className="flex lg:hidden flex-col gap-16 w-full px-2 sm:px-4">
        {content.map((item, index) => (
          <div key={item.id} className="flex flex-col w-full">
            
            {/* Top Info row */}
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3 text-[10px] font-semibold text-neutral-400 tracking-widest uppercase">
                <span>{item.number}</span>
                <div className="w-5 h-px bg-neutral-700" />
                <span>{item.category}</span>
              </div>
              <div className="px-2.5 py-1 rounded-full border border-white/10 bg-white/5 text-[9px] font-semibold text-neutral-400 tracking-wider">
                {item.date}
              </div>
            </div>

            {/* Title */}
            <h3 className="text-2xl md:text-3xl font-serif font-bold text-white tracking-tight mb-4">
              {item.title}
            </h3>

            {/* Image Block with restricted Mobile Cursor Display */}
            <div className="relative w-full aspect-[16/10] sm:aspect-video rounded-2xl overflow-hidden shadow-[0_20px_40px_rgba(0,0,0,0.8),0_0_30px_rgba(255,255,255,0.08)] mb-6 bg-black group">
              {item.imageContent}
              
              {/* Liquid Glass Overlay Frame */}
              <div className="absolute inset-0 rounded-2xl border border-white/10 border-t-white/30 shadow-[inset_0_2px_15px_rgba(255,255,255,0.1)] pointer-events-none z-10" />
              
              <div className="absolute right-3 bottom-3 z-20">
                 <div className="relative flex items-center justify-center w-14 h-14 bg-white/10 backdrop-blur-md rounded-full border border-white/20 text-white shadow-xl">
                   <Eye className="w-3.5 h-3.5 absolute" />
                   <svg viewBox="0 0 100 100" className="w-full h-full animate-[spin_10s_linear_infinite]">
                     <defs>
                       <path id={`circle-mobile-${index}`} d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0" />
                     </defs>
                     <text className="text-[11px] uppercase font-bold tracking-widest fill-white">
                       <textPath href={`#circle-mobile-${index}`}>OPEN • EXPLORE • DISCOVER </textPath>
                     </text>
                   </svg>
                 </div>
               </div>
            </div>

            {/* Tech Stack Pills */}
            <div className="flex flex-wrap gap-1.5">
              {item.techStacks.map((tech, i) => (
                <div
                  key={`mobile-tech-${i}`}
                  className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-md border border-white/10 bg-black/50 text-[9px] font-semibold uppercase tracking-wider text-neutral-300"
                >
                  {tech.icon}
                  {tech.name}
                </div>
              ))}
            </div>
            
            {/* Description */}
            <p className="text-neutral-400 text-xs leading-relaxed mt-4">
                {item.description}
            </p>

          </div>
        ))}
      </div>
    </div>
  );
};
