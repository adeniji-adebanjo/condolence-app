"use client";
import { useEffect, useState } from "react";
import CondolenceCard from "./CondolenceCard";

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

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-6">
      {condolences.map((c, index) => (
        <CondolenceCard
          key={index}
          name={c.name}
          message={c.message}
          imageUrl={c.imageUrl}
          location={c.location}
          relationship={c.relationship}
          timestamp={c.timestamp}
        />
      ))}
    </div>
  );
}
