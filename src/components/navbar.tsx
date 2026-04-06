"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
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

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [commandOpen, setCommandOpen] = useState(false);
  const [isMoreOpen, setIsMoreOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen]);

  const navLinks = [
    { name: "Home", href: "/", active: true },
    { name: "About", href: "#about" },
    { name: "Work", href: "#work" },
    { name: "Blogs", href: "#blogs" },
  ];

  return (
    <>
      <CommandMenu open={commandOpen} setOpen={setCommandOpen} />

      <motion.nav
        id="navbar"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 transition-all duration-300 ${
          isScrolled ? "scale-95 py-1" : "scale-100 py-2"
        }`}
      >
        <div className="flex items-center gap-1 sm:gap-2 px-3 py-1.5 bg-[#121212]/80 backdrop-blur-xl border border-white/10 shadow-2xl rounded-full font-sans">
          
          {/* Navigation Links (Desktop - now at lg breakpoint for tablet space) */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`relative px-4 py-1.5 rounded-full text-sm font-medium transition-colors duration-300 ${
                  link.active
                    ? "bg-white text-black"
                    : "text-neutral-300 hover:bg-neutral-800 hover:text-white"
                }`}
              >
                {link.name}
              </Link>
            ))}
            
            <div 
              className="relative"
              onMouseEnter={() => setIsMoreOpen(true)}
              onMouseLeave={() => setIsMoreOpen(false)}
            >
              <button className="flex items-center gap-1 px-4 py-1.5 rounded-full text-sm font-medium text-neutral-300 hover:bg-neutral-800 hover:text-white transition-colors duration-300 outline-none">
                More 
                <ChevronDown className={`w-3 h-3 opacity-70 transition-transform duration-300 ${isMoreOpen ? "rotate-180" : ""}`} />
              </button>

              <AnimatePresence>
                {isMoreOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                    className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-[480px] p-4 bg-[#121212]/95 backdrop-blur-2xl border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] rounded-[24px] z-50 pointer-events-auto overflow-hidden text-left"
                  >
                    <div className="grid grid-cols-5 gap-4">
                      {/* Left: Labs Card */}
                      <div className="col-span-2 group relative overflow-hidden flex flex-col justify-end p-4 bg-gradient-to-br from-neutral-800/50 to-neutral-900/50 border border-white/5 rounded-[18px] hover:border-white/10 transition-all duration-300 min-h-[160px]">
                        <div className="absolute top-2 right-2 opacity-5 scale-150 rotate-12 transition-transform duration-500 group-hover:scale-175">
                          <FlaskConical className="w-20 h-20 text-white" />
                        </div>
                        <div className="relative z-10">
                          <h3 className="text-white font-bold text-lg mb-1 leading-tight">Labs</h3>
                          <p className="text-neutral-400 text-[11px] leading-relaxed">
                            Experimental playground & fun micro-tools
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

          <div className="hidden lg:block w-[1px] h-6 bg-white/10" />

          {/* Action Buttons */}
          <div className="flex items-center gap-1 sm:gap-2">
            {/* Mobile Search Toggle */}
            <button 
              onClick={() => setCommandOpen(true)}
              className="flex lg:hidden items-center justify-center p-2 rounded-full text-neutral-300 hover:bg-neutral-800 hover:text-white transition-colors duration-300"
            >
              <Search className="w-4 h-4" />
            </button>

            {/* Mobile Menu Toggle */}
            {/* Mobile Menu Toggle */}
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="flex lg:hidden items-center justify-center p-2 rounded-full text-neutral-300 hover:bg-neutral-800 hover:text-white transition-colors duration-300"
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={isMobileMenuOpen ? "close" : "menu"}
                  initial={{ opacity: 0, rotate: -90 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  exit={{ opacity: 0, rotate: 90 }}
                  transition={{ duration: 0.2 }}
                >
                  {isMobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
                </motion.div>
              </AnimatePresence>
            </button>

            {/* Book a Call hidden on tablet where it squishes */}
            <Link
              href="#book"
              className="hidden lg:flex relative overflow-hidden items-center justify-center px-5 py-1.5 rounded-full font-medium text-sm text-white bg-gradient-to-b from-white/10 to-transparent border border-white/10 hover:from-white/20 hover:border-white/20 transition-all duration-300 shadow-[inset_0_1px_rgba(255,255,255,0.2)]"
            >
              Book a Call
            </Link>
          </div>
          
        </div>
      </motion.nav>

      {/* Floating Corner Search Button - Hidden on Mobile since it's now in the navbar */}
      <motion.button
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        onClick={() => setCommandOpen(true)}
        className="fixed top-8 right-8 z-[60] hidden lg:flex items-center justify-center w-10 h-10 rounded-full bg-white/5 border border-white/10 backdrop-blur-md text-neutral-400 hover:text-white hover:bg-white/10 transition-all duration-300 group shadow-lg floating-search-btn"
        aria-label="Search"
      >
        <Search className="w-4 h-4 group-hover:scale-110 transition-transform" />
      </motion.button>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-[45] bg-[#0B0B0B]/95 backdrop-blur-3xl pt-28 px-6 pb-10 flex flex-col justify-between lg:hidden overflow-y-auto"
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
                href="#book"
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-full flex items-center justify-center py-4 rounded-2xl font-bold text-lg text-black bg-white hover:bg-neutral-200 transition-all shadow-xl"
              >
                Book a Call
              </Link>
              <p className="text-center text-xs text-neutral-600">Available for projects 2024</p>
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
