"use client"
import React, { useState } from "react";
import { ArrowRight, Copy, Check } from "lucide-react";
import { motion } from "motion/react";

export function ConnectSection() {
  const [copied, setCopied] = useState(false);
  const email = "dasuditnarayan9@gmail.com";

  const handleCopy = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div id="connect-section" className="fixed bottom-28 md:bottom-16 left-1/2 -translate-x-1/2 z-40 flex flex-col md:flex-row items-center gap-4 md:gap-10">
      {/* Let's Connect Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="flex items-center gap-3 bg-white/5 backdrop-blur-lg border border-white/10 pl-4 pr-1.5 py-1.5 rounded-full group hover:border-white/20 transition-all duration-300"
      >
        <span className="text-white text-xs md:text-sm font-medium tracking-tight">Let&apos;s Connect</span>
        <div className="h-7 w-7 md:h-8 md:w-8 bg-white rounded-full flex items-center justify-center transition-transform group-hover:rotate-45 duration-300">
          <ArrowRight className="text-black h-3.5 w-3.5 md:h-4 md:w-4" />
        </div>
      </motion.button>

      {/* Email Link */}
      <div
        onClick={handleCopy}
        className="flex items-center gap-2 cursor-pointer group"
      >
        <div className="text-neutral-500 group-hover:text-white transition-colors duration-300">
          {copied ? <Check className="h-3 w-3 text-green-500" /> : <Copy className="h-3 w-3" />}
        </div>
        <span className="text-neutral-400 group-hover:text-white text-[11px] md:text-sm font-medium transition-colors duration-300">
          {email}
        </span>
      </div>
    </div>
  );
}
