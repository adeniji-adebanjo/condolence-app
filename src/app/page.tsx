"use client";
import { useState } from "react";
import Image from "next/image";
import CondolenceForm from "../components/CondolenceForm";
import CondolenceList from "../components/CondolenceList";

export default function Home() {
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const handleFormSubmit = () => setRefreshTrigger((prev) => prev + 1);

  return (
    <main className="min-h-screen bg-gray-50 pb-16">
      {/* Hero Section with Collage */}
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
          <h1 className="text-3xl md:text-4xl font-bold">
            In Loving Memory of
          </h1>
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

      {/* Introduction */}
      <section className="text-center my-10 px-4">
        <p className="text-gray-600 max-w-2xl mx-auto text-lg">
          Forever in our hearts, a loving wife, mother, grandmother, and friend.
          Please share your condolences, memories, and testimonies below.
        </p>
      </section>

      {/* Form and Condolence List Side by Side */}
      <div className="grid md:grid-cols-2 gap-10 max-w-6xl mx-auto px-4">
        {/* Left: Form */}
        <CondolenceForm onSubmitSuccess={handleFormSubmit} />

        {/* Right: Condolence List */}
        <div>
          <h2 className="text-xl font-semibold text-gray-800 mb-4 text-center md:text-left">
            Messages & Testimonies
          </h2>
          <CondolenceList refreshTrigger={refreshTrigger} />
        </div>
      </div>
    </main>
  );
}
