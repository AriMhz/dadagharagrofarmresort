import { Link, useLocation } from "react-router-dom";
import { MapPin, Phone, Mail, Instagram, Facebook, Sparkles, Heart, Leaf, Shield, Award } from "lucide-react";
import { useResort } from "../context/ResortContext";
import logoImg from "../assets/logo.jpg";

export default function Footer() {
  const { contact } = useResort();
  const location = useLocation();

  const isStaffPage = location.pathname.startsWith('/admin') || location.pathname === '/waiter' || location.pathname === '/cashier';

  if (isStaffPage) return null;

  return (
    <footer className="bg-gradient-to-b from-[#19381F] via-[#0D2112] to-[#08150B] text-white pt-20 pb-10 border-t border-amber-500/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Feature Badges */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pb-16 mb-16 border-b border-white/10 text-center">
          <div className="flex flex-col items-center space-y-2">
            <div className="w-10 h-10 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center border border-amber-500/30">
              <Leaf className="w-5 h-5" />
            </div>
            <h4 className="font-serif font-bold text-sm text-white">100% Organic Farm</h4>
            <p className="text-[11px] text-slate-400">Chemical-free produce</p>
          </div>

          <div className="flex flex-col items-center space-y-2">
            <div className="w-10 h-10 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center border border-amber-500/30">
              <Shield className="w-5 h-5" />
            </div>
            <h4 className="font-serif font-bold text-sm text-white">Eco-Luxury Retreat</h4>
            <p className="text-[11px] text-slate-400">Sustainable architecture</p>
          </div>

          <div className="flex flex-col items-center space-y-2">
            <div className="w-10 h-10 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center border border-amber-500/30">
              <Award className="w-5 h-5" />
            </div>
            <h4 className="font-serif font-bold text-sm text-white">5-Star Hospitality</h4>
            <p className="text-[11px] text-slate-400">Attentive concierge</p>
          </div>

          <div className="flex flex-col items-center space-y-2">
            <div className="w-10 h-10 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center border border-amber-500/30">
              <Sparkles className="w-5 h-5" />
            </div>
            <h4 className="font-serif font-bold text-sm text-white">Peaceful Valley</h4>
            <p className="text-[11px] text-slate-400">Lele, Lalitpur, Nepal</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Brand Column */}
          <div className="space-y-5">
            <Link to="/" className="inline-block group">
              <div className="flex items-center gap-3">
                <img
                  src={logoImg}
                  alt="Dada Ghar Resort Logo"
                  className="w-14 h-14 rounded-full object-cover shadow-lg border-2 border-amber-400/40 bg-white p-0.5"
                />
                <div>
                  <span className="font-serif font-bold text-2xl tracking-wide text-white group-hover:text-amber-300 transition-colors block">
                    DADA GHAR
                  </span>
                  <span className="text-[10px] uppercase font-bold tracking-widest text-amber-400/90 block">
                    Agro Farm Resort &bull; Nepal
                  </span>
                </div>
              </div>
            </Link>
            
            <p className="text-xs text-slate-300 leading-relaxed font-light">
              Experience the pinnacle of sustainable Himalayan luxury. Handcrafted wooden cottages, 100% organic gastronomy, and revitalizing mountain peace.
            </p>

            <div className="flex space-x-3 pt-2">
              <a
                href={contact.facebookUrl}
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-amber-500 hover:text-slate-950 transition-all border border-white/15"
                title="Facebook"
              >
                <Facebook size={16} />
              </a>
              <a
                href={contact.instagramUrl}
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-amber-500 hover:text-slate-950 transition-all border border-white/15"
                title="Instagram"
              >
                <Instagram size={16} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-serif font-bold text-lg text-amber-300 mb-5">Quick Exploration</h3>
            <ul className="space-y-2.5 text-xs text-slate-300">
              <li><Link to="/about" className="hover:text-amber-300 transition-colors">Our Heritage & Story</Link></li>
              <li><Link to="/rooms" className="hover:text-amber-300 transition-colors">Cottages & Suites</Link></li>
              <li><Link to="/gallery" className="hover:text-amber-300 transition-colors">Photo & Video Gallery</Link></li>
              <li><Link to="/#activities" className="hover:text-amber-300 transition-colors">Agro Activities & Tours</Link></li>
              <li><Link to="/contact" className="hover:text-amber-300 transition-colors">Contact Concierge</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-serif font-bold text-lg text-amber-300 mb-5">Resort Location</h3>
            <ul className="space-y-3.5 text-xs text-slate-300">
              <li className="flex items-start space-x-3">
                <MapPin size={16} className="shrink-0 text-amber-400 mt-0.5" />
                <span className="leading-relaxed">{contact.address}</span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone size={16} className="shrink-0 text-amber-400" />
                <a href={`tel:${contact.phone.replace(/[^0-9+]/g, '')}`} className="hover:text-amber-300 transition-colors font-mono">
                  {contact.phone}
                </a>
              </li>
              <li className="flex items-center space-x-3">
                <Mail size={16} className="shrink-0 text-amber-400" />
                <a href={`mailto:${contact.email}`} className="hover:text-amber-300 transition-colors">
                  {contact.email}
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="font-serif font-bold text-lg text-amber-300 mb-5">Stay Inspired</h3>
            <p className="text-xs text-slate-300 mb-4 leading-relaxed font-light">
              Receive seasonal farm harvest updates, exclusive retreat offers, and organic recipe secrets.
            </p>
            <form className="space-y-2.5" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="Enter your email address"
                className="w-full px-4 py-2.5 bg-white/10 border border-white/20 rounded-xl focus:outline-none focus:border-amber-400 text-white placeholder-white/40 text-xs"
              />
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-slate-950 font-bold uppercase tracking-wider py-2.5 rounded-xl transition text-xs shadow-md"
              >
                Join Sanctuary Circle
              </button>
            </form>
          </div>

        </div>

        {/* Bottom Copyright & Terms */}
        <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row justify-between items-center text-xs text-slate-400 gap-4">
          <p>&copy; {new Date().getFullYear()} DADA GHAR Agro Farm Resort. All rights reserved.</p>
          <div className="flex space-x-6">
            <Link to="/about" className="hover:text-amber-300 transition">Privacy Policy</Link>
            <Link to="/contact" className="hover:text-amber-300 transition">Terms of Service</Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
