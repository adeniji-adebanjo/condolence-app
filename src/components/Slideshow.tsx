"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

const images = [
  "/Grandma-Olaniyan.jpg",
  "/Grandma-Olaniyan.jpg",
  "/Grandma-Olaniyan.jpg",
  "/Grandma-Olaniyan.jpg",
  "/Grandma-Olaniyan.jpg",
];

export default function Slideshow({ className = "" }: { className?: string }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((i) => (i + 1) % images.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    // Hidden on small screens, visible on md+
    <div className={`hidden md:block ${className}`}>
      <div className="relative w-full h-64 md:h-96 rounded-lg overflow-hidden shadow">
        <AnimatePresence initial={false} mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="absolute inset-0"
          >
            <Image
              src={images[index]}
              alt={`Slideshow image ${index + 1}`}
              fill
              className="object-cover rounded-lg w-full h-full"
              priority={false}
            />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
