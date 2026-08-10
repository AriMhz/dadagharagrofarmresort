import { useEffect } from "react";
import { motion } from "motion/react";
import { MapPin, Phone, Mail, Clock, Send } from "lucide-react";

export default function Contact() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="pt-24 pb-20 w-full min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-serif text-brand-forest mb-4">Contact Us</h1>
          <div className="w-24 h-1 bg-brand-sunrise mx-auto rounded-full mb-8"></div>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Have questions about booking, events, or our farm activities? We're here to help you plan your perfect nature escape.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Contact Form */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-[#F9FAFB] p-8 md:p-10 rounded-3xl shadow-lg border border-gray-100"
          >
            <h2 className="text-2xl font-serif text-brand-forest mb-8">Send Us A Message</h2>
            <form className="space-y-6" onSubmit={e => e.preventDefault()}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                  <input type="text" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-brand-leaf focus:ring-1 focus:ring-brand-leaf bg-white" placeholder="John" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                  <input type="text" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-brand-leaf focus:ring-1 focus:ring-brand-leaf bg-white" placeholder="Doe" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                <input type="email" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-brand-leaf focus:ring-1 focus:ring-brand-leaf bg-white" placeholder="john@example.com" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
                <select className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-brand-leaf focus:ring-1 focus:ring-brand-leaf bg-white appearance-none">
                  <option>Room Booking Inquiry</option>
                  <option>Event/Wedding Planning</option>
                  <option>Farm Activity Details</option>
                  <option>General Question</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                <textarea rows={4} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-brand-leaf focus:ring-1 focus:ring-brand-leaf bg-white" placeholder="How can we help you?"></textarea>
              </div>
              <button className="w-full bg-brand-forest hover:bg-brand-leaf text-white font-medium py-4 rounded-xl transition-colors flex items-center justify-center space-x-2">
                <span>Send Message</span>
                <Send size={18} />
              </button>
            </form>
          </motion.div>

          {/* Contact Info & Map */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="space-y-10"
          >
            <div>
              <h2 className="text-2xl font-serif text-brand-forest mb-6">Get In Touch</h2>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-brand-leaf/10 rounded-full flex items-center justify-center shrink-0">
                    <MapPin className="text-brand-leaf" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900 mb-1">Resort Address</h3>
                    <p className="text-gray-600">123 Nature Valley Road, Hillside District,<br />Country 12345</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-brand-sunrise/10 rounded-full flex items-center justify-center shrink-0">
                    <Phone className="text-brand-sunrise" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900 mb-1">Phone & WhatsApp</h3>
                    <p className="text-gray-600">+1 (234) 567-8900<br />+1 (234) 567-8901</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-brand-farmhouse/10 rounded-full flex items-center justify-center shrink-0">
                    <Mail className="text-brand-farmhouse" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900 mb-1">Email Us</h3>
                    <p className="text-gray-600">hello@dadagharresort.com<br />bookings@dadagharresort.com</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Map Placeholder */}
            <div className="w-full h-64 bg-gray-200 rounded-3xl overflow-hidden shadow-inner relative">
              <div className="absolute inset-0 flex items-center justify-center bg-brand-forest/5 text-brand-forest">
                 <p className="font-medium flex items-center"><MapPin className="mr-2"/> Google Maps Integration Here</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
