import { NextRequest, NextResponse } from "next/server";
import { getCompanyBySlug } from "@/data/companies";
import { generateBriefing } from "@/lib/openrouter";

export async function GET(request: NextRequest) {
  const slug = request.nextUrl.searchParams.get("company");
  if (!slug) {
    return NextResponse.json({ error: "Missing company parameter" }, { status: 400 });
  }

  const company = getCompanyBySlug(slug);
  if (!company) {
    return NextResponse.json({ error: "Company not found" }, { status: 404 });
  }

  // Attempt to fetch recent news for context
  let newsContext = "";
  try {
    const serperKey = process.env.SERPER_API_KEY;
    if (serperKey) {
      const searchRes = await fetch("https://google.serper.dev/news", {
        method: "POST",
        headers: {
          "X-API-KEY": serperKey,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          q: `${company.name} company news 2024 2025`,
          num: 5,
        }),
      });
      if (searchRes.ok) {
        const searchData = await searchRes.json();
        const articles = searchData.news || [];
        newsContext = articles
          .map((a: { title: string; snippet: string; date: string }) =>
            `[${a.date}] ${a.title}: ${a.snippet}`
          )
          .join("\n");
      }
    }
  } catch {
    // Silently fall back to curated data only
  }

  const briefing = await generateBriefing(company, newsContext);
  return NextResponse.json(briefing);
}
