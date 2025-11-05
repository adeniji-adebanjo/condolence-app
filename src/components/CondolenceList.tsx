"use client";
import { useEffect, useState } from "react";
import CondolenceCard from "./CondolenceCard";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

interface Condolence {
  name: string;
  message: string;
  imageUrl?: string;
  location?: string;
  relationship?: string;
  timestamp?: string;
}

export default function CondolenceList({
  refreshTrigger,
}: {
  refreshTrigger: number;
}) {
  const [condolences, setCondolences] = useState<Condolence[]>([]);
  const [loading, setLoading] = useState(true);

  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const perPage = 9;

  useEffect(() => {
    const fetchCondolences = async () => {
      try {
        const res = await fetch("/api/condolences");
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }

        const data = await res.json();

        // Expecting an array of rows (each representing a condolence)
        setCondolences(
          Array.isArray(data)
            ? data.reverse() // latest first
            : []
        );
        setError(null);
      } catch (err) {
        console.error("Error fetching condolences:", err);
        setError(
          err instanceof Error ? err.message : "Failed to fetch condolences"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchCondolences();
  }, [refreshTrigger]);

  if (loading) {
    return (
      <p className="text-center text-gray-500 mt-4">Loading messages...</p>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-600 mt-4 p-4 bg-red-50 rounded-lg">
        <p>Unable to load messages</p>
        <p className="text-sm mt-2 text-red-500">{error}</p>
      </div>
    );
  }

  if (!condolences.length) {
    return (
      <p className="text-center text-gray-500 mt-4">
        No messages yet. Be the first to share 💌
      </p>
    );
  }

  // Pagination calculations
  const total = condolences.length;
  const totalPages = Math.max(1, Math.ceil(total / perPage));
  const startIdx = (page - 1) * perPage;
  const paged = condolences.slice(startIdx, startIdx + perPage);

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-6">
        {paged.map((c, index) => (
          <CondolenceCard
            key={startIdx + index}
            name={c.name}
            message={c.message}
            imageUrl={c.imageUrl}
            location={c.location}
            relationship={c.relationship}
            timestamp={c.timestamp}
          />
        ))}
      </div>

      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-3 mt-6">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            className="p-2 rounded bg-gray-200 hover:bg-gray-300 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            disabled={page === 1}
            aria-label="Previous page"
          >
            <FaArrowLeft className="w-4 h-4" />
          </button>

          <div className="space-x-2">
            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i}
                onClick={() => setPage(i + 1)}
                className={`px-3 py-1 rounded cursor-pointer ${
                  page === i + 1 ? "bg-blue-600 text-white" : "bg-gray-100"
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>

          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            className="p-2 rounded bg-gray-200 hover:bg-gray-300 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            disabled={page === totalPages}
            aria-label="Next page"
          >
            <FaArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
}
