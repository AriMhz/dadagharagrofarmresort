import React, { createContext, useContext, useState, useEffect } from 'react';
import { Room, Booking, MenuItem, Customer, ResortContact, Invoice, BookingStatus, PaymentStatus, PaymentMethod, OrderItem, StaffUser, StaffRole } from '../types';
import { INITIAL_ROOMS, INITIAL_BOOKINGS, INITIAL_MENU_ITEMS, INITIAL_CUSTOMERS, DEFAULT_CONTACT, INITIAL_STAFF } from '../services/resortStore';

interface ResortContextType {
  rooms: Room[];
  bookings: Booking[];
  menuItems: MenuItem[];
  customers: Customer[];
  contact: ResortContact;
  invoices: Invoice[];
  staffUsers: StaffUser[];
  currentStaffUser: StaffUser | null;
  isAdminLoggedIn: boolean;
  isBookingModalOpen: boolean;
  activeBookingModalRoom: Room | null;

  // Authentication Actions
  loginAdmin: (username: string, pass: string, rememberMe?: boolean) => boolean;
  loginStaff: (username: string, pass: string, rememberMe?: boolean) => StaffUser | null;
  logoutAdmin: () => void;
  openBookingModal: (room?: Room | null) => void;
  closeBookingModal: () => void;
  
  // Staff User Management
  addStaffUser: (user: Omit<StaffUser, 'id' | 'active'>) => void;
  updateStaffUser: (user: StaffUser) => void;
  deleteStaffUser: (id: string) => void;

  // Room Management
  addRoom: (room: Omit<Room, 'id'>) => void;
  updateRoom: (room: Room) => void;
  deleteRoom: (id: string) => void;
  
  // Booking Management
  addBooking: (booking: Omit<Booking, 'id' | 'bookingCode' | 'createdAt' | 'orders' | 'totalRoomCharge' | 'grandTotal' | 'balanceDue'>) => Booking;
  updateBookingStatus: (id: string, status: BookingStatus, paymentStatus?: PaymentStatus) => void;
  updateBookingPayment: (id: string, advancePaid: number, status: PaymentStatus, method?: PaymentMethod) => void;
  
  // Restaurant / Service Order POS
  addOrderToBooking: (bookingId: string, item: Omit<OrderItem, 'id' | 'timestamp'>) => void;
  removeOrderFromBooking: (bookingId: string, orderId: string) => void;
  addMenuItem: (item: Omit<MenuItem, 'id'>) => void;
  updateMenuItem: (item: MenuItem) => void;
  
  // Billing & Checkout
  checkoutBooking: (bookingId: string, paymentMethod: PaymentMethod, finalPaidAmount?: number) => Invoice;
  
  // Customer & Contact
  addCustomer: (customer: Omit<Customer, 'id' | 'createdAt' | 'totalVisits' | 'totalSpent'>) => Customer;
  updateContactInfo: (contact: ResortContact) => void;
  
  // Storage Reset
  resetToDemoData: () => void;
}

const ResortContext = createContext<ResortContextType | undefined>(undefined);

const LOCAL_STORAGE_KEYS = {
  ROOMS: 'dada_ghar_rooms_v1',
  BOOKINGS: 'dada_ghar_bookings_v1',
  MENU_ITEMS: 'dada_ghar_menu_v1',
  CUSTOMERS: 'dada_ghar_customers_v1',
  CONTACT: 'dada_ghar_contact_v1',
  INVOICES: 'dada_ghar_invoices_v1',
  STAFF: 'dada_ghar_staff_v1',
  AUTH_USER: 'dada_ghar_auth_user_v1',
  REMEMBERED_USER: 'dada_ghar_remembered_user_v1',
  REMEMBER_ME: 'dada_ghar_remember_me_v1'
};

export const ResortProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [rooms, setRooms] = useState<Room[]>(() => {
    const stored = localStorage.getItem(LOCAL_STORAGE_KEYS.ROOMS);
    return stored ? JSON.parse(stored) : INITIAL_ROOMS;
  });

  const [bookings, setBookings] = useState<Booking[]>(() => {
    const stored = localStorage.getItem(LOCAL_STORAGE_KEYS.BOOKINGS);
    return stored ? JSON.parse(stored) : INITIAL_BOOKINGS;
  });

  const [menuItems, setMenuItems] = useState<MenuItem[]>(() => {
    const stored = localStorage.getItem(LOCAL_STORAGE_KEYS.MENU_ITEMS);
    return stored ? JSON.parse(stored) : INITIAL_MENU_ITEMS;
  });

  const [customers, setCustomers] = useState<Customer[]>(() => {
    const stored = localStorage.getItem(LOCAL_STORAGE_KEYS.CUSTOMERS);
    return stored ? JSON.parse(stored) : INITIAL_CUSTOMERS;
  });

  const [contact, setContact] = useState<ResortContact>(() => {
    const stored = localStorage.getItem(LOCAL_STORAGE_KEYS.CONTACT);
    return stored ? JSON.parse(stored) : DEFAULT_CONTACT;
  });

  const [invoices, setInvoices] = useState<Invoice[]>(() => {
    const stored = localStorage.getItem(LOCAL_STORAGE_KEYS.INVOICES);
    return stored ? JSON.parse(stored) : [];
  });

  const [staffUsers, setStaffUsers] = useState<StaffUser[]>(() => {
    const stored = localStorage.getItem(LOCAL_STORAGE_KEYS.STAFF);
    return stored ? JSON.parse(stored) : INITIAL_STAFF;
  });

  const [currentStaffUser, setCurrentStaffUser] = useState<StaffUser | null>(() => {
    // Check localStorage first, then sessionStorage
    const localUser = localStorage.getItem(LOCAL_STORAGE_KEYS.AUTH_USER);
    if (localUser) {
      try { return JSON.parse(localUser); } catch { /* ignore */ }
    }
    const sessionUser = sessionStorage.getItem(LOCAL_STORAGE_KEYS.AUTH_USER);
    if (sessionUser) {
      try { return JSON.parse(sessionUser); } catch { /* ignore */ }
    }
    return null;
  });

  const isAdminLoggedIn = currentStaffUser !== null;

  const [isBookingModalOpen, setIsBookingModalOpen] = useState<boolean>(false);
  const [activeBookingModalRoom, setActiveBookingModalRoom] = useState<Room | null>(null);

  // Sync state to local storage
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEYS.ROOMS, JSON.stringify(rooms));
  }, [rooms]);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEYS.BOOKINGS, JSON.stringify(bookings));
  }, [bookings]);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEYS.MENU_ITEMS, JSON.stringify(menuItems));
  }, [menuItems]);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEYS.CUSTOMERS, JSON.stringify(customers));
  }, [customers]);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEYS.CONTACT, JSON.stringify(contact));
  }, [contact]);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEYS.INVOICES, JSON.stringify(invoices));
  }, [invoices]);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEYS.STAFF, JSON.stringify(staffUsers));
  }, [staffUsers]);

  // Actions
  const loginStaff = (username: string, pass: string, rememberMe: boolean = true): StaffUser | null => {
    const trimmedUser = username.trim();
    const trimmedPass = pass.trim();

    if (!trimmedUser || !trimmedPass) return null;

    const user = staffUsers.find(
      u => u.username.toLowerCase() === trimmedUser.toLowerCase() && u.password === trimmedPass && u.active
    );

    if (user) {
      const updatedUser = { ...user, lastLogin: new Date().toLocaleString() };
      setCurrentStaffUser(updatedUser);
      setStaffUsers(prev => prev.map(u => u.id === user.id ? updatedUser : u));

      if (rememberMe) {
        localStorage.setItem(LOCAL_STORAGE_KEYS.AUTH_USER, JSON.stringify(updatedUser));
        localStorage.setItem(LOCAL_STORAGE_KEYS.REMEMBERED_USER, user.username);
        localStorage.setItem(LOCAL_STORAGE_KEYS.REMEMBER_ME, 'true');
        sessionStorage.removeItem(LOCAL_STORAGE_KEYS.AUTH_USER);
      } else {
        sessionStorage.setItem(LOCAL_STORAGE_KEYS.AUTH_USER, JSON.stringify(updatedUser));
        localStorage.removeItem(LOCAL_STORAGE_KEYS.AUTH_USER);
        localStorage.removeItem(LOCAL_STORAGE_KEYS.REMEMBERED_USER);
        localStorage.setItem(LOCAL_STORAGE_KEYS.REMEMBER_ME, 'false');
      }

      return updatedUser;
    }
    return null;
  };

  const loginAdmin = (username: string, pass: string, rememberMe: boolean = true): boolean => {
    const user = loginStaff(username, pass, rememberMe);
    return user !== null;
  };

  const logoutAdmin = () => {
    setCurrentStaffUser(null);
    localStorage.removeItem(LOCAL_STORAGE_KEYS.AUTH_USER);
    sessionStorage.removeItem(LOCAL_STORAGE_KEYS.AUTH_USER);
  };

  const openBookingModal = (room: Room | null = null) => {
    setActiveBookingModalRoom(room);
    setIsBookingModalOpen(true);
  };

  const closeBookingModal = () => {
    setIsBookingModalOpen(false);
    setActiveBookingModalRoom(null);
  };

  // Staff User Management
  const addStaffUser = (userData: Omit<StaffUser, 'id' | 'active'>) => {
    const newUser: StaffUser = {
      ...userData,
      id: `staff-${Date.now()}`,
      active: true
    };
    setStaffUsers(prev => [...prev, newUser]);
  };

  const updateStaffUser = (updatedUser: StaffUser) => {
    setStaffUsers(prev => prev.map(u => u.id === updatedUser.id ? updatedUser : u));
  };

  const deleteStaffUser = (id: string) => {
    setStaffUsers(prev => prev.filter(u => u.id !== id));
  };

  // Room Management
  const addRoom = (roomData: Omit<Room, 'id'>) => {
    const newRoom: Room = {
      ...roomData,
      id: `room-${Date.now()}`
    };
    setRooms(prev => [...prev, newRoom]);
  };

  const updateRoom = (updatedRoom: Room) => {
    setRooms(prev => prev.map(r => r.id === updatedRoom.id ? updatedRoom : r));
  };

  const deleteRoom = (id: string) => {
    setRooms(prev => prev.filter(r => r.id !== id));
  };

  // Helper to re-calculate booking totals
  const recalculateBooking = (b: Booking): Booking => {
    const totalRoomCharge = b.roomRate * b.nights;
    const ordersTotal = b.orders.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const grandTotal = totalRoomCharge + ordersTotal + b.extraCharges - b.discount + b.taxAmount;
    const balanceDue = Math.max(0, grandTotal - b.advancePayment);
    let paymentStatus: PaymentStatus = b.paymentStatus;
    
    if (b.advancePayment >= grandTotal && grandTotal > 0) {
      paymentStatus = 'Paid';
    } else if (b.advancePayment > 0) {
      paymentStatus = 'Partial';
    } else {
      paymentStatus = 'Unpaid';
    }

    return {
      ...b,
      totalRoomCharge,
      grandTotal,
      balanceDue,
      paymentStatus
    };
  };

  // Booking Management
  const addBooking = (data: Omit<Booking, 'id' | 'bookingCode' | 'createdAt' | 'orders' | 'totalRoomCharge' | 'grandTotal' | 'balanceDue'>): Booking => {
    const newBookingId = `bk-${Date.now()}`;
    const code = `DG-${new Date().getFullYear()}-${Math.floor(100 + Math.random() * 900)}`;
    const totalRoomCharge = data.roomRate * data.nights;
    const grandTotal = totalRoomCharge + data.extraCharges - data.discount + data.taxAmount;
    const balanceDue = Math.max(0, grandTotal - data.advancePayment);
    
    const newBooking: Booking = {
      ...data,
      id: newBookingId,
      bookingCode: code,
      orders: [],
      totalRoomCharge,
      grandTotal,
      balanceDue,
      createdAt: new Date().toLocaleString()
    };

    setBookings(prev => [newBooking, ...prev]);

    // Automatically update room status if Checked-in or Confirmed
    if (data.status === 'Checked-in') {
      setRooms(prev => prev.map(r => r.id === data.roomId ? { ...r, status: 'Occupied' } : r));
    } else if (data.status === 'Confirmed') {
      setRooms(prev => prev.map(r => r.id === data.roomId ? { ...r, status: 'Reserved' } : r));
    }

    // Sync Customer Record
    addOrUpdateCustomerFromBooking(data.guestName, data.guestPhone, data.guestEmail, grandTotal);

    return newBooking;
  };

  const addOrUpdateCustomerFromBooking = (name: string, phone: string, email: string, spent: number) => {
    setCustomers(prev => {
      const existing = prev.find(c => c.phone === phone || c.email === email);
      if (existing) {
        return prev.map(c => c.id === existing.id ? {
          ...c,
          totalVisits: c.totalVisits + 1,
          totalSpent: c.totalSpent + spent
        } : c);
      } else {
        const newCust: Customer = {
          id: `cust-${Date.now()}`,
          name,
          phone,
          email,
          totalVisits: 1,
          totalSpent: spent,
          createdAt: new Date().toISOString().split('T')[0]
        };
        return [...prev, newCust];
      }
    });
  };

  const updateBookingStatus = (id: string, status: BookingStatus, paymentStatus?: PaymentStatus) => {
    setBookings(prev => prev.map(b => {
      if (b.id === id) {
        const updated = { ...b, status, ...(paymentStatus ? { paymentStatus } : {}) };
        
        // Dynamic Room status transition
        if (status === 'Checked-in') {
          setRooms(roomsPrev => roomsPrev.map(r => r.id === b.roomId ? { ...r, status: 'Occupied' } : r));
        } else if (status === 'Checked-out') {
          setRooms(roomsPrev => roomsPrev.map(r => r.id === b.roomId ? { ...r, status: 'Available' } : r));
        } else if (status === 'Cancelled') {
          setRooms(roomsPrev => roomsPrev.map(r => r.id === b.roomId ? { ...r, status: 'Available' } : r));
        }
        return updated;
      }
      return b;
    }));
  };

  const updateBookingPayment = (id: string, advancePaid: number, status: PaymentStatus, method?: PaymentMethod) => {
    setBookings(prev => prev.map(b => {
      if (b.id === id) {
        const updated = recalculateBooking({
          ...b,
          advancePayment: advancePaid,
          paymentStatus: status,
          ...(method ? { paymentMethod: method } : {})
        });
        return updated;
      }
      return b;
    }));
  };

  // Restaurant & Extra Service POS
  const addOrderToBooking = (bookingId: string, item: Omit<OrderItem, 'id' | 'timestamp'>) => {
    const newOrderItem: OrderItem = {
      ...item,
      id: `ord-${Date.now()}`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setBookings(prev => prev.map(b => {
      if (b.id === bookingId) {
        const updatedOrders = [...b.orders, newOrderItem];
        return recalculateBooking({
          ...b,
          orders: updatedOrders
        });
      }
      return b;
    }));
  };

  const removeOrderFromBooking = (bookingId: string, orderId: string) => {
    setBookings(prev => prev.map(b => {
      if (b.id === bookingId) {
        const updatedOrders = b.orders.filter(o => o.id !== orderId);
        return recalculateBooking({
          ...b,
          orders: updatedOrders
        });
      }
      return b;
    }));
  };

  const addMenuItem = (item: Omit<MenuItem, 'id'>) => {
    setMenuItems(prev => [...prev, { ...item, id: `m-${Date.now()}` }]);
  };

  const updateMenuItem = (item: MenuItem) => {
    setMenuItems(prev => prev.map(m => m.id === item.id ? item : m));
  };

  // Billing & Checkout
  const checkoutBooking = (bookingId: string, paymentMethod: PaymentMethod, finalPaidAmount?: number): Invoice => {
    const booking = bookings.find(b => b.id === bookingId);
    if (!booking) throw new Error('Booking not found');

    const totalPaid = finalPaidAmount !== undefined ? finalPaidAmount : booking.grandTotal;
    
    // Calculate breakdown
    const foodAndBeverageCharges = booking.orders
      .filter(o => o.category === 'Food' || o.category === 'Beverage')
      .reduce((s, o) => s + (o.price * o.quantity), 0);

    const laundryCharges = booking.orders
      .filter(o => o.category === 'Laundry')
      .reduce((s, o) => s + (o.price * o.quantity), 0);

    const extraBedCharges = booking.orders
      .filter(o => o.category === 'Extra Bed')
      .reduce((s, o) => s + (o.price * o.quantity), 0);

    const otherCharges = booking.orders
      .filter(o => !['Food', 'Beverage', 'Laundry', 'Extra Bed'].includes(o.category))
      .reduce((s, o) => s + (o.price * o.quantity), 0);

    const itemsBreakdown = [
      { description: `${booking.roomCategory} (Room ${booking.roomNumber}) - ${booking.nights} Night(s)`, category: 'Room', amount: booking.totalRoomCharge, qty: booking.nights },
      ...booking.orders.map(o => ({
        description: o.name,
        category: o.category,
        amount: o.price * o.quantity,
        qty: o.quantity
      }))
    ];

    const newInvoice: Invoice = {
      id: `inv-${Date.now()}`,
      invoiceNumber: `INV-${Date.now().toString().slice(-6)}`,
      bookingId: booking.id,
      customerName: booking.guestName,
      customerPhone: booking.guestPhone,
      customerEmail: booking.guestEmail,
      roomNumber: booking.roomNumber,
      roomCategory: booking.roomCategory,
      checkInDate: booking.checkInDate,
      checkOutDate: booking.checkOutDate,
      nights: booking.nights,
      roomCharges: booking.totalRoomCharge,
      foodAndBeverageCharges,
      laundryCharges,
      extraBedCharges,
      otherCharges,
      subtotal: booking.grandTotal,
      tax: booking.taxAmount,
      grandTotal: booking.grandTotal,
      paidAmount: totalPaid,
      balanceDue: Math.max(0, booking.grandTotal - totalPaid),
      paymentStatus: totalPaid >= booking.grandTotal ? 'Paid' : 'Partial',
      paymentMethod,
      issuedAt: new Date().toLocaleString(),
      itemsBreakdown
    };

    setInvoices(prev => [newInvoice, ...prev]);

    // Mark booking as Checked-out & Paid
    updateBookingStatus(bookingId, 'Checked-out', totalPaid >= booking.grandTotal ? 'Paid' : 'Partial');

    return newInvoice;
  };

  const addCustomer = (customerData: Omit<Customer, 'id' | 'createdAt' | 'totalVisits' | 'totalSpent'>): Customer => {
    const newCust: Customer = {
      ...customerData,
      id: `cust-${Date.now()}`,
      createdAt: new Date().toISOString().split('T')[0],
      totalVisits: 0,
      totalSpent: 0
    };
    setCustomers(prev => [...prev, newCust]);
    return newCust;
  };

  const updateContactInfo = (newContact: ResortContact) => {
    setContact(newContact);
  };

  const resetToDemoData = () => {
    setRooms(INITIAL_ROOMS);
    setBookings(INITIAL_BOOKINGS);
    setMenuItems(INITIAL_MENU_ITEMS);
    setCustomers(INITIAL_CUSTOMERS);
    setContact(DEFAULT_CONTACT);
    setStaffUsers(INITIAL_STAFF);
    setInvoices([]);
    setCurrentStaffUser(null);
    localStorage.clear();
    sessionStorage.clear();
  };

  return (
    <ResortContext.Provider value={{
      rooms,
      bookings,
      menuItems,
      customers,
      contact,
      invoices,
      staffUsers,
      currentStaffUser,
      isAdminLoggedIn,
      isBookingModalOpen,
      activeBookingModalRoom,
      loginAdmin,
      loginStaff,
      logoutAdmin,
      openBookingModal,
      closeBookingModal,
      addStaffUser,
      updateStaffUser,
      deleteStaffUser,
      addRoom,
      updateRoom,
      deleteRoom,
      addBooking,
      updateBookingStatus,
      updateBookingPayment,
      addOrderToBooking,
      removeOrderFromBooking,
      addMenuItem,
      updateMenuItem,
      checkoutBooking,
      addCustomer,
      updateContactInfo,
      resetToDemoData
    }}>
      {children}
    </ResortContext.Provider>
  );
};

export const useResort = () => {
  const context = useContext(ResortContext);
  if (!context) {
    throw new Error('useResort must be used within a ResortProvider');
  }
  return context;
};
