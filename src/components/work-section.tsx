"use client";

import React from "react";
import { StickyScroll, ProjectItem } from "@/components/ui/sticky-scroll-reveal";
import { Layers, Zap, Code, Database, LayoutTemplate, ShieldCheck, Box } from "lucide-react";

const mockProjects: ProjectItem[] = [
  {
    id: "nextdemy",
    number: "01",
    category: "WEB APP",
    date: "Q4 2024",
    title: "Nextdemy",
    description: "Full-stack EdTech platform with course marketplace, Razorpay payments, video streaming, and role-based dashboards for students and instructors.",
    bulletPoints: [
      "Course marketplace with search, categories, ratings, and progress tracking.",
      "Razorpay checkout with server-side payment verification.",
      "Instructor dashboard with course builder, media uploads, and revenue analytics.",
      "JWT auth with role-based access — Student, Instructor, Admin.",
      "Cloudinary-powered video streaming and image delivery."
    ],
    techStacks: [
      { name: "NEXT.JS", icon: <Code className="w-3 h-3" /> },
      { name: "TYPESCRIPT", icon: <Code className="w-3 h-3 text-blue-400" /> },
      { name: "TAILWIND CSS", icon: <LayoutTemplate className="w-3 h-3 text-cyan-400" /> },
      { name: "TANSTACK QUERY", icon: <Database className="w-3 h-3 text-red-400" /> },
      { name: "ZUSTAND", icon: <Box className="w-3 h-3" /> },
      { name: "SHADCN UI", icon: <Layers className="w-3 h-3 text-zinc-100" /> },
      { name: "MOTION.DEV", icon: <Zap className="w-3 h-3 text-yellow-400" /> },
      { name: "EXPRESS.JS", icon: <Code className="w-3 h-3 text-green-400" /> },
      { name: "MONGODB", icon: <Database className="w-3 h-3 text-emerald-500" /> },
    ],
    imageContent: (
      <div className="w-full h-full bg-blue-600 flex flex-col p-6 sm:p-10 relative">
        <div className="w-full text-white z-10 mb-8 max-w-lg">
          <p className="text-xl sm:text-2xl font-semibold leading-snug">
            A monorepo-powered learning platform with real payments, real auth, and real content delivery <span className="inline-block translate-y-1 ml-2">→</span>
          </p>
        </div>
        <div className="relative flex-1 w-[120%] -ml-[10%] bg-black rounded-t-xl border border-white/10 shadow-2xl overflow-hidden mt-6 flex flex-col pt-8 items-center text-white/50 text-sm italic">
          <p className="absolute top-1/2 -translate-y-1/2">Demo Project Layout Graphic</p>
        </div>
      </div>
    ),
  },
  {
    id: "nextventure",
    number: "02",
    category: "WEB APP",
    date: "Q3 2024",
    title: "Next Venture",
    description: "A full-stack startup pitch platform built using cutting-edge Next.js 15 features, Sanity CMS, and a sleek UI/UX experience.",
    bulletPoints: [
      "Leveraged Partial Prerendering and After for faster loading.",
      "Simplified idea submission with a clean, intuitive design.",
      "Enhanced browsing with seamless performance optimization."
    ],
    techStacks: [
      { name: "NEXT.JS", icon: <Code className="w-3 h-3" /> },
      { name: "REACT", icon: <Code className="w-3 h-3 text-cyan-400" /> },
      { name: "SANITY CMS", icon: <Database className="w-3 h-3 text-rose-400" /> },
      { name: "TYPESCRIPT", icon: <Code className="w-3 h-3 text-blue-400" /> },
      { name: "BETTER AUTH", icon: <ShieldCheck className="w-3 h-3" /> },
      { name: "TAILWIND CSS", icon: <LayoutTemplate className="w-3 h-3 text-cyan-400" /> },
      { name: "MOTION.DEV", icon: <Zap className="w-3 h-3 text-yellow-400" /> }
    ],
    imageContent: (
      <div className="w-full h-full bg-slate-600 flex flex-col p-6 sm:p-10 relative">
        <div className="w-full text-white z-10 mb-8 max-w-lg">
          <p className="text-xl sm:text-2xl font-semibold leading-snug">
            A space for entrepreneurs to pitch ideas, explore others, and gain exposure with clean design <span className="inline-block translate-y-1 ml-2">→</span>
          </p>
        </div>
        <div className="relative flex-1 w-full bg-[#1A1A1A] rounded-t-xl border border-white/10 shadow-y-2xl overflow-hidden flex flex-col pt-8 items-center text-white/50 text-sm italic">
          <p className="absolute top-1/2 -translate-y-1/2">Demo Interface Mockup</p>
        </div>
      </div>
    ),
  },
  {
    id: "finote",
    number: "03",
    category: "MOBILE APP",
    date: "Q2 2024",
    title: "Finote",
    description: "An intuitive mobile companion for organizing your digital wallets and analyzing your financial health securely natively on your phone.",
    bulletPoints: [
      "Multi-wallet tracking across diverse asset classes.",
      "Interactive data visualizations modeling spending trends.",
      "End-to-end local encryption prioritizing zero-knowledge security.",
      "Real-time exchange rate sync completely hidden from blocking UI."
    ],
    techStacks: [
      { name: "REACT NATIVE", icon: <Code className="w-3 h-3 text-cyan-400" /> },
      { name: "EXPO", icon: <Box className="w-3 h-3 text-white" /> },
      { name: "ZUSTAND", icon: <Box className="w-3 h-3 text-amber-500" /> },
      { name: "NODE.JS", icon: <Code className="w-3 h-3 text-green-500" /> },
      { name: "FIREBASE", icon: <Database className="w-3 h-3 text-yellow-500" /> }
    ],
    imageContent: (
      <div className="w-full h-full bg-purple-600 flex flex-col p-6 sm:p-10 relative">
        <div className="w-full text-white z-10 mb-8 max-w-lg">
          <p className="text-xl sm:text-2xl font-semibold leading-snug">
            An intuitive mobile companion for organizing your digital wallets and analyzing your financial health
          </p>
        </div>
        <div className="relative flex-1 flex justify-center gap-4 w-[110%] -ml-[5%] overflow-hidden mt-6">
           <div className="w-1/3 bg-black rounded-t-3xl border border-white/10 opacity-70" />
           <div className="w-2/5 bg-black rounded-t-3xl border border-white/20 -translate-y-6" />
           <div className="w-1/3 bg-black rounded-t-3xl border border-white/10 opacity-70" />
        </div>
      </div>
    ),
  }
];

export function WorkSection() {
  return (
    <section id="work" className="relative w-full pt-10 md:pt-16 pb-24 md:pb-32 bg-transparent min-h-screen">
      
      {/* Light glow effects (subtle so they don't overpower stars) */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[100px] pointer-events-none opacity-50" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-500/5 rounded-full blur-[100px] pointer-events-none opacity-50" />

      <div className="relative z-10 w-full max-w-[1400px] mx-auto">
        
        {/* Section Header purely replicating screenshot typography */}
        <div className="flex flex-col items-center justify-center text-center px-4 w-full z-20 relative pt-2 pb-16 md:pb-24">
           <span className="text-neutral-400 uppercase tracking-[0.3em] text-[10px] md:text-xs font-bold mb-4 md:mb-6">
             Case Studies
           </span>
           <h2 className="text-5xl md:text-7xl lg:text-[80px] font-serif tracking-tight flex items-center justify-center gap-2 md:gap-4 leading-none">
             <span className="text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.4)]">Curated</span> 
             <span className="italic font-light bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-indigo-500 to-pink-500 pb-2 md:pb-4 pr-1 drop-shadow-[0_0_20px_rgba(168,85,247,0.2)]">work</span>
           </h2>
        </div>

        {/* Sticky Scroll Component */}
        <StickyScroll content={mockProjects} className="w-full" />
      </div>
    </section>
  );
}
