import { NextRequest, NextResponse } from "next/server";

// PDF export is handled client-side via html2pdf.js
// This route exists as a placeholder for server-side export if needed
export async function GET(request: NextRequest) {
  return NextResponse.json({
    message: "PDF export is handled client-side. Use the Export PDF button in the briefing view.",
  });
}
