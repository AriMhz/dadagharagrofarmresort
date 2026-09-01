import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
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
  Sparkles,
  ChevronDown,
  Quote,
  Trees,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Footprints
} from "lucide-react";
import { Link } from "react-router-dom";
import { useResort } from "../context/ResortContext";
import { getAssetUrl } from "../services/resortStore";

const renderExperienceIcon = (iconName: string) => {
  switch (iconName) {
    case 'flame':
      return <Flame className="w-5 h-5 text-amber-600" />;
    case 'leaf':
      return <Leaf className="w-5 h-5 text-amber-600" />;
    case 'utensils':
      return <Utensils className="w-5 h-5 text-amber-600" />;
    case 'footprints':
      return <Footprints className="w-5 h-5 text-amber-600" />;
    case 'sun':
      return <Sun className="w-5 h-5 text-amber-600" />;
    case 'coffee':
      return <Coffee className="w-5 h-5 text-amber-600" />;
    default:
      return <Sparkles className="w-5 h-5 text-amber-600" />;
  }
};

export default function Home() {
  const { rooms, openBookingModal, dynamicContent } = useResort();
  const { heroSlides, sanctuary, experiences, culinary, testimonials, faqs, stats, homeCtaBanner } = dynamicContent;

  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  // Booking search bar states
  const [checkIn, setCheckIn] = useState(new Date().toISOString().split('T')[0]);
  const [checkOut, setCheckOut] = useState(new Date(Date.now() + 86400000).toISOString().split('T')[0]);
  const [guestsCount, setGuestsCount] = useState("2");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Auto-switching hero slider every 5.5 seconds
  useEffect(() => {
    if (!heroSlides || heroSlides.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentSlideIndex((prev) => (prev + 1) % heroSlides.length);
    }, 5500);
    return () => clearInterval(interval);
  }, [heroSlides]);

  const nextSlide = () => {
    setCurrentSlideIndex((prev) => (prev + 1) % heroSlides.length);
  };

  const prevSlide = () => {
    setCurrentSlideIndex((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  };

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const handleBookingSearch = (e: React.FormEvent) => {
    e.preventDefault();
    openBookingModal(null);
  };

  const currentSlide = heroSlides[currentSlideIndex] || heroSlides[0];

  const bottomBanner = homeCtaBanner || {
    badgeText: 'Plan Your Himalayan Getaway',
    title: 'Ready to Experience The Organic Magic of Dada Ghar?',
    description: 'Book your private wooden cottage or family suite today. Guaranteed best rates and instant confirmation with our resort team.',
    backgroundImage: 'images/resort/optimized/DSC09130.jpg',
    primaryCtaText: 'Instant Online Reservation',
    secondaryCtaText: 'Contact Resort Concierge'
  };

  return (
    <div className="w-full bg-[#FAF7F2] text-slate-800 overflow-hidden">
      
      {/* 1. HERO SECTION - Auto-Switching Parallax Slideshow with Real Resort Photos */}
      <section className="relative min-h-[92vh] lg:min-h-screen flex items-center justify-center overflow-hidden bg-slate-950">
        
        {/* Animated Background Image Carousel with Cross-Fade */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlideIndex}
            initial={{ opacity: 0, scale: 1.08 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="absolute inset-0 z-0"
          >
            <img
              src={getAssetUrl(currentSlide.image)}
              alt={currentSlide.title}
              className="w-full h-full object-cover object-center filter brightness-[0.75]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0D2112] via-black/45 to-black/65" />
          </motion.div>
        </AnimatePresence>

        {/* Hero Slide Content */}
        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto pt-28 pb-32">
          
          {/* Trust Badge */}
          <motion.div
            key={`badge-${currentSlideIndex}`}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/15 backdrop-blur-md text-amber-300 border border-white/20 text-xs sm:text-sm font-semibold tracking-wide mb-6 shadow-xl"
          >
            <Sparkles className="w-4 h-4 text-amber-400 animate-pulse" />
            <span>{currentSlide.badgeText}</span>
          </motion.div>

          {/* Heading */}
          <motion.h1
            key={`title-${currentSlideIndex}`}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="text-4xl sm:text-6xl md:text-7xl font-serif text-white font-bold leading-[1.1] tracking-tight mb-6 drop-shadow-lg"
          >
            {currentSlide.title} <br />
            <span className="font-display italic text-amber-300 font-normal">{currentSlide.subtitleItalic}</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            key={`desc-${currentSlideIndex}`}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-base sm:text-xl md:text-2xl text-slate-200 font-light tracking-wide mb-10 max-w-3xl mx-auto leading-relaxed drop-shadow"
          >
            {currentSlide.description}
          </motion.p>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.45 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-5"
          >
            <button
              onClick={() => openBookingModal(null)}
              className="px-8 py-4 bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600 hover:from-amber-500 hover:to-amber-400 text-white rounded-full font-bold uppercase tracking-wider text-xs sm:text-sm transition-all duration-300 shadow-2xl hover:shadow-amber-500/30 hover:scale-105 active:scale-95 flex items-center justify-center gap-2.5 w-full sm:w-auto border border-amber-300/40"
            >
              <span>{currentSlide.primaryCtaText || "Reserve Your Stay"}</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <Link
              to="/rooms"
              className="px-8 py-4 bg-white/15 hover:bg-white/25 backdrop-blur-md text-white border border-white/40 rounded-full font-bold uppercase tracking-wider text-xs sm:text-sm transition-all duration-300 w-full sm:w-auto hover:scale-105"
            >
              {currentSlide.secondaryCtaText || "Explore Cottages & Suites"}
            </Link>
          </motion.div>

        </div>

        {/* Carousel Navigation Arrows */}
        {heroSlides.length > 1 && (
          <>
            <button
              onClick={prevSlide}
              aria-label="Previous Slide"
              className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-black/30 hover:bg-black/60 text-white/80 hover:text-white backdrop-blur-md border border-white/20 transition shadow-lg"
            >
              <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
            <button
              onClick={nextSlide}
              aria-label="Next Slide"
              className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-black/30 hover:bg-black/60 text-white/80 hover:text-white backdrop-blur-md border border-white/20 transition shadow-lg"
            >
              <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
          </>
        )}

        {/* Slide Indicator Dots */}
        {heroSlides.length > 1 && (
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex items-center gap-2.5">
            {heroSlides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentSlideIndex(idx)}
                aria-label={`Go to slide ${idx + 1}`}
                className={`transition-all duration-500 rounded-full ${
                  currentSlideIndex === idx
                    ? "w-8 h-2.5 bg-amber-400 shadow-md"
                    : "w-2.5 h-2.5 bg-white/40 hover:bg-white/75"
                }`}
              />
            ))}
          </div>
        )}
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

      {/* 3. THE SANCTUARY OF DADA GHAR (DYNAMIC) */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block px-3.5 py-1 bg-amber-500/10 text-amber-800 border border-amber-500/20 text-xs font-bold uppercase tracking-widest rounded-full mb-3">
              {sanctuary.badgeText}
            </span>
            <h2 className="text-3xl sm:text-5xl font-serif text-brand-forest font-bold leading-tight mb-6">
              {sanctuary.title} <br />
              <span className="font-display italic text-amber-700 font-normal">{sanctuary.titleItalic}</span>
            </h2>
            <p className="text-slate-600 text-base sm:text-lg leading-relaxed mb-6">
              {sanctuary.paragraph1}
            </p>
            <p className="text-slate-600 text-base sm:text-lg leading-relaxed mb-8">
              {sanctuary.paragraph2}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              <div className="flex items-start gap-3 p-4 bg-white rounded-2xl border border-gray-100 shadow-sm">
                <div className="p-2.5 bg-emerald-50 text-brand-forest rounded-xl shrink-0">
                  <Leaf className="w-5 h-5 text-brand-leaf" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">{sanctuary.highlight1Title}</h4>
                  <p className="text-xs text-slate-500 mt-0.5">{sanctuary.highlight1Desc}</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 bg-white rounded-2xl border border-gray-100 shadow-sm">
                <div className="p-2.5 bg-amber-50 text-amber-700 rounded-xl shrink-0">
                  <Shield className="w-5 h-5 text-amber-600" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">{sanctuary.highlight2Title}</h4>
                  <p className="text-xs text-slate-500 mt-0.5">{sanctuary.highlight2Desc}</p>
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
                src={getAssetUrl(sanctuary.featuredImage)}
                alt="Dada Ghar luxury wooden cottage suite"
                className="w-full h-[480px] object-cover hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              
              <div className="absolute bottom-6 left-6 right-6 p-5 bg-white/90 backdrop-blur-md rounded-2xl border border-white/40 text-slate-900 shadow-xl">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-amber-700 tracking-wider">{sanctuary.featuredRoomLabel}</span>
                    <h4 className="font-serif font-bold text-lg text-brand-forest">{sanctuary.featuredRoomTitle}</h4>
                  </div>
                  <span className="font-mono font-bold text-amber-700 text-sm">{sanctuary.featuredRoomPrice}</span>
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
                    src={getAssetUrl(room.image)}
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

      {/* 5. CURATED EXPERIENCES & ACTIVITIES (DYNAMIC WITH BBQ DSC09103) */}
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
          {experiences.map((exp, idx) => (
            <motion.div
              key={exp.id || idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-md hover:shadow-2xl transition-all duration-500 flex flex-col group"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={getAssetUrl(exp.image)}
                  alt={exp.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute top-4 left-4 p-2.5 bg-white/90 backdrop-blur-md rounded-2xl text-brand-forest shadow">
                  {renderExperienceIcon(exp.iconName)}
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
          ))}
        </div>
      </section>

      {/* 6. FARM-TO-TABLE GASTRONOMY / CULINARY ARTISTRY (DYNAMIC) */}
      <section className="py-20 bg-gradient-to-br from-[#19381F] via-[#0D2112] to-slate-950 text-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            
            <div className="relative">
              <div className="rounded-3xl overflow-hidden shadow-2xl border-4 border-white/10">
                <img
                  src={getAssetUrl(culinary.image)}
                  alt="Organic farm-to-table dining"
                  className="w-full h-[460px] object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-amber-500 text-slate-950 p-5 rounded-2xl shadow-2xl border-2 border-white/20 hidden sm:block">
                <span className="font-serif font-bold text-2xl block">{culinary.cornerBadgeNumber}</span>
                <span className="text-xs font-bold uppercase tracking-wider">{culinary.cornerBadgeText}</span>
              </div>
            </div>

            <div className="space-y-6">
              <span className="inline-block px-3.5 py-1 bg-amber-400/20 text-amber-300 border border-amber-400/30 text-xs font-bold uppercase tracking-widest rounded-full">
                {culinary.badgeText}
              </span>
              <h2 className="text-3xl sm:text-5xl font-serif text-white font-bold leading-tight">
                {culinary.title} <br />
                <span className="font-display italic text-amber-300 font-normal">{culinary.titleItalic}</span>
              </h2>
              <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
                {culinary.description}
              </p>

              <div className="space-y-3.5 pt-2">
                {culinary.bullet1 && (
                  <div className="flex items-center gap-3 text-slate-200 text-sm">
                    <CheckCircle2 className="w-5 h-5 text-amber-400 shrink-0" />
                    <span>{culinary.bullet1}</span>
                  </div>
                )}
                {culinary.bullet2 && (
                  <div className="flex items-center gap-3 text-slate-200 text-sm">
                    <CheckCircle2 className="w-5 h-5 text-amber-400 shrink-0" />
                    <span>{culinary.bullet2}</span>
                  </div>
                )}
                {culinary.bullet3 && (
                  <div className="flex items-center gap-3 text-slate-200 text-sm">
                    <CheckCircle2 className="w-5 h-5 text-amber-400 shrink-0" />
                    <span>{culinary.bullet3}</span>
                  </div>
                )}
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

      {/* 7. NUMBERS & IMPACT COUNTER (DYNAMIC) */}
      <section className="py-16 bg-[#FAF7F2] border-b border-gray-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">
            
            <div className="p-6 bg-white rounded-3xl border border-gray-100 shadow-sm">
              <span className="font-serif font-bold text-3xl sm:text-4xl text-brand-forest block">{stats.acres}</span>
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider mt-1 block">Acres Organic Farmland</span>
            </div>

            <div className="p-6 bg-white rounded-3xl border border-gray-100 shadow-sm">
              <span className="font-serif font-bold text-3xl sm:text-4xl text-amber-700 block">{stats.guests}</span>
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider mt-1 block">Happy Retreat Guests</span>
            </div>

            <div className="p-6 bg-white rounded-3xl border border-gray-100 shadow-sm">
              <span className="font-serif font-bold text-3xl sm:text-4xl text-brand-forest block">{stats.organicHarvest}</span>
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider mt-1 block">Pesticide Free Harvest</span>
            </div>

            <div className="p-6 bg-white rounded-3xl border border-gray-100 shadow-sm">
              <span className="font-serif font-bold text-3xl sm:text-4xl text-amber-700 block">{stats.tripAdvisorRating}</span>
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider mt-1 block">TripAdvisor Rating</span>
            </div>

          </div>
        </div>
      </section>

      {/* 8. VERIFIED GUEST STORIES / TESTIMONIALS (DYNAMIC) */}
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

      {/* 9. FAQ ACCORDION (DYNAMIC) */}
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
                  key={faq.id || idx}
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

      {/* 10. LUXURY CTA FOOTER BANNER (DYNAMIC IMAGE & TEXT FROM ADMIN PANEL) */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="relative rounded-3xl p-8 sm:p-14 text-white shadow-2xl text-center overflow-hidden border border-white/15">
          
          {/* Background Image with Dark Gradient Overlay */}
          <div className="absolute inset-0 z-0">
            <img
              src={getAssetUrl(bottomBanner.backgroundImage)}
              alt="Dada Ghar Resort Banner"
              className="w-full h-full object-cover filter brightness-[0.45]"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-brand-forest/90 via-emerald-950/80 to-slate-950/90" />
          </div>

          <div className="relative z-10 max-w-3xl mx-auto">
            <span className="inline-block px-4 py-1.5 bg-white/10 backdrop-blur-md rounded-full text-amber-300 text-xs font-bold uppercase tracking-widest mb-4 border border-white/15">
              {bottomBanner.badgeText}
            </span>
            <h2 className="text-3xl sm:text-5xl font-serif font-bold text-white mb-6 leading-tight">
              {bottomBanner.title}
            </h2>
            <p className="text-slate-200 text-base sm:text-lg mb-8 leading-relaxed font-light">
              {bottomBanner.description}
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={() => openBookingModal(null)}
                className="px-8 py-4 bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-slate-950 font-bold uppercase tracking-wider text-xs rounded-full shadow-2xl transition hover:scale-105"
              >
                {bottomBanner.primaryCtaText}
              </button>
              <Link
                to="/contact"
                className="px-8 py-4 bg-white/15 hover:bg-white/25 text-white font-bold uppercase tracking-wider text-xs rounded-full border border-white/30 transition"
              >
                {bottomBanner.secondaryCtaText}
              </Link>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
}
