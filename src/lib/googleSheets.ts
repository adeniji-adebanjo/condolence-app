import { GoogleSpreadsheet } from "google-spreadsheet";
import { JWT } from "google-auth-library";

// Sheet configuration
const SPREADSHEET_ID = process.env.GOOGLE_SPREADSHEET_ID;
const SHEET_ID = process.env.GOOGLE_SHEET_ID;

// Create JWT client
const serviceAccountAuth = new JWT({
  email: process.env.GOOGLE_CLIENT_EMAIL,
  key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
  scopes: ["https://www.googleapis.com/auth/spreadsheets"],
});

// Initialize the sheet
export const doc = new GoogleSpreadsheet(SPREADSHEET_ID!, serviceAccountAuth);

interface CondolenceData {
  name: string;
  message: string;
  imageUrl?: string;
  location?: string;
  relationship?: string;
  timestamp?: string;
}

export async function getCondolences(): Promise<CondolenceData[]> {
  try {
    // Validate environment variables
    if (!SPREADSHEET_ID) {
      throw new Error("GOOGLE_SPREADSHEET_ID is not configured");
    }
    if (!SHEET_ID) {
      throw new Error("GOOGLE_SHEET_ID is not configured");
    }
    if (!process.env.GOOGLE_CLIENT_EMAIL) {
      throw new Error("GOOGLE_CLIENT_EMAIL is not configured");
    }
    if (!process.env.GOOGLE_PRIVATE_KEY) {
      throw new Error("GOOGLE_PRIVATE_KEY is not configured");
    }

    console.log("Loading spreadsheet info...");
    await doc.loadInfo();
    console.log("Spreadsheet loaded:", doc.title);

    const sheet = doc.sheetsById[Number(SHEET_ID)];
    if (!sheet) {
      throw new Error(`Sheet ID ${SHEET_ID} not found in spreadsheet`);
    }
    console.log("Found sheet:", sheet.title);

    const rows = await sheet.getRows();
    console.log(`Retrieved ${rows.length} rows from sheet`);

    return rows.map((row) => ({
      name: row.get("name"),
      message: row.get("message"),
      imageUrl: row.get("imageUrl"),
      location: row.get("location"),
      relationship: row.get("relationship"),
      timestamp: row.get("timestamp"),
    }));
  } catch (error) {
    console.error("Error fetching from Google Sheets:", error);
    if (error instanceof Error) {
      console.error("Error details:", error.message);
      console.error("Stack trace:", error.stack);
    }
    throw error;
  }
}

export async function addCondolence(data: CondolenceData): Promise<void> {
  try {
    console.log("Loading spreadsheet info for adding condolence...");
    await doc.loadInfo();
    console.log("Spreadsheet accessed:", doc.title);

    const sheet = doc.sheetsById[Number(SHEET_ID)];
    if (!sheet) {
      throw new Error(`Sheet ID ${SHEET_ID} not found in spreadsheet`);
    }
    console.log("Found sheet:", sheet.title);

    // Check if headers exist and set them if they don't
    const rows = await sheet.getRows();
    if (rows.length === 0) {
      console.log("Setting up headers...");
      await sheet.setHeaderRow([
        "name",
        "message",
        "imageUrl",
        "location",
        "relationship",
        "timestamp",
      ]);
      console.log("Headers set successfully");
    }

    // Prepare row data
    const rowData = {
      ...data,
      timestamp: new Date().toISOString(),
    };
    console.log("Adding row with data:", rowData);

    // Add the row
    const result = await sheet.addRow(rowData);
    console.log("Row added successfully");
  } catch (error) {
    console.error("Error adding to Google Sheets:", error);
    if (error instanceof Error) {
      console.error("Error details:", error.message);
      console.error("Stack trace:", error.stack);
    }
    throw error;
  }
}

// --- Image gallery helpers ---
interface ImageRow {
  url: string;
  uploadedAt?: string;
}

const IMAGE_SHEET_TITLE = "image_gallery";

export async function getImages(): Promise<ImageRow[]> {
  try {
    if (!SPREADSHEET_ID)
      throw new Error("GOOGLE_SPREADSHEET_ID is not configured");
    if (!process.env.GOOGLE_CLIENT_EMAIL)
      throw new Error("GOOGLE_CLIENT_EMAIL is not configured");
    if (!process.env.GOOGLE_PRIVATE_KEY)
      throw new Error("GOOGLE_PRIVATE_KEY is not configured");

    await doc.loadInfo();
    const sheet = doc.sheetsByTitle[IMAGE_SHEET_TITLE];
    if (!sheet) {
      console.warn(
        `Sheet titled '${IMAGE_SHEET_TITLE}' not found. Returning empty array.`
      );
      return [];
    }

    const rows = await sheet.getRows();
    return rows.map((r) => {
      const url = (r.get("url") as string) || "";
      const uploadedAt = (r.get("uploadedAt") as string) || "";
      return { url, uploadedAt };
    });
  } catch (error) {
    console.error("Error fetching images from Google Sheets:", error);
    throw error;
  }
}

export async function addImage(data: ImageRow): Promise<void> {
  try {
    await doc.loadInfo();
    let sheet = doc.sheetsByTitle[IMAGE_SHEET_TITLE];
    if (!sheet) {
      // create the sheet with reasonable headers
      sheet = await doc.addSheet({
        title: IMAGE_SHEET_TITLE,
        headerValues: ["url", "uploadedAt"],
      });
      console.log(`Created sheet '${IMAGE_SHEET_TITLE}' with headers`);
    }

    // Ensure headers exist
    const rows = await sheet.getRows();
    if (rows.length === 0) {
      await sheet.setHeaderRow(["url", "uploadedAt"]);
    }

    const rowData = {
      url: data.url,
      uploadedAt: data.uploadedAt || new Date().toISOString(),
    };

    await sheet.addRow(rowData);
    console.log("Image row added to Google Sheet");
  } catch (error) {
    console.error("Error adding image to Google Sheets:", error);
    throw error;
  }
}
