import React, { useState } from 'react';
import { useResort } from '../../context/ResortContext';
import { Booking, BookingStatus, PaymentStatus, RoomCategory } from '../../types';
import { Calendar, Plus, CheckCircle, XCircle, LogIn, LogOut, FileText, Search, User, Phone, Mail, Filter } from 'lucide-react';

interface BookingManagementProps {
  onOpenInvoice: (bookingId: string) => void;
}

export default function BookingManagement({ onOpenInvoice }: BookingManagementProps) {
  const { bookings, rooms, addBooking, updateBookingStatus, updateBookingPayment, checkoutBooking } = useResort();

  const [filterStatus, setFilterStatus] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [isNewBookingModalOpen, setIsNewBookingModalOpen] = useState(false);

  // New Booking Form State
  const [guestName, setGuestName] = useState('');
  const [guestPhone, setGuestPhone] = useState('');
  const [guestEmail, setGuestEmail] = useState('');
  const [roomId, setRoomId] = useState(rooms[0]?.id || '');
  const [checkInDate, setCheckInDate] = useState(new Date().toISOString().split('T')[0]);
  const [checkOutDate, setCheckOutDate] = useState(new Date(Date.now() + 86400000).toISOString().split('T')[0]);
  const [numGuests, setNumGuests] = useState(2);
  const [advancePayment, setAdvancePayment] = useState(0);
  const [notes, setNotes] = useState('');

  const filteredBookings = bookings.filter(b => {
    const matchesStatus = filterStatus === 'ALL' || b.status === filterStatus;
    const matchesSearch = 
      b.guestName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.guestPhone.includes(searchQuery) ||
      b.bookingCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.roomNumber.includes(searchQuery);
    return matchesStatus && matchesSearch;
  });

  const handleCreateBooking = (e: React.FormEvent) => {
    e.preventDefault();
    const selectedRoom = rooms.find(r => r.id === roomId);
    if (!selectedRoom) return;

    // Calculate nights
    const start = new Date(checkInDate).getTime();
    const end = new Date(checkOutDate).getTime();
    const diffDays = Math.max(1, Math.ceil((end - start) / (1000 * 3600 * 24)));

    addBooking({
      guestName,
      guestPhone,
      guestEmail,
      roomId: selectedRoom.id,
      roomNumber: selectedRoom.roomNumber,
      roomCategory: selectedRoom.category,
      checkInDate,
      checkOutDate,
      nights: diffDays,
      numGuests: Number(numGuests),
      roomRate: selectedRoom.pricePerNight,
      extraCharges: 0,
      discount: 0,
      taxAmount: 0,
      advancePayment: Number(advancePayment),
      status: 'Confirmed',
      paymentStatus: advancePayment > 0 ? 'Partial' : 'Unpaid',
      notes
    });

    setIsNewBookingModalOpen(false);
    // Reset form
    setGuestName('');
    setGuestPhone('');
    setGuestEmail('');
    setAdvancePayment(0);
    setNotes('');
  };

  const handleCheckoutAndPrint = (booking: Booking) => {
    try {
      checkoutBooking(booking.id, 'Cash', booking.grandTotal);
      onOpenInvoice(booking.id);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Header & Search Bar */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
        <div>
          <h2 className="text-xl font-serif font-bold text-gray-900 flex items-center gap-2">
            <Calendar className="w-6 h-6 text-brand-leaf" />
            <span>Booking & Guest Reservations</span>
          </h2>
          <p className="text-xs text-gray-500 mt-1">Manage guest reservations, online requests, check-in arrivals, and check-out bill settlements.</p>
        </div>

        <button
          onClick={() => setIsNewBookingModalOpen(true)}
          className="px-5 py-3 bg-brand-forest hover:bg-emerald-950 text-white font-medium rounded-xl shadow-md transition flex items-center gap-2 text-sm"
        >
          <Plus className="w-4 h-4" />
          <span>New Reservation</span>
        </button>
      </div>

      {/* Filter & Search Toolbar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-gray-100">
        {/* Status Pills */}
        <div className="flex flex-wrap items-center gap-2 overflow-x-auto w-full sm:w-auto">
          {['ALL', 'Pending', 'Confirmed', 'Checked-in', 'Checked-out', 'Cancelled'].map(st => (
            <button
              key={st}
              onClick={() => setFilterStatus(st)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition ${
                filterStatus === st
                  ? 'bg-brand-forest text-white shadow'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {st}
              {st !== 'ALL' && (
                <span className="ml-1.5 px-1.5 py-0.2 bg-white/20 rounded-full text-[10px]">
                  {bookings.filter(b => b.status === st).length}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search guest name, phone..."
            className="w-full pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs focus:ring-2 focus:ring-brand-leaf outline-none"
          />
        </div>
      </div>

      {/* Bookings Table */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                <th className="py-3 px-4">Booking Code</th>
                <th className="py-3 px-4">Guest Details</th>
                <th className="py-3 px-4">Room</th>
                <th className="py-3 px-4">Stay Dates</th>
                <th className="py-3 px-4 text-right">Total Bill (NPR)</th>
                <th className="py-3 px-4 text-center">Status</th>
                <th className="py-3 px-4 text-center">Payment</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-xs">
              {filteredBookings.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-8 text-center text-gray-400">
                    No reservations matching current criteria.
                  </td>
                </tr>
              ) : (
                filteredBookings.map(b => (
                  <tr key={b.id} className="hover:bg-gray-50/80 transition">
                    <td className="py-4 px-4 font-mono font-bold text-brand-forest">
                      {b.bookingCode}
                    </td>
                    <td className="py-4 px-4">
                      <p className="font-bold text-gray-900 text-sm">{b.guestName}</p>
                      <p className="text-gray-500 flex items-center gap-1 mt-0.5">
                        <Phone className="w-3 h-3 text-gray-400" /> {b.guestPhone}
                      </p>
                    </td>
                    <td className="py-4 px-4">
                      <span className="font-bold text-gray-900 block">Room {b.roomNumber}</span>
                      <span className="text-gray-500 text-[11px]">{b.roomCategory}</span>
                    </td>
                    <td className="py-4 px-4 text-gray-700">
                      <div><span className="text-gray-400">In:</span> {b.checkInDate}</div>
                      <div><span className="text-gray-400">Out:</span> {b.checkOutDate} ({b.nights} night)</div>
                    </td>
                    <td className="py-4 px-4 text-right font-mono font-bold text-gray-900 text-sm">
                      NPR {b.grandTotal.toLocaleString()}
                    </td>
                    <td className="py-4 px-4 text-center">
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase ${
                        b.status === 'Checked-in' ? 'bg-emerald-100 text-emerald-800 border border-emerald-200' :
                        b.status === 'Confirmed' ? 'bg-blue-100 text-blue-800 border border-blue-200' :
                        b.status === 'Pending' ? 'bg-amber-100 text-amber-800 border border-amber-200' :
                        b.status === 'Checked-out' ? 'bg-gray-100 text-gray-700 border border-gray-200' :
                        'bg-red-100 text-red-800 border border-red-200'
                      }`}>
                        {b.status}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-center">
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase ${
                        b.paymentStatus === 'Paid' ? 'bg-emerald-100 text-emerald-800' :
                        b.paymentStatus === 'Partial' ? 'bg-amber-100 text-amber-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {b.paymentStatus}
                      </span>
                      {b.advancePayment > 0 && (
                        <div className="text-[10px] text-gray-400 mt-0.5 font-mono">Adv: NPR {b.advancePayment}</div>
                      )}
                    </td>
                    <td className="py-4 px-4 text-right space-x-1">
                      {b.status === 'Pending' && (
                        <button
                          onClick={() => updateBookingStatus(b.id, 'Confirmed')}
                          className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-medium text-[11px] transition inline-flex items-center gap-1"
                        >
                          <CheckCircle className="w-3.5 h-3.5" /> Approve
                        </button>
                      )}
                      {b.status === 'Confirmed' && (
                        <button
                          onClick={() => updateBookingStatus(b.id, 'Checked-in')}
                          className="px-2.5 py-1 bg-brand-forest hover:bg-emerald-950 text-white rounded-lg font-medium text-[11px] transition inline-flex items-center gap-1"
                        >
                          <LogIn className="w-3.5 h-3.5" /> Check-in
                        </button>
                      )}
                      {b.status === 'Checked-in' && (
                        <button
                          onClick={() => handleCheckoutAndPrint(b)}
                          className="px-2.5 py-1 bg-brand-leaf hover:bg-emerald-800 text-white rounded-lg font-medium text-[11px] transition inline-flex items-center gap-1"
                        >
                          <LogOut className="w-3.5 h-3.5" /> Check-out & Bill
                        </button>
                      )}
                      <button
                        onClick={() => onOpenInvoice(b.id)}
                        title="View / Print Invoice"
                        className="p-1.5 text-gray-500 hover:bg-gray-100 rounded-lg transition inline-block"
                      >
                        <FileText className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* New Booking Modal */}
      {isNewBookingModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-6 relative max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b pb-4 mb-4">
              <h3 className="text-lg font-serif font-bold text-brand-forest">Create Walk-in / Direct Reservation</h3>
              <button onClick={() => setIsNewBookingModalOpen(false)} className="text-gray-400 hover:text-gray-600">
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateBooking} className="space-y-4 text-sm">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Guest Full Name *</label>
                <input
                  type="text"
                  required
                  value={guestName}
                  onChange={e => setGuestName(e.target.value)}
                  placeholder="e.g. Ramesh Sharma"
                  className="w-full px-3 py-2 bg-gray-50 border rounded-xl focus:ring-2 focus:ring-brand-leaf outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Phone Number *</label>
                  <input
                    type="tel"
                    required
                    value={guestPhone}
                    onChange={e => setGuestPhone(e.target.value)}
                    placeholder="+977 98..."
                    className="w-full px-3 py-2 bg-gray-50 border rounded-xl focus:ring-2 focus:ring-brand-leaf outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Email Address</label>
                  <input
                    type="email"
                    value={guestEmail}
                    onChange={e => setGuestEmail(e.target.value)}
                    placeholder="guest@example.com"
                    className="w-full px-3 py-2 bg-gray-50 border rounded-xl focus:ring-2 focus:ring-brand-leaf outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Select Room *</label>
                <select
                  value={roomId}
                  onChange={e => setRoomId(e.target.value)}
                  className="w-full px-3 py-2 bg-gray-50 border rounded-xl focus:ring-2 focus:ring-brand-leaf outline-none"
                >
                  {rooms.map(r => (
                    <option key={r.id} value={r.id}>
                      Room {r.roomNumber} - {r.category} (NPR {r.pricePerNight}/night) - Status: {r.status}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Check-in Date *</label>
                  <input
                    type="date"
                    required
                    value={checkInDate}
                    onChange={e => setCheckInDate(e.target.value)}
                    className="w-full px-3 py-2 bg-gray-50 border rounded-xl focus:ring-2 focus:ring-brand-leaf outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Check-out Date *</label>
                  <input
                    type="date"
                    required
                    value={checkOutDate}
                    onChange={e => setCheckOutDate(e.target.value)}
                    className="w-full px-3 py-2 bg-gray-50 border rounded-xl focus:ring-2 focus:ring-brand-leaf outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Guests Count</label>
                  <input
                    type="number"
                    min={1}
                    value={numGuests}
                    onChange={e => setNumGuests(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-gray-50 border rounded-xl focus:ring-2 focus:ring-brand-leaf outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Advance Payment (NPR)</label>
                  <input
                    type="number"
                    min={0}
                    value={advancePayment}
                    onChange={e => setAdvancePayment(Number(e.target.value))}
                    placeholder="0"
                    className="w-full px-3 py-2 bg-gray-50 border rounded-xl focus:ring-2 focus:ring-brand-leaf outline-none font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Special Notes / Requests</label>
                <input
                  type="text"
                  value={notes}
                  onChange={e => setNotes(e.target.value)}
                  placeholder="Extra bed, late check-in, dietary restrictions..."
                  className="w-full px-3 py-2 bg-gray-50 border rounded-xl focus:ring-2 focus:ring-brand-leaf outline-none"
                />
              </div>

              <div className="pt-4 border-t flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsNewBookingModalOpen(false)}
                  className="px-4 py-2 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-brand-forest text-white rounded-xl hover:bg-emerald-950 font-medium transition"
                >
                  Save & Confirm Reservation
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
