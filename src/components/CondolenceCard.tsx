import Image from "next/image";

interface CondolenceCardProps {
  name: string;
  message: string;
  imageUrl?: string;
  location?: string;
  relationship?: string;
  timestamp?: string;
}

export default function CondolenceCard({
  name,
  message,
  imageUrl,
  location,
  relationship,
  timestamp,
}: CondolenceCardProps) {
  return (
    <div className="bg-white shadow rounded-xl p-4 text-center flex flex-col items-center">
      {imageUrl && (
        <Image
          src={imageUrl}
          alt={name}
          width={96}
          height={96}
          className="w-24 h-24 mx-auto rounded-full object-cover"
        />
      )}
      <h2 className="font-semibold mt-3 text-gray-800">{name}</h2>
      {relationship && (
        <p className="text-sm text-gray-500 italic">{relationship}</p>
      )}
      <p className="text-sm text-gray-700 mt-2">{message}</p>
      {location && <p className="text-xs text-gray-500 mt-2">📍 {location}</p>}
      {timestamp && (
        <small className="text-gray-400 text-xs mt-1">
          {new Date(timestamp).toLocaleString()}
        </small>
      )}
    </div>
  );
}
