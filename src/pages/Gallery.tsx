import { useState, useEffect, MouseEvent } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, ChevronLeft, ChevronRight, ZoomIn, Camera, Instagram, ArrowRight, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { useResort } from "../context/ResortContext";

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
  { id: "scenery", label: "Sunset & Views" },
];

const galleryItems: GalleryItem[] = [
  {
    id: 1,
    title: "Luxury Wooden Villa",
    category: "resort",
    categoryLabel: "Resort & Cottages",
    image: "https://images.unsplash.com/photo-1590490360182-c33d57733427?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    description: "Spacious wooden villa with panoramic views of the hills and lush greenery.",
  },
  {
    id: 2,
    title: "Fresh Organic Vegetables",
    category: "farm",
    categoryLabel: "Agro Farm & Harvest",
    image: "https://images.unsplash.com/photo-1595855759920-86582396756a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    description: "Daily harvest of chemical-free vegetables straight from our organic farm fields.",
  },
  {
    id: 3,
    title: "Farm-to-Table Breakfast",
    category: "dining",
    categoryLabel: "Organic Dining",
    image: "https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    description: "Wholesome organic breakfast served outdoors with panoramic valley views.",
  },
  {
    id: 4,
    title: "Guided Nature & Farm Walk",
    category: "activities",
    categoryLabel: "Farm Activities",
    image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    description: "Morning guided walk through the surrounding forests and terraced farming fields.",
  },
  {
    id: 5,
    title: "Golden Hour Mountain Sunset",
    category: "scenery",
    categoryLabel: "Sunset & Views",
    image: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    description: "Breathtaking sunset backdrop overlooking misty mountain ridges.",
  },
  {
    id: 6,
    title: "Cozy Family Suite Interior",
    category: "resort",
    categoryLabel: "Resort & Cottages",
    image: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    description: "Elegantly furnished suite crafted with sustainable local bamboo and timber.",
  },
  {
    id: 7,
    title: "Strawberry Farming Fields",
    category: "farm",
    categoryLabel: "Agro Farm & Harvest",
    image: "https://images.unsplash.com/photo-1464226184884-fa280b87c399?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    description: "Juicy organic strawberries grown in high altitude climate without artificial pesticides.",
  },
  {
    id: 8,
    title: "Traditional Nepali Feast",
    category: "dining",
    categoryLabel: "Organic Dining",
    image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    description: "Authentic local delicacies prepared by experienced home-style resort chefs.",
  },
  {
    id: 9,
    title: "Evening Campfire & Acoustic Music",
    category: "activities",
    categoryLabel: "Farm Activities",
    image: "https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    description: "Cozy starlit bonfires with acoustic sessions and warm herbal teas.",
  },
  {
    id: 10,
    title: "Misty Morning Over Resort",
    category: "scenery",
    categoryLabel: "Sunset & Views",
    image: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    description: "Peaceful morning mist rolling over the hills surrounding Dada Ghar.",
  },
  {
    id: 11,
    title: "Terrace Garden Cottages",
    category: "resort",
    categoryLabel: "Resort & Cottages",
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    description: "Private hillside cottages with spacious sundecks and panoramic vistas.",
  },
  {
    id: 12,
    title: "Beekeeping & Wild Honey",
    category: "farm",
    categoryLabel: "Agro Farm & Harvest",
    image: "https://images.unsplash.com/photo-1587049352846-4a222e784d38?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    description: "Pure raw mountain honey harvested from our natural apiaries.",
  },
];

export default function Gallery() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [activeImageIndex, setActiveImageIndex] = useState<number | null>(null);
  const { openBookingModal } = useResort();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const filteredItems = galleryItems.filter((item) => {
    if (selectedCategory === "all") return true;
    return item.category === selectedCategory;
  });

  const openLightbox = (index: number) => {
    setActiveImageIndex(index);
    document.body.style.overflow = "hidden";
  };

  const closeLightbox = () => {
    setActiveImageIndex(null);
    document.body.style.overflow = "auto";
  };

  const showNextImage = (e?: MouseEvent) => {
    e?.stopPropagation();
    if (activeImageIndex !== null) {
      setActiveImageIndex((prev) => (prev! + 1) % filteredItems.length);
    }
  };

  const showPrevImage = (e?: MouseEvent) => {
    e?.stopPropagation();
    if (activeImageIndex !== null) {
      setActiveImageIndex((prev) => (prev! - 1 + filteredItems.length) % filteredItems.length);
    }
  };

  // Keyboard navigation for lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (activeImageIndex === null) return;
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowRight") showNextImage();
      if (e.key === "ArrowLeft") showPrevImage();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeImageIndex, filteredItems.length]);

  return (
    <div className="w-full bg-[#FAF7F2] min-h-screen pt-24 pb-20 overflow-hidden">
      
      {/* Hero Banner */}
      <section className="relative py-16 sm:py-20 bg-gradient-to-b from-[#19381F] to-[#0D2112] text-white text-center mb-12">
        <div className="relative z-10 max-w-4xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md text-amber-300 border border-white/20 text-xs font-bold uppercase tracking-widest mb-4"
          >
            <Camera className="w-4 h-4 text-amber-400" />
            <span>Visual Story & Photo Tour</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-6xl font-serif font-bold text-white mb-4"
          >
            Moments at Dada Ghar
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-slate-300 text-base sm:text-lg max-w-2xl mx-auto font-light leading-relaxed"
          >
            Explore our handcrafted wooden cottages, organic farm harvests, Himalayan mountain vistas, and starlit gatherings.
          </motion.p>
        </div>
      </section>

      {/* Filter Tabs */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="flex items-center justify-center flex-wrap gap-2.5">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 ${
                  isActive
                    ? "bg-brand-forest text-amber-300 shadow-lg scale-105 border border-amber-400/30"
                    : "bg-white text-slate-700 hover:bg-amber-50 hover:text-brand-forest border border-gray-200"
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          <AnimatePresence>
            {filteredItems.map((item, index) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.35 }}
                className="group relative bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 cursor-pointer border border-gray-200/80 flex flex-col"
                onClick={() => openLightbox(index)}
              >
                <div className="relative h-64 sm:h-72 w-full overflow-hidden bg-gray-100">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5 text-white">
                    <span className="text-[10px] font-bold text-amber-300 uppercase tracking-wider mb-1">
                      {item.categoryLabel}
                    </span>
                    <h3 className="font-serif font-bold text-lg leading-tight mb-1 text-white">
                      {item.title}
                    </h3>
                    <p className="text-xs text-white/90 line-clamp-2">
                      {item.description}
                    </p>
                    <div className="mt-3 flex items-center gap-1.5 text-xs text-amber-300 font-semibold">
                      <ZoomIn className="w-4 h-4" />
                      <span>Click to view full photo</span>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-white flex items-center justify-between">
                  <div>
                    <h4 className="font-serif font-bold text-sm text-brand-forest">{item.title}</h4>
                    <span className="text-[11px] text-slate-500">{item.categoryLabel}</span>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-amber-50 text-amber-700 flex items-center justify-center group-hover:bg-brand-forest group-hover:text-amber-300 transition">
                    <ZoomIn className="w-4 h-4" />
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </section>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {activeImageIndex !== null && filteredItems[activeImageIndex] && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeLightbox}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex items-center justify-center p-4 sm:p-6"
          >
            {/* Close Button */}
            <button
              onClick={closeLightbox}
              className="absolute top-6 right-6 z-50 p-3 bg-white/10 hover:bg-white/20 text-white rounded-full transition shadow-lg"
              title="Close (Esc)"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Prev Button */}
            <button
              onClick={showPrevImage}
              className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 z-50 p-3.5 bg-white/10 hover:bg-white/25 text-white rounded-full transition shadow-lg"
              title="Previous (Arrow Left)"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Next Button */}
            <button
              onClick={showNextImage}
              className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 z-50 p-3.5 bg-white/10 hover:bg-white/25 text-white rounded-full transition shadow-lg"
              title="Next (Arrow Right)"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Active Image Box */}
            <div
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-5xl w-full max-h-[85vh] flex flex-col items-center justify-center"
            >
              <img
                src={filteredItems[activeImageIndex].image}
                alt={filteredItems[activeImageIndex].title}
                className="max-h-[70vh] w-auto max-w-full object-contain rounded-2xl shadow-2xl"
              />
              
              <div className="mt-4 text-center text-white max-w-2xl px-4">
                <span className="text-xs font-bold text-amber-400 uppercase tracking-widest block mb-1">
                  {filteredItems[activeImageIndex].categoryLabel} ({activeImageIndex + 1} / {filteredItems.length})
                </span>
                <h3 className="font-serif font-bold text-xl sm:text-2xl mb-1">
                  {filteredItems[activeImageIndex].title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-light">
                  {filteredItems[activeImageIndex].description}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bottom Booking Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-brand-forest via-emerald-950 to-slate-950 rounded-3xl p-8 sm:p-12 text-white text-center shadow-xl">
          <h2 className="text-3xl sm:text-4xl font-serif font-bold mb-4">Want To Experience This In Person?</h2>
          <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto mb-8 leading-relaxed">
            Reserve your stay now to immerse in nature, taste farm-fresh organic dining, and unwind in handcrafted luxury.
          </p>
          <button
            onClick={() => openBookingModal(null)}
            className="px-8 py-3.5 bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-slate-950 font-bold uppercase tracking-wider text-xs rounded-full shadow-xl transition hover:scale-105"
          >
            Book Your Getaway Today
          </button>
        </div>
      </section>

    </div>
  );
}
