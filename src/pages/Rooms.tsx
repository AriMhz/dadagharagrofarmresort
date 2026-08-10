import { useEffect } from "react";
import { motion } from "motion/react";
import { Users, Coffee, Wifi, Tv, Wind, Shield } from "lucide-react";

export default function Rooms() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const rooms = [
    {
      name: "Deluxe Cottage",
      price: "$150",
      image: "https://images.unsplash.com/photo-1582719508461-905c673771fd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      description: "Experience serene comfort with nature views, private balcony, and organic amenities. Perfect for couples seeking a peaceful retreat.",
      amenities: ["King Bed", "Private Balcony", "AC", "Free WiFi"]
    },
    {
      name: "Family Villa",
      price: "$250",
      image: "https://images.unsplash.com/photo-1566665797739-1674de7a421a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      description: "Spacious living for the whole family featuring multiple bedrooms, a private garden, and interactive farm activity access.",
      amenities: ["2 Bedrooms", "Kitchenette", "Private Garden", "Free WiFi"]
    },
    {
      name: "Farm House Suite",
      price: "$350",
      image: "https://images.unsplash.com/photo-1542314831-c6a4d14faaf2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      description: "The ultimate luxury experience blending rustic charm with modern premium amenities, including a private plunge pool.",
      amenities: ["Plunge Pool", "Living Room", "Butler Service", "Premium WiFi"]
    },
    {
      name: "Eco-Glamping Tent",
      price: "$120",
      image: "https://images.unsplash.com/photo-1523987355523-c7b5b0dd90a7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      description: "Immerse yourself directly in nature with our luxury glamping tents. Sleep under the stars with all the comforts of a premium room.",
      amenities: ["Queen Bed", "Stargazing Roof", "Ensuite Bath", "Firepit"]
    }
  ];

  return (
    <div className="pt-24 pb-20 w-full min-h-screen bg-[#F9FAFB]">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-serif text-brand-forest mb-4">Resort Accommodation</h1>
          <div className="w-24 h-1 bg-brand-sunrise mx-auto rounded-full mb-8"></div>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Choose from our carefully designed selection of rooms, villas, and suites. Every space is crafted to blur the lines between indoor luxury and outdoor serenity.
          </p>
        </motion.div>

        <div className="space-y-16">
          {rooms.map((room, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              className={`flex flex-col ${index % 2 !== 0 ? 'md:flex-row-reverse' : 'md:flex-row'} bg-white rounded-3xl overflow-hidden shadow-xl`}
            >
              <div className="md:w-1/2 relative h-64 md:h-auto">
                <img src={room.image} alt={room.name} className="w-full h-full object-cover" />
                <div className="absolute top-6 right-6 bg-white/90 backdrop-blur px-6 py-2 rounded-full font-bold text-brand-forest text-lg shadow-lg">
                  {room.price} <span className="text-sm font-normal text-gray-500">/ night</span>
                </div>
              </div>
              <div className="md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
                <h2 className="text-3xl font-serif text-brand-forest mb-4">{room.name}</h2>
                <p className="text-gray-600 mb-8 text-lg leading-relaxed">{room.description}</p>
                
                <div className="mb-8">
                  <h3 className="text-sm font-medium text-gray-400 uppercase tracking-wider mb-4">Room Amenities</h3>
                  <div className="grid grid-cols-2 gap-4">
                    {room.amenities.map((amenity, i) => (
                      <div key={i} className="flex items-center text-gray-700">
                        <div className="w-2 h-2 rounded-full bg-brand-leaf mr-3"></div>
                        {amenity}
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <button className="bg-brand-forest hover:bg-brand-leaf text-white px-8 py-4 rounded-full font-medium transition-colors w-full sm:w-auto shadow-md">
                    Check Availability
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
