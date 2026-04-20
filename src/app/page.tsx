"use client";

import React from "react";
import { motion } from "motion/react";
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";
import { ShootingStars } from "@/components/ui/shooting-stars";
import { StarsBackground } from "@/components/ui/stars-background";

import { ConnectSection } from "@/components/connect-section";
import { BentoSection } from "@/components/bento-section";
import { WorkSection } from "@/components/work-section";
import { MobileNotice } from "@/components/mobile-notice";

export default function Home() {
  return (
    <main className="relative w-full selection:bg-white selection:text-black font-sans overflow-x-clip">
      <MobileNotice />
      {/* ─── Global Background Stack ─── */}
      <div className="fixed inset-0 bg-black z-[-10]" />
      {/* Starry Background — Fixed so it stays in viewport while scrolling */}
      <ShootingStars className="fixed inset-0 z-[-1]" />
      <StarsBackground className="fixed inset-0 z-[-1]" />

      {/* ─── Hero Section ─── */}
      <section className="relative min-h-[100dvh] w-full overflow-hidden">

        <div className="relative z-20 flex min-h-0 md:min-h-[100dvh] w-full flex-col items-center justify-center px-6 pt-32 pb-4 md:pt-40 text-center space-y-14 md:space-y-24">

          {/* Top Badge (Say Hi) */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-8 md:mb-12"
          >
            <HoverBorderGradient
              containerClassName="rounded-full"
              as="button"
              className="bg-black text-[8px] md:text-xs font-semibold text-white px-4 py-1.5 md:px-5 md:py-2 flex items-center gap-2 md:gap-2.5"
            >
              <span className="relative flex h-1.5 w-1.5 md:h-2 md:w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex h-1.5 w-1.5 md:h-2 md:w-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.6)]"></span>
              </span>
              <span>Open to work</span>


            </HoverBorderGradient>
          </motion.div>

          {/* Signature Name & Tagline Block */}
          <div className="flex flex-col items-center space-y-4 md:space-y-4 w-full max-w-7xl mx-auto">
            <motion.h1
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="text-[25vw] md:text-[14vw] font-black leading-[0.8] tracking-[-0.05em] text-white select-none whitespace-nowrap"
            >
              UDIT
            </motion.h1>

            {/* Dual-Part Tagline */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.6 }}
              className="flex flex-col items-center space-y-1.5 pt-2"
            >
              <p className="text-[9px] md:text-[11px] font-bold uppercase tracking-[0.4em] md:tracking-[0.6em] text-neutral-500 pb-1">
                I create digital experiences that
              </p>
              <h2 className="font-serif text-xl sm:text-2xl md:text-4xl lg:text-5xl italic text-white tracking-tight">
                make a meaningful difference.
              </h2>
            </motion.div>
          </div>

          {/* Connect Section */}
          <ConnectSection />

        </div>
      </section>

      <BentoSection />
      <WorkSection />
    </main>
  );
}


