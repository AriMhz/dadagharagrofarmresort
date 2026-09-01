import { useState, useEffect, MouseEvent } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, ChevronLeft, ChevronRight, ZoomIn, Camera, Instagram, ArrowRight, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { useResort } from "../context/ResortContext";
import { getAssetUrl } from "../services/resortStore";

export interface GalleryItem {
  id: number;
  title: string;
  category: "resort" | "farm" | "dining" | "activities" | "scenery";
  categoryLabel: string;
  image: string;
  description: string;
}

const categories = [
  { id: "all", label: "All Photos" },
  { id: "resort", label: "Resort & Cottages" },
  { id: "farm", label: "Agro Farm & Harvest" },
  { id: "dining", label: "Organic Dining" },
  { id: "activities", label: "Farm Activities" },
  { id: "scenery", label: "Sunset & Valley Views" },
];

const galleryItems: GalleryItem[] = [
  {
    id: 1,
    title: "Panoramic Dada Ghar Resort Hills",
    category: "scenery",
    categoryLabel: "Sunset & Valley Views",
    image: "images/resort/optimized/DSC09130.jpg",
    description: "Panoramic overview of Dada Ghar Agro Farm Resort nestled in the lush green hills of Lele.",
  },
  {
    id: 2,
    title: "Handcrafted Hillside Timber Cottages",
    category: "resort",
    categoryLabel: "Resort & Cottages",
    image: "images/resort/optimized/DSC09148.jpg",
    description: "Traditional wooden cottages surrounded by pine forests and terraced organic farming.",
  },
  {
    id: 3,
    title: "Eco-Luxury Suite Exterior",
    category: "resort",
    categoryLabel: "Resort & Cottages",
    image: "images/resort/optimized/DSC09144.jpg",
    description: "Spacious private balcony and cottage architecture designed for supreme tranquility.",
  },
  {
    id: 4,
    title: "Pristine Organic Farmland Fields",
    category: "farm",
    categoryLabel: "Agro Farm & Harvest",
    image: "images/resort/optimized/DSC09138.jpg",
    description: "Chemical-free vegetable and fruit terraces nurtured with mountain spring water.",
  },
  {
    id: 5,
    title: "Farm-to-Table Gastronomy Experience",
    category: "dining",
    categoryLabel: "Organic Dining",
    image: "images/resort/optimized/DSC09162.jpg",
    description: "Freshly harvested ingredients prepared into hearty authentic Himalayan recipes.",
  },
  {
    id: 6,
    title: "Evening Dining & Mountain Gazebo",
    category: "dining",
    categoryLabel: "Organic Dining",
    image: "images/resort/optimized/DSC09163.jpg",
    description: "Outdoor dining terraces with breathtaking panoramic sunset and valley vistas.",
  },
  {
    id: 7,
    title: "Campfire & Stargazing Grounds",
    category: "activities",
    categoryLabel: "Farm Activities",
    image: "images/resort/optimized/DSC09152.jpg",
    description: "Evening bonfire setups for family gatherings, acoustic music, and stargazing.",
  },
  {
    id: 8,
    title: "Forest Nature & Agro Walking Trails",
    category: "activities",
    categoryLabel: "Farm Activities",
    image: "images/resort/optimized/DSC09147.jpg",
    description: "Guided morning walking paths exploring the surrounding natural sanctuary.",
  },
  {
    id: 9,
    title: "Hilltop Vista & Grand Panorama",
    category: "scenery",
    categoryLabel: "Sunset & Valley Views",
    image: "images/resort/optimized/DSC09153.jpg",
    description: "Unobstructed horizons overlooking the peaceful Lele valley.",
  },
  {
    id: 10,
    title: "Organic Harvest & Botanical Grounds",
    category: "farm",
    categoryLabel: "Agro Farm & Harvest",
    image: "images/resort/optimized/DSC09154.jpg",
    description: "Seasonal crop harvesting and agricultural learning for guests of all ages.",
  },
  {
    id: 11,
    title: "Rustic Wooden Retreat Architecture",
    category: "resort",
    categoryLabel: "Resort & Cottages",
    image: "images/resort/optimized/DSC09155.jpg",
    description: "Authentic Himalayan architecture built from local stone and seasoned timber.",
  },
  {
    id: 12,
    title: "Peaceful Family Sanctuary Grounds",
    category: "scenery",
    categoryLabel: "Sunset & Valley Views",
    image: "images/resort/optimized/ww.jpg",
    description: "Serene landscapes providing a tranquil escape from urban bustle.",
  },
  {
    id: 13,
    title: "Cozy Deluxe Accommodation",
    category: "resort",
    categoryLabel: "Resort & Cottages",
    image: "images/resort/optimized/DSC09103.jpg",
    description: "Comfortable rooms with modern amenities and warm wooden interiors.",
  }
];

export default function Gallery() {
  const { openBookingModal } = useResort();
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const filteredItems = selectedCategory === "all"
    ? galleryItems
    : galleryItems.filter((item) => item.category === selectedCategory);

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
  };

  const closeLightbox = () => {
    setLightboxIndex(null);
  };

  const nextImage = (e?: MouseEvent) => {
    e?.stopPropagation();
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex + 1) % filteredItems.length);
    }
  };

  const prevImage = (e?: MouseEvent) => {
    e?.stopPropagation();
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex - 1 + filteredItems.length) % filteredItems.length);
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return;
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowRight") nextImage();
      if (e.key === "ArrowLeft") prevImage();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxIndex, filteredItems]);

  return (
    <div className="w-full bg-[#FAF7F2] text-slate-800 pt-24 pb-20 overflow-hidden">
      
      {/* 1. HERO HEADER */}
      <section className="relative py-16 sm:py-24 bg-gradient-to-b from-[#19381F] to-[#0D2112] text-white overflow-hidden mb-12">
        <div className="relative z-10 max-w-5xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md text-amber-300 border border-white/20 text-xs font-bold uppercase tracking-widest mb-4"
          >
            <Camera className="w-4 h-4 text-amber-400" />
            <span>Visual Tour of Dada Ghar</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-6xl font-serif font-bold text-white mb-6 leading-tight"
          >
            A Glimpse into <br />
            <span className="font-display italic text-amber-300 font-normal">Our Organic Living Sanctuary</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-slate-300 max-w-2xl mx-auto text-base sm:text-lg leading-relaxed font-light"
          >
            Browse real photographs capturing the lush farmland, handcrafted wooden cottages, wholesome culinary harvests, and tranquil mountain horizons.
          </motion.p>
        </div>
      </section>

      {/* 2. CATEGORY FILTER TABS */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 ${
                  isActive
                    ? "bg-brand-forest text-amber-300 shadow-lg scale-105"
                    : "bg-white text-slate-700 hover:bg-amber-50 hover:text-brand-forest border border-gray-200"
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. MASONRY PHOTO GRID */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence>
            {filteredItems.map((item, index) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                className="group relative rounded-3xl overflow-hidden bg-slate-900 shadow-md hover:shadow-2xl transition-all duration-500 cursor-pointer h-80"
                onClick={() => openLightbox(index)}
              >
                <img
                  src={getAssetUrl(item.image)}
                  alt={item.title}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-6 flex flex-col justify-between">
                  <div className="flex justify-between items-start">
                    <span className="px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-amber-300 text-[10px] font-bold uppercase tracking-wider border border-white/20">
                      {item.categoryLabel}
                    </span>
                    <div className="w-9 h-9 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white">
                      <ZoomIn size={18} />
                    </div>
                  </div>

                  <div>
                    <h3 className="font-serif font-bold text-lg text-white mb-1 leading-snug">
                      {item.title}
                    </h3>
                    <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* 4. LIGHTBOX MODAL */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex items-center justify-center p-4 sm:p-8"
            onClick={closeLightbox}
          >
            {/* Close Button */}
            <button
              onClick={closeLightbox}
              className="absolute top-6 right-6 z-50 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition"
              aria-label="Close Lightbox"
            >
              <X size={24} />
            </button>

            {/* Left Nav */}
            <button
              onClick={prevImage}
              className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 z-50 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition"
              aria-label="Previous image"
            >
              <ChevronLeft size={28} />
            </button>

            {/* Right Nav */}
            <button
              onClick={nextImage}
              className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 z-50 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition"
              aria-label="Next image"
            >
              <ChevronRight size={28} />
            </button>

            {/* Main Lightbox Content */}
            <div
              className="max-w-5xl w-full max-h-[85vh] flex flex-col items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <motion.img
                key={filteredItems[lightboxIndex].id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                src={getAssetUrl(filteredItems[lightboxIndex].image)}
                alt={filteredItems[lightboxIndex].title}
                className="max-w-full max-h-[70vh] object-contain rounded-2xl shadow-2xl border border-white/10"
              />

              <div className="mt-4 text-center text-white max-w-2xl px-4">
                <span className="text-[11px] uppercase font-bold text-amber-400 tracking-wider">
                  {filteredItems[lightboxIndex].categoryLabel} ({lightboxIndex + 1} of {filteredItems.length})
                </span>
                <h3 className="font-serif font-bold text-xl sm:text-2xl mt-1">
                  {filteredItems[lightboxIndex].title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 mt-1 font-light">
                  {filteredItems[lightboxIndex].description}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 5. BOTTOM CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-brand-forest via-emerald-950 to-slate-950 rounded-3xl p-8 sm:p-12 text-white text-center shadow-xl">
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white mb-4">
            See It with Your Own Eyes
          </h2>
          <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto mb-8 leading-relaxed">
            Experience the calm mountain breezes, freshly harvested organic feasts, and handcrafted wooden comforts at Dada Ghar.
          </p>
          <button
            onClick={() => openBookingModal(null)}
            className="px-8 py-3.5 bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-slate-950 font-bold uppercase tracking-wider text-xs rounded-full shadow-xl transition hover:scale-105"
          >
            Book Your Mountain Retreat
          </button>
        </div>
      </section>

    </div>
  );
}
