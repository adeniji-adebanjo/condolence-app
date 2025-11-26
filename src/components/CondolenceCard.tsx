import Image from "next/image";
import { useState } from "react";
import { useMediaQuery } from "./useMediaQuery";

interface CondolenceCardProps {
  name: string;
  message: string;
  imageUrl?: string;
  location?: string;
  relationship?: string;
  timestamp?: string;
}

const TRUNCATE_LENGTH = 150; // Truncate messages longer than this
const MODAL_THRESHOLD = 300; // Open in modal if message is longer than this

export default function CondolenceCard({
  name,
  message,
  imageUrl,
  location,
  relationship,
  timestamp,
}: CondolenceCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  // Corresponds to Tailwind's `sm` breakpoint
  const isDesktopOrTablet = useMediaQuery("(min-width: 640px)");

  const isTruncatable = message.length > TRUNCATE_LENGTH;
  const useModal = message.length >= MODAL_THRESHOLD;

  // Determine what text to display
  const displayText =
    isDesktopOrTablet && isTruncatable && !isExpanded
      ? `${message.substring(0, TRUNCATE_LENGTH)}...`
      : message;

  const handleReadMoreClick = () => {
    if (useModal) {
      setIsModalOpen(true);
    } else {
      setIsExpanded(!isExpanded);
    }
  };

  return (
    <>
      <div className="bg-white shadow rounded-xl p-4 text-center flex flex-col items-center w-full">
        <div className="flex-shrink-0">
          {imageUrl && (
            <div className="w-24 h-24 mx-auto relative">
              <Image
                src={imageUrl}
                alt={name}
                fill
                sizes="96px"
                className="rounded-full object-cover"
                unoptimized={imageUrl.startsWith("data:")}
              />
            </div>
          )}
          <h2 className="font-semibold mt-3 text-gray-800">{name}</h2>
          {relationship && (
            <p className="text-sm text-gray-500 italic">{relationship}</p>
          )}
        </div>
        <div className="flex-grow flex flex-col justify-center my-2">
          <p className="text-sm text-gray-700 mt-2">{displayText}</p>
        </div>
        <div className="flex-shrink-0">
          {isDesktopOrTablet && isTruncatable && (
            <button
              onClick={handleReadMoreClick}
              className="text-blue-600 hover:underline text-sm cursor-pointer"
            >
              {isExpanded ? "Read less" : "Read more"}
            </button>
          )}
          {location && (
            <p className="text-xs text-gray-500 mt-2">📍 {location}</p>
          )}
          {timestamp && (
            <small className="text-gray-400 text-xs mt-1 block">
              {new Date(timestamp).toLocaleString()}
            </small>
          )}
        </div>
      </div>

      {isModalOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4"
          onClick={() => setIsModalOpen(false)}
        >
          <div
            className="bg-white shadow rounded-xl p-6 text-center flex flex-col items-center w-full max-w-lg max-h-[90vh] overflow-y-auto relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Icon Button */}
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 p-2 cursor-pointer rounded-full focus:outline-none focus:ring-2 focus:ring-gray-400"
              aria-label="Close modal"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            {/* Modal Content */}
            <div className="flex-shrink-0 w-full">
              {imageUrl && (
                <div className="w-24 h-24 mx-auto relative">
                  <Image
                    src={imageUrl}
                    alt={name}
                    fill
                    sizes="96px"
                    className="rounded-full object-cover"
                    unoptimized={imageUrl.startsWith("data:")}
                  />
                </div>
              )}
              <h2 className="font-semibold mt-3 text-gray-800 text-xl">
                {name}
              </h2>
              {relationship && (
                <p className="text-base text-gray-500 italic">{relationship}</p>
              )}
            </div>
            <div className="text-left my-4 w-full">
              <p className="text-base text-gray-700">{message}</p>
            </div>
            <div className="flex-shrink-0 border-t w-full pt-3">
              {location && (
                <p className="text-sm text-gray-500">📍 {location}</p>
              )}
              {timestamp && (
                <small className="text-gray-400 text-sm mt-1 block">
                  {new Date(timestamp).toLocaleString()}
                </small>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
