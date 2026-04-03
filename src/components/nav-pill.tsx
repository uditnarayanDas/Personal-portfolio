"use client"
import React from "react";
import { 
  IconHome, 
  IconUser, 
  IconBriefcase, 
  IconBrandGithub, 
  IconBrandX, 
  IconMessage 
} from "@tabler/icons-react";
import Link from "next/link";
import { motion } from "motion/react";

export function NavPill() {
  const navItems = [
    { icon: <IconHome size={20} />, href: "/", label: "Home" },
    { icon: <IconUser size={20} />, href: "#about", label: "About" },
    { icon: <IconBriefcase size={20} />, href: "#work", label: "Work" },
    { icon: <IconBrandGithub size={20} />, href: "https://github.com", label: "GitHub" },
    { icon: <IconBrandX size={20} />, href: "https://x.com", label: "X" },
    { icon: <IconMessage size={20} />, href: "#contact", label: "Contact" },
  ];

  return (
    <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-50">
      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="flex items-center gap-1 bg-[#121212]/80 backdrop-blur-xl border border-white/10 px-2 py-2 rounded-[32px] shadow-2xl"
      >
        {navItems.map((item, idx) => (
          <Link 
            key={idx} 
            href={item.href}
            className="relative group p-3 rounded-full hover:bg-white/5 transition-all duration-300"
          >
            <div className="text-neutral-400 group-hover:text-white transition-colors duration-300">
              {item.icon}
            </div>
            {/* Tooltip (Optional, can be added if needed) */}
          </Link>
        ))}
      </motion.div>
    </div>
  );
}
