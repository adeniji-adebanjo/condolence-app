import type { Condolence } from "@/types";
// Import the actual data fetching function from your Google Sheets library
import { getCondolences as getCondolencesFromSheet } from "@/lib/googleSheets";

// This function is called by Server Components to get data directly.
export async function getCondolences(): Promise<Condolence[]> {
  // It now calls your Google Sheets function, bypassing the local file system.
  return getCondolencesFromSheet();
}
