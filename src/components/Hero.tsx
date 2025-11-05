"use client";
import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative w-full h-64 md:h-80 lg:h-96 overflow-hidden">
      <div className="absolute inset-0 flex">
        {/* Replace these with real collage images */}
        <Image
          src="/Grandma-Olaniyan.jpg"
          alt="Priscilla Ofunneamaka Adubu-Olaniyan"
          width={800}
          height={600}
          className="w-1/3 object-cover"
        />
        <Image
          src="/Grandma-Olaniyan.jpg"
          alt="Priscilla Ofunneamaka Adubu-Olaniyan"
          width={800}
          height={600}
          className="w-1/3 object-cover"
        />
        <Image
          src="/Grandma-Olaniyan.jpg"
          alt="Priscilla Ofunneamaka Adubu-Olaniyan"
          width={800}
          height={600}
          className="w-1/3 object-cover"
        />
      </div>
      <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-center text-white px-4">
        <h1 className="text-3xl md:text-4xl font-bold">In Loving Memory of</h1>
        <h2 className="text-2xl md:text-3xl font-semibold mt-2">
          Priscilla Ofunneamaka Adubu-Olaniyan
        </h2>
        <p className="text-sm md:text-base mt-3">
          13th March 1951 – 29th October 2025 • Aged 74
        </p>
        <p className="text-sm md:text-base italic mt-2">
          “The Burial Date will be communicated.”
        </p>
      </div>
    </section>
  );
}
