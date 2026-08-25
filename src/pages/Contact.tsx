import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { MapPin, Phone, Mail, Clock, Send, MessageCircle, CheckCircle2, Compass, Sparkles, Navigation } from "lucide-react";
import { useResort } from "../context/ResortContext";

export default function Contact() {
  const { contact } = useResort();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [subject, setSubject] = useState("Room Booking Inquiry");
  const [message, setMessage] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => {
      setFirstName("");
      setLastName("");
      setEmail("");
      setPhone("");
      setMessage("");
    }, 500);
  };

  return (
    <div className="w-full bg-[#FAF7F2] text-slate-800 pt-24 pb-20 overflow-hidden">
      
      {/* 1. HERO HEADER */}
      <section className="relative py-16 sm:py-20 bg-gradient-to-b from-[#19381F] to-[#0D2112] text-white text-center mb-16">
        <div className="max-w-4xl mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md text-amber-300 border border-white/20 text-xs font-bold uppercase tracking-widest mb-4"
          >
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>Resort Concierge & Location</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-6xl font-serif font-bold text-white mb-4"
          >
            Get In Touch With Us
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-slate-300 text-base sm:text-lg max-w-2xl mx-auto font-light leading-relaxed"
          >
            We are here to assist with cottage reservations, organic dining inquiries, private event hosting, and transportation.
          </motion.p>
        </div>
      </section>

      {/* 2. CONTACT CONTENT GRID */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Inquiry Form */}
          <div className="lg:col-span-7 bg-white p-8 sm:p-12 rounded-3xl border border-gray-200/80 shadow-xl">
            <span className="text-xs font-bold text-amber-700 uppercase tracking-widest block mb-2">
              Send An Inquiry
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-brand-forest mb-6">
              How May We Assist Your Stay?
            </h2>

            <AnimatePresence>
              {isSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="p-8 bg-emerald-50 border border-emerald-200 rounded-2xl text-center space-y-3"
                >
                  <div className="w-12 h-12 bg-emerald-500 text-white rounded-full flex items-center justify-center mx-auto shadow-md">
                    <CheckCircle2 className="w-7 h-7" />
                  </div>
                  <h3 className="font-serif font-bold text-xl text-emerald-900">Message Received!</h3>
                  <p className="text-xs sm:text-sm text-emerald-700 max-w-md mx-auto">
                    Thank you for reaching out to Dada Ghar Agro Farm Resort. Our concierge team will reply via email or phone within 2 hours.
                  </p>
                  <button
                    onClick={() => setIsSubmitted(false)}
                    className="mt-4 px-6 py-2 bg-emerald-800 text-white text-xs font-bold uppercase rounded-full shadow"
                  >
                    Send Another Message
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                        First Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        placeholder="John"
                        className="w-full px-4 py-3 bg-[#FAF7F2] border border-gray-200 rounded-xl text-xs font-semibold focus:ring-2 focus:ring-amber-500 outline-none transition"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                        Last Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        placeholder="Doe"
                        className="w-full px-4 py-3 bg-[#FAF7F2] border border-gray-200 rounded-xl text-xs font-semibold focus:ring-2 focus:ring-amber-500 outline-none transition"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="john@example.com"
                        className="w-full px-4 py-3 bg-[#FAF7F2] border border-gray-200 rounded-xl text-xs font-semibold focus:ring-2 focus:ring-amber-500 outline-none transition"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                        Phone / WhatsApp *
                      </label>
                      <input
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+977 98..."
                        className="w-full px-4 py-3 bg-[#FAF7F2] border border-gray-200 rounded-xl text-xs font-semibold focus:ring-2 focus:ring-amber-500 outline-none transition"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      Subject / Inquiry Type *
                    </label>
                    <select
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      className="w-full px-4 py-3 bg-[#FAF7F2] border border-gray-200 rounded-xl text-xs font-semibold focus:ring-2 focus:ring-amber-500 outline-none transition"
                    >
                      <option value="Room Booking Inquiry">Room Booking & Cottage Reservation</option>
                      <option value="Agro Farm Tour & Day Package">Agro Farm Tour & Day Package</option>
                      <option value="Private Event & Wedding Venue">Private Event / Retreat / Wedding Venue</option>
                      <option value="Organic Restaurant & Dining Inquiry">Organic Restaurant & Dining Inquiry</option>
                      <option value="Airport Transfer & Transportation">Airport Transfer & Transportation</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      Your Message or Special Request *
                    </label>
                    <textarea
                      rows={4}
                      required
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Please let us know your planned stay dates, number of guests, or specific questions..."
                      className="w-full px-4 py-3 bg-[#FAF7F2] border border-gray-200 rounded-xl text-xs font-semibold focus:ring-2 focus:ring-amber-500 outline-none transition"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 bg-brand-forest hover:bg-emerald-950 text-white font-bold uppercase tracking-wider text-xs rounded-xl shadow-lg transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    <span>Send Message to Concierge</span>
                    <Send className="w-4 h-4 text-amber-400" />
                  </button>
                </form>
              )}
            </AnimatePresence>
          </div>

          {/* Contact Hub Cards */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Quick Contact Cards */}
            <div className="bg-white p-8 rounded-3xl border border-gray-200/80 shadow-md space-y-6">
              <h3 className="font-serif font-bold text-xl text-brand-forest">Direct Contact Details</h3>
              
              <div className="space-y-4 text-xs">
                <a
                  href={`tel:${contact.phone.replace(/[^0-9+]/g, '')}`}
                  className="flex items-start gap-4 p-3.5 bg-[#FAF7F2] hover:bg-amber-50/60 rounded-2xl border border-gray-200/60 transition group"
                >
                  <div className="p-2.5 bg-amber-100 text-amber-800 rounded-xl shrink-0">
                    <Phone className="w-4 h-4 text-amber-700" />
                  </div>
                  <div>
                    <span className="font-bold text-slate-900 block">Phone Support</span>
                    <span className="text-slate-600 font-mono group-hover:text-amber-800 transition">{contact.phone}</span>
                  </div>
                </a>

                <a
                  href={`https://wa.me/${contact.whatsappNumber.replace(/[^0-9]/g, '')}`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-start gap-4 p-3.5 bg-[#FAF7F2] hover:bg-emerald-50/60 rounded-2xl border border-gray-200/60 transition group"
                >
                  <div className="p-2.5 bg-emerald-100 text-emerald-800 rounded-xl shrink-0">
                    <MessageCircle className="w-4 h-4 text-emerald-700" />
                  </div>
                  <div>
                    <span className="font-bold text-slate-900 block">WhatsApp Direct Chat</span>
                    <span className="text-slate-600 font-mono group-hover:text-emerald-800 transition">+{contact.whatsappNumber}</span>
                  </div>
                </a>

                <a
                  href={`mailto:${contact.email}`}
                  className="flex items-start gap-4 p-3.5 bg-[#FAF7F2] hover:bg-blue-50/60 rounded-2xl border border-gray-200/60 transition group"
                >
                  <div className="p-2.5 bg-blue-100 text-blue-800 rounded-xl shrink-0">
                    <Mail className="w-4 h-4 text-blue-700" />
                  </div>
                  <div>
                    <span className="font-bold text-slate-900 block">Email Inquiries</span>
                    <span className="text-slate-600 group-hover:text-blue-800 transition">{contact.email}</span>
                  </div>
                </a>

                <div className="flex items-start gap-4 p-3.5 bg-[#FAF7F2] rounded-2xl border border-gray-200/60">
                  <div className="p-2.5 bg-rose-100 text-rose-800 rounded-xl shrink-0">
                    <MapPin className="w-4 h-4 text-rose-700" />
                  </div>
                  <div>
                    <span className="font-bold text-slate-900 block">Resort Location</span>
                    <span className="text-slate-600 leading-relaxed">{contact.address}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Driving Directions */}
            <div className="bg-brand-forest text-white p-8 rounded-3xl shadow-xl space-y-3">
              <div className="flex items-center gap-2 text-amber-300">
                <Navigation className="w-5 h-5" />
                <h4 className="font-serif font-bold text-lg text-white">How To Reach Us</h4>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Drive south from Satdobato, Lalitpur along the scenic Lele Highway (approx. 18 km / 45 minutes). The route passes through terraced pine hills until you reach the Dada Ghar entrance gate.
              </p>
              <span className="inline-block text-[11px] text-amber-300/90 font-mono mt-1">
                GPS Coordinates: 27.5684° N, 85.3218° E
              </span>
            </div>

          </div>

        </div>
      </div>

    </div>
  );
}
