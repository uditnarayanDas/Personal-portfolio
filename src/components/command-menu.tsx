"use client";

import React, { useEffect, useState } from "react";
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
  Github,
  Linkedin,
  Twitter,
  Shield,
  FileText as FileTextIcon
} from "lucide-react";
import { useRouter } from "next/navigation";

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
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, [open, setOpen]);

  const runCommand = (command: () => void) => {
    setOpen(false);
    command();
  };

  const pages = [
    { icon: <Home className="h-4 w-4" />, name: "Home", description: "Go to homepage", href: "/" },
    { icon: <User className="h-4 w-4" />, name: "About", description: "Learn more about me", href: "#about" },
    { icon: <Briefcase className="h-4 w-4" />, name: "Projects", description: "View my work", href: "#work" },
    { icon: <FileText className="h-4 w-4" />, name: "Blog", description: "Read my thoughts", href: "#blog" },
    { icon: <MessageSquare className="h-4 w-4" />, name: "Guestbook", description: "Leave a message", href: "#contact" },
    { icon: <MonitorSmartphone className="h-4 w-4" />, name: "Uses", description: "My tech stack", href: "#uses" },
    { icon: <LinkIcon className="h-4 w-4" />, name: "Links", description: "All my links", href: "#links" },
  const connects = [
    { icon: <Github className="h-4 w-4" />, name: "GitHub", description: "@ksparth12", href: "https://github.com/ksparth12" },
    { icon: <Linkedin className="h-4 w-4" />, name: "LinkedIn", description: "Professional network", href: "https://linkedin.com" },
    { icon: <Twitter className="h-4 w-4" />, name: "X (Twitter)", description: "@ksparth12", href: "https://twitter.com/ksparth12" },
  ];

  const legals = [
    { icon: <Shield className="h-4 w-4" />, name: "Privacy Policy", description: "Data handling", href: "/privacy" },
    { icon: <FileTextIcon className="h-4 w-4" />, name: "Terms of Service", description: "Usage rules", href: "/terms" },
  ];

  return (
    <>
      {open && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm" onClick={() => setOpen(false)} />
      )}
      <Command.Dialog 
        open={open} 
        onOpenChange={setOpen}
        label="Global Command Menu"
        className="fixed top-[15vh] left-1/2 -translate-x-1/2 z-[100] w-[90vw] max-w-[640px] overflow-hidden rounded-xl border border-white/10 bg-[#121212] shadow-[0_0_40px_rgba(0,0,0,0.5)] ring-1 ring-white/5 flex flex-col font-sans outline-none"
      >
      <div className="flex items-center px-4 py-3 border-b border-white/10">
        <Search className="h-5 w-5 text-neutral-400 mr-3" />
        <Command.Input 
          autoFocus
          placeholder="Type a command or search..." 
          className="flex-1 bg-transparent text-sm text-white placeholder:text-neutral-500 outline-none border-none focus:ring-0 w-full"
        />
        <div className="flex items-center gap-2">
          <kbd className="hidden sm:inline-flex h-6 items-center gap-1 rounded bg-white/10 px-2 text-[10px] font-medium text-neutral-400">
            ESC
          </kbd>
        </div>
      </div>

      <Command.List className="h-[min(350px,var(--cmdk-list-height))] max-h-[50vh] overflow-y-auto p-2 scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent">
        <Command.Empty className="py-6 text-center text-sm text-neutral-500">
          No results found.
        </Command.Empty>

        <Command.Group heading="PAGES" className="text-xs font-semibold text-neutral-500 px-2 pt-2 pb-1 [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:pb-2">
          {pages.map((page) => (
            <Command.Item
              key={page.name}
              value={page.name}
              onSelect={() => runCommand(() => router.push(page.href))}
              className="group flex cursor-pointer items-center justify-between rounded-lg px-3 py-3 text-sm text-neutral-300 aria-selected:bg-white/10 aria-selected:text-white transition-all duration-200"
            >
              <div className="flex items-center gap-3">
                <div className="text-neutral-400 group-aria-selected:text-white transition-colors">
                  {page.icon}
                </div>
                <div className="flex flex-col">
                  <span className="font-medium">{page.name}</span>
                  <span className="text-xs text-neutral-500 group-aria-selected:text-neutral-400 transition-colors">
                    {page.description}
                  </span>
                </div>
              </div>
              
              <kbd className="hidden sm:inline-flex opacity-0 group-aria-selected:opacity-100 transition-opacity h-5 items-center gap-1 text-[16px] text-neutral-400">
                ↵
              </kbd>
            </Command.Item>
          ))}
        </Command.Group>

        <Command.Group heading="CONNECT" className="text-xs font-semibold text-neutral-500 px-2 pt-2 pb-1 mt-2 [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:pb-2">
          {connects.map((item) => (
            <Command.Item
              key={item.name}
              value={item.name}
              onSelect={() => runCommand(() => router.push(item.href))}
              className="group flex cursor-pointer items-center justify-between rounded-lg px-3 py-3 text-sm text-neutral-300 aria-selected:bg-[#202020] aria-selected:text-white transition-all duration-200"
            >
              <div className="flex items-center gap-3">
                <div className="text-neutral-400 group-aria-selected:text-white transition-colors">
                  {item.icon}
                </div>
                <div className="flex flex-col">
                  <span className="font-medium">{item.name}</span>
                  <span className="text-xs text-neutral-500 group-aria-selected:text-neutral-400 transition-colors">
                    {item.description}
                  </span>
                </div>
              </div>
              
              <kbd className="hidden sm:inline-flex opacity-0 group-aria-selected:opacity-100 transition-opacity h-5 items-center gap-1 text-[16px] text-neutral-400">
                ↵
              </kbd>
            </Command.Item>
          ))}
        </Command.Group>

        <Command.Group heading="LEGAL" className="text-xs font-semibold text-neutral-500 px-2 pt-2 pb-1 mt-2 [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:pb-2">
          {legals.map((item) => (
            <Command.Item
              key={item.name}
              value={item.name}
              onSelect={() => runCommand(() => router.push(item.href))}
              className="group flex cursor-pointer items-center justify-between rounded-lg px-3 py-3 text-sm text-neutral-300 aria-selected:bg-[#202020] aria-selected:text-white transition-all duration-200"
            >
              <div className="flex items-center gap-3">
                <div className="text-neutral-400 group-aria-selected:text-white transition-colors">
                  {item.icon}
                </div>
                <div className="flex flex-col">
                  <span className="font-medium">{item.name}</span>
                  <span className="text-xs text-neutral-500 group-aria-selected:text-neutral-400 transition-colors">
                    {item.description}
                  </span>
                </div>
              </div>
              
              <kbd className="hidden sm:inline-flex opacity-0 group-aria-selected:opacity-100 transition-opacity h-5 items-center gap-1 text-[16px] text-neutral-400">
                ↵
              </kbd>
            </Command.Item>
          ))}
        </Command.Group>
      </Command.List>

      <div className="flex items-center justify-between px-4 py-3 bg-[#000000]/40 border-t border-white/10 text-xs text-neutral-500">
        <div className="flex items-center gap-4">
          <span className="hover:text-neutral-300 cursor-pointer transition-colors">Privacy</span>
          <span className="hover:text-neutral-300 cursor-pointer transition-colors">Terms</span>
        </div>
        <div className="flex items-center gap-4 hidden sm:flex">
          <span className="flex items-center gap-1">
             Navigate
          </span>
          <span className="flex items-center gap-1">
             Open
          </span>
        </div>
      </div>
    </Command.Dialog>
    </>
  );
}
