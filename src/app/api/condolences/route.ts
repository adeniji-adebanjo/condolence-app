import { NextRequest, NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";
import { getCondolences, addCondolence } from "../../../lib/googleSheets";

// Configure Cloudinary with environment variables
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME!,
  api_key: process.env.CLOUD_API_KEY!,
  api_secret: process.env.CLOUD_API_SECRET!,
});

export async function GET() {
  try {
    console.log("Starting GET request to fetch condolences...");
    const data = await getCondolences();
    console.log(`Successfully retrieved ${data.length} condolences`);
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error in GET /api/condolences:", error);
    if (error instanceof Error) {
      console.error("Error details:", error.message);
      console.error("Stack trace:", error.stack);
      return NextResponse.json(
        {
          status: "error",
          message: error.message,
          type: error.name,
        },
        { status: 500 }
      );
    }
    return NextResponse.json(
      {
        status: "error",
        message: "An unknown error occurred",
      },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Upload image if provided
    let imageUrl = "";
    if (body.image) {
      try {
        console.log("Uploading image to Cloudinary...");
        const uploaded = await cloudinary.uploader.upload(body.image, {
          folder: "condolence_images",
          transformation: [
            { width: 400, height: 400, crop: "fill" },
            { quality: "auto" },
            { fetch_format: "auto" },
          ],
        });
        console.log("Image uploaded successfully:", uploaded.secure_url);
        imageUrl = uploaded.secure_url;
      } catch (error) {
        console.error("Cloudinary upload error:", error);
        if (error instanceof Error) {
          console.error("Error details:", error.message);
        }
        return NextResponse.json(
          {
            error: "Failed to upload image",
            details: error instanceof Error ? error.message : "Unknown error",
          },
          { status: 500 }
        );
      }
    }

    // Prepare the condolence data
    const condolenceData = {
      name: body.name || "",
      message: body.message || "",
      imageUrl,
      location: body.location || "",
      relationship:
        body.relationship === "other"
          ? body.otherRelationship
          : body.relationship || "",
    };

    console.log(
      "Attempting to add condolence to Google Sheets:",
      condolenceData
    );

    // Add to Google Sheets
    await addCondolence(condolenceData);

    console.log("Successfully added condolence to Google Sheets");

    return NextResponse.json({
      status: "success",
      message: "Condolence added successfully",
      data: condolenceData,
    });
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
