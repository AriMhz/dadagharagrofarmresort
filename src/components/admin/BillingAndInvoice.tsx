import React, { useState } from 'react';
import { useResort } from '../../context/ResortContext';
import { FileText, Printer, CheckCircle, DollarSign, Search, Clock, CreditCard, QrCode } from 'lucide-react';
import { PaymentMethod } from '../../types';

interface BillingAndInvoiceProps {
  onOpenInvoice: (bookingId: string) => void;
}

export default function BillingAndInvoice({ onOpenInvoice }: BillingAndInvoiceProps) {
  const { bookings, updateBookingPayment, checkoutBooking } = useResort();

  const [searchQuery, setSearchQuery] = useState('');

  const filteredBookings = bookings.filter(b => 
    b.guestName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    b.roomNumber.includes(searchQuery) ||
    b.bookingCode.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleUpdatePayment = (bookingId: string, grandTotal: number) => {
    updateBookingPayment(bookingId, grandTotal, 'Paid', 'Fonepay QR');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
        <div>
          <h2 className="text-xl font-serif font-bold text-gray-900 flex items-center gap-2">
            <DollarSign className="w-6 h-6 text-brand-leaf" />
            <span>Billing & Automated Invoice System</span>
          </h2>
          <p className="text-xs text-gray-500 mt-1">Automatic itemized billing combining room charges, food/beverage orders, laundry, and extra beds.</p>
        </div>
      </div>

      {/* Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-gray-100 flex items-center justify-between">
        <div className="relative w-full max-w-md">
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search invoice by guest name, room 203..."
            className="w-full pl-9 pr-4 py-2 bg-gray-50 border rounded-xl text-xs outline-none focus:ring-2 focus:ring-brand-leaf"
          />
        </div>
      </div>

      {/* Bills Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredBookings.map(b => {
          const foodOrdersTotal = b.orders
            .filter(o => o.category === 'Food' || o.category === 'Beverage')
            .reduce((sum, o) => sum + (o.price * o.quantity), 0);
          
          const laundryTotal = b.orders
            .filter(o => o.category === 'Laundry')
            .reduce((sum, o) => sum + (o.price * o.quantity), 0);

          const extraBedTotal = b.orders
            .filter(o => o.category === 'Extra Bed')
            .reduce((sum, o) => sum + (o.price * o.quantity), 0);

          const otherOrdersTotal = b.orders
            .filter(o => !['Food', 'Beverage', 'Laundry', 'Extra Bed'].includes(o.category))
            .reduce((sum, o) => sum + (o.price * o.quantity), 0);

          return (
            <div key={b.id} className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm flex flex-col justify-between hover:shadow-md transition">
              <div>
                <div className="flex items-center justify-between pb-3 mb-3 border-b">
                  <div>
                    <span className="text-xs font-mono font-bold text-brand-forest">{b.bookingCode}</span>
                    <h3 className="text-lg font-bold text-gray-900">{b.guestName}</h3>
                  </div>
                  <div className="text-right">
                    <span className="px-2.5 py-1 bg-brand-forest/10 text-brand-forest text-xs font-bold rounded-lg block">
                      Room {b.roomNumber} ({b.roomCategory})
                    </span>
                    <span className={`inline-block mt-1 text-[10px] px-2 py-0.5 rounded font-bold uppercase ${
                      b.paymentStatus === 'Paid' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                    }`}>
                      {b.paymentStatus}
                    </span>
                  </div>
                </div>

                {/* Itemized Charge Summary */}
                <div className="space-y-2 text-xs bg-gray-50 p-4 rounded-xl border border-gray-100 mb-4">
                  <div className="flex justify-between text-gray-700">
                    <span>Room Charges ({b.nights} Night @ {b.roomRate}/night):</span>
                    <span className="font-mono font-semibold">NPR {b.totalRoomCharge.toLocaleString()}</span>
                  </div>
                  {foodOrdersTotal > 0 && (
                    <div className="flex justify-between text-gray-700">
                      <span>Food & Beverage Orders:</span>
                      <span className="font-mono font-semibold">NPR {foodOrdersTotal.toLocaleString()}</span>
                    </div>
                  )}
                  {laundryTotal > 0 && (
                    <div className="flex justify-between text-gray-700">
                      <span>Laundry Charges:</span>
                      <span className="font-mono font-semibold">NPR {laundryTotal.toLocaleString()}</span>
                    </div>
                  )}
                  {extraBedTotal > 0 && (
                    <div className="flex justify-between text-gray-700">
                      <span>Extra Bed Charges:</span>
                      <span className="font-mono font-semibold">NPR {extraBedTotal.toLocaleString()}</span>
                    </div>
                  )}
                  {otherOrdersTotal > 0 && (
                    <div className="flex justify-between text-gray-700">
                      <span>Other Services:</span>
                      <span className="font-mono font-semibold">NPR {otherOrdersTotal.toLocaleString()}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-sm font-bold text-brand-forest border-t pt-2 mt-1">
                    <span>Automatically Calculated Total:</span>
                    <span className="font-mono">NPR {b.grandTotal.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between gap-3 pt-3 border-t">
                {b.paymentStatus !== 'Paid' && (
                  <button
                    onClick={() => handleUpdatePayment(b.id, b.grandTotal)}
                    className="px-3 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-semibold transition flex items-center gap-1"
                  >
                    <CheckCircle className="w-3.5 h-3.5" />
                    <span>Mark Paid (QR / Cash)</span>
                  </button>
                )}
                <button
                  onClick={() => onOpenInvoice(b.id)}
                  className="ml-auto px-4 py-2 bg-brand-forest hover:bg-emerald-950 text-white rounded-xl text-xs font-semibold transition flex items-center gap-1.5 shadow"
                >
                  <Printer className="w-4 h-4" />
                  <span>Printable Invoice</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
