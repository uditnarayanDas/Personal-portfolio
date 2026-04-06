"use client";
import React, { useEffect, useRef, useState, memo, useCallback } from "react";
import { motion } from "motion/react";
import { twMerge } from "tailwind-merge";
import { cn } from "@/lib/utils";

export const TextRevealCard = ({
  text,
  revealText,
  children,
  className,
}: {
  text: string;
  revealText: string;
  children?: React.ReactNode;
  className?: string;
}) => {
  const [widthPercentage, setWidthPercentage] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const cardRef = useRef<HTMLDivElement | any>(null);
  const [left, setLeft] = useState(0);
  const [localWidth, setLocalWidth] = useState(0);
  const [isMouseOver, setIsMouseOver] = useState(false);

  useEffect(() => {
    if (cardRef.current) {
      const { left, width: localWidth } =
        cardRef.current.getBoundingClientRect();
      setLeft(left);
      setLocalWidth(localWidth);
    }
  }, []);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    if (isMobile) {
      let startTime: number | null = null;
      const holeTime = 1500; // 1.5s delay
      const sweepTime = 1500; // 1.5s sweep
      const totalCycle = (holeTime + sweepTime) * 2;

      const animate = (time: number) => {
        if (!startTime) startTime = time;
        const elapsed = (time - startTime) % totalCycle;

        let targetPercentage = 0;

        if (elapsed < holeTime) {
          // Phase 1: Hold at 0%
          targetPercentage = 0;
        } else if (elapsed < holeTime + sweepTime) {
          // Phase 2: Sweep 0% -> 100%
          const phaseProgress = (elapsed - holeTime) / sweepTime;
          // Smooth step easing
          targetPercentage = phaseProgress * phaseProgress * (3 - 2 * phaseProgress) * 100;
        } else if (elapsed < holeTime * 2 + sweepTime) {
          // Phase 3: Hold at 100%
          targetPercentage = 100;
        } else {
          // Phase 4: Sweep 100% -> 0%
          const phaseProgress = (elapsed - (holeTime * 2 + sweepTime)) / sweepTime;
          // Smooth step easing
          targetPercentage = (1 - (phaseProgress * phaseProgress * (3 - 2 * phaseProgress))) * 100;
        }

        setWidthPercentage(targetPercentage);
        requestAnimationFrame(animate);
      };

      const requestRef = requestAnimationFrame(animate);
      return () => cancelAnimationFrame(requestRef);
    }
  }, [isMobile]);

  function mouseMoveHandler(event: any) {
    event.preventDefault();

    const { clientX } = event;
    if (cardRef.current) {
      const relativeX = clientX - left;
      setWidthPercentage((relativeX / localWidth) * 100);
    }
  }

  function mouseLeaveHandler() {
    setIsMouseOver(false);
    setWidthPercentage(0);
  }
  function mouseEnterHandler() {
    setIsMouseOver(true);
  }
  function touchMoveHandler(event: React.TouchEvent<HTMLDivElement>) {
    event.preventDefault();
    const clientX = event.touches[0]!.clientX;
    if (cardRef.current) {
      const relativeX = clientX - left;
      setWidthPercentage((relativeX / localWidth) * 100);
    }
  }

  const rotateDeg = (widthPercentage - 50) * 0.1;

  return (
    <div
      onMouseEnter={mouseEnterHandler}
      onMouseLeave={mouseLeaveHandler}
      onMouseMove={mouseMoveHandler}
      onTouchStart={mouseEnterHandler}
      onTouchEnd={mouseLeaveHandler}
      onTouchMove={touchMoveHandler}
      ref={cardRef}
      className={cn(
        "bg-[#1d1c20] border border-white/[0.08] w-full rounded-lg p-8 relative overflow-hidden",
        className
      )}
    >
      {children}

      <div className="h-40 relative flex items-center overflow-hidden">
        {/* Reveal Text Container (Clipped from Right) */}
        <motion.div
          style={{
            width: "100%",
          }}
          animate={
            isMouseOver
              ? {
                opacity: widthPercentage > 0 ? 1 : 0,
                clipPath: `inset(0 ${100 - widthPercentage}% 0 0)`,
              }
              : {
                clipPath: `inset(0 ${100 - widthPercentage}% 0 0)`,
              }
          }
          transition={isMobile || isMouseOver ? { duration: 0 } : { duration: 0.4 }}
          className="absolute bg-transparent z-20 will-change-transform"
        >
          <div
            style={{
              textShadow: "0 0 20px rgba(239, 68, 68, 0.4)",
            }}
            className="text-3xl sm:text-[2.5rem] md:text-[3rem] pt-1 pb-10 font-bold italic font-serif bg-clip-text text-transparent bg-gradient-to-r from-red-600 via-orange-500 to-red-500 leading-tight md:whitespace-nowrap flex flex-col items-center justify-center text-center w-full md:block md:text-left"
          >
            {revealText.split('\n').map((line, idx, arr) => (
              <React.Fragment key={idx}>
                <span className="block md:inline">{line}</span>
                {idx < arr.length - 1 && <span className="hidden md:inline">&nbsp;</span>}
              </React.Fragment>
            ))}
          </div>
        </motion.div>

        {/* Vertical Mask Line */}
        <motion.div
          animate={{
            left: `${widthPercentage}%`,
            rotate: `${rotateDeg}deg`,
            opacity: widthPercentage > 0 ? 1 : 0,
          }}
          transition={isMobile || isMouseOver ? { duration: 0 } : { duration: 0.4 }}
          className="h-40 w-[2px] bg-gradient-to-b from-transparent via-red-500 to-transparent absolute z-50 will-change-transform"
        ></motion.div>

        {/* Original Text Container (Clipped from Left) */}
        <motion.div
          animate={{
            clipPath: `inset(0 0 0 ${widthPercentage}%)`,
          }}
          transition={isMobile || isMouseOver ? { duration: 0 } : { duration: 0.4 }}
          className="overflow-hidden w-full [mask-image:linear-gradient(to_bottom,transparent,white,transparent)]"
        >
          <div className="text-3xl sm:text-[2.5rem] md:text-[3rem] pt-1 pb-10 font-bold italic font-serif bg-clip-text text-transparent bg-[#52525b] leading-tight md:whitespace-nowrap flex flex-col items-center justify-center text-center w-full md:block md:text-left">
            {text.split('\n').map((line, idx, arr) => (
              <React.Fragment key={idx}>
                <span className="block md:inline">{line}</span>
                {idx < arr.length - 1 && <span className="hidden md:inline">&nbsp;</span>}
              </React.Fragment>
            ))}
          </div>
          <MemoizedStars />
        </motion.div>
      </div>

      {/* "HOVER HERE" Indicator at the bottom */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-30 hidden md:block">
        <motion.span
          animate={{
            opacity: [0.1, 0.4, 0.1],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="text-[9px] font-bold tracking-[0.4em] uppercase text-white/30 select-none block"
        >
          Hover Here
        </motion.span>
      </div>
    </div>
  );
};

export const TextRevealCardTitle = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <h2 className={twMerge("text-white text-lg mb-2", className)}>
      {children}
    </h2>
  );
};

export const TextRevealCardDescription = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <p className={twMerge("text-[#a9a9a9] text-sm", className)}>{children}</p>
  );
};

const Stars = () => {
  const randomMove = () => Math.random() * 4 - 2;
  const randomOpacity = () => Math.random();
  const random = () => Math.random();
  return (
    <div className="absolute inset-0">
      {[...Array(20)].map((_, i) => (
        <motion.span
          key={`star-${i}`}
          animate={{
            top: `calc(${random() * 100}% + ${randomMove()}px)`,
            left: `calc(${random() * 100}% + ${randomMove()}px)`,
            opacity: randomOpacity(),
            scale: [1, 1.2, 0],
          }}
          transition={{
            duration: random() * 10 + 20,
            repeat: Infinity,
            ease: "linear",
          }}
          style={{
            position: "absolute",
            top: `${random() * 100}%`,
            left: `${random() * 100}%`,
            width: `2px`,
            height: `2px`,
            backgroundColor: "white",
            borderRadius: "50%",
            zIndex: 1,
          }}
          className="inline-block"
        ></motion.span>
      ))}
    </div>
  );
};

export const MemoizedStars = memo(Stars);
