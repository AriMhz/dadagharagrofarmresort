import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X, Phone, Calendar, MapPin } from "lucide-react";
import { useResort } from "../context/ResortContext";
import logoImg from "../assets/logo.jpg";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "About Us", path: "/about" },
  { name: "Accommodation", path: "/rooms" },
  { name: "Photo Gallery", path: "/gallery" },
  { name: "Activities", path: "/#activities" },
  { name: "Contact", path: "/contact" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { openBookingModal, contact } = useResort();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isHome = location.pathname === "/";
  const isStaffPage = location.pathname.startsWith('/admin') || location.pathname === '/waiter' || location.pathname === '/cashier';
  
  if (isStaffPage) return null; // Staff / Admin views have their own dedicated navigation

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out ${
        isScrolled || !isHome
          ? "bg-white/95 backdrop-blur-xl shadow-lg border-b border-gray-100/80 py-2.5"
          : "bg-gradient-to-b from-black/70 via-black/30 to-transparent py-4"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          
          {/* Brand Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <img
              src={logoImg}
              alt="Dada Ghar Agro Farm Resort"
              className="w-12 h-12 sm:w-14 sm:h-14 rounded-full object-cover shadow-md border-2 border-amber-400/40 bg-white p-0.5 group-hover:scale-105 transition-transform duration-300"
            />
            <div>
              <span className={`font-serif font-bold text-xl sm:text-2xl tracking-wider block leading-none transition-colors ${
                isScrolled || !isHome ? "text-brand-forest" : "text-white drop-shadow-md"
              }`}>
                DADA GHAR
              </span>
              <span className={`text-[10px] tracking-widest uppercase font-semibold block mt-0.5 transition-colors ${
                isScrolled || !isHome ? "text-amber-700" : "text-amber-300/90 drop-shadow"
              }`}>
                Agro Farm Resort &bull; Nepal
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-7">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`text-sm font-medium tracking-wide transition-all relative py-1 ${
                    isScrolled || !isHome
                      ? isActive
                        ? "text-brand-forest font-bold"
                        : "text-slate-700 hover:text-amber-700"
                      : isActive
                        ? "text-white font-bold"
                        : "text-white/90 hover:text-amber-300"
                  }`}
                >
                  {link.name}
                  {isActive && (
                    <motion.div
                      layoutId="activeNavIndicator"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-amber-500 rounded-full"
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right Action Buttons */}
          <div className="hidden sm:flex items-center gap-4">
            <a
              href={`tel:${contact.phone.replace(/[^0-9+]/g, '')}`}
              className={`flex items-center gap-1.5 text-xs font-semibold px-3 py-2 rounded-full transition ${
                isScrolled || !isHome
                  ? "text-slate-700 hover:text-brand-forest hover:bg-slate-100"
                  : "text-white/90 hover:text-white hover:bg-white/10"
              }`}
            >
              <Phone className="w-3.5 h-3.5 text-amber-500" />
              <span>{contact.phone}</span>
            </a>

            <button
              onClick={() => openBookingModal(null)}
              className="px-6 py-2.5 bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600 hover:from-amber-500 hover:to-amber-500 text-white text-xs font-bold uppercase tracking-wider rounded-full transition-all shadow-md hover:shadow-xl hover:scale-105 active:scale-95 flex items-center gap-2 border border-amber-400/40"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Book Now</span>
            </button>
          </div>

          {/* Mobile Menu Trigger */}
          <div className="lg:hidden flex items-center gap-2">
            <button
              onClick={() => openBookingModal(null)}
              className="sm:hidden px-3.5 py-1.5 bg-amber-600 text-white text-[11px] font-bold uppercase rounded-full shadow"
            >
              Book
            </button>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`p-2 rounded-xl transition ${
                isScrolled || !isHome ? "text-brand-forest hover:bg-gray-100" : "text-white hover:bg-white/10"
              }`}
              aria-label="Toggle Navigation"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden bg-white/95 backdrop-blur-2xl shadow-2xl border-t border-gray-100 text-slate-800 overflow-hidden"
          >
            <div className="px-6 pt-4 pb-8 space-y-3">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.path;
                return (
                  <Link
                    key={link.name}
                    to={link.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`block px-4 py-2.5 text-sm font-semibold rounded-xl transition ${
                      isActive 
                        ? "bg-brand-forest text-white" 
                        : "text-slate-700 hover:bg-amber-50 hover:text-brand-forest"
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}

              <div className="pt-4 border-t border-gray-100 space-y-3">
                <div className="flex items-center gap-2 text-xs text-slate-500 px-4">
                  <MapPin className="w-4 h-4 text-amber-600" />
                  <span>{contact.address}</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-500 px-4">
                  <Phone className="w-4 h-4 text-amber-600" />
                  <span>{contact.phone}</span>
                </div>

                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    openBookingModal(null);
                  }}
                  className="w-full py-3.5 bg-gradient-to-r from-amber-600 to-amber-500 text-white font-bold text-sm uppercase tracking-wider rounded-xl shadow-lg flex items-center justify-center gap-2"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Book Your Stay</span>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
