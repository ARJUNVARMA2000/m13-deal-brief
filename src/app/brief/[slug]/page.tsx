"use client";

import { useEffect, useState, useRef, use } from "react";
import { useRouter } from "next/navigation";
import { getCompanyBySlug, type Company } from "@/data/companies";
import { type Briefing } from "@/lib/openrouter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { TopRibbon } from "@/components/top-ribbon";
import {
  ArrowLeft,
  Download,
  RefreshCw,
  Clock,
  Building2,
  MapPin,
  Users,
  DollarSign,
  TrendingUp,
  Globe,
  ExternalLink,
  Sparkles,
  Info,
} from "lucide-react";

interface BriefPageProps {
  params: Promise<{ slug: string }>;
}

const loadingSteps = [
  { label: "Pulling company data...", icon: Building2 },
  { label: "Fetching live news...", icon: Globe },
  { label: "Analyzing competitive landscape...", icon: Users },
  { label: "Synthesizing briefing with AI...", icon: Sparkles },
  { label: "Formatting report...", icon: TrendingUp },
];

const sectionLabels = [
  "Company Snapshot",
  "Key Metrics & Traction",
  "Recent Developments",
  "Competitive Landscape",
  "M13 Relationship Context",
  "Discussion Topics",
  "Risk Factors",
];

function BriefingSkeleton() {
  const [step, setStep] = useState(0);
  const [elapsed, setElapsed] = useState(0);

  useEffect(() => {
    const stepInterval = setInterval(() => {
      setStep((s) => (s < loadingSteps.length - 1 ? s + 1 : s));
    }, 2200);
    const tickInterval = setInterval(() => {
      setElapsed((e) => e + 1);
    }, 1000);
    return () => {
      clearInterval(stepInterval);
      clearInterval(tickInterval);
    };
  }, []);

  return (
    <div className="space-y-8">
      {/* Progress header */}
      <div className="rounded-xl border border-border/50 bg-card/30 p-6 backdrop-blur-sm">
        <div className="flex items-center gap-3 mb-4">
          <div className="relative h-10 w-10">
            <div className="absolute inset-0 rounded-full border-2 border-primary/20" />
            <div className="absolute inset-0 rounded-full border-2 border-t-primary animate-spin" />
            <Sparkles className="absolute inset-0 m-auto h-4 w-4 text-primary animate-pulse" />
          </div>
          <div>
            <p className="text-sm font-medium">Generating Investor Briefing</p>
            <p className="text-xs text-muted-foreground">{elapsed}s elapsed</p>
          </div>
        </div>

        {/* Step indicators */}
        <div className="space-y-2">
          {loadingSteps.map((s, i) => {
            const StepIcon = s.icon;
            const isActive = i === step;
            const isDone = i < step;
            return (
              <div
                key={i}
                className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-500 ${
                  isActive
                    ? "bg-primary/10 border border-primary/20"
                    : isDone
                      ? "opacity-60"
                      : "opacity-20"
                }`}
              >
                <StepIcon
                  className={`h-3.5 w-3.5 shrink-0 transition-colors duration-300 ${
                    isActive ? "text-primary" : isDone ? "text-green-400" : "text-muted-foreground"
                  }`}
                />
                <span
                  className={`text-xs transition-colors duration-300 ${
                    isActive ? "text-foreground font-medium" : "text-muted-foreground"
                  }`}
                >
                  {isDone ? s.label.replace("...", " — done") : s.label}
                </span>
                {isActive && (
                  <div className="ml-auto flex gap-0.5">
                    <span className="h-1 w-1 rounded-full bg-primary animate-bounce [animation-delay:0ms]" />
                    <span className="h-1 w-1 rounded-full bg-primary animate-bounce [animation-delay:150ms]" />
                    <span className="h-1 w-1 rounded-full bg-primary animate-bounce [animation-delay:300ms]" />
                  </div>
                )}
                {isDone && (
                  <span className="ml-auto text-[10px] text-green-400">&#10003;</span>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Ghost section cards */}
      <div className="space-y-4">
        {sectionLabels.map((label, i) => (
          <div
            key={i}
            className="rounded-xl border border-border/30 bg-card/20 p-5 animate-pulse"
            style={{ animationDelay: `${i * 200}ms`, animationDuration: "2s" }}
          >
            <div className="flex items-center gap-2 mb-3">
              <Skeleton className="h-4 w-4 rounded" />
              <span className="text-xs text-muted-foreground/40 font-medium">{label}</span>
            </div>
            <div className="space-y-2">
              <Skeleton className="h-3 w-full" style={{ opacity: 0.15 }} />
              <Skeleton className="h-3 w-5/6" style={{ opacity: 0.1 }} />
              <Skeleton className="h-3 w-4/6" style={{ opacity: 0.07 }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function SectionContent({ content }: { content: string }) {
  const lines = content.split("\n");
  const isBulletList = lines.some((l) => l.trim().startsWith("•") || l.trim().startsWith("-"));

  if (isBulletList) {
    return (
      <ul className="space-y-2">
        {lines
          .filter((l) => l.trim())
          .map((line, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground leading-relaxed">
              <span className="text-primary mt-1.5 h-1 w-1 rounded-full bg-current shrink-0" />
              <span>{line.replace(/^[•\-]\s*/, "")}</span>
            </li>
          ))}
      </ul>
    );
  }

  return <p className="text-sm text-muted-foreground leading-relaxed">{content}</p>;
}

const sectionIcons: Record<string, React.ReactNode> = {
  "Company Snapshot": <Building2 className="h-4 w-4" />,
  "Key Metrics & Traction": <TrendingUp className="h-4 w-4" />,
  "Recent Developments": <Sparkles className="h-4 w-4" />,
  "Competitive Landscape": <Users className="h-4 w-4" />,
  "M13 Relationship Context": <DollarSign className="h-4 w-4" />,
  "Suggested Discussion Topics": <Globe className="h-4 w-4" />,
  "Risk Factors": <Clock className="h-4 w-4" />,
};

type SourceType = "curated" | "live-search" | "ai-generated";

const sourceConfig: Record<SourceType, { label: string; color: string; bg: string; border: string }> = {
  curated: { label: "Curated", color: "text-blue-400", bg: "bg-blue-500/10", border: "border-blue-500/20" },
  "live-search": { label: "Live Search", color: "text-emerald-400", bg: "bg-emerald-500/10", border: "border-emerald-500/20" },
  "ai-generated": { label: "AI Generated", color: "text-purple-400", bg: "bg-purple-500/10", border: "border-purple-500/20" },
};

const sectionSources: Record<string, SourceType> = {
  "Company Snapshot": "ai-generated",
  "Key Metrics & Traction": "ai-generated",
  "Recent Developments": "ai-generated",
  "Competitive Landscape": "ai-generated",
  "M13 Relationship Context": "ai-generated",
  "Suggested Discussion Topics": "ai-generated",
  "Risk Factors": "ai-generated",
};

function SourceBadge({ type }: { type: SourceType }) {
  const config = sourceConfig[type];
  return (
    <span className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-medium border ${config.bg} ${config.border} ${config.color}`}>
      <span className={`h-1.5 w-1.5 rounded-full ${type === "curated" ? "bg-blue-400" : type === "live-search" ? "bg-emerald-400" : "bg-purple-400"}`} />
      {config.label}
    </span>
  );
}

function DataSourceLegend() {
  return (
    <div className="rounded-lg border border-border/50 bg-card/30 px-4 py-3 mb-6">
      <div className="flex items-center gap-2 mb-2">
        <Info className="h-3.5 w-3.5 text-muted-foreground" />
        <span className="text-xs font-medium text-muted-foreground">Data Source Legend</span>
      </div>
      <div className="flex flex-wrap gap-3">
        <div className="flex items-center gap-1.5">
          <SourceBadge type="curated" />
          <span className="text-[10px] text-muted-foreground">Sidebar metadata, funding, competitors</span>
        </div>
        <div className="flex items-center gap-1.5">
          <SourceBadge type="live-search" />
          <span className="text-[10px] text-muted-foreground">News via Serper API</span>
        </div>
        <div className="flex items-center gap-1.5">
          <SourceBadge type="ai-generated" />
          <span className="text-[10px] text-muted-foreground">LLM-synthesized briefing sections</span>
        </div>
      </div>
    </div>
  );
}

export default function BriefPage({ params }: BriefPageProps) {
  const { slug } = use(params);
  const router = useRouter();
  const [company, setCompany] = useState<Company | null>(null);
  const [briefing, setBriefing] = useState<Briefing | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const briefingRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const c = getCompanyBySlug(slug);
    if (!c) {
      setError("Company not found");
      setLoading(false);
      return;
    }
    setCompany(c);
    fetchBriefing(slug);
  }, [slug]);

  async function fetchBriefing(companySlug: string) {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/brief?company=${companySlug}`);
      if (!res.ok) throw new Error("Failed to generate briefing");
      const data = await res.json();
      setBriefing(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  async function handleExport() {
    if (!briefingRef.current) return;
    const html2pdf = (await import("html2pdf.js")).default;
    html2pdf()
      .set({
        margin: [0.5, 0.6],
        filename: `${company?.name || "briefing"}-deal-brief.pdf`,
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true },
        jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
      })
      .from(briefingRef.current)
      .save();
  }

  if (error && !company) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <p className="text-muted-foreground mb-4">{error}</p>
          <Button variant="outline" onClick={() => router.push("/")}>
            <ArrowLeft className="h-4 w-4 mr-2" /> Back to Companies
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <TopRibbon />

      {/* Header */}
      <header className="border-b border-border/50 bg-background/80 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => router.push("/")}
              className="text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft className="h-4 w-4 mr-1" /> Back
            </Button>
            <Separator orientation="vertical" className="h-5" />
            <div className="flex items-center gap-2">
              <div className="h-6 w-6 rounded bg-gradient-to-br from-white to-neutral-400 flex items-center justify-center">
                <span className="text-black font-bold text-[10px]">M</span>
              </div>
              <span className="text-sm font-medium">Deal Brief</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => fetchBriefing(slug)}
              disabled={loading}
              className="text-xs"
            >
              <RefreshCw className={`h-3 w-3 mr-1 ${loading ? "animate-spin" : ""}`} />
              Regenerate
            </Button>
            <Button
              size="sm"
              onClick={handleExport}
              disabled={loading || !briefing}
              className="text-xs"
            >
              <Download className="h-3 w-3 mr-1" /> Export PDF
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-8">
          {/* Sidebar — Company Metadata */}
          <aside className="space-y-4">
            <Card className="border-border/50 bg-card/50">
              <CardContent className="p-6">
                <div className="flex justify-end mb-2">
                  <SourceBadge type="curated" />
                </div>
                {/* Company Header */}
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-neutral-700 to-neutral-800 border border-border/50 flex items-center justify-center text-lg font-bold">
                    {company?.name.charAt(0) || "?"}
                  </div>
                  <div>
                    <h2 className="font-semibold text-lg">{company?.name}</h2>
                    <p className="text-xs text-muted-foreground">{company?.sector}</p>
                  </div>
                </div>

                <Separator className="mb-4" />

                {/* Details */}
                <div className="space-y-3 text-sm">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <MapPin className="h-3.5 w-3.5 shrink-0" />
                    <span>{company?.hq}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Users className="h-3.5 w-3.5 shrink-0" />
                    <span>{company?.key_metrics.employees}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <DollarSign className="h-3.5 w-3.5 shrink-0" />
                    <span>{company?.key_metrics.revenue_range}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <TrendingUp className="h-3.5 w-3.5 shrink-0" />
                    <span>{company?.key_metrics.growth}</span>
                  </div>
                  {company?.website && (
                    <a
                      href={company.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
                    >
                      <ExternalLink className="h-3.5 w-3.5 shrink-0" />
                      <span className="underline underline-offset-2">{company.website.replace("https://", "")}</span>
                    </a>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Funding History */}
            <Card className="border-border/50 bg-card/50">
              <CardHeader className="pb-2 pt-4 px-6">
                <CardTitle className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Funding History
                </CardTitle>
              </CardHeader>
              <CardContent className="px-6 pb-4">
                <div className="space-y-3">
                  {company?.funding_history.map((round, i) => (
                    <div key={i} className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2">
                        <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                        <span className="text-muted-foreground">{round.round}</span>
                      </div>
                      <div className="text-right">
                        <span className="font-medium">{round.amount}</span>
                        <span className="text-xs text-muted-foreground ml-2">{round.date}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Competitors */}
            <Card className="border-border/50 bg-card/50">
              <CardHeader className="pb-2 pt-4 px-6">
                <CardTitle className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Competitors
                </CardTitle>
              </CardHeader>
              <CardContent className="px-6 pb-4">
                <div className="flex flex-wrap gap-2">
                  {company?.competitors.map((c, i) => (
                    <Badge key={i} variant="secondary" className="text-xs">
                      {c}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </aside>

          {/* Main Content — Briefing */}
          <main>
            <div ref={briefingRef}>
              {/* Briefing Header */}
              <div className="mb-6 flex items-center justify-between">
                <div>
                  <h1 className="text-2xl font-bold tracking-tight">
                    {company?.name} — Investor Briefing
                  </h1>
                  {briefing && (
                    <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      Generated{" "}
                      {new Date(briefing.generated_at).toLocaleString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                        hour: "numeric",
                        minute: "2-digit",
                      })}
                    </p>
                  )}
                </div>
                <Badge variant="outline" className="text-[10px] font-mono">
                  CONFIDENTIAL
                </Badge>
              </div>

              {/* Data Source Legend */}
              {!loading && !error && briefing && <DataSourceLegend />}

              {/* Briefing Sections */}
              {loading ? (
                <BriefingSkeleton />
              ) : error ? (
                <Card className="border-destructive/50">
                  <CardContent className="p-6 text-center">
                    <p className="text-sm text-destructive">{error}</p>
                    <Button
                      variant="outline"
                      size="sm"
                      className="mt-4"
                      onClick={() => fetchBriefing(slug)}
                    >
                      Try Again
                    </Button>
                  </CardContent>
                </Card>
              ) : (
                <div className="space-y-6">
                  {briefing?.sections.map((section, i) => (
                    <Card
                      key={i}
                      className="border-border/50 bg-card/50 animate-in fade-in slide-in-from-bottom-4 duration-500 fill-mode-both"
                      style={{ animationDelay: `${i * 100}ms` }}
                    >
                      <CardHeader className="pb-2 pt-5 px-6">
                        <CardTitle className="flex items-center gap-2 text-base font-semibold">
                          <span className="text-muted-foreground">
                            {sectionIcons[section.title] || <Sparkles className="h-4 w-4" />}
                          </span>
                          {section.title}
                          <span className="ml-auto">
                            <SourceBadge type={sectionSources[section.title] || "ai-generated"} />
                          </span>
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="px-6 pb-5">
                        <SectionContent content={section.content} />
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          </main>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-border/30 py-6 mt-12">
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between text-xs text-muted-foreground">
          <span>M13 Deal Brief — Built by Varma</span>
          <span>AI-Generated · For Internal Use Only</span>
        </div>
      </footer>
    </div>
  );
}
