import { Company } from "@/data/companies";

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY || "";
const OPENROUTER_BASE_URL = "https://openrouter.ai/api/v1/chat/completions";

export interface BriefingSection {
  title: string;
  content: string;
}

export interface Briefing {
  company_name: string;
  generated_at: string;
  sections: BriefingSection[];
}

function buildPrompt(company: Company, newsContext: string): string {
  return `You are a senior research analyst at M13, a technology-focused venture capital firm. Generate a structured investor briefing document for an upcoming partner meeting about ${company.name}.

## Company Data
- Name: ${company.name}
- Sector: ${company.sector}
- Stage: ${company.stage}
- Founded: ${company.founded}
- HQ: ${company.hq}
- Founders: ${company.founders.join(", ")}
- Description: ${company.description}
- Key Metrics: Employees: ${company.key_metrics.employees}, Revenue: ${company.key_metrics.revenue_range}, Growth: ${company.key_metrics.growth}
- Competitors: ${company.competitors.join(", ")}
- M13 Relationship: ${company.m13_relationship}
- Recent Milestones: ${company.recent_milestones.join("; ")}
- Funding History: ${company.funding_history.map((f) => `${f.round}: ${f.amount} (${f.date}, led by ${f.lead})`).join("; ")}

## Recent News Context
${newsContext || "No additional live news available. Use curated milestones above."}

## Output Format
Generate EXACTLY 7 sections in this JSON array format. Each section should be substantive (3-6 sentences or 4-8 bullet points). Write in a professional, analytical tone appropriate for VC partners.

Return ONLY valid JSON — no markdown, no code fences, no extra text:
[
  {"title": "Company Snapshot", "content": "One comprehensive paragraph overview..."},
  {"title": "Key Metrics & Traction", "content": "• Bullet point 1\\n• Bullet point 2\\n..."},
  {"title": "Recent Developments", "content": "Synthesized analysis of recent news and milestones..."},
  {"title": "Competitive Landscape", "content": "Analysis of competitive positioning..."},
  {"title": "M13 Relationship Context", "content": "Investment history and relationship details..."},
  {"title": "Suggested Discussion Topics", "content": "• Question 1\\n• Question 2\\n..."},
  {"title": "Risk Factors", "content": "• Risk 1\\n• Risk 2\\n..."}
]`;
}

export async function generateBriefing(
  company: Company,
  newsContext: string = ""
): Promise<Briefing> {
  if (!OPENROUTER_API_KEY) {
    return generateFallbackBriefing(company);
  }

  try {
    const response = await fetch(OPENROUTER_BASE_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${OPENROUTER_API_KEY}`,
        "Content-Type": "application/json",
        "HTTP-Referer": "https://m13-deal-brief-686529012610.us-central1.run.app",
        "X-Title": "M13 Deal Brief",
      },
      body: JSON.stringify({
        model: "anthropic/claude-sonnet-4",
        messages: [
          {
            role: "user",
            content: buildPrompt(company, newsContext),
          },
        ],
        temperature: 0.3,
        max_tokens: 3000,
      }),
    });

    if (!response.ok) {
      console.error("OpenRouter API error:", response.status);
      return generateFallbackBriefing(company);
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content || "";

    const jsonMatch = content.match(/\[[\s\S]*\]/);
    if (!jsonMatch) {
      console.error("Failed to parse LLM response as JSON");
      return generateFallbackBriefing(company);
    }

    const sections: BriefingSection[] = JSON.parse(jsonMatch[0]);

    return {
      company_name: company.name,
      generated_at: new Date().toISOString(),
      sections,
    };
  } catch (error) {
    console.error("Briefing generation error:", error);
    return generateFallbackBriefing(company);
  }
}

function generateFallbackBriefing(company: Company): Briefing {
  return {
    company_name: company.name,
    generated_at: new Date().toISOString(),
    sections: [
      {
        title: "Company Snapshot",
        content: `${company.name} is a ${company.sector.toLowerCase()} company founded in ${company.founded} and headquartered in ${company.hq}. ${company.description} The company is currently at the ${company.stage} stage, founded by ${company.founders.join(" and ")}. With ${company.key_metrics.employees} employees and ${company.key_metrics.revenue_range} in revenue, ${company.name} has established itself as a significant player in its sector, demonstrating ${company.key_metrics.growth}.`,
      },
      {
        title: "Key Metrics & Traction",
        content: `• Employee Count: ${company.key_metrics.employees}\n• Revenue: ${company.key_metrics.revenue_range}\n• Growth Rate: ${company.key_metrics.growth}\n• Total Funding: ${company.funding_history.map((f) => f.amount).join(" → ")}\n• Latest Round: ${company.funding_history[company.funding_history.length - 1].round} (${company.funding_history[company.funding_history.length - 1].amount})`,
      },
      {
        title: "Recent Developments",
        content: company.recent_milestones.map((m) => `• ${m}`).join("\n"),
      },
      {
        title: "Competitive Landscape",
        content: `${company.name} operates in a competitive market alongside ${company.competitors.join(", ")}. The company differentiates through its ${company.sector.toLowerCase()} focus and has built defensible advantages through its technology platform and market positioning. Key competitive dynamics include market share battles, pricing pressure, and the race for AI/ML integration across the sector.`,
      },
      {
        title: "M13 Relationship Context",
        content: `M13's relationship with ${company.name}: ${company.m13_relationship}. Investment history spans ${company.funding_history.length} rounds, beginning with the ${company.funding_history[0].round} round of ${company.funding_history[0].amount} in ${company.funding_history[0].date}.`,
      },
      {
        title: "Suggested Discussion Topics",
        content: `• What are the key growth levers for the next 12-18 months?\n• How is the competitive landscape evolving, particularly against ${company.competitors[0]}?\n• What is the current burn rate and path to profitability?\n• Are there strategic partnership or M&A opportunities to discuss?\n• How can M13 provide additional value beyond capital?`,
      },
      {
        title: "Risk Factors",
        content: `• Market competition from well-funded players (${company.competitors.join(", ")})\n• Macroeconomic headwinds affecting growth-stage valuations\n• Potential regulatory changes in the ${company.sector} sector\n• Execution risk on expansion plans and new product launches\n• Key person dependency on founding team`,
      },
    ],
  };
}
