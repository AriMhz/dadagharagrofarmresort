import { Link } from "react-router-dom";
import { MapPin, Phone, Mail, Instagram, Facebook, Twitter } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-brand-forest text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="space-y-6">
            <Link to="/" className="inline-block">
              <span className="font-serif font-bold text-3xl tracking-wide text-brand-sunrise">
                DADA GHAR
              </span>
              <span className="block text-sm opacity-80 mt-1">Agro Farm Resort</span>
            </Link>
            <p className="text-sm opacity-80 leading-relaxed">
              Experience nature like never before. A premium luxury agro farm resort offering organic dining, peaceful escapes, and family adventures.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-brand-sunrise transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-brand-sunrise transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-brand-sunrise transition-colors">
                <Twitter size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-serif text-xl mb-6">Quick Links</h3>
            <ul className="space-y-3 text-sm opacity-80">
              <li><Link to="/about" className="hover:text-brand-sunrise transition-colors">About Us</Link></li>
              <li><Link to="/rooms" className="hover:text-brand-sunrise transition-colors">Accommodation</Link></li>
              <li><Link to="/gallery" className="hover:text-brand-sunrise transition-colors">Photo Gallery</Link></li>
              <li><Link to="/#activities" className="hover:text-brand-sunrise transition-colors">Farm Activities</Link></li>
              <li><Link to="/#dining" className="hover:text-brand-sunrise transition-colors">Organic Dining</Link></li>
              <li><Link to="/contact" className="hover:text-brand-sunrise transition-colors">Contact Us</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-serif text-xl mb-6">Contact Us</h3>
            <ul className="space-y-4 text-sm opacity-80">
              <li className="flex items-start space-x-3">
                <MapPin size={20} className="shrink-0 text-brand-sunrise" />
                <span>123 Nature Valley Road, Hillside District, Country 12345</span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone size={20} className="shrink-0 text-brand-sunrise" />
                <span>+1 (234) 567-8900</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail size={20} className="shrink-0 text-brand-sunrise" />
                <span>hello@dadagharresort.com</span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="font-serif text-xl mb-6">Newsletter</h3>
            <p className="text-sm opacity-80 mb-4">
              Subscribe to get special offers, free giveaways, and once-in-a-lifetime deals.
            </p>
            <form className="space-y-3" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-md focus:outline-none focus:border-brand-sunrise text-white placeholder-white/50"
              />
              <button
                type="submit"
                className="w-full bg-brand-sunrise hover:bg-orange-500 text-white font-medium py-3 rounded-md transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <div className="border-t border-white/20 pt-8 flex flex-col md:flex-row justify-between items-center text-sm opacity-70">
          <p>&copy; {new Date().getFullYear()} DADA GHAR Agro Farm Resort. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link to="#" className="hover:text-white">Privacy Policy</Link>
            <Link to="#" className="hover:text-white">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
