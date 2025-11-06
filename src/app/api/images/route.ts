import { NextRequest, NextResponse } from "next/server";
import { v2 as cloudinary, UploadApiResponse } from "cloudinary";
import { addImage, getImages } from "@/lib/googleSheets";

export const runtime = "nodejs";

// Validate required environment variables
const requiredEnvVars = {
  CLOUD_NAME: process.env.CLOUD_NAME,
  CLOUD_API_KEY: process.env.CLOUD_API_KEY,
  CLOUD_API_SECRET: process.env.CLOUD_API_SECRET,
};

// Check for missing env vars
const missingVars = Object.entries(requiredEnvVars)
  .filter(([_, value]) => !value)
  .map(([key]) => key);

if (missingVars.length > 0) {
  console.error(
    `Missing required environment variables: ${missingVars.join(", ")}`
  );
}

// Configure Cloudinary if credentials exist
if (!missingVars.includes("CLOUD_NAME")) {
  cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET,
  });
}

// Helper to get error message from unknown
function getErrorMessage(error: unknown): string {
  if (error instanceof Error) return error.message;
  return String(error);
}

// POST handler - upload image
export async function POST(req: NextRequest) {
  try {
    const data = await req.formData();
    const fileEntry = data.get("file");

    // Check env vars first
    if (missingVars.length > 0) {
      throw new Error(
        `Missing required environment variables: ${missingVars.join(", ")}`
      );
    }

    if (!fileEntry || !(fileEntry instanceof File)) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    const arrayBuffer = await fileEntry.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Upload to Cloudinary
    console.log("Starting Cloudinary upload...");
    const uploadResult = (await new Promise<UploadApiResponse>(
      (resolve, reject) => {
        cloudinary.uploader
          .upload_stream(
            {
              folder: "condolence_app_gallery",
              transformation: [{ quality: "auto", fetch_format: "auto" }],
            },
            (error, result) => {
              if (error) {
                console.error("Cloudinary upload error:", error);
                reject(error);
              } else resolve(result!);
            }
          )
          .end(buffer);
      }
    )) as UploadApiResponse;

    if (!uploadResult.secure_url) {
      throw new Error("Cloudinary upload failed: no secure URL returned");
    }

    // Save URL to Google Sheets (image_gallery)
    await addImage({
      url: uploadResult.secure_url,
      uploadedAt: new Date().toISOString(),
    });

    const imageObject = {
      url: uploadResult.secure_url,
      uploadedAt: new Date().toISOString(),
    };

    return NextResponse.json({ success: true, image: imageObject });
  } catch (error: unknown) {
    const message = getErrorMessage(error);
    console.error("Upload error details:", {
      message,
      stack: error instanceof Error ? error.stack : undefined,
      type: error instanceof Error ? error.name : typeof error,
    });
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

// GET handler - fetch images
// export async function GET() {
//   try {
//     const client = await clientPromise;
//     const db = client.db("condolence_app_gallery");
//     const collection = db.collection("images");

//     const images = await collection.find({}).sort({ uploadedAt: -1 }).toArray();

//     const imagesWithId = images.map((img: any) => ({
//       ...img,
//       _id: img._id?.toString(),
//     }));

//     return NextResponse.json({ success: true, images: imagesWithId });
//   } catch (error: unknown) {
//     const message = getErrorMessage(error);
//     console.error("Fetch images error:", message);
//     return NextResponse.json({ error: message }, { status: 500 });
//   }
// }

export async function GET() {
  try {
    console.log("➡️ Starting GET /api/images (Google Sheets)");
    const images = await getImages();
    console.log(`✅ Retrieved ${images.length} image(s) from sheet`);
    return NextResponse.json({ success: true, images });
  } catch (error: any) {
    console.error("❌ GET /api/images error:", error);
    return NextResponse.json(
      { error: error.message || "Unknown error" },
      { status: 500 }
    );
  }
}
