"use client";
import { useEffect, useState } from "react";
import CondolenceCard from "./CondolenceCard";

interface Condolence {
  _id: string;
  name: string;
  message: string;
  photoUrl?: string;
  createdAt: string;
}

export default function CondolenceList({
  refreshTrigger,
}: {
  refreshTrigger: number;
}) {
  const [condolences, setCondolences] = useState<Condolence[]>([]);

  useEffect(() => {
    const fetchCondolences = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/condolences`
        );
        const data = await res.json();
        setCondolences(data);
      } catch (err) {
        console.error("Error fetching condolences:", err);
      }
    };

    fetchCondolences();
  }, [refreshTrigger]);

  if (!condolences.length)
    return (
      <p className="text-center text-gray-500 mt-4">
        No messages yet. Be the first to share 💌
      </p>
    );

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-6">
      {condolences.map((c) => (
        <CondolenceCard
          key={c._id}
          name={c.name}
          message={c.message}
          photoUrl={c.photoUrl}
          createdAt={c.createdAt}
        />
      ))}
    </div>
  );
}
