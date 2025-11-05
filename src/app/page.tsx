"use client";
import { useState } from "react";
import Hero from "../components/Hero";
// import Timeline from "../components/Timeline";
import CondolenceForm from "../components/CondolenceForm";
import CondolenceList from "../components/CondolenceList";

export default function Home() {
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const handleFormSubmit = () => setRefreshTrigger((prev) => prev + 1);

  const events = [
    "Born in Lagos",
    "Worked in Afromedia PLC, Lagos",
    "Moved to Ilorin",
    "Lived in: Lagos, Ilorin, Asaba, Abuja, UK, Abeokuta",
    "Died in Lagos",
  ];

  return (
    <main className="min-h-screen bg-gray-50 pb-16">
      <Hero />

      <section className="text-center my-8 px-4">
        <p className="text-gray-600 max-w-2xl mx-auto text-lg">
          Forever in our hearts, a loving wife, mother, grandmother, and friend.
          Please share your condolences, memories, and testimonies below.
        </p>
      </section>

      {/* Timeline (left) and Form (right) */}
      <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-8 items-start">
        {/* <div>
          <h3 className="text-lg font-semibold mb-4">Key Life Events</h3>
          <Timeline events={events} />
        </div> */}

        <div>
          <CondolenceForm onSubmitSuccess={handleFormSubmit} />
        </div>
      </div>

      {/* Condolence list full width below */}
      <section className="max-w-6xl mx-auto px-4 mt-12">
        <h2 className="text-xl font-semibold text-gray-800 mb-4 text-center md:text-left">
          Messages & Testimonies
        </h2>
        <CondolenceList refreshTrigger={refreshTrigger} />
      </section>
    </main>
  );
}
