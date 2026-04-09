"use client"
import React, { useState } from "react";
import { ArrowRight, Copy, Check } from "lucide-react";
import { motion } from "motion/react";

export function ConnectSection() {
  const [copied, setCopied] = useState(false);
  const [mounted, setMounted] = React.useState(false);
  const email = "dasuditnarayan9@gmail.com";

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const handleCopy = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!mounted) return null;

  return (
    <motion.div
      id="connect-section"
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.8 }}
      className="flex flex-col md:flex-row items-center gap-4 md:gap-10"
    >
      {/* Let's Connect Button */}
      <motion.button
        whileHover="hover"
        initial="initial"
        whileTap="tap"
        className="relative flex items-center h-12 rounded-full border border-white/10 bg-white/[0.03] backdrop-blur-xl group overflow-hidden px-1.5 py-1.5 select-none"
      >
        {/* Fill background triggered from right icon circle area */}
        <motion.div
           variants={{
             initial: { width: "40px", height: "40px", right: "6px" },
             hover: { width: "calc(100% - 12px)", height: "calc(100% - 12px)", right: "6px" },
           }}
           transition={{ duration: 0.5, ease: [0.19, 1, 0.22, 1] }}
           className="absolute top-1/2 -translate-y-1/2 bg-white rounded-full z-0 pointer-events-none"
        />

        <div className="relative z-10 flex items-center gap-8 pl-5 pr-1">
          <motion.span
            variants={{
                initial: { color: "#ffffff" },
                hover: { color: "#000000" },
            }}
            transition={{ duration: 0.3 }}
            className="text-[11px] md:text-sm font-bold tracking-tight whitespace-nowrap"
          >
            Let&apos;s Connect
          </motion.span>
          
          <div className="flex h-9 w-9 items-center justify-center rounded-full pointer-events-none">
             <motion.div
               variants={{
                  initial: { rotate: 0, color: "#000000" },
                  hover: { rotate: 45, color: "#000000" },
               }}
               transition={{ duration: 0.3 }}
             >
                <ArrowRight className="h-4 w-4 md:h-5 md:w-5" />
             </motion.div>
          </div>
        </div>
      </motion.button>

      {/* Email Link */}
      <div
        onClick={handleCopy}
        className="flex items-center gap-2 cursor-pointer group px-4"
      >
        <div className="text-neutral-500 group-hover:text-white transition-colors duration-300">
          {copied ? <Check className="h-3 w-3 text-green-500" /> : <Copy className="h-3 w-3" />}
        </div>
        <span className="text-neutral-400 group-hover:text-white text-[10px] md:text-sm font-medium transition-colors duration-300">
          {email}
        </span>
      </div>
    </motion.div>
  );
}
