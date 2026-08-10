import { useState, useEffect } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "motion/react";
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
  Award,
  Sparkles,
  ChevronDown,
  Quote,
  Trees,
  Camera,
  HeartHandshake,
  CheckCircle2
} from "lucide-react";
import { Link } from "react-router-dom";

interface Testimonial {
  id: number;
  name: string;
  location: string;
  role: string;
  rating: number;
  comment: string;
  avatar: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Siddharth & Ananya Sharma",
    location: "Kathmandu, Nepal",
    role: "Family Vacationers",
    rating: 5,
    comment: "Dada Ghar Agro Farm Resort exceeded all our expectations! Harvesting organic strawberries with our children and enjoying fresh farm-to-table meals made this trip unforgettable.",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
  },
  {
    id: 2,
    name: "David & Sarah Miller",
    location: "London, UK",
    role: "Nature Lovers & Hikers",
    rating: 5,
    comment: "The wooden cottages offer breathtaking views of sunrise over misty mountain ridges. The campfire under the starlit sky with local herbal tea was pure bliss.",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
  },
  {
    id: 3,
    name: "Pooja & Rohan Shrestha",
    location: "Pokhara, Nepal",
    role: "Weekend Escapists",
    rating: 5,
    comment: "Peaceful environment, incredibly warm hospitality, and 100% organic delicious food. Highly recommended for anyone seeking tranquility away from city noise.",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
  },
];

const faqs = [
  {
    question: "What is included in an agro farm stay at Dada Ghar?",
    answer: "Our farm stay packages include luxury cottage accommodation, daily organic breakfasts, guided tours of our organic vegetable and fruit farms, hands-on harvesting experiences, and access to all resort amenities.",
  },
  {
    question: "Is all food served at the resort 100% organic?",
    answer: "Yes! Over 90% of all vegetables, herbs, dairy, honey, and fruits served at our resort are cultivated directly in our chemical-free organic farms. Any supplemental ingredients are locally sourced from verified eco-farms.",
  },
  {
    question: "Can we participate in farm activities with kids?",
    answer: "Absolutely! We offer family-friendly activities including fruit picking, vegetable harvesting, pottery making, bird watching, and gentle nature trail walks suitable for all ages.",
  },
  {
    question: "How do I reach Dada Ghar Agro Farm Resort?",
    answer: "We are located just a 45-minute scenic drive from the nearest city center. Private pickup transfers and detailed directions are provided upon room reservation confirmation.",
  },
  {
    question: "Are pets allowed at the resort?",
    answer: "Yes, we are pet-friendly! We welcome your furry friends in selected designated cottage suites. Please inform us during booking so we can prepare specialized pet amenities.",
  },
];

export default function Home() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 1000], [0, 300]);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <div className="w-full bg-[#F9FAFB]">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <motion.div style={{ y }} className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1501785888041-af3ef285b470?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
            alt="Beautiful misty mountain landscape"
            className="w-full h-[120%] object-cover"
          />
          <div className="absolute inset-0 bg-black/45" />
        </motion.div>

        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto mt-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md text-brand-sunrise text-sm font-medium mb-6"
          >
            <Sparkles className="w-4 h-4 text-brand-sunrise" />
            <span>Welcome to Sanctuary of Serenity</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl sm:text-6xl lg:text-7xl font-serif text-white font-bold leading-tight mb-6"
          >
            Experience Nature <br className="hidden md:block" /> Like Never Before
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-base sm:text-xl md:text-2xl text-white/90 font-light tracking-wide mb-10 max-w-3xl mx-auto"
          >
            Luxury Farm Stay • Organic Dining • Peaceful Escape • Family Adventures
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link
              to="/rooms"
              className="px-8 py-4 bg-brand-sunrise text-white rounded-full font-medium hover:bg-orange-500 transition-all shadow-xl hover:shadow-2xl w-full sm:w-auto text-base sm:text-lg flex items-center justify-center space-x-2"
            >
              <span>Book Your Stay</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              to="/about"
              className="px-8 py-4 bg-white/20 backdrop-blur-md text-white border border-white/50 rounded-full font-medium hover:bg-white/30 transition-all w-full sm:w-auto text-base sm:text-lg"
            >
              Explore Resort
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Floating Booking Card */}
      <div className="relative z-20 max-w-5xl mx-auto px-4 -mt-16 sm:-mt-24 mb-20">
        <div className="bg-white rounded-2xl shadow-2xl p-6 md:p-8 backdrop-blur-xl bg-opacity-95 border border-gray-100">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 items-end">
            <div className="space-y-2">
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Check In</label>
              <div className="flex items-center border-b-2 border-gray-200 py-2">
                <Calendar className="text-brand-leaf mr-3 shrink-0" size={20} />
                <input type="date" className="w-full focus:outline-none bg-transparent text-gray-800 text-sm" />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Check Out</label>
              <div className="flex items-center border-b-2 border-gray-200 py-2">
                <Calendar className="text-brand-leaf mr-3 shrink-0" size={20} />
                <input type="date" className="w-full focus:outline-none bg-transparent text-gray-800 text-sm" />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Guests</label>
              <div className="flex items-center border-b-2 border-gray-200 py-2">
                <Users className="text-brand-leaf mr-3 shrink-0" size={20} />
                <select className="w-full focus:outline-none bg-transparent text-gray-800 appearance-none text-sm">
                  <option>1 Guest</option>
                  <option>2 Guests</option>
                  <option>3 Guests</option>
                  <option>4+ Guests</option>
                </select>
              </div>
            </div>
            <div>
              <button className="w-full bg-brand-forest hover:bg-brand-leaf text-white font-medium py-3.5 rounded-xl transition-all shadow-lg hover:shadow-xl text-sm sm:text-base">
                Check Availability
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Welcome Section */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-brand-sunrise font-medium tracking-widest uppercase text-xs sm:text-sm block mb-2">
              Welcome To
            </span>
            <h2 className="text-3xl sm:text-5xl font-serif text-brand-forest mb-6 leading-tight font-bold">
              DADA GHAR <br className="hidden sm:block" /> Agro Farm Resort
            </h2>
            <p className="text-gray-600 mb-6 leading-relaxed text-base sm:text-lg">
              Nestled in the heart of lush green mountain landscapes, DADA GHAR is more than just a resort—it's a return to nature. We blend premium luxury with authentic organic farming to create an unforgettable escape for families, couples, and peace-seekers.
            </p>
            <div className="space-y-4 mb-8">
              <div className="flex items-center text-gray-700">
                <div className="w-10 h-10 rounded-full bg-brand-leaf/10 flex items-center justify-center mr-4 shrink-0">
                  <Leaf className="text-brand-leaf" size={20} />
                </div>
                <span className="font-medium text-sm sm:text-base">100% Organic Lifestyle & Farm Dining</span>
              </div>
              <div className="flex items-center text-gray-700">
                <div className="w-10 h-10 rounded-full bg-brand-leaf/10 flex items-center justify-center mr-4 shrink-0">
                  <Shield className="text-brand-leaf" size={20} />
                </div>
                <span className="font-medium text-sm sm:text-base">Premium Eco-Luxury Accommodation</span>
              </div>
              <div className="flex items-center text-gray-700">
                <div className="w-10 h-10 rounded-full bg-brand-leaf/10 flex items-center justify-center mr-4 shrink-0">
                  <HeartHandshake className="text-brand-leaf" size={20} />
                </div>
                <span className="font-medium text-sm sm:text-base">Warm Nepalese Family Hospitality</span>
              </div>
            </div>
            <Link
              to="/about"
              className="inline-flex items-center font-medium text-brand-forest hover:text-brand-leaf transition-colors text-base"
            >
              <span>Discover Our Story</span>
              <ArrowRight className="ml-2" size={18} />
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl relative">
              <img
                src="https://images.unsplash.com/photo-1596436889106-be35e843f974?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
                alt="Resort Villa"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-2xl shadow-xl w-64 hidden sm:block border border-gray-100">
              <div className="flex items-center mb-2">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star key={i} className="text-brand-sunrise fill-brand-sunrise w-4 h-4" />
                ))}
              </div>
              <p className="font-serif text-sm text-brand-forest font-semibold italic">
                "A piece of heaven on earth. The perfect family getaway."
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Counter Bar Section */}
      <section className="bg-brand-forest text-white py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <span className="block text-3xl sm:text-5xl font-serif font-bold text-brand-sunrise mb-1">50+</span>
              <span className="text-xs sm:text-sm text-white/80 font-light uppercase tracking-wider">Acres Organic Farmland</span>
            </div>
            <div>
              <span className="block text-3xl sm:text-5xl font-serif font-bold text-brand-sunrise mb-1">100%</span>
              <span className="text-xs sm:text-sm text-white/80 font-light uppercase tracking-wider">Organic Food Served</span>
            </div>
            <div>
              <span className="block text-3xl sm:text-5xl font-serif font-bold text-brand-sunrise mb-1">25+</span>
              <span className="text-xs sm:text-sm text-white/80 font-light uppercase tracking-wider">Luxury Cottages</span>
            </div>
            <div>
              <span className="block text-3xl sm:text-5xl font-serif font-bold text-brand-sunrise mb-1">4.9★</span>
              <span className="text-xs sm:text-sm text-white/80 font-light uppercase tracking-wider">Guest Rating (500+ Reviews)</span>
            </div>
          </div>
        </div>
      </section>

      {/* Accommodation Preview */}
      <section className="py-20 bg-[#F0F5ED] px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-brand-sunrise font-medium tracking-widest uppercase text-xs sm:text-sm block mb-2">
              Resort Accommodation
            </span>
            <h2 className="text-3xl sm:text-5xl font-serif text-brand-forest font-bold">
              Luxury Room Types
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Room Card 1 */}
            <motion.div
              whileHover={{ y: -8 }}
              className="bg-white rounded-3xl overflow-hidden shadow-lg group flex flex-col justify-between"
            >
              <div className="relative h-64 overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1582719508461-905c673771fd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                  alt="Deluxe Cottage"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-4 py-1 rounded-full text-sm font-bold text-brand-forest">
                  $150 / night
                </div>
              </div>
              <div className="p-7 flex-grow flex flex-col justify-between">
                <div>
                  <h3 className="font-serif text-2xl text-brand-forest mb-2 font-bold">Deluxe Cottage</h3>
                  <p className="text-gray-600 mb-6 text-sm leading-relaxed">
                    Experience serene comfort with nature views, private balcony, and organic amenities.
                  </p>
                </div>
                <div className="flex items-center justify-between border-t border-gray-100 pt-5">
                  <div className="flex space-x-3 text-gray-400">
                    <Users size={18} />
                    <Coffee size={18} />
                  </div>
                  <Link to="/rooms" className="text-brand-leaf font-medium hover:text-brand-forest flex items-center text-sm">
                    <span>Book Now</span>
                    <ArrowRight size={16} className="ml-1" />
                  </Link>
                </div>
              </div>
            </motion.div>

            {/* Room Card 2 */}
            <motion.div
              whileHover={{ y: -8 }}
              className="bg-white rounded-3xl overflow-hidden shadow-lg group flex flex-col justify-between"
            >
              <div className="relative h-64 overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1566665797739-1674de7a421a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                  alt="Family Villa"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-4 py-1 rounded-full text-sm font-bold text-brand-forest">
                  $250 / night
                </div>
              </div>
              <div className="p-7 flex-grow flex flex-col justify-between">
                <div>
                  <h3 className="font-serif text-2xl text-brand-forest mb-2 font-bold">Family Villa</h3>
                  <p className="text-gray-600 mb-6 text-sm leading-relaxed">
                    Spacious living for the whole family featuring multiple bedrooms and a private garden.
                  </p>
                </div>
                <div className="flex items-center justify-between border-t border-gray-100 pt-5">
                  <div className="flex space-x-3 text-gray-400">
                    <Users size={18} />
                    <Coffee size={18} />
                  </div>
                  <Link to="/rooms" className="text-brand-leaf font-medium hover:text-brand-forest flex items-center text-sm">
                    <span>Book Now</span>
                    <ArrowRight size={16} className="ml-1" />
                  </Link>
                </div>
              </div>
            </motion.div>

            {/* Room Card 3 */}
            <motion.div
              whileHover={{ y: -8 }}
              className="bg-white rounded-3xl overflow-hidden shadow-lg group flex flex-col justify-between"
            >
              <div className="relative h-64 overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1542314831-c6a4d14faaf2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                  alt="Farm House Suite"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-4 py-1 rounded-full text-sm font-bold text-brand-forest">
                  $350 / night
                </div>
              </div>
              <div className="p-7 flex-grow flex flex-col justify-between">
                <div>
                  <h3 className="font-serif text-2xl text-brand-forest mb-2 font-bold">Farm House Suite</h3>
                  <p className="text-gray-600 mb-6 text-sm leading-relaxed">
                    The ultimate luxury experience blending rustic charm with modern premium amenities.
                  </p>
                </div>
                <div className="flex items-center justify-between border-t border-gray-100 pt-5">
                  <div className="flex space-x-3 text-gray-400">
                    <Users size={18} />
                    <Coffee size={18} />
                  </div>
                  <Link to="/rooms" className="text-brand-leaf font-medium hover:text-brand-forest flex items-center text-sm">
                    <span>Book Now</span>
                    <ArrowRight size={16} className="ml-1" />
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>

          <div className="text-center mt-12">
            <Link
              to="/rooms"
              className="inline-block border-2 border-brand-forest text-brand-forest hover:bg-brand-forest hover:text-white px-8 py-3 rounded-full font-medium transition-colors"
            >
              View All Rooms & Pricing
            </Link>
          </div>
        </div>
      </section>

      {/* Farm Activities & Experiences Section */}
      <section id="activities" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-brand-sunrise font-medium tracking-widest uppercase text-xs sm:text-sm block mb-2">
            Immersive Experiences
          </span>
          <h2 className="text-3xl sm:text-5xl font-serif text-brand-forest font-bold mb-4">
            Unforgettable Agro Farm Activities
          </h2>
          <p className="max-w-2xl mx-auto text-gray-600 text-base sm:text-lg">
            Reconnect with nature through engaging hands-on outdoor activities designed for guests of all ages.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 text-center flex flex-col items-center">
            <div className="w-16 h-16 rounded-2xl bg-brand-leaf/10 flex items-center justify-center text-brand-leaf mb-6">
              <Trees size={32} />
            </div>
            <h3 className="text-xl font-serif font-bold text-brand-forest mb-3">Organic Harvest Walk</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Pick your own fresh strawberries, seasonal vegetables, and wild herbs straight from our pesticide-free gardens.
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 text-center flex flex-col items-center">
            <div className="w-16 h-16 rounded-2xl bg-brand-leaf/10 flex items-center justify-center text-brand-leaf mb-6">
              <Utensils size={32} />
            </div>
            <h3 className="text-xl font-serif font-bold text-brand-forest mb-3">Farm Cooking Classes</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Learn traditional Nepalese culinary secrets using freshly harvested organic ingredients with our head chef.
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 text-center flex flex-col items-center">
            <div className="w-16 h-16 rounded-2xl bg-brand-leaf/10 flex items-center justify-center text-brand-leaf mb-6">
              <Flame size={32} />
            </div>
            <h3 className="text-xl font-serif font-bold text-brand-forest mb-3">Starlit Campfire</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Gather around cozy evening bonfires with live acoustic acoustic songs, roasted marsh-mallows, and hot herbal teas.
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 text-center flex flex-col items-center">
            <div className="w-16 h-16 rounded-2xl bg-brand-leaf/10 flex items-center justify-center text-brand-leaf mb-6">
              <Sun size={32} />
            </div>
            <h3 className="text-xl font-serif font-bold text-brand-forest mb-3">Sunrise Yoga & Meditation</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Rejuvenate your body and mind with guided morning yoga sessions overlooking peaceful fog-covered mountain valleys.
            </p>
          </div>
        </div>
      </section>

      {/* Organic Dining Spotlight Section */}
      <section id="dining" className="py-20 bg-brand-forest text-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="relative">
              <div className="aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
                  alt="Organic Dining Experience"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -top-6 -right-6 bg-brand-sunrise text-white p-4 sm:p-6 rounded-2xl shadow-lg font-serif font-bold text-center">
                <span className="block text-2xl sm:text-3xl">100%</span>
                <span className="text-xs uppercase tracking-wider font-sans">Organic & Fresh</span>
              </div>
            </div>

            <div>
              <span className="text-brand-sunrise font-medium tracking-widest uppercase text-xs sm:text-sm block mb-2">
                Pure & Wholesome
              </span>
              <h2 className="text-3xl sm:text-5xl font-serif font-bold text-white mb-6 leading-tight">
                Farm-to-Table Organic Dining
              </h2>
              <p className="text-white/80 text-base sm:text-lg mb-8 leading-relaxed font-light">
                Indulge in authentic recipes crafted from vegetables, fruits, and herbs harvested on the exact day you dine. We believe real flavor comes from zero chemicals, rich soil, and loving preparation.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                <div className="flex items-start space-x-3">
                  <CheckCircle2 className="text-brand-sunrise shrink-0 mt-1" size={20} />
                  <span className="text-sm text-white/90">Daily Fresh Organic Harvest</span>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle2 className="text-brand-sunrise shrink-0 mt-1" size={20} />
                  <span className="text-sm text-white/90">Traditional & Global Cuisine</span>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle2 className="text-brand-sunrise shrink-0 mt-1" size={20} />
                  <span className="text-sm text-white/90">Open-Air Garden Dining</span>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle2 className="text-brand-sunrise shrink-0 mt-1" size={20} />
                  <span className="text-sm text-white/90">Artisan Herbal Teas & Juices</span>
                </div>
              </div>

              <Link
                to="/contact"
                className="inline-flex items-center px-8 py-4 bg-brand-sunrise hover:bg-orange-500 text-white rounded-full font-medium transition-colors shadow-lg"
              >
                <span>Reserve A Table</span>
                <ArrowRight className="ml-2" size={18} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Mini Photo Gallery Highlights Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-12">
          <div>
            <span className="text-brand-sunrise font-medium tracking-widest uppercase text-xs sm:text-sm block mb-2">
              Visual Highlights
            </span>
            <h2 className="text-3xl sm:text-5xl font-serif text-brand-forest font-bold">
              Moments at Dada Ghar
            </h2>
          </div>
          <Link
            to="/gallery"
            className="mt-4 sm:mt-0 inline-flex items-center text-brand-forest hover:text-brand-leaf font-medium text-base transition-colors"
          >
            <Camera className="w-5 h-5 mr-2 text-brand-leaf" />
            <span>Explore Full Gallery</span>
            <ArrowRight className="w-4 h-4 ml-1.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="relative h-64 rounded-2xl overflow-hidden shadow-md group">
            <img
              src="https://images.unsplash.com/photo-1590490360182-c33d57733427?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
              alt="Wooden Villa"
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors" />
            <span className="absolute bottom-4 left-4 text-white font-serif font-semibold text-lg">
              Luxury Cottages
            </span>
          </div>

          <div className="relative h-64 rounded-2xl overflow-hidden shadow-md group">
            <img
              src="https://images.unsplash.com/photo-1595855759920-86582396756a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
              alt="Organic Farm Harvest"
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors" />
            <span className="absolute bottom-4 left-4 text-white font-serif font-semibold text-lg">
              Organic Harvest
            </span>
          </div>

          <div className="relative h-64 rounded-2xl overflow-hidden shadow-md group">
            <img
              src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
              alt="Local Nepali Feast"
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors" />
            <span className="absolute bottom-4 left-4 text-white font-serif font-semibold text-lg">
              Artisan Dining
            </span>
          </div>

          <div className="relative h-64 rounded-2xl overflow-hidden shadow-md group">
            <img
              src="https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
              alt="Campfire Night"
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors" />
            <span className="absolute bottom-4 left-4 text-white font-serif font-semibold text-lg">
              Campfire Nights
            </span>
          </div>
        </div>
      </section>

      {/* Guest Reviews / Testimonials Section */}
      <section className="py-20 bg-[#F0F5ED] px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-brand-sunrise font-medium tracking-widest uppercase text-xs sm:text-sm block mb-2">
              Guest Experience
            </span>
            <h2 className="text-3xl sm:text-5xl font-serif text-brand-forest font-bold">
              What Our Visitors Say
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((item) => (
              <div
                key={item.id}
                className="bg-white p-8 rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col justify-between relative"
              >
                <Quote className="w-10 h-10 text-brand-leaf/20 absolute top-6 right-6" />
                <div>
                  <div className="flex space-x-1 mb-4">
                    {[...Array(item.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-brand-sunrise fill-brand-sunrise" />
                    ))}
                  </div>
                  <p className="text-gray-700 italic text-sm sm:text-base leading-relaxed mb-6">
                    "{item.comment}"
                  </p>
                </div>
                <div className="flex items-center space-x-4 pt-4 border-t border-gray-100">
                  <img
                    src={item.avatar}
                    alt={item.name}
                    className="w-12 h-12 rounded-full object-cover border-2 border-brand-leaf"
                  />
                  <div>
                    <h4 className="font-serif font-bold text-gray-900 text-base">{item.name}</h4>
                    <span className="text-xs text-gray-500 block">{item.location} • {item.role}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Accordion Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <div className="text-center mb-14">
          <span className="text-brand-sunrise font-medium tracking-widest uppercase text-xs sm:text-sm block mb-2">
            Got Questions?
          </span>
          <h2 className="text-3xl sm:text-5xl font-serif text-brand-forest font-bold">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openFaq === index;
            return (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden transition-all duration-300"
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full px-6 py-5 text-left flex justify-between items-center space-x-4 focus:outline-none"
                >
                  <span className="font-serif font-bold text-base sm:text-lg text-brand-forest">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-brand-leaf shrink-0 transition-transform duration-300 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="px-6 pb-5 text-sm sm:text-base text-gray-600 leading-relaxed border-t border-gray-50 pt-3">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1464226184884-fa280b87c399?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
            alt="Farm fields"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-brand-forest/85 mix-blend-multiply" />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto text-center px-4">
          <h2 className="text-3xl sm:text-5xl font-serif text-white font-bold mb-6">
            Ready for an Unforgettable Escape?
          </h2>
          <p className="text-white/85 text-base sm:text-lg mb-10 max-w-2xl mx-auto font-light leading-relaxed">
            Book your stay today and immerse yourself in the tranquility of nature, organic living, and premium comfort at DADA GHAR.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              to="/rooms"
              className="inline-block bg-brand-sunrise hover:bg-orange-500 text-white px-9 py-4 rounded-full font-medium text-base sm:text-lg transition-colors shadow-xl"
            >
              Book Accommodation
            </Link>
            <Link
              to="/contact"
              className="inline-block bg-white/20 hover:bg-white/30 text-white border border-white/40 px-9 py-4 rounded-full font-medium text-base sm:text-lg transition-colors"
            >
              Contact Us Today
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
