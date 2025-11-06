"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { FaArrowDown, FaExclamationTriangle } from "react-icons/fa";
import { ChevronLeft, ChevronRight } from "lucide-react";

const IMAGES_PER_PAGE = 8;

const DragDropGallery = () => {
  const [images, setImages] = useState<{ url: string }[]>([]);
  const [page, setPage] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  // Fetch images from MongoDB
  useEffect(() => {
    const fetchImages = async () => {
      const res = await fetch("/api/images");
      const data = await res.json();
      if (data.success && Array.isArray(data.images)) {
        setImages(data.images);
      } else {
        setImages([]);
      }
    };
    fetchImages();
  }, []);

  const uploadFile = useCallback(async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch("/api/images", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    if (data.success && data.image?.url) {
      setImages((prev) => [data.image, ...prev]); // prepend the new image
    }
  }, []);

  // Drag & Drop Handlers (Disabled for now)
  // const handleDrop = async (e: React.DragEvent<HTMLDivElement>) => {
  //   e.preventDefault();
  //   setIsDragging(false);
  //   const files = Array.from(e.dataTransfer.files).filter((f) =>
  //     f.type.startsWith("image/")
  //   );
  //   files.forEach(uploadFile);
  // };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    Array.from(e.target.files)
      .filter((f) => f.type.startsWith("image/"))
      .forEach(uploadFile);
    e.target.value = "";
  };

  const startIndex = page * IMAGES_PER_PAGE;
  const endIndex = startIndex + IMAGES_PER_PAGE;
  const currentImages = images.slice(startIndex, endIndex);

  return (
    <section className="py-20 bg-gray-50">
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-4xl md:text-5xl font-bold text-center mb-2 text-gray-900"
      >
        Upload Your Moments
      </motion.h2>
      <p className="text-lg text-center text-gray-700 mb-8">
        Upload and share your moments with other brethren; let&apos;s create
        memories together!
      </p>
      <p className="text-md text-center text-red-700 mb-8 flex items-center justify-center gap-2">
        <FaExclamationTriangle className="text-red-700" />
        Feature is disabled till the day for the hangout...
      </p>
      {/* Drag & Drop */}
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        // onDrop={handleDrop} // Disabled for now
        className={`flex justify-center items-center border-4 border-dashed rounded-lg h-40 mb-8 mx-6 transition-colors ${
          isDragging
            ? "border-yellow-400 bg-yellow-50"
            : "border-gray-300 bg-white"
        }`}
      >
        <label className="cursor-pointer w-full h-full flex flex-col justify-center items-center text-gray-700 font-medium">
          Drag & Drop or Click to Upload
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleChange}
            className="hidden"
          />
        </label>
      </div>

      {/* Gallery */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        <AnimatePresence>
          {currentImages.map((img, i) => (
            <motion.div
              key={img.url + i}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              whileHover={{ scale: 1.05 }}
              className="relative overflow-hidden rounded-2xl shadow-lg border border-gray-200 bg-white group"
            >
              {/* Image */}
              <Image
                src={img.url}
                alt={`uploaded-${i}`}
                width={400}
                height={400}
                className="w-full h-full object-cover"
                loading="lazy"
                unoptimized
              />

              {/* Download Button */}
              <a
                href={img.url}
                download
                target="_blank"
                rel="noopener noreferrer"
                className="absolute top-3 right-3 bg-white text-gray-700 p-2 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition"
                title="Download image"
              >
                <FaArrowDown size={10} />
              </a>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Pagination */}
      {images.length > IMAGES_PER_PAGE && (
        <div className="flex justify-center mt-8 items-center gap-2">
          {/* Prev */}
          <button
            onClick={() => page > 0 && setPage(page - 1)}
            disabled={page === 0}
            className={`p-2 rounded-full cursor-pointer ${
              page === 0
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-[#d23915] text-white hover:bg-[#b72318] transition"
            }`}
            aria-label="Previous Page"
          >
            <ChevronLeft size={20} />
          </button>

          {/* Page Numbers */}
          {Array.from({
            length: Math.ceil(images.length / IMAGES_PER_PAGE),
          }).map((_, index) => (
            <button
              key={index}
              onClick={() => setPage(index)}
              className={`px-3 py-1 rounded-md font-medium transition cursor-pointer ${
                page === index
                  ? "bg-[#d23915] text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              {index + 1}
            </button>
          ))}

          {/* Next */}
          <button
            onClick={() =>
              (page + 1) * IMAGES_PER_PAGE < images.length && setPage(page + 1)
            }
            disabled={(page + 1) * IMAGES_PER_PAGE >= images.length}
            className={`p-2 rounded-full ${
              (page + 1) * IMAGES_PER_PAGE >= images.length
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-[#d23915] text-white hover:bg-[#b72318] transition"
            }`}
            aria-label="Next Page"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      )}
    </section>
  );
};

export default DragDropGallery;
