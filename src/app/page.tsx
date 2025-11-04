"use client";
import { useState } from "react";
import Image from "next/image";
import CondolenceForm from "../components/CondolenceForm";
import CondolenceList from "../components/CondolenceList";

export default function Home() {
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleFormSubmit = () => setRefreshTrigger((prev) => prev + 1);

  return (
    <main className="min-h-screen bg-gray-50 py-10 px-4">
      <section className="text-center mb-10">
        <Image
          src="/Grandma-Olaniyan.jpg"
          alt="In Loving Memory"
          width={300}
          height={300}
          className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
        />
        <h1 className="text-3xl font-bold">In Loving Memory of Mum 🕊️</h1>
        <p className="text-gray-600 mt-2 max-w-md mx-auto">
          Forever in our hearts. Please share your condolences and testimonies
          below.
        </p>
      </section>

      <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
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
