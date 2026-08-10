import { useState, useEffect, MouseEvent } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, ChevronLeft, ChevronRight, ZoomIn, Camera, Instagram, ArrowRight, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

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
    description: "Peaceful morning fog descending gracefully over our green estate.",
  },
  {
    id: 11,
    title: "Private Balcony Overlook",
    category: "resort",
    categoryLabel: "Resort & Cottages",
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    description: "Wake up to bird songs and fresh mountain air on your private sun deck.",
  },
  {
    id: 12,
    title: "Honey & Herbal Apiary",
    category: "farm",
    categoryLabel: "Agro Farm & Harvest",
    image: "https://images.unsplash.com/photo-1587049352846-4a222e784d38?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    description: "Pure wild honey harvested directly from resort bee hives.",
  },
];

export default function Gallery() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [activeImageIndex, setActiveImageIndex] = useState<number | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const filteredItems = selectedCategory === "all"
    ? galleryItems
    : galleryItems.filter((item) => item.category === selectedCategory);

  const openLightbox = (index: number) => {
    setActiveImageIndex(index);
  };

  const closeLightbox = () => {
    setActiveImageIndex(null);
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
    <div className="w-full bg-[#F9FAFB] min-h-screen">
      {/* Hero Banner */}
      <section className="relative pt-28 sm:pt-36 pb-16 sm:pb-24 bg-brand-forest text-white overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-25">
          <img
            src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
            alt="Resort background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-brand-forest/60 via-brand-forest/40 to-brand-forest" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md text-brand-sunrise text-xs sm:text-sm font-medium mb-4 sm:mb-6 border border-white/10">
              <Camera className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <span>Visual Journey</span>
            </span>
            <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-bold text-white mb-4 tracking-tight">
              Resort Gallery
            </h1>
            <p className="max-w-2xl mx-auto text-sm sm:text-base md:text-lg text-white/85 font-light leading-relaxed px-2">
              Explore the serene beauty, organic harvests, luxury accommodations, and unforgettable moments at Dada Ghar Agro Farm Resort.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filter Tabs - Horizontal Scroll on Mobile, Wrapped on Desktop */}
      <section className="py-6 sm:py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex overflow-x-auto sm:flex-wrap justify-start sm:justify-center gap-2.5 sm:gap-3 pb-2 sm:pb-0 scrollbar-none snap-x">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`snap-start whitespace-nowrap px-4 sm:px-6 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 ${
                  isActive
                    ? "bg-brand-leaf text-white shadow-md scale-105"
                    : "bg-white text-gray-700 hover:bg-gray-100 hover:text-brand-forest shadow-sm border border-gray-100"
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>
      </section>

      {/* Gallery Grid - Responsive Columns (1 on mobile, 2 on tablet, 3 on desktop, 4 on XL screens) */}
      <section className="pb-16 sm:pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8"
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
                className="group relative bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 cursor-pointer border border-gray-100/80 flex flex-col"
                onClick={() => openLightbox(index)}
              >
                <div className="relative h-60 sm:h-64 md:h-72 w-full overflow-hidden bg-gray-100">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4 sm:p-5 text-white">
                    <span className="text-[10px] sm:text-xs uppercase tracking-wider font-semibold text-brand-sunrise mb-1">
                      {item.categoryLabel}
                    </span>
                    <h3 className="text-base sm:text-lg font-serif font-bold text-white mb-1.5 leading-snug">
                      {item.title}
                    </h3>
                    <p className="text-xs text-white/80 line-clamp-2 mb-2 font-light">
                      {item.description}
                    </p>
                    <div className="inline-flex items-center space-x-1.5 text-xs font-medium text-brand-sunrise">
                      <ZoomIn className="w-3.5 h-3.5" />
                      <span>Tap to expand</span>
                    </div>
                  </div>
                </div>

                <div className="p-4 sm:p-5 flex justify-between items-center group-hover:bg-brand-forest transition-colors duration-300 mt-auto">
                  <div className="pr-2">
                    <span className="text-[11px] text-brand-leaf group-hover:text-brand-sunrise transition-colors font-medium block mb-0.5">
                      {item.categoryLabel}
                    </span>
                    <h4 className="font-serif font-bold text-gray-800 group-hover:text-white transition-colors text-sm sm:text-base leading-snug line-clamp-1">
                      {item.title}
                    </h4>
                  </div>
                  <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-gray-100 group-hover:bg-white/20 flex items-center justify-center transition-colors shrink-0">
                    <ZoomIn className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-600 group-hover:text-white" />
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </section>

      {/* Fully Responsive Lightbox Modal */}
      <AnimatePresence>
        {activeImageIndex !== null && filteredItems[activeImageIndex] && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 md:p-10"
            onClick={closeLightbox}
          >
            {/* Top Bar Controls */}
            <div className="absolute top-4 sm:top-6 left-4 sm:left-6 right-4 sm:right-6 flex justify-between items-center z-20 text-white">
              <div className="flex items-center space-x-2 sm:space-x-3">
                <span className="text-xs font-semibold px-2.5 py-1 bg-white/20 rounded-full backdrop-blur-sm">
                  {activeImageIndex + 1} / {filteredItems.length}
                </span>
                <span className="text-xs sm:text-sm font-medium hidden xs:inline-block text-brand-sunrise">
                  {filteredItems[activeImageIndex].categoryLabel}
                </span>
              </div>

              <button
                onClick={closeLightbox}
                className="w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-white/10 hover:bg-white/20 active:scale-95 flex items-center justify-center text-white transition-all focus:outline-none"
                aria-label="Close modal"
              >
                <X className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>
            </div>

            {/* Prev Button */}
            <button
              onClick={showPrevImage}
              className="absolute left-2 sm:left-6 z-20 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/10 hover:bg-white/25 active:scale-95 flex items-center justify-center text-white transition-all focus:outline-none backdrop-blur-sm"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-6 h-6 sm:w-7 sm:h-7" />
            </button>

            {/* Main Image Container */}
            <div
              className="relative w-full max-w-5xl max-h-[85vh] flex flex-col items-center justify-center px-2"
              onClick={(e) => e.stopPropagation()}
            >
              <motion.img
                key={filteredItems[activeImageIndex].id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.25 }}
                src={filteredItems[activeImageIndex].image}
                alt={filteredItems[activeImageIndex].title}
                className="max-w-full max-h-[58vh] sm:max-h-[68vh] md:max-h-[74vh] object-contain rounded-xl shadow-2xl"
              />

              <div className="mt-3 sm:mt-4 text-center text-white max-w-2xl px-2 sm:px-4">
                <h3 className="text-lg sm:text-2xl font-serif font-bold text-brand-sunrise mb-1">
                  {filteredItems[activeImageIndex].title}
                </h3>
                <p className="text-xs sm:text-sm text-gray-300 font-light leading-relaxed">
                  {filteredItems[activeImageIndex].description}
                </p>
              </div>
            </div>

            {/* Next Button */}
            <button
              onClick={showNextImage}
              className="absolute right-2 sm:right-6 z-20 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/10 hover:bg-white/25 active:scale-95 flex items-center justify-center text-white transition-all focus:outline-none backdrop-blur-sm"
              aria-label="Next image"
            >
              <ChevronRight className="w-6 h-6 sm:w-7 sm:h-7" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* CTA Section */}
      <section className="bg-brand-forest text-white py-12 sm:py-16 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <Sparkles className="w-8 h-8 sm:w-10 sm:h-10 mx-auto text-brand-sunrise mb-3 sm:mb-4" />
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-serif font-bold mb-4 sm:mb-6 text-white leading-tight">
            Ready to Experience It Yourself?
          </h2>
          <p className="max-w-2xl mx-auto text-xs sm:text-base md:text-lg opacity-85 mb-6 sm:mb-8 font-light leading-relaxed">
            Book your luxurious cottage room today or drop us a message for special group retreats and family packages.
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-3 sm:gap-4 max-w-md sm:max-w-none mx-auto">
            <Link
              to="/rooms"
              className="w-full sm:w-auto px-6 sm:px-8 py-3.5 sm:py-4 bg-brand-sunrise hover:bg-orange-500 text-white rounded-full font-medium transition-all shadow-lg hover:shadow-xl flex items-center justify-center space-x-2 text-sm sm:text-base"
            >
              <span>Book Accommodation</span>
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
            </Link>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-6 sm:px-8 py-3.5 sm:py-4 bg-white/10 hover:bg-white/20 text-white border border-white/30 rounded-full font-medium transition-colors flex items-center justify-center space-x-2 text-sm sm:text-base"
            >
              <Instagram className="w-4 h-4 sm:w-5 sm:h-5" />
              <span>Follow Us on Instagram</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
