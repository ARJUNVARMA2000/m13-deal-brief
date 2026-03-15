"use client";

import { Linkedin, Github, Globe, ExternalLink } from "lucide-react";

export function TopRibbon() {
  return (
    <div className="w-full bg-gradient-to-r from-neutral-950 via-neutral-900 to-neutral-950 border-b border-border/30">
      <div className="max-w-7xl mx-auto px-6 py-2.5 flex flex-col sm:flex-row items-center justify-between gap-2">
        {/* Left: Identity */}
        <div className="flex items-center gap-2 text-xs">
          <span className="font-semibold text-foreground">Arjun Varma</span>
          <span className="text-muted-foreground">|</span>
          <span className="text-muted-foreground">M13 Data Analyst Intern — Application Project</span>
        </div>

        {/* Center: POC disclaimer */}
        <div className="hidden md:flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/20">
          <span className="h-1.5 w-1.5 rounded-full bg-amber-400 animate-pulse" />
          <span className="text-[10px] text-amber-300/90 font-medium">
            Proof of Concept — Public data sources only
          </span>
        </div>

        {/* Right: Links */}
        <div className="flex items-center gap-3">
          <a
            href="https://linkedin.com/in/varma-arjun/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-[11px] text-muted-foreground hover:text-foreground transition-colors"
          >
            <Linkedin className="h-3 w-3" />
            <span className="hidden sm:inline">LinkedIn</span>
          </a>
          <a
            href="https://github.com/ARJUNVARMA2000"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-[11px] text-muted-foreground hover:text-foreground transition-colors"
          >
            <Github className="h-3 w-3" />
            <span className="hidden sm:inline">GitHub</span>
          </a>
          <a
            href="https://arjun-varma.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-[11px] text-muted-foreground hover:text-foreground transition-colors"
          >
            <Globe className="h-3 w-3" />
            <span className="hidden sm:inline">Portfolio</span>
          </a>
        </div>
      </div>

      {/* Mobile POC disclaimer */}
      <div className="md:hidden flex items-center justify-center gap-1.5 px-4 pb-2">
        <span className="h-1.5 w-1.5 rounded-full bg-amber-400 animate-pulse" />
        <span className="text-[10px] text-amber-300/90 font-medium">
          Proof of Concept — Public data sources only
        </span>
      </div>
    </div>
  );
}
