import { NextRequest, NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";

// Configure Cloudinary with environment variables
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME!,
  api_key: process.env.CLOUD_API_KEY!,
  api_secret: process.env.CLOUD_API_SECRET!,
});

export async function GET() {
  try {
    const scriptUrl = process.env.NEXT_PUBLIC_GOOGLE_SCRIPT_URL;
    if (!scriptUrl) {
      console.error("GOOGLE_SCRIPT_URL environment variable is not set");
      return NextResponse.json(
        { status: "error", message: "Server configuration error" },
        { status: 500 }
      );
    }

    const googleRes = await fetch(scriptUrl, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    }).catch((error) => {
      console.error("Network error fetching from Google Script:", error);
      throw new Error("Failed to connect to data source");
    });

    if (!googleRes.ok) {
      console.error(`Google Script returned status: ${googleRes.status}`);
      const errorText = await googleRes
        .text()
        .catch(() => "No error details available");
      throw new Error(`Failed to fetch condolences: ${errorText}`);
    }

    const data = await googleRes.json();

    // Check if we got an error response from Apps Script
    if (data.status === "error") {
      throw new Error(data.message || "Failed to fetch condolences from sheet");
    }

    // If it's the expected array format, return it directly
    if (Array.isArray(data)) {
      return NextResponse.json(data);
    }

    // If we get here, something unexpected happened
    throw new Error("Invalid response format from Google Apps Script");
  } catch (error) {
    console.error("Error fetching condolences:", error);
    return NextResponse.json(
      {
        status: "error",
        message:
          error instanceof Error
            ? error.message
            : "Failed to fetch condolences",
      },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const scriptUrl = process.env.NEXT_PUBLIC_GOOGLE_SCRIPT_URL;
    if (!scriptUrl) {
      console.error("GOOGLE_SCRIPT_URL environment variable is not set (POST)");
      return NextResponse.json(
        { status: "error", message: "Server configuration error" },
        { status: 500 }
      );
    }

    // Upload image if provided
    let imageUrl = "";
    if (body.image) {
      try {
        const uploaded = await cloudinary.uploader.upload(body.image, {
          folder: "condolence_images",
        });
        imageUrl = uploaded.secure_url;
      } catch (error) {
        console.error("Cloudinary upload error:", error);
        return NextResponse.json(
          { error: "Failed to upload image" },
          { status: 500 }
        );
      }
    }

    // Prepare and forward the request to Google Apps Script
    // Match the exact structure expected by Apps Script
    const payload = {
      name: body.name || "",
      message: body.message || "",
      imageUrl, // This will be used by Apps Script's body.image || body.imageUrl
      location: body.location || "",
      relationship:
        body.relationship === "other"
          ? body.otherRelationship
          : body.relationship || "",
      otherRelationship:
        body.relationship === "other" ? body.otherRelationship : "",
    };

    // Server-side request to Google Apps Script
    let googleRes;
    try {
      googleRes = await fetch(scriptUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
    } catch (err) {
      console.error("Network error when calling Google Script:", err);
      return NextResponse.json(
        { status: "error", message: "Failed to connect to data source" },
        { status: 502 }
      );
    }

    if (!googleRes.ok) {
      const text = await googleRes.text().catch(() => "No details");
      console.error("Google Script returned non-OK:", googleRes.status, text);
      return NextResponse.json(
        { status: "error", message: text || "Google Script error" },
        { status: 500 }
      );
    }

    const response = await googleRes.json().catch(() => ({
      status: "error",
      message: "Invalid JSON from Google Script",
    }));

    // Check if Apps Script returned an error
    if (response.status === "error") {
      return NextResponse.json(
        {
          status: "error",
          message: response.message || "Failed to save to spreadsheet",
        },
        { status: 500 }
      );
    }

    // If we got success from Apps Script, return success
    if (response.status === "success") {
      return NextResponse.json(response);
    }

    // If we get here, something unexpected happened
    return NextResponse.json(
      { status: "error", message: "Invalid response from Google Apps Script" },
      { status: 500 }
    );
  } catch (error: unknown) {
    console.error("Error submitting condolence:", error);
    const errorMessage =
      error instanceof Error ? error.message : "An unknown error occurred";
    return NextResponse.json(
      { status: "error", message: errorMessage },
      { status: 500 }
    );
  }
}
