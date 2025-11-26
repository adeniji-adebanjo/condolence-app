import { getCondolences as getCondolencesFromSheet } from "@/lib/googleSheets";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic"; // Ensures the route is not cached

export async function GET() {
  try {
    const data = await getCondolencesFromSheet();
    return NextResponse.json(data);
  } catch (error) {
    // Log the actual error on the server for debugging
    console.error("Failed to fetch from Google Sheets:", error);
    return NextResponse.json(
      { message: "Failed to fetch data" },
      { status: 500 }
    );
  }
}
