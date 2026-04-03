"use client";

import React from "react";
import { motion } from "motion/react";
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";
import { ShootingStars } from "@/components/ui/shooting-stars";
import { StarsBackground } from "@/components/ui/stars-background";
import { MapPin, Layers } from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen bg-black w-full overflow-hidden selection:bg-white selection:text-black font-sans relative">

      <div className="relative z-20 flex h-screen w-full flex-col items-center justify-center px-6 text-center space-y-16 md:space-y-24">

        {/* Top Badge (Say Hi) */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-4"
        >
          <HoverBorderGradient
            containerClassName="rounded-full"
            as="button"
            className="bg-black text-[10px] md:text-xs font-semibold text-white px-5 py-2 flex items-center space-x-2"
          >
            <span>Open to work</span>


          </HoverBorderGradient>
        </motion.div>

        {/* Signature Name & Tagline Block */}
        <div className="flex flex-col items-center space-y-6 md:space-y-10">
          <motion.h1
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-[22vw] font-black leading-[0.8] tracking-[-0.05em] text-white md:text-[14vw]"
          >
            UDIT
          </motion.h1>

          {/* Dual-Part Tagline */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="flex flex-col items-center space-y-1.5 pt-6 md:pt-8"
          >
            <p className="text-[10px] md:text-[11px] font-bold uppercase tracking-[0.6em] text-neutral-500 pb-1">
              I create digital experiences that
            </p>
            <h2 className="font-serif text-2xl italic text-white md:text-4xl lg:text-5xl tracking-tight">
              make a meaningful difference.
            </h2>
          </motion.div>
        </div>

      </div>

      {/* Starry Background Components */}
      <ShootingStars />
      <StarsBackground />
    </main>
  );
}
