import React, { useState, useEffect } from 'react';
import { useResort } from '../../context/ResortContext';
import { useNavigate, Link } from 'react-router-dom';
import DashboardOverview from '../../components/admin/DashboardOverview';
import RoomManagement from '../../components/admin/RoomManagement';
import BookingManagement from '../../components/admin/BookingManagement';
import RestaurantOrderManagement from '../../components/admin/RestaurantOrderManagement';
import BillingAndInvoice from '../../components/admin/BillingAndInvoice';
import CustomerManagement from '../../components/admin/CustomerManagement';
import ReportsView from '../../components/admin/ReportsView';
import WebsiteContentManager from '../../components/admin/WebsiteContentManager';
import StaffManagement from '../../components/admin/StaffManagement';
import PrintableInvoice from '../../components/admin/PrintableInvoice';
import { LayoutDashboard, Bed, Calendar, Utensils, DollarSign, Users, BarChart3, Globe, LogOut, ArrowLeft, Menu, X, Shield, UserCheck } from 'lucide-react';
import logoImg from '../../assets/logo.jpg';

export default function AdminLayout() {
  const { currentStaffUser, isAdminLoggedIn, logoutAdmin, bookings } = useResort();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [activeInvoiceBookingId, setActiveInvoiceBookingId] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (!isAdminLoggedIn) {
      navigate('/admin/login', { replace: true });
    }
  }, [isAdminLoggedIn, navigate]);

  if (!isAdminLoggedIn) {
    return null;
  }

  const activeInvoiceBooking = bookings.find(b => b.id === activeInvoiceBookingId);

  const navItems = [
    { id: 'dashboard', label: 'Dashboard Overview', icon: LayoutDashboard },
    { id: 'rooms', label: 'Room Management', icon: Bed },
    { id: 'bookings', label: 'Bookings & Approval', icon: Calendar, badge: bookings.filter(b => b.status === 'Pending').length },
    { id: 'orders', label: 'Restaurant POS Orders', icon: Utensils },
    { id: 'bills', label: 'Bills & Invoices', icon: DollarSign },
    { id: 'customers', label: 'Customer Records', icon: Users },
    { id: 'staff', label: 'Team & Staff Accounts', icon: UserCheck },
    { id: 'reports', label: 'Reports & Analytics', icon: BarChart3 },
    { id: 'website', label: 'Website Settings', icon: Globe },
  ];

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col font-sans">
      {/* Top Navbar */}
      <header className="bg-brand-forest text-white border-b border-emerald-900 sticky top-0 z-30 shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 text-white/80 hover:text-white"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

            <div className="flex items-center gap-2.5 font-serif font-bold text-lg text-white">
              <img
                src={logoImg}
                alt="Logo"
                className="w-9 h-9 rounded-full object-cover border border-amber-400 bg-white p-0.5"
              />
              <span>Dada Ghar Resort Admin</span>
            </div>
            {currentStaffUser && (
              <span className="hidden sm:inline-block px-2.5 py-0.5 bg-emerald-800 text-emerald-200 text-[10px] font-bold uppercase rounded-full border border-emerald-700">
                User: {currentStaffUser.name} ({currentStaffUser.role.toUpperCase()})
              </span>
            )}
          </div>

          <div className="flex items-center gap-2 text-xs">
            <Link
              to="/waiter"
              className="hidden sm:inline-flex px-2.5 py-1.5 bg-white/10 hover:bg-white/20 text-emerald-200 rounded-xl transition items-center gap-1 font-bold"
            >
              <Utensils className="w-3.5 h-3.5" />
              <span>Waiter POS</span>
            </Link>

            <Link
              to="/cashier"
              className="hidden sm:inline-flex px-2.5 py-1.5 bg-white/10 hover:bg-white/20 text-amber-200 rounded-xl transition items-center gap-1 font-bold"
            >
              <DollarSign className="w-3.5 h-3.5" />
              <span>Cashier Desk</span>
            </Link>

            <Link
              to="/"
              className="px-3 py-1.5 bg-white/10 hover:bg-white/20 text-white rounded-xl transition flex items-center gap-1 font-medium"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Public Site</span>
            </Link>

            <button
              onClick={() => {
                logoutAdmin();
                navigate('/', { replace: true });
              }}
              className="px-3 py-1.5 bg-rose-600 hover:bg-rose-700 text-white rounded-xl font-medium transition flex items-center gap-1"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Shell */}
      <div className="flex-1 max-w-7xl w-full mx-auto flex">
        {/* Left Sidebar */}
        <aside className={`
          fixed lg:static inset-y-0 left-0 z-20 w-64 bg-white border-r border-gray-200 p-4 transform transition-transform duration-300 ease-in-out
          ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}>
          <div className="mb-6 px-3 py-2 bg-emerald-50 rounded-xl border border-emerald-100 flex items-center gap-2.5">
            <img
              src={logoImg}
              alt="Logo"
              className="w-8 h-8 rounded-full object-cover border border-amber-400 bg-white p-0.5 shrink-0"
            />
            <div>
              <p className="text-xs font-bold text-brand-forest">Manager Portal</p>
              <p className="text-[10px] text-gray-500">{currentStaffUser?.name || 'Authorized Session'}</p>
            </div>
          </div>

          <nav className="space-y-1">
            {navItems.map(item => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition ${
                    isActive
                      ? 'bg-brand-forest text-white shadow-md'
                      : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-brand-leaf' : 'text-gray-400'}`} />
                    <span>{item.label}</span>
                  </div>
                  {item.badge && item.badge > 0 ? (
                    <span className="px-2 py-0.5 bg-amber-500 text-white text-[10px] font-bold rounded-full">
                      {item.badge}
                    </span>
                  ) : null}
                </button>
              );
            })}
          </nav>
        </aside>

        {/* Right Content View */}
        <main className="flex-1 p-4 md:p-8 overflow-y-auto">
          {activeTab === 'dashboard' && (
            <DashboardOverview 
              onNavigateTab={(tab) => setActiveTab(tab)} 
              onOpenInvoice={(bookingId) => setActiveInvoiceBookingId(bookingId)} 
            />
          )}

          {activeTab === 'rooms' && <RoomManagement />}

          {activeTab === 'bookings' && (
            <BookingManagement onOpenInvoice={(bookingId) => setActiveInvoiceBookingId(bookingId)} />
          )}

          {activeTab === 'orders' && (
            <RestaurantOrderManagement onOpenInvoice={(bookingId) => setActiveInvoiceBookingId(bookingId)} />
          )}

          {activeTab === 'bills' && (
            <BillingAndInvoice onOpenInvoice={(bookingId) => setActiveInvoiceBookingId(bookingId)} />
          )}

          {activeTab === 'customers' && <CustomerManagement />}

          {activeTab === 'staff' && <StaffManagement />}

          {activeTab === 'reports' && <ReportsView />}

          {activeTab === 'website' && <WebsiteContentManager />}
        </main>
      </div>

      {/* Printable Invoice Overlay Modal */}
      {activeInvoiceBooking && (
        <PrintableInvoice
          booking={activeInvoiceBooking}
          onClose={() => setActiveInvoiceBookingId(null)}
        />
      )}
    </div>
  );
}
