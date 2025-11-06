import clientPromise from "../../../lib/mongodb";
import { NextRequest, NextResponse } from "next/server";
import { v2 as cloudinary, UploadApiResponse } from "cloudinary";

export const runtime = "nodejs";

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

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

    if (!fileEntry || !(fileEntry instanceof File)) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    const arrayBuffer = await fileEntry.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Upload to Cloudinary
    const uploadResult = (await new Promise<UploadApiResponse>(
      (resolve, reject) => {
        cloudinary.uploader
          .upload_stream(
            {
              folder: "nlwc_gallery",
              transformation: [{ quality: "auto", fetch_format: "auto" }],
            },
            (error, result) => {
              if (error) reject(error);
              else resolve(result!);
            }
          )
          .end(buffer);
      }
    )) as UploadApiResponse;

    if (!uploadResult.secure_url) {
      throw new Error("Cloudinary upload failed: no secure URL returned");
    }

    // Save URL to MongoDB
    const client = await clientPromise;
    const db = client.db("condolence_app_gallery");
    const collection = db.collection("images");

    const insertResult = await collection.insertOne({
      url: uploadResult.secure_url,
      uploadedAt: new Date(),
    });

    // Return the full image object directly
    const imageObject = {
      _id: insertResult.insertedId.toString(),
      url: uploadResult.secure_url,
      uploadedAt: new Date(),
    };

    return NextResponse.json({ success: true, image: imageObject });
  } catch (error: unknown) {
    const message = getErrorMessage(error);
    console.error("Upload error:", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

// GET handler - fetch images
export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("condolence_app_gallery");
    const collection = db.collection("images");

    const images = await collection.find({}).sort({ uploadedAt: -1 }).toArray();

    const imagesWithId = images.map((img) => ({
      ...img,
      _id: img._id?.toString(),
    }));

    return NextResponse.json({ success: true, images: imagesWithId });
  } catch (error: unknown) {
    const message = getErrorMessage(error);
    console.error("Fetch images error:", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
