import {
  getCondolences as getCondolencesFromSheet,
  addCondolence,
} from "@/lib/googleSheets";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const data = await getCondolencesFromSheet();
    return NextResponse.json(data);
  } catch (error: any) {
    console.error("Failed to fetch from Google Sheets:", error);
    return NextResponse.json(
      { error: error.message || "Failed to fetch data" },
      { status: 500 },
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // Ensure relationship fields are correctly mapped if 'other' is selected
    const data = {
      ...body,
      relationship:
        body.relationship === "other"
          ? body.otherRelationship
          : body.relationship,
    };

    await addCondolence(data);
    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Failed to add to Google Sheets:", error);
    return NextResponse.json(
      { error: error.message || "Failed to submit condolence" },
      { status: 500 },
    );
  }
}
