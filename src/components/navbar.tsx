"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";
import {
  Search,
  ChevronDown,
  Menu,
  X,
  FlaskConical,
  Link as LinkIcon,
  Monitor,
  BookOpen
} from "lucide-react";
import { CommandMenu } from "@/components/command-menu";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Work", href: "/work" },
  { name: "Blog", href: "/blog" },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [commandOpen, setCommandOpen] = useState(false);
  const [isMoreOpen, setIsMoreOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => { document.body.style.overflow = "unset"; };
  }, [isMobileMenuOpen]);

  return (
    <>
      <CommandMenu open={commandOpen} setOpen={setCommandOpen} />

      {/* 
        PREMIUM SCROLL BLUR MASK 
        Content dynamically blurs and fades to black as it scrolls under the navbar.
      */}
      <div 
        className="pointer-events-none fixed top-0 left-0 right-0 h-28 md:h-36 z-[39] bg-gradient-to-b from-[#0a0a0a]/90 via-[#0a0a0a]/50 to-transparent"
      />
      <div 
        className="pointer-events-none fixed top-0 left-0 right-0 h-28 md:h-36 z-40"
        style={{
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          maskImage: "linear-gradient(to bottom, black 0%, transparent 100%)",
          WebkitMaskImage: "linear-gradient(to bottom, black 0%, transparent 100%)",
        }}
      />

      <motion.nav
        id="navbar"
        initial={{ x: "-50%", y: -80, opacity: 0 }}
        animate={{ 
          x: "-50%",
          y: 0, 
          opacity: 1,
          top: isScrolled ? "10px" : "18px",
        }}
        transition={{ 
          duration: 0.6, 
          ease: [0.16, 1, 0.3, 1],
          top: { duration: 0.5, ease: "easeInOut" },
        }}
        className="fixed left-1/2 z-50 pointer-events-auto"
      >
        {/* Outer subtle ring on scroll — shadow removed as per request */}
        <div
          className={`absolute inset-0 rounded-full transition-opacity duration-500 pointer-events-none ${
            isScrolled ? "opacity-100" : "opacity-0"
          }`}
          style={{
            boxShadow: "0 0 0 1px rgba(255,255,255,0.06)"
          }}
        />

        <div className="relative flex items-center gap-1 px-1.5 py-1 bg-[#111111]/85 backdrop-blur-2xl border border-white/[0.08] rounded-full font-sans">

          {/* Navigation Links (Desktop) */}
          <div className="hidden lg:flex items-center gap-0.5">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className="relative px-3 py-[5px] rounded-full text-sm font-medium transition-colors duration-200 outline-none focus-visible:ring-2 focus-visible:ring-white/20"
                >
                  {/* Animated active background pill */}
                  {isActive && (
                    <motion.span
                      layoutId="navbar-active-pill"
                      className="absolute inset-0 rounded-full bg-[#2c2c2c]"
                      style={{ boxShadow: "inset 0 1px 0 rgba(255,255,255,0.1)" }}
                      transition={{ type: "spring", stiffness: 380, damping: 36, mass: 0.8 }}
                    />
                  )}

                  {/* Intense glowing white top indicator */}
                  {isActive && (
                    <motion.span
                      layoutId="navbar-indicator"
                      className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-px rounded-full"
                      style={{
                        width: "28px",
                        height: "2.5px",
                        background: "white",
                        boxShadow: `
                          0 0 15px 4px rgba(255,255,255,0.8),
                          0 0 30px 8px rgba(255,255,255,0.4),
                          0 0 6px 2px rgba(255,255,255,0.9)
                        `
                      }}
                      transition={{ type: "spring", stiffness: 380, damping: 36, mass: 0.8 }}
                    />
                  )}

                  <span className={`relative z-10 transition-colors duration-200 ${
                    isActive ? "text-white" : "text-neutral-400 hover:text-neutral-200"
                  }`}>
                    {link.name}
                  </span>
                </Link>
              );
            })}

            {/* More Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setIsMoreOpen(true)}
              onMouseLeave={() => setIsMoreOpen(false)}
            >
              <button className="flex items-center gap-1 px-3 py-[5px] rounded-full text-sm font-medium text-neutral-400 hover:text-neutral-200 hover:bg-white/[0.06] transition-all duration-200 outline-none">
                More
                <motion.span
                  animate={{ rotate: isMoreOpen ? 180 : 0 }}
                  transition={{ duration: 0.25, ease: "easeInOut" }}
                >
                  <ChevronDown className="w-3 h-3 opacity-60" />
                </motion.span>
              </button>

              <AnimatePresence>
                {isMoreOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.97 }}
                    transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-[480px] p-4 bg-[#121212]/95 backdrop-blur-2xl border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] rounded-[24px] z-50 pointer-events-auto overflow-hidden text-left"
                  >
                    <div className="grid grid-cols-5 gap-4">
                      {/* Left: Labs Card */}
                      <div className="col-span-2 group relative overflow-hidden flex flex-col justify-end p-4 bg-gradient-to-br from-neutral-800/50 to-neutral-900/50 border border-white/5 rounded-[18px] hover:border-white/10 transition-all duration-300 min-h-[160px]">
                        <div className="absolute top-2 right-2 opacity-5 scale-150 rotate-12 transition-transform duration-500 group-hover:scale-[1.75]">
                          <FlaskConical className="w-20 h-20 text-white" />
                        </div>
                        <div className="relative z-10">
                          <h3 className="text-white font-bold text-lg mb-1 leading-tight">Labs</h3>
                          <p className="text-neutral-400 text-[11px] leading-relaxed">
                            Experimental playground &amp; fun micro-tools
                          </p>
                        </div>
                      </div>

                      {/* Right: Items List */}
                      <div className="col-span-3 flex flex-col gap-1 text-left">
                        <DropdownItem
                          icon={<LinkIcon className="w-4 h-4" />}
                          title="Links"
                          subtitle="Socials & Profiles"
                          href="#links"
                        />
                        <DropdownItem
                          icon={<Monitor className="w-4 h-4" />}
                          title="Uses"
                          subtitle="My gear & software"
                          href="#uses"
                        />
                        <DropdownItem
                          icon={<BookOpen className="w-4 h-4" />}
                          title="Guestbook"
                          subtitle="Sign my wall"
                          href="#contact"
                        />
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Divider */}
          <div className="hidden lg:block w-[1px] h-5 bg-white/[0.08] mx-1" />

          {/* Action Buttons */}
          <div className="flex items-center gap-1 sm:gap-2">
            {/* Mobile Search Toggle */}
            <button
              onClick={() => setCommandOpen(true)}
              className="flex lg:hidden items-center justify-center p-2 rounded-full text-neutral-400 hover:bg-white/[0.06] hover:text-white transition-all duration-200"
            >
              <Search className="w-4 h-4" />
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="flex lg:hidden items-center justify-center p-2 rounded-full text-neutral-400 hover:bg-white/[0.06] hover:text-white transition-all duration-200"
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={isMobileMenuOpen ? "close" : "menu"}
                  initial={{ opacity: 0, rotate: -90, scale: 0.7 }}
                  animate={{ opacity: 1, rotate: 0, scale: 1 }}
                  exit={{ opacity: 0, rotate: 90, scale: 0.7 }}
                  transition={{ duration: 0.18, ease: "easeOut" }}
                >
                  {isMobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
                </motion.div>
              </AnimatePresence>
            </button>

            {/* Book a Call CTA */}
            <Link
              href="/contact"
              className="hidden lg:flex relative overflow-hidden items-center justify-center px-4 py-[6px] rounded-full font-medium text-[13px] text-white/90 bg-white/[0.07] border border-white/[0.1] hover:bg-white/[0.13] hover:border-white/20 hover:text-white transition-all duration-200 shadow-[inset_0_1px_0_rgba(255,255,255,0.12)]"
            >
              Book a Call
            </Link>
          </div>

        </div>
      </motion.nav>

      {/* Floating Corner Search Button */}
      <motion.button
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.6, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        onClick={() => setCommandOpen(true)}
        className="fixed top-[18px] right-6 z-[60] hidden lg:flex items-center justify-center w-9 h-9 rounded-full bg-[#111111]/80 border border-white/[0.08] backdrop-blur-md text-neutral-500 hover:text-white hover:border-white/20 hover:bg-white/[0.08] transition-all duration-200 group shadow-lg"
        aria-label="Search"
      >
        <Search className="w-3.5 h-3.5 group-hover:scale-110 transition-transform duration-200" />
      </motion.button>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-[45] bg-[#0B0B0B]/98 backdrop-blur-3xl pt-28 px-6 pb-10 flex flex-col justify-between lg:hidden overflow-y-auto"
          >
            <div className="flex flex-col space-y-6">
              <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-neutral-600 mb-2">Navigation</p>
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-4xl font-bold text-white hover:text-neutral-400 transition-colors"
                >
                  {link.name}
                </Link>
              ))}
              <div className="pt-8 flex flex-col space-y-4">
                <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-neutral-600 mb-2">Discovery</p>
                <Link href="#labs" onClick={() => setIsMobileMenuOpen(false)} className="text-xl text-neutral-300 flex items-center gap-3">
                  <FlaskConical className="w-5 h-5 text-neutral-500" /> Labs
                </Link>
                <Link href="#links" onClick={() => setIsMobileMenuOpen(false)} className="text-xl text-neutral-300 flex items-center gap-3">
                  <LinkIcon className="w-5 h-5 text-neutral-500" /> Links
                </Link>
                <Link href="#uses" onClick={() => setIsMobileMenuOpen(false)} className="text-xl text-neutral-300 flex items-center gap-3">
                  <Monitor className="w-5 h-5 text-neutral-500" /> Uses
                </Link>
                <Link href="#contact" onClick={() => setIsMobileMenuOpen(false)} className="text-xl text-neutral-300 flex items-center gap-3">
                  <BookOpen className="w-5 h-5 text-neutral-500" /> Guestbook
                </Link>
              </div>
            </div>

            <div className="flex flex-col space-y-4 mt-12 pb-6">
              <Link
                href="/contact"
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-full flex items-center justify-center py-4 rounded-2xl font-bold text-lg text-black bg-white hover:bg-neutral-200 transition-all shadow-xl"
              >
                Book a Call
              </Link>
              <p className="text-center text-xs text-neutral-600">Available for projects · 2025</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function DropdownItem({ icon, title, subtitle, href }: { icon: React.ReactNode, title: string, subtitle: string, href: string }) {
  return (
    <Link href={href} className="group flex items-center gap-3 p-2 rounded-[12px] hover:bg-white/5 transition-all duration-200 w-full">
      <div className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-lg bg-neutral-800/50 border border-white/5 text-neutral-400 group-hover:text-white group-hover:border-white/10 transition-colors">
        {icon}
      </div>
      <div className="flex flex-col gap-0 text-left overflow-hidden">
        <span className="text-[14px] text-white font-medium truncate">{title}</span>
        <span className="text-[11px] text-neutral-500 group-hover:text-neutral-400 transition-colors truncate">
          {subtitle}
        </span>
      </div>
    </Link>
  );
}
