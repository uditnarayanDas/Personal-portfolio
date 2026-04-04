"use client";

import React, { useEffect } from "react";
import { Command } from "cmdk";
import {
  Search,
  Home,
  User,
  Briefcase,
  FileText,
  MessageSquare,
  MonitorSmartphone,
  Link as LinkIcon,
  Shield,
  FileText as FileTextIcon,
  CornerDownLeft,
  ArrowUp,
  ArrowDown,
  X
} from "lucide-react";
import { IconBrandGithub, IconBrandLinkedin, IconBrandX } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";

export function CommandMenu({
  open,
  setOpen
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
}) {
  const router = useRouter();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen(!open);
      }
      if (e.key === "Escape") {
        setOpen(false);
      }
    };

    document.addEventListener("keydown", down);

    if (open) {
      document.documentElement.classList.add("command-menu-open");
    } else {
      document.documentElement.classList.remove("command-menu-open");
    }

    return () => {
      document.removeEventListener("keydown", down);
      document.documentElement.classList.remove("command-menu-open");
    };
  }, [open, setOpen]);

  const runCommand = (command: () => void) => {
    setOpen(false);
    command();
  };

  const sections = [
    {
      group: "PAGES",
      items: [
        { icon: <Home className="h-4 w-4" />, name: "Home", subtitle: "Go to homepage", href: "/" },
        { icon: <User className="h-4 w-4" />, name: "About", subtitle: "Learn more about me", href: "#about" },
        { icon: <Briefcase className="h-4 w-4" />, name: "Projects", subtitle: "View my recently built work", href: "#work" },
        { icon: <FileText className="h-4 w-4" />, name: "Blog", subtitle: "Read my latest thoughts and articles", href: "#blog" },
        { icon: <MessageSquare className="h-4 w-4" />, name: "Guestbook", subtitle: "Leave a message or some feedback", href: "#contact" },
        { icon: <MonitorSmartphone className="h-4 w-4" />, name: "Uses", subtitle: "Explore my tech stack and tools", href: "#uses" },
        { icon: <LinkIcon className="h-4 w-4" />, name: "Links", subtitle: "All my important links and profiles", href: "#links" },
      ]
    },
    {
      group: "CONNECT",
      items: [
        { icon: <IconBrandGithub className="h-4 w-4" />, name: "GitHub", subtitle: "@ksparth12", href: "https://github.com/ksparth12" },
        { icon: <IconBrandLinkedin className="h-4 w-4" />, name: "LinkedIn", subtitle: "Professional network connections", href: "https://linkedin.com" },
        { icon: <IconBrandX className="h-4 w-4" />, name: "X (Twitter)", subtitle: "@ksparth12", href: "https://twitter.com/ksparth12" },
      ]
    },
    {
      group: "LEGAL",
      items: [
        { icon: <Shield className="h-4 w-4" />, name: "Privacy Policy", subtitle: "Data handling and user privacy", href: "/privacy" },
        { icon: <FileTextIcon className="h-4 w-4" />, name: "Terms of Service", subtitle: "Usage rules and platform terms", href: "/terms" },
      ]
    }
  ];

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-[4px]"
            onClick={() => setOpen(false)}
          />

          <motion.div
            initial={{ scale: 0.98, opacity: 0, y: 10 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.98, opacity: 0, y: 10 }}
            transition={{ type: "spring", damping: 25, stiffness: 300, duration: 0.3 }}
            className="fixed top-0 sm:top-[15vh] left-1/2 -translate-x-1/2 z-[100] w-full sm:w-[95vw] sm:max-w-[640px] flex flex-col h-full sm:h-auto"
          >
            <Command
              label="Global Command Menu"
              className="w-full h-full sm:h-auto overflow-hidden sm:rounded-2xl border-x-0 sm:border border-white/5 bg-[#0B0B0B]/70 backdrop-blur-md shadow-[0_32px_64px_-16px_rgba(0,0,0,0.8)] flex flex-col font-sans outline-none noise-bg inner-glow"
            >
              {/* Header */}
              <div className="flex items-center px-4 py-4 border-b border-white/5">
                <Search className="h-[18px] w-[18px] text-neutral-500 mr-3" />
                <Command.Input
                  autoFocus
                  placeholder="Type a command or search..."
                  className="flex-1 bg-transparent text-xs text-neutral-200 placeholder:text-neutral-600 outline-none border-none focus:ring-0 w-full"
                />
                <div className="flex items-center gap-3">

                  <kbd className="hidden sm:inline-flex h-[22px] items-center rounded-md border border-white/10 bg-white/5 px-2 text-[10px] font-medium text-neutral-500 shadow-sm leading-none">
                    ESC
                  </kbd>
                  <button
                    onClick={() => setOpen(false)}
                    className="sm:hidden p-2 -mr-2 text-neutral-400 hover:text-white"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
              </div>

              {/* Content List */}
              <Command.List className="max-h-[420px] overflow-y-auto p-2 scroll-smooth scrollbar-none md:scrollbar-thin scrollbar-thumb-white/10 hover:scrollbar-thumb-white/20 scrollbar-track-transparent">
                <Command.Empty className="py-12 text-center text-sm text-neutral-600 font-medium">
                  No results found for your search.
                </Command.Empty>

                {sections.map((section) => (
                  <Command.Group
                    key={section.group}
                    heading={section.group}
                    className="text-[11px] font-bold tracking-[0.05em] text-neutral-600 px-3 pt-4 pb-2 [&_[cmdk-group-heading]]:pb-2"
                  >
                    {section.items.map((item) => (
                      <Command.Item
                        key={item.name}
                        value={item.name}
                        onSelect={() => runCommand(() => router.push(item.href))}
                        className="group relative flex cursor-pointer items-center justify-between rounded-xl px-3 py-2 my-0.5 outline-none aria-selected:scale-[1.005] transition-all duration-200 ease-out"
                      >
                        {/* Custom selection background with glass gradient */}
                        <div className="absolute inset-0 rounded-xl bg-white/0 group-aria-selected:bg-gradient-to-r group-aria-selected:from-white/5 group-aria-selected:to-white/[0.01] group-aria-selected:shadow-[inset_0_0_0_1px_rgba(255,255,255,0.05)] transition-all duration-300 pointer-events-none" />

                        <div className="relative flex items-center gap-3">
                          <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/5 bg-white/[0.02] text-neutral-500 group-aria-selected:text-white group-aria-selected:border-white/10 group-aria-selected:bg-white/5 transition-all duration-300">
                            {item.icon}
                          </div>
                          <div className="flex flex-col gap-0">
                            <span className="text-[13px] font-medium text-neutral-400 group-aria-selected:text-white transition-colors">
                              {item.name}
                            </span>
                            <span className="text-[11px] text-neutral-600 group-aria-selected:text-neutral-400 transition-colors">
                              {item.subtitle}
                            </span>
                          </div>
                        </div>

                        <div className="relative flex items-center">
                          <CornerDownLeft className="h-3.5 w-3.5 text-neutral-700 opacity-0 group-aria-selected:opacity-100 transition-all duration-300 transform translate-x-1 group-aria-selected:translate-x-0" />
                        </div>
                      </Command.Item>
                    ))}
                  </Command.Group>
                ))}
              </Command.List>

              {/* Bottom bar */}
              <div className="flex items-center justify-between px-5 py-3 border-t border-white/5 bg-[#000000]/20 text-[11px] font-medium text-neutral-600">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-4">
                    <span className="flex items-center gap-1.5 hover:text-neutral-400 transition-colors cursor-pointer">
                      Privacy
                    </span>
                    <span className="flex items-center gap-1.5 hover:text-neutral-400 transition-colors cursor-pointer">
                      Terms
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <div className="flex items-center gap-2.5">
                    <div className="flex items-center gap-1">
                      <ArrowUp className="h-2.5 w-2.5" />
                      <ArrowDown className="h-2.5 w-2.5" />
                    </div>
                    <span>Navigate</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CornerDownLeft className="h-2.5 w-2.5" />
                    <span>Open</span>
                  </div>
                </div>
              </div>
            </Command>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
