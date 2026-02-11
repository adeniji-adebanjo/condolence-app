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
      className="relative w-full min-h-[450px] sm:h-80 lg:h-[500px] overflow-hidden"
    >
      <div className="absolute inset-0 flex">
        {/* Replace these with real collage images */}
        <div className="relative w-1/3 h-full">
          <Image
            src="/Grandma-Olaniyan.jpg"
            alt="Priscilla Ofunneamaka Adubu-Olaniyan"
            fill
            className="object-cover"
            priority
          />
        </div>
        <div className="relative w-1/3 h-full">
          <Image
            src="/Grandma-Olaniyan2.jpg"
            alt="Priscilla Ofunneamaka Adubu-Olaniyan"
            fill
            className="object-cover"
            priority
          />
        </div>
        <div className="relative w-1/3 h-full border-l border-white/10">
          <Image
            src="/Grandma-Olaniyan3.jpg"
            alt="Priscilla Ofunneamaka Adubu-Olaniyan"
            fill
            className="object-cover"
            priority
          />
        </div>
      </div>

      {/* add overlay here */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-linear-to-b from-black/60 via-black/40 to-black/70 pointer-events-none"
      />

      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center text-white px-6 py-12">
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-amber-400 font-medium tracking-widest uppercase text-xs mb-2"
        >
          In Loving Memory of
        </motion.span>
        <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold font-heading leading-tight max-w-2xl">
          Priscilla Ofunneamaka Adubu-Olaniyan
        </h1>
        <p className="text-sm sm:text-base md:text-lg mt-4 text-white/90 font-sans max-w-md">
          13th March 1951 &ndash; 29th October 2025{" "}
          <span className="hidden xs:inline mx-2">•</span>
          <br className="xs:hidden" /> Aged 74 Years
        </p>

        <div className="mt-8 flex flex-col sm:flex-row gap-4 w-full max-w-xs sm:max-w-none justify-center items-center">
          <motion.button
            onClick={scrollToForm}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full sm:w-auto inline-flex items-center justify-center cursor-pointer gap-2 bg-white text-black py-3 px-6 rounded-full font-semibold transition-colors hover:bg-white/90"
            aria-label="Jump to condolence form"
          >
            Share a Condolence
          </motion.button>

          <motion.button
            onClick={() => {
              const el = document.getElementById("burial-arrangements");
              if (el)
                el.scrollIntoView({ behavior: "smooth", block: "center" });
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full sm:w-auto inline-flex items-center justify-center cursor-pointer gap-2 bg-amber-600 hover:bg-amber-700 text-white py-3 px-6 rounded-full font-semibold shadow-xl transition-all"
            aria-label="View funeral arrangements"
          >
            Burial Arrangements
          </motion.button>

          <motion.button
            onClick={() => {
              const el = document.getElementById("image-gallery");
              if (el)
                el.scrollIntoView({ behavior: "smooth", block: "center" });
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full sm:w-auto inline-flex items-center justify-center cursor-pointer gap-2 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/30 text-white py-3 px-6 rounded-full font-semibold transition-all"
            aria-label="View image gallery"
          >
            View Photo Gallery
          </motion.button>
        </div>
      </div>
    </motion.section>
  );
}
