"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { companies } from "@/data/companies";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { TopRibbon } from "@/components/top-ribbon";
import {
  Search,
  Building2,
  MapPin,
  Calendar,
  ArrowRight,
  Sparkles,
  TrendingUp,
  BarChart3,
} from "lucide-react";

const sectorColors: Record<string, string> = {
  "Mobility / Transportation": "bg-blue-500/20 text-blue-300 border-blue-500/30",
  "Commerce / Social Discovery": "bg-pink-500/20 text-pink-300 border-pink-500/30",
  "IoT / Smart Home Security": "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
  "Fintech / B2B Finance": "bg-amber-500/20 text-amber-300 border-amber-500/30",
  "PropTech / Spatial Computing": "bg-violet-500/20 text-violet-300 border-violet-500/30",
  "GovTech / Public Safety": "bg-red-500/20 text-red-300 border-red-500/30",
};

const sectorIcons: Record<string, React.ReactNode> = {
  "Mobility / Transportation": <TrendingUp className="h-4 w-4" />,
  "Commerce / Social Discovery": <BarChart3 className="h-4 w-4" />,
  "IoT / Smart Home Security": <Building2 className="h-4 w-4" />,
  "Fintech / B2B Finance": <BarChart3 className="h-4 w-4" />,
  "PropTech / Spatial Computing": <Building2 className="h-4 w-4" />,
  "GovTech / Public Safety": <Sparkles className="h-4 w-4" />,
};

export default function Home() {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [hoveredSlug, setHoveredSlug] = useState<string | null>(null);

  const filtered = useMemo(() => {
    if (!search) return companies;
    const q = search.toLowerCase();
    return companies.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.sector.toLowerCase().includes(q) ||
        c.description.toLowerCase().includes(q)
    );
  }, [search]);

  return (
    <div className="min-h-screen bg-background">
      <TopRibbon />

      {/* Header */}
      <header className="border-b border-border/50 bg-background/80 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-white to-neutral-400 flex items-center justify-center">
              <span className="text-black font-bold text-sm">M</span>
            </div>
            <div>
              <h1 className="text-lg font-semibold tracking-tight">M13 Deal Brief</h1>
              <p className="text-xs text-muted-foreground">Portfolio Intelligence Platform</p>
            </div>
          </div>
          <Badge variant="outline" className="text-xs font-mono">
            v1.0 — {new Date().toLocaleDateString("en-US", { month: "short", year: "numeric" })}
          </Badge>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 pt-16 pb-8">
        <div className="max-w-2xl">
          <h2 className="text-4xl font-bold tracking-tight mb-3">
            Meeting Prep,{" "}
            <span className="bg-gradient-to-r from-neutral-200 to-neutral-500 bg-clip-text text-transparent">
              Automated
            </span>
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            Select a portfolio company to generate a structured investor briefing.
            AI-synthesized analysis ready for your next partner meeting.
          </p>
        </div>

        {/* Search */}
        <div className="relative mt-8 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search companies, sectors..."
            className="pl-10 bg-card border-border/50 h-11"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </section>

      {/* Company Grid */}
      <section className="max-w-7xl mx-auto px-6 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((company) => (
            <Card
              key={company.slug}
              className={`group cursor-pointer transition-all duration-300 border-border/50 hover:border-border bg-card/50 hover:bg-card ${
                hoveredSlug === company.slug ? "shadow-lg shadow-white/5 scale-[1.02]" : ""
              }`}
              onClick={() => router.push(`/brief/${company.slug}`)}
              onMouseEnter={() => setHoveredSlug(company.slug)}
              onMouseLeave={() => setHoveredSlug(null)}
            >
              <CardContent className="p-6">
                {/* Top Row: Name + Arrow */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-neutral-700 to-neutral-800 border border-border/50 flex items-center justify-center text-sm font-bold">
                      {company.name.charAt(0)}
                    </div>
                    <div>
                      <h3 className="font-semibold text-base">{company.name}</h3>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <MapPin className="h-3 w-3" />
                        {company.hq}
                      </div>
                    </div>
                  </div>
                  <ArrowRight
                    className={`h-4 w-4 text-muted-foreground transition-all duration-300 ${
                      hoveredSlug === company.slug
                        ? "translate-x-0 opacity-100"
                        : "-translate-x-2 opacity-0"
                    }`}
                  />
                </div>

                {/* Description */}
                <p className="text-sm text-muted-foreground leading-relaxed mb-4 line-clamp-2">
                  {company.description}
                </p>

                {/* Badges */}
                <div className="flex flex-wrap gap-2">
                  <Badge
                    variant="outline"
                    className={`text-[10px] font-medium ${sectorColors[company.sector] || "bg-neutral-500/20 text-neutral-300"}`}
                  >
                    {sectorIcons[company.sector]}
                    <span className="ml-1">{company.sector}</span>
                  </Badge>
                  <Badge variant="outline" className="text-[10px] font-medium">
                    <Calendar className="h-3 w-3 mr-1" />
                    {company.founded}
                  </Badge>
                </div>

                {/* Stage */}
                <div className="mt-3 pt-3 border-t border-border/30 flex items-center justify-between">
                  <span className="text-[11px] text-muted-foreground font-mono">
                    {company.stage}
                  </span>
                  <span className="text-[11px] text-muted-foreground">
                    {company.key_metrics.growth}
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20 text-muted-foreground">
            <Search className="h-8 w-8 mx-auto mb-3 opacity-50" />
            <p>No companies match your search.</p>
          </div>
        )}
      </section>

      {/* Footer */}
      <footer className="border-t border-border/30 py-6">
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between text-xs text-muted-foreground">
          <span>Built by Varma — M13 Data Analyst Intern Application</span>
          <span>Powered by AI · {companies.length} Portfolio Companies</span>
        </div>
      </footer>
    </div>
  );
}
