export type RoomCategory = 'Deluxe Room' | 'Super Deluxe Room' | 'Family Suite' | 'Agro Cottage' | 'Villa';

export type RoomStatus = 'Available' | 'Occupied' | 'Reserved' | 'Cleaning' | 'Maintenance';

export type BookingStatus = 'Pending' | 'Confirmed' | 'Checked-in' | 'Checked-out' | 'Cancelled';

export type PaymentStatus = 'Unpaid' | 'Partial' | 'Paid';

export type PaymentMethod = 'Cash' | 'Fonepay QR' | 'eSewa' | 'Khalti' | 'Card' | 'WhatsApp Direct';

export type StaffRole = 'admin' | 'cashier' | 'waiter' | 'receptionist';

export interface StaffUser {
  id: string;
  name: string;
  username: string;
  password?: string;
  role: StaffRole;
  phone: string;
  email?: string;
  active: boolean;
  lastLogin?: string;
}

export interface Room {
  id: string;
  roomNumber: string;
  category: RoomCategory;
  pricePerNight: number;
  capacity: number;
  status: RoomStatus;
  amenities: string[];
  image: string;
  description: string;
}

export interface OrderItem {
  id: string;
  name: string;
  category: 'Food' | 'Beverage' | 'Laundry' | 'Service' | 'Extra Bed' | 'Other';
  price: number;
  quantity: number;
  timestamp: string;
}

export interface MenuItem {
  id: string;
  name: string;
  category: 'Food' | 'Beverage' | 'Services';
  price: number;
  available: boolean;
}

export interface Customer {
  id: string;
  name: string;
  phone: string;
  email: string;
  idPassportNumber?: string;
  address?: string;
  notes?: string;
  totalVisits: number;
  totalSpent: number;
  createdAt: string;
}

export interface Booking {
  id: string;
  bookingCode: string;
  guestName: string;
  guestPhone: string;
  guestEmail: string;
  roomId: string;
  roomNumber: string;
  roomCategory: RoomCategory;
  checkInDate: string;
  checkOutDate: string;
  nights: number;
  numGuests: number;
  roomRate: number;
  totalRoomCharge: number;
  orders: OrderItem[];
  extraCharges: number;
  discount: number;
  taxAmount: number;
  grandTotal: number;
  advancePayment: number;
  balanceDue: number;
  status: BookingStatus;
  paymentStatus: PaymentStatus;
  paymentMethod?: PaymentMethod;
  notes?: string;
  createdAt: string;
}

export interface Invoice {
  id: string;
  invoiceNumber: string;
  bookingId: string;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  roomNumber: string;
  roomCategory: string;
  checkInDate: string;
  checkOutDate: string;
  nights: number;
  roomCharges: number;
  foodAndBeverageCharges: number;
  laundryCharges: number;
  extraBedCharges: number;
  otherCharges: number;
  subtotal: number;
  tax: number;
  grandTotal: number;
  paidAmount: number;
  balanceDue: number;
  paymentStatus: PaymentStatus;
  paymentMethod: PaymentMethod;
  issuedAt: string;
  itemsBreakdown: { description: string; category: string; amount: number; qty?: number }[];
}

export interface ResortContact {
  phone: string;
  altPhone: string;
  email: string;
  address: string;
  whatsappNumber: string;
  facebookUrl: string;
  instagramUrl: string;
  qrCodeImageUrl: string;
  bankDetails: {
    bankName: string;
    accountName: string;
    accountNumber: string;
    branch: string;
  };
}

export interface WebsiteContent {
  resortName: string;
  tagline: string;
  heroNotice: string;
  contact: ResortContact;
}
