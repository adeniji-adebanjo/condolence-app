"use client";
import { motion } from "framer-motion";

interface TimelineProps {
  events: string[];
}

export default function Timeline({ events }: TimelineProps) {
  return (
    <div className="relative pl-8">
      {/* Vertical line */}
      <div className="absolute left-3 top-0 bottom-0 w-0.5 bg-gray-300" />

      <div className="space-y-8">
        {events.map((e, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.12 }}
            className="relative"
          >
            {/* bullet */}
            <div className="absolute -left-1 top-1 w-3 h-3 rounded-full bg-blue-600 border-2 border-white shadow" />

            <div className="pl-6">
              <p className="text-gray-800 font-medium">{e}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
