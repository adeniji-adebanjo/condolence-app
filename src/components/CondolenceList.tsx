"use client";
import useSWR from "swr";
import { useState } from "react";
import CondolenceCard from "@/components/CondolenceCard";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

interface Condolence {
  name: string;
  message: string;
  imageUrl?: string;
  location?: string;
  relationship?: string;
  timestamp?: string;
}

// Simple fetcher function for SWR
const fetcher = async (url: string) => {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`HTTP error! status: ${res.status}`);
  }
  return res.json();
};

export default function CondolenceList({
  refreshTrigger,
}: {
  refreshTrigger: number;
}) {
  const [page, setPage] = useState(1);
  const perPage = 9;

  // Use SWR for realtime revalidation
  const { data, error, isLoading } = useSWR("/api/condolences", fetcher, {
    refreshInterval: 60000,
    revalidateOnFocus: true,
    revalidateOnReconnect: true,
  });

  const condolences: Condolence[] = Array.isArray(data)
    ? [...data].reverse()
    : [];

  if (isLoading) {
    return (
      <p className="text-center text-gray-500 mt-4">Loading messages...</p>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-600 mt-4 p-4 bg-red-50 rounded-lg">
        <p>Unable to load messages</p>
        <p className="text-sm mt-2 text-red-500">{error.message}</p>
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

  // Pagination
  const total = condolences.length;
  const totalPages = Math.max(1, Math.ceil(total / perPage));
  const startIdx = (page - 1) * perPage;
  const paged = condolences.slice(startIdx, startIdx + perPage);

  const getPagination = () => {
    const siblingCount = 1; // Number of pages to show on each side of the active page
    const totalPageNumbers = siblingCount + 5; // 1 (active) + 2*siblingCount + 2 (first/last) + 2 (ellipses)

    // Case 1: If the number of pages is less than the page numbers we want to show, return the full range.
    if (totalPageNumbers >= totalPages) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const leftSiblingIndex = Math.max(page - siblingCount, 1);
    const rightSiblingIndex = Math.min(page + siblingCount, totalPages);

    // Determine if we need to show ellipses on the left or right side.
    const shouldShowLeftDots = leftSiblingIndex > 2;
    const shouldShowRightDots = rightSiblingIndex < totalPages - 1;

    const firstPageIndex = 1;
    const lastPageIndex = totalPages;

    // Case 2: No left ellipsis, but right ellipsis is needed.
    if (!shouldShowLeftDots && shouldShowRightDots) {
      let leftItemCount = 3 + 2 * siblingCount;
      let leftRange = Array.from({ length: leftItemCount }, (_, i) => i + 1);
      return [...leftRange, "...", totalPages];
    }

    // Case 3: No right ellipsis, but left ellipsis is needed.
    if (shouldShowLeftDots && !shouldShowRightDots) {
      let rightItemCount = 3 + 2 * siblingCount;
      let rightRange = Array.from(
        { length: rightItemCount },
        (_, i) => totalPages - rightItemCount + i + 1
      );
      return [firstPageIndex, "...", ...rightRange];
    }

    // Case 4: Both left and right ellipses are needed.
    if (shouldShowLeftDots && shouldShowRightDots) {
      let middleRange = Array.from(
        { length: rightSiblingIndex - leftSiblingIndex + 1 },
        (_, i) => leftSiblingIndex + i
      );
      return [firstPageIndex, "...", ...middleRange, "...", lastPageIndex];
    }

    // Default case (should not be reached with the logic above, but good for safety)
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  };

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-6">
        {paged.map((c, index) => (
          <div key={startIdx + index} className="flex">
            <CondolenceCard
              name={c.name}
              message={c.message}
              imageUrl={c.imageUrl}
              location={c.location}
              relationship={c.relationship}
              timestamp={c.timestamp}
            />
          </div>
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
            {getPagination().map((p, i) =>
              typeof p === "number" ? (
                <button
                  key={i}
                  onClick={() => setPage(p)}
                  className={`px-3 py-1 rounded cursor-pointer ${
                    page === p ? "bg-blue-600 text-white" : "bg-gray-100"
                  }`}
                >
                  {p}
                </button>
              ) : (
                <span key={i} className="px-3 py-1">
                  {p}
                </span>
              )
            )}
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
