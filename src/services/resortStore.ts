import { Room, Booking, MenuItem, Customer, ResortContact, StaffUser } from '../types';

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
    image: 'https://images.unsplash.com/photo-1611892440504-42a792e24d32?auto=format&fit=crop&w=800&q=80',
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
    image: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=800&q=80',
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
    image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80',
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
    image: 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=800&q=80',
    description: 'Luxury super deluxe room with king bed and private terrace facing the sunset.'
  },
  {
    id: 'room-301',
    roomNumber: '301',
    category: 'Family Suite',
    pricePerNight: 7500,
    capacity: 5,
    status: 'Available',
    amenities: ['Free Wi-Fi', 'AC', '2 Bedrooms', 'Living Lounge', 'Kitchenette'],
    image: 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=800&q=80',
    description: 'Ideal family suite with separate bedrooms, seating lounge, and farm views.'
  },
  {
    id: 'room-cottage-1',
    roomNumber: 'C-01',
    category: 'Agro Cottage',
    pricePerNight: 6000,
    capacity: 2,
    status: 'Available',
    amenities: ['Private Garden', 'Wooden Finish', 'Fireplace', 'AC', 'Breakfast Included'],
    image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=800&q=80',
    description: 'Traditional wooden cottage surrounded by fresh farm crops and serene nature.'
  }
];

export const INITIAL_MENU_ITEMS: MenuItem[] = [
  { id: 'm-1', name: 'Momo (Chicken/Buff)', category: 'Food', price: 250, available: true },
  { id: 'm-2', name: 'Veg / Egg Fried Rice', category: 'Food', price: 300, available: true },
  { id: 'm-3', name: 'Fresh Milk Coffee / Espresso', category: 'Beverage', price: 180, available: true },
  { id: 'm-4', name: 'Organic Farmhouse Thali Set', category: 'Food', price: 450, available: true },
  { id: 'm-5', name: 'Grilled Farm Chicken', category: 'Food', price: 650, available: true },
  { id: 'm-6', name: 'Chowmein (Veg/Chicken)', category: 'Food', price: 220, available: true },
  { id: 'm-7', name: 'Fresh Organic Juice', category: 'Beverage', price: 200, available: true },
  { id: 'm-8', name: 'Masala Tea', category: 'Beverage', price: 80, available: true },
  { id: 's-1', name: 'Laundry Service', category: 'Services', price: 150, available: true },
  { id: 's-2', name: 'Extra Bed Charge', category: 'Services', price: 800, available: true },
  { id: 's-3', name: 'Campfire & BBQ Setup', category: 'Services', price: 1200, available: true }
];

export const INITIAL_BOOKINGS: Booking[] = [
  {
    id: 'bk-203',
    bookingCode: 'DG-2026-203',
    guestName: 'Ramesh Sharma',
    guestPhone: '+977 9851012345',
    guestEmail: 'ramesh.sharma@example.com',
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
      { id: 'ord-1', name: 'Momo', category: 'Food', price: 250, quantity: 1, timestamp: '12:30 PM' },
      { id: 'ord-2', name: 'Fried Rice', category: 'Food', price: 300, quantity: 1, timestamp: '01:15 PM' },
      { id: 'ord-3', name: 'Coffee', category: 'Beverage', price: 180, quantity: 1, timestamp: '04:00 PM' },
      { id: 'ord-4', name: 'Laundry', category: 'Laundry', price: 150, quantity: 1, timestamp: '05:30 PM' },
      { id: 'ord-5', name: 'Extra Bed', category: 'Extra Bed', price: 800, quantity: 1, timestamp: '06:00 PM' }
    ],
    extraCharges: 0,
    discount: 0,
    taxAmount: 0,
    grandTotal: 5680,
    advancePayment: 1000,
    balanceDue: 4680,
    status: 'Checked-in',
    paymentStatus: 'Partial',
    paymentMethod: 'Fonepay QR',
    notes: 'Quotation example room with food and extra services billed directly to room tab.',
    createdAt: '2026-08-24 09:00 AM'
  },
  {
    id: 'bk-204',
    bookingCode: 'DG-2026-204',
    guestName: 'Sita Adhikari',
    guestPhone: '+977 9841234567',
    guestEmail: 'sita.adhikari@example.com',
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
    paymentMethod: 'Fonepay QR',
    notes: 'Anniversary celebration. Requested quiet room.',
    createdAt: '2026-08-23 02:15 PM'
  }
];

export const INITIAL_CUSTOMERS: Customer[] = [
  {
    id: 'cust-1',
    name: 'Ramesh Sharma',
    phone: '+977 9851012345',
    email: 'ramesh.sharma@example.com',
    idPassportNumber: '27-01-78-12345',
    address: 'Kathmandu, Nepal',
    notes: 'Prefers organic farm breakfast and mountain view room.',
    totalVisits: 2,
    totalSpent: 12400,
    createdAt: '2026-05-10'
  },
  {
    id: 'cust-2',
    name: 'Sita Adhikari',
    phone: '+977 9841234567',
    email: 'sita.adhikari@example.com',
    idPassportNumber: '12-05-80-98765',
    address: 'Pokhara, Nepal',
    notes: 'VIP Guest.',
    totalVisits: 1,
    totalSpent: 10500,
    createdAt: '2026-08-23'
  }
];

export const DEFAULT_CONTACT: ResortContact = {
  phone: '+977 985-1234567',
  altPhone: '+977 01-4999999',
  email: 'info@dadagharagroresort.com',
  address: 'Lele, Lalitpur, Nepal (Near Agro Valley)',
  whatsappNumber: '9779851234567',
  facebookUrl: 'https://facebook.com/dadagharagrofarmresort',
  instagramUrl: 'https://instagram.com/dadagharagrofarmresort',
  qrCodeImageUrl: 'https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=Fonepay%20Merchant%3A%20Dada%20Ghar%20Agro%20Farm%20Resort',
  bankDetails: {
    bankName: 'Nabil Bank Ltd.',
    accountName: 'Dada Ghar Agro Farm Resort Pvt. Ltd.',
    accountNumber: '01201017500123',
    branch: 'Lalitpur Branch'
  }
};
