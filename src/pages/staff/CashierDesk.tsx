import React, { useState } from 'react';
import { useResort } from '../../context/ResortContext';
import { DollarSign, Printer, CheckCircle, Clock, Search, ArrowLeft, QrCode, CreditCard, Shield, FileText } from 'lucide-react';
import { Link } from 'react-router-dom';
import { PaymentMethod, Booking } from '../../types';
import PrintableInvoice from '../../components/admin/PrintableInvoice';

export default function CashierDesk() {
  const { bookings, updateBookingPayment, checkoutBooking } = useResort();

  const [searchQuery, setSearchQuery] = useState('');
  const [activeInvoiceBookingId, setActiveInvoiceBookingId] = useState<string | null>(null);
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod>('Fonepay QR');

  const activeInvoiceBooking = bookings.find(b => b.id === activeInvoiceBookingId);

  const checkedInBookings = bookings.filter(b => 
    b.status === 'Checked-in' || b.status === 'Confirmed' || b.status === 'Checked-out'
  );

  const filteredBookings = checkedInBookings.filter(b => 
    b.guestName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    b.roomNumber.includes(searchQuery) ||
    b.bookingCode.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Daily Cash Register Metrics
  const paidInvoicesTotal = bookings.filter(b => b.paymentStatus === 'Paid').reduce((sum, b) => sum + b.grandTotal, 0);
  const pendingTabTotal = bookings.filter(b => b.paymentStatus !== 'Paid').reduce((sum, b) => sum + b.balanceDue, 0);

  const handleSettleAndPrint = (booking: Booking) => {
    try {
      checkoutBooking(booking.id, selectedMethod, booking.grandTotal);
      setActiveInvoiceBookingId(booking.id);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans pb-12">
      {/* Header */}
      <header className="bg-emerald-950 text-white border-b border-emerald-900 p-4 sticky top-0 z-30 shadow-md">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link to="/admin" className="p-2 bg-emerald-900 hover:bg-emerald-800 rounded-xl text-emerald-200 transition">
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 block">
                Front Desk Terminal
              </span>
              <h1 className="text-base font-serif font-bold text-white flex items-center gap-2">
                <DollarSign className="w-5 h-5 text-emerald-400" />
                <span>Cashier Settlement Desk</span>
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs">
            <Link
              to="/waiter"
              className="px-3 py-1.5 bg-emerald-800 hover:bg-emerald-700 text-emerald-100 rounded-xl font-bold transition"
            >
              Waiter Mobile POS
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl w-full mx-auto p-4 md:p-6 space-y-6">
        
        {/* Cashier Register KPI summary */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm flex items-center justify-between">
            <div>
              <span className="text-xs text-gray-500 font-semibold uppercase">Total Settled Collections</span>
              <p className="text-2xl font-bold font-mono text-emerald-700 mt-1">NPR {paidInvoicesTotal.toLocaleString()}</p>
            </div>
            <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl">
              <CheckCircle className="w-6 h-6" />
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm flex items-center justify-between">
            <div>
              <span className="text-xs text-gray-500 font-semibold uppercase">Pending Uncollected Tabs</span>
              <p className="text-2xl font-bold font-mono text-amber-700 mt-1">NPR {pendingTabTotal.toLocaleString()}</p>
            </div>
            <div className="p-3 bg-amber-50 text-amber-600 rounded-xl">
              <Clock className="w-6 h-6" />
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm flex items-center justify-between">
            <div>
              <span className="text-xs text-gray-500 font-semibold uppercase">Active Guest Rooms</span>
              <p className="text-2xl font-bold text-gray-900 mt-1">{checkedInBookings.length} Rooms</p>
            </div>
            <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
              <Shield className="w-6 h-6" />
            </div>
          </div>
        </div>

        {/* Payment Method Selector & Search */}
        <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Payment Method Toggle */}
          <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider whitespace-nowrap mr-2">Select Payment Method:</span>
            {['Fonepay QR', 'Cash', 'eSewa', 'Khalti', 'Card'].map(m => (
              <button
                key={m}
                onClick={() => setSelectedMethod(m as PaymentMethod)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition whitespace-nowrap ${
                  selectedMethod === m
                    ? 'bg-emerald-800 text-white shadow'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {m}
              </button>
            ))}
          </div>

          {/* Search */}
          <div className="relative w-full md:w-64">
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search guest or room 203..."
              className="w-full pl-9 pr-4 py-2 bg-gray-50 border rounded-xl text-xs outline-none focus:ring-2 focus:ring-emerald-700"
            />
          </div>
        </div>

        {/* Settlement Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredBookings.map(b => (
            <div key={b.id} className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm flex flex-col justify-between hover:shadow-md transition">
              <div>
                <div className="flex items-center justify-between pb-3 mb-3 border-b">
                  <div>
                    <span className="text-xs font-mono font-bold text-emerald-800">{b.bookingCode}</span>
                    <h3 className="text-lg font-bold text-gray-900">{b.guestName}</h3>
                  </div>
                  <div className="text-right">
                    <span className="px-3 py-1 bg-emerald-50 text-emerald-900 text-xs font-bold rounded-lg block">
                      Room {b.roomNumber} ({b.roomCategory})
                    </span>
                    <span className={`inline-block mt-1 text-[10px] px-2 py-0.5 rounded font-bold uppercase ${
                      b.paymentStatus === 'Paid' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                    }`}>
                      {b.paymentStatus}
                    </span>
                  </div>
                </div>

                <div className="space-y-2 text-xs bg-gray-50 p-4 rounded-xl border border-gray-100 mb-4">
                  <div className="flex justify-between text-gray-600">
                    <span>Room Tariff ({b.nights} Night):</span>
                    <span className="font-mono font-semibold">NPR {b.totalRoomCharge.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Restaurant Orders & Extras:</span>
                    <span className="font-mono font-semibold">
                      NPR {(b.grandTotal - b.totalRoomCharge).toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm font-bold text-emerald-900 border-t pt-2 mt-1">
                    <span>Grand Total Bill:</span>
                    <span className="font-mono text-base">NPR {b.grandTotal.toLocaleString()}</span>
                  </div>
                  {b.advancePayment > 0 && (
                    <div className="flex justify-between text-xs text-emerald-700 font-medium">
                      <span>Advance Received:</span>
                      <span className="font-mono">- NPR {b.advancePayment.toLocaleString()}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-xs font-bold text-rose-700 border-t pt-1">
                    <span>Balance Due at Checkout:</span>
                    <span className="font-mono text-sm">NPR {b.balanceDue.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between gap-3 pt-3 border-t">
                {b.paymentStatus !== 'Paid' ? (
                  <button
                    onClick={() => handleSettleAndPrint(b)}
                    className="px-4 py-2.5 bg-emerald-800 hover:bg-emerald-900 text-white rounded-xl text-xs font-bold shadow transition flex items-center gap-1.5"
                  >
                    <CheckCircle className="w-4 h-4" />
                    <span>Settle Bill via {selectedMethod}</span>
                  </button>
                ) : (
                  <span className="text-xs text-emerald-700 font-bold flex items-center gap-1">
                    <CheckCircle className="w-4 h-4" /> Bill Settled ({b.paymentMethod || 'Paid'})
                  </span>
                )}

                <button
                  onClick={() => setActiveInvoiceBookingId(b.id)}
                  className="px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-xl text-xs font-bold transition flex items-center gap-1.5"
                >
                  <Printer className="w-4 h-4" />
                  <span>Print Invoice</span>
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Printable Invoice Modal */}
      {activeInvoiceBooking && (
        <PrintableInvoice
          booking={activeInvoiceBooking}
          onClose={() => setActiveInvoiceBookingId(null)}
        />
      )}
    </div>
  );
}
