import { NextResponse } from "next/server";
import { companies } from "@/data/companies";

export async function GET() {
  const summary = companies.map((c) => ({
    slug: c.slug,
    name: c.name,
    logo: c.logo,
    sector: c.sector,
    stage: c.stage,
    founded: c.founded,
    hq: c.hq,
    description: c.description,
  }));
  return NextResponse.json(summary);
}
