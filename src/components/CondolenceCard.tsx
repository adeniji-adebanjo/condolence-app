import Image from "next/image";

interface CondolenceCardProps {
  name: string;
  message: string;
  photoUrl?: string;
  createdAt: string;
}

export default function CondolenceCard({
  name,
  message,
  photoUrl,
  createdAt,
}: CondolenceCardProps) {
  return (
    <div className="bg-white shadow rounded-xl p-4 text-center hover:shadow-lg transition">
      {photoUrl && (
        <div className="flex justify-center">
          <Image
            src={photoUrl}
            alt={name}
            width={100}
            height={100}
            className="w-24 h-24 mx-auto rounded-full object-cover"
          />
        </div>
      )}
      <h3 className="font-semibold mt-2">{name}</h3>
      <p className="text-sm text-gray-600 mt-2">{message}</p>
      <small className="text-gray-400 text-xs">
        {new Date(createdAt).toLocaleString()}
      </small>
    </div>
  );
}
