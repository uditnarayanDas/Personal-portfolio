import React from "react";
import { BackgroundBeamsWithCollision } from "@/components/ui/background-beams-with-collision";

export default function Home() {
  return (
    <main className="min-h-screen bg-black w-full overflow-hidden">
      <BackgroundBeamsWithCollision className="min-h-screen">
        <div className="z-20 flex flex-col items-center justify-center space-y-6 text-center px-4 relative">
          
          {/* Subtle badge/tag */}
          <div className="bg-white/10 dark:bg-black/20 border border-white/20 backdrop-blur-md px-4 py-1.5 rounded-full text-sm font-medium text-white/80 uppercase tracking-widest shadow-xl transition-all hover:bg-white/15">
            Welcome to my Portfolio
          </div>

          {/* Main Hero Header */}
          <h1 className="text-4xl md:text-6xl lg:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-br from-white via-neutral-200 to-neutral-500 tracking-tighter mix-blend-difference pb-2">
            Creative <br /> Developer
          </h1>
          
          {/* Subheader */}
          <p className="mt-4 text-neutral-300 max-w-lg mx-auto text-lg md:text-xl font-light tracking-wide [text-shadow:0_4px_8px_rgba(0,0,0,0.5)]">
            Crafting premium, high-performance web applications with stunning visual experiences.
          </p>

          {/* Call to Action Button */}
          <div className="mt-10 relative group cursor-pointer inline-block">
            <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 rounded-full blur opacity-40 group-hover:opacity-100 transition duration-500 group-hover:duration-200"></div>
            <button className="relative px-8 py-4 bg-black text-white rounded-full font-semibold border border-white/10 hover:border-white/30 transition-all text-lg shadow-2xl overflow-hidden flex items-center gap-2">
              <span>View Projects</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-right group-hover:translate-x-1 transition-transform">
                <path d="M5 12h14" />
                <path d="m12 5 7 7-7 7" />
              </svg>
            </button>
          </div>
          
        </div>
      </BackgroundBeamsWithCollision>
    </main>
  );
}
