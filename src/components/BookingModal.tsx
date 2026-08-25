import React, { useState, useEffect } from 'react';
import { useResort } from '../context/ResortContext';
import { X, Calendar, User, Phone, Mail, MessageSquare, QrCode, CheckCircle2, ArrowRight, Sparkles, Bed, ShieldCheck, DollarSign } from 'lucide-react';

export default function BookingModal() {
  const { isBookingModalOpen, activeBookingModalRoom, closeBookingModal, rooms, contact, addBooking } = useResort();

  const [selectedRoomId, setSelectedRoomId] = useState<string>('');
  const [guestName, setGuestName] = useState('');
  const [guestPhone, setGuestPhone] = useState('');
  const [guestEmail, setGuestEmail] = useState('');
  const [checkInDate, setCheckInDate] = useState(new Date().toISOString().split('T')[0]);
  const [checkOutDate, setCheckOutDate] = useState(new Date(Date.now() + 86400000).toISOString().split('T')[0]);
  const [numGuests, setNumGuests] = useState(2);
  const [bookingMethod, setBookingMethod] = useState<'online' | 'whatsapp' | 'qr'>('online');
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    if (activeBookingModalRoom) {
      setSelectedRoomId(activeBookingModalRoom.id);
    } else if (rooms.length > 0) {
      setSelectedRoomId(rooms[0].id);
    }
  }, [activeBookingModalRoom, rooms]);

  if (!isBookingModalOpen) return null;

  const currentRoom = rooms.find(r => r.id === selectedRoomId) || activeBookingModalRoom || rooms[0];

  const start = new Date(checkInDate).getTime();
  const end = new Date(checkOutDate).getTime();
  const diffDays = Math.max(1, Math.ceil((end - start) / (1000 * 3600 * 24)));
  const estimatedTotal = currentRoom ? currentRoom.pricePerNight * diffDays : 0;

  const handleOnlineSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentRoom || !guestName || !guestPhone) return;

    if (bookingMethod === 'whatsapp') {
      const msg = `Hello Dada Ghar Agro Farm Resort! I would like to reserve a stay.%0A%0A*Guest Name:* ${guestName}%0A*Phone:* ${guestPhone}%0A*Room:* Room ${currentRoom.roomNumber} (${currentRoom.category})%0A*Dates:* ${checkInDate} to ${checkOutDate} (${diffDays} night(s))%0A*Guests:* ${numGuests}%0A*Estimated Total:* NPR ${estimatedTotal.toLocaleString()}`;
      window.open(`https://wa.me/${contact.whatsappNumber.replace(/[^0-9]/g, '')}?text=${msg}`, '_blank');
      closeBookingModal();
      return;
    }

    addBooking({
      guestName,
      guestPhone,
      guestEmail,
      roomId: currentRoom.id,
      roomNumber: currentRoom.roomNumber,
      roomCategory: currentRoom.category,
      checkInDate,
      checkOutDate,
      nights: diffDays,
      numGuests,
      roomRate: currentRoom.pricePerNight,
      extraCharges: 0,
      discount: 0,
      taxAmount: 0,
      advancePayment: bookingMethod === 'qr' ? 1000 : 0,
      status: 'Pending',
      paymentStatus: bookingMethod === 'qr' ? 'Partial' : 'Unpaid',
      notes: `Requested via ${bookingMethod === 'qr' ? 'Fonepay QR Payment' : 'Website Online Booking'}`
    });

    setIsSuccess(true);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl shadow-2xl max-w-xl w-full p-6 sm:p-8 relative overflow-hidden border border-amber-500/20 my-8 max-h-[92vh] overflow-y-auto">
        
        <button
          onClick={closeBookingModal}
          type="button"
          className="absolute top-5 right-5 p-2 text-slate-400 hover:text-slate-700 bg-slate-100 rounded-full transition z-10"
        >
          <X className="w-5 h-5" />
        </button>

        {isSuccess ? (
          <div className="text-center py-8 space-y-4">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <span className="text-xs font-bold text-amber-700 uppercase tracking-widest block">
              Reservation Submitted
            </span>
            <h3 className="text-2xl font-serif font-bold text-brand-forest">Thank You, {guestName}!</h3>
            <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
              Your booking inquiry for <span className="font-bold text-slate-900">Room {currentRoom?.roomNumber} ({currentRoom?.category})</span> for <span className="font-bold text-slate-900">{diffDays} Night(s)</span> (Total: <span className="font-mono font-bold text-amber-700">NPR {estimatedTotal.toLocaleString()}</span>) has been submitted. Our concierge team will reach out to confirm your stay.
            </p>
            <div className="pt-4">
              <button
                onClick={() => {
                  setIsSuccess(false);
                  closeBookingModal();
                }}
                type="button"
                className="px-8 py-3 bg-brand-forest text-white font-bold uppercase tracking-wider text-xs rounded-full shadow-lg hover:bg-emerald-950 transition"
              >
                Return to Website
              </button>
            </div>
          </div>
        ) : (
          <div>
            <div className="mb-6">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-500/10 text-amber-800 text-[11px] font-bold rounded-full uppercase tracking-wider border border-amber-500/20">
                <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                <span>Direct Resort Reservation</span>
              </span>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-brand-forest mt-2">
                Reserve Your Getaway
              </h2>
              <p className="text-xs text-slate-500 mt-1">Guaranteed best rates directly through Dada Ghar Resort Concierge.</p>
            </div>

            <form onSubmit={handleOnlineSubmit} className="space-y-4 text-xs">
              
              <div>
                <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Select Accommodation
                </label>
                <select
                  value={selectedRoomId}
                  onChange={e => setSelectedRoomId(e.target.value)}
                  className="w-full px-4 py-3 bg-[#FAF7F2] border border-gray-200 rounded-xl font-medium outline-none focus:ring-2 focus:ring-amber-500 text-slate-800"
                >
                  {rooms.map(r => (
                    <option key={r.id} value={r.id}>
                      Room {r.roomNumber} &bull; {r.category} (NPR {r.pricePerNight.toLocaleString()} / night)
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1.5">Check-in Date</label>
                  <input
                    type="date"
                    required
                    value={checkInDate}
                    onChange={e => setCheckInDate(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-[#FAF7F2] border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-amber-500 font-medium"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1.5">Check-out Date</label>
                  <input
                    type="date"
                    required
                    value={checkOutDate}
                    onChange={e => setCheckOutDate(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-[#FAF7F2] border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-amber-500 font-medium"
                  />
                </div>
              </div>

              {/* Price Calculation Summary Banner */}
              <div className="p-3.5 bg-amber-50/70 rounded-2xl border border-amber-200/80 flex items-center justify-between">
                <div>
                  <span className="text-[11px] font-bold text-amber-900 block">Stay Duration: {diffDays} Night(s)</span>
                  <span className="text-[10px] text-amber-700">Room Rate: NPR {currentRoom?.pricePerNight.toLocaleString()} / night</span>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-slate-500 uppercase font-semibold block">Estimated Total</span>
                  <span className="font-serif font-bold text-base text-brand-forest">NPR {estimatedTotal.toLocaleString()}</span>
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1.5">Guest Full Name *</label>
                <input
                  type="text"
                  required
                  value={guestName}
                  onChange={e => setGuestName(e.target.value)}
                  placeholder="e.g. Aarav Karki"
                  className="w-full px-3.5 py-2.5 bg-[#FAF7F2] border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-amber-500 font-medium"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1.5">Mobile / WhatsApp *</label>
                  <input
                    type="tel"
                    required
                    value={guestPhone}
                    onChange={e => setGuestPhone(e.target.value)}
                    placeholder="+977 98..."
                    className="w-full px-3.5 py-2.5 bg-[#FAF7F2] border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-amber-500 font-medium"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1.5">Guests Count</label>
                  <select
                    value={numGuests}
                    onChange={e => setNumGuests(Number(e.target.value))}
                    className="w-full px-3.5 py-2.5 bg-[#FAF7F2] border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-amber-500 font-medium"
                  >
                    <option value={1}>1 Guest</option>
                    <option value={2}>2 Guests</option>
                    <option value={3}>3 Guests</option>
                    <option value={4}>4+ Guests</option>
                  </select>
                </div>
              </div>

              {/* Booking Method Selector */}
              <div>
                <label className="block font-bold text-slate-700 uppercase tracking-wider mb-2">Preferred Booking Channel</label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setBookingMethod('online')}
                    className={`p-3 rounded-2xl border text-center transition ${
                      bookingMethod === 'online'
                        ? 'bg-brand-forest text-white border-brand-forest shadow-md'
                        : 'bg-[#FAF7F2] text-slate-700 hover:bg-slate-100 border-gray-200'
                    }`}
                  >
                    <Calendar className="w-4 h-4 mx-auto mb-1" />
                    <span className="block font-bold text-[11px]">Online Request</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setBookingMethod('whatsapp')}
                    className={`p-3 rounded-2xl border text-center transition ${
                      bookingMethod === 'whatsapp'
                        ? 'bg-emerald-700 text-white border-emerald-700 shadow-md'
                        : 'bg-[#FAF7F2] text-slate-700 hover:bg-slate-100 border-gray-200'
                    }`}
                  >
                    <MessageSquare className="w-4 h-4 mx-auto mb-1" />
                    <span className="block font-bold text-[11px]">WhatsApp Direct</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setBookingMethod('qr')}
                    className={`p-3 rounded-2xl border text-center transition ${
                      bookingMethod === 'qr'
                        ? 'bg-purple-800 text-white border-purple-800 shadow-md'
                        : 'bg-[#FAF7F2] text-slate-700 hover:bg-slate-100 border-gray-200'
                    }`}
                  >
                    <QrCode className="w-4 h-4 mx-auto mb-1" />
                    <span className="block font-bold text-[11px]">Fonepay QR</span>
                  </button>
                </div>
              </div>

              {/* QR Preview */}
              {bookingMethod === 'qr' && (
                <div className="bg-purple-50 p-4 rounded-2xl border border-purple-200 flex items-center gap-4">
                  <img src={contact.qrCodeImageUrl} alt="QR Code" className="w-20 h-20 rounded-xl border bg-white p-1 shadow-sm" />
                  <div className="text-[11px] text-purple-900">
                    <p className="font-bold">Fonepay Merchant: Dada Ghar Agro Farm</p>
                    <p className="mt-0.5 text-purple-700">Scan QR to pay advance booking amount.</p>
                    <p className="font-mono text-purple-800 text-[10px] mt-1">Bank: {contact.bankDetails.bankName}</p>
                  </div>
                </div>
              )}

              <div className="pt-4 border-t border-gray-100 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={closeBookingModal}
                  className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-full transition text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-7 py-2.5 bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-slate-950 font-bold uppercase tracking-wider text-xs rounded-full shadow-lg transition flex items-center gap-1.5"
                >
                  <span>Confirm Reservation</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
