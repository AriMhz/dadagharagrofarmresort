import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useResort } from "../context/ResortContext";
import { Users, CheckCircle2, Bed, Calendar, Wifi, Coffee, Sparkles, Shield, Sun, Eye, ArrowRight, Heart } from "lucide-react";
import { Room } from "../types";

const inclusions = [
  { icon: Coffee, title: "Organic Farm Breakfast", desc: "Complimentary wholesome morning breakfast harvested from our farm." },
  { icon: Wifi, title: "High-Speed Wi-Fi", desc: "Stay seamlessly connected throughout all suites and outdoor lounge areas." },
  { icon: Sun, title: "24/7 Solar Hot Water", desc: "Eco-friendly solar heated rainfall showers in all private bathrooms." },
  { icon: Sparkles, title: "Guided Agro Tour", desc: "Complimentary hands-on harvest tour with our master farm horticulturist." },
];

export default function Rooms() {
  const { rooms, openBookingModal } = useResort();
  const [selectedFilter, setSelectedFilter] = useState<string>("ALL");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const categories = ["ALL", ...Array.from(new Set(rooms.map(r => r.category)))];

  const filteredRooms = rooms.filter(r => {
    if (selectedFilter === "ALL") return true;
    return r.category === selectedFilter;
  });

  return (
    <div className="w-full bg-[#FAF7F2] text-slate-800 pt-24 pb-20 overflow-hidden">
      
      {/* 1. HERO BANNER */}
      <section className="relative py-16 sm:py-20 bg-gradient-to-b from-[#19381F] to-[#0D2112] text-white text-center mb-16">
        <div className="max-w-4xl mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md text-amber-300 border border-white/20 text-xs font-bold uppercase tracking-widest mb-4"
          >
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>Boutique Eco-Accommodations</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-6xl font-serif font-bold text-white mb-4"
          >
            Handcrafted Cottages & Suites
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-slate-300 text-base sm:text-lg max-w-2xl mx-auto font-light leading-relaxed"
          >
            Immerse yourself in authentic Himalayan wooden craftsmanship, private mountain vistas, and 5-star organic luxury.
          </motion.p>
        </div>
      </section>

      {/* 2. CATEGORY FILTER TABS */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="flex items-center justify-center flex-wrap gap-2.5">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedFilter(cat)}
              className={`px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 ${
                selectedFilter === cat
                  ? "bg-brand-forest text-amber-300 shadow-lg scale-105 border border-amber-400/30"
                  : "bg-white text-slate-700 hover:bg-amber-50 hover:text-brand-forest border border-gray-200"
              }`}
            >
              {cat === "ALL" ? "All Accommodations" : cat}
            </button>
          ))}
        </div>
      </div>

      {/* 3. ROOMS LISTING */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
        <div className="space-y-12">
          {filteredRooms.map((room, index) => (
            <motion.div
              key={room.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6 }}
              className={`flex flex-col ${
                index % 2 !== 0 ? "lg:flex-row-reverse" : "lg:flex-row"
              } bg-white rounded-3xl overflow-hidden shadow-xl border border-gray-200/80 hover:shadow-2xl transition-all duration-500 group`}
            >
              {/* Room Visual */}
              <div className="lg:w-1/2 relative min-h-[320px] lg:min-h-[420px] overflow-hidden">
                <img
                  src={room.image}
                  alt={`Room ${room.roomNumber}`}
                  className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700"
                />
                
                <div className="absolute top-6 left-6 bg-brand-forest/95 backdrop-blur-md text-amber-300 px-4 py-1.5 rounded-full font-mono font-bold text-xs shadow-md border border-amber-300/30">
                  Room {room.roomNumber}
                </div>

                <div className="absolute top-6 right-6 bg-white/95 backdrop-blur-md px-4 py-2 rounded-2xl shadow-xl font-mono text-right">
                  <span className="text-[10px] text-slate-500 uppercase font-semibold block">Starting from</span>
                  <span className="font-bold text-brand-forest text-lg">NPR {room.pricePerNight.toLocaleString()}</span>
                  <span className="text-[10px] text-slate-500 block">/ night</span>
                </div>

                <div className={`absolute bottom-6 left-6 px-3.5 py-1 rounded-full text-xs font-bold uppercase shadow-lg ${
                  room.status === 'Available' ? 'bg-emerald-500 text-white' :
                  room.status === 'Occupied' ? 'bg-rose-500 text-white' :
                  'bg-amber-500 text-white'
                }`}>
                  {room.status}
                </div>
              </div>

              {/* Room Details */}
              <div className="lg:w-1/2 p-8 sm:p-12 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between gap-4 mb-3">
                    <h2 className="text-2xl sm:text-3xl font-serif font-bold text-brand-forest">
                      {room.category}
                    </h2>
                    <span className="text-xs text-slate-600 font-semibold px-3 py-1 bg-amber-50 text-amber-900 rounded-full border border-amber-200 shrink-0 flex items-center gap-1">
                      <Users className="w-3.5 h-3.5 text-amber-600" /> Max {room.capacity} Guests
                    </span>
                  </div>

                  <p className="text-slate-600 text-sm leading-relaxed mb-6">
                    {room.description}
                  </p>

                  <div className="mb-8">
                    <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">
                      Suite Features & Amenities
                    </h3>
                    <div className="grid grid-cols-2 gap-2.5 text-xs text-slate-700">
                      {room.amenities.map((amenity, i) => (
                        <div key={i} className="flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                          <span>{amenity}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="pt-6 border-t border-gray-100 flex flex-col sm:flex-row items-center gap-4">
                  <button
                    onClick={() => openBookingModal(room)}
                    className="w-full sm:w-auto px-8 py-3.5 bg-brand-forest hover:bg-emerald-950 text-white font-bold uppercase tracking-wider text-xs rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    <Calendar className="w-4 h-4 text-amber-400" />
                    <span>Book Room {room.roomNumber}</span>
                  </button>

                  <span className="text-[11px] text-slate-500">
                    Instant confirmation &bull; No advance required to inquiry
                  </span>
                </div>
              </div>

            </motion.div>
          ))}
        </div>
      </div>

      {/* 4. INCLUSIONS & PRIVILEGES */}
      <section className="py-20 bg-white border-y border-gray-100 mb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold text-amber-700 uppercase tracking-widest block mb-2">
              The Dada Ghar Difference
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif text-brand-forest font-bold mb-4">
              Complimentary Inclusions With Every Stay
            </h2>
            <p className="text-slate-600 text-sm sm:text-base">
              Every guest at our resort enjoys tailored comforts crafted to make your retreat deeply restorative.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {inclusions.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  className="p-6 bg-[#FAF7F2] rounded-3xl border border-gray-200/80 shadow-sm flex flex-col"
                >
                  <div className="w-12 h-12 bg-emerald-100 text-brand-forest rounded-2xl flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-brand-leaf" />
                  </div>
                  <h3 className="font-serif font-bold text-base text-slate-900 mb-1">{item.title}</h3>
                  <p className="text-xs text-slate-500 leading-relaxed">{item.desc}</p>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* 5. STAY POLICIES */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white p-8 sm:p-10 rounded-3xl border border-gray-200/80 shadow-md">
          <h3 className="font-serif font-bold text-xl text-brand-forest mb-4">Resort Stay Policies & Guidelines</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-slate-600">
            <div>
              <span className="font-bold text-slate-900 block mb-1">Check-in & Check-out</span>
              <p>Check-in: from 2:00 PM<br />Check-out: by 11:00 AM. Early check-in available upon request.</p>
            </div>
            <div>
              <span className="font-bold text-slate-900 block mb-1">Organic Farm Etiquette</span>
              <p>Guests are invited to join fruit and herb harvesting under the guidance of our farm horticulturists.</p>
            </div>
            <div>
              <span className="font-bold text-slate-900 block mb-1">Eco-Sanctuary Noise Policy</span>
              <p>We honor tranquility. Quiet hours begin at 10:00 PM for restful stargazing and sleep.</p>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
