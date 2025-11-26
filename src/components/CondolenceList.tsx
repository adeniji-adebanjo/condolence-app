import CondolenceDisplay from "./CondolenceDisplay";
import type { Condolence } from "@/types";
import { getCondolences } from "@/lib/data";

export default async function CondolenceList() {
  let condolences: Condolence[] = [];
  let error: string | null = null;
  try {
    // Fetch data directly from the source, bypassing the API route.
    const data = await getCondolences();
    condolences = Array.isArray(data) ? [...data].reverse() : [];
  } catch (e: any) {
    error = e.message;
  }

  return (
    <div>
      {error && (
        <div className="text-center text-red-600 mt-4 p-4 bg-red-50 rounded-lg">
          <p>Unable to load messages</p>
          <p className="text-sm mt-2 text-red-500">{error}</p>
        </div>
      )}
      {!error && !condolences.length && (
        <p className="text-center text-gray-500 mt-4">
          No messages yet. Be the first to share 💌
        </p>
      )}
      {!error && condolences.length > 0 && (
        <CondolenceDisplay condolences={condolences} />
      )}
    </div>
  );
}
