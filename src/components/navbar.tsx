"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { Search, ChevronDown } from "lucide-react";
import { CommandMenu } from "@/components/command-menu";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [commandOpen, setCommandOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 transition-all duration-300 ${
          isScrolled ? "scale-95 py-2" : "scale-100 py-3"
        }`}
      >
        <div className="flex items-center gap-1 sm:gap-2 px-3 py-2 bg-[#121212]/80 backdrop-blur-xl border border-white/10 shadow-2xl rounded-full font-sans">
          
          {/* Navigation Links */}
          <div className="flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`relative px-4 py-2 rounded-full text-sm font-medium transition-colors duration-300 ${
                  link.active
                    ? "bg-white text-black"
                    : "text-neutral-300 hover:bg-neutral-800 hover:text-white"
                }`}
              >
                {link.name}
              </Link>
            ))}
            
            <button className="flex items-center gap-1 px-4 py-2 rounded-full text-sm font-medium text-neutral-300 hover:bg-neutral-800 hover:text-white transition-colors duration-300">
              More 
              <ChevronDown className="w-3 h-3 opacity-70" />
            </button>
          </div>

          <div className="w-[1px] h-6 bg-white/10 mx-2" />

          {/* Action Buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCommandOpen(true)}
              className="flex items-center justify-center p-2 rounded-full text-neutral-300 hover:bg-neutral-800 hover:text-white transition-colors duration-300 group"
              aria-label="Search"
            >
              <Search className="w-4 h-4 group-hover:scale-110 transition-transform" />
            </button>

            <Link
              href="#book"
              className="relative overflow-hidden flex items-center justify-center px-5 py-2 rounded-full font-medium text-sm text-white bg-gradient-to-b from-white/10 to-transparent border border-white/10 hover:from-white/20 hover:border-white/20 transition-all duration-300 shadow-[inset_0_1px_rgba(255,255,255,0.2)]"
            >
              Book a Call
            </Link>
          </div>
          
        </div>
      </motion.nav>
    </>
  );
}
