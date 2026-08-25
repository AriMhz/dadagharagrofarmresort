import { useState, useEffect } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "motion/react";
import {
  Calendar,
  Users,
  ArrowRight,
  Leaf,
  Shield,
  Coffee,
  Star,
  Utensils,
  Flame,
  Sun,
  Award,
  Sparkles,
  ChevronDown,
  Quote,
  Trees,
  Camera,
  HeartHandshake,
  CheckCircle2,
  MapPin,
  Clock,
  Wine,
  Compass,
  Footprints,
  ChevronRight
} from "lucide-react";
import { Link } from "react-router-dom";
import { useResort } from "../context/ResortContext";

interface Testimonial {
  id: number;
  name: string;
  location: string;
  role: string;
  rating: number;
  comment: string;
  avatar: string;
  stayType: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Siddharth & Ananya Sharma",
    location: "Kathmandu, Nepal",
    role: "Family Vacationers",
    rating: 5,
    stayType: "Family Villa Suite",
    comment: "Dada Ghar Agro Farm Resort is pure magic! Waking up to misty Himalayan ridges, harvesting fresh organic strawberries with our children, and the heavenly farmhouse dinner made this the best weekend retreat we've ever experienced.",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80",
  },
  {
    id: 2,
    name: "David & Sarah Miller",
    location: "London, United Kingdom",
    role: "Nature Lovers & Hikers",
    rating: 5,
    stayType: "Agro Wooden Cottage",
    comment: "The wooden cottages seamlessly blend rustic organic charm with 5-star comfort. The evening campfire under the starlit mountain sky with freshly brewed herbal tea and authentic local hospitality was unforgettable.",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80",
  },
  {
    id: 3,
    name: "Pooja & Rohan Shrestha",
    location: "Pokhara, Nepal",
    role: "Anniversary Celebration",
    rating: 5,
    stayType: "Deluxe Sunset Room",
    comment: "Unmatched serenity, incredibly attentive staff, and 100% chemical-free organic cuisine. If you want peace, fresh mountain air, and luxurious relaxation away from city noise, Dada Ghar is the ultimate sanctuary.",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=300&q=80",
  },
];

const faqs = [
  {
    question: "What is included in an agro farm luxury stay at Dada Ghar?",
    answer: "Every stay includes luxury cottage or villa accommodation, complimentary farm-to-table organic breakfast, guided farm tour with fruit & vegetable harvesting, access to nature trails, evening campfire gatherings, and high-speed Wi-Fi throughout the resort.",
  },
  {
    question: "Is all food served at the resort 100% organic and locally harvested?",
    answer: "Yes! Over 90% of all vegetables, herbs, dairy, honey, and fruits served at our restaurant are cultivated directly in our pesticide-free organic agro fields. Any supplemental ingredients are sourced from verified local eco-farms in the valley.",
  },
  {
    question: "Can families with children participate in farm activities?",
    answer: "Absolutely! We offer hands-on family experiences including strawberry picking, vegetable harvesting, clay pottery workshops, gentle nature bird-watching walks, and traditional butter churning sessions.",
  },
  {
    question: "How do I reach Dada Ghar Agro Farm Resort from Kathmandu / Lalitpur?",
    answer: "We are located in the scenic valley of Lele, Lalitpur, approximately a 45-minute picturesque drive from Patan / Ring Road. We also provide private resort pickup transfers upon request.",
  },
  {
    question: "What payment and booking methods are accepted?",
    answer: "You can reserve directly on our website, through instant WhatsApp booking, or with advance QR payments (Fonepay, eSewa, Khalti, or major Cards). We also accept cash settlements at front desk checkout.",
  },
];

const signatureExperiences = [
  {
    icon: Leaf,
    title: "Organic Farm Harvesting",
    tagline: "Hands-on Agro Tourism",
    description: "Pluck ripe strawberries, crisp salad greens, and seasonal vegetables directly from the soil alongside our master farm stewards.",
    image: "https://images.unsplash.com/photo-1595855759920-86582396756a?auto=format&fit=crop&w=800&q=80"
  },
  {
    icon: Utensils,
    title: "Farm-to-Table Gourmet",
    tagline: "100% Chemical-Free",
    description: "Savor authentic Nepali Thakali feasts, wood-fired pizzas, herbal teas, and garden soups crafted from morning harvests.",
    image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80"
  },
  {
    icon: Flame,
    title: "Starlit Campfire & BBQ",
    tagline: "Nighttime Magic",
    description: "Unwind under unpolluted Himalayan night skies with acoustic melodies, warm bonfires, and organic barbecue treats.",
    image: "https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?auto=format&fit=crop&w=800&q=80"
  },
  {
    icon: Footprints,
    title: "Pine Forest Nature Trails",
    tagline: "Guided Eco Walks",
    description: "Explore hidden valley trails, bird sanctuaries, and tranquil riverbanks breathing pure mountain oxygen.",
    image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=80"
  },
];

export default function Home() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 1000], [0, 250]);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const { rooms, openBookingModal } = useResort();

  // Booking search bar states
  const [checkIn, setCheckIn] = useState(new Date().toISOString().split('T')[0]);
  const [checkOut, setCheckOut] = useState(new Date(Date.now() + 86400000).toISOString().split('T')[0]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [guestsCount, setGuestsCount] = useState("2");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const handleBookingSearch = (e: React.FormEvent) => {
    e.preventDefault();
    openBookingModal(null);
  };

  return (
    <div className="w-full bg-[#FAF7F2] text-slate-800 overflow-hidden">
      
      {/* 1. HERO SECTION - Cinematic Luxury Parallax */}
      <section className="relative min-h-[92vh] lg:min-h-screen flex items-center justify-center overflow-hidden">
        
        {/* Parallax Background Image with Dark Vignette */}
        <motion.div style={{ y }} className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=2200&q=85"
            alt="Dada Ghar Agro Farm Resort landscape"
            className="w-full h-[125%] object-cover object-center filter brightness-[0.78]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0D2112] via-black/40 to-black/60" />
        </motion.div>

        {/* Hero Content */}
        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto pt-28 pb-32">
          
          {/* Trust Badge */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md text-amber-300 border border-white/20 text-xs sm:text-sm font-semibold tracking-wide mb-6 shadow-xl"
          >
            <Sparkles className="w-4 h-4 text-amber-400 animate-pulse" />
            <span>5-Star Luxury Agro Retreat &bull; Lele Valley, Nepal</span>
          </motion.div>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl sm:text-6xl md:text-7xl font-serif text-white font-bold leading-[1.1] tracking-tight mb-6 drop-shadow-lg"
          >
            Where Sustainable Luxury <br />
            <span className="font-display italic text-amber-300 font-normal">Meets Raw Mountain Serenity</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-base sm:text-xl md:text-2xl text-slate-200 font-light tracking-wide mb-10 max-w-3xl mx-auto leading-relaxed drop-shadow"
          >
            Recharge your soul across 50 acres of pristine organic farms, handcrafted wooden villas, and farm-to-table culinary artistry.
          </motion.p>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-5"
          >
            <button
              onClick={() => openBookingModal(null)}
              className="px-8 py-4 bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600 hover:from-amber-500 hover:to-amber-400 text-white rounded-full font-bold uppercase tracking-wider text-xs sm:text-sm transition-all duration-300 shadow-2xl hover:shadow-amber-500/30 hover:scale-105 active:scale-95 flex items-center justify-center gap-2.5 w-full sm:w-auto border border-amber-300/40"
            >
              <span>Reserve Your Stay</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <Link
              to="/rooms"
              className="px-8 py-4 bg-white/15 hover:bg-white/25 backdrop-blur-md text-white border border-white/40 rounded-full font-bold uppercase tracking-wider text-xs sm:text-sm transition-all duration-300 w-full sm:w-auto hover:scale-105"
            >
              Explore Cottages & Suites
            </Link>
          </motion.div>
        </div>

        {/* Ambient Bottom Scroll Prompt */}
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-10 text-white/70 flex flex-col items-center gap-1.5 animate-bounce pointer-events-none">
          <span className="text-[10px] uppercase tracking-widest font-semibold">Scroll to discover</span>
          <ChevronDown className="w-4 h-4" />
        </div>
      </section>

      {/* 2. FLOATING LUXURY BOOKING BAR */}
      <div className="relative z-30 max-w-6xl mx-auto px-4 -mt-20 sm:-mt-24 mb-20">
        <div className="bg-white/95 backdrop-blur-2xl rounded-3xl shadow-2xl p-6 sm:p-8 border border-white/60">
          <form onSubmit={handleBookingSearch} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 items-end">
            
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-amber-600" /> Check-In Date
              </label>
              <input
                type="date"
                value={checkIn}
                onChange={(e) => setCheckIn(e.target.value)}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-semibold text-slate-800 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-amber-600" /> Check-Out Date
              </label>
              <input
                type="date"
                value={checkOut}
                onChange={(e) => setCheckOut(e.target.value)}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-semibold text-slate-800 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5 text-amber-600" /> Guests & Capacity
              </label>
              <select
                value={guestsCount}
                onChange={(e) => setGuestsCount(e.target.value)}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-semibold text-slate-800 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition"
              >
                <option value="1">1 Guest (Single)</option>
                <option value="2">2 Guests (Couple)</option>
                <option value="3">3 Guests (Small Family)</option>
                <option value="4">4+ Guests (Family Suite)</option>
              </select>
            </div>

            <div>
              <button
                type="submit"
                className="w-full py-3.5 bg-brand-forest hover:bg-emerald-950 text-white font-bold uppercase tracking-wider text-xs rounded-2xl transition-all duration-300 shadow-xl hover:shadow-brand-forest/30 flex items-center justify-center gap-2"
              >
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>Check Availability</span>
              </button>
            </div>

          </form>
        </div>
      </div>

      {/* 3. WELCOME & PHILOSOPHY SECTION */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block px-3.5 py-1 bg-amber-500/10 text-amber-800 border border-amber-500/20 text-xs font-bold uppercase tracking-widest rounded-full mb-3">
              The Sanctuary of Dada Ghar
            </span>
            <h2 className="text-3xl sm:text-5xl font-serif text-brand-forest font-bold leading-tight mb-6">
              A Return to What Truly <br />
              <span className="font-display italic text-amber-700 font-normal">Nourishes The Soul</span>
            </h2>
            <p className="text-slate-600 text-base sm:text-lg leading-relaxed mb-6">
              Perched high in the peaceful hills of Lele, Lalitpur, Dada Ghar is an intentional sanctuary designed for travelers who yearn for stillness, organic wellness, and meaningful connection with nature.
            </p>
            <p className="text-slate-600 text-base sm:text-lg leading-relaxed mb-8">
              Here, your morning coffee is accompanied by birdsong, your meals are harvested minutes before they reach your plate, and your nights are spent by crackling fireplaces under crystal-clear mountain skies.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              <div className="flex items-start gap-3 p-4 bg-white rounded-2xl border border-gray-100 shadow-sm">
                <div className="p-2.5 bg-emerald-50 text-brand-forest rounded-xl shrink-0">
                  <Leaf className="w-5 h-5 text-brand-leaf" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">100% Certified Organic</h4>
                  <p className="text-xs text-slate-500 mt-0.5">Pesticide-free vegetables, raw honey & herbs.</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 bg-white rounded-2xl border border-gray-100 shadow-sm">
                <div className="p-2.5 bg-amber-50 text-amber-700 rounded-xl shrink-0">
                  <Shield className="w-5 h-5 text-amber-600" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">Handcrafted Cottages</h4>
                  <p className="text-xs text-slate-500 mt-0.5">Eco-luxury wooden architecture with 5-star comfort.</p>
                </div>
              </div>
            </div>

            <Link
              to="/about"
              className="inline-flex items-center gap-2 font-bold text-sm text-brand-forest hover:text-amber-700 transition group"
            >
              <span>Read Our Heritage & Mission</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition" />
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
              <img
                src="https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1000&q=80"
                alt="Dada Ghar luxury wooden cottage suite"
                className="w-full h-[480px] object-cover hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              
              <div className="absolute bottom-6 left-6 right-6 p-5 bg-white/90 backdrop-blur-md rounded-2xl border border-white/40 text-slate-900 shadow-xl">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-amber-700 tracking-wider">Featured Accommodation</span>
                    <h4 className="font-serif font-bold text-lg text-brand-forest">Agro Wooden Villa Suite</h4>
                  </div>
                  <span className="font-mono font-bold text-amber-700 text-sm">NPR 6,000 / night</span>
                </div>
              </div>
            </div>

            {/* Ambient Gold Badge */}
            <div className="absolute -top-6 -right-6 w-24 h-24 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full flex flex-col items-center justify-center text-white text-center p-2 shadow-2xl border-4 border-white transform rotate-12 hidden sm:flex">
              <Star className="w-5 h-5 fill-white" />
              <span className="text-[10px] font-bold uppercase tracking-tighter mt-0.5">Top Rated</span>
            </div>
          </motion.div>

        </div>
      </section>

      {/* 4. CURATED ACCOMMODATION SHOWCASE */}
      <section className="py-20 bg-white border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-4">
            <div>
              <span className="text-xs font-bold text-amber-700 uppercase tracking-widest block mb-2">
                Handcrafted Living Spaces
              </span>
              <h2 className="text-3xl sm:text-5xl font-serif text-brand-forest font-bold">
                Luxury Suites & Eco Cottages
              </h2>
            </div>
            <Link
              to="/rooms"
              className="inline-flex items-center gap-2 text-sm font-bold text-brand-forest hover:text-amber-700 transition"
            >
              <span>View All Accommodations</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {rooms.slice(0, 3).map((room) => (
              <motion.div
                key={room.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="bg-[#FAF7F2] rounded-3xl overflow-hidden border border-gray-200/80 shadow-md hover:shadow-2xl transition-all duration-500 flex flex-col group"
              >
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={room.image}
                    alt={room.roomNumber}
                    className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700"
                  />
                  <div className="absolute top-4 left-4 bg-brand-forest/90 backdrop-blur-md text-amber-300 px-3 py-1 rounded-full text-xs font-mono font-bold">
                    Room {room.roomNumber}
                  </div>
                  <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-bold uppercase shadow ${
                    room.status === 'Available' ? 'bg-emerald-500 text-white' :
                    room.status === 'Occupied' ? 'bg-rose-500 text-white' :
                    'bg-amber-500 text-white'
                  }`}>
                    {room.status}
                  </div>
                  <div className="absolute bottom-4 right-4 bg-white/95 backdrop-blur-md text-brand-forest px-4 py-1.5 rounded-full font-bold font-mono text-sm shadow-lg">
                    NPR {room.pricePerNight.toLocaleString()} <span className="text-[10px] font-normal text-slate-500">/ night</span>
                  </div>
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-serif font-bold text-xl text-brand-forest">{room.category}</h3>
                      <span className="text-xs text-slate-500 font-medium flex items-center gap-1">
                        <Users className="w-3.5 h-3.5 text-amber-600" /> Up to {room.capacity}
                      </span>
                    </div>

                    <p className="text-xs text-slate-600 line-clamp-2 mb-4 leading-relaxed">
                      {room.description}
                    </p>

                    <div className="flex flex-wrap gap-1.5 mb-6">
                      {room.amenities.slice(0, 3).map((am, i) => (
                        <span key={i} className="px-2.5 py-1 bg-white text-slate-600 rounded-lg text-[11px] font-medium border border-gray-100">
                          {am}
                        </span>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={() => openBookingModal(room)}
                    className="w-full py-3 bg-brand-forest hover:bg-emerald-950 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition shadow-md flex items-center justify-center gap-2"
                  >
                    <Calendar className="w-4 h-4 text-amber-400" />
                    <span>Reserve Room {room.roomNumber}</span>
                  </button>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* 5. SIGNATURE EXPERIENCES & ACTIVITIES */}
      <section id="activities" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold text-amber-700 uppercase tracking-widest block mb-2">
            Agro-Tourism & Nature
          </span>
          <h2 className="text-3xl sm:text-5xl font-serif text-brand-forest font-bold mb-4">
            Curated Resort Experiences
          </h2>
          <p className="text-slate-600 text-base sm:text-lg">
            Immerse yourself in authentic Himalayan farm life with curated activities tailored for adventure, relaxation, and discovery.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {signatureExperiences.map((exp, idx) => {
            const Icon = exp.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-md hover:shadow-2xl transition-all duration-500 flex flex-col group"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={exp.image}
                    alt={exp.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute top-4 left-4 p-2.5 bg-white/90 backdrop-blur-md rounded-2xl text-brand-forest shadow">
                    <Icon className="w-5 h-5 text-amber-600" />
                  </div>
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-amber-700 block mb-1">
                      {exp.tagline}
                    </span>
                    <h3 className="font-serif font-bold text-lg text-brand-forest mb-2">
                      {exp.title}
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {exp.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* 6. FARM-TO-TABLE GASTRONOMY SPOTLIGHT */}
      <section className="py-20 bg-gradient-to-br from-[#19381F] via-[#0D2112] to-slate-950 text-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            
            <div className="relative">
              <div className="rounded-3xl overflow-hidden shadow-2xl border-4 border-white/10">
                <img
                  src="https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?auto=format&fit=crop&w=1000&q=80"
                  alt="Organic farm-to-table dining"
                  className="w-full h-[460px] object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-amber-500 text-slate-950 p-5 rounded-2xl shadow-2xl border-2 border-white/20 hidden sm:block">
                <span className="font-serif font-bold text-2xl block">100%</span>
                <span className="text-xs font-bold uppercase tracking-wider">Organic Certified</span>
              </div>
            </div>

            <div className="space-y-6">
              <span className="inline-block px-3.5 py-1 bg-amber-400/20 text-amber-300 border border-amber-400/30 text-xs font-bold uppercase tracking-widest rounded-full">
                Culinary Artistry
              </span>
              <h2 className="text-3xl sm:text-5xl font-serif text-white font-bold leading-tight">
                Fresh From Our Earth, <br />
                <span className="font-display italic text-amber-300 font-normal">Prepared With Heart</span>
              </h2>
              <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
                At Dada Ghar, dining is a celebration of seasonal harvest. We cultivate heirloom vegetables, organic rice, mountain herbs, and wild berries right on our resort grounds.
              </p>

              <div className="space-y-3.5 pt-2">
                <div className="flex items-center gap-3 text-slate-200 text-sm">
                  <CheckCircle2 className="w-5 h-5 text-amber-400 shrink-0" />
                  <span>Daily morning harvests for restaurant recipes</span>
                </div>
                <div className="flex items-center gap-3 text-slate-200 text-sm">
                  <CheckCircle2 className="w-5 h-5 text-amber-400 shrink-0" />
                  <span>Authentic Thakali Set, Wood-Fired Roasts, and Herbal Infusions</span>
                </div>
                <div className="flex items-center gap-3 text-slate-200 text-sm">
                  <CheckCircle2 className="w-5 h-5 text-amber-400 shrink-0" />
                  <span>Outdoor dining terraces with panoramic sunset views</span>
                </div>
              </div>

              <div className="pt-4">
                <Link
                  to="/contact"
                  className="px-8 py-3.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold uppercase tracking-wider text-xs rounded-full transition shadow-xl inline-flex items-center gap-2"
                >
                  <span>Inquire About Dining & Events</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 7. NUMBERS & IMPACT COUNTER */}
      <section className="py-16 bg-[#FAF7F2] border-b border-gray-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">
            
            <div className="p-6 bg-white rounded-3xl border border-gray-100 shadow-sm">
              <span className="font-serif font-bold text-3xl sm:text-4xl text-brand-forest block">50+</span>
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider mt-1 block">Acres Organic Farmland</span>
            </div>

            <div className="p-6 bg-white rounded-3xl border border-gray-100 shadow-sm">
              <span className="font-serif font-bold text-3xl sm:text-4xl text-amber-700 block">10,000+</span>
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider mt-1 block">Happy Retreat Guests</span>
            </div>

            <div className="p-6 bg-white rounded-3xl border border-gray-100 shadow-sm">
              <span className="font-serif font-bold text-3xl sm:text-4xl text-brand-forest block">100%</span>
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider mt-1 block">Pesticide Free Harvest</span>
            </div>

            <div className="p-6 bg-white rounded-3xl border border-gray-100 shadow-sm">
              <span className="font-serif font-bold text-3xl sm:text-4xl text-amber-700 block">4.9 ★</span>
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider mt-1 block">TripAdvisor Rating</span>
            </div>

          </div>
        </div>
      </section>

      {/* 8. VERIFIED GUEST TESTIMONIALS */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold text-amber-700 uppercase tracking-widest block mb-2">
            Verified Guest Stories
          </span>
          <h2 className="text-3xl sm:text-5xl font-serif text-brand-forest font-bold mb-4">
            Cherished Memories at Dada Ghar
          </h2>
          <p className="text-slate-600 text-base sm:text-lg">
            Hear from families, couples, and adventurers who made our mountain retreat their peaceful sanctuary.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-white p-8 rounded-3xl border border-gray-100 shadow-md hover:shadow-xl transition flex flex-col justify-between relative"
            >
              <Quote className="w-10 h-10 text-amber-200 absolute top-6 right-6" />

              <div>
                <div className="flex items-center gap-1 text-amber-400 mb-4">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>

                <p className="text-slate-600 text-sm leading-relaxed mb-6 italic">
                  "{t.comment}"
                </p>
              </div>

              <div className="pt-4 border-t border-gray-100 flex items-center gap-3">
                <img
                  src={t.avatar}
                  alt={t.name}
                  className="w-11 h-11 rounded-full object-cover border-2 border-amber-500"
                />
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">{t.name}</h4>
                  <p className="text-[11px] text-slate-500">{t.location} &bull; <span className="text-amber-700 font-medium">{t.stayType}</span></p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 9. FAQ ACCORDION */}
      <section className="py-20 bg-white border-t border-gray-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center mb-12">
            <span className="text-xs font-bold text-amber-700 uppercase tracking-widest block mb-2">
              Helpful Information
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif text-brand-forest font-bold">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  className="bg-[#FAF7F2] rounded-2xl border border-gray-200/80 overflow-hidden transition"
                >
                  <button
                    onClick={() => toggleFaq(idx)}
                    className="w-full p-5 text-left font-serif font-bold text-slate-900 flex items-center justify-between gap-4 text-base"
                  >
                    <span>{faq.question}</span>
                    <ChevronDown className={`w-5 h-5 text-amber-700 transition-transform duration-300 shrink-0 ${isOpen ? "rotate-180" : ""}`} />
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="px-5 pb-5 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-gray-200/60 pt-3">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* 10. LUXURY CTA FOOTER BANNER */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="bg-gradient-to-r from-brand-forest via-emerald-950 to-slate-950 rounded-3xl p-8 sm:p-14 text-white shadow-2xl text-center relative overflow-hidden">
          <div className="relative z-10 max-w-3xl mx-auto">
            <span className="inline-block px-4 py-1.5 bg-white/10 backdrop-blur-md rounded-full text-amber-300 text-xs font-bold uppercase tracking-widest mb-4 border border-white/15">
              Plan Your Himalayan Getaway
            </span>
            <h2 className="text-3xl sm:text-5xl font-serif font-bold mb-6 leading-tight">
              Ready to Experience The Organic Magic of Dada Ghar?
            </h2>
            <p className="text-slate-300 text-base sm:text-lg mb-8 leading-relaxed">
              Book your private wooden cottage or family suite today. Guaranteed best rates and instant confirmation with our resort team.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={() => openBookingModal(null)}
                className="px-8 py-4 bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-slate-950 font-bold uppercase tracking-wider text-xs rounded-full shadow-2xl transition hover:scale-105"
              >
                Instant Online Reservation
              </button>
              <Link
                to="/contact"
                className="px-8 py-4 bg-white/15 hover:bg-white/25 text-white font-bold uppercase tracking-wider text-xs rounded-full border border-white/30 transition"
              >
                Contact Resort Concierge
              </Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
