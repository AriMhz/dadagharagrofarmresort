import { useEffect } from "react";
import { motion } from "motion/react";
import { Leaf, Shield, HeartHandshake, Sun, Trees, Award, Users, CheckCircle2, ArrowRight, Sparkles, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import { useResort } from "../context/ResortContext";
import { getAssetUrl } from "../services/resortStore";

const milestones = [
  {
    year: "2018",
    title: "The Organic Seeds",
    description: "Started as a 5-acre family organic farm dedicated to restoring chemical-free indigenous vegetable and honey farming in Lele Valley."
  },
  {
    year: "2021",
    title: "Handcrafting The Cottages",
    description: "Constructed the first sustainable wooden cottages using local stone, pine timber, and solar energy systems."
  },
  {
    year: "2024",
    title: "Agro-Tourism Expansion",
    description: "Expanded across 50 acres with strawberry fields, outdoor organic dining terraces, and botanical nature walking trails."
  },
  {
    year: "2026",
    title: "5-Star Sustainable Sanctuary",
    description: "Recognized as Nepal's premier eco-luxury agro retreat, integrating complete modern hospitality with genuine rustic heritage."
  }
];

const team = [
  {
    name: "Mukunda Adhikari",
    role: "Founder & Agro Visionary",
    bio: "Passionate conservationist with over 20 years devoted to sustainable Himalayan farming and eco-tourism.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80"
  },
  {
    name: "Shanti Thapa",
    role: "Master Organic Horticulturist",
    bio: "Pioneering chemical-free crop rotation, organic honey beekeeping, and heirloom seed preservation.",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80"
  },
  {
    name: "Chef Khem Gurung",
    role: "Executive Farm-to-Table Chef",
    bio: "Culinary artist blending ancient Himalayan recipes with modern organic gastronomy.",
    image: "https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=400&q=80"
  }
];

export default function About() {
  const { openBookingModal } = useResort();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="w-full bg-[#FAF7F2] text-slate-800 pt-24 pb-20 overflow-hidden">
      
      {/* 1. HERO HEADER */}
      <section className="relative py-16 sm:py-24 bg-gradient-to-b from-[#19381F] to-[#0D2112] text-white overflow-hidden mb-16">
        <div className="absolute inset-0 opacity-25 pointer-events-none">
          <img
            src={getAssetUrl("images/resort/optimized/DSC09130.jpg")}
            alt="Dada Ghar Agro farm hills"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md text-amber-300 border border-white/20 text-xs font-bold uppercase tracking-widest mb-4"
          >
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>Heritage & Organic Vision</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-6xl font-serif font-bold text-white mb-6 leading-tight"
          >
            The Story Behind <br />
            <span className="font-display italic text-amber-300 font-normal">Dada Ghar Agro Farm Resort</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-slate-300 max-w-3xl mx-auto text-base sm:text-lg leading-relaxed font-light"
          >
            A sanctuary born out of profound reverence for Mother Nature—where sustainable organic agriculture meets the finest standards of boutique mountain hospitality.
          </motion.p>
        </div>
      </section>

      {/* 2. THE STORY & MISSION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          <div className="relative">
            <div className="rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
              <img
                src={getAssetUrl("images/resort/optimized/DSC09148.jpg")}
                alt="Our Pristine Agro Farmland"
                className="w-full h-[480px] object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 p-6 bg-brand-forest text-white rounded-3xl shadow-xl border-4 border-white max-w-xs hidden sm:block">
              <span className="font-serif font-bold text-2xl text-amber-400 block">50+ Acres</span>
              <span className="text-xs text-slate-300 leading-tight block mt-1">Chemical-free agro farmland dedicated to organic food security.</span>
            </div>
          </div>

          <div className="space-y-6">
            <span className="text-xs font-bold text-amber-700 uppercase tracking-widest block">
              Our Organic Genesis
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif text-brand-forest font-bold leading-tight">
              Rooted in Nature, <br />
              <span className="font-display italic text-amber-700 font-normal">Dedicated to Pure Living</span>
            </h2>
            <p className="text-slate-600 text-base leading-relaxed">
              "Dada Ghar" in Nepali translates to the ancestral hilltop home—a place of warmth, family laughter, wholesome organic food, and boundless hospitality.
            </p>
            <p className="text-slate-600 text-base leading-relaxed">
              We created this retreat to bridge the growing disconnect between modern urban lives and the natural earth. By preserving traditional terrace farming methods, harvesting rainwater, and utilizing solar power, Dada Ghar stands as a shining beacon of sustainable luxury in Nepal.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              <div className="p-5 bg-white rounded-2xl border border-gray-200/80 shadow-sm">
                <h3 className="font-serif font-bold text-base text-brand-forest mb-1.5 flex items-center gap-2">
                  <Leaf className="w-4 h-4 text-emerald-600" />
                  <span>Our Mission</span>
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Provide an authentic eco-luxury refuge that nourishes the body with 100% organic food and empowers local farming communities.
                </p>
              </div>

              <div className="p-5 bg-white rounded-2xl border border-gray-200/80 shadow-sm">
                <h3 className="font-serif font-bold text-base text-brand-forest mb-1.5 flex items-center gap-2">
                  <Sun className="w-4 h-4 text-amber-600" />
                  <span>Our Vision</span>
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  To become South Asia's leading agro-tourism destination, inspiring global consciousness towards sustainable, nature-connected living.
                </p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 3. CORE SUSTAINABILITY PILLARS */}
      <section className="py-20 bg-white border-y border-gray-100 mb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold text-amber-700 uppercase tracking-widest block mb-2">
              Our Sacred Commitments
            </span>
            <h2 className="text-3xl sm:text-5xl font-serif text-brand-forest font-bold mb-4">
              Pillars of Sustainable Luxury
            </h2>
            <p className="text-slate-600 text-base sm:text-lg">
              Every detail at Dada Ghar is harmoniously balanced between high-end guest indulgence and deep environmental stewardship.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            <div className="p-8 bg-[#FAF7F2] rounded-3xl border border-gray-200/70 shadow-sm hover:shadow-md transition">
              <div className="w-12 h-12 bg-emerald-100 text-brand-forest rounded-2xl flex items-center justify-center mb-6">
                <Leaf className="w-6 h-6 text-brand-leaf" />
              </div>
              <h3 className="font-serif font-bold text-xl text-brand-forest mb-3">100% Organic Agriculture</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                We use strictly zero synthetic pesticides or artificial fertilizers. Our soil is enriched with natural compost, organic bio-enzymes, and spring water irrigation.
              </p>
            </div>

            <div className="p-8 bg-[#FAF7F2] rounded-3xl border border-gray-200/70 shadow-sm hover:shadow-md transition">
              <div className="w-12 h-12 bg-amber-100 text-amber-800 rounded-2xl flex items-center justify-center mb-6">
                <Trees className="w-6 h-6 text-amber-600" />
              </div>
              <h3 className="font-serif font-bold text-xl text-brand-forest mb-3">Eco-Architectural Craft</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Our cottages and suites are handcrafted by local artisans using renewable pine timber, mountain stone, and terracotta finishes designed to insulate naturally.
              </p>
            </div>

            <div className="p-8 bg-[#FAF7F2] rounded-3xl border border-gray-200/70 shadow-sm hover:shadow-md transition">
              <div className="w-12 h-12 bg-purple-100 text-purple-800 rounded-2xl flex items-center justify-center mb-6">
                <HeartHandshake className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="font-serif font-bold text-xl text-brand-forest mb-3">Community Upliftment</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Over 85% of our staff and local agro suppliers are residents of Lele Valley, ensuring direct economic empowerment for local families.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* 4. MILESTONES TIMELINE */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
        <div className="text-center mb-16">
          <span className="text-xs font-bold text-amber-700 uppercase tracking-widest block mb-2">
            The Journey
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif text-brand-forest font-bold">
            Our Growth & Milestones
          </h2>
        </div>

        <div className="space-y-6">
          {milestones.map((item, idx) => (
            <div
              key={idx}
              className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-200/80 shadow-sm flex flex-col sm:flex-row items-start gap-6 hover:shadow-md transition"
            >
              <span className="px-4 py-2 bg-brand-forest text-amber-300 font-mono font-bold text-lg rounded-2xl shrink-0">
                {item.year}
              </span>
              <div>
                <h3 className="font-serif font-bold text-xl text-slate-900 mb-1">{item.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. TEAM & STEWARDS */}
      <section className="py-20 bg-white border-t border-gray-100 mb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold text-amber-700 uppercase tracking-widest block mb-2">
              The People Behind The Vision
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif text-brand-forest font-bold mb-4">
              Meet Our Farm Stewards
            </h2>
            <p className="text-slate-600 text-base">
              Passionate agriculturists, chefs, and hospitality leaders dedicated to making your stay extraordinary.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, idx) => (
              <div
                key={idx}
                className="bg-[#FAF7F2] rounded-3xl overflow-hidden border border-gray-200/80 shadow-sm flex flex-col text-center p-6"
              >
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-32 h-32 rounded-full object-cover mx-auto mb-4 border-4 border-white shadow-md"
                />
                <h3 className="font-serif font-bold text-lg text-slate-900 mb-0.5">{member.name}</h3>
                <span className="text-xs font-bold text-amber-700 uppercase tracking-wider block mb-3">{member.role}</span>
                <p className="text-xs text-slate-600 leading-relaxed">{member.bio}</p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 6. BOTTOM CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-brand-forest via-emerald-950 to-slate-950 rounded-3xl p-8 sm:p-12 text-white text-center shadow-xl">
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white mb-4">
            Experience Our Living Farm Sanctuary
          </h2>
          <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto mb-8 leading-relaxed">
            Whether for a weekend family retreat or a peaceful mountain escape, Dada Ghar welcomes you with open arms.
          </p>
          <button
            onClick={() => openBookingModal(null)}
            className="px-8 py-3.5 bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-slate-950 font-bold uppercase tracking-wider text-xs rounded-full shadow-xl transition hover:scale-105"
          >
            Reserve Your Cottage Today
          </button>
        </div>
      </section>

    </div>
  );
}
