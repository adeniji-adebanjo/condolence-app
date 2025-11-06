"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { fadeIn } from "@/lib/animations";

export default function Hero() {
  const scrollToForm = () => {
    const el = document.getElementById("condolence-form");
    if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  return (
    <motion.section
      variants={fadeIn}
      initial="hidden"
      animate="visible"
      className="relative w-full h-75 md:h-80 lg:h-96 overflow-hidden"
    >
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

      {/* add overlay here */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-black/40 pointer-events-none"
      />

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

        <motion.button
          onClick={scrollToForm}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className="mt-4 inline-flex items-center cursor-pointer gap-2 bg-white/10 hover:bg-white/20 border border-white/30 text-white py-2 px-4 rounded-lg"
          aria-label="Jump to condolence form"
        >
          Share a Condolence
        </motion.button>
      </div>
    </motion.section>
  );
}
