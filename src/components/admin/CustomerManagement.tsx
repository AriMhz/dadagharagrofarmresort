import React, { useState } from 'react';
import { useResort } from '../../context/ResortContext';
import { Customer } from '../../types';
import { Users, Search, Plus, Phone, Mail, MapPin, Calendar, DollarSign, FileText, UserCheck } from 'lucide-react';

export default function CustomerManagement() {
  const { customers, addCustomer, bookings } = useResort();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Form State
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [idPassportNumber, setIdPassportNumber] = useState('');
  const [notes, setNotes] = useState('');

  const filteredCustomers = customers.filter(c => 
    c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.phone.includes(searchQuery) ||
    (c.email && c.email.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addCustomer({
      name,
      phone,
      email,
      address,
      idPassportNumber,
      notes
    });
    setIsAddModalOpen(false);
    setName('');
    setPhone('');
    setEmail('');
    setAddress('');
    setIdPassportNumber('');
    setNotes('');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
        <div>
          <h2 className="text-xl font-serif font-bold text-gray-900 flex items-center gap-2">
            <Users className="w-6 h-6 text-brand-leaf" />
            <span>Customer Records & History</span>
          </h2>
          <p className="text-xs text-gray-500 mt-1">Maintain guest profiles, contact numbers, stay history, and lifetime spending.</p>
        </div>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="px-4 py-2.5 bg-brand-forest hover:bg-emerald-950 text-white font-medium rounded-xl text-xs flex items-center gap-1.5 shadow transition"
        >
          <Plus className="w-4 h-4" />
          <span>Add Customer Profile</span>
        </button>
      </div>

      {/* Search */}
      <div className="bg-white p-4 rounded-2xl border border-gray-100">
        <div className="relative max-w-md">
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search by customer name, phone number..."
            className="w-full pl-9 pr-4 py-2 bg-gray-50 border rounded-xl text-xs outline-none focus:ring-2 focus:ring-brand-leaf"
          />
        </div>
      </div>

      {/* Customer Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCustomers.map(cust => {
          const guestBookings = bookings.filter(b => b.guestPhone === cust.phone || b.guestName.toLowerCase() === cust.name.toLowerCase());
          return (
            <div key={cust.id} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-between hover:shadow-md transition">
              <div>
                <div className="flex items-center justify-between pb-3 mb-3 border-b">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-brand-leaf/10 text-brand-forest rounded-full flex items-center justify-center font-bold text-sm">
                      {cust.name.slice(0, 2).toUpperCase()}
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 text-sm">{cust.name}</h3>
                      <p className="text-[11px] text-gray-500 font-mono">{cust.phone}</p>
                    </div>
                  </div>
                  <span className="px-2 py-0.5 bg-emerald-50 text-emerald-800 rounded text-[10px] font-bold">
                    {cust.totalVisits} Visit(s)
                  </span>
                </div>

                <div className="space-y-1.5 text-xs text-gray-600 mb-4">
                  {cust.email && <p className="flex items-center gap-1.5"><Mail className="w-3.5 h-3.5 text-gray-400" /> {cust.email}</p>}
                  {cust.address && <p className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5 text-gray-400" /> {cust.address}</p>}
                  {cust.notes && <p className="text-[11px] text-amber-700 italic bg-amber-50 p-2 rounded-lg">"{cust.notes}"</p>}
                </div>
              </div>

              <div className="pt-3 border-t border-gray-100 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-gray-400 block uppercase">Total Spent</span>
                  <span className="font-mono font-bold text-brand-forest text-sm">NPR {cust.totalSpent.toLocaleString()}</span>
                </div>
                <button
                  onClick={() => setSelectedCustomer(cust)}
                  className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-800 text-xs font-semibold rounded-xl transition"
                >
                  View Details
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Customer Detail Drawer / Modal */}
      {selectedCustomer && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-6 relative max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b pb-4 mb-4">
              <h3 className="text-lg font-serif font-bold text-brand-forest">Guest Profile & Booking History</h3>
              <button onClick={() => setSelectedCustomer(null)} className="text-gray-400 hover:text-gray-600">✕</button>
            </div>

            <div className="space-y-4 text-xs">
              <div className="bg-gray-50 p-4 rounded-xl space-y-1">
                <p className="text-sm font-bold text-gray-900">{selectedCustomer.name}</p>
                <p className="text-gray-600">Phone: {selectedCustomer.phone}</p>
                <p className="text-gray-600">Email: {selectedCustomer.email || 'N/A'}</p>
                <p className="text-gray-600">ID/Passport: {selectedCustomer.idPassportNumber || 'N/A'}</p>
              </div>

              <h4 className="font-bold text-gray-800 text-sm">Past Stay History</h4>
              <div className="space-y-2">
                {bookings.filter(b => b.guestPhone === selectedCustomer.phone || b.guestName.toLowerCase() === selectedCustomer.name.toLowerCase()).map(b => (
                  <div key={b.id} className="p-3 bg-gray-50 rounded-xl border flex items-center justify-between">
                    <div>
                      <span className="font-bold text-gray-900">{b.bookingCode} - Room {b.roomNumber}</span>
                      <p className="text-gray-500 text-[10px]">{b.checkInDate} to {b.checkOutDate}</p>
                    </div>
                    <span className="font-mono font-bold text-brand-forest">NPR {b.grandTotal.toLocaleString()}</span>
                  </div>
                ))}
              </div>

              <div className="pt-4 border-t flex justify-end">
                <button
                  onClick={() => setSelectedCustomer(null)}
                  className="px-4 py-2 bg-brand-forest text-white rounded-xl"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add Customer Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 relative">
            <h3 className="text-lg font-serif font-bold text-brand-forest mb-4">Add Guest Profile</h3>
            <form onSubmit={handleAddSubmit} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-gray-700 mb-1">Full Name *</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder="e.g. Anish Nepal"
                  className="w-full px-3 py-2 bg-gray-50 border rounded-xl outline-none"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">Phone *</label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={e => setPhone(e.target.value)}
                    placeholder="+977 98..."
                    className="w-full px-3 py-2 bg-gray-50 border rounded-xl outline-none"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">Email</label>
                  <input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="guest@example.com"
                    className="w-full px-3 py-2 bg-gray-50 border rounded-xl outline-none"
                  />
                </div>
              </div>
              <div>
                <label className="block font-semibold text-gray-700 mb-1">Address</label>
                <input
                  type="text"
                  value={address}
                  onChange={e => setAddress(e.target.value)}
                  placeholder="Kathmandu, Nepal"
                  className="w-full px-3 py-2 bg-gray-50 border rounded-xl outline-none"
                />
              </div>
              <div>
                <label className="block font-semibold text-gray-700 mb-1">ID / Passport Number</label>
                <input
                  type="text"
                  value={idPassportNumber}
                  onChange={e => setIdPassportNumber(e.target.value)}
                  placeholder="National ID / Passport #"
                  className="w-full px-3 py-2 bg-gray-50 border rounded-xl outline-none"
                />
              </div>
              <div>
                <label className="block font-semibold text-gray-700 mb-1">Guest Preferences / Notes</label>
                <input
                  type="text"
                  value={notes}
                  onChange={e => setNotes(e.target.value)}
                  placeholder="VIP guest, veg preference..."
                  className="w-full px-3 py-2 bg-gray-50 border rounded-xl outline-none"
                />
              </div>

              <div className="pt-3 border-t flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 bg-gray-100 text-gray-700 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-brand-forest text-white font-bold rounded-xl shadow"
                >
                  Save Profile
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
