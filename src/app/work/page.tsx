import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Work — Udit Narayan Das",
  description: "Explore the projects and work of Udit Narayan Das — full-stack developer building fast, accessible web applications.",
};

export default function WorkPage() {
  return (
    <main className="relative min-h-screen w-full bg-black flex flex-col items-center justify-center overflow-hidden">
      {/* Subtle radial glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-20%,rgba(255,255,255,0.035),transparent)] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_40%_30%_at_50%_50%,rgba(255,255,255,0.02),transparent)] pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center text-center space-y-6 px-6">
        <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-neutral-600">
          Work
        </p>
        <h1 className="text-5xl sm:text-7xl font-black text-white tracking-tight">
          Coming Soon
        </h1>
        <p className="text-neutral-500 text-sm max-w-sm leading-relaxed">
          Case studies and project breakdowns are on their way. Stay tuned for a deep-dive into my work.
        </p>
        <a
          href="/"
          className="mt-4 inline-flex items-center gap-2 px-5 py-2 rounded-full text-sm font-medium text-neutral-300 border border-white/10 hover:border-white/20 hover:text-white bg-white/5 hover:bg-white/10 transition-all duration-200"
        >
          ← Back to Home
        </a>
      </div>
    </main>
  );
}
