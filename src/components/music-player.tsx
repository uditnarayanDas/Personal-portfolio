"use client";

import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";

export function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const togglePlay = () => {
    if (isPlaying) {
      audioRef.current?.pause();
      setIsPlaying(false);
    } else {
      audioRef.current?.play();
      setIsPlaying(true);
    }
  };

  return (
    <div className="fixed bottom-6 left-6 z-50 flex items-center justify-center">
      <audio ref={audioRef} src="/song.mp3" loop />

      {/* Main Container - The large warm orange background */}
      <button
        onClick={togglePlay}
        className="relative group flex h-14 w-14 md:h-16 md:w-16 items-center justify-center rounded-full bg-[#E55A44] hover:scale-105 transition-transform duration-300 outline-none shadow-2xl"
      >
        {/* Bottom Right Arcs (Sound waves) */}
        {!isPlaying ? (
          <div className="absolute bottom-[5%] right-[5%] opacity-90 scale-100">
            <SoundArcs className="w-7 h-7" />
          </div>
        ) : (
          <motion.div
            className="absolute bottom-[5%] right-[5%] opacity-90"
            animate={{
              opacity: [0.9, 0.4, 0.9],
              scale: [1, 1.1, 1],
              x: [0, 4, 0],
              y: [0, 4, 0]
            }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <SoundArcs className="w-7 h-7" />
          </motion.div>
        )}

        {/* Top Left Music Note static (when paused)  */}
        {!isPlaying && (
          <div className="absolute top-[8%] left-[8%] transform -translate-x-1.5 -translate-y-1.5 -rotate-12 z-20 text-[#F2BF36]">
            <DoubleMusicNote className="w-6 h-6 drop-shadow-md" />
          </div>
        )}

        {/* Top Left Floating Notes Emitter (when playing) */}
        <AnimatePresence>
          {isPlaying && (
            <>
              <FloatingNote delay={0} customX={-15} customY={-25} />
              <FloatingNote delay={0.6} customX={-10} customY={-40} />
              <FloatingNote delay={1.2} customX={-25} customY={-15} />
            </>
          )}
        </AnimatePresence>

        {/* Inner Dark Record */}
        <div className="relative z-10 flex h-[55%] w-[55%] items-center justify-center rounded-full bg-[#3B3029] shadow-inner overflow-hidden">
          <motion.div
            animate={isPlaying ? { rotate: 360 } : { rotate: 0 }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 rounded-full border-[2px] border-dashed border-black/30"
          />
          {/* Play / Pause Toggle Center (Cream) */}
          <div className="relative z-20 flex items-center justify-center w-full h-full text-[#E7DEC1]">
            {isPlaying ? (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <rect x="6" y="5" width="4.5" height="14" rx="1.5" />
                <rect x="13.5" y="5" width="4.5" height="14" rx="1.5" />
              </svg>
            ) : (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" className="ml-1">
                <path d="M5 3.5l15 8.5-15 8.5z" strokeLinejoin="round" />
              </svg>
            )}
          </div>
        </div>

      </button>
    </div>
  );
}

// Emits individual floating music notes for the active playing state
function FloatingNote({ delay, customX, customY }: { delay: number; customX: number; customY: number }) {
  return (
    <motion.div
      initial={{ x: -5, y: -5, opacity: 0, scale: 0.5, rotate: -20 }}
      animate={{
        x: customX,
        y: customY,
        opacity: [0, 1, 0.8, 0],
        scale: [0.5, 1, 0.9],
        rotate: [-20, 0, 10]
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        delay: delay,
        ease: "easeOut",
      }}
      className="absolute top-[16%] left-[12%] text-[#F2BF36] z-20 pointer-events-none drop-shadow-md"
    >
      <DoubleMusicNote className="w-8 h-8" />
    </motion.div>
  );
}

// Extracted yellow sound arcs matching the image
function SoundArcs({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 40 40" fill="none">
      <path d="M14 36 A 22 22 0 0 0 36 14" stroke="#F2BF36" strokeWidth="5.5" strokeLinecap="round" />
      <path d="M22 30 A 12 12 0 0 0 30 22" stroke="#F2BF36" strokeWidth="5.5" strokeLinecap="round" />
    </svg>
  );
}

// Extracted double linked music note matching the image
function DoubleMusicNote({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M9.5 13.5C9.5 14.8807 8.38071 16 7 16C5.61929 16 4.5 14.8807 4.5 13.5C4.5 12.1193 5.61929 11 7 11C7.41423 11 7.7913 11.1009 8.10831 11.2743V5C8.10831 4.44772 8.55603 4 9.10831 4H18.5C19.0523 4 19.5 4.44772 19.5 5V10.5C19.5 11.8807 18.3807 13 17 13C15.6193 13 14.5 11.8807 14.5 10.5C14.5 9.11929 15.6193 8 17 8C17.4142 8 17.7913 8.10095 18.1083 8.27429V6.5H9.5V13.5Z" />
    </svg>
  );
}
