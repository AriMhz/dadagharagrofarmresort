import { Room, Booking, MenuItem, Customer, ResortContact, StaffUser, WebsiteDynamicContent } from '../types';

export const getAssetUrl = (path: string): string => {
  if (!path) return '';
  if (path.startsWith('http://') || path.startsWith('https://') || path.startsWith('data:')) {
    return path;
  }
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  const base = import.meta.env.BASE_URL || '/';
  const cleanBase = base.endsWith('/') ? base : `${base}/`;
  return `${cleanBase}${cleanPath}`;
};

export const INITIAL_STAFF: StaffUser[] = [
  {
    id: 'staff-1',
    name: 'Rajesh Thapa (Manager)',
    username: 'admin',
    password: 'admin123',
    role: 'admin',
    phone: '+977 9851000001',
    email: 'manager@dadagharresort.com',
    active: true,
    lastLogin: '2026-08-24 19:30'
  },
  {
    id: 'staff-2',
    name: 'Bikram Rai (Senior Waiter)',
    username: 'waiter',
    password: 'waiter123',
    role: 'waiter',
    phone: '+977 9841000002',
    email: 'waiter@dadagharresort.com',
    active: true,
    lastLogin: '2026-08-24 18:45'
  },
  {
    id: 'staff-3',
    name: 'Sunita Gurung (Head Cashier)',
    username: 'cashier',
    password: 'cashier123',
    role: 'cashier',
    phone: '+977 9801000003',
    email: 'cashier@dadagharresort.com',
    active: true,
    lastLogin: '2026-08-24 19:10'
  },
  {
    id: 'staff-4',
    name: 'Prashant Karki (Receptionist)',
    username: 'reception',
    password: 'reception123',
    role: 'receptionist',
    phone: '+977 9811000004',
    email: 'reception@dadagharresort.com',
    active: true,
    lastLogin: '2026-08-24 17:20'
  }
];

export const INITIAL_ROOMS: Room[] = [
  {
    id: 'room-101',
    roomNumber: '101',
    category: 'Deluxe Room',
    pricePerNight: 4000,
    capacity: 2,
    status: 'Available',
    amenities: ['Free Wi-Fi', 'AC', 'Mountain View', 'Attached Bathroom', 'Organic Breakfast'],
    image: 'images/resort/optimized/DSC09103.jpg',
    description: 'Cozy deluxe room featuring stunning panoramic mountain views and modern amenities.'
  },
  {
    id: 'room-102',
    roomNumber: '102',
    category: 'Deluxe Room',
    pricePerNight: 4000,
    capacity: 2,
    status: 'Available',
    amenities: ['Free Wi-Fi', 'AC', 'Garden Access', 'Balcony', 'Hot Shower'],
    image: 'images/resort/optimized/DSC09138.jpg',
    description: 'Spacious room overlooking our organic farm garden with a private balcony.'
  },
  {
    id: 'room-203',
    roomNumber: '203',
    category: 'Deluxe Room',
    pricePerNight: 4000,
    capacity: 2,
    status: 'Occupied',
    amenities: ['Free Wi-Fi', 'AC', 'Hill View Balcony', 'Mini Fridge', 'Smart TV'],
    image: 'images/resort/optimized/DSC09144.jpg',
    description: 'Premium Deluxe room on the second floor with panoramic hill view.'
  },
  {
    id: 'room-204',
    roomNumber: '204',
    category: 'Super Deluxe Room',
    pricePerNight: 5500,
    capacity: 3,
    status: 'Reserved',
    amenities: ['Free Wi-Fi', 'AC', 'King Size Bed', 'Private Terrace', 'Bathtub'],
    image: 'images/resort/optimized/DSC09148.jpg',
    description: 'Luxury super deluxe room with king bed and private terrace facing the sunset.'
  },
  {
    id: 'room-301',
    roomNumber: '301',
    category: 'Family Suite',
    pricePerNight: 7500,
    capacity: 5,
    status: 'Available',
    amenities: ['2 Bedrooms', 'Living Area', 'Kitchenette', 'Panoramic Hill View', 'Free Wi-Fi'],
    image: 'images/resort/optimized/DSC09153.jpg',
    description: 'Grand family suite designed for larger groups seeking organic luxury in nature.'
  },
  {
    id: 'room-302',
    roomNumber: '302',
    category: 'Agro Cottage',
    pricePerNight: 6000,
    capacity: 3,
    status: 'Available',
    amenities: ['Wooden Architecture', 'Fireplace', 'Private Garden', 'Organic Mini-Bar', 'Tea Maker'],
    image: 'images/resort/optimized/DSC09155.jpg',
    description: 'Handcrafted traditional wooden cottage surrounded by terraced organic farming.'
  }
];

export const INITIAL_BOOKINGS: Booking[] = [
  {
    id: 'bk-203-demo',
    bookingCode: 'DG-2026-203',
    guestName: 'Bikash Adhikari',
    guestPhone: '+977 9851234567',
    guestEmail: 'bikash@example.com',
    roomId: 'room-203',
    roomNumber: '203',
    roomCategory: 'Deluxe Room',
    checkInDate: '2026-08-24',
    checkOutDate: '2026-08-25',
    nights: 1,
    numGuests: 2,
    roomRate: 4000,
    totalRoomCharge: 4000,
    orders: [
      { id: 'ord-1', name: 'Steam Chicken Momo', category: 'Food', price: 250, quantity: 1, timestamp: '13:30' },
      { id: 'ord-2', name: 'Egg Fried Rice', category: 'Food', price: 300, quantity: 1, timestamp: '13:30' },
      { id: 'ord-3', name: 'Fresh Milk Coffee', category: 'Beverage', price: 180, quantity: 1, timestamp: '14:15' },
      { id: 'ord-4', name: 'Express Laundry Service', category: 'Laundry', price: 150, quantity: 1, timestamp: '15:00' },
      { id: 'ord-5', name: 'Extra Mattress & Bed Set', category: 'Extra Bed', price: 800, quantity: 1, timestamp: '16:00' }
    ],
    extraCharges: 0,
    discount: 0,
    taxAmount: 0,
    grandTotal: 5680,
    advancePayment: 2000,
    balanceDue: 3680,
    status: 'Checked-in',
    paymentStatus: 'Partial',
    paymentMethod: 'Fonepay QR',
    notes: 'Sample room 203 live billing calculation quotation showcase',
    createdAt: '2026-08-24 12:00'
  },
  {
    id: 'bk-204-demo',
    bookingCode: 'DG-2026-204',
    guestName: 'Anil Shrestha',
    guestPhone: '+977 9841987654',
    guestEmail: 'anil@example.com',
    roomId: 'room-204',
    roomNumber: '204',
    roomCategory: 'Super Deluxe Room',
    checkInDate: '2026-08-26',
    checkOutDate: '2026-08-28',
    nights: 2,
    numGuests: 2,
    roomRate: 5500,
    totalRoomCharge: 11000,
    orders: [],
    extraCharges: 0,
    discount: 500,
    taxAmount: 0,
    grandTotal: 10500,
    advancePayment: 5000,
    balanceDue: 5500,
    status: 'Confirmed',
    paymentStatus: 'Partial',
    paymentMethod: 'eSewa',
    notes: 'Anniversary celebration package',
    createdAt: '2026-08-23 10:30'
  }
];

export const INITIAL_MENU_ITEMS: MenuItem[] = [
  { id: 'm-1', name: 'Steam Chicken Momo', category: 'Food', price: 250, available: true },
  { id: 'm-2', name: 'Fried Rice (Veg/Egg/Chicken)', category: 'Food', price: 300, available: true },
  { id: 'm-3', name: 'Organic Mountain Thali Set', category: 'Food', price: 650, available: true },
  { id: 'm-4', name: 'Wood-Fired Farm Pizza', category: 'Food', price: 750, available: true },
  { id: 'm-5', name: 'Fresh Milk Coffee', category: 'Beverage', price: 180, available: true },
  { id: 'm-6', name: 'Organic Herbal Green Tea', category: 'Beverage', price: 120, available: true },
  { id: 'm-7', name: 'Fresh Farm Strawberry Shake', category: 'Beverage', price: 250, available: true },
  { id: 'm-8', name: 'Express Laundry Service', category: 'Services', price: 150, available: true },
  { id: 'm-9', name: 'Extra Bed / Mattress Setup', category: 'Services', price: 800, available: true },
  { id: 'm-10', name: 'Private Campfire & BBQ Setup', category: 'Services', price: 1500, available: true }
];

export const INITIAL_CUSTOMERS: Customer[] = [
  {
    id: 'cust-1',
    name: 'Bikash Adhikari',
    phone: '+977 9851234567',
    email: 'bikash@example.com',
    address: 'Kathmandu, Nepal',
    totalVisits: 3,
    totalSpent: 18500,
    createdAt: '2026-06-15'
  },
  {
    id: 'cust-2',
    name: 'Anil Shrestha',
    phone: '+977 9841987654',
    email: 'anil@example.com',
    address: 'Lalitpur, Nepal',
    totalVisits: 1,
    totalSpent: 10500,
    createdAt: '2026-08-20'
  }
];

export const DEFAULT_CONTACT: ResortContact = {
  phone: '+977 985-1234567',
  altPhone: '+977 984-1234567',
  email: 'info@dadagharresort.com',
  address: 'Lele, Lalitpur, Bagmati Province, Nepal',
  whatsappNumber: '9779851234567',
  facebookUrl: 'https://facebook.com',
  instagramUrl: 'https://instagram.com',
  qrCodeImageUrl: 'https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=Fonepay-DadaGharResort-Lele-9851234567',
  bankDetails: {
    bankName: 'Nabil Bank Ltd',
    accountName: 'Dada Ghar Agro Farm Resort Pvt. Ltd.',
    accountNumber: '01234567890123',
    branch: 'Kumaripati Branch, Lalitpur'
  }
};

export const DEFAULT_DYNAMIC_CONTENT: WebsiteDynamicContent = {
  heroSlides: [
    {
      id: 'slide-1',
      image: 'images/resort/optimized/DSC09130.jpg',
      badgeText: '5-Star Luxury Agro Retreat • Lele Valley, Nepal',
      title: 'Where Sustainable Luxury',
      subtitleItalic: 'Meets Raw Mountain Serenity',
      description: 'Recharge your soul across 50 acres of pristine organic farms, handcrafted wooden villas, and farm-to-table culinary artistry.',
      primaryCtaText: 'Reserve Your Stay',
      secondaryCtaText: 'Explore Cottages & Suites'
    },
    {
      id: 'slide-2',
      image: 'images/resort/optimized/DSC09148.jpg',
      badgeText: 'Handcrafted Hillside Living • Organic Living',
      title: 'Boutique Wooden Cottages',
      subtitleItalic: 'Surrounded by Pure Nature',
      description: 'Wake up to misty mountain views, bird songs, and fresh pine breeze in our eco-luxury timber cottages.',
      primaryCtaText: 'View Accommodations',
      secondaryCtaText: 'Check Availability'
    },
    {
      id: 'slide-3',
      image: 'images/resort/optimized/DSC09153.jpg',
      badgeText: '100% Chemical-Free Organic Farm',
      title: 'From Our Soil To Your Plate',
      subtitleItalic: 'Daily Harvested Gastronomy',
      description: 'Taste authentic Thakali thali, wood-fired pizza, and mountain herbs cultivated directly in our organic fields.',
      primaryCtaText: 'Discover Dining',
      secondaryCtaText: 'Book A Table'
    },
    {
      id: 'slide-4',
      image: 'images/resort/optimized/DSC09155.jpg',
      badgeText: 'Curated Mountain Experiences',
      title: 'Starlit Bonfires & BBQ',
      subtitleItalic: 'Unforgettable Family Moments',
      description: 'Gather around crackling evening campfires under crystal clear Himalayan skies with acoustic tunes.',
      primaryCtaText: 'Explore Activities',
      secondaryCtaText: 'Contact Concierge'
    },
    {
      id: 'slide-5',
      image: 'images/resort/optimized/ww.jpg',
      badgeText: 'Peaceful Hillside Sanctuary • Lalitpur',
      title: 'Return To What Truly',
      subtitleItalic: 'Nourishes The Soul',
      description: 'A genuine ancestral hilltop home designed for peaceful retreats, family adventures, and holistic wellness.',
      primaryCtaText: 'Plan Your Getaway',
      secondaryCtaText: 'About Our Story'
    }
  ],
  sanctuary: {
    badgeText: 'The Sanctuary of Dada Ghar',
    title: 'A Return to What Truly',
    titleItalic: 'Nourishes The Soul',
    paragraph1: 'Perched high in the peaceful hills of Lele, Lalitpur, Dada Ghar is an intentional sanctuary designed for travelers who yearn for stillness, organic wellness, and meaningful connection with nature.',
    paragraph2: 'Here, your morning coffee is accompanied by birdsong, your meals are harvested minutes before they reach your plate, and your nights are spent by crackling fireplaces under crystal-clear mountain skies.',
    highlight1Title: '100% Certified Organic',
    highlight1Desc: 'Pesticide-free vegetables, raw honey & herbs.',
    highlight2Title: 'Handcrafted Cottages',
    highlight2Desc: 'Eco-luxury wooden architecture with 5-star comfort.',
    featuredImage: 'images/resort/optimized/DSC09144.jpg',
    featuredRoomLabel: 'Featured Accommodation',
    featuredRoomTitle: 'Agro Wooden Villa Suite',
    featuredRoomPrice: 'NPR 6,000 / night'
  },
  experiences: [
    {
      id: 'exp-1',
      title: 'Organic Farm Harvesting',
      tagline: 'Hands-on Agro Tourism',
      description: 'Pluck ripe strawberries, crisp salad greens, and seasonal vegetables directly from the soil alongside our master farm stewards.',
      image: 'images/resort/optimized/DSC09138.jpg',
      iconName: 'leaf'
    },
    {
      id: 'exp-2',
      title: 'Farm-to-Table Gourmet',
      tagline: '100% Chemical-Free',
      description: 'Savor authentic Nepali Thakali feasts, wood-fired pizzas, herbal teas, and garden soups crafted from morning harvests.',
      image: 'images/resort/optimized/DSC09162.jpg',
      iconName: 'utensils'
    },
    {
      id: 'exp-3',
      title: 'Starlit Campfire & BBQ',
      tagline: 'Nighttime Magic',
      description: 'Unwind under unpolluted Himalayan night skies with acoustic melodies, warm bonfires, and organic barbecue treats.',
      image: 'images/resort/optimized/DSC09152.jpg',
      iconName: 'flame'
    },
    {
      id: 'exp-4',
      title: 'Pine Forest Nature Trails',
      tagline: 'Guided Eco Walks',
      description: 'Explore hidden valley trails, bird sanctuaries, and tranquil riverbanks breathing pure mountain oxygen.',
      image: 'images/resort/optimized/DSC09147.jpg',
      iconName: 'footprints'
    }
  ],
  culinary: {
    badgeText: 'Culinary Artistry',
    title: 'Fresh From Our Earth,',
    titleItalic: 'Prepared With Heart',
    description: 'At Dada Ghar, dining is a celebration of seasonal harvest. We cultivate heirloom vegetables, organic rice, mountain herbs, and wild berries right on our resort grounds.',
    bullet1: 'Daily morning harvests for restaurant recipes',
    bullet2: 'Authentic Thakali Set, Wood-Fired Roasts, and Herbal Infusions',
    bullet3: 'Outdoor dining terraces with panoramic sunset views',
    image: 'images/resort/optimized/DSC09163.jpg',
    cornerBadgeNumber: '100%',
    cornerBadgeText: 'Organic Certified'
  },
  testimonials: [
    {
      id: 'test-1',
      name: 'Siddharth & Ananya Sharma',
      location: 'Kathmandu, Nepal',
      role: 'Family Vacationers',
      rating: 5,
      stayType: 'Family Villa Suite',
      comment: 'Dada Ghar Agro Farm Resort is pure magic! Waking up to misty Himalayan ridges, harvesting fresh organic strawberries with our children, and the heavenly farmhouse dinner made this the best weekend retreat we have ever experienced.',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80'
    },
    {
      id: 'test-2',
      name: 'David & Sarah Miller',
      location: 'London, United Kingdom',
      role: 'Nature Lovers & Hikers',
      rating: 5,
      stayType: 'Agro Wooden Cottage',
      comment: 'The wooden cottages seamlessly blend rustic organic charm with 5-star comfort. The evening campfire under the starlit mountain sky with freshly brewed herbal tea and authentic local hospitality was unforgettable.',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80'
    },
    {
      id: 'test-3',
      name: 'Pooja & Rohan Shrestha',
      location: 'Pokhara, Nepal',
      role: 'Anniversary Celebration',
      rating: 5,
      stayType: 'Deluxe Sunset Room',
      comment: 'Unmatched serenity, incredibly attentive staff, and 100% chemical-free organic cuisine. If you want peace, fresh mountain air, and luxurious relaxation away from city noise, Dada Ghar is the ultimate sanctuary.',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=300&q=80'
    }
  ],
  faqs: [
    {
      id: 'faq-1',
      question: 'What is included in an agro farm luxury stay at Dada Ghar?',
      answer: 'Every stay includes luxury cottage or villa accommodation, complimentary farm-to-table organic breakfast, guided farm tour with fruit & vegetable harvesting, access to nature trails, evening campfire gatherings, and high-speed Wi-Fi throughout the resort.'
    },
    {
      id: 'faq-2',
      question: 'Is all food served at the resort 100% organic and locally harvested?',
      answer: 'Yes! Over 90% of all vegetables, herbs, dairy, honey, and fruits served at our restaurant are cultivated directly in our pesticide-free organic agro fields. Any supplemental ingredients are sourced from verified local eco-farms in the valley.'
    },
    {
      id: 'faq-3',
      question: 'Can families with children participate in farm activities?',
      answer: 'Absolutely! We offer hands-on family experiences including strawberry picking, vegetable harvesting, clay pottery workshops, gentle nature bird-watching walks, and traditional butter churning sessions.'
    },
    {
      id: 'faq-4',
      question: 'How do I reach Dada Ghar Agro Farm Resort from Kathmandu / Lalitpur?',
      answer: 'We are located in the scenic valley of Lele, Lalitpur, approximately a 45-minute picturesque drive from Patan / Ring Road. We also provide private resort pickup transfers upon request.'
    },
    {
      id: 'faq-5',
      question: 'What payment and booking methods are accepted?',
      answer: 'You can reserve directly on our website, through instant WhatsApp booking, or with advance QR payments (Fonepay, eSewa, Khalti, or major Cards). We also accept cash settlements at front desk checkout.'
    }
  ],
  stats: {
    acres: '50+',
    guests: '10,000+',
    organicHarvest: '100%',
    tripAdvisorRating: '4.9 ★'
  }
};
