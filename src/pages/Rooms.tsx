import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useResort } from "../context/ResortContext";
import { Users, CheckCircle2, Bed, Calendar, Wifi, Coffee, Sparkles, Shield, Sun, Eye, ArrowRight, Heart } from "lucide-react";
import { Room } from "../types";
import { getAssetUrl } from "../services/resortStore";

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
                  src={getAssetUrl(room.image)}
                  alt={`${room.category} - Room ${room.roomNumber}`}
                  className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700"
                />

                <div className="absolute top-4 left-4 bg-brand-forest/90 backdrop-blur-md text-amber-300 px-3.5 py-1.5 rounded-full text-xs font-mono font-bold tracking-wider shadow">
                  Room {room.roomNumber}
                </div>

                <div className={`absolute top-4 right-4 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider shadow-md ${
                  room.status === 'Available' ? 'bg-emerald-500 text-white' :
                  room.status === 'Occupied' ? 'bg-rose-500 text-white' :
                  'bg-amber-500 text-white'
                }`}>
                  {room.status}
                </div>

                <div className="absolute bottom-4 right-4 bg-white/95 backdrop-blur-md text-brand-forest px-5 py-2 rounded-2xl font-bold font-mono text-base shadow-xl">
                  NPR {room.pricePerNight.toLocaleString()} <span className="text-xs font-normal text-slate-500">/ night</span>
                </div>
              </div>

              {/* Room Details */}
              <div className="lg:w-1/2 p-8 sm:p-10 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-bold text-amber-700 uppercase tracking-widest">
                      {room.category}
                    </span>
                    <div className="flex items-center gap-1.5 text-xs text-slate-500 font-semibold bg-gray-50 px-3 py-1 rounded-full border border-gray-100">
                      <Users className="w-4 h-4 text-amber-600" />
                      <span>Capacity: {room.capacity} Guests</span>
                    </div>
                  </div>

                  <h3 className="font-serif font-bold text-2xl sm:text-3xl text-brand-forest mb-4">
                    {room.category} &bull; Room {room.roomNumber}
                  </h3>

                  <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-6">
                    {room.description}
                  </p>

                  <div className="mb-8">
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
                      Included Room Amenities
                    </h4>
                    <div className="grid grid-cols-2 gap-2.5">
                      {room.amenities.map((amenity, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-xs text-slate-700 font-medium">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                          <span>{amenity}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Bottom Actions */}
                <div className="pt-6 border-t border-gray-100 flex flex-col sm:flex-row items-center gap-4">
                  <button
                    onClick={() => openBookingModal(room)}
                    className="w-full sm:flex-1 py-3.5 bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600 hover:from-amber-500 hover:to-amber-400 text-white font-bold uppercase tracking-wider text-xs rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    <Calendar className="w-4 h-4" />
                    <span>Reserve Room {room.roomNumber}</span>
                  </button>

                  <a
                    href={`https://wa.me/9779851234567?text=Hello%20Dada%20Ghar%20Resort,%20I%20would%20like%20to%20inquire%20about%20Room%20${room.roomNumber}%20(${encodeURIComponent(room.category)}).`}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full sm:w-auto px-5 py-3.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider rounded-xl transition border border-emerald-200 text-center"
                  >
                    WhatsApp Inquiry
                  </a>
                </div>

              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* 4. COMPLIMENTARY INCLUSIONS GRID */}
      <section className="py-20 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold text-amber-700 uppercase tracking-widest block mb-2">
              Every Stay Inclusions
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif text-brand-forest font-bold mb-3">
              Included with Every Reservation
            </h2>
            <p className="text-slate-600 text-sm sm:text-base">
              We ensure your time at Dada Ghar is deeply relaxing, wholesome, and worry-free.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {inclusions.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div key={idx} className="p-6 bg-[#FAF7F2] rounded-3xl border border-gray-200/80 shadow-sm text-center">
                  <div className="w-12 h-12 bg-amber-500/10 text-amber-700 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-amber-500/20">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h4 className="font-serif font-bold text-lg text-slate-900 mb-1.5">{item.title}</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">{item.desc}</p>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* 5. BOTTOM CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-20">
        <div className="bg-gradient-to-r from-brand-forest via-emerald-950 to-slate-950 rounded-3xl p-8 sm:p-12 text-white text-center shadow-xl">
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white mb-4">
            Need a Custom Group or Family Cottage Package?
          </h2>
          <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto mb-8 leading-relaxed">
            Contact our resort concierge directly for customized team retreats, wedding ceremonies, or large family bookings.
          </p>
          <button
            onClick={() => openBookingModal(null)}
            className="px-8 py-3.5 bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-slate-950 font-bold uppercase tracking-wider text-xs rounded-full shadow-xl transition hover:scale-105"
          >
            Inquire For Custom Booking
          </button>
        </div>
      </section>

    </div>
  );
}
