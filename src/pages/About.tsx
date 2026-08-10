import { useEffect } from "react";
import { motion } from "motion/react";

export default function About() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="pt-24 pb-20 w-full min-h-screen">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-serif text-brand-forest mb-4">About DADA GHAR</h1>
          <div className="w-24 h-1 bg-brand-sunrise mx-auto rounded-full mb-8"></div>
          <p className="text-gray-600 max-w-3xl mx-auto text-lg">
            A vision of sustainable luxury and organic living, nestled in the heart of pristine nature.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center mb-24">
          <div>
            <img 
              src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" 
              alt="Our Farm" 
              className="rounded-3xl shadow-2xl object-cover h-[500px] w-full"
            />
          </div>
          <div className="space-y-6">
            <h2 className="text-3xl font-serif text-brand-forest">Our Story</h2>
            <p className="text-gray-600 leading-relaxed">
              DADA GHAR was born out of a desire to reconnect with nature without compromising on comfort. What started as a small family farm has blossomed into a premium luxury resort where guests can experience the authentic rhythms of rural life.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Every element of our resort, from the organic farm-to-table dining to the carefully designed eco-friendly accommodations, reflects our commitment to sustainability, local community empowerment, and creating a peaceful sanctuary for our guests.
            </p>
            
            <div className="grid grid-cols-2 gap-6 pt-6">
              <div className="bg-white p-6 rounded-2xl shadow-md border-t-4 border-brand-leaf">
                <h3 className="font-serif text-xl text-brand-forest mb-2">Our Mission</h3>
                <p className="text-sm text-gray-500">To provide a luxurious, eco-friendly retreat that promotes organic living and environmental stewardship.</p>
              </div>
              <div className="bg-white p-6 rounded-2xl shadow-md border-t-4 border-brand-sunrise">
                <h3 className="font-serif text-xl text-brand-forest mb-2">Our Vision</h3>
                <p className="text-sm text-gray-500">To be the leading agro-tourism destination, inspiring a global return to sustainable, nature-connected lifestyles.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
