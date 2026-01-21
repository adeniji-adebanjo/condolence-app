"use client";
import { motion } from "framer-motion";
import { Calendar, Clock, MapPin, Info, ExternalLink } from "lucide-react";

export default function BurialArrangements() {
  const arrangements = [
    {
      date: "Thursday 12th February, 2026",
      colorLabel: "Thursday Colours",
      colors: "White and Gold",
      colorClass: "from-amber-200 to-amber-400",
      events: [
        {
          time: "4:00 PM",
          title: "Service of Songs / Wake Keep",
          location:
            "Bishops Smith Memorial Anglican Church, Agba Dam Estate Road, Ilorin, Kwara State.",
          mapUrl:
            "https://www.google.com/maps/place/Bishop+Smith+Anglican+Church/@8.4839814,4.5367803,17z/data=!3m1!4b1!4m6!3m5!1s0x10364c39c8c9a29d:0x22c2a07d3b2b8e3e!8m2!3d8.4839761!4d4.5393552!16s%2Fg%2F11b6j3w86c?entry=ttu",
        },
      ],
    },
    {
      date: "Friday 13th February, 2026",
      colorLabel: "Friday Colours",
      colors: "Purple and White",
      colorClass: "from-purple-500 to-purple-200",
      events: [
        {
          time: "7:00 AM – 8:30 AM",
          title: "Lying in State",
          location: "At her residence",
        },
        {
          time: "10:00 AM",
          title: "Church Service",
          location:
            "Bishops Smith Memorial Anglican Church, Agba Dam Estate Road, Ilorin, Kwara State.",
          note: "Internment (Strictly private)",
          mapUrl:
            "https://www.google.com/maps/place/Bishop+Smith+Anglican+Church/@8.4839814,4.5367803,17z/data=!3m1!4b1!4m6!3m5!1s0x10364c39c8c9a29d:0x22c2a07d3b2b8e3e!8m2!3d8.4839761!4d4.5393552!16s%2Fg%2F11b6j3w86c?entry=ttu",
        },
        {
          time: "12:00 PM",
          title: "Reception",
          location:
            "Gold Marquee – Atlantic Events Palace, Budo–Giwa road, Ajase Ipo, Offa Garage, Ilorin, Kwara State.",
          mapUrl:
            "https://www.google.com/maps/place/Atlantic+Events+Palace/@8.4569636,4.5795146,17z/data=!3m1!4b1!4m6!3m5!1s0x10364d52a8344bcb:0xa487d9cc5aed7ff2!8m2!3d8.4569636!4d4.5795146!16s%2Fg%2F11d_x00xyv?entry=ttu&g_ep=EgoyMDI1MTEyMy4xIKXMDSoASAFQAw%3D%3D",
        },
      ],
    },
  ];

  return (
    <section id="burial-arrangements" className="py-16 px-4 bg-white">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-5xl font-heading font-bold text-gray-900 mb-4">
            Burial Arrangements
          </h2>
          <div className="w-24 h-1 bg-amber-600 mx-auto" />
        </motion.div>

        <div className="space-y-12">
          {arrangements.map((day, dayIndex) => (
            <motion.div
              key={dayIndex}
              initial={{ opacity: 0, x: dayIndex % 2 === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-gray-50 rounded-2xl p-6 md:p-8 shadow-sm border border-gray-100"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 pb-4 border-b border-gray-200">
                <div className="flex items-center gap-3">
                  <Calendar className="text-amber-600 w-6 h-6" />
                  <h3 className="text-xl md:text-2xl font-semibold text-gray-800">
                    {day.date}
                  </h3>
                </div>
                <div className="flex items-center gap-3 bg-white px-4 py-2 rounded-full border border-gray-200 shadow-sm">
                  <div
                    className={`w-4 h-4 rounded-full bg-gradient-to-r ${day.colorClass}`}
                  />
                  <span className="text-sm font-medium text-gray-600">
                    {day.colorLabel}:{" "}
                    <span className="text-gray-900">{day.colors}</span>
                  </span>
                </div>
              </div>

              <div className="grid gap-8">
                {day.events.map((event, eventIndex) => (
                  <div
                    key={eventIndex}
                    className="relative pl-8 border-l-2 border-amber-200 last:border-0 pb-2"
                  >
                    <div className="absolute left-[-9px] top-0 w-4 h-4 rounded-full bg-amber-600 border-4 border-white shadow-sm" />

                    <div className="flex flex-col md:flex-row md:items-start gap-4">
                      <div className="flex items-center gap-2 text-amber-600 font-bold min-w-[140px]">
                        <Clock size={16} />
                        <span>{event.time}</span>
                      </div>

                      <div className="flex-1">
                        <div className="flex flex-wrap items-center gap-3 mb-2">
                          <h4 className="text-lg font-bold text-gray-900">
                            {event.title}
                          </h4>
                          {(event as any).mapUrl && (
                            <a
                              href={(event as any).mapUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 text-xs font-medium text-amber-700 hover:text-amber-800 bg-amber-100 px-2 py-1 rounded-md transition-colors"
                            >
                              <ExternalLink size={12} />
                              Get Directions
                            </a>
                          )}
                        </div>
                        <div className="flex items-start gap-2 text-gray-600">
                          <MapPin size={18} className="mt-1 flex-shrink-0" />
                          <p className="leading-relaxed">{event.location}</p>
                        </div>
                        {event.note && (
                          <div className="mt-3 flex items-center gap-2 text-sm italic text-amber-800 bg-amber-50 px-3 py-1 rounded-md w-fit">
                            <Info size={14} />
                            {event.note}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
