"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Monitor, X } from "lucide-react";

export function MobileNotice() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if on mobile and not previously dismissed
    const checkMobile = () => {
      const isMobileView = window.innerWidth < 768;
      const isDismissed = localStorage.getItem("mobile-notice-dismissed") === "true";
      
      if (isMobileView && !isDismissed) {
        setIsVisible(true);
        document.body.style.overflow = "hidden";
      }
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleDismiss = () => {
    setIsVisible(false);
    localStorage.setItem("mobile-notice-dismissed", "true");
    document.body.style.overflow = "unset";
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 sm:hidden">
          {/* Backdrop blur overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleDismiss}
            className="absolute inset-0 bg-black/60 backdrop-blur-lg"
          />

          {/* Glass Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative z-10 w-full max-w-[320px] bg-white/[0.03] backdrop-blur-2xl border border-white/10 rounded-[32px] p-8 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.5)] overflow-hidden"
          >
            {/* Animated Glow Effect */}
            <div className="absolute -top-24 -left-24 w-48 h-48 bg-emerald-500/10 blur-[80px] rounded-full pointer-events-none" />
            <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-blue-500/10 blur-[80px] rounded-full pointer-events-none" />

            <div className="flex flex-col items-center text-center">
              <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-6">
                <Monitor className="w-6 h-6 text-white" />
              </div>

              <h3 className="text-xl font-bold text-white mb-3 tracking-tight">
                Desktop Recommended
              </h3>
              
              <p className="text-sm text-neutral-400 leading-relaxed mb-8">
                For the best UI experience and interactions, please visit this portfolio on a desktop or laptop device.
              </p>

              <button
                onClick={handleDismiss}
                className="w-full py-4 rounded-2xl bg-white text-black font-bold text-sm hover:bg-neutral-200 transition-colors shadow-[0_8px_20px_-4px_rgba(255,255,255,0.3)]"
              >
                Continue Anyway
              </button>
              
              <button 
                onClick={handleDismiss}
                className="absolute top-4 right-4 p-2 rounded-full text-neutral-500 hover:text-white transition-colors"
                aria-label="Close"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
